import { Fragment, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/SEO';
import { formatNoticeDate, useNotices } from '@/services/notices';
import { CategoryTag, LoadError } from '@/pages/notices/page';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

// ── 본문 표기법 (구글 시트 content 칸) ──────────────────────────
// "## 소제목"  /  "- 항목"(또는 *, •)  /  이미지 주소나 드라이브 공유 링크만 있는 줄 → 이미지
// 그 밖의 줄은 문단, 빈 줄로 문단을 나눈다. 본문 속 URL은 자동으로 링크가 된다.
type Block =
  | { type: 'heading' | 'image'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'paragraph'; lines: string[] };

const HEADING = /^#{1,3}\s+/;
const LIST_ITEM = /^[-*•]\s+/;
const URL_PATTERN = /(https?:\/\/[^\s<>()]*[^\s<>().,!?'"])/g;

// 구글 드라이브 공유 링크는 이미지 주소로 바꾸고, 이미지 파일 주소는 그대로 쓴다
function toImageSrc(line: string): string | null {
  if (!/^(https?:\/\/|\/)\S+$/.test(line)) return null;
  const driveId = line.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:\S*&)?id=)([\w-]+)/)?.[1];
  if (driveId) return `https://lh3.googleusercontent.com/d/${driveId}`;
  return /\.(png|jpe?g|gif|webp)(\?\S*)?$/i.test(line) ? line : null;
}

function toBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  let afterBlank = true;
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    const last = blocks[blocks.length - 1];
    const imageSrc = toImageSrc(line);
    if (!line) {
      afterBlank = true;
      continue;
    }
    if (HEADING.test(line)) blocks.push({ type: 'heading', text: line.replace(HEADING, '') });
    else if (imageSrc) blocks.push({ type: 'image', text: imageSrc });
    else if (LIST_ITEM.test(line)) {
      const item = line.replace(LIST_ITEM, '');
      if (last?.type === 'list') last.items.push(item);
      else blocks.push({ type: 'list', items: [item] });
    } else if (last?.type === 'paragraph' && !afterBlank) last.lines.push(line);
    else blocks.push({ type: 'paragraph', lines: [line] });
    afterBlank = false;
  }
  return blocks;
}

function linkify(text: string): ReactNode[] {
  return text.split(URL_PATTERN).map((part, i) =>
    i % 2 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-navy-300 underline decoration-navy-300/40 underline-offset-4 hover:decoration-navy-300"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function NoticeBody({ content }: { content: string }) {
  return (
    <div className="pt-8 text-[15px] md:text-base leading-[1.85] text-gray-300 break-keep">
      {toBlocks(content).map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={i} className="mt-10 mb-3 text-lg font-semibold text-white first:mt-0">
                {block.text}
              </h2>
            );
          case 'image':
            return (
              <figure key={i} className="my-8 overflow-hidden rounded-xl border border-dark-600/50">
                <img
                  src={block.text}
                  alt="공지 이미지"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto"
                  // 링크가 잘못됐거나 공유가 꺼진 이미지는 깨진 아이콘 대신 숨긴다
                  onError={(e) => e.currentTarget.parentElement?.classList.add('hidden')}
                />
              </figure>
            );
          case 'list':
            return (
              <ul key={i} className="my-4 list-disc space-y-1.5 pl-5 marker:text-navy-400">
                {block.items.map((item, j) => (
                  <li key={j}>{linkify(item)}</li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className={`my-4 first:mt-0 ${block.lines[0].startsWith('※') ? 'text-sm text-gray-500' : ''}`}>
                {block.lines.map((line, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br />}
                    {linkify(line)}
                  </Fragment>
                ))}
              </p>
            );
        }
      })}
    </div>
  );
}

const toSummary = (content: string) =>
  content.replace(/^#+\s*/gm, '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { notices, failed, retry } = useNotices();
  const notice = notices?.find((n) => n.id === id);

  if (notices && !notice) {
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

  return (
    <div className="min-h-screen bg-dark-900">
      {notice ? (
        <SEO
          title={`${notice.title} | TOBIG's 공지사항`}
          description={toSummary(notice.content)}
          keywords="투빅스 공지, TOBIG's 소식, 데이터 동아리 공지"
          ogUrl={`${SITE_URL}/notices/${notice.id}`}
          schema={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: notice.title,
            description: toSummary(notice.content),
            url: `${SITE_URL}/notices/${notice.id}`,
            author: { '@type': 'Organization', name: "TOBIG's" },
            publisher: {
              '@type': 'Organization',
              name: "TOBIG's",
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` },
            },
            datePublished: notice.date,
            articleSection: '공지사항',
            inLanguage: 'ko',
          }}
        />
      ) : (
        <SEO title="공지사항 | TOBIG's 투빅스" description="투빅스 공지사항" />
      )}
      <Navbar />

      <main className="pt-24 md:pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <Link
            to="/notices"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-300"
          >
            <i className="ri-arrow-left-line" />
            공지사항
          </Link>

          {failed ? (
            <div className="mt-8">
              <LoadError onRetry={retry} />
            </div>
          ) : notice ? (
            <article className="mt-8">
              <header className="border-b border-dark-500/70 pb-8">
                <div className="flex items-center gap-3">
                  <CategoryTag category={notice.category} />
                  {notice.isPinned && (
                    <span className="flex items-center gap-1 text-xs text-navy-300">
                      <i className="ri-pushpin-2-fill" />
                      고정 공지
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-2xl md:text-[2rem] font-bold leading-snug tracking-tight text-white break-keep">
                  {notice.title}
                </h1>
                <p className="mt-4 text-sm text-gray-500">
                  <time dateTime={notice.date} className="tabular-nums">
                    {formatNoticeDate(notice.date)}
                  </time>
                  <span className="mx-2 text-dark-500">|</span>
                  투빅스 운영진
                </p>
              </header>

              <NoticeBody content={notice.content} />

              <footer className="mt-16 flex justify-center border-t border-dark-500/70 pt-8">
                <Link
                  to="/notices"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:border-white/30 hover:bg-white/5"
                >
                  <i className="ri-list-unordered" />
                  목록으로
                </Link>
              </footer>
            </article>
          ) : (
            <div className="mt-8 border-b border-dark-500/70 pb-8" aria-label="공지사항을 불러오는 중">
              <div className="h-6 w-12 rounded-md bg-dark-700" />
              <div className="mt-4 h-8 w-3/4 rounded bg-dark-700" />
              <div className="mt-4 h-4 w-32 rounded bg-dark-700" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
