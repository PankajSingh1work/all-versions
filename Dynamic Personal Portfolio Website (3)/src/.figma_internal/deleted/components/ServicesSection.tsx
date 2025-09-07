import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code, Palette, Smartphone, TrendingUp, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. Focus on performance, scalability, and user experience.',
    image: 'https://images.unsplash.com/photo-1728598909887-2d983a8889b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMG9mZmljZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTY2MzkyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Code,
    features: ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Cross-browser Compatible']
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design solutions that prioritize usability and aesthetics. From wireframes to high-fidelity prototypes and design systems.',
    image: 'https://images.unsplash.com/photo-1550335865-16a340d45467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMFVYJTIwZGVzaWduJTIwY3JlYXRpdmUlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2NjM5Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Palette,
    features: ['User Research', 'Prototyping', 'Design Systems', 'Usability Testing']
  },
  {
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications using React Native and Flutter. Native performance with shared codebase efficiency.',
    image: 'https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzU2NTQ1MTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Smartphone,
    features: ['Cross-platform', 'Native Performance', 'App Store Deployment', 'Push Notifications']
  },
  {
    title: 'Digital Consulting',
    description: 'Strategic guidance on digital transformation, technology stack selection, and project planning to help businesses grow online.',
    image: 'https://images.unsplash.com/photo-1582004531564-50f300aae039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwY29uc3VsdGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjYzOTI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: TrendingUp,
    features: ['Strategy Planning', 'Tech Stack Selection', 'Process Optimization', 'Growth Analysis']
  }
];

interface ServicesSectionProps {
  onNavigate: (page: string) => void;
}

export function ServicesSection({ onNavigate }: ServicesSectionProps) {
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
          <h2 className="text-primary mb-4">Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business thrive in the modern world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
                    <service.icon className="h-6 w-6" />
                    <h3 className="text-white">{service.title}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-primary">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full group/btn"
                    onClick={() => onNavigate('services')}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
            onClick={() => onNavigate('services')}
            className="group"
          >
            View All Services
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}