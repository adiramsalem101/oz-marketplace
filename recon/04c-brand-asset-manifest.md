# 04c — Brand Asset Manifest (binary assets)

Scope: every binary (non-text) asset under `../worker-housing-platform/docs/brand/`.
Per asset: relative path, format, file size, dimensions (image), intended use.

---

## Images

| Path | Format | Size | Dimensions | Intended use |
|---|---|---:|---|---|
| `docs/brand/assets/00_color_palette.png` | PNG (8-bit RGB, non-interlaced) | 72,331 B | 900 × 981 | **Canonical brand palette image.** Treated as the source of truth for color values; the CSS file was corrected against this image (per `DECISIONS_LOG.md:42-65`). Filename prefix `00_` signals "read first." |

---

## Fonts (woff2)

All fonts are bundled locally (no CDN) and are required by `assets/colors_and_type.css` via `assets/fonts/fonts.css`. License: OFL — free for commercial use (`brand/design-tokens.md:117`). Each family is split into two unicode subsets: `-he.woff2` (Hebrew block U+0590-05FF + numerals) and `-la.woff2` (Latin block U+0000-00FF + ext).

### Heebo — primary UI font (Hebrew + Latin)
| Path | Size | Weight | Subset | Intended use |
|---|---:|---|---|---|
| `docs/brand/assets/fonts/Heebo-400-he.woff2` | 12,000 B | 400 | Hebrew | Default body text in Hebrew |
| `docs/brand/assets/fonts/Heebo-400-la.woff2` | 30,148 B | 400 | Latin | Default body text in Latin |

> **Note:** `fonts.css` declares Heebo at weights 400 / 500 / 700 / 800 — but only the `-400-` files exist on disk. Weights 500/700/800 reuse the same `-400-` woff2 file; the browser will synthesise heavier strokes (faux bold). Flagged in `10-open-questions.md`.

### Assistant — fallback (Hebrew + Latin)
| Path | Size | Weight | Subset | Intended use |
|---|---:|---|---|---|
| `docs/brand/assets/fonts/Assistant-400-he.woff2` | 7,336 B | 400 | Hebrew | Fallback body text in Hebrew |
| `docs/brand/assets/fonts/Assistant-400-la.woff2` | 22,056 B | 400 | Latin | Fallback body text in Latin |

> Same caveat as Heebo: `fonts.css` declares 400/500/600/700; only `-400-` files exist.

### IBM Plex Sans Hebrew — alternative (declared in CSS, NOT currently used)
| Path | Size | Weight | Subset | Intended use |
|---|---:|---|---|---|
| `docs/brand/assets/fonts/IBMPlexSansHebrew-400-he.woff2` | 4,076 B | 400 | Hebrew | Optional alternative — not currently selected anywhere |
| `docs/brand/assets/fonts/IBMPlexSansHebrew-400-la.woff2` | 14,248 B | 400 | Latin | Same |
| `docs/brand/assets/fonts/IBMPlexSansHebrew-500-he.woff2` | 4,204 B | 500 | Hebrew | Same |
| `docs/brand/assets/fonts/IBMPlexSansHebrew-500-la.woff2` | 15,084 B | 500 | Latin | Same |
| `docs/brand/assets/fonts/IBMPlexSansHebrew-700-he.woff2` | 4,152 B | 700 | Hebrew | Same |
| `docs/brand/assets/fonts/IBMPlexSansHebrew-700-la.woff2` | 14,408 B | 700 | Latin | Same |

### Rubik — alternative (declared in CSS, NOT currently used; was previously documented as primary in error)
| Path | Size | Weight | Subset | Intended use |
|---|---:|---|---|---|
| `docs/brand/assets/fonts/Rubik-400-he.woff2` | 9,352 B | 400 | Hebrew | Optional alternative — `design-tokens.md:123` notes "previously documented as primary in error" |
| `docs/brand/assets/fonts/Rubik-400-la.woff2` | 35,324 B | 400 | Latin | Same |

---

## Asset summary

| Category | Files | Total bytes |
|---|---:|---:|
| Images | 1 | 72,331 |
| Fonts (woff2) | 12 | 192,388 |
| **Total binary** | **13** | **264,719** |

> **No videos, no logo files in editable formats (no SVG/AI/PSD/Figma), no motion files** — `brand/README.md:82-89` says these live elsewhere.

> The icon set (`assets/_icons.html`) is a single text file containing inline `<svg>` `<symbol>` definitions for ~50 lucide-style icons; it is **not binary** and is therefore captured in the full text dump (04b), not here.
