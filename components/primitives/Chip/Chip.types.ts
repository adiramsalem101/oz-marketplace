import type { HTMLAttributes, ReactNode, MouseEventHandler } from 'react';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  verified?: boolean;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}
