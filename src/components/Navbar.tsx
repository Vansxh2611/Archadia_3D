'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavScroll } from '../hooks';
import { NAV_ITEMS } from '../utils/data';
import type { NavItem } from '../types';
import { useUIStore } from '../store/useUIStore';

export default function Navbar() {
  const { scrolled } = useNavScroll();
  const { menuOpen, toggleMenu, closeMenu } = useUIStore();
  const pathname = usePathname();

  const navClassName = scrolled
    ? 'fixed top-0 left-0 right-0 w-full rounded-none px-6 py-3 border-x-0 border-t-0 glass-nav lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[88%] lg:max-w-[1140px] lg:rounded-full lg:px-8 lg:py-3.5 lg:shadow-2xl z-50 navbar-transition'
    : 'fixed top-0 left-0 right-0 w-full rounded-none px-6 py-4.5 border-x-0 border-t-0 glass-nav lg:top-6 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[92%] lg:max-w-[1240px] lg:rounded-full lg:px-8 lg:py-4.5 z-50 navbar-transition';

  return (
    <>
      <motion.nav
        className={navClassName}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0.5 focus:outline-none"
            aria-label="ARCHADIA 3D - Go to home"
            onClick={closeMenu}
          >
            <span className="font-sora font-bold text-base sm:text-lg md:text-xl tracking-[0.12em] navbar-logo-text">ARCHADIA</span>
            <span className="font-sora font-bold text-base sm:text-lg md:text-xl tracking-[0.12em] text-[#E6C383]"> 3D</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item: NavItem) => {
              const isActive = item.href === '/' 
                ? pathname === '/' 
                : pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`relative font-inter text-sm tracking-wide focus:outline-none group ${
                      isActive ? 'nav-link--active' : 'nav-link'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#E6C383] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/contact"
              className="btn btn-secondary btn-sm flex whitespace-nowrap !px-3 !py-1.5 sm:!px-4 sm:!py-2 !text-[10px] sm:!text-xs"
            >
              <span className="inline lg:hidden">Start Project</span>
              <span className="hidden lg:inline">Start a Project</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white focus:outline-none p-1"
              aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 flex flex-col pt-24 pb-10 px-8 lg:hidden overflow-y-auto"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-6 mt-4">
              {NAV_ITEMS.map((item: NavItem, i: number) => {
                const isActive = item.href === '/' 
                  ? pathname === '/' 
                  : pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`font-sora text-2xl font-light focus:outline-none ${
                        isActive ? 'mobile-nav-link--active' : 'mobile-nav-link'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <motion.div
              className="mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={closeMenu}
                className="btn btn-secondary btn-md w-full"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
