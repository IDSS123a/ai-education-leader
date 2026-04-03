import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { BooksSection } from "@/components/BooksSection";
import { AISBPSection } from "@/components/AISBPSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { VolunteeringSection } from "@/components/VolunteeringSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { ParticleBackground } from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <BooksSection />
        <AISBPSection />
        <PortfolioSection />
        <VolunteeringSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
