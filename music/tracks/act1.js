/* Elementals Unbound - music for the Act I demo (story/demo/act1.md, PR #12), from Story's request on the board.
   Places, bosses and moments named in the demo script. Brindle Ford (home and Calder Mill) and Millrace Road
   use the existing `brindle-ford` and `hearthvale-roads`; Pell's duel uses `battle-rival`; Brann uses
   `battle-contract`. Seraphine's leitmotif ("The Lantern") is introduced here and will return in her final duel. */
(function (g) {
  const T = (g.EU_TRACKS = g.EU_TRACKS || []), find = (id) => T.find((t) => t.id === id);
  const add = (t) => T.push(Object.assign({ act: 1 }, t));

  // ---- scenes and characters ----
  add({ id: "seraphine", name: "Seraphine (The Lantern)", group: "scene", sound: "water", tonic: "E3", mode: "lydian", bpm: 76,
    desc: "Seraphine's leitmotif: meant to be the most comforting music in the game, luminous and kind in cold green-gold light. Only the first half's ending, held a beat too carefully on the raised fourth, hints at anything. Her final duel turns it to harmonic minor.",
    p1: { duty: .5, env: { vol: 12, dir: -1, step: 10 }, vib: { delay: .3, rate: 5, cents: 20 } },
    p2: { style: "arp", div: 12, duty: .125, env: { vol: 5, dir: -1, step: 3 } }, bass: { style: "pedal", wave: "soft" }, drums: "", pad: true,
    sections: {
      A: { mel: "5:1.5 8:.5 7:2 | 6:1 5:1 3:2 | 4:1.5 5:.5 6:1 9:1 | 8:4 | 5:1.5 8:.5 7:2 | 6:1 5:1 10:2 | 9:1.5 8:.5 4:2 | 5:4",
           chords: "1 6 2 1 1 6 2 5" },
      B: { mode: "ionian", mel: "5:1.5 8:.5 7:2 | 6:1 5:1 3:2 | 4:1.5 5:.5 6:1 9:1 | 7:4 | 5:1.5 8:.5 7:2 | 6:1 5:1 10:2 | 9:1.5 8:.5 7:2 | 8:4",
           chords: "1 6 4 5 1 6 5 1" },
    } });

  add({ id: "cold-open", name: "The Ford Burning", group: "scene", sound: "fire", tonic: "C3", mode: "harmonic", bpm: 96,
    desc: "The cold open: the Ford on fire and a crowned Fire wild, then Seraphine walking out of the smoke as her motif enters in Lydian.",
    p1: { duty: .25, env: { vol: 12, dir: -1, step: 8 }, vib: { delay: .25, rate: 5, cents: 16 } },
    p2: { style: "counter", duty: .25, env: { vol: 7, dir: -1, step: 8 } }, bass: { style: "drive", wave: "saw" },
    drums: "k..k..k.k.......", fill: false, pad: true, drumsHD: .8,
    sections: {
      A: { mel: "1:2 2:1 3:1 | 2:2 1:1 0:1 | 6:2 5:2 | 0:4 | 1:2 3:1 5:1 | 6:2 7:1 8:1 | 7:2 5:2 | 5:4",
           chords: "1 5 6 5 1 4 5 5" },
      B: { mode: "lydian", mel: "5:1.5 8:.5 7:2 | 6:1 5:1 3:2 | 4:1.5 5:.5 6:1 9:1 | 8:4", chords: "1 6 2 1" },
    } });

  add({ id: "homecoming", name: "Homecoming at Dusk", group: "scene", sound: "water", tonic: "G3", mode: "ionian", bpm: 84,
    desc: "The end of Act I: Brindle Ford's tune slowed for evening, no drums, then the motif climbing home.",
    p1: { duty: .5, env: { vol: 11, dir: -1, step: 10 }, vib: { delay: .3, rate: 5, cents: 18 } },
    p2: { style: "counter", duty: .25, env: { vol: 6, dir: -1, step: 10 } }, bass: { style: "pedal", wave: "soft" }, drums: "", pad: true,
    sections: {
      A: { mel: find("brindle-ford").sections.A.mel, chords: find("brindle-ford").sections.A.chords },
      B: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 7:1 6:1 5:1 3:1 | 4:2 2:2 | 3:1 2:.5 1:.5 2:1 5:1 | 6:1.5 5:.5 4:1 3:1 | 2:2 0:2 | 1:4",
           chords: "1 4 6 2 1 6 5 1" },
    } });

  // ---- places ----
  add({ id: "branch-hall", name: "Branch Hall", group: "zone", sound: "main", tonic: "F3", mode: "mixolydian", bpm: 126,
    desc: "The Covenant branch halls: notice boards, chatter, contracts changing hands. Busy and friendly.",
    p2: { style: "stabs", duty: .25, env: { vol: 8, dir: -1, step: 2 } }, bass: { style: "walk", wave: "tri" }, drums: "k.hhs.h.k.hhs.hh", pad: false,
    sections: {
      A: { mel: "5:.5 5:.5 6:.5 5:.5 3:1 1:1 | 2:.5 3:.5 4:.5 5:.5 6:1 5:1 | 7:.5 7:.5 8:.5 7:.5 5:1 4:1 | 3:2 r:1 5:1 | 5:.5 5:.5 6:.5 5:.5 3:1 1:1 | 2:.5 3:.5 4:.5 5:.5 6:1 8:1 | 7:1 6:.5 5:.5 4:1 2:1 | 1:3 r:1",
           chords: "1 2 7 1 1 4 7 1" },
      B: { mel: "8:1 r:.5 8:.5 7:.5 6:.5 5:1 | 4:1 r:.5 4:.5 3:.5 2:.5 1:1 | 6:1 r:.5 6:.5 5:.5 4:.5 3:1 | 2:2 5:2 | 8:1 r:.5 8:.5 7:.5 6:.5 5:1 | 4:1 r:.5 4:.5 5:.5 6:.5 7:1 | 8:1 7:1 5:1 2:1 | 1:3 r:1",
           chords: "1 4 6 5 1 7 5 1" },
    } });

  add({ id: "hollins-cross", name: "Hollin's Cross", group: "zone", sound: "main", tonic: "Bb2", mode: "ionian", bpm: 132,
    desc: "The cider-market town: a skipping dotted tune over bouncing bass and triplet arpeggios, crowds everywhere.",
    p2: { style: "arp", div: 12, duty: .125, env: { vol: 6, dir: -1, step: 2 } }, bass: { style: "octave", wave: "tri" }, drums: "k.h.s.hhk.h.s.h.", pad: false,
    sections: {
      A: { mel: "1:.75 2:.25 3:.75 4:.25 5:1 3:1 | 4:.75 5:.25 6:.75 5:.25 4:1 2:1 | 3:.75 4:.25 5:.75 6:.25 7:1 5:1 | 8:2 5:2 | 1:.75 2:.25 3:.75 4:.25 5:1 3:1 | 6:.75 7:.25 8:.75 6:.25 5:1 4:1 | 3:1 2:.5 3:.5 4:1 2:1 | 1:3 r:1",
           chords: "1 4 5 1 1 6 5 1" },
      B: { mel: "5:.5 8:.5 8:.5 7:.5 8:1 5:1 | 6:.5 9:.5 9:.5 8:.5 9:1 6:1 | 7:.5 10:.5 10:.5 9:.5 10:1 7:1 | 8:2 r:1 5:1 | 5:.5 8:.5 8:.5 7:.5 8:1 5:1 | 6:1 7:.5 8:.5 9:1 10:1 | 9:1 8:.5 7:.5 6:1 7:1 | 8:3 r:1",
           chords: "1 2 3 4 1 6 5 1" },
    } });

  add({ id: "greyapple-orchard", name: "Greyapple Orchard", group: "zone", sound: "fire", tonic: "B2", mode: "phrygdom", bpm: 92,
    desc: "Scorched trees and a hum underground: a pastoral tune gone uneasy, then low repeated notes like something stirring below.",
    p1: { duty: .5, env: { vol: 12, dir: -1, step: 9 }, vib: { delay: .3, rate: 5, cents: 14 } },
    p2: { style: "counter", duty: .25, env: { vol: 6, dir: -1, step: 9 } }, bass: { style: "whole", wave: "hollow" },
    drums: "k.......k.....h.", fill: false, pad: true, drumsHD: 1,
    sections: {
      A: { mel: "5:2 4:1 3:1 | 2:2 1:2 | 3:1 4:1 5:1 6:1 | 5:4 | 5:2 6:1 5:1 | 8:2 7:1 6:1 | 5:1 4:1 2:1 3:1 | 1:4",
           chords: "1 2 6 1 1 4 2 1" },
      B: { mel: "1:.5 1:.5 r:1 1:.5 1:.5 r:1 | 2:.5 2:.5 r:1 2:.5 2:.5 r:1 | 3:.5 3:.5 r:1 4:.5 4:.5 r:1 | 2:4 | 8:2 7:2 | 6:2 5:2 | 4:2 2:2 | 1:4",
           chords: "1 2 4 2 1 6 2 1" },
    } });

  add({ id: "weir-vault", name: "The Weir Vault", group: "zone", sound: "water", tonic: "D3", mode: "dorian", bpm: 72,
    desc: "Edda Calder's vault under the weir: eerie, sealed, old and patient water. Long notes echo a full beat behind; drips for drums.",
    p1: { duty: .5, env: { vol: 11, dir: -1, step: 11 }, vib: { delay: .4, rate: 4.5, cents: 20 } },
    p2: { style: "echo", delay: 1, duty: .25, env: { vol: 5, dir: -1, step: 8 } }, bass: { style: "pedal", wave: "soft" },
    drums: "......h....h....", pad: true,
    sections: {
      A: { mel: "5:3 4:1 | 3:2 4:1 5:1 | 6:3 5:1 | 5:4 | 5:3 4:1 | 3:2 2:1 1:1 | 2:2 0:2 | 1:4",
           chords: "1 3 4 5 1 3 7 1" },
      B: { mel: "8:2 6:2 | 7:2 5:2 | 6:1 5:1 4:1 3:1 | 2:4 | 8:2 9:2 | 10:2 8:2 | 7:2 6:1 5:1 | 5:4",
           chords: "4 5 4 2 1 1 7 5" },
    } });

  // ---- bosses ----
  const boss = (t) => add(Object.assign({ group: "battle", layered: true }, t));
  boss({ id: "battle-gullet", name: "Gullet, the Millrace Lurker", sound: "water", tonic: "E3", mode: "dorian", bpm: 152,
    desc: "The first boss: a comic-scary eel in the sluice. Creeping chromatic steps over an oom-pah, then big lunging leaps.",
    p1: { duty: .25, env: { vol: 13, dir: -1, step: 3 }, vib: { delay: .2, rate: 6, cents: 12 } },
    p2: { style: "oompah", duty: .5, env: { vol: 7, dir: -1, step: 2 } }, bass: { style: "octave", wave: "hollow" },
    drums: "k...s.k.k...s...", drums2: "..h...h...h...h.", pad: false,
    sections: {
      A: { mel: "1:.5 r:.5 1:.5 2b:.5 1:.5 r:.5 5:1 | 1:.5 r:.5 1:.5 2b:.5 1:.5 r:.5 6b:1 | 3:.5 r:.5 3:.5 4b:.5 3:.5 r:.5 7:1 | 5:.5 4#:.5 4:.5 3:.5 2:1 r:1 | 1:.5 r:.5 1:.5 2b:.5 1:.5 r:.5 5:1 | 1:.5 r:.5 1:.5 2b:.5 1:.5 r:.5 6b:1 | 4:.5 r:.5 4:.5 5b:.5 4:.5 r:.5 8:1 | 7:.5 6:.5 5:.5 4:.5 1:1 r:1",
           chords: "1 1 3 5 1 1 4 1" },
      B: { mel: "1:1 8:1 7:.5 6:.5 5:1 | 4:1 8:1 7:.5 6:.5 5:1 | 3:1 8:1 7:.5 6:.5 5:1 | 2:2 5:2 | 1:1 8:1 7:.5 6:.5 5:1 | 6:1 9:1 8:.5 7:.5 6:1 | 5:1 4:1 2:1 0:1 | 1:2 r:1 1:1",
           chords: "1 4 3 5 1 2 5 1" },
    } });

  boss({ id: "battle-cinder-mother", name: "The Cinder Mother", sound: "fire", tonic: "G2", mode: "phrygdom", bpm: 146,
    desc: "The rift-boss in the orchard: kiln heat, a drone that never lets up, quick spurts for her Ember brood.",
    p2: { style: "arp", div: 16, duty: .125, env: { vol: 6, dir: -1, step: 1 } }, bass: { style: "drive", wave: "saw" },
    drums: "k.k.s.k.kk..s.s.", drums2: "h.hhh.hhh.hhh.hh", pad: true, fill: true,
    sections: {
      A: { mel: "1:1 2:1 3:1 2:1 | 1:1 2:1 3:1 5:1 | 6:1 5:1 4:1 3:1 | 2:2 1:2 | 5:1 6:1 7:1 6:1 | 5:1 6:1 8:1 9:1 | 10:1 9:1 8:1 7:1 | 8:4",
           chords: "1 1 4 2 6 1 5 1" },
      B: { mel: "8:.5 8:.5 9:.5 8:.5 6:1 5:1 | 6:.5 6:.5 7:.5 6:.5 4:1 3:1 | 4:.5 4:.5 5:.5 4:.5 2:1 1:1 | 0:2 1:2 | 8:.5 8:.5 9:.5 8:.5 6:1 5:1 | 9:1 10:1 11:1 9:1 | 8:1 7:1 6:1 2:1 | 1:4",
           chords: "6 4 2 7 6 2 5 1" },
    } });

  boss({ id: "battle-sluicewarden", name: "The Sluicewarden", sound: "earth", tonic: "F2", mode: "aeolian", bpm: 124,
    desc: "Edda's stone-and-water golem: heavy steps over running-water arpeggios, then a noble tune for a family guardian. Two phases: raise intensity when it rebuilds.",
    p2: { style: "arp", div: 12, duty: .25, env: { vol: 6, dir: -1, step: 2 } }, bass: { style: "march", wave: "hollow" },
    drums: "k.....k.s...k...", drums2: "...h..h....h..h.", pad: true,
    sections: {
      A: { mel: "1:1 1:1 5:1 5:1 | 6:1 5:1 4:2 | 3:1 3:1 7:1 7:1 | 8:2 7:1 5:1 | 1:1 1:1 5:1 5:1 | 6:1 5:1 4:1 6:1 | 5:1 4:1 2:1 0:1 | 1:4",
           chords: "1 4 3 5 1 4 7 1" },
      B: { mel: "3:2 5:1 8:1 | 7:2 6:1 5:1 | 6:2 8:1 10:1 | 9:4 | 10:2 9:1 8:1 | 7:2 8:1 9:1 | 8:1 7:1 5:1 7:1 | 8:4",
           chords: "3 7 6 7 6 7 5 1" },
    } });

  // ---- stingers ----
  const sting = (t) => add(Object.assign({ group: "stinger", once: true, pad: false, drums: "", drums2: "" }, t));
  sting({ id: "sting-exalted", name: "An Exalted Arrives", sound: "wind", tonic: "Bb2", mode: "lydian", bpm: 152,
    desc: "Aeris Calloway's sky-skiff lands in Hollin's Cross: a brief, dazzling run to the top.",
    p2: { style: "echo", delay: .25, duty: .125, env: { vol: 7, dir: -1, step: 4 } },
    sections: { A: { mel: "1:1/3 3:1/3 5:1/3 8:1/3 10:1/3 12:1/3 15:2 | 13:1/3 14:1/3 13:1/3 15:3", chords: "1 1" } } });
  sting({ id: "sting-pyrrhen", name: "The Pyrrhen Column", sound: "fire", tonic: "D2", mode: "phrygdom", bpm: 108,
    desc: "Captain Davor's soldiers at every well: polite menace, a low line over a marching snare.",
    p2: { style: "counter", duty: .25, env: { vol: 7, dir: -1, step: 8 } }, drums: "k.s.k.ssk.s.k.ss",
    sections: { A: { mel: "1:1 1:.5 1:.5 2:1 1:1 | 0:1.5 0:.5 1:2", chords: "1 7" } } });
  sting({ id: "sting-slackwater", name: "Slackwater, the Weir Serpent", sound: "water", tonic: "G2", mode: "dorian", bpm: 88,
    desc: "The demo's great find: the motif rises in Water's mode over rippling arpeggios and keeps climbing past the octave.",
    p2: { style: "arp", div: 12, duty: .125, env: { vol: 6, dir: -1, step: 2 } }, pad: true,
    sections: { A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 9:1 10:1 12:2 | 15:4", chords: "1 4 5 1" } } });
})(typeof window !== "undefined" ? window : globalThis);
