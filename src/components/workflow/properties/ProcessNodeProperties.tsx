import React from 'react';
import { NodeData } from '../types';

interface ProcessNodePropertiesProps {
  data: NodeData;
  title?: string;
  onChange: (name: string, value: any) => void;
}

export const ProcessNodeProperties: React.FC<ProcessNodePropertiesProps> = ({
  data,
  title,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Process Type</label>
        <select
          name="processType"
          value={data.processType || 'transform'}
          onChange={(e) => onChange('processType', e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
        >
          <option value="transform">Transform</option>
          <option value="extract">Extract</option>
          <option value="filter">Filter</option>
          <option value="merge">Merge</option>
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
