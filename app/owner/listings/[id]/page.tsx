import { notFound } from 'next/navigation';
import { Topbar } from '@/components/layout/Topbar/Topbar';
import { createServerClient } from '@/lib/supabase/server';
import { ListingForm } from '../../_components/ListingForm';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data } = await supabase.from('listings').select('*').eq('id', id).single();
  if (!data) notFound();

  const { data: images } = await supabase
    .from('listing_images')
    .select('id, storage_path, display_order')
    .eq('listing_id', id)
    .order('display_order', { ascending: true });

  return (
    <>
      <Topbar title="עריכת נכס" subtitle={data.title} />
      <div className={styles.content}>
        <ListingForm
          listingId={data.id}
          initial={{
            title: data.title,
            description: data.description,
            city: data.city,
            street: data.street,
            street_number: data.street_number,
            bed_count: data.bed_count,
            monthly_rent_per_bed: data.monthly_rent_per_bed,
            area_sqm: data.area_sqm ?? undefined,
            bathroom_count: data.bathroom_count ?? undefined,
            has_kitchen: data.has_kitchen,
            has_wifi: data.has_wifi,
            has_parking: data.has_parking,
          }}
          initialImages={images ?? []}
        />
      </div>
    </>
  );
}
