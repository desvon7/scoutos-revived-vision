
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
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    const svgElement = event.currentTarget.closest('svg');
    if (!svgElement) return;
    
    const svgRect = svgElement.getBoundingClientRect();
    const scale = 1; // Assuming default zoom
    
    // Calculate the offset based on mouse position and node position
    const offsetX = (event.clientX - svgRect.left) / scale - node.x;
    const offsetY = (event.clientY - svgRect.top) / scale - node.y;
    
    setDraggedNodeId(id);
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Prevent default behavior to allow drag
    event.preventDefault();
  };
  
  // Handle drag move
  const handleDragMove = (event: React.MouseEvent, zoom: number) => {
    if (!draggedNodeId) return;
    
    const svgElement = event.currentTarget.closest('svg');
    if (!svgElement) return;
    
    const svgRect = svgElement.getBoundingClientRect();
    const scale = zoom;
    
    // Calculate the new position based on mouse position and offset
    const newX = (event.clientX - svgRect.left) / scale - dragOffset.x;
    const newY = (event.clientY - svgRect.top) / scale - dragOffset.y;
    
    // Update the node position
    setNodes(nodes.map(node => 
      node.id === draggedNodeId 
        ? { ...node, x: newX, y: newY } 
        : node
    ));
    
    // Update connections
    setConnections(connections.map(conn => {
      if (conn.from === draggedNodeId) {
        return {
          ...conn,
          x1: newX + 120, // Adjusted for node width
          y1: newY + 20  // Adjusted for node height/2
        };
      }
      if (conn.to === draggedNodeId) {
        return {
          ...conn,
          x2: newX,
          y2: newY + 20 // Adjusted for node height/2
        };
      }
      return conn;
    }));
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setDraggedNodeId(null);
  };
  
  return {
    draggedNodeId,
    handleDragStart,
    handleDragMove,
    handleDragEnd
  };
}
