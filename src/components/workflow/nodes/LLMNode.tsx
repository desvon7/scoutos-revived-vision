import React from 'react';
import { Handle, Position } from 'reactflow';
import { useWorkflowStore } from '../store';
import { NodeType } from '../../../types/nodes';

const LLMNode: React.FC<any> = ({ id, data }) => {
  const { updateNode } = useWorkflowStore();

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateNode(id, {
      data: {
        ...data,
        config: {
          ...data.config,
          model: e.target.value,
        },
      },
    });
  };

  return (
    <div className="bg-teal-900 rounded-lg p-4 min-w-[200px]">
      <div className="font-medium text-white mb-2">{data.label || 'LLM Model'}</div>

      <div className="mb-3">
        <label className="block text-xs text-gray-300 mb-1">Model</label>
        <select
          value={data.config?.model || 'gpt-4'}
          onChange={handleModelChange}
          className="w-full bg-teal-950 text-white rounded border border-teal-700 px-2 py-1 text-sm"
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
        </select>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="w-2 h-2 bg-blue-400 border-2 border-teal-900"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="w-2 h-2 bg-green-400 border-2 border-teal-900"
      />
    </div>
  );
};

export default LLMNode;
