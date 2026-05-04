# Hostel Booking Engine

The isolated booking engine for the four AM HOSTELS properties. Architecturally separate from the corporate / B2C marketplace — see IRON_RULE 1 below.

> **Status:** scaffolded in Phase 6; the full UI is Phase 9 (future-roadmap) per `DECISIONS_LOG.md` "Hostel Booking Engine (4 hostels) is Future, not MVP".

Source: `recon/09-hostel-booking-engine.md`, with the kebab-case slug fix from BUILD_PLAN §3.B (OQ-17) applied throughout.

---

## Architectural separation rules (verbatim from IRON_RULE 1)

> The corporate properties domain (`corporate_properties`, `corporate_workers`, `companies`, `profiles`) and the hostel booking domain (`hostel_bookings`) are **two separate products with two separate schemas**.
>
> - ✅ Hostel booking tables MUST keep the `hostel_*` prefix
> - ✅ Corporate housing tables stay in their existing names
> - ❌ NEVER mix data, foreign keys, or queries across the two domains
> - ❌ NEVER create a table that bridges them without explicit approval from Adir
>
> **Why:** They serve different audiences (tourists vs. construction corporations), use different pricing models (nightly vs. monthly), and have different regulatory requirements.

---

## The four hostels

Per CP-1 OQ-16 and OQ-17, the canonical `hostel_id` slugs are kebab-case:

| `hostel_id` slug | Property |
|---|---|
| `jerusalem` | Cinema Hostel ירושלים / Cinema Hostel Jerusalem |
| `tel-aviv` | Jungle Jaffa תל אביב / Jungle Jaffa Hostel |
| `haifa` | Haifa Hostel (Ben Gurion 1, German Colony) |
| `tiberias` | Tiberias Hostel / AM Tiberias |

The DB CHECK constraint is updated to allow these four kebab-case values exactly. `telaviv` (no separator, the legacy variant) is **not** valid.

---

## `hostel_bookings` schema (target — Phase 6)

The legacy schema is captured in `recon/09-hostel-booking-engine.md`. The Phase 6 migration replicates it with three changes from CP-1:

1. **Drop `stripe_session_id`** (OQ-2 — IRON_RULE 2 bans Stripe; the column was a hostel-pilot artifact).
2. **All hostel_id values use kebab-case** (OQ-17 — see CHECK constraint).
3. **Drop any other dead/unused columns** (OQ-2 — the rebuild does not carry over dead schema).

The full target column list is finalised when the Phase 6 prompt is authored.

---

## RLS posture (target — Phase 6)

The legacy posture (three policies on `hostel_bookings`) is:

1. `hostel_bookings_insert` — FOR INSERT, WITH CHECK `true` (anyone, anon or authenticated, can create a booking — matches the public booking-engine model).
2. `hostel_bookings_select_own` — FOR SELECT TO authenticated, USING `auth.uid() = user_id`.
3. `hostel_bookings_service` — TO service_role, USING `true`.

The new policies follow the same shape. The public-INSERT policy is a real abuse surface (anyone can post arbitrary `total_amount` values); Pelecard server-side amount validation is mandatory before any booking is honoured.

---

## FK isolation enforcement

`hostel_bookings.user_id → auth.users.id` is the **only** FK. There are zero FKs from `hostel_bookings` (or any future `hostel_*` table) to `properties`, `companies`, `corporate_properties`, `corporate_workers`, `owners`, `units`, `bookings`, `contracts`, `payments`, `deals`. The schema enforces IRON_RULE 1 at the data-model level.

---

## What lives in this repo (Phase 6 onward)

- `supabase/migrations/<timestamp>_hostel_bookings.sql` — the isolated `hostel_*` schema migration.
- `app/(hostels)/` — the future hostel-facing pages (UI scope is Phase 9).
- `lib/integrations/pelecard.ts` — server-side Pelecard wiring; reused by both the marketplace and the hostel engine.
- `lib/integrations/frontdeskmaster.ts` — only if we end up syncing reservations during the FrontDeskMaster coexistence window.

---

## Reference mockups (legacy, illustrative not authoritative)

- `recon/brand/mockups/03-hostels.md` — the verbatim dump of `AM_Hostels_Booking_System.html` (current iteration) and `AM_Hostels_Booking_System_v1.html` (earlier iteration).
- These are *illustrative*. The shipped UI follows the spec, not the mockup.
