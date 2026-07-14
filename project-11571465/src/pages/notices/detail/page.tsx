import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { notices } from '@/mocks/notices';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

const hasImagePlaceholder = (content: string): boolean => {
  return content.split('\n').some((line) => /\.(png|jpg|jpeg|webp|gif)$/i.test(line.trim()));
};

const renderContent = (content: string, imageUrl?: string) => {
  // 플레이스홀더가 없으면 기존 방식 (whitespace-pre-line)
  if (!imageUrl || !hasImagePlaceholder(content)) {
    return <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{content}</div>;
  }

  // 플레이스홀더가 있으면 파싱하여 이미지 삽입
  const lines = content.split('\n');
  return (
    <div className="text-gray-300 text-sm leading-relaxed">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (/\.(png|jpg|jpeg|webp|gif)$/i.test(trimmed)) {
          return (
            <div key={`img-${index}`} className="my-6 overflow-hidden rounded-lg border border-dark-600/40">
              <img src={imageUrl} alt="공지 이미지" className="w-full h-auto object-cover" />
            </div>
          );
        }
        return <div key={`line-${index}`}>{line || <>&nbsp;</>}</div>;
      })}
    </div>
  );
};

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <SEO
          title="공지사항을 찾을 수 없습니다 | TOBIG's"
          description="요청하신 공지사항을 찾을 수 없습니다."
          noindex
        />
        <div className="text-center">
          <p className="text-gray-400 mb-4">공지사항을 찾을 수 없습니다.</p>
          <Link to="/notices" className="text-navy-400 hover:text-navy-300 text-sm">
            ← 목록으로
          </Link>
        </div>
      </div>
    );
  }

  const noticeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: notice.title,
    description: notice.content.slice(0, 200),
    url: `${SITE_URL}/notices/${notice.id}`,
    author: {
      '@type': 'Organization',
      name: notice.author,
    },
    publisher: {
      '@type': 'Organization',
      name: "TOBIG's",
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`,
      },
    },
    datePublished: notice.date,
    articleSection: '공지사항',
    inLanguage: 'ko',
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title={`${notice.title} | TOBIG's 공지사항`}
        description={notice.content.slice(0, 200)}
        keywords="투빅스 공지, TOBIG's 소식, 데이터 동아리 공지"
        ogUrl={`${SITE_URL}/notices/${notice.id}`}
        schema={noticeSchema}
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Back */}
          <Link
            to="/notices"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors"
          >
            <i className="ri-arrow-left-line" />
            목록으로
          </Link>

          {/* Article */}
          <article className="bg-dark-800 border border-dark-600/40 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 md:px-8 py-6 border-b border-dark-600/40">
              {notice.isPinned && (
                <span className="inline-block px-2.5 py-0.5 bg-navy-600/30 border border-navy-600/40 rounded text-navy-300 text-xs font-medium mb-3">
                  공지
                </span>
              )}
              <h1 className="text-white font-bold text-xl md:text-2xl leading-snug mb-4">
                {notice.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1.5">
                  <i className="ri-user-line text-xs" />
                  {notice.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-calendar-line text-xs" />
                  {notice.date}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-8 py-6">
              {/* content 안에 이미지 플레이스홀더가 없을 때만 상단에 이미지 표시 */}
              {notice.image && !hasImagePlaceholder(notice.content) && (
                <div className="mb-6 overflow-hidden rounded-lg border border-dark-600/40">
                  <img
                    src={notice.image}
                    alt="공지 이미지"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              {renderContent(notice.content, notice.image)}
            </div>
          </article>

          {/* Back Button */}
          <div className="mt-6">
            <Link
              to="/notices"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-700 hover:bg-dark-600 border border-dark-600/40 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              <i className="ri-list-unordered" />
              목록으로
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}