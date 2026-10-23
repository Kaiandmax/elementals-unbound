/* ================= THE OTHER NINE CONFLUENCES =================
   Same fusion rules as Volcano (see fusion.js). Each confluence has 4 older named recipes
   (2 common, 1 uncommon, 1 rare); its Manifests live in manifests_more.js and specials_dual.js. */

/* ---- Wildfire (Fire + Wind): fliers and damage that spreads ---- */
recipe("wildfire", "Ember Imp", "Gust Sprite", "c", ()=>Cr("Cinder Sprite",1,2,2,"airborne haste","death: dmg all_e 1"));
recipe("wildfire", "Searing Spark", "Cyclone Kick", "c", ()=>Sp("Firewhirl",2,"play: dmg t 3; dmg all_e 1",{tgt:"ea"}));
recipe("wildfire", "Fireball", "Updraft", "u", ()=>Sp("Rising Inferno",3,"play: dmg t 4; dmg all_e 1; energy 1",{tgt:"ea"}));
recipe("wildfire", "Ashborn Phoenix", "Storm Roc", "r", ()=>Cr("Wildfire Phoenix",4,5,5,"airborne haste","death: dmg all_e 2; summon drake 1",{ch:1}));

/* ---- Plasma (Fire + Lightning): raw power at a cost in life ---- */
recipe("plasma", "Cinder Hound", "Volt Runner", "c", ()=>Cr("Plasma Hound",2,4,3,"haste",""));
recipe("plasma", "Searing Spark", "Static Bolt", "c", ()=>Sp("Plasma Bolt",1,"play: dmg t 3",{tgt:"ea"}));
recipe("plasma", "Pyre Dancer", "Thunderclap Adept", "u", ()=>Cr("Arc Dancer",3,3,4,"","play: dmg t 2 | spell: dmg face 1",{tgt:"ea"}));
recipe("plasma", "Magma Golem", "Galvanic Golem", "r", ()=>Cr("Plasma Colossus",4,5,7,"haste pierce","play: selfdmg 1",{ch:1}));

/* ---- Steam (Fire + Water): scalding blockers and card flow ---- */
recipe("steam", "Ember Imp", "Tide Sprite", "c", ()=>Cr("Steam Wisp",1,2,3,"","block: dmg face 1"));
recipe("steam", "Flame Lash", "Tidal Insight", "c", ()=>Sp("Scalding Insight",2,"play: dmg t 3; draw 1",{tgt:"e"}));
recipe("steam", "Kindling Hearth", "Healing Spring", "u", ()=>Au("Hot Spring",2,"start: heal 1; charge 1 | spend: dmg face 1"));
recipe("steam", "Fireball", "Frost Snap", "r", ()=>Re("Thermal Shock",2,"play: freeze t; dmg t 4; draw 1",{tgt:"e"}));

/* ---- Swamp (Water + Earth): regrowth, Drain and returning dead ---- */
recipe("swamp", "Tide Sprite", "Pebble Golem", "c", ()=>Cr("Mire Sprout",1,2,4,"","",{fort:1}));
recipe("swamp", "Tidal Insight", "Earthen Blessing", "c", ()=>Sp("Fertile Mire",2,"play: buff t 2 2; draw 1",{tgt:"o"}));
recipe("swamp", "Coral Warden", "Geode Burrower", "u", ()=>Cr("Bog Shambler",3,4,6,"drain","death: summon stoneling 1"));
recipe("swamp", "Leviathan Calf", "Granite Behemoth", "r", ()=>Cr("Swamp Leviathan",5,8,9,"drain","",{fort:1,ch:1}));

/* ---- Ice (Water + Wind): freeze the enemy and hold the sky ---- */
recipe("ice", "Tide Sprite", "Gust Sprite", "c", ()=>Cr("Frost Wisp",1,1,2,"airborne","play: freeze t",{tgt:"e"}));
recipe("ice", "Frost Snap", "Tailwind", "c", ()=>Re("Hailstrike",1,"play: freeze t; draw 1",{tgt:"e"}));
recipe("ice", "Whirlpool Mage", "Wind Dancer", "u", ()=>Cr("Glacier Dancer",3,3,4,"airborne","play: freeze t; energy 1",{tgt:"e"}));
recipe("ice", "Leviathan Calf", "Storm Roc", "r", ()=>Cr("Frost Roc",4,5,6,"airborne","attack: freeze str",{ch:1}));

/* ---- Storm (Lightning + Water): draw deep, then strike ---- */
recipe("storm", "Charge Conduit", "Tidal Insight", "c", ()=>Sp("Brainstorm",1,"play: draw 2"));
recipe("storm", "Spark Mite", "Tide Sprite", "c", ()=>Cr("Storm Mite",1,2,3,"haste",""));
recipe("storm", "Thunderclap Adept", "Riverbank Sage", "u", ()=>Cr("Storm Sage",3,3,4,"","play: draw 1 | spell: dmg face 1"));
recipe("storm", "Arc Lash", "Frost Snap", "r", ()=>Sp("Thunder Torrent",2,"play: freeze t; dmg t 3; draw 1",{tgt:"e"}));

/* ---- Sand (Wind + Earth): erode the enemy board ---- */
recipe("sand", "Skyward Scout", "Stonecaller", "c", ()=>Cr("Dune Scout",2,3,4,"airborne",""));
recipe("sand", "Cyclone Kick", "Rockslide", "c", ()=>Sp("Sandblast",3,"play: bounce t; dmg str 3",{tgt:"e:basic"}));
recipe("sand", "Featherfall Hawk", "Quarry Shaman", "u", ()=>Cr("Dune Shaman",3,3,5,"airborne","play: dmg t 2",{tgt:"ea"}));
recipe("sand", "Storm Roc", "Granite Behemoth", "r", ()=>Cr("Sandstorm Colossus",5,7,8,"airborne","play: bounce t",{tgt:"e:basic",ch:1}));

/* ---- Metal (Lightning + Earth): armor up and grow ---- */
recipe("metal", "Volt Runner", "Pebble Golem", "c", ()=>Cr("Iron Runner",2,3,3,"haste","",{fort:1}));
recipe("metal", "Overclock", "Earthen Blessing", "c", ()=>Sp("Forge Charge",1,"play: buff t 2 2; energy 1",{tgt:"o"}));
recipe("metal", "Galvanic Golem", "Ironbark Treant", "u", ()=>Cr("Steel Golem",3,4,6,"","",{fort:1}));
recipe("metal", "Thunderclap Adept", "Granite Behemoth", "r", ()=>Cr("Dynamo Titan",5,7,8,"","spell: buff self 1 1",{ch:1}));

/* ---- Tempest (Wind + Lightning): pure speed in the air ---- */
recipe("tempest", "Gust Sprite", "Spark Mite", "c", ()=>Cr("Storm Sprite",1,2,1,"airborne haste",""));
recipe("tempest", "Tailwind", "Blitz", "c", ()=>Re("Gale Blitz",1,"play: buff t 3 1 temp; kw t airborne temp",{tgt:"oatk"}));
recipe("tempest", "Wind Dancer", "Volt Runner", "u", ()=>Cr("Gale Runner",2,3,2,"airborne haste",""));
recipe("tempest", "Storm Roc", "Galvanic Golem", "r", ()=>Cr("Thunderbird Ascendant",4,5,5,"airborne haste","play: dmg t 2",{tgt:"ea",ch:1}));
