import { redirect } from "next/navigation";

import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { db, eq, schema } from "@repo/db";

import { UploadForm, type TenantPlatformOption } from "./upload-form";

export default async function UploadPage() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const membership = await db.query.tenantMembers.findFirst({
    columns: { tenantId: true },
    where: (tenantMembers, { eq }) => eq(tenantMembers.userId, user.id),
  });

  if (!membership) {
    redirect("/onboarding");
  }

  const tenantPlatforms = await db
    .select({
      id: schema.tenantPlatforms.id,
      displayName: schema.tenantPlatforms.displayName,
      sellerIdentifier: schema.tenantPlatforms.sellerIdentifier,
      platformName: schema.platforms.name,
    })
    .from(schema.tenantPlatforms)
    .innerJoin(
      schema.platforms,
      eq(schema.platforms.id, schema.tenantPlatforms.platformId),
    )
    .where(eq(schema.tenantPlatforms.tenantId, membership.tenantId));

  const platformOptions: TenantPlatformOption[] = tenantPlatforms.map((platform) => ({
    id: platform.id,
    label:
      platform.displayName ??
      platform.platformName ??
      platform.sellerIdentifier ??
      "Unnamed platform",
    helper: platform.sellerIdentifier ?? platform.platformName ?? undefined,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Order Uploads</h1>
          <p className="text-sm text-muted-foreground">
            Submit order CSV files for reconciliation. Files are stored in the Supabase
            <code className="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">reco-uploads</code> bucket
            and logged for processing.
          </p>
        </div>
        <UploadForm tenantPlatforms={platformOptions} />
      </div>
    </div>
  );
}
