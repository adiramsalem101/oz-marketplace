import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { Button } from '@/components/primitives/Button/Button';
import { Icon } from '@/components/primitives/Icon/Icon';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { PilotBanner } from '@/components/layout/PilotBanner/PilotBanner';
import { Footer } from '@/components/layout/Footer/Footer';
import { HostelsPanel } from '@/components/marketplace/HostelsPanel/HostelsPanel';
import { ListingCard, type ListingCardData } from '@/components/marketplace/ListingCard/ListingCard';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

const ACTIVE_BOOKING_STATUSES = ['accepted', 'paid', 'confirmed'] as const;

export default async function HomePage() {
  const supabase = await createServerClient();
  const { data: previewListings } = await supabase
    .from('listings')
    .select('id, title, city, street, bed_count, monthly_rent_per_bed, verification_level')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(6);

  const previewCards = await enrichPreview(previewListings ?? []);

  return (
    <>
      <PublicNav />
      <PilotBanner />
      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroLayout}>
              <div className={styles.heroText}>
                <p className={styles.kicker}>פיילוט גוש דן פעיל</p>
                <h1 className={styles.heroTitle}>
                  דיור לעובדים זרים
                  <br />
                  <span className={styles.heroAccent}>עומד בחוק, מנוהל בשטח</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  קבלני בנייה: מצאו דיור מאומת תוך 48 שעות.<br />
                  בעלי נכסים: הגדילו הכנסה ב-80%+ ממחיר שוק.
                </p>
                <p className={styles.terms}>
                  ללא עלות לקבלן · 5% עמלה מבעל הנכס · חשבונית מס
                </p>
                <div className={styles.heroActions}>
                  <Link href="/sign-up"><Button variant="cta" size="base">התחילו עכשיו</Button></Link>
                  <Link href="/listings" className={styles.ghostOnDark}>
                    <Button variant="ghost" size="base">ראו נכסים</Button>
                  </Link>
                </div>
              </div>
              <HostelsPanel />
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className={styles.trustStrip}>
          <div className={styles.trustStripInner}>
            <div className={styles.trustItem}><Icon name="check" /> חוזה דיגיטלי</div>
            <div className={styles.trustItem}><Icon name="check" /> חשבונית מס</div>
            <div className={styles.trustItem}><Icon name="check" /> ביקורת מסמכים</div>
            <div className={styles.trustItem}><Icon name="check" /> תמיכה בעברית</div>
          </div>
        </section>

        {/* LISTINGS PREVIEW */}
        {previewCards.length ? (
          <section className={styles.listingsSection}>
            <div className={styles.sectionInner}>
              <header className={styles.sectionHead}>
                <h2>נכסים זמינים — גוש דן</h2>
                <p className={styles.sectionLead}>{previewCards.length} מתוך הנכסים הפתוחים לשריון</p>
              </header>
              <div className={styles.listingsPreview}>
                {previewCards.map(card => (
                  <ListingCard key={card.id} listing={card} />
                ))}
              </div>
              <div className={styles.allLink}>
                <Link href="/listings" className={styles.ghostOnDark}>
                  <Button variant="ghost">כל הנכסים ←</Button>
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        {/* HOW IT WORKS */}
        <section className={styles.howSection} id="how">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHead}>
              <h2>איך זה עובד?</h2>
              <p className={styles.sectionLead}>מהחיפוש עד לחתימה — תהליך מסודר</p>
            </header>
            <div className={styles.steps}>
              <Step n={1} title="חפש לפי צורך" t="5 דקות"
                body="סנן לפי עיר, מספר מיטות וגודל נכס. כל נכס כולל פירוט מלא." />
              <Step n={2} title="בקש לשריין" t="עד 48 שעות"
                body="שלח בקשת שריון לבעל הנכס. הבעלים מאשר תוך 48 שעות." />
              <Step n={3} title="שלם וחתום" t="3-5 ימי עסקים"
                body="תשלום מאובטח דרך פלאקארד וחתימה דיגיטלית על חוזה השכירות." />
            </div>
          </div>
        </section>

        {/* LEGAL CALLOUT */}
        <section className={styles.legalSection}>
          <div className={styles.legalInner}>
            <h3>⚖️ חוק עובדים זרים מחייב דיור הולם</h3>
            <p>
              כל מעסיק חייב לספק דיור העומד בתקנות: מינימום 4 מ״ר לעובד, שירותים ומקלחות לפי יחס קבוע.
              אי עמידה בתקנות — עבירה פלילית.
            </p>
            <Link href="/listings"><Button variant="ghost">לנכסים מאומתים ←</Button></Link>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.sectionInner}>
            <header className={styles.sectionHead}>
              <h2>שאלות נפוצות</h2>
            </header>
            <div className={styles.faqList}>
              <Faq q="האם הנכסים מאושרים על ידי הרשויות?" a="כל הנכסים מתפרסמים תחת הצהרת הבעלים. נכסים שעברו ביקורת מסמכים נושאים תג אימות." />
              <Faq q="כמה זמן לוקח למצוא נכס מתאים?" a="הזמן הממוצע משריון לחתימה הוא 3-5 ימי עסקים." />
              <Faq q="האם יש חוזה שכירות מסודר?" a="כן. אנחנו מספקים חוזה שכירות תקני שעובר חתימה דיגיטלית של שני הצדדים." />
              <Faq q="מה עלות השירות?" a="לקבלן: ללא עלות. לבעל הנכס: 5% עמלה מסכום השכירות החודשית." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

type RawPreviewListing = {
  id: string;
  title: string;
  city: string;
  street: string | null;
  bed_count: number;
  monthly_rent_per_bed: number;
  verification_level: number;
};

async function enrichPreview(listings: RawPreviewListing[]): Promise<ListingCardData[]> {
  if (!listings.length) return [];

  const ids = listings.map(l => l.id);
  const service = createServiceClient();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const [imagesRes, bookingsRes] = await Promise.all([
    service
      .from('listing_images')
      .select('listing_id, storage_path, display_order')
      .in('listing_id', ids)
      .order('display_order', { ascending: true }),
    service
      .from('bookings')
      .select('listing_id, worker_count, status')
      .in('listing_id', ids)
      .in('status', ACTIVE_BOOKING_STATUSES),
  ]);

  const coverByListing = new Map<string, string>();
  for (const row of imagesRes.data ?? []) {
    if (!coverByListing.has(row.listing_id)) {
      coverByListing.set(
        row.listing_id,
        `${supabaseUrl}/storage/v1/object/public/listing-images/${row.storage_path}`,
      );
    }
  }

  const occupiedByListing = new Map<string, number>();
  for (const row of bookingsRes.data ?? []) {
    occupiedByListing.set(
      row.listing_id,
      (occupiedByListing.get(row.listing_id) ?? 0) + (row.worker_count ?? 0),
    );
  }

  return listings.map(l => ({
    id: l.id,
    title: l.title,
    city: l.city,
    street: l.street,
    bed_count: l.bed_count,
    monthly_rent_per_bed: l.monthly_rent_per_bed,
    verification_level: l.verification_level,
    cover_url: coverByListing.get(l.id) ?? null,
    available_beds: l.bed_count - (occupiedByListing.get(l.id) ?? 0),
  }));
}

function Step({ n, title, t, body }: { n: number; title: string; t: string; body: string }) {
  return (
    <article className={styles.step}>
      <span className={styles.stepNum}>{n}</span>
      <h3>{title}</h3>
      <span className={styles.stepTime}>⏱ {t}</span>
      <p>{body}</p>
    </article>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className={styles.faqItem}>
      <summary>{q}</summary>
      <p>{a}</p>
    </details>
  );
}
