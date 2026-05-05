import { BrandMark } from '@/components/layout/BrandMark/BrandMark';
import { TenantSwitcher } from '@/components/layout/TenantSwitcher/TenantSwitcher';
import { NavLink } from '@/components/layout/NavLink/NavLink';
import { UserWidget } from '@/components/layout/UserWidget/UserWidget';
import styles from './Sidebar.module.scss';
import type { SidebarProps } from './Sidebar.types';

export function Sidebar({
  navItems,
  tenantName,
  tenantLabel,
  tenantLogoUrl,
  user,
  className,
  activePath,
  footer,
}: SidebarProps) {
  const classes = [styles.side, className].filter(Boolean).join(' ');

  return (
    <aside className={classes} aria-label="ניווט ראשי">
      <div className={styles.head}>
        <BrandMark size="base" />
      </div>

      <div className={styles.tenantSlot}>
        <TenantSwitcher
          tenantName={tenantName}
          tenantLabel={tenantLabel}
          logoUrl={tenantLogoUrl}
        />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badgeCount={item.badgeCount}
            badgeAlert={item.badgeAlert}
            active={activePath === item.href}
          />
        ))}
      </nav>

      <div className={styles.foot}>
        {footer}
        <UserWidget {...user} />
      </div>
    </aside>
  );
}
