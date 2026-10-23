// node fin.js MODE OUT   env: PART=0|1 (split work over 2 processes), G games
//  MODE ladder: every non-starter deck vs decks of the tier below (G games), AI level 5 both sides
//  MODE check:  tier 10 vs tiers 1,2,3 (G games each pairing), level 5
//  MODE mirror: each deck vs itself, AI level a vs b for all a<b (G games per pairing, seats alternate)
require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const tierOf = d => { const T={starter:1, common:2, uncommon:3, rare:4}; if (!d.conf) return T[d.tier];
  const tri = S.TRIPLE_ELS.includes(d.el); if (d.tier==="special") return tri?10:7; return (tri?7:4)+({common:1,uncommon:2,rare:3})[d.tier]; };
const decks = Object.values(S.DECK_BY_ID); const byTier = {}; for (const d of decks) (byTier[tierOf(d)] = byTier[tierOf(d)]||[]).push(d.id);
const [mode, out] = [process.argv[2], process.argv[3]]; const PART = +(process.env.PART||0), G = +(process.env.G||20);
const res = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out)) : {}; const save = () => fs.writeFileSync(out, JSON.stringify(res));
const play = async (a, b, la, lb, seat) => { const r = await S.newGame(seat?b:a, seat?a:b, 15, seat?[lb,la]:[la,lb]); const win = r==="you"?0:r==="enemy"?1:-1; return win===seat ? 1 : win===-1 ? 0.5 : 0; };
(async()=>{
  if (mode==="ladder"){
    const list = decks.filter(d=>d.tier!=="starter").map(d=>d.id).filter((_,i)=>i%2===PART);
    for (const v of list){ if (res[v]) continue; const t = tierOf(S.DECK_BY_ID[v]), opp = byTier[t-1]; let w=0,n=0;
      for (let k=0;k<G;k++){ w += await play(v, opp[(k*7+3) % opp.length], 5, 5, k%2); n++; }
      res[v] = [w,n,t]; save(); }
  } else if (mode==="check"){
    for (const lo of (PART===0 ? [1,3] : [2])){ if (res["10v"+lo]) continue;
      let w=0,n=0; for (let k=0;k<G;k++){ const a = byTier[10][k % byTier[10].length], b = byTier[lo][(k*3) % byTier[lo].length]; w += await play(a, b, 5, 5, k%2); n++; }
      res["10v"+lo] = [w,n]; save(); }
  } else if (mode==="mirror"){
    const list = decks.map(d=>d.id).filter((_,i)=>i%2===PART);
    for (const v of list) for (let a=1;a<=5;a++) for (let b=a+1;b<=5;b++){ let w=0,n=0;
      for (let k=0;k<G;k++){ w += await play(v, v, a, b, k%2); n++; }
      res[v+"|"+a+"|"+b] = [w,n]; save(); }
  }
})();
