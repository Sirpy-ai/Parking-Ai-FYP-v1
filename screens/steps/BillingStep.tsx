
import React, { useState } from 'react';

interface BillingStepProps {
  sessionData: any;
  onNext: (data: any) => void;
}

const BillingStep: React.FC<BillingStepProps> = ({ sessionData, onNext }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [billGenerated, setBillGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setBillGenerated(true);
    }, 2000);
  };

  const fare = 12.50;

  const handleDownload = (type: 'pdf' | 'img') => {
    // Create a dummy text file to simulate download
    const content = `PARK AI RECEIPT\n\nDate: ${new Date().toLocaleDateString()}\nPlate: ${sessionData.plateNumber}\nSlot: ${sessionData.slotId}\nFare: $${fare.toFixed(2)}\n\nThank you for parking with us.`;
    const blob = new Blob([content], { type: type === 'pdf' ? 'application/pdf' : 'image/png' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt_${Date.now()}.${type === 'pdf' ? 'pdf' : 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert(`${type.toUpperCase()} Download Started...`);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Park AI Receipt',
      text: `Parking Receipt for ${sessionData.plateNumber}: $${fare.toFixed(2)}`,
      url: window.location.href
    };

    // Try native share
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
        // Fallback to WhatsApp
        const text = encodeURIComponent(`*PARK AI RECEIPT*\nPlate: ${sessionData.plateNumber}\nAmount: $${fare.toFixed(2)}\nStatus: Paid`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="flex flex-col gap-6">
        {/* Receipt Container */}
        <div id="receipt-container" className="bg-white rounded-xl shadow-2xl p-6 text-slate-900 relative overflow-hidden transition-all duration-700 min-h-[350px]">
           {/* Decorative Tech Pattern Overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#6237f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
           
           <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-black text-xl tracking-tight">PARK AI</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Smart Billing Module</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <ReceiptRow label="Vehicle Plate" value={sessionData.plateNumber || "ABC-1234"} />
                <ReceiptRow label="Slot ID" value={sessionData.slotId || "A-102"} />
                <ReceiptRow label="Entry Time" value={sessionData.entryTime || "10:30 AM"} />
                <ReceiptRow label="Exit Time" value={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
              </div>

              <div className="mt-auto pt-6 border-t border-dashed border-slate-200 text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Calculated Fare</p>
                 <h2 className="text-4xl font-black">${fare.toFixed(2)}</h2>
              </div>

              {billGenerated && (
                <div className="mt-6 flex justify-center animate-in zoom-in-50 duration-500">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-lg p-2 grid grid-cols-4 gap-1">
                     {Array.from({length: 16}).map((_, i) => (
                       <div key={i} className={`h-full w-full rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                     ))}
                  </div>
                </div>
              )}
           </div>

           {isGenerating && (
             <div className="absolute inset-0 bg-white/90 backdrop-blur flex flex-col items-center justify-center animate-in fade-in">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-primary animate-pulse">GENERATING BILL...</p>
             </div>
           )}
        </div>

        {/* Control Panel */}
        <div className="glass-panel bg-glass-dark p-6 rounded-2xl flex flex-col gap-4 border border-white/5">
          <button 
            onClick={billGenerated ? () => onNext({ fare }) : handleGenerate}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined">{billGenerated ? 'check_circle' : 'receipt_long'}</span>
            {billGenerated ? 'Complete Transaction' : 'Generate & Send Bill'}
          </button>

          {billGenerated && (
            <div className="grid grid-cols-3 gap-3 animate-in slide-in-from-bottom duration-500">
              <ActionButton icon="picture_as_pdf" label="PDF" onClick={() => handleDownload('pdf')} />
              <ActionButton icon="image" label="IMG" onClick={() => handleDownload('img')} />
              <ActionButton icon="share" label="Share" onClick={handleShare} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReceiptRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</span>
    <span className="text-slate-900 font-bold font-mono">{value}</span>
  </div>
);

const ActionButton: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 active:scale-90 transition-all"
  >
    <span className="material-symbols-outlined text-white text-xl">{icon}</span>
    <span className="text-[10px] text-white/60 font-bold uppercase">{label}</span>
  </button>
);

export default BillingStep;
