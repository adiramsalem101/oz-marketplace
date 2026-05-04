import type { HTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'base' | 'lg';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  name: string;            // used for initials and aria-label
  src?: string;
  size?: AvatarSize;
  tone?: 'green' | 'blue' | 'orange' | 'gray';
}
