import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#0B2A52] text-white hover:bg-[#071D3A] focus:ring-[#0B2A52] shadow-sm hover:shadow-md hover:shadow-[#0B2A52]/15 border border-transparent',
    secondary: 'bg-[#EAF4FF] text-[#0B2A52] hover:bg-[#D4E8FF] focus:ring-[#3B82D0] font-semibold border border-[#3B82D0]/20',
    accent: 'bg-[#18B7C9] text-white hover:bg-[#139aa9] focus:ring-[#18B7C9] shadow-sm hover:shadow-md hover:shadow-[#18B7C9]/25 font-semibold',
    outline: 'bg-white text-[#0B2A52] border border-[#0B2A52]/20 hover:border-[#0B2A52] hover:bg-[#F7FAFF] focus:ring-[#0B2A52]',
    ghost: 'bg-transparent text-[#0B2A52] hover:bg-[#EAF4FF] focus:ring-[#0B2A52]'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5 font-semibold'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

export default Button;
