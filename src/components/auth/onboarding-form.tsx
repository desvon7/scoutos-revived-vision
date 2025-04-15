'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const steps = [
  {
    title: 'Company Information',
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text' },
      { name: 'industry', label: 'Industry', type: 'text' },
      { name: 'size', label: 'Company Size', type: 'text' },
    ],
  },
  {
    title: 'Workflow Setup',
    fields: [
      { name: 'defaultModel', label: 'Default LLM Model', type: 'text' },
      { name: 'maxTokens', label: 'Max Tokens per Request', type: 'number' },
      { name: 'temperature', label: 'Default Temperature', type: 'number' },
    ],
  },
  {
    title: 'Collection Setup',
    fields: [
      { name: 'collectionName', label: 'Initial Collection Name', type: 'text' },
      { name: 'collectionType', label: 'Collection Type', type: 'text' },
    ],
  },
];

export function OnboardingForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save onboarding data');
      }

      toast({
        title: 'Success',
        description: 'Profile setup completed',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-between mb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-full rounded ${index <= currentStep ? 'bg-primary' : 'bg-muted'}`}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
          {steps[currentStep].fields.map((field) => (
            <div key={field.name} className="grid gap-2">
              <Input
                id={field.name}
                name={field.name}
                placeholder={field.label}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                disabled={loading}
                required
              />
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || loading}
            >
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Complete Setup'}
              </Button>
            ) : (
              <Button type="button" onClick={nextStep} disabled={loading}>
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
