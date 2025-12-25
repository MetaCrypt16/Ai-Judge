
import React, { useState } from 'react';

interface TopicEntryViewProps {
  onContinue: (topic: string) => void;
}

const TopicEntryView: React.FC<TopicEntryViewProps> = ({ onContinue }) => {
  const [topic, setTopic] = useState('');

  return (
    <div className="max-w-2xl w-full text-center py-20 animate-fade-in">
      <h1 className="text-5xl font-bold mb-12">Enter Your Debate Topic</h1>
      <div className="relative mb-12">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input 
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder='E.g., "Artificial intelligence will replace most human jobs"'
          className="w-full bg-white border border-gray-200 py-6 px-16 rounded-2xl text-xl shadow-sm focus:shadow-md focus:border-black outline-none transition"
        />
      </div>
      <button 
        disabled={!topic.trim()}
        onClick={() => onContinue(topic)}
        className="w-full bg-black text-white py-5 rounded-full text-xl font-bold hover:bg-gray-800 transition disabled:opacity-30 shadow-xl"
      >
        Continue
      </button>
    </div>
  );
};

export default TopicEntryView;
