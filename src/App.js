import React, { useState, useEffect } from 'react';
import { AlertTriangle, Power, Wind, Flame, Skull } from 'lucide-react';

export default function HVACSimulator() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [stage, setStage] = useState(0); // 0: Normal, 1: Error, 2: Catastrophe
  const [isPlaying, setIsPlaying] = useState(false);

  const scenarios = [
    {
      title: "1. INS Ranvir - Mislabeled Refrigerant",
      fault: "Charging system with incorrect, flammable refrigerant.",
      description: "Contractor supplied highly flammable R-152a instead of non-combustible R-22. Spark during maintenance ignited the pressurized mixture.",
      visual: () => (
        <div className="relative w-full h-64 bg-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center overflow-hidden">
          {/* Compressor */}
          <div className="w-32 h-24 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold z-10 relative">
            AC Plant
            {stage === 2 && (
              <div className="absolute inset-0 bg-orange-500 rounded-lg animate-ping opacity-75"></div>
            )}
          </div>
          {/* Cylinder */}
          <div className={`absolute left-10 bottom-10 w-16 h-32 rounded-t-full flex items-center justify-center font-bold text-white transition-colors duration-1000 ${stage > 0 ? 'bg-red-600' : 'bg-green-600'}`}>
            {stage > 0 ? 'R-152a' : 'R-22'}
          </div>
          {/* Connecting Pipe */}
          <div className={`absolute left-26 bottom-16 w-32 h-2 transition-colors duration-1000 ${stage > 0 ? 'bg-red-400' : 'bg-blue-300'}`}></div>
          
          {/* Explosion Effect */}
          {stage === 2 && (
            <div className="absolute w-64 h-64 bg-orange-600 rounded-full animate-pulse opacity-80 mix-blend-screen flex items-center justify-center text-white text-2xl font-black">
              <Flame size={64} className="text-yellow-300" />
            </div>
          )}
        </div>
      )
    },
    {
      title: "2. F/V Kaltan - Confined Space Gas Leak",
      fault: "Mechanical seal breach in high-capacity refrigeration plant.",
      description: "Large quantities of heavier-than-air Freon gas suddenly leaked into unventilated spaces, displacing oxygen and causing sudden cardiac arrest.",
      visual: () => (
        <div className="relative w-full h-64 bg-slate-800 rounded-lg border-2 border-slate-600 flex flex-col justify-end overflow-hidden p-4">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-16 bg-blue-700 rounded text-center text-white p-1">Refrigeration Plant</div>
          {/* Leak effect */}
          {stage > 0 && (
            <div className="absolute top-20 left-1/2 w-2 h-32 bg-green-400 opacity-50 animate-pulse"></div>
          )}
          {/* Gas Pooling */}
          <div className={`absolute bottom-0 left-0 right-0 bg-green-500/40 transition-all duration-1000 ease-in-out flex items-end justify-around pb-4 ${stage === 0 ? 'h-0' : stage === 1 ? 'h-1/3' : 'h-2/3'}`}>
             <div className={`transition-all duration-500 ${stage === 2 ? 'rotate-90 opacity-50' : ''}`}><Skull color={stage === 2 ? 'red' : 'white'} /></div>
             <div className={`transition-all duration-500 ${stage === 2 ? 'rotate-90 opacity-50' : ''}`}><Skull color={stage === 2 ? 'red' : 'white'} /></div>
          </div>
        </div>
      )
    },
    {
      title: "3. Regina Seaways - Cross-Contamination",
      fault: "Shared/interconnected HVAC without isolation barriers.",
      description: "Interconnected crankcase ventilation allowed toxic oil mist and fire smoke from a damaged engine to be drawn directly into the adjacent healthy engine.",
      visual: () => (
        <div className="relative w-full h-64 bg-slate-800 rounded-lg border-2 border-slate-600 p-4 flex justify-between items-end">
          {/* Engine 1 (Starboard) */}
          <div className="relative w-1/3 h-32 bg-gray-500 rounded flex items-center justify-center text-white flex-col">
            Starboard Engine
            {stage > 0 && <Flame className="text-orange-500 animate-bounce mt-2" size={32} />}
          </div>
          
          {/* Shared Ducting */}
          <div className="absolute top-10 left-1/4 right-1/4 h-16 border-t-4 border-l-4 border-r-4 border-gray-400 rounded-t-xl flex justify-center pt-2">
            {stage > 0 && <Wind className="text-gray-900 animate-pulse" size={48} />}
            {stage === 2 && <span className="text-red-500 font-bold ml-2">Toxic Smoke Transfer!</span>}
          </div>

          {/* Engine 2 (Port) */}
          <div className={`relative w-1/3 h-32 rounded flex items-center justify-center text-white flex-col transition-colors duration-1000 ${stage === 2 ? 'bg-red-900' : 'bg-gray-500'}`}>
            Port Engine
            {stage === 2 && <Power className="text-red-500 mt-2" size={32} />}
          </div>
        </div>
      )
    },
    {
      title: "4. Pump-Down Auto-Ignition",
      fault: "Air leak on low-pressure side creates diesel effect.",
      description: "During recovery, air is sucked into the system. Compression of high-pressure air mixed with compressor oil reaches auto-ignition temperature.",
      visual: () => (
        <div className="relative w-full h-64 bg-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center p-8">
           <div className="w-48 h-32 border-4 border-blue-500 rounded-2xl relative flex items-center justify-center text-xl font-bold text-white bg-slate-700 overflow-hidden">
              Compressor Casing
              {/* Air Leak Indicator */}
              {stage > 0 && (
                <div className="absolute left-0 top-1/2 w-8 h-2 bg-blue-300 animate-pulse flex items-center">
                   <span className="absolute -left-12 text-sm text-blue-300">Air Leak</span>
                </div>
              )}
              {/* Pressure Build up & Explosion */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${stage === 0 ? 'bg-transparent' : stage === 1 ? 'bg-orange-500/40' : 'bg-red-600'}`}></div>
              {stage === 2 && <div className="absolute inset-0 bg-yellow-400 animate-ping opacity-75"></div>}
           </div>
           {stage === 2 && <div className="absolute top-4 text-red-500 font-black text-2xl animate-bounce">DIESEL EFFECT RUPTURE</div>}
        </div>
      )
    }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (stage < 2) {
        timer = setTimeout(() => setStage(prev => prev + 1), 2500);
      } else {
        setTimeout(() => setIsPlaying(false), 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, stage]);

  const handlePlay = () => {
    setStage(0);
    setIsPlaying(true);
  };

  const handleScenarioChange = (index) => {
    setActiveScenario(index);
    setStage(0);
    setIsPlaying(false);
  };

  const activeData = scenarios[activeScenario];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-4">
          <h1 className="text-2xl font-black text-white flex items-center gap-2 border-b-2 border-slate-700 pb-4">
            <AlertTriangle className="text-yellow-500" /> Marine HVAC Incident Simulator
          </h1>
          <div className="flex flex-col gap-2">
            {scenarios.map((scen, idx) => (
              <button 
                key={idx}
                onClick={() => handleScenarioChange(idx)}
                className={`text-left p-4 rounded-lg font-bold transition-colors ${activeScenario === idx ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {scen.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Display window */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          
          {/* Animation Canvas */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-700 shadow-2xl">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Live Telemetry Simulation</h2>
                <div className="flex items-center gap-4">
                   <div className="flex gap-2">
                      <span className={`w-3 h-3 rounded-full ${stage === 0 ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-slate-700'}`}></span>
                      <span className={`w-3 h-3 rounded-full ${stage === 1 ? 'bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'bg-slate-700'}`}></span>
                      <span className={`w-3 h-3 rounded-full ${stage === 2 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-slate-700'}`}></span>
                   </div>
                   <button 
                     onClick={handlePlay}
                     disabled={isPlaying}
                     className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-bold disabled:opacity-50"
                   >
                     {isPlaying ? 'Simulating...' : 'Trigger Incident'}
                   </button>
                </div>
             </div>
             
             {/* Render the active visual */}
             {activeData.visual()}
          </div>

          {/* Data Readout Panel */}
          <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-red-500">
             <h3 className="text-lg font-bold text-red-400 mb-2">HVAC Fault</h3>
             <p className="text-white mb-4">{activeData.fault}</p>
             
             <h3 className="text-lg font-bold text-red-400 mb-2">Cause & Impact</h3>
             <p className="text-slate-300 leading-relaxed">{activeData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}