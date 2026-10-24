/* Elementals Unbound - the main theme and the five element themes.
   Each theme is 16 bars: A opens with the "Unbound" motif in the element's mode, B is the element's own tune.
   The dual and triple themes (confluences.js) are braided from these phrases, so keep bar counts at 8 + 8.
   Melody: degree:beats tokens, bars split by "|"; chords: one scale-degree root per bar. Format: tracks/README.md. */
(function (g) {
  const T = (g.EU_TRACKS = g.EU_TRACKS || []);

  T.push({
    id: "main", name: "Elementals Unbound", group: "element", layered: true, sound: "main",
    desc: "The title theme. The motif climbs to its octave twice, then a hopeful bridge.",
    sections: {
      A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 7:1 6:.5 5:.5 4:1 5:1 | 3:3 r:1 | 1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 8:1 9:2 | 10:1 9:.5 8:.5 7:1 9:1 | 8:4",
           chords: "1 4 7 3 1 4 7 1" },
      B: { mel: "3:1.5 4:.5 5:1 3:1 | 4:1.5 5:.5 6:2 | 5:1.5 6:.5 7:1 5:1 | 8:3 r:1 | 6:1 5:1 4:1 3:1 | 4:1 3:1 2:2 | 3:1 4:1 5:1 7:1 | 5:4",
           chords: "3 4 5 4 4 7 3 5" },
    },
  });

  T.push({
    id: "fire", name: "Fire", group: "element", layered: true, sound: "fire",
    desc: "Phrygian dominant at a run: off-beat stabs, saw bass in octaves, a snare roll back into the loop.",
    sections: {
      A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 8:.5 7:.5 6:.5 5:.5 6:1 2:1 | 3:1.5 2:.5 1:2 | 5:.5 5:.5 6:.5 5:.5 3:1 1:1 | 2:.5 3:.5 4:.5 3:.5 2:1 1:1 | 6:.5 5:.5 4:.5 3:.5 2:1 0:1 | 1:3 r:1",
           chords: "1 4 2 1 1 2 7 1" },
      B: { mel: "8:.5 8:.5 r:.5 8:.5 9:1 8:1 | 7:.5 6:.5 7:.5 8:.5 6:2 | 5:.5 5:.5 r:.5 5:.5 6:1 5:1 | 4:.5 3:.5 4:.5 5:.5 2:2 | 1:.5 2:.5 3:.5 4:.5 5:.5 6:.5 7:.5 8:.5 | 9:1 8:1 6:1 5:1 | 6:.5 5:.5 3:.5 2:.5 3:1 2:.5 0:.5 | 1:2 5:1 8:1",
           chords: "1 6 5 2 1 6 2 1" },
    },
  });

  T.push({
    id: "water", name: "Water", group: "element", layered: true, sound: "water",
    desc: "Dorian, slow and patient: a long-breathed tune over rippling triplet arpeggios.",
    sections: {
      A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 7:1.5 6:.5 5:1 4:1 | 3:3 r:1 | 3:1 4:.5 5:.5 6:2 | 5:1 4:.5 3:.5 2:2 | 3:1 2:.5 1:.5 0:1 2:1 | 1:4",
           chords: "1 4 3 1 4 7 5 1" },
      B: { mel: "8:2 9:1 10:1 | 9:3 r:1 | 6:2 7:1 8:1 | 7:2 5:2 | 4:1.5 5:.5 6:1 8:1 | 7:1 6:1 5:2 | 4:1 3:1 2:1 5:1 | 1:4",
           chords: "1 7 4 5 4 5 7 1" },
    },
  });

  T.push({
    id: "earth", name: "Earth", group: "element", layered: true, sound: "earth",
    desc: "Low natural minor: a heavy, hymn-like tune and a stamping march.",
    sections: {
      A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 6:2 5:1 4:1 | 5:4 | 3:1 3:.5 4:.5 5:2 | 4:1 4:.5 3:.5 2:2 | 3:1 2:1 0:1 2:1 | 1:4",
           chords: "1 4 6 3 3 7 5 1" },
      B: { mel: "1:.5 1:.5 1:1 3:1 1:1 | 4:.5 4:.5 4:1 6:1 4:1 | 5:.5 5:.5 5:1 7:1 5:1 | 8:2 7:1 6:1 | 5:2 4:1 3:1 | 4:2 3:1 2:1 | 3:1 4:1 2:1 0:1 | 1:2 r:2",
           chords: "1 4 5 6 3 7 5 1" },
    },
  });

  T.push({
    id: "wind", name: "Wind", group: "element", layered: true, sound: "wind",
    desc: "Lydian and airborne: triplet turns, an echoing lead, a tune that soars and never quite lands.",
    sections: {
      A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 8:1/3 9:1/3 8:1/3 7:1 6:1/3 7:1/3 6:1/3 5:1 | 4:2 5:2 | 3:1 4:.5 5:.5 6:1 5:1 | 8:1.5 7:.5 6:2 | 5:1/3 6:1/3 5:1/3 4:1 3:1 2:1 | 1:3 r:1",
           chords: "1 6 5 2 1 6 2 1" },
      B: { mel: "5:1 8:1 9:2 | 10:1 9:.5 8:.5 9:2 | 6:1 9:1 11:2 | 10:4 | 8:1 7:1 6:1 5:1 | 6:1/3 5:1/3 4:1/3 5:1 2:2 | 3:1 4:1 5:1 7:1 | 8:4",
           chords: "1 3 2 6 1 2 3 1" },
    },
  });

  T.push({
    id: "lightning", name: "Lightning", group: "element", layered: true, sound: "lightning",
    desc: "Mixolydian and twitchy: syncopated bursts, 16th-note arpeggios, a tritone zap closing every bar.",
    sections: {
      A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 7:.5 8:.5 r:.5 7:.5 5:1 7:1 | 8:.5 7:.5 5:.5 4:.5 5:2 | 1:.5 1:.5 r:.5 3:.5 5:.5 r:.5 7:1 | 8:.5 7:.5 5:.5 3:.5 4:2 | 3:.5 4:.5 5:.5 3:.5 2:1 0:1 | 1:2 5:.5 r:1.5",
           chords: "1 4 7 1 1 4 7 1" },
      B: { mel: "5:.5 5:.5 r:.5 5:.5 r:.5 6:.5 7:1 | 8:.5 8:.5 r:.5 8:.5 r:.5 9:.5 10:1 | 11:1 10:.5 9:.5 8:1 7:1 | 8:3 r:1 | 4:.5 5:.5 4:.5 3:.5 4:.5 5:.5 6:.5 7:.5 | 8:1 7:1 6:1 5:1 | 4:.5 r:.5 4:.5 5:.5 6:1 7:1 | 8:2 r:1 7:1",
           chords: "5 1 4 1 4 6 7 1" },
    },
  });
})(typeof window !== "undefined" ? window : globalThis);
