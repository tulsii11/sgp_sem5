import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code2, MessageSquare, BarChart3, ShieldCheck, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const CrackPlacementsSection = () => {
  const cards = [
    {
      title: 'Resume Builder',
      description: 'Create a professional resume that stands out to recruiters and passes ATS filters.',
      icon: FileText,
      color: 'bg-[#EAF4FF]',
      iconColor: 'text-[#18B7C9]'
    },
    {
      title: 'DSA Practice',
      description: 'Practice coding with curated problems sorted by difficulty, topic, and target company.',
      icon: Code2,
      color: 'bg-[#EAF4FF]',
      iconColor: 'text-[#3B82D0]'
    },
    {
      title: 'Mock Interviews',
      description: 'Realistic technical and behavioral interviews with automated AI & peer feedback.',
      icon: MessageSquare,
      color: 'bg-[#EAF4FF]',
      iconColor: 'text-[#0B2A52]'
    },
    {
      title: 'Aptitude Tests',
      description: 'Improve quantitative speed, logical reasoning, and verbal accuracy under timed conditions.',
      icon: BarChart3,
      color: 'bg-[#EAF4FF]',
      iconColor: 'text-[#18B7C9]'
    }
  ];

  const colleges = [
    { name: 'IIT Bombay', badge: 'IIT' },
    { name: 'IIT Delhi', badge: 'IIT' },
    { name: 'NIT Trichy', badge: 'NIT' },
    { name: 'VIT Vellore', badge: 'VIT' },
    { name: 'BITS Pilani', badge: 'BITS' },
    { name: 'IIIT Hyderabad', badge: 'IIIT' }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step 7 Heading */}
        <SectionHeading
          badge="CAMPUS PLACEMENT ECOSYSTEM"
          title={
            <span>
              Everything you need to <span className="text-[#18B7C9]">crack placements.</span>
            </span>
          }
          subtitle="All-in-one preparation suite designed specifically for engineering and technology graduates."
          align="center"
          className="mb-14"
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#F7FAFF] rounded-3xl p-6 border border-[#EAF4FF] hover:border-[#18B7C9]/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold text-[#0B2A52]">{card.title}</h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trusted By Students From Top Colleges Banner */}
        <div className="mt-16 pt-10 border-t border-[#EAF4FF] text-center">
          <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#18B7C9]" />
            Trusted by students from top colleges
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {colleges.map((college) => (
              <div
                key={college.name}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F7FAFF] border border-[#EAF4FF] shadow-xs text-xs font-bold text-[#0B2A52] hover:border-[#18B7C9]/30 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-[#18B7C9]" />
                <span>{college.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CrackPlacementsSection;
