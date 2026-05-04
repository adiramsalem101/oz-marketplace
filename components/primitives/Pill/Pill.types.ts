import type { HTMLAttributes, ReactNode } from 'react';

export type PillTone =
  | 'gray'
  | 'green-deep'
  | 'green-soft'
  | 'blue-deep'
  | 'blue-soft'
  | 'orange-deep'
  | 'orange-soft'
  | 'red-soft'
  | 'amber-soft';

export type PillSize = 'sm' | 'base';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  size?: PillSize;
  live?: boolean;
  iconStart?: ReactNode;
  children: ReactNode;
}
