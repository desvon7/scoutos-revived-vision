
import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { NodeObject, NodeType } from './types';

interface NodePropertiesPanelProps {
  node: NodeObject;
  onClose: () => void;
  onPropertyChange: (id: string, data: any) => void;
  onDeleteNode: (id: string) => void;
}

export const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({ 
  node, 
  onClose, 
  onPropertyChange, 
  onDeleteNode 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    
    // Convert to number if needed
    if (type === 'number') {
      finalValue = parseFloat(value);
    }
    
    onPropertyChange(node.id, { [name]: finalValue });
  };
  
  const renderFields = () => {
    switch (node.type) {
      case 'input':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Input Name</label>
              <input
                type="text"
                name="inputName"
                value={node.data.inputName || ''}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={node.title || ''}
                onChange={(e) => onPropertyChange(node.id, { title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
          </div>
        );
        
      case 'llm':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Model</label>
              <select
                name="model"
                value={node.data.model || 'gpt-4o'}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              >
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Temperature</label>
              <input
                type="range"
                name="temperature"
                min="0"
                max="1"
                step="0.1"
                value={node.data.temperature || 0.7}
                onChange={handleChange}
                className="w-full"
              />
              <div className="text-xs text-neutral-400 text-right">
                {node.data.temperature || 0.7}
              </div>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={node.title || ''}
                onChange={(e) => onPropertyChange(node.id, { title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
          </div>
        );
        
      case 'collection':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Collection ID</label>
              <input
                type="text"
                name="collectionId"
                value={node.data.collectionId || ''}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={node.title || ''}
                onChange={(e) => onPropertyChange(node.id, { title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
          </div>
        );
        
      case 'memory':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Memory Type</label>
              <select
                name="memoryType"
                value={node.data.memoryType || 'conversation'}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              >
                <option value="conversation">Conversation</option>
                <option value="vector">Vector</option>
                <option value="buffer">Buffer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={node.title || ''}
                onChange={(e) => onPropertyChange(node.id, { title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
          </div>
        );
        
      case 'process':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Process Type</label>
              <select
                name="processType"
                value={node.data.processType || 'transform'}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              >
                <option value="transform">Transform</option>
                <option value="extract">Extract</option>
                <option value="filter">Filter</option>
                <option value="merge">Merge</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={node.title || ''}
                onChange={(e) => onPropertyChange(node.id, { title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
          </div>
        );
        
      case 'output':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Output Name</label>
              <input
                type="text"
                name="outputName"
                value={node.data.outputName || ''}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={node.title || ''}
                onChange={(e) => onPropertyChange(node.id, { title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Label</label>
              <input
                type="text"
                name="label"
                value={node.data.label || ''}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={node.title || ''}
                onChange={(e) => onPropertyChange(node.id, { title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
              />
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="absolute right-4 top-4 bg-neutral-900 p-4 rounded-md shadow-lg w-64 border border-neutral-700 z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-sm font-medium">Node Properties</h3>
        <button 
          className="text-neutral-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="mb-3 pb-3 border-b border-neutral-700">
        <div className="text-xs text-neutral-400 mb-1">Type</div>
        <div className="text-sm text-white">{node.type}</div>
      </div>
      
      {renderFields()}
      
      <div className="mt-5 pt-3 border-t border-neutral-700">
        <button
          className="flex items-center text-red-500 hover:text-red-400 text-sm"
          onClick={() => onDeleteNode(node.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Node
        </button>
      </div>
    </div>
  );
};
