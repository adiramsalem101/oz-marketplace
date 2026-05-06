'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { SignUpCompany } from './SignUpCompany';
import { SignUpCorporation } from './SignUpCorporation';
import { SignUpIndividualSoon } from './SignUpIndividualSoon';
import styles from './page.module.scss';

type Persona = null | 'company' | 'corporation' | 'individual';

export default function SignUpPage() {
  const [persona, setPersona] = useState<Persona>(null);

  if (persona === 'company') return <SignUpCompany onBack={() => setPersona(null)} />;
  if (persona === 'corporation') return <SignUpCorporation onBack={() => setPersona(null)} />;
  if (persona === 'individual') return <SignUpIndividualSoon onBack={() => setPersona(null)} />;

  return (
    <Card variant="default" padded={false} className={styles.card}>
      <header className={styles.header}>
        <span aria-hidden="true" className={styles.crane}>🏗</span>
        <h1>הצטרפו לעוז</h1>
        <p>איזה סוג חשבון תרצו לפתוח?</p>
      </header>

      <div className={styles.choices}>
        <Button variant="cta" fullWidth onClick={() => setPersona('company')}>
          אני משכיר נכסים
        </Button>
        <Button variant="cta" fullWidth onClick={() => setPersona('corporation')}>
          אני מחפש דיור לעובדים
        </Button>
      </div>

      <p className={styles.individualLink}>
        בעלי נכס פרטיים?{' '}
        <button type="button" className={styles.linkBtn} onClick={() => setPersona('individual')}>
          בקרוב
        </button>
      </p>

      <footer className={styles.footer}>
        <span>כבר יש לכם חשבון? </span>
        <a href="/sign-in">התחברו</a>
      </footer>
    </Card>
  );
}
