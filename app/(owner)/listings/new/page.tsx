import { Topbar } from '@/components/layout/Topbar/Topbar';
import { ListingForm } from '../../_components/ListingForm';
import styles from './page.module.scss';

export default function NewListingPage() {
  return (
    <>
      <Topbar title="הוספת נכס חדש" subtitle="פרסמו את הנכס שלכם בפלטפורמה" />
      <div className={styles.content}>
        <ListingForm />
      </div>
    </>
  );
}
