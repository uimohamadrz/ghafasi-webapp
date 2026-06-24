import { useState } from 'react';
import { PERSIAN_MONTHS, toPersianDigits } from '../lib/jalali';
import styles from './AddFriendModal.module.css';

interface AddFriendModalProps {
  onClose: () => void;
  onSubmit: (name: string, jm: number, jd: number) => void;
}

function daysInMonth(jm: number): number {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return 29;
}

export function AddFriendModal({ onClose, onSubmit }: AddFriendModalProps) {
  const [name, setName] = useState('');
  const [jm, setJm] = useState(1);
  const [jd, setJd] = useState(1);

  function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed, jm, jd);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>رفیقِ جدید</div>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسمش رو بنویس"
          className={styles.input}
        />
        <div className={styles.row}>
          <select className={styles.select} value={jm} onChange={(e) => setJm(Number(e.target.value))}>
            {PERSIAN_MONTHS.map((name, i) => (
              <option key={name} value={i + 1}>{name}</option>
            ))}
          </select>
          <select className={styles.select} value={jd} onChange={(e) => setJd(Number(e.target.value))}>
            {Array.from({ length: daysInMonth(jm) }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>{toPersianDigits(day)}</option>
            ))}
          </select>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose}>انصراف</button>
          <button type="button" className={styles.confirm} onClick={handleSubmit} disabled={!name.trim()}>
            اضافه کن
          </button>
        </div>
      </div>
    </div>
  );
}
