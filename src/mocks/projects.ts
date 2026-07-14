export interface ProjectMember {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  field: string;
  generation: number;
  conference: string;
  members: string[];
  award?: string;
  thumbnail: string;
  description: string;
  period: string;
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'LLM 기반 금융 리포트 자동 생성 시스템',
    field: 'NLP / 생성AI',
    generation: 24,
    conference: '24기 컨퍼런스',
    members: ['김민준', '이서연', '박지훈'],
    award: '대상',
    thumbnail: 'https://readdy.ai/api/search-image?query=financial%20report%20dashboard%20data%20visualization%20dark%20background%20blue%20charts%20analytics%20professional%20presentation%20slide%20abstract%20minimal&width=600&height=400&seq=proj001&orientation=landscape',
    description: 'GPT-4 기반의 금융 뉴스 및 공시 데이터를 분석하여 자동으로 투자 리포트를 생성하는 시스템. RAG 기술을 활용해 최신 금융 데이터를 실시간으로 반영합니다.',
    period: '2024.03 ~ 2024.06',
  },
  {
    id: 'proj-002',
    title: '음성 감정 인식을 통한 콜센터 품질 관리',
    field: '음성처리',
    generation: 23,
    conference: '23기 컨퍼런스',
    members: ['최수아', '정도윤'],
    award: '최우수상',
    thumbnail: 'https://readdy.ai/api/search-image?query=audio%20waveform%20emotion%20recognition%20machine%20learning%20dark%20background%20visualization%20sound%20wave%20analysis%20technology%20abstract%20minimal&width=600&height=400&seq=proj002&orientation=landscape',
    description: '콜센터 상담 음성 데이터에서 감정을 실시간으로 인식하여 상담 품질을 자동 평가하는 AI 시스템.',
    period: '2023.09 ~ 2023.12',
  },
  {
    id: 'proj-003',
    title: '위성 이미지 기반 도시 변화 감지 모델',
    field: '컴퓨터비전',
    generation: 23,
    conference: '23기 컨퍼런스',
    members: ['이준서', '한승민', '조예린'],
    thumbnail: 'https://readdy.ai/api/search-image?query=satellite%20imagery%20urban%20change%20detection%20deep%20learning%20aerial%20view%20city%20analysis%20technology%20dark%20abstract%20minimal%20background&width=600&height=400&seq=proj003&orientation=landscape',
    description: '다시점 위성 이미지를 분석하여 도시 개발 변화를 감지하고 시각화하는 딥러닝 모델.',
    period: '2023.09 ~ 2023.12',
  },
  {
    id: 'proj-004',
    title: '개인화 뉴스 추천 시스템 with Collaborative Filtering',
    field: '추천시스템',
    generation: 22,
    conference: '22기 컨퍼런스',
    members: ['박현진', '오준혁', '서민준'],
    award: '우수상',
    thumbnail: 'https://readdy.ai/api/search-image?query=news%20recommendation%20system%20collaborative%20filtering%20personalization%20algorithm%20dark%20background%20grid%20layout%20abstract%20minimal%20technology&width=600&height=400&seq=proj004&orientation=landscape',
    description: '사용자의 읽기 패턴과 협업 필터링을 결합한 하이브리드 뉴스 추천 시스템.',
    period: '2023.03 ~ 2023.06',
  },
  {
    id: 'proj-005',
    title: '주식 시장 이상 탐지 및 예측 모델',
    field: '시계열',
    generation: 22,
    conference: '22기 컨퍼런스',
    members: ['윤성민', '정지연'],
    award: '장려상',
    thumbnail: 'https://readdy.ai/api/search-image?query=stock%20market%20anomaly%20detection%20prediction%20time%20series%20data%20visualization%20financial%20chart%20dark%20background%20abstract%20minimal%20blue&width=600&height=400&seq=proj005&orientation=landscape',
    description: 'LSTM과 Transformer를 결합하여 주식 시장의 이상 패턴을 탐지하고 단기 가격을 예측하는 모델.',
    period: '2023.03 ~ 2023.06',
  },
  {
    id: 'proj-006',
    title: '의료 이미지 분류 모델 - 피부 질환 진단',
    field: '컴퓨터비전',
    generation: 21,
    conference: '21기 컨퍼런스',
    members: ['문재원', '신하은', '배성훈'],
    award: '최우수상',
    thumbnail: 'https://readdy.ai/api/search-image?query=medical%20imaging%20AI%20skin%20disease%20diagnosis%20deep%20learning%20classification%20dark%20background%20minimal%20technology%20abstract%20blue&width=600&height=400&seq=proj006&orientation=landscape',
    description: 'CNN 기반 딥러닝 모델을 사용하여 피부 병변 이미지에서 다양한 피부 질환을 자동 분류하는 시스템.',
    period: '2022.09 ~ 2022.12',
  },
];

export const generations = Array.from(new Set(projects.map((p) => p.generation))).sort((a, b) => b - a);
export const awardTypes = ['대상', '최우수상', '우수상', '장려상'];