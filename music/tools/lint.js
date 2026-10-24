// Checks every track's score without audio: bars add up to the meter, chord counts match, notes stay in range,
// ids are unique, every track compiles. Usage: node music/tools/lint.js   (exit 1 on any error)
const path = require("path"), root = path.join(__dirname, "..");
const ORDER = require(path.join(root, "tracks", "order.json"));
ORDER.forEach((f) => require(path.join(root, f)));
const { EUSynth, EU_TRACKS } = globalThis;
const GROUPS = ["element", "dual", "triple", "zone", "battle", "stinger"];
let errors = 0, warn = 0;
const err = (id, m) => { errors++; console.log("ERROR " + id + ": " + m); };
const seen = new Set();
for (const t of EU_TRACKS) {
  if (seen.has(t.id)) err(t.id, "duplicate id"); seen.add(t.id);
  if (!GROUPS.includes(t.group)) err(t.id, "unknown group " + t.group);
  if (!t.name || !t.desc) err(t.id, "needs name and desc");
  let C;
  try { C = EUSynth.compile(t); } catch (e) { err(t.id, e.message); continue; }
  const meter = C.meter;
  for (const [L, s] of Object.entries(t.sections)) {
    const bars = EUSynth.parseMel(s.mel), ch = String(s.chords).trim().split(/\s+/);
    bars.forEach((b, i) => { const sum = b.reduce((a, n) => a + n.b, 0);
      if (Math.abs(sum - meter) > 1e-6) err(t.id, `section ${L} bar ${i + 1} has ${+sum.toFixed(3)} beats, needs ${meter}`); });
    if (ch.length !== bars.length) err(t.id, `section ${L}: ${bars.length} bars but ${ch.length} chords`);
  }
  const ms = C.lead.map((n) => n.m), lo = Math.min(...ms), hi = Math.max(...ms);
  if (lo < 48 || hi > 88) err(t.id, `lead range ${lo}-${hi} outside 48-88 (C3-E6)`);
  if (C.seconds < 4 || C.seconds > 90) { warn++; console.log(`warn ${t.id}: loop is ${C.seconds.toFixed(1)} s`); }
}
const by = {}; EU_TRACKS.forEach((t) => (by[t.group] = (by[t.group] || 0) + 1));
console.log(`${EU_TRACKS.length} tracks (${Object.entries(by).map(([k, v]) => v + " " + k).join(", ")}): ${errors} errors, ${warn} warnings`);
process.exit(errors ? 1 : 0);
