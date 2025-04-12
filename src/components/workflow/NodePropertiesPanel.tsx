
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NodeObject } from './types';

interface NodePropertiesPanelProps {
  node: NodeObject;
  onClose: () => void;
  onTitleChange: (id: string, title: string) => void;
  onDeleteNode: (id: string) => void;
}

export const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({ 
  node, 
  onClose, 
  onTitleChange, 
  onDeleteNode 
}) => {
  return (
    <div className="absolute right-4 top-4 bg-neutral-800 p-4 rounded-md shadow-lg w-60">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-sm font-medium">Node Properties</h3>
        <button 
          className="text-neutral-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-neutral-400 text-xs mb-1">Title</label>
          <input 
            type="text" 
            className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
            value={node.title}
            onChange={(e) => onTitleChange(node.id, e.target.value)}
          />
        </div>
        <div>
          <label className="block text-neutral-400 text-xs mb-1">Type</label>
          <div className="text-white text-sm">
            {node.type}
          </div>
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          className="w-full mt-2"
          onClick={() => onDeleteNode(node.id)}
        >
          Delete Node
        </Button>
      </div>
    </div>
  );
};
