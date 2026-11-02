/* ---- RPG maps (owner: Game Dev; place names and all words come from Story) ----
   A map is a grid of one-character tiles plus things placed on it.
   Tiles:  .  grass          ,  long grass               w  shallow water             =  path      f  flowers
           #  tree (solid)   ~  water (solid)             R  roof       H  house wall    D  door
           s  sign post      _  floor                     W  inside wall   t  table (solid)   >  doormat / exit
   Map fields:
     name, music (a track id from music/). Wild duels come only from monsters roaming the map (wilds, in rpg/regions.js).
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
  intro: "pro_intro", introMusic: "cold-open", pickPrompt: "pro_pick_deck", startText: null,
  firstRank: "Tin", ranks: [ { flag:"pro_rank_copper", name:"Copper" } ], rankStinger: "sting-rankup"
};
const RPG_START = { map:"house", x:4, y:5, dir:"up" };
// The Prologue demo (story/demo/prologue.md). Flags are Story's (pro_*); gd_* are Game Dev's helper flags for steps
// inside a contract; scene_<id> flags are set by scenes when they play.
const PRO_FORD_HEAL = { map:"house", x:4, y:4 };
const RPG_MAPS = {
  house: {
    name:"Calder Mill", parent:"hearthvale", music:"brindle-ford", heal:[4,4], lost:"pro_lost",
    rows:[
      "WWWWWWWWWW",
      "W________W",
      "W_tt___t_W",
      "W_tt_____W",
      "W________W",
      "W________W",
      "W________W",
      "WWWW>>WWWW" ],
    warps:[ { x:4, y:7, to:"hearthvale", tx:58, ty:50, dir:"down" }, { x:5, y:7, to:"hearthvale", tx:58, ty:50, dir:"down" } ],
    npcs:[ { id:"dad", x:6, y:3, dir:"down", look:{ shirt:"#4f8a6e", hair:"#2b1d14" },
             talk:[ { when:"pro_assess", unless:"pro_beat_gullet", text:"pro_dad_assessment" },
                    { when:"scene_evening", text:"pro_dad_evening" },
                    { text:"pro_dad_morning" } ] } ],
    signs:[ { x:8, y:1, text:"pro_sign_wheel" } ],
    chests:[],
    scenes:[ { id:"evening", when:"scene_pell_arrives", text:"pro_dad_evening", end:"pro_end", sets:"pro_done" } ]
  },
  hall_ford: {
    name:"Brindle Ford Branch Hall", parent:"hearthvale", music:"branch-hall", heal:PRO_FORD_HEAL, lost:"pro_lost",
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
    warps:[ { x:5, y:8, to:"hearthvale", tx:62, ty:54, dir:"down" }, { x:6, y:8, to:"hearthvale", tx:62, ty:54, dir:"down" } ],
    npcs:[ { id:"mads", x:8, y:2, dir:"down", look:{ shirt:"#6b5a3a", hair:"#9a9a9a" },
             talk:[ { when:"pro_rank_copper", text:"gd_mads_after" },
                    { when:"pro_assess", text:"gd_mads_wait" },
                    { when:"gd_orla_reply", text:["pro_report_4", "pro_mads_assessment"], sets:["pro_q4_done", "pro_assess"] },
                    { when:"gd_crew", text:"gd_mads_wait" },
                    { when:"pro_sprite_beaten", text:["pro_mads_report_2", "pro_brann_dove_arrive"], sets:["pro_q2_done", "gd_crew"] },
                    { when:"gd_well", text:"gd_mads_wait" },
                    { when:"pro_mice_beaten", text:["pro_mads_report_1", "pro_mads_well"], sets:["pro_q1_done", "gd_well"] },
                    { when:"pro_licensed", text:"pro_mads_hint_1" },
                    { text:"pro_mads_licence", sets:"pro_licensed" } ] } ],
    signs:[ { x:10, y:1, text:[ { when:"pro_assess", text:"pro_board_2", sets:"gd_board2" }, { text:"pro_board_1" } ] } ],
    chests:[],
    scenes:[
      { id:"hall_first" },
      { id:"report3", when:"pro_pack_done", unless:"pro_q3_done", text:["pro_report_3", "pro_mads_letters"], sets:["pro_q3_done", "gd_letters"] },
      { id:"ceremony", when:"pro_beat_gullet", text:"pro_ceremony", sets:"pro_rank_copper", stinger:"sting-rankup" },
    ]
  }
};

/* Placeholder words so the prototype runs. Story owns all of these: supply story/data/*.js that does
   Object.assign(RPG_TEXT, { key: ["line", "line", ...] }) and it overrides these at build time.
   A line may start with "Name: " to show a speaker. */
const RPG_TEXT = {
  gd_gate_south:    ["(placeholder) The south gate is barred. The fields are for licensed hunters on a contract."],
  gd_gate_east:     ["(placeholder) The east gate is shut. The Toll Road is no place for a Tin without a reason."],
  gd_gate_millrace: ["(placeholder) The mill's back gate is latched. Something big moves in the millrace."],
  gd_road_south:    ["(placeholder) South: the river road to Hollin's Cross. The road is out past the fen; not today."],
  gd_mads_wait:     ["Mads: (placeholder) The ledger can wait. Your contract can't."],
  gd_mads_after:    ["Mads: (placeholder) Copper suits you. Go and see the town; they came for you."],
  hv_sign_barrow: ["(placeholder) An old barrow mouth, half buried in the hill. Cold air breathes out of it."],
  lost:        ["(placeholder) You were defeated and made your way back to safety."],
  chest_empty: ["The chest is empty."]
};
