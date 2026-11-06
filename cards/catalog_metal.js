/* ================= METAL CATALOG (designed confluence cards, generated first draft) =================
   Lightning + Earth. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   plating (25: barrier + burn), forgework (20: buff + fortify), dynamo (20: fortify + burn), rail (20: burn + fortify), magnet (15: burn + tokens).
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
  add(Cr("Bolted Charger",2,3,2,"barrier","death: dmg all_e 1",S("plating","barrier+burn+barrier",["Flicker Mage","Seed Bearer"])));
  add(Cr("Plated Falcon",2,3,3,"","death: dmg all_e 1",S("plating","barrier+burn",["Capacitor Golem","Thornback Boar"])));
  add(Cr("Iron Lancer",3,4,3,"barrier","play: dmg face 1",S("plating","barrier+burn+barrier",["Bolt Thrower","Geode Burrower"])));
  add(Cr("Steel Duelist",3,4,3,"barrier","death: dmg all_e 1",S("plating","barrier+burn+barrier",["Voltage Hound","Bulwark Golem"])));
  add(Cr("Alloy Brute",3,4,3,"barrier","play: kw t barrier",S("plating","barrier+burn+barrier",["Storm Caller","Ironhide Rhino"],{tgt:"o"})));
  add(Cr("Magnetic Hawk",1,2,2,"","play: dmg t 1",S("plating","barrier+burn",["Static Sprite","Clay Homunculus"],{tgt:"e"})));
  add(Sp("Forged Storm",2,"play: kw t barrier; buff t 1 1",S("plating","barrier+burn",["Spark Surge","Overgrowth"],{tgt:"o"})));
  add(Sp("Iron Rite",1,"play: dmg t 2",S("plating","barrier+burn",["Charge Conduit","Earthen Blessing"],{tgt:"e"})));
  add(Sp("Bolted Ritual",2,"play: dmg t 3",S("plating","barrier+burn",["Thunder Lance","Quake"],{tgt:"e"})));
  add(Re("Riveted Retort",3,"play: kw t barrier",S("plating","barrier+burn",["Surge Shield","Rock Shield"],{tgt:"o"})));
  add(Re("Iron Snap",1,"play: dmg t 2",S("plating","barrier+burn",["Blitz","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Chrome Altar",1,"end: dmg face 1",S("plating","barrier+burn",["Lightning Rod","Mountain's Patience"])));
  add(Au("Magnetic Shrine",2,"start: kw ostr barrier",S("plating","barrier+burn",["Charged Coil","Ley Line"])));
  setR("u");
  add(Cr("Iron Duelist",4,6,4,"","play: kw t barrier",S("plating","barrier+burn",["Spark Golem","Basalt Champion"],{tgt:"o"})));
  add(Cr("Iron Wolf",4,6,4,"","creature: kw self barrier",S("plating","barrier+burn",["Lightning Elemental","Cavern Troll"])));
  add(Cr("Tempered Drake",4,5,4,"barrier","start: zaps 1 2",S("plating","barrier+burn+barrier",["Galvanic Sentinel","Jade Behemoth"])));
  add(Cr("Alloy Drake",4,5,4,"barrier","play: dmg face 1",S("plating","barrier+burn+barrier",["Galvanic Golem","Ancient Guardian"])));
  add(Sp("Chrome Rite",2,"play: dmg t 3",S("plating","barrier+burn",["Static Burst","Seismic Pulse"],{tgt:"e"})));
  add(Sp("Chrome Surge",2,"play: dmg t 2",S("plating","barrier+burn",["Lightning Volley","Unyielding Earth"],{tgt:"ea"})));
  add(Re("Riveted Snap",4,"play: kw t barrier",S("plating","barrier+burn",["Shockwave Counter","Tremor Trap"],{tgt:"o"})));
  add(Au("Chrome Totem",3,"static: lord all 0 1",S("plating","barrier+burn",["Infinite Battery","Sacred Grove"])));
  setR("r");
  add(Cr("Tempered Hawk",5,8,6,"","attack: dmg all_e 1",S("plating","barrier+burn",["Charged Juggernaut","Bedrock Leviathan"])));
  add(Cr("Forged Hawk",5,8,5,"barrier","play: dmg face 1",S("plating","barrier+burn+barrier",["Volt Dragon","Crystal Dragon"])));
  add(Cr("Riveted Duelist",5,8,5,"barrier","play: kw t barrier",S("plating","barrier+burn+barrier",["Static Overlord","Diamondhide Wurm"],{tgt:"o"})));
  add(Sp("Chrome Ritual",4,"play: dmg t 6",S("plating","barrier+burn",["Ion Storm","Seismic Devastation"],{tgt:"e"})));
  add(Re("Forged Snap",3,"play: dmg t 3",S("plating","barrier+burn",["Lightning Reflexes","Stone Aegis"],{tgt:"ea"})));
  add(Au("Iron Shrine",5,"static: grant all barrier",S("plating","barrier+burn",["Tesla Coil","Heart of the World"])));

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
  add(Cr("Riveted Hawk",2,3,3,"","attack: dmg face 1",S("dynamo","fortify+burn",["Lightning Courier","Stonecaller"])));
  add(Cr("Tempered Falcon",1,2,2,"","play: dmg t 1",S("dynamo","fortify+burn",["Volt Hopper","Crystal Sprout"],{tgt:"e"})));
  add(Cr("Chrome Lancer",2,3,3,"","play: dmg t 2",S("dynamo","fortify+burn",["Conduit Keeper","Granite Guard"],{tgt:"e"})));
  add(Cr("Steel Striker",2,3,2,"pierce","attack: dmg face 1",S("dynamo","fortify+burn+pierce",["Charge Siphon","Burrow Mole"])));
  add(Cr("Iron Raider",2,3,3,"","death: dmg all_e 1",S("dynamo","fortify+burn",["Raiju","Crystal Burrower"])));
  add(Sp("Iron Rain",2,"play: dmg t 2",S("dynamo","fortify+burn",["Arc Lash","Quake"],{tgt:"ea"})));
  add(Sp("Riveted Blast",2,"play: dmg t 2",S("dynamo","fortify+burn",["Overcharge Blast","Stone Skin"],{tgt:"ea"})));
  add(Re("Riveted Trap",1,"play: dmg t 1",S("dynamo","fortify+burn",["Electrify","Rock Shield"],{tgt:"ea"})));
  add(Re("Steel Ward",1,"play: fort t 1; buff t 1 1 tmp",S("dynamo","fortify+burn",["Electrify","Stone Aegis"],{tgt:"o"})));
  add(Au("Chrome Beacon",2,"start: zaps 1 1",S("dynamo","fortify+burn",["Charged Coil","Fortress Walls"])));
  setR("u");
  add(Cr("Iron Reaver",4,6,4,"","attack: dmg face 1",S("dynamo","fortify+burn",["Spark Swarm Mage","Earthquake Beetle"])));
  add(Cr("Chrome Charger",4,5,4,"vigilant","die: fort own 1",S("dynamo","fortify+burn+vigilant",["Lightning Hydra","Mountain Guardian"])));
  add(Cr("Bolted Hound",3,5,3,"","start: zaps 1 2",S("dynamo","fortify+burn",["Pulse Mage","Geode Shaman"])));
  add(Sp("Tempered Torrent",3,"play: dmg all_e 1",S("dynamo","fortify+burn",["Battery Dump","Avalanche Shard"])));
  add(Re("Plated Retort",3,"play: dmg t 4",S("dynamo","fortify+burn",["Shockwave Counter","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Plated Font",3,"start: zaps 1 1",S("dynamo","fortify+burn",["Storm God's Altar","Sacred Grove"])));
  setR("r");
  add(Cr("Bolted Reaver",5,8,5,"pierce","attack: dmg face 1",S("dynamo","fortify+burn+pierce",["Spark Matriarch","Gaia's Avatar"])));
  add(Cr("Forged Hound",6,9,6,"vigilant","play: dmg t 3",S("dynamo","fortify+burn+vigilant",["Storm Titan","Avalanche Titan"],{tgt:"e"})));
  add(Sp("Alloy Gift",3,"play: fort t 2; buff t 1 0",S("dynamo","fortify+burn",["Ball of Thunder","Earth's Fury"],{tgt:"o"})));
  add(Re("Alloy Recoil",3,"play: dmg t 5",S("dynamo","fortify+burn",["Lightning Reflexes","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Steel Field",4,"start: fort own 1",S("dynamo","fortify+burn",["Infinite Battery","Heart of the World"])));

  /* ---- rail (20) ---- */
  setR("c");
  add(Cr("Steel Raider",3,5,3,"","death: fort own 1",S("rail","burn+fortify",["Tesla Knight","Rampart Elder"])));
  add(Cr("Riveted Drake",3,4,3,"haste","death: fort own 1",S("rail","burn+fortify+haste",["Voltage Wraith","Quarry Shaman"])));
  add(Cr("Riveted Wolf",2,3,3,"","play: fort t 1",S("rail","burn+fortify",["Bolt Knight","Spiked Barricade"],{tgt:"o"})));
  add(Cr("Riveted Hound",1,2,2,"","play: dmg face 1",S("rail","burn+fortify",["Thunder Imp","Pebble Golem"])));
  add(Cr("Iron Brute",2,3,3,"","death: dmg all_e 1",S("rail","burn+fortify",["Arc Duelist","Amber Golem"])));
  add(Sp("Iron Wave",2,"play: fort t 2; buff t 1 0",S("rail","burn+fortify",["Jolt","Fertile Ground"],{tgt:"o"})));
  add(Sp("Steel Call",1,"play: fort own 1",S("rail","burn+fortify",["Overclock","Boulder Toss"])));
  add(Re("Tempered Trap",1,"play: dmg t 2",S("rail","burn+fortify",["Blitz","Rock Shield"],{tgt:"eatk"})));
  add(Au("Alloy Engine",2,"start: zaps 1 1",S("rail","burn+fortify",["Overload Coil","Mountain's Patience"])));
  setR("u");
  add(Cr("Steel Reaver",4,5,4,"haste","die: fort own 1",S("rail","burn+fortify+haste",["Stormbringer","Golem Patriarch"])));
  add(Cr("Plated Reaver",3,5,3,"","edie: buff self 1 1",S("rail","burn+fortify",["Thunder Wolf","Earthshaker Ogre"])));
  add(Cr("Plated Lancer",3,4,3,"haste","start: fort ostr 1",S("rail","burn+fortify+haste",["Voltage Engineer","Stoneheart Sentinel"])));
  add(Sp("Magnetic Call",2,"play: dmg all_e 1",S("rail","burn+fortify",["Surge of Power","Petrify"])));
  add(Re("Bolted Guard",2,"play: dmg t 3",S("rail","burn+fortify",["Surge Shield","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Plated Engine",3,"start: fort ostr 1",S("rail","burn+fortify",["Storm Battery","Sacred Grove"])));
  setR("r");
  add(Cr("Chrome Falcon",6,7,6,"haste","play: fort self 1",S("rail","burn+fortify+haste",["Sparkfire Hydra","Primordial Titan"])));
  add(Cr("Riveted Charger",6,6,6,"haste","attack: dmg face 1",S("rail","burn+fortify+haste",["Conduit Colossus","Avalanche Titan"])));
  add(Sp("Plated Storm",5,"play: fort t 2; buff t 1 0",S("rail","burn+fortify",["Lightning Helix","Seismic Devastation"],{tgt:"o"})));

  /* ---- magnet (15) ---- */
  setR("c");
  add(Cr("Plated Hound",3,4,3,"pierce","death: dmg all_e 1",S("magnet","burn+tokens+pierce",["Tempest Runner","Canyon Ram"])));
  add(Cr("Riveted Brute",2,3,2,"pierce","play: dmg t 2",S("magnet","burn+tokens+pierce",["Flicker Mage","Druid of the Stone"],{tgt:"e"})));
  add(Cr("Steel Wolf",2,3,2,"pierce","play: summon drone 1",S("magnet","burn+tokens+pierce",["Capacitor Golem","Bedrock Wall"])));
  add(Cr("Bolted Wolf",2,3,3,"","attack: dmg face 1",S("magnet","burn+tokens",["Volt Runner","Worldroot Sapling"])));
  add(Sp("Tempered Surge",1,"play: summon drone 1; buff tok 1 0 tmp",S("magnet","burn+tokens",["Quick Study","Boulder Toss"])));
  add(Re("Riveted Recoil",2,"play: summon drone 1",S("magnet","burn+tokens",["Blitz","Stone Aegis"])));
  add(Au("Riveted Beacon",2,"end: summon drone 1",S("magnet","burn+tokens",["Lightning Rod","Ley Line"])));
  setR("u");
  add(Cr("Bolted Drake",3,5,3,"","attack: dmg face 1",S("magnet","burn+tokens",["Sky Lightning Roc","Rune-Carved Golem"])));
  add(Cr("Steel Brute",5,8,5,"","play: dmg t 3",S("magnet","burn+tokens",["Galvanized Brute","Mountain Strider"],{tgt:"e"})));
  add(Sp("Forged Call",4,"play: summon drone 2",S("magnet","burn+tokens",["Overload Strike","Seismic Devastation"])));
  setR("r");
  add(Cr("Plated Brute",5,8,6,"","attack: dmg all_e 1",S("magnet","burn+tokens",["Charged Juggernaut","Emerald Wyrm"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.METAL_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["metal"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
