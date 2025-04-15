import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';
import { DataType } from '../types';

// Map data types to colors
const typeColors: Record<string, string> = {
  string: '#4caf50',
  number: '#2196f3',
  boolean: '#ff9800',
  object: '#e91e63',
  array: '#9c27b0',
  any: '#607d8b',
};

const ConnectionEdge: React.FC<EdgeProps> = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}) => {
  // Get path for the edge
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Determine the color based on data type
  const dataType = data?.type || 'any';
  const color = typeColors[dataType] || typeColors.any;

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={2}
        stroke={color}
        strokeDasharray={data?.animated ? '5,5' : undefined}
        {...style}
        markerEnd={markerEnd}
      />
      {data?.label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-gray-300"
          pointerEvents="none"
          style={{ userSelect: 'none' }}
        >
          {data.label}
        </text>
      )}
    </>
  );
};

export default ConnectionEdge;
