/* ================= GLACIER CATALOG (designed confluence cards, generated first draft) =================
   Water + Earth + Wind. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   bulwark (25: fortify + burn), iceberg (20: freeze + fortify), avalanche (20: freeze + burn), snowfield (20, support: freeze + heal), calving (15: freeze + tokens).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [water, earth, wind]. */
// Loaded by build.py inside catalogBegin("glacier")/catalogEnd("glacier") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.GLACIER_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"glacier" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.GLACIER_CATALOG.push(d); return d; };
  setEl("glacier");

  /* ---- bulwark (25) ---- */
  setR("c");
  add(Cr("Bulwark Watcher",2,2,4,"","play: dmg face 1",S("bulwark","fortify+burn",["Pearl Diver","Crystal Burrower","Zephyr Courier"])));
  add(Cr("Polar Warden",2,2,4,"","attack: dmg face 1",S("bulwark","fortify+burn",["Riverbank Sage","Bedrock Wall","Breeze Messenger"])));
  add(Cr("Snowpack Guardian",1,1,3,"","death: fort own 1",S("bulwark","fortify+burn",["Coral Crab","Stone Sentry","Swift Courier"])));
  add(Cr("Snowpack Watcher",1,1,2,"skyguard","play: dmg face 1",S("bulwark","fortify+burn+skyguard",["Tide Sprite","Pebble Golem","Gust Sprite"])));
  add(Cr("Rimewall Bulwark",1,1,2,"wall","play: fort t 1",S("bulwark","fortify+burn+wall",["Brook Otter","Root Tender","Sparrow Scout"],{tgt:"o"})));
  add(Cr("Snowpack Colossus",2,1,4,"wall","play: fort self 1",S("bulwark","fortify+burn+wall",["Kelp Lurker","Stonecaller","Feather Sprite"])));
  add(Sp("Rimewall Torrent",2,"play: fort own 1",S("bulwark","fortify+burn",["Tidal Insight","Overgrowth","Recall Gust"])));
  add(Sp("Polar Volley",2,"play: fort t 2; buff t 1 0",S("bulwark","fortify+burn",["Flowing Wisdom","Rockslide","Wingbeat"],{tgt:"o"})));
  add(Sp("Tundra Call",1,"play: fort t 2; buff t 1 0",S("bulwark","fortify+burn",["Ebb and Flow","Fertile Ground","Cyclone Kick"],{tgt:"o"})));
  add(Re("Moraine Riposte",2,"play: dmg t 2",S("bulwark","fortify+burn",["Chill","Rock Shield","Evasive Maneuver"],{tgt:"ea"})));
  add(Re("Floe Riposte",1,"play: dmg t 1",S("bulwark","fortify+burn",["Tidal Shield","Earthen Ward","Sidestep"],{tgt:"ea"})));
  add(Au("Moraine Sanctum",1,"start: fort ostr 1",S("bulwark","fortify+burn",["Sea of Clarity","Mountain's Patience","Sky Temple"])));
  add(Au("Floe Font",2,"end: dmg face 1",S("bulwark","fortify+burn",["Tidal Mastery","Ley Line","Jet Stream"])));
  setR("u");
  add(Cr("Bulwark Wall",3,1,6,"wall","play: dmg t 4",S("bulwark","fortify+burn+wall",["Kraken Spawn","Rune-Carved Golem","Sky Pirate"],{tgt:"e"})));
  add(Cr("Snowpack Titan",4,3,7,"","edie: buff self 1 1",S("bulwark","fortify+burn",["Icewall Colossus","Basalt Champion","Gust Knight"])));
  add(Cr("Icecap Warden",4,3,7,"","death: dmg all_e 1",S("bulwark","fortify+burn",["Abyssal Lurker","Ancient Guardian","Tornado Elemental"])));
  add(Cr("Glacier Guardian",4,3,7,"","death: dmg all_e 1",S("bulwark","fortify+burn",["Pearl Sovereign","Cavern Troll","Vortex Mage"])));
  add(Sp("Glacier Storm",3,"play: fort own 1",S("bulwark","fortify+burn",["Great Ebb","Cataclysmic Quake","Gale Barrage"])));
  add(Sp("Icecap Ritual",3,"play: dmg t 4",S("bulwark","fortify+burn",["Cold Snap","Unearth","Updraft Swarm"],{tgt:"e"})));
  add(Re("Floe Guard",2,"play: dmg t 2",S("bulwark","fortify+burn",["Sudden Current","Stone Aegis","Vanishing Wind"],{tgt:"ea"})));
  add(Au("Icecap Font",3,"creature: fort self 1",S("bulwark","fortify+burn",["Healing Spring","Sacred Grove","Aerie"])));
  setR("r");
  add(Cr("Rimewall Giant",5,4,9,"skyguard","play: dmg face 1",S("bulwark","fortify+burn+skyguard",["Leviathan Elder","Diamondhide Wurm","Ancient Wind Spirit"])));
  add(Cr("Permafrost Sentry",6,5,10,"skyguard","play: fort self 1",S("bulwark","fortify+burn+skyguard",["Deepsea Hydra","Primordial Titan","Cloud Titan"])));
  add(Cr("Snowpack Sentry",6,5,10,"skyguard","play: dmg all_e 2",S("bulwark","fortify+burn+skyguard",["Deep One Elder","Avalanche Titan","Aerie Matriarch"])));
  add(Sp("Floe Storm",6,"play: fort t 2; buff t 1 0",S("bulwark","fortify+burn",["Glacial Cataclysm","Seismic Devastation","Squall Line"],{tgt:"o"})));
  add(Re("Permafrost Guard",4,"play: dmg t 6",S("bulwark","fortify+burn",["Reverse Current","Tremor Trap","Perfect Gale"],{tgt:"eatk"})));
  add(Au("Floe Engine",4,"start: fort own 1",S("bulwark","fortify+burn",["Eternal Winter","Heart of the World","Eye of Eternity"])));

  /* ---- iceberg (20) ---- */
  setR("c");
  add(Cr("Bulwark Keeper",2,2,4,"","play: fort self 1",S("iceberg","freeze+fortify",["Tidepool Healer","Granite Guard","Drifting Monk"])));
  add(Cr("Floe Watcher",1,1,3,"","play: fort t 1",S("iceberg","freeze+fortify",["Frost Sprite","Clay Homunculus","Storm Crow"],{tgt:"o"})));
  add(Cr("Glacier Watcher",2,2,3,"ward","play: fort self 1",S("iceberg","freeze+fortify+ward",["Mist Weaver","Seed Bearer","Skyward Scout"])));
  add(Cr("Permafrost Keeper",2,2,3,"ward","death: fort own 1",S("iceberg","freeze+fortify+ward",["Rime Watcher","Thornback Boar","Wind Wanderer"])));
  add(Cr("Moraine Watcher",2,2,4,"","play: fort self 1",S("iceberg","freeze+fortify",["Glacier Wolf","Spiked Barricade","Kestrel Rider"])));
  add(Sp("Moraine Storm",1,"play: freeze all_e",S("iceberg","freeze+fortify",["Shatter","Boulder Toss","Tailwind Rush"])));
  add(Sp("Permafrost Rain",1,"play: freeze t; draw 1",S("iceberg","freeze+fortify",["Ebb and Flow","Earthen Blessing","Updraft"],{tgt:"e"})));
  add(Re("Tundra Recoil",2,"play: fort t 1; buff t 1 1 tmp",S("iceberg","freeze+fortify",["Dispel","Rock Shield","Crosswind"],{tgt:"o"})));
  add(Re("Glacier Ward",2,"play: freeze t; dmg t 1",S("iceberg","freeze+fortify",["Frost Snap","Earthen Ward","Tailwind"],{tgt:"eatk"})));
  add(Au("Icecap Shrine",3,"start: fort ostr 1",S("iceberg","freeze+fortify",["Tidal Archive","Fortress Walls","Wind Chimes"])));
  add(Au("Glacier Engine",1,"start: freeze str",S("iceberg","freeze+fortify",["Permafrost Shrine","Crystal Resonance","Sky Temple"])));
  setR("u");
  add(Cr("Permafrost Tortoise",4,3,6,"ward","start: fort ostr 1",S("iceberg","freeze+fortify+ward",["Coral Hydra","Jade Behemoth","Raptor of the Peaks"])));
  add(Cr("Tundra Sentry",4,3,6,"ward","freeze: dmg face 1",S("iceberg","freeze+fortify+ward",["Siren of the Shoals","Tremor Lord","Storm Roc"])));
  add(Cr("Moraine Warden",4,3,6,"ward","start: fort ostr 1",S("iceberg","freeze+fortify+ward",["Frostfang Wyrm","Earthquake Beetle","Lord of the Skies"])));
  add(Sp("Icecap Burst",3,"play: freeze all_e",S("iceberg","freeze+fortify",["Glacial Torrent","Unyielding Earth","Aerial Bombardment"])));
  add(Sp("Floe Torrent",2,"play: freeze t; draw 1",S("iceberg","freeze+fortify",["Frozen Tomb","Seismic Pulse","Wind Shear"],{tgt:"e"})));
  add(Re("Tundra Retort",3,"play: freeze t",S("iceberg","freeze+fortify",["Counterflow","Stone Aegis","Evasive Maneuver"],{tgt:"eatk"})));
  add(Au("Tundra Font",2,"start: fort ostr 1",S("iceberg","freeze+fortify",["Tidal Mastery","Stone Sanctuary","Jet Stream"])));
  setR("r");
  add(Cr("Glacier Behemoth",5,4,9,"ward","play: freeze t; dmg t 1",S("iceberg","freeze+fortify+ward",["Shoal Leviathan","Bedrock Leviathan","Tempest Dragon"],{tgt:"e"})));
  add(Cr("Polar Giant",6,5,10,"ward","play: fort own 2",S("iceberg","freeze+fortify+ward",["Frost Giant","Primordial Titan","Cloud Leviathan"])));
  add(Sp("Glacier Ritual",5,"play: freeze t; draw 1",S("iceberg","freeze+fortify",["Glacial Torrent","Seismic Devastation","Tornado"],{tgt:"e"})));
  add(Re("Floe Flash",4,"play: fort t 2",S("iceberg","freeze+fortify",["Frozen Moment","Tremor Trap","Vanishing Wind"],{tgt:"o"})));
  add(Au("Polar Field",3,"start: freeze str",S("iceberg","freeze+fortify",["Ocean's Blessing","Heart of the World","Sky Throne"])));

  /* ---- avalanche (20) ---- */
  setR("c");
  add(Cr("Rimewall Adept",2,3,3,"","attack: dmg face 1",S("avalanche","freeze+burn",["Mist Weaver","Burrow Mole","Whirlwind Acrobat"])));
  add(Cr("Polar Golem",3,4,4,"","play: dmg face 1",S("avalanche","freeze+burn",["Frostbite Shade","Geode Burrower","Gale Sage"])));
  add(Cr("Permafrost Caller",3,4,4,"","play: freeze t; dmg t 1",S("avalanche","freeze+burn",["Whirlpool Mage","Canyon Ram","Dust Devil"],{tgt:"e"})));
  add(Cr("Tundra Scout",1,2,2,"","play: dmg t 1",S("avalanche","freeze+burn",["Tide Sprite","Root Tender","Gust Sprite"],{tgt:"e"})));
  add(Cr("Bulwark Sentinel",3,4,4,"","attack: dmg face 1",S("avalanche","freeze+burn",["Reef Guardian","Quarry Shaman","Wind Dancer"])));
  add(Sp("Tundra Surge",2,"play: freeze all_e",S("avalanche","freeze+burn",["Soothing Rain","Quake","Zephyr Strike"])));
  add(Sp("Floe Wave",2,"play: freeze all_e",S("avalanche","freeze+burn",["Shatter","Fault Line","Gust of Wind"])));
  add(Re("Snowpack Reflex",2,"play: dmg t 2",S("avalanche","freeze+burn",["Riptide Counter","Rock Shield","Sky Strike"],{tgt:"ea"})));
  add(Re("Icecap Snap",1,"play: freeze t; dmg t 1",S("avalanche","freeze+burn",["Undertow","Earthen Ward","Tailwind"],{tgt:"eatk"})));
  add(Au("Snowpack Grove",2,"start: zaps 1 1",S("avalanche","freeze+burn",["Sea of Clarity","Ley Line","Jet Stream"])));
  setR("u");
  add(Cr("Rimewall Caller",4,5,5,"","attack: dmg face 1",S("avalanche","freeze+burn",["Wavebreaker Champion","Golem Patriarch","Cloud Strider"])));
  add(Cr("Rimewall Shaman",3,4,4,"","edie: buff self 1 1",S("avalanche","freeze+burn",["Wavecrest Mage","Stoneheart Sentinel","Cloudshaper"])));
  add(Cr("Rimewall Familiar",3,4,4,"","play: dmg t 3",S("avalanche","freeze+burn",["Hydromancer","Geode Shaman","Gyrfalcon"],{tgt:"e"})));
  add(Sp("Floe Ritual",4,"play: dmg t 4",S("avalanche","freeze+burn",["Glacial Cataclysm","Earth's Fury","Squall Line"],{tgt:"ea"})));
  add(Re("Glacier Flash",3,"play: dmg t 4",S("avalanche","freeze+burn",["Nullify","Tremor Trap","Wind Barrier"],{tgt:"eatk"})));
  add(Au("Tundra Field",2,"end: dmg face 1",S("avalanche","freeze+burn",["Sea of Clarity","Sacred Grove","Jet Stream"])));
  setR("r");
  add(Cr("Floe Shaman",5,7,7,"","death: dmg all_e 1",S("avalanche","freeze+burn",["Glacial Empress","Gaia's Avatar","Thunderwing Roc"])));
  add(Cr("Icecap Scout",5,7,7,"","play: freeze all_e",S("avalanche","freeze+burn",["Coral Titan","Crystal Dragon","Thunderhawk"])));
  add(Sp("Polar Rite",4,"play: dmg t 4; draw 1",S("avalanche","freeze+burn",["Great Ebb","Seismic Devastation","Cyclonic Rift"],{tgt:"e"})));
  add(Re("Floe Retort",5,"play: dmg t 5",S("avalanche","freeze+burn",["Reverse Current","Stone Aegis","Perfect Gale"],{tgt:"ea"})));
  add(Au("Floe Grove",5,"end: dmg face 1",S("avalanche","freeze+burn",["Eternal Winter","Heart of the World","Sky Throne"])));

  /* ---- snowfield (20, support) ---- */
  setR("c");
  add(Cr("Floe Warden",3,3,5,"","play: freeze t; dmg t 1",S("snowfield","freeze+heal",["Winter Mage","Rampart Elder","Featherfall Hawk"],{tgt:"e"})));
  add(Cr("Bulwark Tortoise",2,2,4,"","attack: freeze str",S("snowfield","freeze+heal",["Tidecaller Shaman","Amber Golem","Windbreak Guardian"])));
  add(Cr("Glacier Giant",2,2,4,"","play: mend own 2",S("snowfield","freeze+heal",["Rime Watcher","Worldroot Sapling","Tempest Sprite"])));
  add(Cr("Icecap Wall",3,2,5,"skyguard","attack: freeze str",S("snowfield","freeze+heal+skyguard",["Tide Caller","Bulwark Golem","Cloud Hawk"])));
  add(Cr("Floe Colossus",3,3,5,"","attack: freeze str",S("snowfield","freeze+heal",["Bubble Mage","Cliffside Watcher","Harrier Hawk"])));
  add(Sp("Snowpack Storm",1,"play: freeze t; dmg t 1",S("snowfield","freeze+heal",["Whirlpool Trap","Stone Skin","Updraft"],{tgt:"e"})));
  add(Sp("Glacier Burst",2,"play: freeze t; draw 1",S("snowfield","freeze+heal",["Deep Insight","Quake","Wind Walk"],{tgt:"e"})));
  add(Re("Tundra Feint",2,"play: freeze t",S("snowfield","freeze+heal",["Icy Grip","Rock Shield","Crosswind"],{tgt:"eatk"})));
  add(Au("Rimewall Shrine",2,"start: mend own 1",S("snowfield","freeze+heal",["Tidal Archive","Fortress Walls","Sky Temple"])));
  setR("u");
  add(Cr("Moraine Keeper",3,3,5,"","start: heal 2",S("snowfield","freeze+heal",["Deep Oracle","Granite Lion","Mistral Sage"])));
  add(Cr("Tundra Watcher",5,4,8,"skyguard","play: mend own 2",S("snowfield","freeze+heal+skyguard",["Shoal Leviathan","Obsidian Golem","Mountain Eagle"])));
  add(Cr("Floe Titan",4,3,6,"skyguard","heal: buff self 1 0",S("snowfield","freeze+heal+skyguard",["Icewall Colossus","Mountain Guardian","Feathered Serpent"])));
  add(Sp("Bulwark Rite",3,"play: freeze t; dmg t 3",S("snowfield","freeze+heal",["Crashing Wave","Avalanche Shard","Gale Barrage"],{tgt:"e"})));
  add(Re("Tundra Trap",3,"play: heal 5",S("snowfield","freeze+heal",["Whiplash Tide","Earthen Ward","Evasive Maneuver"])));
  add(Au("Polar Grove",3,"heal: dmg face 1",S("snowfield","freeze+heal",["Permafrost Shrine","Mountain's Patience","Aerie"])));
  setR("r");
  add(Cr("Rimewall Tortoise",4,3,7,"skyguard","play: mend own 2",S("snowfield","freeze+heal+skyguard",["Siren Queen","Granite Juggernaut","Hurricane Elemental"])));
  add(Cr("Glacier Warden",6,5,11,"","heal: dmg face 1",S("snowfield","freeze+heal",["Tidal Archmage","Avalanche Titan","Cloud Titan"])));
  add(Sp("Icecap Gift",4,"play: mend own all; heal 2",S("snowfield","freeze+heal",["Healing Torrent","Cataclysmic Quake","Squall Line"])));

  /* ---- calving (15) ---- */
  setR("c");
  add(Cr("Permafrost Weaver",3,4,4,"","attack: freeze str",S("calving","freeze+tokens",["Narwhal Lancer","Grove Shaper","Flock Leader"])));
  add(Cr("Snowpack Serpent",1,2,2,"","play: freeze t; dmg t 1",S("calving","freeze+tokens",["Frost Sprite","Clay Homunculus","Swift Courier"],{tgt:"e"})));
  add(Cr("Polar Spirit",2,3,3,"","death: summon iceblock 1",S("calving","freeze+tokens",["Riptide Rogue","Druid of the Stone","Zephyr Monk"])));
  add(Cr("Tundra Elemental",2,3,3,"","play: freeze t; dmg t 1",S("calving","freeze+tokens",["Pearl Diver","Crag Brute","Wind Wraith"],{tgt:"e"})));
  add(Sp("Moraine Call",1,"play: freeze all_e",S("calving","freeze+tokens",["Flowing Wisdom","Rapid Growth","Eye of the Gale"])));
  add(Re("Polar Snap",1,"play: summon iceblock 1",S("calving","freeze+tokens",["Deflect","Rock Shield","Sidestep"])));
  add(Au("Glacier Field",2,"start: summon iceblock 1",S("calving","freeze+tokens",["Healing Spring","Mountain's Patience","Wind Chimes"])));
  setR("u");
  add(Cr("Permafrost Golem",4,5,5,"","play: summon iceblock 1",S("calving","freeze+tokens",["Sea Serpent","Ironbark Treant","Mistral Phoenix"])));
  add(Cr("Glacier Familiar",3,4,4,"","attack: freeze str",S("calving","freeze+tokens",["Mistborn Assassin","Earthshaker Ogre","Featherblade Duelist"])));
  add(Sp("Permafrost Rite",3,"play: summon iceblock 2; buff tok 1 0 tmp",S("calving","freeze+tokens",["Riptide Reversal","Shatter the Earth","Skyward Ascent"])));
  setR("r");
  add(Cr("Floe Weaver",5,7,7,"","death: summon iceblock 1",S("calving","freeze+tokens",["Leviathan Elder","Mountain Strider","Roc Hatchery"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.GLACIER_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["glacier"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
