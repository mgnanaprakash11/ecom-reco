## Phase Roadmap

**Phase 0 – Foundations**
- Wire Supabase Auth (email/password) to the Next.js app.
- Create the `order-uploads` bucket in Supabase Storage.
- Provision Postgres (Neon or Supabase) and apply the `order_uploads` schema via Drizzle.
- Ship the `/upload` UI with CSV validation and metadata capture.

**Phase 1 – Operational Confidence**
- Add optimistic UI states, upload size limits, and checksum duplication checks.
- Surface richer history (filters, pagination) and expose download links from Supabase Storage.
- Automate bucket/object cleanup policies and add basic monitoring (Supabase logs, Vercel analytics).

**Phase 2 – Processing Pipeline**
- Introduce a background worker (Vercel Workflows, Supabase Edge Functions, or cron) that parses uploads into raw tables.
- Extend `order_uploads` with status transitions (`processing`, `failed`, `completed`) and error metadata.
- Build unit tests for the parsing logic and upload lifecycle.

**Phase 3 – Insights & Integrations**
- Add dashboards or exports summarising order counts per store/date.
- Integrate alerts (email/webhook) for failed uploads or stalled processing.
- Explore dbt models or direct SQL views for analytics once raw tables exist.

Stay focused on auth + uploads; expand only after operational confidence is high.
