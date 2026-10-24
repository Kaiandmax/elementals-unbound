# Collection, deckbuilding and loot cards

Owner: TCG Design. Status: **Options for the designer — nothing here is decided.** No cards or rules change until the designer picks.

What already exists and these options build on:

- The battle engine plays a deck as **10 different basic cards x 2 copies (20 cards)** plus a **Manifest deck of 4** (decided 2026-10-24, the same for mono, dual and triple decks; see "Manifest deck size" below). The balance sims and the 1-10 power ladder are all built on that shape.
- A deck is one element. Two- and three-element decks are **confluence decks** made of fused cards from the Forge (fusing never uses up the cards).
- The Adventure prototype lets you pick one of five Starter decks and puts chest cards into a `collection` list; there is no deck builder yet.
- Story's draft: guild ranks map to the power ladder (Tin 1 ... Exalted 10); dual braiding (Forge) unlocks at Silver, triples at Adamant; dungeons ("Vaults") each hide a named great wild, and the first one on the map is the Weir Vault.
- Design doc rules: switching decks or elements should cost almost nothing; progression belongs to the player, not to an element.

## The choice: three rule sets

### A. Bound cards, Forge to mix (recommended)

| Rule | Proposal |
|---|---|
| Starting deck | Pick one of the five Starter decks (as the prototype does today). |
| Owning cards | **Finding a card binds it: you own it for good, no copies to collect.** Chests, trainers, quests and boss wins give cards; wild duels give a card now and then. |
| Deck size and copies | 20 cards: 10 different basic cards x 2. Manifest deck: 4, chosen from Manifests you own. Loot cards are Manifests (one of each, by nature). |
| Elements | One element per deck. The other four **Starter sets** unlock the first time you beat a wild of that element, so you can switch element as soon as a card tempts you. Dual fusions unlock at Silver rank, triples at Adamant (Story's ranks); you can fuse any cards you own. |
| Rebuilding | Any time outside battle, free. Several saved decks. |

**Why:** the moment you find a loot card you can build around it right away, which is the whole fantasy. It keeps the exact deck shape the engine and the sims use, so Balance's ladder still applies, and it matches "cards are bound monsters" from the Story Bible.

**Costs:** no "collect the second copy" loop; rewards must come from new cards, not duplicates. The deck builder needs a filler for decks that aren't complete yet (suggest: empty slots auto-fill from that element's Starter set).

### B. Copies matter (collector)

| Rule | Proposal |
|---|---|
| Starting deck | A Starter deck, owned as 20 physical cards. |
| Owning cards | You own copies. Each find gives one copy; duplicates come from repeat wins, shops and trades. |
| Deck size and copies | 20 cards, up to 2 copies of a basic card (the engine would need to accept 1-copy cards); Manifests as in A. |
| Elements | As in A, but the Forge consumes nothing and needs a copy of each part. |
| Rebuilding | Any time outside battle. |

**Why:** a classic collecting loop with reasons to replay routes and a use for shops and trading.

**Costs:** you find the great card but can't rebuild around it until you own enough supporting copies, which works against the core moment and against "switching costs almost nothing". Needs engine work for 1-copy slots and a Balance pass for odd-shaped decks.

### C. Free mix

| Rule | Proposal |
|---|---|
| Starting deck | A Starter deck. |
| Owning cards | As A (bound). |
| Deck size and copies | 20 cards, up to 2 copies; any mix of base elements. |
| Elements | Mix any elements freely; each card gives its own element's charge and each Manifest costs its own element's charge. Confluences become a bonus layer on top. |
| Rebuilding | Any time outside battle. |

**Why:** the most freedom; a loot card from any element slots into any deck.

**Costs:** a rules change to the core loop (decks with several charge pools), confluence decks lose their reason to exist, every balance number and the power ladder need redoing, and elements blur together (pillar 4). Not recommended for now.

### Smaller questions inside A (my defaults in brackets)

1. Where can you edit decks? [Anywhere outside battle.]
2. Do the other Starter sets unlock by beating a wild of that element, or are all five open from the start? [Beat one wild of the element; it happens naturally in the first hour.]
3. Do wild duels give cards? [Sometimes: a card of that wild's element and tier. Trainers always give one.]
4. Are loot cards Manifests? [Yes: see below.]

## Loot cards

**What they are:** the named great wild sealed in each Vault, bound into a card. One per dungeon, found at the end, revealed with ceremony.

**Recommendation: loot cards are Manifests.** A Manifest is never drawn, so if you build around it, your new monster shows up in *every* battle you can charge it for, with no draw luck. The design doc already says "choosing your Manifests is the first step of deckbuilding and should pull your main deck toward a strategy"; a loot Manifest is that rule made into a reward. To make sure it actually lands in a 3-round battle (Manifests are cast in only about 30% of chances today), loot Manifests cost 2-4 charge and their power comes from the deck you build, not from a big cost.

**The loot card test** (on top of the card test in `design/pillars.md`):

- It rewards a kind of card your Starter deck has few of, so using it well means rebuilding.
- Built around, it is clearly better than your current best Manifest; dropped into an unchanged deck, it is only fine.
- It teaches a skill the game hasn't asked for yet.
- It has a story: the great wild it was, why it was sealed (Story names it).

### The first loot card (concept, numbers are Balance's)

**Placeholder name: the Weir Warden** (Story to name). A great river serpent sealed in the Weir Vault.

| | |
|---|---|
| Element | Water |
| Type | Manifest creature, **3 Water charge** (proposed) |
| Body | 2/5, Ward (proposed) |
| Text | Whenever you play a Reaction, this gets +1/+1 permanently and deals 1 damage to the enemy. |
| Card language | `Mf("Weir Warden",3,"creature",[2,5],"ward","react: buff self 1 1; dmg face 1")` (the engine already supports this) |

**Why it makes you rebuild:** every Starter deck has 0-3 different Reactions (Earth has none). The Warden wants 6-10 Reaction cards, so you rebuild into a Water deck that holds Energy back and acts on the opponent's turn: Chill, Deflect, Tidal Shield, Icy Grip, Riptide Counter at Common; Frozen Aegis, Whiplash Tide, Nullify at Uncommon. A Fire player has to switch element to use it, which is the fantasy.

**What it teaches:** banking Energy and the Reaction window (playing on the enemy's turn), the half of the rules no Starter deck pushes.

**Risks to test:** the AI's Reaction timing (a reaction deck piloted badly by the AI looks weak in sims); stalls (Water already has the longest games; the Warden's 1 face damage per Reaction is there to keep it closing games); whether 2/5 Ward is too safe a body.

**Built (2026-10-24):** `water_slackwater_the_weir_serpent`, Slackwater, the Weir Serpent (Story's name), in `cards/water.js`. It reworks the unused rare Manifest Moonlit Tide, so the card count is unchanged. Proposed numbers: 3 Water charge, 2/5, Ward; Balance sets the final ones.

Loot-card test (AI level 3, 120 games each against the ten mono common decks):

| Deck | Wins | Slackwater cast |
|---|---|---|
| Water Starter, unchanged | 58% | — |
| Water Starter, Slackwater swapped in for Kraken of the Deep | 47% | 68% of games |
| Rebuilt around Reactions (Chill, Deflect, Tidal Shield, Icy Grip, Riptide Counter + the Starter's three), no Slackwater | 56% | — |
| Rebuilt around Reactions, with Slackwater | **84%** | 98% of games |

It does what a loot card should: little in an unchanged deck, a big payoff once you rebuild. 84% is high against same-rank decks; Balance may trim it, but a big jump is the point of a loot card.

### The next few (sketch, to refine with Story's region order)

| # | Element | Build-around | What you rebuild into | Skill it teaches |
|---|---|---|---|---|
| 2 | Earth | Gets +1/+1 for each creature you have with Fortify; your Fortify creatures grow +1 extra | Crystal Growth style: every creature grows each turn | Planning across turns, protecting a board |
| 3 | Wind | When it arrives, return any number of your other creatures to hand; they cost 1 less this turn | Zephyr Tricks: cheap arrival effects replayed | Sequencing and replay value (Wind's real identity) |
| 4 | Fire | Ignite: whenever you spend charge, summon an Ember Spark; your tokens have +1/+0 | Ember Swarm with Overcharge cards | Ignite: spending charge on purpose, a burst turn |
| 5 | Lightning | Costs 1 less charge for each other card you played this turn (min 1) | Spark Storm: many cheap spells in one turn | Chain: playing several cards in one turn |
| 6+ | Confluences | One per confluence once the Forge opens, each pushing that confluence's archetype | Fused or archetype decks | That archetype |

Each of 2-5 deliberately revives an element's signature mechanic, which `design/elements.md` found thin in the current pool.

## Manifest deck size: 4 for every deck (decided 2026-10-24)

Every deck carries **4 Manifests**, whatever its element count. Nothing rewards staying with fewer elements: the designer wants players to move through the elements as the journey goes.

Why 4 (mono decks, AI level 3, 760 games per size):

| Manifests per deck | Cast per player per battle | Each slot cast | Slots cast in under 10% of games | Casts going to the deck's favourite | Blowouts |
|---|---|---|---|---|---|
| 2 | 1.44 | 72% | 5% | 64% | 53% |
| 3 | 1.66 | 55% | 13% | 53% | 57% |
| 4 | 1.63 | 41% | 23% | 48% | 60% |
| 5 | 1.58 | 32% | 31% | 47% | 63% |

- Charge income, not slot count, caps how many Manifests land: about 1.5 per player per battle at any size from 3 to 5.
- Extra slots only add situational answers ("a hat of solutions"): at 5, almost a third of slots are almost never cast and the winner has more ways to press a lead.
- At 4, most casts still go to one or two Manifests that define the deck, and a fourth earns its place in longer boss fights.

What a Manifest should be, now that there are only four (rules for the "fewer, stronger Manifests" pass):

- **Mostly proactive:** creatures and auras that change how you play. At most one pure answer (removal, sweeper, mass bounce) per prebuilt deck.
- **A plan, not a patch:** each rewards a kind of main-deck card (Reactions, tokens, Airborne, spells, Fortify...), so choosing it shapes the other 20.
- **Costs:** 2-4 charge for the everyday ones; 5-6 for showpieces that pay off in boss fights.

The first pass of the change (PR: tcg/four-manifests) cut one Manifest from each mono and Starter deck, mostly plain removal or a vanilla body, and gave triple decks back their fourth:

| Deck | Cut | Deck | Cut |
|---|---|---|---|
| Fire Starter | Inferno Lord (6) | Water Starter | Maelstrom (6) |
| Earth Starter | Titan of the Peaks (6) | Wind Starter | Gale Force |
| Lightning Starter | Thunderstorm (6) | Ember Swarm | Molten Champion |
| Pyromancer | Wrath of Cinders | Reckless Fury | Sunfire Lance |
| Inferno Dragons | Starfall | Tidecaller | Hailstorm |
| Frostbind | Mistwalker | Riptide | Drowning Depths |
| Abyssal Leviathans | Ocean's Wrath | Stonewall | Earth Elemental |
| Deep Roots | Landslide | Crystal Growth | Mountain King |
| Titans | Mountain's Judgment | Featherflock | Thunderbird |
| Zephyr Tricks | Skystrike Volley | Gale Riders | Gale Fortress |
| Sky Sovereigns | Skyfall | Spark Storm | Thunderclap |
| Static Charge | Thunder Golem | Overload | Lightning Lance |
| Thunder Gods | Judgment Bolt | | |

## The Forge (spec, 2026-10-24)

Designer decisions this builds on: the Forge is fueled by the **essence of the confluence being forged**, which only enemies of that confluence drop; forged cards **can't be rarer than the hunter rank allows** (d-1792823280932); each win against a dual or triple enemy gives about **one forge's worth** of essence (d-1792823762489). Goal: mono rares can't be turned into a rare triple deck the day triples unlock, and later monsters stay worth fighting.

### What you can forge

- Two base cards of the same type, one from each element of a dual confluence, make that confluence's card (the existing fusion rules). A dual card plus a base card of the missing element makes a triple card. Named recipes (special cards) work the same way.
- You need to own the parts. Forging **doesn't use them up**, matching "bound cards": you keep them, and the forged card joins your collection.
- Manifests can't be forged (they never fuse), so they stay the hand-placed treasures.
- The forged card's rarity is the fusion's own (the average of its parts, rounded down).

### Rank cap

| Hunter rank | Ladder steps | Forge |
|---|---|---|
| Tin to Steel | 1-4 | Closed |
| Silver | 5-6 | Dual, Common and Uncommon |
| Gold | 7 | Dual, any rarity |
| Adamant | 8-9 | Also triple, Common and Uncommon |
| Exalted | 10 | Anything |

Same-rarity cards can still **drop** from enemies above the cap (a rare from a strong enemy is a real prize); the cap only limits what the Forge makes.

### Essence

One kind per confluence (20 kinds), shown as "Volcano essence". Costs and drops use the same scale, so one win pays for about one forge of that enemy's rarity:

| | Common | Uncommon | Rare |
|---|---|---|---|
| Forge a dual card | 2 | 3 | 5 |
| Forge a triple card | 3 | 5 | 8 |
| A win against a dual deck of that rarity | 2 | 3 | 5 |
| A win against a triple deck of that rarity | 3 | 5 | 8 |

- Boss monsters of a confluence give 3x their deck's amount.
- A triple enemy gives only its triple's essence. Duals and triples stay separate economies, so triple cards come from fighting triple enemies.
- Archetype (special-card) enemy decks count as rare.

Game Dev: `RPG_DROPS.essence` becomes a table by element count and rarity (`{ dual:{c:2,u:3,r:5}, triple:{c:3,u:5,r:8}, bossMult:3 }`), and the Forge needs the cost table, the rank cap and a "you need N essence" line. Balance: tune the amounts against the 80-100 hour collection target.

## Not yet covered

Shops and other currencies, trading, card upgrades, enemy decks per region and what each teaches, boss mechanics. These come after the designer picks a rule set.
