# Sound palette and soundtrack (v0.4)

Status: **direction set, details still open.** On 2026-10-23 the designer chose *retro, in the style of the classic handheld monster-collecting RPGs (Pokemon)*, then asked for it *"a little less retro… similar vibe but less sounds like it's coming out of a gameboy."* Every tune here is original; only the style is borrowed.

## Two finishes, one arrangement

The music is still **written** like a handheld RPG score: four parts (lead, harmony, bass, drums), bouncy octave bass, arpeggios, delayed vibrato. It is **played** in one of two finishes (`Music.setFinish`):

| Finish | What it sounds like | Status |
|---|---|---|
| **Enhanced** (default) | Same writing, fuller sound: smooth envelopes instead of stepped volume, two slightly detuned pulse waves per part, filtered so they're not buzzy, the thinnest pulse widened a little, a soft chord pad under four of the elements, synthesized kick, snare and hats, stereo width and a short reverb | What the game uses |
| **Classic chip** | The strict four-channel 8-bit handheld chip described below | Kept for comparison and for a possible "retro" option |

Measured on the renders, Enhanced has about a tenth of the chip's energy above 5 kHz (where the buzz lives) and real stereo width (side/mid about 0.2, the chip is mono).

## The arrangement: four parts, written like the handheld chip

Each part maps to one channel of the 8-bit handheld sound chip, and in the Classic chip finish each plays one note at a time:

| Channel | Sound | Job in every track |
|---|---|---|
| **Pulse 1** | Square/pulse wave, 12.5 / 25 / 50 % duty | Lead melody (the motif), with delayed vibrato on held notes |
| **Pulse 2** | Pulse wave, usually thinner duty and quieter | Harmony: thirds under the lead, an echo of the lead, fast arpeggios, or off-beat stabs |
| **Wave** | 32-step, 4-bit wavetable | Bass, often bouncing in octaves |
| **Noise** | LFSR noise (long and short "metallic" modes) | All percussion: kick, snare, hats, rolls, the Lightning "zap" |

In Classic chip, volume envelopes step through 16 levels at 1/64 s, like the hardware. Thin duty (12.5 %) sounds reedy and airy; 50 % is round and hollow; 25 % is the bright middle. Those duty choices, plus the wavetable and drum pattern, are most of what tells the elements apart.

The palette is also data: `music/palette.js` holds the element sounds, the tracks in `music/tracks/` hold the notes, `music/synth.js` plays them and `music/player.js` is the game's API. The [Sound Room](https://claude.ai/artifact/Nz4Vs5tjXdGoexGgbza3o8) plays everything.

## The main motif: "Unbound"

Nine notes, two bars of 4/4, written as scale degrees so every element can play it in its own mode:

```
degree:  1    5    4  3  4    5  6  5    8
beats:   1    1    ½  ½  1    ½  ½  1    2
```

In D Dorian (the main theme): `D4 A4 G-F G | A-B A D5`.

Why this shape:

- **Open fifth to start** (1 to 5). Bare and elemental, and it reads in any mode, major or minor.
- **A turn around the fourth** (4 3 4, then 5 6 5). The middle is the part that changes colour per element: the 3rd and 6th are the notes that differ most between the modes below, so Fire, Water and Wind sound distinct while the contour stays the same.
- **Leap to the octave at the end** (5 to 8). The "unbound" moment: the line breaks out of the fifth it was circling. It also leaves the phrase open, so it can loop or hand off to a battle cue.

How tracks can quote it:

| Use | Treatment |
|---|---|
| Title / main theme | Full motif, slow, harmonised i - iv - III - i |
| Region themes | Motif in the region's element mode, as the B section or a countermelody |
| Battle loops | First bar only (1 5 4 3 4) as a riff, repeated; full motif when life gets low |
| Victory stinger | Last bar (5 6 5 8), fast, ending on a held major chord |
| Defeat stinger | First bar, slowed, ending on the 4 instead of climbing |
| Loot / rare card found | The final leap (5 to 8) as a two-note chime |

## The five elements

Each element gets a mode, a home key, a tempo range, a rhythm, and signature sounds. Keys are spread out so two elements meeting in a dual deck or a region border don't sit on top of each other.

| | Mode | Home key | Tempo | Rhythm | Channels | One-line mood |
|---|---|---|---|---|---|---|
| **Fire** | Phrygian dominant (b2, major 3rd) | E | 152 | Driving kick, off-beat stabs, snare roll fill | Lead 25 % duty, fast fade · Pulse 2: 12.5 % off-beat chord stabs · Wave: saw, bouncing octaves | Hot, aggressive, always pushing forward |
| **Water** | Dorian | G | 96 | Flowing triplets, hats only | Lead 50 % duty, slow fade, wide vibrato · Pulse 2: soft 12.5 % triplet arpeggios · Wave: smooth sine, long root-fifth pedal | Calm, deep, patient; pulls you in |
| **Earth** | Aeolian (natural minor) | A, low register | 100 | Heavy and sparse, kick and snare | Lead 50 % duty, low and loud · Pulse 2: 50 % thirds underneath · Wave: hollow, one note per bar | Solid, ancient, immovable |
| **Wind** | Lydian (raised 4th) | F | 132 | Triplet shuffle hats | Lead 12.5 % duty, airy, deep vibrato · Pulse 2: echo of the lead an 8th later · Wave: triangle, walking root-fifth-octave | Open sky, quick, playful, never lands |
| **Lightning** | Mixolydian plus a tritone "zap" | B | 168 | Busy 16ths, metallic noise hit | Lead 25 % duty, snappy · Pulse 2: 16th arpeggios ending each bar on the tritone · Wave: saw octaves | Electric, twitchy, fast reactions |

The main theme is D Dorian at 120: a 50 % lead with vibrato, 25 % thirds underneath, triangle-wave octave bass and a simple kick-snare beat.

In Enhanced, Main, Water, Earth and Wind add a soft chord pad; Fire and Lightning stay without one so they keep their punch, with lighter drums.

Card-game ties (from the card files): Fire is haste and burn, so it is the fastest steady beat; Water is draw, freeze and big blockers, so it is the slowest and most sustained; Earth is walls and ramp into giants, so it sits lowest and heaviest; Wind is fliers and bounce, so it floats in triplets with the bright raised 4th; Lightning is chain spells and thresholds, so it is the busiest rhythm with a stab that "discharges" every bar.

## The soundtrack (v0.4, 48 pieces)

The designer asked (2026-10-24) for a theme for every element including duals and triples, backing music for each zone, and music for the important battles. Track list and format: `tracks/README.md`.

### Element themes (6)

`main` plus the five elements, 16 bars each: A opens with the motif in the element's mode, B is the element's own tune. All melodies hand-written.

### Confluence themes (10 dual + 10 triple)

Braided from the element themes, the way a braided card is, so each one sounds related to its parents:

- **Dual** (lead + rhythm element): A = lead's A bars 1-4 + rhythm's A bars 5-8; B = rhythm's B bars 1-4 + lead's B bars 5-8. Lead sound from the lead element; harmony, bass and drums from the rhythm element.
- **Triple** (lead + harmony + rhythm): A = lead's A 1-4 + harmony's A 5-8; B = rhythm's B 1-4 + lead's B 5-8. Lead, harmony and rhythm sounds from each.
- Each gets its own key, the lead element's mode (melodies are scale degrees, so a borrowed phrase takes on the new mode's colour) and its parents' average tempo. Which element leads is chosen from the archetypes in `design/elements.md` (e.g. Steam: Water's calm tune over Fire's hurried beat; Storm: Water's melody over Lightning's crackle).
- This is a rule, not twenty hand-written tunes. Favourites can get their own tune later.

### Zones (10)

From Story's draft bible (PR #6, not merged), so names and moods may change:

| Track | Zone | Feel |
|---|---|---|
| `brindle-ford` | Home town | G major, warm walking bass; the motif returns gently |
| `hearthvale-roads` | Overworld | D Mixolydian, bouncy, built on the motif's first bar |
| `saltmere` | Tidewater League | A Dorian shanty in 3/4 |
| `deepmoot` | Holdfast | E minor hymn and guard march |
| `highcourt` | Skyreach | B♭ Lydian, courtly, echoing |
| `thunderhold` | Stormcourt of Vol | C♯ Phrygian chant over restless arpeggios |
| `cindergate` | Pyrrhen Dominion | D Phrygian dominant imperial march |
| `borderlands` | Confluence war front | C minor, tense and driven |
| `vault` | Dungeons | F♯ Phrygian, sparse and echoing |
| `camp` | Rest and camp scenes | F major waltz |

### Battles (8, layered) and stingers (4)

| Track | Fight |
|---|---|
| `battle-wild` | Grass duels with wilds |
| `battle-contract` | Binders, trainers, contract targets |
| `battle-rival` | Pell Varrane (Act I rival, Fire) |
| `battle-crowned` | Act-end crowned wilds; raise intensity per phase |
| `battle-vexis` | Vexis, the Pyrelord (grows from Cindergate's march) |
| `battle-exalted` | Duels with or beside the Seven Exalted |
| `battle-primordial` | The Primordials (the motif turned upside down) |
| `battle-seraphine` | The final duel: Seraphine's darkened motif against Wren's answer in major |

Layers (`Music.setIntensity`): below 1/3 drums, bass and pad; below 2/3 adds harmony; above adds the lead and extra percussion. Element and confluence themes are layered too, so the game can score a duel with the enemy's element theme. Stingers: victory, defeat, card found, promotion.

## Limits

Everything is synthesized in the browser (Web Audio); nothing is sampled. The whole soundtrack is about 60 KB of code and data. Enhanced can move further from the handheld (real-instrument-like voices, more parts) or back toward it, a knob at a time. MIDI export is planned so a track can move into a DAW or to a human composer later.

## Checks

- `node music/tools/lint.js` (no browser): every bar adds up to its meter, chord counts match, lead notes stay between C3 and E6, every track compiles.
- `node music/tools/render-check.js` renders every track in both finishes in headless Chromium: peak, loudness, the loop seam (the jump from the last bar back to the first, compared with the track's other bar lines, for clicks or drop-outs), tails on stingers, and loudness at intensity 0 for layered tracks. `--levels` re-measures loudness and writes `levels.js` (trims to about -16 dBFS RMS, peaks held under -1.5 dBFS). Needs `NODE_PATH=$(npm root -g)` when Playwright is installed globally.

Last run (v0.4, all 48 pieces × 2 finishes = 96 renders, 0 flagged):

| Measure | Result |
|---|---|
| Loudness (RMS) | -17.0 to -15.9 dBFS across every track and finish |
| Peak | -7.8 to -1.5 dBFS (none above -1) |
| Loop seam | Jump at the loop point at most 1.75× the track's typical bar line; level after the seam within 1.1 dB of other bars (no clicks or drop-outs) |
| Layered tracks at intensity 0 | 0.3 to 3 dB quieter than full, so a calm duel isn't a volume dip |
| Stinger tails | Silent (below -60 dBFS) by the end of the render |
