/**
 * 투빅스 모집 알림 메일 (Google Apps Script)
 *
 * 이 파일은 원본 보관용이다. 실제로 도는 코드는 동아리 계정(datamarket.tobigs@gmail.com)의
 * 스프레드시트 "투빅스 모집 알림" > 확장 프로그램 > Apps Script 에 붙여넣은 사본이다. 고치면 양쪽 다 고친다.
 * 고친 뒤에는: 저장 → 배포 > 배포 관리 > 연필(수정) > 버전 "새 버전" > 배포  (새 배포를 만들면 URL이 바뀐다)
 *
 * 시트 탭: [신청] [테스트]  — 둘 다 1행 머리글 "신청시각 | 이메일 | 상태", 2행부터 데이터.
 *   상태가 빈칸 = 아직 안 보냄. 발송 중(매일 10~11시)에는 시트 정렬·행 삽입/삭제 금지(행 번호로 상태를 쓴다).
 *
 * 매 기수 바꿀 곳: COHORT, START, DEADLINE, APPLY_FORM_URL 네 줄.
 *   START, DEADLINE, APPLY_FORM_URL 은 src/config/recruiting.ts 의 startAt, deadline, applyFormUrl 과 글자 그대로 같게 쓴다.
 *   메일 제목·본문 문구는 아래 message_ 함수에서 고친다.
 *   메일은 START 이후 처음 도는 매일 10~11시(서울) 트리거에서 나간다. 그래서 START 는 그날 10시 이전이어야 한다.
 *
 * 손으로 실행하는 함수: dryRun(발송 없이 점검) · testRun([테스트] 탭에 실제 발송) · setupTrigger(트리거 1개 설치)
 */
const COHORT = '27기';
const START = '2026-11-30T00:00:00+09:00';
const DEADLINE = '2026-12-27T23:59:59+09:00';
const APPLY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScpNmZNDXAD7k2TiWeNr4_Cl25fQZl2aYtRhlHwNt5Jakc61w/viewform?usp=dialog';

const SITE_URL = 'https://www.datamarket.ai.kr';
const CLUB_EMAIL = 'datamarket.tobigs@gmail.com';
const SENDER_NAME = "TOBIG's 투빅스";
const SHEET = '신청';
const TEST_SHEET = '테스트';
const TZ = 'Asia/Seoul';
// 영문·숫자로 시작해야 한다: '=' '+' '-' 로 시작하는 값은 시트에서 수식으로 실행될 수 있다.
const EMAIL_RE = /^[a-z0-9][a-z0-9._%+-]*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/;
const TIME_LIMIT_MS = 5 * 60 * 1000; // 1회 실행 한도 6분보다 여유 있게 끊고 다음 날 이어서 보낸다

/** 사이트 신청 폼이 부른다. 응답은 항상 {ok}. 이미 신청한 주소인지는 알려주지 않는다. */
function doPost(e) {
  try {
    const email = String((e && e.parameter && e.parameter.email) || '').trim().toLowerCase();
    if (email.length > 254 || !EMAIL_RE.test(email)) return json_({ ok: false });
    const sheet = sheet_(SHEET);
    const pending = sheet.getDataRange().getValues().slice(1)
      .some((r) => norm_(r[1]) === email && r[2] === '');
    if (!pending) sheet.appendRow([stamp_(), email, '']);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false });
  }
}

/** 배포 확인용: 웹 앱 URL을 브라우저로 열면 {"ok":true} 가 보인다. */
function doGet() {
  return json_({ ok: true });
}

/** 트리거가 매일 10~11시(서울)에 부른다. 모집 기간이 아니면 아무것도 안 한다. */
function sendRecruitingAlert() {
  if (!isOpen_(Date.now())) return;
  run_(SHEET);
}

/** [테스트] 탭에만, 기간과 상관없이 실제 발송 코드를 돌린다. 운영진 주소만 넣어 둘 것. */
function testRun() {
  run_(TEST_SHEET);
}

/** 발송 없이 점검: 기간, 대상, 남은 한도, 트리거 수를 실행 로그에 찍는다. 처음 한 번 실행하면 권한 승인 창이 뜬다. */
function dryRun() {
  const rows = sheet_(SHEET).getDataRange().getValues().slice(1);
  const pending = [...new Set(rows.filter((r) => r[2] === '').map((r) => norm_(r[1])))];
  const triggers = ScriptApp.getProjectTriggers().filter((t) => t.getHandlerFunction() === 'sendRecruitingAlert');
  console.log(`${COHORT} 기간 ${START} ~ ${DEADLINE}: 지금 ${isOpen_(Date.now()) ? '열림 → 다음 10~11시 트리거에 발송' : '닫힘'}`);
  console.log(`발송 대상 최대 ${pending.length}명, 오늘 남은 발송 한도 ${MailApp.getRemainingDailyQuota()}, 트리거 ${triggers.length}개`);
  console.log(pending.join('\n') || '(대상 없음)');
}

/** 매일 10~11시(서울) 트리거를 정확히 1개 설치한다. 여러 번 실행해도 1개만 남는다. */
function setupTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'sendRecruitingAlert')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('sendRecruitingAlert').timeBased().everyDays(1).atHour(10).inTimezone(TZ).create();
}

function run_(sheetName) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) {
    console.log('다른 실행이 진행 중이라 건너뜀');
    return;
  }
  try {
    const started = Date.now();
    const sheet = sheet_(sheetName);
    const rows = sheet.getDataRange().getValues();
    // 이번 기수에 이미 보낸 주소. 지난 기수 기록은 보지 않는다(다시 신청한 사람은 다음 기수 메일을 받아야 한다).
    const done = new Set(rows.filter((r) => String(r[2]).indexOf(`${COHORT} 발송`) === 0).map((r) => norm_(r[1])));
    let sent = 0;
    let failed = 0;
    let left = 0;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][2] !== '') continue;
      // 요약 메일 1통 몫은 남긴다. 멈춘 나머지는 상태가 빈칸이라 다음 날 트리거가 이어서 보낸다.
      if (MailApp.getRemainingDailyQuota() < 2 || Date.now() - started > TIME_LIMIT_MS) {
        left = rows.slice(i).filter((r) => r[2] === '').length;
        break;
      }
      const email = norm_(rows[i][1]);
      let status;
      if (done.has(email)) {
        status = `${COHORT} 중복`;
      } else {
        try {
          MailApp.sendEmail(message_(email));
          done.add(email);
          sent++;
          status = `${COHORT} 발송 ${stamp_()}`;
        } catch (err) {
          failed++;
          status = `${COHORT} 실패: ${err.message}`;
        }
      }
      sheet.getRange(i + 1, 3).setValue(status); // 한 명마다 바로 기록 → 중간에 멈춰도 재발송 없음
    }
    if (sent || failed || left) {
      MailApp.sendEmail(
        CLUB_EMAIL,
        `[알림 발송 결과] ${COHORT} ${sheetName} 탭: 발송 ${sent} / 실패 ${failed} / 남음 ${left}`,
        `발송 ${sent}명, 실패 ${failed}명, 남음 ${left}명\n` +
          '남은 주소는 모집 기간 안이면 다음 날 10~11시에 이어서 보냅니다.\n' +
          '실패한 줄은 상태 칸에 사유가 적혀 있습니다. 다시 보내려면 그 칸을 비우세요.\n' +
          SpreadsheetApp.getActive().getUrl(),
      );
    }
  } finally {
    lock.releaseLock();
  }
}

function message_(to) {
  const deadline = Utilities.formatDate(new Date(DEADLINE), TZ, 'M월 d일 HH:mm');
  return {
    to,
    name: SENDER_NAME,
    replyTo: CLUB_EMAIL,
    subject: `[투빅스] ${COHORT} 신입 부원 모집 안내`,
    // 한 줄 = 메일의 한 줄, '' = 빈 줄. ${...} 는 위 상수에서 자동으로 채워진다.
    body: [
      "안녕하세요, 데이터·AI 연합 동아리 투빅스(TOBIG's)입니다.",
      '',
      '모집 알림을 신청해 주셔서 감사합니다.',
      `기다려 주신 투빅스 ${COHORT} 리크루팅이 시작되어 신청해주신 이메일로 모집을 시작하였음을 알려드립니다.`,
      '',
      `서류 접수 마감: ${deadline}`,
      '',
      `모집 안내: ${SITE_URL}/recruiting`,
      `지원 링크: ${APPLY_FORM_URL}`,
      '',
      '데이터·AI를 함께 배우고 성장하고 싶은 여러분의 많은 관심과 지원을 기다립니다.',
      '',
      '감사합니다.',
      '투빅스 드림',
      '',
      '—',
      '',
      '이 메일은 투빅스 홈페이지에서 모집 알림을 신청하신 분께 1회 자동 발송됩니다.',
      '신청 시 입력하신 이메일 주소는 이번 모집 종료 후 파기됩니다.',
    ].join('\n'),
  };
}

/** 사이트(src/utils/dday.ts isRecruitingOpen)와 같은 규칙: START 이상, DEADLINE(23:59:59) + 1초 미만. */
function isOpen_(now) {
  return now >= Date.parse(START) && now < Date.parse(DEADLINE) + 1000;
}

function sheet_(name) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sheet) throw new Error(`시트 탭 "${name}" 이 없습니다`);
  return sheet;
}

function norm_(v) {
  return String(v).trim().toLowerCase();
}

function stamp_() {
  return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
