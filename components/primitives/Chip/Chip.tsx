'use client';

import styles from './Chip.module.scss';
import type { ChipProps } from './Chip.types';

export function Chip({
  active = false,
  verified = false,
  onRemove,
  className,
  children,
  ...rest
}: ChipProps) {
  const classes = [
    styles.chip,
    active && styles.active,
    verified && styles.verified,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      <span>{children}</span>
      {onRemove ? (
        <button
          type="button"
          className={styles.remove}
          aria-label="הסרה"
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
