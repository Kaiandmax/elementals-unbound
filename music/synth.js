/* Elementals Unbound - retro-style synth (Web Audio, no dependencies).
   Two finishes over the same arrangement:
     "enhanced" (default): the handheld-RPG vibe with a richer sound - smooth envelopes, chorused and filtered
                pulse leads, a soft pad, synthesized drums, stereo width and reverb.
     "chip":    a strict four-channel 8-bit handheld chip, described below.
   The arrangement is written for four channels like a classic 8-bit handheld sound chip:
     p1, p2  pulse waves with 12.5 / 25 / 50 % duty
     wave    32-step, 4-bit wavetable (bass)
     noise   LFSR noise (long and short "metallic" modes) for all percussion
   Each channel plays one note at a time; a new note cuts the previous one. Volume envelopes are stepped
   in 16 levels at 1/64 s per step, the way the hardware does it. Works with AudioContext or OfflineAudioContext.
   API: EUSynth.sketch(ctx, dest, key, t0, {finish}) -> seconds   (one 4-bar statement of the main motif, see palette.js) */
(function (g) {
  const P = () => g.EU_PALETTE;
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const midiOf = (n) => { const m = /^([A-G])([#b]?)(-?\d)$/.exec(n);
    return 12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0); };
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  // ---- waveforms ----
  const WAVES = { // 32 samples, 0..15
    soft: [...Array(32)].map((_, i) => Math.round(7.5 + 7.5 * Math.sin((i / 32) * 2 * Math.PI))),
    tri:  [...Array(32)].map((_, i) => i < 16 ? i : 31 - i),
    saw:  [...Array(32)].map((_, i) => i >> 1),
    hollow: [...Array(32)].map((_, i) => (i < 8 ? 15 : i < 16 ? 9 : i < 24 ? 3 : 0)),
  };
  const cache = new WeakMap();
  const store = (ctx) => { let c = cache.get(ctx); if (!c) cache.set(ctx, (c = {})); return c; };
  function pulseWave(ctx, duty) {
    const c = store(ctx), k = "p" + duty; if (c[k]) return c[k];
    const N = 48, re = new Float32Array(N), im = new Float32Array(N);
    for (let n = 1; n < N; n++) { re[n] = Math.sin(2 * Math.PI * n * duty) / (n * Math.PI); im[n] = (1 - Math.cos(2 * Math.PI * n * duty)) / (n * Math.PI); }
    return (c[k] = ctx.createPeriodicWave(re, im));
  }
  function tableWave(ctx, name) {
    const c = store(ctx), k = "w" + name; if (c[k]) return c[k];
    const x = WAVES[name], N = x.length, H = 16, re = new Float32Array(H), im = new Float32Array(H);
    for (let n = 1; n < H; n++) for (let i = 0; i < N; i++) { const a = (2 * Math.PI * n * i) / N;
      re[n] += (2 / N) * (x[i] - 7.5) * Math.cos(a); im[n] += (2 / N) * (x[i] - 7.5) * Math.sin(a); }
    return (c[k] = ctx.createPeriodicWave(re, im));
  }
  function lfsr(ctx, short) {
    const c = store(ctx), k = short ? "nS" : "nL"; if (c[k]) return c[k];
    const len = short ? 127 * 8 : 32767, b = ctx.createBuffer(1, len, 65536), d = b.getChannelData(0);
    let r = 0x7fff;
    for (let i = 0; i < len; i++) { const bit = (r ^ (r >> 1)) & 1; r = (r >> 1) | (bit << 14); if (short) r = (r & ~0x40) | (bit << 6); d[i] = r & 1 ? -1 : 1; }
    return (c[k] = b);
  }

  // ---- stepped volume envelope: vol 0..15, dir -1/0/+1, step in 1/64 s ----
  function envelope(param, t, end, e, scale) {
    let v = e.vol; param.setValueAtTime((v / 15) * scale, t);
    if (e.step && e.dir) for (let k = 1; ; k++) { const tk = t + (k * e.step) / 64; if (tk >= end) break;
      v += e.dir; if (v < 0 || v > 15) break; param.setValueAtTime((v / 15) * scale, tk); if (v === 0) break; }
    param.setTargetAtTime(0, end, .003); // hardware cuts the note; 3 ms keeps it click-free
  }

  // ---- percussion presets for the noise channel ----
  const DRUMS = {
    k: { rate: .09, env: { vol: 15, dir: -1, step: 1 }, dur: .14 },
    s: { rate: .55, env: { vol: 13, dir: -1, step: 1 }, dur: .16 },
    r: { rate: .55, env: { vol: 9, dir: -1, step: 1 }, dur: .08 },
    h: { rate: 1.5, env: { vol: 6, dir: -1, step: 1 }, dur: .03 },
    z: { rate: .8, short: true, env: { vol: 10, dir: -1, step: 1 }, dur: .12 }, // metallic "zap"
  };

  const CH_GAIN = { p1: .30, p2: .22, wave: .34, noise: .24 };

  function play(ctx, bus, ev) {
    const amp = ctx.createGain(); amp.gain.value = 0; amp.connect(bus);
    const end = ev.t + ev.dur, stop = end + .03;
    if (ev.ch === "noise") {
      const d = DRUMS[ev.drum], src = ctx.createBufferSource(); src.buffer = lfsr(ctx, d.short); src.loop = true;
      src.playbackRate.value = d.rate * (ev.rate || 1); src.connect(amp);
      envelope(amp.gain, ev.t, end, d.env, CH_GAIN.noise * (ev.vel || 1)); src.start(ev.t); src.stop(stop); return;
    }
    const o = ctx.createOscillator();
    o.setPeriodicWave(ev.ch === "wave" ? tableWave(ctx, ev.wave) : pulseWave(ctx, ev.duty));
    o.frequency.value = hz(ev.m);
    if (ev.vib && ev.dur > ev.vib.delay + .05) { // delayed vibrato on held notes
      const l = ctx.createOscillator(), lg = ctx.createGain(); l.type = "triangle"; l.frequency.value = ev.vib.rate;
      lg.gain.setValueAtTime(0, ev.t); lg.gain.setValueAtTime(ev.vib.cents, ev.t + ev.vib.delay);
      l.connect(lg); lg.connect(o.detune); l.start(ev.t); l.stop(stop); }
    o.connect(amp);
    const env = ev.ch === "wave" ? { vol: 15 } : ev.env;
    envelope(amp.gain, ev.t, end, env, CH_GAIN[ev.ch] * (ev.vel || 1));
    o.start(ev.t); o.stop(stop);
  }


  // ---- enhanced finish ----
  function whiteNoise(ctx) { const c = store(ctx); if (c.wn) return c.wn;
    const b = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), d = b.getChannelData(0);
    let s = 12345; for (let i = 0; i < d.length; i++) { s = (s * 16807) % 2147483647; d[i] = s / 1073741823.5 - 1; }
    return (c.wn = b); }
  function reverbIR(ctx) { const c = store(ctx); if (c.ir) return c.ir;
    const len = Math.floor(ctx.sampleRate * 2.2), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); let s = 777 + ch * 31;
      for (let i = 0; i < len; i++) { s = (s * 16807) % 2147483647; const x = i / len;
        d[i] = (s / 1073741823.5 - 1) * Math.pow(1 - x, 4) * (i < 400 ? i / 400 : 1); } }
    return (c.ir = b); }
  // smooth version of the chip envelope: same peak and fade time, no steps, a gentle release
  function smoothEnv(param, t, end, e, scale, floor) {
    const peak = (e.vol / 15) * scale, atk = .006;
    param.setValueAtTime(0, t); param.linearRampToValueAtTime(peak, t + atk);
    if (e.dir < 0 && e.step) param.setTargetAtTime(peak * floor, t + atk, (e.vol * e.step) / 64 / 3.5);
    param.setTargetAtTime(0, Math.max(end, t + atk + .002), .06);
  }
  const HD_GAIN = { p1: .24, p2: .15, wave: .30, pad: .035, noise: 1 };
  const HD_SEND = { p1: .22, p2: .3, wave: .03, pad: .5, noise: .08 };
  const HD_PAN = { p1: 0, p2: -.3, wave: 0, pad: 0, noise: .15 };

  function playHD(ctx, buses, ev) {
    const bus = buses[ev.ch], end = ev.t + ev.dur, stop = end + .5;
    const amp = ctx.createGain(); amp.gain.value = 0; amp.connect(bus);
    if (ev.ch === "noise") {
      const t = ev.t, v = (ev.vel || 1);
      const noise = (type, f, q, g, dec, rate) => { const src = ctx.createBufferSource(); src.buffer = rate ? lfsr(ctx, true) : whiteNoise(ctx); src.loop = true;
        if (rate) src.playbackRate.value = rate;
        const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
        const a = ctx.createGain(); a.gain.setValueAtTime(g * v, t); a.gain.setTargetAtTime(0, t + .002, dec / 4);
        src.connect(fl); fl.connect(a); a.connect(bus); src.start(t, (t * 3.17) % .5); src.stop(t + dec * 1.5 + .05); };
      const tone = (type, f1, f2, g, dec) => { const o = ctx.createOscillator(); o.type = type;
        o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dec * .5);
        const a = ctx.createGain(); a.gain.setValueAtTime(g * v, t); a.gain.setTargetAtTime(0, t + .002, dec / 4);
        o.connect(a); a.connect(bus); o.start(t); o.stop(t + dec * 1.5 + .05); };
      if (ev.drum === "k") { tone("sine", 155, 46, .55, .3); noise("lowpass", 900, .5, .08, .02); }
      if (ev.drum === "s") { noise("bandpass", 1900, .7, .32, .17); tone("triangle", 200, 150, .14, .09); }
      if (ev.drum === "r") { noise("bandpass", 1900 * (ev.rate || 1), .7, .2, .08); }
      if (ev.drum === "h") noise("highpass", 7000, .6, .13, .05);
      if (ev.drum === "z") noise("bandpass", 2600, 1.2, .22, .14, .8);
      return;
    }
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.connect(amp);
    if (ev.ch === "pad") { lp.frequency.value = 1300; lp.Q.value = .3;
      const peak = HD_GAIN.pad * (ev.vel || 1);
      amp.gain.setValueAtTime(0, ev.t); amp.gain.linearRampToValueAtTime(peak, ev.t + .3);
      amp.gain.setTargetAtTime(0, end, .25);
      [-9, 9].forEach((det, i) => { const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = hz(ev.m); o.detune.value = det;
        const pn = ctx.createStereoPanner(); pn.pan.value = i ? .5 : -.5; o.connect(pn); pn.connect(lp); o.start(ev.t); o.stop(end + 1.5); });
      return; }
    const oscs = [];
    if (ev.ch === "wave") { lp.frequency.value = 1500; lp.Q.value = .4;
      const o = ctx.createOscillator(); o.setPeriodicWave(tableWave(ctx, ev.wave)); o.frequency.value = hz(ev.m); o.connect(lp); oscs.push(o);
      const sub = ctx.createOscillator(), sg = ctx.createGain(); sub.type = "sine"; sub.frequency.value = hz(ev.m); sg.gain.value = .5;
      sub.connect(sg); sg.connect(lp); oscs.push(sub);
      smoothEnv(amp.gain, ev.t, end, { vol: 15, dir: -1, step: 10 }, HD_GAIN.wave * (ev.vel || 1), .7);
    } else { // p1 / p2: two detuned pulses, spread a little in stereo, filtered
      lp.frequency.value = ev.ch === "p1" ? 5200 : 3800; lp.Q.value = .5;
      const duty = Math.max(ev.duty, .18); // the thinnest duty is what sounds most like the handheld; widen it a touch
      [-6, 6].forEach((det, i) => { const o = ctx.createOscillator(); o.setPeriodicWave(pulseWave(ctx, duty)); o.frequency.value = hz(ev.m); o.detune.value = det;
        const pn = ctx.createStereoPanner(), og = ctx.createGain(); pn.pan.value = i ? .22 : -.22; og.gain.value = .6;
        o.connect(og); og.connect(pn); pn.connect(lp); oscs.push(o); });
      smoothEnv(amp.gain, ev.t, end, ev.env, HD_GAIN[ev.ch] * (ev.vel || 1), ev.ch === "p1" ? .38 : .2);
    }
    if (ev.vib && ev.dur > ev.vib.delay + .05) {
      const l = ctx.createOscillator(), lg = ctx.createGain(); l.type = "sine"; l.frequency.value = ev.vib.rate;
      lg.gain.setValueAtTime(0, ev.t + ev.vib.delay); lg.gain.linearRampToValueAtTime(ev.vib.cents * .8, ev.t + ev.vib.delay + .25);
      l.connect(lg); oscs.forEach((o) => lg.connect(o.detune)); l.start(ev.t); l.stop(stop); }
    oscs.forEach((o) => { o.start(ev.t); o.stop(stop); });
  }

  // ---- the sketch: motif twice over the bar chords, arranged for four channels ----
  function sketch(ctx, out, key, t0, opts = {}) {
    const finish = opts.finish || g.EUSynth.finish || "enhanced", hdOn = finish === "enhanced";
    const { MODES, MOTIF, CHORDS, PALETTE } = P(), e = PALETTE[key], scale = MODES[e.mode];
    const beat = 60 / e.bpm, bar = beat * 4, tonic = midiOf(e.tonic);
    const deg = (d) => { const i = d - 1, o = Math.floor(i / 7); return scale[((i % 7) + 7) % 7] + 12 * o; };
    const lead = tonic + 12 + (e.leadOct || 0) * 12, mid = tonic + 12, low = tonic >= 50 ? tonic - 12 : tonic;
    const ev = [], P1 = e.p1, P2 = e.p2;
    const pulse = (ch, spec, m, t, dur, vel) => ev.push({ ch, m, t, dur, vel, duty: spec.duty, env: spec.env, vib: spec.vib });

    // p1: the motif
    let t = t0; const motifNotes = [];
    for (let rep = 0; rep < 2; rep++) MOTIF.forEach(([d, b], i) => {
      const last = i === MOTIF.length - 1, len = b * beat * (last ? (rep ? 1.6 : 1) : .92);
      pulse("p1", P1, lead + deg(d), t, len, 1); motifNotes.push({ d, t, len }); t += b * beat; });

    // p2: harmony part
    if (P2.style === "third") motifNotes.forEach((n) => pulse("p2", P2, lead + deg(n.d - 2), n.t, n.len, 1));
    if (P2.style === "echo") motifNotes.forEach((n, i) => { const dt = beat * (P2.delay || .25), nx = motifNotes[i + 1];
      pulse("p2", P2, lead + deg(n.d) + (P2.shift || 0), n.t + dt, Math.min(n.len, (nx ? nx.t + dt : 1e9) - n.t - dt), .85); });

    CHORDS.forEach((r, bi) => {
      const tb = t0 + bi * bar, tri = [r, r + 2, r + 4].map((d) => mid + deg(d)), root = low + deg(r);
      if (P2.style === "arp") { const per = P2.div, seq = per === 12 ? [0, 1, 2, 3, 2, 1] : [0, 1, 2, 3], ns = [...tri, tri[0] + 12];
        for (let s = 0; s < per; s++) { let m = ns[seq[s % seq.length]];
          if (e.zap && s >= per - 2) m = tri[0] + 6; // tritone "zap" at the end of each bar
          pulse("p2", P2, m, tb + (s * bar) / per, (bar / per) * .9, s % seq.length ? .8 : 1); } }
      if (hdOn && e.pad) tri.forEach((m) => ev.push({ ch: "pad", m: m - 12 * (m >= 64 ? 1 : 0), t: tb, dur: bar * .98 }));
      if (P2.style === "stabs") for (let s = 1; s < 8; s += 2) pulse("p2", P2, tri[(s >> 1) % 2] , tb + (s * beat) / 2, beat * .3, 1); // offbeat chord stabs
      // wave: bass
      const B = e.bass;
      if (B.style === "octave") for (let s = 0; s < 8; s++) ev.push({ ch: "wave", wave: B.wave, m: root + (s % 2 ? 12 : 0), t: tb + (s * beat) / 2, dur: beat * .42 });
      if (B.style === "walk") [0, 7, 12, 7].forEach((x, s) => ev.push({ ch: "wave", wave: B.wave, m: root + x, t: tb + s * beat, dur: beat * .85 }));
      if (B.style === "pedal") [0, 7].forEach((x, s) => ev.push({ ch: "wave", wave: B.wave, m: root + x, t: tb + s * 2 * beat, dur: beat * 1.9 }));
      if (B.style === "whole") ev.push({ ch: "wave", wave: B.wave, m: root, t: tb, dur: bar * .96 });
      // noise: drums (one channel, so later hits cut earlier ones)
      const D = e.drums, step = bar / D.length;
      [...D].forEach((c, s) => { if (DRUMS[c]) ev.push({ ch: "noise", drum: c, t: tb + s * step, dur: DRUMS[c].dur }); });
      if (e.fill && bi === CHORDS.length - 1) for (let s = 0; s < 8; s++) ev.push({ ch: "noise", drum: "r", t: tb + 2 * beat + (s * beat) / 4, dur: .07, rate: 1 + s * .12, vel: .7 + s * .04 });
    });

    // mono per channel: clamp each note so it ends before the next one on its channel starts
    const byCh = {}; ev.forEach((x) => (byCh[x.ch] = byCh[x.ch] || []).push(x));
    Object.entries(byCh).forEach(([ch, list]) => { if (ch === "pad") return; list.sort((a, b) => a.t - b.t);
      list.forEach((x, i) => { const nx = list[i + 1]; if (nx && x.t + x.dur > nx.t - .004) x.dur = Math.max(.01, nx.t - x.t - .004); }); });

    if (hdOn) { // enhanced: per-channel buses with pan and reverb send, gentle glue compression
      const master = ctx.createGain(); master.gain.value = .8 * Math.pow(10, (e.trimHD || 0) / 20);
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3; comp.knee.value = 8; comp.attack.value = .005; comp.release.value = .2;
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 30;
      master.connect(hp); hp.connect(comp); comp.connect(out);
      const verb = ctx.createConvolver(); verb.buffer = reverbIR(ctx); const wet = ctx.createGain(); wet.gain.value = .9; verb.connect(wet); wet.connect(master);
      const buses = {};
      ["p1", "p2", "wave", "pad", "noise"].forEach((ch) => { const b = ctx.createGain(), pn = ctx.createStereoPanner(), sd = ctx.createGain();
        pn.pan.value = HD_PAN[ch]; sd.gain.value = HD_SEND[ch]; if (ch === "noise") b.gain.value = e.drumsHD || 1; b.connect(pn); pn.connect(master); b.connect(sd); sd.connect(verb); buses[ch] = b; });
      ev.forEach((x) => playHD(ctx, buses, x));
      return bar * CHORDS.length;
    }
    const master = ctx.createGain(); master.gain.value = .75 * Math.pow(10, (e.trim || 0) / 20);
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 35; // output capacitor
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 11000; lp.Q.value = .5;
    master.connect(hp); hp.connect(lp); lp.connect(out);
    ev.forEach((x) => play(ctx, master, x));
    return bar * CHORDS.length;
  }

  g.EUSynth = { sketch, midiOf, hz, WAVES, DRUMS, finish: "enhanced", FINISHES: ["enhanced", "chip"] };
})(typeof window !== "undefined" ? window : globalThis);
