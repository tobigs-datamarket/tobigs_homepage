import { useState, type CSSProperties } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { RECRUITING_DDAY } from '@/config/recruiting';
import { formatDeadline, isRecruitingOpen, kstYmd } from '@/utils/dday';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';
const RECRUITING_ALERT_ENDPOINT = import.meta.env.VITE_RECRUITING_ALERT_ENDPOINT as string | undefined;
// 기수·날짜는 src/config/recruiting.ts 에서만 바꾼다. 사진 뒤 큰 숫자도 cohort('27기')에서 숫자만 뽑아 쓴다.
const { cohort, schedule } = RECRUITING_DDAY;
const cohortNo = cohort.replace(/\D/g, '');

// 강의실은 어둠 속으로, 사람들만 조명 아래에. 세 겹: 어두운 강의실(group.webp) → 큰 기수 숫자 → 사람만 오린 사진(group-people.webp).
// 두 사진은 같은 크기(1218×537)여야 겹친다. group.webp 를 바꾸면 scripts/cutout_people.py 로 group-people.webp 도 다시 만든다.
const fade = (top: string, bottom: string, side: string): CSSProperties => ({
  maskImage: `linear-gradient(to bottom, ${top}, #000 ${bottom}, transparent), linear-gradient(to right, transparent, #000 ${side}, #000 calc(100% - ${side}), transparent)`,
  maskComposite: 'intersect',
});
// 강의실: 위·아래·양옆을 페이지 배경으로 녹여 사진의 네모 테두리를 없앤다
const ROOM_FADE = fade('transparent, #000 22%', '68%', '7%');
// 사람: 머리는 또렷하게, 무릎 아래만 어둠으로
const PEOPLE_FADE = fade('#000', '66%', '4%');
// 가운데는 그대로, 바깥(화이트보드·벽·바닥)으로 갈수록 남색 어둠
const SPOTLIGHT = 'radial-gradient(ellipse 58% 72% at 50% 58%, transparent 30%, rgb(4 11 28 / 0.82))';

// 모집 기간 중에만 그려진다(그때는 deadline 이 올바른 날짜임이 보장됨).
function SeasonView() {
  // 숫자는 사람 레이어가 뜬 뒤에 보인다(먼저 뜨면 잠깐 얼굴을 가린다)
  const [peopleReady, setPeopleReady] = useState(false);
  const end = kstYmd(Date.parse(RECRUITING_DDAY.deadline));
  const deadline = formatDeadline(RECRUITING_DDAY.deadline);
  const steps = [
    { date: `~${end.m}/${end.d}`, title: '서류 지원', desc: '구글폼으로 지원서 제출' },
    { date: schedule.docResult, title: '서류 결과 안내', desc: '서류 심사 결과 문자 발송' },
    { date: schedule.interview, title: '면접 심사', desc: '다대다 면접 (약 30분 소요)' },
    { date: schedule.final, title: '최종 발표', desc: '최종 합격자 발표' },
  ];
  return (
    <div className="relative overflow-hidden pt-20 pb-24 md:pt-24">
      {/* 사진 뒤로 은은하게 번지는 남색 빛 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,rgb(30_58_120/0.32),transparent)]"
      />

      {/* 무대 (크기는 무대 폭 기준 cqw): 어두운 강의실 → 기수 숫자 → 사람들 */}
      <div className="relative mx-auto max-w-4xl [container-type:inline-size]">
        <div className="relative isolate">
          <p
            aria-hidden="true"
            className={`relative z-10 select-none bg-gradient-to-b from-navy-100 via-navy-300 to-navy-600 bg-clip-text pr-[0.05em] text-center font-display font-black leading-none tracking-[-0.05em] text-transparent transition-opacity duration-700 ${
              peopleReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ fontSize: '27cqw', marginBottom: '-20cqw' }}
          >
            {cohortNo}
          </p>
          <div aria-hidden="true" className="relative aspect-[1218/537]" style={ROOM_FADE}>
            <img
              src="/images/recruiting/group.webp"
              alt=""
              className="absolute inset-0 h-full w-full [filter:brightness(0.5)_saturate(0.7)]"
            />
            <div className="absolute inset-0" style={{ background: SPOTLIGHT }} />
          </div>
          <img
            src="/images/recruiting/group-people.webp"
            alt={`투빅스 ${cohort} 모집`}
            onLoad={() => setPeopleReady(true)}
            className="absolute inset-x-0 bottom-0 z-20 w-full"
            style={PEOPLE_FADE}
          />
        </div>

        {/* 제목·버튼: 사진의 흐려진 바닥 위에서 시작한다(얼굴은 가리지 않음) */}
        <div className="relative -mt-[4%] px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-600/40 bg-navy-900/70 px-3 py-1.5 text-xs text-navy-200 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            모집 진행 중 · {deadline.date} {deadline.time} 마감
          </span>
          <h1 className="mt-5 break-keep font-display text-[1.75rem] font-bold leading-snug text-white md:text-4xl">
            투빅스와 함께 <span className="gradient-text">큰 사람</span>으로 성장할 {cohort}를 모집합니다
          </h1>
          <p className="mt-3 text-base text-gray-400">AI·데이터분석을 함께 공부할 동료를 찾습니다</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={RECRUITING_DDAY.applyFormUrl}
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-navy-50 px-8 py-3.5 text-[15px] font-bold text-navy-950 transition-colors hover:bg-white"
            >
              구글폼 지원하기
              <i className="ri-arrow-right-up-line" />
            </a>
            <a
              href="https://pf.kakao.com/_QyxiDxb"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-8 py-3.5 text-[15px] font-semibold text-gray-200 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <i className="ri-kakao-talk-fill text-yellow-300" />
              카카오톡 실시간 문의
            </a>
          </div>
        </div>
      </div>

      {/* 지원 절차: 날짜가 주인공인 타임라인 (휴대폰은 세로, PC는 가로) */}
      <section className="relative mx-auto mt-24 max-w-4xl px-6 md:mt-28">
        <h2 className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-navy-400">지원 절차</h2>
        <ol className="grid gap-9 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-8 md:pl-0 md:pt-9">
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] top-5 -bottom-9 w-px bg-navy-800 md:-right-6 md:bottom-auto md:left-5 md:top-[5px] md:h-px md:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full md:top-0 ${
                  i === 0 ? 'bg-navy-400 shadow-[0_0_0_5px_rgb(90_119_184/0.22)]' : 'border border-navy-600 bg-dark-900'
                }`}
              />
              <p className="text-xs font-semibold tabular-nums tracking-widest text-navy-400">0{i + 1}</p>
              <p className="mt-1 font-display text-2xl font-bold tabular-nums text-white">{s.date}</p>
              <h3 className="mt-2 text-sm font-semibold text-gray-200">{s.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function OffSeasonView() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    if (!RECRUITING_ALERT_ENDPOINT) {
      setError('알림 신청 기능이 아직 설정되지 않았습니다.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const res = await fetch(RECRUITING_ALERT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      // Apps Script는 오류가 나도 HTTP 200을 줄 수 있어서 본문의 ok까지 확인한다 (scripts/recruiting-alert.gs)
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok === true) {
        setSubmitted(true);
      } else {
        setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch {
      setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
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
                placeholder="ToBigs@email.com"
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-navy-600 transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-navy-600 hover:bg-navy-500 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? '신청 중...' : '알림 신청'}
              </button>
            </div>
            <label className="flex items-start gap-2 mb-3 text-gray-400 text-xs leading-relaxed cursor-pointer">
              <input type="checkbox" required disabled={submitting} className="mt-0.5 accent-navy-600" />
              <span>
                [필수] 개인정보 수집·이용 동의 
              </span>
            </label>
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
  // 모집 기간은 src/config/recruiting.ts 의 startAt ~ deadline 으로만 정한다.
  const isRecruitingSeason = isRecruitingOpen(Date.now(), RECRUITING_DDAY);
  const recruitingSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '리쿠르팅 | TOBIG\'s 투빅스',
    description: isRecruitingSeason
      ? `투빅스 ${cohort} 신규 동아리원 모집 페이지입니다. AI·데이터분석 대표 연합 동아리에서 함께 성장할 동료를 모집합니다.`
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
          isRecruitingSeason
            ? `리쿠르팅 - ${cohort} 모집 중 | TOBIG's 투빅스`
            : '리쿠르팅 | TOBIG\'s 투빅스'
        }
        description={
          isRecruitingSeason
            ? `투빅스 ${cohort} 신규 동아리원 모집 중입니다. AI·데이터분석 대표 연합 동아리에서 함께 성장할 동료를 찾습니다. 지금 지원하세요!`
            : '투빅스 리쿠르팅 페이지입니다. 다음 모집 소식을 이메일로 받아보실 수 있습니다.'
        }
        keywords="투빅스 모집, TOBIG's 리쿠르팅, 데이터 동아리 지원, AI 동아리 모집, 대학생 연합 동아리"
        ogUrl={`${SITE_URL}/recruiting`}
        schema={recruitingSchema}
      />
      <Navbar />
      <main>
        {isRecruitingSeason ? <SeasonView /> : <OffSeasonView />}
      </main>
      <Footer />
    </div>
  );
}