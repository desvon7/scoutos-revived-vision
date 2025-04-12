
import React from 'react';
import { X } from 'lucide-react';
import { NodeTemplate } from './nodeTemplates';

interface NodePanelProps {
  templates: NodeTemplate[];
  onClose: () => void;
  onSelectNode: (type: NodeTemplate['type'], title: NodeTemplate['title']) => void;
}

export const NodePanel: React.FC<NodePanelProps> = ({ templates, onClose, onSelectNode }) => {
  return (
    <div className="absolute left-4 top-4 bg-neutral-800 p-4 rounded-md shadow-lg w-60 z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-sm font-medium">Add Node</h3>
        <button 
          className="text-neutral-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-2">
        {templates.map((template, index) => (
          <div 
            key={index}
            className="p-2 bg-neutral-700 rounded-md hover:bg-neutral-600 cursor-pointer"
            onClick={() => onSelectNode(template.type, template.title)}
          >
            <div className="text-white text-sm font-medium">{template.title}</div>
            <div className="text-neutral-400 text-xs">{template.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
