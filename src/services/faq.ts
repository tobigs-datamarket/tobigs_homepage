import { fetchSheetAsObjects } from './googleSheet';

const FAQ_SHEET_CSV_URL = import.meta.env.VITE_FAQ_SHEET_CSV_URL as string | undefined;

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export async function fetchFaqsFromSheet(): Promise<FaqItem[]> {
  if (!FAQ_SHEET_CSV_URL) {
    throw new Error('VITE_FAQ_SHEET_CSV_URL 환경변수가 설정되지 않았습니다.');
  }

  const rows = await fetchSheetAsObjects(FAQ_SHEET_CSV_URL);

  return rows
    .filter((row) => row.question && row.answer)
    .map((row, idx) => ({
      id: idx + 1,
      question: row.question,
      answer: row.answer,
    }));
}
