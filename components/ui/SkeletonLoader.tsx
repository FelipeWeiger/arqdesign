interface SkeletonLoaderProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function SkeletonLoader({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = false
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse';
  const roundedClass = rounded ? 'rounded-full' : 'rounded';
  const combinedClassName = `${baseClasses} ${width} ${height} ${roundedClass} ${className}`;

  return (
    <div className={combinedClassName}>
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-[3px] border border-[#dfe1e6] p-4 space-y-3">
      <SkeletonLoader height="h-6" width="w-3/4" />
      <div className="flex items-center space-x-2">
        <SkeletonLoader height="h-4" width="w-4" rounded />
        <SkeletonLoader height="h-4" width="w-32" />
      </div>
      <div className="flex items-center space-x-2">
        <SkeletonLoader height="h-2" width="w-2" rounded />
        <SkeletonLoader height="h-3" width="w-16" />
      </div>
    </div>
  );
}

export function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <SkeletonLoader height="h-4" width="w-24" className="mb-2" />
        <SkeletonLoader height="h-12" />
      </div>
      <div>
        <SkeletonLoader height="h-4" width="w-32" className="mb-2" />
        <SkeletonLoader height="h-12" />
      </div>
      <div className="flex justify-end space-x-3">
        <SkeletonLoader height="h-10" width="w-20" />
        <SkeletonLoader height="h-10" width="w-32" />
      </div>
    </div>
  );
}