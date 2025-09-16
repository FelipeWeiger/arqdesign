import { lazy } from 'react';

// Lazy load heavy components
export const LazyProjectCard = lazy(() => import('./ui/ProjectCard'));
export const LazyEmptyState = lazy(() => import('./ui/EmptyState'));

// Lazy load form components
export const LazyButton = lazy(() => import('./ui/Button'));
export const LazyCard = lazy(() => import('./ui/Card'));
export const LazyInput = lazy(() => import('./ui/Input'));

// Loading fallback component
export const ComponentFallback = ({ height = 'h-20' }: { height?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${height} w-full`} />
);