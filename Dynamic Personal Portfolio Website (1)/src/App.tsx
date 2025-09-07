import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { ProjectsPage } from './components/ProjectsPage';
import { CertificationsPage } from './components/CertificationsPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { CertificationDetailPage } from './components/CertificationDetailPage';
import { BlogDetailPage } from './components/BlogDetailPage';
import { Dashboard } from './components/Dashboard';
import { AdminPage } from './components/AdminPage';
import { AddProjectPage } from './components/AddProjectPage';
import { AddCertificatePage } from './components/AddCertificatePage';
import { AddBlogPage } from './components/AddBlogPage';
import { AddServicePage } from './components/AddServicePage';
import { UpdateAboutPage } from './components/UpdateAboutPage';
import { Toaster } from './components/ui/sonner';
import { projectsApi, certificationsApi, blogApi, aboutApi, servicesApi } from './lib/supabase';

type Page = 'home' | 'about' | 'services' | 'projects' | 'certifications' | 'blog' | 'contact' | 'dashboard' | 'admin' | 'add-project' | 'add-certificate' | 'add-blog' | 'add-service' | 'update-about' | 'project-detail' | 'certification-detail' | 'blog-detail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProject = async (projectData: any) => {
    try {
      // Extract the basic project data for the API
      const basicProjectData = {
        title: projectData.title,
        description: projectData.description,
        long_description: projectData.long_description || projectData.description,
        image_url: projectData.image_url,
        demo_url: projectData.demo_url,
        github_url: projectData.github_url,
        tech_stack: projectData.tech_stack || [],
        category: projectData.category,
        status: projectData.status,
        featured: projectData.featured,
        slug: projectData.slug
      };

      await projectsApi.create(basicProjectData);
      
      // Navigate back to admin dashboard
      setCurrentPage('admin');
    } catch (error) {
      throw error; // Re-throw to let AddProjectPage handle the error
    }
  };

  const handleSaveCertificate = async (certificateData: any) => {
    try {
      // Map the detailed certificate data to the API structure
      const basicCertificateData = {
        title: certificateData.title,
        issuer: certificateData.issuer,
        description: certificateData.description,
        issue_date: certificateData.date,
        expiry_date: certificateData.validUntil,
        credential_id: certificateData.credentialId,
        credential_url: certificateData.verificationUrl,
        status: certificateData.status.toLowerCase() === 'valid' ? 'valid' : 'expired'
      };

      await certificationsApi.create(basicCertificateData);
      
      // Navigate back to admin dashboard
      setCurrentPage('admin');
    } catch (error) {
      throw error; // Re-throw to let AddCertificatePage handle the error
    }
  };

  const handleSaveBlog = async (blogData: any) => {
    try {
      // Map the detailed blog data to the API structure
      const basicBlogData = {
        title: blogData.title,
        slug: blogData.slug,
        excerpt: blogData.excerpt,
        content: JSON.stringify(blogData.content), // Serialize the content blocks
        featured_image: blogData.image,
        category: blogData.category,
        published: true,
        published_at: blogData.publishDate,
        tags: blogData.tags
      };

      await blogApi.create(basicBlogData);
      
      // Navigate back to admin dashboard
      setCurrentPage('admin');
    } catch (error) {
      throw error; // Re-throw to let AddBlogPage handle the error
    }
  };

  const handleSaveService = async (serviceData: any) => {
    try {
      // Map the detailed service data to the API structure
      const basicServiceData = {
        title: serviceData.title,
        slug: serviceData.slug,
        description: serviceData.description,
        long_description: serviceData.long_description,
        image_url: serviceData.image_url,
        category: serviceData.category,
        status: serviceData.status,
        featured: serviceData.featured,
        features: serviceData.features,
        tools: serviceData.tools,
        duration: serviceData.duration,
        availability: serviceData.availability
      };

      await servicesApi.create(basicServiceData);
      
      // Navigate back to admin dashboard
      setCurrentPage('admin');
    } catch (error) {
      throw error; // Re-throw to let AddServicePage handle the error
    }
  };

  const handleSaveAbout = async (aboutData: any) => {
    try {
      // Map the form data to the API structure
      const apiData = {
        personal_info: aboutData.personalInfo,
        skills: aboutData.skills,
        experience: aboutData.experience,
        education: aboutData.education,
        updated_at: new Date().toISOString()
      };

      await aboutApi.update(apiData);
      
      // Navigate back to admin dashboard
      setCurrentPage('admin');
    } catch (error) {
      throw error; // Re-throw to let UpdateAboutPage handle the error
    }
  };

  const handleSearchImage = async (query: string): Promise<string> => {
    try {
      // Enhanced image suggestions based on search query keywords
      const imageMapping: Record<string, string> = {
        // Project types
        'dashboard': 'https://images.unsplash.com/photo-1676731820390-a119efe23333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY2ODQ5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'mobile app': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'web development': 'https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'api': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'desktop': 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'code': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        
        // Certifications and learning
        'aws': 'https://images.unsplash.com/photo-1608657803991-b62ca5de7a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd3MlMjBjbG91ZCUyMGNlcnRpZmljYXRpb258ZW58MXx8fHwxNzU2ODAxMzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'amazon': 'https://images.unsplash.com/photo-1608657803991-b62ca5de7a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd3MlMjBjbG91ZCUyMGNlcnRpZmljYXRpb258ZW58MXx8fHwxNzU2ODAxMzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'cloud': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'microsoft': 'https://images.unsplash.com/photo-1660032356057-efd3e1eb045c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3NvZnQlMjBhenVyZSUyMGxvZ298ZW58MXx8fHwxNzU2ODAxMzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'azure': 'https://images.unsplash.com/photo-1660032356057-efd3e1eb045c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3NvZnQlMjBhenVyZSUyMGxvZ298ZW58MXx8fHwxNzU2ODAxMzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'google': 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'security': 'https://images.unsplash.com/photo-1724219616919-aab943e7b00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2hpZWxkfGVufDF8fHx8MTc1NjgwMTM1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'cybersecurity': 'https://images.unsplash.com/photo-1724219616919-aab943e7b00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2hpZWxkfGVufDF8fHx8MTc1NjgwMTM1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'certificate': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'certification': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'logo': 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        
        // Blog and content
        'blog': 'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGJsb2clMjBhcnRpY2xlfGVufDF8fHx8MTc1NjgwMTMzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'article': 'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGJsb2clMjBhcnRpY2xlfGVufDF8fHx8MTc1NjgwMTMzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'writing': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'tutorial': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'guide': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'react': 'https://images.unsplash.com/photo-1670057046254-3b5095eb4b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGphdmFzY3JpcHQlMjBjb2RlfGVufDF8fHx8MTc1NjcyODMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        
        // Services
        'service': 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'consulting': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'design': 'https://images.unsplash.com/photo-1550335865-16a340d45467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'mobile': 'https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'backend': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'devops': 'https://images.unsplash.com/photo-1608657803991-b62ca5de7a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'javascript': 'https://images.unsplash.com/photo-1670057046254-3b5095eb4b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGphdmFzY3JpcHQlMjBjb2RlfGVufDF8fHx8MTc1NjcyODMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'typescript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'next.js': 'https://images.unsplash.com/photo-1670057046254-3b5095eb4b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGphdmFzY3JpcHQlMjBjb2RlfGVufDF8fHx8MTc1NjcyODMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'node.js': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        
        // Professional and avatars
        'professional': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTY3OTg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'headshot': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTY3OTg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'avatar': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTY3OTg4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        
        // Technology and development
        'technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'programming': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'software': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'development': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'computer': 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'laptop': 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
      };

      const queryLower = query.toLowerCase();
      
      // Check for exact matches or partial matches
      for (const [key, url] of Object.entries(imageMapping)) {
        if (queryLower.includes(key)) {
          return url;
        }
      }
      
      // If no specific match found, return a general tech/development image
      return 'https://images.unsplash.com/photo-1676731820390-a119efe23333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY2ODQ5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    } catch (error) {
      console.warn('Image search failed, using fallback:', error);
      return 'https://images.unsplash.com/photo-1676731820390-a119efe23333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY2ODQ5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage />;
      case 'dashboard':
        return <AdminPage onNavigate={handleNavigation} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigation} />;
      case 'add-project':
        return <AddProjectPage onNavigate={handleNavigation} onSave={handleSaveProject} onSearchImage={handleSearchImage} />;
      case 'add-certificate':
        return <AddCertificatePage onNavigate={handleNavigation} onSave={handleSaveCertificate} onSearchImage={handleSearchImage} />;
      case 'add-blog':
        return <AddBlogPage onNavigate={handleNavigation} onSave={handleSaveBlog} onSearchImage={handleSearchImage} />;
      case 'add-service':
        return <AddServicePage onNavigate={handleNavigation} onSave={handleSaveService} onSearchImage={handleSearchImage} />;
      case 'update-about':
        return <UpdateAboutPage onNavigate={handleNavigation} onSave={handleSaveAbout} onSearchImage={handleSearchImage} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigation} />;
      case 'projects':
        return <ProjectsPage onNavigate={handleNavigation} />;
      case 'certifications':
        return <CertificationsPage onNavigate={handleNavigation} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigation} />;
      case 'contact':
        return <ContactPage />;
      case 'project-detail':
        return <ProjectDetailPage onNavigate={handleNavigation} />;
      case 'certification-detail':
        return <CertificationDetailPage onNavigate={handleNavigation} />;
      case 'blog-detail':
        return <BlogDetailPage onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  const showNavAndFooter = currentPage !== 'dashboard' && currentPage !== 'admin' && currentPage !== 'add-project' && currentPage !== 'add-certificate' && currentPage !== 'add-blog' && currentPage !== 'add-service' && currentPage !== 'update-about';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showNavAndFooter && (
        <NavBar
          currentPage={currentPage}
          onNavigate={handleNavigation}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {showNavAndFooter && <Footer onNavigate={handleNavigation} />}
      
      <Toaster />
    </div>
  );
}