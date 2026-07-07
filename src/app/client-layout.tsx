'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { Preloader } from '../components/Preloader';
import { ToastContainer } from '../components/ToastContainer';
import ScrollToTop from '../components/layout/ScrollToTop';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let frameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        const x = `${e.clientX}px`;
        const y = `${e.clientY}px`;
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
        frameId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <div id="app-root" className="min-h-screen w-full bg-bg-primary text-text-primary overflow-x-hidden relative">
        <div className="mouse-glow" />
        <ToastContainer />
        <AnimatePresence mode="wait">
          {showPreloader ? (
            <Preloader key="preloader" onComplete={() => setShowPreloader(false)} />
          ) : (
            <div key="content" className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow flex flex-col">
                {children}
              </div>
              <Footer />
              <BackToTop />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
