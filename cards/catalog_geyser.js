/* ================= GEYSER CATALOG (designed confluence cards, generated first draft) =================
   Fire + Water + Earth. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   wellspring (25: heal + burn), hotspring (20: heal + buff), mudslide (20: heal + fortify), vent (20: burn + heal), sinter (15: burn + fortify).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [fire, water, earth]. */
// Loaded by build.py inside catalogBegin("geyser")/catalogEnd("geyser") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.GEYSER_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"geyser" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.GEYSER_CATALOG.push(d); return d; };
  setEl("geyser");

  /* ---- wellspring (25) ---- */
  setR("c");
  add(Cr("Wellspring Imp",3,3,4,"drain","play: dmg face 1",S("wellspring","heal+burn+drain",["Ember Scholar","Winter Mage","Bulwark Golem"])));
  add(Cr("Spouting Imp",2,3,3,"","play: dmg face 1",S("wellspring","heal+burn",["Cinder Hound","Riverbank Sage","Seed Bearer"])));
  add(Cr("Thermal Sentinel",1,1,2,"drain","death: dmg all_e 1",S("wellspring","heal+burn+drain",["Ember Whelp","Brook Otter","Stone Sentry"])));
  add(Cr("Spouting Spirit",3,3,4,"drain","play: dmg face 1",S("wellspring","heal+burn+drain",["Flame Herald","Tide Caller","Quarry Shaman"])));
  add(Cr("Mineral Serpent",2,2,3,"drain","play: heal 4",S("wellspring","heal+burn+drain",["Sparkfire Kit","Pearl Diver","Thornback Boar"])));
  add(Cr("Sulfur Golem",1,2,2,"","play: dmg t 1",S("wellspring","heal+burn",["Ember Imp","Coral Crab","Root Tender"],{tgt:"e"})));
  add(Sp("Spouting Storm",1,"play: dmg t 1",S("wellspring","heal+burn",["Blazing Command","Ebb and Flow","Stone Skin"],{tgt:"ea"})));
  add(Sp("Thermal Surge",1,"play: dmg t 1; draw 1",S("wellspring","heal+burn",["Searing Spark","Ebb and Flow","Earthen Blessing"],{tgt:"e"})));
  add(Sp("Geyser Surge",2,"play: dmg t 2; draw 1",S("wellspring","heal+burn",["Flame Lash","Flowing Wisdom","Rockslide"],{tgt:"e"})));
  add(Re("Steaming Trap",1,"play: buff t 0 3 tmp; heal 2",S("wellspring","heal+burn",["Wildfire Ignition","Deflect","Rock Shield"],{tgt:"o"})));
  add(Re("Mud Guard",3,"play: buff t 0 3 tmp; heal 2",S("wellspring","heal+burn",["Heat Surge","Dispel","Earthen Ward"],{tgt:"o"})));
  add(Au("Mud Totem",1,"start: zaps 1 1",S("wellspring","heal+burn",["Kindling Hearth","Sea of Clarity","Crystal Resonance"])));
  add(Au("Geyser Grove",2,"start: heal 2",S("wellspring","heal+burn",["Smoldering Tome","Healing Spring","Ley Line"])));
  setR("u");
  add(Cr("Spouting Golem",3,4,4,"","edie: buff self 1 1",S("wellspring","heal+burn",["Ashwing Harrier","Tideborn Knight","Rune-Carved Golem"])));
  add(Cr("Steaming Elemental",3,3,4,"drain","edie: buff self 1 1",S("wellspring","heal+burn+drain",["Ignited Lancer","Deep Oracle","Geode Shaman"])));
  add(Cr("Mineral Shaman",5,6,6,"drain","play: dmg face 1",S("wellspring","heal+burn+drain",["Volcanic Brute","Frost Giant","Emerald Wyrm"])));
  add(Cr("Basin Golem",4,5,5,"","play: heal 6",S("wellspring","heal+burn",["Cinderstorm Mage","Icewall Colossus","Basalt Champion"])));
  add(Sp("Mineral Blast",3,"play: heal 5; draw 1",S("wellspring","heal+burn",["Firestorm Ritual","Cold Snap","Cataclysmic Quake"])));
  add(Sp("Basin Ritual",2,"play: heal 4; draw 1",S("wellspring","heal+burn",["Combustion Wave","Crashing Wave","Unyielding Earth"])));
  add(Re("Thermal Flash",3,"play: heal 5",S("wellspring","heal+burn",["Backdraft","Reverse Current","Tremor Trap"])));
  add(Au("Geyser Shrine",3,"start: zaps 1 1",S("wellspring","heal+burn",["Everburning Brazier","Permafrost Shrine","Sacred Grove"])));
  setR("r");
  add(Cr("Basin Imp",6,7,8,"drain","heal: dmg face 1",S("wellspring","heal+burn+drain",["Flame Tyrant","Leviathan Elder","Avalanche Titan"])));
  add(Cr("Sulfur Caller",6,7,8,"drain","heal: dmg face 1",S("wellspring","heal+burn+drain",["Ignis, the Undying","Deepsea Hydra","Primordial Titan"])));
  add(Cr("Hot-spring Scout",5,6,7,"drain","heal: dmg face 1",S("wellspring","heal+burn+drain",["Pyrelord Vexis","Deep One Elder","Crystal Dragon"])));
  add(Sp("Sulfur Wave",4,"play: dmg t 4; draw 1",S("wellspring","heal+burn",["Wildfire Blaze","Glacial Cataclysm","Seismic Devastation"],{tgt:"e"})));
  add(Re("Basin Flash",4,"play: heal 6",S("wellspring","heal+burn",["Pyroclasm Reflex","Frozen Moment","Stone Aegis"])));
  add(Au("Sulfur Banner",5,"start: heal 3 | heal: dmg face 1",S("wellspring","heal+burn",["Hearth of Embers","Eternal Winter","Heart of the World"])));

  /* ---- hotspring (20) ---- */
  setR("c");
  add(Cr("Basin Weaver",4,5,5,"","attack: buff self 1 0 tmp",S("hotspring","heal+buff",["Magma Golem","Deepwater Scholar","Mountain Guardian"])));
  add(Cr("Wellspring Golem",2,3,3,"","death: heal 3",S("hotspring","heal+buff",["Brimstone Guard","Kelp Lurker","Crystal Burrower"])));
  add(Cr("Hot-spring Familiar",2,3,3,"","attack: buff self 1 0 tmp",S("hotspring","heal+buff",["Torchbearer","Mist Weaver","Granite Guard"])));
  add(Cr("Sulfur Familiar",2,3,3,"","play: heal 4",S("hotspring","heal+buff",["Apprentice Pyromancer","Tidepool Healer","Burrow Mole"])));
  add(Cr("Mineral Imp",2,3,3,"","play: buff self 1 1",S("hotspring","heal+buff",["Smokescreen Imp","Rime Watcher","Stonecaller"])));
  add(Sp("Wellspring Torrent",1,"play: heal 3; draw 1",S("hotspring","heal+buff",["Stoke the Coals","Soothing Rain","Boulder Toss"])));
  add(Sp("Mineral Torrent",2,"play: buff t 2 0; kw t pierce",S("hotspring","heal+buff",["Combust","Shatter","Overgrowth"],{tgt:"o"})));
  add(Re("Wellspring Flash",2,"play: buff t 0 3 tmp; heal 2",S("hotspring","heal+buff",["Flash Fire","Frost Snap","Rock Shield"],{tgt:"o"})));
  add(Re("Wellspring Ward",2,"play: buff t 2 2 tmp",S("hotspring","heal+buff",["Inferno Surge","Chill","Earthen Ward"],{tgt:"o"})));
  add(Au("Mud Beacon",2,"start: buff ostr 1 1",S("hotspring","heal+buff",["Smoldering Tome","Tidal Archive","Mountain's Patience"])));
  add(Au("Basin Shrine",2,"start: buff ostr 1 1",S("hotspring","heal+buff",["Furnace of Rage","Tidal Mastery","Fortress Walls"])));
  setR("u");
  add(Cr("Sulfur Spirit",4,5,5,"","play: buff ostr 1 1",S("hotspring","heal+buff",["Inferno Charger","Abyssal Lurker","Cavern Troll"])));
  add(Cr("Geyser Familiar",3,4,4,"","play: buff self 1 1",S("hotspring","heal+buff",["Sun Priestess","Mistborn Assassin","Iron Tortoise"])));
  add(Cr("Thermal Serpent",4,5,5,"","attack: buff self 1 0 tmp",S("hotspring","heal+buff",["Emberlord Captain","Pearl Sovereign","Ancient Guardian"])));
  add(Sp("Spouting Call",3,"play: dmg t 3; heal 2",S("hotspring","heal+buff",["Fireball","Great Ebb","Unearth"],{tgt:"e"})));
  add(Sp("Steaming Ritual",3,"play: dmg t 3; heal 2",S("hotspring","heal+buff",["Chain of Flame","Deep Insight","Fault Line"],{tgt:"e"})));
  add(Re("Mud Feint",2,"play: buff t 1 1 tmp",S("hotspring","heal+buff",["Backdraft","Absolute Zero","Stone Aegis"],{tgt:"oatk"})));
  add(Au("Geyser Banner",3,"heal: zaps 1 1",S("hotspring","heal+buff",["Altar of Embers","Ocean's Blessing","Stone Sanctuary"])));
  setR("r");
  add(Cr("Sulfur Adept",5,7,7,"","play: buff own 1 1",S("hotspring","heal+buff",["Blazewing Matriarch","Leviathan Elder","Diamondhide Wurm"])));
  add(Cr("Mud Caller",4,5,6,"","play: buff ostr 1 1",S("hotspring","heal+buff",["Ember Queen","Siren Queen","Granite Juggernaut"])));
  add(Sp("Sulfur Storm",4,"play: mend own all; heal 2",S("hotspring","heal+buff",["Wildfire Blaze","Glacial Torrent","Seismic Devastation"])));
  add(Re("Sulfur Feint",5,"play: buff t 0 3 tmp; heal 2",S("hotspring","heal+buff",["Pyroclasm Reflex","Reverse Current","Tremor Trap"],{tgt:"o"})));
  add(Au("Hot-spring Totem",4,"start: buff ostr 1 1",S("hotspring","heal+buff",["Crown of Cinders","Eternal Winter","Heart of the World"])));

  /* ---- mudslide (20) ---- */
  setR("c");
  add(Cr("Wellspring Tortoise",3,2,5,"drain","play: fort t 1",S("mudslide","heal+fortify+drain",["Pyre Dancer","Bubble Mage","Cliffside Watcher"],{tgt:"o"})));
  add(Cr("Thermal Sentry",2,2,3,"drain","play: heal 4",S("mudslide","heal+fortify+drain",["Ashen Brawler","Kelp Lurker","Bedrock Wall"])));
  add(Cr("Steaming Colossus",3,2,5,"drain","death: fort own 1",S("mudslide","heal+fortify+drain",["Bonfire Keeper","Coral Warden","Geode Burrower"])));
  add(Cr("Mud Giant",3,2,5,"drain","play: mend own 2",S("mudslide","heal+fortify+drain",["Flamecaller Adept","Reef Guardian","Grove Shaper"])));
  add(Cr("Wellspring Keeper",1,1,2,"drain","play: fort t 1",S("mudslide","heal+fortify+drain",["Molten Hatchling","Frost Sprite","Pebble Golem"],{tgt:"o"})));
  add(Sp("Spouting Burst",2,"play: fort own 1",S("mudslide","heal+fortify",["Scorch","Tidal Insight","Quake"])));
  add(Sp("Basin Rain",2,"play: dmg t 2; heal 2",S("mudslide","heal+fortify",["Blaze of Insight","Riptide Reversal","Overgrowth"],{tgt:"e"})));
  add(Re("Sulfur Ward",1,"play: heal 3",S("mudslide","heal+fortify",["Wild Surge","Undertow","Rock Shield"])));
  add(Re("Sulfur Flash",1,"play: fort t 1; buff t 1 1 tmp",S("mudslide","heal+fortify",["Wildfire Ignition","Tidal Shield","Earthen Ward"],{tgt:"o"})));
  add(Au("Hot-spring Font",2,"start: mend own 1",S("mudslide","heal+fortify",["Smoldering Tome","Healing Spring","Mountain's Patience"])));
  setR("u");
  add(Cr("Thermal Keeper",4,3,6,"drain","start: heal 2",S("mudslide","heal+fortify+drain",["Living Wildfire","Coral Hydra","Jade Behemoth"])));
  add(Cr("Mud Tortoise",3,2,5,"drain","start: fort ostr 1",S("mudslide","heal+fortify+drain",["Scorchclaw Ravager","Wavecrest Mage","Stoneheart Sentinel"])));
  add(Cr("Mud Warden",4,3,6,"drain","start: fort ostr 1",S("mudslide","heal+fortify+drain",["Solar Flare Drake","Siren of the Shoals","Tremor Lord"])));
  add(Sp("Hot-spring Wave",3,"play: dmg t 3; heal 2",S("mudslide","heal+fortify",["Raging Inferno","Frozen Tomb","Seismic Pulse"],{tgt:"e"})));
  add(Re("Basin Feint",3,"play: heal 5",S("mudslide","heal+fortify",["Ember Shield","Counterflow","Tremor Trap"])));
  add(Au("Basin Beacon",3,"heal: dmg face 1",S("mudslide","heal+fortify",["Crown of Cinders","Tidal Archive","Sacred Grove"])));
  setR("r");
  add(Cr("Sulfur Titan",5,4,9,"drain","death: heal 3",S("mudslide","heal+fortify+drain",["Lavaheart Titan","Shoal Leviathan","Bedrock Leviathan"])));
  add(Cr("Mineral Tortoise",5,4,9,"drain","play: fort t 1",S("mudslide","heal+fortify+drain",["Magmaforge Golem","Frostfang Wyrm","Gaia's Avatar"],{tgt:"o"})));
  add(Sp("Geyser Call",4,"play: fort t 2; buff t 1 0",S("mudslide","heal+fortify",["Dragonfire","Glacial Cataclysm","Cataclysmic Quake"],{tgt:"o"})));
  add(Re("Basin Retort",2,"play: buff t 0 3 tmp; heal 2",S("mudslide","heal+fortify",["Inferno Surge","Ice Prison","Stone Aegis"],{tgt:"o"})));
  add(Au("Mineral Shrine",5,"start: fort own 1",S("mudslide","heal+fortify",["Altar of Embers","Eternal Winter","Heart of the World"])));

  /* ---- vent (20) ---- */
  setR("c");
  add(Cr("Hot-spring Brute",2,3,3,"","death: dmg all_e 1",S("vent","burn+heal",["Reckless Raider","Tide Sprite","Spiked Barricade"])));
  add(Cr("Geyser Duelist",2,3,3,"","play: dmg t 2",S("vent","burn+heal",["Phoenix Chick","Whirlpool Mage","Thornback Boar"],{tgt:"e"})));
  add(Cr("Mineral Lancer",1,2,2,"","death: heal 3",S("vent","burn+heal",["Ember Whelp","Brook Otter","Clay Homunculus"])));
  add(Cr("Sulfur Raider",1,2,2,"","death: dmg all_e 1",S("vent","burn+heal",["Molten Hatchling","Tide Sprite","Stone Sentry"])));
  add(Cr("Steaming Duelist",2,3,3,"","play: dmg face 1",S("vent","burn+heal",["Ember Duelist","Narwhal Lancer","Crag Brute"])));
  add(Sp("Thermal Rain",1,"play: mend own all; heal 2",S("vent","burn+heal",["Overheat","Whirlpool Trap","Fertile Ground"])));
  add(Sp("Spouting Rite",1,"play: dmg all_e 1",S("vent","burn+heal",["Flare Up","Tidal Insight","Boulder Toss"])));
  add(Re("Thermal Riposte",3,"play: heal 5",S("vent","burn+heal",["Heat Surge","Riptide Counter","Rock Shield"])));
  add(Au("Basin Font",3,"start: heal 2",S("vent","burn+heal",["Everburning Brazier","Permafrost Shrine","Ley Line"])));
  setR("u");
  add(Cr("Mud Brute",3,5,3,"","play: dmg t 3",S("vent","burn+heal",["Flame Warden","Wave Dancer","Earthshaker Ogre"],{tgt:"e"})));
  add(Cr("Thermal Drake",4,6,4,"","heal: buff self 1 0",S("vent","burn+heal",["Firebrand Knight","Kraken Spawn","Ironbark Treant"])));
  add(Cr("Basin Duelist",4,6,4,"","play: dmg t 3",S("vent","burn+heal",["Cinder Swarm","Tidal Archmage","Terravore"],{tgt:"e"})));
  add(Sp("Geyser Torrent",2,"play: dmg t 2",S("vent","burn+heal",["Fury Unleashed","Tidal Scroll","Earth's Fury"],{tgt:"ea"})));
  add(Re("Mineral Recoil",4,"play: dmg t 4",S("vent","burn+heal",["Backdraft","Nullify","Earthen Ward"],{tgt:"ea"})));
  add(Au("Geyser Totem",2,"end: dmg face 1",S("vent","burn+heal",["Furnace of Rage","Sea of Clarity","Fortress Walls"])));
  setR("r");
  add(Cr("Hot-spring Lancer",6,9,7,"","attack: dmg face 1",S("vent","burn+heal",["Searing Overlord","Wavebreaker Champion","Avalanche Titan"])));
  add(Cr("Mud Striker",5,8,6,"","play: dmg all_e 2",S("vent","burn+heal",["Flamewing Dragon","Deep One Elder","Obsidian Golem"])));
  add(Sp("Spouting Torrent",6,"play: dmg all_e 2",S("vent","burn+heal",["Pyre Ascension","Glacial Torrent","Seismic Devastation"])));

  /* ---- sinter (15) ---- */
  setR("c");
  add(Cr("Basin Warden",3,1,6,"wall","play: fort t 1",S("sinter","burn+fortify+wall",["Lava Hound","Frostbite Shade","Canyon Ram"],{tgt:"o"})));
  add(Cr("Spouting Keeper",2,1,4,"wall","death: fort own 1",S("sinter","burn+fortify+wall",["Blazing Martyr","Tidecaller Shaman","Amber Golem"])));
  add(Cr("Wellspring Bulwark",1,1,3,"","death: fort own 1",S("sinter","burn+fortify",["Pyre Zealot","Frost Sprite","Crystal Sprout"])));
  add(Cr("Sulfur Watcher",2,1,4,"wall","play: dmg face 1",S("sinter","burn+fortify+wall",["Blood-Fire Berserker","Glacier Wolf","Druid of the Stone"])));
  add(Sp("Mud Rite",2,"play: fort t 2; buff t 1 0",S("sinter","burn+fortify",["Call the Embers","Flowing Wisdom","Rockslide"],{tgt:"o"})));
  add(Re("Geyser Feint",1,"play: dmg t 1",S("sinter","burn+fortify",["Flash Fire","Frozen Aegis","Rock Shield"],{tgt:"ea"})));
  add(Au("Basin Grove",2,"start: zaps 1 1",S("sinter","burn+fortify",["Kindling Hearth","Tidal Mastery","Mountain's Patience"])));
  setR("u");
  add(Cr("Thermal Titan",4,1,8,"wall","die: fort own 1",S("sinter","burn+fortify+wall",["Cinderstorm Mage","Harbor Golem","Earthquake Beetle"])));
  add(Cr("Basin Keeper",3,3,5,"","attack: dmg face 1",S("sinter","burn+fortify",["Hellforge Smith","Hydromancer","Quartz Elemental"])));
  add(Sp("Basin Wave",2,"play: fort t 2; buff t 1 0",S("sinter","burn+fortify",["Rally the Flames","Healing Torrent","Unyielding Earth"],{tgt:"o"})));
  setR("r");
  add(Cr("Steaming Tortoise",6,1,14,"wall","play: dmg t 3",S("sinter","burn+fortify+wall",["Magma Behemoth","Deepsea Hydra","Primordial Titan"],{tgt:"e"})));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.GEYSER_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["geyser"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
