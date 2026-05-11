import type { Hostel } from '@/lib/hostels';
import styles from './HostelCard.module.scss';

type HostelTone = 'blue-light' | 'orange' | 'green-deep' | 'green-light';

const TONE_BY_SLUG: Record<Hostel['slug'], HostelTone> = {
  'tel-aviv':  'blue-light',
  'jerusalem': 'orange',
  'tiberias':  'green-deep',
  'haifa':     'green-light',
};

export type HostelCardSize = 'compact' | 'spacious' | 'panel';

export function HostelCard({
  hostel,
  size = 'compact',
}: {
  hostel: Hostel;
  size?: HostelCardSize;
}) {
  const tone = TONE_BY_SLUG[hostel.slug];

  return (
    <a
      href={hostel.fdmUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.card, styles[`tone-${tone}`], styles[`size-${size}`]]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.emoji} aria-hidden>{hostel.emoji}</span>
      <span className={styles.city}>{hostel.city}</span>
      <span className={styles.name}>{hostel.name}</span>
      <span className={styles.cta}>הזמינו מקום ←</span>
    </a>
  );
}
