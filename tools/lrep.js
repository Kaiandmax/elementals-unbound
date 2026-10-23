const fs=require("fs"); const tag=process.argv[2]; const R={}; for (const f of fs.readdirSync(".").filter(f=>f.startsWith("lo_"+tag+"_"))) Object.assign(R, JSON.parse(fs.readFileSync(f)));
const byT={}; for (const [id,[w,n,t]] of Object.entries(R)){ (byT[t]=byT[t]||[]).push([id,100*w/n]); }
for (const t of Object.keys(byT).sort((a,b)=>a-b)){ const a=byT[t]; const avg=a.reduce((s,x)=>s+x[1],0)/a.length; console.log("T"+t, avg.toFixed(1), "|", a.map(([id,p])=>id.replace(/_starter$/,"")+":"+p.toFixed(0)).join(" ")); }
fs.writeFileSync("lrep_"+tag+".json", JSON.stringify(R));
