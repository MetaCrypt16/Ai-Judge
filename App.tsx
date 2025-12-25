
import React, { useState, useEffect } from 'react';
import { AppState, User, DebateSide, Message, JudgeVerdict, PastDebate } from './types';
import LandingView from './views/LandingView';
import AuthView from './views/AuthView';
import TopicEntryView from './views/TopicEntryView';
import SideSelectionView from './views/SideSelectionView';
import DebateRoomView from './views/DebateRoomView';
import ResultsView from './views/ResultsView';
import HistoryView from './views/HistoryView';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [debateTopic, setDebateTopic] = useState('');
  const [selectedSide, setSelectedSide] = useState<DebateSide | null>(null);
  const [debateHistory, setDebateHistory] = useState<Message[]>([]);
  const [verdict, setVerdict] = useState<JudgeVerdict | null>(null);
  const [pastDebates, setPastDebates] = useState<PastDebate[]>([]);

  // Persistence check
  useEffect(() => {
    const savedUser = localStorage.getItem('chatty_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedHistory = localStorage.getItem('chatty_debate_history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Revive dates
        const revived = parsed.map((d: any) => ({
          ...d,
          date: new Date(d.date),
          history: d.history.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
        }));
        setPastDebates(revived);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (newDebate: PastDebate) => {
    const updated = [newDebate, ...pastDebates];
    setPastDebates(updated);
    localStorage.setItem('chatty_debate_history', JSON.stringify(updated));
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('chatty_user', JSON.stringify(userData));
    setAppState(AppState.TOPIC_ENTRY);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('chatty_user');
    setAppState(AppState.LANDING);
  };

  const startDebate = (topic: string) => {
    setDebateTopic(topic);
    setAppState(AppState.SIDE_SELECTION);
  };

  const selectSide = (side: DebateSide) => {
    setSelectedSide(side);
    setAppState(AppState.DEBATE_ROOM);
  };

  const finishDebate = (history: Message[], judgeVerdict: JudgeVerdict) => {
    setDebateHistory(history);
    setVerdict(judgeVerdict);
    
    const newDebate: PastDebate = {
      id: Date.now().toString(),
      topic: debateTopic,
      userSide: selectedSide!,
      verdict: judgeVerdict,
      date: new Date(),
      history: history
    };
    saveToHistory(newDebate);
    setAppState(AppState.RESULTS);
  };

  const resetAll = () => {
    setDebateTopic('');
    setSelectedSide(null);
    setDebateHistory([]);
    setVerdict(null);
    setAppState(AppState.TOPIC_ENTRY);
  };

  const viewHistoryDetail = (debate: PastDebate) => {
    setDebateTopic(debate.topic);
    setSelectedSide(debate.userSide);
    setDebateHistory(debate.history);
    setVerdict(debate.verdict);
    setAppState(AppState.RESULTS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-soft-beige">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onHome={() => user ? setAppState(AppState.TOPIC_ENTRY) : setAppState(AppState.LANDING)}
        onHistory={() => setAppState(AppState.HISTORY)}
      />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {appState === AppState.LANDING && (
          <LandingView onGetStarted={() => setAppState(AppState.AUTH)} />
        )}
        
        {appState === AppState.AUTH && (
          <AuthView onAuthSuccess={handleLogin} />
        )}

        {appState === AppState.TOPIC_ENTRY && (
          <TopicEntryView onContinue={startDebate} />
        )}

        {appState === AppState.SIDE_SELECTION && (
          <SideSelectionView onSelect={selectSide} />
        )}

        {appState === AppState.DEBATE_ROOM && selectedSide && (
          <DebateRoomView 
            topic={debateTopic} 
            userSide={selectedSide} 
            onFinish={finishDebate}
            onLeave={resetAll}
          />
        )}

        {appState === AppState.RESULTS && verdict && (
          <ResultsView 
            topic={debateTopic}
            user={user}
            verdict={verdict} 
            history={debateHistory}
            onNewDebate={resetAll}
          />
        )}

        {appState === AppState.HISTORY && (
          <HistoryView 
            debates={pastDebates} 
            onViewDetail={viewHistoryDetail}
            onBack={() => setAppState(AppState.TOPIC_ENTRY)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
