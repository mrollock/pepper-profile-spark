import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuizSection } from '@/components/sections/QuizSection';
import { FrameworkSection } from '@/components/sections/FrameworkSection';
import { ConditionsSection } from '@/components/sections/ConditionsSection';
import { InterventionSection } from '@/components/sections/InterventionSection';

import { SpeakingSection } from '@/components/sections/SpeakingSection';
import { BookSection } from '@/components/sections/BookSection';
import { ResourcesSection } from '@/components/sections/ResourcesSection';
import { RootsResearchSection } from '@/components/sections/RootsResearchSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ConnectSection } from '@/components/sections/ConnectSection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <QuizSection />
        <FrameworkSection />
        <ConditionsSection />
        <InterventionSection />
        <RootsResearchSection />
        <SpeakingSection />
        <BookSection />
        <ResourcesSection />
        <AboutSection />
        <ConnectSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
