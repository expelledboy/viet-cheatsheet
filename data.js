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
    suffix: "— all levels welcome!"
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
              { vi: "Tôi không hiểu.", en: "I do not understand." },
              { vi: "Tôi chưa hiểu.", en: "I do not understand yet." },
              { vi: "Xin nói chậm thôi.", en: "Please speak slowly." },
              { vi: "Xin nhắc lại.", en: "Please repeat." },
              { vi: "Cái này là gì?", en: "What is this?" },
              { vi: "Bao nhiêu tiền?", en: "How much?" },
              { vi: "Ở đâu?", en: "Where?" },
              { vi: "... ở đâu?", en: "Where is ...?" },
              { vi: "Nhà vệ sinh ở đâu?", en: "Where is the bathroom?" },
              { vi: "Tôi muốn cái này.", en: "I want this." },
              { vi: "Giúp tôi với!", en: "Help me!" },
              { vi: "Dừng ở đây.", en: "Stop here." },
              { vi: "Tôi bị lạc.", en: "I am lost." }
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
              { cells: ["2", "sắc", "má", "rising"], viCells: [2], viLang: [1, 2] },
              { cells: ["3", "huyền", "mà", "falling"], viCells: [2], viLang: [1, 2] },
              { cells: ["4", "hỏi", "mả", "dipping / questioning"], viCells: [2], viLang: [1, 2] },
              { cells: ["5", "ngã", "mã", "high rising / broken"], viCells: [2], viLang: [1, 2] },
              { cells: ["6", "nặng", "mạ", "low dropping / heavy"], viCells: [2], viLang: [1, 2] }
            ]},
            { type: "highlight", html: "<strong>Remember:</strong> Tone changes meaning. Tone is not optional. Written marks matter." },
            { type: "prose", html: '<p><strong>Beginner note:</strong> Standard written Vietnamese distinguishes all 6 tones. In much southern speech, <span lang="vi">hỏi</span> and <span lang="vi">ngã</span> may sound similar or merge somewhat.</p>' },
            { type: "h3", text: "Tone Practice Tips" },
            { type: "ul", items: [
              "Trace the tone contour in the air with your hand while speaking",
              "Nặng has a “thud” — it ends abruptly, like a door slamming",
              "Hỏi “asks a question” — it rises at the end like English question intonation",
              "Record yourself and compare against native speakers on Forvo or Google Translate"
            ]}
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
              { cells: ["ă", "short a; very brief \"a\""], viCells: [0], viLang: [0] },
              { cells: ["â", "short central uh"], viCells: [0], viLang: [0] },
              { cells: ["ê", "close ay without a strong glide"], viCells: [0], viLang: [0] },
              { cells: ["ô", "close, clipped oh"], viCells: [0], viLang: [0] },
              { cells: ["ơ", "relaxed uh/er — lips unrounded (contrast: ô is rounded)"], viCells: [0], viLang: [0] },
              { cells: ["ư", "like oo but with lips spread flat, not rounded"], viCells: [0], viLang: [0] }
            ]},
            { type: "h3", text: "Tricky Consonants (often confused with vowels)" },
            { type: "table", headers: ["Letter", "Sound"], rows: [
              { cells: ["đ", "hard English-like d"], viCells: [0], viLang: [0] },
              { cells: ["d / gi", "often z (North), often y (South)"], viCells: [0], viLang: [0] }
            ]},
            { type: "h3", text: "Vowel Families" },
            { type: "p", html: "Learn these as contrast groups:" },
            { type: "ul", items: [
              "<strong>a / ă / â</strong>",
              "<strong>o / ô / ơ</strong>",
              "<strong>u / ư</strong>",
              "<strong>e / ê</strong>"
            ], viLang: true },
            { type: "highlight", html: 'These are not decorative marks. They are <strong>different vowels</strong>.' },
            { type: "h3", text: "Common Diphthongs" },
            { type: "prose", html: "Vietnamese has gliding vowel combinations. Move smoothly from one position to the next:" },
            { type: "ul", items: [
              "<strong>ia / iê</strong> — ee-uh glide (tiếng, biển)",
              "<strong>ua / uô</strong> — oo-uh glide (muốn, chuối)",
              "<strong>ưa / ươ</strong> — ư-uh glide (được, mười)",
              "<strong>yêu</strong> — ee-eh-oo (love) — a triphthong"
            ], viLang: true }
          ]
        },
        {
          id: 4,
          title: "4. Pronunciation Rules",
          learnable: false,
          content: [
            { type: "p", html: "Some Vietnamese letters are pronounced differently, or spelled differently, depending on what letters come next. This is one of the most important reading rules for English speakers." },
            { type: "h3", text: "4.1 c / k / qu" },
            { type: "p", html: "These all start with a <em>k</em> sound, but <strong>qu</strong> adds a <em>w</em> glide." },
            { type: "ul", items: [
              "<strong>c</strong> before a, o, ô, ơ, u, ư → /k/",
              "<strong>k</strong> before e, ê, i → /k/",
              "<strong>qu</strong> → /kw/ (like English “qu” in “queen”)"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>cá</strong></span> /ka/, <span lang="vi"><strong>kẹo</strong></span> /kɛo/, <span lang="vi"><strong>quay</strong></span> /kway/' },
            { type: "prose", html: "<strong>c</strong> and <strong>k</strong> are the same sound in different spelling contexts. <strong>qu</strong> is distinct — the <em>w</em> glide changes the word (cay ≠ quay)." },
            { type: "h3", text: "4.2 g / gh" },
            { type: "p", html: "Same base sound, spelling changes by following vowel." },
            { type: "ul", items: [
              "<strong>g</strong> before a, o, ô, ơ, u, ư",
              "<strong>gh</strong> before e, ê, i"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>ga</strong></span>, <span lang="vi"><strong>ghế</strong></span>, <span lang="vi"><strong>ghi</strong></span>' },
            { type: "h3", text: "4.3 ng / ngh" },
            { type: "p", html: 'Same <em>ng</em> sound (like the end of English "sing"), spelling changes by next vowel.' },
            { type: "ul", items: [
              "<strong>ng</strong> before a, o, ô, ơ, u, ư",
              "<strong>ngh</strong> before e, ê, i"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>nga</strong></span>, <span lang="vi"><strong>nghe</strong></span>, <span lang="vi"><strong>nghỉ</strong></span>' },
            { type: "h3", text: "4.4 gi" },
            { type: "p", html: '<span lang="vi"><strong>gi</strong></span> is usually one sound, not separate g + i.' },
            { type: "ul", items: [
              "Northern: often like <strong>z</strong>",
              "Southern: often like <strong>y</strong>"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>gì</strong></span>, <span lang="vi"><strong>giỏi</strong></span>, <span lang="vi"><strong>giới</strong></span>' },
            { type: "h3", text: "4.5 d vs đ" },
            { type: "p", html: "These are different letters." },
            { type: "ul", items: [
              '<strong lang="vi">đ</strong> = hard English-like d',
              "<strong>d</strong> = often z (North), often y (South)"
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>đi</strong></span>, <span lang="vi"><strong>dì</strong></span>' },
            { type: "h3", text: "4.6 nh" },
            { type: "p", html: "<strong>nh</strong> = soft <em>ny</em> sound. Similar in spirit to Spanish ñ." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>nhà</strong></span>, <span lang="vi"><strong>nhanh</strong></span>' },
            { type: "h3", text: "4.7 th" },
            { type: "p", html: '<strong>th</strong> in Vietnamese is not English "th." It is an aspirated <em>t</em>.' },
            { type: "p", html: 'Examples: <span lang="vi"><strong>thôi</strong></span>, <span lang="vi"><strong>thích</strong></span>' },
            { type: "h3", text: "4.8 ph" },
            { type: "p", html: "<strong>ph</strong> = <em>f</em> sound." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>phở</strong></span>, <span lang="vi"><strong>phải</strong></span>' },
            { type: "h3", text: "4.9 kh" },
            { type: "p", html: "<strong>kh</strong> = rough throaty sound, like German <em>Bach</em> or Scottish <em>loch</em>." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>không</strong></span>, <span lang="vi"><strong>khỏe</strong></span>' },
            { type: "h3", text: "4.10 tr and ch" },
            { type: "p", html: "Different sounds, though beginners often hear them as similar at first." },
            { type: "p", html: 'Examples: <span lang="vi"><strong>trà</strong></span>, <span lang="vi"><strong>cha</strong></span>' },
            { type: "h3", text: "4.11 Tiny Rule" },
            { type: "prose", html: 'When you see extra letters such as the <strong>h</strong> in <em>gh</em> / <em>ngh</em>, they often do not create a brand-new English-style sound. They often exist to show which vowel can follow while preserving the same base sound.' },
            { type: "h3", text: "4.12 Unreleased Final Stops" },
            { type: "prose", html: "In English, final stops (-p, -t, -k) release a puff of air. In Vietnamese, they are <strong>unreleased</strong> — your mouth closes but no air escapes. This is the #1 reason native speakers can’t understand words you’re saying correctly." },
            { type: "ul", items: [
              "<strong>-p</strong> — lips seal shut, held. đẹp ends in silence.",
              "<strong>-t</strong> — tongue tip touches ridge, held. một ends in silence.",
              "<strong>-c / -ch</strong> — back or mid-tongue closes, held. học ends in silence.",
              "<strong>-ng / -nh</strong> — nasal finals: -ng = back nasal (like “sing”), -nh = front/palatal nasal (like “canyon”)"
            ]},
            { type: "highlight", html: "<strong>Tip:</strong> Practice by whispering the final consonant — this removes the aspiration reflex. If a Vietnamese speaker can’t understand a word you said correctly, an unreleased final is often why." },
            { type: "h3", text: "4.13 Memorize as Spelling Families" },
            { type: "ul", items: [
              "<strong>c / k / qu</strong>",
              "<strong>g / gh</strong>",
              "<strong>ng / ngh</strong>",
              "<strong>d / gi / đ</strong>",
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
            { type: "h3", text: "5.1 Setup (Android / QWERTY)" },
            { type: "ol", items: [
              "Add Vietnamese in Gboard settings",
              "Switch to the Vietnamese keyboard",
              "Use Telex input"
            ]},
            { type: "p", html: "This is the fastest and most common digital method." },
            { type: "h3", text: "5.2 Letter Transformations" },
            { type: "table", headers: ["Type", "Get"], rows: [
              { cells: ["aa", "â"], viCells: [1], viLang: [1] },
              { cells: ["aw", "ă"], viCells: [1], viLang: [1] },
              { cells: ["ee", "ê"], viCells: [1], viLang: [1] },
              { cells: ["oo", "ô"], viCells: [1], viLang: [1] },
              { cells: ["ow", "ơ"], viCells: [1], viLang: [1] },
              { cells: ["uw", "ư"], viCells: [1], viLang: [1] },
              { cells: ["dd", "đ"], viCells: [1], viLang: [1] }
            ]},
            { type: "h3", text: "5.3 Tone Keys" },
            { type: "table", headers: ["Key", "Tone", "Example"], rows: [
              { cells: ["s", "sắc", "á"], viCells: [2], viLang: [1, 2] },
              { cells: ["f", "huyền", "à"], viCells: [2], viLang: [1, 2] },
              { cells: ["r", "hỏi", "ả"], viCells: [2], viLang: [1, 2] },
              { cells: ["x", "ngã", "ã"], viCells: [2], viLang: [1, 2] },
              { cells: ["j", "nặng", "ạ"], viCells: [2], viLang: [1, 2] },
              { cells: ["z", "remove mark / clear tone"], colspan: { 1: 2 } }
            ]},
            { type: "h3", text: "5.4 Examples" },
            { type: "telex", items: [
              { input: "tieengs Vieetj", output: "tiếng Việt" },
              { input: "tooi", output: "tôi" },
              { input: "nguwowfi", output: "người" }
            ]},
            { type: "highlight", html: "<strong>Tip:</strong> Learn Telex early — it makes typing, searching, messaging, and note-taking much easier." }
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
            { type: "h3", text: "6.1 Safe Basics" },
            { type: "vocab", items: [
              { vi: "tôi", en: "I / me, neutral-polite" },
              { vi: "mình", en: "I / me, softer, warmer, friendlier" },
              { vi: "bạn", en: "you, neutral/friendly" }
            ]},
            { type: "h3", text: "6.2 Plurals &amp; Third Person" },
            { type: "vocab", items: [
              { vi: "chúng tôi", en: "we (excludes listener)" },
              { vi: "chúng ta", en: "we (includes listener)" },
              { vi: "họ", en: "they / them" }
            ]},
            { type: "prose", html: '<strong>mình</strong> can also mean intimate "we" between couples or close friends: <span lang="vi"><strong>Mình đi ăn nhé?</strong></span> = "Shall we go eat?"' },
            { type: "h3", text: "6.3 The Sibling Rule" },
            { type: "vocab", items: [
              { vi: "anh", en: "older brother / you (male, older) / I (if male &amp; older)" },
              { vi: "chị", en: "older sister / you (female, older) / I (if female &amp; older)" },
              { vi: "em", en: "younger person / you / I in younger position" }
            ]},
            { type: "h3", text: "6.4 Elders &amp; Older Adults" },
            { type: "vocab", items: [
              { vi: "cô", en: "aunt / older woman / teacher" },
              { vi: "chú", en: "uncle / older man" },
              { vi: "bác", en: "older aunt/uncle generation" },
              { vi: "ông", en: "grandfather / elderly man" },
              { vi: "bà", en: "grandmother / elderly woman" }
            ]},
            { type: "h3", text: "The Pronoun Shift" },
            { type: "prose", html: "Pronouns change based on WHO you're talking to, not who you are. If you're a 25-year-old woman talking to a 30-year-old man, you call yourself <strong>em</strong> and him <strong>anh</strong>. Five minutes later, talking to a 20-year-old guy, you flip: you're <strong>chị</strong>, he's <strong>em</strong>. The pronouns change; your age doesn't." },
            { type: "h3", text: "Getting Attention: [pronoun] + ơi" },
            { type: "vocab", items: [
              { vi: "Em ơi!", en: "Hey! (to younger person / staff)" },
              { vi: "Anh ơi!", en: "Hey! (to older male)" },
              { vi: "Chị ơi!", en: "Hey! (to older female)" }
            ]},
            { type: "highlight", html: "This is how you get attention at restaurants, shops, and street stalls. Not \"Hello!\" — not waving — <strong>[pronoun] + ơi</strong>." },
            { type: "h3", text: "Casual & Close Friends" },
            { type: "vocab", items: [
              { vi: "tới", en: "I (informal, friends)" },
              { vi: "tui", en: "I (Southern casual)" },
              { vi: "tao", en: "I (very close friends ONLY — rude otherwise)" },
              { vi: "mày", en: "you (very close friends ONLY — rude otherwise)" }
            ]},
            { type: "highlight", html: '<strong>Warning:</strong> <strong>tao / mày</strong> are intimate pronouns for close friends. Using them with anyone else "will cause a fight" — every native speaker source agrees on this.' },
            { type: "h3", text: "Safe Beginner Rule" },
            { type: "highlight", html: 'If unsure, use <strong lang="vi">tôi</strong> for "I" and <strong lang="vi">bạn</strong> for "you." It sounds slightly formal but never offends. Then gradually learn family-style pronouns as you get more comfortable.' },
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
              { vi: "Tôi ăn cơm.", en: "I eat rice." },
              { vi: "Tôi thích cà phê.", en: "I like coffee." },
              { vi: "Tôi học tiếng Việt.", en: "I study Vietnamese." },
              { vi: "Tôi không hiểu.", en: "I do not understand." }
            ]},
            { type: "h3", text: "7.1 Adjectives Follow Nouns" },
            { type: "p", html: "No copula (“is”) needed. Adjectives act as their own verbs:" },
            { type: "vocab", items: [
              { vi: "cà phê ngon", en: "delicious coffee" },
              { vi: "Cô ấy đẹp.", en: "She is beautiful. (no là)" }
            ]},
            { type: "highlight", html: '<strong>Common mistake:</strong> Never use <strong>là</strong> before adjectives. <span lang="vi">Cô ấy <s>là</s> đẹp</span> is wrong. <strong>là</strong> only links nouns: <span lang="vi">Tôi là sinh viên.</span>' },
            { type: "h3", text: "7.2 Negation" },
            { type: "vocab", items: [
              { vi: "không", en: "not / no (negates verbs and adjectives)" },
              { vi: "không phải là", en: "is not (negates là + noun)" }
            ]},
            { type: "vocab", items: [
              { vi: "Tôi không phải là giáo viên.", en: "I am not a teacher." }
            ]},
            { type: "h3", text: "7.3 Questions" },
            { type: "vocab", items: [
              { vi: "Có ngon không?", en: "Is it tasty? (có...không? pattern)" },
              { vi: "Bạn ăn chưa?", en: "Have you eaten yet? (...chưa? pattern)" },
              { vi: "Bạn là người Mỹ, phải không?", en: "You're American, right?" }
            ]},
            { type: "h3", text: "7.4 Possession" },
            { type: "vocab", items: [
              { vi: "của tôi", en: "my / mine" },
              { vi: "Đây là sách của tôi.", en: "This is my book." }
            ]},
            { type: "prose", html: "<strong>của</strong> is often dropped in casual speech when context is clear — <span lang=\"vi\">sách tôi</span> is natural." },
            { type: "h3", text: "7.5 Comparison" },
            { type: "vocab", items: [
              { vi: "đắt hơn", en: "more expensive" },
              { vi: "đắt nhất", en: "most expensive" },
              { vi: "Hà Nội lạnh hơn Sài Gòn.", en: "Hanoi is colder than Saigon." }
            ]},
            { type: "h3", text: "7.6 Existence / Location" },
            { type: "vocab", items: [
              { vi: "có", en: "have / there is" },
              { vi: "ở", en: "at / in (location)" },
              { vi: "Có nhà vệ sinh không?", en: "Is there a bathroom?" }
            ]}
          ]
        },
        {
          id: 8,
          title: "8. Time, Aspect &amp; Particles",
          learnable: true,
          content: [
            { type: "p", html: "Vietnamese does not use tense the way English does. Instead, it often uses time words and particles." },
            { type: "h3", text: "8.1 Core Particles" },
            { type: "vocab", items: [
              { vi: "đã", en: "past / already" },
              { vi: "đang", en: "currently / in progress" },
              { vi: "sẽ", en: "future / will" },
              { vi: "vừa", en: "just happened" },
              { vi: "chưa", en: "not yet" },
              { vi: "rồi", en: "already / finished / then" },
              { vi: "nữa", en: "more / again" },
              { vi: "xong", en: "finished / done (after verb)" },
              { vi: "mới", en: "just / only recently" },
              { vi: "sắp", en: "about to / imminent" },
              { vi: "hay / thường", en: "often / usually" }
            ]},
            { type: "h3", text: "8.2 Examples" },
            { type: "vocab", items: [
              { vi: "Tôi đang học tiếng Việt.", en: "I am learning Vietnamese." },
              { vi: "Tôi đã ăn rồi.", en: "I already ate." },
              { vi: "Tôi sẽ đi.", en: "I will go." },
              { vi: "Tôi vừa đến.", en: "I just arrived." },
              { vi: "Tôi chưa hiểu.", en: "I do not understand yet." },
              { vi: "Ăn xong rồi.", en: "Done eating." },
              { vi: "Tôi mới đến.", en: "I only just arrived." },
              { vi: "Tôi sắp đi.", en: "I'm about to leave." }
            ]},
            { type: "h3", text: "8.3 Polite &amp; Softening Particles" },
            { type: "vocab", items: [
              { vi: "ạ", en: "respectful sentence ending" },
              { vi: "dạ", en: 'polite "yes" / polite response starter' },
              { vi: "nhé / nha", en: "friendly, soft sentence ending" }
            ]},
            { type: "p", html: 'Examples: <span lang="vi"><strong>Dạ, em hiểu ạ.</strong></span> • <span lang="vi"><strong>Đi nhé.</strong></span> • <span lang="vi"><strong>Ngồi đây nha.</strong></span>' },
            { type: "prose", html: "These do a lot of social work in Vietnamese." }
          ]
        },
        {
          id: 9,
          title: "9. Classifiers",
          learnable: true,
          content: [
            { type: "p", html: "Vietnamese commonly uses classifiers with nouns." },
            { type: "h3", text: "9.1 Core Classifiers" },
            { type: "vocab", items: [
              { vi: "cái", en: "general object (default for things)" },
              { vi: "con", en: "animal (also: roads, rivers, knives)" },
              { vi: "người", en: "person" },
              { vi: "ly", en: "glass / cup (drinks)" },
              { vi: "chiếc", en: "single item, esp. vehicles & paired objects" },
              { vi: "quả / trái", en: "fruit, round objects (quả = North, trái = South)" },
              { vi: "tờ", en: "flat sheet (paper, banknote)" },
              { vi: "cuốn / quyển", en: "book, bound volume" },
              { vi: "bộ", en: "set, collection (clothes, films)" },
              { vi: "đôi", en: "pair (shoes, chopsticks)" },
              { vi: "chai", en: "bottle" }
            ]},
            { type: "h3", text: "9.2 Examples" },
            { type: "vocab", items: [
              { vi: "một cái bàn", en: "one table" },
              { vi: "một con mèo", en: "one cat" },
              { vi: "một chiếc xe máy", en: "a motorbike" },
              { vi: "một quả cam", en: "an orange" },
              { vi: "một đôi đũa", en: "a pair of chopsticks" },
              { vi: "một chai bia", en: "a bottle of beer" },
              { vi: "một bộ phim", en: "a film / movie" }
            ]},
            { type: "prose", html: "Pattern: <strong>number + classifier + noun</strong>. In casual speech, <strong>một</strong> is sometimes dropped when context is clear." }
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
            { type: "h3", text: "10.1 Core Time Words" },
            { type: "vocab", items: [
              { vi: "hôm nay", en: "today" },
              { vi: "hôm qua", en: "yesterday" },
              { vi: "ngày mai", en: "tomorrow" },
              { vi: "bây giờ", en: "now" },
              { vi: "khi nào?", en: "when?" },
              { vi: "bao lâu?", en: "how long?" },
              { vi: "mấy giờ?", en: "what time?" }
            ]},
            { type: "h3", text: "10.2 Parts of the Day" },
            { type: "vocab", items: [
              { vi: "sáng", en: "morning" },
              { vi: "trưa", en: "noon / lunchtime" },
              { vi: "chiều", en: "afternoon" },
              { vi: "tối", en: "evening" },
              { vi: "đêm", en: "night" }
            ]},
            { type: "h3", text: "10.3 Days of the Week" },
            { type: "vocab", items: [
              { vi: "thứ hai", en: "Monday" },
              { vi: "thứ ba", en: "Tuesday" },
              { vi: "thứ tư", en: "Wednesday" },
              { vi: "thứ năm", en: "Thursday" },
              { vi: "thứ sáu", en: "Friday" },
              { vi: "thứ bảy", en: "Saturday" },
              { vi: "chủ nhật", en: "Sunday" }
            ]},
            { type: "prose", html: "Monday = thứ hai (\"second day\") because Sunday is considered the first day." },
            { type: "h3", text: "10.4 Calendar &amp; Duration" },
            { type: "vocab", items: [
              { vi: "tuần", en: "week" },
              { vi: "tháng", en: "month" },
              { vi: "năm", en: "year" },
              { vi: "tuần trước", en: "last week" },
              { vi: "tuần sau", en: "next week" },
              { vi: "sớm", en: "early" },
              { vi: "muộn / trễ", en: "late (muộn = North, trễ = South)" }
            ]}
          ]
        },
        {
          id: 11,
          title: "11. Numbers",
          learnable: true,
          content: [
            { type: "h3", text: "11.1 Basic Numbers" },
            { type: "vocab", items: [
              { vi: "không", en: "0" },
              { vi: "một", en: "1" },
              { vi: "hai", en: "2" },
              { vi: "ba", en: "3" },
              { vi: "bốn", en: "4" },
              { vi: "năm", en: "5" },
              { vi: "sáu", en: "6" },
              { vi: "bảy", en: "7" },
              { vi: "tám", en: "8" },
              { vi: "chín", en: "9" },
              { vi: "mười", en: "10" }
            ]},
            { type: "h3", text: "11.2 Useful Compounds" },
            { type: "vocab", items: [
              { vi: "mười một", en: "11" },
              { vi: "mười lăm", en: "15 (lăm, not năm)" },
              { vi: "hai mươi", en: "20" },
              { vi: "hai mươi mốt", en: "21 (mốt, not một)" },
              { vi: "ba mươi lăm", en: "35 (both rules at once)" },
              { vi: "một trăm", en: "100" },
              { vi: "một nghìn", en: "1,000" },
              { vi: "một triệu", en: "1,000,000" }
            ]},
            { type: "h3", text: "11.3 Number Rules" },
            { type: "prose", html: "Vietnamese changes digit words in compound numbers:" },
            { type: "ul", items: [
              "<strong>mươi</strong> (not mười) for tens 20–90: hai mươi, ba mươi…",
              "<strong>lăm</strong> replaces năm in units position: 25 = hai mươi lăm (but 50 = năm mươi)",
              "<strong>mốt</strong> replaces một in units position for 21, 31, 41… (but 11 = mười một)"
            ]},
            { type: "h3", text: "11.4 Reading Prices" },
            { type: "vocab", items: [
              { vi: "ba mươi nghìn", en: "30,000 VND (common street food price)" },
              { vi: "một trăm nghìn", en: "100,000 VND" },
              { vi: "hai trăm năm mươi nghìn", en: "250,000 VND" }
            ]},
            { type: "highlight", html: "<strong>Price trap:</strong> Vendors drop “nghìn” — “ba mươi” means 30,000 VND, not 30. Always mentally add three zeros." }
          ]
        },
        {
          id: 12,
          title: "12. Common Verbs &amp; Words",
          learnable: true,
          content: [
            { type: "p", html: "These are used all the time." },
            { type: "h3", text: "12.1 Core Verbs" },
            { type: "vocab", items: [
              { vi: "là", en: "to be" },
              { vi: "có", en: "to have / there is" },
              { vi: "đi", en: "to go" },
              { vi: "đến", en: "to come / arrive" },
              { vi: "về", en: "to return / go back" },
              { vi: "ăn", en: "to eat" },
              { vi: "uống", en: "to drink" },
              { vi: "ngủ", en: "to sleep" },
              { vi: "biết", en: "to know" },
              { vi: "hiểu", en: "to understand" },
              { vi: "thích", en: "to like" },
              { vi: "muốn", en: "to want" },
              { vi: "cần", en: "to need" },
              { vi: "được", en: "can / okay / receive / acceptable" },
              { vi: "ở", en: "at / in / to live at" },
              { vi: "với", en: "with" },
              { vi: "cho", en: "give / for" },
              { vi: "nói", en: "to speak / say" },
              { vi: "hỏi", en: "to ask" },
              { vi: "mua", en: "to buy" },
              { vi: "gọi", en: "to call / to order (food)" },
              { vi: "làm", en: "to do / make / work" },
              { vi: "đợi / chờ", en: "to wait" },
              { vi: "tìm", en: "to look for / find" }
            ]},
            { type: "h3", text: "12.2 Common Adjectives" },
            { type: "vocab", items: [
              { vi: "ngon", en: "delicious" },
              { vi: "đẹp", en: "beautiful / nice" },
              { vi: "nóng", en: "hot" },
              { vi: "lạnh", en: "cold" },
              { vi: "nhanh", en: "fast" },
              { vi: "chậm", en: "slow" },
              { vi: "đắt", en: "expensive" },
              { vi: "rẻ", en: "cheap" },
              { vi: "mới", en: "new" },
              { vi: "cũ", en: "old (of things)" },
              { vi: "nhiều", en: "many / much" },
              { vi: "ít", en: "few / little" }
            ]},
            { type: "h3", text: "12.3 Function Words &amp; Connectives" },
            { type: "vocab", items: [
              { vi: "này", en: "this" },
              { vi: "đó / kia", en: "that" },
              { vi: "rất", en: "very" },
              { vi: "cũng", en: "also / too" },
              { vi: "nhưng", en: "but" },
              { vi: "vì", en: "because" },
              { vi: "hay", en: "or (in questions)" },
              { vi: "chỉ", en: "only / just" }
            ]},
            { type: "h3", text: "12.4 Question Words" },
            { type: "vocab", items: [
              { vi: "gì", en: "what" },
              { vi: "ai", en: "who" },
              { vi: "đâu", en: "where" },
              { vi: "bao nhiêu", en: "how much / how many" },
              { vi: "mấy giờ", en: "what time" },
              { vi: "khi nào", en: "when" }
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
              { vi: "Tôi là ...", en: "I am ..." },
              { vi: "Tôi tên là ...", en: "My name is ..." },
              { vi: "Tôi đến từ ...", en: "I come from ..." },
              { vi: "Tôi sống ở ...", en: "I live in ..." },
              { vi: "Tôi nói tiếng Anh.", en: "I speak English." },
              { vi: "Tôi đang học tiếng Việt.", en: "I am learning Vietnamese." },
              { vi: "Rất vui được gặp bạn.", en: "Nice to meet you." }
            ]},
            { type: "prose", html: "You can make a full mini-introduction from only 3–4 of these." }
          ]
        },
        {
          id: 14,
          title: "14. Daily Pleasantries",
          learnable: true,
          content: [
            { type: "prose", html: "These are correct but formal. See §23 for what people actually say in daily life." },
            { type: "h3", text: "14.1 Greetings" },
            { type: "vocab", items: [
              { vi: "Xin chào.", en: "Hello. (formal)" },
              { vi: "Chào bạn.", en: "Hi." },
              { vi: "Tạm biệt.", en: "Goodbye." },
              { vi: "Hẹn gặp lại.", en: "See you again." }
            ]},
            { type: "h3", text: "14.2 Thanks &amp; Apology" },
            { type: "vocab", items: [
              { vi: "Cảm ơn.", en: "Thank you." },
              { vi: "Cảm ơn nhiều.", en: "Thanks a lot." },
              { vi: "Không có gì.", en: "You're welcome / no problem." },
              { vi: "Xin lỗi.", en: "Sorry / excuse me." }
            ]},
            { type: "h3", text: "14.3 Confirmation" },
            { type: "vocab", items: [
              { vi: "Vâng.", en: "yes (polite)" },
              { vi: "Dạ.", en: "polite yes / respectful response" },
              { vi: "Không.", en: "no" },
              { vi: "Được.", en: "okay / can / acceptable" },
              { vi: "Không sao.", en: "it's okay / no problem" }
            ]}
          ]
        },
        {
          id: 15,
          title: "15. Café Pack",
          learnable: true,
          content: [
            { type: "p", html: "Useful for your Friday speaking meetup and café life in general." },
            { type: "h3", text: "Calling Staff" },
            { type: "vocab", items: [
              { vi: "Em ơi!", en: "Excuse me / calling staff politely" }
            ]},
            { type: "h3", text: "Ordering" },
            { type: "vocab", items: [
              { vi: "Cho tôi một ...", en: "Give me one ... / I'd like one ..." }
            ]},
            { type: "h3", text: "Drinks" },
            { type: "vocab", items: [
              { vi: "Cà phê sữa đá", en: "iced milk coffee" },
              { vi: "Trà đá", en: "iced tea" },
              { vi: "Nước", en: "water" },
              { vi: "Bia", en: "beer" }
            ]},
            { type: "h3", text: "Toasting" },
            { type: "vocab", items: [
              { vi: "Một, hai, ba, vô!", en: "One, two, three, cheers!" }
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
              { vi: "Xe ôm", en: "motorbike taxi" },
              { vi: "Xích lô", en: "rickshaw / cycle taxi" }
            ]},
            { type: "prose", html: "For emergencies, see §19 Health &amp; Emergencies." }
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
          title: "19. Health &amp; Emergencies",
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
              { vi: "Uống mấy lần một ngày?", en: "How many times a day?" },
              { vi: "Tôi bị dị ứng với...", en: "I'm allergic to..." }
            ]},
            { type: "h3", text: "What the Pharmacist Says" },
            { type: "vocab", items: [
              { vi: "Uống một ngày ba lần.", en: "Take three times a day." },
              { vi: "Uống trước bữa ăn.", en: "Take before meals." },
              { vi: "Uống sau bữa ăn.", en: "Take after meals." },
              { vi: "Chúc anh/chị mau khỏe.", en: "Hope you feel better soon." }
            ]},
            { type: "h3", text: "Emergencies" },
            { type: "vocab", items: [
              { vi: "Giúp tôi với!", en: "Help me!" },
              { vi: "Gọi cảnh sát!", en: "Call the police!" },
              { vi: "Gọi xe cấp cứu!", en: "Call an ambulance!" },
              { vi: "Tôi bị cướp giật.", en: "I was robbed / bag snatched." },
              { vi: "Tôi bị mất ví.", en: "I lost my wallet." },
              { vi: "Tôi bị tai nạn xe máy.", en: "I was in a motorbike accident." },
              { vi: "Tôi bị thương.", en: "I'm injured." },
              { vi: "Tôi bị lạc.", en: "I am lost." },
              { vi: "Cần gặp đại sứ quán.", en: "I need to contact my embassy." }
            ]}
          ]
        },
        {
          id: 20,
          title: "20. Social Life",
          learnable: true,
          content: [
            { type: "h3", text: "Making Friends" },
            { type: "vocab", items: [
              { vi: "Anh cũng hay đến đây không?", en: "Do you come here often?" },
              { vi: "Mình mới đến đây vài tháng.", en: "I've only been here a few months." },
              { vi: "Nói chuyện với bạn vui lắm.", en: "Enjoyed talking with you." },
              { vi: "Bạn có Zalo không? Kết bạn đi!", en: "Do you have Zalo? Let's add each other!" },
              { vi: "Bữa nào rảnh đi cà phê nhé!", en: "When you're free let's get coffee!" }
            ]},
            { type: "h3", text: "Work &amp; Family" },
            { type: "p", html: "Vietnamese people ask about work and family early — it's friendly, not intrusive:" },
            { type: "vocab", items: [
              { vi: "Bạn làm nghề gì?", en: "What do you do for work?" },
              { vi: "Mình dạy tiếng Anh.", en: "I teach English." },
              { vi: "Bạn có gia đình chưa?", en: "Are you married yet?" },
              { vi: "Chưa, mình vẫn còn độc thân.", en: "Not yet, still single." },
              { vi: "Bố mẹ bạn ở đâu?", en: "Where do your parents live?" },
              { vi: "Nhớ nhà không?", en: "Do you miss home?" }
            ]},
            { type: "h3", text: "Hobbies &amp; Weekend Plans" },
            { type: "vocab", items: [
              { vi: "Cuối tuần này bạn có kế hoạch gì không?", en: "Do you have plans this weekend?" },
              { vi: "Lúc rảnh bạn thích làm gì?", en: "What do you like doing in your free time?" },
              { vi: "Mình hay đi chụp ảnh.", en: "I usually go take photos." },
              { vi: "Bữa nào đi cùng mình nha!", en: "Come along with me sometime!" }
            ]},
            { type: "h3", text: "Weather Small Talk" },
            { type: "vocab", items: [
              { vi: "Hôm nay nóng quá!", en: "It's so hot today!" },
              { vi: "Oi bức quá!", en: "So muggy / sweltering!" },
              { vi: "Mưa to quá!", en: "Such heavy rain!" },
              { vi: "Trời sắp mưa rồi.", en: "It's about to rain." },
              { vi: "Mùa mưa bắt đầu rồi.", en: "Rainy season has started." },
              { vi: "Mùa này nóng lắm.", en: "This season is very hot." }
            ]},
            { type: "prose", html: "Weather complaints are a genuine social bonding ritual in Vietnam. Agreeing enthusiastically with “Nóng quá!” earns warmth." },
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
            { type: "highlight", html: '<strong>Magic phrase:</strong> Saying "Tôi đang học tiếng Việt" triggers immediate warmth, slower speech, and encouragement from nearly every Vietnamese person.' }
          ]
        },
        {
          id: 21,
          title: "21. Services &amp; Accommodation",
          learnable: true,
          content: [
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
            { type: "h3", text: "Hotel Check-in" },
            { type: "vocab", items: [
              { vi: "Tôi có đặt phòng rồi.", en: "I have a reservation." },
              { vi: "Còn phòng không?", en: "Do you have rooms available?" },
              { vi: "Một đêm bao nhiêu tiền?", en: "How much per night?" },
              { vi: "Phòng đôi cho ba đêm.", en: "A double room for three nights." },
              { vi: "Mật khẩu Wi-Fi là gì?", en: "What's the Wi-Fi password?" },
              { vi: "Tôi phải trả phòng trước mấy giờ?", en: "What time is checkout?" },
              { vi: "Điều hòa không hoạt động.", en: "The AC isn't working." },
              { vi: "Cho tôi thêm khăn tắm.", en: "More towels please." },
              { vi: "Làm ơn gọi taxi giúp tôi.", en: "Please call a taxi for me." }
            ]},
            { type: "highlight", html: "<strong>Note:</strong> Vietnamese hotels routinely keep your passport for several hours to register with local police — this is normal and legal, not suspicious." },
            { type: "h3", text: "Visiting a Temple" },
            { type: "vocab", items: [
              { vi: "Tôi có thể vào đây không?", en: "May I enter here?" },
              { vi: "Tôi phải cởi giày không?", en: "Do I need to take off my shoes?" },
              { vi: "Tôi chụp ảnh được không?", en: "Can I take photos?" },
              { vi: "Đây là chùa hay đền?", en: "Is this a pagoda or a temple?" },
              { vi: "Xin chào thầy.", en: "Hello, monk. (respectful address)" }
            ]},
            { type: "highlight", html: "<strong>Etiquette:</strong> Remove shoes before entering inner halls. Cover shoulders and knees. Don’t touch statues or altars. Don’t point feet at Buddha images. Bow slightly when greeting monks. Entry is often free but donations (5,000–20,000 đồng) into the box are appreciated." },
            { type: "h3", text: "Renting an Apartment" },
            { type: "vocab", items: [
              { vi: "Tôi muốn xem phòng.", en: "I'd like to view the room." },
              { vi: "Tiền thuê một tháng là bao nhiêu?", en: "How much is rent per month?" },
              { vi: "Giá đó đã bao gồm điện nước chưa?", en: "Does that include electricity and water?" },
              { vi: "Tôi muốn thuê sáu tháng.", en: "I'd like to rent for six months." },
              { vi: "Đặt cọc bao nhiêu tháng?", en: "How many months deposit?" },
              { vi: "Có chỗ để xe không?", en: "Is there parking?" },
              { vi: "Máy lạnh có hoạt động không?", en: "Does the AC work?" },
              { vi: "Bồn cầu bị hỏng.", en: "The toilet is broken." },
              { vi: "Anh/chị sửa được không?", en: "Can you fix it?" }
            ]},
            { type: "highlight", html: "<strong>Tạm trú</strong> (temporary residence registration) is a legal requirement. Ask your landlord to register you — landlords who refuse are a red flag." }
          ]
        },
        {
          id: 22,
          title: "22. Dating &amp; Romance",
          learnable: true,
          content: [
            { type: "prose", html: "<p>Vietnamese flirting is <strong>indirect, teasing, and particle-heavy</strong>. The softening particles (nha, nhé, đi, nè) do enormous emotional work. Master them and you'll sound warm. Ignore them and you'll sound robotic.</p>" },
            { type: "h3", text: "Showing Interest" },
            { type: "p", html: "Vietnamese flirting uses teasing (<strong>ghẹo</strong>) and indirectness. Direct compliments are softened; interest is shown playfully." },
            { type: "vocab", items: [
              { vi: "Cười duyên quá vậy?", en: "Why is your smile so charming?" },
              { vi: "Nói chuyện vui ghê, muốn nói tiếp.", en: "Talking with you is so fun, I want to keep going." },
              { vi: "Hôm nay đẹp dữ, có hẹn hò ai hả?", en: "You look amazing today, got a date? (teasing)" },
              { vi: "Cho anh xin Zalo nha.", en: "Let me add your Zalo. (the real move)" },
              { vi: "Ghẹo người ta hoài!", en: "You keep teasing me! (flirtatious)" },
              { vi: "Bị gì mà cứ nhìn người ta hoài vậy?", en: "Why do you keep looking at me? (they tease you)" }
            ]},
            { type: "highlight", html: '<strong>"Người ta"</strong> (people/one) used to refer to oneself is a classic Vietnamese flirting move. If someone says <span lang="vi">người ta</span> meaning "me" — they\'re being playful.' },
            { type: "h3", text: "Asking Someone Out" },
            { type: "p", html: '<span lang="vi"><strong>Đi chơi</strong></span> (go hang out) is intentionally vague — it lets both sides save face. Coffee is the standard first date. You don\'t need the word "hẹn hò" (date).' },
            { type: "vocab", items: [
              { vi: "Cuối tuần rảnh không? Đi cà phê nha.", en: "Free this weekend? Let's grab coffee." },
              { vi: "Đi chơi với anh/em đi.", en: "Come hang out with me." },
              { vi: "Có chỗ hay lắm, muốn dẫn bạn đi.", en: "I know a cool place, I want to take you." },
              { vi: "Cho anh dẫn đi ăn gì đi.", en: "Let me take you out to eat." },
              { vi: "Bữa nào rảnh thì hẹn nhau.", en: "Whenever you're free, let's set a time." },
              { vi: "Lần sau mình đi chơi tiếp nha?", en: "Let's hang out again next time?" }
            ]},
            { type: "h3", text: "On a Date" },
            { type: "vocab", items: [
              { vi: "Chỗ này không khí hay ghê.", en: "This place has a great vibe." },
              { vi: "Ăn thử cái này đi, ngon lắm.", en: "Try this, it's really good." },
              { vi: "Để anh/em trả nha.", en: "Let me pay." },
              { vi: "Chia đôi đi.", en: "Let's split it." },
              { vi: "Nói chuyện với bạn vui quá, quên luôn thời gian.", en: "Talking with you is so fun, I lost track of time." },
              { vi: "Lần sau mình đi đâu tiếp?", en: "Where should we go next time?" },
              { vi: "Hôm nay vui ghê, cảm ơn nha.", en: "Today was so fun, thank you." },
              { vi: "Về tới chưa? Nhắn anh/em nha.", en: "Home safe? Text me. (expected post-date)" }
            ]},
            { type: "highlight", html: "<strong>Who pays:</strong> The inviter typically pays. Most Vietnamese women still expect the man to offer. Insisting on always splitting can read as stingy. If she says <span lang=\"vi\">Chia đôi đi</span> and means it, respect that." },
            { type: "h3", text: "Texting" },
            { type: "p", html: "Zalo dominates. Vietnamese dating involves <strong>constant messaging</strong> — good morning/good night texts are standard. Not replying for hours without reason is read negatively." },
            { type: "vocab", items: [
              { vi: "Đang làm gì đó?", en: "What are you doing? (= I'm thinking of you)" },
              { vi: "Ăn cơm chưa?", en: "Have you eaten? (= I care about you)" },
              { vi: "Ngủ ngon nha.", en: "Sleep well. (expected good-night text)" },
              { vi: "Nhớ ghê.", en: "I miss you so much." },
              { vi: "Gửi hình đi, muốn coi mặt.", en: "Send a selfie, I want to see your face." },
              { vi: "Anh/em bận, tí nữa nhắn lại nha.", en: "I'm busy, I'll text back soon." }
            ]},
            { type: "prose", html: "<strong>Text abbreviations you'll see:</strong> k/ko/kg = không, dc = được, r = rồi, bt = bình thường/biết, ib = inbox (DM me), nhìu = nhiều. Sticker culture is big — 🥺 is used to be cute/pleading, 😘 is flirty, ❤️ is more serious." },
            { type: "h3", text: "Getting Serious" },
            { type: "vocab", items: [
              { vi: "Mình đang là gì của nhau?", en: "What are we to each other?" },
              { vi: "Em là người yêu anh, đúng không?", en: "You're my girlfriend/boyfriend, right?" },
              { vi: "Anh muốn giới thiệu em với ba mẹ anh.", en: "I want to introduce you to my parents. (big deal)" },
              { vi: "Anh yêu em.", en: "I love you. (don't say this lightly)" },
              { vi: "Bé/cưng ơi.", en: "Baby/sweetie. (common pet names)" }
            ]},
            { type: "highlight", html: "<strong>The anh/em shift:</strong> When dating begins, anh/em stops being age-based and becomes romantic. If someone switches from <strong>bạn</strong> to calling you <strong>anh</strong> (or themselves <strong>em</strong>) in a soft voice — that's a relationship signal. Even if she's older, she may use <strong>em</strong> for herself. This is one of the most significant markers in Vietnamese." },
            { type: "h3", text: "Dating Culture Notes" },
            { type: "prose", html: "<p><strong>Family is involved early.</strong> A relationship isn't just between two people. \"Where is this going?\" conversations happen sooner than Westerners expect. Meeting parents = serious commitment, not casual.</p>" },
            { type: "prose", html: "<p><strong>\"Tán\" (courting) culture:</strong> Vietnamese dating involves a pursuit phase — daily texts, bringing food/drinks to their workplace, small gifts, consistent effort. What feels \"too much\" by Western standards is often baseline. Conversely, being too laid-back reads as not serious.</p>" },
            { type: "ul", items: [
              "<strong>Don't assume financial motives.</strong> It's insulting and usually wrong.",
              "<strong>Don't rush physical intimacy.</strong> Let the other person set the pace.",
              "<strong>Do text consistently.</strong> Going silent for a day without explanation reads as disinterest.",
              "<strong>Do make effort in Vietnamese.</strong> Even badly — it signals respect and seriousness."
            ]}
          ]
        }
      ]
    },
    {
      name: "Speaking Naturally",
      sections: [
        {
          id: 23,
          title: "23. Beyond the Textbook",
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
            { type: "h3", text: "Agreeing &amp; Disagreeing Naturally" },
            { type: "vocab", items: [
              { vi: "Đúng rồi!", en: "That's right! / Exactly!" },
              { vi: "Phải rồi!", en: "Correct! / That's it!" },
              { vi: "Cũng được.", en: "That's okay too. / I can go with that." },
              { vi: "Không hẳn.", en: "Not exactly. / Not necessarily." },
              { vi: "Thật ra thì...", en: "Actually... (gentle correction)" },
              { vi: "Khó nói lắm.", en: "It's hard to say. (soft dodge)" }
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
          id: 24,
          title: "24. Sentence-Ending Particles",
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
          id: 25,
          title: "25. Filler Words & Casual Speech",
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
              { vi: "Ỡ thì...", en: "Well, um... (buying time)" },
              { vi: "Đại loại là...", en: "Something like... / More or less..." },
              { vi: "Ý tôi là...", en: "What I mean is..." }
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
              { vi: "Trăm phần trăm!", en: "Bottoms up! (100%!)" },
              { vi: "Đỉnh của chóp!", en: "The absolute best! / Peak!" },
              { vi: "Thả thính.", en: "To flirt / drop hints." },
              { vi: "Sống ảo.", en: "Living for the gram / performative." },
              { vi: "Thôi chết.", en: "Oh no. / Well, that's bad." }
            ]},
            { type: "h3", text: "Reactions & Exclamations" },
            { type: "vocab", items: [
              { vi: "Trời ơi!", en: "Oh my God! / Oh wow!" },
              { vi: "Ủa?", en: "Huh? / Wait, what?" },
              { vi: "Ngon quá!", en: "So delicious!" },
              { vi: "Đẹp quá!", en: "So beautiful!" },
              { vi: "Mệt quá!", en: "So tired!" }
            ]}
          ]
        },
        {
          id: 26,
          title: "26. North vs South",
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
            { type: "h3", text: "More Vocabulary Differences" },
            { type: "table", headers: ["English", "North", "South"], rows: [
              { cells: ["Pineapple", "Dứa", "Thơm"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Corn", "Ngô", "Bắp"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["Peanut", "Lạc", "Đậu phộng"], viCells: [1, 2], viLang: [1, 2] },
              { cells: ["MSG", "Mì chính", "Bột ngọt"], viCells: [1, 2], viLang: [1, 2] }
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
          id: 27,
          title: "27. Cultural Etiquette",
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
            { type: "h3", text: "Age Questions Are Normal" },
            { type: "prose", html: "Vietnamese people ask your age early in conversation. This is not intrusive — it’s necessary social calibration to choose the right pronouns and register. Answer comfortably." },
            { type: "h3", text: "Saving Face" },
            { type: "prose", html: "Direct refusal, public correction, or saying someone is wrong causes them to <strong>mất mặt</strong> (lose face). Disagreement should be indirect, delayed, or private. A vendor who says “được” but doesn’t deliver didn’t lie — they were protecting face in the moment." },
            { type: "h3", text: "Chopstick Rules" },
            { type: "ul", items: [
              "<strong>Never</strong> stick chopsticks upright in rice — this resembles funeral incense and is genuinely jarring.",
              "Don’t point chopsticks at people.",
              "Use serving chopsticks for shared dishes when provided.",
              "Wait for the eldest to eat first in family settings."
            ]},
            { type: "h3", text: "Drinking Culture" },
            { type: "prose", html: "Refusing food or drink from a host is a significant social signal — always accept and taste. Drinking culture can be intense. <span lang=\"vi\"><strong>Tôi không uống được.</strong></span> (\"I can’t drink\") with a health reason is the socially acceptable exit." },
            { type: "h3", text: "Crossing the Street" },
            { type: "prose", html: "Walk slowly and steadily — <strong>never</strong> run or stop unpredictably. Motorbike drivers navigate around predictable pedestrians. This is counterintuitive for Westerners but essential safety knowledge." },
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
          id: 28,
          title: "28. Study Order",
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
              "Café / ordering vocabulary",
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
              "Café language",
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
          id: 29,
          title: "29. Mini Cheat Sheet",
          learnable: true,
          content: [
            { type: "h3", text: "Pronunciation" },
            { type: "table", headers: ["Letter", "Sound"], rows: [
              { cells: ["ă", "short a"], viCells: [0], viLang: [0] },
              { cells: ["â", "short uh"], viCells: [0], viLang: [0] },
              { cells: ["ê", "close ay"], viCells: [0], viLang: [0] },
              { cells: ["ô", "clipped oh"], viCells: [0], viLang: [0] },
              { cells: ["ơ", "unrounded uh/er"], viCells: [0], viLang: [0] },
              { cells: ["ư", "oo with lips spread flat"], viCells: [0], viLang: [0] },
              { cells: ["đ", "d"], viCells: [0], viLang: [0] },
              { cells: ["d / gi", "z or y depending on dialect"], viCells: [0], viLang: [0] }
            ]},
            { type: "h3", text: "Context Families" },
            { type: "ul", items: [
              "<strong>c / k / qu</strong>",
              "<strong>g / gh</strong>",
              "<strong>ng / ngh</strong>",
              "<strong>d / gi / đ</strong>",
              "<strong>ph / th / kh / nh</strong>"
            ]},
            { type: "h3", text: "Telex" },
            { type: "table", headers: ["Type", "Get"], rows: [
              { cells: ["aa", "â"], viCells: [1], viLang: [1] },
              { cells: ["aw", "ă"], viCells: [1], viLang: [1] },
              { cells: ["ee", "ê"], viCells: [1], viLang: [1] },
              { cells: ["oo", "ô"], viCells: [1], viLang: [1] },
              { cells: ["ow", "ơ"], viCells: [1], viLang: [1] },
              { cells: ["uw", "ư"], viCells: [1], viLang: [1] },
              { cells: ["dd", "đ"], viCells: [1], viLang: [1] },
              { cells: ["s", "á"], viCells: [1], viLang: [1] },
              { cells: ["f", "à"], viCells: [1], viLang: [1] },
              { cells: ["r", "ả"], viCells: [1], viLang: [1] },
              { cells: ["x", "ã"], viCells: [1], viLang: [1] },
              { cells: ["j", "ạ"], viCells: [1], viLang: [1] },
              { cells: ["z", "clear mark"] }
            ]},
            { type: "h3", text: "Pronouns" },
            { type: "vocab", items: [
              { vi: "tôi", en: "I" },
              { vi: "bạn", en: "you" },
              { vi: "anh", en: "older male" },
              { vi: "chị", en: "older female" },
              { vi: "em", en: "younger person" }
            ]},
            { type: "h3", text: "Time" },
            { type: "vocab", items: [
              { vi: "hôm nay", en: "today" },
              { vi: "hôm qua", en: "yesterday" },
              { vi: "ngày mai", en: "tomorrow" },
              { vi: "bây giờ", en: "now" }
            ]},
            { type: "p", html: '<span lang="vi"><strong>sáng / trưa / chiều / tối / đêm</strong></span>' },
            { type: "h3", text: "Useful Phrases" },
            { type: "vocab", items: [
              { vi: "Tôi là ...", en: "I am ..." },
              { vi: "Tôi đang học tiếng Việt.", en: "I am learning Vietnamese." },
              { vi: "Tôi không hiểu.", en: "I do not understand." },
              { vi: "Xin nói chậm thôi.", en: "Please speak slowly." },
              { vi: "Xin nhắc lại.", en: "Please repeat." },
              { vi: "Bao nhiêu tiền?", en: "How much?" },
              { vi: "Nhà vệ sinh ở đâu?", en: "Where is the bathroom?" },
              { vi: "Cái này là gì?", en: "What is this?" },
              { vi: "Giúp tôi với!", en: "Help me!" },
              { vi: "Ăn cơm chưa?", en: "Have you eaten yet?" }
            ]}
          ]
        },
        {
          id: 30,
          title: "30. Final Message",
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
            { type: "prose", html: "<p>Use Vietnamese every Friday at Chillax, use it in cafés, use it with friends, use it badly at first, and keep going.</p><p><strong>That is how it starts to become natural.</strong></p>" }
          ]
        }
      ]
    }
  ]
};
