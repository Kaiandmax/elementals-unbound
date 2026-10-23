/* ---- RPG encounter tables (owner: Balance) ----
   Placeholder numbers from Game Dev so the overworld prototype is playable. Balance owns every value here.
   A table: { rate, grace, list:[{ deck, level, lifeMod, w }] }
     rate    chance per step in tall grass that a battle starts (0-1)
     grace   steps after a battle or map change before encounters can happen again
     deck    an enemy deck id from cards/decks*.js
     level   AI level 1-5
     lifeMod added to the enemy deck's element life (a normal encounter is -5)
     w       relative weight when picking from the list
   Trainers (NPC battles) use the same { deck, level, lifeMod } shape in RPG_TRAINERS. */
const RPG_ENCOUNTERS = {
  town_grass: { rate:0.10, grace:3, list:[
    { deck:"water_starter", level:1, lifeMod:-5, w:3 },
    { deck:"earth_starter", level:1, lifeMod:-5, w:3 },
    { deck:"wind_starter",  level:1, lifeMod:-5, w:2 } ] },
  route1_grass: { rate:0.12, grace:3, list:[
    { deck:"fire_starter",      level:2, lifeMod:-5, w:3 },
    { deck:"lightning_starter", level:2, lifeMod:-5, w:3 },
    { deck:"wind_flock",        level:2, lifeMod:-5, w:2 },
    { deck:"water_tide",        level:2, lifeMod:-5, w:2 } ] }
};
const RPG_TRAINERS = {
  route1_hiker: { deck:"earth_wall", level:3, lifeMod:0 }
};
