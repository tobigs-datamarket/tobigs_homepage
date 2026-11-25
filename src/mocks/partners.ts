// 함께한 기업·기관 로고 (public/images/partners, 384x192 webp 타일)
// 앞 절반은 마키 윗줄, 뒤 절반은 아랫줄. 밝은 타일이 붙어 다니지 않게 밝은/어두운 타일을 번갈아 둔다.
export interface Partner {
  name: string;
  logo: string;
}

const p = (name: string, file: string): Partner => ({ name, logo: `/images/partners/${file}.webp` });

export const partners: Partner[] = [
  // 윗줄
  p('HSPACE', 'hspace'),
  p('씽굿', 'thinkgood'),
  p('데이콘', 'dacon'),
  p('코드잇', 'codeit'),
  p('업스테이지', 'upstage'),
  p('광동제약', 'kwangdong'),
  p('Lovable', 'lovable'),
  p('한국지능정보사회진흥원', 'nia'),
  p('AWS', 'aws'),
  p('크라이치즈버거', 'crycheeseburger'),
  p('패스트캠퍼스', 'fastcampus'),
  p('WIZCORE', 'wizcore'),
  p('Monster Energy', 'monsterenergy'),
  // 아랫줄
  p('스위프', 'swyp'),
  p('한국생명공학연구원', 'kribb'),
  p('한국생산성본부', 'kpc'),
  p('알파코', 'alpaco'),
  p('모두의연구소', 'modulabs'),
  p('허깅페이스 KREW', 'huggingfacekrew'),
  p('경기창조경제혁신센터', 'gyeonggiccei'),
  p('ElevenLabs', 'elevenlabs'),
  p('RunPod', 'runpod'),
  p('가짜연구소', 'pseudolab'),
  p('유가네닭갈비', 'yoogane'),
  p('Nexting', 'nexting'),
  p('ENDPLAN', 'endplan'),
];
