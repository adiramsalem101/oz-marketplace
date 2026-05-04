import Image from 'next/image';
import styles from './Avatar.module.scss';
import type { AvatarProps, AvatarSize } from './Avatar.types';

const PIXELS_BY_SIZE: Record<AvatarSize, number> = {
  sm: 26,
  base: 32,
  lg: 44,
};

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

export function Avatar({
  name,
  src,
  size = 'base',
  tone = 'green',
  className,
  ...rest
}: AvatarProps) {
  const classes = [styles.avatar, styles[`size-${size}`], styles[`tone-${tone}`], className]
    .filter(Boolean)
    .join(' ');

  const px = PIXELS_BY_SIZE[size];

  return (
    <span className={classes} role="img" aria-label={name} {...rest}>
      {src ? (
        <Image src={src} alt="" width={px} height={px} className={styles.img} />
      ) : (
        <span aria-hidden>{initialsOf(name)}</span>
      )}
    </span>
  );
}
