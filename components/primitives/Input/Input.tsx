import { forwardRef, useId } from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, invalid, fullWidth, className, id, ...rest },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const hasError = invalid || Boolean(error);

  const wrapperClasses = [
    styles.field,
    fullWidth && styles.fullWidth,
    hasError && styles.invalid,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label ? <label htmlFor={inputId} className={styles.label}>{label}</label> : null}
      <input
        ref={ref}
        id={inputId}
        className={styles.input}
        aria-invalid={hasError || undefined}
        aria-describedby={error || hint ? `${inputId}-help` : undefined}
        {...rest}
      />
      {(error || hint) && (
        <span id={`${inputId}-help`} className={error ? styles.error : styles.hint}>
          {error ?? hint}
        </span>
      )}
    </div>
  );
});
