# RPG layer

The adventure that wraps the card battler: a walkable tile overworld (Pokemon-style), tall-grass duels, trainers, chests, saving. Built in the same web stack as the battler and spliced into `index.html` by `build.py`.

| File | What | Owner |
|---|---|---|
| `world.js` | Overworld engine: movement, drawing, talking, chests, battles, saves, input | Game Dev |
| `story.js` | Story engine: flags and when/unless conditions, talk variants, one-time scenes, intro and end cards, rank, music cues | Game Dev |
| `maps.js` | Map layouts, warps, NPC/sign/chest placement, placeholder words (`RPG_TEXT`) | Game Dev (Story names places and writes all words) |
| `encounters.js` | Wild encounter tables and trainer decks | Balance |
| `../story/data/*.js` | Real dialogue: `Object.assign(RPG_TEXT, { key: ["Name: line", ...] })`, loaded after `maps.js` so it replaces placeholders | Story |

Formats are documented at the top of each file. `node tools/smoke.js` checks them: every map is a rectangle of known tiles, every walkable tile is reachable, warps land on open ground, and every text key, deck and card referenced exists.

## How it fits together

- The battle engine is untouched; a duel is `newGame(playerDeck, enemyDeck, 15 + lifeMod, [3, level])`. The headless sims load this code but never run it.
- Saves live in browser storage (`eu.save.v1`) and can be exported to / imported from a JSON file, so the game needs no server and can be wrapped as a desktop app later.
- Controls: arrow keys / WASD, Enter / Space / Z; touch d-pad on phones; standard gamepads.
- Losing a duel sends you to the map's `heal` point and plays its `lost` line.
- Story state is flags in the save. Anything on a map can appear or vanish with `when`/`unless`; talk can be a list of variants (first match wins) and can `sets` flags; scenes play once on entering a map or stepping on a tile. Data shapes: top of `maps.js`.
- Music (`music/`) is spliced by `build.py` into its own script block, so the headless engine never loads it. Maps have a `music` track; fights use `battle-wild` / `battle-contract` or their own; stingers on wins, losses, card finds, promotions, Manifest casts and boss phase breaks; battle intensity follows the lower life total, with boss phase floors.
- Card drops (designer rules): a won duel gives 1-2 different basic cards from the enemy's own deck, weighted by rarity (`RPG_DROPS` in `encounters.js`), so an all-rare deck drops only rares. Manifests never drop; they come from specific chests, contracts and story duels. Dual/triple enemies also give essence of their confluence (`save.essence`), the Forge's fuel. `rpgDropOdds(deckId, owned)` and `rpgRollDrops(deckId, kind, owned)` are on `tools/engine.js` for sims.

## Next

Collection and deck builder (use cards found in chests), a first dungeon with a boss room, Story's dialogue and place names, Music's player.
