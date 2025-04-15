
import React from 'react';
import { useWorkflowStore } from './store';
import { NodeData } from './types';

interface PropertiesPanelProps {
  selectedNodeId: string | null;
  onUpdate: (id: string, data: NodeData) => void;
  onDelete: (id: string) => void;
}

export function PropertiesPanel({ selectedNodeId, onUpdate, onDelete }: PropertiesPanelProps) {
  const nodes = useWorkflowStore((state) => state.nodes);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">No node selected</p>
      </div>
    );
  }

  const handleConfigChange = (key: string, value: any) => {
    const updatedData = {
      ...selectedNode.data,
      config: {
        ...(selectedNode.data.config || {}),
        [key]: value
      }
    };
    onUpdate(selectedNode.id, updatedData);
  };

  const renderConfigFields = () => {
    switch (selectedNode.type) {
      case 'input':
        return (
          <>
            <label className="block mb-2">
              Input Type
              <select
                className="w-full p-2 rounded-md bg-background"
                value={selectedNode.data.config?.inputType || 'text'}
                onChange={(e) => handleConfigChange('inputType', e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="file">File</option>
              </select>
            </label>
            <label className="block mb-2">
              Default Value
              <input
                type="text"
                className="w-full p-2 rounded-md bg-background"
                value={selectedNode.data.config?.defaultValue || ''}
                onChange={(e) => handleConfigChange('defaultValue', e.target.value)}
              />
            </label>
          </>
        );

      case 'llm':
        return (
          <>
            <label className="block mb-2">
              Model
              <select
                className="w-full p-2 rounded-md bg-background"
                value={selectedNode.data.config?.model || 'gpt-4'}
                onChange={(e) => handleConfigChange('model', e.target.value)}
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
              </select>
            </label>
            <label className="block mb-2">
              Temperature
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                className="w-full"
                value={selectedNode.data.config?.temperature || 0.7}
                onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
              />
            </label>
          </>
        );

      case 'api':
        return (
          <>
            <label className="block mb-2">
              URL
              <input
                type="text"
                className="w-full p-2 rounded-md bg-background"
                value={selectedNode.data.config?.url || ''}
                onChange={(e) => handleConfigChange('url', e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Method
              <select
                className="w-full p-2 rounded-md bg-background"
                value={selectedNode.data.config?.method || 'GET'}
                onChange={(e) => handleConfigChange('method', e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </label>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{selectedNode.title}</h3>
        <button
          className="text-destructive hover:text-destructive/80"
          onClick={() => onDelete(selectedNode.id)}
        >
          Delete
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Configuration</h4>
          {renderConfigFields()}
        </div>

        <div>
          <h4 className="font-medium mb-2">Status</h4>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              selectedNode.data.state === 'completed' ? 'bg-green-500' :
              selectedNode.data.state === 'running' ? 'bg-blue-500' :
              selectedNode.data.state === 'error' ? 'bg-red-500' :
              'bg-gray-500'
            }`} />
            <span className="capitalize">{selectedNode.data.state || 'idle'}</span>
          </div>
          {selectedNode.data.error && (
            <p className="text-sm text-destructive mt-2">{selectedNode.data.error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
