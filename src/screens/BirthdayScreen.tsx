import { useState } from 'react';
import { daysUntilNext, isBirthdayToday, PERSIAN_MONTHS, toPersianDigits } from '../lib/jalali';
import type { Friend } from '../lib/types';
import { AddFriendModal } from './AddFriendModal';
import styles from './BirthdayScreen.module.css';

interface BirthdayScreenProps {
  friends: Friend[];
  onAddFriend: (name: string, jm: number, jd: number) => void;
  onDeleteFriend: (id: string) => void;
  onMakeCardForFriend: (name: string) => void;
}

function initial(name: string): string {
  return name.charAt(0);
}

export function BirthdayScreen({ friends, onAddFriend, onDeleteFriend, onMakeCardForFriend }: BirthdayScreenProps) {
  const [showAdd, setShowAdd] = useState(false);

  const todayFriend = friends.find((f) => isBirthdayToday(f.jm, f.jd));
  const otherFriends = friends
    .filter((f) => f.id !== todayFriend?.id)
    .map((f) => ({ friend: f, daysLeft: daysUntilNext(f.jm, f.jd) }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.title}>تولدِ رفقا</div>
        <div className={styles.subtitle}>{toPersianDigits(friends.length)} نفر</div>
      </div>

      <div className={`${styles.scroll} scrollHidden`}>
        {todayFriend && (
          <div className={styles.todayCard}>
            <div className={styles.todayCardGlow} />
            <div className={styles.todayCardRow}>
              <div className={styles.avatarDark}>{initial(todayFriend.name)}</div>
              <div className={styles.todayCardInfo}>
                <div className={styles.todayCardSmall}>امروز تولدِ {todayFriend.name}ه؟ 🎉</div>
                <div className={styles.todayCardName}>{todayFriend.name}</div>
              </div>
              <div className={styles.dateChipDark}>
                {toPersianDigits(todayFriend.jd)} {PERSIAN_MONTHS[todayFriend.jm - 1]}
              </div>
            </div>
            <button
              type="button"
              className={styles.makeCardButton}
              onClick={() => onMakeCardForFriend(`تولدِ ${todayFriend.name}`)}
            >
              کارتِ تولدش رو بساز
            </button>
          </div>
        )}

        {otherFriends.map(({ friend, daysLeft }) => (
          <div key={friend.id} className={styles.row}>
            <div className={styles.avatar}>{initial(friend.name)}</div>
            <div className={styles.rowInfo}>
              <div className={styles.rowName}>{friend.name}</div>
              <div className={styles.rowMeta}>
                {toPersianDigits(friend.jd)} {PERSIAN_MONTHS[friend.jm - 1]}
                {daysLeft > 0 ? ` — ${toPersianDigits(daysLeft)} روز مونده` : ''}
              </div>
            </div>
            <div className={styles.dateChip}>
              {toPersianDigits(friend.jd)} {PERSIAN_MONTHS[friend.jm - 1]}
            </div>
            <button type="button" className={styles.deleteButton} onClick={() => onDeleteFriend(friend.id)} aria-label="حذف">
              ×
            </button>
          </div>
        ))}

        <button type="button" className={styles.addButton} onClick={() => setShowAdd(true)}>
          <span className={styles.plus}>＋</span> رفیقِ جدید
        </button>
      </div>

      {showAdd && (
        <AddFriendModal
          onClose={() => setShowAdd(false)}
          onSubmit={(name, jm, jd) => {
            onAddFriend(name, jm, jd);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}
