import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import {
  dataCurriculum,
  aiCurriculum,
  dataTrackTechStack,
  aiTrackTechStack,
  type CurriculumWeek,
  type TechStackCategory,
} from '@/mocks/curriculum';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

function WeekCard({ item, index }: { item: CurriculumWeek; index: number }) {
  return (
    <div
      className="relative flex gap-4 md:gap-6 group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
          item.isCommon ? 'bg-navy-400' : 'bg-dark-500 border-2 border-navy-700'
        }`} />
        <div className="w-px flex-1 bg-dark-600/50 mt-1" />
      </div>

      {/* Content */}
      <div className="pb-6 flex-1 min-w-0">
        <div className="bg-dark-800 border border-dark-600/40 rounded-xl p-4 md:p-5 group-hover:border-navy-700/40 transition-colors">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-navy-400 text-xs font-semibold tracking-wider">{item.week}</span>
                {item.isCommon && (
                  <span className="px-2 py-0.5 bg-navy-900/60 border border-navy-700/40 rounded-full text-navy-300 text-xs">
                    공통
                  </span>
                )}
              </div>
              <h3 className="text-white font-semibold text-sm md:text-base">{item.topic}</h3>
            </div>
          </div>
          {item.description && <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.description}</p>}
        </div>
      </div>
    </div>
  );
}

function TechStackCard({ category }: { category: TechStackCategory }) {
  return (
    <div className="bg-dark-800 border border-dark-600/30 rounded-xl p-5 flex flex-col h-full">
      {/* Category Title */}
      <h3 className={`font-semibold text-base mb-3 ${category.colorClass}`}>
        {category.title}
      </h3>
      {/* Divider */}
      <div className="border-t border-dark-600/30 mb-3" />
      {/* Tech Items */}
      <ul className="space-y-2.5 flex-1">
        {category.items.map((item) => (
          <li key={item.name} className="flex items-center gap-2.5">
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                className="w-5 h-5 flex-shrink-0 object-contain"
                style={item.logoFilter ? { filter: item.logoFilter } : undefined}
                loading="lazy"
              />
            ) : (
              <span className="text-base flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span className="text-gray-300 text-sm">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CurriculumPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const trackParam = searchParams.get('track');
  const [activeTrack, setActiveTrack] = useState<'data' | 'ai'>(
    trackParam === 'ai' ? 'ai' : 'data'
  );

  useEffect(() => {
    if (trackParam === 'ai') setActiveTrack('ai');
    else if (trackParam === 'data') setActiveTrack('data');
  }, [trackParam]);

  const handleTrackChange = (track: 'data' | 'ai') => {
    setActiveTrack(track);
    setSearchParams({ track });
  };

  const curriculum: CurriculumWeek[] = activeTrack === 'data' ? dataCurriculum : aiCurriculum;
  const techStack: TechStackCategory[] = activeTrack === 'data' ? dataTrackTechStack : aiTrackTechStack;

  const curriculumSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `투빅스 커리큘럼 - ${activeTrack === 'data' ? '데이터 트랙' : 'AI 트랙'}`,
    description:
      activeTrack === 'data'
        ? '실무형 데이터 역량을 단계적으로 쌓는 트랙'
        : '채용 트렌드와 현업 기술을 기준으로 구성된 실무 중심 커리큘럼',
    provider: {
      '@type': 'Organization',
      name: "TOBIG's",
      sameAs: SITE_URL,
    },
    url: `${SITE_URL}/curriculum?track=${activeTrack}`,
    courseMode: 'onsite',
    inLanguage: 'ko',
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="커리큘럼 | TOBIG's 투빅스"
        description="데이터 분석부터 최신 AI 기술까지, 투빅스의 체계적인 학습 로드맵을 확인하세요. 데이터 트랙과 AI 트랙으로 나뉘어진 커리큘럼을 제공합니다."
        keywords="투빅스 커리큘럼, 데이터 분석 교육, AI 트랙, 머신러닝 교육, 딥러닝 교육"
        ogUrl={`${SITE_URL}/curriculum`}
        schema={curriculumSchema}
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Curriculum</span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-4">
              투빅스 커리큘럼
            </h1>
            <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
              데이터 분석부터 최신 AI 기술까지,<br />체계적인 학습 로드맵을 제공합니다.
            </p>
          </div>

          {/* Track Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-dark-800 border border-dark-600/40 rounded-full p-1">
              <button
                onClick={() => handleTrackChange('data')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTrack === 'data'
                    ? 'bg-navy-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                데이터 트랙
              </button>
              <button
                onClick={() => handleTrackChange('ai')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTrack === 'ai'
                    ? 'bg-navy-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AI 트랙
              </button>
            </div>
          </div>

          {/* Track Title & Subtitle */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl">
                  {activeTrack === 'data' ? '데이터 트랙' : 'AI 트랙'}
                </h2>
                <p className="text-gray-400 text-sm md:text-base mt-0.5">
                  {activeTrack === 'data'
                    ? '실무형 데이터 역량을 단계적으로 쌓는 트랙'
                    : '채용 트렌드와 현업 기술을 기준으로 구성된 실무 중심 커리큘럼'}
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {techStack.map((category) => (
              <TechStackCard key={category.title} category={category} />
            ))}
          </div>

          {/* Timeline */}
          <div className="mb-10">
            <h2 className="font-display font-bold text-xl text-white mb-6 text-center">주차별 커리큘럼</h2>
            {curriculum.map((item, idx) => (
              <WeekCard key={item.week} item={item} index={idx} />
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-dark-800 border border-navy-800/30 rounded-xl p-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-information-line text-navy-400 text-lg" />
              <h3 className="text-white font-semibold text-sm">안내 사항</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                '1~5주차, 10주차는 데이터/AI 트랙 공동 진행',
                '격주 토요일 오후 2시~5시 운영',
                '세션 후 과제 제출로 복습 병행',
                '커리큘럼은 기수별로 일부 변경될 수 있습니다',
              ].map((note) => (
                <li key={note} className="flex items-start gap-2 text-sm text-gray-400">
                  <i className="ri-check-line text-navy-400 mt-0.5 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/recruiting"
              className="px-8 py-3.5 bg-navy-600 hover:bg-navy-500 text-white font-semibold rounded-full text-sm transition-colors text-center whitespace-nowrap"
            >
              지원하기
            </Link>
            <Link
              to="/faq"
              className="px-8 py-3.5 border border-navy-600/50 hover:border-navy-400 text-navy-300 hover:text-white font-medium rounded-full text-sm transition-colors text-center whitespace-nowrap"
            >
              FAQ 보기
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}