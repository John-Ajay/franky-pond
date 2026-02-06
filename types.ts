
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Frogsona {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export enum AppView {
  CHAT = 'chat',
  FORG_GENERATOR = 'forg-generator',
  ROADMAP = 'roadmap',
  WHITELIST = 'whitelist'
}
