/* ================= MIRAGE CATALOG (designed confluence cards, generated first draft) =================
   Fire + Water + Wind. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   illusions (25: mirror + draw), phantasm (20: tokens + mirror), haze (20: bounce + draw), heatshimmer (20: freeze + burn), fatamorgana (15, support: mirror + shrink).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [fire, water, wind]. */
// Loaded by build.py inside catalogBegin("mirage")/catalogEnd("mirage") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.MIRAGE_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"mirage" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.MIRAGE_CATALOG.push(d); return d; };
  setEl("mirage");

  /* ---- illusions (25) ---- */
  setR("c");
  add(Cr("Dreaming Scout",2,2,3,"ward","play: draw 1",S("illusions","mirror+draw+ward",["Reckless Raider","Tidepool Healer","Zephyr Courier"])));
  add(Cr("Glimmer Elemental",1,1,2,"ward","death: summon mirror 1",S("illusions","mirror+draw+ward",["Ember Whelp","Brook Otter","Gust Sprite"])));
  add(Cr("Twin Serpent",2,2,3,"ward","play: draw 1",S("illusions","mirror+draw+ward",["Sparkfire Kit","Rime Watcher","Wind Wanderer"])));
  add(Cr("Veiled Elemental",2,2,3,"ward","death: draw 1",S("illusions","mirror+draw+ward",["Smokescreen Imp","Riverbank Sage","Tempest Sprite"])));
  add(Cr("Twin Adept",1,2,2,"","play: summon mirror 1",S("illusions","mirror+draw",["Molten Hatchling","Tide Sprite","Swift Courier"])));
  add(Cr("Shimmering Weaver",1,1,2,"ward","death: draw 1",S("illusions","mirror+draw+ward",["Ember Imp","Frost Sprite","Sparrow Scout"])));
  add(Sp("Phantom Volley",1,"play: draw 1; heal 2",S("illusions","mirror+draw",["Searing Spark","Ebb and Flow","Tailwind Rush"])));
  add(Sp("Veiled Wave",1,"play: summon mirror 1",S("illusions","mirror+draw",["Stoke the Coals","Soothing Rain","Updraft"])));
  add(Sp("Shimmering Call",2,"play: summon mirror 1",S("illusions","mirror+draw",["Call the Embers","Tidal Insight","Wingbeat"])));
  add(Re("Mirage Riposte",2,"play: summon mirror 1; buff tok 1 0 tmp",S("illusions","mirror+draw",["Backdraft","Dispel","Sidestep"])));
  add(Re("Illusory Feint",2,"play: draw 1",S("illusions","mirror+draw",["Wildfire Ignition","Icy Grip","Tailwind"])));
  add(Au("Haze Shrine",1,"start/hand4: draw 1",S("illusions","mirror+draw",["Kindling Hearth","Tidal Mastery","Sky Temple"])));
  add(Au("Fata Field",2,"start: summon mirror 1",S("illusions","mirror+draw",["Smoldering Tome","Sea of Clarity","Jet Stream"])));
  setR("u");
  add(Cr("Veiled Shaman",4,4,5,"ward","play: draw 1",S("illusions","mirror+draw+ward",["Cinderstorm Mage","Icewall Colossus","Raptor of the Peaks"])));
  add(Cr("Haze Caller",2,3,3,"","death: summon mirror 1",S("illusions","mirror+draw",["Firebrand Zealot","Riptide Rogue","Wind Wraith"])));
  add(Cr("Dreaming Shaman",4,4,5,"ward","death: draw 1",S("illusions","mirror+draw+ward",["Emberlord Captain","Siren of the Shoals","Tornado Elemental"])));
  add(Cr("Mirage Adept",4,5,5,"","play: silence t",S("illusions","mirror+draw",["Inferno Charger","Coral Hydra","Vortex Mage"],{tgt:"e"})));
  add(Sp("Fata Rite",2,"play: draw 1; energy 1",S("illusions","mirror+draw",["Fury Unleashed","Deep Insight","Wind Shear"])));
  add(Sp("Haze Volley",3,"play: summon mirror 1",S("illusions","mirror+draw",["Firestorm Ritual","Great Ebb","Gale Barrage"])));
  add(Re("Twin Snap",3,"play: draw 1; buff t 0 2 tmp",S("illusions","mirror+draw",["Inferno Surge","Reverse Current","Evasive Maneuver"],{tgt:"o"})));
  add(Au("Haze Field",3,"start: summon mirror 1",S("illusions","mirror+draw",["Everburning Brazier","Healing Spring","Eye of Eternity"])));
  setR("r");
  add(Cr("Haze Shaman",5,6,7,"ward","start: draw 1",S("illusions","mirror+draw+ward",["Pyrelord Vexis","Leviathan Elder","Thunderwing Roc"])));
  add(Cr("Phantom Adept",6,7,8,"ward","start: draw 1",S("illusions","mirror+draw+ward",["Ignis, the Undying","Deepsea Hydra","Aerie Matriarch"])));
  add(Cr("Shimmering Elemental",6,7,8,"ward","play: copy ostr 1",S("illusions","mirror+draw+ward",["Searing Overlord","Deep One Elder","Cloud Titan"])));
  add(Sp("Veiled Ritual",4,"play: draw 2",S("illusions","mirror+draw",["Wildfire Blaze","Glacial Cataclysm","Squall Line"])));
  add(Re("Shimmering Snap",4,"play: summon mirror 1; buff tok 1 0 tmp",S("illusions","mirror+draw",["Pyroclasm Reflex","Ice Prison","Vanishing Wind"])));
  add(Au("Dreaming Sanctum",5,"start/hand4: draw 1",S("illusions","mirror+draw",["Hearth of Embers","Eternal Winter","Sky Throne"])));

  /* ---- phantasm (20) ---- */
  setR("c");
  add(Cr("Veiled Sentinel",2,3,3,"","play: summon mirror 1",S("phantasm","tokens+mirror",["Torchbearer","Kelp Lurker","Kestrel Rider"])));
  add(Cr("Fata Adept",2,3,3,"","death: summon mirror 1",S("phantasm","tokens+mirror",["Cinder Hound","Pearl Diver","Feather Sprite"])));
  add(Cr("Twin Shaman",2,3,3,"","death: summon mirror 1",S("phantasm","tokens+mirror",["Brimstone Guard","Mist Weaver","Breeze Messenger"])));
  add(Cr("Twin Spirit",3,4,4,"","death: summon mirror 1",S("phantasm","tokens+mirror",["Lava Hound","Tide Caller","Harrier Hawk"])));
  add(Cr("Mirage Imp",3,4,4,"","play: summon mirror 1",S("phantasm","tokens+mirror",["Pyre Dancer","Frostbite Shade","Featherfall Hawk"])));
  add(Sp("Fata Rain",1,"play: silence t; draw 1",S("phantasm","tokens+mirror",["Blazing Command","Flowing Wisdom","Cyclone Kick"],{tgt:"e"})));
  add(Sp("Fata Gift",2,"play: silence t; draw 1",S("phantasm","tokens+mirror",["Flame Lash","Shatter","Recall Gust"],{tgt:"e"})));
  add(Re("Veiled Trap",3,"play: summon mirror 1",S("phantasm","tokens+mirror",["Heat Surge","Chill","Crosswind"])));
  add(Re("Glimmer Recoil",2,"play: summon mirror 1",S("phantasm","tokens+mirror",["Flash Fire","Frost Snap","Perfect Gale"])));
  add(Au("Haze Beacon",1,"start: summon mirror 1",S("phantasm","tokens+mirror",["Furnace of Rage","Tidal Archive","Sky Temple"])));
  add(Au("Veiled Field",2,"start: summon mirror 1",S("phantasm","tokens+mirror",["Smoldering Tome","Permafrost Shrine","Jet Stream"])));
  setR("u");
  add(Cr("Veiled Imp",4,5,5,"","play: silence t",S("phantasm","tokens+mirror",["Living Wildfire","Pearl Sovereign","Gust Knight"],{tgt:"e"})));
  add(Cr("Phantom Serpent",4,5,5,"","play: summon mirror 1",S("phantasm","tokens+mirror",["Cinder Swarm","Abyssal Lurker","Mistral Phoenix"])));
  add(Cr("Phantom Imp",4,5,5,"","play: summon mirror 1",S("phantasm","tokens+mirror",["Firebrand Knight","Leviathan Calf","Hurricane Elemental"])));
  add(Sp("Haze Rite",3,"play: summon mirror 1",S("phantasm","tokens+mirror",["Fireball","Cold Snap","Updraft Swarm"])));
  add(Sp("Shimmering Rain",3,"play: silence t; draw 1",S("phantasm","tokens+mirror",["Dragonfire","Riptide Reversal","Aerial Bombardment"],{tgt:"e"})));
  add(Re("Phantom Guard",3,"play: summon mirror 1",S("phantasm","tokens+mirror",["Wild Surge","Absolute Zero","Evasive Maneuver"])));
  add(Au("Glimmer Shrine",2,"start: summon mirror 1",S("phantasm","tokens+mirror",["Crown of Cinders","Sea of Clarity","Jet Stream"])));
  setR("r");
  add(Cr("Fata Familiar",5,7,7,"","death: summon mirror 1",S("phantasm","tokens+mirror",["Blazewing Matriarch","Frost Giant","Tempest Dragon"])));
  add(Cr("Glimmer Caller",6,8,8,"","death: summon mirror 3",S("phantasm","tokens+mirror",["Flame Tyrant","Shoal Leviathan","Cloud Leviathan"])));
  add(Sp("Illusory Torrent",6,"play: summon mirror 3",S("phantasm","tokens+mirror",["Wildfire Blaze","Glacial Torrent","Squall Line"])));
  add(Re("Glimmer Retort",5,"play: summon mirror 1; buff tok 1 0 tmp",S("phantasm","tokens+mirror",["Pyroclasm Reflex","Frozen Moment","Perfect Gale"])));
  add(Au("Mirage Banner",4,"end: summon mirror 1",S("phantasm","tokens+mirror",["Altar of Embers","Eternal Winter","Eye of Eternity"])));

  /* ---- haze (20) ---- */
  setR("c");
  add(Cr("Phantom Sentinel",1,1,2,"ward","play: bounce t",S("haze","bounce+draw+ward",["Ember Imp","Coral Crab","Drifting Monk"],{tgt:"e:cost<=2"})));
  add(Cr("Shimmering Adept",3,4,4,"","play: bounce t",S("haze","bounce+draw",["Ember Scholar","Whirlpool Mage","Flock Leader"],{tgt:"e:cost<=2"})));
  add(Cr("Shimmering Familiar",2,2,3,"ward","play: bounce t",S("haze","bounce+draw+ward",["Apprentice Pyromancer","Tidecaller Shaman","Whirlwind Acrobat"],{tgt:"o"})));
  add(Cr("Veiled Caller",2,3,3,"","play: draw 1",S("haze","bounce+draw",["Ashen Brawler","Coral Warden","Skyward Scout"])));
  add(Cr("Mirage Caller",3,4,4,"","play: draw 1",S("haze","bounce+draw",["Flame Herald","Winter Mage","Wind Dancer"])));
  add(Sp("Fata Ritual",2,"play: bounce t",S("haze","bounce+draw",["Blaze of Insight","Frozen Tomb","Gust of Wind"],{tgt:"e"})));
  add(Sp("Phantom Gift",2,"play: bounce t",S("haze","bounce+draw",["Combust","Crashing Wave","Zephyr Strike"],{tgt:"e"})));
  add(Re("Shimmering Retort",2,"play: bounce t",S("haze","bounce+draw",["Backdraft","Riptide Counter","Sky Strike"],{tgt:"eatk"})));
  add(Re("Shimmering Guard",1,"play: bounce t",S("haze","bounce+draw",["Ember Shield","Deflect","Crosswind"],{tgt:"eatk"})));
  add(Au("Glimmer Banner",3,"start: buff ostr 1 0 tmp",S("haze","bounce+draw",["Everburning Brazier","Healing Spring","Wind Chimes"])));
  setR("u");
  add(Cr("Twin Scout",4,5,5,"","play: bounce t",S("haze","bounce+draw",["Inferno Champion","Harbor Golem","Skyline Falcon"],{tgt:"o"})));
  add(Cr("Glimmer Familiar",4,5,5,"","spell: draw 1",S("haze","bounce+draw",["Ashwing Harrier","Deepwater Scholar","Feathered Serpent"])));
  add(Cr("Fata Serpent",4,4,5,"ward","play: bounce t",S("haze","bounce+draw+ward",["Solar Flare Drake","Wavebreaker Champion","Zephyr Archon"],{tgt:"e:cost<=2"})));
  add(Sp("Fata Torrent",2,"play: bounce t; draw 1",S("haze","bounce+draw",["Combustion Wave","Healing Torrent","Wind Walk"],{tgt:"o"})));
  add(Re("Phantom Riposte",3,"play: draw 2",S("haze","bounce+draw",["Inferno Surge","Nullify","Wind Barrier"])));
  add(Au("Shimmering Totem",2,"draw: heal 1",S("haze","bounce+draw",["Furnace of Rage","Tidal Mastery","Jet Stream"])));
  setR("r");
  add(Cr("Glimmer Adept",5,6,7,"ward","play: bounce t; draw 1",S("haze","bounce+draw+ward",["Lavaheart Titan","Leviathan Elder","Ancient Wind Spirit"],{tgt:"e"})));
  add(Cr("Veiled Adept",6,7,8,"ward","play: bounce t; draw 1",S("haze","bounce+draw+ward",["Magma Behemoth","Coral Titan","Aerie Matriarch"],{tgt:"e"})));
  add(Sp("Illusory Gift",5,"play: bounce t",S("haze","bounce+draw",["Chain of Flame","Glacial Cataclysm","Tornado"],{tgt:"e"})));
  add(Re("Glimmer Feint",4,"play: bounce t",S("haze","bounce+draw",["Pyroclasm Reflex","Reverse Current","Vanishing Wind"],{tgt:"e:cost<=3"})));
  add(Au("Twin Engine",4,"start/hand4: draw 1",S("haze","bounce+draw",["Altar of Embers","Ocean's Blessing","Aerie"])));

  /* ---- heatshimmer (20) ---- */
  setR("c");
  add(Cr("Dreaming Striker",3,5,3,"","play: freeze t; dmg t 1",S("heatshimmer","freeze+burn",["Bonfire Keeper","Bubble Mage","Cloud Hawk"],{tgt:"e"})));
  add(Cr("Haze Lancer",1,2,1,"airborne","play: dmg t 1",S("heatshimmer","freeze+burn+airborne",["Ember Whelp","Brook Otter","Storm Crow"],{tgt:"e"})));
  add(Cr("Mirage Reaver",3,5,3,"","play: freeze t",S("heatshimmer","freeze+burn",["Flamecaller Adept","Reef Guardian","Dust Devil"],{tgt:"e"})));
  add(Cr("Twin Lancer",2,3,3,"","attack: freeze str",S("heatshimmer","freeze+burn",["Phoenix Chick","Glacier Wolf","Windbreak Guardian"])));
  add(Cr("Twin Duelist",1,2,1,"airborne","death: dmg all_e 1",S("heatshimmer","freeze+burn+airborne",["Pyre Zealot","Coral Crab","Gust Sprite"])));
  add(Sp("Glimmer Call",1,"play: dmg all_e 1",S("heatshimmer","freeze+burn",["Searing Spark","Ebb and Flow","Updraft"])));
  add(Sp("Phantom Blast",1,"play: freeze t; dmg t 1",S("heatshimmer","freeze+burn",["Searing Blast","Whirlpool Trap","Eye of the Gale"],{tgt:"e"})));
  add(Re("Illusory Snap",1,"play: dmg t 1",S("heatshimmer","freeze+burn",["Wildfire Ignition","Undertow","Sidestep"],{tgt:"ea"})));
  add(Au("Mirage Grove",3,"end: dmg face 1",S("heatshimmer","freeze+burn",["Crown of Cinders","Permafrost Shrine","Wind Chimes"])));
  setR("u");
  add(Cr("Shimmering Duelist",4,6,4,"","play: dmg face 1",S("heatshimmer","freeze+burn",["Magma Golem","Sea Serpent","Cloud Strider"])));
  add(Cr("Veiled Wolf",3,4,3,"airborne","play: freeze t; dmg t 1",S("heatshimmer","freeze+burn+airborne",["Ignited Lancer","Tideborn Knight","Cloudshaper"],{tgt:"e"})));
  add(Cr("Shimmering Hawk",3,4,3,"airborne","attack: freeze str",S("heatshimmer","freeze+burn+airborne",["Hellforge Smith","Mistborn Assassin","Featherblade Duelist"])));
  add(Sp("Illusory Wave",2,"play: freeze t; dmg t 2",S("heatshimmer","freeze+burn",["Raging Inferno","Tidal Scroll","Skyward Ascent"],{tgt:"e"})));
  add(Re("Phantom Trap",3,"play: freeze t; dmg t 1",S("heatshimmer","freeze+burn",["Backdraft","Sudden Current","Wind Barrier"],{tgt:"eatk"})));
  add(Au("Twin Totem",3,"end: dmg face 1",S("heatshimmer","freeze+burn",["Everburning Brazier","Tidal Archive","Aerie"])));
  setR("r");
  add(Cr("Shimmering Charger",5,8,5,"airborne","play: dmg t 3",S("heatshimmer","freeze+burn+airborne",["Magmaforge Golem","Deepsea Hydra","Thunderhawk"],{tgt:"e"})));
  add(Cr("Fata Wolf",5,8,6,"","attack: freeze str",S("heatshimmer","freeze+burn",["Volcanic Brute","Frostfang Wyrm","Roc Hatchery"])));
  add(Sp("Veiled Gift",4,"play: freeze t; draw 1",S("heatshimmer","freeze+burn",["Dragonfire","Glacial Cataclysm","Cyclonic Rift"],{tgt:"e"})));

  /* ---- fatamorgana (15, support) ---- */
  setR("c");
  add(Cr("Haze Watcher",3,3,5,"","attack: buff str -1 0",S("fatamorgana","mirror+shrink",["Sun Priestess","Narwhal Lancer","Sky Courier"])));
  add(Cr("Shimmering Wall",2,2,4,"","play: summon mirror 1",S("fatamorgana","mirror+shrink",["Ember Duelist","Riverbank Sage","Zephyr Courier"])));
  add(Cr("Veiled Colossus",3,3,5,"","play: summon mirror 1",S("fatamorgana","mirror+shrink",["Flame Herald","Wavecrest Mage","Gale Sage"])));
  add(Cr("Dreaming Giant",2,2,4,"","attack: buff str -1 0",S("fatamorgana","mirror+shrink",["Blazing Martyr","Mist Weaver","Swiftwing Herald"])));
  add(Sp("Illusory Storm",2,"play: summon mirror 1",S("fatamorgana","mirror+shrink",["Firebolt","Tidal Insight","Tempest Volley"])));
  add(Re("Twin Riposte",2,"play: buff t -2 0",S("fatamorgana","mirror+shrink",["Heat Surge","Chill","Tailwind"],{tgt:"eatk"})));
  add(Au("Shimmering Beacon",1,"start: summon mirror 1",S("fatamorgana","mirror+shrink",["Kindling Hearth","Sea of Clarity","Sky Temple"])));
  setR("u");
  add(Cr("Fata Behemoth",3,3,5,"","death: summon mirror 1",S("fatamorgana","mirror+shrink",["Flame Warden","Deep Oracle","Windsong Falcon"])));
  add(Cr("Illusory Behemoth",3,3,5,"","attack: buff str -1 0",S("fatamorgana","mirror+shrink",["Scorchclaw Ravager","Hydromancer","Gyrfalcon"])));
  add(Sp("Phantom Burst",2,"play: buff t -1 0",S("fatamorgana","mirror+shrink",["Pyre Ascension","Riptide Reversal","Winds of Change"],{tgt:"e"})));
  setR("r");
  add(Cr("Phantom Bulwark",5,5,9,"","play: buff all_e -1 -1",S("fatamorgana","mirror+shrink",["Flamewing Dragon","Deep One Elder","Thunderwing Roc"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.MIRAGE_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["mirage"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
