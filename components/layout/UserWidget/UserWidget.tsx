import { Avatar } from '@/components/primitives/Avatar/Avatar';
import styles from './UserWidget.module.scss';
import type { UserWidgetProps } from './UserWidget.types';

export function UserWidget({ name, role, avatarUrl, className }: UserWidgetProps) {
  const classes = [styles.me, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <Avatar name={name} src={avatarUrl} size="base" tone="green" />
      <div className={styles.body}>
        <span className={styles.who}>{name}</span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
}
