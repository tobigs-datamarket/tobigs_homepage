import { partners } from '@/mocks/partners';

const half = Math.ceil(partners.length / 2);
// 윗줄은 왼쪽, 아랫줄은 오른쪽으로 흐른다. 속도를 조금 달리해 두 줄이 똑같이 움직이지 않게 한다.
const rows = [
  { items: partners.slice(0, half), duration: '60s', reverse: false },
  { items: partners.slice(half), duration: '72s', reverse: true },
];

export default function PartnersSection() {
  return (
    <section className="bg-dark-800/50 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-2xl border border-dark-600/40 bg-dark-900 py-10 md:py-14">
          {/* Header */}
          <div className="text-center px-4 md:px-6">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Partners &amp; Collaborators</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 text-balance break-keep">
              투빅스와 함께한 기업 및 기관
            </h2>
            <p className="text-gray-400 mt-3 text-sm md:text-base text-balance break-keep">
              투빅스는 다양한 기업 및 기관과 함께 산학협력, 해커톤, 컨퍼런스 등 새로운 성장의 기회를 만들어가고 있습니다.
            </p>
          </div>
          <div className="mx-4 md:mx-6 mt-8 md:mt-10 border-t border-dark-600/40" />

          {/* Marquee: 같은 목록을 두 번 이어 붙이고 절반만큼 흘려 끊김 없이 반복 */}
          <div className="marquee mt-8 md:mt-10 space-y-3 md:space-y-4 overflow-hidden">
            {rows.map(({ items, duration, reverse }, r) => (
              <div
                key={r}
                className={`marquee-track flex w-max ${reverse ? 'marquee-reverse' : ''}`}
                style={{ animationDuration: duration }}
              >
                {[...items, ...items].map((partner, i) => {
                  const copy = i >= items.length;
                  return (
                    <img
                      key={i}
                      src={partner.logo}
                      alt={copy ? '' : partner.name}
                      aria-hidden={copy || undefined}
                      width={384}
                      height={192}
                      decoding="async"
                      draggable={false}
                      className="mr-3 md:mr-4 h-16 w-32 md:h-24 md:w-48 shrink-0 select-none"
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
