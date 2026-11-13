import { useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { WORDMARK } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

// 레퍼런스 영상(tobigs_main.mp4, 6초) 재현. 장면 배치와 시각은 index.css의 .hero-* 에 있다.
const LETTERS = [...WORDMARK];
const MID = (LETTERS.length - 1) / 2; // 가운데 글자(I)부터 바깥으로 솟아오른다

// 고정 의사난수: 렌더마다 같은 자리에 별과 반짝이를 놓는다
const rand = (i: number, n: number) => {
  const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const STARS = Array.from({ length: 110 }, (_, i) => ({
  left: `${rand(i, 1) * 100}%`,
  top: `${rand(i, 2) * 57}%`,
  width: rand(i, 3) > 0.7 ? 2 : 1.5,
  height: rand(i, 3) > 0.7 ? 2 : 1.5,
  '--t': `${1.8 + rand(i, 4) * 3.2}s`,
  '--d': `${-rand(i, 5) * 6}s`,
})) as CSSProperties[];
// 십자 빛살로 반짝이는 밝은 별 몇 개: 각자 다른 주기·시점이라 한 번에 하나씩 반짝인다
const GLINTS = Array.from({ length: 10 }, (_, i) => ({
  left: `${6 + rand(i, 8) * 88}%`,
  top: `${5 + rand(i, 9) * 42}%`,
  '--t': `${4.5 + rand(i, 10) * 4}s`,
  '--d': `${-rand(i, 11) * 11}s`,
  '--s': `${14 + rand(i, 12) * 12}px`,
})) as CSSProperties[];
// 혜성이 지나간 테두리 위 반짝이: 각도(°)와 혜성이 그 자리를 지나는 시각
const SPARKS = Array.from({ length: 24 }, (_, i) => {
  const a = -14 + (28 * i) / 23 + (rand(i, 7) - 0.5) * 0.9;
  return { '--a': `${a}deg`, '--h': `${1 + rand(i, 6) * 16}px`, '--d': `${0.36 + ((a + 14.5) / 29) * 0.36}s` } as CSSProperties;
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  // 바로 아래 섹션(D-day 띠 또는 숫자)으로: 고정 id 대신 다음 형제 요소
  const scrollToNext = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (!next) return;
    const navbar = document.querySelector('header')?.offsetHeight ?? 0;
    window.scrollTo({ top: next.getBoundingClientRect().top + window.scrollY - navbar, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section ref={sectionRef} className="hero relative isolate min-h-screen overflow-hidden" style={{ minHeight: 'max(100svh, 600px)' }}>
      {/* 하늘, 별, 새벽빛 (글자 뒤) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-sky" />
        {STARS.map((style, i) => (
          <span key={i} className="hero-star" style={style} />
        ))}
        {GLINTS.map((style, i) => (
          <span key={i} className="hero-glint" style={style} />
        ))}
        <div className="hero-bloom" />
      </div>

      {/* 워드마크: 행성 뒤에서 솟아오른다(행성 레이어가 DOM상 뒤에 있어 위에 그려진다) */}
      <h1 aria-label={`${WORDMARK} 투빅스`} className="hero-word">
        {LETTERS.map((ch, i) => (
          <span key={i} className="hero-spread" style={{ '--d': i - MID } as CSSProperties}>
            {/* 글로우는 ::after(data-ch)라 h1 텍스트에 섞이지 않는다 */}
            <span className="hero-letter" data-ch={ch} style={{ '--d': i - MID, '--o': Math.abs(i - MID) } as CSSProperties}>
              {ch}
            </span>
          </span>
        ))}
      </h1>

      {/* 행성, 테두리, 혜성 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-planet">
          <div className="hero-rim" />
        </div>
        <div className="hero-vignette" />
        <div className="hero-orbit">
          <span className="hero-comet" />
          {SPARKS.map((style, i) => (
            <span key={i} className="hero-spark" style={style} />
          ))}
        </div>
      </div>

      {/* 행성 표면 위: 슬로건·소개·버튼 (높이 700px 이하 화면에서는 조금 위로) */}
      <div className="absolute inset-x-0 top-[70.2%] flex [@media(max-height:700px)]:top-[66%] flex-col items-center px-4 text-center">
        <p className="hero-fade bg-gradient-to-r from-navy-100 to-navy-50 bg-clip-text text-[clamp(1.35rem,2.4vw,2.1rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-transparent [font-family:'Noto_Sans_KR',Inter,sans-serif] [--at:2.8s]">
          큰 사람이 될 준비가 되셨나요?
        </p>
        <p className="hero-fade mt-2.5 break-keep text-[15px] leading-relaxed text-gray-300 md:text-base [--at:3s]">
          2014년부터 이어온 AI·데이터분석 대표 연합 동아리 투빅스.
          <br />
          함께 배우고, 만들고, 성장합니다.
        </p>
        <div className="hero-fade mt-6 flex gap-3 [--at:3.3s]">
          <Link
            to="/recruiting"
            className="whitespace-nowrap rounded-full bg-navy-50 px-[26px] py-3.5 text-sm font-bold text-navy-950 transition-colors hover:bg-white sm:px-[34px] sm:text-[15px]"
          >
            지원하기
          </Link>
          <button
            type="button"
            onClick={scrollToNext}
            className="cursor-pointer whitespace-nowrap rounded-full border border-white/30 px-[26px] py-3.5 text-sm font-bold text-white transition-colors hover:border-white/60 hover:bg-white/5 sm:px-[34px] sm:text-[15px]"
          >
            투빅스 알아보기
          </button>
        </div>
      </div>

    </section>
  );
}
