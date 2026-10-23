/* ================= FUSION =================
   A dual confluence card fuses one card from each of its two parent elements, of the same type.
   A triple confluence card fuses three cards, one from each of its three elements: in the Forge that is a fused
   dual card plus a card of the missing element (any order gives the same card, since only the three base cards matter).
   cost = higher cost (creatures); spells, auras and Reactions add half the other cost(s), rounded down (max 6);
   stats = the biggest plus half of the rest (per stat, rounded up); keywords and effects from all parts;
   gives 1 confluence charge; rarity = average of the parts, rounded down.
   Named recipes override the formula for specific card sets (and may cross card types). */
const FUSE = Object.assign({ k:0.5, costAdd:0, costAddNC:0.5, maxCost:6 }, globalThis.FUSE_OVR||{});
const FUSE3 = Object.assign({ k:0.5, costAdd:0, costAddCr:0.2, costAddNC:0.5, maxCost:6 }, globalThis.FUSE3_OVR||{});
const RAR_N = { s:1, c:1, u:2, r:3 }, N_RAR = { 1:"c", 2:"u", 3:"r" };
const RECIPES = {};
// The confluence made by this set of distinct base elements (2 or 3), or null.
function confluenceOf(...els){
  els = els.flat();
  if (new Set(els).size!==els.length) return null;
  for (const [c, ps] of Object.entries(CONFLUENCE)) if (ps.length===els.length && els.every(e=>ps.includes(e))) return c;
  return null;
}
const fuseKey = (...ids) => ids.flat().sort().join("|");
// The base cards a card is made of: itself for a base card, its parents for a formula fusion; recipe cards can't be fused further.
function partsOf(id){
  const d = LIB[id];
  if (!d || d.manifest || d.token || d.recipe) return null;
  if (d.fused) return d.fused;
  return BASE_ELS.includes(d.el) ? [id] : null;
}
function canFuse(a, b){
  const A = LIB[a], B = LIB[b];
  if (!A || !B || A.manifest || B.manifest || A.token || B.token) return false;
  if (RECIPES[fuseKey(a,b)]) return true;
  const pa = partsOf(a), pb = partsOf(b);
  if (!pa || !pb) return false;
  const parts = [...pa, ...pb];
  if (parts.length>3 || !confluenceOf(parts.map(i=>LIB[i].el))) return false;
  if (RECIPES[fuseKey(parts)]) return true;
  return parts.every(i=>LIB[i].type===A.type) && A.type===B.type;
}
const firstWord = n => n.replace(/[,']s?\b/g, m => m==="'s" ? "'s" : "").split(/\s+/).filter(Boolean)[0].replace(/'s$/,"");
const lastWord = n => { const w = n.replace(/[,']s?\b/g, m => m==="'s" ? "'s" : "").split(/\s+/).filter(Boolean); return w[w.length-1].replace(/'s$/,""); };
function fuseName(A, B){
  const [first] = CONFLUENCE[confluenceOf(A.el,B.el)];
  const [P, Q] = A.el===first ? [A, B] : [B, A];
  const words = n => n.replace(/[,']s?\b/g, m => m==="'s" ? "'s" : "").split(/\s+/).filter(Boolean);
  const pw = words(P.name), qw = words(Q.name);
  const clean = n => n.replace(/'s$/,"");
  if (!LIB_NAMES) LIB_NAMES = new Set(Object.values(LIB).map(c => c.name));
  const taken = n => FUSED_NAMES.has(n) || LIB_NAMES.has(n);
  // First element descriptor + second element noun; if that name is taken, swap roles, then fall back to "<confluence word> <noun>".
  const tries = (pw.length===1 && qw.length===1) ? [P.name+" "+Q.name]
    : (w => [pw[0]+" "+qw[qw.length-1], qw[0]+" "+pw[pw.length-1], w+" "+qw[qw.length-1], w+" "+pw[pw.length-1], P.name+" "+qw[qw.length-1]])(CONF_WORD[confluenceOf(A.el,B.el)]);
  const name = tries.map(clean).find(n => !taken(n)) || clean(tries[0])+" II";
  FUSED_NAMES.add(name);
  return name;
}
// Three parts: the first element's descriptor with the last element's noun, then other pairings, then "<confluence word> <noun>".
function fuseName3(Cs, conf){
  const order = CONFLUENCE[conf];
  const [P, Q, R] = [...Cs].sort((x,y)=>order.indexOf(x.el)-order.indexOf(y.el));
  if (!LIB_NAMES) LIB_NAMES = new Set(Object.values(LIB).map(c => c.name));
  const taken = n => FUSED_NAMES.has(n) || LIB_NAMES.has(n);
  const f = c => firstWord(c.name), l = c => lastWord(c.name), W = CONF_WORD[conf];
  const tries = [f(P)+" "+l(R), f(P)+" "+l(Q), f(Q)+" "+l(R), f(R)+" "+l(P), f(Q)+" "+l(P), f(R)+" "+l(Q),
    W+" "+l(R), W+" "+l(Q), W+" "+l(P), f(P)+" "+f(Q)+" "+l(R), f(P)+" "+f(R)+" "+l(Q)].filter(n => { const [x, y] = n.split(" "); return x.slice(0,5).toLowerCase()!==y.slice(0,5).toLowerCase(); });
  let name = tries.find(n => !taken(n));
  for (let i=2; !name; i++) if (!taken(tries[0]+" "+["","","II","III","IV","V","VI","VII","VIII","IX","X"][i])) name = tries[0]+" "+["","","II","III","IV","V","VI","VII","VIII","IX","X"][i];
  FUSED_NAMES.add(name);
  return name;
}
const FUSED_NAMES = new Set(); let LIB_NAMES = null;
const TYPE_MEET = {
  "enemyAny|enemyCreature":"enemyCreature", "enemyAny|enemyAttacker":"enemyAttacker", "enemyAttacker|enemyCreature":"enemyAttacker",
  "ownAttacker|ownCreature":"ownAttacker"
};
function meetType(a, b){ return a===b ? a : TYPE_MEET[[a,b].sort().join("|")] || null; }
function autoTarget(p, spec){
  const ts = targetsFor(spec, p, true);   // the part that aims itself only aims at its intended side
  if (!ts.length) return null;
  const cr = ts.filter(t=>t.kind==="creature" && !isDead(t.c)).sort((x,y)=>atkOf(y.c)-atkOf(x.c));
  return cr[0] || ts[0];
}
function stripText(t, el){
  return (t||"")
    .replace(/^(((Airborne|Haste|Pierce|Wall|Ward|Drain|Skyguard|Vigilant|Barrier|Venom)\.|Fortify \d+\.|Wall: can't attack\.)\s*)+/, "")
    .replace(/\s*Gives (\d+|no) \w+ charge( instead of 1)?\./g, "")
    .replace(/\b(Fire|Water|Earth|Wind|Lightning) charge\b/g, () => ELS[el]+" charge")
    .trim();
}
function fuse(a, b){
  const key = fuseKey(a, b);
  if (RECIPES[key]) return LIB[RECIPES[key]];
  if (!canFuse(a, b)) throw new Error(`Can't fuse ${a} with ${b}`);
  return fuseParts([...partsOf(a), ...partsOf(b)]);
}
// Fuse a set of base cards (2 or 3, one per element of a confluence).
function fuseParts(ids){
  ids = [...ids].sort();
  const key = fuseKey(ids);
  if (RECIPES[key]) return LIB[RECIPES[key]];
  const tri = ids.length===3;
  const id = (tri ? "tri_fx_" : "volcano_fx_") + ids.join("__");
  if (LIB[id]) return LIB[id];
  const Cs0 = ids.map(i=>LIB[i]);
  const el = confluenceOf(Cs0.map(c=>c.el));
  if (!el || Cs0.some(c=>c.type!==Cs0[0].type || c.manifest || c.token)) throw new Error(`Can't fuse ${ids.join(" + ")}`);
  const size = d => d.cost*100 + (d.atk||0) + (d.hp||0);
  const Cs = [...Cs0].sort((A,B)=> size(B)-size(A) || (A.id<B.id?-1:1));   // biggest first (only used for ordering)
  const F = tri ? FUSE3 : FUSE, type = Cs[0].type;
  const costs = Cs.map(c=>c.cost), maxC = Math.max(...costs), restC = costs.reduce((a,b)=>a+b,0) - maxC;
  // Creatures cost the highest of the parts; spells, auras and Reactions add half the rest (rounded down).
  const cost = Math.min(F.maxCost, maxC + (type==="creature" ? F.costAdd + Math.floor(restC*(F.costAddCr||0)) : Math.floor(restC*F.costAddNC)));
  const d = { id, name: tri ? fuseName3(Cs, el) : fuseName(Cs[0], Cs[1]), el, r:N_RAR[Math.floor(Cs.reduce((a,c)=>a+RAR_N[c.r],0)/Cs.length)], type, cost,
    kw:[...new Set(Cs.flatMap(c=>c.kw))], charge:1, fused:Cs.map(c=>c.id) };
  if (type==="creature"){
    const comb = vs => { const m = Math.max(...vs); return m + Math.ceil((vs.reduce((a,b)=>a+b,0) - m)*F.k); };
    d.atk = comb(Cs.map(c=>c.atk)); d.hp = comb(Cs.map(c=>c.hp));
    if (d.kw.includes("haste")) d.atk = Math.min(d.atk, cost + (d.r==="r" ? 1 : 0) + (tri ? 1 : 0));
    const f = Math.max(...Cs.map(c=>c.fort||0)); if (f) d.fort = f;
  }
  // Targets: parts share one target when they aim at the same kind of friendly thing; enemy-aimed extra parts aim themselves.
  const mode = Cs.map(()=>null);   // null = no target, "main" = uses the chosen target, "auto" = picks its own
  let main = null;
  Cs.forEach((c, i) => {
    const t = c.target; if (!t) return;
    if (!main){ main = { ...t }; mode[i] = "main"; return; }
    const m = meetType(main.type, t.type);
    if (m && m.startsWith("own") && main.type.startsWith("own")){
      const fa = main.filter, fb = t.filter;
      main = { type:m, optional: type==="creature" || (!!main.optional && !!t.optional), ocOnly: main.ocOnly && t.ocOnly };
      if (fa || fb) main.filter = x => (!fa || fa(x)) && (!fb || fb(x));
      mode[i] = "main";
    } else mode[i] = "auto";
  });
  if (main){ d.target = main; if (!main.ocOnly) delete main.ocOnly; }
  // Each part only resolves when it has a legal target (a part without a target always resolves).
  const live = (spec, t) => !spec || (t && (t.kind==="player" || onBoard(t.c)));
  if (Cs.some(c=>c.play)) d.play = x => {
    Cs.forEach((c, i) => {
      if (!c.play) return;
      const xb = mode[i]==="auto" ? {...x, t:autoTarget(x.p, c.target)} : x;
      if (live(c.target, xb.t)) c.play(xb);
    });
  };
  const all = fs => { fs = fs.filter(Boolean); return fs.length ? (x => { for (const f of fs) f(x); }) : undefined; };
  d.death = all(Cs.map(c=>c.death));
  d.onAttack = all(Cs.map(c=>c.onAttack));
  d.onBlock = all(Cs.map(c=>c.onBlock));
  d.onHurt = all(Cs.map(c=>c.onHurt));
  const evs = new Set(Cs.flatMap(c=>Object.keys(c.on||{})));
  if (evs.size){
    d.on = {};
    for (const ev of evs){
      const f = all(Cs.map(c=>c.on && c.on[ev]));
      d.on[ev] = ev==="played" ? (x => { if (x.data.card!==d) f(x); }) : f;
    }
  }
  if (Cs.some(c=>c.st)) d.st = Cs.flatMap(c=>c.st||[]);
  if (Cs.some(c=>c.oc)) d.oc = { cost:Math.max(...Cs.map(c=>c.oc?c.oc.cost:0)), text:Cs.filter(c=>c.oc).map(c=>c.oc.text).join(" and ") };
  if (Cs.some(c=>c.counter)){
    d.counter = true;
    const fs = Cs.filter(c=>c.counter).map(c=>c.counterIf);
    d.counterIf = fs.some(f=>!f) ? null : (k => fs.some(f=>f(k)));
    d.afterCounter = all(Cs.map(c=>c.afterCounter));
  }
  d.burn = Cs.reduce((a,c)=>a+(c.burn||0),0);
  const kwT = d.kw.map(k=>KW_NAMES[k]+".").concat(d.fort ? [`Fortify ${d.fort}.`] : []).join(" ");
  const texts = Cs.map((c, i) => {
    let t = stripText(c.text, el);
    if (mode[i]==="main" && mode.indexOf("main")!==i) t = t.replace(/\b(an attacking (basic )?creature|a creature or the enemy|an? (basic )?creature)\b/, "the same target");
    if (mode[i]==="auto" && t) t += HOSTILE[c.target.type] ? " (This part hits the strongest enemy left.)" : " (This part picks your strongest creature.)";
    return t;
  });
  d.text = [kwT, ...texts].filter(Boolean).join(" ");
  if (BAL_READY) normalizeCard(d, 1);   // fusions made after load get the same balance pass
  LIB[id] = d;
  return d;
}
function cardIdByName(name, els){
  if (LIB[name]) return name;
  for (const el of els){ const id = el+"_"+slug(name); if (LIB[id]) return id; }
  const c = Object.values(LIB).find(x=>x.name===name && els.includes(x.el) && !x.manifest);
  if (!c) throw new Error("No card named "+name);
  return c.id;
}
// A named recipe: these two (or three) cards make this hand-designed card.
function recipe(conf, nameA, nameB, rar, make){ recipeN(conf, [nameA, nameB], rar, make); }
function recipeN(conf, names, rar, make){
  const els = CONFLUENCE[conf];
  const ids = names.map(n => cardIdByName(n, els));
  if (RECIPES[fuseKey(ids)]) throw new Error(`Recipe clash in ${conf}: ${names.join(" + ")}`);
  setEl(conf); setR(rar);
  const d = make();
  d.recipe = ids;
  RECIPES[fuseKey(ids)] = d.id;
  return d;
}

/* ---- Volcano recipes (each beats what the plain formula would make; all give 1 Volcano charge) ---- */
recipe("volcano", "Lava Hound", "Hill Giant", "c", ()=>Cr("Magma Titan",4,7,7,"pierce","attack: dmg face 1",{ch:1}));
recipe("volcano", "Searing Spark", "Rockslide", "c", ()=>Sp("Molten Boulder",2,"play: dmg t 5",{tgt:"ea"}));
recipe("volcano", "Ember Imp", "Pebble Golem", "c", ()=>Cr("Cinder Golem",1,3,3,"","death: charge 1; dmg face 1",{fort:1}));
recipe("volcano", "Cinder Hound", "Earthen Blessing", "c", ()=>Cr("Lavaforged Hound",2,4,4,"","ignite: kw self haste"));
recipe("volcano", "Fireball", "Stonecaller", "u", ()=>Cr("Flamecaller of the Deep",4,4,5,"","play: dmg t 4",{tgt:"ea",ch:1}));
recipe("volcano", "Kindling Hearth", "Mountain's Patience", "u", ()=>Au("Smoldering Mountain",2,"start: charge 1 | spend: dmg face 1"));
recipe("volcano", "Magma Golem", "Granite Behemoth", "r", ()=>Cr("Volcanic Colossus",5,9,9,"pierce","play: dmg all_e 2",{ch:1}));
recipe("volcano", "Ashborn Phoenix", "Crystal Dragon", "r", ()=>Cr("Obsidian Phoenix",5,6,8,"airborne haste","death: summon drake 2",{fort:1,ch:1}));
