/* ---------------- RPG layer: monster rosters (TCG Design's design/world.md; numbers are Balance's) ----------------
   A roaming monster is rolled from its area's roster: an element by the biome's weights, then a prebuilt deck of
   that element at the area's rank. About 1 in 6 off-road is an elite, one rank up, drawn bigger with a mark.
   Minor chests roll a basic card the same way (seeded by the chest id, so a chest always holds the same card). */
const RPG_ROSTERS = {
  fields: { els:{ fire:1, water:1, earth:1, wind:1, lightning:1 } },
  forest: { els:{ earth:2, wind:2, water:1 } },
  fen:    { els:{ water:2, earth:2 } },
  moor:   { els:{ wind:2, earth:1, fire:1 } },
  hills:  { els:{ earth:3, lightning:1 } },
  volcano:{ els:{ fire:3, earth:1 } },
  coast:  { els:{ water:3, wind:1 } },
  sky:    { els:{ wind:3, lightning:1 } },
  storm:  { els:{ lightning:3, water:1 } },
};
// Rank -> deck tier (base elements only until Silver; confluences come with later regions), AI level, life.
const RPG_RANKS = ["tin", "copper", "iron", "steel", "silver", "gold", "adamant", "exalted"];
const RPG_RANK_DECKS = {
  tin:    { tier:"starter",  level:[1,2], lifeMod:-5 },
  copper: { tier:"common",   level:[2,2], lifeMod:-5 },
  iron:   { tier:"uncommon", level:[2,3], lifeMod:-5 },
  steel:  { tier:"rare",     level:[3,3], lifeMod:-5 },
};
const RPG_ELITE_CHANCE = 1/6;
function rpgRosterPick(roster, rank, rnd){
  const R = RPG_ROSTERS[roster] || RPG_ROSTERS.fields, rd = RPG_RANK_DECKS[rank] || RPG_RANK_DECKS.tin, r = rnd || Math.random;
  const els = Object.entries(R.els), tot = els.reduce((a,[,w])=>a+w,0); let x = r()*tot, el = els[0][0];
  for (const [e,w] of els){ x -= w; if (x < 0){ el = e; break; } }
  const decks = Object.values(DECK_BY_ID).filter(d => d.el === el && d.tier === rd.tier);
  const dk = decks.length ? decks[Math.floor(r()*decks.length)] : DECK_BY_ID[el+"_starter"];
  return { deck:dk.id, el, level: rd.level[0] + Math.floor(r()*(rd.level[1]-rd.level[0]+1)), lifeMod: rd.lifeMod, rank };
}
function rpgRankUp(rank){ const i = RPG_RANKS.indexOf(rank); return RPG_RANK_DECKS[RPG_RANKS[i+1]] ? RPG_RANKS[i+1] : rank; }
// A minor chest's card: a basic card from a deck of the roster's elements at the given rank, never a Manifest.
function rpgMinorCard(chest){
  const seed = [...chest.id].reduce((a,c)=>(a*31 + c.charCodeAt(0))|0, 7), rnd = rpgRng(seed);
  const m = chest.minor, rk = m.seedEl ? null : m.rank, pick = rpgRosterPick(m.roster || "fields", m.rank || "tin", rnd);
  const el = m.seedEl || pick.el, tier = (RPG_RANK_DECKS[m.rank] || RPG_RANK_DECKS.tin).tier;
  const pool = Object.values(DECK_BY_ID).filter(d => d.el === el && d.tier === tier).flatMap(d => d.main).filter((id,i,a) => a.indexOf(id) === i && LIB[id] && !LIB[id].manifest);
  return pool.length ? pool[Math.floor(rnd()*pool.length)] : null;
}
