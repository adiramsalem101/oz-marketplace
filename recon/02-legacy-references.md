# 02 — Legacy References

Scope: every text file under `../worker-housing-platform/docs/`.
Purpose: catalogue every reference to legacy infrastructure (URLs, paths, env names, table names, RPCs, vendor names, Tailwind) that will need translation, replacement, or flagging during the oz-marketplace rebuild.
For each pattern: total file/occurrence counts, then up to 5 representative excerpts as `file:line — context`.

---

## A. URL substring `worker-housing-platform`

**Occurrences:** 4 across 2 files.

- `docs/ONBOARDING_DAGAN.md:88` — `- **Repo:** \`github.com/adiramsalem101/worker-housing-platform\``
- `docs/ONBOARDING_DAGAN.md:167` — `- Clone repo: \`git clone github.com/adiramsalem101/worker-housing-platform\``
- `docs/ONBOARDING_DAGAN.md:215` — `- **GitHub** — repo \`adiramsalem101/worker-housing-platform\``
- `docs/README.md:94` — `- **Repo:** \`github.com/adiramsalem101/worker-housing-platform\``

> Translation note: every reference must be re-pointed at the oz-marketplace repo URL when the new repo's GitHub remote exists.

---

## B. URL substring `github.com/adiramsalem101`

**Occurrences:** 3 across 2 files (subset of above).

- `docs/ONBOARDING_DAGAN.md:88`
- `docs/ONBOARDING_DAGAN.md:167`
- `docs/README.md:94`

---

## C. Hard-coded monorepo paths (`/apps/`, `/packages/`, `src/legacy/`)

**Occurrences:** none found in `docs/`. The legacy repo is not a monorepo at the docs level — top-level directories are `agents/`, `docs/`, `oz-marketplace/`, `oz-marketplace-legacy/`, `scripts/`, `worker-housing/`, `workers/`.

> Note: paths *inside* the docs reference `src/app/...`, `src/hooks/...`, `src/components/...`, `supabase/migrations/`, `supabase/functions/...` — those are non-monorepo Next.js paths but still legacy-relative. See sections G/H below.

---

## D. Environment variable names (uppercase `[A-Z][A-Z0-9_]{3,}`) and `process.env.*`

**Occurrences:** **none found** as `process.env.*` references. **No `.env.example`** exists in `docs/` either.

The only env-shaped names anywhere:
- `docs/ONBOARDING_DAGAN.md:213` — `- **Supabase Dashboard** — עם Service Role Key` (mentions "Service Role Key" by name, not as a literal env var)
- `docs/ONBOARDING_DAGAN.md:170` — `Setup .env.local מאדיר/מקי (לא קיים .env.example ב-repo)` (notes that `.env.example` is missing)
- `docs/SCHEMA.md:116` — `| 010_rls_full_policies.sql | (later) | Service role full access policies |`

> Implication: env vars must be inferred from vendor list (Supabase, Twilio, HelloSign, Pelecard, Resend, Anthropic, Google OAuth, Vercel) — there is **no canonical env list in the legacy docs**. Open question.

---

## E. Supabase table names

Found via `CREATE TABLE` (none — no SQL fenced blocks in docs), `.from('...')` (none in docs), and markdown table-of-tables. The authoritative table list is in `docs/SCHEMA.md:23-82`.

**Live tables with data (7):** `companies`, `profiles`, `properties`, `corporate_properties`, `owners`, `otp_sessions`, `event_log`.

**Live tables currently empty (~22):** `beds`, `bookings`, `contract_signing_requests`, `contracts`, `corporate_leads`, `corporate_workers`, `deals`, `documents`, `hostel_bookings`, `listings`, `maintenance_reports`, `owner_leads`, `payments`, `property_costs`, `property_media`, `rooms`, `teams`, `units`, `verifications`, `workers`.

**Referenced but NOT live (4 — these are bugs/legacy):**
- `property_documents` — `docs/SCHEMA.md:74`, `docs/IRON_RULES.md:78`, `docs/ONBOARDING_DAGAN.md:141`, `docs/DECISIONS_LOG.md:78`
- `monthly_rentals` — `docs/SCHEMA.md:75`, `docs/IRON_RULES.md:79`, `docs/ONBOARDING_DAGAN.md:143`, `docs/DECISIONS_LOG.md:88`
- `property_owners` — `docs/SCHEMA.md:76`, `docs/IRON_RULES.md:80`, `docs/ONBOARDING_DAGAN.md:142` — code bug; actual table is `owners`
- `property_marketplace_settings` — `docs/SCHEMA.md:77`

Representative excerpts (`property_owners` bug):
- `docs/SCHEMA.md:76` — `\`property_owners\` | Referenced in \`/api/contracts/send\` | This is a **bug in the code** — the actual table is \`owners\`. Fix references.`
- `docs/IRON_RULES.md:80` — `\`property_owners\` (referenced in \`/api/contracts/send\`) | Does NOT exist — actual table is \`owners\``
- `docs/DECISIONS_LOG.md:100` — `\`property_owners\` is \`owners\` ... Code at \`/api/contracts/send\` references \`property_owners\`. Table doesn't exist by that name.`

---

## F. Supabase RPC names and Edge Function names

**RPC mentions:** none. The string "rpc" does not appear in any docs file.

**Edge Function mentions:** 1.
- `docs/B2B_SPECS_MVP.md:253` — `**Existing code:** \`/api/ai-import/route.ts\`, \`supabase/functions/ai-import/\`` (the only `supabase/functions/...` reference in all of docs)

---

## G. Legacy Next.js routes (will not exist in oz-marketplace as-is)

These appear in MVP specs as "Existing code" pointers and must be re-evaluated when scaffolding the new app.

- `docs/B2B_SPECS_MVP.md:51` — `7-tab corporate dashboard at \`/dashboard/corporate\``
- `docs/B2B_SPECS_MVP.md:78` — `### Tab 1: Overview (\`/dashboard/corporate?tab=overview\`)`
- `docs/B2B_SPECS_MVP.md:73` — `**Existing code:** \`/register/corporate/\`, \`/api/kyc/upload/\`, \`/api/kyc/review/\``
- `docs/B2B_SPECS_MVP.md:101` — `**Existing code:** \`src/app/dashboard/corporate/page.tsx\`, \`src/hooks/useCorporateData.ts\`, \`src/components/AlertsBanner.tsx\``
- `docs/B2C_SPECS_MVP.md:83` — `**Existing code:** \`src/app/auth/login/page.tsx\`, \`src/app/auth/callback/route.ts\`, \`src/app/api/auth/send-otp/\`, \`src/app/api/auth/verify-otp/\``

Other route patterns referenced 5+ times:
- `/api/contracts/...` (send, create-signature-request) — `docs/B2B_SPECS_MVP.md:200,203`, `docs/B2C_SPECS_MVP.md:221,222`, `docs/SCHEMA.md:76`
- `/api/webhooks/hellosign` — `docs/B2B_SPECS_MVP.md:203`, `docs/B2C_SPECS_MVP.md:221`
- `/api/ai-import` — `docs/B2C_SPECS_DREAMS.md:79`, `docs/B2B_SPECS_MVP.md:253`, `docs/GLOSSARY.md:80`
- `/api/kyc/upload`, `/api/kyc/review` — `docs/B2B_SPECS_MVP.md:73`, `docs/B2C_SPECS_MVP.md:126,132`
- `/deal-room/[id]/` — `docs/B2C_SPECS_MVP.md:221`, `docs/B2B_SPECS_MVP.md:203`
- `/dashboard/owner`, `/register/owner/...` — `docs/B2C_SPECS_MVP.md:78,79,84`

---

## H. Vercel project names and deployment URLs

**Occurrences:** 16 across 5 files. Five most significant:

- `docs/ONBOARDING_DAGAN.md:96` — `Production | \`workerhome.co.il\` | \`main\` | ⛔ אישור אדיר נדרש`
- `docs/ONBOARDING_DAGAN.md:98` — `Bot/Dev | \`workerhome-bot.vercel.app\` | \`bot\` | ✅ פיתוח חופשי`
- `docs/ONBOARDING_DAGAN.md:100` — `\`workerhome-staging.vercel.app\` הוא **URL ישן ולא רלוונטי**` (i.e., dead URL)
- `docs/ONBOARDING_DAGAN.md:214` — `**Vercel Dashboard** — Team \`team_7FYJU9ttRtk0CXRjmmeA5dmU\``
- `docs/GLOSSARY.md:158` — `Vercel Preview deployments (not a fixed URL — \`workerhome-staging.vercel.app\` is **dead**).`

Other URLs / hostnames:
- `workerhome.co.il/api/health` — `docs/ONBOARDING_DAGAN.md:212`
- `pakalnofesh.co.il` — `docs/IRON_RULES.md:24`, `docs/DECISIONS_LOG.md:127`, `docs/GLOSSARY.md:63`
- `book.amhostels.co.il` — only inside hostel mockup HTML

---

## I. Vendor names

### Twilio (SMS/OTP)
**Occurrences:** 6 across 4 files.
- `docs/ONBOARDING_DAGAN.md:80` — `**Auth:** Supabase Auth + Google OAuth + Twilio OTP`
- `docs/ONBOARDING_DAGAN.md:83` — `**SMS:** Twilio`
- `docs/SCHEMA.md:114` — `\`008_otp_sessions.sql\` | 2026-03-21 | T-05: OTP via Twilio`
- `docs/B2C_SPECS_MVP.md:72` — `Authenticates via Google OAuth OR email + Twilio OTP`
- `docs/B2C_SPECS_MVP.md:77` — `[ ] Twilio OTP works for Israeli mobile numbers (+972...)`

### HelloSign / Dropbox Sign (e-signature)
**Occurrences:** 11 across 6 files.
- `docs/GLOSSARY.md:86` — `### HelloSign / Dropbox Sign`
- `docs/GLOSSARY.md:87` — `Both parties (owner + corporation) sign contracts via HelloSign emails, webhook updates \`contracts.status\``
- `docs/SCHEMA.md:47` — `\`contract_signing_requests\` | HelloSign signing request tracking`
- `docs/B2C_SPECS_MVP.md:221` — `Existing code: \`/deal-room/[id]/\`, \`/api/contracts/send/\`, \`/api/webhooks/hellosign/\``
- `docs/B2B_SPECS_MVP.md:197` — `[ ] HelloSign integration sends to both parties (corp signatory + Manager)`

### Stripe (NOT to be used in oz-marketplace)
**Occurrences in product docs:** 5 across 4 files (every occurrence is **excluding** Stripe).
- `docs/IRON_RULES.md:26` — `❌ NO Stripe in production (CSP headers exist, but no live Stripe code)`
- `docs/ONBOARDING_DAGAN.md:124` — `**Pelecard בלבד** — לא Stripe, לא Meshulam`
- `docs/DECISIONS_LOG.md:126-134` — payment provider decision (Pelecard chosen over Stripe + Meshulam)

> Note: the hostel mockup HTML files (`AM_Hostels_Booking_System.html`, `_v1.html`) contain **23+ Stripe references in payment-flow placeholders**. Those are mockup-only and do not affect the marketplace stack — but they are inconsistent with the IRON_RULE that bans Stripe; flagged in 10-open-questions.

### Resend (email)
**Occurrences:** 2.
- `docs/ONBOARDING_DAGAN.md:82` — `**Email:** Resend (CSP מוגדר, אבל לא בטוח שמשולב בקוד — לבדוק)` (configured at CSP but integration not confirmed)
- `docs/B2C_SPECS_MVP.md:127` — `[ ] Owner notified by email (Resend if integrated) or SMS`

### Google OAuth
**Occurrences:** 7 across 5 files.
- `docs/ONBOARDING_DAGAN.md:80` — `Auth: Supabase Auth + Google OAuth + Twilio OTP`
- `docs/B2B_SPECS_MVP.md:59` — `Authenticates via Google OAuth or email + OTP`
- `docs/B2C_SPECS_MVP.md:67,72,76`
- `docs/brand/assets/mockups/supply_a_owner_roadmap.html:139` — `הרשמה (Google OAuth / SMS OTP)...`

### Anthropic / Claude / Haiku (AI)
**Occurrences:** 7 across 5 files.
- `docs/ONBOARDING_DAGAN.md:85` — `**AI:** Anthropic API (Haiku ל-AI Import)`
- `docs/ONBOARDING_DAGAN.md:66` — `9. AI Import (Anthropic Haiku)`
- `docs/B2B_SPECS_MVP.md:241` — `AI (Anthropic Haiku) parses sheets, identifies columns, extracts records`
- `docs/B2C_SPECS_DREAMS.md:79` — `Foundational AI integration exists (\`/api/ai-import\` uses Anthropic API).`
- `docs/GLOSSARY.md:79` — `parsed by Anthropic Haiku and imported as worker or property records`

### Pelecard (payments — canonical)
**Occurrences:** 21 across 9 files. Five most representative:
- `docs/IRON_RULES.md:24` — `**Pelecard is the payment provider.** Implementation by Alon, mirroring the Pakal Nofesh (\`pakalnofesh.co.il\`) pattern.`
- `docs/DECISIONS_LOG.md:124-141` — full decision entry
- `docs/GLOSSARY.md:99` — `### Pelecard`
- `docs/B2C_SPECS_MVP.md:226-251` — full Pelecard MVP feature
- `docs/B2B_SPECS_MVP.md:264` — `Payment info — Pelecard linked account (display only, configured by ops)`

### Neema
**Occurrences:** **none found**. Vendor not present in legacy docs.

### FrontDesk Master / FDM
**Occurrences:** in mockup HTML only (8+ occurrences in `AM_Hostels_Booking_System.html` / `_v1.html`); in product docs only as `FrontDeskMaster`:
- `docs/GLOSSARY.md:50` — `Daily hostel booking engine for OZ's 4 hostel properties (currently handled via FrontDeskMaster external links).`
- `docs/DECISIONS_LOG.md:205` — `Reality: code only has external links to FrontDeskMaster. Tables exist but unused (\`hostel_bookings\` = 0 rows).`
- `docs/DECISIONS_LOG.md:207` — `FrontDeskMaster currently handles all hostel bookings via external links.`
- `docs/README.md:41` — `\`BOOKING_SYSTEM_DREAMS.md\` | Long-term hostel platform vision (replacing FrontDeskMaster)`

### Vercel
**Occurrences:** 14 (see section H).

### Supabase
**Occurrences:** 13+ across 7 files.
- `docs/ONBOARDING_DAGAN.md:79-81` — Supabase as DB / Auth / Storage
- `docs/SCHEMA.md:7` — `pg_dump` reference; `supabase-live-schema-raw.sql`
- `docs/SCHEMA.md:94` — `storage.objects (Supabase Storage bucket access)`
- `docs/B2C_SPECS_MVP.md:99` — `Photos uploaded to Supabase Storage with proper RLS`
- `docs/B2B_SPECS_MVP.md:253` — `supabase/functions/ai-import/`

### Other vendors mentioned (informational, not active)
- **Meshulam** — explicitly rejected (3 mentions across IRON_RULES, ONBOARDING_DAGAN, DECISIONS_LOG)
- **NotebookLM** — used as export-format target only (5 mentions)
- **Codex 5.4** — Uzi-agent default model (mentioned in ONBOARDING_DAGAN, GLOSSARY)

---

## J. Tailwind references

### Literal "tailwind"
**Occurrences:** 4 across 2 files.
- `docs/ONBOARDING_DAGAN.md:77` — `**Frontend:** Next.js 16, React 19, Tailwind 4`
- `docs/ONBOARDING_DAGAN.md:228` — `**לא לשנות \`tailwind.config.js\` בלי לעדכן \`brand/design-tokens.md\`**`
- `docs/ONBOARDING_DAGAN.md:229` — `הסטייל מבוסס Tailwind utilities + custom CSS ב-\`brand/assets/styles.css\``
- `docs/brand/README.md:49` — `Use design tokens from \`assets/colors_and_type.css\` (already integrated into \`tailwind.config\` if not, replace the project tokens with these)`

### `@apply` directive
**Occurrences:** **none** in docs.

### `tw-` prefix on classes
**Occurrences:** 13, all inside `docs/brand/assets/mockups/corporate_assets_full.html` and `corporate_assets_mvp.html` — these are tweak-panel control IDs (`tw-close`, `tw-density`, `tw-color`), **not Tailwind utility class prefixes**. False positive.

### `className=` containing Tailwind-y tokens (`flex|grid|p-N|m-N|text-`)
**Occurrences:** 1 (and it is plain inline-style, not Tailwind).
- `docs/brand/assets/mockups/corp-shared.jsx:111` — `<div className="body" style={{ flex: 1 }}>` — vanilla className `"body"` plus inline `style={{ flex: 1 }}`. **Not a Tailwind class.**

> **Conclusion on Tailwind in legacy docs:** Tailwind 4 is named in the stack (ONBOARDING_DAGAN.md), but the brand system does NOT model utility classes — design tokens live in pure CSS (`assets/colors_and_type.css`, `assets/styles.css`) and the mockups use vanilla CSS + inline styles. **The brand/design-tokens.md file documents tokens framework-agnostically** (see Step 5.4). Removing Tailwind from the new oz-marketplace will not require translating Tailwind utilities — only the legacy app's source uses them.

---

## K. Summary table

| Pattern | Files | Occurrences |
|---|---|---|
| `worker-housing-platform` URL | 2 | 4 |
| `github.com/adiramsalem101` | 2 | 3 |
| Monorepo paths (`/apps/`, `/packages/`, `src/legacy/`) | 0 | 0 |
| `process.env.*` literal | 0 | 0 |
| `CREATE TABLE` SQL fences | 0 | 0 |
| `.from('...')` | 0 (in docs) | 0 |
| Edge Function (`supabase/functions/`) | 1 | 1 |
| RPC (`rpc()`) | 0 | 0 |
| Vercel URLs (workerhome*.vercel.app, workerhome.co.il) | 5 | 16 |
| Twilio | 4 | 6 |
| HelloSign / Dropbox Sign | 6 | 11 |
| Stripe (excluded from prod, allowed in mockups) | 4 docs / 2 mockups | 5 / 23 |
| Resend | 2 | 2 |
| Google OAuth | 5 | 7 |
| Anthropic / Claude / Haiku | 5 | 7 |
| Pelecard | 9 | 21 |
| Neema | 0 | 0 |
| FrontDeskMaster (FDM) | 4 docs / 2 mockups | 4 / 8 |
| Vercel | 5 | 14 |
| Supabase | 7 | 13+ |
| Tailwind (literal) | 2 | 4 |
| `@apply` | 0 | 0 |
| `tw-` prefix (Tailwind) | 0 | 0 (13 false positives) |
| Tailwindy `className=` | 0 | 0 (1 false positive) |
