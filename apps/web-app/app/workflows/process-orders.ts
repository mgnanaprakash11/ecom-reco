import {
  type OrdersUploadPayload,
  type ProcessOrdersUploadResult,
  processOrdersUpload,
} from "@/lib/workflows/process-orders-upload";

async function runProcessOrdersStep(
  payload: OrdersUploadPayload,
): Promise<ProcessOrdersUploadResult> {
  "use step";
  return processOrdersUpload(payload);
}

export async function processOrdersWorkflow(
  payload: OrdersUploadPayload,
): Promise<ProcessOrdersUploadResult> {
  "use workflow";
  return runProcessOrdersStep(payload);
}
