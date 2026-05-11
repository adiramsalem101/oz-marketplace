import { createServerClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { PilotBanner } from '@/components/layout/PilotBanner/PilotBanner';
import { Footer } from '@/components/layout/Footer/Footer';
import { ListingCard, type ListingCardData } from '@/components/marketplace/ListingCard/ListingCard';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

const ACTIVE_BOOKING_STATUSES = ['accepted', 'paid', 'confirmed'] as const;

export default async function ListingsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const supabase = await createServerClient();

  let q = supabase
    .from('listings')
    .select('id, title, city, street, bed_count, monthly_rent_per_bed, verification_level, area_sqm')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (params.city) q = q.eq('city', params.city);
  if (params.minBeds) q = q.gte('bed_count', parseInt(params.minBeds));
  if (params.maxRent) q = q.lte('monthly_rent_per_bed', parseInt(params.maxRent));

  const { data: listings } = await q;
  const listingIds = (listings ?? []).map(l => l.id);

  const cards = await enrichListings(listingIds, listings ?? []);

  return (
    <>
      <PublicNav />
      <PilotBanner />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>נכסים זמינים</h1>
          <p>{listings?.length ?? 0} נכסים בגוש דן</p>
        </header>

        <ListingFilters initial={params} />

        <div className={styles.grid}>
          {cards.map(card => (
            <ListingCard key={card.id} listing={card} />
          ))}
        </div>

        {!cards.length ? <p className={styles.empty}>לא נמצאו נכסים העונים על הקריטריונים</p> : null}
      </main>
      <Footer />
    </>
  );
}

type RawListing = {
  id: string;
  title: string;
  city: string;
  street: string | null;
  bed_count: number;
  monthly_rent_per_bed: number;
  verification_level: number;
};

async function enrichListings(ids: string[], listings: RawListing[]): Promise<ListingCardData[]> {
  if (!ids.length) return [];

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

function ListingFilters({ initial }: { initial: Record<string, string> }) {
  return (
    <form className={styles.filters} method="get">
      <input name="city" placeholder="עיר" defaultValue={initial.city} />
      <input name="minBeds" type="number" placeholder="מינ׳ מיטות" defaultValue={initial.minBeds} />
      <input name="maxRent" type="number" placeholder="מחיר מקסימלי למיטה" defaultValue={initial.maxRent} />
      <button type="submit">חפש</button>
    </form>
  );
}
