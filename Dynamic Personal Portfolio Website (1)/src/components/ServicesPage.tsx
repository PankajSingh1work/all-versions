import { useState, useEffect } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { servicesApi, Service } from '../lib/supabase';
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
  Shield,
  Loader2
} from 'lucide-react';

// Icon mapping for services
const serviceIcons: Record<string, any> = {
  'Web Development': Code,
  'UI/UX Design': Palette,
  'Mobile Development': Smartphone,
  'Consulting': TrendingUp,
  'Digital Consulting': TrendingUp
};

// Generic process steps for all services
const genericProcess = [
  { step: 'Discovery', description: 'Understanding your requirements and goals' },
  { step: 'Planning', description: 'Strategy development and project roadmap' },
  { step: 'Execution', description: 'Implementation with regular updates' },
  { step: 'Testing', description: 'Quality assurance and optimization' },
  { step: 'Delivery', description: 'Launch and ongoing support' }
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
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const servicesData = await servicesApi.getAll();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading services...</span>
        </div>
      </div>
    );
  }

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
                <span>{services.length} Services Available</span>
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
            {services.filter(service => service && service.id).map((service, index) => (
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
                      src={service.image_url || 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'}
                      alt={service.title || 'Service'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center space-x-3 mb-2">
                        {React.createElement(serviceIcons[service.category] || Code, { className: "h-8 w-8" })}
                        <div>
                          <h3 className="text-white">{service.title}</h3>
                          <p className="text-white/80 text-sm">{service.category}</p>
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
                        {(service.features || []).map((feature) => (
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
                        {(service.tools || []).map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
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

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {genericProcess.map((step, index) => (
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
                  {index < genericProcess.length - 1 && (
                    <div className="hidden md:block absolute left-full top-1/2 w-full h-0.5 bg-border -translate-y-1/2" />
                  )}
                </div>
                <h4 className="text-primary mb-2">{step.step}</h4>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
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