/* ================= HURRICANE CATALOG (designed confluence cards, generated first draft) =================
   Water + Wind + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   maelstrom (25: bounce + draw), eyewall (20, support: barrier + bounce), downdraft (20: bounce + burn), riptide (20: draw + chain), tempestsurge (15: haste + bounce).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [water, wind, lightning]. */
// Loaded by build.py inside catalogBegin("hurricane")/catalogEnd("hurricane") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.HURRICANE_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"hurricane" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.HURRICANE_CATALOG.push(d); return d; };
  setEl("hurricane");

  /* ---- maelstrom (25) ---- */
  setR("c");
  add(Cr("Whirlpool Adept",1,2,2,"","play: draw 1",S("maelstrom","bounce+draw",["Brook Otter","Gust Sprite","Volt Hopper"])));
  add(Cr("Gale Sentinel",3,4,4,"","death: draw 1",S("maelstrom","bounce+draw",["Winter Mage","Wind Dancer","Arc Apprentice"])));
  add(Cr("Hurricane Spirit",3,4,4,"","play: bounce t",S("maelstrom","bounce+draw",["Whirlpool Mage","Harrier Hawk","Bolt Thrower"],{tgt:"e:cost<=2"})));
  add(Cr("Gale Elemental",1,2,2,"","play: bounce t",S("maelstrom","bounce+draw",["Tide Sprite","Sparrow Scout","Static Sprite"],{tgt:"e:cost<=2"})));
  add(Cr("Storm-surge Familiar",2,3,3,"","play: bounce t",S("maelstrom","bounce+draw",["Kelp Lurker","Zephyr Courier","Volt Runner"],{tgt:"e:cost<=2"})));
  add(Cr("Eyewall Elemental",2,3,3,"","death: draw 1",S("maelstrom","bounce+draw",["Mist Weaver","Whirlwind Acrobat","Capacitor Golem"])));
  add(Sp("Eyewall Torrent",1,"play: draw 1; heal 2",S("maelstrom","bounce+draw",["Ebb and Flow","Tailwind Rush","Charge Conduit"])));
  add(Sp("Whirlpool Gift",1,"play: draw 1; heal 2",S("maelstrom","bounce+draw",["Tidal Insight","Updraft","Quick Study"])));
  add(Sp("Eyewall Gift",1,"play: draw 1; energy 1",S("maelstrom","bounce+draw",["Shatter","Cyclone Kick","Crackle"])));
  add(Re("Storm-surge Riposte",1,"play: bounce t",S("maelstrom","bounce+draw",["Tidal Shield","Sidestep","Shock Reflex"],{tgt:"e:cost<=3"})));
  add(Re("Maelstrom Retort",2,"play: bounce t",S("maelstrom","bounce+draw",["Dispel","Tailwind","Surge Shield"],{tgt:"eatk"})));
  add(Au("Squall Totem",2,"start/hand4: draw 1",S("maelstrom","bounce+draw",["Healing Spring","Sky Temple","Lightning Rod"])));
  add(Au("Hurricane Engine",1,"start/hand4: draw 1",S("maelstrom","bounce+draw",["Sea of Clarity","Sky Temple","Charged Coil"])));
  setR("u");
  add(Cr("Eyewall Scout",4,5,5,"","play: draw 1",S("maelstrom","bounce+draw",["Icewall Colossus","Raptor of the Peaks","Galvanic Sentinel"])));
  add(Cr("Hurricane Familiar",4,5,5,"","play: bounce t",S("maelstrom","bounce+draw",["Siren of the Shoals","Tornado Elemental","Spark Golem"],{tgt:"o"})));
  add(Cr("Squall Golem",5,6,7,"","play: bounce t",S("maelstrom","bounce+draw",["Shoal Leviathan","Thunderhawk","Sparkfire Hydra"],{tgt:"e:cost<=3"})));
  add(Cr("Eyewall Adept",4,5,5,"","play: bounce t",S("maelstrom","bounce+draw",["Abyssal Lurker","Vortex Mage","Lightning Elemental"],{tgt:"e:cost<=3"})));
  add(Sp("Hurricane Volley",3,"play: bounce t; draw 1",S("maelstrom","bounce+draw",["Cold Snap","Gale Barrage","Forked Lightning"],{tgt:"o"})));
  add(Sp("Maelstrom Torrent",2,"play: bounce t; energy 2",S("maelstrom","bounce+draw",["Deep Insight","Wind Shear","Static Burst"],{tgt:"o"})));
  add(Re("Whirlpool Feint",3,"play: draw 1; buff t 0 2 tmp",S("maelstrom","bounce+draw",["Reverse Current","Evasive Maneuver","Shockwave Counter"],{tgt:"o"})));
  add(Au("Gale Beacon",3,"ebounce: draw 1",S("maelstrom","bounce+draw",["Tidal Archive","Jet Stream","Infinite Battery"])));
  setR("r");
  add(Cr("Gale Serpent",5,7,7,"","play: bounce t; draw 1",S("maelstrom","bounce+draw",["Deep One Elder","Tempest Dragon","Static Overlord"],{tgt:"e"})));
  add(Cr("Whirlpool Serpent",5,7,7,"","play: bounce t; draw 1",S("maelstrom","bounce+draw",["Deepsea Hydra","Thunderwing Roc","Spark Matriarch"],{tgt:"e"})));
  add(Cr("Squall Weaver",6,8,8,"","play: bounce t",S("maelstrom","bounce+draw",["Leviathan Elder","Aerie Matriarch","Storm Titan"],{tgt:"e:cost<=2"})));
  add(Sp("Whirlpool Ritual",4,"play: bounce t; energy 2",S("maelstrom","bounce+draw",["Glacial Cataclysm","Squall Line","Overload Cascade"],{tgt:"o"})));
  add(Re("Maelstrom Trap",5,"play: draw 1; buff t 0 2 tmp",S("maelstrom","bounce+draw",["Ice Prison","Perfect Gale","Lightning Reflexes"],{tgt:"o"})));
  add(Au("Storm-surge Beacon",5,"start: buff ostr 1 0 tmp",S("maelstrom","bounce+draw",["Eternal Winter","Sky Throne","Tesla Coil"])));

  /* ---- eyewall (20, support) ---- */
  setR("c");
  add(Cr("Gale Sentry",3,3,5,"","play: kw ostr barrier",S("eyewall","barrier+bounce",["Reef Guardian","Featherfall Hawk","Tesla Knight"])));
  add(Cr("Gale Guardian",1,1,2,"skyguard","play: kw ostr barrier",S("eyewall","barrier+bounce+skyguard",["Frost Sprite","Swift Courier","Spark Mite"])));
  add(Cr("Squall Sentry",2,2,3,"skyguard","play: bounce t",S("eyewall","barrier+bounce+skyguard",["Riverbank Sage","Wind Wanderer","Lightning Courier"],{tgt:"o"})));
  add(Cr("Gale Titan",2,2,4,"","play: kw ostr barrier",S("eyewall","barrier+bounce",["Pearl Diver","Drifting Monk","Flicker Mage"])));
  add(Cr("Hurricane Keeper",2,2,3,"barrier","play: kw ostr barrier",S("eyewall","barrier+bounce+barrier",["Tidepool Healer","Feather Sprite","Conduit Keeper"])));
  add(Sp("Maelstrom Rain",2,"play: kw t barrier; buff t 1 1",S("eyewall","barrier+bounce",["Soothing Rain","Gust of Wind","Arc Lash"],{tgt:"o"})));
  add(Sp("Tidal Rain",2,"play: bounce t; energy 2",S("eyewall","barrier+bounce",["Flowing Wisdom","Wingbeat","Power Surge"],{tgt:"o"})));
  add(Re("Hurricane Ward",1,"play: bounce t",S("eyewall","barrier+bounce",["Undertow","Crosswind","Blitz"],{tgt:"e:cost<=3"})));
  add(Au("Whirlpool Sanctum",1,"start: kw ostr barrier",S("eyewall","barrier+bounce",["Tidal Mastery","Sky Temple","Charged Coil"])));
  setR("u");
  add(Cr("Tidal Warden",4,3,6,"barrier","play: bounce t",S("eyewall","barrier+bounce+barrier",["Pearl Sovereign","Gust Knight","Tempest Archon"],{tgt:"e:cost<=2"})));
  add(Cr("Hurricane Colossus",3,2,5,"skyguard","creature: kw self barrier",S("eyewall","barrier+bounce+skyguard",["Mistborn Assassin","Sky Pirate","Voltage Engineer"])));
  add(Cr("Maelstrom Guardian",3,3,5,"","play: bounce t",S("eyewall","barrier+bounce",["Kraken Spawn","Gyrfalcon","Pulse Mage"],{tgt:"e:cost<=3"})));
  add(Sp("Storm-surge Torrent",3,"play: bounce t; draw 1",S("eyewall","barrier+bounce",["Crashing Wave","Tornado","Thunderous Cascade"],{tgt:"o"})));
  add(Sp("Gale Burst",3,"play: kw own barrier",S("eyewall","barrier+bounce",["Frozen Tomb","Skyward Ascent","Battery Dump"])));
  add(Re("Maelstrom Feint",3,"play: bounce t",S("eyewall","barrier+bounce",["Whiplash Tide","Vanishing Wind","Grounding"],{tgt:"e:cost<=3"})));
  add(Au("Hurricane Field",3,"ebounce: dmg face 1",S("eyewall","barrier+bounce",["Ocean's Blessing","Eye of Eternity","Storm Battery"])));
  setR("r");
  add(Cr("Typhoon Titan",6,5,10,"skyguard barrier","play: bounce t",S("eyewall","barrier+bounce+skyguard",["Frost Giant","Cloud Titan","Volt Dragon"],{tgt:"e:cost<=2"})));
  add(Cr("Eyewall Bulwark",6,5,10,"barrier","play: bounce t",S("eyewall","barrier+bounce+barrier",["Coral Titan","Cloud Titan","Storm Titan"],{tgt:"o"})));
  add(Sp("Storm-surge Rain",4,"play: bounce t",S("eyewall","barrier+bounce",["Glacial Cataclysm","Squall Line","Ion Storm"],{tgt:"e"})));
  add(Re("Cyclonic Guard",4,"play: bounce t",S("eyewall","barrier+bounce",["Frozen Moment","Vanishing Wind","Thunder Trap"],{tgt:"eatk"})));
  add(Au("Hurricane Totem",6,"start: bounce weak",S("eyewall","barrier+bounce",["Eternal Winter","Nesting Grounds","Storm God's Altar"])));

  /* ---- downdraft (20) ---- */
  setR("c");
  add(Cr("Hurricane Wolf",2,3,3,"","play: bounce t",S("downdraft","bounce+burn",["Rime Watcher","Kestrel Rider","Charge Siphon"],{tgt:"o"})));
  add(Cr("Squall Hawk",1,2,1,"airborne","play: bounce t",S("downdraft","bounce+burn+airborne",["Coral Crab","Storm Crow","Thunder Imp"],{tgt:"e:cost<=2"})));
  add(Cr("Cyclonic Charger",2,3,2,"airborne","play: dmg face 1",S("downdraft","bounce+burn+airborne",["Bubble Mage","Skyward Scout","Bolt Knight"])));
  add(Cr("Eyewall Raider",2,3,2,"airborne","attack: dmg face 1",S("downdraft","bounce+burn+airborne",["Riptide Rogue","Breeze Messenger","Raiju"])));
  add(Cr("Whirlpool Hound",3,4,3,"airborne","play: dmg t 3",S("downdraft","bounce+burn+airborne",["Tide Caller","Cloud Hawk","Voltage Hound"],{tgt:"e"})));
  add(Sp("Storm-surge Storm",2,"play: dmg t 2",S("downdraft","bounce+burn",["Riptide Reversal","Recall Gust","Zap"],{tgt:"ea"})));
  add(Sp("Cyclonic Torrent",2,"play: dmg t 2",S("downdraft","bounce+burn",["Flowing Wisdom","Zephyr Strike","Jolt"],{tgt:"ea"})));
  add(Re("Eyewall Trap",1,"play: dmg t 2",S("downdraft","bounce+burn",["Deflect","Sky Strike","Blitz"],{tgt:"eatk"})));
  add(Re("Storm-surge Snap",2,"play: bounce t",S("downdraft","bounce+burn",["Chill","Crosswind","Surge Shield"],{tgt:"eatk"})));
  add(Au("Maelstrom Totem",2,"end: dmg face 1",S("downdraft","bounce+burn",["Permafrost Shrine","Jet Stream","Overload Coil"])));
  add(Au("Gale Font",2,"end: dmg face 1",S("downdraft","bounce+burn",["Tidal Mastery","Wind Chimes","Lightning Rod"])));
  setR("u");
  add(Cr("Cyclonic Wolf",3,5,3,"","edie: buff self 1 1",S("downdraft","bounce+burn",["Deep Oracle","Featherblade Duelist","Thunder Wolf"])));
  add(Cr("Squall Lancer",4,5,4,"airborne","edie: buff self 1 1",S("downdraft","bounce+burn+airborne",["Coral Hydra","Roc Hatchery","Ion Drake"])));
  add(Cr("Squall Hound",4,5,4,"airborne","play: bounce t",S("downdraft","bounce+burn+airborne",["Siren of the Shoals","Hurricane Elemental","Galvanic Golem"],{tgt:"o"})));
  add(Sp("Hurricane Wave",3,"play: bounce t; energy 2",S("downdraft","bounce+burn",["Great Ebb","Tempest Volley","Surge of Power"],{tgt:"o"})));
  add(Re("Tidal Reflex",3,"play: bounce t",S("downdraft","bounce+burn",["Counterflow","Wind Barrier","Shockwave Counter"],{tgt:"eatk"})));
  add(Au("Eyewall Sanctum",3,"ebounce: dmg face 1",S("downdraft","bounce+burn",["Ocean's Blessing","Aerie","Infinite Battery"])));
  setR("r");
  add(Cr("Squall Reaver",5,8,5,"airborne","attack: dmg face 1",S("downdraft","bounce+burn+airborne",["Deepsea Hydra","Ancient Wind Spirit","Charged Juggernaut"])));
  add(Cr("Whirlpool Striker",5,8,5,"airborne","play: bounce t",S("downdraft","bounce+burn+airborne",["Siren Queen","Thunderwing Roc","Conduit Colossus"],{tgt:"e:cost<=2"})));
  add(Sp("Cyclonic Volley",4,"play: bounce t",S("downdraft","bounce+burn",["Glacial Torrent","Aerial Bombardment","Chain of Storms"],{tgt:"e"})));
  add(Re("Typhoon Trap",4,"play: dmg t 4",S("downdraft","bounce+burn",["Reverse Current","Perfect Gale","Thunder Trap"],{tgt:"ea"})));
  add(Au("Typhoon Totem",4,"start: buff ostr 1 0 tmp",S("downdraft","bounce+burn",["Eternal Winter","Eye of Eternity","Storm Battery"])));

  /* ---- riptide (20) ---- */
  setR("c");
  add(Cr("Cyclonic Weaver",3,4,4,"","play: dmg t 1 | chain2: dmg t 1",S("riptide","draw+chain",["Frostbite Shade","Sky Courier","Storm Caller"],{tgt:"ea"})));
  add(Cr("Gale Weaver",2,3,3,"","play/chain2: buff self 1 1",S("riptide","draw+chain",["Tidecaller Shaman","Tempest Sprite","Arc Duelist"])));
  add(Cr("Typhoon Weaver",2,3,3,"","play: dmg t 1 | chain2: dmg t 1",S("riptide","draw+chain",["Glacier Wolf","Windbreak Guardian","Flicker Mage"],{tgt:"ea"})));
  add(Cr("Maelstrom Adept",2,3,3,"","death: draw 1",S("riptide","draw+chain",["Coral Warden","Gale Rider","Volt Runner"])));
  add(Cr("Cyclonic Serpent",3,4,4,"","play/chain2: buff self 1 1",S("riptide","draw+chain",["Narwhal Lancer","Flock Leader","Storm Shaman"])));
  add(Sp("Maelstrom Rite",1,"play: draw 1; energy 1",S("riptide","draw+chain",["Ebb and Flow","Eye of the Gale","Overclock"])));
  add(Sp("Cyclonic Rite",2,"play: draw 1; energy 1",S("riptide","draw+chain",["Tidal Insight","Wind Walk","Thunder Lance"])));
  add(Re("Gale Flash",2,"play: dmg t 2 | chain2: draw 1",S("riptide","draw+chain",["Icy Grip","Evasive Maneuver","Electrify"],{tgt:"eatk"})));
  add(Re("Gale Snap",2,"play: draw 1; buff t 0 2 tmp",S("riptide","draw+chain",["Riptide Counter","Sidestep","Surge Shield"],{tgt:"o"})));
  add(Au("Cyclonic Field",2,"end: draw 1",S("riptide","draw+chain",["Sea of Clarity","Jet Stream","Overload Coil"])));
  setR("u");
  add(Cr("Cyclonic Scout",5,6,7,"","play: dmg t 1 | chain2: dmg t 1",S("riptide","draw+chain",["Frost Giant","Cloud Leviathan","Conduit Colossus"],{tgt:"ea"})));
  add(Cr("Cyclonic Caller",3,4,4,"","chain2: draw 1",S("riptide","draw+chain",["Tideborn Knight","Mistral Sage","Voltage Wraith"])));
  add(Cr("Eyewall Familiar",4,5,5,"","spell: buff self 1 1",S("riptide","draw+chain",["Deepwater Scholar","Raptor of the Peaks","Capacitor Titan"])));
  add(Sp("Typhoon Volley",3,"play: draw 2",S("riptide","draw+chain",["Healing Torrent","Updraft Swarm","Forked Lightning"])));
  add(Re("Whirlpool Riposte",2,"play: dmg t 2 | chain2: draw 1",S("riptide","draw+chain",["Sudden Current","Evasive Maneuver","Lightning Reflexes"],{tgt:"eatk"})));
  add(Au("Whirlpool Font",2,"draw: heal 1",S("riptide","draw+chain",["Tidal Mastery","Jet Stream","Overload Coil"])));
  setR("r");
  add(Cr("Maelstrom Serpent",4,5,6,"","play: draw 1",S("riptide","draw+chain",["Frostfang Wyrm","Zephyr Archon","Thunderhead Golem"])));
  add(Cr("Storm-surge Golem",4,5,6,"","play: dmg t 1 | chain2: dmg t 1",S("riptide","draw+chain",["Tidal Archmage","Lord of the Skies","Stormbringer"],{tgt:"ea"})));
  add(Sp("Squall Ritual",5,"play: draw 2; heal 2",S("riptide","draw+chain",["Glacial Torrent","Cyclonic Rift","Overload Cascade"])));

  /* ---- tempestsurge (15) ---- */
  setR("c");
  add(Cr("Gale Duelist",1,2,1,"haste","play: kw self haste tmp",S("tempestsurge","haste+bounce+haste",["Tide Sprite","Gust Sprite","Plasma Sprite"])));
  add(Cr("Squall Brute",2,3,2,"haste","play: kw self haste tmp",S("tempestsurge","haste+bounce+haste",["Pearl Diver","Cirrus Dancer","Lightning Courier"])));
  add(Cr("Squall Charger",3,4,3,"haste","play: kw self haste tmp",S("tempestsurge","haste+bounce+haste",["Shiver Elemental","Gale Sage","Arc Apprentice"])));
  add(Cr("Typhoon Reaver",1,2,2,"","play: kw self haste tmp",S("tempestsurge","haste+bounce",["Brook Otter","Swift Courier","Volt Hopper"])));
  add(Sp("Maelstrom Gift",1,"play: bounce t",S("tempestsurge","haste+bounce",["Whirlpool Trap","Tailwind Rush","Lightning Bolt"],{tgt:"e"})));
  add(Re("Storm-surge Trap",2,"play: bounce t",S("tempestsurge","haste+bounce",["Frost Snap","Tailwind","Shock Reflex"],{tgt:"eatk"})));
  add(Au("Eyewall Grove",2,"start: buff ostr 1 0 tmp",S("tempestsurge","haste+bounce",["Healing Spring","Wind Chimes","Lightning Rod"])));
  setR("u");
  add(Cr("Maelstrom Brute",4,6,4,"","creature: kw self haste tmp",S("tempestsurge","haste+bounce",["Harbor Golem","Mistral Phoenix","Lightning Hydra"])));
  add(Cr("Gale Hound",3,5,3,"","play: bounce t",S("tempestsurge","haste+bounce",["Wave Dancer","Squall Captain","Tempest Runner"],{tgt:"e:cost<=2"})));
  add(Sp("Tidal Torrent",3,"play: bounce t; draw 1",S("tempestsurge","haste+bounce",["Riptide Reversal","Gale Barrage","Lightning Volley"],{tgt:"o"})));
  setR("r");
  add(Cr("Storm-surge Reaver",6,7,6,"haste","play: kw self haste tmp",S("tempestsurge","haste+bounce+haste",["Deep One Elder","Aerie Matriarch","Charged Juggernaut"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.HURRICANE_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["hurricane"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
