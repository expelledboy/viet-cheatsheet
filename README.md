# 🇻🇳 Vietnamese Cheat Sheet

A free, mobile-first Vietnamese language reference with progress tracking — built for learners who need to look something up and use it right now.

**[Open the cheat sheet →](https://expelledboy.github.io/viet-cheatsheet/)**

Whether you're ordering phở at a street stall, bargaining at a market, or trying to sound less like a textbook — this is the reference you'll actually reach for. No app to install, no account to create — just open it and go.

---

## Two modes

**Reference mode** — everything visible at once, organized into collapsible sections. Scan and find what you need fast.

**Learning mode** — translations hidden behind tap-to-reveal flashcards. Mark phrases as "known" to track your progress. Hide what you've mastered and focus on what's left.

Switch between them with a single toggle. Your mode, progress, and preferences persist across visits.

---

## What's inside

28 sections organized situation-first — practical stuff up top, theory when you need it:

- **Essentials** — survival phrases, the 13 things you need on day one
- **Sound System** — tones, vowels, pronunciation rules
- **Grammar** — pronouns (the social engine), sentence structure, time/aspect, classifiers
- **Vocabulary** — numbers, time words, common verbs
- **Daily Phrases** — introductions, pleasantries, café ordering
- **Real Conversations** — full exchanges for ordering food, getting around, bargaining, pharmacy, making friends
- **Speaking Naturally** — what textbooks skip: natural greetings, sentence-ending particles, filler words, North vs South differences
- **Culture & Study Guide** — etiquette tips, recommended learning order
- **Quick Reference** — condensed cheat sheet for screenshots

---

## Features

- **Progress tracking** — mark phrases as "known," see progress per section and overall. Persists in your browser.
- **Tap to pronounce** — 🔊 buttons use your device's Vietnamese speech engine. No audio files.
- **Dark & light mode** — follows your system preference, remembers your choice.
- **Mobile-first** — designed for phones, scales to desktop.
- **Zero dependencies** — no frameworks, no CDNs, no build step, no app to install.
- **Instant access** — hosted on GitHub Pages, works offline once loaded.

---

## Running locally

```sh
git clone https://github.com/expelledboy/viet-cheatsheet.git
open viet-cheatsheet/index.html
```

---

## Contributing

Content lives in `data.js` — a typed JavaScript data model. The renderer (`index.html`) reads it automatically. You never need to touch the HTML.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the data model, block types, and guidelines.

```sh
node test.js  # 28 tests — run before submitting
```

The spirit of this project: *speak often, even imperfectly.*

---

MIT License
