// Round robin inside each group of equivalent decks (same element count and rarity). env PART N LV OUT, LIFE/EF overrides.
globalThis.LIFE_OVR = JSON.parse(process.env.LIFE||"{}"); globalThis.EF_OVR = JSON.parse(process.env.EF||"{}"); globalThis.ARCHK_OVR = JSON.parse(process.env.ARCHK||"{}"); globalThis.SPF_OVR = JSON.parse(process.env.SPF||"{}"); globalThis.SPMF_OVR = JSON.parse(process.env.SPMF||"{}");
require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const grp=d=>{ const n=(S.CONFLUENCE[d.el]||[1]).length; return (n===1?"mono":n===2?"dual":"tri")+":"+d.tier; };
const G={}; for (const d of Object.values(S.DECK_BY_ID)){ if (d.tier==="starter") continue; (G[grp(d)]=G[grp(d)]||[]).push(d.id); }
const GF=process.env.GRP?process.env.GRP.split(","):null; const pairs=[]; for (const [k,ids] of Object.entries(G)) if (!GF || GF.includes(k)) for (let i=0;i<ids.length;i++) for (let j=i+1;j<ids.length;j++) pairs.push([k,ids[i],ids[j]]);
const PART=+(process.env.PART||0), N=+(process.env.N||8), LV=+(process.env.LV||4), OUT=process.env.OUT;
const res = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT)) : {};
(async()=>{ for (let p=PART;p<pairs.length;p+=2){ const [k,a,b]=pairs[p]; const key=k+"|"+a+"|"+b; if (res[key]) continue; let w=0;
  for (let i=0;i<N;i++){ const seat=i%2; const r=await S.newGame(seat?b:a, seat?a:b, 15, [LV,LV]); const win=r==="you"?0:r==="enemy"?1:-1; w += win===seat?1:win===-1?0.5:0; }
  res[key]=[w,N]; fs.writeFileSync(OUT, JSON.stringify(res)); } })();
