import { useEffect, useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RECRUITING_DDAY } from '@/config/recruiting';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import {
  formatDeadline,
  getDdayState,
  introPages,
  nextBoundary,
  pageLabel,
  srSentence,
  type DdayState,
} from '@/utils/dday';

const deadline = formatDeadline(RECRUITING_DDAY.deadline);

// 지금 시각. 다음 경계(KST 자정·시작·마감·숨김) 하나에만 타이머를 걸고, 탭 복귀·focus 때 다시 잰다.
function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const timer = setTimeout(refresh, Math.max(0, nextBoundary(now, RECRUITING_DDAY) - now));
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, [now]);
  return now;
}

// 일력 넘김 상태: shown = 아래에 놓인 현재 장, leaf = 윗변 축으로 넘어가는 이전 장
type Leaf = { label: string; key: number; delay: number; done: boolean };
type Flip = { started: boolean; shown: string; queue: string[]; leaf: Leaf | null; seq: number; delay: number };
type FlipAction =
  | { type: 'start'; pages: string[]; animate: boolean }
  | { type: 'retarget'; label: string; animate: boolean }
  | { type: 'leafEnd' };

const FIRST_DELAY_MS = 900; // 카드 등장 전환(700ms)이 끝난 뒤 넘기기 시작
const NEXT_DELAY_MS = 80;

function advance(s: Flip): Flip {
  if (!s.queue.length) return s;
  const [next, ...rest] = s.queue;
  return {
    ...s,
    shown: next,
    queue: rest,
    seq: s.seq + 1,
    delay: NEXT_DELAY_MS,
    leaf: { label: s.shown, key: s.seq + 1, delay: s.delay, done: false },
  };
}

function flipReducer(s: Flip, a: FlipAction): Flip {
  if (a.type === 'start') {
    if (!a.animate || a.pages.length < 2) return { ...s, started: true, shown: a.pages[a.pages.length - 1], queue: [], leaf: null };
    return advance({ ...s, started: true, shown: a.pages[0], queue: a.pages.slice(1), delay: FIRST_DELAY_MS });
  }
  if (a.type === 'retarget') {
    const last = s.queue.length ? s.queue[s.queue.length - 1] : s.shown;
    if (a.label === last) return s;
    if (!a.animate) return { ...s, shown: a.label, queue: [], leaf: null };
    const queued = { ...s, queue: [...s.queue, a.label], delay: 0 };
    return s.leaf && !s.leaf.done ? queued : advance(queued);
  }
  // leafEnd: 끝난 장을 최종 자세로 고정(Safari 깜빡임 방지)한 뒤 다음 장이 있으면 이어서 넘긴다
  return advance({ ...s, leaf: s.leaf && { ...s.leaf, done: true } });
}

function CalendarCard({ state, active }: { state: Exclude<DdayState, { kind: 'hidden' }>; active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const target = pageLabel(state);
  const days = state.kind === 'countdown' ? state.days : 0;
  const [flip, dispatch] = useReducer(flipReducer, {
    started: false, shown: target, queue: [], leaf: null, seq: 0, delay: 0,
  });

  useEffect(() => {
    if (!active || flip.started) return;
    const s: DdayState = state.kind === 'countdown' ? { kind: 'countdown', days } : { kind: state.kind };
    dispatch({ type: 'start', pages: introPages(s), animate: !reduced && state.kind !== 'closed' });
  }, [active, flip.started, state.kind, days, reduced]);

  useEffect(() => {
    if (flip.started) dispatch({ type: 'retarget', label: target, animate: !reduced && state.kind !== 'closed' });
  }, [target, flip.started, state.kind, reduced]);

  // 넘기기 전(화면 밖)에는 첫 장을 미리 깔아 둔다. 모집 마감·reduced motion은 바로 최종 값.
  const preview = state.kind === 'closed' || reduced ? target : introPages(state)[0];
  const shown = flip.started ? flip.shown : preview;
  const value = state.kind === 'countdown' ? String(state.days) : state.kind === 'today' ? 'DAY' : 'closed';
  const foot = state.kind === 'today' ? `오늘 ${deadline.time} 마감` : `${deadline.date} ${deadline.time} 마감`;

  return (
    <div data-dday-card data-dday-kind={state.kind} data-dday-value={value} className="relative w-[240px] lg:w-[280px] flex-none">
      <p className="sr-only">{srSentence(state)}</p>
      <div data-dday-visual aria-hidden="true" className="relative">
        {/* 아래에 쌓인 장 */}
        <div className="absolute inset-x-5 -bottom-2.5 h-full rounded-[20px] bg-gray-200" />
        <div className="absolute inset-x-2.5 -bottom-[5px] h-full rounded-[20px] bg-gray-100" />
        {/* 링 */}
        <span className="absolute z-20 -top-2.5 left-[28%] w-3 h-7 rounded-full bg-gray-300 shadow-[inset_0_-3px_0_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.35)]" />
        <span className="absolute z-20 -top-2.5 right-[28%] w-3 h-7 rounded-full bg-gray-300 shadow-[inset_0_-3px_0_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.35)]" />
        <div className="relative rounded-[20px] bg-white overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.55),0_6px_16px_rgba(0,0,0,0.35)]">
          <div className="h-12 lg:h-14 bg-navy-600 flex items-end justify-center pb-2.5 lg:pb-3 text-white text-[13px] lg:text-sm font-semibold tracking-wide">
            {RECRUITING_DDAY.label}
          </div>
          <div className="relative h-[120px] lg:h-[140px] border-t-2 border-dashed border-gray-200 [perspective:640px]">
            <Page label={shown} />
            {flip.leaf && (
              <Page
                key={flip.leaf.key}
                label={flip.leaf.label}
                leaf={flip.leaf}
                onEnd={() => dispatch({ type: 'leafEnd' })}
              />
            )}
          </div>
          <div className="h-11 lg:h-12 flex items-center justify-center text-gray-500 text-[13px] font-medium">{foot}</div>
        </div>
      </div>
    </div>
  );
}

function Page({ label, leaf, onEnd }: { label: string; leaf?: Leaf; onEnd?: () => void }) {
  const size = label === pageLabel({ kind: 'closed' }) ? 'text-[34px] lg:text-[40px] tracking-tight' : 'text-[60px] lg:text-[72px] tracking-[-0.04em]';
  const motion = !leaf
    ? ''
    : leaf.done
      ? 'dday-flip dday-flip-done invisible opacity-0 [transform:rotateX(-100deg)]'
      : 'dday-flip dday-flip-run animate-dday-flip';
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-white font-display font-extrabold tabular-nums leading-none text-navy-900 origin-top [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${size} ${motion}`}
      style={leaf && !leaf.done ? { animationDelay: `${leaf.delay}ms` } : undefined}
      onAnimationEnd={leaf && !leaf.done ? onEnd : undefined}
    >
      {label}
    </div>
  );
}

function ApplyLink() {
  const cls = 'inline-flex items-center justify-center w-full max-w-xs sm:w-auto px-11 py-4 bg-navy-600 hover:bg-navy-500 text-white font-semibold rounded-full text-base transition-colors whitespace-nowrap';
  const href = RECRUITING_DDAY.applyHref;
  return /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>지원하기</a>
  ) : (
    <Link to={href} className={cls}>지원하기</Link>
  );
}

export default function DdaySection() {
  const now = useNow();
  const state = getDdayState(now, RECRUITING_DDAY);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const hidden = state.kind === 'hidden';

  useEffect(() => {
    if (hidden || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hidden]);

  if (state.kind === 'hidden') return null;
  const closed = state.kind === 'closed';
  const desc = closed
    ? '지원해 주신 모든 분께 감사드립니다.'
    : state.kind === 'today'
      ? `오늘 ${deadline.time}에 지원이 마감됩니다.`
      : `${deadline.date} ${deadline.time}까지 지원할 수 있습니다.`;
  const appear = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <section data-dday-section className="bg-gradient-to-b from-navy-950 to-dark-950 py-20 md:py-24">
      <div ref={ref} className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        <div className={`pt-2.5 transition-all duration-700 ${appear}`}>
          <CalendarCard state={state} active={visible} />
        </div>
        <div className={`text-center lg:text-left max-w-xl transition-all duration-700 delay-200 ${appear}`}>
          <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Recruiting</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-4 leading-tight">{RECRUITING_DDAY.title}</h2>
          <p data-dday-desc className="text-gray-400 text-base md:text-lg leading-relaxed">{desc}</p>
          {!closed && (
            <div className="mt-8 flex justify-center lg:justify-start">
              <ApplyLink />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
