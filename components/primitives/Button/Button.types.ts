import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'cta' | 'ghost' | 'blue';
export type ButtonSize    = 'sm' | 'base';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  fullWidth?: boolean;
}
