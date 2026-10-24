/* Elementals Unbound - themes for the 10 dual and 10 triple confluences, braided from the element themes.

   The braiding rule (so every confluence sounds related to its parents, the way a braided card is):
     Dual (lead + rhythm):
       melody  A = lead's A bars 1-4 + rhythm's A bars 5-8;  B = rhythm's B bars 1-4 + lead's B bars 5-8
       sound   lead part from the lead element; harmony, bass and drums from the rhythm element
     Triple (lead + harm + rhythm):
       melody  A = lead's A bars 1-4 + harm's A bars 5-8;    B = rhythm's B bars 1-4 + lead's B bars 5-8
       sound   lead part from lead; harmony from harm; bass and drums from rhythm
   Every confluence gets its own key, the lead element's mode (melodies are scale degrees, so a borrowed phrase
   takes on the new mode's colour) and the average tempo of its parents unless set below.
   Which element leads is a musical choice made from each confluence's archetype (design/elements.md). */
(function (g) {
  const T = (g.EU_TRACKS = g.EU_TRACKS || []), P = g.EU_PALETTE.PALETTE;
  const byId = (id) => T.find((t) => t.id === id);
  const bars = (sec, a, b) => sec.mel.split("|").slice(a, b).map((s) => s.trim());
  const chords = (sec, a, b) => String(sec.chords).trim().split(/\s+/).slice(a, b);
  const NAME = { fire: "Fire", water: "Water", earth: "Earth", wind: "Wind", lightning: "Lightning" };

  function braid(c, kind) {
    const L = byId(c.lead), H = byId(c.harm || c.rhythm), R = byId(c.rhythm), parents = c.parents;
    const sound = (id) => P[id];
    const A = { mel: [...bars(L.sections.A, 0, 4), ...bars(H.sections.A, 4, 8)].join(" | "),
                chords: [...chords(L.sections.A, 0, 4), ...chords(H.sections.A, 4, 8)].join(" ") };
    const B = { mel: [...bars(R.sections.B, 0, 4), ...bars(L.sections.B, 4, 8)].join(" | "),
                chords: [...chords(R.sections.B, 0, 4), ...chords(L.sections.B, 4, 8)].join(" ") };
    const sl = sound(c.lead), sh = sound(c.harm || c.rhythm), sr = sound(c.rhythm);
    const bpm = c.bpm || Math.round(parents.reduce((a, p) => a + P[p].bpm, 0) / parents.length);
    return {
      id: c.id, name: c.name, group: kind, layered: true, parents, sound: c.lead,
      desc: c.desc + " " + (kind === "dual"
        ? `${NAME[c.lead]} leads; ${NAME[c.rhythm]} drives.`
        : `${NAME[c.lead]} leads, ${NAME[c.harm]} harmonises, ${NAME[c.rhythm]} drives.`),
      tonic: c.tonic, mode: c.mode || sl.mode, bpm,
      p1: sl.p1, p2: sh.p2, zap: !!sh.zap, bass: sr.bass, drums: sr.drums, fill: !!sr.fill,
      drumsHD: sr.drumsHD || 1, pad: !!(sl.pad || sh.pad || sr.pad) && !c.noPad,
      sections: { A, B },
    };
  }

  const DUALS = [
    { id: "volcano", name: "Volcano", parents: ["fire", "earth"], lead: "fire", rhythm: "earth", tonic: "F3",
      desc: "Pressure under rock: Fire's tune over Earth's heavy half-time stamp." },
    { id: "wildfire", name: "Wildfire", parents: ["fire", "wind"], lead: "fire", rhythm: "wind", tonic: "G3",
      desc: "Flames carried on the wind: Fire's urgency floating on triplets and an echo." },
    { id: "plasma", name: "Plasma", parents: ["fire", "lightning"], lead: "lightning", rhythm: "fire", tonic: "C3",
      desc: "Overload: Lightning's bursts riding Fire's driving stabs." },
    { id: "steam", name: "Steam", parents: ["fire", "water"], lead: "water", rhythm: "fire", tonic: "Bb2",
      desc: "Pressure building in still water: a calm Dorian tune over a hot, hurried beat." },
    { id: "swamp", name: "Swamp", parents: ["water", "earth"], lead: "earth", rhythm: "water", tonic: "D3",
      desc: "Slow and sunken: Earth's low minor tune over Water's rippling triplets." },
    { id: "ice", name: "Ice", parents: ["water", "wind"], lead: "water", rhythm: "wind", tonic: "E3",
      desc: "Lockdown: Water's long notes frozen in Wind's high, echoing air." },
    { id: "storm", name: "Storm", parents: ["water", "lightning"], lead: "water", rhythm: "lightning", tonic: "C#3",
      desc: "A calm tune with a storm underneath: Water's melody over Lightning's 16th-note crackle." },
    { id: "sand", name: "Sand", parents: ["earth", "wind"], lead: "wind", rhythm: "earth", tonic: "Eb3",
      desc: "Erosion: Wind's Lydian line worn against Earth's slow, grinding beat." },
    { id: "metal", name: "Metal", parents: ["earth", "lightning"], lead: "earth", rhythm: "lightning", tonic: "G2",
      desc: "Plating and sparks: Earth's march hammered out over Lightning's arpeggios." },
    { id: "tempest", name: "Tempest", parents: ["wind", "lightning"], lead: "wind", rhythm: "lightning", tonic: "D3",
      desc: "Pure speed: Wind's soaring line on Lightning's fastest pulse." },
  ];
  const TRIPLES = [
    { id: "geyser", name: "Geyser", parents: ["fire", "water", "earth"], lead: "water", harm: "fire", rhythm: "earth", tonic: "F3",
      desc: "Wellspring: a calm surface that erupts." },
    { id: "mirage", name: "Mirage", parents: ["fire", "water", "wind"], lead: "wind", harm: "water", rhythm: "fire", tonic: "Ab3",
      desc: "Illusions: a floating Lydian line that won't stay where you put it." },
    { id: "aurora", name: "Aurora", parents: ["fire", "water", "lightning"], lead: "water", harm: "lightning", rhythm: "fire", tonic: "B2",
      desc: "Radiance: a luminous, unhurried tune over bright arpeggios. Seraphine's element." },
    { id: "ash", name: "Ash", parents: ["fire", "earth", "wind"], lead: "fire", harm: "wind", rhythm: "earth", tonic: "A2",
      desc: "Cinders that rise again: Fire's tune, smouldering low." },
    { id: "forge", name: "Forge", parents: ["fire", "earth", "lightning"], lead: "earth", harm: "fire", rhythm: "lightning", tonic: "C3",
      desc: "Artifice: a heavy minor tune struck in time like a hammer." },
    { id: "solar", name: "Solar", parents: ["fire", "wind", "lightning"], lead: "fire", harm: "lightning", rhythm: "wind", tonic: "D3",
      desc: "Sunfire: Fire's tune blazing over Lightning's arpeggios." },
    { id: "glacier", name: "Glacier", parents: ["water", "earth", "wind"], lead: "earth", harm: "water", rhythm: "wind", tonic: "F#2",
      desc: "Bulwark: slow, cold and immovable." },
    { id: "quicksilver", name: "Quicksilver", parents: ["water", "earth", "lightning"], lead: "lightning", harm: "water", rhythm: "earth", tonic: "A2",
      desc: "Shapeshift: a twitchy tune that keeps changing its footing." },
    { id: "hurricane", name: "Hurricane", parents: ["water", "wind", "lightning"], lead: "wind", harm: "water", rhythm: "lightning", tonic: "G3",
      desc: "Maelstrom: everything swept up and thrown back." },
    { id: "glass", name: "Glass", parents: ["earth", "wind", "lightning"], lead: "lightning", harm: "earth", rhythm: "wind", tonic: "E3",
      desc: "Shards: bright, brittle, reflecting everything back." },
  ];

  DUALS.forEach((c) => T.push(braid(c, "dual")));
  TRIPLES.forEach((c) => T.push(braid(c, "triple")));
})(typeof window !== "undefined" ? window : globalThis);
