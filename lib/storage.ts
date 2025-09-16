import { Project, UserProfile, STORAGE_KEYS } from './types';

// Project management functions
export function getProjects(): Project[] {
  if (typeof window === 'undefined') return [];

  try {
    const projectsJson = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!projectsJson) return [];

    const projects = JSON.parse(projectsJson) as Array<{
      id: string;
      clientName: string;
      createdAt: string;
    }>;
    // Convert date strings back to Date objects
    return projects.map((project) => ({
      ...project,
      createdAt: new Date(project.createdAt),
    }));
  } catch (error) {
    console.error('Error reading projects from localStorage:', error);
    return [];
  }
}

export function saveProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
  const newProject: Project = {
    id: generateId(),
    createdAt: new Date(),
    ...project,
  };

  const projects = getProjects();
  projects.unshift(newProject); // Add to beginning of array

  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return newProject;
  } catch (error) {
    console.error('Error saving project to localStorage:', error);
    throw new Error('Failed to save project');
  }
}

export function getProject(id: string): Project | null {
  try {
    const projects = getProjects();
    return projects.find(project => project.id === id) || null;
  } catch (error) {
    console.error('Error getting project from localStorage:', error);
    return null;
  }
}

export function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null {
  try {
    const projects = getProjects();
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex === -1) {
      throw new Error('Project not found');
    }

    const updatedProject = {
      ...projects[projectIndex],
      ...updates,
    };

    // Validate updated project
    const validationErrors = validateProject(updatedProject);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    projects[projectIndex] = updatedProject;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));

    return updatedProject;
  } catch (error) {
    console.error('Error updating project in localStorage:', error);
    throw error;
  }
}

export function deleteProject(id: string): boolean {
  try {
    const projects = getProjects();
    const projectExists = projects.some(project => project.id === id);

    if (!projectExists) {
      throw new Error('Project not found');
    }

    const filteredProjects = projects.filter(project => project.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filteredProjects));
    return true;
  } catch (error) {
    console.error('Error deleting project from localStorage:', error);
    return false;
  }
}

// User profile management functions
export function getUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;

  try {
    const profileJson = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profileJson ? JSON.parse(profileJson) : null;
  } catch (error) {
    console.error('Error reading user profile from localStorage:', error);
    return null;
  }
}

export function saveUserProfile(profile: UserProfile): boolean {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Error saving user profile to localStorage:', error);
    return false;
  }
}

// Utility functions
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Advanced project operations
export function searchProjects(query: string): Project[] {
  try {
    const projects = getProjects();
    const lowercaseQuery = query.toLowerCase().trim();

    if (!lowercaseQuery) return projects;

    return projects.filter(project =>
      project.clientName.toLowerCase().includes(lowercaseQuery)
    );
  } catch (error) {
    console.error('Error searching projects:', error);
    return [];
  }
}

export function getProjectsCount(): number {
  try {
    return getProjects().length;
  } catch (error) {
    console.error('Error getting projects count:', error);
    return 0;
  }
}

export function getRecentProjects(limit: number = 5): Project[] {
  try {
    const projects = getProjects();
    return projects
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting recent projects:', error);
    return [];
  }
}

// User profile validation and utilities
export function validateUserProfile(profile: Partial<UserProfile>): string[] {
  const errors: string[] = [];

  if (profile.name !== undefined) {
    if (!profile.name || profile.name.trim().length === 0) {
      errors.push('Nome é obrigatório');
    } else if (profile.name.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    } else if (profile.name.trim().length > 100) {
      errors.push('Nome deve ter no máximo 100 caracteres');
    }
  }

  if (profile.email !== undefined) {
    if (profile.email && !isValidEmail(profile.email)) {
      errors.push('Email deve ter um formato válido');
    }
  }

  if (profile.photo !== undefined) {
    if (profile.photo && !isValidUrl(profile.photo)) {
      errors.push('URL da foto deve ser válida');
    }
  }

  return errors;
}

// Data validation functions
export function validateProject(project: Partial<Project>): string[] {
  const errors: string[] = [];

  if (!project.clientName || project.clientName.trim().length === 0) {
    errors.push('Nome do cliente é obrigatório');
  }

  if (project.clientName && project.clientName.trim().length < 2) {
    errors.push('Nome do cliente deve ter pelo menos 2 caracteres');
  }

  if (project.clientName && project.clientName.trim().length > 200) {
    errors.push('Nome do cliente deve ter no máximo 200 caracteres');
  }

  return errors;
}

// Utility validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Storage health and utilities
export function getStorageInfo(): {
  projectsCount: number;
  hasUserProfile: boolean;
  storageUsed: number;
  lastModified: Date | null;
} {
  try {
    const projects = getProjects();
    const profile = getUserProfile();
    const projectsData = localStorage.getItem(STORAGE_KEYS.PROJECTS) || '';
    const profileData = localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || '';

    const storageUsed = (projectsData.length + profileData.length) * 2; // Approximate bytes

    const lastModified = projects.length > 0
      ? new Date(Math.max(...projects.map(p => p.createdAt.getTime())))
      : null;

    return {
      projectsCount: projects.length,
      hasUserProfile: profile !== null,
      storageUsed,
      lastModified,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return {
      projectsCount: 0,
      hasUserProfile: false,
      storageUsed: 0,
      lastModified: null,
    };
  }
}

export function exportData(): string {
  try {
    const projects = getProjects();
    const profile = getUserProfile();

    const exportData = {
      projects,
      profile,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };

    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error('Failed to export data');
  }
}

export function importData(jsonData: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonData);

    if (!data.projects || !Array.isArray(data.projects)) {
      return { success: false, message: 'Invalid data format: projects array not found' };
    }

    // Validate each project
    for (const project of data.projects) {
      const errors = validateProject(project);
      if (errors.length > 0) {
        return { success: false, message: `Invalid project data: ${errors.join(', ')}` };
      }
    }

    // Validate profile if present
    if (data.profile) {
      const profileErrors = validateUserProfile(data.profile);
      if (profileErrors.length > 0) {
        return { success: false, message: `Invalid profile data: ${profileErrors.join(', ')}` };
      }
    }

    // Import data
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data.projects));
    if (data.profile) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.profile));
    }

    return { success: true, message: 'Data imported successfully' };
  } catch (error) {
    console.error('Error importing data:', error);
    return { success: false, message: 'Failed to import data: Invalid JSON format' };
  }
}

// Clear all data (useful for development/testing)
export function clearAllData(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
}