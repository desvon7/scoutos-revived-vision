import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ConnectionProps, DataType } from './types';
import { cn } from '@/lib/utils';

const getConnectionColor = (type: DataType) => {
  const colors = {
    string: 'stroke-blue-500',
    number: 'stroke-green-500',
    boolean: 'stroke-yellow-500',
    date: 'stroke-purple-500',
    object: 'stroke-red-500',
    array: 'stroke-pink-500',
    file: 'stroke-orange-500',
    stream: 'stroke-teal-500',
    json: 'stroke-indigo-500',
    html: 'stroke-gray-500',
    markdown: 'stroke-gray-600',
    vector: 'stroke-cyan-500',
  };
  return colors[type] || 'stroke-gray-400';
};

const getConnectionWidth = (type: DataType) => {
  const widths = {
    string: 2,
    number: 2,
    boolean: 1,
    date: 2,
    object: 3,
    array: 3,
    file: 2,
    stream: 2,
    json: 3,
    html: 2,
    markdown: 2,
    vector: 3,
  };
  return widths[type] || 2;
};

export const Connection: React.FC<ConnectionProps> = ({
  x1,
  y1,
  x2,
  y2,
  type,
  animated = false,
  selected = false,
  onClick,
  onDelete,
}) => {
  const path = useMemo(() => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const controlPointDistance = Math.min(distance / 2, 100);
    
    return `M ${x1} ${y1} 
            C ${x1 + controlPointDistance} ${y1} 
              ${x2 - controlPointDistance} ${y2} 
              ${x2} ${y2}`;
  }, [x1, y1, x2, y2]);

  const arrowPath = useMemo(() => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLength = 10;
    const arrowWidth = 5;
    
    const x = x2 - arrowLength * Math.cos(angle);
    const y = y2 - arrowLength * Math.sin(angle);
    
    const x1 = x - arrowWidth * Math.cos(angle - Math.PI / 2);
    const y1 = y - arrowWidth * Math.sin(angle - Math.PI / 2);
    const x2 = x - arrowWidth * Math.cos(angle + Math.PI / 2);
    const y2 = y - arrowWidth * Math.sin(angle + Math.PI / 2);
    
    return `M ${x1} ${y1} L ${x2} ${y2} L ${x2} ${y2}`;
  }, [x1, y1, x2, y2]);

  return (
    <g
      className={cn(
        'connection',
        getConnectionColor(type),
        selected && 'connection-selected'
      )}
      onClick={onClick}
    >
      <motion.path
        d={path}
        fill="none"
        strokeWidth={getConnectionWidth(type)}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {animated && (
        <motion.circle
          r={4}
          fill="currentColor"
          initial={{ x: x1, y: y1 }}
          animate={{ x: x2, y: y2 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
      
      <path
        d={arrowPath}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={2}
      />
      
      {selected && (
        <g className="connection-controls">
          <circle
            r={8}
            fill="white"
            stroke="currentColor"
            strokeWidth={2}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          />
        </g>
      )}
    </g>
  );
};
