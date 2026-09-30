import React from 'react';
import ScrollStoryAnimation from '../components/ScrollStoryAnimation';
import CrackPlacementsSection from '../components/CrackPlacementsSection';
import Stage1Profile from '../components/ScrollStory/Stage1Profile';
import Stage2Potential from '../components/ScrollStory/Stage2Potential';
import Stage3Probability from '../components/ScrollStory/Stage3Probability';
import Stage4Gaps from '../components/ScrollStory/Stage4Gaps';
import Stage5Guided from '../components/ScrollStory/Stage5Guided';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';

const Landing = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#EEF5FF] via-[#E2EEFC] to-[#D5E6F8] relative overflow-hidden select-none">
      
      {/* Global Background Decor 1: Floating Dot Grids */}
      <div className="absolute top-[120vh] left-6 pointer-events-none opacity-25 hidden lg:grid grid-cols-6 gap-2.5 z-0">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
        ))}
      </div>
      <div className="absolute top-[240vh] right-8 pointer-events-none opacity-25 hidden lg:grid grid-cols-6 gap-2.5 z-0">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
        ))}
      </div>
      <div className="absolute top-[360vh] left-10 pointer-events-none opacity-25 hidden lg:grid grid-cols-6 gap-2.5 z-0">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
        ))}
      </div>

      {/* Global Background Decor 2: Concentric Circles & Cyan Orbs */}
      <div className="absolute top-[140vh] right-10 w-96 h-96 border border-[#18B7C9]/20 rounded-full pointer-events-none z-0" />
      <div className="absolute top-[280vh] left-1/4 w-[500px] h-[500px] border border-[#2563EB]/15 rounded-full pointer-events-none z-0" />
      <div className="absolute top-[420vh] right-1/3 w-80 h-80 bg-[#18B7C9]/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Global Background Decor 3: Vector College Building & City Skyline Silhouettes at the bottom of the page */}
      <div className="absolute bottom-0 left-0 right-0 h-52 sm:h-72 pointer-events-none opacity-30 flex items-end justify-between px-4 z-0 overflow-hidden">
        {/* Left College Building */}
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

      {/* STEPS 1 TO 6: Interactive Scroll Story Animation (0% to 100% Scroll Transformation) */}
      <div id="hero" className="relative z-10">
        <ScrollStoryAnimation />
      </div>

      {/* STEP 7: After Scroll — "Everything you need to crack placements" & University Trust Badges */}
      <div className="relative z-10">
        <CrackPlacementsSection />
      </div>

      {/* Deep Interactive Profiling & ML Engine Stages */}
      <section id="scroll-story" className="w-full relative z-10">
        <Stage1Profile />
        <Stage2Potential />
        <Stage3Probability />
        <Stage4Gaps />
        <Stage5Guided />
      </section>

      {/* Integrated Feature Capabilities */}
      <div className="relative z-10">
        <FeaturesSection />
      </div>

      {/* How Platform Works */}
      <div className="relative z-10">
        <HowItWorks />
      </div>

    </div>
  );
};

export default Landing;
