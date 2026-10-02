import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Award, BookOpen, Briefcase, Code, Sparkles, CheckCircle2 } from 'lucide-react';
import mascotImg from '../assets/student-laptop-mascot.png';

const InteractiveMascot = ({ className = '' }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [studentName, setStudentName] = useState('Alex Morgan');
  const [isEditingName, setIsEditingName] = useState(false);

  const hotspots = [
    {
      id: 'name',
      label: 'Student Name',
      tooltip: 'Enter your name',
      position: '-top-2 left-1/2 -translate-x-1/2',
      icon: User,
      color: 'bg-[#0B2A52] text-white',
      desc: 'Customize your student identity'
    },
    {
      id: 'academics',
      label: 'CGPA & Academics',
      tooltip: 'Input your CGPA & University',
      position: 'top-16 -left-6 sm:-left-16 lg:-left-20',
      icon: BookOpen,
      color: 'bg-[#18B7C9] text-white',
      desc: 'B.Tech CS • 8.9 CGPA'
    },
    {
      id: 'skills',
      label: 'Technical Skills',
      tooltip: 'Select technical & coding skills',
      position: 'top-28 -right-6 sm:-right-16 lg:-right-20',
      icon: Code,
      color: 'bg-[#3B82D0] text-white',
      desc: 'React, Node, Python, SQL'
    },
    {
      id: 'backpack',
      label: 'Projects & Resume',
      tooltip: 'Upload projects & resume',
      position: 'bottom-20 -left-8 sm:-left-20 lg:-left-24',
      icon: Award,
      color: 'bg-[#071D3A] text-white',
      desc: '4 Core Projects & ATS Resume'
    },
    {
      id: 'experience',
      label: 'Internships',
      tooltip: 'Add internship experience',
      position: 'bottom-14 -right-8 sm:-right-20 lg:-right-24',
      icon: Briefcase,
      color: 'bg-[#18B7C9] text-white',
      desc: '2 Industry Internships'
    }
  ];

  return (
    <div className={`relative w-full max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-center select-none py-2 ${className}`}>
      
      {/* Soft Ambient Radial Glow (no solid box) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[560px] sm:h-[560px] rounded-full bg-[#18B7C9]/20 blur-3xl pointer-events-none" />

      {/* Mascot Image with Floating Animation (Hero Prominent Size) */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="relative z-10 w-full flex items-center justify-center px-1"
      >
        <img
          src={mascotImg}
          alt="CampusHire Student Mascot"
          className="w-full max-w-[720px] lg:max-w-[800px] h-auto object-contain drop-shadow-2xl filter scale-105 sm:scale-110"
        />
      </motion.div>

      {/* Interactive Hotspot Buttons & Tooltips */}
      {hotspots.map((spot) => {
        const Icon = spot.icon;
        const isActive = activeTooltip === spot.id;

        return (
          <div
            key={spot.id}
            className={`absolute z-30 ${spot.position}`}
            onMouseEnter={() => setActiveTooltip(spot.id)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {/* Hotspot Pulsing Indicator */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (spot.id === 'name') {
                  setIsEditingName(!isEditingName);
                }
              }}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-xl border border-white/60 cursor-pointer transition-all duration-200 ${spot.color}`}
            >
              <Icon className="w-4 h-4" />
              
              {spot.id === 'name' ? (
                isEditingName ? (
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                    className="bg-transparent text-white text-xs font-bold outline-none border-b border-white max-w-[100px]"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-bold tracking-tight">{studentName}</span>
                )
              ) : (
                <span className="text-xs sm:text-sm font-bold tracking-tight">{spot.label}</span>
              )}

              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
            </motion.button>

            {/* Floating Speech Bubble Tooltip */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#071D3A] text-white p-3.5 rounded-2xl shadow-2xl border border-[#18B7C9]/40 min-w-[200px] text-center pointer-events-none z-40"
                >
                  <div className="flex items-center justify-center gap-1.5 text-[#18B7C9] text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{spot.tooltip}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {spot.desc}
                  </p>
                  
                  {/* Tooltip Downward Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-[#071D3A] rotate-45 border-r border-b border-[#18B7C9]/40" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Bottom Floating Badge */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#EAF4FF] shadow-lg flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#18B7C9]" />
        <span className="text-xs font-bold text-[#0B2A52]">Hover parts to interact</span>
      </div>

    </div>
  );
};

export default InteractiveMascot;
