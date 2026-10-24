# Elements and confluences

Owner: TCG Design. Status: **Draft v1** (2026-10-23). Written from the card files as they are on `main`, not from intent; where the cards and the design doc disagree, both are noted. Numbers come from `design/metrics.md` (AI level 3, mono decks vs mono decks, 2,280 games) and a scan of every card's text.

Each identity has: **how it wins**, **how it loses**, **signature mechanic**, **what it feels like to play**, and **what's muddy**.

## The five base elements

| Element | Life | Wins by | Loses to | Signature (doc) | Signature in the cards |
|---|---|---|---|---|---|
| Fire | 16 | Burst damage: burn spells, haste, tokens | Big blockers and life gain | Ignite | Ignite on 9 of 100 basics; Overcharge on 3 |
| Water | 15 | Outlasting: draw, freeze, bounce, Drain, counters | Fliers and fast burn | Reactions | 19 Reactions (most of any element), 25 freeze, 13 bounce, 6 counters |
| Earth | 16 | Big bodies that grow, defended by walls | Fliers, bounce and freeze | Fortify | Fortify on 14; Vigilant 14, Skyguard 8 |
| Wind | 15 | Airborne pressure and replaying arrival effects | Skyguard walls, sweepers | Airborne + return own creatures | Airborne on 53 of 100; bounce on 18 (own and enemy) |
| Lightning | 14 | Cheap spells chained into burn and haste | Card disadvantage, big blockers | Chain | Chain on 10; Attuned on 7; 30 spells, 28 Haste |

Measured play pattern (mono vs mono, L3):

| Element | Win % | Rounds per game | Manifests cast | First Manifest (round) | Playable options per turn | Face damage per turn | Attackers per turn |
|---|---|---|---|---|---|---|---|
| Fire | 38 | 3.7 | 21% | 2.9 | 4.3 | 2.8 | 0.7 |
| Water | 56 | 5.1 | 39% | 2.8 | 4.4 | 2.5 | 1.0 |
| Earth | 60 | 4.9 | 39% | 2.2 | 3.2 | 3.7 | 1.3 |
| Wind | 47 | 4.0 | 30% | 2.5 | 4.7 | 3.1 | 1.0 |
| Lightning | 49 | 3.4 | 28% | 2.2 | 4.6 | 3.6 | 0.9 |

(Balance is already handling Fire's and Lightning's win rates: PR #2 / #3. The table is here for *how* each element plays.)

### Fire: "burn it down"

- **Wins by** spending everything for a burst turn: burn to the face, hasty attackers, Ember Spark tokens pumped all at once.
- **Loses to** big blockers it can't burn through and life gain that undoes its damage.
- **Feels like** racing: every card is a threat, the clock is the opponent's life.
- **Decks:** Ember Swarm (tokens + pump), Pyromancer (spells that burn and draw), Reckless Fury (self-damage for pierce), Inferno Dragons (fliers that burn on arrival).
- **Muddy:**
  - Fire is the "aggression" element yet deals the *least* face damage per turn of the five (2.8) and casts the fewest Manifests (21%). It plays like a slow burn deck that runs out of cards.
  - Its signature, **Ignite** (bonus if you spent charge this turn), is on only 9 of its 100 basics. Ignite fires only on turns you cast a Manifest or Overcharge, and Fire has little Overcharge (3), so most Ignite text is blank. The Starter deck shows the idea well (Cinder Hound, Flame Lash, Kindling Hearth); the main pool doesn't follow up.
  - Haste and burn are shared with Lightning (see overlaps).

### Water: "the tide always wins"

- **Wins by** trading one-for-one and drawing more: freezing or bouncing the biggest threat, countering key cards, Drain blockers that heal.
- **Loses to** fliers (few Skyguard), wide boards it can't freeze all at once, and fast burn before it stabilises.
- **Feels like** control: you act on the opponent's turn, and the board slowly tilts your way.
- **Decks:** Tidecaller (draw + Drain blockers), Frostbind (freeze lock), Riptide (bounce + counters), Abyssal Leviathans (huge Drain bodies).
- **Muddy:**
  - The clearest identity of the five, but it has the longest games (5.1 rounds against a 3-round target): Water battles drag.
  - Bounce is shared with Wind, and big blockers with Earth.

### Earth: "the mountain doesn't move"

- **Wins by** landing creatures bigger than anything else on the board and making them grow (Fortify), behind Walls and Vigilant guards; ramps Energy and charge.
- **Loses to** fliers, freeze and bounce (tempo against its expensive cards), and being out-drawn.
- **Feels like** inevitability: survive the early turns, then your creatures outclass theirs.
- **Decks:** Stonewall (Walls, Vigilant, block triggers), Deep Roots (ramp into giants), Crystal Growth (Fortify and permanent buffs), Titans (oversized creatures).
- **Muddy:**
  - The "defensive" element is the best beatdown element: the most face damage per turn (3.7), the most attackers per turn (1.3), the earliest Manifests (round 2.2) and the best win rate. Its creatures average 5.4/6.8 in stats against 2.5-3.2 attack elsewhere, so "defend then win" is really "be bigger".
  - It has the fewest playable options per turn (3.2): Earth turns are often "play the big thing".
  - Walls (5 cards) and block triggers (7) are a small slice; Stonewall is the only deck that really defends.

### Wind: "you can't catch the wind"

- **Wins by** going over the top: many Airborne creatures that most decks can't block, flock leaders that pump them, and cheap arrival effects replayed by returning your own creatures.
- **Loses to** Skyguard walls and anything that kills many small creatures at once.
- **Feels like** tempo: cheap threats, Energy refunds, never quite blocked.
- **Decks:** Featherflock (wide fliers + lords), Zephyr Tricks (replay arrival effects, bounce), Gale Riders (hasty fliers), Sky Sovereigns (elite fliers).
- **Muddy:**
  - Airborne is on 53% of Wind's basics, so "Wind" and "Airborne" are nearly the same word. Airborne is also the keyword the value model under-priced most (decks of fliers win far more than their numbers say), which makes it the main cause of balance outliers when fused onto other elements.
  - "Return your own creature to replay it" is the doc's signature, but most of Wind's 18 bounce effects hit enemies, which is Water's job. Zephyr Tricks is the only deck built on self-bounce.

### Lightning: "strike fast, strike often"

- **Wins by** chaining several cheap cards in one turn: each spell powers up creatures, Chain bonuses trigger, and the last card deals the burn.
- **Loses to** running out of cards, and to big blockers once its early pressure is absorbed.
- **Feels like** combo: a turn with five cards played is the dream.
- **Decks:** Spark Storm (cheap spells + Chain), Static Charge (Attuned thresholds and charge ramp), Overload (haste + burn), Thunder Gods (strongest single strikes).
- **Muddy:**
  - **Chain** is on only 10 of 100 basics; most Lightning cards are plain haste creatures and burn spells, which is what Fire does. In play, Lightning deals more face damage than Fire (3.6 vs 2.8 per turn) and ends games faster (3.4 rounds), so it is the real "aggro" element today.
  - **Attuned** (Static Charge) asks you to *hold* charge while Manifests ask you to *spend* it; the two pull against each other in a 3-round game.
  - Lightning has the most 6-charge Manifests (10 of 45), which rarely get cast in a 3-round game.

### Overlaps between base elements

| Pair | Shared | Today they differ by | Risk |
|---|---|---|---|
| Fire / Lightning | Haste, burn to the face, spell triggers | Fire: tokens, pierce, sweepers. Lightning: Chain, Attuned | **High.** Both are "haste + burn". In play Lightning does Fire's job better. |
| Water / Earth | Big blockers, healing, Vigilant, Skyguard | Water: freeze, bounce, draw. Earth: size and Fortify | Medium. Fine while Earth wins by size, not by blocking. |
| Water / Wind | Bounce | Water bounces enemies; Wind should bounce its own creatures | Medium. Wind's enemy bounce blurs both. |
| Wind / everyone | Airborne on bodies | — | Airborne is Wind's identity but appears on 749 cards across the pool through fusion. |

## Confluences (dual)

Each confluence has three layers of identity today, and they rarely agree: the **design doc's** idea, the **regular fused decks** (fusions of parent cards: "all keywords and effects from both parents"), and the **archetype** (20 special cards and 10 special Manifests per confluence).

| Confluence | Elements | Life | Design doc idea | Archetype (special cards) | Regular fused decks play like |
|---|---|---|---|---|---|
| Volcano | Fire + Earth | 17 | Pressure counters, then erupt | Eruption: sacrifice own creatures, Last Gasp blasts | Big pierce bodies |
| Wildfire | Fire + Wind | 19 | Effects that spread to neighbours | Spreading Flames: hit every enemy creature, profit when they die | Fliers with burn |
| Plasma | Fire + Lightning | 17 | Overload: power at a life cost | Overload: hurt yourself, Desperate bonuses | Haste and burn |
| Steam | Fire + Water | 16 | Hidden cards, damage to what touches it | Pressure: effects scale with hand size and draws | Ward blockers that burn, draw |
| Swamp | Water + Earth | 13 | Regeneration, graveyard recursion | Grave Tide: Venom, creatures return from the grave | Drain, healing, death tokens |
| Ice | Water + Wind | 13 | Lockdown: freeze, slow the opponent | Shatter: freeze, then punish frozen creatures | Freeze plus Airborne and Skyguard |
| Storm | Water + Lightning | 13 | Big chain turns fuelled by draw | Spellstorm: spells count, spell damage bonuses | Draw and spell triggers |
| Sand | Earth + Wind | 15 | Erosion: grind deck and hand | Erosion: permanent -X/-X, bounce payoffs | Bounce, chip damage, sturdy fliers |
| Metal | Earth + Lightning | 14 | Equipment | Plating: Barrier, permanent armour, creatures that fight | Permanent buffs, Fortify, Vigilant |
| Tempest | Wind + Lightning | 15 | Pure speed: extra attacks and combat steps | Blitz: haste for all, double attack, untap | Airborne haste, lords |

Clear and consistent across all three layers: **Ice, Storm, Plasma, Tempest, Swamp.** Muddy: **Volcano** (the doc's pressure counters were never built; the archetype is sacrifice, the fused decks are just big), **Steam** (three different ideas), **Metal** (equipment was never built), **Sand** (doc says grind the deck and hand; cards erode the board), **Wildfire** ("spread to neighbours" has no board positions to spread across).

## Triples

| Triple | Elements | Life | Archetype | Notes |
|---|---|---|---|---|
| Geyser | Fire + Water + Earth | 15 | Wellspring: life gain erupts as damage | Clear hook. |
| Mirage | Fire + Water + Wind | 16 | Illusions: copies, silence, stealing, discard | Many new effect types; hardest to read. |
| Aurora | Fire + Water + Lightning | 13 | Radiance: extra charge, Manifests early and often | See the turn-1 kill in `metrics.md`: charge riders stack through fusion. |
| Ash | Fire + Earth + Wind | 14 | Cinders: tokens that burn out and rise again | Clear. Strongest triple by win rate (doc). |
| Forge | Fire + Earth + Lightning | 16 | Artifice: auras that power each other | Clear, slow. |
| Solar | Fire + Wind + Lightning | 20 | Sunfire: every hit on the enemy fuels more burn | Overlaps Plasma and Wildfire. |
| Glacier | Water + Earth + Wind | 15 | Bulwark: walls that win by defending | The only real "defend to win" deck in the game. |
| Quicksilver | Water + Earth + Lightning | 13 | Shapeshift: swap, copy, transform | Clear, complex. |
| Hurricane | Water + Wind + Lightning | 14 | Maelstrom: mass bounce and replay | Overlaps Wind's self-bounce idea. |
| Glass | Earth + Wind + Lightning | 15 | Shards: Barriers, damage reflected back | Clear. |

Regular triple decks are fused from three base cards each, so a triple card averages **24 words and 4 sentences** of rules text (mono: 8 words). The archetype decks read far better (18 words). Regular triple decks also have the most dead turns (5.7% with nothing to play) and the fewest options per turn (2.6).

## What's missing or muddy (summary)

1. **Signature mechanics are thin.** Ignite (9 cards), Chain (10), Attuned (8), Overcharge (7), Desperate (9) are each on fewer than 1 in 10 of their element's cards. The Starter decks show each signature clearly; the 300 Common/Uncommon/Rare cards per element mostly don't follow up.
2. **Fire and Lightning are both "haste + burn",** and Lightning does it better. Fire needs a plan of its own (tokens and Ignite burst turns are the best candidates).
3. **Earth wins by size, not defence.** It is the strongest beatdown element. Either embrace "giants" as the identity or give defence a way to win (Glacier's Bulwark shows one).
4. **Wind is "the Airborne element",** and Airborne leaks everywhere through fusion. Self-bounce (replaying arrivals) is the more distinctive Wind idea and is underused.
5. **Keywords nobody uses:** Venom (13 cards, Swamp only), Wall (25), Barrier (39) against Airborne (749) and Haste (648).
6. **Hidden rules:** fused cards drop charge riders from their text (Aurora's Flowing Zap shows no charge gain but gives 4 charge), and the balance pass made Spark of Dawn cost 2 charge and give 2 back. Both break test 4 and test 6 of the card test.
7. **Rarity roles are numeric only.** Common = Starter power, Uncommon a step up, Rare clearly stronger. Nothing about *what* a rare does differs from a common (no rare-only build-arounds), so finding a rare in the RPG would feel like "+1 power", not "new plan". This is the gap the loot cards (`design/progression.md`) should fill.
8. **Three identities per confluence** (doc, fused decks, archetype). Pick one per confluence and make the other two serve it.
9. **Triple fused cards are too long to read** and play worse (fewer options, more dead turns).
10. **Manifests at 5-6 charge rarely matter** in normal battles (designer decision: they're for bosses), but Lightning holds 10 of them. Each element should have enough 2-4 charge Manifests for normal play.
