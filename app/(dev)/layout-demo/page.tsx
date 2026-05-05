import { AppShell } from '@/components/layout/AppShell/AppShell';
import { Topbar } from '@/components/layout/Topbar/Topbar';
import { Tabs } from '@/components/layout/Tabs/Tabs';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Icon } from '@/components/primitives/Icon/Icon';

import type { NavItem } from '@/components/layout/Sidebar/Sidebar.types';
import type { TabItem } from '@/components/layout/Tabs/Tabs.types';

import styles from './page.module.scss';

export const metadata = { title: 'עוז · Layout Demo' };

const NAV: NavItem[] = [
  { href: '/layout-demo',           icon: 'grid',     label: 'סקירה' },
  { href: '/layout-demo/properties', icon: 'building', label: 'נכסים', badgeCount: 12 },
  { href: '/layout-demo/workers',    icon: 'users',    label: 'עובדים' },
  { href: '/layout-demo/contracts',  icon: 'file', label: 'חוזים', badgeCount: 3, badgeAlert: true },
  { href: '/layout-demo/reports',    icon: 'chart', label: 'דוחות' },
  { href: '/layout-demo/ai-import',  icon: 'sparkle', label: 'ייבוא AI' },
  { href: '/layout-demo/settings',   icon: 'cog', label: 'הגדרות' },
];

const TABS: TabItem[] = [
  { href: '/layout-demo',            label: 'סקירה' },
  { href: '/layout-demo/properties', label: 'נכסים', badgeCount: 12 },
  { href: '/layout-demo/workers',    label: 'עובדים' },
  { href: '/layout-demo/contracts',  label: 'חוזים', badgeCount: 3 },
  { href: '/layout-demo/reports',    label: 'דוחות' },
  { href: '/layout-demo/ai-import',  label: 'ייבוא AI' },
  { href: '/layout-demo/settings',   label: 'הגדרות' },
];

export default function LayoutDemoPage() {
  return (
    <AppShell
      sidebar={{
        navItems: NAV,
        tenantName: 'AM Hostels',
        tenantLabel: 'ארגון',
        user: { name: 'אדיר אמסלם', role: 'מנהל ארגון' },
        activePath: '/layout-demo',
      }}
    >
      <Topbar
        title="סקירה כללית"
        subtitle="מבט כולל על הפעילות"
        actions={
          <>
            <Button variant="ghost" iconStart={<Icon name="download" size="sm" />}>
              ייצא
            </Button>
            <Button variant="cta" iconStart={<Icon name="plus" size="sm" />}>
              הוסף נכס
            </Button>
          </>
        }
      />
      <Tabs items={TABS} activePath="/layout-demo" />

      <div className={styles.content}>
        <Card>
          <h2>בדיקת AppShell</h2>
          <p>
            דף זה הוא משטח הסקירה ל-CP-2.5. במסכי דסקטופ הסרגל הצד מופיע מימין;
            במסכי מובייל יש כפתור תפריט בפינה ימין-עליון שפותח את הסרגל כ-Drawer.
          </p>
        </Card>

        <Card variant="outline">
          <h3>תרחישי בדיקה</h3>
          <ul className={styles.list}>
            <li>בדסקטופ (1280px) — הסרגל מימין, ה-Topbar בולט, הלשוניות מתחתיו, התוכן ממלא את שאר הרוחב.</li>
            <li>בטאבלט (768px) — הסרגל עדיין מימין, הפדינג מצטמצם.</li>
            <li>במובייל (375px) — הסרגל נסתר, כפתור תפריט מופיע בפינה ימין-עליון, לחיצה פותחת Drawer.</li>
            <li>גלילה אופקית של ה-Tabs במובייל — אפשרית, ללא scrollbar גלוי.</li>
            <li>NavLink פעיל מסומן בכתום; NavLink עם Badge מציג מספר; &ldquo;חוזים&rdquo; מציג Badge אדום.</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
