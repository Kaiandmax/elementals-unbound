// Write cards/winrates.js with one table per AI level (skips a level whose run hasn't finished).
const fs=require("fs"); process.chdir(__dirname); const sets={};
for (const [lv,n,files] of [["3",20,["g3_a.json","g3_b.json"]],["5",6,["g5_a.json","g5_b.json"]]]){
  const R=Object.assign({}, ...files.filter(f=>fs.existsSync(f)).map(f=>JSON.parse(fs.readFileSync(f))));
  if (Object.keys(R).length < 5460 && !process.env.PARTIAL) { console.log("level", lv, "incomplete:", Object.keys(R).length); continue; }
  sets[lv] = { meta:{ level:+lv, games:n, date:new Date().toISOString().slice(0,10) }, r:R }; console.log("level", lv, "pairs", Object.keys(R).length); }
const out = `/* Win rates: every deck against every other deck, from simulation, one table per AI level. "a|b": [wins for a, games]. */\nconst WINRATES = ${JSON.stringify(sets)};\n`;
fs.writeFileSync(require("path").join(__dirname,"..","cards","winrates.js"), out); console.log("bytes", out.length);
