import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DropdownItem {
  label: string;
  path?: string;
  external?: string;
}

interface NavItem {
  label: string;
  path?: string;
  dropdown?: DropdownItem[];
}

const EXTERNAL_PROJECT_URL = 'https://kaput-bull-375.notion.site/TOBIG-s-36cffd4098ae804ebf1ae723705a28f8?pvs=74';

const navItems: NavItem[] = [
  {
    label: '동아리 소개',
    dropdown: [
      { label: '동아리원 목록', path: '/members' },
      { label: '수상 기록', path: '/awards' },
    ],
  },
  {
    label: '활동',
    dropdown: [
      { label: '프로젝트', external: EXTERNAL_PROJECT_URL },
      { label: '공지사항', path: '/notices' },
    ],
  },
  {
    label: '커리큘럼',
    path: '/curriculum',
  },
  {
    label: '참여',
    dropdown: [
      { label: '리쿠르팅', path: '/recruiting' },
      { label: 'FAQ', path: '/faq' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-navy-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="https://static.readdy.ai/image/3d684be57ac9d3c5f5a6f09d6e1e16dd/0e3510c4835073ce61a922f30b65e40b.png"
            alt="TOBIG's Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
          <span className="font-display font-bold text-white text-lg md:text-xl tracking-wide">
            TOBIG&apos;s
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'text-white bg-navy-800/50'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                    activeDropdown === item.label
                      ? 'text-white bg-navy-800/50'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                >
                  {item.label}
                  <i className={`ri-arrow-down-s-line text-xs transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>
              )}

              {/* Dropdown */}
              {item.dropdown && activeDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-1 w-44 bg-dark-800 border border-navy-800/50 rounded-lg overflow-hidden"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown.map((sub) => (
                    sub.external ? (
                      <a
                        key={sub.label}
                        href={sub.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-navy-800/40 transition-colors whitespace-nowrap"
                      >
                        {sub.label}
                      </a>
                    ) : (
                      <Link
                        key={sub.path}
                        to={sub.path!}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-navy-800/40 transition-colors whitespace-nowrap"
                      >
                        {sub.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            to="/recruiting"
            className="ml-3 px-5 py-2 bg-navy-600 hover:bg-navy-500 text-white text-sm font-medium rounded-full transition-colors whitespace-nowrap"
          >
            지원하기
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴"
        >
          <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-900/98 backdrop-blur-md border-t border-navy-800/30">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-navy-800/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <i
                        className={`ri-arrow-down-s-line transition-transform ${
                          mobileExpanded === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileExpanded === item.label && item.dropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((sub) => (
                          sub.external ? (
                            <a
                              key={sub.label}
                              href={sub.external}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-navy-800/20 rounded-md text-sm transition-colors"
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              key={sub.path}
                              to={sub.path!}
                              className="block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-navy-800/20 rounded-md text-sm transition-colors"
                            >
                              {sub.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="pt-2">
              <Link
                to="/recruiting"
                className="block text-center px-4 py-3 bg-navy-600 hover:bg-navy-500 text-white text-sm font-medium rounded-full transition-colors"
              >
                지원하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}