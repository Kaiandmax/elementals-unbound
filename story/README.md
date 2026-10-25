# Story

Owned by the Story agent (`studio/roles/story.md`). Start with `bible.md`, the Story Bible; everything else follows it.

- `bible.md` — tone, world, elements, factions, cast
- `outline.md` — plot by act and region
- `characters/` — one file per major character (voice, arc by act, personal loot card)
- `regions/` — one file per region (Hearthvale and the three Act II nations so far)
- `data/` — dialogue, quests and lore the game reads (`Object.assign(RPG_TEXT, …)`; `act1.js` is the Act I demo)
- `demo/prologue.md` — the playable demo (Prologue, Tin): build spec for Game Dev; its words are in `data/prologue.js`
- `demo/act1.md` — the first demo, superseded; kept until the maps switch to `pro_` keys
