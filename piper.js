// @ts-check
// ============================================================
// piper.js — Optional high-quality Vietnamese TTS via Piper/VITS
// ============================================================
//
// Exposes `window.piper` (the app is not bundled; no ES-module
// consumers). Also re-exported as ES named exports so this file
// can be loaded as <script type="module" src="./piper.js">.
//
// Strategy:
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
// PERFORMANCE: vits-web@1.0.3's exported `predict()` is stateless
// — every call constructs a fresh `ort.InferenceSession` and
// re-reads the 60 MB ONNX from OPFS (~6 s on desktop). We bypass
// it and drive `ort.InferenceSession.run()` directly, keeping one
// long-lived session per voice. A small LRU caches output blobs
// so repeat taps of the same phrase are instant. We still use
// `lib.download()` and `lib.flush()` for OPFS storage — no reason
// to reimplement that.
//
// All imports happen lazily on first use so the default code
// path (device voice) stays zero-network and zero-cost.
// ============================================================

const LIB_VERSION = '1.0.3';
// vits-web@1.0.3's package.json pins onnxruntime-web to 1.18.0 as a
// dependency. jsDelivr resolves the library's internal
// `import('onnxruntime-web')` to `/npm/onnxruntime-web@1.18.0/+esm`,
// so we pre-import the same URL here to share the module instance.
const ORT_VERSION = '1.18.0';
const ORT_ESM_URL = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/+esm`;
const ORT_WASM_BASE = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/dist/`;
const LIB_ESM_URL = `https://cdn.jsdelivr.net/npm/@diffusionstudio/vits-web@${LIB_VERSION}/+esm`;
// vits-web's internal phonemizer chunk. Filename is content-hashed;
// this URL was verified by reading the bundled `dist/vits-web.js`
// which does `import("./piper-DeOu3H9E.js")`. jsDelivr serves the
// same chunk under `+esm`.
const PIPER_PHONEMIZE_URL = `https://cdn.jsdelivr.net/npm/@diffusionstudio/vits-web@${LIB_VERSION}/dist/piper-DeOu3H9E.js/+esm`;
// Piper phonemizer wasm + espeak data (pinned by vits-web@1.0.3).
const PIPER_WASM_BASE = `https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize`;
const PIPER_WASM_URL = `${PIPER_WASM_BASE}.wasm`;   // ~0.6 MB
const PIPER_DATA_URL = `${PIPER_WASM_BASE}.data`;   // ~18 MB espeak-ng data
// OPFS filenames for cached phonemizer assets (persist across reloads).
const OPFS_PHON_WASM = 'piper_phonemize.wasm';
const OPFS_PHON_DATA = 'piper_phonemize.data';
// HuggingFace base for voice model fallback when OPFS read fails.
const HF_BASE = `https://huggingface.co/diffusionstudio/piper-voices/resolve/main`;
// Map of voice id -> HF path (mirrors vits-web's PATH_MAP entry).
const VOICE_HF_PATH = {
  'vi_VN-vais1000-medium': 'vi/vi_VN/vais1000/medium/vi_VN-vais1000-medium.onnx',
};
const VOICE_ID = 'vi_VN-vais1000-medium';
// HTMLAudioElement playback rate. Keep at 1.0 — we slow the model
// natively via LENGTH_SCALE_MULT, which produces better prosody than
// playback-rate slowdown (which preserves pitch but still warps
// formants). Lower this only if you want a playback-rate-style drag
// on top of the model-level stretch.
const PLAYBACK_RATE = 0.80;
// VITS `length_scale` multiplier applied on top of whatever the voice
// config specifies. Stretches every phoneme duration proportionally —
// the model generates slower, fuller pronunciation (helpful for
// learners). 1.0 = config default; 1.3 = ~30% longer, still natural.
const LENGTH_SCALE_MULT = 1.3;
// Single-word utterances get extra stretch. Isolated vocabulary is what
// learners want to hear drawn out clearly; phrases stay at the default
// so the rhythm doesn't feel overly sluggish.
const LENGTH_SCALE_MULT_SHORT = 1.7;
// Output-blob cache cap. 100 entries * ~50 KB/entry ≈ 5 MB.
const LRU_MAX = 100;

let _tts = null;              // the imported vits-web module
let _ort = null;              // the imported onnxruntime-web module (cached for direct use)
let _phonemizerMod = null;    // the imported piper-wasm chunk (createPiperPhonemize factory)
let _loadingPromise = null;
let _audioEl = null;          // reused for playback
let _currentUrl = null;

// Cached phonemizer assets — load once, reuse forever. These are THE
// dominant cost of synthesis: the 18 MB espeak data file takes tens of
// seconds to fetch from CDN on every instantiation, and parse+compile
// of the wasm adds more. We persist both to OPFS so page reloads don't
// re-pay network cost.
let _phonWasmBin = null;      // ArrayBuffer of piper_phonemize.wasm
let _phonWasmModule = null;   // compiled WebAssembly.Module (skip recompile)
let _phonDataBin = null;      // ArrayBuffer of piper_phonemize.data
let _phonAssetsPromise = null;

// Per-voice long-lived state. Keyed by VOICE_ID.
/** @type {Map<string, any>} */ const _session = new Map();     // ort.InferenceSession
/** @type {Map<string, any>} */ const _config = new Map();      // parsed .onnx.json
/** @type {Map<string, Promise<any>>} */ const _sessionPromise = new Map(); // de-dupe concurrent warmups

// LRU output cache keyed by `${voiceId}|${text}`. Map iteration order is
// insertion order; moving a key to the end is `delete` + `set`.
/** @type {Map<string, Blob>} */ const _lruCache = new Map();

function _lruGet(key) {
  const hit = _lruCache.get(key);
  if (!hit) return undefined;
  _lruCache.delete(key);
  _lruCache.set(key, hit);
  return hit;
}
function _lruSet(key, blob) {
  if (_lruCache.has(key)) _lruCache.delete(key);
  _lruCache.set(key, blob);
  while (_lruCache.size > LRU_MAX) {
    const oldest = _lruCache.keys().next().value;
    if (oldest === undefined) break;
    _lruCache.delete(oldest);
  }
}
function _lruClearForVoice(voiceId) {
  const prefix = voiceId + '|';
  for (const key of Array.from(_lruCache.keys())) {
    if (key.indexOf(prefix) === 0) _lruCache.delete(key);
  }
}

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
 * Caches the resolved modules for subsequent calls.
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
    try { ort.env.allowLocalModels = false; } catch (_) { }

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

    _ort = ort;
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
 * Eagerly import onnxruntime-web + vits-web AND warm the per-voice session +
 * phonemizer module so the first `speak()` call is sub-second. Safe to call
 * repeatedly. Never throws; failures surface on later speak().
 * @returns {Promise<void>}
 */
export async function preload() {
  if (!isSupported()) return;
  try {
    await loadLibrary();
    // Kick off (but don't await) all the expensive warmups in parallel:
    // ONNX session create, phonemizer JS chunk, and phonemizer assets
    // (18 MB .data file + wasm compile). First-tap latency goes from
    // tens of seconds to ~200 ms once these resolve.
    try {
      _ensureSession(VOICE_ID).catch(() => { /* surface on speak() */ });
      _ensurePhonemizerModule().catch(() => { /* surface on speak() */ });
      _ensurePhonemizerAssets().catch(() => { /* surface on speak() */ });
    } catch (_) { /* ignore */ }
  } catch (_) { /* surface on speak() */ }
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
  // The voice model (~60 MB) dominates; the phonemizer assets (~18.6 MB)
  // are the remainder. Weight progress accordingly so the bar matches
  // perceived progress.
  const VOICE_WEIGHT = 0.76;   // ~60 / ~79
  const ASSETS_WEIGHT = 1 - VOICE_WEIGHT;

  const voiceCb = (p) => {
    if (!onProgress || !p) return;
    const total = p.total || 0;
    const loaded = p.loaded || 0;
    if (total > 0) onProgress(Math.max(0, Math.min(VOICE_WEIGHT, (loaded / total) * VOICE_WEIGHT)));
  };
  await lib.download(VOICE_ID, voiceCb);
  if (onProgress) onProgress(VOICE_WEIGHT);

  // Pull the phonemizer wasm + .data into OPFS now so the first speak()
  // isn't paying ~100 s of CDN fetch for the 18 MB espeak data.
  // Sequential (not parallel): mobile Safari is flakier with concurrent
  // large downloads. Each call retries internally on transient failures.
  await _fetchToOpfs(PIPER_WASM_URL, OPFS_PHON_WASM);
  if (onProgress) onProgress(VOICE_WEIGHT + (1 - VOICE_WEIGHT) * 0.05);
  await _fetchToOpfs(PIPER_DATA_URL, OPFS_PHON_DATA);
  if (onProgress) onProgress(1);
}

// ─── OPFS helpers ──────────────────────────────────────────────────────────
// vits-web stores files by URL basename under `piper/`. For voice id X
// the keys are `X.onnx` and `X.onnx.json`.

async function _readOpfsFile(name) {
  try {
    const root = await navigator.storage.getDirectory();
    const dir = await root.getDirectoryHandle('piper', { create: false });
    const fh = await dir.getFileHandle(name, { create: false });
    return await fh.getFile();
  } catch (_) {
    return null;
  }
}

async function _writeOpfsFile(name, blob) {
  try {
    const root = await navigator.storage.getDirectory();
    const dir = await root.getDirectoryHandle('piper', { create: true });
    const fh = await dir.getFileHandle(name, { create: true });
    const w = await fh.createWritable();
    await w.write(blob);
    await w.close();
  } catch (_) { /* best-effort */ }
}

/**
 * Fetch a URL into OPFS with retry + backoff. Idempotent — skips if already
 * cached. Built for mobile Safari, which can kill long fetches silently
 * mid-stream. Bubbles up an error NAMING the asset, so the user-facing
 * alert is useful instead of just "Failed to fetch".
 */
async function _fetchToOpfs(url, opfsName, maxRetries = 2) {
  if (await _readOpfsFile(opfsName)) return;
  let lastErr;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      await _writeOpfsFile(opfsName, blob);
      return;
    } catch (e) {
      lastErr = e;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  const detail = (lastErr && lastErr.message) || String(lastErr || 'unknown');
  throw new Error(`Failed to fetch ${opfsName} after ${maxRetries + 1} attempts: ${detail}`);
}

/**
 * Load and cache the voice config (.onnx.json). Reads from OPFS first;
 * falls back to HuggingFace and writes it back to OPFS.
 */
async function _loadConfig(voiceId) {
  const cached = _config.get(voiceId);
  if (cached) return cached;
  const fileName = `${voiceId}.onnx.json`;
  let file = await _readOpfsFile(fileName);
  if (!file) {
    const hfPath = VOICE_HF_PATH[voiceId];
    if (!hfPath) throw new Error(`No HF path for voice ${voiceId}`);
    const res = await fetch(`${HF_BASE}/${hfPath}.json`);
    if (!res.ok) throw new Error(`Failed to fetch voice config: ${res.status}`);
    const blob = await res.blob();
    await _writeOpfsFile(fileName, blob);
    file = blob;
  }
  const text = await file.text();
  const cfg = JSON.parse(text);
  _config.set(voiceId, cfg);
  return cfg;
}

/**
 * Load and cache the long-lived ort.InferenceSession for a voice.
 * Reads the .onnx bytes from OPFS once; falls back to HuggingFace.
 * De-duplicates concurrent callers via `_sessionPromise`.
 */
async function _ensureSession(voiceId) {
  const cached = _session.get(voiceId);
  if (cached) return cached;
  const inFlight = _sessionPromise.get(voiceId);
  if (inFlight) return inFlight;

  const lib = await loadLibrary();
  const ort = _ort;
  if (!ort) throw new Error('onnxruntime-web not loaded');

  const promise = (async () => {
    const fileName = `${voiceId}.onnx`;
    let file = await _readOpfsFile(fileName);
    if (!file) {
      // Fallback: ask the library to download the whole voice (.onnx + .json)
      // into OPFS, then re-read. This matches download()'s behavior.
      if (typeof lib.download === 'function') {
        await lib.download(voiceId);
        file = await _readOpfsFile(fileName);
      }
      if (!file) {
        const hfPath = VOICE_HF_PATH[voiceId];
        if (!hfPath) throw new Error(`No HF path for voice ${voiceId}`);
        const res = await fetch(`${HF_BASE}/${hfPath}`);
        if (!res.ok) throw new Error(`Failed to fetch voice model: ${res.status}`);
        const blob = await res.blob();
        await _writeOpfsFile(fileName, blob);
        file = blob;
      }
    }
    const buf = await file.arrayBuffer();
    const session = await ort.InferenceSession.create(buf);
    _session.set(voiceId, session);
    // Also warm the config in parallel — we'll need it on first speak().
    try { await _loadConfig(voiceId); } catch (_) { }
    return session;
  })();

  _sessionPromise.set(voiceId, promise);
  try {
    return await promise;
  } finally {
    _sessionPromise.delete(voiceId);
  }
}

/** Import the phonemizer JS chunk (cached by browser). */
async function _ensurePhonemizerModule() {
  if (_phonemizerMod) return _phonemizerMod;
  const mod = await import(/* @vite-ignore */ PIPER_PHONEMIZE_URL);
  _phonemizerMod = mod;
  return mod;
}

/**
 * Load + compile + cache the two phonemizer asset blobs (wasm + data).
 * Persisted to OPFS so page reloads don't re-fetch. De-duplicates
 * concurrent callers via `_phonAssetsPromise`.
 *
 * This is the real performance fix: emscripten's default path fetches
 * these on every instantiation. The 18 MB .data file alone can take
 * 30-100 seconds over CDN. Caching them in memory + OPFS cuts synthesis
 * from ~6-33 seconds to ~150 ms per call.
 */
async function _ensurePhonemizerAssets() {
  if (_phonWasmBin && _phonWasmModule && _phonDataBin) {
    return { wasmBin: _phonWasmBin, wasmModule: _phonWasmModule, dataBin: _phonDataBin };
  }
  if (_phonAssetsPromise) return _phonAssetsPromise;

  _phonAssetsPromise = (async () => {
    // .wasm — tiny (~0.6 MB). Load from OPFS or fetch (with retry) and persist.
    if (!_phonWasmBin) {
      await _fetchToOpfs(PIPER_WASM_URL, OPFS_PHON_WASM);
      const file = await _readOpfsFile(OPFS_PHON_WASM);
      if (!file) throw new Error('phonemizer wasm missing from OPFS after fetch');
      _phonWasmBin = await file.arrayBuffer();
    }
    // Compile once. Subsequent instantiations are ~50 ms.
    if (!_phonWasmModule) {
      _phonWasmModule = await WebAssembly.compile(_phonWasmBin);
    }
    // .data — big (~18 MB). Same pattern.
    if (!_phonDataBin) {
      await _fetchToOpfs(PIPER_DATA_URL, OPFS_PHON_DATA);
      const file = await _readOpfsFile(OPFS_PHON_DATA);
      if (!file) throw new Error('phonemizer data missing from OPFS after fetch');
      _phonDataBin = await file.arrayBuffer();
    }
    return { wasmBin: _phonWasmBin, wasmModule: _phonWasmModule, dataBin: _phonDataBin };
  })();

  try { return await _phonAssetsPromise; }
  finally { _phonAssetsPromise = null; }
}

/**
 * Run phonemization. Uses cached wasm Module + preloaded data so each
 * call skips the fetch+compile path entirely. Returns int[] of phoneme ids.
 */
async function _phonemize(text, espeakVoice) {
  const mod = await _ensurePhonemizerModule();
  if (typeof mod.createPiperPhonemize !== 'function') {
    throw new Error('createPiperPhonemize missing from piper chunk');
  }
  const { wasmBin, wasmModule, dataBin } = await _ensurePhonemizerAssets();
  const input = JSON.stringify([{ text: text }]);
  return await new Promise((resolve, reject) => {
    let settled = false;
    const finish = (fn, v) => { if (settled) return; settled = true; fn(v); };
    mod.createPiperPhonemize({
      // Skip emscripten's fetch — we hand it the bytes directly.
      wasmBinary: wasmBin,
      // Skip emscripten's compile — we hand it a pre-compiled Module.
      instantiateWasm: (imports, cb) => {
        WebAssembly.instantiate(wasmModule, imports)
          .then((inst) => cb(inst, wasmModule))
          .catch((e) => finish(reject, e));
        return {};
      },
      // Skip emscripten's .data fetch — intercept and return the cached bytes.
      getPreloadedPackage: (_name, _size) => dataBin,
      print: (line) => {
        try {
          const ids = JSON.parse(line).phoneme_ids;
          finish(resolve, ids);
        } catch (e) { finish(reject, e); }
      },
      printErr: (line) => { finish(reject, new Error(String(line))); },
      locateFile: (f) => {
        if (f.endsWith('.wasm')) return PIPER_WASM_URL;
        if (f.endsWith('.data')) return PIPER_DATA_URL;
        return f;
      },
    }).then((instance) => {
      try {
        instance.callMain([
          '-l', espeakVoice,
          '--input', input,
          '--espeak_data', '/espeak-ng-data',
        ]);
      } catch (e) { finish(reject, e); }
    }).catch((e) => finish(reject, e));
  });
}

/**
 * Encode a Float32Array of audio samples as a 16-bit mono WAV buffer.
 * Mirrors the byte layout of vits-web's internal encoder (verified
 * against `dist/vits-web.js`): 44-byte RIFF header, int16 PCM, clamp
 * to [-1, 1], scale by 32768.
 */
function _encodeWav(samples, sampleRate) {
  const numChannels = 1;
  const bytesPerSample = 2;
  const dataLen = samples.length * numChannels * bytesPerSample;
  const buf = new ArrayBuffer(44 + dataLen);
  const view = new DataView(buf);
  // "RIFF"
  view.setUint32(0, 0x52494646, false);
  view.setUint32(4, 36 + dataLen, true);
  // "WAVE"
  view.setUint32(8, 0x57415645, false);
  // "fmt "
  view.setUint32(12, 0x666d7420, false);
  view.setUint32(16, 16, true);                      // fmt chunk size
  view.setUint16(20, 1, true);                       // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);
  view.setUint16(32, numChannels * bytesPerSample, true);
  view.setUint16(34, 16, true);                      // bits per sample
  // "data"
  view.setUint32(36, 0x64617461, false);
  view.setUint32(40, dataLen, true);
  let off = 44;
  for (let i = 0; i < samples.length; i++) {
    let s = samples[i];
    if (s >= 1) view.setInt16(off, 32767, true);
    else if (s <= -1) view.setInt16(off, -32768, true);
    else view.setInt16(off, (s * 32768) | 0, true);
    off += 2;
  }
  return buf;
}

/**
 * Synthesize `text` into an audio Blob, using a cached session.
 * Pure — no playback. Used by speak().
 */
async function _synthesize(voiceId, text) {
  const [session, cfg] = await Promise.all([
    _ensureSession(voiceId),
    _loadConfig(voiceId),
  ]);
  const ort = _ort;
  if (!ort) throw new Error('onnxruntime-web not loaded');

  const espeakVoice = cfg && cfg.espeak && cfg.espeak.voice;
  if (!espeakVoice) throw new Error('voice config missing espeak.voice');
  const ids = await _phonemize(text, espeakVoice);
  if (!ids || !ids.length) throw new Error('phonemizer produced no ids');

  const noiseScale = cfg.inference.noise_scale;
  // Single-word utterances (no whitespace) get the "short" multiplier;
  // multi-word phrases stretch less so the cadence feels natural.
  const isSingleWord = text.trim().indexOf(' ') === -1;
  const mult = isSingleWord ? LENGTH_SCALE_MULT_SHORT : LENGTH_SCALE_MULT;
  const lengthScale = cfg.inference.length_scale * mult;
  const noiseW = cfg.inference.noise_w;
  const sampleRate = cfg.audio.sample_rate;

  // int64 tensors accept BigInt64Array or regular number arrays in
  // onnxruntime-web; the minified vits-web source passes plain arrays
  // (`new _.Tensor("int64", t, [1, t.length])`) so we do the same.
  const feeds = {
    input: new ort.Tensor('int64', ids, [1, ids.length]),
    input_lengths: new ort.Tensor('int64', [ids.length]),
    scales: new ort.Tensor('float32', [noiseScale, lengthScale, noiseW]),
  };
  if (cfg.speaker_id_map && Object.keys(cfg.speaker_id_map).length) {
    // @ts-ignore — sid is an optional model input.
    feeds.sid = new ort.Tensor('int64', [0]);
  }
  const result = await session.run(feeds);
  const samples = result.output && result.output.data;
  if (!samples) throw new Error('ort run returned no output');
  const wav = _encodeWav(samples, sampleRate);
  return new Blob([wav], { type: 'audio/x-wav' });
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
  await loadLibrary();

  const cacheKey = `${VOICE_ID}|${clean}`;
  let blob = _lruGet(cacheKey);
  if (!blob) {
    blob = await _synthesize(VOICE_ID, clean);
    if (!blob || typeof blob.size !== 'number' || blob.size === 0) {
      throw new Error('Piper produced empty audio');
    }
    _lruSet(cacheKey, blob);
  }

  const url = URL.createObjectURL(blob);
  try {
    if (!_audioEl) _audioEl = new Audio();
    // Revoke previous URL to avoid leaks.
    if (_currentUrl) {
      try { URL.revokeObjectURL(_currentUrl); } catch (_) { }
    }
    _currentUrl = url;
    _audioEl.src = url;
    _audioEl.playbackRate = PLAYBACK_RATE;
    await _audioEl.play();
  } catch (err) {
    try { URL.revokeObjectURL(url); } catch (_) { }
    if (_currentUrl === url) _currentUrl = null;
    throw err;
  }
}

/**
 * Remove the cached voice from OPFS and drop all in-memory state for it.
 * @returns {Promise<void>}
 */
export async function clear() {
  // Drop in-memory caches first so an immediate re-speak can't reuse them.
  _session.delete(VOICE_ID);
  _config.delete(VOICE_ID);
  _sessionPromise.delete(VOICE_ID);
  _lruClearForVoice(VOICE_ID);
  _phonWasmBin = null;
  _phonWasmModule = null;
  _phonDataBin = null;

  if (!isSupported()) return;
  try {
    if (_tts && typeof _tts.flush === 'function') {
      await _tts.flush();
    }
  } catch (_) { /* fall through to raw removal */ }
  // Also remove our own OPFS-cached phonemizer assets. (flush() only
  // clears vits-web's own entries.)
  try {
    const root = await navigator.storage.getDirectory();
    try {
      const dir = await root.getDirectoryHandle('piper', { create: false });
      try { await dir.removeEntry(OPFS_PHON_WASM); } catch (_) { }
      try { await dir.removeEntry(OPFS_PHON_DATA); } catch (_) { }
    } catch (_) { /* no piper dir */ }
    // If the directory is now empty (flush() took everything else), drop it.
    try { await root.removeEntry('piper', { recursive: true }); } catch (_) { }
  } catch (_) { /* acceptable */ }
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
