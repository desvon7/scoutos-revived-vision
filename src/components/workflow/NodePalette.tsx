
import React from 'react';
import { NodeType } from './types';
import { useWorkflowStore } from './store';
import { Input, Output, Cpu, GitBranch, Repeat, FileCode, Globe, Database } from 'lucide-react';

const NODE_TYPES: { type: NodeType; label: string; description: string; icon: React.ElementType }[] = [
  {
    type: 'input',
    label: 'Input',
    description: 'Input data source',
    icon: Input,
  },
  {
    type: 'output',
    label: 'Output',
    description: 'Output destination',
    icon: Output,
  },
  {
    type: 'llm',
    label: 'LLM',
    description: 'Large Language Model',
    icon: Cpu,
  },
  {
    type: 'condition',
    label: 'Condition',
    description: 'Conditional logic',
    icon: GitBranch,
  },
  {
    type: 'loop',
    label: 'Loop',
    description: 'Loop control',
    icon: Repeat,
  },
  {
    type: 'transform',
    label: 'Transform',
    description: 'Data transformation',
    icon: FileCode,
  },
  {
    type: 'api',
    label: 'API',
    description: 'API integration',
    icon: Globe,
  },
  {
    type: 'data',
    label: 'Data',
    description: 'Data operation',
    icon: Database,
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
            <div className="flex items-center gap-2 mb-1">
              <node.icon className="h-4 w-4 text-white" />
              <h3 className="text-white font-medium">{node.label}</h3>
            </div>
            <p className="text-gray-400 text-sm">{node.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodePalette;
