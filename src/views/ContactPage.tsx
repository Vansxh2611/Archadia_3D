import '../styles/contact.css';
import { ContactStudioPanel } from '../components/sections/ContactStudioPanel';
import { ContactFormPanel } from '../components/sections/ContactFormPanel';
import { ContactGuarantees } from '../components/sections/ContactGuarantees';

import { SectionReveal } from '../components/layout/SectionReveal';
import { SectionDivider } from '../components/SectionDivider';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Contact Hero */}
      <section className="relative min-h-[45vh] flex items-end pb-12 overflow-hidden bg-white" aria-labelledby="contact-hero-title">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.05] blur-[150px]"
          style={{ background: 'radial-gradient(circle, #E6C383 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />

        <div className="container-luxury relative z-10 pt-32">
          <div>
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
              Get In Touch
            </span>
            <h1
              id="contact-hero-title"
              className="font-sora font-bold text-white leading-[0.95] mb-4"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
            >
              Start a{' '}
              <span className="gradient-gold">Conversation</span>
            </h1>
            <p className="font-inter text-[#B8B8B8] text-lg max-w-xl leading-relaxed">
              Every great project starts with a single conversation. Tell us about your vision and we'll bring it to life.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Redesigned Grid Panels Section */}
      <div className="contact-page">
        <SectionReveal>
          <div className="contact-page__grid">
            <ContactStudioPanel />
            <ContactFormPanel />
          </div>
        </SectionReveal>

        <SectionDivider />

        <SectionReveal>
          <ContactGuarantees />
        </SectionReveal>
      </div>
    </main>
  );
}
