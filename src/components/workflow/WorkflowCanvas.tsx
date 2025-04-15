
import React from 'react';
import { Node } from './Node';
import { NodeObject, NodeData } from './types';
import { cn } from '@/lib/utils';

interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: any[];
  zoom?: number;
  selectedNodeId?: string | null;
  onNodeClick: (id: string) => void;
  onDragStart?: (e: React.MouseEvent, id: string) => void;
  onDragMove?: (e: React.MouseEvent) => void;
  onDragEnd?: () => void;
}

export function WorkflowCanvas({
  nodes,
  connections,
  zoom = 1,
  selectedNodeId,
  onNodeClick,
  onDragStart = () => {},
  onDragMove = () => {},
  onDragEnd = () => {}
}: WorkflowCanvasProps) {
  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden border border-neutral-800 rounded-lg",
        "bg-neutral-950 text-neutral-200 h-[60vh]"
      )}
    >
      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          type={node.type}
          title={node.title}
          category={node.category || 'input'}
          x={node.x}
          y={node.y}
          data={node.data}
          isSelected={node.id === selectedNodeId}
          onClick={() => onNodeClick(node.id)}
          onDragStart={(e) => onDragStart(e, node.id)}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
          onUpdate={(data) => {}}
          onDelete={() => {}}
        />
      ))}
    </div>
  );
}
