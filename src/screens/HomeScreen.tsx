import { useEffect, useRef, useState } from 'react';
import { MemeFrame } from '../components/MemeFrame';
import { SunburstRing } from '../components/SunburstRing';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { formatJalaliDate, PERSIAN_MONTHS, toPersianDigits, todayJalali, weekdayName } from '../lib/jalali';
import { shareCardImage } from '../lib/share';
import styles from './HomeScreen.module.css';

export function HomeScreen() {
  const today = todayJalali();
  const monthName = PERSIAN_MONTHS[today.jm - 1];
  const { toastMessage, showToast } = useToast();
  const posterRef = useRef<HTMLDivElement>(null);
  const [slapKey, setSlapKey] = useState(0);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    setSlapKey((k) => k + 1);
  }, []);

  async function handleShare() {
    if (sharing || !posterRef.current) return;
    setSharing(true);
    try {
      const outcome = await shareCardImage(posterRef.current, {
        filename: 'taghvim-ghafasi.png',
        title: 'تقویم قفسی',
        text: `امروز ${toPersianDigits(today.jd)} ${monthName}ه؟`,
      });
      const messages: Record<string, string> = {
        shared: 'ارسال شد ✓',
        copied: 'کارت کپی شد ✓',
        downloaded: 'کارت ذخیره شد ✓',
        failed: 'نشد، دوباره بزن',
      };
      showToast(messages[outcome]);
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <div className={styles.brand}>
          <div className={styles.brandName}>تقویم قفسی</div>
          <div className={styles.tagline}>امروز چندمه؟</div>
        </div>
        <div className={styles.weekdayPill}>{weekdayName(today)}</div>
      </div>

      <div key={slapKey} ref={posterRef} className={styles.poster} onClick={() => setSlapKey((k) => k + 1)}>
        <MemeFrame videoSrc="/uploads/kham.mp4" height={296} />
        <div className={styles.hero}>
          <SunburstRing />
          <div className={styles.heroText}>
            امروز <span className={styles.heroNumber}>{toPersianDigits(today.jd)}</span> {monthName}ه؟
          </div>
          <div className={styles.dateLine}>{formatJalaliDate(today)}</div>
        </div>
      </div>

      <div className={styles.shareRow}>
        <button type="button" className={styles.shareButton} onClick={handleShare} disabled={sharing}>
          <span className={styles.shareArrow} />
          هم‌رسانی
        </button>
      </div>

      <Toast message={toastMessage} />
    </div>
  );
}
