
import React from 'react';
import { Node as NodeComponent } from './Node';
import { Connection } from './Connection';
import { NodeObject, ConnectionObject, NodeType } from './types';
import { cn } from '@/lib/utils';

interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: ConnectionObject[];
  zoom: number;
  selectedNodeId: string | null;
  onNodeClick: (id: string) => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
  onDragMove: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  connections,
  zoom,
  selectedNodeId,
  onNodeClick,
  onDragStart,
  onDragMove,
  onDragEnd
}) => {
  // Find the x, y coordinates for each connection
  const getConnectionCoordinates = (fromId: string, toId: string) => {
    const fromNode = nodes.find(node => node.id === fromId);
    const toNode = nodes.find(node => node.id === toId);
    
    if (!fromNode || !toNode) {
      return null;
    }
    
    // Calculate center points of each node
    const fromX = fromNode.x + 100; // Assuming node width is 200px
    const fromY = fromNode.y + 25;  // Assuming node height is ~50px
    const toX = toNode.x;
    const toY = toNode.y + 25;     // Connect to the left side of the target
    
    return { x1: fromX, y1: fromY, x2: toX, y2: toY };
  };
  
  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden border border-neutral-800 rounded-lg",
        "bg-neutral-950 text-neutral-200 h-[60vh]"
      )}
    >
      {/* Connections */}
      {connections.map(connection => {
        const coords = getConnectionCoordinates(connection.from, connection.to);
        if (!coords) return null;
        
        return (
          <Connection
            key={connection.id}
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
          />
        );
      })}
      
      {/* Nodes */}
      {nodes.map(node => (
        <NodeComponent
          key={node.id}
          id={node.id}
          type={node.type as NodeType}
          title={node.title}
          x={node.x}
          y={node.y}
          data={node.data}
          isSelected={selectedNodeId === node.id}
          onClick={() => onNodeClick(node.id)}
          onDragStart={(e: React.MouseEvent) => onDragStart(e, node.id)}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
};
