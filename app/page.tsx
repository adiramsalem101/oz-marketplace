import styles from './page.module.scss';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.brand}>🏗 עוז</span>
        <span className={styles.tag}>Phase 0 · Scaffold OK</span>
      </header>

      <section className={styles.hero}>
        <h1>שלום, עולם</h1>
        <p>עוז · פלטפורמת מגורים לעובדים זרים</p>
      </section>

      <section className={styles.tokens}>
        <h2>בדיקת טוקנים</h2>
        <div className={styles.swatches}>
          <span className={`${styles.swatch} ${styles.ink}`}>Ink</span>
          <span className={`${styles.swatch} ${styles.orange}`}>Orange CTA</span>
          <span className={`${styles.swatch} ${styles.greenDeep}`}>Green Deep</span>
          <span className={`${styles.swatch} ${styles.blueDeep}`}>Blue Deep</span>
        </div>
        <button className={styles.cta}>כפתור CTA לדוגמה</button>
      </section>
    </main>
  );
}
