import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Eye,
  Heart,
  Share,
  MessageCircle,
  BookOpen,
  Facebook,
  Twitter,
  Linkedin,
  Link,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';

// Content block types
interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'code';
  level?: number;
  content?: string;
  items?: string[];
  language?: string;
}

// This would typically come from props or URL params
const articleData = {
  id: 1,
  title: 'Getting Started with Next.js 14: The Complete Guide',
  subtitle: 'Everything you need to know about the latest version of Next.js',
  excerpt: 'Explore the latest features in Next.js 14 including the new App Router, Server Components, and enhanced performance optimizations that make building React applications faster and more efficient.',
  content: [
    {
      type: 'heading',
      level: 1,
      content: 'Introduction'
    },
    {
      type: 'paragraph',
      content: 'Next.js 14 represents a significant leap forward in React application development, introducing groundbreaking features that revolutionize how we build modern web applications. This comprehensive guide will walk you through everything you need to know to get started with Next.js 14.'
    },
    {
      type: 'heading',
      level: 2,
      content: "What's New in Next.js 14"
    },
    {
      type: 'paragraph',
      content: 'The latest version of Next.js brings several exciting features that enhance both developer experience and application performance:'
    },
    {
      type: 'heading',
      level: 3,
      content: 'App Router (Stable)'
    },
    {
      type: 'paragraph',
      content: 'The new App Router is now stable and ready for production use. It provides a more intuitive file-based routing system with improved layouts, error handling, and loading states.'
    },
    {
      type: 'code',
      language: 'javascript',
      content: `// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`
    },
    {
      type: 'heading',
      level: 3,
      content: 'Server Components'
    },
    {
      type: 'paragraph',
      content: 'React Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client and improving performance.'
    },
    {
      type: 'code',
      language: 'javascript',
      content: `// This is a Server Component by default
export default async function BlogPost({ params }) {
  const post = await getPost(params.id)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}`
    },
    {
      type: 'heading',
      level: 3,
      content: 'Turbopack (Alpha)'
    },
    {
      type: 'paragraph',
      content: 'Turbopack, the new Rust-based bundler, offers significantly faster build times. While still in alpha, it shows promise for the future of Next.js development.'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Performance Improvements'
    },
    {
      type: 'paragraph',
      content: 'Next.js 14 introduces several performance optimizations:'
    },
    {
      type: 'list',
      items: [
        'Faster Development Server: Up to 53% faster local server startup',
        'Improved Code Splitting: More efficient bundle splitting',
        'Enhanced Image Optimization: Better image loading and optimization',
        'Memory Usage Reduction: Lower memory consumption during builds'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Migration Guide'
    },
    {
      type: 'paragraph',
      content: 'Migrating from Next.js 13 to 14 is straightforward:'
    },
    {
      type: 'list',
      items: [
        'Update your package.json',
        'Review breaking changes',
        'Test your application thoroughly',
        'Deploy with confidence'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'Step-by-Step Migration'
    },
    {
      type: 'code',
      language: 'bash',
      content: `npm install next@14
# or
yarn add next@14`
    },
    {
      type: 'paragraph',
      content: 'Most applications will work without changes, but be sure to check the migration guide for any breaking changes that might affect your specific use case.'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Best Practices'
    },
    {
      type: 'paragraph',
      content: 'When working with Next.js 14, follow these best practices:'
    },
    {
      type: 'heading',
      level: 3,
      content: '1. Use Server Components by Default'
    },
    {
      type: 'paragraph',
      content: 'Start with Server Components and only use Client Components when you need interactivity:'
    },
    {
      type: 'code',
      language: 'javascript',
      content: `'use client' // Only add this when necessary

import { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`
    },
    {
      type: 'heading',
      level: 3,
      content: '2. Optimize Images'
    },
    {
      type: 'paragraph',
      content: 'Always use the Next.js Image component for optimal performance:'
    },
    {
      type: 'code',
      language: 'javascript',
      content: `import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority
    />
  )
}`
    },
    {
      type: 'heading',
      level: 3,
      content: '3. Implement Proper Loading States'
    },
    {
      type: 'paragraph',
      content: 'Use Next.js 14\'s improved loading states for better user experience:'
    },
    {
      type: 'code',
      language: 'javascript',
      content: `// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading dashboard...</div>
}`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Advanced Features'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Parallel Routes'
    },
    {
      type: 'paragraph',
      content: 'Next.js 14 introduces parallel routes for complex layouts:'
    },
    {
      type: 'code',
      language: 'text',
      content: `app/
├── layout.tsx
├── page.tsx
├── @analytics/
│   └── page.tsx
└── @team/
    └── page.tsx`
    },
    {
      type: 'heading',
      level: 3,
      content: 'Intercepting Routes'
    },
    {
      type: 'paragraph',
      content: 'Intercept routes to show content in modals or overlays:'
    },
    {
      type: 'code',
      language: 'text',
      content: `app/
├── feed/
│   ├── page.tsx
│   └── (..)photo/
│       └── [id]/
│           └── page.tsx
└── photo/
    └── [id]/
        └── page.tsx`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Conclusion'
    },
    {
      type: 'paragraph',
      content: 'Next.js 14 continues to push the boundaries of what\'s possible with React applications. The new features and performance improvements make it an excellent choice for building modern web applications.'
    },
    {
      type: 'paragraph',
      content: 'Whether you\'re starting a new project or migrating an existing one, Next.js 14 provides the tools and optimizations you need to build fast, scalable applications.'
    },
    {
      type: 'paragraph',
      content: 'Start experimenting with these features today and see how they can improve your development workflow and application performance.'
    }
  ],
  author: {
    name: 'John Doe',
    bio: 'Full-stack developer passionate about React, Next.js, and modern web technologies. I love sharing knowledge and helping developers build better applications.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    social: {
      twitter: '@johndoe',
      github: 'johndoe',
      linkedin: 'johndoe'
    }
  },
  publishDate: '2024-01-15',
  lastUpdated: '2024-01-20',
  readTime: '8 min read',
  category: 'Web Development',
  tags: ['Next.js', 'React', 'JavaScript', 'SSR', 'Web Development', 'Performance'],
  featured: true,
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
  stats: {
    views: 1234,
    likes: 89,
    comments: 23,
    shares: 45
  }
};

const relatedArticles = [
  {
    id: 2,
    title: 'React Performance Optimization: Best Practices for 2024',
    excerpt: 'Learn advanced techniques to optimize your React applications...',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    readTime: '12 min read',
    category: 'Performance'
  },
  {
    id: 3,
    title: 'TypeScript Tips and Tricks: Advanced Patterns',
    excerpt: 'Dive deep into advanced TypeScript patterns that will make your code more type-safe...',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    readTime: '10 min read',
    category: 'TypeScript'
  },
  {
    id: 6,
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt: 'Explore the emerging trends and technologies that will shape web development...',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    readTime: '6 min read',
    category: 'Trends'
  }
];

interface BlogDetailPageProps {
  onNavigate: (page: string) => void;
}

export function BlogDetailPage({ onNavigate }: BlogDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c8e5?w=50&h=50&fit=crop&crop=face',
      content: 'Great article! The migration guide was especially helpful. Thanks for sharing.',
      date: '2024-01-16',
      likes: 5
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      content: 'I\'ve been waiting for a comprehensive guide like this. The performance improvements in Next.js 14 are impressive.',
      date: '2024-01-17',
      likes: 3
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [newCommentName, setNewCommentName] = useState('');

  // Calculate reading progress
  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.getElementById('article-content');
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const progress = Math.min(100, Math.max(0, scrollPercent * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${articleData.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && newCommentName.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: newCommentName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCommentName)}&background=007BFF&color=fff`,
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setNewCommentName('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-20">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => onNavigate('blog')}
              className="mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="outline">{articleData.category}</Badge>
              {articleData.featured && (
                <Badge className="bg-yellow-500 text-yellow-900 border-none">
                  Featured
                </Badge>
              )}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(articleData.publishDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{articleData.readTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{articleData.stats.views} views</span>
                </div>
              </div>
            </div>

            {/* Title and Subtitle */}
            <div className="space-y-4 mb-8">
              <h1 className="text-primary">{articleData.title}</h1>
              <p className="text-xl text-muted-foreground">{articleData.subtitle}</p>
              <p className="text-muted-foreground">{articleData.excerpt}</p>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={articleData.author.avatar} alt={articleData.author.name} />
                  <AvatarFallback>{articleData.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-primary">{articleData.author.name}</p>
                  <p className="text-sm text-muted-foreground">Published {formatDate(articleData.publishDate)}</p>
                </div>
              </div>

              {/* Social Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`group ${isLiked ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-4 w-4 mr-2 group-hover:scale-110 transition-transform ${isLiked ? 'fill-current' : ''}`} />
                  {articleData.stats.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="group">
                  <MessageCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  {articleData.stats.comments}
                </Button>
                <Button variant="ghost" size="sm" className="group">
                  <Share className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <ImageWithFallback
              src={articleData.image}
              alt={articleData.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <Card>
                <CardContent className="p-8">
                  <div 
                    id="article-content"
                    className="prose prose-neutral max-w-none prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80 space-y-6"
                  >
                    {articleData.content.map((block: ContentBlock, index: number) => {
                      switch (block.type) {
                        case 'heading':
                          const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
                          const headingId = block.content?.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
                          return (
                            <HeadingTag key={index} id={headingId} className="text-primary scroll-mt-24">
                              {block.content}
                            </HeadingTag>
                          );
                        case 'paragraph':
                          return (
                            <p key={index} className="text-muted-foreground leading-relaxed">
                              {block.content}
                            </p>
                          );
                        case 'list':
                          return (
                            <ul key={index} className="space-y-2 text-muted-foreground">
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
                            <div key={index} className="my-6">
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
                    })}
                  </div>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="text-primary mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {articleData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Share Section */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="text-primary mb-4">Share this article</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" onClick={() => handleShare('twitter')} className="group">
                        <Twitter className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleShare('facebook')} className="group">
                        <Facebook className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')} className="group">
                        <Linkedin className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleShare('copy')} className="group">
                        <Link className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Author Bio */}
              <Card className="mt-8">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={articleData.author.avatar} alt={articleData.author.name} />
                      <AvatarFallback>{articleData.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-primary mb-2">About {articleData.author.name}</h3>
                      <p className="text-muted-foreground mb-4">{articleData.author.bio}</p>
                      <div className="flex space-x-4">
                        <a href={`https://twitter.com/${articleData.author.social.twitter}`} className="text-muted-foreground hover:text-primary transition-colors">
                          <Twitter className="h-5 w-5" />
                        </a>
                        <a href={`https://github.com/${articleData.author.social.github}`} className="text-muted-foreground hover:text-primary transition-colors">
                          <User className="h-5 w-5" />
                        </a>
                        <a href={`https://linkedin.com/in/${articleData.author.social.linkedin}`} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="mt-8">
                <CardContent className="p-8">
                  <h3 className="text-primary mb-6">Comments ({comments.length})</h3>
                  
                  {/* Add Comment Form */}
                  <div className="space-y-4 mb-8 p-6 bg-muted/30 rounded-lg">
                    <h4 className="text-primary">Leave a comment</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your name"
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                      />
                    </div>
                    <Textarea
                      placeholder="Write your comment..."
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={handleAddComment} className="group">
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Post Comment
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-primary">{comment.author}</h4>
                            <span className="text-sm text-muted-foreground">{formatDate(comment.date)}</span>
                          </div>
                          <p className="text-muted-foreground mb-3">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-xs">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              {/* Table of Contents */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="text-primary">Table of Contents</h3>
                  </div>
                  <nav className="space-y-2 text-sm">
                    {articleData.content
                      .filter((block: ContentBlock) => block.type === 'heading' && block.level && block.level <= 3)
                      .map((heading: ContentBlock, index: number) => {
                        const headingId = heading.content?.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
                        const marginClass = heading.level === 1 ? '' : heading.level === 2 ? 'ml-2' : 'ml-4';
                        return (
                          <a 
                            key={index}
                            href={`#${headingId}`} 
                            className={`block text-muted-foreground hover:text-primary transition-colors ${marginClass}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(headingId || '')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {heading.content}
                          </a>
                        );
                      })
                    }
                  </nav>
                </CardContent>
              </Card>

              {/* Article Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-primary mb-4">Article Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Views</span>
                      <span className="font-medium">{articleData.stats.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Likes</span>
                      <span className="font-medium">{articleData.stats.likes + (isLiked ? 1 : 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Comments</span>
                      <span className="font-medium">{comments.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shares</span>
                      <span className="font-medium">{articleData.stats.shares}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-4">Related Articles</h2>
            <p className="text-muted-foreground">
              Continue reading with these related articles on similar topics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4" variant="outline">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-primary mb-2 group-hover:text-secondary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => onNavigate('blog')}
              className="group"
            >
              View All Articles
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}