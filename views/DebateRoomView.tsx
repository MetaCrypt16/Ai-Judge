
import React, { useState, useRef, useEffect } from 'react';
import { Message, DebateSide, JudgeVerdict } from '../types';
import { evaluateDebate } from '../services/geminiService';

interface DebateRoomViewProps {
  topic: string;
  userSide: DebateSide;
  onFinish: (history: Message[], verdict: JudgeVerdict) => void;
  onLeave: () => void;
}

const TURN_TIME_LIMIT = 7 * 60; // 7 minutes in seconds
const MAX_ROUNDS = 3;

const DebateRoomView: React.FC<DebateRoomViewProps> = ({ topic, userSide, onFinish, onLeave }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isJudging, setIsJudging] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTurn, setCurrentTurn] = useState<DebateSide>(DebateSide.PRO);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME_LIMIT);
  const [error, setError] = useState<string | null>(null);

  const proScrollRef = useRef<HTMLDivElement>(null);
  const conScrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const proMessages = messages.filter(m => m.side === DebateSide.PRO);
  const conMessages = messages.filter(m => m.side === DebateSide.CON);

  // Auto-scroll effect
  useEffect(() => {
    if (proScrollRef.current) {
      proScrollRef.current.scrollTo({ top: proScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [proMessages.length]);

  useEffect(() => {
    if (conScrollRef.current) {
      conScrollRef.current.scrollTo({ top: conScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [conMessages.length]);

  // Turn Timer effect
  useEffect(() => {
    if (isJudging || currentRound > MAX_ROUNDS) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          handleSend(); // Auto-submit when time is up
          return TURN_TIME_LIMIT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentTurn, currentRound, isJudging]);

  const handleSend = () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput && timeLeft > 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentTurn === DebateSide.PRO ? 'Pro Player' : 'Con Player',
      side: currentTurn,
      text: trimmedInput || "(No response provided - Time expired)",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setTimeLeft(TURN_TIME_LIMIT);

    // Turn cycling
    if (currentTurn === DebateSide.PRO) {
      setCurrentTurn(DebateSide.CON);
    } else {
      if (currentRound < MAX_ROUNDS) {
        setCurrentRound(prev => prev + 1);
        setCurrentTurn(DebateSide.PRO);
      } else {
        // Debate rounds complete
        setCurrentRound(MAX_ROUNDS + 1); 
      }
    }
  };

  const handleJudge = async () => {
    if (messages.length < 2) {
      setError("Please exchange at least one round of arguments before judging.");
      return;
    }
    setIsJudging(true);
    setError(null);
    try {
      const verdict = await evaluateDebate(topic, messages);
      onFinish(messages, verdict);
    } catch (err: any) {
      setError(err.message || "The AI Judge encountered an error.");
      setIsJudging(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const debateEnded = currentRound > MAX_ROUNDS;

  return (
    <div className="fixed inset-0 top-20 flex flex-col bg-soft-beige z-10 overflow-hidden">
      {/* JUDGE LOADING OVERLAY */}
      {isJudging && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-3xl font-bold mb-2">Deliberating...</h2>
          <p className="text-gray-500 max-w-sm">AI Judge is reviewing your arguments for logic, clarity, and evidence.</p>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="bg-white border-b border-gray-200 px-8 py-3 shrink-0 flex items-center justify-between z-40">
        <div className="flex-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Topic</span>
          <h1 className="text-lg font-bold truncate max-w-[400px]">"{topic}"</h1>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="bg-black text-white px-5 py-2 rounded-2xl flex items-center gap-4 shadow-md">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-bold uppercase opacity-60">Round</span>
              <span className="text-sm font-black">{debateEnded ? "FIN" : `${currentRound}/${MAX_ROUNDS}`}</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            {!debateEnded ? (
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-[9px] font-bold uppercase opacity-60">{currentTurn} TIME</span>
                <span className={`text-sm font-black ${timeLeft < 30 ? 'text-red-400' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            ) : (
              <span className="text-xs font-bold px-2">TIME EXPIRED</span>
            )}
          </div>
        </div>

        <div className="flex-1 flex justify-end gap-2">
          <div className={`px-4 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all
            ${currentTurn === DebateSide.PRO && !debateEnded ? 'bg-yellow-50 border-yellow-200 text-yellow-700 shadow-sm ring-2 ring-yellow-400/20' : 'bg-gray-50 border-gray-100 text-gray-300 opacity-50'}`}>
            PRO
          </div>
          <div className={`px-4 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all
            ${currentTurn === DebateSide.CON && !debateEnded ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm ring-2 ring-indigo-400/20' : 'bg-gray-50 border-gray-100 text-gray-300 opacity-50'}`}>
            CON
          </div>
        </div>
      </header>

      {/* SCROLLABLE COLUMNS */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto divide-x divide-gray-200 w-full">
          {/* PRO COLUMN */}
          <section className="flex flex-col min-h-0">
             <div className="bg-white/80 backdrop-blur-md p-4 border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between">
                <span className="text-sm font-black text-yellow-600 tracking-widest">PRO ARGUMENTS</span>
                {currentTurn === DebateSide.PRO && !debateEnded && <span className="text-[10px] animate-pulse font-bold text-gray-400">TYPE NOW...</span>}
             </div>
             <div ref={proScrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/10">
                {proMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center opacity-30 italic text-sm">No PRO arguments yet.</div>
                )}
                {proMessages.map(m => (
                  <div key={m.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 animate-slide-up relative">
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">{m.text}</p>
                    <span className="mt-3 block text-[9px] font-black text-gray-300 uppercase">{m.timestamp.toLocaleTimeString()}</span>
                  </div>
                ))}
             </div>
          </section>

          {/* CON COLUMN */}
          <section className="flex flex-col min-h-0 bg-gray-50/20">
             <div className="bg-white/80 backdrop-blur-md p-4 border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between">
                <span className="text-sm font-black text-indigo-600 tracking-widest">CON ARGUMENTS</span>
                {currentTurn === DebateSide.CON && !debateEnded && <span className="text-[10px] animate-pulse font-bold text-gray-400">TYPE NOW...</span>}
             </div>
             <div ref={conScrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {conMessages.length === 0 && (
                  <div className="h-full flex items-center justify-center opacity-30 italic text-sm">No CON arguments yet.</div>
                )}
                {conMessages.map(m => (
                  <div key={m.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 animate-slide-up relative">
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">{m.text}</p>
                    <span className="mt-3 block text-[9px] font-black text-gray-300 uppercase">{m.timestamp.toLocaleTimeString()}</span>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>

      {/* ERROR BANNER */}
      {error && (
        <div className="bg-red-500 text-white py-2 text-center text-xs font-bold z-50">
          {error} <button onClick={() => setError(null)} className="underline ml-2">Close</button>
        </div>
      )}

      {/* FIXED FOOTER INPUT */}
      <footer className="bg-white border-t border-gray-200 p-6 z-40 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)] shrink-0">
        <div className="max-w-5xl mx-auto flex items-end gap-6">
          <div className="flex-1 relative">
            <label className={`absolute -top-7 left-1 text-[10px] font-black uppercase tracking-widest ${debateEnded ? 'text-gray-400' : currentTurn === DebateSide.PRO ? 'text-yellow-600' : 'text-indigo-600'}`}>
              {debateEnded ? 'Debate Finalized' : `${currentTurn} Speaker - Write your response`}
            </label>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={debateEnded || isJudging}
              placeholder={debateEnded ? "Structure your final verdict request..." : "Start typing your argument..."}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-black focus:bg-white focus:shadow-sm transition-all resize-none h-28 text-base font-medium disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">
             <button 
              onClick={handleSend}
              disabled={!inputText.trim() || debateEnded || isJudging}
              className="bg-black text-white h-14 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition shadow-lg disabled:opacity-10"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                {debateEnded ? "ROUNDS COMPLETED" : "SEND POINT"}
             </button>

             <div className="flex gap-2 h-10">
                <button 
                  onClick={onLeave}
                  className="flex-1 border border-gray-200 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition"
                >
                  LEAVE
                </button>
                <button 
                  onClick={handleJudge}
                  disabled={messages.length < 2 || isJudging}
                  className="flex-1 border-2 border-black bg-white text-black rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition shadow-sm disabled:opacity-10"
                >
                  VERDICT
                </button>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DebateRoomView;
