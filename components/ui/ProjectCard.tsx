import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className="bg-white rounded-[3px] border border-[#dfe1e6] p-4 hover:shadow-[0_8px_16px_rgba(9,30,66,0.15)] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group">
      <div className="space-y-3">
        {/* Client name */}
        <h3 className="font-semibold text-[#172b4d] group-hover:text-[#0079bf] transition-colors duration-200">
          {project.clientName}
        </h3>

        {/* Creation date */}
        <div className="flex items-center text-sm text-[#5e6c84]">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Criado em {formatDate(project.createdAt)}
        </div>

        {/* Status indicator */}
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#61bd4f] rounded-full mr-2"></div>
          <span className="text-xs text-[#5e6c84]">Ativo</span>
        </div>
      </div>
    </div>
  );
}