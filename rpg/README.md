# RPG layer

The adventure that wraps the card battler: a walkable tile overworld (Pokemon-style), tall-grass duels, trainers, chests, saving. Built in the same web stack as the battler and spliced into `index.html` by `build.py`.

| File | What | Owner |
|---|---|---|
| `world.js` | Overworld engine: movement, drawing, talking, chests, battles, saves, input | Game Dev |
| `maps.js` | Map layouts, warps, NPC/sign/chest placement, placeholder words (`RPG_TEXT`) | Game Dev (Story names places and writes all words) |
| `encounters.js` | Wild encounter tables and trainer decks | Balance |
| `../story/data/*.js` | Real dialogue: `Object.assign(RPG_TEXT, { key: ["Name: line", ...] })`, loaded after `maps.js` so it replaces placeholders | Story |

Formats are documented at the top of each file. `node tools/smoke.js` checks them: every map is a rectangle of known tiles, every walkable tile is reachable, warps land on open ground, and every text key, deck and card referenced exists.

## How it fits together

- The battle engine is untouched; a duel is `newGame(playerDeck, enemyDeck, 15 + lifeMod, [3, level])`. The headless sims load this code but never run it.
- Saves live in browser storage (`eu.save.v1`) and can be exported to / imported from a JSON file, so the game needs no server and can be wrapped as a desktop app later.
- Controls: arrow keys / WASD, Enter / Space / Z; touch d-pad on phones; standard gamepads.
- Losing a duel sends you to the map's `heal` point (or the town's).
- Card drops (designer rule): a won duel may give one basic card from the enemy's own deck, weighted by rarity (`RPG_DROPS` in `encounters.js`), so an all-rare deck drops only rares. Manifests never drop; they come from specific chests, contracts and story duels. `rpgDropOdds(deckId, owned)` gives the exact odds, also from `tools/engine.js`.

## Next

Collection and deck builder (use cards found in chests), a first dungeon with a boss room, Story's dialogue and place names, Music's player.
