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
  assert(sections.length === 28, 'DATA should produce 28 sections');
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
  assert(sections.length === 28, `Expected 28 sections, got ${sections.length}`);
});

test('All 11 categories rendered', () => {
  const dividers = document.querySelectorAll('.category-divider');
  assert(dividers.length === 11, `Expected 11 category dividers, got ${dividers.length}`);
});

test('TOC has links for all sections', () => {
  const tocLinks = document.querySelectorAll('.toc-list a');
  assert(tocLinks.length === 28, `Expected 28 TOC links, got ${tocLinks.length}`);
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

// ── TOC Tests ──
console.log('\nTOC:');

test('TOC starts closed', () => {
  const tocNav = document.getElementById('tocNav');
  assert(!tocNav.classList.contains('open'), 'TOC should start closed');
});

test('TOC toggle opens TOC', () => {
  const tocToggle = document.getElementById('tocToggle');
  const tocNav = document.getElementById('tocNav');
  tocToggle.click();
  assert(tocNav.classList.contains('open'), 'TOC should open');
});

test('TOC link click auto-expands target section', () => {
  const tocLink = document.querySelector('.toc-list a[href="#sec-1"]');
  assert(tocLink, 'No TOC link to sec-1');
  const targetSection = document.getElementById('sec-1');
  assert(!targetSection.classList.contains('open'), 'sec-1 should start collapsed');
  tocLink.click();
  assert(targetSection.classList.contains('open'), 'sec-1 should be open after TOC click');
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
  assert(total.textContent.includes('phrases known'), 'Should show phrases known');
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

test('Pronoun selector pills exist', () => {
  var pills = document.querySelectorAll('.pronoun-pill');
  assert(pills.length === 6, 'Expected 6 pronoun pills, got ' + pills.length);
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

// ── Summary ──
console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
