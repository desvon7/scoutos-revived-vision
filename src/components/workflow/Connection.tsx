import React from 'react';
import { ConnectionProps } from './types';

export const Connection: React.FC<ConnectionProps> = ({ x1, y1, x2, y2 }) => {
  // Calculate the path for the connection
  const path = `M ${x1} ${y1} C ${x1 + 100} ${y1}, ${x2 - 100} ${y2}, ${x2} ${y2}`;
  
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <path
        d={path}
        className="stroke-blue-500 stroke-2 fill-none"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#3b82f6"
          />
        </marker>
      </defs>
    </svg>
  );
};
