import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { ArrowLeft, Plus, Trash2, Upload, Save, X, Search, Image } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AddProjectPageProps {
  onNavigate: (page: string) => void;
  onSave: (projectData: any) => Promise<void>;
  onSearchImage?: (query: string) => Promise<string>;
}

interface ProjectImage {
  url: string;
  caption: string;
}

interface Feature {
  title: string;
  description: string;
}

interface Challenge {
  title: string;
  description: string;
  solution: string;
}

interface TechItem {
  name: string;
  category: string;
}

interface Testimonial {
  content: string;
  author: string;
  role: string;
  image: string;
}

export function AddProjectPage({ onNavigate, onSave, onSearchImage }: AddProjectPageProps) {
  // Basic project information
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'completed' | 'in-progress' | 'draft'>('draft');
  const [featured, setFeatured] = useState(false);
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  
  // Project metadata
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('');
  const [year, setYear] = useState('');
  
  // Images
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState<ProjectImage[]>([]);
  
  // Tech stack
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [newTechName, setNewTechName] = useState('');
  const [newTechCategory, setNewTechCategory] = useState('');
  
  // Features
  const [features, setFeatures] = useState<Feature[]>([]);
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');
  
  // Challenges & Solutions
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [newChallengeTitle, setNewChallengeTitle] = useState('');
  const [newChallengeDescription, setNewChallengeDescription] = useState('');
  const [newChallengeSolution, setNewChallengeSolution] = useState('');
  
  // Results
  const [results, setResults] = useState<string[]>([]);
  const [newResult, setNewResult] = useState('');
  
  // Architecture description
  const [architectureDescription, setArchitectureDescription] = useState('');
  
  // Testimonial
  const [testimonial, setTestimonial] = useState<Testimonial>({
    content: '',
    author: '',
    role: '',
    image: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Image search states
  const [imageSearchQuery, setImageSearchQuery] = useState('');
  const [isSearchingImage, setIsSearchingImage] = useState(false);

  // Helper functions for managing arrays
  const addTechStack = () => {
    if (newTechName.trim() && newTechCategory.trim()) {
      setTechStack([...techStack, { name: newTechName.trim(), category: newTechCategory.trim() }]);
      setNewTechName('');
      setNewTechCategory('');
    }
  };

  const removeTechStack = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeatureTitle.trim() && newFeatureDescription.trim()) {
      setFeatures([...features, { title: newFeatureTitle.trim(), description: newFeatureDescription.trim() }]);
      setNewFeatureTitle('');
      setNewFeatureDescription('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addChallenge = () => {
    if (newChallengeTitle.trim() && newChallengeDescription.trim() && newChallengeSolution.trim()) {
      setChallenges([...challenges, { 
        title: newChallengeTitle.trim(), 
        description: newChallengeDescription.trim(), 
        solution: newChallengeSolution.trim() 
      }]);
      setNewChallengeTitle('');
      setNewChallengeDescription('');
      setNewChallengeSolution('');
    }
  };

  const removeChallenge = (index: number) => {
    setChallenges(challenges.filter((_, i) => i !== index));
  };

  const addResult = () => {
    if (newResult.trim()) {
      setResults([...results, newResult.trim()]);
      setNewResult('');
    }
  };

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const addGalleryImage = () => {
    setGalleryImages([...galleryImages, { url: '', caption: '' }]);
  };

  const updateGalleryImage = (index: number, field: 'url' | 'caption', value: string) => {
    const updatedImages = galleryImages.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    );
    setGalleryImages(updatedImages);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const searchImage = async () => {
    if (!imageSearchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setIsSearchingImage(true);
    try {
      // For now, we'll provide helpful suggestions for common project types
      // In a real implementation, you could integrate with Unsplash API
      const suggestions: Record<string, string> = {
        'dashboard': 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTY2MzkzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'web': 'https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'api': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'app': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
      };

      const query = imageSearchQuery.toLowerCase();
      let foundImage = '';
      
      for (const [key, url] of Object.entries(suggestions)) {
        if (query.includes(key)) {
          foundImage = url;
          break;
        }
      }
      
      if (!foundImage) {
        // Default to a professional tech image
        foundImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
      }
      
      setMainImageUrl(foundImage);
      toast.success('Image found and set as main image');
    } catch (error) {
      toast.error('Failed to search for images');
      console.error('Image search error:', error);
    } finally {
      setIsSearchingImage(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      toast.error('Project title is required');
      return;
    }
    if (!description.trim()) {
      toast.error('Project description is required');
      return;
    }
    if (!category.trim()) {
      toast.error('Project category is required');
      return;
    }
    if (!mainImageUrl.trim()) {
      toast.error('Main project image is required');
      return;
    }

    setIsLoading(true);
    
    try {
      const projectData = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        long_description: longDescription.trim(),
        image_url: mainImageUrl.trim(),
        demo_url: demoUrl.trim() || undefined,
        github_url: githubUrl.trim() || undefined,
        tech_stack: techStack.map(tech => tech.name),
        category: category.trim(),
        status,
        featured,
        slug: generateSlug(title),
        // Extended fields for detailed view (these would be stored as JSON in long_description or separate fields)
        project_metadata: {
          client: client.trim(),
          duration: duration.trim(),
          year: year.trim(),
          subtitle: subtitle.trim(),
          images: [
            { url: mainImageUrl.trim(), caption: 'Main project image' },
            ...galleryImages.filter(img => img.url.trim() && img.caption.trim())
          ],
          tech_stack_detailed: techStack,
          features,
          challenges,
          results,
          architecture_description: architectureDescription.trim(),
          testimonial: testimonial.content.trim() ? testimonial : undefined
        }
      };

      await onSave(projectData);
      toast.success('Project saved successfully!');
      onNavigate('admin');
    } catch (error) {
      toast.error('Failed to save project');
      console.error('Error saving project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate('admin')}
              className="group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl text-primary">Add New Project</h1>
              <p className="text-sm text-muted-foreground">Create a comprehensive project with all details</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onNavigate('admin')}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Project'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Basic Information</CardTitle>
                <CardDescription>Essential project details and overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter project title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Brief project subtitle"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief project description (will be shown in project cards)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Full Description</Label>
                  <Textarea
                    id="longDescription"
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    placeholder="Detailed project description (multiple paragraphs supported)"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Web Application">Web Application</SelectItem>
                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                        <SelectItem value="Desktop App">Desktop App</SelectItem>
                        <SelectItem value="API">API</SelectItem>
                        <SelectItem value="Library">Library</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Dashboard">Dashboard</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(value: 'completed' | 'in-progress' | 'draft') => setStatus(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="featured"
                      checked={featured}
                      onCheckedChange={setFeatured}
                    />
                    <Label htmlFor="featured">Featured Project</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Project Metadata</CardTitle>
                <CardDescription>Additional project details and context</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="Client or company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 3 months"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g., 2024"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="demoUrl">Demo URL</Label>
                    <Input
                      id="demoUrl"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://your-demo-url.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Project Images</CardTitle>
                <CardDescription>Main image and gallery images for the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="mainImageUrl">Main Image URL *</Label>
                  
                  {/* Image Search */}
                  <div className="p-4 border border-dashed border-border rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <Image className="h-4 w-4 text-muted-foreground" />
                      <Label className="text-sm font-medium">Search for Image</Label>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={imageSearchQuery}
                        onChange={(e) => setImageSearchQuery(e.target.value)}
                        placeholder="e.g., web dashboard, mobile app, analytics"
                        onKeyPress={(e) => e.key === 'Enter' && searchImage()}
                      />
                      <Button 
                        type="button"
                        onClick={searchImage} 
                        disabled={isSearchingImage}
                        variant="outline"
                      >
                        {isSearchingImage ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Search for professional stock images that will be used as the main project image
                    </p>
                  </div>

                  {/* Manual URL Input */}
                  <div>
                    <Label htmlFor="mainImageUrl" className="text-sm text-muted-foreground">Or enter image URL manually</Label>
                    <Input
                      id="mainImageUrl"
                      value={mainImageUrl}
                      onChange={(e) => setMainImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... or your image URL"
                      className="mt-1"
                    />
                  </div>
                  
                  {/* Image Preview */}
                  {mainImageUrl && (
                    <div className="mt-4">
                      <Label className="text-sm text-muted-foreground mb-2 block">Preview</Label>
                      <img 
                        src={mainImageUrl} 
                        alt="Preview" 
                        className="w-full max-w-md h-48 object-cover rounded-lg border shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          toast.error('Failed to load image. Please check the URL.');
                        }}
                      />
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Gallery Images</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addGalleryImage}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Image
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <Label>Gallery Image #{index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGalleryImage(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input
                            value={image.url}
                            onChange={(e) => updateGalleryImage(index, 'url', e.target.value)}
                            placeholder="Image URL"
                          />
                          <Input
                            value={image.caption}
                            onChange={(e) => updateGalleryImage(index, 'caption', e.target.value)}
                            placeholder="Image caption"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Architecture Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Architecture & Approach</CardTitle>
                <CardDescription>Technical architecture and development approach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="architectureDescription">Architecture Description</Label>
                  <Textarea
                    id="architectureDescription"
                    value={architectureDescription}
                    onChange={(e) => setArchitectureDescription(e.target.value)}
                    placeholder="Describe the technical architecture, design patterns, and development approach used in this project..."
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Dynamic Sections */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Technology Stack</CardTitle>
                <CardDescription>Technologies used in this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    value={newTechName}
                    onChange={(e) => setNewTechName(e.target.value)}
                    placeholder="Technology name (e.g., React)"
                  />
                  <Input
                    value={newTechCategory}
                    onChange={(e) => setNewTechCategory(e.target.value)}
                    placeholder="Category (e.g., Frontend)"
                  />
                  <Button onClick={addTechStack} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Technology
                  </Button>
                </div>
                
                {techStack.length > 0 && (
                  <div className="space-y-2">
                    {techStack.map((tech, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                        <div>
                          <span className="font-medium">{tech.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">({tech.category})</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTechStack(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Key Features</CardTitle>
                <CardDescription>Main features and capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Input
                    value={newFeatureTitle}
                    onChange={(e) => setNewFeatureTitle(e.target.value)}
                    placeholder="Feature title"
                  />
                  <Textarea
                    value={newFeatureDescription}
                    onChange={(e) => setNewFeatureDescription(e.target.value)}
                    placeholder="Feature description"
                    rows={2}
                  />
                  <Button onClick={addFeature} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>

                {features.length > 0 && (
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="p-3 border border-border rounded">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{feature.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(index)}
                            className="text-destructive hover:text-destructive ml-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Challenges & Solutions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Challenges & Solutions</CardTitle>
                <CardDescription>Problems faced and how you solved them</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Input
                    value={newChallengeTitle}
                    onChange={(e) => setNewChallengeTitle(e.target.value)}
                    placeholder="Challenge title"
                  />
                  <Textarea
                    value={newChallengeDescription}
                    onChange={(e) => setNewChallengeDescription(e.target.value)}
                    placeholder="Describe the challenge"
                    rows={2}
                  />
                  <Textarea
                    value={newChallengeSolution}
                    onChange={(e) => setNewChallengeSolution(e.target.value)}
                    placeholder="How you solved it"
                    rows={2}
                  />
                  <Button onClick={addChallenge} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Challenge
                  </Button>
                </div>

                {challenges.length > 0 && (
                  <div className="space-y-3">
                    {challenges.map((challenge, index) => (
                      <div key={index} className="p-3 border border-border rounded">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium">{challenge.title}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeChallenge(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                        <div className="border-l-4 border-secondary pl-3">
                          <p className="text-sm font-medium text-secondary">Solution:</p>
                          <p className="text-sm text-muted-foreground">{challenge.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Project Results</CardTitle>
                <CardDescription>Outcomes and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    placeholder="e.g., Improved performance by 50%"
                    className="flex-1"
                  />
                  <Button onClick={addResult} variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {results.length > 0 && (
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                        <span className="text-sm">{result}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResult(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Client Testimonial */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Client Testimonial</CardTitle>
                <CardDescription>Optional client feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={testimonial.content}
                  onChange={(e) => setTestimonial({ ...testimonial, content: e.target.value })}
                  placeholder="Client testimonial or feedback"
                  rows={3}
                />
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    value={testimonial.author}
                    onChange={(e) => setTestimonial({ ...testimonial, author: e.target.value })}
                    placeholder="Client name"
                  />
                  <Input
                    value={testimonial.role}
                    onChange={(e) => setTestimonial({ ...testimonial, role: e.target.value })}
                    placeholder="Client role/title"
                  />
                  <Input
                    value={testimonial.image}
                    onChange={(e) => setTestimonial({ ...testimonial, image: e.target.value })}
                    placeholder="Client image URL (optional)"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-8 border-t border-border">
          <Button variant="outline" onClick={() => onNavigate('admin')}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save Project'}
          </Button>
        </div>
      </div>
    </div>
  );
}