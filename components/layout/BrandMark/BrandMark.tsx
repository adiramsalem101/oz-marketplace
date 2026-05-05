import styles from './BrandMark.module.scss';
import type { BrandMarkProps } from './BrandMark.types';

export function BrandMark({ size = 'base', className, ...rest }: BrandMarkProps) {
  const classes = [styles.brand, styles[`size-${size}`], className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      <span className={styles.name}>עוז</span>
    </span>
  );
}
