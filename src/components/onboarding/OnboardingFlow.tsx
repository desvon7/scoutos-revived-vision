import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OnboardingStep, { OnboardingStepProps } from './OnboardingStep';
import UseCasesSelection from './UseCasesSelection';
import GettingStartedGuide from './GettingStartedGuide';
import TemplateSelection from './TemplateSelection';
import ProgressIndicator from './ProgressIndicator';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

const OnboardingFlow = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const [selectedUseCase, setSelectedUseCase] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Steps data
  const steps: (OnboardingStepProps & { id: number })[] = [
    {
      id: 1,
      title: 'What are you building?',
      subtitle: 'Customize your experience',
      content: (
        <UseCasesSelection selectedUseCase={selectedUseCase} onSelectUseCase={setSelectedUseCase} />
      ),
    },
    {
      id: 2,
      title: 'Welcome to Scout!',
      subtitle: "Let's learn how to build and implement your first AI workflow or agent!",
      content: <GettingStartedGuide />,
    },
    {
      id: 3,
      title: 'Build your first workflow',
      subtitle: 'Pick from one of our many templates below and start building your first workflow',
      content: <TemplateSelection navigate={navigate} />,
    },
  ];

  const handleContinue = () => {
    if (activeStep === 1 && !selectedUseCase) {
      toast({
        title: 'Please select a use case',
        description: 'Select at least one use case to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      // Onboarding complete, navigate to dashboard
      navigate('/dashboard');
    }
  };

  const currentStep = steps.find((step) => step.id === activeStep);

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <ProgressIndicator currentStep={activeStep} totalSteps={steps.length} />

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
              Back
            </Button>
          )}
          <div className="flex-1" />
          <Button onClick={handleContinue}>
            {activeStep === steps.length ? 'Get Started' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
