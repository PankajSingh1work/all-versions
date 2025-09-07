import { createClient } from 'npm:@supabase/supabase-js@2'

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
}

// Comprehensive seed data for the portfolio
const seedData = {
  aboutMe: {
    personal_info: {
      name: "John Developer",
      title: "Full-Stack Developer & UI/UX Designer",
      bio: "Passionate full-stack developer with 8+ years of experience creating innovative web applications and user experiences. I specialize in React, Node.js, and modern cloud technologies, with a strong focus on performance, scalability, and user-centered design.",
      location: "San Francisco, CA",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      website: "https://johndeveloper.com",
      avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTY3OTg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      social_links: {
        github: "https://github.com/johndeveloper",
        linkedin: "https://linkedin.com/in/johndeveloper",
        twitter: "https://twitter.com/johndeveloper",
        instagram: "https://instagram.com/johndeveloper"
      }
    },
    skills: [
      {
        category: "Frontend Development",
        skills: [
          { name: "React", level: 95, years_experience: 6 },
          { name: "Next.js", level: 90, years_experience: 4 },
          { name: "TypeScript", level: 88, years_experience: 5 },
          { name: "JavaScript ES6+", level: 95, years_experience: 8 },
          { name: "HTML5/CSS3", level: 92, years_experience: 8 },
          { name: "Tailwind CSS", level: 85, years_experience: 3 },
          { name: "Vue.js", level: 75, years_experience: 2 },
          { name: "Angular", level: 70, years_experience: 2 }
        ]
      },
      {
        category: "Backend Development",
        skills: [
          { name: "Node.js", level: 90, years_experience: 6 },
          { name: "Express.js", level: 88, years_experience: 6 },
          { name: "Python", level: 82, years_experience: 4 },
          { name: "Django", level: 78, years_experience: 3 },
          { name: "GraphQL", level: 80, years_experience: 3 },
          { name: "REST APIs", level: 92, years_experience: 7 }
        ]
      },
      {
        category: "Database & Cloud",
        skills: [
          { name: "PostgreSQL", level: 85, years_experience: 5 },
          { name: "MongoDB", level: 82, years_experience: 4 },
          { name: "Redis", level: 75, years_experience: 3 },
          { name: "AWS", level: 80, years_experience: 4 },
          { name: "Docker", level: 78, years_experience: 3 },
          { name: "Kubernetes", level: 70, years_experience: 2 }
        ]
      },
      {
        category: "Design & Tools",
        skills: [
          { name: "Figma", level: 85, years_experience: 4 },
          { name: "Adobe Creative Suite", level: 80, years_experience: 5 },
          { name: "Git/GitHub", level: 92, years_experience: 8 },
          { name: "VS Code", level: 95, years_experience: 6 },
          { name: "Postman", level: 88, years_experience: 5 }
        ]
      }
    ],
    experience: [
      {
        company: "TechForward Inc.",
        position: "Senior Full-Stack Developer",
        duration: "2021 - Present",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Lead development of enterprise web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.",
        responsibilities: [
          "Architected and developed scalable React applications with Next.js",
          "Built robust Node.js microservices with 99.9% uptime",
          "Led cross-functional team of 6 developers and designers",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Optimized database queries improving application performance by 45%"
        ],
        technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"]
      },
      {
        company: "InnovateLabs",
        position: "Full-Stack Developer",
        duration: "2019 - 2021",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "Developed customer-facing applications and internal tools for startup operations. Worked directly with product team to define technical requirements.",
        responsibilities: [
          "Built responsive web applications using React and Vue.js",
          "Developed RESTful APIs with Node.js and Express",
          "Integrated third-party services and payment processing",
          "Collaborated with UX/UI designers on user experience",
          "Maintained 95% code coverage with comprehensive testing"
        ],
        technologies: ["React", "Vue.js", "Node.js", "MongoDB", "Stripe", "Firebase"]
      },
      {
        company: "WebSolutions Pro",
        position: "Frontend Developer",
        duration: "2017 - 2019",
        location: "San Jose, CA",
        type: "Full-time",
        description: "Focused on creating engaging user interfaces and optimizing web performance. Worked on various client projects across different industries.",
        responsibilities: [
          "Developed pixel-perfect responsive websites",
          "Optimized web performance achieving 90+ Lighthouse scores",
          "Collaborated with design team on component libraries",
          "Implemented accessibility standards (WCAG 2.1)",
          "Mentored 2 junior developers"
        ],
        technologies: ["JavaScript", "HTML5", "CSS3", "SASS", "jQuery", "Bootstrap"]
      },
      {
        company: "Freelance",
        position: "Web Developer",
        duration: "2016 - 2017",
        location: "Remote",
        type: "Freelance",
        description: "Built custom websites and web applications for small businesses and startups. Managed full project lifecycle from concept to deployment.",
        responsibilities: [
          "Delivered 15+ custom website projects",
          "Provided technical consulting and project planning",
          "Implemented e-commerce solutions with payment integration",
          "Set up hosting and domain management",
          "Provided ongoing maintenance and support"
        ],
        technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "CSS3", "cPanel"]
      }
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        duration: "2012 - 2016",
        location: "Berkeley, CA",
        gpa: "3.7/4.0",
        description: "Comprehensive computer science education with focus on software engineering, algorithms, and database systems.",
        coursework: [
          "Data Structures & Algorithms",
          "Software Engineering",
          "Database Systems",
          "Web Development",
          "Human-Computer Interaction",
          "Computer Networks"
        ],
        achievements: [
          "Dean's List (3 semesters)",
          "CS Department Scholarship Recipient",
          "President of Web Development Club",
          "Published research on web accessibility"
        ]
      },
      {
        institution: "Codecademy",
        degree: "Full-Stack Engineer Path",
        duration: "2020",
        location: "Online",
        description: "Intensive full-stack development program covering modern web technologies and best practices.",
        coursework: [
          "Advanced JavaScript",
          "React & Redux",
          "Node.js & Express",
          "Database Design",
          "DevOps & Deployment"
        ]
      }
    ]
  },

  services: [
    {
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
    },
    {
      title: 'DevOps & Cloud Automation',
      slug: 'devops-cloud-automation',
      description: 'Streamline your development workflow with CI/CD pipelines, cloud infrastructure, and automated deployment strategies.',
      long_description: 'Cloud Infrastructure & Automation - Streamline your development workflow with CI/CD pipelines, cloud infrastructure setup, containerization, and automated deployment strategies for scalable applications.',
      image_url: 'https://images.unsplash.com/photo-1608657803991-b62ca5de7a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'DevOps',
      status: 'available',
      featured: true,
      features: ['CI/CD Pipeline Setup', 'Docker Containerization', 'AWS/Azure Infrastructure', 'Monitoring & Logging', 'Security Configuration', 'Auto-scaling Solutions'],
      tools: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Grafana'],
      duration: '3-6 weeks',
      availability: 'Available'
    },
    {
      title: 'E-commerce Solutions',
      slug: 'ecommerce-solutions',
      description: 'Complete e-commerce platforms with payment processing, inventory management, and customer relationship tools.',
      long_description: 'Full E-commerce Development - Complete e-commerce platforms with payment processing, inventory management, order tracking, and customer relationship management tools built for scalability and conversion.',
      image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'E-commerce',
      status: 'available',
      featured: true,
      features: ['Multi-vendor Support', 'Payment Gateway Integration', 'Inventory Management', 'Order Tracking', 'Customer Analytics', 'Mobile Commerce'],
      tools: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal', 'Analytics'],
      duration: '8-12 weeks',
      availability: 'Available'
    },
    {
      title: 'API Development & Integration',
      slug: 'api-development-integration',
      description: 'Build robust RESTful APIs and integrate third-party services for seamless data exchange and functionality.',
      long_description: 'Backend API Solutions - Build robust RESTful APIs, microservices architecture, and integrate third-party services for seamless data exchange, authentication, and scalable backend functionality.',
      image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Backend',
      status: 'available',
      featured: false,
      features: ['RESTful API Design', 'GraphQL Implementation', 'Microservices Architecture', 'API Documentation', 'Rate Limiting', 'Authentication & Authorization'],
      tools: ['Node.js', 'Express', 'GraphQL', 'MongoDB', 'Redis', 'Postman'],
      duration: '4-8 weeks',
      availability: 'Available'
    }
  ],

  projects: [
    {
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
      title: 'Social Media Management Dashboard',
      slug: 'social-media-management-dashboard',
      description: 'Comprehensive social media management platform with analytics, scheduling, and multi-platform posting capabilities.',
      long_description: 'Comprehensive social media management platform with analytics, post scheduling, content calendar, engagement tracking, and multi-platform posting capabilities for Twitter, Facebook, Instagram, and LinkedIn.',
      image_url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://social-dashboard-demo.com',
      github_url: 'https://github.com/johndoe/social-media-dashboard',
      tech_stack: ['Vue.js', 'Django', 'PostgreSQL', 'Redis', 'Social APIs'],
      category: 'Web Application',
      status: 'completed',
      featured: true
    },
    {
      title: 'Video Streaming Platform',
      slug: 'video-streaming-platform',
      description: 'Netflix-style video streaming platform with user subscriptions, content management, and adaptive streaming.',
      long_description: 'Netflix-style video streaming platform with user subscriptions, content management system, adaptive bitrate streaming, offline downloads, and comprehensive analytics dashboard.',
      image_url: 'https://images.unsplash.com/photo-1489599033765-c11b047bd69d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://streaming-demo.com',
      github_url: 'https://github.com/johndoe/streaming-platform',
      tech_stack: ['Next.js', 'AWS MediaConvert', 'DynamoDB', 'CloudFront', 'Stripe'],
      category: 'Entertainment',
      status: 'in-progress',
      featured: true
    },
    {
      title: 'Cryptocurrency Portfolio Tracker',
      slug: 'cryptocurrency-portfolio-tracker',
      description: 'Real-time cryptocurrency tracking application with portfolio management, price alerts, and market analysis.',
      long_description: 'Real-time cryptocurrency tracking application with portfolio management, price alerts, market analysis, and automated trading signals with support for 100+ cryptocurrencies.',
      image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      demo_url: 'https://crypto-tracker-demo.com',
      github_url: 'https://github.com/johndoe/crypto-tracker',
      tech_stack: ['React', 'Node.js', 'WebSocket', 'CoinGecko API', 'Chart.js'],
      category: 'Finance',
      status: 'completed',
      featured: false
    }
  ],

  certifications: [
    {
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
      title: 'Firebase Certified Developer',
      issuer: 'Google Firebase',
      description: 'Comprehensive Firebase certification covering authentication, real-time database, cloud functions, and hosting.',
      issue_date: '2023-07-14',
      expiry_date: '2025-07-14',
      credential_id: 'FIREBASE-DEV-345678',
      credential_url: 'https://firebase.google.com/verify/FIREBASE-DEV-345678',
      status: 'valid'
    },
    {
      title: 'HashiCorp Certified: Terraform Associate',
      issuer: 'HashiCorp',
      description: 'Infrastructure as Code certification covering Terraform fundamentals, configuration, and cloud provisioning.',
      issue_date: '2022-10-12',
      expiry_date: '2025-10-12',
      credential_id: 'HASHI-TF-789012',
      credential_url: 'https://www.hashicorp.com/verify/HASHI-TF-789012',
      status: 'valid'
    }
  ],

  blogPosts: [
    {
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
      title: 'Microservices Architecture: A Complete Implementation Guide',
      slug: 'microservices-architecture-complete-implementation-guide',
      excerpt: 'Learn how to design and implement microservices architecture with Docker, Kubernetes, and service mesh patterns for scalable applications.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'Microservices architecture has become the gold standard for building scalable, maintainable applications. This guide covers everything you need to know.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'Breaking Down Monoliths'
        },
        {
          type: 'paragraph',
          text: 'The journey from monolithic to microservices architecture requires careful planning and gradual implementation.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Architecture',
      published: true,
      published_at: '2023-11-10T09:00:00Z',
      tags: ['Microservices', 'Docker', 'Kubernetes', 'Architecture'],
      views: 1892
    },
    {
      title: 'Flutter vs React Native in 2024: The Ultimate Comparison',
      slug: 'flutter-vs-react-native-2024-ultimate-comparison',
      excerpt: 'An in-depth comparison of Flutter and React Native for mobile app development, covering performance, developer experience, and ecosystem.',
      content: JSON.stringify([
        {
          type: 'paragraph',
          text: 'Choosing the right cross-platform mobile development framework is crucial for project success. Let\'s compare Flutter and React Native objectively.'
        },
        {
          type: 'heading',
          level: 2,
          text: 'Performance Comparison'
        },
        {
          type: 'paragraph',
          text: 'Both frameworks offer near-native performance, but there are key differences in how they achieve it.'
        }
      ]),
      featured_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      category: 'Mobile Development',
      published: true,
      published_at: '2023-11-03T14:20:00Z',
      tags: ['Flutter', 'React Native', 'Mobile Development', 'Comparison'],
      views: 3421
    }
  ]
}

// Execute seeding
async function runSeed() {
  console.log('🚀 Starting database seeding...')
  
  try {
    let totalInserted = 0

    // Check if data already exists to avoid duplicates
    const { count: serviceCount } = await supabase.from('services').select('*', { count: 'exact', head: true })
    const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })
    const { count: certCount } = await supabase.from('certifications').select('*', { count: 'exact', head: true })
    const { count: blogCount } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true })
    const { count: aboutCount } = await supabase.from('about_me').select('*', { count: 'exact', head: true })

    // Seed About Me
    if ((aboutCount || 0) === 0) {
      console.log('📄 Seeding about me data...')
      const { data, error } = await supabase
        .from('about_me')
        .insert([{
          ...seedData.aboutMe,
          updated_at: new Date().toISOString()
        }])
        .select()
      
      if (error) {
        console.error('❌ Error seeding about data:', error)
      } else {
        totalInserted += data?.length || 0
        console.log(`✅ Seeded ${data?.length || 0} about me record`)
      }
    } else {
      console.log('📄 About me data already exists, skipping...')
    }

    // Seed Services
    if ((serviceCount || 0) === 0) {
      console.log('🛠️ Seeding services...')
      const { data, error } = await supabase
        .from('services')
        .insert(seedData.services.map(service => ({
          ...service,
          slug: generateSlug(service.title),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })))
        .select()
      
      if (error) {
        console.error('❌ Error seeding services:', error)
      } else {
        totalInserted += data?.length || 0
        console.log(`✅ Seeded ${data?.length || 0} services`)
      }
    } else {
      console.log('🛠️ Services already exist, skipping...')
    }

    // Seed Projects
    if ((projectCount || 0) === 0) {
      console.log('💼 Seeding projects...')
      const { data, error } = await supabase
        .from('projects')
        .insert(seedData.projects.map(project => ({
          ...project,
          slug: generateSlug(project.title),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })))
        .select()
      
      if (error) {
        console.error('❌ Error seeding projects:', error)
      } else {
        totalInserted += data?.length || 0
        console.log(`✅ Seeded ${data?.length || 0} projects`)
      }
    } else {
      console.log('💼 Projects already exist, skipping...')
    }

    // Seed Certifications
    if ((certCount || 0) === 0) {
      console.log('🎓 Seeding certifications...')
      const { data, error } = await supabase
        .from('certifications')
        .insert(seedData.certifications.map(cert => ({
          ...cert,
          slug: generateSlug(cert.title),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })))
        .select()
      
      if (error) {
        console.error('❌ Error seeding certifications:', error)
      } else {
        totalInserted += data?.length || 0
        console.log(`✅ Seeded ${data?.length || 0} certifications`)
      }
    } else {
      console.log('🎓 Certifications already exist, skipping...')
    }

    // Seed Blog Posts
    if ((blogCount || 0) === 0) {
      console.log('📝 Seeding blog posts...')
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(seedData.blogPosts.map(post => ({
          ...post,
          slug: generateSlug(post.title),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })))
        .select()
      
      if (error) {
        console.error('❌ Error seeding blog posts:', error)
      } else {
        totalInserted += data?.length || 0
        console.log(`✅ Seeded ${data?.length || 0} blog posts`)
      }
    } else {
      console.log('📝 Blog posts already exist, skipping...')
    }

    console.log('\n🎉 Database seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   • About me: 1 record`)
    console.log(`   • Services: ${seedData.services.length} records`)
    console.log(`   • Projects: ${seedData.projects.length} records`)
    console.log(`   • Certifications: ${seedData.certifications.length} records`)
    console.log(`   • Blog posts: ${seedData.blogPosts.length} records`)
    console.log(`   • Total new records: ${totalInserted}`)

    return {
      success: true,
      message: 'Database seeded successfully',
      totalInserted,
      counts: {
        aboutMe: 1,
        services: seedData.services.length,
        projects: seedData.projects.length,
        certifications: seedData.certifications.length,
        blogPosts: seedData.blogPosts.length
      }
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    return {
      success: false,
      error: error.message,
      message: 'Failed to seed database'
    }
  }
}

// Run the seeding function
if (import.meta.main) {
  await runSeed()
}