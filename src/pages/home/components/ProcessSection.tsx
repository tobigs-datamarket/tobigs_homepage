import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { step: 'STEP 1', title: '서류 지원(~6/23)', icon: 'ri-file-text-line', desc: '구글폼을 통해 지원서 제출' },
  { step: 'STEP 2', title: '서류 결과 안내(6/26)', icon: 'ri-mail-check-line', desc: '서류 심사 결과 문자 발송' },
  { step: 'STEP 3', title: '면접 심사(6/28~30)', icon: 'ri-user-voice-line', desc: '다대다 면접 (약 30분 소요)' },
  { step: 'STEP 4', title: '최종 발표(7/1)', icon: 'ri-trophy-line', desc: '최종 합격자 발표' },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Process</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
            지원 절차
          </h2>
          <p className="text-gray-400 mt-3 text-sm">
            4단계를 통해 투빅스의 일원이 될 수 있습니다
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (desktop) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-px bg-navy-800/50" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div
                key={s.step}
                className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Circle */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  idx === 0 ? 'bg-navy-600' : 'bg-dark-700 border border-navy-700/40'
                }`}>
                  <i className={`${s.icon} text-2xl ${idx === 0 ? 'text-white' : 'text-navy-400'}`} />
                </div>
                <span className="text-navy-400 text-xs font-semibold tracking-wider mb-1">{s.step}</span>
                <h3 className="text-white font-semibold text-base mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row justify-center gap-4 mt-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Link
            to="/recruiting"
            className="px-8 py-3.5 bg-navy-600 hover:bg-navy-500 text-white font-semibold rounded-full text-sm transition-colors text-center whitespace-nowrap"
          >
            지금 지원하기
          </Link>
          <Link
            to="/faq"
            className="px-8 py-3.5 border border-navy-600/50 hover:border-navy-400 text-navy-300 hover:text-white font-medium rounded-full text-sm transition-colors text-center whitespace-nowrap"
          >
            자주 묻는 질문
          </Link>
        </div>
      </div>
    </section>
  );
}