'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { SignUpCompany } from './SignUpCompany';
import { SignUpCorporation } from './SignUpCorporation';
import { SignUpIndividualSoon } from './SignUpIndividualSoon';
import styles from './page.module.scss';

type Step =
  | { kind: 'persona-picker' }
  | { kind: 'owner-type-picker' }
  | { kind: 'company-form' }
  | { kind: 'corporation-form' }
  | { kind: 'individual-soon' };

export default function SignUpPage() {
  const [step, setStep] = useState<Step>({ kind: 'persona-picker' });

  if (step.kind === 'company-form') {
    return <SignUpCompany onBack={() => setStep({ kind: 'owner-type-picker' })} />;
  }
  if (step.kind === 'corporation-form') {
    return <SignUpCorporation onBack={() => setStep({ kind: 'persona-picker' })} />;
  }
  if (step.kind === 'individual-soon') {
    return <SignUpIndividualSoon onBack={() => setStep({ kind: 'owner-type-picker' })} />;
  }

  if (step.kind === 'owner-type-picker') {
    return (
      <Card variant="default" padded={false} className={styles.card}>
        <header className={styles.header}>
          <span aria-hidden="true" className={styles.crane}>🏗</span>
          <h1>איזה סוג בעלים אתם?</h1>
        </header>

        <div className={styles.choices}>
          <Button variant="ghost" fullWidth onClick={() => setStep({ kind: 'company-form' })}>
            חברה לניהול נכסים
          </Button>
          <Button variant="ghost" fullWidth onClick={() => setStep({ kind: 'individual-soon' })}>
            בעל נכס פרטי
          </Button>
        </div>

        <button
          type="button"
          className={styles.backLink}
          onClick={() => setStep({ kind: 'persona-picker' })}
        >
          חזרה
        </button>
      </Card>
    );
  }

  return (
    <Card variant="default" padded={false} className={styles.card}>
      <header className={styles.header}>
        <span aria-hidden="true" className={styles.crane}>🏗</span>
        <h1>הצטרפו לעוז</h1>
        <p>איזה סוג חשבון תרצו לפתוח?</p>
      </header>

      <div className={styles.choices}>
        <Button variant="ghost" fullWidth onClick={() => setStep({ kind: 'owner-type-picker' })}>
          אני משכיר נכסים
        </Button>
        <Button variant="ghost" fullWidth onClick={() => setStep({ kind: 'corporation-form' })}>
          אני מחפש דיור לעובדים
        </Button>
      </div>

      <footer className={styles.footer}>
        <span>כבר יש לכם חשבון? </span>
        <a href="/sign-in">התחברו</a>
      </footer>
    </Card>
  );
}
