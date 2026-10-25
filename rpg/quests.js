/* ---------------- RPG layer: quests (owner: Game Dev; titles and objective lines are Story's to rewrite) ----------------
   A quest shows in the journal once its `start` flag is set (or always, without one). Its current step is the first
   step whose `done` flag isn't set; `at` is where the pointer and the map marker lead. Text marked here is working
   text from Game Dev: Story can replace any title or line in place. */
const RPG_QUESTS = [
  { id:"a1_main", kind:"main", title:"Act I: Notice Boards", steps:[
    { done:"a1_licensed",      text:"Get your hunter's licence from Mads at the Brindle Ford branch hall.", at:{ map:"hearthvale", x:45, y:70 } },
    { done:"a1_beat_gullet",   text:"Your first contract: drive the wild out of the Calder millrace, behind the mill.", at:{ map:"hearthvale", x:18, y:62 } },
    { done:"a1_rank_copper",   text:"Report back to Mads at the branch hall.", at:{ map:"hearthvale", x:45, y:70 } },
    { done:"a1_beat_brann",    text:"Take the Millrace Road north through Hollinwood.", at:{ map:"hearthvale", x:40, y:38 } },
    { done:"scene_cross_arrival", text:"Follow the road east over the river to Hollin's Cross.", at:{ map:"hearthvale", x:104, y:17 } },
    { done:"a1_beat_pell",     text:"There's a loudmouth by the Hollin's Cross notice board. See what he's made of.", at:{ map:"hearthvale", x:121, y:22 } },
    { done:"a1_orchard_taken", text:"Talk to Jory Fenn, the hall master, at the notice board.", at:{ map:"hearthvale", x:117, y:21 } },
    { done:"a1_beat_mother",   text:"Greyapple Orchard: find what's scorching the trees, at the heart of the orchard.", at:{ map:"hearthvale", x:127, y:75 } },
    { done:"a1_rank_iron",     text:"Report to Jory at Hollin's Cross.", at:{ map:"hearthvale", x:117, y:21 } },
    { done:"scene_gate_hollow", text:"The Weir Vault's seal is broken. Go north up the Millrace Road to the crags.", at:{ map:"hearthvale", x:40, y:6 } },
    { done:"a1_slackwater",    text:"Go down through the Weir Vault and find what Edda Calder sealed there.", at:{ map:"vault2", x:7, y:2 } },
    { done:"a1_done",          text:"Go home to Brindle Ford.", at:{ map:"hearthvale", x:40, y:72 } },
  ] },
  { id:"hv_barrow", kind:"side", title:"The Old Barrow (working name)", start:"scene_met_barrow", steps:[
    { done:"barrow_c2_found", text:"Something cold breathes out of the barrow in the eastern wilds. Find the bottom of it.", at:{ chest:"barrow_c2" } },
  ] },
];
