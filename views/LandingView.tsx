
import React from 'react';

interface LandingViewProps {
  onGetStarted: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onGetStarted }) => {
  return (
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
      <div className="bg-[#f0ece3] p-12 rounded-3xl h-[600px] flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-6 leading-tight">AI Debate Platform</h1>
        <p className="text-xl text-gray-700 mb-12">Engage in structured, fair debate with our AI Judge.</p>
        <div className="relative h-64 w-full">
           <img 
            src="https://picsum.photos/seed/debate/600/400" 
            alt="Debate Illustration" 
            className="w-full h-full object-cover rounded-2xl grayscale mix-blend-multiply opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[80%]">
              <p className="text-sm italic text-gray-600">"The AI Judge ensures every point is weighed with pure logic, removing human bias from the arena."</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-bold mb-4">Level Up Your Rhetoric</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Our platform utilizes advanced LLMs to simulate high-stakes debating. Test your arguments against cutting-edge AI or human opponents, and receive immediate, blockchain-verifiable evaluation from our neutral AI Judge.
          </p>
          <div className="space-y-4 w-full">
            <button 
              onClick={onGetStarted}
              className="w-full bg-black text-white py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 transition shadow-lg"
            >
              Get Started Now
            </button>
            <div className="flex items-center gap-4 justify-center py-4">
              <span className="h-px bg-gray-300 flex-grow"></span>
              <span className="text-gray-400 text-sm font-medium">TRUSTED BY 10K+ DEBATERS</span>
              <span className="h-px bg-gray-300 flex-grow"></span>
            </div>
            <div className="flex justify-center gap-6 grayscale opacity-60">
               {/* Placeholders for logos */}
               <div className="w-8 h-8 rounded-full bg-gray-400"></div>
               <div className="w-8 h-8 rounded-full bg-gray-400"></div>
               <div className="w-8 h-8 rounded-full bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingView;
