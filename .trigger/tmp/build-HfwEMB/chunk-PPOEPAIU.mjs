import {
  __commonJS,
  __require,
  init_esm
} from "./chunk-5LW27XCU.mjs";

// ../../../Library/Caches/pnpm/dlx/ydgrh2h7r7f2w2slwzu4areodq/19946361e88-1751c/node_modules/.pnpm/@opentelemetry+resources@2.0.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/execAsync.js
var require_execAsync = __commonJS({
  "../../../Library/Caches/pnpm/dlx/ydgrh2h7r7f2w2slwzu4areodq/19946361e88-1751c/node_modules/.pnpm/@opentelemetry+resources@2.0.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/execAsync.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.execAsync = void 0;
    var child_process = __require("child_process");
    var util = __require("util");
    exports.execAsync = util.promisify(child_process.exec);
  }
});

export {
  require_execAsync
};
//# sourceMappingURL=chunk-PPOEPAIU.mjs.map
