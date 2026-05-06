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
-- only 'owner_company' and 'construction_corporation' can be assigned via
-- signup. 'owner_individual' and 'admin' are NEVER assignable via signup;
-- if requested, the trigger silently coerces to the default 'owner_company'.
-- Promotion to those roles is admin-only via Studio.
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

  -- Two roles are signupable in MVP: owner_company (supply) and
  -- construction_corporation (demand). Anything else coerces to default.
  IF requested_role = 'owner_company' THEN
    final_role := 'owner_company';
  ELSIF requested_role = 'construction_corporation' THEN
    final_role := 'construction_corporation';
  ELSE
    final_role := 'owner_company';  -- default
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

COMMENT ON TYPE public.user_role IS 'User role enum. See docs/DECISIONS_LOG.md 2026-05-05 + 2026-05-06 for semantics.';
COMMENT ON TABLE public.profiles IS 'One row per auth.users row, created by handle_new_user trigger.';
COMMENT ON FUNCTION public.handle_new_user() IS 'Creates a profiles row on auth.users INSERT. Two roles signupable in MVP: owner_company, construction_corporation. owner_individual and admin always coerce to default.';
