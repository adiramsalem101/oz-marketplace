import type { ButtonHTMLAttributes } from 'react';

export interface TenantSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tenantName: string;
  tenantLabel?: string;
  logoUrl?: string;
}
