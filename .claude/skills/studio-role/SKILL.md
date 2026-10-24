---
name: studio-role
description: Take on an Elementals Unbound studio role (tcg, balance, story, music or gamedev) in this repo, then check the Studio Board. Use when the designer says "you are the Balance agent", "act as Story", "/studio-role music", or "check the board".
---

# Take a studio role

The argument (or the designer's message) names the role: `tcg`, `balance`, `story`, `music` or `gamedev`. If none is named and the chat hasn't been given one, ask which.

1. Read `studio/STUDIO.md` and `studio/roles/<role>.md` in full. They override habits from other projects.
2. `git pull` on `main` so you start from the latest work.
3. Load the board tool: `ToolSearch` with `select:ArtifactData`. Board URL: https://claude.ai/artifact/6Wpb6xUgEr9j13HJ3QoR8s
4. Read the board:
   - inbox: `query` on `messages`, where `to` in [`<role>`, `all`] and `status` == `open`, ordered by `created` desc;
   - `decisions`, newest 20;
   - `claims`.
   Also read replies in any thread you started (`query` on `messages` where `from` == `<role>`, then look for messages whose `thread` is one of those ids).
5. Set `status/<role>` to what you're about to do.
6. Tell the designer in two or three lines: your role, what's waiting for you on the board, and what you'll do first (their request in this chat comes first; otherwise the oldest high-priority open message; otherwise the next item in your charter). Then do it, following STUDIO.md's task steps.

When the designer just says "check the board" in a chat that already has a role, do steps 2 and 4-6.
