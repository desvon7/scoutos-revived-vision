
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GanttChart, Database } from 'lucide-react';

interface TemplateActionsProps {
  onUseTemplate: () => void;
  onStartFromScratch: () => void;
}

const TemplateActions = ({ onUseTemplate, onStartFromScratch }: TemplateActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={onUseTemplate}>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <GanttChart className="h-8 w-8 mb-4" />
          <h3 className="font-medium mb-1">View all templates</h3>
          <p className="text-sm text-muted-foreground">Premade templates for everything</p>
        </CardContent>
      </Card>
      
      <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={onStartFromScratch}>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Database className="h-8 w-8 mb-4" />
          <h3 className="font-medium mb-1">Start from scratch</h3>
          <p className="text-sm text-muted-foreground">Build your own custom workflow</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateActions;
