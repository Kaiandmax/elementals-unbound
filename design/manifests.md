# Manifests: fewer, stronger

Owner: TCG Design. Status: **Proposal, first pass** (2026-10-24). The designer decided to cut the number of Manifests and make them stronger: "the really exciting cards to get, the ones that make a player want to change elements or rebuild their deck." They come only from chests, contracts and story duels (d-1792823762488, d-1792822503877). TCG Design picks the count and which stay; Balance retunes; Story names them.

## The count

| Group | Manifests now | Proposed | Of which |
|---|---|---|---|
| Base element (x5) | 45 each | **8** each | the 4 in its Starter deck + 4 to find |
| Dual confluence (x10) | 40 each | **5** each | mostly special (archetype) Manifests |
| Triple confluence (x10) | 40 each | **4** each | mostly special |
| **Total** | **1,025** | **130** | 110 to find, plus the 20 Starter ones |

Why 130: a deck holds 4, so even a triple has a full set to choose from. Over a 30-50 hour story that is about 2-4 finds an hour, rare enough that each one is an event. Game Dev's estimate for 1,025 was 10+ hand-made sources an hour.

## How they were picked (first pass, by script; to be hand-tuned)

1. **Starter Manifests stay** (the 4 in each Starter deck).
2. **Proactive first:** creatures and auras that change how you play beat one-shot spells. At most one pure answer (removal, sweeper, mass bounce or freeze) per confluence, two per base element counting the Starter's.
3. **Plans over patches:** special (archetype) Manifests are preferred for confluences, because each pushes its archetype (Eruption, Grave Tide, Shatter...).
4. **A cost spread** from 2 to 6 charge, so every element has an everyday Manifest and a showpiece.
5. Cards already in prebuilt decks get a small preference.

## What happens to the other 895

They are **not deleted**. They leave the reward pool and the prebuilt decks, and stay in the card files as a **reserve**. When Story or Game Dev need a new card (a loot card, a companion's card, a boss's signature), it is reworked from the reserve. This keeps the card count as designed (designer, 2026-10-24); Slackwater was reworked from Moonlit Tide this way. Enemy decks use only the kept 130.

## Next steps

1. Hand-tune the list below: swap weak or samey picks, and make sure each element's 4 to-find Manifests each reward a different kind of main-deck card. (TCG Design)
2. Rebuild the 105 prebuilt decks' Manifest lists from the kept pool, and flag cut cards as reserve in the card files (`reserve: true`, excluded from decks, drops and the library). (TCG Design + Game Dev)
3. Retune: with the weak options gone and the kept ones stronger, the ladder moves. (Balance)
4. Assign each find to a chest, contract or story duel along Story's outline (the next spec).
5. Names and legends that fit the world. (Story)

## Candidate list (first pass)

### Base elements, hand-tuned (2026-10-26)

Each base element keeps its 4 Starter Manifests plus **4 to find**, one for each of its four prebuilt decks' plans, so every find pulls toward a different deck. The vault cards (`design/progression.md`) are among the finds; they're reworked from cut Manifests, named in the "from" column, so the card count holds.

| Element | Starter (4) | To find | Rewards in the main deck | Deck it pulls toward |
|---|---|---|---|---|
| Fire | Combustion Burst, Pyroclastic Surge, Heart of the Sun, Pyre Phoenix | **Bonfire Totem** | tokens (Ember Sparks every turn) | Ember Swarm |
| | | **Blaze Covenant** | spells | Pyromancer |
| | | **The Varrane Crest-Drake** (vault, III-2; from Volcano God) | one big attacker at a time | Reckless Fury |
| | | **Eternal Phoenix** | fliers that come back | Inferno Dragons |
| Water | Wellspring, Mirror Lake, Tidal Wave, Kraken of the Deep | **Slackwater, the Weir Serpent** (vault, Act I) | Reactions | Riptide |
| | | **The Tolling Kraken** (vault, II-1; from Typhoon Serpent) | freeze and bounce that stretch the enemy's turns | Frostbind |
| | | **Tide Sovereign Neris** | Drain bodies and Reactions | Tidecaller |
| | | **Leviathan of the Abyss** | big Drain creatures (the one board answer) | Abyssal Leviathans |
| Earth | Living Mountain, Worldroot, Tectonic Rise, Avalanche | **The Rootbound Colossus** (vault, II-2; from Bedrock Avatar) | walls and patience | Stonewall |
| | | **Ancient Colossus** | Fortify | Crystal Growth |
| | | **Throne of Mountains** | a wide board of permanent buffs | Deep Roots |
| | | **Earthbinder Gorr** | giants (the one board answer) | Titans |
| Wind | Second Wind, Skyborne Armada, Eye of the Storm, Sovereign of Gales | **The Windlord's Roc** (vault, II-3; from Roc of the Storm) | creatures replayed for their arrival effects | Zephyr Tricks |
| | | **Sky Sovereign Zephyra** | many fliers | Sky Sovereigns |
| | | **Cloud Palace** | a ground deck that takes to the air | Featherflock |
| | | **Phoenix of the Gale** | hasty fliers | Gale Riders |
| Lightning | Surge Conduit, Chain Storm, Overload Engine, Raijin | **The Hymn of Thunderhold** (vault, IV-1; from Raiden, Storm God) | three or more cards in one turn | Spark Storm |
| | | **Storm Conductor** | cheap spells | Overload |
| | | **Static Field** | holding charge for Attuned | Static Charge |
| | | **Plasma Phoenix** | haste creatures | Thunder Gods |

Changes from the script's pass: out go Volcano God, Infernal Dragon King, Primeval Kraken, Glacier Titan, Bedrock Avatar, Storm Leviathan, Raiden, Lightning Avatar (vanilla bodies, a second answer, or a third copy of the same plan); in come Bonfire Totem, Tide Sovereign Neris, Static Field and the five vault cards. Raiden's slot also retires a real-world god's name, which Story wanted gone.

### Confluences (script's first pass, reviewed 2026-10-26)

Review: the specials already carry each archetype, so most picks stand. Three swaps: Steam's Bottomless Kettle repeated Library of Mists (draw into damage), so Fog Colossus (a hand-size creature) takes its place; Sand's plain Endless Desert was a near-copy of The Endless Desert, so Sandstorm Sphinx (bounce payoff) takes its place; Mirage's Desert Oasis (generic draw) gives way to Illusory Djinn (silence, Mirage's one answer). Seven triple Manifests summon 8-16 tokens after normalization (a Balance bug, flagged on the board); none of them is in the kept list.

**Volcano** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | C (special) | Eruptive Vent | Whenever a creature you control dies, deal 1 damage to every enemy creature and deal 1 damage to the enemy. |
| 4 | creature | U (special) | Ashen Sovereign | Whenever another creature you control dies, deal 2 damage to a random enemy creature. Your creatures get +1/+0. |
| 5 | aura | R (special) | Eternal Caldera | Whenever a creature you control dies, deal 2 damage to every enemy creature. At the start of your turn, summon a 2/1 Magmite. |
| 2 | spell | C | Magma Spout | Your creature with the highest attack deals damage equal to its attack to a creature and deal 3 damage to the enemy. |
| 5 | creature | R (special) | Mountain's Wrath Incarnate | Pierce. When played, destroy your other creature with the lowest attack and deal damage equal to its attack to every enemy creature and the enemy. Whenever another creature you control dies, this gets +1/+1. |

**Wildfire** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Crown of Wildfire | Whenever an enemy creature dies, deal 1 damage to every enemy creature and deal 1 damage to the enemy. When played, draw a card and gain 1 Energy. |
| 4 | creature | U (special) | Firewhirl Elemental | Airborne. When played, deal 1 damage to every enemy creature. Whenever an enemy creature dies, this gets +1/+1. |
| 5 | creature | R (special) | Firestorm Phoenix | Airborne. Haste. Whenever this attacks, deal 2 damage to every enemy creature. Last Gasp: summon two 3/3 Airborne Fire Drakes. |
| 2 | aura | C | Flamewind Shrine | At the start of your turn, deal 1 damage to a random enemy creature. Your Airborne creatures get +1/+0. |
| 6 | spell | R | Drake Squadron | Summon five 3/3 Airborne Fire Drakes and your Airborne creatures get +2/+0. |

**Plasma** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Unbound Reactor | At the start of your turn, deal 1 damage to yourself and deal 2 damage to the enemy. Your creatures get +2/+0. |
| 4 | creature | R (special) | Martyr of the Core | Haste. Desperate 8: when played, this gets +3/+3 and Drain. |
| 5 | creature | R (special) | Plasma Apotheosis | Haste. Pierce. When played, deal 2 damage to yourself. Whenever you deal damage to yourself, deal 2 damage to the enemy. |
| 2 | aura | C (special) | Burning Battery | Whenever you deal damage to yourself, deal 1 damage to the enemy and gain 1 Energy. |
| 5 | creature | R | Sunforged Titan | Haste. Pierce. When played, deal 2 damage to yourself. |

**Steam** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Library of Mists | Whenever you draw a card, deal 3 damage to the enemy. Your spells cost 1 less. |
| 4 | creature | U (special) | Thermal Djinn | Airborne. Ward. Whenever you draw a card, deal 1 damage to a random enemy creature. |
| 5 | creature | R (special) | Steam Engine Prime | Ward. At the start of your turn, draw a card. Whenever you draw a card, this gets +1/+0 this turn. |
| 4 | creature | C (special) | Fog Colossus | Ward. When played, draw 2 cards and this gets +1/+0 for each card in your hand. |
| 5 | creature | R | Leviathan of Steam | Ward. Drain. |

**Swamp** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Bottomless Bog | Whenever a creature you control dies, summon a 2/2 Venom Mudling. Your creatures have Venom. |
| 4 | creature | U (special) | Fen Necromancer | At the start of your turn, put the last basic creature card that costs 3 or less from your grave into play. |
| 5 | creature | R (special) | Swamp Lich King | Venom. Drain. Last Gasp: put the last two basic creature cards from your grave into play. |
| 2 | aura | C (special) | Carrion Marsh | Whenever a creature you control dies, gain 2 life and draw a card. |
| 5 | creature | R (special) | Rotting Colossus | Drain. Last Gasp: summon three 2/2 Venom Mudlings. |

**Ice** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | U (special) | Icebound Library | Whenever an enemy creature becomes frozen, draw a card. When played, gain 2 Energy. |
| 4 | aura | R (special) | The Long Winter | At the start of your turn, freeze every enemy creature. When played, draw 2 cards. |
| 5 | creature | R (special) | Frost Reaper | Whenever this attacks, destroy every frozen enemy creature. |
| 2 | spell | C (special) | Shattering Gale | Deal 3 damage to every frozen enemy creature and freeze the enemy creature with the highest attack. |
| 5 | creature | R (special) | Sovereign of Rime | Airborne. Skyguard. When played, freeze every enemy creature. Whenever an enemy creature becomes frozen, this gets +1/+1. |

**Storm** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Eternal Thunderhead | Whenever you play a spell, deal 3 damage to a random enemy creature and deal 1 damage to the enemy. |
| 4 | creature | R | Thunder Oracle | When played, draw 3 cards and gain 2 Energy. |
| 5 | creature | R (special) | Archon of Storms | Airborne. Whenever you play a spell, deal 1 damage to the enemy. Your spells and Reactions deal 2 more damage. |
| 2 | aura | C | Static Pool | When played, draw a card and gain 1 Energy. Your spells and Reactions deal 1 more damage. |
| 5 | creature | R (special) | Stormheart Leviathan | Drain. Whenever you play a spell, draw a card. |

**Sand** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 5 | creature | U (special) | Sandstorm Sphinx | Airborne. When played, return a basic creature to its owner's hand. Whenever an enemy creature returns to its owner's hand, deal 2 damage to the enemy. |
| 4 | creature | C (special) | Erosion Spirit | Airborne. Whenever this attacks, every enemy creature get -1/+0. |
| 5 | creature | R (special) | Titan of Dust | Skyguard. When played, every enemy creature get -1/-1. At the start of your turn, every enemy creature get -1/+0. |
| 2 | aura | C (special) | Dune Shrine | At the start of your turn, give a random enemy creature -1/-1. When played, gain 2 Energy. |
| 6 | aura | R (special) | The Endless Desert | At the start of your turn, every enemy creature get -3/-3. |

**Metal** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Eternal Forge Works | At the start of your turn, give your creature with the highest attack Barrier. When played, gain 2 Energy. Your creatures get +1/+1. |
| 4 | creature | C (special) | Steel Gladiator | Barrier. When played, this deals damage equal to its attack to a creature. |
| 5 | creature | R (special) | Adamantine Sovereign | Barrier. Vigilant. Pierce. Whenever this attacks, this gets +1/+1. |
| 2 | spell | U (special) | Magnetic Duel | Give your creature with the highest attack +3/+3 and your creature with the highest attack deals damage equal to its attack to a creature. |
| 5 | creature | R | Adamant Colossus | Vigilant. Pierce. Fortify 1. |

**Tempest** (5)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | U (special) | Banner of the Tempest | When played, draw a card and gain 1 Energy. Your creatures have Haste. Your creatures get +1/+0. |
| 4 | creature | R | Skybreaker | Airborne. Haste. Whenever this attacks, deal 1 damage to a random enemy creature twice. |
| 5 | creature | R (special) | Storm Lord Ascendant | Airborne. Haste. Whenever this attacks, deal 2 damage to the enemy. Your other creatures have Haste. |
| 2 | aura | C | Storm Banner | When played, draw a card and gain 1 Energy. Your Airborne creatures get +1/+1. |
| 5 | aura | R (special) | Eternal Tempest | At the start of your turn, summon two 1/1 Airborne Haste Volt Sprites. |

**Geyser** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Endless Wellspring | At the start of your turn, raise your maximum life by 3 and gain 3 life. Whenever you gain life, deal 3 damage to the enemy. When played, gain 2 Energy. |
| 4 | creature | C (special) | Spring Behemoth | Drain. Whenever you gain life, this gets +1/+1. |
| 5 | creature | R (special) | Avatar of Renewal | Drain. Whenever you gain life, deal 1 damage to every enemy creature and the enemy. |
| 2 | aura | C (special) | Sacred Hot Spring | At the start of your turn, gain 3 life. Whenever you gain life, deal 1 damage to the enemy. |

**Mirage** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | C (special) | Veil of Mirages | Whenever you play a creature, summon a 2/2 Mirror Image. When played, draw 2 cards. |
| 4 | creature | U (special) | Dreameater | Ward. When played, the enemy discards two random cards and draw 2 cards. |
| 5 | creature | R (special) | Master of Mirrors | Ward. At the start of your turn, summon a token copy of your creature with the highest attack. |
| 4 | creature | C (special) | Illusory Djinn | Airborne. When played, remove all abilities and keywords from a creature. |

**Aurora** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | U (special) | Aurora Engine | At the start of your turn, gain 2 Aurora charge. Whenever you cast a Manifest, draw a card. |
| 4 | aura | R (special) | Crown of the Sky | Whenever you cast a Manifest, your creatures get +2/+2 and deal 2 damage to the enemy. When played, draw 2 cards. |
| 5 | creature | R (special) | Aurora Ascendant | Airborne. Whenever you cast a Manifest, deal 2 damage to every enemy creature and the enemy. |
| 2 | aura | C | Lightfall Shrine | At the start of your turn, gain 1 Aurora charge and deal 1 damage to a random enemy creature. |

**Ash** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R | Ashen Throne | At the start of your turn, summon three 1/1 Haste Ashlings. Your tokens get +2/+1. |
| 4 | aura | C (special) | Cinder Roost | At the start of your turn, summon a 2/2 Airborne Cinderbird. |
| 5 | aura | R (special) | Undying Pyre | Whenever a creature you control dies, summon four 2/2 Airborne Cinderbirds. Your tokens get +1/+0. |
| 2 | spell | C | Ember Rockslide | Deal 6 damage to a creature and summon two 1/1 Haste Ashlings. |

**Forge** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Eternal Furnace | When played, draw 2 cards. Your creatures get +2/+1. Your auras cost 1 less. |
| 4 | creature | C (special) | Brass Colossus | When played, this gets +1/+1 for each aura you control. |
| 5 | creature | R (special) | Machina Ex Fulgur | At the start of your turn, deal 1 damage to every enemy creature and the enemy for each aura you control. |
| 2 | aura | C | Blacksmith's Altar | At the start of your turn, give your creature with the highest attack +1/+1. When played, gain 2 Energy. |

**Solar** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Undying Sun | At the start of your turn, deal 3 damage to the enemy. Whenever the enemy takes damage, your creatures get +1/+0 this turn. |
| 4 | creature | U (special) | Sky Burner | Airborne. Haste. Whenever the enemy takes damage, deal 1 damage to a random enemy creature. |
| 5 | creature | R (special) | Dawn Emperor | Airborne. Haste. Whenever the enemy takes damage, deal 2 damage to a random enemy creature. |
| 2 | spell | C (special) | Solar Lance | Deal 5 damage to the enemy and draw a card. |

**Glacier** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Bulwark of the North | At the start of your turn, summon a 0/4 Wall Ice Block. When played, draw 2 cards. Your creatures get +1/+3. |
| 4 | creature | C (special) | Glacial Behemoth | Skyguard. Whenever this blocks, deal 2 damage to the enemy. |
| 5 | creature | R (special) | Eternal Glacier | Skyguard. Vigilant. At the start of your turn, freeze the enemy creature with the highest attack. Whenever this blocks, deal 3 damage to the enemy. |
| 2 | aura | C (special) | Rampart Shrine | At the start of your turn, gain 3 life. Your creatures get +0/+2. |

**Quicksilver** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Philosopher's Engine | At the start of your turn, turn the enemy basic creature with the lowest health into a 1/1 Quicksilver Blob and give your creature with the highest attack +1/+1. |
| 4 | creature | U (special) | Mercurial Titan | At the start of your turn, swap the attack and health of this creature. Whenever this takes damage, this gets +1/+1. |
| 5 | creature | R (special) | Living Quicksilver | Ward. When played, summon two token copies of this creature. |
| 2 | aura | C (special) | Flux Engine | At the start of your turn, swap the attack and health of the enemy creature with the highest attack. When played, draw a card. |

**Hurricane** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Endless Cyclone | At the start of your turn, return the enemy basic creature with the highest attack to its owner's hand and draw a card. |
| 4 | creature | C (special) | Hurricane Djinn | Airborne. When played, return a basic creature to its owner's hand. Whenever an enemy creature returns to its owner's hand, draw a card. |
| 5 | creature | R (special) | Lord of the Maelstrom | Airborne. At the start of your turn, return the enemy basic creature with the highest attack to its owner's hand. Whenever an enemy creature returns to its owner's hand, deal 2 damage to the enemy. |
| 2 | aura | C (special) | Storm Spiral | Whenever an enemy creature returns to its owner's hand, deal 2 damage to the enemy. When played, gain 2 Energy. |

**Glass** (4)

| Charge | Type | Rarity | Card | Text |
|---|---|---|---|---|
| 3 | aura | R (special) | Cathedral of Glass | At the start of your turn, summon three 1/1 Glass Shards. Your tokens get +1/+1. |
| 4 | creature | C (special) | Prism Golem | Barrier. Whenever this takes damage, deal 2 damage to a random enemy creature and deal 1 damage to the enemy. |
| 5 | creature | R (special) | Living Prism | Barrier. Whenever this takes damage, deal 2 damage to every enemy creature and the enemy. |
| 2 | aura | C (special) | Glass Garden | At the start of your turn, summon a 1/1 Glass Shard. When played, draw a card. Your tokens get +1/+0. |
