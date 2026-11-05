/* ================= PLASMA CATALOG (designed confluence cards, generated first draft) =================
   Fire + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   overload (25: selfburn), arc (20: chain + burn), ignition (20: burn + haste), reactor (20: draw + burn), static (15, support: barrier + burn).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [fire, lightning]. */
// Loaded by build.py inside catalogBegin("plasma")/catalogEnd("plasma") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.PLASMA_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"plasma" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.PLASMA_CATALOG.push(d); return d; };
  setEl("plasma");

  /* ---- overload (25) ---- */
  setR("c");
  add(Cr("Fulgent Charger",2,3,3,"","play: selfdmg 1; dmg t 2",S("overload","selfburn",["Sparkfire Kit","Volt Runner"],{tgt:"e"})));
  add(Cr("Plasmic Drake",1,2,1,"haste","play: selfdmg 1; dmg t 1",S("overload","selfburn+haste",["Molten Hatchling","Volt Hopper"],{tgt:"e"})));
  add(Cr("Crackling Duelist",1,2,2,"","play: selfdmg 1; dmg t 1",S("overload","selfburn",["Ember Imp","Spark Mite"],{tgt:"e"})));
  add(Cr("Crackling Striker",2,3,2,"haste","play/low10: buff self 2 2",S("overload","selfburn+haste",["Cinder Hound","Lightning Courier"])));
  add(Cr("Plasmic Duelist",2,3,2,"haste","play: selfdmg 1; dmg t 2",S("overload","selfburn+haste",["Reckless Raider","Conduit Keeper"],{tgt:"e"})));
  add(Cr("Overcharged Hound",2,3,3,"","play: selfdmg 1; dmg t 2",S("overload","selfburn",["Apprentice Pyromancer","Flicker Mage"],{tgt:"e"})));
  add(Sp("Charged Call",1,"play: selfdmg 2; dmg t 2",S("overload","selfburn",["Stoke the Coals","Overclock"],{tgt:"ea"})));
  add(Sp("Overcharged Torrent",1,"play: selfdmg 2; dmg t 2",S("overload","selfburn",["Searing Spark","Charge Conduit"],{tgt:"ea"})));
  add(Sp("Searing Torrent",1,"play: selfdmg 2; dmg t 2",S("overload","selfburn",["Blazing Command","Crackle"],{tgt:"ea"})));
  add(Re("Crackling Trap",1,"play: selfdmg 1; dmg t 2",S("overload","selfburn",["Wildfire Ignition","Blitz"],{tgt:"eatk"})));
  add(Re("Fulgent Ward",2,"play: selfdmg 1; dmg t 3",S("overload","selfburn",["Backdraft","Surge Shield"],{tgt:"eatk"})));
  add(Au("Ionized Grove",1,"start: selfdmg 1; dmg face 2",S("overload","selfburn",["Kindling Hearth","Lightning Rod"])));
  add(Au("Molten Beacon",2,"start: selfdmg 1; dmg face 2",S("overload","selfburn",["Smoldering Tome","Charged Coil"])));
  setR("u");
  add(Cr("Molten Wolf",4,6,4,"","play: selfdmg 2; dmg all_e 1",S("overload","selfburn",["Inferno Charger","Spark Golem"])));
  add(Cr("Ionized Wolf",4,4,4,"haste","pain: dmg face 1",S("overload","selfburn+haste",["Living Wildfire","Galvanic Sentinel"])));
  add(Cr("Plasmic Hawk",4,6,4,"","play: selfdmg 1; dmg t 4",S("overload","selfburn",["Cinderstorm Mage","Lightning Elemental"],{tgt:"e"})));
  add(Cr("Searing Charger",5,6,5,"haste","play/low10: buff self 2 2",S("overload","selfburn+haste",["Volcanic Brute","Sparkfire Hydra"])));
  add(Sp("Fulgent Call",3,"play: selfdmg 2; dmg t 4",S("overload","selfburn",["Dragonfire","Forked Lightning"],{tgt:"ea"})));
  add(Sp("Crackling Wave",3,"play/low8: dmg t 4; draw 1",S("overload","selfburn",["Flame Wave","Overload Cascade"],{tgt:"e"})));
  add(Re("Molten Retort",2,"play: selfdmg 1; dmg t 3",S("overload","selfburn",["Inferno Surge","Shockwave Counter"],{tgt:"eatk"})));
  add(Au("Arcing Shrine",3,"start: selfdmg 1; dmg face 2",S("overload","selfburn",["Everburning Brazier","Storm God's Altar"])));
  setR("r");
  add(Cr("Fulgent Raider",5,6,5,"haste","play: selfdmg 1; dmg t 5",S("overload","selfburn+haste",["Pyrelord Vexis","Spark Matriarch"],{tgt:"e"})));
  add(Cr("Charged Raider",5,6,5,"haste","play: selfdmg 1; dmg t 5",S("overload","selfburn+haste",["Lavaheart Titan","Volt Dragon"],{tgt:"e"})));
  add(Cr("Molten Reaver",6,7,6,"haste","play: selfdmg 1; dmg t 6",S("overload","selfburn+haste",["Searing Overlord","Storm Titan"],{tgt:"e"})));
  add(Sp("Arcing Rain",4,"play: selfdmg 2; dmg t 6",S("overload","selfburn",["Wildfire Blaze","Ion Storm"],{tgt:"ea"})));
  add(Re("Volatile Trap",5,"play: selfdmg 1; dmg t 7",S("overload","selfburn",["Pyroclasm Reflex","Thunder Trap"],{tgt:"eatk"})));
  add(Au("Volatile Field",4,"pain: zaps 1 2",S("overload","selfburn",["Crown of Cinders","Storm Battery"])));

  /* ---- arc (20) ---- */
  setR("c");
  add(Cr("Arcing Spirit",3,4,4,"","play/chain2: buff self 1 1",S("arc","chain+burn",["Ember Scholar","Bolt Thrower"])));
  add(Cr("Fulgent Weaver",2,3,3,"","play: dmg t 2",S("arc","chain+burn",["Ashen Brawler","Capacitor Golem"],{tgt:"e"})));
  add(Cr("Volatile Spirit",2,3,3,"","chain2: draw 1",S("arc","chain+burn",["Smokescreen Imp","Raiju"])));
  add(Cr("Fulgent Caller",2,3,3,"","play: dmg face 1",S("arc","chain+burn",["Brimstone Guard","Bolt Knight"])));
  add(Cr("Molten Familiar",1,2,2,"","play: dmg face 1",S("arc","chain+burn",["Ember Whelp","Static Sprite"])));
  add(Sp("Fulgent Ritual",1,"play: dmg t 1; draw 1",S("arc","chain+burn",["Overheat","Quick Study"],{tgt:"e"})));
  add(Sp("Searing Surge",2,"play: dmg t 3",S("arc","chain+burn",["Combust","Zap"],{tgt:"e"})));
  add(Re("Arcing Ward",1,"play: dmg t 1",S("arc","chain+burn",["Heat Surge","Shock Reflex"],{tgt:"ea"})));
  add(Re("Plasmic Recoil",1,"play: dmg t 2",S("arc","chain+burn",["Flash Fire","Electrify"],{tgt:"eatk"})));
  add(Au("Charged Grove",2,"end/spell2: zaps 1 2",S("arc","chain+burn",["Smoldering Tome","Overload Coil"])));
  add(Au("Charged Engine",2,"start: zaps 1 1",S("arc","chain+burn",["Furnace of Rage","Lightning Rod"])));
  setR("u");
  add(Cr("Crackling Golem",4,5,5,"","play: dmg t 3",S("arc","chain+burn",["Emberlord Captain","Capacitor Titan"],{tgt:"e"})));
  add(Cr("Volatile Sentinel",3,4,4,"","play: dmg face 1",S("arc","chain+burn",["Flame Warden","Storm Shaman"])));
  add(Cr("Plasmic Shaman",4,5,5,"","play: dmg t 3",S("arc","chain+burn",["Flamewing Dragon","Thunderhead Golem"],{tgt:"e"})));
  add(Sp("Volatile Wave",3,"play: dmg t 3",S("arc","chain+burn",["Combustion Wave","Surge of Power"],{tgt:"ea"})));
  add(Sp("Molten Storm",3,"play: dmg t 3",S("arc","chain+burn",["Fireball","Thunderous Cascade"],{tgt:"ea"})));
  add(Re("Plasmic Retort",3,"play: dmg t 4",S("arc","chain+burn",["Wild Surge","Lightning Reflexes"],{tgt:"eatk"})));
  add(Au("Fulgent Totem",3,"end/spell2: zaps 1 2",S("arc","chain+burn",["Altar of Embers","Infinite Battery"])));
  setR("r");
  add(Cr("Searing Scout",6,8,8,"","attack: dmg face 1",S("arc","chain+burn",["Flame Tyrant","Charged Juggernaut"])));
  add(Cr("Plasmic Familiar",6,8,8,"","death: dmg all_e 1",S("arc","chain+burn",["Ignis, the Undying","Static Overlord"])));
  add(Sp("Arcing Storm",5,"play: dmg t 1 | chain2: dmg t 2",S("arc","chain+burn",["Firestorm Ritual","Ion Storm"],{tgt:"ea"})));
  add(Re("Arcing Trap",4,"play: dmg t 2 | chain2: draw 1",S("arc","chain+burn",["Inferno Surge","Thunder Trap"],{tgt:"eatk"})));
  add(Au("Ionized Banner",5,"start: zaps 1 1",S("arc","chain+burn",["Hearth of Embers","Tesla Coil"])));

  /* ---- ignition (20) ---- */
  setR("c");
  add(Cr("Crackling Lancer",4,6,4,"","play: dmg face 1",S("ignition","burn+haste",["Firebrand Knight","Galvanic Golem"])));
  add(Cr("Arcing Falcon",1,2,1,"haste","play: dmg t 1",S("ignition","burn+haste+haste",["Pyre Zealot","Plasma Sprite"],{tgt:"e"})));
  add(Cr("Molten Falcon",3,5,3,"","play: kw self haste tmp",S("ignition","burn+haste",["Bonfire Keeper","Voltage Hound"])));
  add(Cr("Crackling Falcon",2,3,2,"haste","death: dmg all_e 1",S("ignition","burn+haste+haste",["Torchbearer","Capacitor Golem"])));
  add(Cr("Fulgent Striker",1,2,1,"haste","death: dmg all_e 1",S("ignition","burn+haste+haste",["Ember Whelp","Thunder Imp"])));
  add(Sp("Crackling Surge",1,"play: dmg t 2",S("ignition","burn+haste",["Searing Blast","Chain Lightning"],{tgt:"e"})));
  add(Sp("Charged Gift",2,"play: dmg t 2; draw 1",S("ignition","burn+haste",["Rally the Flames","Arc Lash"],{tgt:"e"})));
  add(Re("Searing Reflex",2,"play: dmg t 2",S("ignition","burn+haste",["Ember Shield","Surge Shield"],{tgt:"ea"})));
  add(Re("Charged Ward",2,"play: dmg t 2",S("ignition","burn+haste",["Backdraft","Grounding"],{tgt:"ea"})));
  add(Au("Fulgent Shrine",1,"start: buff ostr 1 0 tmp",S("ignition","burn+haste",["Kindling Hearth","Charged Coil"])));
  setR("u");
  add(Cr("Crackling Brute",4,5,4,"pierce","creature: buff self 1 0",S("ignition","burn+haste+pierce",["Magma Golem","Lightning Hydra"])));
  add(Cr("Fulgent Hawk",4,4,4,"haste","attack: dmg face 1",S("ignition","burn+haste+haste",["Cinder Swarm","Thunderclap Adept"])));
  add(Cr("Volatile Raider",4,6,4,"","play: dmg face 1",S("ignition","burn+haste",["Ember Queen","Ion Drake"])));
  add(Sp("Plasmic Volley",3,"play: dmg t 3",S("ignition","burn+haste",["Chain of Flame","Battery Dump"],{tgt:"ea"})));
  add(Re("Arcing Reflex",3,"play: untap t",S("ignition","burn+haste",["Backdraft","Shockwave Counter"],{tgt:"o"})));
  add(Au("Volatile Totem",2,"spell: zaps 1 1",S("ignition","burn+haste",["Furnace of Rage","Overload Coil"])));
  setR("r");
  add(Cr("Overcharged Charger",4,6,4,"pierce","play: dmg t 3",S("ignition","burn+haste+pierce",["Inferno Champion","Tempest Archon"],{tgt:"e"})));
  add(Cr("Charged Duelist",6,6,6,"haste","play: dmg face 1",S("ignition","burn+haste+haste",["Magma Behemoth","Storm Titan"])));
  add(Sp("Ionized Surge",6,"play: dmg t 6",S("ignition","burn+haste",["Wildfire Blaze","Chain of Storms"],{tgt:"ea"})));
  add(Re("Arcing Guard",4,"play: dmg t 6",S("ignition","burn+haste",["Pyroclasm Reflex","Lightning Reflexes"],{tgt:"eatk"})));
  add(Au("Searing Beacon",4,"start: dmg all_e 1",S("ignition","burn+haste",["Everburning Brazier","Infinite Battery"])));

  /* ---- reactor (20) ---- */
  setR("c");
  add(Cr("Plasmic Sentinel",3,3,4,"barrier","play: dmg t 3",S("reactor","draw+burn+barrier",["Lava Hound","Arc Apprentice"],{tgt:"e"})));
  add(Cr("Ionized Sentinel",2,2,3,"barrier","play: draw 1",S("reactor","draw+burn+barrier",["Blazing Martyr","Arc Duelist"])));
  add(Cr("Arcing Scout",3,3,4,"barrier","play: dmg face 1",S("reactor","draw+burn+barrier",["Pyre Dancer","Tesla Knight"])));
  add(Cr("Searing Caller",2,2,3,"barrier","attack: dmg face 1",S("reactor","draw+burn+barrier",["Blood-Fire Berserker","Charge Siphon"])));
  add(Cr("Crackling Elemental",1,1,2,"barrier","death: draw 1",S("reactor","draw+burn+barrier",["Molten Hatchling","Spark Mite"])));
  add(Sp("Molten Volley",2,"play: dmg t 2; draw 1",S("reactor","draw+burn",["Scorch","Static Bolt"],{tgt:"e"})));
  add(Sp("Searing Rain",2,"play: dmg t 2",S("reactor","draw+burn",["Flame Lash","Overcharge Blast"],{tgt:"ea"})));
  add(Re("Molten Feint",2,"play: draw 1",S("reactor","draw+burn",["Wildfire Ignition","Surge Shield"])));
  add(Au("Crackling Font",2,"start/hand4: draw 1",S("reactor","draw+burn",["Crown of Cinders","Charged Coil"])));
  setR("u");
  add(Cr("Ionized Shaman",3,3,4,"barrier","start: zaps 1 2",S("reactor","draw+burn+barrier",["Ashwing Harrier","Pulse Mage"])));
  add(Cr("Charged Elemental",3,3,4,"barrier","play: dmg face 1",S("reactor","draw+burn+barrier",["Hellforge Smith","Voltage Engineer"])));
  add(Cr("Volatile Imp",3,3,4,"barrier","play: dmg t 3",S("reactor","draw+burn+barrier",["Ignited Lancer","Thunder Wolf"],{tgt:"e"})));
  add(Sp("Arcing Volley",3,"play: draw 1; energy 1",S("reactor","draw+burn",["Fury Unleashed","Forked Lightning"])));
  add(Re("Arcing Retort",3,"play: draw 1; buff t 0 2 tmp",S("reactor","draw+burn",["Wild Surge","Electrify"],{tgt:"o"})));
  add(Au("Plasmic Font",3,"draw: heal 1",S("reactor","draw+burn",["Altar of Embers","Storm God's Altar"])));
  setR("r");
  add(Cr("Plasmic Imp",5,7,7,"","play: dmg t 3",S("reactor","draw+burn",["Blazewing Matriarch","Conduit Colossus"],{tgt:"e"})));
  add(Cr("Charged Imp",5,6,7,"barrier","start: draw 1",S("reactor","draw+burn+barrier",["Magmaforge Golem","Charged Juggernaut"])));
  add(Sp("Plasmic Gift",4,"play: dmg all_e 2",S("reactor","draw+burn",["Firestorm Ritual","Thunderous Cascade"])));

  /* ---- static (15, support) ---- */
  setR("c");
  add(Cr("Volatile Wall",2,2,3,"barrier","death: dmg all_e 1",S("static","barrier+burn+barrier",["Ember Duelist","Lightning Courier"])));
  add(Cr("Volatile Behemoth",3,2,5,"barrier","death: dmg all_e 1",S("static","barrier+burn+barrier",["Flamecaller Adept","Storm Caller"])));
  add(Cr("Charged Behemoth",2,2,3,"barrier","play: kw t barrier",S("static","barrier+burn+barrier",["Firebrand Zealot","Conduit Keeper"],{tgt:"o"})));
  add(Cr("Crackling Guardian",3,3,5,"","play: dmg face 1",S("static","barrier+burn",["Flame Herald","Arc Apprentice"])));
  add(Sp("Ionized Torrent",2,"play: dmg t 3",S("static","barrier+burn",["Firebolt","Jolt"],{tgt:"e"})));
  add(Re("Volatile Reflex",2,"play: kw t barrier; dmg str 1",S("static","barrier+burn",["Heat Surge","Blitz"],{tgt:"o"})));
  add(Au("Molten Grove",2,"start: zaps 1 1",S("static","barrier+burn",["Smoldering Tome","Lightning Rod"])));
  setR("u");
  add(Cr("Searing Bulwark",3,3,5,"","play: dmg t 3",S("static","barrier+burn",["Scorchclaw Ravager","Voltage Wraith"],{tgt:"e"})));
  add(Cr("Arcing Wall",3,3,5,"","start: kw ostr barrier",S("static","barrier+burn",["Sun Priestess","Tempest Runner"])));
  add(Sp("Arcing Surge",2,"play: dmg t 3",S("static","barrier+burn",["Raging Inferno","Static Burst"],{tgt:"e"})));
  setR("r");
  add(Cr("Fulgent Keeper",5,4,9,"barrier","attack: dmg face 1",S("static","barrier+burn+barrier",["Blazewing Matriarch","Static Overlord"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.PLASMA_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["plasma"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
