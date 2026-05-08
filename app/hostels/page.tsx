import { HOSTELS } from '@/lib/hostels';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import styles from './page.module.scss';

export const metadata = { title: 'אכסניות עוז · ירושלים, תל אביב, חיפה, טבריה' };

export default function HostelsPage() {
  return (
    <main className={styles.main}>
      <PublicNav />
      <header className={styles.header}>
        <h1>אכסניות עוז</h1>
        <p>ארבע אכסניות בארבע ערים. לינה יומית, חודשית או לטווח ארוך.</p>
      </header>

      <div className={styles.grid}>
        {HOSTELS.map(h => (
          <a
            key={h.slug}
            href={h.fdmUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.card}
          >
            <span className={styles.emoji}>{h.emoji}</span>
            <h2>{h.name}</h2>
            <p className={styles.city}>{h.city}</p>
            <span className={styles.cta}>🛏️ הזמן עכשיו</span>
          </a>
        ))}
      </div>
    </main>
  );
}
