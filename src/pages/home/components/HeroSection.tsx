import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById('stats-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/bfdcba44-9b8f-4357-bfe4-5453e8822a3a_unnamed.jpg?v=7448e40cb8b272807e00c35bf6865d92"
          alt="투빅스 활동 사진"
          className="w-full h-full object-cover object-top"
        />
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-navy-950/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 bg-navy-800/60 border border-navy-600/40 rounded-full text-xs text-navy-300 mb-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-pulse inline-block" />
            Since 2014 · AI·데이터분석 대표 연합 동아리 투빅스
          </div>

          {/* Main Title */}
          <h1
            className={`font-display font-bold text-white leading-tight mb-4 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="block text-4xl md:text-6xl lg:text-7xl">큰 사람이 될</span>
            <span className="block text-4xl md:text-6xl lg:text-7xl gradient-text mt-1">준비가 되셨나요?</span>
          </h1>

          {/* Sub Copy */}
          <p
            className={`text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            2014년부터 이어온 AI·데이터분석 대표 연합 동아리 투빅스.<br />
            함께 배우고, 만들고, 성장합니다.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Link
              to="/recruiting"
              className="px-8 py-3.5 bg-navy-600 hover:bg-navy-500 text-white font-semibold rounded-full text-sm transition-all duration-300 text-center whitespace-nowrap"
            >
              지원하기
            </Link>
            <button
              onClick={scrollToNext}
              className="px-8 py-3.5 border border-white/30 hover:border-white/60 text-white font-medium rounded-full text-sm transition-all duration-300 hover:bg-white/5 whitespace-nowrap cursor-pointer"
            >
              투빅스 알아보기
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <i className="ri-arrow-down-line text-gray-400 text-lg" />
      </div>
    </section>
  );
}