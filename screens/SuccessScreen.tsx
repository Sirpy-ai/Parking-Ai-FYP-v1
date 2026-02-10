
import React from 'react';

interface SuccessScreenProps {
  onRestart: () => void;
  onGoToDashboard: () => void;
  data: any;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onRestart, onGoToDashboard, data }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-background-dark animate-in fade-in duration-1000 overflow-y-auto">
      {/* Top Nav */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-dark/80 backdrop-blur">
        <button 
          onClick={onRestart}
          className="text-white flex size-12 items-center justify-start"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight flex-1 text-center">Project Completion</h2>
        <div className="size-12 flex items-center justify-end">
          <span className="material-symbols-outlined">share</span>
        </div>
      </div>

      <main className="flex flex-col items-center px-6 pb-40">
        {/* Animated Success Indicator */}
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
            <div className="z-10 bg-green-500/10 border-2 border-green-500 rounded-full p-6 scale-110 animate-in zoom-in-50 duration-500">
              <span className="material-symbols-outlined text-[80px] text-green-500 font-bold" style={{ fontVariationSettings: "'wght' 700" }}>check_circle</span>
            </div>
          </div>
          <h1 className="text-white tracking-tight text-[28px] font-bold leading-tight px-4 text-center pb-2 pt-8">System Deployment Successful</h1>
          <p className="text-gray-400 text-sm font-normal leading-normal pb-3 pt-1 px-8 text-center max-w-md">
            The AI-based smart parking system has successfully completed the full operational cycle and verified all modules.
          </p>
        </div>

        {/* Module Overview */}
        <div className="w-full max-w-md flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold pb-2">Module Overview</h3>
          
          <ModuleCard 
            icon="camera_outdoor" 
            label="Detection" 
            status="Verified" 
            color="cyan"
            details={[
              { label: "AI Logic", value: "YOLOv8 Real-time" },
              { label: "Accuracy", value: "98.4%", highlight: true },
              { label: "Plate", value: data.plateNumber || "TN 07 AB 4321" }
            ]}
          />

          <ModuleCard 
            icon="analytics" 
            label="Monitoring" 
            status="Active" 
            color="primary"
            details={[
              { label: "Tracking Engine", value: "DeepSORT" },
              { label: "Slot ID", value: data.slotId || "A-102" },
              { label: "Occupancy", value: "84%", highlight: true }
            ]}
          />

          <ModuleCard 
            icon="payments" 
            label="Billing" 
            status="Completed" 
            color="green"
            details={[
              { label: "Payment Gateway", value: "Simulated Stripe" },
              { label: "Total Revenue", value: `$${data.fare?.toFixed(2) || "12.50"}`, highlight: true },
              { label: "Status", value: "Verified" }
            ]}
          />

          <div className="mt-8">
            <h3 className="text-white text-lg font-bold pb-4">Activity Map</h3>
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 grayscale opacity-40">
              <img src="https://picsum.photos/seed/map/800/450?grayscale" className="w-full h-full object-cover" alt="Activity Map" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-dark/95 backdrop-blur-lg border-t border-white/10 px-6 py-6 flex flex-col gap-3">
        <button 
          onClick={onGoToDashboard}
          className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-95 transition-all"
        >
          Go to Dashboard
          <span className="material-symbols-outlined">dashboard</span>
        </button>
        <button 
          onClick={onRestart}
          className="w-full py-4 bg-transparent text-gray-400 font-medium rounded-xl border border-white/10 flex items-center justify-center gap-2 active:bg-white/5 transition-all"
        >
          <span className="material-symbols-outlined">restart_alt</span>
          Restart Demo
        </button>
      </div>
    </div>
  );
};

const ModuleCard: React.FC<{ icon: string; label: string; status: string; color: 'cyan' | 'primary' | 'green'; details: any[] }> = ({ icon, label, status, color, details }) => {
  const colorStyles = {
    cyan: 'text-accent-blue bg-accent-blue/20 border-accent-blue/30',
    primary: 'text-primary bg-primary/20 border-primary/30',
    green: 'text-green-400 bg-green-500/20 border-green-500/30'
  };

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined ${color === 'cyan' ? 'text-accent-blue' : color === 'primary' ? 'text-primary' : 'text-green-400'}`}>{icon}</span>
          <span className="font-bold text-white">{label}</span>
        </div>
        <span className={`text-[8px] uppercase tracking-widest px-2 py-1 rounded-full border font-black ${colorStyles[color]}`}>{status}</span>
      </div>
      <div className="grid grid-cols-1 gap-1">
        {details.map((d, i) => (
          <p key={i} className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
            {d.label}: <span className={d.highlight ? 'text-accent-blue' : 'text-white'}>{d.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SuccessScreen;
