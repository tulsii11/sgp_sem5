import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const ScrollStoryAnimation = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Track scroll inside the tall story track (380vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // -------------------------------------------------------------
  // LINE MORPHING TIMELINE (0% to 100% Scroll):
  //
  // 1. Scribble Line Opening / Uncoiling (0.00 -> 0.25 Scroll):
  //    The tangled scribble lines uncoil outwards into the circle arc.
  //    NO image rotation! Pure line uncoiling / path opening effect.
  // -------------------------------------------------------------

  // Scribble line uncoiling: path length shrinks from full (1) to 0 as it opens out
  const scribblePathLength = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const scribbleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 0.6, 0]);
  
  // Circle arc opening: path length grows from 0 to 1 as the scribble line opens into it
  const circlePathLength = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.70, 0.82], [0, 1, 1, 0]);
  const circleScale = useTransform(scrollYProgress, [0.05, 0.25, 0.65, 0.82], [0.85, 1, 1, 0.35]);

  // Captions for Step 1 & 2
  const caption1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 0.8, 0]);
  const caption2Opacity = useTransform(scrollYProgress, [0.10, 0.18, 0.28], [0, 1, 0]);

  // Satellites Around Circle (Resume, DSA, Aptitude, Experience, Mock Interviews)
  const satellitesOpacity = useTransform(scrollYProgress, [0.24, 0.34, 0.52, 0.60], [0, 1, 1, 0]);
  const satellitesScale = useTransform(scrollYProgress, [0.24, 0.34], [0.8, 1]);

  // Center Message inside Circle: "Let's Get You Placed."
  const placedTextOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.62, 0.70], [0, 1, 1, 0]);
  const placedTextScale = useTransform(scrollYProgress, [0.35, 0.45, 0.62, 0.70], [0.85, 1, 1, 0.9]);
  const caption3SubOpacity = useTransform(scrollYProgress, [0.40, 0.50, 0.65], [0, 1, 0]);

  // Transformation to CampusHire Logo (0.65 to 0.88)
  const logoTransformOpacity = useTransform(scrollYProgress, [0.65, 0.73, 0.83, 0.90], [0, 1, 1, 0]);
  const logoTransformScale = useTransform(scrollYProgress, [0.65, 0.75, 0.83], [0.7, 1, 0.9]);
  const caption4SubOpacity = useTransform(scrollYProgress, [0.70, 0.78, 0.86], [0, 1, 0]);

  // Hero Section Full Reveal (0.85 to 1.0)
  const heroRevealOpacity = useTransform(scrollYProgress, [0.84, 0.94], [0, 1]);
  const heroRevealY = useTransform(scrollYProgress, [0.84, 0.94], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[380vh] bg-[#F7FAFF]">
      
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Top Navbar */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.84, 0.94], [1, 0]) }}
          className="w-full max-w-7xl mx-auto flex items-center justify-between z-30"
        >
          <Logo size="md" variant="full" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-xs sm:text-sm font-bold text-[#0B2A52] hover:text-[#18B7C9] px-4 py-2 rounded-xl hover:bg-[#EAF4FF] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </motion.div>

        {/* Central Dynamic Canvas Stage */}
        <div className="relative w-full max-w-4xl mx-auto flex-1 flex items-center justify-center my-auto z-20">
          
          {/* SVG Canvas for Line Uncoiling Animation */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            
            <svg
              className="absolute inset-0 w-full h-full text-[#0B2A52] pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
            >
              {/* STEP 1: Scribble Line (Fully present at 0% scroll, UNCOILS & OPENS OUT on scroll) */}
              <motion.path
                d="M 100,20 C 140,20 180,50 160,90 C 140,130 70,140 40,100 C 20,60 60,30 100,60 C 130,80 150,120 130,160 C 110,190 50,180 30,140 C 20,100 60,60 100,20 Z"
                stroke="#0B2A52"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength: scribblePathLength,
                  opacity: scribbleOpacity
                }}
              />

              {/* STEP 2: Circle Perimeter Arc (Opens up directly as the scribble lines expand) */}
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

            {/* Step 1 & 2 Captions */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.p
                style={{ opacity: caption1Opacity }}
                className="text-2xl sm:text-3xl font-serif italic text-[#18B7C9] tracking-wide mt-24"
              >
                your idea
              </motion.p>
              <motion.p
                style={{ opacity: caption2Opacity }}
                className="text-2xl sm:text-3xl font-serif italic text-[#18B7C9] tracking-wide mt-24"
              >
                Shaping your path
              </motion.p>
            </div>

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
                <div className="absolute -top-6 left-6 sm:left-10 bg-white p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">Resume</span>
                </div>

                {/* 2. DSA (Top-Right) */}
                <div className="absolute -top-6 right-6 sm:right-10 bg-white p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#3B82D0]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">DSA</span>
                </div>

                {/* 3. Aptitude (Right) */}
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">Aptitude</span>
                </div>

                {/* 4. Company Experience (Bottom) */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#0B2A52]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2A52]">Company Experience</span>
                </div>

                {/* 5. Mock Interviews (Left) */}
                <div className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                    <MessageSquare className="w-5 h-5" />
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

          {/* Subtitle for "Let's Get You Placed." */}
          <motion.div
            style={{ opacity: caption3SubOpacity }}
            className="absolute bottom-10 text-center"
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
            className="absolute flex flex-col items-center justify-center text-center"
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
            style={{ opacity: heroRevealOpacity, y: heroRevealY }}
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

              {/* Right Column Student Character Illustration */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#EAF4FF] to-white border border-[#3B82D0]/20 p-6 flex flex-col justify-end items-center overflow-hidden shadow-xl">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0B2A52_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#0B2A52] via-[#3B82D0] to-[#18B7C9] p-1 shadow-xl mb-4">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <svg className="w-24 h-24 text-[#0B2A52]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6v1H4v-1z" />
                        </svg>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#0B2A52] text-white text-xs font-bold shadow-md mb-1">
                      Campus Student 2026
                    </span>
                    <p className="text-xs text-[#64748B] font-medium">Ready for Top Tech Placements</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Scroll Helper Indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.84, 0.94], [1, 1, 0]) }}
          className="z-30 flex flex-col items-center text-center mb-2"
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
