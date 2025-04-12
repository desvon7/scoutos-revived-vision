
import React from 'react';
import { X, Trash2 } from 'lucide-react';

interface PanelLayoutProps {
  title?: string;
  onClose: () => void;
  onDelete?: (id: string) => void;
  nodeId: string;
  children: React.ReactNode;
  nodeType: string;
}

export const PanelLayout: React.FC<PanelLayoutProps> = ({ 
  title = 'Node Properties',
  onClose, 
  onDelete, 
  nodeId, 
  children,
  nodeType
}) => {
  return (
    <div className="absolute right-4 top-4 bg-neutral-900 p-4 rounded-md shadow-lg w-64 border border-neutral-700 z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-sm font-medium">{title}</h3>
        <button 
          className="text-neutral-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="mb-3 pb-3 border-b border-neutral-700">
        <div className="text-xs text-neutral-400 mb-1">Type</div>
        <div className="text-sm text-white">{nodeType}</div>
      </div>
      
      {children}
      
      {onDelete && (
        <div className="mt-5 pt-3 border-t border-neutral-700">
          <button
            className="flex items-center text-red-500 hover:text-red-400 text-sm"
            onClick={() => onDelete(nodeId)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Node
          </button>
        </div>
      )}
    </div>
  );
};
