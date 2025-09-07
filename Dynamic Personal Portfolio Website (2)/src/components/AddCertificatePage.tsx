import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus, 
  X, 
  Image as ImageIcon,
  Calendar,
  Award,
  Shield,
  Clock,
  Target,
  BookOpen,
  Users,
  Globe
} from 'lucide-react';

interface CertificateFormData {
  title: string;
  subtitle: string;
  issuer: string;
  description: string;
  fullDescription: string;
  category: string;
  level: string;
  status: string;
  date: string;
  validUntil: string;
  credentialId: string;
  verificationUrl: string;
  certificateUrl: string;
  featured: boolean;
  logo: string;
  skills: Array<{ name: string; proficiency: number }>;
  examDetails: {
    duration: string;
    questions: string;
    format: string;
    passingScore: string;
    cost: string;
    languages: string[];
  };
  domains: Array<{
    name: string;
    weight: string;
    description: string;
    topics: string[];
  }>;
  preparationPath: Array<{
    step: string;
    description: string;
    completed: boolean;
  }>;
  relatedCertifications: Array<{
    title: string;
    status: string;
    description: string;
  }>;
  projects: string[];
  benefits: string[];
  slug: string;
}

interface AddCertificatePageProps {
  onNavigate: (page: string) => void;
  onSave: (certificateData: CertificateFormData) => Promise<void>;
  onSearchImage: (query: string) => Promise<string>;
}

export function AddCertificatePage({ onNavigate, onSave, onSearchImage }: AddCertificatePageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');
  const [currentSkillName, setCurrentSkillName] = useState('');
  const [currentSkillProficiency, setCurrentSkillProficiency] = useState('');

  const [formData, setFormData] = useState<CertificateFormData>({
    title: '',
    subtitle: '',
    issuer: '',
    description: '',
    fullDescription: '',
    category: '',
    level: '',
    status: 'Valid',
    date: '',
    validUntil: '',
    credentialId: '',
    verificationUrl: '',
    certificateUrl: '',
    featured: false,
    logo: '',
    skills: [],
    examDetails: {
      duration: '',
      questions: '',
      format: '',
      passingScore: '',
      cost: '',
      languages: []
    },
    domains: [],
    preparationPath: [],
    relatedCertifications: [],
    projects: [],
    benefits: [],
    slug: ''
  });

  const categories = [
    'Cloud Computing',
    'Web Development',
    'Data Science',
    'Cybersecurity',
    'Mobile Development',
    'DevOps',
    'AI/Machine Learning',
    'Database',
    'Project Management',
    'Other'
  ];

  const levels = [
    'Foundational',
    'Associate',
    'Professional',
    'Expert',
    'Specialty'
  ];

  const statusOptions = [
    'Valid',
    'Expired',
    'In Progress',
    'Planned'
  ];

  const relatedStatusOptions = [
    'Earned',
    'In Progress', 
    'Planned',
    'Considering'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CertificateFormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSearchLogo = async () => {
    if (!formData.issuer) {
      toast.error('Please enter the issuer name first');
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await onSearchImage(`${formData.issuer} logo certification`);
      handleInputChange('logo', imageUrl);
      toast.success('Logo found and added');
    } catch (error) {
      toast.error('Failed to find logo');
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (currentSkillName && currentSkillProficiency) {
      const newSkill = {
        name: currentSkillName,
        proficiency: parseInt(currentSkillProficiency)
      };
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setCurrentSkillName('');
      setCurrentSkillProficiency('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    if (currentLanguage && !formData.examDetails.languages.includes(currentLanguage)) {
      handleInputChange('examDetails.languages', [...formData.examDetails.languages, currentLanguage]);
      setCurrentLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    handleInputChange('examDetails.languages', 
      formData.examDetails.languages.filter(lang => lang !== language)
    );
  };

  const addDomain = () => {
    const newDomain = {
      name: '',
      weight: '',
      description: '',
      topics: []
    };
    setFormData(prev => ({
      ...prev,
      domains: [...prev.domains, newDomain]
    }));
  };

  const updateDomain = (index: number, field: string, value: any) => {
    const updatedDomains = [...formData.domains];
    updatedDomains[index] = {
      ...updatedDomains[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, domains: updatedDomains }));
  };

  const addTopicToDomain = (domainIndex: number) => {
    if (currentTopic) {
      const updatedDomains = [...formData.domains];
      updatedDomains[domainIndex].topics = [...updatedDomains[domainIndex].topics, currentTopic];
      setFormData(prev => ({ ...prev, domains: updatedDomains }));
      setCurrentTopic('');
    }
  };

  const removeTopicFromDomain = (domainIndex: number, topicIndex: number) => {
    const updatedDomains = [...formData.domains];
    updatedDomains[domainIndex].topics = updatedDomains[domainIndex].topics.filter((_, i) => i !== topicIndex);
    setFormData(prev => ({ ...prev, domains: updatedDomains }));
  };

  const removeDomain = (index: number) => {
    setFormData(prev => ({
      ...prev,
      domains: prev.domains.filter((_, i) => i !== index)
    }));
  };

  const addPreparationStep = () => {
    const newStep = {
      step: '',
      description: '',
      completed: false
    };
    setFormData(prev => ({
      ...prev,
      preparationPath: [...prev.preparationPath, newStep]
    }));
  };

  const updatePreparationStep = (index: number, field: string, value: any) => {
    const updatedPath = [...formData.preparationPath];
    updatedPath[index] = {
      ...updatedPath[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, preparationPath: updatedPath }));
  };

  const removePreparationStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      preparationPath: prev.preparationPath.filter((_, i) => i !== index)
    }));
  };

  const addRelatedCertification = () => {
    const newCert = {
      title: '',
      status: 'Planned',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      relatedCertifications: [...prev.relatedCertifications, newCert]
    }));
  };

  const updateRelatedCertification = (index: number, field: string, value: any) => {
    const updatedCerts = [...formData.relatedCertifications];
    updatedCerts[index] = {
      ...updatedCerts[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, relatedCertifications: updatedCerts }));
  };

  const removeRelatedCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      relatedCertifications: prev.relatedCertifications.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    if (currentProject) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, currentProject]
      }));
      setCurrentProject('');
    }
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (currentBenefit) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, currentBenefit]
      }));
      setCurrentBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.title || !formData.issuer || !formData.description) {
      toast.error('Please fill in all required fields (Title, Issuer, Description)');
      return;
    }

    try {
      setIsLoading(true);
      await onSave(formData);
      toast.success('Certificate saved successfully!');
    } catch (error) {
      toast.error('Failed to save certificate');
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-background">
        {/* Preview Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setPreviewMode(false)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Edit
              </Button>
              <h2 className="text-primary">Certificate Preview</h2>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Certificate'}
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {formData.logo && (
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-white shadow-lg">
                      <ImageWithFallback
                        src={formData.logo}
                        alt={formData.issuer}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h1 className="text-primary mb-2">{formData.title || 'Certificate Title'}</h1>
                    <p className="text-xl text-secondary mb-4">{formData.subtitle}</p>
                    <p className="text-muted-foreground">{formData.issuer}</p>
                  </div>
                  {formData.description && (
                    <p className="text-muted-foreground max-w-2xl mx-auto">{formData.description}</p>
                  )}
                  <div className="flex flex-wrap justify-center gap-2">
                    {formData.category && <Badge variant="outline">{formData.category}</Badge>}
                    {formData.level && <Badge variant="outline">{formData.level}</Badge>}
                    {formData.status && <Badge variant="outline">{formData.status}</Badge>}
                    {formData.featured && <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => onNavigate('admin')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-primary">Add New Certificate</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setPreviewMode(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Certificate'}
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Certificate Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., AWS Solutions Architect Professional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="e.g., Advanced Cloud Architecture Certification"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuer *</Label>
                  <Input
                    id="issuer"
                    value={formData.issuer}
                    onChange={(e) => handleInputChange('issuer', e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input
                    id="credentialId"
                    value={formData.credentialId}
                    onChange={(e) => handleInputChange('credentialId', e.target.value)}
                    placeholder="e.g., AWS-SAP-123456"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the certification..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                  placeholder="Detailed description of the certification..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="auto-generated-from-title"
                />
              </div>
            </CardContent>
          </Card>

          {/* Certificate Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Certificate Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date Earned</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => handleInputChange('validUntil', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="verificationUrl">Verification URL</Label>
                  <Input
                    id="verificationUrl"
                    value={formData.verificationUrl}
                    onChange={(e) => handleInputChange('verificationUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateUrl">Certificate URL</Label>
                  <Input
                    id="certificateUrl"
                    value={formData.certificateUrl}
                    onChange={(e) => handleInputChange('certificateUrl', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Certificate</Label>
              </div>
            </CardContent>
          </Card>

          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Certificate Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Input
                  value={formData.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  placeholder="Logo URL or use search button"
                  className="flex-1"
                />
                <Button onClick={handleSearchLogo} disabled={isLoading || !formData.issuer}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {isLoading ? 'Searching...' : 'Search Logo'}
                </Button>
              </div>
              {formData.logo && (
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={formData.logo}
                    alt="Certificate logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Skills & Competencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-end space-x-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    value={currentSkillName}
                    onChange={(e) => setCurrentSkillName(e.target.value)}
                    placeholder="e.g., Cloud Architecture"
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Label htmlFor="proficiency">Proficiency %</Label>
                  <Input
                    id="proficiency"
                    type="number"
                    min="0"
                    max="100"
                    value={currentSkillProficiency}
                    onChange={(e) => setCurrentSkillProficiency(e.target.value)}
                    placeholder="95"
                  />
                </div>
                <Button onClick={addSkill} disabled={!currentSkillName || !currentSkillProficiency}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>

              {formData.skills.length > 0 && (
                <div className="space-y-3">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                        className="ml-4"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Exam Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Exam Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.examDetails.duration}
                    onChange={(e) => handleInputChange('examDetails.duration', e.target.value)}
                    placeholder="e.g., 170 minutes"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="questions">Number of Questions</Label>
                  <Input
                    id="questions"
                    value={formData.examDetails.questions}
                    onChange={(e) => handleInputChange('examDetails.questions', e.target.value)}
                    placeholder="e.g., 75 questions"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Input
                    id="format"
                    value={formData.examDetails.format}
                    onChange={(e) => handleInputChange('examDetails.format', e.target.value)}
                    placeholder="e.g., Multiple choice and multiple response"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingScore">Passing Score</Label>
                  <Input
                    id="passingScore"
                    value={formData.examDetails.passingScore}
                    onChange={(e) => handleInputChange('examDetails.passingScore', e.target.value)}
                    placeholder="e.g., 750/1000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Cost</Label>
                <Input
                  id="cost"
                  value={formData.examDetails.cost}
                  onChange={(e) => handleInputChange('examDetails.cost', e.target.value)}
                  placeholder="e.g., $300 USD"
                />
              </div>

              <div className="space-y-4">
                <Label>Available Languages</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    placeholder="e.g., English"
                    className="flex-1"
                  />
                  <Button onClick={addLanguage} disabled={!currentLanguage}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                {formData.examDetails.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.examDetails.languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        {language}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeLanguage(language)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Exam Domains */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary flex items-center justify-between">
                Exam Domains
                <Button onClick={addDomain} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Domain
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.domains.map((domain, domainIndex) => (
                <div key={domainIndex} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Domain {domainIndex + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDomain(domainIndex)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Domain Name</Label>
                      <Input
                        value={domain.name}
                        onChange={(e) => updateDomain(domainIndex, 'name', e.target.value)}
                        placeholder="e.g., Design for Organizational Complexity"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Weight</Label>
                      <Input
                        value={domain.weight}
                        onChange={(e) => updateDomain(domainIndex, 'weight', e.target.value)}
                        placeholder="e.g., 12.5%"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={domain.description}
                      onChange={(e) => updateDomain(domainIndex, 'description', e.target.value)}
                      placeholder="Description of this domain..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Topics</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={currentTopic}
                        onChange={(e) => setCurrentTopic(e.target.value)}
                        placeholder="Add a topic..."
                        className="flex-1"
                      />
                      <Button onClick={() => addTopicToDomain(domainIndex)} disabled={!currentTopic}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {domain.topics.length > 0 && (
                      <div className="space-y-1">
                        {domain.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                            <span className="text-sm">{topic}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTopicFromDomain(domainIndex, topicIndex)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preparation Path */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary flex items-center justify-between">
                Preparation Path
                <Button onClick={addPreparationStep} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.preparationPath.map((step, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Step {index + 1}</h4>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={step.completed}
                        onCheckedChange={(checked) => updatePreparationStep(index, 'completed', checked)}
                      />
                      <Label>Completed</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePreparationStep(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Step Title</Label>
                    <Input
                      value={step.step}
                      onChange={(e) => updatePreparationStep(index, 'step', e.target.value)}
                      placeholder="e.g., Prerequisites"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => updatePreparationStep(index, 'description', e.target.value)}
                      placeholder="Description of this step..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Related Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary flex items-center justify-between">
                Related Certifications
                <Button onClick={addRelatedCertification} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Related
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.relatedCertifications.map((cert, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Related Certification {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRelatedCertification(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={cert.title}
                        onChange={(e) => updateRelatedCertification(index, 'title', e.target.value)}
                        placeholder="e.g., AWS Certified DevOps Engineer Professional"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select 
                        value={cert.status} 
                        onValueChange={(value) => updateRelatedCertification(index, 'status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {relatedStatusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={cert.description}
                      onChange={(e) => updateRelatedCertification(index, 'description', e.target.value)}
                      placeholder="Brief description..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Applied Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Applied Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={currentProject}
                  onChange={(e) => setCurrentProject(e.target.value)}
                  placeholder="Describe a project where you applied this certification..."
                  className="flex-1"
                />
                <Button onClick={addProject} disabled={!currentProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              {formData.projects.length > 0 && (
                <div className="space-y-2">
                  {formData.projects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{project}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProject(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certification Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Certification Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e.target.value)}
                  placeholder="e.g., Validates advanced AWS architecture skills"
                  className="flex-1"
                />
                <Button onClick={addBenefit} disabled={!currentBenefit}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              {formData.benefits.length > 0 && (
                <div className="space-y-2">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{benefit}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBenefit(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading} size="lg">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Certificate'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}