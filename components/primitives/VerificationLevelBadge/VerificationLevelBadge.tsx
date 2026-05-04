import { Pill } from '../Pill/Pill';
import { Icon } from '../Icon/Icon';
import styles from './VerificationLevelBadge.module.scss';
import type { VerificationLevelBadgeProps } from './VerificationLevelBadge.types';

const TONE_BY_LEVEL = {
  1: 'gray',
  2: 'blue-soft',
  3: 'green-deep',
} as const;

const LABEL_BY_LEVEL = {
  1: 'רמת אימות 1',
  2: 'רמת אימות 2',
  3: 'רמת אימות 3',
} as const;

export function VerificationLevelBadge({ level, className }: VerificationLevelBadgeProps) {
  return (
    <Pill
      tone={TONE_BY_LEVEL[level]}
      size="base"
      iconStart={<Icon name="shield-check" size="sm" />}
      className={[styles.badge, className].filter(Boolean).join(' ')}
    >
      {LABEL_BY_LEVEL[level]}
    </Pill>
  );
}
