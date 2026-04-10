// @ts-check

/**
 * @typedef {{ vi: string, en: string }} VocabItem
 * @typedef {{ input: string, output: string }} TelexItem
 * @typedef {{ cells: string[], viCells?: number[], viLang?: number[], colspan?: Record<number,number> }} TableRow
 *
 * @typedef {| { type: "p", html: string }
 *           | { type: "h3", text: string }
 *           | { type: "vocab", items: VocabItem[] }
 *           | { type: "telex", items: TelexItem[] }
 *           | { type: "table", headers: string[], rows: TableRow[] }
 *           | { type: "ol", items: string[] }
 *           | { type: "ul", items: string[], viLang?: boolean }
 *           | { type: "highlight", html: string }
 *           | { type: "prose", html: string }
 * } ContentBlock
 *
 * @typedef {{ id: number, title: string, learnable: boolean, content: ContentBlock[] }} Section
 * @typedef {{ name: string, sections: Section[] }} Category
 * @typedef {{ banner: { text: string, link: { url: string, label: string }, suffix: string }, categories: Category[] }} DataModel
 */

/** @type {DataModel} */
const DATA = {
  banner: {
    text: "Practice group every Friday 1 PM at",
    link: { url: "https://maps.app.goo.gl/4nt9jcB7dwA8Ybpn8", label: "Chillax" },
    suffix: "\u2014 all levels welcome!"
  },
  categories: [
    {
      name: "Essentials",
      sections: [
        {
          id: 0,
          title: "0. The Core Idea",
          learnable: false,
          content: [
            { type: "p", html: "Vietnamese is very learnable, but beginners need to understand a few things immediately:" },
            { type: "ol", items: [
              "Tones matter",
              "Vowels matter",
              "Pronouns are social",
              "Spelling patterns are contextual",
              "Typing Vietnamese is easy once you know Telex",
              "Speaking imperfectly is better than waiting for perfection"
            ]},
            { type: "highlight", html: "<strong>Best beginner mindset:</strong><br>Be understandable first, elegant later. Learn the high-frequency daily phrases first. Use Vietnamese often, even if your grammar is simple." }
          ]
        },
        {
          id: 1,
          title: "1. Survival Phrases",
          learnable: true,
          content: [
            { type: "p", html: "The phrases that cover 80% of daily situations. Learn these first." },
            { type: "highlight", html: 'These examples use <strong>tôi</strong> — safe and polite with anyone. As you get comfortable, swap it for the right kinship pronoun (em/anh/chị) based on who you\'re talking to. In learning mode, use the pronoun selector to see how phrases change. See §6 for the full pronoun system.' },
            { type: "vocab", items: [
              { vi: "T\u00F4i kh\u00F4ng hi\u1EC3u.", en: "I do not understand." },
              { vi: "T\u00F4i ch\u01B0a hi\u1EC3u.", en: "I do not understand yet." },
              { vi: "Xin n\u00F3i ch\u1EADm th\u00F4i.", en: "Please speak slowly." },
              { vi: "Xin nh\u1EAFc l\u1EA1i.", en: "Please repeat." },
              { vi: "C\u00E1i n\u00E0y l\u00E0 g\u00EC?", en: "What is this?" },
              { vi: "Bao nhi\u00EAu ti\u1EC1n?", en: "How much?" },
              { vi: "\u1EDE \u0111\u00E2u?", en: "Where?" },
              { vi: "... \u1EDF \u0111\u00E2u?", en: "Where is ...?" },
              { vi: "Nh\u00E0 v\u1EC7 sinh \u1EDF \u0111\u00E2u?", en: "Where is the bathroom?" },
              { vi: "T\u00F4i mu\u1ED1n c\u00E1i n\u00E0y.", en: "I want this." },
              { vi: "Gi\u00FAp t\u00F4i v\u1EDBi!", en: "Help me!" },
              { vi: "D\u1EEBng \u1EDF \u0111\u00E2y.", en: "Stop here." },
              { vi: "T\u00F4i b\u1ECB l\u1EA1c.", en: "I am lost." }
            ]}
          ]
        }
      ]
    },
    {
      name: "Sound System",
      sections: [
        {
          id: 2,
          title: "2. Phonetics &amp; Tones",
          learnable: false,
          content: [
            { type: "p", html: "In Vietnamese, tone is part of the word. If you miss the tone, you may change the meaning completely." },
            { type: "h3", text: "The 6 Tones" },
            { type: "p", html: 'Using <span lang="vi"><strong>ma</strong></span> as the classic example:' },
            { type: "table", headers: ["#", "Name", "Example", "Description"], rows: [
              { cells: ["1", "ngang", "ma", "flat / mid"], viCells: [2], viLang: [1, 2] },
              { cells: ["2", "s\u1EAFc", "m\u00E1", "rising"], viCells: [2], viLang: [1, 2] },
              { cells: ["3", "huy\u1EC1n", "m\u00E0", "falling"], viCells: [2], viLang: [1, 2] },
              { cells: ["4", "h\u1ECFi", "m\u1EA3", "dipping / questioning"], viCells: [2], viLang: [1, 2] },
              { cells: ["5", "ng\u00E3", "m\u00E3", "high rising / broken"], viCells: [2], viLang: [1, 2] },
              { cells: ["6", "n\u1EB7ng", "m\u1EA1", "low dropping / heavy"], viCells: [2], viLang: [1, 2] }
            ]},
            { type: "highlight", html: "<strong>Remember:</strong> Tone changes meaning. Tone is not optional. Written marks matter." },
            { type: "prose", html: '<p><strong>Beginner note:</strong> Standard written Vietnamese distinguishes all 6 tones. In much southern speech, <span lang="vi">h\u1ECFi</span> and <span lang="vi">ng\u00E3</span> may sound similar or merge somewhat.</p>' }
          ]
        },
        {
          id: 3,
          title: "3. The Hard Vowels",
          learnable: false,
          content: [
            { type: "p", html: "These are the vowels English speakers often miss." },
            { type: "h3", text: "Core Vowel Distinctions" },
            { type: "table", headers: ["Letter", "Sound"], rows: [
              { cells: ["\u0103", "short a; very brief \"a\""], viCells: [0], viLang: [0] },
              { cells: ["\u00E2", "short central uh"], viCells: [0], viLang: [0] },
              { cells: ["\u00EA", "close ay without a strong glide"], viCells: [0], viLang: [0] },
              { cells: ["\u00F4", "close, clipped oh"], viCells: [0], viLang: [0] },
              { cells: ["\u01A1", "relaxed uh/er with rounded lips"], viCells: [0], viLang: [0] },
              { cells: ["\u01B0", "like ee, but with rounded lips"], viCells: [0], viLang: [0] },
              { cells: ["\u0111", "normal hard English-like d"], viCells: [0], viLang: [0] },
              { cells: ["d / gi", "often z in the North, often y in the South"], viCells: [0], viLang: [0] }
            ]},
            { type: "h3", text: "Vowel Families" },
            { type: "p", html: "Learn these as contrast groups:" },
            { type: "ul", items: [
              "<strong>a / \u0103 / \u00E2</strong>",
              "<strong>o / \u00F4 / \u01A1</strong>",
              "<strong>u / \u01B0</strong>",
              "<strong>e / \u00EA</strong>"
            ], viLang: true },
            { type: "highlight", html: 'These are not decorative marks. They are <strong>different vowels</strong>.' }
          ]
        },
        {
          id: 4,
          title: "4. Pronunciation Rules",
          learnable: false,
          content: [
            { type: "p", html: "Some Vietnamese letters are pronounced differently, or spelled differently, depending on what letters come next. This is one of the most important reading rules for English speakers." },
            { type: "h3", text: "3.1 c / k / qu" },
            { type: "p", html: "These usually represent roughly the same base <em>k</em> sound." },
            { type: "ul", items: [
              "<strong>c</strong> before a, o, \u00F4, \u01A1, u, \u01B0",
              "<strong>k</strong> before e, \u00EA, i",
              "<strong>q</strong> usually appears as <strong>qu</strong>"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>c\u00E1</strong></span>, <span lang="vi"><strong>k\u1EB9o</strong></span>, <span lang="vi"><strong>quay</strong></span>' },
            { type: "prose", html: "Different spellings, similar base sound \u2014 often just orthographic context." },
            { type: "h3", text: "3.2 g / gh" },
            { type: "p", html: "Same base sound, spelling changes by following vowel." },
            { type: "ul", items: [
              "<strong>g</strong> before a, o, \u00F4, \u01A1, u, \u01B0",
              "<strong>gh</strong> before e, \u00EA, i"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>ga</strong></span>, <span lang="vi"><strong>gh\u1EBF</strong></span>, <span lang="vi"><strong>ghi</strong></span>' },
            { type: "h3", text: "3.3 ng / ngh" },
            { type: "p", html: 'Same <em>ng</em> sound (like the end of English "sing"), spelling changes by next vowel.' },
            { type: "ul", items: [
              "<strong>ng</strong> before a, o, \u00F4, \u01A1, u, \u01B0",
              "<strong>ngh</strong> before e, \u00EA, i"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>nga</strong></span>, <span lang="vi"><strong>nghe</strong></span>, <span lang="vi"><strong>ngh\u1EC9</strong></span>' },
            { type: "h3", text: "3.4 gi" },
            { type: "p", html: '<span lang="vi"><strong>gi</strong></span> is usually one sound, not separate g + i.' },
            { type: "ul", items: [
              "Northern: often like <strong>z</strong>",
              "Southern: often like <strong>y</strong>"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>g\u00EC</strong></span>, <span lang="vi"><strong>gi\u1ECFi</strong></span>, <span lang="vi"><strong>gi\u1EDBi</strong></span>' },
            { type: "h3", text: "3.5 d vs \u0111" },
            { type: "p", html: "These are different letters." },
            { type: "ul", items: [
              '<strong lang="vi">\u0111</strong> = hard English-like d',
              "<strong>d</strong> = often z (North), often y (South)"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>\u0111i</strong></span>, <span lang="vi"><strong>d\u00EC</strong></span>' },
            { type: "h3", text: "3.6 qu" },
            { type: "p", html: "Pronounced together, often roughly like <em>kw</em> or closer to <em>w</em> depending on dialect." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>qua</strong></span>, <span lang="vi"><strong>qu\u00EA</strong></span>, <span lang="vi"><strong>qu\u00EAn</strong></span>' },
            { type: "h3", text: "3.7 nh" },
            { type: "p", html: "<strong>nh</strong> = soft <em>ny</em> sound. Similar in spirit to Spanish \u00F1." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>nh\u00E0</strong></span>, <span lang="vi"><strong>nhanh</strong></span>' },
            { type: "h3", text: "3.8 th" },
            { type: "p", html: '<strong>th</strong> in Vietnamese is not English "th." It is an aspirated <em>t</em>.' },
            { type: "p", html: 'Examples: <span lang="vi"><strong>th\u00F4i</strong></span>, <span lang="vi"><strong>th\u00EDch</strong></span>' },
            { type: "h3", text: "3.9 ph" },
            { type: "p", html: "<strong>ph</strong> = <em>f</em> sound." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>ph\u1EDF</strong></span>, <span lang="vi"><strong>ph\u1EA3i</strong></span>' },
            { type: "h3", text: "3.10 kh" },
            { type: "p", html: "<strong>kh</strong> = rough throaty sound, like German <em>Bach</em> or Scottish <em>loch</em>." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>kh\u00F4ng</strong></span>, <span lang="vi"><strong>kh\u1ECFe</strong></span>' },
            { type: "h3", text: "3.11 tr and ch" },
            { type: "p", html: "Different sounds, though beginners often hear them as similar at first." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>tr\u00E0</strong></span>, <span lang="vi"><strong>cha</strong></span>' },
            { type: "h3", text: "3.12 Tiny Rule" },
            { type: "prose", html: 'When you see extra letters such as the <strong>h</strong> in <em>gh</em> / <em>ngh</em>, they often do not create a brand-new English-style sound. They often exist to show which vowel can follow while preserving the same base sound.' },
            { type: "h3", text: "3.13 Memorize as Spelling Families" },
            { type: "ul", items: [
              "<strong>c / k / qu</strong>",
              "<strong>g / gh</strong>",
              "<strong>ng / ngh</strong>",
              "<strong>d / gi / \u0111</strong>",
              "<strong>ph / th / kh / nh</strong>"
            ]},
            { type: "highlight", html: 'This makes reading Vietnamese <strong>much easier, much faster</strong>.' }
          ]
        }
      ]
    },
    {
      name: "Typing",
      sections: [
        {
          id: 5,
          title: "5. Telex Input",
          learnable: false,
          content: [
            { type: "h3", text: "4.1 Setup (Android / QWERTY)" },
            { type: "ol", items: [
              "Add Vietnamese in Gboard settings",
              "Switch to the Vietnamese keyboard",
              "Use Telex input"
            ]},
            { type: "p", html: "This is the fastest and most common digital method." },
            { type: "h3", text: "4.2 Letter Transformations" },
            { type: "table", headers: ["Type", "Get"], rows: [
              { cells: ["aa", "\u00E2"], viCells: [1], viLang: [1] },
              { cells: ["aw", "\u0103"], viCells: [1], viLang: [1] },
              { cells: ["ee", "\u00EA"], viCells: [1], viLang: [1] },
              { cells: ["oo", "\u00F4"], viCells: [1], viLang: [1] },
              { cells: ["ow", "\u01A1"], viCells: [1], viLang: [1] },
              { cells: ["uw", "\u01B0"], viCells: [1], viLang: [1] },
              { cells: ["dd", "\u0111"], viCells: [1], viLang: [1] }
            ]},
            { type: "h3", text: "4.2 Tone Keys" },
            { type: "table", headers: ["Key", "Tone", "Example"], rows: [
              { cells: ["s", "s\u1EAFc", "\u00E1"], viCells: [2], viLang: [1, 2] },
              { cells: ["f", "huy\u1EC1n", "\u00E0"], viCells: [2], viLang: [1, 2] },
              { cells: ["r", "h\u1ECFi", "\u1EA3"], viCells: [2], viLang: [1, 2] },
              { cells: ["x", "ng\u00E3", "\u00E3"], viCells: [2], viLang: [1, 2] },
              { cells: ["j", "n\u1EB7ng", "\u1EA1"], viCells: [2], viLang: [1, 2] },
              { cells: ["z", "remove mark / clear tone"], colspan: { 1: 2 } }
            ]},
            { type: "h3", text: "4.3 Examples" },
            { type: "telex", items: [
              { input: "tieengs Vieetj", output: "ti\u1EBFng Vi\u1EC7t" },
              { input: "tooi", output: "t\u00F4i" },
              { input: "nguwowfi", output: "ng\u01B0\u1EDDi" }
            ]},
            { type: "highlight", html: "<strong>Tip:</strong> Learn Telex early \u2014 it makes typing, searching, messaging, and note-taking much easier." }
          ]
        }
      ]
    },
    {
      name: "Grammar Basics",
      sections: [
        {
          id: 6,
          title: "6. Pronouns",
          learnable: true,
          content: [
            { type: "p", html: "Pronouns in Vietnamese are not just grammar. They express relationship, age, respect, warmth, and social role. This is one of the biggest differences from English." },
            { type: "h3", text: "5.1 Safe Basics" },
            { type: "vocab", items: [
              { vi: "t\u00F4i", en: "I / me, neutral-polite" },
              { vi: "m\u00ECnh", en: "I / me, softer, warmer, friendlier" },
              { vi: "b\u1EA1n", en: "you, neutral/friendly" }
            ]},
            { type: "h3", text: "5.2 The Sibling Rule" },
            { type: "vocab", items: [
              { vi: "anh", en: "older brother / you (male, older) / I (if male &amp; older)" },
              { vi: "ch\u1ECB", en: "older sister / you (female, older) / I (if female &amp; older)" },
              { vi: "em", en: "younger person / you / I in younger position" }
            ]},
            { type: "h3", text: "5.3 Elders &amp; Older Adults" },
            { type: "vocab", items: [
              { vi: "c\u00F4", en: "aunt / older woman / teacher" },
              { vi: "ch\u00FA", en: "uncle / older man" },
              { vi: "b\u00E1c", en: "older aunt/uncle generation" },
              { vi: "\u00F4ng", en: "grandfather / elderly man" },
              { vi: "b\u00E0", en: "grandmother / elderly woman" }
            ]},
            { type: "h3", text: "The Pronoun Shift" },
            { type: "prose", html: "Pronouns change based on WHO you're talking to, not who you are. If you're a 25-year-old woman talking to a 30-year-old man, you call yourself <strong>em</strong> and him <strong>anh</strong>. Five minutes later, talking to a 20-year-old guy, you flip: you're <strong>chị</strong>, he's <strong>em</strong>. The pronouns change; your age doesn't." },
            { type: "h3", text: "Getting Attention: [pronoun] + ơi" },
            { type: "vocab", items: [
              { vi: "Em \u01A1i!", en: "Hey! (to younger person / staff)" },
              { vi: "Anh \u01A1i!", en: "Hey! (to older male)" },
              { vi: "Ch\u1ECB \u01A1i!", en: "Hey! (to older female)" }
            ]},
            { type: "highlight", html: "This is how you get attention at restaurants, shops, and street stalls. Not \"Hello!\" — not waving — <strong>[pronoun] + ơi</strong>." },
            { type: "h3", text: "Casual & Close Friends" },
            { type: "vocab", items: [
              { vi: "t\u1EDBi", en: "I (informal, friends)" },
              { vi: "tui", en: "I (Southern casual)" },
              { vi: "tao", en: "I (very close friends ONLY — rude otherwise)" },
              { vi: "m\u00E0y", en: "you (very close friends ONLY — rude otherwise)" }
            ]},
            { type: "highlight", html: '<strong>Warning:</strong> <strong>tao / mày</strong> are intimate pronouns for close friends. Using them with anyone else "will cause a fight" — every native speaker source agrees on this.' },
            { type: "h3", text: "Safe Beginner Rule" },
            { type: "highlight", html: 'If unsure, use <strong lang="vi">t\u00F4i</strong> for "I" and <strong lang="vi">b\u1EA1n</strong> for "you." It sounds slightly formal but never offends. Then gradually learn family-style pronouns as you get more comfortable.' },
            { type: "prose", html: 'Vietnamese often uses kinship terms where English would use "you" and "I." This is normal, warm, and culturally important.' }
          ]
        },
        {
          id: 7,
          title: "7. Sentence Structure",
          learnable: true,
          content: [
            { type: "p", html: "Vietnamese basic word order is usually: <strong>Subject + Verb + Object</strong>" },
            { type: "p", html: "This is pleasantly familiar for English speakers." },
            { type: "vocab", items: [
              { vi: "T\u00F4i \u0103n c\u01A1m.", en: "I eat rice." },
              { vi: "T\u00F4i th\u00EDch c\u00E0 ph\u00EA.", en: "I like coffee." },
              { vi: "T\u00F4i h\u1ECDc ti\u1EBFng Vi\u1EC7t.", en: "I study Vietnamese." },
              { vi: "T\u00F4i kh\u00F4ng hi\u1EC3u.", en: "I do not understand." }
            ]},
            { type: "h3", text: "6.1 Negation" },
            { type: "vocab", items: [
              { vi: "kh\u00F4ng", en: "not / no" }
            ]},
            { type: "h3", text: "6.2 Existence / Possession" },
            { type: "vocab", items: [
              { vi: "c\u00F3", en: "have / there is / yes in some contexts" }
            ]}
          ]
        },
        {
          id: 8,
          title: "8. Time, Aspect &amp; Particles",
          learnable: true,
          content: [
            { type: "p", html: "Vietnamese does not use tense the way English does. Instead, it often uses time words and particles." },
            { type: "h3", text: "7.1 Core Particles" },
            { type: "vocab", items: [
              { vi: "\u0111\u00E3", en: "past / already" },
              { vi: "\u0111ang", en: "currently / in progress" },
              { vi: "s\u1EBD", en: "future / will" },
              { vi: "v\u1EEBa", en: "just happened" },
              { vi: "ch\u01B0a", en: "not yet" },
              { vi: "r\u1ED3i", en: "already / finished / then" },
              { vi: "n\u1EEFa", en: "more / again" }
            ]},
            { type: "h3", text: "7.2 Examples" },
            { type: "vocab", items: [
              { vi: "T\u00F4i \u0111ang h\u1ECDc ti\u1EBFng Vi\u1EC7t.", en: "I am learning Vietnamese." },
              { vi: "T\u00F4i \u0111\u00E3 \u0103n r\u1ED3i.", en: "I already ate." },
              { vi: "T\u00F4i s\u1EBD \u0111i.", en: "I will go." },
              { vi: "T\u00F4i v\u1EEBa \u0111\u1EBFn.", en: "I just arrived." },
              { vi: "T\u00F4i ch\u01B0a hi\u1EC3u.", en: "I do not understand yet." }
            ]},
            { type: "h3", text: "7.3 Polite &amp; Softening Particles" },
            { type: "vocab", items: [
              { vi: "\u1EA1", en: "respectful sentence ending" },
              { vi: "d\u1EA1", en: 'polite "yes" / polite response starter' },
              { vi: "nh\u00E9 / nha", en: "friendly, soft sentence ending" }
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>D\u1EA1, em hi\u1EC3u \u1EA1.</strong></span> \u2022 <span lang="vi"><strong>\u0110i nh\u00E9.</strong></span> \u2022 <span lang="vi"><strong>Ng\u1ED3i \u0111\u00E2y nha.</strong></span>' },
            { type: "prose", html: "These do a lot of social work in Vietnamese." }
          ]
        },
        {
          id: 9,
          title: "9. Classifiers",
          learnable: true,
          content: [
            { type: "p", html: "Vietnamese commonly uses classifiers with nouns." },
            { type: "h3", text: "Useful Beginner Classifiers" },
            { type: "vocab", items: [
              { vi: "c\u00E1i", en: "general thing / object" },
              { vi: "con", en: "animal" },
              { vi: "ng\u01B0\u1EDDi", en: "person" },
              { vi: "ly", en: "glass / cup, especially drinks" }
            ]},
            { type: "h3", text: "Examples" },
            { type: "vocab", items: [
              { vi: "m\u1ED9t c\u00E1i b\u00E0n", en: "one table" },
              { vi: "m\u1ED9t con m\u00E8o", en: "one cat" },
              { vi: "m\u1ED9t ng\u01B0\u1EDDi b\u1EA1n", en: "one friend" },
              { vi: "m\u1ED9t ly c\u00E0 ph\u00EA", en: "one cup of coffee" }
            ]}
          ]
        }
      ]
    },
    {
      name: "Vocabulary",
      sections: [
        {
          id: 10,
          title: "10. Time Words",
          learnable: true,
          content: [
            { type: "h3", text: "9.1 Core Time Words" },
            { type: "vocab", items: [
              { vi: "h\u00F4m nay", en: "today" },
              { vi: "h\u00F4m qua", en: "yesterday" },
              { vi: "ng\u00E0y mai", en: "tomorrow" },
              { vi: "b\u00E2y gi\u1EDD", en: "now" },
              { vi: "khi n\u00E0o?", en: "when?" },
              { vi: "bao l\u00E2u?", en: "how long?" },
              { vi: "m\u1EA5y gi\u1EDD?", en: "what time?" }
            ]},
            { type: "h3", text: "9.2 Parts of the Day" },
            { type: "vocab", items: [
              { vi: "s\u00E1ng", en: "morning" },
              { vi: "tr\u01B0a", en: "noon / lunchtime" },
              { vi: "chi\u1EC1u", en: "afternoon" },
              { vi: "t\u1ED1i", en: "evening" },
              { vi: "\u0111\u00EAm", en: "night" }
            ]}
          ]
        },
        {
          id: 11,
          title: "11. Numbers",
          learnable: true,
          content: [
            { type: "h3", text: "10.1 Basic Numbers" },
            { type: "vocab", items: [
              { vi: "kh\u00F4ng", en: "0" },
              { vi: "m\u1ED9t", en: "1" },
              { vi: "hai", en: "2" },
              { vi: "ba", en: "3" },
              { vi: "b\u1ED1n", en: "4" },
              { vi: "n\u0103m", en: "5" },
              { vi: "s\u00E1u", en: "6" },
              { vi: "b\u1EA3y", en: "7" },
              { vi: "t\u00E1m", en: "8" },
              { vi: "ch\u00EDn", en: "9" },
              { vi: "m\u01B0\u1EDDi", en: "10" }
            ]},
            { type: "h3", text: "10.2 Useful Compounds" },
            { type: "vocab", items: [
              { vi: "m\u01B0\u1EDDi m\u1ED9t", en: "11" },
              { vi: "hai m\u01B0\u01A1i", en: "20" },
              { vi: "m\u1ED9t tr\u0103m", en: "100" },
              { vi: "m\u1ED9t ngh\u00ECn", en: "1,000" }
            ]},
            { type: "prose", html: "Numbers are essential for food, transport, prices, times, and directions." }
          ]
        },
        {
          id: 12,
          title: "12. Common Verbs &amp; Words",
          learnable: true,
          content: [
            { type: "p", html: "These are used all the time." },
            { type: "h3", text: "17.1 Core Verbs" },
            { type: "vocab", items: [
              { vi: "l\u00E0", en: "to be" },
              { vi: "c\u00F3", en: "to have / there is" },
              { vi: "\u0111i", en: "to go" },
              { vi: "\u0111\u1EBFn", en: "to come / arrive" },
              { vi: "v\u1EC1", en: "to return / go back" },
              { vi: "\u0103n", en: "to eat" },
              { vi: "u\u1ED1ng", en: "to drink" },
              { vi: "ng\u1EE7", en: "to sleep" },
              { vi: "bi\u1EBFt", en: "to know" },
              { vi: "hi\u1EC3u", en: "to understand" },
              { vi: "th\u00EDch", en: "to like" },
              { vi: "mu\u1ED1n", en: "to want" },
              { vi: "c\u1EA7n", en: "to need" },
              { vi: "\u0111\u01B0\u1EE3c", en: "can / okay / receive / acceptable" },
              { vi: "\u1EDF", en: "at / in / to live at" },
              { vi: "v\u1EDBi", en: "with" },
              { vi: "cho", en: "give / for" }
            ]},
            { type: "h3", text: "17.2 Common Function Words" },
            { type: "vocab", items: [
              { vi: "n\u00E0y", en: "this" },
              { vi: "\u0111\u00F3 / kia", en: "that" },
              { vi: "r\u1EA5t", en: "very" },
              { vi: "r\u1ED3i", en: "already" },
              { vi: "n\u1EEFa", en: "more / again" }
            ]},
            { type: "h3", text: "17.3 Question Words" },
            { type: "vocab", items: [
              { vi: "g\u00EC", en: "what" },
              { vi: "ai", en: "who" },
              { vi: "\u0111\u00E2u", en: "where" },
              { vi: "bao nhi\u00EAu", en: "how much / how many" },
              { vi: "m\u1EA5y gi\u1EDD", en: "what time" },
              { vi: "khi n\u00E0o", en: "when" }
            ]}
          ]
        }
      ]
    },
    {
      name: "Daily Phrases",
      sections: [
        {
          id: 13,
          title: "13. Introductions",
          learnable: true,
          content: [
            { type: "p", html: "Useful self-introduction lines:" },
            { type: "vocab", items: [
              { vi: "T\u00F4i l\u00E0 ...", en: "I am ..." },
              { vi: "T\u00F4i t\u00EAn l\u00E0 ...", en: "My name is ..." },
              { vi: "T\u00F4i \u0111\u1EBFn t\u1EEB ...", en: "I come from ..." },
              { vi: "T\u00F4i s\u1ED1ng \u1EDF ...", en: "I live in ..." },
              { vi: "T\u00F4i n\u00F3i ti\u1EBFng Anh.", en: "I speak English." },
              { vi: "T\u00F4i \u0111ang h\u1ECDc ti\u1EBFng Vi\u1EC7t.", en: "I am learning Vietnamese." },
              { vi: "R\u1EA5t vui \u0111\u01B0\u1EE3c g\u1EB7p b\u1EA1n.", en: "Nice to meet you." }
            ]},
            { type: "prose", html: "You can make a full mini-introduction from only 3\u20134 of these." }
          ]
        },
        {
          id: 14,
          title: "14. Daily Pleasantries",
          learnable: true,
          content: [
            { type: "h3", text: "12.1 Greetings" },
            { type: "vocab", items: [
              { vi: "Xin ch\u00E0o.", en: "Hello." },
              { vi: "Ch\u00E0o b\u1EA1n.", en: "Hi." },
              { vi: "T\u1EA1m bi\u1EC7t.", en: "Goodbye." },
              { vi: "H\u1EB9n g\u1EB7p l\u1EA1i.", en: "See you again." }
            ]},
            { type: "h3", text: "12.2 Thanks &amp; Apology" },
            { type: "vocab", items: [
              { vi: "C\u1EA3m \u01A1n.", en: "Thank you." },
              { vi: "C\u1EA3m \u01A1n nhi\u1EC1u.", en: "Thanks a lot." },
              { vi: "Kh\u00F4ng c\u00F3 g\u00EC.", en: "You're welcome / no problem." },
              { vi: "Xin l\u1ED7i.", en: "Sorry / excuse me." }
            ]},
            { type: "h3", text: "12.3 Confirmation" },
            { type: "vocab", items: [
              { vi: "V\u00E2ng.", en: "yes (polite)" },
              { vi: "D\u1EA1.", en: "polite yes / respectful response" },
              { vi: "Kh\u00F4ng.", en: "no" },
              { vi: "\u0110\u01B0\u1EE3c.", en: "okay / can / acceptable" },
              { vi: "Kh\u00F4ng sao.", en: "it's okay / no problem" }
            ]}
          ]
        },
        {
          id: 15,
          title: "15. Caf\u00E9 Pack",
          learnable: true,
          content: [
            { type: "p", html: "Useful for your Friday speaking meetup and caf\u00E9 life in general." },
            { type: "h3", text: "Calling Staff" },
            { type: "vocab", items: [
              { vi: "Em \u01A1i!", en: "Excuse me / calling staff politely" }
            ]},
            { type: "h3", text: "Ordering" },
            { type: "vocab", items: [
              { vi: "Cho t\u00F4i m\u1ED9t ...", en: "Give me one ... / I'd like one ..." }
            ]},
            { type: "h3", text: "Drinks" },
            { type: "vocab", items: [
              { vi: "C\u00E0 ph\u00EA s\u1EEFa \u0111\u00E1", en: "iced milk coffee" },
              { vi: "Tr\u00E0 \u0111\u00E1", en: "iced tea" },
              { vi: "N\u01B0\u1EDBc", en: "water" },
              { vi: "Bia", en: "beer" }
            ]},
            { type: "h3", text: "Customizing" },
            { type: "vocab", items: [
              { vi: "\u00CDt \u0111\u01B0\u1EDDng", en: "less sugar" },
              { vi: "Kh\u00F4ng \u0111\u00E1", en: "no ice" },
              { vi: "Cay", en: "spicy" },
              { vi: "Kh\u00F4ng cay", en: "not spicy" }
            ]},
            { type: "h3", text: "Paying" },
            { type: "vocab", items: [
              { vi: "T\u00EDnh ti\u1EC1n!", en: "Check / bill please" }
            ]},
            { type: "h3", text: "Toasting" },
            { type: "vocab", items: [
              { vi: "M\u1ED9t, hai, ba, v\u00F4!", en: "One, two, three, cheers!" }
            ]}
          ]
        }
      ]
    },
{
      name: "Real Conversations",
      sections: [
        {
          id: 16,
          title: "16. Ordering Food",
          learnable: true,
          content: [
            { type: "prose", html: "<p>Food is the highest-frequency daily interaction in Vietnam. These are complete exchanges — not just vocabulary.</p>" },
            { type: "h3", text: "Getting Attention" },
            { type: "p", html: 'Don\'t wave or say "Hello." Use <strong>[pronoun] + ơi</strong>:' },
            { type: "vocab", items: [
              { vi: "Em ơi!", en: "Excuse me! (to younger staff — most common)" },
              { vi: "Chị ơi!", en: "Excuse me! (to older woman)" },
              { vi: "Anh ơi!", en: "Excuse me! (to older man)" }
            ]},
            { type: "highlight", html: '<strong>Key insight:</strong> "Em ơi!" is the single most useful phrase in Vietnamese daily life. It\'s how you get attention at any restaurant, shop, or street stall.' },
            { type: "h3", text: "Full Phở Exchange" },
            { type: "vocab", items: [
              { vi: "Cho tôi một tô phở bò tái.", en: "One rare beef pho please." },
              { vi: "Tô lớn hay tô nhỏ?", en: "Large or small bowl? (staff asks)" },
              { vi: "Tô lớn, cảm ơn.", en: "Large, thank you." },
              { vi: "Cho thêm rau và giá.", en: "Extra herbs and bean sprouts please." },
              { vi: "Cho tôi thêm nước mắm.", en: "More fish sauce please." },
              { vi: "Ngon quá!", en: "So delicious!" },
              { vi: "Tính tiền!", en: "Bill please!" }
            ]},
            { type: "h3", text: "Eating Here or Takeaway" },
            { type: "vocab", items: [
              { vi: "Ăn tại đây hay mang đi?", en: "Eating here or takeaway? (staff asks)" },
              { vi: "Ăn tại đây.", en: "Eating here." },
              { vi: "Mang đi.", en: "Takeaway / to go." }
            ]},
            { type: "h3", text: "Paying" },
            { type: "vocab", items: [
              { vi: "Tính tiền!", en: "Bill please!" },
              { vi: "Bao nhiêu tất cả?", en: "How much in total?" },
              { vi: "Tôi trả tiền mặt.", en: "I'll pay cash." },
              { vi: "Trả thẻ được không?", en: "Can I pay by card?" },
              { vi: "Em giữ lại đi.", en: "Keep the change." }
            ]},
            { type: "h3", text: "What's Good Here?" },
            { type: "vocab", items: [
              { vi: "Hôm nay có món gì ngon?", en: "What's good today?" },
              { vi: "Món nào bán chạy nhất?", en: "What's the most popular dish?" },
              { vi: "Anh/chị hay ăn gì?", en: "What do you usually eat? (asking locals)" }
            ]},
            { type: "h3", text: "Bánh Mì at a Street Stall" },
            { type: "vocab", items: [
              { vi: "Cho tôi một ổ bánh mì thịt.", en: "One meat bánh mì please." },
              { vi: "Ăn cay không?", en: "Do you eat spicy? (vendor asks)" },
              { vi: "Ít cay thôi.", en: "Just a little spicy." },
              { vi: "Không hành, thêm rau.", en: "No onion, extra vegetables." },
              { vi: "Mang đi.", en: "Takeaway / to go." },
              { vi: "Đặc biệt.", en: "Special (= everything in it)." }
            ]},
            { type: "h3", text: "Customizing Food" },
            { type: "vocab", items: [
              { vi: "Không cay.", en: "Not spicy." },
              { vi: "Không hành.", en: "No onion." },
              { vi: "Không rau mùi.", en: "No cilantro." },
              { vi: "Ít đường.", en: "Less sugar." },
              { vi: "Không đá.", en: "No ice." },
              { vi: "Thêm rau.", en: "Extra vegetables." },
              { vi: "Tôi ăn chay.", en: "I'm vegetarian." },
              { vi: "Tôi bị dị ứng với đậu phộng.", en: "I'm allergic to peanuts." },
              { vi: "Tôi bị dị ứng với hải sản.", en: "I'm allergic to seafood." }
            ]},
            { type: "h3", text: "Complimenting the Cook" },
            { type: "vocab", items: [
              { vi: "Ngon quá!", en: "So delicious!" },
              { vi: "Ngon lắm!", en: "Very delicious!" },
              { vi: "Chị nấu ăn rất giỏi.", en: "You cook really well." },
              { vi: "Lần sau tôi sẽ quay lại.", en: "I'll come back next time." }
            ]},
            { type: "highlight", html: "<strong>Tip:</strong> Saying \"Ngon quá!\" to the cook earns massive goodwill — better portions, warmer service, genuine connection." }
          ]
        },
        {
          id: 17,
          title: "17. Getting Around",
          learnable: true,
          content: [
            { type: "h3", text: "Grab / Taxi" },
            { type: "vocab", items: [
              { vi: "Tôi muốn đi đến...", en: "I want to go to..." },
              { vi: "Tôi đang ở trước khách sạn.", en: "I'm in front of the hotel." },
              { vi: "Chờ tôi một chút nhé.", en: "Wait a moment for me." },
              { vi: "Bao lâu đến nơi?", en: "How long until we arrive?" },
              { vi: "Đi chậm thôi.", en: "Please slow down." },
              { vi: "Dừng ở đây.", en: "Stop here." },
              { vi: "Khỏi thối.", en: "Keep the change. (natural tipping)" },
              { vi: "Vui lòng bật đồng hồ.", en: "Please turn on the meter." }
            ]},
            { type: "h3", text: "Asking for Recommendations" },
            { type: "p", html: 'Start any question to a stranger with <span lang="vi"><strong>Cho hỏi...</strong></span> (May I ask...) — it\'s universally polite.' },
            { type: "vocab", items: [
              { vi: "Cho hỏi, gần đây có quán ăn ngon không?", en: "Excuse me, is there a good restaurant nearby?" },
              { vi: "Quán phở nào ngon nhất?", en: "Which phở shop is the best?" },
              { vi: "Xa không?", en: "Is it far?" },
              { vi: "Đi bộ được không?", en: "Can I walk there?" },
              { vi: "Mất bao lâu?", en: "How long does it take?" }
            ]},
            { type: "h3", text: "Directions You'll Hear" },
            { type: "vocab", items: [
              { vi: "Đi thẳng.", en: "Go straight." },
              { vi: "Rẽ trái.", en: "Turn left." },
              { vi: "Rẽ phải.", en: "Turn right." },
              { vi: "Gần đây thôi.", en: "It's nearby." },
              { vi: "Hơi xa, nên đi xe.", en: "A bit far, take a vehicle." }
            ]},
            { type: "h3", text: "Transport" },
            { type: "vocab", items: [
              { vi: "Xe \u00F4m", en: "motorbike taxi" },
              { vi: "X\u00EDch l\u00F4", en: "rickshaw / cycle taxi" }
            ]},
            { type: "h3", text: "Safety / Trouble" },
            { type: "vocab", items: [
              { vi: "Gi\u00FAp t\u00F4i v\u1EDBi!", en: "Help me!" },
              { vi: "T\u00F4i b\u1ECB l\u1EA1c.", en: "I am lost." }
            ]}
          ]
        },
        {
          id: 18,
          title: "18. Shopping & Bargaining",
          learnable: true,
          content: [
            { type: "prose", html: "<p>Bargaining is expected at tourist markets. At local wet markets, prices are fairer — gentle negotiation only. <strong>Never</strong> bargain for street food.</p>" },
            { type: "h3", text: "The Bargaining Rhythm" },
            { type: "vocab", items: [
              { vi: "Cái này bao nhiêu tiền?", en: "How much is this?" },
              { vi: "Đắt quá! / Mắc quá!", en: "Too expensive! (North / South)" },
              { vi: "Bớt được không?", en: "Can you lower the price?" },
              { vi: "Giảm giá được không?", en: "Can you give a discount?" },
              { vi: "Tôi trả một trăm nghìn.", en: "I'll pay 100,000." },
              { vi: "Tôi mua hai cái.", en: "I'll buy two. (discount trigger)" },
              { vi: "Thôi, tôi đi xem hàng khác.", en: "I'll look elsewhere. (walk away)" },
              { vi: "Được rồi, tôi mua.", en: "Okay, I'll buy it." }
            ]},
            { type: "h3", text: "Vendor Responses You'll Hear" },
            { type: "vocab", items: [
              { vi: "Không được, lỗ lắm.", en: "Can't, I'd lose money." },
              { vi: "Giá đó là giá tốt rồi.", en: "That's already a good price." },
              { vi: "Hàng tốt lắm.", en: "The quality is very good." }
            ]},
            { type: "highlight", html: "<strong>Price trap:</strong> Vendors drop trailing zeros. \"Ba mươi\" means 30,000 VND, not 30. Always mentally add three zeros." },
            { type: "prose", html: "<p><strong>Bargaining tips:</strong> Start at 40-50% of asking price at tourist markets, 80-90% at local markets. Smile throughout — anger kills the deal. Buying multiple items is a strong discount trigger. The walk-away is legitimate and often works. But if you agree on a price, you're obligated to buy.</p>" },
            { type: "h3", text: "Buying Fruit" },
            { type: "vocab", items: [
              { vi: "Xoài bao nhiêu một ký?", en: "How much is mango per kilo?" },
              { vi: "Chín chưa?", en: "Is it ripe?" },
              { vi: "Ngọt không?", en: "Is it sweet?" },
              { vi: "Cho tôi một ký rưỡi.", en: "Give me 1.5 kilos." },
              { vi: "Chị chọn giùm tôi.", en: "Please pick the good ones for me." }
            ]}
          ]
        },
        {
          id: 19,
          title: "19. Daily Situations",
          learnable: true,
          content: [
            { type: "h3", text: "At the Pharmacy" },
            { type: "p", html: 'Use <span lang="vi"><strong>Tôi bị...</strong></span> (I have / I\'m affected by) + symptom:' },
            { type: "vocab", items: [
              { vi: "Tôi bị đau đầu.", en: "I have a headache." },
              { vi: "Tôi bị đau bụng.", en: "I have a stomachache." },
              { vi: "Tôi bị sốt.", en: "I have a fever." },
              { vi: "Tôi bị ho.", en: "I have a cough." },
              { vi: "Tôi bị cảm.", en: "I have a cold." },
              { vi: "Tôi bị tiêu chảy.", en: "I have diarrhea." },
              { vi: "Thuốc này uống thế nào?", en: "How do I take this medicine?" },
              { vi: "Uống mấy lần một ngày?", en: "How many times a day?" }
            ]},
            { type: "h3", text: "Making Friends" },
            { type: "vocab", items: [
              { vi: "Anh cũng hay đến đây không?", en: "Do you come here often?" },
              { vi: "Mình mới đến đây vài tháng.", en: "I've only been here a few months." },
              { vi: "Nói chuyện với bạn vui lắm.", en: "Enjoyed talking with you." },
              { vi: "Bạn có Zalo không? Kết bạn đi!", en: "Do you have Zalo? Let's add each other!" },
              { vi: "Bữa nào rảnh đi cà phê nhé!", en: "When you're free let's get coffee!" }
            ]},
            { type: "h3", text: "Work & Family" },
            { type: "p", html: "Vietnamese people ask about work and family early — it's friendly, not intrusive:" },
            { type: "vocab", items: [
              { vi: "Bạn làm nghề gì?", en: "What do you do for work?" },
              { vi: "Mình dạy tiếng Anh.", en: "I teach English." },
              { vi: "Bạn có gia đình chưa?", en: "Are you married yet?" },
              { vi: "Chưa, mình vẫn còn độc thân.", en: "Not yet, still single." },
              { vi: "Bố mẹ bạn ở đâu?", en: "Where do your parents live?" },
              { vi: "Nhớ nhà không?", en: "Do you miss home?" }
            ]},
            { type: "h3", text: "Expressing Care" },
            { type: "vocab", items: [
              { vi: "Cẩn thận nhé.", en: "Take care. / Be careful." },
              { vi: "Về nhà cẩn thận nhé.", en: "Get home safely." },
              { vi: "Giữ gìn sức khỏe nhé.", en: "Take care of your health." },
              { vi: "Mau khỏe nhé.", en: "Get well soon." },
              { vi: "Nghỉ ngơi nhiều vào nhé.", en: "Rest up." }
            ]},
            { type: "h3", text: "Language Practice" },
            { type: "vocab", items: [
              { vi: "Tôi đang học tiếng Việt.", en: "I'm learning Vietnamese." },
              { vi: "Nếu mình nói sai, sửa giùm mình nha!", en: "If I say it wrong, please correct me!" },
              { vi: "Mình có thể luyện tiếng Việt với bạn không?", en: "Can I practice Vietnamese with you?" },
              { vi: "Mình muốn trao đổi ngôn ngữ.", en: "I want to do a language exchange." }
            ]},
            { type: "highlight", html: '<strong>Magic phrase:</strong> Saying "Tôi đang học tiếng Việt" triggers immediate warmth, slower speech, and encouragement from nearly every Vietnamese person.' },
            { type: "h3", text: "Getting a Haircut" },
            { type: "vocab", items: [
              { vi: "Tôi muốn cắt tóc.", en: "I'd like a haircut." },
              { vi: "Cắt tóc giá bao nhiêu?", en: "How much for a haircut? (ask first!)" },
              { vi: "Cắt ngắn thôi.", en: "Just cut it short." },
              { vi: "Đừng cắt ngắn quá.", en: "Don't cut it too short." },
              { vi: "Tỉa một chút thôi.", en: "Just a trim." },
              { vi: "Tôi muốn cắt kiểu này.", en: "I want this style. (show a photo)" },
              { vi: "Được rồi, cảm ơn.", en: "That's good, thank you." }
            ]},
            { type: "h3", text: "Pharmacy — What They'll Say Back" },
            { type: "vocab", items: [
              { vi: "Uống một ngày ba lần.", en: "Take three times a day." },
              { vi: "Uống trước bữa ăn.", en: "Take before meals." },
              { vi: "Uống sau bữa ăn.", en: "Take after meals." },
              { vi: "Tôi bị dị ứng với...", en: "I'm allergic to..." },
              { vi: "Chúc anh/chị mau khỏe.", en: "Hope you feel better soon. (pharmacist says)" }
            ]},
            { type: "h3", text: "Hobbies & Weekend Plans" },
            { type: "vocab", items: [
              { vi: "Cuối tuần này bạn có kế hoạch gì không?", en: "Do you have plans this weekend?" },
              { vi: "Lúc rảnh bạn thích làm gì?", en: "What do you like doing in your free time?" },
              { vi: "Mình hay đi chụp ảnh.", en: "I usually go take photos." },
              { vi: "Bữa nào đi cùng mình nha!", en: "Come along with me sometime!" }
            ]}
          ]
        }
      ]
    },
    {
      name: "Speaking Naturally",
      sections: [
        {
          id: 20,
          title: "20. Beyond the Textbook",
          learnable: true,
          content: [
            { type: "prose", html: "<p>Textbooks teach phrases that native speakers rarely use. This section covers what people <strong>actually</strong> say.</p>" },
            { type: "h3", text: "Real Greetings (not Xin chào)" },
            { type: "p", html: '<span lang="vi"><strong>Xin chào</strong></span> is technically correct but sounds robotic — like a language-learning app. Native speakers greet with <strong>Chào + pronoun</strong>:' },
            { type: "vocab", items: [
              { vi: "Chào anh!", en: "Hi! (to older male)" },
              { vi: "Chào chị!", en: "Hi! (to older female)" },
              { vi: "Chào em!", en: "Hi! (to younger person)" },
              { vi: "Chào bạn!", en: "Hi! (to a peer)" },
              { vi: "Chào anh! Khỏe không?", en: "Hi! How are you?" },
              { vi: "Khỏe, cảm ơn. Còn bạn?", en: "Well, thanks. And you?" },
              { vi: "Ăn cơm chưa?", en: "Have you eaten? (= How are you?)" },
              { vi: "Dạo này thế nào?", en: "How have things been lately?" },
              { vi: "Có gì mới không?", en: "Anything new?" }
            ]},
            { type: "highlight", html: '<strong>Cultural note:</strong> "Ăn cơm chưa?" is not a literal question about food — it\'s a warm social check-in, like "How are you?" Reply: <strong>Ăn rồi</strong> (already ate) or <strong>Chưa</strong> (not yet).' },
            { type: "h3", text: "Natural Farewells (not Tạm biệt)" },
            { type: "p", html: '<span lang="vi"><strong>Tạm biệt</strong></span> sounds final and formal — like saying "Farewell." In daily life, use:' },
            { type: "vocab", items: [
              { vi: "Chào nhé!", en: "Bye! (casual, most common)" },
              { vi: "Thôi, mình về nhé.", en: "Okay, I'm heading off." },
              { vi: "Hẹn gặp lại.", en: "See you again." },
              { vi: "Sớm gặp lại nhé.", en: "See you soon." },
              { vi: "Nói chuyện sau nhé.", en: "Talk later." },
              { vi: "Về nhà cẩn thận nhé.", en: "Get home safely." },
              { vi: "Bái bai!", en: "Bye bye! (casual, younger people)" }
            ]},
            { type: "h3", text: "Saying Yes — It's Not Just Có" },
            { type: "p", html: "Vietnamese has multiple words for yes, and using the wrong one can be rude:" },
            { type: "vocab", items: [
              { vi: "Dạ", en: "Yes (respectful, Southern)" },
              { vi: "Vâng", en: "Yes (respectful, Northern)" },
              { vi: "Ừ", en: "Yeah (casual — peers/younger ONLY)" },
              { vi: "Được", en: "Okay / that works" },
              { vi: "Rồi", en: "Already done (answers ...chưa? questions)" }
            ]},
            { type: "highlight", html: '<strong>Warning:</strong> Using <strong>ừ</strong> with elders or authority figures is genuinely rude, not just informal. Always use <strong>dạ</strong> or <strong>vâng</strong> with anyone older.' },
            { type: "h3", text: "Saying No Gracefully" },
            { type: "p", html: "Direct \"không\" can sound blunt. Vietnamese culture values indirectness:" },
            { type: "vocab", items: [
              { vi: "Cảm ơn, nhưng mình không được.", en: "Thanks, but I can't." },
              { vi: "Tiếc quá, lần này mình bận.", en: "Too bad, I'm busy this time." },
              { vi: "Lần sau nhé?", en: "Next time?" },
              { vi: "Để mình xem đã nha.", en: "Let me check first. (polite delay)" },
              { vi: "Chắc là khó quá.", en: "That might be too difficult. (soft no)" }
            ]},
            { type: "h3", text: "The Được Spectrum" },
            { type: "p", html: "One word, many emotional registers:" },
            { type: "vocab", items: [
              { vi: "Được!", en: "Okay! Sure! (willing)" },
              { vi: "Được rồi.", en: "Okay, I get it. (mild impatience)" },
              { vi: "Được thôi.", en: "I guess it's fine... (reluctant)" },
              { vi: "Thôi được rồi.", en: "Alright, fine. (resigned acceptance)" }
            ]},
            { type: "h3", text: "Intensifiers: rất vs lắm vs quá" },
            { type: "p", html: "Three ways to say 'very' — different feel:" },
            { type: "vocab", items: [
              { vi: "Rất ngon.", en: "Very delicious. (formal / written feel)" },
              { vi: "Ngon lắm!", en: "Really delicious! (casual spoken)" },
              { vi: "Ngon quá!", en: "So delicious! (exclamatory)" }
            ]},
            { type: "highlight", html: "<strong>Rule of thumb:</strong> <strong>rất</strong> goes BEFORE the adjective (formal). <strong>lắm</strong> and <strong>quá</strong> go AFTER (casual/spoken). In daily conversation, <strong>lắm</strong> and <strong>quá</strong> are what you'll hear and use." },
            { type: "h3", text: "Answering Questions: chưa vs không" },
            { type: "p", html: 'When someone asks a <strong>...chưa?</strong> question, answer with <strong>rồi</strong> or <strong>chưa</strong> — NOT có/không:' },
            { type: "vocab", items: [
              { vi: "Ăn cơm chưa? → Ăn rồi.", en: "Eaten yet? → Already ate. (correct)" },
              { vi: "Ăn cơm chưa? → Chưa.", en: "Eaten yet? → Not yet. (correct)" },
              { vi: "Bạn có thích không? → Có.", en: "Do you like it? → Yes. (correct)" },
              { vi: "Bạn có thích không? → Không.", en: "Do you like it? → No. (correct)" }
            ]},
            { type: "highlight", html: 'Answering a <strong>chưa</strong> question with <strong>không</strong> sounds like you\'re rejecting the concept entirely. "Ăn cơm chưa?" → "Không" sounds like you refuse to eat rice as a concept.' }
          ]
        },
        {
          id: 21,
          title: "21. Sentence-Ending Particles",
          learnable: true,
          content: [
            { type: "prose", html: "<p>These tiny words at the end of sentences carry <strong>enormous</strong> social weight. They're what makes Vietnamese sound warm, natural, and human. The same sentence with different particles is a completely different speech act.</p>" },
            { type: "h3", text: "Politeness & Softening" },
            { type: "vocab", items: [
              { vi: "Dạ, em hiểu ạ.", en: "Yes, I understand. (respectful — ạ)" },
              { vi: "Gọi cho em nhé!", en: "Call me, okay? (nhé = soft request)" },
              { vi: "Nhớ ăn cơm nha.", en: "Remember to eat, okay? (nha = Southern nhé)" },
              { vi: "Mai gặp nhau nhé.", en: "Let's meet tomorrow, okay?" }
            ]},
            { type: "highlight", html: '<strong>ạ</strong> = instant respect upgrade. Add it to the end of any sentence when speaking to elders, customers, or authority. It never sounds wrong.' },
            { type: "h3", text: "Emphasis & Assertion" },
            { type: "vocab", items: [
              { vi: "Tôi đã nói rồi mà!", en: "I already told you! (mà = mild reproach)" },
              { vi: "Ngon lắm đó!", en: "It's really delicious! (đó = emphasis)" },
              { vi: "Không thích luôn.", en: "Just don't like it, full stop. (luôn = emphatic)" },
              { vi: "Đi về rồi.", en: "Already went home. (rồi = completed)" },
              { vi: "Nè, cái này là gì?", en: "Hey, what's this? (nè = look here, Southern)" }
            ]},
            { type: "h3", text: "Questions & Checks" },
            { type: "vocab", items: [
              { vi: "Thật hả?", en: "Really? (hả = surprise)" },
              { vi: "Vậy à?", en: "Oh, is that so? (à = mild surprise)" },
              { vi: "Đúng không?", en: "Right? / Correct?" },
              { vi: "Hay chứ!", en: "That's good, obviously! (chứ = of course)" },
              { vi: "Anh đến nhỉ?", en: "You're coming, right? (nhỉ = expects yes)" }
            ]},
            { type: "h3", text: "Calls to Action" },
            { type: "vocab", items: [
              { vi: "Ăn đi!", en: "Go ahead and eat! (đi = urging)" },
              { vi: "Đi nào!", en: "Let's go! (nào = softer)" },
              { vi: "Về đi thôi.", en: "Let's just go home. (thôi = that's enough)" },
              { vi: "Kệ nó đi.", en: "Just forget it. / Let it go." }
            ]}
          ]
        },
        {
          id: 22,
          title: "22. Filler Words & Casual Speech",
          learnable: true,
          content: [
            { type: "prose", html: "<p>These are everywhere in natural spoken Vietnamese but completely absent from textbooks. Using them makes you sound like a person having a conversation, not a robot reading a phrasebook.</p>" },
            { type: "h3", text: "Thinking Sounds" },
            { type: "vocab", items: [
              { vi: "Ừ", en: "Uh-huh / yeah (casual only)" },
              { vi: "Ừm...", en: "Umm... (thinking)" },
              { vi: "Ờ", en: "Uh / er (hesitation)" },
              { vi: "À", en: "Oh / ah (realization)" }
            ]},
            { type: "h3", text: "Hedging & Explaining" },
            { type: "vocab", items: [
              { vi: "Kiểu như là...", en: "It's kinda like... (Gen Z/millennial)" },
              { vi: "Thật ra là...", en: "Actually... / To be honest..." },
              { vi: "Nói chung là...", en: "Basically... / Generally..." },
              { vi: "Ờ thì...", en: "Well, um... (buying time)" }
            ]},
            { type: "h3", text: "Common Reactions" },
            { type: "vocab", items: [
              { vi: "Thật á?", en: "Really? / No way?" },
              { vi: "Vậy à?", en: "Oh, is that so?" },
              { vi: "Mặc kệ nó.", en: "Whatever. / Never mind." },
              { vi: "Bó tay.", en: "I give up. / Can't do anything." },
              { vi: "Bình thường thôi.", en: "Just normal. / Nothing special." }
            ]},
            { type: "h3", text: "Modern Slang" },
            { type: "vocab", items: [
              { vi: "Đỉnh!", en: "Awesome! / Peak!" },
              { vi: "Toang rồi.", en: "It's ruined. / We're done for." },
              { vi: "Căng.", en: "Tense. / Intense." },
              { vi: "Xịn sò.", en: "Fancy. / Premium. / Legit." },
              { vi: "Cày.", en: "To grind / hustle hard." },
              { vi: "Phượt.", en: "Motorbike road trip / backpacking." },
              { vi: "Chém gió.", en: "To talk big / bullshit." },
              { vi: "Trăm phần trăm!", en: "Bottoms up! (100%!)" }
            ]},
            { type: "h3", text: "Reactions & Exclamations" },
            { type: "vocab", items: [
              { vi: "Tr\u1EDDi \u01A1i!", en: "Oh my God! / Oh wow!" },
              { vi: "\u1EE6a?", en: "Huh? / Wait, what?" },
              { vi: "Ngon qu\u00E1!", en: "So delicious!" },
              { vi: "\u0110\u1EB9p qu\u00E1!", en: "So beautiful!" },
              { vi: "M\u1EC7t qu\u00E1!", en: "So tired!" }
            ]}
          ]
        },
        {
          id: 23,
          title: "23. North vs South",
          learnable: true,
          content: [
            { type: "prose", html: "<p>Vietnamese has significant regional differences. Most textbooks teach Northern (Hanoi) Vietnamese. If you're in Ho Chi Minh City or the South, these differences matter daily.</p>" },
            { type: "table", headers: ["English", "North", "South"], rows: [
              { cells: ["Yes (respectful)", "Vâng", "Dạ"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Father", "Bố", "Ba"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Mother", "Mẹ", "Má"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["I (casual)", "Tớ / Tôi", "Tui"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Bowl", "Bát", "Chén"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Cup / glass", "Cốc", "Ly"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Fruit", "Quả", "Trái"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Softener particle", "Nhé / Nhỉ", "Nha / Nghen"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Oh my god!", "Ối giời ơi", "Trời ơi"], viCells: [1, 2], viLang: [1, 2] }
            ]},
            { type: "h3", text: "Pronunciation Differences" },
            { type: "ul", items: [
              '<strong>d / gi:</strong> Northern = <em>z</em> sound, Southern = <em>y</em> sound',
              '<strong>r:</strong> Northern = retroflex <em>r</em>, Southern = like <em>z</em>',
              '<strong>tr / ch:</strong> Northern = distinct sounds, Southern = often merged',
              '<strong>Tones:</strong> Southern hỏi and ngã often merge into one tone'
            ]},
            { type: "highlight", html: "<strong>Practical advice:</strong> Learn one dialect and stick with it. People understand both. In the South, using <strong>dạ</strong> instead of <strong>vâng</strong> sounds more natural." }
          ]
        }
      ]
    },
    {
      name: "Culture",
      sections: [
        {
          id: 24,
          title: "24. Cultural Etiquette",
          learnable: false,
          content: [
            { type: "p", html: "Social and cultural behaviors that help daily interaction go more smoothly." },
            { type: "h3", text: "Use Both Hands" },
            { type: "prose", html: "When giving or receiving items, using two hands can feel more respectful." },
            { type: "h3", text: "Head & Feet" },
            { type: "ul", items: [
              "Avoid touching someone's head.",
              "Avoid pointing your feet at people or sacred spaces."
            ]},
            { type: "h3", text: "Don't Step Over Objects" },
            { type: "prose", html: "Never step over books, food, cooking pots, altars, or people. Feet are considered the lowest part of the body — stepping over something transfers disrespect to it. Books carry knowledge, food sustains life, altars carry spiritual significance. Also avoid crossing in front of a funeral procession." },
            { type: "h3", text: "Shoes Off" },
            { type: "prose", html: "Remove shoes before entering a home, and often at temples or certain indoor spaces." },
            { type: "h3", text: "Dress Modestly at Religious Sites" },
            { type: "prose", html: "Cover shoulders and knees when visiting temples or religious places." },
            { type: "h3", text: "Greet Elders First" },
            { type: "prose", html: "Respect toward elders is important. Use calm, polite, warm speech." },
            { type: "h3", text: "General Demeanor" },
            { type: "prose", html: "A calm, smiling, respectful manner goes a long way. Vietnamese communication often values warmth and social sensitivity." }
          ]
        }
      ]
    },
        {
      name: "Study Guide",
      sections: [
        {
          id: 25,
          title: "25. Study Order",
          learnable: false,
          content: [
            { type: "h3", text: "Recommended Learning Order" },
            { type: "ol", items: [
              "Tones",
              "Hard vowels",
              "Contextual spelling/pronunciation families",
              "Telex typing",
              "Pronouns",
              "50 common words",
              "10 survival phrases",
              "Self-introduction",
              "Caf\u00E9 / ordering vocabulary",
              "Speak often, even imperfectly"
            ]},
            { type: "h3", text: "Best Beginner Focus" },
            { type: "p", html: "If you only focus on a few things at first:" },
            { type: "ul", items: [
              "Tones",
              "Vowels",
              "Typing",
              "Pronouns",
              "Daily phrases",
              "Caf\u00E9 language",
              "Speaking regularly"
            ]},
            { type: "highlight", html: "<strong>Main principle:</strong> Speak often, even imperfectly." }
          ]
        }
      ]
    },
    {
      name: "Quick Reference",
      sections: [
        {
          id: 26,
          title: "26. Mini Cheat Sheet",
          learnable: true,
          content: [
            { type: "h3", text: "Pronunciation" },
            { type: "table", headers: ["Letter", "Sound"], rows: [
              { cells: ["\u0103", "short a"], viCells: [0], viLang: [0] },
              { cells: ["\u00E2", "short uh"], viCells: [0], viLang: [0] },
              { cells: ["\u00EA", "close ay"], viCells: [0], viLang: [0] },
              { cells: ["\u00F4", "clipped oh"], viCells: [0], viLang: [0] },
              { cells: ["\u01A1", "rounded uh/er"], viCells: [0], viLang: [0] },
              { cells: ["\u01B0", "ee with rounded lips"], viCells: [0], viLang: [0] },
              { cells: ["\u0111", "d"], viCells: [0], viLang: [0] },
              { cells: ["d / gi", "z or y depending on dialect"], viCells: [0], viLang: [0] }
            ]},
            { type: "h3", text: "Context Families" },
            { type: "ul", items: [
              "<strong>c / k / qu</strong>",
              "<strong>g / gh</strong>",
              "<strong>ng / ngh</strong>",
              "<strong>d / gi / \u0111</strong>",
              "<strong>ph / th / kh / nh</strong>"
            ]},
            { type: "h3", text: "Telex" },
            { type: "table", headers: ["Type", "Get"], rows: [
              { cells: ["aa", "\u00E2"], viCells: [1], viLang: [1] },
              { cells: ["aw", "\u0103"], viCells: [1], viLang: [1] },
              { cells: ["ee", "\u00EA"], viCells: [1], viLang: [1] },
              { cells: ["oo", "\u00F4"], viCells: [1], viLang: [1] },
              { cells: ["ow", "\u01A1"], viCells: [1], viLang: [1] },
              { cells: ["uw", "\u01B0"], viCells: [1], viLang: [1] },
              { cells: ["dd", "\u0111"], viCells: [1], viLang: [1] },
              { cells: ["s", "\u00E1"], viCells: [1], viLang: [1] },
              { cells: ["f", "\u00E0"], viCells: [1], viLang: [1] },
              { cells: ["r", "\u1EA3"], viCells: [1], viLang: [1] },
              { cells: ["x", "\u00E3"], viCells: [1], viLang: [1] },
              { cells: ["j", "\u1EA1"], viCells: [1], viLang: [1] },
              { cells: ["z", "clear mark"] }
            ]},
            { type: "h3", text: "Pronouns" },
            { type: "vocab", items: [
              { vi: "t\u00F4i", en: "I" },
              { vi: "b\u1EA1n", en: "you" },
              { vi: "anh", en: "older male" },
              { vi: "ch\u1ECB", en: "older female" },
              { vi: "em", en: "younger person" }
            ]},
            { type: "h3", text: "Time" },
            { type: "vocab", items: [
              { vi: "h\u00F4m nay", en: "today" },
              { vi: "h\u00F4m qua", en: "yesterday" },
              { vi: "ng\u00E0y mai", en: "tomorrow" },
              { vi: "b\u00E2y gi\u1EDD", en: "now" }
            ]},
            { type: "p", html: '<span lang="vi"><strong>s\u00E1ng / tr\u01B0a / chi\u1EC1u / t\u1ED1i / \u0111\u00EAm</strong></span>' },
            { type: "h3", text: "Useful Phrases" },
            { type: "vocab", items: [
              { vi: "T\u00F4i l\u00E0 ...", en: "I am ..." },
              { vi: "T\u00F4i \u0111ang h\u1ECDc ti\u1EBFng Vi\u1EC7t.", en: "I am learning Vietnamese." },
              { vi: "T\u00F4i kh\u00F4ng hi\u1EC3u.", en: "I do not understand." },
              { vi: "Xin n\u00F3i ch\u1EADm th\u00F4i.", en: "Please speak slowly." },
              { vi: "Xin nh\u1EAFc l\u1EA1i.", en: "Please repeat." },
              { vi: "Bao nhi\u00EAu ti\u1EC1n?", en: "How much?" },
              { vi: "Nh\u00E0 v\u1EC7 sinh \u1EDF \u0111\u00E2u?", en: "Where is the bathroom?" },
              { vi: "C\u00E1i n\u00E0y l\u00E0 g\u00EC?", en: "What is this?" },
              { vi: "Gi\u00FAp t\u00F4i v\u1EDBi!", en: "Help me!" },
              { vi: "\u0102n c\u01A1m ch\u01B0a?", en: "Have you eaten yet?" }
            ]}
          ]
        },
        {
          id: 27,
          title: "27. Final Message",
          learnable: false,
          content: [
            { type: "prose", html: "<p>Vietnamese becomes much easier once you stop treating it like English with accents and start treating it like its own sound system.</p><p><strong>Your first wins should be:</strong></p>" },
            { type: "ul", items: [
              "Hearing the tones",
              "Noticing the vowel differences",
              "Using the right pronoun roughly well",
              "Typing with Telex",
              "Saying short daily phrases confidently"
            ]},
            { type: "highlight", html: 'You do not need perfect grammar to start speaking. You need <strong>repetition, listening, and willingness to speak</strong>.' },
            { type: "prose", html: "<p>Use Vietnamese every Friday at Chillax, use it in caf\u00E9s, use it with friends, use it badly at first, and keep going.</p><p><strong>That is how it starts to become natural.</strong></p>" }
          ]
        }
      ]
    }
  ]
};
