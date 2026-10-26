/* ---------------- RPG layer: regions and dungeons (owner: Game Dev; geography, names and words from Story) ----------------
   Large outdoor regions and generated dungeons; formats at the top of rpg/worldgen.js. Built into RPG_MAPS by
   rpgBuildWorld() when the game loads. Names marked "(working name)" are placeholders for Story. */

// A building for a stamp: two rows of roof, then wall with an optional door at `door` (offset from the left).
function rpgHouse(x, y, w, door){ return { at:[x, y], rows:[ "R".repeat(w), "R".repeat(w), [...Array(w)].map((_,i)=> i===door ? "D" : "H").join("") ] }; }
const RPG_FORD_HOUSES = [
  [55,47,6,3],                                         // Calder Mill, on the millrace at the north wall
  [59,51,7,3],                                         // the Covenant branch hall
  [54,58,4,1], [59,58,5,2], [54,62,4,2], [59,62,5,1], [66,47,3,1],
  [77,47,5,2], [83,47,6,3], [89,47,2,0],
  [77,58,4,1], [82,58,3,1], [77,62,4,2], [82,62,3,1],
  [54,52,4,1], [87,51,4,1],
];

const RPG_REGIONS = {
  /* The Hearthvale, north end (story/demo/prologue.md, story/regions/hearthvale.md): Brindle Ford, the last walled
     town before wild country, on the River Brindle. North: the Millrace Road, the Old Weir, the Brindle Hills.
     East: the Toll Road over Brennock Heath to Ketter's Crossing on the River Ash. South: the fields, Pruett's Farm
     and the Lowfen marshes. West: Sallow Wood behind the Waymark Stone. */
  hearthvale: {
    name:"The Hearthvale", w:160, h:110, seed:2025, biome:"vale",
    zones:[
      { rect:[2,2,42,107], biome:"sallow", edge:3 },        // Sallow Wood, the whole west side
      { rect:[44,2,100,20], biome:"hills", edge:3 },        // the Brindle Hills
      { rect:[44,21,92,44], biome:"forest", edge:2 },       // along the Millrace Road
      { rect:[94,20,135,95], biome:"moor", edge:3 },        // Brennock Heath
      { rect:[44,68,92,88], biome:"farm", edge:1 },         // strip fields south of the walls
      { rect:[44,95,135,107], biome:"fen", edge:3 },        // the Lowfen
      { rect:[136,2,157,107], biome:"vale", edge:1 },       // the River Ash country
    ],
    rivers:[
      { pts:[[72,2],[71,14],[70,28],[72,40],[70,50],[70,60],[72,72],[74,86],[72,98],[73,107]], width:3 },   // the Brindle
      { pts:[[147,2],[145,28],[147,54],[146,80],[147,107]], width:3 },                                        // the Ash
      { pts:[[69,41],[60,41],[54,41]], width:1 },                                                              // the millrace
    ],
    clear:[ [53,47,91,65], [53,39,60,44], [54,86,72,95], [134,48,144,64], [27,60,33,66], [106,40,118,48] ],
    walls:[
      { pts:[[52,46],[92,46]], width:1, tile:"X" },          // the Ford's palisade
      { pts:[[52,66],[92,66]], width:1, tile:"X" },
      { pts:[[52,46],[52,66]], width:1, tile:"X" },
      { pts:[[92,46],[92,66]], width:1, tile:"X" },
      { pts:[[52,38],[61,38]], width:1, tile:"|" },          // the millrace's hedge, reached by the mill's back gate
      { pts:[[52,38],[52,45]], width:1, tile:"|" },
      { pts:[[61,38],[61,45]], width:1, tile:"|" },
      { pts:[[43,2],[43,107]], width:1, tile:"P" },          // the edge of Sallow Wood: one way in, at the Waymark Stone
      { pts:[[44,46],[51,46]], width:1, tile:"P" },          // the wood closes in on the palisade's west side
      // Brennock Scarp: the heath sits above the valley, reached only by the Toll Road from the east gate.
      { pts:[[93,46],[93,22],[101,22],[101,2]], width:2, tile:"^" },
      { pts:[[93,66],[93,94],[146,94]], width:2, tile:"^" },
    ],
    roads:[
      { pts:[[53,56],[92,56],[110,52],[125,57],[139,56],[147,56],[157,56]] },   // the main street, the east gate, the Toll Road to the Ash bridge
      { pts:[[62,56],[62,45],[63,36],[61,26],[63,16],[60,8],[58,3]] }, // north gate, the Millrace Road, up into the hills
      { pts:[[64,56],[64,67],[64,80],[61,90]] },                        // south gate to the fields and Pruett's Farm
      { pts:[[61,90],[66,100],[68,107]] },                              // the river road south (Act I)
      { pts:[[54,50],[54,45],[56,42]], tile:"." },                      // the mill's back gate to the millrace
      { pts:[[64,76],[41,76],[30,63]], tile:"." },                      // the field path to the Waymark Stone and on into the wood
      { pts:[[63,16],[66,13]], tile:"." },                              // the overgrown turn-off to the Old Weir
      { pts:[[61,18],[50,14],[46,10]], tile:"." },                      // a sheep track to the hill barrow
      { pts:[[110,52],[112,44]], tile:"." },                            // to the standing stones
      { pts:[[63,30],[76,27],[84,16],[90,8]], tile:"." },               // a drovers' ford over the Brindle into the high hills
      { pts:[[150,56],[152,40],[152,20]], tile:"." },                   // a track up the far bank of the Ash
      { pts:[[68,95],[84,101]], tile:"." },                             // a causeway into the fen
    ],
    stamps:[
      ...RPG_FORD_HOUSES.map(h => rpgHouse(...h)),
      { at:[70,47], rows:[...Array(19)].map((_,i)=> i>=8 && i<=10 ? "bbb" : "~~~") },     // the Brindle through the town, and the ford bridge
      { at:[53,41], rows:["~~~b~~~~"] },                                                    // the millrace, with a plank across
      { at:[78,50], rows:["++++++++","+......+","+..f...+","++++++++"] },      // the market square
      { at:[66,12], rows:["^^^^^^^^^^^^"] },                                               // the Old Weir across the river
      { at:[64,10], rows:["VVV","VVV"] },                                                  // the Weir Vault's sealed door
      { at:[55,23], rows:["RRRR","RRRR","HDHH"] },                                          // the carters' hut
      { at:[45,8], rows:["^^^","^D^"] },                                                    // the hill barrow (working name)
      { at:[108,42], rows:[".I...I.","I.....I",".......","I.....I",".I...I."] },          // the standing stones
      { at:[57,88], rows:["RRRRR","RRRRR","HHDHH"] },                                       // Pruett's Farm
      { at:[66,90], rows:["U"] },                                                           // the well
      { at:[136,49], rows:["RRRRRR","RRRRRR","HHDHHH"] },                                   // the toll-house at Ketter's Crossing
      { at:[134,58], rows:["n.n.n",".....","n.n.n"] },                                      // the Pyrrhen relief column's tents
      { at:[28,61], rows:["^.^.^",".....","^...^","..o.."] },                               // ruins in Sallow Wood (working)
    ],
    seeds:[ [46,10], [30,63], [56,42] ],
    areas:[
      { rect:[52,46,92,66], name:"Brindle Ford", music:"brindle-ford", safe:true, label:true },
      { rect:[52,38,61,45], name:"The Millrace", music:"brindle-ford", label:true },
      { rect:[44,21,92,45], name:"The Millrace Road", music:"hearthvale-roads", label:true },
      { rect:[44,2,100,20], name:"The Brindle Hills", music:"hearthvale-roads", label:true },
      { rect:[54,86,72,96], name:"Pruett's Farm", music:"brindle-ford", label:true },
      { rect:[44,67,93,94], name:"The Ford fields", music:"brindle-ford" },
      { rect:[133,44,152,68], name:"Ketter's Crossing", music:"hollins-cross", safe:true, label:true },
      { rect:[93,20,135,94], name:"Brennock Heath", music:"hearthvale-roads", label:true },
      { rect:[2,2,43,107], name:"Sallow Wood", music:"hearthvale-roads", label:true },
      { rect:[44,95,135,107], name:"The Lowfen", music:"hearthvale-roads", label:true },
      { rect:[136,2,157,107], name:"The River Ash", music:"hearthvale-roads" },
    ],
    heal:{ map:"house", x:4, y:4 }, lost:"pro_lost",
    // Roaming monsters by biome and rank (design/world.md): Tin near the walls and on the roads, Copper off-road and
    // in the wilder country, higher in the deep wood and the hills.
    wilds:[
      { area:[44,67,93,94], roster:"fields", rank:"tin", count:9, elites:0.08 },
      { area:[44,21,92,45], roster:"forest", rank:"tin", count:8 },
      { area:[53,39,60,44], roster:"fen", rank:"tin", count:2, elites:0 },
      { area:[44,2,100,20], roster:"hills", rank:"copper", count:8 },
      { area:[94,20,135,94], roster:"moor", rank:"tin", count:14, elites:0.35 },
      { area:[44,95,135,107], roster:"fen", rank:"copper", count:10 },
      { area:[2,2,42,107], roster:"forest", rank:"copper", count:16 },
      { area:[136,2,157,107], roster:"fields", rank:"copper", count:5 },
    ],
    warps:[
      { x:58, y:49, to:"house", tx:4, ty:6, dir:"up" },
      { x:62, y:53, to:"hall_ford", tx:5, ty:7, dir:"up" },
      { x:46, y:9, to:"barrow1", dir:"down" },
    ],
    npcs:[
      // Brindle Ford
      { id:"tilly", x:81, y:54, dir:"left", look:{ shirt:"#d9a03c", hair:"#4a2c1a" }, talk:[ { when:"pro_rank_copper", text:"pro_tilly_after" }, { text:"pro_tilly_morning" } ] },
      { id:"hesk", x:88, y:57, dir:"down", look:{ shirt:"#7a6aa8", hair:"#d9d6cf" },
        talk:[ { when:"pro_licensed", unless:"gd_hesk_asked", text:"pro_hesk_mice", sets:"gd_hesk_asked" }, { text:"pro_hesk_morning" } ] },
      { id:"mice", x:89, y:61, dir:"left", sprite:"blob", look:{ shirt:"#e0663a", hair:"#ffd27a" }, when:"gd_hesk_asked", unless:"pro_mice_beaten",
        talk:"pro_mice", trainer:"pro_mice", flag:"pro_mice_beaten", win:"pro_mice_win" },
      { id:"thatch", x:57, y:56, dir:"down", sprite:"bird", look:{ shirt:"#e0663a", hair:"#ffd27a" }, when:"pro_assess", unless:"gd_thatch",
        talk:"pro_thatch", trainer:"pro_thatch", flag:"gd_thatch", win:"pro_thatch_win" },
      { id:"brann_witness", x:55, y:50, dir:"up", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, when:"pro_assess", unless:"pro_beat_gullet",
        talk:"pro_brann_witness", sets:"gd_witness" },
      { id:"brann_idle", x:80, y:57, dir:"down", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, when:"pro_q3_done", unless:["pro_assess"], talk:"pro_brann_idle" },
      { id:"dove_idle", x:82, y:56, dir:"left", look:{ shirt:"#5b7fb0", hair:"#e0c27a" }, when:"pro_q3_done", talk:"pro_dove_idle" },
      { id:"pell", x:67, y:61, dir:"left", look:{ shirt:"#c0392b", hair:"#f1c40f" }, when:"pro_rank_copper", talk:"pro_pell_arrives" },
      // The Millrace (the assessment)
      { id:"gullet", x:57, y:40, dir:"down", sprite:"beast", look:{ shirt:"#3f6f6a", hair:"#9fd6c9" }, when:"gd_witness", unless:"pro_beat_gullet",
        talk:"pro_gullet", trainer:"a1_gullet", flag:"pro_beat_gullet", win:"pro_gullet_win",
        barks:{ crown:"pro_gullet_crown", breaks:["pro_gullet_break1"] } },
      // The Millrace Road (the tail)
      { id:"brann_gate", x:63, y:44, dir:"down", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, when:"gd_crew", unless:"gd_briefed", talk:"pro_dove_brief", sets:"gd_briefed" },
      { id:"dove_gate", x:63, y:45, dir:"down", look:{ shirt:"#5b7fb0", hair:"#e0c27a" }, when:"gd_crew", unless:"gd_briefed", talk:"pro_dove_brief", sets:"gd_briefed" },
      { id:"hound1", x:65, y:36, dir:"left", sprite:"beast", look:{ shirt:"#5fc7a9", hair:"#e8fff6" }, when:"gd_briefed", unless:"gd_hound1",
        talk:"pro_hound_1", trainer:"pro_hound", flag:"gd_hound1", win:"pro_hound_win" },
      { id:"hound2", x:59, y:31, dir:"right", sprite:"beast", look:{ shirt:"#5fc7a9", hair:"#e8fff6" }, when:"gd_briefed", unless:"gd_hound2",
        talk:"pro_hound_2", trainer:"pro_hound", flag:"gd_hound2", win:"pro_hound_win" },
      { id:"brann_hut", x:57, y:27, dir:"right", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, when:"gd_briefed", unless:"pro_pack_done", talk:"pro_dove_brief" },
      { id:"dove_hut", x:59, y:27, dir:"left", look:{ shirt:"#5b7fb0", hair:"#e0c27a" }, when:"gd_briefed", unless:"pro_pack_done", talk:"pro_dove_brief" },
      { id:"straggler", x:62, y:23, dir:"down", sprite:"beast", look:{ shirt:"#3f9f86", hair:"#e8fff6" }, when:"scene_pack_leader", unless:"pro_pack_done",
        talk:"pro_straggler", trainer:"pro_straggler", flag:"pro_pack_done", win:"pro_straggler_win" },
      // Pruett's Farm
      { id:"nan", x:59, y:92, dir:"down", look:{ shirt:"#8a6a9a", hair:"#e8e2d8" }, talk:[ { when:"pro_sprite_beaten", text:"pro_nan_after" }, { text:"pro_nan" } ] },
      { id:"abel", x:62, y:93, dir:"left", look:{ shirt:"#5a8a5a", hair:"#c08a3a" }, talk:"pro_abel" },
      { id:"sprite", x:66, y:91, dir:"up", sprite:"blob", look:{ shirt:"#3f8fd6", hair:"#d8f2ff" }, when:"gd_well", unless:"pro_sprite_beaten",
        talk:"pro_sprite", trainer:"pro_sprite", flag:"pro_sprite_beaten", win:"pro_sprite_win" },
      { id:"ewe", x:47, y:74, dir:"right", sprite:"beast", look:{ shirt:"#d8d0c0", hair:"#3a3a3a" }, when:"pro_assess", unless:"gd_ewe",
        talk:"pro_ewe", trainer:"pro_ewe", flag:"gd_ewe", win:"pro_ewe_win" },
      // Ketter's Crossing
      { id:"orla", x:139, y:53, dir:"down", look:{ shirt:"#3a5a7a", hair:"#6a4a2a" }, talk:[ { when:"gd_letters", unless:"gd_orla_reply", text:"pro_orla", sets:"gd_orla_reply" }, { text:"pro_orla" } ] },
      { id:"davor", x:137, y:61, dir:"right", look:{ shirt:"#7b1f1f", hair:"#2b2b2b" }, talk:{ text:"pro_davor", stinger:"sting-pyrrhen" } },
      { id:"soldier", x:144, y:57, dir:"right", look:{ shirt:"#9b2f2f", hair:"#2b2b2b" }, still:true, talk:"pro_soldier" },
    ],
    signs:[
      { x:62, y:46, text:"pro_sign_north_closed", unless:"gd_crew" },
      { x:64, y:66, text:"gd_gate_south", unless:"gd_well" },
      { x:92, y:56, text:"gd_gate_east", unless:"gd_letters" },
      { x:54, y:46, text:"gd_gate_millrace", unless:"gd_witness" },
      { x:43, y:76, text:"pro_sign_waymark", unless:"pro_rank_copper" },
      { x:45, y:77, text:"pro_sign_waymark" },
      { x:63, y:54, text:"pro_sign_hall" },
      { x:66, y:14, text:"pro_sign_vault" },
      { x:98, y:55, text:"pro_sign_heath" },
      { x:68, y:106, text:"gd_road_south" },
      { x:47, y:11, text:"hv_sign_barrow" },
    ],
    chests:[
      { id:"pro_chained", x:66, y:29, card:"water_tidecaller_shaman", text:"pro_chest_chained" },
      { id:"mc_hills1", x:86, y:9, minor:{ roster:"hills", rank:"copper" } },
      { id:"mc_heath1", x:111, y:44, minor:{ roster:"moor", rank:"tin" } },
      { id:"mc_heath2", x:124, y:84, minor:{ roster:"moor", rank:"copper" } },
      { id:"mc_fen1", x:84, y:102, minor:{ roster:"fen", rank:"copper" } },
      { id:"mc_sallow1", x:30, y:62, minor:{ roster:"forest", rank:"copper", seedEl:"lightning" } },
      { id:"mc_fields1", x:88, y:84, minor:{ roster:"fields", rank:"tin" } },
      { id:"mc_ash1", x:152, y:20, minor:{ roster:"fields", rank:"copper" } },
    ],
    scenes:[
      { id:"pruett", area:[54,86,72,96], when:"gd_well" },
      { id:"pack_leader", area:[53,21,67,29], when:"gd_briefed", text:"pro_pack_leader" },
      { id:"skiff", area:[112,50,118,60], when:"gd_letters", text:"pro_skiff", stinger:"sting-exalted" },
      { id:"crossing", area:[133,44,152,68], when:"gd_letters" },
      { id:"pell_arrives", area:[64,57,69,63], when:"pro_rank_copper", text:"pro_pell_arrives" },
      { id:"met_barrow", area:[44,8,50,13], text:"hv_sign_barrow" },
    ],
  },
};

/* Dungeons. Floors join stairs to stairs: a floor's first stairs lead back up, its last stairs lead on down. */
const RPG_DUNGEONS = {
  barrow1: { name:"The Hill Barrow (working name)", w:40, h:28, seed:4242, rooms:8, wall:"^", floor:"a", music:"weir-vault",
    heal:{ map:"house", x:4, y:4 }, lost:"pro_lost", parent:"hearthvale",
    up:{ map:"hearthvale", x:46, y:9 }, down:"barrow2",
    wilds:[ { roster:"hills", rank:"copper", count:6, elites:0.2 } ],
    chests:[ { id:"barrow_c1", room:3, minor:{ roster:"hills", rank:"iron" } } ] },
  barrow2: { name:"The Hill Barrow, lower (working name)", w:36, h:26, seed:5151, rooms:7, wall:"^", floor:"a", exit:false, music:"weir-vault",
    heal:{ map:"house", x:4, y:4 }, lost:"pro_lost", parent:"hearthvale",
    up:"barrow1",
    wilds:[ { roster:"hills", rank:"iron", count:6, elites:0.1 } ],
    chests:[ { id:"barrow_c2", room:-1, minor:{ roster:"hills", rank:"iron" }, sets:"barrow_c2_found" }, { id:"barrow_c3", room:4, minor:{ roster:"hills", rank:"iron", seedEl:"fire" } } ] },
};

/* Build every region and dungeon into RPG_MAPS, then join stairs and doors, and point quest steps at chests. */
function rpgBuildWorld(){
  if (rpgBuildWorld.done) return; rpgBuildWorld.done = true;
  for (const [id, spec] of Object.entries(RPG_REGIONS)) RPG_MAPS[id] = rpgGenRegion(id, spec);
  for (const [id, spec] of Object.entries(RPG_DUNGEONS)) RPG_MAPS[id] = rpgGenDungeon(id, spec);
  for (const [id, spec] of Object.entries(RPG_DUNGEONS)){
    const d = RPG_MAPS[id]; d.warps = d.warps || [];
    if (spec.up){
      if (typeof spec.up === "string"){ const a = RPG_MAPS[spec.up]; d.warps.push({ x:d.entryAt.x, y:d.entryAt.y, to:spec.up, tx:a.exitLand.x, ty:a.exitLand.y, dir:"down" }); }
      else { const r = RPG_MAPS[spec.up.map]; d.warps.push({ x:d.entryAt.x, y:d.entryAt.y, to:spec.up.map, tx:spec.up.x, ty:spec.up.y + 1, dir:"down" });
        const door = (r.warps || []).find(w => w.to === id); if (door){ door.tx = d.entry.x; door.ty = d.entry.y; door.dir = "down"; } }
    }
    if (spec.down){ const b = RPG_MAPS[spec.down];
      if (b.generated && b.entry) d.warps.push({ x:d.exitAt.x, y:d.exitAt.y, to:spec.down, tx:b.entry.x, ty:b.entry.y, dir:"down" });
      else { const back = (b.warps || []).find(w => w.to === id); d.warps.push({ x:d.exitAt.x, y:d.exitAt.y, to:spec.down, tx:b.start ? b.start.x : 7, ty:b.start ? b.start.y : 8, dir:"up" }); if (back){ back.tx = d.exitLand.x; back.ty = d.exitLand.y; } }
    }
  }
  for (const q of typeof RPG_QUESTS === "undefined" ? [] : RPG_QUESTS) for (const st of q.steps) if (st.at && st.at.chest){
    for (const [mid, m] of Object.entries(RPG_MAPS)){ const c = (m.chests || []).find(c => c.id === st.at.chest); if (c){ st.at = { map:mid, x:c.x, y:c.y }; break; } } }
}
