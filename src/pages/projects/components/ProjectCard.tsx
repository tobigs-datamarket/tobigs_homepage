import { Link } from 'react-router-dom';
import type { Project } from '@/mocks/projects';

const awardColors: Record<string, string> = {
  대상: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  최우수상: 'bg-navy-500/20 text-navy-300 border-navy-500/30',
  우수상: 'bg-green-500/20 text-green-300 border-green-500/30',
  장려상: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
};

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="bg-dark-800 border border-dark-600/40 rounded-2xl overflow-hidden card-hover group">
      {/* Thumbnail */}
      <div className="relative w-full h-44 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />

        {/* Award Badge */}
        {project.award && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${awardColors[project.award] ?? ''}`}>
            🏆 {project.award}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="px-2 py-0.5 bg-navy-900/60 border border-navy-700/40 rounded-full text-navy-300 text-xs">
            {project.field}
          </span>
          <span className="px-2 py-0.5 bg-dark-700/60 border border-dark-500/40 rounded-full text-gray-400 text-xs">
            {project.generation}기
          </span>
        </div>

        <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-gray-500 text-xs mb-3">{project.conference}</p>

        <p className="text-gray-400 text-xs mb-4">
          팀원: {project.members.join(', ')}
        </p>

        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-dark-700 hover:bg-navy-800 border border-dark-600/40 hover:border-navy-700/40 text-gray-300 hover:text-white text-xs font-medium rounded-lg transition-all whitespace-nowrap"
        >
          상세보기
          <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </div>
  );
}