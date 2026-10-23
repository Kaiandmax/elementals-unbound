# Elementals Unbound

A story-driven RPG with a trading-card battle system. Today the repo holds the playable card battler (a single web page) and its balance tools; the RPG layer, story and music are being built by a four-agent studio.

## If this chat has a studio role

If the designer has given this chat a role (Balance, Story, Music or Game Dev), read `studio/STUDIO.md` and `studio/roles/<role>.md` before doing anything else, then check the Studio Board as STUDIO.md describes. Stay in your lane; post on the board for anything that isn't yours.

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
| `cards/dsl.js` | Card effect language | Game Dev (Balance reviews) |
| `cards/*.js` (others) | Cards, decks, value model, tuning tables | Balance (Story: names and flavor only) |
| `tools/` | Simulation and tuning scripts | Balance |
| `story/` | Story Bible, outline, dialogue data | Story |
| `music/` | Scores, player, sound effects | Music |
| `studio/` | Studio protocol, role charters, the board page source | Designer |

## Links

- Studio Board: https://claude.ai/artifact/6Wpb6xUgEr9j13HJ3QoR8s
- Design doc: https://claude.ai/artifact/SqnsDEFPYvDEBxeZgs8csd
- Playtest page: https://claude.ai/artifact/EXkDa1GuwdC7t2AK6k2rpM

## Rules snapshot

Energy 3 per turn (bank up to 3). Basic cards give charge of their element; charge casts Manifests (2-6 charge, once each). Mono decks have 5 Manifests, dual 4, triple 3. Starting life depends on the element (13-20). A coin flip decides who goes first. Board holds 8 creatures. AI levels 1-5. Battles last about 3 turns on purpose; bosses get longer fights through special mechanics.
