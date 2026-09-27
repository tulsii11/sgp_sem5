import React from 'react';
import InteractiveMascot from './InteractiveMascot';
import { Target, Sparkles, CheckCircle2 } from 'lucide-react';

const IllustrationPlaceholder = ({ type = 'hero' }) => {
  if (type === 'login') {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
        {/* Soft Gradient Background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#EAF4FF] via-white to-[#18B7C9]/10 border border-[#3B82D0]/20 shadow-xl overflow-hidden p-8 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#18B7C9]" />
              <span className="w-3 h-3 rounded-full bg-[#3B82D0]" />
              <span className="w-3 h-3 rounded-full bg-[#0B2A52]" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 text-[#0B2A52] border border-[#0B2A52]/10 shadow-xs">
              CampusHire Portal
            </span>
          </div>

          {/* Center Graphic */}
          <div className="relative flex flex-col items-center justify-center text-center my-6 z-10">
            <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-[#18B7C9]/40 flex items-center justify-center p-3 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B2A52] to-[#071D3A] flex flex-col items-center justify-center text-white shadow-lg shadow-[#0B2A52]/30 p-4">
                <Target className="w-10 h-10 text-[#18B7C9] mb-1" />
                <span className="text-2xl font-extrabold text-white">88%</span>
                <span className="text-[10px] text-[#18B7C9] uppercase font-bold tracking-wider">Placement Score</span>
              </div>
            </div>
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

  // Hero default: render InteractiveMascot component
  return <InteractiveMascot />;
};

export default IllustrationPlaceholder;
