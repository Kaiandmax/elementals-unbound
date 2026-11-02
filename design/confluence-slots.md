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

## Next

1. `design/catalogs/steam.md` and `design/catalogs/aurora.md`: all 100 slots of each, with card text, trait pair and signature recipe.
2. Then the card files (`cards/catalog_steam.js`, `cards/catalog_aurora.js`) for Balance's review and Game Dev's Forge.
3. The other 18 confluences get their theme tables here before their catalogs are written.
