'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Types for Preloader component props
interface PreloaderProps {
  isLoading?: boolean; // Controls whether the loading process is active externally
  progress?: number; // Optional external progress value (0 - 100)
  minimumDurationMs?: number; // Minimum visible duration to prevent fast load flashes
  onComplete?: () => void; // Triggered when exit animation completes
}

export const Preloader: React.FC<PreloaderProps> = ({
  isLoading = false,
  progress,
  minimumDurationMs = 3000,
  onComplete,
}) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasCompletedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // 1. Calculate effective progress (external overrides internal)
  const effectiveProgress = progress !== undefined ? progress : internalProgress;

  // 2. Track minimum duration timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeElapsed(true);
    }, minimumDurationMs);

    return () => clearTimeout(timer);
  }, [minimumDurationMs]);

  // 3. Simulate progress internally if no external progress prop is provided
  useEffect(() => {
    if (progress !== undefined) return;

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Simulate organic, non-linear progress increases (faster at start, slower near end)
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(10, Math.floor(remaining * 0.12 + Math.random() * 2)));
        return prev + step;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  // 4. Determine when the loading has officially completed
  const isDone = effectiveProgress >= 100 && timeElapsed && !isLoading;

  useEffect(() => {
    if (isDone && !isExiting) {
      setIsExiting(true);
    }
  }, [isDone, isExiting]);

  // 5. Handle cleanup and notify parent when local exit animation ends
  const handleAnimationComplete = (definition: string) => {
    if (definition === 'exit' && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Variants for root overlay entrance/exit transitions
  const overlayVariants = {
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: {
        duration: 1.05,
        ease: [0.85, 0, 0.15, 1] as [number, number, number, number], // Cinematic high-end custom cubic-bezier
      },
    },
  };

  // Variants for typographic letter reveal
  const logoText = 'ARCHADIA';
  const charVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.15 + i * 0.06,
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="visible"
      animate={isExiting ? 'exit' : 'visible'}
      onAnimationComplete={handleAnimationComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] text-text-primary select-none pointer-events-auto overflow-hidden"
    >
      {/* BACKGROUND LAYER 1: Subtle Vignette and Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(158, 126, 71, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(158, 126, 71, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(250,248,245,0.85)_100%)] pointer-events-none" />

      {/* BACKGROUND LAYER 2: Decorative Technical Drafting Layouts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
        {/* Rotating Drafting Dial */}
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-dashed border-black/10 flex items-center justify-center"
        >
          <div className="w-[440px] h-[440px] rounded-full border border-black/5" />
          <div className="w-[320px] h-[320px] rounded-full border border-dashed border-gold/15" />
        </motion.div>

        {/* Drafting Grid Corner Crosshair */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 flex items-center justify-center">
          <div className="w-full h-px bg-black/10" />
          <div className="absolute w-px h-full bg-black/10" />
          <div className="absolute w-16 h-16 rounded-full border border-black/8" />
          <div className="absolute w-24 h-24 rounded-full border border-black/5" />
        </div>

        {/* Technical Blueprint Coordinates & Details */}
        <div className="absolute bottom-10 left-10 font-mono text-[9px] text-text-secondary/40 tracking-[0.2em] leading-relaxed">
          SYS.INITIALIZE_SEQ //
          <br />
          LOC: MUMBAI_HUD_402 // LAT_19.076
        </div>
        <div className="absolute bottom-10 right-10 font-mono text-[9px] text-gold/60 tracking-[0.25em]">
          SCALE: 1:20 // MODEL: ARCHADIA_MAIN
        </div>
      </div>

      {/* CENTERED BRAND CONTENT & PROGRESS TRACK */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Typographic Logo Reveal */}
        <div className="flex overflow-hidden mb-6 select-none">
          {logoText.split('').map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={charVariants}
              initial="hidden"
              animate="visible"
              className="font-sora text-3xl md:text-4xl font-extrabold tracking-[0.25em] text-text-primary"
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85, duration: 0.65 }}
            className="font-sora text-3xl md:text-4xl font-extrabold tracking-[0.25em] text-gold"
          >
            3D
          </motion.span>
        </div>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="font-inter text-[9px] font-semibold tracking-[0.3em] uppercase text-text-secondary mb-12"
        >
          Architectural Realism
        </motion.p>

        {/* Percentage Counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-sora text-lg md:text-xl font-bold tracking-[0.15em] text-text-primary mb-4"
        >
          {Math.round(effectiveProgress)}%
        </motion.div>

        {/* Thin Gold Progress Line */}
        <div className="w-56 md:w-64 h-[1px] bg-black/[0.08] rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${effectiveProgress}%` }}
            transition={{ type: 'spring', stiffness: 70, damping: 18 }}
            className="h-full bg-gradient-to-r from-gold/60 via-gold to-gold/60 shadow-[0_0_8px_rgba(148,117,60,0.3)]"
          />
          {/* Subtle animated glint line shine */}
          <motion.div
            animate={shouldReduceMotion ? {} : { x: ['-100%', '250%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-black/15 to-transparent pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
};
export default Preloader;
