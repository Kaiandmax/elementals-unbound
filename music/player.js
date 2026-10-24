/* Elementals Unbound - music player: the API the game calls. Needs palette.js, synth.js, tracks/*.js and levels.js
   loaded first (order in music/tracks/order.json, then levels.js, then this file).

     Music.unlock()                  call from the first click/key/touch (browsers start audio only after one)
     Music.play(id, {fade})          loop a track; crossfades from whatever is playing (no-op if it already is)
     Music.stop({fade})              fade out and stop
     Music.stinger(id)               play a one-shot (victory, defeat, card found, promotion) over the music,
                                     ducking it; returns its length in seconds
     Music.setIntensity(x)           0..1; layered tracks (battles) add parts as it rises; applies from the next bar
     Music.setVolume(v)              0..1 master volume
     Music.setFinish(f)              "enhanced" (default) or "chip"
     Music.tracks(group?)            [{id, name, group, desc, parents?}]  groups: element dual triple zone battle stinger
     Music.current()                 {id, beat, bar} or null (beat counts from the start of the loop)
   Track ids: see music/tracks/README.md. */
(function (g) {
  const S = () => g.EUSynth, LIST = () => g.EU_TRACKS || [];
  const compiled = {};
  const get = (id) => { if (!compiled[id]) { const t = LIST().find((x) => x.id === id); if (!t) throw new Error("Music: no track " + id);
    compiled[id] = S().compile(t); } return compiled[id]; };
  let ctx = null, vol = null, cur = null, timer = null, volume = .8, intensity = 1;

  function ensure() {
    if (ctx) return ctx;
    const AC = g.AudioContext || g.webkitAudioContext; if (!AC) return null;
    ctx = new AC(); vol = ctx.createGain(); vol.gain.value = volume; vol.connect(ctx.destination);
    return ctx;
  }
  function look() { return (g.document && g.document.hidden) ? 1.6 : .35; }
  function startTimer() { if (!timer) timer = setInterval(tick, 50); }
  function tick() {
    if (!cur) return;
    const now = ctx.currentTime, C = cur.C;
    if (cur.next < now - .05) { cur.next = now + .05; } // fell behind (tab was asleep): rejoin at the next bar
    while (cur.next < now + look()) {
      if (C.once && cur.bar >= C.nBars) { cur = null; return; }
      cur.mix.intensity = intensity;
      S().scheduleBar(cur.mix, C, cur.bar % C.nBars, cur.next);
      cur.marks.push({ t: cur.next, bar: cur.bar % C.nBars }); if (cur.marks.length > 8) cur.marks.shift();
      cur.next += C.meter * C.spb; cur.bar = C.once ? cur.bar + 1 : (cur.bar + 1) % C.nBars;
    }
  }
  function fadeOut(state, fade) {
    const t = ctx.currentTime, gn = state.mix.out.gain;
    gn.cancelScheduledValues(t); gn.setValueAtTime(gn.value, t); gn.linearRampToValueAtTime(0, t + fade);
    setTimeout(() => { try { state.mix.out.disconnect(); } catch (e) {} }, (fade + 3) * 1000);
  }

  const Music = {
    unlock() { const c = ensure(); if (c && c.state !== "running") c.resume(); return !!c; },
    play(id, opts = {}) {
      if (!ensure()) return;
      if (cur && cur.id === id && !cur.C.once) return;
      const fade = opts.fade == null ? .8 : opts.fade, C = get(id);
      if (cur) fadeOut(cur, fade);
      const mix = S().createMix(ctx, vol, { finish: S().finish, intensity });
      mix.setTrack(C);
      const t = ctx.currentTime;
      mix.out.gain.setValueAtTime(0, t); mix.out.gain.linearRampToValueAtTime(1, t + Math.max(.02, fade * .5));
      cur = { id, C, mix, bar: 0, next: t + .08, marks: [] };
      ctx.resume(); startTimer(); tick();
    },
    stop(opts = {}) { if (!cur) return; fadeOut(cur, opts.fade == null ? .8 : opts.fade); cur = null; },
    stinger(id) {
      if (!ensure()) return 0;
      const C = get(id), t0 = ctx.currentTime + .05;
      const len = S().render(ctx, vol, C, t0, { finish: S().finish }); // its own short-lived mix
      if (cur) { const gn = cur.mix.out.gain; gn.cancelScheduledValues(t0); gn.setValueAtTime(gn.value, t0);
        gn.linearRampToValueAtTime(.25, t0 + .1); gn.setValueAtTime(.25, t0 + len); gn.linearRampToValueAtTime(1, t0 + len + .8); }
      ctx.resume(); return len;
    },
    setIntensity(x) { intensity = Math.max(0, Math.min(1, +x || 0)); },
    getIntensity() { return intensity; },
    setVolume(v) { volume = Math.max(0, Math.min(1, +v)); if (vol) vol.gain.setTargetAtTime(volume, ctx.currentTime, .05); },
    setFinish(f) { if (!S().FINISHES.includes(f)) return; S().finish = f; if (cur) { const id = cur.id; cur.mix.out.gain.value = 0; fadeOut(cur, .05); cur = null; Music.play(id, { fade: .1 }); } },
    getFinish() { return S().finish; },
    tracks(group) { return LIST().filter((t) => !group || t.group === group).map((t) => ({ id: t.id, name: t.name, group: t.group, desc: t.desc, parents: t.parents })); },
    info(id) { return get(id); },
    current() {
      if (!cur || !ctx) return null;
      const now = ctx.currentTime; let m = null; for (const x of cur.marks) if (x.t <= now) m = x;
      if (!m) return { id: cur.id, beat: 0, bar: 0 };
      const beat = m.bar * cur.C.meter + (now - m.t) / cur.C.spb;
      return { id: cur.id, beat, bar: Math.floor(beat / cur.C.meter) };
    },
    get context() { return ctx; },
  };
  g.Music = Music;
})(typeof window !== "undefined" ? window : globalThis);
