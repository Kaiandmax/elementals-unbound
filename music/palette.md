# Sound palette (draft)

Status: **draft, waiting on the designer's musical direction** (genre, how retro or modern, instrumentation). Everything below is a starting proposal; the instrument choices are the part most likely to change once direction is set. The scales, motif and rhythms are meant to survive any instrument swap.

The palette is also data: `music/palette.js` holds the same numbers and `music/synth.js` plays them. The [Sound Room](https://claude.ai/artifact/Nz4Vs5tjXdGoexGgbza3o8) plays each element's sketch.

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

| | Mode | Home key | Tempo | Rhythm | Signature sounds (synth) | One-line mood |
|---|---|---|---|---|---|---|
| **Fire** | Phrygian dominant (b2, major 3rd) | E | 136-152 | Driving 3+3+2 kick, 8th-note power chords | Resonant sawtooth lead, gritty saw bass, tom fills | Hot, aggressive, always pushing forward |
| **Water** | Dorian | G | 76-90 | Flowing 6/8 (triplet arpeggios), almost no drums | FM bell lead, glassy arpeggios, long echo | Calm, deep, patient; pulls you in |
| **Earth** | Aeolian (natural minor) | A, low register | 80-96 | Heavy half-time, kick and low toms | Square lead, sustained root-and-fifth drone, square bass | Solid, ancient, immovable |
| **Wind** | Lydian (raised 4th) | F | 108-124 | Light triplet swing, shaker hats | Breathy triangle flute with vibrato, rising noise gusts | Open sky, quick, playful, never lands |
| **Lightning** | Mixolydian plus tritone stabs | B | 160-176 | Busy 16th-note arpeggios, syncopated snare | Detuned pulse lead, 16th arps, tritone "zap" stab on beat 4-and | Electric, twitchy, fast reactions |

Card-game ties (from the card files): Fire is haste and burn, so it is the fastest steady beat; Water is draw, freeze and big blockers, so it is the slowest and most sustained; Earth is walls and ramp into giants, so it sits lowest and heaviest; Wind is fliers and bounce, so it floats in triplets with the bright raised 4th; Lightning is chain spells and thresholds, so it is the busiest rhythm with a stab that "discharges" every bar.

### Confluences (dual and triple decks)

Not scored yet. The proposed rule, so they sound related to their parents:

- **Dual** (e.g. Steam = Fire + Water): melody in the mode of the element that leads the deck, rhythm of the other, home key of the leader. Instruments mix one signature from each.
- **Triple**: the three parents' signature sounds over the main-theme harmony (D Dorian), tempo averaged.

## Battle music plan (next step after direction is set)

Battles last about 3 turns, so each element gets a short loop (8-16 bars) built in layers: drums and bass at full life, the motif riff added as life drops, the full motif and extra percussion at low life. `Music.setIntensity(0..1)` would fade layers in and out. Victory and defeat stingers per the table above. Player API to agree with Game Dev.

## Limits

This is synthesized in the browser (Web Audio), so it sounds like a polished chiptune or synth score, not a recorded orchestra. MIDI export is planned so a track can move into a DAW or to a human composer later.

## Checks

`node music/tools/render-check.js` renders every sketch offline in headless Chromium and fails on clipping (peak above -1 dBFS), a tail that doesn't decay, or bad samples. Run with `NODE_PATH=$(npm root -g)` if Playwright is installed globally. Add `--wav <dir>` to save WAVs.

Last run (sketches, 4 bars each):

| Sketch | Length | Peak | RMS |
|---|---|---|---|
| Main theme | 9.2 s | -3.0 dBFS | -14.1 dBFS |
| Fire | 6.7 s | -1.1 dBFS | -15.3 dBFS |
| Water | 11.4 s | -3.7 dBFS | -14.2 dBFS |
| Earth | 10.9 s | -2.7 dBFS | -14.7 dBFS |
| Wind | 8.3 s | -4.9 dBFS | -13.7 dBFS |
| Lightning | 5.7 s | -2.5 dBFS | -15.0 dBFS |
