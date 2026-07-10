'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';

let isHydratedGlobal = false;
const animatedKeys = new Set<string>();

interface AnimatedStatisticProps {
  value: string; // e.g. "180+", "98%", "1.8M", "$150K"
  duration?: number;
  delay?: number;
  odometer?: boolean;
  blueprint?: boolean;
  highlight?: boolean;
}

export const AnimatedStatistic: React.FC<AnimatedStatisticProps> = ({
  value,
  duration = 1.8,
  delay = 0,
  odometer = true,
  blueprint = true,
  highlight = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20% 0px -20% 0px' });
  const shouldReduceMotion = useReducedMotion();
  
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState<'blueprint' | 'rolling' | 'locked'>(() => {
    return animatedKeys.has(value) ? 'locked' : 'blueprint';
  });
  const [mounted, setMounted] = useState(() => isHydratedGlobal);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);

  useEffect(() => {
    isHydratedGlobal = true;
    setMounted(true);
  }, []);

  // Dynamically find parent card/column container on client mount to render the hover shimmer portal
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.closest('.clients-stats__card, .stat-item');
      if (parent) {
        parent.classList.add('relative', 'overflow-hidden');
        setPortalTarget(parent);
      }
    }
  }, []);

  // 1. Parsing function to split value into prefix, digits, decimals, and suffix
  const parsed = useMemo(() => {
    const raw = value.trim();
    // Matches prefix (non-digits), numeric part (including decimals), and suffix (remaining string)
    const match = raw.match(/^([^0-9.-]*)([0-9.]+)(.*)$/);
    if (!match) return { prefix: '', digits: [], decimalPoint: false, suffix: raw };

    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];

    const decimalIdx = numStr.indexOf('.');
    const digits = numStr.replace('.', '').split('').map(Number);

    return {
      prefix,
      digits,
      decimalIdx: decimalIdx !== -1 ? decimalIdx : null,
      suffix,
      rawNumStr: numStr,
    };
  }, [value]);

  // 2. Control Phase Sequencing
  useEffect(() => {
    if (animatedKeys.has(value)) {
      setPhase('locked');
      return;
    }

    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setPhase('locked');
      return;
    }

    // Step 1: Blueprint Drawing
    setPhase('blueprint');

    // Step 2: Mechanical Rolling (starts after drafting lines are drawn, ~450ms)
    const rollingTimer = setTimeout(() => {
      setPhase('rolling');
    }, 450);

    // Step 3: Locked in position (snapped, grid fades)
    const lockTimer = setTimeout(() => {
      setPhase('locked');
      animatedKeys.add(value);
    }, 450 + duration * 1000);

    return () => {
      clearTimeout(rollingTimer);
      clearTimeout(lockTimer);
    };
  }, [isInView, duration, shouldReduceMotion, value]);

  // If accessibility prefers reduced motion, render clean text instantly
  if (shouldReduceMotion) {
    return (
      <div className="inline-block font-sora font-extrabold text-gold tracking-tight">
        {value}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block select-none py-4 px-6 transition-all duration-300 stats-shimmer-parent"
    >
      {/* ─── PHASE 1: BLUEPRINT DRAFTING OVERLAY ─── */}
      {blueprint && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ opacity: 0.35 }}
        >
          {/* Outer Crosshair Guidelines */}
          <motion.line
            x1="-5%" y1="10%" x2="105%" y2="10%"
            stroke="rgba(148, 117, 60, 0.15)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay }}
          />
          <motion.line
            x1="-5%" y1="90%" x2="105%" y2="90%"
            stroke="rgba(148, 117, 60, 0.15)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay }}
          />
          <motion.line
            x1="10%" y1="-5%" x2="10%" y2="105%"
            stroke="rgba(148, 117, 60, 0.15)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay }}
          />
          <motion.line
            x1="90%" y1="-5%" x2="90%" y2="105%"
            stroke="rgba(148, 117, 60, 0.15)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay }}
          />

          {/* Blueprint Drafting Markups: Corner Crosshairs */}
          {isInView && (
            <>
              {/* Top Left Cross */}
              <motion.path
                d="M 2 6 L 10 6 M 6 2 L 6 10"
                stroke="rgba(148, 117, 60, 0.4)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.1 }}
              />
              {/* Top Right Cross */}
              <path
                d="M calc(100% - 10px) 6 L calc(100% - 2px) 6 M calc(100% - 6px) 2 L calc(100% - 6px) 10"
                stroke="rgba(148, 117, 60, 0.4)"
                strokeWidth="0.5"
              />
              {/* Bottom Left Cross */}
              <path
                d="M 2 calc(100% - 6px) L 10 calc(100% - 6px) M 6 calc(100% - 10px) L 6 calc(100% - 2px)"
                stroke="rgba(148, 117, 60, 0.4)"
                strokeWidth="0.5"
              />
              {/* Bottom Right Cross */}
              <path
                d="M calc(100% - 10px) calc(100% - 6px) L calc(100% - 2px) calc(100% - 6px) M calc(100% - 6px) calc(100% - 10px) L calc(100% - 6px) calc(100% - 2px)"
                stroke="rgba(148, 117, 60, 0.4)"
                strokeWidth="0.5"
              />
            </>
          )}

          {/* Corner L-Brackets */}
          {/* Top Left */}
          <motion.path
            d="M 6 16 L 6 6 L 16 6"
            fill="none"
            stroke="#94753c"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          />
          {/* Top Right */}
          <motion.path
            d="M calc(100% - 16px) 6 L calc(100% - 6px) 6 L calc(100% - 6px) 16"
            fill="none"
            stroke="#94753c"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          />
          {/* Bottom Left */}
          <motion.path
            d="M 6 calc(100% - 16px) L 6 calc(100% - 6px) L 16 calc(100% - 6px)"
            fill="none"
            stroke="#94753c"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          />
          {/* Bottom Right */}
          <motion.path
            d="M calc(100% - 16px) calc(100% - 6px) L calc(100% - 6px) calc(100% - 6px) L calc(100% - 6px) calc(100% - 16px)"
            fill="none"
            stroke="#94753c"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          />

          {/* Coordinates Label */}
          {isInView && (
            <text
              x="12%"
              y="23%"
              fill="#94753c"
              fontSize="6"
              fontFamily="monospace"
              letterSpacing="0.1em"
              opacity="0.3"
            >
              SCALE 1:1 // SEC_0{parsed.digits.length}
            </text>
          )}
        </svg>
      )}

      {/* ─── PHASE 2 & 3: STATISTIC RENDER WRAPPER ─── */}
      <motion.div
        animate={
          phase === 'locked'
            ? {
              scale: isHovered ? 1.04 : 1,
              y: isHovered ? -2 : 0,
            }
            : {}
        }
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative z-10 flex items-center justify-center font-sora font-extrabold text-gold leading-[1.15] py-1.5 tracking-tight select-none"
        style={{
          textShadow: isHovered ? '0 0 15px rgba(148, 117, 60, 0.15)' : 'none',
          overflow: 'visible',
        }}
      >
        {/* Dynamic Sweep Highlight Portal (CSS-Hover Controlled, swept across entire parent card/column) */}
        {highlight && portalTarget && createPortal(
          <div className="stats-shimmer" />,
          portalTarget
        )}

        {/* 1. Prefix (e.g. $) */}
        {parsed.prefix && (
          <span className="mr-0.5 text-text-primary self-start text-[0.6em] mt-1.5 opacity-80">
            {parsed.prefix}
          </span>
        )}

        {/* 2. Mechanical Odometer Digit Columns */}
        {odometer ? (
          <div className="inline-flex items-center h-[1.3em] relative" style={{ overflow: 'visible' }}>
            {parsed.digits.map((digit, colIdx) => {
              // Check if we need to render a decimal point before this digit
              const showDecimal = parsed.decimalIdx !== null && colIdx === parsed.decimalIdx;

              // Only roll to final value if mounted, in view, and phase is rolling/locked
              const targetDigit = (animatedKeys.has(value) || (mounted && isInView && (phase === 'rolling' || phase === 'locked')))
                ? digit
                : 0;

              return (
                <React.Fragment key={colIdx}>
                  {showDecimal && (
                    <span className="w-[0.25em] h-[1.3em] flex items-end justify-center pb-[0.25em] select-none">
                      <span className="w-[0.15em] h-[0.15em] rounded-full bg-[#94753c]" />
                    </span>
                  )}
                  <div className="w-[0.72em] min-w-[0.72em] h-[1.3em] overflow-hidden relative flex flex-col items-center px-[0.04em]">
                    <motion.div
                      initial={{ y: animatedKeys.has(value) ? `-${targetDigit * 1.3}em` : '0em' }}
                      animate={{ y: `-${targetDigit * 1.3}em` }}
                      transition={{
                        type: 'spring',
                        stiffness: 45, // Heavy mechanical feel
                        damping: 11,   // Slight overshoot bounce
                        mass: 0.8,     // Weighted physics
                        delay: animatedKeys.has(value) ? 0 : (delay + colIdx * 0.12), // Distinct column stagger
                      }}
                      className="flex flex-col w-full"
                      style={{
                        height: '13em',
                        willChange: 'transform',
                        opacity: phase === 'blueprint' ? 0.15 : 1,
                        filter: phase === 'blueprint' ? 'blur(0.5px)' : 'blur(0px)',
                        transition: 'opacity 0.6s ease, filter 0.6s ease'
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <span
                          key={n}
                          className="h-[1.3em] flex items-center justify-center font-sora font-extrabold text-gold select-none leading-none"
                        >
                          {n}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          /* Fallback static render for drawing stage - faint outline sketch */
          <span
            className="font-sora font-extrabold text-gold leading-none select-none transition-all duration-500"
            style={{
              opacity: phase === 'blueprint' ? 0.15 : 1,
              filter: phase === 'blueprint' ? 'blur(0.5px)' : 'blur(0px)',
            }}
          >
            {(animatedKeys.has(value) || (mounted && (phase === 'rolling' || phase === 'locked'))) ? parsed.rawNumStr : parsed.rawNumStr.replace(/[0-9]/g, '0')}
          </span>
        )}

        {/* 3. Suffix (e.g. +, %, K, Years) */}
        {parsed.suffix && (
          <span
            className="text-[0.45em] ml-1 font-sora font-semibold select-none opacity-90"
            style={{
              transform: 'translateY(-0.03em)', // fine-tuned baseline shift
            }}
          >
            {parsed.suffix}
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedStatistic;
