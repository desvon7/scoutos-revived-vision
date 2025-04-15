import React from 'react';
import { NodeType } from './types';
import { useWorkflowStore } from './store';

const NODE_TYPES: { type: NodeType; label: string; description: string }[] = [
  {
    type: 'input',
    label: 'Input',
    description: 'Input data source',
  },
  {
    type: 'output',
    label: 'Output',
    description: 'Output destination',
  },
  {
    type: 'llm',
    label: 'LLM',
    description: 'Large Language Model',
  },
  {
    type: 'condition',
    label: 'Condition',
    description: 'Conditional logic',
  },
  {
    type: 'loop',
    label: 'Loop',
    description: 'Loop control',
  },
  {
    type: 'transform',
    label: 'Transform',
    description: 'Data transformation',
  },
  {
    type: 'api',
    label: 'API',
    description: 'API integration',
  },
  {
    type: 'data',
    label: 'Data',
    description: 'Data operation',
  },
];

const NodePalette: React.FC = () => {
  const { addNode } = useWorkflowStore();

  const handleDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="node-palette w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-white">Nodes</h2>
      <div className="space-y-2">
        {NODE_TYPES.map((node) => (
          <div
            key={node.type}
            className="node-item bg-gray-700 p-3 rounded cursor-move hover:bg-gray-600 transition-colors"
            draggable
            onDragStart={(e) => handleDragStart(e, node.type)}
          >
            <h3 className="text-white font-medium">{node.label}</h3>
            <p className="text-gray-400 text-sm">{node.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodePalette; 