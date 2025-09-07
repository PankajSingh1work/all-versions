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
  ExternalLink, 
  Calendar, 
  Award, 
  Download,
  CheckCircle,
  Filter,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react';

const allCertifications = [
  {
    id: 1,
    title: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    date: '2024',
    validUntil: '2027',
    logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
    description: 'Advanced certification validating expertise in designing distributed systems on AWS platform with high availability and fault tolerance.',
    skills: ['Cloud Architecture', 'AWS Services', 'System Design', 'Security', 'Cost Optimization'],
    credentialId: 'AWS-SAP-123456',
    status: 'Valid',
    level: 'Professional',
    category: 'Cloud Computing',
    featured: true,
    verificationUrl: '#',
    pdfUrl: '#'
  },
  {
    id: 2,
    title: 'Google Professional Cloud Developer',
    issuer: 'Google Cloud',
    date: '2023',
    validUntil: '2025',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    description: 'Demonstrates proficiency in developing scalable applications on Google Cloud Platform using modern development practices.',
    skills: ['Google Cloud Platform', 'Kubernetes', 'DevOps', 'Microservices', 'CI/CD'],
    credentialId: 'GCP-PCD-789012',
    status: 'Valid',
    level: 'Professional',
    category: 'Cloud Computing',
    featured: true,
    verificationUrl: '#',
    pdfUrl: '#'
  },
  {
    id: 3,
    title: 'Meta React Developer Professional Certificate',
    issuer: 'Meta (Facebook)',
    date: '2023',
    validUntil: 'Lifetime',
    logo: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=100&h=100&fit=crop',
    description: 'Comprehensive certification covering advanced React development skills, best practices, and modern frontend development techniques.',
    skills: ['React.js', 'JavaScript', 'Frontend Development', 'State Management', 'Testing'],
    credentialId: 'META-REACT-345678',
    status: 'Valid',
    level: 'Professional',
    category: 'Frontend Development',
    featured: true,
    verificationUrl: '#',
    pdfUrl: '#'
  },
  {
    id: 4,
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022',
    validUntil: '2025',
    logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&h=100&fit=crop',
    description: 'Hands-on certification demonstrating expertise in Kubernetes cluster administration, troubleshooting, and management.',
    skills: ['Kubernetes', 'Container Orchestration', 'DevOps', 'Linux', 'Networking'],
    credentialId: 'CKA-901234',
    status: 'Valid',
    level: 'Professional',
    category: 'DevOps',
    featured: false,
    verificationUrl: '#',
    pdfUrl: '#'
  },
  {
    id: 5,
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB Inc.',
    date: '2023',
    validUntil: '2026',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop',
    description: 'Certification validating proficiency in MongoDB database design, development, and optimization techniques.',
    skills: ['MongoDB', 'NoSQL', 'Database Design', 'Aggregation', 'Performance Tuning'],
    credentialId: 'MONGO-DEV-567890',
    status: 'Valid',
    level: 'Associate',
    category: 'Database',
    featured: false,
    verificationUrl: '#',
    pdfUrl: '#'
  },
  {
    id: 6,
    title: 'Certified Scrum Master (CSM)',
    issuer: 'Scrum Alliance',
    date: '2022',
    validUntil: '2024',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    description: 'Agile project management certification focusing on Scrum methodology, team leadership, and project delivery.',
    skills: ['Scrum', 'Agile Methodology', 'Project Management', 'Team Leadership', 'Sprint Planning'],
    credentialId: 'CSM-123789',
    status: 'Expired',
    level: 'Professional',
    category: 'Project Management',
    featured: false,
    verificationUrl: '#',
    pdfUrl: '#'
  },
  {
    id: 7,
    title: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: '2022',
    validUntil: '2025',
    logo: 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=100&h=100&fit=crop',
    description: 'Certification demonstrating proficiency in Docker containerization, orchestration, and deployment strategies.',
    skills: ['Docker', 'Containerization', 'Docker Compose', 'Container Security', 'Image Management'],
    credentialId: 'DCA-456123',
    status: 'Valid',
    level: 'Associate',
    category: 'DevOps',
    featured: false,
    verificationUrl: '#',
    pdfUrl: '#'
  },
  {
    id: 8,
    title: 'Stripe Partner Certification',
    issuer: 'Stripe Inc.',
    date: '2023',
    validUntil: '2025',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    description: 'Payment processing certification covering Stripe API integration, payment flows, and compliance requirements.',
    skills: ['Payment Processing', 'API Integration', 'PCI Compliance', 'Webhooks', 'Financial Technology'],
    credentialId: 'STRIPE-PART-789456',
    status: 'Valid',
    level: 'Associate',
    category: 'Payment Systems',
    featured: false,
    verificationUrl: '#',
    pdfUrl: '#'
  }
];

const categories = ['All', 'Cloud Computing', 'Frontend Development', 'DevOps', 'Database', 'Project Management', 'Payment Systems'];
const levels = ['All', 'Associate', 'Professional'];
const statuses = ['All', 'Valid', 'Expired'];
const issuers = ['All', 'Amazon Web Services', 'Google Cloud', 'Meta (Facebook)', 'Cloud Native Computing Foundation', 'MongoDB Inc.', 'Scrum Alliance', 'Docker Inc.', 'Stripe Inc.'];

interface CertificationsPageProps {
  onNavigate: (page: string) => void;
}

export function CertificationsPage({ onNavigate }: CertificationsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredCertifications = allCertifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || cert.level === selectedLevel;
    const matchesStatus = selectedStatus === 'All' || cert.status === selectedStatus;
    const matchesIssuer = selectedIssuer === 'All' || cert.issuer === selectedIssuer;
    const matchesFeatured = !showFeaturedOnly || cert.featured;

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus && matchesIssuer && matchesFeatured;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedStatus('All');
    setSelectedIssuer('All');
    setShowFeaturedOnly(false);
  };

  const validCertifications = allCertifications.filter(cert => cert.status === 'Valid');
  const featuredCertifications = allCertifications.filter(cert => cert.featured);

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
            <h1 className="text-primary mb-6">Professional Certifications</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive collection of my professional certifications and credentials that validate 
              my expertise across various technologies and methodologies. Committed to continuous learning 
              and staying current with industry standards.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>{allCertifications.length} Total Certifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{validCertifications.length} Currently Valid</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span>{featuredCertifications.length} Featured</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Continuously Updated</span>
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
                placeholder="Search certifications, skills..."
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

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedIssuer} onValueChange={setSelectedIssuer}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Issuer" />
                </SelectTrigger>
                <SelectContent>
                  {issuers.map((issuer) => (
                    <SelectItem key={issuer} value={issuer}>
                      {issuer}
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
                <Star className="h-4 w-4" />
                <span>Featured Only</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-muted-foreground">
                Showing {filteredCertifications.length} of {allCertifications.length} certifications
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCertifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-primary mb-2">No certifications found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or clearing the filters.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <CardContent className="p-6 space-y-6">
                      {/* Header with logo and badges */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                            <ImageWithFallback
                              src={cert.logo}
                              alt={cert.issuer}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-primary leading-tight group-hover:text-secondary transition-colors">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">{cert.issuer}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {cert.featured && (
                            <Badge className="bg-yellow-500 text-yellow-900 border-none text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <Badge 
                            variant={cert.status === 'Valid' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {cert.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {cert.description}
                      </p>

                      {/* Certification Details */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Level:</span>
                            <p className="font-medium">{cert.level}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Category:</span>
                            <p className="font-medium">{cert.category}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Earned:</span>
                            <p className="font-medium">{cert.date}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Valid Until:</span>
                            <p className="font-medium">{cert.validUntil}</p>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Skills Validated:</p>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {cert.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{cert.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Credential ID */}
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Credential ID: {cert.credentialId}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 group/btn">
                          <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Verify
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 group/btn">
                          <Download className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Certificate
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group/btn"
                        onClick={() => onNavigate('certification-detail')}
                      >
                        View Details
                        <Calendar className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-4">Certification Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A breakdown of my certifications by category and level, demonstrating comprehensive expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-primary mb-2">Cloud Computing</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {allCertifications.filter(cert => cert.category === 'Cloud Computing').length}
                  </p>
                  <p className="text-muted-foreground text-sm">AWS, Google Cloud</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <TrendingUp className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-primary mb-2">DevOps</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {allCertifications.filter(cert => cert.category === 'DevOps').length}
                  </p>
                  <p className="text-muted-foreground text-sm">Kubernetes, Docker</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-primary mb-2">Professional Level</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {allCertifications.filter(cert => cert.level === 'Professional').length}
                  </p>
                  <p className="text-muted-foreground text-sm">Advanced certifications</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-primary mb-2">Currently Valid</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {validCertifications.length}
                  </p>
                  <p className="text-muted-foreground text-sm">Active credentials</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-primary">Validated Expertise You Can Trust</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These certifications represent my commitment to excellence and continuous learning. 
              Ready to bring this validated expertise to your next project?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('contact')}
                className="group"
              >
                Start a Conversation
                <Calendar className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('projects')}
              >
                View My Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}