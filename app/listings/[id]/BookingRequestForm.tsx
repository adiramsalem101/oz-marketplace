'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/primitives/Button/Button';
import { Input } from '@/components/primitives/Input/Input';
import { createBrowserClient } from '@/lib/supabase/browser';
import styles from './BookingRequestForm.module.scss';

const OZ_COMMISSION_RATE = 0.05;  // 5% per existing brand language. Move to feature_flags or a config table if it changes.

interface Props {
  listing: {
    id: string;
    owner_id: string;
    monthly_rent_per_bed: number;
    bed_count: number;
  };
}

export function BookingRequestForm({ listing }: Props) {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [workers, setWorkers] = useState(listing.bed_count);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const months = monthsBetween(start, end);
  const monthlyRent = workers * listing.monthly_rent_per_bed;
  const totalRent = monthlyRent * months;
  const commission = Math.round(totalRent * OZ_COMMISSION_RATE);
  const total = totalRent + commission;

  async function submit() {
    setError(null);
    setBusy(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('יש להתחבר מחדש'); setBusy(false); return; }

    const { error: e } = await supabase.from('bookings').insert({
      listing_id: listing.id,
      corporation_id: user.id,
      owner_id: listing.owner_id,
      start_date: start,
      end_date: end,
      worker_count: workers,
      monthly_rent_total: totalRent,
      oz_commission: commission,
      total_amount: total,
      request_message: message || null,
    });

    if (e) { setError(e.message); setBusy(false); return; }

    router.push('/bookings/corporation');
  }

  return (
    <div className={styles.form}>
      <h3>בקשת שריון</h3>
      <Input type="date" label="תאריך התחלה" value={start} onChange={e => setStart(e.target.value)} fullWidth />
      <Input type="date" label="תאריך סיום" value={end} onChange={e => setEnd(e.target.value)} fullWidth />
      <Input type="number" label="מספר עובדים" value={String(workers)} onChange={e => setWorkers(parseInt(e.target.value) || 0)} fullWidth />
      <label className={styles.messageLabel}>
        <span>הודעה לבעל הנכס (אופציונלי)</span>
        <textarea
          className={styles.textarea}
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </label>

      {months > 0 && workers > 0 ? (
        <div className={styles.summary}>
          <div className={styles.summaryRow}><span>חודשים</span><span>{months}</span></div>
          <div className={styles.summaryRow}><span>שכירות</span><span>₪{totalRent.toLocaleString('he-IL')}</span></div>
          <div className={styles.summaryRow}><span>עמלת עוז (5%)</span><span>₪{commission.toLocaleString('he-IL')}</span></div>
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>סה״כ</span><span>₪{total.toLocaleString('he-IL')}</span></div>
        </div>
      ) : null}

      {error ? <p className={styles.error}>{error}</p> : null}

      <Button variant="cta" fullWidth onClick={submit} disabled={busy || !start || !end || workers <= 0}>
        {busy ? 'שולח…' : 'שלח בקשה'}
      </Button>
    </div>
  );
}

function monthsBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const days = (e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24);
  return Math.ceil(days / 30);
}
