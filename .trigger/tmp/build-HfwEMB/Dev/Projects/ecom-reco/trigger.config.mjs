import {
  defineConfig
} from "../../../chunk-X5KWFJ2T.mjs";
import "../../../chunk-CKZYL5P5.mjs";
import {
  init_esm
} from "../../../chunk-5LW27XCU.mjs";

// trigger.config.ts
init_esm();
var trigger_config_default = defineConfig({
  project: "proj_efjtlylcivgjskjcbtqo",
  dirs: ["./packages/tasks/src/trigger"],
  // Required in v4: minimum 5 seconds
  maxDuration: 3600,
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 1e4,
      factor: 2,
      randomize: true
    }
  },
  build: {}
});
var resolveEnvVars = void 0;
export {
  trigger_config_default as default,
  resolveEnvVars
};
//# sourceMappingURL=trigger.config.mjs.map
