import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { ContactSection } from './ContactSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <ServicesSection onNavigate={onNavigate} />
      <ProjectsSection onNavigate={onNavigate} />
      <CertificationsSection onNavigate={onNavigate} />
      <ContactSection />
    </div>
  );
}