
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  title: string;
  onCreateTemplate: () => void;
  onCreateWorkflow: () => void;
}

const DashboardHeader = ({ 
  title, 
  onCreateTemplate, 
  onCreateWorkflow 
}: DashboardHeaderProps) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex space-x-2">
        <Button 
          className="flex items-center"
          onClick={onCreateTemplate}
          variant="secondary"
        >
          <Plus className="mr-2 h-4 w-4" /> New Template
        </Button>
        <Button 
          className="flex items-center"
          onClick={onCreateWorkflow}
        >
          <Plus className="mr-2 h-4 w-4" /> New Workflow
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
