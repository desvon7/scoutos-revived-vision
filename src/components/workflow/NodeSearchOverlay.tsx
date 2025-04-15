import React, { useState, useRef, useEffect } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';

interface NodeSearchOverlayProps {
  onClose: () => void;
  onSelectNode: (type: string) => void;
}

const NodeSearchOverlay: React.FC<NodeSearchOverlayProps> = ({ onClose, onSelectNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { nodeTemplates } = useWorkflowStore();
  
  const filteredNodes = nodeTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter') {
      if (filteredNodes[selectedIndex]) {
        onSelectNode(filteredNodes[selectedIndex].type);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredNodes.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-700">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search nodes..."
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="overflow-y-auto flex-1">
          {filteredNodes.length === 0 ? (
            <div className="p-4 text-gray-400 text-center">
              No nodes found
            </div>
          ) : (
            <ul className="divide-y divide-gray-700">
              {filteredNodes.map((template, index) => (
                <li
                  key={template.type}
                  className={`p-4 cursor-pointer hover:bg-gray-700 ${
                    index === selectedIndex ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => onSelectNode(template.type)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        template.category === 'input' ? 'bg-green-500' :
                        template.category === 'llm' ? 'bg-teal-500' :
                        template.category === 'code' ? 'bg-yellow-500' :
                        template.category === 'logic' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`}>
                        {template.icon || template.name[0]}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium">{template.name}</div>
                      <div className="text-gray-400 text-sm">{template.description}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700 text-right">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeSearchOverlay; 