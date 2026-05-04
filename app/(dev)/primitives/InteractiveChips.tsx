'use client';

import { Chip } from '@/components/primitives/Chip/Chip';

export function RemovableChipDemo() {
  return <Chip onRemove={() => undefined}>עם הסרה</Chip>;
}
