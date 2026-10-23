/* ================= CARD VALUE MODEL =================
   A rough power estimate used for balance checks: a card's value in "stat points" (a vanilla creature
   is worth about its attack plus its health). Effects are priced per atom, multiplied by how often their
   trigger is expected to fire. Used to keep cards within about 20% of their element and rarity's curve,
   and to normalize fusion costs. */
// Airborne and Skyguard are priced from level-5 results: decks full of Airborne won about 16 points more than their
// numbers predicted, and Skyguard-heavy decks less.
const VAL_KW = { airborne:a=>0.8*a+1, haste:a=>0.5*a, pierce:a=>0.25*a, ward:()=>1, drain:a=>0.45*a, skyguard:()=>0.4,
  vigilant:a=>0.35*a, barrier:()=>1.5, venom:()=>2.5, wall:a=>-a };
const VAL_TOK = id => { const t = TOKENS[id]; if (!t) return 2; let v = t.atk + 0.85*t.hp; for (const k of t.kw) v += (VAL_KW[k]||(()=>0))(t.atk); return Math.max(0.5, v); };
const VAL_SCALE = { chain:1.5, air:1.5, own:2.5, charge:3, hand:4, grave:3, aura:1.5, frz:1, tok:2, spells:1, mani:1, lost:2, x:3, atk:4 };
const VAL_GRP = { t:1, face:1, me:1, all_e:2.6, all:1.2, all_ef:3.3, all_eb:2.6, all_eb3:2, str:1.1, weak:0.9, self:1, own:2.5, other:2, air:1.5,
  tok:1.5, frz_e:1.2, ostr:1, oweak:1, rnd:0.9, eair:1, oth:1.5, grnd:1 };
function atomValue(a){
  const [v, ...r] = a; const G = T => VAL_GRP[T] ?? 1;
  switch (v){
    // Damage to the enemy is worth as much as damage to a creature: battles are short and life is only about 15
    // (decks with more face damage won more than their numbers predicted).
    case "dmg": { const [T,n,sc] = r; const amt = (+n) + (sc ? (VAL_SCALE[sc]||1) : 0); return T==="face" ? 1.3*amt : T==="me" ? -1.0*amt : 1.3*amt*G(T); }
    case "heal": return 0.5*(+r[0]);
    case "draw": return 2.4*(+r[0]);
    case "energy": return 1.6*(+r[0]);
    case "charge": return 1.4*(+r[0]);
    case "selfdmg": return -0.7*(+r[0]);
    case "buff": { const [T,a,h,tmp] = r; const s = tmp ? 0.7*(+a) + 0.5*(+h) : (+a) + 0.85*(+h); return (+a<0||+h<0) ? -s*G(T)*1.1 : s*G(T); }
    case "kw": { const [T,k,tmp] = r; return (tmp ? 0.8 : 1.6)*G(T); }
    case "freeze": return 1.8*G(r[0]);
    case "bounce": return 2.4*G(r[0]);
    case "destroy": return 6*G(r[0]);
    case "noblock": return 0.8*G(r[0]);
    case "untap": return 1;
    case "summon": return VAL_TOK(r[0])*(+r[1]);
    case "revive": return 5*(+r[0]);
    case "regrow": return 2.6*(+r[0]);
    case "copy": return 5*(+(r[1]||1))*(r[0]==="t"?1:1);
    case "steal": return 9;
    case "transform": return 5*G(r[0]);
    case "swap": return 2*G(r[0]);
    case "strike": return 4.5*G(r[0]);
    case "sac": return -2.5;
    case "discard": return 1.8*(+r[0]);
    case "silence": return 2.2*G(r[0]);
    case "seek": return 2.4;
    case "maxlife": return 0.8*(+r[0]);
    case "double": return 2.5;
    case "buffs": { const [T,a,h,sc,tmp] = r; return ((+a)+0.85*(+h))*(VAL_SCALE[sc]||1)*(tmp?0.6:1)*G(T); }
    case "zaps": return 1.1*(+r[0])*(+r[1]);
    case "fort": return 3*(+r[1])*G(r[0]);
  }
  return 0;
}
const VAL_TRIG = { play:1, death:0.8, attack:1.8, block:1.2, start:2.6, end:2.6, spell:2, react:1.2, creature:2, card:2.6, spend:1.6, manifest:1.4,
  die:1.6, edie:1.6, heal:1.8, draw:1.8, freeze:1.4, ebounce:1.2, face:2.2, pain:1.4, charge:2.4, token:1.6, aura:1.2, hurt:1.4 };
function staticValue(a){
  const [k, ...r] = a;
  if (k==="lord"){ const g = { all:3, other:2.2, air:1.8, oair:1.4, tok:1.6 }[r[0]] || 2; return g*((+r[1]) + 0.85*(+r[2])); }
  if (k==="grant") return ({ all:3, other:2.2, tok:1.5 }[r[0]] || 2)*1.3;
  if (k==="cost") return 4*(+r[1]);
  if (k==="bank") return 1.5*(+r[0]);
  if (k==="sp") return 3.5*(+r[0]);
  return 1;
}
function effectValue(fx, aura){
  if (!fx) return 0;
  let v = 0;
  for (const b of fx.split("|")){
    const i = b.indexOf(":"); if (i<0) continue;
    let [trig, cond] = b.slice(0,i).trim().split("/");
    if (COND_RE.test(trig)){ cond = trig; trig = "play"; }
    const atoms = b.slice(i+1).split(";").map(a=>a.trim().split(/\s+/)).filter(a=>a[0]);
    if (trig==="static"){ for (const a of atoms) v += staticValue(a); continue; }
    let s = 0; for (const a of atoms) s += atomValue(a);
    let m = (VAL_TRIG[trig] ?? 1) * (aura && trig!=="play" ? 1.6 : 1);
    if (cond) m *= cond.startsWith("oc") ? 0.5 : 0.6;
    v += s*m;
  }
  return v;
}
// Hand-written Starter cards have no effect string: a light reading of their text.
function textValue(t){
  let v = 0, m;
  t = t||"";
  for (m of t.matchAll(/deal (\d+) damage to (an enemy creature or the enemy|an enemy creature|a creature)/gi)) v += 1.3*m[1];
  for (m of t.matchAll(/deal (\d+) damage to the enemy/gi)) v += 0.8*m[1];
  for (m of t.matchAll(/deal (\d+) damage to every enemy creature/gi)) v += 3.4*m[1];
  for (m of t.matchAll(/draw (\d+|a) cards?/gi)) v += 2.4*(m[1]==="a"?1:+m[1]);
  for (m of t.matchAll(/gain (\d+) life/gi)) v += 0.5*m[1];
  for (m of t.matchAll(/gain (\d+) Energy/gi)) v += 1.6*m[1];
  if (/freeze every enemy/i.test(t)) v += 4.5; else if (/freeze/i.test(t)) v += 1.8;
  if (/return (an|every)/i.test(t)) v += 2.4;
  if (/destroy/i.test(t)) v += 6;
  if (/at the start of your turn/i.test(t)) v *= 2;
  return v;
}
function statValue(d){
  if (d.type!=="creature") return 0;
  let v = d.atk + 0.85*d.hp;
  for (const k of d.kw) v += (VAL_KW[k]||(()=>0))(d.atk);
  if (d.fort) v += 3*d.fort;
  return v;
}
// Starter cards are hand-coded; these effect strings price them the same way as everything else.
const STARTER_FX = { ember_imp:"death: charge 1", searing_spark:"play: dmg t 2", cinder_hound:"ignite: kw self haste", flame_lash:"play: dmg t 3 | ignite: dmg face 2",
  blazing_command:"play: noblock t; draw 1", kindling_hearth:"spend: dmg face 1", wildfire_ignition:"play: buff t 3 0 temp", pyre_dancer:"oc2: dmg t 3",
  magma_golem:"play: charge 1", fireball:"play: dmg t 4 | oc2: dmg t 2", combustion_burst:"play: dmg t 5; dmg face 1", pyroclastic_surge:"play: dmg all_e 3",
  heart_of_sun:"start: dmg face 2", inferno_lord:"play: dmg face 3", riverbank_sage:"play: draw 1", frost_snap:"play: freeze t; draw 1", undertow:"play: bounce t",
  tidal_insight:"play: draw 2 | oc2: draw 1", coral_warden:"play: heal 2", whirlpool_mage:"play: bounce t", healing_spring:"start: heal 1; charge 1",
  leviathan_calf:"play: charge 1", wellspring:"play: draw 2; heal 4; buff own 0 2", mirror_lake:"static: cost reaction 1 | start: freeze str",
  tidal_wave:"play: bounce all_eb", kraken:"play: freeze all_e", maelstrom:"play: destroy all", stonecaller:"play: charge 1", earthen_blessing:"play: buff t 2 2",
  quarry_shaman:"static: bank 2", geode_burrower:"death: charge 2", rockslide:"play: dmg t 4 | oc2: dmg t 2", mountains_patience:"start: charge 1",
  granite_behemoth:"play: charge 1", worldroot:"start: buff own 1 1", tectonic_rise:"play: buff own 3 3", avalanche:"play: destroy str; buff own 1 1",
  zephyr_courier:"play: energy 1", tailwind:"play: buff t 2 0 temp; kw t airborne temp", cyclone_kick:"play: bounce t | oc2: draw 1", updraft:"play: energy 1",
  featherfall_hawk:"play: dmg t 1", wind_dancer:"play: energy 1", sky_temple:"static: lord air 1 0", storm_roc:"play: charge 1", gale_force:"play: bounce all_eb3",
  second_wind:"play: energy 3", skyborne_armada:"play: summon wisp 3", eye_of_storm:"static: grant all airborne", spark_mite:"chain2: buff self 2 0 temp",
  static_bolt:"play: dmg t 1 chain | oc2: dmg t 2", charge_conduit:"play: draw 1", arc_lash:"play: dmg t 2 | chain2: dmg face 2", overclock:"play: energy 2",
  blitz:"play: buff t 2 1 temp", thunderclap_adept:"spell: dmg face 1", galvanic_golem:"play: energy 1", tesla_coil:"start: dmg face 1; charge 1",
  surge_conduit:"play: energy 2; draw 2", chain_storm:"play: dmg t 3; dmg face 2", overload_engine:"static: cost spell 1", thunderstorm:"play: dmg all_e 1 chain; dmg face 3",
  raijin:"play: dmg face 0 chain" };
const fxOf = d => d.fx!=null ? d.fx : (STARTER_FX[d.id] ?? null);
function cardValue(d){
  let e = 0;
  if (d.fused) for (const id of d.fused){ const p = LIB[id], f = fxOf(p); e += f!=null ? effectValue(f, p.type==="aura") : textValue(p.text); }
  else { const f = fxOf(d); e = f!=null ? effectValue(f, d.type==="aura") : textValue(d.text); }
  if (d.counter) e += 4;
  if (d.type==="reaction") e *= 1.25;
  return statValue(d) + e;
}
// The reference curve: how much value a card of a given cost is expected to carry (fitted on the base elements' cards).
function costCurve(d){
  // Manifests: charge comes in at about 1.5 a turn and most games end within 3 to 5 turns each, so every charge
  // past 3 costs more than the last; expensive Manifests must hit much harder to be worth waiting for.
  if (d.manifest){ const n = Object.values(d.mcost).reduce((a,b)=>a+b,0); return Math.max(4, 3.8*n - 2 + 0.9*Math.max(0, n-3)**2); }
  return 0.6 + 3*d.cost;
}
function cardRatio(d){ return cardValue(d) / costCurve(d); }

// Group medians for the balance pass (filled in catalog.js once every card exists).
const BAL_MED = {}; let BAL_READY = false;
