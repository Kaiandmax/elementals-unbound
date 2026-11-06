/* ================= STORM CATALOG (designed confluence cards, generated first draft) =================
   Lightning + Water. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   spellstorm (25: chain + burn), downpour (20: burn + chain), thunderhead (20: chain + buff), riptide (20, support: bounce + draw), lightningrod (15: burn + barrier).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [lightning, water]. */
// Hand-revised: downpour (2026-11-06). Regenerating storm with gencatalog.js would overwrite it, so keep this block.
// Loaded by build.py inside catalogBegin("storm")/catalogEnd("storm") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.STORM_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"storm" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.STORM_CATALOG.push(d); return d; };
  setEl("storm");

  /* ---- spellstorm (25) ---- */
  setR("c");
  add(Cr("Thunder Imp",3,4,4,"","play: dmg t 3",S("downpour","chain+burn",["Bolt Thrower","Whirlpool Mage"],{tgt:"e"})));
  add(Cr("Static Serpent",2,3,3,"","play: dmg face 1",S("spellstorm","chain+burn",["Volt Runner","Mist Weaver"])));
  add(Cr("Thunder Caller",2,3,3,"","chain2: draw 1",S("spellstorm","chain+burn",["Capacitor Golem","Riverbank Sage"])));
  add(Cr("Static Sentinel",2,3,3,"","attack: dmg face 1",S("downpour","chain+burn",["Conduit Keeper","Kelp Lurker"])));
  add(Cr("Rain Golem",1,2,2,"","play/chain2: buff self 1 1",S("spellstorm","chain+burn",["Static Sprite","Brook Otter"])));
  add(Cr("Tempest Spirit",1,2,2,"","play/chain2: buff self 1 1",S("spellstorm","chain+burn",["Spark Mite","Tide Sprite"])));
  add(Sp("Cloudburst Ritual",1,"play: draw 1 | chain2: energy 1",S("spellstorm","chain+burn",["Quick Study","Ebb and Flow"])));
  add(Sp("Tempest Wave",1,"play: dmg t 1 | chain2: draw 1",S("spellstorm","chain+burn",["Overclock","Shatter"],{tgt:"e"})));
  add(Sp("Squall Rite",1,"play: dmg t 1 | chain2: dmg t 2",S("spellstorm","chain+burn",["Crackle","Tidal Insight"],{tgt:"ea"})));
  add(Re("Drenched Snap",2,"play: dmg t 2",S("spellstorm","chain+burn",["Surge Shield","Frost Snap"],{tgt:"ea"})));
  add(Re("Drenched Reflex",2,"play: dmg t 3",S("spellstorm","chain+burn",["Shockwave Counter","Riptide Counter"],{tgt:"eatk"})));
  add(Au("Cloudburst Shrine",2,"end: dmg face 1",S("spellstorm","chain+burn",["Lightning Rod","Tidal Mastery"])));
  add(Au("Cloudburst Altar",2,"end: dmg face 1",S("spellstorm","chain+burn",["Charged Coil","Sea of Clarity"])));
  setR("u");
  add(Cr("Stormtide Adept",4,5,5,"","chain2: draw 1",S("spellstorm","chain+burn",["Galvanic Sentinel","Siren of the Shoals"])));
  add(Cr("Tempest Familiar",5,6,7,"","spell: zaps 1 1",S("spellstorm","chain+burn",["Conduit Colossus","Frost Giant"])));
  add(Cr("Cloudburst Spirit",4,5,5,"","start: zaps 1 2",S("spellstorm","chain+burn",["Lightning Elemental","Coral Hydra"])));
  add(Cr("Cloudburst Shaman",4,5,5,"","attack: dmg face 1",S("spellstorm","chain+burn",["Spark Golem","Abyssal Lurker"])));
  add(Sp("Downpour Torrent",2,"play: dmg t 1 | chain2: dmg t 2",S("spellstorm","chain+burn",["Overload Strike","Riptide Reversal"],{tgt:"ea"})));
  add(Sp("Tempest Gift",2,"play: dmg all_e 1",S("spellstorm","chain+burn",["Surge of Power","Frozen Tomb"])));
  add(Re("Downpour Snap",3,"play: dmg t 3",S("spellstorm","chain+burn",["Lightning Reflexes","Reverse Current"],{tgt:"ea"})));
  add(Au("Squall Shrine",3,"end/spell2: zaps 1 2",S("spellstorm","chain+burn",["Storm God's Altar","Permafrost Shrine"])));
  setR("r");
  add(Cr("Rolling Sentinel",6,8,8,"","chain2: draw 1",S("spellstorm","chain+burn",["Storm Titan","Deepsea Hydra"])));
  add(Cr("Downpour Caller",5,7,7,"","play: dmg face 1",S("spellstorm","chain+burn",["Spark Matriarch","Deep One Elder"])));
  add(Cr("Rain Imp",5,7,7,"","play/chain2: buff self 1 1",S("spellstorm","chain+burn",["Charged Juggernaut","Leviathan Elder"])));
  add(Sp("Drenched Gift",5,"play: dmg t 5; draw 1",S("spellstorm","chain+burn",["Ion Storm","Glacial Cataclysm"],{tgt:"e"})));
  add(Re("Rolling Snap",4,"play: dmg t 2 | chain2: draw 1",S("spellstorm","chain+burn",["Thunder Trap","Frozen Moment"],{tgt:"eatk"})));
  add(Au("Thunder Engine",4,"end/spell2: zaps 1 2",S("spellstorm","chain+burn",["Infinite Battery","Eternal Winter"])));

  /* ---- downpour (20): cheap spells fall like rain; bodies grow with each one and Chain 2 pays off. Water's freeze, Lightning's haste. ---- */
  setR("c");
  add(Cr("Rolling Raider",2,3,3,"haste","",S("downpour","haste+chain",["Lightning Courier","Rime Watcher"])));
  add(Cr("Stormtide Raider",3,4,3,"","play: freeze t | play/chain2: dmg t 2",S("downpour","burn+freeze",["Arc Apprentice","Reef Guardian"],{tgt:"e"})));
  add(Cr("Cloudburst Reaver",2,2,3,"","spell: buff self 1 1",S("downpour","burn+chain",["Flicker Mage","Pearl Diver"])));
  add(Cr("Thunder Raider",4,5,4,"","play: dmg t 3",S("downpour","burn+chain",["Thunder Ram","Sea Serpent"],{tgt:"e"})));
  add(Cr("Rolling Brute",1,2,2,"","spell: buff self 1 1",S("downpour","burn+chain",["Storm Caller","Winter Mage"])));
  add(Sp("Stormtide Burst",1,"play: dmg t 2 | play/chain2: draw 1",S("downpour","burn+chain",["Charge Conduit","Ebb and Flow"],{tgt:"ea"})));
  add(Sp("Rolling Rite",2,"play: dmg t 2; freeze t",S("downpour","burn+freeze",["Chain Lightning","Flowing Wisdom"],{tgt:"e"})));
  add(Re("Tempest Flash",2,"play: freeze t; dmg t 2",S("downpour","burn+chain",["Surge Shield","Icy Grip"],{tgt:"eatk"})));
  add(Re("Downpour Trap",1,"play: freeze t | play/chain2: draw 1",S("downpour","freeze+chain",["Blitz","Chill"],{tgt:"eatk"})));
  add(Au("Static Sanctum",2,"end/spell2: dmg face 2",S("spellstorm","burn+chain",["Lightning Rod","Tidal Archive"])));
  add(Au("Tempest Font",2,"start: zaps 2 1",S("spellstorm","burn+chain",["Overload Coil","Healing Spring"])));
  setR("u");
  add(Cr("Thunder Hound",4,5,6,"","spell: dmg rnd 1",S("downpour","burn+chain",["Capacitor Titan","Icewall Colossus"])));
  add(Cr("Cloudburst Wolf",3,4,4,"haste","spell: buff self 1 0",S("downpour","haste+chain",["Voltage Wraith","Wavecrest Mage"])));
  add(Cr("Cloudburst Lancer",3,4,5,"","spell: freeze rnd",S("downpour","burn+freeze",["Pulse Mage","Tideborn Knight"])));
  add(Sp("Squall Torrent",3,"play: dmg t 3; draw 1",S("downpour","burn+chain",["Forked Lightning","Crashing Wave"],{tgt:"ea"})));
  add(Sp("Cloudburst Volley",3,"play: zaps 3 1 | play/chain2: zaps 2 1",S("downpour","burn+chain",["Overload Cascade","Cold Snap"])));
  add(Re("Downpour Feint",2,"play: freeze t; dmg t 3 | play/chain2: draw 1",S("downpour","burn+freeze",["Shockwave Counter","Nullify"],{tgt:"eatk"})));
  add(Au("Stormtide Field",3,"spell: zaps 1 1",S("downpour","burn+chain",["Storm Battery","Ocean's Blessing"])));
  setR("r");
  add(Cr("Rolling Reaver",5,5,6,"haste","spell: buff self 1 1",S("downpour","haste+chain",["Volt Dragon","Tidal Archmage"])));
  add(Cr("Drenched Raider",6,7,7,"","spell: dmg all_e 1",S("downpour","burn+chain",["Storm Titan","Shoal Leviathan"])));
  add(Sp("Rolling Burst",5,"play: dmg t 5; freeze all_e",S("downpour","burn+freeze",["Thunderous Cascade","Glacial Torrent"],{tgt:"e"})));
  add(Re("Downpour Flash",4,"play: dmg t 4 | play/chain2: draw 2",S("downpour","burn+chain",["Lightning Reflexes","Ice Prison"],{tgt:"ea"})));
  add(Au("Static Grove",4,"static: cost spell 1",S("downpour","burn+chain",["Storm Battery","Eternal Winter"])));

  /* ---- thunderhead (20) ---- */
  setR("c");
  add(Cr("Stormtide Charger",1,2,1,"barrier","play: buff ostr 1 1",S("thunderhead","chain+buff+barrier",["Volt Hopper","Coral Crab"])));
  add(Cr("Static Duelist",3,4,3,"barrier","play: dmg t 1 | chain2: dmg t 1",S("thunderhead","chain+buff+barrier",["Tesla Knight","Tide Caller"],{tgt:"ea"})));
  add(Cr("Downpour Raider",1,2,2,"","play: buff self 1 1",S("thunderhead","chain+buff",["Plasma Sprite","Frost Sprite"])));
  add(Cr("Drenched Brute",3,5,3,"","chain2: draw 1",S("thunderhead","chain+buff",["Voltage Hound","Frostbite Shade"])));
  add(Cr("Tempest Reaver",2,3,2,"barrier","play: dmg t 1 | chain2: dmg t 1",S("thunderhead","chain+buff+barrier",["Raiju","Tidepool Healer"],{tgt:"ea"})));
  add(Sp("Stormtide Wave",1,"play: dmg t 1 | chain2: draw 1",S("thunderhead","chain+buff",["Static Bolt","Soothing Rain"],{tgt:"e"})));
  add(Sp("Static Rite",1,"play: buff t 1 1",S("thunderhead","chain+buff",["Lightning Bolt","Whirlpool Trap"],{tgt:"o"})));
  add(Re("Stormtide Guard",2,"play: dmg t 2 | chain2: draw 1",S("thunderhead","chain+buff",["Shock Reflex","Dispel"],{tgt:"eatk"})));
  add(Re("Rain Retort",2,"play: dmg t 2 | chain2: draw 1",S("thunderhead","chain+buff",["Electrify","Sudden Current"],{tgt:"eatk"})));
  add(Au("Rain Grove",1,"start: buff ostr 1 1",S("thunderhead","chain+buff",["Charged Coil","Tidal Mastery"])));
  setR("u");
  add(Cr("Static Reaver",3,4,3,"barrier","spell: zaps 1 1",S("thunderhead","chain+buff+barrier",["Storm Shaman","Kraken Spawn"])));
  add(Cr("Thunder Drake",4,5,4,"barrier","creature: buff self 1 1",S("thunderhead","chain+buff+barrier",["Spark Swarm Mage","Pearl Sovereign"])));
  add(Cr("Rain Hound",3,4,3,"barrier","spell: buff self 1 1",S("thunderhead","chain+buff+barrier",["Thunder Wolf","Deep Oracle"])));
  add(Sp("Rolling Torrent",3,"play: buff t 3 0; kw t pierce",S("thunderhead","chain+buff",["Battery Dump","Great Ebb"],{tgt:"o"})));
  add(Re("Rolling Feint",3,"play: buff t 2 2 tmp",S("thunderhead","chain+buff",["Grounding","Absolute Zero"],{tgt:"o"})));
  add(Au("Static Altar",2,"start: buff ostr 2 0 tmp",S("thunderhead","chain+buff",["Overload Coil","Sea of Clarity"])));
  setR("r");
  add(Cr("Drenched Charger",5,8,6,"","play: buff ostr 1 1",S("thunderhead","chain+buff",["Static Overlord","Coral Titan"])));
  add(Cr("Stormtide Striker",4,6,4,"barrier","attack: buff self 1 0 tmp",S("thunderhead","chain+buff+barrier",["Thunderhead Golem","Frostfang Wyrm"])));
  add(Sp("Thunder Blast",5,"play: buff t 5 0; kw t pierce",S("thunderhead","chain+buff",["Lightning Helix","Glacial Cataclysm"],{tgt:"o"})));
  add(Re("Rolling Riposte",4,"play: buff t 2 2 tmp",S("thunderhead","chain+buff",["Thunder Trap","Reverse Current"],{tgt:"oatk"})));
  add(Au("Cloudburst Engine",6,"start: buff ostr 2 0 tmp",S("thunderhead","chain+buff",["Tesla Coil","Eternal Winter"])));

  /* ---- riptide (20, support) ---- */
  setR("c");
  add(Cr("Tempest Guardian",2,2,3,"ward","play: draw 1",S("riptide","bounce+draw+ward",["Flicker Mage","Riptide Rogue"])));
  add(Cr("Squall Sentry",3,3,5,"","play: draw 1",S("riptide","bounce+draw",["Tempest Runner","Bubble Mage"])));
  add(Cr("Thunder Guardian",2,2,3,"ward","play: bounce t",S("riptide","bounce+draw+ward",["Conduit Keeper","Tidecaller Shaman"],{tgt:"e:cost<=2"})));
  add(Cr("Stormtide Giant",1,1,2,"ward","play: draw 1",S("riptide","bounce+draw+ward",["Thunder Imp","Tide Sprite"])));
  add(Cr("Rain Watcher",4,3,7,"","play: bounce t",S("riptide","bounce+draw",["Static Elemental","Leviathan Calf"],{tgt:"o"})));
  add(Sp("Tempest Storm",2,"play: bounce t; energy 2",S("riptide","bounce+draw",["Thunder Lance","Tidal Insight"],{tgt:"o"})));
  add(Sp("Squall Surge",1,"play: bounce t",S("riptide","bounce+draw",["Spark Surge","Deep Insight"],{tgt:"e"})));
  add(Re("Thunder Ward",2,"play: bounce t",S("riptide","bounce+draw",["Blitz","Whiplash Tide"],{tgt:"eatk"})));
  add(Au("Downpour Sanctum",2,"start/hand4: draw 1",S("riptide","bounce+draw",["Lightning Rod","Healing Spring"])));
  setR("u");
  add(Cr("Rain Sentry",2,2,4,"","death: draw 1",S("riptide","bounce+draw",["Charge Siphon","Glacier Wolf"])));
  add(Cr("Static Watcher",2,2,3,"ward","ebounce: draw 1",S("riptide","bounce+draw+ward",["Arc Duelist","Pearlguard Sentinel"])));
  add(Cr("Rain Tortoise",2,2,3,"ward","ebounce: draw 1",S("riptide","bounce+draw+ward",["Bolt Knight","Abyss Watcher"])));
  add(Sp("Thunder Surge",2,"play: draw 1",S("riptide","bounce+draw",["Lightning Volley","Crashing Wave"])));
  add(Re("Static Reflex",3,"play: bounce t",S("riptide","bounce+draw",["Grounding","Counterflow"],{tgt:"eatk"})));
  add(Au("Rain Altar",3,"end: draw 1",S("riptide","bounce+draw",["Infinite Battery","Ocean's Blessing"])));
  setR("r");
  add(Cr("Cloudburst Wall",5,4,9,"ward","play: bounce t; draw 1",S("riptide","bounce+draw+ward",["Stormbringer","Glacial Empress"],{tgt:"e"})));
  add(Cr("Downpour Warden",6,5,11,"","play: bounce t; draw 1",S("riptide","bounce+draw",["Static Overlord","Leviathan Elder"],{tgt:"e"})));
  add(Sp("Stormtide Torrent",4,"play: draw 2; heal 2",S("riptide","bounce+draw",["Ion Storm","Glacial Torrent"])));

  /* ---- lightningrod (15) ---- */
  setR("c");
  add(Cr("Squall Hound",2,3,2,"barrier","play: dmg t 2",S("lightningrod","burn+barrier+barrier",["Volt Runner","Riverbank Sage"],{tgt:"e"})));
  add(Cr("Downpour Hound",1,2,2,"","attack: dmg face 1",S("lightningrod","burn+barrier",["Volt Hopper","Brook Otter"])));
  add(Cr("Drenched Duelist",3,4,3,"barrier","attack: dmg face 1",S("lightningrod","burn+barrier+barrier",["Bolt Thrower","Coral Warden"])));
  add(Cr("Rain Duelist",4,5,4,"barrier","play: kw ostr barrier",S("lightningrod","burn+barrier+barrier",["Galvanic Golem","Harbor Golem"])));
  add(Sp("Rain Blast",1,"play: kw own barrier",S("lightningrod","burn+barrier",["Overcharge Blast","Ebb and Flow"])));
  add(Re("Drenched Ward",2,"play: kw t barrier; dmg str 1",S("lightningrod","burn+barrier",["Shock Reflex","Undertow"],{tgt:"o"})));
  add(Au("Downpour Totem",2,"start: zaps 1 1",S("lightningrod","burn+barrier",["Charged Coil","Tidal Archive"])));
  setR("u");
  add(Cr("Static Charger",3,5,3,"","start: kw ostr barrier",S("lightningrod","burn+barrier",["Voltage Engineer","Wave Dancer"])));
  add(Cr("Stormtide Hound",4,6,4,"","play: kw t barrier",S("lightningrod","burn+barrier",["Lightning Hydra","Wavebreaker Champion"],{tgt:"o"})));
  add(Sp("Squall Ritual",2,"play: dmg all_e 1",S("lightningrod","burn+barrier",["Static Burst","Riptide Reversal"])));
  setR("r");
  add(Cr("Downpour Striker",6,9,6,"barrier","play: kw ostr barrier",S("lightningrod","burn+barrier+barrier",["Sparkfire Hydra","Deepsea Hydra"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.STORM_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["storm"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
