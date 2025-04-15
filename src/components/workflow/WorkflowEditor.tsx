"use client"

import React, { useState, useCallback } from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import NodePalette from './NodePalette';
import { NodeType, NodeObject } from './types';

export function WorkflowEditor() {
  const [nodes, setNodes] = useState<NodeObject[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const handleNodeSelect = (id: string) => {
    setSelectedNodeId(id === selectedNodeId ? null : id);
  };

  const handleNodeDrop = (type: NodeType) => {
    const newNode: NodeObject = {
      id: `node-${Date.now()}`,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      x: 100,
      y: 100,
      data: {
        type,
      }
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex h-full">
      <div className="w-64 bg-background border-r">
        <NodePalette onDragStart={(type) => handleNodeDrop(type)} />
      </div>
      
      <div className="flex-1 relative">
        <WorkflowCanvas
          nodes={nodes}
          connections={[]}
          onNodeClick={handleNodeSelect}
        />
      </div>
    </div>
  );
}
