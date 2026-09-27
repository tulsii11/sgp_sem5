import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, ShieldCheck } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const Stage3Probability = () => {
  return (
    <div className="py-24 bg-[#F7FAFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="STAGE 3 — PLACEMENT PREDICTION ENGINE"
          title="Know Your Placement Probability"
          subtitle="Get an instant statistical benchmark of your employment probability based on historical campus placement data."
          align="center"
          className="mb-14"
        />

        {/* Central Metric Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-[#0B2A52]/8 border border-[#EAF4FF] relative overflow-hidden text-center">
          
          {/* Subtle Background Blue Gradient Pill */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#18B7C9]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top AI Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF4FF] text-[#0B2A52] text-xs font-bold mb-8 border border-[#3B82D0]/20">
            <Sparkles className="w-4 h-4 text-[#18B7C9]" />
            <span>ML Predictive Confidence: 94.2%</span>
          </div>

          {/* Large Circular Ring Visualization */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto my-2 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#EAF4FF"
                strokeWidth="7"
              />
              {/* Animated Progress Arc (82%) */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#18B7C9"
                strokeWidth="7"
                strokeDasharray="264"
                initial={{ strokeDashoffset: 264 }}
                whileInView={{ strokeDashoffset: 264 * (1 - 0.82) }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>

            {/* Ring Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-5xl md:text-6xl font-black text-[#0B2A52] tracking-tight"
              >
                82%
              </motion.span>
              <span className="text-xs md:text-sm font-bold text-[#18B7C9] uppercase tracking-wider mt-1">
                Placement Probability
              </span>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="mt-8 max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-[#0B2A52] flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#18B7C9]" />
              High Placement Readiness
            </h3>
            <p className="mt-2 text-base text-[#64748B] leading-relaxed">
              "Your profile shows strong placement potential for Tier-1 Software Engineering, Full-Stack Development, and Systems Consulting roles."
            </p>
          </div>

          {/* Breakdown Pills */}
          <div className="mt-8 pt-6 border-t border-[#F7FAFF] grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-[#F7FAFF] rounded-2xl border border-[#EAF4FF]">
              <p className="text-xs text-[#64748B]">Target Salary Bracket</p>
              <p className="text-sm font-bold text-[#0B2A52] mt-0.5">8 - 14 LPA</p>
            </div>
            <div className="p-3 bg-[#F7FAFF] rounded-2xl border border-[#EAF4FF]">
              <p className="text-xs text-[#64748B]">Company Tier Match</p>
              <p className="text-sm font-bold text-[#18B7C9] mt-0.5">Tier 1 & Product</p>
            </div>
            <div className="p-3 bg-[#F7FAFF] rounded-2xl border border-[#EAF4FF]">
              <p className="text-xs text-[#64748B]">Est. Offer Window</p>
              <p className="text-sm font-bold text-[#0B2A52] mt-0.5">30 - 45 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage3Probability;
