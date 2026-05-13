# oz-marketplace · BUILD_PLAN

**Status:** CP-1 decisions locked · **Generated:** 2026-05-02 · **Owners:** Adir
**Inputs consumed:** `recon/00-INDEX.md`, `04d-brand-tokens-extracted.md`, `04e-brand-components.md`, `05-oz-marketplace-state.md`, `10-open-questions.md`
**Stack:** Next.js 16 App Router · React 19 · Supabase (Auth, Postgres, Storage, Edge Functions) · **SCSS only** · Hebrew RTL primary · Mobile-first

---

## 0. TL;DR

oz-marketplace is a new project inspired by `worker-housing-platform` (legacy). The legacy specs and brand system are taken as authoritative inputs; the legacy code is reference material.

**MVP scope — re-locked 2026-05-06:** ships two product surfaces to production:
1. **B2B marketplace** — owner-companies list properties; construction corporations browse, request to book, pay full stay upfront + OZ commission via Pelecard; sign a digital lease contract via HelloSign.
2. **Hostels page** — public landing page with link-out cards to FrontDeskMaster's hosted booking for the four AM HOSTELS properties (Jerusalem / Tel Aviv / Haifa / Tiberias).

**Out of MVP** (deferred): corporate dashboard, B2C / individual-owner product, native hostel booking engine, yield calculator, AI Import, virtual tours, ratings system, **verification system (all levels — 1, 2, and 3)**, Neema integration. See `DECISIONS_LOG.md` 2026-05-06 for the re-scope rationale and 2026-05-12 for the verification deferral.

| Checkpoint | What you approve | Status |
|---|---|---|
| **CP-1** (this doc) | All decisions in §3, scales in §4, architecture in §5, build sequence in §6 | ✅ locked |
| **CP-2** | Generated `_tokens.scss`, global stylesheet, scaffolded layout | ✅ passed |
| **CP-1.5** | All nine primitives reviewed at 375 / 768 / 1280px on the demo page | ✅ passed |
| **CP-2.5** | Layout chrome (Sidebar / Topbar / Tabs / MobileDrawer / AppShell) reviewed at 375 / 768 / 1280px | ✅ passed |
| **CP-3a** | Migrations applied to local Supabase; schema, RLS, and trigger verified by query | ⏳ awaits Phase 3 |
| **CP-3b** | Auth UI reviewed at 375 / 768 / 1280px; three sign-in methods produce sessions against local Supabase; RLS denies unauthenticated access | ⏳ awaits Phase 3 |
| **CP-4a** | Listings schema + RLS + listing-management screens (create / edit / list-mine) — owner-company can publish a listing end-to-end | ⏳ awaits Phase 4 |
| **CP-4b** | Public homepage + marketplace browse + listing detail; construction corporation can request to book | ⏳ awaits Phase 4 |
| **CP-4c** | Pelecard Link b'Click + HelloSign integration live; full request-to-book → pay → contract → confirmed flow works end-to-end | ⏳ awaits Phase 4 |
| **CP-5** | Production readiness — real Supabase project provisioned, domain wired, monitoring + crons live, end-to-end smoke against production | ⏳ awaits Phase 5 |

CP-2.5 cleared 2026-05-05. Phase 3 prompt is ready in `PROMPT_LIBRARY.md` (with 2026-05-06 amendment for third persona). Phase 4 prompt drafted 2026-05-06.

---

## 1. Inputs status

| Input | Source | Status | Notes |
|---|---|---|---|
| Product specs | `worker-housing-platform/docs/*.md` (excluding `brand/`) | ✅ Authoritative | Stale URL/path references catalogued in `recon/02-legacy-references.md`; rewritten on the way into the new repo |
| Design system | `worker-housing-platform/docs/brand/` | ✅ Authoritative | Three named gaps (spacing, breakpoints, z-index) — filled in §4 |
| Iron rules | `docs/IRON_RULES.md` | ✅ Authoritative | Rules 1, 2, 5, 9 carry through verbatim |
| Database schema | `oz-marketplace-legacy/supabase/migrations/20260425000000_baseline.sql` (3293 lines) | ✅ Live ground truth | Recon's `06-legacy-schema.md` captures the full topology; rebuilt fresh for this project (see §3) |
| AM Hostels booking engine | Live in legacy | ✅ Specs preserved verbatim in `recon/09-hostel-booking-engine.md` | Stays architecturally isolated. Legacy columns dropped (see §3, OQ-2) |
| Brand assets — fonts | `docs/brand/assets/fonts/` | ⚠️ Partial | Heebo / Assistant declare 4 weights but ship only 400 → faux bold accepted for MVP, real weights ported in Phase 5 |
| `.env.local` | Legacy project | ✅ Source of values | Merge strategy in §3.E |

---

## 2. Project framing

oz-marketplace is a clean Next.js project that takes the legacy product specs, brand system, and database design as its inputs. There is no shared code, no shared dependency tree, and no migration path between the two repos. The legacy `worker-housing-platform` repo remains as a reference checkout next to oz-marketplace for the duration of the build, then becomes archive material.

Five corrections from the legacy state are folded into this build during the scaffold and migration phases (OQs 2, 3+4, 6, 7, 17, 24, 25 — see §3).

---

## 3. Locked decisions

### §3.A — Strategic decisions

| OQ | Decision | Rationale |
|---|---|---|
| **OQ-1** | **AI Import provider: Anthropic Claude (Haiku model)** | Aligns with stated brand, leverages Adir's existing Claude subscription, matches every doc reference. The legacy edge function (which used Gemini) is not ported — re-implemented against the Anthropic API. |
| **OQ-15** | **Neema: deferred to post-MVP roadmap** | Not present anywhere in the legacy code or docs. Use cases (foreign-worker prepaid cards, payroll routing, escrow) all sit beyond MVP scope. Logged in `DECISIONS_LOG.md` so it's not lost. |
| **OQ-16** | **Hostel slugs: `jerusalem`, `tel-aviv`, `haifa`, `tiberias`** (kebab-case) | Four hostels live in the AM HOSTELS portfolio. Slug `tel-aviv` (with separator) is canonical going forward. |
| **OQ-26** | **Email provider: Resend** | Already CSP-allowlisted in legacy; transactional-email focus matches the use cases (KYC, contract events, booking confirmations); clean React Email integration. |
| **OQ-27** | **Env strategy: legacy `.env.local` + new `.env.example`** | Adir provides the legacy `.env.local`; Phase 0 generates a sanitized `.env.example` template for the repo. Merge rules in §3.E. |
| **OQ-29** | **MVP cron jobs: `health-check`, `vercel-monitor`, `qa-checks`** | These three carry value for the marketplace itself. `daily-report` and `paperclip-sync` are Uzi/Paperclip operational and live outside the product. |

### §3.B — Schema corrections (folded into Phase 3)

| OQ | Decision |
|---|---|
| **OQ-2** | Drop `hostel_bookings.stripe_session_id`. **Drop all legacy columns no longer needed** — the rebuild does not carry over dead schema. |
| **OQ-3 + OQ-4** | Single source of truth for roles. Enum: `user_role` with values `('owner_individual', 'owner_company', 'construction_corporation', 'admin')`. The `profiles.role` text column is replaced by this enum. The `handle_new_user()` trigger reads role from `raw_user_meta_data.role` with a default of `owner_company`. **Two roles are signupable in MVP:** `owner_company` (supply-side, lists properties) and `construction_corporation` (demand-side, books properties). Sign-up persona picker offers three options: "company" (creates `owner_company`), "construction corporation" (creates `construction_corporation`), and "individual" (no account created — friendly "coming soon" message). `owner_individual` is reserved but unreachable in MVP signup — activated in a future phase. `admin` is admin-invited via Studio. The legacy roles `manager_property`, `field_staff`, `ops`, `company`, `admin_corporate`, `b2c_owner`, `corporate_member`, `b2b_owner` are not part of MVP. *Superseded twice — original CP-1 lock 2026-05-02 used b2c/b2b naming; 2026-05-05 changed enum names; 2026-05-06 added `construction_corporation` as signupable. See `DECISIONS_LOG.md` for rationale.* |
| **OQ-6** | `listings.verification_level smallint NOT NULL CHECK (verification_level IN (1,2,3))`. Legacy `verification_tier` A/B/C is dropped. **Naming alignment everywhere:** DB column `verification_level`; TS type `VerificationLevel`; component `VerificationLevelBadge`; SCSS module `VerificationLevelBadge.module.scss`. Hebrew UI labels are independent and follow the brand glossary. **Superseded for MVP, 2026-05-12:** the verification system (all levels) is deferred. The column exists in the schema (Phase 3 migration shipped) and defaults to `1`, but no UI surfaces verification in MVP — no badge on listing cards, no attestation flow, no level-2 review queue. The primitive and SCSS module remain in the codebase as dead-but-harmless until the verification system is re-scoped post-MVP. |
| **OQ-7** | `get_signed_url()` is rewritten to use Supabase's native `storage.create_signed_url()` helper — no hardcoded project URL. |
| **OQ-17** | All hostel slugs in DB use kebab-case (`tel-aviv`, not `telaviv`). Schema CHECK constraint updated. |
| **OQ-24** | `KpiCard.module.scss` uses `inset-inline-end` instead of physical `left`. |
| **OQ-25** | `DataTable.module.scss` uses `text-align: end` instead of physical `right`. |
| **OQ-20** | Faux bold for Heebo/Assistant 500/700/800 accepted for MVP. Real weights ported in Phase 5 production readiness. |

### §3.C — Documentation hygiene (handled in Phase 0)

The legacy docs reference 5 files that don't exist on disk (`BOOKING_SYSTEM_MVP.md`, `BOOKING_SYSTEM_DREAMS.md`, `VIRTUAL_TOUR_SPECS.md`, `PROJECT_SPECS.md`, `payment-provider-analysis.md`). The new repo's `docs/` is built fresh and only references files that actually exist. The undocumented "demand side" persona (OQ-12) gets a new `docs/specs/DEMAND_SIDE.md` that fills the gap.

### §3.D — Verification level (deferred from MVP)

> **Deferred 2026-05-12.** The verification system (all levels — 1, 2, and 3) is out of MVP. The `listings.verification_level` column remains in the schema (default `1`) but is not surfaced in UI. The text below is preserved as the target design for when the verification system is re-scoped post-MVP.

A verification level is the trust grade of a property listing. Higher level = more verification = better marketplace placement and stronger trust signals to buyers (construction corporations).

| Level | What's verified |
|---|---|
| **1** | Owner identity (ID document + selfie) |
| **2** | Level 1 + property documents (deed/lease) + photos verified by ops |
| **3** | Level 2 + physical inspection by field staff + full compliance check |

Stored as `listings.verification_level smallint` (1, 2, or 3). UI renders a `VerificationLevelBadge` (a `Pill` styled by level). Badge color reflects level: 1 → gray, 2 → blue-light, 3 → green-deep.

### §3.E — Env strategy (`.env.local` + `.env.example`)

The legacy project uses `.env.local`. The new project keeps that pattern but adds a committed `.env.example` template so future contributors aren't dependent on a hand-off file.

**Merge rules** (executed by Claude Code in Phase 0):

1. Read legacy `.env.local` (you provide it — drop into `oz-marketplace/.env.local` before running Phase 0).
2. For each variable in the proposed structure below:
   - If present in `.env.local` with a value → keep value, copy variable name to `.env.example` with empty value
   - If present in `.env.local` empty → keep empty, copy to `.env.example`
   - If absent from `.env.local` → add to **both** files, commented out, with a note explaining what it's for
3. Add `.env.local` to `.gitignore`. Commit `.env.example`.

**Proposed structure (Claude Code merges legacy values into this):**

```env
# ───── Supabase ─────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ───── Twilio (SMS OTP) ─────
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_OTP_FROM_NUMBER=

# ───── HelloSign (e-sign) ─────
HELLOSIGN_API_KEY=
HELLOSIGN_CLIENT_ID=
HELLOSIGN_WEBHOOK_SECRET=

# ───── Pelecard (payments — IRON_RULE 2: only allowed provider) ─────
PELECARD_TERMINAL_NUMBER=
PELECARD_API_USER=
PELECARD_API_PASSWORD=
PELECARD_ENV=test     # test | live

# ───── Resend (transactional email) ─────
RESEND_API_KEY=

# ───── Anthropic Claude (AI Import) ─────
ANTHROPIC_API_KEY=

# ───── Cron secrets ─────
CRON_SECRET=
```

### §3.F — MVP scope re-lock (2026-05-06)

The original BUILD_PLAN had eight phases (Phase 4 corporate dashboard, Phase 5 marketplace, Phase 6 hostel booking engine, etc.). Following business-side direction, MVP is re-scoped to two production-ready surfaces:

**Ships in MVP:**

1. **B2B marketplace.** Public homepage + browseable listings + listing detail page. Owner-companies (`owner_company` role) sign up and manage their listings (create / edit / archive / view-mine). Construction corporations (`construction_corporation` role) sign up, browse the marketplace, and request to book a property. The owner-company accepts or rejects. On accept, the corporation pays the full stay upfront + OZ commission via Pelecard Link b'Click. Both parties sign a standardized lease via HelloSign. Booking moves to `confirmed` and contact details are exchanged.

2. **Hostels page.** Public route `/hostels` showing four cards for the AM HOSTELS properties (Jerusalem / Tel Aviv / Haifa / Tiberias). Each card links out to FrontDeskMaster's hosted booking URL. The same four cards appear on the homepage as a strip.

**Deferred (not in MVP):**

- Corporate dashboard (KPIs, activity feed, charts, AI Import, Excel reporting, role-based corporate permissions, bulk worker upload)
- B2C / individual-owner product (`owner_individual` enum value reserved but no signup path)
- Native hostel booking engine (FDM link-out is MVP; embed and own-it are future phases per `DECISIONS_LOG.md` 2026-05-06)
- Yield calculator
- Virtual tours
- Ratings & reviews
- **Verification system — all levels** (1 self-reported, 2 remote attestation, 3 paid on-site inspection). The `listings.verification_level` column exists but is not surfaced in MVP UI. See DECISIONS_LOG 2026-05-12.
- Neema fintech integration
- Premium listing tiers / featured placement

**Production-ready means production-ready.** No half-built features visible to users in production. Code that's not part of MVP simply doesn't exist in the codebase yet — no feature-flagged routes that show "coming soon," no stubbed pages. See §3.G for the feature-flag pattern.

### §3.G — Feature flag pattern

Three flag patterns exist; the project uses two of them deliberately:

| Pattern | Description | When to use |
|---|---|---|
| **A. Build-time flag** (`process.env.FEATURE_X === 'on'`) | Code bundled but route gated. Hard to flip without deploy. | Not used. |
| **B. Runtime config flag** (`feature_flags` table or env var) | Code bundled, behavior toggles at runtime. | **Used for navigation entries** so we can build the full IA (sidebar items, footer links) for design holism, hiding entries whose target screens aren't shipped. Default off in production. |
| **C. Code that doesn't exist** | Feature not built; route returns 404. | **Used for any screen behind unbuilt features.** No `(corporate)/dashboard/page.tsx` returning "coming soon." The route doesn't exist until we build it. |

**The combination:** nav items can be visually present (option B) for design balance, but every visible nav item leads to a real, complete screen (option C). In MVP production, the navigation is sparse — only `/`, `/hostels`, `/listings`, the listing-detail pages, the listing-management pages, the auth pages, and the corporation's bookings page exist. Everything else is hidden by flag and unbuilt.

The flag implementation is a single Postgres table:

```sql
CREATE TABLE public.feature_flags (
  key   text PRIMARY KEY,
  value boolean NOT NULL DEFAULT false,
  notes text
);
```

Read at the server boundary; cached for the request. Admin-only mutation via Studio. Phase 4 introduces this table; Phase 5 (production readiness) hardens it.

### §3.H — Env name correction

`TWILIO_SMS_FROM` is the canonical env var name (matches your existing `.env.local`). The Phase 0 `.env.example` template wrote `TWILIO_OTP_FROM_NUMBER` — that is corrected in Phase 3. The names refer to the same value: the Twilio phone number used as the source for OTP SMS.

---

## 4. Brand-system gaps filled

The brand/ folder defines colors, typography, radii, shadows, motion, iconography. It does **not** define spacing, breakpoints, or z-index. Industry best practice — mobile-first — drives the choices below.

### 4.A — Spacing scale (4px base, mobile-first)

A 4px-base scale gives fine-grained control on small screens (where every 4px counts) while still supporting large desktop hero gaps. Aligns with Tailwind, Material Design 3, and most modern systems. Mockups already use values that map cleanly onto this scale.

| Token | px | rem | Common use |
|---:|---:|---:|---|
| `$space-0` | 0 | 0 | reset |
| `$space-1` | 4 | 0.25 | tight inline gaps (icon ↔ text in chips) |
| `$space-2` | 8 | 0.5 | default gap between adjacent inline items |
| `$space-3` | 12 | 0.75 | small button padding, compact form gaps |
| `$space-4` | 16 | 1 | default body padding inside cards |
| `$space-5` | 20 | 1.25 | between form fields |
| `$space-6` | 24 | 1.5 | between card sections |
| `$space-7` | 32 | 2 | between page sections (sm) |
| `$space-8` | 40 | 2.5 | between page sections (md) |
| `$space-9` | 48 | 3 | between page sections (lg) |
| `$space-10` | 64 | 4 | hero vertical padding (mobile) |
| `$space-11` | 80 | 5 | landing-page section breaks (desktop) |
| `$space-12` | 96 | 6 | mega gaps (rarely used) |

### 4.B — Breakpoint scale (mobile-first, Tailwind-aligned)

Mobile-first means: default styles target the smallest screen; breakpoints scale **up** with `min-width`. Tailwind's scale is the most widely adopted in the React/Next ecosystem, which keeps the system familiar and keeps designer/developer references compatible.

| Token | min-width | Targets |
|---|---:|---|
| (default) | 0 | small phones (≥320px), the design baseline |
| `$bp-sm` | 640px | larger phones / phablets |
| `$bp-md` | 768px | tablets portrait |
| `$bp-lg` | 1024px | tablets landscape / small laptops |
| `$bp-xl` | 1280px | desktops (matches existing `--container-xl`) |
| `$bp-2xl` | 1536px | wide desktops |

Used via SCSS mixin:

```scss
@mixin from($bp) {
  @media (min-width: $bp) { @content; }
}

// Usage:
.button {
  padding: t.space(3);

  @include m.from(t.bp(md)) { padding: t.space(4); }
}
```

### 4.C — Z-index scale (gapped for insertion)

Standard layering pattern with gaps of 10 between layers, leaving room to insert new layers without renumbering. The escape hatch (`$z-top`) is reserved for emergencies and must always be commented.

| Token | Value | Use |
|---:|---:|---|
| `$z-base` | 0 | default flow |
| `$z-dropdown` | 10 | popovers, dropdowns, tooltips |
| `$z-sticky` | 20 | sticky headers, sticky table headers |
| `$z-drawer` | 30 | side drawers (mobile nav) |
| `$z-modal-backdrop` | 40 | modal scrim |
| `$z-modal` | 50 | modal content |
| `$z-toast` | 60 | toasts, system notifications |
| `$z-top` | 999 | escape hatch — always comment why |

---

## 5. SCSS architecture

Three layers, mobile-first, no Tailwind, no CSS-in-JS framework.

### 5.A — Layer 1: Token & global layer (`/styles/`)

```
styles/
├── _tokens.scss         # SCSS maps + variables. ALL design tokens live here.
├── _functions.scss      # token($map, $key) helper, color manipulation
├── _mixins.scss         # @mixin from($bp), focus-ring, rtl-flip, truncate
├── _reset.scss          # box-sizing, margin reset, focus-visible defaults
├── _typography.scss     # html/body defaults, h1–h6, p, small, eyebrow
├── _fonts.scss          # @font-face — ported from brand/assets/fonts/fonts.css
├── _utilities.scss      # .flex .row .col .gap-N .muted .tnum .center .right
└── globals.scss         # the only file imported by app/layout.tsx
```

`globals.scss`:

```scss
@use "fonts";
@use "reset";
@use "typography";
@use "utilities";
```

Module consumption pattern:

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.button {
  background: t.color(orange);
  padding: t.space(3) t.space(5);     // mobile default
  border-radius: t.radius(xl);
  box-shadow: t.shadow(orange);
  transition: t.motion(fast);

  @include m.from(t.bp(md)) {
    padding: t.space(4) t.space(6);   // tablet+
  }
}
```

### 5.B — Layer 2: Component layer (CSS Modules)

Every component owns its own `.module.scss` co-located with the `.tsx`. Modules `@use` the token/mixin layer; they never contain raw color values.

```
components/
├── primitives/
│   ├── Button/{Button.tsx, Button.module.scss, Button.types.ts}
│   ├── Input/
│   ├── Card/
│   ├── Pill/
│   ├── Chip/
│   ├── Badge/
│   ├── VerificationLevelBadge/    ← reads `verification_level` (1|2|3) — built in Phase 1, NOT rendered in MVP UI (see §3.D)
│   ├── Avatar/
│   ├── ProgressBar/
│   └── Icon/                      ← consumes the SVG sprite from public/icons.svg
├── layout/
│   ├── AppShell/                  ← .app from brand
│   ├── Sidebar/                   ← .side
│   ├── Topbar/                    ← .topbar
│   ├── Tabs/
│   └── BrandMark/
├── kpi/
│   ├── KpiCard/                   ← .kpi (with OQ-24 RTL fix baked in)
│   ├── DonutChart/
│   ├── BarChart/
│   └── Sparkline/
├── feed/
│   └── ActivityFeed/
├── alerts/
│   ├── AlertStrip/
│   └── ToastHost/
├── forms/
│   ├── Field/
│   ├── Search/
│   └── Steps/                     ← KYC wizard
├── marketplace/
│   ├── ListingCard/
│   ├── Hero/
│   ├── SearchBar/
│   └── TrustBand/
├── tables/
│   └── DataTable/                 ← .tbl (with OQ-25 RTL fix baked in)
├── ai/
│   ├── AiBanner/
│   └── NotebookLmCard/
└── mobile/
    └── FieldCard/
```

No barrel files at the root — each component imported from its folder. Keeps Next.js tree-shaking correct.

### 5.C — Layer 3: Page-level styles

Pages may have one-off `.module.scss` for unique layouts. Anything reusable is refactored down into a component.

### 5.D — Mobile-first + RTL strategy

- `<html lang="he" dir="rtl">` set in root layout (IRON_RULE 5).
- `body { direction: rtl; }` is the default in `_typography.scss`.
- All components use **logical properties** (`inset-inline-*`, `margin-inline-*`, `padding-inline-*`, `text-align: end/start`).
- Mobile-first means: write the mobile styles first as the default; use `@include m.from($bp)` to scale up. Never use `max-width` queries — always `min-width`.
- A `@mixin rtl-flip` in `_mixins.scss` handles rare physical-mirror cases (chevron arrows in nav).
- Each component reviewed at three viewports before merging: 375px (iPhone SE), 768px (tablet portrait), 1280px (desktop).

### 5.E — Naming alignment (DB → code → component)

DB column names, TS type names, and component names stay aligned wherever a column drives UI. Concrete current pairs:

| DB column | TS type | Component | Module |
|---|---|---|---|
| `listings.verification_level` | `VerificationLevel` | `VerificationLevelBadge` *(not rendered in MVP — see §3.D)* | `VerificationLevelBadge.module.scss` |
| `profiles.role` (`user_role` enum) | `UserRole` | `RoleBadge` | `RoleBadge.module.scss` |
| `hostel_bookings.status` | `HostelBookingStatus` | `HostelBookingStatusPill` | `HostelBookingStatusPill.module.scss` |

When a new column drives UI, the same pattern applies: column name stays the canonical name across all layers.

### 5.F — What we explicitly do NOT do

- ❌ Import `colors_and_type.css` or `styles.css` from `brand/` directly. They're re-authored as SCSS.
- ❌ Use CSS custom properties as the public token API. Tokens are SCSS variables / maps. (Custom properties may appear inside a module for runtime theming; the source of truth is SCSS.)
- ❌ Reach for utility class names in JSX as the primary pattern (`className="flex gap-4 p-6"`). Utility classes ported from brand exist for convenience; module-scoped class names are the default.
- ❌ Use `max-width` media queries.

---

## 6. Build phase sequence

Each phase is an atomic deliverable to Claude Code. You commit after each phase, run on staging if relevant, then move to the next.

### Phase 0 — Scaffold + token system + docs skeleton

- `npx create-next-app@latest oz-marketplace` — TypeScript, App Router, no Tailwind, no `src/`
- Install: `sass`, `@supabase/supabase-js`, `@supabase/ssr`, `zod`
- Hebrew RTL root layout (`<html lang="he" dir="rtl">`)
- Full `/styles/` token system per §5.A (tokens, mixins, mobile-first breakpoint mixin, RTL fixes)
- Fonts ported from `brand/assets/fonts/`
- Icon sprite from `brand/assets/_icons.html` → `public/icons.svg` + `<Icon name="..." />` primitive
- `.env.local` (merged from legacy) + `.env.example` (committed template) per §3.E
- Empty `supabase/` folder with `config.toml` and `migrations/`
- Fresh `docs/` per §7
- Fresh `TASKS.md` per §8 (NOT ported from legacy)
- Initial commit

**→ Checkpoint CP-2.** Eyeball tokens, RTL, typography before any component is built.

### Phase 1 — Primitives

`Button`, `Input`, `Card`, `Pill`, `Chip`, `Badge`, `VerificationLevelBadge`, `Avatar`, `ProgressBar`, `Icon`. Each ships with a demo entry under `app/(dev)/primitives/page.tsx` for visual review at all three breakpoints.

**→ Checkpoint CP-1.5.** Visual review of every primitive in every variant at 375 / 768 / 1280px before layout work begins.

### Phase 2 — Layout & navigation

`AppShell`, `Sidebar`, `Topbar`, `Tabs`, `BrandMark`, plus supporting components (`TenantSwitcher`, `NavLink`, `UserWidget`, `MobileDrawer`). Wires the corporate dashboard chrome.

**→ Checkpoint CP-2.5.** Visual review of the layout chrome at 375 / 768 / 1280px before auth and dashboard work begins.

### Phase 3 — Auth & RLS foundation

- Migration #1: enums (`user_role` per §3.B), `profiles`, `auth.users` trigger (persona-aware).
- Migration #2: RLS skeleton.
- `app/(auth)/` — Google OAuth + Twilio OTP, persona-aware role assignment.
- Verification level column (`listings.verification_level smallint`) lands in the Phase 4 listings migration but stays dormant for MVP — see §3.D and DECISIONS_LOG 2026-05-12.

**→ Checkpoint CP-3.** Run on staging before any production deploy.

### Phase 4 — Marketplace + booking flow + hostels page

The biggest phase in the new plan. Three checkpoints inside it.

**CP-4a — Listings & management.** Migration adds `listings` table, `listing_images` table, `feature_flags` table, RLS policies. Owner-companies get screens to create / edit / archive / list-their-own listings. Image upload via Supabase Storage. By end of CP-4a, an `owner_company` user can publish a complete listing end-to-end on local Supabase.

**CP-4b — Public surface + browse + booking request.** Public homepage at `/` reusing the structure from the existing workerhome.co.il (hero with dual CTAs, hostels strip, listings preview, "how it works", legal callout, owner-side pitch, FAQ, footer — but with B2C/calculator/testimonials sections removed per §3.F MVP scope). Public marketplace at `/listings` with search and filters. Public listing detail at `/listings/[id]`. Construction-corporation users can submit a "request to book" with date range. Hostels page at `/hostels` with four FDM link-out cards.

**CP-4c — Pelecard + HelloSign integration.** Owner-company accepts or rejects booking requests. On accept, Pelecard Link b'Click payment URL is generated for the corporation, total = full stay + OZ commission. Webhook updates booking status on payment. HelloSign signing request sent to both parties with the standardized lease template. Webhook updates booking to `confirmed` on signed-by-both. Email notifications via Resend at every state transition. Bookings list view for the corporation (the minimum dashboard surface they need).

### Phase 5 — Production readiness

Real Supabase project provisioned (replaces local). Domain wired. Cron jobs (`health-check`, `vercel-monitor`, `qa-checks`) deployed and validated. Real font weights ported (resolves OQ-20). Lighthouse + a11y audit. Rate limits, monitoring, error tracking. End-to-end smoke against production. Final visual regression review against existing workerhome.co.il at three breakpoints.

### Future-roadmap (NOT MVP — explicitly gated)

Everything in §3.F's "Deferred" list. Tracked in `docs/specs/dreams/` and `TASKS.md` Future-roadmap section. No code lives in main for these.

---

## 7. New `oz-marketplace/docs/` hierarchy

Created in Phase 0. Replaces the legacy docs as SSOT for this project. Order of creation:

```
docs/
├── README.md                 # entry point, environments, contribution
├── BUILD_PLAN.md             # this document
├── IRON_RULES.md             # ported from legacy (the 9 rules)
├── DECISIONS_LOG.md          # ported, plus all CP-1 decisions logged
├── GLOSSARY.md               # ported, with terminology fixes (verification_level, owners not property_owners)
├── SCHEMA.md                 # rewritten from baseline.sql, freshly accurate
├── ROLES_AND_RLS.md          # from recon/07
├── INTEGRATIONS.md           # from recon/08, with confirmed providers
├── HOSTEL_BOOKING_ENGINE.md  # from recon/09 — isolation rules verbatim
├── TASKS.md                  # fresh — see §8
└── specs/
    ├── B2B_MVP.md            # ported with paths/URLs corrected
    ├── B2C_MVP.md            # ported with paths/URLs corrected
    ├── DEMAND_SIDE.md        # NEW — fills the OQ-12 gap (was the missing PROJECT_SPECS.md)
    └── dreams/
        ├── B2B_DREAMS.md
        ├── B2C_DREAMS.md
        ├── BOOKING_SYSTEM_DREAMS.md
        └── VIRTUAL_TOUR_SPECS.md
```

Files under `dreams/` are tagged `STATUS: future-roadmap, not-MVP` in their headers.

---

## 8. TASKS.md — fresh task list, not ported

`TASKS.md` is generated fresh in Phase 0 from this BUILD_PLAN's phase structure. **Nothing is ported from the legacy `TASKS.md`** — it's known to be stale and IRON_RULE 7 explicitly warns against using it as a source of truth.

The fresh `TASKS.md` opens with a phase tracker:

```markdown
# Tasks

## Active phase
**Phase 0 — Scaffold** · Started: YYYY-MM-DD · Status: in progress

## Phase tracker
- [x] Phase 0 — Scaffold + token system + docs skeleton
- [x] CP-2 — Token + RTL + typography review
- [x] Phase 1 — Primitives
- [x] CP-1.5 — Primitives visual review at 375 / 768 / 1280
- [x] Phase 2 — Layout & navigation
- [x] CP-2.5 — Layout chrome visual review at 375 / 768 / 1280
- [ ] Phase 3 — Auth & RLS foundation
- [ ] CP-3a — Migrations + schema verified on local Supabase
- [ ] CP-3b — Auth UI + sign-in flow verified
- [ ] Phase 4 — Marketplace + booking flow + hostels
- [ ] CP-4a — Listings schema + management UI
- [ ] CP-4b — Public homepage + browse + listing detail + hostels page
- [ ] CP-4c — Pelecard + HelloSign + booking lifecycle
- [ ] Phase 5 — Production readiness

## Next-up (within active phase)
…

## Blocked
…

## Future-roadmap (post-MVP)
- [ ] **Hostels: convert link-out to embedded FDM component** (DECISIONS_LOG 2026-05-06)
- [ ] **Hostels: replace embedded FDM with own native booking engine** (or skip embed and go straight to native if engineering capacity allows)
- [ ] B2/B3 self-serve persona-picker — activate `owner_individual` self-serve when individual product launches
- [ ] Corporate dashboard (KPIs, AI Import, Excel reports, role-based corporate permissions, bulk worker upload)
- [ ] Yield calculator
- [ ] Ratings & reviews
- [ ] Verification system — all levels (1 self-reported, 2 remote attestation, 3 paid on-site inspection). Schema column exists but unused in MVP.
- [ ] Virtual tours
- [ ] Neema integration (OQ-15)
- [ ] Premium listing tiers / featured placement
- [ ] Other items from docs/specs/dreams/
```

Every task that closes gets a checkpoint commit and a one-line entry under "Done" with the date. The Done section is pruned to last 30 days; older items move to `docs/CHANGELOG.md`.

---

## 9. Sister prompt — language & naming convention for Claude Code

When Claude Code generates docs in subsequent phases (Phase 0 README, DECISIONS_LOG, SCHEMA, etc.), it should use the framing established in this document. Paste the block below into the start of any future Claude Code session that creates or edits docs in this repo:

```text
DOC FRAMING & NAMING CONVENTIONS (apply to every doc and code file in this repo)

Project framing:
- oz-marketplace is a "new project inspired by worker-housing-platform (legacy)".
- Do NOT use the words "rebuild", "refactor", "migration from legacy", or
  "port from legacy" as project-level framing. Use them only for narrow
  technical contexts (e.g., "the SCSS port of brand/styles.css").
- The legacy repo is "reference material" or "the legacy project", never
  "the previous version of this project".
- Specs, brand, and schema design are "inputs taken from" the legacy project,
  not "carried over from" it.
- Frame phases and features as "build", not "rebuild".
- IRON_RULES, brand tokens, and the 4-hostel list are authoritative inputs;
  reference them as such.
- Never write "as before", "like in the old project", "as the legacy did".
  State what oz-marketplace does, in oz-marketplace's voice.

Naming alignment (DB → code → component):
- Column names are the canonical names across DB, TS types, components, and
  SCSS modules. Do not invent friendlier aliases for column-driven UI.
- Examples:
    listings.verification_level → type VerificationLevel → <VerificationLevelBadge>
    profiles.role (user_role enum) → type UserRole → <RoleBadge>
    hostel_bookings.status → type HostelBookingStatus → <HostelBookingStatusPill>
- Hebrew UI labels are independent and follow the brand glossary; English
  symbols stay aligned with DB.
```

---

## 10. What's next

CP-1 is locked. The next deliverable is the **Phase 0 prompt** — a single paste-ready block for Claude Code that scaffolds the project, installs the token system, sets up Hebrew RTL, ports fonts and the icon sprite, generates `.env.local` + `.env.example` from the merge rules in §3.E, lays down the empty Supabase folder, writes the fresh `docs/` per §7, writes the fresh `TASKS.md` per §8, and lands the initial commit.

When you're ready, drop your legacy `.env.local` into `oz-marketplace/.env.local` and ping me. I'll produce the Phase 0 prompt.

---

*End of BUILD_PLAN. CP-1 locked 2026-05-02.*
