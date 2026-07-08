'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const BuildingViewerCanvas = dynamic(() => import('../components/three/BuildingViewerCanvas'), { ssr: false });

export const BuildingViewerSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-bg-primary py-24 overflow-hidden border-t border-black/[0.05]">
      {/* Background blueprint lines */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />

      {/* Decorative Blueprint frame overlay around section */}
      <div className="absolute inset-8 border border-black/[0.04] pointer-events-none rounded-3xl" />
      <div className="absolute top-8 left-[15%] w-px h-full bg-black/[0.02] pointer-events-none" />
      <div className="absolute top-8 right-[15%] w-px h-full bg-black/[0.02] pointer-events-none" />

      <div className="container-luxury relative z-10 w-full flex flex-col justify-between min-h-[80vh] gap-12">

        {/* HEADER: Section Typography Intro */}
        <div className="max-w-[700px] flex flex-col items-center mx-auto text-center">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.02] border border-black/[0.05] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-inter text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
              Interactive 3D Portfolio
            </span>
          </motion.div>

          {/* Section Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.15 }}
            className="font-sora font-extrabold text-3xl md:text-5xl mb-6 text-gold leading-tight"
          >
            Explore the <span className="gradient-gold gold-text-glow">Obsidian Tower</span>
          </motion.h2>

          {/* Paragraph description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-inter text-text-secondary text-sm md:text-base leading-relaxed"
          >
            Interact directly with our flagship visualization render model. Orbit around the structures, click the technical nodes to reveal detailed zoning highlights, and experience luxury architectural precision in real time.
          </motion.p>
        </div>

        {/* 3D CANVAS VIEWPORT & INTERACTION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative w-full max-w-[1000px] aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/8] xl:aspect-[16/8] mx-auto rounded-3xl overflow-hidden border border-black/[0.06] bg-bg-secondary/40 backdrop-blur-md shadow-2xl flex flex-col justify-between"
        >
          {/* Card inner Technical overlays */}
          <div className="absolute inset-3 border border-dashed border-black/[0.06] pointer-events-none rounded-2xl" />

          {/* Top Info Bar */}
          <div className="relative z-20 flex justify-between items-center p-4 border-b border-black/[0.06] bg-white/25">
            <span className="font-mono text-[9px] text-text-secondary/45 uppercase tracking-widest">
              Project ID: PR-2026 // OBSIDIAN
            </span>
            <span className="font-mono text-[8px] text-gold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Live rendering
            </span>
          </div>

          {/* R3F Canvas Container */}
          <div className="relative w-full flex-grow">
            <BuildingViewerCanvas className="absolute inset-0 w-full h-full" />
          </div>

          {/* Bottom Control Tips Overlay */}
          <div className="relative z-20 flex flex-wrap justify-between items-center p-4 border-t border-black/[0.06] bg-white/25 gap-4">
            <div className="flex gap-6 font-mono text-[9px] text-text-secondary/45 uppercase tracking-widest">
              <span>🖱️ Drag to Orbit</span>
              <span>🔍 Scroll to Zoom</span>
              <span>📍 Click dots for Specs</span>
            </div>
            <span className="font-mono text-[8.5px] text-gold uppercase tracking-widest font-semibold">
              Orthographic Camera System
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BuildingViewerSection;
