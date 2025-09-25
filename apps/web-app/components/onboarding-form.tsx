"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FALLBACK_TIMEZONE = "Asia/Kolkata";
const SUPPORTED_TIMEZONES = [
  FALLBACK_TIMEZONE,
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Jakarta",
  "Asia/Ho_Chi_Minh",
  "Asia/Bangkok",
  "Asia/Tokyo",
  "UTC",
];

type PlatformOption = {
  id: string;
  name: string;
  code: string | null;
};

type OnboardingFormProps = React.ComponentPropsWithoutRef<"div"> & {
  platforms: PlatformOption[];
  defaultTimezone?: string;
  defaultContactName?: string;
  userEmail?: string | null;
};

type FormState = {
  companyName: string;
  contactName: string;
  gstNumber: string;
  industry: string;
  timezone: string;
  platformId: string;
  sellerIdentifier: string;
};

export function OnboardingForm({
  platforms,
  defaultTimezone,
  defaultContactName,
  userEmail,
  className,
  ...props
}: OnboardingFormProps) {
  const router = useRouter();
  const timezoneOptions = useMemo(() => {
    const values = new Set<string>(SUPPORTED_TIMEZONES);
    if (defaultTimezone && defaultTimezone.trim().length > 0) {
      values.add(defaultTimezone);
    }
    return Array.from(values);
  }, [defaultTimezone]);

  const [formState, setFormState] = useState<FormState>(() => {
    const initialTimezone = timezoneOptions[0] ?? FALLBACK_TIMEZONE;
    return {
      companyName: "",
      contactName: defaultContactName ?? "",
      gstNumber: "",
      industry: "",
      timezone:
        defaultTimezone && timezoneOptions.includes(defaultTimezone)
          ? defaultTimezone
          : initialTimezone,
      platformId: "",
      sellerIdentifier: "",
    } satisfies FormState;
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const companyName = formState.companyName.trim();
    const sellerIdentifier = formState.sellerIdentifier.trim();
    const contactName = formState.contactName.trim();
    const gstNumber = formState.gstNumber.trim();
    const industry = formState.industry.trim();

    if (!companyName) {
      setError("Company name is required");
      return;
    }

    if (formState.platformId && !sellerIdentifier) {
      setError("Seller identifier is required when a platform is selected");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboarding/tenant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          contactName: contactName || undefined,
          gstNumber: gstNumber || undefined,
          industry: industry || undefined,
          timezone: formState.timezone,
          platformId: formState.platformId || undefined,
          sellerIdentifier: formState.platformId ? sellerIdentifier : undefined,
        }),
      });

      const data = await response
        .json()
        .catch(() => ({ error: "Failed to parse server response" }));

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to save onboarding details",
        );
      }

      router.push("/protected");
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while saving your details",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "platformId" && value === ""
          ? { sellerIdentifier: "" }
          : {}),
      }));
    };

  const platformSelectDisabled = platforms.length === 0;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Complete your workspace setup</CardTitle>
          <CardDescription>
            Tell us about your business so we can configure your account.
          </CardDescription>
          {userEmail ? (
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium">{userEmail}</span>
            </p>
          ) : null}
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Commerce Pvt Ltd"
                  value={formState.companyName}
                  onChange={updateField("companyName")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactName">Primary contact</Label>
                <Input
                  id="contactName"
                  placeholder="Jane Doe"
                  value={formState.contactName}
                  onChange={updateField("contactName")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="Electronics"
                  value={formState.industry}
                  onChange={updateField("industry")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gstNumber">GST number</Label>
                <Input
                  id="gstNumber"
                  placeholder="22AAAAA0000A1Z5"
                  value={formState.gstNumber}
                  onChange={updateField("gstNumber")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={formState.timezone}
                  onChange={updateField("timezone")}
                >
                  {timezoneOptions.map((timezone) => (
                    <option key={timezone} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platform">Primary marketplace (optional)</Label>
                <select
                  id="platform"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={formState.platformId}
                  onChange={updateField("platformId")}
                  disabled={platformSelectDisabled}
                >
                  <option value="">
                    {platformSelectDisabled
                      ? "No platforms available yet"
                      : "Select a platform"}
                  </option>
                  {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                      {platform.code ? ` (${platform.code})` : ""}
                    </option>
                  ))}
                </select>
                {platformSelectDisabled ? (
                  <p className="text-xs text-muted-foreground">
                    Platform integrations will appear here once configured. You
                    can continue without linking one.
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    We use this to link your marketplace data. You can add more
                    later.
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sellerIdentifier">Seller identifier</Label>
                <Input
                  id="sellerIdentifier"
                  placeholder="SELLER123"
                  value={formState.sellerIdentifier}
                  onChange={updateField("sellerIdentifier")}
                  disabled={!formState.platformId}
                />
                <p className="text-xs text-muted-foreground">
                  Required if you choose a platform. Leave blank otherwise.
                </p>
              </div>
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving details..." : "Save and continue"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            You can update these details later from workspace settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
