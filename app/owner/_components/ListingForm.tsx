'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/primitives/Button/Button';
import { Input } from '@/components/primitives/Input/Input';
import { Card } from '@/components/primitives/Card/Card';
import { Icon } from '@/components/primitives/Icon/Icon';
import { createBrowserClient } from '@/lib/supabase/browser';
import type { ListingFormProps, ListingFormValues, ListingImage } from './ListingForm.types';
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

const SUPABASE_PUBLIC_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const BUCKET = 'listing-images';

interface PendingFile {
  id: string;       // local UUID
  file: File;
  previewUrl: string;
}

export function ListingForm({ initial, listingId, initialImages }: ListingFormProps) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [values, setValues] = useState<ListingFormValues>(initial ?? EMPTY);
  const [existing, setExisting] = useState<ListingImage[]>(initialImages ?? []);
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [saving, setSaving] = useState<'idle' | 'draft' | 'publish'>('idle');
  const [error, setError] = useState<string | null>(null);

  const visibleExisting = useMemo(
    () => existing.filter(img => !removedIds.includes(img.id)).sort((a, b) => a.display_order - b.display_order),
    [existing, removedIds],
  );

  function update<K extends keyof ListingFormValues>(key: K, value: ListingFormValues[K]) {
    setValues(v => ({ ...v, [key]: value }));
  }

  function onFilesPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const next: PendingFile[] = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPending(p => [...p, ...next]);
    e.target.value = '';
  }

  function removePending(id: string) {
    setPending(p => {
      const target = p.find(x => x.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return p.filter(x => x.id !== id);
    });
  }

  function removeExisting(id: string) {
    setRemovedIds(r => [...r, id]);
  }

  function moveExisting(id: string, dir: -1 | 1) {
    setExisting(list => {
      const sorted = [...list].sort((a, b) => a.display_order - b.display_order);
      const idx = sorted.findIndex(img => img.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= sorted.length) return list;
      const a = sorted[idx];
      const b = sorted[target];
      return list.map(img => {
        if (img.id === a.id) return { ...img, display_order: b.display_order };
        if (img.id === b.id) return { ...img, display_order: a.display_order };
        return img;
      });
    });
  }

  function publicUrl(path: string) {
    return `${SUPABASE_PUBLIC_URL}/storage/v1/object/public/${BUCKET}/${path}`;
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

    let savedId = listingId;
    if (listingId) {
      const { error: e } = await supabase.from('listings').update(payload).eq('id', listingId);
      if (e) { setError(e.message); setSaving('idle'); return; }
    } else {
      const { data, error: e } = await supabase
        .from('listings')
        .insert({ ...payload, owner_id: user.id })
        .select('id')
        .single();
      if (e || !data) { setError(e?.message ?? 'failed to create listing'); setSaving('idle'); return; }
      savedId = data.id;
    }

    // Existing images: persist any reorder changes; delete the ones marked for removal.
    for (const img of existing) {
      if (removedIds.includes(img.id)) {
        await supabase.storage.from(BUCKET).remove([img.storage_path]);
        await supabase.from('listing_images').delete().eq('id', img.id);
      } else {
        await supabase
          .from('listing_images')
          .update({ display_order: img.display_order })
          .eq('id', img.id);
      }
    }

    // Upload + insert new images.
    const baseOrder = visibleExisting.length
      ? Math.max(...visibleExisting.map(i => i.display_order)) + 1
      : 0;

    for (let i = 0; i < pending.length; i++) {
      const p = pending[i];
      const ext = p.file.name.includes('.') ? p.file.name.split('.').pop() : 'jpg';
      const objectId = crypto.randomUUID();
      const path = `${user.id}/${savedId}/${objectId}.${ext}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, p.file, {
        contentType: p.file.type || undefined,
      });
      if (upErr) { setError(upErr.message); setSaving('idle'); return; }
      const { error: rowErr } = await supabase.from('listing_images').insert({
        listing_id: savedId,
        storage_path: path,
        display_order: baseOrder + i,
      });
      if (rowErr) { setError(rowErr.message); setSaving('idle'); return; }
    }

    pending.forEach(p => URL.revokeObjectURL(p.previewUrl));

    router.push('/owner/listings');
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

      <div className={styles.imagesGroup}>
        <h3>תמונות הנכס</h3>
        <p className={styles.imagesHint}>תמונות עוזרות לתאגידי בנייה להבין את הנכס לפני שליחת בקשה.</p>

        {visibleExisting.length || pending.length ? (
          <div className={styles.imagesGrid}>
            {visibleExisting.map((img, i) => (
              <div key={img.id} className={styles.imageTile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={publicUrl(img.storage_path)} alt={`תמונה ${i + 1}`} />
                <div className={styles.imageActions}>
                  <button type="button" onClick={() => moveExisting(img.id, -1)} disabled={i === 0} aria-label="הזז שמאלה">
                    <Icon name="arrow-left" size="sm" />
                  </button>
                  <button type="button" onClick={() => moveExisting(img.id, 1)} disabled={i === visibleExisting.length - 1} aria-label="הזז ימינה">
                    <Icon name="arrow-right" size="sm" />
                  </button>
                  <button type="button" onClick={() => removeExisting(img.id)} aria-label="מחק תמונה">
                    <Icon name="x" size="sm" />
                  </button>
                </div>
              </div>
            ))}
            {pending.map(p => (
              <div key={p.id} className={styles.imageTile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.previewUrl} alt={p.file.name} />
                <div className={styles.imageActions}>
                  <span className={styles.imageBadge}>חדש</span>
                  <button type="button" onClick={() => removePending(p.id)} aria-label="הסר">
                    <Icon name="x" size="sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <label className={styles.fileInput}>
          <Icon name="upload" />
          <span>הוסיפו תמונות</span>
          <input type="file" accept="image/*" multiple onChange={onFilesPicked} />
        </label>
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
