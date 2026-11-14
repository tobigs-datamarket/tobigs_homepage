// 홈 히어로 아래 "지원 마감 D-day" 띠 설정. 날짜·문구·링크는 이 파일에서만 바꾼다.
// - 시각은 반드시 한국 시간 오프셋(+09:00)을 붙여 쓴다.
// - 마감(deadline)은 마감일 23:59:59로 쓴다. 다음날 00:00으로 쓰면 D-DAY가 사라진다.
// - 화면의 날짜·요일(예: 12.27 (일) 23:59)은 아래 값에서 자동으로 계산된다.
// - startAt~deadline 동안 리쿠르팅 페이지가 지원 화면으로 바뀐다. 이 두 값을 바꾸면 모집 알림 메일
//   Apps Script(scripts/recruiting-alert.gs 와 구글에 붙여넣은 실제 스크립트)의 START·DEADLINE도 똑같이 바꾼다.
export const RECRUITING_DDAY = {
  enabled: true,
  // 지원 시작: 이 시각부터 띠가 보인다. 비워 두면('') 띠를 띄우지 않는다.
  startAt: '2026-11-30T00:00:00+09:00',
  // 지원 마감
  deadline: '2026-12-27T23:59:59+09:00',
  // 마감 후 '모집 마감' 표시를 이 시각까지 유지(최종 발표일). 비워 두면('') 마감 즉시 숨긴다.
  hideAfter: '2027-01-06T23:59:59+09:00',
  // 카드 머리 띠 문구
  label: '27기 지원 마감까지',
  // 띠 제목
  title: '투빅스 27기를 모집합니다',
  // 지원 버튼 링크. 사이트 안 경로('/recruiting') 또는 외부 주소('https://forms.gle/...') 모두 가능
  applyHref: '/recruiting',
  // 리쿠르팅 페이지 "구글폼 지원하기" 버튼 링크(응답자용 주소). 모집 알림 메일 Apps Script 의 APPLY_FORM_URL 도 같이 바꾼다.
  applyFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScpNmZNDXAD7k2TiWeNr4_Cl25fQZl2aYtRhlHwNt5Jakc61w/viewform?usp=dialog',
};
