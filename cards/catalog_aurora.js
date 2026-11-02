/* ================= AURORA CATALOG (designed confluence cards, pilot) =================
   Fire + Water + Lightning. 100 designed cards that replace Aurora's formula fusions (design/confluence-cards.md, design/confluence-slots.md).
   NOT loaded by build.py yet: it goes in once Balance has priced it and Game Dev's Forge reads catalogs.
   Each card: th = theme, tr = trait pair, sig = signature recipe [Fire card, Water card, Lightning card].
   Themes: radiance (archetype: Manifest payoffs), prism (small creatures that grow while you gain charge), spectrum (spell chains),
   shimmer (Barrier, freeze and healing; the answers), dawnfire (burn that only grows once Manifests have been cast).
   Aurora's charge rules: one card per rarity gives 3+ charge on its own (Gather Light, Charge the Sky, Cascade of Dawn); every other
   card gives at most 1; no card gives charge and draws; "Manifests cast" checks are thresholds; board-wide damage at most 2. */
const AURORA_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"aurora" }; return o; };
  const add = d => { Object.assign(d, M); AURORA_CATALOG.push(d); return d; };
  setEl("aurora");

  /* ---- Radiance (25) ---- */
  setR("c");
  add(Cr("Aurora Acolyte",2,2,3,"","manifest: buff self 2 2",S("radiance","charge+study",["Torchbearer","Brook Otter","Static Sprite"])));
  add(Cr("Lightweaver",3,3,4,"","play: charge 1",S("radiance","charge+study",["Ember Scholar","Bubble Mage","Conduit Keeper"])));
  add(Cr("Dawn Watcher",1,1,2,"","manifest: draw 1",S("radiance","charge+draw",["Ember Imp","Tide Sprite","Spark Mite"])));
  add(Cr("Radiant Herald",3,3,4,"","play/mani1: draw 2",S("radiance","charge+draw",["Flame Herald","Deepwater Scholar","Storm Caller"])));
  add(Cr("Glowkeeper",3,2,5,"barrier","manifest: heal 2",S("radiance","barrier+heal",["Bonfire Keeper","Reef Guardian","Capacitor Golem"])));
  add(Sp("Gather Light",2,"play: charge 3",S("radiance","charge+study",["Kindle Thoughts","Ebb and Flow","Charge Conduit"])));
  add(Sp("Refracted Bolt",2,"play: dmg t 2 | play/mani2: dmg t 2",S("radiance","burn+charge",["Firebolt","Shatter","Static Bolt"],{tgt:"ea"})));
  add(Sp("Northern Study",2,"play: draw 2 | play/mani1: heal 2",S("radiance","charge+draw",["Blaze of Insight","Flowing Wisdom","Quick Study"])));
  add(Re("Prismatic Shield",1,"play: buff t 1 2 tmp | play/mani1: kw t barrier",S("radiance","barrier+shield",["Ember Shield","Tidal Shield","Surge Shield"],{tgt:"o"})));
  add(Re("Flash of Dawn",2,"play: dmg t 3; charge 1",S("radiance","burn+charge",["Heat Surge","Chill","Shock Reflex"],{tgt:"eatk"})));
  add(Au("Northern Lights",2,"manifest: draw 1; dmg face 1",S("radiance","charge+draw",["Smoldering Tome","Tidal Archive","Charged Coil"])));
  add(Au("Lightwell",3,"start: charge 1",S("radiance","charge+tide",["Hearth of Embers","Healing Spring","Lightning Rod"])));
  setR("u");
  add(Cr("Polar Lightbringer",6,6,9,"","manifest: dmg all_e 1",S("radiance","burn+charge",["Flame Warden","Coral Hydra","Lightning Elemental"])));
  add(Cr("Spectrum Djinn",4,5,5,"","play/mani2: buff self 2 2",S("radiance","size+charge",["Inferno Charger","Pearl Sovereign","Spark Golem"])));
  add(Cr("Dawnglass Seer",3,3,4,"","manifest: charge 1",S("radiance","charge+study",["Sun Priestess","Deep Oracle","Pulse Mage"])));
  add(Sp("Borealis Surge",2,"play: draw 2 | play/mani1: energy 1",S("radiance","charge+draw",["Fury Unleashed","Deep Insight","Surge of Power"])));
  add(Sp("Charge the Sky",5,"play: charge 6",S("radiance","charge+study",["Stoke the Coals","Tidal Insight","Battery Dump"])));
  add(Re("Flash of Insight",1,"play: draw 1 | play/mani1: draw 1",S("radiance","charge+draw",["Flash Fire","Frozen Aegis","Electrify"])));
  add(Au("Celestial Battery",3,"manifest: energy 1",S("radiance","charge+fuel",["Everburning Brazier","Tidal Mastery","Overload Coil"])));
  setR("r");
  add(Cr("Aurora Seraph",5,6,7,"","manifest: buff own 1 1",S("radiance","fury+charge",["Blazewing Matriarch","Siren Queen","Spark Matriarch"])));
  add(Cr("Starlit Leviathan",6,7,10,"ward","manifest: heal 3",S("radiance","size+ward",["Lavaheart Titan","Leviathan Elder","Storm Titan"])));
  add(Sp("Cascade of Dawn",2,"play: charge 5",S("radiance","charge+study",["Pyre Ascension","Tidal Scroll","Flash of Genius"])));
  add(Re("Lightning Insight",2,"play: dmg t 2 | play/mani2: draw 2",S("radiance","burn+draw",["Inferno Surge","Frozen Moment","Lightning Reflexes"],{tgt:"ea"})));
  add(Au("Crown of Auroras",3,"manifest: dmg all_e 1; dmg face 1",S("radiance","burn+charge",["Altar of Embers","Ocean's Blessing","Storm God's Altar"])));
  add(Au("Eternal Lantern",4,"static: bank 2 | manifest: draw 1",S("radiance","charge+draw",["Crown of Cinders","Sea of Clarity","Infinite Battery"])));

  /* ---- Prism (20) ---- */
  setR("c");
  add(Cr("Prism Sprite",1,1,2,"","charge: buff self 1 0 tmp",S("prism","fury+charge",["Ember Whelp","Frost Sprite","Static Sprite"])));
  add(Cr("Glintwing",2,3,2,"haste","",S("prism","haste+haste",["Reckless Raider","Riptide Rogue","Volt Runner"])));
  add(Cr("Chroma Hound",3,3,3,"","charge: buff self 1 1",S("prism","fury+charge",["Lava Hound","Glacier Wolf","Voltage Hound"])));
  add(Cr("Shardlight Imp",1,2,1,"","play: charge 1",S("prism","fury+charge",["Molten Hatchling","Coral Crab","Volt Hopper"])));
  add(Cr("Spectral Raider",2,2,2,"haste","charge: buff self 1 0 tmp",S("prism","haste+charge",["Ember Duelist","Pearl Diver","Arc Duelist"])));
  add(Cr("Prism Knight",4,4,5,"pierce","play: charge 1",S("prism","pierce+charge",["Firebrand Knight","Tideborn Knight","Tesla Knight"])));
  add(Sp("Refraction",1,"play: buff t 2 1; charge 1",S("prism","fury+charge",["Flare Up","Ebb and Flow","Overclock"],{tgt:"o"})));
  add(Re("Glint",1,"play: buff t 2 1 tmp",S("prism","fury+haste",["Heat Surge","Tidal Shield","Blitz"],{tgt:"oatk"})));
  add(Re("Flashstep",2,"play: buff t 1 2 tmp; charge 1",S("prism","shield+charge",["Wild Surge","Deflect","Grounding"],{tgt:"o"})));
  add(Au("Prismatic Field",3,"static: lord all 1 0",S("prism","fury+charge",["Kindling Hearth","Permafrost Shrine","Charged Coil"])));
  setR("u");
  add(Cr("Spectrum Lancer",3,4,3,"haste","charge: buff self 1 0 tmp",S("prism","haste+charge",["Ignited Lancer","Narwhal Lancer","Bolt Knight"])));
  add(Cr("Rainbow Serpent",4,4,6,"","charge: buff self 1 1",S("prism","size+charge",["Living Wildfire","Sea Serpent","Ion Drake"])));
  add(Cr("Halo Duelist",2,3,3,"barrier","",S("prism","fury+barrier",["Scorchborn Duelist","Mist Weaver","Raiju"])));
  add(Sp("Prism Burst",2,"play: buff own 1 1 tmp; charge 1",S("prism","fury+charge",["Rally the Flames","Crashing Wave","Overload Strike"])));
  add(Re("Refracted Strike",2,"play: double t",S("prism","fury+haste",["Backdraft","Sudden Current","Lightning Reflexes"],{tgt:"oatk"})));
  add(Au("Chromatic Banner",3,"charge: buff own 1 0 tmp",S("prism","fury+charge",["Furnace of Rage","Tidal Mastery","Storm Battery"])));
  setR("r");
  add(Cr("Prism Drake",5,5,6,"haste","charge: buff self 1 0 tmp",S("prism","haste+charge",["Flamewing Dragon","Frostfang Wyrm","Volt Dragon"])));
  add(Cr("Lightbound Champion",4,5,5,"pierce","charge: buff self 1 1",S("prism","pierce+charge",["Inferno Champion","Wavebreaker Champion","Raiden's Champion"])));
  add(Re("Spectrum Flash",2,"play: buff t 3 3 tmp; kw t barrier",S("prism","fury+barrier",["Pyroclasm Reflex","Reverse Current","Thunder Trap"],{tgt:"o"})));
  add(Au("Prism Crown",4,"static: lord all 1 1",S("prism","fury+charge",["Crown of Cinders","Eternal Winter","Storm God's Altar"])));

  /* ---- Spectrum (20) ---- */
  setR("c");
  add(Cr("Arcflame Adept",3,2,3,"","play: dmg t 1 | chain2: dmg t 1",S("spectrum","burn+chain",["Flamecaller Adept","Winter Mage","Arc Apprentice"],{tgt:"ea"})));
  add(Cr("Flicker Pyromancer",2,2,2,"","spell: dmg face 1",S("spectrum","burn+chain",["Apprentice Pyromancer","Riverbank Sage","Flicker Mage"])));
  add(Cr("Spellglass Scholar",2,1,3,"","chain2: draw 1",S("spectrum","study+chain",["Ember Scholar","Pearl Diver","Lightning Courier"])));
  add(Cr("Ribbon Caster",4,3,5,"","spell: zaps 1 1",S("spectrum","burn+chain",["Cinder Swarm","Wavecrest Mage","Spark Swarm Mage"])));
  add(Cr("Spark Familiar",1,1,1,"","spell: buff self 1 1",S("spectrum","fury+chain",["Ember Imp","Brook Otter","Volt Hopper"])));
  add(Sp("Spectral Zap",1,"play: dmg t 1 | chain2: dmg t 2",S("spectrum","burn+chain",["Searing Spark","Chill","Zap"],{tgt:"ea"})));
  add(Sp("Color Burst",2,"play: dmg t 2 | chain2: draw 1",S("spectrum","burn+chain",["Scorch","Frozen Tomb","Jolt"],{tgt:"e"})));
  add(Sp("Quick Spectrum",1,"play: draw 1 | chain2: dmg face 1",S("spectrum","study+chain",["Flame Lash","Ebb and Flow","Quick Study"])));
  add(Sp("Prism Volley",3,"play: zaps 3 1",S("spectrum","burn+chain",["Combust","Crashing Wave","Spark Surge"])));
  add(Re("Arc Reflex",1,"play: dmg t 2 | chain2: dmg t 1",S("spectrum","burn+chain",["Flash Fire","Icy Grip","Shock Reflex"],{tgt:"eatk"})));
  add(Au("Spectrum Lens",2,"spell: zaps 1 1",S("spectrum","burn+chain",["Smoldering Tome","Sea of Clarity","Lightning Rod"])));
  setR("u");
  add(Cr("Chain Weaver",3,3,4,"","play/chain2: dmg all_e 1",S("spectrum","burn+chain",["Flame Herald","Hydromancer","Storm Weaver"])));
  add(Cr("Spectrum Savant",2,2,3,"","spell/chain2: draw 1",S("spectrum","study+chain",["Firebrand Zealot","Tidecaller Shaman","Arcbolt Savant"])));
  add(Cr("Stormglass Golem",5,5,7,"","spell: buff self 1 1",S("spectrum","size+chain",["Kiln Golem","Harbor Golem","Galvanized Brute"])));
  add(Sp("Forked Aurora",5,"play: dmg t 4; dmg weak 2",S("spectrum","burn+chain",["Twin Bolts","Shatter","Forked Lightning"],{tgt:"ea"})));
  add(Sp("Spectral Insight",4,"play: draw 3; dmg face 1",S("spectrum","study+chain",["Burning Vision","Deep Insight","Flash of Genius"])));
  add(Re("Spectral Reflex",2,"play: dmg t 3 | chain2: draw 1",S("spectrum","burn+chain",["Backdraft","Whiplash Tide","Electrify"],{tgt:"eatk"})));
  setR("r");
  add(Cr("Spectrum Archmage",4,4,6,"","spell: zaps 1 2",S("spectrum","burn+chain",["Ember Queen","Tidal Archmage","Tempest Archon"])));
  add(Cr("Chain Phoenix",3,3,3,"haste","play/chain2: draw 1",S("spectrum","haste+chain",["Ashborn Phoenix","Frost Phoenix","Voltaic Phoenix"])));
  add(Sp("Cascade of Colors",3,"play: zaps 4 1",S("spectrum","burn+chain",["Chain of Flame","Great Ebb","Chain of Storms"])));

  /* ---- Shimmer (20) ---- */
  setR("c");
  add(Cr("Shimmer Guard",2,1,4,"barrier","",S("shimmer","barrier+wall",["Brimstone Guard","Rime Watcher","Conduit Keeper"])));
  add(Cr("Frostlight Warden",3,2,5,"","play: freeze t",S("shimmer","freeze+barrier",["Bonfire Keeper","Winter Mage","Arc Apprentice"],{tgt:"e"})));
  add(Cr("Lumen Crab",1,1,3,"barrier","",S("shimmer","barrier+shell",["Molten Hatchling","Coral Crab","Spark Mite"])));
  add(Cr("Polar Guardian",4,3,7,"","start: mend self all",S("shimmer","mend+wall",["Firebrand Knight","Icewall Colossus","Galvanic Sentinel"])));
  add(Cr("Haloed Healer",2,2,3,"","play: mend own 2; heal 1",S("shimmer","mend+heal",["Torchbearer","Tidepool Healer","Capacitor Golem"])));
  add(Cr("Glacial Sentinel",5,4,8,"barrier","block: dmg face 1",S("shimmer","barrier+wall",["Magma Golem","Shiver Elemental","Galvanized Brute"])));
  add(Re("Shimmer Ward",1,"play: kw t barrier",S("shimmer","barrier+shield",["Ember Shield","Frozen Aegis","Surge Shield"],{tgt:"o"})));
  add(Re("Cold Light",2,"play: freeze t; heal 2",S("shimmer","freeze+heal",["Heat Surge","Frost Snap","Grounding"],{tgt:"eatk"})));
  add(Re("Lantern Glare",1,"play: freeze t; dmg t 1",S("shimmer","freeze+burn",["Wildfire Ignition","Chill","Shock Reflex"],{tgt:"eatk"})));
  add(Au("Halo Shrine",3,"start: mend own 1; heal 1",S("shimmer","mend+heal",["Hearth of Embers","Permafrost Shrine","Lightning Rod"])));
  setR("u");
  add(Cr("Aurora Bastion",4,3,8,"barrier","start: mend self all",S("shimmer","barrier+mend",["Emberlord Captain","Icewall Colossus","Galvanic Sentinel"])));
  add(Cr("Frost Prism Mage",3,3,4,"","play: freeze t; kw ostr barrier",S("shimmer","freeze+barrier",["Cinderstorm Mage","Hydromancer","Pulse Mage"],{tgt:"e"})));
  add(Cr("Radiant Medic",2,2,4,"","play: mend own all",S("shimmer","mend+heal",["Phoenix Chick","Tidecaller Shaman","Charge Siphon"])));
  add(Sp("Polar Shelter",3,"play: kw own barrier",S("shimmer","barrier+shield",["Combustion Wave","Healing Torrent","Static Burst"])));
  add(Re("Frozen Halo",2,"play: freeze t; kw ostr barrier",S("shimmer","freeze+barrier",["Ember Shield","Absolute Zero","Shockwave Counter"],{tgt:"eatk"})));
  add(Au("Borealis Wall",3,"static: lord all 0 2",S("shimmer","barrier+wall",["Furnace of Rage","Healing Spring","Overload Coil"])));
  setR("r");
  add(Cr("Glacial Seraph",5,4,9,"barrier","start: freeze str",S("shimmer","freeze+barrier",["Ignis, the Undying","Glacial Empress","Thunderhead Golem"])));
  add(Cr("Lantern Titan",6,6,11,"ward","start: mend own 2",S("shimmer","mend+ward",["Magma Behemoth","Coral Titan","Capacitor Titan"])));
  add(Sp("Absolute Shimmer",5,"play: freeze all_e; heal 3",S("shimmer","freeze+heal",["Firestorm Ritual","Glacial Cataclysm","Thunderous Cascade"])));
  add(Re("Prism Prison",2,"play: freeze t; freeze str",S("shimmer","freeze+barrier",["Inferno Surge","Ice Prison","Thunder Trap"],{tgt:"eatk"})));

  /* ---- Dawnfire (15) ---- */
  setR("c");
  add(Cr("Dawnfire Imp",1,2,1,"","play/mani1: dmg face 1",S("dawnfire","burn+manifest",["Ember Imp","Tide Sprite","Thunder Imp"])));
  add(Cr("Ember Lantern",2,2,3,"","manifest: zaps 1 2",S("dawnfire","burn+manifest",["Ashen Brawler","Kelp Lurker","Volt Runner"])));
  add(Cr("Sunrise Brute",2,3,2,"","play/mani2: dmg face 1",S("dawnfire","burn+manifest",["Kiln Golem","Sea Serpent","Conduit Colossus"])));
  add(Sp("Morning Blaze",4,"play: dmg all_e 1 | play/mani2: dmg all_e 1",S("dawnfire","burn+manifest",["Raging Inferno","Soothing Rain","Crackle"])));
  add(Sp("Sunbolt",1,"play: dmg t 1 | play/mani1: dmg t 2",S("dawnfire","burn+manifest",["Firebolt","Ebb and Flow","Lightning Bolt"],{tgt:"ea"})));
  add(Au("Kindled Sky",4,"manifest: dmg face 2",S("dawnfire","burn+manifest",["Kindling Hearth","Tidal Archive","Charged Coil"])));
  add(Au("Dawn Pyre",3,"start/mani2: zaps 1 2",S("dawnfire","burn+manifest",["Hearth of Embers","Tidal Archive","Overload Coil"])));
  setR("u");
  add(Cr("Daybreak Drake",4,4,5,"","play/mani1: dmg t 2",S("dawnfire","burn+manifest",["Solar Flare Drake","Storm Narwhal","Ion Drake"],{tgt:"ea"})));
  add(Cr("Morningstar Golem",4,5,6,"","manifest: buff self 2 0",S("dawnfire","size+manifest",["Magma Golem","Harbor Golem","Spark Golem"])));
  add(Cr("Sunfire Shaman",3,3,4,"","manifest: zaps 2 1",S("dawnfire","burn+manifest",["Pyre Zealot","Wave Dancer","Storm Shaman"])));
  add(Sp("Solar Judgment",3,"play: dmg t 3 | play/mani2: dmg t 3",S("dawnfire","burn+manifest",["Fireball","Crashing Wave","Thunder Lance"],{tgt:"e"})));
  add(Au("Dawnfire Altar",4,"start/mani1: dmg face 1",S("dawnfire","burn+manifest",["Altar of Embers","Sea of Clarity","Tesla Coil"])));
  setR("r");
  add(Cr("Sunrise Wyrm",6,7,8,"pierce","play/mani2: dmg all_e 2",S("dawnfire","burn+manifest",["Flame Tyrant","Deepsea Hydra","Storm Titan"])));
  add(Cr("Phoenix of Dawn",5,5,6,"","play/mani1: dmg face 2; heal 2",S("dawnfire","burn+manifest",["Pyrelord Vexis","Siren Queen","Plasma Lord"])));
  add(Sp("Daybreak",6,"play: dmg all_e 2 | play/mani3: dmg face 3",S("dawnfire","burn+manifest",["Wildfire Blaze","Glacial Torrent","Ion Storm"])));
})();
