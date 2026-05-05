'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { MobileDrawer } from '@/components/layout/MobileDrawer/MobileDrawer';
import { Icon } from '@/components/primitives/Icon/Icon';
import styles from './AppShell.module.scss';
import type { AppShellProps } from './AppShell.types';

export function AppShell({ sidebar, children }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={styles.app}>
      <div className={styles.sidebarDesktop}>
        <Sidebar {...sidebar} />
      </div>

      <button
        type="button"
        className={styles.menuTrigger}
        aria-label="פתח תפריט"
        onClick={() => setDrawerOpen(true)}
      >
        <Icon name="list" size="md" />
      </button>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Sidebar {...sidebar} />
      </MobileDrawer>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
