import React from 'react';
import Logo from './Logo';
import { Globe, Share2, Code, Mail, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#071D3A] text-white pt-16 pb-12 border-t border-[#0B2A52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Logo size="lg" variant="full" className="text-white" />
            <p className="mt-4 text-sm text-slate-300 max-w-sm leading-relaxed">
              AI-Powered Placement Prediction & Career Guidance Platform for Universities, Colleges, and Ambitious Students.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 hover:text-[#18B7C9] hover:bg-white/20 transition-colors" title="Repository">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 hover:text-[#18B7C9] hover:bg-white/20 transition-colors" title="Network">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 hover:text-[#18B7C9] hover:bg-white/20 transition-colors" title="Portal">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 hover:text-[#18B7C9] hover:bg-white/20 transition-colors" title="Contact">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-[#18B7C9] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><button onClick={() => navigate('/')} className="hover:text-[#18B7C9] transition-colors cursor-pointer">Landing Page</button></li>
              <li><a href="#features" className="hover:text-[#18B7C9] transition-colors">Features</a></li>
              <li><a href="#scroll-story" className="hover:text-[#18B7C9] transition-colors">Scroll Story</a></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-[#18B7C9] transition-colors cursor-pointer">Student Login</button></li>
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-[#18B7C9] transition-colors cursor-pointer">Dashboard Prototype</button></li>
            </ul>
          </div>

          {/* Planned Tech Stack */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-[#18B7C9] uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>React.js + Vite</li>
              <li>Tailwind CSS</li>
              <li>Node.js / Express</li>
              <li>MongoDB</li>
              <li>Python / FastAPI</li>
              <li>scikit-learn & spaCy</li>
            </ul>
          </div>

          {/* Project Details */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-[#18B7C9] uppercase tracking-wider mb-4">SGP Project</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Designed for Senior Graduate Project (SGP). Built with modular component architecture ready for backend & ML model integration.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="text-[#18B7C9] font-bold">Status:</span> Frontend Foundation v1.0 Ready
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CampusHire. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-[#18B7C9] fill-[#18B7C9]" /> for Placement Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
