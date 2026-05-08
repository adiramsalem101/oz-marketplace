import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Icon } from '@/components/primitives/Icon/Icon';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { HOSTELS } from '@/lib/hostels';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = await createServerClient();
  const { data: previewListings } = await supabase
    .from('listings')
    .select('id, title, city, bed_count, monthly_rent_per_bed, verification_level')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(6);

  return (
    <main className={styles.main}>
      <PublicNav />
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>פיילוט גוש דן פעיל</p>
          <h1>דיור לעובדים זרים<br/>עומד בחוק, מנוהל בשטח</h1>
          <p className={styles.heroSubtitle}>
            קבלני בנייה: מצאו דיור מאומת תוך 48 שעות.<br/>
            בעלי נכסים: הגדילו הכנסה ב-80%+ ממחיר שוק.
          </p>
          <p className={styles.terms}>ללא עלות לקבלן · 5% עמלה מבעל הנכס · חשבונית מס</p>
          <div className={styles.heroActions}>
            <Link href="/listings"><Button variant="cta" size="base">חפש נכס מתאים</Button></Link>
            <Link href="/sign-up"><Button variant="ghost" size="base">פרסם נכס</Button></Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className={styles.trustStrip}>
        <div className={styles.trustItem}><Icon name="check" /> חוזה דיגיטלי</div>
        <div className={styles.trustItem}><Icon name="check" /> חשבונית מס</div>
        <div className={styles.trustItem}><Icon name="check" /> ביקורת מסמכים</div>
        <div className={styles.trustItem}><Icon name="check" /> תמיכה בעברית</div>
      </section>

      {/* HOSTELS STRIP */}
      <section className={styles.section}>
        <h2>אכסניות עוז</h2>
        <p className={styles.sectionLead}>לינה יומית גמישה · ₪120/לילה</p>
        <div className={styles.hostelsGrid}>
          {HOSTELS.map(h => (
            <a key={h.slug} href={h.fdmUrl} target="_blank" rel="noreferrer noopener" className={styles.hostelCard}>
              <span className={styles.hostelEmoji}>{h.emoji}</span>
              <span className={styles.hostelCity}>{h.city}</span>
              <span className={styles.hostelName}>{h.name}</span>
              <span className={styles.hostelCta}>🛏️ הזמן</span>
            </a>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <Stat icon="users" big="90,000" label="עובדים זרים בבנייה" />
        <Stat icon="percent" big="5%" label="עמלה מבעל הנכס" />
        <Stat icon="clock" big="48h" label="זמן מענה מקסימלי" />
        <Stat icon="ruler" big='4 מ"ר' label="לעובד — חוקי" />
      </section>

      {/* LISTINGS PREVIEW */}
      {previewListings?.length ? (
        <section className={styles.section}>
          <h2>נכסים זמינים — גוש דן</h2>
          <div className={styles.listingsPreview}>
            {previewListings.map(l => (
              <Link key={l.id} href={`/listings/${l.id}`} className={styles.previewCard}>
                <div className={styles.previewBody}>
                  <h3>{l.title}</h3>
                  <p>📍 {l.city}</p>
                  <p>{l.bed_count} מיטות · ₪{l.monthly_rent_per_bed.toLocaleString('he-IL')}/מיטה</p>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.allLink}>
            <Link href="/listings"><Button variant="ghost">כל הנכסים ←</Button></Link>
          </div>
        </section>
      ) : null}

      {/* HOW IT WORKS */}
      <section className={styles.section}>
        <h2>איך זה עובד?</h2>
        <p className={styles.sectionLead}>מהחיפוש עד לחתימה — תהליך מסודר</p>
        <div className={styles.steps}>
          <Step n={1} title="חפש לפי צורך" t="5 דקות"
            body="סנן לפי עיר, מספר מיטות וגודל נכס. כל נכס כולל פירוט מלא." />
          <Step n={2} title="בקש לשריין" t="עד 48 שעות"
            body="שלח בקשת שריון לבעל הנכס. הבעלים מאשר תוך 48 שעות." />
          <Step n={3} title="שלם וחתום" t="3-5 ימי עסקים"
            body="תשלום מאובטח דרך פלאקארד וחתימה דיגיטלית על חוזה השכירות." />
        </div>
      </section>

      {/* LEGAL CALLOUT */}
      <section className={styles.legal}>
        <h3>⚖️ חוק עובדים זרים מחייב דיור הולם</h3>
        <p>כל מעסיק חייב לספק דיור העומד בתקנות: מינימום 4 מ״ר לעובד, שירותים ומקלחות לפי יחס קבוע. אי עמידה בתקנות — עבירה פלילית.</p>
        <Link href="/listings"><Button variant="ghost">לנכסים מאומתים ←</Button></Link>
      </section>

      {/* OWNER PITCH */}
      <section className={styles.ownerPitch}>
        <h2>בעל נכס מתאים? הגדל הכנסה בצורה מסודרת</h2>
        <p>פרסום בסיסי ללא עלות. ביקורת פיזית ותג אימות — בקרוב.</p>
        <Link href="/sign-up"><Button variant="cta" size="base">פרסם נכס</Button></Link>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <h2>שאלות נפוצות</h2>
        <Faq q="האם הנכסים מאושרים על ידי הרשויות?" a="כל הנכסים מתפרסמים תחת הצהרת הבעלים. נכסים שעברו ביקורת מסמכים נושאים תג אימות." />
        <Faq q="כמה זמן לוקח למצוא נכס מתאים?" a="הזמן הממוצע משריון לחתימה הוא 3-5 ימי עסקים." />
        <Faq q="האם יש חוזה שכירות מסודר?" a="כן. אנחנו מספקים חוזה שכירות תקני שעובר חתימה דיגיטלית של שני הצדדים." />
        <Faq q="מה עלות השירות?" a="לקבלן: ללא עלות. לבעל הנכס: 5% עמלה מסכום השכירות החודשית." />
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>פלטפורמה לאיתור דיור לעובדים זרים בגוש דן.</p>
        <p>© 2026 עוז. כל הזכויות שמורות.</p>
      </footer>
    </main>
  );
}

function Stat({ icon, big, label }: { icon: string; big: string; label: string }) {
  return (
    <div className={styles.stat}>
      <Icon name={icon} size="lg" />
      <strong>{big}</strong>
      <span>{label}</span>
    </div>
  );
}

function Step({ n, title, t, body }: { n: number; title: string; t: string; body: string }) {
  return (
    <Card variant="outline" className={styles.step}>
      <span className={styles.stepNum}>{n}</span>
      <h3>{title}</h3>
      <span className={styles.stepTime}>⏱ {t}</span>
      <p>{body}</p>
    </Card>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className={styles.faqItem}>
      <summary>{q}</summary>
      <p>{a}</p>
    </details>
  );
}
