import type { Member } from '../../../mocks/members';

interface MemberCardProps {
  member: Member;
  index: number;
}

const roleLabels: Record<string, string> = {
  president: '회장',
  vice_president: '부회장',
  executive: '운영진',
  member: '멤버',
};

const roleBadgeStyles: Record<string, string> = {
  president: 'bg-navy-600 text-white border-navy-500',
  vice_president: 'bg-navy-700 text-white border-navy-600',
  executive: 'bg-navy-900/60 text-navy-300 border-navy-800',
  member: 'bg-dark-700 text-gray-400 border-dark-600',
};

export default function MemberCard({ member, index }: MemberCardProps) {
  return (
    <div
      className="bg-dark-800 border border-dark-600/40 rounded-2xl p-5 card-hover flex flex-col items-center text-center transition-all duration-500"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Avatar */}
      <div className="relative mb-3">
        {member.profile_image_url ? (
          <img
            src={member.profile_image_url}
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-dark-600"
          />
        ) : (
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-dark-600 bg-dark-700 text-gray-300">
            <i className="ri-user-line text-2xl" />
          </div>
        )}
      </div>

      {/* Role Badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${roleBadgeStyles[member.role]}`}
      >
        {roleLabels[member.role]}
      </span>

      {/* University */}
      <p className="text-navy-400 text-xs font-medium mb-1">{member.university}</p>

      {/* Name */}
      <h3 className="text-white font-semibold text-base mb-1">{member.name}</h3>

      {/* Company */}
      {member.company && (
        <p className="text-gray-500 text-xs">{member.company}</p>
      )}
    </div>
  );
}