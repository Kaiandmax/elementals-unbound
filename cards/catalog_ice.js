/* ================= ICE CATALOG (designed confluence cards, generated first draft) =================
   Water + Wind. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   shatter (25: freeze + shatter), rimewings (20: freeze), snowdrift (20: bounce + freeze), hoarfrost (20: freeze + burn), squall (15, support: draw).
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
  add(Sp("Glacial Rain",2,"play: freeze t; draw 1",S("shatter","freeze+shatter",["Tidal Insight","Gust of Wind"],{tgt:"e"})));
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
  add(Cr("Wintry Golem",6,8,8,"","attack: freeze str",S("shatter","freeze+shatter",["Leviathan Elder","Cloud Titan"])));
  add(Cr("Sleet Caller",5,7,7,"","play: destroy t",S("shatter","freeze+shatter",["Deepsea Hydra","Thunderwing Roc"],{tgt:"e:frozen"})));
  add(Cr("Icebound Imp",5,7,7,"","attack: freeze str",S("shatter","freeze+shatter",["Deep One Elder","Tempest Dragon"])));
  add(Sp("Hoarfrost Ritual",4,"play: freeze t; dmg frz_e 2",S("shatter","freeze+shatter",["Glacial Cataclysm","Squall Line"],{tgt:"e"})));
  add(Re("Chill Ward",6,"play: freeze t; dmg t 1",S("shatter","freeze+shatter",["Ice Prison","Perfect Gale"],{tgt:"eatk"})));
  add(Au("Glacial Altar",5,"start: dmg frz_e 1",S("shatter","freeze+shatter",["Eternal Winter","Sky Throne"])));

  /* ---- rimewings (20) ---- */
  setR("c");
  add(Cr("Icebound Serpent",2,3,3,"","attack: freeze str",S("rimewings","freeze",["Rime Watcher","Whirlwind Acrobat"])));
  add(Cr("Frost Weaver",2,2,3,"airborne","attack: freeze str",S("rimewings","freeze+airborne",["Kelp Lurker","Drifting Monk"])));
  add(Cr("Snowdrift Caller",2,2,3,"airborne","play: freeze t",S("rimewings","freeze+airborne",["Riverbank Sage","Skyward Scout"],{tgt:"e"})));
  add(Cr("Icebound Caller",2,2,3,"airborne","play: freeze t",S("rimewings","freeze+airborne",["Mist Weaver","Windbreak Guardian"],{tgt:"e"})));
  add(Cr("Wintry Spirit",2,3,3,"","play: freeze t; dmg t 1",S("rimewings","freeze",["Coral Warden","Breeze Messenger"],{tgt:"e"})));
  add(Sp("Icebound Storm",1,"play: freeze t; draw 1",S("rimewings","freeze",["Ebb and Flow","Tailwind Rush"],{tgt:"e"})));
  add(Sp("Hoarfrost Rite",1,"play: freeze t; draw 1",S("rimewings","freeze",["Shatter","Cyclone Kick"],{tgt:"e"})));
  add(Re("Hoarfrost Feint",2,"play: freeze t",S("rimewings","freeze",["Frost Snap","Sidestep"],{tgt:"eatk"})));
  add(Re("Frozen Snap",2,"play: freeze t",S("rimewings","freeze",["Chill","Tailwind"],{tgt:"eatk"})));
  add(Au("Icebound Beacon",1,"start: freeze str",S("rimewings","freeze",["Sea of Clarity","Sky Temple"])));
  add(Au("Rime Banner",2,"start: freeze str",S("rimewings","freeze",["Healing Spring","Jet Stream"])));
  setR("u");
  add(Cr("Glacial Elemental",3,3,4,"airborne","play: freeze t",S("rimewings","freeze+airborne",["Wavecrest Mage","Gyrfalcon"],{tgt:"e"})));
  add(Cr("Snowdrift Imp",5,6,7,"","play: freeze t",S("rimewings","freeze",["Frost Giant","Thunderhawk"],{tgt:"e"})));
  add(Cr("Chill Shaman",5,6,6,"airborne","start: freeze str",S("rimewings","freeze+airborne",["Shoal Leviathan","Ancient Wind Spirit"])));
  add(Sp("Chill Burst",4,"play: freeze all_e",S("rimewings","freeze",["Glacial Torrent","Tempest Volley"])));
  add(Sp("Wintry Wave",3,"play: freeze t; dmg t 3",S("rimewings","freeze",["Frozen Tomb","Skyward Ascent"],{tgt:"e"})));
  add(Re("Wintry Flash",3,"play: freeze t; dmg t 1",S("rimewings","freeze",["Sudden Current","Sky Strike"],{tgt:"eatk"})));
  add(Au("Frost Altar",3,"start: freeze str",S("rimewings","freeze",["Ocean's Blessing","Aerie"])));
  setR("r");
  add(Cr("Chill Elemental",4,5,5,"airborne","play: freeze t; dmg t 1",S("rimewings","freeze+airborne",["Glacial Empress","Hurricane Elemental"],{tgt:"e"})));
  add(Cr("Glacial Scout",4,5,5,"airborne","play: freeze all_e",S("rimewings","freeze+airborne",["Siren Queen","Zephyr Archon"])));
  add(Sp("Sleet Rain",5,"play: freeze all_e",S("rimewings","freeze",["Glacial Torrent","Tornado"])));
  add(Re("Wintry Riposte",4,"play: freeze t",S("rimewings","freeze",["Reverse Current","Vanishing Wind"],{tgt:"eatk"})));
  add(Au("Hoarfrost Grove",3,"start: freeze str",S("rimewings","freeze",["Ocean's Blessing","Eye of Eternity"])));

  /* ---- snowdrift (20) ---- */
  setR("c");
  add(Cr("Snowdrift Adept",2,3,3,"","play: bounce t",S("snowdrift","bounce+freeze",["Pearl Diver","Feather Sprite"],{tgt:"o"})));
  add(Cr("Rime Elemental",3,4,4,"","attack: freeze str",S("snowdrift","bounce+freeze",["Reef Guardian","Cloud Hawk"])));
  add(Cr("Frozen Caller",3,4,4,"","attack: freeze str",S("snowdrift","bounce+freeze",["Frostbite Shade","Gale Sage"])));
  add(Cr("Rime Shaman",3,4,4,"","attack: freeze str",S("snowdrift","bounce+freeze",["Whirlpool Mage","Sky Courier"])));
  add(Cr("Frozen Serpent",2,3,3,"","attack: freeze str",S("snowdrift","bounce+freeze",["Glacier Wolf","Tempest Sprite"])));
  add(Sp("Glacial Ritual",1,"play: bounce t",S("snowdrift","bounce+freeze",["Soothing Rain","Zephyr Strike"],{tgt:"e"})));
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
  add(Cr("Wintry Imp",5,7,7,"","attack: freeze str",S("snowdrift","bounce+freeze",["Deepsea Hydra","Aerie Matriarch"])));
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
  add(Cr("Rime Titan",6,5,11,"","attack: freeze str",S("hoarfrost","freeze+burn",["Frostfang Wyrm","Cloud Titan"])));
  add(Sp("Glacial Blast",4,"play: freeze t; dmg t 3",S("hoarfrost","freeze+burn",["Glacial Cataclysm","Winds of Change"],{tgt:"e"})));

  /* ---- squall (15, support) ---- */
  setR("c");
  add(Cr("Snowdrift Sentinel",2,3,3,"","play: draw 1",S("squall","draw",["Winter Mage","Cirrus Dancer"])));
  add(Cr("Rime Imp",3,4,4,"","death: draw 1",S("squall","draw",["Kraken Spawn","Dust Devil"])));
  add(Cr("Icebound Familiar",1,2,2,"","death: draw 1",S("squall","draw",["Brook Otter","Gust Sprite"])));
  add(Cr("Icebound Elemental",1,1,2,"airborne","death: draw 1",S("squall","draw+airborne",["Coral Crab","Swift Courier"])));
  add(Sp("Frozen Wave",1,"play: draw 1; heal 2",S("squall","draw",["Flowing Wisdom","Cyclone Kick"])));
  add(Re("Snowdrift Riposte",1,"play: draw 1",S("squall","draw",["Deflect","Sidestep"])));
  add(Au("Snowdrift Totem",2,"end: draw 1",S("squall","draw",["Tidal Mastery","Sky Temple"])));
  setR("u");
  add(Cr("Glacial Adept",3,3,4,"airborne","spell: draw 1",S("squall","draw+airborne",["Deep Oracle","Sky Pirate"])));
  add(Cr("Frost Sentinel",3,3,4,"airborne","death: draw 1",S("squall","draw+airborne",["Hydromancer","Cloudshaper"])));
  add(Sp("Wintry Rite",2,"play: draw 1",S("squall","draw",["Deep Insight","Cyclonic Rift"])));
  setR("r");
  add(Cr("Snowdrift Shaman",6,7,8,"airborne","death: draw 1",S("squall","draw+airborne",["Wavebreaker Champion","Aerie Matriarch"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.ICE_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["ice"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
