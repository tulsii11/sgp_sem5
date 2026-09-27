import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import OpeningAnimation from './components/OpeningAnimation';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      {/* 2-3 Second Professional Opening Intro Sequence */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <OpeningAnimation
            key="intro-animation"
            onComplete={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      {/* Main CampusHire Application Routing */}
      {!showIntro && <AppRoutes />}
    </BrowserRouter>
  );
}

export default App;
