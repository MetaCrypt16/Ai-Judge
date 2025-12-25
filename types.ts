
export enum DebateSide {
  PRO = 'PRO',
  CON = 'CON'
}

export interface Message {
  id: string;
  sender: string; // Changed from 'user' | 'opponent' to string for usernames
  side: DebateSide;
  text: string;
  timestamp: Date;
}

export interface JudgeVerdict {
  winner: string;
  reasoning: string;
  scores: {
    logic: number;
    evidence: number;
    rebuttal: number;
    clarity: number;
  };
  blockchainHash?: string;
}

export interface User {
  username: string;
  email: string;
}

export interface PastDebate {
  id: string;
  topic: string;
  userSide: DebateSide;
  verdict: JudgeVerdict;
  date: Date;
  history: Message[];
}

export enum AppState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  TOPIC_ENTRY = 'TOPIC_ENTRY',
  SIDE_SELECTION = 'SIDE_SELECTION',
  DEBATE_ROOM = 'DEBATE_ROOM',
  RESULTS = 'RESULTS',
  HISTORY = 'HISTORY'
}
