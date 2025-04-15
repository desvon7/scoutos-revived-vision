import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GettingStartedGuide = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Build your knowledge base',
      description: 'Connect your content',
      completed: false,
      current: true,
    },
    {
      id: 2,
      title: 'Run your first AI workflow',
      description: 'Test in the studio console',
      completed: false,
      current: false,
    },
    {
      id: 3,
      title: 'Implement your AI workflow',
      description: 'Integrate your AI where you want',
      completed: false,
      current: false,
    },
  ];

  const handleCreateCollection = () => {
    navigate('/dashboard/collections');
  };

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
                <div
                  className={`h-8 w-8 rounded-full border-2 ${step.current ? 'border-primary' : 'border-muted'} flex items-center justify-center`}
                >
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
        <h4 className="text-lg font-medium mb-4">
          Give your AI access to a collection of information
        </h4>
        <p className="text-muted-foreground mb-6">
          A collection is a fully managed vector database, which allows your AI to do retrieval
          augmented generation to enhance its responses with precise, context-rich insights. We
          manage all the embedding, hosting and other nuts and bolts, which allows you to quickly
          and easily setup semantic search in your agent or workflow.
        </p>
        <Button className="mb-8" onClick={handleCreateCollection}>
          Create collection
        </Button>

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

export default GettingStartedGuide;
