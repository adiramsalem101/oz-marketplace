import 'server-only';
import { cache } from 'react';
import { createServerClient } from '@/lib/supabase/server';

export type FeatureFlags = Record<string, boolean>;

/**
 * Read all feature flags. Cached per server request via React's cache().
 * Read once per request — admin-only mutations from Studio are reflected
 * on the next request boundary.
 */
export const getFeatureFlags = cache(async (): Promise<FeatureFlags> => {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('feature_flags')
    .select('key, value');

  if (error) {
    console.error('[feature-flags] Failed to load:', error);
    return {};  // Fail-closed: all flags off.
  }

  return Object.fromEntries((data ?? []).map(row => [row.key, row.value]));
});
