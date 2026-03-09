import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { MatrixSection } from '@/components/sections/MatrixSection';
import { QuizSection } from '@/components/sections/QuizSection';
import { FrameworkSection } from '@/components/sections/FrameworkSection';
import { ConditionsSection } from '@/components/sections/ConditionsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { InterventionSection } from '@/components/sections/InterventionSection';
import { EvidenceSection } from '@/components/sections/EvidenceSection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { HooksBridgeSection } from '@/components/sections/HooksBridgeSection';
import { SpeakingSection } from '@/components/sections/SpeakingSection';
import { BookSection } from '@/components/sections/BookSection';
import { ResourcesSection } from '@/components/sections/ResourcesSection';
import { RootsResearchSection } from '@/components/sections/RootsResearchSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { LineageSection } from '@/components/sections/LineageSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { ConnectSection } from '@/components/sections/ConnectSection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  // Ensure page loads at the top (handles browser scroll restoration)
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <MatrixSection />
        <QuizSection />
        <FrameworkSection />
        <ConditionsSection />
        <HowItWorksSection />
        <InterventionSection />
        <EvidenceSection />
        <AudienceSection />
        <HooksBridgeSection />
        <RootsResearchSection />
        <SpeakingSection />
        <BookSection />
        <ResourcesSection />
        <AboutSection />
        <LineageSection />
        <TestimonialSection />
        <ConnectSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
