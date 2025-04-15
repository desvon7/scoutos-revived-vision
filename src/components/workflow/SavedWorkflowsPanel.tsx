
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SavedWorkflowsPanelProps {
  savedWorkflows: Record<string, any>;
  onClose: () => void;
  onLoadWorkflow: (name: string) => void;
}

export const SavedWorkflowsPanel: React.FC<SavedWorkflowsPanelProps> = ({
  savedWorkflows,
  onClose,
  onLoadWorkflow
}) => {
  return (
    <div className="absolute right-4 top-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[80vh] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Saved Workflows</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-y-auto p-3 flex-1">
        {Object.keys(savedWorkflows).length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No saved workflows
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(savedWorkflows).map(([name, workflow]) => (
              <button
                key={name}
                className="w-full text-left rounded-md hover:bg-gray-50 transition-colors duration-200 border border-gray-200 p-3"
                onClick={() => onLoadWorkflow(name)}
              >
                <div className="font-medium">{name}</div>
                <div className="text-sm text-gray-500">
                  {workflow.timestamp ? 
                    new Date(workflow.timestamp).toLocaleString() : 
                    "No timestamp"}
                </div>
                <div className="text-xs text-gray-400">
                  {workflow.nodes?.length || 0} nodes, {workflow.connections?.length || 0} connections
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
