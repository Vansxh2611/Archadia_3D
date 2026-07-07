import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Define the client logo type
export type ClientLogo = {
  name: string;
  src: string; // Path to logo asset
  alt: string; // Accessible description
};

// High-end placeholder logo data
const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Skyline Developments', src: '/logos/client-01.svg', alt: 'Skyline Developments logo' },
  { name: 'Nordic Habitat', src: '/logos/client-02.svg', alt: 'Nordic Habitat logo' },
  { name: 'Aurelia Estates', src: '/logos/client-03.svg', alt: 'Aurelia Estates logo' },
  { name: 'Vertex Partners', src: '/logos/client-04.svg', alt: 'Vertex Partners logo' },
  { name: 'Horizon Builders', src: '/logos/client-05.svg', alt: 'Horizon Builders logo' },
  { name: 'Vanguard Atelier', src: '/logos/client-06.svg', alt: 'Vanguard Atelier logo' },
  { name: 'Lumina Spaces', src: '/logos/client-07.svg', alt: 'Lumina Spaces logo' },
  { name: 'Meridian Capital', src: '/logos/client-08.svg', alt: 'Meridian Capital logo' },
  { name: 'Zenith Structures', src: '/logos/client-09.svg', alt: 'Zenith Structures logo' },
  { name: 'Nexus Living', src: '/logos/client-10.svg', alt: 'Nexus Living logo' },
  { name: 'Epoch Architecture', src: '/logos/client-11.svg', alt: 'Epoch Architecture logo' },
  { name: 'Solis Ventures', src: '/logos/client-12.svg', alt: 'Solis Ventures logo' },
];

interface LogoItemProps {
  logo: ClientLogo;
}

// Logo card component that renders an image, fallback to typography with a luxury aesthetic if image errors
const LogoItem: React.FC<LogoItemProps> = ({ logo }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center justify-center h-12 md:h-14 px-8 md:px-10 rounded-xl border border-black/10 bg-black/[0.02] backdrop-blur-sm hover:bg-black/[0.04] hover:border-gold/30 transition-all duration-300 select-none group min-w-[160px] md:min-w-[200px]">
      {hasError ? (
        <div className="flex items-center gap-2.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="font-sora text-[10px] md:text-xs font-bold tracking-[0.15em] text-text-primary uppercase whitespace-nowrap">
            {logo.name}
          </span>
        </div>
      ) : (
        <img
          src={logo.src}
          alt={logo.alt}
          onError={() => setHasError(true)}
          className="h-5 md:h-6 w-auto max-w-[130px] object-contain filter brightness-0 opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
        />
      )}
    </div>
  );
};

export const ClientLogoWall: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isHoveredRow1, setIsHoveredRow1] = useState(false);
  const [isHoveredRow2, setIsHoveredRow2] = useState(false);

  // Split logo array to add variance between the two rows
  const row1Logos = [...CLIENT_LOGOS];
  // Reorder row 2 for alternating sequence
  const row2Logos = [...CLIENT_LOGOS].reverse();

  // Triple the items to ensure row width is wide enough for seamless infinite scroll
  const duplicatedRow1 = [...row1Logos, ...row1Logos, ...row1Logos];
  const duplicatedRow2 = [...row2Logos, ...row2Logos, ...row2Logos];

  // Dynamic animation durations based on hover states (slow down on hover)
  const durationRow1 = isHoveredRow1 ? 80 : 35;
  const durationRow2 = isHoveredRow2 ? 80 : 35;

  return (
    <section className="relative w-full bg-bg-primary py-20 md:py-28 overflow-hidden border-t border-b border-black/[0.06]">
      {/* Background blueprint aesthetics */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-inter text-[10px] md:text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4"
          >
            Trusted by visionary developers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sora text-2xl md:text-4xl font-extrabold text-gold tracking-tight mb-3"
          >
            Partners across continents.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter text-xs md:text-sm text-text-secondary/70 max-w-md"
          >
            Powering elite architectural visualisations and digital spatial design.
          </motion.p>
        </div>

        {/* Marquee Wrapper with soft left/right gradients */}
        <div className="relative w-full space-y-6 md:space-y-8 select-none">

          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-bg-primary to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-bg-primary to-transparent z-20 pointer-events-none" />

          {/* Row 1: Scrolling Left-to-Right */}
          <div
            className="overflow-hidden flex w-full"
            onMouseEnter={() => setIsHoveredRow1(true)}
            onMouseLeave={() => setIsHoveredRow1(false)}
          >
            {shouldReduceMotion ? (
              // Static Grid fallback for reduced motion
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full">
                {CLIENT_LOGOS.slice(0, 6).map((logo, idx) => (
                  <LogoItem key={`static-1-${idx}`} logo={logo} />
                ))}
              </div>
            ) : (
              <motion.div
                animate={{ x: ['-50%', '0%'] }}
                transition={{
                  ease: 'linear',
                  duration: durationRow1,
                  repeat: Infinity,
                }}
                className="flex gap-4 md:gap-6 whitespace-nowrap w-max"
              >
                {duplicatedRow1.map((logo, idx) => (
                  <LogoItem key={`row1-${idx}`} logo={logo} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Row 2: Scrolling Right-to-Left */}
          <div
            className="overflow-hidden flex w-full"
            onMouseEnter={() => setIsHoveredRow2(true)}
            onMouseLeave={() => setIsHoveredRow2(false)}
          >
            {shouldReduceMotion ? (
              // Static Grid fallback for reduced motion
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full mt-4">
                {CLIENT_LOGOS.slice(6, 12).map((logo, idx) => (
                  <LogoItem key={`static-2-${idx}`} logo={logo} />
                ))}
              </div>
            ) : (
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  ease: 'linear',
                  duration: durationRow2,
                  repeat: Infinity,
                }}
                className="flex gap-4 md:gap-6 whitespace-nowrap w-max"
              >
                {duplicatedRow2.map((logo, idx) => (
                  <LogoItem key={`row2-${idx}`} logo={logo} />
                ))}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientLogoWall;
