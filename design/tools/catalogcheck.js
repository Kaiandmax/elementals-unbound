// Checks a designed confluence catalog (TCG Design) against design/confluence-slots.md and design/confluence-cards.md.
//   bash tools/mk.sh
//   node design/tools/catalogcheck.js steam        # loads cards/catalog_steam.js on top of the headless engine (in memory)
// Reports: grid (type x rarity), cost spread, themes, signature recipes (parents exist, right elements, unique pairs),
// rule flags (keywords, text length, face burst), and value per Energy against the mono median x the tier factor.
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const conf = process.argv[2] || "steam";
const ROOT = path.join(__dirname, "../..");
vm.runInThisContext(fs.readFileSync(path.join(ROOT, "tools/engine.js"), "utf8"), { filename: "engine.js" });
const S = globalThis.__sim, L = S.LIB, els = S.CONFLUENCE[conf];
const TIER = +process.env.TIER || (els.length === 2 ? 1.25 : 1.6);   // TIER=1.2 to measure against another tier factor
// Mono reference: the median value per Energy of the parent elements' basic cards, by rarity (before the new card enters LIB).
const med = a => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const mono = {};
for (const r of ["c", "u", "r"]) mono[r] = med(Object.values(L).filter(d => els.includes(d.el) && d.r === r && !d.manifest && !d.token).map(d => S.cardRatio(d)));
const byName = {};
for (const d of Object.values(L)) if (els.includes(d.el) && !d.manifest && !d.token) byName[d.name] = d;
// The catalog replaces the confluence's current basic cards (specials and fusions), so drop them first.
for (const [id, d] of Object.entries(L)) if (d.el === conf && !d.manifest && !d.token) delete L[id];
vm.runInThisContext(fs.readFileSync(path.join(ROOT, `cards/catalog_${conf}.js`), "utf8"), { filename: `catalog_${conf}.js` });
const C = globalThis[conf.toUpperCase() + "_CATALOG"] || vm.runInThisContext(conf.toUpperCase() + "_CATALOG");

const grid = {}, cost = { cr: {}, other: {} }, themes = {}, pairs = new Map(), problems = [];
for (const d of C){
  const k = d.type + ":" + d.r; grid[k] = (grid[k] || 0) + 1;
  const ck = d.type === "creature" ? "cr" : "other"; cost[ck][d.cost] = (cost[ck][d.cost] || 0) + 1;
  themes[d.th] = (themes[d.th] || 0) + 1;
  const sig = d.sig || [];
  sig.forEach((n, i) => { const p = byName[n]; if (!p) problems.push(`${d.name}: parent "${n}" not found`); else if (p.el !== els[i]) problems.push(`${d.name}: parent "${n}" is ${p.el}, expected ${els[i]}`); });
  const key = [...sig].sort().join(" + ");
  if (pairs.has(key)) problems.push(`${d.name}: signature recipe ${key} already used by ${pairs.get(key)}`); else pairs.set(key, d.name);
  if ((d.kw || []).length > 1) problems.push(`${d.name}: ${d.kw.length} keywords`);
  if ((d.text || "").length > 140) problems.push(`${d.name}: long text (${d.text.length})`);
  const face = ((d.fx || "").match(/dmg face (\d+)/g) || []).reduce((s, m) => s + +m.split(" ")[2], 0) + ((d.kw || []).includes("haste") ? d.atk : 0);
  if (face > d.cost + 1) problems.push(`${d.name}: up to ${face} face damage the turn it's played (cap ${d.cost + 1})`);
}
const want = { "creature:c": 25, "creature:u": 15, "creature:r": 10, "spell:c": 10, "spell:u": 7, "spell:r": 4, "reaction:c": 8, "reaction:u": 4, "reaction:r": 3, "aura:c": 7, "aura:u": 4, "aura:r": 3 };
console.log(`${conf}: ${C.length} cards (want 100)`);
console.log("grid (have/want):", Object.keys(want).map(k => `${k} ${grid[k] || 0}/${want[k]}`).join(", "));
console.log("creature costs:", JSON.stringify(cost.cr), "want {1:6,2:12,3:12,4:10,5:6,6:4}");
console.log("other costs:   ", JSON.stringify(cost.other), "want {1:10,2:18,3:12,4:6,5:3,6:1}");
console.log("themes:", JSON.stringify(themes));
// Value: card value per Energy against mono median x tier factor (Balance's normalization will move cards into the band).
const rows = C.map(d => ({ d, v: S.cardRatio(d) / (mono[d.r] * TIER) }));
const lo = rows.filter(x => x.v < 0.75), hi = rows.filter(x => x.v > 1.33);
console.log(`value vs mono x${TIER}: median ${med(rows.map(x => x.v)).toFixed(2)}; under 0.75: ${lo.length}; over 1.33: ${hi.length}`);
for (const x of [...hi].sort((a, b) => b.v - a.v)) console.log(`  high ${x.v.toFixed(2)}  ${x.d.name} (${x.d.cost}) ${x.d.text}`);
for (const x of [...lo].sort((a, b) => a.v - b.v)) console.log(`  low  ${x.v.toFixed(2)}  ${x.d.name} (${x.d.cost}) ${x.d.text}`);
console.log(problems.length ? "problems:\n  " + problems.join("\n  ") : "no rule problems");
