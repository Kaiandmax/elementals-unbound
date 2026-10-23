# Balance tools

Node scripts that play the game headless, AI against AI. Run everything from this folder.

```
bash mk.sh                 # build index.html + engine.js (always run after changing cards or src.html)
node valrep.js             # internal balance: cards more than 20% from their element+rarity median (writes flags.json)
bash ladder_l5.sh          # level-5 ladder (each deck vs the tier below) + 10-vs-1/2/3 check, resumable
bash grids.sh              # win-rate grids for the Win rates tab (level 3 and 5), resumable, slow
node monochk.js            # LV=3|4|5 N=20: each mono element vs the other mono elements
```

Only 2 CPUs: long jobs split work with `PART=0` / `PART=1` and run two processes. Level-5 games take about 1.5 s each; level 3 about 0.04 s.

## Scripts

| Script | What it does |
|---|---|
| `mk.sh` | Builds the game and `engine.js` (the game script with a `globalThis.__sim` handle). |
| `fin.js MODE OUT` | `ladder`: every deck vs decks one tier below; `check`: tier 10 vs tiers 1, 2, 3. Level 5. Resumable. |
| `l5rep.js FILES` | Per-tier summary of a ladder run. `finrep.js` summarizes check/field/mirror files. |
| `ladder.js`, `lrun.sh`, `lrep.js`, `lt3.js` | Fast ladder runs at any level (`LV`) and the ladder tuner (adjusts TIERF, EF, SPF/SPMF, ARCH_K). |
| `rr.js` | Round robin inside each group of equivalent decks (`GRP=dual:common,...`). |
| `rrrep.js`, `bt.js` | Group report; Bradley-Terry deck strengths (how much is deck strength vs specific matchups). |
| `rrtune2.js ROUNDS N` | Matchup tuner: element life (EL_LIFE) from each element's mean, EF for the rest, SPF for archetypes. |
| `fullrr.js` + `genwr2.js` | Every deck vs every deck; writes `cards/winrates.js` for the Win rates tab. |
| `stats2.js` | `field`: each deck vs a spread of all decks; `mirror`: each deck vs itself at different AI levels. |
| `v1.js` | Tier-10 decks vs every deck of one low tier (`LOWT=starter|common|uncommon`). |
| `castrate2.js` | How often Manifests get cast, by charge cost. |
| `deckdiff.js` | Print a deck's cards (`D=deck_id`, optional `EF` override) to see what a tuning change did. |

## Tuning levers (all in `cards/catalog.js`)

- `TIERF` — strength of a whole tier (`base|dual|tri : c|u|r`). Moves the 1-10 ladder.
- `EF` — strength of one element and rarity (`el:r`), basic cards and Manifests together.
- `EL_LIFE` — starting life per element (default 15).
- `SPF` / `SPMF` — archetype special cards and special Manifests, within ±8%.
- `ARCH_K` — how many special cards each archetype deck carries (4-10).
- `MK` — Manifest power relative to the same group's basic cards.
- Value model: `cards/value.js` (keyword, effect and trigger prices; cost curves).

Every script that loads `engine.js` accepts overrides through environment variables (`TIERF`, `EF`, `LIFE`, `SPF`, `SPMF`, `ARCHK` as JSON), so a change can be tested before it is written into `catalog.js`.

## Targets (agreed with the designer)

- Ladder: Starter 1; mono common/uncommon/rare 2/3/4; dual 5/6/7; triple 8/9/10. Each step wins about 55-65% against the step below at AI level 5. A 10 beats a 1 nearly always and a 2 or 3 in 90%+ of games.
- Same element count and rarity: no matchup past 70/30 where avoidable.
- Every card within about 20% of its element and rarity's median value.
- Battles are short on purpose (about 3 turns each); boss fights get longer through boss mechanics.
