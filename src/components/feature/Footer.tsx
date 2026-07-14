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
            <div className="flex items-center gap-3 mt-5">
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
            <ul className="space-y-2.5">
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
                <a href="mailto:datamarket.tobigs@gmail.com" className="text-gray-400 hover:text-white transition-colors">
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
          <p className="text-gray-500 text-xs">
            © 2025 TOBIG&apos;s All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            AI·데이터분석 대표 연합 동아리 투빅스
          </p>
        </div>
      </div>
    </footer>
  );
}