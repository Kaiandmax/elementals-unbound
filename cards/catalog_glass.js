/* ================= GLASS CATALOG (designed confluence cards, generated first draft) =================
   Earth + Wind + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   shards (25: barrier + tokens), prismwall (20: barrier + burn), splinter (20: tokens + burn), mirror (20: burn + barrier), fulgurite (15: burn).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [earth, wind, lightning]. */
// Loaded by build.py inside catalogBegin("glass")/catalogEnd("glass") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.GLASS_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"glass" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.GLASS_CATALOG.push(d); return d; };
  setEl("glass");

  /* ---- shards (25) ---- */
  setR("c");
  add(Cr("Prism Elemental",2,2,3,"barrier","play: summon shard 1",S("shards","barrier+tokens+barrier",["Crystal Burrower","Windbreak Guardian","Lightning Courier"])));
  add(Cr("Splintered Caller",3,3,4,"barrier","play: kw ostr barrier",S("shards","barrier+tokens+barrier",["Bulwark Golem","Featherfall Hawk","Bolt Thrower"])));
  add(Cr("Glass Adept",2,2,3,"barrier","play: kw ostr barrier",S("shards","barrier+tokens+barrier",["Thornback Boar","Wind Wanderer","Volt Runner"])));
  add(Cr("Clear Sentinel",3,3,4,"barrier","play: kw ostr barrier",S("shards","barrier+tokens+barrier",["Canyon Ram","Sky Courier","Storm Caller"])));
  add(Cr("Crystal Imp",2,2,3,"barrier","play: kw t barrier",S("shards","barrier+tokens+barrier",["Bedrock Wall","Zephyr Courier","Capacitor Golem"],{tgt:"o"})));
  add(Cr("Glass Shaman",1,2,2,"","play: kw ostr barrier",S("shards","barrier+tokens",["Stone Sentry","Sparrow Scout","Static Sprite"])));
  add(Sp("Mirror Blast",1,"play: summon shard 1; buff tok 1 0 tmp",S("shards","barrier+tokens",["Fertile Ground","Cyclone Kick","Crackle"])));
  add(Sp("Crystal Blast",2,"play: kw own barrier",S("shards","barrier+tokens",["Overgrowth","Zephyr Strike","Chain Spark"])));
  add(Sp("Prism Ritual",1,"play: summon shard 1",S("shards","barrier+tokens",["Stone Skin","Tailwind Rush","Overclock"])));
  add(Re("Glass Recoil",2,"play: summon shard 1; buff tok 1 0 tmp",S("shards","barrier+tokens",["Rock Shield","Crosswind","Surge Shield"])));
  add(Re("Glass Retort",2,"play: kw t barrier; dmg str 1",S("shards","barrier+tokens",["Earthen Ward","Tailwind","Blitz"],{tgt:"o"})));
  add(Au("Glass Shrine",2,"start: kw ostr barrier",S("shards","barrier+tokens",["Ley Line","Jet Stream","Lightning Rod"])));
  add(Au("Splintered Altar",2,"start: summon shard 1",S("shards","barrier+tokens",["Fortress Walls","Sky Temple","Charged Coil"])));
  setR("u");
  add(Cr("Splintered Serpent",5,6,6,"barrier","play: summon shard 2",S("shards","barrier+tokens+barrier",["Mountain Strider","Thunderhawk","Conduit Colossus"])));
  add(Cr("Glass Serpent",3,3,4,"","token: buff self 1 0",S("shards","barrier+tokens",["Cavern Troll","Tornado Elemental","Lightning Elemental"])));
  add(Cr("Glass Golem",6,7,8,"","static: lord tok 1 1",S("shards","barrier+tokens",["Primordial Titan","Cloud Leviathan","Sparkfire Hydra"])));
  add(Cr("Crystal Spirit",2,2,3,"","play: summon shard 1",S("shards","barrier+tokens",["Basalt Champion","Gust Knight","Galvanic Sentinel"],{tgt:"o"})));
  add(Sp("Crystal Burst",3,"play: summon shard 2; buff tok 1 0 tmp",S("shards","barrier+tokens",["Unearth","Gale Barrage","Forked Lightning"])));
  add(Sp("Mirror Rite",3,"play: summon shard 1",S("shards","barrier+tokens",["Seismic Pulse","Updraft Swarm","Battery Dump"])));
  add(Re("Lens Ward",2,"play: kw t barrier; dmg str 1",S("shards","barrier+tokens",["Stone Aegis","Evasive Maneuver","Shockwave Counter"],{tgt:"o"})));
  add(Au("Mirror Beacon",3,"start: kw ostr barrier",S("shards","barrier+tokens",["Sacred Grove","Wind Chimes","Storm God's Altar"])));
  setR("r");
  add(Cr("Splintered Adept",6,7,8,"barrier","static: grant tok barrier | play: summon shard 2",S("shards","barrier+tokens+barrier",["Avalanche Titan","Aerie Matriarch","Storm Titan"])));
  add(Cr("Glass Weaver",5,6,7,"barrier","play: summon shard 1 | death: summon shard 3",S("shards","barrier+tokens+barrier",["Bedrock Leviathan","Cloud Titan","Storm Titan"])));
  add(Cr("Splintered Sentinel",3,3,4,"barrier","token: dmg rnd 1",S("shards","barrier+tokens+barrier",["Diamondhide Wurm","Tempest Dragon","Charged Juggernaut"])));
  add(Sp("Faceted Wave",3,"play: kw own barrier",S("shards","barrier+tokens",["Cataclysmic Quake","Aerial Bombardment","Thunderous Cascade"])));
  add(Re("Mirror Guard",6,"play: summon shard 3",S("shards","barrier+tokens",["Tremor Trap","Vanishing Wind","Lightning Reflexes"])));
  add(Au("Prism Totem",5,"start: summon shard 2",S("shards","barrier+tokens",["Heart of the World","Sky Throne","Storm Battery"])));

  /* ---- prismwall (20) ---- */
  setR("c");
  add(Cr("Glass Colossus",3,2,5,"barrier","death: dmg all_e 1",S("prismwall","barrier+burn+barrier",["Geode Burrower","Harrier Hawk","Tesla Knight"])));
  add(Cr("Prism Bulwark",2,2,3,"barrier","attack: dmg face 1",S("prismwall","barrier+burn+barrier",["Seed Bearer","Kestrel Rider","Conduit Keeper"])));
  add(Cr("Crystal Sentry",2,2,3,"barrier","play: dmg t 2",S("prismwall","barrier+burn+barrier",["Granite Guard","Skyward Scout","Flicker Mage"],{tgt:"e"})));
  add(Cr("Shard Tortoise",1,1,2,"wall","play: kw ostr barrier",S("prismwall","barrier+burn+wall",["Clay Homunculus","Swift Courier","Volt Hopper"])));
  add(Cr("Shard Wall",3,3,5,"","play: kw ostr barrier",S("prismwall","barrier+burn",["Cliffside Watcher","Wind Dancer","Voltage Hound"])));
  add(Sp("Faceted Torrent",1,"play: kw own barrier",S("prismwall","barrier+burn",["Earthen Blessing","Updraft","Quick Study"])));
  add(Sp("Clear Surge",2,"play: dmg all_e 1",S("prismwall","barrier+burn",["Rockslide","Recall Gust","Jolt"])));
  add(Re("Crystal Trap",1,"play: dmg t 1",S("prismwall","barrier+burn",["Rock Shield","Sidestep","Shock Reflex"],{tgt:"ea"})));
  add(Re("Prism Reflex",2,"play: kw t barrier; dmg str 1",S("prismwall","barrier+burn",["Earthen Ward","Perfect Gale","Surge Shield"],{tgt:"o"})));
  add(Au("Lens Shrine",2,"start: zaps 1 1",S("prismwall","barrier+burn",["Mountain's Patience","Jet Stream","Overload Coil"])));
  add(Au("Clear Totem",1,"end: dmg face 1",S("prismwall","barrier+burn",["Crystal Resonance","Sky Temple","Lightning Rod"])));
  setR("u");
  add(Cr("Mirror Giant",2,2,4,"","start: zaps 1 2",S("prismwall","barrier+burn",["Crag Brute","Cirrus Dancer","Arc Duelist"])));
  add(Cr("Crystal Keeper",3,2,7,"wall","play: kw ostr barrier",S("prismwall","barrier+burn+wall",["Jade Behemoth","Raptor of the Peaks","Spark Golem"])));
  add(Cr("Prism Colossus",5,4,9,"","start: dmg rnd 2",S("prismwall","barrier+burn",["Emerald Wyrm","Mountain Eagle","Galvanized Brute"])));
  add(Sp("Mirror Ritual",3,"play: kw own barrier",S("prismwall","barrier+burn",["Unyielding Earth","Tornado","Static Burst"])));
  add(Sp("Glass Rite",2,"play: kw t barrier; buff t 1 1",S("prismwall","barrier+burn",["Fault Line","Skyward Ascent","Surge of Power"],{tgt:"o"})));
  add(Re("Prism Retort",3,"play: kw t barrier; dmg str 1",S("prismwall","barrier+burn",["Tremor Trap","Evasive Maneuver","Thunder Trap"],{tgt:"o"})));
  add(Au("Prism Font",4,"end: dmg face 1",S("prismwall","barrier+burn",["Heart of the World","Eye of Eternity","Storm Battery"])));
  setR("r");
  add(Cr("Crystal Tortoise",6,5,10,"barrier","static: grant all barrier",S("prismwall","barrier+burn+barrier",["Crystal Dragon","Ancient Wind Spirit","Static Overlord"])));
  add(Cr("Shard Keeper",3,3,6,"barrier","start: dmg rnd 2",S("prismwall","barrier+burn+barrier",["Gaia's Avatar","Thunderwing Roc","Spark Matriarch"])));
  add(Sp("Faceted Ritual",5,"play: dmg t 5",S("prismwall","barrier+burn",["Seismic Devastation","Squall Line","Ion Storm"],{tgt:"ea"})));
  add(Re("Shard Feint",4,"play: kw t barrier",S("prismwall","barrier+burn",["Stone Aegis","Perfect Gale","Thunder Trap"],{tgt:"o"})));
  add(Au("Mirror Engine",4,"start: zaps 1 1",S("prismwall","barrier+burn",["Heart of the World","Eye of Eternity","Infinite Battery"])));

  /* ---- splinter (20) ---- */
  setR("c");
  add(Cr("Crystal Wolf",1,2,2,"","death: summon shard 1",S("splinter","tokens+burn",["Root Tender","Gust Sprite","Spark Mite"])));
  add(Cr("Lens Hawk",2,3,3,"","death: dmg all_e 1",S("splinter","tokens+burn",["Stonecaller","Breeze Messenger","Raiju"])));
  add(Cr("Prism Reaver",2,3,3,"","attack: dmg face 1",S("splinter","tokens+burn",["Spiked Barricade","Drifting Monk","Bolt Knight"])));
  add(Cr("Faceted Brute",1,2,2,"","play: dmg face 1",S("splinter","tokens+burn",["Pebble Golem","Storm Crow","Thunder Imp"])));
  add(Cr("Prism Hound",1,2,2,"","attack: dmg face 1",S("splinter","tokens+burn",["Crystal Sprout","Feather Sprite","Static Sprite"])));
  add(Sp("Clear Blast",1,"play: dmg all_e 1",S("splinter","tokens+burn",["Boulder Toss","Wingbeat","Charge Conduit"])));
  add(Sp("Fulgurite Torrent",1,"play: dmg t 2",S("splinter","tokens+burn",["Stone Skin","Gust of Wind","Static Bolt"],{tgt:"e"})));
  add(Re("Mirror Snap",1,"play: dmg t 1",S("splinter","tokens+burn",["Rock Shield","Sky Strike","Grounding"],{tgt:"ea"})));
  add(Re("Crystal Retort",3,"play: dmg t 4",S("splinter","tokens+burn",["Earthen Ward","Wind Barrier","Shockwave Counter"],{tgt:"eatk"})));
  add(Au("Lens Totem",2,"end: dmg face 1",S("splinter","tokens+burn",["Mountain's Patience","Jet Stream","Charged Coil"])));
  setR("u");
  add(Cr("Clear Hawk",4,6,4,"","play: summon shard 1",S("splinter","tokens+burn",["Ancient Guardian","Vortex Mage","Plasma Lord"])));
  add(Cr("Prism Brute",4,6,4,"","death: dmg all_e 1",S("splinter","tokens+burn",["Tremor Lord","Cloud Strider","Thunder Ram"])));
  add(Cr("Clear Lancer",3,5,3,"","death: summon shard 1",S("splinter","tokens+burn",["Rune-Carved Golem","Sky Pirate","Voltage Engineer"])));
  add(Sp("Fulgurite Burst",2,"play: dmg t 2; draw 1",S("splinter","tokens+burn",["Earth's Fury","Wind Shear","Lightning Volley"],{tgt:"e"})));
  add(Re("Splintered Feint",3,"play: dmg t 3",S("splinter","tokens+burn",["Stone Aegis","Vanishing Wind","Electrify"],{tgt:"ea"})));
  add(Au("Mirror Banner",3,"static: lord tok 1 1",S("splinter","tokens+burn",["Sacred Grove","Aerie","Overload Coil"])));
  setR("r");
  add(Cr("Faceted Hawk",5,8,6,"","death: summon shard 1",S("splinter","tokens+burn",["Obsidian Golem","Hurricane Elemental","Volt Dragon"])));
  add(Cr("Shard Falcon",4,6,5,"","attack: dmg face 1",S("splinter","tokens+burn",["Elder Treant","Mistral Phoenix","Lightning Hydra"])));
  add(Sp("Mirror Wave",4,"play: summon shard 2",S("splinter","tokens+burn",["Seismic Devastation","Squall Line","Overload Cascade"])));
  add(Re("Glass Riposte",4,"play: summon shard 2",S("splinter","tokens+burn",["Stone Aegis","Perfect Gale","Lightning Reflexes"])));
  add(Au("Glass Grove",5,"end: dmg face 1",S("splinter","tokens+burn",["Stone Sanctuary","Sky Throne","Tesla Coil"])));

  /* ---- mirror (20) ---- */
  setR("c");
  add(Cr("Faceted Hound",3,5,3,"","play: kw ostr barrier",S("mirror","burn+barrier",["Rampart Elder","Flock Leader","Arc Apprentice"])));
  add(Cr("Crystal Falcon",2,3,2,"airborne","play: kw ostr barrier",S("mirror","burn+barrier+airborne",["Burrow Mole","Tempest Sprite","Charge Siphon"])));
  add(Cr("Shard Hawk",3,5,3,"","play: kw ostr barrier",S("mirror","burn+barrier",["Grove Shaper","Dust Devil","Pulse Mage"])));
  add(Cr("Shard Striker",2,3,3,"","attack: dmg face 1",S("mirror","burn+barrier",["Druid of the Stone","Whirlwind Acrobat","Conduit Keeper"])));
  add(Cr("Glass Raider",1,2,2,"","play: dmg t 1",S("mirror","burn+barrier",["Pebble Golem","Sparrow Scout","Volt Hopper"],{tgt:"e"})));
  add(Sp("Prism Blast",1,"play: kw own barrier",S("mirror","burn+barrier",["Avalanche Shard","Eye of the Gale","Lightning Bolt"])));
  add(Sp("Clear Rain",1,"play: dmg all_e 1",S("mirror","burn+barrier",["Petrify","Tailwind Rush","Chain Lightning"])));
  add(Re("Mirror Recoil",2,"play: kw t barrier; dmg str 1",S("mirror","burn+barrier",["Rock Shield","Tailwind","Surge Shield"],{tgt:"o"})));
  add(Au("Crystal Sanctum",2,"end: dmg face 1",S("mirror","burn+barrier",["Fortress Walls","Sky Temple","Lightning Rod"])));
  setR("u");
  add(Cr("Mirror Charger",3,4,3,"airborne","play: dmg t 3",S("mirror","burn+barrier+airborne",["Stoneheart Sentinel","Cloudshaper","Tempest Runner"],{tgt:"e"})));
  add(Cr("Lens Falcon",4,6,4,"","death: dmg all_e 1",S("mirror","burn+barrier",["Mountain Guardian","Storm Roc","Thunderclap Adept"])));
  add(Cr("Splintered Hound",3,4,3,"airborne","play: dmg t 3",S("mirror","burn+barrier+airborne",["Geode Shaman","Featherblade Duelist","Thunder Wolf"],{tgt:"e"})));
  add(Sp("Glass Blast",2,"play: kw t barrier; buff t 1 1",S("mirror","burn+barrier",["Crystalline Growth","Wind Walk","Overload Strike"],{tgt:"o"})));
  add(Re("Faceted Snap",3,"play: kw t barrier",S("mirror","burn+barrier",["Tremor Trap","Wind Barrier","Shockwave Counter"],{tgt:"o"})));
  add(Au("Shard Field",4,"spell: zaps 1 1",S("mirror","burn+barrier",["Crystal Resonance","Aerie","Storm Battery"])));
  setR("r");
  add(Cr("Glass Duelist",4,6,4,"airborne","play: kw own barrier",S("mirror","burn+barrier+airborne",["Terravore","Lord of the Skies","Stormbringer"])));
  add(Cr("Lens Wolf",4,6,5,"","death: dmg all_e 1",S("mirror","burn+barrier",["Grand Geomancer","Zephyr Archon","Tempest Archon"])));
  add(Sp("Clear Ritual",3,"play: dmg all_e 1",S("mirror","burn+barrier",["Cataclysmic Quake","Cyclonic Rift","Overload Cascade"])));

  /* ---- fulgurite (15) ---- */
  setR("c");
  add(Cr("Clear Shaman",3,4,4,"","play: dmg t 3",S("fulgurite","burn",["Quarry Shaman","Gale Sage","Storm Shaman"],{tgt:"e"})));
  add(Cr("Lens Spirit",2,3,3,"","attack: dmg face 1",S("fulgurite","burn",["Worldroot Sapling","Gale Rider","Capacitor Golem"])));
  add(Cr("Fulgurite Scout",2,3,3,"","play: dmg t 2",S("fulgurite","burn",["Amber Golem","Zephyr Monk","Flicker Mage"],{tgt:"e"})));
  add(Cr("Prism Sentinel",3,4,4,"","play: dmg face 1",S("fulgurite","burn",["Ironhide Rhino","Cloud Hawk","Spark Swarm Mage"])));
  add(Sp("Lens Surge",2,"play: dmg t 3",S("fulgurite","burn",["Quake","Tempest Volley","Zap"],{tgt:"e"})));
  add(Re("Clear Reflex",2,"play: dmg t 2",S("fulgurite","burn",["Earthen Ward","Crosswind","Shock Reflex"],{tgt:"ea"})));
  add(Au("Glass Field",2,"end: dmg face 1",S("fulgurite","burn",["Ley Line","Wind Chimes","Charged Coil"])));
  setR("u");
  add(Cr("Splintered Elemental",3,4,4,"","play: dmg t 4",S("fulgurite","burn",["Granite Lion","Windsong Falcon","Voltage Wraith"],{tgt:"e"})));
  add(Cr("Mirror Scout",4,5,5,"","death: dmg all_e 1",S("fulgurite","burn",["Golem Patriarch","Skyline Falcon","Ion Drake"])));
  add(Sp("Lens Volley",3,"play: dmg t 3",S("fulgurite","burn",["Shatter the Earth","Gale Barrage","Forked Lightning"],{tgt:"ea"})));
  setR("r");
  add(Cr("Clear Scout",5,7,7,"","death: dmg all_e 1",S("fulgurite","burn",["Old-Growth Treant","Roc Hatchery","Charged Juggernaut"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.GLASS_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["glass"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
