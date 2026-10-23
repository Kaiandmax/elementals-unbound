// How often a Manifest gets cast, by its charge cost (and by tier), over many games. env N, LV, PART, OUT
require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const ids=Object.keys(S.DECK_BY_ID); const N=+(process.env.N||100), LV=+(process.env.LV||4), PART=+(process.env.PART||0);
const tot=c=>Object.values(c.mcost).reduce((a,b)=>a+b,0);
const R={}, T={}; // cost -> [cast, seen]
(async()=>{ for (let k=PART;k<N;k+=2){ const a=ids[(k*7)%ids.length]; const same=ids.filter(x=>S.DECK_BY_ID[x].tier===S.DECK_BY_ID[a].tier && (S.CONFLUENCE[S.DECK_BY_ID[x].el]||[1]).length===(S.CONFLUENCE[S.DECK_BY_ID[a].el]||[1]).length); const b=same[(k*13+5)%same.length];
  await S.newGame(a,b,15,[LV,LV]); const g=S.getG(); const tk=S.DECK_BY_ID[a].tier; const tt=T[tk]=T[tk]||[0,0]; tt[0]+=g.turnNo; tt[1]++;
  for (const p of g.P){ const d=S.DECK_BY_ID[p.deckId]; const left=new Set(p.manifests.map(m=>m.id));
    for (const id of d.manifests){ const c=S.LIB[id]; const n=tot(c); const r=R[n]=R[n]||[0,0]; r[1]++; if (!left.has(id)) r[0]++; } }
  fs.writeFileSync(process.env.OUT, JSON.stringify({R,T})); } })();
