import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Card } from '@/components/primitives/Card/Card';
import { Pill } from '@/components/primitives/Pill/Pill';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { BookingRequestForm } from './BookingRequestForm';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (!listing) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  let role: string | null = null;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    role = profile?.role ?? null;
  }

  const { data: images } = await supabase
    .from('listing_images')
    .select('storage_path')
    .eq('listing_id', listing.id)
    .order('display_order', { ascending: true });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const imageUrls = (images ?? []).map(
    img => `${supabaseUrl}/storage/v1/object/public/listing-images/${img.storage_path}`,
  );

  return (
    <main className={styles.main}>
      <PublicNav />
      <header className={styles.header}>
        <h1>{listing.title}</h1>
        <p>📍 {listing.city}{listing.street ? `, ${listing.street} ${listing.street_number ?? ''}` : ''}</p>
        <VerificationPill level={listing.verification_level} />
      </header>

      {imageUrls.length ? (
        <div className={styles.gallery}>
          {imageUrls.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} alt={`${listing.title} ${i + 1}`} className={styles.image} />
          ))}
        </div>
      ) : null}

      <div className={styles.layout}>
        <Card className={styles.detail}>
          <h2>פרטי הנכס</h2>
          <ul className={styles.facts}>
            <li>{listing.bed_count} מיטות</li>
            {listing.area_sqm ? <li>{listing.area_sqm} מ״ר</li> : null}
            {listing.bathroom_count ? <li>{listing.bathroom_count} חדרי שירותים</li> : null}
            {listing.has_kitchen ? <li>מטבח</li> : null}
            {listing.has_wifi ? <li>אינטרנט</li> : null}
            {listing.has_parking ? <li>חניה</li> : null}
          </ul>
          <p className={styles.price}>₪{listing.monthly_rent_per_bed.toLocaleString('he-IL')}<span>/מיטה/חודש</span></p>
          {listing.description ? <p className={styles.description}>{listing.description}</p> : null}
        </Card>

        <Card className={styles.bookingPanel}>
          {!user ? (
            <div className={styles.bookingPrompt}>
              <h3>רוצים לשריין?</h3>
              <p>התחברו כתאגיד בנייה כדי לשלוח בקשת שריון.</p>
              <Link href={`/sign-in?next=/listings/${listing.id}`} className={styles.signInLink}>
                התחברות
              </Link>
            </div>
          ) : role === 'construction_corporation' ? (
            <BookingRequestForm listing={listing} />
          ) : (
            <div className={styles.bookingPrompt}>
              <h3>בקשת שריון</h3>
              <p>רק תאגידי בנייה רשאים לשלוח בקשות שריון.</p>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}

function VerificationPill({ level }: { level: number }) {
  if (level === 1) return <Pill tone="gray">פרטים מהבעלים</Pill>;
  if (level === 2) return <Pill tone="blue-deep">מאומת מרחוק</Pill>;
  if (level === 3) return <Pill tone="green-deep">מאומת בשטח</Pill>;
  return null;
}
