'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button/Button';
import { Input } from '@/components/primitives/Input/Input';
import { createBrowserClient } from '@/lib/supabase/browser';
import { GoogleGLogo } from './GoogleGLogo';
import styles from './SignInMethods.module.scss';

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'sent'; method: 'email' | 'sms' }
  | { kind: 'error'; message: string };

export function SignInMethods() {
  const supabase = createBrowserClient();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleGoogle() {
    setStatus({ kind: 'loading' });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/callback` },
    });
    if (error) setStatus({ kind: 'error', message: error.message });
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus({ kind: 'loading' });
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/callback` },
    });
    if (error) {
      setStatus({ kind: 'error', message: error.message });
    } else {
      setStatus({ kind: 'sent', method: 'email' });
    }
  }

  async function handlePhone(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) return;
    setStatus({ kind: 'loading' });
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) {
      setStatus({ kind: 'error', message: error.message });
    } else {
      setStatus({ kind: 'sent', method: 'sms' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className={styles.sent}>
        <h2>בדקו את {status.method === 'email' ? 'המייל' : 'הטלפון'}</h2>
        <p>שלחנו לכם קישור / קוד התחברות.</p>
      </div>
    );
  }

  return (
    <div className={styles.methods}>
      <Button
        variant="ghost"
        fullWidth
        onClick={handleGoogle}
        disabled={status.kind === 'loading'}
        iconStart={<GoogleGLogo />}
      >
        המשך עם Google
      </Button>

      <div className={styles.divider}><span>או</span></div>

      <form onSubmit={handleEmail} className={styles.form}>
        <Input
          type="email"
          label="מייל"
          placeholder="you@company.co.il"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="blue" fullWidth disabled={!email || status.kind === 'loading'}>
          שלחו לי קישור התחברות
        </Button>
      </form>

      <div className={styles.divider}><span>או</span></div>

      <form onSubmit={handlePhone} className={styles.form}>
        <Input
          type="tel"
          label="טלפון"
          placeholder="050-1234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="blue" fullWidth disabled={!phone || status.kind === 'loading'}>
          שלחו לי קוד SMS
        </Button>
      </form>

      {status.kind === 'error' ? (
        <p className={styles.error}>{status.message}</p>
      ) : null}

      <footer className={styles.footer}>
        <span>חדשים כאן? </span>
        <a href="/sign-up">צרו חשבון</a>
      </footer>
    </div>
  );
}
