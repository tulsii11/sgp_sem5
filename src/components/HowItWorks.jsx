import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Cpu, Target, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Build Profile',
      description: 'Upload your resume, input CGPA, projects, technical skills, and coding platform handles.',
      icon: UserCheck
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our algorithms process your profile against tier-1 placement databases and machine learning models.',
      icon: Cpu
    },
    {
      step: '03',
      title: 'Bridge Gaps',
      description: 'Receive real-time feedback on skill deficiencies and targeted learning roadmaps to fix them.',
      icon: Target
    },
    {
      step: '04',
      title: 'Get Placed',
      description: 'Apply for matched campus drives with AI-optimized resumes and high placement probability.',
      icon: Award
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#F7FAFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="4-STEP METHODOLOGY"
          title="How CampusHire Works"
          subtitle="A structured approach to evaluating your placement readiness and guiding you to your target salary package."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-[#EAF4FF] shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#18B7C9]/40">{item.step}</span>
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#0B2A52] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6 text-[#18B7C9]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2A52]">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
