import {
  task
} from "./chunk-X5KWFJ2T.mjs";
import {
  __name,
  init_esm
} from "./chunk-5LW27XCU.mjs";

// packages/tasks/src/trigger/example.ts
init_esm();
var helloWorldTask = task({
  id: "hello-world",
  run: /* @__PURE__ */ __name(async (payload) => {
    console.log(`Hello ${payload.name}!`);
    return {
      message: `Hello ${payload.name}!`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }, "run")
});

export {
  helloWorldTask
};
//# sourceMappingURL=chunk-Q2DIGP6F.mjs.map
