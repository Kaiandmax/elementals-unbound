/* Elementals Unbound - retro handheld-style chip synth (Web Audio, no dependencies).
   Four channels like a classic 8-bit handheld sound chip:
     p1, p2  pulse waves with 12.5 / 25 / 50 % duty
     wave    32-step, 4-bit wavetable (bass)
     noise   LFSR noise (long and short "metallic" modes) for all percussion
   Each channel plays one note at a time; a new note cuts the previous one. Volume envelopes are stepped
   in 16 levels at 1/64 s per step, the way the hardware does it. Works with AudioContext or OfflineAudioContext.
   API: EUSynth.sketch(ctx, dest, key, t0) -> seconds   (one 4-bar statement of the main motif, see palette.js) */
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

  // ---- the sketch: motif twice over the bar chords, arranged for four channels ----
  function sketch(ctx, out, key, t0) {
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
    Object.values(byCh).forEach((list) => { list.sort((a, b) => a.t - b.t);
      list.forEach((x, i) => { const nx = list[i + 1]; if (nx && x.t + x.dur > nx.t - .004) x.dur = Math.max(.01, nx.t - x.t - .004); }); });

    const master = ctx.createGain(); master.gain.value = .75 * Math.pow(10, (e.trim || 0) / 20);
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 35; // output capacitor
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 11000; lp.Q.value = .5;
    master.connect(hp); hp.connect(lp); lp.connect(out);
    ev.forEach((x) => play(ctx, master, x));
    return bar * CHORDS.length;
  }

  g.EUSynth = { sketch, midiOf, hz, WAVES, DRUMS };
})(typeof window !== "undefined" ? window : globalThis);
