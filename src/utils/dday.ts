// D-day 상태 판정과 날짜 표시용 순수 함수. 모든 날짜는 보는 사람 PC 시간대와 무관하게 KST 달력 기준이다.

export interface DdayConfig {
  enabled: boolean;
  startAt: string;
  deadline: string;
  hideAfter: string;
}

export type DdayState =
  | { kind: 'hidden' }
  | { kind: 'countdown'; days: number }
  | { kind: 'today' }
  | { kind: 'closed' };

const KST = 'Asia/Seoul';
const DAY_MS = 86_400_000;
// ponytail: 한국은 1988년 이후 서머타임이 없어 +9 고정. 다음 자정 계산에만 쓴다.
const KST_OFFSET_MS = 9 * 3_600_000;

const ymdFormat = new Intl.DateTimeFormat('en-CA', { timeZone: KST, year: 'numeric', month: '2-digit', day: '2-digit' });
const labelFormat = new Intl.DateTimeFormat('ko-KR', {
  timeZone: KST, month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

const parts = (format: Intl.DateTimeFormat, t: number) =>
  Object.fromEntries(format.formatToParts(t).map((p) => [p.type, p.value]));

const parse = (iso: string) => (iso ? Date.parse(iso) : NaN);

function kstYmd(t: number) {
  const p = parts(ymdFormat, t);
  return { y: Number(p.year), m: Number(p.month), d: Number(p.day) };
}

/** KST 달력 날짜끼리의 일수 차이. 두 날짜의 UTC 자정을 빼므로 항상 정수다. */
export function kstDayDiff(from: number, to: number): number {
  const a = kstYmd(from);
  const b = kstYmd(to);
  return (Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / DAY_MS;
}

/** now(ms) 시점의 띠 상태. 시작 전·숨김 이후·설정 오류는 모두 hidden. */
export function getDdayState(now: number, cfg: DdayConfig): DdayState {
  const start = parse(cfg.startAt);
  const end = parse(cfg.deadline);
  const hide = parse(cfg.hideAfter);
  if (!cfg.enabled || Number.isNaN(start) || Number.isNaN(end) || now < start) return { kind: 'hidden' };
  if (now >= end) return !Number.isNaN(hide) && now < hide ? { kind: 'closed' } : { kind: 'hidden' };
  const days = kstDayDiff(now, end);
  return days > 0 ? { kind: 'countdown', days } : { kind: 'today' };
}

/**
 * 서류 모집 중인지(리쿠르팅 페이지 지원 화면 여부). enabled와 무관하게 startAt·deadline만 본다.
 * deadline은 23:59:59로 쓰므로 +1초 = 다음날 00:00(자정)까지 true. 날짜가 비었거나 틀리면 false.
 */
export function isRecruitingOpen(now: number, cfg: Pick<DdayConfig, 'startAt' | 'deadline'>): boolean {
  return now >= parse(cfg.startAt) && now < parse(cfg.deadline) + 1000;
}

/** 상태가 바뀔 수 있는 다음 시각: 다음 KST 자정, 시작, 마감, 숨김 중 now 이후 가장 이른 것. */
export function nextBoundary(now: number, cfg: DdayConfig): number {
  const { y, m, d } = kstYmd(now);
  const nextMidnight = Date.UTC(y, m - 1, d + 1) - KST_OFFSET_MS;
  return Math.min(...[nextMidnight, parse(cfg.startAt), parse(cfg.deadline), parse(cfg.hideAfter)].filter((t) => t > now));
}

/** 마감 시각 표시: { date: '12.27 (일)', time: '23:59' } */
export function formatDeadline(iso: string): { date: string; time: string } {
  const p = parts(labelFormat, parse(iso));
  return { date: `${p.month}.${p.day} (${p.weekday})`, time: `${p.hour}:${p.minute}` };
}

/** 카드 한 장에 찍히는 글자 */
export function pageLabel(state: DdayState): string {
  if (state.kind === 'countdown') return `D-${state.days}`;
  if (state.kind === 'today') return 'D-DAY';
  return '모집 마감';
}

/** 스크린리더용 상태 문장 */
export function srSentence(state: DdayState): string {
  if (state.kind === 'countdown') return `지원 마감까지 ${state.days}일 남았습니다`;
  if (state.kind === 'today') return '오늘 지원이 마감됩니다';
  return '지원이 마감되었습니다';
}

/** 처음 보일 때 넘길 장들(마지막이 현재 값). 모집 마감은 넘기지 않는다. */
export function introPages(state: DdayState): string[] {
  if (state.kind === 'countdown') return [3, 2, 1, 0].map((k) => `D-${state.days + k}`);
  if (state.kind === 'today') return ['D-3', 'D-2', 'D-1', 'D-DAY'];
  return [pageLabel(state)];
}
