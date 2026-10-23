require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const R=Object.assign({}, ...process.argv.slice(2).map(f=>JSON.parse(fs.readFileSync(f))));
const RC={common:"c",uncommon:"u",rare:"r",special:"sp"}; const grp=el=>["fire","water","earth","wind","lightning"].includes(el)?"base":S.CONFLUENCE[el].length===2?"dual":"tri";
const T={}, A={};
for (const [id,[w,n,t]] of Object.entries(R)){ const d=S.DECK_BY_ID[id]; const k=d.tier==="special"?grp(d.el)+":arch(T"+t+")":"T"+t+" "+grp(d.el)+":"+RC[d.tier];
  const a=T[k]=T[k]||[0,0,[]]; a[0]+=w; a[1]+=n; a[2].push(id.replace(/_(starter|sp)$/,"")+":"+Math.round(100*w/n)); }
for (const k of Object.keys(T).sort((a,b)=>parseInt(a.slice(1))-parseInt(b.slice(1)))) console.log(k.padEnd(18), (100*T[k][0]/T[k][1]).toFixed(1), "n="+T[k][1], "|", T[k][2].join(" "));
