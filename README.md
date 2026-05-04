# oz-marketplace

A Hebrew-first marketplace for placing foreign workers into housing in Israel. Built as a new project inspired by `worker-housing-platform` (legacy); product specs, brand system, and database design are taken as authoritative inputs from that project, the code is not.

## Stack

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling:** SCSS only (CSS Modules + token system in `/styles/`). No Tailwind, no CSS-in-JS.
- **Direction:** Hebrew RTL primary; English LTR for technical contexts.
- **Backend:** Supabase (Postgres, Auth, Storage, Edge Functions)
- **Payments:** Pelecard (IRON_RULE 2 — only allowed provider)
- **AI Import:** Anthropic Claude (Haiku)
- **Other vendors:** Twilio (SMS OTP), HelloSign (e-sign), Resend (email)
- **Hosting:** Vercel

## Environments

| Env | URL | Branch | Deploy |
|---|---|---|---|
| **local** | http://localhost:3000 | working tree | `npm run dev` |
| **staging** | per-PR Vercel Preview (no fixed URL) | `staging` | auto on push |
| **production** | (TBD — added when first prod deploy lands) | `main` | manual, requires explicit approval (IRON_RULE 4) |

## Run locally

1. Copy the env template and fill in real values:

   ```bash
   cp .env.example .env.local
   # then populate values — ask Adir for the active dev keys
   ```

2. Install:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open <http://localhost:3000>. The page should render in Hebrew, right-to-left, with the brand mark `🏗 עוז` and a token sanity-check section.

## Contributing

1. Read `docs/IRON_RULES.md` first. The 9 rules govern everything; they are non-negotiable.
2. Read `docs/BUILD_PLAN.md` to understand the locked decisions, scales, and architecture.
3. Phase work follows `docs/PROMPT_LIBRARY.md`. Each phase is a self-contained Claude Code prompt that ends in a checkpoint. Don't skip phases.
4. PRs target the `staging` branch and require Adir's review before promotion to `main`.

## Docs index

- `BUILD_PLAN.md` — locked CP-1 decisions, scales, architecture
- `PROMPT_LIBRARY.md` — phase-by-phase Claude Code prompts
- `IRON_RULES.md` — the 9 non-negotiable rules
- `DECISIONS_LOG.md` — append-only decision history
- `GLOSSARY.md` — vocabulary used across the project
- `SCHEMA.md` — database schema (filled in Phase 3+)
- `ROLES_AND_RLS.md` — auth roles and row-level security (filled in Phase 3)
- `INTEGRATIONS.md` — external systems and their wiring
- `HOSTEL_BOOKING_ENGINE.md` — isolated booking engine for the 4 AM HOSTELS
- `TASKS.md` — active phase + tracker
- `specs/` — feature-level specs per persona (B2B / B2C / Demand)
- `specs/dreams/` — future-roadmap items, explicitly not-MVP
