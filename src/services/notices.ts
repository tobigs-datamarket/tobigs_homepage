import { useCallback, useEffect, useState } from 'react';
import { fetchSheetAsObjects } from './googleSheet';

// 공지는 구글 시트(공지 탭)에서만 관리한다. 열 이름으로 읽으므로 순서가 바뀌거나 다른 열이 있어도 괜찮다.
// 쓰는 열: id, date, title, pinned, content
export interface Notice {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  content: string; // "## 소제목", "- 항목", URL 한 줄(이미지/링크) 지원
  isPinned: boolean;
}

const NOTICES_SHEET_CSV_URL = import.meta.env.VITE_NOTICES_SHEET_CSV_URL as string | undefined;

// 시트에서 날짜 칸이 "2026. 7. 1" 처럼 자동 변환돼도 2026-07-01 로 맞춘다
function toIsoDate(value: string): string {
  const [y, m, d] = value.match(/\d+/g) ?? [];
  return y && m && d ? `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}` : value;
}

/** 2026-07-01 → 2026.07.01 */
export const formatNoticeDate = (date: string) => date.replaceAll('-', '.');

export async function fetchNoticesFromSheet(): Promise<Notice[]> {
  if (!NOTICES_SHEET_CSV_URL) {
    throw new Error('VITE_NOTICES_SHEET_CSV_URL 환경변수가 설정되지 않았습니다.');
  }

  const rows = await fetchSheetAsObjects(NOTICES_SHEET_CSV_URL);

  // id나 제목이 빈 행은 작성 중인 글로 보고 건너뛴다
  return rows
    .filter((row) => row.id && row.title)
    .map((row) => ({
      id: row.id,
      date: toIsoDate(row.date ?? ''),
      title: row.title,
      content: row.content ?? '',
      isPinned: row.pinned?.toUpperCase() === 'TRUE',
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// 한 번 읽은 목록은 재사용해서 목록 → 상세 이동 때 다시 불러오지 않는다
let cache: Notice[] | null = null;
let pending: Promise<Notice[]> | null = null;

function loadNotices(): Promise<Notice[]> {
  pending ??= fetchNoticesFromSheet()
    .catch(() => fetchNoticesFromSheet()) // 일시적인 네트워크 오류 대비 한 번만 다시 시도
    .then((list) => (cache = list))
    .finally(() => {
      pending = null; // 실패했으면 다음 시도 때 새로 요청한다
    });
  return pending;
}

/** notices: 최신순 목록(불러오는 중엔 null) / failed: 두 번 다 실패 / retry: 다시 불러오기 */
export function useNotices() {
  const [notices, setNotices] = useState(cache);
  const [failed, setFailed] = useState(false);

  const retry = useCallback(() => {
    setFailed(false);
    loadNotices().then(setNotices, (err) => {
      console.error('공지사항 시트를 불러오지 못했습니다.', err);
      setFailed(true);
    });
  }, []);

  useEffect(() => {
    if (!cache) retry();
  }, [retry]);

  return { notices, failed, retry };
}
