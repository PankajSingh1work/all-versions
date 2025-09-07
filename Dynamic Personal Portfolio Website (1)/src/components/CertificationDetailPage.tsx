import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ExternalLink, 
  Download, 
  Calendar, 
  Award,
  CheckCircle,
  ArrowLeft,
  Share,
  Clock,
  Target,
  BookOpen,
  Users,
  Globe,
  Shield
} from 'lucide-react';

// This would typically come from props or URL params
const certificationData = {
  id: 1,
  title: 'AWS Solutions Architect Professional',
  subtitle: 'Advanced Cloud Architecture Certification',
  issuer: 'Amazon Web Services',
  logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop',
  date: '2024',
  validUntil: '2027',
  credentialId: 'AWS-SAP-123456',
  status: 'Valid',
  level: 'Professional',
  category: 'Cloud Computing',
  featured: true,
  verificationUrl: 'https://aws.amazon.com/verification/SAP123456',
  certificateUrl: '#',
  description: 'The AWS Certified Solutions Architect Professional certification validates advanced technical skills and experience in designing distributed systems on the AWS platform. This certification demonstrates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
  fullDescription: `The AWS Certified Solutions Architect Professional certification is designed for individuals who perform a solutions architect role and have two or more years of hands-on experience managing and operating systems on AWS.

This certification validates an examinee's ability to:
• Design and deploy dynamically scalable, highly available, fault-tolerant, and reliable applications on AWS
• Select appropriate AWS services to design and deploy an application based on given requirements
• Migrate complex, multi-tier applications on AWS
• Design and deploy enterprise-wide scalable operations on AWS

The exam covers a broad set of AWS services and follows a scenario-based approach that tests your ability to think through problems and choose the best architectural approach for given requirements.`,
  skills: [
    { name: 'Cloud Architecture', proficiency: 95 },
    { name: 'AWS Services', proficiency: 90 },
    { name: 'System Design', proficiency: 92 },
    { name: 'Security', proficiency: 88 },
    { name: 'Cost Optimization', proficiency: 85 },
    { name: 'High Availability', proficiency: 93 },
    { name: 'Disaster Recovery', proficiency: 87 },
    { name: 'Migration Strategies', proficiency: 89 }
  ],
  examDetails: {
    duration: '170 minutes',
    questions: '75 questions',
    format: 'Multiple choice and multiple response',
    passingScore: '750/1000',
    cost: '$300 USD',
    languages: ['English', 'Japanese', 'Korean', 'Simplified Chinese']
  },
  domains: [
    {
      name: 'Design for Organizational Complexity',
      weight: '12.5%',
      description: 'Design network connectivity strategies and multi-account AWS environments',
      topics: [
        'Cross-account authentication and access strategy',
        'Networks (e.g., VPN, AWS Direct Connect, AWS Transit Gateway)',
        'Multi-account AWS environments'
      ]
    },
    {
      name: 'Design for New Solutions',
      weight: '31%',
      description: 'Design a deployment strategy and solution architecture',
      topics: [
        'Deployment strategies for business requirements',
        'Architectural design patterns',
        'Migration and modernization strategies'
      ]
    },
    {
      name: 'Migration Planning',
      weight: '15%',
      description: 'Select migration tools and strategies for complex architectures',
      topics: [
        'Migration tools and services',
        'Migration strategies (e.g., 6 Rs)',
        'Database migration strategies'
      ]
    },
    {
      name: 'Cost Control',
      weight: '12.5%',
      description: 'Select a cost-effective resource allocation strategy',
      topics: [
        'Cost optimization strategies',
        'Resource allocation and right sizing',
        'Cost monitoring and alerting'
      ]
    },
    {
      name: 'Continuous Improvement',
      weight: '29%',
      description: 'Troubleshoot solution architectures and improve architectures',
      topics: [
        'Troubleshooting and remediation',
        'Performance optimization',
        'Reliability and resilience'
      ]
    }
  ],
  preparationPath: [
    {
      step: 'Prerequisites',
      description: 'AWS Certified Solutions Architect Associate certification',
      completed: true
    },
    {
      step: 'Study Materials',
      description: 'AWS documentation, whitepapers, and training courses',
      completed: true
    },
    {
      step: 'Hands-on Practice',
      description: '2+ years of AWS architecture experience',
      completed: true
    },
    {
      step: 'Practice Exams',
      description: 'Multiple practice tests and scenario reviews',
      completed: true
    },
    {
      step: 'Certification Exam',
      description: 'Passed the SAP-C02 exam with score 892/1000',
      completed: true
    }
  ],
  relatedCertifications: [
    {
      title: 'AWS Certified DevOps Engineer Professional',
      status: 'Planned',
      description: 'Advanced DevOps practices on AWS'
    },
    {
      title: 'AWS Certified Security Specialty',
      status: 'Considering',
      description: 'Specialized security knowledge for AWS'
    }
  ],
  projects: [
    'Multi-region application architecture for DataTech Solutions',
    'Cloud migration strategy for e-commerce platform',
    'Disaster recovery implementation for financial services client'
  ],
  benefits: [
    'Validates advanced AWS architecture skills',
    'Demonstrates ability to design complex systems',
    'Industry recognition for cloud expertise',
    'Enhanced career opportunities',
    'Higher earning potential',
    'Access to AWS professional community'
  ]
};

interface CertificationDetailPageProps {
  onNavigate: (page: string) => void;
}

export function CertificationDetailPage({ onNavigate }: CertificationDetailPageProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => onNavigate('certifications')}
              className="mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Certifications
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Certification Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline">{certificationData.category}</Badge>
                  <Badge variant="outline">{certificationData.level}</Badge>
                  <Badge variant={certificationData.status === 'Valid' ? 'default' : 'secondary'}>
                    {certificationData.status}
                  </Badge>
                  {certificationData.featured && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-none">
                      Featured
                    </Badge>
                  )}
                </div>

                <div>
                  <h1 className="text-primary mb-4">{certificationData.title}</h1>
                  <p className="text-xl text-secondary mb-4">{certificationData.subtitle}</p>
                  <p className="text-muted-foreground">{certificationData.description}</p>
                </div>

                {/* Certification Meta */}
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Issuer:</span>
                      <span className="font-medium">{certificationData.issuer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Earned:</span>
                      <span className="font-medium">{certificationData.date}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Valid Until:</span>
                      <span className="font-medium">{certificationData.validUntil}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Credential ID:</span>
                      <span className="font-medium text-xs">{certificationData.credentialId}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="group">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Verify Certificate
                  </Button>
                  <Button variant="outline" size="lg" className="group">
                    <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Download PDF
                  </Button>
                  <Button variant="ghost" size="lg" className="group">
                    <Share className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Certificate Visual */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <Card className="overflow-hidden shadow-2xl">
                    <CardContent className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-white shadow-lg">
                        <ImageWithFallback
                          src={certificationData.logo}
                          alt={certificationData.issuer}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-primary mb-2">{certificationData.title}</h3>
                      <p className="text-muted-foreground mb-4">{certificationData.issuer}</p>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">John Doe</p>
                        <p className="text-muted-foreground">Certified {certificationData.date}</p>
                        <p className="text-muted-foreground">Valid until {certificationData.validUntil}</p>
                      </div>
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Credential ID: {certificationData.credentialId}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="exam">Exam Details</TabsTrigger>
              <TabsTrigger value="path">My Journey</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8 space-y-12">
              {/* Detailed Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">About This Certification</h2>
                    <div className="prose prose-neutral max-w-none">
                      {certificationData.fullDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Certification Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certificationData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Applied Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Real-World Applications</h2>
                    <p className="text-muted-foreground mb-6">
                      I've applied the knowledge from this certification in several professional projects:
                    </p>
                    <div className="space-y-3">
                      {certificationData.projects.map((project, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <Target className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{project}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Validated Skills & Competencies</h2>
                    <div className="space-y-6">
                      {certificationData.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-primary">{skill.name}</h4>
                            <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                          </div>
                          <Progress value={skill.proficiency} className="h-3" />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Related Certifications</h2>
                    <div className="space-y-4">
                      {certificationData.relatedCertifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <h4 className="text-primary">{cert.title}</h4>
                            <p className="text-sm text-muted-foreground">{cert.description}</p>
                          </div>
                          <Badge variant={cert.status === 'Planned' ? 'secondary' : 'outline'}>
                            {cert.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Exam Details Tab */}
            <TabsContent value="exam" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Exam Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Clock className="h-8 w-8 text-primary mb-2" />
                        <h4 className="text-primary">Duration</h4>
                        <p className="text-muted-foreground">{certificationData.examDetails.duration}</p>
                      </div>
                      <div className="space-y-2">
                        <BookOpen className="h-8 w-8 text-primary mb-2" />
                        <h4 className="text-primary">Questions</h4>
                        <p className="text-muted-foreground">{certificationData.examDetails.questions}</p>
                      </div>
                      <div className="space-y-2">
                        <Target className="h-8 w-8 text-primary mb-2" />
                        <h4 className="text-primary">Passing Score</h4>
                        <p className="text-muted-foreground">{certificationData.examDetails.passingScore}</p>
                      </div>
                      <div className="space-y-2">
                        <Award className="h-8 w-8 text-primary mb-2" />
                        <h4 className="text-primary">Format</h4>
                        <p className="text-muted-foreground">{certificationData.examDetails.format}</p>
                      </div>
                      <div className="space-y-2">
                        <Users className="h-8 w-8 text-primary mb-2" />
                        <h4 className="text-primary">Cost</h4>
                        <p className="text-muted-foreground">{certificationData.examDetails.cost}</p>
                      </div>
                      <div className="space-y-2">
                        <Globe className="h-8 w-8 text-primary mb-2" />
                        <h4 className="text-primary">Languages</h4>
                        <p className="text-muted-foreground">{certificationData.examDetails.languages.join(', ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Exam Domains</h2>
                    <div className="space-y-6">
                      {certificationData.domains.map((domain, index) => (
                        <div key={index} className="border border-border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-primary">{domain.name}</h3>
                            <Badge variant="outline">{domain.weight}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{domain.description}</p>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Key Topics:</h4>
                            <ul className="space-y-1">
                              {domain.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-center space-x-2">
                                  <div className="w-1 h-1 bg-primary rounded-full" />
                                  <span className="text-sm text-muted-foreground">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Preparation Path Tab */}
            <TabsContent value="path" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">My Certification Journey</h2>
                    <div className="space-y-6">
                      {certificationData.preparationPath.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="relative flex items-center space-x-4"
                        >
                          {/* Progress line */}
                          {index < certificationData.preparationPath.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                          )}
                          
                          {/* Step indicator */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <span className="text-sm font-semibold">{index + 1}</span>
                            )}
                          </div>
                          
                          {/* Step content */}
                          <div className="flex-1">
                            <h4 className="text-primary mb-1">{step.step}</h4>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-4">More Certifications</h2>
            <p className="text-muted-foreground">
              Explore my other professional certifications and credentials.
            </p>
          </motion.div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('certifications')}
              className="group"
            >
              View All Certifications
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}