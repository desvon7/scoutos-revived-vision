import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleEllipsis, CircleDot, GanttChart, Database, Bookmark, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import WorkflowBuilder from '@/components/WorkflowBuilder';

const OnboardingFlow = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();
  
  // Steps data
  const steps = [
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
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">{currentStep?.title}</h1>
        <p className="text-muted-foreground">{currentStep?.subtitle}</p>
      </div>
      
      <div className="mb-10">
        {currentStep?.content}
      </div>
      
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

// Step 1: Use Cases Selection
const UseCasesSelection = () => {
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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {useCases.map((useCase) => (
        <Card key={useCase.id} className="border border-border">
          <CardContent className="p-4 flex items-start space-x-3">
            <div className="mt-1 text-primary">
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
  );
};

// Step 2: Getting Started Guide
const GettingStartedGuide = () => {
  const steps = [
    { 
      id: 1, 
      title: 'Build your knowledge base', 
      description: 'Connect your content',
      completed: false,
      current: true
    },
    { 
      id: 2, 
      title: 'Run your first AI workflow', 
      description: 'Test in the studio console',
      completed: false,
      current: false
    },
    { 
      id: 3, 
      title: 'Implement your AI workflow', 
      description: 'Integrate your AI where you want',
      completed: false,
      current: false
    }
  ];
  
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="flex">
            <div className="mr-4">
              {step.completed ? (
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
              ) : (
                <div className={`h-8 w-8 rounded-full border-2 ${step.current ? 'border-primary' : 'border-muted'} flex items-center justify-center`}>
                  {step.id}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-medium mb-2">STEP 1</h3>
        <h4 className="text-lg font-medium mb-4">Give your AI access to a collection of information</h4>
        <p className="text-muted-foreground mb-6">
          A collection is a fully managed vector database, which allows your AI to do retrieval augmented generation to
          enhance its responses with precise, context-rich insights. We manage all the embedding, hosting and other nuts
          and bolts, which allows you to quickly and easily setup semantic search in your agent or workflow.
        </p>
        <Button className="mb-8">Create collection</Button>
        
        <div className="relative pb-56.25 h-0 overflow-hidden rounded-lg">
          <iframe 
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Getting Started" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Step 3: Template Selection
const TemplateSelection = ({ navigate }: { navigate: (path: string) => void }) => {
  const templates = [
    {
      id: 'seo',
      title: 'AI-Powered SEO Blog Generator',
      description: 'Automate the creation of SEO-optimized blog posts using AI and NLP',
      icon: '📝'
    },
    {
      id: 'perplexity',
      title: 'Perplexity Clone',
      description: 'This workflow searches the web and uses an LLM to format a response',
      icon: '🌐'
    },
    {
      id: 'basic',
      title: 'Basic LLM Workflow',
      description: 'Enhance your productivity with the Basic LLM Workflow',
      icon: '🚀'
    },
    {
      id: 'slack',
      title: 'AI Slack RAG Bot (Simple)',
      description: 'This workflow is the second part of a two-part system',
      icon: '💬'
    },
    {
      id: 'rag',
      title: 'Basic RAG Workflow',
      description: "A basic RAG workflow template using Scout's powerful workflow builder",
      icon: '📊'
    },
    {
      id: 'comparison',
      title: 'LLM Model Comparison Tool',
      description: 'Compare the performance, cost, and output of multiple AI language models',
      icon: '⚖️'
    }
  ];
  
  const handleUseTemplate = () => {
    navigate('/template-builder');
  };
  
  const handleStartFromScratch = () => {
    navigate('/template-builder');
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={handleUseTemplate}>
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
        <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={handleUseTemplate}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <GanttChart className="h-8 w-8 mb-4" />
            <h3 className="font-medium mb-1">View all templates</h3>
            <p className="text-sm text-muted-foreground">Premade templates for everything</p>
          </CardContent>
        </Card>
        
        <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={handleStartFromScratch}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Database className="h-8 w-8 mb-4" />
            <h3 className="font-medium mb-1">Start from scratch</h3>
            <p className="text-sm text-muted-foreground">Build your own custom workflow</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-medium mb-6">Workflow Builder Preview</h3>
        <WorkflowBuilder />
      </div>
    </div>
  );
};

export default OnboardingFlow;
