import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Initialize Supabase client for server operations (service role)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Initialize Supabase client for auth operations (anon key)
const supabaseAuth = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
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
    // Use the service role client for server-side auth verification
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error || !user) {
      console.log('Auth verification failed:', error?.message || 'No user found')
      return { isValid: false }
    }

    // Check if user is admin
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'user@example.com'
    const isAdminUser = user.email === adminEmail || user.user_metadata?.role === 'admin'
    
    console.log('Auth check:', { 
      userEmail: user.email, 
      adminEmail, 
      isAdmin: isAdminUser 
    })
    
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

// Authentication Routes
app.post('/make-server-ab7fd8fd/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Sign in error:', error)
      return c.json({ success: false, error: error.message }, 401)
    }
    
    return c.json({ 
      success: true, 
      data: {
        user: data.user,
        session: data.session
      }
    })
  } catch (error) {
    console.error('Error during sign in:', error)
    return c.json({ success: false, error: 'Failed to sign in' }, 500)
  }
})

// Routes for Projects
app.get('/make-server-ab7fd8fd/projects', async (c) => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      
      // Check if it's a table not found error
      if (error.code === 'PGRST205' || error.code === 'PGRST106' || error.message?.includes('schema cache') || error.message?.includes('does not exist') || error.message?.includes('table')) {
        return c.json({ 
          success: false, 
          error: 'Database tables not found. Please initialize the database first.',
          code: 'TABLE_NOT_FOUND'
        }, 404)
      }
      
      return c.json({ success: false, error: 'Failed to fetch projects' }, 500)
    }
    
    return c.json({ success: true, data: projects || [] })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return c.json({ success: false, error: 'Failed to fetch projects' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/projects/featured', async (c) => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(6)
    
    if (error) {
      console.error('Error fetching featured projects:', error)
      return c.json({ success: false, error: 'Failed to fetch featured projects' }, 500)
    }
    
    return c.json({ success: true, data: projects || [] })
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return c.json({ success: false, error: 'Failed to fetch featured projects' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/projects/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error || !project) {
      return c.json({ success: false, error: 'Project not found' }, 404)
    }
    
    return c.json({ success: true, data: project })
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
    const slug = generateSlug(projectData.title)
    
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        ...projectData,
        slug,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating project:', error)
      return c.json({ success: false, error: 'Failed to create project' }, 500)
    }
    
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
    
    // Update slug if title changed
    if (updates.title) {
      updates.slug = generateSlug(updates.title)
    }
    
    updates.updated_at = new Date().toISOString()
    
    const { data: project, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating project:', error)
      return c.json({ success: false, error: 'Failed to update project' }, 500)
    }
    
    return c.json({ success: true, data: project })
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
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      return c.json({ success: false, error: 'Failed to delete project' }, 500)
    }
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return c.json({ success: false, error: 'Failed to delete project' }, 500)
  }
})

// Routes for Certifications
app.get('/make-server-ab7fd8fd/certifications', async (c) => {
  try {
    const { data: certifications, error } = await supabase
      .from('certifications')
      .select('*')
      .order('issue_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching certifications:', error)
      
      // Check if it's a table not found error
      if (error.code === 'PGRST205' || error.code === 'PGRST106' || error.message?.includes('schema cache') || error.message?.includes('does not exist') || error.message?.includes('table')) {
        return c.json({ 
          success: false, 
          error: 'Database tables not found. Please initialize the database first.',
          code: 'TABLE_NOT_FOUND'
        }, 404)
      }
      
      return c.json({ success: false, error: 'Failed to fetch certifications' }, 500)
    }
    
    return c.json({ success: true, data: certifications || [] })
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return c.json({ success: false, error: 'Failed to fetch certifications' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/certifications/recent', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '4')
    const { data: certifications, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('status', 'valid')
      .order('issue_date', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching recent certifications:', error)
      return c.json({ success: false, error: 'Failed to fetch recent certifications' }, 500)
    }
    
    return c.json({ success: true, data: certifications || [] })
  } catch (error) {
    console.error('Error fetching recent certifications:', error)
    return c.json({ success: false, error: 'Failed to fetch recent certifications' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/certifications/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const { data: certification, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error || !certification) {
      return c.json({ success: false, error: 'Certification not found' }, 404)
    }
    
    return c.json({ success: true, data: certification })
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
    const slug = generateSlug(certificationData.title)
    
    const { data: certification, error } = await supabase
      .from('certifications')
      .insert({
        ...certificationData,
        slug,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating certification:', error)
      return c.json({ success: false, error: 'Failed to create certification' }, 500)
    }
    
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
    
    if (updates.title) {
      updates.slug = generateSlug(updates.title)
    }
    
    updates.updated_at = new Date().toISOString()
    
    const { data: certification, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating certification:', error)
      return c.json({ success: false, error: 'Failed to update certification' }, 500)
    }
    
    return c.json({ success: true, data: certification })
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
    
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting certification:', error)
      return c.json({ success: false, error: 'Failed to delete certification' }, 500)
    }
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting certification:', error)
    return c.json({ success: false, error: 'Failed to delete certification' }, 500)
  }
})

// Routes for Blog Posts
app.get('/make-server-ab7fd8fd/blog-posts', async (c) => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      
      // Check if it's a table not found error
      if (error.code === 'PGRST205' || error.code === 'PGRST106' || error.message?.includes('schema cache') || error.message?.includes('does not exist') || error.message?.includes('table')) {
        return c.json({ 
          success: false, 
          error: 'Database tables not found. Please initialize the database first.',
          code: 'TABLE_NOT_FOUND'
        }, 404)
      }
      
      return c.json({ success: false, error: 'Failed to fetch blog posts' }, 500)
    }
    
    return c.json({ success: true, data: posts || [] })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return c.json({ success: false, error: 'Failed to fetch blog posts' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/blog-posts/recent', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '3')
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching recent blog posts:', error)
      return c.json({ success: false, error: 'Failed to fetch recent blog posts' }, 500)
    }
    
    return c.json({ success: true, data: posts || [] })
  } catch (error) {
    console.error('Error fetching recent blog posts:', error)
    return c.json({ success: false, error: 'Failed to fetch recent blog posts' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/blog-posts/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    
    // First get the post
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (fetchError || !post) {
      return c.json({ success: false, error: 'Blog post not found' }, 404)
    }
    
    // Then increment view count
    try {
      await supabase
        .from('blog_posts')
        .update({ 
          views: (post.views || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug)
      
      // Return post with incremented view count
      post.views = (post.views || 0) + 1
    } catch (viewError) {
      console.warn('Failed to increment view count:', viewError)
      // Still return the post even if view increment fails
    }
    
    return c.json({ success: true, data: post })
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
    const slug = generateSlug(postData.title)
    
    const insertData = {
      ...postData,
      slug,
      views: 0,
      updated_at: new Date().toISOString(),
      published_at: postData.published ? new Date().toISOString() : null
    }
    
    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert(insertData)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating blog post:', error)
      return c.json({ success: false, error: 'Failed to create blog post' }, 500)
    }
    
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
    
    if (updates.title) {
      updates.slug = generateSlug(updates.title)
    }
    
    // Set published_at if publishing for the first time
    if (updates.published && !updates.published_at) {
      updates.published_at = new Date().toISOString()
    }
    
    updates.updated_at = new Date().toISOString()
    
    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating blog post:', error)
      return c.json({ success: false, error: 'Failed to update blog post' }, 500)
    }
    
    return c.json({ success: true, data: post })
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
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting blog post:', error)
      return c.json({ success: false, error: 'Failed to delete blog post' }, 500)
    }
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return c.json({ success: false, error: 'Failed to delete blog post' }, 500)
  }
})

// Routes for Services
app.get('/make-server-ab7fd8fd/services', async (c) => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching services:', error)
      
      // Check if it's a table not found error
      if (error.code === 'PGRST205' || error.code === 'PGRST106' || error.message?.includes('schema cache') || error.message?.includes('does not exist') || error.message?.includes('table')) {
        return c.json({ 
          success: false, 
          error: 'Database tables not found. Please initialize the database first.',
          code: 'TABLE_NOT_FOUND'
        }, 404)
      }
      
      return c.json({ success: false, error: 'Failed to fetch services' }, 500)
    }
    
    return c.json({ success: true, data: services || [] })
  } catch (error) {
    console.error('Error fetching services:', error)
    return c.json({ success: false, error: 'Failed to fetch services' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/services/featured', async (c) => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('featured', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(4)
    
    if (error) {
      console.error('Error fetching featured services:', error)
      return c.json({ success: false, error: 'Failed to fetch featured services' }, 500)
    }
    
    return c.json({ success: true, data: services || [] })
  } catch (error) {
    console.error('Error fetching featured services:', error)
    return c.json({ success: false, error: 'Failed to fetch featured services' }, 500)
  }
})

app.get('/make-server-ab7fd8fd/services/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const { data: service, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error || !service) {
      return c.json({ success: false, error: 'Service not found' }, 404)
    }
    
    return c.json({ success: true, data: service })
  } catch (error) {
    console.error('Error fetching service:', error)
    return c.json({ success: false, error: 'Failed to fetch service' }, 500)
  }
})

app.post('/make-server-ab7fd8fd/services', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const serviceData = await c.req.json()
    const slug = generateSlug(serviceData.title)
    
    const { data: service, error } = await supabase
      .from('services')
      .insert({
        ...serviceData,
        slug,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating service:', error)
      return c.json({ success: false, error: 'Failed to create service' }, 500)
    }
    
    return c.json({ success: true, data: service })
  } catch (error) {
    console.error('Error creating service:', error)
    return c.json({ success: false, error: 'Failed to create service' }, 500)
  }
})

app.put('/make-server-ab7fd8fd/services/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    const updates = await c.req.json()
    
    if (updates.title) {
      updates.slug = generateSlug(updates.title)
    }
    
    updates.updated_at = new Date().toISOString()
    
    const { data: service, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating service:', error)
      return c.json({ success: false, error: 'Failed to update service' }, 500)
    }
    
    return c.json({ success: true, data: service })
  } catch (error) {
    console.error('Error updating service:', error)
    return c.json({ success: false, error: 'Failed to update service' }, 500)
  }
})

app.delete('/make-server-ab7fd8fd/services/:id', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const id = c.req.param('id')
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting service:', error)
      return c.json({ success: false, error: 'Failed to delete service' }, 500)
    }
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return c.json({ success: false, error: 'Failed to delete service' }, 500)
  }
})

// Routes for About Me
app.get('/make-server-ab7fd8fd/about', async (c) => {
  try {
    const { data: about, error } = await supabase
      .from('about_me')
      .select('*')
      .single()
    
    if (error) {
      console.error('Error fetching about data:', error)
      
      // Check if it's a table not found error
      if (error.code === 'PGRST205' || error.code === 'PGRST106' || error.message?.includes('schema cache') || error.message?.includes('does not exist') || error.message?.includes('table')) {
        return c.json({ 
          success: false, 
          error: 'Database tables not found. Please initialize the database first.',
          code: 'TABLE_NOT_FOUND'
        }, 404)
      }
      
      return c.json({ success: false, error: 'Failed to fetch about data' }, 500)
    }
    
    return c.json({ success: true, data: about })
  } catch (error) {
    console.error('Error fetching about data:', error)
    return c.json({ success: false, error: 'Failed to fetch about data' }, 500)
  }
})

app.put('/make-server-ab7fd8fd/about', async (c) => {
  try {
    const auth = await isAdmin(c.req.raw)
    if (!auth.isValid) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    const updates = await c.req.json()
    updates.updated_at = new Date().toISOString()
    
    const { data: about, error } = await supabase
      .from('about_me')
      .update(updates)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating about data:', error)
      return c.json({ success: false, error: 'Failed to update about data' }, 500)
    }
    
    return c.json({ success: true, data: about })
  } catch (error) {
    console.error('Error updating about data:', error)
    return c.json({ success: false, error: 'Failed to update about data' }, 500)
  }
})

// Start the server
Deno.serve(app.fetch)