
import React, { useState } from 'react';
import PlateDetectionStep from './steps/PlateDetectionStep';
import SlotDetectorStep from './steps/SlotDetectorStep';
import BillingStep from './steps/BillingStep';

interface PipelineScreenProps {
  onComplete: (data: any) => void;
}

const PipelineScreen: React.FC<PipelineScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionData, setSessionData] = useState({
    plateNumber: '',
    slotId: '',
    entryTime: '',
    duration: '',
    fare: 0,
  });

  const progress = (currentStep / 3) * 100;

  const handleStepCompletion = (step: number, data?: any) => {
    if (data) setSessionData(prev => ({ ...prev, ...data }));
    
    if (step < 3) {
      setCurrentStep(step + 1);
    } else {
      onComplete({ ...sessionData, ...data });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark animate-in slide-in-from-right duration-500">
      {/* Top Nav */}
      <div className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-white/5">
        <button 
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          className="text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-white text-base font-bold leading-tight tracking-tight">System Pipeline</h2>
          <p className="text-[#9e91ca] text-[10px] uppercase tracking-widest font-semibold">Smart Parking Live Demo</p>
        </div>
        <div className="text-white flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Progress Summary */}
        <div className="flex flex-col gap-3 p-6">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-white text-sm font-medium leading-normal">Overall Process Status</p>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold border border-primary/30 uppercase">
              Step {currentStep} of 3
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#1f1934] overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent-blue transition-all duration-700 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[#9e91ca] text-xs font-normal">
            {currentStep === 1 && "AI Vision is actively identifying vehicle number plates."}
            {currentStep === 2 && "Monitoring real-time parking slot occupancy."}
            {currentStep === 3 && "Finalizing session details and billing generation."}
          </p>
        </div>

        {/* Modular Steps */}
        <div className="px-6 flex flex-col gap-8">
          {currentStep === 1 && <PlateDetectionStep onNext={(data) => handleStepCompletion(1, data)} />}
          {currentStep === 2 && <SlotDetectorStep plateNumber={sessionData.plateNumber} onNext={(data) => handleStepCompletion(2, data)} />}
          {currentStep === 3 && <BillingStep sessionData={sessionData} onNext={(data) => handleStepCompletion(3, data)} />}
        </div>
      </main>
    </div>
  );
};

export default PipelineScreen;
