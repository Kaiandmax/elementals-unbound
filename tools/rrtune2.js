// node rrtune2.js ROUNDS N — v2: Bradley-Terry deck strengths, damped over two rounds, single-step life changes,
// gentler EF steps; archetypes use their special-card count, then a small special-card nudge (within 8%).
const { execSync } = require("child_process"); const fs=require("fs");
const [R,N]=[+process.argv[2], +process.argv[3]];
const J=(f,d)=>fs.existsSync(f)?JSON.parse(fs.readFileSync(f)):d;
require("./engine.js"); const S=globalThis.__sim;
let life=J("life.json",{}), ef=J("ef.json",{...S.EF}), ak=J("archk.json",{}), spf=J("spf3.json",{...S.SPF}), prev=J("rrprev.json",{});
const RC={common:"c",uncommon:"u",rare:"r"}; const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)); const r3=x=>Math.round(x*1000)/1000;
for (let r=1;r<=R;r++){
  for (const f of ["rrt_a.json","rrt_b.json"]) if (fs.existsSync(f)) fs.unlinkSync(f);
  const env={...process.env, LIFE:JSON.stringify(life), EF:JSON.stringify(ef), ARCHK:JSON.stringify(ak), SPF:JSON.stringify(spf), SPMF:JSON.stringify(spf), LV:process.env.LV||"4", N:String(N)};
  execSync(`PART=0 OUT=rrt_a.json node rr.js & PART=1 OUT=rrt_b.json node rr.js & wait`, {env, shell:"/bin/bash"});
  const rep = execSync(`node bt.js rrt_a.json rrt_b.json`, {env}).toString();
  for (const f of ["rrt_a.json","rrt_b.json"]) fs.copyFileSync(f, f.replace(".json","_r"+r+".json"));
  const bt = JSON.parse(fs.readFileSync("bt.json")); const res={};
  for (const g of Object.values(bt)) for (const [id,s] of Object.entries(g)){ const p = 100/(1+Math.exp(-s)) - 50; res[id] = prev[id]!=null ? 0.6*p + 0.4*prev[id] : p; }
  const byEl={}; for (const [id,v] of Object.entries(res)){ const d=S.DECK_BY_ID[id]; (byEl[d.el]=byEl[d.el]||[]).push([d,v]); }
  for (const [el,arr] of Object.entries(byEl)){
    const reg = arr.filter(x=>x[0].tier!=="special");                     // archetype decks have their own lever
    const m = reg.length ? reg.reduce((s,x)=>s+x[1],0)/reg.length : 0;
    const l0 = life[el]||15; if (Math.abs(m) > 5) life[el] = clamp(l0 - Math.sign(m), 10, 22);
    const stuck = Math.abs(m) > 5 && life[el]===l0;                      // life at its limit: EF takes the whole residual
    for (const [d,v] of arr){ const dv = d.tier==="special" ? v : (stuck ? v : v - m);
      if (d.tier==="special"){ if (Math.abs(dv) > 6) spf[d.el] = r3(clamp((spf[d.el]||1)*(1 - 0.003*clamp(dv,-25,25)), 0.92, 1.08)); continue; }
      const k = d.el+":"+RC[d.tier]; if (Math.abs(dv) > 5) ef[k] = r3(clamp((ef[k]||1)*(1 - 0.003*clamp(dv,-25,25)), 0.7, 1.4)); }
  }
  // life moved the element; damp the stored residuals so the next round doesn't double-count
  prev = Object.fromEntries(Object.entries(res).map(([k,v])=>[k, v*0.5]));
  for (const [n,o] of [["life",life],["ef",ef],["archk",ak],["spf3",spf],["rrprev",prev]]) fs.writeFileSync(n+".json", JSON.stringify(o));
  fs.appendFileSync("rrt2.log", `round ${r}\n${rep}life ${JSON.stringify(life)}\n`);
}
fs.appendFileSync("rrt2.log","DONE\n");
