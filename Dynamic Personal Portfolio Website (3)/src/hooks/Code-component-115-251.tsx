import { useState, useEffect } from 'react';
import { projectsApi, certificationsApi, blogApi, profileApi, Project, Certification, BlogPost, Profile } from '../lib/supabase';
import { mockProjects, mockCertifications, mockBlogPosts, mockProfile } from '../lib/mock-data';

// Custom hook for fetching projects
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from Supabase, fallback to mock data
        try {
          const data = await projectsApi.getAll();
          setProjects(data);
        } catch (supabaseError) {
          console.warn('Using mock data for projects:', supabaseError);
          setProjects(mockProjects);
        }
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: () => fetchProjects() };
}

// Custom hook for fetching featured projects
export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await projectsApi.getFeatured();
          setProjects(data);
        } catch (supabaseError) {
          console.warn('Using mock data for featured projects:', supabaseError);
          const featuredMockProjects = mockProjects.filter(p => p.featured);
          setProjects(featuredMockProjects);
        }
      } catch (err) {
        setError('Failed to fetch featured projects');
        console.error('Error fetching featured projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error };
}

// Custom hook for fetching certifications
export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertifications() {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await certificationsApi.getAll();
          setCertifications(data);
        } catch (supabaseError) {
          console.warn('Using mock data for certifications:', supabaseError);
          setCertifications(mockCertifications);
        }
      } catch (err) {
        setError('Failed to fetch certifications');
        console.error('Error fetching certifications:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCertifications();
  }, []);

  return { certifications, loading, error, refetch: () => fetchCertifications() };
}

// Custom hook for fetching recent certifications
export function useRecentCertifications(limit = 4) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentCertifications() {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await certificationsApi.getRecent(limit);
          setCertifications(data);
        } catch (supabaseError) {
          console.warn('Using mock data for recent certifications:', supabaseError);
          const recentMockCerts = mockCertifications.slice(0, limit);
          setCertifications(recentMockCerts);
        }
      } catch (err) {
        setError('Failed to fetch recent certifications');
        console.error('Error fetching recent certifications:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentCertifications();
  }, [limit]);

  return { certifications, loading, error };
}

// Custom hook for fetching blog posts
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await blogApi.getAll();
          setPosts(data);
        } catch (supabaseError) {
          console.warn('Using mock data for blog posts:', supabaseError);
          const publishedMockPosts = mockBlogPosts.filter(p => p.published);
          setPosts(publishedMockPosts);
        }
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  return { posts, loading, error, refetch: () => fetchBlogPosts() };
}

// Custom hook for fetching recent blog posts
export function useRecentBlogPosts(limit = 3) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await blogApi.getRecent(limit);
          setPosts(data);
        } catch (supabaseError) {
          console.warn('Using mock data for recent blog posts:', supabaseError);
          const recentMockPosts = mockBlogPosts
            .filter(p => p.published)
            .slice(0, limit);
          setPosts(recentMockPosts);
        }
      } catch (err) {
        setError('Failed to fetch recent blog posts');
        console.error('Error fetching recent blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentBlogPosts();
  }, [limit]);

  return { posts, loading, error };
}

// Custom hook for fetching profile
export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await profileApi.get();
          setProfile(data);
        } catch (supabaseError) {
          console.warn('Using mock data for profile:', supabaseError);
          setProfile(mockProfile);
        }
      } catch (err) {
        setError('Failed to fetch profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading, error, refetch: () => fetchProfile() };
}

// Custom hook for fetching a single project by slug
export function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await projectsApi.getBySlug(slug);
          setProject(data);
        } catch (supabaseError) {
          console.warn('Using mock data for project:', supabaseError);
          const mockProject = mockProjects.find(p => p.slug === slug);
          setProject(mockProject || null);
        }
      } catch (err) {
        setError('Failed to fetch project');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  return { project, loading, error };
}

// Custom hook for fetching a single certification by slug
export function useCertification(slug: string) {
  const [certification, setCertification] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertification() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await certificationsApi.getBySlug(slug);
          setCertification(data);
        } catch (supabaseError) {
          console.warn('Using mock data for certification:', supabaseError);
          const mockCert = mockCertifications.find(c => c.slug === slug);
          setCertification(mockCert || null);
        }
      } catch (err) {
        setError('Failed to fetch certification');
        console.error('Error fetching certification:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCertification();
  }, [slug]);

  return { certification, loading, error };
}

// Custom hook for fetching a single blog post by slug
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        try {
          const data = await blogApi.getBySlug(slug);
          setPost(data);
        } catch (supabaseError) {
          console.warn('Using mock data for blog post:', supabaseError);
          const mockPost = mockBlogPosts.find(p => p.slug === slug);
          setPost(mockPost || null);
        }
      } catch (err) {
        setError('Failed to fetch blog post');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

  return { post, loading, error };
}