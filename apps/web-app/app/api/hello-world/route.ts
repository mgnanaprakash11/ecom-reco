import { tasks } from "@trigger.dev/sdk";
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  const handle = await tasks.trigger("hello-world", { name: "James" });
  return NextResponse.json(handle);
}

