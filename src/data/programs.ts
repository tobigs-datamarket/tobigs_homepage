import { EXTERNAL_PROJECT_URL } from '@/config/links';

// Only facts already written elsewhere in the repo (old card text, src/mocks/notices.ts, curriculum page).
// Unknown fields stay empty and are not rendered until the club fills them in.
export interface Program {
  slug: string;
  emoji: string;
  title: string;
  summary: string;
  cadence?: string; // when / how long
  output?: string; // what comes out of it
  href?: string; // only when a real destination exists
  external?: boolean;
  linkLabel?: string;
  image: string; // 800×450 webp in public/images/programs
}

const img = (slug: string) => `/images/programs/${slug}.webp`;

export const programs: Program[] = [
  {
    slug: 'regular-session',
    emoji: '📚',
    title: '정규 세션',
    summary: '공통 기초(AI·데이터 분석) 학습 후 트랙별 심화 커리큘럼 진행',
    cadence: '격주 토요일 14:00~17:00', // notices: 26기 모집 공지 · curriculum 안내 사항
    href: '/curriculum',
    linkLabel: '커리큘럼 보기',
    image: img('regular-session'),
  },
  {
    slug: 'advanced-session',
    emoji: '🔬',
    title: '심화세션',
    summary: '관심 도메인을 바탕으로 심화 기술을 적용하며, 공모전 수상, 논문 리뷰 등 다양한 결과물 생성',
    cadence: '격주 토요일', // notices: 26기 모집 공지
    output: '공모전 수상 · 논문 리뷰', // from the summary
    href: '/awards',
    linkLabel: '수상 기록 보기',
    image: img('advanced-session'),
  },
  {
    slug: 'alumni-talk',
    emoji: '🤝',
    title: '선배와의 만남',
    summary: '현업 선배를 초청해 학습 가이드 및 진로 탐색 기회 제공',
    image: img('alumni-talk'),
  },
  {
    slug: 'hackathon',
    emoji: '⚡',
    title: '인하우스 해커톤',
    summary: '투빅스 자체 해커톤으로 팀 단위 실전 문제 해결 경험',
    image: img('hackathon'),
  },
  {
    slug: 'homecoming',
    emoji: '🏠',
    title: '홈커밍데이',
    summary: '졸업한 선배들과 네트워킹하며 유대를 쌓고 성장 인사이트를 나누는 자리',
    image: img('homecoming'),
  },
  {
    slug: 'conference',
    emoji: '🎤',
    title: '컨퍼런스',
    summary: '매 학기 팀별로 관심 주제를 선정해 데이터·AI 프로젝트 결과를 발표',
    cadence: '매 학기', // from the summary
    output: '프로젝트 결과 발표', // from the summary
    href: EXTERNAL_PROJECT_URL, // project archive, not a conference page — label says so
    external: true,
    linkLabel: '발표 프로젝트 보기 (Notion)',
    image: img('conference'),
  },
  {
    slug: 'mixup-datathon',
    emoji: '🔥',
    title: 'MIX-UP DATATHON',
    summary: '다양한 데이터·AI 동아리와 공동 기획하는 1박 2일 연합 해커톤',
    cadence: '1박 2일', // from the summary
    image: img('mixup-datathon'),
  },
  {
    slug: 'others',
    emoji: '🌐',
    title: '기타 활동',
    summary: '주한미국대사관 TechCamp, AI 엑스포 등 외부 행사에 참가하고, 소모임을 통해 동아리원들과 다양한 활동을 진행',
    image: img('others'),
  },
];
