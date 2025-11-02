"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { uploadOrdersCsv, type UploadState } from "./actions";

const INITIAL_STATE: UploadState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Uploading..." : "Upload CSV"}
    </Button>
  );
}

export function UploadForm() {
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="storeName">Store name</Label>
        <Input
          id="storeName"
          name="storeName"
          placeholder="Optional name used to identify this Shopify store"
        />
        <p className="text-xs text-muted-foreground">
          Helpful when you manage multiple storefronts or marketplaces.
        </p>
      </div>

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
          We log the upload in <code className="font-mono text-xs">order_uploads</code> with status
          <span className="ml-1 font-medium">received</span> for downstream automation.
        </p>
      </div>
    </form>
  );
}
