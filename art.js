/* ================= CARD ART (flat geometric) =================
   Every card's picture is generated from its name, type, keywords and effects, so every card
   (including any fused card) gets one. The style is flat geometric: solid polygons in three shades of
   the element colour (base, dark, light) plus a glow and an eye colour, on a dusky backdrop.
   A drawing is assembled from independent choices made by a seeded random number from the card's id:
   - a subject (who or what), picked from the name's words, with several poses or forms each
   - an outfit (head, gear, cape, robe) for people
   - a scene for spells, auras and Reactions, from the name's words and what the card does
   - a backdrop (sky and ground) from the name's words and the element
   Shapes are collected as [role, path] pairs and coloured from the element's palette at the end.
   Coordinates: a 240 x 140 box, ground at y = 124. */
const ART_CACHE = new Map();
function artHash(s){ let h = 2166136261; for (let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h>>>0; }
function artRng(seed){ let x = seed || 1; return () => { x ^= x<<13; x ^= x>>>17; x ^= x<<5; return ((x>>>0)%10000)/10000; }; }
const pick = (R, arr) => arr[Math.floor(R()*arr.length)];
const r1 = v => Math.round(v*10)/10;
const GY = 124;

/* ---- path helpers ---- */
const poly = pts => "M" + pts.map(([x,y]) => r1(x)+" "+r1(y)).join(" L") + " Z";
const circ = (x,y,r) => `M${r1(x-r)} ${r1(y)} a${r1(r)} ${r1(r)} 0 1 0 ${r1(2*r)} 0 a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2*r)} 0`;
const ell = (x,y,rx,ry) => `M${r1(x-rx)} ${r1(y)} a${r1(rx)} ${r1(ry)} 0 1 0 ${r1(2*rx)} 0 a${r1(rx)} ${r1(ry)} 0 1 0 ${r1(-2*rx)} 0`;
function ngon(x, y, r, n, rot=-Math.PI/2, sx=1, sy=1){ const p = []; for (let i=0;i<n;i++){ const a = rot + i*2*Math.PI/n; p.push([x+Math.cos(a)*r*sx, y+Math.sin(a)*r*sy]); } return poly(p); }
function star(x, y, ro, ri, n, rot=-Math.PI/2){ const p = []; for (let i=0;i<2*n;i++){ const a = rot + i*Math.PI/n, r = i%2 ? ri : ro; p.push([x+Math.cos(a)*r, y+Math.sin(a)*r]); } return poly(p); }
function quad(a, b, w1, w2=w1){ const dx = b[0]-a[0], dy = b[1]-a[1], L = Math.hypot(dx,dy)||1, nx = -dy/L, ny = dx/L;
  return poly([[a[0]+nx*w1/2, a[1]+ny*w1/2], [b[0]+nx*w2/2, b[1]+ny*w2/2], [b[0]-nx*w2/2, b[1]-ny*w2/2], [a[0]-nx*w1/2, a[1]-ny*w1/2]]); }
const tri = (a,b,c) => poly([a,b,c]);
const rect = (x,y,w,h) => poly([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
// A drawing: a list of [role, path] or ["g", transform, Drawing]. Roles are coloured from the palette.
function Drawing(){ const L = []; const f = (role, d) => { if (d) L.push([role, d]); return f; }; f.list = L; f.group = (t, g) => { L.push(["g", t, g]); return f; }; return f; }

/* ---- palettes ---- */
function hexRgb(h){ const n = parseInt(h.slice(1),16); return [n>>16&255, n>>8&255, n&255]; }
function rgbHex(c){ return "#" + c.map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join(""); }
function mix(a, b, t){ const A = hexRgb(a), B = hexRgb(b); return rgbHex(A.map((v,i)=>v+(B[i]-v)*t)); }
const ART_PAL = {
  fire:     { base:"#e8642a", dark:"#a8341a", light:"#ffc94a", glow:"#ffe08a", eye:"#fff1a8", bg:"#3b1f2b", accent:"#7a2e3a" },
  water:    { base:"#3f97dc", dark:"#1f5a94", light:"#a8e0ff", glow:"#e2f6ff", eye:"#ffffff", bg:"#1b2342", accent:"#2c4a7a" },
  earth:    { base:"#b88f4f", dark:"#76552c", light:"#e8c97a", glow:"#ffe08a", eye:"#ffe9a8", bg:"#2c2433", accent:"#5a4a40" },
  wind:     { base:"#4fbf9f", dark:"#287a66", light:"#c8f2e2", glow:"#f0fff8", eye:"#ffffff", bg:"#1d2f3a", accent:"#3a6070" },
  lightning:{ base:"#e2c23c", dark:"#9a7a18", light:"#fff1a0", glow:"#fffbe0", eye:"#ffffff", bg:"#22203a", accent:"#4a4a78" },
};
const CONF_BASE = { volcano:"#e2833f", wildfire:"#f0a04b", plasma:"#ec6fb2", steam:"#a9c4d6", swamp:"#7f9a5a", ice:"#9fdcf2", storm:"#7b8cf0", sand:"#d8c08a", metal:"#a3acb9", tempest:"#a6e07a",
  geyser:"#d68f74", mirage:"#f0c896", aurora:"#b48af5", ash:"#a59089", forge:"#c7703f", solar:"#ffd86a", glacier:"#7ea9e0", quicksilver:"#cfd4ee", hurricane:"#4fb0c6", glass:"#bdeee6" };
function artPalette(el){
  if (ART_PAL[el]) return ART_PAL[el];
  const base = CONF_BASE[el] || "#a99a8c", parents = (CONFLUENCE_SAFE[el] || []).map(p => ART_PAL[p]).filter(Boolean);
  const p2 = parents[1] || parents[0] || ART_PAL.fire;
  ART_PAL[el] = { base, dark:mix(base,"#140c10",.42), light:mix(base,"#ffffff",.5), glow:mix(p2.light,"#ffffff",.35), eye:"#fffbe8",
    bg:mix(mix(parents[0] ? parents[0].bg : "#221c2a", p2.bg, .5), base, .08), accent:mix(p2.base, "#1a1626", .55) };
  return ART_PAL[el];
}
function roleFill(role, P){
  switch (role){
    case "base": return `fill="${P.base}"`;
    case "dark": return `fill="${P.dark}"`;
    case "light": return `fill="${P.light}"`;
    case "glow": return `fill="${P.glow}"`;
    case "eye": return `fill="${P.eye}"`;
    case "ink": return `fill="#15111a"`;
    case "accent": return `fill="${P.accent}"`;
    case "cloth": return `fill="${P.cloth||P.base}"`;
    case "cloth2": return `fill="${P.cloth2||P.dark}"`;
    case "metal": return `fill="${P.metal||P.light}"`;
    case "far": return `fill="${P.far||P.bg}"`;
    case "far2": return `fill="${P.far2||P.bg}"`;
    case "deep": return `fill="${P.deep||"#000"}"`;
    case "sky": return `fill="${P.sky||P.bg}"`;
    case "shade": return `fill="#000" fill-opacity=".2"`;
    case "halo": return `fill="${P.base}" fill-opacity=".13"`;
    case "soft": return `fill="${P.light}" fill-opacity=".35"`;
    case "ground": return `fill="#000" fill-opacity=".28"`;
    default: return `fill="${P.base}"`;
  }
}
// Per-card palette variation: a tint on the element colours, a darker or warmer sky, and a cloth colour for clothing.
const TONES = [[null,0],[null,0],["#ffb070",.18],["#7aa8ff",.16],["#ffffff",.16],["#000000",.16],["#ff6fa8",.12],["#9cff9c",.1]];
const SKY_TONES = [[null,0],["#000000",.35],["#2a3a6a",.28],["#6a2a3a",.22],["#ffffff",.07],["#0a2a2a",.25]];
function varyPalette(P0, R){
  const [tint, t] = pick(R, TONES), tw = c => tint ? mix(c, tint, t) : c;
  const [sk, st] = pick(R, SKY_TONES), bg = sk ? mix(P0.bg, sk, st) : P0.bg;
  const cloth = pick(R, [P0.base, P0.dark, "#5b4a7a", "#3f6a8a", "#8a3f4a", "#4a7a52", "#c9a86a", "#6a6f80", "#2c2a3a", P0.accent, mix(P0.base,"#ffffff",.3), "#b8b0a0"]);
  return { base:tw(P0.base), dark:tw(P0.dark), light:tw(P0.light), glow:P0.glow, eye:P0.eye, accent:P0.accent,
    bg, far:mix(bg, P0.base, .24), far2:mix(bg, P0.base, .12), deep:mix(bg, "#000000", .38), sky:mix(bg, P0.light, .12),
    cloth, cloth2:mix(cloth, "#000000", .32), metal:pick(R, ["#c9ced6", P0.light, "#e0c27a", "#9aa4b4"]) };
}
function renderDrawing(D, P){ return D.list.map(e => e[0]==="g" ? `<g transform="${e[1]}">${renderDrawing(e[2], P)}</g>` : `<path d="${e[1]}" ${roleFill(e[0], P)}/>`).join(""); }

/* ---- words ---- */
function artWords(d){ return d.name.toLowerCase().replace(/'s\b/g,"").replace(/[^a-z\s-]/g,"").split(/[\s-]+/).filter(Boolean); }
const wordSet = s => new Set(s.split(" "));
const W = {
  dragon: wordSet("dragon drake wyrm wyvern"),
  phoenix: wordSet("phoenix"),
  bird: wordSet("hawk falcon eagle roc crow sparrow gull gullcaller kestrel harrier raptor gyrfalcon peregrine kite thunderbird bird owl griffin flock feather"),
  serpent: wordSet("serpent leviathan naga eel wurm basilisk"),
  hydra: wordSet("hydra"),
  kraken: wordSet("kraken octopus"),
  crab: wordSet("crab"),
  turtle: wordSet("tortoise turtle"),
  fish: wordSet("narwhal fish shark whale"),
  bug: wordSet("beetle mite scarab spider"),
  beast: wordSet("hound wolf boar rhino lion ram otter lynx raiju bear stag tiger fox dog cat mole"),
  tree: wordSet("treant sapling sprout grove tree ironwood oak willow"),
  golem: wordSet("golem homunculus construct automaton juggernaut sentinel colossus behemoth"),
  giant: wordSet("giant titan ogre troll brute"),
  spirit: wordSet("elemental spirit wisp sprite imp djinn phantom wraith shade ghost ooze muck"),
  swarm: wordSet("swarm legion host army"),
  tower: wordSet("tower spire obelisk totem lighthouse"),
  coil: wordSet("coil rod battery engine reactor conduit capacitor dynamo"),
  wall: wordSet("wall walls barricade fortress citadel rampart ramparts bastion bulwark"),
  throne: wordSet("throne crown"),
  altar: wordSet("altar shrine temple sanctuary"),
  fire: wordSet("hearth brazier furnace forge foundry kiln bonfire"),
  book: wordSet("tome archive library scroll codex"),
  pool: wordSet("pool spring lagoon well wellspring fountain"),
  cloud: wordSet("cloud clouds palace sky skies"),
  mountain: wordSet("volcano caldera mountain mountains peaks dune dunes desert"),
  crystal: wordSet("crystal crystals geode gem"),
  garden: wordSet("grove garden bloom roots field"),
};
const PLACE_KEYS = ["tower","coil","wall","throne","altar","fire","book","pool","cloud","mountain","crystal","garden"];
const ROLE = [
  ["blade", "knight champion warrior berserker duelist raider soldier guard guardian warden captain swordsman paladin legionnaire fighter"],
  ["polearm", "lancer lance charger spear spearman"],
  ["caster", "mage sage shaman oracle priest priestess acolyte apprentice adept caller druid witch geomancer archmage weaver pyromancer hydromancer wizard conjurer seer mystic elder savant"],
  ["scholar", "scholar student"],
  ["rogue", "assassin rogue pirate thief"],
  ["thrower", "hurler thrower"],
  ["smith", "smith engineer welder"],
  ["royal", "queen empress emperor sovereign matriarch patriarch lord herald chosen ruler king"],
  ["brawler", "monk dancer acrobat brawler zealot martyr"],
  ["runner", "courier runner messenger scout rider strider wanderer hopper diver"],
  ["healer", "healer tender keeper"],
];
const ROLE_MAP = new Map(); for (const [k, ws] of ROLE) for (const w of ws.split(" ")) ROLE_MAP.set(w, k);
function artSubject(d, words){
  let fig = null, role = null;
  for (let i=words.length-1; i>=0; i--){
    const w = words[i];
    if (!role && ROLE_MAP.has(w)) role = ROLE_MAP.get(w);
    if (fig) continue;
    for (const k of Object.keys(W)){
      if (!W[k].has(w)) continue;
      if (PLACE_KEYS.includes(k) && i!==words.length-1) continue;
      fig = k; break;
    }
  }
  if (d.type!=="creature" && fig && !PLACE_KEYS.includes(fig)) fig = null;
  if (d.type==="creature" && !fig) fig = "human";
  return { fig, role };
}
function artEffect(d){
  const t = (d.text||"").toLowerCase();
  if (d.counter || /\bcounter\b/.test(t)) return "counter";
  if (/destroy/.test(t)) return "destroy";
  if (/freeze/.test(t)) return "freeze";
  if (/every enemy creature|every creature/.test(t) && /damage/.test(t)) return "nova";
  if (/damage/.test(t)) return "bolt";
  if (/return/.test(t)) return "bounce";
  if (/summon/.test(t)) return "summon";
  if (/\+\d+\/\+\d+|gets? \+|gain (haste|pierce|airborne|ward)/.test(t)) return "buff";
  if (/draw/.test(t)) return "draw";
  if (/gain \d+ life|heal/.test(t)) return "heal";
  if (/energy|charge/.test(t)) return "orb";
  return "rune";
}

/* ---- people ---- */
function pose(kind, x, s, R, sy=1){
  const j = (dx, dy) => [x + dx*s, GY - dy*s*sy];
  const wob = () => (R()-0.5)*3;
  switch (kind){
    case "run": return { head:j(4,41), neck:j(3,35), hip:j(0,18), kL:j(-6,10), fL:j(-14,2), kR:j(7,12), fR:j(10,0), eL:j(-6,28), hL:j(-10,22), eR:j(10,31), hR:j(16,36) };
    case "jump": return { head:j(0,48), neck:j(0,42), hip:j(0,26), kL:j(-8,20), fL:j(-6,10), kR:j(8,18), fR:j(12,12), eL:j(-9,48), hL:j(-14,56), eR:j(9,48), hR:j(14,56) };
    case "cast": return { head:j(-1,43), neck:j(-1,37), hip:j(0,18), kL:j(-4,9), fL:j(-8,0), kR:j(4,9), fR:j(8,0), eL:j(4,34+wob()), hL:j(13,38), eR:j(6,30), hR:j(15,32) };
    case "guard": return { head:j(-2,43), neck:j(-1,37), hip:j(0,18), kL:j(-7,10), fL:j(-11,0), kR:j(6,9), fR:j(12,0), eL:j(5,30), hL:j(11,28), eR:j(-6,30), hR:j(-6,22) };
    case "kneel": return { head:j(0,35), neck:j(0,29), hip:j(0,13), kL:j(-9,8), fL:j(-12,0), kR:j(5,2), fR:j(-3,0), eL:j(-7,24), hL:j(-10,18), eR:j(8,24), hR:j(14,28) };
    case "swing": return { head:j(1,43), neck:j(0,37), hip:j(0,18), kL:j(-6,9), fL:j(-10,0), kR:j(6,9), fR:j(10,0), eL:j(-8,30), hL:j(-12,24), eR:j(6,44), hR:j(2,52) };
    case "point": return { head:j(0,43), neck:j(0,37), hip:j(0,18), kL:j(-4,9), fL:j(-7,0), kR:j(4,9), fR:j(7,0), eL:j(-6,28), hL:j(-6,20), eR:j(9,35), hR:j(18,36) };
    case "hips": return { head:j(0,43), neck:j(0,37), hip:j(0,18), kL:j(-5,9), fL:j(-8,0), kR:j(5,9), fR:j(8,0), eL:j(-8,28), hL:j(-2,22), eR:j(8,28), hR:j(2,22) };
    case "lunge": return { head:j(10,36), neck:j(8,30), hip:j(0,15), kL:j(-10,8), fL:j(-18,0), kR:j(10,10), fR:j(16,0), eL:j(-4,24), hL:j(-12,20), eR:j(16,30), hR:j(24,32) };
    case "float": return { head:j(0,52), neck:j(0,46), hip:j(0,30), kL:j(-3,22), fL:j(-2,14), kR:j(4,22), fR:j(6,16), eL:j(-10,40), hL:j(-16,44), eR:j(10,40), hR:j(16,44) };
    case "crouch": return { head:j(6,30), neck:j(4,25), hip:j(-2,13), kL:j(-10,14), fL:j(-12,0), kR:j(8,10), fR:j(8,0), eL:j(-4,18), hL:j(-6,8), eR:j(12,22), hR:j(18,18) };
    case "cheer": return { head:j(0,43), neck:j(0,37), hip:j(0,18), kL:j(-5,9), fL:j(-9,0), kR:j(5,9), fR:j(9,0), eL:j(-10,44), hL:j(-12,52), eR:j(10,44), hR:j(12,52) };
    default: return { head:j(0,43), neck:j(0,37), hip:j(0,18), kL:j(-4,9), fL:j(-7,0), kR:j(4,9), fR:j(7,0), eL:j(-7,30), hL:j(-10,23+wob()), eR:j(8,31), hR:j(12,26+wob()) };
  }
}
function headwear(D, kind, hx, hy, r, R){
  switch (kind){
    case "helm": D("dark", poly([[hx-r*1.05,hy+1],[hx-r*0.8,hy-r*0.9],[hx,hy-r*1.35],[hx+r*0.8,hy-r*0.9],[hx+r*1.05,hy+1]]))("light", tri([hx-1,hy-r*1.3],[hx+r*1.6,hy-r*2.1],[hx+2,hy-r*0.9])); break;
    case "hood": D("dark", poly([[hx-r*1.4,hy+r*1.4],[hx-r*1.2,hy-r*0.6],[hx,hy-r*1.7],[hx+r*1.2,hy-r*0.6],[hx+r*1.4,hy+r*1.4]])); break;
    case "wizard": D("dark", rect(hx-r*1.5, hy-r*0.95, r*3, r*0.4))("dark", tri([hx-r*0.9,hy-r*0.9],[hx+r*0.4,hy-r*3.2],[hx+r*0.9,hy-r*0.9]))("glow", star(hx,hy-r*1.7,r*0.35,r*0.15,4)); break;
    case "horns": D("light", tri([hx-r*0.7,hy-r*0.6],[hx-r*1.3,hy-r*1.9],[hx-r*0.2,hy-r*0.9]))("light", tri([hx+r*0.7,hy-r*0.6],[hx+r*1.3,hy-r*1.9],[hx+r*0.2,hy-r*0.9])); break;
    case "crown": D("glow", poly([[hx-r*0.9,hy-r*0.7],[hx-r*0.9,hy-r*1.6],[hx-r*0.45,hy-r*1.15],[hx,hy-r*1.8],[hx+r*0.45,hy-r*1.15],[hx+r*0.9,hy-r*1.6],[hx+r*0.9,hy-r*0.7]])); break;
    case "hair": D("dark", poly([[hx-r*1.1,hy+r*1.8],[hx-r*1.2,hy-r*0.3],[hx-r*0.4,hy-r*1.15],[hx+r*0.6,hy-r*1.1],[hx+r*1.2,hy-r*0.2],[hx+r*1.1,hy+r*1.8]])); break;
    case "beard": D("light", poly([[hx-r*0.8,hy+r*0.3],[hx+r*0.8,hy+r*0.3],[hx,hy+r*1.7]])); break;
    case "halo": D("glow", ell(hx, hy-r*1.45, r*1.1, r*0.3))("base", ell(hx, hy-r*1.45, r*0.75, r*0.14)); break;
    case "band": D("light", rect(hx-r, hy-r*0.55, r*2, r*0.38))("light", tri([hx-r,hy-r*0.5],[hx-r*2,hy],[hx-r*1.6,hy-r*0.8])); break;
    case "mask": D("ink", rect(hx-r*0.95, hy-r*0.35, r*1.9, r*0.5)); break;
    case "fire": D("light", poly([[hx-r,hy-r*0.4],[hx-r*0.9,hy-r*1.6],[hx-r*0.4,hy-r*1.1],[hx-r*0.1,hy-r*2.2],[hx+r*0.3,hy-r*1.2],[hx+r*0.8,hy-r*1.9],[hx+r,hy-r*0.4]]))("glow", tri([hx-r*0.4,hy-r*0.8],[hx-r*0.05,hy-r*1.7],[hx+r*0.3,hy-r*0.8])); break;
    case "spiky": D("light", poly([[hx-r*1.1,hy-r*0.3],[hx-r*1.4,hy-r*1.3],[hx-r*0.6,hy-r*1.05],[hx-r*0.3,hy-r*1.9],[hx+r*0.2,hy-r*1.1],[hx+r*0.9,hy-r*1.7],[hx+r*0.8,hy-r*0.9],[hx+r*1.5,hy-r*0.9],[hx+r*1.1,hy-r*0.3]])); break;
    case "crown2": D("metal", rect(hx-r*0.9, hy-r*1.1, r*1.8, r*0.4))("glow", ngon(hx, hy-r*0.9, r*0.2, 4)); break;
    case "bun": D("dark", circ(hx-r*0.2, hy-r*1.25, r*0.55))("dark", poly([[hx-r,hy-r*0.2],[hx-r*0.6,hy-r*1],[hx+r*0.6,hy-r*1],[hx+r,hy-r*0.2]])); break;
    case "plume": D("metal", poly([[hx-r*1.05,hy+1],[hx-r*0.8,hy-r*0.9],[hx,hy-r*1.3],[hx+r*0.8,hy-r*0.9],[hx+r*1.05,hy+1]]))("cloth", poly([[hx-2,hy-r*1.2],[hx-r*1.8,hy-r*2.4],[hx-r*0.6,hy-r*2.2],[hx+2,hy-r*1.3]])); break;
    case "cap": D("cloth", poly([[hx-r*1.1,hy-r*0.3],[hx-r*0.7,hy-r*1.1],[hx+r*0.7,hy-r*1.1],[hx+r*1.1,hy-r*0.3]]))("cloth2", rect(hx, hy-r*0.5, r*1.7, r*0.3)); break;
    case "spikes2": D("dark", poly([[hx-r,hy-r*0.5],[hx-r*0.7,hy-r*1.6],[hx-r*0.3,hy-r*0.9],[hx,hy-r*1.9],[hx+r*0.3,hy-r*0.9],[hx+r*0.7,hy-r*1.6],[hx+r,hy-r*0.5]])); break;
  }
}
function hold(D, kind, hx, hy, d, s){
  const k = s/2;   // scale relative to a full-size person
  const P = (x,y) => [hx + x*d*k, hy + y*k];
  switch (kind){
    case "sword": D("light", poly([P(-2,0),P(5,-30),P(9,-29),P(3,0)]))("dark", quad(P(-6,-1),P(9,-3),4))("dark", quad(P(0,0),P(-2,7),4)); break;
    case "greatsword": D("light", poly([P(-3,4),P(12,-40),P(17,-40),P(16,-34),P(3,5)]))("dark", quad(P(-8,-2),P(11,-6),5))("dark", quad(P(0,4),P(-3,12),5)); break;
    case "axe": D("dark", quad(P(0,10),P(6,-28),4))("light", poly([P(3,-26),P(18,-32),P(20,-16),P(5,-14)])); break;
    case "spear": D("dark", quad(P(-16,16),P(26,-26),3.5))("light", tri(P(22,-22),P(36,-36),P(27,-18))); break;
    case "trident": D("dark", quad(P(0,22),P(0,-26),3.5))("light", poly([P(-9,-24),P(9,-24),P(9,-36),P(6,-36),P(6,-28),P(1.5,-28),P(1.5,-40),P(-1.5,-40),P(-1.5,-28),P(-6,-28),P(-6,-36),P(-9,-36)])); break;
    case "staff": D("dark", quad(P(0,40),P(0,-28),4))("glow", ngon(hx, hy-33*k, 6*k, 6)); break;
    case "crook": D("dark", quad(P(0,40),P(0,-22),4))("dark", poly([P(-2,-22),P(-2,-34),P(12,-34),P(12,-26),P(8,-26),P(8,-30),P(2,-30),P(2,-22)])); break;
    case "wand": D("dark", quad(P(0,0),P(12,-16),3))("glow", star(hx+15*d*k, hy-19*k, 6*k, 2.5*k, 4)); break;
    case "book": D("light", poly([P(-3,-10),P(9,-6),P(9,10),P(-3,6)]))("base", poly([P(9,-6),P(21,-10),P(21,6),P(9,10)])); break;
    case "dagger": D("light", tri(P(0,-2),P(14,-14),P(4,4)))("dark", quad(P(-2,-4),P(3,3),3)); break;
    case "rock": D("dark", ngon(hx+6*d*k, hy-10*k, 9*k, 6, 0.3)); break;
    case "hammer": D("dark", quad(P(0,6),P(6,-24),4))("light", rect(hx+(d>0?-4:-16)*k, hy-34*k, 20*k, 12*k)); break;
    case "mace": D("dark", quad(P(0,6),P(6,-20),4))("light", star(hx+6*d*k, hy-26*k, 9*k, 5*k, 8)); break;
    case "bow": D("dark", poly([P(0,-24),P(14,-12),P(16,0),P(14,12),P(0,24),P(10,10),P(11,0),P(10,-10)]))("light", quad(P(0,-24),P(0,24),1.5))("light", quad(P(-4,0),P(28,0),2))("light", tri(P(28,-3),P(34,0),P(28,3))); break;
    case "shield": D("light", poly([P(0,-14),P(14,-14),P(14,2),P(7,12),P(0,2)]))("dark", ngon(hx+7*d*k, hy-4*k, 3*k, 4)); break;
    case "round": D("light", circ(hx+4*d*k, hy, 12*k))("dark", circ(hx+4*d*k, hy, 4*k)); break;
    case "torch": D("dark", quad(P(0,8),P(2,-16),4))("light", poly([P(-6,-16),P(-3,-30),P(2,-24),P(4,-36),P(9,-16)]))("glow", tri(P(-2,-16),P(2,-28),P(5,-16))); break;
    case "lantern": D("dark", quad(P(0,0),P(0,6),2))("light", rect(hx-6*k, hy+6*k, 12*k, 14*k))("glow", rect(hx-3*k, hy+9*k, 6*k, 8*k)); break;
    case "orb": D("glow", circ(hx+4*d*k, hy-8*k, 8*k))("light", circ(hx+2*d*k, hy-10*k, 3*k)); break;
    case "banner": D("dark", quad(P(0,28),P(0,-40),3.5))("light", poly([P(1,-40),P(26,-34),P(18,-26),P(26,-18),P(1,-22)])); break;
    case "whip": D("dark", quad(P(0,0),P(6,-8),4))("dark", quad(P(6,-8),P(22,-18),3,2.5))("dark", quad(P(22,-18),P(34,-6),2.5,2))("dark", quad(P(34,-6),P(30,14),2,1.4)); break;
    case "scythe": D("dark", quad(P(0,24),P(4,-32),4))("light", poly([P(4,-32),P(-26,-28),P(-34,-14),P(-20,-24),P(4,-26)])); break;
    case "fist": D("base", rect(hx-4*k, hy-4*k, 8*k, 8*k))("light", tri(P(8,-6),P(16,-8),P(12,-2))); break;
    case "spark": D("glow", star(hx+10*d*k, hy-12*k, 8*k, 3*k, 4)); break;
  }
}
const ROLE_GEAR = {
  blade:[["sword","shield"],["greatsword",null],["axe","round"],["sword","sword"],["mace","shield"],["axe",null]],
  polearm:[["spear","round"],["spear",null],["trident",null],["banner",null]],
  caster:[["staff",null],["wand","book"],["staff","orb"],["crook",null],["wand","spark"],[null,"orb"],["spark","spark"]],
  scholar:[["book",null],["book","lantern"],["wand","book"],["lantern",null]],
  rogue:[["dagger","dagger"],["dagger",null],["bow",null],["whip",null],["scythe",null]],
  thrower:[["rock",null],["rock","rock"],["spear",null]],
  smith:[["hammer",null],["hammer","torch"],["hammer","shield"]],
  royal:[["sword",null],["crook",null],["orb",null],["banner",null],["staff","orb"]],
  brawler:[["fist","fist"],[null,null],["fist",null],["whip",null]],
  runner:[[null,null],["lantern",null],["banner",null],["torch",null]],
  healer:[["crook",null],["lantern",null],["staff",null],["orb",null]],
  none:[[null,null],["sword",null],["staff",null],["torch",null],["spear",null],["bow",null],["axe",null],["lantern",null],[null,"shield"],["mace",null]],
};
const ROLE_POSES = { blade:["stand","swing","guard","run","hips"], polearm:["stand","guard","run","point"], caster:["cast","stand","point","jump"],
  scholar:["stand","kneel","cast"], rogue:["run","kneel","jump","stand"], thrower:["swing","point","stand"], smith:["swing","stand","kneel"],
  royal:["stand","hips","point"], brawler:["jump","run","guard","swing"], runner:["run","jump"], healer:["kneel","cast","stand"], none:["stand","run","point","hips","guard","kneel","swing"] };
const EL_HAIR = { fire:"fire", lightning:"spiky", water:"hair", earth:"helm", wind:"band" };
function artPerson(D, x, R, o){
  const role = o.role || "none";
  const build = o.build || pick(R, ["normal","normal","slim","broad","stout","tall","short"]);
  const s = 2*(o.scale || 1) * (build==="short" ? 0.88 : 1), sy = build==="tall" ? 1.12 : build==="stout" ? 0.92 : 1;
  const kind = o.pose || pick(R, ROLE_POSES[role]);
  const P = pose(kind, x, s, R, sy);
  const lw = 3.2*s*(build==="slim"?0.8:build==="stout"||build==="broad"?1.2:1), hr = 5.2*s, [hx,hy] = P.head;
  const robe = o.robe ?? ((role==="caster"||role==="healer"||role==="royal") && !["run","jump","lunge","crouch"].includes(kind) && R()<0.55);
  const broad = o.broad ?? (build==="broad" || build==="stout");
  const torsoRole = R()<0.55 ? "cloth" : "base", limbRole = torsoRole==="cloth" && R()<0.5 ? "cloth" : "base";
  const sh = [P.neck[0], P.neck[1]+1.5*s];
  let head = o.head;
  if (!head){
    const opts = ["none","none", EL_HAIR[o.el]||"none", "hood","helm","hair","beard","band","mask","halo","horns","crown2","bun","plume","cap","spikes2"];
    head = role==="royal" ? pick(R, ["crown","crown","plume"]) : role==="caster" ? pick(R, ["wizard","hood","beard","halo", EL_HAIR[o.el]||"hood","bun"]) : pick(R, opts);
  }
  if (o.cape || R()<0.25) D(pick(R,["cloth2","dark"]), poly([[sh[0]-3*s,sh[1]],[sh[0]+2*s,sh[1]],[P.hip[0]-2*s+(R()-0.5)*6*s,GY-4*s],[P.hip[0]-13*s,GY-2*s]]));
  if (head==="hood"||head==="hair") headwear(D, head, hx, hy, hr, R);
  if (!robe) D("dark", quad(P.hip, P.kL, lw*1.05, lw*0.9))("dark", quad(P.kL, P.fL, lw*0.9, lw*0.75))("dark", rect(P.fL[0]-2.5*s, P.fL[1]-1.2*s, 5*s, 2.4*s));
  D("dark", quad(sh, P.eL, lw*0.85, lw*0.75))("dark", quad(P.eL, P.hL, lw*0.75, lw*0.65));
  const sw = (broad ? 7.5 : build==="slim" ? 4.6 : 5.5)*s, hw = (broad ? 4.8 : 3.6)*s;
  if (robe){
    D(torsoRole, poly([[sh[0]-sw*0.8,sh[1]],[sh[0]+sw*0.8,sh[1]],[P.hip[0]+hw+8*s,GY],[P.hip[0]-hw-8*s,GY]]))("shade", poly([[sh[0],sh[1]],[sh[0]+sw*0.8,sh[1]],[P.hip[0]+hw+8*s,GY],[P.hip[0],GY]]));
    if (R()<0.5) D("light", quad([P.hip[0],sh[1]+2*s],[P.hip[0],GY],2.4*s));
  } else {
    D(torsoRole, poly([[sh[0]-sw,sh[1]],[sh[0]+sw,sh[1]],[P.hip[0]+hw,P.hip[1]],[P.hip[0]-hw,P.hip[1]]]))("shade", poly([[sh[0],sh[1]],[sh[0]+sw,sh[1]],[P.hip[0]+hw,P.hip[1]],[P.hip[0],P.hip[1]]]));
    if (build==="stout") D(torsoRole, ell(P.hip[0]+1*s, (sh[1]+P.hip[1])/2+3*s, sw*0.9, (P.hip[1]-sh[1])*0.45));
    const extra = R();
    if (extra < 0.25) D("cloth2", poly([[P.hip[0]-hw-1*s,P.hip[1]-2*s],[P.hip[0]+hw+1*s,P.hip[1]-2*s],[P.hip[0]+hw+4*s,P.hip[1]+7*s],[P.hip[0]-hw-4*s,P.hip[1]+7*s]]));   // tunic skirt
    else if (extra < 0.45) D("metal", tri([sh[0]-sw-2*s,sh[1]+3*s],[sh[0]-sw*0.3,sh[1]-1*s],[sh[0]-sw*0.4,sh[1]+4*s]))("metal", tri([sh[0]+sw+2*s,sh[1]+3*s],[sh[0]+sw*0.3,sh[1]-1*s],[sh[0]+sw*0.4,sh[1]+4*s]));   // pauldrons
    else if (extra < 0.6) D("cloth2", quad([sh[0]-sw,sh[1]+1*s],[P.hip[0]+hw,P.hip[1]-3*s],2.4*s));   // sash
    else if (extra < 0.72) D("light", poly([[sh[0]-sw*0.7,sh[1]],[sh[0]+sw*0.7,sh[1]],[sh[0]+1*s,sh[1]+6*s],[sh[0]-1*s,sh[1]+6*s]]));   // collar
  }
  D(R()<0.5 ? "light" : "dark", rect(P.hip[0]-hw-0.5*s, P.hip[1]-3*s, 2*hw+1*s, 2*s));
  if (!robe) D(limbRole, quad(P.hip, P.kR, lw*1.05, lw*0.9))(limbRole, quad(P.kR, P.fR, lw*0.9, lw*0.75))("dark", rect(P.fR[0]-2.5*s, P.fR[1]-1.2*s, 5*s, 2.4*s));
  D(limbRole, quad(sh, P.eR, lw*0.85, lw*0.75))("base", quad(P.eR, P.hR, lw*0.75, lw*0.65));
  const shape = o.headShape || pick(R, ["hex","hex","oct","round","square","diamond"]);
  if (shape==="round") D("base", circ(hx, hy, hr));
  else if (shape==="square") D("base", rect(hx-hr*0.9, hy-hr*0.95, hr*1.8, hr*1.9));
  else if (shape==="diamond") D("base", poly([[hx,hy-hr*1.15],[hx+hr*0.95,hy],[hx,hy+hr*1.15],[hx-hr*0.95,hy]]));
  else D("base", ngon(hx, hy, hr*1.08, shape==="hex"?6:8, shape==="hex"?-Math.PI/2:Math.PI/8));
  D("shade", poly([[hx,hy-hr],[hx+hr,hy-hr*0.5],[hx+hr,hy+hr*0.5],[hx,hy+hr]]));
  const ey = hy - hr*0.1, ew = hr*0.32, eyes = pick(R, ["tri","tri","dot","slit"]);
  if (head!=="mask"){
    if (eyes==="dot") D("eye", ngon(hx-hr*0.35, ey, hr*0.18, 6))("eye", ngon(hx+hr*0.35, ey, hr*0.18, 6));
    else if (eyes==="slit") D("eye", rect(hx-hr*0.6, ey-1, hr*0.45, 2))("eye", rect(hx+hr*0.15, ey-1, hr*0.45, 2));
    else D("eye", tri([hx-hr*0.6,ey-ew*0.4],[hx-hr*0.1,ey-ew*0.6],[hx-hr*0.2,ey+ew*0.5]))("eye", tri([hx+hr*0.6,ey-ew*0.4],[hx+hr*0.1,ey-ew*0.6],[hx+hr*0.2,ey+ew*0.5]));
  }
  if (head!=="hood"&&head!=="hair") headwear(D, head, hx, hy, hr, R);
  if (head==="mask") D("eye", rect(hx-hr*0.6, ey-1, hr*0.4, 2))("eye", rect(hx+hr*0.2, ey-1, hr*0.4, 2));
  if (o.horns) headwear(D, "horns", hx, hy, hr, R);
  const [main, off] = o.gear || pick(R, ROLE_GEAR[role]);
  if (main) hold(D, main, P.hR[0], P.hR[1], 1, s);
  if (off) hold(D, off, P.hL[0], P.hL[1], -1, s);
  return P;
}

/* ---- creatures ---- */
function artBeast(D, x, R, words){
  const has = w => words.includes(w);
  const big = has("bear")||has("rhino")||has("boar") ? 1.15 : has("mole")||has("otter")||has("fox") ? 0.82 : 1;
  const stance = pick(R, ["stand","charge","sit","howl","prowl"]);
  const by = stance==="sit" ? 86 : stance==="prowl" ? 90 : 80;
  const bl = 32*big, bh = 14*big, lw = 7*big;
  const hx = x + bl + 6, hy = stance==="howl" ? by-30 : stance==="sit" ? by-22 : by-14;
  const tx = x - bl + 2, ty = by - 4, tail = pick(R, ["thin","bushy","curl","stub"]);
  if (tail==="bushy") D("dark", poly([[tx,ty],[tx-22,ty-10],[tx-28,ty-30],[tx-12,ty-18],[tx+2,ty-8]]));
  else if (tail==="curl") D("dark", poly([[tx,ty],[tx-16,ty-2],[tx-20,ty-16],[tx-10,ty-22],[tx-12,ty-12],[tx+2,ty-8]]));
  else if (tail==="stub") D("dark", tri([tx,ty-4],[tx-8,ty-10],[tx+2,ty+2]));
  else D("dark", quad([tx,ty],[tx-14,ty-26],5,2));
  if (stance==="sit"){
    D("dark", quad([x+bl-12,by+6],[x+bl-12,GY],lw))
    ("base", poly([[x-bl+8,by+12],[x-bl+14,by-8],[x+bl-4,by-26],[x+bl+4,by-10],[x+bl,by+14]]))("shade", poly([[x-bl+8,by+12],[x+bl,by+14],[x+bl+2,by+2],[x-bl+10,by+4]]))
    ("base", quad([x+bl-2,by+6],[x+bl,GY],lw))("dark", poly([[x-bl+2,by+14],[x-bl-6,GY],[x+4,GY],[x+8,by+14]]));
  } else {
    const L = stance==="charge" ? [[-24,-40],[-12,-4],[12,0],[22,40]] : stance==="prowl" ? [[-24,-28],[-12,-16],[12,8],[22,24]] : [[-24,-26],[-12,-12],[12,12],[22,26]];
    const leg = (role, a, b) => { const top = [x+a*big, by+6], mid = [x+(a+b)/2*big, (by+GY)/2+6], ft = [x+b*big, GY-2]; D(role, quad(top, mid, lw, lw*0.85))(role, quad(mid, ft, lw*0.85, lw*0.7)); };
    leg("dark", L[1][0], L[1][1]); leg("dark", L[3][0], L[3][1]);
    D("base", poly([[x-bl,by],[x-bl*0.6,by-bh],[x+bl*0.6,by-bh-2],[x+bl,by-4],[x+bl*0.6,by+bh],[x-bl*0.6,by+bh]]))
     ("shade", poly([[x-bl,by],[x+bl,by-4],[x+bl*0.6,by+bh],[x-bl*0.6,by+bh]]));
    if (R()<0.5) D("light", poly([[x-bl*0.4,by+bh-3],[x+bl*0.5,by+bh-3],[x+bl*0.3,by+bh],[x-bl*0.3,by+bh]]));
    leg("base", L[0][0], L[0][1]); leg("base", L[2][0], L[2][1]);
  }
  D("base", quad([x+bl-8, by-6], [hx-4, hy+4], 14*big, 10*big));
  if (has("lion")||has("raiju")) D("dark", star(hx, hy, 22*big, 14*big, 10, R()));
  const snout = has("mole")||has("fox")||has("hound")||has("wolf")||has("dog") ? 14 : 8;
  if (has("hound")||has("wolf")||has("dog")||has("fox")||has("lynx")||has("tiger")||R()<0.3) D("dark", tri([hx-8,hy-6],[hx-6,hy-22],[hx-1,hy-8]))("dark", tri([hx+1,hy-8],[hx+6,hy-22],[hx+7,hy-4]));
  D("base", ngon(hx, hy, 11*big, 5, -Math.PI/2+0.3))
   ("base", poly([[hx+6,hy-6],[hx+8+snout,hy-1],[hx+8+snout,hy+5],[hx+4,hy+8]]))
   ("ink", tri([hx+6+snout,hy-1],[hx+9+snout,hy-1],[hx+9+snout,hy+2]))
   ("eye", ngon(hx+3, hy-3, 2.4, 4));
  if (has("rhino")) D("light", tri([hx+10,hy-4],[hx+22,hy-18],[hx+18,hy+1]));
  if (has("boar")) D("light", tri([hx+10,hy+4],[hx+18,hy-4],[hx+14,hy+6]))("dark", poly([[x-16,by-bh],[x-12,by-bh-8],[x-8,by-bh],[x-4,by-bh-8],[x,by-bh],[x+4,by-bh-8],[x+8,by-bh]]));
  if (has("ram")) D("light", poly([[hx-6,hy-8],[hx-16,hy-18],[hx-4,hy-26],[hx+4,hy-18],[hx-2,hy-14]]));
  if (has("stag")) D("light", poly([[hx-2,hy-10],[hx-6,hy-30],[hx-14,hy-36],[hx-6,hy-34],[hx-4,hy-40],[hx-2,hy-30],[hx+4,hy-38],[hx+2,hy-10]]));
  if (has("tiger")||has("lynx")) D("dark", poly([[x-14,by-bh],[x-10,by-bh],[x-12,by]]))("dark", poly([[x,by-bh-1],[x+4,by-bh-1],[x+2,by]]));
  if (stance==="howl") D("soft", tri([hx+14,hy-14],[hx+30,hy-26],[hx+32,hy-16]));
  if (stance==="charge") D("soft", rect(x-bl-34, by-12, 20, 3))("soft", rect(x-bl-38, by, 24, 3));
}
function artBird(D, x, R, o={}){
  const form = pick(R, ["soar","dive","perch","wingsup"]);
  if (form==="soar"){
    const up = R()*10;
    D("dark", poly([[x+4,56],[x+12,30-up],[x+44,14-up],[x+32,40],[x+22,58]]))
     ("dark", poly([[x-22,62],[x-50,74],[x-44,66],[x-56,68],[x-30,56]]))
     ("base", poly([[x-26,60],[x-6,50],[x+20,52],[x+30,60],[x+20,68],[x-8,70]]))
     ("base", poly([[x-6,58],[x-24,32-up],[x-66,22-up],[x-52,40],[x-60,48],[x-44,52],[x-50,60],[x-20,66]]))
     ("shade", poly([[x-26,60],[x+30,60],[x+20,68],[x-8,70]]));
    D("base", ngon(x+28,52,10,6))("light", tri([x+34,48],[x+50,53],[x+34,58]))("eye", ngon(x+30,50,2.4,4));
  } else if (form==="dive"){
    D("dark", poly([[x-14,40],[x-46,22],[x-40,34],[x-52,40],[x-12,52]]))
     ("base", poly([[x-16,28],[x-4,24],[x+18,70],[x+10,86],[x-4,70]]))
     ("base", poly([[x-6,40],[x+30,14],[x+22,36],[x+40,32],[x+10,56]]))
     ("dark", poly([[x-16,28],[x-30,8],[x-24,26],[x-36,18],[x-22,32]]))
     ("base", ngon(x+16,88,10,6))("light", tri([x+18,96],[x+24,112],[x+12,98]))("eye", ngon(x+20,86,2.4,4));
  } else if (form==="perch"){
    D("dark", quad([x-50,106],[x+50,98],7))("dark", quad([x+36,100],[x+48,118],5))
     ("dark", poly([[x-12,84],[x-24,104],[x-14,106],[x-6,90]]))
     ("base", poly([[x-14,48],[x+12,46],[x+18,72],[x+6,96],[x-14,96],[x-20,72]]))
     ("shade", poly([[x+2,46],[x+12,46],[x+18,72],[x+6,96],[x+2,96]]))
     ("dark", poly([[x-12,56],[x-26,72],[x-22,98],[x-8,86]]))
     ("base", ngon(x+4,40,11,6))("light", tri([x+12,36],[x+26,42],[x+12,46]))("eye", ngon(x+7,37,2.4,4))
     ("dark", rect(x-6,96,4,6))("dark", rect(x+4,96,4,6));
  } else {
    D("dark", poly([[x+2,70],[x+22,30],[x+52,14],[x+38,40],[x+24,74]]))
     ("base", poly([[x-6,70],[x-26,36],[x-24,6],[x-12,30],[x+4,64]]))
     ("base", poly([[x-18,78],[x,66],[x+18,70],[x+20,84],[x,92],[x-16,88]]))
     ("shade", poly([[x-18,78],[x+20,78],[x+20,84],[x,92],[x-16,88]]))
     ("dark", poly([[x-18,82],[x-38,92],[x-32,80]]))
     ("base", ngon(x+22,64,10,6))("light", tri([x+28,60],[x+42,65],[x+28,70]))("eye", ngon(x+24,62,2.4,4))
     ("dark", quad([x-4,90],[x-8,108],4))("dark", quad([x+8,90],[x+10,108],4));
  }
  if (o.phoenix) D("light", poly([[x-30,70],[x-56,96],[x-40,94],[x-50,116],[x-26,92],[x-28,104],[x-14,80]]))("glow", tri([x-30,76],[x-44,98],[x-22,86]));
  if (o.crest) D("light", tri([x+20,44],[x+16,26],[x+28,40]));
  if (o.griffin) D("base", quad([x-10,72],[x-14,GY],7))("base", quad([x+10,72],[x+14,GY],7));
}
function breath(D, el, x, y){
  switch (el){
    case "water": D("light", poly([[x,y],[x+20,y-12],[x+44,y-6],[x+30,y],[x+50,y+10],[x+22,y+8]])); break;
    case "earth": D("dark", ngon(x+12,y-4,7,6,0.3))("light", ngon(x+30,y+6,6,5))("dark", ngon(x+46,y-6,5,6)); break;
    case "wind": D("light", poly([[x,y],[x+30,y-14],[x+50,y-6],[x+34,y-4],[x+44,y+6],[x+14,y+4]])); break;
    case "lightning": D("glow", poly([[x,y],[x+18,y-6],[x+12,y+2],[x+36,y-4],[x+26,y+6],[x+50,y+4],[x+28,y+12],[x+34,y+6],[x+14,y+10],[x+20,y+4]])); break;
    default: D("light", poly([[x,y],[x+22,y-14],[x+20,y-4],[x+46,y-10],[x+34,y+2],[x+52,y+8],[x+20,y+10]]))("glow", tri([x+4,y],[x+24,y-6],[x+20,y+6]));
  }
}
function artDragon(D, x, R, el){
  const form = pick(R, ["fly","rear","breath","coil"]);
  if (form==="coil"){
    D("dark", poly([[x-8,90],[x-36,52],[x-30,74],[x-60,66],[x-22,96]]))
     ("base", poly([[x-60,112],[x-30,92],[x,102],[x+24,86],[x+30,60],[x+40,62],[x+36,92],[x+6,112],[x-26,104],[x-48,118]]))
     ("shade", poly([[x-60,112],[x-26,104],[x+6,112],[x+36,92],[x+36,100],[x+6,120],[x-48,122]]))
     ("base", poly([[x+26,56],[x+46,50],[x+56,58],[x+44,64],[x+30,64]]))("eye", ngon(x+40,55,2.4,4))
     ("dark", tri([x+30,54],[x+26,38],[x+36,52]))("light", poly([[x-26,94],[x-22,86],[x-18,94],[x-10,86],[x-6,94]]));
    return;
  }
  const rear = form==="rear";
  const by = rear ? 80 : 70, hx = rear ? x+28 : x+38, hy = rear ? 30 : 42;
  D("dark", poly([[x+2,by-6],[x+10,by-38],[x+36,by-56],[x+30,by-32],[x+22,by-4]]))
   ("dark", poly([[x-20,by+10],[x-48,by+20],[x-66,by+14],[x-78,by+24],[x-82,by+12],[x-60,by+6],[x-22,by+2]]))
   ("dark", quad([x-14,by+12],[x-20,rear?GY:by+28],7))("dark", quad([x+12,by+12],[x+16,rear?GY:by+28],7))
   ("base", poly([[x-26,by+4],[x-10,by-10],[x+20,by-8],[x+30,by+2],[x+20,by+16],[x-14,by+16]]))
   ("shade", poly([[x-26,by+4],[x+30,by+2],[x+20,by+16],[x-14,by+16]]))
   ("base", quad([x+20,by-4],[hx-4,hy+6],12,8))
   ("base", poly([[x-10,by-6],[x-30,by-44],[x-60,by-54],[x-50,by-36],[x-74,by-30],[x-48,by-16],[x-56,by-6],[x-24,by+2]]))
   ("light", poly([[x-14,by-10],[x-10,by-18],[x-6,by-10],[x+2,by-18],[x+6,by-10],[x+14,by-18],[x+18,by-8]]))
   ("dark", tri([hx-4,hy-6],[hx-10,hy-20],[hx+2,hy-6]))("dark", tri([hx+2,hy-6],[hx+4,hy-22],[hx+8,hy-5]))
   ("base", poly([[hx-8,hy-6],[hx+12,hy-8],[hx+22,hy],[hx+8,hy+6],[hx-6,hy+6]]))("eye", ngon(hx+6,hy-3,2.4,4));
  if (form==="breath") breath(D, el, hx+22, hy+1);
}
function artSerpent(D, x, R, words){
  const form = pick(R, ["wave","coil","rise","hood"]);
  let seg = [];
  if (form==="coil") seg = [[-30,110],[-14,114],[4,112],[18,104],[14,92],[-4,90],[-18,96],[-10,84],[6,78],[18,70],[24,58]];
  else if (form==="rise") seg = [[-56,118],[-40,112],[-24,116],[-8,118],[4,108],[6,94],[-2,82],[0,68],[8,56],[12,44]];
  else { const a = 8 + R()*8; for (let i=0;i<9;i++) seg.push([-64+i*14, 104 + Math.sin(i*1.1)*a]); seg.push([60,80],[64,66]); }
  seg = seg.map(([dx,y]) => [x+dx, y]);
  seg.forEach(([sx,sy], i) => { const r = 6 + i*0.5; D(i%2 ? "base" : "dark", ngon(sx, sy, r, 6, i*0.4)); });
  const [hx,hy] = seg[seg.length-1];
  if (form==="hood" || words.includes("naga")) D("dark", poly([[hx-16,hy+14],[hx-12,hy-8],[hx,hy-14],[hx+12,hy-8],[hx+16,hy+14]]));
  D("base", poly([[hx-8,hy-8],[hx+10,hy-8],[hx+20,hy],[hx+10,hy+8],[hx-8,hy+6]]))("eye", ngon(hx+4,hy-3,2.4,4))("light", tri([hx+18,hy+2],[hx+28,hy+4],[hx+20,hy+6]));
  if (words.includes("leviathan")) seg.slice(1,6).forEach(([sx,sy]) => D("light", tri([sx-4,sy-6],[sx,sy-16],[sx+4,sy-6])));
  if (words.includes("basilisk")) D("light", poly([[hx-6,hy-8],[hx-4,hy-18],[hx,hy-10],[hx+4,hy-20],[hx+6,hy-8]]));
}
function artHydra(D, x, R){
  const n = R()<0.5 ? 3 : 5;
  D("dark", quad([x-16,108],[x-18,GY],8))("dark", quad([x+16,108],[x+18,GY],8))
   ("base", poly([[x-34,100],[x-20,84],[x+20,84],[x+34,100],[x+20,114],[x-20,114]]))("dark", quad([x-32,104],[x-56,118],9,3));
  for (let i=0;i<n;i++){
    const dx = -32 + i*64/(n-1), top = 24 + Math.abs(dx)*0.6 + R()*10, hx = x+dx;
    D(i%2 ? "dark" : "base", quad([x+dx/3,88],[hx,top+6],10,7))("base", poly([[hx-6,top-4],[hx+8,top-4],[hx+14,top+2],[hx+6,top+8],[hx-6,top+6]]))("eye", ngon(hx+3,top,2,4));
  }
}
function artKraken(D, x, R){
  const n = 4 + Math.floor(R()*3);
  for (let i=0;i<n;i++){ const sx = x-24+i*(48/(n-1)), w = (i%2?1:-1)*(10+R()*8);
    D(i%2 ? "dark" : "base", poly([[sx-4,64],[sx+4,64],[sx+w+3,90],[sx-w*0.6+2,112],[sx+w*0.5,120],[sx-w*0.6-2,112],[sx+w-3,90]])); }
  D("base", poly([[x-28,66],[x-26,36],[x-12,20],[x+12,20],[x+26,36],[x+28,66]]))("shade", poly([[x,20],[x+12,20],[x+26,36],[x+28,66],[x,66]]))
   ("eye", ngon(x-10,48,4,6))("eye", ngon(x+10,48,4,6))("ink", ngon(x-10,48,1.6,4))("ink", ngon(x+10,48,1.6,4));
  if (R()<0.5) D("soft", poly([[x-80,GY],[x-70,116],[x-60,GY],[x-50,116],[x-40,GY]]));
}
function artCrab(D, x, R){
  const up = R()<0.5;
  for (const sgn of [-1,1]) for (const k of [0,1,2]) D("dark", quad([x+sgn*(10+k*6),96],[x+sgn*(26+k*8),GY-2],4,3));
  if (up) D("base", poly([[x-22,88],[x-38,62],[x-30,40],[x-22,52],[x-18,38],[x-12,62]]))("base", poly([[x+22,88],[x+38,62],[x+30,40],[x+22,52],[x+18,38],[x+12,62]]));
  else D("base", poly([[x-24,92],[x-52,78],[x-50,64],[x-42,74],[x-40,62],[x-32,82]]))("base", poly([[x+24,92],[x+52,78],[x+50,64],[x+42,74],[x+40,62],[x+32,82]]));
  D("base", poly([[x-30,92],[x-20,78],[x+20,78],[x+30,92],[x+20,104],[x-20,104]]))("shade", poly([[x-30,92],[x+30,92],[x+20,104],[x-20,104]]))
   ("dark", quad([x-6,78],[x-8,66],3))("dark", quad([x+6,78],[x+8,66],3))("eye", ngon(x-8,64,3,6))("eye", ngon(x+8,64,3,6));
}
function artTurtle(D, x, R){
  D("dark", quad([x-24,100],[x-26,GY],9))("dark", quad([x+24,100],[x+26,GY],9))
   ("base", poly([[x+30,98],[x+46,86],[x+56,90],[x+50,100],[x+34,104]]))("eye", ngon(x+48,90,2.4,4))
   ("base", poly([[x-40,104],[x-34,78],[x-14,62],[x+14,62],[x+34,78],[x+40,104]]))
   ("dark", ngon(x,84,11,6))("dark", ngon(x-22,92,8,6))("dark", ngon(x+22,92,8,6))("light", rect(x-42,102,84,5));
  if (R()<0.5) D("light", tri([x-6,62],[x,48],[x+6,62]))("light", tri([x-24,72],[x-24,58],[x-14,66]));
}
function artFish(D, x, R, words){
  const jump = R()<0.5, y = jump ? 60 : 80;
  D("dark", poly([[x-40,y],[x-58,y-16],[x-54,y],[x-58,y+16]]))
   ("base", poly([[x-42,y],[x-14,y-18],[x+18,y-16],[x+34,y],[x+18,y+16],[x-14,y+16]]))
   ("shade", poly([[x-42,y],[x+34,y],[x+18,y+16],[x-14,y+16]]))
   ("dark", tri([x-6,y-17],[x+4,y-30],[x+10,y-16]))("eye", ngon(x+18,y-5,3,6));
  if (words.includes("narwhal")) D("light", quad([x+32,y-2],[x+66,y-18],4,1));
  D("soft", poly([[x-80,GY],[x-66,114],[x-52,GY],[x-38,114],[x-24,GY],[x-10,114],[x+4,GY],[x+18,114],[x+32,GY],[x+46,114],[x+60,GY]]));
  if (jump) D("light", tri([x-18,108],[x-14,98],[x-10,108]))("light", tri([x+18,106],[x+22,94],[x+26,106]));
}
function artBug(D, x, R){
  for (const dx of [-16,0,16]) D("dark", quad([x+dx,96],[x+dx-8,GY-2],4,3));
  D("base", poly([[x-30,90],[x-20,74],[x+16,74],[x+24,90],[x+16,106],[x-20,106]]))("shade", poly([[x-30,90],[x+24,90],[x+16,106],[x-20,106]]))
   ("base", ngon(x+30,86,10,6))("eye", ngon(x+33,82,2.4,4))("dark", quad([x+30,78],[x+40,62],3))("dark", quad([x+26,78],[x+30,62],3));
  if (R()<0.5) D("light", poly([[x-18,76],[x-6,52],[x+20,58],[x+10,76]]));
}
function artTree(D, x, R, words){
  const kind = words.includes("sprout")||words.includes("sapling") ? "sprout" : pick(R, ["oak","pine","willow","walker"]);
  if (kind==="sprout"){
    D("dark", quad([x,GY],[x+2,80],6,4))("base", poly([[x+2,94],[x-24,82],[x-30,90],[x-4,100]]))("light", poly([[x+2,84],[x+28,68],[x+32,78],[x+4,92]]))
     ("eye", ngon(x-4,108,2,4))("eye", ngon(x+6,108,2,4))("dark", poly([[x-26,GY],[x-14,116],[x+16,116],[x+28,GY]]));
    return;
  }
  if (kind==="pine"){
    D("dark", rect(x-6,100,12,24))("dark", poly([[x,58],[x-34,106],[x+34,106]]))("base", poly([[x,36],[x-28,80],[x+28,80]]))("light", poly([[x,14],[x-20,52],[x+20,52]]))
     ("shade", poly([[x,14],[x+20,52],[x,52]]))("shade", poly([[x,36],[x+28,80],[x,80]]))("eye", ngon(x-6,70,2.4,4))("eye", ngon(x+6,70,2.4,4));
    return;
  }
  if (kind==="willow"){
    D("dark", poly([[x-6,GY],[x-4,62],[x+4,62],[x+6,GY]]))("base", poly([[x-46,64],[x-30,30],[x,18],[x+30,30],[x+46,64]]));
    for (let i=0;i<6;i++){ const sx = x-40+i*16; D(i%2?"dark":"light", poly([[sx,56],[sx+8,56],[sx+6,96+R()*8],[sx+2,96+R()*8]])); }
    D("eye", ngon(x-5,82,2.4,4))("eye", ngon(x+5,82,2.4,4));
    return;
  }
  const legs = kind==="walker";
  if (legs) D("dark", quad([x-6,92],[x-22,GY],8,5))("dark", quad([x+6,92],[x+22,GY],8,5))("dark", quad([x-8,68],[x-36,80],7,4))("dark", quad([x+8,68],[x+36,60],7,4));
  else D("dark", poly([[x-14,GY],[x-6,64],[x+6,64],[x+14,GY]]))("dark", quad([x-4,74],[x-24,54],6,3))("dark", quad([x+4,70],[x+22,50],6,3));
  if (legs) D("dark", poly([[x-10,94],[x-8,60],[x+8,60],[x+10,94]]));
  D("base", ngon(x-24,46,18,6))("light", ngon(x,26,22,6))("base", ngon(x+24,48,17,6))("shade", ngon(x+24,48,17,6,0))
   ("eye", ngon(x-5,78,2.4,4))("eye", ngon(x+5,78,2.4,4))("ink", rect(x-5,86,10,2));
}
// Golems are built from interchangeable parts: head, torso, arms, legs and decoration.
function artGolem(D, x, R, words){
  const has = w => words.includes(w);
  if (has("behemoth") && R()<0.6){ artBeast(D, x, R, ["bear"]); D("metal", rect(x-20,62,14,8))("metal", rect(x-2,60,14,8))("light", tri([x-6,62],[x,50],[x+6,62])); return; }
  const torso = pick(R, ["box","wedge","barrel","round"]), headK = pick(R, ["box","dome","hex","horned","none","slot"]);
  const arms = pick(R, ["block","clubs","thin","crystal","spike"]), stance = pick(R, ["stand","up","punch","wide"]);
  const legs = pick(R, ["pillars","stubby","wide"]);
  const W2 = 26 + R()*10, top = 44 + R()*8, bot = 92 + R()*4;
  // legs
  if (legs==="pillars") D("dark", rect(x-W2*0.7,bot,14,GY-bot))("dark", rect(x+W2*0.7-14,bot,14,GY-bot));
  else if (legs==="stubby") D("dark", poly([[x-W2*0.8,GY],[x-W2*0.7,bot],[x-6,bot],[x-4,GY]]))("dark", poly([[x+4,GY],[x+6,bot],[x+W2*0.7,bot],[x+W2*0.8,GY]]));
  else D("dark", quad([x-10,bot],[x-W2-6,GY],14,12))("dark", quad([x+10,bot],[x+W2+6,GY],14,12));
  // arms (far arm first)
  const arm = (sgn, role) => {
    const sx = x + sgn*W2, sy = top + 8;
    const end = stance==="up" ? [sx + sgn*10, top-30] : stance==="punch" && sgn>0 ? [sx + 34, sy+4] : stance==="wide" ? [sx + sgn*24, sy+18] : [sx + sgn*8, sy+38];
    if (arms==="thin") D(role, quad([sx,sy],end,6,5)); else D(role, quad([sx,sy],end,13,11));
    if (arms==="clubs") D(role, ngon(end[0], end[1], 11, 6));
    else if (arms==="crystal") D("light", tri([end[0]-7,end[1]],[end[0],end[1]+16*(stance==="up"?-1:1)],[end[0]+7,end[1]]));
    else if (arms==="spike") D("metal", tri([end[0]-5,end[1]],[end[0]+sgn*14,end[1]],[end[0],end[1]+10]));
    else D(role, rect(end[0]-8, end[1]-6, 16, 13));
  };
  arm(-1, "dark");
  if (torso==="box") D("base", poly([[x-W2,top],[x+W2,top],[x+W2+6,bot],[x-W2-6,bot]]));
  else if (torso==="wedge") D("base", poly([[x-W2-8,top],[x+W2+8,top],[x+W2-8,bot],[x-W2+8,bot]]));
  else if (torso==="barrel") D("base", ngon(x,(top+bot)/2,W2+4,8,Math.PI/8,1,(bot-top)/2/(W2+4)));
  else D("base", ell(x,(top+bot)/2,W2+4,(bot-top)/2+2));
  D("shade", poly([[x,top-2],[x+W2+10,top-2],[x+W2+10,bot+2],[x,bot+2]]));
  arm(1, "base");
  // head
  const hy = top - 12;
  switch (headK){
    case "box": D("base", rect(x-12,hy-12,24,22))("eye", rect(x-8,hy-6,5,4))("eye", rect(x+3,hy-6,5,4)); break;
    case "dome": D("base", poly([[x-14,hy+10],[x-14,hy-2],[x-8,hy-12],[x+8,hy-12],[x+14,hy-2],[x+14,hy+10]]))("eye", rect(x-9,hy-2,18,4)); break;
    case "hex": D("base", ngon(x,hy,14,6))("eye", ngon(x-5,hy-1,2.6,4))("eye", ngon(x+5,hy-1,2.6,4)); break;
    case "horned": D("base", rect(x-12,hy-10,24,20))("light", tri([x-12,hy-6],[x-22,hy-22],[x-6,hy-10]))("light", tri([x+12,hy-6],[x+22,hy-22],[x+6,hy-10]))("eye", rect(x-8,hy-3,5,4))("eye", rect(x+3,hy-3,5,4)); break;
    case "slot": D("base", rect(x-10,hy-14,20,24))("glow", rect(x-7,hy-4,14,3)); break;
    default: D("glow", ngon(x,(top+bot)/2-6,8,8))("eye", ngon(x,(top+bot)/2-6,3,6));
  }
  // decoration
  const deco = pick(R, ["runes","cracks","plates","moss","crystals","none"]);
  if (deco==="runes") D("glow", rect(x-2,top+10,4,22))("glow", rect(x-10,top+18,20,4));
  else if (deco==="cracks") D("ink", poly([[x-10,top+6],[x-4,top+18],[x-8,top+30],[x-6,top+30],[x-2,top+18],[x-7,top+6]]));
  else if (deco==="plates") D("metal", rect(x-W2+4,top+6,W2-6,10))("metal", rect(x+2,top+22,W2-6,10));
  else if (deco==="moss") for (let i=0;i<4;i++) D("soft", ngon(x-W2+R()*W2*2, top+R()*10, 4+R()*3, 6));
  else if (deco==="crystals") D("light", tri([x-W2+4,top],[x-W2+10,top-18],[x-W2+16,top]))("light", tri([x+W2-16,top],[x+W2-10,top-14],[x+W2-4,top]));
  if (has("sentinel")) hold(D, R()<0.5 ? "shield" : "spear", x-W2-6, top+30, -1, 2.4);
  if (has("juggernaut")) D("light", tri([x-W2,top],[x-W2-14,top-14],[x-W2+6,top+4]))("light", tri([x+W2,top],[x+W2+14,top-14],[x+W2-6,top+4]));
}
// Spirits: a body drawn from the element (three shapes each), a face, and optional arms, crown or orbiting bits.
const SPIRIT_BODIES = {
  fire: [
    (D,x,Y) => D("base", poly([[x,Y(110)],[x-26,Y(92)],[x-22,Y(64)],[x-14,Y(76)],[x-12,Y(44)],[x,Y(60)],[x+6,Y(26)],[x+14,Y(56)],[x+22,Y(46)],[x+26,Y(88)]]))("light", poly([[x,Y(104)],[x-14,Y(90)],[x-8,Y(72)],[x,Y(80)],[x+6,Y(60)],[x+14,Y(84)]])),
    (D,x,Y) => D("dark", rect(x-14,Y(84),28,28))("base", poly([[x-14,Y(86)],[x-16,Y(60)],[x-6,Y(40)],[x,Y(20)],[x+8,Y(42)],[x+16,Y(60)],[x+14,Y(86)]]))("light", tri([x-8,Y(80)],[x,Y(40)],[x+8,Y(80)])),
    (D,x,Y) => D("light", poly([[x-30,Y(78)],[x-62,Y(60)],[x-44,Y(76)],[x-66,Y(84)],[x-28,Y(88)]]))("base", ngon(x,Y(76),26,10))("light", ngon(x-6,Y(70),10,8)),
  ],
  water: [
    (D,x,Y) => D("base", poly([[x,Y(22)],[x+24,Y(66)],[x+24,Y(88)],[x+12,Y(108)],[x-12,Y(108)],[x-24,Y(88)],[x-24,Y(66)]]))("light", poly([[x-14,Y(70)],[x-6,Y(50)],[x-4,Y(74)]])),
    (D,x,Y) => D("base", poly([[x-30,Y(116)],[x-26,Y(70)],[x-8,Y(44)],[x+14,Y(40)],[x+26,Y(52)],[x+10,Y(52)],[x+22,Y(70)],[x+30,Y(116)]]))("light", poly([[x-30,Y(116)],[x-10,Y(108)],[x+10,Y(116)],[x+30,Y(108)],[x+30,Y(116)]])),
    (D,x,Y) => D("base", circ(x,Y(76),22))("base", circ(x-22,Y(96),12))("base", circ(x+22,Y(98),13))("light", circ(x-8,Y(68),6))("light", circ(x-24,Y(92),3)),
  ],
  earth: [
    (D,x,Y) => D("base", poly([[x-26,Y(110)],[x-30,Y(74)],[x-14,Y(50)],[x+10,Y(44)],[x+28,Y(66)],[x+26,Y(110)]]))("dark", tri([x-30,Y(74)],[x-18,Y(60)],[x-14,Y(80)]))("light", tri([x+10,Y(44)],[x+28,Y(66)],[x+12,Y(60)])),
    (D,x,Y) => D("dark", ngon(x-22,Y(100),14,6,0.3))("dark", ngon(x+22,Y(102),13,6))("base", ngon(x,Y(72),26,7,0.2))("light", tri([x-10,Y(50)],[x+6,Y(48)],[x-2,Y(60)])),
    (D,x,Y) => D("base", poly([[x-22,Y(112)],[x-18,Y(60)],[x-8,Y(36)],[x+2,Y(60)],[x+6,Y(30)],[x+16,Y(62)],[x+22,Y(112)]]))("light", poly([[x-8,Y(36)],[x+2,Y(60)],[x-4,Y(112)],[x-12,Y(112)]])),
  ],
  wind: [
    (D,x,Y) => D("base", poly([[x-22,Y(56)],[x-14,Y(30)],[x+14,Y(30)],[x+22,Y(56)],[x+14,Y(86)],[x+22,Y(112)],[x,Y(98)],[x-12,Y(114)],[x-10,Y(90)],[x-22,Y(80)]]))("light", poly([[x-10,Y(90)],[x+8,Y(104)],[x+14,Y(86)]])),
    (D,x,Y) => { for (let i=0;i<4;i++){ const w = 30 - i*6, y = Y(50 + i*16); D(i%2?"light":"base", poly([[x-w,y],[x+w,y-6],[x+w-6,y+10],[x-w+4,y+12]])); } },
    (D,x,Y) => D("base", poly([[x-34,Y(80)],[x-30,Y(62)],[x-14,Y(56)],[x-6,Y(40)],[x+14,Y(38)],[x+24,Y(52)],[x+36,Y(58)],[x+34,Y(80)]]))("light", poly([[x-34,Y(80)],[x+34,Y(80)],[x+28,Y(88)],[x-28,Y(88)]])),
  ],
  lightning: [
    (D,x,Y) => D("base", poly([[x-22,Y(56)],[x,Y(30)],[x+22,Y(56)],[x+12,Y(86)],[x+20,Y(112)],[x,Y(94)],[x-6,Y(116)],[x-12,Y(86)]]))("light", poly([[x+2,Y(40)],[x-6,Y(62)],[x+2,Y(62)],[x-4,Y(80)],[x+10,Y(56)],[x+2,Y(56)]])),
    (D,x,Y) => D("base", ngon(x,Y(70),24,8))("light", star(x,Y(70),34,26,12,0.1))("base", ngon(x,Y(70),22,8)),
    (D,x,Y) => D("dark", poly([[x-34,Y(62)],[x-28,Y(44)],[x-8,Y(38)],[x+8,Y(28)],[x+26,Y(36)],[x+36,Y(56)]]))("base", poly([[x-30,Y(62)],[x+34,Y(62)],[x+28,Y(76)],[x-24,Y(76)]]))("glow", poly([[x-4,Y(76)],[x-12,Y(96)],[x-4,Y(96)],[x-10,Y(118)],[x+8,Y(90)],[x,Y(90)],[x+6,Y(76)]])),
  ],
};
function artSpirit(D, x, R, words, el, y0=0){
  const Y = v => v + y0;
  const bodies = SPIRIT_BODIES[el] || SPIRIT_BODIES.wind;
  pick(R, bodies)(D, x, Y);
  D("shade", poly([[x,Y(30)],[x+30,Y(30)],[x+30,Y(116)],[x,Y(116)]]));
  const ey = Y(62 + (R()-0.5)*10), face = pick(R, ["tri","dot","slit","one","angry"]);
  if (face==="dot") D("eye", ngon(x-7,ey,3.2,6))("eye", ngon(x+7,ey,3.2,6));
  else if (face==="slit") D("eye", rect(x-12,ey-1.5,8,3))("eye", rect(x+4,ey-1.5,8,3));
  else if (face==="one") D("eye", ngon(x,ey,6,8))("ink", ngon(x,ey,2.4,6));
  else if (face==="angry") D("eye", tri([x-12,ey-4],[x-3,ey],[x-10,ey+3]))("eye", tri([x+12,ey-4],[x+3,ey],[x+10,ey+3]));
  else D("eye", tri([x-10,ey],[x-2,ey-2],[x-4,ey+6]))("eye", tri([x+10,ey],[x+2,ey-2],[x+4,ey+6]));
  if (R()<0.6) D("ink", poly([[x-6,ey+14],[x+6,ey+14],[x,ey+20]]));
  const extra = R();
  if (extra < 0.25) D("base", quad([x-18,Y(78)],[x-34,Y(60+R()*20)],6,4))("base", quad([x+18,Y(78)],[x+34,Y(60+R()*20)],6,4));
  else if (extra < 0.4) D("glow", poly([[x-12,Y(40)],[x-12,Y(30)],[x-6,Y(35)],[x,Y(26)],[x+6,Y(35)],[x+12,Y(30)],[x+12,Y(40)]]));
  else if (extra < 0.55) for (let i=0;i<3;i++){ const a = i*2.1 + R(); D("light", ngon(x+Math.cos(a)*40, Y(70)+Math.sin(a)*30, 5, 5, R())); }
  if (words.includes("imp")) D("dark", tri([x-14,Y(48)],[x-22,Y(26)],[x-6,Y(42)]))("dark", tri([x+14,Y(48)],[x+22,Y(26)],[x+6,Y(42)]))("dark", poly([[x+18,Y(92)],[x+36,Y(96)],[x+42,Y(82)],[x+48,Y(84)],[x+40,Y(100)],[x+18,Y(100)]]));
  if (words.includes("sprite")||words.includes("wisp")) D("soft", poly([[x-18,Y(66)],[x-46,Y(40)],[x-40,Y(70)]]))("soft", poly([[x+18,Y(66)],[x+46,Y(40)],[x+40,Y(70)]]));
  if (words.includes("djinn")) D("base", quad([x-18,Y(64)],[x-38,Y(46)],7))("base", quad([x+18,Y(64)],[x+38,Y(46)],7))("glow", ngon(x-40,Y(42),5,6))("glow", ngon(x+40,Y(42),5,6));
  for (let i=0;i<1+Math.floor(R()*3);i++) D("glow", ngon(x + (R()-0.5)*90, Y(24 + R()*70), 2 + R()*2, 4));
}
function artSwarm(D, x, R, el){
  const n = 4 + Math.floor(R()*3);
  for (let i=0;i<n;i++){ const cx = x - 52 + i*(104/(n-1)) + (R()-0.5)*8, sc = 0.48 + R()*0.22, cy = 20 + R()*40;
    const g = Drawing(); artSpirit(g, 0, R, [], el); D.group(`translate(${r1(cx)} ${r1(cy)}) scale(${r1(sc)})`, g); }
}

/* ---- places and things ---- */
function flame(D, x, y, el, s=1){
  switch (el){
    case "water": D("light", poly([[x,y-30*s],[x+10*s,y-8*s],[x,y],[x-10*s,y-8*s]])); break;
    case "earth": D("dark", poly([[x-12*s,y],[x-8*s,y-16*s],[x,y-24*s],[x+8*s,y-16*s],[x+12*s,y]])); break;
    case "wind": D("light", poly([[x-12*s,y],[x-14*s,y-14*s],[x,y-24*s],[x+10*s,y-14*s],[x+2*s,y-12*s],[x+8*s,y]])); break;
    case "lightning": D("glow", poly([[x+4*s,y-30*s],[x-8*s,y-12*s],[x,y-12*s],[x-6*s,y],[x+10*s,y-18*s],[x+2*s,y-18*s],[x+8*s,y-30*s]])); break;
    default: D("light", poly([[x-12*s,y],[x-14*s,y-14*s],[x-6*s,y-10*s],[x-2*s,y-30*s],[x+6*s,y-14*s],[x+12*s,y-20*s],[x+12*s,y]]))("glow", tri([x-6*s,y],[x,y-18*s],[x+6*s,y]));
  }
}
function artPlace(D, fig, x, R, el){
  switch (fig){
    case "tower": return pick(R, [
      () => D("base", rect(x-18,28,36,96))("shade", rect(x,28,18,96))("base", poly([[x-22,28],[x-22,14],[x-12,14],[x-12,22],[x-4,22],[x-4,14],[x+4,14],[x+4,22],[x+12,22],[x+12,14],[x+22,14],[x+22,28]]))("ink", rect(x-6,48,12,16))("glow", rect(x-4,50,8,12))("ink", poly([[x-8,GY],[x-8,100],[x,94],[x+8,100],[x+8,GY]])),
      () => D("base", poly([[x-14,GY],[x-6,20],[x+6,20],[x+14,GY]]))("shade", poly([[x,20],[x+6,20],[x+14,GY],[x,GY]]))("glow", ngon(x,12,8,4))("dark", rect(x-10,56,20,4))("dark", rect(x-12,86,24,4)),
      () => D("base", poly([[x-16,GY],[x-12,44],[x+12,44],[x+16,GY]]))("dark", poly([[x-20,44],[x,18],[x+20,44]]))("light", rect(x-6,58,12,14))("glow", quad([x-30,24],[x-14,30],3))("glow", quad([x+30,24],[x+14,30],3)),
      () => D("base", rect(x-14,24,28,100))("light", rect(x-14,44,28,4))("light", rect(x-14,64,28,4))("light", rect(x-14,84,28,4))("shade", rect(x,24,14,100))("glow", ngon(x,12,9,6)),
    ])();
    case "coil": return pick(R, [
      () => { D("dark", rect(x-3,16,6,92))("base", rect(x-20,104,40,20)); for (let i=0;i<7;i++) D(i%2?"light":"base", poly([[x-16,26+i*11],[x+16,32+i*11],[x+16,38+i*11],[x-16,32+i*11]])); D("glow", star(x,12,10,4,4)); },
      () => D("base", rect(x-20,40,40,68))("shade", rect(x,40,20,68))("dark", rect(x-8,28,16,12))("light", rect(x-12,80,24,24))("glow", poly([[x+4,50],[x-8,70],[x+2,70],[x-6,90],[x+10,64],[x,64],[x+8,50]]))("dark", rect(x-26,108,52,16)),
      () => D("dark", quad([x-48,68],[x+48,68],6))("dark", rect(x-50,58,6,20))("dark", rect(x+44,58,6,20))("base", ngon(x,68,24,8,Math.PI/8))("glow", ngon(x,68,10,8))("light", tri([x-12,40],[x-4,28],[x-2,42]))("light", tri([x+12,40],[x+4,28],[x+2,42])),
    ])();
    case "wall": { D("base", rect(x-56,58,112,66))("shade", rect(x-56,92,112,32));
      for (let r=0;r<4;r++) for (let c=0;c<5;c++){ const bx = x-56 + c*24 + (r%2?12:0), by = 60 + r*16; if (bx+20 <= x+56) D(r%2?"dark":"light", rect(bx+2, by+2, 18, 12)); }
      if (R()<0.5) for (let i=0;i<5;i++) D("base", rect(x-56+i*24, 44, 14, 16));
      else for (let i=0;i<4;i++) D("dark", tri([x-52+i*30,58],[x-44+i*30,36],[x-36+i*30,58]));
      if (R()<0.5) hold(D, "banner", x, 44, 1, 2); return; }
    case "throne": return D("dark", poly([[x-36,GY],[x-36,96],[x-26,96],[x-26,GY]]))("dark", poly([[x+26,GY],[x+26,96],[x+36,96],[x+36,GY]]))
      ("base", poly([[x-26,GY],[x-26,72],[x+26,72],[x+26,GY]]))("base", poly([[x-22,72],[x-22,22],[x-12,32],[x,14],[x+12,32],[x+22,22],[x+22,72]]))
      ("shade", poly([[x,14],[x+12,32],[x+22,22],[x+22,GY],[x,GY]]))("light", rect(x-26,88,52,6))("glow", ngon(x,44,7,4));
    case "altar": return pick(R, [
      () => { D("base", poly([[x-38,80],[x+38,80],[x+30,92],[x-30,92]]))("dark", rect(x-24,92,12,32))("dark", rect(x+12,92,12,32))("light", rect(x-34,118,68,6)); flame(D, x, 78, el, 1.2); },
      () => { D("dark", rect(x-50,52,10,72))("dark", rect(x+40,52,10,72))("base", poly([[x-60,52],[x-50,40],[x+50,40],[x+60,52]]))("light", rect(x-46,62,92,6)); flame(D, x, 110, el, 1.3); },
      () => D("dark", rect(x-50,68,16,56))("dark", rect(x+34,68,16,56))("base", rect(x-54,58,108,12))("glow", ngon(x,96,10,6))("light", ngon(x,96,4,6)),
    ])();
    case "fire": return pick(R, [
      () => { D("dark", poly([[x-34,GY],[x+34,GY],[x+26,104],[x-26,104]]))("light", rect(x-22,100,44,4)); flame(D, x, 102, el, 2); },
      () => { D("dark", quad([x-30,GY],[x+10,104],7))("dark", quad([x+30,GY],[x-10,104],7)); flame(D, x, 112, el, 2.2); },
      () => { D("base", rect(x-30,64,60,60))("shade", rect(x,64,30,60))("dark", poly([[x-38,64],[x-30,52],[x+30,52],[x+38,64]]))("ink", poly([[x-14,GY],[x-14,92],[x,84],[x+14,92],[x+14,GY]])); flame(D, x, 118, el, 1.2); D("dark", rect(x+12,26,12,26)); },
    ])();
    case "book": return pick(R, [
      () => D("light", poly([[x,100],[x-56,92],[x-56,40],[x,48]]))("base", poly([[x,100],[x+56,92],[x+56,40],[x,48]]))("dark", rect(x-46,56,36,4))("dark", rect(x-46,68,36,4))("dark", rect(x+10,56,36,4))("dark", rect(x+10,68,36,4))("glow", star(x,30,9,3,4)),
      () => D("light", rect(x-40,34,72,64))("base", ngon(x-40,40,8,6))("base", ngon(x+32,92,8,6))("dark", rect(x-28,52,48,4))("dark", rect(x-28,64,48,4))("dark", rect(x-28,76,30,4)),
      () => D("base", rect(x-50,96,44,12))("dark", rect(x-44,84,38,12))("light", rect(x-48,72,40,12))("base", rect(x+12,44,34,80))("shade", rect(x+29,44,17,80))("light", rect(x+12,64,34,4))("light", rect(x+12,84,34,4)),
    ])();
    case "pool": return pick(R, [
      () => D("dark", ell(x,108,54,14))("light", ell(x,106,40,9))("base", quad([x,104],[x,58],6))("light", poly([[x,58],[x-26,64],[x-30,80],[x-4,66]]))("light", poly([[x,58],[x+26,64],[x+30,80],[x+4,66]])),
      () => D("dark", poly([[x-40,GY],[x-32,96],[x+32,96],[x+40,GY]]))("base", rect(x-4,56,8,40))("base", poly([[x-24,60],[x,46],[x+24,60]]))("light", quad([x-20,62],[x-24,94],4))("light", quad([x+20,62],[x+24,94],4)),
      () => D("dark", ell(x,110,48,12))("light", ell(x,110,32,7))("light", poly([[x-48,110],[x-50,74],[x-40,80],[x-38,110]]))("light", poly([[x+48,110],[x+50,70],[x+40,78],[x+38,110]]))("glow", tri([x-12,92],[x-8,80],[x-4,92])),
    ])();
    case "cloud": D("light", poly([[x-56,70],[x-50,52],[x-30,46],[x-20,30],[x+6,26],[x+22,38],[x+42,36],[x+56,54],[x+52,70]]))("shade", poly([[x-56,70],[x+52,70],[x+50,60],[x-50,62]]));
      if (R()<0.5) for (let i=0;i<4;i++) D("base", quad([x-30+i*20,74],[x-34+i*20,96],4));
      else D("base", rect(x-30,70,60,54))("shade", rect(x,70,30,54))("dark", rect(x-24,84,12,40))("dark", rect(x+12,84,12,40))("light", tri([x-34,70],[x,46],[x+34,70]));
      return;
    case "mountain": return pick(R, [
      () => { D("base", poly([[x-70,GY],[x-20,46],[x+20,46],[x+70,GY]]))("shade", poly([[x,46],[x+20,46],[x+70,GY],[x,GY]]))("dark", poly([[x-20,46],[x-10,60],[x,50],[x+10,60],[x+20,46]])); flame(D, x, 46, el, 1.6); D("light", tri([x-30,GY],[x-18,60],[x-8,GY])); },
      () => D("dark", poly([[x-84,GY],[x-46,64],[x-28,86],[x+4,36],[x+60,GY]]))("light", poly([[x+4,36],[x-6,54],[x+4,48],[x+12,56]]))("shade", poly([[x+4,36],[x+60,GY],[x+4,GY]])),
      () => D("base", poly([[x-84,GY],[x-40,90],[x,100],[x+40,82],[x+84,GY]]))("light", poly([[x-60,GY],[x-34,104],[x-10,GY]]))("shade", poly([[x,100],[x+40,82],[x+84,GY],[x,GY]])),
    ])();
    case "crystal": return D("base", poly([[x-14,GY],[x-20,64],[x-6,40],[x+6,64],[x+2,GY]]))("light", poly([[x-6,40],[x+6,64],[x+2,GY],[x-6,GY]]))
      ("dark", poly([[x-40,GY],[x-46,92],[x-34,78],[x-24,96],[x-26,GY]]))("light", poly([[x+18,GY],[x+20,84],[x+32,70],[x+40,86],[x+34,GY]]))("glow", star(x+44,40,8,3,4));
    case "garden": D("dark", poly([[x-60,GY],[x-40,114],[x+40,114],[x+60,GY]]));
      for (const dx of [-36,-12,12,36]){ const h = 70 + R()*20; D("dark", quad([x+dx,116],[x+dx+(R()*8-4),GY-h+30],4))(R()<0.5?"light":"base", ngon(x+dx, GY-h+24, 9+R()*5, pick(R,[5,6,8]))); }
      return;
  }
}

/* ---- spell scenes ---- */
function missile(D, el, x, y, s=1){
  switch (el){
    case "lightning": D("glow", poly([[x-12*s,y-22*s],[x+4*s,y-4*s],[x-4*s,y-2*s],[x+14*s,y+20*s],[x-2*s,y+4*s],[x+6*s,y+2*s]])); break;
    case "earth": D("dark", ngon(x,y,12*s,6,0.3))("light", tri([x-6*s,y-8*s],[x+6*s,y-10*s],[x,y-2*s])); break;
    case "water": D("base", poly([[x,y-16*s],[x+12*s,y+2*s],[x+6*s,y+12*s],[x-6*s,y+12*s],[x-12*s,y+2*s]]))("light", tri([x-4*s,y-4*s],[x,y-12*s],[x+2*s,y])); break;
    case "wind": D("light", poly([[x-18*s,y],[x,y-16*s],[x+18*s,y-6*s],[x+4*s,y-6*s],[x+12*s,y+6*s],[x-6*s,y+2*s]])); break;
    default: D("light", poly([[x-32*s,y-10*s],[x-6*s,y-12*s],[x-26*s,y],[x-4*s,y+10*s],[x-30*s,y+12*s]]))("glow", ngon(x,y,11*s,8))("light", ngon(x+2*s,y-2*s,5*s,6));
  }
}
function foe(D, x, R){
  pick(R, [
    () => artPerson(D, x, R, {pose:"stand", gear:[null,null], head:"none", scale:0.8, robe:false, broad:false}),
    () => D("dark", poly([[x-16,GY],[x-16,96],[x-8,84],[x+8,84],[x+16,96],[x+16,GY]]))("eye", ngon(x-6,98,2.4,4))("eye", ngon(x+6,98,2.4,4)),
    () => D("dark", quad([x-10,108],[x-12,GY],6))("dark", quad([x+12,108],[x+14,GY],6))("dark", poly([[x-24,104],[x-16,92],[x+16,92],[x+26,104],[x+16,114],[x-16,114]]))("dark", ngon(x+28,90,9,5))("eye", ngon(x+30,88,2,4)),
  ])();
}
function burst(D, x, y, R){ const n = 7 + Math.floor(R()*3); D("glow", star(x, y, 18 + R()*6, 7, n, R())); D("light", ngon(x, y, 5, 6)); }
function sceneBolt(D, x, R, el, words){
  const has = (...ws) => ws.some(w=>words.includes(w));
  let kind;
  if (has("rain","volley","barrage","hail","storm","starfall","meteor","shower","cascade")) kind = "rain";
  else if (has("spear","lance","arrow","shard","spike","javelin")) kind = "spear";
  else if (has("quake","fault","tremor","slide","rockslide","avalanche","seismic","fissure")) kind = "quake";
  else if (has("wave","tide","torrent","surge","flood","deluge")) kind = "wave";
  else if (has("gust","gale","cyclone","tornado","whirl","wind","squall")) kind = "tornado";
  else if (has("beam","ray","flare","sun","solar","helix","judgment")) kind = "beam";
  else if (has("bolt","spark","zap","jolt","shock","arc","lightning","thunder","static")) kind = el==="lightning" ? pick(R, ["sky","chain","orbit"]) : "cast";
  else kind = pick(R, ["cast","meteor","pillar","slash","throw","chain","fist","orbit","crash","duel","volley"]);
  if (kind==="cast" && R()<0.5) kind = pick(R, ["chain","orbit","duel"]);
  if (["chain","fist","orbit","crash","duel","volley"].includes(kind)) return sceneBoltExtra(D, kind, x, R, el);
  const tx = x + 44;
  switch (kind){
    case "rain": foe(D, tx-12, R); foe(D, tx+28, R); for (let i=0;i<4;i++) missile(D, el, x-60+i*28+R()*8, 24+R()*30, 0.65); return;
    case "spear": artPerson(D, x-52, R, {pose:"point", gear:[null,null], head:EL_HAIR[el]||"none", robe:false}); D("dark", quad([x-24,50],[tx+14,66],4))("light", tri([tx+8,58],[tx+26,70],[tx+8,74])); foe(D, tx+36, R); burst(D, tx+18, 70, R); return;
    case "quake": D("dark", poly([[x-84,GY],[x-56,GY],[x-48,110],[x-36,122],[x-28,98],[x-16,114],[x,106],[x+14,GY],[x+84,GY],[x+84,140],[x-84,140]])); missile(D, "earth", x-28, 44, 1); missile(D, "earth", x+20, 28, 0.8); missile(D, "earth", x+48, 60, 0.7); foe(D, tx+20, R); return;
    case "wave": D("base", poly([[x-84,GY],[x-80,70],[x-50,40],[x-14,34],[x+6,50],[x-12,44],[x-24,56],[x-6,66],[x+20,64],[x+40,90],[x+44,GY]]))("light", poly([[x-50,40],[x-14,34],[x+6,50],[x-12,44],[x-30,48]]))("shade", poly([[x-84,GY],[x-80,90],[x+40,96],[x+44,GY]])); foe(D, tx+24, R); return;
    case "tornado": for (let i=0;i<6;i++){ const w = 32 - i*5, y = 22 + i*16; D(i%2?"light":"base", poly([[x-w,y],[x+w,y-4],[x+w-4,y+10],[x-w+4,y+12]])); } foe(D, tx+26, R); return;
    case "beam": D("soft", poly([[x-74,6],[x-54,6],[x+40,112],[x+20,112]]))("glow", poly([[x-68,6],[x-60,6],[x+32,112],[x+26,112]]))("light", ngon(x-64,12,12,8)); burst(D, tx-14, 108, R); foe(D, tx+10, R); return;
    case "sky": D("dark", poly([[x-60,36],[x-56,20],[x-36,14],[x-20,2],[x+4,6],[x+16,20],[x+8,36]]))("glow", poly([[x-14,36],[x-28,64],[x-16,64],[x-28,96],[x,58],[x-12,58],[x-2,36]])); foe(D, tx+16, R); burst(D, tx+16, 86, R); return;
    case "meteor": D("soft", poly([[x-84,0],[x-60,0],[x+4,40],[x-8,52]])); missile(D, el, x+4, 44, 1.6); D("dark", poly([[x-40,GY],[x-20,112],[x+30,110],[x+50,GY]])); burst(D, x+10, 108, R); return;
    case "pillar": D("dark", poly([[x-58,GY],[x-36,112],[x-26,GY]]))("dark", poly([[x+26,GY],[x+36,112],[x+58,GY]]))("base", poly([[x-16,GY],[x-10,44],[x,34],[x+10,44],[x+16,GY]]))("shade", poly([[x,34],[x+10,44],[x+16,GY],[x,GY]])); flame(D, x, 40, el, 1.4); foe(D, tx+24, R); return;
    case "slash": foe(D, x+8, R); for (let i=0;i<3;i++) D("light", poly([[x-30+i*14,10],[x-26+i*14,8],[x+34+i*14,104],[x+30+i*14,108]])); return;
    case "throw": artPerson(D, x-48, R, {pose:"swing", gear:[null,null], head:EL_HAIR[el]||"none", robe:false}); missile(D, el, x+4, 44, 1.1); foe(D, tx+24, R); return;
    default: artPerson(D, x-52, R, {pose:"cast", gear:[null,null], head:EL_HAIR[el]||"none"}); missile(D, el, x+8, 52, 1); foe(D, tx+24, R);
  }
}
function sceneNova(D, x, R, el){
  const kind = pick(R, ["burst","ring","storm","erupt","wall","dome","rain"]);
  if (kind==="wall"){ for (let i=0;i<7;i++) flame(D, x-72+i*24, GY-2, el, 1.4 + (i%2)*0.5); foe(D, x-20, R); foe(D, x+30, R); return; }
  if (kind==="dome"){ D("soft", ell(x, GY, 80, 70))("halo", ell(x, GY, 60, 50)); artPerson(D, x, R, {pose:"cheer", gear:[null,null], head:EL_HAIR[el]||"hood"}); return; }
  if (kind==="rain"){ for (let i=0;i<7;i++) missile(D, el, x-80+i*26+R()*8, 14+R()*70, 0.5); foe(D, x-30, R); foe(D, x+36, R); return; }
  if (kind==="ring"){ D("halo", ell(x,98,70,20))("soft", ell(x,98,46,12)); foe(D, x-40, R); foe(D, x+44, R); missile(D, el, x, 54, 1.2); return; }
  if (kind==="storm"){ D("dark", poly([[x-80,40],[x-74,22],[x-50,16],[x-36,4],[x-8,6],[x+10,0],[x+36,8],[x+62,16],[x+80,34]])); for (let i=0;i<4;i++) missile(D, el, x-50+i*32, 66+R()*20, 0.6); return; }
  if (kind==="erupt"){ D("dark", poly([[x-84,GY],[x-46,104],[x-26,112],[x-6,96],[x+16,110],[x+40,102],[x+84,GY]])); for (const dx of [-48,-16,16,48]) flame(D, x+dx, 100-Math.abs(dx)/4, el, 1.3); return; }
  D("glow", star(x, 66, 46, 18, 12, R()))("light", star(x, 66, 26, 12, 8, R()))("eye", ngon(x, 66, 8, 8));
}
function sceneFreeze(D, x, R){
  const kind = pick(R, ["flake","block","icicles","statue"]);
  if (kind==="block"){ artPerson(D, x, R, {pose:"stand", gear:[null,null], head:"none", scale:0.85, robe:false}); D("soft", poly([[x-30,26],[x+28,20],[x+34,GY],[x-34,GY]]))("light", tri([x-30,26],[x-10,40],[x-34,60])); return; }
  if (kind==="icicles"){ D("light", rect(x-84,0,168,10)); for (let i=0;i<7;i++){ const ix = x-72+i*24, h = 22 + ((i*7)%5)*8; D(i%2?"base":"light", tri([ix-7,10],[ix,10+h],[ix+7,10])); } foe(D, x+16, R); return; }
  if (kind==="statue"){ artBeast(D, x-10, R, []); D("soft", poly([[x-70,GY],[x-60,50],[x+60,44],[x+70,GY]])); return; }
  for (let i=0;i<3;i++){ const a = i*Math.PI/3 + 0.2; D(i===0?"light":"base", quad([x-Math.cos(a)*44, 66-Math.sin(a)*44], [x+Math.cos(a)*44, 66+Math.sin(a)*44], 6)); }
  D("glow", ngon(x,66,12,6))("light", ngon(x,66,5,6));
}
function sceneBounce(D, x, R, el){
  const kind = pick(R, ["arrow","vortex","portal","push"]);
  if (kind==="vortex"){ for (let i=0;i<4;i++) D(i%2?"base":"light", poly([[x-48+i*10,66],[x-34+i*8,30+i*6],[x+34-i*8,30+i*6],[x+48-i*10,66],[x+34-i*8,90-i*6],[x-34+i*8,90-i*6]])); D("ink", ngon(x,66,8,6)); return; }
  if (kind==="portal"){ D("dark", ell(x+30,70,22,46))("glow", ell(x+30,70,12,34)); artPerson(D, x-24, R, {pose:"run", gear:[null,null], head:"none", scale:0.85, robe:false}); D("soft", rect(x-76,56,24,4))("soft", rect(x-80,70,28,4)); return; }
  if (kind==="push"){ artPerson(D, x-50, R, {pose:"point", gear:[null,null], robe:false}); missile(D, "wind", x, 64, 1.2); const g = Drawing(); foe(g, 0, R); D.group(`translate(${x+50} 0) rotate(16 0 ${GY})`, g); return; }
  D("base", poly([[x-30,96],[x-30,56],[x-14,36],[x+30,36],[x+46,56],[x+46,74],[x+36,74],[x+36,60],[x+26,46],[x-10,46],[x-20,60],[x-20,96]]))("light", tri([x+26,72],[x+56,72],[x+41,94]));
  artPerson(D, x-56, R, {pose:"stand", gear:[null,null], head:"none", scale:0.6, robe:false});
}
function sceneSummon(D, x, R, el){
  const kind = pick(R, ["portal","raise","egg","circle"]);
  const small = (tx, ty, sc) => { const g = Drawing(); pick(R, [() => artPerson(g, 0, R, {scale:0.7, head:"none", robe:false}), () => artSpirit(g, 0, R, [], el), () => artBeast(g, 0, R, [])])(); D.group(`translate(${r1(tx)} ${r1(ty)}) scale(${sc})`, g); };
  if (kind==="egg"){ D("base", poly([[x,32],[x+22,56],[x+26,84],[x+14,104],[x-14,104],[x-26,84],[x-22,56]]))("shade", poly([[x,32],[x+22,56],[x+26,84],[x+14,104],[x,104]]))("light", poly([[x-24,78],[x-12,70],[x-4,78],[x+8,68],[x+16,78],[x+25,72],[x+26,84],[x-26,84]]))("glow", star(x-40,40,8,3,4))("glow", star(x+42,34,6,2,4)); return; }
  if (kind==="raise"){ artPerson(D, x-44, R, {pose:"jump", gear:[null,null], head:EL_HAIR[el]||"hood", robe:false}); small(x+22, 14, 0.62); small(x+56, 26, 0.5); return; }
  if (kind==="circle"){ D("halo", ell(x,112,64,12))("soft", ell(x,112,44,8)); small(x-24, 0, 0.75); small(x+24, 0, 0.75); return; }
  D("dark", ell(x-20,68,22,48))("glow", ell(x-20,68,12,36)); small(x+20, 0, 0.8); small(x+52, 18, 0.6);
}
function sceneBuff(D, x, R, el){
  const kind = pick(R, ["flex","glow","armor","rally","beast","giant"]);
  if (kind==="beast"){ D("halo", ell(x, 90, 70, 40)); artBeast(D, x-10, R, [pick(R,["wolf","bear","lion","stag"])]); D("light", poly([[x+60,96],[x+60,70],[x+54,70],[x+64,58],[x+74,70],[x+68,70],[x+68,96]])); return; }
  if (kind==="giant"){ D("soft", ell(x, 60, 54, 60)); artPerson(D, x, R, {pose:"cheer", gear:[null,null], scale:1.15, broad:true, robe:false}); return; }
  if (kind==="glow"){ D("halo", circ(x+6,30,30)); artPerson(D, x, R, {pose:"swing", gear:["greatsword",null], robe:false}); return; }
  if (kind==="armor"){ artPerson(D, x, R, {pose:"guard", gear:["sword","shield"], head:"helm", robe:false}); D("light", poly([[x+36,96],[x+36,66],[x+30,66],[x+40,54],[x+50,66],[x+44,66],[x+44,96]])); return; }
  if (kind==="rally"){ artPerson(D, x-30, R, {pose:"jump", gear:["banner",null], scale:0.85, robe:false}); artPerson(D, x+30, R, {pose:"jump", gear:[null,"fist"], scale:0.75, robe:false}); D("glow", star(x,16,8,3,4)); return; }
  artPerson(D, x-12, R, {pose:"hips", gear:[null,null], broad:true, robe:false});
  for (const [ax,ay] of [[x+30,90],[x+50,100]]) D("light", poly([[ax-4,ay],[ax-4,ay-30],[ax-10,ay-30],[ax,ay-42],[ax+10,ay-30],[ax+4,ay-30],[ax+4,ay]]));
}
function sceneDraw(D, x, R, el){
  pick(R, [
    () => { D("base", poly([[x-44,104],[x-22,44],[x+2,56],[x-20,116]]))("light", poly([[x-14,108],[x-4,44],[x+24,48],[x+14,112]]))("base", poly([[x+12,108],[x+12,44],[x+40,44],[x+40,108]]))("glow", star(x+26,76,8,3,4)); },
    () => { D("light", poly([[x,100],[x-56,92],[x-56,40],[x,48]]))("base", poly([[x,100],[x+56,92],[x+56,40],[x,48]]))("glow", star(x,24,10,3,4))("glow", star(x-30,14,6,2,4))("glow", star(x+30,14,6,2,4)); },
    () => { D("dark", poly([[x-22,GY],[x-14,100],[x+14,100],[x+22,GY]]))("base", circ(x,68,30))("light", ngon(x-10,58,8,6))("glow", ngon(x+6,74,5,4)); },
    () => { D("light", poly([[x-50,66],[x-24,44],[x+24,44],[x+50,66],[x+24,88],[x-24,88]]))("base", ngon(x,66,18,8))("ink", ngon(x,66,8,8))("eye", ngon(x-4,62,3,4)); },
    () => { artPerson(D, x-40, R, {pose:"kneel", gear:["book",null], head:"hood"}); D("glow", star(x+10,40,8,3,4))("glow", star(x+30,26,10,4,4))("glow", star(x+46,52,7,3,4)); },
    () => { D("light", rect(x-44,28,80,72))("base", ngon(x-44,34,10,6))("base", ngon(x+36,94,10,6))("dark", rect(x-32,46,56,5))("dark", rect(x-32,60,56,5))("dark", rect(x-32,74,36,5)); },
  ])();
}
function sceneHeal(D, x, R, el){
  pick(R, [
    () => { D("base", poly([[x,108],[x-40,72],[x-40,48],[x-24,36],[x,48],[x+24,36],[x+40,48],[x+40,72]]))("shade", poly([[x,48],[x+24,36],[x+40,48],[x+40,72],[x,108]]))("glow", rect(x-4,56,8,32))("glow", rect(x-16,68,32,8)); },
    () => { artPerson(D, x, R, {pose:"cast", gear:[null,null], head:"halo"}); for (const [px,py,s] of [[x-48,60,1],[x+42,34,0.8],[x-28,20,0.7]]) D("glow", rect(px-3*s,py-10*s,6*s,20*s))("glow", rect(px-10*s,py-3*s,20*s,6*s)); },
    () => { D("base", poly([[x-48,100],[x-34,84],[x-14,88],[x,96],[x+14,88],[x+34,84],[x+48,100],[x+30,110],[x-30,110]]))("glow", rect(x-5,40,10,44))("glow", rect(x-20,56,40,10)); },
    () => { D("dark", ell(x,108,46,12))("light", ell(x,106,32,7))("base", quad([x,104],[x,60],6))("light", poly([[x,60],[x-26,64],[x-30,82],[x-4,68]]))("light", poly([[x,60],[x+26,64],[x+30,82],[x+4,68]]))("glow", ngon(x,52,6,4)); },
  ])();
}
function sceneDestroy(D, x, R){
  pick(R, [
    () => D("base", poly([[x-22,GY],[x-22,62],[x-12,48],[x+12,48],[x+22,62],[x+22,GY]]))("shade", poly([[x,48],[x+12,48],[x+22,62],[x+22,GY],[x,GY]]))("dark", rect(x-3,62,6,26))("dark", rect(x-12,70,24,6))("dark", poly([[x-48,GY],[x-30,114],[x+30,114],[x+48,GY]])),
    () => { artPerson(D, x, R, {pose:"stand", gear:[null,null], head:"none", robe:false}); D("light", quad([x-30,24],[x+30,116],7))("light", quad([x+30,24],[x-30,116],7)); },
    () => D("dark", poly([[x-30,GY],[x-22,104],[x-34,96],[x-16,88],[x-6,98],[x+2,84],[x+20,92],[x+30,82],[x+34,100],[x+24,110],[x+30,GY]]))("base", ngon(x-14,72,8,5))("base", ngon(x+18,64,6,5))("light", ngon(x+2,52,5,4)),
    () => D("light", poly([[x-26,52],[x-24,30],[x-10,18],[x+10,18],[x+24,30],[x+26,52],[x+14,60],[x+14,72],[x-14,72],[x-14,60]]))("ink", ngon(x-11,44,6,6))("ink", ngon(x+11,44,6,6))("ink", tri([x-3,58],[x+3,58],[x,52]))("dark", rect(x-10,64,4,8))("dark", rect(x-2,64,4,8))("dark", rect(x+6,64,4,8)),
  ])();
}
function sceneOrb(D, x, R, el){
  pick(R, [
    () => { D("halo", circ(x,64,36))("base", ngon(x,64,24,8))("glow", ngon(x,64,10,8)); for (const [dx,dy] of [[-44,-30],[40,-34],[46,20],[-46,24]]) D("glow", star(x+dx,64+dy,7,2.5,4)); },
    () => D("light", poly([[x-10,26],[x+10,26],[x+10,38],[x+24,56],[x+24,112],[x-24,112],[x-24,56],[x-10,38]]))("base", poly([[x-24,80],[x-8,74],[x+8,84],[x+24,78],[x+24,112],[x-24,112]]))("glow", ngon(x-6,96,4,6))("glow", ngon(x+8,90,3,6)),
    () => D("base", rect(x-22,38,44,78))("shade", rect(x,38,22,78))("dark", rect(x-8,28,16,10))("light", rect(x-14,76,28,32))("glow", poly([[x+4,46],[x-10,66],[x,66],[x-8,86],[x+10,60],[x,60],[x+8,46]])),
    () => { D("base", poly([[x,18],[x+22,54],[x,112],[x-22,54]]))("light", poly([[x,18],[x-22,54],[x,54]]))("shade", poly([[x,54],[x+22,54],[x,112]])); for (const [dx,dy] of [[-44,44],[40,40],[-36,90],[36,88]]) D("glow", star(x+dx,dy,6,2,4)); },
    () => artPerson(D, x, R, {pose:"cast", gear:["orb","spark"], head:EL_HAIR[el]||"hood"}),
  ])();
}
function sceneCounter(D, x, R){
  pick(R, [
    () => D("base", circ(x,66,40))("dark", circ(x,66,30))("light", rect(x-14,46,28,40))("base", quad([x-28,38],[x+28,94],9)),
    () => D("base", poly([[x-14,104],[x-14,60],[x-12,52],[x-6,52],[x-6,40],[x,36],[x+6,40],[x+6,50],[x+12,50],[x+16,56],[x+16,90],[x+6,104]]))("shade", poly([[x,36],[x+6,40],[x+6,50],[x+12,50],[x+16,56],[x+16,90],[x+6,104],[x,104]]))("glow", star(x-40,40,10,4,4))("glow", star(x+42,36,8,3,4)),
    () => D("light", rect(x-28,20,56,88))("base", quad([x-20,30],[x+20,98],8))("base", quad([x+20,30],[x-20,98],8))("dark", poly([[x-40,GY],[x-30,110],[x+30,110],[x+40,GY]])),
  ])();
}
function sceneRune(D, x, R){
  const n = 3 + Math.floor(R()*4);
  D("base", ngon(x,66,42,n*2))("dark", ngon(x,66,30,n*2,0))("light", star(x,66,24,10,n,R()));
  for (let i=0;i<n;i++){ const a = i*2*Math.PI/n - Math.PI/2; D("glow", ngon(x+Math.cos(a)*42, 66+Math.sin(a)*42, 5, 4)); }
}
const FRAMES = [
  (D,x) => D("dark", poly([[x,8],[x+44,18],[x+40,64],[x,112],[x-40,64],[x-44,18]]))("base", poly([[x,16],[x+36,24],[x+32,62],[x,102],[x-32,62],[x-36,24]])),
  (D,x) => D("dark", circ(x,62,50))("base", circ(x,62,42)),
  (D,x) => D("dark", poly([[x-46,10],[x+46,10],[x+46,64],[x,114],[x-46,64]]))("base", poly([[x-38,18],[x+38,18],[x+38,62],[x,104],[x-38,62]])),
  (D,x) => D("dark", poly([[x,6],[x+52,62],[x,118],[x-52,62]]))("base", poly([[x,16],[x+42,62],[x,108],[x-42,62]])),
];

/* ---- backdrop ---- */
const SKY_WORDS = [
  ["sun", "sun solar dawn sunfire sunheart day radiant"], ["moon", "moon moonlit night shadow shade dusk"],
  ["stars", "star starfall stars astral celestial cosmic eternity"], ["clouds", "cloud sky skies storm thunder rain squall cirrus tempest gale"],
  ["embers", "ember embers ash ashen cinder cinders smoke smoldering blaze"], ["snow", "frost ice glacier winter snow hail rime frozen glacial blizzard"],
  ["bubbles", "deep abyss abyssal reef coral sea ocean kelp tide tidal"], ["leaves", "grove root roots moss verdant bloom seed fertile wild"],
];
const GROUND_WORDS = [
  ["waves", "sea ocean tide tidal wave reef shoal harbor river brook lagoon"], ["hills", "hill mountain peak peaks cliff canyon crag"],
  ["cracks", "quake fault tremor seismic cataclysm"], ["grass", "grove root moss verdant field garden bloom"], ["dunes", "dune desert sand dust"],
];
const SKY_MAP = new Map(); for (const [k, ws] of SKY_WORDS) for (const w of ws.split(" ")) SKY_MAP.set(w, k);
const GROUND_MAP = new Map(); for (const [k, ws] of GROUND_WORDS) for (const w of ws.split(" ")) GROUND_MAP.set(w, k);
const EL_SKY = { fire:"embers", water:"bubbles", earth:"peaks", wind:"clouds", lightning:"stars" };
const EL_GROUND = { fire:"cracks", water:"waves", earth:"hills", wind:"grass", lightning:"plain" };
function backdrop(D, sky, ground, R){
  const sx = 30 + R()*40, sy = 24 + R()*8;
  switch (sky){
    case "sun": D("soft", star(sx, sy, 18, 11, 8, R()))("light", ngon(sx, sy, 9, 8)); break;
    case "moon": D("soft", circ(sx, sy, 13))("halo", circ(sx+6, sy-4, 11)); break;
    case "stars": for (let i=0;i<4;i++) D("soft", star(20+R()*200, 8+R()*36, 4+R()*3, 1.6, 4)); break;
    case "clouds": D("halo", poly([[sx-26,sy+8],[sx-20,sy-4],[sx-6,sy-8],[sx+4,sy-16],[sx+20,sy-10],[sx+28,sy],[sx+26,sy+8]])); if (R()<0.5) D("halo", poly([[sx+130,sy+2],[sx+136,sy-8],[sx+150,sy-12],[sx+164,sy-4],[sx+166,sy+2]])); break;
    case "embers": for (let i=0;i<5;i++) D("soft", ngon(20+R()*200, 10+R()*50, 2+R()*2, 4, R())); break;
    case "snow": for (let i=0;i<7;i++) D("soft", ngon(14+R()*212, 6+R()*60, 2+R()*1.5, 6)); break;
    case "bubbles": for (let i=0;i<4;i++) D("halo", circ(20+R()*200, 10+R()*56, 3+R()*4)); break;
    case "leaves": for (let i=0;i<3;i++){ const lx = 20+R()*200, ly = 8+R()*44; D("soft", poly([[lx,ly],[lx+6,ly-6],[lx+12,ly],[lx+6,ly+4]])); } break;
    case "peaks": D("halo", poly([[0,GY],[0,84],[30,58],[58,86],[90,64],[124,GY]])); break;
  }
  switch (ground){
    case "waves": { const p = [[0,140],[0,GY]]; for (let i=0;i<=12;i++) p.push([i*20, GY - (i%2?6:0)]); p.push([240,140]); D("ground", poly(p)); break; }
    case "hills": D("ground", poly([[0,140],[0,GY-2],[40,GY-10],[90,GY],[150,GY-12],[200,GY-2],[240,GY-8],[240,140]])); break;
    case "cracks": D("ground", poly([[0,140],[0,GY],[240,GY],[240,140]]))("halo", poly([[60+R()*40,GY],[70+R()*40,GY+8],[66+R()*40,GY+16]])); break;
    case "grass": { D("ground", poly([[0,140],[0,GY],[240,GY],[240,140]])); for (let i=0;i<5;i++){ const gx = 10+R()*220; D("halo", tri([gx-3,GY],[gx,GY-8],[gx+3,GY])); } break; }
    case "dunes": D("ground", poly([[0,140],[0,GY-4],[60,GY-12],[130,GY-2],[190,GY-10],[240,GY-4],[240,140]])); break;
    default: D("ground", poly([[0,140],[0,GY],[240,GY],[240,140]]));
  }
}

/* ---- backdrop scenes (behind everything), chosen from the name's words and the element ---- */
const SCENE_WORDS = { cave:"deep abyss abyssal cavern cave burrow burrower mole tunnel underground", cloudbank:"sky skies cloud clouds storm squall gale tempest cirrus",
  disc:"sun solar dawn moon moonlit night eclipse", planet:"star starfall cosmic astral celestial eternity eternal infinity", forest:"grove root roots moss forest wild verdant treant oak bloom",
  ruins:"ancient temple ruin elder old obelisk sanctuary throne", horizon:"sea ocean tide tidal shoal harbor reef wave kraken leviathan", peaks:"mountain peak peaks cliff crag canyon titan giant",
  rays:"radiant judgment glory divine holy flare", spires:"crystal crystalline geode obsidian spire" };
const SCENE_MAP = new Map(); for (const [k, ws] of Object.entries(SCENE_WORDS)) for (const w of ws.split(" ")) SCENE_MAP.set(w, k);
const EL_SCENES = { fire:["bands","rays","peaks","halo","split","mosaic"], water:["horizon","cave","halo","bands","mosaic","disc"], earth:["peaks","cave","ruins","spires","halo","mosaic"],
  wind:["cloudbank","peaks","bands","halo","rays","forest"], lightning:["planet","rays","cloudbank","split","mosaic","halo"] };
function sceneBack(D, kind, R, x){
  switch (kind){
    case "bands": { const sy = 54 + R()*20; D("sky", rect(0,0,240,sy))("halo", circ(x + (R()-0.5)*80, sy+4, 22+R()*12))("far2", rect(0,sy,240,18))("far", rect(0,sy+18,240,60)); break; }
    case "rays": { const px = x + (R()-0.5)*60, py = R()<0.5 ? 150 : -10; for (let i=0;i<9;i+=2){ const a1 = Math.PI*(i/9), a2 = Math.PI*((i+1)/9), dir = py>70 ? -1 : 1; D("far2", tri([px,py],[px+Math.cos(a1)*320, py+dir*Math.sin(a1)*320],[px+Math.cos(a2)*320, py+dir*Math.sin(a2)*320])); } break; }
    case "disc": { const cx = x + (R()<0.5 ? -1 : 1)*(30 + R()*30); D("far", circ(cx, 48, 40+R()*16))("far2", circ(cx, 48, 58+R()*14)); if (R()<0.5) D("far2", circ(cx+16, 40, 34)); break; }
    case "peaks": { const back = [[0,GY],[0,70]], front = [[0,GY],[0,96]]; for (let i=1;i<=6;i++) back.push([i*40-20, 40+R()*30],[i*40, 70+R()*20]); for (let i=1;i<=4;i++) front.push([i*60-30, 64+R()*24],[i*60, 96+R()*10]); back.push([240,GY]); front.push([240,GY]); D("far2", poly(back))("far", poly(front)); break; }
    case "forest": for (let i=0;i<9;i++){ const tx = i*30 - 10 + R()*10, th = 40 + R()*36, role = i%2 ? "far2" : "far"; D(role, tri([tx-14,GY],[tx,GY-th],[tx+14,GY]))(role, tri([tx-10,GY-th*0.4],[tx,GY-th-12],[tx+10,GY-th*0.4])); } break;
    case "ruins": for (let i=0;i<4;i++){ const cx = 20 + i*66 + R()*10, h = 40 + R()*50; D(i%2?"far":"far2", poly([[cx-8,GY],[cx-8,GY-h],[cx-3,GY-h-6],[cx+2,GY-h+2],[cx+8,GY-h-3],[cx+8,GY]]))(i%2?"far":"far2", rect(cx-11,GY-h-1,22,5)); } if (R()<0.5) D("far2", poly([[150,GY],[150,52],[160,40],[200,40],[210,52],[210,GY],[198,GY],[198,58],[162,58],[162,GY]])); break;
    case "cave": D("deep", poly([[0,0],[240,0],[240,140],[226,140],[222,70],[200,30],[160,14],[80,14],[40,30],[18,70],[14,140],[0,140]])); for (let i=0;i<7;i++){ const sx = 50 + i*22 + R()*8; D("deep", tri([sx-6,14],[sx,28+R()*16],[sx+6,14])); } break;
    case "horizon": { const hy = 70 + R()*16; D("sky", rect(0,0,240,hy))("far", rect(0,hy,240,140-hy)); for (let i=0;i<4;i++){ const wx = R()*220, wy = hy + 8 + R()*30; D("far2", poly([[wx,wy],[wx+10,wy-4],[wx+20,wy]])); } break; }
    case "mosaic": for (let gx=0; gx<240; gx+=40) for (let gy=0; gy<140; gy+=35){ const r = R(); if (r<0.4) continue; D(r<0.7?"far2":"sky", r<0.85 ? tri([gx,gy],[gx+40,gy],[gx,gy+35]) : tri([gx+40,gy],[gx+40,gy+35],[gx,gy+35])); } break;
    case "split": D("far2", poly(R()<0.5 ? [[0,0],[150+R()*60,0],[60+R()*40,140],[0,140]] : [[240,0],[60+R()*60,0],[140+R()*40,140],[240,140]])); break;
    case "cloudbank": for (let i=0;i<3;i++){ const cy = 20 + i*22 + R()*8, cx = R()*240; D(i%2?"far":"far2", poly([[cx-70,cy+12],[cx-60,cy],[cx-40,cy-6],[cx-24,cy-16],[cx,cy-12],[cx+20,cy-20],[cx+44,cy-8],[cx+66,cy-2],[cx+76,cy+12]])); } break;
    case "spires": for (let i=0;i<6;i++){ const sx = i<3 ? 10 + i*24 + R()*8 : 160 + (i-3)*26 + R()*8, h = 40 + R()*60; D(i%2?"far":"far2", poly([[sx-9,GY],[sx-5,GY-h],[sx,GY-h-10],[sx+5,GY-h],[sx+9,GY]])); } break;
    case "planet": { const px = x + (R()<0.5?-1:1)*(40+R()*20), py = 32 + R()*10; D("far", circ(px, py, 22+R()*8))("far2", ell(px, py, 38, 7)); for (let i=0;i<6;i++) D("sky", star(R()*240, R()*60, 3, 1.2, 4)); break; }
    default: D("halo", circ(x, 66, 46 + R()*14))("halo", circ(x, 66, 30 + R()*8));
  }
}
// Small things at the edges of the ground.
function foreground(D, R, el){
  const n = R()<0.45 ? 0 : 1 + Math.floor(R()*2);
  for (let i=0;i<n;i++){
    const fx = R()<0.5 ? 10 + R()*34 : 196 + R()*34, kind = pick(R, ["rocks","grass","crystals","post","mushrooms","bones","flowers","stump"]);
    switch (kind){
      case "rocks": D("dark", ngon(fx, GY-4, 9, 6, 0.3))("base", ngon(fx+10, GY-2, 6, 5)); break;
      case "grass": for (let k=0;k<4;k++) D("dark", tri([fx+k*5-2,GY],[fx+k*5+R()*4-2,GY-10-R()*10],[fx+k*5+3,GY])); break;
      case "crystals": D("light", poly([[fx-6,GY],[fx-4,GY-20],[fx,GY-26],[fx+4,GY-20],[fx+6,GY]]))("base", poly([[fx+4,GY],[fx+8,GY-12],[fx+12,GY-14],[fx+14,GY]])); break;
      case "post": D("dark", rect(fx-2,GY-36,4,36))("cloth", poly([[fx+2,GY-36],[fx+16,GY-32],[fx+2,GY-26]])); break;
      case "mushrooms": D("light", rect(fx-1,GY-8,3,8))("cloth", poly([[fx-6,GY-8],[fx,GY-14],[fx+7,GY-8]]))("light", rect(fx+9,GY-5,2,5))("cloth", poly([[fx+5,GY-5],[fx+10,GY-9],[fx+14,GY-5]])); break;
      case "bones": D("light", quad([fx-10,GY-3],[fx+10,GY-5],3))("light", circ(fx-11,GY-4,2.6))("light", circ(fx+11,GY-5,2.6)); break;
      case "flowers": for (let k=0;k<3;k++){ const px = fx+k*7; D("dark", quad([px,GY],[px,GY-10-k*2],1.6))("glow", ngon(px,GY-12-k*2,3,5)); } break;
      case "stump": D("dark", poly([[fx-9,GY],[fx-7,GY-12],[fx+7,GY-12],[fx+9,GY]]))("light", ell(fx,GY-12,7,2.4)); break;
    }
  }
}
// Extra damage scenes added for variety.
function sceneBoltExtra(D, kind, x, R, el){
  const tx = x + 44;
  switch (kind){
    case "chain": { const pts = [[x-60,40],[x-10,96],[x+30,70],[x+70,100]]; for (let i=1;i<pts.length;i++){ const [ax,ay] = pts[i-1], [bx,by] = pts[i]; D("glow", poly([[ax,ay],[ (ax+bx)/2+6,(ay+by)/2-6],[ (ax+bx)/2+2,(ay+by)/2],[bx,by],[(ax+bx)/2-6,(ay+by)/2+6],[(ax+bx)/2-2,(ay+by)/2]])); }
      for (const [px,py] of pts.slice(1)){ const g = Drawing(); foe(g, 0, R); D.group(`translate(${px} ${py-GY+22}) scale(0.6)`, g); } return; }
    case "fist": D("base", poly([[x-70,GY],[x-40,70],[x-10,60],[x+10,64],[x+20,52],[x+38,56],[x+40,74],[x+24,84],[x+26,96],[x-20,GY]]))("shade", poly([[x-40,GY],[x+26,96],[x+24,84],[x-20,GY]]))("light", rect(x+4,58,12,6))("light", rect(x+22,60,10,6)); burst(D, x+48, 60, R); return;
    case "orbit": artPerson(D, x, R, {pose:"float", gear:[null,null], head:EL_HAIR[el]||"hood"}); for (let i=0;i<5;i++){ const a = i*2*Math.PI/5 + R(); missile(D, el, x + Math.cos(a)*54, 66 + Math.sin(a)*30, 0.45); } return;
    case "crash": foe(D, tx+20, R); hold(D, "round", tx-4, 80, 1, 3); missile(D, el, x-20, 56, 1.3); burst(D, tx-4, 76, R); return;
    case "duel": artPerson(D, x-50, R, {pose:"lunge", gear:[null,"spark"], head:EL_HAIR[el]||"none"}); D("glow", quad([x-26,62],[x+30,62],5))("light", quad([x-26,62],[x+30,62],2)); artPerson(D, x+56, R, {pose:"guard", gear:[null,"round"], scale:0.9}); return;
    case "volley": artPerson(D, x-56, R, {pose:"point", gear:["bow",null]}); for (let i=0;i<4;i++){ const ay = 30 + i*14; D("light", quad([x-20+i*6,ay],[x+40+i*6,ay+10],2.5))("glow", tri([x+40+i*6,ay+6],[x+52+i*6,ay+12],[x+38+i*6,ay+14])); } return;
  }
}
function drawCreature(F, fig, role, x, R, words, el, d){
  switch (fig){
    case "dragon": artDragon(F, x, R, el); break;
    case "phoenix": artBird(F, x, R, {phoenix:true, crest:true}); break;
    case "bird": artBird(F, x, R, {crest:R()<0.4, griffin:words.includes("griffin")}); break;
    case "serpent": artSerpent(F, x, R, words); break;
    case "hydra": artHydra(F, x, R); break;
    case "kraken": artKraken(F, x, R); break;
    case "crab": artCrab(F, x, R); break;
    case "turtle": artTurtle(F, x, R); break;
    case "fish": artFish(F, x, R, words); break;
    case "bug": artBug(F, x, R); break;
    case "beast": artBeast(F, x, R, words); break;
    case "tree": artTree(F, x, R, words); break;
    case "golem": artGolem(F, x, R, words); break;
    case "giant": artPerson(F, x, R, {role:role||pick(R,["blade","smith","none","brawler"]), scale:1.2, horns:words.includes("ogre")||words.includes("troll"), el, broad:true, robe:false, build:pick(R,["broad","stout","tall"])}); break;
    case "spirit": artSpirit(F, x, R, words, el); break;
    case "swarm": artSwarm(F, x, R, el); break;
    case "human": artPerson(F, x, R, {role, el, horns:words.includes("imp")}); break;
    default: artPlace(F, fig, x, R, el);
  }
}
function cardArt(d, cls){
  if (!d || !d.name) return "";
  const key = d.id + "|" + (cls||"");
  if (ART_CACHE.has(key)) return ART_CACHE.get(key);
  const R = artRng(artHash(d.id || d.name));
  const words = artWords(d);
  const parents = CONFLUENCE_SAFE[d.el] || [d.el];
  const el = parents[Math.floor(R()*parents.length)];
  const P = varyPalette(artPalette(d.el), R);
  const { fig, role } = artSubject(d, words);
  const x = 120;
  const B = Drawing(), F = Drawing();   // backdrop, figure
  // backdrop scene: from the name if a word calls for one, otherwise one that suits the element
  let scene = null; for (const w of words) if (!scene && SCENE_MAP.has(w)) scene = SCENE_MAP.get(w);
  if (!scene || R()<0.25) scene = pick(R, EL_SCENES[el] || EL_SCENES.fire);
  sceneBack(B, scene, R, x);
  let sky = null, ground = null;
  for (const w of words){ if (!sky && SKY_MAP.has(w)) sky = SKY_MAP.get(w); if (!ground && GROUND_MAP.has(w)) ground = GROUND_MAP.get(w); }
  if (!sky && R()<0.45) sky = EL_SKY[el];
  if (!ground) ground = R()<0.75 ? EL_GROUND[el] : pick(R, ["hills","dunes","plain","grass","waves","cracks"]);
  if (scene==="cave"||scene==="horizon") sky = null;
  backdrop(B, sky, ground, R);
  // composition: size, position, close-ups and pairs
  let comp = "normal";
  if (d.type==="creature"){
    const c = R();
    if (c < 0.14 && ["human","giant","golem","spirit"].includes(fig)) comp = "close";
    else if (c < 0.27 && ["golem","giant","beast","tree","turtle"].includes(fig)) comp = "big";
    else if (c < 0.42 && ["human","beast","bird","spirit","golem","serpent","bug","fish","crab","tree"].includes(fig)) comp = "pair";
  }
  const scale = comp==="close" ? 1.8 : comp==="big" ? 1.3 + R()*0.12 : comp==="pair" ? 0.72 + R()*0.08 : (d.type==="creature" ? 0.84 + R()*0.24 : 0.88 + R()*0.16);
  const dx = comp==="close" ? (R()-0.5)*20 : comp==="pair" ? (R()<0.5?-1:1)*(22 + R()*10) : (R()-0.5)*(d.type==="creature" ? 44 : 24);
  const cy = comp==="close" ? GY + 78 : comp==="big" ? GY + 8 : GY;
  if (d.type==="creature"){
    if (comp==="pair"){ const g = Drawing(), R2 = artRng(artHash(d.id+"#2")); drawCreature(g, fig, role, x, R2, words, el, d); F.group(`translate(${r1(x - dx*2.1)} ${GY-6}) scale(0.62) translate(${-x} ${-GY})`, g); }
    const flying = ["dragon","phoenix","bird","kraken","spirit","swarm"].includes(fig);
    if (d.kw.includes("airborne") && !flying) F("soft", poly([[x-8,60],[x-50,30],[x-40,52],[x-58,52],[x-12,74]]))("soft", poly([[x+8,60],[x+50,30],[x+40,52],[x+58,52],[x+12,74]]));
    if (d.kw.includes("ward")) F("halo", ngon(x, 66, 58, 6, 0));
    const body = Drawing();
    drawCreature(body, fig, role, x, R, words, el, d);
    if (fig==="human" && comp==="normal"){ const extra = R(); if (extra < 0.12){ const g = Drawing(); artBeast(g, 0, R, ["wolf"]); body.group(`translate(${x+58} 56) scale(0.55)`, g); } }
    F.group("", body);
    if (d.kw.includes("haste")) F("soft", rect(x-92,58,24,5))("soft", rect(x-98,72,30,5))("soft", rect(x-92,86,24,5));
    if (d.kw.includes("drain")) F("glow", poly([[x+62,18],[x+68,30],[x+66,36],[x+58,36],[x+56,30]]));
    if (d.fort) F("light", poly([[x-84,96],[x-70,96],[x-70,110],[x-77,116],[x-84,110]]));
  } else if (fig){
    artPlace(F, fig, x, R, el);
  } else {
    const k = artEffect(d);
    const scn = D => {
      switch (k){
        case "bolt": return sceneBolt(D, x, R, el, words);
        case "nova": return sceneNova(D, x, R, el);
        case "freeze": return sceneFreeze(D, x, R);
        case "bounce": return sceneBounce(D, x, R, el);
        case "summon": return sceneSummon(D, x, R, el);
        case "buff": return sceneBuff(D, x, R, el);
        case "draw": return sceneDraw(D, x, R, el);
        case "heal": return sceneHeal(D, x, R, el);
        case "destroy": return sceneDestroy(D, x, R);
        case "orb": return sceneOrb(D, x, R, el);
        case "counter": return sceneCounter(D, x, R);
        default: return sceneRune(D, x, R);
      }
    };
    if (d.type==="aura"){
      pick(R, [
        () => { F("dark", ngon(x,66,52,8,Math.PI/8))("base", ngon(x,66,44,8,Math.PI/8)); const g = Drawing(); scn(g); F.group(`translate(${x} 66) scale(0.58) translate(${-x} -66)`, g); },
        () => artPlace(F, pick(R, ["altar","fire","tower","crystal","pool","garden"]), x, R, el),
        () => { scn(F); F("soft", poly([[x-90,14],[x,4],[x+90,14],[x+90,18],[x,8],[x-90,18]])); },
        () => { F("dark", poly([[x-56,GY],[x-56,30],[x,6],[x+56,30],[x+56,GY]]))("base", poly([[x-46,GY],[x-46,36],[x,16],[x+46,36],[x+46,GY]])); const g = Drawing(); scn(g); F.group(`translate(${x} 74) scale(0.55) translate(${-x} -66)`, g); },
      ])();
    } else if (d.type==="reaction"){
      pick(R, FRAMES)(F, x); const g = Drawing(); scn(g); F.group(`translate(${x} 62) scale(0.56) translate(${-x} -66)`, g);
    } else scn(F);
  }
  foreground(F, R, el);
  const flip = R() < 0.4 ? ` transform="translate(${2*x} 0) scale(-1 1)"` : "";
  const t = `translate(${r1(x+dx)} ${r1(cy)}) scale(${r1(scale*100)/100}) translate(${-x} ${-GY})`;
  const svg = `<svg class="art ${cls||""}" viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="240" height="140" fill="${P.bg}"/>${renderDrawing(B, P)}<g${flip}><g transform="${t}">${renderDrawing(F, P)}</g></g></svg>`;
  ART_CACHE.set(key, svg);
  return svg;
}
const CONFLUENCE_SAFE = (typeof CONFLUENCE!=="undefined") ? CONFLUENCE : {};
