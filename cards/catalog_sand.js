/* ================= SAND CATALOG (designed confluence cards, generated first draft) =================
   Wind + Earth. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   erosion (25: shrink + bounce), dune (20: burn + fortify), sandstorm (20: burn + shrink), quicksand (20, support: bounce + shrink), mesa (15: fortify).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [wind, earth]. */
// Loaded by build.py inside catalogBegin("sand")/catalogEnd("sand") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.SAND_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"sand" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.SAND_CATALOG.push(d); return d; };
  setEl("sand");

  /* ---- erosion (25) ---- */
  setR("c");
  add(Cr("Sandstorm Spirit",2,3,3,"","play: buff t -1 -1",S("erosion","shrink+bounce",["Whirlwind Acrobat","Bedrock Wall"],{tgt:"e"})));
  add(Cr("Sunbaked Familiar",3,4,4,"","attack: buff str -1 0",S("erosion","shrink+bounce",["Harrier Hawk","Cliffside Watcher"])));
  add(Cr("Gritted Imp",3,4,4,"","play: bounce t",S("erosion","shrink+bounce",["Featherfall Hawk","Canyon Ram"],{tgt:"o"})));
  add(Cr("Dune Scout",1,2,2,"","play: bounce t",S("erosion","shrink+bounce",["Gust Sprite","Stone Sentry"],{tgt:"e:cost<=2"})));
  add(Cr("Shifting Adept",3,4,4,"","play: buff t -1 -1",S("erosion","shrink+bounce",["Wind Dancer","Geode Burrower"],{tgt:"e"})));
  add(Cr("Sirocco Imp",3,4,4,"","play: buff t -1 -1",S("erosion","shrink+bounce",["Dust Devil","Bulwark Golem"],{tgt:"e"})));
  add(Sp("Sunbaked Gift",2,"play: buff t -1 -1",S("erosion","shrink+bounce",["Gust of Wind","Quake"],{tgt:"e"})));
  add(Sp("Desert Torrent",2,"play: buff all_e -1 0; draw 1",S("erosion","shrink+bounce",["Recall Gust","Rockslide"])));
  add(Sp("Shifting Rain",1,"play: buff all_e -1 0; draw 1",S("erosion","shrink+bounce",["Updraft","Earthen Blessing"])));
  add(Re("Mesa Snap",1,"play: bounce t",S("erosion","shrink+bounce",["Tailwind","Rock Shield"],{tgt:"eatk"})));
  add(Re("Dune Ward",2,"play: bounce t",S("erosion","shrink+bounce",["Crosswind","Rock Shield"],{tgt:"eatk"})));
  add(Au("Mesa Beacon",2,"start: buff rnd -1 0",S("erosion","shrink+bounce",["Jet Stream","Mountain's Patience"])));
  add(Au("Sirocco Sanctum",2,"start: buff ostr 1 0 tmp",S("erosion","shrink+bounce",["Sky Temple","Ley Line"])));
  setR("u");
  add(Cr("Wind-carved Imp",4,5,5,"","play: buff t -1 -1",S("erosion","shrink+bounce",["Gust Knight","Basalt Champion"],{tgt:"e"})));
  add(Cr("Shifting Scout",3,4,4,"","play: bounce t",S("erosion","shrink+bounce",["Cloudshaper","Geode Shaman"],{tgt:"o"})));
  add(Cr("Mesa Shaman",4,5,5,"","play: bounce t",S("erosion","shrink+bounce",["Tornado Elemental","Cavern Troll"],{tgt:"e:cost<=3"})));
  add(Cr("Wind-carved Weaver",4,5,5,"","start: buff rnd -1 -1",S("erosion","shrink+bounce",["Raptor of the Peaks","Tremor Lord"])));
  add(Sp("Shifting Blast",4,"play: bounce t; draw 1",S("erosion","shrink+bounce",["Squall Line","Seismic Devastation"],{tgt:"o"})));
  add(Sp("Sirocco Storm",2,"play: bounce t; draw 1",S("erosion","shrink+bounce",["Skyward Ascent","Unyielding Earth"],{tgt:"o"})));
  add(Re("Desert Feint",3,"play: buff t -2 -2",S("erosion","shrink+bounce",["Evasive Maneuver","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Dune Engine",2,"ebounce: draw 1",S("erosion","shrink+bounce",["Jet Stream","Sacred Grove"])));
  setR("r");
  add(Cr("Sandstorm Adept",5,7,7,"","play: buff t -2 0",S("erosion","shrink+bounce",["Thunderwing Roc","Crystal Dragon"],{tgt:"e"})));
  add(Cr("Sandstorm Caller",6,8,8,"","attack: buff str -1 0",S("erosion","shrink+bounce",["Aerie Matriarch","Primordial Titan"])));
  add(Cr("Mesa Weaver",6,8,8,"","play: bounce t; draw 1",S("erosion","shrink+bounce",["Cloud Titan","Avalanche Titan"],{tgt:"e"})));
  add(Sp("Wind-carved Wave",5,"play: buff all_e -1 0; draw 1",S("erosion","shrink+bounce",["Tornado","Seismic Devastation"])));
  add(Re("Wind-carved Trap",3,"play: bounce t",S("erosion","shrink+bounce",["Perfect Gale","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Dust Beacon",4,"start: buff all_e -1 0",S("erosion","shrink+bounce",["Eye of Eternity","Heart of the World"])));

  /* ---- dune (20) ---- */
  setR("c");
  add(Cr("Mesa Serpent",2,2,3,"airborne","attack: dmg face 1",S("dune","burn+fortify+airborne",["Zephyr Courier","Thornback Boar"])));
  add(Cr("Gritted Caller",3,4,4,"","death: fort own 1",S("dune","burn+fortify",["Gale Sage","Ironhide Rhino"])));
  add(Cr("Sandstorm Elemental",2,3,3,"","play: fort t 1",S("dune","burn+fortify",["Feather Sprite","Granite Guard"],{tgt:"o"})));
  add(Cr("Sirocco Familiar",3,3,4,"airborne","play: fort t 1",S("dune","burn+fortify+airborne",["Sky Courier","Quarry Shaman"],{tgt:"o"})));
  add(Cr("Shifting Serpent",2,3,3,"","play: fort self 1",S("dune","burn+fortify",["Kestrel Rider","Burrow Mole"])));
  add(Sp("Desert Blast",1,"play: dmg all_e 1",S("dune","burn+fortify",["Cyclone Kick","Boulder Toss"])));
  add(Sp("Sirocco Rain",1,"play: dmg t 1; draw 1",S("dune","burn+fortify",["Tailwind Rush","Stone Skin"],{tgt:"e"})));
  add(Re("Desert Snap",1,"play: fort t 1; buff t 1 1 tmp",S("dune","burn+fortify",["Sidestep","Stone Aegis"],{tgt:"o"})));
  add(Re("Dune Recoil",2,"play: fort t 2",S("dune","burn+fortify",["Vanishing Wind","Rock Shield"],{tgt:"o"})));
  add(Au("Gritted Sanctum",1,"end: dmg face 1",S("dune","burn+fortify",["Sky Temple","Fortress Walls"])));
  add(Au("Gritted Grove",1,"end: dmg face 1",S("dune","burn+fortify",["Sky Temple","Crystal Resonance"])));
  setR("u");
  add(Cr("Dust Shaman",2,2,3,"airborne","death: dmg all_e 1",S("dune","burn+fortify+airborne",["Zephyr Monk","Amber Golem"])));
  add(Cr("Gritted Scout",3,3,4,"airborne","death: dmg all_e 1",S("dune","burn+fortify+airborne",["Squall Captain","Stoneheart Sentinel"])));
  add(Cr("Sirocco Golem",5,6,6,"airborne","start: zaps 1 2",S("dune","burn+fortify+airborne",["Thunderhawk","Mountain Strider"])));
  add(Sp("Gritted Burst",3,"play: fort t 2; buff t 1 0",S("dune","burn+fortify",["Gale Barrage","Cataclysmic Quake"],{tgt:"o"})));
  add(Sp("Sirocco Ritual",3,"play: dmg t 3",S("dune","burn+fortify",["Updraft Swarm","Seismic Pulse"],{tgt:"ea"})));
  add(Re("Dust Snap",3,"play: fort t 2",S("dune","burn+fortify",["Sky Strike","Stone Aegis"],{tgt:"o"})));
  add(Au("Dust Engine",3,"end: dmg face 1",S("dune","burn+fortify",["Wind Chimes","Stone Sanctuary"])));
  setR("r");
  add(Cr("Wind-carved Adept",6,7,8,"airborne","play: fort self 1",S("dune","burn+fortify+airborne",["Aerie Matriarch","Avalanche Titan"])));
  add(Cr("Sirocco Adept",5,6,7,"airborne","play: fort own 2",S("dune","burn+fortify+airborne",["Ancient Wind Spirit","Diamondhide Wurm"])));
  add(Sp("Shifting Volley",6,"play: dmg all_e 2",S("dune","burn+fortify",["Squall Line","Shatter the Earth"])));
  add(Re("Dust Feint",5,"play: dmg t 7",S("dune","burn+fortify",["Wind Barrier","Stone Aegis"],{tgt:"eatk"})));
  add(Au("Sirocco Altar",4,"start: fort ostr 1",S("dune","burn+fortify",["Sky Throne","Heart of the World"])));

  /* ---- sandstorm (20) ---- */
  setR("c");
  add(Cr("Sandstorm Scout",1,2,2,"","attack: buff str -1 0",S("sandstorm","burn+shrink",["Swift Courier","Root Tender"])));
  add(Cr("Gritted Golem",3,4,4,"","play: dmg face 1",S("sandstorm","burn+shrink",["Flock Leader","Grove Shaper"])));
  add(Cr("Dune Weaver",2,3,3,"","attack: dmg face 1",S("sandstorm","burn+shrink",["Skyward Scout","Crystal Burrower"])));
  add(Cr("Mesa Sentinel",1,2,2,"","play: buff t -2 0",S("sandstorm","burn+shrink",["Sparrow Scout","Pebble Golem"],{tgt:"e"})));
  add(Cr("Sirocco Weaver",2,3,3,"","play: dmg t 2",S("sandstorm","burn+shrink",["Wind Wanderer","Spiked Barricade"],{tgt:"e"})));
  add(Sp("Wind-carved Call",2,"play: buff all_e -1 0; draw 1",S("sandstorm","burn+shrink",["Zephyr Strike","Overgrowth"])));
  add(Sp("Dust Rain",2,"play: buff all_e -1 0; draw 1",S("sandstorm","burn+shrink",["Wingbeat","Fault Line"])));
  add(Re("Wind-carved Flash",2,"play: dmg t 2",S("sandstorm","burn+shrink",["Crosswind","Earthen Ward"],{tgt:"ea"})));
  add(Re("Shifting Ward",2,"play: buff t -2 -2",S("sandstorm","burn+shrink",["Evasive Maneuver","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Gritted Banner",2,"start: buff rnd -1 0",S("sandstorm","burn+shrink",["Wind Chimes","Fortress Walls"])));
  setR("u");
  add(Cr("Desert Adept",4,5,5,"","play: dmg t 5",S("sandstorm","burn+shrink",["Vortex Mage","Ancient Guardian"],{tgt:"e"})));
  add(Cr("Sunbaked Serpent",4,5,5,"","death: dmg all_e 1",S("sandstorm","burn+shrink",["Feathered Serpent","Jade Behemoth"])));
  add(Cr("Wind-carved Spirit",4,5,5,"","play: buff t -2 0",S("sandstorm","burn+shrink",["Skyline Falcon","Grand Geomancer"],{tgt:"e"})));
  add(Sp("Wind-carved Storm",4,"play: dmg t 4",S("sandstorm","burn+shrink",["Tempest Volley","Unearth"],{tgt:"ea"})));
  add(Re("Mesa Riposte",2,"play: dmg t 3",S("sandstorm","burn+shrink",["Perfect Gale","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Gritted Totem",3,"spell: zaps 1 1",S("sandstorm","burn+shrink",["Aerie","Sacred Grove"])));
  setR("r");
  add(Cr("Dust Elemental",6,8,8,"","play: dmg t 3",S("sandstorm","burn+shrink",["Cloud Leviathan","Primordial Titan"],{tgt:"e"})));
  add(Cr("Wind-carved Shaman",5,7,7,"","play: dmg t 3",S("sandstorm","burn+shrink",["Tempest Dragon","Gaia's Avatar"],{tgt:"e"})));
  add(Sp("Mesa Call",3,"play: buff t -2 -2",S("sandstorm","burn+shrink",["Aerial Bombardment","Earth's Fury"],{tgt:"e"})));
  add(Re("Wind-carved Ward",3,"play: dmg t 5",S("sandstorm","burn+shrink",["Vanishing Wind","Tremor Trap"],{tgt:"eatk"})));
  add(Au("Desert Altar",4,"start: zaps 1 1",S("sandstorm","burn+shrink",["Aerie","Stone Sanctuary"])));

  /* ---- quicksand (20, support) ---- */
  setR("c");
  add(Cr("Desert Wall",2,2,4,"","play: bounce t",S("quicksand","bounce+shrink",["Windbreak Guardian","Stonecaller"],{tgt:"o"})));
  add(Cr("Sunbaked Watcher",1,1,3,"","play: buff t -1 -1",S("quicksand","bounce+shrink",["Storm Crow","Clay Homunculus"],{tgt:"e"})));
  add(Cr("Sandstorm Bulwark",2,2,4,"","play: bounce t",S("quicksand","bounce+shrink",["Drifting Monk","Seed Bearer"],{tgt:"o"})));
  add(Cr("Sirocco Behemoth",1,1,3,"","play: buff t -1 -1",S("quicksand","bounce+shrink",["Tempest Sprite","Clay Homunculus"],{tgt:"e"})));
  add(Cr("Sunbaked Warden",2,2,4,"","attack: buff str -1 0",S("quicksand","bounce+shrink",["Breeze Messenger","Crag Brute"])));
  add(Sp("Shifting Burst",1,"play: bounce t",S("quicksand","bounce+shrink",["Cyclone Kick","Fertile Ground"],{tgt:"e"})));
  add(Sp("Wind-carved Rain",2,"play: buff all_e -1 0; draw 1",S("quicksand","bounce+shrink",["Wind Shear","Rockslide"])));
  add(Re("Sirocco Feint",2,"play: bounce t",S("quicksand","bounce+shrink",["Sidestep","Rock Shield"],{tgt:"eatk"})));
  add(Au("Sirocco Totem",2,"start: buff rnd -1 0",S("quicksand","bounce+shrink",["Sky Temple","Mountain's Patience"])));
  setR("u");
  add(Cr("Mesa Bulwark",3,2,5,"skyguard","ebounce: draw 1",S("quicksand","bounce+shrink+skyguard",["Sky Pirate","Iron Tortoise"])));
  add(Cr("Sandstorm Giant",3,2,5,"skyguard","play: bounce t",S("quicksand","bounce+shrink+skyguard",["Windsong Falcon","Granite Lion"],{tgt:"e:cost<=3"})));
  add(Cr("Shifting Watcher",4,3,7,"","play: bounce t",S("quicksand","bounce+shrink",["Cloud Strider","Elder Treant"],{tgt:"o"})));
  add(Sp("Dust Ritual",3,"play: buff all_e -1 0; draw 1",S("quicksand","bounce+shrink",["Wind Walk","Cataclysmic Quake"])));
  add(Re("Dune Trap",4,"play: bounce t",S("quicksand","bounce+shrink",["Wind Barrier","Earthen Ward"],{tgt:"eatk"})));
  add(Au("Dune Grove",3,"start: buff ostr 1 0 tmp",S("quicksand","bounce+shrink",["Eye of Eternity","Crystal Resonance"])));
  setR("r");
  add(Cr("Mesa Wall",5,4,9,"skyguard","play: bounce t; draw 1",S("quicksand","bounce+shrink+skyguard",["Lord of the Skies","Bedrock Leviathan"],{tgt:"e"})));
  add(Cr("Dune Wall",4,3,7,"skyguard","play: buff t -1 -1",S("quicksand","bounce+shrink+skyguard",["Zephyr Archon","Golem Patriarch"],{tgt:"e"})));
  add(Sp("Wind-carved Rite",5,"play: buff t -3 -3",S("quicksand","bounce+shrink",["Winds of Change","Earth's Fury"],{tgt:"e"})));

  /* ---- mesa (15) ---- */
  setR("c");
  add(Cr("Sirocco Titan",1,1,3,"","play: fort t 1",S("mesa","fortify",["Gust Sprite","Crystal Sprout"],{tgt:"o"})));
  add(Cr("Dust Bulwark",2,2,3,"airborne","play: fort t 1",S("mesa","fortify+airborne",["Swiftwing Herald","Druid of the Stone"],{tgt:"o"})));
  add(Cr("Wind-carved Tortoise",2,2,3,"airborne","play: fort t 1",S("mesa","fortify+airborne",["Gale Rider","Rampart Elder"],{tgt:"o"})));
  add(Cr("Wind-carved Watcher",3,3,5,"","death: fort own 1",S("mesa","fortify",["Cloud Hawk","Rampart Elder"])));
  add(Sp("Wind-carved Gift",2,"play: fort t 2; buff t 1 0",S("mesa","fortify",["Recall Gust","Quake"],{tgt:"o"})));
  add(Re("Sirocco Guard",1,"play: fort t 2",S("mesa","fortify",["Sky Strike","Rock Shield"],{tgt:"o"})));
  add(Au("Shifting Font",1,"start: fort ostr 1",S("mesa","fortify",["Jet Stream","Ley Line"])));
  setR("u");
  add(Cr("Dune Colossus",4,3,6,"airborne","play: fort self 1",S("mesa","fortify+airborne",["Storm Roc","Hill Giant"])));
  add(Cr("Desert Behemoth",4,3,6,"airborne","play: fort t 1",S("mesa","fortify+airborne",["Roc Hatchery","Mountain Guardian"],{tgt:"o"})));
  add(Sp("Desert Volley",3,"play: fort own 1",S("mesa","fortify",["Gale Barrage","Unearth"])));
  setR("r");
  add(Cr("Desert Watcher",5,4,9,"airborne","play: fort self 1",S("mesa","fortify+airborne",["Hurricane Elemental","Obsidian Golem"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.SAND_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["sand"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
