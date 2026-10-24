# Act I demo: "Notice Boards"

Owner: Story. **Status: ready for Game Dev.** This is the playable demo of the prologue and Act I, the designer's first walk through the world and story. Every word on screen is in [`story/data/act1.js`](../data/act1.js) (keys start with `a1_`). This file is the build spec: maps, beats, triggers, flags and fights.

Follows [`story/bible.md`](../bible.md). One fixed story with no branching.

## What the player should feel

- **Small-time.** Your first contract is your own family's millrace. Rank goes Tin, then Copper, then Iron, and each promotion feels earned.
- **The world moves above you.** An Exalted lands in a market square, takes a contract you can't even read, and is gone. A Pyrrhen army column "protects" a town. You hear about it and can't touch it.
- **The core fantasy.** At the bottom of the Weir Vault you bind **Slackwater, the Weir Serpent**, a card that wants a deck you don't have yet.
- **People.** Mads, Dad and Tilly at home. Brann and Dove as the first crew. Pell as the rival you can't stand and kind of like.
- **A seed of doubt.** Seraphine arrives after the danger is over, is wonderful, and asks one question a beat too carefully.

**Target length:** 45–75 minutes, including the wild duels a player fights on the way.

## Flow at a glance

| # | Chapter | Where | Rank | Ends with | Flag set |
|---|---|---|---|---|---|
| 0 | Cold open | Black screen, text | — | Seraphine walks out of the smoke | — |
| 1 | The Licence | Calder Mill, Brindle Ford, Branch Hall | Tin | Mads gives Wren a licence and a first contract | `a1_licensed` |
| 2 | Your Own Millrace | The Millrace (behind the mill) | Tin | **Boss:** Gullet, the Millrace Lurker | `a1_beat_gullet` |
| 3 | Copper | Branch Hall | Tin → **Copper** | Promotion, and the road north opens | `a1_rank_copper` |
| 4 | The Road | Millrace Road | Copper | Duel with Brann; meet Dove | `a1_beat_brann` |
| 5 | Hollin's Cross | Market town | Copper | Aeris lands and leaves; Pyrrhen column; duel with Pell; the orchard contract | `a1_beat_pell`, `a1_orchard_taken` |
| 6 | Worse Than the Notice Said | Greyapple Orchard | Copper | **Boss:** the Cinder Mother (Brann and Dove hold the brood) | `a1_beat_mother` |
| 7 | Iron | Hollin's Cross hall | Copper → **Iron** | Promotion; news that the Weir Vault seal broke | `a1_rank_iron` |
| 8 | The Weir Vault | Vault gate, two floors | Iron | **Boss:** the Sluicewarden; bind **Slackwater** | `a1_beat_warden`, `a1_slackwater` |
| 9 | The Lantern | Vault gate, then Brindle Ford | Iron | Seraphine reseals the vault; homecoming; end card | `a1_done` |

## Maps

The maps are Game Dev's to lay out; this is what each one needs. Names are what the HUD shows.

| Map id (suggested) | Name | Kind | Must contain |
|---|---|---|---|
| `house` (exists) | Calder Mill | Interior | Dad (`a1_dad`); a millwheel window sign (`a1_sign_wheel`) |
| `town` (exists) | Brindle Ford | Town | Branch hall door; Tilly; Old Hesk (gossip); the mill's back gate to the Millrace; tall grass (Tin wilds); north exit to Millrace Road, **blocked until `a1_rank_copper`** (Mads's notice on a post: `a1_sign_ford_north`) |
| `hall_ford` (new) | Brindle Ford Branch Hall | Interior | Mads at the counter; the notice board (`a1_board_ford`, text changes with flags) |
| `millrace` (new, small) | The Millrace | Small outdoor | Water channel; Gullet as a "trainer" NPC at the sluice (talk starts the boss) |
| `route1` (exists) | Millrace Road | Route | Tall grass (Copper wilds); Brann (trainer); Dove after the duel; the chained chest (exists); north to the Weir Vault gate (sealed until chapter 8); east to Hollin's Cross |
| `cross` (new) | Hollin's Cross | Market town | Hall master Jory Fenn; Pell (trainer); a Pyrrhen officer (Captain Davor Varrane); market NPCs; the landing post where Aeris appears (scene); east to the orchard |
| `orchard` (new) | Greyapple Orchard | Outdoor | Orchardist Pim; tall grass (Copper wilds, Fire-heavy); the rift at the center: the Cinder Mother (boss NPC) with Brann and Dove beside it after the scene |
| `weir_gate` (new, or the north end of `route1`) | The Weir Vault | Outdoor | The broken seal (sign); the Hollow figure (scene, then gone); vault door |
| `vault1` (new) | Weir Vault: Sluice Halls | Dungeon | Drowned corridors (water tiles); "tall grass" as **shallow water** (Iron wilds); three of Edda's journal pages (signs); stairs down |
| `vault2` (new) | Weir Vault: Slack Pool | Dungeon | The Sluicewarden (boss) blocking the pool; past it, Slackwater's chest (**Manifest**, card from TCG Design) and Edda's last page |

## Beat by beat

Keys in `code` are `RPG_TEXT` entries in `act1.js`. *When* is the flag condition for an NPC, sign or line to show.

### 0. Cold open (new game only, before the map)

- **`a1_intro`:** a text sequence on black, ideally with the fire's glow. Eight-year-old Wren on the mill roof, the Ford burning, a crowned Fire wild, and Seraphine walking out of the smoke. Then the title card, *Elementals Unbound*, then "Ten years later."
- The existing "pick your starter element" screen then reads as **"Mads lends you a deck"**: use `a1_pick_deck` as the prompt text. *Gender pick (designer decision) goes here too when Game Dev builds it. The demo text uses no pronouns for Wren, so it isn't needed yet.*

### 1. The Licence (Tin)

- **Calder Mill:** Dad (`a1_dad`) says the wheel has stopped again and something's in the race. Window sign: `a1_sign_wheel`.
- **Brindle Ford:**
  - Tilly (`a1_tilly`) wants to see Wren's licence. Hesk (`a1_hesk`) gossips about wild sightings doubling and "Pyrrhen carts on the east road".
  - The north exit is closed, with a Covenant post that says Tin hunters stay in the Ford (`a1_sign_ford_north`).
  - Tall grass has Tin wilds, so the player can try a duel straight away.
- **Branch Hall:** talking to Mads plays **`a1_mads_licence`** (sets `a1_licensed`). He gives Wren a licence and the first contract, the Calder millrace. Board: `a1_board_ford`.
- *When `a1_licensed`:* Dad says `a1_dad_after`, and the mill's back gate to the Millrace opens. Before that, the gate shows `a1_sign_gate_locked`.

### 2. Your Own Millrace (Tin, boss one rank up)

- **The Millrace:** Gullet lies in the sluice. Talking to it plays `a1_gullet` and starts the boss duel.
- On a win: `a1_gullet_win`, which sets `a1_beat_gullet`. The wheel turns again, and Dad has a new line, `a1_dad_wheel`.
- If the player loses, they wake up at the mill with `a1_lost_ford`.

### 3. Copper

- **Branch Hall**, *when `a1_beat_gullet`:* Mads plays **`a1_mads_copper`** (sets `a1_rank_copper`). Wren becomes a Copper hunter (show the rank in the HUD if possible). Mads hands over a road contract and mentions the chained box Tilly keeps talking about.
- *When `a1_rank_copper`:* the north exit opens, Tilly says `a1_tilly_copper`, and the board shows `a1_board_ford_copper`.

### 4. The Road (Copper)

- **Millrace Road:**
  - Brann blocks the path. His duel uses `a1_brann` before, `a1_brann_win` after a win, and `a1_brann_after` when you talk to him later. It sets `a1_beat_brann`.
  - *When `a1_beat_brann`:* Dove appears beside him with `a1_dove`. She takes the mickey out of Brann, and they're headed for Hollin's Cross too.
  - The chained chest (exists) uses `a1_chest_chained` on opening.
  - The Weir Vault turn-off is sealed until chapter 8, with `a1_sign_vault_closed`.
- Road signs: `a1_sign_road`.

### 5. Hollin's Cross (Copper)

- **Arrival scene**, the first time the player enters, **`a1_cross_arrival`:** a sky-skiff lands. **Aeris Calloway**, an Exalted, steps off, takes a contract from the board in one stride, and is gone. The crowd gasps, and Brann says "That's an Exalted." *(The scene trigger is Game Dev's: a one-time step trigger, or an NPC near the gate.)*
- **NPCs:**
  - Jory Fenn, the hall master (`a1_jory`).
  - A Pyrrhen column officer, Captain Davor Varrane (`a1_davor`): polite, "here to help", and his soldiers stand at every well.
  - Market folk: `a1_market_1`, `a1_market_2` and `a1_market_3`.
  - A broadsheet sign: `a1_sign_broadsheet`.
- **Pell Varrane** (trainer) is showing off by the board. His duel uses `a1_pell` before and `a1_pell_win` after a win, and sets `a1_beat_pell`; later he says `a1_pell_after`. **He is Davor's younger brother.** The player only learns this from the way Davor talks to him (`a1_davor_pell` *when `a1_beat_pell`*).
- **The contract**, *when `a1_beat_pell`:* Jory plays **`a1_jory_orchard`** (sets `a1_orchard_taken`). It's posted as Copper pests at Greyapple, and Brann, Dove and Wren take it together.
- The east exit to the orchard opens *when `a1_orchard_taken`*. Before that it shows `a1_sign_orchard_closed`.

### 6. Worse Than the Notice Said (Copper, boss one rank up)

- **Greyapple Orchard:**
  - Pim, the orchardist (`a1_pim`), talks about scorched trees and the hum underground.
  - Tall grass holds Fire-heavy Copper wilds.
- **At the center**, the Cinder Mother sits on a small rift. Talking to her plays **`a1_mother`**:
  - Brann and Dove see the brood and take it. *This is the companion side fight (designer decision).*
  - Wren takes the mother, and the duel starts.
- On a win, **`a1_mother_win`** (sets `a1_beat_mother`): the rift gutters out, and Brann and Dove are singed but laughing.

### 7. Iron

- **Back at Hollin's Cross**, *when `a1_beat_mother`:* Jory plays **`a1_jory_iron`**. All three of them are promoted to Iron, which sets `a1_rank_iron`.
- A runner bursts in. The **Weir Vault seal is broken**, wilds are flooding the Millrace Road, and every Steel hunter has been called east to the border.
  - Mads's message: "You three are what I've got."
- Pell overhears and invites himself along (`a1_pell_joins`).
- *When `a1_rank_iron`:* the Millrace Road has an Iron-flavoured wild table (wilds spilling out of the vault), and the Weir Vault turn-off is open.

### 8. The Weir Vault (Iron, boss one rank up)

- **The gate**, played once when the player arrives, **`a1_gate_hollow`:** the seal is cracked open from outside. A grey-robed figure stands at the door. It says the Hollow's creed and is gone (the NPC is removed after the scene). Sign: `a1_sign_seal`.
- **Sluice Halls:**
  - Shallow-water encounters (Iron wilds).
  - Three journal pages from **Edda Calder**, Wren's great-grandmother, who bound the serpent: `a1_edda_1`, `a1_edda_2` and `a1_edda_3`.
  - Wren realizes whose vault this is.
  - Banter at the stairs: `a1_vault_banter`.
- **Slack Pool:**
  - The Sluicewarden, a stone-and-water golem Edda built, blocks the pool. Talking to it plays **`a1_warden`**: Slackwater's brood stirs, and Brann, Dove and Pell take the brood while Wren takes the Warden.
  - On a win, **`a1_warden_win`** (sets `a1_beat_warden`).
  - Then the chest: **Slackwater, the Weir Serpent** (a Manifest, **the demo's loot card**). Opening it plays `a1_slackwater_bind`, the card reveal (exists), and sets `a1_slackwater`.
  - Edda's last page: `a1_edda_last`.
- *If the deck builder exists by then:* a prompt to rebuild around Slackwater (`a1_rebuild_hint`). If not, the hint line still plays as foreshadowing.

### 9. The Lantern (Iron)

- **Stepping out of the vault**, *when `a1_slackwater`*, plays **`a1_seraphine`**. **Seraphine Vael** is at the gate. The Hollow are gone, and she has already dealt with the wilds outside. She:
  - remembers Wren from the fire;
  - is kind to everyone, by name;
  - asks *was anything taken from the vault?*, then pauses on the answer and says *"Then keep it close."* **This is the planted clue.**
  - reseals the vault with one gesture.
- **Back in Brindle Ford**, the homecoming, **`a1_homecoming`**: Mads, Dad and Tilly. Then the broadsheet says Pyrrhen columns have crossed into the Hearthvale "to protect it". Brann and Dove are going on to Saltmere and ask Wren to come. Pell is coming too, though he says he isn't.
- **End card**, **`a1_end`**: "End of the Act I demo." Next comes *Act II: The Wider World*. This sets `a1_done`.

## Fights

The enemy decks and numbers are **Balance's** (`rpg/encounters.js`). Boss mechanics are **TCG Design's**. Below are Story's proposals: rank bands from the bible, and the story reason for each boss.

| Fight | Rank (vs Wren) | Proposed deck / AI / life | Story reason for a boss rule (for TCG Design) |
|---|---|---|---|
| Ford grass | Tin (=) | Starter decks, L1, −5 | — |
| **Gullet, the Millrace Lurker** | Copper (+1) | `water_tide`, L2, +0 | *Lurker:* it hides under the sluice, so it can't be attacked on the first turn, or its first creature has Ward. |
| Millrace Road grass | Copper (=) | Mono commons, L2, −5 | — |
| Brann (trainer) | Copper (=) | `earth_wall`, L2, 0 | — (a friendly duel) |
| Pell (trainer) | Copper (=) | `fire_swarm`, L3, 0 | — (a rival; plays fast and flashy) |
| Orchard grass | Copper (=) | `fire_swarm`, `fire_pyro`, `wind_flock`, L2, −5 | — |
| **The Cinder Mother** | Iron (+1) | `fire_fury`, L3, +3 | *Brood:* while her rift is open, she summons an Ember Spark at the start of her turn. Brann and Dove hold most of the brood, which is why it's only one. |
| Vault shallows | Iron (=) | `water_riptide`, `water_frost`, `earth_crystal`, L3, −5 | — |
| **The Sluicewarden** | Steel (+1) | `earth_titans`, L3, +3 | *Sealwork:* Edda built it to hold forever. The first time its life reaches 0, it rebuilds once with half life (two phases). |

**Fallback:** if a boss rule isn't built in time, the demo works with the deck and extra life alone.

## Loot cards

- **Slackwater, the Weir Serpent** (a Manifest, Water). TCG Design's concept: it grows and deals damage each time you play a Reaction. Story's name and legend are below; the final numbers are Balance's. This is the demo's payoff. It's the first Manifest the player owns, and it asks for a Reaction-heavy Water deck.
  - **Flavor:** *"It never struck first. It never needed to."*
  - **Legend:** for two centuries it lay under the Brindle weir and struck only at what struck first. The millers called it the Weir Warden and left it eels. Sixty years ago, in a flood year that woke it hungry, Edda Calder bound it rather than kill it, and built the Weir Vault to hold it.
- **The chained chest** on Millrace Road holds whatever card Game Dev or TCG Design choose (currently `wind_tempest_dragon`). Its story is a hunter who hid it and never came back.
- **Bosses** may also give a Manifest (designer: Manifests come from chests, contracts and story duels). Proposal: Gullet and the Cinder Mother give nothing special; Slackwater is the one.

## Engine features this demo needs (Game Dev)

The current overworld handles maps, NPCs, trainers, signs, chests, grass and saves. The demo also needs:

1. **Story flags that gate things:** NPCs, signs, warps and chests with `when: "flag"` / `unless: "flag"` (shown or active only if the flag is set or not set).
2. **Talking can set a flag:** `sets: "flag"` on an NPC's talk (Mads's licence, Jory's contract).
3. **Lines that change with flags:** an NPC's talk is a list such as `[{ when:"a1_rank_copper", text:"a1_tilly_copper" }, { text:"a1_tilly" }]`, where the first match wins.
4. **One-time scenes:** a step trigger or arrival trigger that plays a key once and sets a flag (`a1_cross_arrival`, `a1_gate_hollow`, `a1_seraphine`).
5. **An intro sequence** before the first map (`a1_intro`), and an **end card** (`a1_end`).
6. **Boss duels:** these can be trainers (exists) with an `after` key; boss rules come later from TCG Design.
7. **Rank in the HUD:** Tin, Copper or Iron, from the flags.
8. **Nice to have:** the deck builder, so the Slackwater rebuild moment lands.

A line starting `Name: ` shows a speaker, as now. A line with no speaker is narration.

## Playtest checklist (Story)

- Every chapter has a reason to go on: a contract, a closed road, a promise.
- Every region has a place, people, a fight and something to find.
- Every line fits one dialogue box (140 characters or fewer), and you can tell who's talking with the name hidden.
- Seraphine's clue is there, but a first-time player shouldn't notice it.
- The player leaves wanting to rebuild around Slackwater.
