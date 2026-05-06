-- ─────────────────────────────────────────────────────────────────
-- Migration 20260506000002 — RLS for listings, listing_images, feature_flags
-- ─────────────────────────────────────────────────────────────────

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

-- LISTINGS
-- Public can SELECT only published listings.
CREATE POLICY "listings_select_published"
  ON public.listings
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Owner can SELECT their own listings (any status).
CREATE POLICY "listings_select_own"
  ON public.listings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

-- Owner-companies can INSERT listings owned by themselves.
CREATE POLICY "listings_insert_own_owner_company"
  ON public.listings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = owner_id
    AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'owner_company'
  );

-- Owner can UPDATE their own listings.
CREATE POLICY "listings_update_own"
  ON public.listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Owner can DELETE their own listings (or use 'archived' status).
CREATE POLICY "listings_delete_own"
  ON public.listings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- LISTING_IMAGES
-- Public can SELECT images of published listings only.
CREATE POLICY "listing_images_select_published"
  ON public.listing_images
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id AND l.status = 'published'
    )
  );

-- Owner can SELECT their own listing images.
CREATE POLICY "listing_images_select_own"
  ON public.listing_images
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id AND l.owner_id = auth.uid()
    )
  );

-- Owner can INSERT/UPDATE/DELETE images of their own listings.
CREATE POLICY "listing_images_modify_own"
  ON public.listing_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id AND l.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id AND l.owner_id = auth.uid()
    )
  );

-- FEATURE_FLAGS
-- Anyone authenticated can read flags. Mutation via service role only.
CREATE POLICY "feature_flags_select_all"
  ON public.feature_flags
  FOR SELECT
  TO anon, authenticated
  USING (true);
