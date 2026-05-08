'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/primitives/Button/Button';
import { createBrowserClient } from '@/lib/supabase/browser';
import styles from './OwnerBookingActions.module.scss';

/**
 * CP-4b: accept/reject buttons just write the status. CP-4c upgrades
 * accept to also generate a Pelecard payment link and send email.
 */
export function OwnerBookingActions({ bookingId }: { bookingId: string }) {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [busy, setBusy] = useState<'accept' | 'reject' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function update(status: 'accepted' | 'rejected') {
    setError(null);
    setBusy(status === 'accepted' ? 'accept' : 'reject');
    const { error: e } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);
    if (e) {
      setError(e.message);
      setBusy(null);
      return;
    }
    router.refresh();
  }

  return (
    <div className={styles.actions}>
      <Button variant="ghost" size="sm" onClick={() => update('rejected')} disabled={busy !== null}>
        {busy === 'reject' ? 'דוחה…' : 'דחה'}
      </Button>
      <Button variant="cta" size="sm" onClick={() => update('accepted')} disabled={busy !== null}>
        {busy === 'accept' ? 'מאשר…' : 'אשר'}
      </Button>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
