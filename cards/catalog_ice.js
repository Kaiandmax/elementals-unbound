/* ================= ICE CATALOG (designed confluence cards, generated first draft) =================
   Water + Wind. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   shatter (25: freeze + shatter), rimewings (20: freeze + burn), snowdrift (20: bounce + freeze), hoarfrost (20: freeze + burn), squall (15, support: freeze + draw).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [water, wind]. */
// Loaded by build.py inside catalogBegin("ice")/catalogEnd("ice") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.ICE_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"ice" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.ICE_CATALOG.push(d); return d; };
  setEl("ice");

  /* ---- shatter (25) ---- */
  setR("c");
  add(Cr("Icebound Spirit",1,2,2,"","attack: freeze str",S("shatter","freeze+shatter",["Frost Sprite","Sparrow Scout"])));
  add(Cr("Rime Weaver",1,2,2,"","play: dmg frz_e 2",S("shatter","freeze+shatter",["Brook Otter","Swift Courier"])));
  add(Cr("Glacial Familiar",1,2,2,"","play: freeze t",S("shatter","freeze+shatter",["Tide Sprite","Gust Sprite"],{tgt:"e"})));
  add(Cr("Snowdrift Elemental",2,3,3,"","play: freeze t; dmg t 1",S("shatter","freeze+shatter",["Tidepool Healer","Wind Wanderer"],{tgt:"e"})));
  add(Cr("Sleet Adept",3,4,4,"","attack: dmg frz_e 2",S("shatter","freeze+shatter",["Bubble Mage","Flock Leader"])));
  add(Cr("Sleet Familiar",2,3,3,"","play: freeze t",S("shatter","freeze+shatter",["Pearl Diver","Zephyr Courier"],{tgt:"e"})));
  add(Sp("Rime Volley",1,"play: freeze t; draw 1",S("shatter","freeze+shatter",["Ebb and Flow","Updraft"],{tgt:"e"})));
  add(Sp("Snowdrift Ritual",2,"play: freeze t; dmg t 2",S("shatter","freeze+shatter",["Flowing Wisdom","Recall Gust"],{tgt:"e"})));
  add(Sp("Glacial Rain",2,"play: freeze all_e",S("shatter","freeze+shatter",["Tidal Insight","Gust of Wind"])));
  add(Re("Sleet Retort",1,"play: freeze t; dmg t 1",S("shatter","freeze+shatter",["Tidal Shield","Crosswind"],{tgt:"eatk"})));
  add(Re("Snowdrift Snap",2,"play: dmg t 2",S("shatter","freeze+shatter",["Dispel","Evasive Maneuver"],{tgt:"e:frozen"})));
  add(Au("Glacial Banner",2,"start: freeze str",S("shatter","freeze+shatter",["Tidal Mastery","Jet Stream"])));
  add(Au("Snowdrift Font",2,"start: freeze str",S("shatter","freeze+shatter",["Permafrost Shrine","Sky Temple"])));
  setR("u");
  add(Cr("Sleet Weaver",3,4,4,"","attack: dmg frz_e 2",S("shatter","freeze+shatter",["Tideborn Knight","Mistral Sage"])));
  add(Cr("Frozen Scout",4,5,5,"","freeze: zaps 1 1",S("shatter","freeze+shatter",["Icewall Colossus","Gust Knight"])));
  add(Cr("Hoarfrost Scout",4,5,5,"","play: dmg frz_e 2",S("shatter","freeze+shatter",["Siren of the Shoals","Raptor of the Peaks"])));
  add(Cr("Glacial Sentinel",4,5,5,"","play: freeze t; dmg t 1",S("shatter","freeze+shatter",["Pearl Sovereign","Vortex Mage"],{tgt:"e"})));
  add(Sp("Rime Torrent",3,"play: freeze t; dmg frz_e 2",S("shatter","freeze+shatter",["Cold Snap","Gale Barrage"],{tgt:"e"})));
  add(Sp("Rime Storm",3,"play: freeze t; dmg t 3",S("shatter","freeze+shatter",["Great Ebb","Aerial Bombardment"],{tgt:"e"})));
  add(Re("Chill Feint",3,"play: freeze t; dmg t 1",S("shatter","freeze+shatter",["Reverse Current","Evasive Maneuver"],{tgt:"eatk"})));
  add(Au("Sleet Totem",3,"freeze: zaps 1 1",S("shatter","freeze+shatter",["Tidal Archive","Eye of Eternity"])));
  setR("r");
  add(Cr("Wintry Golem",6,8,8,"","attack: freeze all_e",S("shatter","freeze+shatter",["Leviathan Elder","Cloud Titan"])));
  add(Cr("Sleet Caller",5,7,7,"","play: destroy t",S("shatter","freeze+shatter",["Deepsea Hydra","Thunderwing Roc"],{tgt:"e:frozen"})));
  add(Cr("Icebound Imp",5,7,7,"","attack: freeze all_e",S("shatter","freeze+shatter",["Deep One Elder","Tempest Dragon"])));
  add(Sp("Hoarfrost Ritual",4,"play: freeze t; dmg frz_e 2",S("shatter","freeze+shatter",["Glacial Cataclysm","Squall Line"],{tgt:"e"})));
  add(Re("Chill Ward",6,"play: freeze t; dmg t 1",S("shatter","freeze+shatter",["Ice Prison","Perfect Gale"],{tgt:"eatk"})));
  add(Au("Glacial Altar",5,"start: dmg frz_e 1",S("shatter","freeze+shatter",["Eternal Winter","Sky Throne"])));

  /* ---- rimewings (20) ---- */
  setR("c");
  add(Cr("Icebound Charger",2,3,3,"","play: freeze t; dmg t 1",S("rimewings","freeze+burn",["Rime Watcher","Whirlwind Acrobat"],{tgt:"e"})));
  add(Cr("Frost Hawk",2,3,2,"airborne","play: freeze t; dmg t 1",S("rimewings","freeze+burn+airborne",["Kelp Lurker","Drifting Monk"],{tgt:"e"})));
  add(Cr("Snowdrift Brute",2,3,2,"airborne","attack: freeze str",S("rimewings","freeze+burn+airborne",["Riverbank Sage","Skyward Scout"])));
  add(Cr("Wintry Reaver",2,3,2,"airborne","attack: freeze str",S("rimewings","freeze+burn+airborne",["Mist Weaver","Windbreak Guardian"])));
  add(Cr("Wintry Drake",2,3,3,"","play: dmg face 1",S("rimewings","freeze+burn",["Coral Warden","Breeze Messenger"])));
  add(Sp("Icebound Storm",1,"play: freeze all_e",S("rimewings","freeze+burn",["Ebb and Flow","Tailwind Rush"])));
  add(Sp("Hoarfrost Rite",1,"play: dmg t 1",S("rimewings","freeze+burn",["Shatter","Cyclone Kick"],{tgt:"ea"})));
  add(Re("Hoarfrost Feint",2,"play: freeze t; dmg t 1",S("rimewings","freeze+burn",["Frost Snap","Sidestep"],{tgt:"eatk"})));
  add(Re("Frozen Snap",2,"play: freeze t",S("rimewings","freeze+burn",["Chill","Tailwind"],{tgt:"eatk"})));
  add(Au("Icebound Beacon",1,"end: dmg face 1",S("rimewings","freeze+burn",["Sea of Clarity","Sky Temple"])));
  add(Au("Rime Banner",2,"start: freeze str",S("rimewings","freeze+burn",["Healing Spring","Jet Stream"])));
  setR("u");
  add(Cr("Glacial Striker",3,4,3,"airborne","attack: freeze str",S("rimewings","freeze+burn+airborne",["Wavecrest Mage","Gyrfalcon"])));
  add(Cr("Snowdrift Duelist",5,8,5,"","play: freeze t; dmg t 1",S("rimewings","freeze+burn",["Frost Giant","Thunderhawk"],{tgt:"e"})));
  add(Cr("Chill Hound",5,7,5,"airborne","freeze: dmg face 1",S("rimewings","freeze+burn+airborne",["Shoal Leviathan","Ancient Wind Spirit"])));
  add(Sp("Chill Burst",4,"play: dmg t 4; draw 1",S("rimewings","freeze+burn",["Glacial Torrent","Tempest Volley"],{tgt:"e"})));
  add(Sp("Wintry Wave",3,"play: freeze all_e",S("rimewings","freeze+burn",["Frozen Tomb","Skyward Ascent"])));
  add(Re("Wintry Flash",3,"play: dmg t 3",S("rimewings","freeze+burn",["Sudden Current","Sky Strike"],{tgt:"ea"})));
  add(Au("Frost Altar",3,"start: zaps 1 1",S("rimewings","freeze+burn",["Ocean's Blessing","Aerie"])));
  setR("r");
  add(Cr("Chill Striker",4,6,4,"airborne","play: dmg face 1",S("rimewings","freeze+burn+airborne",["Glacial Empress","Hurricane Elemental"])));
  add(Cr("Glacial Falcon",4,6,4,"airborne","play: dmg all_e 2",S("rimewings","freeze+burn+airborne",["Siren Queen","Zephyr Archon"])));
  add(Sp("Sleet Rain",5,"play: dmg t 5; draw 1",S("rimewings","freeze+burn",["Glacial Torrent","Tornado"],{tgt:"e"})));
  add(Re("Wintry Riposte",4,"play: freeze t",S("rimewings","freeze+burn",["Reverse Current","Vanishing Wind"],{tgt:"eatk"})));
  add(Au("Hoarfrost Grove",3,"start: freeze str",S("rimewings","freeze+burn",["Ocean's Blessing","Eye of Eternity"])));

  /* ---- snowdrift (20) ---- */
  setR("c");
  add(Cr("Snowdrift Adept",2,3,3,"","play: bounce t",S("snowdrift","bounce+freeze",["Pearl Diver","Feather Sprite"],{tgt:"o"})));
  add(Cr("Rime Elemental",3,4,4,"","attack: freeze str",S("snowdrift","bounce+freeze",["Reef Guardian","Cloud Hawk"])));
  add(Cr("Frozen Caller",3,4,4,"","attack: freeze str",S("snowdrift","bounce+freeze",["Frostbite Shade","Gale Sage"])));
  add(Cr("Rime Shaman",3,4,4,"","attack: freeze str",S("snowdrift","bounce+freeze",["Whirlpool Mage","Sky Courier"])));
  add(Cr("Glacial Scout",2,3,3,"","attack: freeze str",S("snowdrift","bounce+freeze",["Glacier Wolf","Tempest Sprite"])));
  add(Sp("Rime Wave",1,"play: freeze t; dmg t 1",S("snowdrift","bounce+freeze",["Soothing Rain","Zephyr Strike"],{tgt:"e"})));
  add(Sp("Wintry Volley",1,"play: bounce t",S("snowdrift","bounce+freeze",["Whirlpool Trap","Eye of the Gale"],{tgt:"e"})));
  add(Re("Sleet Riposte",2,"play: freeze t",S("snowdrift","bounce+freeze",["Icy Grip","Crosswind"],{tgt:"eatk"})));
  add(Re("Frost Feint",2,"play: bounce t",S("snowdrift","bounce+freeze",["Riptide Counter","Wind Barrier"],{tgt:"e:cost<=3"})));
  add(Au("Snowdrift Shrine",2,"start: freeze str",S("snowdrift","bounce+freeze",["Sea of Clarity","Wind Chimes"])));
  setR("u");
  add(Cr("Hoarfrost Sentinel",4,5,5,"","start: freeze str",S("snowdrift","bounce+freeze",["Coral Hydra","Tornado Elemental"])));
  add(Cr("Wintry Adept",4,5,5,"","play: bounce t",S("snowdrift","bounce+freeze",["Abyssal Lurker","Skyline Falcon"],{tgt:"e:cost<=2"})));
  add(Cr("Frost Imp",3,4,4,"","play: freeze t",S("snowdrift","bounce+freeze",["Mistborn Assassin","Squall Captain"],{tgt:"e"})));
  add(Sp("Chill Gift",2,"play: bounce t",S("snowdrift","bounce+freeze",["Riptide Reversal","Wind Walk"],{tgt:"e"})));
  add(Re("Hoarfrost Recoil",3,"play: freeze t; dmg t 1",S("snowdrift","bounce+freeze",["Absolute Zero","Perfect Gale"],{tgt:"eatk"})));
  add(Au("Chill Altar",3,"ebounce: dmg face 1",S("snowdrift","bounce+freeze",["Permafrost Shrine","Aerie"])));
  setR("r");
  add(Cr("Frost Weaver",5,7,7,"","attack: freeze all_e",S("snowdrift","bounce+freeze",["Deepsea Hydra","Aerie Matriarch"])));
  add(Cr("Sleet Elemental",6,8,8,"","play: bounce t; draw 1",S("snowdrift","bounce+freeze",["Coral Titan","Cloud Leviathan"],{tgt:"e"})));
  add(Sp("Hoarfrost Rain",4,"play: freeze t; dmg t 3",S("snowdrift","bounce+freeze",["Healing Torrent","Squall Line"],{tgt:"e"})));
  add(Re("Glacial Recoil",5,"play: freeze t",S("snowdrift","bounce+freeze",["Frozen Moment","Vanishing Wind"],{tgt:"eatk"})));
  add(Au("Frost Font",4,"start: freeze str",S("snowdrift","bounce+freeze",["Healing Spring","Eye of Eternity"])));

  /* ---- hoarfrost (20) ---- */
  setR("c");
  add(Cr("Frost Colossus",2,2,3,"skyguard","play: freeze t; dmg t 1",S("hoarfrost","freeze+burn+skyguard",["Riptide Rogue","Kestrel Rider"],{tgt:"e"})));
  add(Cr("Glacial Sentry",3,3,5,"","play: dmg t 3",S("hoarfrost","freeze+burn",["Tide Caller","Wind Dancer"],{tgt:"e"})));
  add(Cr("Hoarfrost Warden",1,1,2,"skyguard","attack: dmg face 1",S("hoarfrost","freeze+burn+skyguard",["Coral Crab","Storm Crow"])));
  add(Cr("Glacial Watcher",3,3,5,"","play: freeze t",S("hoarfrost","freeze+burn",["Narwhal Lancer","Featherfall Hawk"],{tgt:"e"})));
  add(Cr("Hoarfrost Bulwark",2,2,4,"","death: dmg all_e 1",S("hoarfrost","freeze+burn",["Riverbank Sage","Wind Wraith"])));
  add(Sp("Snowdrift Burst",1,"play: dmg all_e 1",S("hoarfrost","freeze+burn",["Deep Insight","Tailwind Rush"])));
  add(Sp("Wintry Surge",2,"play: dmg t 3",S("hoarfrost","freeze+burn",["Crashing Wave","Wingbeat"],{tgt:"e"})));
  add(Re("Rime Guard",2,"play: freeze t",S("hoarfrost","freeze+burn",["Whiplash Tide","Tailwind"],{tgt:"eatk"})));
  add(Au("Hoarfrost Banner",2,"start: freeze str",S("hoarfrost","freeze+burn",["Tidal Archive","Jet Stream"])));
  setR("u");
  add(Cr("Wintry Guardian",4,3,6,"skyguard","attack: freeze str",S("hoarfrost","freeze+burn+skyguard",["Leviathan Calf","Vortex Mage"])));
  add(Cr("Sleet Behemoth",4,3,7,"","attack: freeze str",S("hoarfrost","freeze+burn",["Shiver Elemental","Roc Hatchery"])));
  add(Cr("Snowdrift Guardian",4,3,7,"","play: dmg t 3",S("hoarfrost","freeze+burn",["Deepwater Scholar","Feathered Serpent"],{tgt:"e"})));
  add(Sp("Snowdrift Surge",2,"play: freeze t; draw 1",S("hoarfrost","freeze+burn",["Tidal Scroll","Wind Shear"],{tgt:"e"})));
  add(Re("Sleet Recoil",3,"play: dmg t 3",S("hoarfrost","freeze+burn",["Counterflow","Evasive Maneuver"],{tgt:"ea"})));
  add(Au("Snowdrift Field",3,"start: zaps 1 1",S("hoarfrost","freeze+burn",["Tidal Mastery","Wind Chimes"])));
  setR("r");
  add(Cr("Snowdrift Sentry",5,1,12,"wall","death: dmg all_e 1",S("hoarfrost","freeze+burn+wall",["Leviathan Elder","Mistral Phoenix"])));
  add(Cr("Rime Titan",6,5,11,"","attack: freeze all_e",S("hoarfrost","freeze+burn",["Frostfang Wyrm","Cloud Titan"])));
  add(Sp("Glacial Blast",4,"play: freeze t; dmg t 3",S("hoarfrost","freeze+burn",["Glacial Cataclysm","Winds of Change"],{tgt:"e"})));

  /* ---- squall (15, support) ---- */
  setR("c");
  add(Cr("Snowdrift Sentinel",2,3,3,"","play: freeze t",S("squall","freeze+draw",["Winter Mage","Cirrus Dancer"],{tgt:"e"})));
  add(Cr("Frozen Serpent",3,4,4,"","play: draw 1",S("squall","freeze+draw",["Kraken Spawn","Dust Devil"])));
  add(Cr("Icebound Familiar",1,2,2,"","play: draw 1",S("squall","freeze+draw",["Brook Otter","Gust Sprite"])));
  add(Cr("Icebound Elemental",1,1,2,"airborne","death: draw 1",S("squall","freeze+draw+airborne",["Coral Crab","Swift Courier"])));
  add(Sp("Frozen Wave",1,"play: draw 1; energy 1",S("squall","freeze+draw",["Flowing Wisdom","Cyclone Kick"])));
  add(Re("Snowdrift Riposte",1,"play: freeze t; dmg t 1",S("squall","freeze+draw",["Deflect","Sidestep"],{tgt:"eatk"})));
  add(Au("Snowdrift Totem",2,"end: draw 1",S("squall","freeze+draw",["Tidal Mastery","Sky Temple"])));
  setR("u");
  add(Cr("Glacial Adept",3,3,4,"airborne","freeze: dmg face 1",S("squall","freeze+draw+airborne",["Deep Oracle","Sky Pirate"])));
  add(Cr("Frost Sentinel",3,3,4,"airborne","death: draw 1",S("squall","freeze+draw+airborne",["Hydromancer","Cloudshaper"])));
  add(Sp("Wintry Rite",2,"play: freeze t; dmg t 2",S("squall","freeze+draw",["Deep Insight","Cyclonic Rift"],{tgt:"e"})));
  setR("r");
  add(Cr("Snowdrift Shaman",6,7,8,"airborne","death: draw 1",S("squall","freeze+draw+airborne",["Wavebreaker Champion","Aerie Matriarch"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.ICE_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["ice"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
