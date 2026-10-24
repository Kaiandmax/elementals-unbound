/* Elementals Unbound - music engine (Web Audio, no dependencies).

   Tracks (music/tracks/*.js) are scores in data: sections of melody written as scale degrees, a chord per bar,
   and an arrangement in four parts written like a handheld-RPG score: lead (p1), harmony (p2), bass (wave), drums
   (noise), plus an optional pad. This file compiles a track into timed events and plays them in one of two finishes:
     "enhanced" (default): the handheld-RPG vibe with a fuller sound - smooth envelopes, chorused and filtered pulse
                parts, a soft pad, synthesized drums, stereo width and reverb.
     "chip":    a strict four-channel 8-bit handheld chip (pulse 12.5/25/50 %, 4-bit wavetable, LFSR noise,
                one note per channel, volume stepped at 1/64 s).
   Works with AudioContext or OfflineAudioContext; compile() also runs in Node (used by music/tools/lint.js).

   API
     EUSynth.compile(track)                      -> compiled track (events by bar, lead line for display)
     EUSynth.createMix(ctx, dest, {finish})      -> a mix (buses, reverb, master); mix.setTrack(C); mix.intensity
     EUSynth.scheduleBar(mix, C, bar, when)      -> plays one bar of a compiled track at time `when`
     EUSynth.render(ctx, dest, track, t0, opts)  -> schedules opts.loops (default 1) passes; returns seconds
   Track format: see music/tracks/README.md. */
(function (g) {
  const PAL = () => g.EU_PALETTE;
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const midiOf = (n) => { const m = /^([A-G])([#b]?)(-?\d)$/.exec(n); if (!m) throw new Error("bad note " + n);
    return 12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0); };
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  /* ================= compile ================= */
  const beatsOf = (s) => { if (s.includes("/")) { const [a, b] = s.split("/"); return +a / +b; } return +s; };
  function parseMel(str) { // "1:1 5:1 4:.5 | 5:2 r:2" -> [[{d, acc, b}...], ...]
    return String(str || "").split("|").map((bar) => bar.trim()).filter((b, i, a) => b || i < a.length - 1).map((bar) =>
      bar.split(/\s+/).filter(Boolean).map((tok) => { const m = /^(r|-?\d+)([#b]?):([\d.\/]+)$/.exec(tok);
        if (!m) throw new Error("bad melody token '" + tok + "'");
        return { d: m[1] === "r" ? null : +m[1], acc: m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0, b: beatsOf(m[3]) }; }));
  }
  const parseChords = (c) => (Array.isArray(c) ? c : String(c).trim().split(/\s+/)).map(Number);

  // a track inherits its instrumentation from a palette sound ("fire", "main", ...) and overrides any part of it
  function resolve(track) {
    const base = (PAL().PALETTE[track.sound || "main"]) || {};
    const T = Object.assign({}, base, track);
    ["p1", "p2", "bass"].forEach((k) => (T[k] = Object.assign({}, base[k], track[k])));
    return T;
  }

  function compile(track) {
    const T = resolve(track), { MODES } = PAL(), meter = T.meter || 4;
    const tonic = midiOf(T.tonic), leadBase = tonic + 12 + 12 * (T.leadOct || 0), mid = tonic + 12;
    const low = tonic >= 50 ? tonic - 12 : tonic;
    const degIn = (mode) => { const sc = MODES[mode]; if (!sc) throw new Error(T.id + ": unknown mode " + mode);
      return (d) => { const i = d - 1, o = Math.floor(i / 7); return sc[((i % 7) + 7) % 7] + 12 * o; }; };
    const form = T.form || Object.keys(T.sections).join("");
    const bars = [];
    [...form].forEach((L) => { const s = T.sections[L]; if (!s) throw new Error(T.id + ": form uses missing section " + L);
      const mel = parseMel(s.mel), ch = parseChords(s.chords), n = s.bars || mel.length;
      for (let i = 0; i < n; i++) bars.push({ mel: mel[i] || [], chord: ch[i % ch.length], sec: L, mode: s.mode || T.mode, p2: s.p2 }); });
    const ev = [], lead = [];
    bars.forEach((bar, bi) => { let b = bi * meter; const deg = degIn(bar.mode);
      bar.mel.forEach((n) => { if (n.d !== null) lead.push({ d: n.d, m: leadBase + deg(n.d) + n.acc, t: b, len: n.b, bar: bi }); b += n.b; }); });
    const P1 = T.p1, push = (x) => ev.push(x);
    const pulse = (ch, spec, m, t, dur, vel, layer) => push({ ch, m, t, dur, vel, duty: spec.duty, env: spec.env, vib: spec.vib, layer });

    // p1: lead
    lead.forEach((n, i) => { const nx = lead[i + 1], gap = nx ? nx.t - (n.t + n.len) : 1;
      const dur = n.len * (n.len >= 2 || gap > 0 ? .97 : .9);
      pulse("p1", P1, n.m, n.t, dur, n.t % meter === 0 ? 1 : .9, 2); });

    // p2 + bass + drums + pad, bar by bar
    bars.forEach((bar, bi) => {
      const P2 = Object.assign({}, T.p2, bar.p2), deg = degIn(bar.mode), tb = bi * meter, r = bar.chord;
      const tri = [r, r + 2, r + 4].map((d) => mid + deg(d)), root = low + deg(r);
      const inBar = lead.filter((n) => n.bar === bi);
      if (P2.style === "third") inBar.forEach((n) => pulse("p2", P2, leadBase + deg(n.d - 2), n.t, n.len * .9, .95, 1));
      if (P2.style === "echo") inBar.forEach((n) => pulse("p2", P2, n.m + (P2.shift || 0), n.t + (P2.delay || .5), n.len * .9, .85, 1));
      if (P2.style === "arp") { const per = P2.div || 16, seq = per % 3 === 0 ? [0, 1, 2, 3, 2, 1] : [0, 1, 2, 3], ns = [...tri, tri[0] + 12];
        for (let s = 0; s < per; s++) { let m = ns[seq[s % seq.length]];
          if (T.zap && s >= per - 2) m = tri[0] + 6; // Lightning's tritone "zap" at the end of each bar
          pulse("p2", P2, m, tb + (s * meter) / per, (meter / per) * .9, s % seq.length ? .8 : 1, 1); } }
      if (P2.style === "stabs") for (let s = 1; s < meter * 2; s += 2) pulse("p2", P2, tri[(s >> 1) % 2], tb + s / 2, .3, 1, 1);
      if (P2.style === "counter") { const half = meter / 2; [tri[1], tri[2]].forEach((m, k) => pulse("p2", P2, m, tb + k * half, half * .95, .9, 1)); }
      if (P2.style === "oompah") for (let k = 1; k < meter; k++) pulse("p2", P2, tri[1 + ((k + 1) % 2)], tb + k, .45, .9, 1);

      const B = T.bass, W = (m, t, dur, vel) => push({ ch: "wave", wave: B.wave, m, t, dur, vel, layer: 0 });
      if (B.style === "octave") for (let s = 0; s < meter * 2; s++) W(root + (s % 2 ? 12 : 0), tb + s / 2, .42);
      if (B.style === "drive") for (let s = 0; s < meter * 2; s++) W(root, tb + s / 2, .4, s % 2 ? .8 : 1);
      if (B.style === "walk") [0, 7, 12, 7].slice(0, meter).forEach((x, s) => W(root + x, tb + s, .85));
      if (B.style === "march") for (let s = 0; s < meter; s++) W(root + (s % 2 ? 7 : 0), tb + s, .6);
      if (B.style === "pedal") [0, 7].forEach((x, s) => W(root + x, tb + (s * meter) / 2, meter / 2 * .95));
      if (B.style === "whole") W(root, tb, meter * .96);
      if (B.style === "waltz") W(root, tb, .9);

      const drums = (pat, layer) => { if (!pat) return; const step = meter / pat.length;
        [...pat].forEach((c, s) => { if ("ksrhz".includes(c)) push({ ch: "noise", drum: c, t: tb + s * step, dur: CHIP_DRUMS[c].dur, layer }); }); };
      drums(T.drums, 0); drums(T.drums2, 2);
      if (T.fill && bi === bars.length - 1) for (let s = 0; s < 8; s++)
        push({ ch: "noise", drum: "r", t: tb + meter - 2 + s / 4, dur: .07, rate: 1 + s * .12, vel: .7 + s * .04, layer: 0 });
      if (T.pad) tri.forEach((m) => push({ ch: "pad", m: m - (m >= 64 ? 12 : 0), t: tb, dur: meter * .98, layer: 0 }));
    });

    // one note at a time per channel (pad excepted), wrapping around the loop
    const loopBeats = bars.length * meter, byCh = {};
    ev.forEach((x) => (byCh[x.ch] = byCh[x.ch] || []).push(x));
    Object.entries(byCh).forEach(([ch, list]) => { if (ch === "pad") return; list.sort((a, b) => a.t - b.t);
      list.forEach((x, i) => { const nx = list[i + 1] || (T.once ? null : { t: list[0].t + loopBeats });
        if (nx && x.t + x.dur > nx.t - .01) x.dur = Math.max(.02, nx.t - x.t - .01); }); });

    const byBar = bars.map(() => []);
    ev.forEach((x) => { const bi = Math.min(bars.length - 1, Math.floor(x.t / meter + 1e-6)); byBar[bi].push(x); });
    return { id: T.id, name: T.name, T, meter, bpm: T.bpm, spb: 60 / T.bpm, nBars: bars.length, loopBeats,
      byBar, bars, lead: lead.map((n) => ({ m: n.m, t: n.t, len: n.len })), once: !!T.once, layered: !!T.layered,
      seconds: loopBeats * 60 / T.bpm };
  }

  /* ================= voices ================= */
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

  // chip: stepped volume envelope (vol 0..15, dir -1/0/+1, step in 1/64 s)
  function stepEnv(param, t, end, e, scale) {
    let v = e.vol; param.setValueAtTime((v / 15) * scale, t);
    if (e.step && e.dir) for (let k = 1; ; k++) { const tk = t + (k * e.step) / 64; if (tk >= end) break;
      v += e.dir; if (v < 0 || v > 15) break; param.setValueAtTime((v / 15) * scale, tk); if (v === 0) break; }
    param.setTargetAtTime(0, end, .003);
  }
  // enhanced: same peak and fade time, no steps, a gentle release
  function smoothEnv(param, t, end, e, scale, floor) {
    const peak = (e.vol / 15) * scale, atk = .006;
    param.setValueAtTime(0, t); param.linearRampToValueAtTime(peak, t + atk);
    if (e.dir < 0 && e.step) param.setTargetAtTime(peak * floor, t + atk, (e.vol * e.step) / 64 / 3.5);
    param.setTargetAtTime(0, Math.max(end, t + atk + .002), .06);
  }

  const CHIP_DRUMS = {
    k: { rate: .09, env: { vol: 15, dir: -1, step: 1 }, dur: .14 },
    s: { rate: .55, env: { vol: 13, dir: -1, step: 1 }, dur: .16 },
    r: { rate: .55, env: { vol: 9, dir: -1, step: 1 }, dur: .08 },
    h: { rate: 1.5, env: { vol: 6, dir: -1, step: 1 }, dur: .03 },
    z: { rate: .8, short: true, env: { vol: 10, dir: -1, step: 1 }, dur: .12 },
  };
  const CHIP_GAIN = { p1: .30, p2: .22, wave: .34, noise: .24 };

  function playChip(ctx, bus, ev) {
    if (ev.ch === "pad") return; // the chip has no fifth channel
    const amp = ctx.createGain(); amp.gain.value = 0; amp.connect(bus);
    const end = ev.t + ev.dur, stop = end + .03;
    if (ev.ch === "noise") {
      const d = CHIP_DRUMS[ev.drum], src = ctx.createBufferSource(); src.buffer = lfsr(ctx, d.short); src.loop = true;
      src.playbackRate.value = d.rate * (ev.rate || 1); src.connect(amp);
      stepEnv(amp.gain, ev.t, end, d.env, CHIP_GAIN.noise * (ev.vel || 1)); src.start(ev.t); src.stop(stop); return;
    }
    const o = ctx.createOscillator();
    o.setPeriodicWave(ev.ch === "wave" ? tableWave(ctx, ev.wave) : pulseWave(ctx, ev.duty));
    o.frequency.value = hz(ev.m);
    if (ev.vib && ev.dur > ev.vib.delay + .05) {
      const l = ctx.createOscillator(), lg = ctx.createGain(); l.type = "triangle"; l.frequency.value = ev.vib.rate;
      lg.gain.setValueAtTime(0, ev.t); lg.gain.setValueAtTime(ev.vib.cents, ev.t + ev.vib.delay);
      l.connect(lg); lg.connect(o.detune); l.start(ev.t); l.stop(stop); }
    o.connect(amp);
    stepEnv(amp.gain, ev.t, end, ev.ch === "wave" ? { vol: 15 } : ev.env, CHIP_GAIN[ev.ch] * (ev.vel || 1));
    o.start(ev.t); o.stop(stop);
  }

  const HD_GAIN = { p1: .24, p2: .15, wave: .30, pad: .035, noise: 1 };
  const HD_SEND = { p1: .22, p2: .3, wave: .03, pad: .5, noise: .08 };
  const HD_PAN = { p1: 0, p2: -.3, wave: 0, pad: 0, noise: .15 };

  function playHD(ctx, buses, ev) {
    const bus = buses[ev.ch], end = ev.t + ev.dur, stop = end + .5;
    if (ev.ch === "noise") {
      const t = ev.t, v = (ev.vel || 1);
      const noise = (type, f, q, gn, dec, rate) => { const src = ctx.createBufferSource(); src.buffer = rate ? lfsr(ctx, true) : whiteNoise(ctx); src.loop = true;
        if (rate) src.playbackRate.value = rate;
        const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
        const a = ctx.createGain(); a.gain.setValueAtTime(gn * v, t); a.gain.setTargetAtTime(0, t + .002, dec / 4);
        src.connect(fl); fl.connect(a); a.connect(bus); src.start(t, (t * 3.17) % .5); src.stop(t + dec * 1.5 + .05); };
      const tone = (type, f1, f2, gn, dec) => { const o = ctx.createOscillator(); o.type = type;
        o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dec * .5);
        const a = ctx.createGain(); a.gain.setValueAtTime(gn * v, t); a.gain.setTargetAtTime(0, t + .002, dec / 4);
        o.connect(a); a.connect(bus); o.start(t); o.stop(t + dec * 1.5 + .05); };
      if (ev.drum === "k") { tone("sine", 155, 46, .55, .3); noise("lowpass", 900, .5, .08, .02); }
      if (ev.drum === "s") { noise("bandpass", 1900, .7, .32, .17); tone("triangle", 200, 150, .14, .09); }
      if (ev.drum === "r") noise("bandpass", 1900 * (ev.rate || 1), .7, .2, .08);
      if (ev.drum === "h") noise("highpass", 7000, .6, .13, .05);
      if (ev.drum === "z") noise("bandpass", 2600, 1.2, .22, .14, .8);
      return;
    }
    const amp = ctx.createGain(); amp.gain.value = 0; amp.connect(bus);
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
    } else { // p1 / p2: two detuned pulses, spread a little in stereo, filtered; the thinnest duty widened a touch
      lp.frequency.value = ev.ch === "p1" ? 5200 : 3800; lp.Q.value = .5;
      const duty = Math.max(ev.duty, .18);
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

  /* ================= mix and scheduling ================= */
  function createMix(ctx, dest, opts = {}) {
    const finish = opts.finish || g.EUSynth.finish || "enhanced";
    const mix = { ctx, finish, intensity: opts.intensity == null ? 1 : opts.intensity };
    const out = ctx.createGain(); out.gain.value = 1; out.connect(dest); mix.out = out;
    const master = ctx.createGain(); mix.master = master;
    if (finish === "enhanced") {
      mix.base = .8;
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3; comp.knee.value = 8; comp.attack.value = .005; comp.release.value = .2;
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 30;
      master.connect(hp); hp.connect(comp); comp.connect(out);
      const verb = ctx.createConvolver(); verb.buffer = reverbIR(ctx); const wet = ctx.createGain(); wet.gain.value = .9; verb.connect(wet); wet.connect(master);
      mix.buses = {};
      ["p1", "p2", "wave", "pad", "noise"].forEach((ch) => { const b = ctx.createGain(), pn = ctx.createStereoPanner(), sd = ctx.createGain();
        pn.pan.value = HD_PAN[ch]; sd.gain.value = HD_SEND[ch]; b.connect(pn); pn.connect(master); b.connect(sd); sd.connect(verb); mix.buses[ch] = b; });
      mix.play = (ev) => playHD(ctx, mix.buses, ev);
    } else {
      mix.base = .75;
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 35;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 11000; lp.Q.value = .5;
      master.connect(hp); hp.connect(lp); lp.connect(out);
      mix.play = (ev) => playChip(ctx, master, ev);
    }
    master.gain.value = mix.base;
    mix.setTrack = (C, when) => { // loudness trim (music/levels.js, generated) and per-track drum level
      const t = when == null ? ctx.currentTime : when, lv = (g.EU_LEVELS || {})[C.id], db = (lv && lv[finish]) || 0;
      master.gain.setValueAtTime(mix.base * Math.pow(10, db / 20), t);
      if (mix.buses) mix.buses.noise.gain.setValueAtTime(C.T.drumsHD || 1, t);
    };
    return mix;
  }

  // intensity 0..1 picks layers on layered tracks: below 1/3 drums, bass and pad; below 2/3 adds harmony; above adds the lead
  function levelFor(mix, C) { if (!C.layered) return 2; const i = mix.intensity; return i < 1 / 3 ? 0 : i < 2 / 3 ? 1 : 2; }
  function scheduleBar(mix, C, bi, when) {
    const lvl = levelFor(mix, C), b0 = bi * C.meter;
    C.byBar[bi].forEach((x) => { if ((x.layer || 0) > lvl) return;
      mix.play(Object.assign({}, x, { t: when + (x.t - b0) * C.spb, dur: x.dur * C.spb })); });
  }

  function render(ctx, dest, track, t0 = 0, opts = {}) {
    const C = track.byBar ? track : compile(track), mix = createMix(ctx, dest, opts), loops = C.once ? 1 : (opts.loops || 1);
    mix.setTrack(C, t0);
    for (let l = 0; l < loops; l++) for (let bi = 0; bi < C.nBars; bi++) scheduleBar(mix, C, bi, t0 + (l * C.nBars + bi) * C.meter * C.spb);
    return loops * C.seconds;
  }

  g.EUSynth = Object.assign(g.EUSynth || {}, { compile, createMix, scheduleBar, render, midiOf, hz, parseMel, WAVES,
    FINISHES: ["enhanced", "chip"] });
  if (!g.EUSynth.finish) g.EUSynth.finish = "enhanced";
})(typeof window !== "undefined" ? window : globalThis);
