import { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 400, suffix: '+', label: '누적 동아리원', description: '매 기수 새로운 멤버들과 함께 성장' },
  { value: 90, suffix: '+', label: '공모전 수상 실적', description: '2015년부터 쌓아온 실전 경쟁력' },
  { value: 300, suffix: '+', label: '누적 프로젝트', description: '데이터·AI 전 분야를 아우르는 결과물' },
];

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

function StatCard({ item, started, index }: { item: StatItem; started: boolean; index: number }) {
  const count = useCountUp(item.value, 2000, started);

  return (
    <div
      className={`relative bg-dark-800 border border-dark-600/50 rounded-2xl p-8 text-center card-hover group transition-all duration-500 ${
        started ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Accent top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-navy-500 rounded-full" />

      <div className="mb-3">
        <span className="font-display font-bold text-5xl md:text-6xl text-white">
          {count}
        </span>
        <span className="font-display font-bold text-3xl md:text-4xl text-navy-400">{item.suffix}</span>
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{item.label}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="section-padding bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Numbers</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
            숫자로 보는 투빅스
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <StatCard key={item.label} item={item} started={started} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}