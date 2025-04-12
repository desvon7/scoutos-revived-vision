
import React from 'react';
import { cn } from '@/lib/utils';

export interface ConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  animated?: boolean;
}

export const Connection: React.FC<ConnectionProps> = ({ 
  x1, 
  y1, 
  x2, 
  y2,
  animated = false
}) => {
  // Calculate control points for curved path
  const midX = (x1 + x2) / 2;
  
  return (
    <path 
      d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`} 
      className={cn(
        "stroke-neutral-500 fill-none", 
        animated && "stroke-dash-array-3-3 animate-dash"
      )}
      strokeWidth="1.5"
      markerEnd="url(#arrowhead)"
    />
  );
};
