// CI smoke test: builds must load, every deck must be legal, and AI-vs-AI games must finish.
// Usage: bash tools/mk.sh && node tools/smoke.js   (env N = games, default 60)
require("./engine.js"); const S = globalThis.__sim;
const decks = Object.values(S.DECK_BY_ID); const N = +(process.env.N || 60);
let bad = 0;
// RPG data: maps are rectangles of known tiles, every reference points at something that exists, and every walkable tile is reachable.
{ const M = S.RPG_MAPS, err = (m, t) => { console.error(`rpg ${m}: ${t}`); bad++; };
  const walk = (m, x, y) => !!S.RPG_TILE[(m.rows[y]||"")[x]] && ![...(m.npcs||[]), ...(m.chests||[]), ...(m.signs||[])].some(o => o.x===x && o.y===y);
  const st = S.RPG_START; if (!M[st.map] || !walk(M[st.map], st.x, st.y)) err("start", "start position is not walkable");
  for (const [id, m] of Object.entries(M)) {
    const w = m.rows[0].length;
    m.rows.forEach((r, y) => { if (r.length !== w) err(id, `row ${y} is ${r.length} wide, expected ${w}`); for (const ch of r) if (!(ch in S.RPG_TILE)) err(id, `unknown tile '${ch}' in row ${y}`); });
    for (const o of m.warps||[]) { if (!M[o.to]) err(id, `warp to missing map ${o.to}`); else if (!walk(M[o.to], o.tx, o.ty)) err(id, `warp lands on a solid tile ${o.to} ${o.tx},${o.ty}`); if (!S.RPG_TILE[m.rows[o.y][o.x]]) err(id, `warp at ${o.x},${o.y} is on a solid tile`); }
    for (const n of m.npcs||[]) { if (!S.RPG_TEXT[n.talk]) err(id, `npc ${n.id} talk '${n.talk}' has no text`); if (n.after && !S.RPG_TEXT[n.after]) err(id, `npc ${n.id} after '${n.after}' has no text`); if (n.trainer && !S.RPG_TRAINERS[n.trainer]) err(id, `npc ${n.id} trainer ${n.trainer} missing`); }
    for (const sg of m.signs||[]) if (!S.RPG_TEXT[sg.text]) err(id, `sign text '${sg.text}' missing`);
    for (const c of m.chests||[]) if (!S.LIB[c.card]) err(id, `chest ${c.id} card ${c.card} missing`);
    if (m.grass && !S.RPG_ENCOUNTERS[m.grass]) err(id, `encounter table ${m.grass} missing`);
    if (m.heal && !walk(m, m.heal[0], m.heal[1])) err(id, "heal point is not walkable");
    // flood fill from every warp landing / start, then every walkable tile should have been reached
    const seen = new Set(), q = [];
    if (st.map === id) q.push([st.x, st.y]);
    for (const m2 of Object.values(M)) for (const o of m2.warps||[]) if (o.to === id) q.push([o.tx, o.ty]);
    while (q.length) { const [x, y] = q.pop(), k = x + "," + y; if (seen.has(k) || !walk(m, x, y)) continue; seen.add(k); q.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]); }
    let unreached = 0; m.rows.forEach((r, y) => [...r].forEach((ch, x) => { if (walk(m, x, y) && !seen.has(x+","+y)) unreached++; }));
    if (unreached) err(id, `${unreached} walkable tiles can't be reached`);
  }
  for (const [id, t] of Object.entries(S.RPG_ENCOUNTERS)) for (const e of t.list) if (!S.DECK_BY_ID[e.deck]) err("encounters", `${id}: deck ${e.deck} missing`);
  for (const [id, t] of Object.entries(S.RPG_TRAINERS)) if (!S.DECK_BY_ID[t.deck]) err("trainers", `${id}: deck ${t.deck} missing`);
}
for (const d of decks) if (!d.main || !d.main.length || !d.manifests || !d.manifests.length) { console.error("empty deck", d.id); bad++; }
(async () => {
  let done = 0, draws = 0;
  for (let i = 0; i < N; i++) {
    const a = decks[(i * 7) % decks.length], b = decks[(i * 13 + 5) % decks.length];
    try { const r = await S.newGame(a.id, b.id, 15, [3, 3]); if (r === "you" || r === "enemy") done++; else draws++; }
    catch (e) { console.error(`game ${a.id} vs ${b.id} threw:`, e && e.stack || e); bad++; }
  }
  console.log(`${decks.length} decks, ${N} games: ${done} decided, ${draws} undecided, ${bad} errors`);
  if (bad || draws > N * 0.1) process.exit(1);
})();
