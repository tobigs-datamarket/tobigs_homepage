import { fetchSheetAsObjects } from './googleSheet';
import type { Member } from '@/mocks/members';

const MEMBERS_SHEET_CSV_URL = import.meta.env.VITE_MEMBERS_SHEET_CSV_URL as string | undefined;

const VALID_ROLES: Member['role'][] = ['member', 'executive', 'president', 'vice_president'];

export async function fetchMembersFromSheet(): Promise<Member[]> {
  if (!MEMBERS_SHEET_CSV_URL) {
    throw new Error('VITE_MEMBERS_SHEET_CSV_URL 환경변수가 설정되지 않았습니다.');
  }

  const rows = await fetchSheetAsObjects(MEMBERS_SHEET_CSV_URL);

  return rows
    .filter((row) => row.name && row.generation)
    .map((row, idx) => {
      const role = VALID_ROLES.includes(row.role as Member['role']) ? (row.role as Member['role']) : 'member';
      return {
        id: String(idx + 1),
        name: row.name,
        generation: Number(row.generation),
        university: row.university ?? '',
        company: row.company ?? '',
        role,
        profile_image_url: row.profile_image_url || null,
      };
    });
}
