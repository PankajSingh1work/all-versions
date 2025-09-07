import * as kv from './kv_store.tsx'

// Seed data for initial portfolio content
export async function seedDatabase() {
  console.log('Starting database seeding...')

  try {
    // Check if data already exists
    const existingProjects = await kv.getByPrefix('project:')
    if (existingProjects.length > 0) {
      console.log('Database already contains data, skipping seed')
      return
    }

    // Seed Projects
    const projects = [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
        long_description: 'A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern technologies and best practices.',
        image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        demo_url: 'https://demo-ecommerce.example.com',
        github_url: 'https://github.com/johndoe/ecommerce-platform',
        tech_stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        category: 'Web Development',
        status: 'completed' as const,
        featured: true,
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
        slug: 'e-commerce-platform'
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates',
        long_description: 'A modern task management application that helps teams collaborate effectively. Features include real-time updates, drag-and-drop interface, team collaboration, and progress tracking.',
        image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        demo_url: 'https://taskapp.example.com',
        github_url: 'https://github.com/johndoe/task-manager',
        tech_stack: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
        category: 'Web Development',
        status: 'completed' as const,
        featured: true,
        created_at: '2024-02-01T10:00:00Z',
        updated_at: '2024-02-01T10:00:00Z',
        slug: 'task-management-app'
      },
      {
        id: '3',
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard with location-based forecasts',
        long_description: 'An interactive weather dashboard that provides current weather conditions and forecasts. Features location detection, multiple city support, and beautiful data visualizations.',
        image_url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
        demo_url: 'https://weather.example.com',
        github_url: 'https://github.com/johndoe/weather-dashboard',
        tech_stack: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
        category: 'Web Development',
        status: 'completed' as const,
        featured: false,
        created_at: '2024-02-15T10:00:00Z',
        updated_at: '2024-02-15T10:00:00Z',
        slug: 'weather-dashboard'
      }
    ]

    for (const project of projects) {
      await kv.set(`project:${project.id}`, project)
    }

    // Seed Certifications
    const certifications = [
      {
        id: '1',
        title: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        description: 'Demonstrates expertise in designing distributed systems on AWS',
        skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'Lambda'],
        date_earned: '2024-01-10',
        valid_until: '2027-01-10',
        credential_id: 'AWS-SAA-2024-001',
        logo_url: 'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=200&h=200&fit=crop',
        certificate_url: 'https://aws.amazon.com/verification/cert-001',
        status: 'valid' as const,
        created_at: '2024-01-10T10:00:00Z',
        updated_at: '2024-01-10T10:00:00Z',
        slug: 'aws-solutions-architect'
      },
      {
        id: '2',
        title: 'Google Cloud Professional Developer',
        issuer: 'Google Cloud',
        description: 'Validates ability to build scalable applications using Google Cloud technologies',
        skills: ['Google Cloud', 'Kubernetes', 'App Engine', 'Cloud Functions'],
        date_earned: '2023-11-15',
        valid_until: '2025-11-15',
        credential_id: 'GCP-DEV-2023-002',
        logo_url: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop',
        certificate_url: 'https://cloud.google.com/certification/verification/002',
        status: 'valid' as const,
        created_at: '2023-11-15T10:00:00Z',
        updated_at: '2023-11-15T10:00:00Z',
        slug: 'google-cloud-developer'
      },
      {
        id: '3',
        title: 'React Professional Certificate',
        issuer: 'Meta',
        description: 'Comprehensive React development skills certification',
        skills: ['React', 'JavaScript', 'JSX', 'Redux', 'React Router'],
        date_earned: '2023-09-20',
        valid_until: null,
        credential_id: 'META-REACT-2023-003',
        logo_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop',
        certificate_url: 'https://coursera.org/verify/react-003',
        status: 'valid' as const,
        created_at: '2023-09-20T10:00:00Z',
        updated_at: '2023-09-20T10:00:00Z',
        slug: 'react-professional-certificate'
      }
    ]

    for (const certification of certifications) {
      await kv.set(`certification:${certification.id}`, certification)
    }

    // Seed Blog Posts
    const blogPosts = [
      {
        id: '1',
        title: 'Getting Started with Next.js 14',
        excerpt: 'Learn about the latest features in Next.js 14 and how to build modern web applications',
        content: 'Next.js 14 brings exciting new features including improved App Router, Server Components, and enhanced performance optimizations. In this comprehensive guide, we\'ll explore everything you need to know to get started with Next.js 14.',
        featured_image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
        author: 'John Doe',
        published: true,
        published_at: '2024-03-01T10:00:00Z',
        tags: ['Next.js', 'React', 'Web Development', 'JavaScript'],
        reading_time: 8,
        views: 1245,
        created_at: '2024-03-01T10:00:00Z',
        updated_at: '2024-03-01T10:00:00Z',
        slug: 'getting-started-with-nextjs-14'
      },
      {
        id: '2',
        title: 'Building Responsive Layouts with Tailwind CSS',
        excerpt: 'Master responsive design with Tailwind CSS utility classes and modern layout techniques',
        content: 'Tailwind CSS makes it incredibly easy to build responsive layouts with its utility-first approach. In this article, we\'ll explore the best practices for creating responsive designs that work across all devices.',
        featured_image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop',
        author: 'John Doe',
        published: true,
        published_at: '2024-02-20T10:00:00Z',
        tags: ['Tailwind CSS', 'CSS', 'Responsive Design', 'Frontend'],
        reading_time: 6,
        views: 892,
        created_at: '2024-02-20T10:00:00Z',
        updated_at: '2024-02-20T10:00:00Z',
        slug: 'responsive-layouts-tailwind-css'
      },
      {
        id: '3',
        title: 'Understanding React Server Components',
        excerpt: 'Deep dive into React Server Components and how they improve performance and developer experience',
        content: 'React Server Components represent a paradigm shift in how we think about React applications. They allow us to render components on the server, reducing bundle size and improving performance.',
        featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
        author: 'John Doe',
        published: false,
        published_at: null,
        tags: ['React', 'Server Components', 'Performance', 'Frontend'],
        reading_time: 10,
        views: 0,
        created_at: '2024-03-10T10:00:00Z',
        updated_at: '2024-03-10T10:00:00Z',
        slug: 'understanding-react-server-components'
      }
    ]

    for (const post of blogPosts) {
      await kv.set(`blog:${post.id}`, post)
    }

    // Seed Profile
    const profile = {
      id: 'main',
      full_name: 'John Doe',
      email: 'john.doe@example.com',
      job_title: 'Full Stack Developer',
      bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies.',
      location: 'San Francisco, CA',
      profile_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      resume_url: 'https://example.com/resume.pdf',
      social_links: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
        website: 'https://johndoe.dev'
      },
      skills: [
        { name: 'JavaScript', level: 90, category: 'Programming' },
        { name: 'React', level: 95, category: 'Frontend' },
        { name: 'Node.js', level: 85, category: 'Backend' },
        { name: 'TypeScript', level: 88, category: 'Programming' },
        { name: 'AWS', level: 80, category: 'Cloud' },
        { name: 'PostgreSQL', level: 75, category: 'Database' }
      ],
      updated_at: '2024-03-01T10:00:00Z'
    }

    await kv.set('profile:main', profile)

    console.log('Database seeding completed successfully!')
    console.log(`Seeded: ${projects.length} projects, ${certifications.length} certifications, ${blogPosts.length} blog posts, 1 profile`)

  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}