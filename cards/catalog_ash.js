/* ================= ASH CATALOG (designed confluence cards, generated first draft) =================
   Fire + Earth + Wind. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   cinders (25: tokens + revive), pyroclast (20: sacrifice + tokens), emberflock (20: tokens + burn), ashenwall (20: tokens + fortify), kiln (15: tokens + buff).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [fire, earth, wind]. */
// Loaded by build.py inside catalogBegin("ash")/catalogEnd("ash") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.ASH_CATALOG = [];
// Ash's own token for every theme but Cinders: a 1/1 without Haste, so token makers build a board instead of a burst.
tok("cinderling","Cinderling","ash",1,1,"");
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"ash" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.ASH_CATALOG.push(d); return d; };
  setEl("ash");

  /* ---- cinders (25) ---- */
  setR("c");
  add(Cr("Kiln Falcon",1,2,2,"","play/grave2: buff self 1 1",S("cinders","tokens+revive",["Ember Imp","Root Tender","Sparrow Scout"])));
  add(Cr("Smolder Hound",1,2,1,"haste","death: summon ashling 1",S("cinders","tokens+revive+haste",["Ember Whelp","Clay Homunculus","Gust Sprite"])));
  add(Cr("Ember Hound",2,3,2,"haste","play: summon ashling 1",S("cinders","tokens+revive+haste",["Brimstone Guard","Bedrock Wall","Whirlwind Acrobat"])));
  add(Cr("Cinder Falcon",2,3,2,"haste","play/grave2: buff self 1 1",S("cinders","tokens+revive+haste",["Sparkfire Kit","Granite Guard","Kestrel Rider"])));
  add(Cr("Ashborn Wolf",2,3,3,"","death: summon ashling 1",S("cinders","tokens+revive",["Cinder Hound","Stonecaller","Feather Sprite"])));
  add(Cr("Ashborn Striker",2,3,2,"haste","death: summon ashling 1",S("cinders","tokens+revive+haste",["Torchbearer","Crystal Burrower","Zephyr Courier"])));
  add(Sp("Ember Ritual",1,"play: revive 1",S("cinders","tokens+revive",["Searing Spark","Boulder Toss","Updraft"])));
  add(Sp("Ashborn Gift",2,"play: summon ashling 1",S("cinders","tokens+revive",["Kindle Thoughts","Overgrowth","Recall Gust"])));
  add(Sp("Smolder Storm",1,"play: summon ashling 1; buff tok 1 0 tmp",S("cinders","tokens+revive",["Blazing Command","Stone Skin","Tailwind Rush"])));
  add(Re("Ashborn Riposte",2,"play: summon ashling 1; buff tok 1 0 tmp",S("cinders","tokens+revive",["Backdraft","Rock Shield","Evasive Maneuver"])));
  add(Re("Smolder Snap",1,"play: summon ashling 1; buff tok 1 0 tmp",S("cinders","tokens+revive",["Heat Surge","Earthen Ward","Crosswind"])));
  add(Au("Ashborn Beacon",2,"start: summon ashling 1",S("cinders","tokens+revive",["Smoldering Tome","Mountain's Patience","Jet Stream"])));
  add(Au("Ember Altar",2,"end: summon ashling 1",S("cinders","tokens+revive",["Smoldering Tome","Ley Line","Sky Temple"])));
  setR("u");
  add(Cr("Smoke Hawk",4,5,4,"haste","play/grave2: buff self 1 1",S("cinders","tokens+revive+haste",["Cinderstorm Mage","Basalt Champion","Raptor of the Peaks"])));
  add(Cr("Soot Hound",4,5,4,"haste","start: summon ashling 1",S("cinders","tokens+revive+haste",["Emberlord Captain","Ancient Guardian","Vortex Mage"])));
  add(Cr("Ashborn Lancer",4,5,4,"haste","token: buff self 1 0",S("cinders","tokens+revive+haste",["Living Wildfire","Jade Behemoth","Tornado Elemental"])));
  add(Cr("Kiln Charger",3,4,3,"haste","play: summon ashling 1",S("cinders","tokens+revive+haste",["Ashwing Harrier","Earthshaker Ogre","Squall Captain"])));
  add(Sp("Charred Ritual",2,"play: regrow 1 creature; draw 1",S("cinders","tokens+revive",["Fury Unleashed","Fault Line","Tempest Volley"])));
  add(Sp("Cinder Burst",3,"play: summon ashling 1",S("cinders","tokens+revive",["Flame Wave","Unearth","Gale Barrage"])));
  add(Re("Ember Feint",3,"play: revive 1",S("cinders","tokens+revive",["Inferno Surge","Tremor Trap","Perfect Gale"])));
  add(Au("Cinder Engine",3,"start: summon ashling 1",S("cinders","tokens+revive",["Everburning Brazier","Sacred Grove","Eye of Eternity"])));
  setR("r");
  add(Cr("Kiln Wolf",4,5,4,"haste","death: summon ashling 1",S("cinders","tokens+revive+haste",["Ember Queen","Granite Juggernaut","Zephyr Archon"])));
  add(Cr("Smoke Charger",5,6,5,"haste","death: summon ashling 1",S("cinders","tokens+revive+haste",["Pyrelord Vexis","Crystal Dragon","Thunderwing Roc"])));
  add(Cr("Ashen Brute",5,6,5,"haste","death: revive 2",S("cinders","tokens+revive+haste",["Blazewing Matriarch","Diamondhide Wurm","Tempest Dragon"])));
  add(Sp("Ashen Volley",6,"play: summon ashling 3; buff tok 1 0 tmp",S("cinders","tokens+revive",["Wildfire Blaze","Seismic Devastation","Squall Line"])));
  add(Re("Smoke Recoil",4,"play: summon ashling 2",S("cinders","tokens+revive",["Pyroclasm Reflex","Stone Aegis","Vanishing Wind"])));
  add(Au("Smoke Engine",4,"start: summon ashling 1",S("cinders","tokens+revive",["Altar of Embers","Heart of the World","Sky Throne"])));

  /* ---- pyroclast (20) ---- */
  setR("c");
  add(Cr("Pumice Wolf",3,5,3,"","death: summon ashling 1",S("pyroclast","sacrifice+tokens",["Lava Hound","Rampart Elder","Flock Leader"])));
  add(Cr("Soot Drake",2,3,3,"","play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Reckless Raider","Seed Bearer","Tempest Sprite"])));
  add(Cr("Ashborn Duelist",1,2,2,"","play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Molten Hatchling","Pebble Golem","Swift Courier"])));
  add(Cr("Smoke Duelist",2,3,3,"","play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Apprentice Pyromancer","Spiked Barricade","Windbreak Guardian"])));
  add(Cr("Pumice Raider",3,5,3,"","death: summon ashling 1",S("pyroclast","sacrifice+tokens",["Pyre Dancer","Quarry Shaman","Cloud Hawk"])));
  add(Sp("Smoke Ritual",2,"play: sac; dmg t 0 x",S("pyroclast","sacrifice+tokens",["Firebolt","Quake","Gust of Wind"],{tgt:"e"})));
  add(Sp("Ember Wave",1,"play: sac; dmg t 0 x",S("pyroclast","sacrifice+tokens",["Stoke the Coals","Fertile Ground","Cyclone Kick"],{tgt:"e"})));
  add(Re("Soot Riposte",1,"play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Wildfire Ignition","Rock Shield","Tailwind"])));
  add(Re("Cinder Flash",1,"play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Flash Fire","Earthen Ward","Sidestep"])));
  add(Au("Pumice Engine",3,"start: summon ashling 1",S("pyroclast","sacrifice+tokens",["Everburning Brazier","Fortress Walls","Wind Chimes"])));
  add(Au("Ember Engine",2,"start: summon ashling 1",S("pyroclast","sacrifice+tokens",["Kindling Hearth","Ley Line","Jet Stream"])));
  setR("u");
  add(Cr("Pumice Hound",4,6,4,"","play: sac; dmg all_e 2",S("pyroclast","sacrifice+tokens",["Inferno Charger","Tremor Lord","Gust Knight"])));
  add(Cr("Ember Brute",4,6,4,"","play/own2: sac; buff self 2 2",S("pyroclast","sacrifice+tokens",["Solar Flare Drake","Cavern Troll","Feathered Serpent"])));
  add(Cr("Ember Charger",4,6,4,"","play/own2: sac; buff self 2 2",S("pyroclast","sacrifice+tokens",["Cinder Swarm","Mountain Guardian","Skyline Falcon"])));
  add(Sp("Pumice Wave",3,"play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Dragonfire","Unyielding Earth","Updraft Swarm"])));
  add(Sp("Pumice Gift",2,"play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Combustion Wave","Seismic Pulse","Skyward Ascent"])));
  add(Re("Ashen Retort",3,"play: summon ashling 1",S("pyroclast","sacrifice+tokens",["Wild Surge","Tremor Trap","Sky Strike"])));
  add(Au("Cinder Beacon",3,"end: summon cinderling 1",S("pyroclast","sacrifice+tokens",["Crown of Cinders","Sacred Grove","Aerie"])));
  setR("r");
  add(Cr("Ember Hawk",6,9,7,"","start: summon cinderling 2",S("pyroclast","sacrifice+tokens",["Searing Overlord","Primordial Titan","Cloud Titan"])));
  add(Cr("Charred Falcon",5,8,6,"","play/own2: sac; buff self 2 2",S("pyroclast","sacrifice+tokens",["Lavaheart Titan","Gaia's Avatar","Ancient Wind Spirit"])));
  add(Sp("Ember Gift",5,"play: sac; draw 2",S("pyroclast","sacrifice+tokens",["Chain of Flame","Seismic Devastation","Squall Line"])));
  add(Re("Pumice Retort",4,"play: summon cinderling 2",S("pyroclast","sacrifice+tokens",["Inferno Surge","Stone Aegis","Vanishing Wind"])));
  add(Au("Pumice Sanctum",5,"end/own3: sac; dmg face 2",S("pyroclast","sacrifice+tokens",["Hearth of Embers","Heart of the World","Sky Throne"])));

  /* ---- emberflock (20) ---- */
  setR("c");
  add(Cr("Smoke Hound",2,3,2,"airborne","play: summon ashling 1",S("emberflock","tokens+burn+airborne",["Smokescreen Imp","Burrow Mole","Skyward Scout"])));
  add(Cr("Charred Wolf",3,4,3,"airborne","death: dmg all_e 1",S("emberflock","tokens+burn+airborne",["Flame Herald","Canyon Ram","Sky Courier"])));
  add(Cr("Ember Wolf",1,2,1,"airborne","play: summon ashling 1",S("emberflock","tokens+burn+airborne",["Ember Whelp","Stone Sentry","Storm Crow"])));
  add(Cr("Charred Reaver",2,3,3,"","attack: dmg face 1",S("emberflock","tokens+burn",["Ashen Brawler","Thornback Boar","Breeze Messenger"])));
  add(Cr("Charred Striker",3,4,3,"airborne","death: summon ashling 1",S("emberflock","tokens+burn+airborne",["Flamecaller Adept","Geode Burrower","Gale Sage"])));
  add(Sp("Ashborn Call",1,"play: dmg all_e 1",S("emberflock","tokens+burn",["Overheat","Earthen Blessing","Cyclone Kick"])));
  add(Sp("Pumice Torrent",1,"play: dmg all_e 1",S("emberflock","tokens+burn",["Searing Spark","Avalanche Shard","Eye of the Gale"])));
  add(Re("Ashen Ward",2,"play: summon ashling 1",S("emberflock","tokens+burn",["Backdraft","Rock Shield","Crosswind"])));
  add(Re("Kiln Trap",2,"play: summon ashling 1; buff tok 1 0 tmp",S("emberflock","tokens+burn",["Wildfire Ignition","Rock Shield","Evasive Maneuver"])));
  add(Au("Pumice Shrine",3,"start: summon ashling 1",S("emberflock","tokens+burn",["Crown of Cinders","Fortress Walls","Wind Chimes"])));
  setR("u");
  add(Cr("Smoke Striker",4,5,4,"airborne","start: zaps 1 2",S("emberflock","tokens+burn+airborne",["Magma Golem","Ironbark Treant","Cloud Strider"])));
  add(Cr("Ember Raider",4,5,4,"airborne","death: dmg all_e 1",S("emberflock","tokens+burn+airborne",["Inferno Charger","Boulder Hurler","Lord of the Skies"])));
  add(Cr("Soot Duelist",3,5,3,"","death: dmg all_e 1",S("emberflock","tokens+burn",["Flame Warden","Geode Shaman","Gyrfalcon"])));
  add(Sp("Smolder Wave",2,"play: dmg all_e 1",S("emberflock","tokens+burn",["Raging Inferno","Shatter the Earth","Wind Walk"])));
  add(Re("Ember Flash",2,"play: summon ashling 1",S("emberflock","tokens+burn",["Ember Shield","Earthen Ward","Wind Barrier"])));
  add(Au("Ashborn Field",3,"spell: zaps 1 1",S("emberflock","tokens+burn",["Altar of Embers","Stone Sanctuary","Eye of Eternity"])));
  setR("r");
  add(Cr("Ashen Charger",6,9,6,"airborne","attack: dmg face 1",S("emberflock","tokens+burn+airborne",["Ignis, the Undying","Avalanche Titan","Aerie Matriarch"])));
  add(Cr("Cinder Raider",6,9,6,"airborne","play: dmg all_e 2",S("emberflock","tokens+burn+airborne",["Flame Tyrant","Primordial Titan","Aerie Matriarch"])));
  add(Sp("Smoke Torrent",4,"play: summon cinderling 2",S("emberflock","tokens+burn",["Wildfire Blaze","Cataclysmic Quake","Aerial Bombardment"])));
  add(Re("Kiln Guard",5,"play: summon cinderling 1; buff tok 1 0 tmp",S("emberflock","tokens+burn",["Pyroclasm Reflex","Tremor Trap","Perfect Gale"])));
  add(Au("Charred Field",4,"start: summon cinderling 1",S("emberflock","tokens+burn",["Altar of Embers","Heart of the World","Eye of Eternity"])));

  /* ---- ashenwall (20) ---- */
  setR("c");
  add(Cr("Soot Watcher",2,1,4,"wall","play: fort t 1",S("ashenwall","tokens+fortify+wall",["Blazing Martyr","Amber Golem","Drifting Monk"],{tgt:"o"})));
  add(Cr("Charred Titan",1,1,2,"wall","play: fort self 1",S("ashenwall","tokens+fortify+wall",["Molten Hatchling","Crystal Sprout","Wind Wanderer"])));
  add(Cr("Pumice Bulwark",2,1,4,"wall","play: fort self 1",S("ashenwall","tokens+fortify+wall",["Brimstone Guard","Crag Brute","Zephyr Monk"])));
  add(Cr("Ashen Colossus",3,3,5,"","play: fort t 1",S("ashenwall","tokens+fortify",["Bonfire Keeper","Bulwark Golem","Dust Devil"],{tgt:"o"})));
  add(Cr("Soot Bulwark",2,2,4,"","death: fort own 1",S("ashenwall","tokens+fortify",["Phoenix Chick","Worldroot Sapling","Wind Wraith"])));
  add(Sp("Smoke Volley",2,"play: fort t 2; buff t 1 0",S("ashenwall","tokens+fortify",["Combust","Rockslide","Zephyr Strike"],{tgt:"o"})));
  add(Sp("Smolder Torrent",2,"play: summon ashling 1; buff tok 1 0 tmp",S("ashenwall","tokens+fortify",["Call the Embers","Overgrowth","Wingbeat"])));
  add(Re("Soot Recoil",1,"play: summon ashling 1; buff tok 1 0 tmp",S("ashenwall","tokens+fortify",["Flash Fire","Stone Aegis","Sidestep"])));
  add(Au("Smolder Field",2,"end: summon ashling 1",S("ashenwall","tokens+fortify",["Furnace of Rage","Mountain's Patience","Sky Temple"])));
  setR("u");
  add(Cr("Charred Giant",3,1,6,"wall","token: buff self 1 0",S("ashenwall","tokens+fortify+wall",["Sun Priestess","Stoneheart Sentinel","Mistral Sage"])));
  add(Cr("Ember Guardian",4,1,8,"wall","death: fort own 1",S("ashenwall","tokens+fortify+wall",["Scorchclaw Ravager","Elder Treant","Roc Hatchery"])));
  add(Cr("Kiln Titan",5,1,11,"wall","death: summon ashling 1",S("ashenwall","tokens+fortify+wall",["Volcanic Brute","Mountain Strider","Thunderhawk"])));
  add(Sp("Soot Rite",3,"play: fort own 1",S("ashenwall","tokens+fortify",["Fireball","Crystalline Growth","Tornado"])));
  add(Re("Ember Guard",3,"play: summon ashling 1; buff tok 1 0 tmp",S("ashenwall","tokens+fortify",["Backdraft","Earthen Ward","Sky Strike"])));
  add(Au("Cinder Totem",3,"start: summon cinderling 1",S("ashenwall","tokens+fortify",["Everburning Brazier","Crystal Resonance","Jet Stream"])));
  setR("r");
  add(Cr("Smolder Guardian",6,5,11,"","death: summon cinderling 3",S("ashenwall","tokens+fortify",["Flame Tyrant","Bedrock Leviathan","Cloud Titan"])));
  add(Cr("Ashborn Bulwark",5,1,12,"wall","death: summon cinderling 3",S("ashenwall","tokens+fortify+wall",["Magmaforge Golem","Emerald Wyrm","Thunderwing Roc"])));
  add(Sp("Kiln Call",4,"play: fort own 1",S("ashenwall","tokens+fortify",["Firestorm Ritual","Seismic Devastation","Squall Line"])));

  /* ---- kiln (15) ---- */
  setR("c");
  add(Cr("Cinder Sentinel",2,3,3,"","play: buff ostr 1 1",S("kiln","tokens+buff",["Blood-Fire Berserker","Druid of the Stone","Swiftwing Herald"])));
  add(Cr("Cinder Shaman",3,4,4,"","play: summon ashling 1",S("kiln","tokens+buff",["Ember Scholar","Grove Shaper","Harrier Hawk"])));
  add(Cr("Pumice Caller",1,2,2,"","play: buff self 1 1",S("kiln","tokens+buff",["Ember Imp","Stone Sentry","Sparrow Scout"])));
  add(Cr("Kiln Weaver",3,4,4,"","death: summon ashling 1",S("kiln","tokens+buff",["Ignited Lancer","Ironhide Rhino","Wind Dancer"])));
  add(Sp("Ashborn Wave",2,"play: summon ashling 1; buff tok 1 0 tmp",S("kiln","tokens+buff",["Scorch","Quake","Wind Shear"])));
  add(Re("Ember Trap",1,"play: buff t 2 2 tmp",S("kiln","tokens+buff",["Heat Surge","Rock Shield","Tailwind"],{tgt:"o"})));
  add(Au("Ashen Grove",2,"end: summon ashling 1",S("kiln","tokens+buff",["Smoldering Tome","Fortress Walls","Sky Temple"])));
  setR("u");
  add(Cr("Smoke Adept",3,4,4,"","creature: buff self 1 1",S("kiln","tokens+buff",["Hellforge Smith","Rune-Carved Golem","Cloudshaper"])));
  add(Cr("Pumice Imp",3,4,4,"","play: buff ostr 1 1",S("kiln","tokens+buff",["Firebrand Zealot","Granite Lion","Windsong Falcon"])));
  add(Sp("Smoke Storm",2,"play: buff t 1 1",S("kiln","tokens+buff",["Rally the Flames","Petrify","Cyclonic Rift"],{tgt:"o"})));
  setR("r");
  add(Cr("Kiln Scout",5,7,7,"","attack: buff self 1 0 tmp",S("kiln","tokens+buff",["Pyrelord Vexis","Obsidian Golem","Mistral Phoenix"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.ASH_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["ash"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
