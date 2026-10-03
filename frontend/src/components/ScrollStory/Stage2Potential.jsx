import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, MessageSquare, Brain, FolderGit2, Briefcase, Cpu } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const Stage2Potential = () => {
  const nodes = [
    { name: 'Resume', icon: FileText, angle: 0, score: '92%' },
    { name: 'Coding Profile', icon: Code, angle: 60, score: '88%' },
    { name: 'Soft Skills', icon: MessageSquare, angle: 120, score: '84%' },
    { name: 'Aptitude', icon: Brain, angle: 180, score: '90%' },
    { name: 'Projects', icon: FolderGit2, angle: 240, score: '85%' },
    { name: 'Experience', icon: Briefcase, angle: 300, score: '78%' }
  ];

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Soft Background Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EAF4FF]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="STAGE 2 — AI FEATURE EXTRACTION"
          title="Analyze Your Potential"
          subtitle="Our multi-dimensional AI engine evaluates your resume, competitive coding metrics, and core competencies in a single interactive canvas."
          align="center"
          className="mb-16"
        />

        {/* Circular Visualization Canvas */}
        <div className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-[4/3] flex items-center justify-center">
          
          {/* Concentric Outer Dashed Orbit Rings */}
          <div className="absolute w-[300px] h-[300px] md:w-[440px] md:h-[440px] rounded-full border-2 border-dashed border-[#18B7C9]/30 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full border border-[#3B82D0]/20 pointer-events-none" />

          {/* Central AI Core Hub */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-[#0B2A52] to-[#071D3A] text-white flex flex-col items-center justify-center p-4 shadow-2xl shadow-[#0B2A52]/30 border-4 border-[#18B7C9]/40 z-20 text-center"
          >
            <Cpu className="w-8 h-8 md:w-10 md:h-10 text-[#18B7C9] mb-1 animate-pulse" />
            <span className="text-xs md:text-sm font-extrabold tracking-wide uppercase text-white">CampusHire</span>
            <span className="text-[10px] md:text-xs text-[#18B7C9] font-bold">AI Analytics Engine</span>
          </motion.div>

          {/* Orbiting Satellite Nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              // Radius for positioning
              const radius = 170; // px offset for desktop
              const radians = (node.angle * Math.PI) / 180;
              const x = Math.cos(radians) * radius;
              const y = Math.sin(radians) * radius;

              return (
                <motion.div
                  key={node.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className="absolute bg-white p-3.5 md:p-4 rounded-2xl shadow-lg border border-[#EAF4FF] hover:border-[#18B7C9] flex items-center gap-3 cursor-pointer z-20 min-w-[140px]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#18B7C9]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#0B2A52] leading-tight">{node.name}</p>
                    <span className="text-[11px] font-bold text-[#18B7C9]">{node.score} Score</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage2Potential;
