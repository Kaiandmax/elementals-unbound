/* ================= THE FORGE: designed confluence cards (owner: Game Dev; rules from design/confluence-cards.md) =================
   For a confluence with a catalog (cards/catalog_<el>.js), parent cards don't fuse by formula any more. The Forge picks a
   designed card (A3 hybrid):
   1. Signature recipe: the catalog card whose `sig` names exactly these parents.
   2. Otherwise the nearest design: same type as the parents, cost closest to the costliest parent, rarity closest to
      their average, and the most of its trait pair (`tr`, e.g. "burn+freeze") echoed by the parents. Designs within
      FORGE_SPREAD points of the best are split by a hash of the parents, so the same parents always make the same card.
   Confluences without a catalog keep fuseParts(). Traits of a parent are read from its keywords, text and name. */
const FORGE_EL_TRAITS = { fire:["burn","fury"], water:["freeze","draw","tide"], lightning:["charge","chain","haste"], earth:["wall","size","shell"], wind:["haste","tide","ward"] };
function forgeTraits(d){
  const t = (d.text||"").toLowerCase(), n = d.name.toLowerCase(), kw = d.kw||[], T = new Set();
  if (/damage|ignite|\bzap/.test(t)) T.add("burn");
  if (/\bdraw/.test(t)) T.add("draw");
  if (/freez|frozen/.test(t)) T.add("freeze");
  for (const k of ["ward","wall","haste","pierce","barrier"]) if (kw.includes(k) || new RegExp("\\b"+k+"\\b").test(t)) T.add(k);
  if (kw.includes("wall") || kw.includes("barrier")) T.add("shell");
  if (/\+0\/\+\d|fortify|barrier|health/.test(t)) T.add("shield");
  if (/return/.test(t)) T.add("tide");
  if (/charge/.test(t) && !/no charge/.test(t)) T.add("charge");
  if (/chain \d/.test(t)) T.add("chain");
  if (/manifest/.test(t)) T.add("manifest");
  if (/\+\d+\/\+0|double the attack|attack/.test(t)) T.add("fury");
  if (d.type==="creature" && (d.atk+d.hp) >= d.cost*2+4) T.add("size");
  if (/life/.test(t)) { T.add("heal"); T.add("warmth"); }
  if (/restore/.test(t)) { T.add("mend"); T.add("heal"); }
  if (/energy/.test(t)) T.add("fuel");
  if (/scholar|sage|mage|oracle|archive|tome|insight|wisdom|study|thought|library|seer|mystic|scroll/.test(n)) T.add("study");
  if (d.type==="reaction") { T.add("tricks"); T.add("ambush"); }
  if (kw.includes("haste")) T.add("ambush");
  if (kw.includes("pierce")) T.add("lance");
  if (/smoke|ash|cinder|soot/.test(n)) T.add("smoke");
  return T;
}
const FORGE_SPREAD = 2;
const forgeCatalog = el => Object.values(LIB).filter(c => c.catalog===el);
// The slot a design should fill for these parents: their type, the cost of the costliest parent, the average rarity
// rounded down (as fusion did).
function forgeTarget(ids){
  const ps = ids.map(i=>LIB[i]);
  return { type: ps[0].type, cost: Math.max(...ps.map(c=>c.cost)), r: N_RAR[Math.floor(ps.reduce((a,c)=>a+RAR_N[c.r],0)/ps.length)] };
}
// The traits of a design that its parents echo, for the Forge's explanation.
function forgeEcho(ids, out){ const T = new Set(ids.flatMap(i=>[...forgeTraits(LIB[i])])); return (out.tr||"").split("+").filter(x=>T.has(x)).join(" and "); }
function forgePick(ids){
  const ps = ids.map(i=>LIB[i]);
  if (ps.some(p => !p || p.manifest || p.token)) return null;
  const el = confluenceOf(ps.map(c=>c.el));
  if (!el || !CATALOG_ELS.has(el)) return null;
  const cat = forgeCatalog(el), names = new Set(ps.map(p=>p.name));
  const sig = cat.find(c => c.sig && c.sig.length===ps.length && c.sig.every(n=>names.has(n)));
  if (sig) return { card:sig, how:"recipe" };
  if (ps.some(p => p.type!==ps[0].type)) return null;   // as with fusion, parents share a type
  const tg = forgeTarget(ids), RK = { s:0, c:0, u:1, r:2 };
  const strong = new Set(ps.flatMap(p=>[...forgeTraits(p)])), weak = new Set(ps.flatMap(p=>FORGE_EL_TRAITS[p.el]||[]));
  const scored = cat.map(c => { const tr = (c.tr||"").split("+");
    return { c, s: (c.type!==tg.type ? 100 : 0) + 6*Math.abs(RK[c.r]-RK[tg.r]) + 2*Math.abs(c.cost-tg.cost)
      - 3*tr.filter(x=>strong.has(x)).length - tr.filter(x=>!strong.has(x) && weak.has(x)).length }; });
  if (!scored.length) return null;
  // Near-ties (within FORGE_SPREAD points of the best) are split by a hash of the parents, so many different pairs
  // don't all land on the one design that sits closest to the average; the same parents still always make the same card.
  const bestS = Math.min(...scored.map(x=>x.s)), near = scored.filter(x=>x.s <= bestS + FORGE_SPREAD).map(x=>x.c).sort((a,b)=>a.id<b.id?-1:1);
  const h = [...ids].sort().join("|").split("").reduce((a,ch)=>(a*31 + ch.charCodeAt(0))>>>0, 7);
  return { card: near[h % near.length], how:"nearest" };
}
