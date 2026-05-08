import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Card } from '@/components/primitives/Card/Card';
import { Pill } from '@/components/primitives/Pill/Pill';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function ListingsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const supabase = await createServerClient();

  let q = supabase
    .from('listings')
    .select('id, title, city, bed_count, monthly_rent_per_bed, verification_level, area_sqm')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (params.city) q = q.eq('city', params.city);
  if (params.minBeds) q = q.gte('bed_count', parseInt(params.minBeds));
  if (params.maxRent) q = q.lte('monthly_rent_per_bed', parseInt(params.maxRent));

  const { data: listings } = await q;

  return (
    <main className={styles.main}>
      <PublicNav />
      <header className={styles.header}>
        <h1>נכסים זמינים</h1>
        <p>{listings?.length ?? 0} נכסים בגוש דן</p>
      </header>

      <ListingFilters initial={params} />

      <div className={styles.grid}>
        {listings?.map(l => (
          <Link key={l.id} href={`/listings/${l.id}`} className={styles.cardLink}>
            <Card>
              <div className={styles.cardBody}>
                <h3>{l.title}</h3>
                <p>📍 {l.city}</p>
                <div className={styles.cardMeta}>
                  <span>{l.bed_count} מיטות</span>
                  {l.area_sqm ? <span>{l.area_sqm} מ״ר</span> : null}
                </div>
                <p className={styles.price}>₪{l.monthly_rent_per_bed.toLocaleString('he-IL')}<span>/מיטה</span></p>
                <VerificationPill level={l.verification_level} />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {!listings?.length ? <p className={styles.empty}>לא נמצאו נכסים העונים על הקריטריונים</p> : null}
    </main>
  );
}

function VerificationPill({ level }: { level: number }) {
  if (level === 1) return <Pill tone="gray">פרטים מהבעלים</Pill>;
  if (level === 2) return <Pill tone="blue-deep">מאומת מרחוק</Pill>;
  return null;
}

function ListingFilters({ initial }: { initial: Record<string, string> }) {
  // GET form. Server re-renders on submit.
  return (
    <form className={styles.filters} method="get">
      <input name="city" placeholder="עיר" defaultValue={initial.city} />
      <input name="minBeds" type="number" placeholder="מינ׳ מיטות" defaultValue={initial.minBeds} />
      <input name="maxRent" type="number" placeholder="מחיר מקסימלי למיטה" defaultValue={initial.maxRent} />
      <button type="submit">חפש</button>
    </form>
  );
}
