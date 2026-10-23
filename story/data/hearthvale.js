/* Story text for the Hearthvale prototype maps (town = Brindle Ford, route1 = the Millrace Road).
   Owned by Story; see story/bible.md. Overrides the placeholders in rpg/maps.js at build time. */
Object.assign(RPG_TEXT, {
  elder: [
    "Mads: So you're the Calder kid with the borrowed deck. Tin rank, ink still wet on the licence.",
    "Mads: Tall grass round the Ford's been crawling with wilds since spring. Little ones, mostly. Mostly.",
    "Mads: Walk in, one'll come at you. Beat it, bind it, and you've done more good today than half the Covenant.",
    "Mads: When you can walk the grass without flinching, take the Millrace Road north. And come back alive. Paperwork's a pain otherwise."
  ],
  kid: [
    "Tilly: Wren! Wren! There's a box on the Millrace Road, up past the grass, top left, all wrapped in old chain!",
    "Tilly: Gramps says a hunter hid it there before I was born and never came back. Do you think something's in it?"
  ],
  parent: [
    "Dad: Mads came by. Says you passed. My child, a binder.",
    "Dad: Eat something before you go. And Wren, if it turns on you, run. A ward's not worth your neck. Come home and you'll wake up in your own bed."
  ],
  sign_town: ["BRINDLE FORD — Covenant branch hall. North: the Millrace Road."],
  sign_route1: ["MILLRACE ROAD. Beyond: the old Weir Vault. Covenant notice: CLOSED, wild activity. Steel rank and above only."],
  hiker: [
    "Brann: Hold up, Tin. You're on my contract road. Came all the way down from Holdfast for this contract, I did.",
    "Brann: Tell you what. Show me that deck can take a hit, and I'll let you pass."
  ],
  hiker_after: [
    "Brann: Not bad for a Tin. Steady hands.",
    "Brann: That chained box up north? Old Covenant seal on it, older than me. Whoever bound what's inside didn't want it found easy."
  ],
  hiker_win: ["Brann: Ward's down. Fair duel, Tin. Don't let it go to your head."],
  lost: ["Your ward shatters. You come to in Brindle Ford, aching but whole."],
  chest_empty: ["The chains hang loose. Whatever was sealed here is yours now."]
});
