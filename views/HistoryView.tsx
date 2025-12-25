
import React from 'react';
import { PastDebate } from '../types';

interface HistoryViewProps {
  debates: PastDebate[];
  onViewDetail: (debate: PastDebate) => void;
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ debates, onViewDetail, onBack }) => {
  return (
    <div className="max-w-4xl w-full animate-fade-in pt-10">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-5xl font-bold">My Debates</h1>
        <button 
          onClick={onBack}
          className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition shadow-md"
        >
          New Debate
        </button>
      </div>

      {debates.length === 0 ? (
        <div className="bg-white p-20 rounded-[40px] text-center border border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-soft-beige rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">No debates yet</h2>
          <p className="text-gray-500 mb-8">Your finished debates will appear here for you to review.</p>
          <button 
            onClick={onBack}
            className="text-black underline font-bold"
          >
            Start your first debate
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {debates.map((debate) => (
            <div 
              key={debate.id}
              onClick={() => onViewDetail(debate)}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${debate.verdict.winner === debate.userSide ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {debate.verdict.winner === debate.userSide ? 'Victory' : 'Defeat'}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{debate.date.toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-black transition">{debate.topic}</h3>
                <p className="text-sm text-gray-400 font-medium">Side: {debate.userSide} • {debate.history.length} messages</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-black">{Math.round((debate.verdict.scores.logic + debate.verdict.scores.evidence + debate.verdict.scores.rebuttal + debate.verdict.scores.clarity) / 4)}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Avg Score</div>
                </div>
                <div className="w-12 h-12 bg-soft-beige rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
