/* Elementals Unbound - tiny Web Audio synth for sketches and, later, the game's player.
   No dependencies. Works with a live AudioContext or an OfflineAudioContext (used for render checks).
   API: EUSynth.sketch(ctx, dest, key, t0) -> seconds; schedules one 4-bar statement of the main motif
        in the sound of palette entry `key` (see music/palette.js). */
(function (g) {
  const P = () => g.EU_PALETTE;
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const midiOf = (n) => { const m = /^([A-G])([#b]?)(-?\d)$/.exec(n);
    return 12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0); };
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  // ---- voices: oscillator recipe + envelope + filter ----
  const V = {
    brass:      { osc: ["sawtooth", "sawtooth"], det: 8, a: .03, d: .2, s: .7, r: .15, f: 900, fEnv: 2400, q: 2, g: .16 },
    saw:        { osc: ["sawtooth"], a: .004, d: .15, s: .55, r: .1, f: 1400, fEnv: 2600, q: 7, g: .17 },
    bell:       { fm: 3.5, idx: 4, a: .002, d: 1.1, s: .0, r: .8, g: .26 },
    glass:      { fm: 2, idx: 1.5, a: .002, d: .5, s: 0, r: .4, g: .10 },
    square:     { osc: ["square"], a: .01, d: .25, s: .6, r: .12, f: 1300, fEnv: 600, q: 1, g: .11 },
    flute:      { osc: ["triangle", "sine"], det: 0, a: .07, d: .1, s: .85, r: .18, vib: [5.5, 7], f: 4000, q: 0, g: .26 },
    pulse:      { osc: ["square", "square"], det: 12, a: .003, d: .12, s: .5, r: .06, f: 2600, fEnv: 2400, q: 3, g: .09 },
    pluck:      { osc: ["sawtooth"], a: .002, d: .16, s: 0, r: .08, f: 900, fEnv: 1600, q: 2, g: .10 },
    pad:        { osc: ["sawtooth", "sawtooth"], det: 14, a: .35, d: .3, s: .8, r: .5, f: 900, q: 1, g: .045 },
    drone:      { osc: ["square", "sawtooth"], det: 5, a: .5, d: .2, s: 1, r: .6, f: 520, q: 1, g: .07 },
    bassSine:   { osc: ["sine", "triangle"], a: .01, d: .2, s: .8, r: .12, f: 1200, q: 0, g: .30 },
    bassSaw:    { osc: ["sawtooth"], a: .003, d: .1, s: .6, r: .05, f: 500, fEnv: 700, q: 5, g: .20 },
    bassSquare: { osc: ["square"], a: .005, d: .15, s: .7, r: .08, f: 420, fEnv: 300, q: 2, g: .17 },
  };

  function env(param, t, dur, v, peak) {
    const end = t + Math.max(dur, v.a + .01);
    param.setValueAtTime(0, t);
    param.linearRampToValueAtTime(peak, t + v.a);
    param.setTargetAtTime(peak * v.s, t + v.a, v.d / 3 + .001);
    param.setTargetAtTime(0, end, v.r / 4 + .001);
    return end + v.r * 1.5;
  }

  function note(ctx, dest, name, m, t, dur, vel = 1) {
    const v = V[name], f0 = hz(m);
    const amp = ctx.createGain(); amp.gain.value = 0;
    const stopAt = env(amp.gain, t, dur, v, v.g * vel);
    let head = amp;
    if (v.f) { const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = v.q || 0;
      lp.frequency.setValueAtTime(v.f, t);
      if (v.fEnv) { lp.frequency.linearRampToValueAtTime(v.f + v.fEnv * vel, t + v.a + .005);
        lp.frequency.setTargetAtTime(v.f, t + v.a + .005, v.d / 2 + .01); }
      lp.connect(amp); head = lp; }
    amp.connect(dest);
    const oscs = [];
    if (v.fm) { // two-operator FM bell
      const car = ctx.createOscillator(), mod = ctx.createOscillator(), mg = ctx.createGain();
      car.frequency.value = f0; mod.frequency.value = f0 * v.fm;
      mg.gain.setValueAtTime(f0 * v.idx, t); mg.gain.setTargetAtTime(f0 * .2, t, .25);
      mod.connect(mg); mg.connect(car.frequency); car.connect(head); oscs.push(car, mod);
    } else {
      v.osc.forEach((type, i) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f0;
        if (v.det) o.detune.value = (i % 2 ? 1 : -1) * v.det * (i ? 1 : .5);
        if (v.vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = v.vib[0];
          lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(v.vib[1], t + .35);
          l.connect(lg); lg.connect(o.detune); l.start(t); l.stop(stopAt); }
        const og = ctx.createGain(); og.gain.value = 1 / v.osc.length; o.connect(og); og.connect(head); oscs.push(o); });
    }
    oscs.forEach((o) => { o.start(t); o.stop(stopAt); });
  }

  // ---- drums ----
  const noiseCache = new WeakMap();
  function noise(ctx) { let b = noiseCache.get(ctx); if (b) return b;
    b = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = b.getChannelData(0);
    let s = 7; for (let i = 0; i < d.length; i++) { s = (s * 16807) % 2147483647; d[i] = s / 1073741823.5 - 1; }
    noiseCache.set(ctx, b); return b; }
  function noiseHit(ctx, dest, t, dur, type, freq, q, gain) {
    const src = ctx.createBufferSource(); src.buffer = noise(ctx);
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const a = ctx.createGain(); a.gain.setValueAtTime(gain, t); a.gain.exponentialRampToValueAtTime(.0005, t + dur);
    src.connect(f); f.connect(a); a.connect(dest); src.start(t, (t * 7.31) % .5); src.stop(t + dur + .01); }
  function thump(ctx, dest, t, f1, f2, dur, gain) {
    const o = ctx.createOscillator(), a = ctx.createGain();
    o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dur * .6);
    a.gain.setValueAtTime(gain, t); a.gain.exponentialRampToValueAtTime(.0005, t + dur);
    o.connect(a); a.connect(dest); o.start(t); o.stop(t + dur + .01); }
  const DRUM = {
    k: (c, d, t, v) => thump(c, d, t, 140, 42, .32, .55 * v),
    s: (c, d, t, v) => { noiseHit(c, d, t, .16, "bandpass", 1900, .8, .30 * v); thump(c, d, t, 230, 160, .09, .16 * v); },
    h: (c, d, t, v) => noiseHit(c, d, t, .045, "highpass", 7500, .7, .09 * v),
    t: (c, d, t, v) => thump(c, d, t, 120, 70, .45, .45 * v),
  };

  // ---- the sketch: motif twice over i - iv - III - i, with the element's accompaniment ----
  function sketch(ctx, out, key, t0) {
    const { MODES, MOTIF, CHORDS, PALETTE } = P(), e = PALETTE[key], scale = MODES[e.mode];
    const beat = 60 / e.bpm, bar = beat * 4, tonic = midiOf(e.tonic);
    const deg = (d) => { const i = d - 1, o = Math.floor(i / 7); return scale[((i % 7) + 7) % 7] + 12 * o; };
    const leadBase = tonic + 12, compBase = tonic, bassBase = tonic >= 50 ? tonic - 12 : tonic;

    const master = ctx.createGain(); master.gain.value = .85 * Math.pow(10, (e.trim || 0) / 20); // per-element loudness trim (dB)
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -12; comp.knee.value = 6; comp.ratio.value = 4; comp.attack.value = .004; comp.release.value = .2;
    master.connect(comp); comp.connect(out);
    const lead = ctx.createGain(); lead.connect(master);
    if (e.fx.delay) { const dl = ctx.createDelay(2), fb = ctx.createGain(), wet = ctx.createGain(), hp = ctx.createBiquadFilter();
      dl.delayTime.value = beat * .75; fb.gain.value = e.fx.delay; wet.gain.value = e.fx.delay * 1.2; hp.type = "highpass"; hp.frequency.value = 400;
      lead.connect(dl); dl.connect(hp); hp.connect(fb); fb.connect(dl); hp.connect(wet); wet.connect(master); }

    // lead: the motif, twice; the second time the octave note is held longer
    let t = t0;
    for (let rep = 0; rep < 2; rep++) MOTIF.forEach(([d, b], i) => {
      const last = i === MOTIF.length - 1;
      note(ctx, lead, e.lead, leadBase + deg(d), t, b * beat * (last ? (rep ? 1.6 : .95) : .9), last ? 1 : .85 + (i % 2) * .1);
      t += b * beat; });

    CHORDS.forEach((r, bi) => {
      const tb = t0 + bi * bar, tri = [r, r + 2, r + 4].map((d) => compBase + deg(d));
      // accompaniment
      if (e.comp === "pad") tri.forEach((m) => note(ctx, master, "pad", m, tb, bar * .97, 1));
      if (e.comp === "drone") [compBase + deg(r), compBase + deg(r) + 7].forEach((m) => note(ctx, master, "drone", m, tb, bar * .98, 1));
      if (e.comp === "power8") for (let s = 0; s < 8; s++) [0, 7].forEach((x) => note(ctx, master, "pluck", compBase + deg(r) + x, tb + s * beat / 2, beat * .35, s % 2 ? .7 : 1));
      if (e.comp === "arp3") { const seq = [0, 1, 2, 3, 2, 1], ns = [...tri, tri[0] + 12];
        for (let s = 0; s < 12; s++) note(ctx, master, key === "water" ? "glass" : "pluck", ns[seq[s % 6]] + 12, tb + s * beat / 3, beat / 3 * 1.5, .8); }
      if (e.comp === "arp16") { const ns = [...tri, tri[0] + 12];
        for (let s = 0; s < 16; s++) note(ctx, master, "pluck", ns[s % 4] + 12, tb + s * beat / 4, beat / 4 * .8, s % 4 ? .6 : .9); }
      // bass
      const bm = bassBase + deg(r), per = { whole: 1, half: 2, eighths: 8 }[e.bassStyle];
      for (let s = 0; s < per; s++) note(ctx, master, e.bass, bm, tb + s * bar / per, bar / per * .85, s % 2 ? .8 : 1);
      // drums
      const D = e.drums, step = bar / D.steps;
      ["k", "s", "h", "t"].forEach((k) => [...(D[k] || "")].forEach((c, s) => { if (c === "x") DRUM[k](ctx, master, tb + s * step, 1); }));
      // element signatures
      if (e.fx.stab) [0, 6].forEach((x) => note(ctx, master, "pulse", compBase + 12 + deg(r) + x, tb + 3.5 * beat, beat * .3, 1));
      if (e.fx.fill && bi === 3) for (let s = 0; s < 8; s++) thump(ctx, master, tb + 2 * beat + s * beat / 4, 220 - s * 18, 90 - s * 6, .25, .4);
      if (e.fx.swell && bi % 2 === 0) { const src = ctx.createBufferSource(); src.buffer = noise(ctx); src.loop = true;
        const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 3;
        f.frequency.setValueAtTime(500, tb); f.frequency.exponentialRampToValueAtTime(3200, tb + bar * 1.4); f.frequency.exponentialRampToValueAtTime(700, tb + bar * 2);
        const a = ctx.createGain(); a.gain.setValueAtTime(0, tb); a.gain.linearRampToValueAtTime(.06, tb + bar); a.gain.linearRampToValueAtTime(0, tb + bar * 2);
        src.connect(f); f.connect(a); a.connect(master); src.start(tb); src.stop(tb + bar * 2 + .05); }
    });
    return bar * CHORDS.length;
  }

  g.EUSynth = { sketch, note, midiOf, hz, voices: V };
})(typeof window !== "undefined" ? window : globalThis);
