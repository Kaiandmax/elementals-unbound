/* ================= PLASMA CATALOG (designed confluence cards, generated first draft) =================
   Fire + Lightning. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   overload (25: selfburn), arc (20: chain + draw), ignition (20: burn + haste), reactor (20: draw + burn), static (15, support: barrier + burn).
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
  add(Cr("Molten Scout",2,3,3,"","play: selfdmg 1; dmg t 2",S("overload","selfburn",["Reckless Raider","Volt Runner"],{tgt:"e"})));
  add(Cr("Ionized Spirit",1,2,2,"","play: selfdmg 1; dmg t 1",S("overload","selfburn",["Ember Whelp","Static Sprite"],{tgt:"e"})));
  add(Cr("Charged Elemental",1,2,2,"","play/low10: buff self 1 1",S("overload","selfburn",["Ember Imp","Volt Hopper"])));
  add(Cr("Crackling Elemental",2,3,3,"","play/low10: buff self 1 1",S("overload","selfburn",["Sparkfire Kit","Capacitor Golem"])));
  add(Cr("Searing Scout",2,3,3,"","play: selfdmg 1; dmg t 2",S("overload","selfburn",["Cinder Hound","Conduit Keeper"],{tgt:"e"})));
  add(Cr("Searing Imp",2,3,3,"","play: selfdmg 1; dmg t 2",S("overload","selfburn",["Apprentice Pyromancer","Flicker Mage"],{tgt:"e"})));
  add(Sp("Overcharged Burst",1,"play/low8: dmg t 2; draw 1",S("overload","selfburn",["Blazing Command","Quick Study"],{tgt:"e"})));
  add(Sp("Plasmic Call",1,"play: selfdmg 2; dmg t 2",S("overload","selfburn",["Searing Spark","Charge Conduit"],{tgt:"ea"})));
  add(Sp("Plasmic Volley",1,"play/low8: dmg t 2; draw 1",S("overload","selfburn",["Stoke the Coals","Overclock"],{tgt:"e"})));
  add(Re("Searing Recoil",1,"play: selfdmg 1; dmg t 2",S("overload","selfburn",["Heat Surge","Shock Reflex"],{tgt:"eatk"})));
  add(Re("Volatile Snap",2,"play: selfdmg 1; dmg t 3",S("overload","selfburn",["Backdraft","Surge Shield"],{tgt:"eatk"})));
  add(Au("Fulgent Font",1,"start: selfdmg 1; dmg face 2",S("overload","selfburn",["Kindling Hearth","Charged Coil"])));
  add(Au("Plasmic Grove",2,"start: selfdmg 1; dmg face 2",S("overload","selfburn",["Smoldering Tome","Lightning Rod"])));
  setR("u");
  add(Cr("Fulgent Caller",4,5,5,"","play: selfdmg 1; dmg t 3",S("overload","selfburn",["Inferno Charger","Spark Golem"],{tgt:"e"})));
  add(Cr("Plasmic Shaman",4,5,5,"","pain: dmg face 1",S("overload","selfburn",["Living Wildfire","Galvanic Sentinel"])));
  add(Cr("Searing Sentinel",4,5,5,"","play: selfdmg 1; dmg t 3",S("overload","selfburn",["Emberlord Captain","Lightning Elemental"],{tgt:"e"})));
  add(Cr("Arcing Familiar",5,6,7,"","play/low10: buff self 1 1",S("overload","selfburn",["Volcanic Brute","Conduit Colossus"])));
  add(Sp("Molten Call",3,"play/low8: dmg t 4; draw 1",S("overload","selfburn",["Firestorm Ritual","Forked Lightning"],{tgt:"e"})));
  add(Sp("Volatile Rain",3,"play/low8: dmg t 4; draw 1",S("overload","selfburn",["Flame Wave","Battery Dump"],{tgt:"e"})));
  add(Re("Arcing Guard",2,"play: selfdmg 1; dmg t 3",S("overload","selfburn",["Backdraft","Shockwave Counter"],{tgt:"eatk"})));
  add(Au("Molten Font",3,"start: selfdmg 1; dmg face 2",S("overload","selfburn",["Everburning Brazier","Storm God's Altar"])));
  setR("r");
  add(Cr("Crackling Caller",5,7,7,"","play/low10: buff self 1 1",S("overload","selfburn",["Magmaforge Golem","Static Overlord"])));
  add(Cr("Charged Caller",5,7,7,"","play: selfdmg 1; dmg t 3",S("overload","selfburn",["Pyrelord Vexis","Volt Dragon"],{tgt:"e"})));
  add(Cr("Plasmic Caller",6,8,8,"","play/low10: buff self 1 1",S("overload","selfburn",["Ignis, the Undying","Storm Titan"])));
  add(Sp("Fulgent Rain",4,"play: selfdmg 2; dmg t 6",S("overload","selfburn",["Wildfire Blaze","Ion Storm"],{tgt:"ea"})));
  add(Re("Searing Reflex",5,"play: selfdmg 1; dmg t 7",S("overload","selfburn",["Inferno Surge","Thunder Trap"],{tgt:"eatk"})));
  add(Au("Fulgent Altar",4,"pain: zaps 1 2",S("overload","selfburn",["Altar of Embers","Storm Battery"])));

  /* ---- arc (20) ---- */
  setR("c");
  add(Cr("Ionized Golem",3,4,4,"","play: dmg t 1 | chain2: dmg t 1",S("arc","chain+draw",["Ember Scholar","Tesla Knight"],{tgt:"ea"})));
  add(Cr("Ionized Serpent",2,3,3,"","play: dmg t 1 | chain2: dmg t 1",S("arc","chain+draw",["Ashen Brawler","Lightning Courier"],{tgt:"ea"})));
  add(Cr("Ionized Familiar",2,3,3,"","chain2: draw 1",S("arc","chain+draw",["Brimstone Guard","Arc Duelist"])));
  add(Cr("Ionized Elemental",2,3,3,"","play/chain2: buff self 1 1",S("arc","chain+draw",["Torchbearer","Bolt Knight"])));
  add(Cr("Searing Weaver",1,2,2,"","play: dmg t 1 | chain2: dmg t 1",S("arc","chain+draw",["Molten Hatchling","Spark Mite"],{tgt:"ea"})));
  add(Sp("Plasmic Wave",1,"play: draw 1 | chain2: energy 1",S("arc","chain+draw",["Twin Bolts","Crackle"])));
  add(Sp("Fulgent Blast",2,"play: dmg t 1 | chain2: dmg t 2",S("arc","chain+draw",["Flame Lash","Spark Surge"],{tgt:"ea"})));
  add(Re("Fulgent Snap",1,"play: dmg t 2 | chain2: draw 1",S("arc","chain+draw",["Flash Fire","Blitz"],{tgt:"eatk"})));
  add(Re("Molten Ward",1,"play: dmg t 2 | chain2: draw 1",S("arc","chain+draw",["Wildfire Ignition","Grounding"],{tgt:"eatk"})));
  add(Au("Charged Sanctum",2,"start/hand4: draw 1",S("arc","chain+draw",["Smoldering Tome","Overload Coil"])));
  add(Au("Volatile Grove",2,"start/hand4: draw 1",S("arc","chain+draw",["Furnace of Rage","Charged Coil"])));
  setR("u");
  add(Cr("Volatile Caller",4,5,5,"","play: dmg t 1 | chain2: dmg t 1",S("arc","chain+draw",["Cinderstorm Mage","Thunderclap Adept"],{tgt:"ea"})));
  add(Cr("Molten Caller",3,4,4,"","play/chain2: buff self 1 1",S("arc","chain+draw",["Ignited Lancer","Pulse Mage"])));
  add(Cr("Molten Adept",4,5,5,"","spell: buff self 1 1",S("arc","chain+draw",["Cinder Swarm","Spark Swarm Mage"])));
  add(Sp("Fulgent Ritual",3,"play: dmg t 1 | chain2: dmg t 2",S("arc","chain+draw",["Dragonfire","Overload Strike"],{tgt:"ea"})));
  add(Sp("Searing Volley",3,"play: draw 2",S("arc","chain+draw",["Fury Unleashed","Forked Lightning"])));
  add(Re("Ionized Snap",3,"play: dmg t 2 | chain2: draw 1",S("arc","chain+draw",["Wild Surge","Electrify"],{tgt:"eatk"})));
  add(Au("Fulgent Grove",3,"spell: draw 1",S("arc","chain+draw",["Everburning Brazier","Infinite Battery"])));
  setR("r");
  add(Cr("Crackling Imp",6,8,8,"","spell: dmg face 1",S("arc","chain+draw",["Searing Overlord","Spark Matriarch"])));
  add(Cr("Plasmic Elemental",6,8,8,"","spell: dmg face 1",S("arc","chain+draw",["Flame Tyrant","Charged Juggernaut"])));
  add(Sp("Arcing Rain",5,"play: draw 1 | chain2: energy 1",S("arc","chain+draw",["Chain of Flame","Overload Cascade"])));
  add(Re("Fulgent Flash",4,"play: dmg t 2 | chain2: draw 1",S("arc","chain+draw",["Pyroclasm Reflex","Lightning Reflexes"],{tgt:"eatk"})));
  add(Au("Ionized Font",5,"start/hand4: draw 1",S("arc","chain+draw",["Hearth of Embers","Tesla Coil"])));

  /* ---- ignition (20) ---- */
  setR("c");
  add(Cr("Ionized Reaver",4,6,4,"","play: dmg face 1",S("ignition","burn+haste",["Magma Golem","Static Elemental"])));
  add(Cr("Crackling Reaver",1,2,1,"haste","death: dmg all_e 1",S("ignition","burn+haste+haste",["Pyre Zealot","Plasma Sprite"])));
  add(Cr("Overcharged Raider",3,3,3,"haste","attack: dmg face 1",S("ignition","burn+haste+haste",["Flame Herald","Storm Caller"])));
  add(Cr("Molten Striker",2,3,3,"","attack: buff self 1 0 tmp",S("ignition","burn+haste",["Smokescreen Imp","Raiju"])));
  add(Cr("Searing Lancer",1,2,2,"","play: dmg t 1",S("ignition","burn+haste",["Ember Imp","Thunder Imp"],{tgt:"e"})));
  add(Sp("Ionized Rain",1,"play: dmg t 2",S("ignition","burn+haste",["Searing Blast","Jolt"],{tgt:"e"})));
  add(Sp("Plasmic Rain",2,"play: dmg t 2; draw 1",S("ignition","burn+haste",["Scorch","Overcharge Blast"],{tgt:"e"})));
  add(Re("Plasmic Snap",2,"play: dmg t 3",S("ignition","burn+haste",["Ember Shield","Surge Shield"],{tgt:"eatk"})));
  add(Re("Crackling Retort",2,"play: dmg t 3",S("ignition","burn+haste",["Flash Fire","Surge Shield"],{tgt:"eatk"})));
  add(Au("Volatile Sanctum",1,"start: zaps 1 1",S("ignition","burn+haste",["Kindling Hearth","Lightning Rod"])));
  setR("u");
  add(Cr("Searing Hound",4,5,4,"haste","edie: buff self 1 1",S("ignition","burn+haste+haste",["Inferno Charger","Thunder Ram"])));
  add(Cr("Ionized Raider",4,5,4,"haste","edie: buff self 1 1",S("ignition","burn+haste+haste",["Scorchclaw Ravager","Galvanic Golem"])));
  add(Cr("Molten Lancer",4,6,4,"","play: dmg t 5",S("ignition","burn+haste",["Solar Flare Drake","Plasma Lord"],{tgt:"e"})));
  add(Sp("Searing Torrent",3,"play: dmg t 3; draw 1",S("ignition","burn+haste",["Fireball","Thunderous Cascade"],{tgt:"e"})));
  add(Re("Volatile Riposte",3,"play: buff t 2 1 tmp",S("ignition","burn+haste",["Pyroclasm Reflex","Shockwave Counter"],{tgt:"oatk"})));
  add(Au("Crackling Grove",2,"static: lord all 1 0",S("ignition","burn+haste",["Crown of Cinders","Overload Coil"])));
  setR("r");
  add(Cr("Crackling Striker",4,5,4,"haste pierce","attack: dmg all_e 1",S("ignition","burn+haste+haste",["Flamewing Dragon","Stormbringer"])));
  add(Cr("Fulgent Hawk",6,9,6,"pierce","play: dmg t 3",S("ignition","burn+haste+pierce",["Flame Tyrant","Storm Titan"],{tgt:"e"})));
  add(Sp("Searing Storm",6,"play: dmg t 6; draw 1",S("ignition","burn+haste",["Wildfire Blaze","Chain of Storms"],{tgt:"e"})));
  add(Re("Molten Feint",4,"play: untap t",S("ignition","burn+haste",["Pyroclasm Reflex","Thunder Trap"],{tgt:"o"})));
  add(Au("Crackling Totem",4,"static: grant all haste",S("ignition","burn+haste",["Crown of Cinders","Storm Battery"])));

  /* ---- reactor (20) ---- */
  setR("c");
  add(Cr("Volatile Spirit",3,3,4,"barrier","attack: dmg face 1",S("reactor","draw+burn+barrier",["Bonfire Keeper","Voltage Hound"])));
  add(Cr("Crackling Spirit",2,3,3,"","death: dmg all_e 1",S("reactor","draw+burn",["Torchbearer","Charge Siphon"])));
  add(Cr("Ionized Weaver",3,3,4,"barrier","play: dmg face 1",S("reactor","draw+burn+barrier",["Pyre Dancer","Arc Apprentice"])));
  add(Cr("Searing Golem",2,3,3,"","death: dmg all_e 1",S("reactor","draw+burn",["Ember Duelist","Conduit Keeper"])));
  add(Cr("Charged Spirit",1,1,2,"barrier","death: dmg all_e 1",S("reactor","draw+burn+barrier",["Ember Whelp","Volt Hopper"])));
  add(Sp("Volatile Ritual",2,"play: dmg t 3",S("reactor","draw+burn",["Firebolt","Chain Spark"],{tgt:"e"})));
  add(Sp("Overcharged Rite",2,"play: dmg t 2",S("reactor","draw+burn",["Rally the Flames","Static Bolt"],{tgt:"ea"})));
  add(Re("Searing Ward",2,"play: draw 1",S("reactor","draw+burn",["Wildfire Ignition","Shock Reflex"])));
  add(Au("Plasmic Sanctum",2,"end: dmg face 1",S("reactor","draw+burn",["Furnace of Rage","Lightning Rod"])));
  setR("u");
  add(Cr("Ionized Sentinel",3,4,4,"","play: dmg face 1",S("reactor","draw+burn",["Ashwing Harrier","Voltage Wraith"])));
  add(Cr("Charged Adept",3,4,4,"","edie: buff self 1 1",S("reactor","draw+burn",["Hellforge Smith","Tempest Runner"])));
  add(Cr("Overcharged Sentinel",3,4,4,"","edie: buff self 1 1",S("reactor","draw+burn",["Flame Warden","Thunder Wolf"])));
  add(Sp("Crackling Surge",3,"play: dmg t 3; draw 1",S("reactor","draw+burn",["Combustion Wave","Static Burst"],{tgt:"e"})));
  add(Re("Arcing Ward",3,"play: draw 2",S("reactor","draw+burn",["Inferno Surge","Shockwave Counter"])));
  add(Au("Overcharged Altar",3,"end: draw 1",S("reactor","draw+burn",["Altar of Embers","Storm God's Altar"])));
  setR("r");
  add(Cr("Fulgent Spirit",5,6,7,"barrier","attack: dmg all_e 1",S("reactor","draw+burn+barrier",["Blazewing Matriarch","Sparkfire Hydra"])));
  add(Cr("Molten Serpent",5,6,7,"barrier","attack: dmg face 1",S("reactor","draw+burn+barrier",["Lavaheart Titan","Static Overlord"])));
  add(Sp("Crackling Volley",4,"play: dmg t 4; draw 1",S("reactor","draw+burn",["Dragonfire","Ion Storm"],{tgt:"e"})));

  /* ---- static (15, support) ---- */
  setR("c");
  add(Cr("Arcing Colossus",2,2,3,"barrier","play: kw ostr barrier",S("static","barrier+burn+barrier",["Blood-Fire Berserker","Volt Runner"])));
  add(Cr("Ionized Tortoise",3,2,5,"barrier","death: dmg all_e 1",S("static","barrier+burn+barrier",["Lava Hound","Bolt Thrower"])));
  add(Cr("Searing Wall",2,2,3,"barrier","death: dmg all_e 1",S("static","barrier+burn+barrier",["Phoenix Chick","Capacitor Golem"])));
  add(Cr("Fulgent Sentry",3,3,5,"","death: dmg all_e 1",S("static","barrier+burn",["Flamecaller Adept","Voltage Hound"])));
  add(Sp("Overcharged Storm",2,"play: dmg t 2",S("static","barrier+burn",["Kindle Thoughts","Zap"],{tgt:"ea"})));
  add(Re("Ionized Feint",2,"play: dmg t 3",S("static","barrier+burn",["Heat Surge","Blitz"],{tgt:"eatk"})));
  add(Au("Volatile Font",2,"start: kw ostr barrier",S("static","barrier+burn",["Smoldering Tome","Charged Coil"])));
  setR("u");
  add(Cr("Crackling Giant",3,2,5,"barrier","edie: buff self 1 1",S("static","barrier+burn+barrier",["Sun Priestess","Voltage Engineer"])));
  add(Cr("Molten Wall",3,3,5,"","attack: dmg face 1",S("static","barrier+burn",["Embercloak Assassin","Storm Shaman"])));
  add(Sp("Charged Volley",2,"play: kw t barrier; buff t 1 1",S("static","barrier+burn",["Raging Inferno","Surge of Power"],{tgt:"o"})));
  setR("r");
  add(Cr("Volatile Sentry",5,4,9,"barrier","play: dmg all_e 2",S("static","barrier+burn+barrier",["Lavaheart Titan","Volt Dragon"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.PLASMA_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["plasma"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
