/* ---------------- RPG layer: story engine (owner: Game Dev) ----------------
   Story flags and conditions, talk that changes with flags, one-time scenes, full-screen text cards (intro, end card),
   the hunter rank, and the music cues. Data shapes are documented at the top of rpg/maps.js.
   Like world.js, nothing here runs at load time, so the headless sims are unaffected. */

const rpgList = v => v == null ? [] : Array.isArray(v) ? v : [v];
function rpgFlags(){ return (RPG.save && RPG.save.flags) || {}; }
// A thing (NPC, sign, warp, chest, scene, talk variant) is active when all its `when` flags are set and none of its `unless` flags.
function rpgOk(o){ if (!o) return true; const f = rpgFlags(); return rpgList(o.when).every(k=>f[k]) && !rpgList(o.unless).some(k=>f[k]); }
// A text spec is "key", { text, sets, ... }, or a list of those where the first one whose conditions pass wins.
function rpgPickLine(spec){
  if (spec == null) return null;
  if (typeof spec === "string") return { text:spec };
  if (Array.isArray(spec)){ for (const e of spec){ const x = typeof e === "string" ? { text:e } : e; if (rpgOk(x)) return x; } return null; }
  return rpgOk(spec) ? spec : null;
}
// Every text key a spec can show (for smoke.js checks).
function rpgSpecKeys(spec){ return rpgList(spec).flatMap(e => typeof e === "string" ? [e] : e && e.text ? [e.text] : []); }

/* ---- Rank: the first rank whose flag is set, else the starting rank ---- */
function rpgRank(){ const f = rpgFlags(); for (const r of RPG_STORY.ranks || []) if (f[r.flag]) return r.name; return RPG_STORY.firstRank || ""; }
function rpgSetFlag(k){
  const s = RPG.save; if (!k || !s || s.flags[k]) return;
  const before = rpgRank(); s.flags[k] = true;
  const after = rpgRank(); if (after !== before){ rpgSting(RPG_STORY.rankStinger); RPG.toast = `Promoted to ${after}.`; }
}

/* ---- Playing a line: a cue, the dialogue, then its flags, an optional end card, then whatever comes next ---- */
function rpgPlay(x, then){
  if (!x){ then && then(); return; }
  if (x.stinger) rpgSting(x.stinger);
  if (x.music){ RPG.cue = x.music; rpgMusic(x.music); }
  const done = () => {
    rpgList(x.sets).forEach(rpgSetFlag);
    if (x.music){ RPG.cue = null; }
    rpgStore();
    if (x.end){ rpgCard(x.end, () => { render(); then && then(); }); return; }
    render(); then && then();
  };
  if (x.text) rpgSay(x.text, done); else done();
}

/* ---- Full-screen text cards: the cold open before the first map, the end card ---- */
function rpgCard(key, then){ RPG.card = { lines: rpgText(key), i:0, then }; rpgUI(); }
function rpgCardNext(){
  const c = RPG.card; if (!c) return;
  c.i++; if (c.i >= c.lines.length){ RPG.card = null; rpgUI(); c.then && c.then(); } else rpgUI();
}
function rpgCardHTML(){
  const c = RPG.card; if (!c) return "";
  const line = c.lines[c.i] || "", k = line.indexOf(": "), who = k>0 && k<24 ? line.slice(0,k) : "", txt = who ? line.slice(k+2) : line;
  return `<div class="rpg-card" data-rpgnext role="dialog" aria-live="polite"><div class="rc-in">${who ? `<b>${esc(who)}</b>` : ""}<p>${esc(txt)}</p></div>
    <span class="rc-hint">Enter, Space or tap to continue</span>${c.skip ? `<button class="btn rc-skip" data-btn="rpg-skip">Skip</button>` : ""}</div>`;
}

/* ---- One-time scenes: on entering a map, or on stepping onto a tile or into an area ---- */
function rpgSceneHere(m, onEnter){
  const s = RPG.save, f = rpgFlags();
  return (m.scenes || []).find(sc => {
    if (!sc.repeat && f["scene_"+sc.id]) return false;
    if (!rpgOk(sc)) return false;
    if (sc.at) return !onEnter && sc.at[0]===s.x && sc.at[1]===s.y;
    if (sc.area){ const [x0,y0,x1,y1] = sc.area; return !onEnter && s.x>=x0 && s.x<=x1 && s.y>=y0 && s.y<=y1; }
    return !!onEnter;
  });
}
function rpgRunScene(sc){
  RPG.held = [];
  rpgPlay({ ...sc, sets:[...rpgList(sc.sets), ...(sc.repeat ? [] : ["scene_"+sc.id])] });
}
function rpgCheckScenes(onEnter){ const sc = rpgSceneHere(rpgMap(), onEnter); if (sc){ rpgRunScene(sc); return true; } return false; }

/* ---- Music (music/player.js, loaded in its own script block; absent in headless sims) ---- */
const rpgHasMusic = () => typeof Music !== "undefined";
function rpgMusic(id){ if (!id || !rpgHasMusic() || !rpgSoundOn()) return; try { Music.play(id); } catch(e){} }
function rpgSting(id){ if (!id || !rpgHasMusic() || !rpgSoundOn()) return; try { Music.stinger(id); } catch(e){} }
function rpgSoundOn(){ try { return localStorage.getItem("eu.sound") !== "off"; } catch(e){ return true; } }
function rpgToggleSound(){
  const on = !rpgSoundOn(); try { localStorage.setItem("eu.sound", on ? "on" : "off"); } catch(e){}
  if (rpgHasMusic()){ try { Music.setVolume(on ? 0.8 : 0); if (on) Music.unlock(); else Music.stop(); } catch(e){} }
  render();
}
// Battle intensity: 1 - (lower life / its starting life), +0.15 on a Manifest turn, 1 with lethal on board, boss phase floors.
function rpgBattleMusic(){
  if (!RPG.battle || !g || !rpgHasMusic() || !rpgSoundOn()) return;
  const lows = g.P.map(p => Math.max(0, p.life) / Math.max(1, p.maxLife)), low = Math.min(...lows);
  let x = 1 - low;
  if (g.manifestTurn === g.turnNo) x += 0.15;
  const a = g.P[g.active], o = g.P[1 - g.active];
  if (!g.over && a.board.filter(canAttack).reduce((s,c)=>s+atkOf(c),0) >= o.life) x = 1;
  const boss = g.P[1].boss ? [0.2, 0.5, 0.8][Math.min(2, g.P[1].phase - 1)] : 0;
  try { Music.setIntensity(Math.max(boss, Math.min(1, x))); } catch(e){}
}
function onManifestCast(p, m){ if (!RPG.battle || !g) return; g.manifestTurn = g.turnNo; rpgSting("sting-manifest"); }
function onBossPhase(p){ if (!RPG.battle) return; rpgSting("sting-phase"); }
