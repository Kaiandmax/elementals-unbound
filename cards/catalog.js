/* ================= SPECIAL RECIPES AND CONFLUENCE CATALOGS =================
   Every special basic card is made by one recipe: one base card of each of its confluence's elements.
   Recipes are picked by type, cost and rarity, never reusing a combination a deck already uses.
   Each dual and triple confluence then gets a catalog of exactly 100 basic cards:
   its specials, its older named recipes, the fusions its decks use, then a fixed spread of other fusions. */
const CATALOG = {};
(function(){
  const rOrd = { s:0, c:0, u:1, r:2 };
  const hashS = s => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
  const usedKeys = new Set(Object.keys(RECIPES));
  for (const list of Object.values(DECKS)) for (const dk of list) for (const id of dk.main){ const d = LIB[id]; if (d && d.fused) usedKeys.add(fuseKey(d.fused)); }
  const pools = {};
  for (const el of BASE_ELS) pools[el] = Object.values(LIB).filter(d=>d.el===el && !d.manifest && !d.token);
  const uses = {};
  for (const d of SPECIALS){
    if (d.recipe) continue;
    const conf = d.el, els = CONFLUENCE[conf];
    const u = uses[conf] = uses[conf] || {};
    const score = c => Math.abs(c.cost - d.cost)*2 + Math.abs(rOrd[c.r] - rOrd[d.r])*1.5 + (u[c.id]||0)*3 + (hashS(c.id+d.id)%100)/1000;
    let pick = null;
    for (let tries = 0; tries < 40 && !pick; tries++){
      const ids = els.map((el, i) => {
        let cands = pools[el].filter(c=>c.type===d.type);
        if (!cands.length) cands = pools[el];
        cands = [...cands].sort((a,b)=>score(a)-score(b));
        return cands[Math.min(cands.length-1, i===els.length-1 ? tries : Math.floor(tries/3))].id;
      });
      if (!usedKeys.has(fuseKey(ids))) pick = ids;
    }
    if (!pick) throw new Error("No free recipe for "+d.name);
    usedKeys.add(fuseKey(pick));
    for (const id of pick) u[id] = (u[id]||0) + 1;
    d.recipe = pick;
    RECIPES[fuseKey(pick)] = d.id;
  }
  // Catalogs: 100 basic cards per confluence.
  const TYPE_W = [["creature",0.5],["spell",0.25],["reaction",0.13],["aura",0.12]];
  for (const conf of Object.keys(CONFLUENCE)){
    const els = CONFLUENCE[conf];
    const have = new Set(Object.values(LIB).filter(d=>d.el===conf && !d.manifest && !d.token).map(d=>d.id));
    let seed = hashS(conf);
    const R = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    let guard = 0;
    while (have.size < 100 && guard++ < 5000){
      let x = R(), type = "creature";
      for (const [t, w] of TYPE_W){ if (x < w){ type = t; break; } x -= w; }
      const want = R() < 0.4 ? 0 : R() < 0.5 ? 1 : 2;   // aim for a spread of rarities
      const ids = els.map(el => {
        const cs = pools[el].filter(c=>c.type===type && (Math.abs(rOrd[c.r]-want)===0 || R()<0.15));
        return cs.length ? cs[Math.floor(R()*cs.length)].id : null;
      });
      if (ids.includes(null) || RECIPES[fuseKey(ids)]) continue;
      const d = fuseParts(ids);
      have.add(d.id);
    }
    CATALOG[conf] = [...have];
  }
})();

/* ---- Internal balance: every card is kept within about 15% of its element and rarity's curve ----
   cardValue (value.js) prices a card; its ratio to the cost curve is compared with the median of its group
   (element + rarity + basic or Manifest). Cards outside the band are normalized: creatures have their stats
   scaled (or cost changed when most of their value is in effects); other cards move their cost by 1 at a time.
   Confluence basic cards are measured against their fusions' median, so special cards land at fusion strength;
   SPF nudges a confluence's special cards up to 8% above or below that (from archetype deck tuning), so they stay within the group's band. */
const BAL = Object.assign({ band:0.12 }, globalThis.BAL_OVR||{});
const SPF = Object.assign({"ash": 0.92, "aurora": 0.92, "forge": 1.08, "geyser": 1.08, "glacier": 1.08, "glass": 1.08, "hurricane": 0.92, "ice": 1.012, "metal": 0.97, "mirage": 0.92, "plasma": 0.92, "quicksilver": 1.08, "sand": 1.08, "solar": 0.92, "steam": 0.92, "storm": 0.92, "swamp": 1.055, "tempest": 0.92, "volcano": 0.92, "wildfire": 1.044}, globalThis.SPF_OVR||{});
const TIERF = Object.assign({"base:c": 0.979, "base:r": 1.011, "base:u": 1.186, "dual:c": 1.009, "dual:r": 0.978, "dual:u": 1.034, "tri:c": 1.057, "tri:r": 1.177, "tri:u": 1.012}, globalThis.TIERF_OVR||{});
// Manifests are priced off their own element and rarity's basic cards: MK times the basic cards' value per cost
// (on the steeper Manifest curve), so a Manifest always feels like a payoff for its group, and charge buys the same
// power everywhere. EF ("el:r") sets a whole element and rarity stronger or weaker, basic cards and Manifests together,
// for deck tuning; SPMF nudges each confluence's special Manifests within 8%.
const MK = 1.0;
const EF = Object.assign({"ash:c": 1.151, "ash:r": 1.24, "ash:u": 1.023, "aurora:c": 1.082, "aurora:r": 1.09, "aurora:u": 1.031, "earth:c": 1.008, "earth:r": 1.264, "earth:s": 1.015, "earth:u": 1.399, "fire:c": 1.024, "fire:r": 0.884, "fire:u": 0.937, "forge:c": 1.236, "forge:r": 1.198, "forge:u": 1.201, "geyser:c": 1.043, "geyser:r": 1.055, "geyser:u": 1.219, "glacier:c": 1.025, "glacier:r": 1.07, "glacier:u": 1.209, "glass:c": 1.178, "glass:r": 0.983, "glass:u": 1.044, "hurricane:c": 1.019, "hurricane:r": 0.84, "hurricane:u": 0.945, "ice:c": 0.865, "ice:r": 0.953, "ice:u": 1.008, "lightning:c": 1.006, "lightning:r": 0.849, "lightning:u": 0.855, "metal:c": 1.176, "metal:r": 1.04, "metal:u": 1.113, "mirage:c": 1.135, "mirage:r": 0.913, "mirage:u": 0.839, "plasma:c": 0.958, "plasma:r": 1.028, "plasma:u": 0.988, "quicksilver:c": 1.192, "quicksilver:r": 1.138, "quicksilver:u": 1.232, "sand:c": 1.152, "sand:r": 0.983, "sand:u": 0.907, "solar:c": 1.087, "solar:r": 0.978, "solar:u": 0.823, "steam:c": 0.968, "steam:r": 0.948, "steam:u": 0.981, "storm:c": 0.969, "storm:r": 1.024, "storm:u": 0.875, "swamp:c": 1.211, "swamp:r": 0.989, "swamp:u": 0.916, "tempest:c": 0.806, "tempest:r": 0.866, "tempest:u": 0.868, "volcano:c": 1.029, "volcano:r": 0.993, "volcano:u": 1.105, "water:c": 0.946, "water:r": 0.899, "water:s": 1.025, "water:u": 0.796, "wildfire:c": 0.851, "wildfire:r": 0.86, "wildfire:u": 0.74, "wind:c": 0.9, "wind:r": 0.889, "wind:u": 0.872}, globalThis.EF_OVR||{});
const SPMF = Object.assign({"ash": 0.92, "aurora": 0.92, "forge": 1.08, "geyser": 1.08, "glacier": 1.08, "glass": 1.08, "hurricane": 0.92, "ice": 1.012, "metal": 0.97, "mirage": 0.92, "plasma": 0.92, "quicksilver": 1.08, "sand": 1.08, "solar": 0.92, "steam": 0.92, "storm": 0.92, "swamp": 1.055, "tempest": 0.92, "volcano": 0.92, "wildfire": 1.044}, globalThis.SPMF_OVR||{});
const balGroup = d => d.el+"|"+(d.r==="s"?"s":d.r)+"|"+(d.manifest?"M":"B");
function normalizeCard(d, f){
  const med = BAL_MED[balGroup(d)]; if (!med) return;
  const target = med*(f||1), lo = target*(1-BAL.band), hi = target*(1+BAL.band);
  const cost = () => d.manifest ? d.mcost[d.el] : d.cost;
  const setCost = n => { if (d.manifest) d.mcost[d.el] = n; else d.cost = n; };
  const minC = d.manifest ? 2 : (d.cost===0 ? 0 : 1), maxC = d.manifest ? 6 : 6;   // Manifests cost 2 to 6 charge
  if (d.manifest){ const c = cost(); if (c < minC) setCost(minC); else if (c > maxC) setCost(maxC); if (d.mc0==null) d.mc0 = cost(); }
  for (let step=0; step<4; step++){
    const r = cardRatio(d);
    if (r>=lo && r<=hi) return;
    if (d.type==="creature"){
      const sv = statValue(d), e = cardValue(d) - sv, Vt = target*costCurve(d);
      if (sv>0.5 && Vt-e > 0.6*sv*0.4){
        const sc = Math.max(0.4, Math.min(2.5, (Vt - e)/sv));
        const a0 = d.atk, h0 = d.hp;
        d.atk = a0===0 ? 0 : Math.max(1, Math.round(a0*sc)); d.hp = Math.max(1, Math.round(h0*sc));
        if (d.atk===a0 && d.hp===h0) return;
        continue;
      }
    }
    // Pick the cost that lands closest to the target (cheap cards move in big steps, so never overshoot further than they started).
    // Manifests stay within 1 charge of their written cost (clamped to 2-6) and have their numbers scaled for the rest:
    // a Manifest that flips between a cheap and an expensive version swings games far more than its value suggests.
    {
      const c0 = cost(), lo2 = d.manifest ? Math.max(minC, d.mc0-1) : minC, hi2 = d.manifest ? Math.min(maxC, d.mc0+1) : maxC;
      let best = c0, bd = Math.abs(Math.log(r/target));
      for (let n=lo2; n<=hi2; n++){ setCost(n); const dd = Math.abs(Math.log(cardRatio(d)/target)); if (dd < bd - 1e-9){ bd = dd; best = n; } }
      setCost(best);
    }
    // Still outside the band (cheap cards step coarsely): scale the card's numbers instead.
    if (d.fx && !d.fused && !d.counter && Math.abs(Math.log(cardRatio(d)/target)) > Math.log(1+BAL.band)){
      const fx0 = d.fx; let bf = fx0, bdd = Math.abs(Math.log(cardRatio(d)/target));
      for (const sc of [0.5, 0.67, 0.75, 1.34, 1.5, 2, 2.5]){ const f2 = scaleFx(fx0, sc); if (f2===fx0) continue; const t0 = d.fx; d.fx = f2;
        const dd = Math.abs(Math.log(cardRatio(d)/target)); d.fx = t0; if (dd < bdd - 1e-9){ bdd = dd; bf = f2; } }
      if (bf!==fx0) respecCard(d, bf);
    }
    // Still outside the band (cheap cards step coarsely, Manifests hit the 2-6 charge limits): search cost +-1 together
    // with scaled effect numbers, scaled creature stats and a small rider (draw a card, or gain Charge).
    if (Math.abs(Math.log(cardRatio(d)/target)) > Math.log(1+BAL.band)){
      const canFx = d.fx && !d.fused && !d.counter, cr = d.type==="creature";
      const fx0 = d.fx, c0 = cost(), a0 = d.atk, h0 = d.hp;
      let best = { fx:fx0, c:c0, a:a0, h:h0 }, bdd = Math.abs(Math.log(cardRatio(d)/target));
      const hasD = /\bdraw \d/.test(fx0||""), hasC = /\bcharge \d/.test(fx0||"");   // never stack a rider on the same effect
      const riders = !canFx ? [""] : ["", ...(d.manifest ? [" | play: draw 1", " | play: draw 2", " | play: energy 2", " | play: draw 1; energy 1"] : [" | play: draw 1", " | play: charge 1", " | play: charge 2", " | play: draw 1; charge 1"])
        .filter(r => !(hasD && r.includes("draw")) && !(hasC && r.includes("charge")) && !(/\benergy \d/.test(fx0||"") && r.includes("energy")))];
      const fxS = canFx ? [1, 0.5, 0.67, 0.75, 1.34, 1.5, 2] : [1];
      const stS = cr ? [1, 0.5, 0.6, 0.7, 0.8, 0.9, 1.15, 1.3, 1.5] : [1];
      for (let n = Math.max(minC, d.manifest ? d.mc0-1 : c0-1); n <= Math.min(maxC, d.manifest ? d.mc0+1 : c0+1); n++) for (const sc of fxS) for (const ss of stS) for (const rd of riders){
        const f2 = canFx ? (sc===1 ? fx0 : scaleFx(fx0, sc)) + rd : fx0;
        setCost(n); if (canFx) d.fx = f2;
        if (cr && ss!==1){ d.atk = a0===0 ? 0 : Math.max(1, Math.round(a0*ss)); d.hp = Math.max(1, Math.round(h0*ss)); }
        const dd = Math.abs(Math.log(cardRatio(d)/target)) + (rd ? 0.02 : 0) + (n!==c0 ? (d.manifest ? 0.03 : 0.01) : 0) + (ss!==1 ? 0.005 : 0);
        if (dd < bdd - 1e-9){ bdd = dd; best = { fx:f2, c:n, a:d.atk, h:d.hp }; }
        d.fx = fx0; d.atk = a0; d.hp = h0;
      }
      setCost(best.c); d.atk = best.a; d.hp = best.h;
      if (canFx && best.fx!==fx0){ d.fx = fx0; respecCard(d, best.fx); }
    }
    return;
  }
}
(function(){
  const all = Object.values(LIB).filter(d=>!d.token && !(d.r==="s" && d.manifest));   // Starter Manifests are hand-tuned and keep their written costs
  const med = a => { const s = [...a].sort((x,y)=>x-y); return s[Math.floor(s.length/2)]; };
  // Manifests cost 2 to 6 charge: clamp the written costs first so group medians are measured on playable costs.
  for (const d of all) if (d.manifest){ const k = Object.keys(d.mcost)[0]; d.mcost[k] = Math.max(2, Math.min(6, d.mcost[k])); }
  const ratios = {};
  for (const d of all){
    const conf = !BASE_ELS.includes(d.el);
    if (conf && !d.manifest && !d.fused) continue;          // confluence basics: the median comes from the fusions
    (ratios[balGroup(d)] = ratios[balGroup(d)] || []).push(cardRatio(d));
  }
  for (const [k, a] of Object.entries(ratios)) BAL_MED[k] = med(a);
  // Ladder tuning: a whole rarity tier of an element group can be set stronger or weaker (base/dual/triple : c/u/r).
  for (const k of Object.keys(BAL_MED)){ const [el, r] = k.split("|"); const grp = BASE_ELS.includes(el) ? "base" : CONFLUENCE[el].length===2 ? "dual" : "tri";
    const f = TIERF[grp+":"+r]; if (f) BAL_MED[k] *= f; }
  for (const k of Object.keys(BAL_MED)) if (k.endsWith("|M") && BAL_MED[k.slice(0,-1)+"B"]) BAL_MED[k] = BAL_MED[k.slice(0,-1)+"B"] * MK;
  for (const d of all){ const ef = EF[d.el+":"+d.r]||1;
    normalizeCard(d, ef*(d.manifest ? (d.special ? (SPMF[d.el]||1) : 1) : d.special ? (SPF[d.el]||1) : 1)); }
  BAL_READY = true;
})();

/* ---- Tuning: charge-cost shifts for the newer Manifests (regular and special), from simulation ---- */
const MADJ2 = Object.assign({}, globalThis.MADJ2_OVR||{});
for (const [key, v] of Object.entries(MADJ2)){
  const [conf, kind, r] = key.split(":");     // e.g. "geyser:reg:c" or "volcano:sp:r"
  const ms = Object.values(LIB).filter(c => c.manifest && c.el===conf && c.r===r && (kind==="sp" ? c.special : !c.special));
  const base = Math.floor(v), extra = Math.round((v-base)*ms.length);
  ms.forEach((c, i) => { c.mcost[conf] = Math.max(1, c.mcost[conf] + base + (i < extra ? 1 : 0)); });
}

/* ---- Archetype decks: built at rare strength ----
   Each confluence's archetype deck keeps its highest-rarity special cards (ARCH_K of them: at least four, six by default, set by deck
   tuning) and fills the other slots from the confluence's rare deck; its Manifests are its two rare special Manifests
   plus two from the rare deck. */
const ARCH_K = Object.assign({"ash": 4, "aurora": 10, "forge": 8, "geyser": 4, "glacier": 6, "glass": 4, "hurricane": 6, "ice": 8, "metal": 4, "mirage": 4, "plasma": 10, "quicksilver": 6, "sand": 6, "solar": 4, "steam": 4, "storm": 6, "swamp": 6, "tempest": 4, "volcano": 6, "wildfire": 4}, globalThis.ARCHK_OVR||{});
(function(){
  const rk = { r:3, u:2, c:1, s:0 };
  for (const list of Object.values(DECKS)) for (const dk of list){
    if (dk.tier!=="special") continue;
    const rare = list.find(x=>x.tier==="rare" && x.el===dk.el) || Object.values(DECKS).flat().find(x=>x.tier==="rare" && x.el===dk.el);
    if (!rare) continue;
    const sp = dk.main.map((id,i)=>[id,i]).sort((a,b)=>(rk[LIB[b[0]].r]-rk[LIB[a[0]].r]) || a[1]-b[1]).slice(0,ARCH_K[dk.el]||6).map(x=>x[0]);
    const fill = rare.main.filter(id=>!sp.includes(id)).sort((a,b)=>LIB[a].cost-LIB[b].cost).slice(0,10-sp.length);
    dk.main = [...sp, ...fill];
    const ms = dk.manifests.filter(id=>LIB[id].r==="r").slice(0,2);
    dk.manifests = [...ms, ...rare.manifests.filter(id=>!ms.includes(id))].slice(0,4);
  }
})();

/* Every deck carries 4 Manifests (designer, 2026-10-24); the old 'triple decks carry 3' trim is gone. */

/* ---- Starting life by element ----
   Each element (or confluence) starts at its own life total, a balance lever alongside card strength: set by
   simulation so decks of the same rarity and element count stay within about 70/30 of each other. */
const EL_LIFE = Object.assign({"ash": 14, "aurora": 13, "earth": 16, "fire": 16, "forge": 16, "hurricane": 14, "ice": 13, "lightning": 14, "metal": 14, "mirage": 16, "plasma": 17, "quicksilver": 13, "sand": 15, "solar": 20, "steam": 16, "storm": 13, "swamp": 13, "volcano": 17, "water": 15, "wildfire": 19}, globalThis.LIFE_OVR||{});
function deckLife(ref){ const dk = DECK_BY_ID[ref] || DECK_BY_ID[ref+"_starter"]; return (dk && EL_LIFE[dk.el]) || 15; }
