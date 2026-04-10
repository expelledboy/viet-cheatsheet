# Contributing

The Vietnamese Cheat Sheet welcomes corrections, new phrases, and cultural notes. Here's how to contribute.

## How the content works

All content lives in `data.js` as a single JavaScript object. The HTML (`index.html`) reads this data and renders it automatically — you never need to touch the HTML.

## The data model

```js
const DATA = {
  categories: [
    {
      name: "Category Name",    // shown in the TOC
      sections: [
        {
          id: 0,                 // unique number, sequential
          title: "0. Section Title",
          learnable: true,       // true = flashcards in learning mode
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

## Guidelines

- Every phrase should be something a learner would actually use in daily life
- Include cultural context as `highlight` blocks where relevant
- Use Southern Vietnamese as the default (the practice group is in the South)
- If a phrase differs North/South, note both
- Keep it concise — this is a cheat sheet, not a textbook

## Testing your changes

Open `index.html` in a browser. Everything renders client-side — no build step needed.

## The spirit of this project

*Speak often, even imperfectly.*
