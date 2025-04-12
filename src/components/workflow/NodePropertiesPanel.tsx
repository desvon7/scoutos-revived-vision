
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { NodeObject, NodeData } from './types';

interface NodePropertiesPanelProps {
  node: NodeObject;
  onClose: () => void;
  onPropertyChange: (id: string, data: Partial<NodeData>) => void;
  onDeleteNode: (id: string) => void;
}

export const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({ 
  node, 
  onClose, 
  onPropertyChange, 
  onDeleteNode 
}) => {
  // Initialize node data with defaults if it doesn't exist
  const nodeData = node.data || {};
  
  const handleChange = (key: keyof NodeData, value: any) => {
    onPropertyChange(node.id, { [key]: value });
  };

  return (
    <div className="absolute right-4 top-4 bg-neutral-800 p-4 rounded-md shadow-lg w-72">
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
          <Label className="text-neutral-400 text-xs mb-1">Title</Label>
          <Input 
            type="text" 
            className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
            value={node.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        
        <div>
          <Label className="text-neutral-400 text-xs mb-1">Type</Label>
          <div className="text-white text-sm">
            {node.type}
          </div>
        </div>
        
        {/* Node-specific properties */}
        {node.type === 'llm' && (
          <>
            <div>
              <Label className="text-neutral-400 text-xs mb-1">Model</Label>
              <select
                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
                value={nodeData.model || ''}
                onChange={(e) => handleChange('model', e.target.value)}
              >
                <option value="">Select a model</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              </select>
            </div>
            <div>
              <Label className="text-neutral-400 text-xs mb-1">System Prompt</Label>
              <Textarea
                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
                rows={3}
                value={nodeData.systemPrompt || ''}
                onChange={(e) => handleChange('systemPrompt', e.target.value)}
                placeholder="You are a helpful assistant..."
              />
            </div>
            <div>
              <Label className="text-neutral-400 text-xs mb-1">Temperature ({nodeData.temperature || 0.7})</Label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  className="w-full bg-neutral-700"
                  value={nodeData.temperature || 0.7}
                  onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </>
        )}
        
        {node.type === 'memory' && (
          <div>
            <Label className="text-neutral-400 text-xs mb-1">Memory Type</Label>
            <select
              className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
              value={nodeData.memoryType || ''}
              onChange={(e) => handleChange('memoryType', e.target.value)}
            >
              <option value="">Select memory type</option>
              <option value="conversation">Conversation History</option>
              <option value="vector">Vector Store</option>
              <option value="redis">Redis</option>
              <option value="file">File Storage</option>
            </select>
          </div>
        )}
        
        {node.type === 'process' && (
          <div>
            <Label className="text-neutral-400 text-xs mb-1">Process Type</Label>
            <select
              className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
              value={nodeData.processType || ''}
              onChange={(e) => handleChange('processType', e.target.value)}
            >
              <option value="">Select process type</option>
              <option value="transform">Transform Data</option>
              <option value="filter">Filter Data</option>
              <option value="extract">Extract Information</option>
              <option value="combine">Combine Data</option>
            </select>
          </div>
        )}

        {node.type === 'input' && (
          <div>
            <Label className="text-neutral-400 text-xs mb-1">Input Name</Label>
            <Input
              type="text" 
              className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
              value={nodeData.inputName || ''}
              onChange={(e) => handleChange('inputName', e.target.value)}
              placeholder="user_message"
            />
          </div>
        )}

        {node.type === 'output' && (
          <div>
            <Label className="text-neutral-400 text-xs mb-1">Output Name</Label>
            <Input
              type="text" 
              className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
              value={nodeData.outputName || ''}
              onChange={(e) => handleChange('outputName', e.target.value)}
              placeholder="assistant_message"
            />
          </div>
        )}
        
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
