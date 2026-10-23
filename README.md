# Elementals Unbound

A story-driven RPG with a trading-card battle system. Explore, find a striking card as loot deep in a dungeon, and rebuild your whole deck around your new monster.

**Status:** the card battler is playable: 5 elements, dual and triple confluences, 105 prebuilt decks on a 1-10 power ladder, five AI levels. The RPG layer (overworld, dungeons, loot, story, music) is next.

## Play

- In the browser: open the GitHub Pages site for this repo (deployed from `main` by `.github/workflows/pages.yml`), or build locally and open `index.html`.
- Playtest page on claude.ai: https://claude.ai/artifact/EXkDa1GuwdC7t2AK6k2rpM

## Build

```
python3 build.py          # -> index.html
bash tools/mk.sh          # also builds tools/engine.js for simulations
node tools/smoke.js       # quick AI-vs-AI check (CI runs this on every PR)
```

## The studio

Four Claude agents build the game, each in its own chat, coordinating through pull requests here and the [Studio Board](https://claude.ai/artifact/6Wpb6xUgEr9j13HJ3QoR8s):

| Role | Works on |
|---|---|
| Balance | Card numbers, decks, win rates, simulations (`cards/`, `tools/`) |
| Story | World, plot, dialogue, card names and flavor (`story/`) |
| Music | Soundtrack and sound effects (`music/`) |
| Game Dev | Engine, RPG systems, UI, build and CI (`src.html`, `art.js`, `.github/`) |

How they work together: [`studio/STUDIO.md`](studio/STUDIO.md). Each role's charter: [`studio/roles/`](studio/roles/). Design decisions: the [design doc](https://claude.ai/artifact/SqnsDEFPYvDEBxeZgs8csd).
