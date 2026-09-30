import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FileText,
  Code2,
  BarChart3,
  Briefcase,
  MessageSquare,
  Sparkles,
  ArrowRight,
  UserCheck,
  Target
} from 'lucide-react';
import Button from './Button';
import InteractiveMascot from './InteractiveMascot';
import { useNavigate } from 'react-router-dom';

const ScrollStoryAnimation = () => {
  const navigate = useNavigate();

  // Controlled animation progress from 0.0 to 1.0
  const animProgress = useMotionValue(0);
  const smoothProgress = useSpring(animProgress, { stiffness: 120, damping: 22, mass: 0.6 });
  const progressRef = useRef(0);

  // Wheel and Touch Event Scroll Lock Controller
  useEffect(() => {
    let touchStartY = 0;

    const lockBodyScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const unlockBodyScroll = () => {
      document.body.style.overflow = 'unset';
    };

    const handleWheel = (e) => {
      // Only capture wheel events when near the top of the page
      if (window.scrollY <= 15) {
        if (progressRef.current < 1 || (progressRef.current >= 1 && e.deltaY < 0 && window.scrollY <= 15)) {
          e.preventDefault();

          // Sensitivity scaling for wheel input
          const delta = e.deltaY * 0.0016;
          const nextVal = Math.max(0, Math.min(1, progressRef.current + delta));

          progressRef.current = nextVal;
          animProgress.set(nextVal);

          if (nextVal >= 1) {
            unlockBodyScroll();
          } else {
            lockBodyScroll();
          }
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY <= 15 && e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;

        if (progressRef.current < 1 || (progressRef.current >= 1 && deltaY < 0 && window.scrollY <= 15)) {
          if (e.cancelable) e.preventDefault();

          const delta = deltaY * 0.0028;
          const nextVal = Math.max(0, Math.min(1, progressRef.current + delta));

          progressRef.current = nextVal;
          animProgress.set(nextVal);
          touchStartY = touchY;

          if (nextVal >= 1) {
            unlockBodyScroll();
          } else {
            lockBodyScroll();
          }
        }
      }
    };

    // Lock body scroll on initial mount if at top
    if (progressRef.current < 1 && window.scrollY <= 15) {
      lockBodyScroll();
    }

    // Unlock body scroll if user clicks any anchor link or leaves hero stage
    const handleHashOrNav = () => {
      if (window.location.hash && window.location.hash !== '#hero') {
        progressRef.current = 1;
        animProgress.set(1);
        unlockBodyScroll();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('hashchange', handleHashOrNav);

    return () => {
      unlockBodyScroll();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('hashchange', handleHashOrNav);
    };
  }, [animProgress]);

  // -------------------------------------------------------------
  // NON-OVERLAPPING SCROLL TIMELINE (0.0 to 1.0):
  // -------------------------------------------------------------

  // 1. Mouse Pill "SCROLL TO EXPLORE": Visible ONLY at 0% scroll (0.00 -> 0.05), vanishes completely on scroll!
  const scrollHelperOpacity = useTransform(smoothProgress, [0, 0.02, 0.05], [1, 0.3, 0]);

  // 2. Caption "your idea": Stays visible while circle forms, disappears EXACTLY when 90% of circle is formed (at 0.20 scroll)
  const captionYourIdeaOpacity = useTransform(smoothProgress, [0, 0.14, 0.20], [1, 1, 0]);

  // 3. Scribble Line Opening / Uncoiling (0.00 -> 0.22 Scroll)
  const scribblePathLength = useTransform(smoothProgress, [0, 0.20], [1, 0]);
  const scribbleOpacity = useTransform(smoothProgress, [0, 0.14, 0.22], [1, 0.5, 0]);
  
  // 4. Circle Arc Opening (0.05 -> 0.22 Scroll)
  const circlePathLength = useTransform(smoothProgress, [0.05, 0.22], [0, 1]);
  const circleOpacity = useTransform(smoothProgress, [0.05, 0.14, 0.70, 0.84], [0, 1, 1, 0]);
  const circleScale = useTransform(smoothProgress, [0.05, 0.22, 0.65, 0.84], [0.85, 1, 1, 0.35]);

  // 5. Caption "our idea" (Fades in right as circle reaches completion from 0.18 to 0.32)
  const captionOurIdeaOpacity = useTransform(smoothProgress, [0.18, 0.24, 0.32], [0, 1, 0]);
  const captionOurIdeaScale = useTransform(smoothProgress, [0.18, 0.24, 0.32], [0.85, 1, 0.9]);

  // 6. 5 Satellites Around Circle (Resume, DSA, Aptitude, Experience, Mock Interviews) (0.30 to 0.56)
  const satellitesOpacity = useTransform(smoothProgress, [0.30, 0.38, 0.52, 0.58], [0, 1, 1, 0]);
  const satellitesScale = useTransform(smoothProgress, [0.30, 0.38], [0.8, 1]);

  // 7. Center Message inside Circle: "Let's Get You Placed." (0.35 to 0.62)
  const placedTextOpacity = useTransform(smoothProgress, [0.35, 0.43, 0.58, 0.64], [0, 1, 1, 0]);
  const placedTextScale = useTransform(smoothProgress, [0.35, 0.43, 0.58, 0.64], [0.85, 1, 1, 0.9]);

  // 8. Subtitle below circle: "Your journey. Structured. Guided. Successful." (0.60 to 0.74)
  const caption3SubOpacity = useTransform(smoothProgress, [0.60, 0.66, 0.74], [0, 1, 0]);

  // 9. Transformation to CampusHire Logo (0.72 to 0.86)
  const logoTransformOpacity = useTransform(smoothProgress, [0.72, 0.78, 0.84, 0.88], [0, 1, 1, 0]);
  const logoTransformScale = useTransform(smoothProgress, [0.72, 0.78, 0.84], [0.7, 1, 0.9]);
  const caption4SubOpacity = useTransform(smoothProgress, [0.74, 0.80, 0.88], [0, 1, 0]);

  // 10. Hero Section Full Reveal (0.84 to 0.98)
  const heroRevealOpacity = useTransform(smoothProgress, [0.84, 0.98], [0, 1]);
  const heroRevealY = useTransform(smoothProgress, [0.84, 0.98], [30, 0]);
  const heroPointerEvents = useTransform(smoothProgress, [0.84, 0.94], ['none', 'auto']);

  return (
    <div className="relative h-screen w-full overflow-hidden select-none">
      
      {/* Viewport Stage */}
      <div className="h-full w-full flex flex-col justify-between items-center overflow-hidden pt-20 pb-6 px-4 sm:px-6 lg:px-8 z-10 bg-gradient-to-br from-[#EEF5FF] via-[#E2EEFC] to-[#D5E6F8]">
        
        {/* Background Decor 1: Left & Right Dot Grids */}
        <div className="absolute top-24 left-8 sm:left-12 pointer-events-none opacity-40 hidden md:grid grid-cols-6 gap-2.5 z-0">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
          ))}
        </div>
        <div className="absolute top-28 right-8 sm:right-12 pointer-events-none opacity-40 hidden md:grid grid-cols-6 gap-2.5 z-0">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
          ))}
        </div>

        {/* Background Decor 2: Concentric Circles & Soft Radial Cyan Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] sm:w-[680px] sm:h-[680px] border border-[#18B7C9]/25 rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] border border-[#2563EB]/15 rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#18B7C9]/15 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Background Decor 3: Vector College Building & City Skyline Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-64 pointer-events-none opacity-35 flex items-end justify-between px-4 sm:px-8 z-0 overflow-hidden">
          {/* Left College Building with Dome & Flag */}
          <svg className="w-72 sm:w-96 h-full text-[#3B82F6]" viewBox="0 0 350 220" fill="currentColor">
            <rect x="40" y="80" width="270" height="140" rx="4" />
            <polygon points="175,25 40,80 310,80" />
            <rect x="70" y="95" width="16" height="125" fill="#FFFFFF" />
            <rect x="115" y="95" width="16" height="125" fill="#FFFFFF" />
            <rect x="160" y="95" width="30" height="125" fill="#FFFFFF" />
            <rect x="219" y="95" width="16" height="125" fill="#FFFFFF" />
            <rect x="264" y="95" width="16" height="125" fill="#FFFFFF" />
            <line x1="175" y1="25" x2="175" y2="5" stroke="currentColor" strokeWidth="3" />
            <polygon points="175,5 195,10 175,15" />
          </svg>

          {/* Center Skyscraper City Skyline */}
          <svg className="w-96 sm:w-[500px] h-[80%] text-[#2563EB] mx-auto hidden md:block" viewBox="0 0 400 200" fill="currentColor">
            <rect x="50" y="40" width="50" height="160" rx="2" />
            <rect x="110" y="10" width="70" height="190" rx="2" />
            <polygon points="145,0 110,10 180,10" />
            <rect x="190" y="60" width="60" height="140" rx="2" />
            <rect x="260" y="30" width="80" height="170" rx="2" />
            <rect x="125" y="30" width="12" height="140" fill="#FFFFFF" opacity="0.6" />
            <rect x="148" y="30" width="12" height="140" fill="#FFFFFF" opacity="0.6" />
          </svg>

          {/* Right Skyline */}
          <svg className="w-64 sm:w-80 h-full text-[#1D4ED8]" viewBox="0 0 300 180" fill="currentColor">
            <rect x="30" y="50" width="100" height="130" rx="2" />
            <rect x="140" y="20" width="120" height="160" rx="2" />
          </svg>
        </div>
        
        {/* Central Dynamic Canvas Stage */}
        <div className="relative w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center my-auto z-20">
          
          {/* SVG Canvas for Line Uncoiling Animation */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            
            <svg
              className="absolute inset-0 w-full h-full text-[#0B2A52] pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
            >
              {/* STEP 1: Scribble Line (Fully present at 0% scroll, UNCOILS & OPENS OUT smoothly on scroll) */}
              <motion.path
                d="M 100,25 C 140,25 180,55 160,95 C 140,135 70,145 40,105 C 20,65 60,35 100,65 C 130,85 150,125 130,165 C 110,195 50,185 30,145 C 20,105 60,65 100,25 Z"
                stroke="#0B2A52"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength: scribblePathLength,
                  opacity: scribbleOpacity
                }}
              />

              {/* STEP 2: Circle Perimeter Arc (Opens up directly as scribble uncoils) */}
              <motion.circle
                cx="100"
                cy="100"
                r="76"
                stroke="#18B7C9"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{
                  pathLength: circlePathLength,
                  opacity: circleOpacity
                }}
              />
            </svg>

            {/* Step 1 Caption: "your idea" (Sits 16px below scribble, vanishes INSTANTLY on scroll) */}
            <motion.div
              style={{ opacity: captionYourIdeaOpacity }}
              className="absolute -bottom-10 left-0 right-0 flex justify-center text-center pointer-events-none z-10"
            >
              <p className="text-2xl sm:text-3xl font-serif italic text-[#18B7C9] tracking-wide">
                your idea
              </p>
            </motion.div>

            {/* Step 2 Message Inside Forming Circle: "our idea" */}
            <motion.div
              style={{ opacity: captionOurIdeaOpacity, scale: captionOurIdeaScale }}
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-15"
            >
              <h2 className="text-3xl sm:text-4xl font-serif italic text-[#18B7C9] tracking-wide">
                our idea
              </h2>
            </motion.div>

            {/* STEP 3 & 4: Formed Circle Container with Satellites & Center Message */}
            <motion.div
              style={{ scale: circleScale, opacity: circleOpacity }}
              className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-auto"
            >
              {/* 5 Satellites around circle */}
              <motion.div
                style={{ opacity: satellitesOpacity, scale: satellitesScale }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* 1. Resume (Top-Left) */}
                <div className="absolute -top-4 sm:-top-6 left-2 sm:left-6 bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">Resume</span>
                </div>

                {/* 2. DSA (Top-Right) */}
                <div className="absolute -top-4 sm:-top-6 right-2 sm:right-6 bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#3B82D0]">
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">DSA</span>
                </div>

                {/* 3. Aptitude (Right) */}
                <div className="absolute top-1/2 -right-4 sm:-right-10 -translate-y-1/2 bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">Aptitude</span>
                </div>

                {/* 4. Company Experience (Bottom) */}
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#0B2A52]">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">Company Experience</span>
                </div>

                {/* 5. Mock Interviews (Left) */}
                <div className="absolute top-1/2 -left-4 sm:-left-10 -translate-y-1/2 bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">Mock Interviews</span>
                </div>
              </motion.div>

              {/* Message Inside Circle: "Let's Get You Placed." */}
              <motion.div
                style={{ opacity: placedTextOpacity, scale: placedTextScale }}
                className="text-center p-6"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2A52] tracking-tight leading-tight">
                  Let's Get <br />
                  <span className="text-[#18B7C9]">You Placed.</span>
                </h2>
              </motion.div>
            </motion.div>

          </div>

          {/* Subtitle below circle: "Your journey. Structured. Guided. Successful." (ONLY AFTER satellites & Company Experience badge vanish at 0.60!) */}
          <motion.div
            style={{ opacity: caption3SubOpacity }}
            className="mt-6 text-center pointer-events-none"
          >
            <p className="text-base sm:text-lg font-bold text-[#0B2A52]">
              Your journey.
            </p>
            <p className="text-sm sm:text-base font-semibold text-[#18B7C9] mt-0.5">
              Structured. Guided. Successful.
            </p>
          </motion.div>

          {/* STEP 4: Transformation to CampusHire Logo */}
          <motion.div
            style={{ opacity: logoTransformOpacity, scale: logoTransformScale }}
            className="absolute flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border-2 border-dashed border-[#18B7C9]/40 flex items-center justify-center p-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#0B2A52] to-[#071D3A] flex items-center justify-center text-white shadow-2xl shadow-[#0B2A52]/30 border border-[#18B7C9]/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-16 h-16 text-[#18B7C9]"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
            </div>

            <motion.div style={{ opacity: caption4SubOpacity }} className="mt-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A52]">
                Clarity leads to confidence.
              </h3>
              <p className="text-base sm:text-lg font-semibold text-[#18B7C9] mt-1">
                We are here to guide you.
              </p>
            </motion.div>
          </motion.div>

          {/* STEP 5: Hero Section Reveal */}
          <motion.div
            style={{ opacity: heroRevealOpacity, y: heroRevealY, pointerEvents: heroPointerEvents }}
            className="absolute inset-0 flex items-center justify-center w-full max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full px-4">
              
              {/* Left Column Text Content */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2A52] tracking-tight leading-tight">
                  Placement preparation, <br />
                  <span className="text-[#18B7C9]">designed for students.</span>
                </h1>

                {/* Sub Features Bullet List */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-[#0B2A52]">
                    <div className="p-1 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <span>Real interview experiences.</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-[#0B2A52]">
                    <div className="p-1 rounded-lg bg-[#EAF4FF] text-[#3B82D0]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span>Smart preparation.</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-[#0B2A52]">
                    <div className="p-1 rounded-lg bg-[#EAF4FF] text-[#0B2A52]">
                      <Target className="w-5 h-5" />
                    </div>
                    <span>One platform.</span>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="mt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/login')}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Start Your Journey
                  </Button>
                </div>
              </div>

              {/* Right Column Student Mascot Illustration */}
              <div className="lg:col-span-5 flex justify-center">
                <InteractiveMascot />
              </div>

            </div>
          </motion.div>

        </div>

        {/* Scroll Helper Indicator (Fades out completely on scroll) */}
        <motion.div
          style={{ opacity: scrollHelperOpacity }}
          className="z-30 flex flex-col items-center text-center mb-2 pointer-events-none"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#0B2A52]/40 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1.5 h-2.5 rounded-full bg-[#18B7C9]"
            />
          </div>
          <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mt-1">
            Scroll to explore
          </span>
        </motion.div>

      </div>
    </div>
  );
};

export default ScrollStoryAnimation;
