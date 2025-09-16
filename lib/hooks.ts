'use client';

import { useState, useEffect, useCallback } from 'react';
import { Project, UserProfile } from './types';
import {
  getProjects,
  saveProject,
  updateProject,
  deleteProject,
  getProject,
  searchProjects,
  getRecentProjects,
  getUserProfile,
  saveUserProfile,
  validateProject,
  validateUserProfile,
  getStorageInfo,
} from './storage';

// Projects hooks
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = getProjects();
      setProjects(projectsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const createProject = useCallback(async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      setError(null);

      // Validate project data
      const validationErrors = validateProject(projectData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      const newProject = saveProject(projectData);
      setProjects(prev => [newProject, ...prev]);
      return { success: true, project: newProject };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const updateProjectData = useCallback(async (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
    try {
      setError(null);
      const updatedProject = updateProject(id, updates);

      if (updatedProject) {
        setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
        return { success: true, project: updatedProject };
      }

      throw new Error('Project not found');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const removeProject = useCallback(async (id: string) => {
    try {
      setError(null);
      const success = deleteProject(id);

      if (success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        return { success: true };
      }

      throw new Error('Failed to delete project');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const refreshProjects = useCallback(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject: updateProjectData,
    deleteProject: removeProject,
    refreshProjects,
  };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      const projectData = getProject(id);
      setProject(projectData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { project, loading, error };
}

export function useProjectSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback((query: string) => {
    setIsSearching(true);
    setSearchQuery(query);

    try {
      const results = searchProjects(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    searchResults,
    isSearching,
    search,
    clearSearch,
  };
}

export function useRecentProjects(limit: number = 5) {
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      const recent = getRecentProjects(limit);
      setRecentProjects(recent);
    } catch (error) {
      console.error('Failed to load recent projects:', error);
      setRecentProjects([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  return { recentProjects, loading };
}

// User profile hooks
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const profileData = getUserProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(async (profileData: UserProfile) => {
    try {
      setError(null);

      // Validate profile data
      const validationErrors = validateUserProfile(profileData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      const success = saveUserProfile(profileData);
      if (success) {
        setProfile(profileData);
        return { success: true };
      }

      throw new Error('Failed to save profile');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile: loadProfile,
  };
}

// Storage management hooks
export function useStorageInfo() {
  const [storageInfo, setStorageInfo] = useState({
    projectsCount: 0,
    hasUserProfile: false,
    storageUsed: 0,
    lastModified: null as Date | null,
  });

  const refreshStorageInfo = useCallback(() => {
    const info = getStorageInfo();
    setStorageInfo(info);
  }, []);

  useEffect(() => {
    refreshStorageInfo();
  }, [refreshStorageInfo]);

  return {
    storageInfo,
    refreshStorageInfo,
  };
}

// Local storage operations hook
export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { exportData: exportDataFn } = await import('./storage');
      const data = exportDataFn();

      // Create and download file
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `arqdesign-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export data';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const importData = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const text = await file.text();
      const { importData: importDataFn } = await import('./storage');
      const result = importDataFn(text);

      if (result.success) {
        // Trigger a page reload to reflect the imported data
        window.location.reload();
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to import data';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { clearAllData: clearAllDataFn } = await import('./storage');
      clearAllDataFn();

      // Trigger a page reload to reflect the cleared data
      window.location.reload();

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear data';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    exportData,
    importData,
    clearAllData,
  };
}