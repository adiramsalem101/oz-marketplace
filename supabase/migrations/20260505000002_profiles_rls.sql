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
