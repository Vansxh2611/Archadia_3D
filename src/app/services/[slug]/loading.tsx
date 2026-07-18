'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between pt-36 pb-16">
      <div className="container-luxury flex-grow flex flex-col justify-center items-center">
        {/* Glowing luxury spinner */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-gray-100" />
          <motion.div
            className="absolute w-16 h-16 rounded-full border-t-2 border-r-2 border-[#E6C383] border-l-transparent border-b-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          />
          <div className="absolute font-sora font-semibold text-[10px] tracking-[0.2em] text-[#94753c] uppercase select-none">
            A3D
          </div>
        </div>

        {/* Pulsing visual skeleton block */}
        <div className="w-full max-w-2xl flex flex-col gap-6 items-center px-4">
          <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse" />
          <div className="h-10 bg-gray-100 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
