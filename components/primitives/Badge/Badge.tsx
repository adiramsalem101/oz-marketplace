import styles from './Badge.module.scss';
import type { BadgeProps } from './Badge.types';

export function Badge({ tone = 'gray', count, max = 99, className, ...rest }: BadgeProps) {
  if (count <= 0) return null;
  const display = count > max ? `${max}+` : String(count);

  const classes = [styles.badge, styles[`tone-${tone}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {display}
    </span>
  );
}
