# 10 — Open Questions

Every place where the legacy docs are unclear, contradictory, or assume context not written down. Cited with `file:line`. No fabrication — flagging only.

---

## Doc ↔ code contradictions

### OQ-1 — AI Import: Anthropic Haiku (docs) vs. Google Gemini (code)
**Where:** `docs/ONBOARDING_DAGAN.md:85`, `docs/B2B_SPECS_MVP.md:241, 253`, `docs/GLOSSARY.md:79`, `docs/B2C_SPECS_DREAMS.md:79` all say **"Anthropic API (Haiku)"**. The actual edge function at `oz-marketplace-legacy/supabase/functions/ai-import/index.ts:1` imports `npm:@google/generative-ai` (**Google Gemini**).
**Question:** which provider is correct for the rebuild?

### OQ-2 — Stripe column in `hostel_bookings` violates IRON_RULE 2
**Where:** `baseline.sql:524` declares `stripe_session_id text` on `hostel_bookings`. `docs/IRON_RULES.md:26` says "NO Stripe in production." `_archive/016_hostel_bookings.sql:2-25` and `_archive/017_run_in_prod.sql:20-43` introduced this column.
**Question:** drop the column, rename it generically (`external_payment_session_id`), or grandfather it for legacy rows?

### OQ-3 — `profiles.role` default is `admin_corporate`, but B2C/Solo flow expects `owner`
**Where:** `baseline.sql:646-654` declares `profiles.role` text default `'admin_corporate'` with CHECK allowing `{owner, corporate, ops, admin, admin_corporate, manager_property, field_staff}`. The DB trigger `handle_new_user()` (`baseline.sql:179`) hardcodes `role = 'admin_corporate'` on every new auth.users insert. But `docs/B2C_SPECS_MVP.md:76` requires "Google OAuth completes successfully and creates a `profiles` row with `role = 'owner'`."
**Question:** how does the B2C flow set role correctly? Is there an UPDATE after signup? Should the trigger be persona-aware?

### OQ-4 — `user_role` enum (4 values) vs. `profiles.role` text (7 values)
**Where:** `baseline.sql:91-96` defines enum `user_role AS ENUM ('owner', 'company', 'ops', 'admin')`. `baseline.sql:646-654` defines `profiles.role` text with 7 allowed values. The two sets only partially overlap.
**Question:** which is canonical? Should the rebuild collapse to one source of truth?

### OQ-5 — The `property_owners` table referenced in code doesn't exist
**Where:** `docs/SCHEMA.md:76`, `docs/IRON_RULES.md:80`, `docs/DECISIONS_LOG.md:98-104`. Acknowledged as a known bug; `/api/contracts/send` references `property_owners` but the actual table is `owners`.
**Status:** decision is logged (rename references to `owners`); the bug fix has not yet shipped per `docs/B2C_SPECS_MVP.md:222`.

### OQ-6 — Tier badge code uses A/B/C, spec says T1/T2
**Where:** `docs/brand/components.md:114-116` — "Currently uses A/B/C in code (legacy); spec says T1/T2 (current). TODO: Migrate code from A/B/C → T1/T2." `baseline.sql:548` confirms `listings.verification_tier CHECK IN ('A','B','C')`. Specs use Tier 1/2/3 (`docs/B2C_SPECS_MVP.md:114-116`, `docs/GLOSSARY.md:66-74`).
**Question:** the migration is already TODO'd. Should the rebuild adopt T1/T2/T3 from day 1 (and use a numeric `tier` smallint)?

### OQ-7 — `get_signed_url()` hardcodes the production project ID
**Where:** `baseline.sql:160-176` — function body contains `'https://qibpjlmojuovakkzjpdd.supabase.co/storage/v1/object/sign/...'`.
**Question:** the rebuild must replace this hardcoded URL with an environment lookup (or use Supabase's native `createSignedUrl()` helper). Confirm the new project ID (likely a fresh Supabase project for the rebuild).

---

## Missing docs referenced as if they exist

### OQ-8 — `BOOKING_SYSTEM_MVP.md` not present
**Where referenced:** `docs/README.md:40` lists it as a Layer 3 cross-cutting system file.
**Reality:** file does not exist under `docs/`.

### OQ-9 — `BOOKING_SYSTEM_DREAMS.md` not present
**Where referenced:** `docs/README.md:41`, `docs/B2B_SPECS_MVP.md:19`, `docs/B2C_SPECS_MVP.md:18`. Pointed to whenever readers ask "where's the hostel booking spec?"
**Reality:** file does not exist.

### OQ-10 — `VIRTUAL_TOUR_SPECS.md` not present
**Where referenced:** `docs/README.md:42`.
**Reality:** file does not exist.

### OQ-11 — `PROJECT_SPECS.md` not present
**Where referenced:** `docs/README.md:50` ("legacy, being broken down"), `docs/B2C_SPECS_MVP.md:17` ("Construction corporation buyers (demand side) → see PROJECT_SPECS.md").
**Reality:** file does not exist. The B2C spec sends readers to a missing doc for the demand-side persona.

### OQ-12 — Demand-side (Construction Corporation) spec is undocumented
**Where:** `docs/README.md:30-34` table marks Demand spec as `_(in PROJECT_SPECS for now)_` and `_(future split)_`.
**Reality:** `PROJECT_SPECS.md` doesn't exist. The demand side persona is referenced in many specs but has no canonical document.

### OQ-13 — `payment-provider-analysis.md` referenced as superseded
**Where:** `docs/IRON_RULES.md:27`, `docs/DECISIONS_LOG.md:135` — "the `payment-provider-analysis.md` from 22/3 recommended Meshulam, but the decision moved to Pelecard."
**Reality:** the file does not exist in `docs/`. Probably deleted; no harm.

### OQ-14 — `HEARTBEAT` referenced for staging URLs
**Where:** `docs/README.md:96` — "Staging: Vercel Preview deployments (no fixed URL — see HEARTBEAT)".
**Reality:** no HEARTBEAT file in `docs/`. Likely an Uzi/agent file outside `/docs/`.

---

## Vendors / names that need clarification

### OQ-15 — "Neema" is unknown
**Where:** the recon brief lists "Neema" as an integration to check for. **Not found** in any legacy doc, code, or asset.
**Question:** is Neema a planned integration not yet documented, or a typo? (A person named `נטע` / "Neta" appears in mockups — possible mistranslation.)

### OQ-16 — Hostel name list discrepancy
**Where:** the recon brief names six hostels (Cinema, Zuzu, Jungle Jaffa, Haifa, Tiberias, Bayit-Yafo). The schema enum allows only **four** values: `jerusalem, telaviv, haifa, tiberias` (`baseline.sql:524-528`). The mockups depict 4 hostels under the AM HOSTELS brand. "Zuzu" and "Bayit-Yafo" do not appear anywhere.
**Question:** are these the wrong names, or has the property list grown beyond what the legacy schema captures?

### OQ-17 — `hostel_id` slug variants: `telaviv` vs `tel-aviv`
**Where:** schema CHECK constraint uses `telaviv` (no separator) at `baseline.sql:524`; the newer mockup uses slug `tel-aviv` (`AM_Hostels_Booking_System.html:937` and the data array). The older v1 mockup uses **different** slugs entirely (`cinema-jerusalem`, `tel-aviv-jaffa`, `haifa`, `tiberias`).
**Question:** which slug convention is canonical?

---

## Migrations / archived state

### OQ-18 — Archived migrations 013_payments and 018_rooms describe schemas that don't match the live DB
**Where:** `_archive/README.md:18-22` — "Two migrations were superseded, not applied as written... `013_payments.sql` defines `payments(contract_id, amount_ils)`. Live DB has `payments(booking_id, amount_agorot)`. `018_rooms.sql` defines `rooms(floor, beds, has_bathroom)`. Live DB has `rooms(beds_count, room_size_sqm, min_space_per_person_sqm)`."
**Status:** acknowledged in the archive README. No question outstanding — but the rebuild should ignore these archived intent files entirely.

### OQ-19 — Numbering gaps in legacy migrations
**Where:** `docs/SCHEMA.md:122` — "**Note on numbering gaps (013-018):** Not present in repo. Reason unknown. May have been local-only experiments or skipped intentionally."
**Reality:** files 013-018 actually DO exist in `_archive/` (we found them); the docs/SCHEMA.md narrative is outdated. Minor doc drift.

---

## Brand / design

### OQ-20 — Heebo and Assistant declare 4 weights but only ship 1 woff2 file each
**Where:** `assets/fonts/fonts.css:13-20` declares Heebo at weights 400/500/700/800; only `Heebo-400-{he,la}.woff2` files exist. Same for Assistant. The browser will synthesise heavier strokes (faux bold).
**Question:** ship the missing weights, or accept faux bold? The font weight cap matters because `design-tokens.md:148-149` calls for explicit `font-bold (700)` on H2/H3 and `font-extrabold (800)` on H1/hero/KPI values.

### OQ-21 — No spacing scale defined in `brand/`
**Where:** `design-tokens.md:161` opens `## Spacing & sizing` but only contains border-radius, shadows, transitions. No `--space-N` tokens in `colors_and_type.css`. Mockups use ad-hoc pixel values.
**Question:** before the rebuild scaffolds SCSS modules, what is the canonical spacing scale (e.g., 4/8/12/16/24/32/48/64)?

### OQ-22 — No breakpoint scale defined in `brand/`
**Where:** only `--container-xl: 1280px` in tokens. Mockups use ad-hoc media queries (`max-width: 1024px`, `max-width: 580px`).
**Question:** define a breakpoint scale.

### OQ-23 — No z-index scale defined in `brand/`
**Where:** none declared. **Question:** define a scale before any modal/dropdown/tooltip is built.

### OQ-24 — `.kpi .ic` uses physical `left: 14px` instead of logical `inset-inline-end`
**Where:** `assets/styles.css:80`. In RTL mode (the default for OZ), the icon ends up on the wrong side of the KPI card.
**Status:** isolated bug; documented in `04e-brand-components.md`. Fix in rebuild.

### OQ-25 — `.tbl thead th` uses `text-align: right` instead of `text-align: end`
**Where:** `assets/styles.css:111`. RTL works because right ≈ start in RTL, but breaks for any LTR override.
**Status:** isolated bug.

### OQ-26 — Resend integration confidence
**Where:** `docs/ONBOARDING_DAGAN.md:82` — "Email: Resend (CSP מוגדר, אבל לא בטוח שמשולב בקוד — לבדוק)" (CSP is configured but not sure it's wired in code — verify).
**Question:** is Resend live in the legacy app or only allowlisted? If we are starting fresh, the answer matters less — just confirm it's the chosen provider.

---

## Operational

### OQ-27 — `.env.example` does not exist in legacy or rebuild
**Where:** `docs/ONBOARDING_DAGAN.md:170` — "Setup `.env.local` מאדיר/מקי (לא קיים `.env.example` ב-repo)" ("get from Adir/Maki — there is no .env.example in repo"). Confirmed: no `.env.example` in the legacy repo and no `.env.example` in oz-marketplace.
**Question:** the rebuild should create one. The full env-var list is not centrally documented; reconstructing it from vendor list:
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Twilio: account SID, auth token, OTP-source phone
- HelloSign: API key, client ID, webhook secret
- Pelecard: terminal #, API user, API password, env (test/live)
- Resend: API key
- Anthropic OR Google AI: API key
- Vercel: project token (for cron secrets)

### OQ-28 — `staging` branch and Preview deployment URLs are not in any single doc
**Where:** `docs/ONBOARDING_DAGAN.md:96-100`, `docs/GLOSSARY.md:158`, `docs/README.md:96`. Information is scattered.
**Question:** consolidate environment URL list in the rebuild's `README.md`.

### OQ-29 — Cron jobs are referenced but not specified
**Where:** `docs/ONBOARDING_DAGAN.md:216` — "Cron jobs פעילים: health-check (30m), vercel-monitor (2h), daily-report (12:00), qa-checks (6h), paperclip-sync (4h)." No spec exists for any of them.
**Question:** which crons are required for the marketplace MVP? `health-check` is obvious; the others (vercel-monitor, daily-report, qa-checks, paperclip-sync) appear to be Uzi-agent operational, not product. Confirm.

---

## Process / governance

### OQ-30 — TASKS.md is named as anti-source-of-truth in IRON_RULE 7 — but no doc points at the actual task list
**Where:** `docs/IRON_RULES.md:88-100`. Rule 7 is "Don't trust TASKS.md as source of truth." The source-of-truth hierarchy is: code → DB → DECISIONS_LOG → /docs/. **No active task tracker is named.**
**Question:** for the rebuild, where should sprint planning live? (Likely a separate question from this recon.)

### OQ-31 — `OPEN_QUESTIONS.md` in legacy is currently empty
**Where:** `docs/OPEN_QUESTIONS.md:5` — "No active open questions. All decisions through 2026-04-30 are captured in `DECISIONS_LOG.md`."
This recon file (10-open-questions.md) **is** therefore the largest active question list now in existence. Many of the items above are either fresh recon discoveries or doc gaps the legacy team hasn't yet acknowledged. Worth back-porting selected items into the legacy `OPEN_QUESTIONS.md` after the rebuild plan is approved.
