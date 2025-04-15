import React from 'react';
import { Plus, ZoomIn, ZoomOut, Save, Upload } from 'lucide-react';

interface WorkflowToolbarProps {
  currentWorkflowName: string | undefined;
  onAddNode: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSave: () => void;
  onLoadWorkflow: () => void;
  onRun: () => void;
}

export const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  currentWorkflowName,
  onAddNode,
  onZoomIn,
  onZoomOut,
  onSave,
  onLoadWorkflow,
  onRun,
}) => {
  return (
    <div className="flex justify-between items-center mt-4 p-2 bg-neutral-800 rounded-md">
      <div className="flex gap-2">
        <button
          className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
          onClick={onAddNode}
          title="Add node"
        >
          <Plus className="text-white h-4 w-4" />
        </button>
        <button
          className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
          onClick={onZoomIn}
          title="Zoom in"
        >
          <ZoomIn className="text-white h-4 w-4" />
        </button>
        <button
          className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
          onClick={onZoomOut}
          title="Zoom out"
        >
          <ZoomOut className="text-white h-4 w-4" />
        </button>
        <button
          className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
          onClick={onSave}
          title="Save workflow"
        >
          <Save className="text-white h-4 w-4" />
        </button>
        <button
          className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
          onClick={onLoadWorkflow}
          title="Load workflow"
        >
          <Upload className="text-white h-4 w-4" />
        </button>
      </div>
      <div>
        {currentWorkflowName && (
          <span className="text-neutral-400 text-xs mr-2">{currentWorkflowName}</span>
        )}
        <button className="px-3 py-1 bg-primary rounded-md text-white text-xs" onClick={onRun}>
          Run
        </button>
      </div>
    </div>
  );
};
