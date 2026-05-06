'use client';

import { createBrowserClient as createBrowserClientImpl } from '@supabase/ssr';

/**
 * Browser-side Supabase client for use in Client Components.
 * Cached singleton so we don't re-create on every render.
 */
let client: ReturnType<typeof createBrowserClientImpl> | undefined;

export function createBrowserClient() {
  if (client) return client;
  client = createBrowserClientImpl(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return client;
}
