
import React from 'react';

interface DashboardScreenProps {
  onBack: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onBack }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-background-dark animate-in slide-in-from-bottom duration-700 overflow-hidden">
      {/* Header */}
      <header className="px-6 py-5 flex justify-between items-center border-b border-white/5 bg-background-dark/50 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="size-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white active:scale-90">
            <span className="material-symbols-outlined text-xl">grid_view</span>
          </button>
          <div>
            <h1 className="text-white text-lg font-black tracking-tight uppercase">System Dashboard</h1>
            <div className="flex items-center gap-1.5">
              <div className="size-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[#9e91ca] text-[10px] font-bold uppercase tracking-widest">Active • Monitoring 48 Slots</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <span className="material-symbols-outlined text-white/50 cursor-pointer hover:text-white transition-colors">search</span>
           <span className="material-symbols-outlined text-white/50 cursor-pointer hover:text-white transition-colors">notifications</span>
           <div className="size-10 rounded-full border border-primary/30 p-0.5">
             <img src="https://picsum.photos/seed/admin/100/100" className="w-full h-full rounded-full object-cover" alt="User" />
           </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-24">
        {/* KPI Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard label="Total Revenue" value="$4,120" icon="monetization_on" trend="+12.5%" color="primary" />
          <KPICard label="Avg Occupancy" value="82%" icon="pie_chart" trend="+3.2%" color="accent-blue" />
          <KPICard label="Detection Rate" value="98.2%" icon="psychology" trend="+0.4%" color="green" />
          <KPICard label="Active Sessions" value="12" icon="electric_car" trend="Stable" color="yellow" />
        </section>

        {/* Analytics & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/5">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-white font-bold text-base uppercase tracking-wider">Revenue Trend</h3>
               <div className="flex gap-2">
                 <button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg">Daily</button>
                 <button className="px-3 py-1 bg-white/5 text-[#9e91ca] text-[10px] font-bold rounded-lg">Monthly</button>
               </div>
             </div>
             {/* Visual Graph Mockup */}
             <div className="h-48 w-full relative flex items-end justify-between gap-1 mt-4">
                {[40, 70, 45, 90, 65, 85, 55, 100, 75, 95, 60, 80].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div 
                      className="w-full bg-primary/20 rounded-t-sm transition-all hover:bg-primary/60"
                      style={{ height: `${h}%` }}
                    ></div>
                    <div 
                      className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm transition-all group-hover:bg-accent-blue"
                      style={{ height: `${h * 0.4}%` }}
                    ></div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                <span>08 AM</span>
                <span>12 PM</span>
                <span>04 PM</span>
                <span>08 PM</span>
             </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/5">
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-6">System Health</h3>
            <div className="space-y-4">
               <HealthMeter label="Camera Feed 01" value={98} status="Online" />
               <HealthMeter label="Cloud DB Sync" value={100} status="Syncing" />
               <HealthMeter label="AI Processing" value={92} status="Running" />
               <HealthMeter label="Billing API" value={85} status="Latency High" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Activity Log */}
        <section className="glass-card rounded-3xl p-6 border border-white/5">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-white font-bold text-base uppercase tracking-wider">Live Activity Log</h3>
             <button className="text-primary text-[10px] font-bold uppercase hover:underline">View All Records</button>
           </div>
           <div className="space-y-4">
              <LogEntry plate="TN 07 AB 4321" time="10:45 AM" action="Entry" status="Success" />
              <LogEntry plate="KA 03 MZ 9081" time="10:42 AM" action="Exit" status="Success" />
              <LogEntry plate="MH 12 PK 1122" time="10:35 AM" action="Entry" status="Success" />
              <LogEntry plate="DL 01 CH 4455" time="10:28 AM" action="Exit" status="Pending" />
           </div>
        </section>
      </main>

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-glass-dark backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl z-30 animate-in slide-in-from-bottom duration-1000">
         <button className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40"><span className="material-symbols-outlined">dashboard</span></button>
         <button className="size-12 rounded-xl bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 transition-all"><span className="material-symbols-outlined">analytics</span></button>
         <button className="size-12 rounded-xl bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 transition-all"><span className="material-symbols-outlined">group</span></button>
         <button className="size-12 rounded-xl bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 transition-all"><span className="material-symbols-outlined">settings</span></button>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ label: string; value: string; icon: string; trend: string; color: string }> = ({ label, value, icon, trend, color }) => {
  const colors = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    'accent-blue': 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
    green: 'text-green-400 bg-green-400/10 border-green-400/20',
    yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
  };

  return (
    <div className={`glass-card p-4 rounded-2xl border flex flex-col gap-2 ${colors[color]}`}>
      <div className="flex justify-between items-center">
        <span className="material-symbols-outlined text-xl opacity-80">{icon}</span>
        <span className="text-[10px] font-bold text-white/60">{trend}</span>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</p>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
};

const HealthMeter: React.FC<{ label: string; value: number; status: string }> = ({ label, value, status }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between items-end">
      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{label}</span>
      <span className="text-[8px] font-black text-primary/80 uppercase">{status}</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-primary to-accent-blue rounded-full transition-all duration-1000" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const LogEntry: React.FC<{ plate: string; time: string; action: 'Entry' | 'Exit'; status: string }> = ({ plate, time, action, status }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
    <div className="flex items-center gap-3">
       <div className={`size-8 rounded-lg flex items-center justify-center ${action === 'Entry' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
         <span className="material-symbols-outlined text-sm">{action === 'Entry' ? 'login' : 'logout'}</span>
       </div>
       <div>
         <p className="text-white text-xs font-mono font-bold tracking-widest">{plate}</p>
         <p className="text-[#9e91ca] text-[10px] uppercase font-bold tracking-tighter opacity-60">{time} • {action}</p>
       </div>
    </div>
    <div className="text-right">
       <p className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/5 ${status === 'Success' ? 'text-green-500' : 'text-yellow-500'}`}>
         {status}
       </p>
    </div>
  </div>
);

export default DashboardScreen;
