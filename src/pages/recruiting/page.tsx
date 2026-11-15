import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { RECRUITING_DDAY } from '@/config/recruiting';
import { formatDeadline, isRecruitingOpen, kstYmd } from '@/utils/dday';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';
const RECRUITING_ALERT_ENDPOINT = import.meta.env.VITE_RECRUITING_ALERT_ENDPOINT as string | undefined;
// 기수·날짜는 src/config/recruiting.ts 에서만 바꾼다. 곰이 든 팻말의 숫자도 cohort('27기')에서 숫자만 뽑아 쓴다.
const { cohort, schedule } = RECRUITING_DDAY;
const cohortNo = cohort.replace(/\D/g, '');

// 아래쪽 '함께해 온 사람들' 단체사진: 반투명, 네 가장자리를 페이지 배경으로 녹여 네모 테두리를 없앤다.
const PHOTO_FADE: CSSProperties = {
  maskImage:
    'linear-gradient(to bottom, transparent, #000 20%, #000 58%, transparent 94%), linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
  maskComposite: 'intersect',
};
// 곡괭이가 팻말 오른쪽 위 모서리를 찍을 때 튀는 불꽃: 날아가는 방향(px). 움직임은 index.css 의 .miner-*
const SPARKS = [[-26, -30], [-6, -42], [16, -34], [32, -14], [26, 6]].map(
  ([dx, dy]) => ({ '--dx': `${dx}px`, '--dy': `${dy}px` }) as CSSProperties,
);
// 곰 둘레에서 반짝이는 별(원래 로고의 별 장식 자리). 곰 그림에서는 별을 빼서, 곰이 움직여도 별은 제자리에 있다.
const STARS = [
  { left: '-9%', top: '44%', size: 'text-2xl', delay: '0s' },
  { left: '-1%', top: '64%', size: 'text-sm', delay: '-0.9s' },
  { left: '93%', top: '8%', size: 'text-lg', delay: '-1.6s' },
];

// 지원 버튼: 첫 화면과 맨 아래에 같은 모양으로 두 번 나온다
function ApplyLink() {
  return (
    <a
      href={RECRUITING_DDAY.applyFormUrl}
      target="_blank"
      rel="nofollow noreferrer"
      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-navy-50 px-8 py-3.5 text-[15px] font-bold text-navy-950 transition-colors hover:bg-white"
    >
      구글폼 지원하기
      <i className="ri-arrow-right-up-line" />
    </a>
  );
}

// 모집 기간 중에만 그려진다(그때는 deadline 이 올바른 날짜임이 보장됨).
function SeasonView() {
  const end = kstYmd(Date.parse(RECRUITING_DDAY.deadline));
  const deadline = formatDeadline(RECRUITING_DDAY.deadline);
  const steps = [
    { date: `~${end.m}/${end.d}`, title: '서류 지원', desc: '구글폼으로 지원서 제출' },
    { date: schedule.docResult, title: '서류 결과 안내', desc: '서류 심사 결과 문자 발송' },
    { date: schedule.interview, title: '면접 심사', desc: '다대다 면접 (약 30분 소요)' },
    { date: schedule.final, title: '최종 발표', desc: '최종 합격자 발표' },
  ];
  return (
    <div className="relative overflow-hidden pb-24">
      <div className="relative mx-auto max-w-4xl px-4 pt-24 md:pt-28">
        {/* 곰 뒤 빛: 남색 빛 + 헤드램프의 따뜻한 빛 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_150px_at_50%_25%,rgb(255_214_110/0.14),transparent_70%),radial-gradient(ellipse_44%_40%_at_50%_38%,rgb(59_94_166/0.45),transparent_70%)]"
        />

        {/* 광부 곰이 기수 팻말을 곡괭이로 두드린다 (장식: 같은 내용이 제목에 있다) */}
        <div aria-hidden="true" className="relative mx-auto w-[200px] select-none md:w-[260px]">
          <div className="relative">
            <img src="/images/recruiting/bear.webp" alt="" width={560} height={512} className="miner-swing relative w-full" />
            {STARS.map((s) => (
              <i
                key={s.top}
                className={`ri-sparkling-2-fill miner-twinkle absolute text-yellow-200 ${s.size}`}
                style={{ left: s.left, top: s.top, animationDelay: s.delay }}
              />
            ))}
            <span className="absolute left-[88%] top-[93%] z-20">
              {SPARKS.map((style, i) => (
                <span key={i} className="miner-spark" style={style} />
              ))}
            </span>
          </div>
          <div className="miner-sign relative z-10 mx-auto -mt-[7%] w-[80%] rounded-2xl border border-white/20 bg-gradient-to-b from-navy-500 to-navy-700 pb-2.5 pt-2 text-center shadow-[0_18px_40px_rgb(0_0_0/0.55)] md:rounded-[22px] md:pb-3 md:pt-2.5">
            <p className="font-display font-black leading-none tracking-[-0.04em] text-white">
              <span className="text-[52px] md:text-[68px]">{cohortNo}</span>
              <span className="ml-1 text-[22px] md:text-[28px]">기</span>
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-navy-100 md:text-[11px]">Recruiting</p>
          </div>
        </div>

        {/* 제목·버튼 */}
        <div className="relative mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-600/40 bg-navy-900/70 px-3 py-1.5 text-xs text-navy-200 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            모집 진행 중 · {deadline.date} {deadline.time} 마감
          </span>
          <h1 className="mt-5 break-keep font-display text-[1.75rem] font-bold leading-snug text-white md:text-4xl">
            투빅스와 함께 <span className="gradient-text">큰 사람</span>으로 성장할 {cohort}를 모집합니다
          </h1>
          <p className="mt-3 text-base text-gray-400">함께 AI·데이터분석을 공부합시다.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ApplyLink />
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

      {/* 함께해 온 사람들: 반투명 단체사진 + 마무리 지원 버튼 (문구는 사진의 흐려진 아래쪽에 걸친다) */}
      <section className="relative mx-auto mt-28 max-w-5xl md:mt-32">
        <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-navy-400">투빅스 사람들</h2>
        <img
          src="/images/recruiting/group.webp"
          alt="투빅스 동아리원 단체 사진"
          width={1218}
          height={537}
          loading="lazy"
          className="w-full opacity-[0.45] [filter:saturate(0.85)]"
          style={PHOTO_FADE}
        />
        <div className="relative -mt-[3%] px-5 text-center md:-mt-[9%]">
          <p className="break-keep font-display text-2xl font-bold text-white md:text-4xl">저희와 함께할 {cohort}분들을 모집합니다!</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <ApplyLink />
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 px-8 py-3.5 text-[15px] font-semibold text-gray-200 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              자주 묻는 질문
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
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