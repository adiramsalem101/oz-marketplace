import styles from './Pill.module.scss';
import type { PillProps } from './Pill.types';

export function Pill({
  tone = 'gray',
  size = 'base',
  live = false,
  iconStart,
  className,
  children,
  ...rest
}: PillProps) {
  const classes = [
    styles.pill,
    styles[`tone-${tone}`],
    styles[`size-${size}`],
    live && styles.live,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {live ? <span className={styles.dot} aria-hidden /> : null}
      {iconStart ? <span className={styles.iconStart}>{iconStart}</span> : null}
      <span>{children}</span>
    </span>
  );
}
