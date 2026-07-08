'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TEAM_MEMBERS } from '../utils/data';
import type { TeamMember } from '../types';

import '../styles/studio.css';
import { StudioPrinciples } from '../components/sections/studio/StudioPrinciples';
import { StudioJourney } from '../components/sections/studio/StudioJourney';
import { StudioRecognition } from '../components/sections/studio/StudioRecognition';
import { StudioStatsStrip } from '../components/sections/studio/StudioStatsStrip';
import { StudioHub } from '../components/sections/studio/StudioHub';

const STUDIO_VALUES = [
  {
    icon: '◆',
    title: 'Mission',
    text: 'To bridge the gap between architectural vision and human emotion through the power of cinematic visualization.',
  },
  {
    icon: '◆',
    title: 'Approach',
    text: 'We begin every project with deep listening — understanding the story before we ever open a render file.',
  },
  {
    icon: '◆',
    title: 'Technology',
    text: 'Unreal Engine, Corona Renderer, 3ds Max, Chaos Vantage — the finest tools wielded by master artists.',
  },
  {
    icon: '◆',
    title: 'Innovation',
    text: 'We continuously explore real-time rendering, AI-assisted workflows, and immersive XR experiences.',
  },
];

// TIMELINE is now imported and managed via StudioJourney component

function TeamCard({ member, delay }: { member: TeamMember; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#E6C383]/30 transition-all duration-500 card-shadow"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E6C383]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <div className="relative h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <svg width="70" height="70" viewBox="0 0 80 80" fill="none" className="opacity-20 group-hover:opacity-35 transition-opacity duration-500 relative z-10">
          <circle cx="40" cy="30" r="16" stroke="#E6C383" strokeWidth="1.5" />
          <path d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="#E6C383" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-[2px] border border-[#E6C383]/0 group-hover:border-[#E6C383]/15 rounded-xl transition-colors duration-500" />
      </div>

      <div className="p-6">
        <h3 className="font-sora font-bold text-white text-lg mb-1 group-hover:text-[#E6C383] transition-colors duration-300">
          {member.name}
        </h3>
        <span className="font-inter text-[#E6C383]/70 text-xs tracking-[0.2em] uppercase block mb-4">
          {member.role}
        </span>
        <p className="font-inter text-[#B8B8B8] text-sm leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  );
}

import { SectionReveal } from '../components/layout/SectionReveal';
import { SectionDivider } from '../components/SectionDivider';

export default function StudioPage() {
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroImgVisible = useInView(heroImgRef, { once: true, margin: '-80px' });

  return (
    <main className="bg-[#050505] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute top-1/3 left-1/4 w-[700px] h-[500px] rounded-full opacity-[0.07] blur-[130px]"
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
              About Us
            </span>
            <h1
              className="font-sora font-bold text-white leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}
            >
              Our{' '}
              <span className="gradient-gold">Studio</span>
            </h1>
            <p className="font-inter text-[#B8B8B8] text-xl max-w-xl leading-relaxed">
              A collective of architects, artists, and technologists united by a singular obsession: making the unbuilt feel real.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Brand Principles */}
      <SectionReveal>
        <StudioPrinciples />
      </SectionReveal>

      <SectionDivider />

      {/* About Section */}
      <SectionReveal as="section" className="section-padding bg-[#050505]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Image */}
            <motion.div
              ref={heroImgRef}
              initial={{ opacity: 0, x: -60 }}
              animate={heroImgVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden luxury-shadow">
                <img
                  src="/studio_image.png"
                  alt="Inside Archadia 3D studio"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '640px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/50 via-transparent to-transparent" />
              </div>
              <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#E6C383]/60" />
              <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#E6C383]/60" />

              {/* Year badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroImgVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-8 -right-4 gold-glass-badge rounded-2xl p-5 text-center"
              >
                <div className="font-inter text-gold text-xs tracking-widest uppercase mb-1 font-semibold">Est.</div>
                <div className="font-sora font-bold text-gold text-3xl">2012</div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pt-12 lg:pt-0"
            >
              <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">
                Inside Archadia
              </span>
              <h2 className="font-sora font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)' }}>
                Crafting Worlds,
                <br />
                <span className="gradient-gold">One Render at a Time</span>
              </h2>
              <p className="font-inter text-[#B8B8B8] text-lg leading-relaxed mb-8">
                Founded in 2012 by architect-turned-artist Marcus Vela, Archadia 3D began as a one-room studio in Mumbai with a single workstation and an audacious dream: to prove that architectural visualization could be as emotionally powerful as cinema.
              </p>
              <p className="font-inter text-[#B8B8B8] text-lg leading-relaxed mb-12">
                Today, our studios span Mumbai, Delhi-NCR, and Bengaluru — home to a pan-India team of 30 architects, CGI artists, and technologists who collectively bring over 200 years of industry experience to every project.
              </p>

              <div className="flex flex-col gap-0 divide-y divide-white/[0.06]">
                {STUDIO_VALUES.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="group py-5 hover:pl-2 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[#E6C383]/60 text-xs mt-1 group-hover:text-[#E6C383] transition-colors duration-300">
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="font-sora font-semibold text-white text-base mb-1 group-hover:text-[#E6C383] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="font-inter text-[#B8B8B8] text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* Journey Timeline */}
      <SectionReveal>
        <StudioJourney />
      </SectionReveal>

      <SectionDivider />

      {/* Team */}
      <SectionReveal as="section" className="bg-[#050505] section-padding">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#E6C383] uppercase mb-6 block">
              The Team
            </span>
            <h2 className="font-sora font-bold text-white" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
              Meet The Minds Behind{' '}
              <span className="gradient-gold">The Vision</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <TeamCard key={member.id} member={member} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionDivider />

      {/* Recognition / Awards */}
      <SectionReveal>
        <StudioRecognition />
      </SectionReveal>

      <SectionDivider />

      {/* Stats Strip */}
      <SectionReveal>
        <StudioStatsStrip />
      </SectionReveal>

      <SectionDivider />

      {/* Studio Hub (Location) */}
      <SectionReveal>
        <StudioHub />
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
              Work With Us
            </span>
            <h2 className="font-sora font-bold text-white mb-6" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Let's create something{' '}
              <span className="gradient-gold">extraordinary</span> together.
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="btn btn-primary btn-md"
              >
                Start a Project
                <span className="btn__icon-right"><ArrowRight size={16} /></span>
              </Link>
              <Link
                href="/portfolio"
                className="btn btn-secondary btn-md"
              >
                View Portfolio
                <span className="btn__icon-right"><ArrowRight size={16} className="text-[#E6C383]" /></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionReveal>
    </main>
  );
}
