import styles from './Card.module.scss';
import type { CardProps } from './Card.types';

export function Card({
  variant = 'default',
  as: Tag = 'div',
  padded = true,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [
    styles.card,
    styles[`variant-${variant}`],
    padded && styles.padded,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
