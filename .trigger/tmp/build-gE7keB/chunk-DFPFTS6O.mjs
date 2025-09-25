import {
  EventSourceParserStream,
  FetchError,
  ShapeStream,
  SpanKind,
  SpanStatusCode,
  context,
  external_exports,
  init_esm as init_esm2,
  isChangeMessage,
  isControlMessage,
  o,
  propagation,
  require_cjs,
  require_humanize_duration,
  require_lib,
  require_src,
  require_src2,
  require_src3,
  trace,
  zod_default
} from "./chunk-XKNAOPP5.mjs";
import {
  __name,
  __toESM,
  init_esm
} from "./chunk-AOCDNUUZ.mjs";

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/tasks.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/hooks.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/version.js
init_esm();
var VERSION = "4.0.4";

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/jwt.js
init_esm();
var JWT_ALGORITHM = "HS256";
var JWT_ISSUER = "https://id.trigger.dev";
var JWT_AUDIENCE = "https://api.trigger.dev";
async function generateJWT(options) {
  const { SignJWT } = await import("./esm-OEHSRGKO.mjs");
  const secret = new TextEncoder().encode(options.secretKey);
  return new SignJWT(options.payload).setIssuer(JWT_ISSUER).setAudience(JWT_AUDIENCE).setProtectedHeader({ alg: JWT_ALGORITHM }).setIssuedAt().setExpirationTime(options.expirationTime ?? "15m").sign(secret);
}
__name(generateJWT, "generateJWT");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/tokens.js
init_esm();
var CreateAuthorizationCodeResponseSchema = external_exports.object({
  url: external_exports.string().url(),
  authorizationCode: external_exports.string()
});
var GetPersonalAccessTokenRequestSchema = external_exports.object({
  authorizationCode: external_exports.string()
});
var GetPersonalAccessTokenResponseSchema = external_exports.object({
  token: external_exports.object({
    token: external_exports.string(),
    obfuscatedToken: external_exports.string()
  }).nullable()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/schemas/json.js
init_esm();
var LiteralSchema = external_exports.union([external_exports.string(), external_exports.number(), external_exports.boolean(), external_exports.null()]);
var DeserializedJsonSchema = external_exports.lazy(() => external_exports.union([LiteralSchema, external_exports.array(DeserializedJsonSchema), external_exports.record(DeserializedJsonSchema)]));
var SerializableSchema = external_exports.union([
  external_exports.string(),
  external_exports.number(),
  external_exports.boolean(),
  external_exports.null(),
  external_exports.date(),
  external_exports.undefined(),
  external_exports.symbol()
]);
var SerializableJsonSchema = external_exports.lazy(() => external_exports.union([SerializableSchema, external_exports.array(SerializableJsonSchema), external_exports.record(SerializableJsonSchema)]));

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/common.js
init_esm();
var RunMetadataUpdateOperation = external_exports.object({
  type: external_exports.literal("update"),
  value: external_exports.record(external_exports.unknown())
});
var RunMetadataSetKeyOperation = external_exports.object({
  type: external_exports.literal("set"),
  key: external_exports.string(),
  value: DeserializedJsonSchema
});
var RunMetadataDeleteKeyOperation = external_exports.object({
  type: external_exports.literal("delete"),
  key: external_exports.string()
});
var RunMetadataAppendKeyOperation = external_exports.object({
  type: external_exports.literal("append"),
  key: external_exports.string(),
  value: DeserializedJsonSchema
});
var RunMetadataRemoveFromKeyOperation = external_exports.object({
  type: external_exports.literal("remove"),
  key: external_exports.string(),
  value: DeserializedJsonSchema
});
var RunMetadataIncrementKeyOperation = external_exports.object({
  type: external_exports.literal("increment"),
  key: external_exports.string(),
  value: external_exports.number()
});
var RunMetadataChangeOperation = external_exports.discriminatedUnion("type", [
  RunMetadataUpdateOperation,
  RunMetadataSetKeyOperation,
  RunMetadataDeleteKeyOperation,
  RunMetadataAppendKeyOperation,
  RunMetadataRemoveFromKeyOperation,
  RunMetadataIncrementKeyOperation
]);
var FlushedRunMetadata = external_exports.object({
  metadata: external_exports.record(DeserializedJsonSchema).optional(),
  operations: external_exports.array(RunMetadataChangeOperation).optional(),
  parentOperations: external_exports.array(RunMetadataChangeOperation).optional(),
  rootOperations: external_exports.array(RunMetadataChangeOperation).optional()
});
var MachineCpu = external_exports.union([
  external_exports.literal(0.25),
  external_exports.literal(0.5),
  external_exports.literal(1),
  external_exports.literal(2),
  external_exports.literal(4)
]);
var MachineMemory = external_exports.union([
  external_exports.literal(0.25),
  external_exports.literal(0.5),
  external_exports.literal(1),
  external_exports.literal(2),
  external_exports.literal(4),
  external_exports.literal(8)
]);
var MachinePresetName = external_exports.enum([
  "micro",
  "small-1x",
  "small-2x",
  "medium-1x",
  "medium-2x",
  "large-1x",
  "large-2x"
]);
var MachineConfig = external_exports.object({
  cpu: MachineCpu.optional(),
  memory: MachineMemory.optional(),
  preset: MachinePresetName.optional()
});
var MachinePreset = external_exports.object({
  name: MachinePresetName,
  /** unit: vCPU */
  cpu: external_exports.number(),
  /** unit: GB */
  memory: external_exports.number(),
  centsPerMs: external_exports.number()
});
var TaskRunBuiltInError = external_exports.object({
  type: external_exports.literal("BUILT_IN_ERROR"),
  name: external_exports.string(),
  message: external_exports.string(),
  stackTrace: external_exports.string()
});
var TaskRunCustomErrorObject = external_exports.object({
  type: external_exports.literal("CUSTOM_ERROR"),
  raw: external_exports.string()
});
var TaskRunStringError = external_exports.object({
  type: external_exports.literal("STRING_ERROR"),
  raw: external_exports.string()
});
var TaskRunInternalError = external_exports.object({
  type: external_exports.literal("INTERNAL_ERROR"),
  code: external_exports.enum([
    "COULD_NOT_FIND_EXECUTOR",
    "COULD_NOT_FIND_TASK",
    "COULD_NOT_IMPORT_TASK",
    "CONFIGURED_INCORRECTLY",
    "TASK_ALREADY_RUNNING",
    "TASK_EXECUTION_FAILED",
    "TASK_EXECUTION_ABORTED",
    "TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE",
    "TASK_PROCESS_SIGKILL_TIMEOUT",
    "TASK_PROCESS_SIGSEGV",
    "TASK_PROCESS_SIGTERM",
    "TASK_PROCESS_OOM_KILLED",
    "TASK_PROCESS_MAYBE_OOM_KILLED",
    "TASK_RUN_CANCELLED",
    "TASK_INPUT_ERROR",
    "TASK_OUTPUT_ERROR",
    "TASK_MIDDLEWARE_ERROR",
    "HANDLE_ERROR_ERROR",
    "GRACEFUL_EXIT_TIMEOUT",
    "TASK_RUN_HEARTBEAT_TIMEOUT",
    "TASK_RUN_CRASHED",
    "MAX_DURATION_EXCEEDED",
    "DISK_SPACE_EXCEEDED",
    "POD_EVICTED",
    "POD_UNKNOWN_ERROR",
    "TASK_HAS_N0_EXECUTION_SNAPSHOT",
    "TASK_DEQUEUED_INVALID_STATE",
    "TASK_DEQUEUED_QUEUE_NOT_FOUND",
    "TASK_RUN_DEQUEUED_MAX_RETRIES",
    "TASK_RUN_STALLED_EXECUTING",
    "TASK_RUN_STALLED_EXECUTING_WITH_WAITPOINTS",
    "OUTDATED_SDK_VERSION",
    "TASK_DID_CONCURRENT_WAIT",
    "RECURSIVE_WAIT_DEADLOCK"
  ]),
  message: external_exports.string().optional(),
  stackTrace: external_exports.string().optional()
});
var TaskRunErrorCodes = TaskRunInternalError.shape.code.enum;
var TaskRunError = external_exports.discriminatedUnion("type", [
  TaskRunBuiltInError,
  TaskRunCustomErrorObject,
  TaskRunStringError,
  TaskRunInternalError
]);
var TaskRun = external_exports.object({
  id: external_exports.string(),
  payload: external_exports.string(),
  payloadType: external_exports.string(),
  tags: external_exports.array(external_exports.string()),
  isTest: external_exports.boolean().default(false),
  createdAt: external_exports.coerce.date(),
  startedAt: external_exports.coerce.date().default(() => /* @__PURE__ */ new Date()),
  idempotencyKey: external_exports.string().optional(),
  maxAttempts: external_exports.number().optional(),
  version: external_exports.string().optional(),
  metadata: external_exports.record(DeserializedJsonSchema).optional(),
  maxDuration: external_exports.number().optional(),
  /** The priority of the run. Wih a value of 10 it will be dequeued before runs that were triggered 9 seconds before it (assuming they had no priority set).  */
  priority: external_exports.number().optional(),
  baseCostInCents: external_exports.number().optional(),
  parentTaskRunId: external_exports.string().optional(),
  rootTaskRunId: external_exports.string().optional(),
  // These are only used during execution, not in run.ctx
  durationMs: external_exports.number().optional(),
  costInCents: external_exports.number().optional(),
  region: external_exports.string().optional()
});
var GitMeta = external_exports.object({
  provider: external_exports.string().optional(),
  source: external_exports.enum(["trigger_github_app", "github_actions", "local"]).optional(),
  ghUsername: external_exports.string().optional(),
  ghUserAvatarUrl: external_exports.string().optional(),
  commitAuthorName: external_exports.string().optional(),
  commitMessage: external_exports.string().optional(),
  commitRef: external_exports.string().optional(),
  commitSha: external_exports.string().optional(),
  dirty: external_exports.boolean().optional(),
  remoteUrl: external_exports.string().optional(),
  pullRequestNumber: external_exports.number().optional(),
  pullRequestTitle: external_exports.string().optional(),
  pullRequestState: external_exports.enum(["open", "closed", "merged"]).optional()
});
var TaskRunExecutionTask = external_exports.object({
  id: external_exports.string(),
  filePath: external_exports.string()
});
var TaskRunExecutionAttempt = external_exports.object({
  number: external_exports.number(),
  startedAt: external_exports.coerce.date()
});
var TaskRunExecutionEnvironment = external_exports.object({
  id: external_exports.string(),
  slug: external_exports.string(),
  type: external_exports.enum(["PRODUCTION", "STAGING", "DEVELOPMENT", "PREVIEW"]),
  branchName: external_exports.string().optional(),
  git: GitMeta.optional()
});
var TaskRunExecutionOrganization = external_exports.object({
  id: external_exports.string(),
  slug: external_exports.string(),
  name: external_exports.string()
});
var TaskRunExecutionProject = external_exports.object({
  id: external_exports.string(),
  ref: external_exports.string(),
  slug: external_exports.string(),
  name: external_exports.string()
});
var TaskRunExecutionQueue = external_exports.object({
  id: external_exports.string(),
  name: external_exports.string()
});
var TaskRunExecutionBatch = external_exports.object({
  id: external_exports.string()
});
var TaskRunExecutionDeployment = external_exports.object({
  id: external_exports.string(),
  shortCode: external_exports.string(),
  version: external_exports.string(),
  runtime: external_exports.string(),
  runtimeVersion: external_exports.string(),
  git: GitMeta.optional()
});
var StaticTaskRunExecutionShape = {
  // Passthrough needed for backwards compatibility
  task: TaskRunExecutionTask.passthrough(),
  queue: TaskRunExecutionQueue,
  environment: TaskRunExecutionEnvironment,
  organization: TaskRunExecutionOrganization,
  project: TaskRunExecutionProject,
  machine: MachinePreset,
  batch: TaskRunExecutionBatch.optional(),
  deployment: TaskRunExecutionDeployment.optional()
};
var StaticTaskRunExecution = external_exports.object(StaticTaskRunExecutionShape);
var TaskRunExecution = external_exports.object({
  // Passthrough needed for backwards compatibility
  attempt: TaskRunExecutionAttempt.passthrough(),
  run: TaskRun.and(external_exports.object({
    traceContext: external_exports.record(external_exports.unknown()).optional()
  })),
  ...StaticTaskRunExecutionShape
});
var V3TaskRunExecutionTask = external_exports.object({
  id: external_exports.string(),
  filePath: external_exports.string(),
  exportName: external_exports.string().optional()
});
var V3TaskRunExecutionAttempt = external_exports.object({
  number: external_exports.number(),
  startedAt: external_exports.coerce.date(),
  id: external_exports.string(),
  backgroundWorkerId: external_exports.string(),
  backgroundWorkerTaskId: external_exports.string(),
  status: external_exports.string()
});
var V3TaskRun = external_exports.object({
  id: external_exports.string(),
  payload: external_exports.string(),
  payloadType: external_exports.string(),
  tags: external_exports.array(external_exports.string()),
  isTest: external_exports.boolean().default(false),
  createdAt: external_exports.coerce.date(),
  startedAt: external_exports.coerce.date().default(() => /* @__PURE__ */ new Date()),
  idempotencyKey: external_exports.string().optional(),
  maxAttempts: external_exports.number().optional(),
  version: external_exports.string().optional(),
  metadata: external_exports.record(DeserializedJsonSchema).optional(),
  maxDuration: external_exports.number().optional(),
  context: external_exports.unknown(),
  durationMs: external_exports.number(),
  costInCents: external_exports.number(),
  baseCostInCents: external_exports.number()
});
var V3TaskRunExecution = external_exports.object({
  task: V3TaskRunExecutionTask,
  attempt: V3TaskRunExecutionAttempt,
  run: V3TaskRun.and(external_exports.object({
    traceContext: external_exports.record(external_exports.unknown()).optional()
  })),
  queue: TaskRunExecutionQueue,
  environment: TaskRunExecutionEnvironment,
  organization: TaskRunExecutionOrganization,
  project: TaskRunExecutionProject,
  machine: MachinePreset,
  batch: TaskRunExecutionBatch.optional()
});
var TaskRunContext = external_exports.object({
  attempt: TaskRunExecutionAttempt,
  run: TaskRun.omit({
    payload: true,
    payloadType: true,
    metadata: true,
    durationMs: true,
    costInCents: true
  }),
  ...StaticTaskRunExecutionShape
});
var V3TaskRunExecutionEnvironment = external_exports.object({
  id: external_exports.string(),
  slug: external_exports.string(),
  type: external_exports.enum(["PRODUCTION", "STAGING", "DEVELOPMENT", "PREVIEW"])
});
var V3TaskRunContext = external_exports.object({
  attempt: V3TaskRunExecutionAttempt.omit({
    backgroundWorkerId: true,
    backgroundWorkerTaskId: true
  }),
  run: V3TaskRun.omit({
    payload: true,
    payloadType: true,
    metadata: true
  }),
  task: V3TaskRunExecutionTask,
  queue: TaskRunExecutionQueue,
  environment: V3TaskRunExecutionEnvironment,
  organization: TaskRunExecutionOrganization,
  project: TaskRunExecutionProject,
  batch: TaskRunExecutionBatch.optional(),
  machine: MachinePreset.optional()
});
var TaskRunExecutionRetry = external_exports.object({
  timestamp: external_exports.number(),
  /** Retry delay in milliseconds */
  delay: external_exports.number(),
  error: external_exports.unknown().optional()
});
var TaskRunExecutionUsage = external_exports.object({
  durationMs: external_exports.number()
});
var TaskRunFailedExecutionResult = external_exports.object({
  ok: external_exports.literal(false),
  id: external_exports.string(),
  error: TaskRunError,
  retry: TaskRunExecutionRetry.optional(),
  skippedRetrying: external_exports.boolean().optional(),
  usage: TaskRunExecutionUsage.optional(),
  // Optional for now for backwards compatibility
  taskIdentifier: external_exports.string().optional(),
  // This is deprecated, use flushedMetadata instead
  metadata: FlushedRunMetadata.optional(),
  // This is the new way to flush metadata
  flushedMetadata: external_exports.object({
    data: external_exports.string().optional(),
    dataType: external_exports.string()
  }).optional()
});
var TaskRunSuccessfulExecutionResult = external_exports.object({
  ok: external_exports.literal(true),
  id: external_exports.string(),
  output: external_exports.string().optional(),
  outputType: external_exports.string(),
  usage: TaskRunExecutionUsage.optional(),
  // Optional for now for backwards compatibility
  taskIdentifier: external_exports.string().optional(),
  // This is deprecated, use flushedMetadata instead
  metadata: FlushedRunMetadata.optional(),
  // This is the new way to flush metadata
  flushedMetadata: external_exports.object({
    data: external_exports.string().optional(),
    dataType: external_exports.string()
  }).optional()
});
var TaskRunExecutionResult = external_exports.discriminatedUnion("ok", [
  TaskRunSuccessfulExecutionResult,
  TaskRunFailedExecutionResult
]);
var BatchTaskRunExecutionResult = external_exports.object({
  id: external_exports.string(),
  items: TaskRunExecutionResult.array()
});
var WaitpointTokenResult = external_exports.object({
  ok: external_exports.boolean(),
  output: external_exports.string().optional(),
  outputType: external_exports.string().optional()
});
var SerializedError = external_exports.object({
  message: external_exports.string(),
  name: external_exports.string().optional(),
  stackTrace: external_exports.string().optional()
});
var RuntimeEnvironmentType = {
  PRODUCTION: "PRODUCTION",
  STAGING: "STAGING",
  DEVELOPMENT: "DEVELOPMENT",
  PREVIEW: "PREVIEW"
};
var RuntimeEnvironmentTypeSchema = external_exports.enum(Object.values(RuntimeEnvironmentType));

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/resources.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/schemas.js
init_esm();
var EnvironmentType = external_exports.enum(["PRODUCTION", "STAGING", "DEVELOPMENT", "PREVIEW"]);
var RunEngineVersionSchema = external_exports.enum(["V1", "V2"]);
var TaskRunExecutionMetric = external_exports.object({
  name: external_exports.string(),
  event: external_exports.string(),
  timestamp: external_exports.number(),
  duration: external_exports.number()
});
var TaskRunExecutionMetrics = external_exports.array(TaskRunExecutionMetric);
var TaskRunExecutionPayload = external_exports.object({
  execution: TaskRunExecution,
  traceContext: external_exports.record(external_exports.unknown()),
  environment: external_exports.record(external_exports.string()).optional(),
  metrics: TaskRunExecutionMetrics.optional()
});
var V3ProdTaskRunExecution = V3TaskRunExecution.extend({
  worker: external_exports.object({
    id: external_exports.string(),
    contentHash: external_exports.string(),
    version: external_exports.string(),
    type: RunEngineVersionSchema.optional()
  }),
  machine: MachinePreset.default({ name: "small-1x", cpu: 1, memory: 1, centsPerMs: 0 })
});
var V3ProdTaskRunExecutionPayload = external_exports.object({
  execution: V3ProdTaskRunExecution,
  traceContext: external_exports.record(external_exports.unknown()),
  environment: external_exports.record(external_exports.string()).optional(),
  metrics: TaskRunExecutionMetrics.optional()
});
var FixedWindowRateLimit = external_exports.object({
  type: external_exports.literal("fixed-window"),
  limit: external_exports.number(),
  window: external_exports.union([
    external_exports.object({
      seconds: external_exports.number()
    }),
    external_exports.object({
      minutes: external_exports.number()
    }),
    external_exports.object({
      hours: external_exports.number()
    })
  ])
});
var SlidingWindowRateLimit = external_exports.object({
  type: external_exports.literal("sliding-window"),
  limit: external_exports.number(),
  window: external_exports.union([
    external_exports.object({
      seconds: external_exports.number()
    }),
    external_exports.object({
      minutes: external_exports.number()
    }),
    external_exports.object({
      hours: external_exports.number()
    })
  ])
});
var RateLimitOptions = external_exports.discriminatedUnion("type", [
  FixedWindowRateLimit,
  SlidingWindowRateLimit
]);
var RetryOptions = external_exports.object({
  /** The number of attempts before giving up */
  maxAttempts: external_exports.number().int().optional(),
  /** The exponential factor to use when calculating the next retry time.
   *
   * Each subsequent retry will be calculated as `previousTimeout * factor`
   */
  factor: external_exports.number().optional(),
  /** The minimum time to wait before retrying */
  minTimeoutInMs: external_exports.number().int().optional(),
  /** The maximum time to wait before retrying */
  maxTimeoutInMs: external_exports.number().int().optional(),
  /** Randomize the timeout between retries.
   *
   * This can be useful to prevent the thundering herd problem where all retries happen at the same time.
   */
  randomize: external_exports.boolean().optional(),
  /** If a run fails with an Out Of Memory (OOM) error and you have this set, it will retry with the machine you specify.
   * Note: it will not default to this [machine](https://trigger.dev/docs/machines) for new runs, only for failures caused by OOM errors.
   * So if you frequently have attempts failing with OOM errors, you should set the [default machine](https://trigger.dev/docs/machines) to be higher.
   */
  outOfMemory: external_exports.object({
    machine: MachinePresetName.optional()
  }).optional()
});
var QueueManifest = external_exports.object({
  /** You can define a shared queue and then pass the name in to your task.
     *
     * @example
     *
     * ```ts
     * const myQueue = queue({
        name: "my-queue",
        concurrencyLimit: 1,
      });
  
      export const task1 = task({
        id: "task-1",
        queue: {
          name: "my-queue",
        },
        run: async (payload: { message: string }) => {
          // ...
        },
      });
  
      export const task2 = task({
        id: "task-2",
        queue: {
          name: "my-queue",
        },
        run: async (payload: { message: string }) => {
          // ...
        },
      });
     * ```
     */
  name: external_exports.string(),
  /** An optional property that specifies the maximum number of concurrent run executions.
   *
   * If this property is omitted, the task can potentially use up the full concurrency of an environment */
  concurrencyLimit: external_exports.number().int().min(0).max(1e5).optional().nullable()
});
var ScheduleMetadata = external_exports.object({
  cron: external_exports.string(),
  timezone: external_exports.string(),
  environments: external_exports.array(EnvironmentType).optional()
});
var taskMetadata = {
  id: external_exports.string(),
  description: external_exports.string().optional(),
  queue: QueueManifest.extend({ name: external_exports.string().optional() }).optional(),
  retry: RetryOptions.optional(),
  machine: MachineConfig.optional(),
  triggerSource: external_exports.string().optional(),
  schedule: ScheduleMetadata.optional(),
  maxDuration: external_exports.number().optional(),
  payloadSchema: external_exports.unknown().optional()
};
var TaskMetadata = external_exports.object(taskMetadata);
var TaskFile = external_exports.object({
  entry: external_exports.string(),
  out: external_exports.string()
});
var taskFileMetadata = {
  filePath: external_exports.string(),
  exportName: external_exports.string().optional(),
  entryPoint: external_exports.string()
};
var TaskFileMetadata = external_exports.object(taskFileMetadata);
var TaskManifest = external_exports.object({
  ...taskMetadata,
  ...taskFileMetadata
});
var PostStartCauses = external_exports.enum(["index", "create", "restore"]);
var PreStopCauses = external_exports.enum(["terminate"]);
var RegexSchema = external_exports.custom((val) => {
  try {
    return typeof val.test === "function";
  } catch {
    return false;
  }
});
var Config = external_exports.object({
  project: external_exports.string(),
  triggerDirectories: external_exports.string().array().optional(),
  triggerUrl: external_exports.string().optional(),
  projectDir: external_exports.string().optional(),
  tsconfigPath: external_exports.string().optional(),
  retries: external_exports.object({
    enabledInDev: external_exports.boolean().default(true),
    default: RetryOptions.optional()
  }).optional(),
  additionalPackages: external_exports.string().array().optional(),
  additionalFiles: external_exports.string().array().optional(),
  dependenciesToBundle: external_exports.array(external_exports.union([external_exports.string(), RegexSchema])).optional(),
  logLevel: external_exports.string().optional(),
  enableConsoleLogging: external_exports.boolean().optional(),
  postInstall: external_exports.string().optional(),
  extraCACerts: external_exports.string().optional()
});
var WaitReason = external_exports.enum(["WAIT_FOR_DURATION", "WAIT_FOR_TASK", "WAIT_FOR_BATCH"]);
var TaskRunExecutionLazyAttemptPayload = external_exports.object({
  runId: external_exports.string(),
  attemptCount: external_exports.number().optional(),
  messageId: external_exports.string(),
  isTest: external_exports.boolean(),
  traceContext: external_exports.record(external_exports.unknown()),
  environment: external_exports.record(external_exports.string()).optional(),
  metrics: TaskRunExecutionMetrics.optional()
});
var ManualCheckpointMetadata = external_exports.object({
  /** NOT a friendly ID */
  attemptId: external_exports.string(),
  previousRunStatus: external_exports.string(),
  previousAttemptStatus: external_exports.string()
});
var RunChainState = external_exports.object({
  concurrency: external_exports.object({
    queues: external_exports.array(external_exports.object({ id: external_exports.string(), name: external_exports.string(), holding: external_exports.number() })),
    environment: external_exports.number().optional()
  }).optional()
});
var TriggerTraceContext = external_exports.object({
  traceparent: external_exports.string().optional(),
  tracestate: external_exports.string().optional(),
  external: external_exports.object({
    traceparent: external_exports.string().optional(),
    tracestate: external_exports.string().optional()
  }).optional()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/resources.js
var TaskResource = external_exports.object({
  id: external_exports.string(),
  description: external_exports.string().optional(),
  filePath: external_exports.string(),
  exportName: external_exports.string().optional(),
  queue: QueueManifest.extend({ name: external_exports.string().optional() }).optional(),
  retry: RetryOptions.optional(),
  machine: MachineConfig.optional(),
  triggerSource: external_exports.string().optional(),
  schedule: ScheduleMetadata.optional(),
  maxDuration: external_exports.number().optional(),
  // JSONSchema type - using z.unknown() for runtime validation to accept JSONSchema7
  payloadSchema: external_exports.unknown().optional()
});
var BackgroundWorkerSourceFileMetadata = external_exports.object({
  filePath: external_exports.string(),
  contents: external_exports.string(),
  contentHash: external_exports.string(),
  taskIds: external_exports.array(external_exports.string())
});
var BackgroundWorkerMetadata = external_exports.object({
  packageVersion: external_exports.string(),
  contentHash: external_exports.string(),
  cliPackageVersion: external_exports.string().optional(),
  tasks: external_exports.array(TaskResource),
  queues: external_exports.array(QueueManifest).optional(),
  sourceFiles: external_exports.array(BackgroundWorkerSourceFileMetadata).optional(),
  runtime: external_exports.string().optional(),
  runtimeVersion: external_exports.string().optional()
});
var ImageDetailsMetadata = external_exports.object({
  contentHash: external_exports.string(),
  imageTag: external_exports.string()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/runEngine.js
init_esm();
var TaskRunExecutionStatus = {
  RUN_CREATED: "RUN_CREATED",
  QUEUED: "QUEUED",
  QUEUED_EXECUTING: "QUEUED_EXECUTING",
  PENDING_EXECUTING: "PENDING_EXECUTING",
  EXECUTING: "EXECUTING",
  EXECUTING_WITH_WAITPOINTS: "EXECUTING_WITH_WAITPOINTS",
  SUSPENDED: "SUSPENDED",
  PENDING_CANCEL: "PENDING_CANCEL",
  FINISHED: "FINISHED"
};
var TaskRunStatus = {
  DELAYED: "DELAYED",
  PENDING: "PENDING",
  PENDING_VERSION: "PENDING_VERSION",
  WAITING_FOR_DEPLOY: "WAITING_FOR_DEPLOY",
  DEQUEUED: "DEQUEUED",
  EXECUTING: "EXECUTING",
  WAITING_TO_RESUME: "WAITING_TO_RESUME",
  RETRYING_AFTER_FAILURE: "RETRYING_AFTER_FAILURE",
  PAUSED: "PAUSED",
  CANCELED: "CANCELED",
  INTERRUPTED: "INTERRUPTED",
  COMPLETED_SUCCESSFULLY: "COMPLETED_SUCCESSFULLY",
  COMPLETED_WITH_ERRORS: "COMPLETED_WITH_ERRORS",
  SYSTEM_FAILURE: "SYSTEM_FAILURE",
  CRASHED: "CRASHED",
  EXPIRED: "EXPIRED",
  TIMED_OUT: "TIMED_OUT"
};
var WaitpointType = {
  RUN: "RUN",
  DATETIME: "DATETIME",
  MANUAL: "MANUAL",
  BATCH: "BATCH"
};
var WaitpointStatusValues = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED"
};
var WaitpointStatus = external_exports.enum(Object.values(WaitpointStatusValues));
var CompletedWaitpoint = external_exports.object({
  id: external_exports.string(),
  index: external_exports.number().optional(),
  friendlyId: external_exports.string(),
  type: external_exports.enum(Object.values(WaitpointType)),
  completedAt: external_exports.coerce.date(),
  idempotencyKey: external_exports.string().optional(),
  /** For type === "RUN" */
  completedByTaskRun: external_exports.object({
    id: external_exports.string(),
    friendlyId: external_exports.string(),
    /** If the run has an associated batch */
    batch: external_exports.object({
      id: external_exports.string(),
      friendlyId: external_exports.string()
    }).optional()
  }).optional(),
  /** For type === "DATETIME" */
  completedAfter: external_exports.coerce.date().optional(),
  /** For type === "BATCH" */
  completedByBatch: external_exports.object({
    id: external_exports.string(),
    friendlyId: external_exports.string()
  }).optional(),
  output: external_exports.string().optional(),
  outputType: external_exports.string().optional(),
  outputIsError: external_exports.boolean()
});
var ExecutionSnapshot = external_exports.object({
  id: external_exports.string(),
  friendlyId: external_exports.string(),
  executionStatus: external_exports.enum(Object.values(TaskRunExecutionStatus)),
  description: external_exports.string(),
  createdAt: external_exports.coerce.date()
});
var BaseRunMetadata = external_exports.object({
  id: external_exports.string(),
  friendlyId: external_exports.string(),
  status: external_exports.enum(Object.values(TaskRunStatus)),
  attemptNumber: external_exports.number().nullish()
});
var ExecutionResult = external_exports.object({
  snapshot: ExecutionSnapshot,
  run: BaseRunMetadata
});
var StartRunAttemptResult = ExecutionResult.and(external_exports.object({
  execution: TaskRunExecution
}));
var CompleteAttemptStatus = external_exports.enum([
  "RUN_FINISHED",
  "RUN_PENDING_CANCEL",
  "RETRY_QUEUED",
  "RETRY_IMMEDIATELY"
]);
var CompleteRunAttemptResult = external_exports.object({
  attemptStatus: CompleteAttemptStatus
}).and(ExecutionResult);
var CheckpointTypeEnum = {
  DOCKER: "DOCKER",
  KUBERNETES: "KUBERNETES"
};
var CheckpointType = external_exports.enum(Object.values(CheckpointTypeEnum));
var CheckpointInput = external_exports.object({
  type: CheckpointType,
  location: external_exports.string(),
  imageRef: external_exports.string().nullish(),
  reason: external_exports.string().nullish()
});
var TaskRunCheckpoint = CheckpointInput.merge(external_exports.object({
  id: external_exports.string(),
  friendlyId: external_exports.string()
}));
var RunExecutionData = external_exports.object({
  version: external_exports.literal("1"),
  snapshot: ExecutionSnapshot,
  run: BaseRunMetadata,
  batch: external_exports.object({
    id: external_exports.string(),
    friendlyId: external_exports.string()
  }).optional(),
  checkpoint: TaskRunCheckpoint.optional(),
  completedWaitpoints: external_exports.array(CompletedWaitpoint)
});
var CreateCheckpointResult = external_exports.discriminatedUnion("ok", [
  external_exports.object({
    ok: external_exports.literal(true),
    checkpoint: TaskRunCheckpoint
  }).merge(ExecutionResult),
  external_exports.object({
    ok: external_exports.literal(false),
    error: external_exports.string()
  })
]);
var MachineResources = external_exports.object({
  cpu: external_exports.number(),
  memory: external_exports.number()
});
var DequeueMessageCheckpoint = external_exports.object({
  id: external_exports.string(),
  type: CheckpointType,
  location: external_exports.string(),
  imageRef: external_exports.string().nullish(),
  reason: external_exports.string().nullish()
});
var PlacementTag = external_exports.object({
  key: external_exports.string(),
  values: external_exports.array(external_exports.string()).optional()
});
var DequeuedMessage = external_exports.object({
  version: external_exports.literal("1"),
  snapshot: ExecutionSnapshot,
  dequeuedAt: external_exports.coerce.date(),
  workerQueueLength: external_exports.number().optional(),
  image: external_exports.string().optional(),
  checkpoint: DequeueMessageCheckpoint.optional(),
  completedWaitpoints: external_exports.array(CompletedWaitpoint),
  backgroundWorker: external_exports.object({
    id: external_exports.string(),
    friendlyId: external_exports.string(),
    version: external_exports.string()
  }),
  deployment: external_exports.object({
    id: external_exports.string().optional(),
    friendlyId: external_exports.string().optional(),
    imagePlatform: external_exports.string().optional()
  }),
  run: external_exports.object({
    id: external_exports.string(),
    friendlyId: external_exports.string(),
    isTest: external_exports.boolean(),
    machine: MachinePreset,
    attemptNumber: external_exports.number(),
    masterQueue: external_exports.string(),
    traceContext: external_exports.record(external_exports.unknown())
  }),
  environment: external_exports.object({
    id: external_exports.string(),
    type: EnvironmentType
  }),
  organization: external_exports.object({
    id: external_exports.string()
  }),
  project: external_exports.object({
    id: external_exports.string()
  }),
  placementTags: external_exports.array(PlacementTag).optional()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/api.js
var RunEngineVersion = external_exports.union([external_exports.literal("V1"), external_exports.literal("V2")]);
var WhoAmIResponseSchema = external_exports.object({
  userId: external_exports.string(),
  email: external_exports.string().email(),
  dashboardUrl: external_exports.string(),
  project: external_exports.object({
    name: external_exports.string(),
    url: external_exports.string(),
    orgTitle: external_exports.string()
  }).optional()
});
var GetProjectResponseBody = external_exports.object({
  id: external_exports.string(),
  externalRef: external_exports.string().describe("The external reference for the project, also known as the project ref, a unique identifier starting with proj_"),
  name: external_exports.string(),
  slug: external_exports.string(),
  createdAt: external_exports.coerce.date(),
  organization: external_exports.object({
    id: external_exports.string(),
    title: external_exports.string(),
    slug: external_exports.string(),
    createdAt: external_exports.coerce.date()
  })
});
var GetProjectsResponseBody = external_exports.array(GetProjectResponseBody);
var GetOrgsResponseBody = external_exports.array(external_exports.object({
  id: external_exports.string(),
  title: external_exports.string(),
  slug: external_exports.string(),
  createdAt: external_exports.coerce.date()
}));
var CreateProjectRequestBody = external_exports.object({
  name: external_exports.string().trim().min(1, "Name is required").max(255, "Name must be less than 255 characters")
});
var GetProjectEnvResponse = external_exports.object({
  apiKey: external_exports.string(),
  name: external_exports.string(),
  apiUrl: external_exports.string(),
  projectId: external_exports.string()
});
var GetWorkerTaskResponse = external_exports.object({
  id: external_exports.string(),
  slug: external_exports.string(),
  filePath: external_exports.string(),
  triggerSource: external_exports.string(),
  createdAt: external_exports.coerce.date(),
  payloadSchema: external_exports.any().nullish()
});
var GetWorkerByTagResponse = external_exports.object({
  worker: external_exports.object({
    id: external_exports.string(),
    version: external_exports.string(),
    engine: external_exports.string().nullish(),
    sdkVersion: external_exports.string().nullish(),
    cliVersion: external_exports.string().nullish(),
    tasks: external_exports.array(GetWorkerTaskResponse)
  }),
  urls: external_exports.object({
    runs: external_exports.string()
  })
});
var GetJWTRequestBody = external_exports.object({
  claims: external_exports.object({
    scopes: external_exports.array(external_exports.string()).default([])
  }).optional(),
  expirationTime: external_exports.union([external_exports.number(), external_exports.string()]).optional()
});
var GetJWTResponse = external_exports.object({
  token: external_exports.string()
});
var CreateBackgroundWorkerRequestBody = external_exports.object({
  localOnly: external_exports.boolean(),
  metadata: BackgroundWorkerMetadata,
  engine: RunEngineVersion.optional(),
  supportsLazyAttempts: external_exports.boolean().optional(),
  buildPlatform: external_exports.string().optional(),
  targetPlatform: external_exports.string().optional()
});
var CreateBackgroundWorkerResponse = external_exports.object({
  id: external_exports.string(),
  version: external_exports.string(),
  contentHash: external_exports.string()
});
var RunTag = external_exports.string().max(128, "Tags must be less than 128 characters");
var RunTags = external_exports.union([RunTag, RunTag.array()]);
var TriggerTaskRequestBody = external_exports.object({
  payload: external_exports.any(),
  context: external_exports.any(),
  options: external_exports.object({
    /** @deprecated engine v1 only */
    dependentAttempt: external_exports.string().optional(),
    /** @deprecated engine v1 only */
    parentAttempt: external_exports.string().optional(),
    /** @deprecated engine v1 only */
    dependentBatch: external_exports.string().optional(),
    /**
     * If triggered in a batch, this is the BatchTaskRun id
     */
    parentBatch: external_exports.string().optional(),
    /**
     * RunEngine v2
     * If triggered inside another run, the parentRunId is the friendly ID of the parent run.
     */
    parentRunId: external_exports.string().optional(),
    /**
     * RunEngine v2
     * Should be `true` if `triggerAndWait` or `batchTriggerAndWait`
     */
    resumeParentOnCompletion: external_exports.boolean().optional(),
    /**
     * Locks the version to the passed value.
     * Automatically set when using `triggerAndWait` or `batchTriggerAndWait`
     */
    lockToVersion: external_exports.string().optional(),
    queue: external_exports.object({
      name: external_exports.string(),
      // @deprecated, this is now specified on the queue
      concurrencyLimit: external_exports.number().int().optional()
    }).optional(),
    concurrencyKey: external_exports.string().optional(),
    delay: external_exports.string().or(external_exports.coerce.date()).optional(),
    idempotencyKey: external_exports.string().optional(),
    idempotencyKeyTTL: external_exports.string().optional(),
    machine: MachinePresetName.optional(),
    maxAttempts: external_exports.number().int().optional(),
    maxDuration: external_exports.number().optional(),
    metadata: external_exports.any(),
    metadataType: external_exports.string().optional(),
    payloadType: external_exports.string().optional(),
    tags: RunTags.optional(),
    test: external_exports.boolean().optional(),
    ttl: external_exports.string().or(external_exports.number().nonnegative().int()).optional(),
    priority: external_exports.number().optional(),
    bulkActionId: external_exports.string().optional(),
    region: external_exports.string().optional()
  }).optional()
});
var TriggerTaskResponse = external_exports.object({
  id: external_exports.string(),
  isCached: external_exports.boolean().optional()
});
var BatchTriggerTaskRequestBody = external_exports.object({
  items: TriggerTaskRequestBody.array(),
  dependentAttempt: external_exports.string().optional()
});
var BatchTriggerTaskItem = external_exports.object({
  task: external_exports.string(),
  payload: external_exports.any(),
  context: external_exports.any(),
  options: external_exports.object({
    concurrencyKey: external_exports.string().optional(),
    delay: external_exports.string().or(external_exports.coerce.date()).optional(),
    idempotencyKey: external_exports.string().optional(),
    idempotencyKeyTTL: external_exports.string().optional(),
    lockToVersion: external_exports.string().optional(),
    machine: MachinePresetName.optional(),
    maxAttempts: external_exports.number().int().optional(),
    maxDuration: external_exports.number().optional(),
    metadata: external_exports.any(),
    metadataType: external_exports.string().optional(),
    parentAttempt: external_exports.string().optional(),
    payloadType: external_exports.string().optional(),
    queue: external_exports.object({
      name: external_exports.string()
    }).optional(),
    tags: RunTags.optional(),
    test: external_exports.boolean().optional(),
    ttl: external_exports.string().or(external_exports.number().nonnegative().int()).optional(),
    priority: external_exports.number().optional(),
    region: external_exports.string().optional()
  }).optional()
});
var BatchTriggerTaskV2RequestBody = external_exports.object({
  items: BatchTriggerTaskItem.array(),
  /** @deprecated engine v1 only */
  dependentAttempt: external_exports.string().optional(),
  /**
   * RunEngine v2
   * If triggered inside another run, the parentRunId is the friendly ID of the parent run.
   */
  parentRunId: external_exports.string().optional(),
  /**
   * RunEngine v2
   * Should be `true` if `triggerAndWait` or `batchTriggerAndWait`
   */
  resumeParentOnCompletion: external_exports.boolean().optional()
});
var BatchTriggerTaskV2Response = external_exports.object({
  id: external_exports.string(),
  isCached: external_exports.boolean(),
  idempotencyKey: external_exports.string().optional(),
  runs: external_exports.array(external_exports.object({
    id: external_exports.string(),
    taskIdentifier: external_exports.string(),
    isCached: external_exports.boolean(),
    idempotencyKey: external_exports.string().optional()
  }))
});
var BatchTriggerTaskV3RequestBody = external_exports.object({
  items: BatchTriggerTaskItem.array(),
  /**
   * RunEngine v2
   * If triggered inside another run, the parentRunId is the friendly ID of the parent run.
   */
  parentRunId: external_exports.string().optional(),
  /**
   * RunEngine v2
   * Should be `true` if `triggerAndWait` or `batchTriggerAndWait`
   */
  resumeParentOnCompletion: external_exports.boolean().optional()
});
var BatchTriggerTaskV3Response = external_exports.object({
  id: external_exports.string(),
  runCount: external_exports.number()
});
var BatchTriggerTaskResponse = external_exports.object({
  batchId: external_exports.string(),
  runs: external_exports.string().array()
});
var GetBatchResponseBody = external_exports.object({
  id: external_exports.string(),
  items: external_exports.array(external_exports.object({
    id: external_exports.string(),
    taskRunId: external_exports.string(),
    status: external_exports.enum(["PENDING", "CANCELED", "COMPLETED", "FAILED"])
  }))
});
var AddTagsRequestBody = external_exports.object({
  tags: RunTags
});
var RescheduleRunRequestBody = external_exports.object({
  delay: external_exports.string().or(external_exports.coerce.date())
});
var GetEnvironmentVariablesResponseBody = external_exports.object({
  variables: external_exports.record(external_exports.string())
});
var StartDeploymentIndexingRequestBody = external_exports.object({
  imageReference: external_exports.string(),
  selfHosted: external_exports.boolean().optional()
});
var StartDeploymentIndexingResponseBody = external_exports.object({
  id: external_exports.string(),
  contentHash: external_exports.string()
});
var FinalizeDeploymentRequestBody = external_exports.object({
  skipPromotion: external_exports.boolean().optional(),
  imageDigest: external_exports.string().optional()
});
var StartDeploymentRequestBody = external_exports.object({
  contentHash: external_exports.string().optional(),
  gitMeta: GitMeta.optional(),
  runtime: external_exports.string().optional()
});
var ExternalBuildData = external_exports.object({
  buildId: external_exports.string(),
  buildToken: external_exports.string(),
  projectId: external_exports.string()
});
var UpsertBranchRequestBody = external_exports.object({
  git: GitMeta.optional(),
  env: external_exports.enum(["preview"]),
  branch: external_exports.string()
});
var UpsertBranchResponseBody = external_exports.object({
  id: external_exports.string()
});
var InitializeDeploymentResponseBody = external_exports.object({
  id: external_exports.string(),
  contentHash: external_exports.string(),
  shortCode: external_exports.string(),
  version: external_exports.string(),
  imageTag: external_exports.string(),
  imagePlatform: external_exports.string(),
  externalBuildData: ExternalBuildData.optional().nullable()
});
var InitializeDeploymentRequestBody = external_exports.object({
  contentHash: external_exports.string(),
  userId: external_exports.string().optional(),
  /** @deprecated This is now determined by the webapp. This is only used to warn users with old CLI versions. */
  selfHosted: external_exports.boolean().optional(),
  gitMeta: GitMeta.optional(),
  type: external_exports.enum(["MANAGED", "UNMANAGED", "V1"]).optional(),
  runtime: external_exports.string().optional(),
  initialStatus: external_exports.enum(["PENDING", "BUILDING"]).optional()
});
var DeploymentErrorData = external_exports.object({
  name: external_exports.string(),
  message: external_exports.string(),
  stack: external_exports.string().optional(),
  stderr: external_exports.string().optional()
});
var FailDeploymentRequestBody = external_exports.object({
  error: DeploymentErrorData
});
var FailDeploymentResponseBody = external_exports.object({
  id: external_exports.string()
});
var PromoteDeploymentResponseBody = external_exports.object({
  id: external_exports.string(),
  version: external_exports.string(),
  shortCode: external_exports.string()
});
var GetDeploymentResponseBody = external_exports.object({
  id: external_exports.string(),
  status: external_exports.enum([
    "PENDING",
    "BUILDING",
    "DEPLOYING",
    "DEPLOYED",
    "FAILED",
    "CANCELED",
    "TIMED_OUT"
  ]),
  contentHash: external_exports.string(),
  shortCode: external_exports.string(),
  version: external_exports.string(),
  imageReference: external_exports.string().nullish(),
  imagePlatform: external_exports.string(),
  externalBuildData: ExternalBuildData.optional().nullable(),
  errorData: DeploymentErrorData.nullish(),
  worker: external_exports.object({
    id: external_exports.string(),
    version: external_exports.string(),
    tasks: external_exports.array(external_exports.object({
      id: external_exports.string(),
      slug: external_exports.string(),
      filePath: external_exports.string(),
      exportName: external_exports.string().optional()
    }))
  }).optional()
});
var GetLatestDeploymentResponseBody = GetDeploymentResponseBody.omit({
  worker: true
});
var CreateUploadPayloadUrlResponseBody = external_exports.object({
  presignedUrl: external_exports.string()
});
var WorkersListResponseBody = external_exports.object({
  type: external_exports.string(),
  name: external_exports.string(),
  description: external_exports.string().nullish(),
  latestVersion: external_exports.string().nullish(),
  lastHeartbeatAt: external_exports.string().nullish(),
  isDefault: external_exports.boolean(),
  updatedAt: external_exports.coerce.date()
}).array();
var WorkersCreateRequestBody = external_exports.object({
  name: external_exports.string().optional(),
  description: external_exports.string().optional()
});
var WorkersCreateResponseBody = external_exports.object({
  workerGroup: external_exports.object({
    name: external_exports.string(),
    description: external_exports.string().nullish()
  }),
  token: external_exports.object({
    plaintext: external_exports.string()
  })
});
var DevConfigResponseBody = external_exports.object({
  environmentId: external_exports.string(),
  dequeueIntervalWithRun: external_exports.number(),
  dequeueIntervalWithoutRun: external_exports.number(),
  maxConcurrentRuns: external_exports.number(),
  engineUrl: external_exports.string()
});
var DevDequeueRequestBody = external_exports.object({
  currentWorker: external_exports.string(),
  oldWorkers: external_exports.string().array(),
  maxResources: MachineResources.optional()
});
var DevDequeueResponseBody = external_exports.object({
  dequeuedMessages: DequeuedMessage.array()
});
var ReplayRunResponse = external_exports.object({
  id: external_exports.string()
});
var CanceledRunResponse = external_exports.object({
  id: external_exports.string()
});
var ScheduleType = external_exports.union([external_exports.literal("DECLARATIVE"), external_exports.literal("IMPERATIVE")]);
var ScheduledTaskPayload = external_exports.object({
  /** The schedule id associated with this run (you can have many schedules for the same task).
    You can use this to remove the schedule, update it, etc */
  scheduleId: external_exports.string(),
  /** The type of schedule – `"DECLARATIVE"` or `"IMPERATIVE"`.
   *
   * **DECLARATIVE** – defined inline on your `schedules.task` using the `cron` property. They can only be created, updated or deleted by modifying the `cron` property on your task.
   *
   * **IMPERATIVE** – created using the `schedules.create` functions or in the dashboard.
   */
  type: ScheduleType,
  /** When the task was scheduled to run.
   * Note this will be slightly different from `new Date()` because it takes a few ms to run the task.
   *
   * This date is UTC. To output it as a string with a timezone you would do this:
   * ```ts
   * const formatted = payload.timestamp.toLocaleString("en-US", {
        timeZone: payload.timezone,
    });
    ```  */
  timestamp: external_exports.date(),
  /** When the task was last run (it has been).
    This can be undefined if it's never been run. This date is UTC. */
  lastTimestamp: external_exports.date().optional(),
  /** You can optionally provide an external id when creating the schedule.
    Usually you would use a userId or some other unique identifier.
    This defaults to undefined if you didn't provide one. */
  externalId: external_exports.string().optional(),
  /** The IANA timezone the schedule is set to. The default is UTC.
   * You can see the full list of supported timezones here: https://cloud.trigger.dev/timezones
   */
  timezone: external_exports.string(),
  /** The next 5 dates this task is scheduled to run */
  upcoming: external_exports.array(external_exports.date())
});
var CreateScheduleOptions = external_exports.object({
  /** The id of the task you want to attach to. */
  task: external_exports.string(),
  /**  The schedule in CRON format.
     *
     * ```txt
  *    *    *    *    *    *
  ┬    ┬    ┬    ┬    ┬
  │    │    │    │    |
  │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
  │    │    │    └───── month (1 - 12)
  │    │    └────────── day of month (1 - 31, L)
  │    └─────────────── hour (0 - 23)
  └──────────────────── minute (0 - 59)
     * ```
  
  "L" means the last. In the "day of week" field, 1L means the last Monday of the month. In the day of month field, L means the last day of the month.
  
     */
  cron: external_exports.string(),
  /** You can only create one schedule with this key. If you use it twice, the second call will update the schedule.
   *
   * This is required to prevent you from creating duplicate schedules. */
  deduplicationKey: external_exports.string(),
  /** Optionally, you can specify your own IDs (like a user ID) and then use it inside the run function of your task.
   *
   * This allows you to have per-user CRON tasks.
   */
  externalId: external_exports.string().optional(),
  /** Optionally, you can specify a timezone in the IANA format. If unset it will use UTC.
   * If specified then the CRON will be evaluated in that timezone and will respect daylight savings.
   *
   * If you set the CRON to `0 0 * * *` and the timezone to `America/New_York` then the task will run at midnight in New York time, no matter whether it's daylight savings or not.
   *
   * You can see the full list of supported timezones here: https://cloud.trigger.dev/timezones
   *
   * @example "America/New_York", "Europe/London", "Asia/Tokyo", "Africa/Cairo"
   *
   */
  timezone: external_exports.string().optional()
});
var UpdateScheduleOptions = CreateScheduleOptions.omit({ deduplicationKey: true });
var ScheduleGenerator = external_exports.object({
  type: external_exports.literal("CRON"),
  expression: external_exports.string(),
  description: external_exports.string()
});
var ScheduleObject = external_exports.object({
  id: external_exports.string(),
  type: ScheduleType,
  task: external_exports.string(),
  active: external_exports.boolean(),
  deduplicationKey: external_exports.string().nullish(),
  externalId: external_exports.string().nullish(),
  generator: ScheduleGenerator,
  timezone: external_exports.string(),
  nextRun: external_exports.coerce.date().nullish(),
  environments: external_exports.array(external_exports.object({
    id: external_exports.string(),
    type: external_exports.string(),
    userName: external_exports.string().nullish()
  }))
});
var DeletedScheduleObject = external_exports.object({
  id: external_exports.string()
});
var ListSchedulesResult = external_exports.object({
  data: external_exports.array(ScheduleObject),
  pagination: external_exports.object({
    currentPage: external_exports.number(),
    totalPages: external_exports.number(),
    count: external_exports.number()
  })
});
var ListScheduleOptions = external_exports.object({
  page: external_exports.number().optional(),
  perPage: external_exports.number().optional()
});
var TimezonesResult = external_exports.object({
  timezones: external_exports.array(external_exports.string())
});
var RunStatus = external_exports.enum([
  /// Task is waiting for a version update because it cannot execute without additional information (task, queue, etc.)
  "PENDING_VERSION",
  /// Task is waiting to be executed by a worker
  "QUEUED",
  /// Task is waiting to be executed by a worker
  "DEQUEUED",
  /// Task is currently being executed by a worker
  "EXECUTING",
  /// Task has been paused by the system, and will be resumed by the system
  "WAITING",
  /// Task has been completed successfully
  "COMPLETED",
  /// Task has been canceled by the user
  "CANCELED",
  /// Task has been completed with errors
  "FAILED",
  /// Task has crashed and won't be retried, most likely the worker ran out of resources, e.g. memory or storage
  "CRASHED",
  /// Task has failed to complete, due to an error in the system
  "SYSTEM_FAILURE",
  /// Task has been scheduled to run at a specific time
  "DELAYED",
  /// Task has expired and won't be executed
  "EXPIRED",
  /// Task has reached it's maxDuration and has been stopped
  "TIMED_OUT"
]);
var AttemptStatus = external_exports.enum([
  "PENDING",
  "EXECUTING",
  "PAUSED",
  "COMPLETED",
  "FAILED",
  "CANCELED"
]);
var RunEnvironmentDetails = external_exports.object({
  id: external_exports.string(),
  name: external_exports.string(),
  user: external_exports.string().optional()
});
var RunScheduleDetails = external_exports.object({
  id: external_exports.string(),
  externalId: external_exports.string().optional(),
  deduplicationKey: external_exports.string().optional(),
  generator: ScheduleGenerator
});
var TriggerFunction = external_exports.enum([
  "triggerAndWait",
  "trigger",
  "batchTriggerAndWait",
  "batchTrigger"
]);
var CommonRunFields = {
  id: external_exports.string(),
  status: RunStatus,
  taskIdentifier: external_exports.string(),
  idempotencyKey: external_exports.string().optional(),
  version: external_exports.string().optional(),
  isQueued: external_exports.boolean(),
  isExecuting: external_exports.boolean(),
  isWaiting: external_exports.boolean(),
  isCompleted: external_exports.boolean(),
  isSuccess: external_exports.boolean(),
  isFailed: external_exports.boolean(),
  isCancelled: external_exports.boolean(),
  isTest: external_exports.boolean(),
  createdAt: external_exports.coerce.date(),
  updatedAt: external_exports.coerce.date(),
  startedAt: external_exports.coerce.date().optional(),
  finishedAt: external_exports.coerce.date().optional(),
  delayedUntil: external_exports.coerce.date().optional(),
  ttl: external_exports.string().optional(),
  expiredAt: external_exports.coerce.date().optional(),
  tags: external_exports.string().array(),
  costInCents: external_exports.number(),
  baseCostInCents: external_exports.number(),
  durationMs: external_exports.number(),
  metadata: external_exports.record(external_exports.any()).optional()
};
var RetrieveRunCommandFields = {
  ...CommonRunFields,
  depth: external_exports.number(),
  triggerFunction: external_exports.enum(["triggerAndWait", "trigger", "batchTriggerAndWait", "batchTrigger"]),
  batchId: external_exports.string().optional()
};
var RelatedRunDetails = external_exports.object(RetrieveRunCommandFields);
var RetrieveRunResponse = external_exports.object({
  ...RetrieveRunCommandFields,
  payload: external_exports.any().optional(),
  payloadPresignedUrl: external_exports.string().optional(),
  output: external_exports.any().optional(),
  outputPresignedUrl: external_exports.string().optional(),
  error: SerializedError.optional(),
  schedule: RunScheduleDetails.optional(),
  relatedRuns: external_exports.object({
    root: RelatedRunDetails.optional(),
    parent: RelatedRunDetails.optional(),
    children: external_exports.array(RelatedRunDetails).optional()
  }),
  attemptCount: external_exports.number().default(0)
});
var ListRunResponseItem = external_exports.object({
  ...CommonRunFields,
  env: RunEnvironmentDetails
});
var ListRunResponse = external_exports.object({
  data: external_exports.array(ListRunResponseItem),
  pagination: external_exports.object({
    next: external_exports.string().optional(),
    previous: external_exports.string().optional()
  })
});
var CreateEnvironmentVariableRequestBody = external_exports.object({
  name: external_exports.string(),
  value: external_exports.string()
});
var UpdateEnvironmentVariableRequestBody = external_exports.object({
  value: external_exports.string()
});
var ImportEnvironmentVariablesRequestBody = external_exports.object({
  variables: external_exports.record(external_exports.string()),
  parentVariables: external_exports.record(external_exports.string()).optional(),
  override: external_exports.boolean().optional()
});
var EnvironmentVariableResponseBody = external_exports.object({
  success: external_exports.boolean()
});
var EnvironmentVariableValue = external_exports.object({
  value: external_exports.string()
});
var EnvironmentVariable = external_exports.object({
  name: external_exports.string(),
  value: external_exports.string()
});
var EnvironmentVariables = external_exports.array(EnvironmentVariable);
var EnvironmentVariableWithSecret = external_exports.object({
  /** The name of the env var, e.g. `DATABASE_URL` */
  name: external_exports.string(),
  /** The value of the env var. If it's a secret, this will be a redacted value, not the real value.  */
  value: external_exports.string(),
  /**
   * Whether the env var is a secret or not.
   * When you create env vars you can mark them as secrets.
   *
   * You can't view the value of a secret env var after setting it initially.
   * For a secret env var, the value will be redacted.
   */
  isSecret: external_exports.boolean()
});
var UpdateMetadataResponseBody = external_exports.object({
  metadata: external_exports.record(DeserializedJsonSchema)
});
var RawShapeDate = external_exports.string().transform((val) => `${val}Z`).pipe(external_exports.coerce.date());
var RawOptionalShapeDate = external_exports.string().nullish().transform((val) => val ? /* @__PURE__ */ new Date(`${val}Z`) : val);
var SubscribeRunRawShape = external_exports.object({
  id: external_exports.string(),
  taskIdentifier: external_exports.string(),
  friendlyId: external_exports.string(),
  status: external_exports.string(),
  createdAt: RawShapeDate,
  updatedAt: RawShapeDate,
  startedAt: RawOptionalShapeDate,
  delayUntil: RawOptionalShapeDate,
  queuedAt: RawOptionalShapeDate,
  expiredAt: RawOptionalShapeDate,
  completedAt: RawOptionalShapeDate,
  idempotencyKey: external_exports.string().nullish(),
  number: external_exports.number().default(0),
  isTest: external_exports.boolean().default(false),
  usageDurationMs: external_exports.number().default(0),
  costInCents: external_exports.number().default(0),
  baseCostInCents: external_exports.number().default(0),
  ttl: external_exports.string().nullish(),
  payload: external_exports.string().nullish(),
  payloadType: external_exports.string().nullish(),
  metadata: external_exports.string().nullish(),
  metadataType: external_exports.string().nullish(),
  output: external_exports.string().nullish(),
  outputType: external_exports.string().nullish(),
  runTags: external_exports.array(external_exports.string()).nullish().default([]),
  error: TaskRunError.nullish()
});
var BatchStatus = external_exports.enum(["PENDING", "COMPLETED"]);
var RetrieveBatchResponse = external_exports.object({
  id: external_exports.string(),
  status: BatchStatus,
  idempotencyKey: external_exports.string().optional(),
  createdAt: external_exports.coerce.date(),
  updatedAt: external_exports.coerce.date(),
  runCount: external_exports.number(),
  runs: external_exports.array(external_exports.string())
});
var RetrieveBatchV2Response = external_exports.object({
  id: external_exports.string(),
  status: BatchStatus,
  idempotencyKey: external_exports.string().optional(),
  createdAt: external_exports.coerce.date(),
  updatedAt: external_exports.coerce.date(),
  runCount: external_exports.number(),
  runs: external_exports.array(external_exports.string())
});
var SubscribeRealtimeStreamChunkRawShape = external_exports.object({
  id: external_exports.string(),
  runId: external_exports.string(),
  sequence: external_exports.number(),
  key: external_exports.string(),
  value: external_exports.string(),
  createdAt: external_exports.coerce.date()
});
var TimePeriod = external_exports.string().or(external_exports.coerce.date());
var CreateWaitpointTokenRequestBody = external_exports.object({
  /**
   * An optional idempotency key for the waitpoint.
   * If you use the same key twice (and the key hasn't expired), you will get the original waitpoint back.
   *
   * Note: This waitpoint may already be complete, in which case when you wait for it, it will immediately continue.
   */
  idempotencyKey: external_exports.string().optional(),
  /**
   * When set, this means the passed in idempotency key will expire after this time.
   * This means after that time if you pass the same idempotency key again, you will get a new waitpoint.
   */
  idempotencyKeyTTL: external_exports.string().optional(),
  /** The resume token will timeout after this time.
   * If you are waiting for the token in a run, the token will return a result where `ok` is false.
   *
   * You can pass a `Date` object, or a string in this format: "30s", "1m", "2h", "3d", "4w".
   */
  timeout: TimePeriod.optional(),
  /**
   * Tags to attach to the waitpoint. Tags can be used to filter waitpoints in the dashboard.
   *
   * You can set up to 10 tags per waitpoint, they must be less than 128 characters each.
   *
   * We recommend prefixing tags with a namespace using an underscore or colon, like `user_1234567` or `org:9876543`.
   *
   * @example
   *
   * ```ts
   * await wait.createToken({ tags: ["user:1234567", "org:9876543"] });
   * ```
   */
  tags: RunTags.optional()
});
var CreateWaitpointTokenResponseBody = external_exports.object({
  id: external_exports.string(),
  isCached: external_exports.boolean(),
  url: external_exports.string()
});
var waitpointTokenStatuses = ["WAITING", "COMPLETED", "TIMED_OUT"];
var WaitpointTokenStatus = external_exports.enum(waitpointTokenStatuses);
var WaitpointTokenItem = external_exports.object({
  id: external_exports.string(),
  /** If you make a POST request to this URL, it will complete the waitpoint. */
  url: external_exports.string(),
  status: WaitpointTokenStatus,
  completedAt: external_exports.coerce.date().optional(),
  completedAfter: external_exports.coerce.date().optional(),
  timeoutAt: external_exports.coerce.date().optional(),
  idempotencyKey: external_exports.string().optional(),
  idempotencyKeyExpiresAt: external_exports.coerce.date().optional(),
  tags: external_exports.array(external_exports.string()),
  createdAt: external_exports.coerce.date()
});
var WaitpointListTokenItem = WaitpointTokenItem.omit({
  completedAfter: true
});
var WaitpointRetrieveTokenResponse = WaitpointListTokenItem.and(external_exports.object({
  output: external_exports.string().optional(),
  outputType: external_exports.string().optional(),
  outputIsError: external_exports.boolean().optional()
}));
var CompleteWaitpointTokenRequestBody = external_exports.object({
  data: external_exports.any().nullish()
});
var CompleteWaitpointTokenResponseBody = external_exports.object({
  success: external_exports.literal(true)
});
var WaitForWaitpointTokenResponseBody = external_exports.object({
  success: external_exports.boolean()
});
var WaitForDurationRequestBody = external_exports.object({
  /**
   * An optional idempotency key for the waitpoint.
   * If you use the same key twice (and the key hasn't expired), you will get the original waitpoint back.
   *
   * Note: This waitpoint may already be complete, in which case when you wait for it, it will immediately continue.
   */
  idempotencyKey: external_exports.string().optional(),
  /**
   * When set, this means the passed in idempotency key will expire after this time.
   * This means after that time if you pass the same idempotency key again, you will get a new waitpoint.
   */
  idempotencyKeyTTL: external_exports.string().optional(),
  /**
   * The date that the waitpoint will complete.
   */
  date: external_exports.coerce.date()
});
var WaitForDurationResponseBody = external_exports.object({
  /**
      If you pass an idempotencyKey, you may actually not need to wait.
      Use this date to determine when to continue.
  */
  waitUntil: external_exports.coerce.date(),
  waitpoint: external_exports.object({
    id: external_exports.string()
  })
});
var ApiDeploymentCommonShape = {
  from: external_exports.string().describe("The date to start the search from, in ISO 8601 format").optional(),
  to: external_exports.string().describe("The date to end the search, in ISO 8601 format").optional(),
  period: external_exports.string().describe("The period to search within (e.g. 1d, 7d, 3h, etc.)").optional(),
  status: external_exports.enum(["PENDING", "BUILDING", "DEPLOYING", "DEPLOYED", "FAILED", "CANCELED", "TIMED_OUT"]).describe("Filter deployments that are in this status").optional()
};
var ApiDeploymentListPaginationCursor = external_exports.string().describe("The deployment ID to start the search from, to get the next page").optional();
var ApiDeploymentListPaginationLimit = external_exports.coerce.number().describe("The number of deployments to return, defaults to 20 (max 100)").min(1, "Limit must be at least 1").max(100, "Limit must be less than 100").optional();
var ApiDeploymentListParams = {
  ...ApiDeploymentCommonShape,
  cursor: ApiDeploymentListPaginationCursor,
  limit: ApiDeploymentListPaginationLimit
};
var ApiDeploymentListOptions = external_exports.object(ApiDeploymentListParams);
var ApiDeploymentListSearchParams = external_exports.object({
  ...ApiDeploymentCommonShape,
  "page[after]": ApiDeploymentListPaginationCursor,
  "page[size]": ApiDeploymentListPaginationLimit
});
var ApiDeploymentListResponseItem = external_exports.object({
  id: external_exports.string(),
  createdAt: external_exports.coerce.date(),
  shortCode: external_exports.string(),
  version: external_exports.string(),
  runtime: external_exports.string(),
  runtimeVersion: external_exports.string(),
  status: external_exports.enum([
    "PENDING",
    "BUILDING",
    "DEPLOYING",
    "DEPLOYED",
    "FAILED",
    "CANCELED",
    "TIMED_OUT"
  ]),
  deployedAt: external_exports.coerce.date().optional(),
  git: external_exports.record(external_exports.any()).optional(),
  error: DeploymentErrorData.optional()
});
var ApiBranchListResponseBody = external_exports.object({
  branches: external_exports.array(external_exports.object({
    id: external_exports.string(),
    name: external_exports.string(),
    createdAt: external_exports.coerce.date(),
    updatedAt: external_exports.coerce.date(),
    git: external_exports.record(external_exports.any()).optional(),
    isPaused: external_exports.boolean()
  }))
});
var RetrieveRunTraceSpanSchema = external_exports.object({
  id: external_exports.string(),
  parentId: external_exports.string().optional(),
  message: external_exports.string(),
  data: external_exports.object({
    runId: external_exports.string(),
    taskSlug: external_exports.string().optional(),
    taskPath: external_exports.string().optional(),
    events: external_exports.array(external_exports.any()).optional(),
    startTime: external_exports.coerce.date(),
    duration: external_exports.number(),
    isError: external_exports.boolean(),
    isPartial: external_exports.boolean(),
    isCancelled: external_exports.boolean(),
    level: external_exports.string(),
    environmentType: external_exports.string(),
    workerVersion: external_exports.string().optional(),
    queueName: external_exports.string().optional(),
    machinePreset: external_exports.string().optional(),
    properties: external_exports.record(external_exports.any()).optional(),
    output: external_exports.unknown().optional()
  })
});
var RetrieveRunTraceSpan = RetrieveRunTraceSpanSchema.extend({
  children: external_exports.lazy(() => RetrieveRunTraceSpan.array())
});
var RetrieveRunTraceResponseBody = external_exports.object({
  trace: external_exports.object({
    traceId: external_exports.string(),
    rootSpan: RetrieveRunTraceSpan
  })
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/messages.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/build.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/config.js
init_esm();
var ConfigManifest = external_exports.object({
  project: external_exports.string(),
  dirs: external_exports.string().array()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/build.js
var BuildExternal = external_exports.object({
  name: external_exports.string(),
  version: external_exports.string()
});
var BuildTarget = external_exports.enum(["dev", "deploy", "unmanaged"]);
var BuildRuntime = external_exports.enum(["node", "node-22", "bun"]);
var BuildManifest = external_exports.object({
  target: BuildTarget,
  packageVersion: external_exports.string(),
  cliPackageVersion: external_exports.string(),
  contentHash: external_exports.string(),
  runtime: BuildRuntime,
  environment: external_exports.string(),
  branch: external_exports.string().optional(),
  config: ConfigManifest,
  files: external_exports.array(TaskFile),
  sources: external_exports.record(external_exports.object({
    contents: external_exports.string(),
    contentHash: external_exports.string()
  })),
  outputPath: external_exports.string(),
  runWorkerEntryPoint: external_exports.string(),
  // Dev & Deploy has a runWorkerEntryPoint
  runControllerEntryPoint: external_exports.string().optional(),
  // Only deploy has a runControllerEntryPoint
  indexWorkerEntryPoint: external_exports.string(),
  // Dev & Deploy has a indexWorkerEntryPoint
  indexControllerEntryPoint: external_exports.string().optional(),
  // Only deploy has a indexControllerEntryPoint
  loaderEntryPoint: external_exports.string().optional(),
  initEntryPoint: external_exports.string().optional(),
  // Optional init.ts entry point
  configPath: external_exports.string(),
  externals: BuildExternal.array().optional(),
  build: external_exports.object({
    env: external_exports.record(external_exports.string()).optional(),
    commands: external_exports.array(external_exports.string()).optional()
  }),
  customConditions: external_exports.array(external_exports.string()).optional(),
  deploy: external_exports.object({
    env: external_exports.record(external_exports.string()).optional(),
    sync: external_exports.object({
      env: external_exports.record(external_exports.string()).optional(),
      parentEnv: external_exports.record(external_exports.string()).optional()
    }).optional()
  }),
  image: external_exports.object({
    pkgs: external_exports.array(external_exports.string()).optional(),
    instructions: external_exports.array(external_exports.string()).optional()
  }).optional(),
  otelImportHook: external_exports.object({
    include: external_exports.array(external_exports.string()).optional(),
    exclude: external_exports.array(external_exports.string()).optional()
  }).optional()
});
var IndexMessage = external_exports.object({
  type: external_exports.literal("index"),
  data: external_exports.object({
    build: BuildManifest
  })
});
var WorkerManifest = external_exports.object({
  configPath: external_exports.string(),
  tasks: TaskManifest.array(),
  queues: QueueManifest.array().optional(),
  workerEntryPoint: external_exports.string(),
  controllerEntryPoint: external_exports.string().optional(),
  loaderEntryPoint: external_exports.string().optional(),
  initEntryPoint: external_exports.string().optional(),
  // Optional init.ts entry point
  runtime: BuildRuntime,
  runtimeVersion: external_exports.string().optional(),
  customConditions: external_exports.array(external_exports.string()).optional(),
  timings: external_exports.record(external_exports.number()).optional(),
  processKeepAlive: external_exports.object({
    enabled: external_exports.boolean(),
    maxExecutionsPerProcess: external_exports.number().int().positive().optional()
  }).optional(),
  otelImportHook: external_exports.object({
    include: external_exports.array(external_exports.string()).optional(),
    exclude: external_exports.array(external_exports.string()).optional()
  }).optional()
});
var WorkerManifestMessage = external_exports.object({
  type: external_exports.literal("worker-manifest"),
  data: external_exports.object({
    manifest: WorkerManifest
  })
});
var ImportError = external_exports.object({
  message: external_exports.string(),
  file: external_exports.string(),
  stack: external_exports.string().optional(),
  name: external_exports.string().optional()
});
var ImportTaskFileErrors = external_exports.array(ImportError);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runEngineWorker/supervisor/schemas.js
init_esm();
var WorkerApiHeartbeatRequestBody = external_exports.object({
  cpu: external_exports.object({
    used: external_exports.number(),
    available: external_exports.number()
  }),
  memory: external_exports.object({
    used: external_exports.number(),
    available: external_exports.number()
  }),
  tasks: external_exports.array(external_exports.string())
});
var WorkerApiHeartbeatResponseBody = external_exports.object({
  ok: external_exports.literal(true)
});
var WorkerApiSuspendRunRequestBody = external_exports.discriminatedUnion("success", [
  external_exports.object({
    success: external_exports.literal(true),
    checkpoint: CheckpointInput
  }),
  external_exports.object({
    success: external_exports.literal(false),
    error: external_exports.string()
  })
]);
var WorkerApiSuspendRunResponseBody = external_exports.object({
  ok: external_exports.literal(true)
});
var WorkerApiConnectRequestBody = external_exports.object({
  metadata: external_exports.record(external_exports.any())
});
var WorkerApiConnectResponseBody = external_exports.object({
  ok: external_exports.literal(true),
  workerGroup: external_exports.object({
    type: external_exports.string(),
    name: external_exports.string()
  })
});
var WorkerApiDequeueRequestBody = external_exports.object({
  maxResources: MachineResources.optional(),
  maxRunCount: external_exports.number().optional()
});
var WorkerApiDequeueResponseBody = DequeuedMessage.array();
var WorkerApiRunHeartbeatRequestBody = external_exports.object({
  cpu: external_exports.number().optional(),
  memory: external_exports.number().optional()
});
var WorkerApiRunHeartbeatResponseBody = external_exports.object({
  ok: external_exports.literal(true)
});
var WorkerApiRunAttemptStartRequestBody = external_exports.object({
  isWarmStart: external_exports.boolean().optional()
});
var WorkerApiRunAttemptStartResponseBody = StartRunAttemptResult.and(external_exports.object({
  envVars: external_exports.record(external_exports.string())
}));
var WorkerApiRunAttemptCompleteRequestBody = external_exports.object({
  completion: TaskRunExecutionResult
});
var WorkerApiRunAttemptCompleteResponseBody = external_exports.object({
  result: CompleteRunAttemptResult
});
var WorkerApiRunLatestSnapshotResponseBody = external_exports.object({
  execution: RunExecutionData
});
var WorkerApiDequeueFromVersionResponseBody = DequeuedMessage.array();
var DebugLogPropertiesValue = external_exports.union([
  external_exports.string(),
  external_exports.number(),
  external_exports.boolean(),
  external_exports.array(external_exports.string().nullish()),
  external_exports.array(external_exports.number().nullish()),
  external_exports.array(external_exports.boolean().nullish())
]);
var DebugLogProperties = external_exports.record(external_exports.string(), DebugLogPropertiesValue.optional());
var DebugLogPropertiesInput = external_exports.record(external_exports.string(), external_exports.unknown());
var WorkerApiDebugLogBodyInput = external_exports.object({
  time: external_exports.coerce.date(),
  message: external_exports.string(),
  properties: DebugLogPropertiesInput.optional()
});
var WorkerApiDebugLogBody = external_exports.object({
  time: external_exports.coerce.date(),
  message: external_exports.string(),
  properties: DebugLogProperties.optional()
});
var WorkerApiSuspendCompletionResponseBody = external_exports.object({
  success: external_exports.boolean(),
  error: external_exports.string().optional()
});
var WorkerApiRunSnapshotsSinceResponseBody = external_exports.object({
  snapshots: external_exports.array(RunExecutionData)
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/messages.js
var AckCallbackResult = external_exports.discriminatedUnion("success", [
  external_exports.object({
    success: external_exports.literal(false),
    error: external_exports.object({
      name: external_exports.string(),
      message: external_exports.string(),
      stack: external_exports.string().optional(),
      stderr: external_exports.string().optional()
    })
  }),
  external_exports.object({
    success: external_exports.literal(true)
  })
]);
var BackgroundWorkerServerMessages = external_exports.discriminatedUnion("type", [
  external_exports.object({
    type: external_exports.literal("CANCEL_ATTEMPT"),
    taskAttemptId: external_exports.string(),
    taskRunId: external_exports.string()
  }),
  external_exports.object({
    type: external_exports.literal("SCHEDULE_ATTEMPT"),
    image: external_exports.string(),
    version: external_exports.string(),
    machine: MachinePreset,
    nextAttemptNumber: external_exports.number().optional(),
    // identifiers
    id: external_exports.string().optional(),
    // TODO: Remove this completely in a future release
    envId: external_exports.string(),
    envType: EnvironmentType,
    orgId: external_exports.string(),
    projectId: external_exports.string(),
    runId: external_exports.string(),
    dequeuedAt: external_exports.number().optional()
  }),
  external_exports.object({
    type: external_exports.literal("EXECUTE_RUN_LAZY_ATTEMPT"),
    payload: TaskRunExecutionLazyAttemptPayload
  })
]);
var serverWebsocketMessages = {
  SERVER_READY: external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    id: external_exports.string()
  }),
  BACKGROUND_WORKER_MESSAGE: external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    backgroundWorkerId: external_exports.string(),
    data: BackgroundWorkerServerMessages
  })
};
var BackgroundWorkerClientMessages = external_exports.discriminatedUnion("type", [
  external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    type: external_exports.literal("TASK_RUN_COMPLETED"),
    completion: TaskRunExecutionResult,
    execution: V3TaskRunExecution
  }),
  external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    type: external_exports.literal("TASK_RUN_FAILED_TO_RUN"),
    completion: TaskRunFailedExecutionResult
  }),
  external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    type: external_exports.literal("TASK_HEARTBEAT"),
    id: external_exports.string()
  }),
  external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    type: external_exports.literal("TASK_RUN_HEARTBEAT"),
    id: external_exports.string()
  })
]);
var ServerBackgroundWorker = external_exports.object({
  id: external_exports.string(),
  version: external_exports.string(),
  contentHash: external_exports.string(),
  engine: RunEngineVersionSchema.optional()
});
var clientWebsocketMessages = {
  READY_FOR_TASKS: external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    backgroundWorkerId: external_exports.string(),
    inProgressRuns: external_exports.string().array().optional()
  }),
  BACKGROUND_WORKER_DEPRECATED: external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    backgroundWorkerId: external_exports.string()
  }),
  BACKGROUND_WORKER_MESSAGE: external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    backgroundWorkerId: external_exports.string(),
    data: BackgroundWorkerClientMessages
  })
};
var UncaughtExceptionMessage = external_exports.object({
  version: external_exports.literal("v1").default("v1"),
  error: external_exports.object({
    name: external_exports.string(),
    message: external_exports.string(),
    stack: external_exports.string().optional()
  }),
  origin: external_exports.enum(["uncaughtException", "unhandledRejection"])
});
var TaskMetadataFailedToParseData = external_exports.object({
  version: external_exports.literal("v1").default("v1"),
  tasks: external_exports.unknown(),
  zodIssues: external_exports.custom((v) => {
    return Array.isArray(v) && v.every((issue) => typeof issue === "object" && "message" in issue);
  })
});
var indexerToWorkerMessages = {
  INDEX_COMPLETE: external_exports.object({
    version: external_exports.literal("v1").default("v1"),
    manifest: WorkerManifest,
    importErrors: ImportTaskFileErrors
  }),
  TASKS_FAILED_TO_PARSE: TaskMetadataFailedToParseData,
  UNCAUGHT_EXCEPTION: UncaughtExceptionMessage
};
var ExecutorToWorkerMessageCatalog = {
  TASK_RUN_COMPLETED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      execution: TaskRunExecution,
      result: TaskRunExecutionResult
    })
  },
  TASK_HEARTBEAT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      id: external_exports.string()
    })
  },
  UNCAUGHT_EXCEPTION: {
    message: UncaughtExceptionMessage
  },
  SEND_DEBUG_LOG: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      message: external_exports.string(),
      properties: DebugLogPropertiesInput.optional()
    })
  },
  SET_SUSPENDABLE: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      suspendable: external_exports.boolean()
    })
  }
};
var WorkerToExecutorMessageCatalog = {
  EXECUTE_TASK_RUN: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      execution: TaskRunExecution,
      traceContext: external_exports.record(external_exports.unknown()),
      metadata: ServerBackgroundWorker,
      metrics: TaskRunExecutionMetrics.optional(),
      env: external_exports.record(external_exports.string()).optional(),
      isWarmStart: external_exports.boolean().optional()
    })
  },
  FLUSH: {
    message: external_exports.object({
      timeoutInMs: external_exports.number()
    }),
    callback: external_exports.void()
  },
  CANCEL: {
    message: external_exports.object({
      timeoutInMs: external_exports.number()
    }),
    callback: external_exports.void()
  },
  RESOLVE_WAITPOINT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      waitpoint: CompletedWaitpoint
    })
  }
};
var ProviderToPlatformMessages = {
  LOG: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      data: external_exports.string()
    })
  },
  LOG_WITH_ACK: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      data: external_exports.string()
    }),
    callback: external_exports.object({
      status: external_exports.literal("ok")
    })
  },
  WORKER_CRASHED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      reason: external_exports.string().optional(),
      exitCode: external_exports.number().optional(),
      message: external_exports.string().optional(),
      logs: external_exports.string().optional(),
      /** This means we should only update the error if one exists */
      overrideCompletion: external_exports.boolean().optional(),
      errorCode: TaskRunInternalError.shape.code.optional()
    })
  },
  INDEXING_FAILED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      deploymentId: external_exports.string(),
      error: external_exports.object({
        name: external_exports.string(),
        message: external_exports.string(),
        stack: external_exports.string().optional(),
        stderr: external_exports.string().optional()
      }),
      overrideCompletion: external_exports.boolean().optional()
    })
  }
};
var PlatformToProviderMessages = {
  INDEX: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      imageTag: external_exports.string(),
      shortCode: external_exports.string(),
      apiKey: external_exports.string(),
      apiUrl: external_exports.string(),
      // identifiers
      envId: external_exports.string(),
      envType: EnvironmentType,
      orgId: external_exports.string(),
      projectId: external_exports.string(),
      deploymentId: external_exports.string()
    }),
    callback: AckCallbackResult
  },
  RESTORE: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      type: external_exports.enum(["DOCKER", "KUBERNETES"]),
      location: external_exports.string(),
      reason: external_exports.string().optional(),
      imageRef: external_exports.string(),
      attemptNumber: external_exports.number().optional(),
      machine: MachinePreset,
      // identifiers
      checkpointId: external_exports.string(),
      envId: external_exports.string(),
      envType: EnvironmentType,
      orgId: external_exports.string(),
      projectId: external_exports.string(),
      runId: external_exports.string()
    })
  },
  PRE_PULL_DEPLOYMENT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      imageRef: external_exports.string(),
      shortCode: external_exports.string(),
      // identifiers
      envId: external_exports.string(),
      envType: EnvironmentType,
      orgId: external_exports.string(),
      projectId: external_exports.string(),
      deploymentId: external_exports.string()
    })
  }
};
var CreateWorkerMessage = external_exports.object({
  projectRef: external_exports.string(),
  envId: external_exports.string(),
  deploymentId: external_exports.string(),
  metadata: external_exports.object({
    cliPackageVersion: external_exports.string().optional(),
    contentHash: external_exports.string(),
    packageVersion: external_exports.string(),
    tasks: TaskResource.array()
  })
});
var CoordinatorToPlatformMessages = {
  LOG: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      metadata: external_exports.any(),
      text: external_exports.string()
    })
  },
  CREATE_WORKER: {
    message: external_exports.discriminatedUnion("version", [
      CreateWorkerMessage.extend({
        version: external_exports.literal("v1")
      }),
      CreateWorkerMessage.extend({
        version: external_exports.literal("v2"),
        supportsLazyAttempts: external_exports.boolean()
      })
    ]),
    callback: external_exports.discriminatedUnion("success", [
      external_exports.object({
        success: external_exports.literal(false)
      }),
      external_exports.object({
        success: external_exports.literal(true)
      })
    ])
  },
  CREATE_TASK_RUN_ATTEMPT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      envId: external_exports.string()
    }),
    callback: external_exports.discriminatedUnion("success", [
      external_exports.object({
        success: external_exports.literal(false),
        reason: external_exports.string().optional()
      }),
      external_exports.object({
        success: external_exports.literal(true),
        executionPayload: V3ProdTaskRunExecutionPayload
      })
    ])
  },
  // Deprecated: Only workers without lazy attempt support will use this
  READY_FOR_EXECUTION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      totalCompletions: external_exports.number()
    }),
    callback: external_exports.discriminatedUnion("success", [
      external_exports.object({
        success: external_exports.literal(false)
      }),
      external_exports.object({
        success: external_exports.literal(true),
        payload: V3ProdTaskRunExecutionPayload
      })
    ])
  },
  READY_FOR_LAZY_ATTEMPT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      envId: external_exports.string(),
      totalCompletions: external_exports.number()
    }),
    callback: external_exports.discriminatedUnion("success", [
      external_exports.object({
        success: external_exports.literal(false),
        reason: external_exports.string().optional()
      }),
      external_exports.object({
        success: external_exports.literal(true),
        lazyPayload: TaskRunExecutionLazyAttemptPayload
      })
    ])
  },
  READY_FOR_RESUME: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptFriendlyId: external_exports.string(),
      type: WaitReason
    })
  },
  TASK_RUN_COMPLETED: {
    message: external_exports.object({
      version: external_exports.enum(["v1", "v2"]).default("v1"),
      execution: V3ProdTaskRunExecution,
      completion: TaskRunExecutionResult,
      checkpoint: external_exports.object({
        docker: external_exports.boolean(),
        location: external_exports.string()
      }).optional()
    })
  },
  TASK_RUN_COMPLETED_WITH_ACK: {
    message: external_exports.object({
      version: external_exports.enum(["v1", "v2"]).default("v2"),
      execution: V3ProdTaskRunExecution,
      completion: TaskRunExecutionResult,
      checkpoint: external_exports.object({
        docker: external_exports.boolean(),
        location: external_exports.string()
      }).optional()
    }),
    callback: AckCallbackResult
  },
  TASK_RUN_FAILED_TO_RUN: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      completion: TaskRunFailedExecutionResult
    })
  },
  TASK_HEARTBEAT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptFriendlyId: external_exports.string()
    })
  },
  TASK_RUN_HEARTBEAT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string()
    })
  },
  CHECKPOINT_CREATED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string().optional(),
      attemptFriendlyId: external_exports.string(),
      docker: external_exports.boolean(),
      location: external_exports.string(),
      reason: external_exports.discriminatedUnion("type", [
        external_exports.object({
          type: external_exports.literal("WAIT_FOR_DURATION"),
          ms: external_exports.number(),
          now: external_exports.number()
        }),
        external_exports.object({
          type: external_exports.literal("WAIT_FOR_BATCH"),
          batchFriendlyId: external_exports.string(),
          runFriendlyIds: external_exports.string().array()
        }),
        external_exports.object({
          type: external_exports.literal("WAIT_FOR_TASK"),
          friendlyId: external_exports.string()
        }),
        external_exports.object({
          type: external_exports.literal("RETRYING_AFTER_FAILURE"),
          attemptNumber: external_exports.number()
        }),
        external_exports.object({
          type: external_exports.literal("MANUAL"),
          /** If unspecified it will be restored immediately, e.g. for live migration */
          restoreAtUnixTimeMs: external_exports.number().optional()
        })
      ])
    }),
    callback: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      keepRunAlive: external_exports.boolean()
    })
  },
  INDEXING_FAILED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      deploymentId: external_exports.string(),
      error: external_exports.object({
        name: external_exports.string(),
        message: external_exports.string(),
        stack: external_exports.string().optional(),
        stderr: external_exports.string().optional()
      })
    })
  },
  RUN_CRASHED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      error: external_exports.object({
        name: external_exports.string(),
        message: external_exports.string(),
        stack: external_exports.string().optional()
      })
    })
  }
};
var PlatformToCoordinatorMessages = {
  /** @deprecated use RESUME_AFTER_DEPENDENCY_WITH_ACK instead  */
  RESUME_AFTER_DEPENDENCY: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      attemptId: external_exports.string(),
      attemptFriendlyId: external_exports.string(),
      completions: TaskRunExecutionResult.array(),
      executions: TaskRunExecution.array()
    })
  },
  RESUME_AFTER_DEPENDENCY_WITH_ACK: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      attemptId: external_exports.string(),
      attemptFriendlyId: external_exports.string(),
      completions: TaskRunExecutionResult.array(),
      executions: TaskRunExecution.array()
    }),
    callback: AckCallbackResult
  },
  RESUME_AFTER_DURATION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptId: external_exports.string(),
      attemptFriendlyId: external_exports.string()
    })
  },
  REQUEST_ATTEMPT_CANCELLATION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptId: external_exports.string(),
      attemptFriendlyId: external_exports.string()
    })
  },
  REQUEST_RUN_CANCELLATION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      delayInMs: external_exports.number().optional()
    })
  },
  READY_FOR_RETRY: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string()
    })
  },
  DYNAMIC_CONFIG: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      checkpointThresholdInMs: external_exports.number()
    })
  }
};
var ClientToSharedQueueMessages = {
  READY_FOR_TASKS: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      backgroundWorkerId: external_exports.string()
    })
  },
  BACKGROUND_WORKER_DEPRECATED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      backgroundWorkerId: external_exports.string()
    })
  },
  BACKGROUND_WORKER_MESSAGE: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      backgroundWorkerId: external_exports.string(),
      data: BackgroundWorkerClientMessages
    })
  }
};
var SharedQueueToClientMessages = {
  SERVER_READY: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      id: external_exports.string()
    })
  },
  BACKGROUND_WORKER_MESSAGE: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      backgroundWorkerId: external_exports.string(),
      data: BackgroundWorkerServerMessages
    })
  }
};
var IndexTasksMessage = external_exports.object({
  version: external_exports.literal("v1"),
  deploymentId: external_exports.string(),
  tasks: TaskResource.array(),
  packageVersion: external_exports.string()
});
var ProdWorkerToCoordinatorMessages = {
  TEST: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1")
    }),
    callback: external_exports.void()
  },
  INDEX_TASKS: {
    message: external_exports.discriminatedUnion("version", [
      IndexTasksMessage.extend({
        version: external_exports.literal("v1")
      }),
      IndexTasksMessage.extend({
        version: external_exports.literal("v2"),
        supportsLazyAttempts: external_exports.boolean()
      })
    ]),
    callback: external_exports.discriminatedUnion("success", [
      external_exports.object({
        success: external_exports.literal(false)
      }),
      external_exports.object({
        success: external_exports.literal(true)
      })
    ])
  },
  // Deprecated: Only workers without lazy attempt support will use this
  READY_FOR_EXECUTION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      totalCompletions: external_exports.number()
    })
  },
  READY_FOR_LAZY_ATTEMPT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string(),
      totalCompletions: external_exports.number(),
      startTime: external_exports.number().optional()
    })
  },
  READY_FOR_RESUME: {
    message: external_exports.discriminatedUnion("version", [
      external_exports.object({
        version: external_exports.literal("v1"),
        attemptFriendlyId: external_exports.string(),
        type: WaitReason
      }),
      external_exports.object({
        version: external_exports.literal("v2"),
        attemptFriendlyId: external_exports.string(),
        attemptNumber: external_exports.number(),
        type: WaitReason
      })
    ])
  },
  READY_FOR_CHECKPOINT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1")
    })
  },
  CANCEL_CHECKPOINT: {
    message: external_exports.discriminatedUnion("version", [
      external_exports.object({
        version: external_exports.literal("v1")
      }),
      external_exports.object({
        version: external_exports.literal("v2"),
        reason: WaitReason.optional()
      })
    ]).default({ version: "v1" }),
    callback: external_exports.object({
      version: external_exports.literal("v2").default("v2"),
      checkpointCanceled: external_exports.boolean(),
      reason: WaitReason.optional()
    })
  },
  TASK_HEARTBEAT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptFriendlyId: external_exports.string()
    })
  },
  TASK_RUN_HEARTBEAT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string()
    })
  },
  TASK_RUN_COMPLETED: {
    message: external_exports.object({
      version: external_exports.enum(["v1", "v2"]).default("v1"),
      execution: V3ProdTaskRunExecution,
      completion: TaskRunExecutionResult
    }),
    callback: external_exports.object({
      willCheckpointAndRestore: external_exports.boolean(),
      shouldExit: external_exports.boolean()
    })
  },
  TASK_RUN_FAILED_TO_RUN: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      completion: TaskRunFailedExecutionResult
    })
  },
  WAIT_FOR_DURATION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      ms: external_exports.number(),
      now: external_exports.number(),
      attemptFriendlyId: external_exports.string()
    }),
    callback: external_exports.object({
      willCheckpointAndRestore: external_exports.boolean()
    })
  },
  WAIT_FOR_TASK: {
    message: external_exports.object({
      version: external_exports.enum(["v1", "v2"]).default("v1"),
      friendlyId: external_exports.string(),
      // This is the attempt that is waiting
      attemptFriendlyId: external_exports.string()
    }),
    callback: external_exports.object({
      willCheckpointAndRestore: external_exports.boolean()
    })
  },
  WAIT_FOR_BATCH: {
    message: external_exports.object({
      version: external_exports.enum(["v1", "v2"]).default("v1"),
      batchFriendlyId: external_exports.string(),
      runFriendlyIds: external_exports.string().array(),
      // This is the attempt that is waiting
      attemptFriendlyId: external_exports.string()
    }),
    callback: external_exports.object({
      willCheckpointAndRestore: external_exports.boolean()
    })
  },
  INDEXING_FAILED: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      deploymentId: external_exports.string(),
      error: external_exports.object({
        name: external_exports.string(),
        message: external_exports.string(),
        stack: external_exports.string().optional(),
        stderr: external_exports.string().optional()
      })
    })
  },
  CREATE_TASK_RUN_ATTEMPT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string()
    }),
    callback: external_exports.discriminatedUnion("success", [
      external_exports.object({
        success: external_exports.literal(false),
        reason: external_exports.string().optional()
      }),
      external_exports.object({
        success: external_exports.literal(true),
        executionPayload: V3ProdTaskRunExecutionPayload
      })
    ])
  },
  UNRECOVERABLE_ERROR: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      error: external_exports.object({
        name: external_exports.string(),
        message: external_exports.string(),
        stack: external_exports.string().optional()
      })
    })
  },
  SET_STATE: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptFriendlyId: external_exports.string().optional(),
      attemptNumber: external_exports.string().optional()
    })
  }
};
var CoordinatorToProdWorkerMessages = {
  RESUME_AFTER_DEPENDENCY: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptId: external_exports.string(),
      completions: TaskRunExecutionResult.array(),
      executions: TaskRunExecution.array()
    })
  },
  RESUME_AFTER_DURATION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptId: external_exports.string()
    })
  },
  // Deprecated: Only workers without lazy attempt support will use this
  EXECUTE_TASK_RUN: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      executionPayload: V3ProdTaskRunExecutionPayload
    })
  },
  EXECUTE_TASK_RUN_LAZY_ATTEMPT: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      lazyPayload: TaskRunExecutionLazyAttemptPayload
    })
  },
  REQUEST_ATTEMPT_CANCELLATION: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      attemptId: external_exports.string()
    })
  },
  REQUEST_EXIT: {
    message: external_exports.discriminatedUnion("version", [
      external_exports.object({
        version: external_exports.literal("v1")
      }),
      external_exports.object({
        version: external_exports.literal("v2"),
        delayInMs: external_exports.number().optional()
      })
    ])
  },
  READY_FOR_RETRY: {
    message: external_exports.object({
      version: external_exports.literal("v1").default("v1"),
      runId: external_exports.string()
    })
  }
};
var ProdWorkerSocketData = external_exports.object({
  contentHash: external_exports.string(),
  projectRef: external_exports.string(),
  envId: external_exports.string(),
  runId: external_exports.string(),
  attemptFriendlyId: external_exports.string().optional(),
  attemptNumber: external_exports.string().optional(),
  podName: external_exports.string(),
  deploymentId: external_exports.string(),
  deploymentVersion: external_exports.string(),
  requiresCheckpointResumeWithMessage: external_exports.string().optional()
});
var CoordinatorSocketData = external_exports.object({
  supportsDynamicConfig: external_exports.string().optional()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/style.js
init_esm();
var PRIMARY_VARIANT = "primary";
var WARM_VARIANT = "warm";
var COLD_VARIANT = "cold";
var Variant = external_exports.enum([PRIMARY_VARIANT, WARM_VARIANT, COLD_VARIANT]);
var AccessoryItem = external_exports.object({
  text: external_exports.string(),
  variant: external_exports.string().optional(),
  url: external_exports.string().optional()
});
var Accessory = external_exports.object({
  items: external_exports.array(AccessoryItem),
  style: external_exports.enum(["codepath"]).optional()
});
var TaskEventStyle = external_exports.object({
  icon: external_exports.string().optional(),
  variant: Variant.optional(),
  accessory: Accessory.optional()
}).default({
  icon: void 0,
  variant: void 0
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/fetch.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/eventFilter.js
init_esm();
var stringPatternMatchers = [
  external_exports.object({
    $endsWith: external_exports.string()
  }),
  external_exports.object({
    $startsWith: external_exports.string()
  }),
  external_exports.object({
    $ignoreCaseEquals: external_exports.string()
  })
];
var EventMatcher = external_exports.union([
  /** Match against a string */
  external_exports.array(external_exports.string()),
  /** Match against a number */
  external_exports.array(external_exports.number()),
  /** Match against a boolean */
  external_exports.array(external_exports.boolean()),
  external_exports.array(external_exports.union([
    ...stringPatternMatchers,
    external_exports.object({
      $exists: external_exports.boolean()
    }),
    external_exports.object({
      $isNull: external_exports.boolean()
    }),
    external_exports.object({
      $anythingBut: external_exports.union([external_exports.string(), external_exports.number(), external_exports.boolean()])
    }),
    external_exports.object({
      $anythingBut: external_exports.union([external_exports.array(external_exports.string()), external_exports.array(external_exports.number()), external_exports.array(external_exports.boolean())])
    }),
    external_exports.object({
      $gt: external_exports.number()
    }),
    external_exports.object({
      $lt: external_exports.number()
    }),
    external_exports.object({
      $gte: external_exports.number()
    }),
    external_exports.object({
      $lte: external_exports.number()
    }),
    external_exports.object({
      $between: external_exports.tuple([external_exports.number(), external_exports.number()])
    }),
    external_exports.object({
      $includes: external_exports.union([external_exports.string(), external_exports.number(), external_exports.boolean()])
    }),
    external_exports.object({
      $not: external_exports.union([external_exports.string(), external_exports.number(), external_exports.boolean()])
    })
  ]))
]);
var EventFilter = external_exports.lazy(() => external_exports.record(external_exports.union([EventMatcher, EventFilter])));

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/fetch.js
var FetchRetryHeadersStrategy = external_exports.object({
  /** The `headers` strategy retries the request using info from the response headers. */
  strategy: external_exports.literal("headers"),
  /** The header to use to determine the maximum number of times to retry the request. */
  limitHeader: external_exports.string(),
  /** The header to use to determine the number of remaining retries. */
  remainingHeader: external_exports.string(),
  /** The header to use to determine the time when the number of remaining retries will be reset. */
  resetHeader: external_exports.string(),
  /** The event filter to use to determine if the request should be retried. */
  bodyFilter: EventFilter.optional(),
  /** The format of the `resetHeader` value. */
  resetFormat: external_exports.enum([
    "unix_timestamp",
    "unix_timestamp_in_ms",
    "iso_8601",
    "iso_8601_duration_openai_variant"
  ]).default("unix_timestamp").optional()
});
var FetchRetryBackoffStrategy = RetryOptions.extend({
  /** The `backoff` strategy retries the request with an exponential backoff. */
  strategy: external_exports.literal("backoff"),
  /** The event filter to use to determine if the request should be retried. */
  bodyFilter: EventFilter.optional()
});
var FetchRetryStrategy = external_exports.discriminatedUnion("strategy", [
  FetchRetryHeadersStrategy,
  FetchRetryBackoffStrategy
]);
var FetchRetryByStatusOptions = external_exports.record(external_exports.string(), FetchRetryStrategy);
var FetchTimeoutOptions = external_exports.object({
  /** The maximum time to wait for the request to complete. */
  durationInMs: external_exports.number().optional(),
  retry: RetryOptions.optional()
});
var FetchRetryOptions = external_exports.object({
  /** The retrying strategy for specific status codes. */
  byStatus: FetchRetryByStatusOptions.optional(),
  /** The timeout options for the request. */
  timeout: RetryOptions.optional(),
  /**
   * The retrying strategy for connection errors.
   */
  connectionError: RetryOptions.optional()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/openTelemetry.js
init_esm();
var ExceptionEventProperties = external_exports.object({
  type: external_exports.string().optional(),
  message: external_exports.string().optional(),
  stacktrace: external_exports.string().optional()
});
var ExceptionSpanEvent = external_exports.object({
  name: external_exports.literal("exception"),
  time: external_exports.coerce.date(),
  properties: external_exports.object({
    exception: ExceptionEventProperties
  })
});
var CancellationSpanEvent = external_exports.object({
  name: external_exports.literal("cancellation"),
  time: external_exports.coerce.date(),
  properties: external_exports.object({
    reason: external_exports.string()
  })
});
var OtherSpanEvent = external_exports.object({
  name: external_exports.string(),
  time: external_exports.coerce.date(),
  properties: external_exports.record(external_exports.unknown())
});
var SpanEvent = external_exports.union([ExceptionSpanEvent, CancellationSpanEvent, OtherSpanEvent]);
var SpanEvents = external_exports.array(SpanEvent);
var SpanMessagingEvent = external_exports.object({
  system: external_exports.string().optional(),
  client_id: external_exports.string().optional(),
  operation: external_exports.enum(["publish", "create", "receive", "deliver"]),
  message: external_exports.any(),
  destination: external_exports.string().optional()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/webhooks.js
init_esm();
var AlertWebhookRunFailedObject = external_exports.object({
  /** Task information */
  task: external_exports.object({
    /** Unique identifier for the task */
    id: external_exports.string(),
    /** File path where the task is defined */
    filePath: external_exports.string(),
    /** Name of the exported task function */
    exportName: external_exports.string().optional(),
    /** Version of the task */
    version: external_exports.string(),
    /** Version of the SDK used */
    sdkVersion: external_exports.string(),
    /** Version of the CLI used */
    cliVersion: external_exports.string()
  }),
  /** Run information */
  run: external_exports.object({
    /** Unique identifier for the run */
    id: external_exports.string(),
    /** Run number */
    number: external_exports.number(),
    /** Current status of the run */
    status: RunStatus,
    /** When the run was created */
    createdAt: external_exports.coerce.date(),
    /** When the run started executing */
    startedAt: external_exports.coerce.date().optional(),
    /** When the run finished executing */
    completedAt: external_exports.coerce.date().optional(),
    /** Whether this is a test run */
    isTest: external_exports.boolean(),
    /** Idempotency key for the run */
    idempotencyKey: external_exports.string().optional(),
    /** Associated tags */
    tags: external_exports.array(external_exports.string()),
    /** Error information */
    error: TaskRunError,
    /** Whether the run was an out-of-memory error */
    isOutOfMemoryError: external_exports.boolean(),
    /** Machine preset used for the run */
    machine: external_exports.string(),
    /** URL to view the run in the dashboard */
    dashboardUrl: external_exports.string()
  }),
  /** Environment information */
  environment: external_exports.object({
    /** Environment ID */
    id: external_exports.string(),
    /** Environment type */
    type: RuntimeEnvironmentTypeSchema,
    /** Environment slug */
    slug: external_exports.string(),
    /** Environment branch name */
    branchName: external_exports.string().optional()
  }),
  /** Organization information */
  organization: external_exports.object({
    /** Organization ID */
    id: external_exports.string(),
    /** Organization slug */
    slug: external_exports.string(),
    /** Organization name */
    name: external_exports.string()
  }),
  /** Project information */
  project: external_exports.object({
    /** Project ID */
    id: external_exports.string(),
    /** Project reference */
    ref: external_exports.string(),
    /** Project slug */
    slug: external_exports.string(),
    /** Project name */
    name: external_exports.string()
  })
});
var DeployError = external_exports.object({
  /** Error name */
  name: external_exports.string(),
  /** Error message */
  message: external_exports.string(),
  /** Error stack trace */
  stack: external_exports.string().optional(),
  /** Standard error output */
  stderr: external_exports.string().optional()
});
var deploymentCommonProperties = {
  /** Environment information */
  environment: external_exports.object({
    id: external_exports.string(),
    type: RuntimeEnvironmentTypeSchema,
    slug: external_exports.string(),
    /** Environment branch name */
    branchName: external_exports.string().optional()
  }),
  /** Organization information */
  organization: external_exports.object({
    id: external_exports.string(),
    slug: external_exports.string(),
    name: external_exports.string()
  }),
  /** Project information */
  project: external_exports.object({
    id: external_exports.string(),
    ref: external_exports.string(),
    slug: external_exports.string(),
    name: external_exports.string()
  })
};
var deploymentDeploymentCommonProperties = {
  /** Deployment ID */
  id: external_exports.string(),
  /** Deployment status */
  status: external_exports.string(),
  /** Deployment version */
  version: external_exports.string(),
  /** Short code identifier */
  shortCode: external_exports.string()
};
var AlertWebhookDeploymentSuccessObject = external_exports.object({
  ...deploymentCommonProperties,
  deployment: external_exports.object({
    ...deploymentDeploymentCommonProperties,
    /** When the deployment completed */
    deployedAt: external_exports.coerce.date()
  }),
  /** Deployed tasks */
  tasks: external_exports.array(external_exports.object({
    /** Task ID */
    id: external_exports.string(),
    /** File path where the task is defined */
    filePath: external_exports.string(),
    /** Name of the exported task function */
    exportName: external_exports.string().optional(),
    /** Source of the trigger */
    triggerSource: external_exports.string()
  }))
});
var AlertWebhookDeploymentFailedObject = external_exports.object({
  ...deploymentCommonProperties,
  deployment: external_exports.object({
    ...deploymentDeploymentCommonProperties,
    /** When the deployment failed */
    failedAt: external_exports.coerce.date()
  }),
  /** Error information */
  error: DeployError
});
var commonProperties = {
  /** Webhook ID */
  id: external_exports.string(),
  /** When the webhook was created */
  created: external_exports.coerce.date(),
  /** Version of the webhook */
  webhookVersion: external_exports.string()
};
var Webhook = external_exports.discriminatedUnion("type", [
  /** Run failed alert webhook */
  external_exports.object({
    ...commonProperties,
    type: external_exports.literal("alert.run.failed"),
    object: AlertWebhookRunFailedObject
  }),
  /** Deployment success alert webhook */
  external_exports.object({
    ...commonProperties,
    type: external_exports.literal("alert.deployment.success"),
    object: AlertWebhookDeploymentSuccessObject
  }),
  /** Deployment failed alert webhook */
  external_exports.object({
    ...commonProperties,
    type: external_exports.literal("alert.deployment.failed"),
    object: AlertWebhookDeploymentFailedObject
  })
]);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/checkpoints.js
init_esm();
var CallbackUrl = zod_default.string().url().transform((url) => new URL(url));
var CheckpointServiceSuspendRequestBody = zod_default.object({
  type: CheckpointType,
  runId: zod_default.string(),
  snapshotId: zod_default.string(),
  runnerId: zod_default.string(),
  projectRef: zod_default.string(),
  deploymentVersion: zod_default.string(),
  reason: zod_default.string().optional()
});
var CheckpointServiceSuspendResponseBody = zod_default.object({
  ok: zod_default.literal(true)
});
var CheckpointServiceRestoreRequestBody = DequeuedMessage.required({ checkpoint: true });

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/warmStart.js
init_esm();
var WarmStartConnectResponse = external_exports.object({
  connectionTimeoutMs: external_exports.number().optional(),
  keepaliveMs: external_exports.number().optional()
});

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/schemas/queues.js
init_esm();
var queueTypes = ["task", "custom"];
var QueueType = external_exports.enum(queueTypes);
var RetrieveQueueType = external_exports.enum([...queueTypes, "id"]);
var QueueItem = external_exports.object({
  /** The queue id, e.g. queue_12345 */
  id: external_exports.string(),
  /** The queue name */
  name: external_exports.string(),
  /**
   * The queue type, either "task" or "custom"
   * "task" are created automatically for each task.
   * "custom" are created by you explicitly in your code.
   * */
  type: QueueType,
  /** The number of runs currently running */
  running: external_exports.number(),
  /** The number of runs currently queued */
  queued: external_exports.number(),
  /** The concurrency limit of the queue */
  concurrencyLimit: external_exports.number().nullable(),
  /** Whether the queue is paused. If it's paused, no new runs will be started. */
  paused: external_exports.boolean()
});
var ListQueueOptions = external_exports.object({
  /** The page number */
  page: external_exports.number().optional(),
  /** The number of queues per page */
  perPage: external_exports.number().optional()
});
var QueueTypeName = external_exports.object({
  /** "task" or "custom" */
  type: QueueType,
  /** The name of your queue.
   * For "task" type it will be the task id, for "custom" it will be the name you specified.
   * */
  name: external_exports.string()
});
var RetrieveQueueParam = external_exports.union([external_exports.string(), QueueTypeName]);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/task-context-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/taskContext/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/semanticInternalAttributes.js
init_esm();
var SemanticInternalAttributes = {
  ENVIRONMENT_ID: "ctx.environment.id",
  ENVIRONMENT_TYPE: "ctx.environment.type",
  ORGANIZATION_ID: "ctx.organization.id",
  ORGANIZATION_SLUG: "ctx.organization.slug",
  ORGANIZATION_NAME: "ctx.organization.name",
  PROJECT_ID: "ctx.project.id",
  PROJECT_REF: "ctx.project.ref",
  PROJECT_NAME: "ctx.project.title",
  PROJECT_DIR: "project.dir",
  ATTEMPT_ID: "ctx.attempt.id",
  ATTEMPT_NUMBER: "ctx.attempt.number",
  RUN_ID: "ctx.run.id",
  RUN_IS_TEST: "ctx.run.isTest",
  ORIGINAL_RUN_ID: "$original_run_id",
  BATCH_ID: "ctx.batch.id",
  TASK_SLUG: "ctx.task.id",
  TASK_PATH: "ctx.task.filePath",
  TASK_EXPORT_NAME: "ctx.task.exportName",
  QUEUE_NAME: "ctx.queue.name",
  QUEUE_ID: "ctx.queue.id",
  MACHINE_PRESET_NAME: "ctx.machine.name",
  MACHINE_PRESET_CPU: "ctx.machine.cpu",
  MACHINE_PRESET_MEMORY: "ctx.machine.memory",
  MACHINE_PRESET_CENTS_PER_MS: "ctx.machine.centsPerMs",
  SKIP_SPAN_PARTIAL: "$span.skip_partial",
  SPAN_PARTIAL: "$span.partial",
  SPAN_ID: "$span.span_id",
  ENTITY_TYPE: "$entity.type",
  ENTITY_ID: "$entity.id",
  OUTPUT: "$output",
  OUTPUT_TYPE: "$mime_type_output",
  STYLE: "$style",
  STYLE_ICON: "$style.icon",
  STYLE_VARIANT: "$style.variant",
  STYLE_ACCESSORY: "$style.accessory",
  COLLAPSED: "$collapsed",
  METADATA: "$metadata",
  TRIGGER: "$trigger",
  PAYLOAD: "$payload",
  PAYLOAD_TYPE: "$mime_type_payload",
  SHOW: "$show",
  SHOW_ACTIONS: "$show.actions",
  WORKER_ID: "worker.id",
  WORKER_VERSION: "worker.version",
  CLI_VERSION: "cli.version",
  SDK_VERSION: "sdk.version",
  SDK_LANGUAGE: "sdk.language",
  RETRY_AT: "retry.at",
  RETRY_DELAY: "retry.delay",
  RETRY_COUNT: "retry.count",
  LINK_TITLE: "$link.title",
  IDEMPOTENCY_KEY: "ctx.run.idempotencyKey",
  USAGE_DURATION_MS: "$usage.durationMs",
  USAGE_COST_IN_CENTS: "$usage.costInCents",
  RATE_LIMIT_LIMIT: "response.rateLimit.limit",
  RATE_LIMIT_REMAINING: "response.rateLimit.remaining",
  RATE_LIMIT_RESET: "response.rateLimit.reset",
  SPAN_ATTEMPT: "$span.attempt",
  METRIC_EVENTS: "$metrics.events",
  EXECUTION_ENVIRONMENT: "exec_env",
  WARM_START: "warm_start",
  ATTEMPT_EXECUTION_COUNT: "$trigger.executionCount"
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/globals.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/platform.js
init_esm();
var _globalThis = typeof globalThis === "object" ? globalThis : global;

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/globals.js
var GLOBAL_TRIGGER_DOT_DEV_KEY = Symbol.for(`dev.trigger.ts.api`);
var _global = _globalThis;
function registerGlobal(type, instance, allowOverride = false) {
  const api = _global[GLOBAL_TRIGGER_DOT_DEV_KEY] = _global[GLOBAL_TRIGGER_DOT_DEV_KEY] ?? {};
  if (!allowOverride && api[type]) {
    const err = new Error(`trigger.dev: Attempted duplicate registration of API: ${type}`);
    return false;
  }
  api[type] = instance;
  return true;
}
__name(registerGlobal, "registerGlobal");
function getGlobal(type) {
  return _global[GLOBAL_TRIGGER_DOT_DEV_KEY]?.[type];
}
__name(getGlobal, "getGlobal");
function unregisterGlobal(type) {
  const api = _global[GLOBAL_TRIGGER_DOT_DEV_KEY];
  if (api) {
    delete api[type];
  }
}
__name(unregisterGlobal, "unregisterGlobal");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/taskContext/index.js
var API_NAME = "task-context";
var TaskContextAPI = class _TaskContextAPI {
  static {
    __name(this, "TaskContextAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _TaskContextAPI();
    }
    return this._instance;
  }
  get isInsideTask() {
    return this.#getTaskContext() !== void 0;
  }
  get ctx() {
    return this.#getTaskContext()?.ctx;
  }
  get worker() {
    return this.#getTaskContext()?.worker;
  }
  get isWarmStart() {
    return this.#getTaskContext()?.isWarmStart;
  }
  get attributes() {
    if (this.ctx) {
      return {
        ...this.contextAttributes,
        ...this.workerAttributes,
        [SemanticInternalAttributes.WARM_START]: !!this.isWarmStart
      };
    }
    return {};
  }
  get resourceAttributes() {
    if (this.ctx) {
      return {
        [SemanticInternalAttributes.ENVIRONMENT_ID]: this.ctx.environment.id,
        [SemanticInternalAttributes.ENVIRONMENT_TYPE]: this.ctx.environment.type,
        [SemanticInternalAttributes.ORGANIZATION_ID]: this.ctx.organization.id,
        [SemanticInternalAttributes.PROJECT_ID]: this.ctx.project.id,
        [SemanticInternalAttributes.PROJECT_REF]: this.ctx.project.ref,
        [SemanticInternalAttributes.PROJECT_NAME]: this.ctx.project.name,
        [SemanticInternalAttributes.ORGANIZATION_SLUG]: this.ctx.organization.slug,
        [SemanticInternalAttributes.ORGANIZATION_NAME]: this.ctx.organization.name,
        [SemanticInternalAttributes.MACHINE_PRESET_NAME]: this.ctx.machine?.name,
        [SemanticInternalAttributes.MACHINE_PRESET_CPU]: this.ctx.machine?.cpu,
        [SemanticInternalAttributes.MACHINE_PRESET_MEMORY]: this.ctx.machine?.memory,
        [SemanticInternalAttributes.MACHINE_PRESET_CENTS_PER_MS]: this.ctx.machine?.centsPerMs
      };
    }
    return {};
  }
  get workerAttributes() {
    if (this.worker) {
      return {
        [SemanticInternalAttributes.WORKER_ID]: this.worker.id,
        [SemanticInternalAttributes.WORKER_VERSION]: this.worker.version
      };
    }
    return {};
  }
  get contextAttributes() {
    if (this.ctx) {
      return {
        [SemanticInternalAttributes.ATTEMPT_NUMBER]: this.ctx.attempt.number,
        [SemanticInternalAttributes.TASK_SLUG]: this.ctx.task.id,
        [SemanticInternalAttributes.TASK_PATH]: this.ctx.task.filePath,
        [SemanticInternalAttributes.QUEUE_NAME]: this.ctx.queue.name,
        [SemanticInternalAttributes.QUEUE_ID]: this.ctx.queue.id,
        [SemanticInternalAttributes.RUN_ID]: this.ctx.run.id,
        [SemanticInternalAttributes.RUN_IS_TEST]: this.ctx.run.isTest,
        [SemanticInternalAttributes.BATCH_ID]: this.ctx.batch?.id,
        [SemanticInternalAttributes.IDEMPOTENCY_KEY]: this.ctx.run.idempotencyKey
      };
    }
    return {};
  }
  disable() {
    unregisterGlobal(API_NAME);
  }
  setGlobalTaskContext(taskContext2) {
    return registerGlobal(API_NAME, taskContext2);
  }
  #getTaskContext() {
    return getGlobal(API_NAME);
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/task-context-api.js
var taskContext = TaskContextAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/core.js
init_esm();
var import_zod_validation_error = __toESM(require_cjs(), 1);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/retries.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/retry.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/retries.js
var defaultRetryOptions = {
  maxAttempts: 3,
  factor: 2,
  minTimeoutInMs: 1e3,
  maxTimeoutInMs: 6e4,
  randomize: true
};
var defaultFetchRetryOptions = {
  byStatus: {
    "429,408,409,5xx": {
      strategy: "backoff",
      ...defaultRetryOptions
    }
  },
  connectionError: defaultRetryOptions,
  timeout: defaultRetryOptions
};
function calculateNextRetryDelay(options, attempt) {
  const opts = { ...defaultRetryOptions, ...options };
  if (attempt >= opts.maxAttempts) {
    return;
  }
  const { factor, minTimeoutInMs, maxTimeoutInMs, randomize } = opts;
  const random = randomize ? Math.random() + 1 : 1;
  const timeout3 = Math.min(maxTimeoutInMs, random * minTimeoutInMs * Math.pow(factor, attempt - 1));
  return Math.round(timeout3);
}
__name(calculateNextRetryDelay, "calculateNextRetryDelay");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/errors.js
init_esm();
var ApiError = class _ApiError extends Error {
  static {
    __name(this, "ApiError");
  }
  status;
  headers;
  error;
  code;
  param;
  type;
  constructor(status, error, message, headers) {
    super(`${_ApiError.makeMessage(status, error, message)}`);
    this.name = "TriggerApiError";
    this.status = status;
    this.headers = headers;
    const data = error;
    this.error = data;
    this.code = data?.["code"];
    this.param = data?.["param"];
    this.type = data?.["type"];
  }
  static makeMessage(status, error, message) {
    const errorMessage = error?.message ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : typeof error === "string" ? error : error ? JSON.stringify(error) : void 0;
    if (errorMessage) {
      return errorMessage;
    }
    if (status && message) {
      return `${status} ${message}`;
    }
    if (status) {
      return `${status} status code (no body)`;
    }
    if (message) {
      return message;
    }
    return "(no status code or body)";
  }
  static generate(status, errorResponse, message, headers) {
    if (!status) {
      return new ApiConnectionError({ cause: castToError(errorResponse) });
    }
    const error = errorResponse?.["error"];
    if (status === 400) {
      return new BadRequestError(status, error, message, headers);
    }
    if (status === 401) {
      return new AuthenticationError(status, error, message, headers);
    }
    if (status === 403) {
      return new PermissionDeniedError(status, error, message, headers);
    }
    if (status === 404) {
      return new NotFoundError(status, error, message, headers);
    }
    if (status === 409) {
      return new ConflictError(status, error, message, headers);
    }
    if (status === 422) {
      return new UnprocessableEntityError(status, error, message, headers);
    }
    if (status === 429) {
      return new RateLimitError(status, error, message, headers);
    }
    if (status >= 500) {
      return new InternalServerError(status, error, message, headers);
    }
    return new _ApiError(status, error, message, headers);
  }
};
var ApiConnectionError = class extends ApiError {
  static {
    __name(this, "ApiConnectionError");
  }
  status = void 0;
  constructor({ message, cause }) {
    super(void 0, void 0, message || "Connection error.", void 0);
    if (cause)
      this.cause = cause;
  }
};
var BadRequestError = class extends ApiError {
  static {
    __name(this, "BadRequestError");
  }
  status = 400;
};
var AuthenticationError = class extends ApiError {
  static {
    __name(this, "AuthenticationError");
  }
  status = 401;
};
var PermissionDeniedError = class extends ApiError {
  static {
    __name(this, "PermissionDeniedError");
  }
  status = 403;
};
var NotFoundError = class extends ApiError {
  static {
    __name(this, "NotFoundError");
  }
  status = 404;
};
var ConflictError = class extends ApiError {
  static {
    __name(this, "ConflictError");
  }
  status = 409;
};
var UnprocessableEntityError = class extends ApiError {
  static {
    __name(this, "UnprocessableEntityError");
  }
  status = 422;
};
var RateLimitError = class extends ApiError {
  static {
    __name(this, "RateLimitError");
  }
  status = 429;
  get millisecondsUntilReset() {
    const resetAtUnixEpochMs = (this.headers ?? {})["x-ratelimit-reset"];
    if (typeof resetAtUnixEpochMs === "string") {
      const resetAtUnixEpoch = parseInt(resetAtUnixEpochMs, 10);
      if (isNaN(resetAtUnixEpoch)) {
        return;
      }
      return Math.max(resetAtUnixEpoch - Date.now() + Math.floor(Math.random() * 2e3), 0);
    }
    return;
  }
};
var InternalServerError = class extends ApiError {
  static {
    __name(this, "InternalServerError");
  }
};
var ApiSchemaValidationError = class extends ApiError {
  static {
    __name(this, "ApiSchemaValidationError");
  }
  status = 200;
  rawBody;
  constructor({ message, cause, status, rawBody, headers }) {
    super(status, void 0, message || "Validation error.", headers);
    if (cause)
      this.cause = cause;
    this.rawBody = rawBody;
  }
};
function castToError(err) {
  if (err instanceof Error)
    return err;
  return new Error(err);
}
__name(castToError, "castToError");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/core.js
init_esm2();
var import_core = __toESM(require_src(), 1);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/styleAttributes.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/flattenAttributes.js
init_esm();
var NULL_SENTINEL = "$@null((";
var CIRCULAR_REFERENCE_SENTINEL = "$@circular((";
function flattenAttributes(obj, prefix, maxAttributeCount) {
  const flattener = new AttributeFlattener(maxAttributeCount);
  flattener.doFlatten(obj, prefix);
  return flattener.attributes;
}
__name(flattenAttributes, "flattenAttributes");
var AttributeFlattener = class {
  static {
    __name(this, "AttributeFlattener");
  }
  maxAttributeCount;
  seen = /* @__PURE__ */ new WeakSet();
  attributeCounter = 0;
  result = {};
  constructor(maxAttributeCount) {
    this.maxAttributeCount = maxAttributeCount;
  }
  get attributes() {
    return this.result;
  }
  canAddMoreAttributes() {
    return this.maxAttributeCount === void 0 || this.attributeCounter < this.maxAttributeCount;
  }
  addAttribute(key, value) {
    if (!this.canAddMoreAttributes()) {
      return false;
    }
    this.result[key] = value;
    this.attributeCounter++;
    return true;
  }
  doFlatten(obj, prefix) {
    if (!this.canAddMoreAttributes()) {
      return;
    }
    if (obj === void 0) {
      return;
    }
    if (obj === null) {
      this.addAttribute(prefix || "", NULL_SENTINEL);
      return;
    }
    if (typeof obj === "string") {
      this.addAttribute(prefix || "", obj);
      return;
    }
    if (typeof obj === "number") {
      this.addAttribute(prefix || "", obj);
      return;
    }
    if (typeof obj === "boolean") {
      this.addAttribute(prefix || "", obj);
      return;
    }
    if (obj instanceof Date) {
      this.addAttribute(prefix || "", obj.toISOString());
      return;
    }
    if (obj instanceof Error) {
      this.addAttribute(`${prefix || "error"}.name`, obj.name);
      this.addAttribute(`${prefix || "error"}.message`, obj.message);
      if (obj.stack) {
        this.addAttribute(`${prefix || "error"}.stack`, obj.stack);
      }
      return;
    }
    if (typeof obj === "function") {
      const funcName = obj.name || "anonymous";
      this.addAttribute(prefix || "", `[Function: ${funcName}]`);
      return;
    }
    if (obj instanceof Set) {
      let index = 0;
      for (const item of obj) {
        if (!this.canAddMoreAttributes())
          break;
        this.#processValue(item, `${prefix || "set"}.[${index}]`);
        index++;
      }
      return;
    }
    if (obj instanceof Map) {
      for (const [key, value] of obj) {
        if (!this.canAddMoreAttributes())
          break;
        const keyStr = typeof key === "string" ? key : String(key);
        this.#processValue(value, `${prefix || "map"}.${keyStr}`);
      }
      return;
    }
    if (typeof File !== "undefined" && obj instanceof File) {
      this.addAttribute(`${prefix || "file"}.name`, obj.name);
      this.addAttribute(`${prefix || "file"}.size`, obj.size);
      this.addAttribute(`${prefix || "file"}.type`, obj.type);
      this.addAttribute(`${prefix || "file"}.lastModified`, obj.lastModified);
      return;
    }
    if (typeof ReadableStream !== "undefined" && obj instanceof ReadableStream) {
      this.addAttribute(`${prefix || "stream"}.type`, "ReadableStream");
      this.addAttribute(`${prefix || "stream"}.locked`, obj.locked);
      return;
    }
    if (typeof WritableStream !== "undefined" && obj instanceof WritableStream) {
      this.addAttribute(`${prefix || "stream"}.type`, "WritableStream");
      this.addAttribute(`${prefix || "stream"}.locked`, obj.locked);
      return;
    }
    if (obj instanceof Promise) {
      this.addAttribute(prefix || "promise", "[Promise object]");
      return;
    }
    if (obj instanceof RegExp) {
      this.addAttribute(`${prefix || "regexp"}.source`, obj.source);
      this.addAttribute(`${prefix || "regexp"}.flags`, obj.flags);
      return;
    }
    if (typeof URL !== "undefined" && obj instanceof URL) {
      this.addAttribute(`${prefix || "url"}.href`, obj.href);
      this.addAttribute(`${prefix || "url"}.protocol`, obj.protocol);
      this.addAttribute(`${prefix || "url"}.host`, obj.host);
      this.addAttribute(`${prefix || "url"}.pathname`, obj.pathname);
      return;
    }
    if (obj instanceof ArrayBuffer) {
      this.addAttribute(`${prefix || "arraybuffer"}.byteLength`, obj.byteLength);
      return;
    }
    if (ArrayBuffer.isView(obj)) {
      const typedArray = obj;
      this.addAttribute(`${prefix || "typedarray"}.constructor`, typedArray.constructor.name);
      this.addAttribute(`${prefix || "typedarray"}.length`, typedArray.length);
      this.addAttribute(`${prefix || "typedarray"}.byteLength`, typedArray.byteLength);
      this.addAttribute(`${prefix || "typedarray"}.byteOffset`, typedArray.byteOffset);
      return;
    }
    if (obj !== null && typeof obj === "object" && this.seen.has(obj)) {
      this.addAttribute(prefix || "", CIRCULAR_REFERENCE_SENTINEL);
      return;
    }
    if (obj !== null && typeof obj === "object") {
      this.seen.add(obj);
    }
    for (const [key, value] of Object.entries(obj)) {
      if (!this.canAddMoreAttributes()) {
        break;
      }
      const newPrefix = `${prefix ? `${prefix}.` : ""}${Array.isArray(obj) ? `[${key}]` : key}`;
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (!this.canAddMoreAttributes()) {
            break;
          }
          this.#processValue(value[i], `${newPrefix}.[${i}]`);
        }
      } else {
        this.#processValue(value, newPrefix);
      }
    }
  }
  #processValue(value, prefix) {
    if (!this.canAddMoreAttributes()) {
      return;
    }
    if (value === void 0) {
      return;
    }
    if (value === null) {
      this.addAttribute(prefix, NULL_SENTINEL);
      return;
    }
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      this.addAttribute(prefix, value);
      return;
    }
    if (typeof value === "object" || typeof value === "function") {
      this.doFlatten(value, prefix);
    } else {
      this.addAttribute(prefix, String(value));
    }
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/styleAttributes.js
function accessoryAttributes(accessory) {
  return flattenAttributes(accessory, SemanticInternalAttributes.STYLE_ACCESSORY);
}
__name(accessoryAttributes, "accessoryAttributes");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/pagination.js
init_esm();
var CursorPage = class {
  static {
    __name(this, "CursorPage");
  }
  pageFetcher;
  data;
  pagination;
  constructor(data, pagination, pageFetcher) {
    this.pageFetcher = pageFetcher;
    this.data = data;
    this.pagination = pagination;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return !!this.pagination.next;
  }
  hasPreviousPage() {
    return !!this.pagination.previous;
  }
  getNextPage() {
    if (!this.pagination.next) {
      throw new Error("No next page available");
    }
    return this.pageFetcher({ after: this.pagination.next });
  }
  getPreviousPage() {
    if (!this.pagination.previous) {
      throw new Error("No previous page available");
    }
    return this.pageFetcher({ before: this.pagination.previous });
  }
  async *iterPages() {
    let page = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }
  async *[Symbol.asyncIterator]() {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
};
var OffsetLimitPage = class {
  static {
    __name(this, "OffsetLimitPage");
  }
  pageFetcher;
  data;
  pagination;
  constructor(data, pagination, pageFetcher) {
    this.pageFetcher = pageFetcher;
    this.data = data;
    this.pagination = pagination;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  hasNextPage() {
    return this.pagination.currentPage < this.pagination.totalPages;
  }
  hasPreviousPage() {
    return this.pagination.currentPage > 1;
  }
  getNextPage() {
    if (!this.hasNextPage()) {
      throw new Error("No next page available");
    }
    return this.pageFetcher({
      page: this.pagination.currentPage + 1
    });
  }
  getPreviousPage() {
    if (!this.hasPreviousPage()) {
      throw new Error("No previous page available");
    }
    return this.pageFetcher({
      page: this.pagination.currentPage - 1
    });
  }
  async *iterPages() {
    let page = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }
  async *[Symbol.asyncIterator]() {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/crypto.js
init_esm();
async function randomUUID() {
  const { randomUUID: randomUUID2 } = await import("./crypto.node-QLDL37GY.mjs");
  return randomUUID2();
}
__name(randomUUID, "randomUUID");
async function digestSHA256(data) {
  const { subtle: subtle2 } = await import("./crypto.node-QLDL37GY.mjs");
  const hash = await subtle2.digest("SHA-256", new TextEncoder().encode(data));
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(digestSHA256, "digestSHA256");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/core.js
var defaultRetryOptions2 = {
  maxAttempts: 3,
  factor: 2,
  minTimeoutInMs: 1e3,
  maxTimeoutInMs: 6e4,
  randomize: false
};
function zodfetch(schema, url, requestInit, options) {
  return new ApiPromise(_doZodFetch(schema, url, requestInit, options));
}
__name(zodfetch, "zodfetch");
function zodfetchCursorPage(schema, url, params, requestInit, options) {
  const query = new URLSearchParams(params.query);
  if (params.limit) {
    query.set("page[size]", String(params.limit));
  }
  if (params.after) {
    query.set("page[after]", params.after);
  }
  if (params.before) {
    query.set("page[before]", params.before);
  }
  const cursorPageSchema = external_exports.object({
    data: external_exports.array(schema),
    pagination: external_exports.object({
      next: external_exports.string().optional(),
      previous: external_exports.string().optional()
    })
  });
  const $url = new URL(url);
  $url.search = query.toString();
  const fetchResult = _doZodFetch(cursorPageSchema, $url.href, requestInit, options);
  return new CursorPagePromise(fetchResult, schema, url, params, requestInit, options);
}
__name(zodfetchCursorPage, "zodfetchCursorPage");
function zodfetchOffsetLimitPage(schema, url, params, requestInit, options) {
  const query = new URLSearchParams(params.query);
  if (params.limit) {
    query.set("perPage", String(params.limit));
  }
  if (params.page) {
    query.set("page", String(params.page));
  }
  const offsetLimitPageSchema = external_exports.object({
    data: external_exports.array(schema),
    pagination: external_exports.object({
      currentPage: external_exports.coerce.number(),
      totalPages: external_exports.coerce.number(),
      count: external_exports.coerce.number()
    })
  });
  const $url = new URL(url);
  $url.search = query.toString();
  const fetchResult = _doZodFetch(offsetLimitPageSchema, $url.href, requestInit, options);
  return new OffsetLimitPagePromise(fetchResult, schema, url, params, requestInit, options);
}
__name(zodfetchOffsetLimitPage, "zodfetchOffsetLimitPage");
async function traceZodFetch(params, callback) {
  if (!params.options?.tracer) {
    return callback();
  }
  const url = new URL(params.url);
  const method = params.requestInit?.method ?? "GET";
  const name2 = params.options.name ?? `${method} ${url.pathname}`;
  return await params.options.tracer.startActiveSpan(name2, async (span) => {
    return await callback(span);
  }, {
    attributes: {
      [SemanticInternalAttributes.STYLE_ICON]: params.options?.icon ?? "api",
      ...params.options.attributes
    }
  });
}
__name(traceZodFetch, "traceZodFetch");
async function _doZodFetch(schema, url, requestInit, options) {
  let $requestInit = await requestInit;
  return traceZodFetch({ url, requestInit: $requestInit, options }, async (span) => {
    const requestIdempotencyKey = await randomUUID();
    $requestInit = injectPropagationHeadersIfInWorker($requestInit);
    $requestInit = injectRequestIdempotencyKey(requestIdempotencyKey, $requestInit);
    const result = await _doZodFetchWithRetries(schema, url, $requestInit, options);
    if (options?.onResponseBody && span) {
      options.onResponseBody(result.data, span);
    }
    if (options?.prepareData) {
      result.data = await options.prepareData(result.data, result.response);
    }
    return result;
  });
}
__name(_doZodFetch, "_doZodFetch");
async function _doZodFetchWithRetries(schema, url, requestInit, options, attempt = 1) {
  try {
    const response = await context.with((0, import_core.suppressTracing)(context.active()), () => fetch(url, requestInitWithCache(requestInit)));
    const responseHeaders = createResponseHeaders(response.headers);
    if (!response.ok) {
      const retryResult = shouldRetry(response, attempt, options?.retry);
      if (retryResult.retry) {
        await waitForRetry(url, attempt + 1, retryResult.delay, options, requestInit, response);
        return await _doZodFetchWithRetries(schema, url, requestInit, options, attempt + 1);
      } else {
        const errText = await response.text().catch((e) => castToError2(e).message);
        const errJSON = safeJsonParse(errText);
        const errMessage = errJSON ? void 0 : errText;
        throw ApiError.generate(response.status, errJSON, errMessage, responseHeaders);
      }
    }
    const jsonBody = await safeJsonFromResponse(response);
    const parsedResult = schema.safeParse(jsonBody);
    if (parsedResult.success) {
      return { data: parsedResult.data, response };
    }
    const validationError = (0, import_zod_validation_error.fromZodError)(parsedResult.error);
    throw new ApiSchemaValidationError({
      status: response.status,
      cause: validationError,
      message: validationError.message,
      rawBody: jsonBody,
      headers: responseHeaders
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof import_zod_validation_error.ValidationError) {
    }
    if (options?.retry) {
      const retry2 = { ...defaultRetryOptions2, ...options.retry };
      const delay = calculateNextRetryDelay(retry2, attempt);
      if (delay) {
        await waitForRetry(url, attempt + 1, delay, options, requestInit);
        return await _doZodFetchWithRetries(schema, url, requestInit, options, attempt + 1);
      }
    }
    throw new ApiConnectionError({ cause: castToError2(error) });
  }
}
__name(_doZodFetchWithRetries, "_doZodFetchWithRetries");
async function safeJsonFromResponse(response) {
  try {
    return await response.clone().json();
  } catch (error) {
    return;
  }
}
__name(safeJsonFromResponse, "safeJsonFromResponse");
function castToError2(err) {
  if (err instanceof Error)
    return err;
  return new Error(err);
}
__name(castToError2, "castToError");
function shouldRetry(response, attempt, retryOptions) {
  function shouldRetryForOptions() {
    const retry2 = { ...defaultRetryOptions2, ...retryOptions };
    const delay = calculateNextRetryDelay(retry2, attempt);
    if (delay) {
      return { retry: true, delay };
    } else {
      return { retry: false };
    }
  }
  __name(shouldRetryForOptions, "shouldRetryForOptions");
  const shouldRetryHeader = response.headers.get("x-should-retry");
  if (shouldRetryHeader === "true")
    return shouldRetryForOptions();
  if (shouldRetryHeader === "false")
    return { retry: false };
  if (response.status === 408)
    return shouldRetryForOptions();
  if (response.status === 409)
    return shouldRetryForOptions();
  if (response.status === 429) {
    if (attempt >= (typeof retryOptions?.maxAttempts === "number" ? retryOptions?.maxAttempts : 3)) {
      return { retry: false };
    }
    const resetAtUnixEpochMs = response.headers.get("x-ratelimit-reset");
    if (resetAtUnixEpochMs) {
      const resetAtUnixEpoch = parseInt(resetAtUnixEpochMs, 10);
      const delay = resetAtUnixEpoch - Date.now() + Math.floor(Math.random() * 1e3);
      if (delay > 0) {
        return { retry: true, delay };
      }
    }
    return shouldRetryForOptions();
  }
  if (response.status >= 500)
    return shouldRetryForOptions();
  return { retry: false };
}
__name(shouldRetry, "shouldRetry");
function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return void 0;
  }
}
__name(safeJsonParse, "safeJsonParse");
function createResponseHeaders(headers) {
  return new Proxy(Object.fromEntries(
    // @ts-ignore
    headers.entries()
  ), {
    get(target, name2) {
      const key = name2.toString();
      return target[key.toLowerCase()] || target[key];
    }
  });
}
__name(createResponseHeaders, "createResponseHeaders");
function requestInitWithCache(requestInit) {
  try {
    const withCache = {
      ...requestInit,
      cache: "no-cache"
    };
    const _ = new Request("http://localhost", withCache);
    return withCache;
  } catch (error) {
    return requestInit ?? {};
  }
}
__name(requestInitWithCache, "requestInitWithCache");
var ApiPromise = class extends Promise {
  static {
    __name(this, "ApiPromise");
  }
  responsePromise;
  constructor(responsePromise) {
    super((resolve) => {
      resolve(null);
    });
    this.responsePromise = responsePromise;
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   */
  asResponse() {
    return this.responsePromise.then((p) => p.response);
  }
  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   */
  async withResponse() {
    const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
    return { data, response };
  }
  parse() {
    return this.responsePromise.then((result) => result.data);
  }
  then(onfulfilled, onrejected) {
    return this.parse().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.parse().catch(onrejected);
  }
  finally(onfinally) {
    return this.parse().finally(onfinally);
  }
};
var CursorPagePromise = class extends ApiPromise {
  static {
    __name(this, "CursorPagePromise");
  }
  schema;
  url;
  params;
  requestInit;
  options;
  constructor(result, schema, url, params, requestInit, options) {
    super(result.then((result2) => ({
      data: new CursorPage(result2.data.data, result2.data.pagination, this.#fetchPage.bind(this)),
      response: result2.response
    })));
    this.schema = schema;
    this.url = url;
    this.params = params;
    this.requestInit = requestInit;
    this.options = options;
  }
  #fetchPage(params) {
    return zodfetchCursorPage(this.schema, this.url, { ...this.params, ...params }, this.requestInit, this.options);
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
};
var OffsetLimitPagePromise = class extends ApiPromise {
  static {
    __name(this, "OffsetLimitPagePromise");
  }
  schema;
  url;
  params;
  requestInit;
  options;
  constructor(result, schema, url, params, requestInit, options) {
    super(result.then((result2) => ({
      data: new OffsetLimitPage(result2.data.data, result2.data.pagination, this.#fetchPage.bind(this)),
      response: result2.response
    })));
    this.schema = schema;
    this.url = url;
    this.params = params;
    this.requestInit = requestInit;
    this.options = options;
  }
  #fetchPage(params) {
    return zodfetchOffsetLimitPage(this.schema, this.url, { ...this.params, ...params }, this.requestInit, this.options);
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
};
async function waitForRetry(url, attempt, delay, options, requestInit, response) {
  if (options?.tracer) {
    const method = requestInit?.method ?? "GET";
    return options.tracer.startActiveSpan(response ? `wait after ${response.status}` : `wait after error`, async (span) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }, {
      attributes: {
        [SemanticInternalAttributes.STYLE_ICON]: "wait",
        ...accessoryAttributes({
          items: [
            {
              text: `retrying ${options?.name ?? method.toUpperCase()} in ${delay}ms`,
              variant: "normal"
            }
          ],
          style: "codepath"
        })
      }
    });
  }
  await new Promise((resolve) => setTimeout(resolve, delay));
}
__name(waitForRetry, "waitForRetry");
function injectPropagationHeadersIfInWorker(requestInit) {
  const headers = new Headers(requestInit?.headers);
  const headersObject = Object.fromEntries(headers.entries());
  propagation.inject(context.active(), headersObject);
  return {
    ...requestInit,
    headers: new Headers(headersObject)
  };
}
__name(injectPropagationHeadersIfInWorker, "injectPropagationHeadersIfInWorker");
function injectRequestIdempotencyKey(requestIdempotencyKey, requestInit) {
  const headers = new Headers(requestInit?.headers);
  headers.set("x-trigger-request-idempotency-key", requestIdempotencyKey);
  return {
    ...requestInit,
    headers
  };
}
__name(injectRequestIdempotencyKey, "injectRequestIdempotencyKey");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/runStream.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/errors.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/links.js
init_esm();
var links = {
  docs: {
    config: {
      home: "https://trigger.dev/docs/config/config-file",
      additionalPackages: "https://trigger.dev/docs/config/config-file#additionalpackages",
      extensions: "https://trigger.dev/docs/config/config-file#extensions",
      prisma: "https://trigger.dev/docs/config/config-file#prisma"
    },
    machines: {
      home: "https://trigger.dev/docs/v3/machines"
    },
    upgrade: {
      beta: "https://trigger.dev/docs/upgrading-beta"
    },
    troubleshooting: {
      concurrentWaits: "https://trigger.dev/docs/troubleshooting#parallel-waits-are-not-supported",
      stalledExecution: "https://trigger.dev/docs/troubleshooting#task-run-stalled-executing"
    },
    concurrency: {
      recursiveDeadlock: "https://trigger.dev/docs/queue-concurrency#waiting-for-a-subtask-on-the-same-queue",
      deadlock: "https://trigger.dev/docs/queue-concurrency#deadlock"
    },
    gitHubActions: {
      personalAccessToken: "https://trigger.dev/docs/github-actions#creating-a-personal-access-token"
    }
  },
  site: {
    home: "https://trigger.dev",
    contact: "https://trigger.dev/contact"
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/utils.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/errors.js
var MANUAL_OOM_KILL_ERROR_MESSAGE = "MANUAL_OOM_KILL_ERROR";
function isManualOutOfMemoryError(error) {
  if (error.type === "BUILT_IN_ERROR") {
    if (error.message && error.message === MANUAL_OOM_KILL_ERROR_MESSAGE) {
      return true;
    }
  }
  return false;
}
__name(isManualOutOfMemoryError, "isManualOutOfMemoryError");
function isCompleteTaskWithOutput(error) {
  return error instanceof Error && error.name === "CompleteTaskWithOutput";
}
__name(isCompleteTaskWithOutput, "isCompleteTaskWithOutput");
function createErrorTaskError(error) {
  switch (error.type) {
    case "BUILT_IN_ERROR": {
      const e = new Error(error.message);
      e.name = error.name;
      e.stack = error.stackTrace;
      return e;
    }
    case "STRING_ERROR": {
      return error.raw;
    }
    case "CUSTOM_ERROR": {
      return JSON.parse(error.raw);
    }
    case "INTERNAL_ERROR": {
      const e = new Error(error.message ?? `Internal error (${error.code})`);
      e.name = error.code;
      e.stack = error.stackTrace;
      return e;
    }
  }
}
__name(createErrorTaskError, "createErrorTaskError");
function createJsonErrorObject(error) {
  const enhancedError = taskRunErrorEnhancer(error);
  switch (enhancedError.type) {
    case "BUILT_IN_ERROR": {
      return {
        name: enhancedError.name,
        message: enhancedError.message,
        stackTrace: enhancedError.stackTrace
      };
    }
    case "STRING_ERROR": {
      return {
        message: enhancedError.raw
      };
    }
    case "CUSTOM_ERROR": {
      return {
        message: enhancedError.raw
      };
    }
    case "INTERNAL_ERROR": {
      return {
        message: `trigger.dev internal error (${enhancedError.code})`
      };
    }
  }
}
__name(createJsonErrorObject, "createJsonErrorObject");
var prettyInternalErrors = {
  TASK_PROCESS_OOM_KILLED: {
    message: "Your run was terminated due to exceeding the machine's memory limit. Try increasing the machine preset in your task options or replay using a larger machine.",
    link: {
      name: "Machines",
      href: links.docs.machines.home
    }
  },
  TASK_PROCESS_MAYBE_OOM_KILLED: {
    message: "Your run was terminated due to exceeding the machine's memory limit. Try increasing the machine preset in your task options or replay using a larger machine.",
    link: {
      name: "Machines",
      href: links.docs.machines.home
    }
  },
  TASK_PROCESS_SIGSEGV: {
    message: "Your task crashed with a segmentation fault (SIGSEGV). Most likely there's a bug in a package or binary you're using. If this keeps happening and you're unsure why, please get in touch.",
    link: {
      name: "Contact us",
      href: links.site.contact,
      magic: "CONTACT_FORM"
    }
  },
  TASK_PROCESS_SIGTERM: {
    message: "Your task exited after receiving SIGTERM but we don't know why. If this keeps happening, please get in touch so we can investigate.",
    link: {
      name: "Contact us",
      href: links.site.contact,
      magic: "CONTACT_FORM"
    }
  },
  OUTDATED_SDK_VERSION: {
    message: "Your task is using an outdated version of the SDK. Please upgrade to the latest version.",
    link: {
      name: "Beta upgrade guide",
      href: links.docs.upgrade.beta
    }
  },
  TASK_DID_CONCURRENT_WAIT: {
    message: "Parallel waits are not supported, e.g. using Promise.all() around our wait functions.",
    link: {
      name: "Read the docs for solutions",
      href: links.docs.troubleshooting.concurrentWaits
    }
  },
  RECURSIVE_WAIT_DEADLOCK: {
    message: "This run will never execute because it was triggered recursively and the task has no remaining concurrency available.",
    link: {
      name: "See docs for help",
      href: links.docs.concurrency.recursiveDeadlock
    }
  },
  TASK_RUN_STALLED_EXECUTING: {
    link: {
      name: "Read our troubleshooting guide",
      href: links.docs.troubleshooting.stalledExecution
    }
  }
};
var getPrettyTaskRunError = /* @__PURE__ */ __name((code) => {
  return {
    type: "INTERNAL_ERROR",
    code,
    ...prettyInternalErrors[code]
  };
}, "getPrettyTaskRunError");
var findSignalInMessage = /* @__PURE__ */ __name((message, truncateLength = 100) => {
  if (!message) {
    return;
  }
  const trunc = truncateLength ? message.slice(0, truncateLength) : message;
  if (trunc.includes("SIGTERM")) {
    return "SIGTERM";
  } else if (trunc.includes("SIGSEGV")) {
    return "SIGSEGV";
  } else if (trunc.includes("SIGKILL")) {
    return "SIGKILL";
  } else if (trunc.includes("SIGABRT")) {
    return "SIGABRT";
  } else {
    return;
  }
}, "findSignalInMessage");
function taskRunErrorEnhancer(error) {
  switch (error.type) {
    case "BUILT_IN_ERROR": {
      if (error.name === "UnexpectedExitError") {
        if (error.message.startsWith("Unexpected exit with code -1")) {
          const signal = findSignalInMessage(error.stackTrace);
          switch (signal) {
            case "SIGTERM":
              return {
                ...getPrettyTaskRunError("TASK_PROCESS_SIGTERM")
              };
            case "SIGSEGV":
              return {
                ...getPrettyTaskRunError("TASK_PROCESS_SIGSEGV")
              };
            case "SIGKILL":
              return {
                ...getPrettyTaskRunError("TASK_PROCESS_MAYBE_OOM_KILLED")
              };
            case "SIGABRT":
              return {
                ...getPrettyTaskRunError("TASK_PROCESS_MAYBE_OOM_KILLED")
              };
            default:
              return {
                ...getPrettyTaskRunError("TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE"),
                message: error.message,
                stackTrace: error.stackTrace
              };
          }
        }
      }
      if (error.name === "Error") {
        if (error.message === "ffmpeg was killed with signal SIGKILL") {
          return {
            ...getPrettyTaskRunError("TASK_PROCESS_OOM_KILLED")
          };
        }
      }
      if (isManualOutOfMemoryError(error)) {
        return {
          ...getPrettyTaskRunError("TASK_PROCESS_OOM_KILLED")
        };
      }
      if (error.name === "TriggerApiError") {
        if (error.message.startsWith("Deadlock detected:")) {
          return {
            type: "BUILT_IN_ERROR",
            name: "Concurrency Deadlock Error",
            message: error.message,
            stackTrace: "",
            link: {
              name: "Read the docs",
              href: links.docs.concurrency.deadlock
            }
          };
        }
      }
      break;
    }
    case "STRING_ERROR": {
      break;
    }
    case "CUSTOM_ERROR": {
      break;
    }
    case "INTERNAL_ERROR": {
      if (error.code === TaskRunErrorCodes.TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE) {
        const signal = findSignalInMessage(error.message);
        switch (signal) {
          case "SIGTERM":
            return {
              ...getPrettyTaskRunError("TASK_PROCESS_SIGTERM")
            };
          case "SIGSEGV":
            return {
              ...getPrettyTaskRunError("TASK_PROCESS_SIGSEGV")
            };
          case "SIGKILL":
            return {
              ...getPrettyTaskRunError("TASK_PROCESS_MAYBE_OOM_KILLED")
            };
          case "SIGABRT":
            return {
              ...getPrettyTaskRunError("TASK_PROCESS_MAYBE_OOM_KILLED")
            };
          default: {
            return {
              ...getPrettyTaskRunError("TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE"),
              message: error.message,
              stackTrace: error.stackTrace
            };
          }
        }
      }
      return {
        ...error,
        ...getPrettyTaskRunError(error.code)
      };
    }
  }
  return error;
}
__name(taskRunErrorEnhancer, "taskRunErrorEnhancer");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/getEnv.js
init_esm();
function getEnvVar(name2, defaultValue) {
  return o[name2] ?? defaultValue;
}
__name(getEnvVar, "getEnvVar");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/ioSerialization.js
init_esm();
var import_path = __toESM(require_lib(), 1);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClientManager-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClientManager/index.js
init_esm();
var API_NAME2 = "api-client";
var ApiClientMissingError = class extends Error {
  static {
    __name(this, "ApiClientMissingError");
  }
  constructor(message) {
    super(message);
    this.name = "ApiClientMissingError";
  }
};
var APIClientManagerAPI = class _APIClientManagerAPI {
  static {
    __name(this, "APIClientManagerAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _APIClientManagerAPI();
    }
    return this._instance;
  }
  disable() {
    unregisterGlobal(API_NAME2);
  }
  get baseURL() {
    const config = this.#getConfig();
    return config?.baseURL ?? getEnvVar("TRIGGER_API_URL") ?? "https://api.trigger.dev";
  }
  get accessToken() {
    const config = this.#getConfig();
    return config?.secretKey ?? config?.accessToken ?? getEnvVar("TRIGGER_SECRET_KEY") ?? getEnvVar("TRIGGER_ACCESS_TOKEN");
  }
  get branchName() {
    const config = this.#getConfig();
    const value = config?.previewBranch ?? getEnvVar("TRIGGER_PREVIEW_BRANCH") ?? getEnvVar("VERCEL_GIT_COMMIT_REF") ?? void 0;
    return value ? value : void 0;
  }
  get client() {
    if (!this.baseURL || !this.accessToken) {
      return void 0;
    }
    return new ApiClient(this.baseURL, this.accessToken, this.branchName);
  }
  clientOrThrow() {
    if (!this.baseURL || !this.accessToken) {
      throw new ApiClientMissingError(this.apiClientMissingError());
    }
    return new ApiClient(this.baseURL, this.accessToken, this.branchName);
  }
  runWithConfig(config, fn) {
    const originalConfig = this.#getConfig();
    const $config = { ...originalConfig, ...config };
    registerGlobal(API_NAME2, $config, true);
    return fn().finally(() => {
      registerGlobal(API_NAME2, originalConfig, true);
    });
  }
  setGlobalAPIClientConfiguration(config) {
    return registerGlobal(API_NAME2, config);
  }
  #getConfig() {
    return getGlobal(API_NAME2);
  }
  apiClientMissingError() {
    const hasBaseUrl = !!this.baseURL;
    const hasAccessToken = !!this.accessToken;
    if (!hasBaseUrl && !hasAccessToken) {
      return `You need to set the TRIGGER_API_URL and TRIGGER_SECRET_KEY environment variables. See https://trigger.dev/docs/management/overview#authentication`;
    } else if (!hasBaseUrl) {
      return `You need to set the TRIGGER_API_URL environment variable. See https://trigger.dev/docs/management/overview#authentication`;
    } else if (!hasAccessToken) {
      return `You need to set the TRIGGER_SECRET_KEY environment variable. See https://trigger.dev/docs/management/overview#authentication`;
    }
    return `Unknown error`;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClientManager-api.js
var apiClientManager = APIClientManagerAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/limits.js
init_esm();
function getOtelEnvVarLimit(key, defaultValue) {
  const value = getEnvVar(key);
  if (!value) {
    return defaultValue;
  }
  return parseInt(value, 10);
}
__name(getOtelEnvVarLimit, "getOtelEnvVarLimit");
var OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT", 1024);
var OTEL_LOG_ATTRIBUTE_COUNT_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_LOG_ATTRIBUTE_COUNT_LIMIT", 1024);
var OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT", 131072);
var OTEL_LOG_ATTRIBUTE_VALUE_LENGTH_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_LOG_ATTRIBUTE_VALUE_LENGTH_LIMIT", 131072);
var OTEL_SPAN_EVENT_COUNT_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_SPAN_EVENT_COUNT_LIMIT", 10);
var OTEL_LINK_COUNT_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_LINK_COUNT_LIMIT", 2);
var OTEL_ATTRIBUTE_PER_LINK_COUNT_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_ATTRIBUTE_PER_LINK_COUNT_LIMIT", 10);
var OTEL_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = getOtelEnvVarLimit("TRIGGER_OTEL_ATTRIBUTE_PER_EVENT_COUNT_LIMIT", 10);
var OFFLOAD_IO_PACKET_LENGTH_LIMIT = 128 * 1024;

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/zodfetch.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/ioSerialization.js
async function parsePacket(value, options) {
  if (!value.data) {
    return void 0;
  }
  switch (value.dataType) {
    case "application/json":
      return JSON.parse(value.data, makeSafeReviver(options));
    case "application/super+json":
      const { parse } = await loadSuperJSON();
      return parse(value.data);
    case "text/plain":
      return value.data;
    case "application/store":
      throw new Error(`Cannot parse an application/store packet (${value.data}). Needs to be imported first.`);
    default:
      return value.data;
  }
}
__name(parsePacket, "parsePacket");
async function conditionallyImportAndParsePacket(value, client) {
  const importedPacket = await conditionallyImportPacket(value, void 0, client);
  return await parsePacket(importedPacket);
}
__name(conditionallyImportAndParsePacket, "conditionallyImportAndParsePacket");
async function stringifyIO(value) {
  if (value === void 0) {
    return { dataType: "application/json" };
  }
  if (typeof value === "string") {
    return { data: value, dataType: "text/plain" };
  }
  try {
    const { stringify } = await loadSuperJSON();
    const data = stringify(value);
    return { data, dataType: "application/super+json" };
  } catch {
    return { data: value, dataType: "application/json" };
  }
}
__name(stringifyIO, "stringifyIO");
var ioRetryOptions = {
  minTimeoutInMs: 500,
  maxTimeoutInMs: 5e3,
  maxAttempts: 5,
  factor: 2,
  randomize: true
};
async function conditionallyImportPacket(packet, tracer2, client) {
  if (packet.dataType !== "application/store") {
    return packet;
  }
  if (!tracer2) {
    return await importPacket(packet, void 0, client);
  } else {
    const result = await tracer2.startActiveSpan("store.downloadPayload", async (span) => {
      return await importPacket(packet, span, client);
    }, {
      attributes: {
        [SemanticInternalAttributes.STYLE_ICON]: "cloud-download"
      }
    });
    return result ?? packet;
  }
}
__name(conditionallyImportPacket, "conditionallyImportPacket");
async function importPacket(packet, span, client) {
  if (!packet.data) {
    return packet;
  }
  const $client = client ?? apiClientManager.client;
  if (!$client) {
    return packet;
  }
  const presignedResponse = await $client.getPayloadUrl(packet.data);
  const response = await zodfetch(external_exports.any(), presignedResponse.presignedUrl, void 0, {
    retry: ioRetryOptions
  }).asResponse();
  if (!response.ok) {
    throw new Error(`Failed to import packet ${presignedResponse.presignedUrl}: ${response.statusText}`);
  }
  const data = await response.text();
  span?.setAttribute("size", Buffer.byteLength(data, "utf8"));
  return {
    data,
    dataType: response.headers.get("content-type") ?? "application/json"
  };
}
__name(importPacket, "importPacket");
function makeSafeReviver(options) {
  if (!options) {
    return void 0;
  }
  return /* @__PURE__ */ __name(function reviver(key, value) {
    if (options?.filteredKeys?.includes(key)) {
      return void 0;
    }
    return value;
  }, "reviver");
}
__name(makeSafeReviver, "makeSafeReviver");
async function loadSuperJSON() {
  const superjson = await import("./dist-GOEAEOWJ.mjs");
  superjson.registerCustom({
    isApplicable: /* @__PURE__ */ __name((v) => typeof Buffer === "function" && Buffer.isBuffer(v), "isApplicable"),
    serialize: /* @__PURE__ */ __name((v) => [...v], "serialize"),
    deserialize: /* @__PURE__ */ __name((v) => Buffer.from(v), "deserialize")
  }, "buffer");
  return superjson;
}
__name(loadSuperJSON, "loadSuperJSON");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/stream.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/streams/asyncIterableStream.js
init_esm();
function createAsyncIterableStream(source, transformer) {
  const transformedStream = source.pipeThrough(new TransformStream(transformer));
  transformedStream[Symbol.asyncIterator] = () => {
    const reader = transformedStream.getReader();
    return {
      async next() {
        const { done, value } = await reader.read();
        return done ? { done: true, value: void 0 } : { done: false, value };
      }
    };
  };
  return transformedStream;
}
__name(createAsyncIterableStream, "createAsyncIterableStream");
function createAsyncIterableReadable(source, transformer, signal) {
  return new ReadableStream({
    async start(controller) {
      const transformedStream = source.pipeThrough(new TransformStream(transformer));
      const reader = transformedStream.getReader();
      signal.addEventListener("abort", () => {
        queueMicrotask(() => {
          reader.cancel();
          controller.close();
        });
      });
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          break;
        }
        controller.enqueue(value);
      }
    }
  });
}
__name(createAsyncIterableReadable, "createAsyncIterableReadable");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/version.js
init_esm();
var API_VERSION = "2025-07-16";
var API_VERSION_HEADER_NAME = "x-trigger-api-version";

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/stream.js
function zodShapeStream(schema, url, options) {
  const abortController = new AbortController();
  options?.signal?.addEventListener("abort", () => {
    abortController.abort();
  }, { once: true });
  const shapeStream = new ShapeStream({
    url,
    headers: {
      ...options?.headers,
      "x-trigger-electric-version": "1.0.0-beta.1",
      [API_VERSION_HEADER_NAME]: API_VERSION
    },
    fetchClient: options?.fetchClient,
    signal: abortController.signal,
    onError: /* @__PURE__ */ __name((e) => {
      options?.onError?.(e);
    }, "onError")
  });
  const readableShape = new ReadableShapeStream(shapeStream);
  const stream2 = readableShape.stream.pipeThrough(new TransformStream({
    async transform(chunk, controller) {
      const result = schema.safeParse(chunk);
      if (result.success) {
        controller.enqueue(result.data);
      } else {
        controller.error(new Error(`Unable to parse shape: ${result.error.message}`));
      }
    }
  }));
  return {
    stream: stream2,
    stop: /* @__PURE__ */ __name((delay) => {
      if (delay) {
        setTimeout(() => {
          if (abortController.signal.aborted)
            return;
          abortController.abort();
        }, delay);
      } else {
        abortController.abort();
      }
    }, "stop")
  };
}
__name(zodShapeStream, "zodShapeStream");
var ReadableShapeStream = class {
  static {
    __name(this, "ReadableShapeStream");
  }
  #stream;
  #currentState = /* @__PURE__ */ new Map();
  #changeStream;
  #error = false;
  #unsubscribe;
  #isStreamClosed = false;
  stop() {
    this.#isStreamClosed = true;
    this.#unsubscribe?.();
  }
  constructor(stream2) {
    this.#stream = stream2;
    const source = new ReadableStream({
      start: /* @__PURE__ */ __name((controller) => {
        this.#unsubscribe = this.#stream.subscribe((messages) => {
          if (!this.#isStreamClosed) {
            controller.enqueue(messages);
          }
        }, this.#handleError.bind(this));
      }, "start"),
      cancel: /* @__PURE__ */ __name(() => {
        this.#isStreamClosed = true;
        this.#unsubscribe?.();
      }, "cancel")
    });
    let updatedKeys = /* @__PURE__ */ new Set();
    this.#changeStream = createAsyncIterableStream(source, {
      transform: /* @__PURE__ */ __name((messages, controller) => {
        if (this.#isStreamClosed) {
          return;
        }
        try {
          let isUpToDate = false;
          for (const message of messages) {
            if (isChangeMessage(message)) {
              const key = message.key;
              switch (message.headers.operation) {
                case "insert": {
                  this.#currentState.set(key, message.value);
                  updatedKeys.add(key);
                  break;
                }
                case "update": {
                  const existingRow = this.#currentState.get(key);
                  const updatedRow = existingRow ? { ...existingRow, ...message.value } : message.value;
                  this.#currentState.set(key, updatedRow);
                  updatedKeys.add(key);
                  break;
                }
              }
            } else if (isControlMessage(message)) {
              if (message.headers.control === "must-refetch") {
                this.#currentState.clear();
                this.#error = false;
              } else if (message.headers.control === "up-to-date") {
                isUpToDate = true;
              }
            }
          }
          if (!this.#isStreamClosed && isUpToDate) {
            for (const key of updatedKeys) {
              const finalRow = this.#currentState.get(key);
              if (finalRow) {
                controller.enqueue(finalRow);
              }
            }
            updatedKeys.clear();
          }
        } catch (error) {
          console.error("Error processing stream messages:", error);
          this.#handleError(error);
        }
      }, "transform")
    });
  }
  get stream() {
    return this.#changeStream;
  }
  get isUpToDate() {
    return this.#stream.isUpToDate;
  }
  get lastOffset() {
    return this.#stream.lastOffset;
  }
  get handle() {
    return this.#stream.shapeHandle;
  }
  get error() {
    return this.#error;
  }
  lastSyncedAt() {
    return this.#stream.lastSyncedAt();
  }
  lastSynced() {
    return this.#stream.lastSynced();
  }
  isLoading() {
    return this.#stream.isLoading();
  }
  isConnected() {
    return this.#stream.isConnected();
  }
  #handleError(e) {
    if (e instanceof FetchError) {
      this.#error = e;
    }
    this.#isStreamClosed = true;
    this.#unsubscribe?.();
  }
};
var LineTransformStream = class extends TransformStream {
  static {
    __name(this, "LineTransformStream");
  }
  buffer = "";
  constructor() {
    super({
      transform: /* @__PURE__ */ __name((chunk, controller) => {
        this.buffer += chunk;
        const lines = this.buffer.split("\n");
        this.buffer = lines.pop() || "";
        const fullLines = lines.filter((line) => line.trim().length > 0);
        if (fullLines.length > 0) {
          controller.enqueue(fullLines);
        }
      }, "transform"),
      flush: /* @__PURE__ */ __name((controller) => {
        const trimmed = this.buffer.trim();
        if (trimmed.length > 0) {
          controller.enqueue([trimmed]);
        }
      }, "flush")
    });
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/runStream.js
function runShapeStream(url, options) {
  const abortController = new AbortController();
  const streamFactory = new SSEStreamSubscriptionFactory(getEnvVar("TRIGGER_STREAM_URL", getEnvVar("TRIGGER_API_URL")) ?? "https://api.trigger.dev", {
    headers: options?.headers,
    signal: abortController.signal
  });
  options?.signal?.addEventListener("abort", () => {
    if (!abortController.signal.aborted) {
      abortController.abort();
    }
  }, { once: true });
  const runStreamInstance = zodShapeStream(SubscribeRunRawShape, url, {
    ...options,
    signal: abortController.signal,
    onError: /* @__PURE__ */ __name((e) => {
      options?.onFetchError?.(e);
    }, "onError")
  });
  const $options = {
    runShapeStream: runStreamInstance.stream,
    stopRunShapeStream: /* @__PURE__ */ __name(() => runStreamInstance.stop(30 * 1e3), "stopRunShapeStream"),
    streamFactory,
    abortController,
    ...options
  };
  return new RunSubscription($options);
}
__name(runShapeStream, "runShapeStream");
var SSEStreamSubscription = class {
  static {
    __name(this, "SSEStreamSubscription");
  }
  url;
  options;
  constructor(url, options) {
    this.url = url;
    this.options = options;
  }
  async subscribe() {
    return fetch(this.url, {
      headers: {
        Accept: "text/event-stream",
        ...this.options.headers
      },
      signal: this.options.signal
    }).then((response) => {
      if (!response.ok) {
        throw ApiError.generate(response.status, {}, "Could not subscribe to stream", Object.fromEntries(response.headers));
      }
      if (!response.body) {
        throw new Error("No response body");
      }
      return response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).pipeThrough(new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(safeParseJSON(chunk.data));
        }
      }));
    });
  }
};
var SSEStreamSubscriptionFactory = class {
  static {
    __name(this, "SSEStreamSubscriptionFactory");
  }
  baseUrl;
  options;
  constructor(baseUrl, options) {
    this.baseUrl = baseUrl;
    this.options = options;
  }
  createSubscription(runId, streamKey, baseUrl) {
    if (!runId || !streamKey) {
      throw new Error("runId and streamKey are required");
    }
    const url = `${baseUrl ?? this.baseUrl}/realtime/v1/streams/${runId}/${streamKey}`;
    return new SSEStreamSubscription(url, this.options);
  }
};
var RunSubscription = class {
  static {
    __name(this, "RunSubscription");
  }
  options;
  stream;
  packetCache = /* @__PURE__ */ new Map();
  _closeOnComplete;
  _isRunComplete = false;
  constructor(options) {
    this.options = options;
    this._closeOnComplete = typeof options.closeOnComplete === "undefined" ? true : options.closeOnComplete;
    this.stream = createAsyncIterableReadable(this.options.runShapeStream, {
      transform: /* @__PURE__ */ __name(async (chunk, controller) => {
        const run = await this.transformRunShape(chunk);
        controller.enqueue(run);
        this._isRunComplete = !!run.finishedAt;
        if (this._closeOnComplete && this._isRunComplete && !this.options.abortController.signal.aborted) {
          this.options.stopRunShapeStream();
        }
      }, "transform")
    }, this.options.abortController.signal);
  }
  unsubscribe() {
    if (!this.options.abortController.signal.aborted) {
      this.options.abortController.abort();
    }
    this.options.stopRunShapeStream();
  }
  [Symbol.asyncIterator]() {
    return this.stream[Symbol.asyncIterator]();
  }
  getReader() {
    return this.stream.getReader();
  }
  withStreams() {
    const activeStreams = /* @__PURE__ */ new Set();
    return createAsyncIterableReadable(this.stream, {
      transform: /* @__PURE__ */ __name(async (run, controller) => {
        controller.enqueue({
          type: "run",
          run
        });
        if (run.metadata && "$$streams" in run.metadata && Array.isArray(run.metadata.$$streams)) {
          for (const streamKey of run.metadata.$$streams) {
            if (typeof streamKey !== "string") {
              continue;
            }
            if (!activeStreams.has(streamKey)) {
              activeStreams.add(streamKey);
              const subscription = this.options.streamFactory.createSubscription(run.id, streamKey, this.options.client?.baseUrl);
              subscription.subscribe().then((stream2) => {
                stream2.pipeThrough(new TransformStream({
                  transform(chunk, controller2) {
                    controller2.enqueue({
                      type: streamKey,
                      chunk,
                      run
                    });
                  }
                })).pipeTo(new WritableStream({
                  write(chunk) {
                    controller.enqueue(chunk);
                  }
                })).catch((error) => {
                  console.error(`Error in stream ${streamKey}:`, error);
                });
              }).catch((error) => {
                console.error(`Error subscribing to stream ${streamKey}:`, error);
              });
            }
          }
        }
      }, "transform")
    }, this.options.abortController.signal);
  }
  async transformRunShape(row) {
    const payloadPacket = row.payloadType ? { data: row.payload ?? void 0, dataType: row.payloadType } : void 0;
    const outputPacket = row.outputType ? { data: row.output ?? void 0, dataType: row.outputType } : void 0;
    const [payload, output] = await Promise.all([
      { packet: payloadPacket, key: "payload" },
      { packet: outputPacket, key: "output" }
    ].map(async ({ packet, key }) => {
      if (!packet) {
        return;
      }
      const cachedResult = this.packetCache.get(`${row.friendlyId}/${key}`);
      if (typeof cachedResult !== "undefined") {
        return cachedResult;
      }
      const result = await conditionallyImportAndParsePacket(packet, this.options.client);
      this.packetCache.set(`${row.friendlyId}/${key}`, result);
      return result;
    }));
    const metadata2 = row.metadata && row.metadataType ? await parsePacket({ data: row.metadata, dataType: row.metadataType }) : void 0;
    const status = apiStatusFromRunStatus(row.status);
    return {
      id: row.friendlyId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      taskIdentifier: row.taskIdentifier,
      status,
      payload,
      output,
      durationMs: row.usageDurationMs ?? 0,
      costInCents: row.costInCents ?? 0,
      baseCostInCents: row.baseCostInCents ?? 0,
      tags: row.runTags ?? [],
      idempotencyKey: row.idempotencyKey ?? void 0,
      expiredAt: row.expiredAt ?? void 0,
      finishedAt: row.completedAt ?? void 0,
      startedAt: row.startedAt ?? void 0,
      delayedUntil: row.delayUntil ?? void 0,
      queuedAt: row.queuedAt ?? void 0,
      error: row.error ? createJsonErrorObject(row.error) : void 0,
      isTest: row.isTest ?? false,
      metadata: metadata2,
      ...booleanHelpersFromRunStatus(status)
    };
  }
};
var queuedStatuses = ["PENDING_VERSION", "QUEUED", "PENDING", "DELAYED"];
var waitingStatuses = ["WAITING"];
var executingStatuses = ["DEQUEUED", "EXECUTING"];
var failedStatuses = ["FAILED", "CRASHED", "SYSTEM_FAILURE", "EXPIRED", "TIMED_OUT"];
var successfulStatuses = ["COMPLETED"];
function booleanHelpersFromRunStatus(status) {
  return {
    isQueued: queuedStatuses.includes(status),
    isWaiting: waitingStatuses.includes(status),
    isExecuting: executingStatuses.includes(status),
    isCompleted: successfulStatuses.includes(status) || failedStatuses.includes(status),
    isFailed: failedStatuses.includes(status),
    isSuccess: successfulStatuses.includes(status),
    isCancelled: status === "CANCELED"
  };
}
__name(booleanHelpersFromRunStatus, "booleanHelpersFromRunStatus");
function apiStatusFromRunStatus(status) {
  switch (status) {
    case "DELAYED": {
      return "DELAYED";
    }
    case "WAITING_FOR_DEPLOY":
    case "PENDING_VERSION": {
      return "PENDING_VERSION";
    }
    case "PENDING": {
      return "QUEUED";
    }
    case "PAUSED":
    case "WAITING_TO_RESUME": {
      return "WAITING";
    }
    case "DEQUEUED": {
      return "DEQUEUED";
    }
    case "RETRYING_AFTER_FAILURE":
    case "EXECUTING": {
      return "EXECUTING";
    }
    case "CANCELED": {
      return "CANCELED";
    }
    case "COMPLETED_SUCCESSFULLY": {
      return "COMPLETED";
    }
    case "SYSTEM_FAILURE": {
      return "SYSTEM_FAILURE";
    }
    case "CRASHED": {
      return "CRASHED";
    }
    case "INTERRUPTED":
    case "COMPLETED_WITH_ERRORS": {
      return "FAILED";
    }
    case "EXPIRED": {
      return "EXPIRED";
    }
    case "TIMED_OUT": {
      return "TIMED_OUT";
    }
    default: {
      return "QUEUED";
    }
  }
}
__name(apiStatusFromRunStatus, "apiStatusFromRunStatus");
function safeParseJSON(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}
__name(safeParseJSON, "safeParseJSON");
var isSafari = /* @__PURE__ */ __name(() => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined" && typeof navigator.userAgent === "string") {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent);
  }
  return false;
}, "isSafari");
if (isSafari()) {
  ReadableStream.prototype.values ??= function({ preventCancel = false } = {}) {
    const reader = this.getReader();
    return {
      async next() {
        try {
          const result = await reader.read();
          if (result.done) {
            reader.releaseLock();
          }
          return {
            done: result.done,
            value: result.value
          };
        } catch (e) {
          reader.releaseLock();
          throw e;
        }
      },
      async return(value) {
        if (!preventCancel) {
          const cancelPromise = reader.cancel(value);
          reader.releaseLock();
          await cancelPromise;
        } else {
          reader.releaseLock();
        }
        return { done: true, value };
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  };
  ReadableStream.prototype[Symbol.asyncIterator] ??= ReadableStream.prototype.values;
}

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/getBranch.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/index.js
var DEFAULT_ZOD_FETCH_OPTIONS = {
  retry: {
    maxAttempts: 5,
    minTimeoutInMs: 1e3,
    maxTimeoutInMs: 3e4,
    factor: 1.6,
    randomize: false
  }
};
var ApiClient = class {
  static {
    __name(this, "ApiClient");
  }
  baseUrl;
  accessToken;
  previewBranch;
  defaultRequestOptions;
  constructor(baseUrl, accessToken, previewBranch, requestOptions = {}) {
    this.accessToken = accessToken;
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.previewBranch = previewBranch;
    this.defaultRequestOptions = mergeRequestOptions(DEFAULT_ZOD_FETCH_OPTIONS, requestOptions);
  }
  get fetchClient() {
    const headers = this.#getHeaders(false);
    const fetchClient = /* @__PURE__ */ __name((input, requestInit) => {
      const $requestInit = {
        ...requestInit,
        headers: {
          ...requestInit?.headers,
          ...headers
        }
      };
      return fetch(input, $requestInit);
    }, "fetchClient");
    return fetchClient;
  }
  getHeaders() {
    return this.#getHeaders(false);
  }
  async getRunResult(runId, requestOptions) {
    try {
      return await zodfetch(TaskRunExecutionResult, `${this.baseUrl}/api/v1/runs/${runId}/result`, {
        method: "GET",
        headers: this.#getHeaders(false)
      }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          return void 0;
        }
      }
      throw error;
    }
  }
  async getBatchResults(batchId, requestOptions) {
    return await zodfetch(BatchTaskRunExecutionResult, `${this.baseUrl}/api/v1/batches/${batchId}/results`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  triggerTask(taskId, body, clientOptions, requestOptions) {
    const encodedTaskId = encodeURIComponent(taskId);
    return zodfetch(TriggerTaskResponse, `${this.baseUrl}/api/v1/tasks/${encodedTaskId}/trigger`, {
      method: "POST",
      headers: this.#getHeaders(clientOptions?.spanParentAsLink ?? false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions)).withResponse().then(async ({ data, response }) => {
      const jwtHeader = response.headers.get("x-trigger-jwt");
      if (typeof jwtHeader === "string") {
        return {
          ...data,
          publicAccessToken: jwtHeader
        };
      }
      const claimsHeader = response.headers.get("x-trigger-jwt-claims");
      const claims = claimsHeader ? JSON.parse(claimsHeader) : void 0;
      const jwt = await generateJWT({
        secretKey: this.accessToken,
        payload: {
          ...claims,
          scopes: [`read:runs:${data.id}`]
        },
        expirationTime: requestOptions?.publicAccessToken?.expirationTime ?? "1h"
      });
      return {
        ...data,
        publicAccessToken: jwt
      };
    });
  }
  batchTriggerV3(body, clientOptions, requestOptions) {
    return zodfetch(BatchTriggerTaskV3Response, `${this.baseUrl}/api/v2/tasks/batch`, {
      method: "POST",
      headers: this.#getHeaders(clientOptions?.spanParentAsLink ?? false, {
        "batch-processing-strategy": clientOptions?.processingStrategy
      }),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions)).withResponse().then(async ({ data, response }) => {
      const claimsHeader = response.headers.get("x-trigger-jwt-claims");
      const claims = claimsHeader ? JSON.parse(claimsHeader) : void 0;
      const jwt = await generateJWT({
        secretKey: this.accessToken,
        payload: {
          ...claims,
          scopes: [`read:batch:${data.id}`]
        },
        expirationTime: requestOptions?.publicAccessToken?.expirationTime ?? "1h"
      });
      return {
        ...data,
        publicAccessToken: jwt
      };
    });
  }
  createUploadPayloadUrl(filename, requestOptions) {
    return zodfetch(CreateUploadPayloadUrlResponseBody, `${this.baseUrl}/api/v1/packets/${filename}`, {
      method: "PUT",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  getPayloadUrl(filename, requestOptions) {
    return zodfetch(CreateUploadPayloadUrlResponseBody, `${this.baseUrl}/api/v1/packets/${filename}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  retrieveRun(runId, requestOptions) {
    return zodfetch(RetrieveRunResponse, `${this.baseUrl}/api/v3/runs/${runId}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  retrieveRunTrace(runId, requestOptions) {
    return zodfetch(RetrieveRunTraceResponseBody, `${this.baseUrl}/api/v1/runs/${runId}/trace`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  listRuns(query, requestOptions) {
    const searchParams = createSearchQueryForListRuns(query);
    return zodfetchCursorPage(ListRunResponseItem, `${this.baseUrl}/api/v1/runs`, {
      query: searchParams,
      limit: query?.limit,
      after: query?.after,
      before: query?.before
    }, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  listProjectRuns(projectRef, query, requestOptions) {
    const searchParams = createSearchQueryForListRuns(query);
    if (query?.env) {
      searchParams.append("filter[env]", Array.isArray(query.env) ? query.env.join(",") : query.env);
    }
    return zodfetchCursorPage(ListRunResponseItem, `${this.baseUrl}/api/v1/projects/${projectRef}/runs`, {
      query: searchParams,
      limit: query?.limit,
      after: query?.after,
      before: query?.before
    }, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  replayRun(runId, requestOptions) {
    return zodfetch(ReplayRunResponse, `${this.baseUrl}/api/v1/runs/${runId}/replay`, {
      method: "POST",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  cancelRun(runId, requestOptions) {
    return zodfetch(CanceledRunResponse, `${this.baseUrl}/api/v2/runs/${runId}/cancel`, {
      method: "POST",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  rescheduleRun(runId, body, requestOptions) {
    return zodfetch(RetrieveRunResponse, `${this.baseUrl}/api/v1/runs/${runId}/reschedule`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  listRunEvents(runId, requestOptions) {
    return zodfetch(
      external_exports.any(),
      // TODO: define a proper schema for this
      `${this.baseUrl}/api/v1/runs/${runId}/events`,
      {
        method: "GET",
        headers: this.#getHeaders(false)
      },
      mergeRequestOptions(this.defaultRequestOptions, requestOptions)
    );
  }
  addTags(runId, body, requestOptions) {
    return zodfetch(external_exports.object({ message: external_exports.string() }), `${this.baseUrl}/api/v1/runs/${runId}/tags`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  createSchedule(options, requestOptions) {
    return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(options)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  listSchedules(options, requestOptions) {
    const searchParams = new URLSearchParams();
    if (options?.page) {
      searchParams.append("page", options.page.toString());
    }
    if (options?.perPage) {
      searchParams.append("perPage", options.perPage.toString());
    }
    return zodfetchOffsetLimitPage(ScheduleObject, `${this.baseUrl}/api/v1/schedules`, {
      page: options?.page,
      limit: options?.perPage
    }, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  retrieveSchedule(scheduleId, requestOptions) {
    return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  updateSchedule(scheduleId, options, requestOptions) {
    return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
      method: "PUT",
      headers: this.#getHeaders(false),
      body: JSON.stringify(options)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  deactivateSchedule(scheduleId, requestOptions) {
    return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}/deactivate`, {
      method: "POST",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  activateSchedule(scheduleId, requestOptions) {
    return zodfetch(ScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}/activate`, {
      method: "POST",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  deleteSchedule(scheduleId, requestOptions) {
    return zodfetch(DeletedScheduleObject, `${this.baseUrl}/api/v1/schedules/${scheduleId}`, {
      method: "DELETE",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  listEnvVars(projectRef, slug, requestOptions) {
    return zodfetch(external_exports.array(EnvironmentVariableWithSecret), `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  importEnvVars(projectRef, slug, body, requestOptions) {
    return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/import`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  retrieveEnvVar(projectRef, slug, key, requestOptions) {
    return zodfetch(EnvironmentVariableWithSecret, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  createEnvVar(projectRef, slug, body, requestOptions) {
    return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  updateEnvVar(projectRef, slug, key, body, requestOptions) {
    return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
      method: "PUT",
      headers: this.#getHeaders(false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  deleteEnvVar(projectRef, slug, key, requestOptions) {
    return zodfetch(EnvironmentVariableResponseBody, `${this.baseUrl}/api/v1/projects/${projectRef}/envvars/${slug}/${key}`, {
      method: "DELETE",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  updateRunMetadata(runId, body, requestOptions) {
    return zodfetch(UpdateMetadataResponseBody, `${this.baseUrl}/api/v1/runs/${runId}/metadata`, {
      method: "PUT",
      headers: this.#getHeaders(false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  getRunMetadata(runId, requestOptions) {
    return zodfetch(UpdateMetadataResponseBody, `${this.baseUrl}/api/v1/runs/${runId}/metadata`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  createWaitpointToken(options, requestOptions) {
    return zodfetch(CreateWaitpointTokenResponseBody, `${this.baseUrl}/api/v1/waitpoints/tokens`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(options)
    }, {
      ...mergeRequestOptions(this.defaultRequestOptions, requestOptions),
      prepareData: /* @__PURE__ */ __name(async (data, response) => {
        const jwtHeader = response.headers.get("x-trigger-jwt");
        if (typeof jwtHeader === "string") {
          return {
            ...data,
            publicAccessToken: jwtHeader
          };
        }
        const claimsHeader = response.headers.get("x-trigger-jwt-claims");
        const claims = claimsHeader ? JSON.parse(claimsHeader) : void 0;
        const jwt = await generateJWT({
          secretKey: this.accessToken,
          payload: {
            ...claims,
            scopes: [`write:waitpoints:${data.id}`]
          },
          expirationTime: "24h"
        });
        return {
          ...data,
          publicAccessToken: jwt
        };
      }, "prepareData")
    });
  }
  listWaitpointTokens(params, requestOptions) {
    const searchParams = createSearchQueryForListWaitpointTokens(params);
    return zodfetchCursorPage(WaitpointTokenItem, `${this.baseUrl}/api/v1/waitpoints/tokens`, {
      query: searchParams,
      limit: params?.limit,
      after: params?.after,
      before: params?.before
    }, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  retrieveWaitpointToken(friendlyId, requestOptions) {
    return zodfetch(WaitpointRetrieveTokenResponse, `${this.baseUrl}/api/v1/waitpoints/tokens/${friendlyId}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  completeWaitpointToken(friendlyId, options, requestOptions) {
    return zodfetch(CompleteWaitpointTokenResponseBody, `${this.baseUrl}/api/v1/waitpoints/tokens/${friendlyId}/complete`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(options)
    }, {
      ...mergeRequestOptions(this.defaultRequestOptions, requestOptions)
    });
  }
  waitForWaitpointToken({ runFriendlyId, waitpointFriendlyId }, requestOptions) {
    return zodfetch(WaitForWaitpointTokenResponseBody, `${this.baseUrl}/engine/v1/runs/${runFriendlyId}/waitpoints/tokens/${waitpointFriendlyId}/wait`, {
      method: "POST",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  async waitForDuration(runId, body, requestOptions) {
    return zodfetch(WaitForDurationResponseBody, `${this.baseUrl}/engine/v1/runs/${runId}/wait/duration`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify(body)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  listQueues(options, requestOptions) {
    const searchParams = new URLSearchParams();
    if (options?.page) {
      searchParams.append("page", options.page.toString());
    }
    if (options?.perPage) {
      searchParams.append("perPage", options.perPage.toString());
    }
    return zodfetchOffsetLimitPage(QueueItem, `${this.baseUrl}/api/v1/queues`, {
      page: options?.page,
      limit: options?.perPage
    }, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  retrieveQueue(queue2, requestOptions) {
    const type = typeof queue2 === "string" ? "id" : queue2.type;
    const value = typeof queue2 === "string" ? queue2 : queue2.name;
    const encodedValue = encodeURIComponent(value.replace(/\//g, "%2F"));
    return zodfetch(QueueItem, `${this.baseUrl}/api/v1/queues/${encodedValue}?type=${type}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  pauseQueue(queue2, action, requestOptions) {
    const type = typeof queue2 === "string" ? "id" : queue2.type;
    const value = typeof queue2 === "string" ? queue2 : queue2.name;
    const encodedValue = encodeURIComponent(value.replace(/\//g, "%2F"));
    return zodfetch(QueueItem, `${this.baseUrl}/api/v1/queues/${encodedValue}/pause`, {
      method: "POST",
      headers: this.#getHeaders(false),
      body: JSON.stringify({
        type,
        action
      })
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  subscribeToRun(runId, options) {
    const queryParams = new URLSearchParams();
    if (options?.skipColumns) {
      queryParams.append("skipColumns", options.skipColumns.join(","));
    }
    return runShapeStream(`${this.baseUrl}/realtime/v1/runs/${runId}${queryParams ? `?${queryParams}` : ""}`, {
      closeOnComplete: typeof options?.closeOnComplete === "boolean" ? options.closeOnComplete : true,
      headers: this.#getRealtimeHeaders(),
      client: this,
      signal: options?.signal,
      onFetchError: options?.onFetchError
    });
  }
  subscribeToRunsWithTag(tag, filters, options) {
    const searchParams = createSearchQueryForSubscribeToRuns({
      tags: tag,
      ...filters ? { createdAt: filters.createdAt } : {},
      ...filters?.skipColumns ? { skipColumns: filters.skipColumns } : {}
    });
    return runShapeStream(`${this.baseUrl}/realtime/v1/runs${searchParams ? `?${searchParams}` : ""}`, {
      closeOnComplete: false,
      headers: this.#getRealtimeHeaders(),
      client: this,
      signal: options?.signal,
      onFetchError: options?.onFetchError
    });
  }
  subscribeToBatch(batchId, options) {
    const queryParams = new URLSearchParams();
    if (options?.skipColumns) {
      queryParams.append("skipColumns", options.skipColumns.join(","));
    }
    return runShapeStream(`${this.baseUrl}/realtime/v1/batches/${batchId}${queryParams ? `?${queryParams}` : ""}`, {
      closeOnComplete: false,
      headers: this.#getRealtimeHeaders(),
      client: this,
      signal: options?.signal,
      onFetchError: options?.onFetchError
    });
  }
  listDeployments(options, requestOptions) {
    const searchParams = new URLSearchParams();
    if (options?.status) {
      searchParams.append("status", options.status);
    }
    if (options?.period) {
      searchParams.append("period", options.period);
    }
    if (options?.from) {
      searchParams.append("from", options.from);
    }
    if (options?.to) {
      searchParams.append("to", options.to);
    }
    return zodfetchCursorPage(ApiDeploymentListResponseItem, `${this.baseUrl}/api/v1/deployments`, {
      query: searchParams,
      after: options?.cursor,
      limit: options?.limit
    }, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  async fetchStream(runId, streamKey, options) {
    const streamFactory = new SSEStreamSubscriptionFactory(options?.baseUrl ?? this.baseUrl, {
      headers: this.getHeaders(),
      signal: options?.signal
    });
    const subscription = streamFactory.createSubscription(runId, streamKey);
    const stream2 = await subscription.subscribe();
    return stream2;
  }
  async generateJWTClaims(requestOptions) {
    return zodfetch(external_exports.record(external_exports.any()), `${this.baseUrl}/api/v1/auth/jwt/claims`, {
      method: "POST",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  retrieveBatch(batchId, requestOptions) {
    return zodfetch(RetrieveBatchV2Response, `${this.baseUrl}/api/v2/batches/${batchId}`, {
      method: "GET",
      headers: this.#getHeaders(false)
    }, mergeRequestOptions(this.defaultRequestOptions, requestOptions));
  }
  #getHeaders(spanParentAsLink, additionalHeaders) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
      "trigger-version": VERSION,
      ...Object.entries(additionalHeaders ?? {}).reduce((acc, [key, value]) => {
        if (value !== void 0) {
          acc[key] = value;
        }
        return acc;
      }, {})
    };
    if (this.previewBranch) {
      headers["x-trigger-branch"] = this.previewBranch;
    }
    if (taskContext.isInsideTask) {
      headers["x-trigger-worker"] = "true";
      headers["x-trigger-engine-version"] = "V2";
      if (spanParentAsLink) {
        headers["x-trigger-span-parent-as-link"] = "1";
      }
    }
    if (typeof window !== "undefined" && typeof window.document !== "undefined") {
      headers["x-trigger-client"] = "browser";
    }
    headers[API_VERSION_HEADER_NAME] = API_VERSION;
    return headers;
  }
  #getRealtimeHeaders() {
    let headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "trigger-version": VERSION
    };
    if (this.previewBranch) {
      headers["x-trigger-branch"] = this.previewBranch;
    }
    return headers;
  }
};
function createSearchQueryForSubscribeToRuns(query) {
  const searchParams = new URLSearchParams();
  if (query) {
    if (query.tasks) {
      searchParams.append("tasks", Array.isArray(query.tasks) ? query.tasks.join(",") : query.tasks);
    }
    if (query.tags) {
      searchParams.append("tags", Array.isArray(query.tags) ? query.tags.join(",") : query.tags);
    }
    if (query.createdAt) {
      searchParams.append("createdAt", query.createdAt);
    }
    if (query.skipColumns) {
      searchParams.append("skipColumns", query.skipColumns.join(","));
    }
  }
  return searchParams;
}
__name(createSearchQueryForSubscribeToRuns, "createSearchQueryForSubscribeToRuns");
function createSearchQueryForListRuns(query) {
  const searchParams = new URLSearchParams();
  if (query) {
    if (query.status) {
      searchParams.append("filter[status]", Array.isArray(query.status) ? query.status.join(",") : query.status);
    }
    if (query.taskIdentifier) {
      searchParams.append("filter[taskIdentifier]", Array.isArray(query.taskIdentifier) ? query.taskIdentifier.join(",") : query.taskIdentifier);
    }
    if (query.version) {
      searchParams.append("filter[version]", Array.isArray(query.version) ? query.version.join(",") : query.version);
    }
    if (query.bulkAction) {
      searchParams.append("filter[bulkAction]", query.bulkAction);
    }
    if (query.tag) {
      searchParams.append("filter[tag]", Array.isArray(query.tag) ? query.tag.join(",") : query.tag);
    }
    if (query.schedule) {
      searchParams.append("filter[schedule]", query.schedule);
    }
    if (typeof query.isTest === "boolean") {
      searchParams.append("filter[isTest]", String(query.isTest));
    }
    if (query.from) {
      searchParams.append("filter[createdAt][from]", query.from instanceof Date ? query.from.getTime().toString() : query.from.toString());
    }
    if (query.to) {
      searchParams.append("filter[createdAt][to]", query.to instanceof Date ? query.to.getTime().toString() : query.to.toString());
    }
    if (query.period) {
      searchParams.append("filter[createdAt][period]", query.period);
    }
    if (query.batch) {
      searchParams.append("filter[batch]", query.batch);
    }
    if (query.queue) {
      searchParams.append("filter[queue]", Array.isArray(query.queue) ? query.queue.map((q) => queueNameFromQueueTypeName(q)).join(",") : queueNameFromQueueTypeName(query.queue));
    }
    if (query.machine) {
      searchParams.append("filter[machine]", Array.isArray(query.machine) ? query.machine.join(",") : query.machine);
    }
  }
  return searchParams;
}
__name(createSearchQueryForListRuns, "createSearchQueryForListRuns");
function queueNameFromQueueTypeName(queue2) {
  if (queue2.type === "task") {
    return `task/${queue2.name}`;
  }
  return queue2.name;
}
__name(queueNameFromQueueTypeName, "queueNameFromQueueTypeName");
function createSearchQueryForListWaitpointTokens(query) {
  const searchParams = new URLSearchParams();
  if (query) {
    if (query.status) {
      searchParams.append("filter[status]", Array.isArray(query.status) ? query.status.join(",") : query.status);
    }
    if (query.idempotencyKey) {
      searchParams.append("filter[idempotencyKey]", query.idempotencyKey);
    }
    if (query.tags) {
      searchParams.append("filter[tags]", Array.isArray(query.tags) ? query.tags.join(",") : query.tags);
    }
    if (query.period) {
      searchParams.append("filter[createdAt][period]", query.period);
    }
    if (query.from) {
      searchParams.append("filter[createdAt][from]", query.from instanceof Date ? query.from.getTime().toString() : query.from.toString());
    }
    if (query.to) {
      searchParams.append("filter[createdAt][to]", query.to instanceof Date ? query.to.getTime().toString() : query.to.toString());
    }
  }
  return searchParams;
}
__name(createSearchQueryForListWaitpointTokens, "createSearchQueryForListWaitpointTokens");
function mergeRequestOptions(defaultOptions, options) {
  if (!options) {
    return defaultOptions;
  }
  return {
    ...defaultOptions,
    ...options,
    retry: {
      ...defaultOptions.retry,
      ...options.retry
    }
  };
}
__name(mergeRequestOptions, "mergeRequestOptions");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/apiClient/types.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/clock-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/clock/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/clock/simpleClock.js
init_esm();
var import_precise_date = __toESM(require_src2(), 1);
var SimpleClock = class {
  static {
    __name(this, "SimpleClock");
  }
  preciseNow() {
    const now = new import_precise_date.PreciseDate();
    const nowStruct = now.toStruct();
    return [nowStruct.seconds, nowStruct.nanos];
  }
  reset() {
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/clock/index.js
var API_NAME3 = "clock";
var SIMPLE_CLOCK = new SimpleClock();
var ClockAPI = class _ClockAPI {
  static {
    __name(this, "ClockAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _ClockAPI();
    }
    return this._instance;
  }
  setGlobalClock(clock2) {
    return registerGlobal(API_NAME3, clock2);
  }
  preciseNow() {
    return this.#getClock().preciseNow();
  }
  reset() {
    this.#getClock().reset();
  }
  #getClock() {
    return getGlobal(API_NAME3) ?? SIMPLE_CLOCK;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/clock-api.js
var clock = ClockAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/logger-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/logger/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/logger/taskLogger.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/icons.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/logger/taskLogger.js
var NoopTaskLogger = class {
  static {
    __name(this, "NoopTaskLogger");
  }
  debug() {
  }
  log() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
  trace(name2, fn) {
    return fn({});
  }
  startSpan() {
    return {};
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/logger/index.js
var API_NAME4 = "logger";
var NOOP_TASK_LOGGER = new NoopTaskLogger();
var LoggerAPI = class _LoggerAPI {
  static {
    __name(this, "LoggerAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _LoggerAPI();
    }
    return this._instance;
  }
  disable() {
    unregisterGlobal(API_NAME4);
  }
  setGlobalTaskLogger(taskLogger) {
    return registerGlobal(API_NAME4, taskLogger);
  }
  debug(message, metadata2) {
    this.#getTaskLogger().debug(message, metadata2);
  }
  log(message, metadata2) {
    this.#getTaskLogger().log(message, metadata2);
  }
  info(message, metadata2) {
    this.#getTaskLogger().info(message, metadata2);
  }
  warn(message, metadata2) {
    this.#getTaskLogger().warn(message, metadata2);
  }
  error(message, metadata2) {
    this.#getTaskLogger().error(message, metadata2);
  }
  trace(name2, fn, options) {
    return this.#getTaskLogger().trace(name2, fn, options);
  }
  startSpan(name2, options) {
    return this.#getTaskLogger().startSpan(name2, options);
  }
  #getTaskLogger() {
    return getGlobal(API_NAME4) ?? NOOP_TASK_LOGGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/logger-api.js
var logger = LoggerAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runtime-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runtime/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runtime/noopRuntimeManager.js
init_esm();
var NoopRuntimeManager = class {
  static {
    __name(this, "NoopRuntimeManager");
  }
  disable() {
  }
  waitForWaitpoint(params) {
    return Promise.resolve({
      ok: true
    });
  }
  waitForTask(params) {
    return Promise.resolve({
      ok: false,
      id: params.id,
      error: {
        type: "INTERNAL_ERROR",
        code: TaskRunErrorCodes.CONFIGURED_INCORRECTLY
      }
    });
  }
  waitForBatch(params) {
    return Promise.resolve({
      id: params.id,
      items: []
    });
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/usage-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/usage/api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/usage/noopUsageManager.js
init_esm();
var NoopUsageManager = class {
  static {
    __name(this, "NoopUsageManager");
  }
  disable() {
  }
  async flush() {
  }
  start() {
    return {
      sample: /* @__PURE__ */ __name(() => ({ cpuTime: 0, wallTime: 0 }), "sample")
    };
  }
  stop(measurement) {
    return measurement.sample();
  }
  pauseAsync(cb) {
    return cb();
  }
  sample() {
    return void 0;
  }
  reset() {
  }
  getInitialState() {
    return {
      cpuTime: 0,
      costInCents: 0
    };
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/usage/api.js
var API_NAME5 = "usage";
var NOOP_USAGE_MANAGER = new NoopUsageManager();
var UsageAPI = class _UsageAPI {
  static {
    __name(this, "UsageAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _UsageAPI();
    }
    return this._instance;
  }
  setGlobalUsageManager(manager) {
    return registerGlobal(API_NAME5, manager);
  }
  disable() {
    this.#getUsageManager().disable();
    unregisterGlobal(API_NAME5);
  }
  start() {
    return this.#getUsageManager().start();
  }
  stop(measurement) {
    return this.#getUsageManager().stop(measurement);
  }
  pauseAsync(cb) {
    return this.#getUsageManager().pauseAsync(cb);
  }
  sample() {
    return this.#getUsageManager().sample();
  }
  flush() {
    return this.#getUsageManager().flush();
  }
  reset() {
    this.#getUsageManager().reset();
    this.disable();
  }
  getInitialState() {
    return this.#getUsageManager().getInitialState();
  }
  #getUsageManager() {
    return getGlobal(API_NAME5) ?? NOOP_USAGE_MANAGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/usage-api.js
var usage = UsageAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runtime/index.js
var API_NAME6 = "runtime";
var NOOP_RUNTIME_MANAGER = new NoopRuntimeManager();
var RuntimeAPI = class _RuntimeAPI {
  static {
    __name(this, "RuntimeAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _RuntimeAPI();
    }
    return this._instance;
  }
  waitUntil(waitpointFriendlyId, finishDate) {
    return usage.pauseAsync(() => this.#getRuntimeManager().waitForWaitpoint({ waitpointFriendlyId, finishDate }));
  }
  waitForTask(params) {
    return usage.pauseAsync(() => this.#getRuntimeManager().waitForTask(params));
  }
  waitForToken(waitpointFriendlyId) {
    return usage.pauseAsync(() => this.#getRuntimeManager().waitForWaitpoint({ waitpointFriendlyId }));
  }
  waitForBatch(params) {
    return usage.pauseAsync(() => this.#getRuntimeManager().waitForBatch(params));
  }
  setGlobalRuntimeManager(runtimeManager) {
    return registerGlobal(API_NAME6, runtimeManager);
  }
  disable() {
    this.#getRuntimeManager().disable();
    unregisterGlobal(API_NAME6);
  }
  #getRuntimeManager() {
    return getGlobal(API_NAME6) ?? NOOP_RUNTIME_MANAGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runtime-api.js
var runtime = RuntimeAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/trace-context-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/traceContext/api.js
init_esm();
init_esm2();
var API_NAME7 = "trace-context";
var NoopTraceContextManager = class {
  static {
    __name(this, "NoopTraceContextManager");
  }
  getTraceContext() {
    return {};
  }
  reset() {
  }
  getExternalTraceContext() {
    return void 0;
  }
  extractContext() {
    return context.active();
  }
  withExternalTrace(fn) {
    return fn();
  }
};
var NOOP_TRACE_CONTEXT_MANAGER = new NoopTraceContextManager();
var TraceContextAPI = class _TraceContextAPI {
  static {
    __name(this, "TraceContextAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _TraceContextAPI();
    }
    return this._instance;
  }
  setGlobalManager(manager) {
    return registerGlobal(API_NAME7, manager);
  }
  disable() {
    unregisterGlobal(API_NAME7);
  }
  reset() {
    this.#getManager().reset();
    this.disable();
  }
  getTraceContext() {
    return this.#getManager().getTraceContext();
  }
  getExternalTraceContext() {
    return this.#getManager().getExternalTraceContext();
  }
  extractContext() {
    return this.#getManager().extractContext();
  }
  withExternalTrace(fn) {
    return this.#getManager().withExternalTrace(fn);
  }
  #getManager() {
    return getGlobal(API_NAME7) ?? NOOP_TRACE_CONTEXT_MANAGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/trace-context-api.js
var traceContext = TraceContextAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/run-metadata-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runMetadata/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runMetadata/noopManager.js
init_esm();
var NoopRunMetadataManager = class {
  static {
    __name(this, "NoopRunMetadataManager");
  }
  append(key, value) {
    throw new Error("Method not implemented.");
  }
  remove(key, value) {
    throw new Error("Method not implemented.");
  }
  increment(key, value) {
    throw new Error("Method not implemented.");
  }
  decrement(key, value) {
    throw new Error("Method not implemented.");
  }
  stream(key, value) {
    throw new Error("Method not implemented.");
  }
  fetchStream(key, signal) {
    throw new Error("Method not implemented.");
  }
  flush(requestOptions) {
    throw new Error("Method not implemented.");
  }
  refresh(requestOptions) {
    throw new Error("Method not implemented.");
  }
  enterWithMetadata(metadata2) {
  }
  current() {
    throw new Error("Method not implemented.");
  }
  getKey(key) {
    throw new Error("Method not implemented.");
  }
  set(key, value) {
    throw new Error("Method not implemented.");
  }
  del(key) {
    throw new Error("Method not implemented.");
  }
  update(metadata2) {
    throw new Error("Method not implemented.");
  }
  get parent() {
    const self = this;
    const parentUpdater = {
      append: /* @__PURE__ */ __name(() => parentUpdater, "append"),
      set: /* @__PURE__ */ __name(() => parentUpdater, "set"),
      del: /* @__PURE__ */ __name(() => parentUpdater, "del"),
      increment: /* @__PURE__ */ __name(() => parentUpdater, "increment"),
      decrement: /* @__PURE__ */ __name(() => parentUpdater, "decrement"),
      remove: /* @__PURE__ */ __name(() => parentUpdater, "remove"),
      stream: /* @__PURE__ */ __name(() => Promise.resolve({
        [Symbol.asyncIterator]: () => ({
          next: /* @__PURE__ */ __name(() => Promise.resolve({ done: true, value: void 0 }), "next")
        })
      }), "stream"),
      update: /* @__PURE__ */ __name(() => parentUpdater, "update")
    };
    return parentUpdater;
  }
  get root() {
    const self = this;
    const rootUpdater = {
      append: /* @__PURE__ */ __name(() => rootUpdater, "append"),
      set: /* @__PURE__ */ __name(() => rootUpdater, "set"),
      del: /* @__PURE__ */ __name(() => rootUpdater, "del"),
      increment: /* @__PURE__ */ __name(() => rootUpdater, "increment"),
      decrement: /* @__PURE__ */ __name(() => rootUpdater, "decrement"),
      remove: /* @__PURE__ */ __name(() => rootUpdater, "remove"),
      stream: /* @__PURE__ */ __name(() => Promise.resolve({
        [Symbol.asyncIterator]: () => ({
          next: /* @__PURE__ */ __name(() => Promise.resolve({ done: true, value: void 0 }), "next")
        })
      }), "stream"),
      update: /* @__PURE__ */ __name(() => rootUpdater, "update")
    };
    return rootUpdater;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runMetadata/index.js
var API_NAME8 = "run-metadata";
var NOOP_MANAGER = new NoopRunMetadataManager();
var RunMetadataAPI = class _RunMetadataAPI {
  static {
    __name(this, "RunMetadataAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _RunMetadataAPI();
    }
    return this._instance;
  }
  setGlobalManager(manager) {
    return registerGlobal(API_NAME8, manager);
  }
  #getManager() {
    return getGlobal(API_NAME8) ?? NOOP_MANAGER;
  }
  enterWithMetadata(metadata2) {
    this.#getManager().enterWithMetadata(metadata2);
  }
  current() {
    return this.#getManager().current();
  }
  getKey(key) {
    return this.#getManager().getKey(key);
  }
  set(key, value) {
    this.#getManager().set(key, value);
    return this;
  }
  del(key) {
    this.#getManager().del(key);
    return this;
  }
  increment(key, value) {
    this.#getManager().increment(key, value);
    return this;
  }
  decrement(key, value) {
    this.#getManager().decrement(key, value);
    return this;
  }
  append(key, value) {
    this.#getManager().append(key, value);
    return this;
  }
  remove(key, value) {
    this.#getManager().remove(key, value);
    return this;
  }
  update(metadata2) {
    this.#getManager().update(metadata2);
    return this;
  }
  stream(key, value, signal) {
    return this.#getManager().stream(key, value, signal);
  }
  fetchStream(key, signal) {
    return this.#getManager().fetchStream(key, signal);
  }
  flush(requestOptions) {
    return this.#getManager().flush(requestOptions);
  }
  refresh(requestOptions) {
    return this.#getManager().refresh(requestOptions);
  }
  get parent() {
    return this.#getManager().parent;
  }
  get root() {
    return this.#getManager().root;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runMetadata/types.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runMetadata/operations.js
init_esm();
var import_path2 = __toESM(require_lib(), 1);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/run-metadata-api.js
var runMetadata = RunMetadataAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/wait-until-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/waitUntil/index.js
init_esm();
var API_NAME9 = "wait-until";
var NoopManager = class {
  static {
    __name(this, "NoopManager");
  }
  register(promise) {
  }
  blockUntilSettled(timeout3) {
    return Promise.resolve();
  }
  requiresResolving() {
    return false;
  }
};
var NOOP_MANAGER2 = new NoopManager();
var WaitUntilAPI = class _WaitUntilAPI {
  static {
    __name(this, "WaitUntilAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _WaitUntilAPI();
    }
    return this._instance;
  }
  setGlobalManager(manager) {
    return registerGlobal(API_NAME9, manager);
  }
  #getManager() {
    return getGlobal(API_NAME9) ?? NOOP_MANAGER2;
  }
  register(promise) {
    return this.#getManager().register(promise);
  }
  blockUntilSettled(timeout3) {
    return this.#getManager().blockUntilSettled(timeout3);
  }
  requiresResolving() {
    return this.#getManager().requiresResolving();
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/wait-until-api.js
var waitUntil = WaitUntilAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/timeout-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/timeout/api.js
init_esm();
var API_NAME10 = "timeout";
var NoopTimeoutManager = class {
  static {
    __name(this, "NoopTimeoutManager");
  }
  abortAfterTimeout(timeoutInSeconds) {
    return new AbortController();
  }
  reset() {
  }
};
var NOOP_TIMEOUT_MANAGER = new NoopTimeoutManager();
var TimeoutAPI = class _TimeoutAPI {
  static {
    __name(this, "TimeoutAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _TimeoutAPI();
    }
    return this._instance;
  }
  get signal() {
    return this.#getManager().signal;
  }
  abortAfterTimeout(timeoutInSeconds) {
    return this.#getManager().abortAfterTimeout(timeoutInSeconds);
  }
  setGlobalManager(manager) {
    return registerGlobal(API_NAME10, manager);
  }
  disable() {
    unregisterGlobal(API_NAME10);
  }
  reset() {
    this.#getManager().reset();
    this.disable();
  }
  #getManager() {
    return getGlobal(API_NAME10) ?? NOOP_TIMEOUT_MANAGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/timeout-api.js
var timeout = TimeoutAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/run-timeline-metrics-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runTimelineMetrics/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runTimelineMetrics/runTimelineMetricsManager.js
init_esm();
var NoopRunTimelineMetricsManager = class {
  static {
    __name(this, "NoopRunTimelineMetricsManager");
  }
  registerMetric(metric) {
  }
  getMetrics() {
    return [];
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/runTimelineMetrics/index.js
var API_NAME11 = "run-timeline-metrics";
var NOOP_MANAGER3 = new NoopRunTimelineMetricsManager();
var RunTimelineMetricsAPI = class _RunTimelineMetricsAPI {
  static {
    __name(this, "RunTimelineMetricsAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _RunTimelineMetricsAPI();
    }
    return this._instance;
  }
  registerMetric(metric) {
    this.#getManager().registerMetric(metric);
  }
  getMetrics() {
    return this.#getManager().getMetrics();
  }
  /**
   * Measures the execution time of an async function and registers it as a metric
   * @param metricName The name of the metric
   * @param eventName The event name
   * @param attributesOrCallback Optional attributes or the callback function
   * @param callbackFn The async function to measure (if attributes were provided)
   * @returns The result of the callback function
   */
  async measureMetric(metricName, eventName, attributesOrCallback, callbackFn) {
    let attributes = {};
    let callback;
    if (typeof attributesOrCallback === "function") {
      callback = attributesOrCallback;
    } else {
      attributes = attributesOrCallback || {};
      if (!callbackFn) {
        throw new Error("Callback function is required when attributes are provided");
      }
      callback = callbackFn;
    }
    const startTime = Date.now();
    try {
      const result = await callback();
      const duration = Date.now() - startTime;
      this.registerMetric({
        name: metricName,
        event: eventName,
        attributes: {
          ...attributes,
          duration
        },
        timestamp: startTime
      });
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.registerMetric({
        name: metricName,
        event: eventName,
        attributes: {
          ...attributes,
          duration,
          error: error instanceof Error ? error.message : String(error),
          status: "failed"
        },
        timestamp: startTime
      });
      throw error;
    }
  }
  convertMetricsToSpanEvents() {
    const metrics = this.getMetrics();
    const spanEvents = metrics.map((metric) => {
      return {
        name: metric.name,
        startTime: metric.timestamp,
        attributes: {
          ...metric.attributes,
          event: metric.event
        }
      };
    });
    return spanEvents;
  }
  convertMetricsToSpanAttributes() {
    const metrics = this.getMetrics();
    if (metrics.length === 0) {
      return {};
    }
    const metricsByName = metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric);
      return acc;
    }, {});
    const reducedMetrics = metrics.reduce((acc, metric) => {
      acc[metric.event] = {
        name: metric.name,
        timestamp: metric.timestamp,
        event: metric.event,
        ...flattenAttributes(metric.attributes, "attributes")
      };
      return acc;
    }, {});
    const metricEventRollups = {};
    for (const [metricName, metricEvents] of Object.entries(metricsByName)) {
      if (metricEvents.length === 0)
        continue;
      const sortedEvents = [...metricEvents].sort((a, b) => a.timestamp - b.timestamp);
      const firstTimestamp = sortedEvents[0].timestamp;
      const lastEvent = sortedEvents[sortedEvents.length - 1];
      const lastEventDuration = lastEvent.attributes?.duration ?? 0;
      const lastEventEndTime = lastEvent.timestamp + lastEventDuration;
      const duration = lastEventEndTime - firstTimestamp;
      const timestamp = firstTimestamp;
      metricEventRollups[metricName] = {
        name: metricName,
        duration,
        timestamp
      };
    }
    return {
      ...flattenAttributes(reducedMetrics, SemanticInternalAttributes.METRIC_EVENTS),
      ...flattenAttributes(metricEventRollups, SemanticInternalAttributes.METRIC_EVENTS)
    };
  }
  setGlobalManager(manager) {
    return registerGlobal(API_NAME11, manager);
  }
  #getManager() {
    return getGlobal(API_NAME11) ?? NOOP_MANAGER3;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/run-timeline-metrics-api.js
var runTimelineMetrics = RunTimelineMetricsAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/lifecycle-hooks-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/lifecycleHooks/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/lifecycleHooks/manager.js
init_esm();
var NoopLifecycleHooksManager = class {
  static {
    __name(this, "NoopLifecycleHooksManager");
  }
  registerOnCancelHookListener(listener) {
  }
  async callOnCancelHookListeners() {
  }
  registerGlobalCancelHook(hook) {
  }
  registerTaskCancelHook(taskId, hook) {
  }
  getTaskCancelHook(taskId) {
    return void 0;
  }
  getGlobalCancelHooks() {
    return [];
  }
  registerOnWaitHookListener(listener) {
  }
  async callOnWaitHookListeners(wait2) {
  }
  registerOnResumeHookListener(listener) {
  }
  async callOnResumeHookListeners(wait2) {
  }
  registerGlobalInitHook(hook) {
  }
  registerTaskInitHook(taskId, hook) {
  }
  getTaskInitHook(taskId) {
    return void 0;
  }
  getGlobalInitHooks() {
    return [];
  }
  registerGlobalStartHook(hook) {
  }
  registerTaskStartHook(taskId, hook) {
  }
  getTaskStartHook(taskId) {
    return void 0;
  }
  getGlobalStartHooks() {
    return [];
  }
  registerGlobalFailureHook(hook) {
  }
  registerTaskFailureHook(taskId, hook) {
  }
  getTaskFailureHook(taskId) {
    return void 0;
  }
  getGlobalFailureHooks() {
    return [];
  }
  registerGlobalSuccessHook(hook) {
  }
  registerTaskSuccessHook(taskId, hook) {
  }
  getTaskSuccessHook(taskId) {
    return void 0;
  }
  getGlobalSuccessHooks() {
    return [];
  }
  registerGlobalCompleteHook(hook) {
  }
  registerTaskCompleteHook(taskId, hook) {
  }
  getTaskCompleteHook(taskId) {
    return void 0;
  }
  getGlobalCompleteHooks() {
    return [];
  }
  registerGlobalWaitHook(hook) {
  }
  registerTaskWaitHook(taskId, hook) {
  }
  getTaskWaitHook(taskId) {
    return void 0;
  }
  getGlobalWaitHooks() {
    return [];
  }
  registerGlobalResumeHook(hook) {
  }
  registerTaskResumeHook(taskId, hook) {
  }
  getTaskResumeHook(taskId) {
    return void 0;
  }
  getGlobalResumeHooks() {
    return [];
  }
  registerGlobalCatchErrorHook() {
  }
  registerTaskCatchErrorHook() {
  }
  getTaskCatchErrorHook() {
    return void 0;
  }
  getGlobalCatchErrorHooks() {
    return [];
  }
  registerGlobalMiddlewareHook() {
  }
  registerTaskMiddlewareHook() {
  }
  getTaskMiddlewareHook() {
    return void 0;
  }
  getGlobalMiddlewareHooks() {
    return [];
  }
  registerGlobalCleanupHook(hook) {
  }
  registerTaskCleanupHook(taskId, hook) {
  }
  getTaskCleanupHook(taskId) {
    return void 0;
  }
  getGlobalCleanupHooks() {
    return [];
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/lifecycleHooks/index.js
var API_NAME12 = "lifecycle-hooks";
var NOOP_LIFECYCLE_HOOKS_MANAGER = new NoopLifecycleHooksManager();
var LifecycleHooksAPI = class _LifecycleHooksAPI {
  static {
    __name(this, "LifecycleHooksAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _LifecycleHooksAPI();
    }
    return this._instance;
  }
  setGlobalLifecycleHooksManager(lifecycleHooksManager) {
    return registerGlobal(API_NAME12, lifecycleHooksManager);
  }
  disable() {
    unregisterGlobal(API_NAME12);
  }
  registerGlobalInitHook(hook) {
    this.#getManager().registerGlobalInitHook(hook);
  }
  registerTaskInitHook(taskId, hook) {
    this.#getManager().registerTaskInitHook(taskId, hook);
  }
  getTaskInitHook(taskId) {
    return this.#getManager().getTaskInitHook(taskId);
  }
  getGlobalInitHooks() {
    return this.#getManager().getGlobalInitHooks();
  }
  registerTaskStartHook(taskId, hook) {
    this.#getManager().registerTaskStartHook(taskId, hook);
  }
  registerGlobalStartHook(hook) {
    this.#getManager().registerGlobalStartHook(hook);
  }
  getTaskStartHook(taskId) {
    return this.#getManager().getTaskStartHook(taskId);
  }
  getGlobalStartHooks() {
    return this.#getManager().getGlobalStartHooks();
  }
  registerGlobalFailureHook(hook) {
    this.#getManager().registerGlobalFailureHook(hook);
  }
  registerTaskFailureHook(taskId, hook) {
    this.#getManager().registerTaskFailureHook(taskId, hook);
  }
  getTaskFailureHook(taskId) {
    return this.#getManager().getTaskFailureHook(taskId);
  }
  getGlobalFailureHooks() {
    return this.#getManager().getGlobalFailureHooks();
  }
  registerGlobalSuccessHook(hook) {
    this.#getManager().registerGlobalSuccessHook(hook);
  }
  registerTaskSuccessHook(taskId, hook) {
    this.#getManager().registerTaskSuccessHook(taskId, hook);
  }
  getTaskSuccessHook(taskId) {
    return this.#getManager().getTaskSuccessHook(taskId);
  }
  getGlobalSuccessHooks() {
    return this.#getManager().getGlobalSuccessHooks();
  }
  registerGlobalCompleteHook(hook) {
    this.#getManager().registerGlobalCompleteHook(hook);
  }
  registerTaskCompleteHook(taskId, hook) {
    this.#getManager().registerTaskCompleteHook(taskId, hook);
  }
  getTaskCompleteHook(taskId) {
    return this.#getManager().getTaskCompleteHook(taskId);
  }
  getGlobalCompleteHooks() {
    return this.#getManager().getGlobalCompleteHooks();
  }
  registerGlobalWaitHook(hook) {
    this.#getManager().registerGlobalWaitHook(hook);
  }
  registerTaskWaitHook(taskId, hook) {
    this.#getManager().registerTaskWaitHook(taskId, hook);
  }
  getTaskWaitHook(taskId) {
    return this.#getManager().getTaskWaitHook(taskId);
  }
  getGlobalWaitHooks() {
    return this.#getManager().getGlobalWaitHooks();
  }
  registerGlobalResumeHook(hook) {
    this.#getManager().registerGlobalResumeHook(hook);
  }
  registerTaskResumeHook(taskId, hook) {
    this.#getManager().registerTaskResumeHook(taskId, hook);
  }
  getTaskResumeHook(taskId) {
    return this.#getManager().getTaskResumeHook(taskId);
  }
  getGlobalResumeHooks() {
    return this.#getManager().getGlobalResumeHooks();
  }
  registerGlobalCatchErrorHook(hook) {
    this.#getManager().registerGlobalCatchErrorHook(hook);
  }
  registerTaskCatchErrorHook(taskId, hook) {
    this.#getManager().registerTaskCatchErrorHook(taskId, hook);
  }
  getTaskCatchErrorHook(taskId) {
    return this.#getManager().getTaskCatchErrorHook(taskId);
  }
  getGlobalCatchErrorHooks() {
    return this.#getManager().getGlobalCatchErrorHooks();
  }
  registerGlobalMiddlewareHook(hook) {
    this.#getManager().registerGlobalMiddlewareHook(hook);
  }
  registerTaskMiddlewareHook(taskId, hook) {
    this.#getManager().registerTaskMiddlewareHook(taskId, hook);
  }
  getTaskMiddlewareHook(taskId) {
    return this.#getManager().getTaskMiddlewareHook(taskId);
  }
  getGlobalMiddlewareHooks() {
    return this.#getManager().getGlobalMiddlewareHooks();
  }
  registerGlobalCleanupHook(hook) {
    this.#getManager().registerGlobalCleanupHook(hook);
  }
  registerTaskCleanupHook(taskId, hook) {
    this.#getManager().registerTaskCleanupHook(taskId, hook);
  }
  getTaskCleanupHook(taskId) {
    return this.#getManager().getTaskCleanupHook(taskId);
  }
  getGlobalCleanupHooks() {
    return this.#getManager().getGlobalCleanupHooks();
  }
  callOnWaitHookListeners(wait2) {
    return this.#getManager().callOnWaitHookListeners(wait2);
  }
  callOnResumeHookListeners(wait2) {
    return this.#getManager().callOnResumeHookListeners(wait2);
  }
  registerOnWaitHookListener(listener) {
    this.#getManager().registerOnWaitHookListener(listener);
  }
  registerOnResumeHookListener(listener) {
    this.#getManager().registerOnResumeHookListener(listener);
  }
  registerGlobalCancelHook(hook) {
    this.#getManager().registerGlobalCancelHook(hook);
  }
  registerTaskCancelHook(taskId, hook) {
    this.#getManager().registerTaskCancelHook(taskId, hook);
  }
  getTaskCancelHook(taskId) {
    return this.#getManager().getTaskCancelHook(taskId);
  }
  getGlobalCancelHooks() {
    return this.#getManager().getGlobalCancelHooks();
  }
  callOnCancelHookListeners() {
    return this.#getManager().callOnCancelHookListeners();
  }
  registerOnCancelHookListener(listener) {
    this.#getManager().registerOnCancelHookListener(listener);
  }
  #getManager() {
    return getGlobal(API_NAME12) ?? NOOP_LIFECYCLE_HOOKS_MANAGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/lifecycle-hooks-api.js
var lifecycleHooks = LifecycleHooksAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/locals-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/locals/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/locals/manager.js
init_esm();
var NoopLocalsManager = class {
  static {
    __name(this, "NoopLocalsManager");
  }
  createLocal(id) {
    return {
      __type: Symbol(),
      id
    };
  }
  getLocal(key) {
    return void 0;
  }
  setLocal(key, value) {
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/locals/index.js
var API_NAME13 = "locals";
var NOOP_LOCALS_MANAGER = new NoopLocalsManager();
var LocalsAPI = class _LocalsAPI {
  static {
    __name(this, "LocalsAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _LocalsAPI();
    }
    return this._instance;
  }
  setGlobalLocalsManager(localsManager) {
    return registerGlobal(API_NAME13, localsManager);
  }
  disable() {
    unregisterGlobal(API_NAME13);
  }
  createLocal(id) {
    return this.#getManager().createLocal(id);
  }
  getLocal(key) {
    return this.#getManager().getLocal(key);
  }
  setLocal(key, value) {
    return this.#getManager().setLocal(key, value);
  }
  #getManager() {
    return getGlobal(API_NAME13) ?? NOOP_LOCALS_MANAGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/locals-api.js
var localsAPI = LocalsAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/heartbeats-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/heartbeats/api.js
init_esm();
var API_NAME14 = "heartbeats";
var NoopHeartbeatsManager = class {
  static {
    __name(this, "NoopHeartbeatsManager");
  }
  startHeartbeat(id) {
    return;
  }
  stopHeartbeat() {
    return;
  }
  async yield() {
    return;
  }
  get lastHeartbeat() {
    return void 0;
  }
  reset() {
  }
};
var NOOP_HEARTBEATS_MANAGER = new NoopHeartbeatsManager();
var HeartbeatsAPI = class _HeartbeatsAPI {
  static {
    __name(this, "HeartbeatsAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _HeartbeatsAPI();
    }
    return this._instance;
  }
  setGlobalManager(manager) {
    return registerGlobal(API_NAME14, manager);
  }
  disable() {
    unregisterGlobal(API_NAME14);
  }
  reset() {
    this.#getManager().reset();
    this.disable();
  }
  get lastHeartbeat() {
    return this.#getManager().lastHeartbeat;
  }
  startHeartbeat(id) {
    return this.#getManager().startHeartbeat(id);
  }
  stopHeartbeat() {
    return this.#getManager().stopHeartbeat();
  }
  yield() {
    return this.#getManager().yield();
  }
  #getManager() {
    return getGlobal(API_NAME14) ?? NOOP_HEARTBEATS_MANAGER;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/heartbeats-api.js
var heartbeats = HeartbeatsAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/resource-catalog-api.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/resource-catalog/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/resource-catalog/noopResourceCatalog.js
init_esm();
var NoopResourceCatalog = class {
  static {
    __name(this, "NoopResourceCatalog");
  }
  registerTaskMetadata(task2) {
  }
  setCurrentFileContext(filePath, entryPoint) {
  }
  clearCurrentFileContext() {
  }
  updateTaskMetadata(id, updates) {
  }
  listTaskManifests() {
    return [];
  }
  getTaskManifest(id) {
    return void 0;
  }
  getTask(id) {
    return void 0;
  }
  getTaskSchema(id) {
    return void 0;
  }
  taskExists(id) {
    return false;
  }
  disable() {
  }
  registerWorkerManifest(workerManifest) {
  }
  registerQueueMetadata(queue2) {
  }
  listQueueManifests() {
    return [];
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/resource-catalog/index.js
var API_NAME15 = "resource-catalog";
var NOOP_RESOURCE_CATALOG = new NoopResourceCatalog();
var ResourceCatalogAPI = class _ResourceCatalogAPI {
  static {
    __name(this, "ResourceCatalogAPI");
  }
  static _instance;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _ResourceCatalogAPI();
    }
    return this._instance;
  }
  setGlobalResourceCatalog(resourceCatalog2) {
    return registerGlobal(API_NAME15, resourceCatalog2);
  }
  disable() {
    unregisterGlobal(API_NAME15);
  }
  registerQueueMetadata(queue2) {
    this.#getCatalog().registerQueueMetadata(queue2);
  }
  registerTaskMetadata(task2) {
    this.#getCatalog().registerTaskMetadata(task2);
  }
  updateTaskMetadata(id, updates) {
    this.#getCatalog().updateTaskMetadata(id, updates);
  }
  setCurrentFileContext(filePath, entryPoint) {
    this.#getCatalog().setCurrentFileContext(filePath, entryPoint);
  }
  clearCurrentFileContext() {
    this.#getCatalog().clearCurrentFileContext();
  }
  registerWorkerManifest(workerManifest) {
    this.#getCatalog().registerWorkerManifest(workerManifest);
  }
  listTaskManifests() {
    return this.#getCatalog().listTaskManifests();
  }
  getTaskManifest(id) {
    return this.#getCatalog().getTaskManifest(id);
  }
  getTask(id) {
    return this.#getCatalog().getTask(id);
  }
  getTaskSchema(id) {
    return this.#getCatalog().getTaskSchema(id);
  }
  taskExists(id) {
    return this.#getCatalog().taskExists(id);
  }
  listQueueManifests() {
    return this.#getCatalog().listQueueManifests();
  }
  #getCatalog() {
    return getGlobal(API_NAME15) ?? NOOP_RESOURCE_CATALOG;
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/resource-catalog-api.js
var resourceCatalog = ResourceCatalogAPI.getInstance();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/utils.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/tasks.js
init_esm();
var SubtaskUnwrapError = class extends Error {
  static {
    __name(this, "SubtaskUnwrapError");
  }
  taskId;
  runId;
  cause;
  constructor(taskId, runId, subtaskError) {
    if (subtaskError instanceof Error) {
      super(`Error in ${taskId}: ${subtaskError.message}`);
      this.cause = subtaskError;
      this.name = "SubtaskUnwrapError";
    } else {
      super(`Error in ${taskId}`);
      this.name = "SubtaskUnwrapError";
      this.cause = subtaskError;
    }
    this.taskId = taskId;
    this.runId = runId;
  }
};
var TaskRunPromise = class extends Promise {
  static {
    __name(this, "TaskRunPromise");
  }
  taskId;
  constructor(executor, taskId) {
    super(executor);
    this.taskId = taskId;
  }
  unwrap() {
    return this.then((result) => {
      if (result.ok) {
        return result.output;
      } else {
        throw new SubtaskUnwrapError(this.taskId, result.id, result.error);
      }
    });
  }
};

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/idempotencyKeys.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/tools.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/queues.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/jsonSchema.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/idempotencyKeys.js
init_esm();
function isIdempotencyKey(value) {
  return typeof value === "string" && value.length === 64;
}
__name(isIdempotencyKey, "isIdempotencyKey");
function flattenIdempotencyKey(idempotencyKey) {
  if (!idempotencyKey) {
    return;
  }
  if (Array.isArray(idempotencyKey)) {
    if (idempotencyKey.some((i) => i === void 0)) {
      return;
    }
    return idempotencyKey.flatMap((key) => {
      const k = flattenIdempotencyKey(key);
      if (!k)
        return [];
      return [k];
    });
  }
  return idempotencyKey;
}
__name(flattenIdempotencyKey, "flattenIdempotencyKey");
async function makeIdempotencyKey(idempotencyKey) {
  if (!idempotencyKey) {
    return;
  }
  if (isIdempotencyKey(idempotencyKey)) {
    return idempotencyKey;
  }
  return await createIdempotencyKey(idempotencyKey, { scope: "global" });
}
__name(makeIdempotencyKey, "makeIdempotencyKey");
async function createIdempotencyKey(key, options) {
  const idempotencyKey = await generateIdempotencyKey([...Array.isArray(key) ? key : [key]].concat(injectScope(options?.scope ?? "run")));
  return idempotencyKey;
}
__name(createIdempotencyKey, "createIdempotencyKey");
function injectScope(scope) {
  switch (scope) {
    case "run": {
      if (taskContext?.ctx) {
        return [taskContext.ctx.run.id];
      }
      break;
    }
    case "attempt": {
      if (taskContext?.ctx) {
        return [taskContext.ctx.run.id, taskContext.ctx.attempt.number.toString()];
      }
      break;
    }
  }
  return [];
}
__name(injectScope, "injectScope");
async function generateIdempotencyKey(keyMaterial) {
  return await digestSHA256(keyMaterial.join("-"));
}
__name(generateIdempotencyKey, "generateIdempotencyKey");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/tryCatch.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/durations.js
init_esm();
var import_humanize_duration = __toESM(require_humanize_duration(), 1);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/eventFilterMatches.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/omit.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/imageRef.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/utils/interval.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/config.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/types/schemas.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/shared.js
init_esm();
init_esm2();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/tracer.js
init_esm();

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/tracer.js
init_esm();
init_esm2();
var import_api_logs = __toESM(require_src3(), 1);

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/otel/utils.js
init_esm();
init_esm2();
function recordSpanException(span, error) {
  if (error instanceof Error) {
    span.recordException(sanitizeSpanError(error));
  } else if (typeof error === "string") {
    span.recordException(error.replace(/\0/g, ""));
  } else {
    span.recordException(JSON.stringify(error).replace(/\0/g, ""));
  }
  span.setStatus({ code: SpanStatusCode.ERROR });
}
__name(recordSpanException, "recordSpanException");
function sanitizeSpanError(error) {
  const sanitizedError = new Error(error.message.replace(/\0/g, ""));
  sanitizedError.name = error.name.replace(/\0/g, "");
  sanitizedError.stack = error.stack?.replace(/\0/g, "");
  return sanitizedError;
}
__name(sanitizeSpanError, "sanitizeSpanError");

// node_modules/.pnpm/@trigger.dev+core@4.0.4/node_modules/@trigger.dev/core/dist/esm/v3/tracer.js
var TriggerTracer = class {
  static {
    __name(this, "TriggerTracer");
  }
  _config;
  constructor(_config) {
    this._config = _config;
  }
  _tracer;
  get tracer() {
    if (!this._tracer) {
      if ("tracer" in this._config)
        return this._config.tracer;
      this._tracer = trace.getTracer(this._config.name, this._config.version);
    }
    return this._tracer;
  }
  _logger;
  get logger() {
    if (!this._logger) {
      if ("logger" in this._config)
        return this._config.logger;
      this._logger = import_api_logs.logs.getLogger(this._config.name, this._config.version);
    }
    return this._logger;
  }
  startActiveSpan(name2, fn, options, ctx, signal) {
    const parentContext = ctx ?? context.active();
    const attributes = options?.attributes ?? {};
    let spanEnded = false;
    const createPartialSpanWithEvents = options?.events && options.events.length > 0;
    return this.tracer.startActiveSpan(name2, {
      ...options,
      attributes: {
        ...attributes,
        ...createPartialSpanWithEvents ? {
          [SemanticInternalAttributes.SKIP_SPAN_PARTIAL]: true
        } : {}
      },
      startTime: clock.preciseNow()
    }, parentContext, async (span) => {
      signal?.addEventListener("abort", () => {
        if (!spanEnded) {
          spanEnded = true;
          recordSpanException(span, signal.reason);
          span.end();
        }
      });
      if (taskContext.ctx && createPartialSpanWithEvents) {
        const partialSpan = this.tracer.startSpan(name2, {
          ...options,
          attributes: {
            ...attributes,
            [SemanticInternalAttributes.SPAN_PARTIAL]: true,
            [SemanticInternalAttributes.SPAN_ID]: span.spanContext().spanId
          }
        }, parentContext);
        if (options?.events) {
          for (const event of options.events) {
            partialSpan.addEvent(event.name, event.attributes, event.startTime);
          }
        }
        partialSpan.end();
      }
      if (options?.events) {
        for (const event of options.events) {
          span.addEvent(event.name, event.attributes, event.startTime);
        }
      }
      const usageMeasurement = usage.start();
      try {
        return await fn(span);
      } catch (e) {
        if (isCompleteTaskWithOutput(e)) {
          if (!spanEnded) {
            span.end(clock.preciseNow());
          }
          throw e;
        }
        if (!spanEnded) {
          if (typeof e === "string" || e instanceof Error) {
            span.recordException(e);
          }
          span.setStatus({ code: SpanStatusCode.ERROR });
        }
        throw e;
      } finally {
        if (!spanEnded) {
          spanEnded = true;
          if (taskContext.ctx) {
            const usageSample = usage.stop(usageMeasurement);
            const machine = taskContext.ctx.machine;
            span.setAttributes({
              [SemanticInternalAttributes.USAGE_DURATION_MS]: usageSample.cpuTime,
              [SemanticInternalAttributes.USAGE_COST_IN_CENTS]: machine?.centsPerMs ? usageSample.cpuTime * machine.centsPerMs : 0
            });
          }
          span.end(clock.preciseNow());
        }
      }
    });
  }
  startSpan(name2, options, ctx) {
    const parentContext = ctx ?? context.active();
    const attributes = options?.attributes ?? {};
    const span = this.tracer.startSpan(name2, options, parentContext);
    return span;
  }
};

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/version.js
init_esm();
var VERSION2 = "4.0.4";

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/tracer.js
var tracer = new TriggerTracer({ name: "@trigger.dev/sdk", version: VERSION2 });

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/shared.js
function createTask(params) {
  const task2 = {
    id: params.id,
    description: params.description,
    jsonSchema: params.jsonSchema,
    trigger: /* @__PURE__ */ __name(async (payload, options) => {
      return await trigger_internal("trigger()", params.id, payload, void 0, {
        queue: params.queue?.name,
        ...options
      });
    }, "trigger"),
    batchTrigger: /* @__PURE__ */ __name(async (items, options) => {
      return await batchTrigger_internal("batchTrigger()", params.id, items, options, void 0, void 0, params.queue?.name);
    }, "batchTrigger"),
    triggerAndWait: /* @__PURE__ */ __name((payload, options) => {
      return new TaskRunPromise((resolve, reject) => {
        triggerAndWait_internal("triggerAndWait()", params.id, payload, void 0, {
          queue: params.queue?.name,
          ...options
        }).then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
      }, params.id);
    }, "triggerAndWait"),
    batchTriggerAndWait: /* @__PURE__ */ __name(async (items, options) => {
      return await batchTriggerAndWait_internal("batchTriggerAndWait()", params.id, items, void 0, options, void 0, params.queue?.name);
    }, "batchTriggerAndWait")
  };
  registerTaskLifecycleHooks(params.id, params);
  resourceCatalog.registerTaskMetadata({
    id: params.id,
    description: params.description,
    queue: params.queue,
    retry: params.retry ? { ...defaultRetryOptions, ...params.retry } : void 0,
    machine: typeof params.machine === "string" ? { preset: params.machine } : params.machine,
    maxDuration: params.maxDuration,
    payloadSchema: params.jsonSchema,
    fns: {
      run: params.run
    }
  });
  const queue2 = params.queue;
  if (queue2 && typeof queue2.name === "string") {
    resourceCatalog.registerQueueMetadata({
      name: queue2.name,
      concurrencyLimit: queue2.concurrencyLimit
    });
  }
  task2[Symbol.for("trigger.dev/task")] = true;
  return task2;
}
__name(createTask, "createTask");
async function trigger_internal(name2, id, payload, parsePayload, options, requestOptions) {
  const apiClient = apiClientManager.clientOrThrow();
  const parsedPayload = parsePayload ? await parsePayload(payload) : payload;
  const payloadPacket = await stringifyIO(parsedPayload);
  const handle = await apiClient.triggerTask(id, {
    payload: payloadPacket.data,
    options: {
      queue: options?.queue ? { name: options.queue } : void 0,
      concurrencyKey: options?.concurrencyKey,
      test: taskContext.ctx?.run.isTest,
      payloadType: payloadPacket.dataType,
      idempotencyKey: await makeIdempotencyKey(options?.idempotencyKey),
      idempotencyKeyTTL: options?.idempotencyKeyTTL,
      delay: options?.delay,
      ttl: options?.ttl,
      tags: options?.tags,
      maxAttempts: options?.maxAttempts,
      metadata: options?.metadata,
      maxDuration: options?.maxDuration,
      parentRunId: taskContext.ctx?.run.id,
      machine: options?.machine,
      priority: options?.priority,
      region: options?.region,
      lockToVersion: options?.version ?? getEnvVar("TRIGGER_VERSION")
    }
  }, {
    spanParentAsLink: true
  }, {
    name: name2,
    tracer,
    icon: "trigger",
    onResponseBody: /* @__PURE__ */ __name((body, span) => {
      if (body && typeof body === "object" && !Array.isArray(body)) {
        if ("id" in body && typeof body.id === "string") {
          span.setAttribute("runId", body.id);
        }
      }
    }, "onResponseBody"),
    ...requestOptions
  });
  return handle;
}
__name(trigger_internal, "trigger_internal");
async function batchTrigger_internal(name2, taskIdentifier, items, options, parsePayload, requestOptions, queue2) {
  const apiClient = apiClientManager.clientOrThrow();
  const ctx = taskContext.ctx;
  const response = await apiClient.batchTriggerV3({
    items: await Promise.all(items.map(async (item, index) => {
      const parsedPayload = parsePayload ? await parsePayload(item.payload) : item.payload;
      const payloadPacket = await stringifyIO(parsedPayload);
      const batchItemIdempotencyKey = await makeIdempotencyKey(flattenIdempotencyKey([options?.idempotencyKey, `${index}`]));
      return {
        task: taskIdentifier,
        payload: payloadPacket.data,
        options: {
          queue: item.options?.queue ? { name: item.options.queue } : queue2 ? { name: queue2 } : void 0,
          concurrencyKey: item.options?.concurrencyKey,
          test: taskContext.ctx?.run.isTest,
          payloadType: payloadPacket.dataType,
          delay: item.options?.delay,
          ttl: item.options?.ttl,
          tags: item.options?.tags,
          maxAttempts: item.options?.maxAttempts,
          metadata: item.options?.metadata,
          maxDuration: item.options?.maxDuration,
          idempotencyKey: await makeIdempotencyKey(item.options?.idempotencyKey) ?? batchItemIdempotencyKey,
          idempotencyKeyTTL: item.options?.idempotencyKeyTTL ?? options?.idempotencyKeyTTL,
          machine: item.options?.machine,
          priority: item.options?.priority,
          region: item.options?.region,
          lockToVersion: item.options?.version ?? getEnvVar("TRIGGER_VERSION")
        }
      };
    })),
    parentRunId: ctx?.run.id
  }, {
    spanParentAsLink: true,
    processingStrategy: options?.triggerSequentially ? "sequential" : void 0
  }, {
    name: name2,
    tracer,
    icon: "trigger",
    onResponseBody(body, span) {
      if (body && typeof body === "object" && !Array.isArray(body)) {
        if ("id" in body && typeof body.id === "string") {
          span.setAttribute("batchId", body.id);
        }
        if ("runCount" in body && Array.isArray(body.runCount)) {
          span.setAttribute("runCount", body.runCount);
        }
      }
    },
    ...requestOptions
  });
  const handle = {
    batchId: response.id,
    runCount: response.runCount,
    publicAccessToken: response.publicAccessToken
  };
  return handle;
}
__name(batchTrigger_internal, "batchTrigger_internal");
async function triggerAndWait_internal(name2, id, payload, parsePayload, options, requestOptions) {
  const ctx = taskContext.ctx;
  if (!ctx) {
    throw new Error("triggerAndWait can only be used from inside a task.run()");
  }
  const apiClient = apiClientManager.clientOrThrow();
  const parsedPayload = parsePayload ? await parsePayload(payload) : payload;
  const payloadPacket = await stringifyIO(parsedPayload);
  return await tracer.startActiveSpan(name2, async (span) => {
    const response = await apiClient.triggerTask(id, {
      payload: payloadPacket.data,
      options: {
        lockToVersion: taskContext.worker?.version,
        // Lock to current version because we're waiting for it to finish
        queue: options?.queue ? { name: options.queue } : void 0,
        concurrencyKey: options?.concurrencyKey,
        test: taskContext.ctx?.run.isTest,
        payloadType: payloadPacket.dataType,
        delay: options?.delay,
        ttl: options?.ttl,
        tags: options?.tags,
        maxAttempts: options?.maxAttempts,
        metadata: options?.metadata,
        maxDuration: options?.maxDuration,
        resumeParentOnCompletion: true,
        parentRunId: ctx.run.id,
        idempotencyKey: await makeIdempotencyKey(options?.idempotencyKey),
        idempotencyKeyTTL: options?.idempotencyKeyTTL,
        machine: options?.machine,
        priority: options?.priority,
        region: options?.region
      }
    }, {}, requestOptions);
    span.setAttribute("runId", response.id);
    const result = await runtime.waitForTask({
      id: response.id,
      ctx
    });
    return await handleTaskRunExecutionResult(result, id);
  }, {
    kind: SpanKind.PRODUCER,
    attributes: {
      [SemanticInternalAttributes.STYLE_ICON]: "trigger",
      ...accessoryAttributes({
        items: [
          {
            text: id,
            variant: "normal"
          }
        ],
        style: "codepath"
      })
    }
  });
}
__name(triggerAndWait_internal, "triggerAndWait_internal");
async function batchTriggerAndWait_internal(name2, id, items, parsePayload, options, requestOptions, queue2) {
  const ctx = taskContext.ctx;
  if (!ctx) {
    throw new Error("batchTriggerAndWait can only be used from inside a task.run()");
  }
  const apiClient = apiClientManager.clientOrThrow();
  return await tracer.startActiveSpan(name2, async (span) => {
    const response = await apiClient.batchTriggerV3({
      items: await Promise.all(items.map(async (item, index) => {
        const parsedPayload = parsePayload ? await parsePayload(item.payload) : item.payload;
        const payloadPacket = await stringifyIO(parsedPayload);
        const batchItemIdempotencyKey = await makeIdempotencyKey(flattenIdempotencyKey([options?.idempotencyKey, `${index}`]));
        return {
          task: id,
          payload: payloadPacket.data,
          options: {
            lockToVersion: taskContext.worker?.version,
            queue: item.options?.queue ? { name: item.options.queue } : queue2 ? { name: queue2 } : void 0,
            concurrencyKey: item.options?.concurrencyKey,
            test: taskContext.ctx?.run.isTest,
            payloadType: payloadPacket.dataType,
            delay: item.options?.delay,
            ttl: item.options?.ttl,
            tags: item.options?.tags,
            maxAttempts: item.options?.maxAttempts,
            metadata: item.options?.metadata,
            maxDuration: item.options?.maxDuration,
            idempotencyKey: await makeIdempotencyKey(item.options?.idempotencyKey) ?? batchItemIdempotencyKey,
            idempotencyKeyTTL: item.options?.idempotencyKeyTTL ?? options?.idempotencyKeyTTL,
            machine: item.options?.machine,
            priority: item.options?.priority,
            region: item.options?.region
          }
        };
      })),
      resumeParentOnCompletion: true,
      parentRunId: ctx.run.id
    }, {
      processingStrategy: options?.triggerSequentially ? "sequential" : void 0
    }, requestOptions);
    span.setAttribute("batchId", response.id);
    span.setAttribute("runCount", response.runCount);
    const result = await runtime.waitForBatch({
      id: response.id,
      runCount: response.runCount,
      ctx
    });
    const runs2 = await handleBatchTaskRunExecutionResult(result.items, id);
    return {
      id: result.id,
      runs: runs2
    };
  }, {
    kind: SpanKind.PRODUCER,
    attributes: {
      [SemanticInternalAttributes.STYLE_ICON]: "trigger",
      ...accessoryAttributes({
        items: [
          {
            text: id,
            variant: "normal"
          }
        ],
        style: "codepath"
      })
    }
  });
}
__name(batchTriggerAndWait_internal, "batchTriggerAndWait_internal");
async function handleBatchTaskRunExecutionResult(items, taskIdentifier) {
  const someObjectStoreOutputs = items.some((item) => item.ok && item.outputType === "application/store");
  if (!someObjectStoreOutputs) {
    const results = await Promise.all(items.map(async (item) => {
      return await handleTaskRunExecutionResult(item, taskIdentifier);
    }));
    return results;
  }
  return await tracer.startActiveSpan("store.downloadPayloads", async (span) => {
    const results = await Promise.all(items.map(async (item) => {
      return await handleTaskRunExecutionResult(item, taskIdentifier);
    }));
    return results;
  }, {
    kind: SpanKind.INTERNAL,
    [SemanticInternalAttributes.STYLE_ICON]: "cloud-download"
  });
}
__name(handleBatchTaskRunExecutionResult, "handleBatchTaskRunExecutionResult");
async function handleTaskRunExecutionResult(execution, taskIdentifier) {
  if (execution.ok) {
    const outputPacket = { data: execution.output, dataType: execution.outputType };
    const importedPacket = await conditionallyImportPacket(outputPacket, tracer);
    return {
      ok: true,
      id: execution.id,
      taskIdentifier: execution.taskIdentifier ?? taskIdentifier,
      output: await parsePacket(importedPacket)
    };
  } else {
    return {
      ok: false,
      id: execution.id,
      taskIdentifier: execution.taskIdentifier ?? taskIdentifier,
      error: createErrorTaskError(execution.error)
    };
  }
}
__name(handleTaskRunExecutionResult, "handleTaskRunExecutionResult");
function registerTaskLifecycleHooks(taskId, params) {
  if (params.init) {
    lifecycleHooks.registerTaskInitHook(taskId, {
      fn: params.init
    });
  }
  if (params.onStart) {
    lifecycleHooks.registerTaskStartHook(taskId, {
      fn: params.onStart
    });
  }
  if (params.onFailure) {
    lifecycleHooks.registerTaskFailureHook(taskId, {
      fn: params.onFailure
    });
  }
  if (params.onSuccess) {
    lifecycleHooks.registerTaskSuccessHook(taskId, {
      fn: params.onSuccess
    });
  }
  if (params.onComplete) {
    lifecycleHooks.registerTaskCompleteHook(taskId, {
      fn: params.onComplete
    });
  }
  if (params.onWait) {
    lifecycleHooks.registerTaskWaitHook(taskId, {
      fn: params.onWait
    });
  }
  if (params.onResume) {
    lifecycleHooks.registerTaskResumeHook(taskId, {
      fn: params.onResume
    });
  }
  if (params.catchError) {
    lifecycleHooks.registerTaskCatchErrorHook(taskId, {
      fn: params.catchError
    });
  }
  if (params.handleError) {
    lifecycleHooks.registerTaskCatchErrorHook(taskId, {
      fn: params.handleError
    });
  }
  if (params.middleware) {
    lifecycleHooks.registerTaskMiddlewareHook(taskId, {
      fn: params.middleware
    });
  }
  if (params.cleanup) {
    lifecycleHooks.registerTaskCleanupHook(taskId, {
      fn: params.cleanup
    });
  }
  if (params.onCancel) {
    lifecycleHooks.registerTaskCancelHook(taskId, {
      fn: params.onCancel
    });
  }
}
__name(registerTaskLifecycleHooks, "registerTaskLifecycleHooks");

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/tasks.js
var task = createTask;

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/cache.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/config.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/retry.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/wait.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/batch.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/waitUntil.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/usage.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/idempotencyKeys.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/tags.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/metadata.js
init_esm();
var parentMetadataUpdater = runMetadata.parent;
var rootMetadataUpdater = runMetadata.root;
var metadataUpdater = {
  set: setMetadataKey,
  del: deleteMetadataKey,
  append: appendMetadataKey,
  remove: removeMetadataKey,
  increment: incrementMetadataKey,
  decrement: decrementMetadataKey,
  flush: flushMetadata
};
var metadata = {
  current: currentMetadata,
  get: getMetadataKey,
  save: saveMetadata,
  replace: replaceMetadata,
  stream,
  fetchStream,
  parent: parentMetadataUpdater,
  root: rootMetadataUpdater,
  refresh: refreshMetadata,
  ...metadataUpdater
};
function currentMetadata() {
  return runMetadata.current();
}
__name(currentMetadata, "currentMetadata");
function getMetadataKey(key) {
  return runMetadata.getKey(key);
}
__name(getMetadataKey, "getMetadataKey");
function setMetadataKey(key, value) {
  runMetadata.set(key, value);
  return metadataUpdater;
}
__name(setMetadataKey, "setMetadataKey");
function deleteMetadataKey(key) {
  runMetadata.del(key);
  return metadataUpdater;
}
__name(deleteMetadataKey, "deleteMetadataKey");
function replaceMetadata(metadata2) {
  runMetadata.update(metadata2);
}
__name(replaceMetadata, "replaceMetadata");
function saveMetadata(metadata2) {
  runMetadata.update(metadata2);
}
__name(saveMetadata, "saveMetadata");
function incrementMetadataKey(key, value = 1) {
  runMetadata.increment(key, value);
  return metadataUpdater;
}
__name(incrementMetadataKey, "incrementMetadataKey");
function decrementMetadataKey(key, value = 1) {
  runMetadata.decrement(key, value);
  return metadataUpdater;
}
__name(decrementMetadataKey, "decrementMetadataKey");
function appendMetadataKey(key, value) {
  runMetadata.append(key, value);
  return metadataUpdater;
}
__name(appendMetadataKey, "appendMetadataKey");
function removeMetadataKey(key, value) {
  runMetadata.remove(key, value);
  return metadataUpdater;
}
__name(removeMetadataKey, "removeMetadataKey");
async function flushMetadata(requestOptions) {
  const $requestOptions = mergeRequestOptions({
    tracer,
    name: "metadata.flush()",
    icon: "code-plus"
  }, requestOptions);
  await runMetadata.flush($requestOptions);
}
__name(flushMetadata, "flushMetadata");
async function refreshMetadata(requestOptions) {
  const $requestOptions = mergeRequestOptions({
    tracer,
    name: "metadata.refresh()",
    icon: "code-plus"
  }, requestOptions);
  await runMetadata.refresh($requestOptions);
}
__name(refreshMetadata, "refreshMetadata");
async function stream(key, value, signal) {
  return runMetadata.stream(key, value, signal);
}
__name(stream, "stream");
async function fetchStream(key, signal) {
  return runMetadata.fetchStream(key, signal);
}
__name(fetchStream, "fetchStream");

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/timeout.js
init_esm();
var MAXIMUM_MAX_DURATION = 2147483647;
var timeout2 = {
  None: MAXIMUM_MAX_DURATION,
  signal: timeout.signal
};

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/webhooks.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/imports/uncrypto.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/locals.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/otel.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/schemas.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/heartbeats.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/runs.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/schedules/index.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/envvars.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/queues.js
init_esm();

// node_modules/.pnpm/@trigger.dev+sdk@4.0.4_zod@3.25.76/node_modules/@trigger.dev/sdk/dist/esm/v3/auth.js
init_esm();

export {
  task
};
//# sourceMappingURL=chunk-DFPFTS6O.mjs.map
