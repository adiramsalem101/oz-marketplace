'use client';

import { useEffect } from 'react';
import styles from './MobileDrawer.module.scss';
import type { MobileDrawerProps } from './MobileDrawer.types';

export function MobileDrawer({ open, onClose, ariaLabel = 'תפריט', children }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.root} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="סגור תפריט"
        onClick={onClose}
      />
      <div className={styles.panel}>
        {children}
      </div>
    </div>
  );
}
