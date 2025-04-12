
import { ReactNode } from 'react';

export type NodeType = 'input' | 'collection' | 'llm' | 'output' | 'analysis' | 'code' | 'knowledge' | 'email' | 'web' | 'search';

export interface NodeData {
  title?: string;
  model?: string;
  temperature?: number;
  memoryType?: string;
  processType?: string;
  inputName?: string;
  outputName?: string;
  collectionId?: string;
  [key: string]: any;
}

export interface NodeObject {
  id: string;
  title: string;
  type: NodeType;
  x: number;
  y: number;
  data?: NodeData;
}

export interface ConnectionObject {
  id: string;
  from: string;
  to: string;
  fromHandle?: string;
  toHandle?: string;
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
