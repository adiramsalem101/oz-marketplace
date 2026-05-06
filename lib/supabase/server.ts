import { createServerClient as createServerClientImpl } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client for use in Server Components, Route Handlers,
 * and Server Actions. Reads/writes auth cookies via Next's cookies() API.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createServerClientImpl(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from Server Component — ignore.
            // Middleware refreshes the session cookies; this is fine.
          }
        },
      },
    },
  );
}
