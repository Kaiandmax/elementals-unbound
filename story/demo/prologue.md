# Demo: Prologue, "The Ford"

Owner: Story. **Status: ready for Game Dev.** This replaces the first demo (`act1.md`) at the designer's request (2026-10-25):

- slower;
- Wren stays Tin the whole way;
- several contracts before the first promotion;
- the promotion is a big deal;
- no Weir Vault in the demo;
- better dialogue.

Every word on screen is in [`story/data/prologue.js`](../data/prologue.js), with keys starting `pro_`.

`act1.md` and `data/act1.js` stay in the repo only until the maps switch to these keys. Their later parts (Hollin's Cross, the orchard, the Weir Vault) belong to Act I proper, which comes after this demo, and will be rewritten to the same standard when Act I is built.

It follows [`story/bible.md`](../bible.md). One fixed story, with no branching.

## What the player should feel

- **New at the job.** Wren has a licence and a borrowed deck, and doesn't know how anything works yet. Mads teaches by sending Wren out, not by lecturing.
- **The world is big and wild.** Brindle Ford is a walled river town at the edge of untamed country. Everything past the fields is dangerous, and the Tin contracts keep Wren close to home on purpose.
- **Contracts are about people.** An old man's woodpile, a farm that can't pay, a crew that needs someone to carry the bags, letters for a toll-keeper.
- **The world moves above you.** Steel hunters are called east. A Pyrrhen army is camped at the toll bridge. An Exalted's sky-skiff passes overhead without stopping.
- **Promotion is earned.** Four contracts, then a Copper assessment with a witness, then the hall votes, then the token is pinned on in front of the town.

**Target length:** 75–100 minutes, with the wild duels a player fights along the way.

## Geography (for the large Hearthvale region)

Brindle Ford sits on the **River Brindle**, where the river is shallow enough to wade, at the north end of the Hearthvale. It is the last walled town before wild country.

| Direction | What's there | In the demo |
|---|---|---|
| Town | A timber palisade with two gates; about forty houses; the market square; the **Covenant branch hall**; **Calder Mill** on the millrace at the north wall; **Hesk's yard** by the east gate | Open from the start |
| South | Strip fields, then **Pruett's Farm**, alone at the edge of the **Lowfen** marshes | Open after the licence |
| North | The **Millrace Road** runs up the river past the carters' hut and the old **Weir Vault** (sealed, out of the demo), into the hills | Open for contract 3 |
| East | The **Toll Road** crosses **Brennock Heath**, open moor with standing stones, to the toll bridge at **Ketter's Crossing** on the River Ash | Open for contract 4 |
| West | **Sallow Wood**, old willow and alder forest. Tins may not pass the **Waymark Stone** | Edge only; deeper parts are a teaser for later |

Danger rises with distance from the walls:

- **Inside the walls:** no wilds.
- **The fields:** Tin wilds.
- **The roads:** Tin wilds, with Copper wilds roaming off the road, visible and best avoided.
- **Sallow Wood past the Waymark Stone:** Copper and above. A sign says so.

## Quests (journal titles and objectives)

| # | Title | Objectives, in order | Done when |
|---|---|---|---|
| 0 | **Licence Day** | Go to the branch hall. → Speak with Mads. | `pro_licensed` |
| 1 | **Ember Mice** (Tin) | Find Hesk's woodpile by the east gate. → Drive out the ember mice. → Report to the hall ledger. | `pro_q1_done` |
| 2 | **The Pruett Well** (Tin) | Go south to Pruett's Farm. → Find what is fouling the well. → Report to the hall ledger. | `pro_q2_done` |
| 3 | **Tail on a Copper Hunt** (Tin, crew) | Meet Brann and Dove at the north gate. → Follow them up the Millrace Road. → Keep the stragglers off them. → Report to the hall ledger. | `pro_q3_done` |
| 4 | **Letters for Ketter's Crossing** (Tin) | Take the hall's letters east across Brennock Heath. → Deliver them to the toll-keeper, Orla Ketter. → Bring back her reply. | `pro_q4_done` |
| 5 | **Assessment: The Calder Millrace** (Copper) | Prepare your deck. → Meet your witness at the mill. → Bind the wild in the millrace. → Return to the hall for the vote. | `pro_rank_copper` |

Optional Tin contracts on the board (`pro_board_2`, from the assessment talk on): **Sparks in the Thatch**, an ember wild on the roofs of Mill Lane (`pro_thatch`, `pro_thatch_win`), and **Pruett's Lost Ewe**, at the Sallow Wood edge just inside the Waymark Stone (`pro_ewe`, `pro_ewe_win`). Both are Tin wild duels.

## Beat by beat

*When* is the flag condition for a line or NPC.

### 0. Cold open (new game only)

- **`pro_intro`** plays on black with the fire's glow: eight-year-old Wren, the Ford burning, a crowned Fire wild, and Seraphine walking out of the smoke. Then the title card and "Ten years later."
- The deck pick then reads as Mads lending a deck, using **`pro_pick_deck`**. The gender pick goes here when it's built; the demo text uses no pronouns for Wren.

### 1. Licence Day

- **Calder Mill:** Dad (`pro_dad_morning`). The wheel keeps stopping, which sets up the assessment. The window sign shows `pro_sign_wheel`.
- **Town:** Tilly (`pro_tilly_morning`), Hesk (`pro_hesk_morning`), the notice post at the north gate (`pro_sign_north_closed`), and the hall sign (`pro_sign_hall`). The Waymark Stone at the Sallow Wood edge reads `pro_sign_waymark`. A lost duel anywhere wakes Wren at the mill with `pro_lost`.
- **Branch hall:** Mads plays **`pro_mads_licence`**, which swears Wren in and explains the three rules. It sets `pro_licensed`. The board shows `pro_board_1`.
- After that, talking to Mads again gives `pro_mads_hint_1`.

### 2. Contract 1: Ember Mice (Tin)

- **Hesk's yard:** Hesk plays `pro_hesk_mice`. The mice are a Tin wild duel (`pro_mice`). A win plays `pro_mice_win` and sets `pro_mice_beaten`.
- **Back at the hall:** Mads plays **`pro_mads_report_1`** at the ledger, covering how reporting and pay work. It sets `pro_q1_done`.

### 3. Contract 2: The Pruett Well (Tin)

- **Mads gives the contract:** `pro_mads_well`. The south gate opens.
- **Pruett's Farm:**
  - Nan Pruett (`pro_nan`) and her grandson Abel (`pro_abel`). The well-sprite is a Tin wild duel (`pro_sprite`); a win plays `pro_sprite_win` and sets `pro_sprite_beaten`.
  - After the win, Nan says `pro_nan_after`. She can't pay much and gives Wren eggs.
- **Back at the hall:** Mads plays **`pro_mads_report_2`**, about who pays when a farm can't. It sets `pro_q2_done`.

### 4. Contract 3: Tail on a Copper Hunt (Tin, crew)

- **Arrival:** when the player enters the hall *with `pro_q2_done`*, **`pro_brann_dove_arrive`** plays. Brann and Dove, Copper hunters from Holdfast, have a Copper contract: a gale-hound pack hitting carters on the Millrace Road. Mads assigns Wren as their tail.
- **North gate:** the gate opens, and `pro_dove_brief` explains what a tail does.
- **Millrace Road:**
  - Tin wilds on the road. Two young gale-hounds are Tin duels: `pro_hound_1` and `pro_hound_2`, with win lines `pro_hound_win`.
  - At the carters' hut, **`pro_pack_leader`** plays. Brann and Dove take the pack leader (Copper) in a scene while Wren keeps the last straggler off them. That's a Tin duel, `pro_straggler`, and its win line `pro_straggler_win` sets `pro_pack_done`.
  - The chained chest is on this road (card `water_tidecaller_shaman`). Opening it plays `pro_chest_chained`; Dove explains old hunter caches.
  - The Weir Vault turn-off is sealed: `pro_sign_vault`.
- **Back at the hall:** Brann reports for all three, **`pro_report_3`**, and sets `pro_q3_done`. Brann and Dove stay in the Ford on a follow-up contract (`pro_brann_idle`, `pro_dove_idle`).

### 5. Contract 4: Letters for Ketter's Crossing (Tin)

- **Mads gives the contract:** `pro_mads_letters`. The east gate opens.
- **Brennock Heath:** the road is Tin; Copper wilds roam off the road. Signs: `pro_sign_heath`.
  - Halfway across, one time only, **`pro_skiff`** plays: a white sky-skiff passes high overhead, heading east without stopping. Aeris Calloway, an Exalted, though Wren only learns that from Orla.
- **Ketter's Crossing:**
  - Orla Ketter (`pro_orla`) takes the letters and gives a reply.
  - A Pyrrhen relief column is camped by the bridge. Captain Davor Varrane (`pro_davor`) is polite, and his soldiers have taken over the toll-house yard.
  - A soldier at the bridge: `pro_soldier`.
- **Back at the hall:** **`pro_report_4`** sets `pro_q4_done`. Mads reads Orla's reply and goes quiet.

### 6. Assessment: The Calder Millrace (Copper)

- **At the hall**, *with `pro_q4_done`*, Mads plays **`pro_mads_assessment`**: four contracts done, time for the assessment. He explains the rules: one Copper-rank binding under a witness, then the hall votes. The posted Copper contract is the wild in the Calder millrace, the one stopping Dad's wheel. Brann is the witness. Mads tells Wren to get ready first; this is the moment to visit the board (`pro_board_2`, with the optional contracts) and the grass. This sets `pro_assess`.
- **Calder Mill**, *with `pro_assess`*: Dad, `pro_dad_assessment`.
- **The Millrace:** Brann waits at the back gate (`pro_brann_witness`). Gullet is the boss duel: `pro_gullet`, then the crown line `pro_gullet_crown`, the phase-break line `pro_gullet_break1`, and the win line `pro_gullet_win` (sets `pro_beat_gullet`).
- **The ceremony.** Back at the hall, *with `pro_beat_gullet`*, **`pro_ceremony`** plays. The hall is full: Dad, Tilly, Hesk, Nan Pruett. Mads reads the ledger record of all five contracts aloud, the hunters present vote, and Mads pins on the copper token. This sets `pro_rank_copper` (Copper in the HUD). After this, Tilly says `pro_tilly_after`.
- **That evening at the river landing**, **`pro_pell_arrives`** plays: Pell Varrane gets off a barge with a notice. Hollin's Cross needs Coppers. It sets up Act I.
- **At home**, **`pro_dad_evening`**: Dad mentions that Wren's great-gran Edda used to say she was a hunter. That plants the Weir Vault.
- **End card**, **`pro_end`**, sets `pro_done`.

## Fights

All numbers belong to Balance and the AI levels follow the designer's table. These are Story's proposals.

| Fight | Rank (vs Wren) | Proposed deck / AI / life | Notes |
|---|---|---|---|
| Field and road wilds | Tin (=) | Starters, L1–2, −5 | Roaming and visible. Copper wilds roam off the roads: mono commons, L2, −5. |
| Ember mice | Tin (=) | `fire_starter`, L1, −5 | Teaches the basic duel. |
| Well-sprite | Tin (=) | `water_starter`, L1, −5 | |
| Young gale-hounds ×2, straggler | Tin (=) | `wind_starter`, L2, −5 | The pack leader is Brann and Dove's, shown in a scene. |
| **Gullet, the Millrace Lurker** (assessment) | Copper (+1) | `water_tide`, L3, boss bars [8], slow start, **Lurker** | Already built as `a1_gullet` in `rpg/encounters.js`; the same fight can be reused. |

## Engine notes (Game Dev)

Everything here uses what's already built:

- flags with `when` / `unless`;
- talk that `sets` a flag;
- talk variants;
- one-time scenes;
- the intro and the end card;
- rank in the HUD (Tin until `pro_rank_copper`).

On top of that: **quest journal entries** from the table above, in whatever format the journal takes. Tell me the shape and I'll write the data. Copper wilds roaming off-road on the heath show the danger without a lecture.
