// node ladder.js OUT  env: D=deck ids (comma), G=games per deck, LV=5, plus MADJ2/MADJM/SPF/TIERF overrides (json)
globalThis.MADJ2_OVR = JSON.parse(process.env.MADJ2||"{}"); globalThis.SPF_OVR = JSON.parse(process.env.SPF||"{}");
globalThis.MADJM_OVR = JSON.parse(process.env.MADJM||"{}"); globalThis.TIERF_OVR = JSON.parse(process.env.TIERF||"{}"); globalThis.EF_OVR = JSON.parse(process.env.EF||"{}"); globalThis.SPMF_OVR = JSON.parse(process.env.SPMF||"{}"); globalThis.ARCHK_OVR = JSON.parse(process.env.ARCHK||"{}");
require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const tierOf = d => { const T={starter:1, common:2, uncommon:3, rare:4}; if (!d.conf) return T[d.tier];
  const tri = S.TRIPLE_ELS.includes(d.el); if (d.tier==="special") return tri?10:7; return (tri?7:4)+({common:1,uncommon:2,rare:3})[d.tier]; };
const decks = Object.values(S.DECK_BY_ID); const byTier = {}; for (const d of decks) (byTier[tierOf(d)] = byTier[tierOf(d)]||[]).push(d.id);
const D = process.env.D.split(","), G = +(process.env.G||20), LV = +(process.env.LV||5);
const vsT = process.env.VS ? +process.env.VS : null;   // optional: fixed opponent tier
const res = {};
(async()=>{ for (const v of D){ const t = tierOf(S.DECK_BY_ID[v]); const opp = byTier[vsT ?? (t-1)] || byTier[1]; let w=0,n=0;
  for (let k=0;k<G;k++){ const o = opp[k % opp.length]; const seat = k%2; const r = await S.newGame(seat?o:v, seat?v:o, 15, [LV,LV]); const win = r==="you"?0:r==="enemy"?1:-1; n++; if (win===seat) w++; else if (win===-1) w+=0.5; }
  res[v] = [w,n,t]; fs.writeFileSync(process.argv[2], JSON.stringify(res)); } })();
