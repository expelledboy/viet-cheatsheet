# vendor/piper

Vendored runtime assets for the optional HQ Vietnamese voice (`piper.js`).
Self-hosted because CDN fetches of the 18 MB `.data` file were proving
unreliable on mobile (connection kills mid-stream, opaque "Failed to fetch"
errors). Same-origin hosting is predictable.

## Files

- `piper_phonemize.wasm` (~0.6 MB) — emscripten-compiled Piper phonemizer
- `piper_phonemize.data` (~18 MB) — espeak-ng language data bundle

## Source

Both files are copied from `@diffusionstudio/piper-wasm@1.0.0`, specifically:

- <https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.wasm>
- <https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.data>

Upstream repo: <https://github.com/diffusionstudio/piper-wasm>

## License

`piper-wasm` wraps [rhasspy/piper-phonemize](https://github.com/rhasspy/piper-phonemize) (MIT) and [espeak-ng](https://github.com/espeak-ng/espeak-ng) (GPL-3.0). The GPL-3.0 espeak-ng data is bundled into `piper_phonemize.data`. Redistributing these alongside MIT application code is standard for the Piper ecosystem; the GPL'd data is used as-is without modification.

## Updating

If `piper.js` bumps `LIB_VERSION` beyond `1.0.3`, re-download these files from the matching `@diffusionstudio/piper-wasm` version. The JS chunk in vits-web references a content-hashed filename (currently `piper-DeOu3H9E.js`) so verify the phonemizer asset URL pattern in the new bundle.
