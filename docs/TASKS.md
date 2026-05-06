# Tasks

## Active phase
**Phase 0 — Scaffold + token system + docs skeleton** · Started: 2026-05-02 · Status: in progress

## Phase tracker
- [ ] Phase 0 — Scaffold + token system + docs skeleton
- [ ] CP-2 — Token + RTL + typography review
- [ ] Phase 1 — Primitives
- [ ] Phase 2 — Layout & navigation
- [ ] Phase 3 — Auth & RLS foundation
- [ ] CP-3 — Migration on staging
- [ ] Phase 4 — Corporate dashboard
- [ ] Phase 5 — Marketplace
- [ ] Phase 6 — Hostel booking engine
- [ ] Phase 7 — Integrations
- [ ] Phase 8 — Production readiness

## Next-up (within active phase)

## Blocked

## Done (last 30 days)

## Polish backlog (Phase 8)
- [ ] Add alpha-aware color token helper. Currently three `rgb(... / opacity)` calls live in primitive SCSS (Pill `red-soft` tone; Input focus + invalid-focus rings) because the token system doesn't yet encode "color X with Y% opacity". Add a token helper or alpha map so these also flow through tokens.

## Future-roadmap (post-MVP)
- [ ] **Hostels: convert link-out to embedded FDM component** (DECISIONS_LOG 2026-05-06)
- [ ] **Hostels: replace embedded FDM with own native booking engine** (or skip embed and go straight to native if engineering capacity allows)
- [ ] B2/B3 self-serve persona-picker — activate `owner_individual` self-serve when individual product launches
- [ ] Corporate dashboard (KPIs, AI Import, Excel reports, role-based corporate permissions, bulk worker upload)
- [ ] Yield calculator
- [ ] Ratings & reviews
- [ ] Tier-3 verification (paid on-site inspection)
- [ ] Virtual tours
- [ ] Neema integration (OQ-15)
- [ ] Premium listing tiers / featured placement
- [ ] Pelecard split-payment to owner (currently feature_flags.booking.split_payment = false; manual settlement in MVP)
- [ ] Pelecard full embedded API (replaces Link b'Click)
- [ ] Other items from docs/specs/dreams/
