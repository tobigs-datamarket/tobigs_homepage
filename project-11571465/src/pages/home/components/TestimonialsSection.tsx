import { useEffect, useRef, useState, useCallback } from 'react';
import { testimonials } from '@/mocks/testimonials';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, paused]);

  const handleArrow = (fn: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    fn();
    if (!paused) {
      intervalRef.current = setInterval(next, 4000);
    }
  };

  const t = testimonials[current];

  return (
    <section
      className="section-padding bg-dark-800/50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Reviews</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
            선배 후기 갤러리
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Card */}
          <div
            key={t.id}
            className="bg-dark-800 border border-dark-600/40 rounded-2xl p-8 md:p-10"
            style={{ animation: 'fadeIn 0.5s ease-out' }}
          >
            {/* Quote Icon */}
            <div className="text-navy-700/60 text-6xl font-display leading-none mb-4 select-none">&ldquo;</div>

            {/* Review Text */}
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
              {t.text}
            </p>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-navy-800 border border-navy-600/40 flex items-center justify-center">
                  <i className="ri-user-3-line text-navy-400 text-lg" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {t.generation} · {t.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {t.role} @ {t.company}
                  </p>
                </div>
              </div>
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-navy-400 text-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => handleArrow(prev)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-8 w-9 h-9 flex items-center justify-center bg-dark-700 hover:bg-navy-700 border border-dark-600/40 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-lg" />
          </button>
          <button
            onClick={() => handleArrow(next)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-8 w-9 h-9 flex items-center justify-center bg-dark-700 hover:bg-navy-700 border border-dark-600/40 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-lg" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrent(idx); }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === current
                  ? 'w-6 h-2 bg-navy-500'
                  : 'w-2 h-2 bg-dark-600 hover:bg-dark-500'
              }`}
              aria-label={`슬라이드 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}