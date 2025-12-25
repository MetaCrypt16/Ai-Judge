
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#eeeede] py-16 px-8 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-black opacity-30">
            <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" fill="none" strokeWidth="2"/>
            <circle cx="12" cy="8" r="2" fill="currentColor"/>
            <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Privacy and Security Seriously</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Chatty Charm detects nature language with offers conversations with advanced encryptions recognitions. Adjusts, response, alised complexities and empathetic driven experience.
        </p>
        <p className="text-sm text-gray-500 font-medium">
          Copyright 2024 All rights info.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
