import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

// Comprehensive seed data for the portfolio
const seedData = {
  services: [
    {
      id: 'web-development',
      title: 'Web Development',
      slug: 'web-development',
      description: 'Build modern, scalable web applications using cutting-edge technologies. From single-page applications to complex enterprise solutions.',
      long_description: 'Custom Web Applications - Build modern, scalable web applications using cutting-edge technologies. From single-page applications to complex enterprise solutions, I provide comprehensive web development services.',
      image_url: 'https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTY2NDIxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Web Development',
      status: 'available',
      featured: true,
      features: ['React/Next.js Applications', 'Full-Stack Development', 'API Integration', 'Database Design', 'Performance Optimization', 'SEO Implementation'],
      tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
      duration: '4-8 weeks',
      availability: 'Available'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      description: 'Create intuitive and engaging user experiences through research-driven design. From wireframes to high-fidelity prototypes.',
      long_description: 'User-Centered Design - Create intuitive and engaging user experiences through research-driven design. From wireframes to high-fidelity prototypes, I deliver comprehensive design solutions.',
      image_url: 'https://images.unsplash.com/photo-1550335865-16a340d45467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMFVYJTIwZGVzaWduJTIwY3JlYXRpdmUlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2NjM5Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'UI/UX Design',
      status: 'available',
      featured: true,
      features: ['User Research & Analysis', 'Wireframing & Prototyping', 'Visual Design Systems', 'Usability Testing', 'Responsive Design', 'Design Documentation'],
      tools: ['Figma', 'Adobe Creative Suite', 'Principle', 'InVision', 'Miro', 'UserTesting'],
      duration: '2-4 weeks',
      availability: 'Available'
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      slug: 'mobile-development',
      description: 'Develop high-performance mobile applications for iOS and Android using React Native and Flutter frameworks.',
      long_description: 'Cross-Platform Apps - Develop high-performance mobile applications for iOS and Android using React Native and Flutter frameworks with native performance.',
      image_url: 'https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzU2NTQ1MTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Mobile Development',
      status: 'available',
      featured: false,
      features: ['React Native Development', 'Flutter Applications', 'Native Performance', 'App Store Deployment', 'Push Notifications', 'Offline Functionality'],
      tools: ['React Native', 'Flutter', 'Expo', 'Firebase', 'Redux', 'Native APIs'],
      duration: '6-10 weeks',
      availability: 'Available'
    },
    {
      id: 'consulting',
      title: 'Digital Consulting',
      slug: 'digital-consulting',
      description: 'Strategic guidance on digital transformation, technology selection, and project planning to accelerate your business growth.',
      long_description: 'Strategic Guidance - Strategic guidance on digital transformation, technology selection, and project planning to accelerate your business growth with expert consulting.',
      image_url: 'https://images.unsplash.com/photo-1582004531564-50f300aae039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwY29uc3VsdGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjYzOTI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Consulting',
      status: 'available',
      featured: false,
      features: ['Technology Assessment', 'Digital Strategy Planning', 'Process Optimization', 'Team Training', 'Architecture Review', 'Performance Auditing'],
      tools: ['Various', 'Depends on Project', 'Best Practices', 'Industry Standards'],
      duration: '2-6 weeks',
      availability: 'Available'
    }
  ],

  projects: [
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      slug: 'analytics-dashboard',
      description: 'A comprehensive analytics dashboard built with React and D3.js, featuring real-time data visualization, interactive charts, and customizable reporting.',
      long_description: 'A comprehensive analytics dashboard built with React and D3.js, featuring real-time data visualization, interactive charts, and customizable reporting. This project showcases advanced frontend development skills with complex data visualization requirements.',
      image_url: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTY2MzkzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      demo_url: 'https://analytics-dashboard-demo.com',
      github_url: 'https://github.com/johndoe/analytics-dashboard',
      tech_stack: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
      category: 'Web Application',
      status: 'completed',
      featured: true
    },
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, admin dashboard, and mobile-responsive design.',
      long_description: 'Full-stack e-commerce solution with payment integration, inventory management, admin dashboard, and mobile-responsive design. Built with modern technologies for scalability and performance.',
      image_url: 'https://images.unsplash.com/photo-1742454582165-deab666a8763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZSUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NTY2MzkzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      demo_url: 'https://ecommerce-demo.com',
      github_url: 'https://github.com/johndoe/ecommerce-platform',
      tech_stack: ['Next.js', 'Stripe', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      category: 'E-commerce',
      status: 'completed',
      featured: true
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'A modern, responsive portfolio website with dynamic content management, blog functionality, and smooth animations.',
      long_description: 'A modern, responsive portfolio website with dynamic content management, blog functionality, and smooth animations. Features dark mode support and SEO optimization.',
      image_url: 'https://images.unsplash.com/photo-1648134859211-4a1b57575f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc1NjYzOTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      demo_url: 'https://portfolio-demo.com',
      github_url: 'https://github.com/johndoe/portfolio-website',
      tech_stack: ['React', 'Framer Motion', 'Tailwind CSS', 'Supabase', 'Vercel'],
      category: 'Portfolio',
      status: 'in-progress',
      featured: false
    },
    {
      id: 'task-management-app',
      title: 'Task Management App',
      slug: 'task-management-app',
      description: 'Collaborative task management application with real-time updates, team collaboration, and project tracking capabilities.',
      long_description: 'Collaborative task management application with real-time updates, team collaboration, and project tracking capabilities. Cross-platform mobile application built with React Native.',
      image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://task-app-demo.com',
      github_url: 'https://github.com/johndoe/task-management',
      tech_stack: ['React Native', 'Redux', 'Socket.io', 'Express', 'MongoDB'],
      category: 'Mobile App',
      status: 'completed',
      featured: true
    },
    {
      id: 'restaurant-booking',
      title: 'Restaurant Booking System',
      slug: 'restaurant-booking-system',
      description: 'Online reservation system for restaurants with table management, customer notifications, and analytics dashboard.',
      long_description: 'Online reservation system for restaurants with table management, customer notifications, and analytics dashboard. Features real-time availability and multi-location support.',
      image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://restaurant-booking-demo.com',
      github_url: 'https://github.com/johndoe/restaurant-booking',
      tech_stack: ['Vue.js', 'Laravel', 'MySQL', 'Pusher', 'Stripe'],
      category: 'Web Application',
      status: 'completed',
      featured: false
    },
    {
      id: 'learning-management-system',
      title: 'Learning Management System',
      slug: 'learning-management-system',
      description: 'Comprehensive LMS platform with course creation, student tracking, video streaming, and assessment tools.',
      long_description: 'Comprehensive LMS platform with course creation, student tracking, video streaming, and assessment tools. Built for educational institutions with scalable architecture.',
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://lms-demo.com',
      github_url: 'https://github.com/johndoe/lms-platform',
      tech_stack: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS S3', 'WebRTC'],
      category: 'Education',
      status: 'completed',
      featured: false
    },
    {
      id: 'fitness-tracking-app',
      title: 'Fitness Tracking App',
      slug: 'fitness-tracking-app',
      description: 'Mobile fitness application with workout planning, progress tracking, social features, and integration with wearable devices.',
      long_description: 'Mobile fitness application with workout planning, progress tracking, social features, and integration with wearable devices. Features AI recommendations and social challenges.',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://fitness-app-demo.com',
      github_url: 'https://github.com/johndoe/fitness-tracker',
      tech_stack: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit', 'TensorFlow'],
      category: 'Mobile App',
      status: 'completed',
      featured: false
    },
    {
      id: 'real-estate-platform',
      title: 'Real Estate Platform',
      slug: 'real-estate-platform',
      description: 'Property listing and management platform with advanced search, virtual tours, and integrated CRM system.',
      long_description: 'Property listing and management platform with advanced search, virtual tours, and integrated CRM system. Features interactive maps and lead management capabilities.',
      image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://realestate-demo.com',
      github_url: 'https://github.com/johndoe/real-estate-platform',
      tech_stack: ['React', 'Node.js', 'MongoDB', 'Mapbox', 'Cloudinary'],
      category: 'Web Application',
      status: 'completed',
      featured: false
    }
  ],

  certifications: [
    {
      id: 'aws-solutions-architect',
      title: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      description: 'Advanced certification validating expertise in designing distributed systems on AWS platform with high availability and fault tolerance.',
      issue_date: '2024-01-15',
      expiry_date: '2027-01-15',
      credential_id: 'AWS-SAP-123456',
      credential_url: 'https://aws.amazon.com/verification/SAP-123456',
      status: 'valid'
    },
    {
      id: 'gcp-professional-developer',
      title: 'Google Professional Cloud Developer',
      issuer: 'Google Cloud',
      description: 'Demonstrates proficiency in developing scalable applications on Google Cloud Platform using modern development practices.',
      issue_date: '2023-06-20',
      expiry_date: '2025-06-20',
      credential_id: 'GCP-PCD-789012',
      credential_url: 'https://cloud.google.com/certification/verify/PCD-789012',
      status: 'valid'
    },
    {
      id: 'meta-react-developer',
      title: 'Meta React Developer Professional Certificate',
      issuer: 'Meta (Facebook)',
      description: 'Comprehensive certification covering advanced React development skills, best practices, and modern frontend development techniques.',
      issue_date: '2023-03-10',
      expiry_date: null,
      credential_id: 'META-REACT-345678',
      credential_url: 'https://coursera.org/verify/professional-cert/META-REACT-345678',
      status: 'valid'
    },
    {
      id: 'kubernetes-administrator',
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      description: 'Hands-on certification demonstrating expertise in Kubernetes cluster administration, troubleshooting, and management.',
      issue_date: '2022-09-15',
      expiry_date: '2025-09-15',
      credential_id: 'CKA-901234',
      credential_url: 'https://cncf.io/certification/verify/CKA-901234',
      status: 'valid'
    },
    {
      id: 'mongodb-certified-developer',
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      description: 'Certification validating proficiency in MongoDB database design, development, and optimization techniques.',
      issue_date: '2023-08-12',
      expiry_date: '2026-08-12',
      credential_id: 'MONGO-DEV-567890',
      credential_url: 'https://university.mongodb.com/verify/MONGO-DEV-567890',
      status: 'valid'
    },
    {
      id: 'certified-scrum-master',
      title: 'Certified Scrum Master (CSM)',
      issuer: 'Scrum Alliance',
      description: 'Agile project management certification focusing on Scrum methodology, team leadership, and project delivery.',
      issue_date: '2022-04-08',
      expiry_date: '2024-04-08',
      credential_id: 'CSM-123789',
      credential_url: 'https://scrumalliance.org/verify/CSM-123789',
      status: 'expired'
    },
    {
      id: 'docker-certified-associate',
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      description: 'Certification demonstrating proficiency in Docker containerization, orchestration, and deployment strategies.',
      issue_date: '2022-11-20',
      expiry_date: '2025-11-20',
      credential_id: 'DCA-456123',
      credential_url: 'https://docker.com/certification/verify/DCA-456123',
      status: 'valid'
    },
    {
      id: 'stripe-partner-certification',
      title: 'Stripe Partner Certification',
      issuer: 'Stripe Inc.',
      description: 'Payment processing certification covering Stripe API integration, payment flows, and compliance requirements.',
      issue_date: '2023-05-18',
      expiry_date: '2025-05-18',
      credential_id: 'STRIPE-PART-789456',
      credential_url: 'https://stripe.com/partners/verify/789456',
      status: 'valid'
    }
  ],

  blogPosts: [
    {
      id: 'nextjs-14-complete-guide',
      title: 'Getting Started with Next.js 14: The Complete Guide',
      slug: 'getting-started-nextjs-14-complete-guide',
      excerpt: 'Explore the latest features in Next.js 14 including the new App Router, Server Components, and enhanced performance optimizations that make building React applications faster and more efficient.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'Next.js 14 introduces several groundbreaking features that revolutionize how we build React applications. In this comprehensive guide, we\'ll explore the App Router, Server Components, and performance optimizations.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'What\'s New in Next.js 14'
        },
        {
          type: 'paragraph',
          text: 'The latest version brings significant improvements in performance, developer experience, and application architecture. Let\'s dive into the key features.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Web Development',
      published: true,
      published_at: '2024-01-15T10:00:00Z',
      tags: ['Next.js', 'React', 'JavaScript', 'SSR'],
      views: 1234
    },
    {
      id: 'react-performance-optimization',
      title: 'React Performance Optimization: Best Practices for 2024',
      slug: 'react-performance-optimization-best-practices-2024',
      excerpt: 'Learn advanced techniques to optimize your React applications, including memoization strategies, code splitting, and modern bundling techniques that can improve your app performance by up to 40%.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'Performance optimization in React has evolved significantly. Here are the latest strategies to make your applications lightning fast.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'Memoization Strategies'
        },
        {
          type: 'paragraph',
          text: 'Understanding when and how to use React.memo, useMemo, and useCallback effectively can dramatically improve your application performance.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Performance',
      published: true,
      published_at: '2024-01-08T09:30:00Z',
      tags: ['React', 'Optimization', 'Performance', 'Web Vitals'],
      views: 2156
    },
    {
      id: 'typescript-advanced-patterns',
      title: 'TypeScript Tips and Tricks: Advanced Patterns',
      slug: 'typescript-tips-tricks-advanced-patterns',
      excerpt: 'Dive deep into advanced TypeScript patterns that will make your code more type-safe and maintainable. From utility types to conditional types, master the art of TypeScript.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'TypeScript offers powerful features beyond basic typing. Let\'s explore advanced patterns that will elevate your development skills.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'Utility Types'
        },
        {
          type: 'paragraph',
          text: 'TypeScript provides many built-in utility types that can help you transform and manipulate types in powerful ways.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'TypeScript',
      published: true,
      published_at: '2024-01-01T14:20:00Z',
      tags: ['TypeScript', 'JavaScript', 'Programming', 'Types'],
      views: 987
    },
    {
      id: 'scalable-apis-nodejs-express',
      title: 'Building Scalable APIs with Node.js and Express',
      slug: 'building-scalable-apis-nodejs-express',
      excerpt: 'A comprehensive guide to building robust, scalable APIs using Node.js and Express. Learn about middleware, error handling, authentication, and best practices for production deployment.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'Building scalable APIs requires careful consideration of architecture and best practices. This guide covers everything you need to know.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'API Architecture'
        },
        {
          type: 'paragraph',
          text: 'A well-structured API is the foundation of any successful application. Let\'s explore the key principles of API design.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Backend',
      published: true,
      published_at: '2023-12-20T16:45:00Z',
      tags: ['Node.js', 'Express', 'API', 'Backend'],
      views: 1456
    },
    {
      id: 'css-grid-vs-flexbox',
      title: 'CSS Grid vs Flexbox: When to Use Which',
      slug: 'css-grid-vs-flexbox-when-to-use-which',
      excerpt: 'Understanding the differences between CSS Grid and Flexbox and knowing when to use each layout method. A practical guide with real-world examples and code snippets.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Let\'s understand when to use each.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'CSS Grid for 2D Layouts'
        },
        {
          type: 'paragraph',
          text: 'CSS Grid excels at creating complex two-dimensional layouts with precise control over both rows and columns.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'CSS',
      published: true,
      published_at: '2023-12-15T11:15:00Z',
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
      views: 834
    },
    {
      id: 'future-web-development-2024',
      title: 'The Future of Web Development: What to Expect in 2024',
      slug: 'future-web-development-what-to-expect-2024',
      excerpt: 'Explore the emerging trends and technologies that will shape web development in 2024. From AI integration to new frameworks, stay ahead of the curve.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'The web development landscape is constantly evolving. Here\'s what we can expect in the coming year and beyond.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'AI Integration in Development'
        },
        {
          type: 'paragraph',
          text: 'Artificial Intelligence is revolutionizing how we write code, debug applications, and optimize user experiences.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Trends',
      published: true,
      published_at: '2023-12-01T13:00:00Z',
      tags: ['Future', 'Trends', 'AI', 'Web Development'],
      views: 2789
    },
    {
      id: 'database-design-best-practices',
      title: 'Database Design Best Practices for Modern Applications',
      slug: 'database-design-best-practices-modern-applications',
      excerpt: 'Learn the fundamental principles of database design for modern applications. From normalization to indexing strategies, build databases that scale.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'Effective database design is crucial for application performance and scalability. Let\'s explore the key principles.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'Normalization vs Denormalization'
        },
        {
          type: 'paragraph',
          text: 'Understanding when to normalize and when to denormalize your data is essential for optimal database performance.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Database',
      published: true,
      published_at: '2023-11-25T10:30:00Z',
      tags: ['Database', 'SQL', 'NoSQL', 'Design'],
      views: 1123
    },
    {
      id: 'mastering-git-advanced-workflows',
      title: 'Mastering Git: Advanced Workflows and Best Practices',
      slug: 'mastering-git-advanced-workflows-best-practices',
      excerpt: 'Go beyond basic Git commands and learn advanced workflows, branching strategies, and collaboration techniques that will make you a Git master.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'Git is more than just version control. Master these advanced techniques to improve your development workflow.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'Branching Strategies'
        },
        {
          type: 'paragraph',
          text: 'Effective branching strategies are essential for team collaboration and maintaining clean project history.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Tools',
      published: true,
      published_at: '2023-11-18T15:45:00Z',
      tags: ['Git', 'Version Control', 'Workflow', 'Collaboration'],
      views: 756
    }
  ]
};

export async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    // Seed Services
    console.log('Seeding services...');
    for (const service of seedData.services) {
      await kv.set(`service:${service.id}`, service);
      console.log(`✓ Seeded service: ${service.title}`);
    }

    // Seed Projects
    console.log('Seeding projects...');
    for (const project of seedData.projects) {
      await kv.set(`project:${project.id}`, project);
      console.log(`✓ Seeded project: ${project.title}`);
    }

    // Seed Certifications
    console.log('Seeding certifications...');
    for (const certification of seedData.certifications) {
      await kv.set(`certification:${certification.id}`, certification);
      console.log(`✓ Seeded certification: ${certification.title}`);
    }

    // Seed Blog Posts
    console.log('Seeding blog posts...');
    for (const post of seedData.blogPosts) {
      await kv.set(`blog:${post.id}`, post);
      console.log(`✓ Seeded blog post: ${post.title}`);
    }

    // Store metadata for easy retrieval
    await kv.set('services:list', seedData.services.map(s => s.id));
    await kv.set('projects:list', seedData.projects.map(p => p.id));
    await kv.set('certifications:list', seedData.certifications.map(c => c.id));
    await kv.set('blog:list', seedData.blogPosts.map(b => b.id));

    console.log('✅ Database seeding completed successfully!');
    console.log(`Seeded ${seedData.services.length} services`);
    console.log(`Seeded ${seedData.projects.length} projects`);
    console.log(`Seeded ${seedData.certifications.length} certifications`);
    console.log(`Seeded ${seedData.blogPosts.length} blog posts`);

    return {
      success: true,
      message: 'Database seeded successfully',
      counts: {
        services: seedData.services.length,
        projects: seedData.projects.length,
        certifications: seedData.certifications.length,
        blogPosts: seedData.blogPosts.length
      }
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to get all seeded data (for testing)
export async function getAllSeededData() {
  try {
    const serviceIds = await kv.get('services:list') || [];
    const projectIds = await kv.get('projects:list') || [];
    const certificationIds = await kv.get('certifications:list') || [];
    const blogIds = await kv.get('blog:list') || [];

    const services = await Promise.all(
      serviceIds.map(id => kv.get(`service:${id}`))
    );
    const projects = await Promise.all(
      projectIds.map(id => kv.get(`project:${id}`))
    );
    const certifications = await Promise.all(
      certificationIds.map(id => kv.get(`certification:${id}`))
    );
    const blogPosts = await Promise.all(
      blogIds.map(id => kv.get(`blog:${id}`))
    );

    return {
      services: services.filter(Boolean),
      projects: projects.filter(Boolean),
      certifications: certifications.filter(Boolean),
      blogPosts: blogPosts.filter(Boolean)
    };
  } catch (error) {
    console.error('Error retrieving seeded data:', error);
    return {
      services: [],
      projects: [],
      certifications: [],
      blogPosts: []
    };
  }
}