# 09 — Hostel Booking Engine

Scope: every reference to `hostel_bookings`, the `hostel-` API route prefix, named hostel properties, and the architectural separation rules.

---

## Architectural separation rules (verbatim)

These are the verbatim hard-line rules that **must survive the rebuild**:

### IRON_RULE 1 — Schema isolation (corporate vs hostel)
Source: `docs/IRON_RULES.md:9-19`

> The corporate properties domain (`corporate_properties`, `corporate_workers`, `companies`, `profiles`) and the hostel booking domain (`hostel_bookings`) are **two separate products with two separate schemas**.
>
> - ✅ Hostel booking tables MUST keep the `hostel_*` prefix
> - ✅ Corporate housing tables stay in their existing names
> - ❌ NEVER mix data, foreign keys, or queries across the two domains
> - ❌ NEVER create a table that bridges them without explicit approval from Adir
>
> **Why:** They serve different audiences (tourists vs. construction corporations), use different pricing models (nightly vs. monthly), and have different regulatory requirements.

### Onboarding doc summary
Source: `docs/ONBOARDING_DAGAN.md:123` — "Schema isolation — corporate vs hostel = שני מוצרים, לא לערבב" ("two products, do not mix").

### Decisions log entry
Source: `docs/DECISIONS_LOG.md:203-214` — "Booking System (4 hostels) is Future, not MVP."

> **Context:** Original assumption: booking engine is part of MVP. Reality: code only has external links to FrontDeskMaster. Tables exist but unused (`hostel_bookings` = 0 rows).
> **Rationale:** No working code beyond the schema. FrontDeskMaster currently handles all hostel bookings via external links.

---

## Schema-level isolation enforcement (FK audit)

`hostel_bookings` has only **one** foreign key:

- `hostel_bookings.user_id → auth.users.id` — `baseline.sql:1252`

It has **no** FK to `properties`, `companies`, `corporate_properties`, `corporate_workers`, `owners`, `units`, `bookings`, `contracts`, `payments`, `deals`, or any other public-schema table.
The `hostel_id` is a `text` column constrained by CHECK `IN ('jerusalem', 'telaviv', 'haifa', 'tiberias')` (`baseline.sql:524-528`) — i.e., the hostels are NOT modeled as rows in another table; they are an enum-like text column inside `hostel_bookings` itself.

Net: the iron rule is enforced at the data model level. There is no bridging table.

---

## `hostel_bookings` table — full reference

### Schema (live, from `baseline.sql:507-535`)

| Column | Type | Default | Constraint |
|---|---|---|---|
| `id` | uuid | `gen_random_uuid()` | NOT NULL |
| `hostel_id` | text | — | NOT NULL, CHECK `IN ('jerusalem','telaviv','haifa','tiberias')` |
| `user_id` | uuid | — | nullable, FK → `auth.users.id` |
| `guest_name` | text | — | NOT NULL |
| `guest_email` | text | — | NOT NULL |
| `guest_phone` | text | — | NOT NULL |
| `company_name` | text | — | nullable |
| `company_id_number` | text | — | nullable |
| `check_in` | date | — | NOT NULL |
| `check_out` | date | — | NOT NULL |
| `num_workers` | integer | — | NOT NULL, CHECK `> 0` |
| `price_per_night` | numeric(10,2) | — | NOT NULL |
| `total_amount` | numeric(10,2) | — | NOT NULL |
| `status` | text | `'pending'` | NOT NULL, CHECK `IN ('pending','confirmed','cancelled','completed')` |
| `payment_status` | text | `'unpaid'` | NOT NULL, CHECK `IN ('unpaid','paid','refunded')` |
| `payment_id` | text | — | nullable |
| `stripe_session_id` | text | — | nullable — **flagged: contradicts IRON_RULE 2 (`08-integrations.md`)** |
| `notes` | text | — | nullable |
| `created_at` | timestamptz | `now()` | — |
| `updated_at` | timestamptz | `now()` | — |

### RLS policies on `hostel_bookings`

`ENABLE ROW LEVEL SECURITY` at `baseline.sql:1585`. Three policies:

1. `hostel_bookings_insert` — FOR INSERT, WITH CHECK `true` (`baseline.sql:1588`). Anyone (anon or authenticated) can create a booking. Matches the public booking-engine model.
2. `hostel_bookings_select_own` — FOR SELECT TO authenticated, USING `auth.uid() = user_id` (`baseline.sql:1592`). Authenticated users see only their own bookings.
3. `hostel_bookings_service` — TO service_role, USING `true` (`baseline.sql:1596`). Operations team / backend has full access.

> Note: the public-INSERT policy creates a real abuse surface (anyone can create a booking with arbitrary `total_amount`). The Pakal Nofesh-style payment integration must validate amounts server-side before honoring the booking.

### Live state
- `hostel_bookings` is a **live table with 0 rows** (per `docs/SCHEMA.md:53` — "Daily hostel booking records (Booking System future work)"). The schema exists; the engine is not in service.

---

## Named hostel properties

The four properties in production (per `hostel_id` enum CHECK constraint at `baseline.sql:524-528`):

| `hostel_id` value | Documented name | Source |
|---|---|---|
| `jerusalem` | "Cinema Hostel ירושלים" / "Cinema Hostel Jerusalem" | `brand/assets/mockups/AM_Hostels_Booking_System_v1.html:615-624` |
| `telaviv` | "Jungle Jaffa תל אביב" / "Jungle Jaffa Hostel" | `brand/assets/mockups/AM_Hostels_Booking_System_v1.html:647-654` |
| `haifa` | "Haifa Hostel" (Bayit Yafo / Ben Gurion 1, Haifa) | `brand/assets/mockups/AM_Hostels_Booking_System_v1.html:674-683` |
| `tiberias` | "Tiberias Hostel" / "AM Tiberias" | `brand/assets/mockups/AM_Hostels_Booking_System_v1.html:702-711`, `_v0.html:694-699` |

> The recon brief mentioned `Bayit-Yafo` as a named hostel; the legacy mockups describe **Haifa Hostel** as being **on Ben Gurion 1, in the German Colony** (`AM_Hostels_Booking_System_v1.html:683`) — the closest match. The string "Bayit-Yafo" itself does not appear in legacy docs.

> The newer mockup (`AM_Hostels_Booking_System.html:601-737`) uses `slug` values `jerusalem`, `tel-aviv`, `haifa`, `tiberias` — note the **dash variant `tel-aviv` vs the schema's `telaviv`**. The hostel mockup data uses 4 properties under the `AM HOSTELS` brand at `book.amhostels.co.il` (`AM_Hostels_Booking_System.html:876`).

> **Discrepancy:** the recon brief listed 6 hostels (Cinema, Zuzu, Jungle Jaffa, Haifa, Tiberias, Bayit-Yafo), but the schema only allows 4 (`jerusalem, telaviv, haifa, tiberias`) and the mockups depict 4. The names "Zuzu" and "Bayit-Yafo" do not appear anywhere in the legacy repo — flagged in `10-open-questions.md`.

---

## Hostel API routes

**No `hostel-` prefixed routes** are documented in the legacy repo's `docs/`. The hostel mockup uses hash-based SPA routing (`#/hostels/:slug`) inside a single static HTML file.

The two primary mockups:
- `brand/assets/mockups/AM_Hostels_Booking_System.html` (113KB, 2058 lines, current iteration) — single-file SPA, hash routes `#/`, `#/hostels/:slug`, etc.
- `brand/assets/mockups/AM_Hostels_Booking_System_v1.html` (109KB, 2031 lines, earlier iteration)

Per `brand/components.md:204` — the current mockup is "Reference (Future feature — see DECISIONS_LOG)" and v1 is "Archive (Keep for comparison)."

---

## Source files referenced

- Schema: `oz-marketplace-legacy/supabase/migrations/20260425000000_baseline.sql:507-535, 1252, 1585-1596`
- Schema (archived migrations): `_archive/016_hostel_bookings.sql:2-37`, `_archive/017_run_in_prod.sql:20-53`
- Iron rule: `docs/IRON_RULES.md:9-19`
- Onboarding doc: `docs/ONBOARDING_DAGAN.md:123`
- Decision: `docs/DECISIONS_LOG.md:203-214`
- Glossary: `docs/GLOSSARY.md:50` (Booking System), `docs/GLOSSARY.md:62-64` (Pakal Nofesh)
- Brand:
  - `docs/brand/components.md:204-205` (mockup index entries)
  - `docs/brand/README.md:38-39`
  - `docs/brand/assets/mockups/AM_Hostels_Booking_System.html` (entire file)
  - `docs/brand/assets/mockups/AM_Hostels_Booking_System_v1.html` (entire file)
- Other doc references: `docs/B2B_SPECS_MVP.md:19`, `docs/B2C_SPECS_MVP.md:18`, `docs/B2C_SPECS_MVP.md:234` (AM HOSTELS clearing account), `docs/README.md:40-41`
- Stripe-in-mockup payment flow: `AM_Hostels_Booking_System.html:425, 981, 1240, 1271-1285, 1632, 1783, 1948, 1988, ...` (23+ references; mockup-only)
- FDM (FrontDeskMaster) reconciliation column in mockup: `AM_Hostels_Booking_System.html:1466, 1505, 1780`

---

## Rebuild posture (summary)

1. **Keep `hostel_*` table prefix** — IRON_RULE 1 hard line.
2. **Do NOT model the rebuild's marketplace data with FK references to hostel data** — and vice versa.
3. **Hostel Booking Engine is not in MVP scope.** The schema may be carried over (or rebuilt cleanly) but no UI work is on the 15/5/2026 launch.
4. **Decide on `stripe_session_id`** — flagged in `10-open-questions.md`.
5. **Confirm canonical `hostel_id` values** — the schema currently only allows 4 values; product brief mentions 6.
6. **The mockups are illustrative**, not contracts. Per `brand/README.md:93-102`.
