import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Users, Code2, FileCheck2, UserCheck, AlertCircle } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const Stage4Gaps = () => {
  const gapCategories = [
    {
      title: 'Technical Skills',
      icon: Terminal,
      score: 85,
      gap: 'Missing System Design & Microservices',
      status: 'Minor Gap',
      statusColor: 'text-[#18B7C9] bg-[#EAF4FF]',
      barColor: 'bg-[#18B7C9]'
    },
    {
      title: 'Soft Skills',
      icon: Users,
      score: 72,
      gap: 'Needs Leadership & Technical Pitch practice',
      status: 'Moderate Gap',
      statusColor: 'text-[#3B82D0] bg-[#EAF4FF]',
      barColor: 'bg-[#3B82D0]'
    },
    {
      title: 'Coding & DSA',
      icon: Code2,
      score: 90,
      gap: 'Strengthen Dynamic Programming & Graphs',
      status: 'Strong Readiness',
      statusColor: 'text-emerald-700 bg-emerald-50',
      barColor: 'bg-emerald-500'
    },
    {
      title: 'Resume Quality',
      icon: FileCheck2,
      score: 68,
      gap: 'Quantify project impact with metric achievements',
      status: 'Action Required',
      statusColor: 'text-amber-700 bg-amber-50',
      barColor: 'bg-amber-500'
    },
    {
      title: 'Interview Preparation',
      icon: UserCheck,
      score: 78,
      gap: 'Mock behavioral interview practice recommended',
      status: 'In Progress',
      statusColor: 'text-[#0B2A52] bg-[#EAF4FF]',
      barColor: 'bg-[#0B2A52]'
    }
  ];

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="STAGE 4 — SKILL GAP IDENTIFICATION"
          title="Find Your Gaps"
          subtitle="Uncover exact skill deficiencies and resume weak points before recruiters do, giving you actionable steps to bridge them."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gapCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#F7FAFF] rounded-3xl p-6 border border-[#EAF4FF] hover:border-[#18B7C9]/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-[#0B2A52] shadow-xs border border-[#EAF4FF]">
                      <Icon className="w-5 h-5 text-[#18B7C9]" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B2A52]">{item.title}</h3>

                  {/* Progress Score Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-[#64748B]">Readiness Level</span>
                      <span className="text-[#0B2A52]">{item.score}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#EAF4FF] overflow-hidden p-0.5 border border-[#3B82D0]/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${item.barColor}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Gap Alert Description */}
                <div className="mt-6 pt-4 border-t border-[#EAF4FF] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#18B7C9] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#64748B] font-medium leading-relaxed">
                    <span className="font-semibold text-[#0B2A52]">Target Gap: </span>
                    {item.gap}
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

export default Stage4Gaps;
