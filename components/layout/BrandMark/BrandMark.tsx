import styles from './BrandMark.module.scss';
import type { BrandMarkProps } from './BrandMark.types';

export function BrandMark({
  size = 'base',
  tone = 'light',
  showMark = false,
  className,
  ...rest
}: BrandMarkProps) {
  const classes = [
    styles.brand,
    styles[`size-${size}`],
    styles[`tone-${tone}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {showMark ? <span className={styles.mark} aria-hidden>🏗</span> : null}
      <span className={styles.name}>עוז</span>
    </span>
  );
}
