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
const A1_FORD_HEAL = { map:"house", x:4, y:4 }, A1_VAULT_HEAL = { map:"hearthvale", x:44, y:25 };
const RPG_MAPS = {
  house: {
    name:"Calder Mill", parent:"hearthvale", music:"brindle-ford", heal:[4,4], lost:"a1_lost_ford",
    rows:[
      "WWWWWWWWWW",
      "W________W",
      "W_tt___t_W",
      "W_tt_____W",
      "W________W",
      "W________W",
      "W________W",
      "WWWW>>WWWW" ],
    warps:[ { x:4, y:7, to:"hearthvale", tx:35, ty:70, dir:"down" }, { x:5, y:7, to:"hearthvale", tx:35, ty:70, dir:"down" } ],
    npcs:[ { id:"dad", x:6, y:3, dir:"down", look:{ shirt:"#4f8a6e", hair:"#2b1d14" },
             talk:[ { when:"a1_beat_gullet", text:"a1_dad_wheel" }, { when:"a1_licensed", text:"a1_dad_after" }, { text:"a1_dad" } ] } ],
    signs:[ { x:8, y:1, text:"a1_sign_wheel" } ],
    chests:[]
  },
  hall_ford: {
    name:"Brindle Ford Branch Hall", parent:"hearthvale", music:"branch-hall", heal:A1_FORD_HEAL, lost:"a1_lost_ford",
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
    warps:[ { x:5, y:8, to:"hearthvale", tx:45, ty:70, dir:"down" }, { x:6, y:8, to:"hearthvale", tx:45, ty:70, dir:"down" } ],
    npcs:[ { id:"mads", x:8, y:2, dir:"down", look:{ shirt:"#6b5a3a", hair:"#9a9a9a" },
             talk:[ { when:"a1_rank_copper", text:"a1_mads_road" },
                    { when:"a1_beat_gullet", text:"a1_mads_copper", sets:"a1_rank_copper" },
                    { when:"a1_licensed", text:"a1_mads_wait" },
                    { text:"a1_mads_licence", sets:"a1_licensed" } ] } ],
    signs:[ { x:10, y:1, text:[ { when:"a1_rank_copper", text:"a1_board_ford_copper" }, { text:"a1_board_ford" } ] } ],
    chests:[]
  },
  vault2: {
    name:"Weir Vault: Slack Pool", parent:"hearthvale", music:"weir-vault", heal:A1_VAULT_HEAL, lost:"a1_lost_vault",
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
    warps:[ { x:7, y:9, to:"vault1b", tx:9, ty:1, dir:"down" } ],
    npcs:[ { id:"warden", x:7, y:4, dir:"down", sprite:"golem", look:{ shirt:"#7a7f86", hair:"#5aa0c8" }, unless:"a1_beat_warden",
             talk:"a1_warden", trainer:"a1_warden", flag:"a1_beat_warden", win:"a1_warden_win",
             barks:{ crown:"a1_warden_crown", breaks:["a1_warden_break1", "a1_warden_break2"], held:"a1_warden_brood_held" } } ],
    signs:[ { x:9, y:2, text:"a1_edda_last" } ],
    chests:[ { id:"slackwater", x:7, y:2, card:"water_slackwater_the_weir_serpent", text:["a1_slackwater_bind", "a1_rebuild_hint"], sets:"a1_slackwater", stinger:"sting-slackwater" } ]
  }
};

/* Placeholder words so the prototype runs. Story owns all of these: supply story/data/*.js that does
   Object.assign(RPG_TEXT, { key: ["line", "line", ...] }) and it overrides these at build time.
   A line may start with "Name: " to show a speaker. */
const RPG_TEXT = {
  hv_sign_west:   ["(placeholder) West: the League rivers and Saltmere. The road is long and the river is rising."],
  hv_sign_east:   ["(placeholder) East: the hill roads. Nothing but crags and wild country for a week's walk."],
  hv_sign_barrow: ["(placeholder) An old barrow mouth, half buried in the hill. Cold air breathes out of it."],
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
