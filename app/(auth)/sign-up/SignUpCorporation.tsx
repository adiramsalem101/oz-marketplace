'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Input } from '@/components/primitives/Input/Input';
import { createBrowserClient } from '@/lib/supabase/browser';
import styles from './SignUpCompany.module.scss';

export function SignUpCorporation({ onBack }: { onBack: () => void }) {
  const supabase = createBrowserClient();
  const [email, setEmail] = useState('');
  const [corporationName, setCorporationName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | string>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !corporationName) return;
    setStatus('loading');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { role: 'construction_corporation', full_name: corporationName },
        emailRedirectTo: `${window.location.origin}/callback`,
      },
    });
    if (error) setStatus(error.message);
    else setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <Card variant="default" padded={false} className={styles.card}>
        <header className={styles.header}>
          <span aria-hidden="true" className={styles.crane}>🏗</span>
          <h2>בדקו את המייל</h2>
          <p>שלחנו קישור הפעלה ל-{email}</p>
        </header>
      </Card>
    );
  }

  return (
    <Card variant="default" padded={false} className={styles.card}>
      <header className={styles.header}>
        <span aria-hidden="true" className={styles.crane}>🏗</span>
        <h1>חשבון תאגיד בנייה</h1>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="שם התאגיד"
          placeholder="לדוגמה: בנייני הצפון בע״מ"
          value={corporationName}
          onChange={(e) => setCorporationName(e.target.value)}
          fullWidth
        />
        <Input
          type="email"
          label="מייל"
          placeholder="contact@corporation.co.il"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="cta" fullWidth disabled={!email || !corporationName || status === 'loading'}>
          המשך
        </Button>
        <Button type="button" variant="ghost" size="sm" fullWidth onClick={onBack} className={styles.back}>
          חזרה
        </Button>
        {typeof status === 'string' && status !== 'idle' && status !== 'loading' && status !== 'sent' ? (
          <p className={styles.error}>{status}</p>
        ) : null}
      </form>
    </Card>
  );
}
