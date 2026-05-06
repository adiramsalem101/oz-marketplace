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

## §2.1 — Goal

Build the navigation chrome that wraps the corporate dashboard: a left-positioned sidebar (right-positioned in RTL) with brand mark, tenant switcher, nav links, and user widget; a topbar with H1, subtitle, and action slots; a tab strip; and a mobile-friendly drawer that the sidebar collapses into below `md`. All wired into a route-group layout under `app/(corporate)/`.

This phase ends at **CP-2.5** — visual review of the layout shell at 375 / 768 / 1280px before Phase 3 (Auth) begins.

## §2.2 — Inputs

- `docs/BUILD_PLAN.md` — naming alignment, folder structure, mobile-first + RTL strategy.
- `docs/PROMPT_LIBRARY.md` front-matter (§F.1–§F.6) — governance.
- `recon/04e-brand-components.md` — Layout, Navigation, and User-widget sections (lines covering `.app`, `.side`, `.topbar`, `.tabs`, `.brand`, `.tenant`, `.nav-link`, `.me`).
- `../worker-housing-platform/docs/brand/assets/styles.css` — original CSS for these components.
- `recon/brand/mockups/01-corporate.md` — `corporate_assets_mvp.html` and `corporate_assets_full.html`. The 7 nav items, 7 tab labels, and the user-widget structure all come from these mockups.
- `components/primitives/` from Phase 1 — `Icon`, `Avatar`, `Badge`, `Pill`. Reuse them; do not re-implement.

## §2.3 — Pre-flight checks

```bash
test "$(basename "$PWD")" = "oz-marketplace" || { echo "FAIL: not in oz-marketplace"; exit 1; }
test -d components/primitives/Icon || { echo "FAIL: Phase 0 Icon missing"; exit 1; }
test -d components/primitives/Avatar || { echo "FAIL: Phase 1 Avatar missing"; exit 1; }
test -d components/primitives/Badge || { echo "FAIL: Phase 1 Badge missing"; exit 1; }
git log --oneline | grep -q "phase 1" || { echo "FAIL: phase 1 commit not found"; exit 1; }
git diff --quiet || { echo "FAIL: working tree dirty"; exit 1; }
echo "PRE-FLIGHT OK"
```

## §2.4 — Component manifest

| # | Component | Source in legacy | Notes |
|---|---|---|---|
| 1 | `BrandMark` | `styles.css:19-22`, `corporate_assets_mvp.html` | 🏗 + עוז lockup, used in Sidebar header |
| 2 | `TenantSwitcher` | `styles.css:23-28` | Dark card with company logo + label + chevron; non-functional shell for now (no menu open behavior) |
| 3 | `NavLink` | `styles.css:32-37` | Single sidebar nav item with optional `Badge` |
| 4 | `UserWidget` | `styles.css:39-43` | Bottom-of-sidebar avatar + name + role |
| 5 | `Sidebar` | `styles.css:18`, mockups | Composes `BrandMark`, `TenantSwitcher`, nav list, `UserWidget` |
| 6 | `Topbar` | `styles.css:47-50` | Sticky header with `<h1>` slot, subtitle slot, actions slot |
| 7 | `Tabs` | `styles.css:67-72` | Horizontal strip with optional `Badge` per tab; active state |
| 8 | `MobileDrawer` | none — invented for mobile | Off-canvas drawer that holds the sidebar contents at < `md` |
| 9 | `AppShell` | `styles.css:14-15` | Top-level layout: sidebar (or drawer trigger) + main content |

## §2.5 — BrandMark

### Files

```
components/layout/BrandMark/
├── BrandMark.tsx
├── BrandMark.module.scss
└── BrandMark.types.ts
```

### `BrandMark.types.ts`

```ts
import type { HTMLAttributes } from 'react';

export interface BrandMarkProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'base' | 'lg';
}
```

### `BrandMark.tsx`

```tsx
import styles from './BrandMark.module.scss';
import type { BrandMarkProps } from './BrandMark.types';

export function BrandMark({ size = 'base', className, ...rest }: BrandMarkProps) {
  const classes = [styles.brand, styles[`size-${size}`], className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      <span className={styles.icon} aria-hidden>🏗</span>
      <span className={styles.name}>עוז</span>
    </span>
  );
}
```

### `BrandMark.module.scss`

```scss
@use "@/styles/tokens" as t;

.brand {
  display: inline-flex;
  align-items: center;
  gap: t.space(2);
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: t.color(orange);
  border-radius: t.radius(lg);
  color: t.color(white);
  line-height: 1;
}

.name {
  font-weight: t.font-weight(extrabold);
  letter-spacing: t.tracking(tight);
  color: t.color(white);
}

.size-sm   .icon { width: 24px; height: 24px; font-size: 14px; }
.size-sm   .name { font-size: t.font-size(base); }

.size-base .icon { width: 32px; height: 32px; font-size: 18px; }
.size-base .name { font-size: t.font-size(xl); }

.size-lg   .icon { width: 40px; height: 40px; font-size: 22px; }
.size-lg   .name { font-size: t.font-size(2xl); }
```

## §2.6 — TenantSwitcher

### Files

```
components/layout/TenantSwitcher/
├── TenantSwitcher.tsx
├── TenantSwitcher.module.scss
└── TenantSwitcher.types.ts
```

### `TenantSwitcher.types.ts`

```ts
import type { ButtonHTMLAttributes } from 'react';

export interface TenantSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tenantName: string;       // e.g. "AM Hostels"
  tenantLabel?: string;     // e.g. "ארגון" — small caption above name
  logoUrl?: string;         // optional; falls back to first-letter circle
}
```

### `TenantSwitcher.tsx`

```tsx
'use client';

import { Icon } from '@/components/primitives/Icon/Icon';
import styles from './TenantSwitcher.module.scss';
import type { TenantSwitcherProps } from './TenantSwitcher.types';

export function TenantSwitcher({
  tenantName,
  tenantLabel = 'ארגון',
  logoUrl,
  className,
  ...rest
}: TenantSwitcherProps) {
  const classes = [styles.tenant, className].filter(Boolean).join(' ');
  return (
    <button type="button" className={classes} {...rest}>
      <span className={styles.logo} aria-hidden>
        {logoUrl ? <img src={logoUrl} alt="" /> : tenantName.charAt(0)}
      </span>
      <span className={styles.body}>
        <span className={styles.label}>{tenantLabel}</span>
        <span className={styles.name}>{tenantName}</span>
      </span>
      <Icon name="chevron-down" size="sm" className={styles.chevron} aria-hidden />
    </button>
  );
}
```

### `TenantSwitcher.module.scss`

```scss
@use "@/styles/tokens" as t;

.tenant {
  display: flex;
  align-items: center;
  gap: t.space(3);
  width: 100%;
  padding: t.space(3);
  background: rgb(255 255 255 / 0.06);
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: t.radius(lg);
  color: t.color(white);
  cursor: pointer;
  transition: t.motion(fast);

  &:hover {
    background: rgb(255 255 255 / 0.1);
  }
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: t.radius(md);
  background: t.color(orange);
  font-weight: t.font-weight(extrabold);
  font-size: t.font-size(sm);
  flex-shrink: 0;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
}

.body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
}

.label {
  font-size: t.font-size(xs);
  color: rgb(255 255 255 / 0.6);
  text-transform: uppercase;
  letter-spacing: t.tracking(wider);
}

.name {
  font-size: t.font-size(sm);
  font-weight: t.font-weight(bold);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.chevron {
  color: rgb(255 255 255 / 0.6);
  flex-shrink: 0;
}
```

## §2.7 — NavLink

### Files

```
components/layout/NavLink/
├── NavLink.tsx
├── NavLink.module.scss
└── NavLink.types.ts
```

### `NavLink.types.ts`

```ts
import type { ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  icon: string;            // Icon name from sprite
  label: string;
  active?: boolean;        // controlled by parent based on pathname
  badgeCount?: number;
  badgeAlert?: boolean;    // red badge for alerts vs. neutral count
  children?: ReactNode;
}
```

### `NavLink.tsx`

```tsx
'use client';

import Link from 'next/link';
import { Icon } from '@/components/primitives/Icon/Icon';
import { Badge } from '@/components/primitives/Badge/Badge';
import styles from './NavLink.module.scss';
import type { NavLinkProps } from './NavLink.types';

export function NavLink({
  href,
  icon,
  label,
  active = false,
  badgeCount,
  badgeAlert = false,
}: NavLinkProps) {
  const classes = [styles.link, active && styles.active].filter(Boolean).join(' ');

  return (
    <Link href={href} className={classes} aria-current={active ? 'page' : undefined}>
      <Icon name={icon} size="md" className={styles.icon} aria-hidden />
      <span className={styles.label}>{label}</span>
      {badgeCount && badgeCount > 0 ? (
        <Badge tone={badgeAlert ? 'alert' : 'gray'} count={badgeCount} className={styles.badge} />
      ) : null}
    </Link>
  );
}
```

### `NavLink.module.scss`

```scss
@use "@/styles/tokens" as t;

.link {
  display: flex;
  align-items: center;
  gap: t.space(3);
  padding: t.space(3);
  border-radius: t.radius(lg);
  color: rgb(255 255 255 / 0.7);
  font-size: t.font-size(sm);
  font-weight: t.font-weight(semibold);
  transition: t.motion(fast);

  &:hover {
    background: rgb(255 255 255 / 0.06);
    color: t.color(white);
  }
}

.icon {
  flex-shrink: 0;
}

.label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  margin-inline-start: auto;  // RTL-aware
  flex-shrink: 0;
}

.active {
  background: t.color(orange);
  color: t.color(white);
  box-shadow: t.shadow(orange);
  font-weight: t.font-weight(bold);

  &:hover {
    background: t.color(orange-hover);
    color: t.color(white);
  }
}
```

## §2.8 — UserWidget

### Files

```
components/layout/UserWidget/
├── UserWidget.tsx
├── UserWidget.module.scss
└── UserWidget.types.ts
```

### `UserWidget.types.ts`

```ts
export interface UserWidgetProps {
  name: string;
  role: string;            // display label, e.g. "מנהל ארגון"
  avatarUrl?: string;
  className?: string;
}
```

### `UserWidget.tsx`

```tsx
import { Avatar } from '@/components/primitives/Avatar/Avatar';
import styles from './UserWidget.module.scss';
import type { UserWidgetProps } from './UserWidget.types';

export function UserWidget({ name, role, avatarUrl, className }: UserWidgetProps) {
  const classes = [styles.me, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <Avatar name={name} src={avatarUrl} size="base" tone="green" />
      <div className={styles.body}>
        <span className={styles.who}>{name}</span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
}
```

### `UserWidget.module.scss`

```scss
@use "@/styles/tokens" as t;

.me {
  display: flex;
  align-items: center;
  gap: t.space(3);
  padding: t.space(3);
  background: rgb(255 255 255 / 0.04);
  border-radius: t.radius(lg);
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.who {
  font-size: t.font-size(sm);
  font-weight: t.font-weight(bold);
  color: t.color(white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.role {
  font-size: t.font-size(xs);
  color: rgb(255 255 255 / 0.6);
}
```

## §2.9 — Sidebar

### Files

```
components/layout/Sidebar/
├── Sidebar.tsx
├── Sidebar.module.scss
└── Sidebar.types.ts
```

### `Sidebar.types.ts`

```ts
import type { ReactNode } from 'react';

export interface NavItem {
  href: string;
  icon: string;
  label: string;
  badgeCount?: number;
  badgeAlert?: boolean;
}

export interface SidebarProps {
  navItems: NavItem[];
  tenantName: string;
  tenantLabel?: string;
  tenantLogoUrl?: string;
  user: { name: string; role: string; avatarUrl?: string };
  className?: string;
  /** Active path; sidebar marks the matching nav item active. */
  activePath?: string;
  /** Optional element rendered above the user widget (e.g. tenant settings). */
  footer?: ReactNode;
}
```

### `Sidebar.tsx`

```tsx
import { BrandMark } from '@/components/layout/BrandMark/BrandMark';
import { TenantSwitcher } from '@/components/layout/TenantSwitcher/TenantSwitcher';
import { NavLink } from '@/components/layout/NavLink/NavLink';
import { UserWidget } from '@/components/layout/UserWidget/UserWidget';
import styles from './Sidebar.module.scss';
import type { SidebarProps } from './Sidebar.types';

export function Sidebar({
  navItems,
  tenantName,
  tenantLabel,
  tenantLogoUrl,
  user,
  className,
  activePath,
  footer,
}: SidebarProps) {
  const classes = [styles.side, className].filter(Boolean).join(' ');

  return (
    <aside className={classes} aria-label="ניווט ראשי">
      <div className={styles.head}>
        <BrandMark size="base" />
      </div>

      <div className={styles.tenantSlot}>
        <TenantSwitcher
          tenantName={tenantName}
          tenantLabel={tenantLabel}
          logoUrl={tenantLogoUrl}
        />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badgeCount={item.badgeCount}
            badgeAlert={item.badgeAlert}
            active={activePath === item.href}
          />
        ))}
      </nav>

      <div className={styles.foot}>
        {footer}
        <UserWidget {...user} />
      </div>
    </aside>
  );
}
```

### `Sidebar.module.scss`

```scss
@use "@/styles/tokens" as t;

.side {
  display: flex;
  flex-direction: column;
  width: 248px;
  height: 100vh;
  padding: t.space(5) t.space(4);
  background: t.color(blue-deep);
  color: t.color(white);
  overflow-y: auto;
  position: sticky;
  inset-block-start: 0;
}

.head {
  display: flex;
  align-items: center;
  margin-block-end: t.space(5);
}

.tenantSlot {
  margin-block-end: t.space(5);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: t.space(1);
  flex: 1;
}

.foot {
  display: flex;
  flex-direction: column;
  gap: t.space(3);
  padding-block-start: t.space(4);
  border-block-start: 1px solid rgb(255 255 255 / 0.08);
}
```

## §2.10 — Topbar

### Files

```
components/layout/Topbar/
├── Topbar.tsx
├── Topbar.module.scss
└── Topbar.types.ts
```

### `Topbar.types.ts`

```ts
import type { ReactNode } from 'react';

export interface TopbarProps {
  title: ReactNode;            // page H1
  subtitle?: ReactNode;
  actions?: ReactNode;         // typically a Button or row of Buttons
  /** Mobile-only menu trigger element (e.g. hamburger button) */
  menuTrigger?: ReactNode;
  className?: string;
}
```

### `Topbar.tsx`

```tsx
import styles from './Topbar.module.scss';
import type { TopbarProps } from './Topbar.types';

export function Topbar({ title, subtitle, actions, menuTrigger, className }: TopbarProps) {
  const classes = [styles.topbar, className].filter(Boolean).join(' ');
  return (
    <header className={classes}>
      <div className={styles.left}>
        {menuTrigger}
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
```

### `Topbar.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: t.space(4);
  padding: t.space(4) t.space(5);
  background: t.color(white);
  border-block-end: 1px solid t.color(border-default);
  position: sticky;
  inset-block-start: 0;
  z-index: t.z(sticky);

  @include m.from(t.bp(md)) {
    padding: t.space(5) t.space(7);
  }
}

.left {
  display: flex;
  align-items: center;
  gap: t.space(3);
  min-width: 0;
}

.titleBlock {
  min-width: 0;
}

.title {
  font-size: t.font-size(xl);
  font-weight: t.font-weight(extrabold);
  color: t.color(ink);
  line-height: t.leading(tight);

  @include m.from(t.bp(md)) {
    font-size: t.font-size(2xl);
  }
}

.subtitle {
  font-size: t.font-size(sm);
  color: t.color(fg-muted);
  margin-block-start: t.space(1);
}

.actions {
  display: flex;
  align-items: center;
  gap: t.space(2);
  flex-shrink: 0;
}
```

## §2.11 — Tabs

### Files

```
components/layout/Tabs/
├── Tabs.tsx
├── Tabs.module.scss
└── Tabs.types.ts
```

### `Tabs.types.ts`

```ts
export interface TabItem {
  href: string;
  label: string;
  badgeCount?: number;
}

export interface TabsProps {
  items: TabItem[];
  activePath?: string;
  className?: string;
  ariaLabel?: string;
}
```

### `Tabs.tsx`

```tsx
'use client';

import Link from 'next/link';
import { Badge } from '@/components/primitives/Badge/Badge';
import styles from './Tabs.module.scss';
import type { TabsProps } from './Tabs.types';

export function Tabs({ items, activePath, className, ariaLabel = 'לשוניות' }: TabsProps) {
  const classes = [styles.tabs, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const active = activePath === item.href;
        const itemClasses = [styles.tab, active && styles.active].filter(Boolean).join(' ');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={itemClasses}
            role="tab"
            aria-selected={active}
          >
            <span>{item.label}</span>
            {item.badgeCount && item.badgeCount > 0 ? (
              <Badge tone={active ? 'blue-soft' : 'gray'} count={item.badgeCount} />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
```

### `Tabs.module.scss`

```scss
@use "@/styles/tokens" as t;

.tabs {
  display: flex;
  gap: t.space(1);
  border-block-end: 1px solid t.color(border-default);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: t.space(2);
  padding: t.space(3) t.space(4);
  color: t.color(fg-muted);
  font-size: t.font-size(sm);
  font-weight: t.font-weight(semibold);
  white-space: nowrap;
  border-block-end: 2px solid transparent;
  margin-block-end: -1px;
  transition: t.motion(fast);

  &:hover {
    color: t.color(blue-deep);
  }
}

.active {
  color: t.color(blue-deep);
  border-block-end-color: t.color(blue-deep);
  font-weight: t.font-weight(bold);
}
```

## §2.12 — MobileDrawer

A slide-in drawer that wraps the sidebar contents at < `md`. Trigger lives in `Topbar` (`menuTrigger` prop). Drawer is closed by default, opens via state, closes on backdrop click or Escape.

### Files

```
components/layout/MobileDrawer/
├── MobileDrawer.tsx
├── MobileDrawer.module.scss
└── MobileDrawer.types.ts
```

### `MobileDrawer.types.ts`

```ts
import type { ReactNode } from 'react';

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  children: ReactNode;
}
```

### `MobileDrawer.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import styles from './MobileDrawer.module.scss';
import type { MobileDrawerProps } from './MobileDrawer.types';

export function MobileDrawer({ open, onClose, ariaLabel = 'תפריט', children }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="סגור תפריט"
        onClick={onClose}
      />
      <div className={styles.panel}>
        {children}
      </div>
    </div>
  );
}
```

### `MobileDrawer.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.root {
  position: fixed;
  inset: 0;
  z-index: t.z(drawer);

  @include m.from(t.bp(md)) {
    display: none;  // drawer is mobile-only
  }
}

.backdrop {
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 0.4);
  border: 0;
  cursor: pointer;
}

.panel {
  position: absolute;
  inset-block-start: 0;
  inset-block-end: 0;
  inset-inline-start: 0;  // RTL: drawer slides in from the right
  width: 280px;
  max-width: 85vw;
  background: t.color(blue-deep);
  overflow-y: auto;
  animation: slideIn t.motion(base);
}

@keyframes slideIn {
  from { transform: translateX(50%); opacity: 0; }
  to   { transform: translateX(0);   opacity: 1; }
}
```

> **RTL note:** in RTL contexts, `inset-inline-start: 0` resolves to the right edge of the viewport. The drawer enters from the right, which is the user's "start" side. The slide animation is symmetric enough that the same `translateX(50%)` works for both directions; if you find it animates the wrong way, flip the sign.

## §2.13 — AppShell

Top-level layout composing Sidebar (desktop) / MobileDrawer (mobile) + main content area. This is the component each route-group `layout.tsx` will render.

### Files

```
components/layout/AppShell/
├── AppShell.tsx
├── AppShell.module.scss
└── AppShell.types.ts
```

### `AppShell.types.ts`

```ts
import type { ReactNode } from 'react';
import type { SidebarProps } from '@/components/layout/Sidebar/Sidebar.types';

export interface AppShellProps {
  /** Sidebar config; same shape Sidebar takes directly. */
  sidebar: SidebarProps;
  children: ReactNode;
}
```

### `AppShell.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { MobileDrawer } from '@/components/layout/MobileDrawer/MobileDrawer';
import { Icon } from '@/components/primitives/Icon/Icon';
import styles from './AppShell.module.scss';
import type { AppShellProps } from './AppShell.types';

export function AppShell({ sidebar, children }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={styles.app}>
      <div className={styles.sidebarDesktop}>
        <Sidebar {...sidebar} />
      </div>

      <button
        type="button"
        className={styles.menuTrigger}
        aria-label="פתח תפריט"
        onClick={() => setDrawerOpen(true)}
      >
        <Icon name="menu" size="md" aria-hidden />
      </button>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Sidebar {...sidebar} />
      </MobileDrawer>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
```

> The icon name `menu` must exist in `public/icons.svg`. If the closest available is `hamburger`, `bars`, or `more`, use that — don't invent a symbol ID. Verify before assuming `menu` is in the sprite.

### `AppShell.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.app {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  background: t.color(bg-soft);

  @include m.from(t.bp(md)) {
    grid-template-columns: 248px 1fr;
  }
}

.sidebarDesktop {
  display: none;

  @include m.from(t.bp(md)) {
    display: block;
  }
}

.menuTrigger {
  position: fixed;
  inset-block-start: t.space(3);
  inset-inline-start: t.space(3);  // RTL: appears on the right
  z-index: t.z(sticky);
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: t.color(white);
  border: 1px solid t.color(border-default);
  border-radius: t.radius(lg);
  box-shadow: t.shadow(sm);
  cursor: pointer;

  @include m.from(t.bp(md)) {
    display: none;  // hidden when sidebar is visible
  }
}

.main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
```

## §2.14 — Demo route

Build a demo entry under `app/(dev)/layout-demo/` so CP-2.5 has a review surface. This mirrors the pattern from Phase 1's primitives demo.

### `app/(dev)/layout-demo/page.tsx`

```tsx
import { AppShell } from '@/components/layout/AppShell/AppShell';
import { Topbar } from '@/components/layout/Topbar/Topbar';
import { Tabs } from '@/components/layout/Tabs/Tabs';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Icon } from '@/components/primitives/Icon/Icon';

import type { NavItem } from '@/components/layout/Sidebar/Sidebar.types';
import type { TabItem } from '@/components/layout/Tabs/Tabs.types';

import styles from './page.module.scss';

export const metadata = { title: 'עוז · Layout Demo' };

const NAV: NavItem[] = [
  { href: '/layout-demo',           icon: 'grid',     label: 'סקירה' },
  { href: '/layout-demo/properties', icon: 'building', label: 'נכסים', badgeCount: 12 },
  { href: '/layout-demo/workers',    icon: 'users',    label: 'עובדים' },
  { href: '/layout-demo/contracts',  icon: 'file-text', label: 'חוזים', badgeCount: 3, badgeAlert: true },
  { href: '/layout-demo/reports',    icon: 'bar-chart-2', label: 'דוחות' },
  { href: '/layout-demo/ai-import',  icon: 'sparkles', label: 'ייבוא AI' },
  { href: '/layout-demo/settings',   icon: 'settings', label: 'הגדרות' },
];

const TABS: TabItem[] = [
  { href: '/layout-demo',            label: 'סקירה' },
  { href: '/layout-demo/properties', label: 'נכסים', badgeCount: 12 },
  { href: '/layout-demo/workers',    label: 'עובדים' },
  { href: '/layout-demo/contracts',  label: 'חוזים', badgeCount: 3 },
  { href: '/layout-demo/reports',    label: 'דוחות' },
  { href: '/layout-demo/ai-import',  label: 'ייבוא AI' },
  { href: '/layout-demo/settings',   label: 'הגדרות' },
];

export default function LayoutDemoPage() {
  return (
    <AppShell
      sidebar={{
        navItems: NAV,
        tenantName: 'AM Hostels',
        tenantLabel: 'ארגון',
        user: { name: 'אדיר אמסלם', role: 'מנהל ארגון' },
        activePath: '/layout-demo',
      }}
    >
      <Topbar
        title="סקירה כללית"
        subtitle="מבט כולל על הפעילות"
        actions={
          <>
            <Button variant="ghost" iconStart={<Icon name="download" size="sm" />}>
              ייצא
            </Button>
            <Button variant="cta" iconStart={<Icon name="plus" size="sm" />}>
              הוסף נכס
            </Button>
          </>
        }
      />
      <Tabs items={TABS} activePath="/layout-demo" />

      <div className={styles.content}>
        <Card>
          <h2>בדיקת AppShell</h2>
          <p>
            דף זה הוא משטח הסקירה ל-CP-2.5. במסכי דסקטופ הסרגל הצד מופיע מימין;
            במסכי מובייל יש כפתור תפריט בפינה ימין-עליון שפותח את הסרגל כ-Drawer.
          </p>
        </Card>

        <Card variant="outline">
          <h3>תרחישי בדיקה</h3>
          <ul className={styles.list}>
            <li>בדסקטופ (1280px) — הסרגל מימין, ה-Topbar בולט, הלשוניות מתחתיו, התוכן ממלא את שאר הרוחב.</li>
            <li>בטאבלט (768px) — הסרגל עדיין מימין, הפדינג מצטמצם.</li>
            <li>במובייל (375px) — הסרגל נסתר, כפתור תפריט מופיע בפינה ימין-עליון, לחיצה פותחת Drawer.</li>
            <li>גלילה אופקית של ה-Tabs במובייל — אפשרית, ללא scrollbar גלוי.</li>
            <li>NavLink פעיל מסומן בכתום; NavLink עם Badge מציג מספר; "חוזים" מציג Badge אדום.</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
```

### `app/(dev)/layout-demo/page.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.content {
  display: flex;
  flex-direction: column;
  gap: t.space(5);
  padding: t.space(5);

  @include m.from(t.bp(md)) {
    padding: t.space(7);
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: t.space(2);
  padding-inline-start: t.space(5);
  list-style: disc;
  color: t.color(fg-muted);
}
```

## §2.15 — Self-tests (CP-2.5 gate)

### Test 1 — TypeScript compiles

```bash
npx tsc --noEmit
```

PASS iff exit 0.

### Test 2 — Lint passes

```bash
npm run lint
```

PASS iff exit 0 (warnings acceptable; errors are not).

### Test 3 — Build passes

```bash
npm run build
```

PASS iff exit 0.

### Test 4 — All nine layout components present

```bash
for c in BrandMark TenantSwitcher NavLink UserWidget Sidebar Topbar Tabs MobileDrawer AppShell; do
  test -f "components/layout/$c/$c.tsx" || { echo "FAIL: $c.tsx missing"; exit 1; }
  test -f "components/layout/$c/$c.module.scss" || { echo "FAIL: $c.module.scss missing"; exit 1; }
  test -f "components/layout/$c/$c.types.ts" || { echo "FAIL: $c.types.ts missing"; exit 1; }
done
echo "ALL LAYOUT COMPONENTS PRESENT"
```

PASS iff loop completes.

### Test 5 — Demo page renders

```bash
npm run dev > /tmp/oz-dev.log 2>&1 &
DEV_PID=$!
sleep 8
HTTP_CODE=$(curl -s -o /tmp/oz-layout.html -w "%{http_code}" http://localhost:3000/layout-demo)
kill $DEV_PID 2>/dev/null
```

PASS iff:

- `HTTP_CODE` = `200`
- `/tmp/oz-layout.html` contains `lang="he"`, `dir="rtl"`, `סקירה כללית`, and `AM Hostels`
- `/tmp/oz-dev.log` contains no `Error:` or `Failed to compile` lines

### Test 6 — No raw color values in layout SCSS

```bash
FOUND=$(grep -rEn '^[^/]*#[0-9a-fA-F]{3,8}\b' components/layout \
  --include='*.module.scss' \
  | grep -v '^\s*//' \
  | grep -v '@use')
if [ -n "$FOUND" ]; then
  echo "FAIL: raw color literals in layout SCSS:"
  echo "$FOUND"
  exit 1
fi
echo "NO RAW COLORS"
```

PASS iff no hex literals are found. (`rgb(... / opacity)` calls used for translucency on dark backgrounds are acceptable but should be flagged.)

### Test 7 — Icon names used in NAV exist in sprite

```bash
for icon in grid building users file-text bar-chart-2 sparkles settings menu download plus chevron-down; do
  grep -q "id=\"i-$icon\"" public/icons.svg \
    || echo "WARN: icon '$icon' not found in public/icons.svg — verify and substitute closest available"
done
echo "ICON CHECK DONE"
```

This test prints WARNs but does not fail. If any icon is missing, the demo will render an empty `<svg><use>` for that nav item — visible immediately. The user reviewing CP-2.5 will spot it.

### Test 8 — RTL drawer + sticky sidebar smoke

Verify by HTML inspection that the sidebar uses `position: sticky` and that AppShell uses `grid-template-columns: 248px 1fr` at md+. Print the relevant computed styles by extracting class names from the rendered HTML and grepping the compiled CSS (best-effort; OK if cannot be fully automated):

```bash
grep -E 'position:\s*sticky' components/layout/Sidebar/Sidebar.module.scss
grep -E 'grid-template-columns' components/layout/AppShell/AppShell.module.scss
```

PASS iff both grep calls return matches.

## §2.16 — Commit (after user types `continue`)

Stage all new files under `components/layout/` and `app/(dev)/layout-demo/`. Confirm by listing staged files. Commit message:

```
phase 2: layout & navigation chrome + CP-2.5 demo

- BrandMark (3 sizes)
- TenantSwitcher (logo + label + name + chevron, dark-on-blue)
- NavLink (active state, optional Badge with alert tone)
- UserWidget (avatar + name + role)
- Sidebar (composes the four above; sticky, blue-deep, 248px)
- Topbar (sticky, title + subtitle + actions + menu trigger slot)
- Tabs (horizontal strip, badges, active underline, mobile-scrollable)
- MobileDrawer (slide-in below md, ESC + backdrop close)
- AppShell (grid layout: sidebar desktop / drawer mobile, menu trigger)

Demo page at app/(dev)/layout-demo renders the full chrome at three
breakpoints (375 / 768 / 1280px) for CP-2.5 visual review.

Reaches CP-2.5.
```

After commit, print the closing checkpoint banner per §F.4 and exit.

---

# §Phase 3 — Auth & RLS foundation

## §3.1 — Goal

Stand up the database foundation and authentication for oz-marketplace. Local Supabase running via `supabase start`. Two migrations defining the role enum, the profiles table, the persona-aware signup trigger, and the RLS skeleton. Three sign-in methods (Google OAuth, Twilio SMS OTP, email magic-link) on a single sign-in page. A persona-aware sign-up flow that asks "company or individual?" and routes the two paths differently.

This phase ends at **two checkpoints**:
- **CP-3a** — Database & migrations applied to local Supabase, schema and trigger verified by query.
- **CP-3b** — Auth UI reviewed at 375 / 768 / 1280px; sign-in produces a valid session against local Supabase; RLS blocks unauthenticated access.

## §3.2 — Inputs

- `docs/BUILD_PLAN.md` — naming, framing, locked decisions.
- `docs/PROMPT_LIBRARY.md` front-matter (§F.1–§F.6) — governance.
- `recon/06-legacy-schema.md` — reference only. The new schema is built fresh; do not port the legacy `profiles` shape verbatim.
- `recon/07-roles-and-rls.md` — reference for the kinds of RLS patterns the legacy uses; new policies follow BUILD_PLAN §3.B.
- `components/primitives/` from Phase 1 — `Button`, `Input`, `Card`, `Pill`. Reuse them.
- `components/layout/` from Phase 2 — not used in `app/(auth)/` because auth pages don't sit inside the AppShell.

## §3.3 — Pre-flight checks

```bash
test "$(basename "$PWD")" = "oz-marketplace" || { echo "FAIL: not in oz-marketplace"; exit 1; }
git log --oneline | grep -q "phase 2" || { echo "FAIL: phase 2 commit not found"; exit 1; }
git diff --quiet || { echo "FAIL: working tree dirty"; exit 1; }

# Docker daemon running
docker info > /dev/null 2>&1 || { echo "FAIL: Docker daemon not running. Start Docker Desktop."; exit 1; }

# Supabase CLI installed
command -v supabase > /dev/null 2>&1 || { echo "FAIL: supabase CLI not found. Install via 'brew install supabase/tap/supabase'."; exit 1; }

# Required env vars present (values may be empty for now)
grep -q '^TWILIO_SMS_FROM' .env.local || echo "WARN: TWILIO_SMS_FROM not set in .env.local"

echo "PRE-FLIGHT OK"
```

If any FAIL: halt per §F.5. If WARN: log it and continue.

## §3.4 — Step 1: Update DECISIONS_LOG and BUILD_PLAN

Before any code or migrations, dump every locked decision from CP-1 through CP-2.5 plus the new Phase 3 decisions into `docs/DECISIONS_LOG.md`. The repo becomes the source of truth; chat history stops being load-bearing.

Open `docs/DECISIONS_LOG.md`. Find the existing CP-1 section (it should already contain the original decisions from Phase 0). After the existing CP-1 block and any Phase 0 / 1 / 2 deviation subsections, append a new top-level dated section:

```markdown
## 2026-05-05 — Phase 3 decisions (CP-3 prep)

### Auth & roles

- **User role enum SUPERSEDES BUILD_PLAN §3.B original lock.**
  Original (CP-1, 2026-05-02): `('b2c_owner', 'corporate_member', 'b2b_owner', 'admin')`.
  New (CP-3 prep, 2026-05-05): `('owner_individual', 'owner_company', 'construction_corporation', 'admin')`.
  Rationale: the B2C/B2B labels were inherited from manager vocabulary but
  misrepresent the product. There is no consumer in oz-marketplace; all three
  non-admin roles are businesses transacting with each other. The new names
  describe the actual entities: an individual property owner, a property-
  management company with many listings, and a construction corporation
  on the demand side.

- **Default role at signup: `owner_company`.**
  MVP day-one launches the supply-side product for property-management
  companies. Self-serve signup creates `owner_company` accounts.

- **`owner_individual` enum value reserved but unreachable in MVP.**
  Defined in the schema, no signup path leads to it. Activated in a later
  phase when individual-owner self-serve is on the roadmap.

- **`construction_corporation` is admin-invited only.**
  Created via Supabase Studio by OZ staff. No self-serve signup path.
  These are high-touch enterprise accounts (e.g., Tnufa, Shikun & Binui)
  managed by the GTM team.

- **`admin` is OZ staff.** No self-serve signup. Created via Studio.

- **Signup UX is Option C — persona picker before account creation.**
  Sign-up page asks "האם אתם חברה לניהול נכסים, או פרטיים?" (company or
  individual). "Company" path proceeds to create an `owner_company`
  account. "Individual" path renders a "coming soon" message; no account
  is created and no email is captured.

- **B1 default-to-single-role pattern is locked for MVP.**
  Self-serve signup writes a fixed role; admins promote to other roles
  via Studio. Future-roadmap entry: build B2/B3 self-serve persona-picker
  for `construction_corporation` and `owner_individual` once the
  individual product launches and signup volume warrants it. (Logged in
  TASKS.md under Future-roadmap.)

### Auth methods

- **Three sign-in methods on a single `/sign-in` page:**
  Google OAuth, Twilio SMS OTP, email magic-link. All three handled by
  Supabase Auth natively. Email/password is intentionally not shipping
  — magic-link covers the same use case without password storage,
  reset flows, or "forgot password" UI. Add email/password in Phase 9 if
  beta feedback requires it.

### Infrastructure

- **Local Supabase via `supabase start` for development.**
  Docker Desktop and Supabase CLI are required local prerequisites
  (added to README). Phase 8 (production readiness) provisions the
  remote Supabase project. No fork-and-clean from the legacy project;
  the schema is authored fresh from BUILD_PLAN §3.B.

- **`TWILIO_SMS_FROM` is the canonical env var name** for the OTP source
  number. Aligns with the legacy `.env.local`. The Phase 0 `.env.example`
  template used `TWILIO_OTP_FROM_NUMBER`; this is corrected in Phase 3.
```

Then update `docs/BUILD_PLAN.md` §3.B to reflect the new enum values. Find the row for OQ-3 + OQ-4 and replace the enum string. Add a one-line note: *"Superseded 2026-05-05 — see DECISIONS_LOG."* The original decision history stays visible.

## §3.5 — Step 2: Update README.md prerequisites

Open root `README.md`. Find the section about local development setup (or create one if it doesn't exist). Add a Prerequisites subsection at the top of the "Run locally" block:

```markdown
## Prerequisites

oz-marketplace's local dev stack requires:

- **Node.js 18.18 or higher** — `node -v`
- **npm** — bundled with Node
- **Docker Desktop** running — required by Supabase's local stack. Verify with `docker info`.
- **Supabase CLI** — install via `brew install supabase/tap/supabase` on macOS, or per the [Supabase CLI install docs](https://supabase.com/docs/guides/cli/getting-started). Verify with `supabase --version`.
- **`.env.local`** — copy `.env.example` and fill in values. See `docs/INTEGRATIONS.md` for what each variable is for.

Without Docker running, `supabase start` will fail and auth flows won't work.
```

## §3.6 — Step 3: Initialize local Supabase

```bash
# If supabase/config.toml from Phase 0 already declares project_id, skip init.
test -f supabase/config.toml || npx -y supabase init --workdir .

# Start the local stack (Docker pulls images on first run; can take 2-5 min)
supabase start
```

Capture the output of `supabase start` verbatim — it prints the local URLs and keys. Save the output to a temp file, then extract these for `.env.local` updates:

- `API URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

Update `.env.local` (the gitignored file) with these local values. Do **not** update `.env.example`. Print a confirmation that the values are written, but never echo the keys themselves to the session output.

## §3.7 — Step 4: Migration #1 — enums, profiles, signup trigger

Create `supabase/migrations/20260505000001_user_role_and_profiles.sql`:

```sql
-- ─────────────────────────────────────────────────────────────────
-- Migration 20260505000001 — user_role enum, profiles, signup trigger
-- See docs/DECISIONS_LOG.md (2026-05-05 — Phase 3) for rationale.
-- ─────────────────────────────────────────────────────────────────

-- The role enum. Lowercased per Postgres convention.
-- Value semantics:
--   owner_individual         — private person with one or a few properties (RESERVED, unreachable in MVP signup)
--   owner_company            — property-management company with multiple listings (default at signup)
--   construction_corporation — demand-side construction company (admin-invited only)
--   admin                    — OZ staff (admin-invited only)
CREATE TYPE public.user_role AS ENUM (
  'owner_individual',
  'owner_company',
  'construction_corporation',
  'admin'
);

-- Profiles table — one row per auth.users row.
-- Created automatically by handle_new_user() trigger below.
CREATE TABLE public.profiles (
  id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role            public.user_role NOT NULL DEFAULT 'owner_company',
  full_name       text,
  phone           text,
  email           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX profiles_role_idx ON public.profiles(role);

-- Auto-update updated_at on row UPDATE.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- handle_new_user(): persona-aware. Reads role from raw_user_meta_data.role
-- (set during signup by app/(auth)/sign-up flow), defaults to 'owner_company'
-- if not provided. Validates that the requested role is signupable —
-- 'owner_individual', 'construction_corporation', and 'admin' are NEVER
-- assignable via signup; if requested, the trigger silently coerces to the
-- default. Promotion to those roles is admin-only via Studio.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  requested_role text;
  final_role public.user_role;
BEGIN
  requested_role := NEW.raw_user_meta_data ->> 'role';

  -- Only 'owner_company' is signupable in MVP.
  -- Anything else (including null / absent) coerces to the default.
  IF requested_role = 'owner_company' THEN
    final_role := 'owner_company';
  ELSE
    final_role := 'owner_company';
  END IF;

  INSERT INTO public.profiles (id, role, email, phone, full_name)
  VALUES (
    NEW.id,
    final_role,
    NEW.email,
    NEW.phone,
    NEW.raw_user_meta_data ->> 'full_name'
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

COMMENT ON TYPE public.user_role IS 'User role enum. See docs/DECISIONS_LOG.md 2026-05-05 for semantics.';
COMMENT ON TABLE public.profiles IS 'One row per auth.users row, created by handle_new_user trigger.';
COMMENT ON FUNCTION public.handle_new_user() IS 'Trigger that creates a profiles row on auth.users INSERT. Coerces role to owner_company in MVP.';
```

> **Note on the trigger logic:** the `IF/ELSE` branches both assign `'owner_company'`. This is intentional — it documents that we *considered* the requested role and chose to ignore it. When the next phase opens up `owner_individual` self-serve, the IF branch becomes meaningful and we'll add an ELSIF for `'owner_individual'`. Keeping the structure now means the future change is one ELSIF, not a rewrite.

## §3.8 — Step 5: Migration #2 — RLS skeleton

Create `supabase/migrations/20260505000002_profiles_rls.sql`:

```sql
-- ─────────────────────────────────────────────────────────────────
-- Migration 20260505000002 — RLS skeleton for profiles
-- ─────────────────────────────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Authenticated users can SELECT their own profile row only.
CREATE POLICY "profiles_select_own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Authenticated users can UPDATE their own profile row only,
-- and they cannot change their role (admins do that via service role).
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- INSERT is handled by the handle_new_user() trigger only.
-- No policy means no client-side INSERT path is allowed.
-- Service role bypasses RLS, so admin operations work via the service-role key.

-- DELETE is admin-only; no policy means clients cannot delete profiles.
-- Cascading DELETE from auth.users is handled by the FK ON DELETE CASCADE.
```

## §3.9 — Step 6: Apply migrations to local Supabase

```bash
supabase db reset
```

This drops and recreates the local DB, applying every migration in `supabase/migrations/` in order. Capture verbatim output. PASS iff exit 0 and the output mentions both new migration files.

## §3.10 — Step 7: CP-3a self-tests (database verified)

### Test 1 — Enum exists with correct values

```bash
supabase db query "SELECT unnest(enum_range(NULL::public.user_role)) AS value;"
```

PASS iff output contains exactly four rows: `owner_individual`, `owner_company`, `construction_corporation`, `admin`.

### Test 2 — profiles table has expected columns

```bash
supabase db query "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' ORDER BY ordinal_position;"
```

PASS iff output includes `id`, `role`, `full_name`, `phone`, `email`, `created_at`, `updated_at` with reasonable types.

### Test 3 — RLS is enabled on profiles

```bash
supabase db query "SELECT relrowsecurity FROM pg_class WHERE relname = 'profiles';"
```

PASS iff result is `t`.

### Test 4 — Trigger exists

```bash
supabase db query "SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = 'users' AND trigger_schema = 'auth';"
```

PASS iff `on_auth_user_created` is in the result.

### Test 5 — Trigger fires correctly on signup (smoke test)

```bash
# Create a test auth.users row directly via the service role.
# Verify a profiles row was auto-created with role = 'owner_company'.
supabase db query "
INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data)
VALUES (gen_random_uuid(), 'test-cp3a@example.com', '', '{\"role\":\"owner_company\"}'::jsonb);

SELECT p.role FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'test-cp3a@example.com';
"
```

PASS iff result is exactly `owner_company`.

### Test 6 — Trigger coerces invalid role requests

```bash
supabase db query "
INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data)
VALUES (gen_random_uuid(), 'test-coerce@example.com', '', '{\"role\":\"admin\"}'::jsonb);

SELECT p.role FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'test-coerce@example.com';
"
```

PASS iff result is `owner_company` — the trigger ignored the malicious `admin` request and coerced to default.

### Test 7 — Cleanup

```bash
supabase db query "DELETE FROM auth.users WHERE email IN ('test-cp3a@example.com', 'test-coerce@example.com');"
```

Should run without error.

---

After all CP-3a tests pass, print the CP-3a banner per §F.4 and stop. Wait for `continue` before moving to CP-3b. Do **not** start the auth UI work until the user has reviewed CP-3a.

```
═══════════════════════════════════════════
PHASE 3 PART A COMPLETE — CHECKPOINT CP-3a REACHED
═══════════════════════════════════════════
```

After `continue`, proceed to §3.11.

## §3.11 — Step 8: Supabase clients

Create `lib/supabase/server.ts`:

```ts
import { createServerClient as createServerClientImpl } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client for use in Server Components, Route Handlers,
 * and Server Actions. Reads/writes auth cookies via Next's cookies() API.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createServerClientImpl(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from Server Component — ignore.
            // Middleware refreshes the session cookies; this is fine.
          }
        },
      },
    },
  );
}
```

Create `lib/supabase/browser.ts`:

```ts
'use client';

import { createBrowserClient as createBrowserClientImpl } from '@supabase/ssr';

/**
 * Browser-side Supabase client for use in Client Components.
 * Cached singleton so we don't re-create on every render.
 */
let client: ReturnType<typeof createBrowserClientImpl> | undefined;

export function createBrowserClient() {
  if (client) return client;
  client = createBrowserClientImpl(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return client;
}
```

Create `middleware.ts` at the repo root:

```ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh the session so SSR has fresh auth state.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - _next/static (static files)
     *  - _next/image (image optimization)
     *  - favicon.ico, icons.svg, fonts/
     *  - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|icons.svg|fonts).*)',
  ],
};
```

## §3.12 — Step 9: Auth pages

### `app/(auth)/layout.tsx`

```tsx
import type { Metadata } from 'next';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'עוז · התחברות',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.frame}>{children}</div>;
}
```

### `app/(auth)/layout.module.scss`

```scss
@use "@/styles/tokens" as t;
@use "@/styles/mixins" as m;

.frame {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: t.space(5);
  background: t.color(bg-soft);

  @include m.from(t.bp(md)) {
    padding: t.space(10);
  }
}
```

### `app/(auth)/sign-in/page.tsx`

```tsx
import { Card } from '@/components/primitives/Card/Card';
import { SignInMethods } from './SignInMethods';
import styles from './page.module.scss';

export default function SignInPage() {
  return (
    <Card variant="elevated" className={styles.card}>
      <header className={styles.header}>
        <h1>ברוכים הבאים לעוז</h1>
        <p>בחרו אופן התחברות</p>
      </header>
      <SignInMethods />
    </Card>
  );
}
```

### `app/(auth)/sign-in/page.module.scss`

```scss
@use "@/styles/tokens" as t;

.card {
  width: 100%;
  max-width: 440px;
}

.header {
  display: flex;
  flex-direction: column;
  gap: t.space(2);
  margin-block-end: t.space(6);
  text-align: center;

  h1 {
    font-size: t.font-size(2xl);
  }

  p {
    color: t.color(fg-muted);
  }
}
```

### `app/(auth)/sign-in/SignInMethods.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button/Button';
import { Input } from '@/components/primitives/Input/Input';
import { Icon } from '@/components/primitives/Icon/Icon';
import { createBrowserClient } from '@/lib/supabase/browser';
import styles from './SignInMethods.module.scss';

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'sent'; method: 'email' | 'sms' }
  | { kind: 'error'; message: string };

export function SignInMethods() {
  const supabase = createBrowserClient();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleGoogle() {
    setStatus({ kind: 'loading' });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/callback` },
    });
    if (error) setStatus({ kind: 'error', message: error.message });
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus({ kind: 'loading' });
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/callback` },
    });
    if (error) {
      setStatus({ kind: 'error', message: error.message });
    } else {
      setStatus({ kind: 'sent', method: 'email' });
    }
  }

  async function handlePhone(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) return;
    setStatus({ kind: 'loading' });
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) {
      setStatus({ kind: 'error', message: error.message });
    } else {
      setStatus({ kind: 'sent', method: 'sms' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className={styles.sent}>
        <h2>בדקו את {status.method === 'email' ? 'המייל' : 'הטלפון'}</h2>
        <p>שלחנו לכם קישור / קוד התחברות.</p>
      </div>
    );
  }

  return (
    <div className={styles.methods}>
      <Button
        variant="ghost"
        fullWidth
        onClick={handleGoogle}
        disabled={status.kind === 'loading'}
        iconStart={<Icon name="google" size="base" aria-label="Google" />}
      >
        המשך עם Google
      </Button>

      <div className={styles.divider}><span>או</span></div>

      <form onSubmit={handleEmail} className={styles.form}>
        <Input
          type="email"
          label="מייל"
          placeholder="you@company.co.il"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="blue" fullWidth disabled={!email || status.kind === 'loading'}>
          שלחו לי קישור התחברות
        </Button>
      </form>

      <div className={styles.divider}><span>או</span></div>

      <form onSubmit={handlePhone} className={styles.form}>
        <Input
          type="tel"
          label="טלפון"
          placeholder="050-1234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="blue" fullWidth disabled={!phone || status.kind === 'loading'}>
          שלחו לי קוד SMS
        </Button>
      </form>

      {status.kind === 'error' ? (
        <p className={styles.error}>{status.message}</p>
      ) : null}

      <footer className={styles.footer}>
        <span>חדשים כאן? </span>
        <a href="/sign-up">צרו חשבון</a>
      </footer>
    </div>
  );
}
```

If `google` isn't a real symbol in `public/icons.svg`, omit the `iconStart` prop or substitute a generic icon. Do not invent symbol IDs.

### `app/(auth)/sign-in/SignInMethods.module.scss`

```scss
@use "@/styles/tokens" as t;

.methods {
  display: flex;
  flex-direction: column;
  gap: t.space(4);
}

.form {
  display: flex;
  flex-direction: column;
  gap: t.space(3);
}

.divider {
  display: flex;
  align-items: center;
  gap: t.space(3);
  color: t.color(fg-faint);
  font-size: t.font-size(sm);

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: t.color(border-default);
  }
}

.error {
  color: t.color(red-600);
  font-size: t.font-size(sm);
  text-align: center;
}

.sent {
  display: flex;
  flex-direction: column;
  gap: t.space(3);
  text-align: center;

  h2 {
    font-size: t.font-size(xl);
  }

  p {
    color: t.color(fg-muted);
  }
}

.footer {
  text-align: center;
  font-size: t.font-size(sm);
  color: t.color(fg-muted);

  a {
    color: t.color(blue-deep);
    font-weight: t.font-weight(bold);
  }
}
```

### `app/(auth)/sign-up/page.tsx`

Persona picker. Asks "company or individual?" before any account is created.

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { SignUpCompany } from './SignUpCompany';
import { SignUpIndividualSoon } from './SignUpIndividualSoon';
import styles from './page.module.scss';

type Persona = null | 'company' | 'individual';

export default function SignUpPage() {
  const [persona, setPersona] = useState<Persona>(null);

  if (persona === 'company') return <SignUpCompany onBack={() => setPersona(null)} />;
  if (persona === 'individual') return <SignUpIndividualSoon onBack={() => setPersona(null)} />;

  return (
    <Card variant="elevated" className={styles.card}>
      <header className={styles.header}>
        <h1>הצטרפו לעוז</h1>
        <p>איזה סוג חשבון תרצו לפתוח?</p>
      </header>

      <div className={styles.choices}>
        <Button variant="cta" fullWidth onClick={() => setPersona('company')}>
          חברה לניהול נכסים
        </Button>
        <Button variant="ghost" fullWidth onClick={() => setPersona('individual')}>
          אני בעל נכס פרטי
        </Button>
      </div>

      <footer className={styles.footer}>
        <span>כבר יש לכם חשבון? </span>
        <a href="/sign-in">התחברו</a>
      </footer>
    </Card>
  );
}
```

### `app/(auth)/sign-up/page.module.scss`

```scss
@use "@/styles/tokens" as t;

.card {
  width: 100%;
  max-width: 440px;
}

.header {
  display: flex;
  flex-direction: column;
  gap: t.space(2);
  margin-block-end: t.space(6);
  text-align: center;

  h1 {
    font-size: t.font-size(2xl);
  }

  p {
    color: t.color(fg-muted);
  }
}

.choices {
  display: flex;
  flex-direction: column;
  gap: t.space(3);
}

.footer {
  text-align: center;
  margin-block-start: t.space(6);
  font-size: t.font-size(sm);
  color: t.color(fg-muted);

  a {
    color: t.color(blue-deep);
    font-weight: t.font-weight(bold);
  }
}
```

### `app/(auth)/sign-up/SignUpCompany.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Input } from '@/components/primitives/Input/Input';
import { createBrowserClient } from '@/lib/supabase/browser';
import styles from './SignUpCompany.module.scss';

export function SignUpCompany({ onBack }: { onBack: () => void }) {
  const supabase = createBrowserClient();
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | string>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !companyName) return;
    setStatus('loading');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { role: 'owner_company', full_name: companyName },
        emailRedirectTo: `${window.location.origin}/callback`,
      },
    });
    if (error) setStatus(error.message);
    else setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <Card variant="elevated" className={styles.card}>
        <h2>בדקו את המייל</h2>
        <p>שלחנו קישור הפעלה ל-{email}</p>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className={styles.card}>
      <header className={styles.header}>
        <h1>חשבון חברה</h1>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="שם החברה"
          placeholder="לדוגמה: נכסי גליל בע״מ"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          fullWidth
        />
        <Input
          type="email"
          label="מייל"
          placeholder="contact@company.co.il"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="cta" fullWidth disabled={!email || !companyName || status === 'loading'}>
          המשך
        </Button>
        <Button type="button" variant="ghost" fullWidth onClick={onBack}>
          חזרה
        </Button>
        {typeof status === 'string' && status !== 'idle' && status !== 'loading' && status !== 'sent' ? (
          <p className={styles.error}>{status}</p>
        ) : null}
      </form>
    </Card>
  );
}
```

### `app/(auth)/sign-up/SignUpCompany.module.scss`

```scss
@use "@/styles/tokens" as t;

.card {
  width: 100%;
  max-width: 440px;
}

.header {
  text-align: center;
  margin-block-end: t.space(6);

  h1 {
    font-size: t.font-size(2xl);
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: t.space(3);
}

.error {
  color: t.color(red-600);
  font-size: t.font-size(sm);
  text-align: center;
}
```

### `app/(auth)/sign-up/SignUpIndividualSoon.tsx`

```tsx
'use client';

import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import styles from './SignUpIndividualSoon.module.scss';

export function SignUpIndividualSoon({ onBack }: { onBack: () => void }) {
  return (
    <Card variant="elevated" className={styles.card}>
      <header className={styles.header}>
        <h1>בקרוב 🏗</h1>
        <p>
          עוז עדיין לא פתוחה לבעלי נכסים פרטיים. אנחנו מתחילים עם חברות לניהול
          נכסים, ובקרוב נפתח גם לפרטיים.
        </p>
        <p>חזרו לבקר אותנו בקרוב.</p>
      </header>
      <Button variant="ghost" fullWidth onClick={onBack}>
        חזרה
      </Button>
    </Card>
  );
}
```

### `app/(auth)/sign-up/SignUpIndividualSoon.module.scss`

```scss
@use "@/styles/tokens" as t;

.card {
  width: 100%;
  max-width: 440px;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: column;
  gap: t.space(3);
  margin-block-end: t.space(6);

  h1 {
    font-size: t.font-size(3xl);
  }

  p {
    color: t.color(fg-muted);
  }
}
```

### `app/(auth)/callback/route.ts`

```ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

/**
 * OAuth callback handler. Exchanges the `code` query param for a session,
 * then redirects to `/` (or to the `next` param if provided).
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(error.message)}`, request.url));
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
```

### `app/(auth)/sign-out/route.ts`

```ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/sign-in', request.url));
}
```

## §3.13 — Step 10: TASKS.md future-roadmap entry

Open `docs/TASKS.md`. Add to the "Future-roadmap (Phase 9+)" section:

```markdown
- [ ] B2/B3 self-serve persona-picker for sign-up (DECISIONS_LOG 2026-05-05).
      Activate `owner_individual` self-serve when individual-product launches.
      Add `construction_corporation` self-serve if/when GTM model shifts away
      from high-touch invitation.
```

## §3.14 — CP-3b self-tests (auth UI)

### Test A — TypeScript compiles

```bash
npx tsc --noEmit
```

PASS iff exit 0.

### Test B — Lint passes

```bash
npm run lint
```

PASS iff exit 0.

### Test C — Build passes

```bash
npm run build
```

PASS iff exit 0.

### Test D — Auth pages render

```bash
npm run dev > /tmp/oz-dev.log 2>&1 &
DEV_PID=$!
sleep 8

CODE_SIGNIN=$(curl -s -o /tmp/oz-signin.html -w "%{http_code}" http://localhost:3000/sign-in)
CODE_SIGNUP=$(curl -s -o /tmp/oz-signup.html -w "%{http_code}" http://localhost:3000/sign-up)

kill $DEV_PID 2>/dev/null
```

PASS iff:
- Both codes are `200`
- `/tmp/oz-signin.html` contains `lang="he"`, `dir="rtl"`, `המשך עם Google`, `שלחו לי קישור התחברות`, `שלחו לי קוד SMS`
- `/tmp/oz-signup.html` contains `חברה לניהול נכסים`, `אני בעל נכס פרטי`
- `/tmp/oz-dev.log` contains no `Error:` or `Failed to compile`

### Test E — Middleware exists and matcher excludes static assets

```bash
test -f middleware.ts || { echo "FAIL: middleware.ts missing"; exit 1; }
grep -q '_next/static' middleware.ts || { echo "FAIL: middleware matcher missing _next/static exclusion"; exit 1; }
echo "PASS"
```

### Test F — Supabase client files exist

```bash
test -f lib/supabase/server.ts || { echo "FAIL: lib/supabase/server.ts missing"; exit 1; }
test -f lib/supabase/browser.ts || { echo "FAIL: lib/supabase/browser.ts missing"; exit 1; }
echo "PASS"
```

### Test G — End-to-end signup smoke (via service role)

A real OAuth/OTP flow can't be automated easily, so verify the trigger end-to-end via direct Supabase client call:

```bash
# Use service role to insert an auth.users row with role meta-data,
# then verify a profiles row was created with role = 'owner_company'.
supabase db query "
INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data)
VALUES (gen_random_uuid(), 'cp3b-smoke@example.com', '', '{\"role\":\"owner_company\",\"full_name\":\"Test Co\"}'::jsonb);

SELECT role, full_name FROM public.profiles
WHERE email = 'cp3b-smoke@example.com';
"
```

PASS iff result row has `owner_company` and `Test Co`.

### Test H — RLS denies unauthenticated SELECT

```bash
# Anon role cannot read anyone else's profile.
supabase db query "SET ROLE anon; SELECT count(*) FROM public.profiles;"
```

PASS iff result is `0` (RLS hides every row from anon).

### Test I — Cleanup

```bash
supabase db query "DELETE FROM auth.users WHERE email = 'cp3b-smoke@example.com';"
```

Should run without error.

## §3.15 — Commit (after `continue`)

Stage all new files. Confirm by listing them. Commit message:

```
phase 3: auth & RLS foundation

CP-3a — Database
- supabase/migrations/20260505000001_user_role_and_profiles.sql
  (user_role enum, profiles table, persona-aware handle_new_user trigger)
- supabase/migrations/20260505000002_profiles_rls.sql
  (RLS skeleton: select-own, update-own-without-role-change, insert via trigger only)
- DECISIONS_LOG: enum supersession, owner_company default, B1 lock,
  Option C signup UX
- BUILD_PLAN §3.B updated with new enum
- README prerequisites: Docker, Supabase CLI

CP-3b — Auth UI
- lib/supabase/{server,browser}.ts — SSR-aware clients
- middleware.ts — refreshes session cookies
- app/(auth)/sign-in — three methods on a single page
  (Google OAuth + email magic-link + Twilio SMS OTP)
- app/(auth)/sign-up — persona picker; company creates owner_company
  account, individual sees "coming soon"
- app/(auth)/callback — OAuth + magic-link code exchange
- app/(auth)/sign-out — POST handler

Reaches CP-3b.
```

Print closing checkpoint banner and exit.

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
