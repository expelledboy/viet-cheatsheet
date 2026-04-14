# 🇻🇳 Vietnamese Cheat Sheet

A free, mobile-first Vietnamese language reference and practice tool — with progress tracking, pronoun context switching, and tap-to-pronounce.

**[Open the cheat sheet →](https://expelledboy.github.io/viet-cheatsheet/)**

Whether you're ordering phở at a street stall, bargaining at a market, or trying to sound less like a textbook — this is the reference you'll actually reach for. No app to install, no account to create — just open it and go.

---

## Two modes

**Reference mode** — everything visible at once, organized into collapsible sections. Scan and find what you need fast.

**Learning mode** — translations hidden behind tap-to-reveal flashcards. Sub-section toggles let you reveal answers one topic at a time. Mark phrases as "known" to track your progress. Hide what you've mastered and focus on what's left.

---

## Features

- **Progress tracking** — mark phrases as "known," see progress per section and overall. Your "Phrases You Know" panel grows as you learn. Persists across visits.
- **Pronoun context** — select who you're speaking to (Formal, Older ♂, Older ♀, Younger, Peer) and all phrases update their pronouns in real time. Teaches the Vietnamese pronoun system naturally.
- **Tap to pronounce** — 🔊 buttons use your device's Vietnamese speech engine. Available in both modes. Known phrases panel is also tappable for quick audio review. If your device's stock voice is rough, you can opt-in to download a higher-quality Hanoi voice (one-time 79 MB, cached on-device).
- **Category tabs** — horizontal scrollable navigation, always visible. One tap to jump to any category. Active tab highlights as you scroll.
- **Dark & light mode** — follows your system preference, remembers your choice.
- **Mobile-first** — designed for phones, scales to desktop.
- **Zero build step** — no frameworks, no bundlers, no app to install. The core app uses only your device's voice and a single `data.js` file. (The optional HQ voice loads from a pinned CDN on demand, if you ask for it.)

---

## What's inside

31 sections organized situation-first — practical stuff up top, theory when you need it:

- **Essentials** — survival phrases, the 13 things you need on day one
- **Sound System** — tones, vowels, pronunciation rules
- **Grammar** — pronouns (the social engine), sentence structure, time/aspect, classifiers
- **Vocabulary** — numbers, time words, common verbs
- **Daily Phrases** — introductions, pleasantries, café ordering
- **Real Conversations** — full exchanges for ordering food, getting around, bargaining, pharmacy, hotel check-in, temple visits, making friends
- **Speaking Naturally** — what textbooks skip: natural greetings, sentence-ending particles, filler words, the được spectrum, chưa vs không, North vs South differences
- **Culture & Study Guide** — etiquette tips, recommended learning order
- **Quick Reference** — condensed cheat sheet for screenshots

---

## Running locally

```sh
git clone https://github.com/expelledboy/viet-cheatsheet.git
open viet-cheatsheet/index.html
```

---

## Higher-quality Vietnamese voice (optional)

Your device's built-in Vietnamese voice can be rough — absent on older Android phones, robotic on many iOS devices. The app offers an opt-in download of a permissively-licensed Piper TTS voice (Hanoi / Northern dialect) that runs entirely on-device.

- One-time ~79 MB download, cached in your browser's OPFS storage
- Works offline after first download
- Any failure falls back silently to your device voice
- Toggle between device voice and HQ voice in the control card
- Remove at any time to free the storage

The voice is `vi_VN-vais1000-medium` from [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices), loaded via [`@diffusionstudio/vits-web`](https://github.com/diffusionstudio/vits-web). Southern dialect is not yet available — no open permissively-licensed Southern Vietnamese TTS model is browser-ready in 2026.

---

## Contributing

Content lives in `data.js` — a typed JavaScript data model. The renderer (`index.html`) reads it automatically. You never need to touch the HTML.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the data model, block types, STATE object, and guidelines.

```sh
npm install   # first time only
node test.js  # 51 tests — run before submitting
```

The spirit of this project: *speak often, even imperfectly.*

---

MIT License
