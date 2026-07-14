export interface AwardItem {
  title: string;
  winner: string;
}

export interface AwardYear {
  year: number;
  items: AwardItem[];
}

export const awardsData: AwardYear[] = [
  {
    year: 2025,
    items: [
      { title: 'MixUP AI Datathon - Track 1: 한국어 맞춤법 교정 프롬프톤 최우수상', winner: '22기 이강진, 23기 지민석, 23기 한다인' },
      { title: 'MixUP AI Datathon - Track 1: 한국어 맞춤법 교정 프롬프톤 우수상', winner: '22기 강연주, 22기 양민지, 23기 임규원' },
      { title: 'MixUP AI Datathon - Track 2: 국내 철강기업 제품 품질 및 공정 데이터 분석 최우수상', winner: '22기 송진하, 22기 김희망, 22기 이호' },
      { title: 'MixUP AI Datathon - Track 2: 국내 철강기업 제품 품질 및 공정 데이터 분석 대상', winner: '22기 우단비, 23기 하정민' },
      { title: 'MixUP AI Datathon - Track 2: 국내 철강기업 제품 품질 및 공정 데이터 분석 우수상', winner: '23기 곽은진, 23기 염승원, 23기 장가람' },
      { title: 'Bias-A-Thon: Bias 대응 챌린지 <Track 2> 특별상', winner: '22기 정환길' },
      { title: '제4회 유통데이터 활용 경진대회 수요예측 부문 대상(산업통상부장관상)', winner: '22기 최수지, 23기 염승원, 23기 하정민, 24기 정연우' },
      { title: '날씨 빅데이터 콘테스트 주제2(소방데이터와 날씨 빅데이터를 융합한 119 신고 건수 예측) 입선', winner: '22기 송수현, 22기 조하늘, 22기 방지현, 22기 강연주, 23기 서동혁, 23기 장가람' },
      { title: '유통데이터 활용 경진대회 생성형 AI 솔루션 부문 우수상', winner: '22기 염승희' },
      { title: '청소년 데이터분석 활용공모전 우수상(청소년활동진흥원)', winner: '23기 임채민' },
      { title: '미디어통계포털 대학생 공모전 최우수상(KISDI 정보통신정책연구원)', winner: '23기 임채민' },
      { title: '스마트 해운물류 x AI 미션 챌린지 울산항만공사 시장상', winner: '17기 장준보' },
      { title: '토스 NEXT ML CHALLENGE: 광고 클릭 예측(CTR) 모델 개발 2위', winner: '17기 장준보' },
      { title: '날씨 빅데이터 콘테스트 장려상(주최/주관: 기상청)', winner: '20기 구자협' },
      { title: '제4회 ETRI 휴먼이해 인공지능 논문경진대회 장려상(주최/주관: 한국전자통신연구원)', winner: '20기 구자협, 21기 이소영' },
      { title: '운수종사자 인지적 특성 데이터를 활용한 교통사고 위험 예측 AI 경진대회 우수상(주최/주관: 행정안전부/한국교통안전공단)', winner: '20기 구자협' },
      { title: 'DATA AI 분석 경진대회(AI 기반 기상 요인 연계 지하수 수위 예측 모델개발 및 해석 연구) 우수상(대구중구청장상)', winner: '22기 정환길, 22기 이호, 22기 최수지' },
    ],
  },
  {
    year: 2024,
    items: [
      { title: 'LG Aimers 제품 이상 여부 판별 프로젝트(LGAI 연구원장상)', winner: '17기 장준보' },
      { title: '생명 연구 자원 AI활용 경진대회: 인공지능 활용 부문 장려상', winner: '17기 장준보' },
      { title: '데이터 및 AI를 활용한 물가 예측 경진대회: 농산물 가격을 중심으로(한국지능정보사회진흥원장상)', winner: '17기 장준보' },
      { title: '노원구 청년 빅데이터 활용 공모전(주최/주관: 노원구청/한국경영인증원) 최우수상', winner: '20기 구자협' },
      { title: '한국전자거래학회 추계학술대회 우수논문상', winner: '20기 구자협' },
      { title: 'DPG AI Challenge 최우수상(2등)', winner: '21기 김민수' },
      { title: '한이음 ICT 멘토링 공모전 동상', winner: '22기 이강진' },
      { title: 'HD 현대 주최 경진대회 본선진출 및 최종 3위', winner: '22기 강현구' },
    ],
  },
  {
    year: 2023,
    items: [
      { title: 'LG 온라인 채널 제품 판매량 예측 AI 오프라인 해커톤 고용노동부장관상', winner: '16기 김권호, 17기 장준보' },
      { title: "데이콘 '제1회 신약개발 AI 경진대회' 과학기술정보통신부 장관상", winner: '17기 장준보' },
      { title: '제주도 특산물 가격 예측 AI 경진대회 우수상', winner: '17기 장준보' },
      { title: '제3회 KOPIS 빅데이터 공모전(빅데이터 분석 부문 3등)', winner: '19기 오유진' },
      { title: '한국보건정보통계학회 추계학술학회 대상', winner: '19기 오유진' },
      { title: '미래에셋 빅데이터 경진대회 생성형 AI 부분 최우수상(최종 2위)', winner: '19기 김윤서' },
      { title: '날씨 빅데이터 대회 입선(top 10)', winner: '19기 김윤서' },
      { title: '데이터 크리에이터 캠프 해커톤(주최/주관: 과학기술정보통신부, 한국지능정보사회진흥원) 우수상', winner: '20기 김지우' },
      { title: 'KSC 학부생/주니어 논문경진대회 최우수상', winner: '' },
    ],
  },
  {
    year: 2022,
    items: [
      { title: 'Stagemix video generation using face and body keypoints detection. Multimedia Tools and Applications', winner: '11기 심은선, 12기 이승현, 12기 조민호, 12기 이유진, 13기 최혜빈, 13기 정민준' },
      { title: '제2회 KOPIS 빅데이터 분석 공모전(주최/주관: 문화체육관광부, 예술경영지원센터) 1등', winner: '17기 김정민' },
      { title: '2022 Samsung AI Challenge(3D Metrology) 최우수상(주최/주관: 삼성전자 종합기술원)', winner: '17기 장준보' },
      { title: '제7회 롯데멤버스 빅데이터 공모전 장려상(주최/주관: 롯데멤버스)', winner: '18기 지윤혁' },
      { title: '대국민 물 빅데이터 공모전 우수상(주최/주관: k-water)', winner: '17기 신은아, 17기 염제윤' },
      { title: '산학프로젝트챌린지 한국기술진흥원장상(주최/주관: 한국산업기술진흥원)', winner: '17기 박나윤' },
      { title: '제2회 K-인공지능 제조데이터 분석 경진대회 중소벤처기업부 장관상', winner: '17기 김현태' },
      { title: '제4회 공공 데이터 분석 활용대회 우수상', winner: '18기 김성훈' },
      { title: 'KSC2022 학부생/주니어 논문경진대회 장려상', winner: '19기 조성민' },
      { title: 'LG AI Research/LG Aimers 오프라인 해커톤 우수상(최종3위)', winner: '19기 이동우' },
      { title: 'KSIE2022 춘계학술대회 대학생프로젝트 경진대회 우수상', winner: '19기 이동우' },
      { title: '신한AI, 보다 나은 금융 생활을 위한 AI 서비스 아이디어 경진대회 최종 5위(입선)', winner: '18기 김희경, 19기 이동우' },
    ],
  },
  {
    year: 2021,
    items: [
      { title: '제1회 NH투자증권 빅데이터 경진대회 입선상', winner: '12기 김태욱, 12기 신윤종, 13기 이재빈' },
      { title: '국토도시 데이터 분석과제 최우수상', winner: '13기 이재빈' },
      { title: '날씨 빅데이터 콘테스트 최우수상(환경부장관상)', winner: '13기 이재빈, 14기 이혜린' },
      { title: '날씨 빅데이터 콘테스트 특별상', winner: '13기 이재빈, 14기 이혜린' },
      { title: '제1회 NH투자증권 빅데이터 경진대회 League 2 3위(장려상)', winner: '15기 김현지' },
      { title: '빅콘테스트 데이터분석분야 챔피언리그 최우수상(한국해양수산개발원장상)', winner: '14기 이정은, 15기 김동현, 15기 오주영, 15기 조준혁' },
      { title: '빅콘테스트 데이터분석분야 챔피언리그 최우수상(스포츠투아이대표이사상)', winner: '15기 이수민' },
      { title: '빅콘테스트 데이터분석분야 퓨처스리그 최우수상(수자원공사장상)', winner: '16기 김권호' },
      { title: 'LH COMPAS 대전시 교통사고 위험지역 도출 대회 최우수상', winner: '16기 김권호' },
      { title: '제1회 UNIST-KAIST-POSTECH 데이터사이언스 경진대회', winner: '16기 김건우' },
      { title: '해양수산 빅데이터 분석 경진대회 최우수상(울산항만공사사장상)', winner: '16기 김건우' },
      { title: '한국컴퓨터종합학술대회(KCC2021) 학부생논문경진대회(인공지능) 장려상', winner: '16기 장준원' },
      { title: '지능정보학회 춘계 학술대회 우수상', winner: '16기 전민진' },
      { title: '해양수산 빅데이터 경진대회(주최/주관: 해양수산부, UNIST) 최우수상', winner: '15기 김태희' },
      { title: '공군해커톤(주최/주관: 대한민국공군) 장려상', winner: '15기 김태희' },
      { title: '데이터 크리에이터 캠프 해커톤(주최/주관: 과학기술정보통신부, 한국지능정보사회진흥원) 대상', winner: '15기 김태희' },
    ],
  },
  {
    year: 2020,
    items: [
      { title: 'Factory Hack Korea(공정 제조 데이터 분석 대회) 대상', winner: '' },
      { title: '국도교통 빅데이터 해커톤 우수상(한국도로공사사장상)', winner: '' },
      { title: 'KISA-신한카드 금융 데이터톤 경진대회 우수상', winner: '' },
      { title: '오픈소스 컨트리뷰톤 정보통신산업진흥원장상', winner: '' },
      { title: 'Hand In Hand Challenge 대상', winner: '' },
      { title: '제8회 K-해커톤(주최/주관: 과학기술정보통신부, 소프트웨어교육혁신센터) 장려상', winner: '15기 김태희' },
      { title: 'MZ-CEC 감정대화분류 해커톤(주최/주관: 한국지능정보사회진흥원, 미디어젠) 우수상', winner: '15기 김태희' },
      { title: '삼성카드 데이터분석 경진대회(주최/주관: 삼성카드) 3위', winner: '15기 김태희' },
    ],
  },
  {
    year: 2019,
    items: [
      { title: 'SAMSUNG Brightics 공모전 AI 사업 기획 부문 3등', winner: '' },
      { title: '제8회 문화·관광 빅 데이터 분석대회 은상(신한카드 특별상)', winner: '' },
      { title: 'KPX(전력거래소) 재생에너지 발전량 예측 경진대회 장려상', winner: '' },
    ],
  },
  {
    year: 2018,
    items: [
      { title: '빅콘테스트 Analysis 분야 챔피언리그 최우수상 한국정보화진흥원장상', winner: '' },
      { title: '제2회 미래에셋증권 빅데이터 페스티벌 장려상', winner: '' },
      { title: '제7회 문화·관광 빅 데이터 분석대회 은상', winner: '' },
      { title: '정보보호 R&D 데이터 챌린지 3등', winner: '' },
      { title: '제1회 우정사업본부 데이터사이언스 빅데이터 해커톤 우수상', winner: '' },
    ],
  },
  {
    year: 2017,
    items: [
      { title: '제1회 미래에셋증권 빅데이터 페스티벌 장려상', winner: '' },
    ],
  },
  {
    year: 2016,
    items: [
      { title: '제2회 L.Point Bigdata Competition 특별상', winner: '' },
      { title: '제1회 데이터 시각화 대학생 Case Competition 공모전 우수상', winner: '' },
      { title: '신한은행 고객 아이디어 공모전 우수상', winner: '' },
      { title: '날씨 빅데이터 콘테스트 한국기상산업진흥원장상', winner: '' },
      { title: '빅콘테스트 퓨처스리그 한국정보통신진흥협회 회장상', winner: '' },
      { title: '제14회 SAS 분석 챔피언십 동상', winner: '' },
      { title: '제14회 SAS 분석 챔피언십 HIRA상(심평원 상)', winner: '' },
    ],
  },
  {
    year: 2015,
    items: [
      { title: '제1회 Bigdata Analytics Festival(BAF) 장려상', winner: '' },
      { title: '제2회 빅데이터 마케팅 분석보고서 공모전 대상', winner: '' },
      { title: '제3회 빅콘테스트 챔피언리그 미래창조과학부장관상(1위)', winner: '' },
    ],
  },
];