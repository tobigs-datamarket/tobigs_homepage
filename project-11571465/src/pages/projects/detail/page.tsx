import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { projects } from '@/mocks/projects';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

const awardColors: Record<string, string> = {
  대상: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  최우수상: 'bg-navy-500/20 text-navy-300 border-navy-500/30',
  우수상: 'bg-green-500/20 text-green-300 border-green-500/30',
  장려상: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <SEO
          title="프로젝트를 찾을 수 없습니다 | TOBIG's"
          description="요청하신 프로젝트를 찾을 수 없습니다."
          noindex
        />
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">프로젝트를 찾을 수 없습니다.</p>
          <Link to="/projects" className="text-navy-400 hover:text-navy-300 text-sm">
            ← 목록으로
          </Link>
        </div>
      </div>
    );
  }

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.id}`,
    image: project.thumbnail,
    about: {
      '@type': 'Thing',
      name: project.field,
    },
    creator: project.members.map((m) => ({
      '@type': 'Person',
      name: m,
    })),
    datePublished: project.period.split(' ~ ')[0]?.replace(/\./g, '-'),
    award: project.award || undefined,
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title={`${project.title} | TOBIG's 프로젝트`}
        description={project.description}
        keywords={`투빅스 프로젝트, ${project.field}, ${project.generation}기`}
        ogImage={project.thumbnail}
        ogUrl={`${SITE_URL}/projects/${project.id}`}
        schema={projectSchema}
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Back */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors"
          >
            <i className="ri-arrow-left-line" />
            프로젝트 목록
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-3 py-1 bg-dark-700 border border-dark-600/40 rounded-full text-gray-400 text-xs">
              {project.generation}기
            </span>
            <span className="px-3 py-1 bg-dark-700 border border-dark-600/40 rounded-full text-gray-400 text-xs">
              {project.conference}
            </span>
            <span className="px-3 py-1 bg-navy-900/60 border border-navy-700/40 rounded-full text-navy-300 text-xs">
              {project.field}
            </span>
            {project.award && (
              <span className={`px-3 py-1 rounded-full text-xs border font-medium ${awardColors[project.award] ?? ''}`}>
                🏆 {project.award}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-2xl md:text-4xl text-white mb-8 leading-tight">
            {project.title}
          </h1>

          {/* Thumbnail */}
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Members */}
            <div className="bg-dark-800 border border-dark-600/40 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-team-line text-navy-400" />
                <h3 className="text-white font-semibold text-sm">팀원</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.members.map((m) => (
                  <span key={m} className="px-3 py-1.5 bg-dark-700/60 rounded-lg text-gray-300 text-sm">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Period */}
            <div className="bg-dark-800 border border-dark-600/40 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-calendar-line text-navy-400" />
                <h3 className="text-white font-semibold text-sm">프로젝트 기간</h3>
              </div>
              <p className="text-gray-300 text-sm">{project.period}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-dark-800 border border-dark-600/40 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-file-text-line text-navy-400" />
              <h3 className="text-white font-semibold text-sm">프로젝트 설명</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Presentation Placeholder */}
          <div className="bg-dark-800 border border-dark-600/40 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-presentation-line text-navy-400" />
              <h3 className="text-white font-semibold text-sm">발표 자료</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-700 hover:bg-navy-800 border border-dark-600/40 hover:border-navy-700/40 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap"
              >
                <i className="ri-file-pdf-line" />
                PDF 보기
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-700 hover:bg-navy-800 border border-dark-600/40 hover:border-navy-700/40 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap"
              >
                <i className="ri-external-link-line" />
                외부 링크
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}