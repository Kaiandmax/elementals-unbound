# Story Bible — Elementals Unbound

Status: **first draft**. The designer chose the direction on 2026-10-23 (see *Fixed by the designer* below). Names of places and people, and the cast, are Story's proposals and can still change. Every other story file follows this one.

## Fixed by the designer

- **The arc:** the hero starts small-time and rises through the ranks as they gain experience and power. The story is about growth, coming to understand duty, and finally joining the people who were once far above them.
- **The world:** full of magic. Monsters can appear anywhere, at any time. Adventurers take contracts and hunt monsters to protect ordinary people.
- **The world moves on its own:** big events happen far above the hero's head, and many characters are much stronger than them for most of the game.
- **The threat:** a calamity is rising. The nations notice things getting worse and use it as a chance to grab power, land and resources.
- **The turn:** by the end the hero learns that some of the people at the top, people they looked up to, don't share their ideals. The hero overcomes them to protect the world.
- **Cards are bound monsters.**
- **The protagonist is a fixed character** with their own voice and past.
- **Tone:** earnest at heart, with real danger. Contracts go wrong, towns get hit, and some people die.

## Tone in one paragraph

Hopeful, but it costs something. The world is beautiful and busy: market towns, river barges, sky-ports, mountain holds. It also lives with monsters the way coastal towns live with storms. Adventurers are working professionals, not chosen ones. The early game is about small jobs done well: a wolf-thing in the orchard, a flooded mill, a missing courier. The danger is real from the first act, and it climbs with the hero's rank. Humor comes from the people. Weight comes from what the hero chooses to protect. Nobody is evil for its own sake. The final antagonist believes they are saving the world.

Touchstones: *Frieren* and *Monster Hunter* for the working-adventurer feel, *Final Fantasy XII* and *Fire Emblem* for nations scheming over a crisis, and *Delicious in Dungeon* for dungeons that feel like real places.

## The world: Aster

**Aster** is one continent shared by five nations and crossed by elemental currents called **leylines**. Where leylines tangle or tear, raw element pools and takes shape as **wilds**: monsters made of living Fire, Water, Earth, Wind or Lightning. Wilds can form anywhere. Most are small and dumb. Some grow old, clever and huge.

### Monsters (wilds)

- A wild is element given a body and a hunger. It isn't evil; it's weather with teeth. Most wilds go for what feeds their element: Fire wilds go for forges and granaries, Water wilds for wells and harbors, and so on.
- **Rifts** are tears in a leyline. A rift keeps spawning wilds until someone closes it. Closing a rift is high-rank work.
- **Crowned wilds** are monsters that have swallowed a rift's heart. They are much stronger, they regenerate, and they *break the normal rules of a binding duel*. **This is the story reason for every boss mechanic:** a boss is a crowned wild (or a person carrying a crowned binding), and its crown lets it ignore one rule. Every boss names the rule it breaks.

### Cards (bindings)

- A **binding** is a monster defeated and sealed into a card. The craft is called **binding**, and its practitioners are **binders**. Every adventurer is a binder.
- To bind a wild you must beat it. Hunting is how you get cards, so loot is the reward for a hunt.
- A binder fights by **calling** bound monsters and spells out of their deck. Bound wilds obey the binder, but they keep their nature: a bound Fire wild still burns.
- **Basic cards** are ordinary bindings: lesser wilds, and spellwork drawn from bound element.
- **Charge** is the binder's own channel filling as they work one element. Enough charge lets them call a **Manifest**.
- **Manifests** are the great bindings: old, named, powerful wilds. Calling one strains the seal, so a Manifest can be called **once per fight** (the once-per-game rule). Their creatures keep their names, histories and grudges.
- **Purity:** a binder who keeps to one element can hold more great bindings at once, because their channel runs deeper. This is the Manifest-slot bonus (mono 5, dual 4, triple 3). It's common binder wisdom and a point of pride in some nations.
- **Any binder can carry any card.** Bindings don't bond to their owner; skill lives in the binder. That's why rebuilding a deck around a new find costs nothing, and why a great card in a dungeon is worth the trip.
- **Wards:** every binder wears an elemental ward that soaks harm in a duel. When it breaks, the duel is lost. That's starting life, and it differs by element (a Solar ward is the thickest; Storm, Swamp, Ice, Aurora and Quicksilver wards are the thinnest). Ordinary wilds have weaker wards than binders, which is why normal enemies start with less life.
- **Duels are short.** Bindings burn hot and wards break fast, so most fights are over in a few exchanges (the 3-turn rule). Long fights happen only against crowned wilds and great binders.

### Confluences: braiding

- Two bindings of different elements can be **braided** into one confluence card (Fire + Earth → Volcano). Three can be braided into a triple. In game terms this is fusion and the Forge.
- Braiding is skilled, licensed work. Adventurers earn access to the guild's **Forges** with rank, which is why confluences unlock as the hero rises. The first braid the hero makes is a story beat.
- Some wilds are born confluent where leylines cross: steam wilds at hot springs, sand wilds in the dust basins. Confluence regions sit on those crossings.
- In some nations braiding is distrusted. The Pyrrhen call it "muddy fire". That's useful friction, not a law the hero breaks.

### Ancient bindings: why the best cards are in dungeons

About seven hundred years ago, in the **Sundering**, the greatest wilds of the age, the **Primordials**, nearly unmade Aster. The first binders, the **Founding Circle**, sealed them into bindings and hid each one deep under the world, in vaults built to keep anyone from calling them again. Lesser great wilds were sealed the same way across the centuries by binders who died, fled or were forgotten.

So **every dungeon loot card has an origin:** someone bound it, someone hid it, and something guards it, whether a vault warden, the wilds drawn to its power, or the dead binder's own traps. Each dungeon file in `story/regions/` answers three questions about its loot card: who sealed it, why, and what guards it.

### The calamity: the Unbinding

The Founding Circle's seals are failing. The vaults leak, leylines strain, and wilds are appearing more often, stronger, and in places that were safe for generations. Scholars call it **the Unbinding**. Ordinary people call it a bad few years. The top of the guild and the crowns know the truth: if the Primordial seals fail, the Sundering comes back.

The nations each read that as an opportunity:

- Whoever holds the Primordial bindings holds the strongest weapons in the world.
- Borderlands emptied by wilds are land for the taking.
- A nation that "protects" a neighbor's towns from the Unbinding ends up garrisoning them.

The guild is the only power meant to stand above this. Holding to that ideal, and finding out who at the top has quietly let it go, is the spine of the game.

## The Hunters' Covenant (the guild)

The **Covenant** is a guild of adventurers that crosses all borders. It has branch halls in every town big enough for a notice board. It sells contracts, licenses binders, runs the Forges and records every wild it binds. Under its oldest charter it owes allegiance to no crown, and a Covenant binder may cross any border on a hunt. The nations hate that charter and need it.

### Ranks

Rank is the hero's progress. It maps onto the card power ladder, so story progress and deck power climb together.

| Rank | Ladder | What it means in the world | Decks the hero meets |
|---|---|---|---|
| **Tin** | 1 | Probationary. Errands and pest wilds. | Starter |
| **Copper** | 2 | Village contracts, alone or in a pair. | Mono common |
| **Iron** | 3 | Regional work: escorts, nests, small rifts with a team. | Mono uncommon |
| **Steel** | 4 | Trusted across a nation. First dungeon delves. | Mono rare |
| **Silver** | 5–6 | Forge licence (dual braids). Border and rift work. | Dual common / uncommon |
| **Gold** | 7 | Leads teams. Names known in capitals. | Dual rare / archetype |
| **Adamant** | 8–9 | Triple braids. Crowned-wild hunters. A few dozen alive. | Triple common / uncommon |
| **Exalted** | 10 | The **Seven**: the Covenant's highest binders, its council and its legends. | Triple rare / archetype |

Enemy AI levels 1–5 read as the enemy's skill within their rank: a green Copper hunter or a veteran one.

### The Seven Exalted (proposed)

For most of the game these are figures far above the hero: names on posters, a cloak glimpsed across a plaza, a battle already over by the time the hero arrives. Some become mentors, one becomes the enemy, and the hero takes a seat among them in the last act.

1. **Seraphine Vael, "the Lantern"** — First of the Seven, Aurora binder, the most beloved person on Aster. She saved the hero's village when the hero was a child. *Secret antagonist* (see the central conflict).
2. **Gorran Stoneheart** — Glacier binder, the oldest of the Seven. Slow, kind and immovable. Descended from Earthbinder Gorr. The hero's eventual champion on the council.
3. **Ysil of the White Reach** — Ice binder, called the Frost Empress. Cold, exact, unswayed by any crown. The hero's hardest test and finally a true ally.
4. **Aeris Calloway** — Tempest binder, Windlord. Brash and charming, and he owes favors to the Skyreach princes. A grey figure: torn between his oath and his homeland.
5. **Neris Saltwind** — Hurricane binder, Tide Sovereign of the League. Her loyalty is bought by her city. She sides with Seraphine.
6. **Corvane Ashe** — Ash binder. Quiet and haunted, he fought in the last border war. Retires mid-game, opening the seat the hero later fills.
7. **Halden Mirr** — Quicksilver binder, the Covenant's spymaster. Knows more than he says; he is the one who tells the hero the truth.

### Cast around the hero

- **Mads Orrin** — a retired Iron hunter with a bad leg who runs the branch hall in Brindle Ford. Gruff, fair, the first person to believe in the hero. He dies in Act II defending the Ford during a surge, and his death is the hero's first real lesson in duty.
- **Pell Varrane** — a rival rookie, second son of a Pyrrhen war-house. Arrogant, gifted, and impatient to rise. A rival through Act I and a friend by Act III. His family pulls him toward the Dominion in the war, and he has to choose.
- **Isa Corran** — a Covenant archivist who studies the Founding Circle and old bindings. She works out what the Unbinding is long before the hero can do anything about it, and keeps sending them toward vaults.
- **Brann and Dove** — two Copper hunters, a married couple, who share the hero's early contracts. They're comic relief and the human face of "ordinary adventurers". One of them doesn't survive Act III.

### Antagonists and powers

- **Seraphine Vael** — the final antagonist. See below.
- **Vexis, the Pyrelord** — Warlord-Regent of the Pyrrhen Dominion, and the plainest villain on the world stage. He uses the Unbinding as cover to march into wild-struck borderlands "to protect them". He's dangerous, open about what he wants, and ultimately someone the hero can deal with.
- **The Hollow** — a cult that believes the Sundering should come back and that wilds are the world's rightful owners. They break seals on purpose. They're the mid-game threat behind many vault breaches, and Seraphine's unwitting tool.
- Crowned wilds and Primordials: the bosses (see the outline).

## The five nations

Each nation leans toward an element without being only that element. Every element appears everywhere, but each land has a home element and its own wilds.

| Nation | Home element | Seat | What it wants from the Unbinding |
|---|---|---|---|
| **The Pyrrhen Dominion** | Fire | Cindergate | Land. The wild-struck borderlands of its neighbors. |
| **The Tidewater League** | Water | Saltmere | Trade and leverage. It controls the rivers and the ports, and sells protection. |
| **The Kingdom of Holdfast** | Earth | Deepmoot | Safety behind its walls. It wants the Primordial vaults under its mountains to stay its own. |
| **The Skyreach Principalities** | Wind | Highcourt | Prestige. Its princes compete to buy Covenant champions. |
| **The Stormcourt of Vol** | Lightning | Thunderhold | Power. A storm-priesthood that wants the Primordial bindings for its god. |

Between them lies **the Hearthvale**: river farmland and market towns, nobody's capital and everybody's road. The hero starts here. It's the first region struck hard by the Unbinding, and the first land the nations eye.

Confluence regions sit where two nations' leylines cross (Steam springs on the League–Dominion border, the Sand basins between Holdfast and Skyreach, and so on). They're contested ground, which is where the war happens.

## The hero

**Wren Calder**, 18 (proposed name; the design sticks either way).

- **Origin:** a miller's child from **Brindle Ford** in the Hearthvale. At eight, Wren watched a crowned Fire wild burn half the Ford until Seraphine Vael walked in and ended it in one call. Wren has wanted to be her ever since.
- **Start:** a fresh Tin-rank binder with one secondhand starter deck and more nerve than skill. Not special. No destiny, no hidden bloodline. Wren rises by working.
- **Voice:** earnest, quick, a bit too proud of small wins. Talks to bound monsters as if they can hear (maybe they can). Gets quieter and steadier as the game goes on.
- **Flaw:** hero-worship. Wren believes the people at the top are better people, not just stronger ones. The whole arc tests that belief.
- **Ideal (what Wren comes to understand):** the Covenant exists for the people who can't hold a card. Rank is a debt owed to them, not a reward.
- **Element:** none fixed. Wren is a generalist by necessity (secondhand cards) and later by choice. That fits the free deck switching. The starter deck choice can be framed as "the deck Mads lends you".

### Arc in four beats

1. **Small-time** — proves they can do the job. Learns that contracts are about people.
2. **Rising** — sees the world is bigger and worse than they knew. Loses Mads. Chooses duty over glory.
3. **Among the great** — fights beside the Exalted in the war and the rift-surges. Earns their respect. Starts to see the cracks.
4. **One of them** — takes a seat among the Seven. Sees that Seraphine's plan would save the world by ruling it. Overcomes their hero.

## Central conflict

**On the surface:** the Unbinding is getting worse, and the nations are circling.

**Underneath:** Seraphine Vael has known for years that the Founding seals can't hold. Her answer is to gather the Primordial bindings before the Hollow or any crown can, rebind them all into herself, and become the new seal: one keeper, with the power of the Sundering, deciding which lands are worth protecting. She has quietly let border towns fall so that the nations, terrified, will hand her the vaults. She believes the cost is worth it. Neris backs her for her city's sake. Others on the council half-know and look away.

**The hero's answer:** the seals should be renewed the way the Founding Circle made them, by many binders and not one, and nobody gets to choose which villages burn. The final act is Wren gathering the binders Seraphine overlooked (Covenant hunters of every rank, Pell, Ysil, Gorran) and stopping her at the last vault.

**What makes it land:** Seraphine is right about the danger and kind in person. She is the one who saved Wren. The final duel is against the person Wren became an adventurer to be.

## Story-to-system fixed points

These are the world facts other roles build on. Each will be logged as a board decision.

- **Bosses are crowned wilds or crowned binders. Each crown breaks one named rule** (examples: extra life bars as phases, a second Manifest call, unblockable attacks, the boss calls from your charge). Balance designs the mechanic; Story gives the reason.
- **Rank maps to the power ladder** (table above). The deck an enemy fields matches the region's rank band.
- **Confluences unlock by Forge licence at Silver rank, and triples at Adamant.** Story supplies the licence moments.
- **Every dungeon has a loot card with an origin** (who sealed it, why, what guards it).
- **Enemy life is lower than the player's because wilds wear thinner wards than binders.**

## Naming rules

- Places: English compounds with a weathered feel (Brindle Ford, Saltmere, Cindergate). Capitals get one strong word.
- People: short given names, plain surnames, and earned epithets ("the Lantern"). Exalted have epithets; rookies don't.
- Wilds and bindings: descriptive card names as they are now. Named great wilds keep a name and a history.
- **Open question:** a few cards use real-world gods' names (Raijin, Raiden, Gaia, Atlas, the Thunder God). The proposal is to rename them into Aster's own legends (Vol, the storm god of the Stormcourt; Earthbinder Gorr; and so on) in a later card-names PR, which Balance reviews.

## What's next

1. `story/outline.md` — acts by rank and region, with each region's dungeon, loot card and boss.
2. `story/characters/` — Wren, Seraphine, Mads, Pell, and the Seven.
3. Agree the dialogue data format with Game Dev before writing scenes in `story/data/`.
4. Send region and character moods to Music.
