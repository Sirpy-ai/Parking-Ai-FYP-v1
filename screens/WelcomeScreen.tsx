
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden animate-in fade-in duration-700">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="grid-pattern absolute w-[200%] h-[200%] left-[-50%] top-[-20%] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 w-full h-1/2 opacity-30" style={{ background: 'radial-gradient(circle at 50% 100%, #6237f1 0%, transparent 70%)' }}></div>
      </div>

      {/* Top App Bar */}
      <div className="relative z-10 flex items-center p-6 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary text-2xl">memory</span>
          </div>
          <h2 className="text-white text-sm font-semibold tracking-widest uppercase">AI Smart Parking</h2>
        </div>
        <span className="material-symbols-outlined text-white/50 cursor-pointer">info</span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="glass-card p-8 rounded-3xl w-full max-w-sm mb-8 animate-in zoom-in-95 duration-500">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          <h1 className="text-white text-[28px] font-extrabold leading-tight tracking-tight mb-4 uppercase">
            FINAL YEAR PROJECT:<br/>
            <span className="text-primary">AI-Based</span> Smart Parking Management System
          </h1>
          
          <div className="flex gap-2 justify-center flex-wrap mt-6">
            <Chip icon="visibility" label="Computer Vision" />
            <Chip icon="psychology" label="AI" />
            <Chip icon="settings_remote" label="Automation" />
          </div>
        </div>
        <p className="text-white/60 text-sm font-medium leading-relaxed max-w-xs mb-12">
          Revolutionizing urban mobility through advanced automation and real-time computer vision analytics.
        </p>
      </div>

      {/* Bottom CTA Area */}
      <div className="relative z-10 px-8 pb-16 flex flex-col items-center">
        <div className="absolute -top-12 w-full flex justify-center opacity-20">
          <div className="w-64 h-1 bg-primary blur-md"></div>
        </div>
        
        <button 
          onClick={onStart}
          className="glow-button neon-border bg-primary text-white w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group hover:bg-primary/90"
        >
          <span className="text-lg font-black tracking-[0.2em] uppercase">Click to Start</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
        </button>
        <p className="mt-6 text-[10px] text-white/30 uppercase tracking-[0.3em]">System version 2.0.4 • Ready to scan</p>
      </div>

      {/* Abstract Detail */}
      <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-cover bg-center rounded-full" style={{ backgroundImage: 'url("https://picsum.photos/400/400?grayscale")' }}></div>
      </div>
    </div>
  );
};

const Chip: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <div className="flex h-7 items-center justify-center gap-x-1 rounded-full bg-primary/20 border border-primary/30 px-3">
    <span className="material-symbols-outlined text-[14px] text-primary">{icon}</span>
    <p className="text-white text-[10px] font-bold uppercase tracking-wider">{label}</p>
  </div>
);

export default WelcomeScreen;
