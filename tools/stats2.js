// node stats2.js MODE OUT  env PART=0|1, G
//  field:  each deck vs G opponents spread evenly over all 105 decks (both AIs level 5)
//  mirror: each deck vs itself, AI level a vs b for every a<b (G games per pairing; G5 games when either side is level 5)
require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const decks = Object.values(S.DECK_BY_ID).map(d=>d.id); const [mode,out]=[process.argv[2],process.argv[3]];
const FLV=+(process.env.FLV||5), PART=+(process.env.PART||0), G=+(process.env.G||12), G5=+(process.env.G5||2);
const res = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out)) : {}; const save=()=>fs.writeFileSync(out, JSON.stringify(res));
const play = async (a, b, la, lb, seat) => { const r = await S.newGame(seat?b:a, seat?a:b, 15, seat?[lb,la]:[la,lb]); const win = r==="you"?0:r==="enemy"?1:-1; return win===seat ? 1 : win===-1 ? 0.5 : 0; };
(async()=>{
  const mine = decks.filter((_,i)=>i%2===PART);
  if (mode==="field") for (const v of mine){ if (res[v]) continue; const i0 = decks.indexOf(v); let w=0,n=0;
    for (let k=0;k<G;k++){ const o = decks[(i0 + 1 + Math.floor(k*(decks.length-1)/G)) % decks.length]; w += await play(v, o, FLV, FLV, k%2); n++; }
    res[v]=[w,n]; save(); }
  if (mode==="mirror") for (const v of mine) for (let a=1;a<=5;a++) for (let b=a+1;b<=5;b++){ if (res[v+"|"+a+"|"+b]) continue; const g = b===5 ? G5 : G; let w=0,n=0;
    for (let k=0;k<g;k++){ w += await play(v, v, b, a, (k+PART)%2); n++; }   // w counts wins for the higher level b
    res[v+"|"+a+"|"+b]=[w,n]; save(); }
})();
