// Each mono element's win % against other-element mono decks. env LV N.
require("./engine.js"); const S=globalThis.__sim; const els=["fire","water","earth","wind","lightning"]; const mono=Object.values(S.DECK_BY_ID).filter(d=>els.includes(d.el));
const LV=+(process.env.LV||3), N=+(process.env.N||20); const tot={};
(async()=>{ for (let i=0;i<mono.length;i++) for (let j=i+1;j<mono.length;j++){ const a=mono[i], b=mono[j]; if (a.el===b.el) continue; for (let k=0;k<N;k++){ const seat=k%2; const r=await S.newGame(seat?b.id:a.id, seat?a.id:b.id, 15, [LV,LV]); const win=r==="you"?0:r==="enemy"?1:-1; const wa = win===seat?1:win===-1?0.5:0;
  for (const [d,w] of [[a,wa],[b,1-wa]]){ const t=tot[d.el]=tot[d.el]||[0,0]; t[0]+=w; t[1]++; } } }
  console.log("L"+LV+":", els.map(e=>e+" "+Math.round(100*tot[e][0]/tot[e][1])).join(", ")); })();
