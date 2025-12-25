
import React, { useState } from 'react';
import { User } from '../types';

interface AuthViewProps {
  onAuthSuccess: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !username)) return;
    
    // Simulate successful auth
    onAuthSuccess({ 
      email, 
      username: username || email.split('@')[0] 
    });
  };

  return (
    <div className="max-w-4xl w-full flex rounded-[40px] overflow-hidden shadow-2xl bg-white h-[700px]">
      <div className="hidden md:flex flex-col justify-center p-16 w-1/2 bg-[#f0ece3]">
        <h2 className="text-5xl font-bold mb-6">AI Debate Platform</h2>
        <p className="text-lg text-gray-600 mb-12">Engage in structured, fair debate with our AI Judge.</p>
        <div className="relative flex justify-center">
          <svg viewBox="0 0 200 200" className="w-64 h-64 text-black">
            <circle cx="100" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="70" y="115" width="60" height="50" rx="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M50 140 Q70 140 70 130" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M150 140 Q130 140 130 130" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M90 60 L110 60" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white">
        <div className="mb-10 flex border-b border-gray-100">
          <button 
            className={`flex-1 pb-4 text-sm font-bold transition ${isLogin ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`flex-1 pb-4 text-sm font-bold transition ${!isLogin ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-black transition"
                placeholder="Debater123"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Email or Username</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-black transition"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
              <button type="button" className="text-xs font-bold text-gray-400 underline uppercase">Forgot Password?</button>
            </div>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-black transition"
                placeholder="••••••••"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition"
          >
            {isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
            <button 
              className="text-black font-bold underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create one' : 'Login'}
            </button>
          </p>
          
          <div className="relative flex items-center gap-4 my-8">
            <span className="h-px bg-gray-100 flex-grow"></span>
            <span className="text-gray-300 text-xs font-bold">OR</span>
            <span className="h-px bg-gray-100 flex-grow"></span>
          </div>

          <div className="flex justify-center gap-4">
            <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="Google" />
            </button>
            <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition">
              <img src="https://www.svgrepo.com/show/448204/apple.svg" className="w-6 h-6" alt="Apple" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
