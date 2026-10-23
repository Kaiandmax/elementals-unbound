// node lt3.js ROUNDS G TARGET — ladder tuner v3: TIERF sets each tier's strength; MF (Manifest strength per element:rarity)
// evens out decks inside a tier; SPF/SPMF nudge archetypes within ±6% so card groups stay balanced.
const { execSync } = require("child_process"); const fs=require("fs");
const [R,G,TGT]=[+process.argv[2], +process.argv[3], +(process.argv[4]||60)];
const J = f => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f)) : null;
require("./engine.js"); const S=globalThis.__sim;
let mf = J("ef.json") || {...S.EF}, tf = J("tierf.json") || {...S.TIERF}, f = J("spf3.json") || {...S.SPF}, sm = J("spmf3.json") || {...S.SPMF}, ak = J("archk.json") || {};
const RC = {common:"c",uncommon:"u",rare:"r"};
const grpOf = el => ["fire","water","earth","wind","lightning"].includes(el) ? "base" : S.CONFLUENCE[el].length===2 ? "dual" : "tri";
const clamp = (x,a,b) => Math.max(a, Math.min(b, x)); const r3 = x => Math.round(x*1000)/1000;
for (let r=1;r<=R;r++){
  execSync(`bash lrun.sh lt3 ${G} > lt3_r${r}.txt`, {env:{...process.env, MADJ2:"{}", EF:JSON.stringify(mf), SPF:JSON.stringify(f), SPMF:JSON.stringify(sm), TIERF:JSON.stringify(tf), ARCHK:JSON.stringify(ak)}, shell:"/bin/bash"});
  const res = JSON.parse(fs.readFileSync("lrep_lt3.json"));
  const tier = {}, key = {}, sp = {};
  for (const [id,[w,n]] of Object.entries(res)){ const d = S.DECK_BY_ID[id]; if (d.tier==="starter") continue;
    if (d.tier==="special"){ sp[d.el] = [w,n]; continue; }
    const tk = grpOf(d.el)+":"+RC[d.tier]; const a = tier[tk] = tier[tk]||[0,0]; a[0]+=w; a[1]+=n;
    const kk = d.el+":"+RC[d.tier]; const b = key[kk] = key[kk]||[0,0,tk]; b[0]+=w; b[1]+=n; }
  const tp = {}; for (const [tk,[w,n]] of Object.entries(tier)){ tp[tk] = 100*w/n; const d = tp[tk]-TGT; if (Math.abs(d)>2) tf[tk] = r3(clamp((tf[tk]||1)*(1 - 0.004*clamp(d,-15,15)), 0.6, 1.8)); }
  for (const [kk,[w,n,tk]] of Object.entries(key)){ const d = 100*w/n - tp[tk]; if (Math.abs(d) <= 6) continue;
    mf[kk] = r3(clamp((mf[kk]||1)*(1 - 0.004*clamp(d,-25,25)), 0.75, 1.3)); }
  for (const [c,[w,n]] of Object.entries(sp)){ const d = 100*w/n - TGT; if (Math.abs(d) <= 5) continue;
    if (Math.abs(d) >= 12) ak[c] = clamp((ak[c]||6) + Math.sign(d), 4, 10);
    f[c] = r3(clamp((f[c]||1)*(1 - 0.004*clamp(d,-15,15)), 0.94, 1.06)); sm[c] = r3(clamp((sm[c]||1)*(1 - 0.004*clamp(d,-15,15)), 0.94, 1.06)); }
  for (const [n,o] of [["ef",mf],["tierf",tf],["spf3",f],["spmf3",sm],["archk",ak]]) fs.writeFileSync(n+".json", JSON.stringify(o));
  fs.appendFileSync("lt3.log", `round ${r}\n${fs.readFileSync("lt3_r"+r+".txt","utf8")}tiers ${JSON.stringify(tp)}\n`);
}
fs.appendFileSync("lt3.log","DONE3\n");
