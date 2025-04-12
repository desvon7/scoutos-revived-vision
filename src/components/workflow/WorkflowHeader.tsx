
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Play, ArrowLeft } from 'lucide-react';

interface WorkflowHeaderProps {
  workflowName: string;
  onWorkflowNameChange: (name: string) => void;
  onSave: () => void;
  onRun: () => void;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ 
  workflowName, 
  onWorkflowNameChange, 
  onSave, 
  onRun 
}) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-between items-center mb-4 p-2 bg-neutral-800 rounded-md">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white mr-2"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Input
          className="w-64 bg-neutral-700 border border-neutral-600 text-white"
          placeholder="Untitled Workflow"
          value={workflowName}
          onChange={(e) => onWorkflowNameChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          className="flex items-center"
          onClick={onSave}
        >
          <Save className="text-white h-4 w-4 mr-1" />
          Save
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center"
          onClick={onRun}
        >
          <Play className="text-white h-4 w-4 mr-1" />
          Run
        </Button>
      </div>
    </div>
  );
};
