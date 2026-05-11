import Link from 'next/link';
import { BrandMark } from '@/components/layout/BrandMark/BrandMark';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" aria-label="עוז · דף הבית" className={styles.brandLink}>
              <BrandMark size="lg" tone="light" showMark />
            </Link>
            <p className={styles.tagline}>
              דיור לעובדים זרים — עומד בחוק, מנוהל בשטח.
            </p>
          </div>

          <nav className={styles.col} aria-labelledby="footer-platform">
            <h3 id="footer-platform" className={styles.colTitle}>פלטפורמה</h3>
            <ul className={styles.linkList}>
              <li><Link href="/listings" className={styles.link}>נכסים זמינים</Link></li>
              <li><Link href="/hostels" className={styles.link}>אכסניות</Link></li>
              <li><Link href="/#how" className={styles.link}>איך זה עובד</Link></li>
            </ul>
          </nav>

          <nav className={styles.col} aria-labelledby="footer-legal">
            <h3 id="footer-legal" className={styles.colTitle}>חוקי</h3>
            <ul className={styles.linkList}>
              <li><Link href="/legal/terms" className={styles.link}>תנאי שימוש</Link></li>
              <li><Link href="/legal/privacy" className={styles.link}>מדיניות פרטיות</Link></li>
              <li><Link href="/legal/code-of-ethics" className={styles.link}>קוד אתי</Link></li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>צרו קשר</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:hello@oz-platform.co.il" className={styles.link}>
                  hello@oz-platform.co.il
                </a>
              </li>
              <li className={styles.contactNote}>טלפון יפורסם בקרוב</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © 2026 בן צבי 47 בע&quot;מ — כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}
