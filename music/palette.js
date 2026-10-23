/* Elementals Unbound - sound palette as data. Mirrors music/palette.md; the synth (music/synth.js) plays it.
   Scales are semitone offsets from the tonic; motif degrees are 1-based scale steps (8 = octave). */
(function (g) {
  const MODES = {
    dorian:     [0, 2, 3, 5, 7, 9, 10],
    aeolian:    [0, 2, 3, 5, 7, 8, 10],
    phrygdom:   [0, 1, 4, 5, 7, 8, 10],  // Phrygian dominant
    lydian:     [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
  };

  // The main motif ("Unbound"): open fifth, a step down and back, then a leap to the octave.
  // [degree, beats]; 8 beats = two bars of 4/4. Every track can quote it in its own mode.
  const MOTIF = [[1, 1], [5, 1], [4, .5], [3, .5], [4, 1], [5, .5], [6, .5], [5, 1], [8, 2]];

  // Chord root per bar (scale degree) under the motif played twice: i - iv - III - i in minor modes.
  const CHORDS = [1, 4, 3, 1];

  // Retro handheld-RPG style (designer, 2026-10-23: "retro in the style of Pokemon", then "a little less retro":
  // same vibe, not so much like it's coming out of the handheld). Arranged for four channels per element:
  // p1 = lead (the motif), p2 = harmony part, bass = wave channel, drums = noise channel (one 16- or 12-step bar).
  // duty: pulse width. env: volume {vol 0-15, dir -1 fade / 0 hold, step in 1/64 s}. vib: delayed vibrato.
  // pad: a soft chord pad under the four channels (enhanced finish only). trim / trimHD: loudness trims in dB
  // for the chip and enhanced finishes. drumsHD: drum level in the enhanced finish (default 1).
  const PALETTE = {
    main: {
      name: "Main theme", trimHD: -0.8, trim: -0.8, tonic: "D3", mode: "dorian", bpm: 120,
      p1: { duty: .5, env: { vol: 12, dir: -1, step: 6 }, vib: { delay: .18, rate: 6, cents: 18 } },
      p2: { style: "third", duty: .25, env: { vol: 8, dir: -1, step: 5 } },
      pad: true,
      bass: { style: "octave", wave: "tri" },
      drums: "k.h.s.h.k.k.s.h.",
    },
    fire: {
      name: "Fire", trimHD: 4.2, drumsHD: .65, trim: 1.7, tonic: "E3", mode: "phrygdom", bpm: 152,
      p1: { duty: .25, env: { vol: 13, dir: -1, step: 4 }, vib: { delay: .15, rate: 7, cents: 12 } },
      p2: { style: "stabs", duty: .125, env: { vol: 10, dir: -1, step: 1 } },
      bass: { style: "octave", wave: "saw" },
      drums: "k.h.s.k.h.k.s.hh", fill: true,
    },
    water: {
      name: "Water", trimHD: -2.2, trim: -1.1, tonic: "G3", mode: "dorian", bpm: 96,
      p1: { duty: .5, env: { vol: 11, dir: -1, step: 8 }, vib: { delay: .25, rate: 5, cents: 22 } },
      p2: { style: "arp", div: 12, duty: .125, env: { vol: 6, dir: -1, step: 2 } },
      pad: true,
      bass: { style: "pedal", wave: "soft" },
      drums: "..h..h..h..h",
    },
    earth: {
      name: "Earth", trimHD: -0.9, trim: -1.4, tonic: "A2", mode: "aeolian", bpm: 100,
      p1: { duty: .5, env: { vol: 14, dir: -1, step: 7 }, vib: { delay: .3, rate: 4.5, cents: 10 } },
      p2: { style: "third", duty: .5, env: { vol: 8, dir: -1, step: 6 } },
      pad: true,
      bass: { style: "whole", wave: "hollow" },
      drums: "k.....k.s.......",
    },
    wind: {
      name: "Wind", trimHD: -0.2, trim: 1.2, tonic: "F3", mode: "lydian", bpm: 132,
      p1: { duty: .125, env: { vol: 12, dir: -1, step: 7 }, vib: { delay: .12, rate: 6.5, cents: 25 } },
      p2: { style: "echo", delay: .5, duty: .125, env: { vol: 7, dir: -1, step: 5 } },
      pad: true,
      bass: { style: "walk", wave: "tri" },
      drums: "k.hh.hk.hh.h",
    },
    lightning: {
      name: "Lightning", trimHD: 5.2, drumsHD: .7, trim: 2.0, tonic: "B2", mode: "mixolydian", bpm: 168,
      p1: { duty: .25, env: { vol: 13, dir: -1, step: 3 }, vib: { delay: .2, rate: 8, cents: 15 } },
      p2: { style: "arp", div: 16, duty: .125, env: { vol: 7, dir: -1, step: 1 } }, zap: true,
      bass: { style: "octave", wave: "saw" },
      drums: "k.hhs.hhk.hhs.hz",
    },
  };

  g.EU_PALETTE = { MODES, MOTIF, CHORDS, PALETTE };
})(typeof window !== "undefined" ? window : globalThis);
