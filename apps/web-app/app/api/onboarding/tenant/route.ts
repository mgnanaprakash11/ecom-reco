import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { db, schema } from "@repo/db";
import { slugify } from "@/lib/utils";

type OnboardingPayload = {
  companyName: string;
  contactName?: string;
  gstNumber?: string;
  industry?: string;
  timezone?: string;
  platformId?: string;
  sellerIdentifier?: string;
};

function normalizeTimezone(value?: string | null) {
  if (!value) return "Asia/Kolkata";
  return value;
}

export async function POST(req: NextRequest) {
  let payload: OnboardingPayload;
  try {
    payload = (await req.json()) as OnboardingPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!payload?.companyName || typeof payload.companyName !== "string") {
    return NextResponse.json(
      { error: "companyName is required" },
      { status: 400 },
    );
  }

  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingMembership = await db.query.tenantMembers.findFirst({
    columns: { tenantId: true },
    where: (tenantMembers, { eq }) => eq(tenantMembers.userId, user.id),
  });

  if (existingMembership) {
    return NextResponse.json(
      {
        tenantId: existingMembership.tenantId,
        alreadyOnboarded: true,
      },
      { status: 200 },
    );
  }

  const baseSlug = slugify(payload.companyName, crypto.randomUUID().slice(0, 8));

  const result = await db.transaction(async (tx) => {
    // Ensure the auth user exists in our internal users table
    await tx
      .insert(schema.users)
      .values({
        id: user.id,
        email: user.email ?? "",
        fullName:
          payload.contactName ??
          (user.user_metadata?.full_name as string | undefined) ??
          null,
        phoneNumber:
          (user.phone as string | undefined) ??
          (user.user_metadata?.phone as string | undefined) ??
          null,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: schema.users.id,
        set: {
          email: user.email ?? "",
          fullName:
            payload.contactName ??
            (user.user_metadata?.full_name as string | undefined) ??
            null,
          phoneNumber:
            (user.phone as string | undefined) ??
            (user.user_metadata?.phone as string | undefined) ??
            null,
          updatedAt: new Date(),
        },
      });

    // Resolve a unique slug for the tenant
    let tenantSlug = baseSlug;
    const slugCollision = await tx.query.tenants.findFirst({
      columns: { id: true },
      where: (tenants, { eq }) => eq(tenants.slug, tenantSlug),
    });

    if (slugCollision) {
      tenantSlug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
    }

    const tenantId = crypto.randomUUID();

    const [tenant] = await tx
      .insert(schema.tenants)
      .values({
        id: tenantId,
        name: payload.companyName,
        slug: tenantSlug,
        industry: payload.industry ?? null,
        gstNumber: payload.gstNumber ?? null,
        timezone: normalizeTimezone(payload.timezone),
        currency: "INR",
      })
      .returning({
        id: schema.tenants.id,
        slug: schema.tenants.slug,
      });

    await tx
      .insert(schema.tenantMembers)
      .values({
        id: crypto.randomUUID(),
        tenantId: tenant.id,
        userId: user.id,
        role: "owner",
      })
      .onConflictDoNothing({
        target: [schema.tenantMembers.tenantId, schema.tenantMembers.userId],
      });

    let tenantPlatformId: string | null = null;

    if (payload.platformId && payload.sellerIdentifier) {
      const [platform] = await tx
        .insert(schema.tenantPlatforms)
        .values({
          id: crypto.randomUUID(),
          tenantId: tenant.id,
          platformId: payload.platformId,
          status: "active",
          sellerIdentifier: payload.sellerIdentifier,
          currency: "INR",
          activatedAt: new Date(),
        })
        .returning({ id: schema.tenantPlatforms.id });

      tenantPlatformId = platform?.id ?? null;
    }

    return {
      tenantId: tenant.id,
      slug: tenant.slug,
      tenantPlatformId,
    };
  });

  return NextResponse.json(result, { status: 201 });
}
