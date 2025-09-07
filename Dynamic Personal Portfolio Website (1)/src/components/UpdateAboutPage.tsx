import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { ArrowLeft, Plus, Trash2, Save, User, Code, Briefcase, GraduationCap, ImageIcon, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { aboutApi } from '../lib/supabase';

// Define types for the About page data
interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  description: string;
  gpa?: string;
  current: boolean;
}

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  image_url: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
}

interface AboutData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

interface UpdateAboutPageProps {
  onNavigate: (page: string) => void;
  onSave: (aboutData: AboutData) => Promise<void>;
  onSearchImage: (query: string) => Promise<string>;
}

export function UpdateAboutPage({ onNavigate, onSave, onSearchImage }: UpdateAboutPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'John Doe',
    title: 'Full-Stack Developer & UI/UX Designer',
    bio: 'I\'m a passionate developer with over 5 years of experience creating digital solutions that make a difference. I specialize in modern web development technologies and have a keen eye for user experience design.',
    image_url: '',
    location: 'San Francisco, CA',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    website: 'https://johndoe.dev'
  });

  // Skills State
  const [skills, setSkills] = useState<Skill[]>([
    { name: 'React & Next.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Languages' },
    { name: 'Node.js & Express', level: 85, category: 'Backend' },
    { name: 'UI/UX Design', level: 80, category: 'Design' },
    { name: 'PostgreSQL', level: 75, category: 'Database' },
    { name: 'AWS & Docker', level: 70, category: 'DevOps' }
  ]);

  // Experience State
  const [experience, setExperience] = useState<Experience[]>([
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Full-Stack Developer',
      duration: '2021 - Present',
      description: 'Leading development of enterprise web applications serving 10K+ users. Built microservices architecture using Node.js and implemented real-time features.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      current: true
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      duration: '2019 - 2021',
      description: 'Developed responsive web applications and mobile-first designs. Collaborated with design team to implement pixel-perfect interfaces.',
      technologies: ['React', 'TypeScript', 'SCSS', 'Firebase'],
      current: false
    }
  ]);

  // Education State
  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      duration: '2015 - 2019',
      description: 'Focused on software engineering, algorithms, and web technologies. Active in computer science club and hackathons.',
      gpa: '3.8/4.0',
      current: false
    },
    {
      id: '2',
      institution: 'General Assembly',
      degree: 'Full-Stack Web Development Bootcamp',
      field: 'Web Development',
      duration: '2018',
      description: 'Intensive 12-week program covering modern web development technologies and best practices.',
      gpa: '',
      current: false
    }
  ]);

  // New skill form state
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'Frontend' });

  // New experience form state
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: '',
    current: false
  });

  // New education form state
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
    gpa: '',
    current: false
  });

  // Load existing about data on component mount
  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setIsLoading(true);
        const aboutData = await aboutApi.get();
        
        if (aboutData) {
          setPersonalInfo(aboutData.personal_info);
          setSkills(aboutData.skills);
          setExperience(aboutData.experience);
          setEducation(aboutData.education);
        }
      } catch (error) {
        console.error('Failed to load about data:', error);
        toast.error('Failed to load existing data');
      } finally {
        setIsLoading(false);
      }
    };

    loadAboutData();
  }, []);

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSearch = async () => {
    if (!personalInfo.name) {
      toast.error('Please enter your name first to search for a professional image');
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await onSearchImage(`professional headshot ${personalInfo.name}`);
      setPersonalInfo(prev => ({ ...prev, image_url: imageUrl }));
      toast.success('Professional image found and set!');
    } catch (error) {
      toast.error('Failed to search for image');
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (!newSkill.name.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    const skill: Skill = {
      name: newSkill.name.trim(),
      level: newSkill.level,
      category: newSkill.category
    };

    setSkills(prev => [...prev, skill]);
    setNewSkill({ name: '', level: 50, category: 'Frontend' });
    toast.success('Skill added successfully');
  };

  const removeSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
    toast.success('Skill removed');
  };

  const updateSkillLevel = (index: number, level: number) => {
    setSkills(prev => prev.map((skill, i) => i === index ? { ...skill, level } : skill));
  };

  const addExperience = () => {
    if (!newExperience.company.trim() || !newExperience.position.trim()) {
      toast.error('Please fill in company and position fields');
      return;
    }

    const duration = newExperience.current 
      ? `${newExperience.startDate} - Present`
      : `${newExperience.startDate} - ${newExperience.endDate}`;

    const exp: Experience = {
      id: Date.now().toString(),
      company: newExperience.company.trim(),
      position: newExperience.position.trim(),
      duration,
      description: newExperience.description.trim(),
      technologies: newExperience.technologies.split(',').map(t => t.trim()).filter(t => t),
      current: newExperience.current
    };

    setExperience(prev => [...prev, exp]);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: '',
      current: false
    });
    toast.success('Experience added successfully');
  };

  const removeExperience = (id: string) => {
    setExperience(prev => prev.filter(exp => exp.id !== id));
    toast.success('Experience removed');
  };

  const addEducation = () => {
    if (!newEducation.institution.trim() || !newEducation.degree.trim()) {
      toast.error('Please fill in institution and degree fields');
      return;
    }

    const duration = newEducation.current 
      ? `${newEducation.startDate} - Present`
      : `${newEducation.startDate} - ${newEducation.endDate}`;

    const edu: Education = {
      id: Date.now().toString(),
      institution: newEducation.institution.trim(),
      degree: newEducation.degree.trim(),
      field: newEducation.field.trim(),
      duration,
      description: newEducation.description.trim(),
      gpa: newEducation.gpa.trim(),
      current: newEducation.current
    };

    setEducation(prev => [...prev, edu]);
    setNewEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
      current: false
    });
    toast.success('Education added successfully');
  };

  const removeEducation = (id: string) => {
    setEducation(prev => prev.filter(edu => edu.id !== id));
    toast.success('Education removed');
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const aboutData: AboutData = {
        personalInfo,
        skills,
        experience,
        education
      };

      await onSave(aboutData);
      toast.success('About page updated successfully!');
    } catch (error) {
      toast.error('Failed to update about page');
      console.error('Error saving about data:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-2xl text-primary">Update About Page</h1>
          </div>
          
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Skills</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={personalInfo.title}
                        onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                        placeholder="e.g., Full-Stack Developer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={personalInfo.bio}
                      onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Profile Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        value={personalInfo.image_url}
                        onChange={(e) => handlePersonalInfoChange('image_url', e.target.value)}
                        placeholder="Image URL or search for professional image"
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
                    {personalInfo.image_url && (
                      <div className="mt-2">
                        <img 
                          src={personalInfo.image_url} 
                          alt="Profile preview" 
                          className="w-20 h-20 rounded-full object-cover border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                        placeholder="City, State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={personalInfo.website}
                        onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={personalInfo.github}
                        onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Skill */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-medium">Add New Skill</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Input
                        value={newSkill.name}
                        onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Skill name"
                      />
                      <Select 
                        value={newSkill.category} 
                        onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Frontend">Frontend</SelectItem>
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="Languages">Languages</SelectItem>
                          <SelectItem value="Database">Database</SelectItem>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Tools">Tools</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                          <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="space-y-2">
                        <Label>Proficiency: {newSkill.level}%</Label>
                        <Slider
                          value={[newSkill.level]}
                          onValueChange={(value) => setNewSkill(prev => ({ ...prev, level: value[0] }))}
                          max={100}
                          step={5}
                        />
                      </div>
                      <Button onClick={addSkill} className="flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </Button>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant="secondary">{skill.category}</Badge>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSkill(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Proficiency: {skill.level}%</Label>
                          </div>
                          <Slider
                            value={[skill.level]}
                            onValueChange={(value) => updateSkillLevel(index, value[0])}
                            max={100}
                            step={5}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Experience */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-medium">Add New Experience</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        value={newExperience.company}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Company name"
                      />
                      <Input
                        value={newExperience.position}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                        placeholder="Position title"
                      />
                      <Input
                        type="date"
                        value={newExperience.startDate}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                        placeholder="Start date"
                      />
                      {!newExperience.current && (
                        <Input
                          type="date"
                          value={newExperience.endDate}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                          placeholder="End date"
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newExperience.current}
                        onCheckedChange={(checked) => setNewExperience(prev => ({ ...prev, current: checked }))}
                      />
                      <Label>Currently working here</Label>
                    </div>

                    <Textarea
                      value={newExperience.description}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your role and achievements..."
                      rows={3}
                    />
                    
                    <Input
                      value={newExperience.technologies}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, technologies: e.target.value }))}
                      placeholder="Technologies used (comma separated)"
                    />
                    
                    <Button onClick={addExperience} className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Experience</span>
                    </Button>
                  </div>

                  {/* Experience List */}
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{exp.position}</h3>
                            <p className="text-muted-foreground">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                            {exp.current && (
                              <Badge variant="default" className="text-xs mt-1">Current</Badge>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm mb-3">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education & Learning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Education */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-medium">Add New Education</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                        placeholder="Institution name"
                      />
                      <Input
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                        placeholder="Degree/Certificate"
                      />
                      <Input
                        value={newEducation.field}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
                        placeholder="Field of study"
                      />
                      <Input
                        value={newEducation.gpa}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
                        placeholder="GPA (optional)"
                      />
                      <Input
                        type="date"
                        value={newEducation.startDate}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                        placeholder="Start date"
                      />
                      {!newEducation.current && (
                        <Input
                          type="date"
                          value={newEducation.endDate}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                          placeholder="End date"
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newEducation.current}
                        onCheckedChange={(checked) => setNewEducation(prev => ({ ...prev, current: checked }))}
                      />
                      <Label>Currently studying here</Label>
                    </div>

                    <Textarea
                      value={newEducation.description}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your education, projects, or achievements..."
                      rows={3}
                    />
                    
                    <Button onClick={addEducation} className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Education</span>
                    </Button>
                  </div>

                  {/* Education List */}
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{edu.degree}</h3>
                            <p className="text-muted-foreground">{edu.institution}</p>
                            {edu.field && (
                              <p className="text-sm text-muted-foreground">{edu.field}</p>
                            )}
                            <p className="text-sm text-muted-foreground">{edu.duration}</p>
                            {edu.gpa && (
                              <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                            )}
                            {edu.current && (
                              <Badge variant="default" className="text-xs mt-1">Current</Badge>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {edu.description && (
                          <p className="text-sm">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}