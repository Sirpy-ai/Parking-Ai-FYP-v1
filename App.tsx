
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import PipelineScreen from './screens/PipelineScreen';
import SuccessScreen from './screens/SuccessScreen';
import DashboardScreen from './screens/DashboardScreen';

export type ScreenState = 'welcome' | 'pipeline' | 'success' | 'dashboard';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('welcome');
  const [sessionData, setSessionData] = useState({
    plateNumber: '',
    slotId: '',
    entryTime: '',
    duration: '',
    fare: 0,
  });

  const handleStart = () => {
    setCurrentScreen('pipeline');
  };

  const handleCompletion = (data: typeof sessionData) => {
    setSessionData(data);
    setCurrentScreen('success');
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
  };

  const handleGoToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="relative h-screen w-full bg-background-dark overflow-hidden">
      {/* Dynamic Screen Rendering */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'pipeline' && (
        <PipelineScreen onComplete={handleCompletion} />
      )}

      {currentScreen === 'success' && (
        <SuccessScreen 
          onRestart={handleRestart} 
          onGoToDashboard={handleGoToDashboard}
          data={sessionData} 
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen onBack={handleRestart} />
      )}
    </div>
  );
};

export default App;
