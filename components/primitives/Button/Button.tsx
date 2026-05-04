import { forwardRef } from 'react';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'ghost',
    size = 'base',
    iconStart,
    iconEnd,
    fullWidth = false,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {iconStart ? <span className={styles.iconStart}>{iconStart}</span> : null}
      <span className={styles.label}>{children}</span>
      {iconEnd ? <span className={styles.iconEnd}>{iconEnd}</span> : null}
    </button>
  );
});
