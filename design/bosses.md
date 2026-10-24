# Boss fights

Owner: TCG Design. Status: **Approved for boss monsters** (designer, 2026-10-24); NPC duels stay normal battles for now. Numbers are Balance's; the engine work is Game Dev's.

**Goal (designer, 2026-10-24):** normal monster battles last under 4 turns a side. Boss monster battles (a crowned monster or a monster of a higher rank) last about 6-7 turns.

**NPC duels (designer, 2026-10-24):** phases don't fit people, so NPC duels play as normal battles, without phases. What makes an important one hard is the AI level.

| Opponent | AI level |
|---|---|
| Normal monsters (wilds) | 1, 2 or 3 |
| Boss monsters | 3 or 4 |
| Normal NPC duels (trainers, contracts) | 3 or 4 |
| Important NPC duels (rivals, Exalted, story duels) | 5 |

**Proposal:** a boss fights in **phases** (2 or 3 life bars). It **starts slow** (2 Energy instead of 3 in its first phase) and **wakes up** as you break it. Each **phase break** is a beat: the boss's creatures leave the board, you get a breather, the music and story step up. A crowned boss also breaks **one named rule** (its crown).

## What the sims say

`design/tools/bosssim.js` plays a player deck against a boss deck with these rules switched on or off (AI level 3 both sides, 60-80 games per row; the player always goes first, so win rates read a few points high). Extra bars are life added on top of the boss deck's normal life.

**Boss one rank above the player** (mono common vs mono uncommon):

| Boss rules | Player wins | Rounds (mean) | Middle half | Over by round 4 | 6-7 rounds |
|---|---|---|---|---|---|
| None | 39% | 4.1 | 3-5 | 46% | 13% |
| +10 life | 11% | 4.3 | 3-6 | 48% | 25% |
| 3 bars (+8, +8), board clears on a break | 21% | 5.0 | 3-6.5 | 38% | 25% |
| same + player +5 life | 28% | 5.5 | 4-6.5 | 23% | 26% |
| same + player heals 4 and draws on each break | 38% | 5.3 | 3-6.5 | 26% | 36% |
| **3 bars, board clears, boss 2 Energy in phase 1** | **50%** | **6.6** | **4.5-8.5** | **10%** | **34%** |
| 3 bars, board clears, boss 2 Energy all fight, player heals 3 and draws on each break | 56% | 6.8 | 4.5-8.5 | 13% | 39% |
| 2 bars (+10), board clears, boss 2 Energy throughout | 54% | 5.8 | 3.5-7 | 26% | 23% |
| Damage cap: boss loses at most 4 life a turn, +10 life, player +5 | 13% | 5.5 | 3-7 | 29% | 20% |

**Boss at the player's own rank** (tested for NPC duels before the designer kept them as normal battles; mono common vs mono common):

| Boss rules | Player wins | Rounds | Middle half | Over by round 4 |
|---|---|---|---|---|
| None | 61% | 4.8 | 4-5.5 | 18% |
| **2 bars (+8), board clears, 2 Energy in phase 1** | **69%** | **7.6** | **5.5-9.5** | **5%** |
| 3 bars (+8, +8), board clears, Energy 2 → 3 → 4 by phase | 56% | 9.2 | 6.5-11.5 | 0% |

**Higher tier** (mono rare player vs dual common boss, one step up):

| Boss rules | Player wins | Rounds | Over by round 4 |
|---|---|---|---|
| None | 38% | 4.3 | 42% |
| **3 bars (+8, +8), board clears, 2 Energy in phase 1** | **63%** | **6.6** | **5%** |
| 2 bars (+10), same | 70% | 5.6 | 12% |

What this means:

1. **More life alone doesn't make longer fights; it makes you lose** (11% win at +10 life). A stronger boss ends the fight on *your* life total before you get through its. The boss's damage per turn has to drop as its life goes up.
2. **A slow first phase is the lever that works.** With 2 Energy in phase 1, fights land at 6.5-7.5 rounds and almost never end by round 4 (5-10%).
3. **Phases with a board clear** turn one long grind into 2-3 short fights, each with a turning point. The player keeps their board, so winning a phase feels earned.
4. **A damage cap ("can't lose more than N life a turn") is the wrong tool:** it stretches fights by making burst useless, and the player still loses (13%).

## The boss framework

| Boss kind (AI level 3 or 4) | Phases | Phase 1 | Each break | Crown rule | Target |
|---|---|---|---|---|---|
| Higher-rank monster (no crown) | 2 (bar 2 about +10) | Boss at 2 Energy | Boss's creatures leave | None | about 6 rounds |
| Crowned monster (act boss, Vault guardian) | 3 (bars about +8, +8) | Boss at 2 Energy | Boss's creatures leave; player heals 3 and draws 1; the crown may escalate | One named broken rule | 6-7 rounds |

Rules for every boss:

- **Phases.** When a boss hits 0 life with a bar left, it doesn't lose: it refills to the next bar and its creatures leave play (no Last Gasp triggers). The player's board, hand and charge carry over. The screen shows the bars ("Phase 2 of 3").
- **Waking up.** The boss gains 2 Energy a turn in phase 1, then the normal 3. A crowned boss may go to 4 in its last phase if Balance needs the extra push.
- **Breather.** On each break the player heals 3 and draws a card (crowned bosses; optional elsewhere).
- **Manifests.** Fights this long are where 5-6 charge Manifests get cast; the player's charge carries across phases, so a big Manifest saved for the last phase is a real plan.
- **Losing.** As today: back to the heal point. No progress is kept between attempts.

## Crown rules

A crowned boss breaks exactly one rule and names it when the fight starts (Story's framing). A crown can be on from the start or arrive at a phase break. Menu of first crowns (engine support needed for each):

| Crown | Rule it breaks | Feels like |
|---|---|---|
| **Lurker** | The boss's creatures can't be attacked or targeted on the turn they arrive | Ambush; rewards holding blockers |
| **Brood** | At the start of the boss's turn it summons a token while its brood lives (see side fights) | A clock to beat |
| **Sealwork** | Phase breaks also restore the boss's best creature (it rebuilds) | A puzzle: kill the creature or the boss first? |
| **Twin Call** | The boss may cast two Manifests in one turn | The big-moment boss |
| **Unbound** | The boss's biggest creature can't be blocked | A race you can't wall |
| **Tide** | At the end of each round, the boss returns your most expensive creature to your hand | Tempo pressure |
| **Overcharge** | The boss's Manifests cost 1 less charge | Fast escalation |

## Companion side fights

Designer: companions don't duel, but in fights with more than one monster they take on the extra monsters while Wren fights the main one.

- A side fight is a **side threat** shown beside the boss's life: a name, a small health track (3 by default) and an effect on the duel while it lives (e.g. "Brood: the boss summons an Ember Spark at the start of its turn").
- **The crew** knocks 1 off the side threat at the end of every round, automatically. When it reaches 0, the effect stops ("Brann and Dove hold the brood!"), a clear moment for barks.
- The player can speed it up: damage dealt to the boss's face **during a phase break turn** also hits the side threat (optional; Game Dev's call on how readable that is).
- Story outcomes are scripted (d-1792822720754); the side fight only changes the duel.

## Act I bosses (worked examples, from Story's demo spec)

| Boss | Rank vs Wren | Deck (Story's proposal) | Phases | Crown | Notes |
|---|---|---|---|---|---|
| Gullet, the Millrace Lurker | Copper vs Tin | water_tide | 2 (+8) | **Lurker** | First boss: teaches phases. Mild. |
| The Cinder Mother | Iron vs Copper | fire_fury | 3 (+8, +8) | **Brood**, with Brann and Dove holding the brood (side threat, health 3) | Teaches side fights and the crew. |
| The Sluicewarden | Steel vs Iron | earth_titans | 3 (+8, +8) | **Sealwork** (a stone-and-water golem that rebuilds) | The Vault guardian before Slackwater. |

Balance tunes life, AI level and bars so each is about a 40-55% first try (their target).

## What each role needs to do (once the designer approves)

- **Game Dev:** boss data on trainer and boss entries, e.g. `boss: { bars: [8, 8], slowStart: true, clearOnBreak: true, breakHeal: 3, crown: "brood", side: { name: "The Brood", hp: 3, effect: "start: summon ember 1" } }`; phase bars on the battle screen; the crowns above, one at a time as bosses need them. The phase and Energy rules are about 15 lines of engine code (`design/tools/bosssim.js` has a working prototype of each).
- **Balance:** bar sizes, boss AI level and life per boss.
- **Story:** the name and reason for each crown, barks for side fights.
- **Music:** intensity floors per phase, stingers on crown reveal and on each phase break.
