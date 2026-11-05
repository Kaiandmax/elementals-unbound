/* ================= QUICKSILVER CATALOG (designed confluence cards, generated first draft) =================
   Water + Earth + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   shapeshift (25: shapeshift + draw), mercury (20: shapeshift + buff), alloy (20: barrier + fortify), reflection (20: mirror + tokens), liquidmetal (15: bounce + draw).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [water, earth, lightning]. */
// Loaded by build.py inside catalogBegin("quicksilver")/catalogEnd("quicksilver") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.QUICKSILVER_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"quicksilver" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.QUICKSILVER_CATALOG.push(d); return d; };
  setEl("quicksilver");

  /* ---- shapeshift (25) ---- */
  setR("c");
  add(Cr("Quicksilver Elemental",1,2,2,"","play: swap t",S("shapeshift","shapeshift+draw",["Coral Crab","Clay Homunculus","Volt Hopper"],{tgt:"o"})));
  add(Cr("Flowing Scout",1,2,2,"","play: swap t",S("shapeshift","shapeshift+draw",["Frost Sprite","Stone Sentry","Static Sprite"],{tgt:"o"})));
  add(Cr("Liquid Imp",1,2,2,"","play: transform t blob",S("shapeshift","shapeshift+draw",["Tide Sprite","Root Tender","Spark Mite"],{tgt:"e:cost<=2"})));
  add(Cr("Mercurial Caller",3,4,4,"","play: swap t",S("shapeshift","shapeshift+draw",["Whirlpool Mage","Cliffside Watcher","Bolt Thrower"],{tgt:"o"})));
  add(Cr("Fluid Elemental",2,3,3,"","play: draw 1",S("shapeshift","shapeshift+draw",["Rime Watcher","Bedrock Wall","Conduit Keeper"])));
  add(Cr("Quicksilver Serpent",3,4,4,"","death: draw 1",S("shapeshift","shapeshift+draw",["Coral Warden","Grove Shaper","Voltage Hound"])));
  add(Sp("Quicksilver Gift",2,"play: swap t; buff t 1 1",S("shapeshift","shapeshift+draw",["Flowing Wisdom","Overgrowth","Arc Lash"],{tgt:"o"})));
  add(Sp("Mercurial Torrent",2,"play: draw 1",S("shapeshift","shapeshift+draw",["Soothing Rain","Quake","Spark Surge"])));
  add(Sp("Changing Storm",1,"play: swap t; buff t 1 1",S("shapeshift","shapeshift+draw",["Ebb and Flow","Earthen Blessing","Charge Conduit"],{tgt:"o"})));
  add(Re("Shifting Feint",2,"play: swap t",S("shapeshift","shapeshift+draw",["Dispel","Rock Shield","Surge Shield"],{tgt:"eatk"})));
  add(Re("Changing Snap",2,"play: draw 1; buff t 0 2 tmp",S("shapeshift","shapeshift+draw",["Frost Snap","Earthen Ward","Surge Shield"],{tgt:"o"})));
  add(Au("Quicksilver Field",2,"start: summon blob 1",S("shapeshift","shapeshift+draw",["Sea of Clarity","Mountain's Patience","Charged Coil"])));
  add(Au("Mercurial Shrine",3,"start: summon blob 1",S("shapeshift","shapeshift+draw",["Healing Spring","Fortress Walls","Lightning Rod"])));
  setR("u");
  add(Cr("Liquid Golem",4,5,5,"","play: transform t blob",S("shapeshift","shapeshift+draw",["Pearl Sovereign","Cavern Troll","Spark Golem"],{tgt:"e:cost<=3"})));
  add(Cr("Shifting Elemental",4,5,5,"","play: draw 2",S("shapeshift","shapeshift+draw",["Coral Hydra","Basalt Champion","Lightning Elemental"])));
  add(Cr("Changing Elemental",4,5,5,"","spell: draw 1",S("shapeshift","shapeshift+draw",["Abyssal Lurker","Jade Behemoth","Galvanic Sentinel"])));
  add(Cr("Shifting Serpent",3,4,4,"","start: swap self",S("shapeshift","shapeshift+draw",["Mistborn Assassin","Rune-Carved Golem","Tempest Runner"])));
  add(Sp("Mirrored Rite",3,"play: draw 1; heal 2",S("shapeshift","shapeshift+draw",["Cold Snap","Unyielding Earth","Forked Lightning"])));
  add(Sp("Molten-silver Surge",2,"play: swap t; buff t 1 1",S("shapeshift","shapeshift+draw",["Crashing Wave","Fault Line","Overload Strike"],{tgt:"o"})));
  add(Re("Alloyed Feint",3,"play: swap t",S("shapeshift","shapeshift+draw",["Reverse Current","Tremor Trap","Shockwave Counter"],{tgt:"eatk"})));
  add(Au("Quicksilver Grove",3,"spell: draw 1",S("shapeshift","shapeshift+draw",["Tidal Mastery","Sacred Grove","Storm God's Altar"])));
  setR("r");
  add(Cr("Fluid Imp",6,8,8,"","play: draw 1",S("shapeshift","shapeshift+draw",["Leviathan Elder","Primordial Titan","Storm Titan"])));
  add(Cr("Changing Serpent",6,8,8,"","play: transform t blob",S("shapeshift","shapeshift+draw",["Deep One Elder","Avalanche Titan","Spark Matriarch"],{tgt:"e:cost<=2"})));
  add(Cr("Quicksilver Golem",5,7,7,"","play: copy self 1",S("shapeshift","shapeshift+draw",["Deepsea Hydra","Gaia's Avatar","Static Overlord"])));
  add(Sp("Mercurial Rite",5,"play: draw 3",S("shapeshift","shapeshift+draw",["Glacial Cataclysm","Seismic Devastation","Ion Storm"])));
  add(Re("Mercurial Riposte",4,"play: swap t",S("shapeshift","shapeshift+draw",["Reverse Current","Stone Aegis","Thunder Trap"],{tgt:"eatk"})));
  add(Au("Mirrored Shrine",4,"start: transform weak blob",S("shapeshift","shapeshift+draw",["Eternal Winter","Heart of the World","Infinite Battery"])));

  /* ---- mercury (20) ---- */
  setR("c");
  add(Cr("Fluid Sentinel",2,3,3,"","play: transform t blob",S("mercury","shapeshift+buff",["Riverbank Sage","Granite Guard","Capacitor Golem"],{tgt:"e:cost<=2"})));
  add(Cr("Mirrored Spirit",3,4,4,"","play: buff self 1 1",S("mercury","shapeshift+buff",["Bubble Mage","Rampart Elder","Arc Apprentice"])));
  add(Cr("Alloyed Imp",2,3,3,"","attack: buff self 1 0 tmp",S("mercury","shapeshift+buff",["Kelp Lurker","Stonecaller","Flicker Mage"])));
  add(Cr("Mercurial Weaver",3,4,4,"","play: swap self",S("mercury","shapeshift+buff",["Reef Guardian","Quarry Shaman","Storm Caller"])));
  add(Cr("Quicksilver Spirit",1,2,2,"","attack: buff self 1 0 tmp",S("mercury","shapeshift+buff",["Brook Otter","Pebble Golem","Thunder Imp"])));
  add(Sp("Changing Rain",1,"play: buff t 1 0; kw t pierce",S("mercury","shapeshift+buff",["Shatter","Stone Skin","Quick Study"],{tgt:"o"})));
  add(Sp("Flowing Gift",1,"play: buff t 1 1",S("mercury","shapeshift+buff",["Tidal Insight","Boulder Toss","Crackle"],{tgt:"o"})));
  add(Re("Alloyed Riposte",2,"play: buff t 1 1 tmp",S("mercury","shapeshift+buff",["Chill","Rock Shield","Blitz"],{tgt:"oatk"})));
  add(Re("Changing Ward",1,"play: swap t",S("mercury","shapeshift+buff",["Undertow","Earthen Ward","Shock Reflex"],{tgt:"eatk"})));
  add(Au("Quicksilver Altar",3,"start: summon blob 1",S("mercury","shapeshift+buff",["Permafrost Shrine","Ley Line","Storm Battery"])));
  add(Au("Shifting Font",2,"start: summon blob 1",S("mercury","shapeshift+buff",["Tidal Archive","Mountain's Patience","Overload Coil"])));
  setR("u");
  add(Cr("Changing Weaver",5,6,7,"","creature: buff self 1 1",S("mercury","shapeshift+buff",["Frost Giant","Mountain Strider","Conduit Colossus"])));
  add(Cr("Flowing Shaman",4,5,5,"","play: swap t",S("mercury","shapeshift+buff",["Siren of the Shoals","Ancient Guardian","Spark Swarm Mage"],{tgt:"o"})));
  add(Cr("Alloyed Familiar",3,4,4,"","start: swap self",S("mercury","shapeshift+buff",["Wavecrest Mage","Earthshaker Ogre","Pulse Mage"])));
  add(Sp("Changing Gift",3,"play: transform t blob",S("mercury","shapeshift+buff",["Great Ebb","Seismic Pulse","Overload Cascade"],{tgt:"e:cost<=3"})));
  add(Sp("Changing Rite",2,"play: buff own 1 1",S("mercury","shapeshift+buff",["Deep Insight","Rockslide","Surge of Power"])));
  add(Re("Mercurial Feint",3,"play: buff t 2 2 tmp",S("mercury","shapeshift+buff",["Whiplash Tide","Stone Aegis","Lightning Reflexes"],{tgt:"oatk"})));
  add(Au("Shifting Grove",2,"start: buff ostr 1 1",S("mercury","shapeshift+buff",["Tidal Mastery","Sacred Grove","Overload Coil"])));
  setR("r");
  add(Cr("Mirrored Caller",5,7,7,"","play: swap t",S("mercury","shapeshift+buff",["Shoal Leviathan","Crystal Dragon","Charged Juggernaut"],{tgt:"o"})));
  add(Cr("Mirrored Scout",6,8,8,"","play: copy self 1",S("mercury","shapeshift+buff",["Deepsea Hydra","Primordial Titan","Volt Dragon"])));
  add(Sp("Mercurial Call",4,"play: buff t 4 0; kw t pierce",S("mercury","shapeshift+buff",["Glacial Torrent","Seismic Devastation","Thunderous Cascade"],{tgt:"o"})));
  add(Re("Flowing Recoil",4,"play: swap t",S("mercury","shapeshift+buff",["Frozen Moment","Tremor Trap","Thunder Trap"],{tgt:"eatk"})));
  add(Au("Flowing Banner",5,"static: lord all 1 1",S("mercury","shapeshift+buff",["Eternal Winter","Heart of the World","Tesla Coil"])));

  /* ---- alloy (20) ---- */
  setR("c");
  add(Cr("Mercurial Colossus",3,3,5,"","death: fort own 1",S("alloy","barrier+fortify",["Frostbite Shade","Bulwark Golem","Tesla Knight"])));
  add(Cr("Shifting Giant",2,2,4,"","play: fort t 1",S("alloy","barrier+fortify",["Pearl Diver","Thornback Boar","Volt Runner"],{tgt:"o"})));
  add(Cr("Changing Giant",2,2,4,"","play: kw t barrier",S("alloy","barrier+fortify",["Tidepool Healer","Spiked Barricade","Lightning Courier"],{tgt:"o"})));
  add(Cr("Mercurial Wall",1,1,3,"","death: fort own 1",S("alloy","barrier+fortify",["Tide Sprite","Crystal Sprout","Plasma Sprite"])));
  add(Cr("Quicksilver Colossus",2,2,4,"","play: fort self 1",S("alloy","barrier+fortify",["Mist Weaver","Burrow Mole","Arc Duelist"])));
  add(Sp("Fluid Storm",1,"play: fort own 1",S("alloy","barrier+fortify",["Ebb and Flow","Fertile Ground","Overclock"])));
  add(Sp("Alloyed Rain",2,"play: kw own barrier",S("alloy","barrier+fortify",["Frozen Tomb","Unearth","Static Bolt"])));
  add(Re("Shifting Flash",1,"play: fort t 2",S("alloy","barrier+fortify",["Deflect","Rock Shield","Electrify"],{tgt:"o"})));
  add(Re("Quicksilver Riposte",1,"play: kw t barrier",S("alloy","barrier+fortify",["Tidal Shield","Earthen Ward","Grounding"],{tgt:"o"})));
  add(Au("Mirrored Sanctum",1,"start: kw ostr barrier",S("alloy","barrier+fortify",["Sea of Clarity","Crystal Resonance","Lightning Rod"])));
  setR("u");
  add(Cr("Shifting Watcher",4,3,7,"","creature: kw self barrier",S("alloy","barrier+fortify",["Icewall Colossus","Tremor Lord","Tempest Archon"])));
  add(Cr("Fluid Warden",3,3,5,"","creature: kw self barrier",S("alloy","barrier+fortify",["Kraken Spawn","Geode Shaman","Storm Shaman"])));
  add(Cr("Fluid Watcher",4,3,7,"","start: kw ostr barrier",S("alloy","barrier+fortify",["Siren Queen","Terravore","Galvanic Golem"])));
  add(Sp("Fluid Rain",2,"play: fort own 1",S("alloy","barrier+fortify",["Riptide Reversal","Earth's Fury","Static Burst"])));
  add(Re("Shifting Ward",3,"play: fort t 2",S("alloy","barrier+fortify",["Absolute Zero","Tremor Trap","Shockwave Counter"],{tgt:"o"})));
  add(Au("Liquid Totem",3,"static: lord all 0 1",S("alloy","barrier+fortify",["Ocean's Blessing","Stone Sanctuary","Storm Battery"])));
  setR("r");
  add(Cr("Changing Guardian",5,4,9,"barrier","play: fort own 2",S("alloy","barrier+fortify+barrier",["Leviathan Elder","Diamondhide Wurm","Charged Juggernaut"])));
  add(Cr("Alloyed Sentry",6,5,11,"","play: kw ostr barrier",S("alloy","barrier+fortify",["Coral Titan","Avalanche Titan","Storm Titan"])));
  add(Sp("Fluid Call",6,"play: kw t barrier; buff t 1 1",S("alloy","barrier+fortify",["Glacial Cataclysm","Cataclysmic Quake","Lightning Helix"],{tgt:"o"})));
  add(Re("Flowing Reflex",5,"play: fort t 2",S("alloy","barrier+fortify",["Ice Prison","Stone Aegis","Lightning Reflexes"],{tgt:"o"})));
  add(Au("Fluid Field",4,"start: kw ostr barrier",S("alloy","barrier+fortify",["Ocean's Blessing","Heart of the World","Storm God's Altar"])));

  /* ---- reflection (20) ---- */
  setR("c");
  add(Cr("Mercurial Sentinel",2,3,3,"","death: summon blob 1",S("reflection","mirror+tokens",["Riptide Rogue","Seed Bearer","Raiju"])));
  add(Cr("Mercurial Familiar",2,3,3,"","death: summon mirror 1",S("reflection","mirror+tokens",["Tidecaller Shaman","Crystal Burrower","Capacitor Golem"])));
  add(Cr("Changing Shaman",2,3,3,"","death: summon mirror 1",S("reflection","mirror+tokens",["Winter Mage","Worldroot Sapling","Charge Siphon"])));
  add(Cr("Quicksilver Familiar",2,3,3,"","death: summon mirror 1",S("reflection","mirror+tokens",["Riverbank Sage","Amber Golem","Lightning Courier"])));
  add(Cr("Mercurial Scout",1,2,2,"","play: summon mirror 1",S("reflection","mirror+tokens",["Frost Sprite","Clay Homunculus","Static Sprite"])));
  add(Sp("Alloyed Burst",2,"play: summon mirror 1",S("reflection","mirror+tokens",["Shatter","Quake","Jolt"])));
  add(Sp("Changing Volley",1,"play: summon mirror 1",S("reflection","mirror+tokens",["Whirlpool Trap","Crystalline Growth","Crackle"])));
  add(Re("Liquid Ward",1,"play: silence t",S("reflection","mirror+tokens",["Frozen Aegis","Rock Shield","Blitz"],{tgt:"eatk"})));
  add(Au("Shifting Totem",2,"start: summon mirror 1",S("reflection","mirror+tokens",["Permafrost Shrine","Ley Line","Charged Coil"])));
  setR("u");
  add(Cr("Mirrored Shaman",3,4,4,"","play: silence t",S("reflection","mirror+tokens",["Tideborn Knight","Stoneheart Sentinel","Voltage Engineer"],{tgt:"e"})));
  add(Cr("Alloyed Sentinel",3,4,4,"","start: summon mirror 1",S("reflection","mirror+tokens",["Wave Dancer","Iron Tortoise","Voltage Wraith"])));
  add(Cr("Shifting Spirit",4,5,5,"","death: summon blob 1",S("reflection","mirror+tokens",["Sea Serpent","Golem Patriarch","Thunderclap Adept"])));
  add(Sp("Liquid Volley",2,"play: summon blob 1",S("reflection","mirror+tokens",["Tidal Scroll","Seismic Pulse","Lightning Volley"])));
  add(Re("Alloyed Retort",3,"play: summon mirror 1; buff tok 1 0 tmp",S("reflection","mirror+tokens",["Nullify","Earthen Ward","Grounding"])));
  add(Au("Liquid Font",3,"token: dmg face 1",S("reflection","mirror+tokens",["Tidal Archive","Stone Sanctuary","Infinite Battery"])));
  setR("r");
  add(Cr("Fluid Serpent",5,7,7,"","start: summon blob 2",S("reflection","mirror+tokens",["Wavebreaker Champion","Bedrock Leviathan","Sparkfire Hydra"])));
  add(Cr("Flowing Sentinel",4,5,6,"","play: copy ostr 1",S("reflection","mirror+tokens",["Frostfang Wyrm","Granite Juggernaut","Plasma Lord"])));
  add(Sp("Quicksilver Wave",4,"play: summon mirror 2",S("reflection","mirror+tokens",["Glacial Torrent","Seismic Devastation","Ion Storm"])));

  /* ---- liquidmetal (15) ---- */
  setR("c");
  add(Cr("Changing Caller",2,3,3,"","play: draw 1",S("liquidmetal","bounce+draw",["Kelp Lurker","Druid of the Stone","Bolt Knight"])));
  add(Cr("Flowing Adept",2,3,3,"","death: draw 1",S("liquidmetal","bounce+draw",["Glacier Wolf","Crag Brute","Volt Runner"])));
  add(Cr("Alloyed Golem",3,4,4,"","death: draw 1",S("liquidmetal","bounce+draw",["Narwhal Lancer","Geode Burrower","Arc Apprentice"])));
  add(Cr("Mercurial Spirit",3,4,4,"","play: bounce t",S("liquidmetal","bounce+draw",["Tide Caller","Canyon Ram","Thunder Wolf"],{tgt:"e:cost<=2"})));
  add(Sp("Mirrored Rain",2,"play: draw 1; energy 1",S("liquidmetal","bounce+draw",["Tidal Insight","Overgrowth","Chain Spark"])));
  add(Re("Flowing Trap",3,"play: draw 2",S("liquidmetal","bounce+draw",["Icy Grip","Rock Shield","Surge Shield"])));
  add(Au("Mirrored Grove",2,"start/hand4: draw 1",S("liquidmetal","bounce+draw",["Tidal Mastery","Fortress Walls","Lightning Rod"])));
  setR("u");
  add(Cr("Molten-silver Caller",4,5,5,"","spell: draw 1",S("liquidmetal","bounce+draw",["Harbor Golem","Ironbark Treant","Thunder Ram"])));
  add(Cr("Liquid Shaman",4,5,5,"","play: bounce t",S("liquidmetal","bounce+draw",["Shiver Elemental","Boulder Hurler","Stormbringer"],{tgt:"e:cost<=3"})));
  add(Sp("Shifting Gift",2,"play: bounce t",S("liquidmetal","bounce+draw",["Healing Torrent","Shatter the Earth","Ball of Thunder"],{tgt:"e"})));
  setR("r");
  add(Cr("Molten-silver Spirit",5,7,7,"","play: bounce t",S("liquidmetal","bounce+draw",["Tidal Archmage","Emerald Wyrm","Lightning Hydra"],{tgt:"o"})));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.QUICKSILVER_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["quicksilver"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
