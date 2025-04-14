
import React from 'react';

// Node Types
export type NodeType = 'input' | 'process' | 'output' | 'llm' | 'memory' | 'collection';

// Node Data Interface
export interface NodeData {
  [key: string]: any;
}

// Node Object Interface
export interface NodeObject {
  id: string;
  title: string;
  type: NodeType;
  x: number;
  y: number;
  data: NodeData;
}

// Connection Object Interface
export interface ConnectionObject {
  id: string;
  from: string;
  to: string;
}

// Connection Props Interface
export interface ConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// Node Props Interface
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

// Workflow Data Interface
export interface WorkflowData {
  name: string;
  nodes: NodeObject[];
  connections: ConnectionObject[];
  timestamp: string;
}

// Edge type definition for workflow execution
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}
