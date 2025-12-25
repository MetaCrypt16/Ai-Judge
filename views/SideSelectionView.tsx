
import React from 'react';
import { DebateSide } from '../types';

interface SideSelectionViewProps {
  onSelect: (side: DebateSide) => void;
}

const SideSelectionView: React.FC<SideSelectionViewProps> = ({ onSelect }) => {
  return (
    <div className="max-w-4xl w-full text-center animate-fade-in">
      <h1 className="text-6xl font-bold mb-4">Choose Your Debate Side</h1>
      <p className="text-gray-500 mb-16 text-lg">Before we begin, select which side of the argument you'll argue. Our AI Judge is ready.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRO CARD */}
        <div className="bg-[#eeeede] p-10 rounded-[40px] flex flex-col items-center group hover:shadow-2xl transition-all duration-300">
          <div className="mb-8">
            <svg viewBox="0 0 100 120" className="w-24 h-24 text-black opacity-80 group-hover:opacity-100 transition">
              <path d="M40 80 Q50 80 50 60 L50 30 Q50 20 60 20 Q70 20 70 30 L70 80" fill="none" stroke="currentColor" strokeWidth="2"/>
              <rect x="30" y="80" width="50" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M50 20 L50 15" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">PRO SIDE</h2>
          <p className="text-gray-600 mb-10 leading-relaxed text-sm h-12 flex items-center">
            Argue in favor of the topic. Support your claims with strong evidence and logic.
          </p>
          <button 
            onClick={() => onSelect(DebateSide.PRO)}
            className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition"
          >
            Select Pro
          </button>
        </div>

        {/* CON CARD */}
        <div className="bg-[#eeeede] p-10 rounded-[40px] flex flex-col items-center group hover:shadow-2xl transition-all duration-300">
          <div className="mb-8">
            <svg viewBox="0 0 100 120" className="w-24 h-24 text-black opacity-80 group-hover:opacity-100 transition">
              <path d="M30 40 L70 40 M30 55 L70 55 M30 70 L70 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M25 30 L75 30 L75 85 L25 85 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M40 85 L40 100 M60 85 L60 100" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">CON SIDE</h2>
          <p className="text-gray-600 mb-10 leading-relaxed text-sm h-12 flex items-center">
            Argue against the topic. Challenge assumptions and provide counterarguments.
          </p>
          <button 
            onClick={() => onSelect(DebateSide.CON)}
            className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition"
          >
            Select Con
          </button>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-sm font-medium text-gray-500">
          Need help deciding? <button className="text-black underline font-bold">See topic overview.</button>
        </p>
      </div>
    </div>
  );
};

export default SideSelectionView;
