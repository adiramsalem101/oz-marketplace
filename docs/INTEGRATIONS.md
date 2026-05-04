# INTEGRATIONS

External systems oz-marketplace talks to. One row per vendor: purpose, files where it lives, lifecycle status.

Source: `recon/08-integrations.md`, with BUILD_PLAN §3.A overrides applied (AI Import → Anthropic Claude; Email → Resend; Neema deferred to Phase 9; crons trimmed to three).

---

| # | Vendor | Purpose | Where it lives in this repo | Lifecycle status |
|---:|---|---|---|---|
| 1 | **Supabase** (Postgres + Auth + Storage + Edge Functions) | Database, authentication, file storage, AI Import edge function host. | `supabase/`, `lib/supabase/` (added in Phase 3). | Live target — credentials in `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`). |
| 2 | **Vercel** | Frontend hosting + Preview deployments + cron jobs. | `vercel.json` (added in Phase 8), `.env.local` (`VERCEL_OIDC_TOKEN` if needed). | Live — Production at TBD URL, staging via per-PR Vercel Preview. |
| 3 | **Google OAuth** | One of two auth methods for both B2B and B2C signup. | `app/(auth)/`, configured via Supabase Auth provider. | Wired in Phase 3 — uses `NEXT_PUBLIC_GOOGLE_CLIENT_ID` from `.env.local`. |
| 4 | **Twilio** | SMS OTP for the secondary auth path; **Israeli +972 numbers required**. | `lib/integrations/twilio.ts` (added in Phase 3 / 7). Env: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_OTP_FROM_NUMBER`. | Wired in Phase 3 — confirmed provider. |
| 5 | **HelloSign / Dropbox Sign** | Digital signature for Deal Room contracts. Webhook updates contract status. | `lib/integrations/hellosign.ts`, `app/api/webhooks/hellosign/route.ts` (added in Phase 7). Env: `HELLOSIGN_API_KEY`, `HELLOSIGN_CLIENT_ID`, `HELLOSIGN_WEBHOOK_SECRET`. | Wired in Phase 7. |
| 6 | **Anthropic Claude (Haiku model)** | AI Import — parse Excel sheets uploaded by Manager into worker / property records. **CP-1 OQ-1.** | `supabase/functions/ai-import/` and `lib/integrations/anthropic.ts` (added in Phase 7). Env: `ANTHROPIC_API_KEY`. | Wired in Phase 7. The legacy edge function (which used Google Gemini) is **not ported** — re-implemented against the Anthropic API. |
| 7 | **Pelecard** (payments — IRON_RULE 2) | Israeli payment provider. Mirrors the Pakal Nofesh implementation pattern. **The only allowed payment provider.** | `lib/integrations/pelecard.ts`, `app/api/webhooks/pelecard/route.ts` (added in Phase 6). Env: `PELECARD_TERMINAL_NUMBER`, `PELECARD_API_USER`, `PELECARD_API_PASSWORD`, `PELECARD_ENV` (`test` or `live`). | Wired in Phase 6 (alongside the hostel booking engine). Test mode in dev; live mode requires explicit Adir approval. |
| 8 | **Resend** | Transactional email (KYC events, contract events, booking confirmations). **CP-1 OQ-26.** | `lib/integrations/resend.ts` (added in Phase 7). Env: `RESEND_API_KEY`. | Wired in Phase 7 — confirmed provider. |
| 9 | **NotebookLM** (Google) | Export *target*, not API. The reports system exports markdown formatted for NotebookLM ingestion. | Markdown serialiser in `lib/reports/` (added in Phase 4). | Implemented as a markdown shape, no API call. |
| 10 | **FrontDeskMaster (FDM)** | External system handling AM HOSTELS bookings today via external links. The legacy uses external links from the marketplace; the new Hostel Booking Engine (Phase 6) is the eventual replacement. | No code in this repo — referenced from copy on the future hostel landing page. | External, not integrated. |
| 11 | **Pakal Nofesh** (`pakalnofesh.co.il`) | Sister project sharing the same stack — the implementation pattern oz-marketplace's payment integration mirrors. | Reference only. | Not an integration; pattern source for Pelecard work. |
| 12 | **Stripe** | **Banned in production by IRON_RULE 2.** | Not used. The legacy `hostel_bookings.stripe_session_id` column is dropped per CP-1 OQ-2. | Excluded. |
| 13 | **Meshulam** | Considered as a payment provider, **rejected.** | Not used. | Rejected — superseded by Pelecard. |
| 14 | **Neema** | Deferred to Phase 9 per CP-1 OQ-15. Not present in legacy code or docs. | Not used in MVP. | Deferred — see `specs/dreams/` if and when it lands. |

---

## MVP cron jobs (CP-1 OQ-29)

Three cron jobs are in MVP scope (added in Phase 8, configured in `vercel.json`):

| Cron | Cadence | Purpose |
|---|---|---|
| `health-check` | every 30 min | Hits `app/api/health/route.ts`; alerts ops if unhealthy. |
| `vercel-monitor` | every 2 hours | Monitors staging deploy health; staging-only per `DECISIONS_LOG.md` "Daily auto-deploy is staging-only". |
| `qa-checks` | every 6 hours | Runs synthetic QA flows against staging. |

`daily-report` and `paperclip-sync` are operational (Uzi/Paperclip) and live outside this product.

---

## Env summary

The merged `.env.local` and committed `.env.example` are produced in Phase 0 per BUILD_PLAN §3.E. Variables fall into three buckets:

1. **Live values present** (carried in from the legacy `.env.local`): Supabase URL/keys, Twilio account/token, HelloSign API key, Anthropic API key.
2. **Canonical-but-empty** (need values during Phases 3, 6, 7): `TWILIO_OTP_FROM_NUMBER` (legacy variant `TWILIO_SMS_FROM` retained under "Legacy / unclassified" in `.env.local`), `HELLOSIGN_CLIENT_ID`, `HELLOSIGN_WEBHOOK_SECRET`, all Pelecard vars, `RESEND_API_KEY`, `CRON_SECRET`.
3. **Legacy / unclassified** (preserved at the bottom of `.env.local`, not mirrored to `.env.example`): `VERCEL_OIDC_TOKEN`, `NEXT_PUBLIC_ENV`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `SUPABASE_DB_PASSWORD`, `TWILIO_SMS_FROM`, `HELLOSIGN_TEST_MODE`, `HELLOSIGN_TEMPLATE_ID`, `GEMINI_API_KEY`.

The `GEMINI_API_KEY` is preserved in `.env.local` for legacy operational reasons; the AI Import feature in oz-marketplace does **not** consume it (per CP-1 OQ-1, AI Import uses Anthropic Claude).
