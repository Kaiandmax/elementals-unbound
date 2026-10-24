# Build the game (index.html) and a headless engine (tools/engine.js) that the simulation scripts load.
# Run from anywhere: bash tools/mk.sh
T="$(cd "$(dirname "$0")" && pwd)"; G="$(dirname "$T")"
cd "$G" && python3 build.py >/dev/null && sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > "$T/engine.js" && cat >> "$T/engine.js" <<'X'
globalThis.__sim.AIW = AIW; Object.assign(globalThis.__sim,{DECK_BY_ID, TOKENS, genActions, applyAction, simulate, hook, declareAttack, blockTriggers, resolveCombat, checkDeaths, makeCreature, aiShouldCounter, cloneState, setG:v=>{g=v}, getG:()=>g, aiChooseAttack, aiPlanBlocks, DECKS});
Object.assign(globalThis.__sim,{cardValue, cardRatio, costCurve, ARCHETYPE, EF, MK, deckLife, EL_LIFE, SPF, SPMF, TIERF, BAL_MED, fuse, fuseParts, canFuse, partsOf, RECIPES, CONFLUENCE, TRIPLE_ELS, DUAL_ELS, L5OPT});
Object.assign(globalThis.__sim,{RPG_MAPS, RPG_ENCOUNTERS, RPG_TRAINERS, RPG_TEXT, RPG_TILE, RPG_START, RPG_DROPS, rpgDropOdds, rpgRollDrops});
X
echo built
