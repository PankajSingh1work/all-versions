import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  skills: string[];
  date_earned: string;
  valid_until?: string;
  credential_id: string;
  logo_url: string;
  certificate_url?: string;
  status: 'valid' | 'expired';
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  published: boolean;
  published_at?: string;
  tags: string[];
  reading_time: number;
  views: number;
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  job_title: string;
  bio: string;
  location: string;
  profile_image?: string;
  resume_url?: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  updated_at: string;
}

// API functions
export const projectsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(6);
    
    if (error) throw error;
    return data as Project[];
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const certificationsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('date_earned', { ascending: false });
    
    if (error) throw error;
    return data as Certification[];
  },

  async getRecent(limit = 4) {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('status', 'valid')
      .order('date_earned', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as Certification[];
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data as Certification;
  },

  async create(certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('certifications')
      .insert([certification])
      .select()
      .single();
    
    if (error) throw error;
    return data as Certification;
  },

  async update(id: string, updates: Partial<Certification>) {
    const { data, error } = await supabase
      .from('certifications')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Certification;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const blogApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data as BlogPost[];
  },

  async getRecent(limit = 3) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as BlogPost[];
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    
    // Increment view count
    await supabase
      .from('blog_posts')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id);
    
    return data as BlogPost;
  },

  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ ...post, views: 0 }])
      .select()
      .single();
    
    if (error) throw error;
    return data as BlogPost;
  },

  async update(id: string, updates: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as BlogPost;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const profileApi = {
  async get() {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  async update(updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profile')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', updates.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Profile;
  }
};