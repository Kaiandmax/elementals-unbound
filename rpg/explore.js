/* ---------------- RPG layer: exploring (owner: Game Dev) ----------------
   Roaming monsters, named areas (place name, music, where you wake after a loss), the region map with fog,
   the quest journal and the objective pointer. Data: map.wilds, map.areas, map.landmarks, RPG_QUESTS. */

/* ---- Named areas: { rect:[x0,y0,x1,y1], name, music?, heal?:{map,x,y}, lost?:"key" }, first match wins ---- */
function rpgAreaAt(m, x, y){ return (m.areas || []).find(a => { const [x0,y0,x1,y1] = a.rect; return x>=x0 && x<=x1 && y>=y0 && y<=y1; }) || null; }
function rpgHere(){ const s = RPG.save, m = rpgMap(); return { m, a: rpgAreaAt(m, s.x, s.y) }; }
function rpgPlaceName(){ const { m, a } = rpgHere(); return a && a.name ? a.name : m.name; }
function rpgMapMusic(){ const { m, a } = rpgHere(); return (a && a.music) || m.music; }
function rpgAreaCheck(){
  const { a } = rpgHere(), name = a ? a.name : null;
  if (name !== RPG.areaName){ const first = RPG.areaName !== undefined; RPG.areaName = name; if (first && name){ RPG.banner = { text:name, t:performance.now() }; } rpgMusic(RPG.cue || rpgMapMusic()); }
}

/* ---- Roaming monsters ----
   map.wilds: [{ area:[x0,y0,x1,y1], table, count, when?, unless? }]. They spawn when you enter the map, wander near
   home, chase you when you come close, and start a wild duel on contact. Beaten ones stay gone until you leave the map. */
const RPG_MOB_LOOK = { fire:"#e0663a", water:"#3f8fd6", earth:"#a07a45", wind:"#5fc7a9", lightning:"#e8cd47",
  volcano:"#d0552a", wildfire:"#f0a04b", plasma:"#ec6fb2", steam:"#a9c4d6", swamp:"#6f8a4a", ice:"#9fdcf2", storm:"#7b8cf0", sand:"#d8c08a", metal:"#a3acb9", tempest:"#a6e07a" };
const RPG_MOB_KINDS = ["beast", "bird", "blob", "beast", "golem"];
const rpgSafeAt = (m, x, y) => { const a = rpgAreaAt(m, x, y); return !!(a && a.safe); };
function rpgMobFree(m, x, y){ return RPG_TILE[rpgTile(m,x,y)] && !"=+b".includes(rpgTile(m,x,y)) && !rpgSafeAt(m,x,y) && !rpgThingAt(m,x,y) && !(m.warps||[]).some(w=>w.x===x&&w.y===y) && !RPG.mobs.some(o=>o.x===x&&o.y===y); }
// Roads and their verges stay clear of monsters at spawn time (travel on the road is safe and quick).
function rpgNearRoad(m, x, y, r){ for (let dy=-r; dy<=r; dy++) for (let dx=-r; dx<=r; dx++) if ("=+b".includes(rpgTile(m,x+dx,y+dy))) return true; return false; }
function rpgSpawnMobs(){
  const m = rpgMap(), s = RPG.save; RPG.mobs = []; RPG.mobGrace = performance.now() + 1500;
  let uid = 0;
  for (const sp of m.wilds || []){
    if (!rpgOk(sp)) continue;
    const tbl = sp.table ? RPG_ENCOUNTERS[sp.table] : { grace:3, list:null }; if (!tbl) continue;
    const [x0,y0,x1,y1] = sp.area || [0,0,m.rows[0].length-1,m.rows.length-1];
    for (let i = 0, tries = 0; i < (sp.count || 3) && tries < 200; tries++){
      const x = x0 + Math.floor(Math.random()*(x1-x0+1)), y = y0 + Math.floor(Math.random()*(y1-y0+1)), t = rpgTile(m,x,y);
      if (!rpgMobFree(m,x,y) || Math.abs(x-s.x)+Math.abs(y-s.y) < 8 || (sp.roster && rpgNearRoad(m, x, y, 2))) continue;
      const elite = !!sp.roster && Math.random() < (sp.elites == null ? RPG_ELITE_CHANCE : sp.elites);
      const e = sp.roster ? rpgRosterPick(sp.roster, elite ? rpgRankUp(sp.rank) : sp.rank) : rpgPick(tbl.list), dk = DECK_BY_ID[e.deck], el = dk ? dk.el : "earth";
      RPG.mobs.push({ id:++uid, x, y, hx:x, hy:y, e, tbl, el, elite, kind: RPG_MOB_KINDS[(x*7+y*3+uid) % RPG_MOB_KINDS.length], move:null, next: performance.now() + 400 + Math.random()*1200, chase:false, area:[x0,y0,x1,y1] });
      i++;
    }
  }
}
function rpgMobsUpdate(dt, now){
  const s = RPG.save, m = rpgMap();
  for (const o of RPG.mobs){
    if (o.move){ o.move.t += dt; if (o.move.t >= o.move.ms){ o.x = o.move.x; o.y = o.move.y; o.move = null; } else continue; }
    const dx = s.x - o.x, dy = s.y - o.y, dist = Math.abs(dx) + Math.abs(dy);
    if (dist <= 1 && now > RPG.mobGrace && !RPG.move && !rpgBusy()){ rpgMobFight(o); return; }
    o.chase = dist <= 5 && now > RPG.mobGrace;
    if (now < o.next || rpgBusy()) continue;
    let step = null;
    if (o.chase){
      if (o.elite && RPG.save && dist > 4){ o.next = now + 500; continue; }   // elites are slower to notice you: easier to slip past
      const opts = Math.abs(dx) >= Math.abs(dy) ? [[Math.sign(dx),0],[0,Math.sign(dy)||1],[0,-(Math.sign(dy)||1)]] : [[0,Math.sign(dy)],[Math.sign(dx)||1,0],[-(Math.sign(dx)||1),0]];
      step = opts.find(([ax,ay]) => (ax||ay) && !(o.x+ax===s.x && o.y+ay===s.y) && rpgMobFree(m, o.x+ax, o.y+ay));
      o.next = now + 300;
    } else {
      const d = [[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random()*4)], nx = o.x+d[0], ny = o.y+d[1];
      if (Math.abs(nx-o.hx) + Math.abs(ny-o.hy) <= 6 && rpgMobFree(m, nx, ny)) step = d;
      o.next = now + 700 + Math.random()*1500;
    }
    if (step){ o.dir = step[0] ? (step[0] > 0 ? "right" : "left") : (step[1] > 0 ? "down" : "up"); o.move = { x:o.x+step[0], y:o.y+step[1], fx:o.x, fy:o.y, t:0, ms: o.chase ? 260 : 420 }; }
  }
}
function rpgMobFight(o){
  RPG.held = []; RPG.mobFight = o;
  rpgFade(()=>rpgBattle({ kind:"wild", deck:o.e.deck, level:o.e.level, lifeMod:o.e.lifeMod||0, grace:o.tbl.grace, music:o.tbl.music || "battle-wild", mob:o.id,
    name:`${o.elite ? "Elite wild" : "Wild"} ${(ELS[(DECK_BY_ID[o.e.deck]||{}).el] || "").toLowerCase()} ${o.kind || "monster"}`.replace(/\s+/g," ") }), reduceMotion() ? 150 : 600);
}
function rpgMobAfter(b, res){
  if (!b || b.mob == null) return;
  if (res === "you") RPG.mobs = RPG.mobs.filter(o => o.id !== b.mob);
  RPG.mobGrace = performance.now() + 2500;
}
function rpgDrawMobs(c, P, now){
  for (const o of RPG.mobs){
    let x = o.x, y = o.y; if (o.move){ const k = Math.min(1, o.move.t/o.move.ms); x = o.move.fx + (o.move.x-o.move.fx)*k; y = o.move.fy + (o.move.y-o.move.fy)*k; }
    const [px, py] = P(x, y), col = RPG_MOB_LOOK[o.el] || "#888";
    if (o.elite){ c.save(); c.translate(px+8, py+14); c.scale(1.35, 1.35); c.translate(-px-8, -py-14); }
    rpgDrawBeast(c, px, py, { shirt:col, hair: o.elite ? "#ff5a3a" : "#fff3c4" }, o.kind === "golem" ? "golem" : o.kind, now);
    if (o.elite){ c.restore(); c.fillStyle = "#ff5a3a"; c.fillRect(px+6, py-9, 4, 2); c.fillRect(px+7, py-11, 2, 6); }
    if (o.kind === "bird"){ c.fillStyle = col; c.fillRect(px-1, py+5, 4, 2); c.fillRect(px+13, py+5, 4, 2); }
    if (o.chase){ c.fillStyle = "#ffd84a"; c.fillRect(px+7, py-6, 2, 4); c.fillRect(px+7, py-1, 2, 1); }
  }
}

/* ---- Fog: what you've seen of each map, kept in the save as a bitmap ---- */
function rpgSeenGrid(id){
  const m = RPG_MAPS[id], W = m.rows[0].length, H = m.rows.length, s = RPG.save; s.seen = s.seen || {};
  RPG.seenCache = RPG.seenCache || {};
  if (!RPG.seenCache[id]){ const a = new Uint8Array(Math.ceil(W*H/8)); const b64 = s.seen[id];
    if (b64){ try { const bin = atob(b64); for (let i = 0; i < Math.min(bin.length, a.length); i++) a[i] = bin.charCodeAt(i); } catch(e){} }
    RPG.seenCache[id] = a; }
  return RPG.seenCache[id];
}
function rpgReveal(){
  const s = RPG.save, m = rpgMap(), W = m.rows[0].length, H = m.rows.length, a = rpgSeenGrid(s.map), r = m.generated ? 9 : 30;
  for (let y = Math.max(0, s.y-r); y <= Math.min(H-1, s.y+r); y++) for (let x = Math.max(0, s.x-r); x <= Math.min(W-1, s.x+r); x++){
    if ((x-s.x)*(x-s.x) + (y-s.y)*(y-s.y) > r*r) continue; const i = y*W + x; a[i>>3] |= 1 << (i&7); }
  let bin = ""; for (let i = 0; i < a.length; i++) bin += String.fromCharCode(a[i]); s.seen[s.map] = btoa(bin);
}
function rpgIsSeen(id, x, y){ const m = RPG_MAPS[id], W = m.rows[0].length, a = rpgSeenGrid(id), i = y*W + x; return !!(a[i>>3] & (1 << (i&7))); }

/* ---- Quests: RPG_QUESTS = [{ id, title, kind:"main"|"side", start?:flag, steps:[{ done:flag, text, at:{map,x,y} }] }] ---- */
function rpgQuestState(q){
  const f = rpgFlags(); if (q.start && !f[q.start]) return null;
  const step = q.steps.find(st => !f[st.done]);
  return { q, step, done: !step, n: q.steps.indexOf(step) };
}
function rpgQuests(){ return (typeof RPG_QUESTS === "undefined" ? [] : RPG_QUESTS).map(rpgQuestState).filter(Boolean); }
function rpgTracked(){ const all = rpgQuests().filter(x => !x.done); return all.find(x => x.q.id === RPG.save.track) || all.find(x => x.q.kind === "main") || all[0] || null; }
// The next step toward a target: on this map, the target itself; elsewhere, the warp that starts the shortest route there.
function rpgRouteTo(at){
  const s = RPG.save; if (!at) return null;
  if (at.map === s.map) return { x:at.x, y:at.y, map:at.map };
  const prev = { [s.map]: null }, q = [s.map];
  while (q.length){ const id = q.shift(), m = RPG_MAPS[id]; if (!m) continue;
    for (const w of m.warps || []){ if (!rpgOk(w) || prev[w.to] !== undefined) continue; prev[w.to] = { from:id, w }; if (w.to === at.map){ q.length = 0; break; } q.push(w.to); } }
  if (prev[at.map] === undefined) return null;
  let node = at.map, hop = null; while (prev[node] && prev[node].from !== s.map) node = prev[node].from; hop = prev[node];
  return hop ? { x:hop.w.x, y:hop.w.y, map:s.map, via:RPG_MAPS[hop.w.to] && RPG_MAPS[hop.w.to].name } : null;
}
function rpgObjectiveHTML(){
  const t = rpgTracked(); if (!t || !t.step) return "";
  const r = rpgRouteTo(t.step.at), s = RPG.save;
  let arrow = "", dist = "";
  if (r){ const dx = r.x - s.x, dy = r.y - s.y, d = Math.round(Math.hypot(dx, dy)); if (d > 0){ arrow = `<i class="obj-arrow" style="transform:rotate(${Math.atan2(dy, dx)}rad)" aria-hidden="true">➤</i>`; dist = ` · ${d} paces${r.via ? ` toward ${esc(r.via)}` : ""}`; } }
  return `<div class="rpg-obj" data-btn="rpg-journal" title="Open the journal (J)">${arrow}<span><b>${esc(t.q.title)}</b>${esc(t.step.text)}<small>${dist}</small></span></div>`;
}
function rpgJournalHTML(){
  const all = rpgQuests(), act = all.filter(x => !x.done), fin = all.filter(x => x.done), tr = rpgTracked();
  const item = x => `<li class="${x === tr || (tr && x.q.id === tr.q.id) ? "on" : ""}"><button class="jq" data-track="${esc(x.q.id)}"><b>${esc(x.q.title)}</b><span class="lbl">${x.q.kind === "main" ? "Main story" : x.q.kind === "side" ? "Optional" : "Contract"}</span></button>
    <ol>${x.q.steps.slice(0, x.done ? x.q.steps.length : x.n + 1).map((st, i) => `<li class="${i < (x.done ? 99 : x.n) ? "done" : ""}">${esc(st.text)}${i === x.n && st.at ? ` <span class="muted">· ${esc(RPG_MAPS[st.at.map] ? (rpgAreaAt(RPG_MAPS[st.at.map], st.at.x, st.at.y) || RPG_MAPS[st.at.map]).name : "")}</span>` : ""}</li>`).join("")}</ol></li>`;
  return `<div class="rpg-panel" role="dialog" aria-label="Journal"><div class="rp-head"><h2>Journal</h2><button class="btn" data-btn="rpg-close">Close (J)</button></div>
    <div class="rp-body"><h3 class="lbl">Active</h3><ul class="jlist">${act.map(item).join("") || "<li class='muted'>Nothing on your list.</li>"}</ul>
    ${fin.length ? `<h3 class="lbl">Done</h3><ul class="jlist done">${fin.map(item).join("")}</ul>` : ""}<p class="muted">Pick a quest to follow it; the pointer at the top of the map leads the way.</p></div></div>`;
}

/* ---- The region map (M): the whole region with fog, landmarks, you, and your objective ---- */
const RPG_MAP_COL = { "L":"#d04a1a", "B":"#3a2f2c", "N":"#e3e9f0", "G":"#8d8276", "Z":"#7fb6e8", "K":"#eef5fd", "k":"#9a8f7a", "C":"#e0725a", "c":"#4f94b2", "X":"#7a5634", "h":"#7a5a8a", "I":"#a0a096", "n":"#a33a2a", "U":"#7a7a72", ".":"#4c8a3f", ",":"#3a6f30", "f":"#5b9446", "=":"#c2a26a", "+":"#a9a49a", "b":"#8a6a45", "#":"#24502a", "P":"#1d4a35", "Q":"#3f7a2a", "T":"#3a2a20",
  "o":"#7a7a72", "^":"#6b6257", "|":"#6d5a3a", "~":"#2f6ea8", "w":"#4f8fbf", ":":"#d6c38a", "a":"#5b4a45", "A":"#6a3a2a", "F":"#9a8a3a",
  "R":"#9a4434", "H":"#ddcfae", "D":"#6d4a2c", "s":"#4c8a3f", "_":"#9a7650", "W":"#5d4c3c", "t":"#6a4a2c", ">":"#a34a3a", "v":"#4a4f57", "V":"#2a2d33", "S":"#8a8f97" };
function rpgRegionOf(id){ const m = RPG_MAPS[id]; return m && m.parent ? m.parent : id; }
function rpgMapPanelHTML(){
  return `<div class="rpg-panel" role="dialog" aria-label="Map"><div class="rp-head"><h2 id="rpgmaptitle"></h2><button class="btn" data-btn="rpg-close">Close (M)</button></div>
    <div class="rp-body rp-map"><canvas id="rpgmapc"></canvas><p class="muted">You: the blinking dot. Gold diamond: your objective. Places you haven't explored stay dark.</p></div></div>`;
}
function rpgDrawRegionMap(){
  const cv = document.getElementById("rpgmapc"); if (!cv) return;
  const s = RPG.save, id = rpgRegionOf(s.map), m = RPG_MAPS[id], W = m.rows[0].length, H = m.rows.length;
  const pan = cv.closest(".rpg-panel"), box = pan.getBoundingClientRect(), head = pan.querySelector(".rp-head").getBoundingClientRect().height;
  const k = Math.max(2, Math.floor(Math.min((box.width - 40) / W, (box.height - head - 64) / H)));
  cv.width = W*k; cv.height = H*k; const c = cv.getContext("2d");
  document.getElementById("rpgmaptitle").textContent = m.name;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
    c.fillStyle = rpgIsSeen(id, x, y) ? (RPG_MAP_COL[m.rows[y][x]] || "#333") : "#0d0f13"; c.fillRect(x*k, y*k, k, k);
  }
  c.font = `bold ${Math.max(10, k*4)}px system-ui, sans-serif`; c.textAlign = "center";
  for (const a of m.areas || []){ if (!a.label) continue; const [x0,y0,x1,y1] = a.rect, cx = (x0+x1)/2, cy = (y0+y1)/2; if (!rpgIsSeen(id, Math.round(cx), Math.round(cy))) continue;
    c.fillStyle = "rgba(0,0,0,.6)"; c.fillText(a.name, cx*k+1, cy*k+1); c.fillStyle = "#f3ead2"; c.fillText(a.name, cx*k, cy*k); }
  // you (or the door you're behind, if indoors)
  let px = s.x, py = s.y;
  if (id !== s.map){ const back = (RPG_MAPS[s.map].warps || []).find(w => w.to === id); if (back){ px = back.tx; py = back.ty; } }
  c.fillStyle = "#fff"; c.beginPath(); c.arc(px*k + k/2, py*k + k/2, Math.max(3, k*1.4), 0, Math.PI*2); c.fill();
  c.fillStyle = "#e8665a"; c.beginPath(); c.arc(px*k + k/2, py*k + k/2, Math.max(2, k), 0, Math.PI*2); c.fill();
  const t = rpgTracked();
  if (t && t.step && t.step.at){ let at = t.step.at;
    if (rpgRegionOf(at.map) === id && at.map !== id){ const door = (m.warps || []).find(w => w.to === at.map) || (RPG_MAPS[at.map].warps || []).map(w => w.to === id ? { x:w.tx, y:w.ty } : null).find(Boolean); if (door) at = { map:id, x:door.x, y:door.y }; }
    if (at.map === id){ const x = at.x*k + k/2, y = at.y*k + k/2, r = Math.max(5, k*2); c.fillStyle = "#ffd84a"; c.strokeStyle = "#1a1408"; c.lineWidth = 2;
      c.beginPath(); c.moveTo(x, y-r); c.lineTo(x+r, y); c.lineTo(x, y+r); c.lineTo(x-r, y); c.closePath(); c.fill(); c.stroke(); } }
}

/* Story's lines are loaded after the RPG files (build.py), so the world is built at the very end of the game script. */
