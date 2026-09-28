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
import InteractiveMascot from './InteractiveMascot';
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
  // NON-OVERLAPPING SCROLL TIMELINE:
  // -------------------------------------------------------------

  // 1. Mouse Pill "SCROLL TO EXPLORE": Visible ONLY at 0% scroll (0.00 -> 0.05), vanishes completely on scroll!
  const scrollHelperOpacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [1, 0.3, 0]);

  // 2. Caption "your idea": Visible ONLY at 0% scroll (0.00 -> 0.05), vanishes instantly when scrolling starts!
  const captionYourIdeaOpacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [1, 0.3, 0]);

  // 3. Scribble Line Opening / Uncoiling (0.00 -> 0.22 Scroll)
  const scribblePathLength = useTransform(scrollYProgress, [0, 0.20], [1, 0]);
  const scribbleOpacity = useTransform(scrollYProgress, [0, 0.14, 0.22], [1, 0.5, 0]);
  
  // 4. Circle Arc Opening (0.05 -> 0.24 Scroll)
  const circlePathLength = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0.05, 0.14, 0.70, 0.82], [0, 1, 1, 0]);
  const circleScale = useTransform(scrollYProgress, [0.05, 0.22, 0.65, 0.82], [0.85, 1, 1, 0.35]);

  // 5. Caption "our idea" (Inside forming circle from 0.08 to 0.30)
  const captionOurIdeaOpacity = useTransform(scrollYProgress, [0.08, 0.16, 0.28], [0, 1, 0]);
  const captionOurIdeaScale = useTransform(scrollYProgress, [0.08, 0.16, 0.28], [0.85, 1, 0.9]);

  // 6. 5 Satellites Around Circle (Resume, DSA, Aptitude, Experience, Mock Interviews) (0.30 to 0.56)
  const satellitesOpacity = useTransform(scrollYProgress, [0.30, 0.38, 0.52, 0.58], [0, 1, 1, 0]);
  const satellitesScale = useTransform(scrollYProgress, [0.30, 0.38], [0.8, 1]);

  // 7. Center Message inside Circle: "Let's Get You Placed." (0.35 to 0.65)
  const placedTextOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.66], [0, 1, 1, 0]);
  const placedTextScale = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.66], [0.85, 1, 1, 0.9]);

  // 8. Subtitle below circle: "Your journey. Structured. Guided. Successful." (ONLY AFTER satellites & Company Experience badge vanish at 0.60!)
  const caption3SubOpacity = useTransform(scrollYProgress, [0.60, 0.66, 0.74], [0, 1, 0]);

  // 9. Transformation to CampusHire Logo (0.72 to 0.88)
  const logoTransformOpacity = useTransform(scrollYProgress, [0.72, 0.78, 0.85, 0.90], [0, 1, 1, 0]);
  const logoTransformScale = useTransform(scrollYProgress, [0.72, 0.78, 0.85], [0.7, 1, 0.9]);
  const caption4SubOpacity = useTransform(scrollYProgress, [0.75, 0.80, 0.88], [0, 1, 0]);

  // 10. Hero Section Full Reveal (0.86 to 1.0)
  const heroRevealOpacity = useTransform(scrollYProgress, [0.86, 0.95], [0, 1]);
  const heroRevealY = useTransform(scrollYProgress, [0.86, 0.95], [40, 0]);
  const heroPointerEvents = useTransform(scrollYProgress, [0.86, 0.92], ['none', 'auto']);

  return (
    <div ref={containerRef} className="relative h-[380vh] bg-[#F7FAFF]">
      
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden pt-20 pb-6 px-4 sm:px-6 lg:px-8">
        
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
