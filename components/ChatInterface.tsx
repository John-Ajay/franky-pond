
import React, { useState, useRef, useEffect } from 'react';
import { chatWithFranky } from '../services/geminiService';
import { Message } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Ribbit! Welcome to the pond, friend. I am Franky. What brings you to my lily pad today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await chatWithFranky(history, userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Oops, caught a fly in my throat. Try again?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full bg-emerald-950/40 rounded-3xl overflow-hidden border border-emerald-800 shadow-2xl backdrop-blur-sm">
      <div className="bg-emerald-800/60 p-4 border-b border-emerald-700 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border border-emerald-400 overflow-hidden bg-emerald-900 flex items-center justify-center">
            {imgError ? (
              <span className="text-white font-bold italic">F</span>
            ) : (
              <img 
                src="https://pbs.twimg.com/profile_images/1760450013583564800/W8-p2j0E_400x400.jpg" 
                className="w-full h-full object-cover" 
                alt="Franky" 
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-emerald-800"></div>
        </div>
        <div>
          <h2 className="font-bold text-emerald-50">Franky the Frog</h2>
          <p className="text-xs text-emerald-300">Online • Croaking away</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-emerald-900 text-emerald-100 rounded-tl-none border border-emerald-700'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-emerald-900 p-3 rounded-2xl rounded-tl-none border border-emerald-700 animate-pulse">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-emerald-900/40 border-t border-emerald-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-emerald-950 border border-emerald-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center transition-colors shadow-lg disabled:opacity-50"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
