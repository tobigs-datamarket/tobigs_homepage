// 홈 히어로 아래 "지원 마감 D-day" 띠 설정. 날짜·문구·링크는 이 파일에서만 바꾼다.
// - 시각은 반드시 한국 시간 오프셋(+09:00)을 붙여 쓴다.
// - 마감(deadline)은 마감일 23:59:59로 쓴다. 다음날 00:00으로 쓰면 D-DAY가 사라진다.
// - 화면의 날짜·요일(예: 12.27 (일) 23:59)은 아래 값에서 자동으로 계산된다.
// - startAt~deadline 동안 리쿠르팅 페이지가 지원 화면으로 바뀐다. 이 두 값을 바꾸면 모집 알림 메일
//   Apps Script(scripts/recruiting-alert.gs 와 구글에 붙여넣은 실제 스크립트)의 START·DEADLINE도 똑같이 바꾼다.
//
// 새 기수 때 바꿀 곳: COHORT, startAt, deadline, hideAfter, schedule, applyFormUrl  (+ Apps Script 의 같은 값들)

// 기수. 사이트에 나오는 'N기' 글자(D-day 띠, 리쿠르팅 페이지 제목·사진 뒤 큰 숫자·이미지 설명·검색 설명)가 모두 이 값에서 나온다.
const COHORT = '27기';

export const RECRUITING_DDAY = {
  cohort: COHORT,
  enabled: true,
  // 지원 시작: 이 시각부터 띠가 보인다. 비워 두면('') 띠를 띄우지 않는다.
  startAt: '2026-11-30T00:00:00+09:00',
  // 지원 마감
  deadline: '2026-12-27T23:59:59+09:00',
  // 마감 후 '모집 마감' 표시를 이 시각까지 유지(최종 발표일). 비워 두면('') 마감 즉시 숨긴다.
  hideAfter: '2027-01-06T23:59:59+09:00',
  // 리쿠르팅 페이지 '지원 절차' 2~4단계 날짜. 적은 글자 그대로 화면에 나온다.
  // 1단계 날짜 '~12/27'과 맨 위 '모집 진행 중 · 12.27 (일) 23:59 마감'은 위 deadline 에서 자동으로 계산된다.
  schedule: {
    docResult: '12/30', // 서류 결과 안내
    interview: '1/3~5', // 면접 심사
    final: '1/6', // 최종 발표
  },
  // 카드 머리 띠 문구
  label: `${COHORT} 지원 마감까지`,
  // 띠 제목
  title: `투빅스 ${COHORT}를 모집합니다`,
  // 지원 버튼 링크. 사이트 안 경로('/recruiting') 또는 외부 주소('https://forms.gle/...') 모두 가능
  applyHref: '/recruiting',
  // 리쿠르팅 페이지 "구글폼 지원하기" 버튼 링크(응답자용 주소). 모집 알림 메일 Apps Script 의 APPLY_FORM_URL 도 같이 바꾼다.
  applyFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScpNmZNDXAD7k2TiWeNr4_Cl25fQZl2aYtRhlHwNt5Jakc61w/viewform?usp=dialog',
};
