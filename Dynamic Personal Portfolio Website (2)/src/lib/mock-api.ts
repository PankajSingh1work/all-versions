// Mock API service for demo purposes when Supabase server is not available
import { mockProjects, mockCertifications, mockBlogPosts, mockServices, mockProfile } from './mock-data';
import type { Project, Certification, BlogPost, Service, Profile } from './supabase';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys for persistence in demo
const STORAGE_KEYS = {
  projects: 'portfolio_demo_projects',
  certifications: 'portfolio_demo_certifications',
  blogPosts: 'portfolio_demo_blog_posts',
  services: 'portfolio_demo_services',
  profile: 'portfolio_demo_profile'
};

// Helper to get data from localStorage with fallback to mock data
function getStoredData<T>(key: string, fallback: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function getStoredProfile(): Profile {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.profile);
    return stored ? JSON.parse(stored) : mockProfile;
  } catch {
    return mockProfile;
  }
}

// Helper to save data to localStorage
function saveStoredData<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

function saveStoredProfile(profile: Profile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  } catch (error) {
    console.warn('Failed to save profile to localStorage:', error);
  }
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

// Mock API implementation
export const mockApi = {
  projects: {
    async getAll(): Promise<Project[]> {
      await delay(300);
      return getStoredData(STORAGE_KEYS.projects, mockProjects);
    },

    async getFeatured(): Promise<Project[]> {
      await delay(300);
      const projects = getStoredData(STORAGE_KEYS.projects, mockProjects);
      return projects
        .filter(p => p.featured && p.status === 'completed')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 6);
    },

    async getBySlug(slug: string): Promise<Project> {
      await delay(300);
      const projects = getStoredData(STORAGE_KEYS.projects, mockProjects);
      const project = projects.find(p => p.slug === slug);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    },

    async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
      await delay(500);
      const projects = getStoredData(STORAGE_KEYS.projects, mockProjects);
      const now = new Date().toISOString();
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        slug: generateSlug(project.title),
        created_at: now,
        updated_at: now
      };
      
      const updatedProjects = [newProject, ...projects];
      saveStoredData(STORAGE_KEYS.projects, updatedProjects);
      return newProject;
    },

    async update(id: string, updates: Partial<Project>): Promise<Project> {
      await delay(500);
      const projects = getStoredData(STORAGE_KEYS.projects, mockProjects);
      const projectIndex = projects.findIndex(p => p.id === id);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }
      
      const updatedProject: Project = {
        ...projects[projectIndex],
        ...updates,
        id, // Ensure ID doesn't change
        updated_at: new Date().toISOString()
      };
      
      // Update slug if title changed
      if (updates.title && updates.title !== projects[projectIndex].title) {
        updatedProject.slug = generateSlug(updates.title);
      }
      
      projects[projectIndex] = updatedProject;
      saveStoredData(STORAGE_KEYS.projects, projects);
      return updatedProject;
    },

    async delete(id: string): Promise<void> {
      await delay(500);
      const projects = getStoredData(STORAGE_KEYS.projects, mockProjects);
      const filteredProjects = projects.filter(p => p.id !== id);
      saveStoredData(STORAGE_KEYS.projects, filteredProjects);
    }
  },

  certifications: {
    async getAll(): Promise<Certification[]> {
      await delay(300);
      const certifications = getStoredData(STORAGE_KEYS.certifications, mockCertifications);
      return certifications.sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime());
    },

    async getRecent(limit = 4): Promise<Certification[]> {
      await delay(300);
      const certifications = getStoredData(STORAGE_KEYS.certifications, mockCertifications);
      return certifications
        .filter(c => c.status === 'valid')
        .sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime())
        .slice(0, limit);
    },

    async getBySlug(slug: string): Promise<Certification> {
      await delay(300);
      const certifications = getStoredData(STORAGE_KEYS.certifications, mockCertifications);
      // Find by generated slug from title since certifications don't have slug field
      const certification = certifications.find(c => generateSlug(c.title) === slug);
      if (!certification) {
        throw new Error('Certification not found');
      }
      return certification;
    },

    async create(certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'>): Promise<Certification> {
      await delay(500);
      const certifications = getStoredData(STORAGE_KEYS.certifications, mockCertifications);
      const now = new Date().toISOString();
      const newCertification: Certification = {
        ...certification,
        id: Date.now().toString(),
        created_at: now,
        updated_at: now
      };
      
      const updatedCertifications = [newCertification, ...certifications];
      saveStoredData(STORAGE_KEYS.certifications, updatedCertifications);
      return newCertification;
    },

    async update(id: string, updates: Partial<Certification>): Promise<Certification> {
      await delay(500);
      const certifications = getStoredData(STORAGE_KEYS.certifications, mockCertifications);
      const certificationIndex = certifications.findIndex(c => c.id === id);
      
      if (certificationIndex === -1) {
        throw new Error('Certification not found');
      }
      
      const updatedCertification: Certification = {
        ...certifications[certificationIndex],
        ...updates,
        id,
        updated_at: new Date().toISOString()
      };
      
      // No slug needed for certifications in the new interface
      
      certifications[certificationIndex] = updatedCertification;
      saveStoredData(STORAGE_KEYS.certifications, certifications);
      return updatedCertification;
    },

    async delete(id: string): Promise<void> {
      await delay(500);
      const certifications = getStoredData(STORAGE_KEYS.certifications, mockCertifications);
      const filteredCertifications = certifications.filter(c => c.id !== id);
      saveStoredData(STORAGE_KEYS.certifications, filteredCertifications);
    }
  },

  blog: {
    async getAll(): Promise<BlogPost[]> {
      await delay(300);
      const posts = getStoredData(STORAGE_KEYS.blogPosts, mockBlogPosts);
      return posts
        .filter(p => p.published)
        .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
    },

    async getRecent(limit = 3): Promise<BlogPost[]> {
      await delay(300);
      const posts = getStoredData(STORAGE_KEYS.blogPosts, mockBlogPosts);
      return posts
        .filter(p => p.published)
        .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
        .slice(0, limit);
    },

    async getBySlug(slug: string): Promise<BlogPost> {
      await delay(300);
      const posts = getStoredData(STORAGE_KEYS.blogPosts, mockBlogPosts);
      const postIndex = posts.findIndex(p => p.slug === slug);
      
      if (postIndex === -1) {
        throw new Error('Blog post not found');
      }
      
      // Increment view count
      const updatedPost = {
        ...posts[postIndex],
        views: (posts[postIndex].views || 0) + 1
      };
      
      posts[postIndex] = updatedPost;
      saveStoredData(STORAGE_KEYS.blogPosts, posts);
      return updatedPost;
    },

    async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<BlogPost> {
      await delay(500);
      const posts = getStoredData(STORAGE_KEYS.blogPosts, mockBlogPosts);
      const now = new Date().toISOString();
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        slug: generateSlug(post.title),
        views: 0,
        created_at: now,
        updated_at: now,
        published_at: post.published ? now : null
      };
      
      const updatedPosts = [newPost, ...posts];
      saveStoredData(STORAGE_KEYS.blogPosts, updatedPosts);
      return newPost;
    },

    async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
      await delay(500);
      const posts = getStoredData(STORAGE_KEYS.blogPosts, mockBlogPosts);
      const postIndex = posts.findIndex(p => p.id === id);
      
      if (postIndex === -1) {
        throw new Error('Blog post not found');
      }
      
      const updatedPost: BlogPost = {
        ...posts[postIndex],
        ...updates,
        id,
        updated_at: new Date().toISOString()
      };
      
      if (updates.title && updates.title !== posts[postIndex].title) {
        updatedPost.slug = generateSlug(updates.title);
      }
      
      // Set published_at if publishing for the first time
      if (updates.published && !posts[postIndex].published_at) {
        updatedPost.published_at = new Date().toISOString();
      }
      
      posts[postIndex] = updatedPost;
      saveStoredData(STORAGE_KEYS.blogPosts, posts);
      return updatedPost;
    },

    async delete(id: string): Promise<void> {
      await delay(500);
      const posts = getStoredData(STORAGE_KEYS.blogPosts, mockBlogPosts);
      const filteredPosts = posts.filter(p => p.id !== id);
      saveStoredData(STORAGE_KEYS.blogPosts, filteredPosts);
    }
  },

  services: {
    async getAll(): Promise<Service[]> {
      await delay(300);
      return getStoredData(STORAGE_KEYS.services, mockServices);
    },

    async getFeatured(): Promise<Service[]> {
      await delay(300);
      const services = getStoredData(STORAGE_KEYS.services, mockServices);
      return services
        .filter(s => s.featured && s.status === 'available')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 6);
    },

    async getBySlug(slug: string): Promise<Service> {
      await delay(300);
      const services = getStoredData(STORAGE_KEYS.services, mockServices);
      const service = services.find(s => s.slug === slug);
      if (!service) {
        throw new Error('Service not found');
      }
      return service;
    },

    async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
      await delay(500);
      const services = getStoredData(STORAGE_KEYS.services, mockServices);
      const now = new Date().toISOString();
      const newService: Service = {
        ...service,
        id: Date.now().toString(),
        slug: generateSlug(service.title),
        created_at: now,
        updated_at: now
      };
      
      const updatedServices = [newService, ...services];
      saveStoredData(STORAGE_KEYS.services, updatedServices);
      return newService;
    },

    async update(id: string, updates: Partial<Service>): Promise<Service> {
      await delay(500);
      const services = getStoredData(STORAGE_KEYS.services, mockServices);
      const serviceIndex = services.findIndex(s => s.id === id);
      
      if (serviceIndex === -1) {
        throw new Error('Service not found');
      }
      
      const updatedService: Service = {
        ...services[serviceIndex],
        ...updates,
        id, // Ensure ID doesn't change
        updated_at: new Date().toISOString()
      };
      
      // Update slug if title changed
      if (updates.title && updates.title !== services[serviceIndex].title) {
        updatedService.slug = generateSlug(updates.title);
      }
      
      services[serviceIndex] = updatedService;
      saveStoredData(STORAGE_KEYS.services, services);
      return updatedService;
    },

    async delete(id: string): Promise<void> {
      await delay(500);
      const services = getStoredData(STORAGE_KEYS.services, mockServices);
      const filteredServices = services.filter(s => s.id !== id);
      saveStoredData(STORAGE_KEYS.services, filteredServices);
    }
  },

  profile: {
    async get(): Promise<Profile> {
      await delay(300);
      return getStoredProfile();
    },

    async update(updates: Partial<Profile>): Promise<Profile> {
      await delay(500);
      const currentProfile = getStoredProfile();
      const updatedProfile: Profile = {
        ...currentProfile,
        ...updates,
        id: 'main',
        updated_at: new Date().toISOString()
      };
      
      saveStoredProfile(updatedProfile);
      return updatedProfile;
    }
  }
};