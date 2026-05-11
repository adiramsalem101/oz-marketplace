import Link from 'next/link';
import { Pill } from '@/components/primitives/Pill/Pill';
import styles from './ListingCard.module.scss';

export interface ListingCardData {
  id: string;
  title: string;
  city: string;
  street?: string | null;
  bed_count: number;
  monthly_rent_per_bed: number;
  verification_level: number;
  cover_url?: string | null;
  available_beds?: number | null;
}

export function ListingCard({ listing }: { listing: ListingCardData }) {
  const available =
    typeof listing.available_beds === 'number'
      ? Math.max(0, listing.available_beds)
      : listing.bed_count;

  return (
    <Link href={`/listings/${listing.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {listing.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={listing.cover_url} alt="" className={styles.image} />
        ) : (
          <span className={styles.imageFallback} aria-hidden>🏘</span>
        )}
        <span className={styles.vacancyPill}>
          {available} מיטות פנויות
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{listing.title}</h3>
          <VerificationPill level={listing.verification_level} />
        </div>

        <p className={styles.location}>
          <span aria-hidden>📍</span>{' '}
          {listing.city}{listing.street ? `, ${listing.street}` : ''}
        </p>

        <div className={styles.footer}>
          <p className={styles.price}>
            ₪{listing.monthly_rent_per_bed.toLocaleString('he-IL')}
            <span className={styles.priceSuffix}>/מיטה לחודש</span>
          </p>
          <p className={styles.beds}>{listing.bed_count} מיטות בנכס</p>
        </div>
      </div>
    </Link>
  );
}

function VerificationPill({ level }: { level: number }) {
  if (level === 1) {
    return <Pill tone="green-soft" size="sm">מאומת בסיס</Pill>;
  }
  // Level 3 is deferred for MVP — render as level 2.
  if (level === 2 || level === 3) {
    return <Pill tone="green-deep" size="sm">מאומת</Pill>;
  }
  return null;
}
