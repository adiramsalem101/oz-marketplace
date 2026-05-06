-- ─────────────────────────────────────────────────────────────────
-- Migration 20260506000001 — listings, listing_images, feature_flags
-- ─────────────────────────────────────────────────────────────────

-- Verification level smallint per BUILD_PLAN §3.B (OQ-6).
-- 1 = self-reported, 2 = remote attestation, 3 = on-site (deferred).
-- MVP only ships levels 1 and 2.

CREATE TYPE public.listing_status AS ENUM (
  'draft',       -- Owner is still editing; not visible publicly
  'published',   -- Live on marketplace
  'archived'     -- Withdrawn by owner; not visible publicly
);

CREATE TABLE public.listings (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id            uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status              public.listing_status NOT NULL DEFAULT 'draft',
  verification_level  smallint NOT NULL DEFAULT 1 CHECK (verification_level IN (1, 2, 3)),

  -- Display
  title               text NOT NULL,
  description         text,

  -- Location
  city                text NOT NULL,
  street              text,
  street_number       text,

  -- Capacity & pricing
  bed_count           smallint NOT NULL CHECK (bed_count BETWEEN 1 AND 50),
  monthly_rent_per_bed integer NOT NULL CHECK (monthly_rent_per_bed > 0),  -- in ILS, no decimals

  -- Amenities (extensible; add columns as we discover requirements)
  area_sqm            integer,
  bathroom_count      smallint,
  has_kitchen         boolean NOT NULL DEFAULT true,
  has_wifi            boolean NOT NULL DEFAULT false,
  has_parking         boolean NOT NULL DEFAULT false,

  -- Audit
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  published_at        timestamptz
);

CREATE INDEX listings_owner_idx ON public.listings(owner_id);
CREATE INDEX listings_status_idx ON public.listings(status);
CREATE INDEX listings_city_idx ON public.listings(city);
CREATE INDEX listings_published_idx ON public.listings(status, published_at DESC) WHERE status = 'published';

CREATE TRIGGER listings_set_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Listing images. Stored in Supabase Storage (bucket: 'listing-images'),
-- this table holds the path + display order.
CREATE TABLE public.listing_images (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  storage_path  text NOT NULL,
  display_order smallint NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX listing_images_listing_idx ON public.listing_images(listing_id, display_order);

-- Feature flags table per BUILD_PLAN §3.G.
-- Read at the server boundary; admin-only mutation via Studio.
CREATE TABLE public.feature_flags (
  key   text PRIMARY KEY,
  value boolean NOT NULL DEFAULT false,
  notes text
);

INSERT INTO public.feature_flags (key, value, notes) VALUES
  ('nav.dashboard',     false, 'Corporate dashboard nav entry. Off in MVP — feature deferred.'),
  ('nav.calculator',    false, 'Yield calculator nav entry. Off in MVP — feature deferred.'),
  ('nav.individual_signup', false, 'Self-serve signup for owner_individual. Off in MVP.'),
  ('listing.tier3_verification', false, 'Tier-3 paid on-site verification. Off in MVP.'),
  ('listing.virtual_tour', false, 'Virtual tour upload. Off in MVP.'),
  ('booking.split_payment', false, 'Pelecard split-payment to owner. Off in MVP — manual settlement.');

COMMENT ON TABLE public.listings IS 'Listings posted by owner_company users. See BUILD_PLAN §3.F for MVP scope.';
COMMENT ON TABLE public.feature_flags IS 'Runtime config flags. Read at server boundary, cached per request. See BUILD_PLAN §3.G.';
