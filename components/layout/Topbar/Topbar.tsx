import styles from './Topbar.module.scss';
import type { TopbarProps } from './Topbar.types';

export function Topbar({ title, subtitle, actions, menuTrigger, className }: TopbarProps) {
  const classes = [styles.topbar, className].filter(Boolean).join(' ');
  return (
    <header className={classes}>
      <div className={styles.left}>
        {menuTrigger}
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
