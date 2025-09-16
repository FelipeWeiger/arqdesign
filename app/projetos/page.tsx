'use client';

import Link from 'next/link';
import { useProjects } from '@/lib/hooks';
import ProjectCard from '@/components/ui/ProjectCard';
import EmptyState from '@/components/ui/EmptyState';
import { ProjectListSkeleton } from '@/components/ui/SkeletonLoader';

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();

  return (
    <div className="space-y-6">
      {/* Header with "Novo" button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172b4d]">Projetos</h1>
          <p className="text-[#5e6c84] mt-1">
            Gerencie seus projetos de arquitetura e design
          </p>
        </div>

        <Link
          href="/projetos/novo"
          className="inline-flex items-center px-4 py-2 bg-[#0079bf] text-white text-sm font-medium rounded-[3px] hover:bg-[#026aa7] transition-all duration-200 shadow-sm hover:shadow-[0_8px_16px_rgba(9,30,66,0.15)]"
        >
          Novo
        </Link>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[3px] p-4">
          <p className="text-sm text-red-600">
            Erro ao carregar projetos: {error}
          </p>
        </div>
      )}

      {/* Loading state */}
      {loading && <ProjectListSkeleton />}

      {/* Projects listing or empty state */}
      {!loading && !error && (
        projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )
      )}
    </div>
  );
}