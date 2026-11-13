import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { programs, type Program } from '@/data/programs';

const CARD = 'flex h-full flex-col overflow-hidden rounded-2xl border border-dark-600/40 bg-dark-800';
// Only cards with a real destination look and behave clickable.
const LINK_CARD = `${CARD} group card-hover hover:border-navy-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900`;

function Tag({ icon, children }: { icon: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-navy-700/50 bg-navy-900/40 px-2 py-0.5 text-xs text-navy-200">
      <i className={icon} aria-hidden="true" />
      {children}
    </span>
  );
}

function CardBody({ program }: { program: Program }) {
  return (
    <>
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={program.image}
          alt=""
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl">{program.emoji}</span>
          <h3 className="text-base font-semibold text-white">{program.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-gray-400">{program.summary}</p>
        {(program.cadence || program.output) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {program.cadence && <Tag icon="ri-time-line">{program.cadence}</Tag>}
            {program.output && <Tag icon="ri-medal-line">{program.output}</Tag>}
          </div>
        )}
        {program.href && (
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-navy-300 transition-colors group-hover:text-white">
            {program.linkLabel}
            <i
              aria-hidden="true"
              className={`${program.external ? 'ri-external-link-line' : 'ri-arrow-right-line'} transition-transform group-hover:translate-x-0.5`}
            />
          </span>
        )}
      </div>
    </>
  );
}

export default function ProgramsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Programs</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
            활동 프로그램
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            투빅스에서 경험할 수 있는 다양한 활동들
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((program, idx) => (
            // Outer div: staggered reveal only; the card inside owns hover, so hover is never delayed.
            <div
              key={program.slug}
              className={`transition-all duration-500 motion-reduce:transition-none ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {!program.href ? (
                <div className={CARD}>
                  <CardBody program={program} />
                </div>
              ) : program.external ? (
                <a href={program.href} target="_blank" rel="noopener noreferrer" className={LINK_CARD}>
                  <CardBody program={program} />
                </a>
              ) : (
                <Link to={program.href} className={LINK_CARD}>
                  <CardBody program={program} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}