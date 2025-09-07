import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Clock,
  User,
  Target,
  CheckCircle,
  ArrowLeft,
  Share,
  Heart,
  Eye,
  Code,
  Palette,
  Database
} from 'lucide-react';

// This would typically come from props or URL params
const projectData = {
  id: 1,
  title: 'Analytics Dashboard',
  subtitle: 'Real-time Data Visualization Platform',
  description: 'A comprehensive analytics dashboard built with React and D3.js, featuring real-time data visualization, interactive charts, and customizable reporting capabilities for enterprise clients.',
  fullDescription: `This analytics dashboard was designed to provide enterprise clients with powerful insights into their business data. The platform processes millions of data points in real-time and presents them through intuitive visualizations.

The project required careful consideration of performance optimization, as the dashboard needed to handle large datasets without compromising user experience. I implemented efficient data streaming techniques and optimized rendering to ensure smooth interactions even with complex visualizations.

The dashboard features a modular architecture that allows for easy customization and extension. Each widget can be configured independently, and the layout is fully responsive across all device sizes.`,
  images: [
    {
      url: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTY2MzkzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Main dashboard overview with key metrics'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      caption: 'Interactive chart components'
    },
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      caption: 'Data analysis and reporting interface'
    }
  ],
  client: 'DataTech Solutions',
  duration: '3 months',
  year: '2024',
  status: 'Completed',
  category: 'Web Application',
  featured: true,
  demoUrl: 'https://dashboard-demo.example.com',
  githubUrl: 'https://github.com/johndoe/analytics-dashboard',
  techStack: [
    { name: 'React', category: 'Frontend', icon: Code },
    { name: 'TypeScript', category: 'Language', icon: Code },
    { name: 'D3.js', category: 'Visualization', icon: Palette },
    { name: 'Node.js', category: 'Backend', icon: Database },
    { name: 'PostgreSQL', category: 'Database', icon: Database },
    { name: 'Redis', category: 'Cache', icon: Database },
    { name: 'Socket.io', category: 'Real-time', icon: Code },
    { name: 'AWS', category: 'Cloud', icon: Database }
  ],
  features: [
    {
      title: 'Real-time Data Processing',
      description: 'Process and visualize data streams in real-time with minimal latency',
      icon: Target
    },
    {
      title: 'Interactive Visualizations',
      description: 'Custom D3.js charts with zoom, pan, and filter capabilities',
      icon: Palette
    },
    {
      title: 'Customizable Dashboards',
      description: 'Drag-and-drop interface for creating personalized dashboard layouts',
      icon: Code
    },
    {
      title: 'Export & Reporting',
      description: 'Generate PDF reports and export data in multiple formats',
      icon: Database
    }
  ],
  challenges: [
    {
      title: 'Performance Optimization',
      description: 'Handling large datasets (1M+ records) without UI lag',
      solution: 'Implemented virtualization, data pagination, and efficient rendering techniques'
    },
    {
      title: 'Real-time Updates',
      description: 'Maintaining data consistency across multiple concurrent users',
      solution: 'Used WebSockets with Redis for real-time synchronization and conflict resolution'
    },
    {
      title: 'Complex Visualizations',
      description: 'Creating interactive charts that remain performant with dynamic data',
      solution: 'Custom D3.js components with optimized update patterns and canvas rendering for large datasets'
    }
  ],
  results: [
    'Improved data analysis efficiency by 65%',
    'Reduced report generation time from hours to minutes',
    'Increased user engagement by 40%',
    'Successfully handling 99.9% uptime in production'
  ],
  testimonial: {
    content: "John delivered an exceptional analytics platform that transformed how our team works with data. The real-time capabilities and intuitive interface exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CTO, DataTech Solutions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612c8e5?w=100&h=100&fit=crop&crop=face"
  },
  stats: {
    views: 2156,
    likes: 89,
    shares: 23
  }
};

interface ProjectDetailPageProps {
  onNavigate: (page: string) => void;
}

export function ProjectDetailPage({ onNavigate }: ProjectDetailPageProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => onNavigate('projects')}
              className="mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline">{projectData.category}</Badge>
                  <Badge variant={projectData.status === 'Completed' ? 'default' : 'secondary'}>
                    {projectData.status}
                  </Badge>
                  {projectData.featured && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-none">
                      Featured
                    </Badge>
                  )}
                </div>

                <div>
                  <h1 className="text-primary mb-4">{projectData.title}</h1>
                  <p className="text-xl text-secondary mb-4">{projectData.subtitle}</p>
                  <p className="text-muted-foreground">{projectData.description}</p>
                </div>

                {/* Project Meta */}
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Client:</span>
                      <span className="font-medium">{projectData.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{projectData.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Year:</span>
                      <span className="font-medium">{projectData.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Views:</span>
                      <span className="font-medium">{projectData.stats.views}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="group">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="lg" className="group">
                    <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    View Code
                  </Button>
                  <Button variant="ghost" size="lg" className="group">
                    <Share className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Share
                  </Button>
                  <Button variant="ghost" size="lg" className="group">
                    <Heart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    {projectData.stats.likes}
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <ImageWithFallback
                    src={projectData.images[0].url}
                    alt={projectData.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8 space-y-12">
              {/* Project Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Project Overview</h2>
                    <div className="prose prose-neutral max-w-none">
                      {projectData.fullDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Challenges & Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-primary mb-8">Challenges & Solutions</h2>
                <div className="space-y-6">
                  {projectData.challenges.map((challenge, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-primary mb-3">{challenge.title}</h3>
                        <p className="text-muted-foreground mb-4">{challenge.description}</p>
                        <div className="border-l-4 border-secondary pl-4">
                          <p className="font-medium text-secondary mb-1">Solution:</p>
                          <p className="text-muted-foreground">{challenge.solution}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Project Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectData.results.map((result, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Client Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="bg-primary/5">
                  <CardContent className="p-8 text-center">
                    <blockquote className="text-lg text-muted-foreground italic mb-6">
                      "{projectData.testimonial.content}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={projectData.testimonial.image}
                          alt={projectData.testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-primary">{projectData.testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{projectData.testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {projectData.features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-primary">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            {/* Technical Tab */}
            <TabsContent value="technical" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projectData.techStack.map((tech, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <tech.icon className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium">{tech.name}</p>
                            <p className="text-sm text-muted-foreground">{tech.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Architecture & Approach</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        The application follows a modern microservices architecture with clear separation of concerns. 
                        The frontend is built as a single-page application using React with TypeScript for type safety.
                      </p>
                      <p>
                        Real-time functionality is implemented using WebSocket connections with Socket.io, 
                        ensuring efficient bi-directional communication between the client and server.
                      </p>
                      <p>
                        Data visualization leverages D3.js for maximum flexibility and performance, 
                        with custom components optimized for large datasets and smooth interactions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {projectData.images.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-96 overflow-hidden">
                      <ImageWithFallback
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">{image.caption}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-4">More Projects</h2>
            <p className="text-muted-foreground">
              Explore other projects showcasing different technologies and solutions.
            </p>
          </motion.div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('projects')}
              className="group"
            >
              View All Projects
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}