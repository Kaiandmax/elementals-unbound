# Confluence cards: designed, not fused

Owner: TCG Design. Status: **Approved** (designer, 2026-11-01): designed cards, the hybrid Forge (A3), **100 cards per confluence** (B1), and **dual ×1.25, triple ×1.6** of mono's value per Energy. Numbers are Balance's; the Forge code is Game Dev's.

**Designer direction (2026-11-01):** fusion's power curve is too steep. Battles between triple decks can end in a turn or two with little counterplay. Power should rise with progression, but two comparable decks should never stomp each other in a turn or two. Replace "two cards strapped together" with **bespoke dual and triple cards**. They play like mono cards, feel stronger, and **evoke the cards that made them** without being their sum.

## What's wrong today (measured)

| | Cards | Value per cost | Effects per card | Keywords per card | Rules text (characters) |
|---|---|---|---|---|---|
| Mono (base) | 500 | 3.5 | 1.6 | 0.40 | 52 |
| Dual, fused by formula | 756 | 4.8 | 2.7 | 0.78 | 93 |
| Dual, designed (specials) | 244 | 4.9 | 1.7 | 0.41 | 73 |
| Triple, fused by formula | 800 | 6.4 | 4.1 | 1.09 | 145 |
| Triple, designed (specials) | 200 | 7.0 | 1.7 | 0.31 | 77 |

Confluence decks are 85% formula fusions (683 of 800 cards).

Two problems stack:

1. **The power curve comes from the fusion formula.** A fusion is "the biggest part plus half the rest, with every effect and keyword". The balance pass then sets every confluence card, designed ones included, to the fusions' median. So a dual card is worth about 1.4× a mono card of the same cost, and a triple card about 1.9×. Life totals don't scale with that.
2. **Formula fusions stack effects.** A triple fusion averages 4 effects and a keyword, so one card often removes, buffs and adds evasion at once. Example: *Frost Blitz* (2 Energy) = Frost Snap + Blitz + Tailwind: freeze a creature, draw, then +2/+1, then +2/+0 and Airborne. This is where the turn-two kills and the "nothing I could do" losses come from.

## What the sims say

AI level 3, 200 games per row, same decks. "Flatter curve" re-prices confluence cards so a dual is worth about 1.15× mono and a triple about 1.3×. "Designed only" is a rough proxy: every formula fusion is swapped for the closest existing special card of its confluence (same type, cost and rarity).

| | Dual rounds | Dual over by round 2 | Triple rounds | Triple over by round 2 | Triple blowouts | Triple: loser never cast a Manifest |
|---|---|---|---|---|---|---|
| Today | 3.6 | 9% | 3.0 | **31%** | 50% | 48% |
| Flatter curve (dual ×0.92, triple ×0.85) | 3.7 | 6% | 3.6 | 13% | 49% | 43% |
| Flatter curve (dual ×0.85, triple ×0.72) | 4.0 | 1% | 3.9 | 11% | 50% | 48% |
| Designed only, today's curve | 4.0 | 14% | 3.6 | 30% | 59% | 33% |
| Designed only, flatter curve | 4.8 | 5% | 4.4 | 16% | 67% | 38% |

(Mono decks don't change: 4.3-4.5 rounds.)

What this means:

1. **The power curve is the speed lever.** Flattening it cuts triple games over by round 2 from 31% to about 11%, and triple battles land near the "under 4 turns a side" target.
2. **Swapping in today's special cards doesn't fix stomps; it makes them worse** (blowouts 50% → 59-67%). The specials were written to push archetypes: board wipes, sacrifice bursts, recursion. Bespoke cards help only if they're written to rules that keep counterplay in (below). The proxy's decks also repeat the same 20 cards, which overstates swinginess.
3. **Bespoke cards do help Manifests matter:** losers who never cast one drop from 48% to 33-38%, because games stop ending before charge builds.

## The proposal

### 1. Every dual and triple card is designed

No formula fusions. Each confluence has a catalog of designed cards, and the Forge turns parent cards into one of them. The Forge fantasy stays ("put in two cards, get something new"); only the result changes.

**Design rules for confluence cards.** These add to the card test in `pillars.md`:

| Rule | Why |
|---|---|
| **One keyword and one effect**, or two small effects. Never more rules text than a mono rare. | Readable at a glance; no hidden stacked burst. |
| **Evoke each parent with one trait**: a keyword, an effect, a stat shape or a name word. Don't copy whole parents. | The card is new but you can see where it came from. |
| **Burst cap:** a basic card can't deal more than its cost +1 to a player on the turn it's played (Haste, direct damage and buffs together). | No turn-two kills from one card. |
| **No free removal on a body** above common: a creature that kills or freezes on arrival pays for it in stats. | Keeps tempo swings answerable. |
| **At most one charge rider**, and never on a card that also draws. | Fixes the Aurora problem at the source. |
| **Answers at every rarity:** each confluence's commons include blockers and at least one way to deal with a big creature. | Comparable decks can always fight back. |
| **Stronger means richer, not bigger.** A dual card gets what mono can't: two elements' keywords on one body, or a cross-element effect (freeze plus burn). Raw numbers rise only gently. | Power still grows with progression, but through options. |

**Power curve (decided):** the balance pass prices confluence cards from the **mono median times a tier factor**, not from the fusions' median: **dual ×1.25, triple ×1.5** (fusions were about ×1.4 and ×1.9). Creature stats move at most +25% in normalization, so the factor mostly nudges costs and effect numbers; the real power comes from the designs. The design rules above do the rest of the work against stomps.

### 2. Worked examples

| Parents | Today's fusion | Designed card |
|---|---|---|
| Frost Snap + Blitz + Tailwind (Hurricane: Water + Wind + Lightning) | *Frost Blitz* (2): freeze, draw, +2/+1, +2/+0 and Airborne | **Squall Strike** (2, Reaction): Freeze an attacking enemy creature. Your strongest creature gains Airborne this turn. *(Frost Snap's freeze, Tailwind's Airborne, Blitz's timing)* |
| Lava Hound + Hill Giant (Volcano) | formula: 4-cost, all keywords | **Magma Titan** (4): 7/7 Pierce. When it attacks, deal 1 damage to the enemy. *(an existing recipe, already in this style)* |
| Searing Spark + Rockslide (Volcano) | formula: two damage spells | **Molten Boulder** (2): Deal 5 damage to a creature. *(existing recipe: one clean effect)* |

The existing named recipes in `cards/fusion.js` (8 for Volcano, and so on) already follow these rules. They are the model.

## Decisions (designer, 2026-11-01)

The options that were on the table are kept for the record.

| Question | Picked | Other options |
|---|---|---|
| A. How the Forge picks the result | **A3 hybrid:** each designed card has one signature recipe (named parents, a discovery); every other legal pair makes the catalog card closest to the parents' type, cost, rarity and traits. A "Forge book" records the discoveries. | A1 named recipes only; A2 slot matching |
| B. Cards per confluence | **100 per dual and per triple (2,000 designed cards).** About 450 exist (specials and named recipes) and get reworked to the rules; about 1,550 are new. | 40 dual / 30 triple; 30 / 20 |
| C. How much stronger | **Dual ×1.25, triple ×1.5** of mono's value per Energy (triple was ×1.6 until 2026-11-03; see below). | ×1.15 / ×1.3; let Balance decide |

### How to design 2,000 cards without repeats

- **A slot grid per confluence.** The 100 cards fill a fixed spread of type (about 50 creatures, 25 spells, 13 Reactions, 12 auras; today's catalog weights), cost 1-6 and rarity (C/U/R about 50/30/20). Every slot also names the **trait pair** it evokes (e.g. Steam: "freeze + burn", "Airborne + shield"), so the Forge's nearest-slot match always has an echo of the parents to land on.
- **Each confluence has 4-5 themes**, not one archetype, so its 100 cards make 3 tier decks plus the archetype deck without the same 20 cards repeating. The 20 specials stay as the archetype's core and get reworked to the rules.
- **Signature recipes** come from the existing named recipes and the parent pairs the current decks use, so known combinations keep a recognizable result.
- **Batches:** one confluence per PR, about 100 cards, each with its slot, trait pair and signature recipe. Story renames as the world develops; placeholder names are fine until then.

## Power by element count and rarity (designer, 2026-11-03)

**More elements must mean more power.** Balance's pilot sims (AI level 3, theme decks of commons) confirm it holds in play: against the same mono rare decks, Aurora (triple) commons win about 80% and Steam (dual) commons about 50%, and Aurora commons beat dual rares about 65% (the ladder's 55-65% step). With stats capped at +25%, Aurora plays the same at ×1.2, ×1.4 and ×1.5, so the designer's ×1.5 is the factor.

**Rarity unlocks abilities more than it adds budget.** The value gap between rarities stays small; what changes is what a card is allowed to do:

| Rarity | Can do |
|---|---|
| Common | One keyword. Effects that fire once (when played, attacking, blocking, dying, at the start or end of your turn) or that only grow the card itself. Threshold checks ("if you have 5+ cards in hand", "Chain 2", "if you've cast a Manifest"). |
| Uncommon | Everything a common can, plus **engines**: "whenever you draw / play a spell / gain charge / cast a Manifest..." that hit other things, and **static effects** (your creatures get +1/+0). Destroy effects. |
| Rare | Everything an uncommon can, plus **rule-benders**: Energy bank, cost reduction, granting a keyword to all your creatures, double attack, take control, return all your creatures; and two keywords. |

`design/tools/catalogcheck.js` enforces this. In the pilots it moved 9 engine cards from common to uncommon (swapping in simple uncommons of the same type and theme), rewrote 6 common auras as start- or end-of-turn effects, and moved Refracted Strike (double attack) to rare.

## Rollout

1. **TCG Design:** the slot grid and theme list for all 20 confluences, then the pilot catalogs, **Steam** (dual) and **Aurora** (triple, the worst offender), 100 cards each with signature recipe and slot.
2. **Balance:** price confluence cards from the mono median × tier factor (dual 1.25, triple 1.6) (`TIERF`/`BAL_MED` in `cards/catalog.js`), then tune the pilot.
3. **Game Dev:** the Forge picks a catalog card (A3: signature recipe, then nearest slot) instead of calling `fuseParts`. The formula code stays only until every confluence is converted. The deck builder shows the result before forging.
4. **TCG Design and Balance:** rebuild the pilot decks, measure fun metrics and stomp rate against today, then do the other 18 confluences in batches.
5. **Story:** names and flavor for the catalog cards as they land (names stay placeholders until then).

Card files are shared, so every card PR goes through Balance's review, per the studio protocol.
