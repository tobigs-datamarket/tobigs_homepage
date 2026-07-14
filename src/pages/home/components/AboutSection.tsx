import { useEffect, useRef, useState } from 'react';

const aboutItems = [
  {
    number: '01',
    title: '정규 세션',
    content:
      '빠르게 변화하는 AI·데이터 트렌드, 대학 수업만으로는 따라잡기 어렵습니다. 채용 시장과 실무 기준으로 재해석해 매 학기 커리큘럼에 반영합니다.',
    icon: 'ri-book-open-line',
  },
  {
    number: '02',
    title: '심화 활동',
    content:
      '관심 분야의 기술을 더 깊게 파고드는 스터디, 누적 90회 이상의 공모전 수상 실적, 기업 협업 프로젝트와 컨퍼런스까지. 투빅스의 심화 활동이 실무와의 거리를 좁힙니다.',
    icon: 'ri-brain-line',
  },
  {
    number: '03',
    title: '네트워킹',
    content:
      '공부만 하는 곳이 아닙니다. 치열한 경쟁을 함께 뚫은 동료와의 소모임, 현업에서 후배를 실질적으로 끌어주는 선배. 투빅스의 네트워크는 친목을 넘어 커리어로 이어집니다.',
    icon: 'ri-group-line',
  },
];

export default function AboutSection() {
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
    <section className="section-padding bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">About</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-4 leading-tight">
              안녕하세요,<br />
              <span className="gradient-text">투빅스</span>입니다
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              투빅스(To + Bigs)는 빅데이터를 공부하고 큰 사람이 되기 위해 모인 사람들이라는 뜻으로, 모두 최고가 되려 노력합니다. 2014년 첫 기수부터 지금까지, 10년이 넘는 시간 동안 그 가치를 이어오고 있습니다.
            </p>
          </div>

          {/* Right: Image */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
              <img
                src="https://storage.readdy-site.link/project_files/08aeba0a-a656-461b-aef6-541b167b6190/9806c8cc-c9a4-44e0-8ec5-ccf4d471a142_about.png?v=a107218ef19969c736091ca54abbff91"
                alt="투빅스 소개"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* About Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16">
          {aboutItems.map((item, idx) => (
            <div
              key={item.number}
              className={`bg-dark-800 border border-dark-600/40 rounded-2xl p-6 card-hover transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + idx * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-navy-600 font-display font-bold text-4xl opacity-40">{item.number}</span>
                <div className="w-10 h-10 flex items-center justify-center bg-navy-900/50 rounded-xl">
                  <i className={`${item.icon} text-navy-400 text-xl`} />
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}