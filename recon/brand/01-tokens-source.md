# brand/01 — Tokens Source

Verbatim source for design tokens.

===== FILE: assets/colors_and_type.css =====
/* OZ / WorkerHome — Colors + Type
 * Source: official brand palette (00_color_palette.png) + repo tokens
 * Hebrew RTL B2B SaaS — trust-first, operational
 */

/* Hebrew + Latin fonts bundled locally — see fonts/fonts.css.
   Free for commercial use (OFL). No external CDN required. */
@import url('./fonts/fonts.css');

:root {
  /* ============ BRAND — official 7-color palette ============ */
  --ink:           #1E1E2E;  /* טקסט ראשי — body text, headlines */
  --bg-soft:       #F7F8FA;  /* רקע בהיר — page background, surfaces */
  --orange:        #E07B39;  /* כתום CTA — primary CTA buttons (פרסם / חפש) ONLY */
  --green-light:   #52A375;  /* ירוק בהיר — verified accents, success */
  --green-deep:    #206A4F;  /* ירוק כהה — verification badges, compliance */
  --blue-light:    #205FA8;  /* כחול בהיר — secondary brand accent, mid-saturation */
  --blue-deep:     #1B3A6B;  /* כחול עמוק — navigation, headers, B2B trust */

  /* Hover / pressed variants */
  --orange-hover:  #C26A2C;
  --orange-soft:   rgba(224, 123, 57, 0.1);
  --blue-deep-hover: #15305A;
  --green-deep-soft: rgba(32, 106, 79, 0.1);

  /* Legacy info-bg color (kept for backwards compat with existing components) */
  --blue-bg-soft:  #D2E5FA;  /* very light blue — info backgrounds, soft chips */

  /* ============ ROLE-BASED SEMANTICS ============ */
  --color-primary:    var(--blue-deep);   /* dominant brand color (nav, headlines, B2B trust) */
  --color-cta:        var(--orange);      /* CTA buttons ONLY — search / publish */
  --color-secondary:  var(--blue-light);  /* secondary brand accent */
  --color-verified:   var(--green-deep);  /* verification, compliance, badges */
  --color-success:    var(--green-light);
  --color-info-bg:    var(--blue-bg-soft); /* very-light blue for info banners (not brand) */
  --color-surface:    #ffffff;
  --bg-page:          var(--bg-soft);

  --fg-default:  var(--ink);
  --fg-muted:    #6B7280;
  --fg-faint:    #9CA3AF;
  --fg-on-dark:  #ffffff;
  --fg-on-cta:   #ffffff;

  --border-default: #E5E7EB;
  --border-strong:  #D1D5DB;
  --border-accent:  var(--blue-deep);

  /* ============ NEUTRALS ============ */
  --white: #ffffff;
  --black: #000000;
  --gray-50:  #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  /* ============ STATUS ============ */
  --red-500:  #ef4444;   /* errors, overdue */
  --red-600:  #dc2626;
  --amber-500: #f59e0b;  /* warnings */
  --amber-50:  #fffbeb;

  /* ============ TYPE ============ */
  /* Heebo — primary UI font (Hebrew + Latin).
     Assistant — alternative shipped in the brand strategy doc; available as fallback. */
  --font-sans: var(--font-heebo, "Heebo"), "Assistant", "Segoe UI", Arial, sans-serif;

  --text-xs:   0.75rem;     /* 12 — micro labels */
  --text-sm:   0.875rem;    /* 14 — body small */
  --text-base: 1rem;        /* 16 — default body */
  --text-lg:   1.125rem;    /* 18 — lead paragraph */
  --text-xl:   1.25rem;     /* 20 */
  --text-2xl:  1.5rem;      /* 24 — H3 / card title */
  --text-3xl:  1.875rem;    /* 30 — H2 */
  --text-4xl:  2.25rem;     /* 36 — H1 */
  --text-5xl:  3rem;        /* 48 — hero */

  --font-normal:    400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
  --font-extrabold: 800;

  --leading-tight:   1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  --tracking-tight:  -0.025em;
  --tracking-wider:   0.05em;

  /* ============ RADII ============ */
  --radius-sm:   0.125rem;
  --radius:      0.25rem;
  --radius-md:   0.375rem;
  --radius-lg:   0.5rem;    /* inputs, dropdown */
  --radius-xl:   0.75rem;   /* CTA buttons */
  --radius-2xl:  1rem;      /* canonical card radius */
  --radius-full: 9999px;    /* pills, badges */

  /* ============ SHADOWS ============ */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow:    0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-orange: 0 6px 14px -4px rgb(224 123 57 / 0.35); /* CTA glow */
  --shadow-blue:   0 6px 14px -4px rgb(27 58 107 / 0.25);

  /* ============ TRANSITION ============ */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  --container-xl: 1280px;
}

/* ============ ELEMENT DEFAULTS ============ */
html { line-height: 1.5; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--font-sans);
  background-color: var(--bg-page);
  color: var(--fg-default);
  direction: rtl;
  -webkit-font-smoothing: antialiased;
}

h1 { font-size: var(--text-4xl); font-weight: var(--font-extrabold); line-height: var(--leading-tight); letter-spacing: var(--tracking-tight); color: var(--ink); }
h2 { font-size: var(--text-2xl); font-weight: var(--font-bold);     line-height: var(--leading-tight); color: var(--ink); }
h3 { font-size: var(--text-lg);  font-weight: var(--font-bold); color: var(--ink); }
p  { font-size: var(--text-base); line-height: var(--leading-normal); color: var(--gray-600); }
small { font-size: var(--text-xs); color: var(--gray-500); }
a  { color: inherit; text-decoration: inherit; transition: opacity var(--transition-fast); }
a:hover { opacity: 0.85; }

.oz-eyebrow {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}
===== END FILE =====
