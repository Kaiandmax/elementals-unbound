# lrun.sh TAG G [VS]  (env MADJ2 MADJM SPF TIERF) — all decks except starters, split over 2 processes
cd "$(dirname "$0")"
IDS=${IDS:-$(node -e 'require("./engine.js"); const S=globalThis.__sim; console.log(Object.values(S.DECK_BY_ID).filter(d=>d.tier!=="starter").map(d=>d.id).join(","))')}
IFS=, read -ra A <<< "$IDS"; E=(); O=(); for i in "${!A[@]}"; do if (( i%2 )); then O+=("${A[$i]}"); else E+=("${A[$i]}"); fi; done
rm -f lo_$1_*.json
D=$(IFS=,; echo "${E[*]}") G=$2 VS=$3 node ladder.js lo_$1_1.json & D=$(IFS=,; echo "${O[*]}") G=$2 VS=$3 node ladder.js lo_$1_2.json & wait
node lrep.js $1
