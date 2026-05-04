# 03 — Per-doc Summaries

Scope: every file in `../worker-housing-platform/docs/` **except** `docs/brand/` (deep-dived in Step 5).
Format per file: 2–4 sentence summary covering content, audience, and category. Categories: **product spec**, **implementation guide**, **operational runbook**, **historical/archive**, **unclassified**.

---

### docs/README.md
Top-level map of the docs folder, organised into 4 layers (Foundation → Specs → Cross-cutting → Operational). Lists every spec file and explains MVP-vs-Dreams conventions plus status emojis (✅ ⏳ 🔮 ⚠️ ❓). Audience: anyone entering the project. **Category:** operational runbook.

### docs/IRON_RULES.md
Nine non-negotiable rules covering schema isolation (corporate vs hostel), payment provider lock (Pelecard only — no Stripe/Meshulam), DB approval process, branch flow, RTL-first, verify-before-assuming, TASKS.md is not source-of-truth, honest reporting, and brand identity. The single most authoritative governance document; supersedes any conflicting older docs (`PROJECT_SPECS.md`, `SPEC.md`, `ROADMAP.md`, `TASKS.md`). Audience: every contributor (Dagan, Uzi, Maki, Maya). **Category:** operational runbook.

### docs/SCHEMA.md
Snapshot of the live production Postgres database as of 2026-04-30, captured from `pg_dump` plus row counts. Lists 7 active tables with data, ~20 empty live tables, 6 referenced-but-not-live tables (with explicit "treat as broken" guidance), the 8 tables with active RLS, and the 15 applied migrations in order. Audience: any developer touching DB code. **Category:** implementation guide.

### docs/GLOSSARY.md
Single-page reference for every named concept used across the project, grouped into Personas & roles (B2B/B2C/Manager/Solo/GSC/Group/Demand/Supply), Product concepts (Booking System, Dual-path principle, Operator System, Pakal Nofesh, Tier 1/2/3), Technical terms (AI Import, BOM, HelloSign, KYC, NotebookLM, Pelecard, RLS), Business concepts (ח.פ., ע.מ., ארנונה, Foreign Workers Regulations), Internal jargon, and Stack-specific terms (Bot environment, Codex 5.4, staging Preview, Workspace-oz). Audience: anyone needing to decode the project's vocabulary. **Category:** operational runbook.

### docs/DECISIONS_LOG.md
Append-only log of every locked product decision (currently 17 entries, all dated 2026-04-30) with context/rationale/implications/status for each. Captures decisions on brand fonts/palette, DB-as-canonical, three known table bugs (`property_documents`, `monthly_rentals`, `property_owners`), B2C/B2B architecture split, Pelecard payment lock, single-user B2B MVP, 15/5/2026 launch, deferred Tier 3 verification / Ratings / Virtual Tour / Hostel Booking, staging-only auto-deploy, and Maya as Operations Center. Audience: any decision-maker or implementer needing the "why." **Category:** operational runbook (decision history).

### docs/OPEN_QUESTIONS.md
Live tracker for unresolved questions; **currently empty** ("No active open questions") with all recent items moved to `DECISIONS_LOG.md`. Includes a usage protocol, an entry template, and a recently-resolved list. Audience: anyone discovering ambiguity during build. **Category:** operational runbook.

### docs/B2B_SPECS_MVP.md
The locked MVP feature set for B2B (Manager persona — single user, 5+ properties for corporate clients), structured as 7 dashboard tabs (`/dashboard/corporate?tab=...` for overview/properties/workers/contracts/reports/ai-import/settings) plus a corporate registration & KYC onboarding flow. Each tab has user journey, acceptance criteria, schema dependencies, existing-code pointers, and status. Target launch 15/5/2026. Audience: Dagan (lead developer) and Adir (PM). **Category:** product spec.

### docs/B2B_SPECS_DREAMS.md
The future-vision document for B2B, structured as a 4-tier progressive unlock ladder: Manager (MVP) → Manager+ (multi-user, automation, advanced reporting — mid/late 2026) → GSC (transport, catering, mobile housing — 2027) → Group/Network (Manager-of-Managers — 2027+). Includes anti-goals, cross-cutting themes (AI assistance, compliance automation, marketplace expansion), and dependencies. Explicitly NOT on any active roadmap. Audience: Adir (PM) and future engineering planning. **Category:** product spec (vision).

### docs/B2C_SPECS_MVP.md
The locked MVP feature set for B2C (Solo Operator — private owners with 1–5 properties), defined as 8 features: account creation/auth, property listing creation, property verification (Tier 1 + Tier 2), Yield Calculator, owner dashboard, inquiry intake (one-way for MVP), contract signing via Deal Room/HelloSign, and Pelecard payments. Establishes the "dual-path principle" (homepage offers equal-weight "find housing" / "publish property" CTAs). Target launch 15/5/2026. Audience: Dagan (lead developer) and Adir (PM). **Category:** product spec.

### docs/B2C_SPECS_DREAMS.md
The future-vision document for B2C, organised around 6 themes: Trust through Tier-3+ verification (paid on-site inspection), reputation & social proof (ratings/reviews), listing intelligence (AI-assisted listing, market comps), virtual experience (3D floor plans, live walkthroughs), B2C → B2B graduation (Solo upgrading to Manager), and owner financial tooling (cost tracking, automated payouts). Explicit anti-goals (no public reviews, no community features, no app for workers themselves). Audience: Adir (PM) and future engineering planning. **Category:** product spec (vision).

### docs/ONBOARDING_DAGAN.md
Day-1-to-Week-3+ onboarding guide for דגן (Dagan, lead developer), written in Hebrew. Covers the 60-second business intro, what is currently running in production (12 features), the stack (Next.js 16 / React 19 / Tailwind 4 / Supabase / HelloSign / Pelecard / Vercel), environments, branch flow, the 9 Iron Rules in summary, the known repo↔DB gaps, who-does-what across the team (Adir/Maki/Uzi/Maya/Alon), a Day-1-to-Week-3+ ramp plan, and operating limits ("don't change tailwind.config without updating brand/design-tokens.md"). Audience: Dagan specifically. **Category:** operational runbook.

### docs/_TEMPLATE_DREAMS.md
Skeleton template for creating new `[PERSONA / SYSTEM]_DREAMS.md` files: purpose, vision, themes/pillars, optional tier progression, anti-goals, dependencies, cross-references, "how to graduate to MVP" instructions, changelog. Audience: anyone authoring a new vision spec. **Category:** operational runbook (authoring template).

### docs/_TEMPLATE_MVP.md
Skeleton template for creating new `[PERSONA / SYSTEM]_MVP.md` files: purpose, out-of-scope, audience/persona, features (with acceptance criteria), cross-references, glossary terms used, changelog. Audience: anyone authoring a new MVP spec. **Category:** operational runbook (authoring template).

---

## Files mentioned in `docs/README.md` but NOT present in the folder

These are referenced as if they exist, but `find docs/` returns nothing for them:

- `BOOKING_SYSTEM_MVP.md` — referenced at `docs/README.md:40`
- `BOOKING_SYSTEM_DREAMS.md` — referenced at `docs/README.md:41`, `docs/B2B_SPECS_MVP.md:19`, `docs/B2C_SPECS_MVP.md:18`
- `VIRTUAL_TOUR_SPECS.md` — referenced at `docs/README.md:42`
- `PROJECT_SPECS.md` — referenced at `docs/README.md:50`, `docs/B2C_SPECS_MVP.md:17`

> Flagged in `10-open-questions.md`. The README's Layer-3 and Layer-4 tables are partially aspirational.
