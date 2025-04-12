
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, GanttChart, Database } from 'lucide-react';

interface WorkflowCardProps {
  title: string;
  description: string;
  icon: 'ganttChart' | 'database';
  status: string;
  createdDate: string;
  executions: number;
}

const WorkflowCard = ({ 
  title, 
  description, 
  icon, 
  status, 
  createdDate, 
  executions 
}: WorkflowCardProps) => {
  const Icon = icon === 'ganttChart' ? GanttChart : Database;
  
  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="px-2 py-1 bg-secondary/20 text-xs rounded-full text-muted-foreground">
            {status}
          </div>
        </div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="mr-4">Created {createdDate}</span>
          <span>{executions} executions</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkflowCard;
