// 구글 시트를 "웹에 게시(CSV)"한 URL을 fetch해서 2차원 배열로 파싱하는 유틸리티입니다.
// RFC 4180 방식의 따옴표/콤마/줄바꿈 이스케이프를 처리합니다.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

/**
 * 공개 CSV로 게시된 구글 시트를 가져와 헤더 기준 객체 배열로 반환합니다.
 * @param csvUrl 시트 "파일 > 공유 > 웹에 게시" 또는 export?format=csv 링크
 */
export async function fetchSheetAsObjects(csvUrl: string): Promise<Record<string, string>[]> {
  const res = await fetch(csvUrl);
  if (!res.ok) {
    throw new Error(`구글 시트를 불러오지 못했습니다 (status: ${res.status})`);
  }
  const text = await res.text();
  const rows = parseCsv(text);
  if (rows.length === 0) return [];

  const [header, ...body] = rows;
  const keys = header.map((h) => h.trim());

  return body.map((row) => {
    const obj: Record<string, string> = {};
    keys.forEach((key, idx) => {
      obj[key] = (row[idx] ?? '').trim();
    });
    return obj;
  });
}
