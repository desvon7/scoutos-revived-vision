
import React from 'react';
import { cn } from '@/lib/utils';

export type NodeType = 'input' | 'process' | 'output' | 'memory' | 'llm';

export interface NodeProps {
  title: string;
  type: NodeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  selected?: boolean;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent) => void;
}

export const Node: React.FC<NodeProps> = ({ 
  title, 
  type, 
  x, 
  y, 
  width = 120, 
  height = 40,
  selected = false,
  onClick,
  onMouseDown
}) => {
  const getNodeColor = () => {
    switch (type) {
      case 'input':
        return 'border-blue-500';
      case 'process':
        return 'border-green-500';
      case 'output':
        return 'border-purple-500';
      case 'memory':
        return 'border-amber-500';
      case 'llm':
        return 'border-pink-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <g 
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      className="cursor-pointer"
    >
      <rect 
        width={width} 
        height={height} 
        rx="4" 
        className={cn(
          "fill-neutral-800 stroke-2", 
          getNodeColor(),
          selected && "stroke-white"
        )}
        strokeWidth={selected ? "2.5" : "1.5"}
      />
      <text 
        x={width / 2} 
        y={height / 2} 
        textAnchor="middle" 
        dominantBaseline="middle"
        className="fill-white text-xs font-medium"
      >
        {title}
      </text>
    </g>
  );
};
