'use client';

import Link from 'next/link';
import { Badge } from '@/components/primitives/Badge/Badge';
import styles from './Tabs.module.scss';
import type { TabsProps } from './Tabs.types';

export function Tabs({ items, activePath, className, ariaLabel = 'לשוניות' }: TabsProps) {
  const classes = [styles.tabs, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const active = activePath === item.href;
        const itemClasses = [styles.tab, active && styles.active].filter(Boolean).join(' ');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={itemClasses}
            role="tab"
            aria-selected={active}
          >
            <span>{item.label}</span>
            {item.badgeCount && item.badgeCount > 0 ? (
              <Badge tone={active ? 'blue-soft' : 'gray'} count={item.badgeCount} />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
