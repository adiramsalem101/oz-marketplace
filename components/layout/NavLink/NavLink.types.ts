import type { ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
  badgeCount?: number;
  badgeAlert?: boolean;
  children?: ReactNode;
}
