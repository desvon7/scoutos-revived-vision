import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  content: ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: () => void;
  onStepChange?: (step: number) => void;
  submitButtonText?: string;
  showProgressIndicator?: boolean;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  onStepChange,
  submitButtonText = 'Complete',
  showProgressIndicator = true,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (onStepChange) onStepChange(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (onStepChange) onStepChange(currentStep - 1);
    }
  };

  return (
    <div>
      {showProgressIndicator && (
        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'rounded-full w-6 h-6 flex items-center justify-center text-xs',
                    index <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {index < currentStep ? <Check className="h-3 w-3" /> : index + 1}
                </div>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && <div className="w-16 h-px bg-border self-center"></div>}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="mb-6">{steps[currentStep].content}</div>

      <div className="flex gap-3 mt-4">
        {currentStep > 0 && (
          <Button variant="outline" className="flex-1" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button className={currentStep === 0 ? 'w-full' : 'flex-1'} onClick={handleNext}>
          {currentStep === steps.length - 1 ? submitButtonText : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;
