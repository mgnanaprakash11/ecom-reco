import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthButton } from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-sm font-medium">
            Shopify Order Uploads
          </Link>
          <AuthButton />
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center bg-muted/40 px-5 py-24">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-lg border border-border bg-card p-8 text-left shadow-sm">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Operations Console
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Upload Shopify order exports securely
            </h1>
            <p className="text-sm text-muted-foreground">
              Store CSV exports in Supabase storage and keep a record of each upload for downstream
              reconciliation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {user ? (
              <Button asChild>
                <Link href="/upload">
                  Go to Uploads <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild>
                  <Link href="/auth/sign-up">
                    Create account <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>

          <div className="rounded-md border border-dashed border-border/60 bg-muted/30 p-4 text-xs text-muted-foreground">
            <p>
              Need API access or automated ingestion? Start by uploading your most recent order CSV
              exports here. You can extend this project with Vercel Workflows once you are ready to
              automate parsing.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-6 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shopify Order Uploads</p>
          <p>Powered by Supabase + Next.js</p>
        </div>
      </footer>
    </main>
  );
}
