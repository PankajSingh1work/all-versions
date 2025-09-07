import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'
import { seedDatabase } from './seed-data.tsx'

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

// Helper function to check admin authentication
async function isAdmin(request: Request): Promise<{ isValid: boolean; userId?: string }> {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1]
  
  if (!accessToken) {
    return { isValid: false }
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      return { isValid: false }
    }

    // Check if user is admin (you can store this in user metadata or a separate table)
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'admin@example.com'
    const isAdminUser = user.email === adminEmail || user.user_metadata?.role === 'admin'
    
    return { isValid: isAdminUser, userId: user.id }
  } catch (error) {
    console.error('Auth error:', error)
    return { isValid: false }
  }
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
}

// Routes for Projects
app.get('/make-server-ab7fd8fd/projects', async (c) => {
  try {
    const projects = await kv.getByPrefix('project:')
    const projectsData = projects.map(p => p.value).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    
    return c.json({ success: true, data: projectsData })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return c.json({ success: false, error: 'Failed to fetch projects' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/projects/featured', async (c) => {
  try {
    const projects = await kv.getByPrefix('project:')
    const featuredProjects = projects
      .map(p => p.value)
      .filter(p => p.featured && p.status === 'completed')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6)
    
    return c.json({ success: true, data: featuredProjects })
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return c.json({ success: false, error: 'Failed to fetch featured projects' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/projects/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const projects = await kv.getByPrefix('project:')
    const project = projects.find(p => p.value.slug === slug)
    
    if (!project) {
      return c.json({ success: false, error: 'Project not found' }, 404)
    }
    
    return c.json({ success: true, data: project.value })
  } catch (error) {
    console.error('Error fetching project:', error)
    return c.json({ success: false, error: 'Failed to fetch project' }, 500)
  }
})

app.post('/make-server-ab7fd8fd/projects', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const projectData = await c.req.json()
    const id = crypto.randomUUID()
    const slug = generateSlug(projectData.title)
    const now = new Date().toISOString()
    
    const project = {
      id,
      slug,
      ...projectData,
      created_at: now,
      updated_at: now
    }
    
    await kv.set(`project:${id}`, project)
    
    return c.json({ success: true, data: project })
  } catch (error) {
    console.error('Error creating project:', error)
    return c.json({ success: false, error: 'Failed to create project' }, 500)
  }
})

app.put('/make-server-ab7fd8fd/projects/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    const updates = await c.req.json()
    
    const existingProject = await kv.get(`project:${id}`)
    if (!existingProject) {
      return c.json({ success: false, error: 'Project not found' }, 404)
    }
    
    const updatedProject = {
      ...existingProject,
      ...updates,
      id, // Ensure ID doesn't change
      updated_at: new Date().toISOString()
    }
    
    // Update slug if title changed
    if (updates.title && updates.title !== existingProject.title) {
      updatedProject.slug = generateSlug(updates.title)
    }
    
    await kv.set(`project:${id}`, updatedProject)
    
    return c.json({ success: true, data: updatedProject })
  } catch (error) {
    console.error('Error updating project:', error)
    return c.json({ success: false, error: 'Failed to update project' }, 500)
  }
})

app.delete('/make-server-ab7fd8fd/projects/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    await kv.del(`project:${id}`)
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return c.json({ success: false, error: 'Failed to delete project' }, 500)
  }
})

// Routes for Certifications
app.get('/make-server-ab7fd8fd/certifications', async (c) => {
  try {
    const certifications = await kv.getByPrefix('certification:')
    const certificationsData = certifications.map(c => c.value).sort((a, b) => 
      new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()
    )
    
    return c.json({ success: true, data: certificationsData })
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return c.json({ success: false, error: 'Failed to fetch certifications' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/certifications/recent', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '4')
    const certifications = await kv.getByPrefix('certification:')
    const recentCertifications = certifications
      .map(c => c.value)
      .filter(c => c.status === 'valid')
      .sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime())
      .slice(0, limit)
    
    return c.json({ success: true, data: recentCertifications })
  } catch (error) {
    console.error('Error fetching recent certifications:', error)
    return c.json({ success: false, error: 'Failed to fetch recent certifications' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/certifications/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const certifications = await kv.getByPrefix('certification:')
    const certification = certifications.find(c => c.value.slug === slug)
    
    if (!certification) {
      return c.json({ success: false, error: 'Certification not found' }, 404)
    }
    
    return c.json({ success: true, data: certification.value })
  } catch (error) {
    console.error('Error fetching certification:', error)
    return c.json({ success: false, error: 'Failed to fetch certification' }, 500)
  }
})

app.post('/make-server-ab7fd8fd/certifications', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const certificationData = await c.req.json()
    const id = crypto.randomUUID()
    const slug = generateSlug(certificationData.title)
    const now = new Date().toISOString()
    
    const certification = {
      id,
      slug,
      ...certificationData,
      created_at: now,
      updated_at: now
    }
    
    await kv.set(`certification:${id}`, certification)
    
    return c.json({ success: true, data: certification })
  } catch (error) {
    console.error('Error creating certification:', error)
    return c.json({ success: false, error: 'Failed to create certification' }, 500)
  }
})

app.put('/make-server-ab7fd8fd/certifications/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    const updates = await c.req.json()
    
    const existingCertification = await kv.get(`certification:${id}`)
    if (!existingCertification) {
      return c.json({ success: false, error: 'Certification not found' }, 404)
    }
    
    const updatedCertification = {
      ...existingCertification,
      ...updates,
      id,
      updated_at: new Date().toISOString()
    }
    
    if (updates.title && updates.title !== existingCertification.title) {
      updatedCertification.slug = generateSlug(updates.title)
    }
    
    await kv.set(`certification:${id}`, updatedCertification)
    
    return c.json({ success: true, data: updatedCertification })
  } catch (error) {
    console.error('Error updating certification:', error)
    return c.json({ success: false, error: 'Failed to update certification' }, 500)
  }
})

app.delete('/make-server-ab7fd8fd/certifications/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    await kv.del(`certification:${id}`)
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting certification:', error)
    return c.json({ success: false, error: 'Failed to delete certification' }, 500)
  }
})

// Routes for Blog Posts
app.get('/make-server-ab7fd8fd/blog-posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('blog:')
    const publishedPosts = posts
      .map(p => p.value)
      .filter(p => p.published)
      .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
    
    return c.json({ success: true, data: publishedPosts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return c.json({ success: false, error: 'Failed to fetch blog posts' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/blog-posts/recent', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '3')
    const posts = await kv.getByPrefix('blog:')
    const recentPosts = posts
      .map(p => p.value)
      .filter(p => p.published)
      .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
      .slice(0, limit)
    
    return c.json({ success: true, data: recentPosts })
  } catch (error) {
    console.error('Error fetching recent blog posts:', error)
    return c.json({ success: false, error: 'Failed to fetch recent blog posts' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/blog-posts/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const posts = await kv.getByPrefix('blog:')
    const post = posts.find(p => p.value.slug === slug)
    
    if (!post) {
      return c.json({ success: false, error: 'Blog post not found' }, 404)
    }
    
    // Increment view count
    const updatedPost = {
      ...post.value,
      views: (post.value.views || 0) + 1
    }
    
    await kv.set(`blog:${post.value.id}`, updatedPost)
    
    return c.json({ success: true, data: updatedPost })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return c.json({ success: false, error: 'Failed to fetch blog post' }, 500)
  }
})

app.post('/make-server-ab7fd8fd/blog-posts', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const postData = await c.req.json()
    const id = crypto.randomUUID()
    const slug = generateSlug(postData.title)
    const now = new Date().toISOString()
    
    const post = {
      id,
      slug,
      ...postData,
      views: 0,
      created_at: now,
      updated_at: now,
      published_at: postData.published ? now : null
    }
    
    await kv.set(`blog:${id}`, post)
    
    return c.json({ success: true, data: post })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return c.json({ success: false, error: 'Failed to create blog post' }, 500)
  }
})

app.put('/make-server-ab7fd8fd/blog-posts/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    const updates = await c.req.json()
    
    const existingPost = await kv.get(`blog:${id}`)
    if (!existingPost) {
      return c.json({ success: false, error: 'Blog post not found' }, 404)
    }
    
    const updatedPost = {
      ...existingPost,
      ...updates,
      id,
      updated_at: new Date().toISOString()
    }
    
    if (updates.title && updates.title !== existingPost.title) {
      updatedPost.slug = generateSlug(updates.title)
    }
    
    // Set published_at if publishing for the first time
    if (updates.published && !existingPost.published_at) {
      updatedPost.published_at = new Date().toISOString()
    }
    
    await kv.set(`blog:${id}`, updatedPost)
    
    return c.json({ success: true, data: updatedPost })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return c.json({ success: false, error: 'Failed to update blog post' }, 500)
  }
})

app.delete('/make-server-ab7fd8fd/blog-posts/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    await kv.del(`blog:${id}`)
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return c.json({ success: false, error: 'Failed to delete blog post' }, 500)
  }
})

// Routes for Profile
app.get('/make-server-ab7fd8fd/profile', async (c) => {
  try {
    const profile = await kv.get('profile:main')
    
    if (!profile) {
      return c.json({ success: false, error: 'Profile not found' }, 404)
    }
    
    return c.json({ success: true, data: profile })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return c.json({ success: false, error: 'Failed to fetch profile' }, 500)
  }
})

app.put('/make-server-ab7fd8fd/profile', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const updates = await c.req.json()
    
    const existingProfile = await kv.get('profile:main') || {}
    
    const updatedProfile = {
      ...existingProfile,
      ...updates,
      id: 'main',
      updated_at: new Date().toISOString()
    }
    
    await kv.set('profile:main', updatedProfile)
    
    return c.json({ success: true, data: updatedProfile })
  } catch (error) {
    console.error('Error updating profile:', error)
    return c.json({ success: false, error: 'Failed to update profile' }, 500)
  }
})

// Admin authentication endpoint
app.post('/make-server-ab7fd8fd/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Sign-in error:', error)
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }
    
    // Check if user is admin
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'admin@example.com'
    const isAdminUser = data.user.email === adminEmail || data.user.user_metadata?.role === 'admin'
    
    if (!isAdminUser) {
      return c.json({ success: false, error: 'Access denied' }, 403)
    }
    
    return c.json({ 
      success: true, 
      data: { 
        access_token: data.session?.access_token,
        user: data.user 
      } 
    })
  } catch (error) {
    console.error('Authentication error:', error)
    return c.json({ success: false, error: 'Authentication failed' }, 500)
  }
})

// Seed database endpoint (admin only)
app.post('/make-server-ab7fd8fd/seed', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    await seedDatabase()
    return c.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Error seeding database:', error)
    return c.json({ success: false, error: 'Failed to seed database' }, 500)
  }
})

// Health check
app.get('/make-server-ab7fd8fd/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Initialize seed data on startup if database is empty
seedDatabase().catch(console.error)

Deno.serve(app.fetch)