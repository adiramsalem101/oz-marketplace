# DECISIONS LOG

Every locked product decision, with date and rationale. Append-only — when a decision changes, add a new entry rather than editing the old one.

---

## Format

```
### [DATE] — [TOPIC] — Decision: [SHORT VERSION]

**Context:** What was the question?
**Decision:** What we chose.
**Rationale:** Why.
**Implications:** What changes downstream.
**Status:** ✅ Locked / ⏳ Provisional / 🔄 Superseded by [later entry]
```

---

## Inherited from `worker-housing-platform/docs/DECISIONS_LOG.md` (ported verbatim, 2026-04-30)

### 2026-04-30 — Brand assets: fonts and palette image included

**Context:** After packaging the initial `/docs/brand/` folder, it was discovered that the CSS file `colors_and_type.css` imports from `./fonts/fonts.css`, but the actual font files (woff2) and palette reference image were missing.

**Decision:** Add the fonts and palette image to `/docs/brand/assets/`:
- `assets/fonts/` — 12 woff2 files + fonts.css (Heebo, Assistant, IBM Plex Sans Hebrew, Rubik)
- `assets/00_color_palette.png` — official 7-color palette image (canonical brand reference)

**Rationale:**
- Without the fonts, the CSS doesn't render correctly — mockups and any production component using the tokens would default to system fonts
- The palette PNG is the canonical source-of-truth that drove the green-deep and blue-light corrections (see DECISIONS_LOG entry on Brand color palette)

**Implications:**
- Anyone copying `colors_and_type.css` into the project MUST also copy `fonts/` folder
- The design system is now self-contained in `/docs/brand/assets/`

**Status:** ✅ Locked

---

### 2026-04-30 — Brand color palette canonical reference

**Context:** The `colors_and_type.css` file had two color values that didn't match the official brand palette image (`00_color_palette.png`):
- `--green-deep` was `#2D6A4F` in CSS, but `#206A4F` in the official palette
- `--blue-light` was `#D2E5FA` in CSS (very light blue), but the official palette shows `#205FA8` (mid-saturation blue) for that role

**Decision:** The official palette image is the canonical source. CSS is updated to match.
- `--green-deep`: `#206A4F` (was `#2D6A4F`)
- `--blue-light`: `#205FA8` (was `#D2E5FA`) — this is now the secondary brand accent, not an info background
- A new token `--blue-bg-soft` (`#D2E5FA`) is added to keep the legacy info-background role intact

**Status:** ✅ Locked

---

### 2026-04-30 — DB schema canonical reference (legacy project)

**Context:** Multiple competing schemas existed across migrations, code, and active DB.
**Decision:** The live production DB as captured in the legacy `SCHEMA.md` (2026-04-30) is the canonical reference for the legacy project.
**Status:** ✅ Locked (for the legacy project; oz-marketplace builds its own schema fresh — see CP-1 entries below)

---

### 2026-04-30 — `property_documents` status

**Context:** Migration `007_property_documents.sql` exists in the legacy repo, but the table is not live.
**Decision:** Treat `property_documents` as broken/missing. Do not depend on it.
**Status:** ✅ Locked. In oz-marketplace, the schema is rebuilt fresh — this concern doesn't carry over.

---

### 2026-04-30 — `monthly_rentals` status

**Context:** Referenced in legacy code/docs, not present in live DB.
**Decision:** Treat as future / not implemented.
**Status:** ✅ Locked. In oz-marketplace, the schema is rebuilt fresh — this concern doesn't carry over.

---

### 2026-04-30 — `property_owners` is `owners`

**Context:** Legacy code at `/api/contracts/send` references `property_owners`. Table doesn't exist by that name.
**Decision:** The intended table is `owners` (which exists, with 1 row). The reference is a path bug.
**Status:** ✅ Locked. In oz-marketplace, the canonical name is `owners` from day one.

---

### 2026-04-30 — Architecture: B2C / B2B split with progressive unlock in B2B

**Context:** Choice between binary persona model (B2C/B2B/Operator) vs unified progressive model (Solo/Manager/GSC).
**Decision:** Hybrid.
- **B2C and B2B are separate products** (different dashboards).
- **Within B2B**, progressive feature unlock: Manager (MVP) → GSC (Future) → Group/Network (Future+1).
- B2C → B2B migration is an account upgrade, not progressive unlock.
**Implications:**
- `specs/B2C_MVP.md` covers Solo only
- `specs/B2B_MVP.md` covers Manager (MVP); GSC + Group live in `specs/dreams/B2B_DREAMS.md`
- No separate Operator System spec
**Status:** ✅ Locked

---

### 2026-04-30 — Payment provider: Pelecard

**Context:** Multiple options (Stripe, Meshulam, Pelecard).
**Decision:** Pelecard, implemented by Alon, mirroring the Pakal Nofesh (`pakalnofesh.co.il`) implementation pattern.
**Rationale:**
- Existing AM HOSTELS clearing accounts can be reused
- Lower fees than Stripe
- Native Hebrew support and Israeli regulatory compliance
- Alon already has implementation experience
**Implications:**
- No Stripe code in oz-marketplace (and the legacy `hostel_bookings.stripe_session_id` column is dropped — see CP-1 OQ-2 below)
- The legacy `payment-provider-analysis.md` (22/3) recommendation for Meshulam is **superseded**
**Status:** ✅ Locked

---

### 2026-04-30 — B2B MVP: single user per company

**Context:** Multi-user team accounts vs single user for B2B MVP.
**Decision:** Single user only in MVP. Multi-user team accounts deferred to Phase 9 (future-roadmap).
**Status:** ✅ Locked

---

### 2026-04-30 — Launch date: 15/5/2026

**Context:** Legacy ROADMAP.md (21/3) said launch was April 2026. Did not happen.
**Decision:** Target launch is 15/5/2026.
**Status:** ✅ Locked

---

### 2026-04-30 — B2C → B2B persona migration

**Context:** Some B2C users will grow into B2B. How to handle?
**Decision:** Account upgrade flow (data preserved). Personas remain separate products.
**Status:** ✅ Locked. Not in MVP — flagged for future-roadmap.

---

### 2026-04-30 — Property Verification Tier 3 deferred

**Context:** Tier 3 = paid on-site inspection (₪750 / ₪500 re-visit).
**Decision:** Levels 1 (default) + 2 (remote attestation) are MVP. Level 3 is future. (Note: oz-marketplace renames "tier" → `verification_level`; see CP-1 OQ-6.)
**Status:** 🔄 Superseded by 2026-05-12 — Levels 1 and 2 are also now deferred. The full verification system is out of MVP.

---

### 2026-04-30 — Ratings & Reviews deferred

**Context:** Originally scoped for MVP.
**Decision:** Deferred to post-MVP for both B2C and B2B. Trust signals come from verification badges + identity checks.
**Status:** ✅ Locked

---

### 2026-04-30 — Virtual Tour deferred

**Context:** Mobile virtual property tours.
**Decision:** Future feature (post-MVP). Spec lives in `specs/dreams/VIRTUAL_TOUR_SPECS.md` as a placeholder.
**Status:** ✅ Locked

---

### 2026-04-30 — Hostel Booking Engine (4 hostels) is Future, not MVP

**Context:** Original assumption: booking engine is part of MVP. Reality: legacy code only has external links to FrontDeskMaster. Tables exist but unused.
**Decision:** The Hostel Booking Engine is FUTURE work, not part of the 15/5 launch.
**Implications:**
- `specs/dreams/BOOKING_SYSTEM_DREAMS.md` is the future spec
- The 15/5 launch focuses on B2C + B2B + Corporate Dashboard only
- FrontDeskMaster coexistence strategy stays in place externally
**Status:** ✅ Locked

> **Note:** despite being labelled "future" at the product level, oz-marketplace does scaffold the isolated `hostel_*` schema in Phase 6 to preserve IRON_RULE 1 ahead of any UI work.

---

### 2026-04-30 — Daily auto-deploy is staging-only

**Context:** Earlier policy was "daily auto-deploy if no deploy in 24h."
**Decision:** Auto-deploy is staging-only. Production never auto-deploys.
**Rationale:** Production needs explicit Adir approval (per IRON_RULE 4).
**Status:** ✅ Locked

---

### 2026-04-30 — Maya is Operations Center

**Context:** Maya's role wasn't documented in the spec layer.
**Decision:** Maya = Operations Center for the project. She manages Adir Ground Services and assists with operations expertise.
**Status:** ✅ Locked

---

## CP-1 decisions (BUILD_PLAN §3) — locked 2026-05-02

These decisions came out of the recon (`recon/10-open-questions.md`) and are folded into the build phases. Each line: OQ number · decision · one-sentence rationale.

### Strategic (BUILD_PLAN §3.A)

- **OQ-1 — AI Import provider: Anthropic Claude (Haiku model).** Aligns with stated brand and every doc reference; the legacy edge function (Gemini) is not ported, the feature is re-implemented against the Anthropic API.
- **OQ-15 — Neema: deferred to Phase 9 (post-MVP roadmap).** Not present anywhere in the legacy code or docs; use cases sit beyond MVP scope.
- **OQ-16 — Hostel slugs: `jerusalem`, `tel-aviv`, `haifa`, `tiberias` (kebab-case).** Four hostels live in the AM HOSTELS portfolio; `tel-aviv` (with separator) is canonical going forward.
- **OQ-26 — Email provider: Resend.** Already CSP-allowlisted in legacy; transactional-email focus matches the use cases (KYC, contract events, booking confirmations).
- **OQ-27 — Env strategy: legacy `.env.local` + new `.env.example`.** Phase 0 generates a sanitised `.env.example` template; merge rules documented in BUILD_PLAN §3.E.
- **OQ-29 — MVP cron jobs: `health-check`, `vercel-monitor`, `qa-checks`.** These three carry value for the marketplace itself; `daily-report` and `paperclip-sync` are operational and live outside the product.

### Schema corrections (BUILD_PLAN §3.B — folded into Phase 3)

- **OQ-2 — Drop `hostel_bookings.stripe_session_id`** and all legacy/dead columns. The rebuild does not carry over dead schema.
- **OQ-3 + OQ-4 — Single source of truth for roles.** Enum `user_role` with values `('b2c_owner', 'corporate_member', 'b2b_owner', 'admin')`; the `profiles.role` text column is replaced by this enum; the `handle_new_user()` trigger reads role from `raw_user_meta_data.role` with default `b2c_owner`.
- **OQ-6 — `listings.verification_level smallint NOT NULL CHECK (verification_level IN (1,2,3))`.** Legacy `verification_tier` A/B/C is dropped; naming aligns DB → TS type → component → SCSS module.
- **OQ-7 — `get_signed_url()` rewritten** to use Supabase's native `storage.create_signed_url()` helper — no hardcoded project URL.
- **OQ-17 — All hostel slugs in DB use kebab-case** (`tel-aviv`, not `telaviv`); schema CHECK constraint updated.
- **OQ-24 — `KpiCard.module.scss`** uses `inset-inline-end` instead of physical `left`.
- **OQ-25 — `DataTable.module.scss`** uses `text-align: end` instead of physical `right`.
- **OQ-20 — Faux bold for Heebo/Assistant 500/700/800 accepted for MVP.** Real weights ported in Phase 8 polish.

### Documentation hygiene (BUILD_PLAN §3.C — handled in Phase 0)

The legacy docs reference 5 files that don't exist on disk (`BOOKING_SYSTEM_MVP.md`, `BOOKING_SYSTEM_DREAMS.md`, `VIRTUAL_TOUR_SPECS.md`, `PROJECT_SPECS.md`, `payment-provider-analysis.md`). The new `docs/` is built fresh and only references files that actually exist. The undocumented "demand side" persona (legacy OQ-12) gets a new `docs/specs/DEMAND_SIDE.md` that fills the gap.

### Phase 0 deviations

- **2026-05-02 — Phase 0 deviation:** `.gitignore` extended beyond PROMPT_LIBRARY §0.6 with `!.env.example` to override the broader `.env*` rule that would otherwise block the committed template. Intentional; keeps `.env.example` trackable while `.env.local` stays ignored.
- **2026-05-02 — Phase 0 deviation:** Project README lives at the repo root (`/README.md`), not inside `docs/`, despite BUILD_PLAN §7 listing `docs/README.md`. The root location matches GitHub convention and surfaces the project description on the repo's landing page. BUILD_PLAN §7 should be updated in a later phase to reflect this.

### 2026-05-04 — Phase 1 deviations

- **2026-05-04 — Phase 1 deviation:** Chip is a Client Component (`'use client'` at the top of `Chip.tsx`). Required because Chip binds `onClick` for the optional `onRemove` handler, and Next 16 RSC cannot serialize functions from Server to Client Components. The pattern — "primitives that take event-handler props are Client Components" — applies to most interactive primitives going forward.
- **2026-05-04 — Phase 1 deviation:** The CP-1.5 demo page at `app/(dev)/primitives/page.tsx` remains a Server Component (preserves the `metadata` export). The interactive `RemovableChipDemo` is extracted to `app/(dev)/primitives/InteractiveChips.tsx` as a `'use client'` island. This is the recommended pattern for any future dev/demo pages that need both metadata and interactivity.

### 2026-05-06 — Phase 3 deviations

- **2026-05-06 — Phase 3 deviation:** PROMPT_LIBRARY §3.11 specifies `middleware.ts` at the repo root, with an exported `middleware()` function and a Test E that greps for that filename. Next.js 16.0.0 deprecated the `middleware` file convention and renamed it to `proxy` (see `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` § "Migration to Proxy"). The build emits `⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.` Per the AGENTS.md instruction to heed Next 16 deprecation notices, the file is named `proxy.ts` and exports `export async function proxy(request)`. The matcher config and Supabase session-refresh body are unchanged. CP-3b Test E was treated as satisfied by `proxy.ts` (same role, renamed convention); the spec text in PROMPT_LIBRARY is left as-is and should be amended in a later phase.

### 2026-05-04 — Phase 2 deviations

- **2026-05-04 — Phase 2 deviation:** Six icon names from PROMPT_LIBRARY §Phase 2 had no matching symbol in `public/icons.svg` and were substituted with the closest matches that do exist:
    - chevron-down → chev-down (TenantSwitcher)
    - menu         → list (AppShell menu trigger)
    - file-text    → file (NavLink "חוזים")
    - bar-chart-2  → chart (NavLink "דוחות")
    - sparkles     → sparkle (NavLink "ייבוא AI")
    - settings     → cog (NavLink "הגדרות")
  The icon sprite was ported verbatim from `worker-housing-platform` brand assets in Phase 0 (56 symbols total); these names existed in the spec text but not in the source sprite. If the original brand intends specific glyphs that aren't yet in the sprite, they can be added to `public/icons.svg` in Phase 8 polish.
      
- **2026-05-04 — Phase 2 deviation:** Phase 2 layout components do not pass `aria-hidden` to `<Icon>` elements where decorative. `IconProps` from Phase 1 doesn't extend `HTMLAttributes`, so passing `aria-hidden` would fail `tsc`. The `Icon` primitive auto-applies `aria-hidden` when no `aria-label` is given, so the accessibility behavior is identical. Pattern for future phases: pass `aria-label="..."` for meaningful icons; omit `aria-hidden` for decorative icons (auto-applied by `Icon`).

- **2026-05-04 — Phase 2 deviation:** Reset uses targeted longhand rules, not universal * { margin: 0 }. Universal physical-margin shorthand interacts unpredictably with logical-property longhands like margin-block-end. The targeted-element reset preserves typography control without specificity conflicts.

---

## 2026-05-05 — Phase 3 decisions (initial)

### Auth & roles

- **User role enum SUPERSEDES BUILD_PLAN §3.B original lock.**
  Original (CP-1, 2026-05-02): `('b2c_owner', 'corporate_member', 'b2b_owner', 'admin')`.
  New (2026-05-05): `('owner_individual', 'owner_company', 'construction_corporation', 'admin')`.
  Rationale: the B2C/B2B labels were inherited from manager vocabulary but
  misrepresent the product. There is no consumer in oz-marketplace; all three
  non-admin roles are businesses transacting with each other. The new names
  describe the actual entities: an individual property owner, a property-
  management company with many listings, and a construction corporation
  on the demand side.

- **Default role at signup (initial): `owner_company`.**
  MVP day-one launches the supply-side product for property-management
  companies. *(Note: superseded 2026-05-06 — `construction_corporation` is also signupable.)*

- **`owner_individual` enum value reserved but unreachable in MVP.**
  Defined in the schema, no signup path leads to it. Activated in a later
  phase when individual-owner self-serve is on the roadmap.

- **`admin` is OZ staff.** No self-serve signup. Created via Studio.

- **B1 default-to-single-role pattern locked for MVP.**
  Self-serve signup writes a fixed role; admins promote to other roles
  via Studio. Future-roadmap entry: build B2/B3 self-serve persona-picker
  for `owner_individual` once the individual product launches.

### Auth methods

- **Three sign-in methods on a single `/sign-in` page:**
  Google OAuth, Twilio SMS OTP, email magic-link. All three handled by
  Supabase Auth natively. Email/password is intentionally not shipping —
  magic-link covers the same use case without password storage, reset
  flows, or "forgot password" UI.

### Infrastructure

- **Local Supabase via `supabase start` for development.**
  Docker Desktop and Supabase CLI are required local prerequisites
  (added to README). Phase 5 (production readiness) provisions the
  remote Supabase project. No fork-and-clean from the legacy project;
  the schema is authored fresh.

- **`TWILIO_SMS_FROM` is the canonical env var name** for the OTP source
  number. Aligns with the legacy `.env.local`. The Phase 0 `.env.example`
  template used `TWILIO_OTP_FROM_NUMBER`; this is corrected in Phase 3.

---

## 2026-05-06 — MVP scope re-lock + Phase 3 amendments

### MVP scope re-lock

Original BUILD_PLAN had eight phases including a corporate dashboard
(Phase 4), a B2C marketplace (Phase 5), a native hostel booking engine
(Phase 6), and integrations (Phase 7). Following business-side direction,
**MVP is re-scoped to two production-ready surfaces:**

1. **B2B marketplace.** Owner-companies list properties; construction
   corporations browse, request to book, pay full stay upfront + OZ
   commission via Pelecard; sign a digital lease via HelloSign.
2. **Hostels page.** Public route with link-out cards to FrontDeskMaster's
   hosted booking for the four AM HOSTELS properties.

**Deferred (not in MVP):** corporate dashboard, B2C / individual-owner
product, native hostel booking engine, yield calculator, AI Import,
virtual tours, ratings, Tier-3 verification (and later, per 2026-05-12,
the entire verification system — all levels), Neema integration, premium
listing tiers.

**"Production-ready" means production-ready** — no half-built features
visible to users in production. Code that's not part of MVP simply
doesn't exist in the codebase yet. See feature-flag pattern below.

### Phase 3 amendment — `construction_corporation` is signupable

The 2026-05-05 decision said `construction_corporation` would be
admin-invited only. **Updated 2026-05-06:** `construction_corporation`
is signupable via the public sign-up form, because the marketplace flow
requires self-serve corporate signup (a corporation that finds OZ
through SEO needs to be able to sign up and request a booking without
waiting for high-touch onboarding).

The sign-up persona picker now offers three options:

1. **"חברה לניהול נכסים"** → creates `owner_company`
2. **"תאגיד בנייה"** → creates `construction_corporation`
3. **"פרטיים"** → friendly "coming soon" message; no account created

The `handle_new_user()` trigger accepts both `owner_company` and
`construction_corporation` from `raw_user_meta_data.role`. Anything
else (including absent / null / `owner_individual` / `admin`) coerces
to `owner_company`.

### Feature flag pattern (locked)

A `feature_flags` table is created in Phase 4. Pattern is:

- **Navigation entries** use runtime config flags so the IA can be
  built holistically (full sidebar) but unbuilt screens stay hidden.
  Default off in production.
- **Screens behind unbuilt features** simply don't exist as routes.
  No `(corporate)/dashboard/page.tsx` returning "coming soon."

This means in MVP production: nav is sparse (only routes that exist),
and every visible nav entry leads to a real, complete screen.

### Hostels: link-out for MVP, conversion roadmap

The MVP hostels page is **link-out cards** to FrontDeskMaster's hosted
booking. The four FDM URLs (Jerusalem, Tel Aviv, Haifa, Tiberias) are
captured in `lib/hostels.ts` as the source of truth.

**Future-roadmap (post-MVP):**
1. Convert link-out cards to embedded FDM component (requires FDM to
   expose an embed mechanism — TBD with Mateusz).
2. Replace embedded FDM with own native booking engine, OR skip the
   embed step entirely and go directly to native if engineering capacity
   allows.

Logged in `TASKS.md` Future-roadmap.

### Payments + commission flow (locked)

- **Pelecard Link b'Click for MVP**, full embedded API later. Generates
  a payment URL, customer pays on Pelecard's hosted page, webhook fires
  on success. Mirrors the Pakal Nofesh pattern Alon already built.
- **Money flow A:** OZ takes everything via Pelecard, withholds
  commission, settles the rest to the owner-company on a manual
  operations cycle. (Pelecard split-payment to owner is `feature_flags`
  flagged off and is a future iteration.)
- **Total amount = (monthly_rent × months) + OZ commission** (5% of
  rent total). Snapshot stored on the booking row at request time.
  🔄 *The 5% rate is superseded by the 2026-05-12 entry below — MVP charges 3%.*

### Contract: HelloSign with standardized lease

- HelloSign signature requests sent to both parties when a booking
  reaches `paid` state.
- Standardized 12-month residential lease template (Hozeh Shakir Bait
  Dirah) with OZ-specific clauses for foreign-worker housing.
- Template stored in `templates/lease.docx` (or HelloSign template ID
  per env var). Pre-filled with property + booking data.
- Webhook updates `bookings.status = 'confirmed'` when both parties
  sign.

### Default homepage (`/`) is the marketplace landing

Per the existing workerhome.co.il pattern: hero + hostels strip +
listings preview + how-it-works + FAQ + footer. Public, no auth gate
on browse. Dropped from the existing site for MVP scope: B2C section,
yield calculator, testimonials, Tier-3 verification badges.

---

## 2026-05-12 — Verification system (all levels) deferred from MVP

**Context:** Earlier rescope (2026-04-30 + 2026-05-06) deferred only Tier 3
(paid on-site inspection) and kept Levels 1 (self-reported owner identity)
and 2 (remote attestation) as in-scope for MVP. The verification system
remained surfaced on listing cards via `VerificationLevelBadge`, and the
Phase 4 visual rebuild shipped a verification pill on every listing card
(`ListingCard` overlay, `LAYOUT_INSPIRATION §5`).

**Decision:** The entire verification system — Levels 1, 2, and 3 — is
deferred from MVP. No tier of verification ships in the first launch.

**Rationale:**

- Level-2 attestation requires an ops review flow (document upload,
  reviewer queue, evidence storage) that doesn't exist and isn't worth
  building before we have listings volume to review.
- Showing a "Level 1 — self-reported" badge with no path to upgrade
  signals weakness rather than trust. Better to ship no badge than a
  badge that reads as "the owner says so."
- Trust signals in MVP come from: KYC at sign-up (owner-company has
  Israeli company registration), the contract flow (HelloSign signed
  lease), and Pelecard's regulated payment rail. Verification can be
  layered in once the marketplace has real listing volume and we know
  what level of trust signal corporations actually need.

**Implications:**

- `listings.verification_level` column stays in the schema (Phase 4
  migration `20260506000001_listings_schema.sql` already shipped) with
  default `1`. Not removed — keeping the column is cheap and avoids a
  destructive migration; surfacing it post-MVP is a UI-only change.
- `feature_flags.listing.tier3_verification = false` (seeded by the same
  migration) is now joined by an implicit "all verification disabled in
  MVP" — no flag added; the UI simply doesn't render the badge.
- `VerificationLevelBadge` primitive (Phase 1) stays in the codebase as
  dead code until verification work resumes. Do not delete.
- `ListingCard` should drop the verification pill overlay. The vacancy
  pill remains. See follow-up task in `TASKS.md`.
- `LAYOUT_INSPIRATION.md §5` reconstructed-card pattern is updated to
  reflect "vacancy pill only" for MVP.
- `GLOSSARY.md` entry for "Verification level" is marked deferred.
- BUILD_PLAN §3.D, §3.F deferred list, §5 component map, §8 future-
  roadmap list, and TASKS.md future-roadmap section are updated.

**Status:** ✅ Locked. Supersedes the 2026-04-30 "Tier 3 deferred" entry
to the extent that Tiers 1 and 2 are now also deferred.

---

## 2026-05-12 — OZ commission rate: 3% (MVP)

**Context:** The 2026-05-06 entry locked the commission at 5% of the rent
total. The PROMPT_LIBRARY spec, the shipped homepage copy
(`app/page.tsx`), and the in-flight `BookingRequestForm` all reference
5%.

**Decision:** For the first MVP — and until explicitly changed in a
future entry — OZ charges **3%** commission on rent total, not 5%.

**Implications:**

- `OZ_COMMISSION_RATE` constant moves from `0.05` → `0.03`. Currently
  hardcoded in `app/listings/[id]/BookingRequestForm.tsx`; should also
  move to a single source (config table or `feature_flags`-adjacent
  table) so it's not duplicated across UI strings — but for MVP, hand-
  update the constant and the two homepage copy strings is acceptable.
- Hebrew copy referencing "5% עמלה" needs to flip to "3% עמלה":
  - `app/page.tsx` hero terms line (~line 49)
  - `app/page.tsx` FAQ ("מה עלות השירות?") (~line 135)
  - `app/listings/[id]/BookingRequestForm.tsx` summary row label
- `PROMPT_LIBRARY.md` Phase 4 CP-4c spec is amended to 3%.
- The booking row snapshot still stores the absolute `oz_commission`
  amount in agorot, not a rate — historical bookings remain accurate
  if/when the rate changes again.

**Rationale:** Business-side direction; lowers friction for owner-
companies during the pilot. Easy to revisit once we have transaction
volume to validate margin.

**Status:** ✅ Locked. Supersedes the rate stated in the 2026-05-06
"Payments + commission flow" entry above (3% replaces 5%); all other
elements of that entry (Pelecard Link b'Click, money flow A, snapshot
on booking row) stand.

---

## 2026-05-12 — Fire-safety amenity: deferred, definition locked

**Context:** Earlier specs (legacy `properties` schema and the foreign-
worker regulations summary in `GLOSSARY.md`) reference fire safety as a
compliance-relevant property attribute. The current
`listings` schema has no fire-safety column. The definition of
"fire-safe" hasn't been pinned down anywhere in `docs/`.

**Decision:**

- **Definition:** a property is "fire-safe" iff it has **a smoke/heat
  detector AND a fire extinguisher**. Both required; neither alone
  counts.
- **Out of MVP:** no `has_fire_safety` (or equivalent) column is added
  to `listings` in MVP, and no fire-safety amenity surface ships on
  listing creation, listing detail, or marketplace filters.
- **Future iteration:** add the amenity in a later iteration alongside
  the existing extensible amenity set (`has_kitchen`, `has_wifi`,
  `has_parking` in `listings`). When added: boolean column
  `has_fire_safety` with default `false`; Hebrew label "בטיחות אש
  (גלאי עשן + מטף)"; surfaced as a filter on `/listings` and as a
  badge/pill on the listing detail page.

**Rationale:** Fire-safety is a meaningful trust signal for foreign-
worker housing (per `תקנות עובדים זרים`), but it requires owner self-
attestation discipline and ideally a verification path to be credible
— and verification is itself deferred per 2026-05-12. Shipping a self-
reported boolean today with no path to validate it would be misleading.
Better to add it when we have the broader trust framework to support
it.

**Implications:**

- `GLOSSARY.md` gets a new "Fire-safe (property amenity)" entry with
  the definition and deferral note.
- `TASKS.md` future-roadmap gets an entry for "Add fire-safety
  amenity to listings (definition: smoke detector + fire
  extinguisher)".
- `BUILD_PLAN.md` §3.F deferred list is not updated — the amenity is
  small enough that it sits under "extensible amenity set" in
  `listings` and doesn't need top-level mention. It's tracked in
  `TASKS.md` instead.
- `GLOSSARY.md` `תקנות עובדים זרים` entry already mentions "fire
  safety" as a regulatory requirement — that stays correct (the
  regulation requires it; we just don't expose it as a structured
  attribute yet).

**Status:** ✅ Locked.

---

## 2026-05-13 — Listing fields: bedrooms (not rooms) + four amenities

**Context:** The current `listings` schema (Phase 4 migration shipped)
captures `bed_count`, `area_sqm`, `bathroom_count`, and three amenity
booleans (`has_kitchen`, `has_wifi`, `has_parking`). The owner listing
form mirrors those fields. The spec is missing several attributes that
matter to construction-corporation buyers when evaluating a property
for foreign-worker housing.

**Decision:** Add the following fields to `listings` and to the owner
listing-creation/edit form.

**Bedrooms — not rooms.** The owner is asked **"how many *bedrooms*"**
(`חדרי שינה`), not "how many *rooms*" (`חדרים`). This distinction is
load-bearing in Israeli real-estate vocabulary: a "4-room apartment"
(`דירת 4 חדרים`) conventionally means 3 bedrooms + 1 living room.
Counting rooms inflates the number and is ambiguous; counting bedrooms
is unambiguous and matches the buyer's actual question (how many
sleeping spaces can I configure?).

**New columns:**

| Column | Type | Default | Hebrew label |
|---|---|---|---|
| `bedroom_count` | `smallint` (nullable) | — | `מספר חדרי שינה` |
| `has_living_room` | `boolean NOT NULL` | `false` | `סלון` |
| `has_bunk_beds` | `boolean NOT NULL` | `false` | `מיטות קומותיים` |
| `has_ac` | `boolean NOT NULL` | `false` | `מזגן` |
| `has_gas_cooking` | `boolean NOT NULL` | `false` | `כיריים גז` |

Sits alongside existing extensible amenities. `bedroom_count` is
nullable (same pattern as `bathroom_count`) — not every owner will fill
it in immediately, and we don't want to block listing creation on it.

**Naming notes:**

- `bedroom_count`, **never** `room_count` / `rooms` / `room_amount`.
  If someone proposes a "number of rooms" field in the future, push
  back and confirm whether they actually mean bedrooms (almost always
  yes) — and use `bedroom_count`.
- `has_ac` (not `has_air_conditioning`) for symmetry with `has_wifi`.
- `has_gas_cooking` captures specifically a gas stovetop / `כיריים גז`
  (the common Israeli kitchen setup). A future iteration can add
  `has_electric_cooking` if induction/electric becomes relevant.
- `has_bunk_beds` is a boolean for now ("does the unit have bunk beds
  available?"). Could become a count if owners need to express
  capacity precisely; revisit when there's actual feedback.

**Implications:**

- New migration adds the five columns to `listings`. Existing rows
  backfill: `bedroom_count = NULL`, the four booleans = `false`.
- `app/owner/_components/ListingForm.types.ts` adds the five fields
  to `ListingFormValues`.
- `app/owner/_components/ListingForm.tsx` adds:
  - one numeric input for `bedroom_count` (Hebrew label
    `מספר חדרי שינה`, placeholder hint clarifying it's bedrooms not
    rooms)
  - four checkbox amenities (`סלון`, `מיטות קומותיים`, `מזגן`,
    `כיריים גז`) in the existing amenities group
- `app/owner/listings/[id]/page.tsx` insert/update payloads pass the
  five new fields.
- Defaults in `ListingForm.tsx`: `bedroom_count: undefined`,
  `has_living_room: false`, `has_bunk_beds: false`, `has_ac: false`,
  `has_gas_cooking: false`.
- Listing detail (`app/listings/[id]/page.tsx`) and marketplace
  card/filter surfaces can render these progressively — not required
  to ship in the same change as the schema/form.
- `PROMPT_LIBRARY.md` schema block and ListingForm code block are
  amended.

**Rationale:**

- Construction corporations housing crews want to know how many
  sleeping spaces a unit has (`bedroom_count`) and whether they can
  double-up with bunks (`has_bunk_beds`).
- A/C, gas cooking, and a living room are the three most-asked
  amenities for crew housing beyond what's already captured
  (kitchen / wifi / parking).
- Bedrooms vs rooms is a Hebrew-language trap that has bitten other
  Israeli proptech products; locking it here so we don't fall into it.

**Status:** ✅ Locked.

---

## 2026-05-13 — Audit Pack: Hebrew translation + access rule locked

**Context:** The legacy `worker-housing-platform` mockups
(`recon/brand/mockups/01-corporate.md`, `00-uncategorized.md`) carry the
"Audit Pack" feature on the corporate dashboard — a downloadable archive
of compliance documents for a property. The term appears only in legacy
mockups; it doesn't yet exist in any active oz-marketplace spec. The
Hebrew translation and the access rule are locked here so they don't
drift when the feature ships.

**Decision:**

- **Canonical Hebrew translation:** "Audit Pack" → **`תיק נכס`**. Use
  this string everywhere — UI labels, button copy, file names, email
  subject lines, FAQ answers. Don't introduce alternative translations
  ("חבילת ביקורת", "מסמכי נכס", "ארכיון נכס", etc.) — they fragment
  the vocabulary.
- **Access rule:** the audit pack is downloadable **only** by users
  with role `construction_corporation`, and **only after they have
  completed a booking for the property in question**. "Completed" means
  the booking has reached terminal success — `bookings.status =
  'confirmed'` (signed-by-both contract + paid) and the corporation on
  the booking is the requesting user.
- Concretely: corporate user X can download the audit pack for listing
  Y iff there exists a row in `bookings` where
  `corporation_id = X.id AND listing_id = Y AND status = 'confirmed'`.
- Owner-companies (the supply side) cannot download a `תיק נכס` — they
  own the property and have direct access to the underlying documents.
- Admins can download any audit pack.
- Anonymous / unauthenticated users cannot download under any
  circumstances.

**MVP status:** Out of MVP. The corporate dashboard is itself deferred
per BUILD_PLAN §3.F (2026-05-06 re-scope), and `תיק נכס` is a
corporate-dashboard surface. This entry only locks the *vocabulary* and
the *access rule* so that when the corporate dashboard does ship, both
are settled inputs. No schema, no route, no component lands in MVP.

**Implications:**

- `GLOSSARY.md` gets a new "Audit Pack (`תיק נכס`)" entry.
- When the corporate dashboard work begins (future phase, currently in
  TASKS.md future-roadmap as "Corporate dashboard"), the audit-pack
  download surface enforces the access rule above, ideally via an RLS
  policy on the storage bucket (or via a server action that checks the
  booking before serving the signed URL).
- The legacy mockup pattern of placing an `ייצא Audit Pack` button on
  any owner row is no longer correct — the button is only visible/
  enabled on bookings the corporate user actually owns and that are
  `confirmed`.
- Translation in any future PROMPT_LIBRARY entry, BUILD_PLAN section,
  or UI text must use `תיק נכס` verbatim.

**Rationale:**

- Locking the Hebrew translation prevents future drift. "Audit Pack"
  is an English term; without a canonical Hebrew, every contributor
  invents their own translation and the platform's vocabulary
  fragments. `תיק נכס` ("property file") matches the Israeli legal/
  real-estate convention for compiled property documentation.
- Tying the download to a completed booking ensures corporations only
  access compliance docs for properties they've actually committed to.
  Pre-booking, the audit pack would be reconnaissance material — not
  the intended use. Post-`confirmed`, it's a tenant's right to the
  documentation they need for their own compliance / regulator
  inquiries.

**Status:** ✅ Locked.

---

## 2026-05-13 — תקנות עובדים זרים: 4 m² is per-bed-per-bedroom, never aggregate

**Context:** `GLOSSARY.md` summarized the foreign-workers regulation as
"minimum 4m² per worker", and homepage copy
(`app/page.tsx`, `PROMPT_LIBRARY.md` stats strip + legal callout)
phrased it as "מינימום 4 מ״ר לעובד". Both readings are ambiguous —
they could be interpreted as "4 m² × workers, anywhere on the property"
or "4 m² × beds in each bedroom". The legacy schema (recon)
implemented it as a per-room minimum
(`rooms.room_size_sqm ≥ beds_count × min_space_per_person_sqm`), but
that detail never landed in oz-marketplace's active specs or copy.

**Decision:** the rule is **per-bedroom, never aggregate**.

- Every bedroom must provide **at least 4 m² per bed it contains**.
- A bedroom with N beds must be ≥ (4 × N) m².
- Examples:
  - 3 beds → ≥ 12 m²
  - 5 beds → ≥ 20 m²
- The minimum is calculated **per individual bedroom**, never averaged
  across the property. A property with one undersized bedroom fails
  compliance even if its total area generously exceeds the aggregate
  threshold.

**Canonical phrasings (use these verbatim):**

- **English:** *"Foreign Workers Regulations require a minimum of 4 m²
  per bed within each bedroom. A bedroom with N beds must be at least
  (4 × N) m² (e.g., 3 beds → ≥ 12 m²). This is per-bedroom; it is
  never averaged across the property."*
- **Hebrew (long form, legal callout):** *"תקנות עובדים זרים מחייבות
  מינימום 4 מ״ר לכל מיטה בכל חדר שינה. חדר שינה עם N מיטות חייב להיות
  לפחות (4 × N) מ״ר — לדוגמה: 3 מיטות → לפחות 12 מ״ר. חישוב לפי חדר,
  לא לפי ממוצע בנכס."*
- **Hebrew (short form, stat tile / chip):** *"4 מ״ר / למיטה (לפי
  חדר שינה)"*. The legacy phrasing "4 מ״ר / לעובד" is dropped; "עובד"
  was a usability shortcut that has now caused the ambiguity this entry
  resolves.

**Implications:**

- `GLOSSARY.md` `תקנות עובדים זרים` entry is rewritten with the
  per-bedroom phrasing.
- `PROMPT_LIBRARY.md` homepage stats strip (`Stat icon="ruler" big='4
  מ"ר' label="לעובד — חוקי"`) is updated to use the per-bed-per-room
  short form.
- `PROMPT_LIBRARY.md` legal callout sentence is updated to the long
  form.
- Shipped homepage copy at `app/page.tsx` legal callout (~line 118) and
  stats strip use the legacy "מינימום 4 מ״ר לעובד" phrasing — flagged
  in `TASKS.md` polish backlog for update.
- Once the listing form's new fields ship (DECISIONS_LOG 2026-05-13 —
  bedrooms + amenities), this rule is the natural validation target:
  the marketplace can flag listings where `area_sqm / bedroom_count <
  4 × (bed_count / bedroom_count)` looks suspicious — though that's a
  derivation only, not a hard validation, since the actual rule is
  per-individual-bedroom and the schema doesn't yet break beds down by
  bedroom (`bed_count` is property-level total). Per-bedroom bed
  capacity is a future schema extension if precise validation becomes
  worth it.
- When verification work eventually resumes (verification system
  currently deferred, DECISIONS_LOG 2026-05-12), Level 2 remote
  attestation should specifically confirm that each bedroom's area
  meets the per-bedroom minimum — not just the property's total area.

**Rationale:**

- The regulation itself is per-bedroom (per the legacy implementation
  pattern and the way the Ministry of Labor's housing inspectors apply
  it). Averaging across the property masks bedrooms that are below
  threshold.
- The "4 מ״ר לעובד" short form invites the wrong mental model — a
  buyer counting workers × 4 m² and comparing to total area would
  conclude many non-compliant properties are compliant. The "לפי
  מיטה / לפי חדר שינה" reframing matches the actual rule.

**Status:** ✅ Locked.

---

## 2026-05-13 — MVP leasing model: full property only, binary availability

> 🔄 **Amended same-day** (see "Leasing-model amendment: per-bed price display, full-property booking" entry below). The booking-model and binary-availability parts of this entry stand; the **pricing display** parts (column rename to `monthly_rent`, "/ מיטה" → "/ חודש" flip) are withdrawn. Price is displayed per-bed; the corp still pays for the whole apartment, total derived as `monthly_rent_per_bed × bed_count × months + 3%`.


**Context:** The current schema and UI model bookings at the **bed**
level — `listings.monthly_rent_per_bed`, `bookings.worker_count`,
`bookings.monthly_rent_total = workers × per_bed × months`. The booking
form asks the corporation how many workers it wants to house, and
listing cards display a fractional vacancy (`available_beds / bed_count`).
This was inherited from the legacy spec, which envisioned a flexible
partial-leasing marketplace.

For the first MVP, this is too much surface area for too little payoff.
Corporations buying foreign-worker housing in Gush Dan overwhelmingly
take entire apartments. Partial-leasing introduces hard problems
(occupancy tracking, two-corp coexistence in one unit, per-bed contract
generation, partial-refund accounting) that we shouldn't solve before
we know they're worth solving.

**Decision:** **MVP supports full-property leases only.** A booking
covers the entire listing for a contiguous date range; pricing is
per-apartment, not per-bed; and availability is a binary "available
vs leased" per requested date range, not a fractional bed count.

**Concretely:**

- **Pricing model.** Listings have a single price: `monthly_rent`
  (integer ILS, no decimals). It represents the rent for the **whole
  apartment per month**, not per bed. The Hebrew label on the listing
  form becomes "שכירות חודשית לדירה (₪)". The "/מיטה" suffix is dropped
  everywhere in the UI; the price-anchor on cards/detail reads
  "₪X,XXX / חודש".
- **Booking model.** A booking covers the full apartment. The
  corporate booking form **drops the "number of workers" input** —
  there's nothing to size against pricing. Total payable =
  `monthly_rent × months + (monthly_rent × months × 3%)` per
  DECISIONS_LOG 2026-05-12 commission lock.
- **Availability model.** For any requested date range, a listing is
  either **available** or **leased** — binary. A listing is "leased"
  for a date range if any `bookings` row with that `listing_id` and
  `status IN ('confirmed', 'paid', 'accepted')` overlaps the range.
  Otherwise it's "available". No fractional `available_beds`
  computation; no "3 of 8 beds taken" display.
- **`bed_count` stays informational.** Construction corporations still
  care about capacity ("does this apartment fit my 12-person crew?"),
  so the listing form still asks `bed_count` and the marketplace
  filter "מינ׳ מיטות" still works. It just doesn't drive pricing or
  partial bookings.

**Schema implications:**

- Rename `listings.monthly_rent_per_bed` → `listings.monthly_rent`
  (still `integer NOT NULL CHECK (monthly_rent > 0)`). Existing seed
  data is pre-launch; values that were "rent per bed" need a manual
  re-key to "rent for the whole apartment". No data migration logic
  in the SQL — the rename happens in a new migration; team backfills
  any test listings by hand.
- `bookings.worker_count` and `bookings.monthly_rent_total` are no
  longer driven by the UI. Leave the columns in place for now (don't
  drop on the path to MVP — destructive migrations get blocked by
  IRON_RULE 3); the booking flow simply stops populating
  `worker_count` (or stamps it from `listings.bed_count` as a default
  for compatibility). `monthly_rent_total` continues to snapshot the
  contractual rent total, which is now `monthly_rent × months`.
- No new column is needed for availability — the binary status is
  derived from `bookings` rows.

**UI implications (a small inventory):**

- `app/owner/_components/ListingForm.tsx` — the numeric input labeled
  "מחיר למיטה / חודש (₪)" becomes "שכירות חודשית לדירה (₪)";
  field name `monthly_rent_per_bed` → `monthly_rent`.
- `app/listings/[id]/BookingRequestForm.tsx` — drop the "מספר עובדים"
  input entirely; price summary is `שכירות = monthly_rent × months`,
  `עמלת עוז (3%)`, `סה״כ`.
- `app/listings/[id]/page.tsx` (public detail) — price-anchor reads
  `₪X,XXX / חודש`, not `/מיטה/חודש`. `bed_count` stays in the
  capacity bullet list as "X מיטות".
- `app/listings/page.tsx` (marketplace) — drop the `maxRent` filter
  in its current "per-bed" framing or repurpose it to "max monthly
  rent for apartment". Keep `minBeds`. Card price: `₪X,XXX / חודש`,
  no `/מיטה`.
- `app/page.tsx` (homepage) — listings preview card text changes from
  `{bed_count} מיטות · ₪{monthly_rent_per_bed}/מיטה` to `{bed_count}
  מיטות · ₪{monthly_rent} / חודש`.
- `ListingCard` overlay pill — replaces the fractional vacancy with a
  binary "פנוי" / "מושכר" pill (`Pill tone="green"` for available,
  `Pill tone="gray"` for leased). The pill is computed against
  "today" by default, or against the requested date range if the user
  has filters active. The `lib/supabase/service.ts` service-role
  aggregator simplifies to a one-line "any overlapping confirmed
  booking?" check per listing.

**Future (Dreams):** the partial / per-bed / per-worker leasing
model — the one currently encoded but stripped from MVP — moves to
`docs/specs/dreams/B2B_DREAMS.md` as "Partial apartment leasing
(per-bed pricing, multi-corp occupancy)". Schema sketch preserved
there so it's easy to reconstruct: re-introduce `monthly_rent_per_bed`
alongside `monthly_rent` (so listings can opt in), keep
`bookings.worker_count` populated by a real input, add a `bed_holds`
table for sub-listing inventory, etc. This is the right direction
once the marketplace has volume; it's the wrong starting position.

**Rationale:**

- Cuts the contract template down to one form (whole-apartment lease),
  not two (whole vs partial).
- Cuts the booking math, the availability computation, and the
  occupancy display each to one line.
- Cuts the support-burden risk of two corps colliding in one
  apartment in MVP.
- Matches actual buyer behavior in the gush-dan pilot scope.

**Status:** ✅ Locked.

---

## 2026-05-13 — Leasing-model amendment: per-bed price display, full-property booking

**Context:** The earlier 2026-05-13 entry "MVP leasing model: full property
only, binary availability" renamed `listings.monthly_rent_per_bed` →
`listings.monthly_rent` and flipped all price displays from "/מיטה" to
"/ חודש". On same-day review, that overshoots: the **booking model** is
correctly full-property only (no partial / per-bed booking, binary
availability, no worker-count input), but **price display should remain
per-bed**. Construction corporations evaluating apartments are used to
seeing a per-bed price, and the per-bed unit is what makes properties
comparable when bed counts differ. The total they actually pay is for
the whole apartment — that's just a derived number, not the headline.

**Decision:**

- **Schema:** keep `listings.monthly_rent_per_bed integer NOT NULL CHECK
  (monthly_rent_per_bed > 0)`. **Do not** rename to `monthly_rent`. The
  earlier entry's RENAME COLUMN instruction is withdrawn.
- **Listing form label:** revert to "מחיר למיטה / חודש (₪)". Field
  name `monthly_rent_per_bed`.
- **Price display:**
  - Listing card price-anchor: `₪X,XXX / מיטה` (large, bold, blue-deep,
    with "/ מיטה" as the muted suffix). Never the whole-property total
    on the card.
  - Marketplace card line: `{bed_count} מיטות · ₪{monthly_rent_per_bed} / מיטה`.
  - Listing detail price-anchor: `₪X,XXX / מיטה / חודש`.
  - Marketplace filter: "מחיר מקסימלי למיטה" (number input), filtered
    via `monthly_rent_per_bed`.
- **Booking model (unchanged from the original entry):** the booking
  covers the **entire apartment** — there is no partial / per-bed
  booking, no worker-count input. The corporation enters dates only.
- **Booking math:** total payable =
  `(monthly_rent_per_bed × bed_count × months) + 3% commission`.
  The booking summary on the request form spells the multiplication
  out so the corp sees what they're paying for:
  - חודשים: N
  - מחיר למיטה: ₪X × Y מיטות = ₪Z / חודש
  - שכירות: ₪(Z × N)
  - עמלת עוז (3%): ₪commission
  - סה״כ: ₪total
- **Booking row snapshot:** `bookings.monthly_rent_total` is the
  derived `monthly_rent_per_bed × bed_count × months` (in agorot, no
  decimals). `bookings.worker_count` is stamped from `listings.bed_count`
  at request time (corp doesn't enter it; booking is whole-apartment).
- **Availability (unchanged from the original entry):** binary `פנוי` /
  `מושכר` per date range. No fractional vacancy.
- **`bed_count` (unchanged):** stays as informational capacity AND now
  also drives the visible per-bed → total math. The marketplace
  "מינ׳ מיטות" filter still works.

**Implications:**

- The earlier entry's "schema implications" RENAME-COLUMN bullet is
  withdrawn. The column keeps its original name.
- The earlier entry's "UI implications" bullets that said price displays
  drop "/ מיטה" are withdrawn; "/ מיטה" stays on cards/detail/filter.
- `PROMPT_LIBRARY.md` is reverted to per-bed displays and the
  BookingRequestForm spec now derives the total as per-bed × bed_count
  × months.
- `GLOSSARY.md` "Full-property lease" entry is amended to clarify the
  display-vs-booking split.
- The standardized HelloSign lease template uses both placeholders:
  `{{monthly_rent_per_bed}}` (the listed per-bed price) and
  `{{monthly_rent_total}}` (the per-bed × bed_count contractual
  monthly rent). `{{bed_count}}` is the apartment capacity.

**Rationale:**

- Per-bed pricing is the genre convention for foreign-worker housing
  in Israel. Construction corporations compare apartments by per-bed
  cost across very different bed counts (a 6-bed 2-room and a 12-bed
  4-room aren't comparable on whole-apartment price). Stripping per-bed
  display would make the marketplace harder to scan, not easier.
- The booking simplification (whole-apartment only, no worker-count
  input, binary availability) is the part that mattered for cutting
  scope — the price-display unit was incidental and got pulled along
  by accident.

**Status:** ✅ Locked. Supersedes only the pricing-display and column-
name portions of the earlier 2026-05-13 leasing-model entry; the
binary-availability and no-worker-count-input portions of that entry
stand.

---

## 2026-05-13 — Booking form inputs: start_date + duration_months (no end date, no message)

**Context:** Earlier 2026-05-13 entries pinned the booking model
(full-apartment only, no worker-count input, binary availability) but
left the form fields as "start date + end date + optional message" by
inheritance from the legacy shape. Construction corporations think in
"how many months", not "what's the exit date" — and the optional
message field generates noise without unblocking anything. Lock the
final field shape here.

**Decision:** the corporate booking request form asks for **two inputs
only**:

1. **תאריך התחלה** (`start_date`) — the lease start date.
2. **משך השכירות (חודשים)** (`duration_months`) — an integer **1–12**.
   Sub-monthly leases aren't a thing; > 12 months goes through the
   future renewal flow (post-MVP), not a single mega-booking.

There is no end-date input, and no message / "הודעה לבעל הנכס" input.

**Schema implications:**

- Add `bookings.duration_months smallint NOT NULL CHECK (duration_months BETWEEN 1 AND 12)`.
- Keep `bookings.end_date date NOT NULL CHECK (end_date > start_date)`.
  The server computes it from `start_date + (duration_months || ' months')::interval`
  on booking insert/update so the availability-overlap query
  (`status IN ('confirmed','paid','accepted') AND start_date < requested_end AND end_date > requested_start`)
  keeps working without schema gymnastics. Don't make `end_date` a
  generated column — keep it a regular column populated server-side
  to avoid PG generated-column edge cases.
- `bookings.request_message text` column stays in the schema (IRON_RULE
  3 — no destructive drops on the path to MVP) but is never populated
  from the UI. Same pattern as `worker_count`, which is stamped from
  `listings.bed_count` server-side.

**UI / form implications:**

- Two inputs: start date (date input) and duration (integer 1–12 — UX
  control choice left to design: number stepper, dropdown, or chip
  group, all acceptable). Drop the end-date input. Drop the message
  textarea.
- Submit is disabled until `start_date` is set, `duration_months` is
  between 1 and 12 inclusive, and the listing is `פנוי` for the
  derived range.
- The booking summary breakdown uses `duration_months` directly as
  the `N` in the months row: "חודשים: N · מחיר למיטה: ₪X × Y מיטות
  = ₪Z / חודש · שכירות: ₪(Z × N) · עמלת עוז (3%): ₪commission ·
  סה״כ: ₪total". No change to the per-bed × bed_count derivation.
- Availability pill on the listing detail page recomputes against the
  derived `end_date` (`start_date + duration_months`) as soon as both
  inputs are valid.

**Server-side flow on submit:**

```ts
const end_date = addMonths(start_date, duration_months); // server util
const monthly_rent_total = listing.monthly_rent_per_bed * listing.bed_count * duration_months;
const oz_commission = Math.round(monthly_rent_total * 0.03);
await supabase.from('bookings').insert({
  listing_id, corporation_id, owner_id,
  start_date,
  duration_months,
  end_date,
  worker_count: listing.bed_count, // stamped, unchanged
  monthly_rent_total,
  oz_commission,
  total_amount: monthly_rent_total + oz_commission,
});
```

The insert happens in a server action (not a browser-side
`supabase.from(...).insert()` call) so the corp can't tamper with
`end_date` or the totals — they're derived from the listing and the
locked commission rate.

**Marketplace filter implications:**

- The marketplace filter bar can optionally surface a `duration_months`
  filter (1–12) alongside `start_date` so the availability pill
  recomputes against the derived range. Optional, not required for
  MVP.

**HelloSign lease template implications:**

- The template uses `{{start_date}}`, `{{end_date}}`, and now also
  `{{duration_months}}` if the lease prose wants to read "תקופת
  שכירות של N חודשים" rather than "מ-X עד Y". Both placeholders
  populate from the same booking row.

**Rationale:**

- A "how many months" prompt matches how corporations actually plan
  crew rotations (cycles of 3, 6, 9, 12 months) — they pick a duration
  off a familiar list, not an arbitrary end date.
- Forcing duration ∈ [1, 12] keeps each booking a single lease
  contract under the standardized 12-month HelloSign template. Beyond
  12 months is a renewal, not a single longer booking.
- Dropping the message field removes one optional input that
  generates more support work than business value (corps either send
  out-of-band emails or fill in basics during HelloSign signing).
- Server-computed `end_date` keeps the availability query simple and
  the schema stable.

**Status:** ✅ Locked. Replaces the "start_date + end_date + optional
message" form shape implied by the earlier 2026-05-13 leasing-model
entries.

---

## 2026-05-13 — Per-bedroom data model for תקנות עובדים זרים compliance

**Context:** The 4 m² rule (DECISIONS_LOG 2026-05-13
"תקנות עובדים זרים: 4 m² is per-bed-per-bedroom") requires that **each
bedroom** provide at least 4 m² per bed it contains. Until now the
listings schema only carried property-level aggregates: `bed_count`
(total beds in the apartment) and `bedroom_count` (total bedrooms,
nullable). Those aggregates can't validate the per-bedroom rule — you
can have a property with 4 bedrooms, 12 beds, and 60 m² that passes
"on average" but contains an undersized bedroom that fails compliance.

**Decision:** capture per-bedroom data on listing creation as a new
child table.

**New schema — `public.listing_bedrooms`:**

```sql
CREATE TABLE public.listing_bedrooms (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  display_order smallint NOT NULL DEFAULT 0,
  -- Bedroom area in square metres. numeric(5,2) admits 999.99 m² with two
  -- decimals so owners can enter e.g. 12.5 m². Whole-number entries are fine.
  size_sqm      numeric(5,2) NOT NULL CHECK (size_sqm > 0),
  -- Beds in this specific bedroom. The per-bedroom regulation check is
  -- `size_sqm >= 4 * bed_count`. CHECK BETWEEN 1 AND 12 because more than
  -- 12 beds in a single bedroom is implausible and almost certainly a
  -- data-entry error.
  bed_count     smallint NOT NULL CHECK (bed_count BETWEEN 1 AND 12),
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX listing_bedrooms_listing_idx
  ON public.listing_bedrooms(listing_id, display_order);
```

**Property-level aggregates become denormalized:**

- `listings.bedroom_count smallint` (nullable) — superseded as a hand-entered
  number; now **derived** from `COUNT(listing_bedrooms WHERE listing_id = X)`.
  Stored on `listings` for cheap reads (marketplace cards, filters).
- `listings.bed_count smallint` — now **derived** from
  `SUM(listing_bedrooms.bed_count WHERE listing_id = X)`. Stored on
  `listings` for cheap reads.
- Both aggregates are populated by the listing-form server action at
  save time alongside the `listing_bedrooms` upsert. No DB triggers —
  the server action is the single writer.
- The earlier 2026-05-13 entry "Listing fields: bedrooms (not rooms) +
  four amenities" wrote `bedroom_count` as a direct numeric input on
  the form. **That portion is superseded** — there's no standalone
  bedroom-count input; the count comes from the rooms editor.

**Listing form changes:**

- The form loses the standalone `מספר חדרי שינה` numeric input.
- It gains a **rooms editor** section ("חדרי שינה") with an "הוסף חדר"
  button. Each row captures `size_sqm` + `bed_count` for one bedroom.
  At least one row is required to publish.
- The form computes and displays `סה״כ מיטות: N` and
  `סה״כ חדרי שינה: M` derived from the rows.
- Per-row compliance indicator: each row shows a check or warning
  against the 4 m² rule. Warning copy when failing:
  *"חדר זה אינו עומד בתקנות עובדים זרים — נדרשים 4 מ״ר לכל מיטה
  (חדר עם N מיטות חייב להיות לפחות 4N מ״ר)."* Saving as draft is
  always allowed; publishing a non-compliant listing is allowed too
  in MVP (we surface the warning to the owner; we don't enforce).
  Enforcement / a marketplace compliance badge is a future iteration.
- The bedroom inputs are per-bedroom only — a living room is **not**
  a bedroom; it stays captured by the separate `has_living_room`
  boolean amenity per the earlier 2026-05-13 entry.

**Bunk-beds clarification (reaffirmed, not new):**

`listings.has_bunk_beds boolean NOT NULL DEFAULT false` stays a
**property-level** amenity, alongside `has_kitchen`, `has_living_room`,
`has_wifi`, `has_parking`, `has_ac`, `has_gas_cooking`. It is not
captured per-bedroom in MVP — the owner ticks a single property-level
checkbox indicating whether the unit includes bunk beds anywhere.
Per-bedroom bunk-bed tracking can join `listing_bedrooms` in a future
iteration if it turns out to matter; for now property-level is enough.
This reaffirms the entry locked in
DECISIONS_LOG 2026-05-13 "Listing fields: bedrooms (not rooms) + four
amenities".

**Marketplace + downstream implications:**

- The marketplace "מינ׳ מיטות" filter continues to read
  `listings.bed_count` (the denormalized sum) — no join needed.
- Listing detail page shows the per-bedroom breakdown table when the
  buyer expands a "פירוט חדרים" section: each row "חדר N · X מ״ר ·
  Y מיטות · ✓/⚠ עומד בתקנות".
- The booking total math (DECISIONS_LOG 2026-05-13 "Leasing-model
  amendment") still uses `monthly_rent_per_bed × bed_count ×
  duration_months + 3%`. `bed_count` is now the denormalized sum,
  so the math is unchanged.
- When the verification system eventually resumes (deferred per
  DECISIONS_LOG 2026-05-12), the Level-2 remote attestation flow
  reviews the `listing_bedrooms` rows specifically to confirm each
  bedroom's area is what the owner says it is.

**Rationale:**

- The 4 m² rule is the only way construction corporations can ship
  a compliant lease. The platform should make it trivially obvious
  to an owner whether their listing will meet the requirement —
  ideally before they publish.
- A child table is the right shape: bedrooms vary in size and bed
  count, and aggregates obscure the per-room failures the regulation
  actually cares about.
- Denormalized aggregates on the parent keep the marketplace fast
  without adding joins; the server action keeps them in sync.
- Bunk beds stay property-level because the corporation's question
  is "does this apartment have bunks?" not "which exact bedroom has
  them?". The latter belongs in photos and the lease attachment.

**Status:** ✅ Locked. Supersedes only the "bedroom_count as direct
numeric input on the listing form" portion of the earlier 2026-05-13
"Listing fields" entry; the four amenity additions and the
bedrooms-vs-rooms terminology lock in that entry stand.

---

## 2026-05-13 — Listing optional facilities: canonical 7-item list

**Context:** Earlier 2026-05-13 entries accumulated an amenity set
piecemeal — `has_kitchen`, `has_wifi`, `has_parking` from the initial
schema, then `has_living_room`, `has_bunk_beds`, `has_ac`,
`has_gas_cooking` from "Listing fields: bedrooms (not rooms) + four
amenities". On product review the list was wrong in two directions:
some items don't belong in the canonical "optional facilities" group
(`has_living_room` is a structural feature, not an amenity;
`has_gas_cooking` over-specifies the cooking surface), and three items
were missing (`has_furniture`, `has_terrace_yard`, `has_washing_machine`).
Lock the canonical list here.

**Decision:** the listing's "optional facilities" group is exactly
these **seven booleans**, in this order:

| # | Column | Hebrew label | Notes |
|---|---|---|---|
| 1 | `has_ac` | מזגן | |
| 2 | `has_wifi` | אינטרנט | |
| 3 | `has_furniture` | ריהוט | New — apartment is furnished or not. |
| 4 | `has_parking` | חניה | |
| 5 | `has_kitchen` | מטבח | Default flipped to `false` (opt-in like the others). |
| 6 | `has_terrace_yard` | מרפסת / חצר | New — single boolean covering either a terrace or a yard. Splitting into two columns is out of scope; if the distinction matters later, refine via a Dream. |
| 7 | `has_washing_machine` | מכונת כביסה | New. |

**Dropped from earlier locks (do not add back without a new entry):**

- `has_living_room` — superseded. A living room is a structural
  property of the apartment, not an optional facility. The bedrooms-
  vs-rooms semantic lock (DECISIONS_LOG 2026-05-13 "Listing fields")
  stands — the form counts bedrooms, not rooms — but no boolean
  tracks whether a living room exists. If an owner wants to advertise
  "no living room / studio layout", they use the description field.
- `has_gas_cooking` — superseded. Cooking-surface type isn't worth a
  structured field; `has_kitchen` covers the kitchen existence
  question and any gas-vs-electric nuance lives in the description
  field.

**Bunk-beds clarification — outside the facilities group:**

`has_bunk_beds` (`מיטות קומותיים`) **stays** as a property-level
boolean on `listings` (reaffirming the lock in DECISIONS_LOG
2026-05-13 "Listing fields"). It is **not** part of the "optional
facilities" group — bunk beds describe bed configuration, not a
facility/service. The schema places it alongside `has_*` columns as
a convenience, but UI treatments should group it with bed-related
questions, not in the facilities checklist.

**Schema implications:**

- `listings` keeps: `has_ac`, `has_wifi`, `has_furniture`,
  `has_parking`, `has_kitchen`, `has_terrace_yard`,
  `has_washing_machine`, `has_bunk_beds`.
- `listings` drops (from earlier-locked-but-now-superseded): `has_living_room`,
  `has_gas_cooking`. These columns may already exist in a local
  Supabase from the earlier locks but were never deployed to a real
  Supabase (the migration was authored but the project is pre-launch).
  When the canonical-facilities migration ships, it adds the three
  new columns and drops the two superseded columns in the same
  migration — destructive drops are permitted here because no
  production data exists yet (IRON_RULE 3 still applies for the
  approval workflow, but the data-loss concern doesn't).
- The `has_kitchen` default flips from `true` to `false` to match
  the other facilities — owners explicitly tick what their apartment
  offers.

**Rationale:**

- A flat 7-item facility list is the right shape for the listing
  form: short enough to render as a single group, structured enough
  to drive marketplace filters per facility once those are
  introduced (out of MVP).
- Slashing `has_living_room` and `has_gas_cooking` cuts noise without
  losing real signal — both can be inferred from the description or
  the photos.
- Adding furniture, terrace/yard, and washing machine fills gaps
  that crews ask about during property visits.
- Bunk beds stays property-level (per the previous "no per-bedroom
  bunk tracking" decision) but lives outside the facilities group
  because it answers a different question ("what's the bed
  configuration?" not "what does the apartment provide?").

**Status:** ✅ Locked. Supersedes the amenity-list portion of the
earlier 2026-05-13 "Listing fields: bedrooms (not rooms) + four
amenities" entry — specifically the four new booleans named there
(`has_living_room`, `has_bunk_beds`, `has_ac`, `has_gas_cooking`)
are no longer the canonical set. `has_bunk_beds` survives as a
separate (non-facilities) property-level boolean; `has_ac` survives
in the new facilities list; `has_living_room` and `has_gas_cooking`
are removed.

---

**End of decisions log. Append new entries below this line.**
