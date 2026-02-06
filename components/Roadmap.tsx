
import React from 'react';

const Roadmap: React.FC = () => {
  const steps = [
    {
      phase: 'Phase 1: The Spawn',
      status: 'Completed',
      items: ['Community Discord Launch', 'Organic X Growth', 'First Fly Snack Giveaway'],
      color: 'bg-emerald-500'
    },
    {
      phase: 'Phase 2: Tadpole Transformation',
      status: 'Current',
      items: ['AI Interactive Hub (This App!)', 'Whitelist Quests', 'Ambassador Onboarding'],
      color: 'bg-green-500'
    },
    {
      phase: 'Phase 3: The Big Leap',
      status: 'Coming Soon',
      items: ['Main Mint Day', 'The Pond DAO Formation', 'IRL Frog Conservation Donation'],
      color: 'bg-emerald-400'
    },
    {
      phase: 'Phase 4: Lily Pad Domination',
      status: 'Future',
      items: ['$FRY Token Ecosystem', 'V2 Frog Mutations', 'The Great Swamp Metaverse'],
      color: 'bg-green-300'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full p-4 space-y-8 pb-24">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-emerald-100">Project Roadmap</h2>
        <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        <p className="text-emerald-300 max-w-xl mx-auto">From tiny eggs to rulers of the swamp. See how we're building the future of Franky the Frog.</p>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500 before:to-transparent">
        {steps.map((step, index) => (
          <div key={index} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-950 bg-emerald-900 text-emerald-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all group-hover:scale-125 group-hover:bg-emerald-500 group-hover:text-white z-10">
               <i className={`fas ${step.status === 'Completed' ? 'fa-check' : step.status === 'Current' ? 'fa-frog' : 'fa-lock'} text-sm`}></i>
            </div>
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-emerald-900/40 p-6 rounded-3xl border border-emerald-800 shadow-xl backdrop-blur-sm group-hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-emerald-100">{step.phase}</div>
                <time className={`text-xs px-2 py-1 rounded-full text-white font-bold ${step.color}`}>{step.status}</time>
              </div>
              <ul className="text-emerald-400 text-sm space-y-2 mt-4">
                {step.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <i className="fas fa-caret-right text-emerald-500"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
