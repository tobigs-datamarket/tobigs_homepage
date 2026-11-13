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
  { week: '1주차', topic: 'ML & DL', description: '트리 앙상블, MLP', isCommon: true },
  { week: '2주차', topic: 'NLP', description: '임베딩, Attention', isCommon: true },
  { week: '3주차', topic: 'Transformer', description: 'Self-Attention, BERT·GPT', isCommon: true },
  { week: '4주차', topic: 'Time Series', description: 'ARIMA, TSFM', isCommon: true },
  { week: '5주차', topic: 'Data Modeling', description: '이벤트 로그 설계, 윈도우 함수', isCommon: true },
  { week: '6주차', topic: 'Metrics & Data Mart', description: '북극성 지표, 메트릭 트리' },
  { week: '7주차', topic: 'Growth Analytics', description: '코호트, LTV' },
  { week: '8주차', topic: 'Data Storytelling', description: '시각화 원칙, 대시보드 설계' },
  { week: '9주차', topic: 'Casual Inference', description: 'A/B 테스트, DiD' },
  { week: '10주차', topic: '심화세션 발표회', description: '', isCommon: true },
];

export const aiCurriculum: CurriculumWeek[] = [
  { week: '1주차', topic: 'ML & DL', description: '트리 앙상블, MLP', isCommon: true },
  { week: '2주차', topic: 'NLP', description: '임베딩, Attention', isCommon: true },
  { week: '3주차', topic: 'Transformer', description: 'Self-Attention, BERT·GPT', isCommon: true },
  { week: '4주차', topic: 'Time Series', description: 'ARIMA, TSFM', isCommon: true },
  { week: '5주차', topic: 'Generative Model', description: 'VAE, Diffusion', isCommon: true },
  { week: '6주차', topic: 'Multimodal', description: 'CLIP, VLM' },
  { week: '7주차', topic: 'LLM Engineering', description: 'LoRA, RAG' },
  { week: '8주차', topic: 'RL & Alignment', description: 'PPO, RLHF' },
  { week: '9주차', topic: 'AI in Production', description: 'MLOps, LLM 서빙' },
  { week: '10주차', topic: '심화세션 발표회', description: '', isCommon: true },
];