import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

const OutputNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="relative rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="bg-red-600 text-white p-2 rounded-t-lg">
        <div className="text-sm font-medium">Output</div>
      </div>
      <div className="p-3">
        <div className="text-sm font-medium">{data.label}</div>
        <div className="text-xs text-neutral-500 mt-1">{data.description || 'Final output'}</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-red-500"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default OutputNode;
