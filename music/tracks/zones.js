/* Elementals Unbound - backing music for each zone of the game.
   Zones follow Story's draft bible (story/bible.md, PR #6): the Hearthvale with Brindle Ford, the five nations'
   seats, the war-torn confluence borderlands, the vaults, and camp. Names and moods are placeholders until Story
   confirms them; the tunes are original. Each nation's music uses its home element's sound in a new key. */
(function (g) {
  const T = (g.EU_TRACKS = g.EU_TRACKS || []);
  const Z = (t) => T.push(Object.assign({ group: "zone" }, t));

  Z({ id: "brindle-ford", name: "Brindle Ford", sound: "main", tonic: "G3", mode: "ionian", bpm: 104,
    desc: "Home: the river town where Wren starts. Warm and unhurried; the motif turns up gently in the second half.",
    p2: { style: "counter", duty: .25, env: { vol: 7, dir: -1, step: 8 } }, bass: { style: "walk", wave: "tri" }, drums: "k...h...k.h.h...",
    sections: {
      A: { mel: "3:1 2:.5 1:.5 2:1 5:1 | 3:1.5 4:.5 3:1 2:1 | 1:1 2:.5 3:.5 4:1 6:1 | 5:3 r:1 | 3:1 2:.5 1:.5 2:1 5:1 | 6:1.5 5:.5 4:1 3:1 | 2:1 3:.5 4:.5 3:1 2:1 | 1:3 r:1",
           chords: "1 1 4 5 1 6 5 1" },
      B: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 8:1 7:.5 6:.5 5:1 3:1 | 4:2 2:2 | 1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:1 9:1 | 10:1 9:.5 8:.5 7:1 9:1 | 8:3 r:1",
           chords: "1 4 6 2 1 4 5 1" },
    } });

  Z({ id: "hearthvale-roads", name: "Hearthvale Roads", sound: "main", tonic: "D3", mode: "mixolydian", bpm: 138,
    desc: "The overworld: river farmland, market roads, tall grass. Bouncy and open, built on the motif's first bar.",
    bass: { style: "octave", wave: "tri" }, drums: "k.h.s.h.k.k.s.h.",
    sections: {
      A: { mel: "1:.5 1:.5 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:1.5 7:.5 | 8:1 7:.5 6:.5 5:1 6:1 | 7:2 5:2 | 1:.5 1:.5 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:1 9:1 | 10:.5 9:.5 8:.5 7:.5 8:1 5:1 | 8:3 r:1",
           chords: "1 4 6 7 1 4 7 1" },
      B: { mel: "3:2 5:1 8:1 | 7:2 6:1 5:1 | 4:2 6:1 8:1 | 5:4 | 3:2 5:1 8:1 | 9:2 8:1 7:1 | 8:1 7:1 6:1 4:1 | 5:2 7:2",
           chords: "1 7 4 5 1 7 4 5" },
    } });

  Z({ id: "saltmere", name: "Saltmere", sound: "water", tonic: "A3", mode: "dorian", bpm: 150, meter: 3,
    desc: "The Tidewater League's harbour city: a jaunty three-time shanty for docks, barges and deals.",
    p1: { duty: .25, env: { vol: 12, dir: -1, step: 4 }, vib: { delay: .2, rate: 5.5, cents: 14 } },
    p2: { style: "oompah", duty: .5, env: { vol: 6, dir: -1, step: 2 } }, bass: { style: "waltz", wave: "soft" }, drums: "k.h.h.", pad: false,
    sections: {
      A: { mel: "5:1 8:1 8:1 | 8:.5 7:.5 6:1 5:1 | 4:1 6:1 6:1 | 6:.5 5:.5 4:1 3:1 | 5:1 8:1 8:1 | 8:.5 9:.5 10:1 8:1 | 7:1 5:1 2:1 | 1:2 r:1",
           chords: "1 4 4 3 1 1 5 1" },
      B: { mel: "8:1.5 9:.5 10:1 | 9:1 7:1 5:1 | 6:1.5 7:.5 8:1 | 7:3 | 8:1.5 9:.5 10:1 | 9:1 8:1 7:1 | 6:1 4:1 5:1 | 8:2 r:1",
           chords: "3 5 4 7 3 5 4 1" },
    } });

  Z({ id: "deepmoot", name: "Deepmoot", sound: "earth", tonic: "E3", mode: "aeolian", bpm: 84,
    desc: "Holdfast's mountain seat: a slow hymn in stone halls, then a march of the guard.",
    p2: { style: "counter", duty: .5, env: { vol: 7, dir: -1, step: 9 } }, bass: { style: "whole", wave: "hollow" }, drums: "k.......s.......",
    sections: {
      A: { mel: "1:2 3:1 5:1 | 4:2 3:2 | 6:2 5:1 4:1 | 5:4 | 1:2 3:1 5:1 | 8:2 7:1 6:1 | 5:1 4:1 2:1 3:1 | 1:4",
           chords: "1 4 6 3 1 6 7 1" },
      B: { mel: "5:1 5:.5 6:.5 7:2 | 8:1 7:.5 6:.5 5:2 | 4:1 4:.5 5:.5 6:2 | 5:4 | 5:1 5:.5 6:.5 7:2 | 8:1 9:.5 10:.5 8:2 | 7:1 6:1 5:1 2:1 | 1:4",
           chords: "3 6 4 5 3 1 7 1" },
    } });

  Z({ id: "highcourt", name: "Highcourt", sound: "wind", tonic: "Bb3", mode: "lydian", bpm: 120,
    desc: "The Skyreach Principalities' sky-port: elegant and courtly, with a lead that echoes off high walls.",
    sections: {
      A: { mel: "5:1 4:.5 5:.5 6:1 8:1 | 7:1.5 6:.5 5:2 | 4:1 5:.5 6:.5 7:1 9:1 | 8:3 r:1 | 5:1 4:.5 5:.5 6:1 8:1 | 10:1.5 9:.5 8:1 7:1 | 6:1 5:1 4:1 2:1 | 1:3 r:1",
           chords: "1 2 2 1 1 3 2 1" },
      B: { mel: "8:1/3 9:1/3 10:1/3 11:1 10:1 9:1 | 8:2 5:2 | 6:1/3 7:1/3 8:1/3 9:1 8:1 7:1 | 6:2 3:2 | 4:1 5:1 6:1 7:1 | 8:1 9:1 10:2 | 9:1 7:1 6:1 2:1 | 5:4",
           chords: "2 1 6 6 2 1 5 5" },
    } });

  Z({ id: "thunderhold", name: "Thunderhold", sound: "lightning", tonic: "C#3", mode: "phrygian", bpm: 112, zap: false,
    desc: "The Stormcourt of Vol: a chant-like Phrygian line over restless arpeggios. Something is sleeping underneath.",
    bass: { style: "drive", wave: "saw" }, drums: "k...s..kk...s...", pad: true,
    sections: {
      A: { mel: "1:2 2:1 1:1 | 3:2 2:1 1:1 | 4:1 3:1 2:1 3:1 | 1:4 | 5:2 6:1 5:1 | 7:2 6:1 5:1 | 4:1 3:1 2:1 0:1 | 1:4",
           chords: "1 2 4 1 1 7 2 1" },
      B: { mel: "8:.5 8:.5 r:.5 8:.5 9:1 8:1 | 10:.5 10:.5 r:.5 10:.5 9:1 8:1 | 11:.5 11:.5 r:.5 11:.5 12:1 11:1 | 9:4 | 8:1 7:1 6:1 5:1 | 6:1 5:1 4:1 3:1 | 2:2 3:1 2:1 | 1:4",
           chords: "1 6 4 2 6 4 2 1" },
    } });

  Z({ id: "cindergate", name: "Cindergate", sound: "fire", tonic: "D3", mode: "phrygdom", bpm: 116,
    desc: "The Pyrrhen Dominion's seat: an imperial march with a snare that never stops. Vexis's theme grows from it.",
    p2: { style: "stabs", duty: .25, env: { vol: 9, dir: -1, step: 2 } }, bass: { style: "march", wave: "saw" },
    drums: "k.s.k.ssk.s.k.ss", fill: false, pad: true,
    sections: {
      A: { mel: "1:1.5 1:.5 5:1 5:1 | 6:1.5 5:.5 4:1 3:1 | 2:1.5 3:.5 4:1 2:1 | 1:3 r:1 | 1:1.5 1:.5 5:1 8:1 | 7:1.5 6:.5 5:1 4:1 | 3:1 4:1 2:1 0:1 | 1:3 r:1",
           chords: "1 4 2 1 1 7 2 1" },
      B: { mel: "5:1 8:1 8:1.5 7:.5 | 6:1 5:1 6:2 | 5:1 4:1 3:1 2:1 | 1:4 | 5:1 8:1 9:1.5 8:.5 | 10:1 9:1 8:2 | 7:1 6:1 5:1 2:1 | 1:4",
           chords: "1 4 7 1 1 1 7 1" },
    } });

  Z({ id: "borderlands", name: "The Borderlands", sound: "main", tonic: "C3", mode: "aeolian", bpm: 126,
    desc: "Contested confluence ground where the war happens: tense, driven, never at rest.",
    p1: { duty: .25, env: { vol: 12, dir: -1, step: 5 }, vib: { delay: .2, rate: 6, cents: 14 } },
    p2: { style: "arp", div: 8, duty: .125, env: { vol: 7, dir: -1, step: 2 } }, bass: { style: "octave", wave: "saw" },
    drums: "k..k..k.s..k.ks.",
    sections: {
      A: { mel: "1:1 5:1 6:1.5 5:.5 | 4:1 3:1 2:1 1:1 | 6:1 5:1 4:1.5 3:.5 | 2:3 0:1 | 1:1 5:1 6:1.5 5:.5 | 8:1 7:1 6:1 5:1 | 4:1 6:1 5:1 2:1 | 1:4",
           chords: "1 4 6 7 1 6 5 1" },
      B: { mel: "8:.5 8:.5 7:.5 8:.5 9:1 10:1 | 11:2 10:1 9:1 | 8:.5 8:.5 7:.5 8:.5 9:1 10:1 | 12:2 11:1 9:1 | 13:1 12:1 11:1 10:1 | 11:1 10:1 9:1 8:1 | 9:1 7:1 5:1 7:1 | 8:4",
           chords: "1 7 6 5 6 4 5 1" },
    } });

  Z({ id: "vault", name: "The Vaults", sound: "water", tonic: "F#3", mode: "phrygian", bpm: 80,
    desc: "Dungeons where great wilds are sealed: sparse and echoing, with long silences for footsteps.",
    p1: { duty: .5, env: { vol: 10, dir: -1, step: 9 }, vib: { delay: .35, rate: 4.5, cents: 16 } },
    p2: { style: "echo", delay: .75, duty: .25, env: { vol: 5, dir: -1, step: 6 } }, bass: { style: "pedal", wave: "soft" },
    drums: "......h.......h.",
    sections: {
      A: { mel: "1:1 r:1 2:1 1:1 | 5:2 4:1 3:1 | 2:2 r:1 1:1 | 0:4 | 1:1 r:1 2:1 1:1 | 6:2 5:1 4:1 | 3:1 2:1 3:1 2:1 | 1:4",
           chords: "1 1 2 7 1 6 2 1" },
      B: { mel: "8:2 7:1 6:1 | 5:3 r:1 | 6:2 5:1 4:1 | 2:3 r:1 | 3:1 4:1 5:1 6:1 | 7:2 6:2 | 2:1 1:1 2:1 0:1 | 1:4",
           chords: "6 1 4 2 6 7 7 1" },
    } });

  Z({ id: "camp", name: "Camp", sound: "water", tonic: "F3", mode: "ionian", bpm: 84, meter: 3,
    desc: "Rest points and camp scenes with the party: a quiet waltz by the fire.",
    p2: { style: "arp", div: 6, duty: .125, env: { vol: 5, dir: -1, step: 3 } }, bass: { style: "waltz", wave: "soft" }, drums: "",
    sections: {
      A: { mel: "3:2 2:1 | 1:1.5 2:.5 3:1 | 4:2 3:1 | 2:3 | 3:2 2:1 | 1:1.5 2:.5 3:1 | 2:1 3:1 2:1 | 1:3",
           chords: "1 6 4 5 1 6 5 1" },
      B: { mel: "5:2 6:1 | 8:2 7:1 | 6:2 5:1 | 5:3 | 5:2 6:1 | 8:1.5 9:.5 8:1 | 7:1 6:1 7:1 | 8:3",
           chords: "1 6 4 5 1 6 5 1" },
    } });
})(typeof window !== "undefined" ? window : globalThis);
