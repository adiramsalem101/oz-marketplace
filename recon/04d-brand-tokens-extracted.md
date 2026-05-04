# 04d — Brand Tokens Extracted (raw values)

Source: `../worker-housing-platform/docs/brand/` (primarily `assets/colors_and_type.css`, `design-tokens.md`, `assets/styles.css`).
Output: pure data — no SCSS, no CSS variables, no Tailwind framing. Each token cites `file:line`.

---

## Colors

### Brand — Core 7 (canonical)
| Name | Value | Usage notes | Source |
|---|---|---|---|
| ink | `#1E1E2E` | Primary text, headlines. Don't use for backgrounds. | `assets/colors_and_type.css:12`, `design-tokens.md:32` |
| bg-soft | `#F7F8FA` | Page background, large surfaces. Don't use for text. | `assets/colors_and_type.css:13`, `design-tokens.md:33` |
| orange | `#E07B39` | **Primary CTA buttons ONLY** (search, publish, sign up). Don't use for decoration. | `assets/colors_and_type.css:14`, `design-tokens.md:34` |
| green-light | `#52A375` | Success states, soft positive accents. Don't use for verification. | `assets/colors_and_type.css:15`, `design-tokens.md:35` |
| green-deep | `#206A4F` | Verification badges, compliance, "verified owner". Don't use for generic success. | `assets/colors_and_type.css:16`, `design-tokens.md:36` |
| blue-light | `#205FA8` | Secondary brand accent, B2B section accents. Don't use for light info backgrounds. | `assets/colors_and_type.css:17`, `design-tokens.md:37` |
| blue-deep | `#1B3A6B` | Navigation, headers, B2B trust signals. Don't use for CTA buttons. | `assets/colors_and_type.css:18`, `design-tokens.md:38` |

### Brand — Hover / pressed variants
| Name | Value | Usage | Source |
|---|---|---|---|
| orange-hover | `#C26A2C` | CTA hover | `assets/colors_and_type.css:21`, `design-tokens.md:63` |
| orange-soft | `rgba(224, 123, 57, 0.1)` | CTA pressed/active background | `assets/colors_and_type.css:22`, `design-tokens.md:64` |
| blue-deep-hover | `#15305A` | Nav link hover | `assets/colors_and_type.css:23`, `design-tokens.md:65` |
| green-deep-soft | `rgba(32, 106, 79, 0.1)` | Verification badge background | `assets/colors_and_type.css:24`, `design-tokens.md:66` |

### Brand — Legacy support color (kept for backwards compat)
| Name | Value | Usage | Source |
|---|---|---|---|
| blue-bg-soft | `#D2E5FA` | Very light blue for info banner backgrounds, soft chips. **Not part of the brand palette** — kept for backwards compat. | `assets/colors_and_type.css:27`, `design-tokens.md:43-44` |

### Semantic role mapping (aliases on top of core 7)
| Role | Aliased token | Hex | Source |
|---|---|---|---|
| color-primary | blue-deep | `#1B3A6B` | `assets/colors_and_type.css:30`, `design-tokens.md:50` |
| color-cta | orange | `#E07B39` | `assets/colors_and_type.css:31`, `design-tokens.md:52` |
| color-secondary | blue-light | `#205FA8` | `assets/colors_and_type.css:32`, `design-tokens.md:51` |
| color-verified | green-deep | `#206A4F` | `assets/colors_and_type.css:33`, `design-tokens.md:53` |
| color-success | green-light | `#52A375` | `assets/colors_and_type.css:34`, `design-tokens.md:54` |
| color-info-bg | blue-bg-soft | `#D2E5FA` | `assets/colors_and_type.css:35`, `design-tokens.md:55` |
| color-surface | `#FFFFFF` | white | `assets/colors_and_type.css:36`, `design-tokens.md:80` |
| bg-page | bg-soft | `#F7F8FA` | `assets/colors_and_type.css:37`, `design-tokens.md:57` |

### Foreground / text
| Name | Value | Source |
|---|---|---|
| fg-default | `#1E1E2E` (ink) | `assets/colors_and_type.css:39` |
| fg-muted | `#6B7280` | `assets/colors_and_type.css:40` |
| fg-faint | `#9CA3AF` | `assets/colors_and_type.css:41` |
| fg-on-dark | `#FFFFFF` | `assets/colors_and_type.css:42` |
| fg-on-cta | `#FFFFFF` | `assets/colors_and_type.css:43` |

### Borders
| Name | Value | Source |
|---|---|---|
| border-default | `#E5E7EB` | `assets/colors_and_type.css:45` |
| border-strong | `#D1D5DB` | `assets/colors_and_type.css:46` |
| border-accent | `#1B3A6B` (blue-deep) | `assets/colors_and_type.css:47` |

### Neutrals (gray scale)
| Name | Value | Source |
|---|---|---|
| white | `#FFFFFF` | `assets/colors_and_type.css:50` |
| black | `#000000` | `assets/colors_and_type.css:51` |
| gray-50 | `#F9FAFB` | `assets/colors_and_type.css:52` |
| gray-100 | `#F3F4F6` | `assets/colors_and_type.css:53` |
| gray-200 | `#E5E7EB` | `assets/colors_and_type.css:54` |
| gray-300 | `#D1D5DB` | `assets/colors_and_type.css:55` |
| gray-400 | `#9CA3AF` | `assets/colors_and_type.css:56` |
| gray-500 | `#6B7280` | `assets/colors_and_type.css:57` |
| gray-600 | `#4B5563` | `assets/colors_and_type.css:58` |
| gray-700 | `#374151` | `assets/colors_and_type.css:59` |
| gray-800 | `#1F2937` | `assets/colors_and_type.css:60` |
| gray-900 | `#111827` | `assets/colors_and_type.css:61` |

### Status (outside the 7-color brand palette)
| State | Name | Value | Source |
|---|---|---|---|
| Error | red-500 | `#EF4444` | `assets/colors_and_type.css:64`, `design-tokens.md:98` |
| Error strong | red-600 | `#DC2626` | `assets/colors_and_type.css:65`, `design-tokens.md:99` |
| Warning | amber-500 | `#F59E0B` | `assets/colors_and_type.css:66`, `design-tokens.md:100` |
| Warning soft bg | amber-50 | `#FFFBEB` | `assets/colors_and_type.css:67`, `design-tokens.md:101` |

### Inline color literals seen in `styles.css` (not declared as tokens)
| Value | Where | Use |
|---|---|---|
| `#fafbfc` | `assets/styles.css:111,114` | Table thead bg / row hover bg |
| `#eef0f3` | `assets/styles.css:79,98,104,...` | Card border |
| `#f3f4f6` | `assets/styles.css:54,...` | Bar background, divider neutral |
| `#fef3e8` | `assets/styles.css:89,125` | Orange icon soft bg |
| `#fef2f2` | `assets/styles.css:90,127,164,172` | Red icon soft bg / error soft |
| `#fffbeb` | `assets/styles.css:91,128,165,173` | Amber soft bg |
| `#ede9fe` | `assets/styles.css:92,221` | Violet (NotebookLM) soft bg |
| `#6d28d9` | `assets/styles.css:92,221` | Violet (NotebookLM) icon stroke |
| `#b45309` | `assets/styles.css:91,128,165` | Amber strong text |
| `#991b1b` | `assets/styles.css:172` | Red alert text |
| `#92400e` | `assets/styles.css:173` | Amber alert text |
| `#1e3a8a` | `assets/styles.css:174` | Blue alert text |
| `#fecaca` / `#fde68a` / `#bfdbfe` / `#eff6ff` | `assets/styles.css:172-174` | Alert borders/backgrounds (red/amber/blue) |

---

## Typography

### Font families (with weights and source)
| Family | Weights declared in fonts.css | Files actually shipped | Source |
|---|---|---|---|
| **Heebo** (primary) | 400, 500, 700, 800 | `Heebo-400-{he,la}.woff2` only — heavier weights synthesised from 400 | `assets/fonts/fonts.css:13-20`, `design-tokens.md:120` |
| **Assistant** (fallback) | 400, 500, 600, 700 | `Assistant-400-{he,la}.woff2` only — heavier weights synthesised | `assets/fonts/fonts.css:5-12`, `design-tokens.md:121` |
| **IBM Plex Sans Hebrew** (alternative) | 400, 500, 700 | All three weights × he/la (6 files) | `assets/fonts/fonts.css:21-26`, `design-tokens.md:122` |
| **Rubik** (alternative) | 400, 500, 700 | `Rubik-400-{he,la}.woff2` only — heavier weights synthesised | `assets/fonts/fonts.css:27-32`, `design-tokens.md:123` |

**font-sans stack:** `var(--font-heebo, "Heebo"), "Assistant", "Segoe UI", Arial, sans-serif` — `assets/colors_and_type.css:72`.

**License:** OFL (free for commercial use) — `design-tokens.md:117`.

**Bundling rule:** "If you copy `colors_and_type.css` into the project, you must also copy the `fonts/` folder — otherwise font-faces won't load." — `design-tokens.md:125`.

### Type scale
| Token | rem | px (computed) | Use | Source |
|---|---|---|---|---|
| text-xs | 0.75rem | 12 | Micro labels | `assets/colors_and_type.css:74`, `design-tokens.md:131` |
| text-sm | 0.875rem | 14 | Small body, captions | `assets/colors_and_type.css:75`, `design-tokens.md:132` |
| text-base | 1rem | 16 | Default body | `assets/colors_and_type.css:76`, `design-tokens.md:133` |
| text-lg | 1.125rem | 18 | Lead paragraph | `assets/colors_and_type.css:77`, `design-tokens.md:134` |
| text-xl | 1.25rem | 20 | Subsection headers | `assets/colors_and_type.css:78`, `design-tokens.md:135` |
| text-2xl | 1.5rem | 24 | H3 / card title | `assets/colors_and_type.css:79`, `design-tokens.md:136` |
| text-3xl | 1.875rem | 30 | H2 | `assets/colors_and_type.css:80`, `design-tokens.md:137` |
| text-4xl | 2.25rem | 36 | H1 | `assets/colors_and_type.css:81`, `design-tokens.md:138` |
| text-5xl | 3rem | 48 | Hero headlines | `assets/colors_and_type.css:82`, `design-tokens.md:139` |

### Weights
| Token | Numeric | Use | Source |
|---|---:|---|---|
| font-normal | 400 | Body, paragraphs | `assets/colors_and_type.css:84`, `design-tokens.md:145` |
| font-medium | 500 | Emphasised body, links | `assets/colors_and_type.css:85`, `design-tokens.md:146` |
| font-semibold | 600 | Subheadings | `assets/colors_and_type.css:86`, `design-tokens.md:147` |
| font-bold | 700 | H2/H3, table headers, button text | `assets/colors_and_type.css:87`, `design-tokens.md:148` |
| font-extrabold | 800 | H1, hero, KPI values | `assets/colors_and_type.css:88`, `design-tokens.md:149` |

### Line-height & tracking
| Token | Value | Source |
|---|---|---|
| leading-tight | 1.25 | `assets/colors_and_type.css:90` |
| leading-normal | 1.5 | `assets/colors_and_type.css:91` |
| leading-relaxed | 1.625 | `assets/colors_and_type.css:92` |
| tracking-tight | -0.025em | `assets/colors_and_type.css:93` |
| tracking-wider | 0.05em | `assets/colors_and_type.css:94` |

### Heading default styles
| Heading | Size | Weight | Leading | Tracking | Color | Source |
|---|---|---|---|---|---|---|
| H1 | 36px (text-4xl) | 800 (extrabold) | 1.25 (tight) | -0.025em (tight) | ink (#1E1E2E) | `assets/colors_and_type.css:131`, `design-tokens.md:153` |
| H2 | 24px (text-2xl) | 700 (bold) | 1.25 (tight) | — | ink | `assets/colors_and_type.css:132`, `design-tokens.md:154` |
| H3 | 18px (text-lg) | 700 (bold) | — | — | ink | `assets/colors_and_type.css:133`, `design-tokens.md:155` |
| Body p | 16px (text-base) | 400 (normal) | 1.5 (normal) | — | gray-600 (#4B5563) | `assets/colors_and_type.css:134`, `design-tokens.md:156` |
| small | 12px (text-xs) | — | — | — | gray-500 (#6B7280) | `assets/colors_and_type.css:135`, `design-tokens.md:157` |

### Specialty text styles
| Class | Spec | Source |
|---|---|---|
| `.oz-eyebrow` | text-sm, font-bold, gray-400, uppercase, tracking-wider | `assets/colors_and_type.css:139-145` |

---

## Spacing scale

**Not defined in brand/** as a numeric scale. `design-tokens.md` includes a `## Spacing & sizing` section but only documents border-radius, shadows, and transitions — no `--space-N` tokens exist in `colors_and_type.css`. Mockup files use *ad-hoc* pixel values (e.g., `padding: 22px 28px 60px` in `.main`, `padding: 10px 14px` in `.tenant`, `padding: 9px 18px` in `.btn-cta`) without a shared scale.

> Flagged in `10-open-questions.md` — needs decision before scaffolding.

---

## Radii

| Token | Value | px (computed @ 16px root) | Use | Source |
|---|---|---|---|---|
| radius-sm | 0.125rem | 2 | Inline tags | `assets/colors_and_type.css:97`, `design-tokens.md:166` |
| radius (default) | 0.25rem | 4 | Default small elements | `assets/colors_and_type.css:98`, `design-tokens.md:167` |
| radius-md | 0.375rem | 6 | Inputs | `assets/colors_and_type.css:99`, `design-tokens.md:168` |
| radius-lg | 0.5rem | 8 | Inputs, dropdowns | `assets/colors_and_type.css:100`, `design-tokens.md:169` |
| radius-xl | 0.75rem | 12 | CTA buttons | `assets/colors_and_type.css:101`, `design-tokens.md:170` |
| radius-2xl | 1rem | 16 | **Canonical card radius** | `assets/colors_and_type.css:102`, `design-tokens.md:171` |
| radius-full | 9999px | — | Pills, badges, avatars | `assets/colors_and_type.css:103`, `design-tokens.md:172` |

**Anti-pattern:** "Don't use border-radius beyond 16px (rounded-2xl). No 'blob' cards." — `design-tokens.md:217`.

---

## Shadows / elevations

| Token | Value | Use | Source |
|---|---|---|---|
| shadow-sm | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation, default cards | `assets/colors_and_type.css:106`, `design-tokens.md:179` |
| shadow | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Standard elevation, dropdowns | `assets/colors_and_type.css:107`, `design-tokens.md:180` |
| shadow-md | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Hover states on cards | `assets/colors_and_type.css:108`, `design-tokens.md:181` |
| shadow-lg | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Modals, important overlays | `assets/colors_and_type.css:109`, `design-tokens.md:182` |
| shadow-orange | `0 6px 14px -4px rgb(224 123 57 / 0.35)` | Glow on orange CTA buttons (signature effect) | `assets/colors_and_type.css:110`, `design-tokens.md:183` |
| shadow-blue | `0 6px 14px -4px rgb(27 58 107 / 0.25)` | Glow on blue-deep panels | `assets/colors_and_type.css:111`, `design-tokens.md:184` |

---

## Motion (durations, easings, named transitions)

| Token | Value | Use | Source |
|---|---|---|---|
| transition-fast | `150ms ease` | Hover effects | `assets/colors_and_type.css:114`, `design-tokens.md:190` |
| transition-base | `200ms ease` | Default for state changes | `assets/colors_and_type.css:115`, `design-tokens.md:191` |
| transition-slow | `300ms ease` | Modal transitions, drawer slides | `assets/colors_and_type.css:116`, `design-tokens.md:192` |

**Named keyframes:**
- `pulse` — `assets/styles.css:134` — `0%,100% { opacity: 1; } 50% { opacity: .4; }`. Used on `.pill.live::before` (live-status dot pulse), 2s `cubic-bezier(.4,0,.6,1)` infinite.

---

## Breakpoints

**Not defined in brand/.** Only `--container-xl: 1280px` is declared (`assets/colors_and_type.css:118`) — a max-width container, not a breakpoint set. Mockup files use ad-hoc media queries (e.g., `@media (max-width: 1024px)`, `@media (max-width: 580px)` in `AM_Hostels_Booking_System.html:135-136`) without a shared scale.

> Flagged in `10-open-questions.md`.

---

## Z-index scale

**Not defined in brand/.** No z-index tokens in `colors_and_type.css`. `styles.css` does not assign explicit z-index values either.

---

## Iconography rules

- **Icon library file:** `assets/_icons.html` — single SVG sprite of ~50 lucide-style icons (`<symbol id="i-*">`).
- **Icon names** (from `_icons.html:10-65`): `i-grid`, `i-building`, `i-users`, `i-coins`, `i-file`, `i-chart`, `i-cog`, `i-bell`, `i-search`, `i-plus`, `i-download`, `i-upload`, `i-check`, `i-check-circle`, `i-x`, `i-alert`, `i-alert-circle`, `i-eye`, `i-edit`, `i-clock`, `i-bed`, `i-arrow-{up,down,left,right}`, `i-chev-{down,left,right}`, `i-hard-hat`, `i-map-pin`, `i-phone`, `i-mail`, `i-message`, `i-package`, `i-shield`, `i-shield-check`, `i-sparkle`, `i-trend`, `i-trend-down`, `i-list`, `i-cards`, `i-map`, `i-filter`, `i-camera`, `i-tool`, `i-zap`, `i-google`, `i-pdf`, `i-excel`, `i-globe`, `i-lock`, `i-pen`, `i-flame`, `i-pulse`, `i-bot`, `i-mic`.
- **Default styles:** stroke=currentColor, stroke-width=2, fill=none, linecap=round, linejoin=round (`assets/styles.css:8`).
- **Sizes:** `.i` 18×18 (default), `.i-sm` 14×14, `.i-md` 20×20, `.i-lg` 24×24 (`assets/styles.css:8-11`).
- **Pick rule:** `brand/README.md:51` — "Pick icons from `assets/_icons.html` — copy the SVG `<symbol>` you need."

---

## Logo usage rules

- **Brand mark:** 🏗 (construction crane emoji) — used as a functional mark, not decoration (`design-tokens.md:13-15`, `IRON_RULES.md:127`).
- **Brand name:** עוז (Hebrew) / Oz (Latin). **NOT** "WorkerHome" — that's just the URL (`design-tokens.md:20`, `IRON_RULES.md:125-128`).
- **Forbidden variations:** "OzPlatform", "Oz Tech", or any invented variation (`design-tokens.md:20`, `IRON_RULES.md:128`).
- **Lockup:** `.brand` class shows orange-square 🏗 emoji + extrabold "עוז" text in the sidebar (`assets/styles.css:19-22`, `components.md:43-44`).
- **No logo files in editable format** (Illustrator, Figma) live in this folder; they are kept in the design workspace (`brand/README.md:85`).

---

## Direction (RTL)

- `body { direction: rtl; }` is the default — `assets/colors_and_type.css:127`.
- Hebrew is primary; LTR is secondary for technical contexts (`design-tokens.md:17, 196-208`).
- For mixed Hebrew/English content: tabular numerals (`font-variant-numeric: tabular-nums`, utility class `.tnum` in `assets/styles.css:259`); explicit LTR via `dir="ltr"` on inline elements.
- **IRON_RULE 5** — "RTL is non-negotiable" (`docs/IRON_RULES.md:61-69`).

---

## Anti-patterns (don't do these)

From `design-tokens.md:212-218`:
- ❌ Don't use orange for non-CTA elements — it dilutes the CTA.
- ❌ Don't introduce a 5th brand color. The palette is 7. (Status colors red/amber are separate, not brand.)
- ❌ Don't mix Heebo with random fonts. Stick to Heebo + Assistant fallback.
- ❌ Don't use border-radius beyond 16px (rounded-2xl). No "blob" cards.
- ❌ Don't use color alone to communicate state. Always pair with text/icon (a11y).
