import { Card } from '@/components/primitives/Card/Card';
import { SignInMethods } from './SignInMethods';
import styles from './page.module.scss';

export default function SignInPage() {
  return (
    <Card variant="default" padded={false} className={styles.card}>
      <header className={styles.header}>
        <span aria-hidden="true" className={styles.crane}>🏗</span>
        <h1>ברוכים הבאים לעוז</h1>
        <p>בחרו אופן התחברות</p>
      </header>
      <SignInMethods />
    </Card>
  );
}
