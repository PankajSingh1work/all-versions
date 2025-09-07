import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Code, 
  Palette, 
  Smartphone, 
  TrendingUp, 
  CheckCircle, 
  Star,
  Quote,
  ArrowRight,
  Globe,
  Zap,
  Shield
} from 'lucide-react';

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Custom Web Applications',
    description: 'Build modern, scalable web applications using cutting-edge technologies. From single-page applications to complex enterprise solutions.',
    image: 'https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTY2NDIxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Code,
    features: [
      'React/Next.js Applications',
      'Full-Stack Development',
      'API Integration',
      'Database Design',
      'Performance Optimization',
      'SEO Implementation'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    pricing: {
      basic: { name: 'Basic Website', price: '$2,500', duration: '2-3 weeks' },
      standard: { name: 'Advanced Web App', price: '$5,000', duration: '4-6 weeks' },
      premium: { name: 'Enterprise Solution', price: '$10,000+', duration: '8-12 weeks' }
    },
    process: [
      { step: 'Discovery', description: 'Understanding your requirements and goals' },
      { step: 'Planning', description: 'Architecture design and project roadmap' },
      { step: 'Development', description: 'Agile development with regular updates' },  
      { step: 'Testing', description: 'Comprehensive testing and optimization' },
      { step: 'Deployment', description: 'Launch and monitoring setup' }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'User-Centered Design',
    description: 'Create intuitive and engaging user experiences through research-driven design. From wireframes to high-fidelity prototypes.',
    image: 'https://images.unsplash.com/photo-1550335865-16a340d45467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMFVYJTIwZGVzaWduJTIwY3JlYXRpdmUlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2NjM5Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Palette,
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design Systems',
      'Usability Testing',
      'Responsive Design',
      'Design Documentation'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'InVision', 'Miro', 'UserTesting'],
    pricing: {
      basic: { name: 'Design Audit', price: '$1,500', duration: '1 week' },
      standard: { name: 'Complete Redesign', price: '$3,500', duration: '3-4 weeks' },
      premium: { name: 'Design System', price: '$7,000', duration: '6-8 weeks' }
    },
    process: [
      { step: 'Research', description: 'User interviews and competitive analysis' },
      { step: 'Ideation', description: 'Brainstorming and concept development' },
      { step: 'Design', description: 'Wireframes, mockups, and prototypes' },
      { step: 'Testing', description: 'User testing and iteration' },
      { step: 'Handoff', description: 'Design system and developer handoff' }
    ]
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    subtitle: 'Cross-Platform Apps',
    description: 'Develop high-performance mobile applications for iOS and Android using React Native and Flutter frameworks.',
    image: 'https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzU2NTQ1MTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Smartphone,
    features: [
      'React Native Development',
      'Flutter Applications',
      'Native Performance',
      'App Store Deployment',
      'Push Notifications',
      'Offline Functionality'
    ],
    technologies: ['React Native', 'Flutter', 'Expo', 'Firebase', 'Redux', 'Native APIs'],
    pricing: {
      basic: { name: 'Simple App', price: '$4,000', duration: '4-5 weeks' },
      standard: { name: 'Feature-Rich App', price: '$8,000', duration: '6-8 weeks' },
      premium: { name: 'Enterprise App', price: '$15,000+', duration: '10-14 weeks' }
    },
    process: [
      { step: 'Strategy', description: 'Platform selection and feature planning' },
      { step: 'Design', description: 'Mobile-first UI/UX design' },
      { step: 'Development', description: 'Cross-platform app development' },
      { step: 'Testing', description: 'Device testing and optimization' },
      { step: 'Launch', description: 'App store submission and marketing' }
    ]
  },
  {
    id: 'consulting',
    title: 'Digital Consulting',
    subtitle: 'Strategic Guidance',
    description: 'Strategic guidance on digital transformation, technology selection, and project planning to accelerate your business growth.',
    image: 'https://images.unsplash.com/photo-1582004531564-50f300aae039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwY29uc3VsdGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjYzOTI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: TrendingUp,
    features: [
      'Technology Assessment',
      'Digital Strategy Planning',
      'Process Optimization',
      'Team Training',
      'Architecture Review',
      'Performance Auditing'
    ],
    technologies: ['Various', 'Depends on Project', 'Best Practices', 'Industry Standards'],
    pricing: {
      basic: { name: 'Strategy Session', price: '$500', duration: '2 hours' },
      standard: { name: 'Tech Audit', price: '$2,000', duration: '1 week' },
      premium: { name: 'Digital Transformation', price: '$5,000+', duration: '4-6 weeks' }
    },
    process: [
      { step: 'Assessment', description: 'Current state analysis and evaluation' },
      { step: 'Strategy', description: 'Roadmap and recommendation development' },
      { step: 'Planning', description: 'Implementation timeline and milestones' },
      { step: 'Execution', description: 'Guided implementation support' },
      { step: 'Review', description: 'Progress monitoring and optimization' }
    ]
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'John delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612c8e5?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager, InnovateCorp',
    content: 'Working with John was a game-changer for our mobile app. His React Native skills and project management made the process seamless.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, Growth Co.',
    content: 'The UI/UX redesign John provided transformed our user engagement. Our conversion rates increased by 40% after the launch.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
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
            <h1 className="text-primary mb-6">Professional Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive digital solutions to transform your ideas into exceptional digital experiences. 
              From web development to strategic consulting, I provide end-to-end services tailored to your needs.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>50+ Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center space-x-3 mb-2">
                        <service.icon className="h-8 w-8" />
                        <div>
                          <h3 className="text-white">{service.title}</h3>
                          <p className="text-white/80 text-sm">{service.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 space-y-6">
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-primary">Key Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-primary">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-primary">Pricing Options:</h4>
                      <div className="space-y-3">
                        {Object.values(service.pricing).map((plan) => (
                          <div key={plan.name} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">{plan.name}</p>
                              <p className="text-sm text-muted-foreground">{plan.duration}</p>
                            </div>
                            <p className="font-semibold text-primary">{plan.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full group/btn" onClick={() => onNavigate('contact')}>
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-4">My Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured approach that ensures quality deliverables and transparent communication throughout the project.
            </p>
          </motion.div>

          <Tabs defaultValue="web-development" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <TabsTrigger key={service.id} value={service.id} className="text-xs lg:text-sm">
                  {service.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {service.process.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                        <span className="text-primary font-semibold">{index + 1}</span>
                        {index < service.process.length - 1 && (
                          <div className="hidden md:block absolute left-full top-1/2 w-full h-0.5 bg-border -translate-y-1/2" />
                        )}
                      </div>
                      <h4 className="text-primary mb-2">{step.step}</h4>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-4">Client Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 space-y-6">
                    <Quote className="h-8 w-8 text-primary/20" />
                    
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-muted-foreground italic">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-primary-foreground">Ready to Start Your Project?</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Let's discuss your project requirements and create something amazing together. 
              Get in touch for a free consultation and project estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => onNavigate('contact')}
                className="group"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('projects')}
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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