import styles from './PilotBanner.module.scss';

export function PilotBanner() {
  return (
    <div className={styles.banner} role="status">
      <span aria-hidden>🚀</span>
      <span> פיילוט גוש דן בלבד — השקה ארצית מתוכננת לאפריל 2026</span>
    </div>
  );
}
