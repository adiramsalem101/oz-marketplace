# 04e — Brand Components

Source: `../worker-housing-platform/docs/brand/components.md` + `assets/styles.css` + mockups.
Per component: name · source files · variants · states · RTL notes.

---

## Layout

### App shell (`.app`)
- **Source:** `assets/styles.css:14-15`, `components.md:24-27`
- **What:** Two-column grid: sidebar (248px) + main content area; default for authenticated dashboard pages.
- **Variants:** `.app.compact` (220px sidebar)
- **States:** none
- **RTL:** native — uses `grid-template-columns` which respects logical block flow; sidebar appears on the right in RTL.
- **Mockup:** `corporate_assets_mvp.html`

### Main content area (`.main`)
- **Source:** `assets/styles.css:46`, `components.md:29-30`
- **What:** Padded content region inside `.app`. Default padding `22px 28px 60px`.
- **States:** none
- **RTL:** padding is symmetrical horizontally — no logical-property issues.

### Topbar (`.topbar`)
- **Source:** `assets/styles.css:47-50`, `components.md:32-33`
- **What:** Sticky header at the top of `.main`. Contains H1, subtitle, and right-aligned action buttons.
- **States:** none
- **RTL:** `justify-content: space-between` works in RTL natively.

### Column grids (`.cols-2`, `.cols-3`, `.cols-12`)
- **Source:** `assets/styles.css:95-97`
- **What:** `.cols-2` = 2fr/1fr; `.cols-3` = 3 equal; `.cols-12` = 1fr/1fr.
- **RTL:** native.

---

## Navigation

### Sidebar (`.side`)
- **Source:** `assets/styles.css:18`, `components.md:39-41`
- **What:** Blue-deep (`#1B3A6B`) sidebar with brand mark, tenant switcher, nav links, and user widget at the bottom.
- **RTL:** appears on the right in RTL via the `.app` grid.
- **Mockup:** `corporate_assets_mvp.html`, `corporate_assets_full.html`

### Brand mark (`.brand`)
- **Source:** `assets/styles.css:19-22`, `components.md:43-44`
- **What:** 🏗 + "עוז" lockup at the top of the sidebar. Orange square (`.o`) holds the emoji; extrabold "עוז" text.
- **States:** none

### Tenant switcher (`.tenant`)
- **Source:** `assets/styles.css:23-28`, `components.md:46-47`
- **What:** Dropdown showing the currently active company/tenant. Dark-background card with company logo (`.logo`), label, business name, chevron.
- **States:** hover (cursor: pointer)

### Nav link (`.nav-link`)
- **Source:** `assets/styles.css:32-37`, `components.md:49-51`
- **Variants:** with `.badge`, `.badge.alert` (red counter)
- **States:** default (muted), hover (subtle white background), `.active` (orange background + shadow + bold)
- **RTL:** `.badge` uses `margin-inline-start: auto` — fully RTL-aware.

### Top tabs (`.tabs`, `.tab`)
- **Source:** `assets/styles.css:67-72`, `components.md:53-55`
- **What:** Horizontal tab strip used inside dashboard pages. Active tab gets a blue-deep underline.
- **Variants:** with `.badge` (gray default; blue-soft when active)
- **States:** default, hover, `.active`
- **RTL:** native.
- **Used in:** Corporate dashboard 7 tabs (Overview, Properties, Workers, Contracts, Reports, AI Import, Settings)

### User widget (`.me`)
- **Source:** `assets/styles.css:39-43`
- **What:** Bottom-of-sidebar widget with avatar (`.av` green), user name (`.who`), role (`.role`).

---

## KPIs & data display

### KPI card (`.kpi`)
- **Source:** `assets/styles.css:75-92`, `components.md:61-66`
- **Layout grids:** `.kpis.k4`, `.kpis.k5`, `.kpis.k6`
- **Icon variants:** `.ic.green`, `.ic.orange`, `.ic.red`, `.ic.amber`, `.ic.violet`
- **Delta variants:** `.delta.up` (green), `.delta.down` (red), `.delta.flat` (gray)
- **States:** none
- **RTL:** `.ic` is positioned `top:14px; left:14px` — flagged: `left` is physical, not logical (`inset-inline-end` would be RTL-correct). In RTL the icon appears on the wrong side. **Bug to fix in rebuild.** See `10-open-questions.md`.
- **Mockup:** `corporate_assets_full.html`

### Panel (`.panel`)
- **Source:** `assets/styles.css:98-107`, `components.md:68-72`
- **Variants:** `.panel.pad` (with default padding), `.panel.dark` (blue-deep bg, white text)
- **Internal header:** `.ph` with H2 + subtitle + actions
- **States:** none

### Activity feed (`.feed`)
- **Source:** `assets/styles.css:159-168`, `components.md:74-75`
- **What:** Vertical list of timestamped events. Each item: icon + text + relative time ("3 דקות").
- **Icon variants:** `.ic.green`, `.ic.alert` (red), `.ic.amber`, `.ic.gray`
- **States:** last item has no bottom border.

### Charts
- **Bar chart (`.chart-bars`):** `assets/styles.css:193-199`. Variants: `.b.orange`, `.b.green`, `.b.muted` (default blue-deep gradient).
- **Donut (`.donut`):** `assets/styles.css:202-205`. 140×140 with center value + label.
- **Sparkline (`.spark`):** `assets/styles.css:265`. 38px height inline.
- **X-axis labels (`.chart-x`):** `assets/styles.css:198-199`.

---

## Buttons

### Primary CTA (`.btn-cta`)
- **Source:** `assets/styles.css:57-59`, `components.md:86-87`
- **What:** Orange button. PRIMARY action only — never more than 1-2 per page.
- **States:** default, `:hover` (transform translateY(-1px) + darker), `:active` (scale 0.97)
- **Variants:** `.btn-cta.btn-mini` (small inline form)
- **RTL:** `gap` is logical — works.

### Ghost button (`.btn-ghost`)
- **Source:** `assets/styles.css:60-61`, `components.md:89-90`
- **What:** White bg, blue-deep border on hover. DEFAULT secondary action.
- **States:** default, hover (border + text → blue-deep)

### Blue button (`.btn-blue`)
- **Source:** `assets/styles.css:62-63`, `components.md:92-93`
- **What:** Blue-deep bg, white text. Navigational/structural actions.
- **States:** hover (darker blue)

### Small button (`.btn-sm`)
- **Source:** `assets/styles.css:64`, `components.md:95-96`
- **What:** Reduced-padding modifier for any button.

---

## Status & alerts

### Alert strip (`.alert-strip`)
- **Source:** `assets/styles.css:171-177`, `components.md:102-108`
- **Variants:** `.alert-strip.red` (errors), `.alert-strip.amber` (warnings), `.alert-strip.blue` (info)
- **Structure:** icon + title (`.t`) + description (`.d`)
- **States:** none

### Verified badge
- **Source:** `marketplace_ui_kit.html` (`.badge.ver`); also `.pill.green-deep` in `assets/styles.css:121`
- **What:** Pill-shaped badge with checkmark, green-deep bg, white text. "Verified Owner" / "Compliance approved".

### Tier badge
- **Source:** `components.md:114-116`
- **What:** Pill showing verification tier. Code currently uses A/B/C (legacy); spec says T1/T2 (current).
- **TODO:** migration A/B/C → T1/T2 (called out in components.md as pending).

### Trust band (`.trust`)
- **Source:** `marketplace_ui_kit.html`, `components.md:118-120`
- **What:** Full-width green-deep-soft strip with checkmark + statement, used to reinforce compliance messaging on listing pages.

### Pills (`.pill`)
- **Source:** `assets/styles.css:119-133`
- **Variants:** `.pill.compact`, `.pill.green-deep`, `.pill.green-soft`, `.pill.blue-deep`, `.pill.blue-soft`, `.pill.orange-soft`, `.pill.orange-deep`, `.pill.red-soft`, `.pill.amber-soft`, `.pill.gray`, `.pill.dot` (with leading dot), `.pill.live` (with pulsing green dot)
- **States:** `.pill.live` animates `pulse` keyframe
- **RTL:** `gap` is logical — works.

---

## Filters & chips

### Chip (`.chip`)
- **Source:** `assets/styles.css:181-184`, `components.md:126-130`
- **Variants:** default (white bg, gray border), `.chip.active` (blue-deep bg, white text), `.chip.ver` (green-deep bg)
- **States:** default, hover (border + text → blue-deep), active
- **Sub-element:** `.chip .x` (close icon, opacity 0.5)

### Chip container (`.chips`)
- **Source:** `assets/styles.css:180`
- **What:** flex-wrap container.

---

## Forms

### Field (`.field`)
- **Source:** `assets/styles.css:227-231`, `components.md:136-137`
- **What:** Label + input + hint text, vertical layout.
- **Sub-elements:** `label`, `input/select/textarea`, `.hint`
- **States:** `:focus` (blue-deep border + focus ring `0 0 0 3px rgba(27,58,107,.12)`)

### Search box (`.search`)
- **Source:** `assets/styles.css:52-54`, `components.md:139-140`
- **What:** Inline search input with magnifying-glass icon and `kbd` shortcut hint.
- **Width:** 280px default

---

## Steps wizard

### Steps (`.steps`, `.step`)
- **Source:** `assets/styles.css:234-243`, `components.md:146-148`
- **States:** default, `.active` (white bg, blue-deep border, focus ring), `.done` (green-deep bg + connector)
- **Sub-elements:** `.num` (circle with step number), `.lbl` (label), `.conn` (connector line)
- **RTL:** native flex — first step appears on the right in RTL.
- **Used in:** KYC flow, property publication wizard

---

## AI / Special elements

### AI banner (`.ai-banner`)
- **Source:** `assets/styles.css:211-217`, `components.md:155-157`
- **What:** Blue-deep gradient panel with sparkle icon. Surfaces AI-powered features.
- **Sub-elements:** `.icbox` (white-translucent icon container with backdrop-filter blur), `.body`, `h3`, `p`, `.btn-cta`
- **Decorative:** radial-gradient orange overlay at 90% horizontally
- **Mockup:** `corporate_assets_full.html` (AI Import tab)

### NotebookLM template card (`.nblm-template`)
- **Source:** `assets/styles.css:219-224`, `components.md:159-160`
- **What:** Quick-action card with violet icon. For "open in NotebookLM" exports.
- **States:** hover (border → blue-deep, shadow-md)

---

## Marketplace-specific

### Listing card (`.card` in marketplace context)
- **Source:** `assets/styles.css:187-189`, `components.md:166-171`
- **Structure:** Image area (16:10) with badges → body (title + meta + price) → footer (CTA + ghost icon button)
- **Variants:** `.card.outline` (no shadow), `.card.elevated` (shadow-md); image gradient varies by category (blue-deep / green / gray)
- **Mockup:** `marketplace_ui_kit.html`

### Hero section (`.hero`)
- **Source:** `marketplace_ui_kit.html`, `components.md:173-175`
- **What:** Blue-deep full-width section with eyebrow pill, headline, lead paragraph, CTA pair.

### Search bar (`.searchbar`)
- **Source:** `marketplace_ui_kit.html`, `components.md:177-179`
- **What:** White rounded container floating below the hero, with location + bed-count + price + CTA inputs.

### Property row (`.row-prop`)
- **Source:** `assets/styles.css:144-147`
- **What:** Compact horizontal row with thumbnail + title + meta. Used in tables/feeds.

---

## Mobile-specific

### Field card (`.field-card`)
- **Source:** `assets/styles.css:246`, `components.md:185-186`
- **What:** Blue-deep gradient card with rounded 24px corners. For mobile contexts where information needs to stand out.

---

## Tables

### Table (`table.tbl`)
- **Source:** `assets/styles.css:110-116`
- **Sub-elements:** `thead th` (uppercase eyebrow style), `tbody td`, `.tbl tbody tr:hover` (light gray), `.tbl .num` (tabular-nums + bold), `.tbl .num.strong` (extrabold)
- **States:** row hover
- **RTL:** `text-align: right` is set explicitly — needs `text-align: end` for full RTL/LTR adaptability. **Flagged.**

---

## Avatars

### Avatar (`.av`)
- **Source:** `assets/styles.css:137-141`
- **Sizes:** default 32px, `.sm` 26px, `.lg` 44px
- **Stack (`.av-stack`):** overlapping avatars with `margin-inline-end: -8px` (RTL-aware ✓)

---

## Progress / occupancy bars

### Bar (`.bar`)
- **Source:** `assets/styles.css:150-156`
- **Variants:** default (blue-deep fill), `.bar.green`, `.bar.orange`, `.bar.red`
- **Companion:** `.bar-row` (flex with `.lbl` showing tabular-num percentage on the end)

---

## Misc / utilities

### Card (`.card`) — generic
- **Source:** `assets/styles.css:187-189` — distinct from marketplace listing card. Generic 16px-padded white container with optional `.outline` and `.elevated`.

### Flag (`.flag`)
- **Source:** `assets/styles.css:208` — 22×16 colored rectangle for country flags (worker rows).

### Utility classes
- `.flex`, `.row`, `.col`, `.gap-2/3/4`, `.space`, `.muted`, `.faint`, `.b`, `.xb`, `.t-xs/sm/md/lg/xl/2xl`, `.center`, `.tnum`, `.right`, `.divider`, `.divider.v` — `assets/styles.css:249-262`

### Icon system (`.i`, `.i-sm`, `.i-md`, `.i-lg`)
- **Source:** `assets/styles.css:8-11`. Stroke-based, lucide-style. See 04d for the full icon list and rules.

---

## Pulse keyframe

- **Source:** `assets/styles.css:134` — `@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }`. Used by `.pill.live::before` for "live" status indicator.

---

## Component-level RTL audit (issues found)

| Component | Issue | Source |
|---|---|---|
| `.kpi .ic` | `top: 14px; left: 14px;` — physical `left` instead of logical `inset-inline-end` for RTL | `assets/styles.css:80` |
| `.tbl thead th` | `text-align: right` — should be `end` | `assets/styles.css:111` |
| `.search input` | inline `padding-left/right` not seen — OK |  |
| `.brand .sub`, `.tenant .label` | use `letter-spacing` only — OK |  |

> All issues will need fixing in the rebuild's SCSS modules. Most of the system is already RTL-aware (`margin-inline-start`, logical `gap`, `direction: rtl` on body) — these are isolated bugs, not systemic.

---

## Cross-references

- **Tokens:** `04d-brand-tokens-extracted.md`
- **Iron rule:** `IRON_RULES.md` Rule 9 (Brand identity)
- **Icon library:** `04d-brand-tokens-extracted.md` (Iconography rules section)
- **Mockup index:** see Mockup index in `brand/components.md:194-205` (also reproduced in `04a-brand-overview.md`)
