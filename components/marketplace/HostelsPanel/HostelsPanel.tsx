import { HOSTELS } from '@/lib/hostels';
import { HostelCard } from '@/components/marketplace/HostelCard/HostelCard';
import styles from './HostelsPanel.module.scss';

/**
 * Compact hostels block for the homepage hero's left column.
 * Renders inner content only (eyebrow + subtitle + 2×2 colored cards) —
 * the hero section provides the full-width section chrome.
 */
export function HostelsPanel() {
  return (
    <aside className={styles.panel} aria-labelledby="hostels-panel-title">
      <header className={styles.head}>
        <p className={styles.eyebrow}>אכסניות עוז</p>
        <h2 id="hostels-panel-title" className={styles.heading}>
          לינה יומית גמישה · ₪120/לילה
        </h2>
      </header>
      <div className={styles.grid}>
        {HOSTELS.map(h => (
          <HostelCard key={h.slug} hostel={h} size="panel" />
        ))}
      </div>
    </aside>
  );
}
