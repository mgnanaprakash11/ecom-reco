import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const nextConfig: NextConfig = {
  turbopack: {
    root: workspaceRoot,
  },
  transpilePackages: ["@repo/db"],
};

export default withWorkflow(nextConfig);
