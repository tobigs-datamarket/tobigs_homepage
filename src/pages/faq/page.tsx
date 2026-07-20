import { useEffect, useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { fetchFaqsFromSheet, type FaqItem } from '@/services/faq';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

const fallbackFaqs: FaqItem[] = [
  {
    id: 1,
    question: '관련 지식이 없어도 지원할 수 있나요?',
    answer:
      '관련 분야에 지식이 많지 않더라도, 인공지능 및 데이터 분석 분야에 대한 풍부한 관심과 열정을 가진 분들을 모집하고 있습니다. 실제로 베이스가 없는 분들도 열심히 활동하고 있으니, 걱정보다는 열정을 보여주세요!',
  },
  {
    id: 2,
    question: '코딩테스트를 보나요?',
    answer: '코딩테스트는 별도로 진행하지 않습니다.',
  },
  {
    id: 3,
    question: '면접 날짜를 선택할 수 있나요?',
    answer:
      '면접 날짜를 선택할 수 있나요? 다만, 면접 시간은 가능한 한 조정하여 원하는 시간대에 맞춰 드릴 수 있습니다.',
  },
  {
    id: 4,
    question: '모든 활동이 대면으로 진행되나요?',
    answer:
      '활동은 대부분 대면으로 진행되지만, 상황에 따라 비대면으로 진행될 수도 있습니다. 구체적인 일정은 사전에 공지됩니다.',
  },
  {
    id: 5,
    question: '활동장소는 어디인가요?',
    answer:
      '기본적으로 서울 내에서 모임이 이루어집니다. 자세한 지역은 상황에 따라 달라지며 사전에 공지됩니다.',
  },
  {
    id: 6,
    question: '학기 중 시험 기간에도 활동을 하나요?',
    answer:
      '학기 중 시험 기간에는 투표를 통해 쉬는 기간을 정하며, 약 1~2주 정도의 휴식 기간을 갖게 됩니다.',
  },
  {
    id: 7,
    question: 'OT와 컨퍼런스는 어떻게 진행되나요?',
    answer:
      'OT와 컨퍼런스는 오프라인으로 진행될 예정입니다. 자세한 일정은 투빅스 모집 포스터를 참고해 주세요.',
  },
  {
    id: 8,
    question: '군필자만 지원이 가능한가요?',
    answer:
      '아닙니다! 남성의 경우 전역자, 면제 및 연구 등의 대체복무 예정자 혹은 1년간 활동이 가능한 분도 지원할 수 있습니다.',
  },
  {
    id: 9,
    question: '연령 제한 혹은 학기 제한이 있나요?',
    answer:
      '대학생 혹은 대학원생이면 나이에 상관없이 지원 가능합니다. 현재 활동하고 있는 투빅이들을 살보면 20대 초반부터 후반까지 다양하게 분포되어 있습니다.',
  },
];

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  useEffect(() => {
    let cancelled = false;

    fetchFaqsFromSheet()
      .then((data) => {
        if (!cancelled && data.length > 0) setFaqs(data);
      })
      .catch((err) => {
        console.error('구글 시트에서 FAQ 데이터를 불러오지 못해 기본 데이터를 표시합니다.', err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="자주 묻는 질문 | TOBIG's 투빅스"
        description="투빅스에 대해 궁금한 점을 확인하세요. 지원 자격, 면접, 활동 장소, 학기 중 활동 등 자주 묻는 질문에 답변드립니다."
        keywords="투빅스 FAQ, TOBIG's 자주묻는질문, 데이터 동아리 지원, AI 동아리 FAQ"
        ogUrl={`${SITE_URL}/faq`}
        schema={faqSchema}
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">FAQ</span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-4">
              자주 묻는 질문
            </h1>
            <p className="text-gray-400 text-base">
              투빅스에 대해 궁금한 점을 확인해보세요.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-dark-800 border rounded-xl overflow-hidden transition-all duration-200 ${
                    isOpen ? 'border-navy-700/50' : 'border-dark-600/40 hover:border-dark-500/60'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-navy-500 font-display font-bold text-sm mt-0.5 flex-shrink-0">
                        Q{faq.id}.
                      </span>
                      <span className={`text-sm md:text-base font-medium transition-colors ${isOpen ? 'text-white' : 'text-gray-200'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 ml-3 rounded-full transition-all ${isOpen ? 'bg-navy-600/30 rotate-180' : 'bg-dark-700/60'}`}>
                      <i className="ri-arrow-down-s-line text-gray-400 text-base" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 md:px-6 pb-5 border-t border-dark-600/30">
                      <div className="flex gap-3 pt-4">
                        <span className="text-navy-400 font-display font-bold text-sm flex-shrink-0">A.</span>
                        <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">원하는 답변을 찾지 못하셨나요?</p>
            <a
              href="https://pf.kakao.com/_QyxiDxb"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-dark-700 hover:bg-navy-800 border border-dark-600/40 hover:border-navy-700/40 text-gray-300 hover:text-white font-medium rounded-full text-sm transition-all whitespace-nowrap"
            >
              <i className="ri-question-answer-line" />
              추가 문의하기
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}