import CinematicHero from '../sections/CinematicHero';
import StatsSection from '../sections/StatsSection';
import ServicesSection from '../sections/ServicesSection';
import PortfolioSection from '../sections/PortfolioSection';
import CTASection from '../sections/CTASection';

import '../styles/home.css';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { StatsStrip } from '../components/sections/StatsStrip';
import { Methodology } from '../components/sections/Methodology';
import { Testimonials } from '../components/sections/Testimonials';
import BrandMarquee from '../components/sections/BrandMarquee';
import { VisionCTA } from '../components/sections/VisionCTA';
import ArchSection from '../components/sections/ArchSection';
import { SectionDivider } from '../components/SectionDivider';
import { SectionReveal } from '../components/layout/SectionReveal';

export default function HomePage() {
  return (
    <main>
      <CinematicHero />
      <SectionDivider />
      <SectionReveal>
        <StatsSection />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <ServicesSection />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <ArchSection />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <PortfolioSection />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <CTASection />
      </SectionReveal>
      <SectionDivider />

      {/* Expanded Sections */}
      <SectionReveal>
        <ServicesGrid />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <SelectedWorks />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <StatsStrip />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <Methodology />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <Testimonials />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <BrandMarquee />
      </SectionReveal>
      <SectionDivider />
      <SectionReveal>
        <VisionCTA />
      </SectionReveal>
    </main>
  );
}
