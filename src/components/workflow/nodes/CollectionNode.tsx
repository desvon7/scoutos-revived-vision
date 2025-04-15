import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';

const CollectionNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="relative rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="bg-purple-600 text-white p-2 rounded-t-lg">
        <div className="text-sm font-medium">Collection</div>
      </div>
      <div className="p-3">
        <div className="text-sm font-medium">{data.label}</div>
        <div className="text-xs text-neutral-500 mt-1">
          {data.collection || 'Select a collection'}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-purple-500"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-purple-500"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CollectionNode;
