import { fetchSheetAsObjects } from './googleSheet';
import type { AwardYear } from '@/mocks/awards';

const AWARDS_SHEET_CSV_URL = import.meta.env.VITE_AWARDS_SHEET_CSV_URL as string | undefined;

export async function fetchAwardsFromSheet(): Promise<AwardYear[]> {
  if (!AWARDS_SHEET_CSV_URL) {
    throw new Error('VITE_AWARDS_SHEET_CSV_URL 환경변수가 설정되지 않았습니다.');
  }

  const rows = await fetchSheetAsObjects(AWARDS_SHEET_CSV_URL);

  const yearMap = new Map<number, AwardYear>();
  for (const row of rows) {
    const year = Number(row.year);
    if (!year || !row.title) continue;

    if (!yearMap.has(year)) {
      yearMap.set(year, { year, items: [] });
    }
    yearMap.get(year)!.items.push({ title: row.title, winner: row.winner ?? '' });
  }

  return Array.from(yearMap.values()).sort((a, b) => b.year - a.year);
}
