# Mechanics

Owner: TCG Design. Every rule and keyword lives here with what it does, who uses it, and why. This file starts with the newest rule; the full keyword list follows as it's written up.

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
