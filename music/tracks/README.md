# Tracks

Every piece of music is a score in data, pushed onto `EU_TRACKS`. Load order is in `order.json` (then `../levels.js`, then `../player.js`).

| File | What |
|---|---|
| `elements.js` | `main` (title theme) and the five element themes: `fire`, `water`, `earth`, `wind`, `lightning` |
| `confluences.js` | The 10 dual and 10 triple confluence themes, braided from the element themes by a rule (top of the file) |
| `zones.js` | Backing music for each zone |
| `battles.js` | Important-battle themes (layered) and the stingers |
| `act1.js` | Music for the Act I demo: its places, bosses, scenes and stingers |
| `story.js` | Cues for Acts II-V from Story's outline (deaths, Highcourt tournament, Thunderhold cathedral and Vol, council hall, Founding Vault, loyalty fights) |

## Track ids

| Group | Ids |
|---|---|
| element | `main` `fire` `water` `earth` `wind` `lightning` |
| dual | `volcano` `wildfire` `plasma` `steam` `swamp` `ice` `storm` `sand` `metal` `tempest` |
| triple | `geyser` `mirage` `aurora` `ash` `forge` `solar` `glacier` `quicksilver` `hurricane` `glass` |
| zone | `brindle-ford` `hearthvale-roads` `saltmere` `deepmoot` `highcourt` `thunderhold` `cindergate` `borderlands` `vault` `camp` `branch-hall` `hollins-cross` `greyapple-orchard` `weir-vault` `thunderhold-cathedral` `council-hall` `founding-vault` |
| scene | `seraphine` `cold-open` `homecoming` `mads` `dove` |
| battle | `battle-wild` `battle-contract` `battle-rival` `battle-crowned` `battle-vexis` `battle-exalted` `battle-primordial` `battle-seraphine` `battle-gullet` `battle-cinder-mother` `battle-sluicewarden` `battle-tournament` `battle-davor` `battle-kes` `battle-vol` |
| stinger | `sting-victory` `sting-defeat` `sting-card` `sting-rankup` `sting-exalted` `sting-pyrrhen` `sting-slackwater` `sting-hollow` `sting-manifest` `sting-phase` `sting-crown` `sting-crew-win` `sting-crew-lose` |

Element and confluence ids match the element keys used in `cards/` (`EL_LIFE`), so the game can pick a theme straight from a deck's element.

## Format

```js
T.push({
  id: "fire", name: "Fire", group: "element",          // group: element | dual | triple | zone | scene | battle | stinger
  desc: "One line for the Sound Room.",
  sound: "fire",                                      // instrumentation from palette.js; any field below overrides it
  tonic: "E3", mode: "phrygdom", bpm: 152, meter: 4,  // modes in palette.js; meter 3 or 4
  p1: {...}, p2: { style: "stabs", ... }, bass: { style: "octave", wave: "saw" },
  drums: "k.h.s.k.h.k.s.hh", drums2: "..h...h.",       // one bar; drums2 joins at high intensity
  pad: true, layered: true, once: false, leadOct: 0,
  sections: {
    A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2", chords: "1 4" },
    B: { mel: "...", chords: "...", mode: "ionian" },   // a section can change mode
  },
  form: "AB",                                         // optional; defaults to the sections in order
});
```

- **Melody:** `degree:beats` tokens, bars split by `|`. Degrees are scale steps of the track's mode: 1 is the tonic, 8 the octave, 0 and below go under the tonic. `5#` / `5b` raise or lower a step. `r` is a rest. Beats can be fractions (`1/3` for triplets).
- **Chords:** one scale-degree root per bar; the engine builds the triad from the mode.
- **Layers** (`layered: true`): intensity below 1/3 plays drums, bass and pad; below 2/3 adds the harmony; above adds the lead and `drums2`.
- `node music/tools/lint.js` checks every bar adds up to the meter, chord counts match, notes stay in range, and every track compiles.
- `node music/tools/render-check.js --levels` re-measures loudness and rewrites `../levels.js` after adding or changing tracks.

## Using it in the game (Game Dev)

Load `palette.js`, `synth.js`, the files in `order.json` after those two, `levels.js` and `player.js`, then:

```js
Music.unlock();                    // on the first click / key / touch
Music.play("brindle-ford");        // loops, crossfades from the last track
Music.play("battle-wild"); Music.setIntensity(0.3);   // raise toward 1 as life drops
Music.stinger("sting-victory");    // one-shot over the music, ducks it
Music.setVolume(0.7); Music.setFinish("chip");
```

Suggested uses: zone tracks on entering a map; `battle-wild` for grass duels and `battle-contract` for trainers and contract targets (or the enemy element's theme with `setIntensity` for a per-element battle); the named battles for those story fights; element and confluence themes in the deck builder, the Forge and card reveals.

### Act I demo cue sheet (story/demo/act1.md)

| Moment / map | Track |
|---|---|
| Cold open (`a1_intro`) | `cold-open` |
| Brindle Ford, Calder Mill (`town`) | `brindle-ford` |
| Branch halls (`hall_ford`, Hollin's Cross hall) | `branch-hall` |
| The Millrace (`millrace`), Gullet duel | `battle-gullet` |
| Promotions to Copper and Iron | `sting-rankup` |
| Millrace Road (`route1`); Brann's duel | `hearthvale-roads`; `battle-contract` |
| Hollin's Cross (`cross`) | `hollins-cross`; `sting-exalted` on `a1_cross_arrival`; `sting-pyrrhen` on `a1_davor` |
| Pell's duel | `battle-rival` |
| Greyapple Orchard (`orchard`); the Cinder Mother | `greyapple-orchard`; `battle-cinder-mother` |
| Weir Vault gate and floors (`weir_gate`, `vault1`, `vault2`) | `weir-vault` |
| The Sluicewarden (two phases) | `battle-sluicewarden`, `setIntensity(1)` when it rebuilds |
| Slackwater's chest (`a1_slackwater_bind`) | `sting-slackwater` |
| Seraphine at the gate (`a1_seraphine`) | `seraphine` |
| Homecoming (`a1_homecoming`) | `homecoming` |
| Ordinary wins / losses | `sting-victory` / `sting-defeat`; other chests `sting-card` |

### Acts II-V cues (story/outline.md)

| Outline beat | Track |
|---|---|
| II-3 Highcourt tournament duels | `battle-tournament` |
| II-4 Mads dies at the mill gate | `mads` |
| III-2, IV-4 Pell against Davor | `battle-davor` |
| III-4 Dove holds the rift | `dove` |
| IV-1 Thunderhold cathedral; Vol (with Ysil; Tamsin's fight) | `thunderhold-cathedral`; `battle-vol` |
| IV-2 Kes reclaims his name | `battle-kes` |
| V-1 The Covenant council hall (the Seraphine reveal is a conversation) | `council-hall` |
| V-3 The Founding Vault | `founding-vault`; Primordial fights `battle-primordial`; final duel `battle-seraphine` |
