
import React, { useState } from 'react';
import { MaturityProvider, useMaturity } from './context/MaturityContext';
import DashboardLayout from './components/DashboardLayout';
import OnboardingModal from './components/OnboardingModal';

// Phase 1 Features
import MotivationWall from './features/phase1/MotivationWall';
import AttendanceTracker from './features/phase1/AttendanceTracker';
import MachineScheduler from './features/phase1/MachineScheduler';
import Sikhana from './features/phase1/Sikhana';

// Phase 2 Features
import QualityGate from './features/phase2/QualityGate';
import SakhiSquadManager from './features/phase2/SakhiSquadManager';
import StandardizationVault from './features/phase2/StandardizationVault';

// Phase 3 Features
import BulkOrderBoard from './features/phase3/BulkOrderBoard';
import PayrollLedger from './features/phase3/PayrollLedger';

const DashboardContent = () => {
  const { surveyData } = useMaturity();
  const [activeTab, setActiveTab] = useState('dashboard');

  // If no survey data, show onboarding
  if (!surveyData) {
    return <OnboardingModal />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        // Dashboard defaults to Motivation Wall for now as landing
        return <MotivationWall />;
      case 'motivation': return <MotivationWall />;
      case 'attendance': return <AttendanceTracker />;
      case 'scheduler': return <MachineScheduler />;
      case 'sikhana': return <Sikhana />;

      case 'quality': return <QualityGate />;
      case 'squad': return <SakhiSquadManager />;
      case 'vault': return <StandardizationVault />;

      case 'orders': return <BulkOrderBoard />;
      case 'payroll': return <PayrollLedger />;
      default: return <MotivationWall />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

function App() {
  return (
    <MaturityProvider>
      <DashboardContent />
    </MaturityProvider>
  );
}

export default App;
