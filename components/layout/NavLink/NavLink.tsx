'use client';

import Link from 'next/link';
import { Icon } from '@/components/primitives/Icon/Icon';
import { Badge } from '@/components/primitives/Badge/Badge';
import styles from './NavLink.module.scss';
import type { NavLinkProps } from './NavLink.types';

export function NavLink({
  href,
  icon,
  label,
  active = false,
  badgeCount,
  badgeAlert = false,
}: NavLinkProps) {
  const classes = [styles.link, active && styles.active].filter(Boolean).join(' ');

  return (
    <Link href={href} className={classes} aria-current={active ? 'page' : undefined}>
      <Icon name={icon} size="md" className={styles.icon} />
      <span className={styles.label}>{label}</span>
      {badgeCount && badgeCount > 0 ? (
        <Badge tone={badgeAlert ? 'alert' : 'gray'} count={badgeCount} className={styles.badge} />
      ) : null}
    </Link>
  );
}
