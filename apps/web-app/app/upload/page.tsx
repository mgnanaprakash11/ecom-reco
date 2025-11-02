import { redirect } from "next/navigation";

import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { db } from "@repo/db";

import { ORDER_UPLOADS_BUCKET } from "./actions";
import { UploadForm } from "./upload-form";

export default async function UploadPage() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const recentUploads = await db.query.orderUploads.findMany({
    where: (uploads, { eq }) => eq(uploads.userId, user.id),
    orderBy: (uploads, { desc }) => desc(uploads.createdAt),
    limit: 10,
  });

  const timestampFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Order Uploads</h1>
          <p className="text-sm text-muted-foreground">
            Submit Shopify order CSV exports. Files are stored in the Supabase
            <code className="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">{ORDER_UPLOADS_BUCKET}</code>{" "}
            bucket and tracked for reconciliation.
          </p>
        </div>
        <UploadForm />
        {recentUploads.length > 0 ? (
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-5 py-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                Recent uploads ({recentUploads.length})
              </h2>
            </div>
            <ul className="divide-y divide-border">
              {recentUploads.map((upload) => (
                <li key={upload.id} className="flex flex-col gap-1 px-5 py-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{upload.fileName}</span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {upload.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {upload.createdAt
                        ? timestampFormatter.format(upload.createdAt)
                        : "Pending"}
                    </span>
                    {upload.storeName ? <span>Store: {upload.storeName}</span> : null}
                    {upload.notes ? <span className="truncate">Notes: {upload.notes}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border/70 bg-muted/30 p-5 text-sm text-muted-foreground">
            <p>No uploads yet. Start by submitting your first Shopify order export.</p>
          </div>
        )}
      </div>
    </div>
  );
}
