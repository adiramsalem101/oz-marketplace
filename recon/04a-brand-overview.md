# 04a — Brand Directory Overview

Source: `../worker-housing-platform/docs/brand/`
Generated: 2026-05-02

## Tree (full depth)

```
docs/brand/
├── README.md                          ← Folder map, "start here"
├── design-tokens.md                   ← PM-friendly translation of CSS tokens
├── components.md                      ← UI vocabulary + mockup index
└── assets/
    ├── 00_color_palette.png           (canonical 7-color brand palette image)
    ├── _icons.html                    (lucide-style SVG sprite, ~50 icons)
    ├── colors_and_type.css            ← Canonical CSS token file (used as-is)
    ├── styles.css                     ← Component-level CSS
    ├── fonts/
    │   ├── fonts.css                  (loads all @font-face declarations)
    │   ├── Heebo-400-he.woff2         (primary font, Hebrew subset)
    │   ├── Heebo-400-la.woff2         (primary font, Latin subset)
    │   ├── Assistant-400-he.woff2     (fallback, Hebrew)
    │   ├── Assistant-400-la.woff2     (fallback, Latin)
    │   ├── IBMPlexSansHebrew-400-he.woff2  (alternative — not currently used)
    │   ├── IBMPlexSansHebrew-400-la.woff2
    │   ├── IBMPlexSansHebrew-500-he.woff2
    │   ├── IBMPlexSansHebrew-500-la.woff2
    │   ├── IBMPlexSansHebrew-700-he.woff2
    │   ├── IBMPlexSansHebrew-700-la.woff2
    │   ├── Rubik-400-he.woff2         (alternative — not currently used)
    │   └── Rubik-400-la.woff2
    └── mockups/
        ├── marketplace_ui_kit.html             (B2C marketplace landing reference)
        ├── corporate_assets_mvp.html           (B2B Dashboard MVP reference)
        ├── corporate_assets_full.html          (B2B Dashboard "Dreams" reference)
        ├── corporate-assets.html               (React wrapper that loads MVP+Full)
        ├── corp-shared.jsx                     (Shared React components for the corp wrappers)
        ├── design-canvas.jsx                   (Side-by-side mockup canvas helper)
        ├── dashboard_ui_kit.html               (Component-library showcase)
        ├── supply_a_owner_roadmap.html         (Owner journey / B2C onboarding flow)
        ├── AM_Hostels_Booking_System.html      (Hostel booking — current iteration)
        └── AM_Hostels_Booking_System_v1.html   (Hostel booking — earlier iteration)
```

## Per-directory purpose

| Path | One-sentence purpose | Source |
|---|---|---|
| `brand/` | Single source of truth for OZ visual identity, tokens, and components. | `brand/README.md:3` |
| `brand/assets/` | All raw artifacts (CSS tokens, component CSS, icon sprite, palette image, fonts, mockups). | `brand/README.md:18-39` |
| `brand/assets/fonts/` | Bundled Hebrew+Latin fonts (woff2) — required by `colors_and_type.css`; no CDN. | `brand/README.md:23-28`, `brand/design-tokens.md:115-125` |
| `brand/assets/mockups/` | Living reference HTML/JSX mockups — open in a browser; **not** enforced specs. | `brand/README.md:29-39`, `brand/README.md:93-102` |

## Top-level files at-a-glance

- **`README.md`** (102 lines) — folder map + how-to-use guide; cross-references IRON_RULE 9 (brand identity) and notes that production React components from Claude Design are NOT in `/docs/` (request from Adir).
- **`design-tokens.md`** (236 lines) — PM-readable rules for the 7-color palette, hover/pressed variants, semantic role mapping, status colors, typography (Heebo + Assistant fallback), type scale, weights, headings, border radii, shadows, transitions, RTL, anti-patterns. The CSS file wins on conflicts.
- **`components.md`** (233 lines) — vocabulary for layout / nav / KPIs / buttons / status / chips / forms / steps / AI / marketplace / mobile components, plus a mockup index.

## Key cross-cutting notes

- The **palette image** (`assets/00_color_palette.png`, 900×981) is treated as the canonical color source; CSS was corrected to match it (`docs/DECISIONS_LOG.md:42-65`).
- `colors_and_type.css` `@imports` `fonts/fonts.css`, which `@font-face`s 4 families × Hebrew/Latin × multiple weights — **copying CSS without copying `fonts/` will break the system**.
- Mockups are **snapshots, not contracts** (`brand/README.md:93-102`). When implementation diverges, update the spec, not the mockup.
- Production-grade React/SCSS implementations of AlertsBanner, FAQ, Footer, ListingCard, Navbar, SearchBar, VerificationBadge, YieldCalculator exist in a *separate* design archive — not in this folder (`brand/README.md:87`).
