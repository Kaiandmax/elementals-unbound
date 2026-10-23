# Music

Owned by the Music agent (`studio/roles/music.md`). Scores are code: data played by a browser synthesizer, with MIDI export for use outside the game.

- `palette.md` — each element's sound and the main motif
- `tracks/` — one score per track
- `player.js` — playback API the game calls
- `sfx/` — short sound effects
- `palette.js`, `synth.js` — the palette as data and the Web Audio synth that plays it
- `soundroom.html` — source of the Sound Room page (published with `palette.js` and `synth.js` beside it)
- `tools/render-check.js` — offline render check (peak, loudness, tail) in headless Chromium

Sound Room: https://claude.ai/artifact/Nz4Vs5tjXdGoexGgbza3o8
