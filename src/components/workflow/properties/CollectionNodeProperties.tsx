import React from 'react';
import { NodeData } from '../types';

interface CollectionNodePropertiesProps {
  data: NodeData;
  title?: string;
  onChange: (name: string, value: any) => void;
}

export const CollectionNodeProperties: React.FC<CollectionNodePropertiesProps> = ({
  data,
  title,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Collection ID</label>
        <input
          type="text"
          name="collectionId"
          value={data.collectionId || ''}
          onChange={(e) => onChange('collectionId', e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-white"
        />
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
