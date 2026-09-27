import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';
import { ArrowLeft, CheckCircle2, ShieldCheck, Eye, EyeOff, Sparkles, MessageCircle } from 'lucide-react';
import mascotImg from '../assets/mascot.png';

const Login = () => {
  const navigate = useNavigate();

  // Form Field Values
  const [name, setName] = useState('Aryan Verma');
  const [email, setEmail] = useState('aryan.verma@xyzcollege.edu.in');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Active Field Focus for Mascot Think Box ('name' | 'email' | 'password' | 'button' | null)
  const [focusedField, setFocusedField] = useState(null);

  // Animation Step State: 'input' -> 'success'
  const [step, setStep] = useState('input');
  const [isFlipping, setIsFlipping] = useState(false);

  // Dynamic Mascot Think Box Message
  const getThinkBoxMessage = () => {
    if (step === 'success') {
      return "Login Successful! Welcome back! 🎉";
    }
    switch (focusedField) {
      case 'name':
        return "Enter your full name ✏️";
      case 'email':
        return "Enter your institutional email ID 📧";
      case 'password':
        return "Enter your password 🔒";
      case 'button':
        return "Click Login to verify & get placed! 🚀";
      default:
        return "Welcome back! Enter your details on the card 👋";
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFlipping) return;

    setIsFlipping(true);

    // Step 1 -> Step 2 (3D Card Flip to Success State)
    setTimeout(() => {
      setStep('success');
      setIsFlipping(false);
    }, 600);

    // Auto Navigate to Dashboard after success state
    setTimeout(() => {
      navigate('/dashboard');
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFF] via-[#EAF4FF]/40 to-[#F7FAFF] flex flex-col justify-between relative overflow-hidden py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0B2A52_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Header Navigation Bar (Clean: Back link on left, Logo on right) */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20 mb-2">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B2A52] hover:text-[#18B7C9] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>

        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <Logo size="md" variant="full" />
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex items-center justify-center my-auto z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* LEFT / CENTER: Lanyard Student ID Badge Card */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            
            {/* Lanyard Top Ribbons & Metal Hook */}
            <div className="relative flex flex-col items-center z-30 -mb-5">
              {/* Strap Neck Loop */}
              <div className="w-16 h-12 border-x-8 border-[#071D3A] rounded-t-full shadow-md" />
              {/* Metal Clasp Ring */}
              <div className="w-6 h-6 rounded-full border-2 border-slate-400 bg-slate-200 flex items-center justify-center shadow-xs -mt-1">
                <div className="w-3 h-3 rounded-full border border-slate-400 bg-slate-300" />
              </div>
            </div>

            {/* 3D Flipping ID Badge Card */}
            <div className="perspective-1000 w-full max-w-md">
              <motion.div
                animate={{
                  rotateY: step === 'input' ? 0 : 180,
                  scale: isFlipping ? 0.96 : 1
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="transform-style-3d relative w-full bg-white rounded-3xl shadow-2xl border border-[#EAF4FF] p-6 sm:p-8"
              >
                
                {/* Lanyard Slot Hole at top of Card */}
                <div className="w-14 h-3 bg-slate-200 rounded-full mx-auto mb-6 shadow-inner border border-slate-300" />

                {/* FRONT OF ID CARD (LOGIN FORM) */}
                <div className={step === 'input' ? 'block' : 'hidden'}>
                  
                  <div className="text-center mb-6">
                    <Logo size="md" variant="full" className="justify-center mb-2" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#64748B] px-3 py-1 rounded-full bg-[#F7FAFF] border border-[#EAF4FF]">
                      Student Placement Credential Card
                    </span>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4 text-left">
                    {/* Name Input */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#0B2A52] uppercase tracking-wider mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Aryan Verma"
                        className="w-full px-3.5 py-2.5 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-[#0B2A52] focus:outline-none focus:ring-2 focus:ring-[#18B7C9] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#0B2A52] uppercase tracking-wider mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="aryan.verma@xyzcollege.edu.in"
                        className="w-full px-3.5 py-2.5 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-[#0B2A52] focus:outline-none focus:ring-2 focus:ring-[#18B7C9] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#0B2A52] uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="••••••••"
                          className="w-full pl-3.5 pr-10 py-2.5 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-xs font-semibold text-[#0B2A52] focus:outline-none focus:ring-2 focus:ring-[#18B7C9] focus:bg-white transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0B2A52]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Submit Login Button */}
                    <button
                      type="submit"
                      onMouseEnter={() => setFocusedField('button')}
                      onMouseLeave={() => setFocusedField(null)}
                      className="w-full py-3 mt-3 bg-[#071D3A] text-white rounded-xl text-xs font-bold hover:bg-[#0B2A52] transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Login</span>
                    </button>
                  </form>
                </div>

                {/* BACK OF ID CARD (SUCCESS STATE) */}
                <div className={step !== 'input' ? 'block [transform:rotateY(180deg)]' : 'hidden'}>
                  <div className="text-center py-6 flex flex-col items-center justify-center">
                    
                    <Logo size="md" variant="full" className="justify-center mb-6" />

                    {/* Cyan Checkmark Circle */}
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

                    <p className="text-xs text-[#64748B] font-semibold mt-2">
                      Welcome back,
                    </p>

                    <p className="text-lg font-bold text-[#18B7C9] mt-1">
                      Let's get you placed.
                    </p>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>

          {/* RIGHT: ENLARGED MASCOT WITH THINK BOX */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            
            {/* MASCOT THINK BOX / SPEECH BUBBLE */}
            <motion.div
              key={getThinkBoxMessage()}
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative mb-4 bg-[#071D3A] text-white px-5 py-3.5 rounded-3xl shadow-2xl border border-[#18B7C9]/50 max-w-sm text-center z-30"
            >
              <div className="flex items-center justify-center gap-2 text-[#18B7C9] text-xs font-extrabold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Campus Mascot Guide</span>
              </div>
              
              <p className="text-sm font-bold text-white tracking-tight">
                {getThinkBoxMessage()}
              </p>

              {/* Speech Bubble Tail Pointing Down toward Mascot */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#071D3A] rotate-45 border-r border-b border-[#18B7C9]/50" />
            </motion.div>

            {/* ENLARGED MASCOT GRAPHIC */}
            <div className="relative w-full max-w-md h-[460px] sm:h-[520px] flex items-end justify-center">
              <motion.img
                src={mascotImg}
                alt="Enlarged Mascot"
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="h-full w-auto object-contain drop-shadow-2xl filter"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Tagline Banner */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#0B2A52] font-semibold pt-4 z-20 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#18B7C9]" />
        <span>Your journey to your dream career starts now.</span>
      </div>

    </div>
  );
};

export default Login;
