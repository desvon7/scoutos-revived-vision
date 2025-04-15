'use client';

import { useState } from 'react';
import { NodeObject, ConnectionObject } from '@/components/workflow/types';

export function useDragNode(
  nodes: NodeObject[],
  setNodes: React.Dispatch<React.SetStateAction<NodeObject[]>>,
  connections: ConnectionObject[],
  setConnections: React.Dispatch<React.SetStateAction<ConnectionObject[]>>
) {
  // State for dragging
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle drag start
  const handleDragStart = (id: string, event: React.MouseEvent) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;

    // Calculate the offset based on mouse position and node position
    const offsetX = event.clientX - node.x;
    const offsetY = event.clientY - node.y;

    setDraggedNodeId(id);
    setDragOffset({ x: offsetX, y: offsetY });

    // Prevent default behavior to allow drag
    event.preventDefault();
  };

  // Handle drag move
  const handleDragMove = (event: React.MouseEvent, zoom: number) => {
    if (!draggedNodeId) return;

    // Calculate the new position based on mouse position and offset
    const newX = (event.clientX - dragOffset.x) / zoom;
    const newY = (event.clientY - dragOffset.y) / zoom;

    // Update the node position
    setNodes(
      nodes.map((node) => (node.id === draggedNodeId ? { ...node, x: newX, y: newY } : node))
    );
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedNodeId(null);
  };

  return {
    draggedNodeId,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}
