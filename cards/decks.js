/* ================= DECKS =================
   Each deck: 10 basic cards (two copies each, 20 total) and 4 Manifests, whatever its element count. */
// Face damage each card can deal (used by the level-5 AI to read your hand).
for (const c of Object.values(LIB)){ let n = 0; for (const m of (c.text||"").matchAll(/deal (\d+) damage to (?:an enemy creature or the enemy|the enemy|every enemy creature and the enemy)/gi)) n += +m[1]; c.burn = n; }
const DECKS = {}, DECK_BY_ID = {};
const TIER_NAME = { starter:"Starter", common:"Common", uncommon:"Uncommon", rare:"Rare", special:"Archetype" };
function deck(id, el, name, tier, desc, main, manis){
  const conf = CONFLUENCE[el];
  const ref = n => LIB[n] ? n : el+"_"+slug(n);
  // A dual confluence deck lists its basics as fusion pairs: [Fire card, Earth card]; special cards can be listed by name.
  // A triple confluence deck lists its basics as [card, card, card], one of each element.
  const refMain = n => Array.isArray(n) ? fuseParts(n.map(x => cardIdByName(x, conf))).id : ref(n);
  const d = { id, el, name, tier, desc, main:main.map(refMain), manifests:manis.map(ref), conf:!!conf };
  if (conf) d.pairs = main.map(n => Array.isArray(n) ? n : null);
  for (const c of [...d.main, ...d.manifests]) if (!LIB[c]) throw new Error(`Deck ${id}: unknown card ${c}`);
  for (const c of [...d.main, ...d.manifests]) if (LIB[c].el!==el) throw new Error(`Deck ${id}: ${c} is not a ${el} card`);
  const nM = 4;   // every deck carries 4 Manifests (designer, 2026-10-24)
  if (d.main.length!==10 || d.manifests.length!==nM) throw new Error(`Deck ${id}: needs 10 basics and ${nM} Manifests`);
  (DECKS[el] = DECKS[el] || []).push(d); DECK_BY_ID[id] = d;
}
// Each Starter deck leaves out its 6-charge (or most situational) Starter Manifest to keep 4.
const STARTER_CUT = ["inferno_lord", "maelstrom", "titan", "gale_force", "thunderstorm"];
for (const el of BASE_ELS){
  deck(el+"_starter", el, `${ELS[el]} Starter`, "starter", EL_STYLE[el],
    Object.values(LIB).filter(c=>c.el===el && c.r==="s" && !c.manifest).map(c=>c.id),
    Object.values(LIB).filter(c=>c.el===el && c.r==="s" && c.manifest && !STARTER_CUT.includes(c.id)).map(c=>c.id));
}

deck("fire_swarm","fire","Ember Swarm","common","Go wide with hasty Ember Spark tokens, then pump them all at once.",
  ["Ember Whelp","Sparkfire Kit","Torchbearer","Call the Embers","Flame Herald","Bonfire Keeper","Rally the Flames","Ashen Brawler","Cinder Swarm","Hearth of Embers"],
  ["Blazing Rally", "Ember Familiar", "Bonfire Totem", "Kindled Fury"]);
deck("fire_pyro","fire","Pyromancer","common","Spells that burn and draw, backed by creatures that fire off with every spell.",
  ["Apprentice Pyromancer","Firebolt","Scorch","Kindle Thoughts","Flame Wave","Ember Scholar","Combust","Flash Fire","Smoldering Tome","Lava Hound"],
  ["Flame Volley", "Searing Tide", "Inferno Tome", "Ashfall"]);
deck("fire_fury","fire","Reckless Fury","uncommon","Trade your own life for huge, piercing attacks.",
  ["Blood-Fire Berserker","Pyre Zealot","Ember Duelist","Wild Surge","Inferno Charger","Fury Unleashed","Scorchclaw Ravager","Reckless Raider","Lava Hound","Firebrand Knight"],
  ["Crimson Warlord", "Rage of the Mountain", "Fire Elemental Lord", "Meteor"]);
deck("fire_inferno","fire","Inferno Dragons","rare","Dragons and phoenixes that burn on arrival and rise again.",
  ["Flamewing Dragon","Ashborn Phoenix","Inferno Champion","Dragonfire","Hellfire Berserker","Chain of Flame","Solar Flare Drake","Pyroclasm Reflex","Embercloak Assassin","Scorchborn Duelist"],
  ["Infernal Dragon King", "Eternal Phoenix", "Legion of Embers", "Crimson Inferno"]);

deck("water_tide","water","Tidecaller","common","Draw cards, drain life and outlast the enemy behind big blockers.",
  ["Brook Otter","Kelp Lurker","Tidepool Healer","Reef Guardian","Flowing Wisdom","Deepwater Scholar","Icy Grip","Tide Caller","Sea Serpent","Harbor Golem"],
  ["Rising Tide", "Sea Dragon", "Glacier Titan", "Tidal Elemental"]);
deck("water_frost","water","Frostbind","common","Freeze the enemy's best creatures every turn, then shatter them.",
  ["Frost Sprite","Chill","Rime Watcher","Winter Mage","Cold Snap","Frostbite Shade","Icy Grip","Shiver Elemental","Shatter","Narwhal Lancer"],
  ["Glacier Titan", "Frozen Prison", "Frostfall", "Hailstorm"]);
deck("water_riptide","water","Riptide","uncommon","Bounce enemy creatures and counter their plays to stay a step ahead.",
  ["Riptide Rogue","Sudden Current","Wavecrest Mage","Nullify","Tideborn Knight","Kraken Spawn","Glacier Wolf","Harbor Golem","Reef Guardian","Chill"],
  ["Abyssal Kraken", "Ocean Sovereign", "Maelstrom Spiral", "Tide Lord"]);
deck("water_abyss","water","Abyssal Leviathans","rare","Enormous sea creatures that drain life and lock down the board.",
  ["Leviathan Elder","Abyss Watcher","Glacial Empress","Siren Queen","Kelp Colossus","Wavebreaker Champion","Sea Witch","Tideborn Knight","Frostfang Wyrm","Frozen Moment"],
  ["Leviathan of the Abyss", "Tide Sovereign Neris", "Absolute Winter", "Primeval Kraken"]);

deck("earth_wall","earth","Stonewall","common","Walls and Vigilant guardians that punish every attack.",
  ["Ironhide Rhino","Granite Guard","Thornback Boar","Bulwark Golem","Spiked Barricade","Quake","Mountain Guardian","Boulder Toss","Cliffside Watcher","Boulder Hurler"],
  ["Stone Colossus", "Earthen Ramparts", "Seismic Roar", "Mountain Heart"]);
deck("earth_roots","earth","Deep Roots","common","Ramp Energy and charge early, then drop giants.",
  ["Root Tender","Seed Bearer","Fertile Ground","Grove Shaper","Old-Growth Treant","Earthquake Beetle","Mossback Giant","Overgrowth","Hill Giant","Ironhide Rhino"],
  ["Verdant Bloom", "Ancient Treefolk", "Bedrock Avatar", "Earth Elemental"]);
deck("earth_crystal","earth","Crystal Growth","uncommon","Fortify and permanent buffs grow every creature into a monster.",
  ["Crystal Sprout","Amber Golem","Crystalline Growth","Jade Behemoth","Stoneheart Sentinel","Crag Brute","Basalt Champion","Iron Tortoise","Boulder Toss","Ancient Guardian"],
  ["Gemstone Titan", "Primal Growth", "Earthen Citadel", "Tectonic Shift"]);
deck("earth_titans","earth","Titans","rare","Oversized creatures at every cost, crowned by world-shaking Manifests.",
  ["Granite Juggernaut","Elder Treant","Mountain's Chosen","Runestone Golem","Earth's Fury","Ironroot Sentinel","Stoneblood Berserker","Moss Titan","Ancient Stonewarden","Bedrock Leviathan"],
  ["Crystal Wyrm", "Throne of Mountains", "Ancient Colossus", "Earthbinder Gorr"]);

deck("wind_flock","wind","Featherflock","common","Flood the skies with small fliers and the leaders that pump them.",
  ["Sparrow Scout","Feather Sprite","Gullcaller","Flock Leader","Updraft Swarm","Kestrel Rider","Cloud Hawk","Nesting Grounds","Skyline Falcon","Wingbeat"],
  ["Flock of Thousands", "Roc Matriarch", "Sky Sanctuary", "Feathered Host"]);
deck("wind_zephyr","wind","Zephyr Tricks","common","Replay creatures for their arrival effects while bouncing the enemy.",
  ["Breeze Messenger","Wind Wanderer","Recall Gust","Whirlwind Acrobat","Gale Sage","Sky Courier","Gust of Wind","Tempest Sprite","Zephyr Strike","Dust Devil"],
  ["Winds of Fortune", "Storm Rider", "Wind Spirit", "Hurricane Wall"]);
deck("wind_gale","wind","Gale Riders","uncommon","Fast, hasty fliers with tricks to win every race.",
  ["Gale Rider","Windsong Falcon","Sky Strike","Squall Captain","Raptor of the Peaks","Featherblade Duelist","Wind Wraith","Kestrel Rider","Cloud Hawk","Gust of Wind"],
  ["Roc of the Storm", "Sky Emperor", "Tempest Call", "Storm Djinn"]);
deck("wind_sovereign","wind","Sky Sovereigns","rare","Elite fliers led by lords of the sky.",
  ["Lord of the Skies","Silverwing Griffin","Stormwing Phoenix","Gale Assassin","Skyshard Sentinel","Peregrine Ace","Cyclonic Rift","Windlord Aeris","Feathered Serpent","Aerie Matriarch"],
  ["Sky Sovereign Zephyra", "Roc Armada", "Phoenix of the Gale", "Tempest Ascension"]);

deck("lightning_spark","lightning","Spark Storm","common","Cheap spells chained together, with creatures that grow on every cast.",
  ["Zap","Quick Study","Static Sprite","Arc Apprentice","Jolt","Bolt Thrower","Spark Surge","Flicker Mage","Storm Caller","Chain Spark"],
  ["Ball Lightning", "Spark Legion", "Static Field", "Chain Reaction"]);
deck("lightning_static","lightning","Static Charge","common","Store up charge to unlock Attuned bonuses, then strike hard.",
  ["Capacitor Golem","Charged Coil","Voltage Hound","Power Surge","Static Elemental","Thunder Lance","Conduit Keeper","Ion Drake","Tesla Knight","Thunder Ram"],
  ["Storm Summoning", "Lightning Djinn", "Arc Storm", "Voltaic Titan"]);
deck("lightning_overload","lightning","Overload","uncommon","Hasty attackers and burn spells that never let up.",
  ["Thunder Imp","Lightning Bolt","Arc Duelist","Pulse Mage","Voltage Wraith","Chain Lightning","Thunder Wolf","Jolt","Storm Caller","Volt Hopper"],
  ["Thunderlord", "Storm Conductor", "Plasma Titan", "Lightning Storm"]);
deck("lightning_gods","lightning","Thunder Gods","rare","The strongest strikes in the storm, finished by gods of thunder.",
  ["Thunder God's Herald","Lightning Helix","Stormbringer","Raiden's Champion","Swiftbolt Assassin","Lightning Spear","Plasma Lord","Lightning Bolt","Arc Duelist","Thunder Wolf"],
  ["Raiden, Storm God", "Plasma Phoenix", "Lightning Avatar", "Thunder Legion"]);

/* ---- Volcano (Fire + Earth) fusion decks: 10 fused basics and 4 Volcano Manifests ---- */
deck("volcano_forge","volcano","Magma Forge","common","Common Fire and Earth cards fused into molten bruisers.",
  [["Lava Hound","Hill Giant"],["Ashen Brawler","Crystal Burrower"],["Molten Hatchling","Clay Homunculus"],["Brimstone Guard","Granite Guard"],["Reckless Raider","Ironhide Rhino"],
   ["Firebrand Knight","Boulder Hurler"],["Flamecaller Adept","Burrow Mole"],["Firebolt","Boulder Toss"],["Scorch","Unearth"],["Heat Surge","Rock Shield"]],
  ["Basalt Brute", "Lava Wall", "Magma Spout", "Smoking Crater"]);
deck("volcano_ash","volcano","Ash and Stone","uncommon","Uncommon fusions: hasty, piercing and fortified all at once.",
  [["Scorchclaw Ravager","Earthshaker Ogre"],["Ember Duelist","Crag Brute"],["Pyre Zealot","Amber Golem"],["Inferno Charger","Basalt Champion"],["Ignited Lancer","Stoneheart Sentinel"],
   ["Ashwing Harrier","Iron Tortoise"],["Volcanic Brute","Emerald Wyrm"],["Searing Blast","Avalanche Shard"],["Fury Unleashed","Seismic Pulse"],["Wild Surge","Earthen Ward"]],
  ["Magma Hydra", "Eruption Titan", "Tectonic Fire", "Heart of Magma"]);
deck("volcano_obsidian","volcano","Obsidian Dynasty","rare","Rare fusions: dragons of stone and fire.",
  [["Inferno Champion","Granite Juggernaut"],["Hellfire Berserker","Stoneblood Berserker"],["Flamewing Dragon","Elder Treant"],["Embercloak Assassin","Rockfist Brute"],["Scorchborn Duelist","Runestone Golem"],
   ["Ashborn Phoenix","Crystal Dragon"],["Dragonfire","Earth's Fury"],["Supernova Spark","Shatter the Earth"],["Pyroclasm Reflex","Tremor Trap"],["Solar Flare Drake","Bedrock Leviathan"]],
  ["Mantle Leviathan", "Primordial Volcano", "Volcanic Wrath", "Obsidian Throne"]);
