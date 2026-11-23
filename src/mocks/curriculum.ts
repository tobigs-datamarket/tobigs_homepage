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
  { week: '5주차', topic: 'Data Modeling', description: '이벤트 로그 설계, 윈도우 함수'},
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
  { week: '5주차', topic: 'Generative Model', description: 'VAE, Diffusion'},
  { week: '6주차', topic: 'Multimodal', description: 'CLIP, VLM' },
  { week: '7주차', topic: 'LLM Engineering', description: 'LoRA, RAG' },
  { week: '8주차', topic: 'RL & Alignment', description: 'PPO, RLHF' },
  { week: '9주차', topic: 'AI in Production', description: '추천시스템, MLOps' },
  { week: '10주차', topic: '심화세션 발표회', description: '', isCommon: true },
];

export type CurriculumTrack = 'common' | 'data' | 'ai';

export interface CurriculumSpeaker {
  title: string;
  topics: string[];
}

export interface CurriculumStation {
  week: number;
  track: CurriculumTrack;
  title: string;
  /** 노선도 라벨용 (없으면 title) */
  shortTitle?: string;
  speakers: CurriculumSpeaker[];
  /** 초청 강연 교시 (1교시 = 1, 2교시 = 2) — 세부 topic은 비워 둔다 */
  guest?: 1 | 2;
}

export const curriculumStations: CurriculumStation[] = [
  { week: 1, track: 'common', title: 'ML & DL', speakers: [
    { title: 'ML', topics: ['일반화·과적합', '편향-분산', 'L1/L2·교차검증', '트리 앙상블'] },
    { title: 'DL', topics: ['퍼셉트론', '역전파', 'SGD·Adam', 'CNN'] },
  ] },
  { week: 2, track: 'common', title: 'NLP', speakers: [
    { title: '토큰화·임베딩·RNN', topics: ['Subword', 'TF-IDF', 'Word2Vec', 'RNN'] },
    { title: 'LSTM·Seq2Seq·Attention', topics: ['LSTM/GRU', 'Encoder-Decoder', 'Q·K·V'] },
  ] },
  { week: 3, track: 'common', title: 'Transformer', speakers: [
    { title: 'Self-Attention·Encoder-Decoder', topics: ['Multi-Head', 'Positional Encoding', 'Cross-Attention'] },
    { title: 'BERT·GPT·Scaling', topics: ['MLM/CLM', 'ViT', 'Scaling Law', 'Decoding'] },
  ] },
  { week: 4, track: 'common', title: 'Time Series', speakers: [
    { title: '정상성·ARIMA·지수평활', topics: ['분해', 'ADF', 'ACF/PACF', 'SARIMA'] },
    { title: '딥러닝 예측·TSFM·이상탐지', topics: ['LSTM 예측', 'Chronos·TimesFM', 'AE 이상탐지'] },
  ] },
  { week: 5, track: 'data', title: 'Data Modeling', speakers: [
    { title: 'ERD', topics: ['PK/FK', '정규화', '서비스 데이터 모델링'] },
    { title: '이벤트 로그·SQL 윈도우 함수', topics: ['이벤트 스키마', 'CTE', 'ROW_NUMBER·LAG'] },
  ] },
  { week: 6, track: 'data', title: 'Metrics & Data Mart', shortTitle: 'Metrics & Mart', speakers: [
    { title: '북극성 지표·메트릭 트리', topics: ['KPI', 'North Star', "Goodhart's Law", '지표 분해'] },
    { title: '마트 설계', topics: ['Star Schema', 'dbt', 'Semantic Layer'] },
  ] },
  { week: 7, track: 'data', title: 'Growth Analytics', speakers: [
    { title: '퍼널·코호트', topics: ['AARRR', '전환율', '코호트 히트맵'] },
    { title: '리텐션·LTV', topics: ['Day-N 리텐션', 'Churn', 'LTV/CAC'] },
  ] },
  { week: 8, track: 'data', title: 'Data Storytelling', speakers: [
    { title: '시각화 원칙', topics: ['차트 선택', 'Data-Ink Ratio', '인사이트→액션'] },
    { title: '대시보드 설계', topics: ['KPI 카드', 'Drill-down', 'Streamlit'] },
  ] },
  { week: 9, track: 'data', title: 'Causal Inference', speakers: [
    { title: 'A/B 설계·검정력', topics: ['Power Analysis', 'MDE', 'CUPED'] },
    { title: 'DiD', topics: ['준실험설계', 'PSM', 'Parallel Trends', 'RDD·IV'] },
  ] },
  { week: 5, track: 'ai', title: 'Generative AI', speakers: [
    { title: 'VAE·ELBO', topics: ['Autoencoder', 'Reparameterization', 'KL'] },
    { title: 'Diffusion·Flow Matching', topics: ['DDPM', 'CFG', 'Flow Matching'] },
  ] },
  { week: 6, track: 'ai', title: 'Multimodal AI', speakers: [
    { title: 'CLIP·Zero-shot', topics: ['Contrastive Learning', '이미지-텍스트 검색'] },
    { title: 'VLM·Text-to-Image', topics: ['LLaVA', 'VQA', 'Inpainting'] },
  ] },
  { week: 7, track: 'ai', title: 'LLM Engineering', speakers: [
    { title: 'Fine-tuning·LoRA', topics: ['SFT', 'PEFT', 'QLoRA'] },
    { title: 'RAG·AI Agent', topics: ['Vector DB', 'Reranking', 'Tool Calling', 'ReAct'] },
  ] },
  { week: 8, track: 'ai', title: 'Reinforcement Learning & Alignment', shortTitle: 'RL & Alignment', speakers: [
    { title: 'MDP·PPO', topics: ['Bellman', 'Q-Learning', 'Actor-Critic'] },
    { title: 'RLHF·DPO·GRPO', topics: ['Reward Model', 'DPO Loss', 'GRPO'] },
  ] },
  { week: 9, track: 'ai', title: 'AI in Production', speakers: [
    { title: '추천시스템·Retrieval·Ranking', topics: ['Two-Tower', 'CTR 예측', 'Interleaving'] },
    { title: 'MLOps·모니터링', topics: ['MLflow', 'CI/CD', 'Data Drift'] },
  ] },
  { week: 10, track: 'common', title: '심화세션 발표회', speakers: [] },
];
