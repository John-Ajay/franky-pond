
import React, { useState } from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const [imgError, setImgError] = useState(false);
  const navItems = [
    { view: AppView.CHAT, icon: 'fa-comments', label: 'Chat' },
    { view: AppView.FORG_GENERATOR, icon: 'fa-wand-magic-sparkles', label: 'Creator' },
    { view: AppView.ROADMAP, icon: 'fa-map-location-dot', label: 'Roadmap' },
    { view: AppView.WHITELIST, icon: 'fa-id-card', label: 'WL Spot' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-emerald-900/80 backdrop-blur-md border-t border-emerald-700 p-2 flex justify-around items-center z-50 md:top-0 md:bottom-auto md:flex-col md:w-20 md:h-screen md:border-r md:border-t-0">
      <div className="hidden md:flex flex-col items-center mb-8 mt-4">
         <div className="w-12 h-12 rounded-full border-2 border-emerald-400 overflow-hidden bg-emerald-800 flex items-center justify-center shadow-lg">
           {imgError ? (
             <span className="text-white font-bold italic">F</span>
           ) : (
             <img 
               src="https://pbs.twimg.com/profile_images/1760450013583564800/W8-p2j0E_400x400.jpg" 
               className="w-full h-full object-cover" 
               alt="Logo" 
               onError={() => setImgError(true)}
             />
           )}
         </div>
      </div>
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => setView(item.view)}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 leap-animation ${
            currentView === item.view ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/50' : 'text-emerald-300 hover:text-white'
          }`}
        >
          <i className={`fas ${item.icon} text-xl md:text-2xl`}></i>
          <span className="text-[10px] md:text-xs mt-1 font-semibold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
