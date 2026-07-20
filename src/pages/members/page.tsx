import { useEffect, useMemo, useRef, useState } from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/feature/Navbar';
import MemberCard from './components/MemberCard';
import { membersMock, type Member } from '../../mocks/members';
import { fetchMembersFromSheet } from '@/services/members';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

const roleOrder: Record<string, number> = {
  president: 0,
  vice_president: 1,
  executive: 2,
  member: 3,
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGen, setSelectedGen] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generations = useMemo(() => {
    const gens = Array.from(new Set(members.map((m) => m.generation))).sort((a, b) => b - a);
    return gens;
  }, [members]);

  const filteredMembers = useMemo(() => {
    let list = selectedGen === null ? members : members.filter((m) => m.generation === selectedGen);
    list = [...list].sort((a, b) => {
      if (a.generation !== b.generation) return b.generation - a.generation;
      return roleOrder[a.role] - roleOrder[b.role];
    });
    return list;
  }, [members, selectedGen]);

  const groupedByGeneration = useMemo(() => {
    if (selectedGen !== null) return [];
    const map = new Map<number, Member[]>();
    for (const m of filteredMembers) {
      if (!map.has(m.generation)) map.set(m.generation, []);
      map.get(m.generation)!.push(m);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredMembers, selectedGen]);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    let cancelled = false;

    fetchMembersFromSheet()
      .then((data) => {
        if (!cancelled && data.length > 0) setMembers(data);
        else if (!cancelled) setMembers(membersMock);
      })
      .catch((err) => {
        console.error('구글 시트에서 동아리원 데이터를 불러오지 못해 기본 데이터를 표시합니다.', err);
        if (!cancelled) setMembers(membersMock);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const dropdownLabel = selectedGen === null ? '전체 기수' : `${selectedGen}기`;

  return (
    <div className="min-h-screen bg-dark-950">
      <SEO
        title="동아리원 목록 | TOBIG's 투빅스"
        description="투빅스에서 활동 중인 현재 및 역대 동아리원들을 소개합니다. 다양한 대학의 데이터 분석 및 AI에 관심 있는 학생들이 모여 있습니다."
        keywords="투빅스 동아리원, TOBIG's 멤버, 데이터 동아리 인원, AI 동아리 멤버"
        ogUrl={`${SITE_URL}/members`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: "TOBIG's",
          url: SITE_URL,
          member: membersMock.map((m) => ({
            '@type': 'Person',
            name: m.name,
            affiliation: {
              '@type': 'Organization',
              name: m.university,
            },
          })),
        }}
      />
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-navy-400 text-xs font-semibold uppercase tracking-widest">Members</span>
            <h1
              className={`font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-4 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              동아리원 목록
            </h1>
            <p
              className={`text-gray-400 text-base md:text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              투빅스에서 활동 중인 현재 및 역대 동아리원들을 소개합니다
            </p>
          </div>
        </section>

        {/* Filter Dropdown */}
        <section className="px-4 md:px-6 pb-10">
          <div className="max-w-7xl mx-auto flex justify-center">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-5 py-2.5 bg-dark-800 border border-dark-600/40 rounded-lg text-sm font-medium text-white hover:bg-dark-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{dropdownLabel}</span>
                <i
                  className={`ri-arrow-down-s-line text-navy-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-dark-800 border border-dark-600/40 rounded-lg shadow-xl overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setSelectedGen(null);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      selectedGen === null ? 'bg-navy-600/20 text-navy-300' : 'text-gray-300 hover:bg-dark-700'
                    }`}
                  >
                    전체 기수
                  </button>
                  {generations.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => {
                        setSelectedGen(gen);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        selectedGen === gen ? 'bg-navy-600/20 text-navy-300' : 'text-gray-300 hover:bg-dark-700'
                      }`}
                    >
                      {gen}기
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <section className="px-4 md:px-6 pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-navy-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-20">
                <i className="ri-user-search-line text-4xl text-dark-600 mb-4 block" />
                <p className="text-gray-500 text-base">해당 기수의 동아리원이 없습니다</p>
              </div>
            ) : selectedGen === null ? (
              /* Grouped by generation */
              <div className="space-y-12 md:space-y-16">
                {groupedByGeneration.map(([gen, genMembers]) => (
                  <div key={gen}>
                    {/* Generation Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="font-display font-bold text-xl md:text-2xl text-white whitespace-nowrap">
                        {gen}기
                      </h2>
                      <div className="flex-1 h-px bg-dark-600/50" />
                      <span className="text-gray-500 text-xs whitespace-nowrap">{genMembers.length}명</span>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                      {genMembers.map((member, idx) => (
                        <MemberCard key={member.id} member={member} index={idx} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Single generation grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                {filteredMembers.map((member, idx) => (
                  <MemberCard key={member.id} member={member} index={idx} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}