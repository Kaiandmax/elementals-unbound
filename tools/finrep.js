require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const J=(...f)=>Object.assign({}, ...f.filter(x=>fs.existsSync(x)).map(x=>JSON.parse(fs.readFileSync(x))));
const pct=([w,n])=>(100*w/n).toFixed(1)+"% (n="+n+")";
const C=J("CHa.json","CHb.json"); console.log("CHECK", Object.entries(C).map(([k,v])=>k+": "+pct(v)).join("  "));
const F=J("FDa.json","FDb.json"); const add=(o,k,[w,n])=>{ const a=o[k]=o[k]||[0,0]; a[0]+=w; a[1]+=n; };
const byEl={}, byR={}, byGR={};
const grp=el=>["fire","water","earth","wind","lightning"].includes(el)?"mono":S.CONFLUENCE[el].length===2?"dual":"triple";
for (const [id,v] of Object.entries(F)){ const d=S.DECK_BY_ID[id]; add(byEl,d.el,v); const r=d.tier==="special"?"archetype":d.tier; add(byR,r,v); add(byGR, d.tier==="starter"?"starter":grp(d.el)+" "+r, v); }
console.log("FIELD by element:", Object.entries(byEl).sort((a,b)=>b[1][0]/b[1][1]-a[1][0]/a[1][1]).map(([k,v])=>k+" "+(100*v[0]/v[1]).toFixed(0)).join(", "));
console.log("FIELD by rarity:", Object.entries(byR).map(([k,v])=>k+" "+pct(v)).join(", "));
console.log("FIELD by group:", Object.entries(byGR).map(([k,v])=>k+" "+(100*v[0]/v[1]).toFixed(0)).join(", "));
const M=J("MRa.json","MRb.json"); const pr={}; for (const [k,v] of Object.entries(M)){ const [,a,b]=k.split("|"); add(pr,"L"+b+" vs L"+a,v); }
console.log("MIRROR (higher level's win %):", Object.entries(pr).map(([k,v])=>k+" "+pct(v)).join(", "));
