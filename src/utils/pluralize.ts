/**
 * Ukrainian noun pluralization for "count + noun" UI labels (e.g. stat cards
 * on /progress and the dashboard: "1 пройдений тест", "3 пройдені тести",
 * "5 пройдених тестів").
 *
 * Ukrainian nouns after a number take one of three grammatical forms:
 *   - "one"  — ends in 1, except those ending in 11 (1, 21, 31, ... but not 11)
 *   - "few"  — ends in 2-4, except those ending in 12-14 (2, 3, 4, 22, ... but not 12-14)
 *   - "many" — everything else (0, 5-20, 25-30, 11-14, ...)
 */
export function pluralizeUk(count: number, [one, few, many]: [string, string, string]): string {
  const abs = Math.abs(count) % 100;
  const lastDigit = abs % 10;

  if (abs >= 11 && abs <= 14) return many;
  if (lastDigit === 1) return one;
  if (lastDigit >= 2 && lastDigit <= 4) return few;
  return many;
}

/** Convenience wrapper: returns "{count} {noun form}" ready to render. */
export function countLabelUk(count: number, forms: [string, string, string]): string {
  return `${count} ${pluralizeUk(count, forms)}`;
}
