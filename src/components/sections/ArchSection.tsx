import { useRef, useState, useEffect, Fragment } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';

const LETTERS = [
  {
    char: 'A',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    label: 'CRAFTING REALITY',
    title: 'Crafting Reality',
    description: 'Photorealistic exterior renderings that capture materiality, lighting, and context with absolute precision.',
    mx: 18,
    my: -12,
    parallax: -45,
    zoomStart: 1.05,
    zoomEnd: 1.18,
  },
  {
    char: 'R',
    img: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop',
    label: 'ARCHITECTURAL SOUL',
    title: 'Architectural Soul',
    description: 'Conveying structural emotion and spatial stories through atmospheric CGI and narrative cinematography.',
    mx: -12,
    my: 18,
    parallax: 35,
    zoomStart: 1.10,
    zoomEnd: 1.25,
  },
  {
    char: 'C',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    label: 'DIGITAL PRECISION',
    title: 'Digital Precision',
    description: 'Perfecting every detail—from the accurate reflection on glass to complex parametric geometries.',
    mx: 15,
    my: 15,
    parallax: -30,
    zoomStart: 1.08,
    zoomEnd: 1.20,
  },
  {
    char: 'H',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    label: null,
    title: 'Human Connection',
    description: 'Creating visual moments that resonate with developers, investors, and prospective buyers across India.',
    mx: -18,
    my: -18,
    parallax: 45,
    zoomStart: 1.05,
    zoomEnd: 1.28,
  },
];

interface LetterMaskProps {
  char: string;
  img: string;
  mx: number;
  my: number;
  parallax: number;
  zoomStart: number;
  zoomEnd: number;
  mXSpring: any;
  mYSpring: any;
  scrollYProgress: any;
}

function LetterMask({
  char,
  img,
  mx,
  my,
  parallax,
  zoomStart,
  zoomEnd,
  mXSpring,
  mYSpring,
  scrollYProgress,
}: LetterMaskProps) {
  const floatY = useMotionValue(0);
  const zoomScale = useMotionValue(zoomStart);

  useEffect(() => {
    // Floating loop (organic timing variance)
    const floatAnim = animate(floatY, [-3, 3], {
      ease: 'easeInOut',
      duration: 4.5 + Math.random() * 2,
      repeat: Infinity,
      repeatType: 'reverse',
    });

    // Slow zoom loop (organic timing variance)
    const zoomAnim = animate(zoomScale, [zoomStart, zoomEnd], {
      ease: 'easeInOut',
      duration: 8 + Math.random() * 3,
      repeat: Infinity,
      repeatType: 'reverse',
    });

    return () => {
      floatAnim.stop();
      zoomAnim.stop();
    };
  }, [floatY, zoomScale, zoomStart, zoomEnd]);

  // Transformed motion values for mouse displacement
  const tX = useTransform(mXSpring, [-0.5, 0.5], [-mx, mx]);
  const tY = useTransform(mYSpring, [-0.5, 0.5], [-my, my]);

  // Transform for scroll-based vertical parallax
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  return (
    <div className="flex-1 aspect-[3/4] relative overflow-hidden select-none">
      <svg
        viewBox="0 0 100 130"
        className="w-full h-full"
      >
        <defs>
          <mask id={`mask-${char}`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="130">
            <rect width="100" height="130" fill="black" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="white"
              fontSize="125"
              fontWeight="900"
              fontFamily="Sora, sans-serif"
              dy="4"
            >
              {char}
            </text>
          </mask>

          {/* Premium soft drop-shadow that follows the contour of the letter shape */}
          <filter id={`shadow-${char}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#000000" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* Outer group applying the letter-contour drop shadow */}
        <g filter={`url(#shadow-${char})`}>
          {/* Masked groups applying interactive animations */}
          <motion.g mask={`url(#mask-${char})`}>
            {/* Layer 1: Mouse hover shifts */}
            <motion.g style={{ x: tX, y: tY }}>
              {/* Layer 2: Scroll parallax */}
              <motion.g style={{ y: scrollParallaxY }}>
                {/* Layer 3: Slow float loop */}
                <motion.g style={{ y: floatY }}>
                  <motion.image
                    href={img}
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ scale: zoomScale }}
                    className="filter contrast-[1.15] brightness-[0.88] grayscale-[0.08]"
                  />
                </motion.g>
              </motion.g>
            </motion.g>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}

export default function ArchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const [isCyclingPaused, setIsCyclingPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (isDesktop || isCyclingPaused) return;

    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % LETTERS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isDesktop, isCyclingPaused]);

  const handleLetterClick = (index: number) => {
    if (isDesktop) return;
    setActiveMobileIndex(index);
    setIsCyclingPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const MathRect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - MathRect.left) / MathRect.width - 0.5; // range [-0.5, 0.5]
    const y = (e.clientY - MathRect.top) / MathRect.height - 0.5; // range [-0.5, 0.5]
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  // Setup spring-smoothed mouse coordinate values
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const mXSpring = useSpring(mX, { damping: 45, stiffness: 100 });
  const mYSpring = useSpring(mY, { damping: 45, stiffness: 100 });

  useEffect(() => {
    mX.set(mouse.x);
    mY.set(mouse.y);
  }, [mouse.x, mouse.y, mX, mY]);

  // Setup scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="arch-section"
      aria-labelledby="philosophy-title"
    >
      <div className="section-inner">
        <div className="arch-panel">
          <h2 id="philosophy-title" className="home-section__title" style={{ marginBottom: '48px' }}>
            Brand Philosophy
          </h2>
          <div className="relative flex items-center justify-between w-full gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            {LETTERS.map((letter, i) => {
              const isHovered = isDesktop ? hoveredIndex === i : activeMobileIndex === i;
              return (
                <Fragment key={letter.char}>
                  {/* Outer column cell that centers the letter within its 25% column slot */}
                  <div className="flex-1 flex justify-center items-center">
                    {/* Individual Letter SVG Mask Container with Hover/Focus handlers */}
                    <div
                      className="relative arch-letter aspect-[3/4] w-full max-w-[200px] md:max-w-[230px] lg:max-w-[245px] cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(i)}
                      onBlur={() => setHoveredIndex(null)}
                      onClick={() => handleLetterClick(i)}
                      tabIndex={0}
                    >
                      <motion.div
                        animate={{
                          opacity: isHovered ? 0 : 1,
                          scale: isHovered ? 0.94 : 1,
                          y: isHovered ? 12 : 0,
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-full h-full flex flex-col"
                      >
                        <LetterMask
                          char={letter.char}
                          img={letter.img}
                          mx={letter.mx}
                          my={letter.my}
                          parallax={letter.parallax}
                          zoomStart={letter.zoomStart}
                          zoomEnd={letter.zoomEnd}
                          mXSpring={mXSpring}
                          mYSpring={mYSpring}
                          scrollYProgress={scrollYProgress}
                        />
                      </motion.div>

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="arch-letter__preview"
                            initial={{ opacity: 0, scale: 0.94, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: -10 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <motion.img
                              src={letter.img}
                              alt={letter.title}
                              className="w-full h-full object-cover"
                              style={{ filter: `url(#liquid-chrome-${letter.char})` }}
                              initial={{ scale: 1.12 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 1.12 }}
                              transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <motion.div
                              initial={{ y: 8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 8, opacity: 0 }}
                              transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
                              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
                            >
                              <div className="px-4 py-2 bg-[#0F0F0F]/85 backdrop-blur-md border border-white/10 rounded-full whitespace-nowrap shadow-lg">
                                <span className="font-inter text-[10px] sm:text-xs tracking-wider text-white-force font-medium">
                                  {letter.title}
                                </span>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Vertical Elegant Gold Divider Label (between letters) */}
                  {letter.label && (
                    <div
                      className="hidden sm:flex flex-col items-center justify-center h-full select-none pointer-events-none absolute"
                      style={{
                        left: `${(i + 1) * 25}%`,
                        transform: 'translateX(-50%)',
                        top: 0,
                        bottom: 0,
                        zIndex: 5,
                      }}
                    >
                      <div className="h-10 md:h-20 w-[1px] bg-gradient-to-b from-[#E6C383]/40 to-transparent mb-4" />
                      <span
                        className="[writing-mode:vertical-lr] rotate-180 font-inter text-[8px] md:text-[10px] tracking-[0.38em] text-[#E6C383] uppercase whitespace-nowrap font-light"
                        style={{ textShadow: '0 0 10px rgba(230, 195, 131, 0.2)' }}
                      >
                        {letter.label}
                      </span>
                      <div className="h-10 md:h-20 w-[1px] bg-gradient-to-t from-[#E6C383]/40 to-transparent mt-4" />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
