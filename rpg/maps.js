/* ---- RPG maps (owner: Game Dev; place names and all words come from Story) ----
   A map is a grid of one-character tiles plus things placed on it.
   Tiles:  .  grass          ,  tall grass (wild duels)   w  shallow water (wild duels)   =  path      f  flowers
           #  tree (solid)   ~  water (solid)             R  roof       H  house wall    D  door
           s  sign post      _  floor                     W  inside wall   t  table (solid)   >  doormat / exit
   Map fields:
     name, music (a track id from music/), grass (an RPG_ENCOUNTERS key, or [{ when, unless, table }], first match wins)
     heal  where you wake up after losing: [x, y] on this map or { map, x, y }      lost  text key played when you do
   Things (every one can carry when: "flag" / unless: "flag", or lists of flags, to appear only in some story states):
     warps   [{ x, y, to, tx, ty, dir }]   step on (x,y) -> map `to` at (tx,ty) facing dir
     npcs    [{ id, x, y, dir, look:{shirt,hair}, talk, sets?, trainer?, flag?, win?, after?, music?, still? }]
               talk/after: a text spec (below); trainer: an RPG_TRAINERS key; flag: set when beaten;
               win: text key after a win (default <id>_win); sets: flag(s) set after talking
     signs   [{ x, y, text }]              text is a text spec; a sign is solid, so a sign with `unless` can block a road
     chests  [{ id, x, y, card, text?, sets?, stinger? }]   card is a card id, opened once per save; text plays after the reveal
     scenes  [{ id, at:[x,y] | area:[x0,y0,x1,y1] | (neither: on entering the map), text, sets?, stinger?, music?, end?, repeat? }]
               one-time unless repeat: playing it sets the flag scene_<id>; end: a text key shown as a full-screen end card
   Text spec: "key" | { text, sets?, stinger?, music?, end? } | a list of those with when/unless, where the first match wins.
   Keys are RPG_TEXT entries (placeholders below; Story's real words in story/data/*.js). smoke.js checks every reference. */

/* Story setup: the cold open before the first map, the deck-pick prompt, hunter ranks (first match wins) and their stinger. */
const RPG_STORY = {
  intro: "a1_intro", introMusic: "cold-open", pickPrompt: "a1_pick_deck", startText: null,
  firstRank: "Tin", ranks: [ { flag:"a1_rank_iron", name:"Iron" }, { flag:"a1_rank_copper", name:"Copper" } ], rankStinger: "sting-rankup"
};
const RPG_START = { map:"house", x:4, y:5, dir:"up" };
// Act I demo (story/demo/act1.md). Flags are Story's (a1_*); scene_<id> flags are set by scenes when they play.
const A1_FORD_HEAL = { map:"house", x:4, y:4 }, A1_CROSS_HEAL = { map:"cross", x:12, y:8 }, A1_VAULT_HEAL = { map:"weir_gate", x:8, y:8 };
const RPG_MAPS = {
  house: {
    name:"Calder Mill", music:"brindle-ford", heal:[4,4], lost:"a1_lost_ford",
    rows:[
      "WWWWWWWWWW",
      "W________W",
      "W_tt___t_W",
      "W_tt_____W",
      "W________W",
      "W________W",
      "W________W",
      "WWWW>>WWWW" ],
    warps:[ { x:4, y:7, to:"town", tx:5, ty:5, dir:"down" }, { x:5, y:7, to:"town", tx:5, ty:5, dir:"down" } ],
    npcs:[ { id:"dad", x:6, y:3, dir:"down", look:{ shirt:"#4f8a6e", hair:"#2b1d14" },
             talk:[ { when:"a1_beat_gullet", text:"a1_dad_wheel" }, { when:"a1_licensed", text:"a1_dad_after" }, { text:"a1_dad" } ] } ],
    signs:[ { x:8, y:1, text:"a1_sign_wheel" } ],
    chests:[]
  },
  town: {
    name:"Brindle Ford", music:"brindle-ford", grass:"town_grass", heal:A1_FORD_HEAL, lost:"a1_lost_ford",
    rows:[
      "############=#############",
      "#f..........=...........f#",
      "#..RRRRR....=....RRRRRR..#",
      "#..RRRRR....=....RRRRRR..#",
      "#..HHDHH....=....HHHDHH..#",
      "#....=......=.......=....#",
      "======================...#",
      "#...........=.....~~~~...#",
      "#..f........=.....~~~~...#",
      "#...........=.....~~~~...#",
      "#...,,,,....=............#",
      "#...,,,,....=.......f....#",
      "#...,,,,....=............#",
      "#...,,,,....=............#",
      "#f..........=...........f#",
      "##########################" ],
    warps:[ { x:5, y:4, to:"house", tx:4, ty:6, dir:"up" },
            { x:20, y:4, to:"hall_ford", tx:5, ty:7, dir:"up" },
            { x:0, y:6, to:"millrace", tx:11, ty:8, dir:"up", when:"a1_licensed" },
            { x:12, y:0, to:"route1", tx:9, ty:22, dir:"up", when:"a1_rank_copper" } ],
    npcs:[ { id:"tilly", x:15, y:10, dir:"left", look:{ shirt:"#d9a03c", hair:"#4a2c1a" }, talk:[ { when:"a1_rank_copper", text:"a1_tilly_copper" }, { text:"a1_tilly" } ] },
           { id:"hesk", x:9, y:8, dir:"down", look:{ shirt:"#7a6aa8", hair:"#d9d6cf" }, talk:"a1_hesk" } ],
    signs:[ { x:12, y:0, text:"a1_sign_ford_north", unless:"a1_rank_copper" },
            { x:0, y:6, text:"a1_sign_gate_locked", unless:"a1_licensed" },
            { x:21, y:5, text:"a1_sign_hall" } ],
    chests:[],
    scenes:[ { id:"homecoming", when:"scene_seraphine", text:"a1_homecoming", music:"homecoming", sets:"a1_done", end:"a1_end" } ]
  },
  hall_ford: {
    name:"Brindle Ford Branch Hall", music:"branch-hall", heal:A1_FORD_HEAL, lost:"a1_lost_ford",
    rows:[
      "WWWWWWWWWWWW",
      "W__________W",
      "W_tttttt___W",
      "W__________W",
      "W__________W",
      "W_t______t_W",
      "W__________W",
      "W__________W",
      "WWWWW>>WWWWW" ],
    warps:[ { x:5, y:8, to:"town", tx:20, ty:5, dir:"down" }, { x:6, y:8, to:"town", tx:20, ty:5, dir:"down" } ],
    npcs:[ { id:"mads", x:8, y:2, dir:"down", look:{ shirt:"#6b5a3a", hair:"#9a9a9a" },
             talk:[ { when:"a1_rank_copper", text:"a1_mads_road" },
                    { when:"a1_beat_gullet", text:"a1_mads_copper", sets:"a1_rank_copper" },
                    { when:"a1_licensed", text:"a1_mads_wait" },
                    { text:"a1_mads_licence", sets:"a1_licensed" } ] } ],
    signs:[ { x:10, y:1, text:[ { when:"a1_rank_copper", text:"a1_board_ford_copper" }, { text:"a1_board_ford" } ] } ],
    chests:[]
  },
  millrace: {
    name:"The Millrace", music:"brindle-ford", heal:A1_FORD_HEAL, lost:"a1_lost_ford",
    rows:[
      "################",
      "#~~~~~~~~~~~~~~#",
      "#~~~~~~~~~~~~~~#",
      "#..........=...#",
      "#.f........=...#",
      "#..........=...#",
      "#..f.......=...#",
      "#..........=..f#",
      "#..........=...#",
      "###########=####" ],
    warps:[ { x:11, y:9, to:"town", tx:1, ty:6, dir:"right" } ],
    npcs:[ { id:"gullet", x:11, y:2, dir:"down", sprite:"beast", look:{ shirt:"#3f6f6a", hair:"#9fd6c9" },
             talk:"a1_gullet", trainer:"a1_gullet", flag:"a1_beat_gullet", win:"a1_gullet_win", unless:"a1_beat_gullet" } ],
    signs:[], chests:[]
  },
  route1: {
    name:"Millrace Road", music:"hearthvale-roads", heal:A1_FORD_HEAL, lost:"a1_lost_ford",
    grass:[ { when:"a1_rank_iron", table:"route1_iron" }, { table:"route1_grass" } ],
    rows:[
      "##########=###########",
      "#.........=.,,,,,,,,.#",
      "#.........=.,,,,,,,,.#",
      "#..,,,,...=.,,,,,,,,.#",
      "#..,,,,...=..........#",
      "#..,,,,...======.....#",
      "#..............=.....#",
      "#..~~~~........=.....#",
      "#..~~~~........=======",
      "#..~~~~........=.....#",
      "#..............=,,,,.#",
      "#.,,,,.........=,,,,.#",
      "#.,,,,.........=,,,,.#",
      "#.,,,,...=======.....#",
      "#........=...........#",
      "#..f.....=.....f.....#",
      "#........=...........#",
      "#,,,,,,..=..,,,,,,,..#",
      "#,,,,,,..=..,,,,,,,..#",
      "#........=...........#",
      "#........=...........#",
      "#........=...........#",
      "#........=...........#",
      "#########=############" ],
    warps:[ { x:9, y:23, to:"town", tx:12, ty:1, dir:"down" },
            { x:21, y:8, to:"cross", tx:1, ty:7, dir:"right" },
            { x:10, y:0, to:"weir_gate", tx:7, ty:10, dir:"up", when:"a1_rank_iron" } ],
    npcs:[ { id:"brann", x:15, y:10, dir:"down", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, unless:"a1_orchard_taken",
             talk:"a1_brann", trainer:"a1_brann", flag:"a1_beat_brann", win:"a1_brann_win", after:"a1_brann_after" },
           { id:"dove", x:14, y:9, dir:"right", look:{ shirt:"#5b7fb0", hair:"#e0c27a" }, when:"a1_beat_brann", unless:"a1_orchard_taken",
             talk:[ { when:"scene_met_dove", text:"a1_dove_after" }, { text:"a1_dove", sets:"scene_met_dove" } ] } ],
    signs:[ { x:10, y:0, text:"a1_sign_vault_closed", unless:"a1_rank_iron" }, { x:10, y:21, text:"a1_sign_road" } ],
    chests:[ { id:"route1_chest", x:1, y:1, card:"water_tidecaller_shaman", text:"a1_chest_chained" } ]
  },
  cross: {
    name:"Hollin's Cross", music:"hollins-cross", heal:A1_CROSS_HEAL, lost:"a1_lost_cross",
    rows:[
      "########################",
      "#..RRRRR........RRRRR..#",
      "#..RRRRR........RRRRR..#",
      "#..HHHHH........HHHHH..#",
      "#......................#",
      "#...f.....======...f...#",
      "#.........=....=.......#",
      "===========....=========",
      "#.........=....=.......#",
      "#....~~...======.......#",
      "#....~~................#",
      "#......................#",
      "#..f................f..#",
      "########################" ],
    warps:[ { x:0, y:7, to:"route1", tx:20, ty:8, dir:"left" },
            { x:23, y:7, to:"orchard", tx:1, ty:7, dir:"right", when:"a1_orchard_taken" } ],
    npcs:[ { id:"jory", x:12, y:4, dir:"down", look:{ shirt:"#8a3d3d", hair:"#c9a36a" },
             talk:[ { when:"a1_rank_iron", text:"a1_jory_after" },
                    { when:"a1_beat_mother", text:["a1_jory_iron", "a1_pell_joins"], sets:"a1_rank_iron" },
                    { when:"a1_beat_pell", text:"a1_jory_orchard", sets:"a1_orchard_taken" },
                    { when:"scene_met_jory", text:"a1_jory_wait" },
                    { text:"a1_jory", sets:"scene_met_jory" } ] },
           { id:"pell", x:14, y:4, dir:"left", look:{ shirt:"#c0392b", hair:"#f1c40f" }, unless:"a1_rank_iron",
             talk:"a1_pell", trainer:"a1_pell", flag:"a1_beat_pell", win:"a1_pell_win", after:"a1_pell_after" },
           { id:"davor", x:8, y:10, dir:"right", look:{ shirt:"#7b1f1f", hair:"#2b2b2b" },
             talk:[ { when:"a1_beat_pell", text:"a1_davor_pell" }, { text:"a1_davor", stinger:"sting-pyrrhen" } ] },
           { id:"market1", x:3, y:6, dir:"right", look:{ shirt:"#b07a3a", hair:"#5a3a1e" }, talk:"a1_market_1" },
           { id:"market2", x:19, y:6, dir:"left", look:{ shirt:"#6a8a3a", hair:"#2a2a2a" }, talk:"a1_market_2" },
           { id:"market3", x:17, y:11, dir:"up", look:{ shirt:"#3a6a8a", hair:"#a05a2a" }, talk:"a1_market_3" } ],
    signs:[ { x:11, y:4, text:"a1_sign_broadsheet" },
            { x:23, y:7, text:"a1_sign_orchard_closed", unless:"a1_orchard_taken" } ],
    chests:[],
    scenes:[ { id:"cross_arrival", text:"a1_cross_arrival", stinger:"sting-exalted" } ]
  },
  orchard: {
    name:"Greyapple Orchard", music:"greyapple-orchard", grass:"orchard_grass", heal:A1_CROSS_HEAL, lost:"a1_lost_cross",
    rows:[
      "######################",
      "#.#..#..#..#..#..#...#",
      "#....,,,,......,,,,..#",
      "#.#..#,,#..#..#,,#...#",
      "#....,,,,......,,,,..#",
      "#.#..#..#..#..#..#...#",
      "#....................#",
      "=.........====.......#",
      "#.#..#....=..=..#....#",
      "#....,,,,.=..=.,,,,..#",
      "#.#..#,,#.====.#,,#..#",
      "#....,,,,......,,,,..#",
      "#.#..#..#..#..#..#...#",
      "#....................#",
      "######################" ],
    warps:[ { x:0, y:7, to:"cross", tx:22, ty:7, dir:"left" } ],
    npcs:[ { id:"pim", x:3, y:6, dir:"right", look:{ shirt:"#7a8a3a", hair:"#8a8a8a" }, talk:[ { when:"a1_beat_mother", text:"a1_pim_after" }, { text:"a1_pim" } ] },
           { id:"mother", x:11, y:9, dir:"up", sprite:"beast", look:{ shirt:"#c0461e", hair:"#ffb347" }, unless:"a1_beat_mother",
             talk:"a1_mother", trainer:"a1_mother", flag:"a1_beat_mother", win:"a1_mother_win" },
           { id:"brann_o", x:9, y:8, dir:"right", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, when:"a1_orchard_taken", talk:"a1_brann_after" },
           { id:"dove_o", x:14, y:8, dir:"left", look:{ shirt:"#5b7fb0", hair:"#e0c27a" }, when:"a1_orchard_taken", talk:"a1_dove_after" } ],
    signs:[], chests:[]
  },
  weir_gate: {
    name:"The Weir Vault", music:"weir-vault", heal:[8,8], lost:"a1_lost_vault",
    rows:[
      "################",
      "#..VVVVVVVVVV..#",
      "#..VVVVVDVVVV..#",
      "#..vvvvvvvvvv..#",
      "#.....vvvv.....#",
      "#......==......#",
      "#......==......#",
      "#..f...==...f..#",
      "#......==......#",
      "#......==......#",
      "#......==......#",
      "#######==#######" ],
    warps:[ { x:7, y:11, to:"route1", tx:10, ty:1, dir:"down" }, { x:8, y:11, to:"route1", tx:10, ty:1, dir:"down" },
            { x:8, y:2, to:"vault1", tx:9, ty:12, dir:"up" } ],
    npcs:[ { id:"hollow", x:8, y:3, dir:"down", look:{ shirt:"#7d7d7d", hair:"#5a5a5a" }, unless:"scene_gate_hollow", talk:"a1_gate_hollow" },
           { id:"seraphine", x:9, y:5, dir:"down", look:{ shirt:"#e8e2c8", hair:"#f4e7b0" }, when:"a1_slackwater", unless:"scene_seraphine", talk:"a1_seraphine" } ],
    signs:[ { x:10, y:3, text:"a1_sign_seal" } ],
    chests:[],
    scenes:[ { id:"gate_hollow", when:"a1_rank_iron", text:"a1_gate_hollow" },
             { id:"seraphine", when:"a1_slackwater", text:"a1_seraphine", music:"seraphine" } ]
  },
  vault1: {
    name:"Weir Vault: Sluice Halls", music:"weir-vault", grass:"vault_shallows", heal:A1_VAULT_HEAL, lost:"a1_lost_vault",
    rows:[
      "VVVVVVVVVSVVVVVVVV",
      "VvvvvvvvvvvvvvvvvV",
      "Vvwwwwvv~~vvwwwwvV",
      "VvwwwwvvvvvvwwwwvV",
      "VvvvvvvVVVVvvvvvvV",
      "VVVVvvvVVVVvvvVVVV",
      "Vvvvvvv~~~~vvvvvvV",
      "Vvwwwvv~~~~vvwwwvV",
      "VvwwwvvvvvvvvwwwvV",
      "VvvvvvvvvvvvvvvvvV",
      "VvvVVVVVvvVVVVVvvV",
      "VvvvvwwwvvwwwvvvvV",
      "VvvvvvvvvvvvvvvvvV",
      "VVVVVVVVVSVVVVVVVV" ],
    warps:[ { x:9, y:13, to:"weir_gate", tx:8, ty:3, dir:"down" }, { x:9, y:0, to:"vault2", tx:7, ty:8, dir:"up" } ],
    npcs:[],
    signs:[ { x:1, y:6, text:"a1_edda_1" }, { x:16, y:9, text:"a1_edda_2" }, { x:16, y:1, text:"a1_edda_3" } ],
    chests:[],
    scenes:[ { id:"vault_banter", at:[9,1], text:"a1_vault_banter" } ]
  },
  vault2: {
    name:"Weir Vault: Slack Pool", music:"weir-vault", heal:A1_VAULT_HEAL, lost:"a1_lost_vault",
    rows:[
      "VVVVVVVVVVVVVVVV",
      "V~~~~~~~~~~~~~~V",
      "V~~~~vvvvvv~~~~V",
      "V~~~~vvvvvv~~~~V",
      "VVVVVVVvVVVVVVVV",
      "VvvvvvvvvvvvvvvV",
      "VvvvvvvvvvvvvvvV",
      "VvvvvvvvvvvvvvvV",
      "VvvvvvvvvvvvvvvV",
      "VVVVVVVSVVVVVVVV" ],
    warps:[ { x:7, y:9, to:"vault1", tx:9, ty:1, dir:"down" } ],
    npcs:[ { id:"warden", x:7, y:4, dir:"down", sprite:"golem", look:{ shirt:"#7a7f86", hair:"#5aa0c8" }, unless:"a1_beat_warden",
             talk:"a1_warden", trainer:"a1_warden", flag:"a1_beat_warden", win:"a1_warden_win" } ],
    signs:[ { x:9, y:2, text:"a1_edda_last" } ],
    // Slackwater (TCG Design, PR #20); until that card is on main the chest falls back to an existing Water Manifest.
    chests:[ { id:"slackwater", x:7, y:2, card:["water_slackwater_the_weir_serpent", "kraken"], text:["a1_slackwater_bind", "a1_rebuild_hint"], sets:"a1_slackwater", stinger:"sting-slackwater" } ]
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
