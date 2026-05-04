import type { HTMLAttributes } from 'react';

export type BadgeTone = 'gray' | 'blue-soft' | 'alert';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  count: number;
  max?: number;        // e.g. 99 → renders "99+" past that
}
