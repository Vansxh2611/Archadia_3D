'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { TESTIMONIALS, CLIENT_LOGOS } from '../utils/data';
import ClientLogoWall from '../sections/ClientLogoWall';
import '../styles/clients.css';

const CLIENT_DETAILS = [
  { name: 'LODHA GROUP', type: 'Real Estate Developer', country: 'India', projects: 4 },
  { name: 'DLF LIMITED', type: 'Property Developer', country: 'India', projects: 7 },
  { name: 'GODREJ PROPERTIES', type: 'Real Estate Developer', country: 'India', projects: 3 },
  { name: 'TATA REALTY', type: 'Luxury Real Estate', country: 'India', projects: 5 },
  { name: 'OBEROI REALTY', type: 'Premium Residential', country: 'India', projects: 2 },
  { name: 'SOBHA DEVELOPERS', type: 'Quality Construction', country: 'India', projects: 6 },
  { name: 'PRESTIGE GROUP', type: 'Mixed-Use Developer', country: 'India', projects: 3 },
  { name: 'BRIGADE GROUP', type: 'Property Developer', country: 'India', projects: 9 },
];

const STATS = [
  { value: '35+', label: 'Clients in India' },
  { value: '12+', label: 'Indian States' },
  { value: '98%', label: 'Retention Rate' },
  { value: '4.9★', label: 'Average Rating' },
];

import { SectionReveal } from '../components/layout/SectionReveal';
import { SectionDivider } from '../components/SectionDivider';

export default function ClientsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setActiveIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActiveIdx((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <main className="bg-bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden bg-bg-primary">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div
          className="absolute top-1/3 right-1/3 w-[700px] h-[500px] rounded-full opacity-[0.04] blur-[130px]"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />

        <div className="container-luxury relative z-10 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-6 block">
              Who We Work With
            </span>
            <h1
              className="font-sora font-bold text-gold leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
            >
              Trusted By{' '}
              <span className="gradient-gold">Visionaries</span>
            </h1>
            <p className="font-inter text-text-secondary text-xl max-w-xl leading-relaxed">
              We partner with India's most ambitious developers, architects, and design firms to bring extraordinary projects to life.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Stats */}
      <SectionReveal as="section" className="clients-stats bg-bg-primary">
        <div className="container-luxury">
          <div className="clients-stats__grid">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="clients-stats__card bg-[#ffffff] border border-black/[0.08]"
              >
                <div className="clients-stats__value gradient-gold">{stat.value}</div>
                <p className="clients-stats__label text-text-secondary">{stat.label}</p>
                <div className="clients-stats__card-glow" />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* Client Grid */}
      <SectionReveal as="section" className="section-padding bg-bg-primary">
        <div className="container-luxury">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4 block">
              Our Partners
            </span>
            <h2 className="font-sora font-bold text-gold" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              National Client Portfolio
            </h2>
            <div className="mt-6 h-px bg-gradient-to-r from-gold/30 via-black/5 to-transparent" />
          </motion.div>

          {/* Detailed Client Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
            {CLIENT_DETAILS.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative bg-[#ffffff] border border-black/[0.08] hover:border-gold/30 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.02] flex flex-col justify-between min-h-[190px]"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/40 via-gold to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

                <div>
                  <span className="font-sora font-bold text-gold text-xs tracking-[0.2em] block mb-3 uppercase">
                    {client.name}
                  </span>

                  <div className="flex flex-col gap-1">
                    <span className="font-inter text-text-primary text-base font-semibold group-hover:text-gold transition-colors duration-300">
                      {client.type}
                    </span>
                    <span className="font-inter text-text-secondary text-xs tracking-wider uppercase">
                      {client.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/[0.06]">
                  <span className="font-inter text-text-secondary text-xs">
                    {client.projects} project{client.projects !== 1 ? 's' : ''} Completed
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={11} className="text-gold fill-gold" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logo Wall */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo}
                className="group bg-white flex items-center justify-center p-8 transition-colors duration-300"
              >
                <span className="font-sora font-bold text-text-secondary/70 group-hover:text-gold text-xs tracking-[0.2em] text-center transition-colors duration-300">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* Testimonials */}
      <SectionReveal as="section" className="bg-bg-primary section-padding">
        <div className="container-luxury">
          <div className="mb-16 text-center">
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-6 block">
              Client Voices
            </span>
            <h2 className="font-sora font-bold text-gold" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center px-8 lg:px-16"
                >
                  <div
                    className="font-sora font-bold text-gold leading-none select-none mb-6"
                    style={{ fontSize: '120px', lineHeight: 0.8 }}
                  >
                    "
                  </div>

                  <p
                    className="font-sora font-light text-text-primary leading-relaxed mb-10"
                    style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}
                  >
                    {TESTIMONIALS[activeIdx].text}
                  </p>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-px bg-gold/50 mb-4" />
                    <span className="font-sora font-semibold text-text-primary text-base">
                      {TESTIMONIALS[activeIdx].author}
                    </span>
                    <span className="font-inter text-text-secondary text-sm">
                      {TESTIMONIALS[activeIdx].company}
                    </span>
                    <span className="font-inter text-gold text-xs tracking-widest uppercase mt-1">
                      {TESTIMONIALS[activeIdx].projectType}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                type="button"
                onClick={prev}
                className="btn-circle"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`transition-all duration-300 rounded-full focus:outline-none ${i === activeIdx ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-black/10 hover:bg-black/20'
                      }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="btn-circle"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* Client Logo Wall */}
      <SectionReveal>
        <ClientLogoWall />
      </SectionReveal>

      <SectionDivider />

      {/* CTA */}
      <SectionReveal as="section" className="relative bg-bg-primary py-28 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-[600px] h-[350px] blur-[160px] opacity-[0.04]"
            style={{ background: 'radial-gradient(ellipse, var(--accent) 0%, transparent 65%)' }}
          />
        </div>
        <div className="container-luxury relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-6 block">
              Join Our Roster
            </span>
            <h2 className="font-sora font-bold text-gold mb-6" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Ready to become one of our{' '}
              <span className="gradient-gold">success stories?</span>
            </h2>
            <p className="font-inter text-text-secondary text-lg mb-10 max-w-lg mx-auto">
              Join 35+ visionary clients who trust Archadia 3D to bring their architectural ambitions to life.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary btn-md"
            >
              Start a Conversation
              <span className="btn__icon-right"><ArrowRight size={16} /></span>
            </Link>
          </motion.div>
        </div>
      </SectionReveal>
    </main>
  );
}
