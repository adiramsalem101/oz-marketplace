import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { BrandMark } from '@/components/layout/BrandMark/BrandMark';
import { Button } from '@/components/primitives/Button/Button';
import { UserWidget } from '@/components/layout/UserWidget/UserWidget';
import { PublicNavMobileMenu } from './PublicNavMobileMenu';
import styles from './PublicNav.module.scss';

const NAV_LINKS = [
  { href: '/listings', label: 'נכסים זמינים' },
  { href: '/hostels',  label: 'אכסניות' },
];

export async function PublicNav() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  let role: string | null = null;
  let displayName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, full_name, email')
      .eq('id', user.id)
      .single();
    role = profile?.role ?? null;
    displayName = profile?.full_name ?? profile?.email ?? null;
  }

  const panelHref =
    role === 'owner_company' ? '/owner/listings'
    : role === 'construction_corporation' ? '/bookings/corporation'
    : '/';

  const navLinks = (
    <ul className={styles.navList}>
      {NAV_LINKS.map(l => (
        <li key={l.href}>
          <Link href={l.href} className={styles.navLink}>{l.label}</Link>
        </li>
      ))}
    </ul>
  );

  const actions = user ? (
    <div className={styles.signedIn}>
      <Link href={panelHref} className={styles.panelLink}>הפאנל שלי</Link>
      <UserWidget
        name={displayName ?? ''}
        role={
          role === 'owner_company' ? 'בעל נכסים'
          : role === 'construction_corporation' ? 'תאגיד בנייה'
          : ''
        }
      />
      <form action="/sign-out" method="post" className={styles.signOutForm}>
        <button type="submit" className={styles.signOutBtn}>התנתקות</button>
      </form>
    </div>
  ) : (
    <div className={styles.signedOut}>
      <Link href="/sign-in"><Button variant="ghost" size="sm">כניסה</Button></Link>
      <Link href="/sign-up"><Button variant="cta" size="sm">הצטרפו</Button></Link>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="עוז · דף הבית" className={styles.brandLink}>
          <BrandMark size="base" />
        </Link>

        <nav className={styles.desktopNav} aria-label="ראשי">
          {navLinks}
        </nav>

        <div className={styles.desktopActions}>
          {actions}
        </div>

        <PublicNavMobileMenu>
          <div className={styles.mobilePanel}>
            <nav aria-label="ראשי" className={styles.mobileNav}>{navLinks}</nav>
            <div className={styles.mobileActions}>{actions}</div>
          </div>
        </PublicNavMobileMenu>
      </div>
    </header>
  );
}
