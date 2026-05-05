'use client';

import { Icon } from '@/components/primitives/Icon/Icon';
import styles from './TenantSwitcher.module.scss';
import type { TenantSwitcherProps } from './TenantSwitcher.types';

export function TenantSwitcher({
  tenantName,
  tenantLabel = 'ארגון',
  logoUrl,
  className,
  ...rest
}: TenantSwitcherProps) {
  const classes = [styles.tenant, className].filter(Boolean).join(' ');
  return (
    <button type="button" className={classes} {...rest}>
      <span className={styles.logo} aria-hidden>
        {logoUrl ? <img src={logoUrl} alt="" /> : tenantName.charAt(0)}
      </span>
      <span className={styles.body}>
        <span className={styles.label}>{tenantLabel}</span>
        <span className={styles.name}>{tenantName}</span>
      </span>
      <Icon name="chev-down" size="sm" className={styles.chevron} />
    </button>
  );
}
