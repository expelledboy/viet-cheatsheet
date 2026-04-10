# Contributing

The Vietnamese Cheat Sheet welcomes corrections, new phrases, and cultural notes. Here's how to contribute.

## Architecture

```
index.html   — renderer + CSS + interactivity (don't edit for content changes)
data.js      — all content as a typed JavaScript object (edit this)
test.js      — 41 jsdom tests (run before submitting)
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
  pronounContext: 'formal'  // 'formal' | 'olderMale' | 'olderFemale' | 'youngerM' | 'youngerF' | 'peer'
}
```

## Pronoun system

Phrases containing `tôi` and `bạn` are automatically swapped at display time based on the selected pronoun context. The DATA always stores the canonical form (with tôi/bạn). The swap:

- Only applies to phrases (contains a space), not single-word definitions
- Preserves capitalization (sentence-start vs mid-sentence)
- Protects compound words where bạn means "friend": kết bạn, người bạn, bạn bè

## Type safety

`data.js` has a JSDoc type contract with `// @ts-check`. Open it in VS Code and you'll see red squiggles on malformed sections, missing fields, or wrong block types.

## Testing

```sh
npm install   # first time only — installs jsdom
node test.js  # 41 tests covering rendering, interaction, state, and pronoun system
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
