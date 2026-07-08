import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STUDIO_ITEMS = [
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

export default function StudioSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftVisible = useInView(leftRef, { once: true, margin: '-80px' });
  const rightVisible = useInView(rightRef, { once: true, margin: '-80px' });

  return (
    <section id="studio" className="bg-bg-primary section-padding">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left - Image */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -60 }}
            animate={leftVisible ? { opacity: 1, x: 0 } : {}}
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
              <div className="absolute inset-0 bg-gradient-to-tr from-bg-primary/50 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-gold/60" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-gold/60" />
            <div className="absolute -inset-3 border border-gold/20 rounded-3xl pointer-events-none" />

            {/* Year badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={leftVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -right-4 gold-glass-badge rounded-2xl p-5 text-center"
            >
              <div className="font-inter text-gold text-xs tracking-widest uppercase mb-1 font-semibold">Est.</div>
              <div className="font-sora font-bold text-gold text-3xl">2012</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 60 }}
            animate={rightVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pt-12 lg:pt-0"
          >
            <span className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-6 block">
              Our Studio
            </span>
            <h2 className="font-sora font-bold text-gold leading-tight mb-6" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)' }}>
              Inside Archadia
            </h2>
            <p className="font-inter text-text-secondary text-lg leading-relaxed mb-12">
              We are a collective of architects, artists, and technologists united by a singular
              obsession: making the unbuilt feel real.
            </p>

            <div className="flex flex-col gap-0 divide-y divide-black/[0.08]">
              {STUDIO_ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={rightVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="group py-5 hover:pl-2 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-gold/60 text-xs mt-1 group-hover:text-gold transition-colors duration-300">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-sora font-semibold text-text-primary text-base mb-1 group-hover:text-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="font-inter text-text-secondary text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
