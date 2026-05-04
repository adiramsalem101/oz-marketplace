import type { HTMLAttributes } from 'react';

export type ProgressTone = 'blue' | 'green' | 'orange' | 'red';

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: number;       // 0–100
  tone?: ProgressTone;
  showLabel?: boolean;
  label?: string;      // optional override; defaults to "<value>%"
}
