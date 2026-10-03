import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, BarChart3, Code, Bot, ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const Stage5Guided = () => {
  const navigate = useNavigate();

  const careerPaths = [
    {
      role: 'Frontend Developer',
      icon: Layout,
      match: '94% Match',
      salary: '8 - 12 LPA',
      skills: ['React.js', 'Tailwind CSS', 'TypeScript', 'State Management'],
      modules: 6,
      featured: true
    },
    {
      role: 'Backend Developer',
      icon: Server,
      match: '89% Match',
      salary: '10 - 15 LPA',
      skills: ['Node.js / Express', 'Python FastAPI', 'MongoDB / SQL', 'REST APIs'],
      modules: 8,
      featured: false
    },
    {
      role: 'Software Engineer',
      icon: Code,
      match: '91% Match',
      salary: '12 - 18 LPA',
      skills: ['Data Structures', 'System Design', 'OOP', 'Problem Solving'],
      modules: 10,
      featured: false
    },
    {
      role: 'Data Analyst',
      icon: BarChart3,
      match: '82% Match',
      salary: '7 - 11 LPA',
      skills: ['SQL', 'Python Pandas', 'PowerBI / Tableau', 'Statistics'],
      modules: 5,
      featured: false
    },
    {
      role: 'AI / ML Engineer',
      icon: Bot,
      match: '78% Match',
      salary: '14 - 22 LPA',
      skills: ['Python', 'scikit-learn', 'PyTorch / TensorFlow', 'NLP'],
      modules: 9,
      featured: false
    }
  ];

  return (
    <div className="py-24 bg-[#F7FAFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="STAGE 5 — PERSONALIZED ROADMAPS"
          title="Get Guided"
          subtitle="Receive customized learning paths, interview prep modules, and targeted skill upgrades matched to your career aspirations."
          align="center"
          className="mb-16"
        />

        {/* Career Path Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.role}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`rounded-3xl p-6 shadow-lg shadow-[#0B2A52]/5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  path.featured
                    ? 'bg-[#0B2A52] text-white border-[#0B2A52]'
                    : 'bg-white text-[#0B2A52] border-[#EAF4FF] hover:border-[#18B7C9]/40'
                }`}
              >
                {/* Match Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    path.featured ? 'bg-white/10 text-[#18B7C9]' : 'bg-[#EAF4FF] text-[#18B7C9]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                    path.featured
                      ? 'bg-[#18B7C9] text-white border-[#18B7C9]'
                      : 'bg-[#EAF4FF] text-[#18B7C9] border-[#18B7C9]/30'
                  }`}>
                    {path.match}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight">{path.role}</h3>
                  <p className={`text-xs font-semibold mt-1 ${
                    path.featured ? 'text-[#18B7C9]' : 'text-[#64748B]'
                  }`}>
                    Avg. Campus Package: {path.salary}
                  </p>

                  {/* Key Skills Pill Tags */}
                  <div className="mt-5">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                      path.featured ? 'text-white/70' : 'text-[#64748B]'
                    }`}>
                      Core Curriculum Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {path.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                            path.featured
                              ? 'bg-white/10 text-white border border-white/10'
                              : 'bg-[#F7FAFF] text-[#0B2A52] border border-[#EAF4FF]'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className={`mt-8 pt-4 border-t flex items-center justify-between ${
                  path.featured ? 'border-white/10' : 'border-[#F7FAFF]'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <BookOpen className="w-4 h-4 text-[#18B7C9]" />
                    <span>{path.modules} Guided Modules</span>
                  </div>

                  <button
                    onClick={() => navigate('/login')}
                    className={`inline-flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                      path.featured ? 'text-[#18B7C9] hover:text-white' : 'text-[#0B2A52] hover:text-[#18B7C9]'
                    }`}
                  >
                    <span>View Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0B2A52] to-[#071D3A] rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#18B7C9]/30">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#18B7C9]/20 text-[#18B7C9] text-xs font-extrabold uppercase tracking-wider mb-2">
              Ready to Accelerate Your Placement?
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold">Start Your Placement Prediction Profile</h3>
            <p className="text-sm md:text-base text-slate-300 mt-1 max-w-xl">
              Create your account in under 2 minutes and unlock detailed skill gap analysis and automated placement scoring.
            </p>
          </div>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate('/login')}
            icon={ArrowRight}
            iconPosition="right"
            className="shrink-0"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stage5Guided;
