import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { formatNoticeDate, useNotices, type Notice } from '@/services/notices';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';
const NEW_DAYS = 7;

const CATEGORY_STYLE: Record<string, string> = {
  모집: 'border-navy-500/40 bg-navy-600/15 text-navy-200',
  발표: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  행사: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
};

// 상세 페이지에서도 쓴다
export function CategoryTag({ category, className = '' }: { category: string; className?: string }) {
  const style = CATEGORY_STYLE[category] ?? 'border-dark-500 bg-dark-700/60 text-gray-300';
  return (
    <span
      className={`inline-flex h-6 items-center justify-center rounded-md border px-2 text-xs font-medium whitespace-nowrap ${style} ${className}`}
    >
      {category}
    </span>
  );
}

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

function NoticeRow({ notice }: { notice: Notice }) {
  return (
    <Link
      to={`/notices/${notice.id}`}
      className="group -mx-3 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-lg px-3 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[4.5rem_1fr_auto] sm:gap-x-6"
    >
      <CategoryTag category={notice.category} className="sm:w-full" />
      <span className="order-last col-span-2 text-[15px] leading-snug text-gray-200 transition-colors group-hover:text-white sm:order-none sm:col-span-1">
        {notice.isPinned && <i className="ri-pushpin-2-fill mr-1.5 text-navy-400" aria-label="고정" />}
        {notice.title}
        {isNew(notice.date) && (
          <span className="ml-2 align-[2px] text-[10px] font-bold tracking-wider text-navy-300">NEW</span>
        )}
      </span>
      <time dateTime={notice.date} className="text-xs tabular-nums text-gray-500 sm:text-sm">
        {formatNoticeDate(notice.date)}
      </time>
    </Link>
  );
}

function NoticeGroup({ label, items }: { label: string; items: Notice[] }) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="flex items-baseline justify-between border-b border-dark-500/70 pb-3 text-sm font-semibold text-white">
        {label}
        <span className="text-xs font-normal text-gray-500">{items.length}건</span>
      </h2>
      <ul>
        {items.map((notice) => (
          <li key={notice.id} className="border-b border-dark-600/50">
            <NoticeRow notice={notice} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function groupByYear(list: Notice[]): [string, Notice[]][] {
  const groups = new Map<string, Notice[]>();
  for (const notice of list) {
    const year = notice.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), notice]);
  }
  return [...groups];
}

export default function NoticesPage() {
  const { notices, failed, retry } = useNotices();
  const pinned = notices?.filter((n) => n.isPinned) ?? [];
  const years = groupByYear(notices?.filter((n) => !n.isPinned) ?? []);

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
          <header className="text-center mb-12 md:mb-16">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Notices</span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mt-3">공지사항</h1>
            <p className="mt-4 text-sm text-gray-400">모집, 합격자 발표, 행사 등 투빅스의 공식 소식을 전합니다.</p>
          </header>

          {failed ? (
            <LoadError onRetry={retry} />
          ) : notices === null ? (
            <div className="border-t border-dark-500/70" aria-label="공지사항을 불러오는 중">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-6 border-b border-dark-600/50 py-5">
                  <div className="h-6 w-12 rounded-md bg-dark-700" />
                  <div className="h-4 flex-1 rounded bg-dark-700" />
                  <div className="h-4 w-20 rounded bg-dark-700" />
                </div>
              ))}
            </div>
          ) : notices.length === 0 ? (
            <p className="border-y border-dark-600/50 py-16 text-center text-sm text-gray-500">
              등록된 공지사항이 없습니다.
            </p>
          ) : (
            <>
              {pinned.length > 0 && <NoticeGroup label="고정 공지" items={pinned} />}
              {years.map(([year, items]) => (
                <NoticeGroup key={year} label={year} items={items} />
              ))}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
