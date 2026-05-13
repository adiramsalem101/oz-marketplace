# LAYOUT_INSPIRATION

**Status:** Reference doc. No code change ships from this file alone.
**Generated:** 2026-05-06
**Owner:** Adir
**Purpose:** Capture the legacy `workerhome.co.il` visual system as a reference for the new oz-marketplace public-facing build (homepage, marketplace, hostels, auth pages). The live legacy site is the visual benchmark to *react against* — we keep what works, drop what doesn't, and document the call either way.

---

## Sources used

| Source | Type | Authority |
|---|---|---|
| `recon/04d-brand-tokens-extracted.md` | Extracted brand token table from legacy `/docs/brand/` CSS | **Canonical** for tokens (colors, type, radii, shadows, motion). The legacy CSS file `colors_and_type.css` is the authoritative source. |
| `recon/04e-brand-components.md` | Component-name vocabulary + class-by-class behavior | **Canonical** for component patterns. |
| `recon/brand/03-styles-source.md` | Direct excerpts of `assets/styles.css` from the legacy brand kit | **Canonical** for CSS rules. |
| Live `https://workerhome.co.il/` (homepage WebFetch) | Rendered HTML from production (server-rendered shell + visible content) | **Approximate** — WebFetch reads HTML/markdown, not computed styles, so hex values are visual estimates and section sizes are approximate. |
| Live `https://workerhome.co.il/listings`, `/hostels`, `/auth/login` | Attempted fetch | **Limited** — these pages render content client-side after the JS shell loads. Initial HTML returned by WebFetch is mostly nav + footer chrome. **See `Open inspection gaps` below.** |
| Local mockups in `recon/brand/mockups/` (referenced in `04a`) | Static HTML reference: `marketplace_ui_kit.html`, `dashboard_ui_kit.html`, `AM_Hostels_Booking_System.html`, etc. | **Reference, not contract** — per `brand/README.md:93–102`, mockups are snapshots, not specs. |

> **Important caveat on color values from the live homepage fetch:** the WebFetch summary returned hex values like `#0a2c5c` for navy, `#ffa500` for orange, `#00a3a3` for teal-on-hostel-buttons. **These do not match the documented brand tokens** (`blue-deep #1B3A6B`, `orange #E07B39`, no teal at all). Either the live site has drifted from the documented system, the WebFetch model approximated the rendered colors poorly, or both. **Treat live-fetch hex values as rough estimates only.** When a token exists in `04d`, the token wins.

---

## Open inspection gaps

These need a manual screenshot pass before we can finalize patterns:

1. **Live listings card visual** — production `/listings` returns `"טוען נכסים..."` and renders cards client-side. WebFetch can't see them. The card pattern below is reconstructed from `recon/04e` (`.card` in marketplace context) + `marketplace_ui_kit.html` mockup + the homepage's "listings preview" section (which *did* render).
2. **Live hostels page visual** — same client-render issue. Pattern below is reconstructed from `recon/AM_Hostels_Booking_System.html` mockup + the homepage's "hostels strip" section.
3. **Live login page visual** — same. Pattern reconstructed from `recon/04e` (`.field`, `.btn-cta`) + the canonical brand tokens.
4. **The "colored card backgrounds" hostel pattern** mentioned in the brief (blue, orange, purple, teal) — **not confirmed** on the production site (homepage hostel cards are white with a teal CTA button). Likely originates from one of the mockup files; need to confirm with stakeholder which pattern is the intended carry-over.

---

## §1 — Top navigation

### Live homepage observations
- **Bar background:** white (`#FFFFFF`)
- **Bar height:** ~64px desktop (homepage estimate; mobile likely ~56px but not confirmed)
- **Bottom border:** ~1px subtle gray. Live fetch estimated `#e5e5e5`; canonical token is `border-default #E5E7EB` (gray-200). Same value give-or-take render rounding. **The bar reads as nearly invisible** on white-against-white sections.
- **Logo:** text + mark, "עוז 🏗" lockup (per `IRON_RULES.md` Rule 9 the mark is the construction-crane emoji used as a functional mark, not decoration). Right side (RTL start). Bold/extrabold weight.
- **Nav links:** spaced ~20–24px apart (estimate). Order from RTL start (right): "נכסים זמינים" (Listings), "אכסניות" (Hostels), "מחשבון תשואה" (Calculator), "פרסם נכס" (Post Property), then auth actions on the end.
- **Auth actions on end (left):** "כניסה" (login) + "הצטרף כתאגיד" (Join Corporate) — both render as low-emphasis text/links on the live site, navy color, no fill.
- **CTA button styling in nav:** the live nav appears to use *text-only* navy links for auth, **not** a yellow/orange CTA. The orange CTA is reserved for hero + section ends.

### What the brand tokens say
- Nav text: `fg-default #1E1E2E` (ink)
- Nav hover: `blue-deep #1B3A6B` per `04e` `.nav-link` rules
- Brand mark in sidebar context: orange-square `.o` holding the 🏗 emoji + extrabold "עוז" text (`assets/styles.css:19–22`)

### Carry-over for oz-marketplace
- ✅ Keep: white bar, sticky, ~64px desktop / ~56px mobile, brand lockup on RTL start
- ✅ Keep: text-only navy nav links (medium weight per our recent contrast pass)
- ✅ Keep: end-side ghost "כניסה" + orange CTA "הצטרפו" — slightly stronger CTA emphasis than legacy because oz-marketplace's auth flow is the primary conversion path (legacy has more nav items diluting it)
- ✅ Keep: bottom border using a *visible* mid-gray. Legacy's border reads as nearly invisible — that's the bug we already filed.
- ❌ Drop: legacy's "מחשבון תשואה" (calculator) and "פרסם נכס" (post property) nav entries. Per BUILD_PLAN §3.F, calculator is deferred and post-property is folded into `/sign-up`.

---

## §2 — Section system & rhythm

### Live homepage section order
1. Pilot announcement banner (light yellow)
2. Hero (white, ~60–80px vertical padding)
3. Trust badges strip (white)
4. Hostels strip (white)
5. Stats / KPI strip (light gray)
6. Two-property-type cards (white, B2B blue-tint card + B2C gray-tint card)
7. Listings preview grid (white)
8. How-it-works 3-step (light gray)
9. Legal compliance callout (light yellow, amber-ish)
10. Owner value prop / calculator pitch (white)
11. Testimonials (white)
12. FAQ accordion (white)
13. Return calculator (white, long interactive form)
14. Contact CTA (light gray)
15. Footer (dark navy)

### Section background palette (observed)
| Treatment | Live site approximation | Canonical token | Used in |
|---|---|---|---|
| White surface | `#FFFFFF` | `white` | Hero, hostels strip, listings preview, calculator, FAQ, owner pitch |
| Light gray | `~#F5F5F5` | `bg-soft #F7F8FA` | Stats strip, how-it-works, contact CTA |
| Light yellow / amber | `~#FFFBF0` | `amber-50 #FFFBEB` | Pilot banner, legal-compliance callout |
| Dark navy | `~#0A2C5C` (live) → `blue-deep #1B3A6B` (token) | `blue-deep` | Footer; also "owner pitch" panel pattern |
| Light blue tint | `~#F0F4FF` | `blue-bg-soft #D2E5FA` (legacy support) | B2B-type comparison card |

### Section transitions
- **All hard edges.** No gradients between sections on the legacy homepage. Each section is a flat color block with vertical padding handling the breathing room.
- **One exception:** the hero on the *current oz-marketplace* build (not legacy) uses a `linear-gradient(blue-bg-soft → white)`. Legacy uses a flat white hero. Worth deciding whether to keep the gradient or revert to flat.

### Vertical rhythm
| Where | Padding (approx) |
|---|---|
| Section vertical padding | 60–80px desktop, ~40px mobile |
| Trust strip | 30–40px |
| Pilot banner | 12–16px |
| Footer | 40–50px |
| Card body padding | 16–20px |
| Card image-to-text gap | 0 (image flush) + ~16px below |

The brand kit doesn't define a section-padding scale — these are ad-hoc per section. Spec gap. Our scale (`$space-7=32`, `$space-8=40`, `$space-10=64`, `$space-11=80`) covers it.

### Carry-over for oz-marketplace MVP
- ✅ Keep: alternating white / light-gray rhythm. Don't dye every section.
- ✅ Keep: hard-edged transitions. Drop the homepage hero gradient — flat white feels more confident.
- ✅ Keep: dark-navy footer for trust.
- ❌ Drop: pilot announcement banner above the nav (it lives below the nav on the legacy site, before the hero). MVP doesn't need it; if marketing wants it, add it as a dismissible strip later.
- ❌ Drop: calculator section, B2C card, testimonials, return-calculator section. Per BUILD_PLAN §3.F.
- ⚠️ Decide: legal-compliance callout (light-yellow strip) — keep in MVP or drop until we have actual numbers? Currently kept.

---

## §3 — Hero pattern

### Live homepage
- Background: white, no imagery, no gradient.
- Centered single-column layout, ~720px content width.
- Eyebrow / kicker: small navy text "פיילוט גוש דן פעיל" inside a white pill-shaped chip.
- H1: ~48–56px, weight 700–800, color ink. Two-line break.
- Subtitle: ~16–18px, color fg-default. Two-line.
- Terms line: small gray, ~14px (`fg-muted`).
- CTA pair: two side-by-side. Live homepage uses **two yellow/orange primary CTAs**, but per our IRON_RULE (orange = primary CTA only), this is on the edge — a single primary + one ghost is the cleaner read.

### Carry-over
- ✅ Keep: centered, eyebrow chip, two-line H1
- ✅ Keep: CTA pair below subtitle
- ⚠️ Decide: **two oranges or orange + ghost?** Brand IRON_RULE says orange = primary CTA only. Strict reading: one orange "חפש נכס" (search) + one ghost "פרסם נכס" (post). Loose reading: two oranges because both are equally primary on the homepage. Current oz-marketplace build uses orange + ghost — recommend keeping that.

---

## §4 — Hostels strip / hostels page

### Live homepage strip
- Section heading: "אכסניות עוז" (with crown emoji on legacy)
- Lead: "לינה יומית גמישה · ₪120/לילה"
- 4 cards in a row (likely 2-up on mobile)
- **Card background: white** with ~1px light gray border (`#e5e5e5`)
- Card corner radius: ~8–12px
- Card content (in DOM order):
  - Emoji (large, ~36–40px)
  - City name (small, gray, ~12–13px)
  - Hostel name (semibold, ~14–16px)
  - **CTA button on legacy: teal/cyan** (`~#00a3a3`) "🛏️ Book"
- The teal button is **NOT** in the brand palette. This is brand drift on the live site.

### Brand-kit alternative (mockup)
- `AM_Hostels_Booking_System.html` (in `recon/brand/mockups/`) is referenced as the hostels mockup but I have not loaded it line-by-line for this doc.
- The user prompt mentioned colored card backgrounds (blue, orange, purple, teal) — not present on the production homepage. **Most likely from a mockup variant.** Confirm with Adir which pattern is the intended carry-over before we ship anything visual.

### Hostels-page-specific structure
- Live `/hostels` page renders client-side; WebFetch saw only:
  - Title: "אכסניות לעובדים — 4 ערים"
  - Subtitle paragraph about regulatory compliance
  - 4 hostel cards (each with city emoji, city name, brief description, "available beds" count, "price range" in ILS, "view properties →" link — these last two suggest the *legacy* hostels page uses on-platform data, not link-out)
  - "How to Order?" 3-step section
  - "Have a property to rent?" CTA
- The current oz-marketplace `/hostels` page is a pure link-out (per `DECISIONS_LOG.md` 2026-05-06 hostels-link-out policy). This is a **deliberate divergence from legacy** — legacy has on-platform booking; we link out to FrontDeskMaster.

### Carry-over for oz-marketplace MVP
- ✅ Keep: 4-card grid pattern, emoji + city + name, CTA per card
- ⚠️ Decide: **white-card vs colored-card pattern.** Need a screenshot of `AM_Hostels_Booking_System.html` to confirm what "colored cards" means. Default until confirmed: white cards, brand orange CTA on each (replacing legacy's drifted teal).
- ❌ Drop: legacy's "available beds" + "price range" + "view properties" — those imply on-platform booking. Our hostels page is link-out only.
- ❌ Drop: legacy's "How to Order?" + "Have a property" sections on `/hostels`. Keep `/hostels` minimal.

---

## §5 — Listings cards

### Reconstructed pattern
> Live `/listings` did not render server-side, so this combines the homepage's listings-preview section + `recon/04e` `.card` (marketplace) + `marketplace_ui_kit.html` mockup reference.

- Card: white background, ~1px border `border-default` or no border + `shadow-sm`, ~12–16px (`radius-2xl` = 16px = canonical card)
- Image area: aspect ratio ~3:2 (`16:10` per `04e`)
- Image corner radius: matches card (top corners only if image is flush)
- **Image overlay (MVP):** single pill on the top-end (left in RTL): vacancy pill — white bg, dark text, neutral border. The verification pill is **dropped from MVP** per DECISIONS_LOG 2026-05-12; the verification system (all levels) is deferred. The target two-overlay design (verification top-start + vacancy top-end) is preserved below for the future-roadmap pattern.
- **Target image overlays (post-MVP, deferred):**
  - Top-start (right in RTL): verification pill
    - Tier-1 / "verified A" → green-deep on green-deep-soft (`#206A4F` text on `rgba(32,106,79,0.1)` bg, per `04d` brand-hover-pressed)
    - Tier-2 / "verified B" → likely amber per the live site (legacy uses amber; brand canonical pairing TBD)
  - Top-end (left in RTL): vacancy pill — white bg, dark text, neutral border
- Card body: white, ~16–20px padding
- Body content order (RTL):
  1. Location row: 📍 + city (gray, ~12px)
  2. Optional B2B/B2C tag pill (small, navy on light blue tint)
  3. **Price** as the visual anchor — ~24–28px bold, blue-deep color, with `/מיטה` suffix in muted small text
  4. Street address (gray, ~12–13px)
  5. Vacancy fraction + occupancy % (gray, ~12px)
  6. Bed count + "פרטים ←" link (blue-deep, end-aligned)
- Card hover: `shadow-sm` → `shadow-md`, optional `transform: translateY(-2px)`

### Verification pill spec (post-MVP target — not shipped in MVP)

> **Deferred 2026-05-12.** No verification pill ships in MVP — all three levels are out of scope. The table below is the target design for when the verification system is re-scoped.

| Variant | Bg | Text | Source |
|---|---|---|---|
| Self-reported (level 1) | `gray-100 #F3F4F6` | `fg-muted #6B7280` | `Pill.types tone="gray"` |
| Remote-verified (level 2) | `blue-deep-soft (~rgba(27,58,107,0.1))` | `blue-deep #1B3A6B` | `Pill tone="blue-deep"` |
| On-site verified (level 3) | `green-deep-soft rgba(32,106,79,0.1)` | `green-deep #206A4F` | `Pill tone="green-deep"` |

The legacy site shows green pills for "verified A" — this matches our level-3, but legacy lumps level-2/3 differently. We deliberately split the levels in the schema (`verification_level` smallint 1/2/3). MVP ships no verification levels surfaced — the column defaults to `1` but no badge renders.

### Carry-over for oz-marketplace
- ✅ Keep: white card, 16:10 (or 4:3) image, price-as-anchor, RTL-end "details" link
- ✅ Keep: hover shadow lift
- ✅ Keep (MVP): single vacancy pill overlay (top-end). Verification pill is deferred per DECISIONS_LOG 2026-05-12.
- ❌ Drop: verification pill on image (deferred from MVP — all levels)
- ❌ Drop: B2B/B2C tag pill on cards (we don't have a B2C product in MVP)
- ⚠️ Decide: vacancy pill on top-end vs occupancy-percent in body — legacy shows both. Recommend body-only (less noise on the card).

---

## §6 — Auth pages

### Live `/auth/login` observations
- WebFetch saw only nav + footer; the login form renders client-side. Visual reconstruction below is from `recon/04e` (`.field`, `.btn-cta`, `.card`) + the brand tokens.

### Reconstructed pattern (legacy + recon)
- Page is **chromeless except for the brand**: no full nav, just a small logo/lockup at top.
- Background: light gray `bg-soft #F7F8FA`
- Card: white, centered, ~480–560px wide, padding ~28–40px, `radius-2xl` (16px)
- Border: `border-default #E5E7EB` 1px
- Drop shadow: `shadow-sm` on the card
- H1 / heading: text-2xl (24px) weight 700, ink color
- Subtitle: text-sm (14px) `fg-muted`
- Field: `.field` pattern — label above, input below, hint text below input. Input: 1px `border-default`, `radius-lg` (8px), focus ring `0 0 0 3px rgba(27,58,107,.12)` (blue-deep at 12% alpha)
- Primary submit: `.btn-cta` (orange) full width, `radius-xl` (12px)
- Sign-up link at bottom: text-link blue-deep underline-on-hover

### Current oz-marketplace status
- We already have `/sign-in` and `/sign-up` matching this pattern (Phase 3). They use a centered card on `bg-soft`, the brand mark, and orange CTA. The recent restructure split the persona-picker into two ghost-button steps. This is **intentionally divergent from legacy** — we chose ghost-on-ghost for the equal-weight choice screens.
- Legacy doesn't have the persona-picker pattern; it has a single email/password (or magic-link) form with a "join as corporate" link to a separate flow.

### Carry-over for oz-marketplace
- ✅ Keep: chromeless layout, centered card, white-on-`bg-soft`
- ✅ Keep: brand mark at top of card
- ✅ Keep (already implemented): orange CTA
- ⚠️ Already-decided divergence: persona-picker → owner-type-picker → form, with ghost variants on equal-weight screens. Don't revert this.

---

## §7 — Buttons & CTAs (cross-page summary)

### Tokens (canonical)
| Token | Value | Use |
|---|---|---|
| orange CTA bg | `orange #E07B39` | Primary CTA only (search, publish, sign up) — never decorative |
| orange CTA text | `fg-on-cta #FFFFFF` | |
| orange CTA shadow | `shadow-orange = 0 6px 14px -4px rgb(224 123 57 / 0.35)` | Signature glow |
| ghost bg | `white` | Default secondary action |
| ghost border + text | `blue-deep #1B3A6B` (per recent restyle — was muted gray before) | |
| ghost hover | `blue-deep-soft rgba(27,58,107,0.08)` bg, full blue-deep border + text | |
| blue button bg | `blue-deep #1B3A6B` | Navigational/structural (sidebar primary link, etc.) |
| Radius | `radius-xl = 12px` for CTAs, `radius-2xl = 16px` for cards | |

### Live homepage observations
- The live primary CTA reads as **brighter yellow-orange** than the documented `#E07B39`. The WebFetch summary called it `#ffa500 / #ffb84d`. Either drift or estimate error. Stick with documented `#E07B39`.
- Legacy uses an *additional* teal-cyan accent for hostel "Book" buttons (`~#00a3a3`). **Not in the palette** and not adopted by us.
- Legacy has nav-text auth links (low emphasis). We're using a more conventional nav: ghost "כניסה" + orange "הצטרפו" — slightly more conversion-forward than legacy.

### Carry-over for oz-marketplace
- ✅ Keep: orange = primary CTA, used sparingly
- ✅ Keep: ghost = secondary, white bg + blue-deep border + text (already restyled)
- ❌ Drop: teal-cyan hostel CTA. Use orange or ghost, consistent with palette.
- ✅ Keep: blue-deep button variant for structural/navigational actions (currently underused; reserve for owner-panel/sidebar contexts)

---

## §8 — Typography summary (cross-page)

(Source: `04d` brand-tokens.)

| Role | Token | Value | Weight | Live homepage observed | Notes |
|---|---|---|---|---|---|
| Hero H1 | `text-5xl` (48px) or `text-4xl` (36px) | 3rem / 2.25rem | extrabold (800) | Live: ~48–56px | Two-line break common |
| Section H2 | `text-3xl` (30px) or `text-2xl` (24px) | 1.875rem / 1.5rem | bold (700) | Live: ~32–40px | Sometimes centered, sometimes start-aligned |
| Card title | `text-lg` (18px) or `text-base` (16px) | 1.125rem / 1rem | semibold (600) | Live: ~16–18px | |
| Lead paragraph | `text-lg` (18px) | 1.125rem | normal (400) | Live: ~16–18px | |
| Body | `text-base` (16px) | 1rem | normal (400) | Default body color is `gray-600 #4B5563`, not `fg-default` — softer than ink |
| Card metadata | `text-sm` (14px) or `text-xs` (12px) | | normal (400) | Live: ~12–13px | Color `fg-muted #6B7280` |
| Eyebrow / kicker | `text-sm` (14px) | | bold (700) | uppercase, `tracking-wider` (0.05em), `gray-400` | `.oz-eyebrow` class in `04d` |
| Price (anchor) | `text-2xl`–`text-3xl` (24–30px) | | bold (700) | Live: ~24–28px | Use `blue-deep` color (NOT orange, despite anchor weight) |

### Carry-over
- ✅ Keep all of the above.
- ⚠️ Adjust: oz-marketplace H1 currently uses `text-3xl`/`text-5xl` responsive. That's right. But `font-weight: extrabold (800)` is documented for H1; we currently use defaults — check the global heading reset.

---

## §9 — Color value reference table (consolidated)

### Brand core 7 (canonical, from `04d`)
| Token | Hex | Role |
|---|---|---|
| `ink` | `#1E1E2E` | Text/headlines |
| `bg-soft` | `#F7F8FA` | Page bg, light section bg |
| `orange` | `#E07B39` | Primary CTA only |
| `green-light` | `#52A375` | Soft positive accent |
| `green-deep` | `#206A4F` | Verification (T1/T2 verified owner) |
| `blue-light` | `#205FA8` | Secondary brand accent |
| `blue-deep` | `#1B3A6B` | Nav, headers, structural |

### Hover/pressed (canonical)
| Token | Value |
|---|---|
| `orange-hover` | `#C26A2C` |
| `orange-soft` | `rgba(224,123,57,0.1)` |
| `blue-deep-hover` | `#15305A` |
| `blue-deep-soft` | `rgba(27,58,107,0.08)` (we added at 8% for ghost hover) |
| `green-deep-soft` | `rgba(32,106,79,0.1)` |

### Status (outside brand)
| Token | Hex | Use |
|---|---|---|
| `red-500` | `#EF4444` | Error |
| `red-600` | `#DC2626` | Error strong |
| `amber-500` | `#F59E0B` | Warning |
| `amber-50` | `#FFFBEB` | Warning soft bg, legal callout, pilot banner |

### Neutrals
| Token | Hex |
|---|---|
| `white` | `#FFFFFF` |
| `gray-50` | `#F9FAFB` |
| `gray-100` | `#F3F4F6` |
| `gray-200` | `#E5E7EB` (alias `border-default`) |
| `gray-300` | `#D1D5DB` (alias `border-strong`) |
| `gray-400` | `#9CA3AF` (alias `fg-faint`) |
| `gray-500` | `#6B7280` (alias `fg-muted`) |
| `gray-600` | `#4B5563` |
| `gray-700` | `#374151` |
| `gray-800` | `#1F2937` |
| `gray-900` | `#111827` |

### Live-fetch hex values that *don't* match the canonical tokens
| Live fetch said | What it should be | Note |
|---|---|---|
| `#0a2c5c` (footer/nav navy) | `blue-deep #1B3A6B` | WebFetch approximation; render-engine guess |
| `#ffa500 / #ffb84d` (CTA orange) | `orange #E07B39` | Same |
| `#00a3a3` (hostel "Book" button teal) | **Not in palette** | True drift on legacy site — drop |
| `#0066cc` (text link blue) | `blue-deep #1B3A6B` | Use blue-deep, not generic web-blue |
| `#f0f4ff` (B2B card tint) | `blue-bg-soft #D2E5FA` | Legacy-support token |

**Rule:** when in doubt, use the canonical token. Do not introduce new hex values to match what the WebFetch summary guessed.

---

## §10 — Component pattern catalog (carry-over decisions)

| Pattern | Legacy site has | oz-marketplace MVP | Decision |
|---|---|---|---|
| Public top nav | white bar, text-only nav, navy auth links | white bar, ghost+CTA auth | **Keep current oz build** (small CTA boost is intentional) |
| Hero with eyebrow + 2 CTAs | ✅ | ✅ | **Keep** |
| Trust strip (4 items) | ✅ | ✅ | **Keep** |
| Hostels strip on homepage (4 cards) | ✅ white cards, teal CTA | ✅ white cards, orange CTA | **Keep**; replace teal with brand-orange CTA |
| Stats strip | ✅ light-gray bg | ✅ | **Keep** |
| Listings preview (homepage) | ✅ white cards, gray bg section possibly | ✅ | **Keep** |
| 3-step "How it works" | ✅ light-gray bg, numbered cards | ✅ | **Keep** |
| Legal compliance callout | ✅ amber strip | ✅ | **Keep** |
| Owner pitch panel | ✅ white | ✅ blue-deep panel | **Keep oz**: blue-deep panel reads stronger than legacy's white |
| FAQ accordion | ✅ | ✅ | **Keep** |
| Two-property-type comparison cards | ✅ B2B + B2C | ❌ | **Drop**: no B2C in MVP |
| Testimonials | ✅ | ❌ | **Drop until real ones** |
| Return calculator | ✅ long form | ❌ | **Drop**: deferred per BUILD_PLAN §3.F |
| Contact CTA strip | ✅ light gray | ❌ | **Drop**: footer + email handles this |
| Dark navy footer | ✅ | ❌ (currently a thin gray strip) | **Add**: a proper navy footer is a small upgrade worth doing |
| Pilot announcement banner | ✅ above nav | ❌ | **Drop until needed**, can re-add as a dismissible strip |
| Public listings card | reconstructed | ✅ | **Keep**; drop verification pill (MVP scope re-lock 2026-05-12 — all verification levels deferred); vacancy pill stays |
| Public listing detail page | unknown (client-rendered) | ✅ gallery + booking panel | **Keep current** |
| Login page (chromeless centered card) | ✅ | ✅ | **Keep** |
| Sign-up persona picker (two-step) | ❌ legacy is single form | ✅ two-step ghost-on-ghost | **Keep** — deliberate divergence |

---

## §11 — Explicit non-goals & deferrals

For clarity on what *not* to build into the public surface:
- No 3D / virtual-tour previews on listing cards. Per BUILD_PLAN §3.F: deferred to Phase 9+.
- No verification badges of any level in MVP. The column `verification_level` exists in the schema (default `1`) but no listings render a badge. Per DECISIONS_LOG 2026-05-12, the full verification system — all three levels — is deferred.
- No B2C / individual-owner cards or sections. Reserved enum value, no signup path.
- No yield calculator section. No "What can you earn?" interactive math.
- No reviews or ratings on listings.
- No Neema fintech surfaces.
- No premium/featured listing visual treatment.

---

## §12 — What to do with this doc

1. **Read before any visual work** on `app/page.tsx`, `app/listings/*`, `app/hostels/*`, `app/(auth)/*`, or `components/layout/PublicNav/*`.
2. **Confirm the four open questions** with Adir before shipping a visual change:
   - Two-orange hero CTAs vs orange + ghost (recommend orange + ghost)
   - White hostel cards vs colored hostel cards (recommend white until colored mockup is confirmed)
   - Vacancy pill on listing card image vs occupancy-percent in body (recommend body-only)
   - Add the dark-navy footer to MVP or leave the thin gray footer (recommend add)
3. **Cross-check live screenshots** for `/listings`, `/hostels`, and `/auth/login` once a manual capture is available — the current doc reconstructs those pages from recon material plus the homepage fetch, not from rendered live HTML.
4. **Update this doc, not the codebase, when patterns change.** The doc is the contract; the code reflects it.

---

*End of LAYOUT_INSPIRATION. No code shipped from this doc. Halting for review.*
