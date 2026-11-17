import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { useNotices, type Notice } from '@/services/notices';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';
const NEW_DAYS = 7;

// 시트를 두 번 다 못 읽었을 때 (상세 페이지에서도 쓴다)
export function LoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="border-y border-dark-600/50 py-16 text-center">
      <p className="text-sm text-gray-400">공지사항을 불러오지 못했습니다.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-gray-200 transition-colors hover:border-white/30 hover:bg-white/5"
      >
        <i className="ri-refresh-line" />
        다시 시도
      </button>
    </div>
  );
}

const isNew = (date: string) => Date.now() - new Date(date).getTime() < NEW_DAYS * 86_400_000;

// 왼쪽에 날짜(월.일 크게, 연도 작게), 오른쪽에 제목. items-baseline: 날짜 첫 줄과 제목의 글자 바닥선을 맞춘다
function NoticeRow({ notice }: { notice: Notice }) {
  return (
    <Link
      to={`/notices/${notice.id}`}
      className="group -mx-3 grid grid-cols-[4.5rem_1fr] items-baseline gap-x-5 rounded-lg px-3 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[6.5rem_1fr] sm:gap-x-8"
    >
      <time dateTime={notice.date} className="tabular-nums">
        <span className="block text-lg font-semibold leading-tight text-navy-100">
          {notice.date.slice(5).replace('-', '.')}
        </span>
        <span className="mt-1 block text-xs text-gray-500">{notice.date.slice(0, 4)}</span>
      </time>
      <span className="text-[15px] sm:text-base font-medium leading-snug text-gray-100 break-keep transition-colors group-hover:text-white">
        {notice.isPinned && <i className="ri-pushpin-2-fill mr-1.5 text-navy-400" aria-label="고정" />}
        {notice.title}
        {isNew(notice.date) && (
          <span className="ml-2 align-[2px] text-[10px] font-bold tracking-wider text-navy-300">NEW</span>
        )}
      </span>
    </Link>
  );
}

export default function NoticesPage() {
  const { notices, failed, retry } = useNotices();
  // 고정 공지를 맨 위로, 나머지는 시트에서 받은 최신순 그대로
  const sorted = notices && [...notices.filter((n) => n.isPinned), ...notices.filter((n) => !n.isPinned)];

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="공지사항 | TOBIG's 투빅스"
        description="투빅스의 공지사항을 확인하세요. 모집 안내, 합격자 발표, 행사 일정 등 중요한 소식을 전달드립니다."
        keywords="투빅스 공지, TOBIG's 공지사항, 데이터 동아리 공지, AI 동아리 소식"
        ogUrl={`${SITE_URL}/notices`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: "TOBIG's 공지사항",
          url: `${SITE_URL}/notices`,
          description: '투빅스 공지사항 목록',
        }}
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <header className="text-center mb-8 md:mb-10">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Notices</span>
            <h1 className="font-display font-bold text-2xl md:text-4xl text-white mt-3">공지사항</h1>
          </header>

          {failed ? (
            <LoadError onRetry={retry} />
          ) : sorted === null ? (
            <div className="border-t border-dark-500/70" aria-label="공지사항을 불러오는 중">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex gap-8 border-b border-dark-600/50 py-4">
                  <div className="h-10 w-16 rounded bg-dark-700" />
                  <div className="mt-1 h-4 flex-1 rounded bg-dark-700" />
                </div>
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <p className="border-y border-dark-600/50 py-16 text-center text-sm text-gray-500">
              등록된 공지사항이 없습니다.
            </p>
          ) : (
            <ul className="border-t border-dark-500/70">
              {sorted.map((notice) => (
                <li key={notice.id} className="border-b border-dark-600/50">
                  <NoticeRow notice={notice} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
