
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div 
            key={step} 
            className={`w-3 h-3 rounded-full ${
              step < currentStep ? 'bg-primary' : step === currentStep ? 'bg-primary/70' : 'bg-neutral-300'
            }`} 
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
    </div>
  );
};

export default ProgressIndicator;
