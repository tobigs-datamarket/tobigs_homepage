// scripts/recruiting-alert.gs 동작 검사. 구글 서비스를 가짜로 바꿔 Node에서 돌린다.
// 실행: node scripts/recruiting-alert.check.mjs   (.gs 를 고치면 다시 돌릴 것)
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const SRC = readFileSync(new URL('./recruiting-alert.gs', import.meta.url), 'utf8');
const T = (iso) => Date.parse(iso);

function load({ src = SRC, quota = 100 } = {}) {
  const tabs = { 신청: [['신청시각', '이메일', '상태']], 테스트: [['신청시각', '이메일', '상태']] };
  const env = { now: T('2026-11-15T12:00:00+09:00'), quota, outbox: [], triggers: [], locked: false };
  const sheet = (rows) => ({
    getDataRange: () => ({ getValues: () => rows.map((r) => [...r]) }),
    appendRow: (r) => rows.push([...r]),
    getRange: (row, col) => ({ setValue: (v) => { rows[row - 1][col - 1] = v; } }),
  });
  const ctx = {
    console: { log() {}, error() {} },
    SpreadsheetApp: { getActive: () => ({ getSheetByName: (n) => (tabs[n] ? sheet(tabs[n]) : null), getUrl: () => 'sheet-url' }) },
    MailApp: {
      getRemainingDailyQuota: () => env.quota,
      sendEmail(a, subject) {
        if (env.quota <= 0) throw new Error('Service invoked too many times for one day: email.');
        const to = typeof a === 'string' ? a : a.to;
        if (!to.includes('@') || to.startsWith('bad')) throw new Error(`Invalid email: ${to}`);
        env.quota--;
        env.outbox.push(typeof a === 'string' ? { to, subject } : a);
      },
    },
    LockService: { getScriptLock: () => ({ tryLock: () => (env.locked ? false : (env.locked = true)), releaseLock: () => { env.locked = false; } }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (s) => ({ setMimeType() { return this; }, text: s }) },
    Utilities: { formatDate: (d) => d.toISOString() },
    ScriptApp: {
      getProjectTriggers: () => env.triggers,
      deleteTrigger: (t) => env.triggers.splice(env.triggers.indexOf(t), 1),
      newTrigger: (fn) => {
        const t = { fn, getHandlerFunction: () => fn };
        const b = { timeBased: () => b, everyDays: () => b, atHour: (h) => ((t.hour = h), b), inTimezone: (z) => ((t.tz = z), b), create: () => env.triggers.push(t) };
        return b;
      },
    },
  };
  vm.createContext(ctx);
  ctx.__env = env;
  vm.runInContext('Date.now = () => __env.now;', ctx);
  vm.runInContext(src, ctx);
  const post = (email) => JSON.parse(ctx.doPost({ parameter: { email } }).text);
  const status = (tab = '신청') => tabs[tab].slice(1).map((r) => r[2]);
  const mails = () => env.outbox.filter((m) => m.body); // 신청자에게 간 안내 메일만
  return { ctx, env, tabs, post, status, mails };
}

// 1) 신청 저장: 형식 검사, 소문자, 중복, 수식 주입 차단
{
  const s = load();
  assert.deepEqual(s.post(' Kim@Example.com '), { ok: true });
  assert.deepEqual(s.post('kim@example.com'), { ok: true }); // 같은 주소 → 줄 안 늘고 ok
  assert.equal(s.tabs.신청.length, 2);
  assert.equal(s.tabs.신청[1][1], 'kim@example.com');
  for (const bad of ['', 'abc', '=1+1@a.com', '+cmd@a.com', '-x@a.com', 'a@b', `${'a'.repeat(250)}@b.co`]) {
    assert.deepEqual(s.post(bad), { ok: false }, bad);
  }
  assert.equal(s.tabs.신청.length, 2);
  assert.deepEqual(JSON.parse(s.ctx.doPost(undefined).text), { ok: false });
  assert.deepEqual(JSON.parse(s.ctx.doGet().text), { ok: true });
}

// 2) 모집 기간 경계: 사이트와 같은 규칙
{
  const s = load();
  s.post('a@x.com');
  for (const iso of ['2026-11-29T23:59:59.999+09:00', '2026-12-28T00:00:00+09:00']) {
    s.env.now = T(iso);
    s.ctx.sendRecruitingAlert();
    assert.equal(s.mails().length, 0, iso);
  }
  s.env.now = T('2026-12-27T23:59:59.999+09:00');
  s.ctx.sendRecruitingAlert();
  assert.equal(s.mails().length, 1);
}

// 3) 시작일 발송: 개별 발송, 상태 기록, 목록 안 중복, 실패 기록, 재실행해도 재발송 없음, 요약 메일
{
  const s = load();
  ['a@x.com', 'b@x.com', 'bad@x.com'].forEach(s.post);
  s.tabs.신청.push(['t', 'A@X.com ', '']); // 손으로 넣은 중복(대문자·공백)
  s.env.now = T('2026-11-30T10:20:00+09:00');
  s.ctx.sendRecruitingAlert();
  assert.deepEqual(s.mails().map((m) => m.to), ['a@x.com', 'b@x.com']);
  assert.ok(s.mails().every((m) => m.replyTo === 'datamarket.tobigs@gmail.com' && m.name && m.body.includes('/recruiting')));
  // HTML 본문: 텍스트 본문과 줄 구성이 똑같고(줄마다 <br>), 주소 줄은 링크, 특수문자는 이스케이프
  const m = s.mails()[0];
  const htmlLines = m.htmlBody.replace(/^<div[^>]*>\n|\n<\/div>$/g, '').split('<br>\n');
  assert.equal(htmlLines.length, m.body.split('\n').length);
  assert.equal(htmlLines[3], '기다려 주신 투빅스 27기 리크루팅이 시작되어');
  assert.equal(htmlLines[4], '신청해주신 이메일로 모집을 시작하였음을 알려드립니다.');
  assert.equal(htmlLines[8], '모집 안내:');
  assert.match(htmlLines[9], /^<a href="https:\/\/www\.datamarket\.ai\.kr\/recruiting"/);
  assert.match(htmlLines[11], /^<a href="https:\/\/docs\.google\.com\/forms\/.+viewform\?usp=dialog"/);
  assert.ok(m.htmlBody.includes('TOBIG&#39;s') || m.htmlBody.includes("TOBIG's"));
  const st = s.status();
  assert.match(st[0], /^27기 발송 /);
  assert.match(st[1], /^27기 발송 /);
  assert.match(st[2], /^27기 실패: Invalid email/);
  assert.equal(st[3], '27기 중복');
  const summary = s.env.outbox.filter((m) => !m.body);
  assert.equal(summary.length, 1);
  assert.equal(summary[0].to, 'datamarket.tobigs@gmail.com');
  s.ctx.sendRecruitingAlert(); // 다음 날 다시 돌아도
  assert.equal(s.mails().length, 2);
  assert.equal(s.env.outbox.length, 3); // 보낼 게 없으면 요약 메일도 없음
}

// 4) 하루 한도: 요약 1통 몫을 남기고 멈춤 → 다음 날 이어서
{
  const s = load({ quota: 3 });
  ['a@x.com', 'b@x.com', 'c@x.com', 'd@x.com'].forEach(s.post);
  s.env.now = T('2026-11-30T10:20:00+09:00');
  s.ctx.sendRecruitingAlert();
  assert.equal(s.mails().length, 2);
  assert.equal(s.env.quota, 0); // 남긴 1통으로 요약 발송
  assert.deepEqual(s.status().slice(2), ['', '']);
  s.env.quota = 100;
  s.env.now = T('2026-12-01T10:20:00+09:00');
  s.ctx.sendRecruitingAlert();
  assert.deepEqual(s.mails().map((m) => m.to), ['a@x.com', 'b@x.com', 'c@x.com', 'd@x.com']);
}

// 5) 동시 실행 잠금
{
  const s = load();
  s.post('a@x.com');
  s.env.now = T('2026-11-30T10:20:00+09:00');
  s.env.locked = true;
  s.ctx.sendRecruitingAlert();
  assert.equal(s.mails().length, 0);
}

// 6) testRun: [테스트] 탭만, 기간과 무관
{
  const s = load();
  s.post('real@x.com');
  s.tabs.테스트.push(['t', 'me@x.com', '']);
  s.ctx.testRun(); // 지금은 11/15, 기간 밖
  assert.deepEqual(s.mails().map((m) => m.to), ['me@x.com']);
  assert.deepEqual(s.status(), ['']); // 실제 신청자는 그대로
}

// 7) 트리거: 여러 번 설치해도 1개, 서울 10시
{
  const s = load();
  s.ctx.setupTrigger();
  s.ctx.setupTrigger();
  assert.equal(s.env.triggers.length, 1);
  assert.deepEqual([s.env.triggers[0].fn, s.env.triggers[0].hour, s.env.triggers[0].tz], ['sendRecruitingAlert', 10, 'Asia/Seoul']);
}

// 8) 다음 기수: 27기에 받은 사람이 다시 신청하면 28기 메일을 받는다
{
  const s = load();
  s.post('a@x.com');
  s.env.now = T('2026-11-30T10:20:00+09:00');
  s.ctx.sendRecruitingAlert();
  s.env.now = T('2027-01-10T12:00:00+09:00');
  assert.deepEqual(s.post('a@x.com'), { ok: true });
  assert.equal(s.tabs.신청.length, 3); // 보낸 줄은 중복으로 안 친다
  const src28 = SRC.replace("'27기'", "'28기'")
    .replace('2026-11-30T00:00:00+09:00', '2027-06-01T00:00:00+09:00')
    .replace('2026-12-27T23:59:59+09:00', '2027-06-30T23:59:59+09:00');
  const n = load({ src: src28 }); // 상수 3줄만 바꿔 붙여넣은 다음 기수 스크립트, 같은 시트
  n.tabs.신청.splice(0, Infinity, ...s.tabs.신청);
  n.env.now = T('2027-06-01T10:20:00+09:00');
  n.ctx.sendRecruitingAlert();
  assert.deepEqual(n.mails().map((m) => m.to), ['a@x.com']);
  assert.match(n.status()[0], /^27기 발송/);
  assert.match(n.status()[1], /^28기 발송/);
}

console.log('recruiting-alert check ok');
