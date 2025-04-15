import React from 'react';
import {
  TextIcon,
  Send as SendIcon,
  Brain as BrainIcon,
  GitBranch as GitBranchIcon,
  Repeat as RepeatIcon,
  Wand2 as WandIcon,
  Globe as GlobeIcon,
  Database as DatabaseIcon,
} from 'lucide-react';
import { NodeType } from './types';
import { NodePaletteProps } from './types';

// Node types by category for the palette
const nodeGroups = [
  {
    title: 'Input',
    items: [
      { type: NodeType.TEXT_INPUT, label: 'Text Input', icon: <TextIcon className="w-4 h-4" /> },
      { type: NodeType.URL_INPUT, label: 'URL Input', icon: <GlobeIcon className="w-4 h-4" /> },
      { type: NodeType.JSON_INPUT, label: 'JSON Input', icon: <TextIcon className="w-4 h-4" /> },
    ],
  },
  {
    title: 'LLM Models',
    items: [
      { type: NodeType.GPT_4, label: 'GPT-4', icon: <BrainIcon className="w-4 h-4" /> },
      {
        type: NodeType.GPT_35_TURBO,
        label: 'GPT-3.5 Turbo',
        icon: <BrainIcon className="w-4 h-4" />,
      },
      {
        type: NodeType.CLAUDE_3_OPUS,
        label: 'Claude 3 Opus',
        icon: <BrainIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    title: 'Logic',
    items: [
      { type: NodeType.CONDITION, label: 'Condition', icon: <GitBranchIcon className="w-4 h-4" /> },
      { type: NodeType.LOOP, label: 'Loop', icon: <RepeatIcon className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Processing',
    items: [
      { type: NodeType.JAVASCRIPT, label: 'JavaScript', icon: <WandIcon className="w-4 h-4" /> },
      { type: NodeType.PYTHON, label: 'Python', icon: <WandIcon className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Data',
    items: [
      {
        type: NodeType.COLLECTION,
        label: 'Collection',
        icon: <DatabaseIcon className="w-4 h-4" />,
      },
      { type: NodeType.VECTOR_DB, label: 'Vector DB', icon: <DatabaseIcon className="w-4 h-4" /> },
    ],
  },
];

const NodePalette: React.FC<NodePaletteProps> = ({ onDragStart }) => {
  return (
    <div className="w-64 border-r border-gray-700 bg-gray-800 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">Node Palette</h2>

        {nodeGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase mb-2">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-2 p-2 bg-gray-700 rounded-md cursor-grab hover:bg-gray-600 transition-colors"
                  draggable
                  onDragStart={() => onDragStart(item.type)}
                >
                  <div className="flex-shrink-0 text-blue-400">{item.icon}</div>
                  <div className="text-sm font-medium text-white">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodePalette;
