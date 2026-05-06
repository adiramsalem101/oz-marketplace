import type { NavItem } from '@/components/layout/Sidebar/Sidebar.types';
import type { FeatureFlags } from '@/lib/feature-flags';

export function buildOwnerNav(flags: FeatureFlags): NavItem[] {
  const items: NavItem[] = [
    { href: '/listings', icon: 'building', label: 'הנכסים שלי' },
    { href: '/bookings/owner', icon: 'file', label: 'בקשות הזמנה' },
  ];

  if (flags['nav.dashboard']) {
    items.unshift({ href: '/dashboard', icon: 'grid', label: 'סקירה' });
  }

  if (flags['nav.calculator']) {
    items.push({ href: '/calculator', icon: 'chart', label: 'מחשבון תשואה' });
  }

  return items;
}
