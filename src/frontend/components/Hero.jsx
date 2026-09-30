import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import Button from './Button';
import IllustrationPlaceholder from './IllustrationPlaceholder';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const element = document.querySelector('#features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 flex items-center bg-gradient-to-b from-[#F7FAFF] via-white to-[#F7FAFF] overflow-hidden">
      
      {/* Background Glow Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#EAF4FF] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#18B7C9]/10 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4FF] border border-[#18B7C9]/30 text-[#0B2A52] text-xs md:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#18B7C9]" />
              <span>AI-Powered Campus Placement Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B2A52] tracking-tight leading-[1.15]">
              Your Journey to Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2A52] via-[#3B82D0] to-[#18B7C9]">
                Dream Career
              </span>{' '}
              Starts Here.
            </h1>

            {/* Supporting Tagline */}
            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-[#18B7C9] tracking-wide">
              Predict. Prepare. Get Placed.
            </h2>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl font-normal leading-relaxed">
              CampusHire combines placement prediction algorithms, deep resume analysis, skill-gap detection, and personalized career guidance to help you land your ideal job.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/signup')}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto justify-center"
              >
                Get Started
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleExploreClick}
                icon={Compass}
                className="w-full sm:w-auto justify-center"
              >
                Explore Features
              </Button>
            </div>

            {/* Micro Metrics / Trust Badges */}
            <div className="mt-12 pt-8 border-t border-[#EAF4FF] grid grid-cols-3 gap-6 w-full max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#0B2A52]">94.2%</p>
                <p className="text-xs text-[#64748B] font-medium mt-0.5">Prediction Accuracy</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#18B7C9]">500+</p>
                <p className="text-xs text-[#64748B] font-medium mt-0.5">Company Blueprints</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-[#3B82D0]">10k+</p>
                <p className="text-xs text-[#64748B] font-medium mt-0.5">Students Guided</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column Student Illustration Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <IllustrationPlaceholder type="hero" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
