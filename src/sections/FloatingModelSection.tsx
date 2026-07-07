'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const FloatingModelCanvas = dynamic(() => import('../components/three/FloatingModelCanvas'), { ssr: false });

export const FloatingModelSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center bg-bg-primary py-24 overflow-hidden border-t border-black/[0.05]">
      {/* Subtle blueprint accent grid lines on Section background */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
      
      <div className="container-luxury relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-10 xl:gap-20 items-center">
          
          {/* LEFT SIDE: Typography Content */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Architectural Label */}
            <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.02] border border-black/[0.05] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-inter text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                Volume, Form & Gravity
              </span>
            </div>

            {/* Premium Editorial Title */}
            <h2 className="font-sora font-extrabold text-3xl md:text-5xl lg:text-[46px] xl:text-5xl leading-[1.1] mb-6 text-text-primary tracking-tight">
              Sculpting Digital <br />
              <span className="gradient-gold gold-text-glow">Architectural</span> Concepts.
            </h2>

            {/* Narratives Paragraph */}
            <p className="font-inter text-text-secondary text-base leading-relaxed mb-8 max-w-[500px]">
              We translate conceptual structural drafts and architectural volumes into immersive spatial stories. By exploring material boundaries, scale, and lighting in R3F, we create visceral, photorealistic digital representations of future building landscapes.
            </p>

            {/* Features Bullet List */}
            <ul className="flex flex-col gap-4 mb-10 font-inter text-sm text-text-secondary">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Interactive spatial volume modeling
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Realistic metal, stone & glass shader materials
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Cinematic lighting and shadows rig
              </li>
            </ul>

            {/* CTA action */}
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="btn btn-secondary btn-lg group">
                Explore Our Process
                <span className="btn__icon-right transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} className="text-gold" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Interactive 3D Canvas in Glassmorphic Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[540px] aspect-[4/4.5] md:aspect-[4/4] lg:aspect-[4/4.8] xl:aspect-[4/4] rounded-2xl overflow-hidden glass-panel border border-black/[0.06] bg-bg-secondary/40 p-4 backdrop-blur-md shadow-2xl flex flex-col justify-between">
              
              {/* Technical Drawing Blueprint Overlay details */}
              <div className="absolute inset-4 border border-dashed border-black/[0.08] pointer-events-none rounded-xl" />
              <div className="absolute top-[20%] left-0 w-full h-px bg-black/[0.03] pointer-events-none" />
              <div className="absolute left-[30%] top-0 h-full w-px bg-black/[0.03] pointer-events-none" />

              {/* Blueprint metadata header */}
              <div className="relative z-10 flex justify-between items-center p-2">
                <span className="font-mono text-[9px] text-text-secondary/45 uppercase tracking-widest">
                  Ref: MDL-FL-022 // PROJ_ARCH
                </span>
                <span className="px-2 py-0.5 rounded bg-gold/10 border border-gold/20 font-mono text-[8px] text-gold uppercase tracking-wider">
                  Conceptual Model
                </span>
              </div>

              {/* R3F Canvas Container */}
              <div className="relative w-full flex-grow flex items-center justify-center min-h-[300px]">
                <FloatingModelCanvas className="absolute inset-0 w-full h-full" />
              </div>

              {/* Blueprint details footer */}
              <div className="relative z-10 border-t border-black/[0.08] pt-3 flex justify-between items-center p-2">
                <span className="font-mono text-[9px] text-text-secondary/45 uppercase tracking-widest">
                  Mouse Hover to Tilt / Rotate
                </span>
                <span className="font-mono text-[8.5px] text-gold uppercase tracking-widest font-semibold">
                  3D Interaction Active
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FloatingModelSection;
