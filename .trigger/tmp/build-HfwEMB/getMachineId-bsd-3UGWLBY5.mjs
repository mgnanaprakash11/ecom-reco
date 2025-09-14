import {
  require_execAsync
} from "./chunk-PPOEPAIU.mjs";
import {
  esm_exports,
  init_esm as init_esm2
} from "./chunk-HLMVMXTQ.mjs";
import {
  __commonJS,
  __name,
  __require,
  __toCommonJS,
  init_esm
} from "./chunk-5LW27XCU.mjs";

// ../../../Library/Caches/pnpm/dlx/ydgrh2h7r7f2w2slwzu4areodq/19946361e88-1751c/node_modules/.pnpm/@opentelemetry+resources@2.0.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-bsd.js
var require_getMachineId_bsd = __commonJS({
  "../../../Library/Caches/pnpm/dlx/ydgrh2h7r7f2w2slwzu4areodq/19946361e88-1751c/node_modules/.pnpm/@opentelemetry+resources@2.0.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-bsd.js"(exports) {
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var fs_1 = __require("fs");
    var execAsync_1 = require_execAsync();
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    async function getMachineId() {
      try {
        const result = await fs_1.promises.readFile("/etc/hostid", { encoding: "utf8" });
        return result.trim();
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      try {
        const result = await (0, execAsync_1.execAsync)("kenv -q smbios.system.uuid");
        return result.stdout.trim();
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      return void 0;
    }
    __name(getMachineId, "getMachineId");
    exports.getMachineId = getMachineId;
  }
});
export default require_getMachineId_bsd();
//# sourceMappingURL=getMachineId-bsd-3UGWLBY5.mjs.map
