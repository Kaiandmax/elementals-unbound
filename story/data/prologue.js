/* Prologue demo, "The Ford": every word on screen. Owner: Story. Build spec: story/demo/prologue.md.
   Keys start with pro_. A line "Name: text" shows a speaker; a line with no name is narration.
   Wren's gender is the player's pick, so these lines use no pronouns for Wren. */
Object.assign(RPG_TEXT, {

  /* ---------- 0. Cold open ---------- */
  pro_intro: [
    "Brindle Ford, ten years ago.",
    "The wild came down the river road at dusk. It was shaped like a man and made of fire, and it wore a crown of black glass.",
    "Every roof it passed caught fire. The Ford's three hunters met it at the market cross, and none of them got up again.",
    "You were eight. Your father had put you on the mill roof with a bucket, because the mill roof was slate.",
    "You threw water until the bucket was empty. Then you just watched.",
    "A woman walked up the river road through the smoke. She wasn't running.",
    "She held up a single card. Green and gold light poured out of it, and the air in the square went cold.",
    "The fire wild turned to face her. A moment later there was nothing in the square but steam and a card in her hand.",
    "She looked up at the roof and saw you there with your empty bucket.",
    "???: You kept throwing water the whole time? Good work. You can come down now. It's over.",
    "That was Seraphine Vael, first of the Seven. People were already calling her the Lantern.",
    "By morning, you had decided what you were going to be.",
    "Ten years later."
  ],
  pro_pick_deck: [
    "Mads: Nobody starts with their own cards. Pick one of these off the shelf. You'll give it back when you've earned better."
  ],

  /* ---------- 1. Licence Day ---------- */
  pro_dad_morning: [
    "Dad: Wheel stopped again in the night. That's the third time this month.",
    "Dad: There's something living in the race. I can hear it at the sluice, gulping.",
    "Dad: Don't look at me like that. You're not touching it until Mads says you can. Go on, he said first bell."
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
    "Mads: Calder. Sit down before you fall down, you look like you haven't slept.",
    "Wren: I haven't.",
    "Mads: Nobody does, the night before. Right. Hand flat on the ledger.",
    "Mads: Do you swear to hunt for the people who can't, to report what you find, and to give the hall its share?",
    "Wren: I swear it.",
    "Mads: Then you're a Tin of the Brindle Ford hall. Here's your licence. Try not to lose it in the river.",
    "Mads: Three rules, and I'll only tell you once. First, you take contracts at your rank. Tin takes Tin.",
    "Mads: Second, you come back and write it in the ledger. The hall pays you when you report, not before.",
    "Mads: Third, if a job turns out bigger than the notice said, you walk away and tell me. No hunter ever got in trouble for walking away.",
    "Wren: How long until Copper?",
    "Mads: Four or five Tin jobs done properly, then an assessment. Ask me again when you've done one.",
    "Mads: Board's behind you. Hesk has mice in his woodpile again. Start there."
  ],
  pro_mads_hint_1: ["Mads: Hesk's yard is by the east gate. Follow the complaining."],
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
    "Mads: Ledger first. Date, the job, what you bound, what you saw. Write small, it's an old book.",
    "Wren: Ember mice, four. Hesk's woodpile. He says he's not paying.",
    "Mads: He never does. Two marks from the hall purse. The hall usually takes a cut of the cards, but keep the mice.",
    "Mads: That's one. Next one's outside the walls, so keep your eyes open.",
    "Mads: Nan Pruett's well has gone bad. The water comes up green and it stinks.",
    "Mads: Go south through the fields. Her farm's the last one before the fen."
  ],
  pro_mads_well: ["Mads: Pruett's Farm, south past the strip fields. Stay on the track. Anything that runs at you out there is Tin, but it still bites."],

  /* ---------- 3. Contract 2: The Pruett Well ---------- */
  pro_nan: [
    "Nan: You're from the hall? You look about twelve.",
    "Wren: Eighteen. And licensed.",
    "Nan: Tin. Well, the well's not much of a job, so I suppose that's fair.",
    "Nan: It started Tuesday. Bucket comes up full of slime, and something down there laughs at me. I'm not imagining the laughing."
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
    "Nan: Clear as glass. Thank you.",
    "Nan: I can't pay the hall what this is worth, not after last winter. There's a dozen eggs. Take them, and don't argue.",
    "Abel: Can I see the card? The one with the face?"
  ],
  pro_mads_report_2: [
    "Mads: Eggs. Of course it was eggs.",
    "Wren: She couldn't pay. Is that a problem?",
    "Mads: No. You get paid either way. The hall sells its share of the cards, and the rich jobs cover the poor ones.",
    "Mads: Keep the eggs. That's two. Go home and eat something. There's a Copper crew due in tomorrow, and they might want a tail."
  ],

  /* ---------- 4. Contract 3: Tail on a Copper Hunt ---------- */
  pro_brann_dove_arrive: [
    "There are two strangers at the counter, both in road leathers. A big man with a Holdfast beard, and a small woman with a bow case.",
    "Mads: Calder, this is Brann and Dove Holloway. Copper rank, out of Deepmoot. They're working the Millrace Road.",
    "Brann: Pack of gale-hounds, hitting carters near the old hut. Five of them, maybe six.",
    "Mads: A Copper crew can take on a Tin as a tail. You carry, you watch, and you keep the small ones off them. You don't touch the leader.",
    "Dove: And you do what I say the moment I say it. That's the only rule we've got.",
    "Brann: She means it. Our last tail didn't listen, and he's a baker now."
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
    "Dove: Everyone all right? Calder? Brann?",
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
    "Dove: The tail stopped one going for my back. Put that in the book.",
    "Mads: I'll put it in the book. That's three, Calder.",
    "Brann: We're staying a while, if you'll have us. That pack came from somewhere, and I want to know where."
  ],
  pro_brann_idle: ["Brann: Dove says I'm not to lift anything with this arm for a week. I said I'd lift what I like. We're discussing it."],
  pro_dove_idle: ["Dove: Those hounds were too far south for this time of year. Something's pushing wilds down out of the hills."],

  /* ---------- 5. Contract 4: Letters for Ketter's Crossing ---------- */
  pro_mads_letters: [
    "Mads: This one's a walk. The hall's post goes to the toll bridge at Ketter's Crossing, east over the heath.",
    "Mads: Give them to Orla Ketter, wait for her reply, bring it back. Stay on the road. The heath's Copper country once you step off it.",
    "Wren: What's in the letters?",
    "Mads: Covenant business, which means none of yours. Go on."
  ],
  pro_sign_heath: ["BRENNOCK HEATH. Keep to the road. Wilds off the road are Copper rank and above."],
  pro_skiff: [
    "A shadow crosses the road, and you look up.",
    "A white sky-skiff is passing high over the heath, its sails full, heading east. It's going faster than anything that size should.",
    "It doesn't slow down. In a minute it's a speck over the hills, and then it's gone."
  ],
  pro_orla: [
    "Orla: Letters from Mads? About time. Give them here.",
    "Orla: You saw the skiff go over? That was Aeris Calloway. One of the Seven, on his way to the border.",
    "Orla: He didn't stop. Nobody with a rank like that stops at Ketter's Crossing.",
    "Orla: Here's my reply. Tell Mads I've counted them twice and it's four hundred, not three."
  ],
  pro_davor: [
    "Davor: Good afternoon. Captain Davor Varrane, Third Relief Column, Pyrrhen Dominion.",
    "Davor: You're Covenant? Good.",
    "Davor: With wilds this bad and no Hearthvale army to speak of, someone has to hold the bridge. We volunteered.",
    "Davor: Tell your branch master he's welcome at my table any evening. We'll be here a while."
  ],
  pro_soldier: [
    "Soldier: Bridge is closed to carts until the captain says. Walkers can go.",
    "Soldier: No, I don't know how long we're staying. Ask the captain."
  ],
  pro_report_4: [
    "Mads: You're back. Give me Orla's letter.",
    "Mads reads it twice. He doesn't say anything for a while.",
    "Wren: She said to tell you it's four hundred, not three.",
    "Mads: I know what she said, I can read. Four hundred Pyrrhen soldiers at a toll bridge, to protect it from wilds that come in sixes.",
    "Mads: Write it in the book. Delivered and returned. That's four."
  ],

  /* ---------- 6. Assessment: The Calder Millrace ---------- */
  pro_mads_assessment: [
    "Mads: Four contracts, and the ledger's clean. Time we talked about your assessment.",
    "Mads: Here's how it works. You take one contract a rank up, a Copper, with another hunter there to witness it.",
    "Mads: If you bind the wild and the witness says you did it properly, the hall votes. If the vote goes your way, you're Copper.",
    "Wren: Which contract?",
    "Mads: The one that's been on the board since before you got your licence. The wild in your dad's millrace.",
    "Mads: It's called Gullet. It's been in the race a month, it's Copper rank, and it's clever. It hides under the sluice.",
    "Mads: Brann will witness. Don't go today. Get your deck right first. Take a few more jobs off the board if you need the cards.",
    "Mads: When you're ready, Brann will be at the mill gate."
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
    "Dad: Mads told me. You're doing the millrace.",
    "Dad: I don't like it. I'm also not going to stop you, so don't make that face.",
    "Dad: It comes up under the sluice gate, on the left. It always comes up on the left."
  ],
  pro_brann_witness: [
    "Brann: Ready? I won't help, so don't look round for me. I'm only here to tell the hall what I saw.",
    "Brann: If it goes badly, I'll pull you out and nobody will hold it against you. There's always another assessment.",
    "Brann: Off you go. Your dad says it comes up on the left, for what that's worth."
  ],
  pro_gullet: [
    "The water in the race is dark and still. The wheel above it hasn't turned since your licence day.",
    "Then the surface splits, and a mouth full of thin glass teeth comes up on a body as thick as the wheel's axle.",
    "Wren: Hello, Gullet. You've been keeping my dad up at night."
  ],
  pro_gullet_crown: [
    "GULLET, THE MILLRACE LURKER. Copper rank. Rule it breaks — LURKER.",
    "It strikes from under the sluice. Its creatures can't be targeted until the end of your next turn."
  ],
  pro_gullet_break1: [
    "Gullet drops back under the sluice. The water goes flat.",
    "Brann: It's not finished. Watch the left side."
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
    "Mads: Quiet. Branch business. Wren Calder, Tin of this hall, stands for Copper.",
    "Mads opens the ledger and reads the record out loud, a line at a time.",
    "Mads: Ember mice, Hesk's yard. Well-sprite, Pruett's Farm.",
    "Mads: Tail on the Holloway crew, gale-hounds, Millrace Road. Letters to Ketter's Crossing, delivered and returned.",
    "Mads: Assessment, Gullet, the Calder millrace, Copper rank. Witness?",
    "Brann: Clean binding. I saw it start to finish.",
    "Mads: Hunters of this hall and its guests, raise a hand for Copper.",
    "Brann's hand goes up, then Dove's, then Mads's own.",
    "Mads: Carried. Come here.",
    "He pins a small copper token to your coat. Tilly stands on the bench to see it.",
    "Mads: Wren Calder, Copper of the Brindle Ford hall. You can work past the Waymark Stone now. Come back from it.",
    "Tilly: COPPER!",
    "Hesk: Is that the end? Some of us have woodpiles."
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
    "Pell: My brother. We don't discuss him.",
    "Pell: Is that a Copper token? Since when?",
    "Wren: About an hour ago.",
    "Pell: An hour. Wonderful. Jory Fenn sends me forty miles upriver to fetch hunters, and I get you."
  ],
  pro_dad_evening: [
    "Dad: The wheel's turning. I keep stopping to listen to it.",
    "Dad: Your great-gran Edda used to say she'd been a hunter, you know. Before she married into the mill.",
    "Dad: I always thought she made it up. Every winter she told one about going into the weir and coming out with a card.",
    "Dad: Go to bed, Copper. Mads will have work for you in the morning, and you'll want to be awake for it."
  ],
  pro_end: [
    "End of the Prologue demo.",
    "Wren Calder — Copper of the Brindle Ford hall.",
    "Next — Act I, Notice Boards."
  ]
});
