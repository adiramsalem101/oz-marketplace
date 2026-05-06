import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/layout/Topbar/Topbar';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Pill } from '@/components/primitives/Pill/Pill';
import type { PillTone } from '@/components/primitives/Pill/Pill.types';
import { Icon } from '@/components/primitives/Icon/Icon';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function MyListingsPage() {
  const supabase = await createServerClient();
  const { data: listings } = await supabase
    .from('listings')
    .select('id, title, city, status, bed_count, monthly_rent_per_bed, verification_level, created_at')
    .order('created_at', { ascending: false });

  return (
    <>
      <Topbar
        title="הנכסים שלי"
        subtitle={listings?.length ? `${listings.length} נכסים` : 'אין עדיין נכסים'}
        actions={
          <Link href="/listings/new">
            <Button variant="cta" iconStart={<Icon name="plus" size="sm" />}>
              הוסף נכס
            </Button>
          </Link>
        }
      />
      <div className={styles.content}>
        {!listings?.length ? (
          <Card variant="outline" className={styles.empty}>
            <h2>עדיין לא פרסמתם נכסים</h2>
            <p>הוסיפו את הנכס הראשון שלכם והתחילו לקבל פניות מתאגידי בנייה.</p>
            <Link href="/listings/new">
              <Button variant="cta">פרסמו את הנכס הראשון</Button>
            </Link>
          </Card>
        ) : (
          <Card>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>שם</th>
                  <th>עיר</th>
                  <th>מיטות</th>
                  <th>מחיר למיטה</th>
                  <th>סטטוס</th>
                  <th>אימות</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listings.map(l => (
                  <tr key={l.id}>
                    <td>{l.title}</td>
                    <td>{l.city}</td>
                    <td>{l.bed_count}</td>
                    <td>₪{l.monthly_rent_per_bed.toLocaleString('he-IL')}</td>
                    <td><StatusPill status={l.status} /></td>
                    <td><VerificationPill level={l.verification_level} /></td>
                    <td>
                      <Link href={`/listings/${l.id}`}>
                        <Button variant="ghost" size="sm">ערוך</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </>
  );
}

function StatusPill({ status }: { status: string }) {
  const labels: Record<string, string> = {
    draft: 'טיוטה',
    published: 'פעיל',
    archived: 'בארכיון',
  };
  const tones: Record<string, PillTone> = {
    draft: 'gray',
    published: 'green-deep',
    archived: 'orange-deep',
  };
  return <Pill tone={tones[status] ?? 'gray'}>{labels[status] ?? status}</Pill>;
}

function VerificationPill({ level }: { level: number }) {
  if (level === 1) return <Pill tone="gray">פרטים מהבעלים</Pill>;
  if (level === 2) return <Pill tone="blue-deep">מאומת מרחוק</Pill>;
  if (level === 3) return <Pill tone="green-deep">מאומת בשטח</Pill>;
  return null;
}
