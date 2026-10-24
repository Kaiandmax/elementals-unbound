/* Elementals Unbound - sound palette as data. Mirrors music/palette.md.
   MODES: scales as semitone offsets from the tonic; melodies are written as 1-based scale degrees (8 = octave).
   PALETTE: the "sounds" tracks inherit their instrumentation from (a track names one with `sound` and can
   override any field). Retro handheld-RPG style, played fuller than a real handheld (designer, 2026-10-23). */
(function (g) {
  const MODES = {
    ionian:     [0, 2, 4, 5, 7, 9, 11],
    dorian:     [0, 2, 3, 5, 7, 9, 10],
    phrygian:   [0, 1, 3, 5, 7, 8, 10],
    phrygdom:   [0, 1, 4, 5, 7, 8, 10], // Phrygian dominant
    lydian:     [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    aeolian:    [0, 2, 3, 5, 7, 8, 10],
    harmonic:   [0, 2, 3, 5, 7, 8, 11], // harmonic minor
  };

  // The main motif ("Unbound"): open fifth, a step down and back, then a leap to the octave. Every track can quote it.
  const MOTIF = "1:1 5:1 4:.5 3:.5 4:1 | 5:.5 6:.5 5:1 8:2";

  // Parts: p1 = lead, p2 = harmony (style: third | echo | arp | stabs | counter | oompah), bass (style: octave | drive |
  // walk | march | pedal | whole | waltz; wave: soft | tri | saw | hollow), drums = one bar of k s r h z (kick, snare,
  // roll, hat, zap) and dots. duty: pulse width. env: volume {vol 0-15, dir -1 fade / 0 hold, step in 1/64 s}.
  // vib: delayed vibrato {delay s, rate Hz, cents}. pad: soft chord pad (enhanced only). drumsHD: drum level (enhanced).
  const PALETTE = {
    main: {
      tonic: "D3", mode: "dorian", bpm: 120,
      p1: { duty: .5, env: { vol: 12, dir: -1, step: 6 }, vib: { delay: .18, rate: 6, cents: 18 } },
      p2: { style: "third", duty: .25, env: { vol: 8, dir: -1, step: 5 } },
      pad: true, bass: { style: "octave", wave: "tri" }, drums: "k.h.s.h.k.k.s.h.",
    },
    fire: {
      tonic: "E3", mode: "phrygdom", bpm: 152, drumsHD: .65,
      p1: { duty: .25, env: { vol: 13, dir: -1, step: 4 }, vib: { delay: .15, rate: 7, cents: 12 } },
      p2: { style: "stabs", duty: .125, env: { vol: 10, dir: -1, step: 1 } },
      bass: { style: "octave", wave: "saw" }, drums: "k.h.s.k.h.k.s.hh", fill: true,
    },
    water: {
      tonic: "G3", mode: "dorian", bpm: 96,
      p1: { duty: .5, env: { vol: 11, dir: -1, step: 8 }, vib: { delay: .25, rate: 5, cents: 22 } },
      p2: { style: "arp", div: 12, duty: .125, env: { vol: 6, dir: -1, step: 2 } },
      pad: true, bass: { style: "pedal", wave: "soft" }, drums: "..h..h..h..h",
    },
    earth: {
      tonic: "A2", mode: "aeolian", bpm: 100,
      p1: { duty: .5, env: { vol: 14, dir: -1, step: 7 }, vib: { delay: .3, rate: 4.5, cents: 10 } },
      p2: { style: "third", duty: .5, env: { vol: 8, dir: -1, step: 6 } },
      pad: true, bass: { style: "whole", wave: "hollow" }, drums: "k.....k.s.......",
    },
    wind: {
      tonic: "F3", mode: "lydian", bpm: 132,
      p1: { duty: .125, env: { vol: 12, dir: -1, step: 7 }, vib: { delay: .12, rate: 6.5, cents: 25 } },
      p2: { style: "echo", delay: .5, duty: .125, env: { vol: 7, dir: -1, step: 5 } },
      pad: true, bass: { style: "walk", wave: "tri" }, drums: "k.hh.hk.hh.h",
    },
    lightning: {
      tonic: "B2", mode: "mixolydian", bpm: 168, drumsHD: .7, zap: true,
      p1: { duty: .25, env: { vol: 13, dir: -1, step: 3 }, vib: { delay: .2, rate: 8, cents: 15 } },
      p2: { style: "arp", div: 16, duty: .125, env: { vol: 7, dir: -1, step: 1 } },
      bass: { style: "octave", wave: "saw" }, drums: "k.hhs.hhk.hhs.hz",
    },
  };

  g.EU_PALETTE = { MODES, MOTIF, PALETTE };
  g.EU_TRACKS = g.EU_TRACKS || [];
})(typeof window !== "undefined" ? window : globalThis);
