import type { ReactNode } from 'react';
import type { SidebarProps } from '@/components/layout/Sidebar/Sidebar.types';

export interface AppShellProps {
  /** Sidebar config; same shape Sidebar takes directly. */
  sidebar: SidebarProps;
  children: ReactNode;
}
