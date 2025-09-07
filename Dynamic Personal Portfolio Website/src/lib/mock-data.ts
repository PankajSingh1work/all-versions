// Mock data for development and demo purposes
import { Project, Certification, BlogPost, Profile } from './supabase';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard built with React and D3.js, featuring real-time data visualization and interactive charts.',
    long_description: `This analytics dashboard was built to help businesses track their key performance indicators in real-time. The project involved creating interactive charts, real-time data updates, and a responsive design that works across all devices.

## Key Features
- Real-time data visualization
- Interactive charts and graphs
- Responsive design
- Advanced filtering and search
- Export functionality
- User authentication and role-based access

## Technical Challenges
The biggest challenge was handling large datasets while maintaining smooth user interactions. I implemented virtual scrolling and data pagination to ensure optimal performance even with thousands of data points.

## Results
The dashboard improved data analysis efficiency by 40% and is now used by over 500 users daily.`,
    image_url: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTY2MzkzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    demo_url: 'https://analytics-demo.example.com',
    github_url: 'https://github.com/johndoe/analytics-dashboard',
    tech_stack: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Docker'],
    category: 'Web Application',
    status: 'completed',
    featured: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    slug: 'analytics-dashboard'
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    long_description: `A complete e-commerce platform built from scratch with modern web technologies. The platform includes customer-facing storefront, admin dashboard, payment processing, and inventory management.

## Features
- Product catalog with search and filtering
- Shopping cart and checkout process
- Stripe payment integration
- Order management system
- Inventory tracking
- Customer reviews and ratings
- Admin dashboard for store management

## Architecture
Built with a microservices architecture using Next.js for the frontend, Node.js APIs for the backend, and PostgreSQL for data storage. Implemented Redis for caching and session management.

## Impact
Successfully launched for a client who saw a 200% increase in online sales within the first quarter.`,
    image_url: 'https://images.unsplash.com/photo-1742454582165-deab666a8763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZSUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NTY2MzkzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    demo_url: 'https://ecommerce-demo.example.com',
    github_url: 'https://github.com/johndoe/ecommerce-platform',
    tech_stack: ['Next.js', 'Stripe', 'Firebase', 'Tailwind CSS', 'Redis'],
    category: 'E-commerce',
    status: 'completed',
    featured: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    slug: 'ecommerce-platform'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website with dynamic content management and blog functionality.',
    long_description: `This portfolio website showcases my work and provides a platform for sharing thoughts through blog posts. Built with performance and SEO in mind.

## Features
- Responsive design that works on all devices
- Dynamic content management
- Blog with markdown support
- SEO optimized
- Dark mode support
- Contact form with email integration
- Project showcase with filtering
- Performance optimized with lazy loading

## Technical Details
Built with React and Next.js for optimal performance. Uses static site generation for blog posts and project pages to ensure fast loading times. Integrated with a headless CMS for easy content management.

## Performance
Achieved a 95+ Lighthouse score across all metrics and sub-second loading times.`,
    image_url: 'https://images.unsplash.com/photo-1648134859211-4a1b57575f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc1NjYzOTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    demo_url: 'https://portfolio-demo.example.com',
    github_url: 'https://github.com/johndoe/portfolio-website',
    tech_stack: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'CMS'],
    category: 'Portfolio',
    status: 'completed',
    featured: true,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
    slug: 'portfolio-website'
  },
  {
    id: '4',
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team features.',
    long_description: `A comprehensive task management application designed for teams to collaborate effectively. Features real-time updates, project organization, and team communication tools.`,
    image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    demo_url: 'https://tasks-demo.example.com',
    github_url: 'https://github.com/johndoe/task-manager',
    tech_stack: ['React', 'Socket.io', 'Express', 'MongoDB'],
    category: 'Productivity',
    status: 'completed',
    featured: false,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z',
    slug: 'task-management-app'
  },
  {
    id: '5',
    title: 'Weather App',
    description: 'Beautiful weather application with location-based forecasts and interactive maps.',
    long_description: `A modern weather application that provides accurate forecasts with beautiful visualizations and interactive weather maps.`,
    image_url: 'https://images.unsplash.com/photo-1504608524841-42cfa2a00b3f?w=800&h=600&fit=crop',
    demo_url: 'https://weather-demo.example.com',
    github_url: 'https://github.com/johndoe/weather-app',
    tech_stack: ['Vue.js', 'OpenWeather API', 'MapBox'],
    category: 'Mobile App',
    status: 'in-progress',
    featured: false,
    created_at: '2024-04-01T10:00:00Z',
    updated_at: '2024-04-01T10:00:00Z',
    slug: 'weather-app'
  }
];

export const mockCertifications: Certification[] = [
  {
    id: '1',
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    description: 'Validates expertise in designing distributed systems on AWS with best practices for scalability, security, and cost optimization.',
    issue_date: '2024-01-15',
    expiry_date: '2027-01-15',
    credential_id: 'AWS-SA-12345',
    credential_url: 'https://aws.amazon.com/verification/12345',
    status: 'valid',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Google Professional Cloud Developer',
    issuer: 'Google Cloud',
    description: 'Demonstrates proficiency in developing scalable applications using Google Cloud Platform services and tools.',
    issue_date: '2023-06-10',
    expiry_date: '2025-06-10',
    credential_id: 'GCP-CD-67890',
    credential_url: 'https://googlecloud.com/verification/67890',
    status: 'valid',
    created_at: '2023-06-10T10:00:00Z',
    updated_at: '2023-06-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Meta React Developer Certification',
    issuer: 'Meta',
    description: 'Advanced React development skills and best practices for building modern web applications.',
    issue_date: '2023-03-20',
    expiry_date: undefined,
    credential_id: 'META-REACT-11223',
    credential_url: 'https://coursera.org/verify/META-REACT-11223',
    status: 'valid',
    created_at: '2023-03-20T10:00:00Z',
    updated_at: '2023-03-20T10:00:00Z'
  },
  {
    id: '4',
    title: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    description: 'Demonstrates expertise in Kubernetes cluster administration, including installation, configuration, and troubleshooting.',
    issue_date: '2022-11-05',
    expiry_date: '2025-11-05',
    credential_id: 'CKA-44556',
    credential_url: 'https://cncf.io/verification/CKA-44556',
    status: 'valid',
    created_at: '2022-11-05T10:00:00Z',
    updated_at: '2022-11-05T10:00:00Z'
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14: The Complete Guide',
    excerpt: 'Learn everything you need to know about Next.js 14, including the new App Router, Server Components, and improved performance features.',
    content: `# Getting Started with Next.js 14: The Complete Guide

Next.js 14 brings exciting new features and improvements that make building React applications faster and more efficient than ever. In this comprehensive guide, we'll explore everything you need to know to get started.

## What's New in Next.js 14

Next.js 14 introduces several groundbreaking features:

### 1. Turbopack (Stable)
The new bundler that's up to 700% faster than Webpack, making development builds lightning quick.

### 2. Server Actions (Stable)
A new way to handle server-side logic directly in your React components without writing separate API routes.

### 3. Partial Prerendering
An experimental feature that combines static and dynamic rendering for optimal performance.

## Getting Started

To create a new Next.js 14 project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

### App Router
The new App Router provides a more intuitive way to structure your application with file-based routing and layouts.

### Server Components
React Server Components allow you to render components on the server, reducing bundle size and improving performance.

### Enhanced Image Optimization
Improved image optimization with better performance and new formats support.

## Best Practices

1. **Use Server Components by default**: Only use Client Components when you need interactivity
2. **Optimize images**: Always use the Next.js Image component for better performance
3. **Implement proper SEO**: Use metadata API for better search engine optimization
4. **Follow TypeScript conventions**: Type your components and props properly

## Conclusion

Next.js 14 represents a significant step forward in React development. With its improved performance, developer experience, and new features, it's an excellent choice for building modern web applications.

Start your Next.js 14 journey today and experience the future of React development!`,
    featured_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: 'John Doe',
    published: true,
    published_at: '2024-01-20T10:00:00Z',
    tags: ['Next.js', 'React', 'Web Development', 'JavaScript'],
    reading_time: 8,
    views: 1234,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
    slug: 'getting-started-nextjs-14'
  },
  {
    id: '2',
    title: 'React Best Practices for 2024',
    excerpt: 'Discover the latest React best practices, patterns, and techniques that will make your code more maintainable and performant.',
    content: `# React Best Practices for 2024

As React continues to evolve, so do the best practices for building robust, maintainable applications. Here are the essential practices every React developer should follow in 2024.

## Component Design Principles

### 1. Keep Components Small and Focused
Each component should have a single responsibility. If a component is doing too much, break it down into smaller, more focused components.

### 2. Use Composition Over Inheritance
React favors composition patterns. Use component composition to build complex UIs from simpler components.

## State Management

### 1. Choose the Right State Solution
- **Local state**: Use useState for component-specific state
- **Shared state**: Use Context API for moderate sharing
- **Complex state**: Consider Redux Toolkit or Zustand for complex applications

### 2. Minimize State
Keep your state as minimal as possible. Derive values from existing state rather than storing computed values.

## Performance Optimization

### 1. Use React.memo Wisely
Don't wrap every component in React.memo. Use it only when you have performance issues.

### 2. Optimize Re-renders
Use useMemo and useCallback to prevent unnecessary re-renders, but don't overuse them.

## Code Organization

### 1. Follow Consistent Naming Conventions
- Components: PascalCase
- Functions and variables: camelCase
- Constants: UPPER_SNAKE_CASE

### 2. Structure Your Project Logically
Organize files by feature rather than by file type for better maintainability.

## Conclusion

Following these best practices will help you build better React applications that are easier to maintain, test, and scale.`,
    featured_image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop',
    author: 'John Doe',
    published: false,
    published_at: null,
    tags: ['React', 'Best Practices', 'JavaScript', 'Frontend'],
    reading_time: 6,
    views: 0,
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z',
    slug: 'react-best-practices-2024'
  },
  {
    id: '3',
    title: 'TypeScript Tips and Tricks for Better Code',
    excerpt: 'Advanced TypeScript techniques that will help you write more robust and type-safe code.',
    content: `# TypeScript Tips and Tricks for Better Code

TypeScript has become an essential tool for modern JavaScript development. Here are some advanced tips and tricks to help you write better TypeScript code.

## Advanced Type Techniques

### 1. Utility Types
TypeScript provides several utility types that can help you manipulate types:

\`\`\`typescript
// Pick specific properties
type UserContact = Pick<User, 'email' | 'phone'>;

// Omit properties
type CreateUser = Omit<User, 'id' | 'createdAt'>;

// Make properties optional
type PartialUser = Partial<User>;
\`\`\`

### 2. Conditional Types
Create types that depend on conditions:

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
\`\`\`

## Best Practices

### 1. Use Strict Mode
Always enable strict mode in your tsconfig.json for better type checking.

### 2. Prefer Type Assertions Over Any
Use type assertions sparingly and prefer proper typing over 'any'.

### 3. Create Custom Type Guards
Write type guards for runtime type checking:

\`\`\`typescript
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && 
         obj !== null && 
         'email' in obj;
}
\`\`\`

## Conclusion

These TypeScript techniques will help you write more maintainable and type-safe code. Practice them regularly to become a more effective TypeScript developer.`,
    featured_image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    author: 'John Doe',
    published: true,
    published_at: '2024-02-01T10:00:00Z',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Tips'],
    reading_time: 5,
    views: 892,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    slug: 'typescript-tips-tricks'
  }
];

export const mockProfile: Profile = {
  id: '1',
  full_name: 'John Doe',
  email: 'john@example.com',
  job_title: 'Full-Stack Developer & UI/UX Designer',
  bio: `I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a real impact. My journey combines technical expertise with creative design, resulting in applications that are both functional and beautiful.

I specialize in modern web technologies including React, Next.js, and Node.js, with a strong focus on performance, accessibility, and user-centric design. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee.

I believe in the power of collaboration and continuous learning. Every project is an opportunity to grow, innovate, and create something meaningful.`,
  location: 'San Francisco, CA',
  profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  resume_url: '/resume.pdf',
  social_links: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://johndoe.dev'
  },
  skills: [
    { name: 'React & Next.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js & Express', level: 88, category: 'Backend' },
    { name: 'UI/UX Design', level: 85, category: 'Design' },
    { name: 'Cloud & DevOps', level: 80, category: 'Infrastructure' },
    { name: 'Mobile Development', level: 75, category: 'Mobile' }
  ],
  updated_at: '2024-01-01T10:00:00Z'
};