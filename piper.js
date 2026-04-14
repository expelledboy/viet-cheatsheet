// @ts-check
// ============================================================
// piper.js — Optional high-quality Vietnamese TTS via Piper/VITS
// ============================================================
//
// Exposes `window.piper` (the app is not bundled; no ES-module
// consumers). Also re-exported as ES named exports so this file
// can be loaded as <script type="module" src="./piper.js">.
//
// Strategy (proven in spike-sibling.html):
//   1. Import onnxruntime-web@1.18.0 from jsDelivr's `+esm` alias.
//      (vits-web@1.0.3 pins this exact version; jsDelivr resolves
//      its internal `import('onnxruntime-web')` to the same URL,
//      so the browser dedupes to a single module instance.)
//   2. Assign a known-good wasmPaths, then freeze it with
//      Object.defineProperty so vits-web's internal assignment
//      of the broken cdnjs URL becomes a silent no-op.
//   3. Import @diffusionstudio/vits-web@1.0.3 from jsDelivr's
//      `+esm` alias. We avoid esm.sh because its unenv polyfill
//      rewrites the library's Node-guarded `require("fs")` into
//      an eager broken `fs.readFile` import, hard-failing the
//      module load. jsDelivr serves the bundle unmodified.
//
// The library stores voice models in OPFS under a "piper/"
// directory. We do NOT touch Cache API or service workers.
//
// All imports happen lazily on first use so the default code
// path (device voice) stays zero-network and zero-cost.
// ============================================================

const LIB_VERSION   = '1.0.3';
// vits-web@1.0.3's package.json pins onnxruntime-web to 1.18.0 as a
// dependency. jsDelivr resolves the library's internal
// `import('onnxruntime-web')` to `/npm/onnxruntime-web@1.18.0/+esm`,
// so we pre-import the same URL here to share the module instance.
const ORT_VERSION   = '1.18.0';
const ORT_ESM_URL   = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/+esm`;
const ORT_WASM_BASE = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/dist/`;
const LIB_ESM_URL   = `https://cdn.jsdelivr.net/npm/@diffusionstudio/vits-web@${LIB_VERSION}/+esm`;
const VOICE_ID      = 'vi_VN-vais1000-medium';
// Piper's default pace is conversational-fast for language learners.
// Slow playback ~20% via HTMLAudioElement; browsers preserve pitch by default.
const PLAYBACK_RATE = 0.80;

let _tts = null;       // the imported vits-web module
let _loadingPromise = null;
let _audioEl = null;   // reused for playback
let _currentUrl = null;

/**
 * @returns {boolean} True when the environment can plausibly run Piper.
 *   (OPFS + dynamic import + fetch + Audio element).
 */
export function isSupported() {
  try {
    if (typeof window === 'undefined') return false;
    if (!window.navigator || !window.navigator.storage) return false;
    if (typeof window.navigator.storage.getDirectory !== 'function') return false;
    if (typeof window.fetch !== 'function') return false;
    if (typeof window.Audio !== 'function') return false;
    // Secure context required for OPFS + WASM streaming; file:// and localhost count.
    if (window.isSecureContext === false) return false;
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Lazily load onnxruntime-web + vits-web with the wasmPaths freeze.
 * Caches the resolved module for subsequent calls.
 * @returns {Promise<any>}
 */
async function loadLibrary() {
  if (_tts) return _tts;
  if (_loadingPromise) return _loadingPromise;
  if (!isSupported()) throw new Error('Piper not supported in this environment');

  _loadingPromise = (async () => {
    const ortMod = await import(/* @vite-ignore */ ORT_ESM_URL);
    const ort = ortMod.env ? ortMod : (ortMod.default || ortMod);
    if (!ort || !ort.env || !ort.env.wasm) {
      throw new Error('onnxruntime-web did not expose env.wasm');
    }
    ort.env.wasm.wasmPaths = ORT_WASM_BASE;
    try { ort.env.wasm.numThreads = 1; } catch (_) { /* read-only on some builds */ }

    const FROZEN = ORT_WASM_BASE;
    try {
      Object.defineProperty(ort.env.wasm, 'wasmPaths', {
        configurable: true,
        enumerable: true,
        get() { return FROZEN; },
        set(_v) { /* intercept vits-web's cdnjs overwrite */ },
      });
    } catch (_) {
      // If freeze fails the library may still work; continue.
    }

    const lib = await import(/* @vite-ignore */ LIB_ESM_URL);
    _tts = lib;
    return lib;
  })();

  try {
    return await _loadingPromise;
  } catch (err) {
    _loadingPromise = null; // allow retry after failure
    throw err;
  }
}

/**
 * @returns {boolean} True once loadLibrary has resolved — `speak()` can run
 *   without triggering the initial ~15 MB runtime download.
 */
export function isReady() {
  return _tts !== null;
}

/**
 * Eagerly import onnxruntime-web + vits-web so the first `speak()` call
 * doesn't pay the library-load latency. Safe to call repeatedly — a cached
 * module resolves instantly. Never throws; failures surface on later speak().
 * @returns {Promise<void>}
 */
export async function preload() {
  if (!isSupported()) return;
  try { await loadLibrary(); } catch (_) { /* surface on speak() */ }
}

/**
 * Check whether the Vietnamese voice model is already in OPFS.
 * Never triggers a library download; falls back to a raw OPFS probe
 * if the library has not been imported yet.
 * @returns {Promise<boolean>}
 */
export async function isCached() {
  if (!isSupported()) return false;
  try {
    if (_tts && typeof _tts.stored === 'function') {
      const list = await _tts.stored();
      if (Array.isArray(list)) {
        return list.some((v) => v === VOICE_ID || (v && v.key === VOICE_ID));
      }
    }
    // Raw OPFS probe — library not yet imported.
    const root = await navigator.storage.getDirectory();
    let piperDir;
    try {
      piperDir = await root.getDirectoryHandle('piper', { create: false });
    } catch (_) {
      return false;
    }
    // Walk entries — the library stores files named like "<voiceId>.onnx".
    // @ts-ignore — values() exists on FileSystemDirectoryHandle in supported browsers.
    for await (const entry of piperDir.values()) {
      const name = entry.name || '';
      if (name.indexOf(VOICE_ID) !== -1) return true;
    }
    return false;
  } catch (_) {
    return false;
  }
}

/**
 * Pre-download the voice model into OPFS.
 * @param {(frac: number) => void} [onProgress] Called with 0..1 values.
 * @returns {Promise<void>}
 */
export async function download(onProgress) {
  const lib = await loadLibrary();
  if (typeof lib.download !== 'function') {
    throw new Error('vits-web.download is not a function');
  }
  const cb = (p) => {
    if (!onProgress || !p) return;
    const total = p.total || 0;
    const loaded = p.loaded || 0;
    if (total > 0) onProgress(Math.max(0, Math.min(1, loaded / total)));
  };
  await lib.download(VOICE_ID, cb);
}

/**
 * Synthesize and play `text`. Rejects on any failure (network, decode,
 * OPFS, audio). The caller is responsible for falling back to
 * speechSynthesis.
 * @param {string} text
 * @returns {Promise<void>}
 */
export async function speak(text) {
  const clean = (text || '').trim();
  if (!clean) return;
  const lib = await loadLibrary();
  if (typeof lib.predict !== 'function') {
    throw new Error('vits-web.predict is not a function');
  }
  const blob = await lib.predict({ text: clean, voiceId: VOICE_ID });
  if (!blob || typeof blob.size !== 'number' || blob.size === 0) {
    throw new Error('Piper produced empty audio');
  }
  const url = URL.createObjectURL(blob);
  try {
    if (!_audioEl) _audioEl = new Audio();
    // Revoke previous URL to avoid leaks.
    if (_currentUrl) {
      try { URL.revokeObjectURL(_currentUrl); } catch (_) {}
    }
    _currentUrl = url;
    _audioEl.src = url;
    _audioEl.playbackRate = PLAYBACK_RATE;
    await _audioEl.play();
  } catch (err) {
    try { URL.revokeObjectURL(url); } catch (_) {}
    if (_currentUrl === url) _currentUrl = null;
    throw err;
  }
}

/**
 * Remove the cached voice from OPFS.
 * @returns {Promise<void>}
 */
export async function clear() {
  if (!isSupported()) return;
  try {
    if (_tts && typeof _tts.flush === 'function') {
      await _tts.flush();
      return;
    }
  } catch (_) { /* fall through to raw removal */ }
  try {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry('piper', { recursive: true });
  } catch (_) {
    // Already gone or not supported — acceptable.
  }
}

// Attach to window so the (non-module) app script can use it.
// Guard against overwriting a test mock injected by test harnesses.
if (typeof window !== 'undefined' && !window.piper) {
  window.piper = {
    isSupported,
    isReady,
    isCached,
    preload,
    download,
    speak,
    clear,
    VOICE_ID,
  };
}
