import React from 'react';
import { Connection } from './Connection';
import { Node } from './Node';
import { NodeObject, ConnectionObject, NodeData } from './types';
import { cn } from '@/lib/utils';

interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: ConnectionObject[];
  onNodeSelect: (id: string) => void;
  onNodeMove: (id: string, x: number, y: number) => void;
  onNodeUpdate: (id: string, data: NodeData) => void;
  onNodeDelete: (id: string) => void;
  onConnectionCreate: (fromId: string, toId: string, fromPort: string, toPort: string) => void;
  onConnectionDelete: (id: string) => void;
}

export function WorkflowCanvas({
  nodes,
  connections,
  onNodeSelect,
  onNodeMove,
  onNodeUpdate,
  onNodeDelete,
  onConnectionCreate,
  onConnectionDelete
}: WorkflowCanvasProps) {
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = React.useState<string | null>(null);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  const handleNodeClick = (id: string) => {
    setSelectedNodeId(id);
    onNodeSelect(id);
  };

  const handleNodeDragStart = (e: React.MouseEvent, id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    setDraggingNodeId(id);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleNodeDragMove = (e: React.MouseEvent) => {
    if (!draggingNodeId) return;

    onNodeMove(
      draggingNodeId,
      e.clientX - dragOffset.x,
      e.clientY - dragOffset.y
    );
  };

  const handleNodeDragEnd = () => {
    setDraggingNodeId(null);
  };

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden border border-neutral-800 rounded-lg",
        "bg-neutral-950 text-neutral-200 h-[60vh]"
      )}
    >
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection) => (
          <Connection
            key={connection.id}
            id={connection.id}
            type={connection.type}
            from={connection.from}
            to={connection.to}
            fromPort={connection.fromPort}
            toPort={connection.toPort}
            animated={connection.animated}
            style={connection.style}
            onDelete={() => onConnectionDelete(connection.id)}
          />
        ))}
      </svg>
      
      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          type={node.type}
          title={node.title}
          category={node.category}
          x={node.x}
          y={node.y}
          data={node.data}
          isSelected={node.id === selectedNodeId}
          onClick={() => handleNodeClick(node.id)}
          onDragStart={(e) => handleNodeDragStart(e, node.id)}
          onDragMove={handleNodeDragMove}
          onDragEnd={handleNodeDragEnd}
          onUpdate={(data) => onNodeUpdate(node.id, data)}
          onDelete={() => onNodeDelete(node.id)}
        />
      ))}
    </div>
  );
}
