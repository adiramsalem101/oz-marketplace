# IRON RULES — חוקי ברזל

**Authoritative — these rules govern all phases of oz-marketplace.**

**Audience:** Anyone touching the project.
**Status:** Non-negotiable.
**Last updated:** 2026-04-30 (ported verbatim from `worker-housing-platform/docs/IRON_RULES.md`)

---

## Rule 1 — Schema isolation (corporate vs hostel)

The corporate properties domain (`corporate_properties`, `corporate_workers`, `companies`, `profiles`) and the hostel booking domain (`hostel_bookings`) are **two separate products with two separate schemas**.

- ✅ Hostel booking tables MUST keep the `hostel_*` prefix
- ✅ Corporate housing tables stay in their existing names
- ❌ NEVER mix data, foreign keys, or queries across the two domains
- ❌ NEVER create a table that bridges them without explicit approval from Adir

> **Why:** They serve different audiences (tourists vs. construction corporations), use different pricing models (nightly vs. monthly), and have different regulatory requirements.

---

## Rule 2 — Payment provider lock

**Pelecard is the payment provider.** Implementation by Alon, mirroring the Pakal Nofesh (`pakalnofesh.co.il`) pattern.

- ❌ NO Stripe in production (CSP headers exist, but no live Stripe code)
- ❌ NO Meshulam (the legacy `payment-provider-analysis.md` from 22/3 recommended Meshulam, but the decision moved to Pelecard for business continuity reasons)
- ✅ Existing AM HOSTELS clearing accounts will be reused
- ✅ Test mode in development; live mode only after Adir's explicit approval

> **Why:** Existing relationships, lower fees vs Stripe, Hebrew support, Israeli regulatory compliance.

---

## Rule 3 — DB changes require approval

Any schema migration, RLS change, or new table creation requires:

1. Written proposal (the migration SQL + a 2-line rationale)
2. Approval from **both** Adir (product) AND Maki (engineering)
3. Migration applied to staging FIRST, never directly to production

> **Why:** The DB has real customer data. Mistakes are not recoverable.

---

## Rule 4 — Branch flow

```
feature branch  →  staging  →  Adir approval  →  main (production)
```

- ✅ All work goes through PRs
- ✅ Dagan is the assigned reviewer on PRs by default
- ✅ `npm run build` MUST pass before push
- ❌ NEVER push directly to `main` or `staging`
- ❌ NEVER deploy to production without explicit Adir approval

---

## Rule 5 — RTL is non-negotiable

The product is Hebrew-first.

- ✅ All new UI must support RTL natively
- ✅ Mixed Hebrew/English content must render correctly
- ❌ Don't ship a feature that breaks RTL
- ❌ Don't ship English-only screens unless explicitly scoped

---

## Rule 6 — Verify before assuming (especially with DB)

The migrations folder is **not proof** that a table exists or works. Before depending on a table, verify it against `docs/SCHEMA.md` (filled from Phase 3 onward) or query the live DB.

**Default behavior:** If the code references a table you haven't seen with your own eyes, run a query first. Don't assume.

---

## Rule 7 — Don't trust legacy `TASKS.md` as source of truth

The legacy `TASKS.md` from `worker-housing-platform` is a historical work log. It contains:
- Items marked "completed" that are only partially implemented
- Items marked "pending" that are actually live in production
- Inconsistent statuses

**Source of truth hierarchy for oz-marketplace:**
1. Code (`app/`, `components/`, `lib/`)
2. Live DB (captured in `docs/SCHEMA.md` from Phase 3 onward)
3. Decisions in `docs/DECISIONS_LOG.md`
4. Specs in `docs/specs/`
5. `docs/TASKS.md` (this repo's task tracker — fresh, not ported)

The legacy `TASKS.md` is reference only.

---

## Rule 8 — Honest reporting

If something is broken, write that it's broken. Don't paper over it with "in progress" or "needs polish."

- ✅ "OTP works for Israeli numbers, fails for international — bug at line 47"
- ❌ "OTP — in progress" (when it's actually broken)

This applies to:
- Status updates from agents
- Spec sections
- PR descriptions
- Open questions

> **Why:** PM needs accurate signals to prioritise. Hidden bugs become 3-week delays.

---

## Rule 9 — Brand identity

The product is **עוז 🏗** (Oz).

- The product name is עוז (Hebrew) / Oz (Latin) — never "WorkerHome" (the legacy URL is irrelevant here)
- All UI copy, marketing, and customer communication uses Oz branding
- The 🏗 emoji is acceptable as a brand mark, used functionally (not decoratively)
- No invented brand variations (don't write "OzPlatform" or "Oz Tech" — just עוז or Oz)
- **Primary font is Heebo** (with Assistant as fallback) — both bundled locally, no CDN
- **Color palette is locked at 7 brand colors** (see `docs/BUILD_PLAN.md` §4 and `/styles/_tokens.scss`)
- **Orange (#E07B39) is reserved for primary CTA buttons only** — not for decoration

**Operational backing:** Full design tokens, component vocabulary, and reference mockups live in `recon/` (sourced from the legacy brand folder). Tokens are re-authored as SCSS in `/styles/_tokens.scss`.

---

## When in doubt

Ask. Specifically:

| Question type | Ask |
|---|---|
| Product / scope / priorities | Adir |
| Engineering / implementation | Maki |
| What's actually built / shipped | Check the code first |
| Operations / bookings / customers | Maya |
| Anything time-sensitive / blocking | Whoever is online first |

---

**These rules supersede any conflicting information in older docs anywhere.**
