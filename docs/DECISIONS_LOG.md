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
**Status:** ✅ Locked

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

---

**End of decisions log. Append new entries below this line.**
