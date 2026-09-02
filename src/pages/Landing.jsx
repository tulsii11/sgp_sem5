import React from 'react';
import ScrollStoryAnimation from '../components/ScrollStoryAnimation';
import CrackPlacementsSection from '../components/CrackPlacementsSection';
import Stage1Profile from '../components/ScrollStory/Stage1Profile';
import Stage2Potential from '../components/ScrollStory/Stage2Potential';
import Stage3Probability from '../components/ScrollStory/Stage3Probability';
import Stage4Gaps from '../components/ScrollStory/Stage4Gaps';
import Stage5Guided from '../components/ScrollStory/Stage5Guided';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';

const Landing = () => {
  return (
    <div className="w-full min-h-screen bg-[#F7FAFF]">
      
      {/* STEPS 1 TO 6: Interactive Scroll Story Animation (0% to 100% Scroll Transformation) */}
      <ScrollStoryAnimation />

      {/* STEP 7: After Scroll — "Everything you need to crack placements" & University Trust Badges */}
      <CrackPlacementsSection />

      {/* Deep Interactive Profiling & ML Engine Stages */}
      <section id="scroll-story" className="w-full">
        <Stage1Profile />
        <Stage2Potential />
        <Stage3Probability />
        <Stage4Gaps />
        <Stage5Guided />
      </section>

      {/* Integrated Feature Capabilities */}
      <FeaturesSection />

      {/* How Platform Works */}
      <HowItWorks />

    </div>
  );
};

export default Landing;
