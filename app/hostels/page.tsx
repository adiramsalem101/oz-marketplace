import { HOSTELS } from '@/lib/hostels';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { PilotBanner } from '@/components/layout/PilotBanner/PilotBanner';
import { Footer } from '@/components/layout/Footer/Footer';
import { HostelCard } from '@/components/marketplace/HostelCard/HostelCard';
import styles from './page.module.scss';

export const metadata = { title: 'אכסניות עוז · ירושלים, תל אביב, חיפה, טבריה' };

export default function HostelsPage() {
  return (
    <>
      <PublicNav />
      <PilotBanner />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>אכסניות עוז</h1>
          <p>
            ארבע אכסניות בארבע ערים. לינה יומית, חודשית או לטווח ארוך — הזמנה ישירה דרך AM HOSTELS.
          </p>
        </header>

        <div className={styles.grid}>
          {HOSTELS.map(h => (
            <HostelCard key={h.slug} hostel={h} size="spacious" />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
