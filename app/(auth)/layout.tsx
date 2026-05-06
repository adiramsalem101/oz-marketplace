import type { Metadata } from 'next';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'עוז · התחברות',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.frame}>{children}</div>;
}
