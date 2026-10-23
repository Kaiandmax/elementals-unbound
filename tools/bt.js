// Bradley-Terry fit per group: how much of the lopsidedness is overall deck strength vs specific matchups.
const fs=require("fs"); const R=Object.assign({}, ...process.argv.slice(2).map(f=>JSON.parse(fs.readFileSync(f))));
const by={}; for (const [key,[w,n]] of Object.entries(R)){ const [k,a,b]=key.split("|"); (by[k]=by[k]||[]).push([a,b,w,n]); }
let tot=0, obs=0, pred=0, resid=0; const out={};
for (const [k,arr] of Object.entries(by)){ const ids=[...new Set(arr.flatMap(x=>[x[0],x[1]]))]; const s=Object.fromEntries(ids.map(i=>[i,0]));
  for (let it=0;it<300;it++){ for (const i of ids){ let g=0; for (const [a,b,w,n] of arr){ if (a!==i&&b!==i) continue; const p=1/(1+Math.exp(-(s[a]-s[b]))); const wi = a===i ? w : n-w; const pi = a===i ? p : 1-p; g += wi - n*pi; } s[i]+=0.02*g; } const m=ids.reduce((x,i)=>x+s[i],0)/ids.length; for (const i of ids) s[i]-=m; }
  out[k]=s;
  for (const [a,b,w,n] of arr){ tot++; const p=1/(1+Math.exp(-(s[a]-s[b]))); if (w/n>0.7||w/n<0.3) obs++; if (p>0.7||p<0.3) pred++; }
}
console.log("pairs",tot,"observed outside 30-70:",obs,"predicted by deck strength alone:",pred);
fs.writeFileSync("bt.json", JSON.stringify(out));
for (const [k,s] of Object.entries(out)) console.log(k.padEnd(14), Object.entries(s).sort((a,b)=>b[1]-a[1]).map(([i,v])=>i.replace(/_(sp)$/,"*")+" "+(100/(1+Math.exp(-v))).toFixed(0)).join(", "));
