import { useEffect, useRef, useState } from 'react';

const programs = [
  {
    emoji: '📚',
    title: '정규 세션',
    description: '공통 기초(AI·데이터 분석) 학습 후 트랙별 심화 커리큘럼 진행',
    image: 'https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/c77bb50f-13d8-44e2-8331-8b582827c684_unnamed.jpg?v=a58664a0f5bae7b949c9efead83c7389',
    bgColor: 'from-navy-900 to-navy-800',
  },
  {
    emoji: '🔬',
    title: '심화세션',
    description: '관심 도메인을 바탕으로 심화 기술을 적용하며, 공모전 수상, 논문 리뷰 등 다양한 결과물 생성',
    image: 'https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/0a376fe4-98b3-4852-af65-8852c0677e80_3.png?v=cec2f191b33527c6c49364bced687b05',
    bgColor: 'from-dark-800 to-dark-700',
  },
  {
    emoji: '🤝',
    title: '선배와의 만남',
    description: '현업 선배를 초청해 학습 가이드 및 진로 탐색 기회 제공',
    image: 'https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/fc7d5245-1783-4a01-9f32-f4dfbafa680b_unnamed.jpeg?v=8e9b80fde9380e97a8678bf96d837ec4',
    bgColor: 'from-navy-900 to-navy-800',
  },
  {
    emoji: '⚡',
    title: '인하우스 해커톤',
    description: '투빅스 자체 해커톤으로 팀 단위 실전 문제 해결 경험',
    image: 'https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/9236f019-d24c-456e-b110-b1ac21a207a3_unnamed.jpg?v=92fd351ab6c1652192a7929ecbe76684',
    bgColor: 'from-dark-800 to-dark-700',
  },
  {
    emoji: '🏠',
    title: '홈커밍데이',
    description: '졸업한 선배들과 네트워킹하며 유대를 쌓고 성장 인사이트를 나누는 자리',
    image: 'https://static.readdy.ai/image/3d684be57ac9d3c5f5a6f09d6e1e16dd/56591f77e33955b1c8d48465aa60e660.jpeg',
    bgColor: 'from-dark-800 to-dark-700',
  },
  {
    emoji: '🎤',
    title: '컨퍼런스',
    description: '매 학기 팀별로 관심 주제를 선정해 데이터·AI 프로젝트 결과를 발표',
    image: 'https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/5096f9b5-1eac-4f33-ae55-894970faeed5_unnamed.jpg?v=c27fad55251d57effa86d1a832438af7',
    bgColor: 'from-navy-900 to-navy-800',
  },
  {
    emoji: '🔥',
    title: 'MIX-UP DATATHON',
    description: '다양한 데이터·AI 동아리와 공동 기획하는 1박 2일 연합 해커톤',
    image: 'https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/a8068a74-f226-4b22-bbf6-e7ba4b8d41cc_unnamed.jpeg?v=76d6c7fe54dbda56997ccf7d9da0f8d7',
    bgColor: 'from-dark-800 to-dark-700',
  },
  {
    emoji: '🌐',
    title: '기타 활동',
    description: '주한미국대사관 TechCamp, AI 엑스포 등 외부 행사에 참가하고, 소모임을 통해 동아리원들과 다양한 활동을 진행',
    image: 'https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/65b65da9-98c6-4373-96dd-fbda9521bf3b_unnamed.jpg?v=3be1df69f755e9c550dbfcd7d46b88d1',
    bgColor: 'from-navy-900 to-navy-800',
  },
];

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
          {programs.map((prog, idx) => (
            <div
              key={prog.title}
              className={`bg-dark-800 border border-dark-600/40 rounded-2xl overflow-hidden card-hover transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Image or Emoji Placeholder */}
              {prog.image ? (
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                </div>
              ) : (
                <div className={`w-full h-44 bg-gradient-to-br ${prog.bgColor} flex items-center justify-center`}>
                  <span className="text-5xl">{prog.emoji}</span>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {prog.image && <span className="text-xl">{prog.emoji}</span>}
                  <h3 className="text-white font-semibold text-base">{prog.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{prog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}