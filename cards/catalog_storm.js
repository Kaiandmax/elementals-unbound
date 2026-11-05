/* ================= STORM CATALOG (designed confluence cards, generated first draft) =================
   Lightning + Water. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   spellstorm (25: chain + burn), downpour (20: draw + chain), thunderhead (20: chain + buff), riptide (20, support: bounce + draw), lightningrod (15: burn + barrier).
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [lightning, water]. */
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
  add(Cr("Thunder Imp",3,4,4,"","play: dmg t 3",S("spellstorm","chain+burn",["Bolt Thrower","Whirlpool Mage"],{tgt:"e"})));
  add(Cr("Static Serpent",2,3,3,"","play: dmg face 1",S("spellstorm","chain+burn",["Volt Runner","Mist Weaver"])));
  add(Cr("Thunder Caller",2,3,3,"","chain2: draw 1",S("spellstorm","chain+burn",["Capacitor Golem","Riverbank Sage"])));
  add(Cr("Static Sentinel",2,3,3,"","attack: dmg face 1",S("spellstorm","chain+burn",["Conduit Keeper","Kelp Lurker"])));
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

  /* ---- downpour (20) ---- */
  setR("c");
  add(Cr("Rolling Adept",2,3,3,"","death: draw 1",S("downpour","draw+chain",["Lightning Courier","Rime Watcher"])));
  add(Cr("Cloudburst Elemental",3,4,4,"","chain2: draw 1",S("downpour","draw+chain",["Voltage Hound","Reef Guardian"])));
  add(Cr("Cloudburst Golem",2,3,3,"","chain2: draw 1",S("downpour","draw+chain",["Flicker Mage","Pearl Diver"])));
  add(Cr("Thunder Adept",4,5,5,"","death: draw 1",S("downpour","draw+chain",["Galvanic Golem","Harbor Golem"])));
  add(Cr("Rolling Caller",3,4,4,"","play/chain2: buff self 1 1",S("downpour","draw+chain",["Arc Apprentice","Winter Mage"])));
  add(Sp("Stormtide Burst",1,"play: draw 1",S("downpour","draw+chain",["Charge Conduit","Ebb and Flow"])));
  add(Sp("Rolling Rite",1,"play: draw 1 | chain2: energy 1",S("downpour","draw+chain",["Chain Lightning","Flowing Wisdom"])));
  add(Re("Tempest Flash",3,"play: draw 1; buff t 0 2 tmp",S("downpour","draw+chain",["Surge Shield","Icy Grip"],{tgt:"o"})));
  add(Re("Downpour Trap",2,"play: dmg t 2 | chain2: draw 1",S("downpour","draw+chain",["Blitz","Chill"],{tgt:"eatk"})));
  add(Au("Static Sanctum",3,"end: draw 1",S("downpour","draw+chain",["Lightning Rod","Tidal Archive"])));
  add(Au("Tempest Font",2,"start/hand4: draw 1",S("downpour","draw+chain",["Overload Coil","Healing Spring"])));
  setR("u");
  add(Cr("Thunder Shaman",4,5,5,"","spell: buff self 1 1",S("downpour","draw+chain",["Thunder Ram","Pearl Sovereign"])));
  add(Cr("Static Elemental",3,4,4,"","spell: zaps 1 1",S("downpour","draw+chain",["Storm Shaman","Mistborn Assassin"])));
  add(Cr("Downpour Sentinel",3,4,4,"","play/chain2: buff self 1 1",S("downpour","draw+chain",["Tempest Runner","Wave Dancer"])));
  add(Sp("Stormtide Torrent",3,"play: dmg t 3 | chain2: draw 1",S("downpour","draw+chain",["Forked Lightning","Great Ebb"],{tgt:"e"})));
  add(Sp("Downpour Blast",3,"play: draw 1 | chain2: energy 1",S("downpour","draw+chain",["Static Burst","Glacial Torrent"])));
  add(Re("Thunder Guard",3,"play: draw 1; buff t 0 2 tmp",S("downpour","draw+chain",["Shockwave Counter","Whiplash Tide"],{tgt:"o"})));
  add(Au("Static Engine",3,"spell: zaps 1 1",S("downpour","draw+chain",["Storm Battery","Ocean's Blessing"])));
  setR("r");
  add(Cr("Rain Elemental",5,7,7,"","play: dmg t 1 | chain2: dmg t 1",S("downpour","draw+chain",["Static Overlord","Shoal Leviathan"],{tgt:"ea"})));
  add(Cr("Stormtide Shaman",6,8,8,"","play: draw 1",S("downpour","draw+chain",["Volt Dragon","Coral Titan"])));
  add(Sp("Rolling Call",5,"play: dmg t 1 | chain2: dmg t 2",S("downpour","draw+chain",["Overload Cascade","Glacial Cataclysm"],{tgt:"ea"})));
  add(Re("Cloudburst Snap",4,"play: dmg t 2 | chain2: draw 1",S("downpour","draw+chain",["Thunder Trap","Ice Prison"],{tgt:"eatk"})));
  add(Au("Rain Beacon",4,"start: draw 1 | static: bank 2",S("downpour","draw+chain",["Storm Battery","Eternal Winter"])));

  /* ---- thunderhead (20) ---- */
  setR("c");
  add(Cr("Stormtide Brute",1,2,1,"barrier","play: buff self 1 1",S("thunderhead","chain+buff+barrier",["Volt Hopper","Coral Crab"])));
  add(Cr("Cloudburst Falcon",3,4,3,"barrier","attack: buff self 1 0 tmp",S("thunderhead","chain+buff+barrier",["Tesla Knight","Coral Warden"])));
  add(Cr("Downpour Raider",1,2,2,"","play: buff self 1 1",S("thunderhead","chain+buff",["Thunder Imp","Frost Sprite"])));
  add(Cr("Drenched Raider",3,5,3,"","chain2: draw 1",S("thunderhead","chain+buff",["Storm Caller","Tide Caller"])));
  add(Cr("Squall Reaver",2,3,3,"","play: buff self 1 1",S("thunderhead","chain+buff",["Arc Duelist","Tidepool Healer"])));
  add(Sp("Downpour Rain",1,"play: buff t 1 0; kw t pierce",S("thunderhead","chain+buff",["Lightning Bolt","Soothing Rain"],{tgt:"o"})));
  add(Sp("Thunder Storm",1,"play: buff t 1 0; kw t pierce",S("thunderhead","chain+buff",["Crackle","Whirlpool Trap"],{tgt:"o"})));
  add(Re("Rain Guard",2,"play: buff t 2 2 tmp",S("thunderhead","chain+buff",["Shock Reflex","Dispel"],{tgt:"o"})));
  add(Re("Squall Riposte",2,"play: dmg t 2 | chain2: draw 1",S("thunderhead","chain+buff",["Grounding","Sudden Current"],{tgt:"eatk"})));
  add(Au("Cloudburst Sanctum",1,"start: buff ostr 1 1",S("thunderhead","chain+buff",["Charged Coil","Tidal Mastery"])));
  setR("u");
  add(Cr("Tempest Striker",3,5,3,"","static: lord all 1 0",S("thunderhead","chain+buff",["Pulse Mage","Deep Oracle"])));
  add(Cr("Tempest Wolf",4,5,4,"barrier","spell: zaps 1 1",S("thunderhead","chain+buff+barrier",["Ion Drake","Icewall Colossus"])));
  add(Cr("Tempest Hound",3,5,3,"","creature: buff self 1 1",S("thunderhead","chain+buff",["Thunder Wolf","Kraken Spawn"])));
  add(Sp("Tempest Storm",3,"play: draw 1 | chain2: energy 1",S("thunderhead","chain+buff",["Battery Dump","Cold Snap"])));
  add(Re("Static Retort",3,"play: dmg t 2 | chain2: draw 1",S("thunderhead","chain+buff",["Electrify","Counterflow"],{tgt:"eatk"})));
  add(Au("Drenched Banner",2,"start: buff ostr 1 1",S("thunderhead","chain+buff",["Overload Coil","Sea of Clarity"])));
  setR("r");
  add(Cr("Stormtide Striker",5,8,5,"barrier","attack: buff self 1 0 tmp",S("thunderhead","chain+buff+barrier",["Sparkfire Hydra","Tidal Archmage"])));
  add(Cr("Tempest Reaver",4,6,4,"barrier","attack: buff self 1 0 tmp",S("thunderhead","chain+buff+barrier",["Thunderhead Golem","Frostfang Wyrm"])));
  add(Sp("Drenched Rite",5,"play: dmg t 3 | chain2: draw 1",S("thunderhead","chain+buff",["Thunderous Cascade","Glacial Cataclysm"],{tgt:"e"})));
  add(Re("Thunder Trap",4,"play: buff t 2 2 tmp",S("thunderhead","chain+buff",["Thunder Trap","Reverse Current"],{tgt:"o"})));
  add(Au("Tempest Totem",6,"static: lord all 1 1",S("thunderhead","chain+buff",["Tesla Coil","Ocean's Blessing"])));

  /* ---- riptide (20, support) ---- */
  setR("c");
  add(Cr("Rain Behemoth",2,2,3,"ward","death: draw 1",S("riptide","bounce+draw+ward",["Charge Siphon","Riptide Rogue"])));
  add(Cr("Thunder Giant",3,3,5,"","death: draw 1",S("riptide","bounce+draw",["Arc Apprentice","Bubble Mage"])));
  add(Cr("Thunder Colossus",2,2,4,"","death: draw 1",S("riptide","bounce+draw",["Flicker Mage","Tidecaller Shaman"])));
  add(Cr("Rain Titan",1,1,2,"ward","death: draw 1",S("riptide","bounce+draw+ward",["Static Sprite","Frost Sprite"])));
  add(Cr("Rain Tortoise",4,3,7,"","play: draw 1",S("riptide","bounce+draw",["Static Elemental","Shiver Elemental"])));
  add(Sp("Thunder Ritual",2,"play: draw 1; heal 2",S("riptide","bounce+draw",["Power Surge","Crashing Wave"])));
  add(Sp("Rain Call",1,"play: bounce t; energy 2",S("riptide","bounce+draw",["Static Bolt","Tidal Insight"],{tgt:"o"})));
  add(Re("Tempest Snap",2,"play: draw 1; buff t 0 2 tmp",S("riptide","bounce+draw",["Shock Reflex","Nullify"],{tgt:"o"})));
  add(Au("Squall Font",2,"end: draw 1",S("riptide","bounce+draw",["Lightning Rod","Permafrost Shrine"])));
  setR("u");
  add(Cr("Stormtide Bulwark",2,2,4,"","play: bounce t",S("riptide","bounce+draw",["Raiju","Glacier Wolf"],{tgt:"o"})));
  add(Cr("Squall Titan",2,2,4,"","spell: draw 1",S("riptide","bounce+draw",["Bolt Knight","Pearlguard Sentinel"])));
  add(Cr("Stormtide Tortoise",2,2,3,"ward","play: bounce t",S("riptide","bounce+draw+ward",["Swiftbolt Assassin","Abyss Watcher"],{tgt:"o"})));
  add(Sp("Thunder Burst",2,"play: draw 1; energy 1",S("riptide","bounce+draw",["Lightning Volley","Deep Insight"])));
  add(Re("Tempest Trap",3,"play: draw 2",S("riptide","bounce+draw",["Lightning Reflexes","Absolute Zero"])));
  add(Au("Downpour Banner",3,"ebounce: draw 1",S("riptide","bounce+draw",["Infinite Battery","Tidal Archive"])));
  setR("r");
  add(Cr("Cloudburst Warden",5,4,9,"ward","start: draw 1",S("riptide","bounce+draw+ward",["Static Overlord","Deep One Elder"])));
  add(Cr("Static Tortoise",6,5,11,"","play: bounce t",S("riptide","bounce+draw",["Storm Titan","Glacial Empress"],{tgt:"e:cost<=2"})));
  add(Sp("Downpour Burst",4,"play: bounce t",S("riptide","bounce+draw",["Ion Storm","Glacial Torrent"],{tgt:"e"})));

  /* ---- lightningrod (15) ---- */
  setR("c");
  add(Cr("Downpour Shaman",2,2,3,"barrier","death: dmg all_e 1",S("lightningrod","burn+barrier+barrier",["Volt Runner","Rime Watcher"])));
  add(Cr("Cloudburst Serpent",1,1,2,"barrier","play: kw t barrier",S("lightningrod","burn+barrier+barrier",["Plasma Sprite","Brook Otter"],{tgt:"o"})));
  add(Cr("Thunder Elemental",3,3,4,"barrier","attack: dmg face 1",S("lightningrod","burn+barrier+barrier",["Spark Swarm Mage","Frostbite Shade"])));
  add(Cr("Thunder Spirit",4,5,5,"","play: kw ostr barrier",S("lightningrod","burn+barrier",["Thunderclap Adept","Deepwater Scholar"])));
  add(Sp("Static Volley",1,"play: kw own barrier",S("lightningrod","burn+barrier",["Zap","Ebb and Flow"])));
  add(Re("Thunder Flash",2,"play: kw t barrier; dmg str 1",S("lightningrod","burn+barrier",["Grounding","Dispel"],{tgt:"o"})));
  add(Au("Drenched Totem",2,"start: kw ostr barrier",S("lightningrod","burn+barrier",["Charged Coil","Healing Spring"])));
  setR("u");
  add(Cr("Static Golem",3,4,4,"","play: dmg t 3",S("lightningrod","burn+barrier",["Voltage Wraith","Hydromancer"],{tgt:"e"})));
  add(Cr("Downpour Weaver",4,4,5,"barrier","attack: dmg face 1",S("lightningrod","burn+barrier+barrier",["Plasma Lord","Leviathan Calf"])));
  add(Sp("Squall Volley",2,"play: kw own barrier",S("lightningrod","burn+barrier",["Ball of Thunder","Tidal Scroll"])));
  setR("r");
  add(Cr("Tempest Elemental",6,8,8,"","death: dmg all_e 1",S("lightningrod","burn+barrier",["Volt Dragon","Siren Queen"])));
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.STORM_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["storm"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
