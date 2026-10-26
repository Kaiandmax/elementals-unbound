/* ---------------- RPG layer: world generation (owner: Game Dev) ----------------
   Large regions and dungeons are generated from a spec instead of typed out tile by tile. Generation is
   deterministic (seeded), so a region looks the same every time and in the headless smoke test.

   Region spec (RPG_REGIONS in rpg/regions.js):
     w, h, seed, biome      size, random seed, the base biome painted everywhere
     zones   [{ rect:[x0,y0,x1,y1], biome, edge? }]   repaint an area with another biome (edge softens the border)
     walls   [{ pts:[[x,y],...], tile:"^", width:2 }]  impassable ridges, cliffs or thorn hedges along a polyline
     rivers  [{ pts:[[x,y],...], width:3 }]             deep water with shallow banks
     roads   [{ pts:[[x,y],...], width:1, tile:"=" }]   winding roads; bridges where they cross water; trees cleared beside them
     clear   [[x0,y0,x1,y1], ...]                       forced open ground (grass)
     stamps  [{ at:[x,y], rows:[...] }]                 hand-drawn places (towns, ruins, camps); " " keeps what's underneath
     ...plus every normal map field (name, music, warps, npcs, signs, chests, scenes, wilds, landmarks, quests...).
   After painting, any walkable pocket that can't be reached from a road, a warp landing or a stamp is filled in,
   so the whole region is always connected.

   Dungeon spec (RPG_DUNGEONS): { w, h, seed, rooms, style:"vault"|"cave", water? } -> rooms joined by corridors,
   with `entry` and `exit` stairs placed in the first and last rooms; things can be placed in rooms by index. */

function rpgRng(seed){ let s = (seed >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function rpgNoise(seed){
  const H = (x, y) => { let h = (x*374761393 + y*668265263 + seed*1442695041) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const sm = t => t*t*(3-2*t);
  const v = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = sm(x-xi), yf = sm(y-yi);
    const a = H(xi,yi), b = H(xi+1,yi), c = H(xi,yi+1), d = H(xi+1,yi+1); return a + (b-a)*xf + (c-a)*yf + (a-b-c+d)*xf*yf; };
  return (x, y, scale) => (v(x/scale, y/scale)*0.6 + v(x/scale*2.1+31, y/scale*2.1+17)*0.28 + v(x/scale*4.3+7, y/scale*4.3+91)*0.12);
}

/* Biomes paint one tile from two noise values: e (lay of the land) and m (growth). Solid filler is used to seal pockets. */
const RPG_BIOMES = {
  vale:     { fill:"#", paint:(e,m,r)=> e<0.2 ? (e<0.15 ? "~" : "w") : m>0.66 ? "#" : m>0.6 ? (r<0.5?"#":".") : m>0.48 ? "." : r<0.03 ? "f" : r<0.035 ? "o" : "." },
  forest:   { fill:"#", paint:(e,m,r)=> e<0.17 ? "w" : m>0.46 ? (r<0.35?"P":"#") : m>0.36 ? (r<0.3?"#":".") : r<0.04 ? "f" : r<0.07 ? "o" : "." },
  deepwood: { fill:"P", paint:(e,m,r)=> m>0.38 ? (r<0.5?"P":"#") : m>0.3 ? "." : r<0.05 ? "o" : "." },
  orchard:  { fill:"#", paint:(e,m,r,x,y)=> (x%4===0 && y%3===0) ? "Q" : m>0.55 ? "." : r<0.04 ? "f" : "." },
  burnt:    { fill:"T", paint:(e,m,r,x,y)=> (x%4===0 && y%3===0) ? (r<0.6?"T":"Q") : m>0.6 ? "A" : r<0.06 ? "o" : "a" },
  hills:    { fill:"^", paint:(e,m,r)=> e>0.68 ? "^" : e>0.6 ? (r<0.5?"o":".") : m>0.6 ? "P" : m>0.5 ? "." : r<0.06 ? "o" : "." },
  marsh:    { fill:"~", paint:(e,m,r)=> e<0.32 ? (r<0.7?"w":"~") : m>0.6 ? "#" : m>0.45 ? "." : r<0.1 ? "." : "." },
  moor:     { fill:"o", paint:(e,m,r)=> e>0.72 ? (r<0.5?"o":"^") : m>0.62 ? "." : m>0.45 ? (r<0.55?"h":".") : r<0.02 ? "#" : r<0.05 ? "o" : "." },
  fen:      { fill:"~", paint:(e,m,r)=> e<0.3 ? (r<0.75?"w":"~") : m>0.62 ? (r<0.5?"#":".") : m>0.4 ? "." : r<0.15 ? "." : "." },
  sallow:   { fill:"#", paint:(e,m,r)=> e<0.22 ? "w" : m>0.42 ? (r<0.7?"#":"P") : m>0.34 ? "." : r<0.05 ? "o" : "." },
  farm:     { fill:"#", paint:(e,m,r,x,y)=> (y%6===0 || x%9===0) ? (r<0.8?"|":".") : (y%2 ? "F" : ".") },
};

function rpgGenRegion(id, spec){
  const W = spec.w, H = spec.h, R = rpgRng(spec.seed || 1), N1 = rpgNoise((spec.seed||1)*7+1), N2 = rpgNoise((spec.seed||1)*13+5);
  const g = Array.from({length:H}, () => new Array(W).fill("."));
  const biomeAt = Array.from({length:H}, () => new Array(W).fill(spec.biome || "vale"));
  for (const z of spec.zones || []){ const [x0,y0,x1,y1] = z.rect, ed = z.edge || 0;
    for (let y = Math.max(0,y0-ed); y <= Math.min(H-1,y1+ed); y++) for (let x = Math.max(0,x0-ed); x <= Math.min(W-1,x1+ed); x++){
      const inside = x>=x0 && x<=x1 && y>=y0 && y<=y1;
      if (inside || R() < 0.5 - 0.4*Math.max(Math.max(x0-x, x-x1, 0), Math.max(y0-y, y-y1, 0))/Math.max(1,ed)) biomeAt[y][x] = z.biome;
    } }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
    const B = RPG_BIOMES[biomeAt[y][x]] || RPG_BIOMES.vale;
    g[y][x] = B.paint(N1(x,y,14), N2(x,y,9), R(), x, y);
  }
  // A wild border: the region's edge is dense growth or rock, broken only where roads and warps leave.
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (x<2 || y<2 || x>=W-2 || y>=H-2) g[y][x] = (RPG_BIOMES[biomeAt[y][x]] || RPG_BIOMES.vale).fill;
  const set = (x, y, t) => { if (x>=0 && y>=0 && x<W && y<H) g[y][x] = t; };
  const line = (pts, width, fn, wobble) => {
    for (let i = 0; i+1 < pts.length; i++){
      let [x, y] = pts[i]; const [tx, ty] = pts[i+1]; let guard = 0;
      while ((x !== tx || y !== ty) && guard++ < 4000){
        for (let dy = -Math.floor((width-1)/2); dy <= Math.floor(width/2); dy++) for (let dx = -Math.floor((width-1)/2); dx <= Math.floor(width/2); dx++) fn(x+dx, y+dy, dx, dy);
        const ddx = tx - x, ddy = ty - y, w = wobble ? (N1(x*3, y*3, 3) - 0.5) : 0;
        if (ddx === 0) y += Math.sign(ddy);
        else if (ddy === 0) x += Math.sign(ddx);
        else if (Math.abs(ddx) > Math.abs(ddy) ? (R() > 0.2 + w) : (R() < 0.2 + w)) x += Math.sign(ddx); else y += Math.sign(ddy);
      }
      for (let dy = -Math.floor((width-1)/2); dy <= Math.floor(width/2); dy++) for (let dx = -Math.floor((width-1)/2); dx <= Math.floor(width/2); dx++) fn(tx+dx, ty+dy, dx, dy);
    }
  };
  for (const rv of spec.rivers || []){ const wd = rv.width || 3;
    line(rv.pts, wd + 2, (x,y,dx,dy) => { if (x<0||y<0||x>=W||y>=H) return; const edge = Math.abs(dx) > (wd-1)/2 || Math.abs(dy) > (wd-1)/2; if (!edge) set(x,y,"~"); else if (g[y][x] !== "~") set(x,y,"w"); }, true); }
  for (const c of spec.clear || []){ const [x0,y0,x1,y1] = c; for (let y=y0;y<=y1;y++) for (let x=x0;x<=x1;x++) set(x,y,"."); }
  // Walls go over rivers (deep water stays deep), so a ridge can't be walked round along a riverbank.
  // Wall tiles are remembered, so road verges and the patches under placed things never open a gap in one.
  const wallAt = new Set();
  for (const wl of spec.walls || []) line(wl.pts, wl.width || 2, (x,y) => { if (x>=0&&y>=0&&x<W&&y<H && g[y][x] !== "~"){ set(x, y, wl.tile || "^"); wallAt.add(y*W+x); } }, false);
  // The border again, so rivers and ridges running off the edge don't open a way round.
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (x<2 || y<2 || x>=W-2 || y>=H-2) g[y][x] = (RPG_BIOMES[biomeAt[y][x]] || RPG_BIOMES.vale).fill;
  const SOLIDISH = { "#":1, "P":1, "o":1, "Q":1, "T":1 };
  for (const rd of spec.roads || []){ const t = rd.tile || "=", wd = rd.width || 1;
    line(rd.pts, wd, (x,y) => { if (x<0||y<0||x>=W||y>=H) return; set(x, y, (g[y][x]==="~" || g[y][x]==="w" || g[y][x]==="b") ? "b" : t); }, true);
    // clear a verge either side so roads read as roads
    line(rd.pts, wd + 2, (x,y) => { if (x>=0&&y>=0&&x<W&&y<H && SOLIDISH[g[y][x]] && !wallAt.has(y*W+x)) g[y][x] = "."; }, false); }
  for (const st of spec.stamps || []){ const [sx, sy] = st.at; st.rows.forEach((row, dy) => [...row].forEach((ch, dx) => { if (ch !== " ") set(sx+dx, sy+dy, ch); })); }
  // Things placed on growth or rock get a patch of open ground under and beside them.
  for (const o of [...(spec.npcs||[]), ...(spec.chests||[])]){ if (o.x==null) continue;
    if (SOLIDISH[g[o.y]?.[o.x]] || g[o.y]?.[o.x] === ",") g[o.y][o.x] = ".";
    for (const [dx,dy] of [[0,1],[1,0],[-1,0],[0,-1]]) if (SOLIDISH[g[o.y+dy]?.[o.x+dx]] && !wallAt.has((o.y+dy)*W+o.x+dx)) g[o.y+dy][o.x+dx] = "."; }
  // Seal pockets nobody can reach: flood from roads, warp landings, stamps and the start point.
  const walk = (x, y) => !!RPG_TILE[g[y][x]];
  const seen = Array.from({length:H}, () => new Uint8Array(W)), q = [];
  const seed = (x, y) => { if (x>=0&&y>=0&&x<W&&y<H && walk(x,y) && !seen[y][x]){ seen[y][x] = 1; q.push(x, y); } };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x] === "=" || g[y][x] === "+" || g[y][x] === "b") seed(x, y);
  for (const p of spec.seeds || []) seed(p[0], p[1]);
  while (q.length){ const y = q.pop(), x = q.pop(); seed(x+1,y); seed(x-1,y); seed(x,y+1); seed(x,y-1); }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (walk(x,y) && !seen[y][x]) g[y][x] = (RPG_BIOMES[biomeAt[y][x]] || RPG_BIOMES.vale).fill;
  const m = Object.assign({}, spec); m.rows = g.map(r => r.join("")); m.generated = true;
  for (const k of ["zones","walls","rivers","roads","clear","stamps","seeds"]) delete m[k];
  return m;
}

/* Dungeons: rooms placed without overlap, joined in order by L-shaped corridors, plus a few extra loops. */
function rpgGenDungeon(id, spec){
  const W = spec.w, H = spec.h, R = rpgRng(spec.seed || 1), wall = spec.wall || "V", floor = spec.floor || "v";
  const g = Array.from({length:H}, () => new Array(W).fill(wall)), rooms = [];
  for (let tries = 0; rooms.length < (spec.rooms || 8) && tries < 600; tries++){
    const w = 5 + Math.floor(R()*7), h = 4 + Math.floor(R()*5), x = 2 + Math.floor(R()*(W-w-4)), y = 2 + Math.floor(R()*(H-h-4));
    if (rooms.some(r => x < r.x+r.w+2 && x+w+2 > r.x && y < r.y+r.h+2 && y+h+2 > r.y)) continue;
    rooms.push({ x, y, w, h, cx: x + (w>>1), cy: y + (h>>1) });
  }
  rooms.sort((a, b) => (a.cx + a.cy*0.6) - (b.cx + b.cy*0.6));
  for (const r of rooms) for (let y = r.y; y < r.y+r.h; y++) for (let x = r.x; x < r.x+r.w; x++) g[y][x] = floor;
  const dig = (a, b) => { let x = a.cx, y = a.cy; const hFirst = R() < 0.5;
    const step = (tx, ty) => { while (x !== tx){ x += Math.sign(tx-x); g[y][x] = g[y][x]===wall ? floor : g[y][x]; } while (y !== ty){ y += Math.sign(ty-y); g[y][x] = g[y][x]===wall ? floor : g[y][x]; } };
    if (hFirst){ step(b.cx, y); step(x, b.cy); } else { step(x, b.cy); step(b.cx, y); } };
  for (let i = 1; i < rooms.length; i++) dig(rooms[i-1], rooms[i]);
  for (let k = 0; k < Math.floor(rooms.length/3); k++){ const a = rooms[Math.floor(R()*rooms.length)], b = rooms[Math.floor(R()*rooms.length)]; if (a !== b) dig(a, b); }
  // Water: pools in some rooms (shallows you can wade, with wild duels; deep centres are solid).
  if (spec.water) for (const r of rooms.slice(1, -1)) if (R() < spec.water){
    for (let y = r.y+1; y < r.y+r.h-1; y++) for (let x = r.x+1; x < r.x+r.w-1; x++) g[y][x] = (r.w > 7 && r.h > 5 && x > r.x+2 && x < r.x+r.w-3 && y > r.y+1 && y < r.y+r.h-2) ? "~" : "w";
  }
  const first = rooms[0], last = rooms[rooms.length-1];
  g[first.y][first.cx] = "S"; if (spec.exit !== false) g[last.y][last.cx] = "S";
  const m = Object.assign({}, spec); m.generated = true; m.rooms = rooms;
  m.entry = { x:first.cx, y:first.y+1 }; m.exitAt = { x:last.cx, y:last.y }; m.exitLand = { x:last.cx, y:last.y+1 };
  // Things can be placed "in room i": { room:i } -> a free floor tile there.
  const free = (r) => { for (let t = 0; t < 50; t++){ const x = r.x + 1 + Math.floor(R()*(r.w-2)), y = r.y + 1 + Math.floor(R()*(r.h-2)); if (g[y][x] === floor) { g[y][x] = floor; return [x, y]; } } return [r.cx, r.cy]; };
  for (const list of ["npcs","signs","chests"]) m[list] = (spec[list] || []).map(o => { if (o.room == null) return o; const r = rooms[(o.room + rooms.length) % rooms.length], [x, y] = free(r); return Object.assign({}, o, { x, y }); });
  m.scenes = (spec.scenes || []).map(o => o.room == null ? o : Object.assign({}, o, { at:[rooms[(o.room + rooms.length) % rooms.length].cx, rooms[(o.room + rooms.length) % rooms.length].cy] }));
  m.entryAt = { x:first.cx, y:first.y };
  m.rows = g.map(r => r.join(""));
  return m;
}
