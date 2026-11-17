import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { RECRUITING_DDAY } from '@/config/recruiting';
import { ApplyLink } from '@/pages/recruiting/page';
import { fetchFaqsFromSheet, type FaqItem } from '@/services/faq';
import { isRecruitingOpen } from '@/utils/dday';
import FaqBear from './FaqBear';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

// 곰의 말: 왼쪽 곰 얼굴 + 말풍선. 답 안의 줄바꿈은 그대로 보인다(시트에서 줄을 나눠 쓸 수 있게).
function BearSays({ children, nod = false }: { children: ReactNode; nod?: boolean }) {
  return (
    <div className="chat-in flex items-start gap-2.5 pr-6 sm:pr-12">
      <span className={`shrink-0 ${nod ? 'bear-nod' : ''}`}>
        <FaqBear className="h-10 w-10" />
      </span>
      <div className="min-w-0 whitespace-pre-line break-words break-keep rounded-2xl rounded-tl-md border border-dark-600/40 bg-dark-800 px-4 py-3 text-[0.9375rem] leading-relaxed text-gray-200">
        {children}
      </div>
    </div>
  );
}

// 곰이 쓰는 중: 시트를 불러오는 동안과 답하기 전 0.6초
const TYPING = (
  <BearSays nod>
    <span className="flex gap-1 py-2">
      {[0, 0.15, 0.3].map((d) => (
        <span key={d} className="chat-dot h-1.5 w-1.5 rounded-full bg-gray-400" style={{ animationDelay: `${d}s` }} />
      ))}
    </span>
  </BearSays>
);

const CHIP =
  'cursor-pointer break-keep [overflow-wrap:anywhere] rounded-full border border-navy-500/50 bg-navy-900/40 px-4 py-2 text-left text-sm font-medium text-navy-50 transition-colors hover:border-navy-400 hover:bg-navy-800/70';

export default function FaqPage() {
  // 질문·답은 구글 시트에서만 온다. null: 불러오는 중, []: 못 불러옴(오류·빈 시트)
  const [faqs, setFaqs] = useState<FaqItem[] | null>(null);
  // 고른 질문들(그 순간의 사본). 남은 질문은 질문 문장으로 거른다(id 는 시트 행 순번이라 기대지 않음).
  const [chat, setChat] = useState<FaqItem[]>([]);
  const [typing, setTyping] = useState(false);
  const latest = useRef<HTMLDivElement>(null);
  const all = useRef<HTMLDialogElement>(null);
  const remaining = (faqs ?? []).filter((f) => !chat.some((c) => c.question === f.question));

  const ask = (faq: FaqItem) => {
    setChat((c) => [...c, faq]);
    setTyping(!matchMedia('(prefers-reduced-motion: reduce)').matches);
  };

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setTyping(false), 600);
    return () => clearTimeout(t);
  }, [typing]);

  // 새 답 + 추천 질문 묶음이 화면 밖일 때만 살짝 따라간다(부드러움은 html 의 scroll-behavior 를 따름 → 움직임 줄이기면 즉시)
  useEffect(() => {
    if (!typing) latest.current?.scrollIntoView({ block: 'nearest' });
  }, [typing, chat.length]);

  useEffect(() => {
    fetchFaqsFromSheet().then(setFaqs, (err) => {
      console.error('구글 시트에서 FAQ 데이터를 불러오지 못했습니다.', err);
      setFaqs([]);
    });
  }, []);

  const faqSchema = faqs?.length
    ? {
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
      }
    : undefined;

  // 곰의 마지막 말 아래 추천 질문: 시트 행 순서대로 3개 + 전체 보기. 곰이 답하는 동안엔 숨긴다.
  const replies = !typing && remaining.length > 0 && (
    <div className="chat-in flex flex-wrap gap-2 pl-[3.125rem]">
      {remaining.slice(0, 3).map((faq) => (
        <button key={faq.id} type="button" onClick={() => ask(faq)} className={CHIP}>
          {faq.question}
        </button>
      ))}
      {remaining.length > 3 && (
        <button type="button" onClick={() => all.current?.showModal()} className={`${CHIP} border-dashed`}>
          <i className="ri-list-unordered mr-1.5 text-navy-300" />
          질문 전체 보기 <span className="text-navy-300">{remaining.length}</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-900">
      <SEO
        title="자주 묻는 질문 | TOBIG's 투빅스"
        description="투빅스에 대해 궁금한 점을 확인하세요. 지원 자격, 면접, 활동 장소, 학기 중 활동 등 자주 묻는 질문에 답변드립니다."
        keywords="투빅스 FAQ, TOBIG's 자주묻는질문, 데이터 동아리 지원, AI 동아리 FAQ"
        ogUrl={`${SITE_URL}/faq`}
        schema={faqSchema}
      />
      {/* FAQ 글꼴(Wanted Sans). 이 페이지에서만 불러온다. precedence 를 주면 CDN 이 느릴 때 페이지 전체가 멈추므로 쓰지 않는다. 받기 전엔 사이트 기본 글꼴 */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 font-['Wanted_Sans_Variable','Noto_Sans_KR',sans-serif]">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <FaqBear className="mx-auto h-20 w-20" />
            <h1 className="font-extrabold tracking-tight text-3xl md:text-5xl text-white mt-4 mb-4">
              자주 묻는 질문
            </h1>
            <p className="break-keep text-gray-400 text-base">
              투빅스에 대해 궁금한 점을 확인해보세요.
            </p>
          </div>

          {/* 대화: 새 말을 스크린리더가 읽어 준다 */}
          <div role="log" aria-live="polite" className="flex flex-col gap-3">
            <BearSays>{'안녕하세요! 투빅이에요.\n투빅스에 대해 궁금한 건 무엇이든 물어보세요.'}</BearSays>
            {!faqs && TYPING}
            {faqs?.length === 0 && (
              <BearSays>{'앗, 질문 목록을 불러오지 못했어요.\n궁금한 점은 아래 카톡으로 물어봐 주세요!'}</BearSays>
            )}
            {chat.length === 0 && replies}
            {chat.map((faq, i) => {
              const last = i === chat.length - 1;
              return (
                <Fragment key={i}>
                  <p className="chat-in max-w-[85%] self-end whitespace-pre-line break-words break-keep rounded-2xl rounded-tr-md bg-navy-600 px-4 py-2.5 text-[0.9375rem] leading-relaxed text-white">
                    {faq.question}
                  </p>
                  {/* 답 + 추천 질문 한 묶음. scroll-mt: 고정 메뉴바(h-16 / md:h-20)에 가리지 않게 */}
                  <div ref={last ? latest : undefined} className="flex scroll-mb-4 scroll-mt-20 flex-col gap-3 md:scroll-mt-24">
                    {last && typing ? TYPING : <BearSays>{faq.answer}</BearSays>}
                    {last && replies}
                  </div>
                </Fragment>
              );
            })}
            {!typing && chat.length > 0 && remaining.length === 0 && (
              <BearSays>{'궁금한 건 다 풀리셨나요?\n더 궁금한 점은 카톡으로 편하게 물어봐 주세요!'}</BearSays>
            )}
          </div>

          {/* 남은 질문 전체: 휴대폰은 아래에서 올라오는 시트, 넓은 화면은 가운데 창. Esc·바깥 클릭으로 닫힘 */}
          <dialog
            ref={all}
            aria-label="질문 전체 보기"
            onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
            className="mb-0 mt-auto max-h-[75dvh] w-full max-w-none overscroll-contain rounded-t-3xl border border-dark-600/50 bg-dark-800 p-0 text-gray-100 backdrop:bg-black/60 sm:m-auto sm:max-w-lg sm:rounded-3xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-dark-600/40 bg-dark-800 py-2 pl-5 pr-2">
              <h2 className="font-bold">
                질문 전체 보기 <span className="text-navy-300">{remaining.length}</span>
              </h2>
              <button
                type="button"
                onClick={() => all.current?.close()}
                aria-label="닫기"
                className="cursor-pointer rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>
            <div className="divide-y divide-dark-600/40">
              {remaining.map((faq) => (
                <button
                  key={faq.id}
                  type="button"
                  onClick={() => {
                    all.current?.close();
                    ask(faq);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 break-keep [overflow-wrap:anywhere] px-5 py-3.5 text-left text-[0.9375rem] font-medium text-navy-50 transition-colors hover:bg-navy-900/80"
                >
                  {faq.question}
                  <i className="ri-arrow-right-s-line text-lg text-navy-400" />
                </button>
              ))}
            </div>
          </dialog>

          {/* Bottom CTA */}
          <div className="mt-14 border-t border-dark-600/40 pt-10 text-center">
            <p className="text-gray-500 text-sm mb-4">원하는 답을 찾지 못하셨나요?</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://pf.kakao.com/_QyxiDxb"
                target="_blank"
                rel="nofollow noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-8 py-3.5 text-[0.9375rem] font-semibold text-gray-200 transition-colors hover:border-white/40 hover:bg-white/5"
              >
                <i className="ri-kakao-talk-fill text-yellow-300" />
                카톡으로 문의하기
              </a>
              {isRecruitingOpen(Date.now(), RECRUITING_DDAY) && <ApplyLink />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
