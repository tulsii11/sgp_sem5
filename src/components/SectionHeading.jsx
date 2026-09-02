import React from 'react';

const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col ${alignClasses[align] || alignClasses.center} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#EAF4FF] text-[#18B7C9] border border-[#18B7C9]/30 mb-3 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0B2A52] tracking-tight leading-snug">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-[#64748B] max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
