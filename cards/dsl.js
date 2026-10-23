/* ---------------- Card language ----------------
   Cards are written as compact effect strings, compiled into behavior and rules text.
   "trigger[/condition]: atom; atom | trigger: atom"
   Triggers: play death attack block start end spell react creature card spend manifest static
   Conditions: ignite, chainN, thN (Attuned N), ocN (Overcharge N) */
// Targeted cards may pick any creature, so the hand-written starter texts drop "enemy" / "your" from their target.
for (const c of Object.values(LIB)) if (c.target && c.text) c.text = c.text
  .replace(/\b([Aa])n enemy (basic )?creature/g, (m, a, b) => `${a} ${b||""}creature`)
  .replace(/\byour attacking creature\b/g, "an attacking creature");
const TOKENS = {};
function tok(id, name, el, atk, hp, kw){
  const k = kw ? kw.split(" ") : [];
  TOKENS[id] = { id:"tok_"+id, name, el, type:"creature", cost:0, atk, hp, kw:k, token:true, charge:0, r:"t",
    text: (k.length ? k.map(x=>KW_NAMES[x]).join(". ")+". " : "") + "Token." };
}
tok("wisp","Wisp","wind",2,2,"airborne");
tok("wisp1","Zephyr Wisp","wind",1,1,"airborne");
tok("roc","Gale Roc","wind",3,3,"airborne");
tok("ember","Ember Spark","fire",1,2,"haste");
tok("drake","Fire Drake","fire",3,3,"airborne");
tok("droplet","Droplet","water",1,2,"");
tok("elemental","Water Elemental","water",3,4,"");
tok("stoneling","Stoneling","earth",2,2,"");
tok("golemTok","Stone Golem","earth",4,4,"");
tok("spark","Spark","lightning",1,1,"haste");
tok("storm","Storm Elemental","lightning",3,2,"haste");
// Confluence tokens (used by special cards)
tok("magmite","Magmite","volcano",2,1,"");
tok("mudling","Mudling","swamp",2,2,"venom");
tok("drone","Steel Drone","metal",2,2,"barrier");
tok("volt","Volt Sprite","tempest",1,1,"airborne haste");
tok("ashling","Ashling","ash",1,1,"haste");
tok("cinderbird","Cinderbird","ash",2,2,"airborne");
tok("mirror","Mirror Image","mirage",2,2,"");
tok("iceblock","Ice Block","glacier",0,4,"wall");
tok("blob","Quicksilver Blob","quicksilver",1,1,"");
tok("gust","Gust Wisp","hurricane",1,2,"airborne");
tok("shard","Glass Shard","glass",1,1,"");

let CUR_EL = "fire", CUR_R = "c";
// Special cards: hand-designed confluence cards with unique effects. "basic" ones are made by a recipe; "mani" ones are special Manifests.
let SPECIAL_MODE = null; const SPECIALS = [];
function SPEC(conf){ CUR_EL = conf; SPECIAL_MODE = "basic"; }
function SPECM(conf){ CUR_EL = conf; SPECIAL_MODE = "mani"; }
function ENDSPEC(){ SPECIAL_MODE = null; }
let LATE2 = false;
let DSL_DRY = false;   // build a card without registering it (used to re-tune an existing card's numbers)
// Scale the amounts in an effect string (damage, healing, buffs, zaps, token counts) by s, keeping at least 1.
function scaleFx(fx, s){
  const R = n => Math.max(1, Math.round(+n*s));
  return fx.split("|").map(b => { const i = b.indexOf(":"); if (i<0) return b;
    const head = b.slice(0,i), body = b.slice(i+1).split(";").map(a => { const t = a.trim().split(/\s+/), v = t[0];
      // Scaling never pushes damage past 6 (or past what the card already dealt): big burn is lethal in a 15-life game.
      if (v==="dmg" && +t[2]>0) t[2] = s>1 ? Math.min(R(t[2]), Math.max(+t[2], 6)) : R(t[2]);
      else if (v==="heal" || v==="maxlife") t[1] = R(t[1]);
      else if (v==="buff"){ for (const j of [2,3]){ if (+t[j]>0) t[j] = R(t[j]); else if (+t[j]<0) t[j] = -R(-t[j]); } }
      else if (v==="buffs"){ for (const j of [2,3]) if (+t[j]>0) t[j] = R(t[j]); }
      else if ((v==="charge" || v==="energy") && s>=1.5) t[1] = R(t[1]);
      else if (v==="zaps") t[2] = s>1 ? Math.min(R(t[2]), Math.max(+t[2], 3)) : R(t[2]);   // pings stay small
      else if (v==="summon" && s>=1.5) t[2] = R(t[2]);
      return " "+t.join(" "); }).join(";");
    return head+":"+body; }).join(" | ");
}
// Rebuild an existing DSL card with a new effect string (same name, cost, stats, targets).
function respecCard(d, fx){
  const o = { name:d.name, type:d.type, cost:d.cost, atk:d.atk, hp:d.hp, kw:d.kw.join(" "), fx, tgt:d.tgtS, ch:d.charge, fort:d.fort, id:d.id };
  if (d.manifest) o.mcost = d.mcost[d.el];
  const sv = [CUR_EL, CUR_R, SPECIAL_MODE, LATE2]; CUR_EL = d.el; CUR_R = d.r; SPECIAL_MODE = null; LATE2 = false; DSL_DRY = true;
  let n; try { n = dsl(o); } finally { [CUR_EL, CUR_R, SPECIAL_MODE, LATE2] = sv; DSL_DRY = false; }
  for (const k of ["text","play","death","onAttack","onBlock","onHurt","on","st","oc","target","fx"]) d[k] = n[k];
  if (d.manifest) n.mcost = d.mcost;
}   // set while defining the second wave of regular confluence Manifests
function setEl(el){ CUR_EL = el; }
function setR(r){ CUR_R = r; }
function slug(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,""); }
const NUMW = ["no","a","two","three","four","five","six"];
const cap1 = s => s.charAt(0).toUpperCase()+s.slice(1);
function joinAnd(a){ return a.length<=1 ? (a[0]||"") : a.slice(0,-1).join(", ")+" and "+a[a.length-1]; }

const COND_RE = /^(ignite|frz|(chain|th|oc|low|hand|aura|grave|tok|own|mani|spell)\d+)$/;
function parseFx(str){
  if (!str) return [];
  return str.split("|").map(b=>{
    const i = b.indexOf(":");
    const head = b.slice(0,i).trim(), body = b.slice(i+1).trim();
    let [trig, cond] = head.split("/");
    if (COND_RE.test(trig)){ cond = trig; trig = "play"; }
    const atoms = body.split(";").map(a=>a.trim().split(/\s+/)).filter(a=>a[0]);
    return { trig, cond, atoms };
  });
}

/* ---- targets ---- */
const TGT_BASE = { e:"enemyCreature", ea:"enemyAny", o:"ownCreature", oatk:"ownAttacker", eatk:"enemyAttacker" };
function tgtFilters(parts){
  return parts.map(f=>{
    let m;
    if (f==="basic") return t=>!t.c.d.manifest;
    if (f==="air") return t=>hasKw(t.c,"airborne");
    if (f==="frozen") return t=>t.c.frozen;
    if ((m=f.match(/^atk<=(\d+)$/))) return t=>atkOf(t.c)<=+m[1];
    if ((m=f.match(/^hp<=(\d+)$/))) return t=>hpLeft(t.c)<=+m[1];
    if ((m=f.match(/^cost<=(\d+)$/))) return t=>!t.c.d.manifest && t.c.d.cost<=+m[1];
    throw new Error("Unknown target filter "+f);
  });
}
function tgtSpec(s, type){
  const [base, ...fl] = s.split(":");
  const fs = tgtFilters(fl);
  const spec = { type:TGT_BASE[base] };
  if (fs.length) spec.filter = t => t.kind==="player" || fs.every(f=>f(t));
  if (type==="creature") spec.optional = true;
  return spec;
}
function tgtText(s){
  const [base, ...fl] = s.split(":");
  let basic = fl.includes("basic") ? " basic" : "";
  let suffix = "";
  for (const f of fl){
    let m;
    if ((m=f.match(/^atk<=(\d+)$/))) suffix += ` with ${m[1]} or less attack`;
    if ((m=f.match(/^hp<=(\d+)$/))) suffix += ` with ${m[1]} or less health`;
    if ((m=f.match(/^cost<=(\d+)$/))) { basic = " basic"; suffix += ` that costs ${m[1]} or less`; }
    if (f==="air") suffix += " with Airborne";
    if (f==="frozen") suffix = " that is frozen";
  }
  switch (base){
    case "e": return `a${basic} creature${suffix}`;
    case "ea": return `a creature${suffix} or the enemy`;
    case "o": return `a${basic} creature${suffix}`;
    case "oatk": return `an attacking creature`;
    case "eatk": return `an attacking${basic} creature${suffix}`;
  }
}
const GROUP = {
  face:"the enemy", all_e:"every enemy creature", all:"every creature", all_ef:"every enemy creature and the enemy",
  str:"the enemy creature with the highest attack", weak:"the enemy creature with the lowest health",
  self:"this creature", own:"your creatures", other:"your other creatures", air:"your Airborne creatures", tok:"your tokens",
  all_eb:"every enemy basic creature", all_eb3:"every enemy basic creature that costs 3 or less", me:"you",
  frz_e:"every frozen enemy creature", ostr:"your creature with the highest attack", oweak:"your creature with the lowest attack",
  rnd:"a random enemy creature", eair:"every enemy Airborne creature", oth:"every other creature", grnd:"a random creature you control"
};
const PLURAL = new Set(["all_e","all","all_ef","own","other","air","tok","all_eb","all_eb3","frz_e","eair","oth"]);
function tgtList(x, T){
  const cr = c => ({kind:"creature", c});
  const o = x.o, p = x.p;
  const live = c => onBoard(c);
  switch (T){
    case "t": return x.t && (x.t.kind==="player" || live(x.t.c)) ? [x.t] : [];
    case "face": return [{kind:"player", p:o}];
    case "me": return [{kind:"player", p}];
    case "all_e": return o.board.map(cr);
    case "all": return [...p.board, ...o.board].map(cr);
    case "all_ef": return [...o.board.map(cr), {kind:"player", p:o}];
    case "all_eb": return o.board.filter(c=>!c.d.manifest).map(cr);
    case "all_eb3": return o.board.filter(c=>!c.d.manifest && c.d.cost<=3).map(cr);
    case "str": { const c = [...o.board].sort((a,b)=>atkOf(b)-atkOf(a))[0]; return c ? [cr(c)] : []; }
    case "weak": { const c = [...o.board].sort((a,b)=>hpLeft(a)-hpLeft(b))[0]; return c ? [cr(c)] : []; }
    case "self": return x.self && x.self.d && live(x.self) ? [cr(x.self)] : [];
    case "own": return p.board.map(cr);
    case "other": return p.board.filter(c=>c!==x.self).map(cr);
    case "air": return p.board.filter(c=>hasKw(c,"airborne")).map(cr);
    case "tok": return p.board.filter(c=>c.d.token).map(cr);
    case "frz_e": return o.board.filter(c=>c.frozen).map(cr);
    case "eair": return o.board.filter(c=>hasKw(c,"airborne")).map(cr);
    case "oth": return [...p.board, ...o.board].filter(c=>c!==x.self).map(cr);
    case "ostr": { const c = [...p.board].sort((a,b)=>atkOf(b)-atkOf(a))[0]; return c ? [cr(c)] : []; }
    case "oweak": { const c = [...p.board].filter(c=>c!==x.self).sort((a,b)=>atkOf(a)-atkOf(b))[0]; return c ? [cr(c)] : []; }
    case "rnd": { const l = o.board.filter(c=>!hasKw(c,"ward")); return l.length ? [cr(l[Math.floor(Math.random()*l.length)])] : []; }
    case "grnd": { const l = p.board.filter(c=>c!==x.self); return l.length ? [cr(l[Math.floor(Math.random()*l.length)])] : []; }
  }
  throw new Error("Unknown target group "+T);
}
function scaleOf(x, sc){
  switch (sc){
    case "chain": return x.chain;
    case "air": return x.p.board.filter(c=>hasKw(c,"airborne")).length;
    case "own": return x.p.board.length;
    case "charge": return x.p.charge[chEl(x.p, x.el)]||0;
    case "hand": return x.p.hand.length;
    case "grave": return x.p.grave.filter(d=>d.type==="creature").length;
    case "aura": return x.p.auras.length;
    case "frz": return x.o.board.filter(c=>c.frozen).length;
    case "tok": return x.p.board.filter(c=>c.d.token).length;
    case "spells": return x.p.spells||0;
    case "mani": return x.p.maniCast||0;
    case "lost": return Math.floor(Math.max(0, x.p.maxLife - x.p.life)/3);
    case "x": return x.x||0;
    case "atk": return x.self && x.self.d ? atkOf(x.self) : 0;
  }
  return 0;
}
const SCALE_TXT = { chain:"other card you played this turn", air:"Airborne creature you control", own:"creature you control", charge:"",
  hand:"card in your hand", grave:"creature card in your grave", aura:"aura you control", frz:"frozen enemy creature", tok:"token you control",
  spells:"spell or Reaction you played this turn", mani:"Manifest you've cast this game", lost:"3 life you're missing" };
function spellPower(p){ let n = 0; forStatics(p, s=>{ if (s.k==="sp") n += s.n; }); return n; }
const TOKEN_COPY = new Map();
function tokenCopy(d){ let t = TOKEN_COPY.get(d.id); if (!t){ t = Object.assign({}, d, { token:true, r:"t", manifest:false, id:d.id }); TOKEN_COPY.set(d.id, t); } return t; }
const SILENCED = new Map();
function silencedDef(d){ let t = SILENCED.get(d.id); if (!t){ t = Object.assign({}, d, { kw:[], fort:0, play:undefined, death:undefined, onAttack:undefined, onBlock:undefined, onHurt:undefined, on:undefined, st:undefined, text:"Silenced: no abilities.", silenced:true }); SILENCED.set(d.id, t); } return t; }
function stealCr(c, p){
  if (!onBoard(c) || c.owner===p.i || p.board.length>=BOARD_MAX) return;
  const from = g.P[c.owner]; from.board.splice(from.board.indexOf(c),1);
  c.owner = p.i; c.sick = true; c.attacking = false; c.exhausted = false; p.board.push(c);
  log(`${p.name} ${p.isAI?"takes":"take"} control of ${c.d.name}.`);
}

/* ---- atoms ---- */
const ATOM = {
  dmg(x,[T,n,sc]){ const v = +n + scaleOf(x, sc) + ((x.ctype==="spell"||x.ctype==="reaction") ? spellPower(x.p) : 0); if (v<=0) return; for (const t of tgtList(x,T)){ if (t.kind==="player") dmgPlayer(t.p, v, x.name); else { dmgCreature(t.c, v); } } },
  heal(x,[n]){ heal(x.p,+n); },
  draw(x,[n]){ drawN(x.p,+n); },
  energy(x,[n]){ gainEnergy(x.p,+n); },
  charge(x,[n]){ gainCharge(x.p, x.el, +n); },
  selfdmg(x,[n]){ dmgPlayer(x.p, +n, x.name); },
  buff(x,[T,a,h,tmp]){ for (const t of tgtList(x,T)) if (t.c) buff(t.c, +a, +h, tmp==="temp"); },
  kw(x,[T,k,tmp]){ for (const t of tgtList(x,T)) if (t.c) addKw(t.c, k, tmp==="temp"); },
  freeze(x,[T]){ for (const t of tgtList(x,T)) if (t.c) freeze(t.c); },
  bounce(x,[T]){ for (const t of tgtList(x,T)) if (t.c && !t.c.d.manifest) bounce(t.c); },
  destroy(x,[T]){ for (const t of tgtList(x,T)) if (t.c && onBoard(t.c)){ t.c.dmg = 999; t.c.hp = Math.min(t.c.hp, 0); } },
  noblock(x,[T]){ for (const t of tgtList(x,T)) if (t.c) t.c.noBlock = true; },
  untap(x,[T]){ for (const t of tgtList(x,T)) if (t.c){ t.c.exhausted = false; t.c.frozen = false; } },
  summon(x,[id,n]){ for (let i=0;i<+n;i++) summon(x.p, TOKENS[id]); },
  revive(x,[n,mc]){ let k = +n; for (let i=x.p.grave.length-1; i>=0 && k>0; i--){ const d = x.p.grave[i]; if (d.type==="creature" && !d.manifest && !d.token && (!mc || d.cost<=+mc)){ x.p.grave.splice(i,1); summon(x.p, d); log(`${d.name} returns to play.`); k--; } } },
  regrow(x,[n,ty]){ let k = +n; for (let i=x.p.grave.length-1; i>=0 && k>0; i--){ const d = x.p.grave[i]; if (!d.manifest && (!ty || d.type===ty)){ x.p.grave.splice(i,1); x.p.hand.push(d); k--; } } },
  copy(x,[T,n]){ for (const t of tgtList(x,T)) if (t.c) for (let i=0;i<(+n||1);i++) summon(x.p, tokenCopy(t.c.d)); },
  steal(x,[T]){ for (const t of tgtList(x,T)) if (t.c) stealCr(t.c, x.p); },
  transform(x,[T,id]){ for (const t of tgtList(x,T)) if (t.c && onBoard(t.c) && !t.c.d.manifest){ const c = t.c, k = TOKENS[id]; log(`${c.d.name} turns into a ${k.name}.`); Object.assign(c, { d:k, atk:k.atk, hp:k.hp, dmg:0, tAtk:0, tHp:0, kws:null, tKws:null, shield:false }); } },
  swap(x,[T]){ for (const t of tgtList(x,T)) if (t.c && onBoard(t.c)){ const c = t.c; [c.atk, c.hp] = [c.hp, c.atk]; } },
  strike(x,[T]){ const src = x.self && x.self.d ? x.self : [...x.p.board].sort((a,b)=>atkOf(b)-atkOf(a))[0]; if (!src || !onBoard(src)) return; const v = atkOf(src); for (const t of tgtList(x,T)){ if (t.kind==="player") dmgPlayer(t.p, v, src.d.name); else if (t.c!==src) dmgCreature(t.c, v); } },
  sac(x){ const l = x.p.board.filter(c=>c!==x.self && !isDead(c)).sort((a,b)=>atkOf(a)-atkOf(b)); const c = l[0]; x.x = 0; if (!c) return; x.x = atkOf(c); c.dmg = 999; log(`${c.d.name} is sacrificed.`); },
  discard(x,[n]){ for (let i=0;i<+n && x.o.hand.length;i++){ const d = x.o.hand.splice(Math.floor(Math.random()*x.o.hand.length),1)[0]; x.o.grave.push(d); log(`${x.o.name} ${x.o.isAI?"discards":"discard"} ${d.name}.`); } },
  silence(x,[T]){ for (const t of tgtList(x,T)) if (t.c && onBoard(t.c)){ const c = t.c; c.d = silencedDef(c.d); c.kws = null; c.tKws = null; c.shield = false; log(`${c.d.name} is silenced.`); } },
  seek(x,[ty]){ const l = x.p.deck.map((d,i)=>[d,i]).filter(([d])=>!ty || ty==="any" || d.type===ty); if (!l.length) return; const [d,i] = l[Math.floor(Math.random()*l.length)]; x.p.deck.splice(i,1); x.p.hand.push(d); },
  maxlife(x,[n]){ x.p.maxLife += +n; x.p.life += +n; log(`${x.p.name} ${x.p.isAI?"gains":"gain"} ${n} maximum life.`); },
  double(x,[T]){ for (const t of tgtList(x,T)) if (t.c && onBoard(t.c)) t.c.tAtk += atkOf(t.c); },
  zaps(x,[n,d]){ for (let i=0;i<+n;i++){ const l = x.o.board.filter(c=>!hasKw(c,"ward") && !isDead(c)); if (!l.length) break; dmgCreature(l[Math.floor(Math.random()*l.length)], +d); } },
  fort(x,[T,n]){ for (const t of tgtList(x,T)) if (t.c && onBoard(t.c)) t.c.fortB = (t.c.fortB||0) + (+n); },
  buffs(x,[T,a,h,sc,tmp]){ const k = scaleOf(x, sc); if (!k) return; for (const t of tgtList(x,T)) if (t.c) buff(t.c, +a*k, +h*k, tmp==="temp"); }
};
let T_SEEN = null;   // within one sentence, the chosen target is named once and then called "it"
function atomText(a, d, tgtStr){
  const [v, ...r] = a;
  const desc = T => { if (T!=="t") return GROUP[T]; if (T_SEEN){ if (T_SEEN.seen) return "it"; T_SEEN.seen = true; } return tgtText(tgtStr); };
  const pl = T => PLURAL.has(T);
  const sgn = n => (+n>=0?"+":"")+(+n);
  switch (v){
    case "dmg": { const [T,n,sc] = r; const D = desc(T); let s = `deal ${n} damage to ${D}`;
      if (sc==="charge") s = `deal damage equal to ${n==="0"?"":n+" plus "}your ${ELS[d.el]} charge to ${D}`;
      else if (sc==="x") s = `deal damage equal to its attack${n==="0"?"":" plus "+n} to ${D}`;
      else if (sc==="atk") s = `deal damage equal to this creature's attack${n==="0"?"":" plus "+n} to ${D}`;
      else if (sc && n==="0") s = `deal 1 damage to ${D} for each ${SCALE_TXT[sc]}`;
      else if (sc) s += `, plus 1 for each ${SCALE_TXT[sc]}`; return s; }
    case "revive": { const [n,mc] = r; const what = (n==="1" ? "the last basic creature card" : `the last ${NUMW[+n]} basic creature cards`) + (mc ? ` that cost${n==="1"?"s":""} ${mc} or less` : ""); return `put ${what} from your grave into play`; }
    case "regrow": { const [n,ty] = r; const w = ty ? ty : "card"; return `return the last ${n==="1" ? w : NUMW[+n]+" "+w+"s"} from your grave to your hand`; }
    case "copy": return +r[1]>1 ? `summon ${NUMW[+r[1]]} token copies of ${desc(r[0])}` : `summon a token copy of ${desc(r[0])}`;
    case "steal": return `take control of ${desc(r[0])}`;
    case "transform": { const k = TOKENS[r[1]]; const T = r[0], D = desc(T); return `turn ${T==="t" || D.includes("basic") ? D : D.replace("creature","basic creature")} into ${pl(T)?"":"a "}${k.atk}/${k.hp} ${k.name}${pl(T)?"s":""}`; }
    case "swap": return pl(r[0]) ? `swap the attack and health of ${desc(r[0])}` : `swap the attack and health of ${desc(r[0])}`;
    case "strike": return d.type==="creature" ? `this deals damage equal to its attack to ${desc(r[0])}` : `your creature with the highest attack deals damage equal to its attack to ${desc(r[0])}`;
    case "sac": return d.type==="creature" ? "destroy your other creature with the lowest attack" : "destroy your creature with the lowest attack";
    case "discard": return r[0]==="1" ? "the enemy discards a random card" : `the enemy discards ${NUMW[+r[0]]} random cards`;
    case "silence": return `remove all abilities and keywords from ${desc(r[0])}`;
    case "seek": { const ty = r[0]; return `put a random ${!ty || ty==="any" ? "card" : ty+" card"} from your deck into your hand`; }
    case "maxlife": return `raise your maximum life by ${r[0]} and gain ${r[0]} life`;
    case "double": return `double the attack of ${desc(r[0])} this turn`;
    case "zaps": return +r[0]===1 ? `deal ${r[1]} damage to a random enemy creature` : `deal ${r[1]} damage to a random enemy creature ${NUMW[+r[0]]==="two"?"twice":NUMW[+r[0]]+" times"}`;
    case "fort": return pl(r[0]) ? `${desc(r[0])} gain Fortify ${r[1]}` : r[0]==="self" ? `this gains Fortify ${r[1]}` : `give ${desc(r[0])} Fortify ${r[1]}`;
    case "buffs": { const [T,a,h,sc,tmp] = r; const st = `${sgn(a)}/${sgn(h)}`; const tail = ` for each ${SCALE_TXT[sc]}${tmp?" this turn":""}`; if (T==="self") return `this gets ${st}${tail}`; return pl(T) ? `${desc(T)} get ${st}${tail}` : `give ${desc(T)} ${st}${tail}`; }
    case "heal": return `gain ${r[0]} life`;
    case "draw": return r[0]==="1" ? "draw a card" : `draw ${r[0]} cards`;
    case "energy": return `gain ${r[0]} Energy`;
    case "charge": return `gain ${r[0]} ${ELS[d.el]} charge`;
    case "selfdmg": return `deal ${r[0]} damage to yourself`;
    case "buff": { const [T,a,h,tmp] = r; const st = `${sgn(a)}/${sgn(h)}`; if (T==="self") return `this gets ${st}${tmp?" this turn":""}`; return pl(T) ? `${desc(T)} get ${st}${tmp?" this turn":""}` : `give ${desc(T)} ${st}${tmp?" this turn":""}`; }
    case "kw": { const [T,k,tmp] = r; if (T==="self") return `this gains ${KW_NAMES[k]}${tmp?" this turn":""}`; return pl(T) ? `${desc(T)} gain ${KW_NAMES[k]}${tmp?" this turn":""}` : `give ${desc(T)} ${KW_NAMES[k]}${tmp?" this turn":""}`; }
    case "freeze": return `freeze ${desc(r[0])}`;
    case "bounce": { const T = r[0]; const base = T==="str"||T==="weak" ? desc(T).replace("enemy creature","enemy basic creature") : desc(T); return `return ${base} to ${pl(T)?"their owners' hands":"its owner's hand"}`; }
    case "destroy": return `destroy ${desc(r[0])}`;
    case "noblock": return `${desc(r[0])} can't block this turn`;
    case "untap": return `untap ${desc(r[0])}`;
    case "summon": { const t = TOKENS[r[0]], n = +r[1]; const kws = t.kw.map(k=>KW_NAMES[k]).join(" "); return `summon ${NUMW[n]} ${t.atk}/${t.hp}${kws?" "+kws:""} ${t.name}${n>1?"s":""}`; }
  }
  throw new Error("Unknown atom "+v);
}
// Merge a buff and keyword grants on the same target: "give X +2/+0 and Pierce this turn".
function sentenceOf(atoms, d, tgtStr){
  T_SEEN = { seen:false };
  try { return sentenceOf0(atoms, d, tgtStr); } finally { T_SEEN = null; }
}
function sentenceOf0(atoms, d, tgtStr){
  const parts = [];
  for (let i=0;i<atoms.length;i++){
    const a = atoms[i];
    if (a[0]==="buff" || a[0]==="kw"){
      const T = a[1], tmp = a[0]==="buff" ? a[4] : a[3];
      const kws = []; let st = null, j = i;
      for (; j<atoms.length; j++){
        const b = atoms[j];
        const bt = b[0]==="buff" ? b[4] : b[3];
        if ((b[0]!=="buff" && b[0]!=="kw") || b[1]!==T || bt!==tmp) break;
        if (b[0]==="buff"){ if (st) break; st = b; } else kws.push(KW_NAMES[b[2]]);
      }
      if (j-i>1){
        const sgn = n => (+n>=0?"+":"")+(+n);
        const bits = []; if (st) bits.push(`${sgn(st[2])}/${sgn(st[3])}`);
        const tt = tmp ? " this turn" : "";
        const desc = T==="t" ? (T_SEEN && T_SEEN.seen ? "it" : (T_SEEN && (T_SEEN.seen = true), tgtText(tgtStr))) : GROUP[T];
        if (T==="self") parts.push(`this gets ${[...bits, ...kws].join(" and ")}${tt}`.replace("gets "+kws.join(" and "), "gains "+kws.join(" and ")));
        else if (PLURAL.has(T)) parts.push(`${desc} ${st ? "get "+bits[0]+(kws.length?" and gain "+kws.join(" and "):"") : "gain "+kws.join(" and ")}${tt}`);
        else parts.push(`give ${desc} ${[...bits, ...kws].join(" and ")}${tt}`);
        i = j-1; continue;
      }
    }
    parts.push(atomText(a, d, tgtStr));
  }
  return joinAnd(parts);
}
const TRIG_TXT = { death:"Last Gasp: ", attack:"Whenever this attacks, ", block:"Whenever this blocks, ", start:"At the start of your turn, ",
  end:"At the end of your turn, ", spell:"Whenever you play a spell, ", react:"Whenever you play a Reaction, ",
  creature:"Whenever you play another creature, ", card:"Whenever you play another card, ", spend:"Whenever you spend charge, ",
  manifest:"Whenever you cast a Manifest, ", die:"Whenever another creature you control dies, ", edie:"Whenever an enemy creature dies, ",
  heal:"Whenever you gain life, ", draw:"Whenever you draw a card, ", freeze:"Whenever an enemy creature becomes frozen, ",
  ebounce:"Whenever an enemy creature returns to its owner's hand, ", face:"Whenever the enemy takes damage, ", pain:"Whenever you deal damage to yourself, ",
  charge:"Whenever you gain charge, ", token:"Whenever a token enters play on your side, ", aura:"Whenever you play another aura, ", hurt:"Whenever this takes damage, " };
function condLabel(c, d){
  if (c==="ignite") return ["Ignite", "you spent charge this turn"];
  let m;
  if ((m=c.match(/^chain(\d+)$/))) return [`Chain ${m[1]}`, `you played ${m[1]}+ other cards this turn`];
  if ((m=c.match(/^th(\d+)$/))) return [`Attuned ${m[1]}`, `you have ${m[1]}+ ${ELS[d.el]} charge`];
  if ((m=c.match(/^oc(\d+)$/))) return [`Overcharge ${m[1]}`, null];
  if ((m=c.match(/^low(\d+)$/))) return [`Desperate ${m[1]}`, `your life is ${m[1]} or less`];
  if (c==="frz") return [null, "an enemy creature is frozen"];
  const T = { hand:"you have N or more cards in hand", aura:"you control N or more auras", grave:"you have N or more creature cards in your grave",
    tok:"you control N or more tokens", own:"you control N or more creatures", mani:"you've cast N or more Manifests this game", spell:"you played N or more spells this turn" };
  if ((m=c.match(/^([a-z]+)(\d+)$/)) && T[m[1]]) return [null, T[m[1]].replace("N", m[2])];
  throw new Error("Unknown condition "+c);
}
function condOK(c, x, d){
  if (!c) return true;
  if (c==="ignite") return !!x.p.spent;
  if (c.startsWith("chain")) return x.chain >= +c.slice(5);
  if (c.startsWith("th")) return (x.p.charge[chEl(x.p, d.el)]||0) >= +c.slice(2);
  if (c.startsWith("oc")) return !!x.oc;
  if (c==="frz") return x.o.board.some(k=>k.frozen);
  const m = c.match(/^([a-z]+)(\d+)$/), n = m ? +m[2] : 0;
  switch (m && m[1]){
    case "low": return x.p.life <= n;
    case "hand": return x.p.hand.length >= n;
    case "aura": return x.p.auras.length >= n;
    case "grave": return x.p.grave.filter(d=>d.type==="creature").length >= n;
    case "tok": return x.p.board.filter(k=>k.d.token).length >= n;
    case "own": return x.p.board.length >= n;
    case "mani": return (x.p.maniCast||0) >= n;
    case "spell": return (x.p.spells||0) >= n;
  }
  return false;
}
function staticOf(a){
  const [k, ...r] = a;
  if (k==="lord") return { k:"lord", f:r[0], atk:+r[1], hp:+r[2] };
  if (k==="grant") return { k:"grant", f:r[0], kw:r[1] };
  if (k==="cost") return { k:"cost", type:r[0], n:+r[1] };
  if (k==="bank") return { k:"bank", n:+r[0] };
  if (k==="sp") return { k:"sp", n:+r[0] };
  throw new Error("Unknown static "+k);
}
const ST_F = { all:"Your creatures", other:"Your other creatures", air:"Your Airborne creatures", oair:"Your other Airborne creatures", tok:"Your tokens" };
function staticText(s){
  const sgn = n => (n>=0?"+":"")+n;
  if (s.k==="lord") return `${ST_F[s.f]} get ${sgn(s.atk)}/${sgn(s.hp)}.`;
  if (s.k==="grant") return `${ST_F[s.f]} have ${KW_NAMES[s.kw]}.`;
  if (s.k==="cost") return `Your ${s.type==="reaction"?"Reactions":s.type+"s"} cost ${s.n} less.`;
  if (s.k==="bank") return `Your Energy bank holds ${s.n} more.`;
  if (s.k==="sp") return `Your spells and Reactions deal ${s.n} more damage.`;
}

function dsl(o){
  const d = { id: o.id || CUR_EL+"_"+slug(o.name), name:o.name, el:CUR_EL, r:CUR_R, type:o.type, cost:o.cost||0,
    kw: o.kw ? o.kw.split(" ").filter(Boolean) : [], charge: o.ch ?? ((SPECIAL_MODE || !BASE_ELS.includes(CUR_EL)) ? 1 : (o.type==="creature" && !o.mcost && (o.cost||0)>=4) ? 2 : 1) };
  if (SPECIAL_MODE) d.special = SPECIAL_MODE;
  d.fx = o.fx || ""; if (o.tgt) d.tgtS = o.tgt;
  if (LATE2) d.late2 = true;
  if (o.type==="creature"){ d.atk = o.atk; d.hp = o.hp; }
  if (o.fort) d.fort = o.fort;
  if (o.mcost){ d.manifest = true; d.mcost = {[CUR_EL]: o.mcost}; d.cost = 0; }
  if (o.tgt) d.target = tgtSpec(o.tgt, o.type);
  const blocks = parseFx(o.fx);
  const texts = [];
  const kwT = d.kw.map(k=>KW_NAMES[k]+".");
  if (d.fort) kwT.push(`Fortify ${d.fort}.`);
  if (kwT.length) texts.push(kwT.join(" "));
  const by = {};
  for (const b of blocks) (by[b.trig] = by[b.trig] || []).push(b);
  const mkRun = list => x => {
    const ctx = Object.assign({}, x, { el:d.el, name:d.name, ctype:d.type });
    if (x.data && x.data.x!=null) ctx.x = x.data.x;
    if (ctx.chain==null) ctx.chain = Math.max(0, (x.p.played||0)-1);
    for (const b of list) if (condOK(b.cond, ctx, d)) for (const a of b.atoms) ATOM[a[0]](ctx, a.slice(1));
  };
  for (const b of blocks){
    if (b.trig==="static"){
      d.st = (d.st||[]).concat(b.atoms.map(staticOf));
      continue;
    }
    for (const a of b.atoms) if (!ATOM[a[0]]) throw new Error(`${d.name}: unknown atom ${a[0]}`);
    const sent = sentenceOf(b.atoms, d, o.tgt);
    let t;
    if (b.trig==="play"){
      const isPerm = d.type==="creature" || d.type==="aura";
      if (b.cond){
        const [lab, cl] = condLabel(b.cond, d);
        if (lab) t = `${lab}: ${isPerm ? "when played, " : ""}${sent}.`;
        else t = isPerm ? `When played, if ${cl}, ${sent}.` : `If ${cl}, ${sent}.`;
      } else t = isPerm ? `When played, ${sent}.` : cap1(sent)+".";
      if (b.cond && b.cond.startsWith("oc")) d.oc = { cost:+b.cond.slice(2), text:sent };
    } else {
      if (!TRIG_TXT[b.trig]) throw new Error(`${d.name}: unknown trigger ${b.trig}`);
      const cl = b.cond ? condLabel(b.cond, d) : null;
      let tt = TRIG_TXT[b.trig];
      if (d.type!=="creature") tt = tt.replace("another creature you control", "a creature you control").replace("play another creature", "play a creature").replace("play another card", "play a card");
      t = tt + (cl && cl[1] ? `if ${cl[1]}, ` : "") + sent + ".";
      if (b.trig!=="death") t = t.replace(/^(\w)/, m=>m.toUpperCase());
    }
    texts.push(t);
  }
  if (d.st) texts.push(d.st.map(staticText).join(" "));
  if (!d.manifest && !d.token && d.charge!==1) texts.push(d.charge===0 ? "Gives no charge." : `Gives ${d.charge} ${ELS[d.el]} charge.`);
  if (by.play) d.play = mkRun(by.play);
  if (by.death) d.death = mkRun(by.death);
  if (by.attack) d.onAttack = mkRun(by.attack);
  if (by.block) d.onBlock = mkRun(by.block);
  if (by.hurt) d.onHurt = mkRun(by.hurt);
  for (const ev of ["start","end","spend","manifest","die","edie","heal","draw","freeze","ebounce","face","pain","charge","token"]) if (by[ev]){ d.on = d.on || {}; d.on[ev] = mkRun(by[ev]); }
  const playTrigs = ["spell","react","creature","card","aura"].filter(k=>by[k]);
  if (playTrigs.length){
    const runs = playTrigs.map(k=>[k, mkRun(by[k])]);
    d.on = d.on || {};
    d.on.played = x => {
      const c = x.data.card;
      if (c===d) return;
      for (const [k, run] of runs){
        if (k==="spell" && c.type!=="spell") continue;
        if (k==="react" && c.type!=="reaction") continue;
        if (k==="creature" && c.type!=="creature") continue;
        if (k==="aura" && c.type!=="aura") continue;
        run(x);
      }
    };
  }
  if (o.counter){
    d.counter = true;
    const f = o.counter;
    d.counterIf = f==="spell" ? c=>c.type==="spell" : f==="creature" ? c=>c.type==="creature" : f==="any" ? null : null;
    let what = f==="spell" ? "a basic spell" : f==="creature" ? "a basic creature" : "a basic card";
    let extra = "";
    if (o.after){ const a = o.after.split(/\s+/); d.afterCounter = x => ATOM[a[0]](Object.assign({el:d.el, name:d.name, chain:0}, x), a.slice(1)); extra = " "+cap1(atomText(a, d))+"."; }
    texts.push(`Counter ${what} the enemy plays. It gives no charge.${extra}`);
  }
  d.text = o.text || texts.join(" ");
  if (DSL_DRY) return d;
  if (SPECIAL_MODE==="basic" && !d.manifest) SPECIALS.push(d);
  return card(d);
}
// Card makers: creature, spell, aura, reaction, Manifest
function Cr(name, cost, atk, hp, kw, fx, o={}){ return dsl({...o, type:"creature", name, cost, atk, hp, kw, fx}); }
function Sp(name, cost, fx, o={}){ return dsl({...o, type:"spell", name, cost, fx}); }
function Au(name, cost, fx, o={}){ return dsl({...o, type:"aura", name, cost, fx}); }
function Re(name, cost, fx, o={}){ return dsl({...o, type:"reaction", name, cost, fx}); }
function Mf(name, n, type, stats, kw, fx, o={}){ return dsl({...o, type, name, mcost:n, atk:stats?stats[0]:undefined, hp:stats?stats[1]:undefined, kw, fx}); }
