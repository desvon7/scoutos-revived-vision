
import React from 'react';
import { X, Trash } from 'lucide-react';
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
    const { name, value } = e.target;
    onPropertyChange(node.id, { [name]: value });
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onPropertyChange(node.id, { [name]: parseFloat(value) });
  };

  return (
    <div className="absolute top-20 right-4 w-64 bg-neutral-800 rounded-md shadow-xl p-4 border border-neutral-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-medium">Node Properties</h3>
        <button 
          onClick={onClose}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-neutral-400 text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={node.title}
            onChange={handleChange}
            className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Node Type (read-only) */}
        <div>
          <label className="block text-neutral-400 text-sm mb-1">Type</label>
          <input
            type="text"
            value={node.type}
            readOnly
            className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md opacity-70"
          />
        </div>
        
        {/* Position X and Y */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-neutral-400 text-sm mb-1">X</label>
            <input
              type="number"
              name="x"
              value={node.x}
              onChange={handleNumericChange}
              className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Y</label>
            <input
              type="number"
              name="y"
              value={node.y}
              onChange={handleNumericChange}
              className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* LLM Node properties */}
        {node.type === 'llm' && (
          <>
            <div>
              <label className="block text-neutral-400 text-sm mb-1">Model</label>
              <select
                name="model"
                value={node.data?.model || 'gpt-4o'}
                onChange={handleChange}
                className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 text-sm mb-1">Temperature</label>
              <input
                type="range"
                name="temperature"
                min="0"
                max="1"
                step="0.1"
                value={node.data?.temperature || 0.7}
                onChange={handleNumericChange}
                className="w-full"
              />
              <div className="text-center text-neutral-400 text-sm">
                {node.data?.temperature || 0.7}
              </div>
            </div>
          </>
        )}
        
        {/* Memory Node properties */}
        {node.type === 'memory' && (
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Memory Type</label>
            <select
              name="memoryType"
              value={node.data?.memoryType || 'conversation'}
              onChange={handleChange}
              className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="conversation">Conversation</option>
              <option value="buffer">Buffer</option>
              <option value="summary">Summary</option>
            </select>
          </div>
        )}
        
        {/* Process Node properties */}
        {node.type === 'process' && (
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Process Type</label>
            <select
              name="processType"
              value={node.data?.processType || 'transform'}
              onChange={handleChange}
              className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="transform">Transform</option>
              <option value="extract">Extract</option>
              <option value="filter">Filter</option>
              <option value="merge">Merge</option>
            </select>
          </div>
        )}
        
        {/* Input Node properties */}
        {node.type === 'input' && (
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Input Name</label>
            <input
              type="text"
              name="inputName"
              value={node.data?.inputName || 'user_input'}
              onChange={handleChange}
              className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}
        
        {/* Output Node properties */}
        {node.type === 'output' && (
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Output Name</label>
            <input
              type="text"
              name="outputName"
              value={node.data?.outputName || 'result'}
              onChange={handleChange}
              className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}
        
        {/* Collection Node properties */}
        {node.type === 'collection' && (
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Collection ID</label>
            <input
              type="text"
              name="collectionId"
              value={node.data?.collectionId || ''}
              onChange={handleChange}
              className="w-full bg-neutral-700 border border-neutral-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}
        
        {/* Delete Button */}
        <button
          onClick={() => onDeleteNode(node.id)}
          className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded-md mt-4 flex items-center justify-center"
        >
          <Trash size={16} className="mr-2" /> Delete Node
        </button>
      </div>
    </div>
  );
};
