/* ================= TEMPEST CATALOG (designed confluence cards, generated first draft) =================
   Wind + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   blitz (25: haste + burn), galeriders (20: burn + buff), squallline (20: haste + buff), eyeofstorm (20, support: barrier + bounce), downburst (15: bounce + burn).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [wind, lightning]. */
// Loaded by build.py inside catalogBegin("tempest")/catalogEnd("tempest") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.TEMPEST_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"tempest" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.TEMPEST_CATALOG.push(d); return d; };
  setEl("tempest");

  /* ---- blitz (25) ---- */
  setR("c");
  add(Cr("Gale Hound",1,2,1,"haste","play: kw self haste tmp",S("blitz","haste+burn+haste",["Sparrow Scout","Volt Hopper"])));
  add(Cr("Gale Reaver",1,2,1,"haste","play: dmg t 1",S("blitz","haste+burn+haste",["Swift Courier","Spark Mite"],{tgt:"e"})));
  add(Cr("Cyclone Charger",1,2,2,"","attack: buff self 1 0 tmp",S("blitz","haste+burn",["Gust Sprite","Static Sprite"])));
  add(Cr("Lightning Hound",2,3,2,"haste","play: kw self haste tmp",S("blitz","haste+burn+haste",["Feather Sprite","Capacitor Golem"])));
  add(Cr("Volt Hound",2,3,2,"haste","play: kw self haste tmp",S("blitz","haste+burn+haste",["Skyward Scout","Flicker Mage"])));
  add(Cr("Volt Hawk",3,4,3,"haste","attack: buff self 1 0 tmp",S("blitz","haste+burn+haste",["Featherfall Hawk","Bolt Thrower"])));
  add(Sp("Gale Surge",1,"play: untap t; buff t 1 0",S("blitz","haste+burn",["Updraft","Charge Conduit"],{tgt:"o"})));
  add(Sp("Howling Storm",1,"play: dmg all_e 1",S("blitz","haste+burn",["Tailwind Rush","Overclock"])));
  add(Sp("Stormrider Blast",1,"play: dmg t 1",S("blitz","haste+burn",["Cyclone Kick","Quick Study"],{tgt:"ea"})));
  add(Re("Cyclone Riposte",2,"play: buff t 2 1 tmp",S("blitz","haste+burn",["Tailwind","Surge Shield"],{tgt:"oatk"})));
  add(Re("Volt Feint",2,"play: untap t",S("blitz","haste+burn",["Evasive Maneuver","Shockwave Counter"],{tgt:"o"})));
  add(Au("Stormrider Grove",1,"start: zaps 1 1",S("blitz","haste+burn",["Sky Temple","Lightning Rod"])));
  add(Au("Whirling Sanctum",1,"start: buff ostr 1 0 tmp",S("blitz","haste+burn",["Sky Temple","Charged Coil"])));
  setR("u");
  add(Cr("Cyclone Raider",4,5,4,"haste","death: dmg all_e 1",S("blitz","haste+burn+haste",["Raptor of the Peaks","Lightning Elemental"])));
  add(Cr("Volt Brute",4,5,4,"haste","start: zaps 1 2",S("blitz","haste+burn+haste",["Gust Knight","Spark Golem"])));
  add(Cr("Skybolt Falcon",4,5,4,"haste","creature: buff self 1 0",S("blitz","haste+burn+haste",["Vortex Mage","Galvanic Sentinel"])));
  add(Cr("Thunderwing Wolf",5,6,5,"haste","attack: buff self 1 0 tmp",S("blitz","haste+burn+haste",["Thunderhawk","Conduit Colossus"])));
  add(Sp("Stormrider Torrent",2,"play: dmg t 2; draw 1",S("blitz","haste+burn",["Wind Walk","Static Burst"],{tgt:"e"})));
  add(Sp("Howling Rite",3,"play: dmg all_e 1",S("blitz","haste+burn",["Gale Barrage","Forked Lightning"])));
  add(Re("Cyclone Flash",3,"play: dmg t 3",S("blitz","haste+burn",["Perfect Gale","Lightning Reflexes"],{tgt:"ea"})));
  add(Au("Volt Font",3,"static: lord all 1 0",S("blitz","haste+burn",["Jet Stream","Infinite Battery"])));
  setR("r");
  add(Cr("Squall Falcon",6,7,6,"haste","death: dmg all_e 1",S("blitz","haste+burn+haste",["Cloud Titan","Storm Titan"])));
  add(Cr("Cyclone Striker",5,6,5,"haste","attack: buff self 1 0 tmp",S("blitz","haste+burn+haste",["Thunderwing Roc","Charged Juggernaut"])));
  add(Cr("Whirling Hound",6,7,6,"haste","attack: dmg all_e 1",S("blitz","haste+burn+haste",["Aerie Matriarch","Storm Titan"])));
  add(Sp("Howling Call",4,"play: dmg t 6",S("blitz","haste+burn",["Squall Line","Ion Storm"],{tgt:"e"})));
  add(Re("Whirling Riposte",4,"play: dmg t 4",S("blitz","haste+burn",["Vanishing Wind","Thunder Trap"],{tgt:"ea"})));
  add(Au("Cyclone Beacon",5,"start: dmg all_e 1",S("blitz","haste+burn",["Sky Throne","Tesla Coil"])));

  /* ---- galeriders (20) ---- */
  setR("c");
  add(Cr("Squall Duelist",3,5,3,"","attack: dmg face 1",S("galeriders","burn+buff",["Cloud Hawk","Tesla Knight"])));
  add(Cr("Volt Lancer",2,3,2,"airborne","attack: dmg face 1",S("galeriders","burn+buff+airborne",["Zephyr Courier","Volt Runner"])));
  add(Cr("Thunderwing Charger",3,4,3,"airborne","attack: buff self 1 0 tmp",S("galeriders","burn+buff+airborne",["Sky Courier","Voltage Hound"])));
  add(Cr("Howling Lancer",2,3,2,"airborne","death: dmg all_e 1",S("galeriders","burn+buff+airborne",["Whirlwind Acrobat","Conduit Keeper"])));
  add(Cr("Thunderwing Drake",3,5,3,"","attack: dmg face 1",S("galeriders","burn+buff",["Wind Dancer","Storm Caller"])));
  add(Sp("Skybolt Call",2,"play: buff t 1 1",S("galeriders","burn+buff",["Recall Gust","Thunder Lance"],{tgt:"o"})));
  add(Sp("Gale Call",2,"play: buff t 1 1",S("galeriders","burn+buff",["Gust of Wind","Jolt"],{tgt:"o"})));
  add(Re("Whirling Snap",2,"play: buff t 1 1 tmp",S("galeriders","burn+buff",["Crosswind","Shock Reflex"],{tgt:"oatk"})));
  add(Re("Lightning Snap",2,"play: buff t 1 1 tmp",S("galeriders","burn+buff",["Sidestep","Blitz"],{tgt:"oatk"})));
  add(Au("Stormrider Banner",1,"start: zaps 1 1",S("galeriders","burn+buff",["Sky Temple","Overload Coil"])));
  add(Au("Whirling Altar",1,"end: dmg face 1",S("galeriders","burn+buff",["Jet Stream","Lightning Rod"])));
  setR("u");
  add(Cr("Howling Brute",4,6,4,"","attack: dmg face 1",S("galeriders","burn+buff",["Tornado Elemental","Thunderclap Adept"])));
  add(Cr("Skybolt Raider",4,6,4,"","static: lord all 1 0",S("galeriders","burn+buff",["Lord of the Skies","Galvanic Golem"])));
  add(Cr("Volt Reaver",4,5,4,"airborne","static: lord all 1 0",S("galeriders","burn+buff+airborne",["Feathered Serpent","Capacitor Titan"])));
  add(Sp("Skybolt Surge",3,"play: dmg t 4",S("galeriders","burn+buff",["Gale Barrage","Overload Cascade"],{tgt:"e"})));
  add(Sp("Stormrider Call",3,"play: dmg t 3; draw 1",S("galeriders","burn+buff",["Skyward Ascent","Battery Dump"],{tgt:"e"})));
  add(Re("Skybolt Ward",3,"play: buff t 2 2 tmp",S("galeriders","burn+buff",["Evasive Maneuver","Electrify"],{tgt:"oatk"})));
  add(Au("Stormrider Sanctum",3,"spell: zaps 1 1",S("galeriders","burn+buff",["Aerie","Storm God's Altar"])));
  setR("r");
  add(Cr("Skybolt Lancer",4,6,4,"airborne","attack: buff self 1 0 tmp",S("galeriders","burn+buff+airborne",["Hurricane Elemental","Tempest Archon"])));
  add(Cr("Lightning Hawk",6,9,6,"airborne","static: lord all 1 1",S("galeriders","burn+buff+airborne",["Cloud Leviathan","Static Overlord"])));
  add(Sp("Volt Volley",4,"play: dmg all_e 2",S("galeriders","burn+buff",["Tornado","Thunderous Cascade"])));
  add(Re("Gale Ward",4,"play: buff t 2 2 tmp",S("galeriders","burn+buff",["Perfect Gale","Thunder Trap"],{tgt:"o"})));
  add(Au("Thunderwing Font",6,"start: buff ostr 2 0 tmp",S("galeriders","burn+buff",["Nesting Grounds","Storm Battery"])));

  /* ---- squallline (20) ---- */
  setR("c");
  add(Cr("Stormrider Duelist",1,2,2,"","play: buff self 1 1",S("squallline","haste+buff",["Storm Crow","Volt Hopper"])));
  add(Cr("Howling Reaver",2,3,3,"","attack: buff self 1 0 tmp",S("squallline","haste+buff",["Kestrel Rider","Lightning Courier"])));
  add(Cr("Stormrider Wolf",2,3,3,"","play: kw self haste tmp",S("squallline","haste+buff",["Breeze Messenger","Charge Siphon"])));
  add(Cr("Thunderwing Falcon",3,5,3,"","attack: buff self 1 0 tmp",S("squallline","haste+buff",["Flock Leader","Arc Apprentice"])));
  add(Cr("Whirling Brute",1,2,2,"","play: buff ostr 1 1",S("squallline","haste+buff",["Sparrow Scout","Spark Mite"])));
  add(Sp("Thunderwing Torrent",2,"play: buff t 2 0; kw t haste",S("squallline","haste+buff",["Zephyr Strike","Arc Lash"],{tgt:"o"})));
  add(Sp("Thunderwing Storm",2,"play: buff own 1 1",S("squallline","haste+buff",["Wingbeat","Static Bolt"])));
  add(Re("Stormrider Trap",2,"play: buff t 2 2 tmp",S("squallline","haste+buff",["Crosswind","Surge Shield"],{tgt:"o"})));
  add(Re("Whirling Retort",2,"play: buff t 2 2 tmp",S("squallline","haste+buff",["Sky Strike","Grounding"],{tgt:"o"})));
  add(Au("Stormrider Shrine",2,"start: buff ostr 1 0 tmp",S("squallline","haste+buff",["Wind Chimes","Charged Coil"])));
  setR("u");
  add(Cr("Thunderwing Striker",3,5,3,"","play: kw self haste tmp",S("squallline","haste+buff",["Featherblade Duelist","Pulse Mage"])));
  add(Cr("Lightning Charger",3,5,3,"","creature: buff self 1 0",S("squallline","haste+buff",["Cloudshaper","Thunder Wolf"])));
  add(Cr("Gale Charger",4,6,4,"","static: lord all 1 0",S("squallline","haste+buff",["Storm Roc","Thunder Ram"])));
  add(Sp("Gale Volley",2,"play: buff t 2 0; kw t pierce",S("squallline","haste+buff",["Tempest Volley","Overload Strike"],{tgt:"o"})));
  add(Re("Thunderwing Ward",3,"play: untap t",S("squallline","haste+buff",["Wind Barrier","Shockwave Counter"],{tgt:"o"})));
  add(Au("Squall Banner",3,"static: lord all 1 0",S("squallline","haste+buff",["Eye of Eternity","Infinite Battery"])));
  setR("r");
  add(Cr("Cyclone Wolf",5,8,6,"","play: buff ostr 1 1",S("squallline","haste+buff",["Ancient Wind Spirit","Volt Dragon"])));
  add(Cr("Howling Striker",5,8,6,"","static: lord all 1 1",S("squallline","haste+buff",["Tempest Dragon","Spark Matriarch"])));
  add(Sp("Cyclone Gift",4,"play: buff t 4 0; kw t pierce",S("squallline","haste+buff",["Cyclonic Rift","Ball of Thunder"],{tgt:"o"})));
  add(Re("Stormrider Flash",5,"play: untap t",S("squallline","haste+buff",["Vanishing Wind","Lightning Reflexes"],{tgt:"o"})));
  add(Au("Squall Altar",4,"start: buff ostr 1 1",S("squallline","haste+buff",["Eye of Eternity","Storm Battery"])));

  /* ---- eyeofstorm (20, support) ---- */
  setR("c");
  add(Cr("Cyclone Titan",3,2,5,"skyguard","play: kw ostr barrier",S("eyeofstorm","barrier+bounce+skyguard",["Harrier Hawk","Tempest Runner"])));
  add(Cr("Stormrider Colossus",2,2,3,"skyguard","play: kw t barrier",S("eyeofstorm","barrier+bounce+skyguard",["Tempest Sprite","Volt Runner"],{tgt:"o"})));
  add(Cr("Gale Tortoise",2,2,3,"skyguard","play: kw ostr barrier",S("eyeofstorm","barrier+bounce+skyguard",["Wind Wanderer","Capacitor Golem"])));
  add(Cr("Thunderwing Titan",2,2,3,"barrier","play: kw ostr barrier",S("eyeofstorm","barrier+bounce+barrier",["Windbreak Guardian","Arc Duelist"])));
  add(Cr("Gale Titan",2,2,4,"","play: kw ostr barrier",S("eyeofstorm","barrier+bounce",["Drifting Monk","Bolt Knight"])));
  add(Sp("Squall Call",1,"play: bounce t",S("eyeofstorm","barrier+bounce",["Eye of the Gale","Crackle"],{tgt:"e"})));
  add(Sp("Gale Ritual",2,"play: bounce t; energy 2",S("eyeofstorm","barrier+bounce",["Wingbeat","Spark Surge"],{tgt:"o"})));
  add(Re("Gale Recoil",1,"play: bounce t",S("eyeofstorm","barrier+bounce",["Tailwind","Shock Reflex"],{tgt:"eatk"})));
  add(Au("Squall Shrine",2,"start: buff ostr 1 0 tmp",S("eyeofstorm","barrier+bounce",["Jet Stream","Overload Coil"])));
  setR("u");
  add(Cr("Howling Behemoth",3,2,5,"barrier","play: bounce t",S("eyeofstorm","barrier+bounce+barrier",["Windsong Falcon","Voltage Wraith"],{tgt:"e:cost<=3"})));
  add(Cr("Howling Guardian",5,4,9,"","play: kw ostr barrier",S("eyeofstorm","barrier+bounce",["Thunderhawk","Sparkfire Hydra"])));
  add(Cr("Thunderwing Bulwark",3,3,5,"","ebounce: draw 1",S("eyeofstorm","barrier+bounce",["Sky Pirate","Storm Shaman"])));
  add(Sp("Stormrider Burst",2,"play: bounce t; draw 1",S("eyeofstorm","barrier+bounce",["Wind Shear","Surge of Power"],{tgt:"o"})));
  add(Re("Squall Snap",3,"play: kw t barrier; dmg str 1",S("eyeofstorm","barrier+bounce",["Evasive Maneuver","Grounding"],{tgt:"o"})));
  add(Au("Cyclone Banner",3,"start: buff ostr 1 0 tmp",S("eyeofstorm","barrier+bounce",["Wind Chimes","Storm God's Altar"])));
  setR("r");
  add(Cr("Gale Behemoth",4,3,7,"barrier","play: bounce t",S("eyeofstorm","barrier+bounce+barrier",["Roc Hatchery","Stormbringer"],{tgt:"o"})));
  add(Cr("Whirling Titan",5,4,9,"skyguard","play: bounce t",S("eyeofstorm","barrier+bounce+skyguard",["Tempest Dragon","Charged Juggernaut"],{tgt:"o"})));
  add(Sp("Skybolt Rain",5,"play: kw own barrier",S("eyeofstorm","barrier+bounce",["Aerial Bombardment","Chain of Storms"])));

  /* ---- downburst (15) ---- */
  setR("c");
  add(Cr("Lightning Adept",1,1,2,"airborne","play: bounce t",S("downburst","bounce+burn+airborne",["Swift Courier","Plasma Sprite"],{tgt:"e:cost<=2"})));
  add(Cr("Volt Scout",2,3,3,"","play: dmg t 2",S("downburst","bounce+burn",["Swiftwing Herald","Raiju"],{tgt:"e"})));
  add(Cr("Lightning Familiar",2,3,3,"","play: bounce t",S("downburst","bounce+burn",["Gale Rider","Conduit Keeper"],{tgt:"e:cost<=2"})));
  add(Cr("Volt Adept",3,4,4,"","play: dmg t 3",S("downburst","bounce+burn",["Dust Devil","Voltage Engineer"],{tgt:"e"})));
  add(Sp("Skybolt Storm",1,"play: dmg t 1",S("downburst","bounce+burn",["Cyclone Kick","Chain Lightning"],{tgt:"ea"})));
  add(Re("Cyclone Ward",2,"play: bounce t",S("downburst","bounce+burn",["Sky Strike","Surge Shield"],{tgt:"e:cost<=3"})));
  add(Au("Cyclone Shrine",2,"end: dmg face 1",S("downburst","bounce+burn",["Aerie","Charged Coil"])));
  setR("u");
  add(Cr("Stormrider Imp",4,5,5,"","edie: buff self 1 1",S("downburst","bounce+burn",["Cloud Strider","Ion Drake"])));
  add(Cr("Squall Weaver",3,4,4,"","ebounce: draw 1",S("downburst","bounce+burn",["Gyrfalcon","Voltage Wraith"])));
  add(Sp("Stormrider Gift",3,"play: bounce t",S("downburst","bounce+burn",["Updraft Swarm","Lightning Volley"],{tgt:"e"})));
  setR("r");
  add(Cr("Thunderwing Weaver",6,7,8,"airborne","play: dmg all_e 2",S("downburst","bounce+burn+airborne",["Aerie Matriarch","Static Overlord"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.TEMPEST_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["tempest"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
