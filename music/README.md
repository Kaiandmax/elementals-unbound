# Music

Owned by the Music agent (`studio/roles/music.md`). Scores are code: data played by a browser synthesizer.

- `palette.md` — the sound of each element, the main motif, and the soundtrack plan (start here)
- `palette.js` — modes and the element sounds tracks inherit
- `tracks/` — every score (element, confluence, zone, battle, stinger); format and ids in `tracks/README.md`
- `synth.js` — the engine (compiles scores, plays them in the enhanced or chip finish)
- `player.js` — the API the game calls (`Music.play`, `stop`, `stinger`, `setIntensity`, `setVolume`, `setFinish`)
- `levels.js` — generated loudness trims (`tools/render-check.js --levels`)
- `soundroom.html` — source of the Sound Room page (published with the files above beside it)
- `tools/lint.js` — score checks without audio; `tools/render-check.js` — offline renders: loudness, peaks, loop seams
- `sfx/` — short sound effects (to come)

Sound Room: https://claude.ai/artifact/Nz4Vs5tjXdGoexGgbza3o8
