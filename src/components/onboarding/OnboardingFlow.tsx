
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OnboardingStep, { OnboardingStepProps } from './OnboardingStep';
import UseCasesSelection from './UseCasesSelection';
import GettingStartedGuide from './GettingStartedGuide';
import TemplateSelection from './TemplateSelection';

const OnboardingFlow = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();
  
  // Steps data
  const steps: (OnboardingStepProps & { id: number })[] = [
    {
      id: 1,
      title: "What are you building?",
      subtitle: "Customize your experience",
      content: <UseCasesSelection />
    },
    {
      id: 2,
      title: "Welcome to Scout!",
      subtitle: "Let's learn how to build and implement your first AI workflow or agent!",
      content: <GettingStartedGuide />
    },
    {
      id: 3,
      title: "Build your first workflow",
      subtitle: "Pick from one of our many templates below and start building your first workflow",
      content: <TemplateSelection navigate={navigate} />
    }
  ];
  
  const currentStep = steps.find(step => step.id === activeStep);
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {currentStep && (
        <OnboardingStep 
          title={currentStep.title} 
          subtitle={currentStep.subtitle} 
          content={currentStep.content}
        />
      )}
      
      <div className="flex justify-between mt-8">
        {activeStep > 1 && (
          <Button variant="outline" onClick={() => setActiveStep(activeStep - 1)}>
            Previous
          </Button>
        )}
        <div className="flex-1" />
        {activeStep < steps.length && (
          <Button onClick={() => setActiveStep(activeStep + 1)}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
