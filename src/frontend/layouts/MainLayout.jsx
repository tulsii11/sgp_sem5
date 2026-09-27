import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7FAFF] text-[#14213D] selection:bg-[#18B7C9] selection:text-white">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
