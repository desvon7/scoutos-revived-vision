import React from 'react';
import { useWorkflowStore } from './store';

const PropertiesPanel: React.FC = () => {
  const { workflow, selectedNode, updateNodeData } = useWorkflowStore();
  
  const selectedNodeData = selectedNode
    ? workflow.nodes.find((node) => node.id === selectedNode)
    : null;
  
  if (!selectedNodeData) {
    return (
      <div className="properties-panel w-64 bg-gray-800 border-l border-gray-700 p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">Properties</h2>
        <p className="text-gray-400">Select a node to edit its properties</p>
      </div>
    );
  }
  
  const handlePropertyChange = (key: string, value: any) => {
    if (selectedNode) {
      updateNodeData(selectedNode, { [key]: value });
    }
  };
  
  return (
    <div className="properties-panel w-64 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-white">Properties</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Node Type
          </label>
          <div className="text-gray-400">{selectedNodeData.type}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Node ID
          </label>
          <div className="text-gray-400">{selectedNodeData.id}</div>
        </div>
        
        {Object.entries(selectedNodeData.data || {}).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {typeof value === 'string' && (
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            )}
            {typeof value === 'number' && (
              <input
                type="number"
                value={value}
                onChange={(e) => handlePropertyChange(key, Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            )}
            {typeof value === 'boolean' && (
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handlePropertyChange(key, e.target.checked)}
                className="bg-gray-700 border border-gray-600 rounded"
              />
            )}
            {Array.isArray(value) && (
              <div className="space-y-2">
                {value.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newArray = [...value];
                      newArray[index] = e.target.value;
                      handlePropertyChange(key, newArray);
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                ))}
                <button
                  onClick={() => handlePropertyChange(key, [...value, ''])}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  + Add Item
                </button>
              </div>
            )}
            {typeof value === 'object' && !Array.isArray(value) && value !== null && (
              <div className="space-y-2">
                {Object.entries(value).map(([subKey, subValue]) => (
                  <div key={subKey} className="ml-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {subKey}
                    </label>
                    <input
                      type="text"
                      value={subValue as string}
                      onChange={(e) =>
                        handlePropertyChange(key, {
                          ...value,
                          [subKey]: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPanel; 