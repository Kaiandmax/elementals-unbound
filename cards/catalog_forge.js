/* ================= FORGE CATALOG (designed confluence cards, generated first draft) =================
   Fire + Earth + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   artifice (25: auras + buff), anvil (20: fortify + buff), bellows (20: burn + draw), sparksmith (20: barrier + buff), crucible (15: auras + burn).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [fire, earth, lightning]. */
// Loaded by build.py inside catalogBegin("forge")/catalogEnd("forge") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.FORGE_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"forge" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.FORGE_CATALOG.push(d); return d; };
  setEl("forge");

  /* ---- artifice (25) ---- */
  setR("c");
  add(Cr("Gear Spirit",1,2,2,"","play: buff self 1 1",S("artifice","auras+buff",["Ember Imp","Root Tender","Static Sprite"])));
  add(Cr("Brass Spirit",2,3,3,"","play/aura1: buff self 1 1",S("artifice","auras+buff",["Torchbearer","Seed Bearer","Flicker Mage"])));
  add(Cr("Brass Weaver",2,3,3,"","play: buff self 1 1",S("artifice","auras+buff",["Reckless Raider","Granite Guard","Capacitor Golem"])));
  add(Cr("Smelted Spirit",2,3,3,"","play/aura1: buff self 1 1",S("artifice","auras+buff",["Cinder Hound","Spiked Barricade","Conduit Keeper"])));
  add(Cr("Gear Serpent",2,3,3,"","attack: buff self 1 0 tmp",S("artifice","auras+buff",["Smokescreen Imp","Stonecaller","Lightning Courier"])));
  add(Cr("Ironfire Shaman",3,4,4,"","play: buff self 1 1",S("artifice","auras+buff",["Lava Hound","Geode Burrower","Bolt Thrower"])));
  add(Sp("Gear Blast",1,"play/aura2: dmg all_e 2",S("artifice","auras+buff",["Blazing Command","Stone Skin","Charge Conduit"])));
  add(Sp("Crucible Rite",1,"play/aura2: dmg all_e 2",S("artifice","auras+buff",["Stoke the Coals","Fertile Ground","Overclock"])));
  add(Sp("Anvil Rite",1,"play: buff t 1 0; kw t pierce",S("artifice","auras+buff",["Searing Spark","Boulder Toss","Quick Study"],{tgt:"o"})));
  add(Re("Anvil Retort",1,"play: buff t 2 2 tmp",S("artifice","auras+buff",["Wildfire Ignition","Rock Shield","Blitz"],{tgt:"o"})));
  add(Re("Gear Snap",1,"play: buff t 1 1 tmp",S("artifice","auras+buff",["Heat Surge","Earthen Ward","Shock Reflex"],{tgt:"oatk"})));
  add(Au("Forge Beacon",1,"start: buff ostr 1 0 tmp",S("artifice","auras+buff",["Kindling Hearth","Crystal Resonance","Lightning Rod"])));
  add(Au("Forge Engine",2,"start: buff ostr 2 0 tmp",S("artifice","auras+buff",["Smoldering Tome","Ley Line","Charged Coil"])));
  setR("u");
  add(Cr("Smelted Scout",4,5,5,"","creature: buff self 1 1",S("artifice","auras+buff",["Living Wildfire","Tremor Lord","Lightning Elemental"])));
  add(Cr("Rune Scout",4,5,5,"","play: buff self 1 1",S("artifice","auras+buff",["Inferno Charger","Cavern Troll","Galvanic Sentinel"])));
  add(Cr("Crucible Scout",4,5,5,"","play: buff ostr 1 1",S("artifice","auras+buff",["Emberlord Captain","Ancient Guardian","Spark Golem"])));
  add(Cr("Sparkwork Shaman",4,5,5,"","play: buff self 1 1",S("artifice","auras+buff",["Cinderstorm Mage","Jade Behemoth","Plasma Lord"])));
  add(Sp("Smelted Rite",3,"play: draw 1 | play/aura1: energy 1",S("artifice","auras+buff",["Fireball","Cataclysmic Quake","Forked Lightning"])));
  add(Sp("Ironfire Rain",3,"play: buff t 3 0; kw t pierce",S("artifice","auras+buff",["Flame Wave","Unearth","Thunderous Cascade"],{tgt:"o"})));
  add(Re("Gear Guard",3,"play: buff t 2 2 tmp",S("artifice","auras+buff",["Backdraft","Tremor Trap","Shockwave Counter"],{tgt:"o"})));
  add(Au("Ironfire Font",3,"start: buff ostr 2 0 tmp",S("artifice","auras+buff",["Everburning Brazier","Sacred Grove","Infinite Battery"])));
  setR("r");
  add(Cr("Bellows Adept",4,5,6,"","start: buffs self 1 1 aura",S("artifice","auras+buff",["Ember Queen","Elder Treant","Stormbringer"])));
  add(Cr("Bellows Scout",6,8,8,"","static: lord all 1 1",S("artifice","auras+buff",["Searing Overlord","Avalanche Titan","Storm Titan"])));
  add(Cr("Smelted Sentinel",5,7,7,"","attack: buff self 1 0 tmp",S("artifice","auras+buff",["Magmaforge Golem","Gaia's Avatar","Static Overlord"])));
  add(Sp("Forge Rite",4,"play: buff own 1 1",S("artifice","auras+buff",["Wildfire Blaze","Seismic Devastation","Ion Storm"])));
  add(Re("Rune Retort",4,"play: buff t 2 2 tmp",S("artifice","auras+buff",["Pyroclasm Reflex","Stone Aegis","Thunder Trap"],{tgt:"o"})));
  add(Au("Forge Totem",5,"static: lord all 2 1 | static: cost aura 1",S("artifice","auras+buff",["Hearth of Embers","Heart of the World","Tesla Coil"])));

  /* ---- anvil (20) ---- */
  setR("c");
  add(Cr("Ironfire Giant",1,1,3,"","play: fort self 1",S("anvil","fortify+buff",["Molten Hatchling","Stone Sentry","Spark Mite"])));
  add(Cr("Crucible Guardian",2,2,4,"","play: fort t 1",S("anvil","fortify+buff",["Brimstone Guard","Thornback Boar","Volt Runner"],{tgt:"o"})));
  add(Cr("Forge Bulwark",2,2,4,"","attack: buff self 1 0 tmp",S("anvil","fortify+buff",["Apprentice Pyromancer","Crystal Burrower","Bolt Knight"])));
  add(Cr("Sparkwork Wall",1,1,3,"","play: fort self 1",S("anvil","fortify+buff",["Ember Whelp","Clay Homunculus","Volt Hopper"])));
  add(Cr("Rune Colossus",3,3,5,"","attack: buff self 1 0 tmp",S("anvil","fortify+buff",["Pyre Dancer","Quarry Shaman","Voltage Hound"])));
  add(Sp("Gear Burst",1,"play: buff own 1 1",S("anvil","fortify+buff",["Stoke the Coals","Earthen Blessing","Crackle"])));
  add(Sp("Rune Volley",1,"play: fort t 2; buff t 1 0",S("anvil","fortify+buff",["Searing Spark","Avalanche Shard","Static Bolt"],{tgt:"o"})));
  add(Re("Forge Ward",2,"play: buff t 1 1 tmp",S("anvil","fortify+buff",["Flash Fire","Rock Shield","Surge Shield"],{tgt:"oatk"})));
  add(Re("Ironfire Feint",2,"play: fort t 2",S("anvil","fortify+buff",["Inferno Surge","Earthen Ward","Surge Shield"],{tgt:"o"})));
  add(Au("Gear Sanctum",2,"start: buff ostr 2 0 tmp",S("anvil","fortify+buff",["Smoldering Tome","Mountain's Patience","Overload Coil"])));
  add(Au("Forge Field",2,"start: buff ostr 1 1",S("anvil","fortify+buff",["Furnace of Rage","Fortress Walls","Charged Coil"])));
  setR("u");
  add(Cr("Sparkwork Tortoise",4,3,7,"","play: buff ostr 1 1",S("anvil","fortify+buff",["Firebrand Knight","Basalt Champion","Galvanic Golem"])));
  add(Cr("Bellows Wall",4,3,7,"","die: fort own 1",S("anvil","fortify+buff",["Solar Flare Drake","Hill Giant","Spark Golem"])));
  add(Cr("Gear Sentry",3,3,5,"","static: lord all 1 0",S("anvil","fortify+buff",["Hellforge Smith","Stoneheart Sentinel","Pulse Mage"])));
  add(Sp("Ironfire Wave",4,"play: fort t 2; buff t 1 0",S("anvil","fortify+buff",["Firestorm Ritual","Unyielding Earth","Ion Storm"],{tgt:"o"})));
  add(Sp("Crucible Wave",3,"play: buff t 3 0; kw t pierce",S("anvil","fortify+buff",["Chain of Flame","Seismic Pulse","Battery Dump"],{tgt:"o"})));
  add(Re("Rune Recoil",2,"play: fort t 2",S("anvil","fortify+buff",["Ember Shield","Tremor Trap","Lightning Reflexes"],{tgt:"o"})));
  add(Au("Smelted Grove",3,"start: buff ostr 2 0 tmp",S("anvil","fortify+buff",["Altar of Embers","Stone Sanctuary","Storm God's Altar"])));
  setR("r");
  add(Cr("Anvil Warden",5,5,9,"","play: buff own 1 1",S("anvil","fortify+buff",["Lavaheart Titan","Diamondhide Wurm","Volt Dragon"])));
  add(Cr("Anvil Watcher",5,5,9,"","attack: buff self 1 0 tmp",S("anvil","fortify+buff",["Blazewing Matriarch","Crystal Dragon","Charged Juggernaut"])));
  add(Sp("Anvil Storm",3,"play: buff t 2 2",S("anvil","fortify+buff",["Dragonfire","Cataclysmic Quake","Overload Cascade"],{tgt:"o"})));
  add(Re("Sparkwork Trap",6,"play: fort t 2",S("anvil","fortify+buff",["Inferno Surge","Stone Aegis","Lightning Reflexes"],{tgt:"o"})));
  add(Au("Brass Grove",5,"start: buff ostr 2 0 tmp",S("anvil","fortify+buff",["Crown of Cinders","Heart of the World","Storm Battery"])));

  /* ---- bellows (20) ---- */
  setR("c");
  add(Cr("Gear Weaver",3,4,4,"","play: dmg t 3",S("bellows","burn+draw",["Bonfire Keeper","Bulwark Golem","Tesla Knight"],{tgt:"e"})));
  add(Cr("Crucible Adept",2,3,3,"","play: dmg face 1",S("bellows","burn+draw",["Ashen Brawler","Burrow Mole","Charge Siphon"])));
  add(Cr("Anvil Elemental",2,3,3,"","attack: dmg face 1",S("bellows","burn+draw",["Sparkfire Kit","Bedrock Wall","Volt Runner"])));
  add(Cr("Crucible Familiar",3,4,4,"","death: draw 1",S("bellows","burn+draw",["Flamecaller Adept","Grove Shaper","Arc Apprentice"])));
  add(Cr("Forge Familiar",3,4,4,"","death: dmg all_e 1",S("bellows","burn+draw",["Flame Herald","Cliffside Watcher","Storm Caller"])));
  add(Sp("Smelted Blast",2,"play: dmg t 2; draw 1",S("bellows","burn+draw",["Firebolt","Overgrowth","Thunder Lance"],{tgt:"e"})));
  add(Sp("Bellows Storm",2,"play: draw 1; heal 2",S("bellows","burn+draw",["Flame Lash","Quake","Arc Lash"])));
  add(Re("Bellows Trap",2,"play: dmg t 2",S("bellows","burn+draw",["Backdraft","Rock Shield","Electrify"],{tgt:"ea"})));
  add(Re("Smelted Flash",2,"play: draw 1; buff t 0 2 tmp",S("bellows","burn+draw",["Wild Surge","Rock Shield","Grounding"],{tgt:"o"})));
  add(Au("Brass Font",2,"end: dmg face 1",S("bellows","burn+draw",["Kindling Hearth","Mountain's Patience","Lightning Rod"])));
  setR("u");
  add(Cr("Gear Elemental",3,4,4,"","play: dmg face 1",S("bellows","burn+draw",["Flame Warden","Geode Shaman","Voltage Engineer"])));
  add(Cr("Rune Serpent",4,5,5,"","play: dmg t 5",S("bellows","burn+draw",["Cinder Swarm","Boulder Hurler","Ion Drake"],{tgt:"e"})));
  add(Cr("Crucible Serpent",3,4,4,"","start: zaps 1 2",S("bellows","burn+draw",["Scorchclaw Ravager","Rune-Carved Golem","Storm Shaman"])));
  add(Sp("Sparkwork Rite",2,"play: draw 1; energy 1",S("bellows","burn+draw",["Combustion Wave","Fault Line","Static Burst"])));
  add(Re("Bellows Snap",3,"play: dmg t 3",S("bellows","burn+draw",["Pyroclasm Reflex","Earthen Ward","Shockwave Counter"],{tgt:"ea"})));
  add(Au("Rune Altar",2,"edie: dmg face 1",S("bellows","burn+draw",["Everburning Brazier","Sacred Grove","Overload Coil"])));
  setR("r");
  add(Cr("Brass Scout",5,7,7,"","death: draw 1",S("bellows","burn+draw",["Pyrelord Vexis","Bedrock Leviathan","Spark Matriarch"])));
  add(Cr("Bellows Sentinel",5,7,7,"","play: draw 1",S("bellows","burn+draw",["Volcanic Brute","Emerald Wyrm","Conduit Colossus"])));
  add(Sp("Brass Torrent",4,"play: dmg t 6",S("bellows","burn+draw",["Wildfire Blaze","Seismic Devastation","Ball of Thunder"],{tgt:"e"})));
  add(Re("Sparkwork Retort",4,"play: dmg t 4",S("bellows","burn+draw",["Inferno Surge","Stone Aegis","Thunder Trap"],{tgt:"ea"})));
  add(Au("Crucible Font",5,"start: zaps 1 1",S("bellows","burn+draw",["Crown of Cinders","Heart of the World","Tesla Coil"])));

  /* ---- sparksmith (20) ---- */
  setR("c");
  add(Cr("Brass Familiar",2,2,3,"barrier","play: buff self 1 1",S("sparksmith","barrier+buff+barrier",["Blood-Fire Berserker","Amber Golem","Arc Duelist"])));
  add(Cr("Bellows Weaver",1,2,2,"","play: kw t barrier",S("sparksmith","barrier+buff",["Pyre Zealot","Pebble Golem","Thunder Imp"],{tgt:"o"})));
  add(Cr("Brass Imp",3,3,4,"barrier","play: kw t barrier",S("sparksmith","barrier+buff+barrier",["Ember Scholar","Ironhide Rhino","Voltage Hound"],{tgt:"o"})));
  add(Cr("Rune Imp",3,3,4,"barrier","play: kw t barrier",S("sparksmith","barrier+buff+barrier",["Ignited Lancer","Canyon Ram","Voltage Wraith"],{tgt:"o"})));
  add(Cr("Rune Elemental",1,2,2,"","play: kw t barrier",S("sparksmith","barrier+buff",["Ember Whelp","Crystal Sprout","Plasma Sprite"],{tgt:"o"})));
  add(Sp("Crucible Storm",1,"play: kw t barrier; buff t 1 1",S("sparksmith","barrier+buff",["Searing Blast","Crystalline Growth","Lightning Bolt"],{tgt:"o"})));
  add(Sp("Anvil Wave",2,"play: buff own 1 1",S("sparksmith","barrier+buff",["Blaze of Insight","Rockslide","Zap"])));
  add(Re("Anvil Guard",2,"play: buff t 1 1 tmp",S("sparksmith","barrier+buff",["Wildfire Ignition","Tremor Trap","Blitz"],{tgt:"oatk"})));
  add(Au("Brass Engine",2,"start: buff ostr 1 1",S("sparksmith","barrier+buff",["Furnace of Rage","Ley Line","Charged Coil"])));
  setR("u");
  add(Cr("Crucible Sentinel",4,5,5,"","creature: buff self 1 1",S("sparksmith","barrier+buff",["Flamewing Dragon","Earthquake Beetle","Tempest Archon"])));
  add(Cr("Ironfire Imp",3,3,4,"barrier","play: buff self 1 1",S("sparksmith","barrier+buff+barrier",["Ashwing Harrier","Granite Lion","Thunder Wolf"])));
  add(Cr("Sparkwork Adept",3,3,4,"barrier","attack: buff self 1 0 tmp",S("sparksmith","barrier+buff+barrier",["Sun Priestess","Quartz Elemental","Tempest Runner"])));
  add(Sp("Brass Storm",3,"play: kw own barrier",S("sparksmith","barrier+buff",["Fury Unleashed","Unearth","Lightning Volley"])));
  add(Re("Forge Feint",3,"play: kw t barrier",S("sparksmith","barrier+buff",["Ember Shield","Earthen Ward","Shockwave Counter"],{tgt:"o"})));
  add(Au("Ironfire Field",3,"static: lord all 0 1",S("sparksmith","barrier+buff",["Altar of Embers","Fortress Walls","Infinite Battery"])));
  setR("r");
  add(Cr("Crucible Spirit",6,7,8,"barrier","play: buff ostr 1 1",S("sparksmith","barrier+buff+barrier",["Flame Tyrant","Primordial Titan","Storm Titan"])));
  add(Cr("Gear Imp",6,7,8,"barrier","play: buff ostr 1 1",S("sparksmith","barrier+buff+barrier",["Ignis, the Undying","Primordial Titan","Sparkfire Hydra"])));
  add(Sp("Brass Call",4,"play: buff t 2 2",S("sparksmith","barrier+buff",["Dragonfire","Seismic Devastation","Thunderous Cascade"],{tgt:"o"})));

  /* ---- crucible (15) ---- */
  setR("c");
  add(Cr("Gear Brute",2,3,2,"pierce","play/aura1: buff self 1 1",S("crucible","auras+burn+pierce",["Firebrand Zealot","Druid of the Stone","Raiju"])));
  add(Cr("Smelted Hound",2,3,3,"","play/aura1: buff self 1 1",S("crucible","auras+burn",["Ember Duelist","Bedrock Wall","Capacitor Golem"])));
  add(Cr("Anvil Lancer",2,3,3,"","play: dmg t 2",S("crucible","auras+burn",["Cinder Hound","Crag Brute","Flicker Mage"],{tgt:"e"})));
  add(Cr("Crucible Brute",1,2,1,"pierce","attack: dmg face 1",S("crucible","auras+burn+pierce",["Ember Imp","Stone Sentry","Volt Hopper"])));
  add(Sp("Anvil Call",2,"play: dmg all_e 1",S("crucible","auras+burn",["Call the Embers","Quake","Overcharge Blast"])));
  add(Re("Bellows Recoil",1,"play: dmg t 2",S("crucible","auras+burn",["Heat Surge","Rock Shield","Shock Reflex"],{tgt:"eatk"})));
  add(Au("Forge Font",2,"start: buff ostr 1 0 tmp",S("crucible","auras+burn",["Smoldering Tome","Mountain's Patience","Lightning Rod"])));
  setR("u");
  add(Cr("Bellows Raider",4,5,4,"pierce","play/aura1: draw 1",S("crucible","auras+burn+pierce",["Magma Golem","Grand Geomancer","Capacitor Titan"])));
  add(Cr("Brass Charger",5,8,5,"","start: zaps 1 2",S("crucible","auras+burn",["Kiln Golem","Obsidian Golem","Galvanized Brute"])));
  add(Sp("Bellows Torrent",3,"play: draw 1 | play/aura1: energy 1",S("crucible","auras+burn",["Raging Inferno","Shatter the Earth","Overload Strike"])));
  setR("r");
  add(Cr("Rune Reaver",6,9,6,"pierce","play: dmg face 1",S("crucible","auras+burn+pierce",["Magma Behemoth","Mossback Giant","Charged Juggernaut"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.FORGE_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["forge"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
