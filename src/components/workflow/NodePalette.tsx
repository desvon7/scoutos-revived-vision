import React from 'react';
import { 
  TextIcon,
  SendIcon,
  BrainIcon,
  GitBranchIcon,
  RepeatIcon,
  WandIcon,
  GlobeIcon,
  DatabaseIcon
} from 'lucide-react';
import { NodeType } from './types';

const nodeTypes = [
  {
    type: 'input' as NodeType,
    label: 'Input',
    description: 'Input node for receiving data',
    icon: <TextIcon className="w-4 h-4" />
  },
  {
    type: 'output' as NodeType,
    label: 'Output',
    description: 'Output node for sending data',
    icon: <SendIcon className="w-4 h-4" />
  },
  {
    type: 'llm' as NodeType,
    label: 'LLM',
    description: 'Language model for text generation',
    icon: <BrainIcon className="w-4 h-4" />
  },
  {
    type: 'condition' as NodeType,
    label: 'Condition',
    description: 'Conditional branching node',
    icon: <GitBranchIcon className="w-4 h-4" />
  },
  {
    type: 'loop' as NodeType,
    label: 'Loop',
    description: 'Loop through data',
    icon: <RepeatIcon className="w-4 h-4" />
  },
  {
    type: 'transform' as NodeType,
    label: 'Transform',
    description: 'Transform data between formats',
    icon: <WandIcon className="w-4 h-4" />
  },
  {
    type: 'api' as NodeType,
    label: 'API',
    description: 'Make API requests',
    icon: <GlobeIcon className="w-4 h-4" />
  },
  {
    type: 'data' as NodeType,
    label: 'Data',
    description: 'Data storage and retrieval',
    icon: <DatabaseIcon className="w-4 h-4" />
  }
];

interface NodePaletteProps {
  onDragStart: (type: NodeType) => void;
}

const NodePalette = ({ onDragStart }: NodePaletteProps) => {
  return (
    <div className="bg-background p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Node Types</h3>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-grab"
            draggable
            onDragStart={() => onDragStart(nodeType.type)}
          >
            {nodeType.icon}
            <div>
              <div className="font-medium">{nodeType.label}</div>
              <div className="text-sm text-muted-foreground">{nodeType.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NodePalette };
