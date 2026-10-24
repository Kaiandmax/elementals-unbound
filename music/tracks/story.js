/* Elementals Unbound - cues for Acts II-V from Story's outline (story/outline.md, PR #24), requested on the board.
   Most are variations on themes the player already knows (Brindle Ford, Wind, Thunderhold, the Primordial, the
   motif, Seraphine), so the big moments land on familiar tunes in new modes. */
(function (g) {
  const T = (g.EU_TRACKS = g.EU_TRACKS || []), find = (id) => T.find((t) => t.id === id);
  const sec = (id, L) => ({ mel: find(id).sections[L].mel, chords: find(id).sections[L].chords });
  const add = (t) => T.push(t);

  // ---- scenes ----
  add({ id: "mads", name: "The Last Line (Mads)", group: "scene", act: 2, sound: "water", tonic: "G3", mode: "aeolian", bpm: 66,
    desc: "II-4: Mads dies at the mill gate holding the line. Brindle Ford's tune in minor, slow, no drums; the second half is the motif, climbing once and stopping short.",
    p1: { duty: .5, env: { vol: 11, dir: -1, step: 12 }, vib: { delay: .35, rate: 4.5, cents: 18 } },
    p2: { style: "counter", duty: .25, env: { vol: 6, dir: -1, step: 12 } }, bass: { style: "whole", wave: "soft" }, drums: "", pad: true,
    sections: {
      A: sec("brindle-ford", "A"),
      B: { mel: "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 7:2 | 6:1 5:1 4:1 3:1 | 2:4 | 1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 4:2 | 3:2 2:2 | 1:4",
           chords: "1 4 6 5 1 4 7 1" },
    } });

  add({ id: "dove", name: "Dove Holds the Rift", group: "scene", act: 3, sound: "wind", tonic: "F3", mode: "dorian", bpm: 70,
    desc: "III-4: Dove holds the rift's second front so a town can flee. Wind's soaring tune slowed and darkened to Dorian, echoing as if from far off.",
    p1: { duty: .25, env: { vol: 11, dir: -1, step: 12 }, vib: { delay: .3, rate: 5, cents: 22 } },
    p2: { style: "echo", delay: 1, duty: .125, env: { vol: 6, dir: -1, step: 10 } }, bass: { style: "pedal", wave: "soft" }, drums: "", pad: true,
    sections: { A: sec("wind", "B"), B: sec("wind", "A") } });

  // ---- places ----
  add({ id: "thunderhold-cathedral", name: "Thunderhold Cathedral", group: "zone", act: 4, sound: "lightning", tonic: "C#3", mode: "phrygian", bpm: 72,
    desc: "IV-1: the storm-priests' cathedral over Vol's seal. Thunderhold's chant slowed to a hymn over held organ chords, no drums.",
    zap: false, p1: { duty: .5, env: { vol: 11, dir: -1, step: 12 }, vib: { delay: .4, rate: 4, cents: 12 } },
    p2: { style: "counter", duty: .5, env: { vol: 6, dir: -1, step: 12 } }, bass: { style: "whole", wave: "hollow" }, drums: "", pad: true,
    sections: { A: sec("thunderhold", "A"), B: sec("thunderhold", "B") } });

  add({ id: "council-hall", name: "The Covenant Council Hall", group: "zone", act: 5, sound: "main", tonic: "D3", mode: "dorian", bpm: 88,
    desc: "V-1: where the Seven sit and the council breaks. The motif, slow and stately; then Seraphine's leitmotif in Dorian, as the person everyone trusts.",
    p2: { style: "counter", duty: .25, env: { vol: 7, dir: -1, step: 10 } }, bass: { style: "march", wave: "tri" }, drums: "k.......s.......",
    sections: { A: sec("main", "A"), B: sec("seraphine", "A") } });

  add({ id: "founding-vault", name: "The Founding Vault", group: "zone", act: 5, sound: "water", tonic: "G3", mode: "phrygian", bpm: 76,
    desc: "V-3: the last vault, under Brindle Ford all along. Home's tune sunk into Phrygian and echoing, then the Vaults' deep phrase.",
    p1: { duty: .5, env: { vol: 10, dir: -1, step: 11 }, vib: { delay: .4, rate: 4.5, cents: 18 } },
    p2: { style: "echo", delay: .75, duty: .25, env: { vol: 5, dir: -1, step: 8 } }, bass: { style: "pedal", wave: "soft" },
    drums: "......h.......h.", pad: true,
    sections: { A: sec("brindle-ford", "A"), B: sec("vault", "B") } });

  // ---- battles ----
  const boss = (t) => add(Object.assign({ group: "battle", layered: true }, t));
  boss({ id: "battle-tournament", name: "The Highcourt Tournament", act: 2, sound: "wind", tonic: "Bb2", mode: "lydian", bpm: 160,
    desc: "II-3: Covenant duels before the princes, Aeris the reigning champion. Highcourt's courtly tune turned into a fanfare.",
    p2: { style: "stabs", duty: .25, env: { vol: 8, dir: -1, step: 2 } }, bass: { style: "octave", wave: "tri" },
    drums: "k.h.s.h.k.k.s.h.", drums2: "...h...h..h..h.h", pad: false,
    sections: { A: sec("highcourt", "A"), B: sec("highcourt", "B") } });

  boss({ id: "battle-davor", name: "Captain Davor Varrane", act: 3, sound: "fire", tonic: "D3", mode: "phrygdom", bpm: 164,
    desc: "III-2 and IV-4: Pell against his brother. The rival's swagger over Cindergate's march, then the Dominion's proud tune.",
    p2: { style: "counter", duty: .25, env: { vol: 8, dir: -1, step: 6 } }, bass: { style: "march", wave: "saw" },
    drums: "k.s.k.ssk.s.k.ss", drums2: "..h...h...h..hhh", fill: false, pad: true,
    sections: { A: sec("battle-rival", "A"), B: sec("cindergate", "B") } });

  boss({ id: "battle-kes", name: "Kes Reclaims His Name", act: 4, sound: "wind", tonic: "F3", mode: "lydian", bpm: 164,
    desc: "IV-2: Kes's loyalty fight at Highcourt. The rival's syncopated swagger in Wind's Lydian, then Wind's soaring tune.",
    p2: { style: "echo", delay: .5, duty: .125, env: { vol: 7, dir: -1, step: 4 } },
    drums: "k.h.s.k.h.k.s.hh", drums2: "..h...h...h..hhh", pad: false,
    sections: { A: sec("battle-rival", "A"), B: sec("wind", "B") } });

  boss({ id: "battle-vol", name: "Vol, the Storm God", act: 4, sound: "lightning", tonic: "C#3", mode: "phrygian", bpm: 156,
    desc: "IV-1: half of Vol unbound under Thunderhold, fought beside Ysil; Tamsin's loyalty fight. The Primordial's upside-down motif in Thunderhold's mode, crackling with zaps.",
    p1: { duty: .5, env: { vol: 14, dir: -1, step: 7 }, vib: { delay: .3, rate: 5, cents: 16 } },
    p2: { style: "arp", div: 16, duty: .125, env: { vol: 6, dir: -1, step: 1 } }, zap: true, bass: { style: "drive", wave: "saw" },
    drums: "k..k..k.s..k.ksz", drums2: "hhhhhhhhhhhhhhhh", pad: true, leadOct: 0,
    sections: { A: sec("battle-primordial", "A"), B: sec("thunderhold", "B") } });
})(typeof window !== "undefined" ? window : globalThis);
