import React from 'react';
import { NodeObject, ConnectionObject, ConnectionProps } from './types';
import { Node } from './Node';
import { Connection } from './Connection';

interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: ConnectionObject[];
  selectedNodeId: string | null;
  zoom: number;
  onNodeClick: (id: string) => void;
  onDragStart: (id: string, event: React.MouseEvent) => void;
  onDragMove: (event: React.MouseEvent) => void;
  onDragEnd: () => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  connections,
  selectedNodeId,
  zoom,
  onNodeClick,
  onDragStart,
  onDragMove,
  onDragEnd
}) => {
  return (
    <div 
      className="bg-neutral-800 rounded-md overflow-hidden relative"
      style={{ height: '500px' }}
    >
      <div 
        className="absolute inset-0 transition-transform"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Render connections */}
        {connections.map(connection => {
          // Find source and target nodes
          const sourceNode = nodes.find(node => node.id === connection.from);
          const targetNode = nodes.find(node => node.id === connection.to);
          
          if (!sourceNode || !targetNode) {
            return null;
          }
          
          // Calculate the coordinates for the connection
          const fromX = sourceNode.x + 100; // Assuming node width of 200
          const fromY = sourceNode.y + 50;  // Assuming node height of 100
          const toX = targetNode.x;
          const toY = targetNode.y + 50;
          
          const connectionProps: ConnectionProps = {
            x1: connection.x1 || fromX,
            y1: connection.y1 || fromY,
            x2: connection.x2 || toX,
            y2: connection.y2 || toY
          };
          
          return (
            <Connection
              key={connection.id}
              {...connectionProps}
            />
          );
        })}
        
        {/* Render nodes */}
        {nodes.map(node => (
          <Node
            key={node.id}
            id={node.id}
            type={node.type}
            title={node.title}
            x={node.x}
            y={node.y}
            data={node.data}
            isSelected={node.id === selectedNodeId}
            onClick={() => onNodeClick(node.id)}
            onDragStart={(e) => onDragStart(node.id, e)}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};
