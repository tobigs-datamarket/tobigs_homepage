import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { curriculumStations, type CurriculumStation, type CurriculumTrack } from '@/mocks/curriculum';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type Branch = 'data' | 'ai';
type Pt = [number, number];
type MapNode = { p: Pt; id?: string };
type Layout = ReturnType<typeof layout>;

const COLOR: Record<CurriculumTrack, string> = { common: '#E4E4E7', data: '#7AA2FF', ai: '#F08A5D' };
const LABEL: Record<CurriculumTrack, string> = { common: '공통', data: 'DATA', ai: 'AI' };
const GOLD = '#FDD946';
const LINE_EASE = 'cubic-bezier(.65,0,.35,1)';
const POP_EASE = 'cubic-bezier(.34,1.56,.64,1)';
const MAIN_MS = 700, FLASH_MS = 300, BRANCH_MS = 900, TRAVEL_MS = 1600, DWELL_MS = 120;
const HIDDEN = 1.02; // pathLength=1 기준, round cap까지 숨기는 dashoffset
const BTN = 44; // 역 터치 영역
const R = 16; // 모서리 반경 — 이 지도의 꺾임은 전부 45°
const TAN = R * Math.tan(Math.PI / 8);
const PERIOD = ['1교시', '2교시'];
const FADE = 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)';
const POP = [{ transform: 'scale(.4)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }];
const RISE = [{ transform: 'translateY(8px)', opacity: 0 }, { transform: 'none', opacity: 1 }];
const BLINK = [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }];

const sid = (s: { track: string; week: number }) => `${s.track}-${s.week}`;
const byId = new Map(curriculumStations.map((s) => [sid(s), s]));
const isTransfer = (id: string) => id === 'common-4' || id === 'common-10';
const ariaName = (s: CurriculumStation) => `${s.week}주차 ${LABEL[s.track]} ${s.title}`;
const pad = (w: number) => String(w).padStart(2, '0');
const blink = (el: Element | null | undefined, delay: number, duration = FLASH_MS) =>
  el ? [el.animate(BLINK, { duration, delay })] : [];

// ── geometry ────────────────────────────────────────────────
const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const pts = (nodes: MapNode[]) => nodes.map((n) => n.p);
const cumulative = (p: Pt[]) => p.reduce<number[]>((c, q, i) => [...c, i ? c[i - 1] + dist(p[i - 1], q) : 0], []);
const toward = (p: Pt, q: Pt, t: number): Pt => {
  const l = dist(p, q);
  return [p[0] + ((q[0] - p[0]) * t) / l, p[1] + ((q[1] - p[1]) * t) / l];
};
const fmt = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

function pathD(p: Pt[]) {
  let d = 'M' + fmt(p[0]);
  for (let i = 1; i < p.length - 1; i++) {
    const [a, c, b] = [p[i - 1], p[i], p[i + 1]];
    if (Math.abs((c[0] - a[0]) * (b[1] - c[1]) - (c[1] - a[1]) * (b[0] - c[0])) < 1e-6) continue; // 직선 위의 역
    d += `L${fmt(toward(c, a, TAN))}Q${fmt(c)} ${fmt(toward(c, b, TAN))}`;
  }
  return d + 'L' + fmt(p[p.length - 1]);
}

function pointAt(p: Pt[], cum: number[], s: number): Pt {
  let i = 1;
  while (i < p.length - 1 && cum[i] < s) i++;
  const k = Math.min(1, Math.max(0, (s - cum[i - 1]) / (cum[i] - cum[i - 1])));
  return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * k, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * k];
}

// LINE_EASE가 진행률 p에 닿는 시간 비율 (선 머리가 역을 지나는 순간)
const bez = (s: number, a: number, b: number) => 3 * (1 - s) * (1 - s) * s * a + 3 * (1 - s) * s * s * b + s * s * s;
function easeTime(p: number) {
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) {
    const m = (lo + hi) / 2;
    if (bez(m, 0, 1) < p) lo = m;
    else hi = m;
  }
  return bez(lo, 0.65, 0.35);
}

// u = 진행 방향, v = 가로지르는 방향(DATA 음수). 가로: (u,v)→(x,y), 세로: (v,u)
function layout(W: number, vertical: boolean) {
  const step = vertical ? 76 : W / 10;
  const d = vertical ? 48 : Math.min(64, step / 2);
  const f = vertical ? 14 : Math.min(44, step * 0.36); // 분기/합류 전 직선 구간
  const mid = vertical ? W / 2 : d + 74;
  const u = (w: number) => (vertical ? 28 : step / 2) + (w - 1) * step;
  const node = (uu: number, v: number, id?: string): MapNode => ({ p: vertical ? [mid + v, uu] : [uu, mid + v], id });
  const main = [1, 2, 3, 4].map((w) => node(u(w), 0, `common-${w}`)).concat(node(u(4) + f, 0));
  const route = (b: Branch, v: number) => [
    ...main,
    node(u(4) + f + d, v),
    ...[5, 6, 7, 8, 9].map((w) => node(u(w), v, `${b}-${w}`)),
    node(u(10) - f - d, v),
    node(u(10) - f, 0),
    node(u(10), 0, 'common-10'),
  ];
  const routes = { data: route('data', -d), ai: route('ai', d) };
  const pos: Record<string, Pt> = {};
  for (const n of [...routes.data, ...routes.ai]) if (n.id) pos[n.id] = n.p;
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(u);
  return { W, H: vertical ? u(10) + 32 : mid + d + 60, vertical, step, mid, routes, pos, weeks };
}

function entrySchedule(L: Layout) {
  const at: Record<string, number> = {};
  const main = L.routes.data.slice(0, 5);
  const mc = cumulative(pts(main));
  main.forEach((n, i) => n.id && (at[n.id] = MAIN_MS * easeTime(mc[i] / mc[mc.length - 1])));
  const t4 = at['common-4'], tb = t4 + FLASH_MS;
  let tA = 0, tJ = 0;
  for (const b of ['data', 'ai'] as const) {
    const nodes = L.routes[b].slice(3), c = cumulative(pts(nodes));
    const time = (i: number) => tb + BRANCH_MS * easeTime(c[i] / c[c.length - 1]);
    nodes.forEach((n, i) => n.id && n.id !== 'common-4' && (at[n.id] = time(i)));
    tA = time(2);
    tJ = time(nodes.length - 2);
  }
  return { at, t4, tb, tA, tJ, tEnd: tb + BRANCH_MS };
}

// 열차: 역 사이 이동 합계 TRAVEL_MS + 중간역마다 DWELL_MS 정차
function trainPlan(nodes: MapNode[]) {
  const p = pts(nodes), cum = cumulative(p), len = cum[cum.length - 1];
  const stops = nodes.flatMap((n, i) => (n.id ? [{ id: n.id, s: cum[i], t: 0 }] : []));
  let total = 0;
  stops.forEach((st, k) => {
    if (!k) return;
    total += (TRAVEL_MS * (st.s - stops[k - 1].s)) / len;
    st.t = total;
    if (k < stops.length - 1) total += DWELL_MS;
  });
  const sAt = (t: number) => {
    for (let k = 1; k < stops.length; k++) {
      const a = stops[k - 1], b = stops[k], go = k === 1 ? 0 : a.t + DWELL_MS;
      if (t < go) return a.s;
      if (t < b.t) {
        const q = (t - go) / (b.t - go);
        return a.s + (b.s - a.s) * q * q * (3 - 2 * q);
      }
    }
    return len;
  };
  const n = Math.ceil(total / 16);
  const frames = Array.from({ length: n + 1 }, (_, i) => {
    const [x, y] = pointAt(p, cum, sAt((i / n) * total));
    return { transform: `translate(${x}px,${y}px)` };
  });
  return { frames, stops, total };
}

function Chip({ track }: { track: CurriculumTrack }) {
  const c = COLOR[track];
  return (
    <span className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider" style={{ color: c, borderColor: c + '59' }}>
      {LABEL[track]}
    </span>
  );
}

// ── component ───────────────────────────────────────────────
export default function CurriculumMap({ active }: { active: Branch }) {
  const reduced = usePrefersReducedMotion();
  const [box, setBox] = useState<{ W: number; vertical: boolean } | null>(null);
  const [phase, setPhase] = useState<'pre' | 'entering' | 'done'>(reduced ? 'done' : 'pre');
  const [visible, setVisible] = useState(false);
  const [sel, setSel] = useState('common-1');
  const [focusId, setFocusId] = useState('common-1');
  const [tip, setTip] = useState({ id: 'common-1', on: false });

  const wrap = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const glint = useRef<SVGPathElement>(null);
  const train = useRef<SVGGElement>(null);
  const paths = useRef<Record<string, SVGPathElement | null>>({});
  const dots = useRef<Record<string, HTMLElement | null>>({});
  const flashes = useRef<Record<string, HTMLElement | null>>({});
  const labels = useRef<Record<string, HTMLElement | null>>({});
  const btns = useRef<Record<string, HTMLButtonElement | null>>({});
  const trainAnims = useRef<Animation[]>([]);
  const pendingTrain = useRef<Branch | null>(null);

  const L = useMemo(() => (box && box.W > 0 ? layout(box.W, box.vertical) : null), [box]);

  useLayoutEffect(() => {
    const el = wrap.current!;
    const mq = matchMedia('(max-width: 767px)');
    const measure = () =>
      setBox((b) => (b && b.W === el.clientWidth && b.vertical === mq.matches ? b : { W: el.clientWidth, vertical: mq.matches }));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '0px 0px -30% 0px' });
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (visible && L && phase === 'pre') setPhase('entering');
  }, [visible, L, phase]);

  // 1. 진입: 본선 → 분기역 반짝 → DATA·AI 동시 → 합류역 반짝
  useLayoutEffect(() => {
    if (phase !== 'entering' || !L) return;
    const E = entrySchedule(L);
    const list: Animation[] = [];
    const run = (el: Element | null | undefined, kf: Parameters<Element["animate"]>[0], o: { duration: number; delay?: number; easing?: string }) =>
      el && list.push(el.animate(kf, { fill: 'backwards', ...o }));
    const draw = [{ strokeDashoffset: HIDDEN }, { strokeDashoffset: 0 }];
    run(paths.current.main, draw, { duration: MAIN_MS, easing: LINE_EASE });
    run(paths.current.data, draw, { duration: BRANCH_MS, delay: E.tb, easing: LINE_EASE });
    run(paths.current.ai, draw, { duration: BRANCH_MS, delay: E.tb, easing: LINE_EASE });
    run(paths.current.tail, draw, { duration: E.tEnd - E.tJ, delay: E.tJ });
    for (const [id, t] of Object.entries(E.at)) {
      run(dots.current[id], POP, { duration: 420, delay: t, easing: POP_EASE });
      run(labels.current[id], RISE, { duration: 320, delay: t + 90, easing: 'ease-out' });
    }
    run(labels.current['line-data'], RISE, { duration: 320, delay: E.tA });
    run(labels.current['line-ai'], RISE, { duration: 320, delay: E.tA });
    list.push(...blink(flashes.current['common-4'], E.t4), ...blink(flashes.current['common-10'], E.tEnd));
    const timer = setTimeout(() => setPhase('done'), E.tEnd + 420);
    return () => {
      clearTimeout(timer);
      list.forEach((a) => a.cancel());
    };
  }, [phase, L]);

  // 다른 노선 역을 보고 있다가 탭을 바꾸면 같은 주차로 옮긴다
  useEffect(() => {
    setSel((s) => {
      const st = byId.get(s)!;
      return st.track === 'common' || st.track === active ? s : `${active}-${st.week}`;
    });
  }, [active]);

  // 2. 탭 전환(또는 진입 완료) → 디밍 300ms 후 열차 1회. 지도가 화면 밖이면 보일 때까지 미룬다
  useEffect(() => {
    if (phase === 'done') pendingTrain.current = active;
  }, [active, phase]);

  useEffect(() => {
    if (reduced || phase !== 'done' || !visible || !L || !pendingTrain.current) return;
    const timer = setTimeout(() => {
      const b = pendingTrain.current, g = train.current;
      pendingTrain.current = null;
      if (!b || !g) return;
      const plan = trainPlan(L.routes[b]);
      const list = trainAnims.current;
      list.splice(0).forEach((a) => a.cancel());
      list.push(
        g.animate(plan.frames, { duration: plan.total }),
        g.animate([{ opacity: 0 }, { opacity: 1, offset: 0.04 }, { opacity: 1, offset: 0.95 }, { opacity: 0 }], { duration: plan.total }),
        ...plan.stops.flatMap((st) => blink(flashes.current[st.id], Math.max(0, st.t - 40), 360)),
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [active, phase, visible, L, reduced]);

  useEffect(() => {
    const list = trainAnims.current;
    return () => list.forEach((a) => a.cancel());
  }, []);

  // 3. 대기: 선택 노선 위 빛줄기, 화면 밖이면 정지
  useEffect(() => {
    const el = glint.current;
    if (reduced || phase !== 'done' || !visible || !el) return;
    const a = el.animate(
      [{ strokeDashoffset: 0.07 }, { strokeDashoffset: -HIDDEN, offset: 0.45 }, { strokeDashoffset: -HIDDEN }],
      { duration: 6000, delay: 2600, iterations: Infinity },
    );
    return () => a.cancel();
  }, [phase, reduced, visible, L]);

  useEffect(() => {
    if (!reduced) panel.current?.animate(RISE, { duration: 250, easing: 'ease-out' });
  }, [sel, reduced]);

  const select = (id: string) => {
    setSel(id);
    setFocusId(id);
    if (L?.vertical) panel.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  };
  const hideTip = () => setTip((t) => ({ ...t, on: false }));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!L) return;
    const cur = byId.get(focusId)!;
    const [back, fwd] = L.vertical ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    let next: string | undefined;
    if (e.key === back || e.key === fwd) {
      const w = cur.week + (e.key === fwd ? 1 : -1);
      const line = cur.track === 'common' ? active : cur.track;
      next = [`${line}-${w}`, `common-${w}`].find((k) => byId.has(k));
    } else if (e.key.startsWith('Arrow')) {
      if (cur.track !== 'common') next = `${e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? 'data' : 'ai'}-${cur.week}`;
    } else return;
    e.preventDefault();
    if (next) {
      setFocusId(next);
      btns.current[next]?.focus();
    }
  };

  const pre = phase === 'pre';
  const dimmed = (t: CurriculumTrack) => phase === 'done' && t !== 'common' && t !== active;
  const lineStyle = (t: CurriculumTrack): CSSProperties => ({
    strokeDasharray: '1 2',
    strokeDashoffset: pre ? HIDDEN : 0,
    opacity: dimmed(t) ? 0.25 : 1,
  });
  const fade = 'transition-opacity duration-300 motion-reduce:transition-none';
  const s = byId.get(sel)!;
  const tipSt = byId.get(tip.id)!;

  return (
    <div>
      <div ref={wrap} role="group" aria-label="주차별 커리큘럼 노선도" onKeyDown={onKeyDown} className="relative" style={{ height: L?.H }}>
        {L && (
          <>
            <div aria-hidden className="absolute inset-0" style={{ maskImage: FADE, WebkitMaskImage: FADE }}>
              {L.weeks.map((u) => (
                <span key={u} className="absolute bg-[#1f1f1f]" style={L.vertical ? { left: 0, right: 0, top: u, height: 1 } : { top: 0, bottom: 0, left: u, width: 1 }} />
              ))}
            </div>

            {L.weeks.map((u, i) => {
              const w = i + 1;
              const style: CSSProperties = !L.vertical
                ? { left: u - 20, top: 0, width: 40, textAlign: 'center' }
                : w >= 5 && w <= 9
                  ? { left: L.mid - 20, top: u - 8, width: 40, textAlign: 'center' }
                  : { right: L.W - L.mid + 20, top: u - 8 };
              return (
                <span key={w} aria-hidden className="absolute font-mono text-[11px] leading-4 text-[#52525b]" style={style}>
                  W{pad(w)}
                </span>
              );
            })}

            <svg aria-hidden width={L.W} height={L.H} className="absolute inset-0 overflow-visible" fill="none" strokeLinecap="round" strokeWidth={4}>
              {(['data', 'ai'] as const).map((b) => (
                <path key={b} ref={(el) => { paths.current[b] = el; }} d={pathD(pts(L.routes[b].slice(3)))} stroke={COLOR[b]} pathLength={1} className={fade} style={lineStyle(b)} />
              ))}
              <path ref={(el) => { paths.current.main = el; }} d={pathD(pts(L.routes.data.slice(0, 5)))} stroke={COLOR.common} pathLength={1} style={lineStyle('common')} />
              <path ref={(el) => { paths.current.tail = el; }} d={pathD(pts(L.routes.data.slice(-2)))} stroke={COLOR.common} pathLength={1} style={lineStyle('common')} />
              <path ref={glint} d={pathD(pts(L.routes[active]))} stroke="#fff" strokeOpacity={0.35} strokeWidth={2} pathLength={1} style={{ strokeDasharray: '0.05 2', strokeDashoffset: 0.07 }} />
              <g ref={train} style={{ opacity: 0 }}>
                <circle r={7} fill={GOLD} fillOpacity={0.3} />
                <circle r={3} fill={GOLD} />
              </g>
            </svg>

            {(['data', 'ai'] as const).map((b) => {
              // 가로: 꺾임 직전 노선 높이에, 세로: 대각선 바깥쪽에 — 분기역과 겹치지 않게
              const [p, q] = [L.routes[b][4].p, L.routes[b][5].p];
              const [mx, my] = L.vertical ? [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2] : q;
              const pos: CSSProperties = L.vertical && b === 'ai' ? { left: mx + 12 } : { right: L.W - mx + 12 };
              return (
                <span key={b} ref={(el) => { labels.current[`line-${b}`] = el; }} aria-hidden className={`absolute font-mono text-[11px] font-semibold leading-4 tracking-widest ${fade}`} style={{ ...pos, top: my - 8, color: COLOR[b], opacity: pre ? 0 : dimmed(b) ? 0.45 : 1 }}>
                  {LABEL[b]}
                </span>
              );
            })}

            {curriculumStations.map((st) => {
              const id = sid(st), [x, y] = L.pos[id], big = isTransfer(id);
              const r = big ? 10 : 6, bw = big ? 3 : 2.5, gap = r + 9, ring = 2 * r + 14;
              const on = sel === id, dim = dimmed(st.track), before = st.track === 'data'; // DATA 라벨은 위/왼쪽
              const labelPos: CSSProperties = L.vertical
                ? {
                    ...(before ? { right: BTN / 2 + gap, justifyContent: 'flex-end', textAlign: 'right' } : { left: BTN / 2 + gap }),
                    top: 0,
                    height: BTN,
                    width: before ? x - gap : L.W - x - gap,
                  }
                : {
                    ...(before ? { bottom: BTN / 2 + gap } : { top: BTN / 2 + gap }),
                    left: BTN / 2 - (L.step - 8) / 2,
                    width: L.step - 8,
                    justifyContent: 'center',
                    textAlign: 'center',
                  };
              return (
                <button
                  key={id}
                  ref={(el) => { btns.current[id] = el; }}
                  type="button"
                  tabIndex={focusId === id ? 0 : -1}
                  aria-label={ariaName(st)}
                  aria-current={on || undefined}
                  onClick={() => select(id)}
                  onFocus={() => { setFocusId(id); setTip({ id, on: true }); }}
                  onBlur={hideTip}
                  onMouseEnter={() => setTip({ id, on: true })}
                  onMouseLeave={hideTip}
                  className="group absolute cursor-pointer outline-none"
                  style={{ left: x - BTN / 2, top: y - BTN / 2, width: BTN, height: BTN }}
                >
                  <span aria-hidden className="absolute rounded-full border-[1.5px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" style={{ borderColor: GOLD, width: ring, height: ring, left: BTN / 2 - ring / 2, top: BTN / 2 - ring / 2, opacity: on ? 1 : undefined }} />
                  <span
                    ref={(el) => { dots.current[id] = el; }}
                    aria-hidden
                    className="absolute rounded-full bg-dark-900 transition duration-300 group-hover:scale-125 group-focus-visible:scale-125 motion-reduce:transition-none"
                    style={{ left: BTN / 2 - r, top: BTN / 2 - r, width: 2 * r, height: 2 * r, border: `${bw}px solid ${big ? '#fff' : COLOR[st.track]}`, opacity: pre ? 0 : dim ? 0.25 : 1 }}
                  >
                    <span ref={(el) => { flashes.current[id] = el; }} className="absolute rounded-full opacity-0" style={{ inset: -bw, border: `${bw}px solid ${GOLD}` }} />
                    {st.guest && <span className="absolute h-1 w-1 rounded-full" style={{ background: GOLD, left: r - bw - 2, top: 2 * r - bw + 3 }} />}
                  </span>
                  <span ref={(el) => { labels.current[id] = el; }} aria-hidden className={`absolute flex items-center break-keep text-[13px] font-medium leading-tight ${fade}`} style={{ ...labelPos, color: on ? '#fff' : '#d4d4d8', opacity: pre ? 0 : dim ? 0.45 : 1 }}>
                    {st.shortTitle ?? st.title}
                  </span>
                </button>
              );
            })}

            {!L.vertical && (() => {
              const [tx, ty] = L.pos[tip.id], above = tipSt.track !== 'data', off = isTransfer(tip.id) ? 24 : 20;
              const shift = tip.on ? 0 : above ? 6 : -6;
              return (
                <div
                  aria-hidden
                  className="pointer-events-none absolute z-20 w-60 rounded-xl border border-dark-600/60 bg-dark-800/95 p-3 shadow-2xl transition duration-[180ms] motion-reduce:transition-none"
                  style={{ left: Math.min(Math.max(tx - 120, 0), L.W - 240), top: above ? ty - off : ty + off, opacity: tip.on ? 1 : 0, transform: above ? `translateY(calc(-100% + ${shift}px))` : `translateY(${shift}px)` }}
                >
                  <div className="flex items-center gap-2">
                    <Chip track={tipSt.track} />
                    <span className="font-mono text-[11px] text-gray-500">W{pad(tipSt.week)}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-white">{tipSt.title}</p>
                  {tipSt.speakers.map((sp, i) => (
                    <p key={i} className="mt-1 text-xs text-gray-400">
                      <span className="text-gray-500">{PERIOD[i]}</span> {sp.title}
                    </p>
                  ))}
                </div>
              );
            })()}
          </>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-5xl" aria-live="polite">
        <div ref={panel} className="rounded-2xl border border-dark-600/40 bg-dark-800 p-5 md:p-7">
          <div className="flex items-center gap-4">
            <span className="text-[40px] font-bold leading-none tabular-nums" style={{ color: COLOR[s.track] }}>{pad(s.week)}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Chip track={s.track} />
                <span className="font-mono text-[11px] text-gray-500">{s.week}주차</span>
              </div>
              <h3 className="mt-1 text-lg font-semibold text-white md:text-xl">{s.title}</h3>
            </div>
          </div>
          {s.speakers.length > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.speakers.map((sp, i) => (
                <div key={i} className="rounded-xl border border-dark-600/30 bg-dark-900/60 p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {PERIOD[i]}
                    {s.guest === i + 1 && (
                      <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ color: GOLD, borderColor: GOLD + '59', background: GOLD + '14' }}>
                        초청 강연
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-medium text-white">{sp.title}</p>
                  {sp.topics.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {sp.topics.map((t) => (
                        <li key={t} className="rounded-full border border-dark-600/60 bg-dark-700 px-2.5 py-1 text-xs text-gray-300">{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ol className="sr-only">
        {curriculumStations.map((st) => (
          <li key={sid(st)}>
            {ariaName(st)}
            {st.speakers.map((sp, i) => (
              <p key={i}>
                {PERIOD[i]}: {sp.title}
                {st.guest === i + 1 ? ' (초청 강연)' : ''}
                {sp.topics.length ? ` — ${sp.topics.join(', ')}` : ''}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
