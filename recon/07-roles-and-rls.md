# 07 — Roles & RLS

Sources: legacy schema baseline (`oz-marketplace-legacy/supabase/migrations/20260425000000_baseline.sql`) + legacy docs (`docs/IRON_RULES.md`, `docs/ONBOARDING_DAGAN.md`, `docs/B2B_SPECS_MVP.md`, `docs/SCHEMA.md`, `_archive/006_role_based_rls.sql`).

---

## Roles in use

### 1. `public.user_role` enum (4 values — narrow)
- Values: `owner, company, ops, admin`
- Source: `baseline.sql:91-96`
- **Where used:** `event_log.user_role` column (audit trail).

### 2. `profiles.role` text column (7 values — broad)
- Default: **`'admin_corporate'`**
- Allowed (CHECK constraint): `owner, corporate, ops, admin, admin_corporate, manager_property, field_staff`
- Source: `baseline.sql:646-654`
- **Where used:** RLS policies on `units`, `listings`, `deals` (via `EXISTS (... profiles.role = 'ops' OR 'admin' ...)`); also targeted by `_archive/006_role_based_rls.sql` for the 3-tier admin_corporate / manager_property / field_staff hierarchy.

### 3. JWT claim `role` (Postgres-level)
- Tested via `current_setting('request.jwt.claims', true)::json ->> 'role'`.
- Special value: `'service_role'`.
- Source: `baseline.sql:1407` — `Service can insert profiles` policy.

### 4. `auth.users.raw_app_meta_data ->> 'role'`
- Tested as `('ops', 'admin')` in many access policies.
- Source: `baseline.sql:1503-1504` (in `beds_access`), and repeated across `bookings_access`, `contracts_access`, `event_log_access`, `media_access`, `owners_see_own_properties`, `payments_access`, `rooms_access`, `verifications_access`. **Same `ops/admin` set.**

### Doc-level role names referenced (descriptive — may or may not match DB)
- **`admin_corporate`** — `IRON_RULES.md` and migration 006 — top-tier role inside a company tenant.
- **`manager_property`** — migration 006, profiles CHECK constraint — middle-tier per-property manager.
- **`field_staff`** — migration 006, profiles CHECK constraint — limited per-worker access.
- **B2B Persona names** (Manager / GSC / Group / Solo) — these are *product personas*, not DB roles.

> **Divergence flagged in `10-open-questions.md`:** the `user_role` enum (4 values) and the `profiles.role` text column (7 values) describe overlapping but non-identical role sets. The rebuild needs a single source of truth.

---

## RLS — public schema (every table has RLS enabled)

The list below maps each table → its `ENABLE ROW LEVEL SECURITY` line plus every `CREATE POLICY` attached to it. Policy bodies are quoted (compacted whitespace) with file:line provenance.

### `beds`
- ENABLE: `baseline.sql:1495`
- `beds_access` (`baseline.sql:1498`):
  - USING: `room_id IN (SELECT r.id FROM rooms r JOIN properties p ON r.property_id = p.id WHERE p.owner_id IN (SELECT owners.id FROM owners WHERE user_id = auth.uid()) OR EXISTS(SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_app_meta_data->>'role' IN ('ops','admin')))`
  - **Effect:** owner of the property OR ops/admin can access beds.

### `bookings`
- ENABLE: `baseline.sql:1509`
- `bookings_access` (`baseline.sql:1512`):
  - USING: `property_id IN (... where owner = me) OR company_id IN (... where user = me) OR EXISTS(... ops/admin)`
  - **Effect:** owner-of-property OR company-on-booking OR ops/admin.

### `companies`
- ENABLE: `baseline.sql:1524`
- `companies_own_data` (`baseline.sql:1527`):
  - USING: `auth.uid() = user_id`
- `Users can create company` (`baseline.sql:1411`):
  - FOR INSERT, WITH CHECK: `true` (anyone authenticated can create)

### `contract_signing_requests`
- ENABLE: `baseline.sql:1537`
- `Users see own company contracts` (`baseline.sql:1455`):
  - FOR SELECT, USING: `company_id IN (SELECT id FROM companies WHERE user_id = auth.uid()) OR company_id IN (SELECT company_id FROM profiles WHERE id = auth.uid())`
- `corp users see own requests` (`baseline.sql:1557`):
  - USING: `(auth.uid())::text = property_owner_id`

### `contracts`
- ENABLE: `baseline.sql:1540`
- `contracts_access` (`baseline.sql:1543`):
  - USING: `booking_id IN (... where booking.property owner=me OR booking.company user=me OR ops/admin)`

### `corporate_leads`
- ENABLE: `baseline.sql:1561`
- `Anyone can insert corporate_leads` (`baseline.sql:1361`):
  - FOR INSERT, WITH CHECK: `true` (public lead capture)

### `corporate_properties`
- ENABLE: `baseline.sql:1564`
- 4 policies (`baseline.sql:1423, 1439, 1463, 1479`):
  - SELECT, INSERT, UPDATE, DELETE — all USING/CHECK the same shape: `company_id IN (SELECT id FROM companies WHERE user_id = auth.uid()) OR company_id IN (SELECT company_id FROM profiles WHERE id = auth.uid())`
  - **Effect:** owner-of-company OR profile-linked-to-company can CRUD their own corporate properties.

### `corporate_workers`
- ENABLE: `baseline.sql:1567`
- 4 policies (`baseline.sql:1431, 1447, 1471, 1487`): same shape as `corporate_properties` — SELECT, INSERT, UPDATE, DELETE scoped to own company.

### `deals`
- ENABLE: `baseline.sql:1570`
- `Corporates can create deals` (`baseline.sql:1369`): INSERT, WITH CHECK `auth.uid() = corporate_id`
- `Corporates see own deals` (`baseline.sql:1373`): SELECT, USING `auth.uid() = corporate_id`
- `Landlords see own deals` (`baseline.sql:1377`): SELECT, USING `auth.uid() = landlord_id`
- `Ops manage all deals` (`baseline.sql:1397`): USING `EXISTS (... profiles.role IN ('ops','admin'))`

### `documents`
- ENABLE: `baseline.sql:1573` — **no policy attached** in the public-schema policy block. RLS-on-without-policy = nobody can read/write directly. Effective access only via service_role or in joins.

### `event_log`
- ENABLE: `baseline.sql:1576`
- `event_log_access` (`baseline.sql:1579`): SELECT, USING `user_id = auth.uid() OR EXISTS (... ops/admin)`

### `hostel_bookings` (isolated domain — see 09-hostel-booking-engine.md)
- ENABLE: `baseline.sql:1585`
- `hostel_bookings_insert` (`baseline.sql:1588`): INSERT, WITH CHECK `true` (open inserts — anyone can create a hostel booking; matches the public booking-engine model)
- `hostel_bookings_select_own` (`baseline.sql:1592`): SELECT TO authenticated, USING `auth.uid() = user_id`
- `hostel_bookings_service` (`baseline.sql:1596`): TO service_role, USING `true`

### `listings`
- ENABLE: `baseline.sql:1600`
- `Active listings are public` (`baseline.sql:1357`): FOR SELECT, USING `is_active = true`
- `Ops can manage listings` (`baseline.sql:1391`): USING `EXISTS (... profiles.role IN ('ops','admin'))`

### `maintenance_reports`
- ENABLE: `baseline.sql:1603` — **no policy attached** in the public-schema block. RLS-on-without-policy.

### `otp_sessions`
- ENABLE: `baseline.sql:1616` — **no policy attached** publicly. Service role only.

### `owner_leads`
- ENABLE: `baseline.sql:1619`
- `Anyone can insert owner_leads` (`baseline.sql:1365`): FOR INSERT, WITH CHECK `true`

### `owners`
- ENABLE: `baseline.sql:1622`
- `owners_own_data` (`baseline.sql:1625`): USING `auth.uid() = user_id`

### `payments`
- ENABLE: `baseline.sql:1637`
- `payments_access` (`baseline.sql:1640`): USING `booking_id IN (... where booking.property owner=me OR booking.company user=me OR ops/admin)`

### `profiles`
- ENABLE: `baseline.sql:1654`
- `Users can view own profile` (`baseline.sql:1419`): FOR SELECT, USING `auth.uid() = id`
- `Users can update own profile` (`baseline.sql:1415`): FOR UPDATE, USING `auth.uid() = id`
- `Service can insert profiles` (`baseline.sql:1407`): FOR INSERT, WITH CHECK `auth.uid() = id OR JWT.role = 'service_role'`

### `properties`
- ENABLE: `baseline.sql:1657`
- `companies_see_active_properties` (`baseline.sql:1531`): FOR SELECT, USING `status = 'active'::property_status AND EXISTS (SELECT 1 FROM companies WHERE user_id = auth.uid())`
- `owners_see_own_properties` (`baseline.sql:1629`): USING `owner_id IN (SELECT id FROM owners WHERE user_id = auth.uid()) OR EXISTS (... ops/admin)`

### `property_costs`
- ENABLE: `baseline.sql:1660` — **no policy attached** in the public block.

### `property_media`
- ENABLE: `baseline.sql:1663`
- `media_access` (`baseline.sql:1606`): USING `property_id IN (... owner=me OR ops/admin)`

### `rooms`
- ENABLE: `baseline.sql:1666`
- `rooms_access` (`baseline.sql:1669`): USING `property_id IN (... owner=me OR ops/admin)`

### `teams`
- ENABLE: `baseline.sql:1679` — **no policy attached** in the public block.

### `units` (legacy)
- ENABLE: `baseline.sql:1682`
- `Owners can CRUD own units` (`baseline.sql:1403`): USING `auth.uid() = owner_id`
- `Listed units are public` (`baseline.sql:1381`): FOR SELECT, USING `status = 'listed'`
- `Ops can manage all units` (`baseline.sql:1385`): USING `EXISTS (... profiles.role IN ('ops','admin'))`

### `verifications`
- ENABLE: `baseline.sql:1685`
- `verifications_access` (`baseline.sql:1688`): USING `property_id IN (... owner=me OR ops/admin)`

### `workers` (generic)
- ENABLE: `baseline.sql:1698` — **no policy attached** in the public block.

---

## RLS — `storage.objects` (per-bucket)

ENABLE on `storage.objects`: `baseline.sql:3153`. Per-bucket policies follow the convention "first folder name == auth.uid()".

### Bucket: `contracts`
- `contracts_upload` (`baseline.sql:3131`): FOR INSERT, WITH CHECK `bucket_id='contracts' AND EXISTS(...)` (validation logic in policy body — likely company membership check; full body trimmed in scan).
- `contracts_view` (`baseline.sql:3137`): FOR SELECT — same access shape.

### Bucket: `profile-images`
- `profile_images_upload` (`baseline.sql:3156`): FOR INSERT, WITH CHECK `bucket_id='profile-images' AND auth.uid()::text = storage.foldername(name)[1]`
- `profile_images_view` (`baseline.sql:3160`): FOR SELECT, USING `bucket_id='profile-images' AND (auth.uid()::text = foldername[1] OR EXISTS(... ops/admin))`

### Bucket: `property-media`
- `property_media_delete` (`baseline.sql:3166`): FOR DELETE, USING `bucket_id='property-media' AND (auth.uid()::text = foldername[1] OR EXISTS(... ops/admin))`
- `property_media_upload` (`baseline.sql:3172`): FOR INSERT, WITH CHECK `bucket_id='property-media' AND auth.uid()::text = foldername[1] AND EXISTS(...)` (likely ownership check)
- `property_media_view` (`baseline.sql:3178`): FOR SELECT, USING `bucket_id='property-media' AND (auth.uid()::text = foldername[1] OR EXISTS(... ops/admin))`

### Bucket: `verification-videos`
- `verification_videos_delete` (`baseline.sql:3197`): FOR DELETE — same pattern as property-media.
- `verification_videos_upload` (`baseline.sql:3203`): FOR INSERT — same pattern.
- `verification_videos_view` (`baseline.sql:3209`): FOR SELECT — same pattern.

### Other storage tables
- `storage.buckets`, `storage.buckets_analytics`, `storage.buckets_vectors`, `storage.migrations`, `storage.s3_multipart_uploads`, `storage.s3_multipart_uploads_parts`, `storage.vector_indexes` all have RLS enabled with no policies attached publicly (admin/service-role only).

---

## Auth flow descriptions (extracted from docs + code)

### Supabase Auth + Google OAuth + Twilio OTP
- **Source:** `docs/ONBOARDING_DAGAN.md:80`, `docs/B2C_SPECS_MVP.md:67-77`, `docs/B2B_SPECS_MVP.md:59`.
- **Flow (B2C / Solo Operator):** homepage → "פרסם נכס" → "אני בעל פרטי" → Google OAuth OR email + Twilio OTP → `profiles` row created with `role = 'owner'` → first-time users → `/register/owner/verification`; returning users → `/dashboard/owner`. Acceptance criterion: **OTP must work for Israeli mobile numbers (+972...)**.
- **Flow (B2B / Manager):** homepage → "פרסם נכס" → "אני חברת ניהול" → Google OAuth or email+OTP → KYC onboarding → `companies.company_verified = true` after 48h ops review → full dashboard.
- **Auto-creation on signup** (DB trigger): `handle_new_user()` (`baseline.sql:179`) auto-inserts a `companies` row + a `profiles` row with default `role = 'admin_corporate'` whenever a new `auth.users` row is created. **Note:** this contradicts the B2C flow where role should be `owner` — the trigger always sets `admin_corporate`. The B2C app code therefore has to UPDATE the role after signup. Flagged in `10-open-questions.md`.

### Service-role escapes
- Several policies allow JWT-claim `role = 'service_role'` to bypass restrictions (e.g., `Service can insert profiles` at `baseline.sql:1407`, `hostel_bookings_service` at `baseline.sql:1596`).
- `_archive/010_rls_full_policies.sql` adds `Service role full access` policies on `otp_sessions`, `contracts`, `contract_signing_requests`, `properties`, `workers`. **Whether these were applied to live DB is uncertain** — the public-schema policy block of the baseline does NOT include them. Likely dead code.

### OTP session lifecycle
- `otp_sessions` has columns `phone_number, otp_code, expires_at, attempts`. RLS is on but no public policy — the OTP send/verify endpoints (Edge Functions or Next.js API routes — `/api/auth/send-otp`, `/api/auth/verify-otp`, per `docs/B2C_SPECS_MVP.md:83`) must use service-role.

---

## Cross-cutting patterns (distilled for the rebuild)

1. **Tenant isolation pattern (used 8+ times):**
   `<resource>.company_id IN (SELECT companies.id FROM companies WHERE user_id = auth.uid()) OR <resource>.company_id IN (SELECT profiles.company_id FROM profiles WHERE id = auth.uid())`
   This handles both ownership-by-creator and team membership.
2. **Owner isolation pattern (used 6+ times):**
   `<resource>.owner_id IN (SELECT owners.id FROM owners WHERE user_id = auth.uid()) OR EXISTS (... ops/admin)`
3. **Public-read pattern (rare):** `Active listings are public`, `Listed units are public` — read-only when published.
4. **Open-insert pattern:** `corporate_leads`, `owner_leads`, `companies`, `hostel_bookings` — anyone can INSERT (lead capture / public booking).
5. **RLS-on-no-policy = locked**: `documents`, `maintenance_reports`, `otp_sessions`, `property_costs`, `teams`, `workers` — currently inaccessible to non-service-role. Decision needed in rebuild.
