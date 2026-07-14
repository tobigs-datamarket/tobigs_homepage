export interface Testimonial {
  id: number;
  text: string;
  generation: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: '투빅스에서의 1년이 제 커리어의 가장 큰 전환점이었습니다. 단순히 지식을 배우는 것을 넘어, 함께 문제를 해결하는 방법을 배웠습니다. 매 세션마다 새로운 인사이트를 얻을 수 있었고, 지금 현업에서도 그 경험이 큰 도움이 되고 있습니다.',
    generation: '15기',
    name: '김민준',
    role: '데이터 엔지니어',
    company: '카카*',
  },
  {
    id: 2,
    text: '비전공자였던 저도 투빅스 덕분에 AI 개발자로 성장할 수 있었습니다. 체계적인 커리큘럼과 따뜻한 팀원들 덕분에 어렵지 않게 입문할 수 있었어요. 선배들의 멘토링도 정말 큰 도움이 됐습니다.',
    generation: '16기',
    name: '이서연',
    role: 'ML Engineer',
    company: '네**',
  },
  {
    id: 3,
    text: '컨퍼런스 준비 과정이 정말 값진 경험이었어요. 처음에는 막막했지만, 팀원들과 밤새 토론하고 발표를 완성했을 때의 성취감은 잊을 수 없습니다. 그 과정에서 데이터를 다루는 진짜 실력이 생겼습니다.',
    generation: '17기',
    name: '박지훈',
    role: '데이터 사이언티스트',
    company: '삼* SDS',
  },
  {
    id: 4,
    text: '투빅스에서 만난 사람들이 지금도 제 가장 소중한 인맥입니다. 함께 공모전에 나가고, 서로의 성장을 응원하면서 자연스럽게 만들어진 네트워크가 지금도 든든한 버팀목이 되고 있어요.',
    generation: '18기',
    name: '최수아',
    role: 'AI Research Engineer',
    company: 'L* AI Research',
  },
  {
    id: 5,
    text: 'MIX-UP 데이터톤에서 다른 동아리 분들과 협업한 경험이 정말 특별했습니다. 다양한 시각과 방법론이 충돌하면서 더 나은 결과가 나오는 걸 직접 체험했어요. 실무에서도 이 경험이 협업 능력 향상에 큰 역할을 하고 있습니다.',
    generation: '19기',
    name: '정도윤',
    role: '데이터 분석가',
    company: '토*',
  },
];