/* ---- RPG encounter tables (owner: Balance) ----
   Placeholder numbers from Game Dev so the overworld prototype is playable. Balance owns every value here.
   A table (for roaming monsters with `table:`; regions now use rpg/rosters.js): { grace, list:[{ deck, level, lifeMod, w }] }
     grace   steps after a battle before roaming monsters can start another
     deck    an enemy deck id from cards/decks*.js
     level   AI level 1-5
     lifeMod added to the enemy deck's element life (a normal encounter is -5)
     w       relative weight when picking from the list
   Trainers (NPC battles) use the same { deck, level, lifeMod } shape in RPG_TRAINERS. A boss monster adds
   boss: { bars:[8,8], slowStart:true, clearOnBreak:true, breakHeal:3 } (design/bosses.md): bars are the extra life bars
   (phases = bars + 1), slowStart gives 2 Energy a turn in phase 1, breakHeal heals the player and draws 1 on each break;
   energyByPhase:[2,3,4] overrides the Energy per turn by phase. name: what the battle screen calls the opponent. */
const RPG_ENCOUNTERS = {
  town_grass: { rate:0.10, grace:3, list:[
    { deck:"water_starter", level:1, lifeMod:-5, w:3 },
    { deck:"earth_starter", level:1, lifeMod:-5, w:3 },
    { deck:"wind_starter",  level:1, lifeMod:-5, w:2 } ] },
  route1_grass: { rate:0.12, grace:3, list:[
    { deck:"fire_starter",      level:2, lifeMod:-5, w:3 },
    { deck:"lightning_starter", level:2, lifeMod:-5, w:3 },
    { deck:"wind_flock",        level:2, lifeMod:-5, w:2 },
    { deck:"water_tide",        level:2, lifeMod:-5, w:2 } ] },
  // Act I demo (Story's proposals in story/demo/act1.md; Balance tunes):
  route1_iron: { rate:0.12, grace:3, list:[
    { deck:"water_riptide", level:3, lifeMod:-5, w:2 },
    { deck:"water_frost",   level:3, lifeMod:-5, w:2 },
    { deck:"earth_crystal", level:3, lifeMod:-5, w:2 } ] },
  orchard_grass: { rate:0.12, grace:3, list:[
    { deck:"fire_swarm", level:2, lifeMod:-5, w:3 },
    { deck:"fire_pyro",  level:2, lifeMod:-5, w:3 },
    { deck:"wind_flock", level:2, lifeMod:-5, w:2 } ] },
  vault_shallows: { rate:0.12, grace:3, list:[
    { deck:"water_riptide", level:3, lifeMod:-5, w:3 },
    { deck:"water_frost",   level:3, lifeMod:-5, w:3 },
    { deck:"earth_crystal", level:3, lifeMod:-5, w:2 } ] }
};
/* Card drops after a won duel (designer rule, 2026-10-24): the card comes from the enemy's own deck, picked with
   weights by rarity, so a rare in a mostly-common deck is a long shot and an all-rare deck can only give rares.
   Manifests never drop; they come from specific chests, contracts and story duels.
   Designer (2026-10-24): each win gives 1-2 basic cards, plus (from dual/triple enemies) enough essence to forge one more card.
     cards      [min, max] different cards per won duel, by kind of fight (uniform between them)
     weights    relative weight of each card in the deck by rarity (s starter, c common, u uncommon, r rare)
     skipOwned  leave cards the player already owns out of the pool (pending the collection rules from TCG Design)
     essence    essence of the enemy deck's confluence per win, by dual/triple; mono enemies give none.
                Placeholder: 1 = one forge's worth until TCG Design specs Forge costs. */
const RPG_DROPS = {
  cards:   { wild:[1,2], trainer:[1,2] },
  weights: { s:8, c:8, u:3, r:1 },
  skipOwned: true,
  essence: { dual:1, triple:1 }
};
const RPG_TRAINERS = {
  // The Prologue (story/demo/prologue.md): Tin wild duels, Story's proposals pending Balance.
  pro_mice:      { name:"Ember mice", deck:"fire_starter", level:1, lifeMod:-5 },
  pro_sprite:    { name:"Well-sprite", deck:"water_starter", level:1, lifeMod:-5 },
  pro_hound:     { name:"Young gale-hound", deck:"wind_starter", level:2, lifeMod:-5 },
  pro_straggler: { name:"Gale-hound straggler", deck:"wind_starter", level:2, lifeMod:-5 },
  pro_thatch:    { name:"Ember wild", deck:"fire_starter", level:1, lifeMod:-5 },
  pro_ewe:       { deck:"earth_starter", level:1, lifeMod:-5 },
  // Act I demo. AI levels by designer rule (d-1792866671427): boss monsters 3-4, NPC duels 3-4, rivals 5.
  // Boss shapes from design/bosses.md; bars, life and level are Balance's to tune.
  a1_gullet: { name:"Gullet", deck:"water_tide", level:3, lifeMod:0, music:"battle-gullet",
    boss:{ bars:[8], slowStart:true, clearOnBreak:true, crown:"lurker" } },
  a1_brann:  { name:"Brann", deck:"earth_wall", level:3, lifeMod:0, music:"battle-contract" },
  a1_pell:   { name:"Pell", deck:"fire_swarm", level:5, lifeMod:0, music:"battle-rival" },
  a1_mother: { name:"The Cinder Mother", deck:"fire_fury", level:3, lifeMod:0, music:"battle-cinder-mother",
    boss:{ bars:[8,8], slowStart:true, clearOnBreak:true, breakHeal:3, crown:"brood", side:{ name:"The Brood", hp:3, crew:"Brann and Dove", token:"ember" } } },
  a1_warden: { name:"The Sluicewarden", deck:"earth_titans", level:3, lifeMod:0, music:"battle-sluicewarden",
    boss:{ bars:[8,8], slowStart:true, clearOnBreak:true, breakHeal:3, crown:"sealwork", side:{ name:"The serpent's brood", hp:3, crew:"Brann, Dove and Pell" } } }
};
