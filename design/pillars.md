# Design pillars

Owner: TCG Design. Status: **Draft v1** (2026-10-23), written from the current card pool, the design doc and a first round of fun metrics (`design/metrics.md`).

The game's one moment: **you find a striking card deep in a dungeon and want to rebuild your whole deck around it.** Every pillar serves that moment, or the short battles that make up the rest of the game.

## The five pillars

### 1. A card is a plan

The best cards ask you to build around them. Finding one should make you open the deck builder, not just slot it in.

- Loot cards and rares carry a *build-around*: text that gets better the more of your other 19 cards help it (Reactions, tokens, Airborne, charge, spells...).
- Commons and Starter cards are the *glue*: simple, flexible, useful in many plans.
- A deck should be describable in one sentence of intent ("freeze their best creature every turn, then shatter it").

### 2. Short battles, real decisions

Normal battles last about 3 turns a side (designer decision). Because there are so few turns, each one must matter.

- Every turn should offer at least two sensible plays, and the right one should depend on the board.
- No dead turns: you should almost never have nothing to do.
- Battles end because someone outplayed or outbuilt the other, not because of a single unanswerable opening.

### 3. Every battle has a big moment

Manifests are the payoff of the charge system and the "monster arrives" beat of the RPG.

- In a normal battle, each side should usually reach at least one Manifest, and it should matter when it lands.
- 2-4 charge Manifests are the everyday payoff; 5-6 charge ones belong to boss fights and long games.
- A Manifest should feel like a monster or a miracle: big, readable, worth a sound cue.

### 4. Elements play differently, not just look different

Each element (and each confluence) has its own way of winning and its own weakness, and you feel it in your hands within a turn or two.

- An element's signature mechanic shows up often enough in its cards that a deck of that element *uses* it.
- Two elements that win the same way are one element too many. Overlaps (shared keywords) are fine when the plan differs.
- See `design/elements.md` for each identity and the current overlaps.

### 5. Readable at a glance

The audience is the designer and friends playing in a browser. If you have to read a card twice, it is too long.

- A basic card reads in one or two short sentences; a Manifest may have three.
- A small set of keywords, used consistently, beats many one-off rules.
- You should be able to guess what the enemy might do from what is on the board and their element.

## Supporting rules (from the designer)

- PvE only, so fun and power fantasy come first; balance between deck types needs to be close, not exact.
- Switching decks or elements should cost almost nothing; progression belongs to the player, not to an element.
- Bosses get longer fights through mechanics that break one named rule (Story's "crown" framing), not through bigger numbers alone.

## The card test

Every new or reworked card, mechanic or deck must pass these before it goes to Balance:

| # | Question | Fails when |
|---|---|---|
| 1 | **Decision:** does it create a choice for its owner or the opponent? | It is always played on curve at the same target, or it is never right to play. |
| 2 | **Belonging:** would a player guess its element from its text alone? | It could be any element's card with the name changed. |
| 3 | **Pays off in time:** can it matter in a 3-turn battle? | Its payoff needs 5+ turns or a combination that rarely comes together. |
| 4 | **Reads in one breath:** can you say what it does in one sentence? | It needs three sentences (basic card) or hides a rule the text doesn't show. |
| 5 | **Plan (rares and loot only):** does it pull the rest of the deck toward something? | It is just a bigger version of a common. |
| 6 | **No free lunch:** does it respect the charge rules? | It refunds its own cost, or makes charge from nothing in a way that loops. |

## How we measure the pillars

`design/tools/funmetrics.js` measures these from AI-vs-AI games; `design/metrics.md` holds the latest numbers. Targets are a first draft, to be confirmed by playing:

| Pillar | Metric | Draft target | Now (L3, ladder decks) |
|---|---|---|---|
| 2 | Rounds per battle (each side's turns) | about 3, rarely over 5 | 3.8 (mono 4.3, dual 3.4, triple 3.0) |
| 2 | Battles over by round 2 | under 10% | 12.6% (triple 28%) |
| 2 | Turns with 2+ playable options | over 85% | 90% (triple 77%) |
| 2 | Turns with nothing to play | under 2% | 1.8% (triple 5.7%) |
| 2 | First player's win rate | 50-55% | 55.8% (triple 59.8%) |
| 2 | Blowouts (winner never fell below 60% life) | under 40% | 52.5% |
| 2 | Comebacks (winner was under half life and clearly behind) | over 20% | 23.4% |
| 3 | Loser never cast a Manifest | under 20% | 29.3% (dual 43%, triple 42%) |
| 3 | Manifests cast, share of the Manifest deck | over 35% | 29.3% |
| 5 | Words per basic card in prebuilt decks | under 15 | mono 8, dual 15, triple 24 |

For RPG encounters (a player deck against weaker wild decks) the targets are different on purpose: the player should win most wild duels. Trainers and bosses are where these battle targets apply in full.
