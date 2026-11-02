# Monsters of the world: rosters, density and chests

Owner: TCG Design. Status: **Draft v1** (2026-10-25), for Game Dev's large-region engine (d-1792894214292). Numbers are Balance's to tune; place names and region lists are Story's.

**The rule in one line:** a region's **biome** decides which elements roam there; its **rank** decides how strong they are; off the road it gets wilder and a little stronger.

## Rank to deck tier

Monsters use the hunters' ranks (d-1792794544702), mapped to the existing prebuilt decks:

| Rank | Ladder step | Roaming decks | AI level (designer: normal monsters 1-3) |
|---|---|---|---|
| Tin | 1 | Starter decks | 1-2 |
| Copper | 2 | Mono common | 2 |
| Iron | 3 | Mono uncommon | 2-3 |
| Steel | 4 | Mono rare | 3 |
| Silver | 5-6 | Mono rare, dual common and uncommon | 3 |
| Gold | 7 | Dual rare, dual archetype | 3 |
| Adamant | 8-9 | Dual rare, triple common and uncommon | 3 |
| Exalted | 10 | Triple rare, triple archetype | 3 |

- Two-element monsters first appear at Silver and three-element ones at Adamant. That matches when the Forge opens, so a new confluence's monsters (and their essence) arrive just as the player can use them.
- **Elites:** about 1 roaming monster in 6 is one rank above the region, off the road only, drawn bigger and with a visible mark so the player can choose to avoid it. Never two ranks above outside bosses.
- Normal monsters keep the -5 life (they're wilds, not binders).

## Biomes

Weights are relative chances of each element among base-element monsters. Confluences and triples show up from Silver and Adamant, as above.

| Biome | Base elements (weight) | Duals (Silver+) | Triples (Adamant+) | What fighting here teaches |
|---|---|---|---|---|
| Fields and roads (the Hearthvale) | all five, even | any, rarely | — | Every element's basics |
| Old forest | Earth 2, Wind 2, Water 1 | Sand, Swamp | Glacier | Big bodies vs fliers: Skyguard matters |
| Fen and marsh | Water 2, Earth 2 | Swamp, Steam | Geyser, Quicksilver | Grinding games: Drain, Venom, recursion |
| Moor and heath | Wind 2, Earth 1, Fire 1 | Sand, Wildfire | Ash | Fliers and burn on open ground |
| Mountains | Earth 3, Lightning 1 | Metal, Volcano | Forge, Glass | Armor and Fortify: hit hard or go around |
| Volcano and ash fields | Fire 3, Earth 1 | Volcano, Plasma | Ash, Forge | Racing burn; bring life gain or blockers |
| Coast and coral reefs | Water 3, Wind 1 | Steam, Ice, Storm | Mirage, Hurricane | Freeze, bounce and counters: tempo control |
| Sky islands | Wind 3, Lightning 1 | Tempest, Wildfire, Ice | Solar, Hurricane | Speed in the air; Skyguard or race |
| Storm peaks | Lightning 3, Water 1 | Storm, Plasma, Tempest | Aurora, Quicksilver | Chain turns and burn; trade early |
| Caves and dungeons | the dungeon's own theme | the dungeon's theme | the dungeon's theme | Each dungeon is a lesson in one element or confluence |

Every confluence and triple roams in at least one biome, so every kind of essence and every fused card can be earned somewhere. A region is usually one main biome with patches of others. The nations lean to their element (Saltmere coast, Deepmoot mountains and caves, Highcourt sky islands, Thunderhold storm peaks, Cindergate volcano).

## Roaming density

- **Roads and near towns:** no roaming monsters, so travel is safe and quick.
- **Wild ground:** about 2-4 visible monsters per screen. They wander, and chase within a few tiles once they see you; you can outrun most.
- **Pace target:** off the road, about one fight per 1-2 minutes of travel. A normal fight is under 4 turns a side (about 2-3 minutes), so wild ground is roughly half travel, half fighting.
- **Respawn:** when you leave the area and come back, not while you're standing in it.
- **Dungeons:** denser (a fight every room or two); the last floor holds a boss monster (phases, AI 3-4) and the vault's Manifest.

## Minor chests

Named treasure chests (with a Manifest) are placed by Story and TCG Design. Everything else is a minor chest:

| Chest | Holds |
|---|---|
| Roadside and field | 1 basic card of the region's biome elements, at the region's rank (weighted toward its best rarity) |
| Off-road and ruins | 1-2 basic cards as above; from Silver, some essence of a confluence that roams there |
| Dungeon floors | 2 basic cards of the dungeon's theme, one rank above the dungeon's monsters |
| "Seed" chests (about 1 in 5) | 1 basic card of an element that does NOT roam there: a nudge toward a deck the player doesn't have yet |

Manifests never come from minor chests (designer: only named chests, contracts and story duels).

## Data shape (proposal for Game Dev)

```js
RPG_BIOMES = {
  forest: { els: { earth: 2, wind: 2, water: 1 }, duals: ["sand", "swamp"], triples: ["glacier"] },
  ...
};
RPG_RANK_DECKS = { tin: ["starter"], copper: ["1:common"], iron: ["1:uncommon"], steel: ["1:rare"],
  silver: ["1:rare", "2:common", "2:uncommon"], gold: ["2:rare", "2:special"],
  adamant: ["2:rare", "3:common", "3:uncommon"], exalted: ["3:rare", "3:special"] };
// a region: { biome, rank, elite: 1/6, density: 3 }
```

A roaming monster is picked by rolling an element by biome weight (or a confluence or triple, if the rank allows it), then one prebuilt deck of that element and tier.
