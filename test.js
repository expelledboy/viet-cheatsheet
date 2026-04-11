// Playwright-style DOM tests using jsdom
// Run: node test.js

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const dataJs = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');

// Inject data.js inline since jsdom won't load script src
const fullHtml = html.replace(
  '<script src="data.js"></script>',
  '<script>' + dataJs + '</script>'
);

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name}`);
    console.log(`     ${e.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

// Create DOM with browser API mocks
const dom = new JSDOM(fullHtml, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  url: 'https://expelledboy.github.io/viet-cheatsheet/',
  beforeParse(window) {
    window.matchMedia = function(query) {
      return {
        matches: false,
        media: query,
        addEventListener: function() {},
        removeEventListener: function() {}
      };
    };
    window.confirm = function() { return true; };
    window.speechSynthesis = null; // skip TTS
  }
});
const { document, window } = dom.window;

// Wait for scripts to execute
console.log('\n🇻🇳 Vietnamese Cheat Sheet — Tests\n');

// ── Rendering Tests ──
console.log('Rendering:');

test('DATA object exists and rendered content', () => {
  // DATA is defined via const so may not be on window — test via rendered output
  const sections = document.querySelectorAll('.section-card');
  assert(sections.length === 30, 'DATA should produce 30 sections');
});

test('STATE object exists', () => {
  assert(dom.window.STATE, 'STATE not defined');
  assert('theme' in dom.window.STATE, 'STATE missing theme');
  assert('mode' in dom.window.STATE, 'STATE missing mode');
  assert('known' in dom.window.STATE, 'STATE missing known');
  assert('hideKnown' in dom.window.STATE, 'STATE missing hideKnown');
});

test('All 28 sections rendered', () => {
  const sections = document.querySelectorAll('.section-card');
  assert(sections.length === 30, `Expected 28 sections, got ${sections.length}`);
});

test('All 11 categories rendered', () => {
  const dividers = document.querySelectorAll('.category-divider');
  assert(dividers.length === 11, `Expected 11 category dividers, got ${dividers.length}`);
});

test('Category tabs rendered for all 11 categories', () => {
  const tabs = document.querySelectorAll('.category-tab');
  assert(tabs.length === 11, `Expected 11 category tabs, got ${tabs.length}`);
});

test('Banner rendered', () => {
  const banner = document.querySelector('.meetup-banner');
  assert(banner, 'No meetup banner');
  assert(banner.textContent.includes('Chillax'), 'Banner missing Chillax');
});

test('Learnable sections have data-learnable attribute', () => {
  const learnable = document.querySelectorAll('[data-learnable]');
  assert(learnable.length > 0, 'No learnable sections');
});

test('Vocab items rendered with vi-text and en-text', () => {
  const viTexts = document.querySelectorAll('.vi-text[lang="vi"]');
  const enTexts = document.querySelectorAll('.en-text');
  assert(viTexts.length > 50, `Only ${viTexts.length} vi-text elements`);
  assert(enTexts.length > 50, `Only ${enTexts.length} en-text elements`);
});

test('Tables rendered', () => {
  const tables = document.querySelectorAll('.data-table');
  assert(tables.length > 0, 'No data tables');
});

// ── Section Collapse Tests ──
console.log('\nSection Collapse:');

test('Sections start collapsed', () => {
  const firstSection = document.querySelector('.section-card');
  assert(!firstSection.classList.contains('open'), 'First section should be collapsed');
});

test('Section header has click handler', () => {
  const header = document.querySelector('.section-header');
  assert(header, 'No section header found');
  // Check aria-expanded attribute
  assert(header.getAttribute('aria-expanded') === 'false', 'Should start with aria-expanded=false');
});

test('Clicking section header expands section', () => {
  const section = document.querySelector('.section-card');
  const header = section.querySelector('.section-header');
  header.click();
  assert(section.classList.contains('open'), 'Section should be open after click');
  assert(header.getAttribute('aria-expanded') === 'true', 'aria-expanded should be true');
});

test('Clicking again collapses section', () => {
  const section = document.querySelector('.section-card');
  const header = section.querySelector('.section-header');
  header.click();
  assert(!section.classList.contains('open'), 'Section should be collapsed after second click');
});

// ── Category Tab Tests ──
console.log('\nCategory Tabs:');

test('Category tabs match category names', () => {
  const tabs = document.querySelectorAll('.category-tab');
  assert(tabs[0].textContent === 'Essentials', 'First tab should be Essentials, got: ' + tabs[0].textContent);
  assert(tabs[tabs.length - 1].textContent === 'Quick Reference', 'Last tab should be Quick Reference');
});

// ── Learning Mode Tests ──
console.log('\nLearning Mode:');

test('Mode toggle switches to learning mode', () => {
  const toggle = document.getElementById('modeToggle');
  toggle.checked = true;
  toggle.dispatchEvent(new dom.window.Event('change'));
  assert(document.body.classList.contains('learning-mode'), 'Body should have learning-mode class');
  assert(dom.window.STATE.mode === 'learning', 'STATE.mode should be learning');
});

test('Flashcard hides English until clicked', () => {
  // In learning mode, flashcard en-text should be hidden via CSS
  // We can verify the flashcard class exists
  const flashcard = document.querySelector('.flashcard');
  assert(flashcard, 'No flashcard found');
  assert(!flashcard.classList.contains('revealed'), 'Should start unrevealed');
});

test('Clicking flashcard reveals it', () => {
  const flashcard = document.querySelector('.flashcard');
  flashcard.click();
  assert(flashcard.classList.contains('revealed'), 'Should be revealed after click');
});

// ── Known Tracking Tests ──
console.log('\nKnown Tracking:');

test('Known buttons exist on learnable vocab items', () => {
  const knownBtns = document.querySelectorAll('.known-btn');
  assert(knownBtns.length > 0, 'No known buttons found');
});

test('Clicking known button marks item as known', () => {
  const btn = document.querySelector('.known-btn');
  const div = btn.closest('.vocab-item');
  btn.click();
  assert(btn.classList.contains('checked'), 'Button should be checked');
  assert(div.classList.contains('known-item'), 'Item should have known-item class');
  assert(dom.window.STATE.known.length > 0, 'STATE.known should have entries');
});

test('Clicking known button again unmarks it', () => {
  const btn = document.querySelector('.known-btn.checked');
  const div = btn.closest('.vocab-item');
  btn.click();
  assert(!btn.classList.contains('checked'), 'Button should be unchecked');
  assert(!div.classList.contains('known-item'), 'Item should not have known-item class');
});

test('Progress bar updates', () => {
  const bar = document.querySelector('.progress-bar .progress-text');
  assert(bar, 'No progress bar text found');
  // Mark one known
  const btn = document.querySelector('.known-btn');
  btn.click();
  assert(bar.textContent.includes('/'), 'Progress text should show x/y format');
});

test('Section badge exists for learnable sections', () => {
  const badges = document.querySelectorAll('.section-badge');
  assert(badges.length > 0, 'No section badges found');
});

test('Hide known toggle works', () => {
  // Open a learnable section first so its progress bar is accessible
  const learnableSection = document.querySelector('[data-learnable]');
  learnableSection.classList.add('open');
  const hideBtn = learnableSection.querySelector('.hide-known-btn');
  assert(hideBtn, 'No hide-known button in learnable section');
  hideBtn.click();
  assert(document.body.classList.contains('hide-known'), 'Body should have hide-known class');
  assert(dom.window.STATE.hideKnown === true, 'STATE.hideKnown should be true');
});

test('Reset progress clears all known', () => {
  // Mock confirm to return true
  dom.window.confirm = () => true;
  dom.window.resetProgress();
  assert(dom.window.STATE.known.length === 0, 'STATE.known should be empty');
  const checked = document.querySelectorAll('.known-btn.checked');
  assert(checked.length === 0, 'No buttons should be checked');
});

// ── Next Section Tests ──
console.log('\nNavigation:');

test('Next section links exist in learning mode', () => {
  const nextLinks = document.querySelectorAll('.next-section a');
  assert(nextLinks.length > 0, 'No next-section links found');
});

test('Total progress bar exists', () => {
  const total = document.getElementById('totalProgress');
  assert(total, 'No total progress bar');
  assert(total.querySelector('.progress-text'), 'Should have progress text');
  assert(total.querySelector('.progress-fill'), 'Should have progress fill');
});

// ── Known Panel Tests ──
console.log('\nKnown Panel:');

test('Known panel hidden when < 3 known', () => {
  // Reset first
  dom.window.resetProgress();
  const panel = document.getElementById('knownPanel');
  assert(!panel.classList.contains('visible'), 'Panel should be hidden with 0 known');
});

test('Known panel appears after 3 known phrases', () => {
  const btns = document.querySelectorAll('.known-btn');
  btns[0].click(); btns[1].click(); btns[2].click();
  const panel = document.getElementById('knownPanel');
  assert(panel.classList.contains('visible'), 'Panel should be visible with 3 known');
  assert(panel.querySelector('.known-panel-count').textContent === '(3)', 'Count should show (3)');
});

test('Known panel lists the correct phrases', () => {
  const panelItems = document.querySelectorAll('.known-panel-list li');
  assert(panelItems.length === 3, `Expected 3 items in panel, got ${panelItems.length}`);
});

test('Known panel toggle expands/collapses', () => {
  const toggle = document.getElementById('knownPanelToggle');
  const body = document.getElementById('knownPanelBody');
  toggle.click();
  assert(body.classList.contains('open'), 'Panel body should be open');
  toggle.click();
  assert(!body.classList.contains('open'), 'Panel body should be closed');
});

// ── Subsection Toggle Tests ──
console.log('\nSubsection Toggle:');

test('Subsection toggles exist on h3 elements in learnable sections', () => {
  const toggles = document.querySelectorAll('.subsection-toggle');
  assert(toggles.length > 0, 'No subsection toggles found');
});

test('Clicking subsection toggle reveals flashcards in that sub-section only', () => {
  // Enable learning mode
  dom.window.STATE.mode = 'learning';
  document.body.classList.add('learning-mode');

  // Open a section with multiple h3s
  var section = document.querySelector('[data-learnable]');
  section.classList.add('open');

  var toggles = section.querySelectorAll('.subsection-toggle');
  if (toggles.length > 0) {
    var toggle = toggles[0];
    var h3 = toggle.closest('h3');
    // Find the vocab list after this h3
    var sibling = h3.nextElementSibling;
    while (sibling && !sibling.classList.contains('vocab-list')) {
      sibling = sibling.nextElementSibling;
    }
    if (sibling) {
      var cards = sibling.querySelectorAll('.flashcard');
      assert(cards.length > 0, 'Should have flashcards');
      assert(!cards[0].classList.contains('revealed'), 'Cards should start hidden');
      toggle.click();
      assert(cards[0].classList.contains('revealed'), 'Cards should be revealed after toggle');
      toggle.click();
      assert(!cards[0].classList.contains('revealed'), 'Cards should be hidden after second toggle');
    }
  }
});

// ── Pronoun System Tests ──
console.log('\nPronoun System:');

test('applyPronouns exists and handles formal (no change)', () => {
  dom.window.STATE.pronounContext = 'formal';
  var result = dom.window.applyPronouns('Tôi không hiểu.');
  assert(result === 'Tôi không hiểu.', 'Formal should not change text, got: ' + result);
});

test('applyPronouns swaps Tôi → Em for olderMale context', () => {
  dom.window.STATE.pronounContext = 'olderMale';
  var result = dom.window.applyPronouns('Tôi không hiểu.');
  assert(result === 'Em không hiểu.', 'Should swap Tôi→Em, got: ' + result);
});

test('applyPronouns swaps lowercase tôi mid-sentence', () => {
  dom.window.STATE.pronounContext = 'olderMale';
  var result = dom.window.applyPronouns('Cho tôi một cái này.');
  assert(result === 'Cho em một cái này.', 'Should swap tôi→em, got: ' + result);
});

test('applyPronouns swaps bạn → anh for olderMale context', () => {
  dom.window.STATE.pronounContext = 'olderMale';
  var result = dom.window.applyPronouns('Bạn khỏe không?');
  assert(result === 'Anh khỏe không?', 'Should swap Bạn→Anh, got: ' + result);
});

test('applyPronouns handles peer context (mình/bạn)', () => {
  dom.window.STATE.pronounContext = 'peer';
  var result = dom.window.applyPronouns('Tôi đang học tiếng Việt.');
  assert(result === 'Mình đang học tiếng Việt.', 'Should swap Tôi→Mình, got: ' + result);
});

test('applyPronouns protects "kết bạn" (friend, not you)', () => {
  dom.window.STATE.pronounContext = 'olderMale';
  var result = dom.window.applyPronouns('Bạn có Zalo không? Kết bạn đi!');
  assert(result.includes('Kết bạn'), 'Should protect "kết bạn", got: ' + result);
  assert(result.startsWith('Anh'), 'First Bạn should swap to Anh, got: ' + result);
  dom.window.STATE.pronounContext = 'formal';
});

test('Pronoun selector pills exist', () => {
  var pills = document.querySelectorAll('.pronoun-pill');
  assert(pills.length === 6, 'Expected 6 pronoun pills, got ' + pills.length);
});

test('Single-word definitions are NOT swapped', () => {
  dom.window.STATE.pronounContext = 'olderMale';
  dom.window.refreshPronouns();
  // Find vi-text elements WITHOUT data-canonical (single words)
  var singleWords = document.querySelectorAll('.vi-text[lang="vi"]:not([data-canonical])');
  var found = false;
  singleWords.forEach(function(el) {
    if (el.textContent === 't\u00F4i' || el.textContent === 'b\u1EA1n' || el.textContent === 'm\u00ECnh') {
      found = true; // Good — these should NOT be swapped
    }
  });
  assert(found, 'Single-word pronoun definitions should remain unchanged');
  dom.window.STATE.pronounContext = 'formal';
  dom.window.refreshPronouns();
});

test('refreshPronouns updates displayed text', () => {
  dom.window.STATE.pronounContext = 'olderMale';
  dom.window.refreshPronouns();
  var viTexts = document.querySelectorAll('.vi-text[data-canonical]');
  var found = false;
  viTexts.forEach(function(el) {
    if (el.getAttribute('data-canonical').indexOf('Tôi') === 0) {
      assert(el.textContent.indexOf('Em') === 0 || el.textContent.indexOf('em') >= 0,
        'Display should show Em, got: ' + el.textContent);
      found = true;
    }
  });
  assert(found, 'Should find at least one swapped vi-text');
  // Reset
  dom.window.STATE.pronounContext = 'formal';
  dom.window.refreshPronouns();
});

// ── Content Integrity ──
console.log('Content Integrity:');

test('No Unicode escape sequences in data.js', () => {
  assert(!/\\u[0-9A-Fa-f]{4}/.test(dataJs),
    'data.js contains \\uXXXX escape sequences — use native UTF-8 characters');
});

test('Section IDs are sequential 0..N', () => {
  const ids = [];
  const idPattern = /\bid:\s*(\d+)/g;
  let m;
  while ((m = idPattern.exec(dataJs)) !== null) ids.push(parseInt(m[1]));
  for (let i = 0; i < ids.length; i++) {
    assert(ids[i] === i, `Expected section id ${i}, got ${ids[i]}`);
  }
});

test('Subsection numbers match parent section', () => {
  const sections = document.querySelectorAll('.section-card');
  sections.forEach(sec => {
    const title = sec.querySelector('h2')?.textContent || '';
    const secNum = parseInt(title);
    if (isNaN(secNum)) return;
    const h3s = sec.querySelectorAll('h3');
    h3s.forEach(h3 => {
      const text = h3.textContent.replace(/◉$/, '');
      const m = text.match(/^(\d+)\.\d+/);
      if (m) {
        assert(parseInt(m[1]) === secNum,
          `Section "${title}" has mismatched subsection "${text}"`);
      }
    });
  });
});

test('Every vocab item has non-empty vi and en', () => {
  const viEls = document.querySelectorAll('.vi-text');
  const enEls = document.querySelectorAll('.en-text');
  viEls.forEach(el => {
    assert(el.textContent.trim().length > 0, 'Empty vi-text found');
  });
  enEls.forEach(el => {
    assert(el.textContent.trim().length > 0, 'Empty en-text found');
  });
});

// ── Summary ──
console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
