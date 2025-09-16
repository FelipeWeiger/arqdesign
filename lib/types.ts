// Project related types
export interface Project {
  id: string;
  clientName: string;
  createdAt: Date;
}

// User profile types
export interface UserProfile {
  name: string;
  email: string;
  photo?: string;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Local storage keys
export const STORAGE_KEYS = {
  PROJECTS: 'arqdesign_projects',
  USER_PROFILE: 'arqdesign_user_profile',
} as const;

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ProjectFormData {
  clientName: string;
}

// API response types (for future backend integration)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}