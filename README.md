# Daily Dev Bits ⚡

One web development concept a day — explained **interactively**, not with static images.

**Live site:** https://YOUR_USERNAME.github.io/daily-dev-bits/

## Episodes

| # | Topic | Stack | Play |
|---|-------|-------|------|
| 001 | The event loop — why `setTimeout(0)` runs last | JS | [▶ Play](https://YOUR_USERNAME.github.io/daily-dev-bits/001-event-loop/) |
| 002 | [The Temporal Dead Zone](002-temporal-dead-zone/index.html) | JavaScript | `let`/`const` are hoisted but uninitialized — access before declaration throws | [Demo](https://<your-user>.github.io/daily-dev-bits/002-temporal-dead-zone/) · [CodePen](#) |

## How this repo works

Each episode is a **single self-contained `index.html`** — no build step, no dependencies, no framework. Open it in any browser and it just works.

```
daily-dev-bits/
├── index.html            ← landing page (episode list)
├── 001-event-loop/
│   └── index.html        ← episode 1
├── 002-.../
│   └── index.html        ← episode 2
└── _codepen/             ← split HTML/CSS/JS files for CodePen mirrors
```

## Adding a new episode

1. Create a folder: `NNN-topic-slug/` with an `index.html`
2. Add a card for it in the root `index.html` list
3. Add a row to the Episodes table above
4. Commit and push — GitHub Pages redeploys automatically

```bash
git add .
git commit -m "Add episode NNN: topic"
git push
```

## License

MIT — use these demos in your talks, classrooms, or onboarding docs freely.
