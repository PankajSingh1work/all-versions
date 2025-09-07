import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectsApi, Project } from '../lib/supabase';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Github, 
  Calendar, 
  Code,
  Eye,
  Star,
  ArrowRight,
  Loader2
} from 'lucide-react';

// These will be dynamically generated from the projects data
let categories = ['All'];
let years = ['All'];
let statuses = ['All'];

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const projectsData = await projectsApi.getAll();
        setAllProjects(projectsData);
        
        // Generate filter options from the data
        const uniqueCategories = [...new Set(projectsData.map(p => p.category))];
        const uniqueYears = [...new Set(projectsData.map(p => new Date(p.created_at).getFullYear().toString()))];
        const uniqueStatuses = [...new Set(projectsData.map(p => p.status === 'completed' ? 'Completed' : p.status === 'in-progress' ? 'In Progress' : 'Draft'))];
        
        categories = ['All', ...uniqueCategories];
        years = ['All', ...uniqueYears.sort().reverse()];
        statuses = ['All', ...uniqueStatuses];
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading projects...</span>
        </div>
      </div>
    );
  }

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech_stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const projectYear = new Date(project.created_at).getFullYear().toString();
    const matchesYear = selectedYear === 'All' || projectYear === selectedYear;
    const projectStatus = project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Draft';
    const matchesStatus = selectedStatus === 'All' || projectStatus === selectedStatus;
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
                  {statuses.map((s) => (
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
                        src={project.image_url || 'https://images.unsplash.com/photo-1676731820390-a119efe23333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'}
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
                          variant={project.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Draft'}
                        </Badge>
                      </div>

                      {/* Category and year */}
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="text-xs text-white border-white/50 mb-2">
                          {project.category}
                        </Badge>
                        <p className="text-white/80 text-sm">{new Date(project.created_at).getFullYear()}</p>
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
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-medium">{project.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">{project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Draft'}</span>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Tech Stack:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech_stack.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.tech_stack.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.tech_stack.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-2 pt-4">
                        {project.demo_url && (
                          <Button variant="outline" size="sm" className="flex-1 group/btn" asChild>
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button variant="outline" size="sm" className="flex-1 group/btn" asChild>
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              Code
                            </a>
                          </Button>
                        )}
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