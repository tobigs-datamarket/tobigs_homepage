import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TracksSection() {
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
    <section className="section-padding bg-dark-900/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Tracks</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
            활동 분야
          </h2>
        </div>

        {/* Two Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Track */}
          <div
            className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src="https://readdy.ai/api/search-image?query=data%20visualization%20dashboard%20charts%20graphs%20statistics%20analysis%20modern%20dark%20blue%20interface%20abstract%20data%20science%20visualization%2C%20clean%20professional%20background&width=700&height=500&seq=track001&orientation=landscape"
                alt="데이터 트랙"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/30" />
            </div>
            <div className="relative z-10 p-8 md:p-10 min-h-[320px] flex flex-col justify-end">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-display font-bold text-3xl text-white mb-3">데이터 트랙</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
                데이터 분석·시각화·통계 모델링을 중심으로 실무형 데이터 역량을 쌓는 트랙
              </p>
              <Link
                to="/curriculum?track=data"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-full transition-all duration-300 w-fit whitespace-nowrap"
              >
                커리큘럼 보기
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          {/* AI Track */}
          <div
            className={`relative overflow-hidden rounded-3xl transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src="https://readdy.ai/api/search-image?query=artificial%20intelligence%20neural%20network%20deep%20learning%20machine%20learning%20abstract%20visualization%20dark%20background%20glowing%20nodes%20connections%20technology%20future%20concept%20modern&width=700&height=500&seq=track002&orientation=landscape"
                alt="AI 트랙"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/60 to-dark-950/30" />
            </div>
            <div className="relative z-10 p-8 md:p-10 min-h-[320px] flex flex-col justify-end">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-display font-bold text-3xl text-white mb-3">AI 트랙</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
                머신러닝 이론부터 딥러닝·생성모델까지 AI 모델 구현 역량을 집중적으로 키우는 트랙
              </p>
              <Link
                to="/curriculum?track=ai"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-navy-600 hover:bg-navy-500 text-white text-sm font-medium rounded-full transition-all duration-300 w-fit whitespace-nowrap"
              >
                커리큘럼 보기
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}