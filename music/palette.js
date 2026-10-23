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

  const PALETTE = {
    main: {
      name: "Main theme", tonic: "D3", mode: "dorian", bpm: 104,
      lead: "brass", bass: "bassSine", comp: "pad", bassStyle: "half",
      drums: { steps: 16, k: "x.......x.......", s: "....x.......x...", h: "..x...x...x...x." },
      fx: { delay: .22 },
    },
    fire: {
      name: "Fire", trim: 0.4, tonic: "E3", mode: "phrygdom", bpm: 144,
      lead: "saw", bass: "bassSaw", comp: "power8", bassStyle: "eighths",
      drums: { steps: 16, k: "x..x..x.x..x..x.", s: "....x.......x...", h: "x.x.x.x.x.x.x.x.", t: "" },
      fx: { fill: true },
    },
    water: {
      name: "Water", trim: -1.2, tonic: "G3", mode: "dorian", bpm: 84,
      lead: "bell", bass: "bassSine", comp: "arp3", bassStyle: "half",
      drums: { steps: 12, h: "..x..x..x..x" },
      fx: { delay: .38 },
    },
    earth: {
      name: "Earth", tonic: "A2", mode: "aeolian", bpm: 88,
      lead: "square", bass: "bassSquare", comp: "drone", bassStyle: "whole",
      drums: { steps: 16, k: "x.........x.....", t: "........x.....x." },
      fx: {},
    },
    wind: {
      name: "Wind", trim: -2.2, tonic: "F3", mode: "lydian", bpm: 116,
      lead: "flute", bass: "bassSine", comp: "arp3", bassStyle: "half",
      drums: { steps: 12, h: "x.xx.xx.xx.x" },
      fx: { swell: true, delay: .25 },
    },
    lightning: {
      name: "Lightning", trim: 0.6, tonic: "B2", mode: "mixolydian", bpm: 168,
      lead: "pulse", bass: "bassSquare", comp: "arp16", bassStyle: "eighths",
      drums: { steps: 16, k: "x.....x...x.....", s: "....x.......x..x", h: "xxxxxxxxxxxxxxxx" },
      fx: { stab: true },
    },
  };

  g.EU_PALETTE = { MODES, MOTIF, CHORDS, PALETTE };
})(typeof window !== "undefined" ? window : globalThis);
