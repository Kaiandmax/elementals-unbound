/* ================= PREBUILT DECKS FROM DESIGNED CATALOGS (TCG Design) =================
   Load after decks_triple.js and before catalog.js. For each confluence that has a designed catalog
   (cards/catalog_<conf>.js), its prebuilt decks are rebuilt from catalog cards: one theme per deck, rarity by tier.
   Manifests stay as set by the kept pool (decks_triple.js). Confluences without a catalog keep their fused decks. */
(function(){
  const CATALOG_DECKS = {
    steam: {
      // Balance (2026-11-04): theme picks set by L3 sims against the tier below (PR #62). Names follow the themes; Story may rename.
      steam_c:  { name:"Pressure Cooker", desc:"A full hand that turns into burn, with ambushers in the fog.", themes:["pressure","fog"], rar:["c"] },
      steam_u:  { name:"Geyser Cycle",    desc:"Freeze them, then replay creatures that boil on arrival.", themes:["boil","vent"],     rar:["u","c"] },
      steam_r:  { name:"Boiling Point",   desc:"Freeze them, then boil them.",                             themes:["boil","vent"],     rar:["r","u","c"] },
      steam_sp: { name:"Fog Lords",       desc:"Freeze them, then strike from the mist.",                  themes:["boil","fog"],      rar:["r","u"] },
    },
    volcano: {
      // Balance (2026-11-05): theme picks set by L3 sims against the tier below (PR #65); names follow the themes; Story may rename.
      volcano_forge:    { name:"Magma Run",        desc:"Big Pierce bodies that burn on the way in, behind fortified stone.", themes:["magma","fault"], rar:["c"] },
      volcano_ash:      { name:"Eruption",         desc:"Sacrifice your own creatures for explosive damage.",            themes:["eruption"],        rar:["u","c"] },
      volcano_obsidian: { name:"Obsidian Eruption", desc:"Rare blasts: feed your creatures to the mountain.",            themes:["eruption"],        rar:["r","u","c"] },
      volcano_sp:       { name:"Fault Lines",      desc:"Fortified stone and magma that bite back.",                     themes:["magma","fault"],   rar:["r","u"] },
    },
    aurora: {
      aurora_c:  { name:"First Light",    desc:"Charge comes fast and the Manifests follow.",          themes:["radiance"],             rar:["c"] },
      aurora_u:  { name:"Radiance",       desc:"Charge and Manifests, early and often.",               themes:["radiance"],             rar:["u","c"] },
      aurora_r:  { name:"Dawnfire Host",  desc:"Manifests rise, and the burn grows with them.",        themes:["radiance","dawnfire"],  rar:["r","u","c"] },
      aurora_sp: { name:"Spectrum",       desc:"Charge-fed Manifests and spells that chain into burn.", themes:["radiance","spectrum"], rar:["r","u"] },
    },
    // Generated first-draft catalogs (design/tools/gencatalog.js): theme picks are TCG first guesses for Balance to re-pick.
    wildfire: {
      wildfire_c: { name:"Brushfire Flock", desc:"Updraft.", themes:["flames"], rar:["c"] },
      wildfire_u: { name:"Ashen Gale", desc:"Kindling and Flames.", themes:["flames","updraft"], rar:["u","c"] },
      wildfire_r: { name:"Phoenix Sky", desc:"Flames and Updraft.", themes:["kindling","updraft"], rar:["r","u","c"] },
      wildfire_sp: { name:"Spreading Flames", desc:"Flames.", themes:["flames","kindling"], rar:["r","u"] },
    },
    plasma: {
      plasma_c: { name:"Arc Furnace", desc:"Arc.", themes:["arc","static"], rar:["c"] },
      plasma_u: { name:"Overload", desc:"Ignition and Overload.", themes:["ignition","static"], rar:["u","c"] },
      plasma_r: { name:"Star Forge", desc:"Overload and Reactor.", themes:["reactor","static"], rar:["r","u","c"] },
      plasma_sp: { name:"Overload", desc:"Overload.", themes:["overload","reactor"], rar:["r","u"] },
    },
    swamp: {
      swamp_c: { name:"Mire Wall", desc:"Mire.", themes:["bogspawn","peat"], rar:["c"] },
      swamp_u: { name:"Bog Growth", desc:"Rot and Gravetide.", themes:["bogspawn","mire"], rar:["u","c"] },
      swamp_r: { name:"Primordial Bog", desc:"Gravetide and Bogspawn.", themes:["mire","peat"], rar:["r","u","c"] },
      swamp_sp: { name:"Grave Tide", desc:"Gravetide.", themes:["mire"], rar:["r","u"] },
    },
    ice: {
      ice_c: { name:"Hailflock", desc:"Rimewings.", themes:["snowdrift"], rar:["c"] },
      ice_u: { name:"Frozen Gale", desc:"Snowdrift and Shatter.", themes:["rimewings","shatter"], rar:["u","c"] },
      ice_r: { name:"Glacier Sky", desc:"Shatter and Hoarfrost.", themes:["shatter","squall"], rar:["r","u","c"] },
      ice_sp: { name:"Shatter", desc:"Shatter.", themes:["hoarfrost","shatter"], rar:["r","u"] },
    },
    storm: {
      storm_c: { name:"Rain of Sparks", desc:"Downpour.", themes:["riptide","spellstorm"], rar:["c"] },
      storm_u: { name:"Thunder Tide", desc:"Thunderhead and Spellstorm.", themes:["riptide"], rar:["u","c"] },
      storm_r: { name:"Eye of Storms", desc:"Spellstorm and Lightningrod.", themes:["lightningrod","riptide"], rar:["r","u","c"] },
      storm_sp: { name:"Spellstorm", desc:"Spellstorm.", themes:["downpour","riptide"], rar:["r","u"] },
    },
    sand: {
      sand_c: { name:"Dune Riders", desc:"Dune.", themes:["dune","sandstorm"], rar:["c"] },
      sand_u: { name:"Sandstorm", desc:"Sandstorm and Erosion.", themes:["dune","quicksand"], rar:["u","c"] },
      sand_r: { name:"Desert Kings", desc:"Erosion and Mesa.", themes:["erosion","mesa"], rar:["r","u","c"] },
      sand_sp: { name:"Erosion", desc:"Erosion.", themes:["quicksand","sandstorm"], rar:["r","u"] },
    },
    metal: {
      metal_c: { name:"Iron Works", desc:"Forgework.", themes:["magnet","plating"], rar:["c"] },
      metal_u: { name:"Steel Legion", desc:"Dynamo and Plating.", themes:["magnet","rail"], rar:["u","c"] },
      metal_r: { name:"Thunder Forge", desc:"Plating and Rail.", themes:["dynamo","plating"], rar:["r","u","c"] },
      metal_sp: { name:"Plating", desc:"Plating.", themes:["magnet","plating"], rar:["r","u"] },
    },
    tempest: {
      tempest_c: { name:"Squall Line", desc:"Galeriders.", themes:["blitz","galeriders"], rar:["c"] },
      tempest_u: { name:"Thunderwings", desc:"Squallline and Blitz.", themes:["blitz","eyeofstorm"], rar:["u","c"] },
      tempest_r: { name:"Storm Sovereigns", desc:"Blitz and Downburst.", themes:["blitz","squallline"], rar:["r","u","c"] },
      tempest_sp: { name:"Blitz", desc:"Blitz.", themes:["squallline"], rar:["r","u"] },
    },
    geyser: {
      geyser_c: { name:"Hot Springs", desc:"Hotspring.", themes:["hotspring"], rar:["c"] },
      geyser_u: { name:"Boiling Earth", desc:"Mudslide and Wellspring.", themes:["mudslide"], rar:["u","c"] },
      geyser_r: { name:"Primordial Vents", desc:"Wellspring and Vent.", themes:["wellspring","vent"], rar:["r","u","c"] },
      geyser_sp: { name:"Wellspring", desc:"Wellspring.", themes:["wellspring"], rar:["r","u"] },
    },
    mirage: {
      mirage_c: { name:"Heat Haze", desc:"Phantasm.", themes:["fatamorgana","phantasm"], rar:["c"] },
      mirage_u: { name:"Oasis Mirage", desc:"Haze and Illusions.", themes:["heatshimmer","illusions"], rar:["u","c"] },
      mirage_r: { name:"Fata Morgana Court", desc:"Illusions and Heatshimmer.", themes:["illusions","heatshimmer"], rar:["r","u","c"] },
      mirage_sp: { name:"Illusions", desc:"Illusions.", themes:["illusions"], rar:["r","u"] },
    },
    ash: {
      ash_c: { name:"Cinderfall", desc:"Pyroclast.", themes:["pyroclast"], rar:["c"] },
      ash_u: { name:"Ashen Winds", desc:"Emberflock and Cinders.", themes:["ashenwall","pyroclast"], rar:["u","c"] },
      ash_r: { name:"Pyroclastic Lords", desc:"Cinders and Ashenwall.", themes:["cinders","ashenwall"], rar:["r","u","c"] },
      ash_sp: { name:"Cinders", desc:"Cinders.", themes:["cinders"], rar:["r","u"] },
    },
    forge: {
      forge_c: { name:"Sparkworks", desc:"Anvil.", themes:["bellows","crucible"], rar:["c"] },
      forge_u: { name:"Thunder Anvil", desc:"Bellows and Artifice.", themes:["bellows"], rar:["u","c"] },
      forge_r: { name:"Worldforge", desc:"Artifice and Sparksmith.", themes:["artifice","sparksmith"], rar:["r","u","c"] },
      forge_sp: { name:"Artifice", desc:"Artifice.", themes:["artifice"], rar:["r","u"] },
    },
    solar: {
      solar_c: { name:"Sunrise Raiders", desc:"Corona.", themes:["flare","zenith"], rar:["c"] },
      solar_u: { name:"High Noon", desc:"Flare and Sunfire.", themes:["corona","heathaze"], rar:["u","c"] },
      solar_r: { name:"Solar Crown", desc:"Sunfire and Zenith.", themes:["sunfire","zenith"], rar:["r","u","c"] },
      solar_sp: { name:"Sunfire", desc:"Sunfire.", themes:["sunfire"], rar:["r","u"] },
    },
    glacier: {
      glacier_c: { name:"Ice Shelf", desc:"Iceberg.", themes:["avalanche","bulwark"], rar:["c"] },
      glacier_u: { name:"Permafrost Line", desc:"Avalanche and Bulwark.", themes:["iceberg","snowfield"], rar:["u","c"] },
      glacier_r: { name:"Glacial Titans", desc:"Bulwark and Calving.", themes:["bulwark","calving"], rar:["r","u","c"] },
      glacier_sp: { name:"Bulwark", desc:"Bulwark.", themes:["bulwark"], rar:["r","u"] },
    },
    quicksilver: {
      quicksilver_c: { name:"Liquid Metal", desc:"Mercury.", themes:["liquidmetal","reflection"], rar:["c"] },
      quicksilver_u: { name:"Alchemist's Lab", desc:"Alloy and Shapeshift.", themes:["liquidmetal","reflection"], rar:["u","c"] },
      quicksilver_r: { name:"Living Mercury", desc:"Shapeshift and Reflection.", themes:["shapeshift","reflection"], rar:["r","u","c"] },
      quicksilver_sp: { name:"Shapeshift", desc:"Shapeshift.", themes:["shapeshift"], rar:["r","u"] },
    },
    hurricane: {
      hurricane_c: { name:"Squall Front", desc:"Downdraft.", themes:["downdraft"], rar:["c"] },
      hurricane_u: { name:"Typhoon Season", desc:"Riptide and Maelstrom.", themes:["maelstrom"], rar:["u","c"] },
      hurricane_r: { name:"Category Five", desc:"Maelstrom and Tempestsurge.", themes:["maelstrom","tempestsurge"], rar:["r","u","c"] },
      hurricane_sp: { name:"Maelstrom", desc:"Maelstrom.", themes:["maelstrom"], rar:["r","u"] },
    },
    glass: {
      glass_c: { name:"Fulgurite Fields", desc:"Prismwall.", themes:["prismwall","shards"], rar:["c"] },
      glass_u: { name:"Prism Spires", desc:"Splinter and Shards.", themes:["mirror"], rar:["u","c"] },
      glass_r: { name:"Cathedral of Glass", desc:"Shards and Mirror.", themes:["shards","mirror"], rar:["r","u","c"] },
      glass_sp: { name:"Shards", desc:"Shards.", themes:["shards"], rar:["r","u"] },
    },
  };
  // A curve for 10 cards: how many to take at each cost (any leftover slots are filled from the cheapest left).
  const CURVE = { 1:2, 2:3, 3:2, 4:2, 5:1, 6:1 };
  const rank = { r:0, u:1, c:2 };
  for (const [conf, decks] of Object.entries(CATALOG_DECKS)){
    const cat = globalThis[conf.toUpperCase()+"_CATALOG"];
    if (!cat) continue;                                   // catalog not loaded: keep the fused decks
    for (const [id, spec] of Object.entries(decks)){
      const d = DECK_BY_ID[id]; if (!d) throw new Error("decks_catalog: no deck "+id);
      // Theme order alternates when a deck mixes themes, so both get slots.
      const pool = cat.filter(c => spec.themes.includes(c.th) && spec.rar.includes(c.r))
        .sort((a,b) => (rank[a.r]-rank[b.r]) || (spec.themes.indexOf(a.th)-spec.themes.indexOf(b.th)) || a.cost-b.cost);
      const pick = [], take = c => { if (!pick.includes(c)) pick.push(c); };
      const byTheme = spec.themes.map(t => pool.filter(c => c.th===t));
      for (const [cost, n] of Object.entries(CURVE)){
        let got = 0;
        for (let k=0; got<n && k<20; k++){ const list = byTheme[k % byTheme.length].filter(c => c.cost===+cost && !pick.includes(c)); if (list.length){ take(list[0]); got++; } else if (byTheme.every(l => !l.some(c => c.cost===+cost && !pick.includes(c)))) break; }
      }
      for (const c of [...pool].sort((a,b)=>a.cost-b.cost)) if (pick.length < 10) take(c);
      if (pick.length < 10) throw new Error(`decks_catalog: ${id} has only ${pick.length} cards`);
      d.main = pick.slice(0,10).map(c => c.id);
      d.name = spec.name; d.desc = spec.desc; d.pairs = null; d.catalog = conf;
    }
  }
})();
