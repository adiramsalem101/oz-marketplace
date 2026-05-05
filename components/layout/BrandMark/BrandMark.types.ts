import type { HTMLAttributes } from 'react';

export interface BrandMarkProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'base' | 'lg';
}
