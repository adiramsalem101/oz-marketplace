export interface TabItem {
  href: string;
  label: string;
  badgeCount?: number;
}

export interface TabsProps {
  items: TabItem[];
  activePath?: string;
  className?: string;
  ariaLabel?: string;
}
