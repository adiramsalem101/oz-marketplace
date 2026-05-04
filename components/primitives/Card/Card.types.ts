import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'outline' | 'elevated';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  as?: 'div' | 'article' | 'section';
  padded?: boolean;
  children?: ReactNode;
}
