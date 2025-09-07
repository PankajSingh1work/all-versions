import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Github, 
  Calendar, 
  Code,
  Eye,
  Star,
  ArrowRight
} from 'lucide-react';

const allProjects = [
  {
    id: 1,
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard built with React and D3.js, featuring real-time data visualization, interactive charts, and customizable reporting.',
    image: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTY2MzkzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    techStack: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
    category: 'Web Application',
    year: '2024',
    status: 'Completed',
    featured: true,
    demoUrl: '#',
    githubUrl: '#',
    client: 'DataTech Solutions',
    duration: '3 months',
    highlights: ['Real-time data processing', 'Custom chart library', '99.9% uptime']
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, admin dashboard, and mobile-responsive design.',
    image: 'https://images.unsplash.com/photo-1742454582165-deab666a8763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZSUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NTY2MzkzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    techStack: ['Next.js', 'Stripe', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    category: 'E-commerce',
    year: '2024',
    status: 'Completed',
    featured: true,
    demoUrl: '#',
    githubUrl: '#',
    client: 'ShopFlow Inc.',
    duration: '4 months',
    highlights: ['Multi-vendor support', 'Advanced search', 'Mobile app integration']
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website with dynamic content management, blog functionality, and smooth animations.',
    image: 'https://images.unsplash.com/photo-1648134859211-4a1b57575f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc1NjYzOTMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Supabase', 'Vercel'],
    category: 'Portfolio',
    year: '2024',
    status: 'In Progress',
    featured: false,
    demoUrl: '#',
    githubUrl: '#',
    client: 'Personal Project',
    duration: '2 months',
    highlights: ['Dynamic CMS', 'SEO optimized', 'Dark mode support']
  },
  {
    id: 4,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, team collaboration, and project tracking capabilities.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    techStack: ['React Native', 'Redux', 'Socket.io', 'Express', 'MongoDB'],
    category: 'Mobile App',
    year: '2023',
    status: 'Completed',
    featured: true,
    demoUrl: '#',
    githubUrl: '#',
    client: 'Productivity Pro',
    duration: '5 months',
    highlights: ['Cross-platform', 'Offline sync', 'Team collaboration']
  },
  {
    id: 5,
    title: 'Restaurant Booking System',
    description: 'Online reservation system for restaurants with table management, customer notifications, and analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'Pusher', 'Stripe'],
    category: 'Web Application',
    year: '2023',
    status: 'Completed',
    featured: false,
    demoUrl: '#',
    githubUrl: '#',
    client: 'DineEasy',
    duration: '3 months',
    highlights: ['Real-time availability', 'SMS notifications', 'Multi-location support']
  },
  {
    id: 6,
    title: 'Learning Management System',
    description: 'Comprehensive LMS platform with course creation, student tracking, video streaming, and assessment tools.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    techStack: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS S3', 'WebRTC'],
    category: 'Education',
    year: '2023',
    status: 'Completed',
    featured: false,
    demoUrl: '#',
    githubUrl: '#',
    client: 'EduTech Solutions',
    duration: '6 months',
    highlights: ['Video streaming', 'Interactive quizzes', 'Progress tracking']
  },
  {
    id: 7,
    title: 'Fitness Tracking App',
    description: 'Mobile fitness application with workout planning, progress tracking, social features, and integration with wearable devices.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    techStack: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit', 'TensorFlow'],
    category: 'Mobile App',
    year: '2022',
    status: 'Completed',
    featured: false,
    demoUrl: '#',
    githubUrl: '#',
    client: 'FitLife App',
    duration: '4 months',
    highlights: ['Wearable integration', 'AI recommendations', 'Social challenges']
  },
  {
    id: 8,
    title: 'Real Estate Platform',
    description: 'Property listing and management platform with advanced search, virtual tours, and integrated CRM system.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    techStack: ['React', 'Node.js', 'MongoDB', 'Mapbox', 'Cloudinary'],
    category: 'Web Application',
    year: '2022',
    status: 'Completed',
    featured: false,
    demoUrl: '#',
    githubUrl: '#',
    client: 'PropTech Innovations',
    duration: '5 months',
    highlights: ['Interactive maps', 'Virtual tours', 'Lead management']
  }
];

const categories = ['All', 'Web Application', 'Mobile App', 'E-commerce', 'Portfolio', 'Education'];
const years = ['All', '2024', '2023', '2022'];
const status = ['All', 'Completed', 'In Progress'];

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || project.year === selectedYear;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    const matchesFeatured = !showFeaturedOnly || project.featured;

    return matchesSearch && matchesCategory && matchesYear && matchesStatus && matchesFeatured;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedYear('All');
    setSelectedStatus('All');
    setShowFeaturedOnly(false);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-primary mb-6">My Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive showcase of my development work across web applications, mobile apps, 
              and digital solutions. Each project represents a unique challenge and innovative solution.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-primary" />
                <span>{allProjects.length} Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span>{allProjects.filter(p => p.featured).length} Featured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>2022 - 2024</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {status.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="flex items-center space-x-2"
              >
                <Star className="h-4 w-4" />
                <span>Featured Only</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {allProjects.length} projects
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-primary mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or clearing the filters.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Project badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {project.featured && (
                          <Badge className="bg-yellow-500 text-yellow-900 border-none">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge 
                          variant={project.status === 'Completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>

                      {/* Category and year */}
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="text-xs text-white border-white/50 mb-2">
                          {project.category}
                        </Badge>
                        <p className="text-white/80 text-sm">{project.year}</p>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-primary mb-2">{project.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Project details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Client:</span>
                          <span className="font-medium">{project.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{project.duration}</span>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Tech Stack:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.techStack.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Key Features:</p>
                        <ul className="space-y-1">
                          {project.highlights.slice(0, 2).map((highlight, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              <span className="text-xs text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-2 pt-4">
                        <Button variant="outline" size="sm" className="flex-1 group/btn">
                          <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Demo
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 group/btn">
                          <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Code
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group/btn"
                        onClick={() => onNavigate('project-detail')}
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-primary">Ready to Start Your Own Project?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always excited to work on new challenges and bring innovative ideas to life. 
              Let's discuss how I can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('contact')}
                className="group"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('services')}
              >
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}