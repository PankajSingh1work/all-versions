import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Eye,
  Filter,
  BookOpen,
  TrendingUp,
  ArrowRight,
  MessageCircle,
  Heart,
  Share
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 14: The Complete Guide',
    excerpt: 'Explore the latest features in Next.js 14 including the new App Router, Server Components, and enhanced performance optimizations that make building React applications faster and more efficient.',
    content: 'Next.js 14 introduces several groundbreaking features that revolutionize how we build React applications...',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'JavaScript', 'SSR'],
    featured: true,
    views: 1234,
    likes: 89,
    comments: 23,
    status: 'Published'
  },
  {
    id: 2,
    title: 'React Performance Optimization: Best Practices for 2024',
    excerpt: 'Learn advanced techniques to optimize your React applications, including memoization strategies, code splitting, and modern bundling techniques that can improve your app performance by up to 40%.',
    content: 'Performance optimization in React has evolved significantly. Here are the latest strategies...',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2024-01-08',
    readTime: '12 min read',
    category: 'Performance',
    tags: ['React', 'Optimization', 'Performance', 'Web Vitals'],
    featured: true,
    views: 2156,
    likes: 134,
    comments: 45,
    status: 'Published'
  },
  {
    id: 3,
    title: 'TypeScript Tips and Tricks: Advanced Patterns',
    excerpt: 'Dive deep into advanced TypeScript patterns that will make your code more type-safe and maintainable. From utility types to conditional types, master the art of TypeScript.',
    content: 'TypeScript offers powerful features beyond basic typing. Let\'s explore advanced patterns...',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2024-01-01',
    readTime: '10 min read',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Types'],
    featured: false,
    views: 987,
    likes: 67,
    comments: 18,
    status: 'Published'
  },
  {
    id: 4,
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'A comprehensive guide to building robust, scalable APIs using Node.js and Express. Learn about middleware, error handling, authentication, and best practices for production deployment.',
    content: 'Building scalable APIs requires careful consideration of architecture and best practices...',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2023-12-20',
    readTime: '15 min read',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    featured: false,
    views: 1456,
    likes: 98,
    comments: 31,
    status: 'Published'
  },
  {
    id: 5,
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Understanding the differences between CSS Grid and Flexbox and knowing when to use each layout method. A practical guide with real-world examples and code snippets.',
    content: 'CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes...',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2023-12-15',
    readTime: '7 min read',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    featured: false,
    views: 834,
    likes: 52,
    comments: 12,
    status: 'Published'
  },
  {
    id: 6,
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt: 'Explore the emerging trends and technologies that will shape web development in 2024. From AI integration to new frameworks, stay ahead of the curve.',
    content: 'The web development landscape is constantly evolving. Here\'s what we can expect...',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2023-12-01',
    readTime: '6 min read',
    category: 'Trends',
    tags: ['Future', 'Trends', 'AI', 'Web Development'],
    featured: true,
    views: 2789,
    likes: 187,
    comments: 56,
    status: 'Published'
  },
  {
    id: 7,
    title: 'Database Design Best Practices for Modern Applications',
    excerpt: 'Learn the fundamental principles of database design for modern applications. From normalization to indexing strategies, build databases that scale.',
    content: 'Effective database design is crucial for application performance and scalability...',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2023-11-25',
    readTime: '11 min read',
    category: 'Database',
    tags: ['Database', 'SQL', 'NoSQL', 'Design'],
    featured: false,
    views: 1123,
    likes: 78,
    comments: 19,
    status: 'Published'
  },
  {
    id: 8,
    title: 'Mastering Git: Advanced Workflows and Best Practices',
    excerpt: 'Go beyond basic Git commands and learn advanced workflows, branching strategies, and collaboration techniques that will make you a Git master.',
    content: 'Git is more than just version control. Master these advanced techniques...',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    author: 'John Doe',
    date: '2023-11-18',
    readTime: '9 min read',
    category: 'Tools',
    tags: ['Git', 'Version Control', 'Workflow', 'Collaboration'],
    featured: false,
    views: 756,
    likes: 41,
    comments: 8,
    status: 'Published'
  }
];

const categories = ['All', 'Web Development', 'Performance', 'TypeScript', 'Backend', 'CSS', 'Trends', 'Database', 'Tools'];
const sortOptions = ['Latest', 'Most Popular', 'Most Liked', 'Most Commented'];

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesFeatured = !showFeaturedOnly || post.featured;

      return matchesSearch && matchesCategory && matchesFeatured;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Most Popular':
          return b.views - a.views;
        case 'Most Liked':
          return b.likes - a.likes;
        case 'Most Commented':
          return b.comments - a.comments;
        default: // Latest
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('Latest');
    setShowFeaturedOnly(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-primary mb-6">Blog & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Sharing knowledge, insights, and experiences from the world of web development. 
              From technical tutorials to industry trends, explore topics that matter to developers.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>{blogPosts.length} Articles</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>{totalViews.toLocaleString()} Total Views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>{totalLikes} Likes</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Weekly Updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Featured Only</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-muted-foreground">
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {!showFeaturedOnly && (
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-primary mb-4">Featured Articles</h2>
              <p className="text-muted-foreground">
                Hand-picked articles covering the most important topics in modern web development.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900 border-none">
                        Featured
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {post.category}
                        </Badge>
                        <h3 
                          className="text-primary mb-2 group-hover:text-secondary transition-colors cursor-pointer"
                          onClick={() => onNavigate('blog-detail')}
                        >
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </span>
                        </div>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full group/btn"
                        onClick={() => onNavigate('blog-detail')}
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-primary mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or clearing the filters.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-primary">
                  {showFeaturedOnly ? 'Featured Articles' : 'All Articles'}
                </h2>
                <div className="text-muted-foreground text-sm">
                  Sorted by {sortBy}
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          <div className="relative w-full md:w-80 h-64 md:h-48 overflow-hidden">
                            <ImageWithFallback
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {post.featured && (
                              <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900 border-none">
                                Featured
                              </Badge>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6 space-y-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{post.category}</Badge>
                                {post.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <h3 
                                className="text-primary mb-2 group-hover:text-secondary transition-colors cursor-pointer"
                                onClick={() => onNavigate('blog-detail')}
                              >
                                {post.title}
                              </h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>

                            {/* Post meta */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <User className="h-3 w-3" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(post.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                            </div>

                            {/* Engagement stats */}
                            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{post.views.toLocaleString()} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{post.likes} likes</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{post.comments} comments</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="group/btn"
                                onClick={() => onNavigate('blog-detail')}
                              >
                                Read Article
                                <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-primary-foreground">Stay Updated</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Get the latest articles and insights delivered directly to your inbox. 
              Join our community of developers who stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button 
                variant="secondary"
                className="px-8"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/60">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}