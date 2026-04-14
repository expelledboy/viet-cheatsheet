# Contributing

The Vietnamese Cheat Sheet welcomes corrections, new phrases, and cultural notes. Here's how to contribute.

## Architecture

```
index.html   — renderer + CSS + interactivity (don't edit for content changes)
data.js      — all content as a typed JavaScript object (edit this)
piper.js     — optional HQ Vietnamese voice (lazy-loaded on opt-in)
test.js      — 51 jsdom tests (run before submitting)
```

## The data model

All content lives in `data.js` as a single `DATA` object:

```js
const DATA = {
  categories: [
    {
      name: "Category Name",    // shown in category tabs
      sections: [
        {
          id: 0,                 // unique number, sequential
          title: "0. Section Title",
          learnable: true,       // true = flashcards + progress tracking
          content: [             // array of content blocks
            // ... blocks go here
          ]
        }
      ]
    }
  ]
};
```

## Content block types

| Type | What it renders | Example |
|------|----------------|---------|
| `p` | A paragraph | `{ type: "p", html: "Some text" }` |
| `h3` | A sub-heading | `{ type: "h3", text: "Sub-section" }` |
| `vocab` | Vietnamese/English pairs (flashcardable) | `{ type: "vocab", items: [{ vi: "xin chào", en: "hello" }] }` |
| `table` | A data table | `{ type: "table", headers: ["A","B"], rows: [{ cells: ["x","y"] }] }` |
| `highlight` | A callout box | `{ type: "highlight", html: "<strong>Tip:</strong> ..." }` |
| `prose` | A prose block | `{ type: "prose", html: "Explanation text" }` |
| `ol` | Numbered list | `{ type: "ol", items: ["First", "Second"] }` |
| `ul` | Bullet list | `{ type: "ul", items: ["Item 1", "Item 2"] }` |
| `telex` | Telex input→output | `{ type: "telex", items: [{ input: "aa", output: "â" }] }` |

## Adding a phrase

Find the right section in `data.js` and add to the `items` array:

```js
{ vi: "Xin lỗi", en: "Sorry / excuse me" }
```

Use actual Unicode Vietnamese characters, not HTML entities.

## Adding a section

Add a new object to the appropriate category's `sections` array. Give it the next sequential `id` and update the title number to match. Set `learnable: true` if it has vocab items you want to be flashcardable.

## The STATE object

User state is managed by a single `STATE` object in `index.html`, persisted to localStorage:

```js
STATE = {
  theme: null,              // 'light' | 'dark' | null (follow OS)
  mode: 'reference',        // 'reference' | 'learning'
  known: [],                // Vietnamese strings (canonical tôi/bạn form)
  hideKnown: false,         // hide mastered phrases
  pronounContext: 'formal', // 'formal' | 'olderMale' | 'olderFemale' | 'youngerM' | 'youngerF' | 'peer'
  piperEnabled: false,      // user has toggled HQ voice on
  piperCached: false        // HQ voice model is in OPFS
}
```

## Pronoun system

Phrases containing `tôi` and `bạn` are automatically swapped at display time based on the selected pronoun context. The DATA always stores the canonical form (with tôi/bạn). The swap:

- Only applies to phrases (contains a space), not single-word definitions
- Preserves capitalization (sentence-start vs mid-sentence)
- Protects compound words where bạn means "friend": kết bạn, người bạn, bạn bè

## Type safety

`data.js` has a JSDoc type contract with `// @ts-check`. Open it in VS Code and you'll see red squiggles on malformed sections, missing fields, or wrong block types.

## Optional HQ voice (`piper.js`)

`piper.js` wires up the opt-in Piper TTS download. It's a plain ES module attached to `window.piper`; the main app script probes the global lazily. Never touch `piper.js` for content changes.

Pinned versions live at the top of the file — bumping either requires testing in a real browser (jsdom can't run WASM). Three non-obvious choices worth preserving:

- **jsDelivr, not esm.sh.** esm.sh rewrites the library's Node-guarded `require("fs")` into an eager broken `fs.readFile` call via its `unenv` polyfill. jsDelivr serves the bundle untouched, so the Node guard evaluates `false` in the browser and the emscripten code falls through to `fetch()`. Keep CDN = jsDelivr.
- **`wasmPaths` freeze.** `vits-web` hardcodes `ort.env.wasm.wasmPaths = "https://cdnjs.cloudflare.com/.../onnxruntime-web@1.18.0/"` — a URL cdnjs never hosted, which 404s at synthesis. We pre-import onnxruntime-web from the same jsDelivr URL vits-web uses (module-instance dedup), set a working `wasmPaths`, and freeze it via `Object.defineProperty` so the library's later assignment is a silent no-op.
- **Warm session + cached phonemizer assets.** vits-web's `predict()` is stateless — every call spins up a fresh `ort.InferenceSession` AND re-fetches the 18 MB espeak `.data` file, giving ~6–33 s per-tap latency. We bypass `predict()`, keep one long-lived `InferenceSession` per voice, pre-fetch `piper_phonemize.wasm` + `.data` into OPFS on download, pre-compile the WebAssembly.Module once, and pass all three to emscripten via `wasmBinary` + `instantiateWasm` + `getPreloadedPackage`. Post-warmup synthesis is ~150 ms per unique phrase; an LRU blob cache makes repeat taps instant.
- **Vendored phonemizer assets.** The 0.6 MB `piper_phonemize.wasm` and 18 MB `piper_phonemize.data` live in `vendor/piper/` and are served from the same GitHub Pages origin rather than fetched from jsDelivr — mobile Safari proved unreliable on cross-origin fetches of the 18 MB file. If `LIB_VERSION` is bumped, refresh these files per `vendor/piper/README.md`.

Tunables (top of `piper.js`):

- `PLAYBACK_RATE` (`0.80`) — HTMLAudioElement playback speed. Browsers preserve pitch by default.
- `LENGTH_SCALE_MULT` (`1.3`) — VITS phoneme-duration multiplier for phrases. Higher = slower enunciation, more natural than playback-rate slowdown.
- `LENGTH_SCALE_MULT_SHORT` (`1.5`) — applied when the text has no whitespace (single-word utterances). Learners want isolated words drawn out.
- `LRU_MAX` (`100`) — output-blob cache cap.

## Testing

```sh
npm install   # first time only — installs jsdom
node test.js  # 51 tests covering rendering, interaction, state, pronoun system, and piper integration
```

Always run tests before submitting. The test suite loads the full page in jsdom and simulates clicks, toggles, and state changes.

## Guidelines

- Every phrase should be something a learner would actually use in daily life
- Include cultural context as `highlight` blocks where relevant
- Use Southern Vietnamese as the default (the practice group is in the South)
- If a phrase differs North/South, note both
- Keep it concise — this is a cheat sheet, not a textbook

## The spirit of this project

*Speak often, even imperfectly.*
