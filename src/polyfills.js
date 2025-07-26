

if (!globalThis.crypto) {
  globalThis.crypto = window.crypto || window.msCrypto; 
}


if (!globalThis.global) {
  globalThis.global = globalThis;
}