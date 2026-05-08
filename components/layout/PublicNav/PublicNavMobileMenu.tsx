'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/primitives/Icon/Icon';
import styles from './PublicNav.module.scss';

export function PublicNavMobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close when navigating to a new route.
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className={styles.mobileWrap}>
      <button
        type="button"
        className={styles.hamburger}
        aria-expanded={open}
        aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
        onClick={() => setOpen(o => !o)}
      >
        <Icon name={open ? 'x' : 'list'} />
      </button>
      {open ? (
        <div className={styles.mobileDropdown}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
