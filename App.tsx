import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ChatInterface from './components/ChatInterface';
import FrogsonaGenerator from './components/FrogsonaGenerator';
import Roadmap from './components/Roadmap';
import WhitelistForm from './components/WhitelistForm';
import { AppView } from './types';

export const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.CHAT);
  const [logoError, setLogoError] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.CHAT:
        return <ChatInterface />;
      case AppView.FORG_GENERATOR:
        return <FrogsonaGenerator />;
      case AppView.ROADMAP:
        return <Roadmap />;
      case AppView.WHITELIST:
        return <WhitelistForm />;
      default:
        return <ChatInterface />;
    }
  };

  const FrankyLogo = ({ className }: { className: string }) => (
    <div className={`${className} overflow-hidden bg-emerald-800 flex items-center justify-center`}>
      {logoError ? (
        <span className="text-white font-bold text-xl italic select-none">F</span>
      ) : (
        <img 
          src="https://pbs.twimg.com/profile_images/1760450013583564800/W8-p2j0E_400x400.jpg" 
          className="w-full h-full object-cover" 
          alt="Franky"
          onError={() => setLogoError(true)}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen pond-gradient relative overflow-hidden flex flex-col md:flex-row">
      {/* Decorative Water Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-green-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Moving Ripples (Visual only) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-20 left-1/4 w-32 h-32 border-2 border-emerald-400/20 rounded-full water-ripple"></div>
        <div className="absolute bottom-40 right-1/4 w-48 h-48 border-2 border-emerald-400/20 rounded-full water-ripple" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-emerald-400/20 rounded-full water-ripple" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navigation currentView={currentView} setView={setView} />
      
      <main className="flex-1 flex flex-col pt-4 md:pt-8 px-4 md:px-8 md:ml-20 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto w-full">
           <div className="flex items-center gap-3">
              <div className="md:hidden">
                 <FrankyLogo className="w-10 h-10 rounded-full border border-emerald-400 shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                  THE LILY PAD
                </h1>
                <p className="text-[10px] md:text-xs text-emerald-400 font-bold tracking-widest uppercase">Franky's Official Domain</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              <a href="https://x.com/frankythefrog" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                <FrankyLogo className="w-full h-full" />
              </a>
           </div>
        </header>

        <section className="flex-1">
          {renderView()}
        </section>
      </main>

      {/* Persistent Call to Action for Whitelist on Mobile */}
      {currentView !== AppView.WHITELIST && (
        <div className="md:hidden fixed bottom-20 right-4 z-40">
           <button 
            onClick={() => setView(AppView.WHITELIST)}
            className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl leap-animation border-4 border-emerald-900"
           >
             <i className="fas fa-ticket-alt"></i>
           </button>
        </div>
      )}
    </div>
  );
};