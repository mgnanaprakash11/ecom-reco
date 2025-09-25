import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { OnboardingForm } from "@/components/onboarding-form";
import { createClient } from "@/lib/supabase/server";
import { db } from "@repo/db";

function resolveTimezone(user: User | null) {
  const timezoneCandidates = [
    user?.user_metadata?.timezone,
    user?.user_metadata?.time_zone,
    user?.user_metadata?.tz,
  ];

  const timezone = timezoneCandidates.find(
    (candidate) => typeof candidate === "string" && candidate.trim().length > 0,
  );

  return (timezone as string | undefined) ?? "Asia/Kolkata";
}

function resolveContactName(user: User | null) {
  const contactCandidates = [
    user?.user_metadata?.full_name,
    user?.user_metadata?.name,
    user?.user_metadata?.display_name,
  ];

  const contactName = contactCandidates.find(
    (candidate) => typeof candidate === "string" && candidate.trim().length > 0,
  );

  return (contactName as string | undefined) ?? undefined;
}

export default async function OnboardingPage() {
  const supabase = await createClient();
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

  if (membership) {
    redirect("/protected");
  }

  const platforms = await db.query.platforms.findMany({
    columns: {
      id: true,
      name: true,
      code: true,
    },
    orderBy: (platforms, { asc }) => asc(platforms.name),
  });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <OnboardingForm
          platforms={platforms}
          defaultTimezone={resolveTimezone(user)}
          defaultContactName={resolveContactName(user)}
          userEmail={user.email}
        />
      </div>
    </div>
  );
}
