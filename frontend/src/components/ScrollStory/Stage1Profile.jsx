import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, FolderGit2, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const Stage1Profile = () => {
  const profileCards = [
    {
      icon: GraduationCap,
      title: 'CGPA & Academics',
      value: '8.7 / 10.0',
      detail: 'Consistent Top Tier',
      color: 'bg-[#0B2A52]',
      textColor: 'text-white'
    },
    {
      icon: Code2,
      title: 'Technical Skills',
      value: '12 Stack Matrix',
      detail: 'React, Node, Python, SQL',
      color: 'bg-white',
      textColor: 'text-[#0B2A52]'
    },
    {
      icon: FolderGit2,
      title: 'Projects Portfolio',
      value: '4 Core Projects',
      detail: 'Full-Stack & Cloud Architecture',
      color: 'bg-white',
      textColor: 'text-[#0B2A52]'
    },
    {
      icon: Briefcase,
      title: 'Internships',
      value: '2 Internships',
      detail: 'Software Engineering Experience',
      color: 'bg-white',
      textColor: 'text-[#0B2A52]'
    },
    {
      icon: Award,
      title: 'Certifications',
      value: '3 Verified Badges',
      detail: 'AWS, DSA, AI Fundamentals',
      color: 'bg-white',
      textColor: 'text-[#0B2A52]'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-[#F7FAFF] to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="STAGE 1 — INPUT YOUR DATA"
          title="Understand Your Profile"
          subtitle="CampusHire aggregates all dimensions of your academic and technical journey into a unified student profile matrix."
          align="center"
          className="mb-16"
        />

        {/* Floating Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {profileCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`rounded-2xl p-6 shadow-lg shadow-[#0B2A52]/5 border border-[#EAF4FF] flex flex-col justify-between relative group overflow-hidden ${
                  card.color === 'bg-[#0B2A52]'
                    ? 'bg-[#0B2A52] text-white border-[#0B2A52]'
                    : 'bg-white text-[#0B2A52] hover:border-[#18B7C9]/40'
                }`}
              >
                {/* Accent Corner Sparkle */}
                <div className="absolute top-3 right-3 text-[#18B7C9] opacity-70 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    card.color === 'bg-[#0B2A52]'
                      ? 'bg-white/10 text-[#18B7C9]'
                      : 'bg-[#EAF4FF] text-[#18B7C9]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                    card.color === 'bg-[#0B2A52]' ? 'text-[#18B7C9]' : 'text-[#64748B]'
                  }`}>
                    {card.title}
                  </h3>
                  <p className="text-xl font-extrabold mt-1 tracking-tight">{card.value}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-current/10">
                  <p className={`text-xs ${
                    card.color === 'bg-[#0B2A52]' ? 'text-white/80' : 'text-[#64748B]'
                  }`}>
                    {card.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stage1Profile;
