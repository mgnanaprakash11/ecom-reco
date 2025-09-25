"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { uploadOrdersCsv, type UploadState } from "./actions";

export type TenantPlatformOption = {
  id: string;
  label: string;
  helper?: string;
};

type UploadFormProps = {
  tenantPlatforms: TenantPlatformOption[];
};

const INITIAL_STATE: UploadState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Uploading..." : "Upload CSV"}
    </Button>
  );
}

export function UploadForm({ tenantPlatforms }: UploadFormProps) {
  const [state, formAction] = useFormState(uploadOrdersCsv, INITIAL_STATE);
  const [fileLabel, setFileLabel] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      setFileLabel("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="file">Order CSV</Label>
        <Input
          ref={fileInputRef}
          id="file"
          name="file"
          type="file"
          accept=".csv"
          required
          onChange={(event) => {
            const nextFile = event.target.files?.[0];
            setFileLabel(nextFile ? nextFile.name : "");
          }}
        />
        <p className="text-xs text-muted-foreground">
          Upload the latest export from your marketplace dashboard (.csv, max 20 MB).
        </p>
        {fileLabel ? (
          <p className="text-xs text-foreground/80">Selected: {fileLabel}</p>
        ) : null}
      </div>

      {tenantPlatforms.length > 0 ? (
        <div className="flex flex-col gap-2">
          <Label htmlFor="tenantPlatformId">Marketplace / Store</Label>
          <select
            id="tenantPlatformId"
            name="tenantPlatformId"
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            defaultValue=""
          >
            <option value="">Select a connected store (optional)</option>
            {tenantPlatforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.helper ? `${platform.label} (${platform.helper})` : platform.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Map this upload to a specific marketplace if you have multiple integrations.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Optional context for this upload (e.g. date range, source report)."
          className="min-h-[96px] rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      {state.status === "error" ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {state.message}
        </div>
      ) : null}

      {state.status === "success" ? (
        <div className="rounded-md border border-emerald-300/40 bg-emerald-500/10 p-3 text-sm text-emerald-600">
          {state.message}
          {state.fileName ? ` (${state.fileName})` : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p className="text-xs text-muted-foreground">
          We log the upload in <code className="font-mono text-xs">data_upload_batches</code> with status
          <span className="ml-1 font-medium">received</span> for downstream processing.
        </p>
      </div>
    </form>
  );
}
