import { createClient } from 'npm:@supabase/supabase-js@2'

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

export async function initializeDatabase() {
  console.log('🔧 Checking database tables...')
  
  try {
    const results = {
      projects: false,
      certifications: false,
      services: false,
      blog_posts: false,
      about_me: false
    }
    
    // Test if tables exist by trying to query them
    try {
      await supabase.from('projects').select('id').limit(1)
      results.projects = true
      console.log('✓ Projects table exists')
    } catch (error) {
      console.log('✗ Projects table missing')
    }
    
    try {
      await supabase.from('certifications').select('id').limit(1)
      results.certifications = true
      console.log('✓ Certifications table exists')
    } catch (error) {
      console.log('✗ Certifications table missing')
    }
    
    try {
      await supabase.from('services').select('id').limit(1)
      results.services = true
      console.log('✓ Services table exists')
    } catch (error) {
      console.log('✗ Services table missing')
    }
    
    try {
      await supabase.from('blog_posts').select('id').limit(1)
      results.blog_posts = true
      console.log('✓ Blog posts table exists')
    } catch (error) {
      console.log('✗ Blog posts table missing')
    }
    
    try {
      await supabase.from('about_me').select('id').limit(1)
      results.about_me = true
      console.log('✓ About me table exists')
    } catch (error) {
      console.log('✗ About me table missing')
    }
    
    const allTablesExist = Object.values(results).every(exists => exists)
    
    if (allTablesExist) {
      console.log('✅ All database tables exist and are accessible')
      return {
        success: true,
        message: 'All database tables exist and are accessible',
        tables: results,
        sqlInstructions: null
      }
    } else {
      console.log('⚠️ Some database tables are missing')
      
      // Return SQL instructions for manual setup
      const sqlInstructions = `
-- Execute the following SQL in your Supabase SQL Editor:

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT,
  status TEXT DEFAULT 'in-progress',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  status TEXT DEFAULT 'valid',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  image_url TEXT,
  category TEXT,
  status TEXT DEFAULT 'available',
  featured BOOLEAN DEFAULT false,
  features TEXT[] DEFAULT '{}',
  tools TEXT[] DEFAULT '{}',
  duration TEXT,
  availability TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About me table
CREATE TABLE IF NOT EXISTS about_me (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personal_info JSONB,
  skills JSONB,
  experience JSONB,
  education JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

CREATE INDEX IF NOT EXISTS idx_certifications_slug ON certifications(slug);
CREATE INDEX IF NOT EXISTS idx_certifications_status ON certifications(status);
CREATE INDEX IF NOT EXISTS idx_certifications_issue_date ON certifications(issue_date);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_me ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on about_me" ON about_me FOR SELECT USING (true);

-- Allow authenticated users to perform all operations (for admin functionality)
CREATE POLICY "Allow authenticated users full access on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on about_me" ON about_me FOR ALL USING (auth.role() = 'authenticated');
`
      
      return {
        success: false,
        message: 'Database tables need to be created manually',
        tables: results,
        sqlInstructions
      }
    }
  } catch (error) {
    console.error('❌ Error checking database:', error)
    return {
      success: false,
      error: error.message,
      message: 'Failed to check database tables',
      tables: null,
      sqlInstructions: null
    }
  }
}