# Confluence catalogs: slot grid and themes

Owner: TCG Design. Builds on `confluence-cards.md` (approved 2026-11-01): 100 designed cards per dual and triple confluence, the hybrid Forge, and dual ×1.25 / triple ×1.6 of mono value per Energy. This file fixes the **shape** of every catalog so 2,000 cards don't repeat each other. The cards themselves come one confluence per PR, Steam and Aurora first.

## The grid (every confluence)

Rarity split C/U/R = 50/30/20, by type:

| Type | Common | Uncommon | Rare | Total |
|---|---|---|---|---|
| Creature | 25 | 15 | 10 | 50 |
| Spell | 10 | 7 | 4 | 21 |
| Reaction | 8 | 4 | 3 | 15 |
| Aura | 7 | 4 | 3 | 14 |
| **Total** | **50** | **30** | **20** | **100** |

Cost spread (Energy):

| Cost | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Creatures (50) | 6 | 12 | 12 | 10 | 6 | 4 |
| Other cards (50) | 10 | 18 | 12 | 6 | 3 | 1 |

Each slot in a catalog file lists: **type, cost, rarity, theme, trait pair** (one trait from each parent element, the Forge's nearest-match key), and a **signature recipe** (named parent cards).

## Themes

Each confluence gets 4-5 themes instead of one archetype, so its three tier decks and the archetype deck draw on different cards. The archetype theme holds the 20 existing special cards (reworked to the rules) plus a few new ones; the other themes are new. Rough sizes: archetype 25, the others 15-25 each.

Every theme has to pass these checks:

- it has commons (a theme that only exists at rare can't make a common deck);
- it has at least one way to answer a big creature, and blockers;
- it uses one trait from each parent element (a triple: from at least two of the three, and the theme set as a whole uses all three).

### Steam (Fire + Water): "Pressure"

`elements.md` flagged Steam as muddy: hidden cards, damage to what touches it, and hand-size pressure were three different ideas. They become three of its themes.

| Theme | Plays like | Fire trait | Water trait | Size |
|---|---|---|---|---|
| **Pressure** (archetype) | A full hand fuels everything: effects count cards in hand, draws trigger burn | burn | draw | 25 |
| **Scald** | Ward blockers that burn whatever touches them | damage on block | Wall, Ward | 20 |
| **Fog** | Hidden threats: Ward, can't be targeted the turn they arrive, Reactions | ambush, Haste | Ward, Reactions | 20 |
| **Boil** | Freeze then burn: damage that grows on frozen creatures | burn | freeze | 20 |
| **Vent** | Return your own creatures to replay their arrival effects | arrival damage | self-bounce | 15 |

Existing specials to rework: the Pressure ones scale with hand size **without limit** today (Boil Over: 1 damage to every enemy creature per card in hand; Pressure Titan +1/+1 per card). The rule: "for each card in your hand" effects cap at 3 for basic cards, so a 7-card hand isn't a board wipe.

### Aurora (Fire + Water + Lightning): "Radiance"

Aurora is the worst offender for fast games: charge riders stacked through fusion and turn-one Manifests (`metrics.md`). The designed version keeps "Manifests early and often" as its fantasy but limits charge to make that a plan, not an accident.

| Theme | Plays like | Traits (from) | Size |
|---|---|---|---|
| **Radiance** (archetype) | Manifest payoffs: "whenever you cast a Manifest" | charge (Lightning), draw (Water) | 25 |
| **Prism** | Small creatures that grow while you gain charge and hit fast | Haste (Lightning), attack buffs (Fire) | 20 |
| **Spectrum** | Spell chains: cheap spells that get better as you play more spells in a turn | Chain (Lightning), burn (Fire) | 20 |
| **Shimmer** | Defensive light: Barrier, freeze, heal; the theme that answers big creatures | Barrier/Zap (Lightning), freeze/heal (Water) | 20 |
| **Dawnfire** | Board-wide burn that only grows with Manifests already cast, so it peaks late | burn (Fire), Manifest count | 15 |

Aurora's charge rules (on top of the general ones):

- At most **one** card in the catalog per rarity gives 3+ charge on its own (a dedicated ramp spell); everything else gives at most 1.
- No card gives charge **and** draws.
- "For each Manifest you've cast" scales cap at +3.
- Board-wide damage at basic rarity tops out at 2 per creature.

Airborne is Wind's keyword and Aurora has no Wind, so the Airborne on today's Aurora specials (Prism Sprite, Skyglow Owl, Spectrum Djinn, Aurora Seraph) goes. Existing specials that break the charge rules and will be reworked: Gather Light (4 charge for 1), Charge the Sky (8 charge), Borealis Surge (3 charge and draw 2), Flash of Insight (draw and 3 charge), Radiant Shower (sweep plus charge plus draw).

### Lessons from the pilots (Balance's theme sims, five runs)

- **Every theme needs a way to win on its own**, not just a way to survive. Battles last about 4 turns a side, so a theme that only reacts (Steam's first Scald: "burn whatever hits it"; Aurora's Shimmer) loses races. Defensive themes get a finisher at common, or are built to sit inside another theme's deck (say which in the table).
- **Common power comes from bodies and one-shot effects**, never engines (the rarity rule in `confluence-cards.md`). Cheap Haste bodies plus a cheap buff spell is the hottest pattern found so far (Aurora's Prism); keep Haste off 1-2 cost commons unless the body is small.
- **Charge acceleration at common is what makes Manifests early**, which is what makes games swingy. A recurring charge source is at least 4 Energy at common, or uncommon.
- "Takes damage" and "blocks" triggers rarely fire: the AI seldom attacks into big blockers. Prefer "when played", "attacks" and "start of turn".

## Themes for the other 18 confluences

Same shape as Steam and Aurora: 4-5 themes each, the archetype first (it keeps the 20 special cards, reworked). Sizes add to 100. "Stands alone" means the theme must make a working deck of its own commons; "support" themes are judged inside mixed decks.

### Duals

| Confluence | Themes (size) | Traits drawn on |
|---|---|---|
| **Volcano** (Fire + Earth) | **Eruption** (archetype, 25: sacrifice your own creatures for a blast), **Magma** (25: big Pierce bodies that hit on arrival), **Fault Line** (20: Fortify that turns into damage when the creature dies), **Ashfall** (15: 1-damage sweeps that only hurt enemies, support), **Caldera** (15: Last Gasp chains) | Fire burn and Haste, Earth size, Fortify and Wall |
| **Wildfire** (Fire + Wind) | **Spreading Flames** (archetype, 25: damage every enemy creature, profit when they die), **Updraft** (25: cheap Airborne attackers that burn on attack), **Kindling** (20: small creatures that buff the next creature you play, played as a curve), **Backburn** (15: self-bounce to replay "when played" burn), **Smoke** (15: Skyguard and "can't block" tricks, support) | Fire burn, Wind Airborne, self-bounce |
| **Plasma** (Fire + Lightning) | **Overload** (archetype, 25: hurt yourself on purpose, Desperate payoffs), **Arc** (20: Chain spells that burn), **Ignition** (20: Haste attackers that Ignite), **Reactor** (20: charge sinks: Overcharge cards that pay off big), **Static** (15: Barrier bodies that ping when they attack, support) | Fire Haste and burn, Lightning Chain, Overcharge, Barrier |
| **Swamp** (Water + Earth) | **Grave Tide** (archetype, 25: Venom and creatures that climb back out of the grave), **Mire** (20: Drain blockers that heal you as they win the race), **Rot** (20: shrink enemy creatures each turn), **Bog Spawn** (20: Last Gasp tokens), **Peat** (15: big slow Walls with a "start of turn" payoff, stands alone) | Water Drain and heal, Earth size and Wall, Venom |
| **Ice** (Water + Wind) | **Shatter** (archetype, 25: freeze, then cash frozen creatures in), **Rime Wings** (20: Airborne attackers that freeze when they hit), **Snowdrift** (20: bounce frozen enemies), **Hoarfrost** (20: Skyguard walls with a finisher at common), **Squall** (15: freeze-on-play tempo creatures) | Water freeze, Wind Airborne and bounce |
| **Storm** (Water + Lightning) | **Spellstorm** (archetype, 25: spells grow as you cast more), **Downpour** (20: draw two, cast two: card flow), **Thunderhead** (20: creatures that grow when you cast spells, at uncommon; at common they get a one-shot spell bonus), **Riptide** (20: counters and bounce on Reactions, support), **Lightning Rod** (15: Barrier bodies that turn spells into face damage) | Water draw and counters, Lightning Chain and Barrier |
| **Sand** (Earth + Wind) | **Erosion** (archetype, 25: shrink enemy creatures permanently and send them home), **Dune** (20: sturdy Airborne bodies), **Sandstorm** (20: chip damage to every enemy creature at start of turn, at uncommon; one-shot sweeps at common), **Quicksand** (20: "can't attack" and bounce on small creatures), **Mesa** (15: Fortify fliers) | Earth size and Fortify, Wind Airborne and bounce |
| **Metal** (Earth + Lightning) | **Plating** (archetype, 25: Barrier, permanent armor, creatures that fight), **Forgework** (20: equipment-style auras that move +X/+X onto a creature: "when played, give a creature +2/+2"), **Dynamo** (20: Vigilant bodies that charge when they block or attack), **Rail** (20: Haste constructs with Fortify), **Magnet** (15: pull an enemy creature into a fight) | Earth Fortify and size, Lightning Barrier, Haste and charge |
| **Tempest** (Wind + Lightning) | **Blitz** (archetype, 25: Haste for all, double attack, untap), **Gale Riders** (20: Airborne Haste attackers, small bodies), **Squall Line** (20: cheap spells that let a creature attack again, at uncommon; one-shot +X/+0 at common), **Eye of the Storm** (20: Barrier and Skyguard to protect the attack, support), **Downburst** (15: bounce blockers before combat) | Wind Airborne and bounce, Lightning Haste and Barrier |

### Triples

| Confluence | Themes (size) | Traits drawn on |
|---|---|---|
| **Geyser** (Fire + Water + Earth) | **Wellspring** (archetype, 25: life gain erupts as damage), **Hot Spring** (20: mend your creatures, they hit back harder when healthy), **Mudslide** (20: big Drain bodies), **Vent** (20: burn on arrival plus life), **Sinter** (15: Walls with a start-of-turn burn, stands alone) | Fire burn, Water heal and Drain, Earth size and Wall |
| **Mirage** (Fire + Water + Wind) | **Illusions** (archetype, 25: copy, silence, steal at rare), **Phantasm** (20: token copies of your own creatures), **Haze** (20: Ward and bounce tricks), **Heat Shimmer** (20: Airborne attackers that can't be blocked by frozen creatures, one-shot freeze on arrival), **Fata Morgana** (15: silence enemy creatures, support) | Fire burn, Water Ward and freeze, Wind Airborne and bounce |
| **Ash** (Fire + Earth + Wind) | **Cinders** (archetype, 25: tokens that burn out and rise again), **Pyroclast** (20: sacrifice tokens for burn), **Ember Flock** (20: Airborne tokens), **Ashen Wall** (20: token Walls with a Last Gasp sting), **Kiln** (15: token lords, uncommon and up) | Fire burn and Haste, Earth tokens and Wall, Wind Airborne |
| **Forge** (Fire + Earth + Lightning) | **Artifice** (archetype, 25: auras that power each other), **Anvil** (20: Fortify bodies), **Bellows** (20: Overcharge spells), **Spark Smith** (20: creatures that grant a keyword when played), **Crucible** (15: sacrifice an aura for a burst, stands alone) | Fire burn, Earth Fortify and size, Lightning Overcharge and Barrier |
| **Solar** (Fire + Wind + Lightning) | **Sunfire** (archetype, 25: every hit on the enemy fuels more burn), **Corona** (20: Airborne Haste attackers), **Flare** (20: Chain burn spells), **Zenith** (20: big rares and uncommons that reward having dealt damage this turn), **Heat Haze** (15: bounce blockers, support) | Fire burn, Wind Airborne and bounce, Lightning Haste and Chain |
| **Glacier** (Water + Earth + Wind) | **Bulwark** (archetype, 25: walls that win by defending; needs a common finisher: a Wall that deals damage at the start of your turn), **Iceberg** (20: huge bodies with Ward), **Avalanche** (20: freeze then a big one-shot hit), **Snowfield** (20: Skyguard against fliers, support), **Calving** (15: Last Gasp freeze) | Water freeze and Ward, Earth Wall and size, Wind Skyguard |
| **Quicksilver** (Water + Earth + Lightning) | **Shapeshift** (archetype, 25: swap, copy, transform), **Mercury** (20: creatures that swap attack and health when played), **Alloy** (20: Barrier plus Fortify), **Reflection** (20: token copies at uncommon and up; one-shot "copy a 2-drop" at common), **Liquid Metal** (15: bounce and replay, stands alone) | Water bounce and draw, Earth Fortify, Lightning Barrier |
| **Hurricane** (Water + Wind + Lightning) | **Maelstrom** (archetype, 25: mass bounce and replay), **Eye Wall** (20: Barrier and Skyguard, support), **Downdraft** (20: Airborne attackers that bounce a blocker when they attack), **Riptide** (20: draw and Chain spells), **Tempest Surge** (15: Haste replays) | Water bounce and draw, Wind Airborne, Lightning Haste and Chain |
| **Glass** (Earth + Wind + Lightning) | **Shards** (archetype, 25: Barriers and damage reflected back), **Prism Wall** (20: Barrier Walls with a start-of-turn ping, stands alone), **Splinter** (20: tokens that deal damage when they die), **Mirror** (20: Airborne Barrier attackers), **Fulgurite** (15: one-shot burn that grows with Barriers you control) | Earth Wall and tokens, Wind Airborne, Lightning Barrier and ping |

Each confluence's catalog file lists the slots per theme (type, cost, rarity, trait pair, signature recipe), as `catalog_steam.js` and `catalog_aurora.js` do, and must pass `design/tools/catalogcheck.js` before it goes to Balance.

## Next

1. `design/catalogs/steam.md` and `design/catalogs/aurora.md`: all 100 slots of each, with card text, trait pair and signature recipe.
2. Then the card files (`cards/catalog_steam.js`, `cards/catalog_aurora.js`) for Balance's review and Game Dev's Forge.
3. Catalogs for the other 18 confluences, in batches, after the pilots land in the build.
