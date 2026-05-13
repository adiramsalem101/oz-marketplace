# B2B Dreams — future B2B vision

> **STATUS:** future-roadmap, not-MVP. See BUILD_PLAN §6 Phase 9.
>
> Vision direction for B2B beyond the Manager (single-user) MVP: multi-user team accounts, GSC tier (Ground Services Company — bundled transport/catering/services), Group/Network tier (Manager-of-Managers). Spec source: `worker-housing-platform/docs/B2B_SPECS_DREAMS.md`. Filled in (or kept as a thin pointer) only if Phase 9 work begins.

---

## Partial apartment leasing (per-bed pricing, multi-corp coexistence)

**Status:** Dream — out of MVP per DECISIONS_LOG 2026-05-13 ("MVP leasing model: full property only, binary availability").

**The dream:** the marketplace supports both whole-apartment leases (the MVP shape) and **partial** leases at per-bed granularity. Two construction corporations can share an apartment if neither needs the full bed inventory. Owner-companies can opt their listings into either model. Pricing, availability, and contracts all flex to match.

**Schema sketch (when the work begins):**

- `listings.monthly_rent` (whole-apartment rent, MVP) stays as the default. **Add** `listings.monthly_rent_per_bed integer` (nullable) so owners can opt in to per-bed pricing on a per-listing basis. If `monthly_rent_per_bed` is null, the listing is whole-apartment only. If both are set, the listing offers both models and the buyer chooses.
- `listings.allow_partial_lease boolean NOT NULL DEFAULT false` to flag the listing as accepting partial bookings.
- `bookings.worker_count smallint` — already exists, currently stamped from `listings.bed_count` per the MVP shape. In the dream, it becomes a real input: the corporation specifies how many beds it wants. Total = `worker_count × monthly_rent_per_bed × months + commission`.
- New table `bed_holds` (or per-`booking` bed allocation): tracks which beds in a listing are held by which booking for which date range, so two corps don't double-book the same bed.
- Availability stops being binary and becomes a fractional `available_beds / bed_count` derivation per date range, which the marketplace and listing-detail UI surface.

**UX implications:**

- Listing form: owner toggles "per-bed leasing allowed?", enters `monthly_rent_per_bed` if so.
- Booking form: the deleted-from-MVP "מספר עובדים" input comes back, defaulting to listing.bed_count for whole-apartment, smaller for partial.
- Listing card: availability pill returns to fractional (`3 / 8 פנויות`) or shows two pills (whole-rent vs per-bed-rent) where both models are offered.
- Listing detail: dual pricing display.

**Operational implications:**

- Contracts need a per-bed lease template alongside the standard whole-apartment lease (HelloSign template ID per env var).
- Payments need to be split or composed when two corps share an apartment.
- Conflict handling: what happens when a partial corp wants to grow into the whole apartment after a second partial corp is already in place?
- Per-bed inspection / verification implications when verification work resumes (DECISIONS_LOG 2026-05-12).

**Why this is right for "Dreams" and not MVP:**

- Whole-apartment is what almost all gush-dan pilot buyers actually take.
- Partial leasing introduces a coordination problem (two corps × one apartment) that's expensive to support before there's volume.
- The MVP-shape data model is a strict subset of the dream-shape, so adding partial leasing later doesn't require painful migrations — just additive columns and an opt-in flag.

**See:** DECISIONS_LOG 2026-05-13 "MVP leasing model: full property only, binary availability"; GLOSSARY "Full-property lease (MVP leasing model)".
