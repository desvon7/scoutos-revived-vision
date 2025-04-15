import React from 'react';
import { motion } from 'framer-motion';
import { DataType } from './types';
import { cn } from '@/lib/utils';

const dataTypeColors: Record<DataType, string> = {
  string: '#4CAF50',
  number: '#2196F3',
  boolean: '#FFC107',
  date: '#9C27B0',
  object: '#FF5722',
  array: '#795548',
  file: '#607D8B',
  stream: '#00BCD4',
  json: '#FF9800',
  html: '#E91E63',
  markdown: '#3F51B5',
  vector: '#8BC34A',
  any: '#9E9E9E'
};

const dataTypeThickness: Record<DataType, number> = {
  string: 2,
  number: 2,
  boolean: 2,
  date: 2,
  object: 3,
  array: 3,
  file: 2,
  stream: 2,
  json: 2,
  html: 2,
  markdown: 2,
  vector: 2,
  any: 1
};

interface ConnectionProps {
  id: string;
  type: DataType;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  animated?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

export function Connection({
  type,
  x1,
  y1,
  x2,
  y2,
  animated = false,
  selected = false,
  onClick,
  onDelete
}: ConnectionProps) {
  // Calculate control points for the bezier curve
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  
  const controlPoint1X = x1 + dx * 0.5;
  const controlPoint1Y = y1;
  const controlPoint2X = x2 - dx * 0.5;
  const controlPoint2Y = y2;

  const path = `M ${x1} ${y1} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${x2} ${y2}`;

  return (
    <motion.path
      d={path}
      stroke={dataTypeColors[type]}
      strokeWidth={dataTypeThickness[type]}
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
      className={`connection ${selected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDelete}
    />
  );
}
