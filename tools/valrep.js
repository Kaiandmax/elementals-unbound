require("./engine.js"); const S=globalThis.__sim; const L=Object.values(S.LIB).filter(c=>!c.token && !(c.r==="s" && c.manifest));
const med=a=>{ const s=[...a].sort((x,y)=>x-y); return s.length? s[Math.floor(s.length/2)] : 0; };
// curve check on base element non-starter cards
const base=L.filter(c=>["fire","water","earth","wind","lightning"].includes(c.el) && c.r!=="s");
for (const kind of ["basic","mani"]){ const by={}; for (const c of base.filter(c=>kind==="mani"?c.manifest:!c.manifest)){ const k=kind==="mani"?Object.values(c.mcost)[0]:c.cost; (by[k]=by[k]||[]).push(S.cardValue(c)); }
  console.log(kind, Object.entries(by).map(([k,a])=>k+":"+med(a).toFixed(1)+"(n"+a.length+")").join(" ")); }
const groups={}; for (const c of L){ const k=c.el+"|"+(c.r==="s"?"s":c.r)+"|"+(c.manifest?"M":"B"); (groups[k]=groups[k]||[]).push(c); }
let out=0, tot=0; const flag=[];
for (const [k,cs] of Object.entries(groups)){ const rs=cs.map(c=>S.cardRatio(c)); const m=med(rs); cs.forEach((c,i)=>{ tot++; const q=rs[i]/m; if (q>1.2||q<0.8){ out++; flag.push([k,c.name,c.fused?"F":c.special?"S":"H",q.toFixed(2),(c.manifest?"M"+Object.values(c.mcost)[0]:c.cost)]); } }); }
console.log("cards",tot,"outside ±20% of group median:",out);
const byKind={}; for (const f of flag){ byKind[f[2]]=(byKind[f[2]]||0)+1; } console.log(byKind);
require("fs").writeFileSync("flags.json", JSON.stringify(flag));
