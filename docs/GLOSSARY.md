# Glossary

**Audience:** Anyone working on oz-marketplace.
**Last updated:** 2026-05-02 (ported from `worker-housing-platform/docs/GLOSSARY.md` with the terminology fixes from BUILD_PLAN §3)

Terms used across oz-marketplace, in alphabetical order. When introducing a new term anywhere in `docs/`, add it here.

---

## Personas & roles

### admin
**Definition:** Internal operations / engineering. Highest access. One of the `user_role` enum values (BUILD_PLAN §3.B / OQ-3 + OQ-4).

### B2B
**Definition:** Business-to-business path. The user is a real estate management company that handles multiple properties professionally.
**See:** `specs/B2B_MVP.md`, `specs/dreams/B2B_DREAMS.md`
**Note:** B2B and B2C are **separate products** with separate dashboards, not progressive tiers.

### b2b_owner
**Definition:** Manager-class supplier — a real estate management company. One of the `user_role` enum values.

### B2C
**Definition:** Business-to-consumer path. The user is a private property owner managing 1–5 properties on their own.
**Persona name:** Solo Operator (or just "Solo")
**See:** `specs/B2C_MVP.md`, `specs/dreams/B2C_DREAMS.md`

### b2c_owner
**Definition:** Solo Operator — private property owner. The default role assigned to new signups by the persona-aware `handle_new_user()` trigger. One of the `user_role` enum values.

### corporate_member
**Definition:** Construction-corporation buyer (demand side). One of the `user_role` enum values.

### Demand side
**Definition:** Construction corporations who need housing for their foreign workers. They are the "buyers" on the platform — corporate users with KYC-verified company accounts.
**See:** `specs/DEMAND_SIDE.md`
**Distinct from:** Supply side (property owners — Solo + Manager + GSC).

### GSC — Ground Services Company
**Definition:** Full-service operator that bundles housing with transport, catering, and other services. Future B2B tier (post-Manager).
**See:** `specs/dreams/B2B_DREAMS.md`

### Group / Network
**Definition:** Highest B2B tier — Manager-of-Managers. A company that owns or oversees multiple Manager organisations. Furthest-out future.
**See:** `specs/dreams/B2B_DREAMS.md`

### Manager
**Definition:** Real estate management company. The B2B MVP persona. Manages 5+ properties professionally for corporate clients.
**See:** `specs/B2B_MVP.md`

### Solo Operator (Solo)
**Definition:** Private property owner. The B2C MVP persona. Owns 1–5 properties, manages alone.
**See:** `specs/B2C_MVP.md`

### Supply side
**Definition:** Property owners providing housing on the platform. Includes Solo (B2C), Manager (B2B MVP), GSC (B2B Future), Group (B2B Future+).

---

## Product concepts

### Booking System
**Definition:** Daily hostel booking engine for the 4 AM HOSTELS properties.
**Status:** Future, not MVP. See `specs/dreams/BOOKING_SYSTEM_DREAMS.md`.
**Distinct from:** B2B/B2C marketplace (monthly rentals).
**Schema isolation:** IRON_RULE 1 — `hostel_*` tables stay separate from corporate tables.

### Dual-path principle
**Definition:** The homepage offers two equal-weight CTAs from the start: "חפש דיור" (find housing — for corporations) and "פרסם נכס" (publish property — for owners). Visual weight, language, and entry funnels recognise and route the right persona.
**See:** `specs/B2C_MVP.md` and `specs/B2B_MVP.md`

### Pakal Nofesh
**Definition:** Sister project (`pakalnofesh.co.il`) — a marketplace for Israeli vacation experiences for IDF reservists. Built by Alon using the same stack (Next.js + Supabase + Vercel) and Pelecard payment integration. The implementation pattern that the oz-marketplace payment integration mirrors.
**See:** `IRON_RULES.md` Rule 2

### Bedrooms vs rooms (`חדרי שינה` vs `חדרים`)
**Definition:** In oz-marketplace, the listing form asks the owner how many **bedrooms** (`חדרי שינה`) the apartment has — **not** how many **rooms** (`חדרים`).
**Why this matters:** In Israeli real-estate vocabulary, a "4-room apartment" (`דירת 4 חדרים`) conventionally means 3 bedrooms + 1 living room. Counting "rooms" inflates the number and is ambiguous; counting "bedrooms" is unambiguous and matches the buyer's actual question (how many sleeping spaces can be configured?).
**Schema:** `listings.bedroom_count smallint` (nullable, per future migration). Hebrew label on the form: `מספר חדרי שינה`. Never `room_count` / `rooms` / `room_amount`.
**Related:** The living room is captured separately as a boolean amenity (`listings.has_living_room` — Hebrew label `סלון`), so an owner with a 3-bedroom + living room apartment marks `bedroom_count = 3` and `has_living_room = true`.
**See:** DECISIONS_LOG 2026-05-13 "Listing fields: bedrooms (not rooms) + four amenities"

### Fire-safe (property amenity)
**Status:** ⏸ **Deferred — not in MVP** (DECISIONS_LOG 2026-05-12). The amenity is defined here so the meaning is locked when it's introduced in a later iteration.
**Definition:** A property is "fire-safe" iff it has **both** a smoke/heat detector **and** a fire extinguisher. Both are required; neither alone qualifies.
**Future schema:** boolean column `has_fire_safety` on `listings`, default `false`, sitting alongside the existing extensible amenities (`has_kitchen`, `has_wifi`, `has_parking`).
**Hebrew label (future UI):** "בטיחות אש (גלאי עשן + מטף)".
**Why deferred:** fire-safety is a meaningful trust signal for foreign-worker housing (per `תקנות עובדים זרים`), but a self-reported boolean has limited value without a verification path — and verification is also deferred (DECISIONS_LOG 2026-05-12). Shipping together once both land.
**See:** DECISIONS_LOG 2026-05-12 "Fire-safety amenity: deferred, definition locked"

### Verification level (1 / 2 / 3)
**Status:** ⏸ **Deferred — not in MVP** (DECISIONS_LOG 2026-05-12). The full verification system, including all three levels, is post-MVP. The schema column and primitive remain in the codebase but no UI surfaces verification in the first launch.
**Definition (target design, for when verification work resumes):** A verification level is the trust grade of a property listing. Higher level = more verification = better marketplace placement and stronger trust signals to buyers. Stored as `listings.verification_level smallint` (1, 2, or 3).
**Levels:**
- **1** — Owner identity (ID document + selfie). Default. Hebrew badge: "פרטים מהבעלים".
- **2** — Level 1 + property documents (deed/lease) + photos verified by ops. Hebrew badge: "✓ מאומת מרחוק".
- **3** — Level 2 + physical inspection by field staff + full compliance check.
**MVP trust signals (replacing verification):** KYC on owner-company sign-up, HelloSign-signed lease contract, Pelecard-regulated payment rail.
**Naming alignment:** DB column `verification_level`; TS type `VerificationLevel`; component `<VerificationLevelBadge>`; SCSS module `VerificationLevelBadge.module.scss`. Replaces the legacy A/B/C "verification_tier" terminology.
**See:** BUILD_PLAN §3.D, §3.B (OQ-6); DECISIONS_LOG 2026-05-12

---

## Technical terms

### AI Import
**Definition:** Feature in the corporate dashboard that lets a Manager upload an Excel sheet, which is parsed by Anthropic Claude (Haiku) and imported as worker or property records.
**Provider:** Anthropic Claude (per CP-1 OQ-1).
**See:** `specs/B2B_MVP.md` (filled in Phase 4)

### BOM (Byte Order Mark)
**Definition:** UTF-8 byte order mark prepended to CSV exports to ensure Hebrew text renders correctly when opened in Excel. Without BOM, Hebrew shows as gibberish.

### HelloSign / Dropbox Sign
**Definition:** Third-party digital signature service used in the Deal Room flow. Both parties (owner + corporation) sign contracts via HelloSign emails; webhook updates `contracts.status`.

### KYC (Know Your Customer)
**Definition:** Identity & legitimacy verification flow.
- **For corporations:** company registration certificate, signatory ID, banking confirmation
- **For owners:** ID, property ownership proof (Tabu)
**Storage:** All KYC documents go in the `documents` table (NOT a separate `kyc_*` table).

### NotebookLM
**Definition:** Google's AI-powered notebook tool. The reports system can export markdown formatted for NotebookLM, allowing Managers to feed reports into AI for owner-facing summaries.

### owners (table)
**Definition:** Canonical name of the property-owner table. The legacy code referenced `property_owners` in some places — that name doesn't exist; `owners` is the table.
**See:** `DECISIONS_LOG.md` 2026-04-30 entry "`property_owners` is `owners`".

### Pelecard
**Definition:** Israeli payment processing company (35-year track record, BI-licensed). The chosen payment provider for oz-marketplace.
**Features used:** Online payment API, Link b'Click (payment links), recurring billing, daily settlement, open banking.
**See:** `IRON_RULES.md` Rule 2, `DECISIONS_LOG.md`

### RLS (Row Level Security)
**Definition:** Postgres feature used in Supabase to enforce data access at the row level (not just table level). Critical for multi-tenant isolation between companies.
**See:** `ROLES_AND_RLS.md` (filled in Phase 3)

### user_role enum
**Definition:** PostgreSQL enum type defining the four user roles in oz-marketplace: `b2c_owner`, `corporate_member`, `b2b_owner`, `admin`. Replaces the legacy 7-value `profiles.role` text column.
**See:** BUILD_PLAN §3.B (OQ-3 + OQ-4)

---

## Business concepts

### ח.פ.
**Definition:** "מספר חברה פרטית" — Israeli company registration number. Required for B2B KYC. Stored in `companies.registration_number`.

### ע.מ.
**Definition:** "עוסק מורשה" — Israeli sole proprietor / authorised dealer. Solo Operators may have an ע.מ. number; Managers usually have ח.פ.

### ארנונה (Arnona)
**Definition:** Israeli municipal property tax. Tracked as a property cost component for Yield Calculator and reports.

### תקנות עובדים זרים (Foreign Workers Regulations)
**Definition:** Israeli regulation governing housing standards for foreign workers. Key requirements: minimum 4m² per worker, ventilation, sanitary facilities (1:6 ratio), fire safety. Compliance is a core platform feature.

---

## Internal jargon

### Brand emoji
**Definition:** 🏗 — used as the Oz brand mark. Functional usage (in nav, hero, brand lockup), not decorative.

### CP-N
**Definition:** Checkpoint N. Each phase in PROMPT_LIBRARY ends in a checkpoint where the user reviews work before continuing. CP-1 = decisions locked (BUILD_PLAN). CP-2 = tokens + RTL + typography review (Phase 0). CP-3 = migration on staging (Phase 3).

### Iron Rule
**Definition:** Non-negotiable rules in `IRON_RULES.md`. There are 9. They override any other doc.

### MVP file vs Dreams file
**Definition:**
- **MVP** files describe what's being built now. Has acceptance criteria. Live in `specs/`.
- **Dreams** files describe future vision. Not on roadmap. Direction-setting. Live in `specs/dreams/`.

### OQ-N
**Definition:** Open question N from `recon/10-open-questions.md`. Many OQs are now resolved by CP-1 decisions in BUILD_PLAN §3 and `DECISIONS_LOG.md`.

### Verify before assuming
**Definition:** IRON_RULE 6. Don't trust migrations as proof a table exists. Always check `SCHEMA.md` or query the live DB.

---

## How to use this glossary

- **Reading:** When you see a term in a spec and don't know it, look here first.
- **Writing:** Don't introduce new jargon without adding an entry here.
- **Updating:** If a term changes meaning, update here AND log it in `DECISIONS_LOG.md`.

---

## Changelog

| Date | Change | By |
|---|---|---|
| 2026-04-30 | Initial glossary (in legacy repo) | Adir |
| 2026-05-02 | Ported to oz-marketplace; verification_tier A/B/C → verification_level 1/2/3; property_owners → owners; user_role enum entry added; CP-N and OQ-N entries added | Phase 0 |
| 2026-05-12 | Verification level entry marked deferred — verification system (all levels) out of MVP per DECISIONS_LOG 2026-05-12 | — |
| 2026-05-12 | Added "Fire-safe (property amenity)" entry — deferred from MVP, definition locked per DECISIONS_LOG 2026-05-12 | — |
| 2026-05-13 | Added "Bedrooms vs rooms" entry — locks `bedroom_count` (not `room_count`) and the Hebrew bedrooms/rooms distinction per DECISIONS_LOG 2026-05-13 | — |
