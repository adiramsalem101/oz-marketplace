'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/primitives/Button/Button';
import { Input } from '@/components/primitives/Input/Input';
import { Card } from '@/components/primitives/Card/Card';
import { createBrowserClient } from '@/lib/supabase/browser';
import type { ListingFormProps, ListingFormValues } from './ListingForm.types';
import styles from './ListingForm.module.scss';

const EMPTY: ListingFormValues = {
  title: '',
  description: '',
  city: '',
  street: '',
  street_number: '',
  bed_count: 8,
  monthly_rent_per_bed: 1200,
  area_sqm: undefined,
  bathroom_count: undefined,
  has_kitchen: true,
  has_wifi: false,
  has_parking: false,
};

export function ListingForm({ initial, listingId }: ListingFormProps) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [values, setValues] = useState<ListingFormValues>(initial ?? EMPTY);
  const [saving, setSaving] = useState<'idle' | 'draft' | 'publish'>('idle');
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ListingFormValues>(key: K, value: ListingFormValues[K]) {
    setValues(v => ({ ...v, [key]: value }));
  }

  async function save(targetStatus: 'draft' | 'published') {
    setError(null);
    setSaving(targetStatus === 'published' ? 'publish' : 'draft');

    const payload = {
      ...values,
      status: targetStatus,
      ...(targetStatus === 'published' ? { published_at: new Date().toISOString() } : {}),
    };

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('יש להתחבר מחדש');
      setSaving('idle');
      return;
    }

    let res;
    if (listingId) {
      res = await supabase.from('listings').update(payload).eq('id', listingId).select().single();
    } else {
      res = await supabase.from('listings').insert({ ...payload, owner_id: user.id }).select().single();
    }

    if (res.error) {
      setError(res.error.message);
      setSaving('idle');
      return;
    }

    router.push('/listings');
    router.refresh();
  }

  return (
    <Card className={styles.card}>
      <div className={styles.grid}>
        <Input
          label="כותרת"
          placeholder="לדוגמה: דירה ל-12 עובדים בלב תל אביב"
          value={values.title}
          onChange={e => update('title', e.target.value)}
          fullWidth
        />
        <Input
          label="עיר"
          placeholder="תל אביב"
          value={values.city}
          onChange={e => update('city', e.target.value)}
        />
        <Input
          label="רחוב"
          placeholder="הרצל"
          value={values.street ?? ''}
          onChange={e => update('street', e.target.value)}
        />
        <Input
          label="מספר"
          placeholder="14"
          value={values.street_number ?? ''}
          onChange={e => update('street_number', e.target.value)}
        />
        <Input
          type="number"
          label="מספר מיטות"
          value={String(values.bed_count)}
          onChange={e => update('bed_count', parseInt(e.target.value) || 0)}
        />
        <Input
          type="number"
          label="מחיר למיטה / חודש (₪)"
          value={String(values.monthly_rent_per_bed)}
          onChange={e => update('monthly_rent_per_bed', parseInt(e.target.value) || 0)}
        />
        <Input
          type="number"
          label="שטח (מ״ר)"
          value={String(values.area_sqm ?? '')}
          onChange={e => update('area_sqm', e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <Input
          type="number"
          label="מספר חדרי שירותים"
          value={String(values.bathroom_count ?? '')}
          onChange={e => update('bathroom_count', e.target.value ? parseInt(e.target.value) : undefined)}
        />
      </div>

      <div className={styles.amenities}>
        <h3>מתקנים</h3>
        <label><input type="checkbox" checked={values.has_kitchen} onChange={e => update('has_kitchen', e.target.checked)} /> מטבח</label>
        <label><input type="checkbox" checked={values.has_wifi} onChange={e => update('has_wifi', e.target.checked)} /> אינטרנט</label>
        <label><input type="checkbox" checked={values.has_parking} onChange={e => update('has_parking', e.target.checked)} /> חניה</label>
      </div>

      <div className={styles.descGroup}>
        <label>תיאור הנכס</label>
        <textarea
          className={styles.textarea}
          rows={5}
          value={values.description ?? ''}
          onChange={e => update('description', e.target.value)}
          placeholder="ספרו על הנכס: מיקום, איכות, מתקנים, גישה לתחבורה ציבורית..."
        />
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <Button variant="ghost" onClick={() => save('draft')} disabled={saving !== 'idle'}>
          {saving === 'draft' ? 'שומר…' : 'שמור כטיוטה'}
        </Button>
        <Button variant="cta" onClick={() => save('published')} disabled={saving !== 'idle'}>
          {saving === 'publish' ? 'מפרסם…' : 'פרסם נכס'}
        </Button>
      </div>
    </Card>
  );
}
