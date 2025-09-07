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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Plus, Edit, Trash2, Save, X, LogOut, User, BarChart3, FileText, Award, Briefcase, Eye, Calendar, Link, Github, ExternalLink } from 'lucide-react';
import { authApi, projectsApi, certificationsApi, blogApi, profileApi, Project, Certification, BlogPost, Profile } from '../lib/supabase';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  onSignOut: () => void;
}

export function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [accessToken, setAccessToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Form states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showCertificationDialog, setShowCertificationDialog] = useState(false);
  const [showBlogDialog, setShowBlogDialog] = useState(false);

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
      const [projectsData, certificationsData, blogData, profileData] = await Promise.allSettled([
        projectsApi.getAll(),
        certificationsApi.getAll(),
        blogApi.getAll(),
        profileApi.get(),
      ]);

      if (projectsData.status === 'fulfilled') setProjects(projectsData.value);
      if (certificationsData.status === 'fulfilled') setCertifications(certificationsData.value);
      if (blogData.status === 'fulfilled') setBlogPosts(blogData.value);
      if (profileData.status === 'fulfilled') setProfile(profileData.value);
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

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      setIsLoading(true);
      
      if (editingProject) {
        const updated = await projectsApi.update(editingProject.id, projectData, accessToken);
        setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
        toast.success('Project updated successfully');
      } else {
        const created = await projectsApi.create(projectData as Omit<Project, 'id' | 'created_at' | 'updated_at'>, accessToken);
        setProjects(prev => [created, ...prev]);
        toast.success('Project created successfully');
      }
      
      setShowProjectDialog(false);
      setEditingProject(null);
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

  const handleSaveCertification = async (certificationData: Partial<Certification>) => {
    try {
      setIsLoading(true);
      
      if (editingCertification) {
        const updated = await certificationsApi.update(editingCertification.id, certificationData, accessToken);
        setCertifications(prev => prev.map(c => c.id === updated.id ? updated : c));
        toast.success('Certification updated successfully');
      } else {
        const created = await certificationsApi.create(certificationData as Omit<Certification, 'id' | 'created_at' | 'updated_at'>, accessToken);
        setCertifications(prev => [created, ...prev]);
        toast.success('Certification created successfully');
      }
      
      setShowCertificationDialog(false);
      setEditingCertification(null);
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

  const handleSaveBlogPost = async (blogData: Partial<BlogPost>) => {
    try {
      setIsLoading(true);
      
      if (editingBlogPost) {
        const updated = await blogApi.update(editingBlogPost.id, blogData, accessToken);
        setBlogPosts(prev => prev.map(b => b.id === updated.id ? updated : b));
        toast.success('Blog post updated successfully');
      } else {
        const created = await blogApi.create(blogData as Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>, accessToken);
        setBlogPosts(prev => [created, ...prev]);
        toast.success('Blog post created successfully');
      }
      
      setShowBlogDialog(false);
      setEditingBlogPost(null);
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

  const handleUpdateProfile = async (profileData: Partial<Profile>) => {
    try {
      setIsLoading(true);
      const updated = await profileApi.update(profileData, accessToken);
      setProfile(updated);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Projects</span>
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
                    {projects.filter(p => p.featured).length} featured
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
                    {certifications.filter(c => c.status === 'valid').length} valid
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
                    {blogPosts.filter(b => b.published).length} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {blogPosts.reduce((sum, post) => sum + (post.views || 0), 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Blog post views</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Latest project additions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.slice(0, 5).map((project) => (
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
                  <CardTitle>Recent Blog Posts</CardTitle>
                  <CardDescription>Latest blog activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {blogPosts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground">{post.views} views</p>
                        </div>
                        <Badge variant={post.published ? 'default' : 'secondary'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    ))}
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
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectDialog(true);
                }}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
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
                          onClick={() => {
                            setEditingProject(project);
                            setShowProjectDialog(true);
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

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-primary">Certifications Management</h2>
              <Button 
                onClick={() => {
                  setEditingCertification(null);
                  setShowCertificationDialog(true);
                }}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((certification) => (
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
                          onClick={() => {
                            setEditingCertification(certification);
                            setShowCertificationDialog(true);
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
                    <p className="text-sm text-muted-foreground mb-4">{certification.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          Issued: {new Date(certification.issue_date).toLocaleDateString()}
                        </span>
                      </div>
                      {certification.expiry_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            Expires: {new Date(certification.expiry_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant={certification.status === 'valid' ? 'default' : 'secondary'}>
                        {certification.status}
                      </Badge>
                      {certification.credential_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={certification.credential_url} target="_blank" rel="noopener noreferrer">
                            <Link className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
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
                onClick={() => {
                  setEditingBlogPost(null);
                  setShowBlogDialog(true);
                }}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Post</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
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
                          onClick={() => {
                            setEditingBlogPost(post);
                            setShowBlogDialog(true);
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
                    <div className="flex items-center justify-between">
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="max-w-2xl">
              <h2 className="text-2xl text-primary mb-6">Profile Settings</h2>
              {profile && (
                <ProfileForm 
                  profile={profile} 
                  onSave={handleUpdateProfile} 
                  isLoading={isLoading} 
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Project Dialog */}
      <ProjectDialog
        open={showProjectDialog}
        onOpenChange={setShowProjectDialog}
        project={editingProject}
        onSave={handleSaveProject}
        isLoading={isLoading}
      />

      {/* Certification Dialog */}
      <CertificationDialog
        open={showCertificationDialog}
        onOpenChange={setShowCertificationDialog}
        certification={editingCertification}
        onSave={handleSaveCertification}
        isLoading={isLoading}
      />

      {/* Blog Dialog */}
      <BlogDialog
        open={showBlogDialog}
        onOpenChange={setShowBlogDialog}
        blogPost={editingBlogPost}
        onSave={handleSaveBlogPost}
        isLoading={isLoading}
      />
    </div>
  );
}

// Project Dialog Component
function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
  isLoading
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onSave: (data: Partial<Project>) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    image_url: '',
    demo_url: '',
    github_url: '',
    tech_stack: [] as string[],
    category: '',
    status: 'draft' as 'completed' | 'in-progress' | 'draft',
    featured: false
  });

  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        long_description: project.long_description || '',
        image_url: project.image_url || '',
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        tech_stack: project.tech_stack || [],
        category: project.category || '',
        status: project.status || 'draft',
        featured: project.featured || false
      });
    } else {
      setFormData({
        title: '',
        description: '',
        long_description: '',
        image_url: '',
        demo_url: '',
        github_url: '',
        tech_stack: [],
        category: '',
        status: 'draft',
        featured: false
      });
    }
  }, [project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTech = () => {
    if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tech_stack: [...prev.tech_stack, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.filter(t => t !== tech)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {project ? 'Update project details' : 'Create a new project for your portfolio'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Project title"
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Web Development"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief project description"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="long_description">Detailed Description</Label>
            <Textarea
              id="long_description"
              value={formData.long_description}
              onChange={(e) => setFormData(prev => ({ ...prev, long_description: e.target.value }))}
              placeholder="Detailed project description"
              rows={5}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="demo_url">Demo URL</Label>
              <Input
                id="demo_url"
                value={formData.demo_url}
                onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                placeholder="https://demo.example.com"
                type="url"
              />
            </div>
            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                value={formData.github_url}
                onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                placeholder="https://github.com/username/repo"
                type="url"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          <div>
            <Label>Tech Stack</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech();
                  }
                }}
              />
              <Button type="button" onClick={addTech}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tech_stack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTech(tech)}>
                  {tech} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'completed' | 'in-progress' | 'draft') => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (project ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Certification Dialog Component
function CertificationDialog({
  open,
  onOpenChange,
  certification,
  onSave,
  isLoading
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certification: Certification | null;
  onSave: (data: Partial<Certification>) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    description: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    credential_url: '',
    status: 'valid' as 'valid' | 'expired'
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        title: certification.title || '',
        issuer: certification.issuer || '',
        description: certification.description || '',
        issue_date: certification.issue_date || '',
        expiry_date: certification.expiry_date || '',
        credential_id: certification.credential_id || '',
        credential_url: certification.credential_url || '',
        status: certification.status || 'valid'
      });
    } else {
      setFormData({
        title: '',
        issuer: '',
        description: '',
        issue_date: '',
        expiry_date: '',
        credential_id: '',
        credential_url: '',
        status: 'valid'
      });
    }
  }, [certification, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{certification ? 'Edit Certification' : 'Add New Certification'}</DialogTitle>
          <DialogDescription>
            {certification ? 'Update certification details' : 'Add a new certification to your portfolio'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Certification title"
                required
              />
            </div>
            <div>
              <Label htmlFor="issuer">Issuer *</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                placeholder="Issuing organization"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the certification"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="issue_date">Issue Date *</Label>
              <Input
                id="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={(e) => setFormData(prev => ({ ...prev, issue_date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="credential_id">Credential ID</Label>
              <Input
                id="credential_id"
                value={formData.credential_id}
                onChange={(e) => setFormData(prev => ({ ...prev, credential_id: e.target.value }))}
                placeholder="Credential identifier"
              />
            </div>
            <div>
              <Label htmlFor="credential_url">Credential URL</Label>
              <Input
                id="credential_url"
                value={formData.credential_url}
                onChange={(e) => setFormData(prev => ({ ...prev, credential_url: e.target.value }))}
                placeholder="https://credentials.example.com"
                type="url"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'valid' | 'expired') => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (certification ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Blog Dialog Component
function BlogDialog({
  open,
  onOpenChange,
  blogPost,
  onSave,
  isLoading
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogPost: BlogPost | null;
  onSave: (data: Partial<BlogPost>) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: '',
    tags: [] as string[],
    published: false
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (blogPost) {
      setFormData({
        title: blogPost.title || '',
        slug: blogPost.slug || '',
        excerpt: blogPost.excerpt || '',
        content: blogPost.content || '',
        featured_image: blogPost.featured_image || '',
        category: blogPost.category || '',
        tags: blogPost.tags || [],
        published: blogPost.published || false
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category: '',
        tags: [],
        published: false
      });
    }
  }, [blogPost, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    if (formData.title && !blogPost) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }));
    }
  }, [formData.title, blogPost]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blogPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
          <DialogDescription>
            {blogPost ? 'Update blog post details' : 'Create a new blog post for your portfolio'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Blog post title"
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="blog-post-slug"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the blog post"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Blog post content (Markdown supported)"
              rows={10}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Web Development"
              />
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (blogPost ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Profile Form Component
function ProfileForm({
  profile,
  onSave,
  isLoading
}: {
  profile: Profile;
  onSave: (data: Partial<Profile>) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    job_title: profile.job_title || '',
    bio: profile.bio || '',
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    website: profile.website || '',
    github_url: profile.github_url || '',
    linkedin_url: profile.linkedin_url || '',
    twitter_url: profile.twitter_url || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                placeholder="Your job title"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                type="url"
                value={formData.twitter_url}
                onChange={(e) => setFormData(prev => ({ ...prev, twitter_url: e.target.value }))}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}