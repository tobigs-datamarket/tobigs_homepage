import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

// Toggle this to switch between season and off-season view
// In production, this would be managed by the admin
const IS_RECRUITING_SEASON = true;

const steps = [
  { step: 'STEP 1', title: '서류 지원(~6/23)', icon: 'ri-file-text-line', desc: '구글폼을 통해 지원서 제출' },
  { step: 'STEP 2', title: '서류 결과 안내(6/26)', icon: 'ri-mail-check-line', desc: '서류 심사 결과 문자 발송' },
  { step: 'STEP 3', title: '면접 심사(6/28~30)', icon: 'ri-user-voice-line', desc: '다대다 면접 (약 30분 소요)' },
  { step: 'STEP 4', title: '최종 발표(7/1)', icon: 'ri-trophy-line', desc: '최종 합격자 발표' },
];

function SeasonView() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-800/60 border border-navy-600/40 rounded-full text-xs text-navy-300 mb-5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            모집 진행 중
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
            투빅스와 함께 <span className="gradient-text">큰 사람</span>으로 성장할<br />
            <span className="text-navy-400 font-bold">26기</span>를 모집합니다
          </h1>
          <p className="text-gray-400 text-base">
            모집 기간: ~2026.06.23 마감
          </p>
        </div>

        {/* Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12 h-48 md:h-64">
          <img
            src="https://readdy.ai/api/search-image?query=data%20AI%20university%20students%20team%20working%20together%20laptop%20presentation%20collaborative%20modern%20dark%20office%20environment%20professional%20atmosphere%20tech%20club&width=1200&height=400&seq=recruit001&orientation=landscape"
            alt="투빅스 25기 모집"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-12">
              <p className="text-white font-semibold text-lg md:text-2xl leading-relaxed">
                AI·데이터분석을 함께<br />공부할 동료를 찾습니다
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-xl text-white mb-6 text-center">지원 절차</h2>
          <div className="relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-px bg-navy-800/50" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {steps.map((s, idx) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
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
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfofq6fgll30meg5cHwLTSwCH6lFZ1QNm1UqkLvJTupLw8wIQ/viewform?usp=publish-editor"
            target="_blank"
            rel="nofollow noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-navy-600 hover:bg-navy-500 text-white font-semibold rounded-full text-sm transition-all whitespace-nowrap"
          >
            <i className="ri-external-link-line" />
            구글폼 지원하기
          </a>
          <a
            href="https://pf.kakao.com/_QyxiDxb"
            target="_blank"
            rel="nofollow noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 font-medium rounded-full text-sm transition-all whitespace-nowrap"
          >
            <i className="ri-kakao-talk-fill" />
            카카오톡 실시간 문의
          </a>
        </div>
      </div>
    </div>
  );
}

function OffSeasonView() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const res = await fetch('https://readdy.ai/api/form/d86fbergv8igf6sht8h0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch {
      setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 flex items-center">
      <div className="max-w-2xl mx-auto px-4 md:px-6 w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto bg-dark-700 border border-dark-600/40 rounded-full flex items-center justify-center mb-6">
            <i className="ri-calendar-close-line text-2xl text-gray-500" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            현재 모집 기간이 아닙니다
          </h1>
          <p className="text-gray-400 text-base">
            다음 모집 소식을 가장 먼저 받아보고 싶다면?
          </p>
        </div>

        {!submitted ? (
          <form
            data-readdy-form
            onSubmit={handleSubmit}
            className="bg-dark-800 border border-dark-600/40 rounded-2xl p-8"
          >
            <label className="block text-white font-medium text-sm mb-3">
              이메일 주소
            </label>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-navy-600 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-navy-600 hover:bg-navy-500 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                알림 신청
              </button>
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <p className="text-gray-500 text-xs mt-3">
              <i className="ri-information-line mr-1" />
              모집 시작 시 메일로 안내드립니다.
            </p>
          </form>
        ) : (
          <div className="bg-dark-800 border border-navy-600/30 rounded-2xl p-8 text-center">
            <i className="ri-check-line text-3xl text-navy-400 mb-3 block" />
            <p className="text-white font-semibold mb-2">신청 완료!</p>
            <p className="text-gray-400 text-sm">다음 모집이 시작되면 이메일로 알려드릴게요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecruitingPage() {
  const recruitingSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '리쿠르팅 | TOBIG\'s 투빅스',
    description: IS_RECRUITING_SEASON
      ? '투빅스 26기 신규 동아리원 모집 페이지입니다. AI·데이터분석 대표 연합 동아리에서 함께 성장할 동료를 모집합니다.'
      : '투빅스 리쿠르팅 페이지입니다. 현재 모집 기간이 아니며, 다음 모집 소식을 이메일로 받아보실 수 있습니다.',
    url: `${SITE_URL}/recruiting`,
    inLanguage: 'ko',
    mainEntity: {
      '@type': 'Organization',
      name: "TOBIG's",
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title={
          IS_RECRUITING_SEASON
            ? '리쿠르팅 - 26기 모집 중 | TOBIG\'s 투빅스'
            : '리쿠르팅 | TOBIG\'s 투빅스'
        }
        description={
          IS_RECRUITING_SEASON
            ? '투빅스 26기 신규 동아리원 모집 중입니다. AI·데이터분석 대표 연합 동아리에서 함께 성장할 동료를 찾습니다. 지금 지원하세요!'
            : '투빅스 리쿠르팅 페이지입니다. 다음 모집 소식을 이메일로 받아보실 수 있습니다.'
        }
        keywords="투빅스 모집, TOBIG's 리쿠르팅, 데이터 동아리 지원, AI 동아리 모집, 대학생 연합 동아리"
        ogUrl={`${SITE_URL}/recruiting`}
        schema={recruitingSchema}
      />
      <Navbar />
      <main>
        {IS_RECRUITING_SEASON ? <SeasonView /> : <OffSeasonView />}
      </main>
      <Footer />
    </div>
  );
}