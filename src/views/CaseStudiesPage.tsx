'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Award, Clock, Layers, Users } from 'lucide-react';
import Link from 'next/link';

const CASE_STUDIES = [
  {
    id: 1,
    tag: 'Commercial Tower',
    title: 'The Obsidian Spire',
    location: 'Bengaluru, India',
    year: '2024',
    image: '/obsidian_spire.png',
    challenge:
      'The client needed photorealistic renders and a cinematic fly-through film to secure ₹500 Crores in off-plan sales before construction commenced.',
    solution:
      'We deployed our full pipeline — architectural visualization, twilight stills, VR walkthrough, and a 3-minute broadcast film — within a 12-week production schedule.',
    outcome:
      'The campaign resulted in 94% of units pre-sold within 6 weeks of the marketing launch, and the project won the National Design Award of the year.',
    metrics: [
      { icon: Layers, value: '72', label: 'Floors' },
      { icon: Clock, value: '18 mo', label: 'Project Duration' },
      { icon: Award, value: '1', label: 'National Award' },
      { icon: Users, value: '94%', label: 'Pre-sold Units' },
    ],
    tags: ['CGI Renders', 'VR Walkthrough', 'Animation Film', 'Sales Campaign'],
  },
  {
    id: 2,
    tag: 'Residential Complex',
    title: 'Meridian Park Residences',
    location: 'Mumbai, India',
    year: '2023',
    image: '/portfolio_tower.png',
    challenge:
      'A luxury developer needed to differentiate their ₹1,200 Crores residential development in a crowded Mumbai market. Standard photography of the empty building was not an option.',
    solution:
      'We created 48 ultra-realistic interior renders, a virtual model apartment experience, and a lifestyle film to convey the experience of living in the tower before completion.',
    outcome:
      'The project achieved a 40% increase in off-plan sales velocity compared to their previous developments, with a full sell-out before the building topped out.',
    metrics: [
      { icon: Layers, value: '48', label: 'Interior Renders' },
      { icon: Clock, value: '8 wk', label: 'Production Time' },
      { icon: Award, value: '₹1,200 Cr', label: 'Project Value' },
      { icon: Users, value: '+40%', label: 'Sales Velocity' },
    ],
    tags: ['Interior Renders', 'Virtual Apartment', 'Lifestyle Film', 'Print Campaign'],
  },
  {
    id: 3,
    tag: 'Cultural Institution',
    title: 'The Luminary Museum',
    location: 'Delhi-NCR, India',
    year: '2023',
    image: '/portfolio_museum.png',
    challenge:
      'A consortium of architects required competition-level visualization for a new cultural landmark in central Delhi. The brief demanded images that conveyed civic grandeur and technical precision simultaneously.',
    solution:
      'Working directly with the lead architect, we produced 12 hero renders, a 1-minute concept film, and an interactive real-time model for the jury presentation — all in 6 weeks.',
    outcome:
      'The visualization was widely cited by the competition jury as a key differentiator. The team won the commission, valued at ₹800 Crores.',
    metrics: [
      { icon: Layers, value: '12', label: 'Hero Renders' },
      { icon: Clock, value: '6 wk', label: 'Delivery' },
      { icon: Award, value: '₹800 Cr', label: 'Commission Value' },
      { icon: Users, value: '1st', label: 'Competition Placing' },
    ],
    tags: ['Competition Viz', 'Concept Film', 'Real-time Model', 'Jury Presentation'],
  },
];

function CaseStudyCard({ study, index }: { study: typeof CASE_STUDIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative glass-panel rounded-3xl overflow-hidden"
    >
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E6C383]/40 to-transparent" />

      <div className={`grid lg:grid-cols-2 ${isEven ? '' : ''}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${isEven ? 'order-1' : 'order-1 lg:order-2'} h-80 lg:h-auto`}>
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/40 via-transparent to-transparent" />

          {/* Year badge */}
          <div className="absolute top-6 left-6 glass rounded-lg px-4 py-2">
            <span className="font-sora font-bold text-[#E6C383] text-sm">{study.year}</span>
          </div>

          {/* Location badge */}
          <div className="absolute bottom-6 left-6">
            <span className="font-inter text-xs tracking-widest text-[#B8B8B8] uppercase">{study.location}</span>
          </div>
        </div>

        {/* Content */}
        <div className={`p-10 xl:p-14 flex flex-col justify-between ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
          <div>
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-4 block">
              {study.tag}
            </span>
            <h2 className="font-sora font-bold text-white mb-8" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
              {study.title}
            </h2>

            {/* Challenge / Solution / Outcome */}
            <div className="flex flex-col gap-6 mb-10">
              {[
                { label: 'Challenge', text: study.challenge },
                { label: 'Solution', text: study.solution },
                { label: 'Outcome', text: study.outcome },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-4 items-start">
                  <span className="font-inter text-[10px] tracking-[0.2em] text-[#E6C383]/70 uppercase mt-1 w-16 flex-none">
                    {label}
                  </span>
                  <p className="font-inter text-[#B8B8B8] text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-inter text-xs tracking-wide text-[#B8B8B8] border border-white/10 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.06]">
            {study.metrics.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={14} className="text-[#E6C383]/60 mx-auto mb-2" />
                <div className="font-sora font-bold gradient-gold text-xl mb-0.5">{value}</div>
                <div className="font-inter text-[#B8B8B8] text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

import { SectionReveal } from '../components/layout/SectionReveal';
import { SectionDivider } from '../components/SectionDivider';

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#050505] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute top-1/2 right-1/4 w-[700px] h-[500px] rounded-full opacity-[0.07] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #E6C383 0%, transparent 70%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="container-luxury relative z-10 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">
              In-Depth
            </span>
            <h1
              className="font-sora font-bold text-white leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
            >
              Case{' '}
              <span className="gradient-gold">Studies</span>
            </h1>
            <p className="font-inter text-[#B8B8B8] text-xl max-w-xl leading-relaxed">
              Detailed breakdowns of landmark projects — the challenges we solved, the methods we used, and the results we delivered.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Case Studies */}
      <SectionReveal as="section" className="section-padding">
        <div className="container-luxury flex flex-col gap-12">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* CTA */}
      <SectionReveal as="section" className="relative bg-[#0E0E0E] py-28 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-[600px] h-[350px] blur-[160px] opacity-[0.09]"
            style={{ background: 'radial-gradient(ellipse, #E6C383 0%, transparent 65%)' }}
          />
        </div>
        <div className="container-luxury relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">
              Your Success Story
            </span>
            <h2 className="font-sora font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Let's write your{' '}
              <span className="gradient-gold">case study</span> next.
            </h2>
            <p className="font-inter text-[#B8B8B8] text-lg mb-10 max-w-lg mx-auto">
              Join India's most ambitious developers and architects who trust Archadia 3D.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary btn-md"
            >
              Start a Project
              <span className="btn__icon-right"><ArrowRight size={16} /></span>
            </Link>
          </motion.div>
        </div>
      </SectionReveal>
    </main>
  );
}
