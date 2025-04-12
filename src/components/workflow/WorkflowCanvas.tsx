
import React from 'react';
import { Node } from './Node';
import { Connection } from './Connection';
import { NodeObject, ConnectionObject } from './types';

interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: ConnectionObject[];
  zoom: number;
  selectedNodeId: string | null;
  onNodeClick: (id: string) => void;
  onDragStart: (id: string, event: React.MouseEvent) => void;
  onDragMove: (event: React.MouseEvent) => void;
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
  return (
    <div className="relative">
      <svg 
        width="100%" 
        height="300" 
        viewBox="0 0 600 280" 
        className="mx-auto"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="0.5" />
          </pattern>
          
          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="4"
            markerHeight="4"
            refX="2"
            refY="2"
            orient="auto"
          >
            <path d="M0,0 L4,2 L0,4 z" className="fill-neutral-500" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Connections */}
        {connections.map((connection) => (
          <Connection 
            key={connection.id}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <Node 
            key={node.id}
            title={node.title}
            type={node.type}
            x={node.x}
            y={node.y}
            selected={node.id === selectedNodeId}
            onClick={() => onNodeClick(node.id)}
            onMouseDown={(e) => onDragStart(node.id, e)}
          />
        ))}
      </svg>
    </div>
  );
};
