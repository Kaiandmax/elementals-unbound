/* ---------------- RPG layer: regions and dungeons (owner: Game Dev; names, places and words from Story) ----------------
   Large outdoor regions and generated dungeons; formats at the top of rpg/worldgen.js. Built into RPG_MAPS by
   rpgBuildWorld() when the game loads. Place names marked "(working name)" are placeholders for Story. */

const RPG_REGIONS = {
  /* The Hearthvale (story/regions/hearthvale.md): river farmland and market towns hemmed in by wild country.
     Act I runs through it: the Ford's valley (Tin), Hollinwood and the Millrace Road (Copper), Hollin's Cross,
     Greyapple Orchard, and the Weir Vault in the crags upriver (Iron). */
  hearthvale: {
    name:"The Hearthvale", w:150, h:104, seed:1207, biome:"vale",
    zones:[
      { rect:[2,23,52,52], biome:"deepwood", edge:3 },      // Hollinwood, either side of the Millrace Road
      { rect:[56,23,99,52], biome:"forest", edge:3 },       // the eastern wilds
      { rect:[70,30,98,50], biome:"hills", edge:2 },
      { rect:[2,2,53,20], biome:"hills", edge:2 },          // the crags above the weir
      { rect:[100,2,147,45], biome:"hills", edge:2 },       // the hills round Hollin's Cross
      { rect:[13,59,29,65], biome:"marsh", edge:1 },        // the millrace
      { rect:[64,60,98,98], biome:"farm", edge:2 },         // Calder fields east of the river
      { rect:[104,48,147,101], biome:"orchard", edge:1 },   // Greyapple Orchard
      { rect:[116,62,140,88], biome:"burnt", edge:3 },      // the scorched heart of the orchard
    ],
    rivers:[
      { pts:[[56,2],[57,10],[54,20],[52,28],[55,38],[53,48],[56,58],[56,70],[56,80],[58,92],[60,101]], width:3 },
      { pts:[[54,63],[40,63],[28,62],[21,62]], width:1 },   // the millrace, off the river behind the mill
    ],
    clear:[ [28,66,52,88], [104,10,136,29], [14,60,20,65], [123,71,131,79], [12,28,18,33], [36,3,46,9] ],
    walls:[
      { pts:[[2,54],[100,54]], width:2 },                    // the ridge that shuts the Ford's valley in
      { pts:[[100,54],[100,101]], width:2 },
      { pts:[[2,21],[56,21]], width:2 },                     // the crags round the Weir Vault
      { pts:[[102,46],[147,46]], width:2, tile:"|" },        // the orchard's hedge
      { pts:[[102,46],[102,101]], width:2, tile:"|" },
      { pts:[[12,58],[31,58]], width:1, tile:"|" },          // the millrace's hedge
      { pts:[[12,66],[31,66]], width:1, tile:"|" },
      { pts:[[30,58],[30,66]], width:2, tile:"|" },
      { pts:[[12,58],[12,66]], width:1, tile:"|" },
    ],
    roads:[
      { pts:[[50,71],[66,71],[80,74],[88,82]] },                                   // over the ford bridge to the fields
      { pts:[[31,71],[3,71]] },                                                   // west, toward the League rivers (Act II)
      { pts:[[38,70],[38,64],[21,64]], tile:"." },                                // the mill's back gate to the millrace
      { pts:[[40,71],[36,62],[36,50],[34,46],[40,38],[38,30],[44,28]] },           // the Millrace Road, north through Hollinwood
      { pts:[[44,28],[44,24],[44,18],[42,12],[40,7]] },                            // up to the Weir Vault
      { pts:[[44,28],[60,28],[80,24],[96,18],[104,17]] },                          // east across the river to Hollin's Cross
      { pts:[[134,17],[146,17]] },                                                // the road east (later acts)
      { pts:[[118,27],[118,52],[124,60],[127,71]] },                               // south through the orchard gate to the rift
      { pts:[[60,28],[74,36],[86,33]], tile:"." },                                 // a trail to the old barrow
      { pts:[[34,40],[22,34],[15,31]], tile:"." },                                 // a deer path to a hunter's cache
    ],
    stamps:[
      { at:[31,67], rows:[                     // Brindle Ford
        "..RRRRR.....RRRRRR..",
        "..RRRRR.....RRRRRR..",
        "..HHDHH.....HHDHHH..",
        "....=.........=.....",
        "++++++++++++++++++++",
        "..........RRRR......",
        ".f........RRRR...f..",
        "..........HHHH......",
        "...................." ] },
      { at:[104,12], rows:[                    // Hollin's Cross
        "|||||||||||||||||||||||||||||||",
        "|..RRRRR....RRRRRRR....RRRRR..|",
        "|..RRRRR....RRRRRRR....RRRRR..|",
        "|..HHDHH....HHHDHHH....HHDHH..|",
        "|....+.........+.........+....|",
        "+++++++++++++++++++++++++++++++",
        "|....+.........+..............|",
        "|.RRRR..+++++++++++++..RRRRR..|",
        "|.RRRR..+...........+..RRRRR..|",
        "|.HDHH..+..f.....f..+..HHHDH..|",
        "|......++...........++........|",
        "|.RRRR..+...........+..RRRRR..|",
        "|.RRRR..+++++++++++++..RRRRR..|",
        "|.HHDH.......+.........HDHHH..|",
        "|............+................|",
        "||||||||||||||+||||||||||||||||" ] },
      { at:[36,3], rows:[                      // the Weir Vault's door in the crag
        "^^^^^^^^^",
        "^^^VDV^^^",
        "...v.v..." ] },
      { at:[85,31], rows:[                     // the old barrow (working name)
        "^^^",
        "^D^" ] },
    ],
    seeds:[ [40,7], [86,33] ],
    areas:[
      { rect:[12,58,31,66], name:"The Millrace", music:"brindle-ford", heal:{ map:"house", x:4, y:4 }, lost:"a1_lost_ford", label:true },
      { rect:[28,64,62,90], name:"Brindle Ford", music:"brindle-ford", heal:{ map:"house", x:4, y:4 }, lost:"a1_lost_ford", label:true },
      { rect:[2,55,100,103], name:"Brindle Vale", music:"hearthvale-roads", heal:{ map:"house", x:4, y:4 }, lost:"a1_lost_ford" },
      { rect:[2,2,55,22], name:"The Weir Vault", music:"weir-vault", heal:{ map:"hearthvale", x:44, y:25 }, lost:"a1_lost_vault", label:true },
      { rect:[2,23,53,54], name:"Hollinwood", music:"hearthvale-roads", heal:{ map:"house", x:4, y:4 }, lost:"a1_lost_ford", label:true },
      { rect:[103,10,137,30], name:"Hollin's Cross", music:"hollins-cross", heal:{ map:"hearthvale", x:118, y:24 }, lost:"a1_lost_cross", label:true },
      { rect:[100,2,147,45], name:"The Cross Hills", music:"hearthvale-roads", heal:{ map:"hearthvale", x:118, y:24 }, lost:"a1_lost_cross" },
      { rect:[103,47,147,103], name:"Greyapple Orchard", music:"greyapple-orchard", heal:{ map:"hearthvale", x:118, y:24 }, lost:"a1_lost_cross", label:true },
      { rect:[56,2,99,53], name:"The Eastern Wilds", music:"hearthvale-roads", heal:{ map:"hearthvale", x:118, y:24 }, lost:"a1_lost_cross", label:true },
    ],
    wilds:[
      { area:[2,56,99,101], table:"town_grass", count:7 },
      { area:[13,59,29,65], table:"town_grass", count:4 },
      { area:[2,23,53,53], table:"route1_grass", count:10, unless:"a1_rank_iron" },
      { area:[2,23,53,53], table:"route1_iron", count:10, when:"a1_rank_iron" },
      { area:[56,23,99,53], table:"route1_grass", count:9 },
      { area:[2,2,55,20], table:"vault_shallows", count:6 },
      { area:[100,31,147,45], table:"route1_grass", count:4 },
      { area:[137,2,147,30], table:"route1_grass", count:2 },
      { area:[104,48,147,101], table:"orchard_grass", count:12 },
    ],
    grass:"town_grass",
    warps:[
      { x:35, y:69, to:"house", tx:4, ty:6, dir:"up" },
      { x:45, y:69, to:"hall_ford", tx:5, ty:7, dir:"up" },
      { x:40, y:4, to:"vault1", dir:"down" },        // landing filled in by rpgBuildWorld from the dungeon
      { x:86, y:32, to:"barrow1", dir:"down" },
    ],
    npcs:[
      { id:"tilly", x:48, y:72, dir:"left", look:{ shirt:"#d9a03c", hair:"#4a2c1a" }, talk:[ { when:"a1_rank_copper", text:"a1_tilly_copper" }, { text:"a1_tilly" } ] },
      { id:"hesk", x:38, y:76, dir:"down", look:{ shirt:"#7a6aa8", hair:"#d9d6cf" }, talk:"a1_hesk" },
      { id:"gullet", x:18, y:62, dir:"right", sprite:"beast", look:{ shirt:"#3f6f6a", hair:"#9fd6c9" },
        talk:"a1_gullet", trainer:"a1_gullet", flag:"a1_beat_gullet", win:"a1_gullet_win", unless:"a1_beat_gullet",
        barks:{ crown:"a1_gullet_crown", breaks:["a1_gullet_break1"] } },
      { id:"brann", x:40, y:38, dir:"down", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, unless:"a1_orchard_taken",
        talk:"a1_brann", trainer:"a1_brann", flag:"a1_beat_brann", win:"a1_brann_win", after:"a1_brann_after" },
      { id:"dove", x:41, y:39, dir:"left", look:{ shirt:"#5b7fb0", hair:"#e0c27a" }, when:"a1_beat_brann", unless:"a1_orchard_taken",
        talk:[ { when:"scene_met_dove", text:"a1_dove_after" }, { text:"a1_dove", sets:"scene_met_dove" } ] },
      { id:"jory", x:117, y:21, dir:"down", look:{ shirt:"#8a3d3d", hair:"#c9a36a" },
        talk:[ { when:"a1_rank_iron", text:"a1_jory_after" },
               { when:"a1_beat_mother", text:["a1_jory_iron", "a1_pell_joins"], sets:"a1_rank_iron" },
               { when:"a1_beat_pell", text:"a1_jory_orchard", sets:"a1_orchard_taken" },
               { when:"scene_met_jory", text:"a1_jory_wait" },
               { text:"a1_jory", sets:"scene_met_jory" } ] },
      { id:"pell", x:121, y:22, dir:"left", look:{ shirt:"#c0392b", hair:"#f1c40f" }, unless:"a1_rank_iron",
        talk:"a1_pell", trainer:"a1_pell", flag:"a1_beat_pell", win:"a1_pell_win", after:"a1_pell_after" },
      { id:"davor", x:110, y:26, dir:"right", look:{ shirt:"#7b1f1f", hair:"#2b2b2b" },
        talk:[ { when:"a1_beat_pell", text:"a1_davor_pell" }, { text:"a1_davor", stinger:"sting-pyrrhen" } ] },
      { id:"market1", x:110, y:17, dir:"down", look:{ shirt:"#b07a3a", hair:"#5a3a1e" }, talk:"a1_market_1" },
      { id:"market2", x:128, y:18, dir:"left", look:{ shirt:"#6a8a3a", hair:"#2a2a2a" }, talk:"a1_market_2" },
      { id:"market3", x:124, y:25, dir:"up", look:{ shirt:"#3a6a8a", hair:"#a05a2a" }, talk:"a1_market_3" },
      { id:"pim", x:120, y:50, dir:"down", look:{ shirt:"#7a8a3a", hair:"#8a8a8a" }, talk:[ { when:"a1_beat_mother", text:"a1_pim_after" }, { text:"a1_pim" } ] },
      { id:"mother", x:127, y:75, dir:"up", sprite:"beast", look:{ shirt:"#c0461e", hair:"#ffb347" }, unless:"a1_beat_mother",
        talk:"a1_mother", trainer:"a1_mother", flag:"a1_beat_mother", win:"a1_mother_win",
        barks:{ crown:"a1_mother_crown", breaks:["a1_mother_break1", "a1_mother_break2"], held:"a1_mother_brood_held" } },
      { id:"brann_o", x:125, y:73, dir:"right", look:{ shirt:"#9a6b3a", hair:"#3a3a3a" }, when:"a1_orchard_taken", talk:"a1_brann_after" },
      { id:"dove_o", x:129, y:73, dir:"left", look:{ shirt:"#5b7fb0", hair:"#e0c27a" }, when:"a1_orchard_taken", talk:"a1_dove_after" },
      { id:"hollow", x:40, y:6, dir:"down", look:{ shirt:"#7d7d7d", hair:"#5a5a5a" }, unless:"scene_gate_hollow", talk:"a1_gate_hollow" },
      { id:"seraphine", x:42, y:7, dir:"left", look:{ shirt:"#e8e2c8", hair:"#f4e7b0" }, when:"a1_slackwater", unless:"scene_seraphine", talk:"a1_seraphine" },
    ],
    signs:[
      { x:36, y:54, text:"a1_sign_ford_north", unless:"a1_rank_copper" },
      { x:30, y:64, text:"a1_sign_gate_locked", unless:"a1_licensed" },
      { x:44, y:21, text:"a1_sign_vault_closed", unless:"a1_rank_iron" },
      { x:118, y:46, text:"a1_sign_orchard_closed", unless:"a1_orchard_taken" },
      { x:46, y:71, text:"a1_sign_hall" },
      { x:42, y:29, text:"a1_sign_road" },
      { x:119, y:20, text:"a1_sign_broadsheet" },
      { x:42, y:9, text:"a1_sign_seal" },
      { x:3, y:71, text:"hv_sign_west" },
      { x:146, y:17, text:"hv_sign_east" },
      { x:87, y:34, text:"hv_sign_barrow" },
    ],
    chests:[ { id:"route1_chest", x:15, y:30, card:"water_tidecaller_shaman", text:"a1_chest_chained" } ],
    scenes:[
      { id:"cross_arrival", area:[100,13,108,21], text:"a1_cross_arrival", stinger:"sting-exalted" },
      { id:"gate_hollow", area:[34,6,48,12], when:"a1_rank_iron", text:"a1_gate_hollow" },
      { id:"seraphine", when:"a1_slackwater", text:"a1_seraphine", music:"seraphine" },
      { id:"met_barrow", area:[82,30,90,37], text:"hv_sign_barrow" },
      { id:"homecoming", area:[28,64,62,90], when:"scene_seraphine", text:"a1_homecoming", music:"homecoming", sets:"a1_done", end:"a1_end" },
    ],
  },
};

/* Dungeons. Floors join stairs to stairs: a floor's first stairs lead back up, its last stairs lead on down. */
const RPG_DUNGEONS = {
  vault1: { name:"Weir Vault: Sluice Halls", w:44, h:32, seed:311, rooms:9, water:0.45, music:"weir-vault", grass:"vault_shallows",
    heal:{ map:"hearthvale", x:44, y:25 }, lost:"a1_lost_vault", parent:"hearthvale",
    up:{ map:"hearthvale", x:40, y:4 }, down:"vault1b",
    wilds:[ { table:"vault_shallows", count:6 } ],
    signs:[ { room:2, text:"a1_edda_1" }, { room:5, text:"a1_edda_2" } ] },
  vault1b: { name:"Weir Vault: Drowned Stair", w:40, h:30, seed:977, rooms:8, water:0.6, music:"weir-vault", grass:"vault_shallows",
    heal:{ map:"hearthvale", x:44, y:25 }, lost:"a1_lost_vault", parent:"hearthvale",
    up:"vault1", down:"vault2",
    wilds:[ { table:"vault_shallows", count:6 } ],
    signs:[ { room:3, text:"a1_edda_3" } ],
    scenes:[ { id:"vault_banter", room:-1, text:"a1_vault_banter" } ] },
  barrow1: { name:"The Old Barrow (working name)", w:40, h:28, seed:4242, rooms:8, wall:"^", floor:"a", music:"weir-vault", grass:"route1_grass",
    heal:{ map:"hearthvale", x:86, y:36 }, lost:"a1_lost_cross", parent:"hearthvale",
    up:{ map:"hearthvale", x:86, y:32 }, down:"barrow2",
    wilds:[ { table:"route1_grass", count:5 } ],
    chests:[ { id:"barrow_c1", room:3, card:"wind_silverwing_griffin" } ] },
  barrow2: { name:"The Old Barrow, lower (working name)", w:36, h:26, seed:5151, rooms:7, wall:"^", floor:"a", exit:false, music:"weir-vault", grass:"route1_iron",
    heal:{ map:"hearthvale", x:86, y:36 }, lost:"a1_lost_cross", parent:"hearthvale",
    up:"barrow1",
    wilds:[ { table:"route1_iron", count:6 } ],
    chests:[ { id:"barrow_c2", room:-1, card:"fire_flamewing_dragon", sets:"barrow_c2_found" }, { id:"barrow_c3", room:4, card:"earth_ironhide_rhino" } ] },
};

/* Build every region and dungeon into RPG_MAPS, then join stairs and doors, and point quest steps at chests. */
function rpgBuildWorld(){
  if (rpgBuildWorld.done) return; rpgBuildWorld.done = true;
  for (const [id, spec] of Object.entries(RPG_REGIONS)) RPG_MAPS[id] = rpgGenRegion(id, spec);
  for (const [id, spec] of Object.entries(RPG_DUNGEONS)) RPG_MAPS[id] = rpgGenDungeon(id, spec);
  for (const [id, spec] of Object.entries(RPG_DUNGEONS)){
    const d = RPG_MAPS[id]; d.warps = d.warps || [];
    // up: back to the floor above (its down stairs) or out to a region door
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
