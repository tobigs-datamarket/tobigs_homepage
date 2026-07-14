import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';
const NOTION_URL = 'https://kaput-bull-375.notion.site/TOBIG-s-36cffd4098ae804ebf1ae723705a28f8?pvs=74';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="프로젝트 | TOBIG's 투빅스"
        description="투빅스 멤버들이 진행한 데이터분석 및 AI 프로젝트를 확인하세요. 머신러닝, 딥러닝, NLP, 추천시스템 등 다양한 분야의 프로젝트가 있습니다."
        keywords="투빅스 프로젝트, 데이터 분석 프로젝트, AI 프로젝트, 머신러닝 프로젝트, 딥러닝 프로젝트"
        ogUrl={`${SITE_URL}/projects`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: "TOBIG's 프로젝트 목록",
          url: `${SITE_URL}/projects`,
          description:
            '투빅스 멤버들이 진행한 데이터분석 및 AI 프로젝트 모음',
          about: {
            '@type': 'Thing',
            name: '데이터분석 및 AI 프로젝트',
          },
        }}
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-navy-900/50 border border-navy-700/40 rounded-2xl flex items-center justify-center mb-8">
            <i className="ri-folder-open-line text-3xl text-navy-400" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            투빅스 프로젝트
          </h1>
          <p className="text-gray-400 text-base mb-10 max-w-md mx-auto leading-relaxed">
            투빅스 멤버들의 다양한 데이터분석 및 AI 프로젝트는 Notion에서 확인하실 수 있습니다.
          </p>

          <a
            href={NOTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy-600 hover:bg-navy-500 text-white font-semibold rounded-full text-sm transition-all whitespace-nowrap"
          >
            <i className="ri-external-link-line" />
            Notion에서 프로젝트 보기
          </a>

          <p className="text-gray-600 text-xs mt-6">
            새 창에서 Notion 페이지가 열립니다
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}