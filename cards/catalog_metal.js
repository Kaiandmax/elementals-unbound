/* ================= METAL CATALOG (designed confluence cards, generated first draft) =================
   Lightning + Earth. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   plating (25: barrier + fortify), forgework (20: buff + fortify), dynamo (20: draw + fortify), rail (20: burn + fortify), magnet (15: burn + tokens).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [lightning, earth]. */
// Loaded by build.py inside catalogBegin("metal")/catalogEnd("metal") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.METAL_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"metal" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.METAL_CATALOG.push(d); return d; };
  setEl("metal");

  /* ---- plating (25) ---- */
  setR("c");
  add(Cr("Bolted Serpent",2,2,3,"barrier","play: fort t 1",S("plating","barrier+fortify+barrier",["Flicker Mage","Seed Bearer"],{tgt:"o"})));
  add(Cr("Plated Scout",2,3,3,"","play: fort t 1",S("plating","barrier+fortify",["Capacitor Golem","Thornback Boar"],{tgt:"o"})));
  add(Cr("Iron Sentinel",3,3,4,"barrier","death: fort own 1",S("plating","barrier+fortify+barrier",["Bolt Thrower","Geode Burrower"])));
  add(Cr("Steel Imp",3,3,4,"barrier","play: fort t 1",S("plating","barrier+fortify+barrier",["Voltage Hound","Bulwark Golem"],{tgt:"o"})));
  add(Cr("Alloy Caller",3,3,4,"barrier","play: kw t barrier",S("plating","barrier+fortify+barrier",["Storm Caller","Ironhide Rhino"],{tgt:"o"})));
  add(Cr("Magnetic Weaver",1,2,2,"","play: kw t barrier",S("plating","barrier+fortify",["Static Sprite","Clay Homunculus"],{tgt:"o"})));
  add(Sp("Forged Storm",2,"play: kw t barrier; buff t 1 1",S("plating","barrier+fortify",["Spark Surge","Overgrowth"],{tgt:"o"})));
  add(Sp("Iron Rite",1,"play: kw own barrier",S("plating","barrier+fortify",["Charge Conduit","Earthen Blessing"])));
  add(Sp("Bolted Ritual",2,"play: kw own barrier",S("plating","barrier+fortify",["Thunder Lance","Quake"])));
  add(Re("Riveted Retort",3,"play: kw t barrier",S("plating","barrier+fortify",["Surge Shield","Rock Shield"],{tgt:"o"})));
  add(Re("Iron Snap",1,"play: fort t 2",S("plating","barrier+fortify",["Blitz","Earthen Ward"],{tgt:"o"})));
  add(Au("Chrome Altar",1,"start: fort ostr 1",S("plating","barrier+fortify",["Lightning Rod","Mountain's Patience"])));
  add(Au("Magnetic Shrine",2,"start: kw ostr barrier",S("plating","barrier+fortify",["Charged Coil","Ley Line"])));
  setR("u");
  add(Cr("Iron Imp",4,5,5,"","play: kw t barrier",S("plating","barrier+fortify",["Spark Golem","Basalt Champion"],{tgt:"o"})));
  add(Cr("Iron Familiar",4,5,5,"","creature: kw self barrier",S("plating","barrier+fortify",["Lightning Elemental","Cavern Troll"])));
  add(Cr("Tempered Spirit",4,4,5,"barrier","creature: kw self barrier",S("plating","barrier+fortify+barrier",["Galvanic Sentinel","Jade Behemoth"])));
  add(Cr("Alloy Spirit",4,4,5,"barrier","death: fort own 1",S("plating","barrier+fortify+barrier",["Galvanic Golem","Ancient Guardian"])));
  add(Sp("Chrome Rite",2,"play: kw own barrier",S("plating","barrier+fortify",["Static Burst","Seismic Pulse"])));
  add(Sp("Chrome Surge",2,"play: fort t 2; buff t 1 0",S("plating","barrier+fortify",["Lightning Volley","Unyielding Earth"],{tgt:"o"})));
  add(Re("Riveted Snap",4,"play: kw t barrier",S("plating","barrier+fortify",["Shockwave Counter","Tremor Trap"],{tgt:"o"})));
  add(Au("Chrome Totem",3,"static: lord all 0 1",S("plating","barrier+fortify",["Infinite Battery","Sacred Grove"])));
  setR("r");
  add(Cr("Tempered Weaver",5,7,7,"","play: kw ostr barrier",S("plating","barrier+fortify",["Charged Juggernaut","Bedrock Leviathan"])));
  add(Cr("Forged Weaver",5,6,7,"barrier","death: fort own 1",S("plating","barrier+fortify+barrier",["Volt Dragon","Crystal Dragon"])));
  add(Cr("Riveted Imp",5,6,7,"barrier","play: kw t barrier",S("plating","barrier+fortify+barrier",["Static Overlord","Diamondhide Wurm"],{tgt:"o"})));
  add(Sp("Chrome Ritual",4,"play: kw own barrier",S("plating","barrier+fortify",["Ion Storm","Seismic Devastation"])));
  add(Re("Forged Snap",3,"play: fort t 1; buff t 1 1 tmp",S("plating","barrier+fortify",["Lightning Reflexes","Stone Aegis"],{tgt:"o"})));
  add(Au("Iron Shrine",5,"static: grant all barrier",S("plating","barrier+fortify",["Tesla Coil","Heart of the World"])));

  /* ---- forgework (20) ---- */
  setR("c");
  add(Cr("Iron Weaver",1,2,2,"","play: buff ostr 1 1",S("forgework","buff+fortify",["Spark Mite","Pebble Golem"])));
  add(Cr("Magnetic Imp",2,3,3,"","attack: buff self 1 0 tmp",S("forgework","buff+fortify",["Volt Runner","Bedrock Wall"])));
  add(Cr("Bolted Familiar",3,4,4,"","play: fort t 1",S("forgework","buff+fortify",["Arc Apprentice","Cliffside Watcher"],{tgt:"o"})));
  add(Cr("Tempered Serpent",1,2,2,"","death: fort own 1",S("forgework","buff+fortify",["Volt Hopper","Stone Sentry"])));
  add(Cr("Iron Shaman",1,2,2,"","play: fort t 1",S("forgework","buff+fortify",["Plasma Sprite","Root Tender"],{tgt:"o"})));
  add(Sp("Chrome Call",2,"play: buff t 1 1",S("forgework","buff+fortify",["Chain Spark","Rockslide"],{tgt:"o"})));
  add(Sp("Steel Blast",2,"play: buff t 2 0; kw t pierce",S("forgework","buff+fortify",["Static Bolt","Fault Line"],{tgt:"o"})));
  add(Re("Tempered Feint",2,"play: fort t 2",S("forgework","buff+fortify",["Shock Reflex","Rock Shield"],{tgt:"o"})));
  add(Re("Magnetic Flash",1,"play: buff t 1 1 tmp",S("forgework","buff+fortify",["Grounding","Earthen Ward"],{tgt:"oatk"})));
  add(Au("Bolted Totem",1,"start: buff ostr 2 0 tmp",S("forgework","buff+fortify",["Lightning Rod","Crystal Resonance"])));
  add(Au("Chrome Engine",2,"start: buff ostr 2 0 tmp",S("forgework","buff+fortify",["Overload Coil","Fortress Walls"])));
  setR("u");
  add(Cr("Forged Elemental",4,5,5,"","attack: buff self 1 0 tmp",S("forgework","buff+fortify",["Thunderhead Golem","Tremor Lord"])));
  add(Cr("Forged Caller",3,4,4,"","play: buff self 1 1",S("forgework","buff+fortify",["Storm Shaman","Iron Tortoise"])));
  add(Cr("Plated Familiar",4,5,5,"","play: buff ostr 1 1",S("forgework","buff+fortify",["Thunderclap Adept","Boulder Hurler"])));
  add(Sp("Alloy Volley",4,"play: fort t 2; buff t 1 0",S("forgework","buff+fortify",["Forked Lightning","Cataclysmic Quake"],{tgt:"o"})));
  add(Sp("Steel Surge",4,"play: buff own 1 1",S("forgework","buff+fortify",["Thunderous Cascade","Unearth"])));
  add(Re("Plated Feint",3,"play: fort t 2",S("forgework","buff+fortify",["Thunder Trap","Stone Aegis"],{tgt:"o"})));
  add(Au("Bolted Altar",3,"start: buff ostr 1 1",S("forgework","buff+fortify",["Storm God's Altar","Stone Sanctuary"])));
  setR("r");
  add(Cr("Iron Spirit",4,5,6,"","play: buff own 1 1",S("forgework","buff+fortify",["Plasma Lord","Terravore"])));
  add(Cr("Tempered Golem",6,8,8,"","play: buff ostr 1 1",S("forgework","buff+fortify",["Storm Titan","Primordial Titan"])));
  add(Sp("Forged Ritual",3,"play: buff t 3 0; kw t pierce",S("forgework","buff+fortify",["Overload Cascade","Shatter the Earth"],{tgt:"o"})));
  add(Re("Magnetic Reflex",5,"play: buff t 2 2 tmp",S("forgework","buff+fortify",["Thunder Trap","Tremor Trap"],{tgt:"o"})));
  add(Au("Magnetic Altar",6,"start: fort ostr 1",S("forgework","buff+fortify",["Storm Battery","Heart of the World"])));

  /* ---- dynamo (20) ---- */
  setR("c");
  add(Cr("Riveted Weaver",2,3,3,"","play: fort t 1",S("dynamo","draw+fortify",["Lightning Courier","Stonecaller"],{tgt:"o"})));
  add(Cr("Tempered Scout",1,2,2,"","play: fort self 1",S("dynamo","draw+fortify",["Volt Hopper","Crystal Sprout"])));
  add(Cr("Chrome Sentinel",2,3,3,"","play: fort self 1",S("dynamo","draw+fortify",["Conduit Keeper","Granite Guard"])));
  add(Cr("Steel Elemental",2,2,3,"vigilant","play: fort t 1",S("dynamo","draw+fortify+vigilant",["Charge Siphon","Burrow Mole"],{tgt:"o"})));
  add(Cr("Iron Adept",2,3,3,"","death: fort own 1",S("dynamo","draw+fortify",["Raiju","Crystal Burrower"])));
  add(Sp("Iron Rain",2,"play: draw 1; heal 2",S("dynamo","draw+fortify",["Arc Lash","Quake"])));
  add(Sp("Riveted Blast",2,"play: fort t 2; buff t 1 0",S("dynamo","draw+fortify",["Overcharge Blast","Stone Skin"],{tgt:"o"})));
  add(Re("Riveted Trap",1,"play: fort t 1; buff t 1 1 tmp",S("dynamo","draw+fortify",["Electrify","Rock Shield"],{tgt:"o"})));
  add(Re("Steel Ward",1,"play: draw 1; buff t 0 2 tmp",S("dynamo","draw+fortify",["Electrify","Stone Aegis"],{tgt:"o"})));
  add(Au("Chrome Beacon",2,"end: draw 1",S("dynamo","draw+fortify",["Charged Coil","Fortress Walls"])));
  setR("u");
  add(Cr("Bolted Weaver",4,5,5,"","play: fort t 1",S("dynamo","draw+fortify",["Spark Swarm Mage","Earthquake Beetle"],{tgt:"o"})));
  add(Cr("Chrome Serpent",4,4,5,"vigilant","spell: draw 1",S("dynamo","draw+fortify+vigilant",["Lightning Hydra","Mountain Guardian"])));
  add(Cr("Bolted Shaman",3,4,4,"","play: draw 2",S("dynamo","draw+fortify",["Pulse Mage","Geode Shaman"])));
  add(Sp("Tempered Torrent",3,"play: fort t 2; buff t 1 0",S("dynamo","draw+fortify",["Battery Dump","Avalanche Shard"],{tgt:"o"})));
  add(Re("Plated Retort",3,"play: fort t 2",S("dynamo","draw+fortify",["Shockwave Counter","Earthen Ward"],{tgt:"o"})));
  add(Au("Plated Font",3,"end: draw 1",S("dynamo","draw+fortify",["Storm God's Altar","Sacred Grove"])));
  setR("r");
  add(Cr("Alloy Scout",5,6,7,"vigilant","play: fort t 1",S("dynamo","draw+fortify+vigilant",["Spark Matriarch","Gaia's Avatar"],{tgt:"o"})));
  add(Cr("Riveted Sentinel",6,7,8,"vigilant","death: fort own 1",S("dynamo","draw+fortify+vigilant",["Storm Titan","Avalanche Titan"])));
  add(Sp("Alloy Gift",3,"play: draw 2",S("dynamo","draw+fortify",["Ball of Thunder","Earth's Fury"])));
  add(Re("Alloy Recoil",3,"play: fort t 2",S("dynamo","draw+fortify",["Lightning Reflexes","Tremor Trap"],{tgt:"o"})));
  add(Au("Steel Field",4,"start: draw 1 | static: bank 2",S("dynamo","draw+fortify",["Infinite Battery","Heart of the World"])));

  /* ---- rail (20) ---- */
  setR("c");
  add(Cr("Steel Raider",3,5,3,"","death: fort own 1",S("rail","burn+fortify",["Tesla Knight","Rampart Elder"])));
  add(Cr("Chrome Lancer",3,4,3,"haste","death: fort own 1",S("rail","burn+fortify+haste",["Voltage Wraith","Quarry Shaman"])));
  add(Cr("Riveted Wolf",2,3,3,"","play: fort t 1",S("rail","burn+fortify",["Bolt Knight","Spiked Barricade"],{tgt:"o"})));
  add(Cr("Chrome Charger",1,2,2,"","play: dmg face 1",S("rail","burn+fortify",["Thunder Imp","Pebble Golem"])));
  add(Cr("Iron Brute",2,3,3,"","death: dmg all_e 1",S("rail","burn+fortify",["Arc Duelist","Amber Golem"])));
  add(Sp("Iron Wave",2,"play: fort t 2; buff t 1 0",S("rail","burn+fortify",["Jolt","Fertile Ground"],{tgt:"o"})));
  add(Sp("Steel Call",1,"play: fort own 1",S("rail","burn+fortify",["Overclock","Boulder Toss"])));
  add(Re("Tempered Trap",1,"play: dmg t 2",S("rail","burn+fortify",["Blitz","Rock Shield"],{tgt:"eatk"})));
  add(Au("Alloy Engine",2,"start: zaps 1 1",S("rail","burn+fortify",["Overload Coil","Mountain's Patience"])));
  setR("u");
  add(Cr("Tempered Drake",4,5,4,"haste","die: fort own 1",S("rail","burn+fortify+haste",["Stormbringer","Golem Patriarch"])));
  add(Cr("Plated Reaver",3,5,3,"","edie: buff self 1 1",S("rail","burn+fortify",["Thunder Wolf","Earthshaker Ogre"])));
  add(Cr("Plated Lancer",3,4,3,"haste","start: fort ostr 1",S("rail","burn+fortify+haste",["Voltage Engineer","Stoneheart Sentinel"])));
  add(Sp("Magnetic Call",2,"play: dmg all_e 1",S("rail","burn+fortify",["Surge of Power","Petrify"])));
  add(Re("Bolted Guard",2,"play: dmg t 3",S("rail","burn+fortify",["Surge Shield","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Plated Engine",3,"start: fort ostr 1",S("rail","burn+fortify",["Storm Battery","Sacred Grove"])));
  setR("r");
  add(Cr("Chrome Falcon",6,7,6,"haste","play: fort self 1",S("rail","burn+fortify+haste",["Sparkfire Hydra","Primordial Titan"])));
  add(Cr("Riveted Drake",6,6,6,"haste","attack: dmg face 1",S("rail","burn+fortify+haste",["Conduit Colossus","Avalanche Titan"])));
  add(Sp("Plated Storm",5,"play: fort t 2; buff t 1 0",S("rail","burn+fortify",["Lightning Helix","Seismic Devastation"],{tgt:"o"})));

  /* ---- magnet (15) ---- */
  setR("c");
  add(Cr("Riveted Hound",3,4,3,"pierce","death: dmg all_e 1",S("magnet","burn+tokens+pierce",["Tempest Runner","Grove Shaper"])));
  add(Cr("Magnetic Drake",2,3,3,"","play: summon drone 1",S("magnet","burn+tokens",["Conduit Keeper","Worldroot Sapling"])));
  add(Cr("Forged Duelist",2,3,3,"","play: dmg t 2",S("magnet","burn+tokens",["Capacitor Golem","Bedrock Wall"],{tgt:"e"})));
  add(Cr("Bolted Wolf",2,3,3,"","attack: dmg face 1",S("magnet","burn+tokens",["Flicker Mage","Stonecaller"])));
  add(Sp("Tempered Surge",1,"play: summon drone 1; buff tok 1 0 tmp",S("magnet","burn+tokens",["Quick Study","Boulder Toss"])));
  add(Re("Riveted Recoil",2,"play: summon drone 1",S("magnet","burn+tokens",["Blitz","Stone Aegis"])));
  add(Au("Riveted Beacon",2,"end: summon drone 1",S("magnet","burn+tokens",["Lightning Rod","Ley Line"])));
  setR("u");
  add(Cr("Bolted Drake",3,5,3,"","attack: dmg face 1",S("magnet","burn+tokens",["Sky Lightning Roc","Quartz Elemental"])));
  add(Cr("Steel Brute",5,8,5,"","play: dmg t 3",S("magnet","burn+tokens",["Galvanized Brute","Mountain Strider"],{tgt:"e"})));
  add(Sp("Alloy Storm",4,"play: summon drone 2; buff tok 1 0 tmp",S("magnet","burn+tokens",["Ion Storm","Unearth"])));
  setR("r");
  add(Cr("Magnetic Brute",5,8,6,"","death: summon drone 1",S("magnet","burn+tokens",["Capacitor Titan","Granite Juggernaut"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.METAL_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["metal"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
