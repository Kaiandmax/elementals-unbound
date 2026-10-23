# Win-rate grids for the Win rates tab: every deck vs every deck at AI level 3 (20 games) and level 5 (6 games).
# Resumable. About 1.5 h for level 3 and 11 h for level 5 on 2 CPUs. Then: node genwr2.js && bash mk.sh
cd "$(dirname "$0")"
(PART=0 P=2 N=20 LV=3 OUT=g3_a.json node fullrr.js & PART=1 P=2 N=20 LV=3 OUT=g3_b.json node fullrr.js & wait)
(PART=0 P=2 N=6 LV=5 OUT=g5_a.json node fullrr.js & PART=1 P=2 N=6 LV=5 OUT=g5_b.json node fullrr.js & wait)
node genwr2.js && bash mk.sh
