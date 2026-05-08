import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { Card } from '@/components/primitives/Card/Card';
import { Pill } from '@/components/primitives/Pill/Pill';
import type { PillTone } from '@/components/primitives/Pill/Pill.types';
import { OwnerBookingActions } from './OwnerBookingActions';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function OwnerBookingsPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in?next=/bookings/owner');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'owner_company') redirect('/');

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, status, start_date, end_date, worker_count, total_amount, request_message, created_at, corporation_id, listing_id, listings(title, city), corporation:profiles!bookings_corporation_id_fkey(full_name, email)')
    .order('created_at', { ascending: false });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>בקשות הזמנה</h1>
        <p>{bookings?.length ?? 0} בקשות</p>
      </header>

      {!bookings?.length ? (
        <Card variant="outline" className={styles.empty}>
          <h2>עדיין לא קיבלתם בקשות</h2>
          <p>בקשות שריון מתאגידי בנייה יופיעו כאן.</p>
        </Card>
      ) : (
        <div className={styles.list}>
          {bookings.map(b => {
            const listing = Array.isArray(b.listings) ? b.listings[0] : b.listings;
            const corp = Array.isArray(b.corporation) ? b.corporation[0] : b.corporation;
            return (
              <Card key={b.id} className={styles.row}>
                <div className={styles.rowMain}>
                  <h3 className={styles.title}>{listing?.title ?? 'נכס'}</h3>
                  <p className={styles.meta}>
                    {corp?.full_name ?? '—'} · {b.worker_count} עובדים · {b.start_date} – {b.end_date}
                  </p>
                  {b.request_message ? (
                    <p className={styles.message}>{b.request_message}</p>
                  ) : null}
                </div>
                <div className={styles.rowSide}>
                  <BookingStatusPill status={b.status} />
                  <span className={styles.amount}>₪{b.total_amount.toLocaleString('he-IL')}</span>
                  {b.status === 'requested' ? (
                    <OwnerBookingActions bookingId={b.id} />
                  ) : null}
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
