
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GanttChart, Database, Bookmark, Activity, CircleEllipsis, CircleDot, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const useCases = [
    { 
      id: 'slack',
      title: 'Slack Integration', 
      description: 'Build a powerful Q&A bot for your Slack workspace',
      icon: <GanttChart className="h-5 w-5" />
    },
    { 
      id: 'website',
      title: 'Website Assistant', 
      description: 'Create an AI chatbot to help your website visitors',
      icon: <Activity className="h-5 w-5" />
    },
    { 
      id: 'app',
      title: 'App Enhancement', 
      description: 'Integrate AI features into your existing application',
      icon: <Database className="h-5 w-5" />
    },
    { 
      id: 'content',
      title: 'Content Creation', 
      description: 'Generate high-quality content using AI technology',
      icon: <Bookmark className="h-5 w-5" />
    },
    { 
      id: 'automation',
      title: 'AI Automation', 
      description: 'Streamline workflows with intelligent automation',
      icon: <CircleEllipsis className="h-5 w-5" />
    },
    { 
      id: 'exploring',
      title: 'Just Exploring', 
      description: 'Discover the possibilities of our AI platform',
      icon: <CircleDot className="h-5 w-5" />
    }
  ];

  const handleContinue = () => {
    if (step === 1 && !selectedUseCase) {
      toast({
        title: "Please select a use case",
        description: "Select at least one use case to continue.",
        variant: "destructive",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Onboarding complete, navigate to dashboard
      navigate('/dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">What are you building?</h1>
              <p className="text-muted-foreground">Select your primary use case so we can customize your experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {useCases.map((useCase) => (
                <Card 
                  key={useCase.id} 
                  className={`border cursor-pointer transition-all ${
                    selectedUseCase === useCase.id ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedUseCase(useCase.id)}
                >
                  <CardContent className="p-4 flex items-start space-x-3">
                    <div className={`mt-1 ${selectedUseCase === useCase.id ? 'text-primary' : 'text-muted-foreground'}`}>
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">Welcome to FlowAI!</h1>
              <p className="text-muted-foreground">Let's learn how to build and implement your first AI workflow.</p>
            </div>
            
            <div className="space-y-6 mt-8">
              <div className="flex">
                <div className="mr-4">
                  <div className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Build your knowledge base</h3>
                  <p className="text-sm text-muted-foreground">Connect your content</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="h-8 w-8 rounded-full border-2 border-muted flex items-center justify-center">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Run your first AI workflow</h3>
                  <p className="text-sm text-muted-foreground">Test in the studio console</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="h-8 w-8 rounded-full border-2 border-muted flex items-center justify-center">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Implement your AI workflow</h3>
                  <p className="text-sm text-muted-foreground">Integrate your AI where you want</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border mt-8">
              <h3 className="text-lg font-medium mb-2">STEP 1</h3>
              <h4 className="text-lg font-medium mb-4">Give your AI access to a collection of information</h4>
              <p className="text-muted-foreground mb-6">
                A collection is a fully managed vector database, which allows your AI to do retrieval augmented generation to
                enhance its responses with precise, context-rich insights. We manage all the embedding, hosting and other nuts
                and bolts, which allows you to quickly and easily setup semantic search in your agent or workflow.
              </p>
              <Button className="mb-8">Create collection</Button>
              
              <div className="relative pb-56.25 h-0 overflow-hidden rounded-lg">
                <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-neutral-800 flex items-center justify-center">
                  <p className="text-white">Tutorial Video</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">Build your first workflow</h1>
              <p className="text-muted-foreground">Pick from one of our many templates below and start building your first workflow</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {id: 'seo', title: 'AI-Powered SEO Blog Generator', description: 'Automate the creation of SEO-optimized blog posts using AI and NLP', icon: '📝'},
                {id: 'perplexity', title: 'Perplexity Clone', description: 'This workflow searches the web and uses an LLM to format a response', icon: '🌐'},
                {id: 'basic', title: 'Basic LLM Workflow', description: 'Enhance your productivity with the Basic LLM Workflow', icon: '🚀'},
                {id: 'slack', title: 'AI Slack RAG Bot (Simple)', description: 'This workflow is the second part of a two-part system', icon: '💬'},
                {id: 'rag', title: 'Basic RAG Workflow', description: "A basic RAG workflow template using FlowAI's powerful workflow builder", icon: '📊'},
                {id: 'comparison', title: 'LLM Model Comparison Tool', description: 'Compare the performance, cost, and output of multiple AI language models', icon: '⚖️'}
              ].map((template) => (
                <Card key={template.id} className="border border-border hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="text-3xl mb-2">{template.icon}</div>
                    <h3 className="font-medium mb-1">{template.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Button variant="outline" size="sm">Use template</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <GanttChart className="h-8 w-8 mb-4" />
                  <h3 className="font-medium mb-1">View all templates</h3>
                  <p className="text-sm text-muted-foreground">Premade templates for everything</p>
                </CardContent>
              </Card>
              
              <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Database className="h-8 w-8 mb-4" />
                  <h3 className="font-medium mb-1">Start from scratch</h3>
                  <p className="text-sm text-muted-foreground">Build your own custom workflow</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-3 h-3 rounded-full ${
                  s < step ? 'bg-primary' : s === step ? 'bg-primary/70' : 'bg-neutral-300'
                }`} 
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Step {step} of 3</p>
        </div>
        
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <div className="flex-1" />
          <Button onClick={handleContinue}>
            {step === 3 ? 'Get Started' : 'Continue'} 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
