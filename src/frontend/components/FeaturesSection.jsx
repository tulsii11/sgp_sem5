import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  FileSearch,
  FileCheck,
  Target,
  Code2,
  Compass,
  Briefcase,
  Sparkles
} from 'lucide-react';
import SectionHeading from './SectionHeading';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Placement Prediction',
      description: 'Predict placement probability using student profile data, academic records, and historic placement analytics.',
      icon: TrendingUp,
      badge: 'ML Engine'
    },
    {
      title: 'Resume Analysis',
      description: 'Analyze resume quality, keyword density, formatting, and identify critical improvement areas for ATS passes.',
      icon: FileSearch,
      badge: 'NLP Parser'
    },
    {
      title: 'Resume–Job Matching',
      description: 'Compare student resumes directly against targeted job descriptions to calculate alignment score.',
      icon: FileCheck,
      badge: 'Match Score'
    },
    {
      title: 'Skill Gap Analysis',
      description: 'Pinpoint missing technical concepts, soft skills, and domain prerequisites with targeted fix roadmaps.',
      icon: Target,
      badge: 'Gap Matrix'
    },
    {
      title: 'Coding Profile Analysis',
      description: 'Evaluate competitive coding performance, LeetCode/GitHub activity patterns, and problem-solving speed.',
      icon: Code2,
      badge: 'Dev Metrics'
    },
    {
      title: 'Career Guidance',
      description: 'Receive personalized career paths, recommended learning courses, and mock interview strategy sessions.',
      icon: Compass,
      badge: 'AI Roadmap'
    },
    {
      title: 'Job Recommendations',
      description: 'Discover relevant on-campus drives and off-campus tech opportunities matched specifically to your tier.',
      icon: Briefcase,
      badge: 'Smart Match'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background Soft Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAF4FF]/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="INTEGRATED FEATURE SUITE"
          title="Everything You Need to Get Placed"
          subtitle="A comprehensive AI ecosystem engineered to guide students from profile evaluation to final campus job placement."
          align="center"
          className="mb-16"
        />

        {/* 7 Feature Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-[#F7FAFF] rounded-3xl p-7 border border-[#EAF4FF] hover:border-[#18B7C9]/40 shadow-sm hover:shadow-xl hover:shadow-[#0B2A52]/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0B2A52] shadow-sm border border-[#EAF4FF] group-hover:bg-[#0B2A52] group-hover:text-[#18B7C9] transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EAF4FF] text-[#18B7C9] border border-[#18B7C9]/20">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#0B2A52] group-hover:text-[#18B7C9] transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAF4FF] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#3B82D0]">Ready for Integration</span>
                  <Sparkles className="w-4 h-4 text-[#18B7C9] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
