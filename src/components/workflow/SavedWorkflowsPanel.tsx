
import React from 'react';
import { X } from 'lucide-react';
import { WorkflowData } from './types';

interface SavedWorkflowsPanelProps {
  savedWorkflows: Record<string, WorkflowData>;
  onClose: () => void;
  onLoadWorkflow: (name: string) => void;
}

export const SavedWorkflowsPanel: React.FC<SavedWorkflowsPanelProps> = ({ 
  savedWorkflows, 
  onClose, 
  onLoadWorkflow 
}) => {
  return (
    <div className="absolute left-4 top-4 bg-neutral-800 p-4 rounded-md shadow-lg w-60 z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-sm font-medium">Load Workflow</h3>
        <button 
          className="text-neutral-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {Object.entries(savedWorkflows).length === 0 ? (
          <div className="text-neutral-400 text-xs">No saved workflows</div>
        ) : (
          Object.entries(savedWorkflows).map(([name, workflow]) => (
            <div 
              key={name}
              className="p-2 bg-neutral-700 rounded-md hover:bg-neutral-600 cursor-pointer"
              onClick={() => onLoadWorkflow(name)}
            >
              <div className="text-white text-sm font-medium">{name}</div>
              <div className="text-neutral-400 text-xs">
                {new Date(workflow.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
