import React from 'react';

const Logo = ({ size = 'md', variant = 'full', light = false, className = '' }) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', badge: 'text-xs px-1.5 py-0.5' },
    md: { icon: 'w-9 h-9', text: 'text-xl', badge: 'text-xs px-2 py-0.5' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', badge: 'text-sm px-2.5 py-1' }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const isLightText = light || className.includes('text-white');

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Logo Graphic Concept: Graduation Cap + Shield + Cyan Glow */}
      <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0B2A52] to-[#071D3A] text-white shadow-md shadow-[#0B2A52]/20 border border-[#18B7C9]/30 transition-transform duration-300 hover:scale-105 shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#18B7C9]"
        >
          {/* Graduation Cap */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        
        {/* Decorative Cyan Sparkle Circle */}
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#18B7C9] animate-pulse" />
      </div>

      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className={`flex items-center gap-1 ${currentSize.text} leading-none font-bold`}>
            <span className={isLightText ? "text-white" : "text-[#0B2A52]"}>Campus</span>
            <span className="text-[#18B7C9]">Hire</span>
          </div>
          {variant === 'full-tagline' && (
            <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold mt-0.5">
              Placement Platform
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
