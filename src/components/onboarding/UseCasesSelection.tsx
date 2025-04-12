
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GanttChart, Activity, Database, Bookmark, CircleEllipsis, CircleDot } from 'lucide-react';

interface UseCasesSelectionProps {
  selectedUseCase: string | null;
  onSelectUseCase: (id: string) => void;
}

const UseCasesSelection: React.FC<UseCasesSelectionProps> = ({
  selectedUseCase,
  onSelectUseCase
}) => {
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
        <Card 
          key={useCase.id} 
          className={`border cursor-pointer transition-all ${
            selectedUseCase === useCase.id ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
          }`}
          onClick={() => onSelectUseCase(useCase.id)}
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
  );
};

export default UseCasesSelection;
