import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { 
  BarChart3, 
  FileText, 
  FolderOpen, 
  Award, 
  Settings, 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';

const dashboardStats = [
  {
    title: 'Total Projects',
    value: '12',
    change: '+2 this month',
    icon: FolderOpen,
    color: 'text-blue-600'
  },
  {
    title: 'Blog Posts',
    value: '24',
    change: '+4 this month',
    icon: FileText,
    color: 'text-green-600'
  },
  {
    title: 'Certifications',
    value: '8',
    change: '+1 this month',
    icon: Award,
    color: 'text-purple-600'
  },
  {
    title: 'Page Views',
    value: '1,234',
    change: '+15% this month',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
];

const recentProjects = [
  { id: 1, title: 'E-commerce Platform', status: 'Published', lastUpdated: '2 days ago' },
  { id: 2, title: 'Analytics Dashboard', status: 'Draft', lastUpdated: '1 week ago' },
  { id: 3, title: 'Portfolio Website', status: 'Published', lastUpdated: '2 weeks ago' }
];

const recentPosts = [
  { id: 1, title: 'Getting Started with Next.js 14', status: 'Published', views: 234 },
  { id: 2, title: 'React Best Practices 2024', status: 'Draft', views: 0 },
  { id: 3, title: 'TypeScript Tips & Tricks', status: 'Published', views: 156 }
];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="pt-16 min-h-screen bg-muted/30">
      <SidebarProvider>
        <div className="flex">
          <Sidebar className="w-64">
            <SidebarHeader>
              <div className="p-4">
                <h2 className="text-primary">Dashboard</h2>
                <p className="text-muted-foreground text-sm">Content Management</p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div>
                    <h1 className="text-primary">Welcome back, John!</h1>
                    <p className="text-muted-foreground">Here's what's happening with your portfolio.</p>
                  </div>
                </div>
                <Button onClick={() => onNavigate('home')}>
                  <Globe className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </div>

              {activeSection === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardStats.map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-muted-foreground text-sm">{stat.title}</p>
                                <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                                <p className="text-green-600 text-sm">{stat.change}</p>
                              </div>
                              <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Projects</CardTitle>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          New Project
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {recentProjects.map((project) => (
                          <div key={project.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div>
                              <p className="font-medium">{project.title}</p>
                              <p className="text-muted-foreground text-sm">{project.lastUpdated}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                                {project.status}
                              </Badge>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Blog Posts</CardTitle>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          New Post
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {recentPosts.map((post) => (
                          <div key={post.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div>
                              <p className="font-medium">{post.title}</p>
                              <p className="text-muted-foreground text-sm">{post.views} views</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                                {post.status}
                              </Badge>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeSection === 'projects' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-primary">Manage Projects</h2>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Project
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Input placeholder="Search projects..." className="flex-1" />
                          <Button variant="outline">Filter</Button>
                        </div>
                        
                        <div className="space-y-3">
                          {recentProjects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <FolderOpen className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{project.title}</p>
                                  <p className="text-muted-foreground text-sm">Last updated {project.lastUpdated}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={project.status === 'Published' ? 'default' : 'secondary'}>
                                  {project.status}
                                </Badge>
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeSection === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h2 className="text-primary">Profile Settings</h2>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <Input defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input defaultValue="john@example.com" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Job Title</label>
                          <Input defaultValue="Full-Stack Developer & Designer" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <Input defaultValue="San Francisco, CA" />
                        </div>
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}