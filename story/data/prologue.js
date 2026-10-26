/* Prologue demo, "The Ford": every word on screen. Owner: Story. Build spec: story/demo/prologue.md.
   Keys start with pro_. A line "Name: text" shows a speaker; a line with no name is narration.
   Wren's gender is the player's pick, so these lines use no pronouns for Wren. */
Object.assign(RPG_TEXT, {

  /* ---------- 0. Cold open ---------- */
  pro_intro: [
    "Brindle Ford, ten years ago.",
    "The wild came down the river road at dusk. It was shaped like a man and made of fire, and it wore a crown of black glass.",
    "Every roof it passed caught fire. The Ford's three hunters met it at the market cross.",
    "You were eight. Your father had put you on the mill roof with a bucket, because the mill roof was slate.",
    "From up there you saw Hob Tanner fall, and then Ilse Varr. You saw a burning beam come down across Mads Orrin's legs.",
    "You saw your father run into the square, get his shoulder under the beam, and drag Mads out by the coat.",
    "A woman walked up the river road through the smoke. She wasn't running.",
    "She held up a single card. Green and gold light poured out of it, and the air in the square went cold.",
    "The fire wild turned to face her. A moment later there was nothing in the square but steam and a card in her hand.",
    "She looked up at the roof and saw you there with your empty bucket.",
    "???: You kept throwing water the whole time? Good. You can come down now. It's over.",
    "That was Seraphine Vael, first of the Seven. People were already calling her the Lantern.",
    "By morning, you had decided what you were going to be.",
    "Ten years later."
  ],
  pro_pick_deck: [
    "The hall keeps a shelf of old decks for new hunters. Choose the one you'll start with."
  ],

  /* ---------- 1. Licence Day ---------- */
  pro_dad_morning: [
    "Dad: Wheel stopped again in the night. Third time this month.",
    "Dad: There's something living in the race. I can hear it at the sluice, gulping.",
    "Dad: I was at the hall last night. Mads says first bell, so you'd better go."
  ],
  pro_sign_wheel: ["The millwheel isn't turning. Weed is wound thick around the lowest paddles, and the water underneath looks oily."],
  pro_tilly_morning: [
    "Tilly: Is it today? Mum said it's today.",
    "Tilly: When you've got your licence, can I see it? I won't touch it. I'll just look."
  ],
  pro_hesk_morning: [
    "Hesk: Thirty-one wild sightings inside a mile of this wall since spring. I've got them all chalked up on the hall door.",
    "Hesk: Last year it was fourteen. Nobody listens to me about it, mind."
  ],
  pro_sign_north_closed: ["COVENANT NOTICE — Millrace Road under wild advisory. Tin hunters stay inside the fields. M. Orrin, Branch Master."],
  pro_sign_hall: ["COVENANT OF HUNTERS, BRINDLE FORD BRANCH. Contracts posted at first bell."],
  pro_sign_waymark: ["THE WAYMARK STONE. Past this stone, Sallow Wood is for Copper hunters and above. Tins turn back."],

  pro_mads_licence: [
    "Mads is at the counter with his bad leg up on a crate, eating bread over the open ledger. He doesn't get up.",
    "Mads: Calder. Your dad was in here last night.",
    "Wren: He said. What did he want?",
    "Mads: To drink my cider. Right. Hand on the book.",
    "Mads: Say it after me. I'll hunt for those who can't. I'll report what I find. I'll pay the hall its share.",
    "Wren: I'll hunt for those who can't. I'll report what I find. I'll pay the hall its share.",
    "He writes your name under the last one on the page. The name above yours is dated four years ago.",
    "Mads: There. Tin of the Brindle Ford hall. Don't lose the licence. I've only got the one stamp and it's cracked.",
    "Wren: The millrace job's up on the board. That's ours.",
    "Mads: It's Copper. You're Tin. You take your own rank, and I don't care whose mill it is.",
    "Mads: I've put my name on it, so nobody else will touch it either. Your dad's wheel can wait a few weeks.",
    "Wren: Weeks?",
    "Mads: Four or five Tin jobs, done properly, and I like how they look in the book. Then we'll talk about an assessment.",
    "Mads: Hesk's got ember mice in his woodpile. Two marks. And don't let him chalk them on my door."
  ],
  pro_mads_hint_1: ["Mads: East gate. Look for the woodpile, and the man shouting at it."],
  pro_board_1: [
    "CONTRACTS, BRINDLE FORD",
    "[Tin] Ember mice in Hesk's woodpile, east gate. Pay 2 marks.",
    "[Copper] Wild in the Calder millrace, stopping the wheel. Pay 6 marks and flour. HELD by the branch master.",
    "[Steel] ALL STEEL HUNTERS report to the eastern border posts, by order of the Covenant council."
  ],

  /* ---------- 2. Contract 1: Ember Mice ---------- */
  pro_hesk_mice: [
    "Hesk: Oh, it's you. Mads sent the miller's kid. Well, that's about what this job's worth.",
    "Hesk: They're in the kindling. You'll smell them before you see them. If they set the stack off, I'm not paying.",
    "Wren: You'd be paying the hall, not me.",
    "Hesk: Then I'm not paying the hall either."
  ],
  pro_mice: [
    "The woodpile ticks and smokes. Something small and bright red runs along the top log, then three more after it.",
    "Wren: All right. One at a time."
  ],
  pro_mice_win: [
    "The last mouse folds down into a card, still warm. The woodpile stops smoking.",
    "Hesk: Huh. Well, the stack's still standing. I'll tell Mads you didn't burn it down. That's as good as I give."
  ],
  pro_mads_report_1: [
    "Mads turns the ledger round and holds out the pen.",
    "Mads: You write it, not me. Date, contract, what you bound, and anything you saw that wasn't on the notice.",
    "Wren: Ember mice, four. Hesk's woodpile. Done.",
    "Mads: Is that all you saw?",
    "Wren: There were eggs in the kindling. Little hot ones. I dropped them in Hesk's water butt.",
    "Mads: Write that down. Mice don't nest this late in the year.",
    "He reads the egg line twice. Then he counts two marks out of a dented tin box and pushes them across.",
    "Mads: The hall usually keeps a share of what you bind. Not mice. Nobody buys mice.",
    "Mads: Next one's outside the wall. Nan Pruett's well, south, the last farm before the fen. Something's fouled it.",
    "Mads: Probably a sprite. If it's bigger than a sprite, you come back and tell me.",
    "Wren: And if I can handle it?",
    "Mads: You come back and tell me. Ilse Varr could handle things.",
    "He goes back to his bread."
  ],
  pro_mads_well: ["Mads: South gate, then the track past the strip fields. Nan's is the farm with the leaning barn."],

  /* ---------- 3. Contract 2: The Pruett Well ---------- */
  pro_nan: [
    "Nan: You're from the hall? You look about twelve.",
    "Wren: Eighteen. And licensed.",
    "Nan: Then you'll know what's wrong with my well, I expect. Because I don't.",
    "Nan: It started Tuesday. The bucket comes up full of slime, and something down there laughs at me. I'm not imagining it."
  ],
  pro_abel: [
    "Abel: Gran won't let me look down the well any more.",
    "Abel: It's got a face. It's green and it's got a face, and it spits."
  ],
  pro_sprite: [
    "You lean over the well. Something green and wet looks back up at you, giggles, and spits.",
    "Wren: Abel was right about the spitting."
  ],
  pro_sprite_win: [
    "The sprite comes up out of the well in a spray of water and goes down into a card on the wet stones.",
    "The next bucket Nan draws is clear."
  ],
  pro_nan_after: [
    "Nan: Look at that. I've been boiling every drop since Tuesday. Thank you.",
    "Nan: I can't pay the hall what this is worth, not after last winter. There's a dozen eggs. Take them, and don't argue.",
    "Abel: Can I see the card? The one with the face?"
  ],
  pro_mads_report_2: [
    "Mads: Eggs.",
    "Wren: She hasn't got anything else. Was that wrong?",
    "Mads: Not for you. You get your two marks either way.",
    "He opens the tin box. There are fewer coins in it than yesterday.",
    "Wren: Where does that come from, if she doesn't pay?",
    "Mads: Copper and Steel jobs pay for the Tin ones. See any Copper or Steel hunters in here? No. So it's the box.",
    "Mads: Don't look at the box like that. It's been emptier. Give me two of those eggs and we're square.",
    "Mads: There's a Holdfast crew coming in tomorrow on the gale-hound contract. If they'll take a tail, you're it."
  ],

  /* ---------- 4. Contract 3: Tail on a Copper Hunt ---------- */
  pro_brann_dove_arrive: [
    "There are two strangers at the counter in road leathers. A big man with a Holdfast beard, and a small woman with a bow case.",
    "Mads: Calder. This is Brann and Dove Holloway, Copper, out of Deepmoot. They've got the gale-hound contract.",
    "Brann: Pack of them hitting carters near the old hut on the Millrace Road. Five, maybe six.",
    "Mads: They've agreed to take a tail. You carry, you watch their backs, and you don't go near the leader.",
    "Dove: And when I tell you to do something, you do it then. Not after you've thought about it.",
    "Brann: She means it. Our last tail stopped to think. He's a baker now."
  ],
  pro_dove_brief: [
    "Dove: Here's the plan. Brann and I go for the pack leader. The young ones will try to come round behind us.",
    "Dove: When they do, you're in the way. Bind them if you can. If you can't, just don't let them get to Brann's back.",
    "Brann: I have a very big back. It needs looking after."
  ],
  pro_sign_vault: ["COVENANT SEAL. The Weir Vault is closed by order of the Covenant. Entry forbidden to all ranks without the council's leave."],
  pro_hound_1: [
    "A young gale-hound comes out of the long grass, all legs and wind, snapping at the air.",
    "Dove: Young one, coming round! Calder, it's yours!"
  ],
  pro_hound_2: [
    "Another young hound circles wide, trying to get behind Brann.",
    "Brann: Calder! Left side!"
  ],
  pro_hound_win: ["The hound drops into a card. Somewhere up the road, the pack is howling."],
  pro_pack_leader: [
    "The carters' hut has no door left. The pack leader stands in front of it, twice the size of the others.",
    "The grass around it lies flat in a ring, and the wind inside the ring never stops.",
    "Brann: There you are.",
    "Dove: Calder, stay at the fence. If anything comes past us, it's yours.",
    "Brann and Dove walk out to meet it together, cards in hand. The only other person you've seen walk at a wild that calmly was Seraphine.",
    "Halfway through, a last young hound breaks off and runs straight at Dove's back."
  ],
  pro_straggler: ["Wren: No you don't."],
  pro_straggler_win: [
    "The straggler goes down into a card a few feet from the fence.",
    "Up by the hut, the pack leader is gone. Brann is sitting on the ground, laughing and holding his arm.",
    "Dove: Calder. Brann. Everyone's here. Everyone's fine.",
    "Brann: It bit me. I'm fine. It bit me, though.",
    "Dove: You kept that one off my back. Thanks."
  ],
  pro_chest_chained: [
    "Half buried in the bank by the road is an old iron box wrapped in chain. The Covenant seal on its lock is green with age.",
    "Dove: That's a hunter's cache. Somebody left cards here for a bad day and never came back for them.",
    "Dove: The seal opens for any licence. Go on. Whoever left it would rather you had it than the rust."
  ],
  pro_report_3: [
    "Brann: Gale-hounds, seven. Leader bound by Dove, three young ones by us, three by the tail.",
    "Mads: The tail behave?",
    "Dove: Stopped one going for my back. Write that down.",
    "Mads: Calder writes it down. It's Calder's line.",
    "Mads turns the ledger round and holds out the pen. You write it.",
    "Mads: That's three.",
    "Brann: We'll stay a while, if the hall will have us. That pack came from somewhere, and I want to know where."
  ],
  pro_brann_idle: ["Brann: Dove says I'm not to lift anything with this arm for a week. I said I'd lift what I like. We're discussing it."],
  pro_dove_idle: ["Dove: Gale-hounds don't come this far south before the snow. I've told Brann it's nothing, so don't you tell him different."],

  /* ---------- 5. Contract 4: Letters for Ketter's Crossing ---------- */
  pro_mads_letters: [
    "Mads: Post for Ketter's Crossing. The toll bridge, east, across Brennock Heath.",
    "Mads: Orla Ketter keeps the toll. Give her these, wait while she writes back, and bring me what she gives you.",
    "Mads: The road's safe enough. Off the road, the heath is Copper country. You'll see things out there you'd like to bind. Leave them.",
    "Wren: What's in the letters?",
    "Mads: Questions. Go on."
  ],
  pro_sign_heath: ["BRENNOCK HEATH. Keep to the road. Wilds off the road are Copper rank and above."],
  pro_skiff: [
    "A shadow crosses the road, and you look up.",
    "A white sky-skiff is passing high over the heath, its sails full, heading east. It's going faster than anything that size should.",
    "It doesn't slow down. You watch it until it's a speck over the hills, and for a while after that."
  ],
  pro_orla: [
    "Orla: From Mads? About time. He writes like he's paying by the word.",
    "Orla: You saw the skiff go over? That was Aeris Calloway, one of the Seven. On his way to the border, they say.",
    "Orla: Didn't stop. Nobody with a rank like that stops at Ketter's Crossing.",
    "She reads Mads's letter, writes two lines on the back of it, and folds it up again.",
    "Orla: Give him this. And tell him I counted twice. It's four hundred, not three."
  ],
  pro_davor: [
    "Davor: Good afternoon. Captain Davor Varrane, Third Relief Column, Pyrrhen Dominion.",
    "Davor: You're Covenant? Good. How many hunters does the Ford hall keep now? Only so we know who to send for.",
    "Davor: With wilds this bad and no Hearthvale army to speak of, someone has to hold the bridge. We volunteered.",
    "Davor: Tell your branch master he's welcome at my table any evening. We'll be here a while."
  ],
  pro_soldier: [
    "Soldier: Bridge is closed to carts until the captain says. Walkers can go.",
    "Soldier: No, I don't know how long we're staying. Ask the captain."
  ],
  pro_report_4: [
    "Mads reads Orla's letter standing up, which he never does. Then he reads it again.",
    "Wren: She said to tell you four hundred, not three.",
    "Mads: I heard you.",
    "Mads: Four hundred Pyrrhen soldiers sitting on Orla's bridge. Protecting her from gale-hounds.",
    "He folds the letter into the back of the ledger, where he keeps the things he doesn't want to lose.",
    "Mads: Write yours up. Delivered and returned. That's four."
  ],

  /* ---------- 6. Assessment: The Calder Millrace ---------- */
  pro_mads_assessment: [
    "Mads: Four contracts. Sit down.",
    "He turns back through the ledger, reading your lines. He stops at the mouse eggs and taps the page, then goes on.",
    "Mads: An assessment is one job a rank up, with a witness. If the witness says you bound it clean, the hall votes.",
    "Wren: The millrace.",
    "Mads: The millrace. Brann and Dove sat at your sluice two nights last week. It never came up. It knows a Copper when it sees one.",
    "Mads: It doesn't know you. That's why it's your assessment and not their contract.",
    "Wren: Dad calls it Gullet. He says it comes up when you're looking somewhere else.",
    "Wren: So it hides. Then I want things in my deck that can sit and wait for it.",
    "Mads: Right. Work out which things before you go, not after. Brann will witness, at the mill gate. Not today."
  ],
  pro_board_2: [
    "CONTRACTS, BRINDLE FORD",
    "[Tin] Sparks in the thatch, Mill Lane. An ember wild on the roofs. Pay 2 marks.",
    "[Tin] Pruett's lost ewe, last seen by the Waymark Stone. Pay 1 mark and Nan's thanks.",
    "[Copper] Wild in the Calder millrace. ASSESSMENT: Calder, witness Holloway."
  ],
  pro_thatch: ["Something small and burning is running along the ridge of a roof on Mill Lane. Half the lane is out watching it."],
  pro_thatch_win: ["The ember wild drops off the roof into a card. A woman throws a bucket of water over the thatch anyway, to be sure."],
  pro_ewe: ["Pruett's ewe is standing just inside the Waymark Stone, very still, with a grass wild clinging to its back."],
  pro_ewe_win: ["The grass wild lets go and goes down into a card. The ewe walks off toward home as if nothing happened."],
  pro_dad_assessment: [
    "Dad: Mads came up to the mill to tell me himself. That leg doesn't do hills.",
    "Dad: I asked him not to license you, you know. Sat in the hall and asked him.",
    "Dad: First time in thirty years he's told me no.",
    "Dad: It comes up under the sluice gate, on the left. It always comes up on the left."
  ],
  pro_brann_witness: [
    "Brann: Ready? I won't help, so don't look round for me. I'm only here to tell the hall what I saw.",
    "Brann: If it goes badly, I'll pull you out and nobody will hold it against you. There's always another assessment.",
    "Brann: Off you go. I'll be here by the gate, being wary for both of us."
  ],
  pro_gullet: [
    "The water in the race is dark and still. The wheel above it has stopped and started all month. It's stopped now.",
    "Then the surface splits, and a mouth full of thin glass teeth comes up on a body as thick as the wheel's axle.",
    "Wren: Hello, Gullet. You've been keeping my dad up at night."
  ],
  pro_gullet_crown: [
    "GULLET, THE MILLRACE LURKER. Copper rank. Rule it breaks — LURKER.",
    "It strikes from under the sluice. Its creatures can't be targeted until the end of your next turn."
  ],
  pro_gullet_break1: [
    "Gullet drops back under the sluice. The water goes flat.",
    "Brann: Not bound yet. And I'm not helping, so stop looking at me."
  ],
  pro_gullet_win: [
    "Gullet thrashes once, hard enough to soak the bank, and goes down into a card on the stones.",
    "For a moment the race is quiet. Then the wood groans, and the millwheel starts to turn.",
    "Brann: That's a binding. I'll say so in front of anybody."
  ],
  pro_lost: ["Your ward breaks. You wake up by the mill fire, aching, and Dad pretends he wasn't sitting up with you."],

  /* ---------- The ceremony ---------- */
  pro_ceremony: [
    "The hall is fuller than you've ever seen it. Dad is standing by the door.",
    "Tilly is on a bench next to Nan Pruett. Hesk is complaining about the crowd.",
    "Mads: Quiet. Branch business. Calder, Tin of this hall, stands for Copper.",
    "He opens the ledger and reads your lines out loud, one at a time, in the same flat voice he uses for everything.",
    "Mads: Ember mice, four, Hesk's yard. Eggs found in the kindling. Well-sprite, Pruett's Farm. Paid in eggs.",
    "Mads: Tail on the Holloway crew, gale-hounds, Millrace Road. Letters to Ketter's Crossing, delivered and returned.",
    "Mads: Assessment. Gullet, the Calder millrace, Copper rank. Witness?",
    "Brann: Clean binding. I saw it start to finish.",
    "Mads: Hunters of this hall, and its guests. Hands for Copper.",
    "Brann's hand goes up, then Dove's. Mads raises his own last.",
    "Mads: Carried.",
    "He pins a small copper token to your coat. His hands are slower than usual. Tilly stands on the bench to see it.",
    "Mads: Calder, Copper of the Brindle Ford hall.",
    "Mads: Wren. Your dad's at the door. Go and show him before Hesk starts talking.",
    "Hesk: I wasn't going to say anything. Some of us have woodpiles to get back to, that's all."
  ],
  pro_tilly_after: [
    "Tilly: Can I see the token? I won't touch it.",
    "Tilly: When I'm a hunter I'm going to do my assessment on something way bigger than an eel."
  ],

  /* ---------- That evening ---------- */
  pro_pell_arrives: [
    "The evening barge is tying up at the river landing. A young man in a good red coat steps off it before it has stopped.",
    "Pell: Is this Brindle Ford? Where's your hall?",
    "Wren: Up the lane. Who's asking?",
    "Pell: Pell Varrane, Copper, out of Cindergate. Hollin's Cross is calling for Coppers and I'm told you've got a few.",
    "Wren: Varrane? There's a Captain Varrane camped at Ketter's Crossing.",
    "Pell: Davor's at Ketter's? Of course he is. If he asks you to dinner, you haven't seen me.",
    "Pell: Is that a Copper token? Since when?",
    "Wren: About an hour ago.",
    "Pell: An hour. Wonderful. Jory Fenn sends me forty miles upriver to fetch hunters, and I get you."
  ],
  pro_dad_evening: [
    "Dad: The wheel's turning. I keep stopping to listen to it.",
    "Dad: Your great-gran Edda used to say she'd been a hunter, you know. Before she married into the mill.",
    "Dad: I always thought she made it up. Every winter she told one about going into the weir and coming out with a card.",
    "Dad: Go to bed. Mads will have work on the board by first bell, and he'll want you there before it."
  ],
  /* ---------- Gates, signs and Mads between contracts (Game Dev's gd_ keys) ---------- */
  gd_gate_south: ["The south gate is barred. The gate-ward won't open it for a Tin without a contract."],
  gd_gate_east: ["The east gate is shut. The gate-ward says the Toll Road is hall business only."],
  gd_gate_millrace: ["The mill's back gate is latched. Dad keeps it shut while that thing is in the race."],
  gd_road_south: ["SOUTH — the river road to Lowfen and Hollin's Cross, a day's walk. Copper rank and above."],
  gd_mads_wait: ["Mads: Book's open when you've got something to put in it."],
  gd_mads_after: ["Mads: Copper doesn't mean you lie in. There'll be work on the board at first bell."],
  hv_sign_barrow: ["An old barrow in the hillside. Its door-stone has been pushed aside, and cold air breathes out of the dark."],

  pro_end: [
    "End of the Prologue demo.",
    "Wren Calder — Copper of the Brindle Ford hall.",
    "Next — Act I, Notice Boards."
  ]
});
