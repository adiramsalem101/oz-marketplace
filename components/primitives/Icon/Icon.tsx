import styles from './Icon.module.scss';

type IconSize = 'sm' | 'base' | 'md' | 'lg';

export interface IconProps {
  name: string;        // e.g. "grid", "building" — without the "i-" prefix
  size?: IconSize;
  className?: string;
  'aria-label'?: string;
}

export function Icon({
  name,
  size = 'base',
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  const isDecorative = !ariaLabel;
  return (
    <svg
      className={`${styles.icon} ${styles[size]} ${className ?? ''}`}
      aria-hidden={isDecorative}
      aria-label={ariaLabel}
      role={isDecorative ? undefined : 'img'}
    >
      <use href={`/icons.svg#i-${name}`} />
    </svg>
  );
}
