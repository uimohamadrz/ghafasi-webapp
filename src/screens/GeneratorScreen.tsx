import { useRef, useState } from 'react';
import { MemeFrame } from '../components/MemeFrame';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { REACTION_TILES } from '../lib/reactions';
import { shareCardImage } from '../lib/share';
import styles from './GeneratorScreen.module.css';

interface GeneratorScreenProps {
  text: string;
  onTextChange: (text: string) => void;
  gifId: string;
  onSelectGif: (id: string) => void;
}

export function GeneratorScreen({ text, onTextChange, gifId, onSelectGif }: GeneratorScreenProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { toastMessage, showToast } = useToast();
  const [sharing, setSharing] = useState(false);
  const selectedTile = REACTION_TILES.find((t) => t.id === gifId) ?? REACTION_TILES[0];
  const displayText = text.trim() || '…';

  async function handleGenerate() {
    if (sharing || !previewRef.current) return;
    setSharing(true);
    try {
      const outcome = await shareCardImage(previewRef.current, {
        filename: 'kart.png',
        title: 'تقویم قفسی',
        text: `امروز ${displayText}ه؟`,
      });
      const messages: Record<string, string> = {
        shared: 'ارسال شد ✓',
        copied: 'کارت کپی شد ✓',
        downloaded: 'کارتت آماده‌ست ✓',
        failed: 'نشد، دوباره بزن',
      };
      showToast(messages[outcome]);
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.title}>کارت بساز</div>
        <div className={styles.subtitle}>واکنش + متن خودت</div>
      </div>

      <div className={`${styles.scroll} scrollHidden`}>
        <div ref={previewRef} className={styles.preview}>
          <MemeFrame placeholderLabel={selectedTile.label} height={158} />
          <div className={styles.previewText}>
            امروز <span className={styles.previewHighlight}>{displayText}</span>ه؟
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>موضوع رو بنویس</div>
          <input
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="مثلاً: روزِ ملیِ گربه"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldLabel}>یک واکنش انتخاب کن</div>
          <div className={styles.gifGrid}>
            {REACTION_TILES.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => onSelectGif(tile.id)}
                className={tile.id === gifId ? styles.gifTileActive : styles.gifTile}
              >
                {tile.label}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className={styles.generateButton} onClick={handleGenerate} disabled={sharing}>
          بساز و بفرست
        </button>
      </div>

      <Toast message={toastMessage} />
    </div>
  );
}
