import React from 'react';
import { Handle, Position } from 'reactflow';
import { useWorkflowStore } from '../store';

const JavaScriptNode: React.FC<any> = ({ id, data }) => {
  const { updateNode } = useWorkflowStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNode(id, {
      data: {
        ...data,
        config: {
          ...data.config,
          code: e.target.value,
        },
      },
    });
  };

  return (
    <div className="bg-yellow-800 rounded-lg p-4 min-w-[250px]">
      <div className="font-medium text-white mb-2">{data.label || 'JavaScript'}</div>

      <div className="mb-3">
        <textarea
          value={data.config?.code || '// Enter your code here\nreturn input;'}
          onChange={handleChange}
          className="w-full bg-yellow-950 text-white font-mono rounded border border-yellow-700 px-2 py-1 text-sm h-32 resize-none"
        />
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="w-2 h-2 bg-blue-400 border-2 border-yellow-800"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="w-2 h-2 bg-green-400 border-2 border-yellow-800"
      />
    </div>
  );
};

export default JavaScriptNode;
