import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TEAM_MEMBERS } from '../utils/data';
import type { TeamMember } from '../types';

function TeamCard({ member, delay }: { member: TeamMember; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-bg-primary rounded-2xl overflow-hidden border border-black/10 hover:border-gold/30 transition-all duration-500 card-shadow"
    >
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Avatar area */}
      <div className="relative h-56 bg-gradient-to-br from-[#f6f6f9] to-[#ffffff] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Avatar icon */}
        <div className="relative z-10">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-25 group-hover:opacity-40 transition-opacity duration-500">
            <circle cx="40" cy="30" r="16" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        {/* Gold frame border on hover */}
        <div className="absolute inset-[2px] border border-gold/0 group-hover:border-gold/20 rounded-xl transition-colors duration-500" />
      </div>

      <div className="p-6">
        <h3 className="font-sora font-bold text-text-primary text-lg mb-1 group-hover:text-gold transition-colors duration-300">
          {member.name}
        </h3>
        <span className="font-inter text-gold text-xs tracking-[0.2em] uppercase block mb-4">
          {member.role}
        </span>
        <p className="font-inter text-text-secondary text-sm leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, { once: true });

  return (
    <section id="team" className="bg-bg-secondary section-padding">
      <div className="container-luxury">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-6 block">
            The Team
          </span>
          <h2
            className="font-sora font-bold text-gold leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
          >
            Meet The Minds Behind
            <br />
            The Vision
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
