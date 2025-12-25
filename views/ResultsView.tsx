
import React from 'react';
import { User, JudgeVerdict, Message } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsViewProps {
  topic: string;
  user: User | null;
  verdict: JudgeVerdict;
  history: Message[];
  onNewDebate: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ topic, user, verdict, onNewDebate }) => {
  const chartData = [
    { name: 'Logic', score: verdict.scores.logic },
    { name: 'Evidence', score: verdict.scores.evidence },
    { name: 'Rebuttal', score: verdict.scores.rebuttal },
    { name: 'Clarity', score: verdict.scores.clarity },
  ];

  return (
    <div className="max-w-6xl w-full animate-fade-in pt-10">
      <h1 className="text-6xl font-extrabold text-center mb-16">AI Debate Judge Results</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1.5fr] gap-12 items-start">
        {/* SUMMARY COL */}
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Debate Summary</h2>
            <div className="space-y-4 text-sm">
              <p><span className="font-bold">Topic:</span> {topic}</p>
              <p><span className="font-bold">Proponent:</span> {user?.username || 'You'}</p>
              <p><span className="font-bold">Opponent:</span> AI Agent 001</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Overview</h2>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "The debate explored the benefits and risks of the topic, focusing on personalized impact versus systemic considerations. Both participants showed high levels of engagement."
            </p>
          </section>

          <section className="bg-black text-white p-6 rounded-3xl">
             <h3 className="text-xs font-bold uppercase mb-4 opacity-60">Blockchain Verification</h3>
             <div className="space-y-2">
                <p className="text-[10px] break-all font-mono">{verdict.blockchainHash}</p>
                <p className="text-xs flex items-center gap-1 font-bold">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ON-CHAIN VERIFIED
                </p>
             </div>
          </section>
        </div>

        {/* VERDICT COL */}
        <div className="space-y-8">
           <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">AI Judge Decision</h2>
           <div className="relative">
              <h3 className="text-5xl font-black mb-6">Winner: <span className="underline decoration-yellow-400">{verdict.winner === 'PRO' ? (user?.username || 'You') : 'AI Opponent'}</span></h3>
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
                {verdict.reasoning}
              </p>
           </div>
           
           <div className="flex gap-4 pt-10">
              <button className="flex-1 bg-white border-2 border-black text-black py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                View Full Transcript
              </button>
              <button 
                onClick={onNewDebate}
                className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
              >
                Start New Debate
              </button>
           </div>
        </div>

        {/* CHARTS COL */}
        <div className="bg-[#fcfbf4] p-8 rounded-[40px] border border-gray-100 shadow-xl self-start">
           <div className="flex justify-center mb-8">
              <img src="https://picsum.photos/seed/judgestamp/200/200" className="w-32 h-32 object-contain grayscale" alt="Verdict Illustration" />
           </div>
           <h3 className="text-2xl font-bold mb-8 text-center">Criteria Scores</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={20}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000' : '#888'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-8 space-y-4">
              {chartData.map((d) => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{d.name}</span>
                    <span>{d.score}/10</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black transition-all duration-1000" style={{ width: `${d.score * 10}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
