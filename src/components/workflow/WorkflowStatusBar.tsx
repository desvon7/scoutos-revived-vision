import React from 'react';
import { useWorkflowStore } from './store';

const WorkflowStatusBar: React.FC = () => {
  const { nodes, edges, selectedNodeId } = useWorkflowStore();
  const selectedNode = selectedNodeId ? nodes.find((node) => node.id === selectedNodeId) : null;

  return (
    <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 flex items-center justify-between text-sm">
      <div className="flex items-center space-x-4">
        <div className="text-gray-400">
          {nodes.length} nodes, {edges.length} connections
        </div>
        {selectedNode && (
          <div className="text-gray-300">
            Selected: {selectedNode.data.label || selectedNode.title}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-gray-400">Last saved: {new Date().toLocaleTimeString()}</div>
        <div className="text-green-500">Auto-save enabled</div>
      </div>
    </div>
  );
};

export default WorkflowStatusBar;
