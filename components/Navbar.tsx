
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onHome: () => void;
  onHistory: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onHome, onHistory }) => {
  return (
    <nav className="w-full px-8 py-6 flex items-center justify-between max-w-7xl mx-auto border-b border-gray-100 bg-soft-beige shrink-0 h-20">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={onHome}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-full h-full text-black">
            <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
            <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
            <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
            <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight">Chatty Charm</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <button onClick={onHome} className="hover:text-black transition">Debate</button>
        {user && (
          <button onClick={onHistory} className="hover:text-black transition font-bold">My History</button>
        )}
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">{user.username}</span>
            <button 
              onClick={onLogout}
              className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="w-[120px]"></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
