import { Link } from 'react-router-dom';

const footerLinks = [
  { label: '홈', path: '/' },
  { label: '커리큘럼', path: '/curriculum' },
  { label: '프로젝트', path: '/projects' },
  { label: '공지사항', path: '/notices' },
  { label: '리쿠르팅', path: '/recruiting' },
  { label: 'FAQ', path: '/faq' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-600/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left: Logo + Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="https://static.readdy.ai/image/3d684be57ac9d3c5f5a6f09d6e1e16dd/0e3510c4835073ce61a922f30b65e40b.png"
                alt="TOBIG's Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-display font-bold text-white text-xl tracking-wide">
                TOBIG&apos;s
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI·데이터분석 대표 연합 동아리 투빅스<br /><br />
            </p>
            {/* SNS Icons */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href="https://www.instagram.com/tobigs_official/"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-700 hover:bg-navy-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="인스타그램"
              >
                <i className="ri-instagram-line text-lg" />
              </a>
              <a
                href="https://github.com/tobigs-datamarket"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-700 hover:bg-navy-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="깃허브"
              >
                <i className="ri-github-line text-lg" />
              </a>
              <a
                href="https://velog.io/@tobigs-/posts"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-700 hover:bg-navy-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="벨로그"
              >
                {/* Velog 공식 로고 (Simple Icons, CC0) */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3Zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553.465-.66.893-1.418 1.283-2.273.405-.855.608-1.62.608-2.295 0-.405-.113-.727-.338-.967-.21-.255-.608-.577-1.193-.967.6-.765 1.35-1.148 2.25-1.148.48 0 .878.143 1.193.428.33.285.494.704.494 1.26 0 .93-.39 2.093-1.17 3.488-.765 1.38-2.241 3.457-4.431 6.232l-2.227.156-1.711-9.628h-2.25V7.24c.6-.195 1.305-.406 2.115-.63.81-.24 1.358-.36 1.643-.36Z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@%EC%98%A4%ED%94%BC%EC%85%9C%ED%88%AC%EB%B9%85%EC%8A%A4"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-700 hover:bg-navy-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="유튜브"
              >
                {/* YouTube 공식 로고 (Simple Icons, CC0) */}
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="mailto:datamarket.tobigs@gmail.com"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-700 hover:bg-navy-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="이메일"
              >
                <i className="ri-mail-line text-lg" />
              </a>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              <a href="#pages" id="pages">페이지</a>
            </h4>
            <ul className="grid w-fit grid-cols-3 gap-x-10 gap-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              <a href="#contact" id="contact">연락처</a>
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <i className="ri-mail-line mt-0.5 text-navy-400" />
                <a href="mailto:datamarket.tobigs@gmail.com" className="break-all text-gray-400 hover:text-white transition-colors">
                  <span>datamarket.tobigs@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <i className="ri-kakao-talk-fill mt-0.5 text-navy-400" />
                                <a href="https://pf.kakao.com/_QyxiDxb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span>카카오톡 오픈채팅</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <i className="ri-map-pin-2-line mt-0.5 text-navy-400" />
                <span>서울 / 오프라인</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-dark-600/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <p className="text-gray-500 text-xs">
              © 2025 TOBIG&apos;s All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              고유번호 : 292-80-03947
            </p>
          </div>
          <p className="text-gray-600 text-xs">
            AI·데이터분석 대표 연합 동아리 투빅스
          </p>
        </div>
      </div>
    </footer>
  );
}