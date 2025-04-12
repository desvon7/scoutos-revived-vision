
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GanttChart, Database } from 'lucide-react';
import WorkflowBuilder from '@/components/WorkflowBuilder';

interface TemplateSelectionProps {
  navigate: (path: string) => void;
}

const TemplateSelection = ({ navigate }: TemplateSelectionProps) => {
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

export default TemplateSelection;
