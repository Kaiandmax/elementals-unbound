/* ---------------- RPG layer: quests (owner: Game Dev; titles and objective lines are Story's) ----------------
   A quest shows in the journal once its `start` flag is set (or always, without one). Its current step is the first
   step whose `done` flag isn't set; `at` is where the pointer and the map marker lead ({ map, x, y }, or { chest:id }).
   kind: "main" | "contract" | "side". Titles and objectives are from story/demo/prologue.md; Story can edit them here.
   gd_* flags are Game Dev's helper flags for the steps inside a contract. */
const PRO_MADS = { map:"hall_ford", x:8, y:3 };
const RPG_QUESTS = [
  { id:"pro_licence", kind:"main", title:"Licence Day", steps:[
    { done:"scene_hall_first", text:"Go to the branch hall.", at:{ map:"hearthvale", x:62, y:54 } },
    { done:"pro_licensed",     text:"Speak with Mads.", at:PRO_MADS },
  ] },
  { id:"pro_q1", kind:"contract", title:"Ember Mice (Tin)", start:"pro_licensed", steps:[
    { done:"gd_hesk_asked",   text:"Find Hesk's woodpile by the east gate.", at:{ map:"hearthvale", x:88, y:58 } },
    { done:"pro_mice_beaten", text:"Drive out the ember mice.", at:{ map:"hearthvale", x:89, y:61 } },
    { done:"pro_q1_done",     text:"Report to the hall ledger.", at:PRO_MADS },
  ] },
  { id:"pro_q2", kind:"contract", title:"The Pruett Well (Tin)", start:"gd_well", steps:[
    { done:"scene_pruett",      text:"Go south to Pruett's Farm.", at:{ map:"hearthvale", x:59, y:91 } },
    { done:"pro_sprite_beaten", text:"Find what is fouling the well.", at:{ map:"hearthvale", x:66, y:91 } },
    { done:"pro_q2_done",       text:"Report to the hall ledger.", at:PRO_MADS },
  ] },
  { id:"pro_q3", kind:"contract", title:"Tail on a Copper Hunt (Tin, crew)", start:"gd_crew", steps:[
    { done:"gd_briefed",        text:"Meet Brann and Dove at the north gate.", at:{ map:"hearthvale", x:62, y:44 } },
    { done:"scene_pack_leader", text:"Follow them up the Millrace Road.", at:{ map:"hearthvale", x:58, y:27 } },
    { done:"pro_pack_done",     text:"Keep the stragglers off them.", at:{ map:"hearthvale", x:62, y:23 } },
    { done:"pro_q3_done",       text:"Report to the hall ledger.", at:{ map:"hall_ford", x:5, y:7 } },
  ] },
  { id:"pro_q4", kind:"contract", title:"Letters for Ketter's Crossing (Tin)", start:"gd_letters", steps:[
    { done:"scene_crossing", text:"Take the hall's letters east across Brennock Heath.", at:{ map:"hearthvale", x:136, y:56 } },
    { done:"gd_orla_reply",  text:"Deliver them to the toll-keeper, Orla Ketter.", at:{ map:"hearthvale", x:139, y:53 } },
    { done:"pro_q4_done",    text:"Bring back her reply.", at:PRO_MADS },
  ] },
  { id:"pro_q5", kind:"main", title:"Assessment: The Calder Millrace (Copper)", start:"pro_assess", steps:[
    { done:"gd_board2",       text:"Prepare your deck.", at:{ map:"hall_ford", x:10, y:2 } },
    { done:"gd_witness",      text:"Meet your witness at the mill.", at:{ map:"hearthvale", x:55, y:50 } },
    { done:"pro_beat_gullet", text:"Bind the wild in the millrace.", at:{ map:"hearthvale", x:57, y:40 } },
    { done:"pro_rank_copper", text:"Return to the hall for the vote.", at:{ map:"hall_ford", x:5, y:7 } },
  ] },
  { id:"pro_thatch", kind:"side", title:"Sparks in the Thatch (Tin)", start:"gd_board2", steps:[
    { done:"gd_thatch", text:"An ember wild is on the roofs of Mill Lane.", at:{ map:"hearthvale", x:57, y:56 } },
  ] },
  { id:"pro_ewe", kind:"side", title:"Pruett's Lost Ewe (Tin)", start:"gd_board2", steps:[
    { done:"gd_ewe", text:"Find the ewe at the Sallow Wood edge, inside the Waymark Stone.", at:{ map:"hearthvale", x:47, y:74 } },
  ] },
  { id:"pro_evening", kind:"main", title:"Copper", start:"pro_rank_copper", steps:[
    { done:"scene_pell_arrives", text:"Walk down to the river landing.", at:{ map:"hearthvale", x:66, y:60 } },
    { done:"pro_done",           text:"Go home to the mill.", at:{ map:"house", x:4, y:5 } },
  ] },
  { id:"hv_barrow", kind:"side", title:"The Old Barrow (working name)", start:"scene_met_barrow", steps:[
    { done:"barrow_c2_found", text:"Something cold breathes out of the barrow in the hills. Find the bottom of it.", at:{ chest:"barrow_c2" } },
  ] },
];
