import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import Button from '../components/Button';
import IllustrationPlaceholder from '../components/IllustrationPlaceholder';
import { Mail, Lock, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('student@campushire.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate short smooth transition before navigating to Dashboard placeholder
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFF] via-white to-[#EAF4FF] flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10 mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2A52] hover:text-[#18B7C9] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </button>

        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <Logo size="sm" variant="full" />
        </div>
      </div>

      {/* Main Login Card Layout */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 my-auto">
        
        {/* Left / Center Login Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#EAF4FF] shadow-2xl shadow-[#0B2A52]/8"
        >
          <div className="mb-8">
            <Logo size="md" variant="full" className="mb-4" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A52] tracking-tight">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Your journey to your dream career starts now.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input Field */}
            <div>
              <label className="block text-xs font-bold text-[#0B2A52] uppercase tracking-wider mb-2">
                Student Institutional Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-11 pr-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-sm text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#18B7C9] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#0B2A52] uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-[#18B7C9] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 bg-[#F7FAFF] border border-[#EAF4FF] rounded-xl text-sm text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#18B7C9] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded border-[#3B82D0] text-[#18B7C9] focus:ring-[#18B7C9]" />
                <span>Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full justify-center mt-4"
              icon={isLoading ? CheckCircle2 : ArrowRight}
              iconPosition="right"
            >
              {isLoading ? 'Signing In...' : 'Login to Portal'}
            </Button>
          </form>

          {/* Bottom Footer Callout */}
          <div className="mt-8 pt-6 border-t border-[#F7FAFF] text-center text-xs text-[#64748B]">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-[#18B7C9] hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </motion.div>

        {/* Right Side Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 hidden lg:flex justify-center"
        >
          <IllustrationPlaceholder type="login" />
        </motion.div>

      </div>

      {/* Micro Copyright */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#64748B] pt-4 z-10">
        © CampusHire Placement Portal • Secured Prototype Mode
      </div>
    </div>
  );
};

export default Login;
