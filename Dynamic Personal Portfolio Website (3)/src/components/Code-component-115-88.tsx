import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'john.doe@example.com',
    href: 'mailto:john.doe@example.com',
    description: 'Best for detailed project discussions',
    available: '24/7'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    description: 'Quick questions and consultations',
    available: 'Mon-Fri, 9AM-6PM PST'
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (555) 123-4567',
    href: 'https://wa.me/15551234567',
    description: 'Instant messaging and quick updates',
    available: 'Mon-Sat, 8AM-8PM PST'
  },
  {
    icon: Calendar,
    label: 'Schedule a Call',
    value: 'Book a meeting',
    href: '#',
    description: 'In-depth project discussions',
    available: 'By appointment'
  }
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/johndoe',
    username: '@johndoe',
    description: 'Check out my latest projects and contributions'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/johndoe',
    username: 'John Doe',
    description: 'Professional network and career updates'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/johndoe',
    username: '@johndoe',
    description: 'Tech insights and industry discussions'
  }
];

const projectTypes = [
  'Web Application',
  'Mobile App',
  'E-commerce Site',
  'Portfolio Website',
  'API Development',
  'UI/UX Design',
  'Consulting',
  'Other'
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Not sure yet'
];

const timelines = [
  'ASAP',
  '1-2 weeks',
  '1 month',
  '2-3 months',
  '3-6 months',
  '6+ months',
  'Flexible'
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after success animation
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

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
            <h1 className="text-primary mb-6">Let's Work Together</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready to bring your ideas to life? I'd love to hear about your project and discuss 
              how we can create something amazing together. Get in touch using any of the methods below.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Quick Response Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Remote-Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Free Consultation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the communication method that works best for you. I'm here to help and respond promptly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <method.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-primary mb-2">{method.label}</h3>
                      <p className="font-medium mb-2">{method.value}</p>
                      <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                      <p className="text-xs text-muted-foreground">{method.available}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden">
                <CardContent className="p-8">
                  {!isSubmitted ? (
                    <>
                      <div className="mb-8">
                        <h3 className="text-primary mb-2">Send me a detailed message</h3>
                        <p className="text-muted-foreground">
                          The more details you provide, the better I can understand your project and provide an accurate estimate.
                        </p>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="company">Company (Optional)</Label>
                            <Input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-4">
                          <h4 className="text-primary">Project Details</h4>
                          
                          <div className="space-y-2">
                            <Label>Project Type *</Label>
                            <Select onValueChange={(value) => handleSelectChange('projectType', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Budget Range</Label>
                              <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                                <SelectContent>
                                  {budgetRanges.map((range) => (
                                    <SelectItem key={range} value={range}>
                                      {range}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Timeline</Label>
                              <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timelines.map((timeline) => (
                                    <SelectItem key={timeline} value={timeline}>
                                      {timeline}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Project Description *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Please describe your project in detail. Include features, requirements, and any specific technologies you'd like to use."
                            className="transition-all duration-200 focus:scale-105 resize-none"
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                          ) : (
                            <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          )}
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          I typically respond within 24 hours. All information is kept confidential.
                        </p>
                      </form>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-primary mb-4">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out! I've received your message and will get back to you within 24 hours. 
                        I'm excited to learn more about your project.
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>What happens next:</p>
                        <ul className="space-y-1">
                          <li>• I'll review your project details</li>
                          <li>• We'll schedule a call to discuss further</li>
                          <li>• I'll provide a detailed proposal</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-primary mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:john.doe@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                            john.doe@example.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                            +1 (555) 123-4567
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <p className="text-muted-foreground">Mon-Fri: 9AM-6PM PST</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-primary">Connect on Social Media</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <social.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{social.label}</p>
                          <p className="text-sm text-muted-foreground">{social.username}</p>
                          <p className="text-xs text-muted-foreground">{social.description}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-primary mb-4">Location</h3>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">San Francisco Bay Area</p>
                      <p className="text-sm text-muted-foreground">Available for remote work worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about working together and my development process.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What's your typical response time?",
                answer: "I typically respond to emails within 24 hours during business days. For urgent matters, feel free to call or text me directly."
              },
              {
                question: "Do you work with clients internationally?",
                answer: "Yes! I work with clients worldwide. I'm flexible with time zones and use various communication tools to ensure smooth collaboration."
              },
              {
                question: "What information do you need to provide a quote?",
                answer: "The more details you can provide about your project, the more accurate my estimate will be. Include features, timeline, budget range, and any specific requirements."
              },
              {
                question: "Do you offer maintenance and support?",
                answer: "Yes, I provide ongoing maintenance and support packages for all projects. This includes updates, bug fixes, and feature enhancements."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-primary mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}