import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import { ArrowLeft, CheckCircle2, ShieldCheck, Eye, EyeOff, Mail, Lock, User, Building2, AlertCircle, Loader2 } from 'lucide-react';
import mascotImg from '../assets/mascot.png';
import adminMascotImg from '../assets/admin-mascot.png';
import { loginWithCredentials } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();

  // Form Field Values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student'); // 'student' | 'company'

  // Validation, Loading & Error State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [authProfile, setAuthProfile] = useState(null);

  const currentMascot = (role === 'company' || role === 'admin') ? adminMascotImg : mascotImg;

  // Active Field Focus for Mascot Think Box ('name' | 'email' | 'password' | 'button' | null)
  const [focusedField, setFocusedField] = useState(null);

  // Animation Step State: 'input' -> 'flipped' -> 'all_set'
  const [step, setStep] = useState('input');
  const [isFlipping, setIsFlipping] = useState(false);

  // Dynamic Mascot Think Box Message Subtitle (Minimal phrases)
  const getThinkBoxSubtitle = () => {
    if (loading) {
      return "Verifying credentials...";
    }
    if (errorMsg) {
      return "Check your credentials";
    }
    if (step === 'flipped' || step === 'all_set') {
      return role === 'company' ? "Recruiter access verified!" : "Login successful!";
    }
    switch (focusedField) {
      case 'role':
        return "Select your role";
      case 'name':
        return role === 'company' ? "Enter recruiter / company name" : "Enter your name";
      case 'email':
        return role === 'company' ? "Enter official company email" : "Enter your email id";
      case 'password':
        return "Enter your password";
      case 'button':
        return "Click to login";
      default:
        return role === 'company' ? "Company Portal Login" : "Enter your details";
    }
  };

  const getThinkBoxTitle = () => {
    if (loading) return "Authenticating";
    if (errorMsg) return "Login Failed";
    if (step === 'flipped' || step === 'all_set') return "Welcome back!";
    return role === 'company' ? "Company Portal" : "Let's begin!";
  };

  // Dynamic Pagination Dot Index (0 = Name, 1 = Email, 2 = Password, 3 = Login Button)
  const getActiveDotIndex = () => {
    if (focusedField === 'email') return 1;
    if (focusedField === 'password') return 2;
    if (focusedField === 'button') return 3;
    return 0; // Default / Name field (1st dot)
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading || isFlipping) return;

    setErrorMsg('');
    setLoading(true);

    try {
      const result = await loginWithCredentials(email, password, role);

      if (!result.success) {
        setErrorMsg(result.error);
        setLoading(false);
        return;
      }

      // Success: Save verified profile details to localStorage for instant UI sync
      const profile = result.profile;
      const authUser = result.user;
      setAuthProfile(profile);

      const userData = {
        id: profile.id,
        userId: authUser.id,
        name: profile.full_name || name.trim() || (role === 'company' ? 'Recruiter' : 'Student'),
        email: profile.email || email.trim() || authUser.email,
        department: profile.headline || (role === 'company' ? 'Talent Acquisition' : 'Computer Science & Engineering'),
        phone: profile.phone || '+91 98765 43210',
        rollNo: profile.role === 'company' ? 'REC-2026-TC' : '21CS084',
        batch: profile.role === 'company' ? 'Corporate Partner' : '2026 Batch',
        role: profile.role,
        isLoggedIn: true
      };
      localStorage.setItem('user', JSON.stringify(userData));

      setLoading(false);
      setIsFlipping(true);

      // Step 1 -> Step 2 (3D Card Flip to Flipped State showing Login Successful)
      setTimeout(() => {
        setStep('flipped');
        setIsFlipping(false);
      }, 600);

      // Step 2 -> Step 3 (Transition to Center Mascot with Neck ID Badge)
      setTimeout(() => {
        setStep('all_set');
      }, 1400);

      // Step 3 -> Auto Navigate to Company or Student Dashboard
      setTimeout(() => {
        navigate(profile.role === 'company' ? '/company' : '/dashboard');
      }, 4200);

    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Unable to connect to the server. Please check your internet connection and try again.');
      setLoading(false);
    }
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

      {/* TOP HEADER: Top Left CampusHire Logo + Back Link */}
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

      {/* STEP 3 VIEW: YOU'RE ALL SET CENTER STAGE (MATCHING USER'S UPLOADED IMAGE) */}
      {step === 'all_set' ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto w-full flex-1 flex flex-col items-center justify-between z-20 px-4 pt-2"
        >
          {/* Step 3 Header Badge matching uploaded image */}
          <div className="flex flex-col items-center text-center mt-2 z-30">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                3
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A52] tracking-tight">
                You're All Set
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Let's get you placed.
            </p>
          </div>

          {/* Centered Mascot wearing the ID Card Badge around his neck */}
          <div className="relative flex flex-col items-center justify-end flex-1 w-full max-w-[480px] sm:max-w-[540px] mt-4">
            
            {/* MASCOT DISPLAY */}
            <motion.img
              key={role}
              src={currentMascot}
              alt="Campus Mascot All Set"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className={`w-auto object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(11,42,82,0.18)] z-10 transition-all ${
                role === 'company' || role === 'admin'
                  ? 'h-[80vh] sm:h-[86vh] max-h-[800px] scale-103 sm:scale-105'
                  : 'h-[82vh] sm:h-[88vh] max-h-[820px] scale-105 sm:scale-108'
              }`}
            />

            {/* HANGING ID BADGE AROUND MASCOT'S NECK & CHEST (EXACT MATCH TO UPLOADED IMAGE) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 180 }}
              className="absolute top-[37%] sm:top-[36%] left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
            >
              {/* V-Shape Ribbon Strap coming around neck */}
              <div className="relative w-28 sm:w-32 h-14 sm:h-16 flex justify-center">
                <div className="w-4 sm:w-5 h-full bg-gradient-to-b from-[#072042] to-[#04162E] -rotate-[20deg] origin-top-right shadow-md rounded-t-sm border-x border-slate-800" />
                <div className="w-4 sm:w-5 h-full bg-gradient-to-b from-[#072042] to-[#04162E] rotate-[20deg] origin-top-left shadow-md rounded-t-sm border-x border-slate-800 -ml-1" />
              </div>

              {/* Chrome Swivel Ring */}
              <div className="relative -mt-2 flex flex-col items-center z-30">
                <div className="w-5.5 h-5.5 rounded-full border-2 border-slate-300 bg-gradient-to-b from-slate-100 to-slate-400 flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                </div>
                <div className="w-2.5 h-3.5 bg-slate-300 border border-slate-400 rounded-b-sm -mt-0.5" />
              </div>

              {/* Miniature ID Badge Card on Mascot's Chest */}
              <div className="w-44 sm:w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_45px_rgba(11,42,82,0.22)] border border-slate-200/90 p-4 text-center -mt-1">
                {/* Oval Slot */}
                <div className="w-9 h-2.5 bg-slate-200 rounded-full mx-auto mb-2 border border-slate-300 shadow-inner" />
                
                {/* Logo */}
                <Logo size="sm" variant="full" className="justify-center mb-1.5" />

                <h4 className="text-xs font-extrabold text-[#0B2A52] tracking-tight">
                  Login Successful!
                </h4>

                <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  Welcome back, <span className="text-[#0B2A52] font-bold">{authProfile?.full_name || name || (role === 'company' ? 'Recruiter' : 'Student')}</span>
                </p>

                <p className="text-xs font-bold text-[#18B7C9] mt-1">
                  {role === 'company' ? 'Connecting you to top talent.' : "Let's get you placed."}
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      ) : (
        /* STEP 1 & 2 VIEW: FORM & FLIPPING CARD (LEFT) AND MASCOT (RIGHT) */
        <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end justify-between z-20 px-4 sm:px-8 pt-4 pb-2">
          
          {/* LEFT COLUMN: STRAIGHT VERTICAL REALISTIC LANYARD HANGING ID CARD */}
          <div className="lg:col-span-6 flex flex-col items-center justify-end relative h-full pt-10 sm:pt-14 pb-2">
            
            {/* LANYARD STRAP & METAL SWIVEL HOOK CLASP */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none">
              <div className="w-12 sm:w-14 h-22 sm:h-26 bg-gradient-to-b from-[#03152C] via-[#072042] to-[#04162E] relative shadow-xl rounded-t-sm flex items-center justify-center border-x border-slate-800">
                <div className="w-1.5 h-full bg-[#0B2C5A] opacity-80" />
                <div className="w-1 h-full bg-[#0A264D] opacity-60 ml-2" />
                <div className="absolute -bottom-1 w-12 h-2.5 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 rounded-sm shadow-md border border-slate-400" />
              </div>

              <div className="relative -mt-1 flex flex-col items-center">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border-[4px] border-slate-300 bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-b from-slate-400 to-slate-200 border border-slate-400 shadow-inner" />
                </div>

                <div className="w-4 h-4.5 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 border border-slate-400 rounded-sm -mt-1 shadow-sm flex flex-col justify-around py-0.5">
                  <div className="w-full h-0.5 bg-slate-500 opacity-60" />
                  <div className="w-full h-0.5 bg-slate-500 opacity-60" />
                </div>

                <div className="relative -mt-1 flex flex-col items-center">
                  <svg className="w-7 h-10 text-slate-300 drop-shadow-md" viewBox="0 0 30 42" fill="none">
                    <path d="M 8,2 L 22,2 L 24,10 L 26,18 C 28,26 24,36 15,40 C 6,36 2,26 4,18 L 6,10 Z" fill="url(#metalGrad)" stroke="#94A3B8" strokeWidth="1.5" />
                    <path d="M 12,12 C 12,22 18,22 18,12 Z" fill="#071D3A" opacity="0.15" />
                    <path d="M 19,13 L 21,25" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="35%" stopColor="#CBD5E1" />
                        <stop offset="70%" stopColor="#64748B" />
                        <stop offset="100%" stopColor="#E2E8F0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* CARD CONTAINER (STRAIGHT VERTICAL - CONSTANT DIMENSIONS DURING FLIP) */}
            <div className="perspective-1000 w-full max-w-[400px] sm:max-w-[430px] relative mt-16 sm:mt-20">
              
              <motion.div
                animate={{
                  rotateY: step === 'input' ? 0 : 180
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="transform-style-3d relative w-full min-h-[490px] sm:min-h-[520px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(11,42,82,0.14)] border border-slate-100 p-7 sm:p-9 text-left z-20 flex flex-col justify-between"
              >
                
                {/* Top Oval Slot Cutout for Lanyard Clip */}
                <div className="w-14 h-4 bg-[#EAF2FB] rounded-full mx-auto mb-4 border border-slate-300 shadow-inner flex items-center justify-center shrink-0">
                  <div className="w-8 h-1.5 bg-slate-300 rounded-full opacity-60" />
                </div>

                {/* FRONT SIDE: LOGIN FORM */}
                <div className={step === 'input' ? 'flex flex-col flex-1 justify-between' : 'hidden'}>
                  
                  {/* Logo & Tagline */}
                  <div className="text-center mb-4">
                    <Logo size="md" variant="full" className="justify-center mb-1.5" />
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                      <span className="w-6 h-[1px] bg-slate-200" />
                      <span>Your Campus. Your Career.</span>
                      <span className="w-6 h-[1px] bg-slate-200" />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleLogin} noValidate className="space-y-4 text-left">
                    
                    {/* ROLE SELECTION CHOICE INSIDE ID CARD (AT TOP OF ALL ASKED DETAILS) */}
                    <div 
                      onMouseEnter={() => setFocusedField('role')}
                      onMouseLeave={() => setFocusedField(null)}
                      className="p-1 bg-slate-100/90 rounded-2xl border border-slate-200 flex items-center shadow-inner"
                    >
                      <button
                        type="button"
                        disabled={loading || isFlipping}
                        onClick={() => {
                          setRole('student');
                          setFocusedField('role');
                          setErrorMsg('');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          role === 'student'
                            ? 'bg-[#0B2A52] text-white shadow-md'
                            : 'text-slate-500 hover:text-[#0B2A52]'
                        } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Student</span>
                      </button>

                      <button
                        type="button"
                        disabled={loading || isFlipping}
                        onClick={() => {
                          setRole('company');
                          setFocusedField('role');
                          setErrorMsg('');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          role === 'company'
                            ? 'bg-[#0B2A52] text-white shadow-md'
                            : 'text-slate-500 hover:text-[#0B2A52]'
                        } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        <Building2 className="w-3.5 h-3.5 text-[#18B7C9]" />
                        <span>Company</span>
                      </button>
                    </div>

                    {/* ERROR BANNER */}
                    {errorMsg && (
                      <div 
                        role="alert"
                        className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-start gap-2 shadow-sm animate-fadeIn"
                      >
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="flex-1 leading-relaxed">{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-1.5 ml-0.5">
                        {role === 'company' ? 'Company Name / Recruiter Name' : 'Name'}
                      </label>
                      <input
                        type="text"
                        disabled={loading || isFlipping}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={role === 'company' ? 'TechCorp Solutions / Sarah Jenkins' : 'Enter your full name'}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0B2A52] placeholder:text-slate-400 focus:outline-none focus:border-[#18B7C9] focus:ring-2 focus:ring-[#18B7C9]/20 transition-all shadow-sm disabled:bg-slate-50 disabled:opacity-70"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-1.5 ml-0.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          disabled={loading || isFlipping}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder={role === 'company' ? 'recruiter@techcorp.com' : 'Enter your email'}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0B2A52] placeholder:text-slate-400 focus:outline-none focus:border-[#18B7C9] focus:ring-2 focus:ring-[#18B7C9]/20 transition-all shadow-sm disabled:bg-slate-50 disabled:opacity-70"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B2A52] mb-1.5 ml-0.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          disabled={loading || isFlipping}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Enter your password"
                          className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0B2A52] placeholder:text-slate-400 focus:outline-none focus:border-[#18B7C9] focus:ring-2 focus:ring-[#18B7C9]/20 transition-all shadow-sm disabled:bg-slate-50 disabled:opacity-70"
                        />
                        <button
                          type="button"
                          disabled={loading || isFlipping}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0B2A52] p-1 rounded-lg transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || isFlipping}
                      onMouseEnter={() => setFocusedField('button')}
                      onMouseLeave={() => setFocusedField(null)}
                      className={`w-full py-3.5 mt-2 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 tracking-wide ${
                        loading || isFlipping
                          ? 'bg-slate-500 cursor-not-allowed opacity-80'
                          : 'bg-[#031B3A] hover:bg-[#072852] cursor-pointer'
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#18B7C9]" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <span>Login</span>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-xs font-medium text-slate-500">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => navigate('/signup')}
                          className="text-[#18B7C9] font-bold hover:underline cursor-pointer"
                        >
                          Sign up
                        </button>
                      </p>
                    </div>

                  </form>
                </div>

                {/* BACK OF CARD: FLIPPED STATE */}
                <div className={step === 'flipped' ? 'block [transform:rotateY(180deg)] my-auto flex-1 flex flex-col justify-center' : 'hidden'}>
                  <div className="text-center py-6 flex flex-col items-center justify-center">
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
                      Preparing your dashboard...
                    </p>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: MASCOT WITH THINK BOX ATTACHED TO HEAD */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-end relative h-full min-h-[580px] sm:min-h-[660px]">

            <div className="relative flex flex-col items-center justify-end h-full w-full max-w-[460px] sm:max-w-[520px]">
              
              {/* MASCOT THINK BOX */}
              <div className="absolute top-4 sm:top-8 -left-8 sm:-left-28 z-30">
                <motion.div
                  key={getThinkBoxSubtitle()}
                  initial={{ opacity: 0, x: -15, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-100 max-w-[280px] sm:max-w-[320px] flex gap-3.5 items-start relative"
                >
                  <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 shadow-md mt-0.5 ${
                    role === 'company' ? 'bg-[#0B2A52] shadow-[#0B2A52]/30' : 'bg-[#18B7C9] shadow-[#18B7C9]/30'
                  }`}>
                    {role === 'company' ? <Building2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 text-left">
                    {/* Top title ("Let's begin!" or "Company Portal") - secondary muted header */}
                    <div className="mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {getThinkBoxTitle()}
                      </span>
                    </div>

                    {/* HIGHLIGHTED BOTTOM LINE: Primary, bold, large, vivid color */}
                    <p className="text-xs sm:text-sm font-extrabold text-[#0B2A52] leading-snug">
                      {getThinkBoxSubtitle()}
                    </p>

                    {/* 4 Pagination Dots representing 4 details on the ID card */}
                    <div className="flex items-center gap-2 mt-3">
                      {[0, 1, 2, 3].map((dotIdx) => {
                        const isActive = getActiveDotIndex() === dotIdx;
                        return (
                          <motion.div
                            key={dotIdx}
                            animate={{
                              scale: isActive ? 1.3 : 1,
                              backgroundColor: isActive ? (role === 'company' ? '#0B2A52' : '#18B7C9') : '#CBD5E1'
                            }}
                            transition={{ duration: 0.2 }}
                            className={`w-2.5 h-2.5 rounded-full ${isActive ? 'shadow-sm' : ''}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="absolute -right-2 top-6 w-4 h-4 bg-white rotate-45 border-t border-r border-slate-100" />
                </motion.div>
              </div>

              {/* MASCOT DISPLAY */}
              <motion.img
                key={role}
                src={currentMascot}
                alt="Campus Mascot"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className={`w-auto object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(11,42,82,0.14)] z-10 transition-all ${
                  role === 'company' || role === 'admin'
                    ? 'h-[82vh] sm:h-[88vh] max-h-[820px] scale-103 sm:scale-105'
                    : 'h-[84vh] sm:h-[90vh] max-h-[840px] scale-105 sm:scale-108'
                }`}
              />

            </div>

          </div>

        </div>
      )}

      {/* FOOTER: Centered Security Badge matching Image 2 */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-400 font-medium py-3 z-30 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>Your data is safe with us</span>
      </div>

    </div>
  );
};

export default Login;



