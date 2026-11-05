/* ================= VOLCANO CATALOG (designed confluence cards) =================
   Fire + Earth. 100 designed cards that replace Volcano's formula fusions (design/confluence-cards.md, design/confluence-slots.md).
   Each card: th = theme, tr = trait pair, sig = signature recipe [Fire card, Earth card].
   Themes: eruption (archetype: sacrifice your own creatures for a blast), magma (big Pierce bodies that hit on arrival),
   fault (Fortify bodies whose Last Gasp hits back), ashfall (support: small sweeps that only hurt enemies),
   caldera (Last Gasp chains and Magmite tokens). Rarity unlocks: commons fire once; "whenever a creature dies" engines from uncommon. */
// Loaded by build.py inside catalogBegin("volcano")/catalogEnd("volcano") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.VOLCANO_CATALOG = [];
(function(){
  // S() records the slot data and returns the card options; add() attaches the slot data to the card just made.
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"volcano" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.VOLCANO_CATALOG.push(d); return d; };
  setEl("volcano");


  /* ---- Eruption (25) ---- */
  setR("c");
  add(Cr("Magmite Brood",2,2,2,"","death: summon magmite 1",S("eruption","burn+brood",["Ember Imp","Pebble Golem"])));
  add(Cr("Caldera Cultist",2,2,3,"","play/own2: sac; buff self 3 3",S("eruption","fury+sacrifice",["Pyre Zealot","Stonecaller"])));
  add(Cr("Cinder Martyr",1,1,1,"","death: dmg all_e 1",S("eruption","burn+martyr",["Ember Whelp","Clay Homunculus"])));
  add(Cr("Obsidian Shell",3,2,6,"","death: dmg all_ef 2",S("eruption","burn+wall",["Bonfire Keeper","Bulwark Golem"])));
  add(Cr("Slag Hulk",4,5,5,"","play/own2: sac; dmg face 3",S("eruption","burn+sacrifice",["Firebrand Knight","Earthquake Beetle"])));
  add(Sp("Vent the Pressure",1,"play: sac; dmg all_e 0 x",S("eruption","burn+sacrifice",["Combust","Boulder Toss"])));
  add(Sp("Pyroclastic Offering",3,"play: sac; dmg all_e 2; draw 1",S("eruption","burn+sacrifice",["Flame Wave","Quake"])));
  add(Re("Molten Sacrifice",1,"play: sac; dmg t 0 x",S("eruption","burn+sacrifice",["Flash Fire","Rock Shield"],{tgt:"e"})));
  add(Re("Magma Burst",2,"play: dmg t 3; summon magmite 1",S("eruption","burn+brood",["Heat Surge","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Lava Tubes",2,"start: summon magmite 1",S("eruption","brood+warmth",["Kindling Hearth","Fortress Walls"])));
  add(Au("Pressure Vent",3,"end/own3: sac; dmg face 2",S("eruption","burn+sacrifice",["Hearth of Embers","Ley Line"])));
  setR("u");
  add(Cr("Eruption Herald",4,4,4,"","die: dmg all_e 1",S("eruption","burn+martyr",["Flame Warden","Tremor Lord"])));
  add(Cr("Living Caldera",4,3,7,"","death: dmg all_e 2",S("eruption","burn+wall",["Emberlord Captain","Cavern Troll"])));
  add(Cr("Devouring Wurm",4,5,5,"","play: sac; dmg all_e 2",S("eruption","burn+sacrifice",["Inferno Charger","Jade Behemoth"])));
  add(Sp("Ashen Offering",2,"play: sac; draw 2",S("eruption","study+sacrifice",["Fury Unleashed","Seismic Pulse"])));
  add(Sp("Smoldering Rift",3,"play: dmg t 3; summon magmite 2",S("eruption","burn+brood",["Combustion Wave","Fault Line"],{tgt:"e"})));
  add(Re("Final Ember",2,"play: sac; dmg t 0 x; draw 1",S("eruption","burn+sacrifice",["Backdraft","Crystalline Growth"],{tgt:"e"})));
  add(Au("Pressure Chamber",3,"die: zaps 1 2",S("eruption","burn+martyr",["Furnace of Rage","Crystal Resonance"])));
  add(Au("Heart of the Mountain",4,"die: dmg face 1 | start: summon magmite 1",S("eruption","brood+martyr",["Everburning Brazier","Sacred Grove"])));
  setR("r");
  add(Cr("Krakatoa Titan",6,8,8,"pierce","die: dmg all_e 1",S("eruption","burn+size",["Searing Overlord","Primordial Titan"])));
  add(Cr("Caldera Phoenix",4,4,4,"","death: dmg all_e 2; summon magmite 2",S("eruption","burn+brood",["Ashborn Phoenix","Crystal Dragon"])));
  add(Sp("Cataclysm",4,"play: dmg all 2; draw 2",S("eruption","burn+quake",["Firestorm Ritual","Cataclysmic Quake"])));
  add(Re("Cinder Rebirth",2,"play: revive 1",S("eruption","rebirth+stone",["Pyroclasm Reflex","Stone Aegis"])));
  add(Au("Altar of the Mountain",3,"die: dmg face 1; charge 1",S("eruption","burn+martyr",["Altar of Embers","Stone Sanctuary"])));
  add(Au("Eternal Furnace of Ash",5,"static: lord all 1 1 | die: zaps 1 1",S("eruption","fury+martyr",["Crown of Cinders","Heart of the World"])));

  /* ---- Magma (25) ---- */
  setR("c");
  add(Cr("Lava Pup",1,2,1,"","play: dmg face 1",S("magma","burn+size",["Molten Hatchling","Root Tender"])));
  add(Cr("Basalt Hound",2,3,2,"pierce","",S("magma","pierce+size",["Cinder Hound","Thornback Boar"])));
  add(Cr("Magma Brute",3,4,3,"pierce","",S("magma","pierce+size",["Lava Hound","Canyon Ram"])));
  add(Cr("Lavaflow Ram",3,3,4,"","play: dmg t 2",S("magma","burn+size",["Flamecaller Adept","Ironhide Rhino"],{tgt:"e"})));
  add(Cr("Molten Giant",5,6,6,"pierce","",S("magma","pierce+size",["Kiln Golem","Hill Giant"])));
  add(Cr("Cinderstone Golem",2,2,2,"","play: dmg t 2",S("magma","burn+size",["Magma Golem","Mountain Guardian"],{tgt:"e"})));
  add(Cr("Scoria Brawler",2,3,3,"","",S("magma","fury+size",["Ashen Brawler","Granite Guard"])));
  add(Cr("Obsidian Cub",2,2,3,"","play: fort self 1",S("magma","pierce+size",["Volcanic Brute","Mossback Giant"])));
  add(Sp("Molten Boulder",2,"play: dmg t 4",S("magma","burn+stone",["Searing Spark","Rockslide"],{tgt:"e"})));
  add(Sp("Magma Spike",1,"play: dmg t 2",S("magma","burn+stone",["Firebolt","Boulder Toss"],{tgt:"ea"})));
  add(Sp("Lava Surge",4,"play: buff t 4 2; kw t pierce",S("magma","pierce+fury",["Rally the Flames","Stone Skin"],{tgt:"o"})));
  add(Re("Basalt Strike",1,"play: buff t 2 2 tmp",S("magma","fury+stone",["Heat Surge","Rock Shield"],{tgt:"oatk"})));
  add(Re("Lava Splash",2,"play: dmg t 3",S("magma","burn+stone",["Wild Surge","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Forge of the Deep",3,"start: buff ostr 2 0 tmp",S("magma","fury+size",["Smoldering Tome","Fortress Walls"])));
  setR("u");
  add(Cr("Magma Titan",3,5,4,"pierce","attack: dmg face 1",S("magma","pierce+size",["Lava Hound","Hill Giant"])));
  add(Cr("Flamecaller of the Deep",4,4,5,"","play: dmg t 4",S("magma","burn+size",["Fireball","Stonecaller"],{tgt:"ea"})));
  add(Cr("Lavaforged Champion",3,4,4,"pierce","",S("magma","pierce+size",["Ignited Lancer","Basalt Champion"])));
  add(Cr("Furnace Imp",1,1,2,"","play: dmg t 1",S("magma","burn+size",["Living Wildfire","Mountain Strider"],{tgt:"e"})));
  add(Sp("Lava Lance",3,"play: dmg t 5",S("magma","burn+stone",["Raging Inferno","Earth's Fury"],{tgt:"e"})));
  add(Sp("Molten Armor",2,"play: buff t 3 3; kw t pierce",S("magma","pierce+fury",["Stoke the Coals","Unyielding Earth"],{tgt:"o"})));
  add(Re("Eruptive Riposte",2,"play: dmg t 4",S("magma","burn+stone",["Inferno Surge","Earthen Ward"],{tgt:"eatk"})));
  setR("r");
  add(Cr("Volcanic Colossus",6,8,9,"pierce","play: dmg all_e 2",S("magma","pierce+size",["Magmaforge Golem","Granite Juggernaut"])));
  add(Cr("Obsidian Phoenix",5,6,6,"pierce","death: summon drake 1",S("magma","pierce+brood",["Blazewing Matriarch","Diamondhide Wurm"])));
  add(Cr("Magma Wyrm",5,6,7,"","play: dmg t 4",S("magma","burn+size",["Flamewing Dragon","Emerald Wyrm"],{tgt:"ea"})));
  add(Sp("Earthen Inferno",4,"play: dmg t 6; dmg face 2",S("magma","burn+stone",["Dragonfire","Shatter the Earth"],{tgt:"e"})));

  /* ---- Fault Line (20) ---- */
  setR("c");
  add(Cr("Cracked Sentry",1,1,3,"","death: dmg face 1",S("fault","fortify+martyr",["Ember Imp","Stone Sentry"],{fort:1})));
  add(Cr("Fissure Guard",2,2,4,"","death: dmg str 2",S("fault","fortify+martyr",["Torchbearer","Spiked Barricade"],{fort:1})));
  add(Cr("Rift Walker",3,3,4,"","death: dmg all_e 1",S("fault","fortify+martyr",["Ember Scholar","Rampart Elder"],{fort:1})));
  add(Cr("Tremor Knight",2,2,3,"","attack: buff self 1 1",S("fault","fortify+fury",["Firebrand Knight","Boulder Hurler"])));
  add(Cr("Seismic Ox",3,3,5,"","play: fort self 2",S("fault","fortify+size",["Lava Hound","Grove Shaper"])));
  add(Cr("Faultline Pup",2,2,3,"","death: dmg all_e 1",S("fault","fortify+martyr",["Kiln Golem","Old-Growth Treant"],{fort:1})));
  add(Sp("Heated Plating",1,"play: fort t 2; buff t 1 0",S("fault","fortify+fury",["Flare Up","Earthen Blessing"],{tgt:"o"})));
  add(Sp("Rupture",2,"play: dmg t 3 | play/own2: dmg t 1",S("fault","burn+quake",["Scorch","Quake"],{tgt:"e"})));
  add(Re("Stone Shrug",1,"play: fort t 2",S("fault","fortify+shield",["Ember Shield","Stone Aegis"],{tgt:"o"})));
  add(Au("Plate Tectonics",2,"start: fort ostr 1",S("fault","fortify+size",["Kindling Hearth","Mountain's Patience"])));
  setR("u");
  add(Cr("Basalt Warden",3,3,5,"","die: fort own 1",S("fault","fortify+martyr",["Sun Priestess","Stoneheart Sentinel"])));
  add(Cr("Magma Shelled Tortoise",4,3,7,"","death: dmg all_ef 2",S("fault","fortify+martyr",["Flame Warden","Iron Tortoise"],{fort:2})));
  add(Cr("Quake Champion",4,5,5,"","play: fort self 2",S("fault","fortify+fury",["Emberlord Captain","Basalt Champion"])));
  add(Cr("Fracture Ogre",2,3,3,"","death: dmg str 2",S("fault","fortify+martyr",["Blood-Fire Berserker","Crag Brute"])));
  add(Sp("Tectonic Shove",6,"play: fort own 2; dmg all_e 2",S("fault","fortify+quake",["Combustion Wave","Seismic Pulse"])));
  add(Re("Aftershock",2,"play: dmg t 3; fort ostr 1",S("fault","burn+fortify",["Wild Surge","Rock Shield"],{tgt:"eatk"})));
  setR("r");
  add(Cr("Fault Titan",6,6,9,"","death: dmg all_ef 3",S("fault","fortify+martyr",["Lavaheart Titan","Avalanche Titan"],{fort:2})));
  add(Cr("Earthsplitter",5,5,7,"pierce","attack: fort self 1",S("fault","fortify+pierce",["Inferno Champion","Granite Juggernaut"])));
  add(Sp("Shatter the Plates",5,"play: dmg all_e 2; fort own 2",S("fault","fortify+quake",["Chain of Flame","Seismic Devastation"])));
  add(Re("Deep Fault",2,"play: destroy t",S("fault","burn+quake",["Inferno Surge","Tremor Trap"],{tgt:"eatk"})));

  /* ---- Ashfall (15, support) ---- */
  setR("c");
  add(Cr("Ash Sower",2,2,3,"","play: dmg all_e 1",S("ashfall","burn+quake",["Apprentice Pyromancer","Seed Bearer"])));
  add(Cr("Cinder Tremor",3,3,3,"","play: dmg all_e 1",S("ashfall","burn+quake",["Flame Herald","Earthshaker Ogre"])));
  add(Cr("Smokestack Imp",1,2,1,"","play/own2: dmg face 1",S("ashfall","burn+size",["Cinder Swarm","Mountain Guardian"])));
  add(Sp("Ash Rain",4,"play: dmg all_e 1; draw 2",S("ashfall","burn+quake",["Kindle Thoughts","Quake"])));
  add(Sp("Pumice Hail",3,"play: dmg all_e 2",S("ashfall","burn+quake",["Flame Wave","Overgrowth"])));
  add(Re("Ember Gust",1,"play: dmg all_e 1",S("ashfall","burn+quake",["Wildfire Ignition","Earthen Ward"])));
  add(Re("Choking Ash",2,"play: dmg t 2; buff t -1 0",S("ashfall","burn+stone",["Flash Fire","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Ashen Sky",2,"start: zaps 1 1",S("ashfall","burn+quake",["Smoldering Tome","Ley Line"])));
  setR("u");
  add(Cr("Ashfall Brute",3,4,4,"","edie: buff self 1 1",S("ashfall","fury+quake",["Scorchclaw Ravager","Granite Lion"])));
  add(Cr("Pyroclast Shaman",4,3,5,"","start: dmg all_e 1",S("ashfall","burn+quake",["Cinderstorm Mage","Geode Shaman"])));
  add(Sp("Ashen Wave",3,"play: dmg all_e 2 | play/own3: draw 1",S("ashfall","burn+quake",["Raging Inferno","Quake"])));
  add(Re("Tephra Burst",2,"play: dmg all_e 1; draw 1",S("ashfall","burn+quake",["Backdraft","Earthen Ward"])));
  add(Au("Smoke Column",3,"edie: dmg face 1",S("ashfall","burn+martyr",["Furnace of Rage","Sacred Grove"])));
  setR("r");
  add(Cr("Ash Cloud Sovereign",5,5,7,"","start: dmg all_e 1",S("ashfall","burn+quake",["Ember Queen","Grand Geomancer"])));
  add(Sp("Pompeii",5,"play: dmg all_e 2; draw 2",S("ashfall","burn+quake",["Wildfire Blaze","Cataclysmic Quake"])));

  /* ---- Caldera (15) ---- */
  setR("c");
  add(Cr("Magmite Nest",1,1,2,"","death: summon magmite 1",S("caldera","brood+martyr",["Molten Hatchling","Pebble Golem"])));
  add(Cr("Caldera Spawner",3,2,4,"","death: summon magmite 2",S("caldera","brood+martyr",["Bonfire Keeper","Geode Burrower"])));
  add(Cr("Ember Crawler",2,2,2,"","play: summon magmite 1",S("caldera","brood+size",["Sparkfire Kit","Burrow Mole"])));
  add(Sp("Magma Hatching",1,"play: summon magmite 2",S("caldera","brood+stone",["Call the Embers","Fertile Ground"])));
  add(Re("Spawn Burst",1,"play: summon magmite 1; buff tok 1 0 tmp",S("caldera","brood+fury",["Heat Surge","Crystalline Growth"])));
  add(Au("Brood Chamber",2,"end: summon magmite 1",S("caldera","brood+warmth",["Hearth of Embers","Mountain's Patience"])));
  add(Au("Caldera Rim",1,"start: buff tok 1 0 tmp",S("caldera","brood+fury",["Kindling Hearth","Crystal Resonance"])));
  setR("u");
  add(Cr("Magmite Matron",4,3,5,"","token: buff self 1 0",S("caldera","brood+size",["Phoenix Chick","Druid of the Stone"])));
  add(Cr("Lava Wellspring",3,2,5,"","start: summon magmite 1",S("caldera","brood+wall",["Pyre Zealot","Worldroot Sapling"])));
  add(Sp("Boiling Brood",3,"play: summon magmite 2; buff tok 1 1",S("caldera","brood+fury",["Rally the Flames","Rapid Growth"])));
  add(Au("Molten Nursery",3,"static: lord tok 1 1",S("caldera","brood+size",["Everburning Brazier","Fortress Walls"])));
  setR("r");
  add(Cr("Caldera Queen",5,5,6,"","start: summon magmite 2",S("caldera","brood+size",["Pyrelord Vexis","Golem Patriarch"])));
  add(Cr("Endless Caldera Wyrm",6,6,8,"","death: summon magmite 3",S("caldera","brood+martyr",["Flame Tyrant","Bedrock Leviathan"])));
  add(Re("Magma Ascension",2,"play: revive 2",S("caldera","rebirth+stone",["Pyroclasm Reflex","Earthen Ward"])));
  add(Au("Heart of the Caldera",4,"token: dmg face 1 | static: lord tok 1 0",S("caldera","brood+burn",["Crown of Cinders","Stone Sanctuary"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.VOLCANO_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["volcano"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
