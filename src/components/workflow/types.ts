
export type NodeType = 'input' | 'process' | 'output' | 'memory' | 'llm' | 'collection';

export interface NodeData {
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

export interface Connection {
  id: string;
  from: string;
  to: string;
}

// Adding the missing types that are causing errors
export interface ConnectionObject {
  id: string;
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface WorkflowData {
  name: string;
  nodes: NodeObject[];
  connections: ConnectionObject[];
  timestamp: string;
}
