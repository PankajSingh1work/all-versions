import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Plus, Trash2, Save, Search, Eye, Code, Palette, Globe, Settings, Database, Smartphone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Service data interface
interface ServiceData {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  image_url: string;
  category: string;
  status: string;
  featured: boolean;
  features: string[];
  tools: string[];
  duration: string;
  availability: string;
}

interface AddServicePageProps {
  onNavigate: (page: string) => void;
  onSave: (serviceData: ServiceData) => Promise<void>;
  onSearchImage: (query: string) => Promise<string>;
}

const categoryIcons: Record<string, any> = {
  'Web Development': Globe,
  'Mobile Development': Smartphone,
  'UI/UX Design': Palette,
  'Backend Development': Database,
  'DevOps': Settings,
  'Custom Development': Code
};

export function AddServicePage({ onNavigate, onSave, onSearchImage }: AddServicePageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Basic service information
  const [serviceData, setServiceData] = useState<ServiceData>({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    image_url: '',
    category: 'Web Development',
    status: 'available',
    featured: false,
    features: [],
    tools: [],
    duration: '',
    availability: 'Available'
  });

  // Form states for adding items
  const [newFeature, setNewFeature] = useState('');
  const [newTool, setNewTool] = useState('');

  const handleInputChange = (field: keyof ServiceData, value: any) => {
    setServiceData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setServiceData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageSearch = async () => {
    if (!serviceData.title) {
      toast.error('Please enter a service title first to search for relevant images');
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await onSearchImage(`${serviceData.title} ${serviceData.category} service`);
      setServiceData(prev => ({ ...prev, image_url: imageUrl }));
      toast.success('Service image found and set!');
    } catch (error) {
      toast.error('Failed to search for image');
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    if (!newFeature.trim()) {
      toast.error('Please enter a feature');
      return;
    }

    setServiceData(prev => ({
      ...prev,
      features: [...prev.features, newFeature.trim()]
    }));
    setNewFeature('');
    toast.success('Feature added');
  };

  const removeFeature = (index: number) => {
    setServiceData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
    toast.success('Feature removed');
  };

  const addTool = () => {
    if (!newTool.trim()) {
      toast.error('Please enter a tool or technology');
      return;
    }

    setServiceData(prev => ({
      ...prev,
      tools: [...prev.tools, newTool.trim()]
    }));
    setNewTool('');
    toast.success('Tool added');
  };

  const removeTool = (index: number) => {
    setServiceData(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }));
    toast.success('Tool removed');
  };



  const handleSave = async () => {
    // Validation
    if (!serviceData.title.trim()) {
      toast.error('Please enter a service title');
      return;
    }

    if (!serviceData.description.trim()) {
      toast.error('Please enter a service description');
      return;
    }

    if (!serviceData.long_description.trim()) {
      toast.error('Please enter a detailed description');
      return;
    }

    if (serviceData.features.length === 0) {
      toast.error('Please add at least one feature');
      return;
    }

    try {
      setIsLoading(true);
      await onSave(serviceData);
      toast.success('Service created successfully!');
    } catch (error) {
      toast.error('Failed to create service');
      console.error('Error creating service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const IconComponent = categoryIcons[serviceData.category] || Globe;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('admin')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <h1 className="text-2xl text-primary">Add New Service</h1>
          </div>
          
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Creating...' : 'Create Service'}</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="features">Features & Tools</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="title">Service Title *</Label>
                          <Input
                            id="title"
                            value={serviceData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Custom Web Development"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="slug">URL Slug</Label>
                          <Input
                            id="slug"
                            value={serviceData.slug}
                            onChange={(e) => handleInputChange('slug', e.target.value)}
                            placeholder="auto-generated-from-title"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Short Description *</Label>
                        <Textarea
                          id="description"
                          value={serviceData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Brief description of the service..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="long_description">Detailed Description *</Label>
                        <Textarea
                          id="long_description"
                          value={serviceData.long_description}
                          onChange={(e) => handleInputChange('long_description', e.target.value)}
                          placeholder="Comprehensive description of the service, benefits, and what clients can expect..."
                          rows={6}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">Service Image</Label>
                        <div className="flex gap-2">
                          <Input
                            id="image"
                            value={serviceData.image_url}
                            onChange={(e) => handleInputChange('image_url', e.target.value)}
                            placeholder="Image URL or search for service image"
                          />
                          <Button 
                            variant="outline" 
                            onClick={handleImageSearch}
                            disabled={isLoading}
                            className="flex items-center space-x-2"
                          >
                            <Search className="w-4 h-4" />
                            <span>Search</span>
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            value={serviceData.category} 
                            onValueChange={(value) => handleInputChange('category', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Web Development">Web Development</SelectItem>
                              <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                              <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                              <SelectItem value="Backend Development">Backend Development</SelectItem>
                              <SelectItem value="DevOps">DevOps</SelectItem>
                              <SelectItem value="Custom Development">Custom Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select 
                            value={serviceData.status} 
                            onValueChange={(value) => handleInputChange('status', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="limited">Limited Availability</SelectItem>
                              <SelectItem value="booked">Currently Booked</SelectItem>
                              <SelectItem value="paused">Temporarily Paused</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Typical Duration</Label>
                          <Input
                            id="duration"
                            value={serviceData.duration}
                            onChange={(e) => handleInputChange('duration', e.target.value)}
                            placeholder="e.g., 4-6 weeks"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="availability">Availability</Label>
                          <Input
                            id="availability"
                            value={serviceData.availability}
                            onChange={(e) => handleInputChange('availability', e.target.value)}
                            placeholder="e.g., Available, Booking for Q2 2024"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={serviceData.featured}
                          onCheckedChange={(checked) => handleInputChange('featured', checked)}
                        />
                        <Label>Feature this service</Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Features & Tools Tab */}
                <TabsContent value="features" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Features & Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="font-medium">Add Features</h3>
                        <div className="flex gap-2">
                          <Input
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            placeholder="e.g., Responsive design, SEO optimization"
                            onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                          />
                          <Button onClick={addFeature} className="flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {serviceData.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <span>{feature}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFeature(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {serviceData.features.length === 0 && (
                          <p className="text-muted-foreground text-center py-8">
                            No features added yet. Add features to highlight what this service includes.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tools & Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="font-medium">Add Tools/Technologies</h3>
                        <div className="flex gap-2">
                          <Input
                            value={newTool}
                            onChange={(e) => setNewTool(e.target.value)}
                            placeholder="e.g., React, Node.js, PostgreSQL"
                            onKeyPress={(e) => e.key === 'Enter' && addTool()}
                          />
                          <Button onClick={addTool} className="flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {serviceData.tools.map((tool, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => removeTool(index)}
                          >
                            <span>{tool}</span>
                            <Trash2 className="w-3 h-3" />
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="sticky top-24"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Service Preview Card */}
                  <div className="border rounded-lg overflow-hidden">
                    {serviceData.image_url && (
                      <div className="aspect-video">
                        <ImageWithFallback
                          src={serviceData.image_url}
                          alt={serviceData.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <Badge variant="secondary">{serviceData.category}</Badge>
                        {serviceData.featured && (
                          <Badge variant="default">Featured</Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg text-primary">
                        {serviceData.title || 'Service Title'}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground">
                        {serviceData.description || 'Service description will appear here...'}
                      </p>

                      {serviceData.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm">Key Features:</h4>
                          <div className="space-y-1">
                            {serviceData.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="text-xs text-muted-foreground flex items-center space-x-1">
                                <span>•</span>
                                <span>{feature}</span>
                              </div>
                            ))}
                            {serviceData.features.length > 3 && (
                              <p className="text-xs text-muted-foreground">+ {serviceData.features.length - 3} more</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-xs">
                          <span className="text-muted-foreground">Duration: </span>
                          <span>{serviceData.duration || 'TBD'}</span>
                        </div>
                        <Badge variant={
                          serviceData.status === 'available' ? 'default' :
                          serviceData.status === 'limited' ? 'secondary' :
                          serviceData.status === 'booked' ? 'destructive' : 'outline'
                        }>
                          {serviceData.status === 'available' ? 'Available' :
                           serviceData.status === 'limited' ? 'Limited' :
                           serviceData.status === 'booked' ? 'Booked' : 'Paused'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Features:</span>
                      <span>{serviceData.features.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tools:</span>
                      <span>{serviceData.tools.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Process Steps:</span>
                      <span>{serviceData.process_steps.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deliverables:</span>
                      <span>{serviceData.deliverables.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}