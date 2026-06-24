import { useState } from 'react';
import {
  addMonths,
  formatMonthYear,
  isSameDate,
  monthLength,
  ordinal,
  todayJalali,
  toPersianDigits,
  weekdayColumn,
  type JalaliDate,
} from '../lib/jalali';
import styles from './ArchiveScreen.module.css';

const WEEKDAY_LABELS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export function ArchiveScreen() {
  const today = todayJalali();
  const [cursor, setCursor] = useState<JalaliDate>(today);

  const leadingBlanks = weekdayColumn({ jy: cursor.jy, jm: cursor.jm, jd: 1 });
  const dayCount = monthLength(cursor.jy, cursor.jm);
  const todayOrdinal = ordinal(today);

  const cells: { day: number; isToday: boolean; show: boolean }[] = [];
  for (let day = 1; day <= dayCount; day++) {
    const date = { jy: cursor.jy, jm: cursor.jm, jd: day };
    const isToday = isSameDate(date, today);
    const isPast = ordinal(date) < todayOrdinal;
    cells.push({ day, isToday, show: isPast || isToday });
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.title}>بایگانی</div>
        <div className={styles.monthNav}>
          <button type="button" className={styles.navArrow} onClick={() => setCursor((c) => addMonths(c, -1))}>
            ‹
          </button>
          <span className={styles.monthLabel}>{formatMonthYear(cursor.jy, cursor.jm)}</span>
          <button type="button" className={styles.navArrow} onClick={() => setCursor((c) => addMonths(c, 1))}>
            ›
          </button>
        </div>
      </div>

      <div className={`${styles.scroll} scrollHidden`}>
        <div className={styles.weekdayRow}>
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} className={styles.weekdayLabel}>{label}</div>
          ))}
        </div>

        <div className={styles.grid}>
          {Array.from({ length: leadingBlanks }, (_, i) => <div key={`blank-${i}`} />)}
          {cells.map(({ day, isToday, show }) => (
            <div key={day} className={isToday ? styles.cellToday : styles.cell} style={{ opacity: show ? 1 : 0.34 }}>
              <div className={styles.thumb} style={{ opacity: show ? 1 : 0 }} />
              <span className={styles.num} style={{ color: isToday ? 'var(--gold)' : 'rgba(246,236,214,.92)' }}>
                {toPersianDigits(day)}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.legend}>
          <span className={styles.legendSwatch} /> کارتِ منتشرشده
          <span className={styles.legendToday} /> امروز
        </div>
      </div>
    </div>
  );
}
