import React from 'react';

export interface OnboardingStepProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ title, subtitle, content }) => {
  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mb-10">{content}</div>
    </div>
  );
};

export default OnboardingStep;
