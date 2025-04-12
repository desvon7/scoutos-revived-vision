
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
