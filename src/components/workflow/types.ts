
import { ReactNode } from 'react';

export type NodeType = 'input' | 'collection' | 'llm' | 'output' | 'analysis' | 'code' | 'knowledge' | 'email' | 'web' | 'search' | 'memory' | 'process';

export interface NodeData {
  label?: string;
  inputName?: string;
  collectionId?: string;
  model?: string;
  temperature?: number;
  memoryType?: string;
  processType?: string;
  outputName?: string;
  title?: string;
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
