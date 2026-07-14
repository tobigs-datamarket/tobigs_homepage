import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { notices } from '@/mocks/notices';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

export default function NoticesPage() {
  const pinned = notices.filter((n) => n.isPinned);
  const regular = notices.filter((n) => !n.isPinned);

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="공지사항 | TOBIG's 투빅스"
        description="투빅스의 공지사항을 확인하세요. 모집 안내, 세션 일정, 컨퍼런스 정보 등 중요한 소식을 전달드립니다."
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

      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Notices</span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mt-3">
              공지사항
            </h1>
          </div>

          {/* Table */}
          <div className="bg-dark-800 border border-dark-600/40 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 px-5 py-3 bg-dark-700/50 border-b border-dark-600/40">
              <span className="col-span-7 text-gray-500 text-xs font-medium uppercase tracking-wider">제목</span>
              <span className="col-span-3 text-gray-500 text-xs font-medium uppercase tracking-wider">작성자</span>
              <span className="col-span-2 text-gray-500 text-xs font-medium uppercase tracking-wider">날짜</span>
            </div>

            {/* Pinned Notices */}
            {pinned.map((notice) => (
              <Link
                key={notice.id}
                to={`/notices/${notice.id}`}
                className="grid grid-cols-1 sm:grid-cols-12 px-5 py-4 border-b border-dark-600/30 hover:bg-navy-900/20 transition-colors bg-navy-950/20 group"
              >
                <div className="sm:col-span-7 flex items-center gap-2 mb-1 sm:mb-0">
                  <span className="px-2 py-0.5 bg-navy-600/30 border border-navy-600/40 rounded text-navy-300 text-xs font-medium whitespace-nowrap flex-shrink-0">
                    공지
                  </span>
                  <span className="text-white text-sm font-medium group-hover:text-navy-300 transition-colors line-clamp-1">
                    {notice.title.replace('[공지] ', '')}
                  </span>
                </div>
                <span className="sm:col-span-3 text-gray-500 text-xs sm:text-sm">{notice.author}</span>
                <span className="sm:col-span-2 text-gray-500 text-xs sm:text-sm">{notice.date}</span>
              </Link>
            ))}

            {/* Regular Notices */}
            {regular.map((notice, idx) => (
              <Link
                key={notice.id}
                to={`/notices/${notice.id}`}
                className={`grid grid-cols-1 sm:grid-cols-12 px-5 py-4 hover:bg-dark-700/30 transition-colors group ${
                  idx !== regular.length - 1 ? 'border-b border-dark-600/30' : ''
                }`}
              >
                <div className="sm:col-span-7 flex items-center gap-2 mb-1 sm:mb-0">
                  <span className="text-white text-sm group-hover:text-navy-300 transition-colors line-clamp-1">
                    {notice.title}
                  </span>
                </div>
                <span className="sm:col-span-3 text-gray-500 text-xs sm:text-sm">{notice.author}</span>
                <span className="sm:col-span-2 text-gray-500 text-xs sm:text-sm">{notice.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}