/* ================= SWAMP CATALOG (designed confluence cards, generated first draft) =================
   Water + Earth. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   gravetide (25: revive + tokens), mire (20: heal + burn), rot (20: shrink), bogspawn (20: tokens + sacrifice), peat (15: fortify + burn).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [water, earth]. */
// Loaded by build.py inside catalogBegin("swamp")/catalogEnd("swamp") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.SWAMP_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"swamp" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.SWAMP_CATALOG.push(d); return d; };
  setEl("swamp");

  /* ---- gravetide (25) ---- */
  setR("c");
  add(Cr("Mire Weaver",1,2,2,"","play: summon mudling 1",S("gravetide","revive+tokens",["Frost Sprite","Pebble Golem"])));
  add(Cr("Mossy Scout",2,2,3,"venom","death: summon mudling 1",S("gravetide","revive+tokens+venom",["Riverbank Sage","Bedrock Wall"])));
  add(Cr("Mossy Golem",1,2,2,"","death: summon mudling 1",S("gravetide","revive+tokens",["Brook Otter","Stone Sentry"])));
  add(Cr("Murk Serpent",2,3,3,"","play/grave2: buff self 1 1",S("gravetide","revive+tokens",["Rime Watcher","Seed Bearer"])));
  add(Cr("Rotting Spirit",3,3,4,"venom","death: summon mudling 1",S("gravetide","revive+tokens+venom",["Winter Mage","Geode Burrower"])));
  add(Cr("Silt Serpent",2,2,3,"venom","play/grave2: buff self 1 1",S("gravetide","revive+tokens+venom",["Kelp Lurker","Thornback Boar"])));
  add(Sp("Sodden Blast",2,"play: regrow 1 creature; draw 1",S("gravetide","revive+tokens",["Tidal Insight","Quake"])));
  add(Sp("Rotting Surge",2,"play: summon mudling 1",S("gravetide","revive+tokens",["Flowing Wisdom","Rockslide"])));
  add(Sp("Fen Wave",1,"play: revive 1",S("gravetide","revive+tokens",["Ebb and Flow","Fertile Ground"])));
  add(Re("Sodden Recoil",2,"play: summon mudling 1; buff tok 1 0 tmp",S("gravetide","revive+tokens",["Dispel","Rock Shield"])));
  add(Re("Sunken Ward",2,"play: summon mudling 1",S("gravetide","revive+tokens",["Icy Grip","Earthen Ward"])));
  add(Au("Fen Totem",1,"end: summon mudling 1",S("gravetide","revive+tokens",["Tidal Mastery","Crystal Resonance"])));
  add(Au("Mossy Sanctum",2,"end/grave3: summon mudling 1",S("gravetide","revive+tokens",["Permafrost Shrine","Mountain's Patience"])));
  setR("u");
  add(Cr("Sunken Shaman",4,5,5,"","death: summon mudling 1",S("gravetide","revive+tokens",["Abyssal Lurker","Basalt Champion"])));
  add(Cr("Sunken Elemental",4,5,5,"","die: heal 1",S("gravetide","revive+tokens",["Coral Hydra","Cavern Troll"])));
  add(Cr("Sodden Weaver",4,4,5,"venom","death: summon mudling 1",S("gravetide","revive+tokens+venom",["Siren of the Shoals","Jade Behemoth"])));
  add(Cr("Mire Serpent",4,4,5,"venom","play: summon mudling 1",S("gravetide","revive+tokens+venom",["Icewall Colossus","Tremor Lord"])));
  add(Sp("Mire Ritual",3,"play: regrow 1 creature; draw 1",S("gravetide","revive+tokens",["Cold Snap","Unearth"])));
  add(Sp("Mire Blast",3,"play: summon mudling 2; buff tok 1 0 tmp",S("gravetide","revive+tokens",["Great Ebb","Fault Line"])));
  add(Re("Sunken Riposte",4,"play: revive 1",S("gravetide","revive+tokens",["Counterflow","Tremor Trap"])));
  add(Au("Murk Font",3,"end: summon mudling 1",S("gravetide","revive+tokens",["Ocean's Blessing","Sacred Grove"])));
  setR("r");
  add(Cr("Peat Caller",6,7,8,"venom","death: summon mudling 1",S("gravetide","revive+tokens+venom",["Leviathan Elder","Avalanche Titan"])));
  add(Cr("Bog Weaver",6,7,8,"venom","death: summon mudling 3",S("gravetide","revive+tokens+venom",["Deepsea Hydra","Primordial Titan"])));
  add(Cr("Bog Serpent",5,6,7,"venom","play/grave2: buff self 1 1",S("gravetide","revive+tokens+venom",["Deep One Elder","Gaia's Avatar"])));
  add(Sp("Rotting Rain",3,"play: revive 1",S("gravetide","revive+tokens",["Glacial Cataclysm","Cataclysmic Quake"])));
  add(Re("Sunken Guard",4,"play: summon mudling 1; buff tok 1 0 tmp",S("gravetide","revive+tokens",["Reverse Current","Stone Aegis"])));
  add(Au("Bog Field",4,"start: revive 1",S("gravetide","revive+tokens",["Eternal Winter","Heart of the World"])));

  /* ---- mire (20) ---- */
  setR("c");
  add(Cr("Sodden Colossus",1,1,2,"drain","play: dmg t 1",S("mire","heal+burn+drain",["Tide Sprite","Clay Homunculus"],{tgt:"e"})));
  add(Cr("Bog Behemoth",1,1,2,"drain","death: heal 3",S("mire","heal+burn+drain",["Coral Crab","Root Tender"])));
  add(Cr("Sunken Colossus",2,2,4,"","death: dmg all_e 1",S("mire","heal+burn",["Tidepool Healer","Crystal Burrower"])));
  add(Cr("Sunken Giant",2,2,4,"","attack: dmg face 1",S("mire","heal+burn",["Mist Weaver","Granite Guard"])));
  add(Cr("Fen Tortoise",2,2,4,"","play: heal 4",S("mire","heal+burn",["Pearl Diver","Spiked Barricade"])));
  add(Sp("Sunken Surge",1,"play: dmg t 2",S("mire","heal+burn",["Ebb and Flow","Boulder Toss"],{tgt:"e"})));
  add(Sp("Mire Burst",1,"play: dmg t 2",S("mire","heal+burn",["Soothing Rain","Earthen Blessing"],{tgt:"e"})));
  add(Re("Murk Snap",1,"play: dmg t 2",S("mire","heal+burn",["Undertow","Rock Shield"],{tgt:"eatk"})));
  add(Re("Bog Riposte",2,"play: buff t 0 3 tmp; heal 2",S("mire","heal+burn",["Chill","Earthen Ward"],{tgt:"o"})));
  add(Au("Murk Sanctum",2,"start: zaps 1 1",S("mire","heal+burn",["Sea of Clarity","Ley Line"])));
  add(Au("Bog Shrine",2,"start: mend own 1",S("mire","heal+burn",["Tidal Archive","Fortress Walls"])));
  setR("u");
  add(Cr("Mire Bulwark",3,3,5,"","play: mend own 2",S("mire","heal+burn",["Tideborn Knight","Earthshaker Ogre"])));
  add(Cr("Rotting Warden",4,3,6,"drain","start: zaps 1 2",S("mire","heal+burn+drain",["Pearl Sovereign","Ancient Guardian"])));
  add(Cr("Silt Giant",3,3,5,"","edie: buff self 1 1",S("mire","heal+burn",["Mistborn Assassin","Iron Tortoise"])));
  add(Sp("Sunken Gift",3,"play: dmg all_e 1",S("mire","heal+burn",["Crashing Wave","Unyielding Earth"])));
  add(Sp("Mossy Rain",2,"play: mend own all; heal 2",S("mire","heal+burn",["Frozen Tomb","Seismic Pulse"])));
  add(Re("Mossy Guard",3,"play: dmg t 4",S("mire","heal+burn",["Absolute Zero","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Mire Totem",3,"start: zaps 1 1",S("mire","heal+burn",["Healing Spring","Sacred Grove"])));
  setR("r");
  add(Cr("Sodden Warden",6,5,10,"drain","start: mend own all; heal 2",S("mire","heal+burn+drain",["Frost Giant","Primordial Titan"])));
  add(Cr("Mossy Wall",5,4,9,"drain","attack: dmg face 1",S("mire","heal+burn+drain",["Leviathan Elder","Crystal Dragon"])));
  add(Sp("Peat Rite",3,"play: dmg t 3",S("mire","heal+burn",["Healing Torrent","Cataclysmic Quake"],{tgt:"ea"})));
  add(Re("Peat Guard",6,"play: dmg t 6",S("mire","heal+burn",["Frozen Moment","Stone Aegis"],{tgt:"ea"})));
  add(Au("Mire Shrine",4,"start: zaps 1 1",S("mire","heal+burn",["Ocean's Blessing","Heart of the World"])));

  /* ---- rot (20) ---- */
  setR("c");
  add(Cr("Peat Sentinel",3,3,4,"venom","attack: buff str -1 0",S("rot","shrink+venom",["Whirlpool Mage","Cliffside Watcher"])));
  add(Cr("Peat Serpent",1,2,2,"","play: buff t -2 0",S("rot","shrink",["Brook Otter","Stonecaller"],{tgt:"e"})));
  add(Cr("Peat Spirit",2,2,3,"venom","attack: buff str -1 0",S("rot","shrink+venom",["Tide Caller","Burrow Mole"])));
  add(Cr("Sunken Scout",3,4,4,"","play: buff t -2 0",S("rot","shrink",["Reef Guardian","Ironhide Rhino"],{tgt:"e"})));
  add(Cr("Sodden Sentinel",2,2,3,"venom","play: buff t -1 -1",S("rot","shrink+venom",["Riptide Rogue","Crag Brute"],{tgt:"e"})));
  add(Sp("Peat Wave",3,"play: buff t -2 -2",S("rot","shrink",["Cold Snap","Overgrowth"],{tgt:"e"})));
  add(Sp("Mossy Ritual",2,"play: buff t -1 -1",S("rot","shrink",["Shatter","Stone Skin"],{tgt:"e"})));
  add(Re("Bog Snap",2,"play: buff t -2 -2",S("rot","shrink",["Riptide Counter","Rock Shield"],{tgt:"eatk"})));
  add(Re("Sunken Feint",2,"play: buff t -2 -2",S("rot","shrink",["Frost Snap","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Rotting Engine",1,"start: buff rnd -1 0",S("rot","shrink",["Tidal Mastery","Mountain's Patience"])));
  setR("u");
  add(Cr("Rotting Serpent",5,6,6,"venom","start: buff rnd -1 -1",S("rot","shrink+venom",["Shoal Leviathan","Emerald Wyrm"])));
  add(Cr("Sunken Golem",3,4,4,"","play: buff t -1 -1",S("rot","shrink",["Wave Dancer","Stoneheart Sentinel"],{tgt:"e"})));
  add(Cr("Peat Golem",4,5,5,"","start: buff rnd -1 -1",S("rot","shrink",["Sea Serpent","Ironbark Treant"])));
  add(Sp("Murk Burst",2,"play: buff t -1 -1",S("rot","shrink",["Deep Insight","Earth's Fury"],{tgt:"e"})));
  add(Re("Sodden Guard",3,"play: buff t -2 -2",S("rot","shrink",["Nullify","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Rotting Sanctum",2,"start: buff rnd -1 -1",S("rot","shrink",["Sea of Clarity","Stone Sanctuary"])));
  setR("r");
  add(Cr("Mossy Familiar",4,5,6,"","attack: buff str -1 0",S("rot","shrink",["Coral Titan","Granite Juggernaut"])));
  add(Cr("Bog Shaman",5,6,7,"venom","play: buff t -2 0",S("rot","shrink+venom",["Deepsea Hydra","Bedrock Leviathan"],{tgt:"e"})));
  add(Sp("Fen Torrent",5,"play: buff all_e -1 0; draw 1",S("rot","shrink",["Glacial Torrent","Seismic Devastation"])));
  add(Re("Mire Riposte",4,"play: buff t -2 -2",S("rot","shrink",["Ice Prison","Stone Aegis"],{tgt:"eatk"})));
  add(Au("Rotting Shrine",5,"start: buff rnd -1 0",S("rot","shrink",["Healing Spring","Stone Sanctuary"])));

  /* ---- bogspawn (20) ---- */
  setR("c");
  add(Cr("Sodden Caller",2,3,3,"","play: summon mudling 1",S("bogspawn","tokens+sacrifice",["Glacier Wolf","Druid of the Stone"])));
  add(Cr("Sunken Sentinel",3,3,4,"venom","death: dmg all_e 1",S("bogspawn","tokens+sacrifice+venom",["Coral Warden","Quarry Shaman"])));
  add(Cr("Bog Caller",3,4,4,"","death: dmg all_e 1",S("bogspawn","tokens+sacrifice",["Frostbite Shade","Rampart Elder"])));
  add(Cr("Murk Shaman",2,3,3,"","play/own2: sac; buff self 2 2",S("bogspawn","tokens+sacrifice",["Tidecaller Shaman","Worldroot Sapling"])));
  add(Cr("Sodden Scout",3,3,4,"venom","death: summon mudling 1",S("bogspawn","tokens+sacrifice+venom",["Narwhal Lancer","Bulwark Golem"])));
  add(Sp("Silt Rite",2,"play: summon mudling 1; buff tok 1 0 tmp",S("bogspawn","tokens+sacrifice",["Riptide Reversal","Overgrowth"])));
  add(Sp("Mossy Volley",1,"play: summon mudling 1",S("bogspawn","tokens+sacrifice",["Whirlpool Trap","Rapid Growth"])));
  add(Re("Sunken Snap",2,"play: sac; dmg t 0 x",S("bogspawn","tokens+sacrifice",["Whiplash Tide","Rock Shield"],{tgt:"e"})));
  add(Au("Sodden Font",1,"end/own3: sac; dmg face 2",S("bogspawn","tokens+sacrifice",["Permafrost Shrine","Crystal Resonance"])));
  setR("u");
  add(Cr("Fen Adept",3,3,4,"venom","play/own2: sac; buff self 2 2",S("bogspawn","tokens+sacrifice+venom",["Wavecrest Mage","Rune-Carved Golem"])));
  add(Cr("Silt Adept",4,5,5,"","token: buff self 1 0",S("bogspawn","tokens+sacrifice",["Glacial Empress","Golem Patriarch"])));
  add(Cr("Sunken Familiar",3,3,4,"venom","death: summon mudling 1",S("bogspawn","tokens+sacrifice+venom",["Hydromancer","Geode Shaman"])));
  add(Sp("Fen Rain",2,"play: sac; dmg all_e 0 x",S("bogspawn","tokens+sacrifice",["Frozen Tomb","Avalanche Shard"])));
  add(Re("Fen Reflex",4,"play: summon mudling 1; buff tok 1 0 tmp",S("bogspawn","tokens+sacrifice",["Sudden Current","Earthen Ward"])));
  add(Au("Mire Grove",3,"start: summon mudling 1",S("bogspawn","tokens+sacrifice",["Permafrost Shrine","Ley Line"])));
  setR("r");
  add(Cr("Sodden Shaman",5,6,7,"venom","death: summon mudling 3",S("bogspawn","tokens+sacrifice+venom",["Siren Queen","Diamondhide Wurm"])));
  add(Cr("Murk Scout",5,6,7,"venom","death: summon mudling 1",S("bogspawn","tokens+sacrifice+venom",["Deep One Elder","Mountain Strider"])));
  add(Sp("Rotting Torrent",5,"play: summon mudling 3; buff tok 1 0 tmp",S("bogspawn","tokens+sacrifice",["Glacial Cataclysm","Seismic Devastation"])));

  /* ---- peat (15) ---- */
  setR("c");
  add(Cr("Murk Warden",2,2,4,"","death: fort own 1",S("peat","fortify+burn",["Kelp Lurker","Bedrock Wall"])));
  add(Cr("Murk Watcher",1,1,3,"","play: fort t 1",S("peat","fortify+burn",["Frost Sprite","Stone Sentry"],{tgt:"o"})));
  add(Cr("Sodden Titan",2,2,4,"","play: dmg t 2",S("peat","fortify+burn",["Tidepool Healer","Spiked Barricade"],{tgt:"e"})));
  add(Cr("Sunken Tortoise",4,3,7,"","play: dmg face 1",S("peat","fortify+burn",["Shiver Elemental","Hill Giant"])));
  add(Sp("Mossy Rite",1,"play: dmg all_e 1",S("peat","fortify+burn",["Flowing Wisdom","Petrify"])));
  add(Re("Mossy Feint",1,"play: fort t 2",S("peat","fortify+burn",["Tidal Shield","Rock Shield"],{tgt:"o"})));
  add(Au("Rotting Font",2,"start: fort ostr 1",S("peat","fortify+burn",["Tidal Mastery","Fortress Walls"])));
  setR("u");
  add(Cr("Rotting Behemoth",3,3,5,"","play: dmg t 3",S("peat","fortify+burn",["Deep Oracle","Quartz Elemental"],{tgt:"e"})));
  add(Cr("Sunken Guardian",4,3,7,"","start: fort ostr 1",S("peat","fortify+burn",["Wavebreaker Champion","Grand Geomancer"])));
  add(Sp("Sunken Call",3,"play: dmg t 4",S("peat","fortify+burn",["Tidal Scroll","Shatter the Earth"],{tgt:"e"})));
  setR("r");
  add(Cr("Peat Keeper",6,5,11,"","play: fort t 1",S("peat","fortify+burn",["Frostfang Wyrm","Avalanche Titan"],{tgt:"o"})));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.SWAMP_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["swamp"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
