// CI smoke test: builds must load, every deck must be legal, and AI-vs-AI games must finish.
// Usage: bash tools/mk.sh && node tools/smoke.js   (env N = games, default 60)
require("./engine.js"); const S = globalThis.__sim;
const decks = Object.values(S.DECK_BY_ID); const N = +(process.env.N || 60);
let bad = 0;
// RPG data: maps are rectangles of known tiles, every reference points at something that exists, and every walkable tile is reachable.
{ const M = S.RPG_MAPS, err = (m, t) => { console.error(`rpg ${m}: ${t}`); bad++; };
  // Things with when/unless come and go with the story, so only unconditional ones count as permanent walls here.
  const fixed = o => o.when == null && o.unless == null;
  const walk = (m, x, y) => !!S.RPG_TILE[(m.rows[y]||"")[x]] && ![...(m.npcs||[]), ...(m.chests||[]), ...(m.signs||[])].some(o => fixed(o) && o.x===x && o.y===y);
  const keys = (where, spec) => { for (const k of S.rpgSpecKeys(spec)) if (!S.RPG_TEXT[k]) err(where, `text '${k}' missing`); };
  const ST = S.RPG_STORY; keys("story", [ST.intro, ST.pickPrompt, ST.startText].filter(Boolean));
  const st = S.RPG_START; if (!M[st.map] || !walk(M[st.map], st.x, st.y)) err("start", "start position is not walkable");
  for (const [id, m] of Object.entries(M)) {
    const w = m.rows[0].length;
    m.rows.forEach((r, y) => { if (r.length !== w) err(id, `row ${y} is ${r.length} wide, expected ${w}`); for (const ch of r) if (!(ch in S.RPG_TILE)) err(id, `unknown tile '${ch}' in row ${y}`); });
    for (const o of m.warps||[]) { if (!M[o.to]) err(id, `warp to missing map ${o.to}`); else if (!walk(M[o.to], o.tx, o.ty)) err(id, `warp lands on a solid tile ${o.to} ${o.tx},${o.ty}`); if (!S.RPG_TILE[m.rows[o.y][o.x]]) err(id, `warp at ${o.x},${o.y} is on a solid tile`); }
    for (const n of m.npcs||[]) { keys(`${id} npc ${n.id}`, n.talk); keys(`${id} npc ${n.id}`, n.after); if (n.trainer && !S.RPG_TRAINERS[n.trainer]) err(id, `npc ${n.id} trainer ${n.trainer} missing`); if (!S.rpgSpecKeys(n.talk).length) err(id, `npc ${n.id} has no talk`); }
    for (const sg of m.signs||[]) { keys(`${id} sign`, sg.text); if (!S.rpgSpecKeys(sg.text).length) err(id, `sign at ${sg.x},${sg.y} has no text`); }
    for (const c of m.chests||[]) { if (![].concat(c.card).some(k => S.LIB[k])) err(id, `chest ${c.id} card ${c.card} missing`); keys(`${id} chest ${c.id}`, c.text && { text:c.text }); }
    for (const sc of m.scenes||[]) { keys(`${id} scene ${sc.id}`, sc.text); if (sc.end) keys(`${id} scene ${sc.id}`, sc.end); if (sc.at && !walk(m, sc.at[0], sc.at[1])) err(id, `scene ${sc.id} is on a solid tile`); }
    for (const gt of typeof m.grass === "string" ? [m.grass] : (m.grass||[]).map(e => e.table)) if (!S.RPG_ENCOUNTERS[gt]) err(id, `encounter table ${gt} missing`);
    if (m.lost) keys(id, m.lost);
    if (Array.isArray(m.heal) && !walk(m, m.heal[0], m.heal[1])) err(id, "heal point is not walkable");
    if (m.heal && !Array.isArray(m.heal) && (!M[m.heal.map] || !walk(M[m.heal.map], m.heal.x, m.heal.y))) err(id, "heal point is not walkable");
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
  // Drops: odds sum to 1, never include a Manifest, and rarer cards are never likelier than commoner ones in the same deck.
  const RANK = { s:0, c:0, u:1, r:2 };
  for (const dk of decks) { const o = S.rpgDropOdds(dk.id, []); if (!o.length) continue; const sum = o.reduce((a, x) => a + x.p, 0);
    if (Math.abs(sum - 1) > 1e-9) err("drops", `${dk.id} odds sum to ${sum}`);
    if (o.some(x => S.LIB[x.id].manifest)) err("drops", `${dk.id} can drop a Manifest`);
    for (const a of o) for (const b of o) if (RANK[a.r] > RANK[b.r] && a.p > b.p) err("drops", `${dk.id}: ${a.id} (${a.r}) likelier than ${b.id} (${b.r})`); }
  { const mix = S.rpgDropOdds("fire_starter", []); if (!mix.length) err("drops", "fire_starter has no drops"); }
  // Rolled rewards: card count within the configured range, all different, no Manifests, essence only from confluence decks.
  for (const dk of decks.filter((d, i) => i % 7 === 0)) for (const kind of Object.keys(S.RPG_DROPS.cards)) for (let t = 0; t < 30; t++) {
    const [lo, hi] = S.RPG_DROPS.cards[kind], r = S.rpgRollDrops(dk.id, kind, []);
    if (r.cards.length < Math.min(lo, S.rpgDropOdds(dk.id, []).length) || r.cards.length > hi) err("drops", `${dk.id} ${kind}: rolled ${r.cards.length} cards`);
    if (new Set(r.cards).size !== r.cards.length) err("drops", `${dk.id}: duplicate card in one win`);
    if (r.cards.some(id => S.LIB[id].manifest)) err("drops", `${dk.id}: rolled a Manifest`);
    if (!!r.essence !== !!S.CONFLUENCE[dk.el]) err("drops", `${dk.id}: essence ${r.essence ? "from a mono deck" : "missing"}`);
  }
}
for (const d of decks) if (!d.main || !d.main.length || !d.manifests || !d.manifests.length) { console.error("empty deck", d.id); bad++; }
(async () => {
  let done = 0, draws = 0;
  for (let i = 0; i < N; i++) {
    const a = decks[(i * 7) % decks.length], b = decks[(i * 13 + 5) % decks.length];
    try { const r = await S.newGame(a.id, b.id, 15, [3, 3]); if (r === "you" || r === "enemy") done++; else draws++; }
    catch (e) { console.error(`game ${a.id} vs ${b.id} threw:`, e && e.stack || e); bad++; }
  }
  // Boss fights (design/bosses.md): phases must happen and games must still finish.
  const BOSS = { bars:[8, 8], slowStart:true, clearOnBreak:true, breakHeal:3 }; let bossDone = 0, broke = 0; const BN = Math.max(6, N >> 2);
  for (let i = 0; i < BN; i++) {
    const a = decks[(i * 11) % decks.length], b = decks[(i * 5 + 2) % decks.length];
    try { const r = await S.newGame(a.id, b.id, 15, [3, 3], { boss: BOSS }); if (r === "you" || r === "enemy") bossDone++; if ((S.getG().P[1].phase || 1) > 1) broke++; }
    catch (e) { console.error(`boss game ${a.id} vs ${b.id} threw:`, e && e.stack || e); bad++; }
  }
  if (bossDone < BN * 0.9) { console.error(`boss games: only ${bossDone}/${BN} decided`); bad++; }
  if (!broke) { console.error("boss games: no phase break ever happened"); bad++; }
  console.log(`${decks.length} decks, ${N} games: ${done} decided, ${draws} undecided, ${bad} errors; boss games ${bossDone}/${BN} decided, ${broke} reached phase 2+`);
  if (bad || draws > N * 0.1) process.exit(1);
})();
