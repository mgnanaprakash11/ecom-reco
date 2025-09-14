import {
  __name,
  init_esm
} from "./chunk-5LW27XCU.mjs";

// ../../../Library/Caches/pnpm/dlx/ydgrh2h7r7f2w2slwzu4areodq/19946361e88-1751c/node_modules/.pnpm/uncrypto@0.1.3/node_modules/uncrypto/dist/crypto.node.mjs
init_esm();
import nodeCrypto from "node:crypto";
var subtle = nodeCrypto.webcrypto?.subtle || {};
var randomUUID = /* @__PURE__ */ __name(() => {
  return nodeCrypto.randomUUID();
}, "randomUUID");
var getRandomValues = /* @__PURE__ */ __name((array) => {
  return nodeCrypto.webcrypto.getRandomValues(array);
}, "getRandomValues");
var _crypto = {
  randomUUID,
  getRandomValues,
  subtle
};
export {
  _crypto as default,
  getRandomValues,
  randomUUID,
  subtle
};
//# sourceMappingURL=crypto.node-G4F4AXIK.mjs.map
