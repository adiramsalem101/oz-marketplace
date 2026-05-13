# Tasks

> **⚠️ UI rebuild in progress (2026-05-13):** the entire UI surface has been deleted from the repo. UI is being rebuilt fresh in **Claude Design**. This invalidates the "Done (last 30 days)" entries for Phase 1 / Phase 2 / Phase 4 visual rebuild / CP-4a / CP-4b (the code those entries describe no longer exists) and invalidates the UI-tied items in the "Polish backlog" section (verification pill removal, commission-rate copy flip, new-listing-fields UI). The schema / server / product decisions tied to those items are still valid and tracked in `DECISIONS_LOG.md` — the new UI built in Claude Design will need to honour them.

## Active phase
**Phase 4 — Marketplace + booking flow + hostels page** · Started: 2026-05-06 · Status: in progress (CP-4a + CP-4b complete; CP-4c next-up)

## Phase tracker
- [x] Phase 0 — Scaffold + token system + docs skeleton
- [x] Phase 1 — Primitives
- [x] Phase 2 — Layout & navigation
- [x] Phase 3 — Auth & RLS foundation
- [ ] Phase 4 — Marketplace + booking flow + hostels page
  - [x] CP-4a — Listings schema + RLS + owner-company management UI
  - [x] CP-4b — Public homepage + marketplace browse + listing detail + hostels page + booking-request submission
  - [ ] CP-4c — Pelecard + HelloSign + Resend + booking lifecycle end-to-end
- [ ] Phase 5 — Production readiness

## Next-up (within active phase)

### CP-4c — Pelecard + HelloSign + Resend + booking lifecycle

End-to-end booking flow from `requested` → `confirmed`. Owner accepts a booking → Pelecard Link b'Click URL generated → corporation pays → HelloSign signing request to both parties with the standardized lease → booking flips to `confirmed` on signed-by-both. Resend handles transactional email at every state transition.

**CP-4c prerequisites** (need to land before or during CP-4c — see `docs/INTEGRATIONS.md` for full env var list):

_External — need to acquire / configure:_
- [ ] **Pelecard test terminal credentials from Alon** — terminal number, API user, API password, sandbox URL
- [ ] **HelloSign account + standardized lease template uploaded** — standardized 12-month residential lease (Hozeh Shakir Bait Dirah) with OZ foreign-worker clauses; upload produces `HELLOSIGN_TEMPLATE_ID` for the booking flow per DECISIONS_LOG 2026-05-06
- [ ] **Resend account + verified sending domain**

_Env / config — fed by the acquisitions above:_
- [ ] **Pelecard** — `PELECARD_TERMINAL_NUMBER`, `PELECARD_API_USER`, `PELECARD_API_PASSWORD`, `PELECARD_ENV` (`test` in dev; `live` requires explicit Adir approval per IRON_RULE 2)
- [ ] **HelloSign** — `HELLOSIGN_CLIENT_ID`, `HELLOSIGN_WEBHOOK_SECRET`, `HELLOSIGN_TEMPLATE_ID` (the `HELLOSIGN_API_KEY` is already in `.env.local`)
- [ ] **Resend** — `RESEND_API_KEY`

**Implementation scope:**
- [ ] `lib/integrations/pelecard.ts` + `app/api/webhooks/pelecard/route.ts` — Link b'Click URL generation; webhook flips `bookings.status` to `paid` and stamps `paid_at` + `pelecard_transaction_id`
- [ ] `lib/integrations/hellosign.ts` + `app/api/webhooks/hellosign/route.ts` — on `paid`, send signature request to both parties with lease template pre-filled from booking + listing data; webhook flips status to `confirmed` and stamps `contract_signed_at`
- [ ] `lib/integrations/resend.ts` — transactional email at each state transition (`requested` → owner, `accepted` → corporation, `paid` → both, `confirmed` → both, `rejected`/`cancelled` → counterparty)
- [ ] Owner accept/reject server actions on existing booking rows (Pelecard URL generated on accept; total amount snapshot already lives on the row from CP-4b)
- [ ] Corporation bookings view at `/bookings/corporation` already exists from CP-4b — extend with payment CTA when `status = 'accepted'` and contract CTA when `status = 'paid'`
- [ ] Money flow A only for MVP: OZ takes full amount via Pelecard, withholds commission, manual settlement to owner (split-payment is `feature_flags.booking.split_payment = false`)

## Blocked

_None._ CP-4c prereq credentials are pending Adir / Alon but don't block scoping work (integration stubs + dev-only mocks can land first).

## Done (last 30 days)

- **2026-05-08 — Phase 4 visual rebuild** (post-CP-4b polish): rebuilt PublicNav (sticky white bar, brand+nav+actions RTL layout, ghost+orange CTA pair, mobile drawer with scroll lock); new dark-navy `Footer`; flat-white hero re-skinned to dark navy with orange accent on H1 second line; 2-col hero w/ `HostelsPanel` (2×2 colored cards on a subtle dark surface) replacing the standalone hostels strip; navy listings preview section; `ListingCard` with cover image + vacancy pill + verification pill; pilot banner thin amber strip between nav and hero; shared `@mixin container` (1280px max-width, `clamp(16px, 4vw, 32px)` gutter) used by PublicNav, Footer, and every public-page section so the right gutter aligns vertically down the page; `lib/supabase/service.ts` service-role client to aggregate booking occupancy for `available_beds` on listing cards.
- **2026-05-07 — CP-4b — Public homepage + marketplace browse + listing detail + hostels page + booking-request submission** (commit `8df8025` + visual rebuild above).
- **2026-05-06 — CP-4a — Listings schema + RLS + owner-company management UI** (commits `6eb96d1`, follow-ups `0d92f77`).
- **2026-05-06 — Phase 3 — Auth & RLS foundation** (commit `ead98c7`): three-method sign-in (Google, Twilio SMS OTP, email magic-link), three-persona sign-up picker, RLS policies on `profiles`, `proxy.ts` session refresh.
- **2026-05-06 — MVP scope re-lock** (commit `1c154ef`): 8-phase plan collapsed to 5 phases (B2B marketplace + hostels link-out only); deferred corporate dashboard, B2C product, native hostel booking engine, yield calculator, AI Import.
- **2026-05-04 — Phase 2 — Layout & navigation**: `AppShell`, `Sidebar`, `Topbar`, `NavLink`, `MobileDrawer`, `TenantSwitcher`, `UserWidget`, `BrandMark`, `Tabs`.
- **2026-05-04 — Phase 1 — Primitives**: `Button`, `Card`, `Pill`, `Chip`, `Icon`, `Avatar`, `Badge`, `Input`, `ProgressBar`, `VerificationLevelBadge`.
- **2026-05-02 — Phase 0 — Scaffold + token system + docs skeleton**: Next 16 + React 19 scaffold, SCSS token system, Hebrew RTL, fonts, icon sprite, `.env.example`, fresh `docs/`.

## Polish backlog (Phase 5)
- [ ] **Remove verification pill from `ListingCard`** (DECISIONS_LOG 2026-05-12). The Phase 4 visual rebuild shipped a verification pill overlay on listing cards; the verification system is now out of MVP. Drop the pill (vacancy pill stays); keep `VerificationLevelBadge` primitive in the codebase as dead code; keep the `listings.verification_level` column with default `1`. Also drop any remaining references to verification from the public homepage copy/FAQ ("נכסים שעברו ביקורת מסמכים נושאים תג אימות", "ביקורת פיזית ותג אימות — בקרוב") if still present.
- [ ] **Flip OZ commission rate from 5% to 3%** (DECISIONS_LOG 2026-05-12). Update `OZ_COMMISSION_RATE = 0.05` → `0.03` in `app/listings/[id]/BookingRequestForm.tsx`, and flip the three Hebrew copy strings: homepage hero terms line + homepage FAQ + booking-form summary row label.
- [ ] **Add listing fields: bedrooms + four amenities** (DECISIONS_LOG 2026-05-13). New migration on `listings`: add `bedroom_count smallint` (nullable), `has_living_room boolean NOT NULL DEFAULT false`, `has_bunk_beds boolean NOT NULL DEFAULT false`, `has_ac boolean NOT NULL DEFAULT false`, `has_gas_cooking boolean NOT NULL DEFAULT false`. Update `ListingForm.types.ts`, `ListingForm.tsx` (one numeric input `מספר חדרי שינה`, four amenity checkboxes `סלון` / `מיטות קומותיים` / `מזגן` / `כיריים גז`), and `owner/listings/[id]/page.tsx` initial-values mapping. Form prompt must say **bedrooms** (`חדרי שינה`), never **rooms** (`חדרים`).
- [ ] **Update homepage 4 m² copy to per-bedroom phrasing** (DECISIONS_LOG 2026-05-13). The shipped homepage still reads "מינימום 4 מ״ר לעובד", which is ambiguous. Update `app/page.tsx` legal callout (~line 118) to: `"כל מעסיק חייב לספק דיור העומד בתקנות: מינימום 4 מ״ר לכל מיטה בכל חדר שינה (חישוב לפי חדר, לא לפי ממוצע בנכס — חדר עם 3 מיטות חייב להיות לפחות 12 מ״ר), שירותים ומקלחות לפי יחס קבוע. אי עמידה בתקנות — עבירה פלילית."`. Update the homepage stats strip "4 מ״ר / לעובד — חוקי" to `"4 מ״ר / למיטה (לפי חדר שינה)"`. Same canonical phrasings in any future copy.
- [ ] Add alpha-aware color token helper. Currently several `rgb(... / opacity)` calls live in component SCSS (Pill `red-soft` tone; Input focus + invalid-focus rings; PublicNav greeting; HostelsPanel surface; listings-preview dark-context text; hero ghost-on-dark CTA override). Add a token helper or alpha map so these also flow through tokens.
- [ ] Owner sidebar `BrandMark` could opt into `showMark` for consistency with the public surface, once we agree on the lockup convention everywhere.
- [ ] `react-hooks/set-state-in-effect` is `eslint-disable`d on `PublicNavMobileMenu` for the App-Router pathname-close pattern. Revisit when React's `useEvent` (or a stable equivalent) lands.
- [ ] `<img>` → `next/image` on `TenantSwitcher` (pre-existing lint warning) and the listing detail gallery; configure `next.config.ts` `remotePatterns` for Supabase storage host.
- [ ] Footer link routes (`/legal/terms`, `/legal/privacy`, `/legal/code-of-ethics`) are placeholders — build the pages.
- [ ] Real Heebo/Assistant 500/700/800 weights — faux bold accepted for MVP (CP-1 OQ-20).

## Future-roadmap (post-MVP)
- [ ] **Hostels: convert link-out to embedded FDM component** (DECISIONS_LOG 2026-05-06)
- [ ] **Hostels: replace embedded FDM with own native booking engine** (or skip embed and go straight to native if engineering capacity allows)
- [ ] B2/B3 self-serve persona-picker — activate `owner_individual` self-serve when individual product launches
- [ ] Corporate dashboard (KPIs, AI Import, Excel reports, role-based corporate permissions, bulk worker upload)
- [ ] Yield calculator
- [ ] Ratings & reviews
- [ ] **Verification system — all levels** (1 self-reported, 2 remote attestation, 3 paid on-site inspection). Schema column `listings.verification_level` exists but unused in MVP; `VerificationLevelBadge` primitive shipped but not rendered. See DECISIONS_LOG 2026-05-12.
- [ ] **Fire-safety amenity** — add `listings.has_fire_safety boolean DEFAULT false` alongside existing amenities; surface as a filter on `/listings` and as a badge/pill on listing detail; Hebrew label "בטיחות אש (גלאי עשן + מטף)". Definition: property has smoke detector AND fire extinguisher. See DECISIONS_LOG 2026-05-12.
- [ ] Virtual tours
- [ ] Neema integration (OQ-15)
- [ ] Premium listing tiers / featured placement
- [ ] Pelecard split-payment to owner (currently `feature_flags.booking.split_payment = false`; manual settlement in MVP)
- [ ] Pelecard full embedded API (replaces Link b'Click)
- [ ] Other items from `docs/specs/dreams/`
