/* ================= STEAM CATALOG (designed confluence cards, pilot) =================
   Fire + Water. 100 designed cards that replace Steam's formula fusions (design/confluence-cards.md, design/confluence-slots.md).
   NOT loaded by build.py yet: it goes in once Balance has priced it and Game Dev's Forge reads catalogs.
   Each card: o.th = theme, o.tr = trait pair (Fire trait + Water trait; the Forge's nearest-match key), o.sig = signature recipe [Fire card, Water card].
   Themes: pressure (archetype: a full hand fuels everything), scald (heavy hitters that burn as they attack, with Drain to win races), fog (Ward and ambush),
   boil (freeze, then burn), vent (return your own creatures to replay their arrival).
   Rules: one keyword and one effect (or two small ones); "cards in hand" checks are thresholds, never per-card scaling;
   a basic card deals at most its cost +1 to a player on the turn it's played; board-wide damage at most 2. */
const STEAM_CATALOG = [];
(function(){
  // S() records the slot data and returns the card options; add() attaches the slot data to the card just made.
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"steam" }; return o; };
  const add = d => { Object.assign(d, M); STEAM_CATALOG.push(d); return d; };
  setEl("steam");

  /* ---- Pressure (25) ---- */
  setR("c");
  add(Cr("Kettle Imp",1,1,2,"","draw: buff self 1 0 tmp",S("pressure","burn+draw",["Ember Imp","Brook Otter"])));
  add(Cr("Pressure Gauge",2,3,3,"","play: draw 1 | play/hand5: buff self 2 0",S("pressure","burn+draw",["Torchbearer","Pearl Diver"])));
  add(Cr("Mist Scholar",3,3,5,"ward","play: draw 1",S("pressure","study+ward",["Ember Scholar","Bubble Mage"])));
  add(Cr("Boiler Hand",2,4,3,"","play/hand4: dmg face 1",S("pressure","burn+draw",["Ashen Brawler","Riptide Rogue"])));
  add(Cr("Steam Scribe",1,1,2,"","death: draw 1",S("pressure","burn+draw",["Ember Imp","Pearl Diver"])));
  add(Sp("Distill",1,"play: draw 1 | play/hand5: energy 1",S("pressure","burn+draw",["Kindle Thoughts","Ebb and Flow"])));
  add(Sp("Scalding Study",2,"play: draw 1; dmg t 2",S("pressure","burn+draw",["Blaze of Insight","Flowing Wisdom"],{tgt:"e"})));
  add(Sp("Overflow",3,"play: draw 2 | play/hand6: dmg face 2",S("pressure","burn+draw",["Stoke the Coals","Tidal Insight"])));
  add(Re("Vent Steam",2,"play: dmg t 3; draw 1",S("pressure","burn+draw",["Heat Surge","Chill"],{tgt:"eatk"})));
  add(Re("Condense",1,"play: draw 1; buff t 0 2 tmp",S("pressure","shield+draw",["Flash Fire","Frozen Aegis"],{tgt:"o"})));
  add(Au("Pressure Cooker",4,"end/hand4: zaps 2 1",S("pressure","burn+draw",["Everburning Brazier","Tidal Mastery"])));
  add(Au("Simmering Pot",3,"start/hand4: zaps 1 2",S("pressure","burn+draw",["Hearth of Embers","Healing Spring"])));
  setR("u");
  add(Cr("Brass Kettle Golem",6,7,9,"","draw: buff self 1 1",S("pressure","size+draw",["Volcanic Brute","Harbor Golem"])));
  add(Cr("Geyser Guardian",6,6,9,"","play: draw 2",S("pressure","burn+wall",["Firebrand Knight","Icewall Colossus"])));
  add(Cr("Fog Diviner",3,3,4,"","play: draw 2",S("pressure","study+draw",["Sun Priestess","Deep Oracle"])));
  add(Sp("Boil Over",3,"play: dmg all_e 1 | play/hand5: dmg all_e 1",S("pressure","burn+draw",["Combustion Wave","Crashing Wave"])));
  add(Sp("Superheated Thought",4,"play: draw 3; dmg face 1",S("pressure","burn+draw",["Fury Unleashed","Deep Insight"])));
  add(Re("Condensation",2,"play: draw 2; dmg t 1",S("pressure","burn+draw",["Backdraft","Sudden Current"],{tgt:"eatk"})));
  add(Au("Boiling Kettle",2,"draw: dmg face 1",S("pressure","burn+draw",["Smoldering Tome","Tidal Archive"])));
  setR("r");
  add(Cr("Thermal Leviathan",5,6,8,"ward","play: draw 2",S("pressure","size+ward",["Lavaheart Titan","Leviathan Elder"])));
  add(Cr("Steam Oracle",3,4,7,"","draw: zaps 1 1",S("pressure","burn+draw",["Fireheart Oracle","Tidemaster Oracle"])));
  add(Sp("Pressure Release",5,"play: dmg t 4 | play/hand6: dmg t 4",S("pressure","burn+draw",["Dragonfire","Great Ebb"],{tgt:"e"})));
  add(Re("Boiling Point",2,"play: dmg t 2 | play/hand5: draw 2",S("pressure","burn+draw",["Inferno Surge","Frozen Moment"],{tgt:"ea"})));
  add(Au("Infinite Kettle",3,"start: draw 1 | draw: dmg face 1",S("pressure","burn+draw",["Altar of Embers","Ocean's Blessing"])));
  add(Au("Steam Archive",3,"static: bank 2 | start/hand5: energy 1",S("pressure","fuel+draw",["Crown of Cinders","Sea of Clarity"])));

  /* ---- Scald (20) ---- */
  setR("c");
  add(Cr("Scalding Crab",2,3,4,"","attack: zaps 1 1",S("scald","burn+shell",["Molten Hatchling","Coral Crab"])));
  add(Cr("Kelp Brander",2,3,4,"drain","attack: buff self 1 0 tmp",S("scald","burn+wall",["Brimstone Guard","Rime Watcher"])));
  add(Cr("Steam Vent Guard",3,4,6,"","play: dmg all_e 1",S("scald","burn+wall",["Bonfire Keeper","Reef Guardian"])));
  add(Cr("Boiling Reef",6,7,9,"drain","attack: zaps 1 2",S("scald","burn+drain",["Magma Golem","Sea Serpent"])));
  add(Cr("Scorchshell Turtle",2,4,4,"ward","hurt: buff self 1 0",S("scald","fury+ward",["Apprentice Pyromancer","Mist Weaver"])));
  add(Cr("Geyser Sentinel",5,6,8,"","play: dmg all_e 1 | start: mend self all",S("scald","burn+wall",["Kiln Golem","Shiver Elemental"])));
  add(Sp("Scalding Splash",2,"play: dmg t 3; mend own 2",S("scald","burn+mend",["Scorch","Soothing Rain"],{tgt:"e"})));
  add(Re("Scalding Shield",1,"play: buff t 0 3 tmp; dmg str 1",S("scald","burn+shield",["Ember Shield","Tidal Shield"],{tgt:"o"})));
  add(Re("Steam Burn",2,"play: dmg t 4",S("scald","burn+tide",["Wild Surge","Icy Grip"],{tgt:"eatk"})));
  add(Au("Hot Springs",2,"start: buff ostr 2 0 tmp",S("scald","warmth+mend",["Kindling Hearth","Tidal Archive"])));
  setR("u");
  add(Cr("Living Kettle",4,3,8,"","end: zaps 2 1",S("scald","burn+wall",["Flame Warden","Coral Hydra"])));
  add(Cr("Steamcoat Knight",3,3,5,"ward","attack: mend self all",S("scald","lance+mend",["Ignited Lancer","Tideborn Knight"])));
  add(Cr("Fumarole Warden",4,4,6,"","attack: zaps 1 2",S("scald","burn+wall",["Emberlord Captain","Abyssal Lurker"])));
  add(Sp("Boiling Tide",4,"play: dmg all_e 2; mend own all",S("scald","burn+mend",["Raging Inferno","Riptide Reversal"])));
  add(Re("Backlash Geyser",2,"play: dmg t 4",S("scald","burn+tide",["Backdraft","Whiplash Tide"],{tgt:"eatk"})));
  add(Au("Scalding Baths",3,"static: lord all 0 1 | start: mend own 1",S("scald","warmth+mend",["Furnace of Rage","Sea of Clarity"])));
  setR("r");
  add(Cr("Thermal Bastion",6,5,11,"drain","start: dmg face 1",S("scald","burn+drain",["Searing Overlord","Coral Titan"])));
  add(Cr("Scaldmother Hydra",5,5,8,"","start: zaps 2 1",S("scald","burn+wall",["Blazewing Matriarch","Deepsea Hydra"])));
  add(Sp("Scalding Cascade",3,"play: dmg all_e 2; mend own all",S("scald","burn+mend",["Firestorm Ritual","Healing Torrent"])));
  add(Au("Kettle Fortress",5,"static: lord all 0 2 | start: mend own all",S("scald","warmth+mend",["Crown of Cinders","Eternal Winter"])));

  /* ---- Fog (19) ---- */
  setR("c");
  add(Cr("Fog Skulker",1,2,1,"ward","",S("fog","ambush+ward",["Ember Whelp","Tide Sprite"])));
  add(Cr("Mist Assassin",3,5,3,"ward","attack: dmg str 1",S("fog","burn+ward",["Embercloak Assassin","Mistborn Assassin"])));
  add(Cr("Mist Ambusher",3,5,3,"ward","play: kw self haste tmp",S("fog","haste+ward",["Reckless Raider","Mistborn Assassin"])));
  add(Cr("Steam Phantom",2,3,3,"ward","attack: dmg face 1",S("fog","burn+ward",["Ember Duelist","Pearl Diver"])));
  add(Cr("Veiled Duelist",3,4,4,"ward","react: buff self 1 1",S("fog","fury+ward",["Scorchborn Duelist","Mist Weaver"])));
  add(Cr("Fogbank Whelp",2,3,3,"ward","play: draw 1",S("fog","size+ward",["Smokescreen Imp","Brook Otter"])));
  add(Sp("Smoke and Mirrors",1,"play: kw t ward; draw 1",S("fog","smoke+ward",["Flare Up","Tidal Insight"],{tgt:"o"})));
  add(Re("Vanish in Steam",1,"play: kw t ward tmp; buff t 2 0 tmp",S("fog","fury+ward",["Heat Surge","Tidal Shield"],{tgt:"o"})));
  add(Re("Ambush in the Mist",2,"play: dmg t 2; kw ostr ward tmp",S("fog","burn+ward",["Heat Surge","Frost Snap"],{tgt:"eatk"})));
  add(Au("Low Fog",2,"start: kw ostr ward",S("fog","smoke+ward",["Smoldering Tome","Sea of Clarity"])));
  setR("u");
  add(Cr("Fogbound Lurker",2,2,4,"ward","draw: heal 1",S("fog","smoke+ward",["Smokescreen Imp","Kelp Lurker"])));
  add(Cr("Fog Harrier",4,4,5,"ward","react: zaps 1 2",S("fog","burn+ward",["Ashwing Harrier","Wave Dancer"])));
  add(Cr("Cloud Kettle",2,2,4,"ward","react: draw 1",S("fog","study+ward",["Firebrand Zealot","Tidecaller Shaman"])));
  add(Sp("Shroud",4,"play: kw t ward; buff t 3 3",S("fog","fury+ward",["Rally the Flames","Deep Insight"],{tgt:"o"})));
  add(Re("Steam Curtain",2,"play: freeze t; kw ostr ward tmp",S("fog","shield+ward",["Ember Shield","Absolute Zero"],{tgt:"eatk"})));
  add(Au("Shrouded Vale",3,"react: zaps 1 2",S("fog","burn+tricks",["Furnace of Rage","Tidal Mastery"])));
  setR("r");
  add(Cr("Fogborn Djinn",5,6,6,"ward","play: draw 1; dmg t 2",S("fog","size+ward",["Flame Tyrant","Siren Queen"],{tgt:"e"})));
  add(Cr("The Unseen Kettle",4,4,6,"ward","attack: draw 1",S("fog","study+ward",["Inferno Champion","Glacial Empress"])));
  add(Re("Vanishing Point",2,"play: bounce t; draw 1",S("fog","ambush+tide",["Pyroclasm Reflex","Reverse Current"],{tgt:"eatk"})));
  
  /* ---- Boil (21) ---- */
  setR("c");
  add(Cr("Frostburn Sprite",1,1,1,"","play: freeze t; dmg t 1",S("boil","burn+freeze",["Ember Whelp","Frost Sprite"],{tgt:"e"})));
  add(Cr("Shatterflame Wolf",2,3,3,"","play: dmg frz_e 2",S("boil","burn+freeze",["Cinder Hound","Glacier Wolf"])));
  add(Cr("Boilfrost Mage",3,3,4,"","play: freeze t; dmg t 1",S("boil","burn+freeze",["Flamecaller Adept","Winter Mage"],{tgt:"e"})));
  add(Cr("Thawbreaker",4,4,5,"","attack: dmg frz_e 2",S("boil","burn+freeze",["Lava Hound","Frostbite Shade"])));
  add(Cr("Shatterclaw",4,6,5,"","attack: dmg frz_e 3",S("boil","burn+freeze",["Scorchclaw Ravager","Abyssal Lurker"])));
  add(Sp("Flash Boil",2,"play: freeze t; dmg frz_e 2",S("boil","burn+freeze",["Firebolt","Shatter"],{tgt:"e"})));
  add(Sp("Thermal Shock",3,"play: dmg t 2 frz",S("boil","burn+freeze",["Combust","Frozen Tomb"],{tgt:"e"})));
  add(Sp("Steam Scour",1,"play: dmg frz_e 1",S("boil","burn+freeze",["Searing Spark","Chill"])));
  add(Re("Frost Flare",1,"play: freeze t; dmg t 1",S("boil","burn+freeze",["Flash Fire","Icy Grip"],{tgt:"eatk"})));
  add(Au("Thermal Spring",2,"start: dmg frz_e 1",S("boil","burn+freeze",["Kindling Hearth","Permafrost Shrine"])));
  add(Au("Rime Brazier",3,"start: freeze weak; dmg frz_e 1",S("boil","burn+freeze",["Everburning Brazier","Permafrost Shrine"])));
  setR("u");
  add(Cr("Glassblower",1,1,2,"","freeze: dmg face 1",S("boil","burn+freeze",["Torchbearer","Rime Watcher"])));
  add(Cr("Frostfire Mage",3,3,4,"","play: freeze t; dmg frz_e 2",S("boil","burn+freeze",["Cinderstorm Mage","Hydromancer"],{tgt:"e"})));
  add(Cr("Boilback Siren",4,3,7,"","start: freeze str",S("boil","warmth+freeze",["Sun Priestess","Siren of the Shoals"])));
  add(Sp("Scald and Shatter",4,"play: freeze all_e; dmg frz_e 1",S("boil","burn+freeze",["Flame Wave","Cold Snap"])));
  add(Sp("Melting Point",3,"play: destroy t",S("boil","burn+freeze",["Fury Unleashed","Shatter"],{tgt:"e:frozen"})));
  add(Re("Thawing Blast",1,"play: dmg t 3",S("boil","burn+freeze",["Twin Bolts","Frozen Moment"],{tgt:"e:frozen"})));
  setR("r");
  add(Cr("Frostfire Wyrm",5,5,7,"pierce","attack: dmg frz_e 2",S("boil","pierce+freeze",["Flamewing Dragon","Frostfang Wyrm"])));
  add(Cr("Boiling Empress",4,4,6,"","start: freeze str; dmg frz_e 1",S("boil","burn+freeze",["Ember Queen","Glacial Empress"])));
  add(Sp("Glacial Furnace",5,"play: freeze all_e; dmg frz_e 2",S("boil","burn+freeze",["Dragonfire","Glacial Cataclysm"])));
  add(Re("Frozen Inferno",2,"play: freeze t; dmg frz_e 2",S("boil","burn+freeze",["Inferno Surge","Ice Prison"],{tgt:"eatk"})));

  /* ---- Vent (15) ---- */
  setR("c");
  add(Cr("Vent Sprite",1,1,1,"haste","play: dmg face 1",S("vent","burn+tide",["Ember Imp","Tide Sprite"])));
  add(Cr("Geyser Hopper",2,3,3,"","play: dmg t 2",S("vent","burn+tide",["Apprentice Pyromancer","Riverbank Sage"],{tgt:"e"})));
  add(Cr("Steam Courier",3,3,4,"","play: bounce t; dmg face 1",S("vent","burn+tide",["Flame Herald","Tide Caller"],{tgt:"o"})));
  add(Sp("Recoil",1,"play: bounce t; dmg face 1",S("vent","burn+tide",["Flare Up","Ebb and Flow"],{tgt:"o"})));
  add(Sp("Second Boil",2,"play: bounce t; draw 1",S("vent","study+tide",["Call the Embers","Tidal Insight"],{tgt:"o"})));
  add(Re("Hiss",1,"play: bounce t; dmg str 1",S("vent","burn+tide",["Wildfire Ignition","Undertow"],{tgt:"o"})));
  add(Au("Release Valve",4,"end: zaps 1 2",S("vent","burn+tide",["Kindling Hearth","Healing Spring"])));
  setR("u");
  add(Cr("Geyser Shaman",3,3,4,"","play: dmg t 3",S("vent","burn+tide",["Pyre Zealot","Tidecaller Shaman"],{tgt:"e"})));
  add(Cr("Rebound Elemental",4,4,4,"","play: bounce t; dmg all_e 1",S("vent","burn+tide",["Living Wildfire","Kraken Spawn"],{tgt:"o"})));
  add(Cr("Steamjet Rider",2,3,2,"haste","play: bounce t",S("vent","haste+tide",["Reckless Raider","Riptide Rogue"],{tgt:"o"})));
  add(Sp("Eruption Cycle",2,"play: bounce t; energy 2",S("vent","fuel+tide",["Combust","Riptide Reversal"],{tgt:"o"})));
  add(Au("Fumarole Field",3,"creature: dmg face 1",S("vent","burn+tide",["Everburning Brazier","Sea of Clarity"])));
  setR("r");
  add(Cr("Old Faithful",5,5,7,"","play: dmg all_e 2",S("vent","burn+tide",["Magmaforge Golem","Shoal Leviathan"])));
  add(Cr("Geyser Drake",4,5,5,"haste","play: bounce t",S("vent","haste+tide",["Solar Flare Drake","Storm Narwhal"],{tgt:"o"})));
  add(Sp("Great Venting",6,"play: bounce own; draw 2",S("vent","study+tide",["Pyre Ascension","Great Ebb"])));
})();
