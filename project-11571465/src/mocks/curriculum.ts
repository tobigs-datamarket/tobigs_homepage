export interface CurriculumWeek {
  week: string;
  topic: string;
  description: string;
  isCommon?: boolean;
}

export interface TechStackItem {
  name: string;
  logo?: string;
  icon?: string;
  logoFilter?: string;
}

export interface TechStackCategory {
  title: string;
  colorClass: string;
  items: TechStackItem[];
}

export const dataTrackTechStack: TechStackCategory[] = [
  {
    title: '수집',
    colorClass: 'text-blue-400',
    items: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Selenium', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg' },
      { name: 'Kafka', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg' },
      { name: 'BeautifulSoup', icon: '🍲' },
    ],
  },
  {
    title: '분석',
    colorClass: 'text-emerald-400',
    items: [
      { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
      { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
      { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg' },
      { name: 'SQL', icon: '🗄️' },
    ],
  },
  {
    title: '시각화',
    colorClass: 'text-amber-400',
    items: [
      { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg' },
      { name: 'Plotly', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/plotly/plotly-original.svg' },
      { name: 'Grafana', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg' },
      { name: 'Streamlit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg' },
    ],
  },
  {
    title: '통계 모델링',
    colorClass: 'text-purple-400',
    items: [
      { name: 'Scikit-learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'Statsmodels', icon: '📐' },
      { name: 'XGBoost', icon: '⚡' },
    ],
  },
];

export const aiTrackTechStack: TechStackCategory[] = [
  {
    title: '데이터',
    colorClass: 'text-blue-400',
    items: [
      { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
      { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
      { name: 'Spark', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg' },
      { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg' },
      { name: 'SQL', icon: '🗄️' },
      { name: 'Seaborn', icon: '🌊' },
    ],
  },
  {
    title: 'ML / DL',
    colorClass: 'text-emerald-400',
    items: [
      { name: 'Scikit-learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
      { name: 'XGBoost', icon: '⚡' },
    ],
  },
  {
    title: '언어 모델',
    colorClass: 'text-amber-400',
    items: [
      { name: 'OpenAI API', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', logoFilter: 'invert(1)' },
      { name: 'HuggingFace', icon: '🤗' },
      { name: 'LangChain', icon: '⛓️' },
      { name: 'Pinecone', icon: '🌲' },
    ],
  },
  {
    title: '심화 · 실무',
    colorClass: 'text-purple-400',
    items: [
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'Streamlit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg' },
      { name: 'Airflow', icon: '🌬️' },
      { name: 'MLflow', icon: '📊' },
    ],
  },
];

export const dataCurriculum: CurriculumWeek[] = [
  { week: '1주차', topic: '데이터·수학 기초', description: '기초선형대수, 데이터 엔지니어링', isCommon: true },
  { week: '2주차', topic: 'DA 추론', description: 'EDA & 기술통계, 통계적 추론 & 회귀분석', isCommon: true },
  { week: '3주차', topic: 'AI 기초', description: 'ML, DL', isCommon: true },
  { week: '4주차', topic: '순서 데이터', description: 'Transformer, Time series', isCommon: true },
  { week: '5주차', topic: '생성형 AI', description: 'GEN AI, LLM', isCommon: true },
  { week: '6주차', topic: 'SQL & 데이터베이스', description: 'SQL 심화 및 데이터 모델링' },
  { week: '7주차', topic: '데이터 시각화', description: 'Tableau / Power BI' },
  { week: '8주차', topic: '비즈니스 분석', description: '그로스 분석 & 지표 설계' },
  { week: '9주차', topic: '실험 설계', description: 'A/B 테스트 설계' },
  { week: '10주차', topic: 'AI 트렌드와 실무 적용', description: '', isCommon: true },
];

export const aiCurriculum: CurriculumWeek[] = [
  { week: '1주차', topic: '데이터·수학 기초', description: '기초선형대수, 데이터 엔지니어링', isCommon: true },
  { week: '2주차', topic: 'DA 추론', description: 'EDA & 기술통계, 통계적 추론 & 회귀분석', isCommon: true },
  { week: '3주차', topic: 'AI 기초', description: 'ML, DL', isCommon: true },
  { week: '4주차', topic: '순서 데이터', description: 'Transformer, Time series', isCommon: true },
  { week: '5주차', topic: '생성형 AI', description: 'GEN AI, LLM', isCommon: true },
  { week: '6주차', topic: '이미지 데이터', description: 'Computer Vision' },
  { week: '7주차', topic: '멀티모달', description: '멀티모달' },
  { week: '8주차', topic: '모델 해석과 운영', description: 'XAI, MLOps & DB' },
  { week: '9주차', topic: 'AI 응용·심화', description: '추천시스템 & GNN, 강화학습' },
  { week: '10주차', topic: 'AI 트렌드와 실무 적용', description: '', isCommon: true },
];