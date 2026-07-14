import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { awardsData } from '@/mocks/awards';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

export default function AwardsPage() {
  const awardsList = awardsData.flatMap((yearData) =>
    yearData.items.map((item) => ({
      '@type': 'ListItem',
      name: item.title,
      description: `${item.winner} - ${yearData.year}년`,
    }))
  );

  const awardsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: "TOBIG's 수상 기록",
    itemListElement: awardsList,
    numberOfItems: awardsList.length,
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="수상 기록 | TOBIG's 투빅스"
        description="투빅스의 수상 기록을 확인하세요. 2015년부터 현재까지 90회 이상의 대회 수상 실적을 보유하고 있습니다."
        keywords="투빅스 수상, 데이터분석 대회, AI 대회, 머신러닝 경진대회, 수상 실적"
        ogUrl={`${SITE_URL}/awards`}
        schema={awardsSchema}
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Awards</span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-4">
              수상 기록
            </h1>
            <p className="text-gray-400 text-base">
              2015년부터 현재까지 <strong className="text-navy-300">90+</strong>회 수상 실적
            </p>
          </div>

          {/* Awards by Year */}
          <div className="space-y-8">
            {awardsData.map((yearData) => (
              <div key={yearData.year} className="group">
                {/* Year Header */}
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-display font-bold text-xl md:text-2xl text-white">
                    {yearData.year}
                  </h2>
                  <div className="flex-1 h-px bg-dark-600/50" />
                  <span className="text-gray-500 text-xs">{yearData.items.length}건</span>
                </div>

                {/* Awards List */}
                <div className="bg-dark-800 border border-dark-600/40 rounded-xl overflow-hidden">
                  {yearData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 px-5 py-4 hover:bg-dark-700/30 transition-colors ${
                        idx !== yearData.items.length - 1 ? 'border-b border-dark-600/30' : ''
                      }`}
                    >
                      <span className="text-navy-500 mt-0.5 flex-shrink-0">•</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-gray-200 text-sm font-medium leading-snug">
                            {item.title}
                          </span>
                          <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">
                            {item.winner}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}