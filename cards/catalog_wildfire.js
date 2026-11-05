/* ================= WILDFIRE CATALOG (designed confluence cards, generated first draft) =================
   Fire + Wind. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   flames (25: burn), updraft (25: burn + buff), kindling (20: buff + tokens), backburn (15, support: bounce + burn), smoke (15, support: shrink).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [fire, wind]. */
// Loaded by build.py inside catalogBegin("wildfire")/catalogEnd("wildfire") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.WILDFIRE_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"wildfire" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.WILDFIRE_CATALOG.push(d); return d; };
  setEl("wildfire");

  /* ---- flames (25) ---- */
  setR("c");
  add(Cr("Blazing Striker",1,2,2,"","play: dmg t 1",S("flames","burn",["Molten Hatchling","Gust Sprite"],{tgt:"e"})));
  add(Cr("Kindled Charger",2,3,2,"haste","death: dmg all_e 1",S("flames","burn+haste",["Apprentice Pyromancer","Skyward Scout"])));
  add(Cr("Emberdrift Lancer",3,5,3,"","play: dmg face 1",S("flames","burn",["Flame Herald","Wind Dancer"])));
  add(Cr("Smoldering Lancer",1,2,2,"","death: dmg all_e 1",S("flames","burn",["Ember Imp","Sparrow Scout"])));
  add(Cr("Cinderwing Drake",3,5,3,"","death: dmg all_e 1",S("flames","burn",["Bonfire Keeper","Featherfall Hawk"])));
  add(Cr("Wildflame Duelist",2,3,2,"airborne","play: dmg t 2",S("flames","burn+airborne",["Reckless Raider","Feather Sprite"],{tgt:"e"})));
  add(Sp("Kindled Ritual",2,"play: dmg t 2",S("flames","burn",["Firebolt","Recall Gust"],{tgt:"ea"})));
  add(Sp("Cinderwing Wave",2,"play: dmg t 2; draw 1",S("flames","burn",["Kindle Thoughts","Gust of Wind"],{tgt:"e"})));
  add(Sp("Searing Ritual",1,"play: dmg t 1",S("flames","burn",["Searing Spark","Updraft"],{tgt:"ea"})));
  add(Re("Firegale Feint",2,"play: dmg t 3",S("flames","burn",["Wildfire Ignition","Evasive Maneuver"],{tgt:"eatk"})));
  add(Re("Kindled Retort",1,"play: dmg t 2",S("flames","burn",["Heat Surge","Sidestep"],{tgt:"eatk"})));
  add(Au("Emberdrift Altar",2,"start: zaps 1 1",S("flames","burn",["Smoldering Tome","Jet Stream"])));
  add(Au("Firegale Totem",2,"end: dmg face 1",S("flames","burn",["Smoldering Tome","Sky Temple"])));
  setR("u");
  add(Cr("Ashwind Duelist",4,5,4,"airborne","play: dmg t 3",S("flames","burn+airborne",["Cinderstorm Mage","Vortex Mage"],{tgt:"e"})));
  add(Cr("Ashwind Striker",4,6,4,"","edie: buff self 1 1",S("flames","burn",["Inferno Charger","Raptor of the Peaks"])));
  add(Cr("Searing Striker",5,6,5,"haste","play: dmg t 6",S("flames","burn+haste",["Volcanic Brute","Thunderhawk"],{tgt:"e"})));
  add(Cr("Kindled Duelist",4,5,4,"airborne","death: dmg all_e 1",S("flames","burn+airborne",["Living Wildfire","Gust Knight"])));
  add(Sp("Blazing Wave",3,"play: dmg t 3",S("flames","burn",["Chain of Flame","Gale Barrage"],{tgt:"ea"})));
  add(Sp("Blazing Burst",3,"play: dmg t 4",S("flames","burn",["Flame Wave","Aerial Bombardment"],{tgt:"e"})));
  add(Re("Cinderwing Riposte",3,"play: dmg t 4",S("flames","burn",["Backdraft","Vanishing Wind"],{tgt:"eatk"})));
  add(Au("Searing Beacon",3,"spell: zaps 1 1",S("flames","burn",["Everburning Brazier","Eye of Eternity"])));
  setR("r");
  add(Cr("Smoldering Striker",6,7,6,"airborne haste","play: dmg t 3",S("flames","burn+airborne",["Searing Overlord","Cloud Titan"],{tgt:"e"})));
  add(Cr("Wildflame Brute",5,8,6,"","play: dmg all_e 2",S("flames","burn",["Blazewing Matriarch","Tempest Dragon"])));
  add(Cr("Cinderwing Wolf",5,6,5,"haste","play: dmg all_e 2",S("flames","burn+haste",["Lavaheart Titan","Thunderwing Roc"])));
  add(Sp("Firegale Storm",5,"play: dmg t 5; draw 1",S("flames","burn",["Wildfire Blaze","Squall Line"],{tgt:"e"})));
  add(Re("Wildflame Ward",5,"play: dmg t 5",S("flames","burn",["Pyroclasm Reflex","Perfect Gale"],{tgt:"ea"})));
  add(Au("Searing Altar",4,"end: dmg face 1",S("flames","burn",["Crown of Cinders","Sky Throne"])));

  /* ---- updraft (25) ---- */
  setR("c");
  add(Cr("Emberdrift Wolf",3,5,3,"","play: dmg t 3",S("updraft","burn+buff",["Pyre Dancer","Gale Sage"],{tgt:"e"})));
  add(Cr("Kindled Striker",2,3,3,"","play: dmg t 2",S("updraft","burn+buff",["Sparkfire Kit","Zephyr Courier"],{tgt:"e"})));
  add(Cr("Cinderwing Hound",3,5,3,"","attack: buff self 1 0 tmp",S("updraft","burn+buff",["Ember Scholar","Harrier Hawk"])));
  add(Cr("Firegale Charger",1,2,1,"airborne","play: buff ostr 1 1",S("updraft","burn+buff+airborne",["Ember Whelp","Swift Courier"])));
  add(Cr("Firegale Hawk",2,3,2,"airborne","play: dmg face 1",S("updraft","burn+buff+airborne",["Brimstone Guard","Kestrel Rider"])));
  add(Cr("Emberdrift Charger",3,4,3,"airborne","death: dmg all_e 1",S("updraft","burn+buff+airborne",["Lava Hound","Cloud Hawk"])));
  add(Sp("Smoldering Ritual",2,"play: dmg t 2; draw 1",S("updraft","burn+buff",["Call the Embers","Zephyr Strike"],{tgt:"e"})));
  add(Sp("Wildflame Blast",1,"play: buff own 1 1",S("updraft","burn+buff",["Stoke the Coals","Cyclone Kick"])));
  add(Sp("Ashwind Gift",2,"play: buff own 1 1",S("updraft","burn+buff",["Combust","Wingbeat"])));
  add(Re("Searing Trap",3,"play: buff t 2 2 tmp",S("updraft","burn+buff",["Flash Fire","Crosswind"],{tgt:"o"})));
  add(Re("Cinderwing Retort",1,"play: buff t 1 1 tmp",S("updraft","burn+buff",["Wild Surge","Tailwind"],{tgt:"oatk"})));
  add(Au("Firegale Beacon",2,"start: buff ostr 2 0 tmp",S("updraft","burn+buff",["Kindling Hearth","Jet Stream"])));
  add(Au("Searing Totem",2,"end: dmg face 1",S("updraft","burn+buff",["Kindling Hearth","Wind Chimes"])));
  setR("u");
  add(Cr("Scorching Lancer",4,6,4,"","attack: buff self 1 0 tmp",S("updraft","burn+buff",["Emberlord Captain","Tornado Elemental"])));
  add(Cr("Wildflame Charger",3,4,3,"airborne","attack: buff self 1 0 tmp",S("updraft","burn+buff+airborne",["Scorchclaw Ravager","Mistral Sage"])));
  add(Cr("Wildflame Lancer",4,6,4,"","attack: dmg face 1",S("updraft","burn+buff",["Firebrand Knight","Hurricane Elemental"])));
  add(Cr("Kindled Hound",4,5,4,"airborne","attack: dmg face 1",S("updraft","burn+buff+airborne",["Cinder Swarm","Roc Hatchery"])));
  add(Sp("Ashwind Call",2,"play: dmg t 3",S("updraft","burn+buff",["Combustion Wave","Wind Shear"],{tgt:"e"})));
  add(Sp("Smoldering Burst",3,"play: buff own 1 1",S("updraft","burn+buff",["Fury Unleashed","Wind Walk"])));
  add(Re("Ashwind Snap",3,"play: dmg t 4",S("updraft","burn+buff",["Inferno Surge","Evasive Maneuver"],{tgt:"eatk"})));
  add(Au("Scorching Shrine",3,"static: lord all 1 0",S("updraft","burn+buff",["Altar of Embers","Aerie"])));
  setR("r");
  add(Cr("Scorching Brute",6,9,6,"airborne","play: dmg face 1",S("updraft","burn+buff+airborne",["Flame Tyrant","Aerie Matriarch"])));
  add(Cr("Smoldering Raider",6,9,6,"airborne","attack: dmg face 1",S("updraft","burn+buff+airborne",["Ignis, the Undying","Cloud Leviathan"])));
  add(Cr("Scorching Duelist",5,8,5,"airborne","attack: dmg face 1",S("updraft","burn+buff+airborne",["Pyrelord Vexis","Ancient Wind Spirit"])));
  add(Sp("Smoldering Blast",3,"play: buff t 2 2",S("updraft","burn+buff",["Dragonfire","Tornado"],{tgt:"o"})));
  add(Re("Searing Feint",5,"play: dmg t 7",S("updraft","burn+buff",["Inferno Surge","Vanishing Wind"],{tgt:"eatk"})));
  add(Au("Cinderwing Altar",4,"start: zaps 1 1",S("updraft","burn+buff",["Altar of Embers","Eye of Eternity"])));

  /* ---- kindling (20) ---- */
  setR("c");
  add(Cr("Cinderwing Weaver",2,3,3,"","attack: buff self 1 0 tmp",S("kindling","buff+tokens",["Smokescreen Imp","Windbreak Guardian"])));
  add(Cr("Scorching Scout",3,4,4,"","death: summon ember 1",S("kindling","buff+tokens",["Flamecaller Adept","Dust Devil"])));
  add(Cr("Scorching Golem",2,2,3,"haste","play: summon ember 1",S("kindling","buff+tokens+haste",["Cinder Hound","Breeze Messenger"])));
  add(Cr("Searing Caller",2,3,3,"","play: buff ostr 1 1",S("kindling","buff+tokens",["Torchbearer","Drifting Monk"])));
  add(Cr("Smoldering Scout",2,3,3,"","play: summon ember 1",S("kindling","buff+tokens",["Ashen Brawler","Wind Wanderer"])));
  add(Sp("Ashwind Ritual",1,"play: summon ember 1",S("kindling","buff+tokens",["Blazing Command","Tailwind Rush"])));
  add(Sp("Searing Gift",1,"play: buff own 1 1",S("kindling","buff+tokens",["Overheat","Eye of the Gale"])));
  add(Re("Wildflame Reflex",2,"play: buff t 1 1 tmp",S("kindling","buff+tokens",["Heat Surge","Wind Barrier"],{tgt:"oatk"})));
  add(Re("Blazing Feint",2,"play: buff t 1 1 tmp",S("kindling","buff+tokens",["Ember Shield","Sky Strike"],{tgt:"oatk"})));
  add(Au("Scorching Field",2,"start: buff ostr 2 0 tmp",S("kindling","buff+tokens",["Everburning Brazier","Jet Stream"])));
  setR("u");
  add(Cr("Emberdrift Weaver",4,4,5,"haste","creature: buff self 1 1",S("kindling","buff+tokens+haste",["Ember Queen","Storm Roc"])));
  add(Cr("Emberdrift Caller",3,4,4,"","play: buff self 1 1",S("kindling","buff+tokens",["Sun Priestess","Sky Pirate"])));
  add(Cr("Cinderwing Serpent",4,4,5,"haste","play: buff self 1 1",S("kindling","buff+tokens+haste",["Solar Flare Drake","Skyline Falcon"])));
  add(Sp("Wildflame Storm",2,"play: summon ember 1",S("kindling","buff+tokens",["Raging Inferno","Skyward Ascent"])));
  add(Re("Searing Reflex",3,"play: summon ember 1; buff tok 1 0 tmp",S("kindling","buff+tokens",["Backdraft","Perfect Gale"])));
  add(Au("Firegale Field",4,"static: lord all 1 0",S("kindling","buff+tokens",["Hearth of Embers","Wind Chimes"])));
  setR("r");
  add(Cr("Wildflame Serpent",6,7,8,"haste","play: buff own 1 1",S("kindling","buff+tokens+haste",["Magma Behemoth","Cloud Titan"])));
  add(Cr("Firegale Familiar",5,7,7,"","start: summon ember 2",S("kindling","buff+tokens",["Magmaforge Golem","Zephyr Archon"])));
  add(Sp("Searing Volley",4,"play: summon ember 2",S("kindling","buff+tokens",["Firestorm Ritual","Squall Line"])));
  add(Re("Smoldering Trap",4,"play: buff t 2 2 tmp",S("kindling","buff+tokens",["Pyroclasm Reflex","Vanishing Wind"],{tgt:"oatk"})));
  add(Au("Scorching Beacon",6,"end: summon ember 1",S("kindling","buff+tokens",["Hearth of Embers","Nesting Grounds"])));

  /* ---- backburn (15, support) ---- */
  setR("c");
  add(Cr("Ashwind Scout",2,3,3,"","play: bounce t",S("backburn","bounce+burn",["Blazing Martyr","Whirlwind Acrobat"],{tgt:"e:cost<=2"})));
  add(Cr("Ashwind Shaman",1,1,2,"airborne","play: bounce t",S("backburn","bounce+burn+airborne",["Pyre Zealot","Storm Crow"],{tgt:"e:cost<=2"})));
  add(Cr("Emberdrift Imp",2,2,3,"airborne","play: dmg face 1",S("backburn","bounce+burn+airborne",["Sparkfire Kit","Tempest Sprite"])));
  add(Cr("Wildflame Adept",2,3,3,"","play: dmg face 1",S("backburn","bounce+burn",["Blood-Fire Berserker","Gale Rider"])));
  add(Sp("Smoldering Torrent",2,"play: dmg all_e 1",S("backburn","bounce+burn",["Rally the Flames","Zephyr Strike"])));
  add(Re("Cinderwing Reflex",1,"play: bounce t",S("backburn","bounce+burn",["Flash Fire","Tailwind"],{tgt:"eatk"})));
  add(Au("Emberdrift Field",1,"end: dmg face 1",S("backburn","bounce+burn",["Furnace of Rage","Sky Temple"])));
  setR("u");
  add(Cr("Cinderwing Sentinel",3,4,4,"","play: bounce t",S("backburn","bounce+burn",["Ignited Lancer","Cloudshaper"],{tgt:"e:cost<=3"})));
  add(Cr("Smoldering Spirit",4,4,5,"airborne","play: dmg face 1",S("backburn","bounce+burn+airborne",["Inferno Champion","Windsong Falcon"])));
  add(Sp("Smoldering Wave",3,"play: bounce t; draw 1",S("backburn","bounce+burn",["Fireball","Tempest Volley"],{tgt:"o"})));
  add(Re("Scorching Ward",2,"play: dmg t 3",S("backburn","bounce+burn",["Wild Surge","Evasive Maneuver"],{tgt:"eatk"})));
  add(Au("Kindled Sanctum",3,"start: buff ostr 1 0 tmp",S("backburn","bounce+burn",["Crown of Cinders","Aerie"])));
  setR("r");
  add(Cr("Cinderwing Caller",4,5,5,"airborne","attack: dmg all_e 1",S("backburn","bounce+burn+airborne",["Flamewing Dragon","Lord of the Skies"])));
  add(Sp("Ashwind Storm",4,"play: dmg all_e 2",S("backburn","bounce+burn",["Wildfire Blaze","Winds of Change"])));

  /* ---- smoke (15, support) ---- */
  setR("c");
  add(Cr("Wildflame Colossus",3,3,5,"","play: buff t -1 -1",S("smoke","shrink",["Hellforge Smith","Sky Courier"],{tgt:"e"})));
  add(Cr("Scorching Bulwark",1,1,3,"","play: buff t -2 0",S("smoke","shrink",["Ember Imp","Gust Sprite"],{tgt:"e"})));
  add(Cr("Ashwind Guardian",1,1,2,"skyguard","play: buff t -2 0",S("smoke","shrink+skyguard",["Molten Hatchling","Swift Courier"],{tgt:"e"})));
  add(Cr("Emberdrift Behemoth",2,2,3,"skyguard","play: buff t -2 0",S("smoke","shrink+skyguard",["Ember Duelist","Swiftwing Herald"],{tgt:"e"})));
  add(Sp("Scorching Gift",1,"play: buff all_e -1 0; draw 1",S("smoke","shrink",["Searing Spark","Tailwind Rush"])));
  add(Re("Searing Snap",1,"play: buff t -2 -2",S("smoke","shrink",["Wildfire Ignition","Crosswind"],{tgt:"eatk"})));
  add(Au("Scorching Sanctum",2,"start: buff rnd -1 0",S("smoke","shrink",["Kindling Hearth","Sky Temple"])));
  setR("u");
  add(Cr("Wildflame Wall",3,3,5,"","play: buff t -2 0",S("smoke","shrink",["Ashwing Harrier","Squall Captain"],{tgt:"e"})));
  add(Cr("Kindled Wall",3,2,5,"skyguard","attack: buff str -1 0",S("smoke","shrink+skyguard",["Flame Warden","Featherblade Duelist"])));
  add(Sp("Searing Blast",2,"play: buff t -1 -1",S("smoke","shrink",["Flame Lash","Cyclonic Rift"],{tgt:"e"})));
  setR("r");
  add(Cr("Cinderwing Behemoth",5,4,9,"skyguard","play: buff all_e -1 -1",S("smoke","shrink+skyguard",["Pyrelord Vexis","Mistral Phoenix"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.WILDFIRE_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["wildfire"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
