
import { NodeType } from './Node';

export interface NodeData {
  // Common properties
  title?: string;
  
  // LLM node properties
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  
  // Collection node properties
  collection?: string;
  maxResults?: number;
  
  // Memory node properties
  memoryType?: string;
  
  // Process node properties
  processType?: string;
  
  // Input/Output node properties
  inputName?: string;
  outputName?: string;
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
