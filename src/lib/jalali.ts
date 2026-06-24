import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js';

export const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

// Indexed by Date#getDay() (0 = Sunday ... 6 = Saturday)
const PERSIAN_WEEKDAYS = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];

export interface JalaliDate {
  jy: number;
  jm: number;
  jd: number;
}

export function toPersianDigits(value: number | string): string {
  const digits = '۰۱۲۳۴۵۶۷۸۹';
  return String(value).replace(/[0-9]/g, (d) => digits[Number(d)]);
}

export function todayJalali(): JalaliDate {
  const now = new Date();
  return toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function jalaliToDate({ jy, jm, jd }: JalaliDate): Date {
  const { gy, gm, gd } = toGregorian(jy, jm, jd);
  return new Date(gy, gm - 1, gd);
}

export function weekdayName(date: JalaliDate): string {
  return PERSIAN_WEEKDAYS[jalaliToDate(date).getDay()];
}

/** Saturday-first column index (0=شنبه ... 6=جمعه) for grid alignment. */
export function weekdayColumn(date: JalaliDate): number {
  return (jalaliToDate(date).getDay() + 1) % 7;
}

export function monthLength(jy: number, jm: number): number {
  return jalaaliMonthLength(jy, jm);
}

export function formatJalaliDate({ jy, jm, jd }: JalaliDate): string {
  return `${toPersianDigits(jd)} ${PERSIAN_MONTHS[jm - 1]} ${toPersianDigits(jy)}`;
}

export function formatMonthYear(jy: number, jm: number): string {
  return `${PERSIAN_MONTHS[jm - 1]} ${toPersianDigits(jy)}`;
}

/** Simple ordinal for chronological comparison only (not a real day count). */
export function ordinal({ jy, jm, jd }: JalaliDate): number {
  return jy * 372 + jm * 31 + jd;
}

export function isSameDate(a: JalaliDate, b: JalaliDate): boolean {
  return a.jy === b.jy && a.jm === b.jm && a.jd === b.jd;
}

export function addMonths({ jy, jm }: JalaliDate, delta: number): JalaliDate {
  let m = jm + delta;
  let y = jy;
  while (m > 12) { m -= 12; y += 1; }
  while (m < 1) { m += 12; y -= 1; }
  return { jy: y, jm: m, jd: 1 };
}

/** Days remaining until the next occurrence of a recurring jalali month/day (birthdays have no year). */
export function daysUntilNext(jm: number, jd: number): number {
  const today = todayJalali();
  const todayDate = jalaliToDate(today);
  let candidate = jalaliToDate({ jy: today.jy, jm, jd: Math.min(jd, monthLength(today.jy, jm)) });
  if (candidate.getTime() < todayDate.getTime()) {
    const nextYear = today.jy + 1;
    candidate = jalaliToDate({ jy: nextYear, jm, jd: Math.min(jd, monthLength(nextYear, jm)) });
  }
  return Math.round((candidate.getTime() - todayDate.getTime()) / 86400000);
}

export function isBirthdayToday(jm: number, jd: number): boolean {
  const today = todayJalali();
  return today.jm === jm && today.jd === jd;
}
