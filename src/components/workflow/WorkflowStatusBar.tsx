import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

const WorkflowStatusBar: React.FC = () => {
  const { selectedNode, workflow } = useWorkflowStore();
  
  return (
    <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 flex items-center justify-between text-sm">
      <div className="flex items-center space-x-4">
        <div className="text-gray-400">
          {workflow.nodes.length} nodes, {workflow.edges.length} connections
        </div>
        {selectedNode && (
          <div className="text-gray-300">
            Selected: {selectedNode.data.name}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-gray-400">
          Last saved: {new Date().toLocaleTimeString()}
        </div>
        <div className="text-green-500">
          Auto-save enabled
        </div>
      </div>
    </div>
  );
};

export default WorkflowStatusBar; 