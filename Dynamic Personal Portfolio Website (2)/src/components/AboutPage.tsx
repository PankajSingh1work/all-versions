import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code, Palette, Server, Database, Globe, Smartphone, Award, Briefcase, GraduationCap } from 'lucide-react';
import { aboutApi, AboutData } from '../lib/supabase';

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'Frontend': Code,
  'Backend': Server,
  'Languages': Code,
  'Database': Database,
  'DevOps': Globe,
  'Design': Palette,
  'Mobile': Smartphone,
  'Tools': Code,
  'Infrastructure': Database
};

export function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await aboutApi.get();
        setAboutData(data);
      } catch (error) {
        console.error('Failed to load about data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAboutData();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load about page data.</p>
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
            className="text-center mb-16"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto mb-8">
              <ImageWithFallback
                src={aboutData.personal_info.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"}
                alt={aboutData.personal_info.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-primary mb-4">About {aboutData.personal_info.name}</h1>
            <p className="text-xl text-secondary mb-6">{aboutData.personal_info.title}</p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {aboutData.personal_info.bio}
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
                {aboutData.skills.map((skill, index) => {
                  const IconComponent = categoryIcons[skill.category] || Code;
                  return (
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
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="text-primary">{skill.name}</h3>
                                <Badge variant="secondary" className="text-xs">
                                  {skill.category}
                                </Badge>
                              </div>
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
                  );
                })}
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
                {aboutData.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                          {/* Left Side - Company Info & Meta */}
                          <div className="lg:w-1/3 space-y-4">
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-5 w-5 text-primary" />
                              <Badge variant="outline">{exp.duration}</Badge>
                              {exp.current && (
                                <Badge variant="default" className="text-xs">Current</Badge>
                              )}
                            </div>
                            <div>
                              <h3 className="text-primary mb-1">{exp.position}</h3>
                              <p className="text-secondary font-medium">{exp.company}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {/* Right Side - Description */}
                          <div className="lg:w-2/3 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
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
                {aboutData.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
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
                              {edu.duration}
                            </Badge>
                            {edu.current && (
                              <Badge variant="default" className="text-xs ml-2">Current</Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-primary mb-2">{edu.degree}</h3>
                          <p className="text-secondary font-medium mb-1">{edu.institution}</p>
                          {edu.field && (
                            <p className="text-muted-foreground text-sm">{edu.field}</p>
                          )}
                          {edu.gpa && (
                            <p className="text-muted-foreground text-sm">GPA: {edu.gpa}</p>
                          )}
                        </div>

                        {edu.description && (
                          <p className="text-muted-foreground text-sm">{edu.description}</p>
                        )}
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