import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Card } from '@/components/primitives/Card/Card';
import { Pill } from '@/components/primitives/Pill/Pill';
import type { PillTone } from '@/components/primitives/Pill/Pill.types';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function CorporationBookingsPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in?next=/bookings/corporation');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'construction_corporation') redirect('/');

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, status, start_date, end_date, worker_count, total_amount, created_at, listing_id, listings(title, city)')
    .order('created_at', { ascending: false });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>בקשות השריון שלי</h1>
        <p>{bookings?.length ?? 0} בקשות</p>
      </header>

      {!bookings?.length ? (
        <Card variant="outline" className={styles.empty}>
          <h2>עדיין לא שלחתם בקשת שריון</h2>
          <p>גלשו במרקטפלייס כדי למצוא נכס מתאים.</p>
          <Link href="/listings" className={styles.link}>למרקטפלייס ←</Link>
        </Card>
      ) : (
        <div className={styles.list}>
          {bookings.map(b => {
            const l = Array.isArray(b.listings) ? b.listings[0] : b.listings;
            return (
              <Card key={b.id} className={styles.row}>
                <div className={styles.rowMain}>
                  <Link href={`/listings/${b.listing_id}`} className={styles.title}>
                    {l?.title ?? 'נכס'}
                  </Link>
                  <p className={styles.meta}>
                    📍 {l?.city ?? ''} · {b.worker_count} עובדים · {b.start_date} – {b.end_date}
                  </p>
                </div>
                <div className={styles.rowSide}>
                  <BookingStatusPill status={b.status} />
                  <span className={styles.amount}>₪{b.total_amount.toLocaleString('he-IL')}</span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}

function BookingStatusPill({ status }: { status: string }) {
  const labels: Record<string, string> = {
    requested: 'ממתין למענה',
    accepted: 'אושר — ממתין לתשלום',
    paid: 'שולם — ממתין לחתימה',
    confirmed: 'מאושר',
    rejected: 'נדחה',
    cancelled: 'בוטל',
  };
  const tones: Record<string, PillTone> = {
    requested: 'amber-soft',
    accepted: 'blue-soft',
    paid: 'blue-deep',
    confirmed: 'green-deep',
    rejected: 'red-soft',
    cancelled: 'gray',
  };
  return <Pill tone={tones[status] ?? 'gray'}>{labels[status] ?? status}</Pill>;
}
