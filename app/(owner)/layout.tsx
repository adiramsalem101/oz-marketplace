import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { AppShell } from '@/components/layout/AppShell/AppShell';
import { getFeatureFlags } from '@/lib/feature-flags';
import { buildOwnerNav } from './nav';

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in?next=/listings');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'owner_company') {
    redirect('/');  // Wrong role; bounce to homepage.
  }

  const flags = await getFeatureFlags();
  const navItems = buildOwnerNav(flags);

  return (
    <AppShell
      sidebar={{
        navItems,
        tenantName: profile.full_name ?? 'החברה שלי',
        user: { name: profile.full_name ?? '', role: 'בעל נכסים' },
        activePath: '/listings',
      }}
    >
      {children}
    </AppShell>
  );
}
