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
  Clock,
  User,
  Heart,
  MessageCircle,
  Share
} from 'lucide-react';

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'code';
  level?: number;
  content?: string;
  items?: string[];
  language?: string;
}

interface Author {
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter: string;
    github: string;
    linkedin: string;
  };
}

interface BlogFormData {
  title: string;
  subtitle: string;
  excerpt: string;
  content: ContentBlock[];
  author: Author;
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  slug: string;
}

interface AddBlogPageProps {
  onNavigate: (page: string) => void;
  onSave: (blogData: BlogFormData) => Promise<void>;
  onSearchImage: (query: string) => Promise<string>;
}

export function AddBlogPage({ onNavigate, onSave, onSearchImage }: AddBlogPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentContentType, setCurrentContentType] = useState<'heading' | 'paragraph' | 'list' | 'code'>('paragraph');
  const [currentContentLevel, setCurrentContentLevel] = useState(1);
  const [currentContentText, setCurrentContentText] = useState('');
  const [currentListItem, setCurrentListItem] = useState('');
  const [currentListItems, setCurrentListItems] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    subtitle: '',
    excerpt: '',
    content: [],
    author: {
      name: 'John Doe',
      bio: 'Full-stack developer passionate about React, Next.js, and modern web technologies. I love sharing knowledge and helping developers build better applications.',
      avatar: '',
      social: {
        twitter: '@johndoe',
        github: 'johndoe',
        linkedin: 'johndoe'
      }
    },
    publishDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    readTime: '',
    category: '',
    tags: [],
    featured: false,
    image: '',
    slug: ''
  });

  const categories = [
    'Web Development',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'CSS',
    'Performance',
    'DevOps',
    'AI/ML',
    'Mobile Development',
    'Database',
    'Security',
    'Career',
    'Tutorials',
    'Trends',
    'Other'
  ];

  const headingLevels = [1, 2, 3, 4, 5, 6];

  const programmingLanguages = [
    'javascript',
    'typescript',
    'jsx',
    'tsx',
    'css',
    'html',
    'json',
    'bash',
    'sql',
    'python',
    'java',
    'php',
    'go',
    'rust',
    'text'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'author') {
        if (child.includes('.')) {
          const [grandParent, grandChild] = child.split('.');
          setFormData(prev => ({
            ...prev,
            author: {
              ...prev.author,
              [grandParent]: {
                ...prev.author[grandParent as keyof typeof prev.author],
                [grandChild]: value
              }
            }
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            author: {
              ...prev.author,
              [child]: value
            }
          }));
        }
      }
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

    // Auto-calculate read time based on content
    if (field === 'content' || field === 'title' || field === 'excerpt') {
      const wordCount = calculateWordCount(formData.content, formData.title, formData.excerpt);
      const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Average reading speed: 200 words per minute
      setFormData(prev => ({ ...prev, readTime: `${readTime} min read` }));
    }
  };

  const calculateWordCount = (content: ContentBlock[], title: string, excerpt: string): number => {
    let wordCount = 0;
    
    // Count words in title and excerpt
    wordCount += title.split(' ').length;
    wordCount += excerpt.split(' ').length;
    
    // Count words in content blocks
    content.forEach(block => {
      if (block.content) {
        wordCount += block.content.split(' ').length;
      }
      if (block.items) {
        block.items.forEach(item => {
          wordCount += item.split(' ').length;
        });
      }
    });
    
    return wordCount;
  };

  const handleSearchFeaturedImage = async () => {
    if (!formData.title) {
      toast.error('Please enter the article title first');
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await onSearchImage(`${formData.title} ${formData.category} blog article`);
      handleInputChange('image', imageUrl);
      toast.success('Featured image found and added');
    } catch (error) {
      toast.error('Failed to find featured image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchAuthorAvatar = async () => {
    if (!formData.author.name) {
      toast.error('Please enter the author name first');
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await onSearchImage(`professional headshot ${formData.author.name}`);
      handleInputChange('author.avatar', imageUrl);
      toast.success('Author avatar found and added');
    } catch (error) {
      toast.error('Failed to find author avatar');
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addListItem = () => {
    if (currentListItem) {
      setCurrentListItems(prev => [...prev, currentListItem]);
      setCurrentListItem('');
    }
  };

  const removeListItem = (index: number) => {
    setCurrentListItems(prev => prev.filter((_, i) => i !== index));
  };

  const addContentBlock = () => {
    if (!currentContentText && currentContentType !== 'list') {
      toast.error('Please enter content for the block');
      return;
    }

    if (currentContentType === 'list' && currentListItems.length === 0) {
      toast.error('Please add at least one list item');
      return;
    }

    const newBlock: ContentBlock = {
      type: currentContentType,
      ...(currentContentType === 'heading' && { level: currentContentLevel }),
      ...(currentContentType !== 'list' && { content: currentContentText }),
      ...(currentContentType === 'list' && { items: [...currentListItems] }),
      ...(currentContentType === 'code' && { language: currentLanguage })
    };

    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));

    // Reset form
    setCurrentContentText('');
    setCurrentListItems([]);
    setCurrentListItem('');

    // Auto-calculate read time
    const wordCount = calculateWordCount([...formData.content, newBlock], formData.title, formData.excerpt);
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    setFormData(prev => ({ ...prev, readTime: `${readTime} min read` }));
  };

  const removeContentBlock = (index: number) => {
    const newContent = formData.content.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Recalculate read time
    const wordCount = calculateWordCount(newContent, formData.title, formData.excerpt);
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    setFormData(prev => ({ ...prev, readTime: `${readTime} min read` }));
  };

  const moveContentBlock = (index: number, direction: 'up' | 'down') => {
    const newContent = [...formData.content];
    if (direction === 'up' && index > 0) {
      [newContent[index], newContent[index - 1]] = [newContent[index - 1], newContent[index]];
    } else if (direction === 'down' && index < newContent.length - 1) {
      [newContent[index], newContent[index + 1]] = [newContent[index + 1], newContent[index]];
    }
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.title || !formData.excerpt || !formData.category) {
      toast.error('Please fill in all required fields (Title, Excerpt, Category)');
      return;
    }

    if (formData.content.length === 0) {
      toast.error('Please add at least one content block');
      return;
    }

    try {
      setIsLoading(true);
      await onSave(formData);
      toast.success('Blog post saved successfully!');
    } catch (error) {
      toast.error('Failed to save blog post');
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag className="text-primary scroll-mt-24">
            {block.content}
          </HeadingTag>
        );
      case 'paragraph':
        return (
          <p className="text-muted-foreground leading-relaxed">
            {block.content}
          </p>
        );
      case 'list':
        return (
          <ul className="space-y-2 text-muted-foreground">
            {block.items?.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start space-x-2">
                <span className="text-primary mt-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'code':
        return (
          <div className="my-6">
            <div className="bg-muted/30 border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b border-border">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {block.language || 'code'}
                </span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-foreground font-mono">
                  {block.content}
                </code>
              </pre>
            </div>
          </div>
        );
      default:
        return null;
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
              <h2 className="text-primary">Blog Post Preview</h2>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Blog Post'}
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {formData.category && <Badge variant="outline">{formData.category}</Badge>}
                  {formData.featured && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-none">
                      Featured
                    </Badge>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formData.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formData.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h1 className="text-primary">{formData.title || 'Blog Post Title'}</h1>
                  <p className="text-xl text-muted-foreground">{formData.subtitle}</p>
                  <p className="text-muted-foreground">{formData.excerpt}</p>
                </div>

                <div className="flex items-center space-x-4">
                  {formData.author.avatar && (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={formData.author.avatar}
                        alt={formData.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-primary">{formData.author.name}</p>
                    <p className="text-sm text-muted-foreground">Published {formData.publishDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            {formData.image && (
              <Card className="mb-8">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={formData.image}
                      alt={formData.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-neutral max-w-none prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80 space-y-6">
                  {formData.content.map((block, index) => (
                    <div key={index}>
                      {renderContentBlock(block, index)}
                    </div>
                  ))}
                </div>

                {formData.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="text-primary mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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
            <h1 className="text-primary">Add New Blog Post</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setPreviewMode(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Blog Post'}
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
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Getting Started with Next.js 14: The Complete Guide"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  placeholder="e.g., Everything you need to know about the latest version of Next.js"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the article that will appear in previews..."
                  rows={3}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
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
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange('readTime', e.target.value)}
                    placeholder="e.g., 8 min read (auto-calculated)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastUpdated">Last Updated</Label>
                  <Input
                    id="lastUpdated"
                    type="date"
                    value={formData.lastUpdated}
                    onChange={(e) => handleInputChange('lastUpdated', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Article</Label>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Input
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="Featured image URL or use search button"
                  className="flex-1"
                />
                <Button onClick={handleSearchFeaturedImage} disabled={isLoading || !formData.title}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {isLoading ? 'Searching...' : 'Search Image'}
                </Button>
              </div>
              {formData.image && (
                <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={formData.image}
                    alt="Featured image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} disabled={!currentTag}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-2">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Author Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Author Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    value={formData.author.name}
                    onChange={(e) => handleInputChange('author.name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorAvatar">Author Avatar</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="authorAvatar"
                      value={formData.author.avatar}
                      onChange={(e) => handleInputChange('author.avatar', e.target.value)}
                      placeholder="Avatar URL"
                      className="flex-1"
                    />
                    <Button onClick={handleSearchAuthorAvatar} disabled={isLoading || !formData.author.name} size="sm">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.author.avatar && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={formData.author.avatar}
                        alt="Author avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorBio">Author Bio</Label>
                <Textarea
                  id="authorBio"
                  value={formData.author.bio}
                  onChange={(e) => handleInputChange('author.bio', e.target.value)}
                  placeholder="Brief bio about the author..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter Handle</Label>
                  <Input
                    id="twitter"
                    value={formData.author.social.twitter}
                    onChange={(e) => handleInputChange('author.social.twitter', e.target.value)}
                    placeholder="@johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Username</Label>
                  <Input
                    id="github"
                    value={formData.author.social.github}
                    onChange={(e) => handleInputChange('author.social.github', e.target.value)}
                    placeholder="johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Username</Label>
                  <Input
                    id="linkedin"
                    value={formData.author.social.linkedin}
                    onChange={(e) => handleInputChange('author.social.linkedin', e.target.value)}
                    placeholder="johndoe"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Content Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Content Block Form */}
              <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Select 
                      value={currentContentType} 
                      onValueChange={(value: 'heading' | 'paragraph' | 'list' | 'code') => setCurrentContentType(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heading">Heading</SelectItem>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="code">Code Block</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {currentContentType === 'heading' && (
                    <div className="space-y-2">
                      <Label>Heading Level</Label>
                      <Select 
                        value={currentContentLevel.toString()} 
                        onValueChange={(value) => setCurrentContentLevel(parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {headingLevels.map(level => (
                            <SelectItem key={level} value={level.toString()}>H{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {currentContentType === 'code' && (
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {programmingLanguages.map(lang => (
                            <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {currentContentType === 'list' ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={currentListItem}
                        onChange={(e) => setCurrentListItem(e.target.value)}
                        placeholder="Add a list item..."
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && addListItem()}
                      />
                      <Button onClick={addListItem} disabled={!currentListItem}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {currentListItems.length > 0 && (
                      <div className="space-y-2">
                        {currentListItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                            <span className="text-sm">{item}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeListItem(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      value={currentContentText}
                      onChange={(e) => setCurrentContentText(e.target.value)}
                      placeholder={
                        currentContentType === 'heading' ? 'Enter heading text...' :
                        currentContentType === 'paragraph' ? 'Enter paragraph text...' :
                        'Enter code...'
                      }
                      rows={currentContentType === 'code' ? 8 : 3}
                      className={currentContentType === 'code' ? 'font-mono' : ''}
                    />
                  </div>
                )}

                <Button onClick={addContentBlock}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add {currentContentType}
                </Button>
              </div>

              {/* Content Blocks List */}
              {formData.content.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Content Blocks ({formData.content.length})</h4>
                  {formData.content.map((block, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {block.type} {block.type === 'heading' && `H${block.level}`}
                          </Badge>
                          {block.language && <Badge variant="secondary">{block.language}</Badge>}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveContentBlock(index, 'up')}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveContentBlock(index, 'down')}
                            disabled={index === formData.content.length - 1}
                          >
                            ↓
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContentBlock(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded border max-h-40 overflow-y-auto">
                        {block.content && (
                          <p className="text-sm text-muted-foreground truncate">
                            {block.content.substring(0, 150)}
                            {block.content.length > 150 && '...'}
                          </p>
                        )}
                        {block.items && (
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {block.items.slice(0, 3).map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                            {block.items.length > 3 && <li>... and {block.items.length - 3} more</li>}
                          </ul>
                        )}
                      </div>
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
              {isLoading ? 'Saving...' : 'Save Blog Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}