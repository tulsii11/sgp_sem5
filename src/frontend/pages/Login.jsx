import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { ArrowLeft, CheckCircle2, ShieldCheck, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import mascotImg from '../assets/mascot.png';

const Login = () => {
  const navigate = useNavigate();

  // Form Field Values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Field Focus for Mascot Think Box ('name' | 'email' | 'password' | 'button' | null)
  const [focusedField, setFocusedField] = useState(null);

  // Animation Step State: 'input' -> 'success'
  const [step, setStep] = useState('input');
  const [isFlipping, setIsFlipping] = useState(false);

  // Dynamic Mascot Think Box Message Subtitle
  const getThinkBoxSubtitle = () => {
    if (step === 'success') {
      return "Login Successful! Redirecting...";
    }
    switch (focusedField) {
      case 'name':
        return "Enter your full name.";
      case 'email':
        return "Enter your email address.";
      case 'password':
        return "Enter your password.";
      case 'button':
        return "Click Login to verify & continue.";
      default:
        return "Enter your full name.";
    }
  };

  const getThinkBoxTitle = () => {
    if (step === 'success') return "Welcome back!";
    return "Let's begin!";
  };

  // Dynamic Pagination Dot Index (0 = Name, 1 = Email, 2 = Password)
  const getActiveDotIndex = () => {
    if (focusedField === 'email') return 1;
    if (focusedField === 'password' || focusedField === 'button') return 2;
    return 0; // Default / Name field
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFlipping) return;

    setIsFlipping(true);

    // 3D Card Flip to Success State
    setTimeout(() => {
      setStep('success');
      setIsFlipping(false);
    }, 600);

    // Auto Navigate to Dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F8FC] via-[#EAF2FB] to-[#DEECF9] flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* Background Decor 1: Subtle Left Dot Grid */}
      <div className="absolute top-28 left-10 pointer-events-none opacity-20 hidden md:grid grid-cols-6 gap-2.5">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18B7C9]" />
        ))}
      </div>

      {/* Background Decor 2: Light Blue Concentric Circles */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#18B7C9]/15 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-12 h-12 border-2 border-[#18B7C9]/20 rounded-full pointer-events-none" />

      {/* Background Decor 3: Vector College Building & City Skyline Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-52 sm:h-72 pointer-events-none opacity-25 flex items-end justify-between px-4 z-0 overflow-hidden">
        {/* Left College Building with Dome & Flag */}
        <svg className="w-72 sm:w-96 h-full text-[#3B82F6]" viewBox="0 0 350 220" fill="currentColor">
          <rect x="40" y="80" width="270" height="140" rx="4" />
          <polygon points="175,25 40,80 310,80" />
          {/* Columns */}
          <rect x="70" y="95" width="16" height="125" fill="#FFFFFF" />
          <rect x="115" y="95" width="16" height="125" fill="#FFFFFF" />
          <rect x="160" y="95" width="30" height="125" fill="#FFFFFF" />
          <rect x="219" y="95" width="16" height="125" fill="#FFFFFF" />
          <rect x="264" y="95" width="16" height="125" fill="#FFFFFF" />
          {/* Flag */}
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
          {/* Windows */}
          <rect x="125" y="30" width="12" height="140" fill="#FFFFFF" opacity="0.6" />
          <rect x="148" y="30" width="12" height="140" fill="#FFFFFF" opacity="0.6" />
        </svg>

        {/* Right Skyline */}
        <svg className="w-64 sm:w-80 h-full text-[#1D4ED8]" viewBox="0 0 300 180" fill="currentColor">
          <rect x="30" y="50" width="100" height="130" rx="2" />
          <rect x="140" y="20" width="120" height="160" rx="2" />
        </svg>
      </div>

      {/* TOP HEADER: Top Left CampusHire Logo + Optional Back Link */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-30 pt-6 px-6 sm:px-10">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <Logo size="md" variant="full" />
        </div>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B2A52] hover:text-[#18B7C9] transition-colors cursor-pointer bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100/80 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* MAIN STAGE GRID CONTAINER */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end justify-between z-20 px-4 sm:px-8 pt-4 pb-2">
        
        {/* LEFT COLUMN: STRAIGHT VERTICAL REALISTIC LANYARD HANGING ID CARD */}
        <div className="lg:col-span-6 flex flex-col items-center justify-end relative h-full pt-10 sm:pt-14 pb-2">
          
          {/* LANYARD STRAP: Hangs Straight Down from top of screen into card slot */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
            {/* Deep Navy Fabric Ribbon Strap */}
            <div className="w-10 sm:w-12 h-20 sm:h-24 bg-[#051833] relative shadow-md rounded-t-sm flex items-center justify-center">
              <div className="w-1.5 h-full bg-[#082247] opacity-60" />
            </div>

            {/* Silver Metallic Ring & Swivel Clasp Assembly */}
            <div className="relative -mt-2 flex flex-col items-center">
              {/* Metal Outer Ring */}
              <div className="w-9 h-9 rounded-full border-4 border-slate-300 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 rounded-full bg-slate-300 border border-slate-400" />
              </div>
              {/* Swivel Connector Joint */}
              <div className="w-3.5 h-4 bg-gradient-to-b from-slate-400 to-slate-200 border border-slate-400 -mt-1" />
              {/* Chrome Clip Hook inserting through card slot */}
              <div className="w-4 h-8 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 border border-slate-400 rounded-b-md shadow-md flex items-center justify-center">
                <div className="w-1.5 h-6 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* CARD CONTAINER (STRAIGHT VERTICAL - NO TILT) */}
          <div className="perspective-1000 w-full max-w-[400px] sm:max-w-[430px] relative mt-16 sm:mt-20">
            
            <motion.div
              animate={{
                rotateY: step === 'input' ? 0 : 180,
                scale: isFlipping ? 0.96 : 1
              }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="transform-style-3d relative w-full bg-white rounded-[32px] shadow-[0_20px_50px_rgba(11,42,82,0.14)] border border-slate-100 p-7 sm:p-9 text-left z-20"
            >
              
              {/* Top Oval Slot Cutout for Lanyard Clip */}
              <div className="w-14 h-4 bg-[#EAF2FB] rounded-full mx-auto mb-6 border border-slate-300 shadow-inner flex items-center justify-center">
                <div className="w-8 h-1.5 bg-slate-300 rounded-full opacity-60" />
              </div>

              {/* FRONT SIDE: LOGIN FORM MATCHING IMAGE 2 EXACTLY */}
              <div className={step === 'input' ? 'block' : 'hidden'}>
                
                {/* Logo & Tagline */}
                <div className="text-center mb-6">
                  <Logo size="md" variant="full" className="justify-center mb-1.5" />
                  
                  {/* Subtle Subtitle line */}
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                    <span className="w-6 h-[1px] bg-slate-200" />
                    <span>Your Campus. Your Career.</span>
                    <span className="w-6 h-[1px] bg-slate-200" />
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  
                  {/* Name Input Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B2A52] mb-1.5 ml-0.5">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0B2A52] placeholder:text-slate-400 focus:outline-none focus:border-[#18B7C9] focus:ring-2 focus:ring-[#18B7C9]/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email Input Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B2A52] mb-1.5 ml-0.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0B2A52] placeholder:text-slate-400 focus:outline-none focus:border-[#18B7C9] focus:ring-2 focus:ring-[#18B7C9]/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Password Input Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B2A52] mb-1.5 ml-0.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0B2A52] placeholder:text-slate-400 focus:outline-none focus:border-[#18B7C9] focus:ring-2 focus:ring-[#18B7C9]/20 transition-all shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0B2A52] p-1 rounded-lg transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Solid Navy Login Button */}
                  <button
                    type="submit"
                    onMouseEnter={() => setFocusedField('button')}
                    onMouseLeave={() => setFocusedField(null)}
                    className="w-full py-3.5 mt-2 bg-[#031B3A] text-white rounded-xl text-sm font-bold hover:bg-[#072852] transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center tracking-wide"
                  >
                    Login
                  </button>

                  {/* Don't have an account? Sign up */}
                  <div className="text-center pt-2">
                    <p className="text-xs font-medium text-slate-500">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-[#18B7C9] font-bold hover:underline cursor-pointer"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>

                </form>
              </div>

              {/* BACK OF CARD: SUCCESS FLIP STATE */}
              <div className={step !== 'input' ? 'block [transform:rotateY(180deg)]' : 'hidden'}>
                <div className="text-center py-10 flex flex-col items-center justify-center">
                  <Logo size="md" variant="full" className="justify-center mb-6" />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-[#18B7C9] text-white flex items-center justify-center shadow-xl shadow-[#18B7C9]/30 mb-5"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-2xl font-extrabold text-[#0B2A52] tracking-tight">
                    Login Successful!
                  </h3>

                  <p className="text-xs text-slate-500 font-semibold mt-2">
                    Welcome back to CampusHire
                  </p>

                  <p className="text-sm font-bold text-[#18B7C9] mt-3">
                    Opening Placement Dashboard...
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: ENLARGED MASCOT WITH THINK BOX ATTACHED TO HEAD */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-end relative h-full min-h-[580px] sm:min-h-[660px]">
          
          <div className="relative flex flex-col items-center justify-end h-full w-full max-w-[450px]">
            
            {/* MASCOT THINK BOX - Positioned Directly near Mascot's Head */}
            <div className="absolute top-4 sm:top-10 -left-12 sm:-left-36 z-30">
              <motion.div
                key={getThinkBoxSubtitle()}
                initial={{ opacity: 0, x: -15, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-100 max-w-[270px] sm:max-w-[300px] flex gap-3.5 items-start relative"
              >
                {/* Left User Icon Badge */}
                <div className="w-10 h-10 rounded-full bg-[#18B7C9] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#18B7C9]/30">
                  <User className="w-5 h-5" />
                </div>

                {/* Speech Content */}
                <div className="flex-1 text-left">
                  <h4 className="text-sm font-extrabold text-[#0B2A52] tracking-tight">
                    {getThinkBoxTitle()}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {getThinkBoxSubtitle()}
                  </p>

                  {/* Interactive Pagination Dots (1st = Name, 2nd = Email, 3rd = Password) */}
                  <div className="flex items-center gap-2 mt-3">
                    {[0, 1, 2].map((dotIdx) => {
                      const isActive = getActiveDotIndex() === dotIdx;
                      return (
                        <motion.div
                          key={dotIdx}
                          animate={{
                            scale: isActive ? 1.25 : 1,
                            backgroundColor: isActive ? '#18B7C9' : '#E2E8F0'
                          }}
                          transition={{ duration: 0.2 }}
                          className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#18B7C9]' : 'bg-slate-200'}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Right Speech Bubble Tail pointing to Mascot's Head */}
                <div className="absolute -right-2 top-6 w-4 h-4 bg-white rotate-45 border-t border-r border-slate-100" />
              </motion.div>
            </div>

            {/* MASSIVE ENLARGED MASCOT DISPLAY (FILLING RIGHT SIDE MATCHING IMAGE 2) */}
            <motion.img
              src={mascotImg}
              alt="Campus Mascot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="h-[78vh] sm:h-[84vh] max-h-[760px] w-auto object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(11,42,82,0.12)] z-10"
            />

          </div>

        </div>

      </div>

      {/* FOOTER: Centered Security Badge matching Image 2 */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-400 font-medium py-3 z-30 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>Your data is safe with us</span>
      </div>

    </div>
  );
};

export default Login;



