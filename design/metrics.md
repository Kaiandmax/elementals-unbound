# Fun metrics

Owner: TCG Design. These measure how battles *feel* (length, choices, swings, Manifests), not whether they are fair; fairness is Balance's (`tools/`).

## How to run

```
bash tools/mk.sh
node design/tools/funmetrics.js                      # all sets, AI level 3, 600 games per set
SET=mono,dual LV=5 N=40 node design/tools/funmetrics.js
```

The script loads `tools/engine.js`, patches a few counters into it in memory (nothing on disk changes) and plays AI-vs-AI games. Headless games always give seat 0 the first turn, so every pairing is played both ways round. Sets: `starter` (the five Starter decks), `mono`, `dual`, `triple` (prebuilt decks of that size, same group vs same group), `rpg` (a Starter deck vs wild Starter decks at -5 life and AI level 1-2, like `rpg/encounters.js`).

### Definitions

| Metric | Meaning |
|---|---|
| rounds | half-turns / 2: how many turns each side gets |
| over by round 2 | the game ended within 4 half-turns |
| blowout | the winner never fell below 60% of starting life |
| close game | the winner fell to 35% of starting life or lower |
| comeback | at some point the winner was under half life and at least 20 points (of life %) behind the loser |
| loser cast no Manifest | the losing side never cast one |
| Manifest in final turns | the winner cast a Manifest in the last two half-turns (a proxy for "a Manifest decided it") |
| Manifest cast rate | Manifests cast / Manifests in both decks |
| options per turn | distinct playable cards + castable Manifests after the draw |
| AI first play not the biggest | on turns with 2+ options, the AI's first play was not the most expensive card it could play (a proxy for "the best line isn't the obvious one") |
| attacker held back | the active side had a creature able to attack and attacked with nothing |
| rounds with no face damage | neither side damaged the other player in a full round (a stall proxy) |

## Results, 2026-10-23 (main at 6e7de4d)

### AI level 3 (the in-game default), 600 games per set

| Metric | Starter | Mono | Dual | Triple | RPG wilds | Ladder (all 4) |
|---|---|---|---|---|---|---|
| Rounds (mean) | 4.33 | 4.28 | 3.40 | 3.02 | 3.37 | 3.76 |
| Over by round 2 | 1.8% | 3.8% | 16.5% | 28.2% | 8.0% | 12.6% |
| First player wins | 49.5% | 56.8% | 57.2% | 59.8% | 91.5%* | 55.8% |
| Blowouts | 58.3% | 55.2% | 48.8% | 47.8% | 82.5% | 52.5% |
| Close games | 22.5% | 23.0% | 26.0% | 30.2% | 7.7% | 25.4% |
| Comebacks | 19.2% | 21.5% | 23.0% | 30.0% | 7.2% | 23.4% |
| Loser cast no Manifest | 16.3% | 15.5% | 43.2% | 42.2% | 72.3% | 29.3% |
| Manifest in final turns | 31.2% | 53.3% | 49.8% | 50.5% | 42.2% | 46.2% |
| Manifest cast rate | 27.6% | 32.0% | 24.3% | 34.0% | 16.0% | 29.3% |
| Options per turn | 4.04 | 4.26 | 3.27 | 2.59 | 3.74 | 3.64 |
| Turns with nothing to play | 0.6% | 0.3% | 1.7% | 5.7% | 0.7% | 1.8% |
| Turns with 2+ options | 94.1% | 96.2% | 87.7% | 77.3% | 93.6% | 89.9% |
| AI first play not the biggest | 50.2% | 37.6% | 30.8% | 32.5% | 41.7% | 39.0% |
| Attacker held back | 14.0% | 13.6% | 13.7% | 10.2% | 10.7% | 13.0% |
| Rounds with no face damage | 20.9% | 19.4% | 15.2% | 12.2% | 34.8% | 17.5% |

\* In the RPG set seat 0 is always the player (AI 3) against a weaker wild, so this is the player's win rate, not first-player advantage.

### AI level 5, 40 games per set (small sample: about ±8 points)

| Metric | Mono | Dual | Triple |
|---|---|---|---|
| Rounds | 3.95 | 3.01 | 2.90 |
| Over by round 2 | 2.5% | 15% | 35% |
| First player wins | 65% | 52.5% | 65% |
| Blowouts | 67.5% | 47.5% | 52.5% |
| Comebacks | 15% | 30% | 37.5% |
| Loser cast no Manifest | 5% | 42.5% | 30% |
| Manifest cast rate | 34% | 22.5% | 36.7% |
| Options per turn | 4.12 | 3.39 | 2.58 |

### By element (mono vs mono, every pairing three times, L3, 2,280 games)

| Element | Win % | Rounds | Manifests cast | First Manifest (round) | Options per turn | Face damage per turn | Attackers per turn |
|---|---|---|---|---|---|---|---|
| Fire | 37.9 | 3.72 | 21.1% | 2.90 | 4.30 | 2.80 | 0.74 |
| Water | 56.1 | 5.08 | 38.9% | 2.77 | 4.35 | 2.52 | 1.03 |
| Earth | 60.1 | 4.93 | 39.4% | 2.21 | 3.18 | 3.69 | 1.29 |
| Wind | 46.7 | 3.96 | 29.9% | 2.47 | 4.65 | 3.09 | 1.01 |
| Lightning | 49.1 | 3.37 | 28.1% | 2.23 | 4.60 | 3.62 | 0.90 |

### Text length of basic cards in prebuilt decks

| Group | Words per card | Longest | Keywords per card | Sentences per card |
|---|---|---|---|---|
| Starter | 9.1 | 22 | 0.22 | 1.4 |
| Mono | 7.9 | 24 | 0.56 | 1.6 |
| Dual (fused) | 15.2 | 46 | 1.02 | 2.7 |
| Triple (fused) | 23.8 | 58 | 1.43 | 4.0 |
| Dual archetype | 14.5 | 36 | 0.86 | 2.2 |
| Triple archetype | 18.5 | 58 | 0.89 | 2.6 |

## What the numbers say

1. **Mono and Starter battles run long; triples run short.** Mono averages 4.3 rounds (target about 3), triples 3.0 but with 28% of games over by round 2 (35% at L5). Battle length shrinks as decks get stronger, so the late game will feel rushed and the early game slow.
2. **Too many blowouts.** About half of all games are won without the winner ever dropping below 60% life. Comebacks happen in about 1 game in 4, more in triples.
3. **The loser often never reaches a Manifest in dual and triple games (42-43%).** For pillar 3 ("every battle has a big moment") this is the weakest number.
4. **First-player advantage grows with deck power:** 50% for Starters, 57% mono and dual, 60% triple (65% at L5 for mono and triple). The 1 banked Energy for the second player is not enough once decks get strong.
5. **Choices are healthy for mono decks and thin for triples:** 96% of mono turns have 2+ options, 77% of triple turns; triples have 5.7% dead turns. Triple cards are three times as long to read as mono cards.
6. **Turn-1 kills exist.** 11 of 600 triple games ended in the first half-turn: Aurora common (First Light) plays Flowing Zap, gets 4 Aurora charge from it (hidden charge riders on its fused parts: Call the Embers +1, Zap +2, plus 1 for the card), casts Spark of Dawn (2 charge: 6 damage and gain 2 charge back) and Glimmer Eel (3 charge, 6/6 Haste), and attacks for 15 total. Flagged to Balance; the rules side is in `design/elements.md` (hidden rules).
7. **RPG wild duels are easy, as intended,** but the wild almost never casts a Manifest (AI level 1 never does), so early fights have no "monster arrives" moment from the enemy side.

## Next measurements

- Play sessions: read full logs of a few games per element turn by turn, and ask the designer to play set matchups on the playtest page.
- Re-run after Balance's Fire/Lightning change lands.
- Measure the deckbuilding options in `design/progression.md` once one is picked (e.g. a loot-card deck vs the Starter it came from).
