# CP-4c-prep — Booking flow scaffolding (mock-first)

**Goal:** ship the entire booking flow (request → accept → pay → sign → confirm) end-to-end against **Mock providers** so the work isn't blocked on Pelecard/HelloSign/Resend credentials. When real creds arrive, a separate small phase (CP-4c-finalize) flips the provider factories from mocks to real impls and runs an integration-test pass.

**Branch:** `feat/cp-4c-prep-booking-flow`

**Reads first:** `/CLAUDE.md`, `/docs/DECISIONS_LOG.md`, `/docs/SCHEMA.md`, `/docs/IRON_RULES.md`, and the existing booking schema from CP-4b.

---

## 1. What this phase ships

A working booking flow in dev, locally, with no third-party creds:

- An owner accepts/rejects a booking request → corp gets email (logged to console).
- Corp pays → returns from a fake "Pelecard" page → booking moves to `paid`.
- A mock "HelloSign" returns `all_signed` after a short delay → booking moves to `confirmed`.
- All state transitions trigger the right emails, all rendered as Hebrew RTL React Email templates.
- An internal `/dev/emails` preview route renders every email template with sample data — design QA without creds.

When the real creds arrive, only the provider factories change. Booking flow code, schema, UI, emails — none of it gets rewritten.

## 2. What this phase does NOT ship

- Real end-to-end test with Pelecard / HelloSign / Resend (waiting on creds)
- Production webhook URL configuration
- Owner payout flow (`split_payment` feature flag is `false`; manual settlement stays in MVP per DECISIONS_LOG)
- Refund / cancellation-after-payment policy (see Open Question 4 below)
- The `/dev/emails` route in production builds — dev/preview only

## 3. Architecture

### 3.1 Provider adapter pattern (three interfaces)

For each external integration, the same shape:

```
lib/providers/
├── payment/
│   ├── types.ts              # PaymentProvider interface + DTOs
│   ├── mock.ts               # MockPaymentProvider
│   ├── pelecard.ts           # PelecardPaymentProvider (un-runnable until creds)
│   └── index.ts              # factory: picks based on env.PAYMENT_PROVIDER
├── signature/
│   ├── types.ts
│   ├── mock.ts
│   ├── hellosign.ts
│   └── index.ts
└── email/
    ├── types.ts
    ├── mock.ts
    ├── resend.ts
    ├── templates/            # React Email templates
    │   ├── BookingRequested.tsx
    │   ├── BookingAccepted.tsx
    │   ├── PaymentConfirmed.tsx
    │   ├── BookingConfirmed.tsx
    │   ├── BookingRejected.tsx
    │   └── BookingCancelled.tsx
    └── index.ts
```

Booking flow code imports `paymentProvider`, `signatureProvider`, `emailProvider` from `lib/providers/*/index.ts` — never directly from a concrete implementation. **CP-4c-finalize is a no-op from the booking flow's perspective** beyond flipping env vars.

### 3.2 Mock behaviors (realistic enough to drive the UI)

- **MockPaymentProvider** — `createPaymentLink()` returns a URL pointing to a built-in `/dev/mock-pay/[token]` route. That route shows a fake confirm screen; clicking "Pay" calls the local webhook endpoint with a signed-looking payload. Approves after a 2-second delay to simulate real-world latency.
- **MockSignatureProvider** — `createSignatureRequest()` returns a fake signing URL pointing to `/dev/mock-sign/[token]`. The mock signing page lets you click "Sign as owner" / "Sign as corp" buttons, which fire `signature_request_signed` events to the webhook. When both signed, `signature_request_all_signed` fires.
- **MockEmailProvider** — `send()` logs the rendered HTML to console + writes to an in-memory store readable by `/dev/emails/sent` (so you can preview what got "sent"). Returns a fake message ID.

The mocks should be confidence-inspiring, not toys. The UX of the dev booking flow should feel like the production booking flow.

### 3.3 Booking state machine

States already exist in the CP-4b schema. Add a state-transition module that enforces validity:

```
lib/bookings/state-machine.ts
```

Valid transitions:

| From | To | Trigger | Side effects |
|---|---|---|---|
| `requested` | `accepted` | owner action | email to corp; create payment link |
| `requested` | `rejected` | owner action | email to corp |
| `accepted` | `paid` | payment webhook | email to both; create signature request |
| `paid` | `confirmed` | `all_signed` signature webhook | email to both; final receipt |
| `requested` | `cancelled` | corp action | email to owner |
| `accepted` | `cancelled` | corp action (pre-payment) | email to owner; void payment link |

Any other transition is rejected.

Each transition:
1. Validates the current state (read-modify-write with `WHERE state = $expected`)
2. Writes an audit log entry
3. Updates `bookings.state` + relevant timestamps
4. Triggers the side-effect email (the email send is queued, not awaited — see 3.4)

### 3.4 Email triggering

Emails are queued in a `booking_events` table (insert-only). A small handler reads new events and calls `emailProvider.send()`. For the mock path this is synchronous; in production it can become a real queue later.

This separates "the booking state changed" from "the email got sent" — better testability, and the email send can fail without breaking the state transition.

## 4. Schema deltas

Two new tables (one migration):

```sql
-- Audit trail for booking transitions
CREATE TABLE booking_state_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  from_state TEXT,
  to_state TEXT NOT NULL,
  actor_role TEXT NOT NULL,  -- 'owner' | 'corp' | 'system' | 'webhook'
  actor_id UUID,             -- nullable for 'system' / 'webhook'
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Email send queue (insert-only event log)
CREATE TABLE booking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,  -- matches email template name
  recipient_email TEXT NOT NULL,
  recipient_role TEXT NOT NULL,  -- 'owner' | 'corp'
  payload JSONB,
  sent_at TIMESTAMPTZ,
  send_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON booking_state_log (booking_id, created_at DESC);
CREATE INDEX ON booking_events (sent_at) WHERE sent_at IS NULL;  -- pending sends
```

RLS:
- `booking_state_log` — readable by either party of the booking (RLS via `booking_id → bookings` ownership check)
- `booking_events` — service-role only (internal use; not exposed to clients)

## 5. Checkpoints

### CP-4c-prep-a — Provider scaffolding (~1 hour CC)

- Create `lib/providers/{payment,signature,email}` folder structure
- Write all three `types.ts` interfaces
- Implement all three Mock providers
- Implement all three real providers (Pelecard, HelloSign, Resend) — typed and structured, but un-runnable
- Provider factories with env var switching, default `mock`
- `.env.example` with every CP-4c variable
- New doc: `/docs/CP_4C_LEASE_TEMPLATE_FIELDS.md` listing the exact HelloSign template field labels the code expects

**Self-tests:** `pnpm build`, `pnpm lint`, providers compile, factories return Mock when env is unset.

### CP-4c-prep-b — Booking state machine + schema (~1 hour CC)

- New migration with `booking_state_log` + `booking_events` tables + RLS
- `lib/bookings/state-machine.ts` with all valid transitions
- Server actions or route handlers for the user-driven transitions (`acceptBooking`, `rejectBooking`, `cancelBooking`)
- Each transition writes to `booking_state_log` and enqueues a `booking_events` row
- A small worker function `processBookingEvents()` that drains the queue and calls `emailProvider.send()` — invoked synchronously from transition handlers in dev; can be moved to a cron in CP-4c-finalize

**Self-tests:** invalid transitions throw; valid transitions write log + event; mock email logs to console.

### CP-4c-prep-c — Booking detail page (~1.5 hours CC)

- `/bookings/[id]` page enhanced for both roles
- Status badge + timeline (rendered from `booking_state_log`)
- Action buttons per state per role (per the transition table in 3.3)
- Payment section: shows mock-payment-link button when state is `accepted` and viewer is corp
- Signature section: shows signing-link button when state is `paid`, separate links for owner and corp
- Owner-view and corp-view both implemented; role check determines which actions render

**Self-tests:** walk a booking through the full state machine in the UI; all transitions visible in timeline.

### CP-4c-prep-d — Email templates + webhook receivers + dev preview (~2 hours CC)

- Add `@react-email/components` dep
- Six React Email templates in Hebrew RTL, brand-token colors (use the canonical palette; `--blue-deep` for headers, `--orange` for CTAs, `--ink` for body)
- Mock webhooks: `/api/webhooks/pelecard` and `/api/webhooks/hellosign` route handlers that accept the mock provider's payload shape, verify signature (using the mock's signing key for now), and call the appropriate state transition
- Real webhook signature verification logic written but gated on env presence — when env is missing, signature check is skipped (dev mode)
- `/dev/emails` route (Next.js dev-only): grid of all 6 templates rendered with sample data, click to preview each in isolation
- `/dev/emails/sent` route: list of in-memory "sent" emails from MockEmailProvider

**Self-tests:** trigger all 6 emails by walking a booking through every transition; all render correctly in the preview route; webhook endpoints return 200 for mock payloads.

## 6. Open questions for Adir (decide before CP-4c-prep-d)

1. **React Email vs plain HTML templates?** Recommend React Email — typed, previewable, easy to maintain. Adds one dep. **Decision needed.**

2. **HelloSign templates vs signature fields on a PDF?** Two HelloSign integration modes:
   - **(A) Template mode** — Adir uploads the lease to HelloSign UI once, defines fields, code references the template by ID and fills field values. Less code, more setup-once.
   - **(B) Document mode** — Code generates a PDF from data, sends to HelloSign with field coordinates. More flexibility, way more code.
   - Recommend (A). **Decision needed.** Note: (A) is what the `CP_4C_LEASE_TEMPLATE_FIELDS.md` doc assumes.

3. **Cancellation-after-payment policy?** Pre-payment is easy: corp cancels, payment link voids, refund N/A. Post-payment requires a refund policy. Pelecard contract terms will dictate fees. **Recommend deferring** — for MVP, no cancellation after payment without manual ops intervention. Add a button-less "contact support" message. **Confirm.**

4. **Audit log visible to users?** The `booking_state_log` powers the timeline. Show full detail (with actor names) or just state + timestamp? **Recommend just state + timestamp** for MVP — less PII surface area, easier UX. Names exposed only on the action that produced the row. **Confirm.**

5. **Mock-pay route in production builds?** The `/dev/mock-pay/[token]` and `/dev/mock-sign/[token]` routes are dev-only conveniences. Should they be stripped from production bundles via `process.env.NODE_ENV` gates, or stay accessible for staging? **Recommend strip in production, keep in staging** via an `OZ_ENABLE_DEV_ROUTES=true` env flag. **Confirm.**

## 7. What's deferred to CP-4c-finalize (after creds arrive)

- Add real env vars to Vercel project
- Flip `PAYMENT_PROVIDER=pelecard` etc. in staging
- Configure real webhook URLs in Pelecard / HelloSign dashboards
- Run real end-to-end booking with a test card
- Fix the provider impls where reality diverges from docs (especially Pelecard — Israeli payment APIs are quirky)
- Verify Resend sending domain reputation; warm up if needed
- Production webhook secrets rotation

Expect ~1 day for this pass. Most of it will be Pelecard quirks.

## 8. Acceptance criteria

CP-4c-prep is done when, in a fresh local clone with `PAYMENT_PROVIDER=mock SIGNATURE_PROVIDER=mock EMAIL_PROVIDER=mock`:

1. A construction-corporation user can request a booking on a listing
2. The owner sees the request in `/bookings/owner` and can accept or reject
3. On accept, the corp sees a "pay now" link that opens the mock payment page
4. After clicking the mock pay confirm, the booking moves to `paid` and both users see signing links
5. After both users click "sign" in the mock signature page, the booking moves to `confirmed`
6. The full timeline is visible on the booking detail page for both parties
7. At every state transition, the right email shows up in `/dev/emails/sent`
8. `/dev/emails` shows all 6 templates rendered with sample data
9. `pnpm build` and `pnpm lint` clean; no off-palette hex; no Tailwind classes
10. RLS check: corp can't see other corps' bookings; owner can't see other owners' bookings

## 9. Out of scope (do not touch in this phase)

- Auth pages (`app/sign-in/*`, `app/sign-up/*`) — locked
- Homepage and public surface — just polished, don't touch unless explicitly broken
- `/listings` browse page — owned by CP-4b, no changes
- Yield calculator, AI Import, ratings, virtual tours — post-MVP
- Real DB schema for owner payouts — manual settlement in MVP
- Owner dashboard analytics — out of MVP scope

---

## Per-checkpoint kickoff template (paste at start of each CP)

```
Task: execute CP-4c-prep-<a|b|c|d> per /docs/CP_4C_PREP_BUILD_PLAN.md.

Read /CLAUDE.md, the BUILD_PLAN, and the prior checkpoint's commits before starting.

Halt before commit per CLAUDE.md workflow.
```

Before starting CP-4c-prep-a, Adir should answer the five open questions in §6 — they're cheap to decide now and expensive to re-litigate mid-build.
