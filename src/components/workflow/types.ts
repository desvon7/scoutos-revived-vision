import { ReactNode } from 'react';

export type NodeType = 'input' | 'collection' | 'llm' | 'output';

export interface NodeData {
  label: string;
  [key: string]: any;
}

export interface NodeObject {
  id: string;
  type: NodeType;
  title: string;
  x: number;
  y: number;
  data: NodeData;
}

export interface ConnectionObject {
  id: string;
  from: string;
  to: string;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface ConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface NodeProps {
  id: string;
  type: NodeType;
  title: string;
  x: number;
  y: number;
  data: NodeData;
  isSelected: boolean;
  onClick: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  onDragMove: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
}

export interface WorkflowData {
  name: string;
  nodes: NodeObject[];
  connections: ConnectionObject[];
  timestamp: string;
  [key: string]: any;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}
