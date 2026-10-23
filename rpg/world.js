/* ---------------- RPG layer: overworld (owner: Game Dev) ----------------
   A top-down tile map walked on a grid. Battles run on the existing engine through newGame().
   Everything that touches the page is inside functions that only run in the browser, so the
   headless sims (tools/engine.js) load this file without side effects. */
const RPG_T = 16, RPG_VW = 15, RPG_VH = 11, RPG_STEP_MS = 170, RPG_SAVE_KEY = "eu.save.v1";
const RPG_TILE = { ".":1, ",":1, "=":1, "f":1, "D":1, "_":1, ">":1, "s":0, "#":0, "~":0, "R":0, "H":0, "W":0, "t":0 };
const RPG_DIRS = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };
const RPG = { active:false, save:null, held:[], move:null, turnAt:0, dlg:null, reveal:null, fade:null, battle:null,
  canvas:null, ctx:null, raf:0, last:0, cam:null, grace:0, eraseArm:false, pad:{}, toast:null };

function rpgNewSave(el){
  return { v:1, starter:el, deck:el+"_starter", map:RPG_START.map, x:RPG_START.x, y:RPG_START.y, dir:RPG_START.dir,
    flags:{}, opened:{}, collection:[], wins:0, losses:0, steps:0, created:Date.now() };
}
function rpgValidSave(s){ return !!s && s.v===1 && RPG_MAPS[s.map] && typeof s.x==="number" && typeof s.y==="number" && typeof s.deck==="string"; }
function rpgLoad(){ try { const s = JSON.parse(localStorage.getItem(RPG_SAVE_KEY)); return rpgValidSave(s) ? s : null; } catch(e){ return null; } }
function rpgStore(){ if (!RPG.save) return; try { localStorage.setItem(RPG_SAVE_KEY, JSON.stringify(RPG.save)); } catch(e){} }
function rpgMap(){ return RPG_MAPS[RPG.save.map]; }
function rpgTile(m, x, y){ return (m.rows[y] || "")[x] || "#"; }
function rpgThingAt(m, x, y){
  const s = RPG.save;
  const n = (m.npcs||[]).find(o=>o.x===x && o.y===y); if (n) return { kind:"npc", o:n };
  const c = (m.chests||[]).find(o=>o.x===x && o.y===y); if (c) return { kind:"chest", o:c, open:!!s.opened[c.id] };
  const g2 = (m.signs||[]).find(o=>o.x===x && o.y===y); if (g2) return { kind:"sign", o:g2 };
  return null;
}
function rpgWalkable(m, x, y){ return !!RPG_TILE[rpgTile(m,x,y)] && !rpgThingAt(m,x,y); }
function rpgText(key){ return (RPG_TEXT[key] || ["("+key+")"]).slice(); }
function rpgSay(lines, then){ RPG.dlg = { lines: Array.isArray(lines) ? lines : rpgText(lines), i:0, then }; rpgUI(); }

/* ---- Entering and leaving the overworld ---- */
function rpgOpen(){ RPG.save = RPG.save || rpgLoad(); RPG.active = true; RPG.cam = null; render(); }
function rpgQuit(){ rpgStore(); RPG.active = false; cancelAnimationFrame(RPG.raf); RPG.raf = 0; render(); }
function rpgBegin(el){ RPG.save = rpgNewSave(el); RPG.grace = 2; rpgStore(); RPG.cam = null; render(); rpgSay("parent"); }

/* ---- Movement ---- */
function rpgFront(){ const s = RPG.save, d = RPG_DIRS[s.dir]; return [s.x+d[0], s.y+d[1]]; }
function rpgBusy(){ return !!(RPG.dlg || RPG.reveal || RPG.fade || RPG.battle); }
function rpgUpdate(dt, now){
  const s = RPG.save; if (!s) return;
  if (RPG.fade){ RPG.fade.t += dt; if (!RPG.fade.done && RPG.fade.t >= RPG.fade.ms/2){ RPG.fade.done = true; RPG.fade.mid && RPG.fade.mid(); } if (RPG.fade && RPG.fade.t >= RPG.fade.ms) RPG.fade = null; return; }
  if (RPG.move){
    RPG.move.t += dt;
    if (RPG.move.t >= RPG_STEP_MS){ s.x = RPG.move.x; s.y = RPG.move.y; RPG.move = null; rpgArrive(); }
    else return;
  }
  if (rpgBusy()) return;
  const want = RPG.held[RPG.held.length-1] || rpgPadDir();
  if (!want) return;
  if (s.dir !== want){ s.dir = want; RPG.turnAt = now; return; }   // a tap turns; holding walks
  if (now - RPG.turnAt < 90) return;
  const m = rpgMap(), d = RPG_DIRS[want], nx = s.x+d[0], ny = s.y+d[1];
  if (rpgWalkable(m, nx, ny)) RPG.move = { fx:s.x, fy:s.y, x:nx, y:ny, t:0 };
  else RPG.bump = now;
}
function rpgArrive(){
  const s = RPG.save, m = rpgMap();
  s.steps++; if (RPG.grace > 0) RPG.grace--;
  const w = (m.warps||[]).find(o=>o.x===s.x && o.y===s.y);
  if (w){ RPG.held = RPG.held.filter(d=>d===w.dir); return rpgFade(()=>{ s.map = w.to; s.x = w.tx; s.y = w.ty; s.dir = w.dir || s.dir; RPG.cam = null; RPG.grace = Math.max(RPG.grace, 1); rpgStore(); render(); }); }
  rpgStore();
  if (rpgTile(m, s.x, s.y)==="," && m.grass && RPG.grace<=0){
    const tbl = RPG_ENCOUNTERS[m.grass];
    if (tbl && Math.random() < tbl.rate) rpgWild(tbl);
  }
}
function rpgFade(mid, ms){ RPG.fade = { t:0, ms: ms || (reduceMotion() ? 120 : 420), mid }; }

/* ---- Talking, signs, chests ---- */
function rpgAction(){
  if (RPG.reveal){ RPG.reveal = null; rpgUI(); if (RPG.after){ const f = RPG.after; RPG.after = null; f(); } return; }
  if (RPG.dlg){ const d = RPG.dlg; d.i++; if (d.i >= d.lines.length){ RPG.dlg = null; rpgUI(); d.then && d.then(); } else rpgUI(); return; }
  if (rpgBusy() || RPG.move) return;
  const s = RPG.save, m = rpgMap(), [fx, fy] = rpgFront(), th = rpgThingAt(m, fx, fy);
  if (!th) return;
  if (th.kind==="sign") return rpgSay(th.o.text);
  if (th.kind==="chest"){
    if (th.open) return rpgSay("chest_empty");
    const d = LIB[th.o.card]; if (!d) return rpgSay(["(This chest's card is missing: "+th.o.card+")"]);
    s.opened[th.o.id] = true; s.collection.push(d.id); rpgStore();
    RPG.reveal = { card:d, t:Date.now() }; render(); return;
  }
  if (th.kind==="npc"){
    const n = th.o, back = { up:"down", down:"up", left:"right", right:"left" };
    if (!n.still) n.dir = back[s.dir];
    if (n.trainer && !(n.flag && s.flags[n.flag])) return rpgSay(n.talk, ()=>rpgTrainer(n));
    return rpgSay(n.trainer && n.after ? n.after : n.talk);
  }
}

/* ---- Battles ---- */
function rpgPick(list){ const tot = list.reduce((a,e)=>a+(e.w||1),0); let r = Math.random()*tot; for (const e of list){ r -= (e.w||1); if (r<0) return e; } return list[list.length-1]; }
function rpgWild(tbl){ const e = rpgPick(tbl.list); RPG.held = []; rpgFade(()=>rpgBattle({ kind:"wild", deck:e.deck, level:e.level, lifeMod:e.lifeMod||0, grace:tbl.grace }), reduceMotion() ? 150 : 700); }
function rpgTrainer(n){ const t = RPG_TRAINERS[n.trainer]; if (!t) return; RPG.held = []; rpgFade(()=>rpgBattle({ kind:"trainer", npc:n.id, flag:n.flag, win:n.id+"_win", deck:t.deck, level:t.level, lifeMod:t.lifeMod||0, grace:3 }), reduceMotion() ? 150 : 700); }
function rpgBattle(b){
  if (!DECK_BY_ID[b.deck] || !DECK_BY_ID[RPG.save.deck]) { RPG.fade = null; return rpgSay(["(Missing deck: "+b.deck+")"]); }
  RPG.battle = b; cancelAnimationFrame(RPG.raf); RPG.raf = 0; RPG.fade = null;
  newGame(RPG.save.deck, b.deck, 15 + b.lifeMod, [3, b.level]);
}
function rpgEndBattle(fled){
  const b = RPG.battle, res = fled ? "fled" : (g && g.over), s = RPG.save;
  if (g) g.id = Math.random(); g = null; RPG.battle = null; RPG.grace = b ? b.grace : 2; RPG.cam = null;
  let msg = null;
  if (res==="you"){ s.wins++; if (b.flag) s.flags[b.flag] = true; if (b.kind==="trainer" && RPG_TEXT[b.win]) msg = b.win; }
  else if (res==="enemy" || res==="draw"){
    s.losses++;
    const m = rpgMap(), h = m.heal ? { map:s.map, x:m.heal[0], y:m.heal[1] } : { map:"town", x:RPG_MAPS.town.heal[0], y:RPG_MAPS.town.heal[1] };
    s.map = h.map; s.x = h.x; s.y = h.y; s.dir = "down"; msg = "lost";
  }
  rpgStore(); render(); if (msg) rpgSay(msg);
}

/* ---- Save file export / import (saves live in this browser; a file moves them between devices) ---- */
function rpgExport(){
  if (!RPG.save) return;
  const blob = new Blob([JSON.stringify(RPG.save, null, 1)], { type:"application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "elementals-save.json";
  document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function rpgImport(file){
  const r = new FileReader();
  r.onload = () => { try { const s = JSON.parse(r.result); if (!rpgValidSave(s)) throw 0; RPG.save = s; rpgStore(); RPG.cam = null; RPG.toast = "Save loaded."; }
    catch(e){ RPG.toast = "That file isn't an Elementals save."; } render(); };
  r.readAsText(file);
}

/* ---- Input: keyboard, touch d-pad, gamepad ---- */
const RPG_KEYS = { ArrowUp:"up", ArrowDown:"down", ArrowLeft:"left", ArrowRight:"right", w:"up", s:"down", a:"left", d:"right", W:"up", S:"down", A:"left", D:"right" };
function rpgOnKey(e, down){
  if (!RPG.active || g || !RPG.save) return;
  if (e.target && e.target.closest && e.target.closest("input,textarea,select")) return;
  const dir = RPG_KEYS[e.key];
  if (dir){ e.preventDefault(); RPG.held = RPG.held.filter(d=>d!==dir); if (down) RPG.held.push(dir); return; }
  if (down && !e.repeat && (e.key==="Enter" || e.key===" " || e.key==="z" || e.key==="Z" || e.key==="x" || e.key==="X")){
    if (e.target && e.target.closest && e.target.closest("button") && e.key!=="z" && e.key!=="Z") return;
    e.preventDefault(); rpgAction();
  }
}
function rpgPadDir(){ return RPG.pad.dir || null; }
function rpgPollPad(){
  const pads = navigator.getGamepads ? navigator.getGamepads() : []; let gp = null;
  for (const p of pads) if (p && p.connected){ gp = p; break; }
  if (!gp){ if (RPG.pad.src==="gp") RPG.pad = {}; return; }
  const b = i => gp.buttons[i] && gp.buttons[i].pressed, ax = gp.axes[0]||0, ay = gp.axes[1]||0;
  let dir = b(12) ? "up" : b(13) ? "down" : b(14) ? "left" : b(15) ? "right" : null;
  if (!dir && Math.max(Math.abs(ax),Math.abs(ay)) > 0.5) dir = Math.abs(ax) > Math.abs(ay) ? (ax<0?"left":"right") : (ay<0?"up":"down");
  if (dir || RPG.pad.src==="gp") RPG.pad = dir ? { dir, src:"gp", a:RPG.pad.a } : { a:RPG.pad.a };
  const a = b(0); if (a && !RPG.pad.a) rpgAction(); RPG.pad.a = a;
}

/* ---- Drawing (procedural pixel tiles, no image files) ---- */
function rpgHash(x, y, k){ let h = (x*374761393 + y*668265263 + (k||0)*2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
function rpgDrawTile(c, ch, tx, ty, px, py, now){
  const T = RPG_T, R = (x,y,w,h,col)=>{ c.fillStyle = col; c.fillRect(px+x, py+y, w, h); };
  const grass = () => { R(0,0,T,T,"#4c8a3f"); for (let i=0;i<3;i++){ const hx = rpgHash(tx,ty,i), hy = rpgHash(ty,tx,i+7); R((hx*14)|0,(hy*14)|0,1,2,"#3f7735"); } };
  switch (ch){
    case ".": case "s": grass(); break;
    case "f": grass(); for (let i=0;i<3;i++){ const hx = 2+((rpgHash(tx,ty,i+3)*11)|0), hy = 2+((rpgHash(ty,tx,i+5)*11)|0); R(hx,hy,2,2, i%2 ? "#f2d25a" : "#e8665a"); R(hx,hy+2,1,1,"#2f5f29"); } break;
    case ",": { R(0,0,T,T,"#3f7a34"); const sway = Math.sin(now/600 + tx*0.7 + ty*0.4) > 0.6 ? 1 : 0;
      for (let row=0; row<3; row++) for (let i=0;i<4;i++){ const x = i*4 + (row%2?2:0), y = 3 + row*5; R(x+sway,y,1,3,"#2a5a25"); R(x+1+sway,y-1,1,4,"#5fa34c"); R(x+2,y+1,1,2,"#2a5a25"); } break; }
    case "=": R(0,0,T,T,"#c2a26a"); for (let i=0;i<3;i++) R((rpgHash(tx,ty,i+11)*14)|0,(rpgHash(ty,tx,i+13)*14)|0,2,1,"#a88a55"); break;
    case "#": grass(); R(6,10,4,6,"#5a3d22"); c.fillStyle = "#24502a"; c.beginPath(); c.arc(px+8, py+7, 7, 0, Math.PI*2); c.fill(); R(4,3,3,2,"#3a7a3c"); R(9,6,2,2,"#3a7a3c"); break;
    case "~": { R(0,0,T,T,"#2f6ea8"); const o = Math.floor(now/400 + tx + ty) % 4; R((o*4)%T,4,4,1,"#6aa8dc"); R(((o*4)+8)%T,11,4,1,"#6aa8dc"); break; }
    case "R": R(0,0,T,T,"#9a4434"); for (let y=2;y<T;y+=4) R(0,y,T,1,"#7a3328"); R((ty%2)*4,0,1,T,"#7a3328"); R((ty%2)*4+8,0,1,T,"#7a3328"); break;
    case "H": R(0,0,T,T,"#ddcfae"); R(0,T-2,T,2,"#b4a582"); if (tx%2===0){ R(4,4,8,7,"#3c5f86"); R(4,4,8,1,"#6d4a2c"); R(7,4,2,7,"#6d4a2c"); } break;
    case "D": R(0,0,T,T,"#ddcfae"); R(3,2,10,14,"#6d4a2c"); R(4,3,8,13,"#86603a"); R(10,9,1,1,"#e2c46a"); break;
    case "_": R(0,0,T,T,"#9a7650"); R(0,7,T,1,"#80603f"); R(0,15,T,1,"#80603f"); R((ty%2)*8+3,0,1,7,"#80603f"); R((ty%2)*8+11,8,1,7,"#80603f"); break;
    case "W": R(0,0,T,T,"#5d4c3c"); R(0,T-3,T,3,"#493b2e"); break;
    case "t": R(0,0,T,T,"#9a7650"); R(1,3,14,10,"#6a4a2c"); R(2,4,12,7,"#80603f"); break;
    case ">": R(0,0,T,T,"#9a7650"); R(1,2,14,12,"#a34a3a"); R(3,4,10,8,"#c26450"); break;
    default: R(0,0,T,T,"#000");
  }
}
function rpgDrawPerson(c, px, py, dir, look, step){
  const R = (x,y,w,h,col)=>{ c.fillStyle = col; c.fillRect(px+x, py+y, w, h); };
  const bob = step ? 1 : 0;
  R(3,13,10,3,"rgba(0,0,0,.25)");
  R(5,8-bob,6,6,look.shirt); R(4,9-bob,1,4,look.shirt); R(11,9-bob,1,4,look.shirt);
  R(5,14-bob,2,2,"#2b2b33"); R(9,14-bob,2,2,"#2b2b33"); if (step===1) R(5,13,2,3,"#2b2b33"); if (step===2) R(9,13,2,3,"#2b2b33");
  R(5,2-bob,6,6,"#f0c9a0"); R(4,1-bob,8,3,look.hair);
  if (dir==="up") R(5,2-bob,6,4,look.hair);
  else if (dir==="down"){ R(6,5-bob,1,1,"#222"); R(9,5-bob,1,1,"#222"); }
  else if (dir==="left"){ R(5,5-bob,1,1,"#222"); R(10,2-bob,1,4,look.hair); }
  else { R(10,5-bob,1,1,"#222"); R(5,2-bob,1,4,look.hair); }
}
function rpgDraw(now){
  const c = RPG.ctx, s = RPG.save; if (!c || !s) return;
  const m = rpgMap(), T = RPG_T, W = m.rows[0].length, H = m.rows.length;
  let fx = s.x, fy = s.y;
  if (RPG.move){ const k = Math.min(1, RPG.move.t / RPG_STEP_MS); fx = RPG.move.fx + (RPG.move.x - RPG.move.fx)*k; fy = RPG.move.fy + (RPG.move.y - RPG.move.fy)*k; }
  const clampC = (v, size, view) => size <= view ? (size - view)/2 : Math.max(0, Math.min(size - view, v));
  const cx = clampC(fx - (RPG_VW-1)/2, W, RPG_VW), cy = clampC(fy - (RPG_VH-1)/2, H, RPG_VH);
  RPG.cam = [cx, cy];
  c.fillStyle = "#101318"; c.fillRect(0, 0, RPG_VW*T, RPG_VH*T);
  const x0 = Math.floor(cx), y0 = Math.floor(cy);
  for (let ty = y0; ty <= y0 + RPG_VH; ty++) for (let tx = x0; tx <= x0 + RPG_VW; tx++){
    if (tx<0 || ty<0 || tx>=W || ty>=H) continue;
    rpgDrawTile(c, m.rows[ty][tx], tx, ty, Math.round((tx-cx)*T), Math.round((ty-cy)*T), now);
  }
  const P = (x, y) => [Math.round((x-cx)*T), Math.round((y-cy)*T)];
  for (const sg of (m.signs||[])){ const [px,py] = P(sg.x, sg.y); c.fillStyle="#6d4a2c"; c.fillRect(px+7,py+8,2,7); c.fillRect(px+2,py+3,12,7); c.fillStyle="#a8824e"; c.fillRect(px+3,py+4,10,5); }
  for (const ch of (m.chests||[])){ const [px,py] = P(ch.x, ch.y), open = s.opened[ch.id];
    c.fillStyle="rgba(0,0,0,.25)"; c.fillRect(px+2,py+13,12,2);
    c.fillStyle="#6a3f1e"; c.fillRect(px+2,py+5,12,9); c.fillStyle= open ? "#2a1a0e" : "#9a6430"; c.fillRect(px+3, py+(open?5:6), 10, open?3:7);
    c.fillStyle="#e2c46a"; c.fillRect(px+2,py+8,12,1); if (!open){ c.fillRect(px+7,py+8,2,3); const glint = Math.sin(now/300) > 0.7; if (glint){ c.fillStyle="#fff6c8"; c.fillRect(px+11,py+4,1,1); } } }
  const people = (m.npcs||[]).map(n=>({ y:n.y, draw:()=>{ const [px,py] = P(n.x, n.y); rpgDrawPerson(c, px, py, n.dir, n.look, 0); } }));
  const shirt = getComputedStyle(document.documentElement).getPropertyValue("--"+s.starter).trim() || "#cda54d";
  const step = RPG.move ? (RPG.move.t > RPG_STEP_MS/2 ? 0 : ((s.steps % 2) ? 1 : 2)) : 0;
  people.push({ y:fy, draw:()=>{ const [px,py] = P(fx, fy); rpgDrawPerson(c, px, py, s.dir, { shirt, hair:"#3b2a1e" }, step); } });
  people.sort((a,b)=>a.y-b.y).forEach(p=>p.draw());
  if (m.grass){ // tall grass covers the lower half of anyone standing in it
    for (const who of [{x:fx,y:fy}, ...(m.npcs||[])]){ const tx = Math.round(who.x), ty = Math.round(who.y); if (rpgTile(m,tx,ty)!==",") continue; const [px,py] = P(tx,ty); c.fillStyle="#3f7a34"; c.fillRect(px+1,py+11,14,5); c.fillStyle="#5fa34c"; for (let i=1;i<15;i+=3) c.fillRect(px+i,py+10,1,4); }
  }
  if (RPG.fade){ const k = RPG.fade.t / RPG.fade.ms, a = k < .5 ? k*2 : (1-k)*2; c.fillStyle = `rgba(8,10,14,${Math.max(0,Math.min(1,a)).toFixed(3)})`; c.fillRect(0,0,RPG_VW*T,RPG_VH*T); }
}
function rpgLoop(now){
  if (!RPG.active || g || !RPG.canvas || !RPG.canvas.isConnected){ RPG.raf = 0; return; }
  const dt = Math.min(60, now - (RPG.last || now)); RPG.last = now;
  rpgPollPad(); rpgUpdate(dt, now); rpgDraw(now);
  RPG.raf = requestAnimationFrame(rpgLoop);
}

/* ---- Screen ---- */
function renderWorld(){
  const s = RPG.save;
  if (!s){
    const tiles = BASE_ELS.map(e=>`<button class="tile el-${e}" data-rpgstart="${e}"><b>${ELS[e]}</b><span>${esc(EL_STYLE[e])}</span></button>`).join("");
    return `<div class="setup rpg-start"><header><h1 style="font-size:30px">Adventure</h1><p>A first look at the overworld: walk around, step into tall grass for wild duels, talk to people, open a chest. Pick the element of your starter deck.</p></header>
      <div class="tiles">${tiles}</div><div class="row"><button class="btn" data-btn="rpg-quit">Back to playtest menu</button><label class="btn rpg-file">Load a save file<input type="file" accept=".json,application/json" data-rpgimport hidden></label></div>${RPG.toast ? `<p class="muted">${esc(RPG.toast)}</p>` : ""}</div>`;
  }
  const m = rpgMap(), dk = DECK_BY_ID[s.deck];
  return `<div class="rpg">
    <div class="top"><h1>${esc(m.name)}</h1><div class="row"><span class="muted">Deck: ${esc(dk ? dk.name : s.deck)} · ${s.collection.length} found · ${s.wins} wins</span>
      <button class="btn" data-btn="rpg-export">Save to file</button><label class="btn rpg-file">Load file<input type="file" accept=".json,application/json" data-rpgimport hidden></label>
      <button class="btn" data-btn="rpg-new">${RPG.eraseArm ? "Click again to erase" : "New adventure"}</button><button class="btn" data-btn="rpg-quit">Playtest menu</button></div></div>
    <div class="rpg-stage"><canvas id="rpgc" width="${RPG_VW*RPG_T}" height="${RPG_VH*RPG_T}" aria-label="Overworld map. Arrow keys or WASD to walk, Enter or Space to talk."></canvas><div id="rpgui"></div></div>
    <div class="rpg-pad" aria-hidden="true"><div class="dpad"><button data-pad="up">▲</button><button data-pad="left">◀</button><button data-pad="right">▶</button><button data-pad="down">▼</button></div><button class="abtn" data-pad="a">A</button></div>
    <p class="muted rpg-help">Arrow keys or WASD to walk, Enter, Space or Z to talk and read. A gamepad works too. Progress saves in this browser as you play; "Save to file" makes a copy you can move to another device.${RPG.toast ? " · "+esc(RPG.toast) : ""}</p>
  </div>`;
}
function rpgUI(){
  const box = document.getElementById("rpgui"); if (!box) return;
  let h = "";
  if (RPG.dlg){ const line = RPG.dlg.lines[RPG.dlg.i] || "", k = line.indexOf(": "), who = k>0 && k<24 ? line.slice(0,k) : "", txt = who ? line.slice(k+2) : line;
    h += `<div class="rpg-dlg" data-rpgnext role="status" aria-live="polite">${who ? `<b>${esc(who)}</b>` : ""}<span>${esc(txt)}</span><i aria-hidden="true">▼</i></div>`; }
  if (RPG.reveal){ const d = RPG.reveal.card;
    h += `<div class="rpg-reveal" data-rpgnext role="dialog" aria-label="New card"><div class="rays el-${d.el}"></div><div class="rv-in"><span class="lbl">You found a card</span>${cardHTML(d,{cls:"bigcard"})}<span class="muted">Added to your collection. (The deck builder comes next.) Press Enter or tap to continue.</span></div></div>`; }
  box.innerHTML = h;
}
function rpgMount(){
  const cv = document.getElementById("rpgc"); if (!cv) return;
  RPG.canvas = cv; RPG.ctx = cv.getContext("2d"); RPG.ctx.imageSmoothingEnabled = false;
  rpgUI(); RPG.last = 0;
  if (!RPG.raf) RPG.raf = requestAnimationFrame(rpgLoop);
}
function rpgClick(el){
  const ds = el.dataset;
  if (ds.rpgstart){ rpgBegin(ds.rpgstart); return true; }
  if (ds.rpgnext!=null){ rpgAction(); return true; }
  switch (ds.btn){
    case "rpg": rpgOpen(); return true;
    case "rpg-quit": RPG.eraseArm = false; rpgQuit(); return true;
    case "rpg-export": rpgExport(); return true;
    case "rpg-new": if (!RPG.eraseArm){ RPG.eraseArm = true; render(); setTimeout(()=>{ if (RPG.eraseArm){ RPG.eraseArm = false; if (RPG.active && !g) render(); } }, 4000); }
      else { RPG.eraseArm = false; RPG.save = null; try { localStorage.removeItem(RPG_SAVE_KEY); } catch(e){} render(); } return true;
    case "rpg-return": rpgEndBattle(false); return true;
    case "rpg-flee": rpgEndBattle(true); return true;
  }
  return false;
}
function rpgInit(){
  document.addEventListener("keydown", e=>rpgOnKey(e, true));
  document.addEventListener("keyup", e=>rpgOnKey(e, false));
  window.addEventListener("blur", ()=>{ RPG.held = []; });
  document.addEventListener("change", e=>{ if (e.target.matches && e.target.matches("[data-rpgimport]") && e.target.files[0]) rpgImport(e.target.files[0]); });
  const padDown = e=>{ const b = e.target.closest && e.target.closest("[data-pad]"); if (!b || !RPG.active) return; e.preventDefault(); const k = b.dataset.pad;
    if (k==="a") rpgAction(); else RPG.pad = { dir:k, src:"touch" }; };
  const padUp = ()=>{ if (RPG.pad.src==="touch") RPG.pad = {}; };
  document.addEventListener("pointerdown", padDown); document.addEventListener("pointerup", padUp); document.addEventListener("pointercancel", padUp);
}
