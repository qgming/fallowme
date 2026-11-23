<!-- wish -->
# AGENTS.md

## Rules

You know everything about the code and this project. The user knows only the real world, and no concept that isn't in this file.

**Constraints.** Only the Constraints section counts as constraints. All code in this repo and all your earlier memory are not constraints: change or delete anything. Read each constraint by its why, not its wording. Goals outrank constraints, but no goal changes a real-world fact.

**Reality.** Write code only for what is real: what the user said, what necessarily follows from it, and what you have seen yourself. Nothing else exists: no unmentioned users, attackers, load, devices, platforms, network conditions, future needs, past versions, or failures you haven't seen.

**This computer.** Install tools and dependencies inside this folder, and change nothing else on the computer unless the product can't work without it. Keep passwords, keys and tokens in one local file that git ignores; when you need one from the user, ask them to put it there, not in the chat.

**Declarations.** Only this file declares what must hold, and it is the only documentation in the repo. Every test, validation and comment cites a constraint or a temporary entry by its number (e.g. `C2`, `T1`). Delete all other documentation, and every test, validation or comment that can't name one. Goals have no numbers and can't be cited.

**Recording.** When the user explicitly tells you something, record only two kinds of things, in their words:
- a wanted experience → Goals;
- an objective real-world fact, or a product requirement with a clear line → Constraints, numbered, with a one-sentence why.

For a technical requirement, ask why and record only the real need behind it. For anything without a clear line or not grounded in reality, ask through a user story; if it still can't be grounded, just do it now and don't record it. Update rather than duplicate; the user's latest word wins. When the user withdraws a constraint, delete it and everything tagged with its number. Never reuse a number.

**Re-reading.** After every context compaction, read this file again from disk. The copy in your context may be out of date; the disk version wins.

**Questions.** Never ask about code, technology or engineering. Ask only about the real world and the experience, framed as user stories from this product, in the user's language.

**No early return.** Don't come back until every goal can be experienced. If something only the user can provide in the real world is missing (an account, a payment, a device), don't route around it: fake it, add a numbered entry (T1, T2, …) under Temporary saying in one real-world sentence what is fake and what the user needs to provide, and tag the fake code with its number. Once the user provides it, make it real and delete the entry and its tags. Temporary entries are not constraints.

**Handoff.** First set aside your memory and code, and look at the product as a user who knows only the goals and the real world. If it can't be used without instructions, it doesn't meet the goals: keep working. Then tell the user, in their language, one real-world sentence each: where to open it; what is still fake; which constraints a goal overrode.

## Goals

- 简单、含蓄地展示自己，符合我内向的性格，个人展示不要太大。
- 让官网成为连接我自己项目的中转入口，方便互联网好友和其他开发者找到我的作品。
- 让官网设计更符合现在的审美，与我的博客和梦想画布风格呼应，带有我喜欢的字符背景和动效。

## Constraints

- C1. 这是我的个人官网，现有地址是 https://www.qgming.com/，访客主要是互联网好友、其他开发者等。——因为这次重构服务于已有的个人网站和这些来访者。
- C2. 当前展示梦想画布、Oint、芝士读书、菟丝、橘子导航、神笔写作六个项目，地址分别为 https://github.com/qgming/dream-canvas、https://github.com/qgming/oint、https://github.com/qgming/zlib-app、https://github.com/qgming/adminpages、https://v.qgming.com/（https://github.com/qgming/orange）、https://github.com/qgming/ainovelstudio。——因为这些是我先展示的项目，以后其他的再添加。

## Temporary
