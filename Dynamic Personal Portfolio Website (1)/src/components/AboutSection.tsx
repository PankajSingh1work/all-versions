import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code, Palette, Server, Database, Globe, Smartphone } from 'lucide-react';

const skills = [
  { name: 'React', category: 'Frontend', icon: Code, level: 95 },
  { name: 'Next.js', category: 'Frontend', icon: Globe, level: 90 },
  { name: 'TypeScript', category: 'Language', icon: Code, level: 88 },
  { name: 'Node.js', category: 'Backend', icon: Server, level: 85 },
  { name: 'UI/UX Design', category: 'Design', icon: Palette, level: 80 },
  { name: 'Firebase', category: 'Database', icon: Database, level: 85 },
  { name: 'Mobile Dev', category: 'Mobile', icon: Smartphone, level: 75 },
];

const education = [
  {
    year: '2020-2024',
    degree: 'Bachelor of Computer Science',
    institution: 'University of Technology',
    description: 'Graduated Magna Cum Laude with focus on Software Engineering and Web Development.'
  },
  {
    year: '2023',
    degree: 'Full-Stack Web Development Bootcamp',
    institution: 'Code Academy',
    description: 'Intensive 6-month program covering modern web technologies and best practices.'
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-primary mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know me better through my journey, skills, and passion for technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-primary mb-2">Hello, I'm John!</h3>
                <p className="text-muted-foreground">
                  Full-Stack Developer based in San Francisco
                </p>
              </div>
            </div>
            
            <div className="space-y-4 text-foreground">
              <p>
                I'm a passionate full-stack developer with over 4 years of experience creating 
                digital solutions that make a difference. My journey began with a curiosity about 
                how websites work, and it has evolved into a career dedicated to crafting exceptional 
                user experiences.
              </p>
              <p>
                I specialize in modern web technologies including React, Next.js, and Node.js, 
                with a strong focus on performance, accessibility, and user-centric design. 
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or enjoying a good cup of coffee.
              </p>
              <p>
                I believe in the power of collaboration and continuous learning. Every project 
                is an opportunity to grow, innovate, and create something meaningful.
              </p>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-primary">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <skill.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-primary text-center">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="text-xs">
                          {edu.year}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-primary mb-2">{edu.degree}</h4>
                        <p className="text-secondary mb-3">{edu.institution}</p>
                        <p className="text-muted-foreground text-sm">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}