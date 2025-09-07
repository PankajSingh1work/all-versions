import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Plus, Edit, Trash2, Save, X, LogOut, User, BarChart3, FileText, Award, Briefcase, Eye, Calendar, Link, Github, ExternalLink, Settings } from 'lucide-react';
import { authApi, projectsApi, certificationsApi, blogApi, profileApi, servicesApi, Project, Certification, BlogPost, Profile, Service } from '../lib/supabase';
import { AdminDatabaseStatus } from './AdminDatabaseStatus';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  onSignOut: () => void;
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onSignOut, onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [accessToken, setAccessToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Form states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showCertificationDialog, setShowCertificationDialog] = useState(false);
  const [showBlogDialog, setShowBlogDialog] = useState(false);

  // Form data states
  const [projectFormData, setProjectFormData] = useState<Partial<Project>>({});
  const [certificationFormData, setCertificationFormData] = useState<Partial<Certification>>({});
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({});

  useEffect(() => {
    // Get access token from session
    authApi.getSession().then(session => {
      if (session?.access_token) {
        setAccessToken(session.access_token);
      }
    });

    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projectsData, certificationsData, blogData, servicesData, profileData] = await Promise.allSettled([
        projectsApi.getAll(),
        certificationsApi.getAll(),
        blogApi.getAll(),
        servicesApi.getAll(),
        profileApi.get(),
      ]);

      if (projectsData.status === 'fulfilled') {
        setProjects(projectsData.value.filter(p => p !== null && p !== undefined));
      }
      if (certificationsData.status === 'fulfilled') {
        setCertifications(certificationsData.value.filter(c => c !== null && c !== undefined));
      }
      if (blogData.status === 'fulfilled') {
        setBlogPosts(blogData.value.filter(b => b !== null && b !== undefined));
      }
      if (servicesData.status === 'fulfilled') {
        setServices(servicesData.value.filter(s => s !== null && s !== undefined));
      }
      if (profileData.status === 'fulfilled') {
        setProfile(profileData.value);
      }
    } catch (error) {
      toast.error('Failed to load data');
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authApi.signOut();
      onSignOut();
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  // Project handlers
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description,
      image_url: project.image_url,
      demo_url: project.demo_url,
      github_url: project.github_url,
      tech_stack: project.tech_stack,
      category: project.category,
      status: project.status,
      featured: project.featured,
      slug: project.slug
    });
    setShowProjectDialog(true);
  };

  const handleSaveProject = async () => {
    try {
      setIsLoading(true);
      
      if (editingProject) {
        const updated = await projectsApi.update(editingProject.id, projectFormData, accessToken);
        setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
        toast.success('Project updated successfully');
      }
      
      setShowProjectDialog(false);
      setEditingProject(null);
      setProjectFormData({});
    } catch (error) {
      toast.error('Failed to save project');
      console.error('Error saving project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      setIsLoading(true);
      await projectsApi.delete(id, accessToken);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Error deleting project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Certification handlers
  const handleEditCertification = (certification: Certification) => {
    setEditingCertification(certification);
    setCertificationFormData({
      title: certification.title,
      issuer: certification.issuer,
      description: certification.description,
      issue_date: certification.issue_date,
      expiry_date: certification.expiry_date,
      credential_id: certification.credential_id,
      credential_url: certification.credential_url,
      status: certification.status
    });
    setShowCertificationDialog(true);
  };

  const handleSaveCertification = async () => {
    try {
      setIsLoading(true);
      
      if (editingCertification) {
        const updated = await certificationsApi.update(editingCertification.id, certificationFormData, accessToken);
        setCertifications(prev => prev.map(c => c.id === updated.id ? updated : c));
        toast.success('Certification updated successfully');
      }
      
      setShowCertificationDialog(false);
      setEditingCertification(null);
      setCertificationFormData({});
    } catch (error) {
      toast.error('Failed to save certification');
      console.error('Error saving certification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCertification = async (id: string) => {
    try {
      setIsLoading(true);
      await certificationsApi.delete(id, accessToken);
      setCertifications(prev => prev.filter(c => c.id !== id));
      toast.success('Certification deleted successfully');
    } catch (error) {
      toast.error('Failed to delete certification');
      console.error('Error deleting certification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Blog post handlers
  const handleEditBlogPost = (blogPost: BlogPost) => {
    setEditingBlogPost(blogPost);
    setBlogFormData({
      title: blogPost.title,
      slug: blogPost.slug,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      featured_image: blogPost.featured_image,
      category: blogPost.category,
      published: blogPost.published,
      tags: blogPost.tags
    });
    setShowBlogDialog(true);
  };

  const handleSaveBlogPost = async () => {
    try {
      setIsLoading(true);
      
      if (editingBlogPost) {
        const updated = await blogApi.update(editingBlogPost.id, blogFormData, accessToken);
        setBlogPosts(prev => prev.map(b => b.id === updated.id ? updated : b));
        toast.success('Blog post updated successfully');
      }
      
      setShowBlogDialog(false);
      setEditingBlogPost(null);
      setBlogFormData({});
    } catch (error) {
      toast.error('Failed to save blog post');
      console.error('Error saving blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    try {
      setIsLoading(true);
      await blogApi.delete(id, accessToken);
      setBlogPosts(prev => prev.filter(b => b.id !== id));
      toast.success('Blog post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete blog post');
      console.error('Error deleting blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      setIsLoading(true);
      await servicesApi.delete(id, accessToken);
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
      console.error('Error deleting service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl text-primary">Admin Dashboard</h1>
            <Badge variant="secondary">Portfolio Management</Badge>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Database Status Card */}
        <AdminDatabaseStatus onNavigateToSetup={() => onNavigate('admin-setup')} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Certifications</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Blog</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{projects.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {projects.filter(p => p && p.featured).length} featured
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Services</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{services.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {services.filter(s => s && s.status === 'available').length} available
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{certifications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {certifications.filter(c => c && c.status === 'valid').length} valid
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{blogPosts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {blogPosts.filter(b => b && b.published).length} published
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Latest project additions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.filter(p => p).slice(0, 5).map((project) => (
                      <div key={project.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-muted-foreground">{project.category}</p>
                        </div>
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Services</CardTitle>
                  <CardDescription>Latest service offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {services.filter(s => s).slice(0, 5).map((service) => (
                      <div key={service.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{service.title}</p>
                          <p className="text-sm text-muted-foreground">{service.category}</p>
                        </div>
                        <Badge variant={
                          service.status === 'available' ? 'default' :
                          service.status === 'limited' ? 'secondary' : 'outline'
                        }>
                          {service.status === 'available' ? 'Available' :
                           service.status === 'limited' ? 'Limited' : service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                  <CardDescription>Latest blog activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {blogPosts.filter(p => p).slice(0, 5).map((post) => (
                      <div key={post.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground">{post.views || 0} views</p>
                        </div>
                        <Badge variant={post.published ? 'default' : 'secondary'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your portfolio content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => onNavigate('admin-setup')}
                      className="w-full flex items-center justify-start space-x-2"
                      variant="default"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Database Setup</span>
                    </Button>
                    <Button 
                      onClick={() => onNavigate('update-about')}
                      className="w-full flex items-center justify-start space-x-2"
                      variant="outline"
                    >
                      <User className="w-4 h-4" />
                      <span>Update About Page</span>
                    </Button>
                    <Button 
                      onClick={() => onNavigate('add-project')}
                      className="w-full flex items-center justify-start space-x-2"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </Button>
                    <Button 
                      onClick={() => onNavigate('add-certificate')}
                      className="w-full flex items-center justify-start space-x-2"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Certification</span>
                    </Button>
                    <Button 
                      onClick={() => onNavigate('add-blog')}
                      className="w-full flex items-center justify-start space-x-2"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Blog Post</span>
                    </Button>
                    <Button 
                      onClick={() => onNavigate('add-service')}
                      className="w-full flex items-center justify-start space-x-2"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-primary">Projects Management</h2>
              <Button 
                onClick={() => onNavigate('add-project')}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.filter(p => p).map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.category}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Project</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{project.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack?.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                      {project.featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.demo_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-primary">Services Management</h2>
              <Button 
                onClick={() => onNavigate('add-service')}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.filter(s => s).map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.category}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast.info('Service editing functionality will be available soon');
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Service</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{service.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tools?.slice(0, 3).map((tool, index) => (
                        <Badge key={index} variant="secondary">{tool}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={
                        service.status === 'available' ? 'default' :
                        service.status === 'limited' ? 'secondary' :
                        service.status === 'booked' ? 'destructive' : 'outline'
                      }>
                        {service.status === 'available' ? 'Available' :
                         service.status === 'limited' ? 'Limited' :
                         service.status === 'booked' ? 'Booked' : 'Paused'}
                      </Badge>
                      {service.featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Duration: {service.duration}</p>
                      <p>Features: {service.features?.length || 0}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-primary">Certifications Management</h2>
              <Button 
                onClick={() => onNavigate('add-certificate')}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certifications.filter(c => c).map((certification) => (
                <Card key={certification.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{certification.title}</CardTitle>
                        <CardDescription>{certification.issuer}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCertification(certification)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Certification</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{certification.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCertification(certification.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{certification.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={certification.status === 'valid' ? 'default' : 'secondary'}>
                        {certification.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {new Date(certification.issue_date).toLocaleDateString()}
                      </div>
                    </div>
                    {certification.credential_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={certification.credential_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          <span className="ml-2">View Certificate</span>
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-primary">Blog Management</h2>
              <Button 
                onClick={() => onNavigate('add-blog')}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Blog Post</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.filter(b => b).map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>{post.category}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditBlogPost(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{post.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteBlogPost(post.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        <Eye className="w-4 h-4 inline mr-1" />
                        {post.views || 0} views
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-primary">Profile Management</h2>
              <Button 
                onClick={() => onNavigate('update-about')}
                className="flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit About Page</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your portfolio profile data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg mb-2">Profile Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    Update your profile information, skills, experience, and education details.
                  </p>
                  <Button onClick={() => onNavigate('update-about')}>
                    Update About Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Project Dialog */}
        <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update the project information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-title">Title</Label>
                  <Input
                    id="project-title"
                    value={projectFormData.title || ''}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-category">Category</Label>
                  <Select 
                    value={projectFormData.category || ''} 
                    onValueChange={(value) => setProjectFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="Desktop Application">Desktop Application</SelectItem>
                      <SelectItem value="API Development">API Development</SelectItem>
                      <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={projectFormData.description || ''}
                  onChange={(e) => setProjectFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-demo">Demo URL</Label>
                  <Input
                    id="project-demo"
                    value={projectFormData.demo_url || ''}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-github">GitHub URL</Label>
                  <Input
                    id="project-github"
                    value={projectFormData.github_url || ''}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, github_url: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-status">Status</Label>
                  <Select 
                    value={projectFormData.status || ''} 
                    onValueChange={(value) => setProjectFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={projectFormData.featured || false}
                      onCheckedChange={(checked) => setProjectFormData(prev => ({ ...prev, featured: checked }))}
                    />
                    <Label>Featured Project</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProjectDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProject} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Certification Dialog */}
        <Dialog open={showCertificationDialog} onOpenChange={setShowCertificationDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Certification</DialogTitle>
              <DialogDescription>
                Update the certification information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-title">Title</Label>
                  <Input
                    id="cert-title"
                    value={certificationFormData.title || ''}
                    onChange={(e) => setCertificationFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-issuer">Issuer</Label>
                  <Input
                    id="cert-issuer"
                    value={certificationFormData.issuer || ''}
                    onChange={(e) => setCertificationFormData(prev => ({ ...prev, issuer: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-description">Description</Label>
                <Textarea
                  id="cert-description"
                  value={certificationFormData.description || ''}
                  onChange={(e) => setCertificationFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-issue-date">Issue Date</Label>
                  <Input
                    id="cert-issue-date"
                    type="date"
                    value={certificationFormData.issue_date || ''}
                    onChange={(e) => setCertificationFormData(prev => ({ ...prev, issue_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-expiry-date">Expiry Date (Optional)</Label>
                  <Input
                    id="cert-expiry-date"
                    type="date"
                    value={certificationFormData.expiry_date || ''}
                    onChange={(e) => setCertificationFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-credential-id">Credential ID</Label>
                  <Input
                    id="cert-credential-id"
                    value={certificationFormData.credential_id || ''}
                    onChange={(e) => setCertificationFormData(prev => ({ ...prev, credential_id: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-status">Status</Label>
                  <Select 
                    value={certificationFormData.status || ''} 
                    onValueChange={(value) => setCertificationFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valid">Valid</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-url">Verification URL</Label>
                <Input
                  id="cert-url"
                  value={certificationFormData.credential_url || ''}
                  onChange={(e) => setCertificationFormData(prev => ({ ...prev, credential_url: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCertificationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCertification} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Blog Post Dialog */}
        <Dialog open={showBlogDialog} onOpenChange={setShowBlogDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
              <DialogDescription>
                Update the blog post information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blog-title">Title</Label>
                  <Input
                    id="blog-title"
                    value={blogFormData.title || ''}
                    onChange={(e) => setBlogFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-category">Category</Label>
                  <Input
                    id="blog-category"
                    value={blogFormData.category || ''}
                    onChange={(e) => setBlogFormData(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-excerpt">Excerpt</Label>
                <Textarea
                  id="blog-excerpt"
                  value={blogFormData.excerpt || ''}
                  onChange={(e) => setBlogFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-image">Featured Image URL</Label>
                <Input
                  id="blog-image"
                  value={blogFormData.featured_image || ''}
                  onChange={(e) => setBlogFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={blogFormData.published || false}
                  onCheckedChange={(checked) => setBlogFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label>Published</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBlogDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveBlogPost} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}