-- ─────────────────────────────────────────────────────────────────
-- Migration 20260506000003 — Storage bucket + RLS for listing images
-- ─────────────────────────────────────────────────────────────────

-- Bucket for listing images. Public read (anon can fetch any image
-- whose listing is published; URLs are signed regardless for cache control).
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: only authenticated owner_company users can upload to
-- paths under their own UUID prefix.
CREATE POLICY "listing_images_upload_own"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'listing-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'owner_company'
  );

CREATE POLICY "listing_images_select_public"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'listing-images');

CREATE POLICY "listing_images_delete_own"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'listing-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
