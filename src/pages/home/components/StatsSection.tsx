import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface StatItem {
  value: number;
  suffix: string;
  unit: string; // screen-reader sentence only: "누적 동아리원 400명 이상"
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 400, suffix: '+', unit: '명', label: '누적 동아리원', description: '매 기수 새로운 멤버들과 함께 성장' },
  { value: 100, suffix: '+', unit: '회', label: '공모전 수상 실적', description: '2015년부터 쌓아온 실전 경쟁력' },
  { value: 300, suffix: '+', unit: '개', label: '누적 프로젝트', description: '데이터·AI 전 분야를 아우르는 결과물' },
];

function StatCard({ item, started, index }: { item: StatItem; started: boolean; index: number }) {
  const count = useCountUp(item.value, started);

  return (
    <div
      className={`relative bg-dark-800 border border-dark-600/50 rounded-2xl p-8 text-center card-hover group transition-all duration-500 motion-reduce:translate-y-0 ${
        started ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Accent top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-navy-500 rounded-full" />

      <div className="mb-3">
        <span className="sr-only">{`${item.label} ${item.value}${item.unit} 이상`}</span>
        {/* width reserved for the final digits, so counting never shifts the layout */}
        <span
          aria-hidden="true"
          className="inline-block text-right tabular-nums font-display font-bold text-5xl md:text-6xl text-white"
          style={{ minWidth: `${String(item.value).length}ch` }}
        >
          {count}
        </span>
        <span aria-hidden="true" className="font-display font-bold text-3xl md:text-4xl text-navy-400">{item.suffix}</span>
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