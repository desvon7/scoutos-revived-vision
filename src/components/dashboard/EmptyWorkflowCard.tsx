
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyWorkflowCardProps {
  onClick: () => void;
}

const EmptyWorkflowCard = ({ onClick }: EmptyWorkflowCardProps) => {
  return (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
        <Plus className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Create a new workflow</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Start building your custom AI workflow from scratch
        </p>
        <Button>Create Workflow</Button>
      </CardContent>
    </Card>
  );
};

export default EmptyWorkflowCard;
