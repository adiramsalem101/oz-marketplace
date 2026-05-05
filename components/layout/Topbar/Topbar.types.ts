import type { ReactNode } from 'react';

export interface TopbarProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Mobile-only menu trigger element (e.g. hamburger button) */
  menuTrigger?: ReactNode;
  className?: string;
}
