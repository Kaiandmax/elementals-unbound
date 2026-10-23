/* ---- RPG maps (owner: Game Dev; place names and all words come from Story) ----
   A map is a grid of one-character tiles plus things placed on it.
   Tiles:  .  grass          ,  tall grass (encounters)   =  path       f  flowers
           #  tree (solid)   ~  water (solid)             R  roof       H  house wall
           D  door           s  sign (solid, read it)     _  floor      W  inside wall
           t  table (solid)  >  doormat / exit
   Things: warps   [{ x, y, to, tx, ty, dir }]   step on (x,y) -> map `to` at (tx,ty) facing dir
           npcs    [{ id, x, y, dir, look:{shirt,hair}, talk, trainer?, flag?, after?, still? }]
                     talk/after are RPG_TEXT keys; trainer is an RPG_TRAINERS key; flag is set when beaten
           signs   [{ x, y, text }]              text is an RPG_TEXT key
           chests  [{ id, x, y, card, text? }]   card is a card id; opened once per save
           grass   an RPG_ENCOUNTERS key for this map's tall grass
           heal    [x, y]  where you wake up after losing on this map (falls back to the town's) */
const RPG_START = { map:"house", x:5, y:4, dir:"up" };
const RPG_MAPS = {
  town: {
    name:"Hometown", grass:"town_grass", heal:[11,9],
    rows:[
      "###########==###########",
      "#f.........==.........f#",
      "#..RRRRR...==...RRRRR..#",
      "#..RRRRR...==...RRRRR..#",
      "#..HHDHH...==...HHHHH..#",
      "#....=....s==..........#",
      "#....=======...........#",
      "#..........=.....~~~~..#",
      "#..f.......=.....~~~~..#",
      "#..........=.....~~~~..#",
      "#...,,,,...=...........#",
      "#...,,,,...=......f....#",
      "#...,,,,...=...........#",
      "#..........=...........#",
      "#f.........=..........f#",
      "########################" ],
    warps:[ { x:5, y:4, to:"house", tx:4, ty:6, dir:"up" },
            { x:11, y:0, to:"route1", tx:9, ty:22, dir:"up" }, { x:12, y:0, to:"route1", tx:10, ty:22, dir:"up" } ],
    npcs:[ { id:"elder", x:8, y:8, dir:"down", look:{ shirt:"#7a6aa8", hair:"#d9d6cf" }, talk:"elder" },
           { id:"kid", x:15, y:12, dir:"left", look:{ shirt:"#d9a03c", hair:"#4a2c1a" }, talk:"kid" } ],
    signs:[ { x:10, y:5, text:"sign_town" } ],
    chests:[]
  },
  house: {
    name:"Your house", heal:[4,4],
    rows:[
      "WWWWWWWWWW",
      "W________W",
      "W_tt_____W",
      "W_tt___t_W",
      "W________W",
      "W________W",
      "W________W",
      "WWWW>>WWWW" ],
    warps:[ { x:4, y:7, to:"town", tx:5, ty:5, dir:"down" }, { x:5, y:7, to:"town", tx:5, ty:5, dir:"down" } ],
    npcs:[ { id:"parent", x:6, y:2, dir:"down", look:{ shirt:"#4f8a6e", hair:"#2b1d14" }, talk:"parent" } ],
    signs:[], chests:[]
  },
  route1: {
    name:"Route 1", grass:"route1_grass",
    rows:[
      "####################",
      "#.........#,,,,,,,,#",
      "#..........,,,,,,,,#",
      "#..........,,,,,,,,#",
      "#,,,,,.........,,,,#",
      "#,,,,,.........,,,,#",
      "#,,,,,..####...,,,,#",
      "#.......####.......#",
      "#...~~~~...........#",
      "#...~~~~.......,,,,#",
      "#...~~~~...,,,,,,,,#",
      "#..........,,,,....#",
      "######.....,,,,....#",
      "#,,,,,.............#",
      "#,,,,,...======....#",
      "#,,,,,...=....=....#",
      "#..f.....=....=..f.#",
      "#........=....=....#",
      "#,,,,,,,,=....=,,,,#",
      "#,,,,,,,,=....=,,,,#",
      "#........==...=....#",
      "#.........=====....#",
      "#........==........#",
      "#########==#########" ],
    warps:[ { x:9, y:23, to:"town", tx:11, ty:1, dir:"down" }, { x:10, y:23, to:"town", tx:12, ty:1, dir:"down" } ],
    npcs:[ { id:"hiker", x:12, y:8, dir:"left", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, talk:"hiker", trainer:"route1_hiker", flag:"beat_hiker", after:"hiker_after" } ],
    signs:[ { x:1, y:1, text:"sign_route1" } ],
    chests:[ { id:"route1_chest", x:2, y:2, card:"wind_tempest_dragon" } ]
  }
};

/* Placeholder words so the prototype runs. Story owns all of these: supply story/data/*.js that does
   Object.assign(RPG_TEXT, { key: ["line", "line", ...] }) and it overrides these at build time.
   A line may start with "Name: " to show a speaker. */
const RPG_TEXT = {
  elder:       ["Elder: (placeholder) The tall grass is full of wild duelists. Walk in and one may challenge you.",
                "Elder: (placeholder) Head north to Route 1 when you feel ready."],
  kid:         ["Kid: (placeholder) I saw a chest on Route 1, past the grass in the top-left corner!"],
  parent:      ["Parent: (placeholder) Be careful out there. Come home if you lose; you'll wake up safe."],
  sign_town:   ["(placeholder) North: Route 1."],
  sign_route1: ["(placeholder) The dungeon lies beyond here. It isn't built yet."],
  hiker:       ["Hiker: (placeholder) Hold it! Let's see what your deck can do."],
  hiker_after: ["Hiker: (placeholder) Good duel. That chest up north has been sitting there for years."],
  hiker_win:   ["Hiker: (placeholder) You beat me fair and square."],
  lost:        ["(placeholder) You were defeated and made your way back to safety."],
  chest_empty: ["The chest is empty."]
};
