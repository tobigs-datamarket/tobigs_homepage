import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import ProgramsSection from './components/ProgramsSection';
import TracksSection from './components/TracksSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';
const LOGO_URL = 'https://static.readdy.ai/image/3d684be57ac9d3c5f5a6f09d6e1e16dd/0e3510c4835073ce61a922f30b65e40b.png';

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: "TOBIG's",
      alternateName: '투빅스',
      url: SITE_URL,
      logo: LOGO_URL,
      description:
        'AI·데이터분석 대표 연합 동아리 투빅스. 2014년부터 400+ 누적 동아리원, 90+ 수상 실적, 300+ 누적 프로젝트.',
      sameAs: [
        'https://www.instagram.com/tobigs_official/',
        'https://github.com/tobigs-datamarket',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'datamarket.tobigs@gmail.com',
        contactType: 'general inquiry',
      },
    },
    {
      '@type': 'WebSite',
      name: "TOBIG's 공식 홈페이지",
      url: SITE_URL,
      description:
        'AI·데이터분석 대표 연합 동아리 투빅스 공식 홈페이지',
      publisher: {
        '@type': 'Organization',
        name: "TOBIG's",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="TOBIG's | AI·데이터분석 대표 연합 동아리 투빅스"
        description="AI·데이터분석 대표 연합 동아리 투빅스(TOBIG's) 공식 홈페이지입니다."
        keywords="투빅스, TOBIG's, 데이터 동아리, AI 동아리, 대학생 연합, 머신러닝, 딥러닝, 데이터분석"
        ogImage="https://static.readdy.ai/image/3d684be57ac9d3c5f5a6f09d6e1e16dd/d3a3b8fe502a2e7f15ff63fea79135f8.jpeg?ogv=eooprc"
        ogUrl={SITE_URL}
        schema={homeSchema}
      />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProgramsSection />
        <TracksSection />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}