// CI smoke test: builds must load, every deck must be legal, and AI-vs-AI games must finish.
// Usage: bash tools/mk.sh && node tools/smoke.js   (env N = games, default 60)
require("./engine.js"); const S = globalThis.__sim;
const decks = Object.values(S.DECK_BY_ID); const N = +(process.env.N || 60);
let bad = 0;
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
