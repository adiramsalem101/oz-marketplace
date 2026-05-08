-- ─────────────────────────────────────────────────────────────────
-- Migration 20260506000004 — bookings: schema + RLS + state machine
-- ─────────────────────────────────────────────────────────────────

CREATE TYPE public.booking_status AS ENUM (
  'requested',   -- Corporation submitted; owner not yet seen
  'rejected',    -- Owner rejected
  'accepted',    -- Owner accepted; awaiting payment
  'paid',        -- Corporation paid via Pelecard; awaiting contract signatures
  'confirmed',   -- Both parties signed contract
  'cancelled'    -- Cancelled at any stage
);

CREATE TABLE public.bookings (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id          uuid NOT NULL REFERENCES public.listings(id) ON DELETE RESTRICT,
  corporation_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  owner_id            uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,

  status              public.booking_status NOT NULL DEFAULT 'requested',
  start_date          date NOT NULL,
  end_date            date NOT NULL CHECK (end_date > start_date),
  worker_count        smallint NOT NULL CHECK (worker_count >= 1),

  -- Pricing snapshot at request time (in ILS, no decimals)
  monthly_rent_total  integer NOT NULL,
  oz_commission       integer NOT NULL,
  total_amount        integer NOT NULL,

  -- Pelecard
  pelecard_payment_url     text,
  pelecard_transaction_id  text,
  paid_at                  timestamptz,

  -- HelloSign
  hellosign_request_id     text,
  contract_signed_at       timestamptz,

  -- Notes from corporation when requesting
  request_message     text,

  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX bookings_listing_idx ON public.bookings(listing_id);
CREATE INDEX bookings_corporation_idx ON public.bookings(corporation_id);
CREATE INDEX bookings_owner_idx ON public.bookings(owner_id);
CREATE INDEX bookings_status_idx ON public.bookings(status);

CREATE TRIGGER bookings_set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Corporation can SELECT their own bookings.
CREATE POLICY "bookings_select_corporation"
  ON public.bookings FOR SELECT TO authenticated
  USING (auth.uid() = corporation_id);

-- Owner can SELECT bookings on their listings.
CREATE POLICY "bookings_select_owner"
  ON public.bookings FOR SELECT TO authenticated
  USING (auth.uid() = owner_id);

-- Corporation can INSERT a booking request.
CREATE POLICY "bookings_insert_corporation"
  ON public.bookings FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = corporation_id
    AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'construction_corporation'
  );

-- Owner can UPDATE only the bookings on their listings, and only the
-- fields they're allowed to change (status transitions handled in app code).
CREATE POLICY "bookings_update_owner"
  ON public.bookings FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Service role bypasses RLS for webhook updates.

COMMENT ON TABLE public.bookings IS 'Booking requests from construction_corporation to owner_company. See PROMPT_LIBRARY Phase 4 for lifecycle.';
