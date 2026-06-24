import type { Friend } from './types';

const FRIENDS_KEY = 'taghvim-ghafasi:friends';

const SEED_FRIENDS: Friend[] = [
  { id: 'seed-1', name: 'آرش', jm: 4, jd: 2 },
  { id: 'seed-2', name: 'سارا', jm: 4, jd: 14 },
  { id: 'seed-3', name: 'نگار', jm: 5, jd: 28 },
  { id: 'seed-4', name: 'پارسا', jm: 7, jd: 5 },
  { id: 'seed-5', name: 'رویا', jm: 8, jd: 19 },
  { id: 'seed-6', name: 'کیان', jm: 12, jd: 3 },
];

export function loadFriends(): Friend[] {
  try {
    const raw = localStorage.getItem(FRIENDS_KEY);
    if (!raw) return SEED_FRIENDS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return SEED_FRIENDS;
  } catch {
    return SEED_FRIENDS;
  }
}

export function saveFriends(friends: Friend[]): void {
  localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
}
