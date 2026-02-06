
import React, { useState } from 'react';

const WhitelistForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    xHandle: '',
    whyYou: '',
    frogLove: '10'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send to a database
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center space-y-6 animate-in zoom-in duration-500 p-8 bg-emerald-900/40 rounded-3xl border border-emerald-500 shadow-2xl">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/50">
          <i className="fas fa-paper-plane text-white text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-white">Leap Successful!</h2>
        <p className="text-emerald-300">Your application has been stored in the Great Swamp Vault. Franky will review it soon. Keep an eye on your X notifications!</p>
        <button onClick={() => setSubmitted(false)} className="text-emerald-400 hover:underline">Submit another idea?</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-4 pb-24">
      <div className="bg-emerald-950/40 p-8 rounded-3xl border border-emerald-800 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Visual elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-frog text-9xl"></i>
        </div>

        <div className="mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-emerald-100">Claim Your Spot</h2>
          <p className="text-emerald-300 mt-2">To get on the whitelist, you must show Franky your passion for the pond.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-emerald-400 text-sm font-semibold mb-2">X (Twitter) Handle</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">@</span>
              <input
                required
                type="text"
                value={formData.xHandle}
                onChange={(e) => setFormData({...formData, xHandle: e.target.value})}
                className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 pl-10 pr-4 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="FrankyTheFrog"
              />
            </div>
          </div>

          <div>
            <label className="block text-emerald-400 text-sm font-semibold mb-2">How will you help the Pond grow?</label>
            <textarea
              required
              value={formData.whyYou}
              onChange={(e) => setFormData({...formData, whyYou: e.target.value})}
              className="w-full h-32 bg-emerald-950 border border-emerald-700 rounded-xl p-4 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              placeholder="I'll bring my fly-catching skills and hype the project to the moon..."
            />
          </div>

          <div>
            <label className="block text-emerald-400 text-sm font-semibold mb-2">How much do you love frogs? (1-100)</label>
            <input
              type="range"
              min="1"
              max="100"
              value={formData.frogLove}
              onChange={(e) => setFormData({...formData, frogLove: e.target.value})}
              className="w-full h-2 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-emerald-600 font-bold mt-1">
              <span>JUST A TADPOLE</span>
              <span className="text-emerald-400">Current Level: {formData.frogLove}%</span>
              <span>KING OF THE SWAMP</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold rounded-xl shadow-xl shadow-emerald-900/40 transition-all leap-animation text-lg"
          >
            Request Whitelist Spot
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhitelistForm;
