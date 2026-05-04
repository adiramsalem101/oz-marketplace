# 06 — Legacy Schema (extracted from legacy repo)

Sources scanned:
- `../worker-housing-platform/oz-marketplace-legacy/supabase/migrations/20260425000000_baseline.sql` (3293 lines — the canonical live schema as of 2026-04-25, generated via `supabase db dump --schema public --schema storage`)
- `../worker-housing-platform/oz-marketplace-legacy/supabase/migrations/_archive/` (19 historical migrations 001-018, archived because the live DB drifted from them)
- `../worker-housing-platform/docs/` SQL fenced blocks: **none found** (zero ` ```sql ` blocks in any docs file)

> **Authoritative file:** the baseline (`20260425000000_baseline.sql`). The `_archive/README.md` (lines 1-22 of that README) explicitly states: *"the live schema was dumped via `supabase db dump` ... that baseline is now the single source of truth."* The 19 archived migrations are *historical reference only* and are NOT executed (the directory has a leading-underscore exclusion).

> **Migrations 013_payments and 018_rooms** were *superseded, not applied as written* — the live DB was reshaped through some other path. Treat the archive as describing intent only.

---

## CREATE TYPE — 6 enums, all in `public`

| Enum | Values | Source |
|---|---|---|
| `booking_status` | `inquiry, pending, confirmed, active, completed, cancelled, no_show` | `baseline.sql:40-49` |
| `cancellation_policy` | `flexible_15, moderate_30, strict_45, no_refund` | `baseline.sql:54-60` |
| `payment_status` | `pending, processing, completed, failed, refunded, disputed` | `baseline.sql:65-72` |
| `property_status` | `draft, pending_review, verified, active, suspended, archived` | `baseline.sql:78-85` |
| `user_role` | `owner, company, ops, admin` | `baseline.sql:91-96` |
| `verification_status` | (values not shown in scan tail; declared at line 102) | `baseline.sql:102` |

> Storage schema also defines: `storage.buckettype` (line 1972).

---

## CREATE TABLE — 25 tables in `public` schema

All `IF NOT EXISTS`. Every table is owned by `postgres` after creation. Provenance lines refer to the baseline file.

| # | Table | Created (line) | Purpose / notes |
|---|---|---:|---|
| 1 | `beds` | 260 | Individual bed records. Comment: "מיטות בודדות - יחידת המכירה והתמחור" |
| 2 | `bookings` | 278 | Marketplace bookings (companies ↔ properties). Has `bed_ids` JSONB, `price_per_bed_agorot`, `commission_agorot`, `cancellation_policy`. Comment: "הזמנות והסכמות בין תאגידים לבעלי נכסים" |
| 3 | `companies` | 310 | Corporate clients (demand side). Comment: "תאגידים ומעסיקי עובדים זרים - הצד הדורש" |
| 4 | `contract_signing_requests` | 333 | HelloSign signing request tracking |
| 5 | `contracts` | 354 | Signed contracts; has `webhook_events` JSONB, `payment_status` text |
| 6 | `corporate_leads` | 376 | Inbound corporate prospects |
| 7 | `corporate_properties` | 389 | Manager-tracked corporate properties (vs. marketplace `properties`). Has `arnona`, `landlord_*`, `material_terms`, `house_rules_uploaded`, `source ∈ {marketplace, external, ai_import, manual}`, `property_type ∈ {full, partial}`, `status ∈ {active, archive}` |
| 8 | `corporate_workers` | 434 | Workers tied to a corporate client (passport, visa_end, bed_number) |
| 9 | `deals` | 453 | Deal pipeline (legacy from earlier schema). Has `commission_rate` numeric default 5.0, `payment_status`, `status ∈ {inquiry, negotiation, contract, signed, paid, active, ended}` |
| 10 | `documents` | 472 | Generic file uploads (KYC docs live here). `type ∈ {ownership, kyc, video, contract}`, `status ∈ {pending, approved, rejected}` |
| 11 | `event_log` | 488 | System event log with `entity_type`, `event_type`, `event_data` JSONB, `user_role` enum. Comment: "רישום פעילות למטרות audit וביקורת" |
| 12 | `hostel_bookings` | 507 | **Daily hostel booking records** — `hostel_id ∈ {jerusalem, telaviv, haifa, tiberias}`, `num_workers`, `price_per_night`, `total_amount`, `payment_id`, **`stripe_session_id`** (column exists in live DB despite IRON_RULE 2 banning Stripe), `payment_status ∈ {unpaid, paid, refunded}`, `status ∈ {pending, confirmed, cancelled, completed}`. **Schema isolation rule applies — never cross-link to corporate tables.** |
| 13 | `listings` | 538 | B2C marketplace listings; `verification_tier ∈ {A, B, C}` (legacy A/B/C terminology — code TODO to migrate to T1/T2) |
| 14 | `maintenance_reports` | 555 | Property maintenance issues |
| 15 | `otp_sessions` | 572 | OTP via Twilio (Israeli +972 numbers) |
| 16 | `owner_leads` | 585 | Inbound owner prospects |
| 17 | `owners` | 598 | Property owner records (Solo/B2C path). Has `phone_verified`, `email_verified`, `identity_verified`, `last_login_at`. Comment: "בעלי דירות ומשכירים - הצד המספק במרקטפלייס" |
| 18 | `payments` | 622 | Payment records — `amount_agorot`, `commission_agorot`, `net_to_owner_agorot`, `external_transaction_id`. Comment: "תשלומים, עמלות והעברות כספים" |
| 19 | `profiles` | 645 | User profiles. **`role` text default `'admin_corporate'`** with check constraint allowing `{owner, corporate, ops, admin, admin_corporate, manager_property, field_staff}` (7 values, broader than the `user_role` enum's 4 values — divergence flagged in `10-open-questions.md`) |
| 20 | `properties` | 661 | Marketplace property records — `base_price_agorot`, `commission_rate` (default 0.03, max 0.5), `cancellation_policy` (default `moderate_30`), `verification_status` (enum), `multilingual_signage`, `has_fire_safety`, etc. Comment: "נכסי מגורים - יחידת ההשכרה הבסיסית" |
| 21 | `property_costs` | 711 | Per-property monthly cost breakdowns (`electricity, water, gas, property_tax, internet, maintenance, staff_loading, other`) |
| 22 | `property_media` | 731 | Photos/media for properties; `is_verification_video` boolean |
| 23 | `rooms` | 752 | Room records — `beds_count` 1-6, `room_size_sqm` ≥ `beds_count × min_space_per_person_sqm` (default 4.0 sqm/person) |
| 24 | `teams` | 769 | Team/multi-user records (B2B Phase 2) |
| 25 | `units` | 782 | Legacy units; `pricing_model ∈ {per_bed, global}`, `status ∈ {draft, pending_approval, approved, listed, archived}` |
| 26 | `verifications` | 808 | Verification flow with 9 boolean checks (min_space_per_person, max_people_per_room, beds_and_bedding, lockable_storage, kitchen_facilities, refrigerator, washing_machine, fire_safety, multilingual_signs) + `selfie_video_url`. Comment: "תהליכי אימות ועמידה בתקנות מגורים הולמים" |
| 27 | `workers` | 838 | Worker records (generic) — `room_number, floor_number, team_id` |

> Note: scan-rendered list shows 27 entries because `corporate_workers` and `workers` are distinct, and a few tables exist that the docs omit. The docs' `SCHEMA.md` lists ~27 tables total (7 active + ~20 empty); the schema has the same 27 tables with their physical structure as above.

### Tables in `storage` schema (Supabase Storage internals — do not touch)
| Table | Created | Purpose |
|---|---:|---|
| `storage.buckets` | 2873 | Bucket definitions |
| `storage.buckets_analytics` | 2895 | Analytics bucket variant |
| `storage.buckets_vectors` | 2909 | Vectors bucket variant |
| `storage.migrations` | 2920 | Storage migration tracking |
| `storage.objects` | 2931 | Stored objects (RLS for `contracts`, `profile-images`, `property-media`, `verification-videos` buckets) |
| `storage.s3_multipart_uploads` | 2954 | Multipart upload tracking |
| `storage.s3_multipart_uploads_parts` | 2971 | Multipart part rows |
| `storage.vector_indexes` | 2988 | Vector index metadata |

### Storage buckets in use (inferred from RLS policies on `storage.objects`)
- `contracts` (signed PDFs)
- `profile-images`
- `property-media`
- `verification-videos`

---

## CREATE FUNCTION — 7 functions in `public`

| # | Function | Returns | Lang / security | Source |
|---|---|---|---|---|
| 1 | `append_webhook_event(p_contract_id uuid, p_event jsonb)` | `void` | plpgsql, SECURITY DEFINER | `baseline.sql:115`. "Append HelloSign webhook event to contract.webhook_events JSONB array" |
| 2 | `check_file_size()` | `trigger` | plpgsql | `baseline.sql:133`. Per-bucket size caps: property-media 50MB, verification-videos 200MB, contracts 10MB, profile-images 5MB |
| 3 | `get_signed_url(bucket_name text, file_path text, expires_in int default 3600)` | `text` | sql, SECURITY DEFINER | `baseline.sql:160`. References hardcoded host `qibpjlmojuovakkzjpdd.supabase.co` (production project ID — do NOT carry over) |
| 4 | `handle_new_user()` | `trigger` | plpgsql, SECURITY DEFINER | `baseline.sql:179`. Auto-creates `companies` + `profiles` rows on `auth.users` insert. Sets `profiles.role = 'admin_corporate'` |
| 5 | `log_entity_changes()` | `trigger` | plpgsql | `baseline.sql:187`. Writes INSERT and status-change events to `event_log` |
| 6 | `rls_auto_enable()` | `event_trigger` | plpgsql, SECURITY DEFINER | `baseline.sql:211`. Auto-enables RLS on every new public-schema table |
| 7 | `update_updated_at()` | `trigger` | plpgsql | `baseline.sql:243`. Sets `NEW.updated_at = NOW()` |

> Storage schema also defines 14+ functions (lines 1982-2856): `allow_any_operation`, `allow_only_operation`, `can_insert_object`, `enforce_bucket_name_length`, `extension`, `filename`, `foldername`, `get_common_prefix`, `get_size_by_bucket`, `list_multipart_uploads_with_delimiter`, `list_objects_with_delimiter`, `operation`, `protect_delete`, `search`, `search_by_timestamp`, `search_v2`, `update_updated_at_column`. Standard Supabase Storage internals — do not modify.

---

## CREATE TRIGGER — 8 triggers in `public`

| Table | Trigger | When | Function | Source |
|---|---|---|---|---|
| `bookings` | `bookings_event_log` | AFTER INSERT OR UPDATE | `log_entity_changes()` | `baseline.sql:1135` |
| `bookings` | `bookings_updated_at` | BEFORE UPDATE | `update_updated_at()` | `baseline.sql:1139` |
| `companies` | `companies_updated_at` | BEFORE UPDATE | `update_updated_at()` | `baseline.sql:1143` |
| `owners` | `owners_updated_at` | BEFORE UPDATE | `update_updated_at()` | `baseline.sql:1147` |
| `payments` | `payments_event_log` | AFTER INSERT OR UPDATE | `log_entity_changes()` | `baseline.sql:1151` |
| `properties` | `properties_event_log` | AFTER INSERT OR UPDATE | `log_entity_changes()` | `baseline.sql:1155` |
| `properties` | `properties_updated_at` | BEFORE UPDATE | `update_updated_at()` | `baseline.sql:1159` |
| `verifications` | `verifications_updated_at` | BEFORE UPDATE | `update_updated_at()` | `baseline.sql:1163` |

> Storage schema triggers (lines 3077-3093): `enforce_bucket_name_length_trigger`, `protect_buckets_delete`, `protect_objects_delete`, `storage_file_size_check` (uses `public.check_file_size()` ← cross-schema), `update_objects_updated_at`. Standard Supabase Storage internals.

---

## CREATE POLICY — public-schema RLS policies (full inventory in 07-roles-and-rls.md)

Numbers below summarise; policy bodies are exhaustively listed in `07-roles-and-rls.md`.

- **Public schema:** 35+ policies across 18 tables, applying combinations of `auth.uid() = id`, `auth.uid() = user_id`, `company_id IN (SELECT companies.id WHERE user_id = auth.uid())`, and `service_role` overrides.
- **Storage schema:** 9 policies on `storage.objects` for the buckets `contracts`, `profile-images`, `property-media`, `verification-videos` (lines 3131-3209).

`ALTER TABLE ... ENABLE ROW LEVEL SECURITY` is applied to every public-schema table (lines 1495-1698) and every storage table.

---

## ALTER TABLE — Foreign keys, primary keys, unique constraints

The baseline declares **constraint-only ALTER TABLE statements** in two blocks:
1. `baseline.sql:860-1030` — primary keys, unique constraints (`ALTER TABLE ONLY "public"."<t>" ADD CONSTRAINT ..._pkey PRIMARY KEY ...`).
2. `baseline.sql:1167-1352` — foreign keys (`ALTER TABLE ONLY "public"."<t>" ADD CONSTRAINT ..._fkey FOREIGN KEY ... REFERENCES ...`).

Foreign-key topology (extracted from the FK block — names indicate target):

| From → To | FK count |
|---|---:|
| `beds.room_id → rooms.id` | 1 |
| `bookings.{property_id, company_id} → properties.id, companies.id` | 2 |
| `companies.user_id → auth.users.id` | 1 |
| `contract_signing_requests.{company_id, property_id} → companies.id, properties.id` | 2 |
| `contracts.{booking_id, property_id} → bookings.id, properties.id` | 2 |
| `corporate_properties.company_id → companies.id` | 1 |
| `corporate_workers.{company_id, property_id} → companies.id, corporate_properties.id` | 2 |
| `deals.{unit_id, landlord_id, corporate_id} → units.id, owners.id, companies.id` | 3 |
| `documents.{unit_id, owner_id} → units.id, owners.id` | 2 |
| `event_log.user_id → auth.users.id` | 1 |
| `hostel_bookings.user_id → auth.users.id` | 1 |
| `listings.unit_id → units.id` | 1 |
| `maintenance_reports.{property_id, reported_by} → properties.id, profiles.id` | 2 |
| `owners.user_id → auth.users.id` | 1 |
| `payments.booking_id → bookings.id` | 1 |
| `profiles.{id, company_id} → auth.users.id, companies.id` | 2 |
| `properties.{owner_id, verified_by, company_id} → owners.id, profiles.id, companies.id` | 3 |
| `property_costs.property_id → properties.id` | 1 |
| `property_media.property_id → properties.id` | 1 |
| `rooms.property_id → properties.id` | 1 |
| `teams.property_id → properties.id` | 1 |
| `units.{owner_id, approved_by} → owners.id, profiles.id` | 2 |
| `verifications.{property_id, verified_by} → properties.id, profiles.id` | 2 |
| `workers.{company_id, property_id} → companies.id, properties.id` | 2 |

**Hostel boundary check:** `hostel_bookings` has only one FK — `user_id → auth.users.id`. No FK to `properties`, `companies`, `corporate_*`, `owners`, `units`, `bookings`. **Iron Rule 1 (schema isolation) is enforced at the FK level.** Captured in `09-hostel-booking-engine.md`.

---

## SQL fenced blocks in `docs/`

**None found.** The 13 markdown docs and the brand HTML/CSS/JSX files do not contain any ```sql``` fenced blocks. All SQL provenance is the migrations directory above.

---

## Key drift / divergence vs. the docs/SCHEMA.md narrative

- `docs/SCHEMA.md:74-77` lists **`property_documents`, `monthly_rentals`, `property_owners`, `property_marketplace_settings`** as "referenced but NOT live." The baseline confirms: none of these four tables exist in the live schema (which is why the `_archive/007_property_documents.sql` migration's CREATE was never reflected in the live DB).
- `docs/SCHEMA.md:33` lists `owners` (singular) as live — confirmed at `baseline.sql:598`. The "code references `property_owners`" bug is real — code change required.
- `docs/SCHEMA.md:31` lists `properties` (1 row) as live — confirmed at `baseline.sql:661`.
- The live `profiles.role` default is **`'admin_corporate'`** (`baseline.sql:648`) but the docs imply role assignment via Iron Rule 6 / SCHEMA.md narrative does not state a default. Worth confirming in the rebuild.
- `hostel_bookings.stripe_session_id` exists in the live schema (`baseline.sql:524`) — direct contradiction with IRON_RULE 2 ("NO Stripe in production"). This column was added by archived migration `016_hostel_bookings.sql` and `017_run_in_prod.sql` and persisted into the baseline. Flagged in `10-open-questions.md`.
