import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, TrendingUp, Sparkles, BookOpen, Target } from 'lucide-react';

const IllustrationPlaceholder = ({ type = 'hero' }) => {
  if (type === 'login') {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
        {/* Soft Gradient Radial Background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#EAF4FF] via-white to-[#18B7C9]/10 border border-[#3B82D0]/20 shadow-xl overflow-hidden p-8 flex flex-col justify-between">
          
          {/* Top Decorative Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#18B7C9]" />
              <span className="w-3 h-3 rounded-full bg-[#3B82D0]" />
              <span className="w-3 h-3 rounded-full bg-[#0B2A52]" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 text-[#0B2A52] border border-[#0B2A52]/10 shadow-xs">
              CampusHire AI Platform
            </span>
          </div>

          {/* Center Graphic Artwork */}
          <div className="relative flex flex-col items-center justify-center text-center my-6 z-10">
            {/* Outer Circular Ring */}
            <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-[#18B7C9]/40 flex items-center justify-center p-3 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B2A52] to-[#071D3A] flex flex-col items-center justify-center text-white shadow-lg shadow-[#0B2A52]/30 p-4">
                <Target className="w-10 h-10 text-[#18B7C9] mb-1" />
                <span className="text-2xl font-extrabold text-white">88%</span>
                <span className="text-[10px] text-[#18B7C9] uppercase font-bold tracking-wider">Placement Readiness</span>
              </div>
            </div>

            {/* Floating Metric Badges */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-2 -left-2 bg-white px-3 py-2 rounded-xl shadow-md border border-[#EAF4FF] flex items-center gap-2"
            >
              <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#18B7C9]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-[#64748B]">AI Match</p>
                <p className="text-xs font-bold text-[#0B2A52]">Top 5% Tier</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -bottom-2 -right-2 bg-white px-3 py-2 rounded-xl shadow-md border border-[#EAF4FF] flex items-center gap-2"
            >
              <div className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#3B82D0]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-[#64748B]">Resume Audit</p>
                <p className="text-xs font-bold text-[#0B2A52]">Verified</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Card Summary */}
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#3B82D0]/15 shadow-sm text-center z-10">
            <p className="text-xs font-semibold text-[#0B2A52]">Empowering 10,000+ Students</p>
            <p className="text-[11px] text-[#64748B]">Predict placement probability & bridge your skill gaps.</p>
          </div>
        </div>
      </div>
    );
  }

  // Hero default illustration
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background Soft Glow & Circular Aura */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#18B7C9]/20 via-[#3B82D0]/10 to-[#EAF4FF] rounded-3xl blur-2xl opacity-70" />
      
      {/* Main Container Card */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#EAF4FF] shadow-2xl shadow-[#0B2A52]/10 overflow-hidden">
        
        {/* Top Header Mockup */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F7FAFF] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B2A52] text-white flex items-center justify-center font-bold text-sm shadow-md">
              JD
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B2A52]">Student Profile Snapshot</h4>
              <p className="text-xs text-[#64748B]">B.Tech Computer Science • 2026</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF4FF] text-[#18B7C9] border border-[#18B7C9]/30">
            Active Evaluation
          </span>
        </div>

        {/* Central Circular Progress Visualization */}
        <div className="relative my-4 flex items-center justify-center py-4">
          
          {/* Circular Rings */}
          <div className="relative w-48 h-48 rounded-full border-4 border-[#EAF4FF] flex items-center justify-center">
            
            {/* SVG Ring Segment */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#EAF4FF"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#18B7C9"
                strokeWidth="6"
                strokeDasharray="276"
                strokeDashoffset="50"
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Content */}
            <div className="text-center z-10 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-[#0B2A52] tracking-tight">85%</span>
              <span className="text-xs font-bold text-[#18B7C9] uppercase tracking-wider mt-0.5">Placement Likelihood</span>
              <span className="mt-1.5 px-2 py-0.5 rounded-md bg-[#EAF4FF] text-[10px] font-semibold text-[#3B82D0]">
                High Readiness
              </span>
            </div>
          </div>
        </div>

        {/* Floating Mini Feature Badges */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-16 -left-3 bg-white p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#18B7C9]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0B2A52]">CGPA: 8.9 / 10</p>
            <p className="text-[10px] text-[#64748B]">Top 10% Batch</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute bottom-16 -right-3 bg-white p-3 rounded-2xl shadow-lg border border-[#EAF4FF] flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#3B82D0]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0B2A52]">Skill Match</p>
            <p className="text-[10px] text-[#64748B]">Full-Stack & DSA</p>
          </div>
        </motion.div>

        {/* Bottom Skill Tags Grid */}
        <div className="mt-4 pt-4 border-t border-[#F7FAFF] grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#F7FAFF] p-2 rounded-xl border border-[#EAF4FF]">
            <p className="text-[10px] text-[#64748B] font-medium">Projects</p>
            <p className="text-xs font-bold text-[#0B2A52]">4 Verified</p>
          </div>
          <div className="bg-[#F7FAFF] p-2 rounded-xl border border-[#EAF4FF]">
            <p className="text-[10px] text-[#64748B] font-medium">Internships</p>
            <p className="text-xs font-bold text-[#0B2A52]">2 Completed</p>
          </div>
          <div className="bg-[#F7FAFF] p-2 rounded-xl border border-[#EAF4FF]">
            <p className="text-[10px] text-[#64748B] font-medium">Certifications</p>
            <p className="text-xs font-bold text-[#0B2A52]">3 Credentials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IllustrationPlaceholder;
