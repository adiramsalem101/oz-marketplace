'use client';

import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import styles from './SignUpIndividualSoon.module.scss';

export function SignUpIndividualSoon({ onBack }: { onBack: () => void }) {
  return (
    <Card variant="default" padded={false} className={styles.card}>
      <header className={styles.header}>
        <span aria-hidden="true" className={styles.crane}>🏗</span>
        <h1>בקרוב</h1>
        <p>
          עוז עדיין לא פתוחה לבעלי נכסים פרטיים. אנחנו מתחילים עם חברות לניהול
          נכסים, ובקרוב נפתח גם לפרטיים.
        </p>
        <p>חזרו לבקר אותנו בקרוב.</p>
      </header>
      <Button variant="ghost" size="sm" fullWidth onClick={onBack} className={styles.back}>
        חזרה
      </Button>
    </Card>
  );
}
