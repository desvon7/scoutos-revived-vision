
import React from 'react';
import { Button } from '@/components/ui/button';
import Asterisk from '@/components/shared/Asterisk';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

interface DashboardOnboardingProps {
  onSkip: () => void;
}

const DashboardOnboarding = ({ onSkip }: DashboardOnboardingProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex h-16 items-center border-b px-6 justify-between">
        <div className="flex items-center space-x-2">
          <Asterisk className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Scout</span>
        </div>
        <Button variant="ghost" onClick={onSkip}>
          Skip tutorial
        </Button>
      </div>
      <OnboardingFlow />
    </div>
  );
};

export default DashboardOnboarding;
