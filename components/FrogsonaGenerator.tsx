import React, { useState } from 'react';
import { generateFrogsona } from '../services/geminiService';
import { Frogsona } from '../types';

const FrogsonaGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFrog, setCurrentFrog] = useState<string | null>(null);
  const [history, setHistory] = useState<Frogsona[]>([]);

  const handleGenerate = async () => {
    if (!description.trim() || isGenerating) return;

    setIsGenerating(true);
    setCurrentFrog(null);
    const result = await generateFrogsona(description);
    
    if (result) {
      setCurrentFrog(result);
      const newFrog: Frogsona = {
        id: Date.now().toString(),
        url: result,
        prompt: description,
        timestamp: Date.now()
      };
      setHistory(prev => [newFrog, ...prev]);
    } else {
      alert("Something went wrong in the swamp. Try a different description!");
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 pb-20 md:pb-4">
      <div className="bg-emerald-950/40 p-6 rounded-3xl border border-emerald-800 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-100 mb-2">Frogsona Creator</h2>
          <p className="text-emerald-300">Visualize your place in the pond. Describe your dream frog and let Franky's AI bring it to life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-emerald-400 text-sm font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., A cyborg frog wearing a gold crown, neon sunglasses, sitting on a high-tech lily pad"
                className="w-full h-32 bg-emerald-950 border border-emerald-700 rounded-2xl p-4 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                isGenerating ? 'bg-emerald-800 cursor-not-allowed text-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white leap-animation'
              }`}
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Brewing in the Swamp...
                </>
              ) : (
                <>
                  <i className="fas fa-sparkles"></i>
                  Leap into Reality
                </>
              )}
            </button>
          </div>

          {/* Preview Area */}
          <div className="flex flex-col items-center justify-center bg-emerald-950/60 rounded-2xl border-2 border-dashed border-emerald-800 p-4 aspect-square">
            {currentFrog ? (
              <img src={currentFrog} className="w-full h-full object-cover rounded-xl shadow-2xl animate-in fade-in zoom-in duration-500" alt="Generated Frog" />
            ) : (
              <div className="text-center text-emerald-700">
                {isGenerating ? (
                   <div className="space-y-4">
                      <i className="fas fa-frog text-5xl animate-bounce"></i>
                      <p>Mixing green pigments...</p>
                   </div>
                ) : (
                  <>
                    <i className="fas fa-image text-5xl mb-4 opacity-20"></i>
                    <p>Your Frogsona will appear here</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>