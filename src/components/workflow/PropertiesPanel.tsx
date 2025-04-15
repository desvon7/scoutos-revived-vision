import React from 'react';
import { PropertiesPanelProps, NodeType } from './types';
import { useWorkflowStore } from './store';
import { nodeTypes } from './nodeRegistry';

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedNodeId, 
  onUpdate, 
  onDelete 
}) => {
  const nodes = useWorkflowStore(state => state.nodes);
  const selectedNode = selectedNodeId ? nodes.find(node => node.id === selectedNodeId) : null;
  
  if (!selectedNode) {
    return (
      <div className="w-80 border-l border-gray-700 bg-gray-800 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Properties</h2>
        <div className="text-gray-400 text-center mt-8">
          Select a node to view and edit its properties
        </div>
      </div>
    );
  }
  
  const metadata = nodeTypes[selectedNode.type as NodeType];
  
  return (
    <div className="w-80 border-l border-gray-700 bg-gray-800 p-4 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Properties</h2>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
          onClick={() => onDelete(selectedNode.id)}
        >
          Delete
        </button>
      </div>
      
      {/* Node information */}
      <div className="mb-6 border-b border-gray-700 pb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Node ID
          </label>
          <input
            type="text"
            value={selectedNode.id}
            disabled
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Label
          </label>
          <input
            type="text"
            value={selectedNode.data.label || ''}
            onChange={(e) => onUpdate(selectedNode.id, { 
              data: { ...selectedNode.data, label: e.target.value } 
            })}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Type
          </label>
          <div className="text-white text-sm bg-gray-700 border border-gray-600 rounded px-3 py-2">
            {selectedNode.type}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Position
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">X</label>
              <input
                type="number"
                value={selectedNode.x}
                onChange={(e) => onUpdate(selectedNode.id, { 
                  x: parseInt(e.target.value) || 0,
                  position: { x: parseInt(e.target.value) || 0, y: selectedNode.y }
                })}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">Y</label>
              <input
                type="number"
                value={selectedNode.y}
                onChange={(e) => onUpdate(selectedNode.id, { 
                  y: parseInt(e.target.value) || 0,
                  position: { x: selectedNode.x, y: parseInt(e.target.value) || 0 }
                })}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Node type specific settings */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-white mb-3">Settings</h3>
        
        {selectedNode.type === NodeType.TEXT_INPUT && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Text Content
            </label>
            <textarea
              value={selectedNode.data.config?.text || ''}
              onChange={(e) => onUpdate(selectedNode.id, { 
                data: { 
                  ...selectedNode.data, 
                  config: { 
                    ...selectedNode.data.config, 
                    text: e.target.value 
                  } 
                } 
              })}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white h-32 resize-none"
            />
          </div>
        )}
        
        {(selectedNode.type === NodeType.GPT_4 || 
          selectedNode.type === NodeType.GPT_35_TURBO || 
          selectedNode.type === NodeType.CLAUDE_3_OPUS) && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Model
              </label>
              <select
                value={selectedNode.data.config?.model || ''}
                onChange={(e) => onUpdate(selectedNode.id, { 
                  data: { 
                    ...selectedNode.data, 
                    config: { 
                      ...selectedNode.data.config, 
                      model: e.target.value 
                    } 
                  } 
                })}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Temperature
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedNode.data.config?.temperature || 0.7}
                onChange={(e) => onUpdate(selectedNode.id, { 
                  data: { 
                    ...selectedNode.data, 
                    config: { 
                      ...selectedNode.data.config, 
                      temperature: parseFloat(e.target.value) 
                    } 
                  } 
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0 (Precise)</span>
                <span>{selectedNode.data.config?.temperature || 0.7}</span>
                <span>1 (Creative)</span>
              </div>
            </div>
          </>
        )}
        
        {selectedNode.type === NodeType.JAVASCRIPT && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Code
            </label>
            <textarea
              value={selectedNode.data.config?.code || '// Your code here\nreturn input;'}
              onChange={(e) => onUpdate(selectedNode.id, { 
                data: { 
                  ...selectedNode.data, 
                  config: { 
                    ...selectedNode.data.config, 
                    code: e.target.value 
                  } 
                } 
              })}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white h-64 resize-none font-mono"
            />
          </div>
        )}
      </div>
      
      {/* Input and output ports */}
      <div className="mb-4">
        <h3 className="text-md font-medium text-white mb-3">Ports</h3>
        
        {selectedNode.data.inputs && selectedNode.data.inputs.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Inputs</h4>
            <div className="space-y-2">
              {selectedNode.data.inputs.map((input, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                  <div className="text-sm text-white">{input.name}</div>
                  <div className="text-xs text-gray-400">{input.type}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {selectedNode.data.outputs && selectedNode.data.outputs.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Outputs</h4>
            <div className="space-y-2">
              {selectedNode.data.outputs.map((output, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                  <div className="text-sm text-white">{output.name}</div>
                  <div className="text-xs text-gray-400">{output.type}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
