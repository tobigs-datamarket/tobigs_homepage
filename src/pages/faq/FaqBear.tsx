// FAQ 대화에서 말하는 투빅스 곰(공식 캐릭터 얼굴 + 앞발을 모은 상반신)
export default function FaqBear({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="270 72 712 712" aria-hidden="true" className={className}>
      <style>{`.fb-eyes{animation:fb-blink 6s infinite;transform-box:fill-box;transform-origin:center}@keyframes fb-blink{0%,95%,100%{transform:none}97%{transform:scaleY(.1)}}@media (prefers-reduced-motion:reduce){.fb-eyes{animation:none}}`}</style>
      <g stroke="#15181c" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="405" cy="269" rx="71" ry="79" fill="#fff" />
        <ellipse cx="847" cy="269" rx="71" ry="79" fill="#fff" />
        <circle cx="397" cy="263" r="29" fill="#c6d0d9" stroke="none" />
        <circle cx="855" cy="263" r="29" fill="#c6d0d9" stroke="none" />
        <ellipse cx="626" cy="679" rx="216" ry="87" fill="#c4cfd8" />
        <ellipse cx="626" cy="686" rx="164" ry="66" fill="#fff" stroke="none" />
        <ellipse cx="494" cy="710" rx="77" ry="61" fill="#c4cfd8" />
        <ellipse cx="758" cy="710" rx="77" ry="61" fill="#c4cfd8" />
        <ellipse cx="494" cy="701" rx="67" ry="50" fill="#fff" stroke="none" />
        <ellipse cx="758" cy="701" rx="67" ry="50" fill="#fff" stroke="none" />
        <path d="M399.5 440C399.5 300 480 280 626 280S852.5 300 852.5 440C852.5 550 780 606 626 606S399.5 550 399.5 440Z" fill="#c4cfd8" />
        <path d="M410 440C410 350 500 326 626 326S842 350 842 440C842 535 760 590 626 590S410 535 410 440Z" fill="#fff" stroke="none" />
        <path d="M405 300C405 190 500 100 626 100S847 190 847 300Z" fill="#848c94" />
        <path d="M433 240Q450 175 519 140M733 140Q765 155 785 182" fill="none" stroke="#fff" strokeWidth="12" />
        <path d="M523 262L552 106Q556 82 580 82H672Q696 82 700 106L729 262Z" fill="#999c9e" />
        <path d="M410 302Q460 268 560 265H692Q792 268 842 302" fill="none" strokeWidth="48" />
        <path d="M410 302Q460 268 560 265H692Q792 268 842 302" fill="none" stroke="#6d767f" strokeWidth="30" />
        <path d="M366 336C395 295 470 280 626 280S857 295 886 336Q892 362 878 368C842 320 772 305 626 305S410 320 374 368Q360 362 366 336Z" fill="#4b5663" />
        <path d="M366 336C395 295 470 280 626 280S857 295 886 336C850 305 772 297 626 297S402 305 366 336Z" fill="#8a939a" stroke="none" />
        <ellipse cx="622" cy="196" rx="80" ry="66" fill="#8f9192" />
        <circle cx="622" cy="198" r="56" fill="#fbcc55" stroke="#5e5030" />
        <circle cx="624" cy="194" r="38" fill="#fdf0a0" stroke="none" />
        <circle cx="623" cy="189" r="15" fill="#fff" stroke="none" />
        <g className="fb-eyes" stroke="none">
          <ellipse cx="546" cy="428" rx="28" ry="30" fill="#0a0b0f" />
          <ellipse cx="706" cy="428" rx="28" ry="30" fill="#0a0b0f" />
          <circle cx="537" cy="417" r="10" fill="#fff" />
          <circle cx="697" cy="417" r="10" fill="#fff" />
          <circle cx="555" cy="440" r="4" fill="#fff" />
          <circle cx="715" cy="440" r="4" fill="#fff" />
        </g>
        <path d="M593.5 447C593.5 433 612 431.5 626.5 431.5S659.5 433 659.5 447C659.5 458 637 470 626.5 470S593.5 458 593.5 447Z" fill="#0a0b0f" stroke="none" />
        <ellipse cx="614.5" cy="443" rx="12" ry="4.7" fill="#fff" stroke="none" />
        <path d="M588 493Q626 497 665 493C662 520 648 538 626.5 538S591 520 588 493Z" fill="#0a0b0f" stroke="none" />
        <ellipse cx="627" cy="519" rx="22" ry="11" fill="#f0949b" stroke="none" />
        <path d="M626.5 465V487C612 497 585 497 575 478M626.5 487C641 497 668 497 678 478" fill="none" strokeWidth="8" />
        <ellipse cx="484.5" cy="472" rx="29" ry="17.5" fill="#f7a8ae" stroke="none" />
        <ellipse cx="767.5" cy="472" rx="29" ry="17.5" fill="#f7a8ae" stroke="none" />
      </g>
    </svg>
  );
}
