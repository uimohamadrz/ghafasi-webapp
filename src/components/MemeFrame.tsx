import styles from './MemeFrame.module.css';

interface MemeFrameProps {
  videoSrc?: string;
  placeholderLabel?: string;
  height?: number;
  className?: string;
}

export function MemeFrame({ videoSrc, placeholderLabel, height = 296, className }: MemeFrameProps) {
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} style={{ height }}>
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={styles.media}
        />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderLabel}>{placeholderLabel}</span>
        </div>
      )}
      <div className={styles.gradient} />
      <div className={styles.shineWrap}>
        <div className={styles.shine} />
      </div>
      <div className={styles.watermarkWrap}>
        <span className={styles.watermark}>@Taghvimghafasi</span>
      </div>
    </div>
  );
}
