// Report: per group, deck averages and the most lopsided pairs.
require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const R=Object.assign({}, ...process.argv.slice(2).filter(f=>fs.existsSync(f)).map(f=>JSON.parse(fs.readFileSync(f))));
const by={}, avg={}; let over=0, tot=0;
for (const [key,[w,n]] of Object.entries(R)){ const [k,a,b]=key.split("|"); const p=w/n; (by[k]=by[k]||[]).push([a,b,p,n]); tot++; if (p>0.7||p<0.3) over++;
  for (const [d,x] of [[a,w],[b,n-w]]){ const t=avg[d]=avg[d]||[0,0]; t[0]+=x; t[1]+=n; } }
console.log("pairs",tot,"outside 30-70:",over);
for (const [k,arr] of Object.entries(by)){ const decks=[...new Set(arr.flatMap(x=>[x[0],x[1]]))]; const worst=arr.map(x=>[x[0],x[1],Math.max(x[2],1-x[2]),x[2]>=0.5?x[0]:x[1]]).sort((a,b)=>b[2]-a[2]);
  console.log(k.padEnd(14), "over70:", arr.filter(x=>x[2]>0.7||x[2]<0.3).length+"/"+arr.length, "| decks:", decks.map(d=>d.replace(/_(starter|sp)$/,"")+" "+Math.round(100*avg[d][0]/avg[d][1])).join(", "));
  console.log("   worst:", worst.slice(0,4).map(x=>x[3]+">"+(x[3]===x[0]?x[1]:x[0])+" "+Math.round(100*x[2])).join("; ")); }
fs.writeFileSync("rravg.json", JSON.stringify(Object.fromEntries(Object.entries(avg).map(([d,[w,n]])=>[d,w/n]))));
