import styles from './ProgressBar.module.scss';
import type { ProgressBarProps } from './ProgressBar.types';

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return n;
}

export function ProgressBar({
  value,
  tone = 'blue',
  showLabel = false,
  label,
  className,
  ...rest
}: ProgressBarProps) {
  const pct = clamp(value);
  const display = label ?? `${Math.round(pct)}%`;

  const classes = [styles.row, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className={`${styles.fill} ${styles[`tone-${tone}`]}`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel ? <span className={styles.label}>{display}</span> : null}
    </div>
  );
}
