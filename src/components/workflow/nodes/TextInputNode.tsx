import React from 'react';
import { Handle, Position } from 'reactflow';
import { useWorkflowStore } from '../store';

const TextInputNode: React.FC<any> = ({ id, data }) => {
  const { updateNode } = useWorkflowStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNode(id, {
      data: {
        ...data,
        config: {
          ...data.config,
          text: e.target.value,
        },
      },
    });
  };

  return (
    <div className="bg-green-900 rounded-lg p-4 min-w-[200px]">
      <div className="font-medium text-white mb-2">{data.label || 'Text Input'}</div>

      <div className="mb-3">
        <textarea
          value={data.config?.text || ''}
          onChange={handleChange}
          placeholder="Enter text..."
          className="w-full bg-green-950 text-white rounded border border-green-700 px-2 py-1 text-sm h-20 resize-none"
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="w-2 h-2 bg-green-400 border-2 border-green-900"
      />
    </div>
  );
};

export default TextInputNode;
