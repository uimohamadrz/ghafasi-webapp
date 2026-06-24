import styles from './BottomNav.module.css';

export type ViewName = 'home' | 'make' | 'cake' | 'archive';

const ITEMS: { id: ViewName; label: string }[] = [
  { id: 'home', label: 'خانه' },
  { id: 'make', label: 'بساز' },
  { id: 'cake', label: 'تولدها' },
  { id: 'archive', label: 'بایگانی' },
];

interface BottomNavProps {
  active: ViewName;
  onNavigate: (view: ViewName) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === active ? styles.itemActive : styles.item}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
