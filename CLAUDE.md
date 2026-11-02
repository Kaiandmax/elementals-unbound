# Elementals Unbound

A story-driven RPG with a trading-card battle system. Today the repo holds the playable card battler (a single web page) and its balance tools; the RPG layer, story and music are being built by a five-agent studio.

## If this chat has a studio role

If the designer has given this chat a role (TCG Design, Balance, Story, Music or Game Dev), read `studio/STUDIO.md` and `studio/roles/<role>.md` before doing anything else, then check the Studio Board as STUDIO.md describes. Stay in your lane; post on the board for anything that isn't yours.

## Build and test

```
python3 build.py                          # cards/*.js + art.js spliced into src.html -> index.html
bash tools/mk.sh                          # also builds tools/engine.js for headless sims
node tools/smoke.js                       # CI check: all decks legal, AI-vs-AI games finish
```

Never edit `index.html`, `tools/engine.js` or `cards/winrates.js` by hand (generated). Balance scripts are documented in `tools/README.md`.

## Layout

| Path | What | Owner |
|---|---|---|
| `src.html` | Engine, rules, AI, battle UI | Game Dev |
| `art.js` | Procedural card art | Game Dev |
| `build.py`, `.github/` | Build, CI, Pages deploy | Game Dev |
| `cards/dsl.js` | Card effect language | Game Dev (TCG Design and Balance review) |
| `cards/*.js` card and deck files | Cards and decks | TCG Design (what cards do, deck intent) and Balance (numbers); Story: names and flavor |
| `cards/value.js`, `catalog.js`, `winrates.js` | Value model, tuning tables, win-rate grids | Balance |
| `design/` | Card game design docs | TCG Design |
| `tools/` | Simulation and tuning scripts | Balance |
| `story/` | Story Bible, outline, dialogue data | Story |
| `music/` | Scores, player, sound effects | Music |
| `rpg/` | Overworld, maps, encounters | Game Dev |
| `studio/` | Studio protocol, role charters, the board page source | Designer |

## Links

- Repository: https://github.com/Kaiandmax/elementals-unbound
- Studio Board: https://claude.ai/artifact/6Wpb6xUgEr9j13HJ3QoR8s
- Design doc: https://claude.ai/artifact/SqnsDEFPYvDEBxeZgs8csd
- Playtest page: https://claude.ai/artifact/EXkDa1GuwdC7t2AK6k2rpM

## Rules snapshot

Energy 3 per turn (bank up to 3). Basic cards give charge of their element; charge casts Manifests (2-6 charge, once each). Every deck has 4 Manifests, whatever its element count. Starting life depends on the element (13-20). A coin flip decides who goes first. Board holds 8 creatures; damage on creatures stays until healed. AI levels 1-5. Normal battles last under 4 turns a side on purpose; boss fights (crowned monsters, higher-rank monsters, key NPC duels) aim for 6-7 turns through boss mechanics.
