
import React from 'react';
import { NodeData } from '../types';

interface LLMNodePropertiesProps {
  data: NodeData;
  title?: string;
  onChange: (name: string, value: any) => void;
}

export const LLMNodeProperties: React.FC<LLMNodePropertiesProps> = ({ data, title, onChange }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Model</label>
        <select
          name="model"
          value={data.model || 'gpt-4o'}
          onChange={(e) => onChange('model', e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
        >
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
          <option value="claude-3-sonnet">Claude 3 Sonnet</option>
          <option value="claude-3-haiku">Claude 3 Haiku</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Temperature</label>
        <input
          type="range"
          name="temperature"
          min="0"
          max="1"
          step="0.1"
          value={data.temperature || 0.7}
          onChange={(e) => onChange('temperature', parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-neutral-400 text-right">
          {data.temperature || 0.7}
        </div>
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
