# oz-marketplace · PROMPT_LIBRARY

**Status:** Phase 0 ready · Phases 1–9 stubbed
**Generated:** 2026-05-02
**Owner:** Adir
**Companion to:** `docs/BUILD_PLAN.md` (CP-1 decisions, locked)

---

## How to use this file

Each phase below is a self-sufficient prompt for Claude Code. To execute a phase:

1. Open Claude Code in the `oz-marketplace` repo root.
2. Type:
   > Read the front-matter and §Phase N of `docs/PROMPT_LIBRARY.md`. Execute Phase N.
3. Wait for Claude Code to reach the phase's checkpoint, run its self-tests, and stop.
4. Review the self-test output and the staged commit. If satisfied, type **`continue`**. If not, fix and rerun.

Each phase ends in a checkpoint that **must** be cleared before the next phase begins. Don't skip ahead.

The front-matter applies to every phase. Read it once, then re-read whenever a phase begins.

---

# FRONT-MATTER (governance)

## §F.1 — Reading order before any phase

Before executing **any** phase, read these in order:

1. This front-matter (§F.1 through §F.6).
2. `docs/BUILD_PLAN.md` — the source of truth for decisions, scales, architecture, naming.
3. The specific phase section (§Phase N).
4. Any files the phase section names as inputs.

Do not start work until all four have been read. Do not assume context from prior phases — each phase's prompt is the contract for that phase.

## §F.2 — Project framing

oz-marketplace is a **new project inspired by `worker-housing-platform` (legacy)**. It is not a rebuild, refactor, port, or migration of the legacy codebase.

- Specs, brand, and schema design are **inputs taken from** the legacy project. Code is not.
- The legacy repo is **reference material**, never "the previous version of this project".
- When generating prose in any doc, frame phases and features as **build**, not **rebuild**.
- Do not write "as before", "like in the old project", or "as the legacy did". Describe what oz-marketplace does, in its own voice.
- Use the words "rebuild", "refactor", "migration", or "port" only for narrow technical contexts (e.g., "porting brand SCSS into the token system"), never as project-level framing.

## §F.3 — Naming alignment (DB → code → component)

Database column names are canonical across all layers. Do not invent friendlier aliases for column-driven UI.

| DB column | TS type | Component | Module file |
|---|---|---|---|
| `listings.verification_level` | `VerificationLevel` | `<VerificationLevelBadge>` | `VerificationLevelBadge.module.scss` |
| `profiles.role` (`user_role` enum) | `UserRole` | `<RoleBadge>` | `RoleBadge.module.scss` |
| `hostel_bookings.status` | `HostelBookingStatus` | `<HostelBookingStatusPill>` | `HostelBookingStatusPill.module.scss` |

When a new column drives UI, the same pattern applies: the column name stays canonical across DB, TS types, components, and SCSS modules. Hebrew UI labels are independent and follow the brand glossary; English-language symbols stay aligned with DB.

## §F.4 — Checkpoint protocol (self-test then stop)

When a phase reaches a checkpoint:

1. Run the phase's defined self-tests in order.
2. Capture all self-test output verbatim.
3. Print a checkpoint banner of this exact form:
   ```
   ═══════════════════════════════════════════
   PHASE N COMPLETE — CHECKPOINT CP-X REACHED
   ═══════════════════════════════════════════
   ```
4. Print the self-test results in this format:
   ```
   SELF-TEST RESULTS
   - <test 1 name>: PASS|FAIL — <one-line detail>
   - <test 2 name>: PASS|FAIL — <one-line detail>
   ...
   ```
5. If any test failed, do not commit. Print the failure(s) prominently and exit per §F.5.
6. If all tests passed, stage the work but **do not commit**. Print the proposed commit message and the list of staged files. Wait for the user to type `continue` (which means "commit and exit") or `revise <instructions>` (which means "amend before committing").
7. After the user's `continue`, perform the commit, then exit.

Do not proceed to the next phase under any circumstances. Each phase requires a fresh invocation.

## §F.5 — Failure mode (stop immediately)

When the phase encounters a problem you cannot resolve from the prompt and the linked inputs:

1. Stop work. Do not attempt creative workarounds.
2. Print a failure banner of this exact form:
   ```
   ═══════════════════════════════════════════
   PHASE N HALTED — UNRESOLVABLE ISSUE
   ═══════════════════════════════════════════
   ```
3. Print:
   - **What you were trying to do** (one line)
   - **What went wrong** (verbatim error output if any)
   - **What you've already tried** (bullet list, if anything)
   - **What you need from the user** (concrete question)
4. Do not commit. Do not stage. Leave the working directory in whatever state the failure left it.
5. Exit.

Half-done phases are worse than stopped ones. If you are unsure whether something is in scope, stop and ask.

## §F.6 — Output discipline

- Do not narrate every step. Run commands; print output. Speak only at section boundaries, errors, and the checkpoint.
- Do not announce what you're about to do. Do it.
- When a step has multiple substeps, batch them. One bash call per logical unit, not per command.
- When writing files, write them in full. Do not stub-and-fill. Do not leave TODOs except where the prompt explicitly says "placeholder".
- When asked to read a file, read it fully before acting on it. Don't grep for keywords and assume.

---

# §Phase 0 — Scaffold + token system + docs skeleton

## §0.1 — Goal

Stand up an empty but fully scaffolded Next.js 16 project with: TypeScript, App Router, no Tailwind, no `src/`, Hebrew RTL root layout, the full SCSS token system, fonts and icon sprite ported from the legacy brand assets, merged `.env.local` + `.env.example`, empty Supabase scaffold, and a fresh `docs/` hierarchy populated with what we know today.

This phase ends at **CP-2** — the user reviews tokens, RTL, and typography rendering before any component is built.

## §0.2 — Inputs

- `docs/BUILD_PLAN.md` — the source of truth for every decision, scale, naming convention, and architecture choice. Read it cover-to-cover before doing anything.
- `.env.local` (at repo root) — already provided by the user. Source of env values for the merge step.
- `recon/` — read-only reference. Especially relevant: `recon/04d-brand-tokens-extracted.md`, `recon/04e-brand-components.md`, `recon/06-legacy-schema.md`, `recon/08-integrations.md`, `recon/09-hostel-booking-engine.md`.
- `../worker-housing-platform/docs/` — sibling repo, read-only. Especially: `IRON_RULES.md`, `brand/assets/fonts/`, `brand/assets/_icons.html`, `brand/assets/colors_and_type.css` (reference only — do not copy verbatim, the SCSS token system in §0.7 is the canonical source).

## §0.3 — Pre-flight checks

Before scaffolding anything, verify the environment. If any check fails, halt per §F.5.

```bash
# Working directory
test "$(basename "$PWD")" = "oz-marketplace" || { echo "FAIL: not in oz-marketplace"; exit 1; }

# BUILD_PLAN.md exists and is non-empty
test -s docs/BUILD_PLAN.md || { echo "FAIL: docs/BUILD_PLAN.md missing or empty"; exit 1; }

# .env.local exists at repo root
test -f .env.local || { echo "FAIL: .env.local missing at repo root"; exit 1; }

# recon/ exists with expected files
test -f recon/04d-brand-tokens-extracted.md || { echo "FAIL: recon outputs missing"; exit 1; }

# Legacy sibling repo accessible
test -d ../worker-housing-platform/docs/brand || { echo "FAIL: ../worker-housing-platform/docs/brand not found"; exit 1; }

# Node version (Next.js 16 requires Node 18.18+)
node -v | grep -E '^v(1[89]|[2-9][0-9])' > /dev/null || { echo "FAIL: Node 18.18+ required"; exit 1; }

# npm available
command -v npm >/dev/null || { echo "FAIL: npm not found"; exit 1; }

# Git initialized, no commits yet
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "FAIL: not a git repo"; exit 1; }

echo "PRE-FLIGHT OK"
```

## §0.4 — Run create-next-app

Use the current directory. Pass all flags explicitly so no interactive prompt appears.

```bash
npx create-next-app@latest . \
  --typescript \
  --eslint \
  --no-tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm \
  --yes
```

If `create-next-app` errors due to existing files (e.g., a `README.md` it tries to create), inspect the conflict, decide whether the existing file should win, and retry — never delete user-provided files (`docs/BUILD_PLAN.md`, `.env.local`, `recon/`, `.claude/`, `.idea/`).

After it finishes:

- Delete the auto-generated `app/page.tsx` and `app/globals.css` — we'll author our own.
- Delete `public/*.svg` (the default Next.js logos) — we'll add our own assets.

## §0.5 — Install additional dependencies

```bash
npm install sass @supabase/supabase-js @supabase/ssr zod
```

Verify `package.json` lists these under `dependencies`.

## §0.6 — Update `.gitignore`

Append the following to the existing `.gitignore` (do not duplicate entries already present):

```gitignore
# Local env (gitignored — see .env.example for the template)
.env.local
.env*.local

# IDE
.idea/

# Claude
.claude/settings.local.json
```

## §0.7 — Create the `/styles/` token system

Create directory `styles/` at repo root. Write the eight files below verbatim.

### `styles/_tokens.scss`

```scss
@use "sass:map";

// ═════════════════════════════════════════════════════════════════
// DESIGN TOKENS — single source of truth for all visual values
// Sourced from worker-housing-platform/docs/brand/ + BUILD_PLAN §4
// ═════════════════════════════════════════════════════════════════

// ───── Colors ─────
$colors: (
  // Brand core 7
  ink:               #1E1E2E,
  bg-soft:           #F7F8FA,
  orange:            #E07B39,
  green-light:       #52A375,
  green-deep:        #206A4F,
  blue-light:        #205FA8,
  blue-deep:         #1B3A6B,

  // Brand hover/pressed
  orange-hover:      #C26A2C,
  orange-soft:       rgba(224, 123, 57, 0.1),
  blue-deep-hover:   #15305A,
  green-deep-soft:   rgba(32, 106, 79, 0.1),

  // Legacy support (kept for backwards compat per BUILD_PLAN)
  blue-bg-soft:      #D2E5FA,

  // Foreground
  fg-default:        #1E1E2E,
  fg-muted:          #6B7280,
  fg-faint:          #9CA3AF,
  fg-on-dark:        #FFFFFF,
  fg-on-cta:         #FFFFFF,

  // Borders
  border-default:    #E5E7EB,
  border-strong:     #D1D5DB,
  border-accent:     #1B3A6B,

  // Neutrals
  white:             #FFFFFF,
  black:             #000000,
  gray-50:           #F9FAFB,
  gray-100:          #F3F4F6,
  gray-200:          #E5E7EB,
  gray-300:          #D1D5DB,
  gray-400:          #9CA3AF,
  gray-500:          #6B7280,
  gray-600:          #4B5563,
  gray-700:          #374151,
  gray-800:          #1F2937,
  gray-900:          #111827,

  // Status (outside the 7-color brand palette)
  red-500:           #EF4444,
  red-600:           #DC2626,
  amber-500:         #F59E0B,
  amber-50:          #FFFBEB,
);

// ───── Spacing (4px base, mobile-first) ─────
$space: (
  0:  0,
  1:  0.25rem,   // 4px
  2:  0.5rem,    // 8px
  3:  0.75rem,   // 12px
  4:  1rem,      // 16px
  5:  1.25rem,   // 20px
  6:  1.5rem,    // 24px
  7:  2rem,      // 32px
  8:  2.5rem,    // 40px
  9:  3rem,      // 48px
  10: 4rem,      // 64px
  11: 5rem,      // 80px
  12: 6rem,      // 96px
);

// ───── Breakpoints (mobile-first, Tailwind-aligned) ─────
$breakpoints: (
  sm:  640px,
  md:  768px,
  lg:  1024px,
  xl:  1280px,
  2xl: 1536px,
);

// ───── Z-index (gapped for insertion) ─────
$z-index: (
  base:           0,
  dropdown:       10,
  sticky:         20,
  drawer:         30,
  modal-backdrop: 40,
  modal:          50,
  toast:          60,
  top:            999,  // escape hatch — always comment why
);

// ───── Radii ─────
$radii: (
  sm:   0.125rem,  // 2px
  base: 0.25rem,   // 4px
  md:   0.375rem,  // 6px
  lg:   0.5rem,    // 8px
  xl:   0.75rem,   // 12px (CTA buttons)
  2xl:  1rem,      // 16px (canonical card)
  full: 9999px,
);

// ───── Shadows ─────
$shadows: (
  sm:     (0 1px 2px 0 rgb(0 0 0 / 0.05)),
  base:   (0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)),
  md:     (0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)),
  lg:     (0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)),
  orange: (0 6px 14px -4px rgb(224 123 57 / 0.35)),  // signature CTA glow
  blue:   (0 6px 14px -4px rgb(27 58 107 / 0.25)),
);

// ───── Motion ─────
$motion: (
  fast: 150ms ease,
  base: 200ms ease,
  slow: 300ms ease,
);

// ───── Typography ─────
$font-families: (
  sans: ('Heebo', 'Assistant', 'Segoe UI', Arial, sans-serif),
);

$font-sizes: (
  xs:   0.75rem,    // 12
  sm:   0.875rem,   // 14
  base: 1rem,       // 16
  lg:   1.125rem,   // 18
  xl:   1.25rem,    // 20
  2xl:  1.5rem,     // 24
  3xl:  1.875rem,   // 30
  4xl:  2.25rem,    // 36
  5xl:  3rem,       // 48
);

$font-weights: (
  normal:    400,
  medium:    500,
  semibold:  600,
  bold:      700,
  extrabold: 800,
);

$line-heights: (
  tight:   1.25,
  normal:  1.5,
  relaxed: 1.625,
);

$tracking: (
  tight:  -0.025em,
  normal: 0,
  wider:  0.05em,
);

// ═════════════════════════════════════════════════════════════════
// ACCESSORS — public API for consuming modules
// Usage: @use "@/styles/tokens" as t; .x { color: t.color(orange); }
// ═════════════════════════════════════════════════════════════════

@function color($name)        { @return map.get($colors, $name); }
@function space($n)           { @return map.get($space, $n); }
@function bp($name)           { @return map.get($breakpoints, $name); }
@function z($name)            { @return map.get($z-index, $name); }
@function radius($name)       { @return map.get($radii, $name); }
@function shadow($name)       { @return map.get($shadows, $name); }
@function motion($name)       { @return map.get($motion, $name); }
@function font-family($name)  { @return map.get($font-families, $name); }
@function font-size($name)    { @return map.get($font-sizes, $name); }
@function font-weight($name)  { @return map.get($font-weights, $name); }
@function leading($name)      { @return map.get($line-heights, $name); }
@function tracking($name)     { @return map.get($tracking, $name); }
```

### `styles/_mixins.scss`

```scss
@use "tokens" as t;

// ───── Mobile-first breakpoint mixin ─────
// Usage: @include from(t.bp(md)) { ... }
@mixin from($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// ───── Focus ring (accessibility) ─────
@mixin focus-ring($color: t.color(blue-deep)) {
  outline: 2px solid $color;
  outline-offset: 2px;
}

// ───── Truncate text with ellipsis ─────
@mixin truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// ───── RTL physical-mirror flip ─────
// For the rare cases where we need to mirror something physically
// (e.g., chevron arrows that should point opposite in RTL).
// Most components should use logical properties instead.
@mixin rtl-flip {
  [dir="rtl"] & {
    transform: scaleX(-1);
  }
}

// ───── Visually hidden (a11y, screen-reader-only) ─────
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### `styles/_reset.scss`

```scss
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

### `styles/_typography.scss`

```scss
@use "tokens" as t;

html {
  font-size: 16px; // base for rem
}

body {
  direction: rtl; // IRON_RULE 5 — RTL is non-negotiable
  font-family: t.font-family(sans);
  font-size: t.font-size(base);
  font-weight: t.font-weight(normal);
  line-height: t.leading(normal);
  color: t.color(fg-default);
  background-color: t.color(bg-soft);
}

h1 {
  font-size: t.font-size(4xl);
  font-weight: t.font-weight(extrabold);
  line-height: t.leading(tight);
  letter-spacing: t.tracking(tight);
  color: t.color(ink);
}

h2 {
  font-size: t.font-size(3xl);
  font-weight: t.font-weight(bold);
  line-height: t.leading(tight);
  color: t.color(ink);
}

h3 {
  font-size: t.font-size(lg);
  font-weight: t.font-weight(bold);
  color: t.color(ink);
}

p {
  font-size: t.font-size(base);
  line-height: t.leading(normal);
  color: t.color(gray-600);
}

small {
  font-size: t.font-size(xs);
  color: t.color(gray-500);
}

.oz-eyebrow {
  font-size: t.font-size(sm);
  font-weight: t.font-weight(bold);
  color: t.color(gray-400);
  text-transform: uppercase;
  letter-spacing: t.tracking(wider);
}
```

### `styles/_fonts.scss`

Read `../worker-housing-platform/docs/brand/assets/fonts/fonts.css` and port its `@font-face` declarations into this file. Key adjustments:

- Update every `url(...)` path to `url('/fonts/<filename>')` (Next.js public folder).
- Preserve `unicode-range` declarations (Hebrew vs. Latin subsets).
- Preserve `font-display: swap`.
- Drop any declarations for fonts we don't ship in `public/fonts/` — only Heebo and Assistant for MVP.

If `fonts.css` has IBM Plex Sans Hebrew or Rubik declarations, omit them.

### `styles/_utilities.scss`

```scss
@use "tokens" as t;

.flex   { display: flex; }
.row    { display: flex; flex-direction: row; }
.col    { display: flex; flex-direction: column; }
.center { display: flex; align-items: center; justify-content: center; }
.right  { text-align: end; } // RTL-aware

.gap-1  { gap: t.space(1); }
.gap-2  { gap: t.space(2); }
.gap-3  { gap: t.space(3); }
.gap-4  { gap: t.space(4); }
.gap-5  { gap: t.space(5); }
.gap-6  { gap: t.space(6); }

.muted  { color: t.color(fg-muted); }
.faint  { color: t.color(fg-faint); }

.b      { font-weight: t.font-weight(bold); }
.xb     { font-weight: t.font-weight(extrabold); }

.t-xs   { font-size: t.font-size(xs); }
.t-sm   { font-size: t.font-size(sm); }
.t-base { font-size: t.font-size(base); }
.t-lg   { font-size: t.font-size(lg); }
.t-xl   { font-size: t.font-size(xl); }
.t-2xl  { font-size: t.font-size(2xl); }

.tnum   { font-variant-numeric: tabular-nums; }

.divider {
  height: 1px;
  background: t.color(border-default);
  margin: t.space(4) 0;

  &.v {
    width: 1px;
    height: auto;
    margin: 0 t.space(4);
  }
}
```

### `styles/_functions.scss`

For now this file is reserved for future helpers (color manipulation, etc.). Create it as:

```scss
// Reserved for future SCSS helper functions.
// Token accessors (color, space, bp, etc.) live in _tokens.scss.
```

### `styles/globals.scss`

```scss
@use "fonts";
@use "reset";
@use "typography";
@use "utilities";
```

## §0.8 — Set up Hebrew RTL root layout

### `app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'עוז',
  description: 'פלטפורמה לאיוש מגורי עובדים זרים בישראל',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
```

### `app/page.tsx` (placeholder homepage — visual sanity check for CP-2)

```tsx
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.brand}>🏗 עוז</span>
        <span className={styles.tag}>Phase 0 · Scaffold OK</span>
      </header>

      <section className={styles.hero}>
        <h1>שלום, עולם</h1>
        <p>עוז · פלטפורמת מגורים לעובדים זרים</p>
      </section>

      <section className={styles.tokens}>
        <h2>בדיקת טוקנים</h2>
        <div className={styles.swatches}>
          <span className={`${styles.swatch} ${styles.ink}`}>Ink</span>
          <span className={`${styles.swatch} ${styles.orange}`}>Orange CTA</span>
          <span className={`${styles.swatch} ${styles.greenDeep}`}>Green Deep</span>
          <span className={`${styles.swatch} ${styles.blueDeep}`}>Blue Deep</span>
        </div>
        <button className={styles.cta}>כפתור CTA לדוגמה</button>
      </section>
    </main>
  );
}
```

### `app/page.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.main {
  min-height: 100vh;
  padding: t.space(6);
  display: flex;
  flex-direction: column;
  gap: t.space(8);

  @include m.from(t.bp(md)) {
    padding: t.space(10);
    max-width: 1280px;
    margin-inline: auto;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: t.space(4);
}

.brand {
  font-size: t.font-size(2xl);
  font-weight: t.font-weight(extrabold);
  color: t.color(ink);
}

.tag {
  font-size: t.font-size(sm);
  color: t.color(green-deep);
  font-weight: t.font-weight(bold);
}

.hero h1 {
  font-size: t.font-size(4xl);
  margin-bottom: t.space(3);

  @include m.from(t.bp(md)) {
    font-size: t.font-size(5xl);
  }
}

.tokens {
  display: flex;
  flex-direction: column;
  gap: t.space(4);
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: t.space(3);
}

.swatch {
  padding: t.space(3) t.space(4);
  border-radius: t.radius(lg);
  font-weight: t.font-weight(bold);
  color: t.color(white);

  &.ink        { background: t.color(ink); }
  &.orange     { background: t.color(orange); }
  &.greenDeep  { background: t.color(green-deep); }
  &.blueDeep   { background: t.color(blue-deep); }
}

.cta {
  align-self: flex-start;
  padding: t.space(3) t.space(5);
  background: t.color(orange);
  color: t.color(fg-on-cta);
  border-radius: t.radius(xl);
  font-weight: t.font-weight(bold);
  box-shadow: t.shadow(orange);
  transition: t.motion(fast);

  &:hover {
    background: t.color(orange-hover);
    transform: translateY(-1px);
  }
}
```

## §0.9 — Port fonts

Copy woff2 files from the legacy brand assets:

```bash
mkdir -p public/fonts
cp ../worker-housing-platform/docs/brand/assets/fonts/Heebo-*.woff2 public/fonts/
cp ../worker-housing-platform/docs/brand/assets/fonts/Assistant-*.woff2 public/fonts/
```

Verify each file exists and is non-empty. The `_fonts.scss` declarations from §0.7 must reference filenames that actually exist in `public/fonts/`.

## §0.10 — Port icon sprite

Read `../worker-housing-platform/docs/brand/assets/_icons.html`. It contains `<symbol id="i-*">` definitions inside an SVG. Construct a single sprite at `public/icons.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="i-grid" viewBox="0 0 24 24">...</symbol>
  <symbol id="i-building" viewBox="0 0 24 24">...</symbol>
  <!-- all other symbols, verbatim -->
</svg>
```

Then create the Icon primitive:

### `components/primitives/Icon/Icon.tsx`

```tsx
import styles from './Icon.module.scss';

type IconSize = 'sm' | 'base' | 'md' | 'lg';

export interface IconProps {
  name: string;        // e.g. "grid", "building" — without the "i-" prefix
  size?: IconSize;
  className?: string;
  'aria-label'?: string;
}

export function Icon({
  name,
  size = 'base',
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  const isDecorative = !ariaLabel;
  return (
    <svg
      className={`${styles.icon} ${styles[size]} ${className ?? ''}`}
      aria-hidden={isDecorative}
      aria-label={ariaLabel}
      role={isDecorative ? undefined : 'img'}
    >
      <use href={`/icons.svg#i-${name}`} />
    </svg>
  );
}
```

### `components/primitives/Icon/Icon.module.scss`

```scss
.icon {
  display: inline-block;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sm   { width: 14px; height: 14px; }
.base { width: 18px; height: 18px; }
.md   { width: 20px; height: 20px; }
.lg   { width: 24px; height: 24px; }
```

## §0.11 — Merge `.env.local` and create `.env.example`

Read the existing `.env.local` at repo root. Apply the rules below to produce a merged `.env.local` and a sanitized `.env.example`.

**Canonical structure** (target schema):

```env
# ───── Supabase ─────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ───── Twilio (SMS OTP) ─────
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_OTP_FROM_NUMBER=

# ───── HelloSign (e-sign) ─────
HELLOSIGN_API_KEY=
HELLOSIGN_CLIENT_ID=
HELLOSIGN_WEBHOOK_SECRET=

# ───── Pelecard (payments — IRON_RULE 2: only allowed provider) ─────
PELECARD_TERMINAL_NUMBER=
PELECARD_API_USER=
PELECARD_API_PASSWORD=
PELECARD_ENV=test     # test | live

# ───── Resend (transactional email) ─────
RESEND_API_KEY=

# ───── Anthropic Claude (AI Import) ─────
ANTHROPIC_API_KEY=

# ───── Cron secrets ─────
CRON_SECRET=
```

**Merge rules** (apply per variable):

1. If the variable is **present in legacy `.env.local` with a value**: keep that line in the merged `.env.local` with its value; in `.env.example` write the same variable name with empty value.
2. If the variable is **present in legacy `.env.local` empty**: keep empty in `.env.local`; in `.env.example` write empty.
3. If the variable is **absent from legacy `.env.local`**: add it as a comment in **both** files, like `# RESEND_API_KEY=  (not yet set — see docs/INTEGRATIONS.md)`.

Variables in legacy `.env.local` that are **not** in the canonical structure: keep them in the merged `.env.local` under a `# ───── Legacy / unclassified ─────` section at the bottom, but do **not** add them to `.env.example`. This preserves any in-flight integrations the user knows about that recon didn't catch.

Write both files. Do not commit `.env.local` (it's gitignored). Stage `.env.example`.

## §0.12 — Supabase scaffold

```bash
mkdir -p supabase/migrations
touch supabase/migrations/.gitkeep
```

Write `supabase/config.toml` with the minimal default project structure. Use `supabase init` if it works without requiring auth:

```bash
npx -y supabase init --workdir . 2>/dev/null || cat > supabase/config.toml <<'EOF'
project_id = "oz-marketplace"

[api]
enabled = true
port = 54321

[db]
port = 54322
shadow_port = 54320

[studio]
enabled = true
port = 54323

[auth]
enabled = true
site_url = "http://localhost:3000"
EOF
```

## §0.13 — Write `docs/` (skip `BUILD_PLAN.md` — already exists)

Create the docs hierarchy per BUILD_PLAN §7. **Never overwrite `docs/BUILD_PLAN.md`.**

For each file below, use the spec to write actual content. For files marked "placeholder", write only the file header and a one-line note that the content is filled in a later phase.

### `docs/README.md`

Project entry point. Sections: project description (one paragraph, OZ vision), stack, environments (local / staging / production URLs — leave URL placeholders for now with a note that staging URL is per-PR Vercel Preview), how to run locally (`.env.local` setup, `npm install`, `npm run dev`), how to contribute (read BUILD_PLAN, follow PROMPT_LIBRARY phases), pointer to docs/IRON_RULES.md.

### `docs/IRON_RULES.md`

Read `../worker-housing-platform/docs/IRON_RULES.md` and port the 9 rules verbatim. Adjust paths/URLs only where they refer to the legacy repo. Add a header note: `Authoritative — these rules govern all phases of oz-marketplace.`

### `docs/DECISIONS_LOG.md`

Port the legacy `DECISIONS_LOG.md` from `../worker-housing-platform/docs/`, keeping every historical decision. Then append a new section dated 2026-05-02 titled **"CP-1 decisions (BUILD_PLAN §3)"** that logs each locked decision from BUILD_PLAN §3.A and §3.B as a one-line entry: OQ number, decision, one-sentence rationale.

### `docs/GLOSSARY.md`

Port the legacy `GLOSSARY.md` and apply these terminology fixes:

- Replace any reference to `verification_tier A/B/C` with `verification_level 1/2/3`.
- Replace any reference to a `property_owners` table with `owners`.
- Add an entry for `verification_level` per BUILD_PLAN §3.D.
- Add an entry for the new `user_role` enum values per BUILD_PLAN §3.B.

### `docs/SCHEMA.md` (placeholder)

Write a header and:

```markdown
# SCHEMA

> **Placeholder.** Filled during Phase 3 (Auth & RLS foundation) and expanded in Phases 4 and 6.
> The legacy schema is captured verbatim in `recon/06-legacy-schema.md` for reference; the
> oz-marketplace schema is built fresh per BUILD_PLAN §3.B.
```

### `docs/ROLES_AND_RLS.md` (placeholder)

```markdown
# ROLES & RLS

> **Placeholder.** Filled during Phase 3.
> The new role enum is `('b2c_owner', 'corporate_member', 'b2b_owner', 'admin')` per
> BUILD_PLAN §3.B (OQ-3 + OQ-4). Cross-cutting tenant-isolation patterns are captured in
> `recon/07-roles-and-rls.md`.
```

### `docs/INTEGRATIONS.md`

Read `recon/08-integrations.md` and port it. Apply BUILD_PLAN §3.A overrides:

- **AI Import:** Anthropic Claude (Haiku model). Drop the Gemini reference.
- **Email:** Resend, confirmed.
- **Neema:** marked deferred to Phase 9.
- **Crons:** list only `health-check`, `vercel-monitor`, `qa-checks`.

### `docs/HOSTEL_BOOKING_ENGINE.md`

Read `recon/09-hostel-booking-engine.md` and port it verbatim. Adjust the four hostel slugs to kebab-case per BUILD_PLAN §3.B (OQ-17): `jerusalem`, `tel-aviv`, `haifa`, `tiberias`. Keep IRON_RULE 1 isolation rules verbatim.

### `docs/TASKS.md`

Write fresh per BUILD_PLAN §8. Do not port any content from the legacy `TASKS.md`. Use today's date for the "Started" field of Phase 0:

```markdown
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

## Future-roadmap (Phase 9+)
- [ ] Neema integration (OQ-15)
- [ ] Virtual tour
- [ ] Other items from docs/specs/dreams/
```

### `docs/specs/B2B_MVP.md`, `docs/specs/B2C_MVP.md`, `docs/specs/DEMAND_SIDE.md` (placeholders)

Each placeholder: H1 + one-line note that the content is filled when the matching feature phase begins (B2B_MVP → Phase 4; B2C_MVP → Phase 5; DEMAND_SIDE → Phase 4 alongside B2B).

### `docs/specs/dreams/B2B_DREAMS.md`, `B2C_DREAMS.md`, `BOOKING_SYSTEM_DREAMS.md`, `VIRTUAL_TOUR_SPECS.md` (placeholders)

Each placeholder header includes the line:

```markdown
> **STATUS:** future-roadmap, not-MVP. See BUILD_PLAN §6 Phase 9.
```

## §0.14 — Self-tests (CP-2 gate)

Run each test below. Capture verbatim output. Report PASS/FAIL per §F.4.

### Test 1 — Build passes

```bash
npm run build
```

PASS iff exit code 0 and no error output.

### Test 2 — Dev server boots and serves Hebrew RTL

```bash
npm run dev &
DEV_PID=$!
sleep 8
HTML=$(curl -fsS http://localhost:3000)
kill $DEV_PID 2>/dev/null
```

PASS iff:

- `curl` exit 0
- `$HTML` contains `lang="he"`
- `$HTML` contains `dir="rtl"`
- `$HTML` contains `🏗 עוז` or `עוז`
- `$HTML` contains `שלום, עולם`

### Test 3 — Token system compiles cleanly

```bash
ls styles/*.scss
npx sass styles/globals.scss /tmp/oz-globals-check.css --no-source-map 2>&1
```

PASS iff exit 0 and the resulting CSS file is non-empty.

### Test 4 — Fonts ported

```bash
ls public/fonts/Heebo-*.woff2 public/fonts/Assistant-*.woff2
```

PASS iff at least one of each family exists and is non-empty.

### Test 5 — Icon sprite ported

```bash
test -s public/icons.svg
grep -c '<symbol' public/icons.svg
```

PASS iff the file is non-empty and contains at least 30 `<symbol>` declarations.

### Test 6 — Env files

```bash
test -s .env.local
test -s .env.example
grep -q 'ANTHROPIC_API_KEY' .env.example
grep -q 'PELECARD_' .env.example
grep -q 'NEXT_PUBLIC_SUPABASE_URL' .env.example
```

PASS iff all checks succeed.

### Test 7 — Docs scaffold

```bash
test -s docs/BUILD_PLAN.md
test -s docs/IRON_RULES.md
test -s docs/DECISIONS_LOG.md
test -s docs/INTEGRATIONS.md
test -s docs/HOSTEL_BOOKING_ENGINE.md
test -s docs/TASKS.md
test -d docs/specs/dreams
```

PASS iff all checks succeed.

### Test 8 — `.gitignore` correctness

```bash
git check-ignore .env.local
```

PASS iff exit 0 (file is ignored).

## §0.15 — Commit (after user types `continue`)

Stage everything except `.env.local`. Confirm by listing staged files. Then commit:

```
phase 0: scaffold + token system + docs skeleton

- next.js 16 app router, typescript, scss only (no tailwind)
- /styles/ token system per BUILD_PLAN §4–§5 (mobile-first, RTL)
- hebrew RTL root layout
- fonts + icon sprite ported from brand
- .env.local merged from legacy; .env.example committed as template
- supabase scaffold (config.toml + empty migrations/)
- docs/ skeleton: README, IRON_RULES, DECISIONS_LOG (with CP-1 entries),
  GLOSSARY, INTEGRATIONS, HOSTEL_BOOKING_ENGINE, TASKS, specs/

Reaches CP-2.
```

After commit, print the closing checkpoint banner per §F.4 and exit.

---

# §Phase 1 — Primitives

## §1.1 — Goal

Build nine primitive components that the rest of the application is assembled from. Each primitive is a self-contained unit (`.tsx` + `.module.scss` + `.types.ts`) that consumes the token system from Phase 0 and exposes a small, opinionated API. All nine render together on one demo page for visual review.

This phase ends at **CP-1.5** — the user reviews every primitive in every variant, at three breakpoints (375 / 768 / 1280px), before Phase 2 (layout) begins.

## §1.2 — Inputs

- `docs/BUILD_PLAN.md` — naming alignment (§5.E), folder structure (§5.B), token system (§4).
- `docs/PROMPT_LIBRARY.md` front-matter (§F.1–§F.6) — governance and checkpoint protocol.
- `recon/04e-brand-components.md` — every primitive's source-of-truth styling, variants, states, and known RTL bugs to fix during the port.
- `../worker-housing-platform/docs/brand/assets/styles.css` — original CSS for each component (lines cited in `04e`).
- `../worker-housing-platform/docs/brand/components.md` — component-by-component spec.
- `recon/brand/mockups/01-corporate.md` and `recon/brand/mockups/02-marketplace.md` — see primitives in context.

## §1.3 — Pre-flight checks

Before writing any component code, verify Phase 0 landed cleanly. If any check fails, halt per §F.5.

```bash
test "$(basename "$PWD")" = "oz-marketplace" || { echo "FAIL: not in oz-marketplace"; exit 1; }
test -d styles && test -s styles/_tokens.scss || { echo "FAIL: token system missing"; exit 1; }
test -d components/primitives/Icon || { echo "FAIL: Phase 0 Icon primitive missing"; exit 1; }
test -s docs/BUILD_PLAN.md || { echo "FAIL: BUILD_PLAN missing"; exit 1; }
git log --oneline | grep -q "phase 0" || { echo "FAIL: phase 0 commit not found"; exit 1; }
git diff --quiet || { echo "FAIL: working tree dirty — commit or stash before Phase 1"; exit 1; }
echo "PRE-FLIGHT OK"
```

## §1.4 — Component manifest

Build these nine primitives in order. Each is specified in §1.5–§1.13 below. **Read the full sub-section for a primitive before writing its files.**

| # | Component | Source in legacy | RTL fixes | Driven by DB column? |
|---|---|---|---|---|
| 1 | `Button` | `styles.css:57-64`, `components.md:86-96` | none | no |
| 2 | `Input` | `styles.css:227-231`, `components.md:136-137` | none | no |
| 3 | `Card` | `styles.css:187-189`, `components.md:166-171` | none | no |
| 4 | `Pill` | `styles.css:119-133` | none | no |
| 5 | `Chip` | `styles.css:181-184`, `components.md:126-130` | none | no |
| 6 | `Badge` | mockup HTML (`.badge`, `.badge.alert`, `.badge.ver`) | none | no |
| 7 | `VerificationLevelBadge` | mockup HTML (`.badge.ver`) + BUILD_PLAN §3.D | none | **yes** — `listings.verification_level` |
| 8 | `Avatar` | `styles.css:137-141` | `margin-inline-end` for stack (already correct) | no |
| 9 | `ProgressBar` | `styles.css:150-156` | none | no |

Naming alignment (BUILD_PLAN §F.3 / §5.E): the only column-driven primitive in this phase is `VerificationLevelBadge`, which reads `listings.verification_level` (1 | 2 | 3). Stay aligned.

## §1.5 — Button

### Files

```
components/primitives/Button/
├── Button.tsx
├── Button.module.scss
└── Button.types.ts
```

### `Button.types.ts`

```ts
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'cta' | 'ghost' | 'blue';
export type ButtonSize    = 'sm' | 'base';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  fullWidth?: boolean;
}
```

### `Button.tsx`

```tsx
import { forwardRef } from 'react';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'ghost',
    size = 'base',
    iconStart,
    iconEnd,
    fullWidth = false,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {iconStart ? <span className={styles.iconStart}>{iconStart}</span> : null}
      <span className={styles.label}>{children}</span>
      {iconEnd ? <span className={styles.iconEnd}>{iconEnd}</span> : null}
    </button>
  );
});
```

### `Button.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: t.space(2);
  border-radius: t.radius(xl);
  font-weight: t.font-weight(bold);
  transition: t.motion(fast);
  cursor: pointer;
  border: 1px solid transparent;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    @include m.focus-ring();
  }
}

.iconStart, .iconEnd, .label {
  display: inline-flex;
  align-items: center;
}

// ───── Sizes ─────
.size-sm {
  padding: t.space(2) t.space(3);
  font-size: t.font-size(sm);
}
.size-base {
  padding: t.space(3) t.space(5);
  font-size: t.font-size(base);
}

// ───── Variants ─────
.variant-cta {
  background: t.color(orange);
  color: t.color(fg-on-cta);
  box-shadow: t.shadow(orange);

  &:hover:not(:disabled) {
    background: t.color(orange-hover);
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: scale(0.97);
  }
}

.variant-ghost {
  background: t.color(white);
  color: t.color(fg-default);
  border-color: t.color(border-default);

  &:hover:not(:disabled) {
    border-color: t.color(blue-deep);
    color: t.color(blue-deep);
  }
}

.variant-blue {
  background: t.color(blue-deep);
  color: t.color(fg-on-dark);

  &:hover:not(:disabled) {
    background: t.color(blue-deep-hover);
  }
}

.fullWidth {
  width: 100%;
}
```

## §1.6 — Input

### Files

```
components/primitives/Input/
├── Input.tsx
├── Input.module.scss
└── Input.types.ts
```

### `Input.types.ts`

```ts
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  invalid?: boolean;
  fullWidth?: boolean;
}
```

### `Input.tsx`

```tsx
import { forwardRef, useId } from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, invalid, fullWidth, className, id, ...rest },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const hasError = invalid || Boolean(error);

  const wrapperClasses = [
    styles.field,
    fullWidth && styles.fullWidth,
    hasError && styles.invalid,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label ? <label htmlFor={inputId} className={styles.label}>{label}</label> : null}
      <input
        ref={ref}
        id={inputId}
        className={styles.input}
        aria-invalid={hasError || undefined}
        aria-describedby={error || hint ? `${inputId}-help` : undefined}
        {...rest}
      />
      {(error || hint) && (
        <span id={`${inputId}-help`} className={error ? styles.error : styles.hint}>
          {error ?? hint}
        </span>
      )}
    </div>
  );
});
```

### `Input.module.scss`

```scss
@use "@/styles/tokens" as t;

.field {
  display: inline-flex;
  flex-direction: column;
  gap: t.space(2);
}

.fullWidth {
  display: flex;
  width: 100%;
}

.label {
  font-size: t.font-size(sm);
  font-weight: t.font-weight(semibold);
  color: t.color(fg-default);
}

.input {
  width: 100%;
  padding: t.space(3) t.space(4);
  border: 1px solid t.color(border-default);
  border-radius: t.radius(lg);
  background: t.color(white);
  color: t.color(fg-default);
  font-size: t.font-size(base);
  transition: t.motion(fast);

  &::placeholder {
    color: t.color(fg-faint);
  }

  &:focus {
    outline: none;
    border-color: t.color(blue-deep);
    box-shadow: 0 0 0 3px rgb(27 58 107 / 0.12);
  }

  &:disabled {
    background: t.color(gray-100);
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.hint  { font-size: t.font-size(xs); color: t.color(fg-muted); }
.error { font-size: t.font-size(xs); color: t.color(red-600); }

.invalid .input {
  border-color: t.color(red-500);

  &:focus {
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.18);
  }
}
```

## §1.7 — Card

### Files

```
components/primitives/Card/
├── Card.tsx
├── Card.module.scss
└── Card.types.ts
```

### `Card.types.ts`

```ts
import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'outline' | 'elevated';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  as?: 'div' | 'article' | 'section';
  padded?: boolean;
  children?: ReactNode;
}
```

### `Card.tsx`

```tsx
import styles from './Card.module.scss';
import type { CardProps } from './Card.types';

export function Card({
  variant = 'default',
  as: Tag = 'div',
  padded = true,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [
    styles.card,
    styles[`variant-${variant}`],
    padded && styles.padded,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
```

### `Card.module.scss`

```scss
@use "@/styles/tokens" as t;

.card {
  background: t.color(white);
  border-radius: t.radius(2xl);
  border: 1px solid transparent;
}

.padded {
  padding: t.space(4);
}

.variant-default  { box-shadow: t.shadow(sm); }
.variant-outline  { box-shadow: none; border-color: t.color(border-default); }
.variant-elevated { box-shadow: t.shadow(md); }
```

## §1.8 — Pill

A pill is a small rounded label. Used for status, tags, counts, "live" indicators.

### Files

```
components/primitives/Pill/
├── Pill.tsx
├── Pill.module.scss
└── Pill.types.ts
```

### `Pill.types.ts`

```ts
import type { HTMLAttributes, ReactNode } from 'react';

export type PillTone =
  | 'gray'
  | 'green-deep'
  | 'green-soft'
  | 'blue-deep'
  | 'blue-soft'
  | 'orange-deep'
  | 'orange-soft'
  | 'red-soft'
  | 'amber-soft';

export type PillSize = 'sm' | 'base';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  size?: PillSize;
  live?: boolean;
  iconStart?: ReactNode;
  children: ReactNode;
}
```

### `Pill.tsx`

```tsx
import styles from './Pill.module.scss';
import type { PillProps } from './Pill.types';

export function Pill({
  tone = 'gray',
  size = 'base',
  live = false,
  iconStart,
  className,
  children,
  ...rest
}: PillProps) {
  const classes = [
    styles.pill,
    styles[`tone-${tone}`],
    styles[`size-${size}`],
    live && styles.live,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {live ? <span className={styles.dot} aria-hidden /> : null}
      {iconStart ? <span className={styles.iconStart}>{iconStart}</span> : null}
      <span>{children}</span>
    </span>
  );
}
```

### `Pill.module.scss`

```scss
@use "@/styles/tokens" as t;

.pill {
  display: inline-flex;
  align-items: center;
  gap: t.space(1);
  border-radius: t.radius(full);
  font-weight: t.font-weight(semibold);
  white-space: nowrap;
}

.iconStart { display: inline-flex; }

.size-sm   { padding: 2px t.space(2);    font-size: t.font-size(xs); }
.size-base { padding: t.space(1) t.space(3); font-size: t.font-size(sm); }

// ───── Tones ─────
.tone-gray         { background: t.color(gray-100);       color: t.color(gray-700); }
.tone-green-deep   { background: t.color(green-deep);     color: t.color(white); }
.tone-green-soft   { background: t.color(green-deep-soft); color: t.color(green-deep); }
.tone-blue-deep    { background: t.color(blue-deep);      color: t.color(white); }
.tone-blue-soft    { background: t.color(blue-bg-soft);   color: t.color(blue-deep); }
.tone-orange-deep  { background: t.color(orange);         color: t.color(white); }
.tone-orange-soft  { background: t.color(orange-soft);    color: t.color(orange); }
.tone-red-soft     { background: rgb(239 68 68 / 0.12);   color: t.color(red-600); }
.tone-amber-soft   { background: t.color(amber-50);       color: t.color(amber-500); }

// ───── Live indicator ─────
.live .dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: t.radius(full);
  background: t.color(green-light);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
```

## §1.9 — Chip

A chip is a filter or tag, optionally with a close (×) action. Distinct from `Pill` because it's interactive.

### Files

```
components/primitives/Chip/
├── Chip.tsx
├── Chip.module.scss
└── Chip.types.ts
```

### `Chip.types.ts`

```ts
import type { HTMLAttributes, ReactNode, MouseEventHandler } from 'react';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  verified?: boolean;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}
```

### `Chip.tsx`

```tsx
import styles from './Chip.module.scss';
import type { ChipProps } from './Chip.types';

export function Chip({
  active = false,
  verified = false,
  onRemove,
  className,
  children,
  ...rest
}: ChipProps) {
  const classes = [
    styles.chip,
    active && styles.active,
    verified && styles.verified,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      <span>{children}</span>
      {onRemove ? (
        <button
          type="button"
          className={styles.remove}
          aria-label="הסרה"
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
```

### `Chip.module.scss`

```scss
@use "@/styles/tokens" as t;

.chip {
  display: inline-flex;
  align-items: center;
  gap: t.space(2);
  padding: t.space(2) t.space(3);
  border-radius: t.radius(full);
  background: t.color(white);
  color: t.color(fg-default);
  border: 1px solid t.color(border-default);
  font-size: t.font-size(sm);
  font-weight: t.font-weight(medium);
  cursor: pointer;
  transition: t.motion(fast);

  &:hover {
    border-color: t.color(blue-deep);
    color: t.color(blue-deep);
  }
}

.active {
  background: t.color(blue-deep);
  color: t.color(fg-on-dark);
  border-color: t.color(blue-deep);

  &:hover {
    color: t.color(fg-on-dark);
  }
}

.verified {
  background: t.color(green-deep);
  color: t.color(fg-on-dark);
  border-color: t.color(green-deep);

  &:hover {
    color: t.color(fg-on-dark);
  }
}

.remove {
  background: none;
  border: none;
  padding: 0;
  font-size: t.font-size(base);
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;

  &:hover { opacity: 1; }
}
```

## §1.10 — Badge

A counter badge — typically attached to a nav item or tab to show unread count. Smaller and more numeric than a Pill.

### Files

```
components/primitives/Badge/
├── Badge.tsx
├── Badge.module.scss
└── Badge.types.ts
```

### `Badge.types.ts`

```ts
import type { HTMLAttributes } from 'react';

export type BadgeTone = 'gray' | 'blue-soft' | 'alert';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  count: number;
  max?: number;        // e.g. 99 → renders "99+" past that
}
```

### `Badge.tsx`

```tsx
import styles from './Badge.module.scss';
import type { BadgeProps } from './Badge.types';

export function Badge({ tone = 'gray', count, max = 99, className, ...rest }: BadgeProps) {
  if (count <= 0) return null;
  const display = count > max ? `${max}+` : String(count);

  const classes = [styles.badge, styles[`tone-${tone}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {display}
    </span>
  );
}
```

### `Badge.module.scss`

```scss
@use "@/styles/tokens" as t;

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 t.space(2);
  border-radius: t.radius(full);
  font-size: t.font-size(xs);
  font-weight: t.font-weight(bold);
  font-variant-numeric: tabular-nums;
}

.tone-gray      { background: t.color(gray-200);     color: t.color(gray-700); }
.tone-blue-soft { background: t.color(blue-bg-soft); color: t.color(blue-deep); }
.tone-alert     { background: t.color(red-500);      color: t.color(white); }
```

## §1.11 — VerificationLevelBadge

Column-driven primitive (BUILD_PLAN §3.D, §F.3). Reads `listings.verification_level` (1 | 2 | 3) and renders a tone-coded Pill.

### Files

```
components/primitives/VerificationLevelBadge/
├── VerificationLevelBadge.tsx
├── VerificationLevelBadge.module.scss
└── VerificationLevelBadge.types.ts
```

### `VerificationLevelBadge.types.ts`

```ts
export type VerificationLevel = 1 | 2 | 3;

export interface VerificationLevelBadgeProps {
  level: VerificationLevel;
  className?: string;
}
```

### `VerificationLevelBadge.tsx`

```tsx
import { Pill } from '../Pill/Pill';
import { Icon } from '../Icon/Icon';
import styles from './VerificationLevelBadge.module.scss';
import type { VerificationLevelBadgeProps } from './VerificationLevelBadge.types';

const TONE_BY_LEVEL = {
  1: 'gray',
  2: 'blue-soft',
  3: 'green-deep',
} as const;

const LABEL_BY_LEVEL = {
  1: 'רמת אימות 1',
  2: 'רמת אימות 2',
  3: 'רמת אימות 3',
} as const;

export function VerificationLevelBadge({ level, className }: VerificationLevelBadgeProps) {
  return (
    <Pill
      tone={TONE_BY_LEVEL[level]}
      size="base"
      iconStart={<Icon name="shield-check" size="sm" />}
      className={[styles.badge, className].filter(Boolean).join(' ')}
    >
      {LABEL_BY_LEVEL[level]}
    </Pill>
  );
}
```

If the icon name `shield-check` is not in `public/icons.svg`, swap to the closest available verification-related icon (e.g., `check`, `shield`, `verified`). Do not invent symbol IDs that don't exist in the sprite.

### `VerificationLevelBadge.module.scss`

```scss
// Reserved for level-specific overrides.
// All tone/size handling is delegated to Pill.
.badge {
  // intentionally empty — kept as a stable hook for future styling needs.
}
```

## §1.12 — Avatar

### Files

```
components/primitives/Avatar/
├── Avatar.tsx
├── Avatar.module.scss
└── Avatar.types.ts
```

### `Avatar.types.ts`

```ts
import type { HTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'base' | 'lg';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  name: string;            // used for initials and aria-label
  src?: string;
  size?: AvatarSize;
  tone?: 'green' | 'blue' | 'orange' | 'gray';
}
```

### `Avatar.tsx`

```tsx
import styles from './Avatar.module.scss';
import type { AvatarProps } from './Avatar.types';

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

export function Avatar({
  name,
  src,
  size = 'base',
  tone = 'green',
  className,
  ...rest
}: AvatarProps) {
  const classes = [styles.avatar, styles[`size-${size}`], styles[`tone-${tone}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="img" aria-label={name} {...rest}>
      {src ? (
        <img src={src} alt="" className={styles.img} />
      ) : (
        <span aria-hidden>{initialsOf(name)}</span>
      )}
    </span>
  );
}
```

### `Avatar.module.scss`

```scss
@use "@/styles/tokens" as t;

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: t.radius(full);
  font-weight: t.font-weight(bold);
  color: t.color(fg-on-dark);
  overflow: hidden;
  flex-shrink: 0;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.size-sm   { width: 26px; height: 26px; font-size: t.font-size(xs); }
.size-base { width: 32px; height: 32px; font-size: t.font-size(sm); }
.size-lg   { width: 44px; height: 44px; font-size: t.font-size(base); }

.tone-green  { background: t.color(green-light); }
.tone-blue   { background: t.color(blue-light); }
.tone-orange { background: t.color(orange); }
.tone-gray   { background: t.color(gray-400); }
```

## §1.13 — ProgressBar

### Files

```
components/primitives/ProgressBar/
├── ProgressBar.tsx
├── ProgressBar.module.scss
└── ProgressBar.types.ts
```

### `ProgressBar.types.ts`

```ts
import type { HTMLAttributes } from 'react';

export type ProgressTone = 'blue' | 'green' | 'orange' | 'red';

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: number;       // 0–100
  tone?: ProgressTone;
  showLabel?: boolean;
  label?: string;      // optional override; defaults to "<value>%"
}
```

### `ProgressBar.tsx`

```tsx
import styles from './ProgressBar.module.scss';
import type { ProgressBarProps } from './ProgressBar.types';

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return n;
}

export function ProgressBar({
  value,
  tone = 'blue',
  showLabel = false,
  label,
  className,
  ...rest
}: ProgressBarProps) {
  const pct = clamp(value);
  const display = label ?? `${Math.round(pct)}%`;

  const classes = [styles.row, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className={`${styles.fill} ${styles[`tone-${tone}`]}`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel ? <span className={styles.label}>{display}</span> : null}
    </div>
  );
}
```

### `ProgressBar.module.scss`

```scss
@use "@/styles/tokens" as t;

.row {
  display: flex;
  align-items: center;
  gap: t.space(3);
  width: 100%;
}

.track {
  flex: 1;
  height: 8px;
  background: t.color(gray-200);
  border-radius: t.radius(full);
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: t.radius(full);
  transition: width t.motion(slow);
}

.tone-blue   { background: t.color(blue-deep); }
.tone-green  { background: t.color(green-deep); }
.tone-orange { background: t.color(orange); }
.tone-red    { background: t.color(red-500); }

.label {
  font-size: t.font-size(sm);
  font-variant-numeric: tabular-nums;
  color: t.color(fg-muted);
  min-width: 40px;
  text-align: end;  // RTL-aware
}
```

## §1.14 — Demo page

Build a single demo page that renders every primitive in every variant. This is the visual review surface for CP-1.5.

### Route

`app/(dev)/primitives/page.tsx`

The `(dev)` route group keeps developer-facing pages isolated from real product routes. Phase 0 already established the convention; if `app/(dev)/` does not exist, create it.

### `app/(dev)/primitives/page.tsx`

```tsx
import { Avatar } from '@/components/primitives/Avatar/Avatar';
import { Badge } from '@/components/primitives/Badge/Badge';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Chip } from '@/components/primitives/Chip/Chip';
import { Icon } from '@/components/primitives/Icon/Icon';
import { Input } from '@/components/primitives/Input/Input';
import { Pill } from '@/components/primitives/Pill/Pill';
import { ProgressBar } from '@/components/primitives/ProgressBar/ProgressBar';
import { VerificationLevelBadge } from '@/components/primitives/VerificationLevelBadge/VerificationLevelBadge';

import styles from './page.module.scss';

export const metadata = { title: 'עוז · Primitives Demo' };

export default function PrimitivesDemoPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>בדיקת רכיבי בסיס</h1>
        <p>Phase 1 · CP-1.5 review surface</p>
      </header>

      <Section title="Button">
        <Row label="variants">
          <Button variant="cta">CTA ראשי</Button>
          <Button variant="ghost">משני (ghost)</Button>
          <Button variant="blue">כחול</Button>
        </Row>
        <Row label="sizes">
          <Button variant="cta" size="sm">קטן</Button>
          <Button variant="cta" size="base">רגיל</Button>
        </Row>
        <Row label="states">
          <Button variant="cta">רגיל</Button>
          <Button variant="cta" disabled>מנוטרל</Button>
          <Button variant="cta" iconStart={<Icon name="plus" size="sm" />}>עם אייקון</Button>
        </Row>
      </Section>

      <Section title="Input">
        <Row label="variants">
          <Input label="שם מלא" placeholder="ישראלה ישראלי" />
          <Input label="עם רמז" placeholder="example@oz.co.il" hint="כתובת מייל לקבלת התראות" />
          <Input label="שגיאה" placeholder="" error="שדה חובה" />
          <Input label="מנוטרל" placeholder="" disabled defaultValue="—" />
        </Row>
      </Section>

      <Section title="Card">
        <Row label="variants">
          <Card variant="default">
            <h3>Default</h3>
            <p>צל קל · ברירת מחדל</p>
          </Card>
          <Card variant="outline">
            <h3>Outline</h3>
            <p>מסגרת בלבד · ללא צל</p>
          </Card>
          <Card variant="elevated">
            <h3>Elevated</h3>
            <p>צל בולט · להדגשת תוכן</p>
          </Card>
        </Row>
      </Section>

      <Section title="Pill">
        <Row label="tones">
          <Pill tone="gray">Gray</Pill>
          <Pill tone="green-deep">Green Deep</Pill>
          <Pill tone="green-soft">Green Soft</Pill>
          <Pill tone="blue-deep">Blue Deep</Pill>
          <Pill tone="blue-soft">Blue Soft</Pill>
          <Pill tone="orange-deep">Orange Deep</Pill>
          <Pill tone="orange-soft">Orange Soft</Pill>
          <Pill tone="red-soft">Red Soft</Pill>
          <Pill tone="amber-soft">Amber Soft</Pill>
        </Row>
        <Row label="live">
          <Pill tone="green-soft" live>פעיל עכשיו</Pill>
        </Row>
      </Section>

      <Section title="Chip">
        <Row label="states">
          <Chip>תל-אביב</Chip>
          <Chip active>נבחר</Chip>
          <Chip verified>מאומת</Chip>
          <Chip onRemove={() => undefined}>עם הסרה</Chip>
        </Row>
      </Section>

      <Section title="Badge">
        <Row label="tones">
          <Badge tone="gray" count={3} />
          <Badge tone="blue-soft" count={12} />
          <Badge tone="alert" count={147} />
          <Badge tone="alert" count={0} />
          <span className={styles.muted}>(count=0 לא מרונדר)</span>
        </Row>
      </Section>

      <Section title="VerificationLevelBadge">
        <Row label="levels">
          <VerificationLevelBadge level={1} />
          <VerificationLevelBadge level={2} />
          <VerificationLevelBadge level={3} />
        </Row>
      </Section>

      <Section title="Avatar">
        <Row label="sizes">
          <Avatar name="Adir Amsalem" size="sm" />
          <Avatar name="Adir Amsalem" size="base" />
          <Avatar name="Adir Amsalem" size="lg" />
        </Row>
        <Row label="tones">
          <Avatar name="Roi Alex" tone="green" />
          <Avatar name="Maya Levi" tone="blue" />
          <Avatar name="Dagan Aar" tone="orange" />
          <Avatar name="עוזי טסט" tone="gray" />
        </Row>
      </Section>

      <Section title="ProgressBar">
        <Row label="tones + values">
          <ProgressBar value={20} tone="blue" showLabel />
          <ProgressBar value={55} tone="green" showLabel />
          <ProgressBar value={80} tone="orange" showLabel />
          <ProgressBar value={95} tone="red" showLabel />
        </Row>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.rowItems}>{children}</div>
    </div>
  );
}
```

### `app/(dev)/primitives/page.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.page {
  min-height: 100vh;
  padding: t.space(6);
  display: flex;
  flex-direction: column;
  gap: t.space(8);

  @include m.from(t.bp(md)) {
    padding: t.space(10);
    max-width: 1280px;
    margin-inline: auto;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: t.space(2);

  h1 {
    font-size: t.font-size(3xl);
  }

  p {
    color: t.color(fg-muted);
    font-size: t.font-size(sm);
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: t.space(4);
  padding: t.space(6);
  background: t.color(white);
  border: 1px solid t.color(border-default);
  border-radius: t.radius(2xl);

  h2 {
    font-size: t.font-size(xl);
  }
}

.row {
  display: flex;
  flex-direction: column;
  gap: t.space(3);

  @include m.from(t.bp(md)) {
    flex-direction: row;
    align-items: flex-start;
    gap: t.space(6);
  }
}

.rowLabel {
  font-size: t.font-size(xs);
  font-weight: t.font-weight(bold);
  color: t.color(fg-faint);
  text-transform: uppercase;
  letter-spacing: t.tracking(wider);
  min-width: 100px;
  padding-block-start: t.space(2);
}

.rowItems {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: t.space(3);
  flex: 1;
}

.muted {
  color: t.color(fg-muted);
  font-size: t.font-size(sm);
}
```

## §1.15 — Self-tests (CP-1.5 gate)

Run each test below. Capture verbatim output. Report PASS/FAIL per §F.4.

### Test 1 — TypeScript compiles

```bash
npx tsc --noEmit
```

PASS iff exit 0 and no error output.

### Test 2 — Lint passes

```bash
npm run lint
```

PASS iff exit 0. (Warnings acceptable; errors are not.)

### Test 3 — Build passes

```bash
npm run build
```

PASS iff exit 0.

### Test 4 — All nine primitives present

```bash
for c in Button Input Card Pill Chip Badge VerificationLevelBadge Avatar ProgressBar; do
  test -f "components/primitives/$c/$c.tsx" || { echo "FAIL: $c.tsx missing"; exit 1; }
  test -f "components/primitives/$c/$c.module.scss" || { echo "FAIL: $c.module.scss missing"; exit 1; }
  test -f "components/primitives/$c/$c.types.ts" || { echo "FAIL: $c.types.ts missing"; exit 1; }
done
echo "ALL PRIMITIVES PRESENT"
```

PASS iff the loop completes without failing.

### Test 5 — Demo page renders without server-side errors

```bash
npm run dev > /tmp/oz-dev.log 2>&1 &
DEV_PID=$!
sleep 8
HTTP_CODE=$(curl -s -o /tmp/oz-demo.html -w "%{http_code}" http://localhost:3000/primitives)
kill $DEV_PID 2>/dev/null
```

PASS iff:

- `HTTP_CODE` = `200`
- `/tmp/oz-demo.html` contains every section title: `Button`, `Input`, `Card`, `Pill`, `Chip`, `Badge`, `VerificationLevelBadge`, `Avatar`, `ProgressBar`.
- `/tmp/oz-demo.html` contains `lang="he"` and `dir="rtl"`.
- `/tmp/oz-dev.log` contains no `Error:` or `Failed to compile` lines.

### Test 6 — VerificationLevelBadge naming alignment

```bash
grep -q 'verification_level' components/primitives/VerificationLevelBadge/VerificationLevelBadge.types.ts \
  || grep -q 'VerificationLevel' components/primitives/VerificationLevelBadge/VerificationLevelBadge.types.ts
```

PASS iff the type file references the canonical name. (Acceptance is loose because the TS type uses PascalCase `VerificationLevel`; the DB column is snake_case `verification_level`. Either confirms alignment.)

### Test 7 — No raw color values in primitive SCSS

Per BUILD_PLAN §5.B: "Modules `@use` the token/mixin layer; they never contain raw color values."

```bash
# Look for hex colors (#xxx, #xxxxxx) outside @use lines and comments
FOUND=$(grep -rEn '^[^/]*#[0-9a-fA-F]{3,8}\b' components/primitives \
  --include='*.module.scss' \
  | grep -v '^\s*//' \
  | grep -v '@use')
if [ -n "$FOUND" ]; then
  echo "FAIL: raw color literals in primitive SCSS:"
  echo "$FOUND"
  exit 1
fi
echo "NO RAW COLORS"
```

PASS iff no hex literals are found in primitive `.module.scss` files. (Inline `rgb(...)` calls used for focus rings inside the primitives are acceptable but should be rare — flag any to the user without failing the test.)

## §1.16 — Commit (after user types `continue`)

Stage all new files under `components/primitives/` and `app/(dev)/primitives/`. Confirm by listing staged files. Then commit with this message:

```
phase 1: nine primitive components + CP-1.5 demo page

- Button (3 variants, 2 sizes, icon slots)
- Input (label, hint, error, invalid, fullWidth)
- Card (default | outline | elevated; padded toggle)
- Pill (9 tones, 2 sizes, live indicator)
- Chip (active, verified, removable)
- Badge (3 tones, count + max overflow)
- VerificationLevelBadge (column-driven by listings.verification_level)
- Avatar (3 sizes, 4 tones, image or initials)
- ProgressBar (4 tones, optional label)

Demo page at app/(dev)/primitives/ renders all primitives at three
breakpoints (375 / 768 / 1280px) for CP-1.5 visual review.

Reaches CP-1.5.
```

After commit, print the closing checkpoint banner per §F.4 and exit.

---

# §Phase 2 — Layout & navigation

**Status:** stubbed.

**Goal:** Build `AppShell`, `Sidebar`, `Topbar`, `Tabs`, `BrandMark` per BUILD_PLAN §5.B and the brand mockups (`corporate_assets_mvp.html`, `corporate_assets_full.html`).

**Deliverables:** App shell wired into `app/(corporate)/layout.tsx`. Sidebar in correct RTL position. Topbar with H1/subtitle/actions slots. Tabs with badge variants. BrandMark with the 🏗 + עוז lockup.

---

# §Phase 3 — Auth & RLS foundation

**Status:** stubbed. Reaches **CP-3**.

**Goal:** Two Supabase migrations: (1) enums + `profiles` + `auth.users` trigger (persona-aware); (2) RLS skeleton.

**Deliverables:** Schema for the four roles per BUILD_PLAN §3.B. Persona-aware `handle_new_user()` trigger. Google OAuth + Twilio OTP flows under `app/(auth)/`. `verification_level` column landed (used by `VerificationLevelBadge` from Phase 1).

**Checkpoint:** CP-3 — migrations run on staging before any production deploy.

---

# §Phase 4 — Corporate dashboard (B2B)

**Status:** stubbed.

**Goal:** Build the 7-tab corporate dashboard from `corporate_assets_full.html`. KPI cards, activity feed, charts, alert strips, AI banner shell.

**Deliverables:** Migration for the corporate schema (companies, properties, workers, contracts, reports). Pages under `app/(corporate)/`. `docs/specs/B2B_MVP.md` and `DEMAND_SIDE.md` filled (porting from legacy specs with paths/URLs corrected).

---

# §Phase 5 — Marketplace (B2C)

**Status:** stubbed.

**Goal:** Build the public marketplace from `marketplace_ui_kit.html`. Hero, search bar, listing cards, trust band, filters. Owner onboarding KYC steps. Property publication wizard.

**Deliverables:** Migration for the listings/owner schema. Pages under `app/(marketplace)/`. `docs/specs/B2C_MVP.md` filled.

---

# §Phase 6 — Hostel booking engine (isolated)

**Status:** stubbed.

**Goal:** Replicate the legacy `hostel_bookings` schema with **zero FKs to corporate tables** (IRON_RULE 1). Drop all legacy/dead columns. Four hostels per BUILD_PLAN §3.A (OQ-16). Pelecard integration mirroring Pakal Nofesh.

**Deliverables:** Separate migration. Pages under `app/(hostels)/`. Pelecard server-side wiring. `docs/HOSTEL_BOOKING_ENGINE.md` extended with implementation details.

---

# §Phase 7 — Integrations

**Status:** stubbed.

**Goal:** Wire Twilio · HelloSign · Resend · Anthropic Claude (AI Import). Pelecard already in Phase 6.

**Deliverables:** Server-side clients in `lib/integrations/`. Webhook handlers under `app/api/webhooks/`. Edge functions for AI Import. `docs/INTEGRATIONS.md` extended with implementation details and runbook entries.

---

# §Phase 8 — Production readiness

**Status:** stubbed.

**Goal:** Polish for launch.

**Deliverables:** Real font weights ported (resolves OQ-20). Cron jobs landed (`health-check`, `vercel-monitor`, `qa-checks` per OQ-29). Visual regression review against `corporate_assets_full.html`, `marketplace_ui_kit.html`, `AM_Hostels_Booking_System.html` at 375/768/1280px. Lighthouse + a11y audit. Rate limits, monitoring, error tracking.

---

# §Phase 9 — Future-roadmap (NOT MVP)

**Status:** explicitly gated. Not entered until Adir greenlights.

**Goal:** Items deferred from MVP per BUILD_PLAN §6 Phase 9.

**Deliverables:** Neema integration (OQ-15), virtual tour, anything else flagged in `docs/specs/dreams/`.

---

*End of PROMPT_LIBRARY. Phase 0 ready to execute.*
