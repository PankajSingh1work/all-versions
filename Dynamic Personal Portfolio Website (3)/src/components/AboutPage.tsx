import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code, Palette, Server, Database, Globe, Smartphone, Award, Briefcase, GraduationCap } from 'lucide-react';

const skills = [
  { 
    name: 'React & Next.js', 
    category: 'Frontend', 
    icon: Code, 
    level: 95,
    description: 'Expert-level proficiency in building modern React applications with Next.js for SSR/SSG.'
  },
  { 
    name: 'TypeScript', 
    category: 'Language', 
    icon: Code, 
    level: 90,
    description: 'Strong typing and advanced TypeScript patterns for robust application development.'
  },
  { 
    name: 'Node.js & Express', 
    category: 'Backend', 
    icon: Server, 
    level: 88,
    description: 'Full-stack server development with RESTful APIs and microservices architecture.'
  },
  { 
    name: 'UI/UX Design', 
    category: 'Design', 
    icon: Palette, 
    level: 85,
    description: 'User-centered design approach with Figma, prototyping, and design systems.'
  },
  { 
    name: 'Cloud & DevOps', 
    category: 'Infrastructure', 
    icon: Database, 
    level: 80,
    description: 'AWS, Docker, Kubernetes, and CI/CD pipeline management.'
  },
  { 
    name: 'Mobile Development', 
    category: 'Mobile', 
    icon: Smartphone, 
    level: 75,
    description: 'Cross-platform development with React Native and Flutter.'
  }
];

const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Solutions',
    period: '2022 - Present',
    location: 'San Francisco, CA',
    description: 'Leading development of enterprise web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.',
    achievements: [
      'Improved application performance by 40% through optimization',
      'Led team of 5 developers on major product redesign',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Introduced TypeScript reducing bugs by 30%'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'AWS', 'PostgreSQL', 'Docker']
  },
  {
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2020 - 2022',
    location: 'Remote',
    description: 'Built responsive web applications and mobile apps for early-stage startup. Collaborated closely with design team to implement pixel-perfect interfaces.',
    achievements: [
      'Developed mobile app with 50k+ downloads',
      'Created reusable component library',
      'Implemented real-time features with WebSocket',
      'Optimized SEO resulting in 200% traffic increase'
    ],
    technologies: ['React', 'React Native', 'Firebase', 'Tailwind CSS', 'GraphQL']
  },
  {
    title: 'Junior Web Developer',
    company: 'Digital Agency Pro',
    period: '2019 - 2020',
    location: 'Los Angeles, CA',
    description: 'Developed client websites and e-commerce solutions. Gained experience in various CMS platforms and payment integrations.',
    achievements: [
      'Delivered 25+ client projects on time',
      'Integrated Stripe payment processing',
      'Optimized websites for Core Web Vitals',
      'Maintained 98% client satisfaction rating'
    ],
    technologies: ['JavaScript', 'WordPress', 'Shopify', 'PHP', 'MySQL']
  }
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    period: '2015 - 2019',
    gpa: '3.8/4.0',
    honors: 'Magna Cum Laude',
    description: 'Focused on software engineering, algorithms, and web technologies. Active in computer science club and hackathons.',
    coursework: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'Database Systems',
      'Web Development',
      'Computer Networks',
      'Human-Computer Interaction'
    ]
  },
  {
    degree: 'Full-Stack Web Development Bootcamp',
    institution: 'General Assembly',
    period: '2019',
    certification: 'Certificate of Completion',
    description: 'Intensive 12-week program covering modern web development technologies and best practices.',
    coursework: [
      'JavaScript ES6+',
      'React & Redux',
      'Node.js & Express',
      'MongoDB',
      'Git & GitHub',
      'Agile Development'
    ]
  }
];

export function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                alt="John Doe"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-primary mb-4">About John Doe</h1>
            <p className="text-xl text-secondary mb-6">Full-Stack Developer & UI/UX Designer</p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              I'm a passionate developer with over 5 years of experience creating digital solutions 
              that make a real impact. My journey combines technical expertise with creative design, 
              resulting in applications that are both functional and beautiful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-primary mb-4">Technical Skills</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A comprehensive overview of my technical capabilities and proficiency levels.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <skill.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-primary">{skill.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {skill.category}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Proficiency</span>
                            <span className="font-medium">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-primary mb-4">Professional Experience</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My career journey and the impact I've made at various organizations.
                </p>
              </motion.div>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-1 space-y-4">
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-5 w-5 text-primary" />
                              <Badge variant="outline">{exp.period}</Badge>
                            </div>
                            <div>
                              <h3 className="text-primary mb-1">{exp.title}</h3>
                              <p className="text-secondary font-medium">{exp.company}</p>
                              <p className="text-muted-foreground text-sm">{exp.location}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="lg:col-span-2 space-y-4">
                            <p className="text-muted-foreground">{exp.description}</p>
                            <div>
                              <h4 className="text-primary mb-3">Key Achievements:</h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-muted-foreground text-sm">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-primary mb-4">Education & Learning</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My academic background and commitment to continuous learning.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs">
                              {edu.period}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-primary mb-2">{edu.degree}</h3>
                          <p className="text-secondary font-medium mb-1">{edu.institution}</p>
                          {edu.gpa && (
                            <p className="text-muted-foreground text-sm">GPA: {edu.gpa}</p>
                          )}
                          {edu.honors && (
                            <Badge variant="secondary" className="text-xs mt-2">
                              {edu.honors}
                            </Badge>
                          )}
                        </div>

                        <p className="text-muted-foreground text-sm">{edu.description}</p>

                        <div>
                          <h4 className="text-primary mb-3 text-sm">Relevant Coursework:</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course) => (
                              <Badge key={course} variant="outline" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}