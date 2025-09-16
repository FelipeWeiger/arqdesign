import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Empty state illustration */}
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>

        {/* Empty state content */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhum projeto ainda
        </h3>
        <p className="text-gray-600 mb-6">
          Comece criando seu primeiro projeto para organizar seu trabalho.
        </p>

        {/* Create project button */}
        <Link
          href="/projetos/novo"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Criar Projeto
        </Link>
      </div>
    </div>
  );
}