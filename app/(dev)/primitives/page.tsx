import { Avatar } from '@/components/primitives/Avatar/Avatar';
import { Badge } from '@/components/primitives/Badge/Badge';
import { Button } from '@/components/primitives/Button/Button';
import { Card } from '@/components/primitives/Card/Card';
import { Chip } from '@/components/primitives/Chip/Chip';
import { Icon } from '@/components/primitives/Icon/Icon';
import { Input } from '@/components/primitives/Input/Input';
import { Pill } from '@/components/primitives/Pill/Pill';
import { ProgressBar } from '@/components/primitives/ProgressBar/ProgressBar';
import { VerificationLevelBadge } from '@/components/primitives/VerificationLevelBadge/VerificationLevelBadge';

import { RemovableChipDemo } from './InteractiveChips';
import styles from './page.module.scss';

export const metadata = { title: 'עוז · Primitives Demo' };

export default function PrimitivesDemoPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>בדיקת רכיבי בסיס</h1>
        <p>Phase 1 · CP-1.5 review surface</p>
      </header>

      <Section title="Button">
        <Row label="variants">
          <Button variant="cta">CTA ראשי</Button>
          <Button variant="ghost">משני (ghost)</Button>
          <Button variant="blue">כחול</Button>
        </Row>
        <Row label="sizes">
          <Button variant="cta" size="sm">קטן</Button>
          <Button variant="cta" size="base">רגיל</Button>
        </Row>
        <Row label="states">
          <Button variant="cta">רגיל</Button>
          <Button variant="cta" disabled>מנוטרל</Button>
          <Button variant="cta" iconStart={<Icon name="plus" size="sm" />}>עם אייקון</Button>
        </Row>
      </Section>

      <Section title="Input">
        <Row label="variants">
          <Input label="שם מלא" placeholder="ישראלה ישראלי" />
          <Input label="עם רמז" placeholder="example@oz.co.il" hint="כתובת מייל לקבלת התראות" />
          <Input label="שגיאה" placeholder="example@oz.co.il" error="שדה חובה" />
          <Input label="מנוטרל" placeholder="" hint="קלט מנוטרל" disabled defaultValue="—" />
        </Row>
      </Section>

      <Section title="Card">
        <Row label="variants">
          <Card variant="default">
            <h3>Default</h3>
            <p>צל קל · ברירת מחדל</p>
          </Card>
          <Card variant="outline">
            <h3>Outline</h3>
            <p>מסגרת בלבד · ללא צל</p>
          </Card>
          <Card variant="elevated">
            <h3>Elevated</h3>
            <p>צל בולט · להדגשת תוכן</p>
          </Card>
        </Row>
      </Section>

      <Section title="Pill">
        <Row label="tones">
          <Pill tone="gray">Gray</Pill>
          <Pill tone="green-deep">Green Deep</Pill>
          <Pill tone="green-soft">Green Soft</Pill>
          <Pill tone="blue-deep">Blue Deep</Pill>
          <Pill tone="blue-soft">Blue Soft</Pill>
          <Pill tone="orange-deep">Orange Deep</Pill>
          <Pill tone="orange-soft">Orange Soft</Pill>
          <Pill tone="red-soft">Red Soft</Pill>
          <Pill tone="amber-soft">Amber Soft</Pill>
        </Row>
        <Row label="live">
          <Pill tone="green-soft" live>פעיל עכשיו</Pill>
        </Row>
      </Section>

      <Section title="Chip">
        <Row label="states">
          <Chip>תל-אביב</Chip>
          <Chip active>נבחר</Chip>
          <Chip verified>מאומת</Chip>
          <RemovableChipDemo />
        </Row>
      </Section>

      <Section title="Badge">
        <Row label="tones">
          <Badge tone="gray" count={3} />
          <Badge tone="blue-soft" count={12} />
          <Badge tone="alert" count={147} />
          <Badge tone="alert" count={0} />
          <span className={styles.muted}>(count=0 לא מרונדר)</span>
        </Row>
      </Section>

      <Section title="VerificationLevelBadge">
        <Row label="levels">
          <VerificationLevelBadge level={1} />
          <VerificationLevelBadge level={2} />
          <VerificationLevelBadge level={3} />
        </Row>
      </Section>

      <Section title="Avatar">
        <Row label="sizes">
          <Avatar name="Adir Amsalem" size="sm" />
          <Avatar name="Adir Amsalem" size="base" />
          <Avatar name="Adir Amsalem" size="lg" />
        </Row>
        <Row label="tones">
          <Avatar name="Roi Alex" tone="green" />
          <Avatar name="Maya Levi" tone="blue" />
          <Avatar name="Dagan Aar" tone="orange" />
          <Avatar name="עוזי טסט" tone="gray" />
        </Row>
      </Section>

      <Section title="ProgressBar">
        <Row label="tones + values">
          <ProgressBar value={20} tone="blue" showLabel />
          <ProgressBar value={55} tone="green" showLabel />
          <ProgressBar value={80} tone="orange" showLabel />
          <ProgressBar value={95} tone="red" showLabel />
        </Row>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.rowItems}>{children}</div>
    </div>
  );
}
