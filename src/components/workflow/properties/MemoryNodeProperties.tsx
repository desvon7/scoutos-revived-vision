import React from 'react';
import { NodeData } from '../types';

interface MemoryNodePropertiesProps {
  data: NodeData;
  title?: string;
  onChange: (name: string, value: any) => void;
}

export const MemoryNodeProperties: React.FC<MemoryNodePropertiesProps> = ({
  data,
  title,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Memory Type</label>
        <select
          name="memoryType"
          value={data.memoryType || 'conversation'}
          onChange={(e) => onChange('memoryType', e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
        >
          <option value="conversation">Conversation</option>
          <option value="vector">Vector</option>
          <option value="buffer">Buffer</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
        />
      </div>
    </div>
  );
};
