// Catalog generator (TCG Design). Writes cards/catalog_<conf>.js from a theme spec, following design/confluence-slots.md
// (grid and cost spread) and design/confluence-cards.md (rarity unlocks, one keyword below rare, burst cap, sweeps at most 2).
// The cards are first drafts built from effect templates per theme motif. Balance prices them; TCG and Story revise names and text.
//   bash tools/mk.sh && node design/tools/gencatalog.js wildfire [plasma ...]      (or: all)
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "../..");
vm.runInThisContext(fs.readFileSync(path.join(ROOT, "tools/engine.js"), "utf8"), { filename: "engine.js" });
const S = globalThis.__sim, L = S.LIB;

/* ---- Effect templates by motif. {d} small damage, {s} spell damage, {sw} sweep (1-2), {n} count, {h} heal, {tok} token.
   "@e" etc. after the text is the target spec. Common lists use only once-only triggers or self-only growth. ---- */
const M = {
  burn: { crc:["play: dmg t {d}@e","attack: dmg face 1","death: dmg all_e 1","play: dmg face 1"], cru:["start: zaps 1 2","edie: buff self 1 1","play: dmg t {s}@e"], crr:["play: dmg all_e 2","attack: dmg all_e 1"],
          sp:["play: dmg t {s}@e","play: dmg t {s1}@ea","play: dmg all_e {sw}","play: dmg t {s1}; draw 1@e"], re:["play: dmg t {s}@eatk","play: dmg t {s1}@ea"],
          auc:["start: zaps 1 1","end: dmg face 1"], auu:["spell: zaps 1 1","edie: dmg face 1"], aur:["start: dmg all_e 1"] },
  draw: { crc:["play: draw 1","death: draw 1"], cru:["spell: draw 1","play: draw 2"], crr:["start: draw 1"],
          sp:["play: draw {n1}","play: draw 1; energy 1","play: draw {n}; heal 2"], re:["play: draw {n1}","play: draw 1; buff t 0 2 tmp@o"],
          auc:["start/hand4: draw 1","end: draw 1"], auu:["draw: heal 1","spell: draw 1"], aur:["start: draw 1 | static: bank 2"] },
  freeze:{ crc:["play: freeze t@e","attack: freeze str","play: freeze t; dmg t 1@e"], cru:["start: freeze str","freeze: dmg face 1"], crr:["attack: freeze all_e","play: freeze all_e"],
          sp:["play: freeze t; dmg t {d}@e","play: freeze t; draw 1@e","play: freeze all_e"], re:["play: freeze t@eatk","play: freeze t; dmg t 1@eatk"],
          auc:["start: freeze str"], auu:["freeze: dmg face 1","freeze: draw 1"], aur:["start: freeze str; dmg frz_e 1"] },
  shatter:{ crc:["play: dmg frz_e 2","attack: dmg frz_e 2"], cru:["freeze: zaps 1 1","attack: dmg frz_e 3"], crr:["play: destroy t@e:frozen"],
          sp:["play: dmg frz_e {s}","play: freeze t; dmg frz_e 2@e"], re:["play: dmg t {s1}@e:frozen"], auc:["start: dmg frz_e 1"], auu:["freeze: zaps 1 1"], aur:["start: freeze weak; dmg frz_e 2"] },
  tokens:{ crc:["play: summon {tok} 1","death: summon {tok} 1"], cru:["token: buff self 1 0","start: summon {tok} 1"], crr:["start: summon {tok} 2","death: summon {tok} 3"],
          sp:["play: summon {tok} {n}","play: summon {tok} {n1}; buff tok 1 0 tmp"], re:["play: summon {tok} 1; buff tok 1 0 tmp","play: summon {tok} {n}"],
          auc:["start: summon {tok} 1","end: summon {tok} 1"], auu:["static: lord tok 1 1","token: dmg face 1"], aur:["start: summon {tok} 2"] },
  buff:  { crc:["play: buff ostr 1 1","attack: buff self 1 0 tmp","play: buff self 1 1"], cru:["static: lord all 1 0","creature: buff self 1 1"], crr:["static: lord all 1 1","play: buff own 1 1"],
          sp:["play: buff t {n1} {n1}@o","play: buff own 1 1","play: buff t {s1} 0; kw t pierce@o"], re:["play: buff t {n1} {n1} tmp@oatk","play: buff t 2 2 tmp@o"],
          auc:["start: buff ostr 1 1","start: buff ostr 2 0 tmp"], auu:["static: lord all 1 0"], aur:["static: lord all 1 1"] },
  fortify:{ crc:["play: fort self 1","play: fort t 1@o","death: fort own 1"], cru:["die: fort own 1","start: fort ostr 1"], crr:["play: fort own 2"],
          sp:["play: fort t 2; buff t 1 0@o","play: fort own 1"], re:["play: fort t 2@o","play: fort t 1; buff t 1 1 tmp@o"],
          auc:["start: fort ostr 1"], auu:["creature: fort self 1"], aur:["start: fort own 1"] },
  heal:  { crc:["play: heal {h}","play: mend own 2","death: heal 3"], cru:["start: heal 2","heal: buff self 1 0"], crr:["start: mend own all; heal 2","heal: dmg face 1"],
          sp:["play: heal {h}; draw 1","play: mend own all; heal 2","play: dmg t {d}; heal 2@e"], re:["play: heal {h}","play: buff t 0 3 tmp; heal 2@o"],
          auc:["start: heal 2","start: mend own 1"], auu:["heal: dmg face 1","heal: zaps 1 1"], aur:["start: heal 3 | heal: dmg face 1"] },
  bounce:{ crc:["play: bounce t@o","play: bounce t@e:cost<=2"], cru:["play: bounce t@e:cost<=3","ebounce: draw 1"], crr:["play: bounce t; draw 1@e"],
          sp:["play: bounce t; draw 1@o","play: bounce t@e","play: bounce t; energy 2@o"], re:["play: bounce t@eatk","play: bounce t@e:cost<=3"],
          auc:["start: buff ostr 1 0 tmp"], auu:["ebounce: dmg face 1","ebounce: draw 1"], aur:["start: bounce weak"] },
  chain: { crc:["play: dmg t 1 | chain2: dmg t 1@ea","chain2: draw 1","play/chain2: buff self 1 1"], cru:["spell: buff self 1 1","spell: zaps 1 1"], crr:["spell: dmg face 1"],
          sp:["play: dmg t 1 | chain2: dmg t 2@ea","play: draw 1 | chain2: energy 1","play: dmg t {d} | chain2: draw 1@e"], re:["play: dmg t 2 | chain2: draw 1@eatk"],
          auc:["end/spell2: zaps 1 2"], auu:["spell: zaps 1 1"], aur:["spell: dmg face 1"] },
  sacrifice:{ crc:["play/own2: sac; buff self 2 2","death: dmg all_e 1"], cru:["die: zaps 1 2","play: sac; dmg all_e 2"], crr:["die: dmg all_e 1"],
          sp:["play: sac; dmg all_e 0 x","play: sac; draw 2"], re:["play: sac; dmg t 0 x@e"], auc:["end/own3: sac; dmg face 2"], auu:["die: dmg face 1"], aur:["die: dmg all_e 1"] },
  shrink:{ crc:["play: buff t -1 0@e","attack: buff str -1 0"], cru:["start: buff rnd -1 0","play: buff t -1 -1@e"], crr:["play: buff all_e -1 -1"],
          sp:["play: buff t -{n1} 0@e","play: buff t -1 -1; draw 1@e"], re:["play: buff t -2 0@eatk"], auc:["start: buff rnd -1 0"], auu:["start: buff rnd -1 0"], aur:["start: buff all_e -1 0"] },
  selfburn:{ crc:["play: selfdmg 1; dmg t {d}@e","play/low10: buff self 1 1"], cru:["pain: dmg face 1","play: selfdmg 2; dmg all_e 1"], crr:["pain: zaps 1 2"],
          sp:["play: selfdmg 2; dmg t {s}@ea","play/low8: dmg t {s}; draw 1@e"], re:["play: selfdmg 1; dmg t {s}@eatk"], auc:["start: selfdmg 1; dmg face 2"], auu:["pain: dmg face 1"], aur:["pain: zaps 1 2"] },
  revive:{ crc:["death: summon {tok} 1","play/grave2: buff self 1 1"], cru:["play: revive 1","die: heal 1"], crr:["death: revive 2"],
          sp:["play: revive 1","play: regrow 1 creature; draw 1"], re:["play: revive 1"], auc:["end/grave3: summon {tok} 1"], auu:["die: summon {tok} 1"], aur:["start: revive 1"] },
  barrier:{ crc:["play: kw ostr barrier","play: kw t barrier@o"], cru:["start: kw ostr barrier","creature: kw self barrier"], crr:["play: kw own barrier"],
          sp:["play: kw t barrier; buff t 1 1@o","play: kw own barrier"], re:["play: kw t barrier@o","play: kw t barrier; dmg str 1@o"], auc:["start: kw ostr barrier"], auu:["static: lord all 0 1"], aur:["static: grant all barrier"] },
  mirror:{ crc:["play: summon mirror 1","death: summon mirror 1"], cru:["play: silence t@e","start: summon mirror 1"], crr:["play: copy ostr 1","play: steal t@e:cost<=3"],
          sp:["play: silence t; draw 1@e","play: summon mirror {n}"], re:["play: silence t@eatk","play: summon mirror 1; buff tok 1 0 tmp"], auc:["start: summon mirror 1"], auu:["static: lord tok 1 0"], aur:["start: copy ostr 1"] },
  shapeshift:{ crc:["play: swap t@o","play: swap self","play: transform t blob@e:cost<=2"], cru:["start: swap self","play: transform t blob@e:cost<=3"], crr:["play: copy self 1","start: transform weak blob"],
          sp:["play: transform t blob@e:cost<=3","play: swap t; buff t 1 1@o"], re:["play: swap t@eatk","play: transform t blob@eatk"], auc:["start: summon blob 1"], auu:["start: swap ostr"], aur:["start: transform weak blob"] },
  haste: { crc:["play: kw self haste tmp","attack: buff self 1 0 tmp"], cru:["creature: kw self haste tmp","creature: buff self 1 0"], crr:["attack: untap self"],
          sp:["play: buff t 2 0; kw t haste@o","play: untap t; buff t 1 0@o"], re:["play: buff t 2 1 tmp@oatk","play: untap t@o"], auc:["start: buff ostr 1 0 tmp"], auu:["static: lord all 1 0"], aur:["static: grant all haste"] },
  auras: { crc:["play/aura1: buff self 1 1","play/aura1: draw 1"], cru:["aura: buff self 1 1","aura: draw 1"], crr:["start: buffs self 1 1 aura"],
          sp:["play: draw 1 | play/aura1: energy 1","play/aura2: dmg all_e 2"], re:["play/aura1: dmg t 3@eatk"], auc:["start: buff ostr 1 0 tmp","start: heal 1"], auu:["aura: draw 1"], aur:["static: lord all 2 1 | static: cost aura 1"] },
};

/* ---- Theme specs (design/confluence-slots.md). [key, size, standalone?, motifs, keyword pool, creature style] ---- */
const T = (key, size, sa, motifs, kws, style) => ({ key, size, sa, motifs, kws, style });
const SPEC = {
  wildfire:{ tok:"ember", themes:[T("flames",25,1,["burn"],["airborne","haste"],"agg"), T("updraft",25,1,["burn","buff"],["airborne"],"agg"), T("kindling",20,1,["buff","tokens"],["haste"],"mid"), T("backburn",15,0,["bounce","burn"],["airborne"],"mid"), T("smoke",15,0,["shrink"],["skyguard"],"def")] },
  plasma:  { tok:"spark", themes:[T("overload",25,1,["selfburn"],[],"mid"), T("arc",20,1,["chain","draw"],[],"mid"), T("ignition",20,1,["burn","haste"],["haste","pierce"],"agg"), T("reactor",20,1,["draw","burn"],["barrier"],"mid"), T("static",15,0,["barrier","burn"],["barrier"],"def")] },
  swamp:   { tok:"mudling", themes:[T("gravetide",25,1,["revive","tokens"],["venom"],"mid"), T("mire",20,1,["heal","burn"],["drain"],"def"), T("rot",20,1,["shrink"],["venom"],"mid"), T("bogspawn",20,1,["tokens","sacrifice"],["venom"],"mid"), T("peat",15,1,["fortify","burn"],["wall"],"def")] },
  ice:     { tok:"droplet", themes:[T("shatter",25,1,["freeze","shatter"],[],"mid"), T("rimewings",20,1,["freeze"],["airborne"],"mid"), T("snowdrift",20,1,["bounce","freeze"],[],"mid"), T("hoarfrost",20,1,["freeze","burn"],["skyguard","wall"],"def"), T("squall",15,0,["draw"],["airborne"],"mid")] },
  storm:   { tok:"spark", themes:[T("spellstorm",25,1,["chain","burn"],[],"mid"), T("downpour",20,1,["burn","chain"],[],"agg"), T("thunderhead",20,1,["chain","buff"],["barrier"],"agg"), T("riptide",20,0,["bounce","draw"],["ward"],"def"), T("lightningrod",15,1,["burn","barrier"],["barrier"],"agg")] },
  sand:    { tok:"stoneling", themes:[T("erosion",25,1,["shrink","bounce"],[],"def"), T("dune",20,1,["burn","fortify"],["airborne"],"mid"), T("sandstorm",20,1,["burn","shrink"],[],"mid"), T("quicksand",20,0,["bounce","shrink"],["skyguard"],"def"), T("mesa",15,1,["fortify","burn"],["airborne"],"def")] },
  metal:   { tok:"drone", themes:[T("plating",25,1,["barrier","burn"],["barrier"],"agg"), T("forgework",20,1,["buff","fortify"],[],"mid"), T("dynamo",20,1,["fortify","burn"],["vigilant","pierce"],"agg"), T("rail",20,1,["burn","fortify"],["haste"],"agg"), T("magnet",15,1,["burn","tokens"],["pierce"],"agg")] },
  tempest: { tok:"volt", themes:[T("blitz",25,1,["haste","burn"],["haste"],"agg"), T("galeriders",20,1,["haste","burn"],["airborne"],"agg"), T("squallline",20,1,["haste","buff"],[],"agg"), T("eyeofstorm",20,0,["barrier","bounce"],["skyguard","barrier"],"def"), T("downburst",15,1,["bounce","burn"],["airborne"],"mid")] },
  geyser:  { tok:"droplet", themes:[T("wellspring",25,1,["heal","burn"],["drain"],"mid"), T("hotspring",20,1,["heal","buff"],[],"mid"), T("mudslide",20,1,["heal","fortify"],["drain"],"def"), T("vent",20,1,["burn","heal"],[],"agg"), T("sinter",15,1,["burn","fortify"],["wall"],"def")] },
  mirage:  { tok:"mirror", themes:[T("illusions",25,1,["mirror","draw"],["ward"],"mid"), T("phantasm",20,1,["tokens","mirror"],[],"mid"), T("haze",20,1,["bounce","draw"],["ward"],"mid"), T("heatshimmer",20,1,["freeze","burn"],["airborne"],"agg"), T("fatamorgana",15,0,["mirror","shrink"],[],"def")] },
  ash:     { tok:"ashling", themes:[T("cinders",25,1,["tokens","revive"],["haste"],"agg"), T("pyroclast",20,1,["sacrifice","tokens"],[],"agg"), T("emberflock",20,1,["tokens","burn"],["airborne"],"agg"), T("ashenwall",20,1,["tokens","fortify"],["wall"],"def"), T("kiln",15,1,["tokens","buff"],[],"mid")] },
  forge:   { tok:"golemTok", themes:[T("artifice",25,1,["auras","buff"],[],"mid"), T("anvil",20,1,["fortify","buff"],[],"def"), T("bellows",20,1,["burn","draw"],[],"mid"), T("sparksmith",20,1,["barrier","buff"],["barrier"],"mid"), T("crucible",15,1,["auras","burn"],["pierce"],"agg")] },
  solar:   { tok:"ember", themes:[T("sunfire",25,1,["burn"],["airborne"],"agg"), T("corona",20,1,["burn","haste"],["airborne","haste"],"agg"), T("flare",20,1,["chain","burn"],[],"mid"), T("zenith",20,1,["burn","buff"],["pierce"],"agg"), T("heathaze",15,0,["bounce","burn"],["airborne"],"mid")] },
  glacier: { tok:"iceblock", themes:[T("bulwark",25,1,["fortify","burn"],["wall","skyguard"],"def"), T("iceberg",20,1,["freeze","fortify"],["ward"],"def"), T("avalanche",20,1,["freeze","burn"],[],"mid"), T("snowfield",20,0,["freeze","heal"],["skyguard"],"def"), T("calving",15,1,["freeze","tokens"],[],"mid")] },
  quicksilver:{ tok:"blob", themes:[T("shapeshift",25,1,["shapeshift","draw"],[],"mid"), T("mercury",20,1,["shapeshift","buff"],[],"mid"), T("alloy",20,1,["barrier","fortify"],["barrier"],"def"), T("reflection",20,1,["mirror","tokens"],[],"mid"), T("liquidmetal",15,1,["bounce","draw"],[],"mid")] },
  hurricane:{ tok:"gust", themes:[T("maelstrom",25,1,["bounce","draw"],[],"mid"), T("eyewall",20,0,["barrier","bounce"],["skyguard","barrier"],"def"), T("downdraft",20,1,["bounce","burn"],["airborne"],"agg"), T("riptide",20,1,["draw","chain"],[],"mid"), T("tempestsurge",15,1,["haste","bounce"],["haste"],"agg")] },
  glass:   { tok:"shard", themes:[T("shards",25,1,["barrier","tokens"],["barrier"],"mid"), T("prismwall",20,1,["barrier","burn"],["wall","barrier"],"def"), T("splinter",20,1,["tokens","burn"],[],"agg"), T("mirror",20,1,["burn","barrier"],["airborne"],"agg"), T("fulgurite",15,1,["burn"],[],"mid")] },
};
/* ---- Words for names ---- */
const ADJ = {
  wildfire:["Blazing","Cinderwing","Kindled","Smoldering","Wildflame","Ashwind","Emberdrift","Scorching","Firegale","Searing"],
  plasma:["Arcing","Overcharged","Plasmic","Ionized","Searing","Volatile","Crackling","Molten","Charged","Fulgent"],
  swamp:["Bog","Mire","Rotting","Fen","Murk","Sodden","Peat","Mossy","Sunken","Silt"],
  ice:["Rime","Frost","Hoarfrost","Glacial","Sleet","Snowdrift","Frozen","Wintry","Chill","Icebound"],
  storm:["Thunder","Rain","Squall","Tempest","Stormtide","Drenched","Rolling","Downpour","Static","Cloudburst"],
  sand:["Dune","Sandstorm","Dust","Desert","Mesa","Shifting","Sunbaked","Gritted","Wind-carved","Sirocco"],
  metal:["Steel","Iron","Plated","Riveted","Chrome","Forged","Alloy","Magnetic","Tempered","Bolted"],
  tempest:["Gale","Thunderwing","Skybolt","Stormrider","Volt","Howling","Lightning","Squall","Cyclone","Whirling"],
  geyser:["Geyser","Steaming","Mineral","Hot-spring","Sulfur","Basin","Wellspring","Mud","Thermal","Spouting"],
  mirage:["Mirage","Phantom","Shimmering","Illusory","Veiled","Haze","Dreaming","Glimmer","Fata","Twin"],
  ash:["Ashen","Cinder","Soot","Smoke","Ember","Pumice","Kiln","Charred","Smolder","Ashborn"],
  forge:["Forge","Anvil","Bellows","Brass","Gear","Rune","Smelted","Sparkwork","Ironfire","Crucible"],
  solar:["Solar","Dawn","Sunfire","Corona","Radiant","Noon","Daybreak","Zenith","Sunlit","Flare"],
  glacier:["Glacier","Bulwark","Permafrost","Tundra","Icecap","Floe","Moraine","Snowpack","Rimewall","Polar"],
  quicksilver:["Quicksilver","Mercurial","Liquid","Shifting","Alloyed","Fluid","Mirrored","Molten-silver","Changing","Flowing"],
  hurricane:["Hurricane","Maelstrom","Eyewall","Typhoon","Gale","Storm-surge","Whirlpool","Cyclonic","Tidal","Squall"],
  glass:["Glass","Prism","Shard","Crystal","Fulgurite","Mirror","Faceted","Splintered","Lens","Clear"],
};
const NOUN = {
  creature:{ agg:["Raider","Hound","Drake","Striker","Lancer","Hawk","Brute","Duelist","Wolf","Charger","Reaver","Falcon"],
             mid:["Adept","Shaman","Spirit","Elemental","Sentinel","Weaver","Caller","Imp","Familiar","Serpent","Golem","Scout"],
             def:["Warden","Bulwark","Guardian","Tortoise","Colossus","Wall","Keeper","Behemoth","Sentry","Titan","Watcher","Giant"] },
  spell:["Burst","Surge","Rite","Wave","Volley","Call","Storm","Torrent","Blast","Ritual","Gift","Rain"],
  reaction:["Reflex","Snap","Ward","Riposte","Flash","Guard","Recoil","Feint","Retort","Trap"],
  aura:["Shrine","Altar","Field","Banner","Engine","Grove","Sanctum","Totem","Beacon","Font"],
};

/* ---- Grid and costs ---- */
const GRID = { creature:{c:25,u:15,r:10}, spell:{c:10,u:7,r:4}, reaction:{c:8,u:4,r:3}, aura:{c:7,u:4,r:3} };
const COSTS = { creature:[1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6],
                other:[1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,6] };
function hashS(s){ let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; }
function rng(seed){ let x = seed >>> 0; return () => { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; }

function slots(spec, R){
  // Split each type x rarity count across themes in proportion to theme size (largest remainder), standalone themes first for commons.
  const out = [], themes = spec.themes;
  for (const [type, byR] of Object.entries(GRID)) for (const [r, n] of Object.entries(byR)){
    const raw = themes.map(t => n * t.size / 100), base = raw.map(Math.floor);
    let left = n - base.reduce((a,b)=>a+b,0);
    const order = raw.map((x,i)=>[x-base[i] + (themes[i].sa && r==="c" ? 0.01 : 0), i]).sort((a,b)=>b[0]-a[0]);
    for (let k=0; k<left; k++) base[order[k][1]]++;
    themes.forEach((t,i) => { for (let k=0;k<base[i];k++) out.push({ type, r, th:t }); });
  }
  // Costs: cheaper costs to commons, dearer to rares, a little shuffle so themes get a spread.
  for (const kind of ["creature","other"]){
    const ss = out.filter(s => kind==="creature" ? s.type==="creature" : s.type!=="creature");
    const rk = { c:0, u:1, r:2 };
    ss.sort((a,b) => (rk[a.r]-rk[b.r]) + (R()-0.5)*2.2);
    const cs = [...COSTS[kind]];
    // Interleave: sort slots by a noisy rarity key, give them costs ascending.
    ss.forEach((s,i) => s.cost = cs[i]);
  }
  return out;
}
const fill = (tpl, cost, tok, r) => tpl
  .replace(/\{d\}/g, Math.min(cost, 3)).replace(/\{s\}/g, cost + 1 + (r==="r"?1:0)).replace(/\{s1\}/g, Math.max(1,cost))
  .replace(/\{sw\}/g, cost >= 4 ? 2 : 1).replace(/\{n\}/g, Math.max(1, Math.floor(cost/2))).replace(/\{n1\}/g, Math.max(1, Math.ceil(cost/2)))
  .replace(/\{h\}/g, cost + 2).replace(/\{tok\}/g, tok);
function pickFx(th, type, r, cost, R, tok){
  const key = type==="creature" ? "cr"+r : type==="spell" ? "sp" : type==="reaction" ? "re" : "au"+r;
  const lists = th.motifs.map(m => M[m] && M[m][key]).filter(Boolean);
  // Uncommons and rares may also use common templates (rarity unlocks add options, they don't remove them).
  if (type==="creature" && r!=="c") th.motifs.forEach(m => M[m] && lists.push(M[m].crc));
  if (type==="aura" && r!=="c") th.motifs.forEach(m => M[m] && lists.push(M[m].auc));
  const all = lists.flat(); if (!all.length) return { fx:"" };
  const t = all[Math.floor(R()*all.length)];
  const [body, tgt] = t.split("@");
  return { fx: fill(body, cost, tok, r), tgt: tgt || null };
}
function stats(cost, r, style, hasFx, kw){
  let B = Math.round(2.6*cost + 2) + (r==="r" ? 1 : 0) - (hasFx ? 1 + Math.floor(cost/3) : 0) - (kw.length ? 1 : 0);
  B = Math.max(2, B);
  const share = style==="agg" ? 0.58 : style==="def" ? 0.34 : 0.47;
  let atk = Math.max(1, Math.round(B*share)), hp = Math.max(1, B-atk);
  if (kw.includes("wall")) { hp += atk-1; atk = 1; }
  if (kw.includes("haste")) atk = Math.min(atk, cost+1);
  return [atk, hp];
}

function generate(conf){
  const spec = SPEC[conf], els = S.CONFLUENCE[conf], R = rng(hashS(conf));
  const usedNames = new Set(Object.values(L).filter(d => d.el===conf && (d.manifest || d.token)).map(d => d.name));
  for (const t of Object.values(S.TOKENS)) usedNames.add(t.name);
  const pools = els.map(el => Object.values(L).filter(d => d.el===el && !d.manifest && !d.token && !d.reserve));
  const usedSig = new Set(), uses = {};
  const rOrd = { s:0, c:0, u:1, r:2 };
  const ss = slots(spec, R);
  const lines = [];
  const byTheme = {};
  for (const s of ss) (byTheme[s.th.key] = byTheme[s.th.key] || []).push(s);
  const nameFor = (type, style) => {
    for (let k=0; k<400; k++){
      const a = ADJ[conf][Math.floor(R()*ADJ[conf].length)];
      const list = type==="creature" ? NOUN.creature[style] : NOUN[type];
      const n = list[Math.floor(R()*list.length)];
      const nm = a + " " + n;
      if (!usedNames.has(nm) && !L[conf+"_"+nm.toLowerCase().replace(/[^a-z0-9]+/g,"_")]?.manifest){ usedNames.add(nm); return nm; }
    }
    throw new Error("names exhausted for "+conf);
  };
  const sigFor = (type, cost, r) => {
    for (let tries = 0; tries < 60; tries++){
      const ids = pools.map((pool, i) => {
        let cands = pool.filter(c => c.type===type); if (!cands.length) cands = pool;
        const score = c => Math.abs(c.cost - cost)*2 + Math.abs(rOrd[c.r] - rOrd[r])*1.5 + (uses[c.id]||0)*2 + R()*1.2;
        const sorted = [...cands].sort((a,b) => score(a)-score(b));
        return sorted[Math.min(sorted.length-1, Math.floor(tries/ (i+1)) % 6)];
      });
      const key = ids.map(c=>c.id).sort().join("|");
      if (!usedSig.has(key)){ usedSig.add(key); ids.forEach(c => uses[c.id]=(uses[c.id]||0)+1); return ids.map(c=>c.name); }
    }
    throw new Error("no free signature in "+conf);
  };
  for (const th of spec.themes){
    lines.push(`\n  /* ---- ${th.key} (${th.size}${th.sa ? "" : ", support"}) ---- */`);
    for (const r of ["c","u","r"]){
      const mine = (byTheme[th.key]||[]).filter(s => s.r===r);
      if (!mine.length) continue;
      lines.push(`  setR("${r}");`);
      for (const s of mine){
        let fx, tgt, kw = [], text, ok = false;
        for (let att = 0; att < 30 && !ok; att++){
          ({ fx, tgt } = pickFx(th, s.type, r, s.cost, R, spec.tok));
          kw = [];
          if (s.type==="creature" && th.kws.length && R() < (r==="r" ? 0.8 : 0.55)) kw.push(th.kws[Math.floor(R()*th.kws.length)]);
          if (s.type==="creature" && r==="r" && th.kws.length > 1 && R() < 0.3){ const k2 = th.kws.find(k => !kw.includes(k)); if (k2) kw.push(k2); }
          if (kw.includes("haste") && s.cost <= 2 && /dmg face/.test(fx)) continue;
          if (kw.includes("wall") && /attack:/.test(fx)) continue;
          ok = true;
        }
        const nm = nameFor(s.type, s.th.style), sig = sigFor(s.type, s.cost, r);
        const tr = th.motifs.join("+") + (kw.length ? "+"+kw[0] : "");
        const o = [`th:"${th.key}"`].filter(Boolean); // th goes via S()
        const tgtS = tgt ? `,{tgt:"${tgt}"}` : "";
        const sArgs = `S("${th.key}","${tr}",${JSON.stringify(sig)}${tgtS})`;
        if (s.type==="creature"){
          let [a,h] = stats(s.cost, r, th.style, !!fx, kw);
          const face = (fx.match(/dmg face (\d+)/g) || []).reduce((t,m)=>t + +m.split(" ")[2], 0);
          if (kw.includes("haste") && a + face > s.cost + 1) a = Math.max(1, s.cost + 1 - face);   // burst cap
          lines.push(`  add(Cr(${JSON.stringify(nm)},${s.cost},${a},${h},"${kw.join(" ")}","${fx}",${sArgs}));`);
        } else {
          const F = s.type==="spell" ? "Sp" : s.type==="reaction" ? "Re" : "Au";
          lines.push(`  add(${F}(${JSON.stringify(nm)},${s.cost},"${fx}",${sArgs}));`);
        }
      }
    }
  }
  const U = conf.toUpperCase();
  const themesTxt = spec.themes.map(t => `${t.key} (${t.size}${t.sa?"":", support"}: ${t.motifs.join(" + ")})`).join(", ");
  const src = `/* ================= ${U} CATALOG (designed confluence cards, generated first draft) =================
   ${els.map(e=>e[0].toUpperCase()+e.slice(1)).join(" + ")}. 100 cards built by design/tools/gencatalog.js from the themes in design/confluence-slots.md:
   ${themesTxt}.
   A first draft: effects come from per-theme templates that follow design/confluence-cards.md (rarity unlocks, one keyword
   below rare, burst cap, sweeps at most 2). Balance prices them; TCG revises cards by hand and Story names them.
   Each card: th = theme, tr = traits, sig = signature recipe [${els.join(", ")}]. */
// Loaded by build.py inside catalogBegin("${conf}")/catalogEnd("${conf}") (src.html): its cards replace this confluence's
// older basics of the same id, and the rest are retired. cards/decks_catalog.js then rebuilds the prebuilt decks.
globalThis.${U}_CATALOG = [];
(function(){
  let M = null;
  const S = (th, tr, sig, o={}) => { M = { th, tr, sig, catalog:"${conf}" }; return o; };
  const add = d => { Object.assign(d, M); globalThis.${U}_CATALOG.push(d); return d; };
  setEl("${conf}");
${lines.join("\n")}
  // Signature recipes: the Forge's recipe book makes each designed card from its named parents (one card per element).
  for (const d of globalThis.${U}_CATALOG){
    const ids = d.sig.map((n, i) => cardIdByName(n, [CONFLUENCE["${conf}"][i]]));
    d.recipe = ids; RECIPES[fuseKey(ids)] = d.id;
  }
})();
`;
  fs.writeFileSync(path.join(ROOT, `cards/catalog_${conf}.js`), src);
  return spec.themes;
}
const want = process.argv.slice(2);
const list = want[0]==="all" ? Object.keys(SPEC) : want;
for (const c of list){ generate(c); console.log("wrote cards/catalog_"+c+".js"); }
module.exports = { SPEC };
