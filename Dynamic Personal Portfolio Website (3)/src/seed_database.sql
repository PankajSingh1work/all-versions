-- Portfolio Database Seeding Script
-- This script seeds the Supabase database with sample data for the portfolio website

-- Insert sample data into about_me table
INSERT INTO about_me (
    id,
    personal_info,
    skills,
    experience,
    education,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    '{
        "name": "John Smith",
        "title": "Full Stack Developer & Cloud Architect",
        "email": "john.smith@example.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "website": "https://johnsmith.dev",
        "bio": "Passionate full-stack developer with 8+ years of experience building scalable web applications and cloud infrastructure. I specialize in React, Node.js, Python, and AWS services, with a strong focus on creating efficient, user-friendly solutions that drive business growth.",
        "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    }',
    '{
        "frontend": ["React", "Next.js", "TypeScript", "JavaScript", "Vue.js", "HTML5", "CSS3", "Tailwind CSS", "SASS", "Bootstrap"],
        "backend": ["Node.js", "Python", "Express.js", "Django", "FastAPI", "REST APIs", "GraphQL", "PHP", "C#", ".NET"],
        "database": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Firebase", "DynamoDB"],
        "cloud": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD"],
        "tools": ["Git", "GitHub", "VS Code", "Docker", "Figma", "Jira", "Postman", "Linux", "Nginx"],
        "soft_skills": ["Leadership", "Problem Solving", "Communication", "Team Collaboration", "Project Management", "Mentoring"]
    }',
    '[
        {
            "company": "TechCorp Solutions",
            "position": "Senior Full Stack Developer",
            "duration": "2021 - Present",
            "location": "San Francisco, CA",
            "description": "Lead a team of 5 developers in building enterprise-level web applications using React, Node.js, and AWS. Architected and implemented microservices infrastructure that improved system performance by 40%.",
            "technologies": ["React", "Node.js", "AWS", "PostgreSQL", "Docker", "Kubernetes"],
            "achievements": [
                "Reduced application load time by 60% through optimization",
                "Led migration to cloud infrastructure, saving $50K annually",
                "Mentored 3 junior developers to senior positions"
            ]
        },
        {
            "company": "StartupXYZ",
            "position": "Full Stack Developer",
            "duration": "2019 - 2021",
            "location": "Austin, TX",
            "description": "Developed and maintained multiple client-facing applications serving 100K+ users. Implemented automated testing and deployment pipelines.",
            "technologies": ["Vue.js", "Python", "Django", "PostgreSQL", "AWS"],
            "achievements": [
                "Built 5 web applications from scratch",
                "Implemented automated CI/CD pipeline",
                "Improved test coverage to 95%"
            ]
        },
        {
            "company": "WebDev Agency",
            "position": "Frontend Developer",
            "duration": "2017 - 2019",
            "location": "Remote",
            "description": "Created responsive, user-friendly websites for small to medium businesses. Collaborated with design team to implement pixel-perfect interfaces.",
            "technologies": ["JavaScript", "HTML5", "CSS3", "jQuery", "PHP"],
            "achievements": [
                "Delivered 25+ client projects on time",
                "Achieved 98% client satisfaction rate",
                "Reduced bounce rate by 35% on average"
            ]
        }
    ]',
    '[
        {
            "institution": "University of California, Berkeley",
            "degree": "Bachelor of Science in Computer Science",
            "duration": "2013 - 2017",
            "location": "Berkeley, CA",
            "gpa": "3.8/4.0",
            "coursework": ["Data Structures", "Algorithms", "Database Systems", "Software Engineering", "Computer Networks", "Operating Systems"],
            "achievements": [
                "Dean''s List for 6 semesters",
                "President of Computer Science Student Association",
                "Published research paper on machine learning optimization"
            ]
        },
        {
            "institution": "FreeCodeCamp",
            "degree": "Full Stack Web Development Certification",
            "duration": "2016",
            "location": "Online",
            "coursework": ["Responsive Web Design", "JavaScript Algorithms", "Frontend Libraries", "Data Visualization", "APIs and Microservices"],
            "projects": [
                "Personal Portfolio Website",
                "Tribute Page",
                "Survey Form",
                "Landing Page"
            ]
        }
    ]',
    NOW(),
    NOW()
);

-- Insert sample projects
INSERT INTO projects (
    id,
    title,
    slug,
    description,
    long_description,
    image_url,
    demo_url,
    github_url,
    tech_stack,
    category,
    status,
    featured,
    created_at,
    updated_at
) VALUES 
(
    gen_random_uuid(),
    'E-commerce Platform',
    'ecommerce-platform',
    'Full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.',
    'A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and a complete admin dashboard. The application uses PostgreSQL for data persistence and AWS for hosting and file storage.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://ecommerce-demo.johnsmith.dev',
    'https://github.com/johnsmith/ecommerce-platform',
    '["React", "Node.js", "Express", "PostgreSQL", "Stripe API", "AWS S3", "JWT", "Tailwind CSS"]',
    'Web Development',
    'completed',
    true,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Task Management Dashboard',
    'task-management-dashboard',
    'Modern task management application with team collaboration features and real-time updates.',
    'A collaborative task management dashboard built with Next.js and Socket.io for real-time updates. Features include project organization, task assignment, deadline tracking, file attachments, team chat, and detailed analytics. The application uses MongoDB for data storage and includes role-based access control.',
    'https://images.unsplash.com/photo-1676731820390-a119efe23333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://taskdash-demo.johnsmith.dev',
    'https://github.com/johnsmith/task-dashboard',
    '["Next.js", "TypeScript", "Socket.io", "MongoDB", "Tailwind CSS", "Chart.js", "Node.js"]',
    'Web Development',
    'completed',
    true,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Weather Analytics API',
    'weather-analytics-api',
    'RESTful API providing weather data analytics with historical trends and forecasting.',
    'A robust RESTful API built with Python and FastAPI that aggregates weather data from multiple sources and provides analytics endpoints. Features include historical weather trends, forecasting algorithms, data visualization endpoints, rate limiting, and comprehensive API documentation with Swagger.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://api.weather-analytics.johnsmith.dev',
    'https://github.com/johnsmith/weather-api',
    '["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "OpenWeatherMap API", "Pandas", "NumPy"]',
    'API Development',
    'completed',
    false,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'React Native Fitness App',
    'react-native-fitness-app',
    'Cross-platform mobile application for fitness tracking with workout plans and progress monitoring.',
    'A comprehensive fitness tracking mobile application built with React Native. Features include workout plan creation, exercise tracking, progress analytics, nutrition logging, social sharing, and integration with device health sensors. The app uses Firebase for backend services and real-time synchronization.',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    null,
    'https://github.com/johnsmith/fitness-app',
    '["React Native", "Firebase", "Redux", "Expo", "Chart.js", "AsyncStorage", "Push Notifications"]',
    'Mobile App',
    'in-progress',
    true,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Cloud Infrastructure Automation',
    'cloud-infrastructure-automation',
    'Terraform templates and scripts for automating AWS infrastructure deployment and management.',
    'A collection of Terraform modules and automation scripts for deploying and managing AWS infrastructure. Includes modules for VPC setup, ECS clusters, RDS databases, S3 buckets, CloudFront distributions, and monitoring with CloudWatch. Features automated CI/CD pipeline integration and infrastructure as code best practices.',
    'https://images.unsplash.com/photo-1608657803991-b62ca5de7a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    null,
    'https://github.com/johnsmith/terraform-aws-modules',
    '["Terraform", "AWS", "Docker", "GitHub Actions", "CloudWatch", "VPC", "ECS", "RDS"]',
    'DevOps',
    'completed',
    false,
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Real-time Chat Application',
    'realtime-chat-application',
    'Scalable real-time messaging application with rooms, file sharing, and user presence.',
    'A scalable real-time chat application built with Socket.io and React. Features include multiple chat rooms, direct messaging, file sharing, user presence indicators, message history, emoji support, and mobile-responsive design. The backend uses Node.js with Redis for session management and message queuing.',
    'https://images.unsplash.com/photo-1587440871875-191322ee64b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://chat-demo.johnsmith.dev',
    'https://github.com/johnsmith/realtime-chat',
    '["React", "Socket.io", "Node.js", "Redis", "MongoDB", "Material-UI", "JWT", "Cloudinary"]',
    'Web Development',
    'completed',
    true,
    NOW(),
    NOW()
);

-- Insert sample services
INSERT INTO services (
    id,
    title,
    slug,
    description,
    long_description,
    image_url,
    category,
    status,
    featured,
    features,
    tools,
    duration,
    availability,
    created_at,
    updated_at
) VALUES 
(
    gen_random_uuid(),
    'Full-Stack Web Development',
    'full-stack-web-development',
    'End-to-end web application development using modern technologies and best practices.',
    'I provide comprehensive full-stack web development services, from initial concept to deployment and maintenance. My expertise covers both frontend and backend development, ensuring seamless integration and optimal performance. I specialize in creating scalable, maintainable applications that meet your business requirements.',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'Web Development',
    'available',
    true,
    '["Custom Web Applications", "Responsive Design", "API Development", "Database Design", "Authentication Systems", "Payment Integration", "SEO Optimization", "Performance Optimization", "Testing & QA", "Deployment & Hosting"]',
    '["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "Figma"]',
    '4-12 weeks',
    'Available for new projects',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Cloud Architecture & DevOps',
    'cloud-architecture-devops',
    'Scalable cloud infrastructure setup, automation, and DevOps pipeline implementation.',
    'Transform your development workflow with professional cloud architecture and DevOps services. I help businesses migrate to the cloud, set up automated deployment pipelines, and implement monitoring solutions that ensure high availability and performance.',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'DevOps',
    'available',
    true,
    '["AWS/Azure/GCP Setup", "Infrastructure as Code", "CI/CD Pipeline Setup", "Container Orchestration", "Monitoring & Logging", "Security Implementation", "Cost Optimization", "Backup & Recovery", "Auto Scaling", "Load Balancing"]',
    '["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "CloudWatch", "Nginx", "Redis", "Prometheus", "Grafana"]',
    '2-8 weeks',
    'Available for consulting',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Mobile App Development',
    'mobile-app-development',
    'Cross-platform mobile application development for iOS and Android platforms.',
    'Create engaging mobile applications that work seamlessly across iOS and Android platforms. Using React Native and modern development practices, I build performant, user-friendly mobile apps that integrate with your existing systems and provide exceptional user experiences.',
    'https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'Mobile Development',
    'limited',
    true,
    '["Cross-platform Development", "Native Performance", "Push Notifications", "Offline Capability", "App Store Optimization", "User Analytics", "In-app Purchases", "Social Integration", "Camera & Media", "Location Services"]',
    '["React Native", "Expo", "Firebase", "Redux", "AsyncStorage", "React Navigation", "Flipper", "Fastlane", "App Store Connect", "Google Play Console"]',
    '6-16 weeks',
    'Limited availability - 2 slots per quarter',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'API Development & Integration',
    'api-development-integration',
    'RESTful API development and third-party service integrations for seamless data flow.',
    'Build robust, scalable APIs and integrate third-party services to enhance your applications functionality. I create well-documented, secure APIs that follow industry standards and best practices, ensuring reliable data exchange and system interoperability.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'Backend Development',
    'available',
    false,
    '["RESTful API Design", "GraphQL Implementation", "Authentication & Authorization", "Rate Limiting", "API Documentation", "Third-party Integrations", "Webhook Implementation", "Data Validation", "Error Handling", "API Testing"]',
    '["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "JWT", "Swagger", "Postman", "Redis", "Docker"]',
    '2-6 weeks',
    'Available for new projects',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Technical Consulting',
    'technical-consulting',
    'Strategic technology consulting for architecture decisions and technical leadership.',
    'Get expert guidance on technical decisions, architecture planning, and technology strategy. I help businesses make informed choices about their technology stack, plan scalable solutions, and provide technical leadership for development teams.',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'Consulting',
    'available',
    false,
    '["Architecture Review", "Technology Assessment", "Code Review", "Performance Auditing", "Security Analysis", "Scalability Planning", "Team Mentoring", "Process Optimization", "Tool Selection", "Best Practices Implementation"]',
    '["Various based on needs", "Documentation tools", "Analysis frameworks", "Industry standards", "Best practices guides"]',
    '1-4 weeks',
    'Available for consulting',
    NOW(),
    NOW()
);

-- Insert sample certifications
INSERT INTO certifications (
    id,
    title,
    slug,
    issuer,
    description,
    issue_date,
    expiry_date,
    credential_id,
    credential_url,
    status,
    created_at,
    updated_at
) VALUES 
(
    gen_random_uuid(),
    'AWS Certified Solutions Architect - Professional',
    'aws-certified-solutions-architect-professional',
    'Amazon Web Services',
    'Advanced certification demonstrating expertise in designing distributed applications and systems on the AWS platform, including best practices for security, reliability, and cost optimization.',
    '2023-06-15',
    '2026-06-15',
    'AWS-SAP-12345678',
    'https://aws.amazon.com/certification/verify/AWS-SAP-12345678',
    'valid',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Google Cloud Professional Cloud Architect',
    'google-cloud-professional-cloud-architect',
    'Google Cloud',
    'Professional-level certification validating expertise in designing, developing, and managing robust, secure, scalable, and dynamic solutions on Google Cloud Platform.',
    '2023-03-22',
    '2025-03-22',
    'GCP-PCA-87654321',
    'https://cloud.google.com/certification/verify/GCP-PCA-87654321',
    'valid',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Microsoft Azure Developer Associate',
    'microsoft-azure-developer-associate',
    'Microsoft',
    'Certification demonstrating skills in developing cloud solutions that span compute, storage, security, and monitoring on Microsoft Azure platform.',
    '2022-11-08',
    '2024-11-08',
    'MSFT-AZ204-11223344',
    'https://docs.microsoft.com/en-us/learn/certifications/azure-developer/verify/MSFT-AZ204-11223344',
    'valid',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Certified Kubernetes Administrator (CKA)',
    'certified-kubernetes-administrator-cka',
    'Cloud Native Computing Foundation',
    'Hands-on certification program that demonstrates the ability to perform the responsibilities of Kubernetes administrators including installation, configuration, and management.',
    '2023-01-10',
    '2026-01-10',
    'CKA-2301-112233',
    'https://training.linuxfoundation.org/certification/verify/CKA-2301-112233',
    'valid',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'MongoDB Certified Developer Associate',
    'mongodb-certified-developer-associate',
    'MongoDB Inc.',
    'Certification validating skills in building applications with MongoDB, including data modeling, indexing, aggregation, and application development best practices.',
    '2022-08-14',
    '2025-08-14',
    'MONGO-DEV-445566',
    'https://university.mongodb.com/certification/verify/MONGO-DEV-445566',
    'valid',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Docker Certified Associate',
    'docker-certified-associate',
    'Docker Inc.',
    'Industry certification that validates technical knowledge and skills with Docker Enterprise products including container orchestration, security, and networking.',
    '2021-12-03',
    '2023-12-03',
    'DOCKER-DCA-778899',
    'https://credentials.docker.com/verify/DOCKER-DCA-778899',
    'expired',
    NOW(),
    NOW()
);

-- Insert sample blog posts
INSERT INTO blog_posts (
    id,
    title,
    slug,
    excerpt,
    content,
    featured_image,
    category,
    published,
    published_at,
    views,
    tags,
    created_at,
    updated_at
) VALUES 
(
    gen_random_uuid(),
    'Building Scalable React Applications: Best Practices and Patterns',
    'building-scalable-react-applications',
    'Learn how to structure and architect React applications that can grow with your team and user base, including component patterns, state management, and performance optimization techniques.',
    '[
        {
            "type": "paragraph",
            "content": "Building scalable React applications requires careful planning and adherence to established patterns and best practices. In this comprehensive guide, we''ll explore the key strategies for creating maintainable, performant React applications that can grow with your business needs."
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Component Architecture"
        },
        {
            "type": "paragraph",
            "content": "The foundation of a scalable React application lies in its component architecture. Here are the key principles to follow:"
        },
        {
            "type": "list",
            "items": [
                "Keep components small and focused on a single responsibility",
                "Use composition over inheritance",
                "Implement proper prop typing with TypeScript or PropTypes",
                "Create reusable UI components in a design system"
            ]
        },
        {
            "type": "code",
            "language": "jsx",
            "content": "// Example of a well-structured component\ninterface UserCardProps {\n  user: User;\n  onEdit: (user: User) => void;\n  onDelete: (userId: string) => void;\n}\n\nexport const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {\n  return (\n    <div className=\"user-card\">\n      <Avatar src={user.avatar} alt={user.name} />\n      <div className=\"user-info\">\n        <h3>{user.name}</h3>\n        <p>{user.email}</p>\n      </div>\n      <div className=\"actions\">\n        <Button onClick={() => onEdit(user)}>Edit</Button>\n        <Button variant=\"danger\" onClick={() => onDelete(user.id)}>Delete</Button>\n      </div>\n    </div>\n  );\n};"
        },
        {
            "type": "heading",
            "level": 2,
            "content": "State Management Strategies"
        },
        {
            "type": "paragraph",
            "content": "Choosing the right state management solution is crucial for scalability. Consider these options based on your application''s complexity:"
        },
        {
            "type": "paragraph",
            "content": "For simple applications, React''s built-in useState and useContext hooks may be sufficient. For complex applications with global state requirements, consider Redux Toolkit, Zustand, or Jotai."
        }
    ]',
    'https://images.unsplash.com/photo-1670057046254-3b5095eb4b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'React',
    true,
    '2024-01-15 10:00:00',
    1247,
    '["React", "JavaScript", "Frontend", "Architecture", "Best Practices", "Performance"]',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Mastering AWS Lambda: Serverless Architecture Patterns',
    'mastering-aws-lambda-serverless-patterns',
    'Explore advanced AWS Lambda patterns and best practices for building robust serverless applications, including error handling, monitoring, and cost optimization strategies.',
    '[
        {
            "type": "paragraph",
            "content": "Serverless computing with AWS Lambda has revolutionized how we build and deploy applications. This guide covers advanced patterns and best practices for creating production-ready serverless applications."
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Lambda Function Patterns"
        },
        {
            "type": "paragraph",
            "content": "Understanding different Lambda patterns is essential for building efficient serverless applications:"
        },
        {
            "type": "list",
            "items": [
                "Event-driven processing with SQS and SNS",
                "HTTP API handling with API Gateway",
                "Scheduled tasks with CloudWatch Events",
                "Stream processing with Kinesis and DynamoDB Streams"
            ]
        },
        {
            "type": "code",
            "language": "javascript",
            "content": "// Example Lambda function with proper error handling\nexports.handler = async (event, context) => {\n  try {\n    console.log(''Processing event:'', JSON.stringify(event));\n    \n    // Process the event\n    const result = await processEvent(event);\n    \n    return {\n      statusCode: 200,\n      headers: {\n        ''Content-Type'': ''application/json'',\n        ''Access-Control-Allow-Origin'': ''*''\n      },\n      body: JSON.stringify(result)\n    };\n  } catch (error) {\n    console.error(''Error processing event:'', error);\n    \n    return {\n      statusCode: 500,\n      headers: {\n        ''Content-Type'': ''application/json''\n      },\n      body: JSON.stringify({\n        error: ''Internal server error''\n      })\n    };\n  }\n};"
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Performance Optimization"
        },
        {
            "type": "paragraph",
            "content": "Optimizing Lambda performance involves several key strategies including cold start reduction, memory allocation optimization, and efficient dependency management."
        }
    ]',
    'https://images.unsplash.com/photo-1608657803991-b62ca5de7a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'AWS',
    true,
    '2024-01-10 14:30:00',
    892,
    '["AWS", "Lambda", "Serverless", "Cloud", "Architecture", "DevOps"]',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'TypeScript for React Developers: Advanced Techniques',
    'typescript-react-developers-advanced',
    'Dive deep into advanced TypeScript techniques specifically for React development, including generic components, utility types, and integration with popular libraries.',
    '[
        {
            "type": "paragraph",
            "content": "TypeScript has become an essential tool for React developers, providing type safety and better developer experience. This article explores advanced TypeScript techniques that will elevate your React development skills."
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Generic Components"
        },
        {
            "type": "paragraph",
            "content": "Generic components allow you to create reusable components that work with different data types while maintaining type safety."
        },
        {
            "type": "code",
            "language": "tsx",
            "content": "interface ListProps<T> {\n  items: T[];\n  renderItem: (item: T) => React.ReactNode;\n  keyExtractor: (item: T) => string;\n}\n\nfunction List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={keyExtractor(item)}>\n          {renderItem(item)}\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// Usage\n<List\n  items={users}\n  renderItem={(user) => <UserCard user={user} />}\n  keyExtractor={(user) => user.id}\n/>"
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Utility Types for Props"
        },
        {
            "type": "paragraph",
            "content": "TypeScript''s utility types can help you create flexible and maintainable prop definitions:"
        }
    ]',
    'https://images.unsplash.com/photo-1627398242454-45a1465c2479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'TypeScript',
    true,
    '2024-01-05 09:15:00',
    634,
    '["TypeScript", "React", "JavaScript", "Frontend", "Development", "Types"]',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'Database Design Patterns for Modern Web Applications',
    'database-design-patterns-modern-web-apps',
    'Explore essential database design patterns and strategies for building efficient, scalable data layers in modern web applications, including NoSQL and SQL approaches.',
    '[
        {
            "type": "paragraph",
            "content": "Effective database design is crucial for building scalable web applications. This comprehensive guide covers modern database design patterns, best practices, and strategies for both SQL and NoSQL databases."
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Choosing the Right Database"
        },
        {
            "type": "paragraph",
            "content": "The choice between SQL and NoSQL databases depends on your application''s specific requirements:"
        },
        {
            "type": "list",
            "items": [
                "SQL databases for complex relationships and ACID compliance",
                "NoSQL databases for flexible schemas and horizontal scaling",
                "Consider hybrid approaches for different parts of your application",
                "Evaluate consistency requirements and scalability needs"
            ]
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Schema Design Patterns"
        },
        {
            "type": "paragraph",
            "content": "Implementing proper schema design patterns can significantly impact your application''s performance and maintainability."
        }
    ]',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'Database',
    true,
    '2023-12-28 16:45:00',
    445,
    '["Database", "Design", "SQL", "NoSQL", "Architecture", "Performance"]',
    NOW(),
    NOW()
),
(
    gen_random_uuid(),
    'CI/CD Best Practices for Modern Development Teams',
    'cicd-best-practices-modern-teams',
    'Learn how to implement effective CI/CD pipelines using modern tools and practices, including automated testing, deployment strategies, and monitoring.',
    '[
        {
            "type": "paragraph",
            "content": "Continuous Integration and Continuous Deployment (CI/CD) are essential practices for modern development teams. This guide covers best practices for implementing robust CI/CD pipelines that improve code quality and deployment reliability."
        },
        {
            "type": "heading",
            "level": 2,
            "content": "Pipeline Structure"
        },
        {
            "type": "paragraph",
            "content": "A well-structured CI/CD pipeline should include the following stages:"
        },
        {
            "type": "list",
            "items": [
                "Code checkout and dependency installation",
                "Automated testing (unit, integration, e2e)",
                "Code quality checks and security scanning",
                "Build and artifact creation",
                "Deployment to staging and production environments"
            ]
        },
        {
            "type": "code",
            "language": "yaml",
            "content": "# Example GitHub Actions workflow\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Setup Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: ''18''\n          cache: ''npm''\n      - run: npm ci\n      - run: npm run test\n      - run: npm run build\n\n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    if: github.ref == ''refs/heads/main''\n    steps:\n      - name: Deploy to production\n        run: echo \"Deploying to production\""
        }
    ]',
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'DevOps',
    false,
    null,
    0,
    '["CI/CD", "DevOps", "Automation", "Testing", "Deployment", "GitHub Actions"]',
    NOW(),
    NOW()
);

-- Verify data insertion with sample queries
-- SELECT COUNT(*) as about_me_count FROM about_me;
-- SELECT COUNT(*) as projects_count FROM projects;
-- SELECT COUNT(*) as services_count FROM services;
-- SELECT COUNT(*) as certifications_count FROM certifications;
-- SELECT COUNT(*) as blog_posts_count FROM blog_posts;

-- End of seeding script