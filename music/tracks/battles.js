/* Elementals Unbound - battle music and stingers.
   Battles are layered (Music.setIntensity 0..1): low intensity = drums, bass and pad; middle adds the harmony;
   high adds the lead and extra percussion. The game can raise intensity as a duel heats up (life dropping, a
   boss changing phase). The important battles follow Story's draft bible (PR #6); names are placeholders until
   Story confirms them. Stingers play once (Music.stinger). */
(function (g) {
  const T = (g.EU_TRACKS = g.EU_TRACKS || []);
  const B = (t) => T.push(Object.assign({ group: "battle", layered: true }, t));
  const S = (t) => T.push(Object.assign({ group: "stinger", once: true, pad: false, drums: "", drums2: "" }, t));

  B({ id: "battle-wild", name: "Wild Duel", sound: "main", tonic: "A3", mode: "harmonic", bpm: 160,
    desc: "Everyday duels against wilds in the grass. The motif's first bar becomes a riff.",
    p2: { style: "arp", div: 16, duty: .125, env: { vol: 6, dir: -1, step: 1 } }, bass: { style: "octave", wave: "saw" },
    drums: "k.h.s.h.k.k.s.h.", drums2: "..h...h...h...h.", pad: false,
    sections: {
      A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 r:.5 5:.5 6:.5 5:1 7:1 | 1:1 5:1 4:.5 3:.5 4:1 | 3:.5 2:.5 1:.5 2:.5 0:2 | 8:1 7:.5 8:.5 9:1 10:1 | 11:1 10:.5 9:.5 10:1 8:1 | 9:1 8:.5 7:.5 6:1 5:1 | 5:.5 6:.5 7:.5 5:.5 8:2",
           chords: "1 5 4 5 1 4 5 1" },
      B: { mel: "3:1.5 4:.5 5:2 | 6:1.5 5:.5 4:2 | 5:1.5 6:.5 7:2 | 8:4 | 3:1.5 4:.5 5:2 | 6:1.5 7:.5 8:2 | 9:1 8:1 7:1 6:1 | 7:2 5:2",
           chords: "6 4 5 1 6 4 5 5" },
    } });

  B({ id: "battle-contract", name: "Contract Duel", sound: "main", tonic: "D3", mode: "dorian", bpm: 168,
    desc: "Duels against other binders and contract targets: quick runs, then the motif played as a call to arms.",
    p2: { style: "stabs", duty: .25, env: { vol: 9, dir: -1, step: 2 } }, drums: "k.hhs.hhk.hhs.hh", drums2: "...h...h..h..h.h", pad: false,
    sections: {
      A: { mel: "1:.5 2:.5 3:.5 5:.5 4:1 3:1 | 4:.5 5:.5 6:.5 8:.5 7:1 5:1 | 3:.5 4:.5 5:.5 7:.5 6:1 4:1 | 5:3 r:1 | 1:.5 2:.5 3:.5 5:.5 4:1 3:1 | 4:.5 5:.5 6:.5 8:.5 9:1 10:1 | 9:1 8:.5 7:.5 6:1 5:1 | 8:3 r:1",
           chords: "1 4 7 5 1 4 7 1" },
      B: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 7:1 8:.5 7:.5 6:1 5:1 | 4:2 5:2 | 1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 8:1 9:2 | 10:1 9:1 8:1 7:1 | 8:4",
           chords: "1 4 7 5 1 4 3 1" },
    } });

  B({ id: "battle-rival", name: "Rival: Pell Varrane", sound: "fire", tonic: "E3", mode: "phrygdom", bpm: 172,
    desc: "Wren's cocky Fire rival from Act I. Syncopated swagger, then he shows off the Fire theme's opening.",
    p2: { style: "third", duty: .125, env: { vol: 8, dir: -1, step: 3 } }, drums2: "..h...h...h..hhh",
    sections: {
      A: { mel: "1:.5 1:.5 r:.5 1:.5 2:1 3:1 | 5:.5 4:.5 3:.5 2:.5 1:2 | 4:.5 4:.5 r:.5 4:.5 5:1 6:1 | 8:.5 7:.5 6:.5 5:.5 2:2 | 1:.5 1:.5 r:.5 1:.5 2:1 3:1 | 5:.5 6:.5 8:1 9:2 | 8:.5 7:.5 6:.5 5:.5 6:1 2:1 | 1:2 r:2",
           chords: "1 1 4 2 1 6 2 1" },
      B: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 8:.5 7:.5 6:.5 5:.5 6:1 2:1 | 3:1.5 2:.5 1:2 | 1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 8:1 9:2 | 8:1 7:1 6:1 2:1 | 1:4",
           chords: "1 6 2 1 1 2 2 1" },
    } });

  B({ id: "battle-crowned", name: "Crowned Wild", sound: "main", tonic: "F#3", mode: "harmonic", bpm: 150,
    desc: "Crowned wilds of any element (bosses without a theme of their own): element-neutral, heavy and relentless. Raise intensity at each phase.",
    p1: { duty: .25, env: { vol: 13, dir: -1, step: 6 }, vib: { delay: .2, rate: 6, cents: 14 } },
    p2: { style: "arp", div: 16, duty: .125, env: { vol: 6, dir: -1, step: 1 } }, bass: { style: "drive", wave: "saw" },
    drums: "k.k.s..kk.k.s.s.", drums2: "hhhhhhhhhhhhhhhh",
    sections: {
      A: { mel: "1:2 2:1 3:1 | 2:2 1:1 0:1 | 3:2 4:1 5:1 | 6:2 5:2 | 8:2 7:1 6:1 | 5:2 4:1 3:1 | 2:1 3:1 4:1 0:1 | 1:4",
           chords: "1 5 6 5 6 4 5 1" },
      B: { mel: "1:.5 1:.5 2:.5 1:.5 3:1 1:1 | 4:.5 4:.5 5:.5 4:.5 6:1 4:1 | 5:.5 5:.5 6:.5 5:.5 7:1 5:1 | 8:2 7:2 | 8:1 6:1 7:1 5:1 | 6:1 4:1 5:1 3:1 | 4:1 2:1 3:1 0:1 | 1:4",
           chords: "1 4 5 1 6 4 5 1" },
    } });

  B({ id: "battle-vexis", name: "Vexis, the Pyrelord", sound: "fire", tonic: "C3", mode: "phrygdom", bpm: 140,
    desc: "The Pyrrhen Warlord-Regent. Cindergate's march made personal, then a chromatic fall.",
    p2: { style: "counter", duty: .25, env: { vol: 8, dir: -1, step: 6 } }, bass: { style: "march", wave: "saw" },
    drums: "k.s.k.ssk.s.k.ss", drums2: "....s.......s.s.", fill: false, pad: true,
    sections: {
      A: { mel: "1:1.5 1:.5 5:1 5:1 | 6:1.5 5:.5 4:1 3:1 | 2:1.5 3:.5 4:1 2:1 | 1:3 r:1 | 8:1.5 8:.5 12:1 12:1 | 13:1.5 12:.5 11:1 10:1 | 9:1 10:1 11:1 12:1 | 8:3 r:1",
           chords: "1 4 2 1 1 4 2 1" },
      B: { mel: "8:.5 7:.5 6:.5 5:.5 6:1 5:1 | 5:.5 4:.5 3:.5 2:.5 3:1 2:1 | 4:.5 3:.5 2:.5 1:.5 2:1 1:1 | 0:2 1:2 | 8:.5 7:.5 6:.5 5:.5 6:1 5:1 | 9:1 10:1 11:1 9:1 | 8:1 7:1 6:1 2:1 | 1:4",
           chords: "6 2 1 7 6 2 7 1" },
    } });

  B({ id: "battle-exalted", name: "Duel of the Exalted", sound: "main", tonic: "Bb2", mode: "dorian", bpm: 144,
    desc: "Duels with (or beside) the Seven Exalted. Grand and proud; the motif returns at full height.",
    p2: { style: "counter", duty: .25, env: { vol: 8, dir: -1, step: 7 } }, bass: { style: "walk", wave: "tri" },
    drums: "k.h.s.h.k.h.s.hh", drums2: "...h.h...h.h.h.h",
    sections: {
      A: { mel: "5:1.5 4:.5 5:1 8:1 | 7:1.5 6:.5 5:2 | 4:1.5 3:.5 4:1 6:1 | 5:4 | 5:1.5 4:.5 5:1 8:1 | 10:1.5 9:.5 8:1 7:1 | 6:1 5:1 4:1 2:1 | 1:4",
           chords: "1 7 4 5 1 3 4 1" },
      B: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 8:1 9:.5 10:.5 11:1 12:1 | 12:4 | 1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 8:1 9:2 | 10:1 9:1 8:1 7:1 | 8:4",
           chords: "1 4 3 5 1 4 7 1" },
    } });

  B({ id: "battle-primordial", name: "Primordial", sound: "earth", tonic: "G#2", mode: "harmonic", bpm: 132, leadOct: 1,
    desc: "The sealed Primordials (Vol under Thunderhold, and the rest in Act V). The motif turned upside down.",
    p1: { duty: .5, env: { vol: 14, dir: -1, step: 8 }, vib: { delay: .3, rate: 4, cents: 18 } },
    p2: { style: "arp", div: 12, duty: .25, env: { vol: 6, dir: -1, step: 2 } }, bass: { style: "drive", wave: "saw" },
    drums: "k..k..k.k..k.s..", drums2: "s...s...s...s.ss",
    sections: {
      A: { mel: "1:1 -3:1 -2:.5 -1:.5 -2:1 | -3:.5 -4:.5 -3:1 -6:2 | 1:1 2:1 3:1 5:1 | 4:2 0:2 | 1:1 -3:1 -2:.5 -1:.5 -2:1 | -3:.5 -4:.5 -3:1 -6:2 | 3:1 2:1 1:1 0:1 | 1:4",
           chords: "1 4 1 5 1 4 5 1" },
      B: { mel: "5:2 6:1 5:1 | 8:2 7:1 6:1 | 5:1 4:1 3:1 2:1 | 1:4 | 3:2 4:1 3:1 | 6:2 5:1 4:1 | 2:1 3:1 2:1 0:1 | 1:4",
           chords: "1 6 5 1 6 4 5 1" },
    } });

  B({ id: "battle-seraphine", name: "The Lantern", sound: "main", tonic: "D3", mode: "harmonic", bpm: 156,
    desc: "The final duel against Seraphine Vael. A: her Lantern leitmotif turned to harmonic minor. B: Wren's answer, the Unbound motif in major, reaching the octave.",
    p2: { style: "arp", div: 16, duty: .125, env: { vol: 6, dir: -1, step: 1 } }, drums2: "..h...h...h.h.h.",
    sections: {
      A: { mel: "5:1.5 8:.5 7:2 | 6:1 5:1 3:2 | 4:1.5 5:.5 6:1 9:1 | 7:4 | 5:1.5 8:.5 7:2 | 6:1 5:1 10:2 | 9:1.5 8:.5 7:2 | 8:4",
           chords: "1 6 4 5 1 6 5 1" },
      B: { mode: "ionian", mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2 | 8:1 9:.5 10:.5 11:1 12:1 | 12:2 10:2 | 1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 8:1 9:2 | 10:1 11:1 9:1 7:1 | 8:4",
           chords: "1 4 5 6 1 2 5 1" },
    } });

  S({ id: "sting-victory", name: "Victory", sound: "main", tonic: "D3", mode: "ionian", bpm: 150,
    desc: "A duel won: the motif's last bar, then again a step higher.",
    sections: { A: { mel: "5:.5 6:.5 5:.5 8:2.5 | 9:.5 10:.5 9:.5 12:2.5 | 8:4", chords: "1 5 1" } } });
  S({ id: "sting-defeat", name: "Defeat", sound: "main", tonic: "D3", mode: "aeolian", bpm: 76,
    desc: "A duel lost: the motif's first bar, slowed, settling on the fourth instead of climbing.",
    p2: { style: "counter", duty: .25, env: { vol: 6, dir: -1, step: 10 } },
    sections: { A: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 4:4", chords: "1 4" } } });
  S({ id: "sting-card", name: "Card Found", sound: "main", tonic: "D3", mode: "ionian", bpm: 120,
    desc: "A card revealed from a chest or a vault: a rising chime ending on the motif's leap.",
    p2: { style: "echo", delay: .25, duty: .125, env: { vol: 7, dir: -1, step: 4 } },
    sections: { A: { mel: "5:.25 8:.25 10:.25 12:.25 15:3 | r:4", chords: "1 1" } } });
  S({ id: "sting-rankup", name: "Promotion", sound: "main", tonic: "D3", mode: "ionian", bpm: 132,
    desc: "A new Covenant rank: a short fanfare on the motif that ends a full octave up.",
    sections: { A: { mel: "1:.5 5:.5 8:1 7:.5 8:.5 9:1 | 10:2 9:1 12:1 | 15:4", chords: "1 5 1" } } });
  // battle moments (TCG Design, board 2026-10-24) and story cues
  S({ id: "sting-manifest", name: "A Manifest Called", sound: "main", tonic: "D2", mode: "mixolydian", bpm: 132, pad: true,
    desc: "A great binding arrives: the motif's leap stacked to the top, with a drum hit. Separate from Card Found.",
    p2: { style: "counter", duty: .25, env: { vol: 9, dir: -1, step: 10 } }, drums: "k...k...k.k.kkkk",
    sections: { A: { mel: "1:.5 5:.5 8:1 5:.5 8:.5 12:1 | 15:4", chords: "1 1" } } });
  S({ id: "sting-phase", name: "Phase Break", sound: "earth", tonic: "A2", mode: "harmonic", bpm: 120, pad: true,
    desc: "A boss's life bar breaks: a falling line onto the leading-tone chord, then home, with a snare roll.",
    p2: { style: "counter", duty: .5, env: { vol: 8, dir: -1, step: 8 } }, drums: "k.......s.s.ssss",
    sections: { A: { mel: "8:1 7:1 6:1 5:1 | 1:4", chords: "5 1" } } });
  S({ id: "sting-crown", name: "The Crown Speaks", sound: "lightning", tonic: "C#3", mode: "phrygian", bpm: 84, zap: false, pad: true,
    desc: "A boss names the rule its crown breaks: a slow Phrygian half-step and a low drop.",
    p2: { style: "echo", delay: .5, duty: .25, env: { vol: 6, dir: -1, step: 8 } }, drums: "k...............",
    sections: { A: { mel: "1:1 2:1 1:2 | -2:4", chords: "1 5" } } });
  S({ id: "sting-crew-win", name: "Crew Holds", sound: "main", tonic: "G3", mode: "ionian", bpm: 140,
    desc: "Companions win their side fight in a boss battle: a quick bright bark.",
    sections: { A: { mel: "5:.5 6:.5 8:1 r:2", chords: "1" } } });
  S({ id: "sting-crew-lose", name: "Crew Falls Back", sound: "main", tonic: "G3", mode: "aeolian", bpm: 120,
    desc: "Companions lose their side fight: a short falling bark.",
    sections: { A: { mel: "5:.5 4:.5 2:1 r:2", chords: "1" } } });
  S({ id: "sting-hollow", name: "The Hollow", sound: "water", tonic: "D3", mode: "phrygian", bpm: 80, pad: true,
    desc: "Cult figures at a broken vault: the motif with its notes missing, ending on the flat second.",
    p2: { style: "echo", delay: .75, duty: .25, env: { vol: 5, dir: -1, step: 8 } },
    sections: { A: { mel: "1:1 r:1 4:.5 r:.5 4:1 | r:1 6:.5 r:.5 r:1 2:1", chords: "1 2" } } });
})(typeof window !== "undefined" ? window : globalThis);
