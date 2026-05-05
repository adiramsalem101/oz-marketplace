import type { ReactNode } from 'react';

export interface NavItem {
  href: string;
  icon: string;
  label: string;
  badgeCount?: number;
  badgeAlert?: boolean;
}

export interface SidebarProps {
  navItems: NavItem[];
  tenantName: string;
  tenantLabel?: string;
  tenantLogoUrl?: string;
  user: { name: string; role: string; avatarUrl?: string };
  className?: string;
  /** Active path; sidebar marks the matching nav item active. */
  activePath?: string;
  /** Optional element rendered above the user widget (e.g. tenant settings). */
  footer?: ReactNode;
}
