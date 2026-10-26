// Fun metrics for the card battler (TCG Design). Plays AI-vs-AI games on an instrumented copy of
// tools/engine.js and reports how games feel, not whether they are fair (that's Balance's sims).
//
//   bash tools/mk.sh                       # build tools/engine.js first
//   node design/tools/funmetrics.js        # env: SET=mono|dual|triple|starter|rpg|all  N=games per set  LV=AI level  OUT=file.json
//
// Seat 0 always goes first in headless games, so each pairing is played both ways round.
// The engine file is read and patched in memory; nothing in tools/ or src.html changes.
"use strict";
const fs = require("fs"), path = require("path");
let src = fs.readFileSync(path.join(__dirname, "../../tools/engine.js"), "utf8");
function patch(find, add, after = true){
  if (!src.includes(find)) throw new Error("funmetrics: engine changed, can't find: " + find);
  src = src.replace(find, after ? find + add : add + find);
}
// After the draw step of each turn: what the active player could do.
patch("  if (g.turnNo>1) drawN(p,1);\n  checkWin();", `
  if (globalThis.__FM && !g.sim){ const seen=new Set(), costs=[];
    for (const d of p.hand) if (!d.counter && canPlayNow(p,d,"main") && !seen.has(d.id)){ seen.add(d.id); costs.push(costOf(d,p)); }
    const man = p.manifests.filter(m=>canCastManifest(p,m)).length;
    __FM.turn(p, g, { cards: seen.size, man, maxCost: costs.length ? Math.max(...costs) : -1, canAtk: p.board.filter(c=>!c.sick || hasKw(c,"haste")).length }); }`);
patch("async function castCard(p, hi, t, oc){\n  const d = p.hand[hi];", `
  if (globalThis.__FM && !g.sim) __FM.card(p, g, d, costOf(d,p));`);
patch("async function castManifest(p, mi, t){\n  const m = p.manifests[mi];", `
  if (globalThis.__FM && !g.sim) __FM.man(p, g, m);`);
patch("async function runCombat(ap, attackers){\n  if (!attackers.length) return;", `
  if (globalThis.__FM && !g.sim) __FM.attack(ap, g, attackers.length);`);
patch("  p.life -= n;", `
  if (globalThis.__FM && !g.sim) __FM.face(p, g, n);`);
// KEEPDMG=1: prototype of "damage stays on creatures" (designer, 2026-10-26). Damage isn't cleared at end of turn;
// when temporary health ends, a damaged creature keeps at least 1 health.
if (process.env.KEEPDMG){
  const old = "for (const q of g.P) for (const c of q.board){ c.dmg=0; c.tAtk=0; c.tHp=0;";
  if (!src.includes(old)) throw new Error("funmetrics: engine changed, can't find the end-of-turn reset");
  src = src.replace(old, "for (const q of g.P) for (const c of q.board){ c.tAtk=0; c.tHp=0; c.dmg = Math.min(c.dmg, Math.max(0, hpOf(c) - 1));");
}
require("vm").runInThisContext(src, { filename: "engine-fm.js" });
const S = globalThis.__sim;

/* ---- per-game recorder ---- */
let G = null;
globalThis.__FM = {
  turn(p, g, o){ const t = { n: g.turnNo, who: p.i, ...o, first: null, attacks: 0, face: 0, cast: 0 };
    G.turns.push(t); G.cur = t; G.life.push([g.P[0].life, g.P[1].life]); },
  card(p, g, d, cost){ const t = G.cur; if (!t || t.who !== p.i) return; t.cast++; if (t.first === null) t.first = cost; },
  man(p, g, m){ G.mans.push({ who: p.i, turn: g.turnNo, id: m.id }); const t = G.cur; if (t && t.who === p.i && t.first === null) t.first = "M"; },
  attack(p, g, n){ const t = G.cur; if (t && t.who === p.i) t.attacks += n; },
  face(p, g, n){ const t = G.cur; if (t && t.who !== p.i) t.face += n; G.faceBy[1 - p.i] += n; },
};

const DK = S.DECK_BY_ID, ids = Object.keys(DK);
const nEl = id => (S.CONFLUENCE[DK[id].el] || [1]).length;
const groups = {
  starter: ids.filter(i => DK[i].tier === "starter"),
  mono: ids.filter(i => nEl(i) === 1 && DK[i].tier !== "starter"),
  dual: ids.filter(i => nEl(i) === 2),
  triple: ids.filter(i => nEl(i) === 3),
};

async function play(a, b, lv, lifeB = 15){
  G = { turns: [], life: [], mans: [], faceBy: [0, 0], cur: null };
  const res = await S.newGame(a, b, lifeB, lv);
  const g = S.getG();
  G.life.push([g.P[0].life, g.P[1].life]);
  return { a, b, res, g, rec: G, start: [g.P[0].maxLife, g.P[1].maxLife] };
}

function summarize(games){
  const n = games.length, out = {};
  const avg = a => a.reduce((s, x) => s + x, 0) / (a.length || 1);
  const pct = x => Math.round(1000 * x / (n || 1)) / 10;
  const turns = games.map(x => x.g.turnNo);
  out.games = n;
  out.halfTurns = { mean: +avg(turns).toFixed(2), dist: turns.reduce((m, t) => (m[t] = (m[t] || 0) + 1, m), {}) };
  out.roundsMean = +(avg(turns) / 2).toFixed(2);
  out.over_by_turn4 = pct(turns.filter(t => t <= 4).length);   // each side had at most 2 turns
  let blow = 0, close = 0, comeback = 0, firstWins = 0, decided = 0, loserNoMan = 0, manDecides = 0, mansCast = 0, mansSeen = 0;
  let optTurns = 0, opt0 = 0, opt2 = 0, optSum = 0, notObvious = 0, choiceTurns = 0, stall = 0, stallRounds = 0, rounds = 0;
  for (const x of games){
    const { res, g, rec, start } = x;
    if (res !== "you" && res !== "enemy") continue;
    decided++;
    const w = res === "you" ? 0 : 1, l = 1 - w;
    if (w === 0) firstWins++;
    const minW = Math.min(...rec.life.map(L => L[w])) / start[w];
    if (minW >= 0.6) blow++;
    if (minW <= 0.35) close++;
    if (rec.life.some(L => L[w] / start[w] < 0.5 && L[w] / start[w] + 0.2 <= L[l] / start[l])) comeback++;   // winner was under half life and clearly behind
    const mW = rec.mans.filter(m => m.who === w), mL = rec.mans.filter(m => m.who === l);
    if (!mL.length) loserNoMan++;
    // A Manifest "decides" a game when the winner cast one in the last two half-turns.
    if (mW.some(m => m.turn >= g.turnNo - 1)) manDecides++;
    mansCast += rec.mans.length; mansSeen += DK[x.a].manifests.length + DK[x.b].manifests.length;
    for (const t of rec.turns){
      optTurns++; const o = t.cards + t.man; optSum += o; if (o === 0) opt0++; if (o >= 2) opt2++;
      if (o >= 2 && t.first !== null){ choiceTurns++; if (t.first === "M" ? t.man > 0 && t.maxCost >= 0 : t.first < t.maxCost) notObvious++; }
      if (t.canAtk > 0 && t.attacks === 0) stall++;
    }
    for (let i = 0; i + 1 < rec.turns.length; i += 2){ rounds++; if (rec.turns[i].face === 0 && rec.turns[i + 1].face === 0) stallRounds++; }
  }
  const pd = x => Math.round(1000 * x / (decided || 1)) / 10;
  Object.assign(out, {
    decided, firstPlayerWin: pd(firstWins),
    blowouts: pd(blow), closeGames: pd(close), comebacks: pd(comeback),
    loserCastNoManifest: pd(loserNoMan), manifestInFinalTurns: pd(manDecides),
    manifestCastRate: Math.round(1000 * mansCast / (mansSeen || 1)) / 10,
    optionsPerTurn: +(optSum / (optTurns || 1)).toFixed(2), turnsWithNoPlay: Math.round(1000 * opt0 / optTurns) / 10, turnsWith2plusOptions: Math.round(1000 * opt2 / optTurns) / 10,
    aiFirstPlayNotBiggest: Math.round(1000 * notObvious / (choiceTurns || 1)) / 10,
    turnsWithAttackerHeldBack: Math.round(1000 * stall / optTurns) / 10,
    roundsWithNoFaceDamage: Math.round(1000 * stallRounds / (rounds || 1)) / 10,
  });
  return out;
}

async function runSet(name, N, lv){
  const games = [];
  if (name === "rpg"){
    // Early-adventure duels: a Starter deck against wild Starter decks at -5 life, AI level 1 and 2 (rpg/encounters.js placeholders).
    const st = groups.starter;
    for (let k = 0; k < N; k++){ const a = st[k % st.length], b = st[(k * 3 + 1) % st.length]; games.push(await play(a, b, [3, 1 + (k % 2)], 10)); }
    return games;
  }
  const pool = groups[name];
  for (let k = 0; k < N; k += 2){
    const a = pool[(k * 7) % pool.length]; let b = pool[(k * 13 + 5) % pool.length]; if (b === a) b = pool[(k * 13 + 6) % pool.length];
    games.push(await play(a, b, [lv, lv]));
    games.push(await play(b, a, [lv, lv]));
  }
  return games;
}

(async () => {
  const sets = (process.env.SET || "all") === "all" ? ["starter", "mono", "dual", "triple", "rpg"] : process.env.SET.split(",");
  const N = +(process.env.N || 200), LV = +(process.env.LV || 3), report = { level: LV, N };
  const all = [];
  for (const s of sets){ const games = await runSet(s, N, LV); report[s] = summarize(games); if (s !== "rpg") all.push(...games); console.error(s, "done"); }
  if (all.length) report.allLadder = summarize(all);
  const txt = JSON.stringify(report, null, 1);
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, txt);
  console.log(txt);
})();
