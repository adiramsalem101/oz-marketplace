'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/primitives/Icon/Icon';
import styles from './PublicNav.module.scss';

export function PublicNavMobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close when navigating to a new route. The setState-in-effect
  // pattern is the only way to react to App Router pathname changes
  // without intercepting Link clicks (which arrive as children here).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false); }, [pathname]);

  // Body scroll lock while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

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
