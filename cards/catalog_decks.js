/* ================= PREBUILT DECKS FROM DESIGNED CATALOGS (TCG Design) =================
   Load after decks_triple.js and before catalog.js. For each confluence that has a designed catalog
   (cards/catalog_<conf>.js), its prebuilt decks are rebuilt from catalog cards: one theme per deck, rarity by tier.
   Manifests stay as set by the kept pool (decks_triple.js). Confluences without a catalog keep their fused decks. */
(function(){
  const CATALOG_DECKS = {
    steam: {
      // Balance (2026-11-04): theme picks chosen by L3 sims vs the tier below (see PR #62); names follow the themes; Story may rename.
      steam_c:  { name:"Pressure Cooker", desc:"A full hand that turns into burn, then boils what's frozen.", themes:["pressure","boil"], rar:["c"] },
      steam_u:  { name:"Scalding Mist",   desc:"Freeze them, then strike from the fog.",                   themes:["boil","fog"],        rar:["u","c"] },
      steam_r:  { name:"Boiling Point",   desc:"Freeze them, then boil them.",                             themes:["boil"],              rar:["r","u","c"] },
      steam_sp: { name:"Fog Lords",       desc:"Ward, ambush and tricks out of the mist.",                 themes:["fog","vent"],        rar:["r","u"] },
    },
    aurora: {
      aurora_c:  { name:"First Light",    desc:"Charge comes fast; cheap spells chain until the Manifests arrive.", themes:["radiance","spectrum"], rar:["c"] },
      aurora_u:  { name:"Radiance",       desc:"Charge and Manifests, early and often.",               themes:["radiance"],             rar:["u","c"] },
      aurora_r:  { name:"Lantern Host",   desc:"Shields and freezes hold the line while the Manifests rise.", themes:["radiance","shimmer"], rar:["r","u","c"] },
      aurora_sp: { name:"Spectrum",       desc:"Charge-fed Manifests and spells that chain into burn.", themes:["radiance","spectrum"], rar:["r","u"] },
    },
  };
  // A curve for 10 cards: how many to take at each cost (any leftover slots are filled from the cheapest left).
  const CURVE = { 1:2, 2:3, 3:2, 4:2, 5:1, 6:1 };
  const rank = { r:0, u:1, c:2 };
  for (const [conf, decks] of Object.entries(CATALOG_DECKS)){
    const cat = globalThis[conf.toUpperCase()+"_CATALOG"];
    if (!cat) continue;                                   // catalog not loaded: keep the fused decks
    for (const [id, spec] of Object.entries(decks)){
      const d = DECK_BY_ID[id]; if (!d) throw new Error("catalog_decks: no deck "+id);
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
      if (pick.length < 10) throw new Error(`catalog_decks: ${id} has only ${pick.length} cards`);
      d.main = pick.slice(0,10).map(c => c.id);
      d.name = spec.name; d.desc = spec.desc; d.pairs = null; d.catalog = conf;
    }
  }
})();
