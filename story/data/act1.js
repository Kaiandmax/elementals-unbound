/* Act I demo: every word on screen. Owner: Story. Build spec: story/demo/act1.md.
   Keys start with a1_. A line "Name: text" shows a speaker; a line with no name is narration.
   Wren's gender is the player's pick, so these lines use no pronouns for Wren. */
Object.assign(RPG_TEXT, {

  /* ---------- 0. Cold open ---------- */
  a1_intro: [
    "Brindle Ford. Ten years ago.",
    "The fire came down the river road at dusk, walking like a man made of forge-light.",
    "It wore a crown of burning rift-glass. Wherever it stepped, the thatch went up.",
    "You were eight, on the mill roof, holding a bucket you'd long since emptied.",
    "Dad was shouting your name. The hunters from the branch hall were down, all three of them.",
    "Then the smoke split, and a woman walked through it as if it were morning fog.",
    "She raised one card. Light poured out of it, cold and green and gold, like the sky in winter.",
    "The fire screamed once. Then there was only a card in her hand, and the sound of the river.",
    "She looked up at the roof. At you.",
    "???: You held your ground. That's all any of us can do.",
    "Seraphine Vael. The Lantern. First of the Seven.",
    "You decided that night. You'd be a hunter. You'd be her.",
    "Ten years later."
  ],
  a1_pick_deck: ["Mads: Every Tin starts with a borrowed deck. Pick one. Bring it back with fewer scorch marks than you found it."],

  /* ---------- 1. The Licence ---------- */
  a1_dad: [
    "Dad: Wheel's stopped again. Third time this month.",
    "Dad: Something's living in the race. I hear it at night, gulping at the sluice.",
    "Dad: Today's the day, isn't it? Go on to the hall. Mads won't wait all morning, bad leg or not."
  ],
  a1_sign_wheel: ["The millwheel hangs still. Weed and something slick are wrapped round its lowest paddles."],
  a1_tilly: [
    "Tilly: Is it today? Is it really today? Show me the licence when you get it!",
    "Tilly: When I'm a hunter I'm going to be Exalted. Straight away. I'll skip the boring ranks."
  ],
  a1_hesk: [
    "Hesk: Twice the wild sightings this year as last, and last year was twice the year before. I keep a tally.",
    "Hesk: And there's Pyrrhen carts on the east road. Red canvas. Nobody's said what's under it."
  ],
  a1_sign_ford_north: ["COVENANT NOTICE: Millrace Road under wild advisory. Tin hunters remain within the Ford. — M. Orrin, Branch Master"],
  a1_sign_hall: ["COVENANT OF HUNTERS — BRINDLE FORD BRANCH. Contracts posted daily. Wipe your boots."],

  a1_mads_licence: [
    "Mads: Calder. You're late. That's fine, so am I. Leg doesn't do mornings.",
    "Mads: Right. Hand on the ledger. Swear you'll hunt for the folk who can't, and not for the coin, though you'll take the coin.",
    "Wren: I swear it.",
    "Mads: Good. Here. Tin licence, Brindle Ford branch. Don't laminate it, you'll want the scratches later.",
    "Mads: First contract. A wild in the Calder millrace, rank Copper, stopping the wheel.",
    "Wren: That's... our mill.",
    "Mads: It's a contract. Most of 'em are somebody's mill. That's the whole job, kid.",
    "Mads: It's one rank over you. Contracts usually are, for the ones that matter. Don't let it get its teeth round your ward."
  ],
  a1_mads_wait: [
    "Mads: Millrace is out the back of your own house. You don't need a map, you need to get going.",
    "Mads: Grass round the Ford's crawling with Tin wilds. Beat a few first if your hands are shaking."
  ],
  a1_board_ford: [
    "CONTRACTS — BRINDLE FORD",
    "[Copper] Wild in the Calder millrace. Wheel stopped. Pay: 4 marks and a sack of flour. TAKEN — Calder.",
    "[Tin] Ember mice in Hesk's woodpile. Again.",
    "[Iron] Escort, river barges to Hollin's Cross. Needs two."
  ],
  a1_dad_after: [
    "Dad: A licence. My child, a binder.",
    "Dad: The back gate's unlatched. If that thing goes for you, you run. A ward's not worth your neck."
  ],
  a1_sign_gate_locked: ["The mill's back gate is latched. Dad keeps it shut while something's in the race."],

  /* ---------- 2. Your Own Millrace ---------- */
  a1_gullet: [
    "The water in the race is black and very still.",
    "Then it opens. A mouth like a sluice-gate, rings of glassy teeth, a body thick as the millwheel's axle.",
    "Wren: Gullet. That's what Dad calls it. Hi, Gullet.",
    "Wren: Time to leave our wheel alone."
  ],
  a1_gullet_win: [
    "The wild thrashes once and folds down into light. A card settles on the wet stones.",
    "Behind you, wood groans. Then, slowly, the millwheel begins to turn.",
    "Wren: Bound. My first real binding.",
    "Wren: ...Sorry, Gullet. You'll get more eels in the deck than you ever got in the race."
  ],
  a1_dad_wheel: [
    "Dad: Listen to that. She's turning sweet as the day your mother built her.",
    "Dad: Mads'll want to hear. Go on. I'll bake you something that isn't burnt."
  ],
  a1_lost_ford: ["Your ward shatters. You wake by the mill hearth, aching, with Dad pretending he wasn't worried."],

  /* ---------- 3. Copper ---------- */
  a1_mads_copper: [
    "Mads: Wheel's turning. I can hear it from here. Well done.",
    "Mads: Give me that licence. ...There. Copper. Brindle Ford's newest, and only, Copper.",
    "Wren: I thought it'd feel bigger.",
    "Mads: It never does. Feels bigger when someone's alive because of it. Today, that's a miller and a sack of flour.",
    "Mads: Road north's open to you now. There's a hunter out there clearing the Millrace Road, Holdfast lad. Say hello. Don't start anything.",
    "Mads: And Tilly's been on about a chained box up past the grass. Old Covenant seal. If it opens for you, it's yours."
  ],
  a1_mads_road: [
    "Mads: Road goes north to the old Weir Vault, and east to Hollin's Cross. The Vault's sealed. Leave it be.",
    "Mads: Hollin's Cross has a proper hall. Jory Fenn runs it. Tell him I said you're not useless."
  ],
  a1_board_ford_copper: [
    "CONTRACTS — BRINDLE FORD",
    "[Copper] Calder millrace. DONE — Calder. Wheel turning. Flour collected (mostly).",
    "[Copper] Wild advisory, Millrace Road. A Holdfast hunter is working it. Coordinate.",
    "[Steel] ALL STEEL HUNTERS: report to the eastern border posts. By order of the Covenant council."
  ],
  a1_tilly_copper: [
    "Tilly: COPPER! You're COPPER! Next you'll be Iron, and then Steel, and then...",
    "Tilly: Can I hold the licence? I won't laminate it. I don't even know what that means."
  ],

  /* ---------- 4. The Road ---------- */
  a1_sign_road: ["MILLRACE ROAD. North: Weir Vault (SEALED). East: Hollin's Cross. South: Brindle Ford."],
  a1_sign_vault_closed: ["COVENANT SEAL. The Weir Vault is closed by order of the Covenant. Wild activity. Steel rank and above only."],
  a1_brann: [
    "Brann: Whoa, there. Fresh Copper, by the shine on that licence.",
    "Brann: Brann Holloway, out of Holdfast. I'm clearing this road, and I'd hate to clear you by accident.",
    "Brann: Tell you what. Friendly duel. Show me that deck can take a hit, and I'll know you can walk this road."
  ],
  a1_brann_win: [
    "Brann: Ha! Ward's down. That's a proper hit, that is.",
    "Brann: You'll do, Calder. You'll do fine."
  ],
  a1_brann_after: [
    "Brann: In Holdfast we say a hunter's only as good as the wall behind them. Glad to have a wall, today.",
    "Brann: That chained box up north? Older than me, that seal. Whoever bound what's inside didn't want it found easy."
  ],
  a1_dove: [
    "Dove: Did he do the 'friendly duel' speech? He does it to everyone. He did it to me, the day we met.",
    "Dove: Dove Holloway. Wind. I'm the brains. He's the wall, and the snoring.",
    "Brann: I don't snore.",
    "Dove: We're for Hollin's Cross. Jory Fenn's got more contracts than hunters, these days. Walk with us, if you're going."
  ],
  a1_dove_after: ["Dove: Hollin's Cross is east. Follow the cart ruts, and the smell of cider."],
  a1_chest_chained: [
    "The chains are old and green with river-damp, but the Covenant seal on the lock knows a licence when it feels one.",
    "It clicks open."
  ],

  /* ---------- 5. Hollin's Cross ---------- */
  a1_cross_arrival: [
    "Hollin's Cross: a market at the meeting of three roads, loud with cider-sellers and goat bells.",
    "Then the noise stops. Everyone is looking up.",
    "A sky-skiff drops out of the clouds, white sails snapping, and lands on the hall roof without a bump.",
    "A man steps off it, silver-blue coat, hair like a gale had styled it. He doesn't use the stairs. He just steps down.",
    "He plucks a notice off the board, gold-sealed, one you couldn't even read from here, and winks at a child.",
    "Then the skiff is gone, and so is he.",
    "Brann: That was Aeris Calloway. That was an Exalted.",
    "Dove: Took a Gold contract like it was a grocery list.",
    "Wren: ...One day.",
    "Dove: One day. Today you've got the Copper board, same as us."
  ],
  a1_jory: [
    "Jory: Mads's Copper, is it? He sent a bird. Said, and I quote, 'not useless'.",
    "Jory: High praise from Mads. I've got contracts stacked to the rafters and half my hunters sent east.",
    "Jory: Get your feet under you. Talk to me when you're ready for real work."
  ],
  a1_jory_wait: ["Jory: There's a loudmouth Pyrrhen rookie by the board, telling everyone he's Steel material. Somebody take him down a peg, will you?"],
  a1_market_1: ["Cider seller: Three marks a jug. Two for hunters. One if you clear the wasps out of Greyapple, they've had half my apples."],
  a1_market_2: ["Old woman: Those red-coat soldiers stand at the wells all day. Say they're keeping wilds off them. Never saw a wild at a well in my life."],
  a1_market_3: ["Child: Did you SEE him? Aeris Calloway! He winked at ME. I'm never washing my face again."],
  a1_sign_broadsheet: [
    "THE HEARTHVALE CRIER — Pyrrhen Dominion sends 'relief columns' to wild-struck border towns. Regent Vexis: 'A neighbour's duty.'",
    "Below, in smaller print: Covenant council 'monitoring the situation'."
  ],
  a1_davor: [
    "Captain Davor: Good morning, hunter. Captain Davor Varrane, Third Relief Column of the Pyrrhen Dominion.",
    "Captain Davor: We're here to help. Wild sightings are up all over the Hearthvale. Somebody has to keep the wells safe.",
    "Captain Davor: Your Covenant is stretched so thin. We'll stay as long as we're needed. However long that is."
  ],
  a1_davor_pell: [
    "Captain Davor: You've met my little brother, I see. Pell always did prefer the Covenant to his family's colors.",
    "Captain Davor: Tell him Father asks after him. He'll pretend he didn't hear."
  ],
  a1_pell: [
    "Pell: Another Copper. The Hearthvale's lousy with them. Do they hand licences out with the flour?",
    "Pell: Pell Varrane. Remember the name, it'll be on the Gold board within the year.",
    "Pell: You want the Greyapple contract? Earn it. Duel me for it."
  ],
  a1_pell_win: [
    "Pell: That... was a fluke. My draw was garbage.",
    "Pell: Fine. FINE. Take the orchard. I've got better things to do than wasps."
  ],
  a1_pell_after: [
    "Pell: Stop looking at me like that. I'm not sulking. Varranes don't sulk.",
    "Pell: ...Your Reactions are sloppy. You held Energy back and then never used it. Just saying."
  ],
  a1_jory_orchard: [
    "Jory: You beat the Varrane boy? Good. He'll be insufferable for a week, but good.",
    "Jory: Greyapple Orchard, east road. Pim Greyapple's had wasps. Fire wasps, Copper rank, a nest or two.",
    "Jory: Brann, Dove, take the Calder kid. Three Coppers on a Copper contract is generous, which is how I like it.",
    "Brann: Wasps. I hate wasps.",
    "Dove: He's scared of wasps.",
    "Brann: I'm WARY of wasps."
  ],
  a1_sign_orchard_closed: ["The east road is busy with carts and red-coat patrols. You've no reason to head that way yet."],

  /* ---------- 6. Worse Than the Notice Said ---------- */
  a1_pim: [
    "Pim: You're the hunters? Thank the leylines. Look at my trees. Scorched from the roots up.",
    "Pim: And the ground hums. All night. Like something big's breathing under the orchard.",
    "Pim: The notice said wasps. I wrote the notice. I'm starting to think I wrote it wrong."
  ],
  a1_pim_after: ["Pim: The trees'll come back. Apples are stubborn. So are orchardists."],
  a1_mother: [
    "At the heart of the orchard, the ground is split. A crack of raw orange light, humming.",
    "Dove: That's not a nest. That's a rift. A small one, but a rift.",
    "Something climbs out of it, wasp-shaped and wrong, as big as a cart horse, its abdomen glowing like a kiln.",
    "Around it, the brood pours out of the crack. Dozens.",
    "Brann: Right. Change of plan. Dove, the brood's ours.",
    "Dove: Calder. The big one's yours. Keep it off us and we'll keep them off you.",
    "Wren: That's two ranks of wild for a Copper contract.",
    "Brann: Then it's a story for the hall, isn't it? GO!"
  ],
  a1_mother_win: [
    "The Cinder Mother folds into a card with a sound like a kiln door slamming.",
    "The rift gutters. Without its mother it can't hold. It closes like an eye.",
    "Brann and Dove stagger out of the smoke, singed, coughing, and laughing.",
    "Dove: Brann got stung.",
    "Brann: I was WARY, and I got stung anyway. Says something about wasps.",
    "Wren: We closed a rift. Three Coppers closed a rift.",
    "Dove: A small one. Don't tell Jory it was small."
  ],
  a1_lost_cross: ["Your ward shatters. You come to on a cot in the Hollin's Cross hall, with Jory's coat over you."],

  /* ---------- 7. Iron ---------- */
  a1_jory_iron: [
    "Jory: Copper wasps, the notice said. Pim's notice. I'm framing it.",
    "Jory: A rift-mother. Iron rank, near enough Steel. Three Coppers. Give me those licences.",
    "Jory: Iron. All three of you. Mads'll be insufferable.",
    "A runner bursts through the door, mud to the knees.",
    "Runner: Message from Brindle Ford! The Weir Vault seal's broken. Wilds pouring down the Millrace Road!",
    "Runner: Mads says every Steel hunter's gone east to the border. He says, and I quote, 'you three are what I've got.'",
    "Wren: The Vault. Right above home.",
    "Brann: Then we go. Now."
  ],
  a1_pell_joins: [
    "Pell: A broken vault. A seal-breach. You know what they pay for a seal-breach?",
    "Dove: Nobody invited you, Varrane.",
    "Pell: Nobody had to. You need Fire, and I'm the best Fire in this hall. Don't make it weird.",
    "Brann: He's coming, isn't he.",
    "Wren: He's coming."
  ],
  a1_jory_after: ["Jory: The Vault's north of the Millrace Road. Go. And come back, the paperwork for dead Irons is a nightmare."],

  /* ---------- 8. The Weir Vault ---------- */
  a1_gate_hollow: [
    "The Covenant seal on the Vault door is cracked. Not from inside. Someone broke it from out here.",
    "A figure stands in the doorway, grey-robed, hood down. Their eyes are calm in a way that makes your skin crawl.",
    "???: You're the hunters. You're late.",
    "???: The wilds were here first, you know. Before your Covenant. Before your crowns. Before the Founding Circle locked them in the dark.",
    "???: We're only opening doors. The world remembers what it's supposed to be.",
    "Dove: Hollow. You're one of the Hollow.",
    "???: We're all hollow, hunter. Some of us have stopped pretending.",
    "Then the figure steps backward into the river mist, and is gone."
  ],
  a1_sign_seal: ["The seal-stone is split clean through. Scratched beside it, a circle with nothing in the middle."],
  a1_lost_vault: ["Your ward shatters. Brann carries you out to the Vault gate. You wake to Dove counting your fingers."],
  a1_edda_1: [
    "A page in oilcloth, nailed to the wall. The hand is neat and impatient.",
    "'Flood year. The serpent under the Brindle weir has woken hungry. It has taken two barges and a bridge.'",
    "'The Covenant wants it dead. I'd rather not.'",
    "'It struck only at what struck it, for two hundred years. That's more than most men manage.' — E. Calder"
  ],
  a1_edda_2: [
    "Another page, water-stained.",
    "'Bound it. Took three days and most of my eyebrows. The card is too strong to carry and too old to waste.'",
    "'So I'm building it a house. Locks of water and stone, and a warden to keep the door.' — E. Calder"
  ],
  a1_edda_3: [
    "'If you're reading this, either the seal has failed, or you are a Calder. Possibly both. That would be very like us.'",
    "Wren: E. Calder. Edda Calder. That's... Dad's grandmother. She was a hunter?",
    "Pell: Your family owns a vault? And you were mucking out the millrace?",
    "Wren: Nobody ever told me. Nobody ever said."
  ],
  a1_vault_banter: [
    "Brann: Whole place hums. Like the orchard, only older.",
    "Dove: Like a held breath.",
    "Pell: If something down there has a crown, I'm calling it. My kill.",
    "Wren: It's not a kill. It's a binding. Edda didn't kill it. We're not going to either."
  ],
  a1_warden: [
    "The last hall opens onto a still black pool. Before it stands a figure of stone and running water, taller than the mill.",
    "Its chest is carved with the Calder mark. It turns its head, slowly, toward you.",
    "Wren: Edda's warden. Still keeping the door.",
    "In the pool behind it, something enormous shifts. Smaller shapes boil up out of the water: the serpent's brood, stirred by the breach.",
    "Brann: Brood again! Dove, Varrane, with me!",
    "Pell: Don't give me orders, Holloway... but yes. With you.",
    "Dove: Calder! The warden's yours. It's your family's door. Go knock."
  ],
  a1_warden_win: [
    "The Sluicewarden sinks to one knee. The water running through it slows to a trickle.",
    "It doesn't break. It bows. Then it steps aside from the pool.",
    "Behind you, the brood scatters into the dark water. Brann's laughing. Pell's swearing. Dove's counting heads.",
    "Dove: Everyone's here. Everyone's fine. Pell lost an eyebrow.",
    "Pell: I did NOT. ...Did I?"
  ],
  a1_slackwater_bind: [
    "At the edge of the pool there's a stone casket, the Calder mark on its lid, warm to the touch.",
    "Inside is a single card. Under its surface, something long and patient coils and uncoils.",
    "Slackwater, the Weir Serpent.",
    "It never struck first. It never needed to."
  ],
  a1_edda_last: [
    "Folded under the casket, a last page.",
    "'To the Calder who finds this: it's yours now. It doesn't want a fighter. It wants someone who can wait, then answer.'",
    "'Build around it, and it'll guard you as it guarded the weir. Mind the Hollows. Mind the crowns. Mind everyone, really.' — Edda"
  ],
  a1_rebuild_hint: [
    "Wren: It wants Reactions. Patience. Water that holds back and hits back.",
    "Wren: None of my deck works like that. Not yet."
  ],

  /* ---------- 9. The Lantern ---------- */
  a1_seraphine: [
    "Outside, the Millrace Road is quiet. Too quiet. The wilds that poured from the Vault are gone, every one.",
    "In their place, the grass is frosted with light: green and gold, like the sky in winter.",
    "A woman is waiting at the gate, kneeling to check on a frightened carter. She stands as you come out.",
    "You know her. You'd know her anywhere.",
    "Seraphine: You must be the hunters Mads Orrin sent. Brann Holloway. Dove. Pell Varrane, your mother writes to me, you know.",
    "Seraphine: And you. The little one on the mill roof. You held your ground. Look at you.",
    "Wren: You... remember?",
    "Seraphine: I remember everyone I couldn't save, and everyone I could. It helps to remember the second kind.",
    "Seraphine: I came as soon as I heard about the breach. You'd already done the hard part. The wilds outside were the easy part.",
    "Seraphine: Tell me. Was anything taken from the Vault?",
    "Wren: The serpent. Slackwater. I bound it. My great-grandmother sealed it here.",
    "For a moment she says nothing. The light on the grass flickers.",
    "Seraphine: Edda Calder. Of course. Then it's in good hands.",
    "Seraphine: Keep it close.",
    "She lifts one card toward the broken seal. The stone knits closed like it was never cracked.",
    "Seraphine: Go home, Iron. Your Ford will want to see you. I'll put a word in with the council about all of you."
  ],
  a1_homecoming: [
    "Brindle Ford, at dusk. The wheel is turning. Somebody has strung lanterns across the river road.",
    "Tilly: You met SERAPHINE? The actual Seraphine? Did she say anything about me? I'm going to be her, you know.",
    "Wren: She said... to keep it close.",
    "Dad: Edda's vault. I always thought Gran was making that up. Said she was a hunter, once. I thought she meant fish.",
    "Mads: Iron, all of you. And a seal-breach turned back. Hall's never had a day like it.",
    "Mads: Bad news with the good, though. Read this.",
    "THE HEARTHVALE CRIER — PYRRHEN COLUMNS CROSS INTO THE HEARTHVALE 'TO PROTECT IT.' Covenant council: no comment.",
    "Mads: They're two days from the Ford. Saying they're here to help.",
    "Dove: We're heading for Saltmere. The League's buying hunters for its river towns, and they pay in silver. Come with us, Wren.",
    "Brann: Somebody's got to stand behind us. A wall needs a wall.",
    "Pell: I'm going to Saltmere anyway. For unrelated reasons. Don't flatter yourselves.",
    "Mads: Go on. The Ford'll keep. That's what the Ford does.",
    "Wren: ...Saltmere, then."
  ],
  a1_end: [
    "End of the Act I demo.",
    "Wren Calder: Iron rank. Binder of Slackwater, the Weir Serpent.",
    "Next: Act II — The Wider World."
  ]
});
