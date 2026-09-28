import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const OpeningAnimation = ({ onComplete }) => {
  useEffect(() => {
    // Total animation time is 2.8s before completing
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7FAFF] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Background Soft Blue Gradient Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#EAF4FF] blur-3xl opacity-70 pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#18B7C9]/10 blur-3xl opacity-50 pointer-events-none -bottom-20 -right-20" />

      <div className="relative flex flex-col items-center justify-center p-8 text-center z-10">
        
        {/* Logo Container & Circular Cyan Animated Stroke (Perfectly Centered Box) */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-6">
          
          {/* Thin Cyan Circular Stroke SVG - Centered */}
          <svg className="w-36 h-36 absolute inset-0 pointer-events-none" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#18B7C9"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90, opacity: 0 }}
              animate={{ pathLength: 1, rotate: 270, opacity: 1 }}
              transition={{
                pathLength: { delay: 0.8, duration: 1.1, ease: 'easeInOut' },
                opacity: { delay: 0.7, duration: 0.3 },
                rotate: { delay: 0.8, duration: 1.1, ease: 'easeInOut' }
              }}
            />
          </svg>

          {/* Graduation Cap / Shield Logo Badge Centered */}
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0B2A52] to-[#071D3A] flex items-center justify-center text-white shadow-xl shadow-[#0B2A52]/20 border border-[#18B7C9]/40 relative z-10"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-[#18B7C9]"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#18B7C9] animate-ping opacity-75" />
          </motion.div>
        </div>

        {/* "CampusHire" text appears underneath using smooth fade + upward motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-1 text-3xl md:text-4xl font-extrabold tracking-tight"
        >
          <span className="text-[#0B2A52]">Campus</span>
          <span className="text-[#18B7C9]">Hire</span>
        </motion.div>

        {/* Tagline "Your Campus. Your Career." */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
          className="mt-3 text-sm md:text-base font-semibold text-[#64748B] tracking-wider uppercase"
        >
          Your Campus. Your Career.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default OpeningAnimation;
