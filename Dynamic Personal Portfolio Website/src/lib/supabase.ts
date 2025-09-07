import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { mockApi } from './mock-api';

// Safely access environment variables with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  if (typeof window !== 'undefined') {
    try {
      return (globalThis as any).import?.meta?.env?.[key] || fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
};

// Use environment variables or fallback to demo values
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', `https://${projectId}.supabase.co`);
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', publicAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server API base URL - use environment variable or construct from project ID
const envSupabaseUrl = getEnvVar('VITE_SUPABASE_URL', '');
const SERVER_BASE_URL = envSupabaseUrl 
  ? `${envSupabaseUrl}/functions/v1/make-server-ab7fd8fd`
  : `https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd`;

// Helper function to make API requests to our server
async function makeApiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${SERVER_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // If server is not available, throw error for fallback to mock data
    throw new Error(`Server unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Database types
export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url: string;
  demo_url?: string;
  github_url?: string;
  tech_stack: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'draft';
  featured: boolean;
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  issue_date: string;
  expiry_date?: string;
  credential_id: string;
  credential_url?: string;
  status: 'valid' | 'expired';
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category?: string;
  published: boolean;
  published_at?: string;
  tags: string[];
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  job_title: string;
  bio: string;
  phone?: string;
  location?: string;
  website?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  profile_image?: string;
  resume_url?: string;
  updated_at: string;
}

// API functions with fallback to mock API
export const projectsApi = {
  async getAll() {
    try {
      const response = await makeApiRequest('/projects');
      return response.data as Project[];
    } catch (error) {
      console.warn('Server unavailable, using mock data for projects');
      return await mockApi.projects.getAll();
    }
  },

  async getFeatured() {
    try {
      const response = await makeApiRequest('/projects/featured');
      return response.data as Project[];
    } catch (error) {
      console.warn('Server unavailable, using mock data for featured projects');
      return await mockApi.projects.getFeatured();
    }
  },

  async getBySlug(slug: string) {
    try {
      const response = await makeApiRequest(`/projects/${slug}`);
      return response.data as Project;
    } catch (error) {
      console.warn('Server unavailable, using mock data for project');
      return await mockApi.projects.getBySlug(slug);
    }
  },

  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>, accessToken?: string) {
    try {
      const response = await makeApiRequest('/projects', {
        method: 'POST',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
        body: JSON.stringify(project),
      });
      return response.data as Project;
    } catch (error) {
      console.warn('Server unavailable, using mock API for project creation');
      return await mockApi.projects.create(project);
    }
  },

  async update(id: string, updates: Partial<Project>, accessToken?: string) {
    try {
      const response = await makeApiRequest(`/projects/${id}`, {
        method: 'PUT',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
        body: JSON.stringify(updates),
      });
      return response.data as Project;
    } catch (error) {
      console.warn('Server unavailable, using mock API for project update');
      return await mockApi.projects.update(id, updates);
    }
  },

  async delete(id: string, accessToken?: string) {
    try {
      await makeApiRequest(`/projects/${id}`, {
        method: 'DELETE',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
      });
    } catch (error) {
      console.warn('Server unavailable, using mock API for project deletion');
      await mockApi.projects.delete(id);
    }
  }
};

export const certificationsApi = {
  async getAll() {
    try {
      const response = await makeApiRequest('/certifications');
      return response.data as Certification[];
    } catch (error) {
      console.warn('Server unavailable, using mock data for certifications');
      return await mockApi.certifications.getAll();
    }
  },

  async getRecent(limit = 4) {
    try {
      const response = await makeApiRequest(`/certifications/recent?limit=${limit}`);
      return response.data as Certification[];
    } catch (error) {
      console.warn('Server unavailable, using mock data for recent certifications');
      return await mockApi.certifications.getRecent(limit);
    }
  },

  async getBySlug(slug: string) {
    try {
      const response = await makeApiRequest(`/certifications/${slug}`);
      return response.data as Certification;
    } catch (error) {
      console.warn('Server unavailable, using mock data for certification');
      return await mockApi.certifications.getBySlug(slug);
    }
  },

  async create(certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'>, accessToken?: string) {
    try {
      const response = await makeApiRequest('/certifications', {
        method: 'POST',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
        body: JSON.stringify(certification),
      });
      return response.data as Certification;
    } catch (error) {
      console.warn('Server unavailable, using mock API for certification creation');
      return await mockApi.certifications.create(certification);
    }
  },

  async update(id: string, updates: Partial<Certification>, accessToken?: string) {
    try {
      const response = await makeApiRequest(`/certifications/${id}`, {
        method: 'PUT',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
        body: JSON.stringify(updates),
      });
      return response.data as Certification;
    } catch (error) {
      console.warn('Server unavailable, using mock API for certification update');
      return await mockApi.certifications.update(id, updates);
    }
  },

  async delete(id: string, accessToken?: string) {
    try {
      await makeApiRequest(`/certifications/${id}`, {
        method: 'DELETE',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
      });
    } catch (error) {
      console.warn('Server unavailable, using mock API for certification deletion');
      await mockApi.certifications.delete(id);
    }
  }
};

export const blogApi = {
  async getAll() {
    try {
      const response = await makeApiRequest('/blog-posts');
      return response.data as BlogPost[];
    } catch (error) {
      console.warn('Server unavailable, using mock data for blog posts');
      return await mockApi.blog.getAll();
    }
  },

  async getRecent(limit = 3) {
    try {
      const response = await makeApiRequest(`/blog-posts/recent?limit=${limit}`);
      return response.data as BlogPost[];
    } catch (error) {
      console.warn('Server unavailable, using mock data for recent blog posts');
      return await mockApi.blog.getRecent(limit);
    }
  },

  async getBySlug(slug: string) {
    try {
      const response = await makeApiRequest(`/blog-posts/${slug}`);
      return response.data as BlogPost;
    } catch (error) {
      console.warn('Server unavailable, using mock data for blog post');
      return await mockApi.blog.getBySlug(slug);
    }
  },

  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>, accessToken?: string) {
    try {
      const response = await makeApiRequest('/blog-posts', {
        method: 'POST',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
        body: JSON.stringify(post),
      });
      return response.data as BlogPost;
    } catch (error) {
      console.warn('Server unavailable, using mock API for blog post creation');
      return await mockApi.blog.create(post);
    }
  },

  async update(id: string, updates: Partial<BlogPost>, accessToken?: string) {
    try {
      const response = await makeApiRequest(`/blog-posts/${id}`, {
        method: 'PUT',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
        body: JSON.stringify(updates),
      });
      return response.data as BlogPost;
    } catch (error) {
      console.warn('Server unavailable, using mock API for blog post update');
      return await mockApi.blog.update(id, updates);
    }
  },

  async delete(id: string, accessToken?: string) {
    try {
      await makeApiRequest(`/blog-posts/${id}`, {
        method: 'DELETE',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
      });
    } catch (error) {
      console.warn('Server unavailable, using mock API for blog post deletion');
      await mockApi.blog.delete(id);
    }
  }
};

export const profileApi = {
  async get() {
    try {
      const response = await makeApiRequest('/profile');
      return response.data as Profile;
    } catch (error) {
      console.warn('Server unavailable, using mock data for profile');
      return await mockApi.profile.get();
    }
  },

  async update(updates: Partial<Profile>, accessToken?: string) {
    try {
      const response = await makeApiRequest('/profile', {
        method: 'PUT',
        headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
        body: JSON.stringify(updates),
      });
      return response.data as Profile;
    } catch (error) {
      console.warn('Server unavailable, using mock API for profile update');
      return await mockApi.profile.update(updates);
    }
  }
};

// Auth API for admin authentication
export const authApi = {
  async signIn(email: string, password: string) {
    try {
      // Try server authentication first
      const response = await makeApiRequest('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return response.data;
    } catch (error) {
      // Fallback to mock authentication for demo
      console.warn('Server auth unavailable, using mock authentication');
      
      // Demo credentials
      if (email === 'admin@example.com' && password === 'admin123') {
        const mockSession = {
          access_token: 'mock-admin-token-' + Date.now(),
          user: {
            id: 'mock-admin-id',
            email: email,
            user_metadata: { role: 'admin' }
          }
        };
        
        // Store mock session in localStorage for demo
        localStorage.setItem('mock-admin-session', JSON.stringify(mockSession));
        return mockSession;
      } else {
        throw new Error('Invalid credentials');
      }
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.warn('Supabase signout failed, clearing mock session');
    }
    
    // Always clear mock session
    localStorage.removeItem('mock-admin-session');
  },

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.warn('Supabase session unavailable, checking mock session');
      
      // Fallback to mock session
      const mockSession = localStorage.getItem('mock-admin-session');
      if (mockSession) {
        try {
          return JSON.parse(mockSession);
        } catch (e) {
          localStorage.removeItem('mock-admin-session');
          return null;
        }
      }
      return null;
    }
  }
};