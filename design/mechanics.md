# Mechanics

Owner: TCG Design. Every rule and keyword lives here with what it does, who uses it, and why. Newest rules first; the full keyword list follows as it's written up.

## Tokens returned to hand are destroyed (designer, 2026-11-01)

**Rule:** a token that would return to a hand is destroyed instead. It doesn't go to the grave and gives no charge. This already works this way in the engine (`bounce` logs "fades away"), and the glossary says so: "If it leaves play it's gone for good; it never goes to a hand."

| Situation | What happens |
|---|---|
| Any "return a creature to its owner's hand" on a token | The token is destroyed. |
| Return effects on your own tokens (Updraft, Second Wind) | Same: your token is destroyed. Updraft's Energy and Second Wind's Energy still happen. |
| Token copies and creatures turned into tokens (`copy`, `transform`) | They are tokens, so the same rule applies. |
| Last Gasp | Doesn't trigger: the token wasn't destroyed by damage or a destroy effect. |

So bounce is hard removal against tokens, and Water's and Wind's bounce cards (354 of them name "basic creature") are the natural answer to a token swarm.

**Open (designer to pick):** whether tokens made by a Manifest count as Manifest creatures. Recommendation: no, every token is basic. See the board decision for the options.

## Players can heal above their starting life (designer, 2026-11-01)

**Rule:** life gain for a **player** has no cap. A player who starts at 15 and gains 4 life at 13 goes to 17; at 15 they go to 19. **Creatures** still can't be restored above their maximum health (`mend`).

| Situation | What happens |
|---|---|
| Any "gain N life" (cards, Drain, boss-break breather) | Adds N, no cap. |
| Restoring a creature (`mend`) | Up to its maximum health, as before. |
| Starting life | Stays the reference for "life missing" and Desperate N, and is what the screen shows after the slash (e.g. 19/15). |
| "Raise your maximum life" effects | Still raise the starting-life reference, so "life missing" effects keep working. |

**Measured** (AI level 3, 300 games per group; capped → uncapped):

| | Mono | Dual | Triple |
|---|---|---|---|
| Rounds | 4.31 → 4.28 | 3.58 → 3.69 | 2.91 → 3.14 |
| Over by round 2 | 5% → 6% | 12% → 6% | 34% → 27% |
| Blowouts | 51% → 62% | 53% → 48% | 50% → 57% |
| Comebacks | 22% → 17% | 22% → 26% | 33% → 22% |

Fast triple games slow down a little (fewer over by round 2), which is good. The risk is snowballing: in mono and triple games a life-gain deck that gets ahead now stays ahead (more blowouts, fewer comebacks). Water, Swamp and Geyser gain the most. Balance should watch life-gain amounts, especially repeating ones ("at the start of your turn, gain N life").


## Damage stays on creatures (designer, 2026-10-26)

**Rule:** damage dealt to a creature stays on it. A 3/5 that takes 3 damage is a 3/5 with 2 health left on every later turn, until something restores its health or it leaves play.

Until now all creature damage was wiped at the end of every turn (Magic-style). Now it works like Hearthstone.

### Edge cases

| Situation | What happens |
|---|---|
| Damage at end of turn | Stays. Nothing resets it. |
| The creature leaves play (returned to hand, destroyed, transformed) | It comes back fresh if it returns; a transformed creature is a new creature. |
| Temporary health ends ("+0/+3 this turn") | Its health drops, but losing a temporary bonus can't kill it: it keeps at least 1 health. |
| A static health bonus ends (the lord aura or creature granting it leaves) | Same: it keeps at least 1 health. |
| Permanent buffs and Fortify (+N/+N) | Raise both maximum and current health; they don't remove damage. |
| Boss phase break | The boss's creatures leave anyway; the player's creatures keep their damage. |
| Healing a creature | New effect, below. Health never goes above the creature's maximum. |

### New card language: restore health to a creature

Today "heal" only gives the player life. Creatures need their own healing:

- Atom `mend T N`: restore up to N health to the target(s). Text: "Restore N health to a creature" (`t`), "to your creatures" (`own`), "to this" (`self`); `mend own all` restores them fully.
- It doesn't set off "whenever you gain life" triggers, which are about the player's life.

### What it changes in play

AI-vs-AI at level 3, 300 games per group, damage reset vs damage kept (measured with a prototype before the engine change; the engine has kept damage since PR #41):

| | Starter | Mono | Dual | Triple |
|---|---|---|---|---|
| Rounds | 4.27 → 4.12 | 4.26 → 4.33 | 3.48 → 3.55 | 3.01 → 2.94 |
| Blowouts | 58% → 54% | 48% → 50% | 45% → 48% | 48% → 51% |
| Comebacks | 16% → 21% | 25% → 25% | 25% → 25% | 26% → 28% |

Boss fights (3 bars, slow start): 6.5 → 6.7 rounds, player wins within noise (52-58%).

The numbers barely move, because normal battles are short and most damaged creatures die the same turn. The change is in **how the game feels and what cards mean**:

- **Chip damage adds up.** Pings, Zaps, block triggers and small sweepers soften creatures over several turns, so Lightning's and Fire's small burn gets real board value.
- **Walls wear down.** A big blocker can't hold forever: each block costs it health. That shortens stalls and gives attacking into a wall a point.
- **Combat tricks matter more.** A damaged creature is a target; finishing it off with a 1-damage spell is a real play.
- **Healing creatures becomes an identity.** Water (tides that mend) and Earth (stone that knits back) should get the new `mend` effect; their life-gain cards are the first candidates to rework.
- **Readability:** the battle screen must show current health against maximum (for example 2/5 in red) on every damaged creature.

### Who does what

- **Game Dev:** engine (keep damage at end of turn; keep at least 1 health when temporary or static health ends; the `mend` atom; health shown as current/max).
- **Balance:** damage and ping effects are worth more, and healing creatures is new value; retune after the engine change.
- **TCG Design:** rework some Water and Earth life-gain cards into `mend` cards, keeping the card count. First eight done (2026-10-26): Tidepool Healer, Soothing Rain, Bubble Mage, Healing Torrent, Rain of Renewal (Water); Cliffside Watcher, Rampart Elder, Moss Titan (Earth).
