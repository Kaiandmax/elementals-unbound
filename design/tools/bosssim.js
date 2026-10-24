// Boss-fight prototypes (TCG Design). Plays a player deck against a boss deck with optional boss rules,
// on an in-memory patched copy of tools/engine.js (nothing on disk changes), and reports fight length and win rate.
//
//   bash tools/mk.sh
//   node design/tools/bosssim.js                 # env: N games per config (default 120), LV="3,3" (player,boss AI),
//                                                #      P=player deck group, B=boss deck group, CFG=comma list of config names
//
// Boss rules prototyped (all on the boss's side, seat 1):
//   life    extra life for the boss
//   bars    extra life bars: when the boss drops to 0, it refills to the next bar ("phases")
//   clear   on a phase break, the boss's creatures leave play (a fresh phase, a breather for the player)
//   cap     the boss loses at most this much life per turn ("Ward of the Crown")
//   pLife   extra life for the player in boss fights
//   eMod    Energy per turn added to the boss's 3 (negative = a slower boss)
//   eByPhase  boss Energy modifier per phase, e.g. [-1, 0, 1]: a boss that wakes up as it breaks
//   breakHeal  on each phase break the player heals this much and draws a card
"use strict";
const fs = require("fs"), path = require("path");
let src = fs.readFileSync(path.join(__dirname, "../../tools/engine.js"), "utf8");
function patch(find, add, after = true){
  if (!src.includes(find)) throw new Error("bosssim: engine changed, can't find: " + find);
  src = src.replace(find, after ? find + add : add + find);
}
// Set up boss rules right after the players are made.
patch("  g.P.forEach(p=>drawN(p,5));", `
  if (globalThis.__bossSetup) __bossSetup(g);`, false);
// Phase break: instead of losing, the boss refills to its next bar.
patch("function checkWin(){\n  const [a,b] = g.P;", `
  for (const q of g.P) if (q.life<=0 && q.bars && (q.phase||1) <= q.bars.length){
    q.life = q.maxLife = q.bars[(q.phase||1) - 1]; q.phase = (q.phase||1) + 1;   // bars is never mutated: AI look-ahead clones share it
    if (q.clearOnBreak) q.board.length = 0;
    if (!g.sim) { log(q.name+" enters phase "+q.phase+"!", "big"); if (globalThis.__FMB) __FMB.phase(q, g); }
  }`);
// Damage cap per turn.
patch("function dmgPlayer(p, n, src){\n  if (n<=0) return;", `
  if (p.cap){ n = Math.min(n, p.cap - (p.took||0)); if (n<=0) return; p.took = (p.took||0) + n; }`);
patch("function startTurn(p){", `
  for (const q of g.P) q.took = 0;`);
// Boss Energy per turn.
patch("  p.energy += 3;", `
  p.energy += p.eByPhase ? p.eByPhase[Math.min((p.phase||1), p.eByPhase.length) - 1] : (p.eMod||0);`);
// Phase-break reward for the other side: heal and draw (a breather between phases).
patch("    if (q.clearOnBreak) q.board.length = 0;", `
    if (q.breakHeal){ const o = g.P[1-q.i]; o.life = Math.min(o.maxLife, o.life + q.breakHeal); drawN(o, 1); }`);
require("vm").runInThisContext(src, { filename: "engine-boss.js" });
const S = globalThis.__sim, DK = S.DECK_BY_ID, ids = Object.keys(DK);
const nEl = id => (S.CONFLUENCE[DK[id].el] || [1]).length;
const group = g => { const [n, t] = g.split(":"); return ids.filter(i => nEl(i) === +n && DK[i].tier === t); };

let CUR = null, PH = null;
globalThis.__FMB = { phase(q, g){ PH.push(g.turnNo); } };
globalThis.__bossSetup = g => {
  const b = g.P[1], p = g.P[0], c = CUR;
  if (c.life) { b.life += c.life; b.maxLife = b.life; }
  if (c.pLife) { p.life += c.pLife; p.maxLife = p.life; }
  if (c.bars) b.bars = [...c.bars];
  b.clearOnBreak = !!c.clear;
  if (c.cap) b.cap = c.cap;
  if (c.eMod) b.eMod = c.eMod;
  if (c.eByPhase) b.eByPhase = c.eByPhase;
  if (c.breakHeal) b.breakHeal = c.breakHeal;
};

const CONFIGS = {
  plain:          {},
  life10:         { life: 10 },
  bars2x10c:      { bars: [10], clear: true },
  bars3x8c:       { bars: [8, 8], clear: true },
  bars2x10c_p5:   { bars: [10], clear: true, pLife: 5 },
  bars3x8c_p5:    { bars: [8, 8], clear: true, pLife: 5 },
  bars3x8c_brk:   { bars: [8, 8], clear: true, breakHeal: 4 },
  bars3x8c_e2:    { bars: [8, 8], clear: true, eMod: -1 },
  cap4_l10_p5:    { life: 10, cap: 4, pLife: 5 },
  bars3x6c_brk:   { bars: [6, 6], clear: true, breakHeal: 3 },
  bars2x10c_e2:   { bars: [10], clear: true, eMod: -1 },
  bars3x8c_e2_brk:{ bars: [8, 8], clear: true, eMod: -1, breakHeal: 3 },
  esc3x8c:        { bars: [8, 8], clear: true, eByPhase: [-1, 0, 0] },
  esc3x8c_up:     { bars: [8, 8], clear: true, eByPhase: [-1, 0, 1] },
  esc3x6c:        { bars: [6, 6], clear: true, eByPhase: [-1, 0, 0] },
  esc2x8c:        { bars: [8], clear: true, eByPhase: [-1, 0] },
  esc2x10c:       { bars: [10], clear: true, eByPhase: [-1, 0] },
};

(async () => {
  const N = +(process.env.N || 120), LV = (process.env.LV || "3,3").split(",").map(Number);
  const P = group(process.env.P || "1:common"), B = group(process.env.B || "1:uncommon");
  const names = process.env.CFG ? process.env.CFG.split(",") : Object.keys(CONFIGS);
  const out = {};
  console.log(`player ${process.env.P || "1:common"} (L${LV[0]}) vs boss ${process.env.B || "1:uncommon"} (L${LV[1]}), ${N} games per config`);
  console.log("config          player win%  rounds  rounds(p25-p75)  over by r4  6-7 rounds  boss life left when player loses  phases reached");
  for (const name of names){
    CUR = CONFIGS[name];
    const R = [];
    for (let k = 0; k < N; k++){
      const a = P[(k * 7) % P.length], b = B[(k * 13 + 3) % B.length];
      PH = [];
      // Player goes first in half the games: headless seat 0 always starts, so swap the boss into seat 0 by
      // mirroring is not possible with seat-based rules; instead the player always starts (bosses act second).
      const res = await S.newGame(a, b, 15, LV);
      const g = S.getG();
      R.push({ win: res === "you", rounds: g.turnNo / 2, bossLeft: res === "enemy" ? g.P[1].life + (g.P[1].bars || []).slice((g.P[1].phase || 1) - 1).reduce((s, x) => s + x, 0) : 0, phases: 1 + PH.length });
    }
    const rs = R.map(r => r.rounds).sort((x, y) => x - y), q = f => rs[Math.floor(f * (rs.length - 1))];
    const lost = R.filter(r => !r.win);
    const o = {
      win: +(100 * R.filter(r => r.win).length / N).toFixed(1),
      rounds: +(rs.reduce((s, x) => s + x, 0) / N).toFixed(2), p25: q(0.25), p75: q(0.75),
      under4: +(100 * R.filter(r => r.rounds < 4).length / N).toFixed(1),
      in6to7: +(100 * R.filter(r => r.rounds >= 5.5 && r.rounds <= 7.5).length / N).toFixed(1),
      bossLeft: lost.length ? +(lost.reduce((s, r) => s + r.bossLeft, 0) / lost.length).toFixed(1) : 0,
      phases: +(R.reduce((s, r) => s + r.phases, 0) / N).toFixed(2),
    };
    out[name] = o;
    console.log(name.padEnd(15), String(o.win).padStart(10), String(o.rounds).padStart(7), `${o.p25}-${o.p75}`.padStart(16), String(o.under4).padStart(11), String(o.in6to7).padStart(11), String(o.bossLeft).padStart(33), String(o.phases).padStart(15));
  }
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify(out, null, 1));
})();
