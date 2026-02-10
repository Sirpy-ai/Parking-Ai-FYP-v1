
import React, { useState, useEffect } from 'react';

interface SlotDetectorStepProps {
  plateNumber: string;
  onNext: (data: { slotId: string, entryTime: string }) => void;
}

const SlotDetectorStep: React.FC<SlotDetectorStepProps> = ({ plateNumber, onNext }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [stats, setStats] = useState({ available: 10, occupied: 38, reserved: 2 });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Simulated live counter
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        available: Math.max(0, prev.available + (Math.random() > 0.5 ? 1 : -1)),
        occupied: prev.occupied + (Math.random() > 0.5 ? -1 : 1)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="glow-border bg-card-dark p-4 rounded-xl border border-primary/30">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1">Module 02 • Active</p>
            <p className="text-white text-lg font-bold leading-tight">Parking Slot Detector</p>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded">
             <div className="size-1.5 bg-green-500 rounded-full animate-ping"></div>
             <span className="text-[8px] font-bold">LIVE</span>
          </div>
        </div>

        {/* Live Feed Component */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-primary/20 mb-4">
          <img 
            src="https://picsum.photos/seed/parking-aerial/800/450" 
            className={`w-full h-full object-cover transition-all duration-700 ${isPaused ? 'grayscale' : ''}`}
            alt="Aerial Parking" 
          />
          <div className="absolute inset-0 p-4">
            <SlotBox top="20%" left="20%" type="occupied" />
            <SlotBox top="35%" left="50%" type="available" onClick={() => setSelectedSlot('A-102')} isSelected={selectedSlot === 'A-102'} />
            <SlotBox top="60%" left="30%" type="reserved" />
            <SlotBox top="15%" left="70%" type="available" onClick={() => setSelectedSlot('B-045')} isSelected={selectedSlot === 'B-045'} />
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> FREE
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> BUSY
            </div>
          </div>

          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full size-12 bg-primary/80 text-white backdrop-blur shadow-lg active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <StatCard label="Total" value="50" />
          <StatCard label="Free" value={stats.available.toString()} highlight="green" />
          <StatCard label="Occu." value={`${Math.round((stats.occupied/50)*100)}%`} highlight="primary" />
        </div>

        <button 
          disabled={!selectedSlot}
          onClick={() => onNext({ 
            slotId: selectedSlot!, 
            entryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          })}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all active:scale-[0.98] ${selectedSlot ? 'bg-primary text-white glow-button' : 'bg-white/5 text-white/20'}`}
        >
          <span>Proceed to Billing</span>
          <span className="material-symbols-outlined">receipt_long</span>
        </button>
        {!selectedSlot && <p className="text-center text-[10px] text-[#9e91ca] mt-2 italic">Select an available green slot on the map to proceed</p>}
      </div>
    </div>
  );
};

const SlotBox: React.FC<{ top: string; left: string; type: 'occupied' | 'available' | 'reserved'; onClick?: () => void; isSelected?: boolean }> = ({ top, left, type, onClick, isSelected }) => {
  const colors = {
    occupied: 'border-red-500 bg-red-500/20 text-red-500',
    available: 'border-green-500 bg-green-500/20 text-green-500 cursor-pointer hover:bg-green-500/40',
    reserved: 'border-yellow-500 bg-yellow-500/20 text-yellow-500',
  };

  return (
    <div 
      onClick={onClick}
      className={`absolute w-12 h-16 border-2 flex flex-col items-center justify-start transition-all ${colors[type]} ${isSelected ? 'ring-4 ring-white shadow-xl scale-110 z-10' : ''}`}
      style={{ top, left }}
    >
      <span className="text-[6px] font-black uppercase px-0.5 mt-0.5">{type}</span>
      {isSelected && <span className="text-[8px] font-bold mt-2">✓</span>}
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; highlight?: 'green' | 'primary' }> = ({ label, value, highlight }) => (
  <div className="bg-white/5 rounded-lg p-2 border border-white/5 text-center">
    <p className="text-[#9e91ca] text-[8px] font-bold uppercase tracking-widest">{label}</p>
    <p className={`text-lg font-bold ${highlight === 'green' ? 'text-green-400' : highlight === 'primary' ? 'text-primary' : 'text-white'}`}>
      {value}
    </p>
  </div>
);

export default SlotDetectorStep;
