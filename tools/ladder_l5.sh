# Level-5 benchmark chain: ladder (each deck vs the tier below), 10-vs-1/2/3 check. Resumable: rerun after a restart.
cd "$(dirname "$0")"
[ -f DONE_ladder ] || { (PART=0 G=16 node fin.js ladder L5a.json & PART=1 G=16 node fin.js ladder L5b.json & wait) && touch DONE_ladder; }
[ -f DONE_check ]  || { (PART=0 G=40 node fin.js check CHa.json & PART=1 G=40 node fin.js check CHb.json & wait) && touch DONE_check; }
node l5rep.js L5a.json L5b.json; node finrep.js | head -1
