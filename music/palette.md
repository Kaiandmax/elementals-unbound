# Sound palette (v0.3)

Status: **direction set, details still open.** On 2026-10-23 the designer chose *retro, in the style of the classic handheld monster-collecting RPGs (Pokemon)*, then asked for it *"a little less retro… similar vibe but less sounds like it's coming out of a gameboy."* Every tune here is original; only the style is borrowed.

## Two finishes, one arrangement

The music is still **written** like a handheld RPG score: four parts (lead, harmony, bass, drums), bouncy octave bass, arpeggios, delayed vibrato. It is **played** in one of two finishes (`EUSynth.sketch(..., {finish})`):

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

### Confluences (dual and triple decks)

Not scored yet. The proposed rule, so they sound related to their parents:

- **Dual** (e.g. Steam = Fire + Water): melody in the mode of the element that leads the deck, rhythm of the other, home key of the leader. Pulse 1 takes the leader's duty; pulse 2 and the drums take the other element's style.
- **Triple**: one channel style from each parent over the main-theme harmony (D Dorian), tempo averaged.

## Battle music plan (next)

Battles last about 3 turns, so each element gets a short loop (8-16 bars) built in layers across the four channels: noise and wave at full life, pulse 2 added as life drops, the full motif on pulse 1 at low life, then a faster tempo for the last turn (the classic low-health urgency, done musically rather than with a beeping alarm). `Music.setIntensity(0..1)` would fade layers in and out. Victory and defeat stingers per the table above. Player API to agree with Game Dev.

## Limits

Everything is synthesized in the browser (Web Audio); nothing is sampled. Enhanced can move further from the handheld (real-instrument-like voices, more parts) or back toward it, a knob at a time. MIDI export is planned so a track can move into a DAW or to a human composer later.

## Checks

`node music/tools/render-check.js` renders every sketch in both finishes offline in headless Chromium and fails on clipping (peak above -1 dBFS), a tail that doesn't decay, or bad samples. Run with `NODE_PATH=$(npm root -g)` if Playwright is installed globally. Add `--wav <dir>` to save WAVs.

Last run (v0.3, 4-bar sketches). Loudness target -14.5 dBFS RMS, set with per-element trims in `palette.js` (`trimHD` for Enhanced, `trim` for Classic chip). Fire and Lightning sit about 1 dB lower in Enhanced because the bus compressor holds their drum peaks down.

| Sketch | Length | Enhanced peak / RMS | Classic chip peak / RMS |
|---|---|---|---|
| Main theme | 8.0 s | -3.0 / -14.2 dBFS | -2.2 / -14.4 dBFS |
| Fire | 6.3 s | -1.4 / -15.9 dBFS | -1.6 / -14.5 dBFS |
| Water | 10.0 s | -4.7 / -14.0 dBFS | -6.2 / -14.5 dBFS |
| Earth | 9.6 s | -3.3 / -14.2 dBFS | -3.4 / -14.5 dBFS |
| Wind | 7.3 s | -2.7 / -14.4 dBFS | -2.5 / -14.5 dBFS |
| Lightning | 5.7 s | -1.9 / -15.5 dBFS | -1.3 / -14.5 dBFS |

A spectrum check on the renders confirms the opening lead pitches (main D4 at 294 Hz, Earth A3 at 220 Hz, Fire E4 over its E3 bass).
