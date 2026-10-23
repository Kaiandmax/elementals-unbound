// Every deck against every other deck. env PART (0..P-1), P, N games per pair, LV, OUT. Resumable.
require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const ids=Object.keys(S.DECK_BY_ID); const pairs=[]; for (let i=0;i<ids.length;i++) for (let j=i+1;j<ids.length;j++) pairs.push([ids[i],ids[j]]);
const PART=+process.env.PART, P=+(process.env.P||2), N=+(process.env.N||8), LV=+(process.env.LV||4), OUT=process.env.OUT;
const res = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT)) : {}; let k=0;
(async()=>{ for (let p=PART;p<pairs.length;p+=P){ const [a,b]=pairs[p]; const key=a+"|"+b; if (res[key]) continue; let w=0;
  for (let i=0;i<N;i++){ const seat=i%2; const r=await S.newGame(seat?b:a, seat?a:b, 15, [LV,LV]); const win=r==="you"?0:r==="enemy"?1:-1; w += win===seat?1:win===-1?0.5:0; }
  res[key]=[w,N]; if (++k%20===0) fs.writeFileSync(OUT, JSON.stringify(res)); } fs.writeFileSync(OUT, JSON.stringify(res)); })();
