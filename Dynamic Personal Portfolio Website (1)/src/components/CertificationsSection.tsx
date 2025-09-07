import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Calendar, Award, ArrowRight } from 'lucide-react';

const certifications = [
  {
    id: 1,
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    validUntil: '2027',
    logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
    description: 'Validates expertise in designing distributed systems on AWS',
    skills: ['Cloud Architecture', 'AWS Services', 'System Design'],
    credentialId: 'AWS-SA-12345',
    status: 'Valid'
  },
  {
    id: 2,
    title: 'Google Professional Cloud Developer',
    issuer: 'Google Cloud',
    date: '2023',
    validUntil: '2025',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    description: 'Demonstrates proficiency in developing scalable applications',
    skills: ['Google Cloud Platform', 'Kubernetes', 'DevOps'],
    credentialId: 'GCP-CD-67890',
    status: 'Valid'
  },
  {
    id: 3,
    title: 'React Developer Certification',
    issuer: 'Meta',
    date: '2023',
    validUntil: 'Lifetime',
    logo: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=100&h=100&fit=crop',
    description: 'Advanced React development skills and best practices',
    skills: ['React.js', 'JavaScript', 'Frontend Development'],
    credentialId: 'META-REACT-11223',
    status: 'Valid'
  },
  {
    id: 4,
    title: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022',
    validUntil: '2025',
    logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&h=100&fit=crop',
    description: 'Expertise in Kubernetes cluster administration',
    skills: ['Kubernetes', 'Container Orchestration', 'DevOps'],
    credentialId: 'CKA-44556',
    status: 'Valid'
  }
];

interface CertificationsSectionProps {
  onNavigate: (page: string) => void;
}

export function CertificationsSection({ onNavigate }: CertificationsSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-primary mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        {/* Horizontal scroll container for mobile, grid for desktop */}
        <div className="overflow-x-auto pb-4 mb-8 lg:overflow-visible lg:pb-0">
          <div className="flex space-x-6 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-6 lg:space-x-0">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 lg:w-auto"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6 space-y-6">
                    {/* Header with logo and status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                          <ImageWithFallback
                            src={cert.logo}
                            alt={cert.issuer}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-primary leading-tight">{cert.title}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={cert.status === 'Valid' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {cert.status}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-primary">Skills Validated:</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Date info */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Earned {cert.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>Valid until {cert.validUntil}</span>
                      </div>
                    </div>

                    {/* Credential ID */}
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Credential ID: {cert.credentialId}
                      </p>
                    </div>

                    {/* Action button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group/btn"
                      onClick={() => onNavigate('certification-detail')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => onNavigate('certifications')}
            className="group"
          >
            View All Certifications
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}