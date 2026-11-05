/* ================= SOLAR CATALOG (designed confluence cards, generated first draft) =================
   Fire + Wind + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   sunfire (25: burn), corona (20: burn + haste), flare (20: chain + burn), zenith (20: burn + buff), heathaze (15, support: bounce + burn).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [fire, wind, lightning]. */
// Loaded by build.py inside catalogBegin("solar")/catalogEnd("solar") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.SOLAR_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"solar" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.SOLAR_CATALOG.push(d); return d; };
  setEl("solar");

  /* ---- sunfire (25) ---- */
  setR("c");
  add(Cr("Daybreak Hound",2,3,3,"","attack: dmg face 1",S("sunfire","burn",["Smokescreen Imp","Drifting Monk","Volt Runner"])));
  add(Cr("Corona Hound",3,4,3,"airborne","attack: dmg face 1",S("sunfire","burn+airborne",["Flame Herald","Harrier Hawk","Bolt Thrower"])));
  add(Cr("Daybreak Falcon",3,4,3,"airborne","play: dmg face 1",S("sunfire","burn+airborne",["Flamecaller Adept","Featherfall Hawk","Voltage Hound"])));
  add(Cr("Sunfire Brute",1,2,2,"","attack: dmg face 1",S("sunfire","burn",["Ember Imp","Gust Sprite","Static Sprite"])));
  add(Cr("Solar Raider",2,3,2,"airborne","play: dmg t 2",S("sunfire","burn+airborne",["Reckless Raider","Whirlwind Acrobat","Lightning Courier"],{tgt:"e"})));
  add(Cr("Solar Hawk",3,5,3,"","death: dmg all_e 1",S("sunfire","burn",["Lava Hound","Wind Dancer","Storm Caller"])));
  add(Sp("Dawn Rite",1,"play: dmg t 1; draw 1",S("sunfire","burn",["Blazing Command","Cyclone Kick","Charge Conduit"],{tgt:"e"})));
  add(Sp("Noon Ritual",2,"play: dmg t 3",S("sunfire","burn",["Firebolt","Wingbeat","Arc Lash"],{tgt:"e"})));
  add(Sp("Zenith Torrent",2,"play: dmg t 2; draw 1",S("sunfire","burn",["Scorch","Gust of Wind","Spark Surge"],{tgt:"e"})));
  add(Re("Solar Ward",1,"play: dmg t 1",S("sunfire","burn",["Wildfire Ignition","Crosswind","Shock Reflex"],{tgt:"ea"})));
  add(Re("Solar Riposte",2,"play: dmg t 3",S("sunfire","burn",["Flash Fire","Evasive Maneuver","Surge Shield"],{tgt:"eatk"})));
  add(Au("Flare Shrine",2,"start: zaps 1 1",S("sunfire","burn",["Smoldering Tome","Jet Stream","Charged Coil"])));
  add(Au("Noon Shrine",2,"start: zaps 1 1",S("sunfire","burn",["Smoldering Tome","Sky Temple","Lightning Rod"])));
  setR("u");
  add(Cr("Sunfire Striker",3,4,3,"airborne","start: zaps 1 2",S("sunfire","burn+airborne",["Sun Priestess","Mistral Sage","Thunder Wolf"])));
  add(Cr("Daybreak Striker",4,5,4,"airborne","play: dmg face 1",S("sunfire","burn+airborne",["Emberlord Captain","Raptor of the Peaks","Spark Golem"])));
  add(Cr("Daybreak Duelist",4,5,4,"airborne","play: dmg face 1",S("sunfire","burn+airborne",["Living Wildfire","Tornado Elemental","Lightning Elemental"])));
  add(Cr("Daybreak Lancer",4,6,4,"","play: dmg face 1",S("sunfire","burn",["Cinderstorm Mage","Gust Knight","Galvanic Sentinel"])));
  add(Sp("Corona Volley",3,"play: dmg all_e 1",S("sunfire","burn",["Flame Wave","Gale Barrage","Forked Lightning"])));
  add(Sp("Daybreak Rite",3,"play: dmg t 3",S("sunfire","burn",["Dragonfire","Tornado","Thunderous Cascade"],{tgt:"ea"})));
  add(Re("Corona Feint",3,"play: dmg t 3",S("sunfire","burn",["Backdraft","Vanishing Wind","Shockwave Counter"],{tgt:"ea"})));
  add(Au("Radiant Grove",3,"spell: zaps 1 1",S("sunfire","burn",["Everburning Brazier","Eye of Eternity","Infinite Battery"])));
  setR("r");
  add(Cr("Sunlit Drake",5,8,5,"airborne","attack: dmg face 1",S("sunfire","burn+airborne",["Magmaforge Golem","Thunderwing Roc","Spark Matriarch"])));
  add(Cr("Solar Duelist",5,8,5,"airborne","play: dmg all_e 2",S("sunfire","burn+airborne",["Blazewing Matriarch","Tempest Dragon","Static Overlord"])));
  add(Cr("Flare Striker",6,9,7,"","attack: dmg all_e 1",S("sunfire","burn",["Flame Tyrant","Cloud Titan","Storm Titan"])));
  add(Sp("Dawn Torrent",5,"play: dmg t 7",S("sunfire","burn",["Wildfire Blaze","Squall Line","Ion Storm"],{tgt:"e"})));
  add(Re("Sunfire Retort",6,"play: dmg t 6",S("sunfire","burn",["Pyroclasm Reflex","Perfect Gale","Thunder Trap"],{tgt:"ea"})));
  add(Au("Corona Grove",4,"start: dmg all_e 1",S("sunfire","burn",["Crown of Cinders","Eye of Eternity","Storm Battery"])));

  /* ---- corona (20) ---- */
  setR("c");
  add(Cr("Sunfire Raider",2,3,2,"airborne","attack: dmg face 1",S("corona","burn+haste+airborne",["Brimstone Guard","Zephyr Courier","Flicker Mage"])));
  add(Cr("Dawn Lancer",2,3,2,"haste","death: dmg all_e 1",S("corona","burn+haste+haste",["Sparkfire Kit","Wind Wanderer","Conduit Keeper"])));
  add(Cr("Zenith Brute",2,3,3,"","play: dmg t 2",S("corona","burn+haste",["Apprentice Pyromancer","Breeze Messenger","Capacitor Golem"],{tgt:"e"})));
  add(Cr("Corona Duelist",3,4,3,"airborne","play: kw self haste tmp",S("corona","burn+haste+airborne",["Bonfire Keeper","Cloud Hawk","Arc Apprentice"])));
  add(Cr("Sunlit Brute",1,2,2,"","play: dmg t 1",S("corona","burn+haste",["Ember Whelp","Sparrow Scout","Volt Hopper"],{tgt:"e"})));
  add(Sp("Radiant Ritual",1,"play: dmg t 1",S("corona","burn+haste",["Searing Spark","Tailwind Rush","Quick Study"],{tgt:"ea"})));
  add(Sp("Noon Burst",1,"play: dmg t 2",S("corona","burn+haste",["Stoke the Coals","Updraft","Overclock"],{tgt:"e"})));
  add(Re("Flare Riposte",2,"play: untap t",S("corona","burn+haste",["Heat Surge","Tailwind","Blitz"],{tgt:"o"})));
  add(Re("Noon Riposte",2,"play: dmg t 3",S("corona","burn+haste",["Wild Surge","Sidestep","Surge Shield"],{tgt:"eatk"})));
  add(Au("Daybreak Beacon",1,"end: dmg face 1",S("corona","burn+haste",["Kindling Hearth","Sky Temple","Overload Coil"])));
  add(Au("Zenith Altar",2,"start: zaps 1 1",S("corona","burn+haste",["Kindling Hearth","Jet Stream","Lightning Rod"])));
  setR("u");
  add(Cr("Sunlit Striker",4,6,4,"","play: dmg t 3",S("corona","burn+haste",["Inferno Charger","Vortex Mage","Galvanic Golem"],{tgt:"e"})));
  add(Cr("Radiant Duelist",4,5,4,"airborne","creature: kw self haste tmp",S("corona","burn+haste+airborne",["Firebrand Knight","Feathered Serpent","Plasma Lord"])));
  add(Cr("Corona Striker",4,5,4,"airborne","creature: kw self haste tmp",S("corona","burn+haste+airborne",["Magma Golem","Skyline Falcon","Thunderclap Adept"])));
  add(Sp("Solar Torrent",3,"play: dmg t 3; draw 1",S("corona","burn+haste",["Chain of Flame","Updraft Swarm","Battery Dump"],{tgt:"e"})));
  add(Sp("Corona Storm",2,"play: buff t 2 0; kw t haste",S("corona","burn+haste",["Combustion Wave","Tempest Volley","Static Burst"],{tgt:"o"})));
  add(Re("Radiant Feint",3,"play: dmg t 4",S("corona","burn+haste",["Inferno Surge","Sky Strike","Lightning Reflexes"],{tgt:"eatk"})));
  add(Au("Noon Font",3,"static: lord all 1 0",S("corona","burn+haste",["Altar of Embers","Wind Chimes","Storm God's Altar"])));
  setR("r");
  add(Cr("Sunlit Reaver",5,6,5,"airborne haste","attack: untap self",S("corona","burn+haste+airborne",["Pyrelord Vexis","Ancient Wind Spirit","Charged Juggernaut"])));
  add(Cr("Flare Duelist",4,6,4,"airborne","attack: dmg face 1",S("corona","burn+haste+airborne",["Solar Flare Drake","Roc Hatchery","Lightning Hydra"])));
  add(Sp("Sunfire Storm",4,"play: untap t; buff t 1 0",S("corona","burn+haste",["Firestorm Ritual","Squall Line","Overload Cascade"],{tgt:"o"})));
  add(Re("Noon Reflex",4,"play: untap t",S("corona","burn+haste",["Inferno Surge","Vanishing Wind","Thunder Trap"],{tgt:"o"})));
  add(Au("Noon Grove",4,"static: grant all haste",S("corona","burn+haste",["Altar of Embers","Sky Throne","Storm Battery"])));

  /* ---- flare (20) ---- */
  setR("c");
  add(Cr("Daybreak Sentinel",3,4,4,"","chain2: draw 1",S("flare","chain+burn",["Pyre Dancer","Flock Leader","Tesla Knight"])));
  add(Cr("Dawn Golem",2,3,3,"","chain2: draw 1",S("flare","chain+burn",["Cinder Hound","Skyward Scout","Arc Duelist"])));
  add(Cr("Noon Weaver",3,4,4,"","play: dmg t 1 | chain2: dmg t 1",S("flare","chain+burn",["Ember Scholar","Sky Courier","Bolt Thrower"],{tgt:"ea"})));
  add(Cr("Sunlit Golem",1,2,2,"","attack: dmg face 1",S("flare","chain+burn",["Molten Hatchling","Swift Courier","Spark Mite"])));
  add(Cr("Corona Imp",2,3,3,"","play: dmg t 1 | chain2: dmg t 1",S("flare","chain+burn",["Ashen Brawler","Kestrel Rider","Bolt Knight"],{tgt:"ea"})));
  add(Sp("Zenith Burst",2,"play: draw 1 | chain2: energy 1",S("flare","chain+burn",["Rally the Flames","Zephyr Strike","Static Bolt"])));
  add(Sp("Zenith Storm",1,"play: dmg t 2",S("flare","chain+burn",["Overheat","Eye of the Gale","Crackle"],{tgt:"e"})));
  add(Re("Sunfire Reflex",2,"play: dmg t 2",S("flare","chain+burn",["Ember Shield","Evasive Maneuver","Grounding"],{tgt:"ea"})));
  add(Re("Corona Riposte",2,"play: dmg t 2",S("flare","chain+burn",["Heat Surge","Crosswind","Shockwave Counter"],{tgt:"ea"})));
  add(Au("Daybreak Engine",2,"end/spell2: zaps 1 2",S("flare","chain+burn",["Furnace of Rage","Wind Chimes","Charged Coil"])));
  setR("u");
  add(Cr("Sunlit Spirit",4,5,5,"","edie: buff self 1 1",S("flare","chain+burn",["Inferno Charger","Storm Roc","Capacitor Titan"])));
  add(Cr("Radiant Scout",4,5,5,"","play: dmg t 1 | chain2: dmg t 1",S("flare","chain+burn",["Cinder Swarm","Cloud Strider","Galvanic Sentinel"],{tgt:"ea"})));
  add(Cr("Dawn Serpent",5,6,7,"","play: dmg t 6",S("flare","chain+burn",["Volcanic Brute","Thunderhawk","Conduit Colossus"],{tgt:"e"})));
  add(Sp("Flare Surge",3,"play: draw 1 | chain2: energy 1",S("flare","chain+burn",["Fireball","Aerial Bombardment","Lightning Volley"])));
  add(Re("Daybreak Flash",2,"play: dmg t 2",S("flare","chain+burn",["Backdraft","Wind Barrier","Electrify"],{tgt:"ea"})));
  add(Au("Dawn Engine",3,"spell: zaps 1 1",S("flare","chain+burn",["Everburning Brazier","Aerie","Storm God's Altar"])));
  setR("r");
  add(Cr("Daybreak Elemental",6,8,8,"","death: dmg all_e 1",S("flare","chain+burn",["Searing Overlord","Aerie Matriarch","Storm Titan"])));
  add(Cr("Zenith Caller",5,7,7,"","death: dmg all_e 1",S("flare","chain+burn",["Lavaheart Titan","Ancient Wind Spirit","Volt Dragon"])));
  add(Sp("Sunfire Rite",4,"play: dmg t 1 | chain2: dmg t 2",S("flare","chain+burn",["Wildfire Blaze","Cyclonic Rift","Ion Storm"],{tgt:"ea"})));
  add(Re("Noon Ward",4,"play: dmg t 6",S("flare","chain+burn",["Pyroclasm Reflex","Perfect Gale","Lightning Reflexes"],{tgt:"eatk"})));
  add(Au("Zenith Grove",5,"start: zaps 1 1",S("flare","chain+burn",["Hearth of Embers","Sky Throne","Tesla Coil"])));

  /* ---- zenith (20) ---- */
  setR("c");
  add(Cr("Corona Wolf",1,2,1,"pierce","play: buff self 1 1",S("zenith","burn+buff+pierce",["Ember Whelp","Storm Crow","Plasma Sprite"])));
  add(Cr("Corona Brute",1,2,2,"","play: dmg face 1",S("zenith","burn+buff",["Pyre Zealot","Feather Sprite","Thunder Imp"])));
  add(Cr("Noon Reaver",2,3,2,"pierce","play: buff self 1 1",S("zenith","burn+buff+pierce",["Torchbearer","Windbreak Guardian","Charge Siphon"])));
  add(Cr("Solar Drake",3,4,3,"pierce","death: dmg all_e 1",S("zenith","burn+buff+pierce",["Scorchclaw Ravager","Gale Sage","Storm Caller"])));
  add(Cr("Noon Raider",2,3,2,"pierce","play: buff self 1 1",S("zenith","burn+buff+pierce",["Phoenix Chick","Tempest Sprite","Capacitor Golem"])));
  add(Sp("Corona Blast",1,"play: buff t 1 1",S("zenith","burn+buff",["Searing Blast","Tailwind Rush","Chain Lightning"],{tgt:"o"})));
  add(Sp("Zenith Volley",1,"play: dmg t 1; draw 1",S("zenith","burn+buff",["Flare Up","Updraft","Lightning Bolt"],{tgt:"e"})));
  add(Re("Noon Guard",1,"play: dmg t 2",S("zenith","burn+buff",["Flash Fire","Tailwind","Blitz"],{tgt:"eatk"})));
  add(Au("Solar Altar",2,"end: dmg face 1",S("zenith","burn+buff",["Smoldering Tome","Sky Temple","Overload Coil"])));
  setR("u");
  add(Cr("Solar Hound",3,4,3,"pierce","play: buff self 1 1",S("zenith","burn+buff+pierce",["Ignited Lancer","Windsong Falcon","Pulse Mage"])));
  add(Cr("Daybreak Brute",3,4,3,"pierce","play: dmg t 3",S("zenith","burn+buff+pierce",["Ashwing Harrier","Cloudshaper","Storm Shaman"],{tgt:"e"})));
  add(Cr("Radiant Hawk",4,6,4,"","attack: dmg face 1",S("zenith","burn+buff",["Inferno Champion","Zephyr Archon","Spark Swarm Mage"])));
  add(Sp("Corona Wave",2,"play: dmg t 3",S("zenith","burn+buff",["Raging Inferno","Wind Walk","Surge of Power"],{tgt:"e"})));
  add(Re("Solar Flash",3,"play: dmg t 4",S("zenith","burn+buff",["Backdraft","Sky Strike","Grounding"],{tgt:"eatk"})));
  add(Au("Flare Field",3,"end: dmg face 1",S("zenith","burn+buff",["Crown of Cinders","Aerie","Infinite Battery"])));
  setR("r");
  add(Cr("Dawn Hawk",6,9,6,"pierce","play: dmg t 3",S("zenith","burn+buff+pierce",["Ignis, the Undying","Cloud Leviathan","Sparkfire Hydra"],{tgt:"e"})));
  add(Cr("Zenith Charger",5,8,5,"pierce","attack: buff self 1 0 tmp",S("zenith","burn+buff+pierce",["Magmaforge Golem","Thunderwing Roc","Static Overlord"])));
  add(Sp("Radiant Storm",5,"play: buff t 5 0; kw t pierce",S("zenith","burn+buff",["Wildfire Blaze","Squall Line","Electrocute"],{tgt:"o"})));

  /* ---- heathaze (15, support) ---- */
  setR("c");
  add(Cr("Radiant Adept",1,1,2,"airborne","attack: dmg face 1",S("heathaze","bounce+burn+airborne",["Ember Imp","Sparrow Scout","Static Sprite"])));
  add(Cr("Daybreak Weaver",2,2,3,"airborne","play: dmg t 2",S("heathaze","bounce+burn+airborne",["Ember Duelist","Swiftwing Herald","Raiju"],{tgt:"e"})));
  add(Cr("Solar Spirit",2,2,3,"airborne","play: bounce t",S("heathaze","bounce+burn+airborne",["Blood-Fire Berserker","Zephyr Monk","Conduit Keeper"],{tgt:"o"})));
  add(Cr("Zenith Shaman",2,3,3,"","play: dmg face 1",S("heathaze","bounce+burn",["Firebrand Zealot","Whirlwind Acrobat","Lightning Courier"])));
  add(Sp("Corona Gift",1,"play: bounce t; energy 2",S("heathaze","bounce+burn",["Twin Bolts","Cyclone Kick","Power Surge"],{tgt:"o"})));
  add(Re("Sunfire Ward",2,"play: dmg t 2",S("heathaze","bounce+burn",["Wildfire Ignition","Sidestep","Surge Shield"],{tgt:"ea"})));
  add(Au("Sunlit Beacon",2,"start: buff ostr 1 0 tmp",S("heathaze","bounce+burn",["Furnace of Rage","Jet Stream","Lightning Rod"])));
  setR("u");
  add(Cr("Sunlit Shaman",3,3,4,"airborne","play: dmg t 4",S("heathaze","bounce+burn+airborne",["Flame Warden","Squall Captain","Voltage Wraith"],{tgt:"e"})));
  add(Cr("Sunfire Caller",3,3,4,"airborne","play: dmg face 1",S("heathaze","bounce+burn+airborne",["Hellforge Smith","Featherblade Duelist","Tempest Runner"])));
  add(Sp("Solar Rite",3,"play: bounce t",S("heathaze","bounce+burn",["Fury Unleashed","Skyward Ascent","Forked Lightning"],{tgt:"e"})));
  setR("r");
  add(Cr("Corona Caller",6,8,8,"","death: dmg all_e 1",S("heathaze","bounce+burn",["Magma Behemoth","Cloud Titan","Volt Dragon"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.SOLAR_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["solar"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
