import React, { useState, useEffect, useRef } from 'react';
import { AlertOctagon, Activity, Wind, Flame, Skull, Droplets, Thermometer, Gauge, CheckCircle2, XCircle, User, Snowflake, AlertTriangle, PlayCircle, Volume2, VolumeX, Zap, BookOpen, Code, Maximize, Minimize, Terminal } from 'lucide-react';

export default function MarineHVACApp() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('incidents');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.log(e));
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-cyan-500 font-mono flex flex-col">
      {!isFullScreen && (
        <header className="flex justify-between items-center p-4 border-b border-cyan-900 bg-black/50 overflow-x-auto">
          <h1 className="text-xl md:text-2xl font-black tracking-widest flex items-center gap-3 whitespace-nowrap">
            <Activity className="text-cyan-400" /> MARINE HVAC DIGITAL TWIN
          </h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setActiveTab('incidents')}
              className={`px-4 py-2 border text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'incidents' ? 'border-cyan-400 bg-cyan-900/30 text-cyan-300' : 'border-cyan-900 text-cyan-700 hover:border-cyan-700'}`}>
              INCIDENT ARCHIVE
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 border text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'simulator' ? 'border-cyan-400 bg-cyan-900/30 text-cyan-300' : 'border-cyan-900 text-cyan-700 hover:border-cyan-700'}`}>
              <Gauge size={16} /> LIVE SIMULATOR
            </button>
            <button
              onClick={() => setActiveTab('references')}
              className={`px-4 py-2 border text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'references' ? 'border-cyan-400 bg-cyan-900/30 text-cyan-300' : 'border-cyan-900 text-cyan-700 hover:border-cyan-700'}`}>
              <BookOpen size={16} /> REFERENCES
            </button>
            <button 
              onClick={toggleBrowserFullscreen}
              className="ml-2 p-2 text-cyan-600 hover:text-cyan-300 transition-colors"
              title="Toggle Fullscreen"
            >
              {isBrowserFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col relative">
        {activeTab === 'incidents' ? (
          <IncidentArchive isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
        ) : activeTab === 'simulator' ? (
          <FullSystemSimulator />
        ) : (
          <ReferencesView />
        )}
      </main>
    </div>
  );
}

// ==========================================
// COMPONENT 0: LANDING PAGE ANIMATION
// ==========================================
function LandingPage({ onStart }) {
  const [stage, setStage] = useState(0); 
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => setCanProceed(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleClick = () => {
    if (stage === 0) {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.log(e));
      }
      setStage(1);
    } else if (stage === 1 && canProceed) {
      onStart(); 
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className="fixed inset-0 z-[100] bg-[#04060a] text-white flex flex-col items-center justify-center cursor-pointer overflow-hidden font-mono"
    >
      {stage === 0 ? (
        <div className="flex flex-col items-center justify-center animate-pulse">
          <Activity size={80} className="text-cyan-600 mb-6" />
          <h2 className="text-2xl md:text-4xl text-cyan-500 font-black tracking-[0.3em] text-center">SYSTEM STANDBY</h2>
          <p className="text-cyan-700 mt-4 tracking-widest">TAP ANYWHERE TO INITIALIZE PRESENTATION</p>
        </div>
      ) : (
        <>
          <style>{`
            @keyframes customFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: customFadeIn 1s ease-in forwards;
              opacity: 0;
            }

            @keyframes pixarDrop {
              0% { transform: translateY(-100vh) scaleY(1.5); opacity: 0; }
              50% { transform: translateY(0) scaleY(0.7); opacity: 1; }
              70% { transform: translateY(-30px) scaleY(1.1); }
              85% { transform: translateY(0) scaleY(0.95); }
              100% { transform: translateY(0) scaleY(1); opacity: 1; }
            }
            .pixar-word {
              display: inline-block;
              animation: pixarDrop 1.2s cubic-bezier(0.28, 0.84, 0.42, 1) forwards;
              opacity: 0;
            }

            @keyframes heatWave {
              0% { color: #fca5a5; text-shadow: 0 0 10px #ef4444, 0 -2px 10px #f97316; transform: translateY(0px); }
              100% { color: #ef4444; text-shadow: 0 0 20px #dc2626, 0 -8px 20px #ea580c; transform: translateY(-2px); }
            }
            .heat-effect {
              animation: heatWave 0.8s infinite alternate ease-in-out;
              display: inline-flex;
            }

            @keyframes ventBlow {
              0% { transform: skewX(0deg) translateX(0); letter-spacing: normal; color: #cbd5e1; filter: blur(0px); }
              50% { transform: skewX(-15deg) translateX(10px); letter-spacing: 4px; color: #f1f5f9; filter: blur(1px); }
              100% { transform: skewX(0deg) translateX(0); letter-spacing: normal; color: #cbd5e1; filter: blur(0px); }
            }
            .vent-effect {
              animation: ventBlow 3s infinite ease-in-out;
              display: inline-flex;
            }

            @keyframes shiverFreeze {
              0% { transform: translateX(0); text-shadow: 0 0 5px #93c5fd; color: #bfdbfe; }
              25% { transform: translateX(-2px) translateY(1px); }
              50% { transform: translateX(2px) translateY(-1px); text-shadow: 0 0 25px #3b82f6; color: #fff; }
              75% { transform: translateX(-2px) translateY(-1px); }
              100% { transform: translateX(0); text-shadow: 0 0 5px #93c5fd; color: #bfdbfe; }
            }
            .ac-effect {
              animation: shiverFreeze 0.15s infinite;
              display: inline-flex;
            }
          `}</style>
          
          <div className="flex flex-col items-center justify-center flex-1 w-full relative z-10">
             <div className="flex gap-4 md:gap-6 text-4xl md:text-7xl font-black tracking-tighter mb-8 text-cyan-50">
               <span className="pixar-word" style={{ animationDelay: '0.2s' }}>ACTIVITY</span>
               <span className="pixar-word" style={{ animationDelay: '0.6s' }}>BASED</span>
               <span className="pixar-word" style={{ animationDelay: '1.0s' }}>LEARNING</span>
             </div>
             <div className="text-xl md:text-3xl text-cyan-700 mb-8 animate-fade-in" style={{ animationDelay: '1.8s' }}>OF</div>
             <div className="text-[12rem] md:text-[18rem] font-black text-cyan-900/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap animate-fade-in pointer-events-none" style={{ animationDelay: '2.0s' }}>HVAC</div>

             <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-3xl md:text-5xl font-black z-10 animate-fade-in items-center text-center" style={{ animationDelay: '2.5s' }}>
                <span className="heat-effect items-center gap-3"><Flame className="text-orange-500 animate-pulse" size={40}/> HEATING</span>
                <span className="text-cyan-900 hidden md:block">|</span>
                <span className="vent-effect items-center gap-3"><Wind className="inline" size={40}/> VENTILATION</span>
                <span className="text-cyan-900 hidden md:block">|</span>
                <span className="ac-effect items-center gap-3"><Snowflake className="animate-spin" style={{animationDuration: '4s'}} size={40}/> AIR CONDITIONING</span>
             </div>
          </div>

          <div className="w-full bg-slate-900/50 border-t border-cyan-900 px-8 py-10 flex flex-col items-center justify-center animate-fade-in z-20" style={{ animationDelay: '3.5s' }}>
             <h3 className="text-cyan-600 tracking-[0.3em] font-bold text-sm mb-6">PRESENTED BY</h3>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 text-center">
                <div className="bg-[#04060a] border border-cyan-400/50 p-4 rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:border-cyan-400 transition-colors">
                   <div className="font-black text-cyan-100 text-lg whitespace-nowrap">Cyril Dheeran</div>
                   <div className="text-sm text-cyan-400 font-bold mt-1 tracking-widest">2303608023</div>
                </div>
                <div className="bg-[#04060a] border border-cyan-400/50 p-4 rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:border-cyan-400 transition-colors">
                   <div className="font-black text-cyan-100 text-lg whitespace-nowrap">Mohammed Dhafiq</div>
                   <div className="text-sm text-cyan-400 font-bold mt-1 tracking-widest">2303608039</div>
                </div>
                <div className="bg-[#04060a] border border-cyan-400/50 p-4 rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:border-cyan-400 transition-colors">
                   <div className="font-black text-cyan-100 text-lg whitespace-nowrap">M Athul Dev</div>
                   <div className="text-sm text-cyan-400 font-bold mt-1 tracking-widest">2303608037</div>
                </div>
                <div className="bg-[#04060a] border border-cyan-400/50 p-4 rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:border-cyan-400 transition-colors">
                   <div className="font-black text-cyan-100 text-lg whitespace-nowrap">Afsal Rahman J</div>
                   <div className="text-sm text-cyan-400 font-bold mt-1 tracking-widest">2303608008</div>
                </div>
             </div>
             
             {canProceed && (
               <div className="mt-12 text-cyan-400 animate-pulse tracking-[0.2em] font-black text-lg flex items-center gap-3 bg-cyan-950/40 px-8 py-3 rounded-full border border-cyan-800 transition-all hover:bg-cyan-900">
                  TAP TO ENTER SIMULATOR <PlayCircle size={24} />
               </div>
             )}
          </div>
        </>
      )}
    </div>
  )
}

// ==========================================
// COMPONENT 0.5: REFERENCES PAGE
// ==========================================
function ReferencesView() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#070b14] to-[#070b14]">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="text-center mb-8">
          <BookOpen size={48} className="mx-auto text-cyan-600 mb-4" />
          <h2 className="text-3xl md:text-5xl font-black text-cyan-400 tracking-widest">PROJECT REFERENCES</h2>
          <p className="text-cyan-700 mt-4 tracking-widest">SOURCES, INCIDENTS, AND TECHNOLOGIES USED</p>
        </div>

        <div className="bg-[#0a1120] border border-cyan-900 rounded-lg p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-cyan-600"></div>
          <h3 className="text-2xl font-black text-cyan-100 tracking-widest mb-6 flex items-center gap-3 border-b border-cyan-900 pb-4">
            <AlertTriangle className="text-yellow-500" /> CASE STUDY BIBLIOGRAPHY
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="bg-slate-900/50 p-4 border border-slate-800 rounded">
              <div className="font-bold text-cyan-300 text-lg mb-1">Regina Seaways (2018)</div>
              <div className="text-sm text-cyan-700 mb-2">Engine Cross-Contamination</div>
              <p className="text-slate-400 text-xs">Reference:Reuters & gCaptain .</p>
            </li>
            <li className="bg-slate-900/50 p-4 border border-slate-800 rounded">
              <div className="font-bold text-cyan-300 text-lg mb-1">F/V Kaltan (2026)</div>
              <div className="text-sm text-cyan-700 mb-2">Confined Space Gas Leak</div>
              <p className="text-slate-400 text-xs">Reference: ShipFinder Maritime Accidents Archive.</p>
            </li>
            <li className="bg-slate-900/50 p-4 border border-slate-800 rounded">
              <div className="font-bold text-cyan-300 text-lg mb-1">INS Ranvir (2022)</div>
              <div className="text-sm text-cyan-700 mb-2">Mislabeled Refrigerant Explosion</div>
              <p className="text-slate-400 text-xs">Reference: Hindustan Times / Indian Defense News.</p>
            </li>
            <li className="bg-slate-900/50 p-4 border border-slate-800 rounded">
              <div className="font-bold text-cyan-300 text-lg mb-1">Al-Salam Boccaccio 98</div>
              <div className="text-sm text-cyan-700 mb-2">Ro-Ro Deck Ventilation Fed Fire</div>
              <p className="text-slate-400 text-xs">Reference: Panama Maritime Authority / RoRoSAFE.</p>
            </li>
          </ul>
        </div>

        <div className="bg-[#0a1120] border border-cyan-900 rounded-lg p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          <h3 className="text-2xl font-black text-cyan-100 tracking-widest mb-6 flex items-center gap-3 border-b border-cyan-900 pb-4">
            <Code className="text-blue-500" /> DIGITAL TWIN ARCHITECTURE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center border border-slate-800 rounded hover:border-blue-500 transition-colors">
               <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center mb-4 border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Activity size={32} className="text-blue-400" />
               </div>
               <div className="font-black text-white text-xl tracking-widest mb-2">CLAUDE & GEMINI</div>
               <div className="text-xs text-blue-400 font-bold mb-2">AI LOGIC & CODE GENERATION</div>
               <p className="text-slate-400 text-[10px]">Immersive presentation sequencing generated with AI assistance.</p>
            </div>
            
            <div className="bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center border border-slate-800 rounded hover:border-sky-500 transition-colors">
               <div className="w-16 h-16 bg-sky-950 rounded-full flex items-center justify-center mb-4 border border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  <Terminal size={32} className="text-sky-400" />
               </div>
               <div className="font-black text-white text-xl tracking-widest mb-2">VS CODE</div>
               <div className="text-xs text-sky-400 font-bold mb-2">INTEGRATED DEVELOPMENT ENVIRONMENT</div>
               <p className="text-slate-400 text-[10px]">Local code editing, and project workspace management.</p>
            </div>

            <div className="bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center border border-slate-800 rounded hover:border-purple-500 transition-colors">
               <div className="w-16 h-16 bg-purple-950 rounded-full flex items-center justify-center mb-4 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
               </div>
               <div className="font-black text-white text-xl tracking-widest mb-2">GITHUB</div>
               <div className="text-xs text-purple-400 font-bold mb-2">VERSION CONTROL & REPOSITORY</div>
               <p className="text-slate-400 text-[10px]">Source code storage.</p>
            </div>

            <div className="bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center border border-slate-800 rounded hover:border-white transition-colors">
               <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" className="text-white"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
               </div>
               <div className="font-black text-white text-xl tracking-widest mb-2">VERCEL</div>
               <div className="text-xs text-slate-300 font-bold mb-2">CLOUD HOSTING & DEPLOYMENT</div>
               <p className="text-slate-400 text-[10px]">Live global network deployment.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT 1: INCIDENT ARCHIVE & QUIZ
// ==========================================
function IncidentArchive({ isFullScreen, setIsFullScreen }) {
  const [activeScenario, setActiveScenario] = useState(0); 
  const [step, setStep] = useState(0);
  const [quizState, setQuizState] = useState('hidden');
  const [wrongPath, setWrongPath] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const fireAudio = useRef(null);
  const alarmAudio = useRef(null);
  const waterAudio = useRef(null);
  const hissAudio = useRef(null);
  const boomAudio = useRef(null);
  const engineAudio = useRef(null);
  const boomPlayed = useRef(false);

  useEffect(() => {
    fireAudio.current = new Audio('https://actions.google.com/sounds/v1/ambiences/fire.ogg');
    alarmAudio.current = new Audio('https://actions.google.com/sounds/v1/alarms/spaceship_alarm.ogg');
    waterAudio.current = new Audio('https://actions.google.com/sounds/v1/water/water_rushing_stereo_series.ogg');
    hissAudio.current = new Audio('https://actions.google.com/sounds/v1/water/air_leak.ogg');
    boomAudio.current = new Audio('https://actions.google.com/sounds/v1/weapons/big_explosion_cut_off.ogg');
    engineAudio.current = new Audio('https://actions.google.com/sounds/v1/ambiences/industrial_hum.ogg');

    fireAudio.current.loop = true;
    alarmAudio.current.loop = true;
    waterAudio.current.loop = true;
    hissAudio.current.loop = true;
    engineAudio.current.loop = true;
    boomAudio.current.loop = false;

    return () => {
      fireAudio.current.pause();
      alarmAudio.current.pause();
      waterAudio.current.pause();
      hissAudio.current.pause();
      boomAudio.current.pause();
      engineAudio.current.pause();
    };
  }, []);

  useEffect(() => {
    if (!fireAudio.current || !alarmAudio.current) return;

    if (isFullScreen) {
      if (activeScenario === 0) {
        if (step < 6 || quizState === 'success') {
          engineAudio.current.volume = isMuted ? 0 : 0.5;
          engineAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          engineAudio.current.pause();
        }

        if (step >= 2 && quizState !== 'success') {
          if (!boomPlayed.current) {
             boomAudio.current.volume = isMuted ? 0 : 0.8;
             boomAudio.current.play().catch(e => console.log("Audio block"));
             boomPlayed.current = true;
          }
          fireAudio.current.volume = isMuted ? 0 : 0.6;
          fireAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          fireAudio.current.pause();
          if (step < 2) {
            boomPlayed.current = false;
            boomAudio.current.pause();
            boomAudio.current.currentTime = 0;
          }
        }
        
        if (step >= 3 && quizState !== 'success') {
          alarmAudio.current.volume = quizState === 'active' ? (isMuted ? 0 : 0.05) : (isMuted ? 0 : 0.3);
          alarmAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          alarmAudio.current.pause();
        }
      }

      if (activeScenario === 1) {
        if (step >= 2 && quizState !== 'success') {
          hissAudio.current.volume = isMuted ? 0 : 0.6;
          hissAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          hissAudio.current.pause();
        }
        if (step >= 3 && quizState !== 'success') {
          alarmAudio.current.volume = quizState === 'active' ? (isMuted ? 0 : 0.05) : (isMuted ? 0 : 0.3);
          alarmAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          alarmAudio.current.pause();
        }
      }

      if (activeScenario === 2) {
        if (step >= 6 && step < 9 && wrongPath && quizState !== 'success') {
          hissAudio.current.volume = isMuted ? 0 : 0.8;
          hissAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          hissAudio.current.pause();
        }
        if (step >= 7 && step < 9 && wrongPath && quizState !== 'success') {
          alarmAudio.current.volume = isMuted ? 0 : 0.3;
          alarmAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          alarmAudio.current.pause();
        }
        if (step >= 9 && wrongPath && quizState !== 'success') {
          if (!boomPlayed.current) {
             boomAudio.current.volume = isMuted ? 0 : 1.0;
             boomAudio.current.play().catch(e => console.log("Audio block"));
             boomPlayed.current = true;
          }
          fireAudio.current.volume = isMuted ? 0 : 0.8;
          fireAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          fireAudio.current.pause();
          if (step < 9) {
            boomPlayed.current = false;
            boomAudio.current.pause();
            boomAudio.current.currentTime = 0;
          }
        }
      }

      if (activeScenario === 3) {
        if (step >= 1 && quizState !== 'success') {
          fireAudio.current.volume = isMuted ? 0 : 0.7;
          fireAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          fireAudio.current.pause();
        }
        if (step >= 2 && quizState !== 'success') {
          alarmAudio.current.volume = quizState === 'active' ? (isMuted ? 0 : 0.05) : (isMuted ? 0 : 0.3);
          alarmAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          alarmAudio.current.pause();
        }
        if (step >= 6 && wrongPath && quizState !== 'success') {
          waterAudio.current.volume = isMuted ? 0 : 0.2; 
          waterAudio.current.play().catch(e => console.log("Audio block"));
        } else {
          waterAudio.current.pause();
        }
        
        if (step >= 8 && wrongPath && quizState !== 'success') {
          if (!boomPlayed.current) {
             boomAudio.current.volume = isMuted ? 0 : 1.0;
             boomAudio.current.play().catch(e => console.log("Audio block"));
             boomPlayed.current = true;
          }
        } else if (step < 8) {
          boomPlayed.current = false;
          boomAudio.current.pause();
          boomAudio.current.currentTime = 0;
        }
      }
      
    } else {
      fireAudio.current.pause();
      alarmAudio.current.pause();
      waterAudio.current.pause();
      hissAudio.current.pause();
      engineAudio.current.pause();
      boomAudio.current.pause();
      boomPlayed.current = false;
    }
  }, [step, isFullScreen, activeScenario, quizState, wrongPath, isMuted]);

  const scenarios = [
    {
      title: "Regina Seaways (2018)",
      subtitle: "Engine Cross-Contamination",
      compartment: "engine",
      fault: "Interconnected crankcase ventilation without isolation dampers.",
      totalSteps: 6,
      quizStep: 3,
      quizPrompt: "Starboard engine catches fire. Smoke is rising into the shared ventilation duct. Action?",
      options: [
        { text: "EMERGENCY: Manually close the cross-ventilation isolation dampers.", correct: true },
        { text: "Increase Port engine speed to outrun the smoke.", correct: false }
      ],
      logs: [
        "Vessel underway in Baltic Sea. Port and Stbd Engines operating normally.",
        "Heavy vibrations detected in the Starboard Engine block.",
        "Starboard Engine suffers a catastrophic mechanical failure. Fire breaks out.",
        "Toxic smoke rises into the shared, interconnected ventilation ducting.",
        "Smoke travels freely across the un-dampered duct toward the running Port engine.",
        "Port engine air intakes ingest thick toxic smoke and particulate matter.",
        "Port engine chokes and stalls. Blackout. PROPULSION LOST."
      ]
    },
    {
      title: "F/V Kaltan (2026)",
      subtitle: "Confined Space Gas Leak",
      compartment: "cargo",
      fault: "Refrigerant leak during repairs released massive amounts of Freon into an unventilated hold.",
      totalSteps: 7,
      quizStep: 4,
      quizPrompt: "A heavy Freon leak is detected. The gas is heavier than air. Crew members want to enter the lower deck immediately to inspect. Action?",
      options: [
        { text: "EMERGENCY: Deny entry. Evacuate area and require SCBA gear before entering confined spaces.", correct: true },
        { text: "Send them in immediately with standard coveralls to find and patch the leak fast.", correct: false }
      ],
      logs: [
        "Sep 15, 2026 - F/V Kaltan docked for repairs at Gamcheon Port, Busan, South Korea.",
        "Refrigeration plant mechanical seal fails during maintenance.",
        "Heavy Freon coolant leaks out and begins sinking into the unventilated fish hold.",
        "Pressure drop alarm sounds in the wheelhouse.",
        "Crew members rush to the lower deck entrance without protective equipment.",
        "Crew descends into the hold where Freon has displaced all oxygen.",
        "Crew members suffer immediate cardiac arrest due to asphyxiation.",
        "Emergency services arrive. CATASTROPHIC FATALITIES."
      ]
    },
    {
      title: "INS Ranvir (2022)",
      subtitle: "Mislabeled Refrigerant Explosion",
      compartment: "ac",
      fault: "System charged with R-152a (flammable) instead of R-22.",
      totalSteps: 9,
      quizStep: 4,
      quizPrompt: "Contractor is connecting a RED cylinder explicitly labeled 'R-152a'. What is your immediate action?",
      options: [
        { text: "EMERGENCY STOP: Halt operation immediately. R-152a is highly flammable.", correct: true },
        { text: "Proceed with charging. It is a standard drop-in replacement.", correct: false }
      ],
      logs: [
        "INS Ranvir docked. Forward AC Plant operating at standard capacity.",
        "Routine topping-up of R-22 refrigerant approved by Engineering Officer.",
        "Shore contractor arrives in the forward machinery room with cylinders.",
        "Contractor prepares manifold gauges. Cylinder is explicitly labeled 'R-152a'.",
        "Contractor begins attaching the high-pressure charging hose to the AC low-side valve.",
        "Cylinder valve opened. Highly flammable R-152a hydrocarbon enters the system.",
        "System pressure mismatch causes a mechanical seal failure on the compressor casing.",
        "Combustible gas begins pooling in the unventilated compartment. Toxic gas alarms sound.",
        "An automatic electrical contactor relay trips, generating a high-voltage arc spark.",
        "Ignition. Expanding gas creates a massive shockwave. HULL BREACH. CATASTROPHIC LOSS."
      ]
    },
    {
      title: "Al-Salam Boccaccio 98",
      subtitle: "Ro-Ro Deck Ventilation Fed Fire",
      compartment: "roro",
      fault: "Failure to secure forced-draft HVAC ventilation during a vehicle deck fire.",
      totalSteps: 8,
      quizStep: 3,
      quizPrompt: "A vehicle deck fire is confirmed. The massive supply and exhaust ventilation fans are currently running. What is your immediate HVAC-related action?",
      options: [
        { text: "EMERGENCY STOP all deck fans and manually close fire dampers to starve the fire of oxygen.", correct: true },
        { text: "Keep fans running on HIGH to clear the smoke so the fire team can see.", correct: false }
      ],
      logs: [
        "Ro-Ro vehicle deck fully loaded. Forced draft HVAC active at 100% capacity.",
        "Spark in a parked vehicle ignites a localized fire. Smoke begins to rise.",
        "Smoke detectors trigger on the bridge. General Alarm sounds.",
        "CRITICAL OVERSIGHT. Crew responds with hoses, but leaves the massive deck ventilation fans running.",
        "The continuous supply of fresh air acts as a bellows, feeding oxygen to the fire.",
        "Fire expands uncontrollably. Crew uses high-volume seawater firefighting monitors.",
        "Scuppers block with debris. Thousands of tons of water accumulate on the deck.",
        "Free Surface Effect shifts the center of gravity. Vessel severely destabilized.",
        "The ship capsizes and sinks. CATASTROPHIC LOSS."
      ]
    }
  ];

  const active = scenarios[activeScenario];
  const isSafe = quizState === 'success';

  const handleNextStep = () => {
    if (step === active.quizStep && quizState === 'hidden' && !wrongPath) {
      setQuizState('active');
    } else if (step < active.totalSteps) {
      setStep(s => s + 1);
    }
  };

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      setQuizState('success');
    } else {
      setQuizState('hidden');
      setWrongPath(true);
      setStep(active.quizStep + 1);
    }
  };

  const handleRetry = () => {
    setStep(active.quizStep);
    setQuizState('active');
    setWrongPath(false);
  };

  const resetScenario = (idx) => {
    setActiveScenario(idx);
    setStep(0);
    setQuizState('hidden');
    setWrongPath(false);
    setIsFullScreen(false);
  };

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#04060a] flex flex-col font-mono text-cyan-500 overflow-hidden">
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className="absolute top-6 right-6 z-[70] bg-black/70 p-4 rounded-full border border-cyan-700 text-cyan-500 hover:text-cyan-300 hover:bg-cyan-900/50 shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all">
          {isMuted ? <VolumeX size={28} className="text-red-500" /> : <Volume2 size={28} />}
        </button>

        <div className="min-h-[100px] bg-black border-b border-cyan-900 flex items-center justify-center p-6 shadow-2xl relative z-20">
          <p className="text-xl md:text-3xl font-bold text-cyan-100 text-center leading-relaxed">
            {quizState === 'success' ? "ACTION SUCCESSFUL: Hazard identified and neutralized. System secured." : active.logs[step]}
          </p>
        </div>

        <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#04060a] to-[#04060a] overflow-hidden">

          {/* SCENARIO 0: REGINA SEAWAYS */}
          {activeScenario === 0 && (
            <div className={`relative w-full max-w-6xl h-[500px] bg-slate-900 border-8 border-slate-800 rounded-lg overflow-hidden shadow-2xl`}>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(255,255,255,0.02)_40px,rgba(255,255,255,0.02)_80px)]"></div>
              <span className="absolute top-4 left-6 font-black tracking-widest text-cyan-800 text-xl z-10">MAIN ENGINE ROOM</span>

              <div className="absolute top-24 left-[300px] right-[300px] h-16 bg-slate-700 border-y-4 border-slate-500 z-10 flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                  <div className="flex w-full justify-around opacity-20">
                     <Wind size={32} className="text-white" />
                     <Wind size={32} className="text-white" />
                     <Wind size={32} className="text-white" />
                  </div>
                  {step >= 3 && !isSafe && (
                     <div className={`absolute right-0 top-0 bottom-0 bg-gray-500/90 blur-md transition-all duration-[2000ms] ease-linear z-30
                       ${step === 3 ? 'w-[30%]' : step >= 4 ? 'w-full' : 'w-0'}
                     `}></div>
                  )}
                  {isSafe && (
                     <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-red-600 border-x-4 border-red-800 z-50 flex items-center justify-center overflow-visible">
                        <span className="absolute top-full mt-2 font-black text-red-500 text-xs w-48 text-center bg-black/80 p-1 border border-red-900">DAMPER SECURED</span>
                     </div>
                  )}
              </div>

              <div className="absolute top-40 left-[320px] w-16 h-20 bg-slate-600 border-x-4 border-slate-500 z-0"></div>
              <div className="absolute top-40 right-[320px] w-16 h-20 bg-slate-600 border-x-4 border-slate-500 z-0"></div>

              <div className="absolute bottom-0 left-0 right-0 h-[260px] flex justify-between px-48 z-20">
                 <div className={`w-56 h-full border-t-8 border-x-8 rounded-t-2xl flex flex-col items-center pt-8 transition-all
                    ${step >= 6 && wrongPath ? 'bg-slate-800 border-slate-700' : 'bg-cyan-900 border-cyan-700 animate-[pulse_0.5s_infinite] shadow-[0_0_40px_rgba(8,145,178,0.3)]'}`}>
                    <Activity size={48} className={step >= 6 && wrongPath ? "text-slate-600" : "text-cyan-400"} />
                    <span className={`font-black tracking-widest mt-4 ${step >= 6 && wrongPath ? 'text-slate-500' : 'text-white'}`}>PORT ENG.</span>
                    {step >= 5 && wrongPath && (
                       <div className="absolute -top-10 w-48 h-32 bg-gray-500/80 blur-xl animate-pulse z-40 pointer-events-none"></div>
                    )}
                    {step >= 6 && wrongPath && <XCircle size={80} className="absolute top-1/2 text-red-500 drop-shadow-lg" />}
                 </div>

                 <div className={`w-56 h-full border-t-8 border-x-8 rounded-t-2xl flex flex-col items-center pt-8 transition-all
                    ${step >= 2 ? 'bg-red-950 border-red-900' : step === 1 ? 'bg-cyan-900 border-yellow-500 animate-[bounce_0.1s_infinite]' : 'bg-cyan-900 border-cyan-700 animate-[pulse_0.5s_infinite] shadow-[0_0_40px_rgba(8,145,178,0.3)]'}`}>
                    <Activity size={48} className={step >= 2 ? "text-red-500" : "text-cyan-400"} />
                    <span className="font-black tracking-widest mt-4 text-white">STBD ENG.</span>
                    {step >= 2 && <Flame size={120} className="absolute top-10 text-orange-500 animate-bounce drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />}
                 </div>
              </div>

              {step >= 6 && wrongPath && (
                 <div className="absolute inset-0 bg-black/80 z-[60] flex items-center justify-center transition-all duration-[2000ms]">
                 </div>
              )}
            </div>
          )}

          {/* SCENARIO 1: F/V KALTAN */}
          {activeScenario === 1 && (
            <div className={`relative w-full max-w-5xl h-[500px] transition-transform duration-[3000ms] ease-in-out`}>
              <div className="absolute bottom-[-200px] left-[-100vw] right-[-100vw] h-[350px] bg-blue-950/60 border-t-2 border-blue-800 -z-10 shadow-[0_-20px_50px_rgba(30,58,138,0.2)]"></div>
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-slate-800 rounded-bl-[150px] rounded-br-[60px] border-b-8 border-red-900 flex flex-col shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-12 w-48 h-24 bg-slate-700 border-l-4 border-b-4 border-slate-600 flex flex-col justify-end p-2 z-20 shadow-lg">
                   <span className="text-xs text-cyan-400 font-bold mb-auto tracking-widest">WHEELHOUSE</span>
                   <div className="flex gap-2">
                     <div className="w-8 h-8 bg-cyan-900/50"></div>
                     <div className="w-8 h-8 bg-cyan-900/50"></div>
                   </div>
                   {step >= 3 && !isSafe && <AlertTriangle className="absolute top-2 right-2 text-red-500 animate-pulse" size={24}/>}
                </div>
                <div className="absolute top-24 left-0 right-0 h-20 border-b-4 border-slate-700 flex items-end px-12 z-20 bg-slate-800/80">
                   <div className={`w-28 h-16 border-2 flex items-center justify-center relative bg-slate-900 transition-all ${step >= 1 && !isSafe ? 'animate-[bounce_0.2s_infinite] border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'border-cyan-800'}`}>
                      <Activity className={step >= 1 && !isSafe ? "text-orange-500" : "text-cyan-600"}/>
                      <span className="absolute -top-6 text-[10px] font-bold text-cyan-500 tracking-widest">FREON COMP.</span>
                   </div>
                   <div className={`absolute bottom-0 transition-all duration-[1500ms] ease-linear z-30 
                      ${step < 4 ? 'right-[-100px]' : isSafe ? 'right-[450px]' : step === 4 ? 'right-[250px]' : 'right-[250px] opacity-0'}`}>
                      <div className="flex flex-col items-center">
                         <User size={64} className={isSafe ? "text-green-400" : "text-yellow-500 drop-shadow-lg"} />
                         {isSafe && <div className="bg-green-900 text-green-300 text-[10px] font-black px-2 py-1 rounded absolute -bottom-4 tracking-widest border border-green-500">SCBA EQUIPPED</div>}
                      </div>
                   </div>
                </div>
                <div className="absolute top-44 bottom-0 left-0 right-0 bg-slate-900 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,1)] z-10">
                   <span className="absolute top-2 left-12 text-xs text-cyan-700 font-bold tracking-widest z-50">UNVENTILATED FISH HOLD</span>
                   <div className="absolute bottom-4 left-24 w-24 h-16 border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-blue-900/50 z-20 shadow-lg"><Snowflake size={32}/></div>
                   <div className="absolute bottom-4 left-52 w-24 h-16 border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-blue-900/50 z-20 shadow-lg"><Snowflake size={32}/></div>
                   <div className={`absolute transition-all duration-[2000ms] ease-linear z-30 
                      ${step < 5 || isSafe ? 'top-[-100px] right-[250px] opacity-0' : step === 5 ? 'top-[10px] right-[250px] opacity-100' : 'top-[40px] right-[250px] opacity-100 rotate-90'}`}>
                      <div className="flex flex-col items-center">
                         {step >= 6 ? <Skull size={64} className="text-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" /> : <User size={64} className="text-yellow-500" />}
                      </div>
                   </div>
                   {step >= 2 && !isSafe && (
                      <div className="absolute left-0 right-0 top-0 bg-green-500/60 blur-md transition-all duration-[3000ms] ease-in-out z-40 pointer-events-none"
                           style={{ height: step === 2 ? '30%' : step === 3 ? '70%' : '100%' }}>
                      </div>
                   )}
                </div>
              </div>
            </div>
          )}

          {/* SCENARIO 2: INS RANVIR */}
          {activeScenario === 2 && (
            <div className={`relative w-full max-w-6xl h-[500px] transition-transform duration-[3000ms] ease-in-out ${step >= 9 && wrongPath ? 'rotate-[-10deg] translate-y-32 translate-x-12' : ''}`}>
              <div className="absolute bottom-[-200px] left-[-100vw] right-[-100vw] h-[350px] bg-blue-950/60 border-t-2 border-blue-800 -z-10 shadow-[0_-20px_50px_rgba(30,58,138,0.2)]"></div>
              <div className="absolute bottom-20 left-10 right-10 h-64 bg-slate-600 rounded-bl-[150px] rounded-br-[40px] border-b-8 border-red-950 flex flex-col shadow-2xl">
                <div className="absolute -top-10 left-32 w-16 h-10 bg-slate-700 rounded-tl-full">
                  <div className="absolute top-2 -left-24 w-28 h-2 bg-slate-800 rounded-full"></div>
                </div>
                <div className="absolute -top-32 right-64 w-40 h-32 bg-slate-700 rounded-t-xl border-t-4 border-slate-500 flex flex-col items-center justify-start pt-2">
                   <div className="w-1 h-16 bg-slate-800 absolute -top-16"></div>
                   <div className="w-24 h-2 bg-slate-800 absolute -top-16 animate-spin" style={{ animationDuration: '2s' }}></div>
                   <div className="flex gap-4 mt-8">
                     <div className="w-6 h-6 bg-cyan-900/50"></div>
                     <div className="w-6 h-6 bg-cyan-900/50"></div>
                   </div>
                </div>

                <div className="absolute bottom-6 left-12 right-12 h-48 bg-slate-900 border-4 border-slate-800 rounded-lg flex relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                  <span className="absolute top-2 left-4 text-xs font-black tracking-widest text-cyan-700 z-40">FORWARD MACHINERY RM.</span>
                  
                  <div className={`absolute left-8 bottom-0 w-48 h-36 border-4 bg-cyan-950 flex flex-col items-center justify-center z-20 ${step >= 6 && wrongPath ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)]' : 'border-cyan-800'}`}>
                    <Thermometer size={48} className={step >= 6 && wrongPath ? "text-red-500" : "text-cyan-500"} />
                    <span className={`font-black tracking-widest text-xs mt-2 ${step >= 6 && wrongPath ? "text-red-400 animate-pulse" : "text-cyan-300"}`}>CHILLER</span>
                    {step === 8 && wrongPath && <Zap size={80} className="text-yellow-400 absolute -top-12 -right-4 animate-ping" />}
                  </div>

                  <div className={`absolute bottom-0 transition-all duration-1000 ease-linear z-30 ${step < 2 ? 'left-full' : step < 4 ? 'left-1/2' : 'left-56'}`}>
                    <div className="flex flex-col items-center">
                       <User size={80} className="text-yellow-500 drop-shadow-lg" />
                       <div className="bg-red-600 border-4 border-red-800 w-12 h-20 mt-1 flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                          <span className="text-white font-black rotate-90 text-[10px] tracking-widest">R-152A</span>
                       </div>
                       {isSafe && <div className="absolute -top-12 text-red-400 font-bold bg-black/90 px-4 py-1 rounded border border-red-400 text-sm z-50">INTERCEPTED</div>}
                    </div>
                  </div>

                  {step >= 5 && !isSafe && (
                     <div className="absolute bottom-12 left-52 w-12 h-2 bg-yellow-600 border-y border-yellow-800 z-10 origin-left"></div>
                  )}

                  {step >= 6 && wrongPath && step < 9 && (
                     <div className="absolute left-32 bottom-0 w-64 h-32 bg-red-500/40 rounded-full blur-2xl animate-pulse z-40 pointer-events-none"></div>
                  )}
                  
                  {step >= 9 && wrongPath && (
                     <div className="absolute inset-0 bg-orange-500/80 z-50 mix-blend-color-dodge animate-pulse"></div>
                  )}
                </div>

                {step >= 9 && wrongPath && (
                  <div className="absolute top-1/2 left-1/3 z-[60] flex items-center justify-center mix-blend-screen -translate-y-1/2 pointer-events-none">
                     <div className="w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,69,0,0.8)_25%,transparent_65%)] animate-[ping_0.5s_ease-out_forwards] flex items-center justify-center">
                        <AlertOctagon size={250} className="text-white scale-150 animate-bounce" />
                     </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCENARIO 3: AL-SALAM BOCCACCIO 98 */}
          {activeScenario === 3 && (
            <div className={`relative w-full max-w-5xl h-[450px] transition-transform duration-[4000ms] ease-in-out ${step >= 8 && wrongPath ? 'rotate-[-95deg] translate-y-64 translate-x-32' : ''}`}>
              <div className="absolute bottom-[-200px] left-[-100vw] right-[-100vw] h-[350px] bg-blue-950/60 border-t-2 border-blue-800 -z-10 shadow-[0_-20px_50px_rgba(30,58,138,0.2)]"></div>
              <div className="absolute bottom-20 left-10 right-10 h-56 bg-slate-800 rounded-bl-[100px] rounded-br-[40px] border-b-[12px] border-red-900 flex flex-col shadow-2xl">
                <div className="absolute bottom-full left-4 right-16 h-28 bg-slate-200 rounded-t-2xl border-x-4 border-t-4 border-slate-300 flex flex-col justify-evenly px-4 py-2 z-10">
                   <div className="absolute -top-20 left-1/3 w-24 h-20 bg-blue-800 rounded-t-lg border-2 border-blue-900 flex flex-col items-center overflow-hidden z-0">
                      <div className="w-full h-6 bg-black"></div>
                      <div className="w-full h-4 bg-yellow-500 mt-2"></div>
                   </div>
                   <div className="flex justify-between px-8 z-10">
                      {Array.from({length: 16}).map((_, i) => <div key={i} className="w-6 h-6 bg-cyan-950 rounded-sm border border-cyan-800 shadow-[inset_0_0_5px_rgba(0,0,0,0.8)]"></div>)}
                   </div>
                   <div className="flex justify-between px-12 z-10 mt-2">
                      {Array.from({length: 12}).map((_, i) => <div key={i} className="w-8 h-4 bg-cyan-950 rounded-full border border-cyan-800"></div>)}
                   </div>
                   <div className="absolute top-2 -right-4 w-12 h-14 bg-slate-100 rounded-r-xl border-y-2 border-r-2 border-slate-300 flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8 bg-cyan-950/80 rounded-r-lg"></div>
                   </div>
                </div>
                <div className="absolute bottom-4 -left-2 w-4 h-32 bg-slate-700 rounded-sm border-2 border-slate-600 origin-bottom"></div>

                <div className="flex flex-1 relative px-8 py-4 mt-2">
                  <div className="w-32 h-full border-r-4 border-slate-700 flex flex-col items-center justify-center relative z-20 bg-slate-900/80 rounded-l-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    <span className="text-xs text-cyan-700 mb-2 font-bold tracking-widest">SUPPLY</span>
                    <Wind size={64} className={!isSafe ? "text-green-500 animate-spin" : "text-slate-600"} style={{ animationDuration: '0.8s' }} />
                    {!isSafe && <div className="absolute right-[-30px] top-1/2 text-green-400 font-bold animate-pulse text-3xl">»</div>}
                  </div>
                  <div className="flex-1 relative flex items-end justify-center gap-12 pb-2 z-20">
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 font-black tracking-widest text-slate-500 text-sm">VEHICLE DECK</span>
                    <div className="w-40 h-20 border-2 border-slate-500 bg-slate-600 rounded-t-xl relative flex items-end z-20">
                      <div className="w-8 h-8 bg-slate-900 rounded-full absolute -bottom-4 left-2"></div>
                      <div className="w-8 h-8 bg-slate-900 rounded-full absolute -bottom-4 right-2"></div>
                      {step >= 5 && wrongPath && <Flame size={80} className="text-orange-500 absolute -top-16 left-4 animate-bounce" />}
                    </div>
                    <div className="w-40 h-20 border-2 border-slate-400 bg-slate-500 rounded-t-xl relative flex items-end z-20">
                      <div className="w-8 h-8 bg-slate-900 rounded-full absolute -bottom-4 left-2"></div>
                      <div className="w-8 h-8 bg-slate-900 rounded-full absolute -bottom-4 right-2"></div>
                      {step >= 1 && !isSafe && <Flame size={step >= 4 ? 120 : 64} className={`text-orange-500 absolute ${step >= 4 ? '-top-20 -left-4' : '-top-12 left-8'} animate-bounce transition-all duration-1000`} />}
                      {step >= 2 && !isSafe && <Wind size={step >= 4 ? 90 : 40} className={`text-gray-400 absolute ${step >= 4 ? '-top-32 left-8' : '-top-20 left-12'} animate-pulse`} />}
                      {isSafe && <div className="absolute -top-12 left-4 text-cyan-400 font-bold bg-black/80 px-4 py-1 rounded border border-cyan-400">EXTINGUISHED</div>}
                    </div>
                    <div className="w-40 h-20 border-2 border-slate-500 bg-slate-600 rounded-t-xl relative flex items-end z-20">
                      <div className="w-8 h-8 bg-slate-900 rounded-full absolute -bottom-4 left-2"></div>
                      <div className="w-8 h-8 bg-slate-900 rounded-full absolute -bottom-4 right-2"></div>
                      {step >= 5 && wrongPath && <Flame size={80} className="text-orange-500 absolute -top-16 left-4 animate-bounce" />}
                    </div>
                    {step >= 6 && wrongPath && (
                      <div className={`absolute bottom-0 left-0 right-0 bg-blue-500/70 z-30 transition-all duration-[2000ms] ease-in flex items-center justify-center ${step >= 7 ? 'h-3/4' : 'h-1/4'}`}>
                        <span className="text-white font-bold tracking-widest text-2xl animate-pulse bg-black/50 px-4 py-1 rounded">FREE SURFACE ACCUMULATION</span>
                      </div>
                    )}
                  </div>
                  <div className="w-32 h-full border-l-4 border-slate-700 flex flex-col items-center justify-center relative z-20 bg-slate-900/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                    <span className="text-xs text-cyan-700 mb-2 font-bold tracking-widest">EXHAUST</span>
                    <Wind size={64} className={!isSafe ? "text-green-500 animate-spin" : "text-slate-600"} style={{ animationDuration: '0.8s' }} />
                    {!isSafe && <div className="absolute left-[-30px] top-1/2 text-green-400 font-bold animate-pulse text-3xl">»</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QUIZ OVERLAY */}
          {quizState === 'active' && (
            <div className="absolute inset-0 bg-black/95 flex items-center justify-center p-8 z-40 backdrop-blur-md">
              <div className="bg-slate-900 border-2 border-yellow-500 p-12 rounded-xl max-w-4xl text-center shadow-[0_0_80px_rgba(234,179,8,0.3)]">
                <AlertOctagon size={64} className="text-yellow-500 mx-auto mb-6 animate-pulse" />
                <h3 className="text-yellow-400 text-4xl font-black mb-8 tracking-widest">CRITICAL DECISION</h3>
                <p className="text-white text-2xl mb-12 leading-relaxed">{active.quizPrompt}</p>
                <div className="grid grid-cols-1 gap-6">
                  {active.options.map((opt, i) => (
                    <button key={i} onClick={() => handleQuizAnswer(opt.correct)}
                      className="p-6 border-2 border-cyan-700 hover:bg-cyan-900 hover:border-cyan-400 text-cyan-100 text-left transition-all text-xl font-bold rounded">
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC OUTCOME OVERLAYS */}
          {wrongPath && step >= active.totalSteps && (
            <div className="absolute inset-0 border-8 border-red-500/50 animate-pulse bg-red-900/40 flex flex-col items-center justify-center z-[70] pointer-events-none">
              {activeScenario !== 0 && <Skull size={80} className="text-red-500 mb-4 animate-bounce" />}
              <h2 className="text-red-500 text-5xl font-black tracking-widest drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
                {activeScenario === 1 ? 'CATASTROPHIC FATALITIES' : activeScenario === 0 ? 'PROPULSION LOST' : 'VESSEL LOST'}
              </h2>
            </div>
          )}
          {quizState === 'success' && (
            <div className="absolute inset-0 border-8 border-green-500/50 bg-green-900/20 flex flex-col items-center justify-center z-[70] pointer-events-none">
              <CheckCircle2 size={80} className="text-green-400 mb-4" />
              <h2 className="text-green-400 text-4xl font-black tracking-widest">INCIDENT PREVENTED</h2>
            </div>
          )}
        </div>

        {/* FOOTER CONTROLS */}
        <div className="min-h-[100px] bg-black border-t border-cyan-900 flex items-center justify-between px-4 md:px-12 relative z-[80]">
          <button onClick={() => setIsFullScreen(false)} className="text-cyan-600 hover:text-cyan-400 font-bold tracking-widest flex items-center gap-2 md:gap-3 text-sm md:text-lg transition-colors">
            <XCircle size={24} /> EXIT
          </button>

          {quizState === 'success' ? (
            <button onClick={() => setIsFullScreen(false)} className="bg-green-600 text-black px-4 md:px-10 py-3 md:py-5 font-black tracking-widest text-sm md:text-xl rounded hover:bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all">
              MISSION ACCOMPLISHED
            </button>
          ) : (step >= active.totalSteps && wrongPath) ? (
            <button onClick={handleRetry} className="bg-yellow-600 text-black px-4 md:px-10 py-3 md:py-5 font-black tracking-widest text-sm md:text-xl rounded hover:bg-yellow-500 flex items-center gap-2 md:gap-3 shadow-[0_0_30px_rgba(202,138,4,0.4)] transition-all transform hover:scale-105">
              <AlertTriangle size={24} /> RE-EVALUATE
            </button>
          ) : (
            <button onClick={handleNextStep} disabled={quizState === 'active'} className="bg-cyan-600 text-black px-6 md:px-12 py-3 md:py-5 font-black tracking-widest text-sm md:text-xl rounded hover:bg-cyan-500 disabled:opacity-30 transition-all flex items-center gap-2 md:gap-3">
              NEXT PHASE <PlayCircle size={24} />
            </button>
          )}
        </div>

      </div>
    );
  }

  // STANDARD DASHBOARD VIEW
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 md:p-6 h-full">
      <div className="col-span-1 flex flex-col gap-4">
        <div className="bg-slate-900/50 border border-cyan-900 p-4 rounded">
          <h2 className="text-cyan-400 font-bold mb-4">INCIDENT DATABASE</h2>
          {scenarios.map((scen, idx) => (
            <button key={idx} onClick={() => resetScenario(idx)}
              className={`w-full text-left p-3 mb-2 text-sm border-l-4 transition-all ${activeScenario === idx ? 'bg-cyan-900/40 border-cyan-400 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'border-transparent text-cyan-700 hover:bg-slate-800'}`}>
              <div className="font-bold">{scen.title}</div>
              <div className="text-xs opacity-70">{scen.subtitle}</div>
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-cyan-900 p-4 rounded flex-1">
          <h3 className="text-cyan-600 font-bold mb-2 border-b border-cyan-900 pb-1 text-sm">ROOT CAUSE</h3>
          <p className="text-cyan-100 mt-2 text-sm leading-relaxed">
            <span className="text-red-400 font-bold mr-2">&gt; FAULT:</span>
            {active.fault}
          </p>
        </div>

        <button
          onClick={() => setIsFullScreen(true)}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-black text-lg p-5 rounded flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:scale-[1.02]">
          LAUNCH DIGITAL TWIN
        </button>
      </div>

      <div className="col-span-1 lg:col-span-3 flex flex-col items-center justify-center bg-black border border-cyan-900 rounded p-12 text-center shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
        <Activity size={80} className="text-cyan-900 mb-6 animate-pulse" />
        <h2 className="text-3xl font-black text-cyan-700 tracking-widest mb-4">SYSTEM STANDBY</h2>
        <p className="text-cyan-800 max-w-lg">Select an incident from the database and launch the digital twin to begin the interactive sequence.</p>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT 2: FULL SYSTEM SIMULATION
// ==========================================
function FullSystemSimulator() {
  const [simView, setSimView] = useState('refrigeration');

  const [ambientTemp, setAmbientTemp] = useState(21);
  const [seaTemp, setSeaTemp] = useState(28);

  const [freshAirMix, setFreshAirMix] = useState(30);
  const [preHeatValve, setPreHeatValve] = useState(0);
  const [coolerValve, setCoolerValve] = useState(60);
  const [humidifierValve, setHumidifierValve] = useState(20);
  const [fanSpeed, setFanSpeed] = useState(100);

  const [compSpeed, setCompSpeed] = useState(100);
  const [isTripped, setIsTripped] = useState(false);

  const tripLimit = 28.5;
  const activeLoad = simView === 'refrigeration' ? compSpeed : coolerValve;
  const condenserPress = Math.max(4.0, 10 + ((seaTemp - 20) * 0.8) + (activeLoad * 0.05));

  const actualCompEffect = isTripped ? 0 : compSpeed / 100;
  const meatTemp = ambientTemp - ((ambientTemp - -25) * actualCompEffect);
  const vegTemp = ambientTemp - ((ambientTemp - 4) * actualCompEffect);
  const dairyTemp = ambientTemp - ((ambientTemp - 4) * actualCompEffect);

  const returnAirTemp = 24;
  const mixedAirTemp = ((freshAirMix / 100) * ambientTemp) + (((100 - freshAirMix) / 100) * returnAirTemp);
  const heatingEffect = (preHeatValve / 100) * 20;

  const maxCoolingDelta = Math.max(0, 25 - ((seaTemp - 20) * 0.5));
  const coolingEffect = isTripped ? 0 : (coolerValve / 100) * maxCoolingDelta;

  const offCoilTemp = mixedAirTemp + heatingEffect - coolingEffect;
  const cabinTemp = offCoilTemp + 4 + ((100 - fanSpeed) * 0.05);
  const cabinHumidity = 40 + (humidifierValve / 100 * 40) - (coolerValve / 100 * 15);

  const alarms = [];
  if (isTripped) alarms.push("HIGH PRESS TRIP");
  if (!isTripped && offCoilTemp < 10 && coolerValve > 0) alarms.push("COIL FROST RISK");
  if (!isTripped && cabinTemp > 28) alarms.push("HIGH CABIN TEMP");
  if (!isTripped && ambientTemp > 45 && freshAirMix > 50) alarms.push("HIGH AMBIENT LOAD");
  if (!isTripped && ambientTemp <= 0) alarms.push("FREEZING AMBIENT TEMP");

  useEffect(() => {
    if (condenserPress > tripLimit && !isTripped) {
      setIsTripped(true);
    } else if (condenserPress < tripLimit - 2 && isTripped) {
      setIsTripped(false);
    }
  }, [condenserPress, tripLimit, isTripped]);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 h-full">
      <div className="col-span-1 lg:col-span-3 bg-[#0a1120] border border-cyan-900 p-6 rounded overflow-y-auto shadow-lg flex flex-col gap-6">

        <div className="flex gap-2">
          <button onClick={() => setSimView('refrigeration')} className={`flex-1 py-2 text-[10px] font-bold border ${simView === 'refrigeration' ? 'bg-cyan-900 border-cyan-400 text-cyan-100' : 'border-cyan-900 text-cyan-700'}`}>REFRIGERATION</button>
          <button onClick={() => setSimView('ahu')} className={`flex-1 py-2 text-[10px] font-bold border ${simView === 'ahu' ? 'bg-cyan-900 border-cyan-400 text-cyan-100' : 'border-cyan-900 text-cyan-700'}`}>AHU</button>
        </div>

        <div>
          <h2 className="text-cyan-400 font-bold mb-4 border-b border-cyan-900 pb-2 flex items-center gap-2"><Wind size={16} /> ENVIRONMENTAL</h2>
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-2"><span>Ambient Air Temp</span><span className="text-white">{ambientTemp}°C</span></div>
            <input type="range" min="-30" max="50" value={ambientTemp} onChange={(e) => setAmbientTemp(Number(e.target.value))} className="w-full accent-cyan-500" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2"><span>Sea Water Temp</span><span className="text-white">{seaTemp}°C</span></div>
            <input type="range" min="-5" max="40" value={seaTemp} onChange={(e) => setSeaTemp(Number(e.target.value))} className="w-full accent-cyan-500" />
          </div>
        </div>

        {simView === 'refrigeration' ? (
          <div>
            <h2 className="text-cyan-400 font-bold mb-4 border-b border-cyan-900 pb-2 flex items-center gap-2"><Activity size={16} /> PLANT CONTROLS</h2>
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-2"><span>Compressor Load</span><span className="text-white">{compSpeed}%</span></div>
              <input type="range" min="0" max="100" value={compSpeed} onChange={(e) => setCompSpeed(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-cyan-400 font-bold mb-4 border-b border-cyan-900 pb-2 flex items-center gap-2"><Wind size={16} /> AHU CONTROLS</h2>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2"><span>Fresh Air Damper</span><span className="text-white">{freshAirMix}%</span></div>
              <input type="range" min="0" max="100" value={freshAirMix} onChange={(e) => setFreshAirMix(Number(e.target.value))} className="w-full accent-green-500" />
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2"><span>Pre-Heater Valve</span><span className="text-red-400">{preHeatValve}%</span></div>
              <input type="range" min="0" max="100" value={preHeatValve} onChange={(e) => setPreHeatValve(Number(e.target.value))} className="w-full accent-red-500" />
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2"><span>Cooler Chilled Valve</span><span className="text-blue-400">{coolerValve}%</span></div>
              <input type="range" min="0" max="100" value={coolerValve} onChange={(e) => setCoolerValve(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2"><span>Humidifier Steam</span><span className="text-gray-300">{humidifierValve}%</span></div>
              <input type="range" min="0" max="100" value={humidifierValve} onChange={(e) => setHumidifierValve(Number(e.target.value))} className="w-full accent-gray-400" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2"><span>Supply Fan Speed</span><span className="text-white">{fanSpeed}%</span></div>
              <input type="range" min="0" max="100" value={fanSpeed} onChange={(e) => setFanSpeed(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>
          </div>
        )}
      </div>

      <div className="col-span-1 lg:col-span-9 flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-4 h-24">
          {simView === 'refrigeration' ? (
            <>
              <div className="bg-[#0a1120] border border-cyan-900 p-4 rounded flex flex-col justify-center items-center">
                <div className="text-xs text-cyan-600 mb-1">CONDENSER PRESS</div>
                <div className={`text-3xl font-black ${condenserPress > 25 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>{condenserPress.toFixed(1)} Bar</div>
              </div>
              <div className="bg-[#0a1120] border border-cyan-900 p-4 rounded flex flex-col justify-center items-center">
                <div className="text-xs text-cyan-600 mb-1">MEAT ROOM TEMP</div>
                <div className={`text-3xl font-black ${meatTemp > -15 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>{meatTemp.toFixed(1)}°C</div>
              </div>
              <div className="bg-[#0a1120] border border-cyan-900 p-4 rounded flex flex-col justify-center items-center">
                <div className="text-xs text-cyan-600 mb-1">VEG ROOM TEMP</div>
                <div className={`text-3xl font-black ${vegTemp > 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>{vegTemp.toFixed(1)}°C</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#0a1120] border border-cyan-900 p-4 rounded flex flex-col justify-center items-center">
                <div className="text-xs text-cyan-600 mb-1">OFF-COIL TEMP</div>
                <div className={`text-3xl font-black ${offCoilTemp < 10 ? 'text-blue-500 animate-pulse' : 'text-cyan-400'}`}>{offCoilTemp.toFixed(1)}°C</div>
              </div>
              <div className="bg-[#0a1120] border border-cyan-900 p-4 rounded flex flex-col justify-center items-center">
                <div className="text-xs text-cyan-600 mb-1">CABIN TEMP</div>
                <div className={`text-3xl font-black ${cabinTemp > 26 ? 'text-orange-400' : cabinTemp < 19 ? 'text-blue-400' : 'text-green-400'}`}>{cabinTemp.toFixed(1)}°C</div>
              </div>
              <div className="bg-[#0a1120] border border-cyan-900 p-4 rounded flex flex-col justify-center items-center">
                <div className="text-xs text-cyan-600 mb-1">CABIN HUMIDITY</div>
                <div className="text-3xl font-black text-blue-300">{cabinHumidity.toFixed(0)}%</div>
              </div>
            </>
          )}

          <div className={`border p-4 rounded flex flex-col items-center justify-center font-bold tracking-wider ${alarms.length > 0 ? (isTripped ? 'bg-red-950/50 border-red-500 text-red-500' : (alarms[0] === 'FREEZING AMBIENT TEMP' ? 'bg-blue-950/50 border-blue-500 text-blue-400' : 'bg-orange-950/50 border-orange-500 text-orange-500')) : 'bg-green-950/20 border-green-800 text-green-500'}`}>
            {alarms.length === 0 ? (
              <><CheckCircle2 className="mb-1" size={24} /> SYSTEM HEALTHY</>
            ) : (
              <>
                {isTripped ? <XCircle className="mb-1 animate-pulse" size={24} /> : <AlertTriangle className="mb-1 animate-pulse" size={24} />}
                <span className="text-sm animate-pulse">{alarms[0]}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 bg-[#050810] border border-cyan-900 rounded p-8 relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)] flex flex-col">
          <h3 className="text-cyan-600 font-bold text-sm tracking-widest absolute top-6 left-6">
            {simView === 'refrigeration' ? 'PROVISION REFRIGERATION PLANT SCHEMA' : 'AC AIR HANDLING UNIT (AHU) SCHEMA'}
          </h3>

          {simView === 'refrigeration' ? (
            <div className="flex-1 flex flex-col gap-8 mt-12 justify-center px-4">
              <div className="flex gap-6 w-full h-32 relative z-10">
                <div className={`flex-1 border-2 bg-blue-950/30 rounded flex flex-col items-center justify-center relative shadow-lg transition-colors ${meatTemp > -15 ? 'border-red-500/50' : 'border-cyan-800'}`}>
                  <Snowflake className={`absolute top-2 left-2 ${meatTemp > -15 ? 'text-red-500/30' : 'text-blue-500/30'}`} size={20} />
                  <span className="text-xs text-cyan-500 font-bold mb-2">MEAT/FISH ROOM</span>
                  <span className={`text-2xl font-black ${meatTemp > -15 ? 'text-red-400 animate-pulse' : 'text-blue-300'}`}>{meatTemp.toFixed(1)}°C</span>
                  <span className="text-[10px] text-cyan-700 mt-1 font-bold">TARGET: -25°C</span>
                </div>
                <div className={`flex-1 border-2 bg-blue-950/30 rounded flex flex-col items-center justify-center relative shadow-lg transition-colors ${vegTemp > 10 ? 'border-red-500/50' : 'border-cyan-800'}`}>
                  <Snowflake className={`absolute top-2 left-2 ${vegTemp > 10 ? 'text-red-500/30' : 'text-blue-500/30'}`} size={20} />
                  <span className="text-xs text-cyan-500 font-bold mb-2">VEGETABLES</span>
                  <span className={`text-2xl font-black ${vegTemp > 10 ? 'text-red-400 animate-pulse' : 'text-green-300'}`}>{vegTemp.toFixed(1)}°C</span>
                  <span className="text-[10px] text-cyan-700 mt-1 font-bold">TARGET: +4°C</span>
                </div>
                <div className={`flex-1 border-2 bg-blue-950/30 rounded flex flex-col items-center justify-center relative shadow-lg transition-colors ${dairyTemp > 10 ? 'border-red-500/50' : 'border-cyan-800'}`}>
                  <Snowflake className={`absolute top-2 left-2 ${dairyTemp > 10 ? 'text-red-500/30' : 'text-blue-500/30'}`} size={20} />
                  <span className="text-xs text-cyan-500 font-bold mb-2">DAIRY / PROVISIONS</span>
                  <span className={`text-2xl font-black ${dairyTemp > 10 ? 'text-red-400 animate-pulse' : 'text-yellow-300'}`}>{dairyTemp.toFixed(1)}°C</span>
                  <span className="text-[10px] text-cyan-700 mt-1 font-bold">TARGET: +4°C</span>
                </div>
              </div>

              <div className="w-full h-8 relative">
                <div className="absolute top-1/2 left-[15%] right-[15%] h-1 bg-blue-500 -translate-y-1/2"></div>
                <div className="absolute bottom-1/2 left-[16%] w-1 h-8 bg-blue-500"></div>
                <div className="absolute bottom-1/2 left-[50%] w-1 h-8 bg-blue-500 -translate-x-1/2"></div>
                <div className="absolute bottom-1/2 right-[16%] w-1 h-8 bg-blue-500"></div>
              </div>

              <div className="flex h-32 gap-8 relative w-full items-center px-12">
                <div className="absolute top-1/2 left-[15%] w-[30%] h-2 bg-blue-500 -translate-y-1/2 -z-10"></div>
                <div className="absolute top-1/2 right-[15%] w-[35%] h-2 bg-red-500 -translate-y-1/2 -z-10"></div>
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-center">
                  <div className={`w-28 h-28 rounded-full border-4 border-cyan-600 bg-[#0a1120] flex items-center justify-center z-10 ${compSpeed > 0 && !isTripped ? 'shadow-[0_0_30px_rgba(8,145,178,0.4)]' : ''}`}>
                    <span className="text-lg font-black tracking-widest text-cyan-400">COMP</span>
                  </div>
                </div>
                <div className="flex-1 border-2 border-red-900 bg-red-950/20 rounded flex flex-col items-center justify-center h-full shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                  <div className="text-xs text-red-400 font-bold mb-2 tracking-widest">CONDENSER</div>
                  <span className="text-[10px] text-red-700 mb-2">(SEA WATER COOLED)</span>
                  <span className={`text-2xl font-black ${condenserPress > 25 ? 'text-red-500 animate-pulse' : 'text-red-400'}`}>{condenserPress.toFixed(1)} Bar</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-between mt-8">
              <div className="flex flex-col justify-between h-48 w-32 text-xs text-cyan-600 font-bold text-right pr-6">
                <div className="flex items-center justify-end gap-2"><Wind size={16} /> FRESH {freshAirMix}%</div>
                <div className="flex items-center justify-end gap-2"><Wind size={16} /> RECIRC {100 - freshAirMix}%</div>
              </div>

              <div className="flex-1 h-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_15px,rgba(14,116,144,0.05)_15px,rgba(14,116,144,0.05)_30px)] border-t-2 border-b-2 border-dashed border-cyan-800 flex items-center justify-around relative px-4">
                <div className="absolute -top-8 left-4 text-xs font-bold text-cyan-500 bg-[#050810] px-2">MIXED AIR: {mixedAirTemp.toFixed(1)}°C</div>

                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-cyan-600 font-bold">FILTER</div>
                  <div className="w-16 h-28 border-2 border-cyan-800 bg-cyan-950/50 flex flex-col justify-evenly px-2 shadow-lg">
                    <div className="h-px bg-cyan-700"></div><div className="h-px bg-cyan-700"></div><div className="h-px bg-cyan-700"></div><div className="h-px bg-cyan-700"></div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-cyan-600 font-bold">PRE-HEAT</div>
                  <div className={`w-16 h-28 border-2 flex items-center justify-center transition-all ${preHeatValve > 0 ? 'border-red-500 bg-red-950/40 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-cyan-900 bg-black'}`}>
                    <Flame size={28} className={preHeatValve > 0 ? 'text-red-500 animate-pulse' : 'text-cyan-900'} />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-cyan-600 font-bold">COOLER COIL</div>
                  <div className={`w-20 h-28 border-2 flex flex-col items-center justify-center transition-all ${coolerValve > 0 && !isTripped ? 'border-blue-500 bg-blue-950/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-cyan-900 bg-black'}`}>
                    <Thermometer size={28} className={coolerValve > 0 && !isTripped ? (offCoilTemp < 10 ? 'text-blue-300 animate-pulse' : 'text-blue-500') : 'text-cyan-900'} />
                    {isTripped && <span className="text-[10px] text-red-500 mt-2 font-black tracking-widest bg-red-950 px-1 rounded">TRIPPED</span>}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-cyan-600 font-bold">HUMIDIFIER</div>
                  <div className={`w-16 h-28 border-2 flex items-center justify-center transition-all ${humidifierValve > 0 ? 'border-gray-400 bg-gray-800/40 shadow-[0_0_20px_rgba(156,163,175,0.2)]' : 'border-cyan-900 bg-black'}`}>
                    <Droplets size={28} className={humidifierValve > 0 ? 'text-gray-300' : 'text-cyan-900'} />
                  </div>
                </div>
              </div>

              <div className="w-24 flex justify-center -ml-6 z-10">
                <div className={`w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center bg-[#070b14] ${fanSpeed > 0 ? 'shadow-[0_0_25px_rgba(34,197,94,0.5)]' : ''}`}>
                  <Wind size={32} className={`text-green-500 ${fanSpeed > 0 ? 'animate-spin' : ''}`} style={{ animationDuration: `${2000 / (fanSpeed || 1)}ms` }} />
                </div>
              </div>

              <div className="w-56 h-36 border-2 border-cyan-800 bg-cyan-950/20 ml-10 flex flex-col items-center justify-center rounded-lg relative shadow-lg">
                <User size={24} className="absolute bottom-4 left-4 text-cyan-800" />
                <div className="text-cyan-400 font-black tracking-widest mb-1">ACCOMMODATION</div>
                <div className="text-cyan-700 text-xs mb-4 font-bold">DECK 1 - 4</div>
                <div className="flex gap-6 text-sm font-black">
                  <span className={cabinTemp > 26 ? 'text-orange-400' : cabinTemp < 19 ? 'text-blue-400' : 'text-green-400'}>
                    {cabinTemp.toFixed(1)}°C
                  </span>
                  <span className="text-blue-300">{cabinHumidity.toFixed(0)}% RH</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}